export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
  type?: 'website' | 'article';
}

export const MARKETING_ROUTES: RouteMeta[] = [
  {
    path: '/',
    title: 'Numerology Software for Numerologists | NumberTeller',
    description:
      'Stop calculating charts by hand. Pythagorean charts, Lo Shu grid, name correction and client PDF reports in seconds. 3 days free.',
  },
  {
    path: '/features',
    title: '16 Numerology Tools for Practitioners | NumberTeller',
    description:
      'Core chart, Lo Shu, transits, compatibility, name correction, business numerology and PDF reports — every calculation, done right.',
  },
  {
    path: '/features/core-chart',
    title: 'Pythagorean Numerology Chart Software | NumberTeller',
    description:
      'Life Path, Expression, Soul Urge, Birthday, Maturity and Karmic Lessons calculated in seconds, with master numbers kept intact.',
  },
  {
    path: '/features/lo-shu-grid',
    title: 'Lo Shu Grid Software for Numerologists | NumberTeller',
    description:
      'Generate the Lo Shu grid from any date of birth with power arrows, missing numbers and plane analysis — no manual plotting.',
  },
  {
    path: '/features/name-correction',
    title: 'AI Name Correction Tool for Numerologists | NumberTeller',
    description:
      "Generate ranked name variants scored against your client's birth numbers and goal, with master numbers preserved. For practitioners.",
  },
  {
    path: '/features/compatibility',
    title: 'Numerology Compatibility Software — Couples & Partners',
    description:
      'Multi-factor compatibility for couples and business partners: Life Path, Expression and Soul Urge harmony with a clear score.',
  },
  {
    path: '/features/transit-chart',
    title: 'Personal Year & Pinnacle Calculator for Practitioners',
    description:
      'Personal year, personal month and pinnacle cycles calculated for any client and date, ready for timing and forecast readings.',
  },
  {
    path: '/features/karmic-lessons',
    title: 'Karmic Debt & Karmic Lessons Calculator for Numerologists',
    description:
      'Detect missing numbers and karmic debt 13, 14, 16 and 19 automatically, before they are lost in reduction.',
  },
  {
    path: '/features/house-car-mobile',
    title: 'Mobile, Car & House Number Numerology Tool',
    description:
      "Check a client's mobile number, car plate or address against their core numbers. Built for practitioners in India and the GCC.",
  },
  {
    path: '/features/business-numerology',
    title: 'Business Name Numerology Software for Consultants',
    description:
      'Company name numbers, brand name suggestions, owner profile and 2–5 partner compatibility in one business numerology module.',
  },
  {
    path: '/features/ai-tarot',
    title: 'AI Tarot + Numerology Readings for Practitioners',
    description:
      "Eight tarot spreads read in the context of your client's Life Path, Expression, Soul Urge and Personal Year. For practitioners.",
  },
  {
    path: '/features/pdf-reports',
    title: 'Numerology PDF Report Generator | NumberTeller',
    description:
      'Turn every chart into a client-ready PDF report and keep unlimited client charts in your account, on any device.',
  },
  {
    path: '/features/over-energy-analysis',
    title: 'Over-Energy Numerology Analysis Tool | NumberTeller',
    description:
      'Detect when a number repeats across core positions and flag the imbalance. Essential for chart interpretation and name correction.',
  },
  {
    path: '/features/remedies',
    title: 'Numerology Remedies Tool for Practitioners | NumberTeller',
    description:
      'Generate practical remedy suggestions for missing, weak and over-energy numbers — with clear disclaimers for ethical practice.',
  },
  {
    path: '/features/personal-year-forecast',
    title: 'Personal Year Forecast Software | NumberTeller',
    description:
      'Full personal year, personal month and personal day forecasts with pinnacle and challenge timing for any client date.',
  },
  {
    path: '/features/saved-client-charts',
    title: 'Saved Client Charts — Numerology CRM | NumberTeller',
    description:
      'Save unlimited client charts to your account, revisit and re-export them anytime, and keep a clean practice database.',
  },
  {
    path: '/features/harmony-analysis',
    title: 'Numerology Harmony Analysis Software | NumberTeller',
    description:
      'Score harmony between any two charts across Life Path, Expression and Soul Urge — for couples, business partners and family.',
  },
  {
    path: '/features/ai-numerology',
    title: 'AI Numerology Interpretations | NumberTeller',
    description:
      "AI-generated chart interpretations in the context of your client's numbers — drafts you review before sending to the client.",
  },
  {
    path: '/pricing',
    title: 'NumberTeller Pricing — Plans from ₹991/month',
    description:
      'Silver ₹991, Gold ₹1,299, Platinum ₹1,499 a month. Compare features and start a 3-day free trial — no credit card.',
  },
  {
    path: '/sample-report',
    title: 'Sample Numerology Report (PDF) | NumberTeller',
    description:
      'See exactly what your clients receive: a full sample chart and report produced by NumberTeller for a fictional client.',
  },
  {
    path: '/demo',
    title: 'Book a NumberTeller Demo for Your Practice',
    description:
      "A short walkthrough of NumberTeller's tools on a real chart, with plan activation help on WhatsApp or email.",
  },
  {
    path: '/for/numerologists',
    title: 'Numerology Software for Practising Numerologists',
    description:
      'Run more consultations with fewer errors. Charts, Lo Shu grids, name correction and client reports — calculated for you.',
  },
  {
    path: '/for/vedic-astrologers',
    title: 'Numerology Software for Vedic Astrologers | NumberTeller',
    description:
      'Add Pythagorean numerology and Lo Shu grid analysis to your astrology consultations without learning to calculate by hand.',
  },
  {
    path: '/for/life-coaches',
    title: 'Numerology Tools for Life Coaches | NumberTeller',
    description:
      'Use Life Path, Personal Year and compatibility insights in coaching sessions, with clean reports clients can keep.',
  },
  {
    path: '/compare/manual-calculation',
    title: 'Manual Numerology Calculation vs NumberTeller',
    description:
      'How charts done by hand or in spreadsheets compare with NumberTeller on time, accuracy, consistency and client reports.',
  },
  {
    path: '/compare/decoz-numerology-software',
    title: 'NumberTeller vs Decoz Numerology Software',
    description:
      'A fair side-by-side of NumberTeller and Decoz numerology software for professional numerologists choosing a tool.',
    noindex: true,
  },
  {
    path: '/lo-shu-grid-calculator',
    title: 'Lo Shu Grid Calculator — Free Online Chart | NumberTeller',
    description:
      'Free Lo Shu grid calculator: enter a date of birth to see the 3×3 Lo Shu chart with missing and repeated numbers, then build client reports in NumberTeller.',
  },
  {
    path: '/learn',
    title: 'Numerology Calculation Guides for Practitioners',
    description:
      'Practical guides on Pythagorean calculation rules, the Lo Shu grid, name correction and running a numerology practice.',
  },
  {
    path: '/about',
    title: 'About NumberTeller — Built for Numerology Practitioners',
    description:
      'Why we built calculation software for practising numerologists, and how the engine handles master and karmic debt numbers.',
  },
  {
    path: '/contact',
    title: 'Contact NumberTeller — Support & Plan Activation',
    description:
      'Reach the NumberTeller team on WhatsApp, phone or email for demos, plan activation and support.',
  },
  {
    path: '/terms',
    title: 'Terms of Use | NumberTeller',
    description:
      'The terms that govern use of NumberTeller, the professional numerology platform for practitioners.',
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | NumberTeller',
    description:
      "How NumberTeller collects, uses and protects your data and your clients' chart data.",
  },
  {
    path: '/billing-policy',
    title: 'Billing Policy | NumberTeller',
    description:
      'How NumberTeller plans are billed, activated, renewed and cancelled.',
  },
];

export function getRouteMeta(path: string): RouteMeta | undefined {
  return MARKETING_ROUTES.find((r) => r.path === path);
}
