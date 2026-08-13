import { useState } from 'react';
import { Calendar, User, ArrowLeft, CircleUser as UserCircle } from 'lucide-react';
import * as numerology from '../utils/numerology';
import { calculateEssenceForAge } from '../utils/transitCalculations';
import { usePlanContext } from '../contexts/PlanContext';
import { calculateLoShuGrid } from '../utils/loShuGrid';

interface CalculatorFormProps {
  onNavigate: (page: string) => void;
  onCalculate: (results: any) => void;
  onShowUpgrade: () => void;
}

export default function CalculatorForm({ onNavigate, onCalculate, onShowUpgrade }: CalculatorFormProps) {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear().toString());
  const [loading, setLoading] = useState(false);
  const { planId, trialActive } = usePlanContext();

  const canCalculate = planId !== 'free' || trialActive;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!canCalculate) {
      onShowUpgrade();
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const fullName = `${firstName} ${middleName} ${lastName}`.trim();
      const birth = new Date(birthDate);
      const year = parseInt(currentYear);

      const lifePath = numerology.calculateLifePath(birth);
      const expression = numerology.calculateExpressionFromParts(firstName, middleName, lastName);
      const soulUrge = numerology.calculateSoulUrgeFromParts(firstName, middleName, lastName);
      const personality = numerology.calculatePersonalityFromParts(firstName, middleName, lastName);
      const birthday = numerology.calculateBirthday(birth);
      const maturity = numerology.calculateMaturity(lifePath, expression);
      const attitude = numerology.calculateAttitude(birth);
      const rationalThought = numerology.calculateRationalThought(birth);
      const personalYear = numerology.calculatePersonalYear(birth, year);
      const universalYear = numerology.calculateUniversalYear(year);
      const karmicLessons = numerology.calculateKarmicLessons(fullName);
      const modifiedKarmicLessons = numerology.calculateModifiedKarmicLessons(
        karmicLessons,
        [lifePath, expression, soulUrge, personality, birthday]
      );
      const periodCycles = numerology.calculatePeriodCycles(birth, lifePath);
      const pinnacles = numerology.calculatePinnacles(birth, lifePath);
      const challenges = numerology.calculateChallenges(birth, lifePath);
      const currentAge = year - birth.getFullYear();
      const essence = calculateEssenceForAge(fullName, currentAge);
      const primeIntensifier = numerology.calculatePrimeIntensifier(fullName);
      const rulingPlanet = numerology.getRulingPlanet(lifePath);
      const harmonyNumbers = numerology.getHarmonyNumbers(lifePath);
      const favourableColours = numerology.getFavourableColours(lifePath);
      const firstLetter = numerology.getFirstLetter(fullName);
      const firstVowel = numerology.getFirstVowel(fullName);
      const zodiac = numerology.getZodiacSign(birth);
      const loshuGrid = calculateLoShuGrid(fullName, birthDate, gender);

      const results = {
        fullName,
        birthDate: birth,
        gender,
        currentYear: year,
        coreNumbers: {
          lifePath,
          expression,
          soulUrge,
          personality,
          birthday,
          maturity,
          attitude,
          rationalThought
        },
        cycles: {
          personalYear,
          universalYear,
          periodCycles,
          pinnacles,
          challenges,
          essence
        },
        karmic: {
          lessons: modifiedKarmicLessons,
          primeIntensifier
        },
        details: {
          rulingPlanet,
          harmonyNumbers,
          favourableColours,
          firstLetter,
          firstVowel,
          zodiac
        },
        loshuGrid
      };

      setLoading(false);
      onCalculate(results);
    }, 800);
  };

  const isFormValid = firstName && lastName && birthDate;

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
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Calculate Your Numerology Chart
            </h2>
            <p className="text-sm md:text-base text-slate-400">
              Enter your full birth name and date to unlock your numerology insights
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  First Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="John"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Middle Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="Michael"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Last Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="Smith"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Birth Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Gender *
                </label>
                <div className="relative">
                  <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                    className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                    required
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Current Year
                </label>
                <input
                  type="number"
                  value={currentYear}
                  onChange={(e) => setCurrentYear(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  min="2000"
                  max="2100"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!isFormValid || loading}
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-200 shadow-lg shadow-amber-500/50 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Calculating...
                </span>
              ) : (
                'Calculate My Numbers'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
