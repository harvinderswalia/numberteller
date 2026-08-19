import { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, Download, Info, Save, Layers, Sparkles, Lock } from 'lucide-react';
import { NUMBER_INTERPRETATIONS, KARMIC_LESSON_INTERPRETATIONS, PERSONAL_YEAR_INTERPRETATIONS, HOUSE_NUMBER_INTERPRETATIONS } from '../data/interpretations';
import { NUMBER_ELEMENT_MAP, FiveElement } from '../data/loShuInterpretations';
import TransitChart from './TransitChart';
import { saveChart } from '../utils/savedCharts';
import { useAuth } from '../contexts/AuthContext';
import { usePlanContext, canAccessAppFeature } from '../contexts/PlanContext';
import { PLANS } from '../utils/subscription';

const ELEMENT_COLORS: Record<FiveElement, { bg: string; text: string; border: string }> = {
  Wood:  { bg: 'bg-emerald-500/10', text: 'text-emerald-300', border: 'border-emerald-500/30' },
  Fire:  { bg: 'bg-rose-500/10',    text: 'text-rose-300',    border: 'border-rose-500/30'    },
  Earth: { bg: 'bg-amber-500/10',   text: 'text-amber-300',   border: 'border-amber-500/30'   },
  Metal: { bg: 'bg-slate-400/10',   text: 'text-slate-300',   border: 'border-slate-400/30'   },
  Water: { bg: 'bg-blue-500/10',    text: 'text-blue-300',    border: 'border-blue-500/30'    },
};

interface ResultsDisplayProps {
  results: any;
  onNavigate: (page: string) => void;
  onExportPDF: () => void;
  onNavigateToTarot?: () => void;
}

interface Toast {
  message: string;
  type: 'success' | 'error' | 'info';
}

export default function ResultsDisplay({ results, onNavigate, onExportPDF, onNavigateToTarot }: ResultsDisplayProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['core']));
  const [saving, setSaving] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [chartName, setChartName] = useState('');
  const [autoSave, setAutoSave] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const { user } = useAuth();
  const { planId } = usePlanContext();
  const hasInterpretations = canAccessAppFeature('interpretations', planId);

  const showToast = (message: string, type: Toast['type'] = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const handleSaveChart = async () => {
    if (!chartName.trim()) {
      showToast('Please enter a name for your chart', 'error');
      return;
    }

    setSaving(true);
    const result = await saveChart(chartName.trim(), results);

    if (result.success) {
      showToast('Chart saved successfully!', 'success');
      setShowSaveDialog(false);
      setChartName('');
    } else {
      showToast(result.error || 'Failed to save chart', 'error');
    }
    setSaving(false);
  };

  const handleAutoSaveToggle = async (checked: boolean) => {
    setAutoSave(checked);

    if (checked) {
      const defaultName = `${results.fullName} - ${new Date().toLocaleDateString()}`;
      setSaving(true);
      const result = await saveChart(defaultName, results);

      if (result.success) {
        showToast('Chart saved successfully!', 'success');
      } else {
        showToast(result.error || 'Failed to save chart', 'error');
        setAutoSave(false);
      }
      setSaving(false);
    }
  };

  const renderNumber = (label: string, value: number, description?: string) => {
    const interpretation = NUMBER_INTERPRETATIONS[value];
    const isMaster = [11, 22, 33].includes(value);

    return (
      <div className="bg-slate-900/50 rounded-lg p-3 md:p-4 border border-slate-700/50">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="text-base md:text-lg font-semibold text-white mb-1">{label}</h4>
            {description && hasInterpretations && <p className="text-xs md:text-sm text-slate-400">{description}</p>}
          </div>
          <div className="relative group">
            <div className={`text-2xl md:text-3xl font-bold ${isMaster ? 'text-amber-400' : 'text-amber-500'} flex items-center gap-2`}>
              {value}
              {isMaster && (
                <span className="text-xs bg-amber-500/20 px-2 py-1 rounded">Master</span>
              )}
            </div>
          </div>
        </div>

        {interpretation && hasInterpretations && (
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-emerald-400 mb-1">Positive Traits</p>
              <ul className="text-sm text-slate-300 space-y-1">
                {interpretation.traits.map((trait, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>{trait}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-rose-400 mb-1">Challenges</p>
              <ul className="text-sm text-slate-300 space-y-1">
                {interpretation.challenges.map((challenge, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-400 mt-1">•</span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-blue-400 mb-1">Advice</p>
              <ul className="text-sm text-slate-300 space-y-1">
                {interpretation.advice.map((advice, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>{advice}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {interpretation && !hasInterpretations && (
          <div className="mt-2 pt-3 border-t border-slate-700/50 flex items-center gap-2 text-slate-500 text-xs">
            <Lock className="w-3.5 h-3.5" />
            <span>Upgrade to Gold for written interpretations</span>
          </div>
        )}
      </div>
    );
  };

  const renderSection = (id: string, title: string, content: React.ReactNode) => {
    const isExpanded = expandedSections.has(id);

    return (
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
        <button
          onClick={() => toggleSection(id)}
          className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-slate-700/30 transition-colors"
        >
          <h3 className="text-xl md:text-2xl font-bold text-white">{title}</h3>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 md:w-6 md:h-6 text-amber-400" />
          ) : (
            <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-slate-400" />
          )}
        </button>

        {isExpanded && (
          <div className="p-4 md:p-6 pt-0 space-y-4">
            {content}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-6 md:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
          <button
            onClick={() => onNavigate('calculator')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            New Reading
          </button>

          <div className="flex items-center gap-2 md:gap-3 flex-wrap">
            <button
              onClick={() => {
                if (!user) {
                  showToast('Please sign in to save charts', 'error');
                  return;
                }
                setShowSaveDialog(true);
              }}
              className="flex items-center gap-2 px-3 md:px-4 py-2 bg-emerald-600 text-white text-sm md:text-base font-semibold rounded-lg hover:bg-emerald-700 transition-all duration-200"
            >
              <Save className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Save Chart</span>
              <span className="sm:hidden">Save</span>
            </button>

            <button
              onClick={onExportPDF}
              className="flex items-center gap-2 px-3 md:px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm md:text-base font-semibold rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-200"
            >
              <Download className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Export PDF</span>
              <span className="sm:hidden">Export</span>
            </button>
          </div>
        </div>

        {/* Bridge CTA — send this chart to Tarot */}
        {onNavigateToTarot && (
          <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-white font-semibold text-sm mb-0.5">Use this chart in other tools</p>
              <p className="text-gray-500 text-xs">Core numbers are pre-loaded — no re-entry needed.</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={onNavigateToTarot}
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                <Layers className="w-4 h-4" /> AI Tarot Reading
              </button>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-r from-amber-500/20 to-orange-600/20 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-amber-500/30 mb-6 md:mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Numerology Reading for {results.fullName}
              </h2>
              <p className="text-sm md:text-base text-slate-300">
                Born: {results.birthDate.toLocaleDateString()} | Current Year: {results.currentYear}
              </p>
            </div>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={autoSave}
                onChange={(e) => handleAutoSaveToggle(e.target.checked)}
                disabled={saving}
                className="w-5 h-5 rounded border-2 border-amber-500 bg-slate-900/50 checked:bg-amber-500 checked:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer disabled:opacity-50 transition-all"
              />
              <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                Save this chart
              </span>
            </label>
          </div>
        </div>

        <div className="space-y-4">
          {renderSection('core', 'Core Numbers', (
            <div className="grid md:grid-cols-2 gap-4">
              {renderNumber('Life Path Number', results.coreNumbers.lifePath, 'Your core life purpose and journey')}
              {renderNumber('Expression Number', results.coreNumbers.expression, 'Your natural talents and abilities')}
              {renderNumber('Soul Urge Number', results.coreNumbers.soulUrge, 'Your inner motivations and desires')}
              {renderNumber('Personality Number', results.coreNumbers.personality, 'How others perceive you')}
              {renderNumber('Birthday Number', results.coreNumbers.birthday, 'Your natural temperament')}
              {renderNumber('Maturity Number', results.coreNumbers.maturity, 'Your long-term growth potential')}
              {renderNumber('Attitude Number', results.coreNumbers.attitude, 'Your approach to life')}
              {renderNumber('Rational Thought Number', results.coreNumbers.rationalThought, 'How you process information')}
            </div>
          ))}

          {renderSection('cycles', 'Life Cycles & Pinnacles', (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                  <h4 className="text-lg font-semibold text-white mb-2">Personal Year</h4>
                  <div className="text-3xl font-bold text-amber-500 mb-2">{results.cycles.personalYear}</div>
                  {hasInterpretations ? (
                    <p className="text-sm text-slate-300">{PERSONAL_YEAR_INTERPRETATIONS[results.cycles.personalYear]}</p>
                  ) : (
                    <p className="text-sm text-slate-500 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" /> Gold plan required for interpretation
                    </p>
                  )}
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                  <h4 className="text-lg font-semibold text-white mb-2">Universal Year</h4>
                  <div className="text-3xl font-bold text-amber-500 mb-2">{results.cycles.universalYear}</div>
                  {hasInterpretations && <p className="text-sm text-slate-300">Global energy influencing everyone this year</p>}
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                  <h4 className="text-lg font-semibold text-white mb-2">Essence Number</h4>
                  <div className="text-3xl font-bold text-amber-500 mb-2">{results.cycles.essence}</div>
                  {hasInterpretations && <p className="text-sm text-slate-300">Current yearly influences and themes</p>}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Period Cycles</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                    <div className="text-2xl font-bold text-amber-500">{results.cycles.periodCycles.first.value}</div>
                    <p className="text-sm text-slate-400 mt-1">Age {results.cycles.periodCycles.first.ageRange}</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                    <div className="text-2xl font-bold text-amber-500">{results.cycles.periodCycles.second.value}</div>
                    <p className="text-sm text-slate-400 mt-1">Age {results.cycles.periodCycles.second.ageRange}</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                    <div className="text-2xl font-bold text-amber-500">{results.cycles.periodCycles.third.value}</div>
                    <p className="text-sm text-slate-400 mt-1">Age {results.cycles.periodCycles.third.ageRange}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Pinnacles (Achievement Periods)</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(results.cycles.pinnacles).map(([key, pinnacle]: [string, any]) => (
                    <div key={key} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-slate-400 uppercase">{key} Pinnacle</span>
                        <div className="text-2xl font-bold text-amber-500">{pinnacle.value}</div>
                      </div>
                      <p className="text-sm text-slate-400">Age {pinnacle.ageRange}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Challenges (Lessons to Master)</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(results.cycles.challenges).map(([key, challenge]: [string, any]) => (
                    <div key={key} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-slate-400 uppercase">{key} Challenge</span>
                        <div className="text-2xl font-bold text-rose-400">{challenge.value}</div>
                      </div>
                      <p className="text-sm text-slate-400">Age {challenge.ageRange}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {renderSection('karmic', 'Karmic Insights', (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Karmic Lessons</h4>
                {results.karmic.lessons.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {results.karmic.lessons.map((lesson: any, index: number) => (
                      <div key={index} className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="text-2xl font-bold text-rose-400">{lesson.number}</div>
                          {lesson.modified && (
                            <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">Modified</span>
                          )}
                        </div>
                        {hasInterpretations ? (
                          <p className="text-sm text-slate-300">{KARMIC_LESSON_INTERPRETATIONS[lesson.number]}</p>
                        ) : (
                          <p className="text-sm text-slate-500 flex items-center gap-1.5">
                            <Lock className="w-3.5 h-3.5" /> Gold plan required for interpretation
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400">No karmic lessons - all numbers present in your name!</p>
                )}
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                <h4 className="text-lg font-semibold text-white mb-2">Prime Intensifier</h4>
                <div className="text-3xl font-bold text-amber-500 mb-2">{results.karmic.primeIntensifier}</div>
                {hasInterpretations && <p className="text-sm text-slate-300">Most frequent number in your name, amplifying its energy</p>}
              </div>
            </div>
          ))}

          {hasInterpretations && renderSection('details', 'Additional Details', (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                <h4 className="text-sm font-semibold text-slate-400 mb-2">Ruling Planet</h4>
                <div className="text-xl font-bold text-white">{results.details.rulingPlanet}</div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                <h4 className="text-sm font-semibold text-slate-400 mb-2">Harmony Numbers</h4>
                <div className="text-xl font-bold text-white">{results.details.harmonyNumbers.join(', ')}</div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                <h4 className="text-sm font-semibold text-slate-400 mb-2">Favourable Colours</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {results.details.favourableColours.map((color: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm">{color}</span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                <h4 className="text-sm font-semibold text-slate-400 mb-2">Zodiac Sign</h4>
                <div className="text-xl font-bold text-white">{results.details.zodiac.sign} ({results.details.zodiac.element})</div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                <h4 className="text-sm font-semibold text-slate-400 mb-2">First Letter</h4>
                <div className="text-xl font-bold text-white">{results.details.firstLetter.letter} = {results.details.firstLetter.value}</div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                <h4 className="text-sm font-semibold text-slate-400 mb-2">First Vowel</h4>
                <div className="text-xl font-bold text-white">{results.details.firstVowel.letter} = {results.details.firstVowel.value}</div>
              </div>
            </div>
          ))}

          {!hasInterpretations && (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 text-center">
              <Lock className="w-8 h-8 text-amber-400 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">Additional Details Locked</h3>
              <p className="text-slate-400 text-sm mb-4">Ruling planet, harmony numbers, favourable colours, zodiac sign, and letter analysis are available with the Gold plan.</p>
              <button
                onClick={() => onNavigate('pricing')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all"
              >
                Upgrade to Gold
              </button>
            </div>
          )}

          {renderSection('loshu', 'Loshu Grid Chart', (
            <div className="space-y-4">
              {/* Grid + Legend side by side */}
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                {/* Left: grid + core numbers */}
                <div className="flex-shrink-0">
                  <div className="grid grid-cols-3 gap-2 p-4 bg-slate-900 rounded-xl border-2 border-amber-500/50">
                    {([[4,9,2],[3,5,7],[8,1,6]] as number[][]).flatMap((row, rowIndex) =>
                      row.map((number, colIndex) => {
                        const nc = results.loshuGrid.numberCounts || {};
                        const bdc = results.loshuGrid.birthDigitCounts || {};
                        const birthCount = (bdc[number] ?? bdc[String(number)]) || 0;
                        const totalCount = (nc[number] ?? nc[String(number)]) || 0;
                        const { bd, lp, kua } = results.loshuGrid.extraNumbers || {};
                        const extraLabels: string[] = [];
                        if (bd === number) extraLabels.push('BD');
                        if (lp === number) extraLabels.push('LP');
                        if (kua === number) extraLabels.push('Kua');
                        const element = NUMBER_ELEMENT_MAP[number as keyof typeof NUMBER_ELEMENT_MAP] as FiveElement;
                        const elColor = element ? ELEMENT_COLORS[element] : ELEMENT_COLORS['Earth'];

                        return (
                          <div
                            key={`${rowIndex}-${colIndex}`}
                            className={`w-20 h-20 flex flex-col items-center justify-center rounded-lg border-2 relative ${
                              totalCount > 0
                                ? 'bg-gradient-to-br from-amber-500/20 to-orange-600/20 border-amber-500'
                                : 'bg-slate-800 border-slate-600'
                            }`}
                          >
                            <div className="text-2xl font-bold text-white leading-none">{number}</div>
                            {birthCount > 0 && (
                              <div className="text-amber-400 text-xs font-bold leading-none mt-0.5">
                                {'•'.repeat(Math.min(birthCount, 5))}
                              </div>
                            )}
                            {extraLabels.length > 0 && (
                              <div className="flex gap-0.5 mt-0.5 flex-wrap justify-center">
                                {extraLabels.map(label => (
                                  <span key={label} className={`text-[8px] font-bold px-1 py-0.5 rounded ${elColor.bg} ${elColor.text} border ${elColor.border} leading-none`}>
                                    {label}
                                  </span>
                                ))}
                              </div>
                            )}
                            {element && (
                              <span className={`absolute top-1 right-1 text-[7px] font-semibold ${elColor.text} leading-none`}>
                                {element[0]}
                              </span>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Core numbers summary */}
                  <div className="mt-4 bg-slate-900 rounded-xl border border-slate-700 p-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Core Numbers in Grid</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Driver Number (BD Day)</span>
                        <span className="text-amber-400 font-bold text-lg">{results.loshuGrid.driverNumber ?? results.loshuGrid.extraNumbers?.bd}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Life Path (LP)</span>
                        <span className="text-amber-400 font-bold text-lg">{results.loshuGrid.conductorNumber ?? results.loshuGrid.extraNumbers?.lp}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Kua Number</span>
                        <span className="text-amber-400 font-bold text-lg">{results.loshuGrid.kuaNumber}</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-700">
                      {hasInterpretations && (
                        <p className="text-xs text-slate-500 leading-relaxed">
                          BD ({results.loshuGrid.extraNumbers?.bd}), LP ({results.loshuGrid.extraNumbers?.lp}), and Kua ({results.loshuGrid.kuaNumber}) are included in the grid and factored into all arrow and plane analysis.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: legend + element info */}
                <div className="flex-1 space-y-4">
                  {/* Grid Legend */}
                  <div className="p-4 bg-slate-900 rounded-lg border border-slate-700">
                    <h3 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                      <Info className="w-4 h-4 text-blue-400" />
                      Grid Legend
                    </h3>
                    {hasInterpretations && (
                      <p className="text-slate-300 text-sm leading-relaxed mb-3">
                        Each dot (•) represents one occurrence in your birth date digits. BD, LP, and Kua badges indicate additional placements from your core numbers — these are included in arrow and plane calculations.
                      </p>
                    )}
                    <div className="grid grid-cols-3 gap-2 text-xs mb-4">
                      {[1,2,3,4,5,6,7,8,9].map((num) => {
                        const bdc = results.loshuGrid.birthDigitCounts || {};
                        const birthCount = (bdc[num] ?? bdc[String(num)]) || 0;
                        const { bd, lp, kua } = results.loshuGrid.extraNumbers || {};
                        const extras: string[] = [];
                        if (bd === num) extras.push('BD');
                        if (lp === num) extras.push('LP');
                        if (kua === num) extras.push('Kua');
                        return (
                          <div key={num} className="flex items-center gap-1 flex-wrap">
                            <span className="text-amber-400 font-bold">{num}:</span>
                            <span className="text-slate-400">{birthCount > 0 ? `${birthCount}x` : 'Missing'}</span>
                            {extras.length > 0 && <span className="text-blue-400 font-medium">+{extras.join(',')}</span>}
                          </div>
                        );
                      })}
                    </div>
                    {/* Five Element Map */}
                    {hasInterpretations && (
                      <div className="pt-3 border-t border-slate-700">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Five Element Map</p>
                        <div className="grid grid-cols-5 gap-1 text-[10px]">
                          {(['Wood','Fire','Earth','Metal','Water'] as FiveElement[]).map(el => {
                            const c = ELEMENT_COLORS[el];
                            return (
                              <div key={el} className={`${c.bg} ${c.text} border ${c.border} rounded px-1.5 py-1 text-center`}>
                                <div className="font-bold">{el[0]}</div>
                                <div className="opacity-70">{el}</div>
                              </div>
                            );
                          })}
                        </div>
                        <p className="text-[10px] text-slate-600 mt-1.5">Letter in top-right of each cell = element</p>
                      </div>
                    )}
                  </div>

                  {/* Five Element Cycles */}
                  {hasInterpretations && (
                    <div className="p-4 bg-slate-900 rounded-lg border border-slate-700">
                      <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        Five Element Cycles
                      </h3>
                      <div className="space-y-1.5 text-xs text-slate-400">
                        <div><span className="text-emerald-400 font-medium">Productive:</span> Wood → Fire → Earth → Metal → Water → Wood</div>
                        <div><span className="text-orange-400 font-medium">Exhaustive:</span> Fire exhausts Wood · Earth exhausts Fire · Metal exhausts Earth · Water exhausts Metal · Wood exhausts Water</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Missing Numbers */}
              {results.loshuGrid.missingNumbers?.length > 0 && (
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                  <h4 className="text-sm font-semibold text-rose-400 mb-2">Missing Numbers</h4>
                  <p className="text-white">{results.loshuGrid.missingNumbers.join(', ')}</p>
                  {hasInterpretations && <p className="text-sm text-slate-400 mt-1">These represent karmic lessons to learn</p>}
                </div>
              )}

              {/* Active Arrows */}
              {results.loshuGrid.arrows?.present?.length > 0 && (
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                  <h4 className="text-sm font-semibold text-emerald-400 mb-2">Active Arrows</h4>
                  <ul className="space-y-1">
                    {results.loshuGrid.arrows.present.map((arrow: string, i: number) => (
                      <li key={i} className="text-sm text-slate-300 flex items-center gap-2">
                        <span className="text-emerald-400">✓</span>
                        {arrow}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          {renderSection('transit', 'Transit Chart', (
            <TransitChart
              fullName={results.fullName}
              birthDate={results.birthDate}
              lifePath={results.coreNumbers.lifePath}
            />
          ))}
        </div>
      </div>

      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl max-w-md w-full border border-slate-700 shadow-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white leading-none">Save Chart</h3>
                <p className="text-amber-400 text-xs font-medium">numberteller.com</p>
              </div>
            </div>
            <p className="text-slate-400 mb-4 text-sm">Give your chart a name so you can easily find it later.</p>

            <input
              type="text"
              value={chartName}
              onChange={(e) => setChartName(e.target.value)}
              placeholder="e.g., John Smith - Feb 2024"
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent mb-4"
              maxLength={50}
            />

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setShowSaveDialog(false);
                  setChartName('');
                }}
                disabled={saving}
                className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChart}
                disabled={saving || !chartName.trim()}
                className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div
          className="fixed bottom-6 right-6 z-[60] transition-all duration-300 ease-out"
          style={{ animation: 'toastSlideIn 0.3s ease-out' }}
        >
          <div className={`rounded-xl shadow-2xl border px-5 py-4 max-w-sm flex items-center gap-3 ${
            toast.type === 'success'
              ? 'bg-emerald-900/95 border-emerald-500/40'
              : toast.type === 'error'
                ? 'bg-rose-900/95 border-rose-500/40'
                : 'bg-slate-800/95 border-slate-600'
          }`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
              toast.type === 'success'
                ? 'bg-emerald-500/20'
                : toast.type === 'error'
                  ? 'bg-rose-500/20'
                  : 'bg-amber-500/20'
            }`}>
              <span className={`text-sm font-bold ${
                toast.type === 'success' ? 'text-emerald-300' : toast.type === 'error' ? 'text-rose-300' : 'text-amber-300'
              }`}>N</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-amber-400 font-medium leading-none mb-0.5">numberteller.com</p>
              <p className={`text-sm font-medium leading-tight ${
                toast.type === 'success' ? 'text-emerald-200' : toast.type === 'error' ? 'text-rose-200' : 'text-slate-200'
              }`}>{toast.message}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
