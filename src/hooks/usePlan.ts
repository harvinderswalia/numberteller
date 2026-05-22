import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { PlanId, FREE_TRIAL_CALC_LIMIT, FREE_TRIAL_DAYS } from '../utils/subscription';

export interface PlanStatus {
  planId: PlanId;
  trialExpiresAt: Date | null;
  trialCalcLimit: number;
  subscriptionExpiresAt: Date | null;
  calcUsed: number;
  loading: boolean;
}

export function usePlan(): PlanStatus {
  const { user } = useAuth();
  const [status, setStatus] = useState<PlanStatus>({
    planId: 'free',
    trialExpiresAt: null,
    trialCalcLimit: FREE_TRIAL_CALC_LIMIT,
    subscriptionExpiresAt: null,
    calcUsed: 0,
    loading: true,
  });

  useEffect(() => {
    if (!user) {
      setStatus(s => ({ ...s, loading: false }));
      return;
    }

    const fetchPlan = async () => {
      const { data } = await supabase
        .from('user_plan_overrides')
        .select('plan_id, trial_expires_at, trial_calc_limit, subscription_expires_at')
        .eq('user_auth_id', user.id)
        .maybeSingle();

      // Count calculations used via saved_charts as a proxy isn't reliable;
      // use the trial localStorage count for now, DB override takes precedence for plan
      const localTrial = (() => {
        try { return JSON.parse(localStorage.getItem('nt_trial') || 'null'); } catch { return null; }
      })();

      if (!data) {
        setStatus({
          planId: 'free',
          trialExpiresAt: null,
          trialCalcLimit: FREE_TRIAL_CALC_LIMIT,
          subscriptionExpiresAt: null,
          calcUsed: localTrial?.calcCount ?? 0,
          loading: false,
        });
        return;
      }

      const planId = (data.plan_id as PlanId) ?? 'free';
      const trialExpires = data.trial_expires_at ? new Date(data.trial_expires_at) : null;
      const subExpires = data.subscription_expires_at ? new Date(data.subscription_expires_at) : null;
      const calcLimit = data.trial_calc_limit ?? FREE_TRIAL_CALC_LIMIT;

      // If subscription is set but expired, fall back to free
      const now = new Date();
      const effectivePlanId: PlanId =
        (planId === 'calculator' || planId === 'expert') && subExpires && subExpires <= now
          ? 'free'
          : planId;

      setStatus({
        planId: effectivePlanId,
        trialExpiresAt: trialExpires,
        trialCalcLimit: calcLimit,
        subscriptionExpiresAt: subExpires,
        calcUsed: localTrial?.calcCount ?? 0,
        loading: false,
      });
    };

    fetchPlan();
  }, [user]);

  return status;
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
  if (!trialExpiresAt) {
    // Fall back to localStorage trial
    try {
      const t = JSON.parse(localStorage.getItem('nt_trial') || 'null');
      if (!t) return FREE_TRIAL_DAYS;
      return Math.max(0, Math.ceil((new Date(t.expiresAt).getTime() - Date.now()) / 86400000));
    } catch { return 0; }
  }
  return Math.max(0, Math.ceil((trialExpiresAt.getTime() - Date.now()) / 86400000));
}
