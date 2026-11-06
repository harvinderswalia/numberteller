import Seo from '../../components/seo/Seo';
import { Link } from 'react-router-dom';
import CTABand from '../../components/marketing/CTABand';
import Breadcrumbs from '../../components/marketing/Breadcrumbs';
import FAQ from '../../components/marketing/FAQ';
import { SITE } from '../../config/site';
import {
  softwareApplicationSchema,
  breadcrumbSchema,
  faqSchema,
} from '../../components/seo/schema';
import {
  ScrollText,
  Check,
  ArrowRight,
  LayoutGrid,
  Grid3x3,
  Wand2,
} from 'lucide-react';

const calculates = [
  'Karmic lessons — missing numbers in the full birth name',
  'Karmic debt numbers 13, 14, 16 and 19 detected in any core position',
  'Remedial guidance for each karmic debt and lesson identified',
];

const rules = [
  'Karmic lessons are the numbers 1–9 that do not appear as letter values in the full birth name',
  'Karmic debt 13, 14, 16 and 19 are flagged before reduction — they are never collapsed to 4, 5, 7 or 1 in the display',
  'Each karmic debt is shown with its core position (Life Path, Expression, Soul Urge, etc.)',
  'Silver surfaces the numbers and flags; Gold and above add written remedial guidance',
];

const faqs = [
  {
    question: 'What is the difference between a karmic lesson and a karmic debt?',
    answer:
      'A karmic lesson is a number (1–9) that is missing entirely from the letter values in the birth name, indicating an area to develop. A karmic debt is a specific two-digit number — 13, 14, 16 or 19 — that appears in a core position and carries its own meaning. NumberTeller detects both automatically.',
  },
  {
    question: 'Are karmic debt numbers reduced in the display?',
    answer:
      'No. When the engine encounters 13, 14, 16 or 19 during reduction, it flags the karmic debt and shows both the debt number and its reduced form — for example, 13/4. The debt is never silently collapsed, so you can interpret it properly.',
  },
  {
    question: 'Does the tool suggest remedies?',
    answer:
      'On the Gold plan and above, each detected karmic debt and lesson comes with written remedial guidance you can share with the client. Silver surfaces the numbers and flags so you can apply your own interpretation.',
  },
];

const related = [
  { title: 'Core Chart', href: '/features/core-chart', icon: LayoutGrid },
  { title: 'Lo Shu Grid', href: '/features/lo-shu-grid', icon: Grid3x3 },
  { title: 'Name Correction', href: '/features/name-correction', icon: Wand2 },
];

export default function KarmicLessons() {
  return (
    <>
      <Seo
        title="Karmic Debt & Karmic Lessons Calculator for Numerologists"
        description="Detect missing numbers and karmic debt 13, 14, 16 and 19 automatically, before they are lost in reduction."
        path="/features/karmic-lessons"
        jsonLd={[
          softwareApplicationSchema(),
          breadcrumbSchema([
            { name: 'Features', path: '/features' },
            { name: 'Karmic Lessons', path: '/features/karmic-lessons' },
          ]),
          faqSchema(faqs),
        ]}
      />
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { name: 'Features', path: '/features' },
              { name: 'Karmic Lessons', path: '/features/karmic-lessons' },
            ]}
          />

          {/* Hero */}
          <div className="mt-8 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-slate-700/50 text-slate-300 border border-slate-600 mb-6">
              <ScrollText className="w-4 h-4" />
              Silver · Gold+ for guidance
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
              Karmic debt and lessons, never reduced away
            </h1>
            <p className="text-lg text-gray-400 mb-8">
              NumberTeller scans the full birth name for missing numbers and
              flags karmic debt 13, 14, 16 and 19 wherever they appear —
              before reduction — so you never lose a karmic signal in the
              arithmetic.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/app/signup"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-xl shadow-2xl shadow-blue-500/25 hover:from-blue-500 hover:to-cyan-500 transition-all hover:scale-105"
              >
                Start free trial
              </Link>
              <Link
                to="/sample-report"
                className="px-8 py-4 bg-white/5 border border-white/15 text-white font-semibold text-lg rounded-xl hover:bg-white/10 hover:border-white/25 transition-all"
              >
                See a sample report
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The problem it solves */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-5">
              The problem it solves
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              Karmic debt numbers are the first thing lost when you reduce by
              hand — a 13 becomes a 4, a 19 becomes a 1, and the karmic
              signal disappears. Missing numbers in the name are equally easy to
              overlook. NumberTeller checks for both automatically and flags
              every occurrence before reduction, so your karmic analysis is
              complete and accurate.
            </p>
          </div>
        </div>
      </section>

      {/* What it calculates */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-white mb-10">
            What it calculates
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {calculates.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 bg-slate-800/60 border border-white/10 rounded-xl p-5"
              >
                <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rules applied */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-white mb-10">
            Rules applied
          </h2>
          <div className="space-y-4 max-w-3xl">
            {rules.map((rule) => (
              <div
                key={rule}
                className="flex items-start gap-3 bg-slate-800/60 border border-white/10 rounded-xl p-5"
              >
                <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/20 flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-gray-300 leading-relaxed">{rule}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Which plan includes it */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-white mb-5">
            Which plan includes it
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
            Karmic Lessons is included in the{' '}
            <Link to="/pricing" className="text-cyan-400 hover:text-cyan-300">
              Silver
            </Link>{' '}
            plan, which surfaces the missing numbers and karmic debt flags. The{' '}
            <Link to="/pricing" className="text-cyan-400 hover:text-cyan-300">
              Gold
            </Link>{' '}
            plan and above add written remedial guidance for each debt and lesson
            detected.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FAQ items={faqs} heading="Karmic lessons FAQ" />
        </div>
      </section>

      {/* Related tools */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-white mb-10">Related tools</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {related.map(({ title, href, icon: Icon }) => (
              <Link
                key={href}
                to={href}
                className="group bg-slate-800/60 border border-white/10 rounded-2xl p-6 hover:border-white/25 hover:bg-slate-800/80 transition-all"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 mb-4">
                  <Icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
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
