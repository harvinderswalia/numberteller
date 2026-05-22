import { createContext, useContext } from 'react';
import { usePlan, PlanStatus } from '../hooks/usePlan';

export interface PlanContextValue extends PlanStatus {
  trialActive: boolean;
}

const PlanContext = createContext<PlanContextValue | undefined>(undefined);

function computeTrialActive(plan: PlanStatus): boolean {
  if (plan.loading) return true; // optimistic: don't flash lock screen while loading
  if (plan.planId !== 'free') return false; // has a paid plan, not in trial mode

  // Check DB trial expiry first (set by SA portal)
  if (plan.trialExpiresAt) {
    const expired = plan.trialExpiresAt <= new Date();
    const limitReached = plan.calcUsed >= plan.trialCalcLimit;
    return !expired && !limitReached;
  }

  // Fall back to localStorage trial (set on signup)
  try {
    const t = JSON.parse(localStorage.getItem('nt_trial') || 'null');
    if (!t) return false;
    const expired = new Date(t.expiresAt) <= new Date();
    const limitReached = (t.calcCount ?? 0) >= plan.trialCalcLimit;
    return !expired && !limitReached;
  } catch {
    return false;
  }
}

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const plan = usePlan();
  const trialActive = computeTrialActive(plan);
  return <PlanContext.Provider value={{ ...plan, trialActive }}>{children}</PlanContext.Provider>;
}

export function usePlanContext(): PlanContextValue {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error('usePlanContext must be used within PlanProvider');
  return ctx;
}

const PLAN_RANK: Record<string, number> = { free: 0, calculator: 1, expert: 2 };

export type AppFeature = 'name-correction-full' | 'tarot' | 'business-full' | 'interpretations' | 'pdf-interpretation';

const FEATURE_PLAN_REQ: Record<AppFeature, string> = {
  'name-correction-full': 'expert',
  tarot: 'expert',
  'business-full': 'expert',
  interpretations: 'expert',
  'pdf-interpretation': 'expert',
};

export function canAccessAppFeature(feature: AppFeature, planId: string): boolean {
  const required = FEATURE_PLAN_REQ[feature];
  return PLAN_RANK[planId] >= PLAN_RANK[required];
}
