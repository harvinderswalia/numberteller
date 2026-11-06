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
  CalendarRange,
  HeartHandshake,
  FileDown,
  ArrowRight,
  Quote,
} from 'lucide-react';

const tools = [
  { icon: LayoutGrid, title: 'Core Chart', href: '/features/core-chart', blurb: 'Life Path, Expression, Soul Urge and Birthday — the numbers that frame a coaching arc.' },
  { icon: CalendarRange, title: 'Transit Chart', href: '/features/transit-chart', blurb: 'Personal year and personal month cycles for timing goals and transitions.' },
  { icon: HeartHandshake, title: 'Compatibility', href: '/features/compatibility', blurb: 'Multi-factor scoring for couples and business partners you coach together.' },
  { icon: FileDown, title: 'PDF Reports', href: '/features/pdf-reports', blurb: 'A clean report clients can keep — a tangible takeaway from a session.' },
];

const angles = [
  'Open a session with a client’s Life Path number and what it says about their natural strengths.',
  'Use the Personal Year cycle to frame why this year feels like a beginning, a plateau or a turning point.',
  'Bring compatibility scores into couples or partnership coaching to ground a conversation in something concrete.',
  'Hand the client a PDF report at the end — something to revisit between sessions.',
];

export default function LifeCoaches() {
  return (
    <>
      <Seo
        title="Numerology Tools for Life Coaches | NumberTeller"
        description="Use Life Path, Personal Year and compatibility insights in coaching sessions, with clean reports clients can keep."
        path="/for/life-coaches"
        jsonLd={[webPageSchema(), breadcrumbSchema([
          { name: 'For', path: '/for/life-coaches' },
          { name: 'Life Coaches', path: '/for/life-coaches' },
        ])]}
      />
      <section className="py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Breadcrumbs items={[
            { name: 'For', path: '/for/life-coaches' },
            { name: 'Life Coaches', path: '/for/life-coaches' },
          ]} />
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-8 mb-5 max-w-3xl">
            Numerology insights for coaching sessions
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mb-14">
            Life Path, Personal Year and compatibility give coaches a structured
            way to talk about strengths, timing and relationships — and a report
            clients can take with them.
          </p>

          {/* Tools */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-white mb-8">Tools that fit a coaching conversation</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {tools.map(({ icon: Icon, title, href, blurb }) => (
                <Link
                  key={href}
                  to={href}
                  className="group bg-slate-800/60 border border-white/10 rounded-2xl p-6 hover:border-white/25 hover:bg-slate-800/80 transition-all flex items-start gap-4"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 shrink-0">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
                    <p className="text-sm text-gray-400 mb-3">{blurb}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm text-cyan-400 group-hover:gap-2.5 transition-all">
                      Explore tool
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Ways to use it */}
          <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-8 mb-20">
            <h2 className="text-2xl font-bold text-white mb-6">Four ways coaches use these numbers</h2>
            <ul className="space-y-4">
              {angles.map((a, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-bold shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-gray-300 leading-relaxed pt-0.5">{a}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Testimonial */}
          <div className="max-w-3xl mx-auto mb-4">
            <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-8">
              <Quote className="w-8 h-8 text-cyan-500/40 mb-4" />
              <p className="text-lg text-gray-200 leading-relaxed mb-6">
                “I bring the Personal Year into goal-setting sessions. It gives
                clients a frame for why some years are for starting and some are
                for consolidating — and the PDF report means they leave with
                something in hand, not just notes.”
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-cyan-600 flex items-center justify-center text-white font-bold">
                  AK
                </div>
                <div>
                  <p className="text-white font-medium">Ananya Krishnamurthy</p>
                  <p className="text-sm text-gray-400">Life coach, Chennai</p>
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
