import { X, CheckCircle, Lock, Star, Zap, Gift } from 'lucide-react';
import { PLANS } from '../utils/subscription';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowAuth?: () => void;
  onNavigate?: (page: string) => void;
  featureBlocked?: string;
}

export default function SubscriptionModal({ isOpen, onClose, onShowAuth, onNavigate, featureBlocked }: SubscriptionModalProps) {
  if (!isOpen) return null;

  const calc = PLANS.calculator;
  const expert = PLANS.expert;

  const expertOnlyFeatures = [
    'Written interpretations on every number',
    'AI Name Correction — full analysis',
    'AI Tarot Reading',
    'Business Numerology full profile',
    'Client-ready PDF with interpretation text',
    'Personal Year Forecast narrative',
    'Save up to 10 charts',
  ];

  const handleStartTrial = () => {
    onClose();
    if (onShowAuth) onShowAuth();
  };

  const handleViewPlans = () => {
    onClose();
    if (onNavigate) onNavigate('pricing');
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-slate-900 border border-white/10 rounded-2xl max-w-2xl w-full shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-cyan-500" />

        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-slate-500 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 mb-4 shadow-lg shadow-blue-500/20">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">
              {featureBlocked ? `Unlock ${featureBlocked}` : 'Upgrade Your Plan'}
            </h2>
            <p className="text-gray-400 text-sm">
              {featureBlocked
                ? 'This feature requires a paid plan. Start a free trial first — no card needed.'
                : 'Start a 7-day free trial. No credit card required.'}
            </p>
          </div>

          {/* Trial banner */}
          <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-xl px-5 py-4 mb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Gift className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <p className="text-emerald-300 font-semibold text-sm">7-Day Free Trial</p>
                <p className="text-gray-400 text-xs">5 calculations · All tools · No credit card</p>
              </div>
            </div>
            <button
              onClick={handleStartTrial}
              className="flex-shrink-0 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-lg transition-colors"
            >
              Start Free
            </button>
          </div>

          {/* Plans */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {/* Calculator */}
            <div className="bg-slate-800 border border-white/10 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300 text-xs font-semibold uppercase tracking-wider">Calculator</span>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-white">₹{calc.monthlyPrice.toLocaleString()}</span>
                <span className="text-gray-400 text-sm">/month</span>
              </div>
              <ul className="space-y-1.5 mb-5 text-xs text-gray-300">
                {['All calculators', 'Lo Shu Grid display', 'Save 5 charts', 'PDF (numbers only)'].map(f => (
                  <li key={f} className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={handleStartTrial}
                className="w-full py-2.5 bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold rounded-lg transition-colors border border-white/10"
              >
                Try Free — Then ₹999/mo
              </button>
            </div>

            {/* Expert */}
            <div className="bg-gradient-to-b from-blue-950/80 to-slate-800/80 border-2 border-blue-500/40 rounded-xl p-5 relative">
              <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">RECOMMENDED</div>
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 text-amber-400" />
                <span className="text-blue-300 text-xs font-semibold uppercase tracking-wider">Expert</span>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-white">₹{expert.monthlyPrice.toLocaleString()}</span>
                <span className="text-gray-400 text-sm">/month</span>
              </div>
              <ul className="space-y-1.5 mb-5 text-xs text-gray-200">
                {['Everything in Calculator', 'Written interpretations', 'AI Name Correction', 'AI Tarot Reading', 'Client-ready PDF reports', 'Save 10 charts'].map(f => (
                  <li key={f} className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={handleStartTrial}
                className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-blue-500/20"
              >
                Try Free — Then ₹1,499/mo
              </button>
            </div>
          </div>

          {/* Expert-only callout when feature is blocked */}
          {featureBlocked && (
            <div className="bg-blue-500/8 border border-blue-500/20 rounded-xl p-4 mb-4">
              <p className="text-blue-300 text-xs font-semibold uppercase tracking-wider mb-2">Expert plan unlocks</p>
              <div className="grid grid-cols-2 gap-1.5">
                {expertOnlyFeatures.map(f => (
                  <div key={f} className="flex items-center gap-1.5 text-xs text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stripe notice + view plans link */}
          <div className="flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-2 text-amber-300/70 text-xs bg-amber-500/8 border border-amber-500/15 px-4 py-2 rounded-lg">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Stripe payments coming soon · sign up now to lock in your free trial
            </div>
            <button
              onClick={handleViewPlans}
              className="text-gray-500 hover:text-gray-300 text-xs transition-colors underline decoration-dotted"
            >
              View full pricing page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
