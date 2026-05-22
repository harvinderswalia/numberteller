import { useState } from 'react';
import { X, Zap } from 'lucide-react';
import { getTrial, isTrialActive, getTrialCalculationsRemaining, hasActiveSubscription, FREE_TRIAL_DAYS } from '../utils/subscription';

interface TrialBannerProps {
  onUpgrade: () => void;
}

export default function TrialBanner({ onUpgrade }: TrialBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || hasActiveSubscription()) return null;

  const trial = getTrial();
  if (!trial) return null;

  const remaining = getTrialCalculationsRemaining();
  const active = isTrialActive();

  if (!active && remaining > 0) return null;

  const daysLeft = Math.max(0, Math.ceil((new Date(trial.expiresAt).getTime() - Date.now()) / 86400000));

  if (!active && remaining === 0) {
    return (
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Zap className="w-4 h-4 flex-shrink-0" />
          Your free trial has ended. Subscribe to continue using NumberTeller.
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={onUpgrade}
            className="text-xs font-bold bg-white text-amber-700 px-3 py-1 rounded-lg hover:bg-amber-50 transition-colors"
          >
            Subscribe Now
          </button>
          <button onClick={() => setDismissed(true)} className="text-white/70 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  if (remaining <= 2 && active) {
    return (
      <div className="bg-slate-800 border-b border-white/10 text-white px-4 py-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Zap className="w-4 h-4 text-blue-400 flex-shrink-0" />
          Free trial: <span className="font-semibold text-white">{remaining} calculation{remaining !== 1 ? 's' : ''}</span> remaining
          {daysLeft > 0 && <span className="text-gray-500">· {daysLeft} day{daysLeft !== 1 ? 's' : ''} left</span>}
        </div>
        <button
          onClick={onUpgrade}
          className="text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-1 rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all flex-shrink-0"
        >
          Upgrade
        </button>
      </div>
    );
  }

  return null;
}
