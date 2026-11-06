import Seo from '../components/seo/Seo';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/marketing/Breadcrumbs';
import CTABand from '../components/marketing/CTABand';
import { PLANS } from '../utils/subscription';
import {
  softwareApplicationSchema,
  breadcrumbSchema,
} from '../components/seo/schema';
import { Check, X, Sparkles, MessageCircle, CreditCard } from 'lucide-react';

const planOrder: ('silver' | 'gold' | 'platinum')[] = [
  'silver',
  'gold',
  'platinum',
];

export default function Pricing() {
  return (
    <>
      <Seo
        title="NumberTeller Pricing — Plans from ₹991/month"
        description="Silver ₹991, Gold ₹1,299, Platinum ₹1,499 a month. Compare features and start a 3-day free trial — no credit card."
        path="/pricing"
        jsonLd={[
          softwareApplicationSchema(),
          breadcrumbSchema([{ name: 'Pricing', path: '/pricing' }]),
        ]}
      />
      <section className="py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Breadcrumbs items={[{ name: 'Pricing', path: '/pricing' }]} />
          <div className="text-center mt-8 mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
              Plans built for how you practise
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Every plan starts with a 3-day free trial — no credit card
              required. Pick the tier that matches the depth of analysis you
              deliver.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            {planOrder.map((id) => {
              const plan = PLANS[id];
              const isGold = id === 'gold';
              return (
                <div
                  key={id}
                  className={`relative bg-slate-800/60 border rounded-2xl p-8 flex flex-col ${
                    isGold
                      ? 'border-blue-500/50 ring-1 ring-blue-500/30 lg:scale-[1.03]'
                      : 'border-white/10'
                  }`}
                >
                  {isGold && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full bg-blue-500 text-white inline-flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Most popular
                    </span>
                  )}
                  <h2 className="text-2xl font-bold text-white mb-1">
                    {plan.name}
                  </h2>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-4xl font-bold text-white">
                      ₹{plan.monthlyPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-gray-400 text-sm">/month</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-6">
                    {plan.description}
                  </p>

                  <Link
                    to="/app/signup"
                    className={`block text-center px-6 py-3 font-bold rounded-xl transition-all mb-6 ${
                      isGold
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-500 hover:to-cyan-500'
                        : 'bg-white/5 border border-white/15 text-white hover:bg-white/10 hover:border-white/25'
                    }`}
                  >
                    Start 3-day free trial
                  </Link>

                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                    {plan.notIncluded.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-3 opacity-60"
                      >
                        <X className="w-5 h-5 text-gray-500 mt-0.5 shrink-0" />
                        <span className="text-sm text-gray-500">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-800/40 border border-white/10 rounded-2xl p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="flex items-center gap-3 flex-1">
                <CreditCard className="w-6 h-6 text-gray-400 shrink-0" />
                <div>
                  <p className="text-white font-medium mb-1">
                    Monthly billing
                  </p>
                  <p className="text-sm text-gray-400">
                    All plans are billed monthly in INR. No long-term lock-in —
                    cancel anytime from your account.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-1 sm:border-l sm:border-white/10 sm:pl-6">
                <MessageCircle className="w-6 h-6 text-green-400 shrink-0" />
                <div>
                  <p className="text-white font-medium mb-1">
                    WhatsApp activation
                  </p>
                  <p className="text-sm text-gray-400">
                    After your trial, activate your plan over WhatsApp — we'll
                    confirm your tier and get you running the same day.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500">
            Need help choosing?{' '}
            <Link to="/contact" className="text-cyan-400 hover:underline">
              Talk to us
            </Link>{' '}
            or{' '}
            <Link to="/demo" className="text-cyan-400 hover:underline">
              book a demo
            </Link>
            .
          </p>
        </div>
      </section>
      <CTABand />
    </>
  );
}
