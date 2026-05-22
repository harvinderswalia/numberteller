import { useState, useEffect, useCallback } from 'react';
import { Shield, Users, TrendingUp, Calendar, Search, RefreshCw, Mail, ChevronDown, ChevronUp, Hash, LogOut, AlertCircle, CheckCircle, Clock, Crown, Zap, Gift, CreditCard as Edit3, X, Save } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

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
}

interface Stats {
  total: number;
  freeTrial: number;
  calculator: number;
  expert: number;
  noTrial: number;
}

type AdminTab = 'dashboard' | 'users';

export default function SuperAdminPortal() {
  const { user, signOut } = useAuth();
  const [tab, setTab] = useState<AdminTab>('dashboard');
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [overrides, setOverrides] = useState<PlanOverride[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<PlanOverride>>({});
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const [resetLoading, setResetLoading] = useState<string | null>(null);
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data: usersData, error: usersError } = await supabase.rpc('get_all_users_for_admin');
      if (usersError) throw usersError;

      const { data: overridesData, error: overridesError } = await supabase
        .from('user_plan_overrides')
        .select('*');
      if (overridesError) throw overridesError;

      setUsers(usersData || []);
      setOverrides(overridesData || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.email === SUPER_ADMIN_EMAIL) {
      loadData();
    }
  }, [user, loadData]);

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-10 max-w-sm w-full text-center">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-5">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-gray-400 text-sm">You must be signed in to access this area.</p>
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
          <p className="text-gray-400 text-sm">You do not have permission to access the admin portal.</p>
          <button
            onClick={signOut}
            className="mt-6 flex items-center gap-2 mx-auto px-4 py-2 text-sm text-gray-400 hover:text-white border border-white/10 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>
    );
  }

  const getOverride = (userId: string) => overrides.find(o => o.user_auth_id === userId);

  const getPlanLabel = (userId: string): { label: string; color: string; icon: React.ReactNode } => {
    const override = getOverride(userId);
    if (!override || override.plan_id === 'free') {
      return { label: 'Free Trial', color: 'text-emerald-400', icon: <Gift className="w-3.5 h-3.5" /> };
    }
    if (override.plan_id === 'calculator') {
      return { label: 'Calculator', color: 'text-blue-400', icon: <Zap className="w-3.5 h-3.5" /> };
    }
    if (override.plan_id === 'expert') {
      return { label: 'Expert', color: 'text-amber-400', icon: <Crown className="w-3.5 h-3.5" /> };
    }
    return { label: 'Free', color: 'text-gray-400', icon: null };
  };

  const computeStats = (): Stats => {
    const total = users.length;
    let calculator = 0, expert = 0, freeTrial = 0, noTrial = 0;
    for (const u of users) {
      const override = getOverride(u.user_id);
      if (override?.plan_id === 'calculator') calculator++;
      else if (override?.plan_id === 'expert') expert++;
      else freeTrial++;
    }
    return { total, calculator, expert, freeTrial, noTrial };
  };

  const stats = computeStats();

  const filteredUsers = users.filter(u =>
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const startEdit = (u: AdminUser) => {
    const existing = getOverride(u.user_id);
    setEditingUser(u.user_id);
    setEditForm({
      user_auth_id: u.user_id,
      email: u.email,
      plan_id: existing?.plan_id ?? 'free',
      trial_expires_at: existing?.trial_expires_at ? existing.trial_expires_at.split('T')[0] : '',
      trial_calc_limit: existing?.trial_calc_limit ?? null,
      subscription_expires_at: existing?.subscription_expires_at ? existing.subscription_expires_at.split('T')[0] : '',
      notes: existing?.notes ?? '',
    });
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setEditForm({});
  };

  const saveEdit = async () => {
    if (!editForm.user_auth_id || !editForm.email) return;
    setSaving(true);
    try {
      const existing = getOverride(editForm.user_auth_id);
      const payload = {
        user_auth_id: editForm.user_auth_id,
        email: editForm.email,
        plan_id: editForm.plan_id ?? 'free',
        trial_expires_at: editForm.trial_expires_at || null,
        trial_calc_limit: editForm.trial_calc_limit ?? null,
        subscription_expires_at: editForm.subscription_expires_at || null,
        notes: editForm.notes ?? '',
        updated_at: new Date().toISOString(),
        updated_by: user.email ?? '',
      };

      if (existing?.id) {
        const { error } = await supabase
          .from('user_plan_overrides')
          .update(payload)
          .eq('id', existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('user_plan_overrides')
          .insert(payload);
        if (error) throw error;
      }

      await loadData();
      cancelEdit();
      showToast('Plan updated successfully');
    } catch (err: any) {
      showToast('Error: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const sendPasswordReset = async (email: string) => {
    setResetLoading(email);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}`,
      });
      if (error) throw error;
      showToast(`Password reset email sent to ${email}`);
    } catch (err: any) {
      showToast('Error: ' + err.message);
    } finally {
      setResetLoading(null);
    }
  };

  const fmt = (dt: string | null) => {
    if (!dt) return '—';
    return new Date(dt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-slate-800 border border-white/10 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          {toast}
        </div>
      )}

      {/* Header */}
      <header className="bg-slate-900 border-b border-white/10 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
              <Hash className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold">NumberTeller</span>
                <span className="text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full">Super Admin</span>
              </div>
              <p className="text-gray-500 text-xs">{user.email}</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white border border-white/10 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {([
            { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
            { id: 'users', label: 'Users', icon: Users },
          ] as const).map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                tab === t.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-gray-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 border border-white/10'
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
          <button
            onClick={loadData}
            className="ml-auto flex items-center gap-2 px-4 py-2.5 text-sm text-gray-400 hover:text-white border border-white/10 rounded-xl transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {error && (
          <div className="flex items-start gap-2.5 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl mb-6">
            <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
            <p className="text-rose-300 text-sm">{error}</p>
          </div>
        )}

        {/* ── Dashboard Tab ── */}
        {tab === 'dashboard' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Overview</h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Users', val: stats.total, icon: Users, color: 'from-blue-600 to-blue-500', sub: 'registered accounts' },
                { label: 'Free Trial', val: stats.freeTrial, icon: Gift, color: 'from-emerald-600 to-teal-600', sub: 'active or expired trials' },
                { label: 'Calculator Plan', val: stats.calculator, icon: Zap, color: 'from-blue-700 to-cyan-600', sub: 'paid subscribers' },
                { label: 'Expert Plan', val: stats.expert, icon: Crown, color: 'from-amber-600 to-orange-500', sub: 'paid subscribers' },
              ].map(s => (
                <div key={s.label} className="bg-slate-900 border border-white/10 rounded-2xl p-6">
                  <div className={`w-10 h-10 bg-gradient-to-br ${s.color} rounded-xl flex items-center justify-center mb-4`}>
                    <s.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{loading ? '—' : s.val}</div>
                  <div className="text-sm font-semibold text-gray-300">{s.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Recent signups */}
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-bold mb-4">Recent Signups</h3>
              {loading ? (
                <p className="text-gray-500 text-sm">Loading...</p>
              ) : (
                <div className="space-y-2">
                  {users.slice(0, 10).map(u => {
                    const plan = getPlanLabel(u.user_id);
                    return (
                      <div key={u.user_id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                        <div>
                          <p className="text-white text-sm font-medium">{u.email}</p>
                          <p className="text-gray-500 text-xs">Joined {fmt(u.created_at)}</p>
                        </div>
                        <div className={`flex items-center gap-1.5 text-xs font-semibold ${plan.color}`}>
                          {plan.icon}
                          {plan.label}
                        </div>
                      </div>
                    );
                  })}
                  {users.length === 0 && (
                    <p className="text-gray-500 text-sm">No users yet.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Users Tab ── */}
        {tab === 'users' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-white">All Users</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search by email..."
                  className="pl-9 pr-4 py-2.5 bg-slate-800 border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 w-72"
                />
              </div>
            </div>

            {loading ? (
              <div className="bg-slate-900 border border-white/10 rounded-2xl p-10 text-center">
                <RefreshCw className="w-8 h-8 text-blue-400 animate-spin mx-auto mb-3" />
                <p className="text-gray-400">Loading users...</p>
              </div>
            ) : (
              <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10 bg-slate-800/50">
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">User</th>
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Joined</th>
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Last Login</th>
                      <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Plan</th>
                      <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(u => {
                      const plan = getPlanLabel(u.user_id);
                      const override = getOverride(u.user_id);
                      const isExpanded = expandedUser === u.user_id;
                      const isEditing = editingUser === u.user_id;

                      return (
                        <>
                          <tr
                            key={u.user_id}
                            className="border-b border-white/5 hover:bg-white/2 transition-colors"
                          >
                            <td className="px-5 py-4">
                              <p className="text-white text-sm font-medium">{u.email}</p>
                              {u.email_confirmed_at ? (
                                <span className="text-xs text-emerald-400 flex items-center gap-1 mt-0.5">
                                  <CheckCircle className="w-3 h-3" /> Verified
                                </span>
                              ) : (
                                <span className="text-xs text-amber-400 flex items-center gap-1 mt-0.5">
                                  <Clock className="w-3 h-3" /> Unverified
                                </span>
                              )}
                            </td>
                            <td className="px-5 py-4 text-sm text-gray-400 hidden md:table-cell">{fmt(u.created_at)}</td>
                            <td className="px-5 py-4 text-sm text-gray-400 hidden lg:table-cell">{fmt(u.last_sign_in_at)}</td>
                            <td className="px-5 py-4">
                              <div className={`flex items-center gap-1.5 text-xs font-semibold ${plan.color}`}>
                                {plan.icon}
                                {plan.label}
                              </div>
                              {override?.subscription_expires_at && (
                                <p className="text-xs text-gray-500 mt-0.5">Exp: {fmt(override.subscription_expires_at)}</p>
                              )}
                            </td>
                            <td className="px-5 py-4">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => setExpandedUser(isExpanded ? null : u.user_id)}
                                  className="p-1.5 text-gray-500 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                                  title="View details"
                                >
                                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </button>
                                <button
                                  onClick={() => startEdit(u)}
                                  className="p-1.5 text-blue-400 hover:text-blue-300 transition-colors rounded-lg hover:bg-blue-500/10"
                                  title="Edit plan"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => sendPasswordReset(u.email)}
                                  disabled={resetLoading === u.email}
                                  className="p-1.5 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5 disabled:opacity-50"
                                  title="Send password reset"
                                >
                                  {resetLoading === u.email ? (
                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <Mail className="w-4 h-4" />
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>

                          {/* Expanded row — details */}
                          {isExpanded && !isEditing && (
                            <tr className="bg-slate-800/30 border-b border-white/5">
                              <td colSpan={5} className="px-5 py-4">
                                <div className="grid sm:grid-cols-3 gap-4 text-sm">
                                  <div>
                                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">User ID</p>
                                    <p className="text-gray-300 font-mono text-xs">{u.user_id}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Trial Expires</p>
                                    <p className="text-gray-300">{fmt(override?.trial_expires_at ?? null)}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Calc Limit Override</p>
                                    <p className="text-gray-300">{override?.trial_calc_limit ?? 'Default (5)'}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Calcs Used (DB)</p>
                                    <p className="text-gray-300">{(override as any)?.calc_used ?? 0}</p>
                                  </div>
                                  {override?.notes && (
                                    <div className="sm:col-span-3">
                                      <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Admin Notes</p>
                                      <p className="text-gray-300">{override.notes}</p>
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )}

                          {/* Edit row */}
                          {isEditing && (
                            <tr className="bg-slate-800/50 border-b border-white/5">
                              <td colSpan={5} className="px-5 py-5">
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                                  <div>
                                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Plan</label>
                                    <select
                                      value={editForm.plan_id ?? 'free'}
                                      onChange={e => setEditForm(f => ({ ...f, plan_id: e.target.value }))}
                                      className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                                    >
                                      <option value="free">Free Trial</option>
                                      <option value="calculator">Calculator (₹999/mo)</option>
                                      <option value="expert">Expert (₹1,499/mo)</option>
                                    </select>
                                  </div>

                                  <div>
                                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Trial Expires</label>
                                    <input
                                      type="date"
                                      value={editForm.trial_expires_at?.split('T')[0] ?? ''}
                                      onChange={e => setEditForm(f => ({ ...f, trial_expires_at: e.target.value }))}
                                      className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Trial Calc Limit (blank = default 5)</label>
                                    <input
                                      type="number"
                                      value={editForm.trial_calc_limit ?? ''}
                                      onChange={e => setEditForm(f => ({ ...f, trial_calc_limit: e.target.value ? parseInt(e.target.value) : null }))}
                                      placeholder="5"
                                      min={0}
                                      max={9999}
                                      className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Subscription Expires</label>
                                    <input
                                      type="date"
                                      value={editForm.subscription_expires_at?.split('T')[0] ?? ''}
                                      onChange={e => setEditForm(f => ({ ...f, subscription_expires_at: e.target.value }))}
                                      className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                                    />
                                  </div>

                                  <div className="sm:col-span-2">
                                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Admin Notes</label>
                                    <input
                                      type="text"
                                      value={editForm.notes ?? ''}
                                      onChange={e => setEditForm(f => ({ ...f, notes: e.target.value }))}
                                      placeholder="Optional notes..."
                                      className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                                    />
                                  </div>
                                </div>

                                <div className="flex items-center gap-3">
                                  <button
                                    onClick={saveEdit}
                                    disabled={saving}
                                    className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-semibold rounded-xl hover:from-blue-500 hover:to-cyan-500 transition-all disabled:opacity-50"
                                  >
                                    <Save className="w-4 h-4" />
                                    {saving ? 'Saving...' : 'Save Changes'}
                                  </button>
                                  <button
                                    onClick={cancelEdit}
                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white border border-white/10 rounded-xl transition-colors"
                                  >
                                    <X className="w-4 h-4" /> Cancel
                                  </button>
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
                  <div className="text-center py-10 text-gray-500">
                    {search ? `No users matching "${search}"` : 'No users yet.'}
                  </div>
                )}

                <div className="px-5 py-3 border-t border-white/5 bg-slate-800/30">
                  <p className="text-xs text-gray-500">
                    {filteredUsers.length} of {users.length} users shown
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
