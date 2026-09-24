/**
 * Fast Client-Side Search Index for SpinWheelGames.org
 * Indexed local data for 116+ wheel templates and dedicated tool pages.
 */

import { ALL_WHEEL_EXPERIENCES, WheelExperience, experienceToWheelConfig } from './wheelLibrary';
import { WheelConfig } from './presets';
import { sanitizeString } from './security';
import { ALL_SEO_PAGES_LIST } from './seoData';

export interface SearchResultItem {
  id: string;
  name: string;
  category: string;
  purpose: string;
  uniqueValueProposition: string;
  entriesCount: number;
  sampleEntries: string[];
  score: number;
  fullPath: string;
  wheelConfig: WheelConfig;
}

interface IndexedWheel {
  id: string;
  name: string;
  category: string;
  purpose: string;
  uvp: string;
  fullPath: string;
  normalizedName: string;
  normalizedCategory: string;
  normalizedPurpose: string;
  normalizedUvp: string;
  normalizedEntries: string[];
  keywords: string[];
  wheelConfig: WheelConfig;
  entriesCount: number;
  sampleEntries: string[];
}

// Build pre-indexed array of all experiences and SEO tools
const WHEEL_SEARCH_INDEX: IndexedWheel[] = (() => {
  const map = new Map<string, IndexedWheel>();

  // 1. Index ALL_WHEEL_EXPERIENCES
  for (const exp of ALL_WHEEL_EXPERIENCES) {
    const normName = exp.name.toLowerCase();
    const normCat = exp.category.toLowerCase();
    const normPurp = exp.purpose.toLowerCase();
    const normUvp = (exp.uniqueValueProposition || '').toLowerCase();
    const normEntries = (exp.defaultEntries || []).map((e) => e.toLowerCase());

    const keywords = Array.from(
      new Set([
        ...normName.split(/\s+/),
        ...normCat.split(/[\s/]+/),
        ...normPurp.split(/\s+/),
        ...normEntries,
        exp.id.toLowerCase(),
        exp.id.replace(/-/g, ' ')
      ])
    ).filter((k) => k.length > 1);

    map.set(exp.id, {
      id: exp.id,
      name: exp.name,
      category: exp.category,
      purpose: exp.purpose,
      uvp: exp.uniqueValueProposition || exp.purpose,
      fullPath: `/${exp.id}`,
      normalizedName: normName,
      normalizedCategory: normCat,
      normalizedPurpose: normPurp,
      normalizedUvp: normUvp,
      normalizedEntries: normEntries,
      keywords,
      wheelConfig: experienceToWheelConfig(exp),
      entriesCount: exp.defaultEntries.length,
      sampleEntries: exp.defaultEntries.slice(0, 4)
    });
  }

  // 2. Index any additional dedicated SEO tool pages (like animal-wheel, number-wheel, etc.)
  for (const page of ALL_SEO_PAGES_LIST) {
    if (page.pageType === 'tool' || page.pageType === 'subtool') {
      const existing = map.get(page.slug);
      const cleanName = page.title.split('–')[0].split('-')[0].trim();
      const normName = cleanName.toLowerCase();
      const normCat = (page.parentCategoryName || page.categoryKey || '').toLowerCase();
      const normPurp = (page.introduction || page.metaDescription || '').toLowerCase();
      const normEntries = (page.defaultWheelData?.items || []).map((i) => i.text.toLowerCase());

      const keywords = Array.from(
        new Set([
          ...(existing?.keywords || []),
          ...normName.split(/\s+/),
          ...normCat.split(/[\s/]+/),
          ...normPurp.split(/\s+/),
          ...normEntries,
          page.slug.toLowerCase(),
          page.slug.replace(/-/g, ' ')
        ])
      ).filter((k) => k.length > 1);

      const items = (page.defaultWheelData?.items || []).map((item, idx) => ({
        id: item.id || `${page.slug}-item-${idx + 1}`,
        text: item.text,
        weight: item.weight || 1
      }));

      const wheelConfig: WheelConfig = {
        id: page.slug,
        title: page.defaultWheelData?.title || `${cleanName} Wheel`,
        category: (page.parentCategoryName || 'DECISIONS').toUpperCase(),
        description: page.introduction || page.metaDescription,
        items: items.length > 0 ? items : [{ id: '1', text: 'Option 1', weight: 1 }, { id: '2', text: 'Option 2', weight: 1 }],
        palette: ['#4648d4', '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b', '#10b981', '#06b6d4'],
        themeKey: 'arcade'
      };

      map.set(page.slug, {
        id: page.slug,
        name: cleanName,
        category: page.parentCategoryName || 'General',
        purpose: page.metaDescription || page.introduction,
        uvp: page.introduction || page.metaDescription,
        fullPath: page.fullPath || `/${page.slug}`,
        normalizedName: normName,
        normalizedCategory: normCat,
        normalizedPurpose: normPurp,
        normalizedUvp: normPurp,
        normalizedEntries: normEntries,
        keywords,
        wheelConfig: existing ? existing.wheelConfig : wheelConfig,
        entriesCount: items.length,
        sampleEntries: items.slice(0, 4).map((i) => i.text)
      });
    }
  }

  return Array.from(map.values());
})();

/**
 * Searches the index with multi-tier ranking:
 * 1. Exact name / slug match (highest)
 * 2. Prefix / Starts-with match
 * 3. Substring name match
 * 4. Synonym / keyword matches (e.g., animal, animals, dinosaur, number)
 * 5. Category match
 * 6. Entry items & description match
 */
export function searchWheelIndex(rawQuery: string, limit = 16): SearchResultItem[] {
  const query = sanitizeString(rawQuery).toLowerCase().trim();

  if (!query) {
    // Return curated popular wheels by default
    return WHEEL_SEARCH_INDEX.slice(0, Math.min(limit, 8)).map((item) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      purpose: item.purpose,
      uniqueValueProposition: item.uvp,
      entriesCount: item.entriesCount,
      sampleEntries: item.sampleEntries,
      score: 1,
      fullPath: item.fullPath,
      wheelConfig: item.wheelConfig
    }));
  }

  const queryTerms = query.split(/\s+/).filter(Boolean);
  const scored: SearchResultItem[] = [];

  for (const item of WHEEL_SEARCH_INDEX) {
    let score = 0;

    // 1. Exact matches
    if (item.normalizedName === query || item.id === query || item.id.replace(/-/g, ' ') === query) {
      score += 150;
    } else if (item.normalizedName.startsWith(query) || item.id.startsWith(query)) {
      score += 90;
    } else if (item.normalizedName.includes(query) || item.id.includes(query) || item.id.replace(/-/g, ' ').includes(query)) {
      score += 60;
    }

    // 2. Check if all query terms match name or id (e.g. "animal wheel")
    const allTermsMatchName = queryTerms.length > 1 && queryTerms.every((term) => {
      const termSing = term.endsWith('s') ? term.slice(0, -1) : term;
      return item.normalizedName.includes(term) || item.normalizedName.includes(termSing) || item.id.includes(term) || item.id.includes(termSing);
    });
    if (allTermsMatchName) {
      score += 100;
    }

    // 3. Singular/Plural heuristic for common words (e.g., animal -> animals)
    const singularQuery = query.endsWith('s') ? query.slice(0, -1) : query;
    const pluralQuery = query.endsWith('s') ? query : `${query}s`;

    if (item.normalizedName.includes(singularQuery) || item.normalizedName.includes(pluralQuery)) {
      score += 40;
    }

    // 4. Category match
    if (item.normalizedCategory.includes(query)) {
      score += 25;
    }

    // 5. Purpose / UVP match
    if (item.normalizedPurpose.includes(query) || item.normalizedUvp.includes(query)) {
      score += 18;
    }

    // 6. Individual slice contents
    const matchingEntries = item.normalizedEntries.filter((e) => e.includes(query) || e.includes(singularQuery));
    if (matchingEntries.length > 0) {
      score += Math.min(matchingEntries.length * 8, 30);
    }

    // 7. Keywords
    for (const term of queryTerms) {
      const termSingular = term.endsWith('s') ? term.slice(0, -1) : term;
      if (item.keywords.some((k) => k.includes(term) || k.includes(termSingular))) {
        score += 12;
      }
    }

    if (score > 0) {
      scored.push({
        id: item.id,
        name: item.name,
        category: item.category,
        purpose: item.purpose,
        uniqueValueProposition: item.uvp,
        entriesCount: item.entriesCount,
        sampleEntries: item.sampleEntries,
        score,
        fullPath: item.fullPath,
        wheelConfig: item.wheelConfig
      });
    }
  }

  return scored.sort((a, b) => b.score - a.score).slice(0, limit);
}
