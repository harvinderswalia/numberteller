export const SITE = {
  name: 'NumberTeller',
  url: 'https://www.numberteller.com',
  tagline: 'Numerology software for practising numerologists',
  locale: 'en_IN',
  themeColor: '#0f172a',

  publisher: {
    legalName: 'Confiex Data Room Private Limited',
    city: 'Mumbai',
    country: 'IN',
    telephone: '+917900075531',
    address:
      'Unit 302, Bldg 2, New Sonal Industrial Estate, Kachpada, Link Road, Malad West, Mumbai 400064',
  },

  contact: {
    email: 'support@numberteller.com',
    phone: '+91 79000 75531',
    phoneHref: 'tel:+917900075531',
    whatsapp: 'https://wa.me/917900075531',
    whatsappDemo:
      'https://wa.me/917900075531?text=Hi%2C%20I%27d%20like%20a%20NumberTeller%20demo',
  },

  trial: { days: 3, tier: 'Silver', card: false, calculations: 'Unlimited' },
  toolCount: 16,

  plans: [
    {
      id: 'silver',
      name: 'Silver',
      price: 991,
      currency: 'INR',
      period: 'month',
      badge: null as string | null,
      numerology: 1,
    },
    {
      id: 'gold',
      name: 'Gold',
      price: 1299,
      currency: 'INR',
      period: 'month',
      badge: 'Most popular',
      numerology: 3,
    },
    {
      id: 'platinum',
      name: 'Platinum',
      price: 1499,
      currency: 'INR',
      period: 'month',
      badge: 'Best value',
      numerology: 5,
    },
  ],

  stats: {
    practitioners: '500+',
    charts: '10K+',
    countries: '20+',
  },

  ogImage: '/og/numberteller-og.png',

  legal: {
    gstin: '27AAGCC9381F2ZD',
    paymentProcessor: 'Cashfree Payments',
    emailProvider: 'Resend',
    aiProvider: '',
    grievanceOfficerName: 'Harvinder Singh',
    grievanceOfficerDesignation: 'Director',
  },

  footerLegal:
    'NumberTeller is published by Confiex Data Room Private Limited, Mumbai, India.',
} as const;
