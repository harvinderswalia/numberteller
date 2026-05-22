// Plan definitions
export type PlanId = 'free' | 'calculator' | 'expert';

export interface Plan {
  id: PlanId;
  name: string;
  monthlyPrice: number;
  description: string;
  features: string[];
  notIncluded: string[];
}

export const PLANS: Record<Exclude<PlanId, 'free'>, Plan> = {
  calculator: {
    id: 'calculator',
    name: 'Calculator',
    monthlyPrice: 999,
    description: 'For experienced practitioners who need fast, accurate calculations.',
    features: [
      'All calculators with full numeric output',
      'Lo Shu Grid — grid display & arrow detection',
      'Compatibility score & harmony matrix',
      'Transit chart — pinnacles, personal years & months',
      'House, Car & Mobile number calculators',
      'Business name number calculator',
      'Save up to 5 charts',
      'PDF export (numbers only)',
    ],
    notIncluded: [
      'Written interpretations',
      'AI Name Correction full analysis',
      'AI Tarot Reading',
      'Business Numerology full analysis',
      'Client-ready PDF with interpretation text',
      'Save more than 5 charts',
    ],
  },
  expert: {
    id: 'expert',
    name: 'Expert',
    monthlyPrice: 1499,
    description: 'For practitioners delivering full written analysis and client-ready reports.',
    features: [
      'Everything in Calculator',
      'Full written interpretations on every number',
      'Over-energy analysis & detailed warnings',
      'AI Name Correction — full harmony analysis',
      'AI Tarot Reading',
      'Business Numerology — full company profile & analysis',
      'Personal Year Forecast narrative',
      'Client-ready PDF with interpretation text',
      'Save up to 10 charts',
    ],
    notIncluded: [],
  },
};

// Feature gating — which features require which plan
export type GatedFeature =
  | 'interpretations'
  | 'name-correction-full'
  | 'tarot'
  | 'business-full'
  | 'pdf-interpretation'
  | 'save-charts-extended'
  | 'over-energy-detail'
  | 'personal-year-forecast';

const FEATURE_PLAN_MAP: Record<GatedFeature, PlanId[]> = {
  interpretations: ['expert'],
  'name-correction-full': ['expert'],
  tarot: ['expert'],
  'business-full': ['expert'],
  'pdf-interpretation': ['expert'],
  'save-charts-extended': ['expert'],
  'over-energy-detail': ['expert'],
  'personal-year-forecast': ['expert'],
};

// Storage keys
const SUBSCRIPTION_KEY = 'nt_subscription';
const TRIAL_KEY = 'nt_trial';
const CALC_COUNT_KEY = 'nt_calc_count';

export const FREE_TRIAL_CALC_LIMIT = 5;
export const FREE_TRIAL_DAYS = 7;

export interface SubscriptionData {
  planId: PlanId;
  billing: 'monthly';
  startedAt: string;
  expiresAt: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
}

export interface TrialData {
  startedAt: string;
  expiresAt: string;
  calcCount: number;
}

// ── Read / write helpers ──────────────────────────────────────────────────────

export function getSubscription(): SubscriptionData | null {
  try {
    const raw = localStorage.getItem(SUBSCRIPTION_KEY);
    if (!raw) return null;
    const data: SubscriptionData = JSON.parse(raw);
    if (new Date(data.expiresAt) <= new Date()) {
      localStorage.removeItem(SUBSCRIPTION_KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export function setSubscription(data: SubscriptionData): void {
  localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(data));
}

export function clearSubscription(): void {
  localStorage.removeItem(SUBSCRIPTION_KEY);
}

export function getTrial(): TrialData | null {
  try {
    const raw = localStorage.getItem(TRIAL_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as TrialData;
  } catch {
    return null;
  }
}

export function startTrial(): TrialData {
  const existing = getTrial();
  if (existing) return existing;
  const now = new Date();
  const expires = new Date(now);
  expires.setDate(expires.getDate() + FREE_TRIAL_DAYS);
  const data: TrialData = {
    startedAt: now.toISOString(),
    expiresAt: expires.toISOString(),
    calcCount: 0,
  };
  localStorage.setItem(TRIAL_KEY, JSON.stringify(data));
  return data;
}

export function isTrialActive(): boolean {
  const trial = getTrial();
  if (!trial) return false;
  const expired = new Date(trial.expiresAt) <= new Date();
  const limitReached = trial.calcCount >= FREE_TRIAL_CALC_LIMIT;
  return !expired && !limitReached;
}

export function getTrialCalculationsRemaining(): number {
  const trial = getTrial();
  if (!trial) return FREE_TRIAL_CALC_LIMIT;
  return Math.max(0, FREE_TRIAL_CALC_LIMIT - trial.calcCount);
}

export function incrementTrialCalcCount(): void {
  const trial = getTrial();
  if (!trial) return;
  trial.calcCount += 1;
  localStorage.setItem(TRIAL_KEY, JSON.stringify(trial));
}

// ── Plan status ───────────────────────────────────────────────────────────────

export function getCurrentPlanId(): PlanId {
  const sub = getSubscription();
  return sub?.planId ?? 'free';
}

export function isOnPlan(planId: PlanId): boolean {
  return getCurrentPlanId() === planId;
}

export function hasActiveSubscription(): boolean {
  return getSubscription() !== null;
}

export function canAccessFeature(feature: GatedFeature): boolean {
  const current = getCurrentPlanId();
  const allowed = FEATURE_PLAN_MAP[feature];
  return allowed.includes(current);
}

export function canPerformCalculation(): boolean {
  if (hasActiveSubscription()) return true;
  return isTrialActive();
}

// ── Legacy shim (keeps existing callers working) ──────────────────────────────

export function isPremiumUser(): boolean {
  return hasActiveSubscription();
}

export function isExpertUser(): boolean {
  return getCurrentPlanId() === 'expert';
}

export function isCalculatorUser(): boolean {
  return getCurrentPlanId() === 'calculator';
}

export function getCalculationCount(): number {
  const count = localStorage.getItem(CALC_COUNT_KEY);
  return count ? parseInt(count, 10) : 0;
}

export function incrementCalculationCount(): void {
  const currentCount = getCalculationCount();
  localStorage.setItem(CALC_COUNT_KEY, (currentCount + 1).toString());
  incrementTrialCalcCount();
}

export function isCalculationLimitReached(): boolean {
  if (hasActiveSubscription()) return false;
  return !isTrialActive() && getTrial() !== null;
}

export function getRemainingCalculations(): number {
  if (hasActiveSubscription()) return -1;
  return getTrialCalculationsRemaining();
}

// Mock function — will be replaced by Stripe webhook handler
export function activateSubscription(planId: Exclude<PlanId, 'free'>): void {
  const now = new Date();
  const expires = new Date(now);
  expires.setMonth(expires.getMonth() + 1);
  setSubscription({
    planId,
    billing: 'monthly',
    startedAt: now.toISOString(),
    expiresAt: expires.toISOString(),
  });
}

export function setPremiumStatus(active: boolean, expiresAt?: Date): void {
  if (active && expiresAt) {
    setSubscription({
      planId: 'expert',
      billing: 'monthly',
      startedAt: new Date().toISOString(),
      expiresAt: expiresAt.toISOString(),
    });
  } else {
    clearSubscription();
  }
}
