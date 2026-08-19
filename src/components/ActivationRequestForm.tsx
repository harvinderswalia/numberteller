import { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight, Sparkles, AlertCircle, Phone, User, MessageCircle, Clock, Zap, Star, Crown, Home, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { PLANS, WHATSAPP_LINK, PlanId } from '../utils/subscription';

interface ActivationRequestFormProps {
  onNavigate: (page: string) => void;
}

interface ExistingRequest {
  id: string;
  status: string;
  requested_plan_id: string;
  reminder_count: number;
  created_at: string;
}

export default function ActivationRequestForm({ onNavigate }: ActivationRequestFormProps) {
  const { user, signOut } = useAuth();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('silver');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [existingRequest, setExistingRequest] = useState<ExistingRequest | null>(null);
  const [reminderSent, setReminderSent] = useState(false);

  useEffect(() => {
    if (!user) return;

    (async () => {
      // Load profile info from plan override
      const { data: override } = await supabase
        .from('user_plan_overrides')
        .select('full_name, phone, email')
        .eq('user_auth_id', user.id)
        .maybeSingle();

      if (override) {
        setFullName(override.full_name ?? '');
        setPhone(override.phone ?? '');
        setEmail(override.email ?? user.email ?? '');
      } else {
        setEmail(user.email ?? '');
      }

      // Check for existing activation request
      const { data: req } = await supabase
        .from('activation_requests')
        .select('id, status, requested_plan_id, reminder_count, created_at')
        .eq('user_auth_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (req) {
        setExistingRequest(req as ExistingRequest);
      }
    })();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (fullName.trim().length < 2) {
      setError('Please enter your full name.');
      return;
    }

    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 7) {
      setError('Please enter a valid phone number.');
      return;
    }

    setLoading(true);
    try {
      const { error: insertError } = await supabase
        .from('activation_requests')
        .insert({
          user_auth_id: user!.id,
          email: email.trim(),
          full_name: fullName.trim(),
          phone: phone.trim(),
          requested_plan_id: selectedPlan,
          status: 'pending',
        });

      if (insertError) throw insertError;

      // Call the email edge function to notify admin
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`;
      await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          type: 'activation_request',
          userEmail: email.trim(),
          userName: fullName.trim(),
          phone: phone.trim(),
          requestedPlan: selectedPlan,
        }),
      }).catch(() => {/* email is best-effort */});

      setSuccess(true);
    } catch {
      setError('Failed to submit request. Please try again or contact us via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendReminder = async () => {
    if (!existingRequest || existingRequest.reminder_count >= 1) return;
    setLoading(true);
    try {
      await supabase
        .from('activation_requests')
        .update({ reminder_count: 1, updated_at: new Date().toISOString() })
        .eq('id', existingRequest.id);

      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`;
      await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          type: 'reminder',
          userEmail: email,
          userName: fullName,
          requestId: existingRequest.id,
        }),
      }).catch(() => {});

      setReminderSent(true);
      setExistingRequest({ ...existingRequest, reminder_count: 1 });
    } catch {
      setError('Failed to send reminder. Please try WhatsApp instead.');
    } finally {
      setLoading(false);
    }
  };

  const planIcons: Record<string, React.ElementType> = { silver: Zap, gold: Star, platinum: Crown };

  const handleSignOut = async () => {
    await signOut();
    onNavigate('home');
  };

  const ExitActions = () => (
    <div className="flex items-center justify-center gap-3 mb-8">
      <button
        onClick={() => onNavigate('home')}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white border border-white/10 hover:border-white/25 rounded-xl transition-colors"
      >
        <Home className="w-4 h-4" />
        Back to website
      </button>
      <button
        onClick={() => { void handleSignOut(); }}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-400 hover:text-white border border-white/10 hover:border-white/25 rounded-xl transition-colors"
      >
        <LogOut className="w-4 h-4" />
        Sign out
      </button>
    </div>
  );

  // ─── Success state ──────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <ExitActions />
          <div className="w-16 h-16 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Request Submitted!</h1>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            We've received your activation request for the <span className="text-blue-300 font-semibold capitalize">{selectedPlan}</span> plan.
            Our team will review it and activate your subscription shortly. You'll receive an email confirmation once it's ready.
          </p>

          <div className="bg-slate-900 border border-white/10 rounded-2xl p-5 mb-6 text-left">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">What happens next?</p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500/15 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-blue-400">1</span>
                </div>
                <p className="text-sm text-gray-300">Our team reviews your request</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500/15 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-blue-400">2</span>
                </div>
                <p className="text-sm text-gray-300">You receive an activation email</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500/15 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-blue-400">3</span>
                </div>
                <p className="text-sm text-gray-300">Your plan is active — start using all tools</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-xl transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Message us on WhatsApp
            </a>
            <p className="text-xs text-gray-500">You can return to the website or sign out while your request is reviewed.</p>
          </div>
        </div>
      </div>
    );
  }

  // ─── Existing pending request state ──────────────────────────────────────────
  if (existingRequest && existingRequest.status === 'pending') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <ExitActions />
          <div className="w-16 h-16 bg-amber-500/15 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Clock className="w-8 h-8 text-amber-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Request Under Review</h1>
          <p className="text-gray-400 text-sm mb-2">
            You've already submitted a request for the <span className="text-blue-300 font-semibold capitalize">{existingRequest.requested_plan_id}</span> plan.
          </p>
          <p className="text-gray-600 text-xs mb-8">
            Submitted on {new Date(existingRequest.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
          </p>

          <div className="bg-slate-900 border border-white/10 rounded-2xl p-5 mb-6 text-left">
            <p className="text-sm text-gray-300 mb-4">While you wait, you can:</p>
            <div className="space-y-3">
              {!reminderSent && existingRequest.reminder_count === 0 ? (
                <button
                  onClick={handleSendReminder}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send a Reminder (1 available)'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex items-center gap-2 text-sm text-gray-500 p-3 bg-slate-800/50 rounded-xl">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  Reminder already sent
                </div>
              )}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-xl transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Contact us on WhatsApp
              </a>
            </div>
          </div>

          <p className="text-xs text-gray-500">You can return to the website or sign out while your request is reviewed.</p>
        </div>
      </div>
    );
  }

  // ─── Form state ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <ExitActions />
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Activate Your Plan</h1>
          <p className="text-gray-400">Choose a plan and request activation to unlock all features.</p>
        </div>

        {/* Plan comparison */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">1. Choose your plan</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {Object.values(PLANS).map((plan) => {
              const Icon = planIcons[plan.id];
              const isSelected = selectedPlan === plan.id;
              return (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`text-left rounded-2xl p-5 border-2 transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/15'
                      : 'border-white/10 bg-slate-900 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-400' : 'text-gray-500'}`} />
                    <span className={`text-sm font-semibold uppercase tracking-wider ${isSelected ? 'text-blue-300' : 'text-gray-400'}`}>
                      {plan.name}
                    </span>
                  </div>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-2xl font-bold text-white">₹{plan.monthlyPrice.toLocaleString()}</span>
                    <span className="text-gray-500 text-xs mb-1">/mo</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3 leading-relaxed">{plan.description}</p>
                  <div className="space-y-1">
                    {plan.features.slice(0, 4).map((f) => (
                      <div key={f} className="flex items-start gap-1.5 text-xs text-gray-400">
                        <CheckCircle className={`w-3 h-3 mt-0.5 flex-shrink-0 ${isSelected ? 'text-blue-400' : 'text-gray-600'}`} />
                        {f}
                      </div>
                    ))}
                    {plan.features.length > 4 && (
                      <p className="text-xs text-gray-600 pl-4">+{plan.features.length - 4} more</p>
                    )}
                  </div>
                  {isSelected && (
                    <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-blue-400">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Selected
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Contact form */}
        <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-cyan-500" />
          <div className="p-8">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">2. Confirm your details</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Email address</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all text-sm"
                  />
                </div>
              </div>

              {/* Full name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Full name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all text-sm"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Phone number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="+91 7900075531"
                    className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all text-sm"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-2.5 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl">
                  <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-rose-300">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? 'Submitting...' : `Request ${PLANS[selectedPlan].name} Plan Activation`}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* WhatsApp contact */}
            <div className="mt-6 pt-6 border-t border-white/5">
              <p className="text-center text-sm text-gray-500 mb-3">Prefer to talk to us directly?</p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] font-semibold rounded-xl transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp: +91 7900075531
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
