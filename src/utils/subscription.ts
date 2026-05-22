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

export const FREE_TRIAL_CALC_LIMIT = 5;
export const FREE_TRIAL_DAYS = 7;

// ─── Beta mode ────────────────────────────────────────────────────────────────
// While true: all signed-in free-plan users get unrestricted full access.
// No expiry, no calc limits, no feature gates. Flip to false at commercial launch.
export const BETA_MODE = true;
