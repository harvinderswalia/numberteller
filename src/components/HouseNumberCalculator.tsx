import { useState } from 'react';
import { ArrowLeft, Home } from 'lucide-react';
import * as numerology from '../utils/numerology';
import { HOUSE_NUMBER_INTERPRETATIONS } from '../data/interpretations';
import { canPerformCalculation } from '../utils/subscription';

interface HouseNumberCalculatorProps {
  onNavigate: (page: string) => void;
  onShowUpgrade: () => void;
}

export default function HouseNumberCalculator({ onNavigate, onShowUpgrade }: HouseNumberCalculatorProps) {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canPerformCalculation()) {
      onShowUpgrade();
      return;
    }
    const reduced = numerology.calculateHouseNumber(number);
    setResult(reduced);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-6 md:py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 md:mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-slate-700/50 shadow-xl">
          <div className="text-center mb-6 md:mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 mb-4">
              <Home className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              House / Mobile / Bank Number
            </h2>
            <p className="text-sm md:text-base text-slate-400">
              Discover the energetic influence of any number
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Enter Number (House, Phone, Bank Account, etc.)
              </label>
              <input
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-center text-2xl font-mono"
                placeholder="123, 555-1234, etc."
                required
              />
              <p className="text-xs text-slate-500 mt-2 text-center">
                Letters and special characters will be ignored
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg shadow-emerald-500/50 hover:shadow-xl"
            >
              Calculate
            </button>
          </form>

          {result !== null && (
            <div className="mt-8 space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 mb-4 shadow-xl">
                  <div className="text-5xl font-bold text-white">{result}</div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Ruling Number</h3>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700/50">
                <h4 className="text-lg font-semibold text-emerald-400 mb-3">Energy & Influence</h4>
                <p className="text-slate-300 leading-relaxed">
                  {HOUSE_NUMBER_INTERPRETATIONS[result]}
                </p>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700/50">
                <h4 className="text-lg font-semibold text-white mb-3">Additional Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Ruling Planet:</span>
                    <span className="text-white font-semibold">
                      {numerology.getRulingPlanet(result)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Harmony Numbers:</span>
                    <span className="text-white font-semibold">
                      {numerology.getHarmonyNumbers(result).join(', ')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Favourable Colours:</span>
                    <div className="flex flex-wrap gap-2 justify-end">
                      {numerology.getFavourableColours(result).map((color, i) => (
                        <span key={i} className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs">
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/20 rounded-lg p-6 border border-blue-500/30">
                <h4 className="text-lg font-semibold text-blue-400 mb-2">Compatibility Check</h4>
                <p className="text-slate-300 text-sm">
                  This number is most compatible with Life Path numbers{' '}
                  <span className="font-semibold text-white">
                    {result}, {numerology.getHarmonyNumbers(result).join(', ')}
                  </span>
                  . If your Life Path matches one of these, this number will support and enhance your energy.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
