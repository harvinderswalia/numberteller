import { Users, Target, Globe, Hash, ChevronRight, Award, Shield, Zap } from 'lucide-react';
import SiteNavigation from './SiteNavigation';
import SiteFooter from './SiteFooter';

interface AboutPageProps {
  onNavigate: (page: string) => void;
  onShowAuth: () => void;
}

const team = [
  {
    name: 'Docully Product Team',
    role: 'Platform Development',
    avatar: 'DT',
    bio: 'A cross-functional team of engineers, designers, and numerology domain experts based in Dubai — building tools that make practitioners more effective.',
  },
];

const values = [
  {
    icon: Target,
    title: 'Practitioner-First',
    desc: 'Every feature is designed around real consultation workflows. We talk to practitioners constantly and build only what genuinely improves their work.'
  },
  {
    icon: Shield,
    title: 'Accuracy Above All',
    desc: 'Our calculation engine has been reviewed by multiple certified numerologists. Master numbers, karmic debt numbers, and reduction logic are all implemented correctly — no shortcuts.'
  },
  {
    icon: Zap,
    title: 'Speed & Simplicity',
    desc: 'Complex calculations that used to take 30 minutes are done in seconds. We obsess over making the interface fast and distraction-free.'
  },
  {
    icon: Globe,
    title: 'Built for Global Practitioners',
    desc: 'Numerologists work across every continent. NumberTeller supports practitioners in the UAE, India, UK, Singapore, Canada, and beyond — pricing in INR to serve the large South Asian practitioner community.'
  },
];

export default function AboutPage({ onNavigate, onShowAuth }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-slate-900">
      <SiteNavigation onNavigate={onNavigate} onShowAuth={onShowAuth} currentPage="about" />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(ellipse at 30% 40%, rgba(59,130,246,0.1) 0%, transparent 55%), radial-gradient(ellipse at 70% 60%, rgba(6,182,212,0.08) 0%, transparent 50%)`
        }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 px-5 py-2 rounded-full mb-6 text-sm font-medium">
            <Award className="w-4 h-4" />
            About NumberTeller
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Professional Numerology,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Redefined
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            NumberTeller was created to give numerology practitioners the professional-grade tools their expertise deserves. We believe the gap between a practitioner's knowledge and the tools available to them was too large — so we built the platform to close it.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4 sm:px-6 bg-slate-800/30">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-5">Why We Built NumberTeller</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Numerology is a sophisticated discipline. Yet for years, practitioners have had to rely on generic spreadsheets, outdated websites, or manual calculations to run their consultations. There was no single tool that handled the full scope of a professional numerology practice.
                </p>
                <p>
                  NumberTeller was built by Docully SaaS Technologies Co. LLC from Dubai, UAE, with a clear mandate: create a platform designed exclusively for practitioners — not casual users seeking quick answers, but professionals who stake their reputation on the accuracy and depth of their work.
                </p>
                <p>
                  From the AI-powered Name Correction tool to the precise handling of master numbers and karmic debt numbers, every feature in NumberTeller reflects the real demands of professional consultations.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-3xl blur-2xl" />
              <div className="relative bg-slate-800 border border-white/10 rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-6 text-center">
                  {[
                    { val: '2024', label: 'Founded' },
                    { val: '500+', label: 'Practitioners' },
                    { val: '12+', label: 'Tools Built' },
                    { val: '10K+', label: 'Charts Generated' },
                  ].map(s => (
                    <div key={s.label} className="py-4">
                      <div className="text-3xl font-bold text-white mb-1">{s.val}</div>
                      <div className="text-gray-400 text-sm">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">What We Stand For</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-slate-800/60 border border-white/10 rounded-2xl p-7">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
                  <v.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{v.title}</h3>
                <p className="text-gray-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company info */}
      <section className="py-16 px-4 sm:px-6 bg-slate-800/30">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800 border border-white/10 rounded-3xl p-8 sm:p-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center">
                <Hash className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-xl">Docully SaaS Technologies Co. LLC</h3>
                <p className="text-gray-400">Dubai, United Arab Emirates</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 text-sm text-gray-300">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-2">Registered Address</p>
                <p>Dubai, United Arab Emirates</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-2">Contact</p>
                <p><a href="tel:+971565043131" className="hover:text-white transition-colors">+971 56 504 3131</a></p>
                <p><a href="mailto:support@numberteller.com" className="hover:text-white transition-colors">support@numberteller.com</a></p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-2">Product</p>
                <p>NumberTeller — Professional Numerology Platform</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-2">Serves</p>
                <p>Numerologists, Vedic Astrologers, Life Coaches, Holistic Practitioners</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 bg-slate-900">
        <div className="max-w-2xl mx-auto text-center">
          <Users className="w-10 h-10 text-blue-400 mx-auto mb-5" />
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Growing Community</h2>
          <p className="text-gray-400 mb-8">
            500+ practitioners in 20+ countries trust NumberTeller for their daily consultations. Start your free account today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onShowAuth}
              className="group flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg"
            >
              Sign Up Free <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="flex items-center justify-center gap-2 px-7 py-3.5 bg-white/5 border border-white/15 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}
