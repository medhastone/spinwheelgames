import { WheelExperience } from './wheelLibraryTypes';
import { WHEEL_LIBRARY_PART1 } from './wheelLibraryPart1';
import { WHEEL_LIBRARY_PART2 } from './wheelLibraryPart2';
import { WHEEL_LIBRARY_PART3 } from './wheelLibraryPart3';
import { WHEEL_LIBRARY_PART4 } from './wheelLibraryPart4';
import { WHEEL_LIBRARY_PART5 } from './wheelLibraryPart5';
import { WHEEL_LIBRARY_PART6 } from './wheelLibraryPart6';
import { WHEEL_LIBRARY_PART7 } from './wheelLibraryPart7';
import { WHEEL_LIBRARY_PART8 } from './wheelLibraryPart8';
import { WHEEL_LIBRARY_PART9 } from './wheelLibraryPart9';
import { WheelConfig, WheelItem } from './types';
import { COLOR_PALETTES } from './presets';

export * from './wheelLibraryTypes';

export const CONSOLIDATED_EXPERIENCE_IDS = new Set([
  'random-student-picker',
  'random-number-wheel',
  'winner-picker',
  'contest-picker',
  'raffle-wheel',
  'team-maker',
  'pizza-topping-wheel'
]);

export const ALL_WHEEL_EXPERIENCES: WheelExperience[] = [
  ...WHEEL_LIBRARY_PART1, // 16 (Decisions: 9, Names: 7)
  ...WHEEL_LIBRARY_PART2, // 16 (Classroom: 9, Party: 7)
  ...WHEEL_LIBRARY_PART3, // 16 (Food: 9, Entertainment: 7)
  ...WHEEL_LIBRARY_PART4, // 14 (Gaming: 7, Sports: 7)
  ...WHEEL_LIBRARY_PART5, // 13 (Numbers: 8, Workout: 5)
  ...WHEEL_LIBRARY_PART6, // 9  (Travel: 5, Giveaway: 4)
  ...WHEEL_LIBRARY_PART7, // 11 (Creativity: 6, Productivity: 5)
  ...WHEEL_LIBRARY_PART8, // 10 (Wellness: 5, Date Night: 5)
  ...WHEEL_LIBRARY_PART9  // 11 (Icebreakers: 6, Finance: 5)
].filter((exp) => !CONSOLIDATED_EXPERIENCE_IDS.has(exp.id));

// Helper to convert a WheelExperience into an active WheelConfig playable in the canvas
export function experienceToWheelConfig(exp: WheelExperience): WheelConfig {
  const paletteKey = exp.paletteKey || 'arcade';
  const paletteColors = COLOR_PALETTES[paletteKey]?.colors || COLOR_PALETTES.arcade.colors;

  const items: WheelItem[] = exp.defaultEntries.map((entry, index) => ({
    id: `${exp.id}-item-${index + 1}`,
    text: entry,
    weight: 1
  }));

  return {
    id: exp.id,
    title: `${exp.name} Wheel`,
    category: exp.category,
    description: exp.purpose,
    items,
    palette: paletteColors,
    themeKey: paletteKey
  };
}

export const CATEGORY_METADATA: Record<
  string,
  { label: string; count: number; description: string; iconKey: string; color: string }
> = {
  ALL: {
    label: 'All Wheels',
    count: 118,
    description: 'Explore the complete 106+ vetted wheel games & decision engines.',
    iconKey: 'Layers',
    color: '#4648d4'
  },
  DECISIONS: {
    label: 'Decisions',
    count: 9,
    description: 'Resolve analysis paralysis, binary dilemmas, and micro-choices.',
    iconKey: 'ThumbsUp',
    color: '#4648d4'
  },
  NAMES: {
    label: 'Names & Roll Calls',
    count: 7,
    description: 'Baby names, fictional characters, gamertags, and universal name wheels.',
    iconKey: 'UserCheck',
    color: '#6063ee'
  },
  CLASSROOM: {
    label: 'Classroom & Education',
    count: 9,
    description: 'Equitable student pickers, station rotations, quiz rounds, and job boards.',
    iconKey: 'GraduationCap',
    color: '#006c49'
  },
  PARTY: {
    label: 'Party & Social Games',
    count: 7,
    description: 'Truth or dare, would you rather, never have I ever, and group dares.',
    iconKey: 'PartyPopper',
    color: '#dc2c4f'
  },
  FOOD: {
    label: 'Food & Dining',
    count: 9,
    description: 'Dinner deciders, cuisines, restaurants, breakfasts, and snack picks.',
    iconKey: 'Utensils',
    color: '#b45309'
  },
  ENTERTAINMENT: {
    label: 'Entertainment & Media',
    count: 7,
    description: 'Streaming movies, TV binge-watching, anime genres, music, and TBR books.',
    iconKey: 'Film',
    color: '#7c3aed'
  },
  GAMING: {
    label: 'Gaming & Esports',
    count: 7,
    description: 'Backlog selectors, Minecraft/Fortnite challenges, and RPG character rolls.',
    iconKey: 'Gamepad2',
    color: '#0284c7'
  },
  SPORTS: {
    label: 'Sports & Competition',
    count: 7,
    description: 'Draft lotteries, football/NBA/cricket teams, and tournament seedings.',
    iconKey: 'Trophy',
    color: '#059669'
  },
  NUMBERS: {
    label: 'Numbers & Probability',
    count: 8,
    description: 'Cryptographic integers, D&D polyhedral dice, 1-100 raffles, and percentages.',
    iconKey: 'Hash',
    color: '#475569'
  },
  WORKOUT: {
    label: 'Workout & Fitness',
    count: 5,
    description: 'HIIT circuits, gym accessory lifts, living room routines, and active rest.',
    iconKey: 'Dumbbell',
    color: '#ea580c'
  },
  TRAVEL: {
    label: 'Travel & Exploration',
    count: 5,
    description: 'International destinations, weekend road trips, and day excursion planners.',
    iconKey: 'Compass',
    color: '#0d9488'
  },
  GIVEAWAY: {
    label: 'Giveaways & Raffles',
    count: 4,
    description: 'Transparent stream drawings, multi-tier prize cascades, and ticket raffles.',
    iconKey: 'Gift',
    color: '#db2777'
  },
  'CREATIVITY & WRITING': {
    label: 'Creativity & Writing',
    count: 6,
    description: 'Story starters, drawing prompts, poetic meters, and songwriting themes.',
    iconKey: 'PenTool',
    color: '#9333ea'
  },
  'PRODUCTIVITY & HABITS': {
    label: 'Productivity & Habits',
    count: 5,
    description: 'Pomodoro resets, atomic habit streaks, declutter sprints, and digital detox.',
    iconKey: 'CheckCircle2',
    color: '#16a34a'
  },
  'WELLNESS & MINDFULNESS': {
    label: 'Wellness & Mindfulness',
    count: 5,
    description: 'Somatic anxiety relief, gratitude reflections, affirmations, and self-care.',
    iconKey: 'Heart',
    color: '#059669'
  },
  'DATE NIGHT & COUPLES': {
    label: 'Date Night & Couples',
    count: 5,
    description: 'Romantic dates, intimate questions, living-room dates, and sweet surprises.',
    iconKey: 'Sparkles',
    color: '#e11d48'
  },
  'ICEBREAKERS & TEAM BUILDING': {
    label: 'Icebreakers & Teams',
    count: 6,
    description: 'Remote Zoom warmups, agile standup orders, water cooler banter, and kudos.',
    iconKey: 'Users',
    color: '#2563eb'
  },
  'FINANCE & BUDGETING': {
    label: 'Finance & Budgeting',
    count: 5,
    description: 'Micro-savings goals, no-spend weekends, windfall splits, and side hustles.',
    iconKey: 'PiggyBank',
    color: '#15803d'
  }
};
