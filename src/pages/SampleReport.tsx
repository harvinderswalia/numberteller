import Seo from '../components/seo/Seo';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/marketing/Breadcrumbs';
import CTABand from '../components/marketing/CTABand';
import { SITE } from '../config/site';
import { webPageSchema, breadcrumbSchema } from '../components/seo/schema';
import { FileText, Download, User, Calendar, Info } from 'lucide-react';

const reportSections = [
  { label: 'Core numbers', value: 'Life Path 6 · Expression 7 · Soul Urge 1 · Birthday 6' },
  { label: 'Lo Shu grid', value: '3-3-2 plane balance · power arrows · 4, 7 missing' },
  { label: 'Karmic lessons', value: 'Missing 4 & 7 · no karmic debt detected' },
  { label: 'Personal year', value: 'Personal Year 5 (2025) — change & movement' },
  { label: 'Pinnacles', value: '3 · 5 · 4 · 6 — four life-cycle phases mapped' },
  { label: 'Transit cycles', value: 'Personal month & pinnacle timing for any date' },
];

export default function SampleReport() {
  return (
    <>
      <Seo
        title="Sample Numerology Report (PDF) | NumberTeller"
        description="See exactly what your clients receive: a full sample chart and report produced by NumberTeller for a fictional client."
        path="/sample-report"
        jsonLd={[
          webPageSchema(),
          breadcrumbSchema([{ name: 'Sample report', path: '/sample-report' }]),
        ]}
      />
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Breadcrumbs items={[{ name: 'Sample report', path: '/sample-report' }]} />
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-8 mb-5">
            See the report before you sign up
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mb-10">
            This is exactly what your clients receive from NumberTeller — a
            complete chart and written report, exported as a PDF. The client
            below is fictional, used only to show the output.
          </p>

          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm mb-8">
            <Info className="w-4 h-4 shrink-0" />
            <span>
              Fictional client for demonstration only. Priya Sharma is not a
              real person.
            </span>
          </div>

          <div className="bg-slate-800/60 border border-white/10 rounded-2xl overflow-hidden mb-8">
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-slate-800/80">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <FileText className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">
                    NumberTeller Numerology Report
                  </p>
                  <p className="text-xs text-gray-500">Sample · PDF</p>
                </div>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400">
                Sample
              </span>
            </div>

            <div className="px-6 py-6">
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Client name</p>
                    <p className="text-white font-medium">Priya Sharma</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Date of birth</p>
                    <p className="text-white font-medium">15 August 1990</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {reportSections.map((row) => (
                  <div
                    key={row.label}
                    className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 bg-slate-900/40 border border-white/10 rounded-xl px-4 py-3"
                  >
                    <span className="text-sm text-gray-500 sm:w-40 shrink-0">
                      {row.label}
                    </span>
                    <span className="text-sm text-gray-200">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Want to produce reports like this for your own clients?{' '}
            <Link to="/app/signup" className="text-cyan-400 hover:underline">
              Start a 3-day free trial
            </Link>
            .
          </p>
        </div>
      </section>
      <CTABand />
    </>
  );
}
