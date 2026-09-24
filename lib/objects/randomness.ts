import { RandomObject } from './types';

/**
 * Returns a cryptographically secure 32-bit unsigned integer using Web Crypto API.
 */
export function getCryptoUint32(): number {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0];
  }
  return Math.floor(Math.random() * 0xffffffff);
}

/**
 * Returns a cryptographically secure float in range [0, 1).
 */
export function getCryptoRandomFloat(): number {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const arr = new Uint32Array(2);
    window.crypto.getRandomValues(arr);
    const high = arr[0] >>> 11;
    const low = arr[1];
    return (high * 4294967296 + low) / 9007199254740992;
  }
  return Math.random();
}

/**
 * Generates an integer in range [0, max - 1] uniformly with CSPRNG.
 */
export function generateRandomIndex(max: number): number {
  if (max <= 1) return 0;
  return Math.floor(getCryptoRandomFloat() * max);
}

/**
 * Fisher-Yates shuffle using CSPRNG.
 */
export function shuffleObjects<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = generateRandomIndex(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Generates unique random objects with CSPRNG, supporting no-repeat logic.
 */
export function generateUniqueObjects(
  pool: RandomObject[],
  count: number,
  excludeIds?: Set<string>
): {
  selected: RandomObject[];
  exhausted: boolean;
} {
  if (pool.length === 0) return { selected: [], exhausted: true };

  // Filter out excluded items if specified
  let eligible = excludeIds ? pool.filter((item) => !excludeIds.has(item.id)) : [...pool];
  let exhausted = false;

  // If eligible pool is empty or smaller than requested count, we reset the pool
  if (eligible.length === 0) {
    eligible = [...pool];
    exhausted = true;
  }

  const shuffled = shuffleObjects(eligible);
  const takeCount = Math.min(count, shuffled.length);
  const selected = shuffled.slice(0, takeCount);

  // If more requested than available in eligible pool, fill from remaining pool
  if (selected.length < count && pool.length > selected.length) {
    const remainingPool = shuffleObjects(pool.filter((p) => !selected.some((s) => s.id === p.id)));
    const needed = count - selected.length;
    selected.push(...remainingPool.slice(0, needed));
    exhausted = true;
  }

  return { selected, exhausted };
}

/**
 * Picks an item based on weights using CSPRNG.
 */
export function generateWeightedObject(items: RandomObject[]): RandomObject {
  if (items.length === 0) throw new Error('Cannot pick from empty item pool');
  if (items.length === 1) return items[0];

  const totalWeight = items.reduce((sum, item) => sum + Math.max(0.1, item.weight ?? 1), 0);
  const randomVal = getCryptoRandomFloat() * totalWeight;

  let runningSum = 0;
  for (const item of items) {
    runningSum += Math.max(0.1, item.weight ?? 1);
    if (randomVal <= runningSum) {
      return item;
    }
  }

  return items[items.length - 1];
}

/**
 * Generates a deterministic integer from a date string (YYYY-MM-DD) for "Object of the Day".
 */
export function getDailySeedIndex(dateStr: string, max: number): number {
  let hash = 0;
  const salt = 'SpinWheelGames-DailyObject-2026';
  const combined = `${dateStr}-${salt}`;
  for (let i = 0; i < combined.length; i++) {
    hash = (hash << 5) - hash + combined.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  const positiveHash = Math.abs(hash);
  return positiveHash % max;
}

/**
 * Formats today's date in YYYY-MM-DD.
 */
export function getTodayDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
