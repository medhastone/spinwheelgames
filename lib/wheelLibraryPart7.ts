import { WheelExperience } from './wheelLibraryTypes';

export const WHEEL_LIBRARY_PART7: WheelExperience[] = [
  // ==========================================
  // 13. CREATIVITY & WRITING (6 experiences)
  // ==========================================
  {
    id: 'writing-prompt-wheel',
    name: 'Writing Prompt Wheel',
    purpose: 'Conquer writer\'s block with unexpected inciting incidents and narrative sparks.',
    targetAudience: 'Novelists, creative writing students, NaNoWriMo participants, screenwriters.',
    defaultEntries: [
      'A mysterious letter arrives addressed to a tenant who died 40 years ago',
      'The power grid shuts down globally for exactly 11 minutes',
      'An antique watch found in an attic begins ticking backwards',
      'Two estranged rivals are trapped inside an express train elevator',
      'A cartographer discovers a hidden island that appears on no official map',
      'Every photograph taken with an old polaroid camera captures shadows of the future'
    ],
    category: 'CREATIVITY & WRITING',
    instructions: 'Spin for an inciting incident. Write continuously for 15 minutes without deleting a single word.',
    optionalModes: ['15-Minute Freewrite Sprint', 'Genre Modifier (Sci-Fi, Noir, Fantasy)', 'Word Limit Challenge (300 Words)'],
    relatedWheels: ['Character Wheel', 'Story Starter Wheel', 'Poetry Meter Wheel'],
    relatedTools: ['15-Minute Sprint Timer', 'Word Count Target Tracker'],
    difficulty: 'Medium',
    shareableResultConcept: 'Story Spark Manuscript card featuring prompt and word count milestone.',
    uniqueValueProposition: 'Focuses on tension-filled narrative premises that demand immediate dramatic action.',
    paletteKey: 'pastel'
  },
  {
    id: 'story-starter-wheel',
    name: 'Story Starter Wheel',
    purpose: 'Generate compelling first opening lines and tonal hooks for short fiction.',
    targetAudience: 'Fiction authors, creative writing teachers, flash fiction writers.',
    defaultEntries: [
      '"The sirens didn\'t sound until the river had already turned violet."',
      '"Nobody in our town ever spoke about the door beneath the chapel floor."',
      '"I had three hours left before the auction of my memories began."',
      '"It started with a harmless bet behind the stadium bleachers."',
      '"The doctor promised the replacement heart would feel completely natural."',
      '"There were seven rules for surviving the night shift at the lighthouse."'
    ],
    category: 'CREATIVITY & WRITING',
    instructions: 'Spin to receive your mandatory opening sentence. Use it word-for-word as Line 1.',
    optionalModes: ['Flash Fiction (500 Words)', 'First Person vs Third Person Viewpoint'],
    relatedWheels: ['Writing Prompt Wheel', 'Character Name Wheel', 'Book Wheel'],
    relatedTools: ['First Line Word Counter', 'Drafting Scratchpad'],
    difficulty: 'Easy',
    shareableResultConcept: 'First Edition Book Cover banner featuring the dramatic opening line.',
    uniqueValueProposition: 'Gives writers an immediate launchpad sentence to overcome the terror of the blank page.',
    paletteKey: 'casino'
  },
  {
    id: 'art-drawing-prompt-wheel',
    name: 'Art & Drawing Prompt Wheel',
    purpose: 'Inspire daily sketchbook exercises, concept art warmups, and digital illustration challenges.',
    targetAudience: 'Illustrators, Inktober participants, concept artists, digital painters.',
    defaultEntries: [
      'A futuristic street food vendor serving glowing ramen under neon rain',
      'An ancient overgrown golem resting inside a sunlit mossy grove',
      'A Victorian deep-sea explorer discovering bioluminescent ruins',
      'A tiny wizard preparing coffee inside a giant pumpkin cottage',
      'A cybernetic animal scouting across a rust-covered desert landscape',
      'A celestial creature weaving starlight across night clouds'
    ],
    category: 'CREATIVITY & WRITING',
    instructions: 'Spin and spend 20 minutes sketching without erasing. Focus on silhouette and mood.',
    optionalModes: ['20-Minute Speed Paint', 'Ink Only (Zero Pencil Sketching)', 'Limited 3-Color Palette'],
    relatedWheels: ['Color Wheel', 'Character Wheel', 'Creativity Prompt Wheel'],
    relatedTools: ['Color Palette Harmony Linker', 'Speed Sketch Timer'],
    difficulty: 'Medium',
    shareableResultConcept: 'Artist Sketchbook Badge featuring prompt and palette swatch.',
    uniqueValueProposition: 'Combines evocative world-building subject matter with strong lighting cues.',
    paletteKey: 'vibrant'
  },
  {
    id: 'poetry-meter-wheel',
    name: 'Poetry Form & Meter Wheel',
    purpose: 'Challenge poets with diverse classical and experimental poetic forms and syllable constraints.',
    targetAudience: 'Poets, spoken word performers, English literature classrooms.',
    defaultEntries: ['Traditional 5-7-5 Japanese Haiku', 'Shakespearean 14-Line Sonnet', 'Villanelle with Repeating Refrains', 'Vivid Sensory Free Verse', 'Limerick with Punchline Rhyme', 'Ode to an Ordinary Everyday Object', 'Ghazal with Couplets & Refrain', 'Ekphrastic Poem based on a Painting'],
    category: 'CREATIVITY & WRITING',
    instructions: 'Spin to lock in your poetic constraint. Compose a poem adhering strictly to the form rules.',
    optionalModes: ['Timed 10-Minute Rhyme Sprint', 'Strict Syllable Count Only'],
    relatedWheels: ['Writing Prompt Wheel', 'Music Wheel', 'Book Wheel'],
    relatedTools: ['Rhyme & Syllable Counter', 'Poetry Meter Analyzer'],
    difficulty: 'Challenging',
    shareableResultConcept: 'Poet\'s Quill Certificate honoring structured verse composition.',
    uniqueValueProposition: 'Educates and challenges writers across classical forms from haikus to villanelles.',
    paletteKey: 'emerald'
  },
  {
    id: 'songwriting-theme-wheel',
    name: 'Songwriting Theme Wheel',
    purpose: 'Break musician block with fresh chord progressions, lyrical themes, and tempo dynamics.',
    targetAudience: 'Songwriters, indie producers, acoustic guitarists, beatmakers.',
    defaultEntries: [
      'Nostalgic Road Trip Memory (Mid-Tempo Acoustic Folk)',
      'Sudden Midnight Epiphany (Minor Key Neo-Soul)',
      'Unspoken Betrayal / Secret (Dramatic Indie Rock Crescendo)',
      'Euphoric Summer Festival Escape (High-BPM Electronic Pop)',
      'Long-Distance Yearning in Rain (Atmospheric Lo-Fi Ballad)',
      'Defiant Underdog Anthem (Driving Rhythm with Heavy Bass)'
    ],
    category: 'CREATIVITY & WRITING',
    instructions: 'Spin with instrument in hand. Spend 30 minutes finding the primary chorus progression and hook.',
    optionalModes: ['BPM Randomizer Link', 'Acoustic vs Synth Focus', 'Bridge Writing Sprint'],
    relatedWheels: ['Music Wheel', 'Writing Prompt Wheel', 'Audio Sample Wheel'],
    relatedTools: ['Chord Progression Chart', 'BPM Tap Metronome'],
    difficulty: 'Medium',
    shareableResultConcept: 'Studio Session Lead Sheet card stamped with tempo, key, and lyrical motif.',
    uniqueValueProposition: 'Integrates emotional lyrical themes directly with musical genre cues.',
    paletteKey: 'arcade'
  },
  {
    id: 'creativity-prompt-wheel',
    name: 'Creativity Prompt Wheel',
    purpose: 'Spur out-of-the-box creative thinking for inventors, product designers, and lateral thinkers.',
    targetAudience: 'Design thinking facilitators, creative directors, innovation teams.',
    defaultEntries: [
      'Invert the Problem: How could we make this experience 10x worse first?',
      'Analog Constraint: Redesign this modern service using only paper and stamps',
      'Child\'s Perspective: How would an 8-year-old solve this challenge playfully?',
      'Extreme Minimalism: Strip away 80% of current features—what remains?',
      'Nature\'s Biomimicry: How does an ant colony or forest canopy handle this?',
      'Zero Budget Reality: Solve the core problem using existing scrap materials'
    ],
    category: 'CREATIVITY & WRITING',
    instructions: 'Spin when ideation hits a wall during product sprints or creative brainstorms.',
    optionalModes: ['SCAMPER Technique Mode', 'Biomimicry Focus', '5-Minute Rapid Ideation'],
    relatedWheels: ['Writing Prompt Wheel', 'Color Wheel', 'Task Picker'],
    relatedTools: ['Brainstorm Sticky Note Board', 'Lateral Thinking Timer'],
    difficulty: 'Challenging',
    shareableResultConcept: 'Innovation Breakthrough Pass highlighting the lateral thinking prompt.',
    uniqueValueProposition: 'Rooted in proven TRIZ and lateral thinking design methodologies.',
    paletteKey: 'vibrant'
  },

  // ==========================================
  // 14. PRODUCTIVITY & HABITS (5 experiences)
  // ==========================================
  {
    id: 'pomodoro-break-wheel',
    name: 'Pomodoro Break Wheel',
    purpose: 'Transform sedentary 5-minute work breaks into invigorating physical and mental resets.',
    targetAudience: 'Desk workers, software engineers, writers experiencing screen fatigue.',
    defaultEntries: [
      'Do 20 Full-Body Squats & Shoulder Rolls',
      'Look Out the Window at Far Horizon (20-20-20 Rule)',
      'Drink a Full 300ml Glass of Cold Water',
      'Step Outside and Take 10 Deep Breaths of Fresh Air',
      'Wipe Down Desk Surface & Clean Eyeglasses',
      'Brief 5-Minute Eyes-Closed Mindful Silence'
    ],
    category: 'PRODUCTIVITY & HABITS',
    instructions: 'Spin immediately when your 25-minute Pomodoro timer dings. Strictly avoid checking social media.',
    optionalModes: ['5-Minute Express Break', '15-Minute Long Break Extension', 'Silent Stretching Only'],
    relatedWheels: ['Task Picker', 'Workout Wheel', 'Mindfulness Wheel'],
    relatedTools: ['Pomodoro 25/5 Timer Clock', 'Posture Alignment Guide'],
    difficulty: 'Easy',
    shareableResultConcept: 'Recharge Energy Pass with eye health and hydration checkmarks.',
    uniqueValueProposition: 'Prevents screen-based break traps (Twitter/Reddit) by mandating physical movement.',
    paletteKey: 'emerald'
  },
  {
    id: 'habit-streak-wheel',
    name: 'Habit Streak Wheel',
    purpose: 'Reinforce daily positive micro-habits with gamified streak rewards and bonus spins.',
    targetAudience: 'Atomic habits practitioners, individuals building consistent routines.',
    defaultEntries: [
      'Read 10 Pages of Non-Fiction Book',
      'Floss Teeth & Complete Skincare Routine',
      'Write 3 Specific Gratitude Bullet Points',
      'Make Bed & Tidy Nightstand Immediately',
      'Zero Social Media Before 9:00 AM Tomorrow',
      'Log All Expenses for Today Accurately',
      'Hit 8,000 Steps on Daily Pedometer',
      'Send One Encouraging Message to a Colleague'
    ],
    category: 'PRODUCTIVITY & HABITS',
    instructions: 'Spin every evening at 8 PM to select your focal habit anchor for the following day.',
    optionalModes: ['Morning Anchor vs Evening Anchor', 'Streak Counter Integration'],
    relatedWheels: ['Daily Challenge Wheel', 'Task Picker', 'Mindfulness Wheel'],
    relatedTools: ['Daily Habit Tracker Calendar', 'Streak Counter Ledger'],
    difficulty: 'Medium',
    shareableResultConcept: 'Habit Milestone Streak Badge displaying consecutive days completed.',
    uniqueValueProposition: 'Focuses on 2-minute micro-habits that build compounding identity momentum.',
    paletteKey: 'pastel'
  },
  {
    id: 'declutter-wheel',
    name: 'Declutter Wheel',
    purpose: 'Overcome home clutter overwhelm with focused 10-minute micro-organization targets.',
    targetAudience: 'Homeowners, minimalists, busy parents looking to regain control of spaces.',
    defaultEntries: [
      'Pantry Snack Shelves & Expired Cans',
      'Bathroom Medicine Cabinet & Old Bottles',
      'Nightstand Drawers & Tangled Charging Cords',
      'Junk Drawer in the Kitchen',
      'Winter Coat Closet & Orphaned Gloves',
      'Car Center Console & Door Pockets',
      'Bookshelf & Magazine Stacks',
      'Desktop Computer Downloads & Trash Bin'
    ],
    category: 'PRODUCTIVITY & HABITS',
    instructions: 'Spin once on Saturday morning. Set a timer for 10 minutes and declutter only that zone.',
    optionalModes: ['10-Minute Blitz Timer', 'Toss / Donate / Keep Sorting', 'Room by Room'],
    relatedWheels: ['Chore Picker', 'Task Picker', 'Weekend Picker'],
    relatedTools: ['10-Minute Blitz Countdown Clock', 'Donation Box Checklist'],
    difficulty: 'Medium',
    shareableResultConcept: 'Declutter Victor Medal with before/after zone verification.',
    uniqueValueProposition: 'Replaces exhausting day-long cleanouts with bite-sized, high-dopamine sprints.',
    paletteKey: 'arcade'
  },
  {
    id: 'digital-detox-wheel',
    name: 'Digital Detox Wheel',
    purpose: 'Unplug intentionally from smartphones and algorithmic notifications without feeling disconnected.',
    targetAudience: 'Screen-addicted professionals, parents modeling tech-free family time.',
    defaultEntries: [
      'Turn Phone Screen to Grayscale for 24 Hours',
      'Charge Phone in Another Room Overnight (No Bedside Phone)',
      'Airplane Mode from 7:00 PM Until Tomorrow Morning',
      'Go on a 45-Minute Walk with Zero Headphones or Phone',
      'Delete or Hide Top 2 Most Time-Wasting Social Apps for Weekend',
      'Eat All Meals Today with Phones Placed Face-Down in a Basket'
    ],
    category: 'PRODUCTIVITY & HABITS',
    instructions: 'Spin on Sunday evening to choose your digital wellness challenge for the week.',
    optionalModes: ['Weekend Unplugged Mode', 'Evening 2-Hour Window', 'Screen Grayscale Toggle'],
    relatedWheels: ['Mindfulness Wheel', 'Book Wheel', 'What Should I Do?'],
    relatedTools: ['Screen Time Reduction Tracker', 'Analog Activity Guide'],
    difficulty: 'Challenging',
    shareableResultConcept: 'Digital Detox Master Badge certifying hours reclaimed from screens.',
    uniqueValueProposition: 'Actionable micro-boundaries that don\'t require moving off-grid to be effective.',
    paletteKey: 'casino'
  },
  {
    id: 'evening-routine-wheel',
    name: 'Evening Routine Wheel',
    purpose: 'Wind down your central nervous system for deep, restorative REM and slow-wave sleep.',
    targetAudience: 'Insomniacs, anxious sleepers, high-stress executives needing evening peace.',
    defaultEntries: [
      'Sip Warm Chamomile Tea by Soft Lamp Light',
      'Write Tomorrow\'s Top 3 Priorities on Paper to Empty Mind',
      '10 Minutes of Gentle Leg-Up-the-Wall Yoga Pose',
      'Listen to Ambient Rain Sounds / Ocean Waves',
      'Read 20 Minutes of a Physical Paper Book (No Blue Light)',
      'Take a Warm Shower with Lavender Soap',
      'Write Down 3 Wins from Today in a Journal',
      'Dim All Overhead Lights to Low Warm Accent Lighting'
    ],
    category: 'PRODUCTIVITY & HABITS',
    instructions: 'Spin 60 minutes before bedtime to anchor your wind-down ritual.',
    optionalModes: ['Sleep Hygiene Checklist', 'Blue Light Lockdown Mode', 'Anxiety Dump Sprint'],
    relatedWheels: ['Mindfulness Wheel', 'Rest Day Decision Wheel', 'Breakfast Wheel'],
    relatedTools: ['Sleep Hygiene Countdown', 'Blue Light Filter Reminder'],
    difficulty: 'Easy',
    shareableResultConcept: 'Sweet Dreams Sleep Pass with restorative sleep intention.',
    uniqueValueProposition: 'Grounded in clinical circadian rhythm science to optimize sleep onset.',
    paletteKey: 'pastel'
  }
];
