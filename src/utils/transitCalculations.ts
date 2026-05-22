import { reduceToSingleDigit, cleanName, getLetterValue } from './numerology';

export interface TransitYear {
  age: number;
  year: number;
  transits: string;
  essence: number | string;
  personalYear: number | string;
  universalYear: number | string;
  period: number | string;
  pinnacle: string;
  challenge: string;
}

function getTransitLetters(fullName: string, age: number): string {
  const names = fullName.trim().split(/\s+/);
  const transitLetters: string[] = [];

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
        transitLetters.push(`${letter} ${value}`);
        break;
      }

      currentAge += reducedValue;
      letterIndex++;
    }
  }

  return transitLetters.join(' ');
}

export function calculateEssenceForAge(fullName: string, age: number): number | string {
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

export function generateTransitChart(
  fullName: string,
  birthDate: Date,
  lifePath: number | string,
  maxAge: number = 100
): TransitYear[] {
  const birthYear = birthDate.getFullYear();
  const birthMonth = birthDate.getMonth() + 1;
  const birthDay = birthDate.getDate();

  const lifePathNum = typeof lifePath === 'string' ? parseInt(lifePath.split('/')[1]) : lifePath;

  const monthDigitsSum = birthMonth.toString().split('').reduce((s, d) => s + parseInt(d), 0);
  const dayDigitsSum = birthDay.toString().split('').reduce((s, d) => s + parseInt(d), 0);
  const yearDigitsSum = birthYear.toString().split('').reduce((s, d) => s + parseInt(d), 0);

  const monthReduced = reduceToSingleDigit(birthMonth, false);
  const dayReduced = reduceToSingleDigit(birthDay, false);
  const yearReduced = reduceToSingleDigit(birthYear, false);

  const monthNum = typeof monthReduced === 'string' ? parseInt(monthReduced.split('/')[1]) : monthReduced;
  const dayNum = typeof dayReduced === 'string' ? parseInt(dayReduced.split('/')[1]) : dayReduced;
  const yearNum = typeof yearReduced === 'string' ? parseInt(yearReduced.split('/')[1]) : yearReduced;

  const firstPinnacle = reduceToSingleDigit(monthNum + dayNum);
  const secondPinnacle = reduceToSingleDigit(dayNum + yearNum);
  const firstPinNum = typeof firstPinnacle === 'string' ? parseInt(firstPinnacle.split('/')[1]) : firstPinnacle;
  const secondPinNum = typeof secondPinnacle === 'string' ? parseInt(secondPinnacle.split('/')[1]) : secondPinnacle;
  const thirdPinnacle = reduceToSingleDigit(firstPinNum + secondPinNum);
  const fourthPinnacle = reduceToSingleDigit(monthNum + yearNum);

  const firstChallengeRaw = Math.abs(monthDigitsSum - dayDigitsSum);
  const secondChallengeRaw = Math.abs(dayDigitsSum - yearDigitsSum);
  const thirdChallengeRaw = Math.abs(firstChallengeRaw - secondChallengeRaw);
  const fourthChallengeRaw = Math.abs(monthDigitsSum - yearDigitsSum);

  const firstChallenge = firstChallengeRaw > 9 ? (typeof reduceToSingleDigit(firstChallengeRaw, false) === 'string' ? parseInt(reduceToSingleDigit(firstChallengeRaw, false).toString().split('/')[1]) : reduceToSingleDigit(firstChallengeRaw, false)) : firstChallengeRaw;
  const secondChallenge = secondChallengeRaw > 9 ? (typeof reduceToSingleDigit(secondChallengeRaw, false) === 'string' ? parseInt(reduceToSingleDigit(secondChallengeRaw, false).toString().split('/')[1]) : reduceToSingleDigit(secondChallengeRaw, false)) : secondChallengeRaw;
  const thirdChallenge = thirdChallengeRaw > 9 ? (typeof reduceToSingleDigit(thirdChallengeRaw, false) === 'string' ? parseInt(reduceToSingleDigit(thirdChallengeRaw, false).toString().split('/')[1]) : reduceToSingleDigit(thirdChallengeRaw, false)) : thirdChallengeRaw;
  const fourthChallenge = fourthChallengeRaw > 9 ? (typeof reduceToSingleDigit(fourthChallengeRaw, false) === 'string' ? parseInt(reduceToSingleDigit(fourthChallengeRaw, false).toString().split('/')[1]) : reduceToSingleDigit(fourthChallengeRaw, false)) : fourthChallengeRaw;

  const firstPeriod = monthReduced;
  const secondPeriod = dayReduced;
  const thirdPeriod = yearReduced;

  const firstPinnacleAge = 36 - lifePathNum;
  const secondPinnacleAge = firstPinnacleAge + 9;
  const thirdPinnacleAge = secondPinnacleAge + 9;

  const transitChart: TransitYear[] = [];

  for (let age = 0; age <= maxAge; age++) {
    const currentYear = birthYear + age;

    const yearDigitsSum = currentYear.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    const universalYear = reduceToSingleDigit(yearDigitsSum, false);

    const personalYearSum = monthNum + dayNum + yearDigitsSum;
    const personalYear = reduceToSingleDigit(personalYearSum, false);

    const transits = getTransitLetters(fullName, age);
    const essence = calculateEssenceForAge(fullName, age);

    let period: number | string;
    if (age <= firstPinnacleAge) {
      period = firstPeriod;
    } else if (age <= firstPinnacleAge + 9) {
      period = secondPeriod;
    } else {
      period = thirdPeriod;
    }

    const pinnacle = `${firstPinnacle}/${secondPinnacle}/${thirdPinnacle}/${fourthPinnacle}`;

    let challenge: string;

    if (age <= firstPinnacleAge) {
      challenge = `${firstChallenge},${secondChallenge}`;
    } else if (age <= secondPinnacleAge) {
      challenge = `${firstChallenge},${secondChallenge}`;
    } else if (age <= thirdPinnacleAge) {
      challenge = `${thirdChallenge},${fourthChallenge}`;
    } else {
      challenge = `${thirdChallenge},${fourthChallenge}`;
    }

    transitChart.push({
      age,
      year: currentYear,
      transits,
      essence,
      personalYear,
      universalYear,
      period,
      pinnacle,
      challenge
    });
  }

  return transitChart;
}
