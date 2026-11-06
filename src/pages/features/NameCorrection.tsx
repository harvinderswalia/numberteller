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
  Wand2,
  Check,
  ArrowRight,
  LayoutGrid,
  Briefcase,
  FileDown,
} from 'lucide-react';

const calculates = [
  'Harmony scoring across Birthday, Life Path, Expression and Soul Urge',
  'Goal targets for Career, Relationships, Wealth, Health and Spirituality',
  'Pythagorean micro-mutations — single-letter spelling changes that shift the number',
  'Over-energy detection to avoid stacking too many of the same vibration',
  'Top 8 ranked suggestions, sorted by combined harmony score',
];

const rules = [
  'Every variant is scored against the client’s birth numbers, not a generic ideal',
  'Master numbers 11, 22 and 33 are preserved in variant scoring — never reduced away',
  'Only Pythagorean-valid letter substitutions are generated',
  'Over-energy guard prevents suggestions that pile on a single vibration the client already has in excess',
  'Each suggestion shows the changed letters, the resulting numbers and the harmony delta',
];

const faqs = [
  {
    question: 'How does the tool decide which name variants to suggest?',
    answer:
      'The engine applies single-letter Pythagorean micro-mutations to the client’s current name, scores each variant against their Birthday, Life Path, Expression and Soul Urge, and ranks the results by combined harmony. You receive the top eight suggestions sorted by score.',
  },
  {
    question: 'Are master numbers preserved in the suggestions?',
    answer:
      'Yes. If a name variant produces an Expression or Soul Urge of 11, 22 or 33, the master number is preserved and scored accordingly. The engine never collapses a master number during the correction process.',
  },
  {
    question: 'Can I choose a specific goal for the correction?',
    answer:
      'Yes. You can set a goal — Career, Relationships, Wealth, Health or Spirituality — and the engine weights the harmony scoring toward numbers that support that goal, so the ranked suggestions align with what the client wants to work on.',
  },
];

const related = [
  { title: 'Core Chart', href: '/features/core-chart', icon: LayoutGrid },
  { title: 'Business Numerology', href: '/features/business-numerology', icon: Briefcase },
  { title: 'PDF Reports', href: '/features/pdf-reports', icon: FileDown },
];

export default function NameCorrection() {
  return (
    <>
      <Seo
        title="AI Name Correction Tool for Numerologists | NumberTeller"
        description="Generate ranked name variants scored against your client’s birth numbers and goal, with master numbers preserved. For practitioners."
        path="/features/name-correction"
        jsonLd={[
          softwareApplicationSchema(),
          breadcrumbSchema([
            { name: 'Features', path: '/features' },
            { name: 'Name Correction', path: '/features/name-correction' },
          ]),
          faqSchema(faqs),
        ]}
      />
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { name: 'Features', path: '/features' },
              { name: 'Name Correction', path: '/features/name-correction' },
            ]}
          />

          {/* Hero */}
          <div className="mt-8 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-violet-500/10 text-violet-400 border border-violet-500/30 mb-6">
              <Wand2 className="w-4 h-4" />
              Platinum plan
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
              Name correction, ranked and ready to discuss
            </h1>
            <p className="text-lg text-gray-400 mb-8">
              NumberTeller generates single-letter spelling variants of your
              client’s name, scores each one against their birth numbers and
              chosen goal, and ranks the top eight — with master numbers
              preserved and over-energy guarded automatically.
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
              Suggesting a name correction means testing dozens of spelling
              variants by hand — calculating the new Expression and Soul Urge
              for each, checking them against the client’s birth numbers, and
              making sure you are not creating an over-energy. NumberTeller does
              all of that in seconds and hands you a ranked shortlist so the
              consultation stays about interpretation, not arithmetic.
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
                <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-violet-500/10 border border-violet-500/20 flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-violet-400" />
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
            AI Name Correction is a{' '}
            <Link to="/pricing" className="text-cyan-400 hover:text-cyan-300">
              Platinum
            </Link>{' '}
            plan feature. It requires the full core chart as input, so you will
            also need a plan that includes the Core Chart — which Platinum
            does.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FAQ items={faqs} heading="Name correction FAQ" />
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
