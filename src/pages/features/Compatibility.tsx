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
  HeartHandshake,
  Check,
  ArrowRight,
  Briefcase,
  LayoutGrid,
  FileDown,
} from 'lucide-react';

const calculates = [
  'Life Path harmony between two people',
  'Expression alignment — how their outward energies interact',
  'Soul Urge compatibility — inner drives and emotional resonance',
  'Overall compatibility score combining all three factors',
];

const rules = [
  'Both charts are built from full name and date of birth using the Pythagorean system',
  'Master numbers 11, 22 and 33 are preserved in both charts before compatibility is scored',
  'Each factor is scored independently, then combined into an overall percentage',
  'Silver shows the score and compatibility matrix; Gold and above add a written narrative',
];

const faqs = [
  {
    question: 'Is this only for romantic couples?',
    answer:
      'No. The compatibility engine works for any two people — romantic partners, business partners, family members or friends. You enter both individuals’ names and dates of birth and the tool scores the match across Life Path, Expression and Soul Urge.',
  },
  {
    question: 'What is the difference between Silver and Gold for compatibility?',
    answer:
      'Silver gives you the compatibility score and the full matrix of how each number pair interacts. Gold and above add a written narrative interpreting the score, so you can hand the report to a client or read from it during a consultation.',
  },
  {
    question: 'Are master numbers handled in compatibility scoring?',
    answer:
      'Yes. Both charts preserve 11, 22 and 33 before the compatibility factors are calculated, so a Life Path 11 is scored as an 11 — not collapsed to a 2 — when compared against the other person’s numbers.',
  },
];

const related = [
  { title: 'Business Numerology', href: '/features/business-numerology', icon: Briefcase },
  { title: 'Core Chart', href: '/features/core-chart', icon: LayoutGrid },
  { title: 'PDF Reports', href: '/features/pdf-reports', icon: FileDown },
];

export default function Compatibility() {
  return (
    <>
      <Seo
        title="Numerology Compatibility Software — Couples & Partners"
        description="Multi-factor compatibility for couples and business partners: Life Path, Expression and Soul Urge harmony with a clear score."
        path="/features/compatibility"
        jsonLd={[
          softwareApplicationSchema(),
          breadcrumbSchema([
            { name: 'Features', path: '/features' },
            { name: 'Compatibility', path: '/features/compatibility' },
          ]),
          faqSchema(faqs),
        ]}
      />
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { name: 'Features', path: '/features' },
              { name: 'Compatibility', path: '/features/compatibility' },
            ]}
          />

          {/* Hero */}
          <div className="mt-8 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-slate-700/50 text-slate-300 border border-slate-600 mb-6">
              <HeartHandshake className="w-4 h-4" />
              Silver · Gold+ for narrative
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
              Compatibility readings with the full picture
            </h1>
            <p className="text-lg text-gray-400 mb-8">
              Enter two people’s names and dates of birth and NumberTeller
              scores their compatibility across Life Path, Expression and Soul
              Urge — with an overall score, a factor-by-factor matrix, and a
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
              A proper compatibility reading means building two full core charts
              and then comparing Life Path, Expression and Soul Urge pairs
              individually. Doing that by hand doubles the chance of a calculation
              error. NumberTeller builds both charts, scores every factor and
              combines them into a clear overall score — so you can focus on
              what the numbers mean for the relationship.
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
            Compatibility is included in the{' '}
            <Link to="/pricing" className="text-cyan-400 hover:text-cyan-300">
              Silver
            </Link>{' '}
            plan, which gives you the overall score and the full compatibility
            matrix. The{' '}
            <Link to="/pricing" className="text-cyan-400 hover:text-cyan-300">
              Gold
            </Link>{' '}
            plan and above add a written narrative interpreting the score —
            ready to read or hand to a client.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FAQ items={faqs} heading="Compatibility FAQ" />
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
