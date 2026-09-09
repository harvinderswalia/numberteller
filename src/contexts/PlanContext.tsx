import { createContext, useContext } from 'react';
import { usePlan, PlanStatus, trialDaysLeft } from '../hooks/usePlan';
import { BETA_MODE } from '../utils/subscription';

export interface PlanContextValue extends PlanStatus {
  trialActive: boolean;
  trialDaysLeft: number;
  isBeta: boolean;
  setupComplete: boolean;
}

const PlanContext = createContext<PlanContextValue | undefined>(undefined);

function computeTrialActive(plan: PlanStatus): boolean {
  if (!plan.trialExpiresAt) return false;
  return plan.trialExpiresAt.getTime() > Date.now();
}

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const plan = usePlan();
  const trialActive = computeTrialActive(plan);
  const trialDaysRemaining = trialDaysLeft(plan.trialExpiresAt);
  const isBeta = BETA_MODE && plan.planId === 'free';
  const setupComplete = !!plan.setupCompletedAt;

  return (
    <PlanContext.Provider value={{ ...plan, trialActive, trialDaysLeft: trialDaysRemaining, isBeta, setupComplete }}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlanContext(): PlanContextValue {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error('usePlanContext must be used within PlanProvider');
  return ctx;
}

const PLAN_RANK: Record<string, number> = { free: 0, silver: 1, gold: 2, platinum: 3 };

export type AppFeature =
  | 'name-correction-full'
  | 'tarot'
  | 'business-full'
  | 'interpretations'
  | 'pdf-interpretation';

const FEATURE_PLAN_REQ: Record<AppFeature, string> = {
  'name-correction-full': 'platinum',
  tarot: 'platinum',
  'business-full': 'platinum',
  interpretations: 'gold',
  'pdf-interpretation': 'platinum',
};

export function canAccessAppFeature(feature: AppFeature, planId: string): boolean {
  const required = FEATURE_PLAN_REQ[feature];
  return (PLAN_RANK[planId] ?? 0) >= (PLAN_RANK[required] ?? 0);
}
