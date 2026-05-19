import { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, Download, Info, Grid3x3, TrendingUp, TrendingDown, Compass, Palette, Lightbulb } from 'lucide-react';
import { LoShuGridData } from '../utils/loShuGrid';
import { LO_SHU_NUMBER_MEANINGS, PLANE_INTERPRETATIONS, ARROW_INTERPRETATIONS, REMEDIES, DIRECTION_RECOMMENDATIONS } from '../data/loShuInterpretations';
import { exportLoShuGridToPDF } from '../utils/pdfExport';

interface LoShuGridResultsProps {
  results: LoShuGridData;
  onNavigate: (page: string) => void;
}

export default function LoShuGridResults({ results, onNavigate }: LoShuGridResultsProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['grid']));

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const getDirectionRecommendations = () => {
    const validNumber = results.driverNumber >= 1 && results.driverNumber <= 9 ? results.driverNumber : 1;
    return DIRECTION_RECOMMENDATIONS[validNumber as keyof typeof DIRECTION_RECOMMENDATIONS];
  };

  const getGridValue = (row: number, col: number): string => {
    const value = results.grid[row][col];
    return value ? '•'.repeat(value) : '';
  };

  const getGridNumber = (row: number, col: number): number => {
    const positions: { [key: string]: number } = {
      '0-0': 4, '0-1': 9, '0-2': 2,
      '1-0': 3, '1-1': 5, '1-2': 7,
      '2-0': 8, '2-1': 1, '2-2': 6,
    };
    return positions[`${row}-${col}`];
  };

  const Section = ({ id, title, icon: Icon, children }: any) => {
    const isExpanded = expandedSections.has(id);
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden">
        <button
          onClick={() => toggleSection(id)}
          className="w-full px-4 md:px-6 py-3 md:py-4 flex items-center justify-between hover:bg-slate-700/30 transition-colors"
        >
          <div className="flex items-center gap-2 md:gap-3">
            <Icon className="w-5 h-5 md:w-6 md:h-6 text-amber-400" />
            <h2 className="text-lg md:text-xl font-bold text-white">{title}</h2>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>
        {isExpanded && <div className="px-4 md:px-6 pb-4 md:pb-6">{children}</div>}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <button
            onClick={() => onNavigate('loshu')}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <button
            onClick={() => exportLoShuGridToPDF(results)}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors font-medium text-sm md:text-base"
          >
            <Download className="w-4 h-4 md:w-5 md:h-5" />
            Export to PDF
          </button>
        </div>

        <div className="max-w-5xl mx-auto space-y-4 md:space-y-6">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Lo Shu Grid Analysis</h1>
            <p className="text-lg md:text-xl text-amber-400">{results.name}</p>
            <p className="text-sm md:text-base text-slate-400">Born on {new Date(results.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          <Section id="grid" title="Your Lo Shu Grid" icon={Grid3x3}>
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <div className="grid grid-cols-3 gap-2 p-4 bg-slate-900 rounded-xl border-2 border-amber-500/50">
                  {[0, 1, 2].flatMap((row) =>
                    [0, 1, 2].map((col) => {
                      const number = getGridNumber(row, col);
                      const value = getGridValue(row, col);
                      const count = results.numberCounts[number] || 0;
                      return (
                        <div
                          key={`${row}-${col}`}
                          className={`w-20 h-20 flex flex-col items-center justify-center rounded-lg border-2 ${
                            count > 0
                              ? 'bg-gradient-to-br from-amber-500/20 to-orange-600/20 border-amber-500'
                              : 'bg-slate-800 border-slate-600'
                          }`}
                        >
                          <div className="text-2xl font-bold text-white">{number}</div>
                          <div className="text-amber-400 text-sm font-bold">{value}</div>
                        </div>
                      );
                    })
                  )}
                </div>
                <div className="mt-4 text-center">
                  <div className="text-sm text-slate-400 space-y-1">
                    <div>Driver Number: <span className="text-amber-400 font-bold">{results.driverNumber}</span></div>
                    <div>Conductor Number: <span className="text-amber-400 font-bold">{results.conductorNumber}</span></div>
                    <div>Kua Number: <span className="text-amber-400 font-bold">{results.kuaNumber}</span></div>
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div className="p-4 bg-slate-900 rounded-lg border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Info className="w-5 h-5 text-blue-400" />
                    Grid Legend
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-3">
                    Each dot (•) represents one occurrence of that number in your birth date.
                    The pattern reveals your innate characteristics and life tendencies.
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
                      const count = results.numberCounts[num] || 0;
                      return (
                        <div key={num} className="flex items-center gap-1">
                          <span className="text-amber-400 font-bold">{num}:</span>
                          <span className="text-slate-400">{count > 0 ? `${count}x` : 'Missing'}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Section id="numbers" title="Number Analysis" icon={TrendingUp}>
            <div className="space-y-4">
              {Object.entries(results.numberCounts).map(([num, count]) => {
                const number = parseInt(num);
                const meaning = LO_SHU_NUMBER_MEANINGS[number as keyof typeof LO_SHU_NUMBER_MEANINGS];
                return (
                  <div key={num} className="p-4 bg-slate-900 rounded-lg border border-slate-700">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          Number {num} - {meaning.title}
                        </h3>
                        <p className="text-sm text-amber-400">Appears {count} time{count !== 1 ? 's' : ''}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="text-slate-300"><span className="font-semibold text-white">Traits:</span> {meaning.traits}</p>
                      <p className="text-slate-300"><span className="font-semibold text-white">Career:</span> {meaning.career}</p>
                      {count > 2 && (
                        <p className="text-orange-400"><span className="font-semibold">Excessive:</span> {meaning.excessive}</p>
                      )}
                    </div>
                  </div>
                );
              })}

              {results.missingNumbers.length > 0 && (
                <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-lg">
                  <h3 className="text-lg font-bold text-rose-400 mb-3 flex items-center gap-2">
                    <TrendingDown className="w-5 h-5" />
                    Missing Numbers
                  </h3>
                  <div className="space-y-3">
                    {results.missingNumbers.map((num) => {
                      const meaning = LO_SHU_NUMBER_MEANINGS[num as keyof typeof LO_SHU_NUMBER_MEANINGS];
                      return (
                        <div key={num} className="border-l-2 border-rose-400 pl-3">
                          <h4 className="font-semibold text-white">Number {num} - {meaning.title}</h4>
                          <p className="text-sm text-slate-300">{meaning.missing}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </Section>

          <Section id="planes" title="Planes of Existence" icon={Grid3x3}>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(results.planes).map(([key, plane]) => {
                const interpretation = PLANE_INTERPRETATIONS[key as keyof typeof PLANE_INTERPRETATIONS];
                const statusColor = {
                  'Missing': 'rose',
                  'Weak': 'orange',
                  'Balanced': 'green',
                  'Strong': 'blue',
                }[plane.status] || 'slate';

                return (
                  <div key={key} className="p-4 bg-slate-900 rounded-lg border border-slate-700">
                    <h3 className="font-bold text-white mb-2">{interpretation.title}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-slate-400">Numbers: {plane.numbers.join('-')}</span>
                      <span className={`px-2 py-0.5 text-xs font-semibold rounded bg-${statusColor}-500/20 text-${statusColor}-400`}>
                        {plane.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-300">
                      {plane.status === 'Missing' && interpretation.missing}
                      {plane.status === 'Weak' && interpretation.weak}
                      {plane.status === 'Balanced' && interpretation.balanced}
                      {plane.status === 'Strong' && interpretation.strong}
                    </p>
                  </div>
                );
              })}
            </div>
          </Section>

          <Section id="arrows" title="Arrows Analysis" icon={TrendingUp}>
            <div className="space-y-6">
              {results.arrows.present.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-green-400 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Present Arrows (Strengths)
                  </h3>
                  <div className="space-y-2">
                    {results.arrows.present.map((arrow) => (
                      <div key={arrow} className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <h4 className="font-semibold text-white">{arrow}</h4>
                        <p className="text-sm text-slate-300">
                          {ARROW_INTERPRETATIONS.present[arrow as keyof typeof ARROW_INTERPRETATIONS.present]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {results.arrows.missing.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-orange-400 mb-3 flex items-center gap-2">
                    <TrendingDown className="w-5 h-5" />
                    Missing Arrows (Areas for Growth)
                  </h3>
                  <div className="space-y-2">
                    {results.arrows.missing.map((arrow) => (
                      <div key={arrow} className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                        <h4 className="font-semibold text-white">{arrow}</h4>
                        <p className="text-sm text-slate-300">
                          {ARROW_INTERPRETATIONS.missing[arrow as keyof typeof ARROW_INTERPRETATIONS.missing]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Section>

          <Section id="remedies" title="Personalized Remedies" icon={Lightbulb}>
            <div className="space-y-6">
              {results.missingNumbers.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-amber-400 mb-3">Remedies for Missing Numbers</h3>
                  <div className="space-y-4">
                    {results.missingNumbers.map((num) => (
                      <div key={num} className="p-4 bg-slate-900 rounded-lg border border-slate-700">
                        <h4 className="font-semibold text-white mb-2">
                          Number {num} - {LO_SHU_NUMBER_MEANINGS[num as keyof typeof LO_SHU_NUMBER_MEANINGS].title}
                        </h4>
                        <ul className="space-y-1">
                          {REMEDIES.missingNumbers[num as keyof typeof REMEDIES.missingNumbers].map((remedy, idx) => (
                            <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                              <span className="text-amber-400 mt-1">•</span>
                              <span>{remedy}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {results.repeatingNumbers.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-amber-400 mb-3">Balance Excessive Numbers</h3>
                  <div className="space-y-3">
                    {results.repeatingNumbers.filter(r => r.count > 2).map((item) => (
                      <div key={item.number} className="p-4 bg-slate-900 rounded-lg border border-slate-700">
                        <h4 className="font-semibold text-white mb-2">
                          Number {item.number} (appears {item.count} times)
                        </h4>
                        <p className="text-sm text-slate-300">
                          {REMEDIES.excessiveNumbers[item.number as keyof typeof REMEDIES.excessiveNumbers]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-lg font-bold text-amber-400 mb-3">Strengthen Your Planes</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {Object.entries(results.planes)
                    .filter(([_, plane]) => plane.status === 'Missing' || plane.status === 'Weak')
                    .map(([key, _]) => (
                      <div key={key} className="p-3 bg-slate-900 rounded-lg border border-slate-700">
                        <h4 className="font-semibold text-white mb-1 text-sm">
                          {PLANE_INTERPRETATIONS[key as keyof typeof PLANE_INTERPRETATIONS].title}
                        </h4>
                        <p className="text-xs text-slate-300">
                          {REMEDIES.planes[key as keyof typeof REMEDIES.planes]}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </Section>

          <Section id="directions" title="Favorable Directions & Colors" icon={Compass}>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-3">Based on Your Driver Number ({results.driverNumber})</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-900 rounded-lg border border-slate-700">
                    <div className="flex items-center gap-2 mb-2">
                      <Compass className="w-5 h-5 text-blue-400" />
                      <h4 className="font-semibold text-white">Favorable Directions</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {getDirectionRecommendations().favorable.map((dir) => (
                        <span key={dir} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
                          {dir}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-lg border border-slate-700">
                    <div className="flex items-center gap-2 mb-2">
                      <Palette className="w-5 h-5 text-purple-400" />
                      <h4 className="font-semibold text-white">Lucky Colors</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {getDirectionRecommendations().colors.map((color) => (
                        <span key={color} className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <h4 className="font-semibold text-blue-400 mb-2">How to Use This Information:</h4>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Face favorable directions while working, studying, or meditating</li>
                  <li>• Sleep with your head pointing towards favorable directions</li>
                  <li>• Incorporate lucky colors in your clothing, home decor, and workspace</li>
                  <li>• Place your work desk or important furniture in favorable directions</li>
                </ul>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
