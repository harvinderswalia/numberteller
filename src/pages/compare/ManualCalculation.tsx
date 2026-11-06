import Seo from '../../components/seo/Seo';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/marketing/Breadcrumbs';
import CTABand from '../../components/marketing/CTABand';
import {
  webPageSchema,
  breadcrumbSchema,
} from '../../components/seo/schema';
import {
  Clock,
  ShieldCheck,
  Repeat,
  FileDown,
  History,
  ArrowRight,
  LayoutGrid,
  Grid3x3,
  Wand2,
  CalendarRange,
} from 'lucide-react';

const rows = [
  {
    icon: Clock,
    label: 'Time per chart',
    manual: '20–30 minutes by hand, or 10–15 in a spreadsheet with formulas you maintain.',
    app: 'A few seconds. Enter the name and date of birth; the engine does the rest.',
  },
  {
    icon: ShieldCheck,
    label: 'Master & karmic numbers',
    manual: 'Easy to collapse 11, 22 or 33 too early, or miss karmic debt 13/14/16/19 in reduction.',
    app: 'Master numbers preserved during reduction; karmic debt and missing numbers flagged automatically.',
  },
  {
    icon: Repeat,
    label: 'Consistency',
    manual: 'Layout and depth vary with the practitioner’s energy on the day.',
    app: 'Every chart follows the same structure, so no client gets a thinner reading.',
  },
  {
    icon: FileDown,
    label: 'Client report',
    manual: 'A hand-typed document or a screenshot of a spreadsheet.',
    app: 'A branded PDF with chart, grid, interpretation and your practice details.',
  },
  {
    icon: History,
    label: 'Client history',
    manual: 'Files in folders, or a notebook — hard to revisit a chart from last year.',
    app: 'Unlimited saved charts in your account, searchable and re-exportable on any device.',
  },
];

const tools = [
  { icon: LayoutGrid, title: 'Core Chart', href: '/features/core-chart' },
  { icon: Grid3x3, title: 'Lo Shu Grid', href: '/features/lo-shu-grid' },
  { icon: Wand2, title: 'Name Correction', href: '/features/name-correction' },
  { icon: CalendarRange, title: 'Transit Chart', href: '/features/transit-chart' },
];

export default function ManualCalculation() {
  return (
    <>
      <Seo
        title="Manual Numerology Calculation vs NumberTeller"
        description="How charts done by hand or in spreadsheets compare with NumberTeller on time, accuracy, consistency and client reports."
        path="/compare/manual-calculation"
        jsonLd={[webPageSchema(), breadcrumbSchema([
          { name: 'Compare', path: '/compare/manual-calculation' },
          { name: 'Manual calculation', path: '/compare/manual-calculation' },
        ])]}
      />
      <section className="py-20 bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Breadcrumbs items={[
            { name: 'Compare', path: '/compare/manual-calculation' },
            { name: 'Manual calculation', path: '/compare/manual-calculation' },
          ]} />
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-8 mb-5 max-w-3xl">
            Calculating by hand vs NumberTeller
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mb-14">
            There is nothing wrong with a hand-calculated chart. The question is
            whether the time and risk are worth it when the arithmetic can run
            in seconds.
          </p>

          {/* Comparison table */}
          <div className="overflow-x-auto mb-20">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-4 pr-4 text-sm font-semibold text-gray-400 uppercase tracking-wider w-1/4">Aspect</th>
                  <th className="py-4 px-4 text-sm font-semibold text-gray-300 uppercase tracking-wider">By hand / spreadsheet</th>
                  <th className="py-4 pl-4 text-sm font-semibold text-cyan-400 uppercase tracking-wider">NumberTeller</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ icon: Icon, label, manual, app }) => (
                  <tr key={label} className="border-b border-white/5 align-top">
                    <td className="py-5 pr-4">
                      <div className="flex items-center gap-2 text-white font-medium">
                        <Icon className="w-4 h-4 text-gray-400" />
                        {label}
                      </div>
                    </td>
                    <td className="py-5 px-4 text-sm text-gray-400">{manual}</td>
                    <td className="py-5 pl-4 text-sm text-gray-200">{app}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Worked example */}
          <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-8 mb-20">
            <h2 className="text-2xl font-bold text-white mb-3">A worked example</h2>
            <p className="text-gray-400 mb-6">
              Client: <span className="text-white">Aarav Sharma</span>, born{' '}
              <span className="text-white">14 August 1985</span>.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900/60 border border-white/10 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" /> By hand
                </h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>1. Reduce day 14 → 1+4 = 5</li>
                  <li>2. Reduce month 08 → 8</li>
                  <li>3. Reduce year 1985 → 1+9+8+5 = 23 → 2+3 = 5</li>
                  <li>4. Add 5 + 8 + 5 = 18 → 1+8 = 9 (Life Path)</li>
                  <li>5. Assign letter values to “AARAV SHARMA”, sum, reduce</li>
                  <li>6. Plot the Lo Shu grid from 14/08/1985</li>
                  <li>7. Check for missing numbers and karmic debt</li>
                  <li>8. Type up the report</li>
                </ul>
                <p className="text-sm text-amber-400/80 mt-4">~25 minutes, plus risk of a slip.</p>
              </div>
              <div className="bg-slate-900/60 border border-cyan-500/20 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" /> NumberTeller
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>1. Enter “Aarav Sharma” and 14/08/1985</li>
                  <li>2. Core chart, Lo Shu grid, transits and report render instantly</li>
                  <li>3. Master numbers and karmic debt flagged</li>
                  <li>4. Export the PDF</li>
                </ul>
                <p className="text-sm text-cyan-400/80 mt-4">~10 seconds. Same result, every time.</p>
              </div>
            </div>
          </div>

          {/* Tool list */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-white mb-8">What you get instead of the spreadsheet</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {tools.map(({ icon: Icon, title, href }) => (
                <Link
                  key={href}
                  to={href}
                  className="group bg-slate-800/60 border border-white/10 rounded-2xl p-6 hover:border-white/25 hover:bg-slate-800/80 transition-all"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 mb-4">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
                  <span className="inline-flex items-center gap-1.5 text-sm text-cyan-400 group-hover:gap-2.5 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CTABand />
    </>
  );
}
