import { useState } from 'react';
import { CheckCircle, X, ChevronRight, Hash, HelpCircle } from 'lucide-react';
import SiteNavigation from './SiteNavigation';
import SiteFooter from './SiteFooter';

interface PricingPageProps {
  onNavigate: (page: string) => void;
  onShowAuth: () => void;
}

const freeFeatures = [
  'Core Chart Reading (Life Path, Expression, Soul Urge)',
  'Lo Shu Grid Analysis',
  'Compatibility Calculator',
  'House / Car / Mobile Number tools',
  'Business Name Numerology',
  'Basic Karmic Lessons analysis',
  'Transit Chart overview',
];

const premiumFeatures = [
  'Everything in Free',
  'Save up to 10 client charts',
  'AI Name Correction Tool (full access)',
  'PDF Export — all readings',
  'Complete Karmic Debt analysis (13, 14, 16, 19)',
  'Advanced Transit Chart with pinnacles & challenges',
  'Priority customer support',
  'Early access to new features',
];

const freeNotIncluded = [
  'Chart saving & management',
  'PDF export',
  'AI Name Correction Tool',
  'Advanced karmic debt detail',
];

const faqs = [
  {
    q: 'Is there a free trial for the Premium plan?',
    a: 'Yes — all tools are available immediately after signing up for free. You can explore the full suite before deciding to upgrade.'
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit and debit cards, UPI, and bank transfers. All payments are processed securely. For corporate or bulk accounts, please contact us directly.'
  },
  {
    q: 'Can I cancel my subscription at any time?',
    a: 'Yes, you can cancel at any time. Your Premium access will continue until the end of your billing period. We do not offer pro-rated refunds for partially used periods — please review our Billing Policy for details.'
  },
  {
    q: 'Is there a team or agency plan?',
    a: 'Multi-seat plans for numerology schools, agencies, and large practices are available. Please contact us at +971 56 504 3131 or via WhatsApp to discuss.'
  },
  {
    q: 'Will my saved charts be lost if I downgrade?',
    a: 'If you downgrade to the Free plan, your saved charts remain accessible in read-only mode. No data is deleted. Saving new charts requires an active Premium subscription.'
  },
  {
    q: 'Is NumberTeller suitable for beginners?',
    a: 'NumberTeller is designed exclusively for professional practitioners and consultants. It assumes working knowledge of Pythagorean numerology. If you\'re learning the craft, the tools will still work, but interpretations are framed for practitioner use.'
  },
];

export default function PricingPage({ onNavigate, onShowAuth }: PricingPageProps) {
  const [billingAnnual, setBillingAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const monthlyPrice = 1000;
  const annualPrice = 10000;
  const annualMonthly = Math.round(annualPrice / 12);
  const annualSaving = monthlyPrice * 12 - annualPrice;

  return (
    <div className="min-h-screen bg-slate-900">
      <SiteNavigation onNavigate={onNavigate} onShowAuth={onShowAuth} currentPage="pricing" />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.12) 0%, transparent 60%)`
        }} />
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-5 leading-tight">
            Simple, Honest Pricing
          </h1>
          <p className="text-xl text-gray-400 mb-10">
            Start free. Upgrade to unlock the full power of NumberTeller for your practice.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center bg-slate-800 border border-white/10 rounded-xl p-1 mb-3">
            <button
              onClick={() => setBillingAnnual(false)}
              className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${!billingAnnual ? 'bg-white text-slate-900' : 'text-gray-400 hover:text-white'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingAnnual(true)}
              className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${billingAnnual ? 'bg-white text-slate-900' : 'text-gray-400 hover:text-white'}`}
            >
              Annual
            </button>
          </div>
          {billingAnnual && (
            <p className="text-emerald-400 text-sm font-medium">
              Save ₹{annualSaving.toLocaleString()} per year with annual billing
            </p>
          )}
        </div>
      </section>

      {/* Plans */}
      <section className="pb-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 items-start">

          {/* Free */}
          <div className="bg-slate-800 border border-white/10 rounded-2xl p-8">
            <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">Free</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-5xl font-bold text-white">₹0</span>
            </div>
            <p className="text-gray-400 text-sm mb-8">No credit card required</p>

            <button
              onClick={onShowAuth}
              className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-colors mb-8"
            >
              Get Started Free
            </button>

            <div className="space-y-1 mb-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Included</p>
              {freeFeatures.map(f => (
                <div key={f} className="flex items-start gap-2.5 py-1.5 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>

            <div className="space-y-1 pt-4 border-t border-white/5">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">Not included</p>
              {freeNotIncluded.map(f => (
                <div key={f} className="flex items-start gap-2.5 py-1.5 text-sm text-gray-500">
                  <X className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Premium */}
          <div className="bg-gradient-to-b from-blue-950/80 to-slate-900/80 border-2 border-blue-500/40 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-bl from-blue-500/10 to-transparent w-40 h-40 rounded-2xl" />
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <p className="text-blue-300 text-sm font-semibold uppercase tracking-wider">Premium</p>
                <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">BEST VALUE</span>
              </div>
              <div className="flex items-end gap-2 mb-1">
                <span className="text-5xl font-bold text-white">
                  ₹{billingAnnual ? annualMonthly.toLocaleString() : monthlyPrice.toLocaleString()}
                </span>
                <span className="text-gray-400 mb-2">/month</span>
              </div>
              {billingAnnual ? (
                <p className="text-gray-400 text-sm mb-8">
                  Billed annually as ₹{annualPrice.toLocaleString()} · Save ₹{annualSaving.toLocaleString()}
                </p>
              ) : (
                <p className="text-gray-400 text-sm mb-8">
                  Billed monthly · Switch to annual to save ₹{annualSaving.toLocaleString()}
                </p>
              )}

              <button
                onClick={onShowAuth}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/25 mb-8"
              >
                Start Free — Upgrade Anytime
              </button>

              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Everything included</p>
                {premiumFeatures.map(f => (
                  <div key={f} className="flex items-start gap-2.5 py-1.5 text-sm text-gray-200">
                    <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enterprise */}
        <div className="max-w-5xl mx-auto mt-6">
          <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-white font-bold text-lg mb-1">Team & Agency Plans</h3>
              <p className="text-gray-400 text-sm">Multi-seat accounts for numerology schools, institutes, and consulting agencies. Custom pricing based on team size.</p>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-colors"
            >
              Contact Us <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-800/30 border-t border-white/5 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-slate-800 border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="text-white font-medium">{faq.q}</span>
                  <HelpCircle className={`w-5 h-5 flex-shrink-0 ml-4 transition-colors ${openFaq === i ? 'text-blue-400' : 'text-gray-500'}`} />
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
      <section className="py-20 bg-slate-900 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <Hash className="w-10 h-10 text-blue-400 mx-auto mb-5" />
          <h2 className="text-4xl font-bold text-white mb-4">Start Your Free Account</h2>
          <p className="text-gray-400 mb-8">No credit card. No commitments. Full access to all calculators from day one.</p>
          <button
            onClick={onShowAuth}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg rounded-xl hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg shadow-blue-500/20"
          >
            Sign Up for Free <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}
