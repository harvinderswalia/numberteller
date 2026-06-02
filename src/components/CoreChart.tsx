import React from 'react';
import { calculateLoShuGrid } from '../utils/loShuGrid';

interface CoreChartProps {
  lifePath: number | string;
  expression: number | string;
  soulUrge: number | string;
  personalYear: number;
  birthDate?: string; // DD/MM/YYYY
  gender?: 'male' | 'female';
  harmony: {
    lpExpr: number;
    lpSoul: number;
    exprSoul: number;
    overall: number;
    hasOverEnergy: boolean;
    overEnergyDetails?: { number: number; positions: string[] }[];
  };
}

// Grid layout: Lo Shu magic square positions
const GRID_POSITIONS: Record<string, number> = {
  '0-0': 4, '0-1': 9, '0-2': 2,
  '1-0': 3, '1-1': 5, '1-2': 7,
  '2-0': 8, '2-1': 1, '2-2': 6,
};

export default function CoreChart({ lifePath, expression, soulUrge, personalYear, birthDate, gender, harmony }: CoreChartProps) {
  const getNumericValue = (value: number | string): number => {
    if (typeof value === 'string') {
      return parseInt(value.split('/').pop() || '0');
    }
    return value;
  };

  const getOverEnergyEffect = (num: number): string => {
    const effects: Record<number, string> = {
      1: 'excessive ego, stubbornness, isolation, difficulty collaborating',
      2: 'over-sensitivity, indecisiveness, co-dependency, lack of boundaries',
      3: 'scattered energy, superficiality, gossip, inability to focus',
      4: 'rigidity, workaholism, resistance to change, burnout',
      5: 'restlessness, impulsiveness, instability, commitment issues',
      6: 'martyrdom, over-responsibility, interference, control issues',
      7: 'isolation, over-analysis, cynicism, disconnection from reality',
      8: 'obsession with power/money, ruthlessness, stress, materialism',
      9: 'emotional overwhelm, lack of boundaries, martyrdom, inability to say no',
    };
    return effects[num] || 'energy imbalance and potential challenges';
  };

  const lpNum = getNumericValue(lifePath);
  const exNum = getNumericValue(expression);
  const suNum = getNumericValue(soulUrge);

  // Convert DD/MM/YYYY → YYYY-MM-DD for calculateLoShuGrid
  const toISODate = (ddmmyyyy: string): string | null => {
    const parts = ddmmyyyy.split('/');
    if (parts.length === 3 && parts[2].length === 4) {
      return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
    return null;
  };

  const isoDate = birthDate ? toISODate(birthDate) : null;
  const loShu = isoDate && gender
    ? calculateLoShuGrid('', isoDate, gender)
    : null;

  // Build extra source map for badge annotations
  const extraSourceMap: Record<number, string[]> = {};
  if (loShu) {
    const { bd, lp, kua } = loShu.extraNumbers;
    ([[ bd, 'BD'], [lp, 'LP'], [kua, 'Kua']] as [number, string][]).forEach(([val, label]) => {
      if (val >= 1 && val <= 9) {
        if (!extraSourceMap[val]) extraSourceMap[val] = [];
        if (!extraSourceMap[val].includes(label)) extraSourceMap[val].push(label);
      }
    });
  }

  const isPerfectCore = lpNum === exNum && exNum === suNum;
  const coreScore = Math.round(harmony.overall * 100);

  // Detect repeated core numbers (over-energy)
  const repeatedNumbers: { number: number; positions: string[] }[] = [];
  const numberCount = new Map<number, string[]>();

  if (loShu && loShu.extraNumbers.bd > 0) numberCount.set(loShu.extraNumbers.bd, [...(numberCount.get(loShu.extraNumbers.bd) || []), 'BD']);
  numberCount.set(lpNum, [...(numberCount.get(lpNum) || []), 'LP']);
  numberCount.set(exNum, [...(numberCount.get(exNum) || []), 'EX']);
  numberCount.set(suNum, [...(numberCount.get(suNum) || []), 'SU']);

  numberCount.forEach((positions, num) => {
    if (positions.length > 1) repeatedNumbers.push({ number: num, positions });
  });

  const hasOverEnergy = repeatedNumbers.length > 0;

  const getHarmonyColor = (score: number): string => {
    if (score >= 0.9) return 'text-green-600';
    if (score >= 0.7) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHarmonyLabel = (score: number, pairHasOverEnergy: boolean): string => {
    if (pairHasOverEnergy) return 'Over-Energy';
    if (score === 1.0) return 'Perfect';
    if (score >= 0.8) return 'Strong';
    if (score >= 0.5) return 'Neutral';
    return 'Challenging';
  };

  const pairHasOverEnergy = (pos1: string, pos2: string): boolean => {
    if (!harmony.overEnergyDetails) return false;
    return harmony.overEnergyDetails.some(d => d.positions.includes(pos1) && d.positions.includes(pos2));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">Core Numerology Chart</h3>

      {isPerfectCore && (
        <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
          <p className="text-green-800 font-semibold text-center">
            Perfect Core Alignment! All components match ({lpNum})
          </p>
        </div>
      )}

      {hasOverEnergy && (
        <div className="mb-6 p-5 bg-amber-50 border-2 border-amber-400 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">!</span>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-amber-900 mb-2">Over-Energy Alert</h4>
              {repeatedNumbers.map(({ number, positions }) => (
                <div key={number} className="mb-3">
                  <p className="text-amber-800 font-semibold mb-1">
                    Number {number} appears in: {positions.join(', ')}
                  </p>
                  <p className="text-amber-700 text-sm">
                    {positions.includes('BD') || positions.includes('LP')
                      ? `This creates an over-energy of ${number} - your core foundation is being amplified excessively. This can lead to ${getOverEnergyEffect(number)}.`
                      : `Repeated energy of ${number} may cause ${getOverEnergyEffect(number)}.`}
                  </p>
                </div>
              ))}
              <p className="text-amber-800 font-semibold mt-3 text-sm">
                Important: When BD or LP numbers repeat in EX or SU, it's recommended to change your name to create better energy balance and alignment with your goals.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-600 font-medium">Core Alignment Score</span>
          <span className={`font-bold text-2xl ${getHarmonyColor(harmony.overall)}`}>
            {coreScore}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className={`h-4 rounded-full transition-all ${
              harmony.overall >= 0.9 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
              harmony.overall >= 0.7 ? 'bg-gradient-to-r from-yellow-500 to-amber-600' :
              'bg-gradient-to-r from-red-500 to-rose-600'
            }`}
            style={{ width: `${coreScore}%` }}
          />
        </div>
      </div>

      {/* Core Numbers Display - BD, LP, EX, SU */}
      <div className="mb-8 flex justify-center">
        <div className="relative" style={{ width: '280px', height: '340px' }}>
          {/* LP (Life Path) - Top */}
          <div className="absolute" style={{ top: '0', left: '50%', transform: 'translateX(-50%)' }}>
            <div className="flex flex-col items-center">
              <div className="text-xs font-bold text-blue-700 mb-1">LP</div>
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 border-3 border-blue-400 flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-blue-900">{lifePath}</span>
              </div>
            </div>
          </div>

          {/* BD (Birth Date) - Left side */}
          {loShu && loShu.extraNumbers.bd > 0 && (
            <div className="absolute" style={{ top: '50%', left: '8%', transform: 'translateY(-50%)' }}>
              <div className="flex flex-col items-center">
                <div className="text-xs font-bold text-gray-700 mb-1">BD</div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-400 flex items-center justify-center shadow">
                  <span className="text-xl font-bold text-gray-700">{loShu.extraNumbers.bd}</span>
                </div>
              </div>
            </div>
          )}

          {/* EX (Expression) - Right side */}
          <div className="absolute" style={{ top: '50%', right: '8%', transform: 'translateY(-50%)' }}>
            <div className="flex flex-col items-center">
              <div className="text-xs font-bold text-teal-700 mb-1">EX</div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-100 to-teal-200 border-2 border-teal-400 flex items-center justify-center shadow">
                <span className="text-xl font-bold text-teal-900">{exNum}</span>
              </div>
            </div>
          </div>

          {/* SU (Soul Urge) - Bottom */}
          <div className="absolute" style={{ bottom: '0', left: '50%', transform: 'translateX(-50%)' }}>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-100 to-pink-200 border-3 border-pink-400 flex items-center justify-center shadow-lg">
                <span className="text-3xl font-bold text-pink-900">{suNum}</span>
              </div>
              <div className="text-xs font-bold text-pink-700 mt-1">SU</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lo Shu 3×3 Grid */}
      {loShu && (
        <div className="mb-8">
          <h4 className="font-bold text-gray-900 mb-4 text-center text-lg">Lo Shu Grid</h4>
          <div className="flex flex-col items-center gap-4">
            <div className="grid grid-cols-3 gap-2 p-4 bg-gray-900 rounded-xl border-2 border-amber-500/50">
              {[0, 1, 2].flatMap(row =>
                [0, 1, 2].map(col => {
                  const number = GRID_POSITIONS[`${row}-${col}`];
                  const birthCount = loShu.birthDigitCounts[number] || 0;
                  const totalCount = loShu.numberCounts[number] || 0;
                  const extraLabels = extraSourceMap[number] || [];

                  return (
                    <div
                      key={`${row}-${col}`}
                      className={`w-20 h-20 flex flex-col items-center justify-center rounded-lg border-2 ${
                        totalCount > 0
                          ? 'bg-gradient-to-br from-amber-500/20 to-orange-600/20 border-amber-500'
                          : 'bg-gray-800 border-gray-600'
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
                            <span
                              key={label}
                              className="text-[8px] font-bold px-1 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 leading-none"
                            >
                              {label}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Core numbers summary below grid */}
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 w-full max-w-xs">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Core Numbers in Grid</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Driver (BD Day)</span>
                  <span className="text-amber-600 font-bold">{loShu.driverNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Life Path (LP)</span>
                  <span className="text-amber-600 font-bold">{loShu.conductorNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Kua Number</span>
                  <span className="text-amber-600 font-bold">{loShu.kuaNumber}</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3 pt-3 border-t border-gray-200 leading-relaxed">
                Dots (•) = birth date digits. BD, LP, Kua badges = additional grid placements.
              </p>
            </div>

            {/* Missing numbers */}
            {loShu.missingNumbers.length > 0 && (
              <div className="w-full max-w-xs p-3 bg-rose-50 border border-rose-200 rounded-xl">
                <p className="text-xs font-semibold text-rose-600 uppercase tracking-wider mb-1">Missing Numbers</p>
                <p className="text-sm text-rose-700 font-medium">{loShu.missingNumbers.join(', ')}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Compatibility Grid */}
      <div className="mb-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200">
        <h4 className="font-bold text-gray-900 mb-4 text-center text-lg">Current Core Compatibility</h4>
        <div className="flex justify-center items-center gap-8 mb-3">
          <div className="text-center">
            <div className="text-4xl font-bold text-teal-700">{expression}</div>
            <div className="text-xs text-gray-600 mt-1">EX</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-700">{lifePath}</div>
            <div className="text-xs text-gray-600 mt-1">LP</div>
          </div>
        </div>
        <div className="flex justify-center mb-3">
          <div className="text-center">
            <div className="text-4xl font-bold text-pink-700">{soulUrge}</div>
            <div className="text-xs text-gray-600 mt-1">SU</div>
          </div>
        </div>
        <div className="text-center text-base text-gray-700 mt-4">
          Compatibility Score: <span className={`font-bold text-xl ${getHarmonyColor(harmony.overall)}`}>{coreScore}%</span>
        </div>
      </div>

      <div className="border-t-2 border-gray-200 pt-6">
        <h4 className="font-semibold text-gray-800 mb-4">Harmony Analysis</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
            <span className="text-sm text-gray-700 font-medium">Life Path ↔ Expression</span>
            <span className={`font-semibold px-3 py-1 rounded-full text-sm ${
              pairHasOverEnergy('LP', 'EX') ? 'bg-orange-100 text-orange-800' :
              harmony.lpExpr >= 0.9 ? 'bg-green-100 text-green-800' :
              harmony.lpExpr >= 0.7 ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {getHarmonyLabel(harmony.lpExpr, pairHasOverEnergy('LP', 'EX'))}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
            <span className="text-sm text-gray-700 font-medium">Life Path ↔ Soul Urge</span>
            <span className={`font-semibold px-3 py-1 rounded-full text-sm ${
              pairHasOverEnergy('LP', 'SU') ? 'bg-orange-100 text-orange-800' :
              harmony.lpSoul >= 0.9 ? 'bg-green-100 text-green-800' :
              harmony.lpSoul >= 0.7 ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {getHarmonyLabel(harmony.lpSoul, pairHasOverEnergy('LP', 'SU'))}
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-teal-50 rounded-lg">
            <span className="text-sm text-gray-700 font-medium">Expression ↔ Soul Urge</span>
            <span className={`font-semibold px-3 py-1 rounded-full text-sm ${
              pairHasOverEnergy('EX', 'SU') ? 'bg-orange-100 text-orange-800' :
              harmony.exprSoul >= 0.9 ? 'bg-green-100 text-green-800' :
              harmony.exprSoul >= 0.7 ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {getHarmonyLabel(harmony.exprSoul, pairHasOverEnergy('EX', 'SU'))}
            </span>
          </div>
        </div>
      </div>

      {harmony.hasOverEnergy && harmony.overEnergyDetails && harmony.overEnergyDetails.length > 0 && (
        <div className="mt-6 p-4 bg-orange-50 border-2 border-orange-300 rounded-xl">
          <p className="text-sm text-orange-900 font-semibold mb-2">
            Over-Energy Detected
          </p>
          {harmony.overEnergyDetails.map((detail, idx) => (
            <p key={idx} className="text-sm text-orange-800 mb-1">
              <strong>Number {detail.number}</strong> appears in multiple positions ({detail.positions.join(', ')}),
              creating over-energy: {getOverEnergyEffect(detail.number)}.
            </p>
          ))}
          <p className="text-sm text-orange-900 mt-3">
            <strong>Recommendation:</strong> Use name correction to diversify your core numbers and reduce
            repetitive energy patterns for better life balance.
          </p>
        </div>
      )}

      {!harmony.hasOverEnergy && harmony.overall < 0.9 && (
        <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
          <p className="text-sm text-blue-800">
            <strong>Tip:</strong> Use name correction to align Expression and Soul Urge closer to your
            Life Path ({lifePath}) for improved harmony and life flow.
          </p>
        </div>
      )}
    </div>
  );
}
