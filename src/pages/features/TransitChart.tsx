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
  CalendarRange,
  Check,
  ArrowRight,
  LayoutGrid,
  HeartHandshake,
  FileDown,
} from 'lucide-react';

const calculates = [
  'Personal Year number for any calendar year',
  'Personal Month number for any month within that year',
  'Pinnacle cycles — the four major life-period numbers',
  'Challenge numbers — the four complementary challenge numbers',
];

const rules = [
  'Personal Year is calculated from the birth month, birth day and the target year, reduced to a single digit or master number',
  'Personal Month combines the Personal Year with the calendar month',
  'Pinnacles are derived from the birth date using the standard four-period formula, with master numbers preserved',
  'Challenges are calculated from the same birth-date components and paired with their corresponding pinnacle',
  'Silver delivers the raw numbers; Gold and above add a written narrative for each cycle',
];

const faqs = [
  {
    question: 'Can I calculate transits for a future year?',
    answer:
      'Yes. You enter the client’s date of birth and any target year, and the engine returns the Personal Year, Personal Month (for any month you choose), pinnacles and challenges for that period. This makes it easy to prepare timing readings well in advance.',
  },
  {
    question: 'What is the difference between Silver and Gold for transit charts?',
    answer:
      'Silver gives you all the numbers — Personal Year, Personal Month, pinnacles and challenges. Gold and above add a written narrative for each cycle, so you can read or hand the interpretation directly to your client.',
  },
  {
    question: 'Are pinnacles and challenges calculated from the birth date?',
    answer:
      'Yes. Both are derived from the birth month, birth day and birth year using the standard four-period formula. The engine preserves master numbers throughout, so a pinnacle of 11 or 22 is reported as such, not reduced.',
  },
];

const related = [
  { title: 'Core Chart', href: '/features/core-chart', icon: LayoutGrid },
  { title: 'Compatibility', href: '/features/compatibility', icon: HeartHandshake },
  { title: 'PDF Reports', href: '/features/pdf-reports', icon: FileDown },
];

export default function TransitChart() {
  return (
    <>
      <Seo
        title="Personal Year & Pinnacle Calculator for Practitioners"
        description="Personal year, personal month and pinnacle cycles calculated for any client and date, ready for timing and forecast readings."
        path="/features/transit-chart"
        jsonLd={[
          softwareApplicationSchema(),
          breadcrumbSchema([
            { name: 'Features', path: '/features' },
            { name: 'Transit Chart', path: '/features/transit-chart' },
          ]),
          faqSchema(faqs),
        ]}
      />
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { name: 'Features', path: '/features' },
              { name: 'Transit Chart', path: '/features/transit-chart' },
            ]}
          />

          {/* Hero */}
          <div className="mt-8 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-slate-700/50 text-slate-300 border border-slate-600 mb-6">
              <CalendarRange className="w-4 h-4" />
              Silver · Gold+ for narrative
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
              Timing readings without the cycle arithmetic
            </h1>
            <p className="text-lg text-gray-400 mb-8">
              Enter a client’s date of birth and any target year and
              NumberTeller calculates the Personal Year, Personal Month,
              pinnacles and challenges — with master numbers preserved and a
              written narrative on Gold and above.
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
              Timing readings require you to add the birth month, birth day and
              target year, then repeat the process for every month the client
              asks about — and separately work out the four pinnacle and four
              challenge cycles. It is repetitive and error-prone by hand.
              NumberTeller runs every cycle in seconds for any year you choose,
              so you can prepare a full timing forecast in minutes.
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
            Transit charts are included in the{' '}
            <Link to="/pricing" className="text-cyan-400 hover:text-cyan-300">
              Silver
            </Link>{' '}
            plan, which gives you all the numbers. The{' '}
            <Link to="/pricing" className="text-cyan-400 hover:text-cyan-300">
              Gold
            </Link>{' '}
            plan and above add a written narrative for each cycle, so your
            timing readings come with interpretation ready to share.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FAQ items={faqs} heading="Transit chart FAQ" />
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
