import Seo from '../components/seo/Seo';
import { Link } from 'react-router-dom';
import CTABand from '../components/marketing/CTABand';
import FAQ from '../components/marketing/FAQ';
import PlanTable from '../components/marketing/PlanTable';
import { SITE } from '../config/site';
import {
  organizationSchema,
  websiteSchema,
  softwareApplicationSchema,
} from '../components/seo/schema';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Wand2,
  FileText,
  Users,
  Star,
  AlertTriangle,
  Hash,
  Grid3x3,
  Type,
  LayoutGrid,
  HeartHandshake,
  CalendarRange,
  ScrollText,
  Home as HomeIcon,
  Briefcase,
  FileDown,
  CheckCircle2,
  MousePointerClick,
  GraduationCap,
  Gauge,
  FlaskConical,
  TrendingUp,
  Save,
  Bot,
} from 'lucide-react';

/* ---------------- Feature groups (shared data) ---------------- */
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
    icon: HomeIcon,
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

/* ---------------- Manual-calculation pain cards ---------------- */
const painPoints = [
  {
    title: 'Master number reduced by mistake',
    blurb:
      '11 and 22 collapse into 2 and 4 when reduced automatically — changing the entire reading.',
    icon: Hash,
  },
  {
    title: 'Karmic debt missed',
    blurb:
      '13, 14, 16 and 19 vanish into their reduced forms and are never flagged in the chart.',
    icon: AlertTriangle,
  },
  {
    title: 'Letter value misread',
    blurb:
      'A single misread letter in a 20-letter name shifts Expression and Soul Urge silently.',
    icon: Type,
  },
  {
    title: 'Lo Shu digit misplaced',
    blurb:
      'Plotting the grid by hand means a digit in the wrong box throws off every arrow and plane.',
    icon: Grid3x3,
  },
];

/* ---------------- 3 steps ---------------- */
const steps = [
  {
    title: 'Enter client details',
    blurb:
      'Full birth name and date of birth. NumberTeller reduces every letter and digit using Pythagorean and Lo Shu rules.',
    icon: MousePointerClick,
  },
  {
    title: 'Review the charts',
    blurb:
      'Core numbers, Lo Shu grid, transits and compatibility appear instantly — master numbers preserved, karmic debt flagged.',
    icon: LayoutGrid,
  },
  {
    title: 'Export the PDF report',
    blurb:
      'Send a clean, client-ready PDF with the chart and written interpretation, and save the client for next time.',
    icon: FileDown,
  },
];

/* ---------------- Built-for cards ---------------- */
const audiences = [
  {
    title: 'For Numerologists',
    href: '/for/numerologists',
    blurb:
      'Run more consultations with fewer errors. Charts, Lo Shu grids, name correction and client reports — calculated for you.',
    icon: Star,
  },
  {
    title: 'For Vedic Astrologers',
    href: '/for/vedic-astrologers',
    blurb:
      'Add Pythagorean numerology and Lo Shu grid analysis to your astrology consultations without learning to calculate by hand.',
    icon: Sparkles,
  },
  {
    title: 'For Life Coaches',
    href: '/for/life-coaches',
    blurb:
      'Use Life Path, Personal Year and compatibility insights in coaching sessions, with clean reports clients can keep.',
    icon: GraduationCap,
  },
];

/* ---------------- Testimonials ---------------- */
const testimonials = [
  {
    quote:
      'NumberTeller has transformed how I run my practice. The AI Name Correction tool alone saves me 2 hours per client session. The PDF reports are professional enough to charge premium fees.',
    name: 'Priya Nair',
    location: 'Dubai, UAE',
  },
  {
    quote:
      "I've tried every numerology platform out there. Nothing comes close to the depth of NumberTeller's Core Chart. The Lo Shu Grid analysis is the most accurate I've used in 15 years of practice.",
    name: 'Dr Sameer Bhatia',
    location: 'London, UK',
  },
  {
    quote:
      'My corporate clients expect precision and professionalism. The Transit Chart and Compatibility tools help me deliver exactly that. The chart export feature is a game-changer for board presentations.',
    name: 'Ananya Krishnamurthy',
    location: 'Singapore',
  },
];

/* ---------------- FAQ ---------------- */
const faqs = [
  {
    question:
      'Does NumberTeller preserve master numbers (11, 22, 33) during reduction?',
    answer:
      'Yes. The calculation engine never collapses master numbers into their reduced forms unless you choose to. 11 stays 11, 22 stays 22 — exactly as a practitioner would by hand.',
  },
  {
    question: 'How does the engine handle karmic debt (13, 14, 16, 19)?',
    answer:
      'Karmic debt numbers are detected automatically before reduction and flagged clearly in the chart, alongside any missing numbers that represent karmic lessons.',
  },
  {
    question: 'Can I use both Pythagorean and Lo Shu methods?',
    answer:
      'Yes. The core chart uses the Pythagorean letter-to-number system, and the Lo Shu grid is generated from the date of birth. Both are available on every plan.',
  },
  {
    question: "What's included in the 3-day free trial?",
    answer:
      'The trial gives you unlimited calculations across every tool for three days — no credit card required. You can build real charts, test name correction and export a report before you decide.',
  },
  {
    question: 'Are the PDF reports branded with my practice name?',
    answer:
      'Reports are clean and client-ready. You can save unlimited client charts and export PDFs that include the chart and written interpretation for your clients.',
  },
  {
    question: 'Do I need to install anything?',
    answer:
      'No. NumberTeller runs in your browser on any device. There is nothing to install or update — your saved charts follow you across laptop, tablet and phone.',
  },
];

/* ---------------- Name correction bullets ---------------- */
const nameCorrectionBullets = [
  "Generates spelling variants ranked by harmony with the client's Life Path, Expression and Soul Urge",
  "Scores each variant against the client's stated goal — business growth, relationships, health",
  'Keeps master numbers intact in the reduced totals so the reading stays accurate',
  'Shows the before-and-after number shift for every suggested spelling',
];

/* ================================================================ */
export default function Home() {
  return (
    <>
      <Seo
        title="Numerology Software for Numerologists | NumberTeller"
        description="Stop calculating charts by hand. Pythagorean charts, Lo Shu grid, name correction and client PDF reports in seconds. 3 days free."
        path="/"
        jsonLd={[organizationSchema(), websiteSchema(), softwareApplicationSchema()]}
      />

      {/* Hero */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Numerology software for practising numerologists
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Every chart in seconds — and calculated right
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10">
            Pythagorean charts, Lo Shu grid, name correction and client PDF
            reports — all the arithmetic done for you, with master numbers
            preserved and karmic debt flagged.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link
              to="/app/signup"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-xl shadow-2xl shadow-blue-500/25 hover:from-blue-500 hover:to-cyan-500 transition-all hover:scale-105"
            >
              Start 3-day free trial
            </Link>
            <Link
              to="/sample-report"
              className="px-8 py-4 bg-white/5 border border-white/15 text-white font-semibold text-lg rounded-xl hover:bg-white/10 hover:border-white/25 transition-all"
            >
              See a sample report
            </Link>
          </div>
          <p className="text-sm text-gray-500 mb-12">
            No credit card · Unlimited calculations · Cancel anytime
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-slate-800/60 border border-white/10 rounded-2xl py-6">
              <p className="text-3xl font-bold text-white">
                {SITE.stats.practitioners}
              </p>
              <p className="text-sm text-gray-400 mt-1">Practitioners</p>
            </div>
            <div className="bg-slate-800/60 border border-white/10 rounded-2xl py-6">
              <p className="text-3xl font-bold text-white">
                {SITE.stats.charts}
              </p>
              <p className="text-sm text-gray-400 mt-1">Charts calculated</p>
            </div>
            <div className="bg-slate-800/60 border border-white/10 rounded-2xl py-6">
              <p className="text-3xl font-bold text-white">{SITE.toolCount} tools</p>
              <p className="text-sm text-gray-400 mt-1">In one login</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1 — manual calculation pain */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Manual calculation costs you time and accuracy
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              One misplaced digit or misread letter changes an entire reading.
              Here are the errors that happen most often when a chart is done by
              hand.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {painPoints.map(({ title, blurb, icon: Icon }) => (
              <div
                key={title}
                className="bg-slate-800/60 border border-white/10 rounded-2xl p-6"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 mb-4">
                  <Icon className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {title}
                </h3>
                <p className="text-sm text-gray-400">{blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2 — tools grid */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {SITE.toolCount} tools for a complete consultation
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              From the core chart to the client’s PDF report — every
              calculation your practice needs, in one login.
            </p>
          </div>
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
                <h3 className="text-lg font-semibold text-white mb-2">
                  {title}
                </h3>
                <p className="text-sm text-gray-400 mb-4">{blurb}</p>
                <span className="inline-flex items-center gap-1.5 text-sm text-cyan-400 group-hover:gap-2.5 transition-all">
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — three steps */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              From client details to finished report in three steps
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              No spreadsheets, no plotting grids by hand. Enter the details,
              review the charts, export the report.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map(({ title, blurb, icon: Icon }, i) => (
              <div
                key={title}
                className="relative bg-slate-800/60 border border-white/10 rounded-2xl p-8"
              >
                <span className="absolute -top-4 -left-2 text-6xl font-bold text-white/5 select-none">
                  {i + 1}
                </span>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-4">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {title}
                </h3>
                <p className="text-gray-400">{blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — rules you can check */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-8 sm:p-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 mb-5">
              <ShieldCheck className="w-6 h-6 text-green-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Rules you can check
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              The calculation engine follows the rules an experienced
              practitioner applies by hand — and shows you the proof on every
              chart.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-cyan-400 mt-0.5 shrink-0" />
                <span className="text-gray-300">
                  <strong className="text-white">
                    Master numbers preserved.
                  </strong>{' '}
                  11, 22 and 33 are kept intact during reduction — never
                  silently collapsed into 2, 4 or 6.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-cyan-400 mt-0.5 shrink-0" />
                <span className="text-gray-300">
                  <strong className="text-white">Karmic debt flagged.</strong>{' '}
                  13, 14, 16 and 19 are detected before reduction and highlighted
                  in the chart, along with missing numbers as karmic lessons.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-cyan-400 mt-0.5 shrink-0" />
                <span className="text-gray-300">
                  <strong className="text-white">
                    Pythagorean letter values.
                  </strong>{' '}
                  Every letter in the birth name is reduced with the standard
                  Pythagorean mapping — no misread values.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-cyan-400 mt-0.5 shrink-0" />
                <span className="text-gray-300">
                  <strong className="text-white">Lo Shu plotted correctly.</strong>{' '}
                  The grid is built from the date of birth with power arrows,
                  planes and missing numbers shown — no manual plotting.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 5 — AI name correction */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 mb-5">
                <Wand2 className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                AI name correction, built on numerology rules
              </h2>
              <p className="text-lg text-gray-400 mb-6">
                Instead of guessing spelling changes, NumberTeller generates and
                ranks variants against the client’s numbers and goal — so
                every suggestion is grounded in real calculation.
              </p>
              <ul className="space-y-3 mb-8">
                {nameCorrectionBullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                    <span className="text-gray-300">{bullet}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/features/name-correction"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/15 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/25 transition-all"
              >
                See how name correction works
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-8">
              <p className="text-sm text-gray-500 mb-4">Example output</p>
              <div className="space-y-3">
                {[
                  { name: 'Priya Sharma', score: 72, note: 'Original' },
                  { name: 'Preeya Sharma', score: 86, note: 'Strong harmony' },
                  { name: 'Priyaa Sharma', score: 91, note: 'Best match' },
                ].map((row) => (
                  <div
                    key={row.name}
                    className="flex items-center justify-between bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3"
                  >
                    <div>
                      <p className="text-white font-medium">{row.name}</p>
                      <p className="text-xs text-gray-500">{row.note}</p>
                    </div>
                    <span className="text-2xl font-bold text-cyan-400">
                      {row.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6 — reports your clients keep */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 mb-5">
            <FileText className="w-6 h-6 text-cyan-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Reports your clients keep
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
            Every chart becomes a clean, client-ready PDF — with the core
            numbers, Lo Shu grid and written interpretation. Save unlimited
            client charts and re-export reports in seconds, on any device.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/sample-report"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/15 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/25 transition-all"
            >
              See a sample report
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/features/pdf-reports"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-cyan-400 font-semibold hover:underline"
            >
              About PDF reports
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 7 — built for practitioners */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Built for practitioners
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              NumberTeller fits the way you already work — whether numerology is
              your whole practice or one part of it.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {audiences.map(({ title, href, blurb, icon: Icon }) => (
              <Link
                key={href}
                to={href}
                className="group bg-slate-800/60 border border-white/10 rounded-2xl p-8 hover:border-white/25 hover:bg-slate-800/80 transition-all"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-4">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {title}
                </h3>
                <p className="text-sm text-gray-400 mb-4">{blurb}</p>
                <span className="inline-flex items-center gap-1.5 text-sm text-cyan-400 group-hover:gap-2.5 transition-all">
                  Read more
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8 — plan table */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Simple, honest pricing
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Plans from ₹991 a month. Every plan starts with a 3-day free trial
              — no credit card needed.
            </p>
          </div>
          <PlanTable />
          <div className="text-center mt-10">
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:from-blue-500 hover:to-cyan-500 transition-all"
            >
              Compare plans in detail
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 9 — testimonials */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              What practitioners say
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Numerologists, astrologers and coaches across three continents run
              their charts on NumberTeller.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-slate-800/60 border border-white/10 rounded-2xl p-8 flex flex-col"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-cyan-400 text-cyan-400"
                    />
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed mb-6 flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                    <Users className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 10 — FAQ */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FAQ heading="Questions numerologists ask" items={faqs} />
        </div>
      </section>

      <CTABand />
    </>
  );
}
