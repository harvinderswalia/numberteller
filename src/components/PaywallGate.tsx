import { useState } from 'react';
import { Lock } from 'lucide-react';
import { canAccessFeature, GatedFeature } from '../utils/subscription';
import SubscriptionModal from './SubscriptionModal';

interface PaywallGateProps {
  feature: GatedFeature;
  featureLabel: string;
  children: React.ReactNode;
  /** Optional: show a hard block instead of blur overlay */
  hardBlock?: boolean;
}

export default function PaywallGate({ feature, featureLabel, children, hardBlock = false }: PaywallGateProps) {
  const [showModal, setShowModal] = useState(false);

  if (canAccessFeature(feature)) {
    return <>{children}</>;
  }

  if (hardBlock) {
    return (
      <>
        <div
          className="relative cursor-pointer group"
          onClick={() => setShowModal(true)}
        >
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mb-3 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <p className="text-white font-semibold text-sm mb-1">{featureLabel}</p>
            <p className="text-gray-400 text-xs mb-4 text-center px-6">Requires Expert plan</p>
            <div className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold rounded-lg group-hover:from-blue-500 group-hover:to-cyan-500 transition-all">
              Upgrade to Expert
            </div>
          </div>
          <div className="pointer-events-none select-none opacity-30">
            {children}
          </div>
        </div>

        <SubscriptionModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          featureBlocked={featureLabel}
        />
      </>
    );
  }

  return (
    <>
      <div
        className="relative cursor-pointer group"
        onClick={() => setShowModal(true)}
      >
        {/* Blur overlay */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl">
          <div className="bg-slate-900/80 backdrop-blur-md border border-white/15 rounded-xl px-5 py-4 flex flex-col items-center shadow-2xl group-hover:border-blue-500/40 transition-colors">
            <Lock className="w-5 h-5 text-blue-400 mb-2" />
            <p className="text-white text-sm font-semibold mb-1">{featureLabel}</p>
            <p className="text-gray-400 text-xs mb-3">Expert plan required</p>
            <div className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold rounded-lg group-hover:from-blue-500 group-hover:to-cyan-500 transition-all">
              Upgrade
            </div>
          </div>
        </div>
        <div className="pointer-events-none select-none blur-sm opacity-50">
          {children}
        </div>
      </div>

      <SubscriptionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        featureBlocked={featureLabel}
      />
    </>
  );
}
