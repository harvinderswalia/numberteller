import { useState, useEffect, useCallback, useRef } from 'react';
import { Shield, Users, TrendingUp, Search, RefreshCw, Mail, Hash, LogOut, AlertCircle, CheckCircle, Clock, Crown, Zap, Gift, X, Save, Trash2, RotateCcw, CreditCard as Edit2, DollarSign, ChevronDown, ChevronUp, Eye, EyeOff, Activity, ArrowUpRight, FileText, Ban, Unlock, IndianRupee, CalendarDays, BadgeCheck, AlertOctagon, File as FileEdit } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { BETA_MODE } from '../utils/subscription';

const SUPER_ADMIN_EMAIL = 'harvinderswalia@gmail.com';

const PLAN_PRICES: Record<string, number> = { free: 0, calculator: 999, expert: 1499 };

interface AdminUser {
  user_id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  email_confirmed_at: string | null;
}

interface PlanOverride {
  id?: string;
  user_auth_id: string;
  email: string;
  plan_id: string;
  trial_expires_at: string | null;
  trial_calc_limit: number | null;
  subscription_expires_at: string | null;
  notes: string;
  calc_used: number;
  monthly_amount: number;
  updated_at?: string;
  updated_by?: string;
}

type ModalType = 'edit' | 'delete' | 'notes' | 'amount' | null;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmt(dt: string | null, short = false): string {
  if (!dt) return '—';
  return new Date(dt).toLocaleDateString('en-GB', short
    ? { day: '2-digit', month: 'short' }
    : { day: '2-digit', month: 'short', year: 'numeric' }
  );
}

function fmtRupees(n: number) {
  return `₹${n.toLocaleString('en-IN')}`;
}

function isExpired(dt: string | null): boolean {
  if (!dt) return false;
  return new Date(dt) <= new Date();
}

function daysLeft(dt: string | null): number | null {
  if (!dt) return null;
  const diff = Math.ceil((new Date(dt).getTime() - Date.now()) / 86400000);
  return diff;
}

function planMeta(planId: string, isBeta = false) {
  if (planId === 'expert')     return { label: 'Expert',     color: 'text-amber-400',  bg: 'bg-amber-500/15 border-amber-500/30',  icon: Crown };
  if (planId === 'calculator') return { label: 'Calculator', color: 'text-blue-400',   bg: 'bg-blue-500/15 border-blue-500/30',    icon: Zap };
  if (isBeta)                  return { label: 'Beta',       color: 'text-teal-400',   bg: 'bg-teal-500/15 border-teal-500/30',    icon: Gift };
  return                              { label: 'Free Trial', color: 'text-emerald-400', bg: 'bg-emerald-500/15 border-emerald-500/30', icon: Gift };
}

// ─── Reusable modal shell ─────────────────────────────────────────────────────
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h3 className="text-white font-bold text-lg">{title}</h3>
          <button onClick={onClose} className="p-1.5 text-gray-500 hover:text-white rounded-lg hover:bg-white/5 transition-colors"><X className="w-4 h-4" /></button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ msg, type = 'success' }: { msg: string; type?: 'success' | 'error' }) {
  return (
    <div className={`fixed top-5 right-5 z-[60] flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-2xl text-sm font-medium border animate-in fade-in slide-in-from-top-2 ${
      type === 'error' ? 'bg-rose-950 border-rose-500/40 text-rose-200' : 'bg-slate-800 border-white/10 text-white'
    }`}>
      {type === 'error' ? <AlertOctagon className="w-4 h-4 text-rose-400" /> : <CheckCircle className="w-4 h-4 text-emerald-400" />}
      {msg}
    </div>
  );
}

// ─── Plan badge ───────────────────────────────────────────────────────────────
function PlanBadge({ planId, isBeta = false }: { planId: string; isBeta?: boolean }) {
  const m = planMeta(planId, isBeta);
  const Icon = m.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${m.color} ${m.bg}`}>
      <Icon className="w-3 h-3" />
      {m.label}
    </span>
  );
}

// ─── Icon button ──────────────────────────────────────────────────────────────
function IconBtn({ icon: Icon, label, onClick, color = 'gray', disabled = false, danger = false, spin = false }: {
  icon: any; label: string; onClick: () => void;
  color?: string; disabled?: boolean; danger?: boolean; spin?: boolean;
}) {
  const base = 'relative group p-2 rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed';
  const style = danger
    ? 'text-rose-400 hover:text-rose-300 hover:bg-rose-500/10'
    : color === 'blue'  ? 'text-blue-400 hover:text-blue-300 hover:bg-blue-500/10'
    : color === 'amber' ? 'text-amber-400 hover:text-amber-300 hover:bg-amber-500/10'
    : color === 'emerald' ? 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10'
    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5';
  return (
    <button className={`${base} ${style}`} onClick={onClick} disabled={disabled} title={label}>
      <Icon className={`w-4 h-4 ${spin ? 'animate-spin' : ''}`} />
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-0.5 bg-slate-700 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">{label}</span>
    </button>
  );
}

// ─── Field label ──────────────────────────────────────────────────────────────
function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">{children}</label>;
}

function Input({ value, onChange, type = 'text', placeholder, min, max, disabled }: any) {
  return (
    <input type={type} value={value} onChange={onChange} placeholder={placeholder} min={min} max={max} disabled={disabled}
      className="w-full px-3 py-2.5 bg-slate-800 border border-white/10 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors" />
  );
}

function Select({ value, onChange, children }: any) {
  return (
    <select value={value} onChange={onChange}
      className="w-full px-3 py-2.5 bg-slate-800 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer">
      {children}
    </select>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, icon: Icon, gradient, trend }: {
  label: string; value: string | number; sub: string; icon: any; gradient: string; trend?: string;
}) {
  return (
    <div className="bg-slate-900 border border-white/8 rounded-2xl p-5 hover:border-white/15 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {trend && (
          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
            <ArrowUpRight className="w-3 h-3" />{trend}
          </span>
        )}
      </div>
      <div className="text-3xl font-bold text-white mb-0.5">{value}</div>
      <div className="text-sm font-semibold text-gray-300">{label}</div>
      <div className="text-xs text-gray-600 mt-0.5">{sub}</div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function SuperAdminPortal() {
  const { user, signOut } = useAuth();
  const [tab, setTab] = useState<'dashboard' | 'users'>('dashboard');
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [overrides, setOverrides] = useState<PlanOverride[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [busyUser, setBusyUser] = useState<string | null>(null);

  // Modal state
  const [modal, setModal] = useState<ModalType>(null);
  const [modalUser, setModalUser] = useState<AdminUser | null>(null);

  // Edit form
  const [editForm, setEditForm] = useState<Partial<PlanOverride & { monthly_amount_input: string }>>({});

  // Notes / amount quick modals
  const [notesValue, setNotesValue] = useState('');
  const [amountValue, setAmountValue] = useState('');

  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ msg, type });
    toastTimer.current = setTimeout(() => setToast(null), 3500);
  };

  const closeModal = () => { setModal(null); setModalUser(null); };

  // ── Load ──────────────────────────────────────────────────────────────────
  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [{ data: usersData, error: ue }, { data: ovData, error: oe }] = await Promise.all([
        supabase.rpc('get_all_users_for_admin'),
        supabase.from('user_plan_overrides').select('*'),
      ]);
      if (ue) throw ue;
      if (oe) throw oe;
      setUsers(usersData || []);
      setOverrides(ovData || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.email === SUPER_ADMIN_EMAIL) loadData();
  }, [user, loadData]);

  const getOverride = (uid: string) => overrides.find(o => o.user_auth_id === uid);

  // ── Stats ────────────────────────────────────────────────────────────────
  const stats = (() => {
    let calc = 0, expert = 0, freeTrial = 0, mrr = 0, totalCalcs = 0;
    for (const u of users) {
      const ov = getOverride(u.user_id);
      if (ov?.plan_id === 'calculator') { calc++; mrr += ov.monthly_amount || PLAN_PRICES.calculator; }
      else if (ov?.plan_id === 'expert') { expert++; mrr += ov.monthly_amount || PLAN_PRICES.expert; }
      else freeTrial++;
      totalCalcs += ov?.calc_used ?? 0;
    }
    return { total: users.length, calc, expert, freeTrial, mrr, totalCalcs };
  })();

  // ── Open edit modal ──────────────────────────────────────────────────────
  const openEdit = (u: AdminUser) => {
    const ov = getOverride(u.user_id);
    setEditForm({
      user_auth_id: u.user_id,
      email: u.email,
      plan_id: ov?.plan_id ?? 'free',
      trial_expires_at: ov?.trial_expires_at ? ov.trial_expires_at.split('T')[0] : '',
      trial_calc_limit: ov?.trial_calc_limit ?? null,
      subscription_expires_at: ov?.subscription_expires_at ? ov.subscription_expires_at.split('T')[0] : '',
      notes: ov?.notes ?? '',
      monthly_amount: ov?.monthly_amount ?? 0,
      monthly_amount_input: String(ov?.monthly_amount ?? PLAN_PRICES[ov?.plan_id ?? 'free'] ?? 0),
    });
    setModalUser(u);
    setModal('edit');
  };

  // ── Save edit ─────────────────────────────────────────────────────────────
  const saveEdit = async () => {
    if (!editForm.user_auth_id || !editForm.email) return;
    setBusyUser(editForm.user_auth_id);
    const planId = editForm.plan_id ?? 'free';
    const isPaid = planId === 'calculator' || planId === 'expert';

    const payload: any = {
      user_auth_id: editForm.user_auth_id,
      email: editForm.email,
      plan_id: planId,
      // Trial fields only relevant when plan is free
      trial_expires_at: isPaid ? null : (editForm.trial_expires_at || null),
      trial_calc_limit: isPaid ? null : (editForm.trial_calc_limit ?? null),
      // Subscription expiry only relevant when paid
      subscription_expires_at: isPaid ? (editForm.subscription_expires_at || null) : null,
      notes: editForm.notes ?? '',
      monthly_amount: isPaid ? (parseInt(editForm.monthly_amount_input ?? '0') || PLAN_PRICES[planId]) : 0,
      updated_at: new Date().toISOString(),
      updated_by: user?.email ?? '',
    };

    try {
      const existing = getOverride(editForm.user_auth_id);
      const { error } = existing?.id
        ? await supabase.from('user_plan_overrides').update(payload).eq('id', existing.id)
        : await supabase.from('user_plan_overrides').insert(payload);
      if (error) throw error;
      await loadData();
      closeModal();
      showToast(`Plan updated to ${planMeta(planId).label} for ${editForm.email}`);
    } catch (err: any) {
      showToast('Save failed: ' + err.message, 'error');
    } finally {
      setBusyUser(null);
    }
  };

  // ── Reset calc count ──────────────────────────────────────────────────────
  const resetCalcUsed = async (u: AdminUser) => {
    const ov = getOverride(u.user_id);
    if (!ov?.id) return;
    setBusyUser(u.user_id);
    try {
      const { error } = await supabase.from('user_plan_overrides')
        .update({ calc_used: 0, updated_at: new Date().toISOString(), updated_by: user?.email ?? '' })
        .eq('id', ov.id);
      if (error) throw error;
      await loadData();
      showToast(`Calculation count reset for ${u.email}`);
    } catch (err: any) {
      showToast('Reset failed: ' + err.message, 'error');
    } finally {
      setBusyUser(null);
    }
  };

  // ── Send password reset ───────────────────────────────────────────────────
  const sendReset = async (u: AdminUser) => {
    setBusyUser(u.user_id + '_reset');
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(u.email, { redirectTo: window.location.origin });
      if (error) throw error;
      showToast(`Password reset sent to ${u.email}`);
    } catch (err: any) {
      showToast('Error: ' + err.message, 'error');
    } finally {
      setBusyUser(null);
    }
  };

  // ── Save notes quick modal ────────────────────────────────────────────────
  const openNotes = (u: AdminUser) => {
    const ov = getOverride(u.user_id);
    setNotesValue(ov?.notes ?? '');
    setModalUser(u);
    setModal('notes');
  };

  const saveNotes = async () => {
    if (!modalUser) return;
    const ov = getOverride(modalUser.user_id);
    setBusyUser(modalUser.user_id);
    try {
      if (ov?.id) {
        await supabase.from('user_plan_overrides').update({ notes: notesValue, updated_by: user?.email ?? '', updated_at: new Date().toISOString() }).eq('id', ov.id);
      } else {
        await supabase.from('user_plan_overrides').upsert({ user_auth_id: modalUser.user_id, email: modalUser.email, notes: notesValue, plan_id: 'free', calc_used: 0 }, { onConflict: 'user_auth_id' });
      }
      await loadData();
      closeModal();
      showToast('Notes saved');
    } catch (err: any) {
      showToast('Error: ' + err.message, 'error');
    } finally {
      setBusyUser(null);
    }
  };

  // ── Update amount quick modal ─────────────────────────────────────────────
  const openAmount = (u: AdminUser) => {
    const ov = getOverride(u.user_id);
    setAmountValue(String(ov?.monthly_amount ?? PLAN_PRICES[ov?.plan_id ?? 'free'] ?? 0));
    setModalUser(u);
    setModal('amount');
  };

  const saveAmount = async () => {
    if (!modalUser) return;
    const ov = getOverride(modalUser.user_id);
    const amt = parseInt(amountValue) || 0;
    setBusyUser(modalUser.user_id);
    try {
      if (ov?.id) {
        await supabase.from('user_plan_overrides').update({ monthly_amount: amt, updated_by: user?.email ?? '', updated_at: new Date().toISOString() }).eq('id', ov.id);
      }
      await loadData();
      closeModal();
      showToast(`Monthly amount updated to ₹${amt.toLocaleString('en-IN')}`);
    } catch (err: any) {
      showToast('Error: ' + err.message, 'error');
    } finally {
      setBusyUser(null);
    }
  };

  // ── Confirm delete modal ──────────────────────────────────────────────────
  const openDelete = (u: AdminUser) => { setModalUser(u); setModal('delete'); };

  const confirmDelete = async () => {
    if (!modalUser) return;
    const ov = getOverride(modalUser.user_id);
    setBusyUser(modalUser.user_id);
    try {
      // Zero out the plan (we cannot delete auth.users from client, but we can revoke access)
      if (ov?.id) {
        await supabase.from('user_plan_overrides').update({
          plan_id: 'free',
          trial_expires_at: new Date(0).toISOString(), // expired immediately
          trial_calc_limit: 0,
          subscription_expires_at: null,
          notes: `[REVOKED by admin ${user?.email} on ${new Date().toLocaleDateString()}] ${ov.notes ?? ''}`.trim(),
          updated_by: user?.email ?? '',
          updated_at: new Date().toISOString(),
        }).eq('id', ov.id);
      }
      await loadData();
      closeModal();
      showToast(`Access revoked for ${modalUser.email}`);
    } catch (err: any) {
      showToast('Error: ' + err.message, 'error');
    } finally {
      setBusyUser(null);
    }
  };

  // ── Filtered users ────────────────────────────────────────────────────────
  const filteredUsers = users.filter(u => u.email.toLowerCase().includes(search.toLowerCase()));

  // ── Guards ────────────────────────────────────────────────────────────────
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-10 max-w-sm w-full text-center">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-5">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-gray-500 text-sm">You must be signed in to access this area.</p>
        </div>
      </div>
    );
  }

  if (user.email !== SUPER_ADMIN_EMAIL) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-rose-500/30 rounded-2xl p-10 max-w-sm w-full text-center">
          <div className="w-14 h-14 bg-rose-500/20 rounded-xl flex items-center justify-center mx-auto mb-5">
            <Shield className="w-7 h-7 text-rose-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-gray-500 text-sm">You do not have permission to access the admin portal.</p>
          <button onClick={signOut} className="mt-6 flex items-center gap-2 mx-auto px-4 py-2 text-sm text-gray-400 hover:text-white border border-white/10 rounded-lg transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>
    );
  }

  const isPaidPlan = (editForm.plan_id === 'calculator' || editForm.plan_id === 'expert');

  return (
    <div className="min-h-screen bg-slate-950">
      {toast && <Toast msg={toast.msg} type={toast.type} />}

      {/* ── Header ── */}
      <header className="bg-slate-900 border-b border-white/8 px-4 sm:px-6 py-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
              <Hash className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold">NumberTeller</span>
                <span className="text-xs font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/25 px-2 py-0.5 rounded-full">Super Admin</span>
              </div>
              <p className="text-gray-600 text-xs">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={loadData} className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-400 hover:text-white border border-white/10 rounded-lg transition-colors">
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button onClick={signOut} className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-400 hover:text-white border border-white/10 rounded-lg transition-colors">
              <LogOut className="w-3.5 h-3.5" /><span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {[
            { id: 'dashboard' as const, label: 'Dashboard', icon: TrendingUp },
            { id: 'users' as const, label: `Users${users.length ? ` (${users.length})` : ''}`, icon: Users },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                tab === t.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-gray-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 border border-white/10'
              }`}>
              <t.icon className="w-4 h-4" />{t.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="flex items-start gap-2.5 p-4 bg-rose-500/10 border border-rose-500/25 rounded-xl mb-6">
            <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
            <p className="text-rose-300 text-sm">{error}</p>
          </div>
        )}

        {/* ── Dashboard Tab ── */}
        {tab === 'dashboard' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Overview</h2>
              <p className="text-gray-500 text-sm">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Total Users" value={loading ? '—' : stats.total} sub="registered accounts" icon={Users} gradient="from-blue-600 to-blue-500" />
              <StatCard label="Monthly Revenue" value={loading ? '—' : fmtRupees(stats.mrr)} sub="MRR from paid plans" icon={IndianRupee} gradient="from-emerald-600 to-teal-500" />
              <StatCard label="Expert Plan" value={loading ? '—' : stats.expert} sub={`@ ${fmtRupees(PLAN_PRICES.expert)}/mo each`} icon={Crown} gradient="from-amber-600 to-orange-500" />
              <StatCard label="Calculator Plan" value={loading ? '—' : stats.calc} sub={`@ ${fmtRupees(PLAN_PRICES.calculator)}/mo each`} icon={Zap} gradient="from-blue-700 to-cyan-600" />
            </div>

            {/* Secondary stats row */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-slate-900 border border-white/8 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="w-4 h-4 text-teal-400" />
                  <span className="text-sm font-semibold text-gray-300">Total Calculations Run</span>
                </div>
                <div className="text-2xl font-bold text-white">{loading ? '—' : stats.totalCalcs.toLocaleString('en-IN')}</div>
                <div className="text-xs text-gray-600 mt-1">across all users</div>
              </div>
              <div className="bg-slate-900 border border-white/8 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Gift className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-semibold text-gray-300">Free Trial Users</span>
                </div>
                <div className="text-2xl font-bold text-white">{loading ? '—' : stats.freeTrial}</div>
                <div className="text-xs text-gray-600 mt-1">potential conversion targets</div>
              </div>
              <div className="bg-slate-900 border border-white/8 rounded-2xl p-5 col-span-2 lg:col-span-1">
                <div className="flex items-center gap-2 mb-3">
                  <BadgeCheck className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-semibold text-gray-300">Conversion Rate</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {loading || stats.total === 0 ? '—' : `${Math.round(((stats.expert + stats.calc) / stats.total) * 100)}%`}
                </div>
                <div className="text-xs text-gray-600 mt-1">trial → paid</div>
              </div>
            </div>

            {/* Recent signups */}
            <div className="bg-slate-900 border border-white/8 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-white/8 flex items-center justify-between">
                <h3 className="text-white font-bold">Recent Signups</h3>
                <button onClick={() => setTab('users')} className="text-xs text-blue-400 hover:text-blue-300 transition-colors">View all →</button>
              </div>
              <div className="divide-y divide-white/5">
                {loading ? (
                  <div className="py-8 text-center text-gray-500 text-sm">Loading...</div>
                ) : users.length === 0 ? (
                  <div className="py-8 text-center text-gray-500 text-sm">No users yet.</div>
                ) : users.slice(0, 8).map(u => {
                  const ov = getOverride(u.user_id);
                  const planId = ov?.plan_id ?? 'free';
                  const m = planMeta(planId);
                  return (
                    <div key={u.user_id} className="flex items-center justify-between px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-gray-400 text-xs font-bold">
                          {u.email[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{u.email}</p>
                          <p className="text-gray-600 text-xs">Joined {fmt(u.created_at)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {planId !== 'free' && ov?.monthly_amount ? (
                          <span className="text-xs text-gray-500">{fmtRupees(ov.monthly_amount)}/mo</span>
                        ) : null}
                        <PlanBadge planId={planId} isBeta={BETA_MODE && planId === 'free'} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── Users Tab ── */}
        {tab === 'users' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h2 className="text-2xl font-bold text-white">All Users</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search by email..."
                  className="pl-9 pr-4 py-2.5 bg-slate-800 border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 w-72 transition-colors" />
                {search && (
                  <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {loading ? (
              <div className="bg-slate-900 border border-white/8 rounded-2xl p-12 text-center">
                <RefreshCw className="w-8 h-8 text-blue-400 animate-spin mx-auto mb-3" />
                <p className="text-gray-500">Loading users...</p>
              </div>
            ) : (
              <div className="bg-slate-900 border border-white/8 rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/8 bg-slate-800/40">
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Joined</th>
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Last Login</th>
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Plan</th>
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden xl:table-cell">Usage</th>
                      <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(u => {
                      const ov = getOverride(u.user_id);
                      const planId = ov?.plan_id ?? 'free';
                      const isExpanded = expandedUser === u.user_id;
                      const isBusy = busyUser === u.user_id;
                      const subExpired = isExpired(ov?.subscription_expires_at ?? null);
                      const trialExp = isExpired(ov?.trial_expires_at ?? null);
                      const dl = planId === 'free' ? daysLeft(ov?.trial_expires_at ?? null) : daysLeft(ov?.subscription_expires_at ?? null);

                      return (
                        <>
                          <tr key={u.user_id} className={`border-b border-white/5 transition-colors ${isExpanded ? 'bg-slate-800/30' : 'hover:bg-white/[0.02]'}`}>
                            {/* User */}
                            <td className="px-5 py-4">
                              <p className="text-white text-sm font-medium">{u.email}</p>
                              <div className="flex items-center gap-2 mt-0.5">
                                {u.email_confirmed_at ? (
                                  <span className="text-xs text-emerald-400 flex items-center gap-1"><CheckCircle className="w-3 h-3" />Verified</span>
                                ) : (
                                  <span className="text-xs text-amber-400 flex items-center gap-1"><Clock className="w-3 h-3" />Unverified</span>
                                )}
                                {ov?.notes && <span className="text-xs text-gray-600 flex items-center gap-0.5"><FileEdit className="w-3 h-3" />Note</span>}
                              </div>
                            </td>
                            {/* Joined */}
                            <td className="px-5 py-4 text-sm text-gray-500 hidden md:table-cell">{fmt(u.created_at)}</td>
                            {/* Last login */}
                            <td className="px-5 py-4 text-sm text-gray-500 hidden lg:table-cell">{fmt(u.last_sign_in_at)}</td>
                            {/* Plan */}
                            <td className="px-5 py-4">
                              <PlanBadge planId={planId} isBeta={BETA_MODE && planId === 'free'} />
                              {planId !== 'free' && ov?.subscription_expires_at && (
                                <p className={`text-xs mt-1 ${subExpired ? 'text-rose-400' : 'text-gray-600'}`}>
                                  {subExpired ? 'Expired' : `Exp ${fmt(ov.subscription_expires_at, true)}`}
                                  {!subExpired && dl !== null && dl <= 7 && <span className="text-amber-400"> · {dl}d left</span>}
                                </p>
                              )}
                              {planId === 'free' && ov?.trial_expires_at && (
                                <p className={`text-xs mt-1 ${trialExp ? 'text-rose-400' : 'text-gray-600'}`}>
                                  {trialExp ? 'Trial expired' : `Trial exp ${fmt(ov.trial_expires_at, true)}`}
                                </p>
                              )}
                              {planId !== 'free' && ov?.monthly_amount ? (
                                <p className="text-xs text-gray-600 mt-0.5">{fmtRupees(ov.monthly_amount)}/mo</p>
                              ) : null}
                            </td>
                            {/* Usage */}
                            <td className="px-5 py-4 hidden xl:table-cell">
                              <div className="flex items-center gap-1.5">
                                <span className="text-sm font-semibold text-white">{ov?.calc_used ?? 0}</span>
                                {planId === 'free' && (
                                  <span className="text-xs text-gray-600">/ {ov?.trial_calc_limit ?? 5}</span>
                                )}
                              </div>
                              {planId === 'free' && (
                                <div className="w-16 h-1 bg-slate-700 rounded-full mt-1">
                                  <div
                                    className="h-1 bg-blue-500 rounded-full transition-all"
                                    style={{ width: `${Math.min(100, ((ov?.calc_used ?? 0) / (ov?.trial_calc_limit ?? 5)) * 100)}%` }}
                                  />
                                </div>
                              )}
                            </td>
                            {/* Actions */}
                            <td className="px-5 py-4">
                              <div className="flex items-center justify-end gap-0.5">
                                <IconBtn icon={Edit2} label="Edit Plan" onClick={() => openEdit(u)} color="blue" />
                                <IconBtn icon={IndianRupee} label="Set Amount" onClick={() => openAmount(u)} color="amber" />
                                <IconBtn icon={FileEdit} label="Admin Notes" onClick={() => openNotes(u)} />
                                <IconBtn icon={RotateCcw} label="Reset Calc Count" onClick={() => resetCalcUsed(u)} color="emerald" disabled={isBusy || !ov?.id} />
                                <IconBtn icon={Mail} label="Send Password Reset" onClick={() => sendReset(u)} disabled={busyUser === u.user_id + '_reset'} spin={busyUser === u.user_id + '_reset'} />
                                <IconBtn icon={isExpanded ? EyeOff : Eye} label={isExpanded ? 'Collapse' : 'View Details'} onClick={() => setExpandedUser(isExpanded ? null : u.user_id)} />
                                <IconBtn icon={Ban} label="Revoke Access" onClick={() => openDelete(u)} danger />
                              </div>
                            </td>
                          </tr>

                          {/* Expanded details row */}
                          {isExpanded && (
                            <tr className="border-b border-white/5 bg-slate-800/20">
                              <td colSpan={6} className="px-5 py-4">
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-xs">
                                  {[
                                    { label: 'User ID', value: u.user_id.split('-')[0] + '…', mono: true },
                                    { label: 'Plan', value: planMeta(planId).label },
                                    { label: 'Calcs Used', value: ov?.calc_used ?? 0 },
                                    { label: 'Calc Limit', value: planId === 'free' ? (ov?.trial_calc_limit ?? 5) : 'Unlimited' },
                                    { label: 'Trial Expires', value: fmt(ov?.trial_expires_at ?? null) },
                                    { label: 'Sub Expires', value: fmt(ov?.subscription_expires_at ?? null) },
                                    { label: 'Monthly Amt', value: ov?.monthly_amount ? fmtRupees(ov.monthly_amount) : '—' },
                                    { label: 'Last Updated', value: fmt(ov?.updated_at ?? null) },
                                    { label: 'Updated By', value: ov?.updated_by || '—' },
                                  ].map(item => (
                                    <div key={item.label}>
                                      <p className="text-gray-600 uppercase tracking-wider mb-0.5">{item.label}</p>
                                      <p className={`text-gray-300 font-medium ${item.mono ? 'font-mono' : ''}`}>{String(item.value)}</p>
                                    </div>
                                  ))}
                                  {ov?.notes && (
                                    <div className="col-span-2 md:col-span-4 lg:col-span-6">
                                      <p className="text-gray-600 uppercase tracking-wider mb-0.5">Admin Notes</p>
                                      <p className="text-gray-300">{ov.notes}</p>
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
                      );
                    })}
                  </tbody>
                </table>

                {filteredUsers.length === 0 && !loading && (
                  <div className="py-12 text-center text-gray-500">
                    {search ? `No users matching "${search}"` : 'No users yet.'}
                  </div>
                )}

                <div className="px-5 py-3 border-t border-white/5 bg-slate-800/20 flex items-center justify-between">
                  <p className="text-xs text-gray-600">{filteredUsers.length} of {users.length} users</p>
                  <p className="text-xs text-gray-600">MRR: <span className="text-emerald-400 font-semibold">{fmtRupees(stats.mrr)}</span></p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          MODALS
      ══════════════════════════════════════════════════════════════════════ */}

      {/* ── Edit Plan Modal ── */}
      {modal === 'edit' && modalUser && (
        <Modal title={`Edit Plan — ${modalUser.email}`} onClose={closeModal}>
          <div className="space-y-4">
            {/* Plan selector */}
            <div>
              <FieldLabel>Plan</FieldLabel>
              <Select value={editForm.plan_id ?? 'free'} onChange={(e: any) => {
                const p = e.target.value;
                setEditForm(f => ({
                  ...f,
                  plan_id: p,
                  monthly_amount_input: String(PLAN_PRICES[p] ?? 0),
                }));
              }}>
                <option value="free">Free Trial</option>
                <option value="calculator">Calculator — ₹999/mo</option>
                <option value="expert">Expert — ₹1,499/mo</option>
              </Select>
            </div>

            {/* Context-aware fields */}
            {!isPaidPlan && (
              <div className="grid grid-cols-2 gap-4 p-4 bg-emerald-500/5 border border-emerald-500/15 rounded-xl">
                <div className="col-span-2">
                  <p className="text-xs font-semibold text-emerald-400 mb-3 flex items-center gap-1.5"><Gift className="w-3.5 h-3.5" />Free Trial Settings</p>
                </div>
                <div>
                  <FieldLabel>Trial Expiry Date</FieldLabel>
                  <Input type="date" value={editForm.trial_expires_at ?? ''} onChange={(e: any) => setEditForm(f => ({ ...f, trial_expires_at: e.target.value }))} />
                </div>
                <div>
                  <FieldLabel>Calc Limit (default 5)</FieldLabel>
                  <Input type="number" value={editForm.trial_calc_limit ?? ''} onChange={(e: any) => setEditForm(f => ({ ...f, trial_calc_limit: e.target.value ? parseInt(e.target.value) : null }))} placeholder="5" min={0} max={999} />
                </div>
              </div>
            )}

            {isPaidPlan && (
              <div className="grid grid-cols-2 gap-4 p-4 bg-blue-500/5 border border-blue-500/15 rounded-xl">
                <div className="col-span-2">
                  <p className="text-xs font-semibold text-blue-400 mb-3 flex items-center gap-1.5">
                    {editForm.plan_id === 'expert' ? <Crown className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5" />}
                    {planMeta(editForm.plan_id ?? 'free').label} Plan Settings
                  </p>
                </div>
                <div>
                  <FieldLabel>Subscription Expiry</FieldLabel>
                  <Input type="date" value={editForm.subscription_expires_at ?? ''} onChange={(e: any) => setEditForm(f => ({ ...f, subscription_expires_at: e.target.value }))} />
                  <p className="text-xs text-gray-600 mt-1">Leave blank = never expires</p>
                </div>
                <div>
                  <FieldLabel>Monthly Amount (₹)</FieldLabel>
                  <Input type="number" value={editForm.monthly_amount_input ?? ''} onChange={(e: any) => setEditForm(f => ({ ...f, monthly_amount_input: e.target.value }))} placeholder={String(PLAN_PRICES[editForm.plan_id ?? 'free'])} min={0} />
                  <p className="text-xs text-gray-600 mt-1">Standard: {fmtRupees(PLAN_PRICES[editForm.plan_id ?? 'free'])}</p>
                </div>
              </div>
            )}

            {/* Notes */}
            <div>
              <FieldLabel>Admin Notes</FieldLabel>
              <textarea value={editForm.notes ?? ''} onChange={(e: any) => setEditForm(f => ({ ...f, notes: e.target.value }))}
                placeholder="Reason for override, payment reference, etc..."
                rows={2}
                className="w-full px-3 py-2.5 bg-slate-800 border border-white/10 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors resize-none" />
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between pt-2">
              <button onClick={closeModal} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white border border-white/10 rounded-xl transition-colors">
                <X className="w-4 h-4" />Cancel
              </button>
              <button onClick={saveEdit} disabled={busyUser === editForm.user_auth_id}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50">
                <Save className="w-4 h-4" />
                {busyUser === editForm.user_auth_id ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Notes Modal ── */}
      {modal === 'notes' && modalUser && (
        <Modal title={`Admin Notes — ${modalUser.email}`} onClose={closeModal}>
          <div className="space-y-4">
            <textarea value={notesValue} onChange={e => setNotesValue(e.target.value)}
              placeholder="Payment reference, support history, custom deal, etc..."
              rows={5}
              className="w-full px-3 py-2.5 bg-slate-800 border border-white/10 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors resize-none" />
            <div className="flex items-center justify-between">
              <button onClick={closeModal} className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-white/10 rounded-xl transition-colors">Cancel</button>
              <button onClick={saveNotes} disabled={!!busyUser} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50">
                <Save className="w-4 h-4" />Save Notes
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Amount Modal ── */}
      {modal === 'amount' && modalUser && (
        <Modal title={`Monthly Amount — ${modalUser.email}`} onClose={closeModal}>
          <div className="space-y-4">
            <p className="text-gray-400 text-sm">Set the actual monthly amount this user pays. Used for accurate MRR calculation.</p>
            <div>
              <FieldLabel>Monthly Amount (₹)</FieldLabel>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                <input type="number" value={amountValue} onChange={e => setAmountValue(e.target.value)}
                  placeholder="0" min={0}
                  className="w-full pl-7 pr-3 py-2.5 bg-slate-800 border border-white/10 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors" />
              </div>
              <div className="flex gap-2 mt-2">
                {Object.entries(PLAN_PRICES).filter(([k]) => k !== 'free').map(([k, v]) => (
                  <button key={k} onClick={() => setAmountValue(String(v))}
                    className="px-3 py-1 text-xs bg-slate-700 hover:bg-slate-600 text-gray-300 rounded-lg transition-colors">
                    {planMeta(k).label}: {fmtRupees(v)}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <button onClick={closeModal} className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-white/10 rounded-xl transition-colors">Cancel</button>
              <button onClick={saveAmount} disabled={!!busyUser} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50">
                <Save className="w-4 h-4" />Update Amount
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Revoke Access Modal ── */}
      {modal === 'delete' && modalUser && (
        <Modal title="Revoke Access" onClose={closeModal}>
          <div className="space-y-5">
            <div className="flex items-start gap-3 p-4 bg-rose-500/10 border border-rose-500/25 rounded-xl">
              <Ban className="w-5 h-5 text-rose-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-rose-300 font-semibold text-sm mb-1">This will revoke all access for this user.</p>
                <p className="text-rose-400/70 text-xs">The user account will remain but their trial will be marked expired and their calc limit set to zero. The user will be blocked from all tools. This cannot be automatically undone.</p>
              </div>
            </div>
            <div className="bg-slate-800 rounded-xl px-4 py-3">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">User</p>
              <p className="text-white font-semibold">{modalUser.email}</p>
            </div>
            <div className="flex items-center justify-between">
              <button onClick={closeModal} className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-white/10 rounded-xl transition-colors">
                Cancel
              </button>
              <button onClick={confirmDelete} disabled={!!busyUser}
                className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50">
                <Ban className="w-4 h-4" />Revoke Access
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
