import { useState } from 'react';
import { CheckCircle, X, ChevronRight, Hash, ChevronDown, Lock, Zap, Star, Gift } from 'lucide-react';
import SiteNavigation from './SiteNavigation';
import SiteFooter from './SiteFooter';
import { PLANS } from '../utils/subscription';

interface PricingPageProps {
  onNavigate: (page: string) => void;
  onShowAuth: () => void;
}

const calculatorFeatures = [
  'All calculators with full numeric output',
  'Lo Shu Grid — grid display & power arrow detection',
  'Compatibility score & harmony matrix',
  'Transit chart — pinnacles, personal years & months',
  'House, Car & Mobile number calculators',
  'Business name number calculator',
  'Save up to 5 charts',
  'PDF export (numbers only)',
];

const calculatorNotIncluded = [
  'Written interpretations on numbers',
  'AI Name Correction full analysis',
  'AI Tarot Reading',
  'Business Numerology full profile',
  'Client-ready PDF with interpretation text',
];

const expertFeatures = [
  'Everything in Calculator',
  'Full written interpretations on every number',
  'Over-energy analysis & detailed warnings',
  'AI Name Correction — full harmony analysis',
  'AI Tarot Reading',
  'Business Numerology — full company profile',
  'Personal Year Forecast narrative',
  'Client-ready PDF with interpretation text',
  'Save up to 10 charts',
];

const featureComparison = [
  { label: 'All numeric calculators', calculator: true, expert: true },
  { label: 'Lo Shu Grid — grid & arrow display', calculator: true, expert: true },
  { label: 'Compatibility score & matrix', calculator: true, expert: true },
  { label: 'Transit chart numbers', calculator: true, expert: true },
  { label: 'House / Car / Mobile numbers', calculator: true, expert: true },
  { label: 'Business name number', calculator: true, expert: true },
  { label: 'PDF export (numbers)', calculator: true, expert: true },
  { label: 'Save charts', calculator: '5 charts', expert: '10 charts' },
  { label: 'Written interpretations', calculator: false, expert: true },
  { label: 'Over-energy analysis & warnings', calculator: false, expert: true },
  { label: 'AI Name Correction (full analysis)', calculator: false, expert: true },
  { label: 'AI Tarot Reading', calculator: false, expert: true },
  { label: 'Business Numerology full profile', calculator: false, expert: true },
  { label: 'Personal Year Forecast narrative', calculator: false, expert: true },
  { label: 'Client-ready PDF with interpretations', calculator: false, expert: true },
];

const faqs = [
  {
    q: 'Is there a free trial?',
    a: 'Yes — when you sign up you get a 7-day free trial with access to all calculators (up to 5 calculations). No credit card required, ever. After the trial you choose the plan that fits your practice.',
  },
  {
    q: 'What is the difference between Calculator and Expert?',
    a: 'The Calculator plan gives you all the numeric outputs — the numbers themselves — for every tool. The Expert plan adds the written interpretation layer: what those numbers mean, detailed AI analysis, client-facing narratives, and the full PDF report you can send to clients. Experienced practitioners who already know what the numbers mean often stay on Calculator. Practitioners delivering full written readings choose Expert.',
  },
  {
    q: 'Can I cancel at any time?',
    a: 'Yes. Cancel from your account settings at any time. Your access continues until the end of your current billing month. No further charges after cancellation.',
  },
  {
    q: 'Will I lose my saved charts if I cancel?',
    a: 'No data is deleted. If you cancel, charts go into read-only mode. Re-subscribe at any time to regain full access.',
  },
  {
    q: 'When will Stripe payments be live?',
    a: 'Stripe payment integration is coming very soon. Sign up and use the free trial now — no credit card required. Subscribe when payments go live.',
  },
];

function CheckCell({ value }: { value: boolean | string }) {
  if (value === true) return <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" />;
  if (value === false) return <X className="w-4 h-4 text-slate-600 mx-auto" />;
  return <span className="text-sm text-blue-300 font-medium">{value}</span>;
}

export default function PricingPage({ onNavigate, onShowAuth }: PricingPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calc = PLANS.calculator;
  const expert = PLANS.expert;

  return (
    <div className="min-h-screen bg-slate-900">
      <SiteNavigation onNavigate={onNavigate} onShowAuth={onShowAuth} currentPage="pricing" />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.12) 0%, transparent 60%)`
        }} />
        <div className="relative max-w-3xl mx-auto">
          {/* Free trial badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 px-5 py-2 rounded-full mb-6 text-sm font-medium">
            <Gift className="w-4 h-4" />
            7-Day Free Trial — No Credit Card Required
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
            Intentional pricing: ₹999 reduces to 9 (completion) · ₹1,499 reduces to 5 (change & growth)
          </p>

          {/* Free trial CTA */}
          <button
            onClick={onShowAuth}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
          >
            Start Free Trial
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-gray-500 text-sm mt-3">7 days · 5 calculations · No credit card</p>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 items-start">

          {/* Calculator Plan */}
          <div className="bg-slate-800 border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-blue-400" />
              <p className="text-blue-300 text-sm font-semibold uppercase tracking-wider">Calculator</p>
            </div>
            <div className="flex items-end gap-2 mb-1">
              <span className="text-5xl font-bold text-white">₹{calc.monthlyPrice.toLocaleString()}</span>
              <span className="text-gray-400 mb-2">/month</span>
            </div>
            <p className="text-gray-500 text-sm mb-2">Billed monthly · Cancel anytime</p>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">{calc.description}</p>

            <button
              onClick={onShowAuth}
              className="w-full py-3.5 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-colors mb-2 border border-white/10"
            >
              Start Free Trial
            </button>
            <p className="text-center text-xs text-gray-500 mb-8">7 days free · no credit card needed</p>

            <div className="space-y-1 mb-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Included</p>
              {calculatorFeatures.map(f => (
                <div key={f} className="flex items-start gap-2.5 py-1.5 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>

            <div className="space-y-1 pt-4 border-t border-white/5">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">Not included</p>
              {calculatorNotIncluded.map(f => (
                <div key={f} className="flex items-start gap-2.5 py-1.5 text-sm text-gray-500">
                  <Lock className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Expert Plan */}
          <div className="bg-gradient-to-b from-blue-950/80 to-slate-900/80 border-2 border-blue-500/40 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-bl from-blue-500/10 to-transparent w-48 h-48 rounded-2xl pointer-events-none" />
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400" />
                  <p className="text-blue-300 text-sm font-semibold uppercase tracking-wider">Expert</p>
                </div>
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</span>
              </div>
              <div className="flex items-end gap-2 mb-1">
                <span className="text-5xl font-bold text-white">₹{expert.monthlyPrice.toLocaleString()}</span>
                <span className="text-gray-400 mb-2">/month</span>
              </div>
              <p className="text-gray-400 text-sm mb-2">Billed monthly · Cancel anytime</p>
              <p className="text-gray-300 text-sm mb-8 leading-relaxed">{expert.description}</p>

              <button
                onClick={onShowAuth}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/25 mb-2"
              >
                Start Free Trial
              </button>
              <p className="text-center text-xs text-gray-500 mb-8">7 days free · no credit card needed</p>

              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Everything included</p>
                {expertFeatures.map(f => (
                  <div key={f} className="flex items-start gap-2.5 py-1.5 text-sm text-gray-200">
                    <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stripe notice */}
        <div className="max-w-5xl mx-auto mt-5">
          <div className="bg-amber-500/8 border border-amber-500/20 rounded-xl px-5 py-4 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0 animate-pulse" />
            <p className="text-amber-200/80 text-sm">
              <span className="font-semibold text-amber-300">Stripe payments coming soon.</span> Sign up now and use the 7-day free trial — no credit card required.
            </p>
          </div>
        </div>

      </section>

      {/* Free trial highlight */}
      <section className="py-12 px-4 sm:px-6 bg-gradient-to-r from-emerald-900/30 to-blue-900/30 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">What You Get in Your Free Trial</h2>
            <p className="text-gray-400">Full access to all calculators for 7 days. No credit card. No commitment.</p>
          </div>
          <div className="grid sm:grid-cols-4 gap-4">
            {[
              { val: '7', label: 'Days Free', sub: 'Full access period' },
              { val: '5', label: 'Calculations', sub: 'Across all tools' },
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
          <div className="bg-slate-800 border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-slate-700/50">
                  <th className="text-left px-6 py-4 text-white font-semibold text-sm">Feature</th>
                  <th className="text-center px-6 py-4 text-blue-300 font-semibold text-sm w-36">Calculator<br /><span className="font-normal text-gray-400 text-xs">₹{calc.monthlyPrice.toLocaleString()}/mo</span></th>
                  <th className="text-center px-6 py-4 text-blue-300 font-semibold text-sm w-36">Expert<br /><span className="font-normal text-gray-400 text-xs">₹{expert.monthlyPrice.toLocaleString()}/mo</span></th>
                </tr>
              </thead>
              <tbody>
                {featureComparison.map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="px-6 py-3.5 text-gray-300 text-sm">{row.label}</td>
                    <td className="px-6 py-3.5 text-center"><CheckCell value={row.calculator} /></td>
                    <td className="px-6 py-3.5 text-center"><CheckCell value={row.expert} /></td>
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
          <p className="text-gray-400 mb-2">7 days, 5 calculations, no credit card.</p>
          <p className="text-gray-500 text-sm mb-8">See exactly what fits your practice before committing to a plan.</p>
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
