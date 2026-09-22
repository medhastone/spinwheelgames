export type { WheelConfig, WheelItem } from './types';
import { WheelConfig, WheelItem } from './types';

export const COLOR_PALETTES: Record<string, { name: string; colors: string[] }> = {
  arcade: {
    name: 'Arcade Neon',
    colors: [
      '#6063ee',
      '#006c49',
      '#dc2c4f',
      '#4648d4',
      '#00a86b',
      '#ff6b8b',
      '#7c7fff',
      '#3b82f6',
      '#eab308',
      '#8b5cf6'
    ]
  },
  pastel: {
    name: 'Pastel Minimal',
    colors: [
      '#c7d2fe',
      '#a7f3d0',
      '#fecdd3',
      '#fed7aa',
      '#ddd6fe',
      '#bae6fd',
      '#fef08a',
      '#bbf7d0'
    ]
  },
  vibrant: {
    name: 'Vibrant Sunset',
    colors: [
      '#f43f5e',
      '#f97316',
      '#eab308',
      '#10b981',
      '#06b6d4',
      '#6366f1',
      '#8b5cf6',
      '#ec4899'
    ]
  },
  casino: {
    name: 'Casino Royale',
    colors: [
      '#b91c1c',
      '#1f2937',
      '#d97706',
      '#047857',
      '#4338ca',
      '#991b1b',
      '#374151',
      '#b45309'
    ]
  },
  emerald: {
    name: 'Emerald Forest',
    colors: [
      '#064e3b',
      '#047857',
      '#059669',
      '#10b981',
      '#34d399',
      '#0f766e',
      '#0d9488',
      '#14b8a6'
    ]
  }
};

export const WHEEL_PRESETS: WheelConfig[] = [
  {
    id: 'dinner-decider',
    title: 'Dinner Decider Wheel',
    category: 'Daily',
    description: 'Solve the eternal meal dilemma with high-entropy cryptographic selection.',
    palette: COLOR_PALETTES.arcade.colors,
    themeKey: 'arcade',
    items: [
      { id: '1', text: '🍕 Wood-Fired Pizza', weight: 1 },
      { id: '2', text: '🍣 Fresh Sushi Box', weight: 1 },
      { id: '3', text: '🌮 Street Tacos', weight: 1 },
      { id: '4', text: '🍔 Smash Burgers', weight: 1 },
      { id: '5', text: '🍜 Spicy Thai Curry', weight: 1 },
      { id: '6', text: '🥗 Green Protein Bowl', weight: 1 },
      { id: '7', text: '🍝 Creamy Carbonara', weight: 1 },
      { id: '8', text: '🍲 Tonkotsu Ramen', weight: 1 }
    ]
  },
  {
    id: 'classroom-picker',
    title: 'Student Name Picker',
    category: 'Classroom',
    description: 'Fair, non-biased student calling with optional Elimination mode.',
    palette: COLOR_PALETTES.vibrant.colors,
    themeKey: 'vibrant',
    items: [
      { id: 's1', text: 'Emma Watson', weight: 1 },
      { id: 's2', text: 'Liam Chen', weight: 1 },
      { id: 's3', text: 'Sophia Rodriguez', weight: 1 },
      { id: 's4', text: 'Noah Patel', weight: 1 },
      { id: 's5', text: 'Ava Kim', weight: 1 },
      { id: 's6', text: 'Lucas Dubois', weight: 1 },
      { id: 's7', text: 'Mia Johansson', weight: 1 },
      { id: 's8', text: 'Ethan Smith', weight: 1 },
      { id: 's9', text: 'Zoe Al-Mansoor', weight: 1 },
      { id: 's10', text: 'Oliver Garcia', weight: 1 },
      { id: 's11', text: 'Chloe Becker', weight: 1 },
      { id: 's12', text: 'Jackson Reed', weight: 1 }
    ]
  },
  {
    id: 'decision-maker',
    title: 'Yes, No, Maybe Decision Wheel',
    category: 'Decision Tool',
    description: 'Simple 6-way decisive randomizer for quick resolutions.',
    palette: COLOR_PALETTES.pastel.colors,
    themeKey: 'pastel',
    items: [
      { id: 'd1', text: '✅ Absolute Yes', weight: 1 },
      { id: 'd2', text: '❌ Definite No', weight: 1 },
      { id: 'd3', text: '🤔 Maybe Later', weight: 1 },
      { id: 'd4', text: '🎲 Roll Again', weight: 1 },
      { id: 'd5', text: '⚡ Go For It Now', weight: 1 },
      { id: 'd6', text: '🛑 Sleep On It', weight: 1 }
    ]
  },
  {
    id: 'weighted-raffle',
    title: 'Weighted Raffle Tickets',
    category: 'Giveaways',
    description: 'Participants with multiple entries hold proportionally higher odds.',
    palette: COLOR_PALETTES.casino.colors,
    themeKey: 'casino',
    items: [
      { id: 'r1', text: '🎟️ Alice (3 tickets)', weight: 3 },
      { id: 'r2', text: '🎟️ Bob (1 ticket)', weight: 1 },
      { id: 'r3', text: '🎟️ Charlie (5 tickets)', weight: 5 },
      { id: 'r4', text: '🎟️ Diana (2 tickets)', weight: 2 },
      { id: 'r5', text: '🎟️ Evan (1 ticket)', weight: 1 },
      { id: 'r6', text: '🎟️ Fiona (4 tickets)', weight: 4 }
    ]
  },
  {
    id: 'truth-or-dare',
    title: 'Party Truth or Dare',
    category: 'Party Game',
    description: 'Perfect for icebreakers, game nights, and social challenges.',
    palette: COLOR_PALETTES.arcade.colors,
    themeKey: 'arcade',
    items: [
      { id: 't1', text: '🎭 Show your most embarrassing photo', weight: 1 },
      { id: 't2', text: '🤫 Tell your biggest irrational fear', weight: 1 },
      { id: 't3', text: '💃 Do a 20-second dramatic dance', weight: 1 },
      { id: 't4', text: '🎤 Sing the chorus of a pop song', weight: 1 },
      { id: 't5', text: '📱 Let the group read your last text', weight: 1 },
      { id: 't6', text: '🧘 Hold a plank for 45 seconds', weight: 1 },
      { id: 't7', text: '🐶 Do your best impression of a pet', weight: 1 },
      { id: 't8', text: '👑 Speak in a royal accent for 3 rounds', weight: 1 }
    ]
  }
];

export const MULTI_WHEEL_DEFAULT_PRESETS: {
  wheelA: WheelConfig;
  wheelB: WheelConfig;
  wheelC: WheelConfig;
} = {
  wheelA: {
    id: 'multi-person',
    title: 'Wheel A: Person',
    category: 'Multi-Wheel',
    description: 'Participant selector',
    palette: COLOR_PALETTES.arcade.colors,
    items: [
      { id: 'p1', text: 'Alex', weight: 1 },
      { id: 'p2', text: 'Jordan', weight: 1 },
      { id: 'p3', text: 'Taylor', weight: 1 },
      { id: 'p4', text: 'Sam', weight: 1 },
      { id: 'p5', text: 'Morgan', weight: 1 },
      { id: 'p6', text: 'Casey', weight: 1 }
    ]
  },
  wheelB: {
    id: 'multi-challenge',
    title: 'Wheel B: Challenge',
    category: 'Multi-Wheel',
    description: 'Action selector',
    palette: COLOR_PALETTES.vibrant.colors,
    items: [
      { id: 'c1', text: 'Dance Like Robot', weight: 1 },
      { id: 'c2', text: 'Sing High Note', weight: 1 },
      { id: 'c3', text: '15 Pushups', weight: 1 },
      { id: 'c4', text: 'Tell Cheesy Joke', weight: 1 },
      { id: 'c5', text: 'Give Compliment', weight: 1 },
      { id: 'c6', text: 'Slow-Mo Walk', weight: 1 }
    ]
  },
  wheelC: {
    id: 'multi-location',
    title: 'Wheel C: Location',
    category: 'Multi-Wheel',
    description: 'Stage selector',
    palette: COLOR_PALETTES.pastel.colors,
    items: [
      { id: 'l1', text: 'Living Room', weight: 1 },
      { id: 'l2', text: 'Kitchen Counter', weight: 1 },
      { id: 'l3', text: 'Balcony / Porch', weight: 1 },
      { id: 'l4', text: 'Hallway', weight: 1 },
      { id: 'l5', text: 'Front Door', weight: 1 },
      { id: 'l6', text: 'Center Stage', weight: 1 }
    ]
  }
};

export const TOURNAMENT_PRESET_ITEMS: WheelItem[] = [
  { id: 't-1', text: '🍕 Pizza', weight: 1 },
  { id: 't-2', text: '🍔 Burger', weight: 1 },
  { id: 't-3', text: '🍣 Sushi', weight: 1 },
  { id: 't-4', text: '🌮 Tacos', weight: 1 },
  { id: 't-5', text: '🍜 Ramen', weight: 1 },
  { id: 't-6', text: '🍛 Biryani', weight: 1 },
  { id: 't-7', text: '🍝 Pasta', weight: 1 },
  { id: 't-8', text: '🥪 Gourmet Sandwich', weight: 1 }
];

export const DAILY_CHALLENGE_POOL = [
  '⚡ 45m Deep Work Sprint (Zero Tabs Open)',
  '🚶 20-Minute Brisk Walk in Sunlight',
  '💧 Drink 500ml Water Immediately',
  '📥 Clear Email Inbox to Absolute Zero',
  '🎯 Execute Your Most-Avoided Task First',
  '🧹 Clean Physical Desk & Laptop Screen',
  '🤝 Send a Warm Appreciation Note to Someone',
  '🧘 10 Minutes Mindful Breathing or Meditation',
  '📖 Read 15 Pages of a Non-Fiction Book',
  '📵 No Phone Scrolling for 2 Hours Tonight'
];
