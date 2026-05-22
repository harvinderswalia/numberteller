import { createContext, useContext } from 'react';
import { usePlan, PlanStatus } from '../hooks/usePlan';

const PlanContext = createContext<PlanStatus | undefined>(undefined);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const plan = usePlan();
  return <PlanContext.Provider value={plan}>{children}</PlanContext.Provider>;
}

export function usePlanContext(): PlanStatus {
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

export function isTrialOrAbove(planId: string): boolean {
  return true; // free trial users can access all tools during trial
}
