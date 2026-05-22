export interface LoShuGridData {
  name: string;
  dateOfBirth: string;
  gender: string;
  birthNumbers: number[];
  // Extra numbers added to the grid beyond raw birth digits
  extraNumbers: {
    bd: number;   // Birthday number (day only, reduced)
    lp: number;   // Life Path number (full DOB reduced)
    kua: number;  // Kua number
  };
  // Combined counts: birth digits + BD + LP + Kua
  grid: (number | null)[][];
  numberCounts: { [key: number]: number };
  // Counts from birth digits only (for display dots)
  birthDigitCounts: { [key: number]: number };
  planes: {
    mental: { numbers: number[]; count: number; status: string };
    emotional: { numbers: number[]; count: number; status: string };
    practical: { numbers: number[]; count: number; status: string };
    thought: { numbers: number[]; count: number; status: string };
    will: { numbers: number[]; count: number; status: string };
    action: { numbers: number[]; count: number; status: string };
    golden: { numbers: number[]; count: number; status: string };
    silver: { numbers: number[]; count: number; status: string };
  };
  arrows: {
    present: string[];
    missing: string[];
  };
  missingNumbers: number[];
  repeatingNumbers: { number: number; count: number }[];
  driverNumber: number;
  conductorNumber: number;
  kuaNumber: number;
}

export function calculateLoShuGrid(
  name: string,
  dateOfBirth: string,
  gender: string
): LoShuGridData {
  const birthNumbers = extractBirthNumbers(dateOfBirth);
  const birthDigitCounts = countNumbers(birthNumbers);

  const driverNumber = calculateDriverNumber(dateOfBirth);
  const conductorNumber = calculateConductorNumber(dateOfBirth);
  const kuaNumber = calculateKuaNumber(dateOfBirth, gender);

  // BD = same as driverNumber (day reduced to single)
  const bd = driverNumber;
  // LP = same as conductorNumber (full sum reduced to single)
  const lp = conductorNumber;
  // Kua
  const kua = kuaNumber;

  // Build combined counts: birth digits + BD + LP + Kua (each counts as +1 if not already in birth digits)
  const allNumbers = [...birthNumbers];

  // Add BD, LP, Kua as additional placements (reduced to 1-9)
  const getBDLP = (n: number): number => {
    let v = n;
    while (v > 9) v = String(v).split('').reduce((a, b) => a + parseInt(b), 0);
    return v;
  };

  const bdVal = getBDLP(bd);
  const lpVal = getBDLP(lp);
  const kuaVal = getBDLP(kua);

  const combinedCounts = { ...birthDigitCounts };
  // Increment for BD, LP, Kua — they always add to the grid
  if (bdVal >= 1 && bdVal <= 9) combinedCounts[bdVal] = (combinedCounts[bdVal] || 0) + 1;
  if (lpVal >= 1 && lpVal <= 9) combinedCounts[lpVal] = (combinedCounts[lpVal] || 0) + 1;
  if (kuaVal >= 1 && kuaVal <= 9) combinedCounts[kuaVal] = (combinedCounts[kuaVal] || 0) + 1;

  const grid = createGridFromCounts(combinedCounts);
  const planes = analyzePlanes(combinedCounts);
  const arrows = analyzeArrows(combinedCounts);
  const missingNumbers = findMissingNumbers(combinedCounts);
  const repeatingNumbers = findRepeatingNumbers(combinedCounts);

  return {
    name,
    dateOfBirth,
    gender,
    birthNumbers,
    extraNumbers: { bd: bdVal, lp: lpVal, kua: kuaVal },
    grid,
    numberCounts: combinedCounts,
    birthDigitCounts,
    planes,
    arrows,
    missingNumbers,
    repeatingNumbers,
    driverNumber,
    conductorNumber,
    kuaNumber,
  };
}

function extractBirthNumbers(dateOfBirth: string): number[] {
  return dateOfBirth
    .replace(/-/g, '')
    .split('')
    .map(num => parseInt(num))
    .filter(num => num !== 0);
}

function createGridFromCounts(counts: { [key: number]: number }): (number | null)[][] {
  const grid: (number | null)[][] = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  const positions: { [key: number]: [number, number] } = {
    4: [0, 0], 9: [0, 1], 2: [0, 2],
    3: [1, 0], 5: [1, 1], 7: [1, 2],
    8: [2, 0], 1: [2, 1], 6: [2, 2],
  };

  for (const [numStr, count] of Object.entries(counts)) {
    const num = parseInt(numStr);
    if (positions[num]) {
      const [row, col] = positions[num];
      grid[row][col] = count;
    }
  }

  return grid;
}

function countNumbers(birthNumbers: number[]): { [key: number]: number } {
  const counts: { [key: number]: number } = {};
  birthNumbers.forEach(num => {
    counts[num] = (counts[num] || 0) + 1;
  });
  return counts;
}

function analyzePlanes(numberCounts: { [key: number]: number }) {
  const getCount = (nums: number[]) =>
    nums.reduce((sum, n) => sum + (numberCounts[n] || 0), 0);

  const getStatus = (count: number) => {
    if (count === 0) return 'Missing';
    if (count >= 1 && count <= 2) return 'Weak';
    if (count >= 3 && count <= 4) return 'Balanced';
    return 'Strong';
  };

  return {
    mental:    { numbers: [4, 9, 2], count: getCount([4, 9, 2]),   status: getStatus(getCount([4, 9, 2])) },
    emotional: { numbers: [3, 5, 7], count: getCount([3, 5, 7]),   status: getStatus(getCount([3, 5, 7])) },
    practical: { numbers: [8, 1, 6], count: getCount([8, 1, 6]),   status: getStatus(getCount([8, 1, 6])) },
    thought:   { numbers: [4, 3, 8], count: getCount([4, 3, 8]),   status: getStatus(getCount([4, 3, 8])) },
    will:      { numbers: [9, 5, 1], count: getCount([9, 5, 1]),   status: getStatus(getCount([9, 5, 1])) },
    action:    { numbers: [2, 7, 6], count: getCount([2, 7, 6]),   status: getStatus(getCount([2, 7, 6])) },
    golden:    { numbers: [4, 5, 6], count: getCount([4, 5, 6]),   status: getStatus(getCount([4, 5, 6])) },
    silver:    { numbers: [2, 5, 8], count: getCount([2, 5, 8]),   status: getStatus(getCount([2, 5, 8])) },
  };
}

function analyzeArrows(numberCounts: { [key: number]: number }) {
  const present: string[] = [];
  const missing: string[] = [];

  const presentArrows: { [name: string]: number[] } = {
    'Arrow of Determination': [1, 5, 9],
    'Arrow of Intellect':     [3, 5, 7],
    'Arrow of Activity':      [4, 5, 6],
    'Arrow of Spirituality':  [2, 5, 8],
    'Arrow of Planning':      [1, 2, 3],
    'Arrow of Will':          [4, 5, 6],
    'Arrow of Action':        [7, 8, 9],
    'Arrow of Passivity':     [3, 6, 9],
    'Arrow of Balance':       [2, 5, 8],
    'Arrow of Materialization': [1, 4, 7],
  };

  const missingArrows: { [name: string]: number[] } = {
    'Arrow of Frustration':         [4, 5, 6],
    'Arrow of Hesitation':          [2, 5, 8],
    'Arrow of Poor Memory':         [4, 3, 8],
    'Arrow of Emotional Sensitivity': [1, 5, 9],
    'Arrow of Skepticism':          [3, 5, 7],
    'Arrow of Confusion':           [7, 8, 9],
  };

  for (const [arrowName, nums] of Object.entries(presentArrows)) {
    if (nums.every(n => numberCounts[n] && numberCounts[n] > 0)) {
      if (!present.includes(arrowName)) present.push(arrowName);
    }
  }

  for (const [arrowName, nums] of Object.entries(missingArrows)) {
    if (nums.every(n => !numberCounts[n] || numberCounts[n] === 0)) {
      missing.push(arrowName);
    }
  }

  return { present, missing };
}

function findMissingNumbers(numberCounts: { [key: number]: number }): number[] {
  const missing: number[] = [];
  for (let i = 1; i <= 9; i++) {
    if (!numberCounts[i] || numberCounts[i] === 0) {
      missing.push(i);
    }
  }
  return missing;
}

function findRepeatingNumbers(numberCounts: { [key: number]: number }): { number: number; count: number }[] {
  return Object.entries(numberCounts)
    .filter(([_, count]) => count > 1)
    .map(([num, count]) => ({ number: parseInt(num), count }))
    .sort((a, b) => b.count - a.count);
}

function calculateDriverNumber(dateOfBirth: string): number {
  const date = new Date(dateOfBirth);
  const day = date.getDate();
  if (day <= 9) return day;
  const digits = day.toString().split('').map(Number);
  let sum = digits.reduce((a, b) => a + b, 0);
  while (sum > 9) sum = sum.toString().split('').map(Number).reduce((a, b) => a + b, 0);
  return sum;
}

function calculateConductorNumber(dateOfBirth: string): number {
  const nums = dateOfBirth.replace(/-/g, '').split('').map(n => parseInt(n));
  let sum = nums.reduce((a, b) => a + b, 0);
  while (sum > 9) {
    sum = sum.toString().split('').map(n => parseInt(n)).reduce((a, b) => a + b, 0);
  }
  return sum;
}

function calculateKuaNumber(dateOfBirth: string, gender: string): number {
  const date = new Date(dateOfBirth);
  const year = date.getFullYear();
  const lastTwoDigits = year % 100;
  let sum = Math.floor(lastTwoDigits / 10) + (lastTwoDigits % 10);

  while (sum > 9) {
    sum = Math.floor(sum / 10) + (sum % 10);
  }

  let kuaNumber: number;
  if (gender.toLowerCase() === 'male') {
    kuaNumber = 11 - sum;
    if (kuaNumber > 9) kuaNumber = kuaNumber - 9;
  } else {
    kuaNumber = 4 + sum;
    if (kuaNumber > 9) kuaNumber = kuaNumber - 9;
  }

  if (kuaNumber === 5) {
    kuaNumber = gender.toLowerCase() === 'male' ? 2 : 8;
  }

  return kuaNumber;
}
