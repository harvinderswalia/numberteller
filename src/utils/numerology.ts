const LETTER_VALUES: Record<string, number> = {
  A: 1, J: 1, S: 1,
  B: 2, K: 2, T: 2,
  C: 3, L: 3, U: 3,
  D: 4, M: 4, V: 4,
  E: 5, N: 5, W: 5,
  F: 6, O: 6, X: 6,
  G: 7, P: 7, Y: 7,
  H: 8, Q: 8, Z: 8,
  I: 9, R: 9,
};

const VOWELS = ['A', 'E', 'I', 'O', 'U'];
const MASTER_NUMBERS = [11, 22, 33];
const KARMIC_DEBT_NUMBERS = [13, 14, 16, 19];

export function reduceToSingleDigit(num: number, allowMaster = true): number | string {
  let currentNum = num;
  let karmicDebtFound = false;
  let karmicDebtNumber = 0;

  while (currentNum > 9) {
    if (allowMaster && MASTER_NUMBERS.includes(currentNum)) {
      if (currentNum === 11) return '11/2';
      if (currentNum === 22) return '22/4';
      if (currentNum === 33) return '33/6';
      return currentNum;
    }

    if (allowMaster && !karmicDebtFound && KARMIC_DEBT_NUMBERS.includes(currentNum)) {
      karmicDebtFound = true;
      karmicDebtNumber = currentNum;
    }

    currentNum = currentNum.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  }

  if (allowMaster && karmicDebtFound) {
    return `${karmicDebtNumber}/${currentNum}`;
  }

  return currentNum;
}

export function getLetterValue(letter: string): number {
  return LETTER_VALUES[letter.toUpperCase()] || 0;
}

export function isVowel(letter: string, word: string, index: number): boolean {
  const upper = letter.toUpperCase();
  if (VOWELS.includes(upper)) return true;

  if (upper === 'Y') {
    if (index === 0) return false;
    const prevChar = word[index - 1]?.toUpperCase();
    return !VOWELS.includes(prevChar);
  }

  return false;
}

export function cleanName(name: string): string {
  return name.replace(/[^a-zA-Z]/g, '').toUpperCase();
}

export function calculateKuaNumber(birthDate: Date, gender: 'male' | 'female'): number {
  const year = birthDate.getFullYear();
  const lastTwoDigits = year % 100;

  // Step 1: reduce last two digits of birth year to a single digit
  let sum = Math.floor(lastTwoDigits / 10) + (lastTwoDigits % 10);
  while (sum > 9) {
    sum = Math.floor(sum / 10) + (sum % 10);
  }

  // Step 2: apply gender formula — constants differ for born 2000+
  const post2000 = year >= 2000;
  let kua: number;
  if (gender === 'male') {
    kua = (post2000 ? 9 : 10) - sum;
    // 9 - 9 = 0 for years like 2009, 2018, 2027 … treat as 9
    if (kua === 0) kua = 9;
  } else {
    kua = sum + (post2000 ? 6 : 5);
  }

  // Reduce to single digit if needed
  while (kua > 9) {
    kua = Math.floor(kua / 10) + (kua % 10);
  }

  // Kua 5 has no trigram — males use 2, females use 8
  if (kua === 5) kua = gender === 'male' ? 2 : 8;

  return kua;
}

export function calculateLifePath(birthDate: Date): number | string {
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  const year = birthDate.getFullYear();

  const sum = month.toString().split('').reduce((s, d) => s + parseInt(d), 0) +
              day.toString().split('').reduce((s, d) => s + parseInt(d), 0) +
              year.toString().split('').reduce((s, d) => s + parseInt(d), 0);

  return reduceToSingleDigit(sum);
}

export function calculateExpression(fullName: string): number | string {
  const cleaned = cleanName(fullName);
  const sum = cleaned.split('').reduce((total, letter) => {
    return total + getLetterValue(letter);
  }, 0);

  return reduceToSingleDigit(sum);
}

export function calculateExpressionFromParts(firstName: string, middleName: string, lastName: string): number | string {
  const parts = [firstName, middleName, lastName].filter(part => part.trim().length > 0);

  const reducedParts = parts.map(part => {
    const cleaned = cleanName(part);
    const sum = cleaned.split('').reduce((total, letter) => {
      return total + getLetterValue(letter);
    }, 0);

    // Keep only karmic debt numbers unreduced
    if (KARMIC_DEBT_NUMBERS.includes(sum)) {
      return sum;
    }

    // Reduce master numbers and all others
    const reduced = reduceToSingleDigit(sum, false);
    return typeof reduced === 'string' ? parseInt(reduced.split('/')[1]) : reduced;
  });

  const totalSum = reducedParts.reduce((total, num) => total + num, 0);

  // Check if totalSum is a karmic debt number or master number before reducing
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

  return reduceToSingleDigit(totalSum);
}

export function calculateSoulUrge(fullName: string): number | string {
  const cleaned = cleanName(fullName);
  const sum = cleaned.split('').reduce((total, letter, index) => {
    if (isVowel(letter, cleaned, index)) {
      return total + getLetterValue(letter);
    }
    return total;
  }, 0);

  return reduceToSingleDigit(sum);
}

export function calculateSoulUrgeFromParts(firstName: string, middleName: string, lastName: string): number | string {
  const parts = [firstName, middleName, lastName].filter(part => part.trim().length > 0);

  const reducedParts = parts.map(part => {
    const cleaned = cleanName(part);
    const sum = cleaned.split('').reduce((total, letter, index) => {
      if (isVowel(letter, cleaned, index)) {
        return total + getLetterValue(letter);
      }
      return total;
    }, 0);

    // Keep only karmic debt numbers unreduced
    if (KARMIC_DEBT_NUMBERS.includes(sum)) {
      return sum;
    }

    // Reduce master numbers and all others
    const reduced = reduceToSingleDigit(sum, false);
    return typeof reduced === 'string' ? parseInt(reduced.split('/')[1]) : reduced;
  });

  const totalSum = reducedParts.reduce((total, num) => total + num, 0);

  // Check if totalSum is a karmic debt number or master number before reducing
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

  return reduceToSingleDigit(totalSum);
}

export function calculatePersonality(fullName: string): number | string {
  const cleaned = cleanName(fullName);
  const sum = cleaned.split('').reduce((total, letter, index) => {
    if (!isVowel(letter, cleaned, index)) {
      return total + getLetterValue(letter);
    }
    return total;
  }, 0);

  return reduceToSingleDigit(sum);
}

export function calculatePersonalityFromParts(firstName: string, middleName: string, lastName: string): number | string {
  const parts = [firstName, middleName, lastName].filter(part => part.trim().length > 0);

  const reducedParts = parts.map(part => {
    const cleaned = cleanName(part);
    const sum = cleaned.split('').reduce((total, letter, index) => {
      if (!isVowel(letter, cleaned, index)) {
        return total + getLetterValue(letter);
      }
      return total;
    }, 0);

    // Keep only karmic debt numbers unreduced
    if (KARMIC_DEBT_NUMBERS.includes(sum)) {
      return sum;
    }

    // Reduce master numbers and all others
    const reduced = reduceToSingleDigit(sum, false);
    return typeof reduced === 'string' ? parseInt(reduced.split('/')[1]) : reduced;
  });

  const totalSum = reducedParts.reduce((total, num) => total + num, 0);

  // Check if totalSum is a karmic debt number or master number before reducing
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

  return reduceToSingleDigit(totalSum);
}

export function calculateBirthday(birthDate: Date): number | string {
  const day = birthDate.getDate();
  return reduceToSingleDigit(day);
}

export function calculateMaturity(lifePath: number | string, expression: number | string): number | string {
  const lifePathNum = typeof lifePath === 'string' ? parseInt(lifePath.split('/')[1]) : lifePath;
  const expressionNum = typeof expression === 'string' ? parseInt(expression.split('/')[1]) : expression;
  return reduceToSingleDigit(lifePathNum + expressionNum);
}

export function calculateAttitude(birthDate: Date): number | string {
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  const sum = month.toString().split('').reduce((s, d) => s + parseInt(d), 0) +
              day.toString().split('').reduce((s, d) => s + parseInt(d), 0);
  return reduceToSingleDigit(sum);
}

export function calculateRationalThought(birthDate: Date): number | string {
  const month = birthDate.getMonth() + 1;
  const year = birthDate.getFullYear();
  const monthReduced = reduceToSingleDigit(month);
  const yearReduced = reduceToSingleDigit(year);
  const monthNum = typeof monthReduced === 'string' ? parseInt(monthReduced.split('/')[1]) : monthReduced;
  const yearNum = typeof yearReduced === 'string' ? parseInt(yearReduced.split('/')[1]) : yearReduced;
  return reduceToSingleDigit(monthNum + yearNum);
}

export function calculatePersonalYear(birthDate: Date, currentYear: number): number | string {
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  const sum = month.toString().split('').reduce((s, d) => s + parseInt(d), 0) +
              day.toString().split('').reduce((s, d) => s + parseInt(d), 0) +
              currentYear.toString().split('').reduce((s, d) => s + parseInt(d), 0);
  return reduceToSingleDigit(sum, false);
}

export function calculateUniversalYear(year: number): number | string {
  return reduceToSingleDigit(year, false);
}

export function calculateKarmicLessons(fullName: string): number[] {
  const cleaned = cleanName(fullName);
  const presentNumbers = new Set<number>();

  cleaned.split('').forEach(letter => {
    presentNumbers.add(getLetterValue(letter));
  });

  const lessons: number[] = [];
  for (let i = 1; i <= 9; i++) {
    if (!presentNumbers.has(i)) {
      lessons.push(i);
    }
  }

  return lessons;
}

export function calculateModifiedKarmicLessons(
  karmicLessons: number[],
  coreNumbers: number[]
): { number: number; modified: boolean }[] {
  return karmicLessons.map(lesson => ({
    number: lesson,
    modified: coreNumbers.includes(lesson)
  }));
}

export function calculatePeriodCycles(birthDate: Date, lifePath: number | string) {
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  const year = birthDate.getFullYear();

  const firstPeriod = reduceToSingleDigit(month);
  const secondPeriod = reduceToSingleDigit(day);
  const thirdPeriod = reduceToSingleDigit(year);

  const lifePathNum = typeof lifePath === 'string' ? parseInt(lifePath.split('/')[1]) : lifePath;
  const firstAge = 36 - lifePathNum;

  return {
    first: { value: firstPeriod, ageRange: `0-${firstAge}` },
    second: { value: secondPeriod, ageRange: `${firstAge + 1}-${firstAge + 9}` },
    third: { value: thirdPeriod, ageRange: `${firstAge + 10}+` }
  };
}

export function calculatePinnacles(birthDate: Date, lifePath: number | string) {
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  const year = birthDate.getFullYear();

  const monthReduced = reduceToSingleDigit(month);
  const dayReduced = reduceToSingleDigit(day);
  const yearReduced = reduceToSingleDigit(year);

  const monthNum = typeof monthReduced === 'string' ? parseInt(monthReduced.split('/')[1]) : monthReduced;
  const dayNum = typeof dayReduced === 'string' ? parseInt(dayReduced.split('/')[1]) : dayReduced;
  const yearNum = typeof yearReduced === 'string' ? parseInt(yearReduced.split('/')[1]) : yearReduced;

  const first = reduceToSingleDigit(monthNum + dayNum);
  const second = reduceToSingleDigit(dayNum + yearNum);
  const firstNum = typeof first === 'string' ? parseInt(first.split('/')[1]) : first;
  const secondNum = typeof second === 'string' ? parseInt(second.split('/')[1]) : second;
  const third = reduceToSingleDigit(firstNum + secondNum);
  const fourth = reduceToSingleDigit(monthNum + yearNum);

  const lifePathNum = typeof lifePath === 'string' ? parseInt(lifePath.split('/')[1]) : lifePath;
  const firstAge = 36 - lifePathNum;

  return {
    first: { value: first, ageRange: `0-${firstAge}` },
    second: { value: second, ageRange: `${firstAge + 1}-${firstAge + 9}` },
    third: { value: third, ageRange: `${firstAge + 10}-${firstAge + 18}` },
    fourth: { value: fourth, ageRange: `${firstAge + 19}+` }
  };
}

export function calculateChallenges(birthDate: Date, lifePath: number | string) {
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  const year = birthDate.getFullYear();

  const monthDigitsSum = month.toString().split('').reduce((s, d) => s + parseInt(d), 0);
  const dayDigitsSum = day.toString().split('').reduce((s, d) => s + parseInt(d), 0);
  const yearDigitsSum = year.toString().split('').reduce((s, d) => s + parseInt(d), 0);

  const firstRaw = Math.abs(monthDigitsSum - dayDigitsSum);
  const secondRaw = Math.abs(dayDigitsSum - yearDigitsSum);
  const thirdRaw = Math.abs(firstRaw - secondRaw);
  const fourthRaw = Math.abs(monthDigitsSum - yearDigitsSum);

  const first = firstRaw > 9 ? reduceToSingleDigit(firstRaw, false) : firstRaw;
  const second = secondRaw > 9 ? reduceToSingleDigit(secondRaw, false) : secondRaw;
  const third = thirdRaw > 9 ? reduceToSingleDigit(thirdRaw, false) : thirdRaw;
  const fourth = fourthRaw > 9 ? reduceToSingleDigit(fourthRaw, false) : fourthRaw;

  const lifePathNum = typeof lifePath === 'string' ? parseInt(lifePath.split('/')[1]) : lifePath;
  const firstAge = 36 - lifePathNum;

  return {
    first: { value: first, ageRange: `0-${firstAge}` },
    second: { value: second, ageRange: `${firstAge + 1}-${firstAge + 9}` },
    third: { value: third, ageRange: `${firstAge + 10}-${firstAge + 18}` },
    fourth: { value: fourth, ageRange: `${firstAge + 19}+` }
  };
}

export function calculateEssence(personalYear: number | string, lifePath: number | string): number | string {
  const personalYearNum = typeof personalYear === 'string' ? parseInt(personalYear.split('/')[1]) : personalYear;
  const lifePathNum = typeof lifePath === 'string' ? parseInt(lifePath.split('/')[1]) : lifePath;
  return reduceToSingleDigit(personalYearNum + lifePathNum);
}

export function calculatePrimeIntensifier(fullName: string): number {
  const cleaned = cleanName(fullName);
  const frequency: Record<number, number> = {};

  cleaned.split('').forEach(letter => {
    const value = getLetterValue(letter);
    frequency[value] = (frequency[value] || 0) + 1;
  });

  let maxFreq = 0;
  let primeNumber = 1;

  for (let i = 9; i >= 1; i--) {
    if (frequency[i] >= maxFreq) {
      maxFreq = frequency[i];
      primeNumber = i;
    }
  }

  return primeNumber;
}

export function getRulingPlanet(number: number | string): string {
  const num = typeof number === 'string' ? parseInt(number.split('/')[1]) : number;
  const planets: Record<number, string> = {
    1: 'Sun',
    2: 'Moon',
    3: 'Jupiter',
    4: 'Uranus/Rahu',
    5: 'Mercury',
    6: 'Venus',
    7: 'Neptune/Ketu',
    8: 'Saturn',
    9: 'Mars',
    11: 'Moon',
    22: 'Uranus/Rahu',
    33: 'Jupiter'
  };
  return planets[num] || 'Unknown';
}

export function getHarmonyNumbers(number: number | string): number[] {
  const num = typeof number === 'string' ? parseInt(number.split('/')[1]) : number;
  const base = num > 9 ? (typeof reduceToSingleDigit(num, false) === 'string' ? parseInt((reduceToSingleDigit(num, false) as string).split('/')[1]) : reduceToSingleDigit(num, false)) : num;
  const harmony: number[] = [];

  if (base > 1) harmony.push(base - 1);
  if (base < 9) harmony.push(base + 1);

  return harmony;
}

export function getFavourableColours(number: number | string): string[] {
  const num = typeof number === 'string' ? parseInt(number.split('/')[1]) : number;
  const colours: Record<number, string[]> = {
    1: ['Gold', 'Yellow', 'Orange'],
    2: ['White', 'Silver', 'Cream'],
    3: ['Yellow', 'Light Purple', 'Pink'],
    4: ['Blue', 'Green', 'Grey'],
    5: ['Light Blue', 'Turquoise', 'Silver'],
    6: ['Blue', 'Indigo', 'Pink'],
    7: ['Violet', 'Purple', 'White'],
    8: ['Dark Blue', 'Black', 'Navy'],
    9: ['Red', 'Crimson', 'Maroon'],
    11: ['Silver', 'White', 'Pale Blue'],
    22: ['Coral', 'Rust', 'Earth Tones'],
    33: ['Sea Green', 'Aquamarine', 'Teal']
  };
  return colours[num] || ['White'];
}

export function getFirstLetter(fullName: string): { letter: string; value: number } {
  const cleaned = cleanName(fullName);
  const letter = cleaned[0] || 'A';
  return { letter, value: getLetterValue(letter) };
}

export function getFirstVowel(fullName: string): { letter: string; value: number } {
  const cleaned = cleanName(fullName);
  for (let i = 0; i < cleaned.length; i++) {
    if (isVowel(cleaned[i], cleaned, i)) {
      const letter = cleaned[i];
      return { letter, value: getLetterValue(letter) };
    }
  }
  return { letter: 'A', value: 1 };
}

export function getZodiacSign(birthDate: Date): { sign: string; element: string } {
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return { sign: 'Aries', element: 'Fire' };
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return { sign: 'Taurus', element: 'Earth' };
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return { sign: 'Gemini', element: 'Air' };
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return { sign: 'Cancer', element: 'Water' };
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return { sign: 'Leo', element: 'Fire' };
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return { sign: 'Virgo', element: 'Earth' };
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return { sign: 'Libra', element: 'Air' };
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return { sign: 'Scorpio', element: 'Water' };
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return { sign: 'Sagittarius', element: 'Fire' };
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return { sign: 'Capricorn', element: 'Earth' };
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return { sign: 'Aquarius', element: 'Air' };
  } else {
    return { sign: 'Pisces', element: 'Water' };
  }
}

export function generateLoshuGrid(fullName: string): {
  grid: (number | null)[][];
  missingNumbers: number[];
  arrows: string[];
} {
  const cleaned = cleanName(fullName);
  const frequency: Record<number, number> = {};

  for (let i = 1; i <= 9; i++) {
    frequency[i] = 0;
  }

  cleaned.split('').forEach(letter => {
    const value = getLetterValue(letter);
    if (value >= 1 && value <= 9) {
      frequency[value]++;
    }
  });

  const grid: (number | null)[][] = [
    [frequency[4] || null, frequency[9] || null, frequency[2] || null],
    [frequency[3] || null, frequency[5] || null, frequency[7] || null],
    [frequency[8] || null, frequency[1] || null, frequency[6] || null]
  ];

  const missingNumbers: number[] = [];
  for (let i = 1; i <= 9; i++) {
    if (frequency[i] === 0) {
      missingNumbers.push(i);
    }
  }

  const arrows: string[] = [];

  if (frequency[4] && frequency[9] && frequency[2]) arrows.push('Planner Arrow (4-9-2)');
  if (frequency[3] && frequency[5] && frequency[7]) arrows.push('Willpower Arrow (3-5-7)');
  if (frequency[8] && frequency[1] && frequency[6]) arrows.push('Action Arrow (8-1-6)');
  if (frequency[4] && frequency[3] && frequency[8]) arrows.push('Mental Arrow (4-3-8)');
  if (frequency[9] && frequency[5] && frequency[1]) arrows.push('Emotional Arrow (9-5-1)');
  if (frequency[2] && frequency[7] && frequency[6]) arrows.push('Physical Arrow (2-7-6)');
  if (frequency[4] && frequency[5] && frequency[6]) arrows.push('Determination Arrow (4-5-6)');
  if (frequency[2] && frequency[5] && frequency[8]) arrows.push('Spirituality Arrow (2-5-8)');

  return { grid, missingNumbers, arrows };
}

export function calculateCompatibility(
  person1: { lifePath: number | string; expression: number | string; soulUrge: number | string },
  person2: { lifePath: number | string; expression: number | string; soulUrge: number | string }
): { score: number; matches: string[] } {
  let score = 0;
  const matches: string[] = [];

  const p1LifePath = typeof person1.lifePath === 'string' ? parseInt(person1.lifePath.split('/')[1]) : person1.lifePath;
  const p2LifePath = typeof person2.lifePath === 'string' ? parseInt(person2.lifePath.split('/')[1]) : person2.lifePath;
  const p1Expression = typeof person1.expression === 'string' ? parseInt(person1.expression.split('/')[1]) : person1.expression;
  const p2Expression = typeof person2.expression === 'string' ? parseInt(person2.expression.split('/')[1]) : person2.expression;
  const p1SoulUrge = typeof person1.soulUrge === 'string' ? parseInt(person1.soulUrge.split('/')[1]) : person1.soulUrge;
  const p2SoulUrge = typeof person2.soulUrge === 'string' ? parseInt(person2.soulUrge.split('/')[1]) : person2.soulUrge;

  if (p1LifePath === p2LifePath) {
    score += 30;
    matches.push('Life Path');
  }

  if (p1Expression === p2Expression) {
    score += 25;
    matches.push('Expression');
  }

  if (p1SoulUrge === p2SoulUrge) {
    score += 25;
    matches.push('Soul Urge');
  }

  const harmonyNumbers1 = getHarmonyNumbers(person1.lifePath);
  const harmonyNumbers2 = getHarmonyNumbers(person2.lifePath);

  if (harmonyNumbers1.includes(p2LifePath) || harmonyNumbers2.includes(p1LifePath)) {
    score += 15;
    matches.push('Harmonious Life Paths');
  }

  if (score === 0) {
    score = 5;
  }

  return { score: Math.min(score, 100), matches };
}

export function calculateHouseNumber(number: string): number {
  const digits = number.replace(/[^0-9]/g, '');
  const sum = digits.split('').reduce((total, digit) => total + parseInt(digit), 0);
  return reduceToSingleDigit(sum);
}

export function calculateHarmonyScore(a: number | string, b: number | string): number {
  const numA = typeof a === 'string' ? parseInt(a.split('/').pop() || '0') : a;
  const numB = typeof b === 'string' ? parseInt(b.split('/').pop() || '0') : b;

  if (numA === numB) return 1.0;

  const friendlyGroups: Record<number, number[]> = {
    1: [1, 2, 3, 5],
    2: [2, 3, 4, 6, 8, 9],
    3: [1, 2, 3, 5, 6, 9],
    4: [2, 4, 6, 7, 8],
    5: [1, 3, 5, 7],
    6: [2, 3, 4, 6, 8, 9],
    7: [1, 4, 5, 7],
    8: [2, 4, 6, 8],
    9: [2, 3, 6, 9]
  };

  if (friendlyGroups[numA]?.includes(numB)) {
    return 0.8;
  }

  return 0.5;
}

export function calculateCoreHarmony(
  lifePath: number | string,
  expression: number | string,
  soulUrge: number | string,
  birthDate?: number
): {
  lpExpr: number;
  lpSoul: number;
  exprSoul: number;
  overall: number;
  hasOverEnergy: boolean;
  overEnergyDetails?: { number: number; positions: string[] }[];
} {
  // Get numeric values for comparison
  const lpNum = typeof lifePath === 'string' ? parseInt(lifePath.split('/').pop() || '0') : lifePath;
  const exNum = typeof expression === 'string' ? parseInt(expression.split('/').pop() || '0') : expression;
  const suNum = typeof soulUrge === 'string' ? parseInt(soulUrge.split('/').pop() || '0') : soulUrge;

  // Detect over-energy (repeated numbers)
  const numberCount = new Map<number, string[]>();
  if (birthDate && birthDate > 0) {
    numberCount.set(birthDate, [...(numberCount.get(birthDate) || []), 'BD']);
  }
  numberCount.set(lpNum, [...(numberCount.get(lpNum) || []), 'LP']);
  numberCount.set(exNum, [...(numberCount.get(exNum) || []), 'EX']);
  numberCount.set(suNum, [...(numberCount.get(suNum) || []), 'SU']);

  const overEnergyDetails: { number: number; positions: string[] }[] = [];
  numberCount.forEach((positions, num) => {
    if (positions.length > 1) {
      overEnergyDetails.push({ number: num, positions });
    }
  });

  const hasOverEnergy = overEnergyDetails.length > 0;

  // Calculate base harmony scores
  let lpExpr = calculateHarmonyScore(lifePath, expression);
  let lpSoul = calculateHarmonyScore(lifePath, soulUrge);
  let exprSoul = calculateHarmonyScore(expression, soulUrge);

  // CRITICAL: Penalize scores when there's over-energy
  // Matching numbers in multiple positions is NOT perfect - it's problematic
  if (hasOverEnergy) {
    overEnergyDetails.forEach(({ number, positions }) => {
      // If LP matches EX, penalize lpExpr
      if (positions.includes('LP') && positions.includes('EX') && lpNum === exNum) {
        lpExpr = 0.4; // Downgrade from 1.0 to 0.4 (Challenging)
      }
      // If LP matches SU, penalize lpSoul
      if (positions.includes('LP') && positions.includes('SU') && lpNum === suNum) {
        lpSoul = 0.4; // Downgrade from 1.0 to 0.4 (Challenging)
      }
      // If EX matches SU, penalize exprSoul
      if (positions.includes('EX') && positions.includes('SU') && exNum === suNum) {
        exprSoul = 0.4; // Downgrade from 1.0 to 0.4 (Challenging)
      }
    });
  }

  const overall = (lpExpr + lpSoul + exprSoul) / 3;

  return { lpExpr, lpSoul, exprSoul, overall, hasOverEnergy, overEnergyDetails };
}

export function calculatePersonalYears(
  birthDate: Date,
  numYears: number = 3
): Record<number, number> {
  const currentYear = new Date().getFullYear();
  const pys: Record<number, number> = {};

  for (let i = 0; i < numYears; i++) {
    const year = currentYear + i;
    const py = calculatePersonalYear(birthDate, year);
    pys[year] = typeof py === 'string' ? parseInt(py.split('/').pop() || '0') : py;
  }

  return pys;
}

export function calculatePYHarmony(
  targetExpr: number,
  targetSoul: number,
  pys: Record<number, number>
): number {
  const scores: number[] = [];

  Object.values(pys).forEach(py => {
    const exprHarmony = calculateHarmonyScore(targetExpr, py);
    const soulHarmony = calculateHarmonyScore(targetSoul, py);
    scores.push((exprHarmony + soulHarmony) / 2);
  });

  return scores.reduce((sum, score) => sum + score, 0) / scores.length;
}
