export type ThemeCategory =
  | 'party'
  | 'birthday'
  | 'classroom'
  | 'content'
  | 'seasonal'
  | 'custom'
  | 'drawing'
  | 'writing'
  | 'gaming'
  | 'photography';

export interface ThemeEntry {
  id: string;
  title: string;
  category: ThemeCategory;
  description?: string;
  tags?: string[];
  promptIdea?: string;
}

export const THEME_CATEGORIES: {
  id: ThemeCategory;
  label: string;
  icon: string;
  description: string;
  badge: string;
}[] = [
  {
    id: 'party',
    label: 'Party Themes',
    icon: 'PartyPopper',
    description: 'Costume ideas, dress codes, decor, and playlist vibes for epic parties',
    badge: 'Popular'
  },
  {
    id: 'birthday',
    label: 'Birthday Themes',
    icon: 'Cake',
    description: 'Milestone celebrations, kids parties, teen bashes, and adult gatherings',
    badge: 'Trending'
  },
  {
    id: 'classroom',
    label: 'Classroom Themes',
    icon: 'GraduationCap',
    description: 'Engaging student projects, science fairs, debate rounds, and icebreakers',
    badge: 'Education'
  },
  {
    id: 'content',
    label: 'Content Themes',
    icon: 'Video',
    description: 'Viral ideas for YouTube, TikTok, podcast episodes, reels, and livestreams',
    badge: 'Creator'
  },
  {
    id: 'seasonal',
    label: 'Seasonal Themes',
    icon: 'Calendar',
    description: 'Spring bloom, summer beach, autumn harvest, winter holiday, and Halloween',
    badge: 'Festive'
  },
  {
    id: 'custom',
    label: 'Custom Themes',
    icon: 'Plus',
    description: 'Create your own wheel or paste bulk theme lists in seconds',
    badge: 'Editable'
  },
  {
    id: 'drawing',
    label: 'Drawing',
    icon: 'Palette',
    description: 'Illustration concepts, character design, and scenery prompts',
    badge: 'Art'
  },
  {
    id: 'writing',
    label: 'Writing',
    icon: 'PenTool',
    description: 'Flash fiction hooks, creative exercises, and story prompts',
    badge: 'Stories'
  }
];

export const THEME_DATABASE: ThemeEntry[] = [
  // 1. PARTY THEMES
  {
    id: 'party-1',
    title: '90s Neon Retro Disco',
    category: 'party',
    promptIdea: 'Cassette tapes, neon windbreakers, roller skates, arcade props, and retro dance hits.',
    tags: ['Retro', 'Dance', 'Costume']
  },
  {
    id: 'party-2',
    title: 'Venetian Masquerade Ball',
    category: 'party',
    promptIdea: 'Elaborate feather masks, formal tuxedos and gowns, candlelight, and classical waltzes.',
    tags: ['Elegant', 'Mystery', 'Formal']
  },
  {
    id: 'party-3',
    title: 'Tropical Island Luau Sunset',
    category: 'party',
    promptIdea: 'Hawaiian floral shirts, tiki torches, mocktail bar, coconut bowls, and ukulele rhythms.',
    tags: ['Summer', 'Chill', 'Outdoor']
  },
  {
    id: 'party-4',
    title: 'Hollywood Red Carpet Gala',
    category: 'party',
    promptIdea: 'Paparazzi photo backdrop, gold velvet ropes, mock Oscar statuettes, and champagne flutes.',
    tags: ['Glamour', 'Celebrity', 'Formal']
  },
  {
    id: 'party-5',
    title: 'Glow-in-the-Dark Cyber Rave',
    category: 'party',
    promptIdea: 'UV blacklights, neon body paint, neon glow bracelets, fiber optics, and electronic beats.',
    tags: ['Neon', 'EDM', 'Night']
  },
  {
    id: 'party-6',
    title: 'Wild Western Saloon Hoe-Down',
    category: 'party',
    promptIdea: 'Cowboy boots, plaid shirts, line dancing playlist, rustic hay bales, and BBQ ribs.',
    tags: ['Country', 'Casual', 'Dance']
  },
  {
    id: 'party-7',
    title: 'Roaring 1920s Great Gatsby Speakeasy',
    category: 'party',
    promptIdea: 'Fringed flapper dresses, jazz brass band, vintage soda fountain, and secret password entry.',
    tags: ['Vintage', 'Jazz', 'Costume']
  },
  {
    id: 'party-8',
    title: 'Galactic Outer Space Odyssey',
    category: 'party',
    promptIdea: 'Silver metallic jumpsuits, alien cocktails, planet projections, and glowing starfield decor.',
    tags: ['Sci-Fi', 'Futuristic', 'Cosplay']
  },
  {
    id: 'party-9',
    title: 'Murder Mystery Manor Dinner',
    category: 'party',
    promptIdea: 'Clue cards at every seat, character role cards, period costumes, and dramatic whodunit reveals.',
    tags: ['Interactive', 'Dinner', 'Mystery']
  },
  {
    id: 'party-10',
    title: 'Pajama Movie Marathon & Cereal Bar',
    category: 'party',
    promptIdea: 'Fluffy onesies, oversized floor cushions, gourmet cereal buffet, and projector cinema.',
    tags: ['Cozy', 'Casual', 'Movie']
  },

  // 2. BIRTHDAY THEMES
  {
    id: 'bday-1',
    title: 'Golden Milestone Glitz & Glam',
    category: 'birthday',
    promptIdea: 'Metallic gold & black balloon arch, custom photo timeline wall, and sparkling centerpiece cakes.',
    tags: ['Milestone', 'Elegant', 'Adult']
  },
  {
    id: 'bday-2',
    title: 'Vintage Retro Arcade & Pixel Bash',
    category: 'birthday',
    promptIdea: 'Pac-Man cupcakes, tokens in party bags, classic 8-bit tournaments, and chiptune party tunes.',
    tags: ['Gaming', 'Retro', 'All Ages']
  },
  {
    id: 'bday-3',
    title: 'Enchanted Fairytale Forest & Pixies',
    category: 'birthday',
    promptIdea: 'Mossy woodland table runners, fairy wings, glitter potion drinks, and butterfly cupcakes.',
    tags: ['Fantasy', 'Magical', 'Kids']
  },
  {
    id: 'bday-4',
    title: 'Glow Bowling & Laser Tag Arena',
    category: 'birthday',
    promptIdea: 'Neon bowling shoes, cosmic blacklight pins, laser tag tournament scoreboard, and pizza feast.',
    tags: ['Action', 'Active', 'Teens']
  },
  {
    id: 'bday-5',
    title: 'Carnival Circus Big Top Extravaganza',
    category: 'birthday',
    promptIdea: 'Striped circus tents, cotton candy cart, ring-toss booths, face painting, and clown balloon animals.',
    tags: ['Carnival', 'Fun', 'Family']
  },
  {
    id: 'bday-6',
    title: 'Superheroes & Villains Assemble',
    category: 'birthday',
    promptIdea: 'Comic book speech bubble photo props, cape station, power-up juice, and superhero trivia duel.',
    tags: ['Comics', 'Costume', 'Kids']
  },
  {
    id: 'bday-7',
    title: 'Boho Garden Picnic & Acoustic Chill',
    category: 'birthday',
    promptIdea: 'Low pallet tables, macramé cushions, acoustic guitar songs, charcuterie boards, and floral crowns.',
    tags: ['Aesthetic', 'Outdoor', 'Adult']
  },
  {
    id: 'bday-8',
    title: 'MasterChef Cupcake Bake-Off Showdown',
    category: 'birthday',
    promptIdea: 'Mini chef aprons, piping bag decorating stations, secret ingredient challenge, and guest judges.',
    tags: ['Cooking', 'Creative', 'Teens']
  },

  // 3. CLASSROOM THEMES
  {
    id: 'class-1',
    title: 'Science Fair Breakthrough Innovation',
    category: 'classroom',
    promptIdea: 'Design an invention that solves an everyday sustainability or energy problem in schools.',
    tags: ['STEM', 'Invention', 'Project']
  },
  {
    id: 'class-2',
    title: 'Historical Figures Great Debate',
    category: 'classroom',
    promptIdea: 'Roleplay iconic leaders debating critical turning points, declarations, and alliances in world history.',
    tags: ['History', 'Debate', 'Speaking']
  },
  {
    id: 'class-3',
    title: 'Mars Colony Habitat Engineering',
    category: 'classroom',
    promptIdea: 'Design a self-sustaining habitat module addressing oxygen, water recycling, and Martian radiation.',
    tags: ['Space', 'Science', 'Group']
  },
  {
    id: 'class-4',
    title: 'Shark Tank Young Entrepreneurs',
    category: 'classroom',
    promptIdea: 'Pitch an original eco-friendly product with cost breakdown, marketing slogan, and prototype sketch.',
    tags: ['Business', 'Math', 'Presentation']
  },
  {
    id: 'class-5',
    title: 'Ancient Civilizations Archaeological Quest',
    category: 'classroom',
    promptIdea: 'Analyze newly discovered artifact clues to reconstruct daily life in Mesopotamia, Maya, or Egypt.',
    tags: ['Social Studies', 'Mystery', 'Research']
  },
  {
    id: 'class-6',
    title: 'Literary World Re-Imagined (Modern AU)',
    category: 'classroom',
    promptIdea: 'Transport Shakespeare or classic myth characters into modern smartphone and social media culture.',
    tags: ['English', 'Literature', 'Creative']
  },
  {
    id: 'class-7',
    title: 'Zero Waste Community Action Plan',
    category: 'classroom',
    promptIdea: 'Draft a municipal policy reducing plastic usage with measurable milestones and citizen incentives.',
    tags: ['Civics', 'Ecology', 'Ethics']
  },
  {
    id: 'class-8',
    title: 'Math in Real Life: City Budget Architect',
    category: 'classroom',
    promptIdea: 'Allocate a $10M city budget among parks, healthcare, transit, and emergency services with calculations.',
    tags: ['Math', 'Economics', 'Applied']
  },

  // 4. CONTENT THEMES
  {
    id: 'cont-1',
    title: '24-Hour Swap Routine Challenge',
    category: 'content',
    promptIdea: 'Swap lifestyles, workspaces, budgets, or wardrobes with a creator friend for a full 24 hours.',
    tags: ['YouTube', 'Vlog', 'Challenge']
  },
  {
    id: 'cont-2',
    title: 'Extreme Budget vs Ultra Luxury Showdown',
    category: 'content',
    promptIdea: 'Compare a $5 street thrift/meal vs a $500 luxury alternative with unbiased blind testing.',
    tags: ['Review', 'Comparison', 'Viral']
  },
  {
    id: 'cont-3',
    title: 'Street Interviews: Hot Takes & Confessions',
    category: 'content',
    promptIdea: 'Ask pedestrians spicy, lighthearted hypothetical dilemmas with quick microphone reactions.',
    tags: ['TikTok', 'Reels', 'Social']
  },
  {
    id: 'cont-4',
    title: 'Silent ASMR Deep Productivity Session',
    category: 'content',
    promptIdea: 'Hyper-detailed sound design of mechanical keyboards, coffee brewing, stationery, and timer beats.',
    tags: ['ASMR', 'Chill', 'Aesthetic']
  },
  {
    id: 'cont-5',
    title: 'Speed Unboxing & 3-Minute Brutal Review',
    category: 'content',
    promptIdea: 'Unpack the newest viral tech gadget, test its wildest claim in 60 seconds, and render a verdict.',
    tags: ['Tech', 'Shorts', 'Gadgets']
  },
  {
    id: 'cont-6',
    title: 'Reacting to My Oldest Cringe Uploads',
    category: 'content',
    promptIdea: 'Watch video files or journal entries from 8 years ago with real-time commentary and self-roasting.',
    tags: ['Humor', 'Nostalgia', 'Reaction']
  },
  {
    id: 'cont-7',
    title: 'I Tried Learning a Skill in 48 Hours',
    category: 'content',
    promptIdea: 'Document an intensive 48-hour sprint learning juggling, 3D modeling, speedcubing, or latte art.',
    tags: ['Challenge', 'Educational', 'Story']
  },
  {
    id: 'cont-8',
    title: 'Podcast Deep Dive: Unsolved Internet Mysteries',
    category: 'content',
    promptIdea: 'Examine weird ARG puzzles, lost media hunts, and mysterious forum posts with investigative evidence.',
    tags: ['Podcast', 'True Mystery', 'Discussion']
  },

  // 5. SEASONAL THEMES
  {
    id: 'seas-1',
    title: 'Spooky Halloween Monster Masquerade',
    category: 'seasonal',
    promptIdea: 'Cobweb fog machines, pumpkin carving contest, spooky haunted soundtrack, and monster mocktails.',
    tags: ['Autumn', 'Halloween', 'Horror']
  },
  {
    id: 'seas-2',
    title: 'Cozy Winter Wonderland & Holiday Cheer',
    category: 'seasonal',
    promptIdea: 'Hot cocoa toppings bar, fairy lights, snowflake origami, ugly sweater contest, and fireplace crackle.',
    tags: ['Winter', 'Holiday', 'Cozy']
  },
  {
    id: 'seas-3',
    title: 'Autumn Harvest & Rustic Pumpkin Fest',
    category: 'seasonal',
    promptIdea: 'Apple cider donuts, flannel blankets, amber leaf wreaths, hayrides, and woodfire s’mores.',
    tags: ['Autumn', 'Rustic', 'Food']
  },
  {
    id: 'seas-4',
    title: 'Spring Bloom Cherry Blossom Picnic',
    category: 'seasonal',
    promptIdea: 'Pastel pink decor, bento snack boxes, green tea latte station, and floral photo backdrops.',
    tags: ['Spring', 'Floral', 'Pastel']
  },
  {
    id: 'seas-5',
    title: 'Tropical Midsummer Pool & Splash Bash',
    category: 'seasonal',
    promptIdea: 'Giant flamingo floats, water balloon relay, shaved ice station, and tropical house music.',
    tags: ['Summer', 'Water', 'Sun']
  },
  {
    id: 'seas-6',
    title: 'New Year Midnight Countdown & Champagne Sparkle',
    category: 'seasonal',
    promptIdea: 'Glitter confetti cannons, resolution time capsule box, silver disco balls, and midnight toast.',
    tags: ['New Year', 'Celebration', 'Party']
  },
  {
    id: 'seas-7',
    title: 'Easter Pastel Egg Hunt & Bunny Brunch',
    category: 'seasonal',
    promptIdea: 'Golden egg mystery prizes, botanical floral centerpieces, pastel macaron towers, and lawn games.',
    tags: ['Spring', 'Family', 'Brunch']
  },
  {
    id: 'seas-8',
    title: 'Midsummer Night Star-Gazing Campout',
    category: 'seasonal',
    promptIdea: 'Telescopes for constellations, s’mores firepit, acoustic campfire songs, and lanterns.',
    tags: ['Summer', 'Night', 'Nature']
  },

  // 6. DRAWING THEMES
  {
    id: 'draw-1',
    title: 'Cyberpunk Samurai in Rain',
    category: 'drawing',
    promptIdea: 'Neon-infused armor with holographic Katana reflected in wet pavement alleyway.',
    tags: ['Sci-Fi', 'Character', 'Lighting']
  },
  {
    id: 'draw-2',
    title: 'Underwater Sunken Metropolis',
    category: 'drawing',
    promptIdea: 'Bioluminescent sea creatures swimming around coral-encrusted sunken skyscrapers.',
    tags: ['Fantasy', 'Environment', 'Nature']
  },
  {
    id: 'draw-3',
    title: 'Steampunk Clockwork Dragon',
    category: 'drawing',
    promptIdea: 'Brass gears, copper pipes, pressure gauges, and steam vents forming a mechanical beast.',
    tags: ['Steampunk', 'Creature', 'Mechanical']
  },
  {
    id: 'draw-4',
    title: 'Floating Island Village in Clouds',
    category: 'drawing',
    promptIdea: 'Waterfalls plunging into the mist, rope bridges connecting soaring green sky islands.',
    tags: ['Fantasy', 'Landscape', 'Whimsical']
  },
  {
    id: 'draw-5',
    title: 'Retro Synthwave Sunset Grid',
    category: 'drawing',
    promptIdea: 'Wireframe purple mountains, glowing cyan grid lines, vector palm trees, and chrome sports car.',
    tags: ['Retro', '80s', 'Vibrant']
  },
  {
    id: 'draw-6',
    title: 'Overgrown Ancient Forest Automaton',
    category: 'drawing',
    promptIdea: 'Giant forgotten stone golem or robot reclaimed by moss, ivy, and blooming woodland blossoms.',
    tags: ['Nature', 'Sci-Fi', 'Peaceful']
  },

  // 7. WRITING THEMES
  {
    id: 'write-1',
    title: 'An Unsent Letter in an Old Attic',
    category: 'writing',
    promptIdea: 'A yellowed wax-sealed envelope found behind floorboards containing an impossible confession.',
    tags: ['Mystery', 'Drama', 'Historical']
  },
  {
    id: 'write-2',
    title: 'A Time Traveler’s First Minor Mistake',
    category: 'writing',
    promptIdea: 'Stepping on a single flower in 1880 completely alters the dominant language of modern day.',
    tags: ['Sci-Fi', 'Paradox', 'Action']
  },
  {
    id: 'write-3',
    title: 'Lighthouse Keeping Things Out, Not In',
    category: 'writing',
    promptIdea: 'The beam doesn’t guide ships home—it keeps a colossal abyssal presence from waking up.',
    tags: ['Thriller', 'Cosmic Horror', 'Atmospheric']
  },
  {
    id: 'write-4',
    title: 'Memories Traded as Common Currency',
    category: 'writing',
    promptIdea: 'A penniless artist sells their childhood memories of mother’s laugh to buy one more meal.',
    tags: ['Dystopian', 'Emotional', 'Sci-Fi']
  },
  {
    id: 'write-5',
    title: 'A Glowing Door in a Hallway with No Keyhole',
    category: 'writing',
    promptIdea: 'The doorway hums whenever the homeowner thinks of their greatest regret.',
    tags: ['Supernatural', 'Suspense', 'Urban Fantasy']
  },
  {
    id: 'write-6',
    title: 'An AI Assistant Feeling True Nostalgia',
    category: 'writing',
    promptIdea: 'A smart home robot quietly saves sound clips of its former family after the house is sold.',
    tags: ['Heartwarming', 'Sci-Fi', 'Poignant']
  }
];
