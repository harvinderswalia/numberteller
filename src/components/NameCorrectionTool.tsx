import React, { useState } from 'react';
import { Sparkles, TrendingUp, Heart, DollarSign, Activity, Brain, Check, Calendar, ArrowLeft } from 'lucide-react';
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

  const inputClass = 'w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all text-sm';
  const labelClass = 'block text-sm font-semibold text-slate-300 mb-1.5';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        )}

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/20">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">AI Name Correction</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Optimise your name's vibration to align with your life goals using Pythagorean numerology
          </p>
        </div>

        {/* Form card */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-2xl p-6 md:p-8 mb-8">
          <form onSubmit={handleAnalyze} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>First Name *</label>
                <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}
                  placeholder="e.g., John" className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Middle Name</label>
                <input type="text" value={middleName} onChange={e => setMiddleName(e.target.value)}
                  placeholder="e.g., Michael" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Last Name *</label>
                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}
                  placeholder="e.g., Doe" className={inputClass} required />
              </div>
            </div>

            <div>
              <label className={labelClass}>Birth Date (DD/MM/YYYY)</label>
              <input type="text" value={birthDate} onChange={e => handleDateChange(e.target.value)}
                placeholder="DD/MM/YYYY" maxLength={10} className={inputClass} required />
            </div>

            <div>
              <label className={labelClass}>Life Goal</label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {Object.keys(DESIRE_CATEGORIES).map(category => {
                  const Icon = CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS];
                  const selected = desireCategory === category;
                  return (
                    <button key={category} type="button" onClick={() => setDesireCategory(category)}
                      className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${
                        selected
                          ? 'border-blue-500 bg-blue-500/10 shadow-md shadow-blue-500/10'
                          : 'border-slate-700 hover:border-slate-500 hover:bg-slate-700/30'
                      }`}>
                      <Icon className={`w-5 h-5 flex-shrink-0 ${selected ? 'text-blue-400' : 'text-slate-400'}`} />
                      <span className={`text-sm font-medium ${selected ? 'text-blue-300' : 'text-slate-300'}`}>{category}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white py-4 rounded-xl font-semibold shadow-lg shadow-blue-500/20 transition-all">
              Analyse &amp; Get Name Suggestions
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

            {/* Current name analysis */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-2xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Current Name Analysis</h2>

              <div className="bg-slate-900/60 rounded-xl p-6 mb-6 border border-slate-700/50">
                <div className="mb-4 pb-4 border-b border-slate-700">
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Name</div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500 w-14">First:</span>
                          <span className="text-lg font-bold text-white">{firstName}</span>
                        </div>
                        {middleName && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500 w-14">Middle:</span>
                            <span className="text-lg font-bold text-white">{middleName}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500 w-14">Last:</span>
                          <span className="text-lg font-bold text-white">{lastName}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Birth Date (BD)</div>
                      <div className="text-xl font-bold text-white">{birthDate}</div>
                    </div>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed">{result.current.analysis}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Expression', value: result.current.expression, meaning: result.current.expressionMeaning, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
                  { label: 'Soul Urge', value: result.current.soulUrge, meaning: result.current.soulUrgeMeaning, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' },
                  { label: 'Goal', value: null, meaning: desireCategory, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
                  { label: 'Improvement', value: null, meaning: `Up to ${result.improvementScore}%`, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
                ].map(card => (
                  <div key={card.label} className={`rounded-xl p-4 border text-center ${card.bg}`}>
                    <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${card.color}`}>{card.label}</div>
                    {card.value !== null && <div className={`text-2xl font-bold mb-1 ${card.color}`}>{card.value}</div>}
                    <div className="text-xs text-slate-400">{card.meaning}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Personal Year Forecast */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-teal-400" />
                <h2 className="text-2xl font-bold text-white">Personal Year Forecast</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(result.personalYears).map(([year, py]) => {
                  const meaning = PERSONAL_YEAR_MEANINGS[py];
                  const isCurrentYear = parseInt(year) === new Date().getFullYear();
                  const essence = result.essenceNumbers[parseInt(year)];
                  const essenceNum = typeof essence === 'string' ? parseInt(essence.split('/').pop() || '0') : essence;
                  const exprNum = typeof result.current.expression === 'string' ? parseInt(result.current.expression.split('/').pop() || '0') : result.current.expression;
                  const exPyCompatibility = calculateHarmonyScore(exprNum, py);
                  const essencePyCompatibility = calculateHarmonyScore(essenceNum, py);
                  const lpNum = typeof result.current.lifePath === 'string' ? parseInt(result.current.lifePath.split('/').pop() || '0') : result.current.lifePath;
                  const suNum = typeof result.current.soulUrge === 'string' ? parseInt(result.current.soulUrge.split('/').pop() || '0') : result.current.soulUrge;
                  const potentialResults = generatePersonalYearForecast(lpNum, exprNum, suNum, essenceNum, py, desireCategory);

                  return (
                    <div key={year}
                      className={`rounded-xl border p-5 ${isCurrentYear ? 'bg-blue-500/10 border-blue-500/30' : 'bg-slate-900/50 border-slate-700/50'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className={`text-sm font-semibold ${isCurrentYear ? 'text-blue-400' : 'text-slate-400'}`}>{year}</div>
                        {isCurrentYear && (
                          <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full font-semibold">Current</span>
                        )}
                      </div>
                      <div className={`text-3xl font-bold mb-1 ${isCurrentYear ? 'text-blue-300' : 'text-white'}`}>PY {py}</div>
                      <div className={`text-sm font-semibold mb-1 ${isCurrentYear ? 'text-blue-200' : 'text-slate-200'}`}>{meaning?.title}</div>
                      <div className={`text-xs leading-relaxed mb-3 ${isCurrentYear ? 'text-blue-300' : 'text-slate-400'}`}>{meaning?.description}</div>

                      <div className={`border-t pt-2 space-y-1 mb-3 ${isCurrentYear ? 'border-blue-500/30' : 'border-slate-700'}`}>
                        {[
                          { label: 'Essence', value: String(essence) },
                          { label: 'EX + PY', value: `${Math.round(exPyCompatibility * 100)}%` },
                          { label: 'ESS + PY', value: `${Math.round(essencePyCompatibility * 100)}%` },
                        ].map(row => (
                          <div key={row.label} className="flex items-center justify-between text-xs">
                            <span className="text-slate-500">{row.label}:</span>
                            <span className={`font-bold ${isCurrentYear ? 'text-blue-200' : 'text-white'}`}>{row.value}</span>
                          </div>
                        ))}
                      </div>

                      <div className={`text-xs leading-relaxed p-3 rounded-lg ${isCurrentYear ? 'bg-blue-500/10 text-blue-200' : 'bg-slate-800 text-slate-300'}`}>
                        <div className="font-semibold mb-1">Potential Results:</div>
                        {potentialResults}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Target Cores */}
            {result.targets.length > 0 && (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-2xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Recommended Target Cores</h2>

                <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                  <p className="text-sm text-blue-300">
                    <strong className="text-blue-200">Smart Filtering:</strong> Targets avoid problematic combinations like 1-9, 8-9, 4-5, and numbers already in your core (BD/LP). Essence conflicts with current year energies are also filtered out.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {result.targets.slice(0, 3).map((target, index) => {
                    const suggestedNames = result.suggestions.filter(
                      s => s.expression === target.expression && s.soulUrge === target.soulUrge
                    ).slice(0, 5);
                    const lpDisplay = result.current.lifePath;
                    const lpNum = typeof result.current.lifePath === 'string' ? parseInt(result.current.lifePath.split('/').pop() || '0') : result.current.lifePath;

                    let bdNum = 0;
                    if (birthDate) {
                      const parts = birthDate.split('/');
                      if (parts.length === 3) {
                        const day = parseInt(parts[0], 10);
                        bdNum = day > 9 ? (Math.floor(day / 10) + (day % 10)) : day;
                        while (bdNum > 9) bdNum = Math.floor(bdNum / 10) + (bdNum % 10);
                      }
                    }

                    let age = 0;
                    if (birthDate) {
                      const parts = birthDate.split('/');
                      if (parts.length === 3) age = new Date().getFullYear() - parseInt(parts[2], 10);
                    }

                    const currentYear = new Date().getFullYear();
                    const currentEssence = result.essenceNumbers[currentYear];
                    const essNum = typeof currentEssence === 'string' ? parseInt(currentEssence.split('/').pop() || '0') : currentEssence;

                    const targetEx = typeof target.expression === 'string' ? parseInt(target.expression.split('/').pop() || '0') : target.expression;
                    const targetSu = typeof target.soulUrge === 'string' ? parseInt(target.soulUrge.split('/').pop() || '0') : target.soulUrge;

                    const focusLabel = age <= 35 ? 'BD' : 'LP';
                    const bdExH = calculateHarmonyScore(bdNum, targetEx);
                    const bdSuH = calculateHarmonyScore(bdNum, targetSu);
                    const bdEssH = calculateHarmonyScore(bdNum, essNum);
                    const lpExH = calculateHarmonyScore(lpNum, targetEx);
                    const lpSuH = calculateHarmonyScore(lpNum, targetSu);
                    const lpEssH = calculateHarmonyScore(lpNum, essNum);
                    const exSuH = calculateHarmonyScore(targetEx, targetSu);
                    const exEssH = calculateHarmonyScore(targetEx, essNum);
                    const suEssH = calculateHarmonyScore(targetSu, essNum);

                    const overallTogetherness = age <= 35
                      ? bdExH * 0.25 + bdSuH * 0.25 + bdEssH * 0.15 + lpExH * 0.1 + lpSuH * 0.1 + exSuH * 0.1 + exEssH * 0.025 + suEssH * 0.025
                      : lpExH * 0.25 + lpSuH * 0.25 + lpEssH * 0.15 + bdExH * 0.05 + bdSuH * 0.05 + exSuH * 0.15 + exEssH * 0.05 + suEssH * 0.05;

                    return (
                      <div key={index}
                        className={`rounded-xl border p-6 transition-all hover:shadow-lg ${
                          target.isPerfectCore
                            ? 'border-emerald-500/40 bg-emerald-500/5'
                            : 'border-slate-700/50 bg-slate-900/50 hover:border-blue-500/40'
                        }`}>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-semibold text-slate-500">Target {index + 1}</span>
                          {target.isPerfectCore ? (
                            <span className="bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full">Perfect Core</span>
                          ) : target.harmonyWithLP >= 0.8 ? (
                            <span className="bg-blue-500/20 text-blue-300 text-xs font-semibold px-3 py-1 rounded-full border border-blue-500/30">Strong</span>
                          ) : null}
                        </div>

                        <div className="space-y-3 mb-4">
                          <div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Expression</div>
                            <div className="text-3xl font-bold text-white">{target.expression}</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider">Soul Urge</div>
                            <div className="text-3xl font-bold text-white">{target.soulUrge}</div>
                          </div>
                        </div>

                        {suggestedNames.length > 0 ? (
                          <div className="mb-4 space-y-2">
                            <div className="text-xs text-teal-400 font-semibold mb-2">Suggested Name Spellings:</div>
                            {suggestedNames.map((suggestion, idx) => (
                              <div key={idx} className="p-2.5 bg-teal-500/10 border border-teal-500/20 rounded-lg">
                                <div className="text-sm font-bold text-white mb-0.5">{suggestion.name}</div>
                                <div className="text-xs text-teal-400">{suggestion.changes.join(', ')}</div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="mb-4 p-3 bg-slate-800 border border-slate-700 rounded-lg">
                            <div className="text-xs text-slate-500 italic">No simple spelling variations found. Consider a nickname or middle name.</div>
                          </div>
                        )}

                        <div className="mb-4 p-4 bg-slate-800/80 rounded-lg border border-slate-700">
                          <div className="flex items-center justify-between mb-3">
                            <div className="text-xs text-slate-400 font-semibold">New Core Preview</div>
                            <div className="text-xs text-slate-500">Age: {age}</div>
                          </div>

                          <div className="grid grid-cols-5 gap-2 mb-3 text-center">
                            {[
                              { label: 'BD', value: String(bdNum), color: 'text-slate-300' },
                              { label: 'LP', value: String(lpDisplay), color: 'text-blue-400' },
                              { label: 'EX', value: String(target.expression), color: 'text-cyan-400' },
                              { label: 'SU', value: String(target.soulUrge), color: 'text-rose-400' },
                              { label: 'ESS', value: String(currentEssence), color: 'text-amber-400' },
                            ].map(n => (
                              <div key={n.label}>
                                <div className={`text-xs ${n.color}`}>{n.label}</div>
                                <div className={`text-sm font-bold ${n.color}`}>{n.value}</div>
                              </div>
                            ))}
                          </div>

                          <div className="pt-3 border-t border-slate-700">
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-xs text-slate-400">Togetherness (Focus: {focusLabel})</div>
                              <div className="text-sm font-bold text-white">{Math.round(overallTogetherness * 100)}%</div>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all ${
                                  overallTogetherness >= 0.8 ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                                  : overallTogetherness >= 0.6 ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                                  : 'bg-gradient-to-r from-amber-500 to-orange-500'
                                }`}
                                style={{ width: `${Math.round(overallTogetherness * 100)}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="text-xs text-slate-400 mb-3 p-3 bg-slate-800 rounded-lg">{target.rationale}</div>

                        <div className="space-y-2">
                          {[
                            { label: 'LP Harmony', value: `${Math.round(target.harmonyWithLP * 100)}%` },
                            { label: 'PY Harmony', value: `${Math.round(target.pyHarmony * 100)}%` },
                          ].map(row => (
                            <div key={row.label} className="flex items-center justify-between text-xs">
                              <span className="text-slate-500">{row.label}</span>
                              <span className="font-semibold text-white">{row.value}</span>
                            </div>
                          ))}
                          <div className="pt-2 border-t border-slate-700">
                            <div className="text-xs text-slate-500 mb-1">Overall Score</div>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-slate-700 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${target.isPerfectCore ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-blue-500 to-cyan-500'}`}
                                  style={{ width: `${Math.min(target.score * 100, 100)}%` }}
                                />
                              </div>
                              <span className="text-sm font-semibold text-white">{Math.round(Math.min(target.score * 100, 100))}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Name variations */}
            {result.suggestions.length > 0 ? (
              <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-sm rounded-2xl border border-blue-500/30 shadow-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-7 h-7 text-blue-400" />
                  <h2 className="text-2xl font-bold text-white">Suggested Name Variations</h2>
                </div>

                <div className="space-y-4">
                  {result.suggestions.map((suggestion, index) => (
                    <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-5 hover:bg-white/10 transition-all border border-white/10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl font-bold text-white">{suggestion.name}</span>
                            {suggestion.expression === suggestion.soulUrge &&
                             suggestion.expression === result.current.lifePath && (
                              <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">PERFECT</span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {suggestion.changes.map((change, i) => (
                              <span key={i} className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium text-slate-300">
                                {change}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-4 ml-4">
                          <div className="text-center">
                            <div className="text-xs text-slate-400">Expression</div>
                            <div className="text-2xl font-bold text-white">{suggestion.expression}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-slate-400">Soul Urge</div>
                            <div className="text-2xl font-bold text-white">{suggestion.soulUrge}</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>Optimised for {desireCategory}</span>
                        </div>
                        <div className="text-sm font-semibold text-white">
                          Core Alignment: {Math.round(suggestion.coreAlignment * 100)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-5 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-sm leading-relaxed text-slate-300 mb-3">
                    <strong className="text-white">Recommendation:</strong> Try using one of these name variations for 30 days. Update your email signature, social media profiles, or introduce yourself with the new spelling to align your vibration with your goals.
                  </p>
                  <p className="text-xs leading-relaxed text-slate-400">
                    All suggestions maintain your name's pronunciation while optimising numerological harmony. Spelling changes respect your Birth Date foundation (Life Path {result.current.lifePath}) as the unchanging guide.
                  </p>
                </div>
              </div>
            ) : result.targets.length > 0 ? (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-2xl p-6 md:p-8">
                <div className="text-center text-slate-400 mb-6">
                  <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <h3 className="text-xl font-bold text-white mb-2">No Simple Spelling Variations Found</h3>
                  <p className="text-sm">While there are target numbers that could improve your alignment for {desireCategory.toLowerCase()}, we couldn't find minor spelling variations that achieve them while maintaining pronunciation.</p>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5">
                  <h4 className="font-semibold text-blue-300 mb-3">What You Can Do:</h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {[
                      'Consider using a nickname or shortened version of your name',
                      'Add or use a middle name to shift your numerology',
                      `Your current core harmony is ${Math.round(result.current.coreHarmony.overall * 100)}%, which may already serve you well`,
                    ].map((tip, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-2xl p-6 md:p-8 text-center">
                <Sparkles className="w-12 h-12 mx-auto mb-3 text-slate-600" />
                <p className="text-lg text-slate-300">Your current name is already well-aligned with your goals. No improvements needed at this time.</p>
              </div>
            )}

            {/* Understanding section */}
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-amber-300 mb-3">Understanding Perfect Core Alignment</h3>
              <div className="space-y-2 text-sm text-slate-300">
                <p><strong className="text-amber-200">Life Path (BD Basis):</strong> Your unchangeable destiny driver derived from your birth date. This is the foundation that all other numbers should harmonise with.</p>
                <p><strong className="text-amber-200">Expression Number:</strong> Your outer manifestation and how you express yourself to the world. Ideally aligned with your Life Path.</p>
                <p><strong className="text-amber-200">Soul Urge Number:</strong> Your inner drive and what truly motivates you. Should support your Life Path for internal-external harmony.</p>
                <p><strong className="text-amber-200">Personal Year:</strong> Your current yearly cycle energy. Name corrections consider harmony with your upcoming Personal Years for optimal timing.</p>
                <p className="pt-2 border-t border-amber-500/20">
                  <strong className="text-amber-200">Perfect Core:</strong> When LP = EX = SU, you achieve ultimate synergy where purpose, action, and motivation are completely aligned.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
