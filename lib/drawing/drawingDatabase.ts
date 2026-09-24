export type DrawingCategory = 'object' | 'animal' | 'character' | 'fantasy' | 'environment';
export type DrawingDifficulty = 'easy' | 'medium' | 'hard';

export interface DrawingPrompt {
  id: string;
  title: string;
  category: DrawingCategory;
  difficulty: DrawingDifficulty;
  challengeHint?: string;
}

export const DRAWING_PROMPTS: DrawingPrompt[] = [
  // OBJECTS
  { id: 'obj-1', title: 'A Vintage Camera with Floral Vines', category: 'object', difficulty: 'easy', challengeHint: 'Focus on retro metallic shading' },
  { id: 'obj-2', title: 'A Steampunk Pocket Watch', category: 'object', difficulty: 'medium', challengeHint: 'Draw exposed gears and brass textures' },
  { id: 'obj-3', title: 'An Overgrown Abandoned Robot', category: 'object', difficulty: 'hard', challengeHint: 'Blend mechanical metal with moss and vines' },
  { id: 'obj-4', title: 'A Glowing Magic Potion Bottle', category: 'object', difficulty: 'easy', challengeHint: 'Capture liquid reflections and glowing bubbles' },
  { id: 'obj-5', title: 'A Floating Futuristic Hoverboard', category: 'object', difficulty: 'medium', challengeHint: 'Add neon thrusters and sleek curves' },
  { id: 'obj-6', title: 'A Cozy Stack of Old Leather Books', category: 'object', difficulty: 'easy', challengeHint: 'Add a steaming tea mug on top' },
  { id: 'obj-7', title: 'A Mechanical Butterfly with Clockwork Wings', category: 'object', difficulty: 'medium', challengeHint: 'Use fine line art for intricate cogs' },
  { id: 'obj-8', title: 'An Ornate Treasure Chest Glowing Inside', category: 'object', difficulty: 'medium', challengeHint: 'Show dramatic gold rim lighting' },

  // ANIMALS
  { id: 'ani-1', title: 'A Wise Owl Wearing Spectacles', category: 'animal', difficulty: 'easy', challengeHint: 'Focus on expressive eyes and feather patterns' },
  { id: 'ani-2', title: 'A Cyberpunk Neon Jellyfish', category: 'animal', difficulty: 'medium', challengeHint: 'Use translucent neon tentacles' },
  { id: 'ani-3', title: 'A Majestic Wolf Howling at Two Moons', category: 'animal', difficulty: 'medium', challengeHint: 'Capture silhouette fur against moonlight' },
  { id: 'ani-4', title: 'A Chameleon Made of Stained Glass', category: 'animal', difficulty: 'hard', challengeHint: 'Draw colorful geometric glass panels' },
  { id: 'ani-5', title: 'A Tiny Frog Wearing a Mushroom Hat', category: 'animal', difficulty: 'easy', challengeHint: 'Keep proportions cute and rounded' },
  { id: 'ani-6', title: 'A Deep Sea Bioluminescent Octopus', category: 'animal', difficulty: 'hard', challengeHint: 'High contrast dark background with glowing suction cups' },
  { id: 'ani-7', title: 'A Fox Sleeping Inside a Lotus Flower', category: 'animal', difficulty: 'easy', challengeHint: 'Use soft pastel colors and gentle lines' },
  { id: 'ani-8', title: 'A Stag with Antlers Grown into Cherry Blossom Branches', category: 'animal', difficulty: 'hard', challengeHint: 'Draw pink falling petals around majestic antlers' },

  // CHARACTERS
  { id: 'cha-1', title: 'A Space Explorer Sipping Boba Tea', category: 'character', difficulty: 'easy', challengeHint: 'Render a clear bubble helmet' },
  { id: 'cha-2', title: 'A Cyberpunk Hacker with Hologram Goggles', category: 'character', difficulty: 'medium', challengeHint: 'Draw neon circuitry tattoos' },
  { id: 'cha-3', title: 'An Ancient Spellcaster Summoning Fireflies', category: 'character', difficulty: 'medium', challengeHint: 'Flowing robes with magical aura' },
  { id: 'cha-4', title: 'A Friendly Forest Goblin Gardener', category: 'character', difficulty: 'easy', challengeHint: 'Give them oversized boots and a teapot watering can' },
  { id: 'cha-5', title: 'A Samurai Wandering in a Snowstorm', category: 'character', difficulty: 'hard', challengeHint: 'Show wind-swept snow and traditional armor' },
  { id: 'cha-6', title: 'A Retro 80s Arcade Gamer Kid', category: 'character', difficulty: 'easy', challengeHint: 'Big headphones, radical jacket, cassette player' },
  { id: 'cha-7', title: 'A Deep Sea Scuba Diver Discovering Ruins', category: 'character', difficulty: 'hard', challengeHint: 'Water caustics and heavy diving suit' },
  { id: 'cha-8', title: 'An Celestial Star Knight with Sun Shield', category: 'character', difficulty: 'hard', challengeHint: 'Armor covered in constellation star maps' },

  // FANTASY
  { id: 'fan-1', title: 'A Baby Dragon Curled Around a Gemstone', category: 'fantasy', difficulty: 'easy', challengeHint: 'Scales with iridescent reflections' },
  { id: 'fan-2', title: 'A Phoenix Rising from Cosmic Stardust', category: 'fantasy', difficulty: 'medium', challengeHint: 'Fiery wing plumes with galaxy sparkles' },
  { id: 'fan-3', title: 'A Giant Crystal Golem Guarding a Waterfall', category: 'fantasy', difficulty: 'hard', challengeHint: 'Jagged crystal geometry and water spray' },
  { id: 'fan-4', title: 'A Flying Whale Transporting a Castle on Its Back', category: 'fantasy', difficulty: 'hard', challengeHint: 'Dramatic clouds and towering spires' },
  { id: 'fan-5', title: 'An Enchanted Tree with Glowing Rune Leaves', category: 'fantasy', difficulty: 'easy', challengeHint: 'Whimsical twisted trunk and magical glow' },
  { id: 'fan-6', title: 'A Floating Island with a Cottage and Windmill', category: 'fantasy', difficulty: 'medium', challengeHint: 'Show exposed roots dangling underneath' },
  { id: 'fan-7', title: 'A Sea Serpent Guarding a Sunken Treasure Ship', category: 'fantasy', difficulty: 'hard', challengeHint: 'Dynamic coiling body underwater' },

  // ENVIRONMENT
  { id: 'env-1', title: 'A Cozy Cabin in a Pine Forest Under Aurora Borealis', category: 'environment', difficulty: 'easy', challengeHint: 'Waving green northern lights in night sky' },
  { id: 'env-2', title: 'An Abandoned Overgrown Train Station', category: 'environment', difficulty: 'medium', challengeHint: 'Rusting locomotive covered in ivy' },
  { id: 'env-3', title: 'A Futuristic Neon Tokyo Alleyway in the Rain', category: 'environment', difficulty: 'hard', challengeHint: 'Puddle reflections of glowing kanji signs' },
  { id: 'env-4', title: 'A Floating Crystal Sanctuary in Cloudscape', category: 'environment', difficulty: 'medium', challengeHint: 'Sunlight rays beaming through clouds' },
  { id: 'env-5', title: 'A Desert Oasis under a Galaxy Sky', category: 'environment', difficulty: 'easy', challengeHint: 'Palm tree silhouettes and sand dunes' },
  { id: 'env-6', title: 'An Underwater Ancient Greek Sunken Temple', category: 'environment', difficulty: 'hard', challengeHint: 'Marble pillars wrapped in sea vines and fish swarms' }
];

export const CHALLENGE_MODIFIERS = [
  '🎨 Limited Palette: Use only 3 colors!',
  '⏱️ Speed Challenge: Complete in under 3 minutes!',
  '✋ Non-Dominant Hand: Draw using your non-dominant hand!',
  '✏️ Single Line Art: Do not lift your pen from start to finish!',
  '🌑 Silhouettes Only: Draw purely using solid black shapes!',
  '👀 Blind Contour: Draw without looking at your canvas!',
  '✨ Chibi Style: Make the subject super cute with giant eyes!',
  '🤖 Cyberpunk Upgrade: Add neon circuits and futuristic chrome!'
];
