import { useState } from 'react';
import { ArrowLeft, Calculator } from 'lucide-react';
import { canPerformCalculation } from '../utils/subscription';

interface LoShuGridCalculatorProps {
  onNavigate: (page: string) => void;
  onCalculate: (data: { name: string; dateOfBirth: string; gender: string }) => void;
  onShowUpgrade: () => void;
}

export default function LoShuGridCalculator({ onNavigate, onCalculate, onShowUpgrade }: LoShuGridCalculatorProps) {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('male');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canPerformCalculation()) {
      onShowUpgrade();
      return;
    }
    if (name && dateOfBirth) {
      onCalculate({ name, dateOfBirth, gender });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <button
          onClick={() => onNavigate('home')}
          className="mb-6 flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full mb-4">
              <Calculator className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Lo Shu Grid Calculator</h1>
            <p className="text-sm md:text-base text-slate-400 px-4">
              Discover your life patterns through ancient Chinese numerology
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-lg md:text-xl font-semibold text-white mb-3">About Lo Shu Grid</h2>
              <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                The Lo Shu Grid is an ancient Chinese numerological system based on a 3x3 magic square.
                It reveals your personality traits, strengths, weaknesses, and life path by analyzing
                the numbers in your date of birth. Each number represents specific energies and characteristics
                that influence different aspects of your life.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Gender
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setGender('male')}
                    className={`px-4 py-3 rounded-lg font-medium transition-all ${
                      gender === 'male'
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                        : 'bg-slate-900 text-slate-400 border border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('female')}
                    className={`px-4 py-3 rounded-lg font-medium transition-all ${
                      gender === 'female'
                        ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white'
                        : 'bg-slate-900 text-slate-400 border border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Calculate Lo Shu Grid
              </button>
            </form>

            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <h3 className="text-sm font-semibold text-blue-400 mb-2">What You'll Discover:</h3>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Your personal Lo Shu Grid pattern</li>
                <li>• Analysis of all 9 planes of existence</li>
                <li>• Present and missing arrows in your chart</li>
                <li>• Strengths and areas for improvement</li>
                <li>• Personalized remedies and recommendations</li>
                <li>• Favorable directions and colors</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
