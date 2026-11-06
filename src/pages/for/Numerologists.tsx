import Seo from '../../components/seo/Seo';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/marketing/Breadcrumbs';
import CTABand from '../../components/marketing/CTABand';
import {
  webPageSchema,
  breadcrumbSchema,
} from '../../components/seo/schema';
import {
  LayoutGrid,
  Grid3x3,
  Wand2,
  CalendarRange,
  FileDown,
  Clock,
  AlertTriangle,
  FileSpreadsheet,
  ArrowRight,
  Quote,
} from 'lucide-react';

const painPoints = [
  {
    icon: Clock,
    title: 'Time per chart',
    body: 'A full core chart with Lo Shu grid takes 20–30 minutes by hand or in a spreadsheet — time you could spend interpreting instead of adding.',
  },
  {
    icon: AlertTriangle,
    title: 'Calculation errors',
    body: 'A single misread letter value or a master number collapsed too early changes a whole reading. The engine preserves 11, 22 and 33 and flags karmic debt automatically.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Inconsistent reports',
    body: 'Every client gets the same clean layout — core chart, grid, transits and interpretation — instead of a hand-typed document that varies from week to week.',
  },
];

const tools = [
  { icon: LayoutGrid, title: 'Core Chart', href: '/features/core-chart', blurb: 'Life Path, Expression, Soul Urge, Birthday, Maturity and Karmic Lessons.' },
  { icon: Grid3x3, title: 'Lo Shu Grid', href: '/features/lo-shu-grid', blurb: 'Grid, power arrows, missing numbers and plane analysis from date of birth.' },
  { icon: Wand2, title: 'Name Correction', href: '/features/name-correction', blurb: 'Ranked name variants scored against the client’s birth numbers and goal.' },
  { icon: CalendarRange, title: 'Transit Chart', href: '/features/transit-chart', blurb: 'Personal year, personal month and pinnacle cycles for timing readings.' },
  { icon: FileDown, title: 'PDF Reports', href: '/features/pdf-reports', blurb: 'Client-ready PDF reports and unlimited saved client charts.' },
];

export default function Numerologists() {
  return (
    <>
      <Seo
        title="Numerology Software for Practising Numerologists"
        description="Run more consultations with fewer errors. Charts, Lo Shu grids, name correction and client reports — calculated for you."
        path="/for/numerologists"
        jsonLd={[webPageSchema(), breadcrumbSchema([
          { name: 'For', path: '/for/numerologists' },
          { name: 'Numerologists', path: '/for/numerologists' },
        ])]}
      />
      <section className="py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Breadcrumbs items={[
            { name: 'For', path: '/for/numerologists' },
            { name: 'Numerologists', path: '/for/numerologists' },
          ]} />
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-8 mb-5 max-w-3xl">
            Spend your time on readings, not arithmetic
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mb-14">
            NumberTeller runs the Pythagorean and Lo Shu calculations for you —
            so every chart is consistent, every master number is preserved and
            every client leaves with a report.
          </p>

          {/* Pain points */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {painPoints.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-slate-800/60 border border-white/10 rounded-2xl p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-4">
                  <Icon className="w-6 h-6 text-amber-400" />
                </div>
                <h2 className="text-lg font-semibold text-white mb-2">{title}</h2>
                <p className="text-sm text-gray-400">{body}</p>
              </div>
            ))}
          </div>

          {/* Tools */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-white mb-8">The tools you reach for most</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map(({ icon: Icon, title, href, blurb }) => (
                <Link
                  key={href}
                  to={href}
                  className="group bg-slate-800/60 border border-white/10 rounded-2xl p-6 hover:border-white/25 hover:bg-slate-800/80 transition-all"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 mb-4">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                  <p className="text-sm text-gray-400 mb-4">{blurb}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm text-cyan-400 group-hover:gap-2.5 transition-all">
                    Explore tool
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="max-w-3xl mx-auto mb-4">
            <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-8">
              <Quote className="w-8 h-8 text-cyan-500/40 mb-4" />
              <p className="text-lg text-gray-200 leading-relaxed mb-6">
                “I used to spend the first twenty minutes of every consultation
                reducing numbers by hand. Now the chart is ready before the
                client sits down — and the PDF report looks like it came from a
                practice, not a spreadsheet.”
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
                  PN
                </div>
                <div>
                  <p className="text-white font-medium">Priya Nair</p>
                  <p className="text-sm text-gray-400">Practising numerologist, Bengaluru</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CTABand />
    </>
  );
}
