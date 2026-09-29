import { SITE_COUNTS } from "./siteConfig";
/**
 * Fast Client-Side Search Index for SpinWheelGames.org
 * Indexed local data for registered wheel templates and dedicated tool pages.
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
  for (const exp of (ALL_WHEEL_EXPERIENCES || [])) {
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

  // 3. Index Dedicated 3D Dice Tools, Daily Challenges, and Game Directory
  const DEDICATED_DICE_AND_SPECIAL_TOOLS = [
    {
      id: 'dice-roller',
      name: '3D Interactive Dice Roller',
      category: 'Dice & RPG Tools',
      purpose: 'Interactive 3D customizable dice simulator with realistic physics for D&D and tabletop gaming.',
      uvp: 'Roll any combination of d4, d6, d8, d10, d12, d20, and d100 with realistic 3D rigid-body physics.',
      fullPath: '/dice-roller',
      keywords: ['dice', 'dice roller', 'roll dice', '3d dice', 'dnd dice', 'virtual dice', 'polyhedral dice', 'tabletop dice', 'dice simulator', 'die', 'rolling dice', 'd6', 'd20', 'roller'],
      entries: ['1d20', '2d6', '4d6', '1d100', '1d12', '1d8', '1d4', '1d10']
    },
    {
      id: 'dice-collection',
      name: '3D RPG Dice Collection',
      category: 'Dice & RPG Tools',
      purpose: 'Official 8-piece gemstone crystal polyhedra showcase and 3D dice rollers.',
      uvp: 'Complete collection of polyhedral tabletop dice with custom materials and colors.',
      fullPath: '/dice-collection',
      keywords: ['dice collection', 'rpg dice', 'gemstone dice', 'polyhedra', 'dice set', 'd&d dice set', 'dice'],
      entries: ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100', 'd2']
    },
    {
      id: 'dnd-stat-roller',
      name: 'D&D Stat Roller (4d6 Drop Lowest)',
      category: 'Dice & RPG Tools',
      purpose: 'Roll 6 D&D ability scores in 3D using 4d6 drop lowest, 27 point buy, and standard array.',
      uvp: 'Character creation ability score generator with 4d6 drop-lowest rule and point buy calculator.',
      fullPath: '/dnd-stat-roller',
      keywords: ['dnd stat roller', '4d6 drop lowest', 'dnd stats', 'stat generator', 'ability scores', 'point buy calculator', 'character creator', 'dice', 'dnd dice'],
      entries: ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma']
    },
    {
      id: 'roll-4d6',
      name: 'Roll 4d6 (Drop Lowest)',
      category: 'Dice & RPG Tools',
      purpose: 'Roll 4d6 and automatically drop the lowest die for D&D 5e character generation.',
      uvp: '3D animated 4d6 ability score roll with automatic sum and drop calculation.',
      fullPath: '/roll-4d6',
      keywords: ['roll 4d6', '4d6', '4d6 drop lowest', '4d6dl1', 'stat roller', 'dnd dice roll', 'dice'],
      entries: ['Die 1', 'Die 2', 'Die 3', 'Die 4 (Lowest Dropped)']
    },
    {
      id: 'dice-average-calculator',
      name: 'Dice Average Calculator',
      category: 'Dice & RPG Tools',
      purpose: 'Calculate theoretical averages, expected values, standard deviation, and bell curves for any dice formula.',
      uvp: 'Exact probability distributions, bell curves, and expected damage outcomes for RPG dice formulas.',
      fullPath: '/dice-average-calculator',
      keywords: ['dice average calculator', 'dice average', 'dice probability', 'bell curve', 'expected value', 'standard deviation', 'dnd average damage', 'dice math'],
      entries: ['Mean / Average', 'Standard Deviation', 'Min / Max', 'Probability Bell Curve']
    },
    {
      id: 'dice-d20',
      name: 'D20 Dice Roller (3D)',
      category: 'Dice & RPG Tools',
      purpose: 'Roll a 20-sided icosahedron die in 3D for D&D attack rolls, ability checks, and saving throws.',
      uvp: 'Single and advantage/disadvantage d20 roller with critical hit animations.',
      fullPath: '/dice/d20',
      keywords: ['d20', 'd20 roller', 'roll d20', '20 sided die', 'advantage', 'disadvantage', 'critical hit', 'nat 20', 'dnd 20', 'dice'],
      entries: ['1 to 20', 'Advantage (2d20kh1)', 'Disadvantage (2d20kl1)']
    },
    {
      id: 'dice-d6',
      name: 'D6 Dice Roller (3D)',
      category: 'Dice & RPG Tools',
      purpose: 'Roll 6-sided cubic dice in 3D for tabletop games, Yahtzee, and RPG damage.',
      uvp: 'Realistic 3D cubic die roller with authentic physics bounce and audio.',
      fullPath: '/dice/d6',
      keywords: ['d6', 'd6 roller', 'roll d6', '6 sided die', 'cube die', 'yahtzee dice', 'roll a die', 'six sided dice', 'dice'],
      entries: ['1', '2', '3', '4', '5', '6']
    },
    {
      id: 'roll-1d4',
      name: 'Roll 1d4 Dice Roller (3D)',
      category: 'Dice & RPG Tools',
      purpose: 'Roll 4-sided tetrahedral dice in 3D for D&D daggers, healing potions, and magic missiles.',
      uvp: 'Calibrated tetrahedral physics for standard 4-sided gaming dice.',
      fullPath: '/roll-1d4',
      keywords: ['roll 1d4', 'roll d4', 'd4', 'd4 roller', '4 sided die', 'tetrahedron', 'dice', '1d4'],
      entries: ['1', '2', '3', '4']
    },
    {
      id: 'dice-d8',
      name: 'D8 Dice Roller (3D)',
      category: 'Dice & RPG Tools',
      purpose: 'Roll 8-sided octahedral dice in 3D for rapier, longsword, and cure wounds.',
      uvp: 'Octahedral 3D physics simulation with crisp face detection.',
      fullPath: '/dice/d8',
      keywords: ['d8', 'd8 roller', 'roll d8', '8 sided die', 'octahedron', 'dice'],
      entries: ['1', '2', '3', '4', '5', '6', '7', '8']
    },
    {
      id: 'dice-d10',
      name: 'D10 Dice Roller (3D)',
      category: 'Dice & RPG Tools',
      purpose: 'Roll 10-sided pentagonal trapezohedron dice in 3D for cantrips and percentiles.',
      uvp: 'Single and double d10 percentile rolls.',
      fullPath: '/dice/d10',
      keywords: ['d10', 'd10 roller', 'roll d10', '10 sided die', 'percentile', 'dice'],
      entries: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    },
    {
      id: 'dice-d12',
      name: 'D12 Dice Roller (3D)',
      category: 'Dice & RPG Tools',
      purpose: 'Roll 12-sided dodecahedron dice in 3D for greataxes and barbarian rage damage.',
      uvp: 'Dodecahedron 12-sided geometry with realistic roll dynamics.',
      fullPath: '/dice/d12',
      keywords: ['d12', 'd12 roller', 'roll d12', '12 sided die', 'dodecahedron', 'dice'],
      entries: ['1 to 12']
    },
    {
      id: 'dice-d100',
      name: 'D100 Percentile Dice Roller (3D)',
      category: 'Dice & RPG Tools',
      purpose: 'Roll percentile dice (d100) in 3D for random encounters, loot tables, and wild magic surges.',
      uvp: 'Twin d10 percentile roller from 1% to 100%.',
      fullPath: '/dice/d100',
      keywords: ['d100', 'd100 roller', 'percentile dice', 'roll 100', 'percentile roller', 'wild magic', 'dice'],
      entries: ['00 - 90', '0 - 9', '1 to 100']
    },
    {
      id: 'challenges',
      name: 'Daily Wheel Challenges',
      category: 'Daily Quests',
      purpose: 'Global synchronized daily wheel quest and streak builder.',
      uvp: 'Spin today’s global quest wheel, maintain your daily streak, and unlock milestone badges.',
      fullPath: '/challenges',
      keywords: ['daily challenge', 'challenges', 'daily wheel', 'daily quest', 'streak', 'daily streak', 'quest'],
      entries: ['Today\'s Quest', 'Streak Multiplier', 'Milestone Badges']
    },
    {
      id: 'games',
      name: 'All Wheel Games Directory',
      category: 'Game Directory',
      purpose: 'Browse and filter all decision spinner wheels, classroom pickers, and party games.',
      uvp: 'Complete searchable catalog of every decision wheel and dice roller on SpinWheelGames.',
      fullPath: '/games',
      keywords: ['all games', 'wheel games', 'game directory', 'browse wheels', 'all spinners', 'games'],
      entries: ['Popular Wheels', 'Trending Games', 'Classroom Pickers', '3D Dice']
    }
  ];

  for (const tool of DEDICATED_DICE_AND_SPECIAL_TOOLS) {
    const normName = tool.name.toLowerCase();
    const normCat = tool.category.toLowerCase();
    const normPurp = tool.purpose.toLowerCase();
    const normUvp = tool.uvp.toLowerCase();
    const normEntries = tool.entries.map((e) => e.toLowerCase());

    const keywords = Array.from(
      new Set([
        ...tool.keywords.map((k) => k.toLowerCase()),
        ...normName.split(/\s+/),
        ...normCat.split(/[\s/]+/),
        ...normPurp.split(/\s+/),
        ...normEntries,
        tool.id.toLowerCase(),
        tool.id.replace(/-/g, ' ')
      ])
    ).filter((k) => k.length > 1);

    const diceWheelConfig: WheelConfig = {
      id: tool.id,
      title: tool.name,
      category: tool.category.toUpperCase(),
      description: tool.purpose,
      items: tool.entries.map((text, idx) => ({ id: `${tool.id}-${idx}`, text, weight: 1 })),
      palette: ['#4648d4', '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b', '#10b981', '#06b6d4'],
      themeKey: 'arcade'
    };

    map.set(tool.id, {
      id: tool.id,
      name: tool.name,
      category: tool.category,
      purpose: tool.purpose,
      uvp: tool.uvp,
      fullPath: tool.fullPath,
      normalizedName: normName,
      normalizedCategory: normCat,
      normalizedPurpose: normPurp,
      normalizedUvp: normUvp,
      normalizedEntries: normEntries,
      keywords,
      wheelConfig: diceWheelConfig,
      entriesCount: tool.entries.length,
      sampleEntries: tool.entries.slice(0, 4)
    });
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
