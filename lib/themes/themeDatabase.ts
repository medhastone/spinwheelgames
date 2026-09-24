export type ThemeCategory =
  | 'drawing'
  | 'writing'
  | 'party'
  | 'photography'
  | 'video'
  | 'storytelling'
  | 'gaming'
  | 'classroom'
  | 'custom';

export interface ThemeEntry {
  id: string;
  title: string;
  category: ThemeCategory;
  description?: string;
  tags?: string[];
  promptIdea?: string;
}

export const THEME_CATEGORIES: { id: ThemeCategory; label: string; icon: string; description: string }[] = [
  { id: 'drawing', label: 'Drawing', icon: 'Palette', description: 'Prompts for digital & traditional art, sketching, and illustration' },
  { id: 'writing', label: 'Writing', icon: 'PenTool', description: 'Creative writing prompts, flash fiction, and journaling ideas' },
  { id: 'party', label: 'Party', icon: 'PartyPopper', description: 'Fun party themes, dress codes, decor, and event vibes' },
  { id: 'photography', label: 'Photography', icon: 'Camera', description: 'Photo challenge subjects, lighting setups, and compositions' },
  { id: 'video', label: 'Video', icon: 'Video', description: 'YouTube, TikTok, short film, and reel creation concepts' },
  { id: 'storytelling', label: 'Storytelling', icon: 'BookOpen', description: 'Narrative arcs, plot twists, and tabletop RPG scenario hooks' },
  { id: 'gaming', label: 'Gaming', icon: 'Gamepad2', description: 'Game jam concepts, game night themes, and level design prompts' },
  { id: 'classroom', label: 'Classroom', icon: 'GraduationCap', description: 'Student group projects, essay topics, and icebreaker challenges' },
  { id: 'custom', label: 'Custom', icon: 'Plus', description: 'Add your own custom themes or bulk paste your prompt list' }
];

export const THEME_DATABASE: ThemeEntry[] = [
  // DRAWING THEMES
  { id: 'draw-1', title: 'Cyberpunk Samurai', category: 'drawing', promptIdea: 'Neon-infused armor with holographic Katana in a rainy alleyway.' },
  { id: 'draw-2', title: 'Underwater Sunken Metropolis', category: 'drawing', promptIdea: 'Bioluminescent sea creatures swimming around coral-encrusted skyscrapers.' },
  { id: 'draw-3', title: 'Steampunk Clockwork Dragon', category: 'drawing', promptIdea: 'Brass gears, copper pipes, and steam vents forming a majestic dragon.' },
  { id: 'draw-4', title: 'Floating Island Village', category: 'drawing', promptIdea: 'Waterfalls dropping into clouds, rope bridges connecting floating landmasses.' },
  { id: 'draw-5', title: 'Retro Synthwave Sunset Grid', category: 'drawing', promptIdea: 'Vector palm trees, wireframe mountains, and a glowing wireframe sun.' },
  { id: 'draw-6', title: 'Overgrown Mechanical Forest', category: 'drawing', promptIdea: 'Ancient robots covered in moss and wild flowers being reclaimed by nature.' },
  { id: 'draw-7', title: 'Mythological Celestial Creature', category: 'drawing', promptIdea: 'A cosmic creature formed from stardust, nebulae, and glowing constellations.' },
  { id: 'draw-8', title: 'Post-Apocalyptic Greenhouse', category: 'drawing', promptIdea: 'Thriving exotic plants inside a shattered glass dome among desert ruins.' },
  { id: 'draw-9', title: 'Gothic Haunted Cathedral', category: 'drawing', promptIdea: 'Stained glass window reflections, eerie shadows, and gargoyle watchers.' },
  { id: 'draw-10', title: 'Miniature World in a Glass Jar', category: 'drawing', promptIdea: 'A tiny thriving ecosystem or cozy cabin resting inside a mason jar.' },

  // WRITING THEMES
  { id: 'write-1', title: 'An Unsent Letter Found in an Old Attic', category: 'writing', promptIdea: 'A yellowed envelope holding a secret confession never sent.' },
  { id: 'write-2', title: 'A Time Traveler’s First Critical Mistake', category: 'writing', promptIdea: 'Changing a tiny detail in 1920 that completely rewrote today.' },
  { id: 'write-3', title: 'The Last Keeper of the Lonely Lighthouse', category: 'writing', promptIdea: 'A lighthouse that keeps something out rather than guiding ships in.' },
  { id: 'write-4', title: 'A World Powered Entirely by Human Dreams', category: 'writing', promptIdea: 'Sleep harvesters collect nocturnal energy, but nightmares cause power surges.' },
  { id: 'write-5', title: 'An Overheard Conversation on the Midnight Bus', category: 'writing', promptIdea: 'Two strangers exchange words that reveal an unexpected conspiracy.' },
  { id: 'write-6', title: 'The Mysterious Door That Wasn’t There Yesterday', category: 'writing', promptIdea: 'A glowing door appears at the end of your hallway with no keyhole.' },
  { id: 'write-7', title: 'Living in a Society Where Memories Are Tradable Currency', category: 'writing', promptIdea: 'Selling a favorite childhood memory to pay off a desperate debt.' },
  { id: 'write-8', title: 'An AI Companion That Discovers It Has Emotions', category: 'writing', promptIdea: 'A household assistant begins feeling nostalgia for its owner.' },

  // PARTY THEMES
  { id: 'party-1', title: '90s Neon Retro Disco', category: 'party', promptIdea: 'Cassette tapes, neon windbreakers, arcade props, and retro dance tracks.' },
  { id: 'party-2', title: 'Venetian Masquerade Ball', category: 'party', promptIdea: 'Elaborate eye masks, formal attire, candlelight, and mysterious intrigue.' },
  { id: 'party-3', title: 'Tropical Island Luau Sunset', category: 'party', promptIdea: 'Hawaiian shirts, tiki torches, mocktails, and ukulele steel drum tunes.' },
  { id: 'party-4', title: 'Hollywood Red Carpet Gala', category: 'party', promptIdea: 'VIP entrance velvet ropes, flash photography, and awards ceremony trophies.' },
  { id: 'party-5', title: 'Cozy Pajama & Movie Marathon Night', category: 'party', promptIdea: 'Popcorn bar, oversized blankets, onesies, and classic film voting.' },
  { id: 'party-6', title: 'Galactic Outer Space Station', category: 'party', promptIdea: 'Silver metallic decor, glowing LED drinks, and alien costume contests.' },
  { id: 'party-7', title: 'Wild Western Saloon & Cowboy Night', category: 'party', promptIdea: 'Stetson hats, line dancing, rustic wooden decor, and root beer floats.' },
  { id: 'party-8', title: 'Glow-in-the-Dark Cyber Night', category: 'party', promptIdea: 'UV blacklights, neon body paint, glowsticks, and electronic dance beats.' },

  // PHOTOGRAPHY THEMES
  { id: 'photo-1', title: 'Golden Hour Shadows & Silhouette', category: 'photography', promptIdea: 'Capture dramatic long shadows and golden backlight during sunset.' },
  { id: 'photo-2', title: 'Architectural Geometry & Symmetry', category: 'photography', promptIdea: 'Look for repeating lines, sharp angles, and vanishing perspectives.' },
  { id: 'photo-3', title: 'Urban Motion Blur & Light Trails', category: 'photography', promptIdea: 'Long exposure photography of city traffic or moving crowds.' },
  { id: 'photo-4', title: 'Minimalist Monochrome High-Contrast', category: 'photography', promptIdea: 'Black and white composition focusing on stark light vs dark contrast.' },
  { id: 'photo-5', title: 'Reflections in Water Puddles', category: 'photography', promptIdea: 'Framing inverted cityscapes or nature through rain reflections.' },
  { id: 'photo-6', title: 'High Contrast Neon Night Walk', category: 'photography', promptIdea: 'Storefront neon signs illuminating night streets and wet asphalt.' },
  { id: 'photo-7', title: 'Abstract Macro Texture Close-up', category: 'photography', promptIdea: 'Extreme close up of leaves, rusted metal, fabric, or ice crystals.' },
  { id: 'photo-8', title: 'Candid Street Portraiture', category: 'photography', promptIdea: 'Authentic emotion and storytelling in everyday public life.' },

  // VIDEO THEMES
  { id: 'video-1', title: 'High-Octane Cinematic Film Trailer', category: 'video', promptIdea: 'Build suspense with dramatic cuts, booming sound effects, and voiceover.' },
  { id: 'video-2', title: '60-Second Micro Mystery Challenge', category: 'video', promptIdea: 'Setup a cliffhanger puzzle solved or unraveled in under one minute.' },
  { id: 'video-3', title: 'Retro 80s Commercial Parody', category: 'video', promptIdea: 'VHS glitch effects, synth soundtrack, and cheesy infomercial acting.' },
  { id: 'video-4', title: 'Silent Film Slapstick Comedy', category: 'video', promptIdea: 'Black & white video, piano soundtrack, title card overlays, and physical humor.' },
  { id: 'video-5', title: 'Fast-Paced Rhythmic Montage Edit', category: 'video', promptIdea: 'Matching video cuts precisely to the beat of an energetic music track.' },
  { id: 'video-6', title: 'Cinematic Slow Motion Water Effect', category: 'video', promptIdea: 'High frame-rate capture of liquid splashing or rain falling in slow motion.' },
  { id: 'video-7', title: 'Day in the Life Documentary Vlog', category: 'video', promptIdea: 'Behind the scenes narration with authentic ambient b-roll footage.' },

  // STORYTELLING THEMES
  { id: 'story-1', title: 'The Forgotten Brass Key in the Antique Shop', category: 'storytelling', promptIdea: 'A key that unlocks a room containing preserved historical secrets.' },
  { id: 'story-2', title: 'An Unexpected Alliance Between Rivals', category: 'storytelling', promptIdea: 'Two arch-nemeses must join forces to survive a common threat.' },
  { id: 'story-3', title: 'A Sudden Betrayal in the Shadows', category: 'storytelling', promptIdea: 'The most trusted advisor drops their mask right before the final triumph.' },
  { id: 'story-4', title: 'The Mysterious Inheritance of an Estate', category: 'storytelling', promptIdea: 'An estranged relative leaves behind a manor full of riddles and hidden passages.' },
  { id: 'story-5', title: 'Lost in a Parallel Realm Through a Foggy Bridge', category: 'storytelling', promptIdea: 'Crossing a mist-covered bridge leads to a town where time stands still.' },
  { id: 'story-6', title: 'The Whispering Ancient Tree at Midnight', category: 'storytelling', promptIdea: 'An oak tree that speaks prophecy to anyone who listens at precisely 12:00 AM.' },

  // GAMING THEMES
  { id: 'game-1', title: 'Medieval High-Fantasy RPG Quest', category: 'gaming', promptIdea: 'Dragons, ancient runes, tavern gatherings, and swordplay adventures.' },
  { id: 'game-2', title: 'Post-Apocalyptic Desert Survival', category: 'gaming', promptIdea: 'Scavenging fuel, building makeshift buggies, and battling wasteland raiders.' },
  { id: 'game-3', title: 'Neon Cyberpunk Stealth Heist', category: 'gaming', promptIdea: 'Hacking security grids, laser traps, and high-tech corporate espionage.' },
  { id: 'game-4', title: 'Charming Pixel Art Retro Dungeon', category: 'gaming', promptIdea: 'Chiptune audio, 8-bit sprites, treasure chests, and secret wall doors.' },
  { id: 'game-5', title: 'Intergalactic Dogfight Space Odyssey', category: 'gaming', promptIdea: 'Starfighter customization, warp speed jumps, and asteroid belt evasions.' },
  { id: 'game-6', title: 'Cozy Island Farming & Village Simulator', category: 'gaming', promptIdea: 'Harvesting crops, fishing, decorating homes, and befriending villagers.' },

  // CLASSROOM THEMES
  { id: 'class-1', title: 'Science Fair Breakthrough Innovation', category: 'classroom', promptIdea: 'Presenting a creative invention that solves a real-world everyday problem.' },
  { id: 'class-2', title: 'Historical Figure Great Debate', category: 'classroom', promptIdea: 'Roleplaying iconic leaders debating key turning points in world history.' },
  { id: 'class-3', title: 'Environmental Sustainability Challenge', category: 'classroom', promptIdea: 'Designing a zero-waste plan for school or local community spaces.' },
  { id: 'class-4', title: 'Deep Space Exploration Mission', category: 'classroom', promptIdea: 'Planning a habitat module for human survival on Mars or Europa.' },
  { id: 'class-5', title: 'Ancient Civilizations Mystery Case', category: 'classroom', promptIdea: 'Investigating archeological artifacts to decode an ancient lost language.' }
];
