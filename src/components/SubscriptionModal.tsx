import { X, Check, Sparkles } from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl max-w-2xl w-full border border-slate-700 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Unlock Unlimited Insights
            </h2>
            <p className="text-slate-400">
              You've used your 3 free calculations. Upgrade to Premium for unlimited access.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-white mb-1">₹1,000</div>
                <div className="text-slate-400">per month</div>
              </div>
              <button className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-200 shadow-lg shadow-amber-500/50">
                Choose Monthly
              </button>
            </div>

            <div className="bg-slate-900/50 rounded-xl p-6 border-2 border-amber-500 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full">
                BEST VALUE
              </div>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-white mb-1">₹10,000</div>
                <div className="text-slate-400">per year</div>
                <div className="text-emerald-400 text-sm mt-1">Save ₹2,000!</div>
              </div>
              <button className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-200 shadow-lg shadow-amber-500/50">
                Choose Yearly
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white mb-3">Premium Benefits:</h3>
            {[
              'Unlimited numerology calculations',
              'Full access to all calculators and tools',
              'Advanced compatibility reports',
              'Detailed Loshu Grid analysis',
              'PDF export for all readings',
              'Priority customer support',
              'Early access to new features'
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 text-slate-300">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-emerald-400" />
                </div>
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-slate-700">
            <p className="text-xs text-slate-500 text-center">
              Secure payment processing. Cancel anytime. No commitments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
