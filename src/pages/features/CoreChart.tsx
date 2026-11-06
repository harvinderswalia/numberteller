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
  LayoutGrid,
  Check,
  ArrowRight,
  Grid3x3,
  ScrollText,
  FileDown,
} from 'lucide-react';

const calculates = [
  'Life Path number from the full date of birth',
  'Expression (Destiny) number from the full birth name',
  'Soul Urge (Heart’s Desire) from the vowels',
  'Birthday number from the day of month',
  'Maturity number (Life Path + Expression combined)',
  'Karmic Lessons from missing letters in the name',
  'Personality number from the consonants',
];

const rules = [
  'Pythagorean letter table A=1 through I=9, J=1 through R=9, S=1 through Z=8',
  'Master numbers 11, 22 and 33 are preserved and shown as 11/2, 22/4 and 33/6',
  'Karmic debt numbers 13, 14, 16 and 19 are flagged before reduction',
  'The letter Y is treated as a vowel when surrounded by consonants, and as a consonant when surrounded by vowels',
];

const faqs = [
  {
    question: 'Does the chart keep master numbers like 11, 22 and 33?',
    answer:
      'Yes. The engine never reduces 11, 22 or 33 during calculation. Each master number is displayed alongside its reduced form — for example 11/2 or 22/4 — so you can interpret both layers without recalculating by hand.',
  },
  {
    question: 'How does the tool handle the letter Y?',
    answer:
      'The engine treats Y as a vowel when it is surrounded by consonants (as in “Bryan”) and as a consonant when it sits next to vowels (as in “Yvonne”). This follows the standard Pythagorean convention used by most practising numerologists.',
  },
  {
    question: 'Can I generate a PDF of the core chart?',
    answer:
      'Yes. Every core chart can be exported as a PDF report. On the Silver plan you get the numbers only; Gold and above add written interpretation, and Platinum produces a full client-ready document.',
  },
];

const related = [
  { title: 'Lo Shu Grid', href: '/features/lo-shu-grid', icon: Grid3x3 },
  { title: 'Karmic Lessons', href: '/features/karmic-lessons', icon: ScrollText },
  { title: 'PDF Reports', href: '/features/pdf-reports', icon: FileDown },
];

export default function CoreChart() {
  return (
    <>
      <Seo
        title="Pythagorean Numerology Chart Software | NumberTeller"
        description="Life Path, Expression, Soul Urge, Birthday, Maturity and Karmic Lessons calculated in seconds, with master numbers kept intact."
        path="/features/core-chart"
        jsonLd={[
          softwareApplicationSchema(),
          breadcrumbSchema([
            { name: 'Features', path: '/features' },
            { name: 'Core Chart', path: '/features/core-chart' },
          ]),
          faqSchema(faqs),
        ]}
      />
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { name: 'Features', path: '/features' },
              { name: 'Core Chart', path: '/features/core-chart' },
            ]}
          />

          {/* Hero */}
          <div className="mt-8 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-slate-700/50 text-slate-300 border border-slate-600 mb-6">
              <LayoutGrid className="w-4 h-4" />
              Included in Silver
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
              A complete Pythagorean chart in seconds
            </h1>
            <p className="text-lg text-gray-400 mb-8">
              Enter a client’s name and date of birth and NumberTeller builds
              the full core chart — Life Path, Expression, Soul Urge, Birthday,
              Maturity, Personality and Karmic Lessons — with every master number
              preserved and every karmic debt flagged.
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
              Building a full core chart by hand takes 20–30 minutes and a
              single misread letter value or a master number collapsed too early
              changes the entire reading. NumberTeller runs every reduction
              consistently, preserves 11/22/33 and flags karmic debt 13/14/16/19
              automatically — so you spend your time interpreting, not adding.
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
            The Core Chart is included in the{' '}
            <Link to="/pricing" className="text-cyan-400 hover:text-cyan-300">
              Silver
            </Link>{' '}
            plan and above. Silver gives you every core number with master and
            karmic flags; Gold adds written interpretation and Platinum adds the
            full client-ready PDF report.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FAQ items={faqs} heading="Core chart FAQ" />
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
