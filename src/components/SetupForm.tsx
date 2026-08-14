import { useState } from 'react';
import { User, Phone, ArrowRight, Hash, Sparkles, AlertCircle, Home, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePlanContext } from '../contexts/PlanContext';


interface SetupFormProps {
  onComplete: () => void;
  onNavigate: (page: string) => void;
}

export default function SetupForm({ onComplete, onNavigate }: SetupFormProps) {
  const { user, signOut } = useAuth();
  const { completeSetup } = usePlanContext();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      await completeSetup(fullName.trim(), phone.trim());
      onComplete();
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Top-right exit buttons */}
        <div className="flex items-center justify-end gap-2 mb-4">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-all"
          >
            <Home className="w-3.5 h-3.5" />
            Home
          </button>
          <button
            onClick={() => { signOut(); onNavigate('home'); }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/25">
            <Hash className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome to NumberTeller</h1>
          <p className="text-gray-400 text-sm mt-1">Let's set up your account to get started</p>
        </div>

        <div className="bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-cyan-500" />

          <div className="p-8">
            {/* Info banner */}
            <div className="bg-blue-500/10 border border-blue-500/25 rounded-xl px-4 py-3 mb-6 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div>
                <p className="text-blue-300 font-semibold text-sm">
                  Complete setup to request plan activation
                </p>
                <p className="text-gray-400 text-xs mt-0.5">
                  Choose your plan after setup · Full access once activated
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email (pre-filled, read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Email address</label>
                <div className="relative">
                  <input
                    type="email"
                    value={user?.email ?? ''}
                    readOnly
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-gray-400 text-sm cursor-not-allowed"
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
                    autoFocus
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
                <p className="text-xs text-gray-500 mt-1.5">Used for account verification and plan activation support</p>
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
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Setting up...
                  </span>
                ) : (
                  <>
                    Continue to Plan Activation
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
