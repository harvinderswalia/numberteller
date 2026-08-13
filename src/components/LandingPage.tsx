import { useState, useEffect } from 'react';
import { ChevronRight, Star, Users, Award, Hash, BarChart3, FileText, Download, Save, Brain, Grid3x3 as Grid3X3, Heart, Home, Smartphone, Car, Calculator, TrendingUp, Shield, Clock, CheckCircle, ArrowRight, Sparkles, BookOpen, Layers, Building2, Gift } from 'lucide-react';
import SiteNavigation from './SiteNavigation';
import SiteFooter from './SiteFooter';
import { useAuth } from '../contexts/AuthContext';

interface LandingPageProps {
  onNavigate: (page: string) => void;
  onShowAuth: () => void;
  onShowSignIn?: () => void;
}

const testimonials = [
  {
    name: "Priya Nair",
    location: "Dubai, UAE",
    profession: "Certified Numerologist & Life Coach",
    text: "NumberTeller has transformed how I run my practice. The AI Name Correction tool alone saves me 2 hours per client session. The PDF reports are professional enough to charge premium fees.",
    rating: 5,
    avatar: "PN",
    result: "3x revenue growth in 6 months"
  },
  {
    name: "Dr. Sameer Bhatia",
    location: "London, UK",
    profession: "Vedic Astrologer & Pythagorean Numerologist",
    text: "I've tried every numerology platform out there. Nothing comes close to the depth of NumberTeller's Core Chart. The Lo Shu Grid analysis is the most accurate I've used in 15 years of practice.",
    rating: 5,
    avatar: "SB",
    result: "500+ client charts saved"
  },
  {
    name: "Ananya Krishnamurthy",
    location: "Singapore",
    profession: "Business Numerology Consultant",
    text: "My corporate clients expect precision and professionalism. The Transit Chart and Compatibility tools help me deliver exactly that. The chart export feature is a game-changer for board presentations.",
    rating: 5,
    avatar: "AK",
    result: "Serves Fortune 500 clients"
  },
  {
    name: "Marcus Webb",
    location: "Toronto, Canada",
    profession: "Holistic Practitioner & Numerologist",
    text: "The Karmic Lessons analysis in the Core Chart is unlike anything else available. My clients always comment on how thorough and insightful the reports are. Worth every penny.",
    rating: 5,
    avatar: "MW",
    result: "4.9-star rated practice"
  },
  {
    name: "Fatima Al-Rashid",
    location: "Abu Dhabi, UAE",
    profession: "Numerology & Feng Shui Consultant",
    text: "Switching to NumberTeller was the best decision for my business. The House Number and Business Name tools are my clients' favourites. The accuracy of the Pythagorean calculations is unmatched.",
    rating: 5,
    avatar: "FR",
    result: "Doubled client retention"
  }
];

const allTools = [
  { icon: BarChart3, title: 'Core Chart Reading', desc: 'Life Path, Expression, Soul Urge, Birthday, Maturity & Karmic Lessons — complete chart in seconds', page: 'calculator', color: 'from-blue-600 to-blue-500' },
  { icon: Brain, title: 'AI Name Correction', desc: 'Intelligent name variants aligned to your client\'s desired outcomes using BD, LP, EX & SU harmony scoring', page: 'name-correction', color: 'from-cyan-600 to-cyan-500' },
  { icon: Grid3X3, title: 'Lo Shu Grid', desc: 'Chinese 9-grid energy mapping: detect power arrows, missing numbers, and plane analysis', page: 'loshu', color: 'from-emerald-600 to-teal-500' },
  { icon: Heart, title: 'Compatibility', desc: 'Multi-factor relationship and business partnership analysis with detailed harmony scoring', page: 'compatibility', color: 'from-rose-600 to-rose-500' },
  { icon: TrendingUp, title: 'Transit Chart', desc: 'Personal year, month, and pinnacle cycle forecasting for in-depth life timing readings', page: 'calculator', color: 'from-amber-600 to-orange-500' },
  { icon: FileText, title: 'Karmic Lessons', desc: 'Missing number analysis revealing karmic debt numbers 13, 14, 16, and 19 with remedial guidance', page: 'calculator', color: 'from-purple-600 to-purple-500' },
  { icon: Home, title: 'House Number', desc: 'Numerological energy assessment of residential and commercial addresses', page: 'house', color: 'from-teal-600 to-cyan-600' },
  { icon: Car, title: 'Car Number', desc: 'Vehicle registration number analysis for luck and harmony with owner\'s core numbers', page: 'house', color: 'from-slate-600 to-slate-500' },
  { icon: Smartphone, title: 'Mobile Number', desc: 'Phone number vibration analysis and optimisation for business and personal use', page: 'house', color: 'from-orange-600 to-amber-500' },
  { icon: Calculator, title: 'Business Name', desc: 'Company name numerology with EX/SU alignment for maximum business success', page: 'house', color: 'from-blue-700 to-blue-600' },
  { icon: Download, title: 'PDF Export', desc: 'Generate and download professional branded PDF reports to share with clients', page: 'calculator', color: 'from-emerald-700 to-emerald-600' },
  { icon: Save, title: 'Save Charts', desc: 'Securely store up to 10 client charts per account — access anytime, anywhere', page: 'saved', color: 'from-cyan-700 to-cyan-600' },
  { icon: Layers, title: 'AI Tarot Reading', desc: 'Numerology-integrated tarot spreads with AI-generated contextual narratives and actionable guidance', page: 'tarot', color: 'from-blue-600 to-blue-400', badge: 'NEW' },
  { icon: Building2, title: 'Business Numerology', desc: 'Company name analysis, ideal business number matching, brand name suggestions, and partner compatibility', page: 'business', color: 'from-amber-600 to-orange-500', badge: 'NEW' },
];

export default function LandingPage({ onNavigate, onShowAuth, onShowSignIn }: LandingPageProps) {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useAuth();

  const goToTool = (page: string) => {
    if (!user) {
      onShowAuth();
    } else {
      onNavigate(page);
    }
  };

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setTestimonialIndex(i => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      <SiteNavigation onNavigate={onNavigate} onShowAuth={onShowAuth} onShowSignIn={onShowSignIn} currentPage="home" />

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(ellipse at 10% 60%, rgba(59,130,246,0.18) 0%, transparent 55%),
              radial-gradient(ellipse at 90% 30%, rgba(6,182,212,0.15) 0%, transparent 55%),
              radial-gradient(ellipse at 50% 90%, rgba(16,185,129,0.1) 0%, transparent 40%)`
          }} />
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/25 text-blue-300 px-5 py-2 rounded-full mb-8 text-sm font-medium">
              <Award className="w-4 h-4" />
              Professional Numerology Platform — Built for Practitioners
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.08] tracking-tight">
              Every Numerology Tool
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
                Under One Roof
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
              The complete calculation suite for professional numerologists. Deliver expert consultations faster, with greater accuracy and polished client reports.
            </p>
            <p className="text-base text-gray-400 mb-10 max-w-2xl mx-auto">
              Core Charts · Lo Shu Grid · AI Name Correction · Transit Charts · Compatibility · Business Numerology · House, Car & Mobile Numbers · Karmic Lessons · PDF Export
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
              <button
                onClick={onShowAuth}
                className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-xl shadow-2xl shadow-blue-500/25 hover:from-blue-500 hover:to-cyan-500 transition-all hover:scale-105"
              >
                <Gift className="w-5 h-5" />
                Start Free Trial — No Card Needed
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('pricing')}
                className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/15 text-white font-semibold text-lg rounded-xl hover:bg-white/10 hover:border-white/25 transition-all backdrop-blur-sm"
              >
                View Pricing
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-500 text-sm mb-12">3 days free · Unlimited calculations · No credit card</p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
              {[
                { val: '500+', label: 'Practitioners' },
                { val: '12+', label: 'Tools Included' },
                { val: '10K+', label: 'Charts Created' },
              ].map(s => (
                <div key={s.label} className="bg-slate-800/50 backdrop-blur border border-white/10 rounded-xl py-4 px-3">
                  <div className="text-2xl font-bold text-white">{s.val}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF STRIP ─── */}
      <div className="bg-slate-800/50 border-y border-white/10 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
          <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Pythagorean Numerology</div>
          <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Lo Shu Grid</div>
          <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Master Number Aware</div>
          <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Karmic Debt Detection</div>
          <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> PDF Export</div>
          <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Secure Cloud Storage</div>
          <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> AI Tarot Reading</div>
          <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400" /> Vedic Vastu Analysis</div>
        </div>
      </div>

      {/* ─── ALL TOOLS GRID ─── */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Everything You Need, Nothing You Don't
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              14 precision tools designed to cover every aspect of a professional numerology consultation.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allTools.map((tool, i) => (
              <button
                key={i}
                onClick={() => goToTool(tool.page)}
                className="group text-left bg-slate-800/60 hover:bg-slate-800 border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all hover:shadow-xl hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <tool.icon className="w-6 h-6 text-white" />
                  </div>
                  {(tool as any).badge && (
                    <span className="text-[10px] font-bold bg-blue-500 text-white px-2 py-0.5 rounded-full">{(tool as any).badge}</span>
                  )}
                </div>
                <h3 className="text-white font-semibold mb-2">{tool.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{tool.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Open tool <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AI NAME CORRECTION FEATURE SPOTLIGHT ─── */}
      <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 px-4 py-2 rounded-full mb-6 text-sm font-medium">
                <Brain className="w-4 h-4" />
                Flagship Feature
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                AI-Powered
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
                  Name Correction Tool
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                The most sophisticated name optimisation engine available for numerologists. Instantly generate name variants that align your client's Expression and Soul Urge numbers with their desired life outcomes.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Analyses BD, LP, EX & SU harmony scoring in real time',
                  'Goal-based targets: Career, Relationships, Wealth, Health, Spirituality',
                  'Applies Pythagorean micro-mutations (double letters, c/k swaps, vowel shifts)',
                  'Automatically detects and avoids over-energy imbalances',
                  'Ranks top 8 name suggestions with alignment scores',
                  'Preserves master numbers 11, 22, 33 throughout analysis',
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => goToTool('name-correction')}
                className="group flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-semibold rounded-xl hover:from-cyan-500 hover:to-teal-500 transition-all shadow-lg shadow-cyan-500/20"
              >
                Try Name Correction Tool
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-3xl blur-3xl opacity-15" />
              <div className="relative bg-slate-800 border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-600 to-teal-600 rounded-xl flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">AI Name Correction</p>
                    <p className="text-gray-400 text-sm">Alignment analysis in progress</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {[
                    { name: 'PRIYA SHARMA', ex: '7', su: '3', score: 94, tag: 'Top Match' },
                    { name: 'PRIYA SHHARMA', ex: '6', su: '3', score: 88, tag: 'Strong' },
                    { name: 'PRIIYA SHARMA', ex: '7', su: '2', score: 82, tag: 'Good' },
                  ].map((n, i) => (
                    <div key={i} className="bg-slate-900/60 rounded-xl p-4 border border-white/5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-mono font-semibold text-sm">{n.name}</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${i === 0 ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-700 text-gray-400'}`}>{n.tag}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span>EX: <span className="text-white font-semibold">{n.ex}</span></span>
                        <span>SU: <span className="text-white font-semibold">{n.su}</span></span>
                        <div className="flex items-center gap-2 ml-auto">
                          <div className="w-24 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full" style={{ width: `${n.score}%` }} />
                          </div>
                          <span className="text-cyan-400 font-semibold">{n.score}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
                  <p className="text-cyan-300 text-sm font-medium mb-1">Goal: Career &amp; Wealth</p>
                  <p className="text-gray-400 text-xs">Target EX: 1, 8 · Target SU: 1, 6, 8</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── AI TAROT FEATURE SPOTLIGHT ─── */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Visual mock — left side */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600 rounded-3xl blur-3xl opacity-10" />
              <div className="relative bg-slate-800 border border-white/10 rounded-3xl p-8 shadow-2xl">
                {/* Spread header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                      <Layers className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Past · Present · Future</p>
                      <p className="text-gray-500 text-xs">Celtic Cross Spread · 3 cards drawn</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-blue-500 text-white px-2 py-0.5 rounded-full">NEW</span>
                </div>

                {/* Cards row */}
                <div className="flex items-end justify-around gap-2 mb-6">
                  {[
                    { emoji: '🌙', name: 'High Priestess', label: 'Past', color: 'from-blue-700 to-blue-900', rev: false },
                    { emoji: '⚡', name: 'The Tower', label: 'Present', color: 'from-red-700 to-red-900', rev: false },
                    { emoji: '⭐', name: 'The Star', label: 'Future', color: 'from-sky-600 to-blue-700', rev: false },
                  ].map((c, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div className={`w-20 h-32 rounded-xl bg-gradient-to-br ${c.color} border border-white/20 flex flex-col items-center justify-center p-2 shadow-xl`}>
                        <span className="text-3xl mb-1">{c.emoji}</span>
                        <span className="text-white text-[9px] font-bold text-center leading-tight">{c.name}</span>
                      </div>
                      <span className="text-gray-500 text-[10px] font-medium">{c.label}</span>
                    </div>
                  ))}
                </div>

                {/* AI narrative preview */}
                <div className="bg-slate-900/60 rounded-2xl p-4 mb-4 border border-white/5">
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-300 text-xs font-semibold uppercase tracking-wider">AI Narrative</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                    "The High Priestess in your past reveals deep intuitive wisdom that shaped your journey — aligned powerfully with your LP 7's need for inner knowledge. The Tower now demands honest reckoning…"
                  </p>
                </div>

                {/* Numerology bridge */}
                <div className="bg-cyan-500/8 border border-cyan-500/15 rounded-xl p-3 flex items-start gap-2">
                  <Hash className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <p className="text-cyan-300 text-xs leading-relaxed">
                    <span className="font-semibold">Numerology Bridge:</span> The Star (card 17 → 8) resonates with your Personal Year 8 — financial mastery and recognition are destined themes this cycle.
                  </p>
                </div>
              </div>
            </div>

            {/* Text — right side */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/25 text-blue-300 px-4 py-2 rounded-full mb-6 text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                New Feature — AI Tarot
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                Tarot Meets Numerology —
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
                  Powered by AI
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                The first tarot tool built specifically for numerology practitioners. Draw cards, enter your client's core numbers, and let the AI generate a cohesive reading that bridges both traditions into one powerful narrative.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  '8 professional spreads — Single Card to Celtic Cross (10 cards)',
                  'Digital card draw or manual entry from your physical deck',
                  'AI reads cards in context of Life Path, Expression, Soul Urge & Personal Year',
                  '5 tone modes: Empowering, Spiritual, Practical, Direct, Vedic-flavoured',
                  'Reader Mode — AI guides, you add personal practitioner insights',
                  'Relationship, Career, Name Correction Validation & Personal Year spreads',
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => goToTool('tarot')}
                className="group flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg shadow-blue-500/20"
              >
                <Layers className="w-5 h-5" />
                Try AI Tarot Reading
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BUSINESS NUMEROLOGY SPOTLIGHT ─── */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text — left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/25 text-amber-300 px-4 py-2 rounded-full mb-6 text-sm font-medium">
                <Building2 className="w-4 h-4" />
                New Feature — Business Numerology
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                Build Businesses on
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                  the Right Vibration
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                The only numerology platform with a dedicated business module. Analyse company names, match owners to their ideal business number, suggest compatible brand names, and evaluate partner compatibility — all in Pythagorean numerology.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Analyse any company name — get its Pythagorean number, energy profile, strengths and ideal industries',
                  'Business Name Suggester — enter keywords and target number, get matching name combinations instantly',
                  'Owner Profile — discover your ideal business number, compatible industries and natural business temperament based on Life Path',
                  'Partner Compatibility — input 2–5 partners, score pairwise compatibility with dynamics, strengths and watch-outs',
                  'Pick-list of industry types: restaurant, dental clinic, jewellery store, production house, sales company and more',
                  'Compatible brand name suggestions generated to match your Life Path-aligned business numbers',
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => goToTool('business')}
                className="group flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-xl hover:from-amber-500 hover:to-orange-500 transition-all shadow-lg shadow-amber-500/20"
              >
                <Building2 className="w-5 h-5" />
                Try Business Numerology
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Visual mock — right */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 rounded-3xl blur-3xl opacity-10" />
              <div className="relative bg-slate-800 border border-white/10 rounded-3xl p-8 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Business Numerology</p>
                      <p className="text-gray-500 text-xs">Company Analysis · Partner Match</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-amber-400">8</p>
                    <p className="text-xs text-gray-500">Company Number</p>
                  </div>
                </div>

                {/* Company analysis */}
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-amber-300 text-xs font-semibold">Power & Abundance</span>
                    <span className="text-amber-400 font-bold text-sm">8</span>
                  </div>
                  <p className="text-gray-400 text-xs">Material mastery, authority, and large-scale achievement. Built to generate wealth and significant market impact.</p>
                </div>

                {/* Partner compatibility */}
                <div className="space-y-2 mb-4">
                  {[
                    { name: 'Rahul (LP 4)', compat: 95, label: 'Ideal' },
                    { name: 'Priya (LP 8)', compat: 85, label: 'Strong' },
                    { name: 'Anil (LP 5)', compat: 62, label: 'Caution' },
                  ].map((p, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs text-gray-400 w-28 flex-shrink-0">{p.name}</span>
                      <div className="flex-1 bg-slate-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${p.compat >= 85 ? 'bg-green-500' : p.compat >= 70 ? 'bg-amber-500' : 'bg-rose-500'}`}
                          style={{ width: `${p.compat}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 w-12 text-right">{p.label}</span>
                    </div>
                  ))}
                </div>

                {/* Name suggestion */}
                <div className="bg-slate-700/50 border border-white/10 rounded-xl p-3 flex items-start gap-2">
                  <Hash className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300 text-xs leading-relaxed">
                    <span className="font-semibold text-white">Suggested Names matching 8:</span> Apex Solutions, Prime Group, Nexus Works — all verified by Pythagorean calculation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY NUMBERTELLER ─── */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Built for the Way Practitioners Actually Work
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Not a hobbyist calculator. A professional platform designed around real consultation workflows.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Clock, title: 'Save Hours Per Client', desc: 'What used to take 30 minutes of manual calculation now happens in seconds. Spend your time on interpretation, not arithmetic.', color: 'text-blue-400' },
              { icon: Shield, title: 'Precision You Can Trust', desc: 'Master numbers (11, 22, 33) and Karmic Debt numbers (13, 14, 16, 19) are handled correctly — always preserved, never incorrectly reduced.', color: 'text-emerald-400' },
              { icon: Download, title: 'Reports Clients Love', desc: 'Export polished PDF charts that position you as a premium consultant. Clients keep them, refer back to them, and share them.', color: 'text-amber-400' },
              { icon: Save, title: 'Client Chart History', desc: 'Save unlimited charts per account. Access any client\'s full chart in one click, from any device.', color: 'text-cyan-400' },
              { icon: BookOpen, title: 'Everything Covered', desc: 'Core chart, transit forecasting, Lo Shu grid, compatibility, name correction, house / car / mobile numbers — no gaps.', color: 'text-rose-400' },
              { icon: Users, title: 'Used by 500+ Practitioners', desc: 'Trusted by numerologists, Vedic astrologers, life coaches, and holistic consultants across the UAE, India, UK, Singapore, and beyond.', color: 'text-teal-400' },
            ].map((f, i) => (
              <div key={i} className="bg-slate-800/50 border border-white/10 rounded-2xl p-7">
                <f.icon className={`w-8 h-8 ${f.color} mb-4`} />
                <h3 className="text-white font-bold text-lg mb-3">{f.title}</h3>
                <p className="text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              What Numerologists Are Saying
            </h2>
            <div className="flex items-center justify-center gap-6 text-gray-400">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
              </div>
              <span className="text-sm">Rated 4.9/5 by practitioners worldwide</span>
            </div>
          </div>

          {/* Featured testimonial */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-slate-800 border border-white/10 rounded-3xl p-8 sm:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-3xl" />
              <div className="relative">
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {testimonials[testimonialIndex].avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-3">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                    </div>
                    <p className="text-gray-200 text-lg sm:text-xl leading-relaxed mb-5">
                      "{testimonials[testimonialIndex].text}"
                    </p>
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div>
                        <p className="text-white font-semibold">{testimonials[testimonialIndex].name}</p>
                        <p className="text-blue-400 text-sm">{testimonials[testimonialIndex].profession}</p>
                        <p className="text-gray-500 text-sm">{testimonials[testimonialIndex].location}</p>
                      </div>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-medium px-4 py-2 rounded-xl">
                        {testimonials[testimonialIndex].result}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mb-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setTestimonialIndex(i)}
                className={`rounded-full transition-all duration-300 ${i === testimonialIndex ? 'bg-blue-500 w-8 h-2.5' : 'bg-slate-600 hover:bg-slate-500 w-2.5 h-2.5'}`}
              />
            ))}
          </div>

          {/* Mini testimonial grid */}
          <div className="grid sm:grid-cols-3 gap-4">
            {testimonials.slice(0, 3).map((t, i) => (
              <div key={i} className="bg-slate-800/60 border border-white/8 rounded-2xl p-5">
                <div className="flex items-center gap-1 mb-3">
                  {[1,2,3,4,5].map(j => <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">"{t.text.slice(0, 110)}..."</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white text-xs font-bold">{t.avatar}</div>
                  <div>
                    <p className="text-white text-sm font-medium">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING TEASER ─── */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 px-5 py-2 rounded-full mb-6 text-sm font-medium">
            <Gift className="w-4 h-4" />
            3-Day Free Trial — No Credit Card Required
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-400 mb-3">
            Try everything free for 3 days. Then request activation for the plan that fits your practice.
          </p>
          <p className="text-sm text-blue-400/80 font-medium mb-12">
            Intentional pricing: ₹991 → 1 (new beginnings) · ₹1,299 → 3 (creativity) · ₹1,499 → 5 (change & growth)
          </p>
          <div className="grid sm:grid-cols-3 gap-5 mb-10">
            <div className="bg-slate-800 border border-white/10 rounded-2xl p-6 text-left">
              <p className="text-blue-300 text-sm font-semibold uppercase tracking-wider mb-2">Silver</p>
              <div className="text-3xl font-bold text-white mb-1">₹991<span className="text-lg font-normal text-gray-400">/mo</span></div>
              <p className="text-gray-500 text-xs mb-5">Cancel anytime · No lock-in</p>
              <ul className="space-y-2 text-sm text-gray-300">
                {['All calculators', 'Lo Shu Grid display', 'Transit chart numbers', 'Compatibility score'].map(f => (
                  <li key={f} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />{f}</li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-900/60 to-cyan-900/40 border-2 border-blue-500/50 rounded-2xl p-6 text-left relative overflow-hidden">
              <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">POPULAR</div>
              <p className="text-blue-300 text-sm font-semibold uppercase tracking-wider mb-2">Gold</p>
              <div className="text-3xl font-bold text-white mb-1">₹1,299<span className="text-lg font-normal text-gray-400">/mo</span></div>
              <p className="text-gray-500 text-xs mb-5">Cancel anytime · No lock-in</p>
              <ul className="space-y-2 text-sm text-gray-300">
                {['Everything in Silver', 'Written interpretations', 'Over-energy analysis', 'PDF with interpretations'].map(f => (
                  <li key={f} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />{f}</li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-amber-900/40 to-orange-900/30 border-2 border-amber-500/40 rounded-2xl p-6 text-left relative overflow-hidden">
              <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">BEST</div>
              <p className="text-amber-300 text-sm font-semibold uppercase tracking-wider mb-2">Platinum</p>
              <div className="text-3xl font-bold text-white mb-1">₹1,499<span className="text-lg font-normal text-gray-400">/mo</span></div>
              <p className="text-gray-500 text-xs mb-5">Cancel anytime · No lock-in</p>
              <ul className="space-y-2 text-sm text-gray-300">
                {['Everything in Gold', 'AI Name Correction', 'AI Tarot & Business tools', 'Client-ready PDF reports'].map(f => (
                  <li key={f} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />{f}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button
              onClick={onShowAuth}
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all"
            >
              <Gift className="w-4 h-4" />
              Start Free Trial
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('pricing')}
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              View full pricing <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <p className="text-gray-600 text-sm mt-4">No credit card · 3 days · Unlimited calculations</p>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-24 bg-gradient-to-br from-blue-900 via-slate-800 to-cyan-900 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(ellipse at 30% 50%, rgba(59,130,246,0.2) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(6,182,212,0.15) 0%, transparent 60%)`
        }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur mb-6">
            <Gift className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5">
            Start Your Free Trial Today
          </h2>
          <p className="text-xl text-blue-100/80 mb-3">
            Join 500+ numerology practitioners who use NumberTeller for faster, more accurate, and more professional consultations.
          </p>
          <p className="text-blue-300/70 text-base mb-10">3 days free · Unlimited calculations · No credit card required · Cancel anytime</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onShowAuth}
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-700 font-bold text-lg rounded-xl hover:bg-blue-50 transition-all shadow-2xl"
            >
              <Gift className="w-5 h-5" />
              Start Free Trial — No Card Needed
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('pricing')}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600/30 border border-blue-400/30 text-white font-semibold text-lg rounded-xl hover:bg-blue-600/40 transition-all backdrop-blur-sm"
            >
              See Pricing Plans
            </button>
          </div>
        </div>
      </section>

      <SiteFooter onNavigate={onNavigate} onShowAuth={onShowAuth} />
    </div>
  );
}
