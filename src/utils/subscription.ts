// Plan definitions
export type PlanId = 'free' | 'silver' | 'gold' | 'platinum';

export interface Plan {
  id: PlanId;
  name: string;
  monthlyPrice: number;
  description: string;
  features: string[];
  notIncluded: string[];
}

export const PLANS: Record<Exclude<PlanId, 'free'>, Plan> = {
  silver: {
    id: 'silver',
    name: 'Silver',
    monthlyPrice: 991,
    description: 'For experienced practitioners who need fast, accurate calculations.',
    features: [
      'All calculators with full numeric output',
      'Lo Shu Grid — grid display & power arrow detection',
      'Compatibility score & harmony matrix',
      'Transit chart — pinnacles, personal years & months',
      'House, Car & Mobile number calculators',
      'Business name number calculator',
      'Save unlimited charts',
      'PDF export (numbers only)',
    ],
    notIncluded: [
      'Written interpretations on numbers',
      'AI Name Correction full analysis',
      'AI Tarot Reading',
      'Business Numerology full profile',
      'Client-ready PDF with interpretation text',
    ],
  },
  gold: {
    id: 'gold',
    name: 'Gold',
    monthlyPrice: 1299,
    description: 'For practitioners who need written interpretations alongside their calculations.',
    features: [
      'Everything in Silver',
      'Full written interpretations on every number',
      'Over-energy analysis & detailed warnings',
      'Personal Year Forecast narrative',
      'Save unlimited charts',
      'PDF export with interpretation text',
    ],
    notIncluded: [
      'AI Name Correction full analysis',
      'AI Tarot Reading',
      'Business Numerology full profile',
    ],
  },
  platinum: {
    id: 'platinum',
    name: 'Platinum',
    monthlyPrice: 1499,
    description: 'For practitioners delivering full written analysis and client-ready reports.',
    features: [
      'Everything in Gold',
      'AI Name Correction — full harmony analysis',
      'AI Tarot Reading',
      'Business Numerology — full company profile & analysis',
      'Client-ready PDF with interpretation text',
      'Save unlimited charts',
    ],
    notIncluded: [],
  },
};

export const PLAN_PRICES: Record<string, number> = {
  free: 0,
  silver: 991,
  gold: 1299,
  platinum: 1499,
};

export const FREE_TRIAL_DAYS = 3;

// WhatsApp contact number for activation support
export const WHATSAPP_NUMBER = '+91 7900075531';
export const WHATSAPP_LINK = `https://wa.me/917900075531`;

// Beta mode is OFF — the new 3-day trial system is now active
export const BETA_MODE = false;
