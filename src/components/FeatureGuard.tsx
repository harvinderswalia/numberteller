import { useState } from 'react';
import { Lock, ChevronRight, Star, Gift, Brain, FileText, TrendingUp, Building2, Layers, CheckCircle, Sparkles, ArrowLeft } from 'lucide-react';
import { GatedFeature, PLANS } from '../utils/subscription';
import { usePlanContext, canAccessAppFeature, AppFeature } from '../contexts/PlanContext';
import { useAuth } from '../contexts/AuthContext';
import SiteNavigation from './SiteNavigation';
import SiteFooter from './SiteFooter';
import SubscriptionModal from './SubscriptionModal';

interface FeatureGuardProps {
  feature: GatedFeature;
  featureLabel: string;
  featureDescription: string;
  onNavigate: (page: string) => void;
  onShowAuth: () => void;
  children: React.ReactNode;
}

interface FeatureHighlight {
  icon: React.ElementType;
  title: string;
  desc: string;
  color: string;
}

const FEATURE_HIGHLIGHTS: Record<GatedFeature, FeatureHighlight[]> = {
  tarot: [
    { icon: Layers, title: '8 Professional Spreads', desc: 'Single card to Celtic Cross — every spread type a practitioner needs', color: 'text-blue-400' },
    { icon: Brain, title: 'AI Narrative Generation', desc: 'Cards interpreted in context of Life Path, Expression, Soul Urge & Personal Year', color: 'text-cyan-400' },
    { icon: Sparkles, title: '5 Tone Modes', desc: 'Empowering, Spiritual, Practical, Direct, or Vedic-flavoured readings', color: 'text-teal-400' },
    { icon: FileText, title: 'Numerology Bridge', desc: "Every card connected to client's actual core numbers for deeper insight", color: 'text-blue-300' },
  ],
  'name-correction-full': [
    { icon: Brain, title: 'AI Harmony Scoring', desc: 'Analyses BD, LP, EX & SU compatibility of every name variant in real time', color: 'text-cyan-400' },
    { icon: Sparkles, title: 'Goal-Based Targets', desc: 'Career, Relationships, Wealth, Health, Spirituality — tailored to client desire', color: 'text-teal-400' },
    { icon: CheckCircle, title: 'Over-Energy Protection', desc: 'Automatically filters names that would create harmful number imbalances', color: 'text-emerald-400' },
    { icon: Star, title: 'Top 8 Ranked Results', desc: 'Ranked suggestions with alignment scores so you choose the strongest name', color: 'text-amber-400' },
  ],
  'business-full': [
    { icon: Building2, title: 'Company Name Analysis', desc: 'Pythagorean energy profile, strengths, ideal industries for any company name', color: 'text-amber-400' },
    { icon: Brain, title: 'Owner Life Path Match', desc: "Discover the ideal business number aligned to the owner's core numbers", color: 'text-orange-400' },
    { icon: CheckCircle, title: 'Partner Compatibility', desc: 'Score 2–5 business partners with pairwise harmony matrix and dynamics', color: 'text-emerald-400' },
    { icon: Sparkles, title: 'Brand Name Suggester', desc: 'Generate brand name ideas matching a target number and industry keywords', color: 'text-blue-400' },
  ],
  interpretations: [
    { icon: FileText, title: 'Full Written Interpretations', desc: "Every core number explained in detail — what it means for your client's life", color: 'text-blue-400' },
    { icon: TrendingUp, title: 'Over-Energy Warnings', desc: 'Detailed analysis when numbers repeat across positions — with remedies', color: 'text-amber-400' },
    { icon: Brain, title: 'Personal Year Forecast', desc: 'Narrative year-by-year forecast for client journey planning', color: 'text-cyan-400' },
    { icon: CheckCircle, title: 'Client-Ready Language', desc: 'Interpretations written to be shared directly with clients', color: 'text-emerald-400' },
  ],
  'pdf-interpretation': [
    { icon: FileText, title: 'Full Interpretation PDF', desc: 'Export complete chart with all written interpretations — ready for clients', color: 'text-blue-400' },
    { icon: Star, title: 'Professional Branding', desc: 'Polished layout that positions you as a premium practitioner', color: 'text-amber-400' },
    { icon: CheckCircle, title: 'Share With Clients', desc: 'Download and share directly — no editing or reformatting needed', color: 'text-emerald-400' },
    { icon: Sparkles, title: 'Complete Chart Data', desc: 'All core numbers, interpretations, and Lo Shu analysis in one document', color: 'text-cyan-400' },
  ],
  'save-charts-extended': [
    { icon: CheckCircle, title: 'Save Up to 10 Charts', desc: 'Store 10 complete client charts accessible from any device', color: 'text-emerald-400' },
    { icon: Star, title: 'Full Chart Access', desc: 'Every saved chart includes all interpretations and analysis', color: 'text-amber-400' },
    { icon: Brain, title: 'Instant Recall', desc: "Open any client's complete chart in one click", color: 'text-cyan-400' },
    { icon: FileText, title: 'Chart History', desc: 'Track client changes over time with named chart storage', color: 'text-blue-400' },
  ],
  'over-energy-detail': [
    { icon: Star, title: 'Detailed Over-Energy Analysis', desc: 'In-depth explanation when numbers repeat across BD, LP, EX, SU positions', color: 'text-amber-400' },
    { icon: CheckCircle, title: 'Specific Remedies', desc: 'Actionable remedial guidance for each over-energy imbalance detected', color: 'text-emerald-400' },
    { icon: Brain, title: 'Impact Assessment', desc: 'Explains exactly how each over-energy affects different life areas', color: 'text-cyan-400' },
    { icon: Sparkles, title: 'Name Correction Guidance', desc: 'Integrates with name correction to resolve over-energy through name change', color: 'text-blue-400' },
  ],
  'personal-year-forecast': [
    { icon: TrendingUp, title: 'Full Narrative Forecast', desc: "Year-by-year story of your client's personal cycle — not just numbers", color: 'text-blue-400' },
    { icon: Brain, title: 'Pinnacle Integration', desc: "Forecast reads in context of client's current pinnacle cycle", color: 'text-cyan-400' },
    { icon: CheckCircle, title: 'Month-by-Month View', desc: 'Personal months within each personal year for granular planning', color: 'text-emerald-400' },
    { icon: Star, title: 'Client-Ready Language', desc: 'Narratives written to hand directly to clients as part of their reading', color: 'text-amber-400' },
  ],
};

export default function FeatureGuard({
  feature,
  featureLabel,
  featureDescription,
  onNavigate,
  onShowAuth,
  children,
}: FeatureGuardProps) {
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  const plan = usePlanContext();

  // Free trial users (plan_id = 'free' but trial active) get full access during trial
  // Only block when: no active paid plan AND trial is either expired or calc limit hit
  const trialActive = (() => {
    if (plan.loading) return true; // optimistic while loading
    if (plan.planId !== 'free') return false; // has a real plan
    const localTrial = (() => {
      try { return JSON.parse(localStorage.getItem('nt_trial') || 'null'); } catch { return null; }
    })();
    if (!localTrial) return false;
    const expired = new Date(localTrial.expiresAt) <= new Date();
    const limitReached = localTrial.calcCount >= (plan.trialCalcLimit ?? 5);
    return !expired && !limitReached;
  })();

  const hasPaidAccess = canAccessAppFeature(feature as AppFeature, plan.planId);

  if (hasPaidAccess || trialActive) {
    return <>{children}</>;
  }

  const expert = PLANS.expert;
  const highlights = FEATURE_HIGHLIGHTS[feature] ?? [];

  const allExpertFeatures = [
    'Written interpretations on every number',
    'Over-energy analysis & detailed warnings',
    'AI Name Correction — full harmony analysis',
    'AI Tarot Reading',
    'Business Numerology full company profile',
    'Personal Year Forecast narrative',
    'Client-ready PDF with interpretation text',
    'Save up to 10 charts',
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      <SiteNavigation onNavigate={onNavigate} onShowAuth={onShowAuth} />

      <section className="pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">

          {/* Back button for logged-in users */}
          {user && (
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
          )}

          {/* Hero lock */}
          <div className="text-center mb-12">
            <div className="relative inline-flex mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 border border-white/10 flex items-center justify-center">
                <Lock className="w-9 h-9 text-slate-500" />
              </div>
              <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Star className="w-3.5 h-3.5 text-white" />
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{featureLabel}</h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto mb-8">{featureDescription}</p>

            {user ? (
              /* Logged-in user whose trial has expired — show upgrade CTA */
              <div className="inline-flex flex-col items-center bg-blue-500/10 border border-blue-500/25 rounded-2xl px-8 py-6 mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-300 font-bold text-lg">Upgrade to Expert to unlock this tool</span>
                </div>
                <p className="text-gray-400 text-sm mb-4">Your free trial has ended. Subscribe to continue.</p>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-7 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl transition-all"
                >
                  View Expert Plan
                </button>
              </div>
            ) : (
              /* Not logged in — show free trial CTA */
              <div className="inline-flex flex-col items-center bg-emerald-500/10 border border-emerald-500/25 rounded-2xl px-8 py-6 mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <Gift className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-300 font-bold text-lg">Start with a 7-Day Free Trial</span>
                </div>
                <p className="text-gray-400 text-sm mb-4">5 calculations · All calculators · No credit card required</p>
                <button
                  onClick={onShowAuth}
                  className="px-7 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors"
                >
                  Start Free Trial — No Card Needed
                </button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setShowModal(true)}
                className="group flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20"
              >
                View Expert Plan
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('pricing')}
                className="flex items-center justify-center gap-2 px-7 py-3.5 bg-white/5 border border-white/15 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
              >
                See full pricing
              </button>
            </div>

            {!user && (
              <p className="text-gray-600 text-sm mt-5">
                Already subscribed?{' '}
                <button onClick={onShowAuth} className="text-blue-400 hover:text-blue-300 transition-colors">
                  Sign in
                </button>
              </p>
            )}
          </div>

          {/* Feature-specific highlights */}
          {highlights.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xl font-bold text-white text-center mb-6">
                What You Unlock with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Expert</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {highlights.map((h, i) => (
                  <div key={i} className="bg-slate-800/60 border border-white/10 rounded-2xl p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center flex-shrink-0">
                      <h.icon className={`w-5 h-5 ${h.color}`} />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm mb-1">{h.title}</p>
                      <p className="text-gray-400 text-sm leading-relaxed">{h.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Expert plan summary */}
          <div className="bg-gradient-to-b from-blue-950/60 to-slate-800/80 border-2 border-blue-500/30 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-blue-300 text-xs font-semibold uppercase tracking-wider mb-1">Expert Plan — after 7-day trial</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">₹{expert.monthlyPrice.toLocaleString()}</span>
                  <span className="text-gray-400">/month</span>
                </div>
                <p className="text-gray-500 text-xs mt-1">Billed monthly · Cancel anytime · No annual lock-in</p>
              </div>
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold px-3 py-1.5 rounded-full hidden sm:block">MOST POPULAR</div>
            </div>

            <div className="grid sm:grid-cols-2 gap-2.5 pt-5 border-t border-white/10">
              {allExpertFeatures.map(f => (
                <div key={f} className="flex items-center gap-2.5 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter onNavigate={onNavigate} onShowAuth={onShowAuth} />

      <SubscriptionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onNavigate={onNavigate}
        onShowAuth={onShowAuth}
        featureBlocked={featureLabel}
      />
    </div>
  );
}
