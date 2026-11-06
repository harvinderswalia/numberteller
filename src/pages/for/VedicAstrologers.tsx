import Seo from '../../components/seo/Seo';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/marketing/Breadcrumbs';
import CTABand from '../../components/marketing/CTABand';
import {
  webPageSchema,
  breadcrumbSchema,
} from '../../components/seo/schema';
import {
  Grid3x3,
  Wand2,
  Home,
  Briefcase,
  Sparkles,
  Info,
  ArrowRight,
  Quote,
} from 'lucide-react';

const pains = [
  {
    title: 'Clients ask for name and number advice',
    body: 'Your astrology clients want to know which spelling to use, which date is lucky and whether their mobile number suits them — and you want to give a confident, calculated answer.',
  },
  {
    title: 'No time to learn manual calculation',
    body: 'Pythagorean letter values, Lo Shu grid plotting and master-number reduction take hours to learn and minutes per chart. The engine does it in seconds.',
  },
  {
    title: 'You need a professional report',
    body: 'A handwritten note after a chart reading feels light. A branded PDF with the grid, numbers and interpretation gives your astrology practice a numerology arm that looks the part.',
  },
];

const tools = [
  { icon: Grid3x3, title: 'Lo Shu Grid', href: '/features/lo-shu-grid', blurb: 'Grid, power arrows and missing numbers from the date of birth.' },
  { icon: Wand2, title: 'Name Correction', href: '/features/name-correction', blurb: 'Ranked name variants scored against the client’s birth numbers.' },
  { icon: Home, title: 'House, Car & Mobile', href: '/features/house-car-mobile', blurb: 'Address, vehicle plate and phone vibration against the owner’s numbers.' },
  { icon: Briefcase, title: 'Business Numerology', href: '/features/business-numerology', blurb: 'Company number, name suggestions and partner compatibility.' },
  { icon: Sparkles, title: 'AI Tarot', href: '/features/ai-tarot', blurb: 'Tarot spreads read in the context of your client’s core numbers.' },
];

export default function VedicAstrologers() {
  return (
    <>
      <Seo
        title="Numerology Software for Vedic Astrologers | NumberTeller"
        description="Add Pythagorean numerology and Lo Shu grid analysis to your astrology consultations without learning to calculate by hand."
        path="/for/vedic-astrologers"
        jsonLd={[webPageSchema(), breadcrumbSchema([
          { name: 'For', path: '/for/vedic-astrologers' },
          { name: 'Vedic Astrologers', path: '/for/vedic-astrologers' },
        ])]}
      />
      <section className="py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Breadcrumbs items={[
            { name: 'For', path: '/for/vedic-astrologers' },
            { name: 'Vedic Astrologers', path: '/for/vedic-astrologers' },
          ]} />
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-8 mb-5 max-w-3xl">
            Add numerology to your astrology consultations
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mb-6">
            Your clients already ask about lucky names, dates and numbers.
            NumberTeller gives you the calculations and a clean report — without
            having to learn Pythagorean reduction by hand.
          </p>

          {/* Methodology note */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-14 flex items-start gap-3 max-w-3xl">
            <Info className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
            <p className="text-sm text-blue-100/80">
              NumberTeller uses the <strong className="text-blue-200">Pythagorean</strong> system
              and the <strong className="text-blue-200">Lo Shu grid</strong>. It does not
              calculate in the Chaldean system. If your practice is strictly
              Chaldean, this tool will not match your method.
            </p>
          </div>

          {/* Pains */}
          <div className="grid md:grid-cols-3 gap-6 mb-20">
            {pains.map((p) => (
              <div key={p.title} className="bg-slate-800/60 border border-white/10 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-2">{p.title}</h2>
                <p className="text-sm text-gray-400">{p.body}</p>
              </div>
            ))}
          </div>

          {/* Tools */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-white mb-8">Numerology tools that pair with astrology</h2>
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
                “My astrology clients kept asking whether a name change would
                help. I used to refer them out. Now I run the Lo Shu grid and a
                name correction in the same sitting and hand them a report — it
                rounds out the consultation without me having to learn a new
                calculation method.”
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white font-bold">
                  SB
                </div>
                <div>
                  <p className="text-white font-medium">Dr Sameer Bhatia</p>
                  <p className="text-sm text-gray-400">Vedic astrologer, Pune</p>
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
