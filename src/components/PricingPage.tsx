import { useState } from 'react';
import { CheckCircle, X, ChevronRight, Hash, ChevronDown, Lock, Zap, Star, Crown, Gift, MessageCircle } from 'lucide-react';
import SiteNavigation from './SiteNavigation';
import SiteFooter from './SiteFooter';
import { PLANS, WHATSAPP_LINK } from '../utils/subscription';
import { useAuth } from '../contexts/AuthContext';

interface PricingPageProps {
  onNavigate: (page: string) => void;
  onShowAuth: () => void;
  onShowSignIn?: () => void;
}

const planIcons: Record<string, React.ElementType> = { silver: Zap, gold: Star, platinum: Crown };

const silverNotIncluded = [
  'Written interpretations on numbers',
  'AI Name Correction full analysis',
  'AI Tarot Reading',
  'Business Numerology full profile',
  'Client-ready PDF with interpretation text',
];

const featureComparison = [
  { label: 'All numeric calculators', silver: true, gold: true, platinum: true },
  { label: 'Lo Shu Grid — grid & arrow display', silver: true, gold: true, platinum: true },
  { label: 'Compatibility score & matrix', silver: true, gold: true, platinum: true },
  { label: 'Transit chart numbers', silver: true, gold: true, platinum: true },
  { label: 'House / Car / Mobile numbers', silver: true, gold: true, platinum: true },
  { label: 'Business name number', silver: true, gold: true, platinum: true },
  { label: 'PDF export (numbers)', silver: true, gold: true, platinum: true },
  { label: 'Save charts', silver: 'Unlimited', gold: 'Unlimited', platinum: 'Unlimited' },
  { label: 'Written interpretations', silver: false, gold: true, platinum: true },
  { label: 'Over-energy analysis & warnings', silver: false, gold: true, platinum: true },
  { label: 'Personal Year Forecast narrative', silver: false, gold: true, platinum: true },
  { label: 'PDF export with interpretations', silver: false, gold: true, platinum: true },
  { label: 'AI Name Correction (full analysis)', silver: false, gold: false, platinum: true },
  { label: 'AI Tarot Reading', silver: false, gold: false, platinum: true },
  { label: 'Business Numerology full profile', silver: false, gold: false, platinum: true },
  { label: 'Client-ready PDF with interpretations', silver: false, gold: false, platinum: true },
];

const faqs = [
  {
    q: 'Is there a free trial?',
    a: 'Yes — when you sign up and complete setup, you get a 3-day free trial with unlimited calculations using Silver plan tools. No credit card required. After the trial, request activation for the plan that fits your practice.',
  },
  {
    q: 'How do I activate a paid plan?',
    a: 'After your trial ends, you\'ll see an activation request form. Choose your plan, confirm your details, and submit. Our team will review and activate your subscription. You can also message us directly on WhatsApp at +91 7900075531.',
  },
  {
    q: 'What is the difference between Silver, Gold, and Platinum?',
    a: 'Silver gives you all the numeric outputs — the numbers themselves — for every tool. Gold adds written interpretations, over-energy analysis, and PDF exports with interpretation text. Platinum adds AI-powered tools: Name Correction analysis, Tarot readings, Business Numerology full profile, and client-ready PDF reports.',
  },
  {
    q: 'Can I cancel at any time?',
    a: 'Yes. Cancel from your account settings at any time. Your access continues until the end of your current billing month. No further charges after cancellation.',
  },
  {
    q: 'Will I lose my saved charts if I cancel?',
    a: 'No data is deleted. If you cancel, charts go into read-only mode. Re-activate at any time to regain full access.',
  },
];

function CheckCell({ value }: { value: boolean | string }) {
  if (value === true) return <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" />;
  if (value === false) return <X className="w-4 h-4 text-slate-600 mx-auto" />;
  return <span className="text-sm text-blue-300 font-medium">{value}</span>;
}

export default function PricingPage({ onNavigate, onShowAuth, onShowSignIn }: PricingPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { user } = useAuth();

  const handlePlanClick = () => {
    if (user) {
      onNavigate('activate');
    } else {
      onShowAuth();
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <SiteNavigation onNavigate={onNavigate} onShowAuth={onShowAuth} onShowSignIn={onShowSignIn} currentPage="pricing" />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.12) 0%, transparent 60%)`
        }} />
        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 px-5 py-2 rounded-full mb-6 text-sm font-medium">
            <Gift className="w-4 h-4" />
            3-Day Free Trial — No Credit Card Required
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-5 leading-tight">
            Plans Built for<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              How You Work
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-4">
            Whether you need fast calculations or full client-ready reports — there is a plan for your practice.
          </p>
          <p className="text-sm text-blue-400/80 font-medium mb-10">
            Intentional pricing: ₹991 → 1 (new beginnings) · ₹1,299 → 3 (creativity) · ₹1,499 → 5 (change & growth)
          </p>

          <button
            onClick={onShowAuth}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
          >
            Start Free Trial
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-gray-500 text-sm mt-3">3 days · Unlimited calculations · No credit card</p>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 items-start">

          {/* Silver Plan */}
          <div className="bg-slate-800 border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-blue-400" />
              <p className="text-blue-300 text-sm font-semibold uppercase tracking-wider">Silver</p>
            </div>
            <div className="flex items-end gap-2 mb-1">
              <span className="text-5xl font-bold text-white">₹{PLANS.silver.monthlyPrice.toLocaleString()}</span>
              <span className="text-gray-400 mb-2">/month</span>
            </div>
            <p className="text-gray-500 text-sm mb-2">Billed monthly · Cancel anytime</p>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">{PLANS.silver.description}</p>

            <button
              onClick={handlePlanClick}
              className="w-full py-3.5 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-colors mb-2 border border-white/10"
            >
              {user ? 'Request Activation' : 'Start Free Trial'}
            </button>
            <p className="text-center text-xs text-gray-500 mb-8">{user ? 'Or message us on WhatsApp' : '3 days free · no card needed'}</p>

            <div className="space-y-1 mb-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Included</p>
              {PLANS.silver.features.map(f => (
                <div key={f} className="flex items-start gap-2.5 py-1.5 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>

            <div className="space-y-1 pt-4 border-t border-white/5">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">Not included</p>
              {silverNotIncluded.map(f => (
                <div key={f} className="flex items-start gap-2.5 py-1.5 text-sm text-gray-500">
                  <Lock className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Gold Plan */}
          <div className="bg-gradient-to-b from-blue-950/80 to-slate-900/80 border-2 border-blue-500/40 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-bl from-blue-500/10 to-transparent w-48 h-48 rounded-2xl pointer-events-none" />
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <p className="text-blue-300 text-sm font-semibold uppercase tracking-wider">Gold</p>
                </div>
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</span>
              </div>
              <div className="flex items-end gap-2 mb-1">
                <span className="text-5xl font-bold text-white">₹{PLANS.gold.monthlyPrice.toLocaleString()}</span>
                <span className="text-gray-400 mb-2">/month</span>
              </div>
              <p className="text-gray-400 text-sm mb-2">Billed monthly · Cancel anytime</p>
              <p className="text-gray-300 text-sm mb-8 leading-relaxed">{PLANS.gold.description}</p>

              <button
                onClick={handlePlanClick}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/25 mb-2"
              >
                {user ? 'Request Activation' : 'Start Free Trial'}
              </button>
              <p className="text-center text-xs text-gray-500 mb-8">{user ? 'Or message us on WhatsApp' : '3 days free · no card needed'}</p>

              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Included</p>
                {PLANS.gold.features.map(f => (
                  <div key={f} className="flex items-start gap-2.5 py-1.5 text-sm text-gray-200">
                    <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Platinum Plan */}
          <div className="bg-gradient-to-b from-amber-950/40 to-slate-900/80 border-2 border-amber-500/30 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-bl from-amber-500/10 to-transparent w-48 h-48 rounded-2xl pointer-events-none" />
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <p className="text-amber-300 text-sm font-semibold uppercase tracking-wider">Platinum</p>
                </div>
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full">BEST VALUE</span>
              </div>
              <div className="flex items-end gap-2 mb-1">
                <span className="text-5xl font-bold text-white">₹{PLANS.platinum.monthlyPrice.toLocaleString()}</span>
                <span className="text-gray-400 mb-2">/month</span>
              </div>
              <p className="text-gray-400 text-sm mb-2">Billed monthly · Cancel anytime</p>
              <p className="text-gray-300 text-sm mb-8 leading-relaxed">{PLANS.platinum.description}</p>

              <button
                onClick={handlePlanClick}
                className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-amber-500/25 mb-2"
              >
                {user ? 'Request Activation' : 'Start Free Trial'}
              </button>
              <p className="text-center text-xs text-gray-500 mb-8">{user ? 'Or message us on WhatsApp' : '3 days free · no card needed'}</p>

              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Everything included</p>
                {PLANS.platinum.features.map(f => (
                  <div key={f} className="flex items-start gap-2.5 py-1.5 text-sm text-gray-200">
                    <CheckCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Activation info */}
        <div className="max-w-6xl mx-auto mt-6">
          <div className="bg-blue-500/8 border border-blue-500/20 rounded-xl px-5 py-4 flex items-center gap-4">
            <Hash className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <p className="text-blue-200/80 text-sm flex-1">
              <span className="font-semibold text-blue-300">No online payment yet.</span> After your free trial, request plan activation and our team will set you up. You can also message us on WhatsApp.
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-sm font-semibold rounded-lg hover:bg-[#25D366]/20 transition-colors flex-shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Free trial highlight */}
      <section className="py-12 px-4 sm:px-6 bg-gradient-to-r from-emerald-900/30 to-blue-900/30 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">What You Get in Your Free Trial</h2>
            <p className="text-gray-400">Full access to Silver plan tools for 3 days. No credit card. No commitment.</p>
          </div>
          <div className="grid sm:grid-cols-4 gap-4">
            {[
              { val: '3', label: 'Days Free', sub: 'Full access period' },
              { val: '∞', label: 'Calculations', sub: 'Unlimited · All tools' },
              { val: '14+', label: 'Tools', sub: 'Core, Lo Shu, Compat…' },
              { val: '₹0', label: 'Upfront Cost', sub: 'No card required' },
            ].map(s => (
              <div key={s.label} className="bg-slate-800/60 border border-white/10 rounded-2xl p-5 text-center">
                <div className="text-3xl font-bold text-white mb-1">{s.val}</div>
                <div className="text-sm font-semibold text-blue-300">{s.label}</div>
                <div className="text-xs text-gray-500 mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={onShowAuth}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all"
            >
              <Gift className="w-5 h-5" />
              Start My Free Trial
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-gray-500 text-sm mt-3">No credit card · No commitment · Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* Feature comparison table */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-10">Full Feature Comparison</h2>
          <div className="bg-slate-800 border border-white/10 rounded-2xl overflow-hidden overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-slate-700/50">
                  <th className="text-left px-6 py-4 text-white font-semibold text-sm">Feature</th>
                  <th className="text-center px-4 py-4 text-blue-300 font-semibold text-sm w-32">Silver<br /><span className="font-normal text-gray-400 text-xs">₹{PLANS.silver.monthlyPrice.toLocaleString()}/mo</span></th>
                  <th className="text-center px-4 py-4 text-blue-300 font-semibold text-sm w-32">Gold<br /><span className="font-normal text-gray-400 text-xs">₹{PLANS.gold.monthlyPrice.toLocaleString()}/mo</span></th>
                  <th className="text-center px-4 py-4 text-amber-300 font-semibold text-sm w-32">Platinum<br /><span className="font-normal text-gray-400 text-xs">₹{PLANS.platinum.monthlyPrice.toLocaleString()}/mo</span></th>
                </tr>
              </thead>
              <tbody>
                {featureComparison.map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="px-6 py-3.5 text-gray-300 text-sm">{row.label}</td>
                    <td className="px-4 py-3.5 text-center"><CheckCell value={row.silver} /></td>
                    <td className="px-4 py-3.5 text-center"><CheckCell value={row.gold} /></td>
                    <td className="px-4 py-3.5 text-center"><CheckCell value={row.platinum} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 bg-slate-800/30 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-slate-800 border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="text-white font-medium pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform text-gray-500 ${openFaq === i ? 'rotate-180 text-blue-400' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-400 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-900/60 via-slate-900 to-cyan-900/40 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <Hash className="w-10 h-10 text-blue-400 mx-auto mb-5" />
          <h2 className="text-4xl font-bold text-white mb-4">Start Your Free Trial Today</h2>
          <p className="text-gray-400 mb-2">3 days, unlimited calculations, no credit card.</p>
          <p className="text-gray-500 text-sm mb-8">See exactly what fits your practice before requesting a plan.</p>
          <button
            onClick={onShowAuth}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-xl hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg shadow-blue-500/20"
          >
            <Gift className="w-5 h-5" />
            Start Free Trial — No Card Needed
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <SiteFooter onNavigate={onNavigate} onShowAuth={onShowAuth} />
    </div>
  );
}
