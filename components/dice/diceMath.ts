// Pure cryptographic randomness and dice mathematical engine
// Complies with strict statistical uniformity using Web Crypto API

export type DieType = 'd2' | 'd3' | 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100';

export interface DieConfig {
  sides: number;
  label: string;
  name: string;
  shape: string;
  min: number;
  max: number;
  average: number;
}

export const DIE_DEFINITIONS: Record<DieType, DieConfig> = {
  d2: { sides: 2, label: 'd2', name: 'Coin / 2-Sided', shape: 'Cylinder / Coin', min: 1, max: 2, average: 1.5 },
  d3: { sides: 3, label: 'd3', name: '3-Sided Die', shape: 'Trigonal Prism', min: 1, max: 3, average: 2.0 },
  d4: { sides: 4, label: 'd4', name: '4-Sided Tetrahedron', shape: 'Tetrahedron', min: 1, max: 4, average: 2.5 },
  d6: { sides: 6, label: 'd6', name: '6-Sided Cube', shape: 'Cube', min: 1, max: 6, average: 3.5 },
  d8: { sides: 8, label: 'd8', name: '8-Sided Octahedron', shape: 'Octahedron', min: 1, max: 8, average: 4.5 },
  d10: { sides: 10, label: 'd10', name: '10-Sided Trapezohedron', shape: 'Pentagonal Trapezohedron', min: 0, max: 9, average: 4.5 },
  d12: { sides: 12, label: 'd12', name: '12-Sided Dodecahedron', shape: 'Dodecahedron', min: 1, max: 12, average: 6.5 },
  d20: { sides: 20, label: 'd20', name: '20-Sided Icosahedron', shape: 'Icosahedron', min: 1, max: 20, average: 10.5 },
  d100: { sides: 100, label: 'd100', name: '100-Sided Percentile', shape: 'Percentile Trapezohedron', min: 1, max: 100, average: 50.5 }
};

export interface RollOptions {
  count: number;
  sides: number;
  modifier?: number;
  dropLowest?: number;
  dropHighest?: number;
  keepHighest?: number;
  keepLowest?: number;
  rerollOnes?: boolean;
  exploding?: boolean;
}

export interface SingleDieResult {
  value: number;
  originalValue?: number;
  isDropped: boolean;
  id?: string;
  sides?: number;
  isExploded?: boolean;
  isRerolled?: boolean;
}

export interface RollResult {
  dice: SingleDieResult[];
  activeCount: number;
  sides: number;
  modifier: number;
  subtotal: number;
  total: number;
  average: number;
  minPossible: number;
  maxPossible: number;
  notation: string;
  explanation?: string;
  timestamp: number;
}

/**
 * Generates an unbiased random integer between 1 and sides using window.crypto
 */
export function secureRandomDie(sides: number): number {
  if (sides <= 1) return 1;
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const array = new Uint32Array(1);
    const maxUint = 0xffffffff;
    const limit = maxUint - (maxUint % sides);

    let rand: number;
    do {
      window.crypto.getRandomValues(array);
      rand = array[0];
    } while (rand >= limit);

    return (rand % sides) + 1;
  }
  // Math.random fallback for SSR/testing
  return Math.floor(Math.random() * sides) + 1;
}

/**
 * Rolls a single die and returns a SingleDieResult
 */
export function rollSingleDie(sides: number): SingleDieResult {
  let val = secureRandomDie(sides);
  // For D10 standard 0-9 display
  if (sides === 10) {
    val = (val % 10);
  } else if (sides === 100) {
    // Standard 100
  }
  return {
    value: val,
    originalValue: val,
    isDropped: false
  };
}

/**
 * Executes a full dice roll with modifiers, drop/keep rules, and returns detailed math
 */
export function executeDiceRoll(options: RollOptions): RollResult {
  const count = Math.max(1, Math.min(options.count || 1, 30));
  const sides = Math.max(2, Math.min(options.sides || 6, 1000));
  const modifier = options.modifier || 0;

  const rawRolls: SingleDieResult[] = [];

  for (let i = 0; i < count; i++) {
    let rollVal = secureRandomDie(sides);

    // D10 is 0-9 in standard RPG
    if (sides === 10) {
      rollVal = rollVal % 10;
    }

    let rerolled = false;

    // Reroll 1s rule (e.g. Great Weapon Fighting)
    if (options.rerollOnes && rollVal === 1) {
      rollVal = secureRandomDie(sides);
      if (sides === 10) rollVal = rollVal % 10;
      rerolled = true;
    }

    rawRolls.push({
      value: rollVal,
      originalValue: rollVal,
      isDropped: false,
      isRerolled: rerolled
    });

    // Exploding dice rule (e.g. Shadowrun / Savage Worlds)
    if (options.exploding && rollVal === sides && rawRolls.length < 50) {
      let explodeVal = secureRandomDie(sides);
      if (sides === 10) explodeVal = explodeVal % 10;
      rawRolls.push({
        value: explodeVal,
        originalValue: explodeVal,
        isDropped: false,
        isExploded: true
      });
    }
  }

  // Calculate Drop/Keep logic
  const diceWithIndex = rawRolls.map((d, index) => ({ ...d, index }));
  // Sort ascending by value to identify lowest/highest
  diceWithIndex.sort((a, b) => a.value - b.value);

  let dropLowestCount = options.dropLowest || 0;
  if (options.keepHighest && options.keepHighest < count) {
    dropLowestCount = Math.max(dropLowestCount, count - options.keepHighest);
  }

  let dropHighestCount = options.dropHighest || 0;
  if (options.keepLowest && options.keepLowest < count) {
    dropHighestCount = Math.max(dropHighestCount, count - options.keepLowest);
  }

  const droppedIndices = new Set<number>();

  for (let i = 0; i < dropLowestCount && i < diceWithIndex.length; i++) {
    droppedIndices.add(diceWithIndex[i].index);
  }

  for (let i = 0; i < dropHighestCount && i < diceWithIndex.length; i++) {
    const highIdx = diceWithIndex.length - 1 - i;
    if (highIdx >= 0) droppedIndices.add(diceWithIndex[highIdx].index);
  }

  // Final dice array preserving original throw order
  const finalDice: SingleDieResult[] = rawRolls.map((d, index) => ({
    ...d,
    isDropped: droppedIndices.has(index)
  }));

  const activeDice = finalDice.filter((d) => !d.isDropped);
  const activeCount = activeDice.length;
  const subtotal = activeDice.reduce((acc, d) => acc + d.value, 0);
  const total = subtotal + modifier;

  const minPossible = activeCount * (sides === 10 ? 0 : 1) + modifier;
  const maxPossible = activeCount * (sides === 10 ? 9 : sides) + modifier;
  const average = activeCount > 0 ? Number((subtotal / activeCount).toFixed(2)) : 0;

  // Build standard RPG notation string
  let notation = `${count}d${sides}`;
  if (dropLowestCount > 0 && !options.keepHighest) notation += `dl${dropLowestCount}`;
  if (options.keepHighest) notation += `kh${options.keepHighest}`;
  if (dropHighestCount > 0 && !options.keepLowest) notation += `dh${dropHighestCount}`;
  if (options.keepLowest) notation += `kl${options.keepLowest}`;
  if (options.rerollOnes) notation += 'r1';
  if (options.exploding) notation += '!';
  if (modifier > 0) notation += `+${modifier}`;
  if (modifier < 0) notation += `${modifier}`;

  // Human explanation
  let explanation = `Rolled ${count} ${sides}-sided ${count === 1 ? 'die' : 'dice'}`;
  if (dropLowestCount > 0) explanation += `, dropped ${dropLowestCount} lowest`;
  if (dropHighestCount > 0) explanation += `, dropped ${dropHighestCount} highest`;
  if (modifier !== 0) explanation += `, modifier ${modifier > 0 ? `+${modifier}` : modifier}`;
  explanation += '.';

  return {
    dice: finalDice,
    activeCount,
    sides,
    modifier,
    subtotal,
    total,
    average,
    minPossible,
    maxPossible,
    notation,
    explanation,
    timestamp: Date.now()
  };
}

/**
 * Parses user input strings like "4d6dl1+3", "2d20kh1", "1d100", "5d6"
 */
export function parseDiceNotation(input: string): RollOptions | null {
  const cleaned = input.trim().toLowerCase().replace(/\s+/g, '');
  if (!cleaned) return null;

  // Regex for standard tabletop RPG notation:
  // e.g. 4d6, 4d6+2, 4d6-1, 4d6dl1, 4d6kh3, 2d20kh1+5, 1d100, 3d6!r1
  const regex = /^(\d+)?d(\d+)(dl\d+|dh\d+|kh\d+|kl\d+)?(!)?(r1)?([+-]\d+)?$/;
  const match = cleaned.match(regex);

  if (!match) return null;

  const count = match[1] ? parseInt(match[1], 10) : 1;
  const sides = parseInt(match[2], 10);
  const dropKeep = match[3] || '';
  const exploding = !!match[4];
  const rerollOnes = !!match[5];
  const modifierStr = match[6] || '';

  if (isNaN(count) || isNaN(sides) || count <= 0 || sides <= 1) return null;

  const options: RollOptions = {
    count: Math.min(count, 30),
    sides: Math.min(sides, 1000),
    exploding,
    rerollOnes
  };

  if (modifierStr) {
    options.modifier = parseInt(modifierStr, 10) || 0;
  }

  if (dropKeep) {
    if (dropKeep.startsWith('dl')) {
      options.dropLowest = parseInt(dropKeep.replace('dl', ''), 10) || 1;
    } else if (dropKeep.startsWith('dh')) {
      options.dropHighest = parseInt(dropKeep.replace('dh', ''), 10) || 1;
    } else if (dropKeep.startsWith('kh')) {
      options.keepHighest = parseInt(dropKeep.replace('kh', ''), 10) || 1;
    } else if (dropKeep.startsWith('kl')) {
      options.keepLowest = parseInt(dropKeep.replace('kl', ''), 10) || 1;
    }
  }

  return options;
}

/**
 * Calculates exact statistical probabilities and theoretical average for any dice configuration
 */
export function calculateDiceStatistics(count: number, sides: number, modifier = 0) {
  const min = count * 1 + modifier;
  const max = count * sides + modifier;
  const theoreticalAverage = Number((count * ((sides + 1) / 2) + modifier).toFixed(2));

  // Dynamic programming to compute exact discrete sum distribution
  let distribution: Record<number, number> = { 0: 1 };

  for (let die = 0; die < count; die++) {
    const nextDist: Record<number, number> = {};
    for (const [sumStr, ways] of Object.entries(distribution)) {
      const sum = parseInt(sumStr, 10);
      for (let s = 1; s <= sides; s++) {
        const nextSum = sum + s;
        nextDist[nextSum] = (nextDist[nextSum] || 0) + ways;
      }
    }
    distribution = nextDist;
  }

  const totalPossibleOutcomes = Math.pow(sides, count);
  const probabilityTable: Array<{ sum: number; ways: number; probabilityPercent: number; cumulativePercent: number }> = [];

  let cumulative = 0;
  for (let s = count; s <= count * sides; s++) {
    const ways = distribution[s] || 0;
    const prob = (ways / totalPossibleOutcomes) * 100;
    cumulative += prob;
    probabilityTable.push({
      sum: s + modifier,
      ways,
      probabilityPercent: Number(prob.toFixed(3)),
      cumulativePercent: Number(Math.min(100, cumulative).toFixed(2))
    });
  }

  return {
    count,
    sides,
    modifier,
    min,
    max,
    theoreticalAverage,
    totalPossibleOutcomes,
    probabilityTable
  };
}

/**
 * Computes exact discrete distribution combinations and probabilities for a sum of dice
 */
export interface DiceDistributionItem {
  value: number;
  ways: number;
  combinations: number;
  probability: number;
  cumulativeProbability: number;
}

export function calculateDiceDistribution(count: number, sides: number): DiceDistributionItem[] {
  let distribution: Record<number, number> = { 0: 1 };

  for (let die = 0; die < count; die++) {
    const nextDist: Record<number, number> = {};
    for (const [sumStr, ways] of Object.entries(distribution)) {
      const sum = parseInt(sumStr, 10);
      for (let s = 1; s <= sides; s++) {
        const nextSum = sum + s;
        nextDist[nextSum] = (nextDist[nextSum] || 0) + ways;
      }
    }
    distribution = nextDist;
  }

  const totalPossibleOutcomes = Math.pow(sides, count);
  const result: DiceDistributionItem[] = [];

  let cumulative = 0;
  for (let s = count; s <= count * sides; s++) {
    const ways = distribution[s] || 0;
    const prob = (ways / totalPossibleOutcomes) * 100;
    cumulative += prob;
    result.push({
      value: s,
      ways,
      combinations: ways,
      probability: Number(prob.toFixed(3)),
      cumulativeProbability: Number(Math.min(100, cumulative).toFixed(2))
    });
  }

  return result;
}

/**
 * Theoretical probability distribution and statistics for D&D 4d6 Drop Lowest ability score generation
 */
export function get4d6DropLowestStats() {
  const distribution: Record<number, number> = {};
  let totalCombos = 0;

  for (let d1 = 1; d1 <= 6; d1++) {
    for (let d2 = 1; d2 <= 6; d2++) {
      for (let d3 = 1; d3 <= 6; d3++) {
        for (let d4 = 1; d4 <= 6; d4++) {
          const sum = d1 + d2 + d3 + d4 - Math.min(d1, d2, d3, d4);
          distribution[sum] = (distribution[sum] || 0) + 1;
          totalCombos++;
        }
      }
    }
  }

  let totalScoreSum = 0;
  const probabilities: Record<number, number> = {};

  for (let s = 3; s <= 18; s++) {
    const count = distribution[s] || 0;
    totalScoreSum += s * count;
    probabilities[s] = Number(((count / totalCombos) * 100).toFixed(2));
  }

  return {
    average: Number((totalScoreSum / totalCombos).toFixed(2)), // 12.24
    min: 3,
    max: 18,
    probabilities
  };
}

