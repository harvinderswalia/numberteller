import {
  getLetterValue,
  reduceToSingleDigit,
  calculateLifePath,
  calculateExpression,
  calculateSoulUrge,
  calculateHarmonyScore,
  calculateCoreHarmony,
  calculatePersonalYears,
  calculatePYHarmony,
  cleanName,
} from './numerology';

export interface DesirePreferences {
  expression: number[];
  soulUrge: number[];
  rationale: string;
}

// Helper to convert master numbers to their proper format (11 -> "11/2", etc.)
function formatMasterNumber(num: number): number | string {
  if (num === 11) return '11/2';
  if (num === 22) return '22/4';
  if (num === 33) return '33/6';
  return num;
}

export const DESIRE_CATEGORIES: Record<string, DesirePreferences> = {
  'Career Growth': {
    expression: [1, 3, 5, 8],
    soulUrge: [1, 5, 8],
    rationale: 'Leadership (1), Creativity (3), Versatility (5), Ambition/Power (8)',
  },
  'Relationships/Harmony': {
    expression: [2, 6, 9],
    soulUrge: [2, 6],
    rationale: 'Partnership (2), Nurturing (6), Compassion (9)',
  },
  'Wealth/Abundance': {
    expression: [4, 8],
    soulUrge: [6, 8],
    rationale: 'Stability (4), Material Success (8)',
  },
  'Health/Wellness': {
    expression: [2, 4, 6],
    soulUrge: [4, 9],
    rationale: 'Balance (2/4), Healing (6), Wholeness (9)',
  },
  'Spirituality/Growth': {
    expression: [7, 9, 11],
    soulUrge: [7, 9],
    rationale: 'Introspection (7), Wisdom (9), Intuition (11)',
  },
};

export const NUMBER_MEANINGS = {
  expression: {
    1: 'Leadership and independence',
    2: 'Diplomacy and partnership',
    3: 'Creativity and self-expression',
    4: 'Stability and foundation-building',
    5: 'Versatility and adventure',
    6: 'Nurturing and responsibility',
    7: 'Introspection and analysis',
    8: 'Ambition and material success',
    9: 'Compassion and humanitarianism',
    11: 'Intuition and spiritual insight',
    22: 'Master builder and visionary',
  },
  soulUrge: {
    1: 'Independence and self-determination',
    2: 'Harmony and cooperation',
    3: 'Creative expression and joy',
    4: 'Order and security',
    5: 'Freedom and change',
    6: 'Service and nurturing',
    7: 'Knowledge and spirituality',
    8: 'Power and achievement',
    9: 'Universal love and selflessness',
    11: 'Spiritual illumination',
    22: 'Material mastery',
  },
};

function calculateExpressionSimple(name: string): number | string {
  const MASTER_NUMBERS = [11, 22, 33];
  const KARMIC_DEBT_NUMBERS = [13, 14, 16, 19];

  const parts = name.split(' ').filter(part => part.trim().length > 0);

  // Calculate each part and keep only karmic numbers, reduce master numbers and others
  const reducedParts = parts.map(part => {
    const cleanPart = part.toUpperCase().replace(/[^A-Z]/g, '');
    const sum = cleanPart.split('').reduce((acc, char) => acc + getLetterValue(char), 0);

    // Keep karmic debt numbers unreduced
    if (KARMIC_DEBT_NUMBERS.includes(sum)) {
      return sum;
    }

    // Reduce master numbers and all others
    const reduced = reduceToSingleDigit(sum, false);
    return typeof reduced === 'string' ? parseInt(reduced.split('/')[1]) : reduced;
  });

  // Add the parts together
  const totalSum = reducedParts.reduce((total, num) => total + num, 0);

  // Check if totalSum is a karmic debt number or master number before final reduction
  if (MASTER_NUMBERS.includes(totalSum)) {
    if (totalSum === 11) return '11/2';
    if (totalSum === 22) return '22/4';
    if (totalSum === 33) return '33/6';
  }

  if (KARMIC_DEBT_NUMBERS.includes(totalSum) && totalSum > 9) {
    const reduced = reduceToSingleDigit(totalSum, false);
    const finalDigit = typeof reduced === 'string' ? reduced : reduced;
    return `${totalSum}/${finalDigit}`;
  }

  return reduceToSingleDigit(totalSum, true);
}

function calculateSoulUrgeSimple(name: string): number | string {
  const MASTER_NUMBERS = [11, 22, 33];
  const KARMIC_DEBT_NUMBERS = [13, 14, 16, 19];
  const vowels = 'AEIOU';

  const parts = name.split(' ').filter(part => part.trim().length > 0);

  // Calculate each part and keep only karmic numbers, reduce master numbers and others
  const reducedParts = parts.map(part => {
    const cleanPart = part.toUpperCase().replace(/[^A-Z]/g, '');
    const sum = cleanPart.split('').filter(char => vowels.includes(char)).reduce((acc, char) => acc + getLetterValue(char), 0);

    // Keep karmic debt numbers unreduced
    if (KARMIC_DEBT_NUMBERS.includes(sum)) {
      return sum;
    }

    // Reduce master numbers and all others
    const reduced = reduceToSingleDigit(sum, false);
    return typeof reduced === 'string' ? parseInt(reduced.split('/')[1]) : reduced;
  });

  // Add the parts together
  const totalSum = reducedParts.reduce((total, num) => total + num, 0);

  // Check if totalSum is a karmic debt number or master number before final reduction
  if (MASTER_NUMBERS.includes(totalSum)) {
    if (totalSum === 11) return '11/2';
    if (totalSum === 22) return '22/4';
    if (totalSum === 33) return '33/6';
  }

  if (KARMIC_DEBT_NUMBERS.includes(totalSum) && totalSum > 9) {
    const reduced = reduceToSingleDigit(totalSum, false);
    const finalDigit = typeof reduced === 'string' ? reduced : reduced;
    return `${totalSum}/${finalDigit}`;
  }

  return reduceToSingleDigit(totalSum, true);
}

export interface CurrentCores {
  lifePath: number | string;
  expression: number | string;
  soulUrge: number | string;
  personalYear: number;
}

export interface TargetPair {
  expression: number | string;
  soulUrge: number | string;
  score: number;
  harmonyWithLP: number;
  pyHarmony: number;
  isPerfectCore: boolean;
  rationale: string;
}

export interface NameSuggestion {
  name: string;
  expression: number | string;
  soulUrge: number | string;
  changes: string[];
  changeCount: number;
  coreAlignment: number;
}

export interface NameCorrectionResult {
  current: CurrentCores & {
    expressionMeaning: string;
    soulUrgeMeaning: string;
    analysis: string;
    coreHarmony: {
      lpExpr: number;
      lpSoul: number;
      exprSoul: number;
      overall: number;
      hasOverEnergy: boolean;
      overEnergyDetails?: { number: number; positions: string[] }[];
    };
  };
  targets: TargetPair[];
  suggestions: NameSuggestion[];
  improvementScore: number;
  personalYears: Record<number, number>;
  essenceNumbers: Record<number, number | string>;
}

function calculateTargetScore(
  expr: number,
  soul: number,
  lp: number | string,
  pys: Record<number, number>,
  desirePrefs: DesirePreferences,
  currentExpr: number,
  currentSoul: number
): { score: number; lpHarmony: number; pyHarmony: number; isPerfectCore: boolean; rationale: string } {
  const lpNum = typeof lp === 'string' ? parseInt(lp.split('/').pop() || '0') : lp;
  const isPerfectCore = expr === soul && soul === lpNum;
  const lpExprHarmony = calculateHarmonyScore(lpNum, expr);
  const lpSoulHarmony = calculateHarmonyScore(lpNum, soul);
  const exprSoulSync = calculateHarmonyScore(expr, soul);
  const lpHarmony = (lpExprHarmony + lpSoulHarmony) / 2;

  const pyHarmony = calculatePYHarmony(expr, soul, pys);

  const desireExprFit = desirePrefs.expression.includes(expr) ? 1 : 0.5;
  const desireSoulFit = desirePrefs.soulUrge.includes(soul) ? 1 : 0.5;
  const desireFit = (desireExprFit + desireSoulFit) / 2;

  const changeCost = Math.abs(expr - currentExpr) + Math.abs(soul - currentSoul);
  const minimalChange = 1 / (1 + changeCost * 0.15);

  let score = (lpHarmony * 0.4) + (pyHarmony * 0.25) + (desireFit * 0.2) + (exprSoulSync * 0.15);

  const perfectCoreBonus = isPerfectCore ? 0.3 : 0;
  score += perfectCoreBonus;

  let rationale = '';
  if (isPerfectCore) {
    rationale = `Perfect Core: EX=${expr}, SU=${soul}, LP=${lpNum} - Ultimate alignment!`;
  } else if (lpHarmony >= 0.8) {
    rationale = `Strong LP harmony (${Math.round(lpHarmony * 100)}%) with good PY alignment`;
  } else {
    rationale = `Moderate alignment with ${desirePrefs.rationale}`;
  }

  return { score, lpHarmony, pyHarmony, isPerfectCore, rationale };
}

function isKarmicNumber(num: number): boolean {
  return num === 13 || num === 14 || num === 16 || num === 19;
}

function hasProblematicCombination(expr: number, soul: number): boolean {
  if (expr === soul) return true;

  const problematicPairs = [
    [1, 2], [2, 1],    // Leadership vs Partnership conflict
    [1, 9], [9, 1],    // Self-focus vs Universal service conflict
    [2, 5], [5, 2],    // Stability vs Change conflict
    [2, 7], [7, 2],    // Social vs Solitary conflict
    [3, 4], [4, 3],    // Creativity vs Structure conflict
    [4, 5], [5, 4],    // Routine vs Freedom conflict
    [5, 7], [7, 5],    // Scattered vs Focused conflict
    [7, 9], [9, 7],    // Introspection vs Outward service conflict
    [8, 9], [9, 8]     // Material vs Spiritual conflict
  ];

  return problematicPairs.some(([a, b]) => expr === a && soul === b);
}

function hasEssenceConflict(expr: number, soul: number, essence: number): boolean {
  // Check if Essence creates a conflicting triangle with Expression and Soul Urge
  const conflictTriangles = [
    // 1-9 conflicts
    [1, 9], [9, 1],
    // Strong material-spiritual conflicts
    [8, 9], [9, 8],
    // Freedom-stability conflicts
    [4, 5], [5, 4],
    // Social-solitary conflicts
    [2, 7], [7, 2],
  ];

  // Check if essence conflicts with either expr or soul
  const essExprConflict = conflictTriangles.some(([a, b]) =>
    (a === essence && b === expr) || (b === essence && a === expr)
  );

  const essSoulConflict = conflictTriangles.some(([a, b]) =>
    (a === essence && b === soul) || (b === essence && a === soul)
  );

  return essExprConflict || essSoulConflict;
}

export function generateTargets(
  current: CurrentCores,
  desireCategory: string,
  pys: Record<number, number>,
  currentEssence?: number,
  bdNum?: number
): TargetPair[] {
  const prefs = DESIRE_CATEGORIES[desireCategory];
  if (!prefs) return [];

  const targets: TargetPair[] = [];

  const currentExprNum = typeof current.expression === 'string' ? parseInt(current.expression.split('/').pop() || '0') : current.expression;
  const currentSoulNum = typeof current.soulUrge === 'string' ? parseInt(current.soulUrge.split('/').pop() || '0') : current.soulUrge;
  const lpNum = typeof current.lifePath === 'string' ? parseInt(current.lifePath.split('/').pop() || '0') : current.lifePath;

  // For master numbers, get both the full value and reduced value
  const lpFull = typeof current.lifePath === 'string' && current.lifePath.includes('/')
    ? parseInt(current.lifePath.split('/')[0])
    : lpNum;

  // Detect over-energy: BD or LP repeating in EX or SU
  const hasOverEnergy = (bdNum && (bdNum === currentExprNum || bdNum === currentSoulNum)) ||
                        (lpNum === currentExprNum || lpNum === currentSoulNum) ||
                        (lpFull !== lpNum && (lpFull === currentExprNum || lpFull === currentSoulNum));

  // Core numbers to avoid in suggestions
  // Always add the reduced LP number
  const coreNumbers = new Set<number>([lpNum]);

  // Add the master number part if LP is a master number (e.g., 11 from 11/2, 22 from 22/4)
  if (lpFull !== lpNum) {
    coreNumbers.add(lpFull);
  }

  // Add Birth Date number
  if (bdNum && bdNum > 0) {
    coreNumbers.add(bdNum);
  }

  for (const expr of prefs.expression) {
    // CRITICAL: Skip if expression matches any core number
    if (coreNumbers.has(expr)) continue;

    for (const soul of prefs.soulUrge) {
      // CRITICAL: Skip soul urge if it matches any core number
      if (coreNumbers.has(soul)) continue;

      if (hasProblematicCombination(expr, soul)) continue;

      // Check Essence conflicts if current year essence is provided
      if (currentEssence && hasEssenceConflict(expr, soul, currentEssence)) continue;

      const { score, lpHarmony, pyHarmony, isPerfectCore, rationale } = calculateTargetScore(
        expr,
        soul,
        current.lifePath,
        pys,
        prefs,
        currentExprNum,
        currentSoulNum
      );

      // Boost score if fixing over-energy
      let adjustedScore = score;
      if (hasOverEnergy && expr !== currentExprNum && soul !== currentSoulNum) {
        adjustedScore += 0.2; // Prioritize changes that fix over-energy
      }

      // Only add targets that provide meaningful improvement
      if (lpHarmony >= 0.4 || isPerfectCore) {
        targets.push({
          expression: formatMasterNumber(expr),
          soulUrge: formatMasterNumber(soul),
          score: adjustedScore,
          harmonyWithLP: lpHarmony,
          pyHarmony,
          isPerfectCore,
          rationale: hasOverEnergy && expr !== currentExprNum && soul !== currentSoulNum
            ? `Fixes over-energy + ${rationale}`
            : rationale,
        });
      }
    }
  }

  return targets.sort((a, b) => {
    if (a.isPerfectCore && !b.isPerfectCore) return -1;
    if (!a.isPerfectCore && b.isPerfectCore) return 1;
    return b.score - a.score;
  }).slice(0, 8);
}

function applyNameTweakToPart(part: string, tweak: string): string[] {
  const variations: string[] = [];

  switch (tweak) {
    case 'double_e':
      if (part.toLowerCase().includes('e')) {
        variations.push(part.replace(/e(?=[^e]|$)/gi, 'ee'));
      }
      break;
    case 'add_e':
      if (!part.toLowerCase().endsWith('e')) {
        variations.push(part + 'e');
      }
      break;
    case 'c_to_k':
      if (part.toLowerCase().includes('c')) {
        variations.push(part.replace(/c/gi, 'k'));
      }
      break;
    case 'k_to_c':
      if (part.toLowerCase().includes('k')) {
        variations.push(part.replace(/k/gi, 'c'));
      }
      break;
    case 'ph_to_f':
      if (part.toLowerCase().includes('ph')) {
        variations.push(part.replace(/ph/gi, 'f'));
      }
      break;
    case 'add_h':
      variations.push(part + 'h');
      break;
    case 'double_n':
      if (part.toLowerCase().includes('n')) {
        variations.push(part.replace(/n(?=[^n]|$)/gi, 'nn'));
      }
      break;
    case 'add_a':
      variations.push(part + 'a');
      break;
    case 'i_to_y':
      if (part.toLowerCase().includes('i')) {
        variations.push(part.replace(/i/gi, 'y'));
      }
      break;
    case 'y_to_i':
      if (part.toLowerCase().includes('y')) {
        variations.push(part.replace(/y/gi, 'i'));
      }
      break;
    case 'double_s':
      if (part.toLowerCase().includes('s')) {
        variations.push(part.replace(/s(?=[^s]|$)/gi, 'ss'));
      }
      break;
    case 'add_i':
      variations.push(part + 'i');
      break;
  }

  return variations;
}

function applyNameTweak(name: string, tweak: string): string[] {
  const parts = name.split(' ');
  const allVariations: string[] = [];

  // Try applying the tweak to each part separately
  parts.forEach((part, index) => {
    const partVariations = applyNameTweakToPart(part, tweak);
    partVariations.forEach(variation => {
      const newParts = [...parts];
      newParts[index] = variation;
      allVariations.push(newParts.join(' '));
    });
  });

  return allVariations;
}

function getChanges(original: string, modified: string): string[] {
  const changes: string[] = [];
  const origParts = original.split(' ');
  const modParts = modified.split(' ');

  // Check which part changed
  origParts.forEach((origPart, index) => {
    if (modParts[index] && origPart.toLowerCase() !== modParts[index].toLowerCase()) {
      const partName = index === 0 ? 'First' : index === origParts.length - 1 ? 'Last' : 'Middle';
      changes.push(`${partName}: ${origPart} → ${modParts[index]}`);
    }
  });

  return changes.length > 0 ? changes : ['Minor spelling variation'];
}

export function generateNameSuggestions(
  originalName: string,
  targets: TargetPair[],
  lifePath: number | string
): NameSuggestion[] {
  const lifePathNum = typeof lifePath === 'string' ? parseInt(lifePath.split('/').pop() || '0') : lifePath;
  const suggestions: NameSuggestion[] = [];
  const tweaks = [
    'add_e', 'double_e', 'c_to_k', 'k_to_c', 'ph_to_f',
    'add_h', 'double_n', 'add_a', 'i_to_y', 'y_to_i', 'double_s', 'add_i'
  ];

  const seenNames = new Set<string>();
  seenNames.add(originalName.toLowerCase().replace(/\s/g, ''));

  for (const target of targets.slice(0, 5)) {
    for (const tweak of tweaks) {
      if (suggestions.length >= 50) break;

      const modifiedNames = applyNameTweak(originalName, tweak);

      for (const modifiedName of modifiedNames) {
        if (suggestions.length >= 50) break;

        const normalizedName = modifiedName.toLowerCase().replace(/\s/g, '');
        if (seenNames.has(normalizedName)) continue;

        const newExprRaw = calculateExpressionSimple(modifiedName);
        const newSoulRaw = calculateSoulUrgeSimple(modifiedName);

        const newExpr = typeof newExprRaw === 'string' ? parseInt(newExprRaw.split('/').pop() || '0') : newExprRaw;
        const newSoul = typeof newSoulRaw === 'string' ? parseInt(newSoulRaw.split('/').pop() || '0') : newSoulRaw;

        if (isKarmicNumber(newExpr) || isKarmicNumber(newSoul)) continue;

        if (newExpr === target.expression && newSoul === target.soulUrge) {
          const lpExprHarmony = calculateHarmonyScore(lifePathNum, newExpr);
          const lpSoulHarmony = calculateHarmonyScore(lifePathNum, newSoul);
          const exprSoulHarmony = calculateHarmonyScore(newExpr, newSoul);
          const coreAlignment = (lpExprHarmony + lpSoulHarmony + exprSoulHarmony) / 3;

          if (coreAlignment >= 0.4) {
            const changes = getChanges(originalName, modifiedName);
            const changeCount = Math.abs(modifiedName.length - originalName.length) +
                               modifiedName.split('').filter((c, i) => c.toLowerCase() !== originalName[i]?.toLowerCase()).length;

            if (changeCount <= 6) {
              suggestions.push({
                name: modifiedName,
                expression: formatMasterNumber(newExpr),
                soulUrge: formatMasterNumber(newSoul),
                changes,
                changeCount,
                coreAlignment,
              });
              seenNames.add(normalizedName);
            }
          }
        }
      }
    }
  }

  return suggestions
    .sort((a, b) => b.coreAlignment - a.coreAlignment)
    .slice(0, 8);
}

function parseDateString(dateStr: string): Date {
  const parts = dateStr.split('/');
  if (parts.length !== 3) {
    throw new Error('Invalid date format. Expected DD/MM/YYYY');
  }
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);
  return new Date(year, month, day);
}

function calculateEssenceForAge(fullName: string, age: number): number | string {
  const names = fullName.trim().split(/\s+/);
  let totalValue = 0;

  for (const name of names) {
    const cleanedName = cleanName(name);
    if (cleanedName.length === 0) continue;

    let currentAge = 0;
    let letterIndex = 0;

    while (currentAge <= age) {
      const letter = cleanedName[letterIndex % cleanedName.length];
      const value = getLetterValue(letter);
      const reducedValue = typeof reduceToSingleDigit(value) === 'string'
        ? parseInt(reduceToSingleDigit(value).toString().split('/')[1])
        : reduceToSingleDigit(value);

      if (currentAge + reducedValue > age) {
        totalValue += value;
        break;
      }

      currentAge += reducedValue;
      letterIndex++;
    }
  }

  return reduceToSingleDigit(totalValue);
}

function calculateEssenceForYears(fullName: string, birthDate: Date, years: number[]): Record<number, number | string> {
  const birthYear = birthDate.getFullYear();
  const essenceNumbers: Record<number, number | string> = {};

  for (const year of years) {
    const age = year - birthYear;
    essenceNumbers[year] = calculateEssenceForAge(fullName, age);
  }

  return essenceNumbers;
}

export function analyzeNameCorrection(
  fullName: string,
  birthDate: string,
  desireCategory: string
): NameCorrectionResult {
  const birthDateObj = parseDateString(birthDate);
  const lifePath = calculateLifePath(birthDateObj);
  const lifePathNum = typeof lifePath === 'string' ? parseInt(lifePath.split('/').pop() || '0') : lifePath;

  // Calculate Birth Date number
  const parts = birthDate.split('/');
  let bdNum = 0;
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    bdNum = day > 9 ? (Math.floor(day / 10) + (day % 10)) : day;
    while (bdNum > 9) {
      bdNum = Math.floor(bdNum / 10) + (bdNum % 10);
    }
  }

  const expression = calculateExpressionSimple(fullName);
  const expressionNum = typeof expression === 'string' ? parseInt(expression.split('/').pop() || '0') : expression;

  const soulUrge = calculateSoulUrgeSimple(fullName);
  const soulUrgeNum = typeof soulUrge === 'string' ? parseInt(soulUrge.split('/').pop() || '0') : soulUrge;

  const personalYears = calculatePersonalYears(birthDateObj, 3);
  const currentYear = new Date().getFullYear();
  const personalYear = personalYears[currentYear];

  const coreHarmony = calculateCoreHarmony(lifePathNum, expressionNum, soulUrgeNum, bdNum);

  const current: CurrentCores = { lifePath: lifePathNum, expression: expressionNum, soulUrge: soulUrgeNum, personalYear };

  const expressionMeaning = NUMBER_MEANINGS.expression[expressionNum as keyof typeof NUMBER_MEANINGS.expression] || 'Unique path';
  const soulUrgeMeaning = NUMBER_MEANINGS.soulUrge[soulUrgeNum as keyof typeof NUMBER_MEANINGS.soulUrge] || 'Unique desire';

  const isPerfectCore = lifePathNum === expressionNum && expressionNum === soulUrgeNum;
  const coreScore = Math.round(coreHarmony.overall * 100);

  // Detect over-energy (repeated core numbers)
  const repeatedNumbers: { number: number; positions: string[] }[] = [];
  const numberCount = new Map<number, string[]>();

  if (bdNum > 0) numberCount.set(bdNum, [...(numberCount.get(bdNum) || []), 'BD']);
  numberCount.set(lifePathNum, [...(numberCount.get(lifePathNum) || []), 'LP']);
  numberCount.set(expressionNum, [...(numberCount.get(expressionNum) || []), 'EX']);
  numberCount.set(soulUrgeNum, [...(numberCount.get(soulUrgeNum) || []), 'SU']);

  numberCount.forEach((positions, num) => {
    if (positions.length > 1) {
      repeatedNumbers.push({ number: num, positions });
    }
  });

  const hasOverEnergy = repeatedNumbers.length > 0;
  const hasCoreRepetition = repeatedNumbers.some(({ positions }) =>
    (positions.includes('BD') || positions.includes('LP')) && (positions.includes('EX') || positions.includes('SU'))
  );

  const lifePathDisplay = typeof lifePath === 'string' ? lifePath : String(lifePath);
  const expressionDisplay = typeof expression === 'string' ? expression : String(expression);
  const soulUrgeDisplay = typeof soulUrge === 'string' ? soulUrge : String(soulUrge);

  let analysis = '';
  if (hasCoreRepetition) {
    const repeatedNum = repeatedNumbers.find(({ positions }) =>
      (positions.includes('BD') || positions.includes('LP')) && (positions.includes('EX') || positions.includes('SU'))
    );
    if (repeatedNum) {
      analysis = `CRITICAL: Over-Energy Detected! Your core foundation number ${repeatedNum.number} (${repeatedNum.positions.join(', ')}) is repeating across multiple positions. This creates an excessive amplification that can lead to imbalance and blocks your progress toward ${desireCategory.toLowerCase()}. It's essential to change your Expression and/or Soul Urge through name correction to create proper energy balance. See the suggested name corrections below that will harmonize your chart while supporting your goals.`;
    }
  } else if (isPerfectCore) {
    analysis = `Perfect Core Alignment! Your Life Path (${lifePathDisplay}), Expression (${expressionDisplay}), and Soul Urge (${soulUrgeDisplay}) are unified - your destiny, actions, and desires flow in complete harmony toward ${desireCategory.toLowerCase()}. This rare alignment means minimal internal conflict and maximum potential for manifesting your goals.`;
  } else if (coreHarmony.overall >= 0.9) {
    analysis = `Exceptional core harmony (${coreScore}%)! Your Life Path ${lifePathDisplay} guides you toward a specific destiny. Expression ${expressionDisplay} (${expressionMeaning.toLowerCase()}) shows how you naturally interact with the world, and Soul Urge ${soulUrgeDisplay} (${soulUrgeMeaning.toLowerCase()}) reveals your deepest motivations. These work together beautifully for ${desireCategory.toLowerCase()}.`;
  } else if (coreHarmony.overall >= 0.7) {
    analysis = `Good harmony (${coreScore}%). Your Life Path ${lifePathDisplay} sets your life's direction. Expression ${expressionDisplay} (${expressionMeaning.toLowerCase()}) represents how you express yourself, while Soul Urge ${soulUrgeDisplay} (${soulUrgeMeaning.toLowerCase()}) drives your inner desires. Small adjustments through name correction could enhance alignment for ${desireCategory.toLowerCase()}.`;
  } else {
    analysis = `Your Life Path ${lifePathDisplay} is the foundation - it never changes. Expression ${expressionDisplay} (${expressionMeaning.toLowerCase()}) and Soul Urge ${soulUrgeDisplay} (${soulUrgeMeaning.toLowerCase()}) currently show ${coreScore}% harmony. There's potential for creating stronger alignment through name correction to better support ${desireCategory.toLowerCase()}.`;
  }

  // Calculate Essence for the same years as Personal Years
  const years = Object.keys(personalYears).map(y => parseInt(y));
  const essenceNumbers = calculateEssenceForYears(fullName, birthDateObj, years);

  // Get current year's essence to avoid conflicts
  const currentYearEssence = essenceNumbers[currentYear];
  const currentEssenceNum = typeof currentYearEssence === 'string' ? parseInt(currentYearEssence.split('/').pop() || '0') : currentYearEssence;

  const targets = generateTargets(current, desireCategory, personalYears, currentEssenceNum, bdNum);
  const suggestions = generateNameSuggestions(fullName, targets, lifePathNum);

  const improvementScore = targets.length > 0 ? Math.round(targets[0].score * 100) : coreScore;

  return {
    current: {
      lifePath,
      expression,
      soulUrge,
      personalYear,
      expressionMeaning,
      soulUrgeMeaning,
      analysis,
      coreHarmony,
    },
    targets,
    suggestions,
    improvementScore,
    personalYears,
    essenceNumbers,
  };
}
