import React, { useState } from 'react';
import { Sparkles, TrendingUp, Heart, DollarSign, Activity, Brain, ArrowRight, Check, Calendar, ArrowLeft } from 'lucide-react';
import { analyzeNameCorrection, DESIRE_CATEGORIES, NameCorrectionResult } from '../utils/nameCorrection';
import { calculateHarmonyScore } from '../utils/numerology';
import { generatePersonalYearForecast } from '../utils/personalYearForecast';
import CoreChart from './CoreChart';

const CATEGORY_ICONS = {
  'Career Growth': TrendingUp,
  'Relationships/Harmony': Heart,
  'Wealth/Abundance': DollarSign,
  'Health/Wellness': Activity,
  'Spirituality/Growth': Brain,
};

interface NameCorrectionToolProps {
  onBack?: () => void;
}

const PERSONAL_YEAR_MEANINGS: Record<number, { title: string; description: string }> = {
  1: { title: 'New Beginnings', description: 'Fresh starts, leadership opportunities, independence, taking initiative' },
  2: { title: 'Partnership & Patience', description: 'Cooperation, relationships, diplomacy, building alliances, patience required' },
  3: { title: 'Creative Expression', description: 'Self-expression, communication, socializing, joy, artistic pursuits' },
  4: { title: 'Foundation Building', description: 'Hard work, stability, organization, practical matters, laying groundwork' },
  5: { title: 'Change & Freedom', description: 'Adventure, travel, change, variety, freedom from routine, adaptability' },
  6: { title: 'Responsibility & Service', description: 'Family, home, nurturing, service to others, domestic matters' },
  7: { title: 'Introspection & Growth', description: 'Spiritual growth, contemplation, analysis, inner wisdom, solitude' },
  8: { title: 'Power & Achievement', description: 'Material success, business growth, recognition, financial gains, authority' },
  9: { title: 'Completion & Wisdom', description: 'Endings, letting go, humanitarian efforts, wisdom, preparing for new cycle' },
};

export default function NameCorrectionTool({ onBack }: NameCorrectionToolProps) {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [desireCategory, setDesireCategory] = useState('Career Growth');
  const [result, setResult] = useState<NameCorrectionResult | null>(null);

  const fullName = [firstName, middleName, lastName].filter(Boolean).join(' ');

  const handleDateChange = (value: string) => {
    const cleaned = value.replace(/[^0-9]/g, '');
    let formatted = cleaned;

    if (cleaned.length >= 2) {
      formatted = cleaned.substring(0, 2);
      if (cleaned.length >= 3) {
        formatted += '/' + cleaned.substring(2, 4);
        if (cleaned.length >= 5) {
          formatted += '/' + cleaned.substring(4, 8);
        }
      }
    }

    setBirthDate(formatted);
  };

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !birthDate) return;

    const analysisResult = analyzeNameCorrection(fullName, birthDate, desireCategory);
    setResult(analysisResult);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {onBack && (
          <div className="mb-6">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </button>
          </div>
        )}

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Name Correction Tool</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Optimize your name's vibration to align with your life goals using Pythagorean numerology
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <form onSubmit={handleAnalyze} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g., John"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Middle Name
                </label>
                <input
                  type="text"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  placeholder="e.g., Michael"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="e.g., Doe"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Birth Date
              </label>
              <input
                type="text"
                value={birthDate}
                onChange={(e) => handleDateChange(e.target.value)}
                placeholder="DD/MM/YYYY"
                maxLength={10}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Life Goal
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {Object.keys(DESIRE_CATEGORIES).map((category) => {
                  const Icon = CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS];
                  const isSelected = desireCategory === category;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setDesireCategory(category)}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`} />
                      <span className={`text-sm font-medium ${isSelected ? 'text-blue-900' : 'text-gray-700'}`}>
                        {category}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all"
            >
              Analyze & Get Name Suggestions
            </button>
          </form>
        </div>

        {result && (
          <div className="space-y-8">
            <CoreChart
              lifePath={result.current.lifePath}
              expression={result.current.expression}
              soulUrge={result.current.soulUrge}
              personalYear={result.current.personalYear}
              birthDate={birthDate}
              harmony={result.current.coreHarmony}
            />

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Name Analysis</h2>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 mb-6 border-2 border-gray-200">
                <div className="mb-4 pb-4 border-b border-gray-300">
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-sm font-semibold text-gray-600 mb-2">Name</div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 w-16">First:</span>
                          <span className="text-lg font-bold text-gray-900">{firstName}</span>
                        </div>
                        {middleName && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 w-16">Middle:</span>
                            <span className="text-lg font-bold text-gray-900">{middleName}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 w-16">Last:</span>
                          <span className="text-lg font-bold text-gray-900">{lastName}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-600 mb-1">Birth Date (BD)</div>
                      <div className="text-xl font-bold text-gray-900">{birthDate}</div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{result.current.analysis}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-700 mb-1">Expression</div>
                  <div className="text-2xl font-bold text-blue-900">{result.current.expression}</div>
                  <div className="text-xs text-blue-600 mt-1">{result.current.expressionMeaning}</div>
                </div>

                <div className="text-center p-4 bg-pink-50 rounded-lg">
                  <div className="text-sm text-pink-700 mb-1">Soul Urge</div>
                  <div className="text-2xl font-bold text-pink-900">{result.current.soulUrge}</div>
                  <div className="text-xs text-pink-600 mt-1">{result.current.soulUrgeMeaning}</div>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-sm text-green-700 mb-1">Goal</div>
                  <div className="text-xs text-green-600 mt-1">{desireCategory}</div>
                </div>

                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-sm text-orange-700 mb-1">Improvement</div>
                  <div className="text-xs text-orange-600 mt-1">Up to {result.improvementScore}%</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Personal Year Forecast</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(result.personalYears).map(([year, py]) => {
                  const meaning = PERSONAL_YEAR_MEANINGS[py];
                  const isCurrentYear = parseInt(year) === new Date().getFullYear();
                  const essence = result.essenceNumbers[parseInt(year)];
                  const essenceNum = typeof essence === 'string' ? parseInt(essence.split('/').pop() || '0') : essence;
                  const exprNum = typeof result.current.expression === 'string' ? parseInt(result.current.expression.split('/').pop() || '0') : result.current.expression;

                  // Calculate compatibility between EX and PY
                  const exPyCompatibility = calculateHarmonyScore(exprNum, py);
                  // Calculate compatibility between Essence and PY
                  const essencePyCompatibility = calculateHarmonyScore(essenceNum, py);

                  const lpNum = typeof result.current.lifePath === 'string' ? parseInt(result.current.lifePath.split('/').pop() || '0') : result.current.lifePath;
                  const suNum = typeof result.current.soulUrge === 'string' ? parseInt(result.current.soulUrge.split('/').pop() || '0') : result.current.soulUrge;

                  const potentialResults = generatePersonalYearForecast(
                    lpNum,
                    exprNum,
                    suNum,
                    essenceNum,
                    py,
                    desireCategory
                  );

                  return (
                    <div
                      key={year}
                      className={`p-5 rounded-xl border-2 ${
                        isCurrentYear
                          ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300'
                          : 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`text-sm font-semibold ${isCurrentYear ? 'text-blue-700' : 'text-orange-700'}`}>
                          {year}
                        </div>
                        {isCurrentYear && (
                          <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full font-semibold">
                            Current
                          </span>
                        )}
                      </div>
                      <div className={`text-3xl font-bold mb-2 ${isCurrentYear ? 'text-blue-900' : 'text-orange-900'}`}>
                        PY {py}
                      </div>
                      <div className={`text-sm font-semibold mb-1 ${isCurrentYear ? 'text-blue-800' : 'text-orange-800'}`}>
                        {meaning?.title}
                      </div>
                      <div className={`text-xs leading-relaxed mb-3 ${isCurrentYear ? 'text-blue-700' : 'text-orange-700'}`}>
                        {meaning?.description}
                      </div>

                      <div className={`border-t pt-2 space-y-1 mb-3 ${isCurrentYear ? 'border-blue-300' : 'border-orange-300'}`}>
                        <div className="flex items-center justify-between text-xs">
                          <span className={isCurrentYear ? 'text-blue-600' : 'text-orange-600'}>Essence:</span>
                          <span className={`font-bold ${isCurrentYear ? 'text-blue-900' : 'text-orange-900'}`}>{essence}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className={isCurrentYear ? 'text-blue-600' : 'text-orange-600'}>EX + PY:</span>
                          <span className={`font-semibold ${isCurrentYear ? 'text-blue-800' : 'text-orange-800'}`}>
                            {Math.round(exPyCompatibility * 100)}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className={isCurrentYear ? 'text-blue-600' : 'text-orange-600'}>ESS + PY:</span>
                          <span className={`font-semibold ${isCurrentYear ? 'text-blue-800' : 'text-orange-800'}`}>
                            {Math.round(essencePyCompatibility * 100)}%
                          </span>
                        </div>
                      </div>

                      <div className={`text-xs leading-relaxed p-3 rounded-lg ${isCurrentYear ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}`}>
                        <div className="font-semibold mb-1">Potential Results:</div>
                        {potentialResults}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {result.targets.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Target Cores</h2>

                <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                  <p className="text-sm text-blue-900">
                    <strong>Smart Filtering:</strong> Targets avoid problematic combinations like 1-9 (self-focus vs universal service),
                    8-9 (material vs spiritual), 4-5 (routine vs freedom), and numbers already in your core (BD/LP).
                    Essence conflicts with current year energies are also filtered out.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {result.targets.slice(0, 3).map((target, index) => {
                    const suggestedNames = result.suggestions.filter(
                      s => s.expression === target.expression && s.soulUrge === target.soulUrge
                    ).slice(0, 5);
                    // Keep full LP value (e.g., "11/2") for display
                    const lpDisplay = result.current.lifePath;
                    const lpNum = typeof result.current.lifePath === 'string' ? parseInt(result.current.lifePath.split('/').pop() || '0') : result.current.lifePath;

                    // Calculate BD
                    let bdNum = 0;
                    if (birthDate) {
                      const parts = birthDate.split('/');
                      if (parts.length === 3) {
                        const day = parseInt(parts[0], 10);
                        bdNum = day > 9 ? (Math.floor(day / 10) + (day % 10)) : day;
                        while (bdNum > 9) {
                          bdNum = Math.floor(bdNum / 10) + (bdNum % 10);
                        }
                      }
                    }

                    // Calculate current age
                    let age = 0;
                    if (birthDate) {
                      const parts = birthDate.split('/');
                      if (parts.length === 3) {
                        const birthYear = parseInt(parts[2], 10);
                        const currentYear = new Date().getFullYear();
                        age = currentYear - birthYear;
                      }
                    }

                    // Get current year essence
                    const currentYear = new Date().getFullYear();
                    const currentEssence = result.essenceNumbers[currentYear];
                    const essNum = typeof currentEssence === 'string' ? parseInt(currentEssence.split('/').pop() || '0') : currentEssence;

                    const targetEx = typeof target.expression === 'string' ? parseInt(target.expression.split('/').pop() || '0') : target.expression;
                    const targetSu = typeof target.soulUrge === 'string' ? parseInt(target.soulUrge.split('/').pop() || '0') : target.soulUrge;

                    // Age-based harmony calculation
                    const focusNumber = age <= 35 ? bdNum : lpNum;
                    const focusLabel = age <= 35 ? 'BD' : 'LP';

                    // Calculate harmonies with all core numbers
                    const bdExHarmony = calculateHarmonyScore(bdNum, targetEx);
                    const bdSuHarmony = calculateHarmonyScore(bdNum, targetSu);
                    const bdEssHarmony = calculateHarmonyScore(bdNum, essNum);

                    const lpExHarmony = calculateHarmonyScore(lpNum, targetEx);
                    const lpSuHarmony = calculateHarmonyScore(lpNum, targetSu);
                    const lpEssHarmony = calculateHarmonyScore(lpNum, essNum);

                    const exSuHarmony = calculateHarmonyScore(targetEx, targetSu);
                    const exEssHarmony = calculateHarmonyScore(targetEx, essNum);
                    const suEssHarmony = calculateHarmonyScore(targetSu, essNum);

                    // Overall togetherness calculation (age-based weighting)
                    let overallTogetherness;
                    if (age <= 35) {
                      // Focus on BD for ages 35 and below
                      overallTogetherness = (
                        (bdExHarmony * 0.25) +
                        (bdSuHarmony * 0.25) +
                        (bdEssHarmony * 0.15) +
                        (lpExHarmony * 0.1) +
                        (lpSuHarmony * 0.1) +
                        (exSuHarmony * 0.1) +
                        (exEssHarmony * 0.025) +
                        (suEssHarmony * 0.025)
                      );
                    } else {
                      // Focus on LP for ages 35+
                      overallTogetherness = (
                        (lpExHarmony * 0.25) +
                        (lpSuHarmony * 0.25) +
                        (lpEssHarmony * 0.15) +
                        (bdExHarmony * 0.05) +
                        (bdSuHarmony * 0.05) +
                        (exSuHarmony * 0.15) +
                        (exEssHarmony * 0.05) +
                        (suEssHarmony * 0.05)
                      );
                    }

                    return (
                      <div
                        key={index}
                        className={`border-2 rounded-xl p-6 hover:shadow-md transition-all ${
                          target.isPerfectCore
                            ? 'border-green-300 bg-green-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-semibold text-gray-500">Target {index + 1}</span>
                          {target.isPerfectCore ? (
                            <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                              Perfect Core
                            </span>
                          ) : target.harmonyWithLP >= 0.8 ? (
                            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                              Strong
                            </span>
                          ) : null}
                        </div>

                        <div className="space-y-3 mb-4">
                          <div>
                            <div className="text-xs text-gray-600">Expression</div>
                            <div className="text-3xl font-bold text-gray-900">{target.expression}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-600">Soul Urge</div>
                            <div className="text-3xl font-bold text-gray-900">{target.soulUrge}</div>
                          </div>
                        </div>

                        {suggestedNames.length > 0 ? (
                          <div className="mb-4 space-y-2">
                            <div className="text-xs text-blue-700 font-semibold mb-2">Suggested Name Spellings:</div>
                            {suggestedNames.map((suggestion, idx) => (
                              <div key={idx} className="p-2.5 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="text-sm font-bold text-blue-900 mb-1">{suggestion.name}</div>
                                <div className="text-xs text-blue-600">
                                  {suggestion.changes.join(', ')}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                            <div className="text-xs text-gray-600 italic">
                              No simple spelling variations found for this target. Consider using a nickname or middle name.
                            </div>
                          </div>
                        )}

                        <div className="mb-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                          <div className="flex items-center justify-between mb-3">
                            <div className="text-xs text-gray-700 font-semibold">New Core Preview</div>
                            <div className="text-xs text-gray-500">Age: {age}</div>
                          </div>

                          <div className="grid grid-cols-5 gap-2 mb-3 text-center">
                            <div>
                              <div className="text-xs text-gray-500">BD</div>
                              <div className="text-base font-bold text-gray-600">{bdNum}</div>
                            </div>
                            <div>
                              <div className="text-xs text-blue-600">LP</div>
                              <div className="text-sm font-bold text-blue-600">{lpDisplay}</div>
                            </div>
                            <div>
                              <div className="text-xs text-purple-600">EX</div>
                              <div className="text-base font-bold text-purple-600">{target.expression}</div>
                            </div>
                            <div>
                              <div className="text-xs text-pink-600">SU</div>
                              <div className="text-base font-bold text-pink-600">{target.soulUrge}</div>
                            </div>
                            <div>
                              <div className="text-xs text-amber-600">ESS</div>
                              <div className="text-sm font-bold text-amber-600">{currentEssence}</div>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-gray-300">
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-xs text-gray-600">
                                Togetherness (Focus: {focusLabel})
                              </div>
                              <div className="text-sm font-bold text-gray-900">
                                {Math.round(overallTogetherness * 100)}%
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all ${
                                  overallTogetherness >= 0.8
                                    ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                                    : overallTogetherness >= 0.6
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                                    : 'bg-gradient-to-r from-yellow-500 to-orange-600'
                                }`}
                                style={{ width: `${Math.round(overallTogetherness * 100)}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="text-xs text-gray-600 mb-3 p-3 bg-gray-50 rounded-lg">
                          {target.rationale}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">LP Harmony</span>
                            <span className="font-semibold text-gray-900">
                              {Math.round(target.harmonyWithLP * 100)}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">PY Harmony</span>
                            <span className="font-semibold text-gray-900">
                              {Math.round(target.pyHarmony * 100)}%
                            </span>
                          </div>
                          <div className="pt-2 border-t border-gray-200">
                            <div className="text-xs text-gray-600 mb-1">Overall Score</div>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    target.isPerfectCore
                                      ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                                      : 'bg-gradient-to-r from-blue-500 to-purple-600'
                                  }`}
                                  style={{ width: `${Math.min(target.score * 100, 100)}%` }}
                                />
                              </div>
                              <span className="text-sm font-semibold text-gray-700">
                                {Math.round(Math.min(target.score * 100, 100))}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {result.suggestions.length > 0 ? (
              <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl shadow-xl p-8 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-8 h-8" />
                  <h2 className="text-2xl font-bold">Suggested Name Variations</h2>
                </div>

                <div className="space-y-4">
                  {result.suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl font-bold">{suggestion.name}</span>
                            {suggestion.expression === suggestion.soulUrge &&
                             suggestion.expression === result.current.lifePath && (
                              <span className="bg-green-400 text-green-900 text-xs font-bold px-2 py-1 rounded-full">
                                PERFECT
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {suggestion.changes.map((change, i) => (
                              <span
                                key={i}
                                className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium"
                              >
                                {change}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <div className="text-center">
                            <div className="text-xs opacity-80">Expression</div>
                            <div className="text-2xl font-bold">{suggestion.expression}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs opacity-80">Soul Urge</div>
                            <div className="text-2xl font-bold">{suggestion.soulUrge}</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4" />
                          <span>Optimized for {desireCategory}</span>
                        </div>
                        <div className="text-sm font-semibold">
                          Core Alignment: {Math.round(suggestion.coreAlignment * 100)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-6 bg-white/10 backdrop-blur-sm rounded-xl">
                  <p className="text-sm leading-relaxed mb-3">
                    <strong>💡 Recommendation:</strong> Try using one of these name variations for 30 days.
                    Update your email signature, social media profiles, or introduce yourself with the new spelling
                    to align your vibration with your goals.
                  </p>
                  <p className="text-xs leading-relaxed opacity-90">
                    All suggestions maintain your name's pronunciation while optimizing numerological harmony.
                    Spelling changes respect your Birth Date foundation (Life Path {result.current.lifePath}) as
                    the unchanging guide, ensuring name changes amplify rather than conflict with your destined path.
                  </p>
                </div>
              </div>
            ) : result.targets.length > 0 ? (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center text-gray-600 mb-6">
                  <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No Simple Spelling Variations Found</h3>
                  <p className="text-sm">
                    While there are target numbers that could improve your alignment for {desireCategory.toLowerCase()},
                    we couldn't find minor spelling variations that achieve them while maintaining pronunciation.
                  </p>
                </div>
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                  <h4 className="font-semibold text-blue-900 mb-3">What You Can Do:</h4>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>Consider using a nickname or shortened version of your name</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>Add or use a middle name to shift your numerology</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>Your current core harmony is {Math.round(result.current.coreHarmony.overall * 100)}%, which may already serve you well</span>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="text-gray-500 mb-4">
                  <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-lg">
                    Your current name is already well-aligned with your goals!
                    No improvements needed at this time.
                  </p>
                </div>
              </div>
            )}

            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-amber-900 mb-3">Understanding Perfect Core Alignment</h3>
              <div className="space-y-2 text-sm text-amber-800">
                <p>
                  <strong>Life Path (BD Basis):</strong> Your unchangeable destiny driver derived from your birth date.
                  This is the foundation that all other numbers should harmonize with.
                </p>
                <p>
                  <strong>Expression Number:</strong> Your outer manifestation and how you express yourself to the world.
                  Ideally aligned with your Life Path.
                </p>
                <p>
                  <strong>Soul Urge Number:</strong> Your inner drive and what truly motivates you.
                  Should support your Life Path for internal-external harmony.
                </p>
                <p>
                  <strong>Personal Year:</strong> Your current yearly cycle energy. Name corrections consider harmony
                  with your upcoming Personal Years for optimal timing.
                </p>
                <p className="pt-2 border-t border-amber-300">
                  <strong>Perfect Core:</strong> When LP = EX = SU, you achieve ultimate synergy where purpose,
                  action, and motivation are completely aligned. The algorithm prioritizes targets that bring you
                  closer to this ideal state while respecting your chosen life goals.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
