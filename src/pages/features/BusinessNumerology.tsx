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
  Briefcase,
  Check,
  ArrowRight,
  Wand2,
  HeartHandshake,
  FileDown,
} from 'lucide-react';

const calculates = [
  'Company name number from the registered business name',
  'Energy profile of the business name vibration',
  'Business name suggester — alternative names scored against the owner’s numbers',
  'Owner profile — the founder’s core numbers in a business context',
  '2–5 partner compatibility matrix for co-founders and investors',
  'Industry pick-list to match the name number to the business sector',
];

const rules = [
  'Company name is calculated using the Pythagorean letter table with master numbers preserved',
  'The suggester generates variants scored against the owner’s Life Path and Expression',
  'Partner compatibility uses the same multi-factor engine as the Compatibility tool — Life Path, Expression and Soul Urge',
  'Silver gives you the company name number; Platinum unlocks the full module including the suggester, partner matrix and industry pick-list',
];

const faqs = [
  {
    question: 'What is included in the full business module?',
    answer:
      'The full module — available on Platinum — includes the company name number, an energy profile, a business name suggester that ranks alternative names against the owner’s numbers, the owner’s core chart in a business context, a 2–5 partner compatibility matrix, and an industry pick-list that matches the name number to the business sector.',
  },
  {
    question: 'Can I check compatibility between multiple business partners?',
    answer:
      'Yes. The partner compatibility matrix supports two to five co-founders or investors. Each pair is scored across Life Path, Expression and Soul Urge, so you can see where the partnership aligns and where it may need attention.',
  },
  {
    question: 'Does the business name suggester work like the personal name correction?',
    answer:
      'It uses the same Pythagorean principles — generating name variants and scoring them against the owner’s core numbers — but it is tuned for business contexts, weighting toward numbers that support commercial goals and matching results to an industry pick-list.',
  },
];

const related = [
  { title: 'Name Correction', href: '/features/name-correction', icon: Wand2 },
  { title: 'Compatibility', href: '/features/compatibility', icon: HeartHandshake },
  { title: 'PDF Reports', href: '/features/pdf-reports', icon: FileDown },
];

export default function BusinessNumerology() {
  return (
    <>
      <Seo
        title="Business Name Numerology Software for Consultants"
        description="Company name numbers, brand name suggestions, owner profile and 2–5 partner compatibility in one business numerology module."
        path="/features/business-numerology"
        jsonLd={[
          softwareApplicationSchema(),
          breadcrumbSchema([
            { name: 'Features', path: '/features' },
            { name: 'Business Numerology', path: '/features/business-numerology' },
          ]),
          faqSchema(faqs),
        ]}
      />
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { name: 'Features', path: '/features' },
              { name: 'Business Numerology', path: '/features/business-numerology' },
            ]}
          />

          {/* Hero */}
          <div className="mt-8 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-violet-500/10 text-violet-400 border border-violet-500/30 mb-6">
              <Briefcase className="w-4 h-4" />
              Silver name number · Platinum full module
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
              Business numerology for your corporate clients
            </h1>
            <p className="text-lg text-gray-400 mb-8">
              NumberTeller calculates the company name number, suggests
              brand-name alternatives scored against the owner’s numbers,
              profiles the founder, and checks compatibility across up to five
              partners — all in one business numerology module.
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
              Business numerology consultations require more than a single name
              calculation — you need the company number, the owner’s
              profile, alternative name suggestions, and a compatibility check
              across every co-founder. Running each by hand is slow and
              inconsistent. NumberTeller brings all of it into one module so you
              can deliver a complete business reading in a single session.
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
            The company name number is available on the{' '}
            <Link to="/pricing" className="text-cyan-400 hover:text-cyan-300">
              Silver
            </Link>{' '}
            plan. The full business module — name suggester, owner profile,
            2–5 partner compatibility matrix and industry pick-list —
            is a{' '}
            <Link to="/pricing" className="text-cyan-400 hover:text-cyan-300">
              Platinum
            </Link>{' '}
            feature.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FAQ items={faqs} heading="Business numerology FAQ" />
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
