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
  Sparkles,
  Check,
  ArrowRight,
  LayoutGrid,
  CalendarRange,
  Wand2,
} from 'lucide-react';

const calculates = [
  'Eight tarot spreads — from Single Card to the Celtic Cross',
  'Digital draw or manual card entry for in-person readings',
  'Every reading interpreted in the context of the client’s Life Path, Expression, Soul Urge and Personal Year',
  'Five tone modes to match your consultation style',
  'Reader Mode — a clean, distraction-free view for reading aloud',
];

const rules = [
  'The client’s core numbers (LP, EX, SU) and current Personal Year are pulled into the reading automatically',
  'Card meanings are contextualised to the client’s numerological profile, not generated in a vacuum',
  'You can draw cards digitally or enter physical card positions for in-person deck readings',
  'Five tone modes let you shift the language from analytical to mystical without recalculating',
  'Reader Mode hides navigation and controls so you can focus on the interpretation during a session',
];

const faqs = [
  {
    question: 'How does numerology context improve a tarot reading?',
    answer:
      'Every card interpretation is framed by the client’s Life Path, Expression, Soul Urge and current Personal Year. So a Tower card drawn for a Life Path 7 in a Personal Year 5 is read differently than the same card for a Life Path 3 in a Personal Year 1 — the numbers shape the narrative.',
  },
  {
    question: 'Can I use my own physical deck instead of the digital draw?',
    answer:
      'Yes. You can switch to manual entry and type in the card positions as you draw them from your own deck. The engine interprets the cards you enter with the same numerological context and tone options.',
  },
  {
    question: 'What are the five tone modes?',
    answer:
      'The five tones let you match the reading to your consultation style — from analytical and structured to warm and conversational to mystical and esoteric. You can switch tones without redrawing the cards, so you can preview how the same spread reads in different voices.',
  },
];

const related = [
  { title: 'Core Chart', href: '/features/core-chart', icon: LayoutGrid },
  { title: 'Transit Chart', href: '/features/transit-chart', icon: CalendarRange },
  { title: 'Name Correction', href: '/features/name-correction', icon: Wand2 },
];

export default function AITarot() {
  return (
    <>
      <Seo
        title="AI Tarot + Numerology Readings for Practitioners"
        description="Eight tarot spreads read in the context of your client’s Life Path, Expression, Soul Urge and Personal Year. For practitioners."
        path="/features/ai-tarot"
        jsonLd={[
          softwareApplicationSchema(),
          breadcrumbSchema([
            { name: 'Features', path: '/features' },
            { name: 'AI Tarot', path: '/features/ai-tarot' },
          ]),
          faqSchema(faqs),
        ]}
      />
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Breadcrumbs
            items={[
              { name: 'Features', path: '/features' },
              { name: 'AI Tarot', path: '/features/ai-tarot' },
            ]}
          />

          {/* Hero */}
          <div className="mt-8 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-violet-500/10 text-violet-400 border border-violet-500/30 mb-6">
              <Sparkles className="w-4 h-4" />
              Platinum plan
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
              Tarot readings that know your client’s numbers
            </h1>
            <p className="text-lg text-gray-400 mb-8">
              NumberTeller reads eight tarot spreads — from a single card to
              the Celtic Cross — in the context of your client’s Life
              Path, Expression, Soul Urge and Personal Year, with five tone modes
              and a distraction-free Reader Mode for live sessions.
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
              Generic tarot interpretations ignore the person sitting in front of
              you. The same card means different things for different clients,
              but most tools do not know their numbers. NumberTeller pulls the
              client’s Life Path, Expression, Soul Urge and Personal Year
              into every spread automatically — so your readings are
              personalised to the client, not recited from a booklet.
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
            AI Tarot + Numerology is a{' '}
            <Link to="/pricing" className="text-cyan-400 hover:text-cyan-300">
              Platinum
            </Link>{' '}
            plan feature. It draws on the client’s core chart and transit
            numbers, so it requires the tools that produce them — all of
            which are included in Platinum.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FAQ items={faqs} heading="AI tarot FAQ" />
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
