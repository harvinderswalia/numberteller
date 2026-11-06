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
  FileDown,
  Check,
  ArrowRight,
  LayoutGrid,
  Wand2,
  HeartHandshake,
} from 'lucide-react';

const calculates = [
  'PDF report levels — numbers only (Silver), with interpretation (Gold), full client-ready (Platinum)',
  'Every chart type exportable — core chart, Lo Shu grid, compatibility, transit, business and more',
  'Unlimited saved client charts in your account, accessible on any device',
];

const rules = [
  'Silver PDFs contain the calculated numbers, master-number flags and karmic debt markers — no narrative',
  'Gold PDFs add written interpretation for each number and section',
  'Platinum PDFs are full client-ready documents with cover, interpretation, charts and branding',
  'Every saved chart is stored in your account and synced across devices — you never lose a client’s chart',
  'Reports are generated from the same engine that produces the on-screen results, so the PDF always matches what you saw',
];

const faqs = [
  {
    question: 'What is the difference between the three PDF levels?',
    answer:
      'Silver PDFs contain the numbers only — every calculated value with master and karmic flags, but no written text. Gold PDFs add interpretation for each number and section. Platinum PDFs are full client-ready documents with a cover page, complete interpretation, charts and professional formatting ready to hand or send to a client.',
  },
  {
    question: 'Is there a limit on how many charts I can save?',
    answer:
      'No. You can save unlimited client charts in your account on every plan. Charts are stored securely and accessible from any device when you log in, so you never lose a client’s work even if you change computers.',
  },
  {
    question: 'Can I regenerate a PDF after updating a chart?',
    answer:
      'Yes. Because the PDF is generated from the same engine as the on-screen results, you can update a saved chart and regenerate the PDF at any time. The new report will always reflect the latest calculations.',
  },
];

const related = [
  { title: 'Core Chart', href: '/features/core-chart', icon: LayoutGrid },
  { title: 'Name Correction', href: '/features/name-correction', icon: Wand2 },
  { title: 'Compatibility', href: '/features/compatibility', icon: HeartHandshake },
];

export default function PdfReports() {
  return (
    <>
      <Seo
        title="Numerology PDF Report Generator | NumberTeller"
        description="Turn every chart into a client-ready PDF report and keep unlimited client charts in your account, on any device."
        path="/features/pdf-reports"
        jsonLd={[
          softwareApplicationSchema(),
          breadcrumbSchema([
            { name: 'Features', path: '/features' },
            { name: 'PDF Reports', path: '/features/pdf-reports' },
          ]),
          faqSchema(faqs),
        ]}
      />
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { name: 'Features', path: '/features' },
              { name: 'PDF Reports', path: '/features/pdf-reports' },
            ]}
          />

          {/* Hero */}
          <div className="mt-8 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-slate-700/50 text-slate-300 border border-slate-600 mb-6">
              <FileDown className="w-4 h-4" />
              All plans · levels vary by plan
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
              Reports your clients keep, charts you never lose
            </h1>
            <p className="text-lg text-gray-400 mb-8">
              Turn every chart into a client-ready PDF report — numbers only
              on Silver, with interpretation on Gold, full client-ready on
              Platinum — and keep unlimited saved client charts in your
              account, on any device.
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
              Hand-typed reports take time, vary from client to client, and live
              on whatever laptop you used last week. NumberTeller generates the
              PDF from the same engine that produced the on-screen results, so
              every report is consistent and accurate — and every chart is
              saved in your account, so you never lose a client’s work.
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
            PDF export is available on every plan.{' '}
            <Link to="/pricing" className="text-cyan-400 hover:text-cyan-300">
              Silver
            </Link>{' '}
            gives you numbers-only PDFs.{' '}
            <Link to="/pricing" className="text-cyan-400 hover:text-cyan-300">
              Gold
            </Link>{' '}
            adds written interpretation.{' '}
            <Link to="/pricing" className="text-cyan-400 hover:text-cyan-300">
              Platinum
            </Link>{' '}
            produces the full client-ready document with cover, charts and
            branding. Unlimited saved charts are included on all plans.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FAQ items={faqs} heading="PDF reports FAQ" />
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
