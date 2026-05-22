import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { PlanId, FREE_TRIAL_CALC_LIMIT } from '../utils/subscription';

export interface PlanStatus {
  planId: PlanId;
  trialExpiresAt: Date | null;
  trialCalcLimit: number;
  subscriptionExpiresAt: Date | null;
  calcUsed: number;
  loading: boolean;
  incrementCalcUsed: () => Promise<void>;
}

interface RawOverride {
  id: string;
  plan_id: string;
  trial_expires_at: string | null;
  trial_calc_limit: number | null;
  subscription_expires_at: string | null;
  calc_used: number;
}

function resolveStatus(data: RawOverride | null): Omit<PlanStatus, 'loading' | 'incrementCalcUsed'> {
  if (!data) {
    return {
      planId: 'free',
      trialExpiresAt: null,
      trialCalcLimit: FREE_TRIAL_CALC_LIMIT,
      subscriptionExpiresAt: null,
      calcUsed: 0,
    };
  }

  const planId = (data.plan_id as PlanId) ?? 'free';
  const trialExpires = data.trial_expires_at ? new Date(data.trial_expires_at) : null;
  const subExpires = data.subscription_expires_at ? new Date(data.subscription_expires_at) : null;
  const calcLimit = data.trial_calc_limit ?? FREE_TRIAL_CALC_LIMIT;
  const now = new Date();

  const effectivePlanId: PlanId =
    (planId === 'calculator' || planId === 'expert') && subExpires && subExpires <= now
      ? 'free'
      : planId;

  return {
    planId: effectivePlanId,
    trialExpiresAt: trialExpires,
    trialCalcLimit: calcLimit,
    subscriptionExpiresAt: subExpires,
    calcUsed: data.calc_used ?? 0,
  };
}

export function usePlan(): PlanStatus {
  const { user } = useAuth();
  const [override, setOverride] = useState<RawOverride | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOverride = useCallback(async () => {
    if (!user) {
      setOverride(null);
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from('user_plan_overrides')
      .select('id, plan_id, trial_expires_at, trial_calc_limit, subscription_expires_at, calc_used')
      .eq('user_auth_id', user.id)
      .maybeSingle();
    setOverride(data ?? null);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    setLoading(true);
    fetchOverride();
  }, [fetchOverride]);

  // Realtime: SA portal changes propagate to the user instantly
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel(`plan_overrides_${user.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_plan_overrides',
          filter: `user_auth_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === 'DELETE') {
            setOverride(null);
          } else {
            setOverride(payload.new as RawOverride);
          }
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);

  const incrementCalcUsed = useCallback(async () => {
    if (!user) return; // unauthenticated users cannot use the app (trial requires account)

    const newCount = (override?.calc_used ?? 0) + 1;

    if (override?.id) {
      await supabase
        .from('user_plan_overrides')
        .update({ calc_used: newCount })
        .eq('id', override.id);
    } else {
      // Row doesn't exist yet — shouldn't happen (signup creates it), but handle gracefully
      await supabase.from('user_plan_overrides').upsert({
        user_auth_id: user.id,
        email: user.email ?? '',
        plan_id: 'free',
        calc_used: newCount,
        trial_calc_limit: FREE_TRIAL_CALC_LIMIT,
      }, { onConflict: 'user_auth_id' });
    }

    // Optimistic local update so UI responds immediately without waiting for realtime
    setOverride(prev => prev
      ? { ...prev, calc_used: newCount }
      : {
          id: '',
          plan_id: 'free',
          trial_expires_at: null,
          trial_calc_limit: FREE_TRIAL_CALC_LIMIT,
          subscription_expires_at: null,
          calc_used: newCount,
        }
    );
  }, [user, override]);

  return { ...resolveStatus(override), loading, incrementCalcUsed };
}

export function getPlanLabel(planId: PlanId): string {
  if (planId === 'expert') return 'Expert';
  if (planId === 'calculator') return 'Calculator';
  return 'Free Trial';
}

export function getPlanColor(planId: PlanId): string {
  if (planId === 'expert') return 'text-amber-400';
  if (planId === 'calculator') return 'text-blue-400';
  return 'text-emerald-400';
}

export function trialDaysLeft(trialExpiresAt: Date | null): number {
  if (!trialExpiresAt) return 0;
  return Math.max(0, Math.ceil((trialExpiresAt.getTime() - Date.now()) / 86400000));
}
