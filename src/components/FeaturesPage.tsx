import { BarChart3, Brain, Grid3x3 as Grid3X3, Heart, TrendingUp, FileText, Home, Car, Smartphone, Calculator, Download, Save, ChevronRight, CheckCircle, Sparkles, Hash, Building2, Layers } from 'lucide-react';
import SiteNavigation from './SiteNavigation';
import SiteFooter from './SiteFooter';

interface FeaturesPageProps {
  onNavigate: (page: string) => void;
  onShowAuth: () => void;
  onShowSignIn?: () => void;
}

const features = [
  {
    icon: BarChart3,
    title: 'Core Chart Reading',
    subtitle: 'Pythagorean Numerology',
    color: 'from-blue-600 to-blue-500',
    bg: 'from-blue-950/60 to-slate-900/60',
    border: 'border-blue-500/20',
    page: 'calculator',
    points: [
      'Life Path Number with master number detection (11, 22, 33)',
      'Expression Number from full birth name',
      'Soul Urge (Heart\'s Desire) Number',
      'Birthday Number, Personality Number, Maturity Number',
      'Missing numbers & Karmic Lessons analysis',
      'Karmic Debt numbers 13, 14, 16, 19 — preserved and explained',
      'Personal Year, Month, and Day forecasting',
      'Pinnacles and Challenges across 4 life periods',
    ]
  },
  {
    icon: Brain,
    title: 'AI Name Correction Tool',
    subtitle: 'Intelligent Name Optimisation',
    color: 'from-cyan-600 to-teal-500',
    bg: 'from-cyan-950/60 to-slate-900/60',
    border: 'border-cyan-500/20',
    page: 'name-correction',
    points: [
      'Analyses BD, LP, Expression & Soul Urge harmony in real time',
      'Goal-based target numbers: Career, Relationships, Wealth, Health, Spirituality',
      'Applies Pythagorean micro-mutations: double letters, c/k swaps, vowel adjustments',
      'Detects and avoids over-energy (same number repeated across core positions)',
      'Ranks top 8 name variants with percentage alignment scores',
      'Master numbers (11, 22, 33) preserved throughout all analysis',
      'Harmony-weighted scoring: friendly number groups respected',
      'Suitable for personal names, business names, and brand names',
    ]
  },
  {
    icon: Grid3X3,
    title: 'Lo Shu Grid Analysis',
    subtitle: 'Chinese 9-Grid Numerology',
    color: 'from-emerald-600 to-teal-500',
    bg: 'from-emerald-950/60 to-slate-900/60',
    border: 'border-emerald-500/20',
    page: 'loshu',
    points: [
      '3×3 Lo Shu magic square generated from date of birth',
      'Mental plane, emotional plane, and practical plane analysis',
      'Power arrows detection (Arrow of Determination, Planner, etc.)',
      'Missing number analysis with remedial guidance',
      'Repeated number analysis — over-energy flagging',
      'Full number frequency table across the 9 positions',
      'Kua number calculation from birth year and gender',
      'Compatible with Feng Shui consultations',
    ]
  },
  {
    icon: Heart,
    title: 'Compatibility Calculator',
    subtitle: 'Relationship & Partnership Analysis',
    color: 'from-rose-600 to-rose-500',
    bg: 'from-rose-950/60 to-slate-900/60',
    border: 'border-rose-500/20',
    page: 'compatibility',
    points: [
      'Multi-factor compatibility scoring (0–100)',
      'Life Path, Expression, and Soul Urge cross-comparison',
      'Harmony group analysis for each number pair',
      'Relationship strengths and friction points identified',
      'Suitable for romantic, business, and family compatibility',
      'Over-energy detection in combined charts',
      'Detailed interpretive text for each compatibility dimension',
      'Works for any two people — names and dates of birth',
    ]
  },
  {
    icon: TrendingUp,
    title: 'Transit Chart',
    subtitle: 'Life Timing & Forecasting',
    color: 'from-amber-600 to-orange-500',
    bg: 'from-amber-950/60 to-slate-900/60',
    border: 'border-amber-500/20',
    page: 'calculator',
    points: [
      'Essence numbers derived from first, middle, and last name transits',
      'Personal Year cycle (1–9) forecasting',
      'Personal Month and Personal Day breakdowns',
      'Pinnacle numbers across 4 life stages',
      'Challenge numbers for each pinnacle period',
      'Universal Year overlay for macro trend context',
      'Year-by-year life cycle progression',
      'Ideal for annual review consultations',
    ]
  },
  {
    icon: Home,
    title: 'House / Address Number',
    subtitle: 'Property & Space Numerology',
    color: 'from-teal-600 to-cyan-600',
    bg: 'from-teal-950/60 to-slate-900/60',
    border: 'border-teal-500/20',
    page: 'house',
    points: [
      'Reduces house or flat number to its core vibration',
      'Interprets energy suitability for the occupant\'s Life Path',
      'Apartment numbers handled correctly (e.g., flat 14A)',
      'Addresses with letters reduced via Pythagorean method',
      'Ideal, harmonious, and challenging number pairings shown',
      'Works for residential and commercial properties',
      'Simple, clean output — perfect for quick client questions',
      'Includes full number-by-number house interpretations',
    ]
  },
  {
    icon: Car,
    title: 'Car Number Analysis',
    subtitle: 'Vehicle Numerology',
    color: 'from-slate-600 to-slate-500',
    bg: 'from-slate-800/60 to-slate-900/60',
    border: 'border-slate-500/20',
    page: 'house',
    points: [
      'Full vehicle registration plate number reduction',
      'Harmony analysis with owner\'s core Life Path number',
      'Safety, luck, and energy vibration assessment',
      'Letter-to-number conversion using Pythagorean table',
      'Popular request tool for clients in UAE and GCC markets',
      'Instant results — ideal during live sessions',
    ]
  },
  {
    icon: Smartphone,
    title: 'Mobile Number Analysis',
    subtitle: 'Phone Number Numerology',
    color: 'from-orange-600 to-amber-500',
    bg: 'from-orange-950/60 to-slate-900/60',
    border: 'border-orange-500/20',
    page: 'house',
    points: [
      'Full phone number reduced to root vibration',
      'Harmony scoring with owner\'s Expression and Life Path',
      'Business number suitability analysis',
      'Number recommendations for practitioners advising on number selection',
      'Instant calculation — no manual work required',
    ]
  },
  {
    icon: Calculator,
    title: 'Business Name Numerology',
    subtitle: 'Company & Brand Analysis',
    color: 'from-blue-700 to-blue-600',
    bg: 'from-blue-950/60 to-slate-900/60',
    border: 'border-blue-600/20',
    page: 'house',
    points: [
      'Full company name reduced to Expression number',
      'Soul Urge number from business name vowels',
      'Compatibility with founder\'s core numbers',
      'Industry-specific number favourability guidance',
      'Brand name options can be tested in the Name Correction tool',
    ]
  },
  {
    icon: FileText,
    title: 'Karmic Lessons & Missing Numbers',
    subtitle: 'Deep Soul Analysis',
    color: 'from-purple-600 to-purple-500',
    bg: 'from-purple-950/60 to-slate-900/60',
    border: 'border-purple-500/20',
    page: 'calculator',
    points: [
      'Identifies all missing numbers (1–9) from the full birth name',
      'Karmic Lesson interpretations for each absent number',
      'Karmic Debt numbers (13, 14, 16, 19) detected and explained',
      'Hidden Passion numbers from most repeated values',
      'Subconscious Self number from missing count analysis',
      'Displayed prominently in Core Chart Reading output',
    ]
  },
  {
    icon: Download,
    title: 'PDF Export',
    subtitle: 'Professional Client Reports',
    color: 'from-emerald-700 to-emerald-600',
    bg: 'from-emerald-950/60 to-slate-900/60',
    border: 'border-emerald-600/20',
    page: 'calculator',
    points: [
      'One-click PDF generation of complete numerology charts',
      'Includes all core numbers, interpretations, and cycle forecasts',
      'Clean, professional layout suitable for client delivery',
      'No third-party software required — generated in-browser',
      'Available for Core Chart, Transit Chart, and Compatibility reports',
    ]
  },
  {
    icon: Save,
    title: 'Save & Manage Charts',
    subtitle: 'Client Chart Storage',
    color: 'from-cyan-700 to-cyan-600',
    bg: 'from-cyan-950/60 to-slate-900/60',
    border: 'border-cyan-600/20',
    page: 'saved',
    points: [
      'Save up to 10 client charts per account',
      'Load any saved chart instantly from your dashboard',
      'Name and rename charts for easy client identification',
      'Secure cloud storage via Supabase — encrypted at rest',
      'Access your charts from any device, any location',
    ]
  },
  {
    icon: Building2,
    title: 'Business Numerology',
    subtitle: 'Pythagorean Business Analysis',
    color: 'from-amber-600 to-orange-500',
    bg: 'from-amber-950/60 to-slate-900/60',
    border: 'border-amber-500/20',
    page: 'business',
    points: [
      'Analyse any company or brand name — calculate its Pythagorean number instantly',
      'Full business number profile: energy, strengths, challenges, and ideal industries',
      'Business Name Suggester — enter keywords and a target number to generate matching name combinations',
      'Industry type pick-list: restaurant, dental clinic, jewellery, sales company, production house, and more',
      'Owner Profile — discover your ideal business number and compatible industries based on Life Path',
      'Natural business temperament: strength, blind spot, and ideal role in the organisation',
      'Partner Compatibility — evaluate 2–5 business partners with pairwise scores, dynamics, and watch-outs',
      'Compatible brand name generator — names aligned to your Life Path-matched business numbers',
    ]
  },
  {
    icon: Layers,
    title: 'AI Tarot Reading',
    subtitle: 'Numerology-Integrated Spreads',
    color: 'from-blue-600 to-blue-400',
    bg: 'from-blue-950/60 to-slate-900/60',
    border: 'border-blue-500/20',
    page: 'tarot',
    points: [
      '8 professional spreads: Single Card, Celtic Cross (10 cards), Relationship, Career and more',
      'Digital card draw or manual entry from a physical deck',
      'Native AI engine weaves cards with Life Path, Expression, Soul Urge and Personal Year',
      '5 tone modes: Empowering, Spiritual, Practical, Direct, Vedic-flavoured',
      'Card-by-card breakdowns with numerology bridge sentences',
      'Full narrative synthesis across all cards in the spread',
      'Reader Mode — AI suggests, practitioner adds personal insights',
      'Name Correction Validation and Personal Year Forecast spreads built in',
    ]
  },
];

export default function FeaturesPage({ onNavigate, onShowAuth, onShowSignIn }: FeaturesPageProps) {
  return (
    <div className="min-h-screen bg-slate-900">
      <SiteNavigation onNavigate={onNavigate} onShowAuth={onShowAuth} onShowSignIn={onShowSignIn} currentPage="features" />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.12) 0%, transparent 50%), radial-gradient(ellipse at 80% 30%, rgba(6,182,212,0.1) 0%, transparent 50%)`
        }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 px-5 py-2 rounded-full mb-6 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            13 Professional Tools
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Every Feature Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Practice Needs
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            A complete professional numerology platform. Core charts, AI name correction, Lo Shu grid, transit forecasting, compatibility analysis, and much more — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onShowAuth}
              className="group flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg shadow-blue-500/20"
            >
              Sign Up for Free <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('calculator')}
              className="flex items-center justify-center gap-2 px-7 py-3.5 bg-white/5 border border-white/15 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
            >
              Try for Free
            </button>
          </div>
        </div>
      </section>

      {/* Features detail */}
      <section className="pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br ${f.bg} border ${f.border} rounded-2xl p-7 hover:border-white/20 transition-all`}
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className={`w-12 h-12 bg-gradient-to-br ${f.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <f.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{f.title}</h3>
                    <p className="text-gray-400 text-sm">{f.subtitle}</p>
                  </div>
                </div>
                <ul className="space-y-2.5 mb-5">
                  {f.points.map((p, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => onNavigate(f.page)}
                  className={`flex items-center gap-1.5 text-sm font-medium bg-gradient-to-r ${f.color} bg-clip-text text-transparent hover:opacity-80 transition-opacity`}
                >
                  Open {f.title} <ChevronRight className="w-4 h-4" style={{ color: 'rgb(96,165,250)' }} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-900/50 to-slate-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Hash className="w-10 h-10 text-blue-400 mx-auto mb-5" />
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Experience All 12 Tools?</h2>
          <p className="text-gray-400 text-lg mb-8">Create your free account and start your first consultation in minutes.</p>
          <button
            onClick={onShowAuth}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-xl hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg shadow-blue-500/20"
          >
            Sign Up for a Free Account <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <SiteFooter onNavigate={onNavigate} onShowAuth={onShowAuth} />
    </div>
  );
}
