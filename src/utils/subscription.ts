const STORAGE_KEY = 'numerology_calculations';
const SUBSCRIPTION_KEY = 'numerology_premium';
const FREE_CALCULATION_LIMIT = 3;

export function getCalculationCount(): number {
  const count = localStorage.getItem(STORAGE_KEY);
  return count ? parseInt(count, 10) : 0;
}

export function incrementCalculationCount(): void {
  const currentCount = getCalculationCount();
  localStorage.setItem(STORAGE_KEY, (currentCount + 1).toString());
}

export function isCalculationLimitReached(): boolean {
  return false;
}

export function canPerformCalculation(): boolean {
  return true;
}

export function isPremiumUser(): boolean {
  const premium = localStorage.getItem(SUBSCRIPTION_KEY);
  if (!premium) return false;

  const data = JSON.parse(premium);
  return data.active && new Date(data.expiresAt) > new Date();
}

export function setPremiumStatus(active: boolean, expiresAt?: Date): void {
  if (active && expiresAt) {
    localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify({
      active: true,
      expiresAt: expiresAt.toISOString()
    }));
  } else {
    localStorage.removeItem(SUBSCRIPTION_KEY);
  }
}

export function getRemainingCalculations(): number {
  if (isPremiumUser()) return -1;
  return Math.max(0, FREE_CALCULATION_LIMIT - getCalculationCount());
}
