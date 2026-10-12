export type DrawingCategory = 'animal' | 'people' | 'object' | 'fantasy' | 'nature' | 'character' | 'environment';
export type DrawingDifficulty = 'easy' | 'medium' | 'hard';

export interface DrawingPrompt {
  id: string;
  title: string;
  category: 'animal' | 'people' | 'object' | 'fantasy' | 'nature';
  difficulty: DrawingDifficulty;
  challengeHint?: string;
  tags?: string[];
}

export const DRAWING_PROMPTS: DrawingPrompt[] = [
  // ==========================================
  // 1. ANIMALS
  // ==========================================
  { id: 'ani-1', title: 'A Wise Owl Wearing Spectacles', category: 'animal', difficulty: 'easy', challengeHint: 'Focus on expressive round eyes and soft feather patterns' },
  { id: 'ani-2', title: 'A Tiny Frog Wearing a Mushroom Hat', category: 'animal', difficulty: 'easy', challengeHint: 'Keep proportions cute, rounded, and playful' },
  { id: 'ani-3', title: 'A Sleepy Red Panda Hugging a Bamboo Stalk', category: 'animal', difficulty: 'easy', challengeHint: 'Capture the fluffy ringed tail and peaceful expression' },
  { id: 'ani-4', title: 'A Curious Golden Retriever Chasing Bubbles', category: 'animal', difficulty: 'easy', challengeHint: 'Emphasize floppy ears and transparent bubble reflections' },
  { id: 'ani-5', title: 'A Fox Sleeping Inside a Giant Lotus Flower', category: 'animal', difficulty: 'easy', challengeHint: 'Use soft pastel contours and gentle curves' },
  
  { id: 'ani-6', title: 'A Cyberpunk Neon Jellyfish with Glowing Tendrils', category: 'animal', difficulty: 'medium', challengeHint: 'Use translucent neon tentacles against dark waters' },
  { id: 'ani-7', title: 'A Majestic Wolf Howling at Two Moons', category: 'animal', difficulty: 'medium', challengeHint: 'Capture silhouette fur texture and rim lighting from the moons' },
  { id: 'ani-8', title: 'A Sea Turtle Swimming with a School of Tangs', category: 'animal', difficulty: 'medium', challengeHint: 'Render textured shell plates and underwater light shafts' },
  { id: 'ani-9', title: 'An Armored Pangolin Rolling Down a Hill', category: 'animal', difficulty: 'medium', challengeHint: 'Focus on overlapping geometric scale patterns' },
  { id: 'ani-10', title: 'A Crested Chameleon Catching a Firefly', category: 'animal', difficulty: 'medium', challengeHint: 'Draw coiled tail and glowing warm light from the prey' },

  { id: 'ani-11', title: 'A Chameleon Made of Stained Glass Panels', category: 'animal', difficulty: 'hard', challengeHint: 'Draw colorful translucent geometric leaded glass facets' },
  { id: 'ani-12', title: 'A Deep Sea Bioluminescent Colossal Octopus', category: 'animal', difficulty: 'hard', challengeHint: 'High-contrast dark abyss with glowing neon suction cups' },
  { id: 'ani-13', title: 'A Stag with Antlers Grown into Cherry Blossom Branches', category: 'animal', difficulty: 'hard', challengeHint: 'Delicate falling petals surrounding majestic twisted antlers' },
  { id: 'ani-14', title: 'A Snow Leopard Leaping across an Alpine Chasm', category: 'animal', difficulty: 'hard', challengeHint: 'Dynamic muscular action pose with swirling snow powder' },

  // ==========================================
  // 2. PEOPLE (Characters & Figures)
  // ==========================================
  { id: 'peo-1', title: 'A Space Explorer Sipping Boba Tea', category: 'people', difficulty: 'easy', challengeHint: 'Render a clear bubble helmet and floating tapioca pearls' },
  { id: 'peo-2', title: 'A Friendly Forest Gnome Gardener', category: 'people', difficulty: 'easy', challengeHint: 'Give them oversized wooden clogs and a teapot watering can' },
  { id: 'peo-3', title: 'A Retro 80s Roller-Skating Teen', category: 'people', difficulty: 'easy', challengeHint: 'Chunky headphones, vibrant windbreaker, and quad skates' },
  { id: 'peo-4', title: 'A Cozy Barista Pouring Swan Latte Art', category: 'people', difficulty: 'easy', challengeHint: 'Warm apron, steam rising from ceramic cup, peaceful smile' },
  { id: 'peo-5', title: 'A Street Musician Playing an Accordion', category: 'people', difficulty: 'easy', challengeHint: 'Focus on expressive posture and folding bellows' },

  { id: 'peo-6', title: 'A Cyberpunk Hacker with Hologram Goggles', category: 'people', difficulty: 'medium', challengeHint: 'Draw glowing cybernetic eye implants and neon data strands' },
  { id: 'peo-7', title: 'An Ancient Alchemist Brewing Starlight', category: 'people', difficulty: 'medium', challengeHint: 'Flowing embroidered robes with floating glass alembics' },
  { id: 'peo-8', title: 'A Steampunk Aviator Adjusting Brass Goggles', category: 'people', difficulty: 'medium', challengeHint: 'Textured leather flight jacket and intricate wing pack' },
  { id: 'peo-9', title: 'A Traditional Archer at Full Draw', category: 'people', difficulty: 'medium', challengeHint: 'Focus on focused eye gaze, finger tension, and body alignment' },
  { id: 'peo-10', title: 'A Chef Juggling Cooking Knives in Mid-Air', category: 'people', difficulty: 'medium', challengeHint: 'Capture motion blur and dramatic kitchen flare' },

  { id: 'peo-11', title: 'A Samurai Standing Resolute in a Blizzard', category: 'people', difficulty: 'hard', challengeHint: 'Show wind-swept snow trails, fabric folds, and lacquered armor' },
  { id: 'peo-12', title: 'A Deep Sea Diver Discovering an Ancient Mask', category: 'people', difficulty: 'hard', challengeHint: 'Render underwater caustics and vintage brass diving bell suit' },
  { id: 'peo-13', title: 'A Celestial Star Knight Clad in Nebula Armor', category: 'people', difficulty: 'hard', challengeHint: 'Armor plates reflecting cosmic galaxy spirals and solar flares' },
  { id: 'peo-14', title: 'An Acrobat Performing on a High Wire in Rain', category: 'people', difficulty: 'hard', challengeHint: 'Dynamic balance foreshortening with falling water droplets' },

  // ==========================================
  // 3. OBJECTS
  // ==========================================
  { id: 'obj-1', title: 'A Vintage Polaroid Camera with Floral Vines', category: 'object', difficulty: 'easy', challengeHint: 'Focus on retro metallic dials and emerging paper photo' },
  { id: 'obj-2', title: 'A Glowing Magic Potion Bottle with Cork Stopper', category: 'object', difficulty: 'easy', challengeHint: 'Capture glass transparency and swirling glowing liquid' },
  { id: 'obj-3', title: 'A Cozy Stack of Antiquarian Leather Books', category: 'object', difficulty: 'easy', challengeHint: 'Add an ornate bookmark ribbon and steaming ceramic mug' },
  { id: 'obj-4', title: 'A Classic Gumball Machine Filled with Marbles', category: 'object', difficulty: 'easy', challengeHint: 'Spherical glass highlights and colorful round treats' },
  { id: 'obj-5', title: 'A Weathered Brass Compass on Old Map', category: 'object', difficulty: 'easy', challengeHint: 'Directional needle and cracked glass casing' },

  { id: 'obj-6', title: 'A Steampunk Pocket Watch with Exposed Cogs', category: 'object', difficulty: 'medium', challengeHint: 'Draw interlocking brass gears, springs, and roman numerals' },
  { id: 'obj-7', title: 'A Floating Futuristic Cyber-Hoverboard', category: 'object', difficulty: 'medium', challengeHint: 'Add neon underglow thrusters and carbon-fiber deck texture' },
  { id: 'obj-8', title: 'A Mechanical Clockwork Butterfly', category: 'object', difficulty: 'medium', challengeHint: 'Fine metallic line art for filigree wings and winding key' },
  { id: 'obj-9', title: 'An Ornate Treasure Chest Glowing from Inside', category: 'object', difficulty: 'medium', challengeHint: 'Gold-leaf filigree and dramatic internal rim lighting' },
  { id: 'obj-10', title: 'A Retro Gramophone Playing Floating Musical Notes', category: 'object', difficulty: 'medium', challengeHint: 'Flared brass horn horn with curling musical staves' },

  { id: 'obj-11', title: 'An Overgrown Ancient Robot Relic', category: 'object', difficulty: 'hard', challengeHint: 'Harmonize industrial rusted metal with creeping ivy and moss' },
  { id: 'obj-12', title: 'A Complex Astrolabe Model of the Solar System', category: 'object', difficulty: 'hard', challengeHint: 'Concentric rotating brass rings with orbiting crystal spheres' },
  { id: 'obj-13', title: 'A Medieval Siege Engine Catapult Under Construction', category: 'object', difficulty: 'hard', challengeHint: 'Detailed wood grain, heavy hemp ropes, and iron brackets' },
  { id: 'obj-14', title: 'A Holographic Holocron Floating with Laser Beams', category: 'object', difficulty: 'hard', challengeHint: 'Translucent glowing cubic geometry with fractured light' },

  // ==========================================
  // 4. FANTASY
  // ==========================================
  { id: 'fan-1', title: 'A Baby Dragon Curled Asleep on a Huge Ruby', category: 'fantasy', difficulty: 'easy', challengeHint: 'Scales with warm jewel reflections and tiny smoke puffs' },
  { id: 'fan-2', title: 'An Enchanted Willow Tree with Glowing Rune Leaves', category: 'fantasy', difficulty: 'easy', challengeHint: 'Whimsical twisted trunk and hanging glowing bioluminescent fronds' },
  { id: 'fan-3', title: 'A Friendly Forest Sprite Carrying an Acorn Lantern', category: 'fantasy', difficulty: 'easy', challengeHint: 'Translucent dragonfly wings and soft fairy glow' },
  { id: 'fan-4', title: 'A Floating Cauldron Bubbling Stardust into Clouds', category: 'fantasy', difficulty: 'easy', challengeHint: 'Draw whimsical cloud puffs turning into constellations' },
  { id: 'fan-5', title: 'A Magic Wand Sprouting Blooming Wildflowers', category: 'fantasy', difficulty: 'easy', challengeHint: 'Twisted wooden grain blooming with petaled orchids' },

  { id: 'fan-6', title: 'A Phoenix Bird Rising from Cosmic Stardust', category: 'fantasy', difficulty: 'medium', challengeHint: 'Fiery wing plumes blending into deep space galaxy dust' },
  { id: 'fan-7', title: 'A Floating Skyland Island with Windmill & Waterfalls', category: 'fantasy', difficulty: 'medium', challengeHint: 'Show dangling root systems and water falling into clouds' },
  { id: 'fan-8', title: 'A Crystal Golem Guarding a Hidden Mountain Pass', category: 'fantasy', difficulty: 'medium', challengeHint: 'Jagged prism facets casting spectral rainbow light' },
  { id: 'fan-9', title: 'A Griffon Perched High on a Crumbling Gothic Spire', category: 'fantasy', difficulty: 'medium', challengeHint: 'Combine eagle feathered head with muscular feline hindquarters' },
  { id: 'fan-10', title: 'A Moonlight Kelpie Emerging from a Mist-Covered Loch', category: 'fantasy', difficulty: 'medium', challengeHint: 'Water dripping like mane hair with reflective moonbeams' },

  { id: 'fan-11', title: 'A Colossal Flying Whale Carrying a Citadel on Its Back', category: 'fan-11', categoryText: 'fantasy', category: 'fantasy', difficulty: 'hard', challengeHint: 'Scale contrast between massive barnacled whale and castle towers' } as DrawingPrompt,
  { id: 'fan-12', title: 'A Sea Serpent Coiled Around a Sunken Pirate Galleon', category: 'fantasy', difficulty: 'hard', challengeHint: 'Dynamic underwater depth, rotted wood rigging, and scaled coils' },
  { id: 'fan-13', title: 'An Ancient Dragon Playing Chess with a Mountain Titan', category: 'fantasy', difficulty: 'hard', challengeHint: 'Massive scale perspective looking up from a valley floor' },
  { id: 'fan-14', title: 'A Celestial Star-Eater Serpent Swallowing a Comet', category: 'fantasy', difficulty: 'hard', challengeHint: 'Glowing comet tail trailing through dark space nebulae' },

  // ==========================================
  // 5. NATURE
  // ==========================================
  { id: 'nat-1', title: 'A Cozy Cabin in a Pine Forest under Aurora Borealis', category: 'nature', difficulty: 'easy', challengeHint: 'Curving green northern lights dancing above silhouette pine trees' },
  { id: 'nat-2', title: 'A Single Blooming Desert Cactus under Midday Sun', category: 'nature', difficulty: 'easy', challengeHint: 'Vibrant magenta blossom crowning sharp ribbed spiny cactus' },
  { id: 'nat-3', title: 'A Peaceful Waterfall Cascading into an Emerald Pool', category: 'nature', difficulty: 'easy', challengeHint: 'Smooth frothing white water against weathered mossy stones' },
  { id: 'nat-4', title: 'A Sunlit Clearing with Wild Mushrooms and Ferns', category: 'nature', difficulty: 'easy', challengeHint: 'Dappled sun rays filtering through forest canopy foliage' },
  { id: 'nat-5', title: 'A Solitary Lighthouse on a Wave-Battered Cliff', category: 'nature', difficulty: 'easy', challengeHint: 'Dramatic ocean spray against stark rocky headlands' },

  { id: 'nat-6', title: 'An Ancient Bonsai Tree Rooted onto a River Stone', category: 'nature', difficulty: 'medium', challengeHint: 'Twisted bark grain, delicate needle pads, and moss cushion' },
  { id: 'nat-7', title: 'A Whispering Bamboo Grove Swaying in Heavy Mist', category: 'nature', difficulty: 'medium', challengeHint: 'Repeating vertical culms fading into atmospheric fog layers' },
  { id: 'nat-8', title: 'A Sunset Glacier with Turquoise Ice Crevasses', category: 'nature', difficulty: 'medium', challengeHint: 'Warm orange sunset glow contrasting with deep cyan ice cracks' },
  { id: 'nat-9', title: 'A Bioluminescent Mangrove Lagoon at Midnight', category: 'nature', difficulty: 'medium', challengeHint: 'Gnarled stilt roots glowing with neon blue water ripples' },
  { id: 'nat-10', title: 'A Rolling Lavender Field Leading to a Tuscan Villa', category: 'nature', difficulty: 'medium', challengeHint: 'Linear perspective lines of purple rows leading into horizon' },

  { id: 'nat-11', title: 'A Violent Lightning Storm Over Crashing Ocean Swells', category: 'nature', difficulty: 'hard', challengeHint: 'Forked lightning illuminating churning sea foam and storm clouds' },
  { id: 'nat-12', title: 'A Subterranean Geode Cavern with Towering Crystals', category: 'nature', difficulty: 'hard', challengeHint: 'Multiple light sources reflecting across translucent amethyst pillars' },
  { id: 'nat-13', title: 'An Overgrown Ancient Banyan Tree Consuming Old Stone Ruins', category: 'nature', difficulty: 'hard', challengeHint: 'Complex aerial root net enveloping carved temple stones' },
  { id: 'nat-14', title: 'A Volcanic Eruption with Glowing Lava Rivers into the Sea', category: 'nature', difficulty: 'hard', challengeHint: 'Steam plumes, explosive magma fountains, and cooling black rock' }
];

export const CHALLENGE_MODIFIERS = [
  '🎨 Limited Palette: Use only 3 colors!',
  '⏱️ Speed Challenge: Complete in under 60 seconds!',
  '✋ Non-Dominant Hand: Draw using your non-dominant hand!',
  '✏️ Single Line Art: Do not lift your pen from start to finish!',
  '🌑 Silhouettes Only: Draw purely using solid black shapes!',
  '👀 Blind Contour: Draw without looking at your canvas!',
  '✨ Chibi / Cute Style: Make the subject super cute with giant eyes!',
  '🤖 Cyberpunk Upgrade: Add neon circuits and futuristic chrome!',
  '🌿 Overgrown Relic: Add creeping vines, moss, and weathered cracks!'
];
