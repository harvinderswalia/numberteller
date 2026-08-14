import { useState, useEffect, useCallback, useRef } from 'react';
import { Shield, Users, TrendingUp, Search, RefreshCw, Mail, Hash, LogOut, AlertCircle, CheckCircle, Clock, Crown, Zap, Star, Gift, X, Save, Ban, RotateCcw, CreditCard, IndianRupee, ChevronDown, ChevronUp, Eye, EyeOff, Activity, ArrowUpRight, FileText, BadgeCheck, AlertOctagon, MessageCircle, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { PLAN_PRICES } from '../utils/subscription';

const SUPER_ADMIN_EMAIL = 'harvinderswalia@gmail.com';

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
  full_name: string | null;
  phone: string | null;
  setup_completed_at: string | null;
  updated_at?: string;
  updated_by?: string;
}

interface ActivationRequest {
  id: string;
  user_auth_id: string;
  email: string;
  full_name: string;
  phone: string;
  requested_plan_id: string;
  status: string;
  reminder_count: number;
  admin_notes: string;
  activated_plan_id: string | null;
  subscription_expires_at: string | null;
  monthly_amount: number | null;
  created_at: string;
  updated_at: string;
}

interface PlanDef {
  id: string;
  name: string;
  monthly_price: number;
  description: string;
  features: string[];
  not_included: string[];
  is_active: boolean;
  sort_order: number;
}

type Tab = 'dashboard' | 'users' | 'activations' | 'plans';
type ModalType = 'edit' | 'delete' | 'notes' | 'amount' | 'approve' | 'reject' | 'editPlan' | null;

function fmt(dt: string | null, short = false): string {
  if (!dt) return '—';
  return new Date(dt).toLocaleDateString('en-GB', short
    ? { day: '2-digit', month: 'short' }
    : { day: '2-digit', month: 'short', year: 'numeric' }
  );
}

function fmtRupees(n: number) { return `₹${n.toLocaleString('en-IN')}`; }

function isExpired(dt: string | null): boolean {
  if (!dt) return false;
  return new Date(dt) <= new Date();
}

function daysLeft(dt: string | null): number | null {
  if (!dt) return null;
  return Math.ceil((new Date(dt).getTime() - Date.now()) / 86400000);
}

function planMeta(planId: string) {
  if (planId === 'platinum') return { label: 'Platinum', color: 'text-amber-400', bg: 'bg-amber-500/15 border-amber-500/30', icon: Crown };
  if (planId === 'gold')      return { label: 'Gold',     color: 'text-yellow-400', bg: 'bg-yellow-500/15 border-yellow-500/30', icon: Star };
  if (planId === 'silver')    return { label: 'Silver',   color: 'text-blue-400',   bg: 'bg-blue-500/15 border-blue-500/30',   icon: Zap };
  return                            { label: 'Free Trial', color: 'text-emerald-400', bg: 'bg-emerald-500/15 border-emerald-500/30', icon: Gift };
}

function addOneMonth(date: Date): Date {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  let targetMonth = month + 1;
  let targetYear = year;
  if (targetMonth > 11) { targetMonth = 0; targetYear++; }
  const lastDayOfTarget = new Date(targetYear, targetMonth + 1, 0).getDate();
  const useDay = Math.min(day, lastDayOfTarget);
  return new Date(targetYear, targetMonth, useDay, date.getHours(), date.getMinutes(), date.getSeconds());
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 sticky top-0 bg-slate-900 z-10">
          <h3 className="text-white font-bold text-lg">{title}</h3>
          <button onClick={onClose} className="p-1.5 text-gray-500 hover:text-white rounded-lg hover:bg-white/5 transition-colors"><X className="w-4 h-4" /></button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

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

function PlanBadge({ planId }: { planId: string }) {
  const m = planMeta(planId);
  const Icon = m.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${m.color} ${m.bg}`}>
      <Icon className="w-3 h-3" />
      {m.label}
    </span>
  );
}

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

export default function SuperAdminPortal() {
  const { user, signOut } = useAuth();
  const [tab, setTab] = useState<Tab>('dashboard');
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [overrides, setOverrides] = useState<PlanOverride[]>([]);
  const [activationRequests, setActivationRequests] = useState<ActivationRequest[]>([]);
  const [plans, setPlans] = useState<PlanDef[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [busyUser, setBusyUser] = useState<string | null>(null);

  const [modal, setModal] = useState<ModalType>(null);
  const [modalUser, setModalUser] = useState<AdminUser | null>(null);
  const [modalRequest, setModalRequest] = useState<ActivationRequest | null>(null);
  const [editForm, setEditForm] = useState<Partial<PlanOverride & { monthly_amount_input: string }>>({});
  const [notesValue, setNotesValue] = useState('');
  const [amountValue, setAmountValue] = useState('');
  const [approveForm, setApproveForm] = useState<{ planId: string; expiryDate: string; monthlyAmount: string }>({ planId: '', expiryDate: '', monthlyAmount: '' });
  const [rejectNotes, setRejectNotes] = useState('');
  const [editPlanForm, setEditPlanForm] = useState<Partial<PlanDef & { featuresText: string; notIncludedText: string }>>({});

  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ msg, type });
    toastTimer.current = setTimeout(() => setToast(null), 3500);
  };
  const closeModal = () => { setModal(null); setModalUser(null); setModalRequest(null); };

  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [usersRes, ovRes, reqRes, plansRes] = await Promise.all([
        supabase.rpc('get_all_users_for_admin'),
        supabase.from('user_plan_overrides').select('*'),
        supabase.from('activation_requests').select('*').order('created_at', { ascending: false }),
        supabase.from('plans').select('*').order('sort_order', { ascending: true }),
      ]);
      if (usersRes.error) throw usersRes.error;
      if (ovRes.error) throw ovRes.error;
      if (reqRes.error) throw reqRes.error;
      if (plansRes.error) throw plansRes.error;
      setUsers(usersRes.data || []);
      setOverrides(ovRes.data || []);
      setActivationRequests(reqRes.data || []);
      setPlans(plansRes.data || []);
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
  const pendingRequests = activationRequests.filter(r => r.status === 'pending');

  const stats = (() => {
    let silver = 0, gold = 0, platinum = 0, freeTrial = 0, mrr = 0, totalCalcs = 0, pendingCount = pendingRequests.length;
    for (const u of users) {
      const ov = getOverride(u.user_id);
      if (ov?.plan_id === 'silver')   { silver++;   mrr += ov.monthly_amount || PLAN_PRICES.silver; }
      else if (ov?.plan_id === 'gold')     { gold++;     mrr += ov.monthly_amount || PLAN_PRICES.gold; }
      else if (ov?.plan_id === 'platinum') { platinum++; mrr += ov.monthly_amount || PLAN_PRICES.platinum; }
      else freeTrial++;
      totalCalcs += ov?.calc_used ?? 0;
    }
    return { total: users.length, silver, gold, platinum, freeTrial, mrr, totalCalcs, pendingCount };
  })();

  // ── Edit plan modal ──
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

  const saveEdit = async () => {
    if (!editForm.user_auth_id || !editForm.email) return;
    setBusyUser(editForm.user_auth_id);
    const planId = editForm.plan_id ?? 'free';
    const isPaid = planId === 'silver' || planId === 'gold' || planId === 'platinum';
    const payload: any = {
      user_auth_id: editForm.user_auth_id,
      email: editForm.email,
      plan_id: planId,
      trial_expires_at: isPaid ? null : (editForm.trial_expires_at || null),
      trial_calc_limit: isPaid ? null : (editForm.trial_calc_limit ?? null),
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

  const openDelete = (u: AdminUser) => { setModalUser(u); setModal('delete'); };

  const confirmDelete = async () => {
    if (!modalUser) return;
    const ov = getOverride(modalUser.user_id);
    setBusyUser(modalUser.user_id);
    try {
      if (ov?.id) {
        await supabase.from('user_plan_overrides').update({
          plan_id: 'free',
          trial_expires_at: new Date(0).toISOString(),
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

  // ── Activation request approve/reject ──
  const openApprove = (req: ActivationRequest) => {
    setApproveForm({
      planId: req.requested_plan_id,
      expiryDate: addOneMonth(new Date()).toISOString().split('T')[0],
      monthlyAmount: String(PLAN_PRICES[req.requested_plan_id] ?? 0),
    });
    setModalRequest(req);
    setModal('approve');
  };

  const confirmApprove = async () => {
    if (!modalRequest) return;
    setBusyUser(modalRequest.id);
    try {
      const expiryDate = new Date(approveForm.expiryDate + 'T12:00:00');
      const monthlyAmount = parseInt(approveForm.monthlyAmount) || PLAN_PRICES[approveForm.planId] || 0;
      const planId = approveForm.planId;

      // Update activation request
      const { error: reqError } = await supabase.from('activation_requests')
        .update({
          status: 'approved',
          activated_plan_id: planId,
          subscription_expires_at: expiryDate.toISOString(),
          monthly_amount: monthlyAmount,
          updated_at: new Date().toISOString(),
        })
        .eq('id', modalRequest.id);
      if (reqError) throw reqError;

      // Update user's plan override
      const existing = getOverride(modalRequest.user_auth_id);
      const payload = {
        user_auth_id: modalRequest.user_auth_id,
        email: modalRequest.email,
        plan_id: planId,
        subscription_expires_at: expiryDate.toISOString(),
        monthly_amount: monthlyAmount,
        trial_expires_at: null,
        trial_calc_limit: null,
        updated_at: new Date().toISOString(),
        updated_by: user?.email ?? '',
      };
      if (existing?.id) {
        const { error } = await supabase.from('user_plan_overrides').update(payload).eq('id', existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('user_plan_overrides').insert(payload);
        if (error) throw error;
      }

      // Send plan_activated email
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`;
      await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}` },
        body: JSON.stringify({
          type: 'plan_activated',
          userEmail: modalRequest.email,
          userName: modalRequest.full_name,
          activatedPlan: planMeta(planId).label,
          monthlyAmount,
          expiryDate: expiryDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        }),
      }).catch(() => {});

      await loadData();
      closeModal();
      showToast(`Activated ${planMeta(planId).label} for ${modalRequest.email}`);
    } catch (err: any) {
      showToast('Approval failed: ' + err.message, 'error');
    } finally {
      setBusyUser(null);
    }
  };

  const openReject = (req: ActivationRequest) => {
    setRejectNotes('');
    setModalRequest(req);
    setModal('reject');
  };

  const confirmReject = async () => {
    if (!modalRequest) return;
    setBusyUser(modalRequest.id);
    try {
      const { error } = await supabase.from('activation_requests')
        .update({
          status: 'rejected',
          admin_notes: rejectNotes,
          updated_at: new Date().toISOString(),
        })
        .eq('id', modalRequest.id);
      if (error) throw error;
      await loadData();
      closeModal();
      showToast(`Request rejected for ${modalRequest.email}`);
    } catch (err: any) {
      showToast('Error: ' + err.message, 'error');
    } finally {
      setBusyUser(null);
    }
  };

  // ── Plan editing ──
  const openEditPlan = (plan: PlanDef) => {
    setEditPlanForm({
      ...plan,
      featuresText: plan.features.join('\n'),
      notIncludedText: plan.not_included.join('\n'),
    });
    setModal('editPlan');
  };

  const savePlan = async () => {
    if (!editPlanForm.id) return;
    setBusyUser('plan_' + editPlanForm.id);
    try {
      const features = (editPlanForm.featuresText ?? '').split('\n').map(s => s.trim()).filter(Boolean);
      const notIncluded = (editPlanForm.notIncludedText ?? '').split('\n').map(s => s.trim()).filter(Boolean);
      const { error } = await supabase.from('plans').update({
        name: editPlanForm.name,
        monthly_price: parseInt(String(editPlanForm.monthly_price ?? 0)) || 0,
        description: editPlanForm.description ?? '',
        features,
        not_included: notIncluded,
        is_active: editPlanForm.is_active ?? true,
        updated_at: new Date().toISOString(),
      }).eq('id', editPlanForm.id);
      if (error) throw error;
      await loadData();
      closeModal();
      showToast(`Plan "${editPlanForm.name}" updated`);
    } catch (err: any) {
      showToast('Error: ' + err.message, 'error');
    } finally {
      setBusyUser(null);
    }
  };

  const filteredUsers = users.filter(u => u.email.toLowerCase().includes(search.toLowerCase()));

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

  const isPaidPlan = (editForm.plan_id === 'silver' || editForm.plan_id === 'gold' || editForm.plan_id === 'platinum');

  return (
    <div className="min-h-screen bg-slate-950">
      {toast && <Toast msg={toast.msg} type={toast.type} />}

      {/* Header */}
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
        <div className="flex gap-2 mb-8 flex-wrap">
          {([
            { id: 'dashboard' as const, label: 'Dashboard', icon: TrendingUp },
            { id: 'users' as const, label: `Users${users.length ? ` (${users.length})` : ''}`, icon: Users },
            { id: 'activations' as const, label: `Activations${stats.pendingCount ? ` (${stats.pendingCount})` : ''}`, icon: Mail, badge: stats.pendingCount },
            { id: 'plans' as const, label: 'Plans', icon: CreditCard },
          ]).map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`relative flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                tab === t.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-gray-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 border border-white/10'
              }`}>
              <t.icon className="w-4 h-4" />{t.label}
              {t.badge ? <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-500 text-white text-xs font-bold rounded-full flex items-center justify-center">{t.badge}</span> : null}
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
              <StatCard label="Pending Activations" value={loading ? '—' : stats.pendingCount} sub="awaiting review" icon={Mail} gradient="from-amber-600 to-orange-500" />
              <StatCard label="Total Calculations" value={loading ? '—' : stats.totalCalcs.toLocaleString('en-IN')} sub="across all users" icon={Activity} gradient="from-purple-600 to-pink-500" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Platinum" value={loading ? '—' : stats.platinum} sub={`@ ${fmtRupees(PLAN_PRICES.platinum)}/mo`} icon={Crown} gradient="from-amber-600 to-orange-500" />
              <StatCard label="Gold" value={loading ? '—' : stats.gold} sub={`@ ${fmtRupees(PLAN_PRICES.gold)}/mo`} icon={Star} gradient="from-yellow-600 to-amber-500" />
              <StatCard label="Silver" value={loading ? '—' : stats.silver} sub={`@ ${fmtRupees(PLAN_PRICES.silver)}/mo`} icon={Zap} gradient="from-blue-700 to-cyan-600" />
              <StatCard label="Free Trial" value={loading ? '—' : stats.freeTrial} sub="potential conversions" icon={Gift} gradient="from-emerald-600 to-teal-500" />
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
                        <PlanBadge planId={planId} />
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
              <div className="bg-slate-900 border border-white/8 rounded-2xl overflow-hidden overflow-x-auto">
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
                      const subExpired = isExpired(ov?.subscription_expires_at ?? null);
                      const trialExp = isExpired(ov?.trial_expires_at ?? null);
                      const dl = planId === 'free' ? daysLeft(ov?.trial_expires_at ?? null) : daysLeft(ov?.subscription_expires_at ?? null);

                      return (
                        <>
                          <tr key={u.user_id} className={`border-b border-white/5 transition-colors ${isExpanded ? 'bg-slate-800/30' : 'hover:bg-white/[0.02]'}`}>
                            <td className="px-5 py-4">
                              <p className="text-white text-sm font-medium">{u.email}</p>
                              <div className="flex items-center gap-2 mt-0.5">
                                {u.email_confirmed_at ? (
                                  <span className="text-xs text-emerald-400 flex items-center gap-1"><CheckCircle className="w-3 h-3" />Verified</span>
                                ) : (
                                  <span className="text-xs text-amber-400 flex items-center gap-1"><Clock className="w-3 h-3" />Unverified</span>
                                )}
                                {ov?.notes && <span className="text-xs text-gray-600 flex items-center gap-0.5"><FileText className="w-3 h-3" />Note</span>}
                                {!ov?.setup_completed_at && <span className="text-xs text-orange-400">Setup pending</span>}
                              </div>
                            </td>
                            <td className="px-5 py-4 text-sm text-gray-500 hidden md:table-cell">{fmt(u.created_at)}</td>
                            <td className="px-5 py-4 text-sm text-gray-500 hidden lg:table-cell">{fmt(u.last_sign_in_at)}</td>
                            <td className="px-5 py-4">
                              <PlanBadge planId={planId} />
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
                            <td className="px-5 py-4 hidden xl:table-cell">
                              <div className="flex items-center gap-1.5">
                                <span className="text-sm font-semibold text-white">{ov?.calc_used ?? 0}</span>
                                {planId === 'free' && (
                                  <span className="text-xs text-gray-600">/ {ov?.trial_calc_limit ?? 5}</span>
                                )}
                              </div>
                              {planId === 'free' && (
                                <div className="w-16 h-1 bg-slate-700 rounded-full mt-1">
                                  <div className="h-1 bg-blue-500 rounded-full transition-all" style={{ width: `${Math.min(100, ((ov?.calc_used ?? 0) / (ov?.trial_calc_limit ?? 5)) * 100)}%` }} />
                                </div>
                              )}
                            </td>
                            <td className="px-5 py-4">
                              <div className="flex items-center justify-end gap-0.5">
                                <IconBtn icon={CreditCard} label="Edit Plan" onClick={() => openEdit(u)} color="blue" />
                                <IconBtn icon={IndianRupee} label="Set Amount" onClick={() => openAmount(u)} color="amber" />
                                <IconBtn icon={FileText} label="Admin Notes" onClick={() => openNotes(u)} />
                                <IconBtn icon={RotateCcw} label="Reset Calc Count" onClick={() => resetCalcUsed(u)} color="emerald" disabled={busyUser === u.user_id || !ov?.id} />
                                <IconBtn icon={Mail} label="Send Password Reset" onClick={() => sendReset(u)} disabled={busyUser === u.user_id + '_reset'} spin={busyUser === u.user_id + '_reset'} />
                                <IconBtn icon={isExpanded ? EyeOff : Eye} label={isExpanded ? 'Collapse' : 'View Details'} onClick={() => setExpandedUser(isExpanded ? null : u.user_id)} />
                                <IconBtn icon={Ban} label="Revoke Access" onClick={() => openDelete(u)} danger />
                              </div>
                            </td>
                          </tr>

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
                                    { label: 'Full Name', value: ov?.full_name || '—' },
                                    { label: 'Phone', value: ov?.phone || '—' },
                                    { label: 'Setup Done', value: fmt(ov?.setup_completed_at ?? null) },
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

        {/* ── Activations Tab ── */}
        {tab === 'activations' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Activation Requests</h2>
              {stats.pendingCount > 0 && (
                <span className="bg-rose-500/15 text-rose-300 border border-rose-500/25 px-3 py-1 rounded-full text-xs font-semibold">
                  {stats.pendingCount} pending
                </span>
              )}
            </div>

            {loading ? (
              <div className="bg-slate-900 border border-white/8 rounded-2xl p-12 text-center">
                <RefreshCw className="w-8 h-8 text-blue-400 animate-spin mx-auto mb-3" />
                <p className="text-gray-500">Loading requests...</p>
              </div>
            ) : activationRequests.length === 0 ? (
              <div className="bg-slate-900 border border-white/8 rounded-2xl p-12 text-center">
                <Mail className="w-10 h-10 text-gray-700 mx-auto mb-3" />
                <p className="text-gray-500">No activation requests yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {activationRequests.map(req => {
                  const m = planMeta(req.requested_plan_id);
                  const Icon = m.icon;
                  const isPending = req.status === 'pending';
                  const isApproved = req.status === 'approved';
                  const isRejected = req.status === 'rejected';

                  return (
                    <div key={req.id} className={`bg-slate-900 border rounded-2xl p-5 ${
                      isPending ? 'border-amber-500/25' : isApproved ? 'border-emerald-500/20' : 'border-rose-500/20'
                    }`}>
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Icon className={`w-5 h-5 ${m.color}`} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-white font-semibold text-sm">{req.full_name || req.email}</p>
                              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${m.color} ${m.bg}`}>
                                {m.label}
                              </span>
                              {isPending && <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">Pending</span>}
                              {isApproved && <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">Approved</span>}
                              {isRejected && <span className="text-xs font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-full">Rejected</span>}
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              <span>{req.email}</span>
                              <span>·</span>
                              <span>{req.phone || 'No phone'}</span>
                              <span>·</span>
                              <span>{fmt(req.created_at)}</span>
                              {req.reminder_count > 0 && <span className="text-amber-400">· Reminder sent</span>}
                            </div>
                            {req.admin_notes && <p className="text-xs text-gray-500 mt-2">Admin: {req.admin_notes}</p>}
                            {isApproved && req.activated_plan_id && (
                              <p className="text-xs text-emerald-400 mt-2">
                                Activated: {planMeta(req.activated_plan_id).label} · {fmtRupees(req.monthly_amount ?? 0)}/mo · Exp {fmt(req.subscription_expires_at, true)}
                              </p>
                            )}
                          </div>
                        </div>

                        {isPending && (
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                              onClick={() => openApprove(req)}
                              disabled={busyUser === req.id}
                              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Approve
                            </button>
                            <button
                              onClick={() => openReject(req)}
                              disabled={busyUser === req.id}
                              className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50"
                            >
                              <X className="w-4 h-4" />
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── Plans Tab ── */}
        {tab === 'plans' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Plan Management</h2>
              <p className="text-gray-500 text-sm">Edit plan names, prices, and features</p>
            </div>

            {loading ? (
              <div className="bg-slate-900 border border-white/8 rounded-2xl p-12 text-center">
                <RefreshCw className="w-8 h-8 text-blue-400 animate-spin mx-auto mb-3" />
                <p className="text-gray-500">Loading plans...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-4">
                {plans.filter(p => p.id !== 'free').map(plan => {
                  const m = planMeta(plan.id);
                  const Icon = m.icon;
                  return (
                    <div key={plan.id} className="bg-slate-900 border border-white/8 rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Icon className={`w-5 h-5 ${m.color}`} />
                          <span className={`text-sm font-bold uppercase tracking-wider ${m.color}`}>{plan.name}</span>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${plan.is_active ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-gray-500/10 text-gray-500 border border-gray-500/20'}`}>
                          {plan.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-white">₹{plan.monthly_price.toLocaleString()}</span>
                        <span className="text-gray-400 text-sm">/mo</span>
                      </div>
                      <p className="text-gray-400 text-xs mb-4 leading-relaxed">{plan.description}</p>
                      <div className="space-y-1 mb-4">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Features ({plan.features.length})</p>
                        {plan.features.slice(0, 4).map((f: string) => (
                          <div key={f} className="flex items-start gap-1.5 text-xs text-gray-400">
                            <CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0 text-emerald-400" />
                            {f}
                          </div>
                        ))}
                        {plan.features.length > 4 && <p className="text-xs text-gray-600 pl-4">+{plan.features.length - 4} more</p>}
                      </div>
                      <button
                        onClick={() => openEditPlan(plan)}
                        className="w-full py-2.5 bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold rounded-lg transition-colors border border-white/10"
                      >
                        Edit Plan
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ═══ MODALS ═══ */}

      {/* Edit Plan Modal */}
      {modal === 'edit' && modalUser && (
        <Modal title={`Edit Plan — ${modalUser.email}`} onClose={closeModal}>
          <div className="space-y-4">
            <div>
              <FieldLabel>Plan</FieldLabel>
              <Select value={editForm.plan_id ?? 'free'} onChange={(e: any) => {
                const p = e.target.value;
                setEditForm(f => ({ ...f, plan_id: p, monthly_amount_input: String(PLAN_PRICES[p] ?? 0) }));
              }}>
                <option value="free">Free Trial</option>
                <option value="silver">Silver — ₹{PLAN_PRICES.silver}/mo</option>
                <option value="gold">Gold — ₹{PLAN_PRICES.gold}/mo</option>
                <option value="platinum">Platinum — ₹{PLAN_PRICES.platinum}/mo</option>
              </Select>
            </div>

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
                    {editForm.plan_id === 'platinum' ? <Crown className="w-3.5 h-3.5" /> : editForm.plan_id === 'gold' ? <Star className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5" />}
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

            <div>
              <FieldLabel>Admin Notes</FieldLabel>
              <textarea value={editForm.notes ?? ''} onChange={(e: any) => setEditForm(f => ({ ...f, notes: e.target.value }))}
                placeholder="Reason for override, payment reference, etc..."
                rows={2}
                className="w-full px-3 py-2.5 bg-slate-800 border border-white/10 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors resize-none" />
            </div>

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

      {/* Notes Modal */}
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

      {/* Amount Modal */}
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

      {/* Revoke Access Modal */}
      {modal === 'delete' && modalUser && (
        <Modal title="Revoke Access" onClose={closeModal}>
          <div className="space-y-5">
            <div className="flex items-start gap-3 p-4 bg-rose-500/10 border border-rose-500/25 rounded-xl">
              <Ban className="w-5 h-5 text-rose-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-rose-300 font-semibold text-sm mb-1">This will revoke all access for this user.</p>
                <p className="text-rose-400/70 text-xs">The user account will remain but their trial will be marked expired and their calc limit set to zero. The user will be blocked from all tools.</p>
              </div>
            </div>
            <div className="bg-slate-800 rounded-xl px-4 py-3">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">User</p>
              <p className="text-white font-semibold">{modalUser.email}</p>
            </div>
            <div className="flex items-center justify-between">
              <button onClick={closeModal} className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-white/10 rounded-xl transition-colors">Cancel</button>
              <button onClick={confirmDelete} disabled={!!busyUser}
                className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50">
                <Ban className="w-4 h-4" />Revoke Access
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Approve Activation Modal */}
      {modal === 'approve' && modalRequest && (
        <Modal title={`Approve Activation — ${modalRequest.email}`} onClose={closeModal}>
          <div className="space-y-4">
            <div className="bg-slate-800 rounded-xl p-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Name</span><span className="text-white">{modalRequest.full_name || '—'}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Email</span><span className="text-white">{modalRequest.email}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Phone</span><span className="text-white">{modalRequest.phone || '—'}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Requested</span><span className="text-white">{planMeta(modalRequest.requested_plan_id).label}</span></div>
            </div>

            <div>
              <FieldLabel>Activate Plan</FieldLabel>
              <Select value={approveForm.planId} onChange={(e: any) => {
                const p = e.target.value;
                setApproveForm(f => ({ ...f, planId: p, monthlyAmount: String(PLAN_PRICES[p] ?? 0) }));
              }}>
                <option value="silver">Silver — ₹{PLAN_PRICES.silver}/mo</option>
                <option value="gold">Gold — ₹{PLAN_PRICES.gold}/mo</option>
                <option value="platinum">Platinum — ₹{PLAN_PRICES.platinum}/mo</option>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <FieldLabel>Subscription Expiry</FieldLabel>
                <Input type="date" value={approveForm.expiryDate} onChange={(e: any) => setApproveForm(f => ({ ...f, expiryDate: e.target.value }))} />
                <p className="text-xs text-gray-600 mt-1">Auto-renews monthly</p>
              </div>
              <div>
                <FieldLabel>Monthly Amount (₹)</FieldLabel>
                <Input type="number" value={approveForm.monthlyAmount} onChange={(e: any) => setApproveForm(f => ({ ...f, monthlyAmount: e.target.value }))} min={0} />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button onClick={closeModal} className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-white/10 rounded-xl transition-colors">Cancel</button>
              <button onClick={confirmApprove} disabled={!!busyUser}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50">
                <CheckCircle className="w-4 h-4" />
                {busyUser ? 'Activating…' : 'Approve & Activate'}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Reject Activation Modal */}
      {modal === 'reject' && modalRequest && (
        <Modal title={`Reject Request — ${modalRequest.email}`} onClose={closeModal}>
          <div className="space-y-4">
            <p className="text-gray-400 text-sm">Add a note explaining why this request is being rejected. The user will be able to submit a new request.</p>
            <textarea value={rejectNotes} onChange={e => setRejectNotes(e.target.value)}
              placeholder="Reason for rejection..."
              rows={4}
              className="w-full px-3 py-2.5 bg-slate-800 border border-white/10 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors resize-none" />
            <div className="flex items-center justify-between">
              <button onClick={closeModal} className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-white/10 rounded-xl transition-colors">Cancel</button>
              <button onClick={confirmReject} disabled={!!busyUser}
                className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50">
                <X className="w-4 h-4" />
                Reject Request
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit Plan Definition Modal */}
      {modal === 'editPlan' && editPlanForm.id && (
        <Modal title={`Edit Plan — ${editPlanForm.name}`} onClose={closeModal}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FieldLabel>Plan Name</FieldLabel>
                <Input value={editPlanForm.name ?? ''} onChange={(e: any) => setEditPlanForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <FieldLabel>Monthly Price (₹)</FieldLabel>
                <Input type="number" value={String(editPlanForm.monthly_price ?? 0)} onChange={(e: any) => setEditPlanForm(f => ({ ...f, monthly_price: parseInt(e.target.value) || 0 }))} min={0} />
              </div>
            </div>
            <div>
              <FieldLabel>Description</FieldLabel>
              <textarea value={editPlanForm.description ?? ''} onChange={(e: any) => setEditPlanForm(f => ({ ...f, description: e.target.value }))} rows={2}
                className="w-full px-3 py-2.5 bg-slate-800 border border-white/10 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors resize-none" />
            </div>
            <div>
              <FieldLabel>Features (one per line)</FieldLabel>
              <textarea value={editPlanForm.featuresText ?? ''} onChange={(e: any) => setEditPlanForm(f => ({ ...f, featuresText: e.target.value }))} rows={6}
                className="w-full px-3 py-2.5 bg-slate-800 border border-white/10 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors resize-none font-mono" />
            </div>
            <div>
              <FieldLabel>Not Included (one per line)</FieldLabel>
              <textarea value={editPlanForm.notIncludedText ?? ''} onChange={(e: any) => setEditPlanForm(f => ({ ...f, notIncludedText: e.target.value }))} rows={4}
                className="w-full px-3 py-2.5 bg-slate-800 border border-white/10 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors resize-none font-mono" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="planActive" checked={editPlanForm.is_active ?? true} onChange={(e) => setEditPlanForm(f => ({ ...f, is_active: e.target.checked }))}
                className="w-4 h-4 rounded bg-slate-800 border-white/20 text-blue-600 focus:ring-blue-500" />
              <label htmlFor="planActive" className="text-sm text-gray-300">Plan is active (visible to users)</label>
            </div>
            <div className="flex items-center justify-between pt-2">
              <button onClick={closeModal} className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-white/10 rounded-xl transition-colors">Cancel</button>
              <button onClick={savePlan} disabled={busyUser === 'plan_' + editPlanForm.id}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50">
                <Save className="w-4 h-4" />
                {busyUser === 'plan_' + editPlanForm.id ? 'Saving…' : 'Save Plan'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
