import { useState, useEffect } from 'react';
import { X, Mail, Lock, Hash, AlertCircle, Eye, EyeOff, CheckCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (page: string) => void;
  initialMode?: 'signin' | 'signup';
}

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
  bars: string[];
}

function getPasswordStrength(pw: string): PasswordStrength {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  if (score <= 1) return { score, label: 'Too weak', color: 'bg-rose-500', bars: ['bg-rose-500', 'bg-slate-700', 'bg-slate-700', 'bg-slate-700'] };
  if (score === 2) return { score, label: 'Weak', color: 'bg-orange-500', bars: ['bg-orange-500', 'bg-orange-500', 'bg-slate-700', 'bg-slate-700'] };
  if (score === 3) return { score, label: 'Fair', color: 'bg-amber-400', bars: ['bg-amber-400', 'bg-amber-400', 'bg-amber-400', 'bg-slate-700'] };
  return { score, label: 'Strong', color: 'bg-emerald-500', bars: ['bg-emerald-500', 'bg-emerald-500', 'bg-emerald-500', 'bg-emerald-500'] };
}

function isPasswordAcceptable(pw: string): boolean {
  return pw.length >= 8 && /[A-Z]/.test(pw) && /[0-9]/.test(pw);
}

export default function AuthModal({ isOpen, onClose, onNavigate, initialMode = 'signup' }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (isOpen) setMode(initialMode);
  }, [isOpen, initialMode]);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { signIn, signUp } = useAuth();

  if (!isOpen) return null;

  const reset = () => {
    setEmail('');
    setPassword('');
    setError('');
    setSuccess('');
    setShowPassword(false);
  };

  const switchMode = (m: 'signin' | 'signup') => {
    setMode(m);
    reset();
  };

  const pwStrength = mode === 'signup' ? getPasswordStrength(password) : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (mode === 'signup' && !isPasswordAcceptable(password)) {
      setError('Password must be at least 8 characters and include an uppercase letter and a number.');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'signup') {
        const { error } = await signUp(email, password);
        if (error) {
          setError(error.message);
        } else {
          setSuccess('Account created! Complete setup to start your 3-day free trial.');
          setTimeout(() => {
            onClose();
            reset();
          }, 1500);
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          setError(error.message);
        } else {
          onClose();
          reset();
        }
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const navTo = (page: string) => {
    if (onNavigate) {
      onClose();
      reset();
      onNavigate(page);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) { onClose(); reset(); } }}
    >
      <div className="bg-slate-900 border border-white/10 rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-cyan-500" />

        <div className="p-8">
          <button
            onClick={() => { onClose(); reset(); }}
            className="absolute top-5 right-5 text-slate-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/25">
              <Hash className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              {mode === 'signup' ? 'Create your account' : 'Welcome back'}
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              {mode === 'signup' ? '3-day free trial · No credit card required' : 'Sign in to NumberTeller'}
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex bg-slate-800 rounded-xl p-1 mb-6">
            <button
              onClick={() => switchMode('signup')}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${mode === 'signup' ? 'bg-white text-slate-900 shadow' : 'text-gray-400 hover:text-white'}`}
            >
              Sign Up
            </button>
            <button
              onClick={() => switchMode('signin')}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${mode === 'signin' ? 'bg-white text-slate-900 shadow' : 'text-gray-400 hover:text-white'}`}
            >
              Sign In
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                  className="w-full pl-10 pr-11 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all text-sm"
                  placeholder={mode === 'signup' ? 'Min. 8 chars, 1 uppercase, 1 number' : 'Your password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password strength meter (signup only) */}
              {mode === 'signup' && password.length > 0 && pwStrength && (
                <div className="mt-2 space-y-1.5">
                  <div className="flex gap-1">
                    {pwStrength.bars.map((bar, i) => (
                      <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${bar}`} />
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className={`w-3 h-3 ${pwStrength.score >= 4 ? 'text-emerald-400' : 'text-gray-500'}`} />
                    <span className={`text-xs font-medium ${pwStrength.score >= 4 ? 'text-emerald-400' : pwStrength.score >= 3 ? 'text-amber-400' : 'text-rose-400'}`}>
                      {pwStrength.label}
                    </span>
                    <span className="text-xs text-gray-500">— Must include uppercase letter and number</span>
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="flex items-start gap-2.5 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl">
                <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-rose-300">{error}</p>
              </div>
            )}

            {success && (
              <div className="flex items-start gap-2.5 p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-emerald-300">{success}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Please wait...
                </span>
              ) : mode === 'signup' ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          {mode === 'signup' && (
            <p className="text-center text-xs text-gray-500 mt-5 leading-relaxed">
              By creating an account you agree to our{' '}
              {onNavigate ? (
                <button onClick={() => navTo('terms')} className="text-gray-400 hover:text-white transition-colors underline decoration-dotted">Terms of Use</button>
              ) : (
                <span className="text-gray-400 underline decoration-dotted">Terms of Use</span>
              )}
              {' '}and{' '}
              {onNavigate ? (
                <button onClick={() => navTo('privacy')} className="text-gray-400 hover:text-white transition-colors underline decoration-dotted">Privacy Policy</button>
              ) : (
                <span className="text-gray-400 underline decoration-dotted">Privacy Policy</span>
              )}.
            </p>
          )}

          {mode === 'signup' && (
            <div className="mt-6 p-4 bg-slate-800/60 border border-white/8 rounded-xl">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Free Trial Includes</p>
              <div className="grid grid-cols-2 gap-2">
                {['3 days free', 'Unlimited calculations', 'All calculators', 'No card needed'].map(f => (
                  <div key={f} className="flex items-center gap-1.5 text-xs text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
