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
  Grid3x3,
  Check,
  ArrowRight,
  LayoutGrid,
  ScrollText,
  Home,
} from 'lucide-react';

const calculates = [
  'Grid placement of every digit from the date of birth',
  'Repeated digits shown with their count and intensity',
  'Missing numbers highlighted as potential growth areas',
  'Power arrows (rows, columns and diagonals) plotted automatically',
  'Plane analysis across the mental, emotional and practical planes',
];

const rules = [
  'Digits 1–9 are placed into the classic 3×3 Lo Shu layout from the full date of birth',
  'Zero is not placed in the grid (it amplifies adjacent numbers but occupies no cell)',
  'Repeated digits increase the intensity of that cell’s energy',
  'Missing digits flag the qualities the person may need to develop',
  'Power arrows form when three cells in a row, column or diagonal are all present',
];

const faqs = [
  {
    question: 'How are repeated numbers handled in the grid?',
    answer:
      'Each occurrence of a digit is placed in its cell, so repeated numbers increase the intensity of that cell’s energy. The grid display shows the count alongside the digit, making it easy to spot over-energised or under-energised areas at a glance.',
  },
  {
    question: 'Does the tool show power arrows automatically?',
    answer:
      'Yes. NumberTeller checks every row, column and diagonal for complete lines and plots the resulting power arrows on the grid. You see which arrows are active without having to trace them yourself.',
  },
  {
    question: 'What about the number zero?',
    answer:
      'Zero is not placed in a Lo Shu cell. It is noted as an amplifier of the digits it sits between in the birth date, but it does not occupy any position in the 3×3 grid.',
  },
];

const related = [
  { title: 'Core Chart', href: '/features/core-chart', icon: LayoutGrid },
  { title: 'Karmic Lessons', href: '/features/karmic-lessons', icon: ScrollText },
  { title: 'House, Car & Mobile', href: '/features/house-car-mobile', icon: Home },
];

export default function LoShuGrid() {
  return (
    <>
      <Seo
        title="Lo Shu Grid Software for Numerologists | NumberTeller"
        description="Generate the Lo Shu grid from any date of birth with power arrows, missing numbers and plane analysis — no manual plotting."
        path="/features/lo-shu-grid"
        jsonLd={[
          softwareApplicationSchema(),
          breadcrumbSchema([
            { name: 'Features', path: '/features' },
            { name: 'Lo Shu Grid', path: '/features/lo-shu-grid' },
          ]),
          faqSchema(faqs),
        ]}
      />
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { name: 'Features', path: '/features' },
              { name: 'Lo Shu Grid', path: '/features/lo-shu-grid' },
            ]}
          />

          {/* Hero */}
          <div className="mt-8 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-slate-700/50 text-slate-300 border border-slate-600 mb-6">
              <Grid3x3 className="w-4 h-4" />
              Included in Silver
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
              The Lo Shu grid, plotted and analysed instantly
            </h1>
            <p className="text-lg text-gray-400 mb-8">
              Enter a date of birth and NumberTeller builds the full Lo Shu grid
              — digit placement, repeated numbers, missing numbers, power
              arrows and plane analysis — so you can move straight to
              interpretation.
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
              Plotting a Lo Shu grid by hand means counting every digit, tracking
              repetitions, and then checking each row, column and diagonal for
              power arrows. It is slow and easy to miscount. NumberTeller plots
              the grid, flags missing numbers and draws every active arrow
              automatically — so the grid is ready before your client sits down.
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
            The Lo Shu Grid is included in the{' '}
            <Link to="/pricing" className="text-cyan-400 hover:text-cyan-300">
              Silver
            </Link>{' '}
            plan and above. You get the full grid, missing-number flags, power
            arrows and plane analysis from day one of your trial.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FAQ items={faqs} heading="Lo Shu grid FAQ" />
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
