/**
 * Fast Client-Side Search Index for SpinWheelGames.org
 * Indexed local data for 106+ wheel templates with zero external API calls.
 */

import { ALL_WHEEL_EXPERIENCES, WheelExperience, experienceToWheelConfig } from './wheelLibrary';
import { WheelConfig } from './presets';
import { sanitizeString } from './security';

export interface SearchResultItem {
  id: string;
  name: string;
  category: string;
  purpose: string;
  uniqueValueProposition: string;
  entriesCount: number;
  sampleEntries: string[];
  score: number;
  wheelConfig: WheelConfig;
}

interface IndexedWheel {
  exp: WheelExperience;
  normalizedName: string;
  normalizedCategory: string;
  normalizedPurpose: string;
  normalizedUvp: string;
  normalizedEntries: string[];
  keywords: string[];
}

// Build static pre-tokenized index in memory once
const WHEEL_SEARCH_INDEX: IndexedWheel[] = ALL_WHEEL_EXPERIENCES.map((exp) => {
  const normName = exp.name.toLowerCase();
  const normCat = exp.category.toLowerCase();
  const normPurp = exp.purpose.toLowerCase();
  const normUvp = exp.uniqueValueProposition.toLowerCase();
  const normEntries = exp.defaultEntries.map((e) => e.toLowerCase());

  // Tokenize keywords
  const keywords = Array.from(
    new Set([
      ...normName.split(/\s+/),
      ...normCat.split(/[\s/]+/),
      ...normPurp.split(/\s+/),
      ...normEntries
    ])
  ).filter((k) => k.length > 1);

  return {
    exp,
    normalizedName: normName,
    normalizedCategory: normCat,
    normalizedPurpose: normPurp,
    normalizedUvp: normUvp,
    normalizedEntries: normEntries,
    keywords
  };
});

/**
 * Searches the local index using multi-tier ranking:
 * 1. Exact name match (highest)
 * 2. Prefix / Starts-with match
 * 3. Category match
 * 4. Entry item match
 * 5. Purpose / description match
 */
export function searchWheelIndex(rawQuery: string, limit = 15): SearchResultItem[] {
  const query = sanitizeString(rawQuery).toLowerCase().trim();

  if (!query) {
    // Return curated popular wheels by default
    return ALL_WHEEL_EXPERIENCES.slice(0, Math.min(limit, 8)).map((exp) => ({
      id: exp.id,
      name: exp.name,
      category: exp.category,
      purpose: exp.purpose,
      uniqueValueProposition: exp.uniqueValueProposition,
      entriesCount: exp.defaultEntries.length,
      sampleEntries: exp.defaultEntries.slice(0, 4),
      score: 1,
      wheelConfig: experienceToWheelConfig(exp)
    }));
  }

  const queryTerms = query.split(/\s+/).filter(Boolean);
  const scored: SearchResultItem[] = [];

  for (const item of WHEEL_SEARCH_INDEX) {
    let score = 0;

    // Check exact name
    if (item.normalizedName === query) {
      score += 100;
    } else if (item.normalizedName.startsWith(query)) {
      score += 60;
    } else if (item.normalizedName.includes(query)) {
      score += 40;
    }

    // Check category
    if (item.normalizedCategory.includes(query)) {
      score += 25;
    }

    // Check UVP / Purpose
    if (item.normalizedPurpose.includes(query) || item.normalizedUvp.includes(query)) {
      score += 15;
    }

    // Check individual entry contents
    const matchingEntries = item.normalizedEntries.filter((e) => e.includes(query));
    if (matchingEntries.length > 0) {
      score += Math.min(matchingEntries.length * 5, 20);
    }

    // Multi-term keyword boost
    for (const term of queryTerms) {
      if (item.keywords.some((k) => k.includes(term))) {
        score += 8;
      }
    }

    if (score > 0) {
      scored.push({
        id: item.exp.id,
        name: item.exp.name,
        category: item.exp.category,
        purpose: item.exp.purpose,
        uniqueValueProposition: item.exp.uniqueValueProposition,
        entriesCount: item.exp.defaultEntries.length,
        sampleEntries: item.exp.defaultEntries.slice(0, 4),
        score,
        wheelConfig: experienceToWheelConfig(item.exp)
      });
    }
  }

  return scored.sort((a, b) => b.score - a.score).slice(0, limit);
}
