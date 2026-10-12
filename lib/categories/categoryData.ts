export type CategoryId =
  | 'animals'
  | 'food'
  | 'movies'
  | 'sports'
  | 'countries'
  | 'science'
  | 'technology'
  | 'history'
  | 'objects'
  | 'writing'
  | 'classroom'
  | 'custom';

export interface CategoryItem {
  id: CategoryId | string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  iconName: string;
  color: string;
  accentBg: string;
  subPrompts: string[];
  isCustom?: boolean;
}

export const DEFAULT_CATEGORIES: CategoryItem[] = [
  {
    id: 'animals',
    name: 'Animals & Wildlife',
    shortName: 'Animals',
    tagline: 'Mammals, deep sea creatures, birds, reptiles & prehistoric fauna',
    description: 'Explore the animal kingdom from endangered species to nocturnal predators and Arctic wildlife.',
    iconName: 'Dog',
    color: '#10b981', // emerald
    accentBg: 'rgba(16, 185, 129, 0.1)',
    subPrompts: [
      'Endangered Species',
      'Deep Sea Creatures & Bioluminescence',
      'Nocturnal Forest Mammals',
      'Rainforest Canopy Birds',
      'Venomous Reptiles & Arachnids',
      'Arctic & Antarctic Wildlife',
      'Safari Apex Predators',
      'Prehistoric Dinosaurs & Megafauna',
      'Domestic Pets & Working Animals',
      'River & Freshwater Species'
    ]
  },
  {
    id: 'food',
    name: 'Food & Cuisine',
    shortName: 'Food',
    tagline: 'Street foods, gourmet dishes, desserts, spices & midnight snacks',
    description: 'Culinary traditions, comfort foods, baking, and global delicacies from street carts to fine dining.',
    iconName: 'Utensils',
    color: '#f97316', // orange
    accentBg: 'rgba(249, 115, 22, 0.1)',
    subPrompts: [
      'Global Street Food & Night Markets',
      'Desserts, Pastries & Baked Treats',
      'Comfort Foods & Midnight Snacks',
      'Fermented, Pickled & Cured Foods',
      'Spicy Regional Curries & Hot Sauces',
      'Breakfast & Brunch Specialties',
      'Artisanal Cheeses & Charcuterie',
      'Dumplings, Noodles & Baos',
      'Signature Cocktails & Mocktails',
      'Farm-to-Table Seasonal Produce'
    ]
  },
  {
    id: 'movies',
    name: 'Movies & Cinema',
    shortName: 'Movies',
    tagline: 'Blockbusters, cult classics, sci-fi epics, directors & genres',
    description: 'Cinematic storytelling across golden age classics, Hollywood blockbusters, and indie masterworks.',
    iconName: 'Film',
    color: '#8b5cf6', // violet
    accentBg: 'rgba(139, 92, 246, 0.1)',
    subPrompts: [
      '90s Cult Classics & Nostalgia',
      'Sci-Fi Space Exploration Epics',
      'Oscar Best Picture Winners',
      'Animated & Anime Masterpieces',
      'Psychological Thrillers & Mystery',
      'Post-Apocalyptic Survival Films',
      'Iconic Movie Villains & Antagonists',
      'Golden Age Black-and-White Cinema',
      'Heist & Crime Masterminds',
      'Romantic Comedies & Meet-Cutes'
    ]
  },
  {
    id: 'sports',
    name: 'Sports & Athletics',
    shortName: 'Sports',
    tagline: 'Olympic events, team leagues, extreme sports & legendary rivalries',
    description: 'High-adrenaline athletic competitions, tactical games, motorsports, and endurance challenges.',
    iconName: 'Trophy',
    color: '#eab308', // yellow
    accentBg: 'rgba(234, 179, 8, 0.1)',
    subPrompts: [
      'Olympic Track & Field Events',
      'Extreme Action & Board Sports',
      'Winter Mountain & Ice Games',
      'Global Team Ball Leagues (Football/Basketball)',
      'Racquet & Net Duels (Tennis/Badminton)',
      'Combat Sports & Martial Arts',
      'Aquatic & Open-Water Racing',
      'Motorsports & Formula Grand Prix',
      'Endurance Marathons & Triathlons',
      'Traditional & Folk Sports'
    ]
  },
  {
    id: 'countries',
    name: 'Countries & Geography',
    shortName: 'Countries',
    tagline: 'World nations, capital cities, islands, landmarks & terrain',
    description: 'Global geography, unique cultures, landlocked territories, island archipelagos, and world wonders.',
    iconName: 'Globe',
    color: '#06b6d4', // cyan
    accentBg: 'rgba(6, 182, 212, 0.1)',
    subPrompts: [
      'Landlocked Continental Nations',
      'Tropical Island Archipelagos',
      'World Capital Cities & Skylines',
      'Historic UNESCO World Heritage Sites',
      'Vast Deserts, Canyons & Oases',
      'Glacial Fjords & Alpine Peaks',
      'Ancient Empires & Lost Cities',
      'Countries Bordering Three or More Oceans',
      'Megacities with 10M+ Population',
      'Nations with Multiple Official Languages'
    ]
  },
  {
    id: 'science',
    name: 'Science & Discovery',
    shortName: 'Science',
    tagline: 'Astrophysics, genetics, chemical reactions, quantum physics & nature',
    description: 'The fundamental building blocks of the universe, scientific theories, and breakthroughs.',
    iconName: 'Atom',
    color: '#3b82f6', // blue
    accentBg: 'rgba(59, 130, 246, 0.1)',
    subPrompts: [
      'Astrophysics & Black Holes',
      'DNA, Genetics & CRISPR Gene Editing',
      'Quantum Mechanics & Entanglement',
      'Marine Biology & Deep Abyssal Zones',
      'Periodic Table Elements & Noble Gases',
      'Neuroscience, Memory & the Brain',
      'Renewable Clean Energy Breakthroughs',
      'Paleontology, Fossils & Ancient Life',
      'Meteorology, Tornadoes & Climate Systems',
      'Nanotechnology & Smart Materials'
    ]
  },
  {
    id: 'technology',
    name: 'Technology & Computing',
    shortName: 'Technology',
    tagline: 'Artificial intelligence, robotics, cybersecurity, gadgets & aerospace',
    description: 'Modern innovation, programming, digital frontiers, virtual reality, and high-tech engineering.',
    iconName: 'Cpu',
    color: '#ec4899', // pink
    accentBg: 'rgba(236, 72, 153, 0.1)',
    subPrompts: [
      'Artificial Intelligence & Neural Networks',
      'Cybersecurity, Hackers & Cryptography',
      'Spacecraft, Mars Rovers & Satellites',
      'Retro 80s/90s Computing & 8-Bit Tech',
      'Virtual & Augmented Reality Worlds',
      'Autonomous Electric Vehicles & Drones',
      'Quantum Computing Hardware',
      'Internet of Things & Smart Home Gadgets',
      'Wearable Tech & Neural Interfaces',
      'Open-Source Coding & Linux Distros'
    ]
  },
  {
    id: 'history',
    name: 'History & Civilizations',
    shortName: 'History',
    tagline: 'Ancient empires, world revolutions, inventions & landmark eras',
    description: 'Human chronicles across classical antiquity, the medieval period, renaissance, and modern times.',
    iconName: 'Landmark',
    color: '#a855f7', // purple
    accentBg: 'rgba(168, 85, 247, 0.1)',
    subPrompts: [
      'Ancient Rome, Greece & Classical Philosophy',
      'The Renaissance & Golden Age of Art',
      'The Age of Maritime Exploration',
      'The Industrial Revolution & Steam Power',
      'World War Diplomatic Treaties & Battlelines',
      'Ancient Egypt, Pharaohs & Pyramids',
      'Feudal Japan, Samurai & Shogunates',
      'The Cold War Space Race & Moon Landing',
      'The Silk Road Trade & Merchant Caravans',
      'Pre-Columbian Maya, Aztec & Inca Civilizations'
    ]
  },
  {
    id: 'objects',
    name: 'Objects & Everyday Items',
    shortName: 'Objects',
    tagline: 'Vintage curiosities, tools, instruments, EDC gear & keepsakes',
    description: 'Tangible artifacts, everyday items, antique mechanisms, and household essentials.',
    iconName: 'Package',
    color: '#64748b', // slate
    accentBg: 'rgba(100, 116, 139, 0.1)',
    subPrompts: [
      'Vintage Mechanical Clocks & Curiosities',
      'Handcrafted Woodworking Tools',
      'Everyday Carry (EDC) Pocket Gear',
      'Acoustic Musical Instruments',
      'Laboratory Glassware & Microscopes',
      'Retro Analog Cameras & Lenses',
      'Kitchen Utensils & Cast Iron Cookware',
      'Antique Heirlooms & Keepsake Boxes',
      'Outdoor Camping & Survival Equipment',
      'Architectural Drafting Instruments'
    ]
  },
  {
    id: 'writing',
    name: 'Writing & Storytelling',
    shortName: 'Writing',
    tagline: 'Character archetypes, plot twists, narrative tropes & worldbuilding',
    description: 'Creative spark for writers, worldbuilders, screenwriters, poets, and flash fiction authors.',
    iconName: 'PenTool',
    color: '#f43f5e', // rose
    accentBg: 'rgba(244, 63, 94, 0.1)',
    subPrompts: [
      'Unreliable Narrators & Hidden Agendas',
      'Urban Fantasy & Hidden Magic Circles',
      'Enemies-to-Reluctant-Allies Dynamics',
      'Locked-Room Whodunit Murder Mysteries',
      'Dystopian Underground Resistance Movements',
      'Found Family on an Impossible Voyage',
      'Cyberpunk Noir Detective Investigations',
      'Mythic Hero Journeys with a Dark Twist',
      'Time Loop Dilemmas with High Stakes',
      'Fairy Tale Deconstructions & Retellings'
    ]
  },
  {
    id: 'classroom',
    name: 'Classroom & Learning',
    shortName: 'Classroom',
    tagline: 'Bell ringers, debate prompts, STEM experiments & vocabulary',
    description: 'Interactive prompts for teachers, students, study groups, educational games, and icebreakers.',
    iconName: 'GraduationCap',
    color: '#14b8a6', // teal
    accentBg: 'rgba(20, 184, 166, 0.1)',
    subPrompts: [
      'Two-Minute Ethical Debate Arguments',
      'STEM Classroom Hands-on Hypotheses',
      'Historical "What-If" Counterfactual Scenarios',
      'Rapid-Fire Vocabulary Word Associations',
      'Creative Math Real-World Word Problems',
      'Student Research Mini-Presentations',
      'Morning Meeting Warm-Up Icebreakers',
      'Geography Mystery Clue Challenges',
      'Literature Character Hot-Seat Questions',
      'Science Fair Experiment Topics'
    ]
  },
  {
    id: 'custom',
    name: 'Custom Categories',
    shortName: 'Custom',
    tagline: 'Your own personalized categories, gaming themes & study lists',
    description: 'Add your own custom categories or tailor the generator specifically for your game or project.',
    iconName: 'Sparkles',
    color: '#6366f1', // indigo
    accentBg: 'rgba(99, 102, 241, 0.1)',
    subPrompts: [
      'Board Games & Tabletop RPGs',
      'Anime, Manga & Light Novels',
      'Video Game Franchises & Boss Fights',
      'Pop Music Hits & Iconic Bands',
      'Fantasy Lore & Magic Systems',
      'Travel Bucket List Destinations'
    ],
    isCustom: true
  }
];

export const SCATTERGORIES_LETTERS = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
  'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'W'
];
