import { WheelItem } from './types';

/**
 * Returns a cryptographically secure random 32-bit unsigned integer using Web Crypto API.
 */
export function getCryptoUint32(): number {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0];
  }
  // Fallback if crypto is unavailable
  return Math.floor(Math.random() * 0xffffffff);
}

/**
 * Returns a cryptographically secure float in range [0, 1) with 53 bits of precision.
 */
export function getCryptoRandomFloat(): number {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const arr = new Uint32Array(2);
    window.crypto.getRandomValues(arr);
    // 53 bits of randomness: 21 bits from first word, 32 bits from second word
    const high = arr[0] >>> 11;
    const low = arr[1];
    return (high * 4294967296 + low) / 9007199254740992;
  }
  return Math.random();
}

/**
 * Generates a hexadecimal seed hash representing the cryptographic draw.
 */
export function generateSeedHash(): string {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const arr = new Uint16Array(4);
    window.crypto.getRandomValues(arr);
    return '0x' + Array.from(arr).map(b => b.toString(16).padStart(4, '0')).join('').toUpperCase();
  }
  return '0x' + Math.floor(Math.random() * 0xffffffff).toString(16).toUpperCase();
}

/**
 * Selects a winner item based on weights using cryptographic randomness.
 * DOES NOT rely on animation position; winner is chosen BEFORE the animation runs.
 */
export function selectWeightedWinner(items: WheelItem[]): {
  winner: WheelItem;
  winnerIndex: number;
  seed: string;
  oddsPercent: string;
} {
  if (items.length === 0) {
    throw new Error('Cannot select winner from empty items list');
  }

  const seed = generateSeedHash();
  const totalWeight = items.reduce((sum, item) => sum + Math.max(0.001, item.weight || 1), 0);
  const randomFloat = getCryptoRandomFloat();
  const targetWeight = randomFloat * totalWeight;

  let cumulative = 0;
  let winnerIndex = 0;

  for (let i = 0; i < items.length; i++) {
    cumulative += Math.max(0.001, items[i].weight || 1);
    if (targetWeight <= cumulative || i === items.length - 1) {
      winnerIndex = i;
      break;
    }
  }

  const winner = items[winnerIndex];
  const itemWeight = Math.max(0.001, winner.weight || 1);
  const oddsPercent = ((itemWeight / totalWeight) * 100).toFixed(1);

  return {
    winner,
    winnerIndex,
    seed,
    oddsPercent
  };
}

/**
 * Deterministic pseudo-random number generator (Mulberry32) seeded by string (e.g. date 'YYYY-MM-DD').
 * Ensures all users on the same day experience the exact same Daily Challenge.
 */
export function createDateSeededPRNG(dateStr: string): () => number {
  let h = 1779033703 ^ dateStr.length;
  for (let i = 0; i < dateStr.length; i++) {
    h = Math.imul(h ^ dateStr.charCodeAt(i), 3432918351);
    h = (h << 13) | (h >>> 19);
  }
  let seed = h >>> 0;

  return function () {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Runs a 1,000 draw cryptographic entropy verification benchmark across 8 bins.
 */
export function runWebCryptoEntropyBenchmark(samples = 1000, bins = 8): {
  buckets: number[];
  min: number;
  max: number;
  variancePercent: string;
  isUniform: boolean;
} {
  const buckets = new Array(bins).fill(0);
  const buffer = new Uint32Array(samples);

  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    window.crypto.getRandomValues(buffer);
  } else {
    for (let i = 0; i < samples; i++) {
      buffer[i] = Math.floor(Math.random() * 0xffffffff);
    }
  }

  for (let i = 0; i < samples; i++) {
    buckets[buffer[i] % bins]++;
  }

  const min = Math.min(...buckets);
  const max = Math.max(...buckets);
  const expected = samples / bins;
  const variance = (((max - min) / expected) * 100).toFixed(1);

  return {
    buckets,
    min,
    max,
    variancePercent: variance,
    isUniform: parseFloat(variance) < 25.0
  };
}
