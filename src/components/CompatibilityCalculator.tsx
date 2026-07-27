import { useState } from 'react';
import { ArrowLeft, Heart, Calendar, User } from 'lucide-react';
import * as numerology from '../utils/numerology';
import { usePlanContext } from '../contexts/PlanContext';

interface CompatibilityCalculatorProps {
  onNavigate: (page: string) => void;
  onShowUpgrade: () => void;
}

export default function CompatibilityCalculator({ onNavigate, onShowUpgrade }: CompatibilityCalculatorProps) {
  const [person1Name, setPerson1Name] = useState('');
  const [person1Date, setPerson1Date] = useState('');
  const [person2Name, setPerson2Name] = useState('');
  const [person2Date, setPerson2Date] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { planId, trialActive, calcUsed, trialCalcLimit, incrementCalcUsed } = usePlanContext();

  const canCalculate = planId !== 'free' || trialActive;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!canCalculate) {
      onShowUpgrade();
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const birth1 = new Date(person1Date);
      const birth2 = new Date(person2Date);

      const person1 = {
        name: person1Name,
        lifePath: numerology.calculateLifePath(birth1),
        expression: numerology.calculateExpression(person1Name),
        soulUrge: numerology.calculateSoulUrge(person1Name)
      };

      const person2 = {
        name: person2Name,
        lifePath: numerology.calculateLifePath(birth2),
        expression: numerology.calculateExpression(person2Name),
        soulUrge: numerology.calculateSoulUrge(person2Name)
      };

      const compatibility = numerology.calculateCompatibility(person1, person2);

      setResult({
        person1,
        person2,
        compatibility
      });

      incrementCalcUsed();
      setLoading(false);
    }, 800);
  };

  const remaining = planId !== 'free' ? -1 : Math.max(0, trialCalcLimit - calcUsed);
  const isFormValid = person1Name && person1Date && person2Name && person2Date;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-6 md:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 md:mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-slate-700/50 shadow-xl">
          <div className="text-center mb-6 md:mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 mb-4">
              <Heart className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Compatibility Calculator
            </h2>
            <p className="text-sm md:text-base text-slate-400">
              Discover the harmony between two individuals
            </p>
            {remaining >= 0 && (
              <p className="text-amber-400 mt-2 text-sm">
                {remaining} free calculation{remaining !== 1 ? 's' : ''} remaining
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-4">
                <h3 className="text-lg md:text-xl font-semibold text-white flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Person 1
                </h3>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={person1Name}
                    onChange={(e) => setPerson1Name(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                    placeholder="John Smith"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Birth Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="date"
                      value={person1Date}
                      onChange={(e) => setPerson1Date(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Person 2
                </h3>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={person2Name}
                    onChange={(e) => setPerson2Name(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                    placeholder="Jane Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Birth Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="date"
                      value={person2Date}
                      onChange={(e) => setPerson2Date(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!isFormValid || loading}
              className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-lg hover:from-rose-600 hover:to-pink-700 transition-all duration-200 shadow-lg shadow-rose-500/50 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Calculating...
                </span>
              ) : (
                'Calculate Compatibility'
              )}
            </button>
          </form>

          {result && (
            <div className="mt-8 space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 mb-4 shadow-xl">
                  <div className="text-4xl font-bold text-white">{result.compatibility.score}%</div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Compatibility Score</h3>
                <p className="text-slate-400">
                  {result.compatibility.score >= 75 ? 'Excellent harmony!' :
                   result.compatibility.score >= 50 ? 'Good compatibility with growth potential' :
                   result.compatibility.score >= 25 ? 'Moderate compatibility with challenges' :
                   'Different paths requiring mutual understanding'}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700/50">
                  <h4 className="text-lg font-semibold text-white mb-4">{result.person1.name}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Life Path:</span>
                      <span className="text-amber-400 font-semibold">{result.person1.lifePath}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Expression:</span>
                      <span className="text-amber-400 font-semibold">{result.person1.expression}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Soul Urge:</span>
                      <span className="text-amber-400 font-semibold">{result.person1.soulUrge}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700/50">
                  <h4 className="text-lg font-semibold text-white mb-4">{result.person2.name}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Life Path:</span>
                      <span className="text-amber-400 font-semibold">{result.person2.lifePath}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Expression:</span>
                      <span className="text-amber-400 font-semibold">{result.person2.expression}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Soul Urge:</span>
                      <span className="text-amber-400 font-semibold">{result.person2.soulUrge}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {(['lifePath', 'expression', 'soulUrge'] as const).map((key, i) => {
                  const pair = result.compatibility[key];
                  const label = key === 'lifePath' ? 'Life Path' : key === 'expression' ? 'Expression' : 'Soul Urge';
                  const weightPct = Math.round((key === 'lifePath' ? 0.4 : 0.3) * 100);
                  const labelColor =
                    pair.label === 'Perfect' ? 'text-emerald-400' :
                    pair.label === 'Friendly' ? 'text-sky-400' : 'text-slate-400';
                  const barColor =
                    pair.label === 'Perfect' ? 'bg-emerald-500' :
                    pair.label === 'Friendly' ? 'bg-sky-500' : 'bg-slate-500';
                  return (
                    <div key={i} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-300 font-medium">
                          {label} <span className="text-slate-500 text-sm">({weightPct}% weight)</span>
                        </span>
                        <span className={`font-semibold ${labelColor}`}>{pair.label}</span>
                      </div>
                      <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${barColor} rounded-full transition-all duration-500`}
                          style={{ width: `${Math.round(pair.score * 100)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
                <p className="text-slate-300 text-sm text-center pt-1">
                  Perfect = identical numbers · Friendly = naturally compatible · Neutral = needs conscious effort
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
