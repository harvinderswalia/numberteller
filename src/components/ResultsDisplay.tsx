import { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, Download, Info, Save } from 'lucide-react';
import { NUMBER_INTERPRETATIONS, KARMIC_LESSON_INTERPRETATIONS, PERSONAL_YEAR_INTERPRETATIONS, HOUSE_NUMBER_INTERPRETATIONS } from '../data/interpretations';
import TransitChart from './TransitChart';
import { calculateKuaNumber } from '../utils/numerology';
import { saveChart } from '../utils/savedCharts';
import { useAuth } from '../contexts/AuthContext';

interface ResultsDisplayProps {
  results: any;
  onNavigate: (page: string) => void;
  onExportPDF: () => void;
}

export default function ResultsDisplay({ results, onNavigate, onExportPDF }: ResultsDisplayProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['core']));
  const [saving, setSaving] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [chartName, setChartName] = useState('');
  const [autoSave, setAutoSave] = useState(false);
  const { user } = useAuth();

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
      alert('Please enter a name for your chart');
      return;
    }

    setSaving(true);
    const result = await saveChart(chartName.trim(), results);

    if (result.success) {
      alert('Chart saved successfully!');
      setShowSaveDialog(false);
      setChartName('');
    } else {
      alert(result.error || 'Failed to save chart');
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
        alert('Chart saved successfully!');
      } else {
        alert(result.error || 'Failed to save chart');
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
            {description && <p className="text-xs md:text-sm text-slate-400">{description}</p>}
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

        {interpretation && (
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
                  alert('Please sign in to save charts');
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
                  <p className="text-sm text-slate-300">{PERSONAL_YEAR_INTERPRETATIONS[results.cycles.personalYear]}</p>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                  <h4 className="text-lg font-semibold text-white mb-2">Universal Year</h4>
                  <div className="text-3xl font-bold text-amber-500 mb-2">{results.cycles.universalYear}</div>
                  <p className="text-sm text-slate-300">Global energy influencing everyone this year</p>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                  <h4 className="text-lg font-semibold text-white mb-2">Essence Number</h4>
                  <div className="text-3xl font-bold text-amber-500 mb-2">{results.cycles.essence}</div>
                  <p className="text-sm text-slate-300">Current yearly influences and themes</p>
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
                        <p className="text-sm text-slate-300">{KARMIC_LESSON_INTERPRETATIONS[lesson.number]}</p>
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
                <p className="text-sm text-slate-300">Most frequent number in your name, amplifying its energy</p>
              </div>
            </div>
          ))}

          {renderSection('details', 'Additional Details', (
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

          {renderSection('loshu', 'Loshu Grid Chart', (
            <div className="space-y-4">
              {results.gender && (
                <div className="bg-slate-900/50 rounded-lg p-4 border border-orange-500/50 max-w-md mx-auto">
                  <h4 className="text-sm font-semibold text-orange-400 mb-2">Kua Number (Feng Shui Directional Number)</h4>
                  <div className="flex items-center gap-3">
                    <div className="text-4xl font-bold text-orange-400">
                      {calculateKuaNumber(results.birthDate, results.gender)}
                    </div>
                    <p className="text-sm text-slate-300">Based on birth year and gender, this number determines your auspicious directions and best placement in spaces.</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
                {results.loshuGrid.grid.map((row: (number | null)[], rowIndex: number) => {
                  const loshuNumbers = [[4, 9, 2], [3, 5, 7], [8, 1, 6]];
                  const kuaNumber = results.gender ? calculateKuaNumber(results.birthDate, results.gender) : null;

                  return row.map((cell: number | null, colIndex: number) => {
                    const representedNumber = loshuNumbers[rowIndex][colIndex];
                    const isKuaNumber = kuaNumber === representedNumber;

                    return (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        className={`aspect-square flex flex-col items-center justify-center rounded-lg border-2 ${
                          isKuaNumber
                            ? 'bg-orange-500/30 border-orange-400 ring-2 ring-orange-500/50'
                            : cell
                              ? 'bg-emerald-500/20 border-emerald-500'
                              : 'bg-slate-900/50 border-slate-700'
                        }`}
                      >
                        <div className={`text-sm font-medium ${
                          isKuaNumber ? 'text-orange-300' : cell ? 'text-emerald-300' : 'text-slate-500'
                        }`}>
                          {representedNumber}
                        </div>
                        <div className={`text-3xl font-bold ${
                          isKuaNumber ? 'text-orange-400' : cell ? 'text-emerald-400' : 'text-slate-600'
                        }`}>
                          {cell || '0'}
                        </div>
                        {isKuaNumber && (
                          <div className="text-xs text-orange-400 font-semibold mt-1">KUA</div>
                        )}
                      </div>
                    );
                  });
                })}
              </div>

              {results.loshuGrid.missingNumbers.length > 0 && (
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                  <h4 className="text-sm font-semibold text-rose-400 mb-2">Missing Numbers</h4>
                  <p className="text-white">{results.loshuGrid.missingNumbers.join(', ')}</p>
                  <p className="text-sm text-slate-400 mt-1">These represent karmic lessons to learn</p>
                </div>
              )}

              {results.loshuGrid.arrows.length > 0 && (
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                  <h4 className="text-sm font-semibold text-emerald-400 mb-2">Active Arrows</h4>
                  <ul className="space-y-1">
                    {results.loshuGrid.arrows.map((arrow: string, i: number) => (
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
            <h3 className="text-2xl font-bold text-white mb-4">Save Chart</h3>
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
    </div>
  );
}
