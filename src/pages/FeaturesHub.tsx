import Seo from '../components/seo/Seo';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/marketing/Breadcrumbs';
import CTABand from '../components/marketing/CTABand';
import { SITE } from '../config/site';
import {
  softwareApplicationSchema,
  breadcrumbSchema,
} from '../components/seo/schema';
import {
  LayoutGrid,
  Grid3x3,
  Wand2,
  HeartHandshake,
  CalendarRange,
  ScrollText,
  Home,
  Briefcase,
  Sparkles,
  FileDown,
  ArrowRight,
  Gauge,
  FlaskConical,
  TrendingUp,
  Save,
  Bot,
} from 'lucide-react';

interface FeatureGroup {
  title: string;
  href: string;
  blurb: string;
  icon: typeof LayoutGrid;
}

const features: FeatureGroup[] = [
  {
    title: 'Core Chart Reading',
    href: '/features/core-chart',
    blurb:
      'Life Path, Expression, Soul Urge, Birthday, Maturity and Karmic Lessons in one chart.',
    icon: LayoutGrid,
  },
  {
    title: 'Lo Shu Grid',
    href: '/features/lo-shu-grid',
    blurb:
      'Grid, power arrows, missing numbers and plane analysis from the date of birth.',
    icon: Grid3x3,
  },
  {
    title: 'AI Name Correction',
    href: '/features/name-correction',
    blurb:
      "Ranked name variants scored against your client's birth numbers and goal.",
    icon: Wand2,
  },
  {
    title: 'Compatibility',
    href: '/features/compatibility',
    blurb: 'Multi-factor scoring for couples and business partners.',
    icon: HeartHandshake,
  },
  {
    title: 'Transit Chart',
    href: '/features/transit-chart',
    blurb:
      'Personal year, personal month and pinnacle cycles for timing readings.',
    icon: CalendarRange,
  },
  {
    title: 'Karmic Lessons',
    href: '/features/karmic-lessons',
    blurb:
      'Missing numbers and karmic debt 13, 14, 16 and 19 detected automatically.',
    icon: ScrollText,
  },
  {
    title: 'House, Car & Mobile',
    href: '/features/house-car-mobile',
    blurb:
      "Address, vehicle plate and phone-number vibration against the owner's numbers.",
    icon: Home,
  },
  {
    title: 'Business Numerology',
    href: '/features/business-numerology',
    blurb:
      'Company number, name suggestions, owner profile and 2–5 partner compatibility.',
    icon: Briefcase,
  },
  {
    title: 'AI Tarot Reading',
    href: '/features/ai-tarot',
    blurb: "Tarot spreads read in the context of your client's core numbers.",
    icon: Sparkles,
  },
  {
    title: 'PDF Reports & Saved Charts',
    href: '/features/pdf-reports',
    blurb: 'Client-ready PDF reports and unlimited saved client charts.',
    icon: FileDown,
  },
  {
    title: 'Over-Energy Analysis',
    href: '/features/over-energy-analysis',
    blurb: 'Flags numbers repeated across core positions and Lo Shu grid for imbalance detection.',
    icon: Gauge,
  },
  {
    title: 'Remedies',
    href: '/features/remedies',
    blurb: 'Element-based remedy suggestions for missing and weak numbers, with responsible-practice disclaimers.',
    icon: FlaskConical,
  },
  {
    title: 'Personal Year Forecast',
    href: '/features/personal-year-forecast',
    blurb: 'Full personal year, month and day forecasts with pinnacle and challenge timing.',
    icon: TrendingUp,
  },
  {
    title: 'Saved Client Charts',
    href: '/features/saved-client-charts',
    blurb: 'Save unlimited client charts and re-export reports anytime, on any device.',
    icon: Save,
  },
  {
    title: 'Harmony Analysis',
    href: '/features/harmony-analysis',
    blurb: 'Score harmony between any two charts across Life Path, Expression and Soul Urge.',
    icon: HeartHandshake,
  },
  {
    title: 'AI Numerology',
    href: '/features/ai-numerology',
    blurb: 'AI-generated chart interpretations you review before sending to the client.',
    icon: Bot,
  },
];

export default function FeaturesHub() {
  return (
    <>
      <Seo
        title={`${SITE.toolCount} Numerology Tools for Practitioners | NumberTeller`}
        description="Core chart, Lo Shu, transits, compatibility, name correction, business numerology and PDF reports — every calculation, done right."
        path="/features"
        jsonLd={[
          softwareApplicationSchema(),
          breadcrumbSchema([{ name: 'Features', path: '/features' }]),
        ]}
      />
      <section className="py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Breadcrumbs items={[{ name: 'Features', path: '/features' }]} />
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-8 mb-5">
            Every tool a numerology consultation needs
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mb-14">
            {SITE.toolCount} tools in one login, from the core chart to the
            client's PDF report.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ title, href, blurb, icon: Icon }) => (
              <Link
                key={href}
                to={href}
                className="group bg-slate-800/60 border border-white/10 rounded-2xl p-6 hover:border-white/25 hover:bg-slate-800/80 transition-all"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 mb-4">
                  <Icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h2 className="text-lg font-semibold text-white mb-2">
                  {title}
                </h2>
                <p className="text-sm text-gray-400 mb-4">{blurb}</p>
                <span className="inline-flex items-center gap-1.5 text-sm text-cyan-400 group-hover:gap-2.5 transition-all">
                  Explore tool
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTABand />
    </>
  );
}
