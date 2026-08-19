import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { PlanId, BETA_MODE } from '../utils/subscription';

export interface PlanStatus {
  planId: PlanId;
  trialExpiresAt: Date | null;
  subscriptionExpiresAt: Date | null;
  setupCompletedAt: Date | null;
  loading: boolean;
  completeSetup: (fullName: string, phone: string) => Promise<void>;
}

interface RawOverride {
  id: string;
  plan_id: string;
  trial_expires_at: string | null;
  subscription_expires_at: string | null;
  full_name: string | null;
  phone: string | null;
  setup_completed_at: string | null;
}

function resolveStatus(data: RawOverride | null): Omit<PlanStatus, 'loading' | 'completeSetup'> {
  if (!data) {
    return {
      planId: 'free',
      trialExpiresAt: null,
      subscriptionExpiresAt: null,
      setupCompletedAt: null,
    };
  }

  const planId = (data.plan_id as PlanId) ?? 'free';
  const trialExpires = data.trial_expires_at ? new Date(data.trial_expires_at) : null;
  const subExpires = data.subscription_expires_at ? new Date(data.subscription_expires_at) : null;
  const setupAt = data.setup_completed_at ? new Date(data.setup_completed_at) : null;
  const now = new Date();

  const effectivePlanId: PlanId =
    (planId === 'silver' || planId === 'gold' || planId === 'platinum') && subExpires && subExpires <= now
      ? 'free'
      : planId;

  return {
    planId: effectivePlanId,
    trialExpiresAt: trialExpires,
    subscriptionExpiresAt: subExpires,
    setupCompletedAt: setupAt,
  };
}

export function usePlan(): PlanStatus {
  const { user } = useAuth();
  const [override, setOverride] = useState<RawOverride | null>(null);
  const [loadedUserId, setLoadedUserId] = useState<string | null>(null);
  const [fetching, setFetching] = useState(false);

  const fetchOverride = useCallback(async () => {
    if (!user) {
      setOverride(null);
      setLoadedUserId(null);
      setFetching(false);
      return;
    }

    setFetching(true);

    const { data } = await supabase
      .from('user_plan_overrides')
      .select('id, plan_id, trial_expires_at, subscription_expires_at, full_name, phone, setup_completed_at')
      .eq('user_auth_id', user.id)
      .maybeSingle();

    if (data) {
      setOverride(data as RawOverride);
      setLoadedUserId(user.id);
      setFetching(false);
      return;
    }

    // No row exists — create it with setup pending (no trial yet)
    const { data: inserted } = await supabase
      .from('user_plan_overrides')
      .upsert({
        user_auth_id: user.id,
        email: user.email ?? '',
        plan_id: 'free',
        trial_expires_at: null,
        setup_completed_at: BETA_MODE ? new Date().toISOString() : null,
      }, { onConflict: 'user_auth_id' })
      .select('id, plan_id, trial_expires_at, subscription_expires_at, full_name, phone, setup_completed_at')
      .maybeSingle();

    setOverride(inserted as RawOverride | null);
    setLoadedUserId(user.id);
    setFetching(false);
  }, [user]);

  useEffect(() => {
    fetchOverride();
  }, [fetchOverride]);

  // loading is true while fetching, or when we have a user but haven't loaded their data yet
  const loading = fetching || (!!user && loadedUserId !== user.id);

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

  const completeSetup = useCallback(async (fullName: string, phone: string) => {
    if (!user) return;

    const now = new Date().toISOString();

    if (override?.id) {
      await supabase
        .from('user_plan_overrides')
        .update({
          full_name: fullName,
          phone,
          setup_completed_at: now,
        })
        .eq('id', override.id);
    } else {
      await supabase.from('user_plan_overrides').upsert({
        user_auth_id: user.id,
        email: user.email ?? '',
        plan_id: 'free',
        full_name: fullName,
        phone,
        setup_completed_at: now,
      }, { onConflict: 'user_auth_id' });
    }

    setOverride(prev => prev
      ? {
          ...prev,
          full_name: fullName,
          phone,
          setup_completed_at: now,
        }
      : {
          id: '',
          plan_id: 'free',
          trial_expires_at: null,
          subscription_expires_at: null,
          full_name: fullName,
          phone,
          setup_completed_at: now,
        }
    );
  }, [user, override]);

  return { ...resolveStatus(override), loading, completeSetup };
}

export function getPlanLabel(planId: PlanId): string {
  if (planId === 'platinum') return 'Platinum';
  if (planId === 'gold') return 'Gold';
  if (planId === 'silver') return 'Silver';
  return 'Free Plan';
}

export function getPlanColor(planId: PlanId): string {
  if (planId === 'platinum') return 'text-amber-400';
  if (planId === 'gold') return 'text-yellow-400';
  if (planId === 'silver') return 'text-blue-400';
  return 'text-emerald-400';
}

export function trialDaysLeft(trialExpiresAt: Date | null): number {
  if (!trialExpiresAt) return 0;
  return Math.max(0, Math.ceil((trialExpiresAt.getTime() - Date.now()) / 86400000));
}
