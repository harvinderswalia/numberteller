import { useState, useEffect } from 'react';
import { Hash, Calculator, Users, Home, Grid3x3, CreditCard as Edit3, Building2, BookOpen, Save, ChevronRight, Crown, Zap, Star, Gift, LogOut, Trash2, Calendar, User, TrendingUp, Clock, AlertCircle, RefreshCw, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getPlanLabel, getPlanColor, trialDaysLeft } from '../hooks/usePlan';
import { usePlanContext } from '../contexts/PlanContext';
import { getSavedCharts, deleteChart, SavedChart } from '../utils/savedCharts';

interface DashboardProps {
  onNavigate: (page: string) => void;
  onShowUpgrade: () => void;
  onLoadChart: (chartData: any) => void;
}

interface Tool {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  page: string;
  requiredPlan: 'free' | 'silver' | 'gold' | 'platinum';
  color: string;
  badge?: string;
}

const TOOLS: Tool[] = [
  {
    id: 'calculator',
    label: 'Core Numerology',
    description: 'Life Path, Expression, Soul Urge & full core chart',
    icon: Calculator,
    page: 'calculator',
    requiredPlan: 'free',
    color: 'from-blue-600 to-cyan-600',
  },
  {
    id: 'compatibility',
    label: 'Compatibility',
    description: 'Harmony matrix & score between two people',
    icon: Users,
    page: 'compatibility',
    requiredPlan: 'free',
    color: 'from-teal-600 to-emerald-600',
  },
  {
    id: 'loshu',
    label: 'Lo Shu Grid',
    description: '3×3 grid, planes, power arrows & missing numbers',
    icon: Grid3x3,
    page: 'loshu',
    requiredPlan: 'free',
    color: 'from-sky-600 to-blue-600',
  },
  {
    id: 'house',
    label: 'House / Car / Mobile',
    description: 'Number energy for addresses, vehicles & numbers',
    icon: Home,
    page: 'house',
    requiredPlan: 'free',
    color: 'from-slate-500 to-slate-600',
  },
  {
    id: 'name-correction',
    label: 'AI Name Correction',
    description: 'Goal-aligned name variants with harmony scoring',
    icon: Edit3,
    page: 'name-correction',
    requiredPlan: 'platinum',
    color: 'from-amber-500 to-orange-500',
    badge: 'Platinum',
  },
  {
    id: 'business',
    label: 'Business Numerology',
    description: 'Company profile, partner compatibility & brand names',
    icon: Building2,
    page: 'business',
    requiredPlan: 'platinum',
    color: 'from-orange-500 to-rose-500',
    badge: 'Platinum',
  },
  {
    id: 'tarot',
    label: 'AI Tarot Reading',
    description: 'Numerology-integrated tarot with AI narratives',
    icon: BookOpen,
    page: 'tarot',
    requiredPlan: 'platinum',
    color: 'from-rose-500 to-pink-600',
    badge: 'Platinum',
  },
];

const PLAN_RANK: Record<string, number> = { free: 0, silver: 1, gold: 2, platinum: 3 };


function canAccess(toolPlan: string, userPlan: string, trialActive: boolean): boolean {
  if (trialActive) return true; // trial users can access everything
  return PLAN_RANK[userPlan] >= PLAN_RANK[toolPlan];
}

export default function Dashboard({ onNavigate, onShowUpgrade, onLoadChart }: DashboardProps) {
  const { user, signOut } = useAuth();
  const plan = usePlanContext();
  const [charts, setCharts] = useState<SavedChart[]>([]);
  const [chartsLoading, setChartsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    loadCharts();
  }, [user]);

  const loadCharts = async () => {
    setChartsLoading(true);
    const saved = await getSavedCharts();
    setCharts(saved);
    setChartsLoading(false);
  };

  const handleDeleteChart = async (id: string) => {
    if (!confirm('Delete this chart?')) return;
    setDeletingId(id);
    const result = await deleteChart(id);
    if (result.success) setCharts(c => c.filter(x => x.id !== id));
    setDeletingId(null);
  };

  const handleLoadChart = (chart: SavedChart) => {
    onLoadChart(chart.chart_data);
  };

  const daysLeft = trialDaysLeft(plan.trialExpiresAt);
  const isFreeTrial = plan.planId === 'free';
  // Use computed trialActive from PlanContext (checks both DB and localStorage)
  const trialActive = plan.trialActive;

  const planLabel = getPlanLabel(plan.planId);
  const planColor = getPlanColor(plan.planId);

  const PlanIcon = plan.planId === 'platinum' ? Crown : plan.planId === 'gold' ? Star : plan.planId === 'silver' ? Zap : Gift;

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Top bar */}
      <header className="border-b border-white/8 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
              <Hash className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-lg tracking-tight group-hover:text-blue-300 transition-colors">NumberTeller</span>
          </button>

          <div className="flex items-center gap-3">
            <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 border border-white/10 text-xs font-semibold ${planColor}`}>
              <PlanIcon className="w-3.5 h-3.5" />
              {planLabel}
            </div>
            <span className="hidden sm:block text-sm text-gray-400">{user?.email}</span>
            <button
              onClick={signOut}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-400 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Welcome + plan status row */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">

          {/* Welcome card */}
          <div className="flex-1 bg-slate-900 border border-white/8 rounded-2xl p-6">
            <h1 className="text-2xl font-bold text-white mb-1">
              Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}.
            </h1>
            <p className="text-gray-400 text-sm">Choose a tool below to begin your reading.</p>
          </div>

          {/* Plan status card */}
          <div className={`lg:w-80 rounded-2xl p-5 border flex flex-col gap-3 ${
            plan.planId === 'platinum'
              ? 'bg-amber-950/30 border-amber-500/25'
              : plan.planId === 'gold'
              ? 'bg-yellow-950/30 border-yellow-500/25'
              : plan.planId === 'silver'
              ? 'bg-blue-950/30 border-blue-500/25'
              : 'bg-emerald-950/30 border-emerald-500/25'
          }`}>
            <div className="flex items-center justify-between">
              <div className={`flex items-center gap-2 text-sm font-bold ${planColor}`}>
                <PlanIcon className="w-4 h-4" />
                {planLabel} Plan
              </div>
              {isFreeTrial && (
                <button
                  onClick={onShowUpgrade}
                  className="text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-1 rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all"
                >
                  Upgrade
                </button>
              )}
            </div>

            {isFreeTrial && !plan.loading && (
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  {daysLeft > 0 ? `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left in trial` : 'Trial expired'}
                </div>
              </div>
            )}

            {(plan.planId === 'silver' || plan.planId === 'gold' || plan.planId === 'platinum') && plan.subscriptionExpiresAt && (
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Calendar className="w-3 h-3" />
                Renews {plan.subscriptionExpiresAt.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
            )}

            {isFreeTrial && (
              <div className="text-xs text-gray-500 border-t border-white/8 pt-2">
                Upgrade for full features & client-ready reports
              </div>
            )}
          </div>
        </div>

        {/* Main grid layout */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Tool grid — takes 2 columns */}
          <div className="lg:col-span-2">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Tools</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {TOOLS.map(tool => {
                const accessible = canAccess(tool.requiredPlan, plan.planId, trialActive);
                const isPaidOnly = tool.requiredPlan !== 'free';
                const showUpgradeBadge = isPaidOnly && !accessible && !trialActive;
                const Icon = tool.icon;
                return (
                  <button
                    key={tool.id}
                    onClick={() => onNavigate(tool.page)}
                    className={`group relative text-left rounded-2xl p-5 border transition-all duration-200 ${
                      accessible
                        ? 'bg-slate-900 border-white/8 hover:border-white/20 hover:bg-slate-800/80 cursor-pointer'
                        : 'bg-slate-900/50 border-white/8 cursor-pointer hover:bg-slate-900/80'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center shadow-lg ${!accessible ? 'opacity-60' : ''}`}>
                        {showUpgradeBadge ? <Lock className="w-5 h-5 text-white" /> : <Icon className="w-5 h-5 text-white" />}
                      </div>
                      <div className="flex items-center gap-2">
                        {isPaidOnly && trialActive && (
                          <span className="text-xs font-bold bg-blue-500/15 text-blue-400 border border-blue-500/25 px-2 py-0.5 rounded-full">
                            {tool.badge}
                          </span>
                        )}
                        <ChevronRight className={`w-4 h-4 transition-transform ${accessible ? 'text-gray-500 group-hover:text-white group-hover:translate-x-0.5' : 'text-gray-600'}`} />
                      </div>
                    </div>
                    <p className={`font-semibold text-sm mb-1 ${accessible ? 'text-white' : 'text-gray-400'}`}>{tool.label}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">{tool.description}</p>

                    {showUpgradeBadge && (
                      <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-1.5">
                        <AlertCircle className="w-3 h-3 text-amber-500" />
                        <span className="text-xs text-amber-500 font-medium">Requires {tool.badge} — upgrade to access</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Saved charts sidebar */}
          <div className="lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500">Saved Charts</h2>
              <button
                onClick={loadCharts}
                className="text-gray-500 hover:text-white transition-colors"
                title="Refresh"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-slate-900 border border-white/8 rounded-2xl overflow-hidden">
              {chartsLoading ? (
                <div className="p-6 text-center">
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white/60 rounded-full animate-spin mx-auto" />
                </div>
              ) : charts.length === 0 ? (
                <div className="p-8 text-center">
                  <Save className="w-8 h-8 text-slate-700 mx-auto mb-3" />
                  <p className="text-sm text-gray-500 font-medium">No saved charts yet</p>
                  <p className="text-xs text-gray-600 mt-1">Run a calculation and save it to find it here.</p>
                </div>
              ) : (
                <ul className="divide-y divide-white/5">
                  {charts.map(chart => (
                    <li key={chart.id} className="group flex items-center gap-3 px-4 py-3.5 hover:bg-slate-800/60 transition-colors">
                      <button
                        onClick={() => handleLoadChart(chart)}
                        className="flex-1 text-left min-w-0"
                      >
                        <div className="flex items-center gap-2 mb-0.5">
                          <User className="w-3 h-3 text-blue-400 flex-shrink-0" />
                          <span className="text-sm font-semibold text-white truncate">
                            {chart.name || chart.chart_data?.fullName || 'Unnamed chart'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          {new Date(chart.created_at).toLocaleDateString('en-IN', {
                            day: 'numeric', month: 'short', year: 'numeric'
                          })}
                          {chart.chart_data?.coreNumbers?.lifePath && (
                            <span className="ml-1 text-gray-600">· LP {chart.chart_data.coreNumbers.lifePath}</span>
                          )}
                        </div>
                      </button>
                      <button
                        onClick={() => handleDeleteChart(chart.id)}
                        disabled={deletingId === chart.id}
                        className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-rose-400 transition-all p-1 rounded flex-shrink-0"
                        title="Delete"
                      >
                        {deletingId === chart.id ? (
                          <div className="w-3.5 h-3.5 border-2 border-rose-400/40 border-t-rose-400 rounded-full animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {charts.length > 0 && (
                <div className="px-4 py-3 border-t border-white/5">
                  <p className="text-xs text-gray-600">{charts.length} chart{charts.length !== 1 ? 's' : ''} saved</p>
                </div>
              )}
            </div>

            {/* Inline plan comparison */}
            {isFreeTrial && (
              <div className="mt-4 bg-slate-900 border border-white/8 rounded-2xl overflow-hidden">
                <div className="px-4 py-3 border-b border-white/6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Plans</p>
                </div>
                <div className="divide-y divide-white/5">
                  {/* Silver plan */}
                  <div className="px-4 py-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-sm font-bold text-white">Silver</p>
                        <p className="text-xs text-gray-500">₹991 / month</p>
                      </div>
                      <button
                        onClick={onShowUpgrade}
                        className="text-xs font-semibold text-blue-400 hover:text-blue-300 border border-blue-500/30 hover:border-blue-400/50 px-3 py-1 rounded-lg transition-all"
                      >
                        View Plans
                      </button>
                    </div>
                    <ul className="space-y-1">
                      {['All calculators', 'Lo Shu Grid', 'Save unlimited charts', 'PDF export'].map(f => (
                        <li key={f} className="flex items-center gap-1.5 text-xs text-gray-400">
                          <div className="w-1 h-1 rounded-full bg-blue-500 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Gold plan */}
                  <div className="px-4 py-4 bg-blue-950/20">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-bold text-white">Gold</p>
                          <span className="text-[9px] font-bold bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded-full border border-blue-500/30">POPULAR</span>
                        </div>
                        <p className="text-xs text-gray-500">₹1,299 / month</p>
                      </div>
                      <button
                        onClick={onShowUpgrade}
                        className="text-xs font-bold bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white px-3 py-1 rounded-lg transition-all"
                      >
                        View Plans
                      </button>
                    </div>
                    <ul className="space-y-1">
                      {['Everything in Silver', 'Written interpretations', 'Over-energy analysis', 'Save unlimited charts'].map(f => (
                        <li key={f} className="flex items-center gap-1.5 text-xs text-gray-400">
                          <div className="w-1 h-1 rounded-full bg-blue-500 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Platinum plan */}
                  <div className="px-4 py-4 bg-amber-950/20">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="text-sm font-bold text-white">Platinum</p>
                          <span className="text-[9px] font-bold bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded-full border border-amber-500/30">BEST</span>
                        </div>
                        <p className="text-xs text-gray-500">₹1,499 / month</p>
                      </div>
                      <button
                        onClick={onShowUpgrade}
                        className="text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white px-3 py-1 rounded-lg transition-all"
                      >
                        View Plans
                      </button>
                    </div>
                    <ul className="space-y-1">
                      {['Everything in Gold', 'AI Name Correction', 'AI Tarot Reading', 'Business Numerology', 'Client-ready PDF', 'Save unlimited charts'].map(f => (
                        <li key={f} className="flex items-center gap-1.5 text-xs text-gray-400">
                          <div className="w-1 h-1 rounded-full bg-amber-500 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
