import { ALL_SEO_PAGES_MAP, getSeoPageByPath } from './seoData';
import { WHEEL_PRESETS, COLOR_PALETTES } from './presets';
import { WheelItem } from './types';
import { decodeCompactWheel } from './shortener';
import { parseSafeShareConfig } from './security';

export interface ViralDiceConfig {
  sides: number;
  count: number;
  dropLowest?: number;
  keepHighest?: number;
  modifier?: number;
  notation: string;
}

export interface ViralToolConfig {
  slug: string;
  title: string;
  subtitle: string;
  canonicalPath: string;
  paletteKey: string;
  palette: string[];
  items: WheelItem[];
  toolKind?: 'wheel' | 'dice';
  diceConfig?: ViralDiceConfig;
}

export interface StreamParamsConfig {
  stream: boolean;
  autospin: boolean;
  size: 'sm' | 'md' | 'lg';
  theme: 'light' | 'dark';
  labels: 'normal' | 'outline';
  sound: boolean;
  removewinner: boolean;
  winnerseconds: number;
  history: boolean;
  quality: 'high' | 'low';
  fps: 30 | 60;
  fair: boolean;
  sessionId: string;
  entriesRaw: string;
}

export const STREAMER_SETTINGS_STORAGE_KEY = 'swg_streamer_settings_v1';

/**
 * Strictly sanitizes user-provided text or query parameter strings to prevent XSS.
 * Strips HTML tags, script protocols, and control characters, and enforces length limits.
 */
export function sanitizeStreamText(input: unknown, maxLength = 80): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<[^>]*>/g, '') // Strip any HTML/XML tags
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/[\u0000-\u001F\u007F]/g, '') // Strip control characters
    .trim()
    .slice(0, maxLength);
}

/**
 * Parses and sanitizes comma-, pipe-, or newline-separated entries (max 200 entries, max 80 chars each).
 */
export function parseSanitizedStreamEntries(
  raw: string | null | undefined,
  maxEntries = 200
): WheelItem[] {
  if (!raw || typeof raw !== 'string') return [];
  const delimiter = raw.includes('|')
    ? '|'
    : raw.includes('\n')
    ? '\n'
    : ',';
  const parts = raw
    .split(delimiter)
    .map((part) => sanitizeStreamText(part, 80))
    .filter((text) => text.length > 0)
    .slice(0, maxEntries);

  return parts.map((text, idx) => ({
    id: `slice-${idx}-${text.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 12)}`,
    text,
    weight: 1
  }));
}

/**
 * Generates a cryptographically random, unguessable session ID for /stream-control.
 */
export function generateStreamSessionId(): string {
  const chars = 'abcdefghijkmnpqrstuvwxyz23456789';
  if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {
    const bytes = new Uint8Array(16);
    window.crypto.getRandomValues(bytes);
    return Array.from(bytes, (b) => chars[b % chars.length]).join('');
  }
  let fallback = '';
  for (let i = 0; i < 16; i++) {
    fallback += chars[Math.floor(Math.random() * chars.length)];
  }
  return fallback;
}

/**
 * Parses URLSearchParams into a validated, sanitized StreamParamsConfig.
 */
export function parseStreamQueryParams(sp: URLSearchParams): StreamParamsConfig {
  const sizeParam = sp.get('size');
  const size: 'sm' | 'md' | 'lg' =
    sizeParam === 'sm' || sizeParam === 'md' || sizeParam === 'lg' ? sizeParam : 'md';

  const themeParam = sp.get('theme');
  const theme: 'light' | 'dark' = themeParam === 'light' ? 'light' : 'dark';

  const labelsParam = sp.get('labels');
  const labels: 'normal' | 'outline' = labelsParam === 'normal' ? 'normal' : 'outline';

  const soundParam = sp.get('sound');
  const sound = soundParam !== '0' && soundParam !== 'false';

  const removewinner = sp.get('removewinner') === '1' || sp.get('removewinner') === 'true';

  const rawSeconds = sp.get('winnerseconds');
  let winnerseconds = 5;
  if (rawSeconds !== null && rawSeconds.trim() !== '') {
    const parsedSec = Number(rawSeconds);
    if (!Number.isNaN(parsedSec)) {
      winnerseconds = Math.max(0, Math.min(60, Math.round(parsedSec)));
    }
  }

  const autospin = sp.get('autospin') === '1' || sp.get('autospin') === 'true';
  const history = sp.get('history') === '1' || sp.get('history') === 'true';
  const quality: 'high' | 'low' = sp.get('quality') === 'low' ? 'low' : 'high';
  const fps: 30 | 60 = sp.get('fps') === '60' ? 60 : 30;
  const fair = sp.get('fair') !== '0' && sp.get('fair') !== 'false';

  const rawId = sp.get('id') || sp.get('session') || '';
  const sessionId = rawId.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 32);

  const entriesRaw = sp.get('entries') || sp.get('items') || '';

  return {
    stream: sp.get('stream') === '1' || sp.get('stream') === 'true',
    autospin,
    size,
    theme,
    labels,
    sound,
    removewinner,
    winnerseconds,
    history,
    quality,
    fps,
    fair,
    sessionId,
    entriesRaw
  };
}

export function loadSavedStreamerSettings(): Partial<StreamParamsConfig> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STREAMER_SETTINGS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === 'object' && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

export function saveStreamerSettings(settings: Partial<StreamParamsConfig>): void {
  if (typeof window === 'undefined') return;
  try {
    const current = loadSavedStreamerSettings();
    const merged = { ...current, ...settings };
    localStorage.setItem(STREAMER_SETTINGS_STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // Ignore storage quota errors
  }
}

function makeSlices(entries: string[]): WheelItem[] {
  return entries.map((text, idx) => ({
    id: `slice-${idx}`,
    text,
    weight: 1
  }));
}

export const DICE_TOOL_CONFIGS: Record<string, ViralDiceConfig> = {
  'dice/d2': { sides: 2, count: 1, notation: '1d2' },
  'dice/d4': { sides: 4, count: 1, notation: '1d4' },
  'dice/d6': { sides: 6, count: 1, notation: '1d6' },
  'dice/d8': { sides: 8, count: 1, notation: '1d8' },
  'dice/d10': { sides: 10, count: 1, notation: '1d10' },
  'dice/d12': { sides: 12, count: 1, notation: '1d12' },
  'dice/d20': { sides: 20, count: 1, notation: '1d20' },
  'dice/d100': { sides: 100, count: 1, notation: '1d100' },
  'roll-1d4': { sides: 4, count: 1, notation: '1d4' },
  'roll-d3': { sides: 3, count: 1, notation: '1d3' },
  'roll-2d12': { sides: 12, count: 2, notation: '2d12' },
  'roll-3d6': { sides: 6, count: 3, notation: '3d6' },
  'roll-4d6': { sides: 6, count: 4, dropLowest: 1, notation: '4d6dl1' },
  'roll-5d6': { sides: 6, count: 5, notation: '5d6' },
  'dnd-stat-roller': { sides: 6, count: 4, dropLowest: 1, notation: '4d6dl1' },
  'dice-roller': { sides: 20, count: 1, notation: '1d20' },
  'dice-collection': { sides: 20, count: 1, notation: '1d20' },
  'unusual-dice': { sides: 20, count: 1, notation: '1d20' },
  'dice-average-calculator': { sides: 6, count: 2, notation: '2d6' }
};

export const SPECIALIZED_TOOL_CONFIGS: Record<string, Omit<ViralToolConfig, 'palette'>> = {
  home: {
    slug: 'wheel-of-names',
    title: 'Spin the Wheel Decider',
    subtitle: 'Free interactive random wheel picker with Web Crypto CSPRNG fairness.',
    canonicalPath: '/',
    paletteKey: 'arcade',
    toolKind: 'wheel',
    items: WHEEL_PRESETS[0].items
  },
  'wheel-of-names': {
    slug: 'wheel-of-names',
    title: 'Wheel of Names',
    subtitle: 'Pick random names, classroom students, or raffle winners with zero bias.',
    canonicalPath: '/wheel-of-names',
    paletteKey: 'arcade',
    toolKind: 'wheel',
    items: makeSlices([
      'Alexander', 'Sophia', 'Liam', 'Emma', 'Noah', 'Olivia',
      'Ethan', 'Ava', 'Lucas', 'Isabella', 'Mason', 'Mia'
    ])
  },
  'food-wheel': {
    slug: 'food-wheel',
    title: 'Food & Dinner Wheel',
    subtitle: 'Decide what to eat, cook, or order tonight in one spin.',
    canonicalPath: '/food-wheel',
    paletteKey: 'sunset',
    toolKind: 'wheel',
    items: makeSlices([
      '🍕 Wood-Fired Pizza', '🍣 Sushi Platter', '🌮 Street Tacos', '🍔 Smash Burgers',
      '🍜 Ramen Bowls', '🥗 Mediterranean Grill', '🍛 Thai Green Curry', '🍝 Fresh Pasta'
    ])
  },
  'animal-wheel': {
    slug: 'animal-wheel',
    title: 'Random Animal Wheel',
    subtitle: 'Spin to pick mammals, birds, marine life, and wild creatures.',
    canonicalPath: '/animal-wheel',
    paletteKey: 'emerald',
    toolKind: 'wheel',
    items: makeSlices([
      '🦁 African Lion', '🐬 Bottlenose Dolphin', '🐼 Giant Panda', '🦅 Bald Eagle',
      '🐘 African Elephant', '🐧 Emperor Penguin', '🦊 Red Fox', '🐨 Koala',
      '🐯 Bengal Tiger', '🦉 Snowy Owl', '🐙 Giant Octopus', '🦒 Giraffe'
    ])
  },
  'bingo-wheel': {
    slug: 'bingo-wheel',
    title: 'Bingo Number Caller Wheel',
    subtitle: 'Live 75-ball and 90-ball interactive Bingo spinner.',
    canonicalPath: '/bingo-wheel',
    paletteKey: 'carnival',
    toolKind: 'wheel',
    items: makeSlices([
      'B-1', 'B-7', 'B-14', 'I-19', 'I-24', 'I-29',
      'N-33', 'N-41', 'G-48', 'G-56', 'O-63', 'O-72'
    ])
  },
  'birthday-wheel': {
    slug: 'birthday-wheel',
    title: 'Birthday Activity & Gift Wheel',
    subtitle: 'Spin fun birthday party games, dares, and gift ideas.',
    canonicalPath: '/birthday-wheel',
    paletteKey: 'pastel',
    toolKind: 'wheel',
    items: makeSlices([
      '🎂 Make a Wish', '🎁 Open Next Gift', '🎤 Sing Happy Birthday', '🕺 Dance-Off Round',
      '📸 Group Photo Challenge', '🍬 Pinata Spin', '🎈 Balloon Pop Game', '👑 Birthday Trivia'
    ])
  },
  'classroom-wheel': {
    slug: 'classroom-wheel',
    title: 'Classroom Student & Activity Picker',
    subtitle: 'Fair student selector, brain breaks, and classroom rewards.',
    canonicalPath: '/classroom-wheel',
    paletteKey: 'ocean',
    toolKind: 'wheel',
    items: makeSlices([
      'Line Leader', 'Board Eraser', 'Tech Helper', 'Read Aloud Reader',
      '5-Min Brain Break', 'No Homework Pass', 'Choose Next Game', 'Sticker Reward'
    ])
  },
  'color-wheel': {
    slug: 'color-wheel',
    title: 'Random Color & Palette Wheel',
    subtitle: 'Generate random colors, harmonies, and art challenges.',
    canonicalPath: '/color-wheel',
    paletteKey: 'arcade',
    toolKind: 'wheel',
    items: makeSlices([
      'Crimson Red (#EF4444)', 'Amber Gold (#F59E0B)', 'Emerald Green (#10B981)',
      'Cobalt Blue (#3B82F6)', 'Royal Indigo (#6366F1)', 'Electric Violet (#8B5CF6)',
      'Hot Magenta (#EC4899)', 'Turquoise Cyan (#06B6D4)'
    ])
  },
  'comment-picker': {
    slug: 'comment-picker',
    title: 'Comment & Giveaway Winner Picker',
    subtitle: 'Cryptographically fair raffle and social giveaway draw wheel.',
    canonicalPath: '/comment-picker',
    paletteKey: 'neon',
    toolKind: 'wheel',
    items: makeSlices([
      '@alex_creates', '@sarah_designs', '@marco_dev', '@elena_plays',
      '@jordan_streams', '@chloe_art', '@liam_tech', '@maya_vlogs'
    ])
  },
  'drawing-wheel': {
    slug: 'drawing-wheel',
    title: 'Drawing Idea & Art Prompt Wheel',
    subtitle: 'Beat artist block with creative sketch prompts and style challenges.',
    canonicalPath: '/drawing-wheel',
    paletteKey: 'pastel',
    toolKind: 'wheel',
    items: makeSlices([
      '🎨 Cyberpunk Street Cat', '🏰 Floating Sky Castle', '🐉 Crystal Dragon',
      '🤖 Cozy Coffee Robot', '🌲 Enchanted Mushroom Forest', '🚀 Retro Space Diner',
      '🧜‍♀️ Deep Sea Lantern Merfolk', '🦊 Steampunk Clockwork Fox'
    ])
  },
  'movie-wheel': {
    slug: 'movie-wheel',
    title: 'Movie Night & Genre Decider',
    subtitle: 'Pick tonight’s movie genre, streaming service, or film challenge.',
    canonicalPath: '/movie-wheel',
    paletteKey: 'neon',
    toolKind: 'wheel',
    items: makeSlices([
      '🎬 Sci-Fi Thriller', '😂 Comedy Classic', '👻 Supernatural Horror', '🕵️‍♂️ Mystery Whodunit',
      '💥 Action Blockbuster', '🦸‍♂️ Animated Adventure', '🍿 90s Cult Classic', '🎭 Award-Winning Drama'
    ])
  },
  'number-wheel': {
    slug: 'number-wheel',
    title: 'Random Number Wheel (1–20)',
    subtitle: 'Spin random numbers with uniform cryptographic probability.',
    canonicalPath: '/number-wheel',
    paletteKey: 'arcade',
    toolKind: 'wheel',
    items: makeSlices(Array.from({ length: 20 }, (_, i) => String(i + 1)))
  },
  'random-number-wheel': {
    slug: 'random-number-wheel',
    title: 'Random Number Generator Wheel',
    subtitle: 'Instant 1 to 25 random number spinner for raffles and games.',
    canonicalPath: '/random-number-wheel',
    paletteKey: 'ocean',
    toolKind: 'wheel',
    items: makeSlices(Array.from({ length: 20 }, (_, i) => String(i + 1)))
  },
  'pokemon-wheel': {
    slug: 'pokemon-wheel',
    title: 'Random Pokémon Starter & Type Wheel',
    subtitle: 'Spin starter Pokémon, types, and Nuzlocke team challenges.',
    canonicalPath: '/pokemon-wheel',
    paletteKey: 'arcade',
    toolKind: 'wheel',
    items: makeSlices([
      '🌱 Bulbasaur', '🔥 Charmander', '💧 Squirtle', '⚡ Pikachu',
      '🍃 Chikorita', '🔥 Cyndaquil', '💧 Totodile', '🌿 Treecko',
      '🔥 Torchic', '💧 Mudkip', '🦊 Eevee', '👻 Gengar'
    ])
  },
  'question-wheel': {
    slug: 'question-wheel',
    title: 'Icebreaker & Question Wheel',
    subtitle: 'Spark conversation at meetings, parties, and classrooms.',
    canonicalPath: '/question-wheel',
    paletteKey: 'ocean',
    toolKind: 'wheel',
    items: makeSlices([
      'Dream Travel Destination?', 'Favorite Childhood Game?', 'Best Meal You Ever Had?',
      'Hidden Talent or Skill?', 'If You Had a Superpower?', 'Top Movie of All Time?',
      'Morning Bird or Night Owl?', 'Go-To Karaoke Song?'
    ])
  },
  'random-app-picker': {
    slug: 'random-app-picker',
    title: 'Random App & Challenge Picker',
    subtitle: 'Spin daily productivity habits, digital detox tasks, and challenges.',
    canonicalPath: '/random-app-picker',
    paletteKey: 'neon',
    toolKind: 'wheel',
    items: makeSlices([
      '📱 30-Min Offline Walk', '📚 Read 10 Pages', '💧 Drink a Glass of Water',
      '🧹 10-Min Desk Reset', '🧘 5-Min Deep Breathing', '🎵 Listen to a New Album',
      '✍️ Write 3 Gratitude Notes', '🏃 Quick Stretch Break'
    ])
  },
  'random-category-generator': {
    slug: 'random-category-generator',
    title: 'Random Trivia & Scattergories Wheel',
    subtitle: 'Spin random categories for word games, trivia nights, and charades.',
    canonicalPath: '/random-category-generator',
    paletteKey: 'carnival',
    toolKind: 'wheel',
    items: makeSlices([
      '🌍 World Capitals', '🎸 80s Rock Bands', '🍎 Tropical Fruits', '🎬 Oscar Winners',
      '🔬 Scientific Inventions', '🐾 Ocean Predators', '🏰 Historical Landmarks', '🍕 Italian Dishes'
    ])
  },
  'random-game-picker': {
    slug: 'random-game-picker',
    title: 'Random Video & Board Game Picker',
    subtitle: 'Decide what game your squad or family plays next.',
    canonicalPath: '/random-game-picker',
    paletteKey: 'neon',
    toolKind: 'wheel',
    items: makeSlices([
      '🎮 Mario Kart 8', '🃏 UNO No Mercy', '🏝️ Catan', '🕵️ Among Us',
      '⚔️ Super Smash Bros', '🎲 Monopoly Deal', '🧩 Codenames', '🏎️ Rocket League'
    ])
  },
  'random-object-generator': {
    slug: 'random-object-generator',
    title: 'Random Everyday Object Generator',
    subtitle: 'Spin random household items for improv, drawing, and scavenger hunts.',
    canonicalPath: '/random-object-generator',
    paletteKey: 'sunset',
    toolKind: 'wheel',
    items: makeSlices([
      '🕰️ Pocket Watch', '☂️ Yellow Umbrella', '🔭 Brass Telescope', '🔑 Skeleton Key',
      '🧭 Vintage Compass', '🕯️ Scented Candle', '📷 Polaroid Camera', '🎒 Leather Backpack',
      '🎧 Studio Headphones', '🪴 Potted Succulent', '☕ Ceramic Mug', '🕶️ Retro Sunglasses'
    ])
  },
  'song-wheel': {
    slug: 'song-wheel',
    title: 'Random Song & Karaoke Genre Wheel',
    subtitle: 'Spin music genres, decades, and karaoke party challenges.',
    canonicalPath: '/song-wheel',
    paletteKey: 'neon',
    toolKind: 'wheel',
    items: makeSlices([
      '🎤 90s Pop Anthems', '🎸 Classic Arena Rock', '🕺 70s Disco Groove', '🎧 2000s Hip-Hop & R&B',
      '🤠 Country Singalong', '🎹 Synthwave & 80s New Wave', '🎷 Smooth Indie Soul', '🎬 Disney & Movie Hits'
    ])
  },
  'team-generator': {
    slug: 'team-generator',
    title: 'Random Team & Captain Picker Wheel',
    subtitle: 'Draft balanced teams, captains, and group assignments fairly.',
    canonicalPath: '/team-generator',
    paletteKey: 'ocean',
    toolKind: 'wheel',
    items: makeSlices([
      'Team Alpha ⚡', 'Team Nova 🔥', 'Team Titan 🛡️', 'Team Vortex 🌊',
      'Team Falcon 🦅', 'Team Apex 🚀', 'Team Shadow 🌙', 'Team Blaze ☀️'
    ])
  },
  'theme-wheel': {
    slug: 'theme-wheel',
    title: 'Random Theme & Aesthetic Wheel',
    subtitle: 'Spin creative aesthetics, party themes, and design styles.',
    canonicalPath: '/theme-wheel',
    paletteKey: 'pastel',
    toolKind: 'wheel',
    items: makeSlices([
      '✨ Y2K Cyber Pop', '🌿 Cozy Cottagecore', '🌃 Neon Synthwave', '🏛️ Dark Academia',
      '🌊 Coastal Minimalist', '⚙️ Vintage Steampunk', '🌸 Pastel Vaporwave', '🪐 Retro Futurism'
    ])
  },
  'truth-or-dare-wheel': {
    slug: 'truth-or-dare-wheel',
    title: 'Truth or Dare Party Spinner Wheel',
    subtitle: 'Spin family-friendly truths, hilarious dares, and bonus challenges.',
    canonicalPath: '/truth-or-dare-wheel',
    paletteKey: 'carnival',
    toolKind: 'wheel',
    items: makeSlices([
      '🗣️ TRUTH: Biggest Fear?', '⚡ DARE: Best Celebrity Impression',
      '🗣️ TRUTH: Most Embarrassing Moment?', '⚡ DARE: Speak in an Accent (2 Rounds)',
      '🗣️ TRUTH: Secret Guilty Pleasure?', '⚡ DARE: Do 10 Jumping Jacks Now',
      '🎁 DOUBLE DARE: Let Left Neighbor Choose!', '🛡️ FREE PASS: Skip Your Turn'
    ])
  },
  'word-spinner': {
    slug: 'word-spinner',
    title: 'Random Word Spinner & Vocabulary Wheel',
    subtitle: 'Spin creative action words, charades prompts, and writing seeds.',
    canonicalPath: '/word-spinner',
    paletteKey: 'emerald',
    toolKind: 'wheel',
    items: makeSlices([
      'Serendipity', 'Labyrinth', 'Luminescent', 'Velocity',
      'Ephemeral', 'Cascade', 'Horizon', 'Momentum',
      'Odyssey', 'Catalyst', 'Solstice', 'Zenith'
    ])
  },
  'dice-roller': {
    slug: 'dice-roller',
    title: '3D Dice Roller (d20)',
    subtitle: 'Roll 3D polyhedral dice with cryptographic fairness.',
    canonicalPath: '/dice-roller',
    paletteKey: 'arcade',
    toolKind: 'dice',
    diceConfig: DICE_TOOL_CONFIGS['dice-roller'],
    items: makeSlices(Array.from({ length: 20 }, (_, i) => `🎲 Roll ${i + 1}`))
  },
  'roll-4d6': {
    slug: 'roll-4d6',
    title: '4d6 Drop Lowest D&D Stat Roller',
    subtitle: 'Roll 4d6 and drop the lowest die for D&D 5e ability scores.',
    canonicalPath: '/roll-4d6',
    paletteKey: 'sunset',
    toolKind: 'dice',
    diceConfig: DICE_TOOL_CONFIGS['roll-4d6'],
    items: makeSlices(['3', '6', '8', '10', '11', '12', '13', '14', '15', '16', '17', '18'])
  },
  'roll-3d6': {
    slug: 'roll-3d6',
    title: '3d6 Bell Curve Roller',
    subtitle: 'Roll 3d6 (3–18) tabletop dice with cryptographic fairness.',
    canonicalPath: '/roll-3d6',
    paletteKey: 'ocean',
    toolKind: 'dice',
    diceConfig: DICE_TOOL_CONFIGS['roll-3d6'],
    items: makeSlices(Array.from({ length: 16 }, (_, i) => `Sum: ${i + 3}`))
  },
  'roll-5d6': {
    slug: 'roll-5d6',
    title: '5d6 Yahtzee Dice Roller',
    subtitle: 'Roll 5 six-sided dice simultaneously.',
    canonicalPath: '/roll-5d6',
    paletteKey: 'carnival',
    toolKind: 'dice',
    diceConfig: DICE_TOOL_CONFIGS['roll-5d6'],
    items: makeSlices([
      'Yahtzee (5 of a Kind)', 'Large Straight', 'Small Straight', 'Full House',
      'Four of a Kind', 'Three of a Kind', 'Chance', 'Upper Section Bonus'
    ])
  },
  'roll-2d12': {
    slug: 'roll-2d12',
    title: '2d12 Hope & Fear Dice Roller',
    subtitle: 'Roll dual 12-sided Hope & Fear RPG dice.',
    canonicalPath: '/roll-2d12',
    paletteKey: 'neon',
    toolKind: 'dice',
    diceConfig: DICE_TOOL_CONFIGS['roll-2d12'],
    items: makeSlices([
      '✨ Critical Success!', '☀️ Roll with Hope', '🌙 Roll with Fear',
      '☀️ High Hope (18+)', '🌙 High Fear (18+)', '⚖️ Balanced Outcome'
    ])
  },
  'roll-d3': {
    slug: 'roll-d3',
    title: 'd3 Three-Sided Die Roller',
    subtitle: 'Uniform 1, 2, or 3 tabletop outcome generator.',
    canonicalPath: '/roll-d3',
    paletteKey: 'emerald',
    toolKind: 'dice',
    diceConfig: DICE_TOOL_CONFIGS['roll-d3'],
    items: makeSlices(['1', '2', '3', '1', '2', '3'])
  },
  'roll-1d4': {
    slug: 'roll-1d4',
    title: 'd4 Tetrahedron Die Roller',
    subtitle: 'Uniform 1 to 4 four-sided pyramid die roller.',
    canonicalPath: '/roll-1d4',
    paletteKey: 'sunset',
    toolKind: 'dice',
    diceConfig: DICE_TOOL_CONFIGS['roll-1d4'],
    items: makeSlices(['1', '2', '3', '4', '1', '2', '3', '4'])
  },
  'dnd-stat-roller': {
    slug: 'dnd-stat-roller',
    title: 'D&D 5e Ability Score Stat Roller',
    subtitle: 'Roll 4d6 drop lowest for D&D 5e character creation.',
    canonicalPath: '/dnd-stat-roller',
    paletteKey: 'arcade',
    toolKind: 'dice',
    diceConfig: DICE_TOOL_CONFIGS['dnd-stat-roller'],
    items: makeSlices([
      'STR 18 (+4)', 'DEX 16 (+3)', 'CON 15 (+2)', 'INT 14 (+2)',
      'WIS 13 (+1)', 'CHA 12 (+1)', 'Heroic Feat', 'Standard Array'
    ])
  },
  'dice-collection': {
    slug: 'dice-collection',
    title: 'Polyhedral RPG Dice Roller',
    subtitle: 'Roll d4, d6, d8, d10, d12, d20, and d100 polyhedral dice.',
    canonicalPath: '/dice-collection',
    paletteKey: 'neon',
    toolKind: 'dice',
    diceConfig: DICE_TOOL_CONFIGS['dice-collection'],
    items: makeSlices(['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'])
  },
  'unusual-dice': {
    slug: 'unusual-dice',
    title: 'Unusual Polyhedral Dice Roller',
    subtitle: 'Roll non-standard polyhedral dice.',
    canonicalPath: '/unusual-dice',
    paletteKey: 'carnival',
    toolKind: 'dice',
    diceConfig: DICE_TOOL_CONFIGS['unusual-dice'],
    items: makeSlices(['d3', 'd5', 'd7', 'd14', 'd16', 'd24', 'd30', 'd60'])
  }
};

export function resolveToolWheelConfig(
  rawSlug: string,
  query?: {
    title?: string | null;
    items?: string | null;
    entries?: string | null;
    palette?: string | null;
    c?: string | null;
    data?: string | null;
    sides?: string | null;
    count?: string | null;
  }
): ViralToolConfig {
  const cleanSlug = rawSlug.replace(/^\/+|\/+$/g, '') || 'home';

  // 1. Check Specialized Tool Configs
  let baseConfig = SPECIALIZED_TOOL_CONFIGS[cleanSlug];

  // 2. Check /dice/d20, /dice/d6, etc.
  if (!baseConfig && cleanSlug.startsWith('dice/')) {
    const dieKey = cleanSlug.split('/')[1]?.toLowerCase() || 'd20';
    const sidesNum = parseInt(dieKey.replace('d', ''), 10) || 20;
    const clampedSides = Math.max(2, Math.min(100, sidesNum));
    const sliceCount = Math.min(clampedSides, 20);
    baseConfig = {
      slug: cleanSlug,
      title: `Roll ${dieKey.toUpperCase()} (${clampedSides}-Sided Die)`,
      subtitle: `Interactive ${dieKey.toUpperCase()} roller with Web Crypto fairness.`,
      canonicalPath: `/${cleanSlug}`,
      paletteKey: 'arcade',
      toolKind: 'dice',
      diceConfig: DICE_TOOL_CONFIGS[cleanSlug] || {
        sides: clampedSides,
        count: 1,
        notation: `1d${clampedSides}`
      },
      items: makeSlices(
        clampedSides === 100
          ? ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100']
          : Array.from({ length: sliceCount }, (_, i) => String(i + 1))
      )
    };
  }

  // 3. Check SEO Pages Map (136+ tools & subtools)
  if (!baseConfig) {
    const seoPage =
      ALL_SEO_PAGES_MAP[cleanSlug] || getSeoPageByPath(`/${cleanSlug}`);
    if (seoPage) {
      const preset =
        WHEEL_PRESETS.find((p) => p.id === seoPage.presetId) || WHEEL_PRESETS[0];
      baseConfig = {
        slug: cleanSlug,
        title: seoPage.h1,
        subtitle: seoPage.metaDescription,
        canonicalPath: seoPage.fullPath,
        paletteKey: preset.paletteKey || 'arcade',
        toolKind: 'wheel',
        items: preset.items
      };
    }
  }

  // 4. Fallback to Wheel of Names
  if (!baseConfig) {
    baseConfig = SPECIALIZED_TOOL_CONFIGS['wheel-of-names'];
  }

  let finalTitle = baseConfig.title;
  let finalItems = baseConfig.items;
  let finalPaletteKey = baseConfig.paletteKey || 'arcade';
  let finalToolKind: 'wheel' | 'dice' = baseConfig.toolKind || 'wheel';
  let finalDiceConfig: ViralDiceConfig | undefined = baseConfig.diceConfig
    ? { ...baseConfig.diceConfig }
    : undefined;

  // Apply URL query overrides if present (strictly sanitized)
  if (query) {
    if (query.c) {
      const decoded = decodeCompactWheel(query.c);
      if (decoded && decoded.items.length >= 2) {
        finalTitle = sanitizeStreamText(decoded.title, 80) || finalTitle;
        finalItems = decoded.items.slice(0, 200).map((it, idx) => ({
          ...it,
          id: it.id || `slice-${idx}`,
          text: sanitizeStreamText(it.text, 80) || `Option ${idx + 1}`
        }));
        finalPaletteKey = decoded.themeKey || finalPaletteKey;
      }
    } else if (query.data) {
      const parsed = parseSafeShareConfig(query.data);
      if (parsed && parsed.items.length >= 2) {
        finalTitle = sanitizeStreamText(parsed.title, 80) || finalTitle;
        finalItems = parsed.items.slice(0, 200).map((it, idx) => ({
          ...it,
          id: it.id || `slice-${idx}`,
          text: sanitizeStreamText(it.text, 80) || `Option ${idx + 1}`
        }));
        finalPaletteKey = parsed.themeKey || finalPaletteKey;
      }
    }

    if (query.title && query.title.trim()) {
      const cleanTitle = sanitizeStreamText(query.title, 80);
      if (cleanTitle) finalTitle = cleanTitle;
    }

    const rawEntries = query.entries || query.items;
    if (rawEntries && rawEntries.trim()) {
      const sanitizedSlices = parseSanitizedStreamEntries(rawEntries, 200);
      if (sanitizedSlices.length >= 2) {
        finalItems = sanitizedSlices;
        finalToolKind = 'wheel';
      }
    }

    if (query.sides || query.count) {
      const s = Math.max(2, Math.min(100, parseInt(query.sides || '20', 10) || 20));
      const c = Math.max(1, Math.min(20, parseInt(query.count || '1', 10) || 1));
      finalDiceConfig = {
        ...(finalDiceConfig || {}),
        sides: s,
        count: c,
        notation: `${c}d${s}`
      };
    }

    if (query.palette && COLOR_PALETTES[query.palette]) {
      finalPaletteKey = query.palette;
    }
  }

  const resolvedPalette =
    COLOR_PALETTES[finalPaletteKey]?.colors || COLOR_PALETTES.arcade.colors;

  return {
    slug: baseConfig.slug,
    title: finalTitle,
    subtitle: baseConfig.subtitle,
    canonicalPath: baseConfig.canonicalPath,
    paletteKey: finalPaletteKey,
    palette: resolvedPalette,
    items: finalItems,
    toolKind: finalToolKind,
    diceConfig: finalDiceConfig
  };
}

// Client-side live state synchronization for Embed Modal & Streamer Mode
let activeClientWheel: ViralToolConfig | null = null;
const listeners = new Set<() => void>();

export function setActiveViralWheel(partial: {
  slug?: string;
  title: string;
  items: WheelItem[];
  paletteKey?: string;
  palette?: string[];
  canonicalPath?: string;
  toolKind?: 'wheel' | 'dice';
  diceConfig?: ViralDiceConfig;
}) {
  const path =
    partial.canonicalPath ||
    (typeof window !== 'undefined' ? window.location.pathname : '/wheel-of-names');
  const slug =
    partial.slug ||
    (path === '/' ? 'wheel-of-names' : path.replace(/^\/+|\/+$/g, ''));
  const paletteKey = partial.paletteKey || 'arcade';
  const palette =
    partial.palette ||
    COLOR_PALETTES[paletteKey]?.colors ||
    COLOR_PALETTES.arcade.colors;

  const cleanItems = partial.items.slice(0, 200).map((item, idx) => ({
    ...item,
    id: item.id || `slice-${idx}`,
    text: sanitizeStreamText(item.text, 80) || `Option ${idx + 1}`
  }));

  activeClientWheel = {
    slug,
    title: sanitizeStreamText(partial.title, 80) || 'Spin the Wheel',
    subtitle: `Interactive ${sanitizeStreamText(partial.title, 60)} on SpinWheelGames.org`,
    canonicalPath: path,
    paletteKey,
    palette,
    items: cleanItems,
    toolKind: partial.toolKind || 'wheel',
    diceConfig: partial.diceConfig
  };
  listeners.forEach((fn) => fn());
}

export function getActiveViralWheel(pathname?: string): ViralToolConfig {
  const currentPath =
    pathname || (typeof window !== 'undefined' ? window.location.pathname : '/');
  const cleanSlug = currentPath === '/' ? 'home' : currentPath.replace(/^\/+|\/+$/g, '');

  let queryParams: {
    title?: string | null;
    items?: string | null;
    entries?: string | null;
    palette?: string | null;
    c?: string | null;
    data?: string | null;
    sides?: string | null;
    count?: string | null;
  } | undefined;

  if (typeof window !== 'undefined') {
    const sp = new URLSearchParams(window.location.search);
    queryParams = {
      title: sp.get('title'),
      items: sp.get('items'),
      entries: sp.get('entries'),
      palette: sp.get('palette'),
      c: sp.get('c'),
      data: sp.get('data'),
      sides: sp.get('sides'),
      count: sp.get('count')
    };
  }

  // If URL explicitly passes ?entries= or ?items=, let URL query override cached client state
  const hasUrlEntries = Boolean(
    queryParams?.entries?.trim() ||
      queryParams?.items?.trim() ||
      queryParams?.c?.trim() ||
      queryParams?.data?.trim()
  );

  if (
    !hasUrlEntries &&
    activeClientWheel &&
    (activeClientWheel.canonicalPath === currentPath ||
      (currentPath === '/' && activeClientWheel.slug === 'wheel-of-names'))
  ) {
    return activeClientWheel;
  }

  return resolveToolWheelConfig(cleanSlug, queryParams);
}

export function subscribeActiveViralWheel(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function openViralEmbedModal(customWheel?: {
  title: string;
  items: WheelItem[];
  paletteKey?: string;
  palette?: string[];
}) {
  if (customWheel) {
    setActiveViralWheel(customWheel);
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('swg:open-embed-modal'));
  }
}

/**
 * Opens the "Streamer mode / OBS" setup modal (4-step OBS guide, URL builder, hotkeys, remote control link).
 */
export function openViralStreamerSetupModal(customConfig?: {
  title: string;
  items: WheelItem[];
  paletteKey?: string;
  palette?: string[];
  toolKind?: 'wheel' | 'dice';
  diceConfig?: ViralDiceConfig;
}) {
  if (customConfig) {
    setActiveViralWheel(customConfig);
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('swg:open-streamer-setup-modal'));
  }
}

/**
 * Directly enters full-screen transparent Streamer Mode (?stream=1) in the current tab.
 */
export function openViralStreamerMode(customWheel?: {
  title: string;
  items: WheelItem[];
  paletteKey?: string;
  palette?: string[];
  toolKind?: 'wheel' | 'dice';
  diceConfig?: ViralDiceConfig;
}) {
  if (customWheel) {
    setActiveViralWheel(customWheel);
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('swg:open-streamer-setup-modal'));
  }
}
