import { useState } from 'react';
import { X, Zap, FlaskConical, Clock } from 'lucide-react';
import { usePlanContext } from '../contexts/PlanContext';
import { trialDaysLeft } from '../hooks/usePlan';

interface TrialBannerProps {
  onUpgrade: () => void;
}

export default function TrialBanner({ onUpgrade }: TrialBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const { planId, trialActive, trialExpiresAt, loading, isBeta } = usePlanContext();

  if (loading || dismissed) return null;
  if (planId !== 'free') return null;

  // Beta mode — show a subtle beta badge, no limits messaging
  if (isBeta) {
    return (
      <div className="bg-gradient-to-r from-slate-800 to-slate-800/80 border-b border-teal-500/20 text-white px-4 py-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <FlaskConical className="w-4 h-4 text-teal-400 flex-shrink-0" />
          <span className="font-semibold text-teal-400">Beta Access</span>
          <span className="text-gray-500 hidden sm:inline">· Full platform access, no restrictions during beta.</span>
        </div>
        <button onClick={() => setDismissed(true)} className="text-gray-600 hover:text-gray-400 transition-colors flex-shrink-0">
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // Standard trial mode
  const daysLeft = trialDaysLeft(trialExpiresAt);

  if (!trialActive) {
    return (
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Zap className="w-4 h-4 flex-shrink-0" />
          Your free trial has ended. Request plan activation to continue using NumberTeller.
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={onUpgrade}
            className="text-xs font-bold bg-white text-amber-700 px-3 py-1 rounded-lg hover:bg-amber-50 transition-colors"
          >
            Activate Plan
          </button>
          <button onClick={() => setDismissed(true)} className="text-white/70 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  if (daysLeft !== null && daysLeft <= 1) {
    return (
      <div className="bg-slate-800 border-b border-white/10 text-white px-4 py-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Clock className="w-4 h-4 text-blue-400 flex-shrink-0" />
          Free trial: <span className="font-semibold text-white">{daysLeft} day{daysLeft !== 1 ? 's' : ''}</span> left
        </div>
        <button
          onClick={onUpgrade}
          className="text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-1 rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all flex-shrink-0"
        >
          View Plans
        </button>
      </div>
    );
  }

  return null;
}
