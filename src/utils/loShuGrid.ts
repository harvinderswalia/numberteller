export interface LoShuGridData {
  name: string;
  dateOfBirth: string;
  gender: string;
  birthNumbers: number[];
  grid: (number | null)[][];
  numberCounts: { [key: number]: number };
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
  const grid = createGrid(birthNumbers);
  const numberCounts = countNumbers(birthNumbers);
  const planes = analyzePlanes(numberCounts);
  const arrows = analyzeArrows(numberCounts);
  const missingNumbers = findMissingNumbers(numberCounts);
  const repeatingNumbers = findRepeatingNumbers(numberCounts);

  const driverNumber = calculateDriverNumber(dateOfBirth);
  const conductorNumber = calculateConductorNumber(dateOfBirth);
  const kuaNumber = calculateKuaNumber(dateOfBirth, gender);

  return {
    name,
    dateOfBirth,
    gender,
    birthNumbers,
    grid,
    numberCounts,
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

function createGrid(birthNumbers: number[]): (number | null)[][] {
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

  birthNumbers.forEach(num => {
    if (positions[num]) {
      const [row, col] = positions[num];
      if (grid[row][col] === null) {
        grid[row][col] = 1;
      } else {
        grid[row][col]! += 1;
      }
    }
  });

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

  const mentalCount = getCount([4, 9, 2]);
  const emotionalCount = getCount([3, 5, 7]);
  const practicalCount = getCount([8, 1, 6]);
  const thoughtCount = getCount([4, 3, 8]);
  const willCount = getCount([9, 5, 1]);
  const actionCount = getCount([2, 7, 6]);
  const goldenCount = getCount([4, 5, 6]);
  const silverCount = getCount([2, 5, 8]);

  return {
    mental: { numbers: [4, 9, 2], count: mentalCount, status: getStatus(mentalCount) },
    emotional: { numbers: [3, 5, 7], count: emotionalCount, status: getStatus(emotionalCount) },
    practical: { numbers: [8, 1, 6], count: practicalCount, status: getStatus(practicalCount) },
    thought: { numbers: [4, 3, 8], count: thoughtCount, status: getStatus(thoughtCount) },
    will: { numbers: [9, 5, 1], count: willCount, status: getStatus(willCount) },
    action: { numbers: [2, 7, 6], count: actionCount, status: getStatus(actionCount) },
    golden: { numbers: [4, 5, 6], count: goldenCount, status: getStatus(goldenCount) },
    silver: { numbers: [2, 5, 8], count: silverCount, status: getStatus(silverCount) },
  };
}

function analyzeArrows(numberCounts: { [key: number]: number }) {
  const present: string[] = [];
  const missing: string[] = [];

  const arrows = {
    'Arrow of Determination': [1, 5, 9],
    'Arrow of Intellect': [3, 5, 7],
    'Arrow of Activity': [4, 5, 6],
    'Arrow of Spirituality': [2, 5, 8],
    'Arrow of Planning': [1, 2, 3],
    'Arrow of Will': [4, 5, 6],
    'Arrow of Action': [7, 8, 9],
    'Arrow of Passivity': [3, 6, 9],
    'Arrow of Balance': [2, 5, 8],
    'Arrow of Materialization': [1, 4, 7],
  };

  const missingArrows = {
    'Arrow of Frustration': [4, 5, 6],
    'Arrow of Hesitation': [2, 5, 8],
    'Arrow of Poor Memory': [4, 3, 8],
    'Arrow of Emotional Sensitivity': [1, 5, 9],
    'Arrow of Skepticism': [3, 5, 7],
    'Arrow of Confusion': [7, 8, 9],
  };

  for (const [arrowName, nums] of Object.entries(arrows)) {
    if (nums.every(n => numberCounts[n] && numberCounts[n] > 0)) {
      present.push(arrowName);
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
  return day > 9 ? parseInt(day.toString().split('').reduce((a, b) => String(parseInt(a) + parseInt(b)))) : day;
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
