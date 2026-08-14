import { useState } from 'react';
import { X, Lock } from 'lucide-react';
import { usePlanContext } from '../contexts/PlanContext';

interface TrialBannerProps {
  onUpgrade: () => void;
}

export default function TrialBanner({ onUpgrade }: TrialBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const { planId, loading } = usePlanContext();

  if (loading || dismissed) return null;
  if (planId !== 'free') return null;

  return (
    <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2.5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Lock className="w-4 h-4 flex-shrink-0" />
        Your plan hasn't been activated yet. Request activation to unlock all features.
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
