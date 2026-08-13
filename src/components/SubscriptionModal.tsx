import { X, CheckCircle, Lock, Zap, Star, Crown, Gift, MessageCircle } from 'lucide-react';
import { PLANS, WHATSAPP_LINK, PlanId } from '../utils/subscription';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowAuth?: () => void;
  onNavigate?: (page: string) => void;
  featureBlocked?: string;
}

const planIcons: Record<string, React.ElementType> = { silver: Zap, gold: Star, platinum: Crown };

export default function SubscriptionModal({ isOpen, onClose, onShowAuth, onNavigate, featureBlocked }: SubscriptionModalProps) {
  if (!isOpen) return null;

  const handleChoosePlan = () => {
    onClose();
    if (onNavigate) onNavigate('pricing');
  };

  const handleStartTrial = () => {
    onClose();
    if (onShowAuth) onShowAuth();
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-slate-900 border border-white/10 rounded-2xl max-w-3xl w-full shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto">
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
              {featureBlocked ? `Unlock ${featureBlocked}` : 'Choose Your Plan'}
            </h2>
            <p className="text-gray-400 text-sm">
              {featureBlocked
                ? 'This feature requires a paid plan. Start a free trial or request activation.'
                : 'Start a 3-day free trial. No credit card required.'}
            </p>
          </div>

          {/* Trial banner */}
          <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-xl px-5 py-4 mb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Gift className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <p className="text-emerald-300 font-semibold text-sm">3-Day Free Trial</p>
                <p className="text-gray-400 text-xs">Unlimited calculations · Silver plan tools · No credit card</p>
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
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {Object.values(PLANS).map((plan) => {
              const Icon = planIcons[plan.id];
              const isFeatured = plan.id === 'gold';
              return (
                <div
                  key={plan.id}
                  className={`rounded-xl p-5 ${
                    isFeatured
                      ? 'bg-gradient-to-b from-blue-950/80 to-slate-800/80 border-2 border-blue-500/40 relative'
                      : 'bg-slate-800 border border-white/10'
                  }`}
                >
                  {plan.id === 'platinum' && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                      BEST VALUE
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className={`w-4 h-4 ${plan.id === 'platinum' ? 'text-amber-400' : plan.id === 'gold' ? 'text-yellow-400' : 'text-blue-400'}`} />
                    <span className="text-blue-300 text-xs font-semibold uppercase tracking-wider">{plan.name}</span>
                  </div>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-white">₹{plan.monthlyPrice.toLocaleString()}</span>
                    <span className="text-gray-400 text-sm">/mo</span>
                  </div>
                  <ul className="space-y-1.5 mb-5 text-xs text-gray-300">
                    {plan.features.slice(0, 5).map(f => (
                      <li key={f} className="flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                    {plan.features.length > 5 && (
                      <li className="text-gray-500 pl-5">+{plan.features.length - 5} more</li>
                    )}
                  </ul>
                  <button
                    onClick={handleChoosePlan}
                    className={`w-full py-2.5 text-white text-sm font-semibold rounded-lg transition-colors ${
                      isFeatured
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500'
                        : 'bg-slate-700 hover:bg-slate-600 border border-white/10'
                    }`}
                  >
                    Request Activation
                  </button>
                </div>
              );
            })}
          </div>

          {/* WhatsApp + view plans */}
          <div className="flex flex-col items-center gap-3">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#25D366] text-sm bg-[#25D366]/10 border border-[#25D366]/25 px-4 py-2 rounded-lg hover:bg-[#25D366]/20 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp us: +91 7900075531
            </a>
            <button
              onClick={handleChoosePlan}
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
