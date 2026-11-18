import { SeoPageData } from './seoArchitecture';

export const EXTENDED_PILLARS_SEO: Record<string, SeoPageData> = {
  workout: {
    slug: 'workout',
    fullPath: '/workout',
    pageType: 'category',
    title: 'Workout Wheels – HIIT Circuits, Tabata & Gym Spinners',
    metaDescription:
      'Break training plateaus with interactive Workout Wheels. Spin randomized HIIT intervals, bodyweight calisthenics, EMOM timers, and desk mobility breaks.',
    h1: 'Workout Wheels: Random HIIT, Tabata & Bodyweight Circuit Spinners',
    introduction:
      'Break through fitness plateaus and pre-workout hesitation with randomized high-intensity training circuits. Whether you are working out in a small apartment without equipment, leading a high-energy group bootcamp, or looking for 60-second desk mobility breaks, our workout wheels provide biomechanically balanced intervals.',
    primaryIntent: 'sports',
    secondaryIntents: ['educational', 'transactional/use tool'],
    categoryKey: 'workout',
    parentCategoryPath: '/',
    parentCategoryName: 'Home',
    featureBadges: [
      'Zero Equipment Options',
      'HIIT & EMOM Circuit Ready',
      'Custom Reps & Interval Sets',
      'Web Crypto CSPRNG',
      '100% Free'
    ],
    defaultWheelData: {
      title: 'Quick Workout Spinner',
      description: 'Random exercise circuit selector',
      paletteKey: 'neon',
      items: [
        { id: 'wo-1', text: '15 Burpees', weight: 1 },
        { id: 'wo-2', text: '25 Bodyweight Squats', weight: 1 },
        { id: 'wo-3', text: '60-Sec Forearm Plank', weight: 1 },
        { id: 'wo-4', text: '30 Mountain Climbers', weight: 1 },
        { id: 'wo-5', text: '15 Push-Ups', weight: 1 },
        { id: 'wo-6', text: '20 Alternating Lunges', weight: 1 },
        { id: 'wo-7', text: '45-Sec Isometric Wall Sit', weight: 1 },
        { id: 'wo-8', text: '20 Glute Bridges', weight: 1 }
      ]
    },
    instructions: [
      'Complete a 3-minute dynamic joint warm-up before spinning your first high-intensity interval.',
      'Select your training format: an 8-spin Elimination circuit or a 16-minute EMOM (Every Minute on the Minute).',
      'Perform the winning exercise for 40 seconds of work followed by 20 seconds of rest and spinning.',
      'Enable Elimination mode to cycle through upper push, lower hinge, core, and cardio stations without repeats.'
    ],
    whoItsUsefulFor: [
      {
        audience: 'Home & Garage Gym Athletes',
        benefit: 'Adds gamified structure and unpredictability to bodyweight and dumbbell sessions without subscription apps.'
      },
      {
        audience: 'Personal Trainers & PE Teachers',
        benefit: 'Brings high-energy station rotations and team finishers to group classes on a shared tablet.'
      },
      {
        audience: 'Remote Workers & Desk Professionals',
        benefit: 'Provides rapid 60-second movement snacks between video meetings to restore posture and focus.'
      }
    ],
    useCases: [
      {
        title: '1. 16-Minute Living Room Tabata & HIIT Circuit',
        benefit: 'Spin every 60 seconds (40s work / 20s rest) across 8 balanced bodyweight movements.',
        description:
          'Slices: 20 Jump Squats, 15 Push-Ups, 60s Plank, 12 Burpees, 20 Lunges, 30 Mountain Climbers, 15 Tricep Dips, 45s Wall Sit.'
      },
      {
        title: '2. Core & Ab Finisher Roulette (5 Minutes)',
        benefit: 'End strength sessions with 5 consecutive 45-second core movements in Elimination mode.',
        description:
          'Slices: Forearm Plank, Russian Twists, Dead Bugs, Hollow Body Hold, Bicycle Crunches, Side Plank Left & Right.'
      },
      {
        title: '3. Hourly WFH Desk Mobility & Posture Reset',
        benefit: 'Spin once every hour for no-sweat stretching and joint decompression.',
        description:
          'Slices: 15 Desk Push-Ups, 20 Air Squats, 45s Doorway Pec Stretch, 10 Thoracic Windmills, 20 Calf Raises, 30s Wall Angels.'
      },
      {
        title: '4. Kettlebell & Dumbbell Conditioning EMOM',
        benefit: 'Combines loaded compound lifts with unpredictable metabolic sequencing.',
        description:
          'Slices: 15 Kettlebell Swings, 10 Goblet Squats, 8 Dumbbell Thrusters, 12 Renegade Rows, 10 Romanian Deadlifts, 40m Farmer Carry.'
      }
    ],
    customizationOptions: [
      {
        title: 'Time vs. Rep Scaling',
        description: 'Label slices with 40-second timed intervals or fixed rep targets (12–25 reps) to fit any fitness level.'
      },
      {
        title: 'Elimination Station Mode',
        description: 'Remove each exercise as completed so every muscle group is hit once per round.'
      }
    ],
    resultExplanation:
      'All workout selections utilize cryptographically secure uniform random seeds (window.crypto.getRandomValues) to prevent cherry-picking and eliminate skip bias.',
    uniqueExamples: [
      '2-2-2-2 Full-Body Balance Deck: 15 Push-Ups, 12 Inverted Rows, 25 Squats, 20 Lunges, 60s Plank, 20 Dead Bugs, 15 Burpees, 30 Mountain Climbers.',
      'Quiet Upstairs Apartment Preset: 15 Slow-Tempo Squats, 12 Pause Push-Ups, 60s Plank, 20 Glute Bridges, 16 Reverse Lunges, 45s Wall Sit (Zero jumping).'
    ],
    tips: [
      'Always warm up dynamic joints (hips, shoulders, ankles) for 3 minutes before starting randomized intervals.',
      'Use Elimination mode for your first 8 spins so you never draw three pushing movements in a row.',
      'Add one "60-Second Active Recovery Walk & Nasal Breathing" slice to regulate heart rate during 20-minute sessions.',
      'Pair with our 1-10 Number Wheel (/1-10-wheel) to randomize rep multipliers alongside your exercise pick.'
    ],
    uniqueContentBlocks: [
      {
        heading: 'When, Why, and How Exercise Randomization Breaks Training Plateaus',
        body: [
          'The human neuromuscular system adapts rapidly to predictable routines. When you perform the exact same three exercises in the same sequence every week, both metabolic output and mental engagement drop—and athletes subconsciously skip movements they dislike, such as unilateral lunges or isometric holds.',
          'By structuring an 8-slice wheel around fundamental movement patterns (upper push, upper pull, knee hinge, hip hinge, anti-extension core, and cardio) and enabling Elimination mode, every round delivers a complete full-body stimulus while keeping your brain locked into the excitement of the next spin.'
        ]
      },
      {
        heading: 'Choosing the Right Fitness Wheel in This Hub',
        body: [
          'Start with our flagship Workout Wheel (/workout-wheel) for high-energy HIIT and Tabata intervals. If you train in a second-floor apartment where jumping is off-limits, launch the Home Workout Wheel (/home-workout-wheel), or use the Exercise Wheel (/exercise-wheel) for 60-second office movement snacks and school PE warm-ups.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Are randomized workout wheels safe and balanced for beginners?',
        answer:
          'Yes! Unlike random card decks that can deal four chest exercises in a row, turning on Elimination mode with a balanced 8-slice preset guarantees you work upper body, lower body, and core evenly. You can swap any movement for a low-impact regression in seconds.'
      },
      {
        question: 'Can I use these wheels for timed Tabata or EMOM intervals?',
        answer:
          'Absolutely. Set a repeating 60-second EMOM timer (40 seconds of work, 20 seconds of rest) and tap the Spacebar during the 20-second recovery window to draw your next station.'
      },
      {
        question: 'How do I remove high-impact jumping exercises for bad knees or apartments?',
        answer:
          'Open the Entries sidebar on any workout wheel to toggle off burpees or jump squats and replace them with slow-tempo squats, glute bridges, and isometric wall sits—or jump directly to our quiet Home Workout Wheel (/home-workout-wheel).'
      },
      {
        question: 'Do my custom gym routines save on my phone?',
        answer:
          'Yes. Any custom exercise list you enter is automatically stored in your browser localStorage so it is ready whenever you arrive at the gym.'
      }
    ],
    relatedTools: [
      { name: 'Workout Wheel', path: '/workout-wheel', description: 'Flagship HIIT & interval circuit generator.' },
      { name: 'Home Workout Wheel', path: '/home-workout-wheel', description: 'Quiet, zero-equipment apartment routines.' },
      { name: 'Exercise Wheel', path: '/exercise-wheel', description: '60-second desk mobility & PE warm-up spinner.' }
    ],
    relatedWheels: [
      { name: 'Workout Wheel', path: '/workout-wheel', count: 8 },
      { name: 'Home Workout Wheel', path: '/home-workout-wheel', count: 8 }
    ],
    relatedGuides: [
      { name: 'How Random Wheels Work', path: '/how-random-wheels-work', readingTime: '6 min' }
    ],
    internalLinks: [
      { label: 'Launch Flagship Workout Wheel', href: '/workout-wheel', context: 'Full-body HIIT spinner.' },
      { label: 'Quiet Home Workout Wheel', href: '/home-workout-wheel', context: 'Apartment-friendly routines.' }
    ],
    breadcrumbs: [
      { name: 'Home', item: 'https://spinwheelgames.org/' },
      { name: 'Workout & Fitness', item: 'https://spinwheelgames.org/workout' }
    ]
  },

  travel: {
    slug: 'travel',
    fullPath: '/travel',
    pageType: 'category',
    title: 'Travel Wheels – Vacation, Road Trip & Getaway Pickers',
    metaDescription:
      'Break vacation planning paralysis with Travel Wheels. Spin random weekend getaways, road trip detours, national parks, and bucket-list destinations.',
    h1: 'Travel Wheels: Random Vacation, Road Trip & Weekend Getaway Pickers',
    introduction:
      'Cure vacation planning paralysis and stop debating where to book your next flight or weekend drive. When couples or friend groups spend weeks comparing 20 different cities until flight prices spike, placing your top 6 budget-approved destinations on a Travel Wheel turns indecision into an instant itinerary.',
    primaryIntent: 'decision',
    secondaryIntents: ['entertainment', 'transactional/use tool'],
    categoryKey: 'travel',
    parentCategoryPath: '/',
    parentCategoryName: 'Home',
    featureBadges: [
      'Weekend Getaway Shortlists',
      'Road Trip Detour Game',
      'Bucket-List Destination Draw',
      'Web Crypto CSPRNG',
      '100% Free'
    ],
    defaultWheelData: {
      title: 'Global Destination Picker',
      description: 'Discover your next adventure',
      paletteKey: 'vibrant',
      items: [
        { id: 'tr-1', text: 'Kyoto & Tokyo, Japan', weight: 1 },
        { id: 'tr-2', text: 'Amalfi Coast & Rome, Italy', weight: 1 },
        { id: 'tr-3', text: 'Ring Road, Iceland', weight: 1 },
        { id: 'tr-4', text: 'Lisbon & Porto, Portugal', weight: 1 },
        { id: 'tr-5', text: 'Oaxaca & Mexico City', weight: 1 },
        { id: 'tr-6', text: 'Banff National Park, Canada', weight: 1 }
      ]
    },
    instructions: [
      'Filter your candidate destinations first by shared constraints: flight budget, drive time (e.g., under 3 hours), and climate.',
      'Have each travel partner nominate 2 or 3 qualifying destinations onto the wheel.',
      'Spin the wheel together and commit to researching flights or booking lodging for the winning slice within 24 hours.',
      'Use Elimination mode across the year to check off every local weekend day-trip on your regional bucket list.'
    ],
    whoItsUsefulFor: [
      {
        audience: 'Couples & Friend Travel Groups',
        benefit: 'Breaks destination stalemates where everyone wants a trip but nobody can agree on the city.'
      },
      {
        audience: 'Saturday Road Trip Explorers',
        benefit: 'Selects spontaneous small-town diner stops, scenic overlooks, and state parks within a 2-hour drive.'
      },
      {
        audience: 'Solo Digital Nomads',
        benefit: 'Chooses the next 30-day remote work base from pre-vetted high-Wi-Fi cities.'
      }
    ],
    useCases: [
      {
        title: '1. The 3-Hour Drive Weekend Getaway Wheel',
        benefit: 'Load 6 charming towns, beaches, or mountain cabins within a 180-minute radius for Friday departures.',
        description:
          'Slices: Coastal Beach Town, Mountain Cabin Trailhead, Historic Wine Country Valley, Lakefront Kayak Rental, University Art Town, Botanic & Hot Springs Resort.'
      },
      {
        title: '2. Annual Friends Trip Nomination Lottery',
        benefit: 'Let 4 friends each nominate 1 budget-vetted city and spin live on FaceTime.',
        description:
          'Slices: Lisbon, Montreal, San Juan, Austin, Medellín, Dublin, Reykjavik, New Orleans.'
      },
      {
        title: '3. Sunday "Compass Direction & Miles" Micro-Adventure',
        benefit: 'For spontaneous day trips: spin a compass direction and stop at the first local diner or park.',
        description:
          'Slices: 45 Miles North (State Park), 30 Miles East (Historic Downtown), 40 Miles South (Waterfront Trail), 35 Miles West (Farm Stand & Cidery).'
      },
      {
        title: '4. National Park Summer Road Trip Selector',
        benefit: 'Prioritize your annual outdoors pass across top hiking destinations.',
        description:
          'Slices: Zion & Bryce Canyon, Yellowstone & Grand Teton, Yosemite, Acadia, Olympic Peninsula, Great Smoky Mountains.'
      }
    ],
    customizationOptions: [
      {
        title: 'Budget-Matched Shortlists',
        description: 'Group only destinations with similar airfare and hotel costs on the same wheel.'
      },
      {
        title: 'Weighted Bucket-List Odds',
        description: 'Give a dream destination a 2x weight multiplier if it is currently in peak shoulder season.'
      }
    ],
    resultExplanation:
      'Browser Web Crypto API draws guarantee every destination on your shortlist has an unbiased mathematical chance.',
    uniqueExamples: [
      'European Shoulder-Season Shortlist: Lisbon, Prague, Budapest, Seville, Edinburgh, Ljubljana.',
      'Day-Trip Activity Wheel: Scenic Waterfall Hike, Ferry Ride to Nearby Island, Small-Town Antique & Bakery Crawl, Botanical Garden & Art Museum, Bike Trail & Brewery.'
    ],
    tips: [
      'Never put a $4,000 international flight on the same wheel as a $150 local camping trip—only spin destinations from the same budget tier.',
      'Check Google Flights price alerts for 6 cities first, then load only the 4 cities with active flight deals onto the wheel.',
      'Use the "Groan Test": if the wheel lands on a city and you feel disappointed, delete it and spin the remaining contenders!'
    ],
    uniqueContentBlocks: [
      {
        heading: 'When, Why, and How to Use a Travel Wheel to Beat Booking Paralysis',
        body: [
          'Travel industry surveys show that travelers frequently open 30+ browser tabs comparing hotels and flights across five different regions, only to abandon booking entirely due to cognitive overload. Once a group has verified that six destinations fit their budget and passport requirements, further comparison yields diminishing returns.',
          'Spinning a Travel Wheel cuts through the final mile of hesitation. Because every person in the travel group contributed slices to the wheel, the winning destination carries instant group buy-in—allowing you to shift immediately from debating *where* to go to planning great meals and excursions.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How do we make sure the Travel Wheel doesn’t pick an overpriced destination?',
        answer:
          'Always filter by budget before you spin! Only add destinations to the wheel that you have already verified fit your flight and hotel budget for those travel dates.'
      },
      {
        question: 'What is a "Compass & Radius" road trip spin?',
        answer:
          'Load slices like "1 Hour North", "1 Hour South-East", "45 Mins West", and "Coastal Highway" onto the wheel. Spin on Sunday morning, drive in that direction, and explore the first scenic state park or local café you find.'
      },
      {
        question: 'Can we save our annual travel bucket list on the wheel?',
        answer:
          'Yes. Load 10 bucket-list destinations into the wheel, turn on Elimination mode, and your browser will remember which spots you have already visited.'
      },
      {
        question: 'Can I share our custom destination wheel with friends in a group chat?',
        answer:
          'Yes! Use the Share button in the tool workspace to generate a custom link containing your exact destination shortlist for your travel group.'
      }
    ],
    relatedTools: [
      { name: 'Road Trip Wheel', path: '/road-trip-wheel', description: 'Spontaneous highway detours & car games.' },
      { name: 'Date Night Wheel', path: '/date-night-wheel', description: 'Local evening outings for couples.' },
      { name: 'Decision Wheel', path: '/decision-wheel', description: 'General multi-option choice spinner.' }
    ],
    relatedWheels: [
      { name: 'Road Trip Wheel', path: '/road-trip-wheel', count: 8 },
      { name: 'Weekend Activity Wheel', path: '/weekend-activity-wheel', count: 8 }
    ],
    relatedGuides: [
      { name: 'How to Use a Wheel for Decisions', path: '/how-to-use-a-wheel', readingTime: '4 min' }
    ],
    internalLinks: [
      { label: 'Try Road Trip Wheel', href: '/road-trip-wheel', context: 'Highway stops and games.' },
      { label: 'Weekend Activity Wheel', href: '/weekend-activity-wheel', context: 'Local weekend plans.' }
    ],
    breadcrumbs: [
      { name: 'Home', item: 'https://spinwheelgames.org/' },
      { name: 'Travel & Exploration', item: 'https://spinwheelgames.org/travel' }
    ]
  },

  creativity: {
    slug: 'creativity',
    fullPath: '/creativity',
    pageType: 'category',
    title: 'Creativity Wheels – Art, Sketch & Writing Prompt Spinners',
    metaDescription:
      'Defeat writer’s block and blank-canvas syndrome. Spin Creativity Wheels for daily sketching subjects, flash fiction prompts, plot twists, and color constraints.',
    h1: 'Creativity & Writing Wheels: Art Prompts, Plot Twists & Story Starters',
    introduction:
      'Conquer the intimidating blank page or empty Procreate canvas in seconds. Writers, illustrators, concept artists, and tabletop RPG designers encounter creative stagnation when given infinite freedom. Our creativity wheels introduce unexpected subject pairings, genre constraints, and plot pivots that spark immediate original work.',
    primaryIntent: 'educational',
    secondaryIntents: ['entertainment', 'transactional/use tool'],
    categoryKey: 'creativity',
    parentCategoryPath: '/',
    parentCategoryName: 'Home',
    featureBadges: [
      'Story Starters & Plot Twists',
      'Daily Sketchbook Prompts',
      'Character & Worldbuilding',
      'Web Crypto CSPRNG',
      '100% Free'
    ],
    defaultWheelData: {
      title: 'Art & Writing Prompt Wheel',
      description: 'Lateral thinking prompt engine',
      paletteKey: 'pastel',
      items: [
        { id: 'cr-1', text: 'Cyberpunk Detective in Victorian Fog', weight: 1 },
        { id: 'cr-2', text: 'A Sentient Clockwork Botanist', weight: 1 },
        { id: 'cr-3', text: 'Submerged Sunken Cathedral Library', weight: 1 },
        { id: 'cr-4', text: 'The Last Alchemist on a Desert Moon', weight: 1 },
        { id: 'cr-5', text: 'A Memory Merchant Who Loses Their Past', weight: 1 },
        { id: 'cr-6', text: 'Bioluminescent Night Market in the Treetops', weight: 1 },
        { id: 'cr-7', text: 'Cozy Apothecary Run by a Retired Dragon', weight: 1 },
        { id: 'cr-8', text: 'Time-Loop aboard an Art Deco Express Train', weight: 1 }
      ]
    },
    instructions: [
      'Spin once to lock in your core visual subject, character archetype, or narrative premise.',
      'Optionally spin a second constraint (such as a 3-color palette limit or a specific emotional mood).',
      'Start a 15- or 20-minute timer immediately—do not permit yourself to re-spin if the prompt feels challenging.',
      'Turn on Elimination mode across a 30-day drawing or writing challenge so you never repeat a prompt.'
    ],
    whoItsUsefulFor: [
      {
        audience: 'Illustrators & Sketchbook Artists',
        benefit: 'Provides daily warm-up drawing subjects that combine unexpected textures, eras, and environments.'
      },
      {
        audience: 'Novelists, Screenwriters & DMs',
        benefit: 'Generates sudden narrative complications, NPC quirks, and scene hooks when a draft stalls.'
      },
      {
        audience: 'English & Art Classroom Teachers',
        benefit: 'Launches 10-minute bell-ringer creative writing sprints or studio warm-ups on the projector.'
      }
    ],
    useCases: [
      {
        title: '1. The Two-Spin "Subject + Constraint" Art Challenge',
        benefit: 'Pair an environment/character prompt with a medium or color constraint to force original composition.',
        description:
          'Spin 1 (Subject): Floating Sky Bakery, Clockwork Owl, Ancient Mech Overgrown with Moss. Spin 2 (Constraint): 2 Complementary Colors Only, Continuous Line Ink, High-Contrast Noir Lighting.'
      },
      {
        title: '2. 15-Minute Flash Fiction & Scene Starter Sprint',
        benefit: 'Write 250 words without hitting backspace using a randomized inciting incident.',
        description:
          'Slices: An unopened letter arrives 40 years late, The ship’s AI refuses to open the airlock, Two strangers realize they share the same dream, A house has one more room than yesterday.'
      },
      {
        title: '3. Dungeons & Dragons / RPG Tavern & NPC Quirks',
        benefit: 'Game Masters spin instant traits when players interrogate an unplanned background character.',
        description:
          'Slices: Speaks only in overly formal riddles, Secretly owes money to the thieves guild, Collects cursed trinkets, Recently survived a shipwreck, Mistakenly believes the party are tax collectors.'
      },
      {
        title: '4. Songwriting & Beatmaking Genre/Mood Fusion',
        benefit: 'Musicians spin unexpected tempo, instrumentation, or lyrical themes to break production habits.',
        description:
          'Slices: Lo-Fi Rhodes + Rain Foley, Upbeat 80s Synthwave in 3/4 Time, Acoustic Folk with Sci-Fi Lyrics, Funk Bassline + Melancholic Vocals.'
      }
    ],
    customizationOptions: [
      {
        title: 'Custom Medium & Palette Slices',
        description: 'Load your own art supplies (gouache, charcoal, watercolor, pixel art, 3D blender sculpt) onto the wheel.'
      },
      {
        title: '30-Day Challenge Elimination',
        description: 'Load 30 prompts on Day 1 and eliminate one slice per day for a full month of creative output.'
      }
    ],
    resultExplanation:
      'Cryptographic randomization breaks habitual neural pathways by forcing your imagination to bridge two unrelated concepts.',
    uniqueExamples: [
      'Plot Twist Slices: The trusted mentor orchestrated the heist, The magical artifact is actually a containment cell, The protagonist is reading their own erased diary, The rescue ship is unmanned.',
      'Drawing Subject Slices: Steampunk Greenhouse, Ghost Barista on a Night Shift, Miniature City Inside a Terrarium, Samurai Astronaut at a Ramen Stall.'
    ],
    tips: [
      'Enforce the "First Spin Sacred" rule: creative breakthroughs happen when you figure out how to solve an awkward prompt rather than re-spinning for an easy cliché.',
      'Combine two spins at once ("Combine Slice A + Slice B into a single illustration") for truly one-of-a-kind concept art.'
    ],
    uniqueContentBlocks: [
      {
        heading: 'Lateral Divergence: Why Creative Constraints Beat Infinite Freedom',
        body: [
          'Cognitive psychologists studying creative problem-solving have repeatedly demonstrated that total freedom ("draw anything you want") paralyzes working memory because the brain must simultaneously generate and evaluate thousands of possibilities.',
          'When a spinning wheel hands you a specific, non-negotiable anchor—such as "A Submerged Sunken Cathedral Library"—your inner critic steps aside and your visual cortex immediately begins assembling lighting, silhouettes, and story details.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How do I use a creativity wheel to beat writer’s block or art block?',
        answer:
          'Set a strict 15-minute timer, spin the wheel once, and commit to sketching thumbnails or drafting a single scene based on the very first slice that lands. Removing the option to re-spin silences perfectionism.'
      },
      {
        question: 'Can I combine two spins to create mashup prompts?',
        answer:
          'Yes! Many concept artists spin twice and fuse the two winning slices together (for example, combining "Bioluminescent Forest" with "Cyberpunk Detective") to invent original worldbuilding concepts.'
      },
      {
        question: 'Can teachers use these wheels for daily classroom bell-ringers?',
        answer:
          'Absolutely. Project the Writing Prompt Wheel or Drawing Prompts Wheel on the smartboard at the start of class with Elimination mode enabled so students get a fresh 5-minute warm-up every school day.'
      },
      {
        question: 'Can I paste my own Inktober or NaNoWriMo prompt list?',
        answer:
          'Yes. Open the Entries panel and bulk-paste up to 100 custom prompts. Your list saves in your browser so you can eliminate one prompt each day of the month.'
      }
    ],
    relatedTools: [
      { name: 'Drawing Prompts Wheel', path: '/drawing-prompts-wheel', description: 'Daily sketching & illustration ideas.' },
      { name: 'Writing Prompt Wheel', path: '/writing-prompt-wheel', description: 'Story starters & flash fiction hooks.' },
      { name: 'Character Name Wheel', path: '/character-name-wheel', description: 'Fiction, RPG & novel character names.' }
    ],
    relatedWheels: [
      { name: 'Drawing Prompts Wheel', path: '/drawing-prompts-wheel', count: 8 },
      { name: 'Writing Prompt Wheel', path: '/writing-prompt-wheel', count: 8 }
    ],
    relatedGuides: [
      { name: 'How Random Wheels Work', path: '/how-random-wheels-work', readingTime: '6 min' }
    ],
    internalLinks: [
      { label: 'Launch Drawing Prompts Wheel', href: '/drawing-prompts-wheel', context: 'Art & sketchbook ideas.' },
      { label: 'Launch Writing Prompt Wheel', href: '/writing-prompt-wheel', context: 'Story starters & scenes.' }
    ],
    breadcrumbs: [
      { name: 'Home', item: 'https://spinwheelgames.org/' },
      { name: 'Creativity & Writing', item: 'https://spinwheelgames.org/creativity' }
    ]
  },

  productivity: {
    slug: 'productivity',
    fullPath: '/productivity',
    pageType: 'category',
    title: 'Productivity Wheels – ADHD Task, Chore & Pomodoro Spinners',
    metaDescription:
      'Overcome task paralysis, ADHD executive dysfunction, and to-do list overwhelm. Spin Productivity Wheels for 25-minute Pomodoro sprints, chores, and study blocks.',
    h1: 'Productivity Wheels: Task Prioritizers, Chore Pickers & Study Spinners',
    introduction:
      'Defeat task paralysis and executive dysfunction by outsourcing your starting point to an impartial spin. When your to-do list has 12 urgent items or a messy apartment feels overwhelming, your brain burns precious willpower debating where to begin. Our productivity wheels pick a single 15- to 25-minute micro-target in three seconds so you can jump straight into action.',
    primaryIntent: 'decision',
    secondaryIntents: ['educational', 'transactional/use tool'],
    categoryKey: 'productivity',
    parentCategoryPath: '/',
    parentCategoryName: 'Home',
    featureBadges: [
      'Breaks ADHD Task Paralysis',
      '25-Min Pomodoro Compatible',
      'No-Repeat Task Elimination',
      'Weighted Urgency Sliders',
      '100% Free'
    ],
    defaultWheelData: {
      title: 'Focus Task Decider',
      description: 'Frictionless priority selector',
      paletteKey: 'retro',
      items: [
        { id: 'pr-1', text: 'Reply to Top 3 Priority Emails (15m)', weight: 1 },
        { id: 'pr-2', text: 'Draft Next Project Milestone Section (25m)', weight: 1 },
        { id: 'pr-3', text: 'Review Pending PRs or Documents (20m)', weight: 1 },
        { id: 'pr-4', text: 'Clear Desk & Close 20 Browser Tabs (10m)', weight: 1 },
        { id: 'pr-5', text: 'Send 3 Client Follow-Up Messages (15m)', weight: 1 },
        { id: 'pr-6', text: 'Update Task Board & Tomorrow’s Plan (10m)', weight: 1 }
      ]
    },
    instructions: [
      'Select only 4 to 7 concrete, bite-sized tasks that can each be completed (or meaningfully advanced) in a single 15- to 25-minute block.',
      'Turn on Elimination mode so finished tasks are cleared off the wheel with visual confetti feedback.',
      'Click Spin and apply the 5-Second Rule: start working on the winning slice immediately before your brain can negotiate.',
      'Use weight multipliers (2x or 3x) if one deadline task deserves higher odds during your peak morning focus hours.'
    ],
    whoItsUsefulFor: [
      {
        audience: 'Adults with ADHD & Task Initiation Friction',
        benefit: 'Bypasses analysis paralysis by converting a scary 20-item backlog into one concrete 15-minute spin.'
      },
      {
        audience: 'Remote Workers, Developers & Freelancers',
        benefit: 'Clears administrative backlog, code reviews, and client emails via gamified Pomodoro sprints.'
      },
      {
        audience: 'Families, Roommates & Students',
        benefit: 'Assigns household cleaning zones (/chore-picker) and interleaves exam study subjects (/study-topic-wheel) fairly.'
      }
    ],
    useCases: [
      {
        title: '1. The 25-Minute Pomodoro Deep-Work Starter',
        benefit: 'Paste today’s top 5 deliverables and let the wheel pick Sprint #1.',
        description:
          'Slices: Outline Q3 Deck Slides 1-4, Write Unit Tests for Auth Module, Reply to 4 Flagged Emails, Update Expense Spreadsheet, Review Design Mockups.'
      },
      {
        title: '2. The 15-Minute Apartment Reset & Declutter Sprint',
        benefit: 'Break house cleaning into equal 15-minute zones so you never feel overwhelmed.',
        description:
          'Slices: Unload & Reload Dishwasher, Clear Coffee Table & Couch, Wipe Bathroom Sink & Mirror, Fold One Laundry Basket, Take Out Trash & Recycling.'
      },
      {
        title: '3. Interleaved Exam Study Block Rotation',
        benefit: 'Alternate between quantitative and reading subjects every 30 minutes for superior memory retention.',
        description:
          'Slices: 20 Flashcards (Anki/Quizlet), 5 Practice Problems, Summarize 1 Textbook Section, Teach Concept Out Loud (Feynman Method), Past Exam Timed Question.'
      },
      {
        title: '4. Healthy Pomodoro 5-Minute Break Selector',
        benefit: 'Stop spending your 5-minute work breaks doomscrolling social media.',
        description:
          'Slices: Refill Water & Look Out Window, 15 Air Squats + Chest Stretch, Step Outside for Fresh Air, 2-Minute Box Breathing, Tidy Desk Surface.'
      }
    ],
    customizationOptions: [
      {
        title: 'Priority Weight Multipliers',
        description: 'Give urgent deadline tasks a 3x slice weight while keeping 10-minute quick wins at 1x.'
      },
      {
        title: 'Elimination Completion Streaks',
        description: 'Watch your wheel shrink slice by slice as you knock out each deliverable across the afternoon.'
      }
    ],
    resultExplanation:
      'Hardware-entropy randomness (window.crypto.getRandomValues) guarantees impartial task selection, preventing subconscious avoidance of high-friction tasks.',
    uniqueExamples: [
      'Micro-Task Sizing Rule: Replace vague projects like "Work on Taxes" with "Download 1099 PDFs into Tax Folder (10 Mins)" before spinning.',
      'Inbox Zero Wheel: Delete/Unsubscribe 10 Newsletters, Reply to 2 Quick Yes/No Threads, Archive Completed Project Threads, Draft 1 Difficult Reply.'
    ],
    tips: [
      'Never put a 4-hour project on the wheel—slice it into 20-minute micro-steps first so every spin feels winnable.',
      'Start a timer within 5 seconds of the wheel stopping to prevent your brain from second-guessing the pick.',
      'Promise yourself you only have to work on the spun task for 10 minutes; 90% of the time, momentum will carry you to completion.'
    ],
    uniqueContentBlocks: [
      {
        heading: 'Why Action Precedes Motivation: The Cognitive Science of Task Initiation',
        body: [
          'Most procrastination occurs not during the work itself, but in the transition window before starting. When faced with five equally important tasks, the prefrontal cortex stalls in an evaluative loop—burning glucose and triggering stress avoidance.',
          'Spinning a Productivity Wheel externalizes the prioritization step. The audio-visual spin provides an immediate novelty cue, and because you agreed in advance to work on the winning slice for just 15 or 25 minutes, starting friction drops to near zero.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How does a random wheel help with ADHD and task paralysis?',
        answer:
          'Executive dysfunction often makes all tasks feel equally urgent, causing your brain to freeze when trying to pick #1. Narrowing your list to 5 bite-sized slices on a wheel and letting the spin decide removes the decision bottleneck completely.'
      },
      {
        question: 'What if the wheel lands on a task and I immediately dread doing it?',
        answer:
          'Either commit to working on that task for just 5 minutes (the "5-Minute Rule"), OR use that gut reaction as diagnostic clarity—disable that slice and immediately start the task you were secretly hoping the wheel would land on!'
      },
      {
        question: 'Which productivity wheel should I use for family or roommate cleaning?',
        answer:
          'For shared household tasks, kids allowance charts, and roommate cleaning drafts, use our dedicated Chore Picker Wheel (/chore-picker). For personal work and study backlogs, use the Task Selector (/task-selector) or Study Topic Wheel (/study-topic-wheel).'
      },
      {
        question: 'Can I weight urgent deadlines higher than routine admin tasks?',
        answer:
          'Yes! Use the weight controls in the Entries sidebar to give a high-priority deliverable a 3x or 4x slice width so it is statistically likely to be selected in your first morning spin.'
      }
    ],
    relatedTools: [
      { name: 'Chore Picker Wheel', path: '/chore-picker', description: 'Fair household & roommate cleaning drafts.' },
      { name: 'Task Selector Wheel', path: '/task-selector', description: 'Pomodoro & ADHD to-do list prioritizer.' },
      { name: 'Study Topic Wheel', path: '/study-topic-wheel', description: 'Exam subject & revision block spinner.' }
    ],
    relatedWheels: [
      { name: 'Chore Picker Wheel', path: '/chore-picker', count: 8 },
      { name: 'Task Selector Wheel', path: '/task-selector', count: 8 }
    ],
    relatedGuides: [
      { name: 'Decision Fatigue & The Psychology of Chance', path: '/decision-fatigue-and-the-psychology-of-chance', readingTime: '7 min' }
    ],
    internalLinks: [
      { label: 'Launch Chore Picker Wheel', href: '/chore-picker', context: 'Family & roommate cleaning tasks.' },
      { label: 'Launch Task Selector Wheel', href: '/task-selector', context: 'Deep work & Pomodoro sprints.' }
    ],
    breadcrumbs: [
      { name: 'Home', item: 'https://spinwheelgames.org/' },
      { name: 'Productivity & Habits', item: 'https://spinwheelgames.org/productivity' }
    ]
  },

  wellness: {
    slug: 'wellness',
    fullPath: '/wellness',
    pageType: 'category',
    title: 'Wellness Wheels – Self-Care, Mindfulness & Grounding Spinners',
    metaDescription:
      'Build daily calm and somatic grounding. Spin Wellness Wheels for 3-minute breathing resets, nervous system regulation, gratitude prompts, and self-care.',
    h1: 'Wellness & Mindfulness Wheels: Self-Care, Grounding & Calm Spinners',
    introduction:
      'When you are burned out or anxious, deciding *how* to relax can ironically feel like one more chore on your to-do list. Our wellness wheels provide gentle, zero-friction invitations for 3-minute nervous system resets, somatic grounding cues, screen-free evening wind-downs, and gratitude reflections.',
    primaryIntent: 'educational',
    secondaryIntents: ['decision', 'entertainment'],
    categoryKey: 'wellness',
    parentCategoryPath: '/',
    parentCategoryName: 'Home',
    featureBadges: [
      '3-Min Somatic Grounding Cues',
      'Paced Breathing Protocols',
      'Screen-Free Self-Care Ideas',
      'Therapist & Classroom Ready',
      '100% Free'
    ],
    defaultWheelData: {
      title: 'Mindful Pause Spinner',
      description: 'Centering exercises & grounding cues',
      paletteKey: 'ocean',
      items: [
        { id: 'wl-1', text: '4-7-8 Deep Breathing (4 Cycles)', weight: 1 },
        { id: 'wl-2', text: '5-4-3-2-1 Sensory Grounding Check', weight: 1 },
        { id: 'wl-3', text: 'Write Down 3 Specific Gratitudes', weight: 1 },
        { id: 'wl-4', text: 'Drop Shoulders & Unclench Jaw Scan', weight: 1 },
        { id: 'wl-5', text: 'Step Outside for 5 Mins of Natural Light', weight: 1 },
        { id: 'wl-6', text: 'Drink a Full Glass of Water Slowly', weight: 1 },
        { id: 'wl-7', text: '2-Minute Box Breathing (4-4-4-4)', weight: 1 },
        { id: 'wl-8', text: 'Send One Kind Text to a Friend', weight: 1 }
      ]
    },
    instructions: [
      'Bookmark this wheel and spin whenever you feel overwhelmed, overstimulated, or stuck in afternoon doomscrolling.',
      'As the wheel rotates, drop your shoulders away from your ears and take one slow nasal inhale.',
      'Dedicate the next 2 to 5 minutes exclusively to the winning self-care or grounding slice.',
      'Customize the wheel with your therapist’s coping cards, sensory regulation tools, or evening wind-down rituals.'
    ],
    whoItsUsefulFor: [
      {
        audience: 'High-Stress Professionals & Students',
        benefit: 'Provides 3-minute parasympathetic nervous system resets between demanding meetings or exams.'
      },
      {
        audience: 'Counselors, Therapists & SEL Educators',
        benefit: 'Interactive visual tool for teaching emotional regulation and coping skills in school counseling offices.'
      },
      {
        audience: 'Evening Screen-Detox Seekers',
        benefit: 'Replaces late-night phone scrolling with restorative analog self-care rituals.'
      }
    ],
    useCases: [
      {
        title: '1. The 3-Minute Nervous System Down-Regulation Wheel',
        benefit: 'Rapid vagus-nerve calming techniques when stress or anxiety spikes during the workday.',
        description:
          'Slices: Double-Inhale Physiological Sigh x5, 5-4-3-2-1 Sensory Naming, Cold Water Splash on Wrists/Face, Progressive Muscle Release, 4-4-4-4 Box Breathing, Legs-Up-The-Wall 3 Mins.'
      },
      {
        title: '2. Classroom SEL (Social-Emotional Learning) Check-In Circle',
        benefit: 'Counselors and teachers spin reflection prompts during morning circle time.',
        description:
          'Slices: Name one thing that made you smile today, Show your current energy level 1-5, Take 3 slow belly breaths together, Give a classmate a specific compliment, Share one goal for today.'
      },
      {
        title: '3. Evening Screen-Free Wind-Down Ritual Spinner',
        benefit: 'Spin at 9:30 PM to pick a relaxing offline activity before sleep.',
        description:
          'Slices: Read 10 Pages of a Physical Book, Brew Herbal Chamomile Tea, 5-Minute Gentle Neck & Hip Stretch, Write 3 Lines in bedside Journal, Listen to One Album with Eyes Closed.'
      },
      {
        title: '4. Sunday Recharge & Burnout Recovery Menu',
        benefit: 'Pick one nourishing 30-minute restoration block on the weekend.',
        description:
          'Slices: Solo Nature Walk Without Podcasts, Everything Shower & Face Mask, Nap with Phone in Another Room, Bake or Cook Slowly with Music, Sit at a Café with a Sketchbook.'
      }
    ],
    customizationOptions: [
      {
        title: 'Personalized Coping Deck',
        description: 'Load your own CBT reframes, sensory grounding anchors, or favorite calming activities.'
      },
      {
        title: 'Soft Ocean & Pastel Palettes',
        description: 'Switch the visual theme to soothing Ocean or Pastel tones for a low-stimulation visual experience.'
      }
    ],
    resultExplanation:
      'Balanced cryptographic randomness removes decision fatigue when your emotional battery is too low to choose a self-care practice.',
    uniqueExamples: [
      '2-Minute Desk Reset List: Physiological Sigh Breathing, Look at an Object 20 Feet Away for 20 Seconds, Neck & Trap Release Stretch, Refill Water Bottle, Write Down the Single Next Small Step.'
    ],
    tips: [
      'Keep every slice on your workday wellness wheel under 5 minutes so you never skip a spin due to time pressure.',
      'Mute harsh notification alerts while performing your 3-minute grounding slice.'
    ],
    uniqueContentBlocks: [
      {
        heading: 'Somatic Grounding: Why External Prompts Help When You Are Overwhelmed',
        body: [
          'When cortisol and adrenaline spike during a stressful day, the brain’s executive decision-making center goes partially offline. Asking an overwhelmed person to "pick a healthy coping strategy" often fails because choosing itself requires cognitive energy.',
          'A pre-loaded Wellness Wheel acts as an external "dopamine and calm menu." By pre-populating six proven 3-minute somatic resets while you are calm, a single tap in a stressful moment tells you exactly which micro-action to take.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Why use a spinning wheel for self-care and mindfulness?',
        answer:
          'When you are exhausted or anxious, decision fatigue often causes you to default to passive doomscrolling because active self-care requires choosing what to do. The wheel picks a simple 3-minute practice for you instantly.'
      },
      {
        question: 'Can school counselors and therapists use the Wellness Wheel with students?',
        answer:
          'Yes! Many school counselors keep a custom Coping Skills Wheel on an iPad or smartboard so students can spin a grounding exercise or SEL check-in prompt in a playful, non-intimidating way.'
      },
      {
        question: 'How long should the activities on my Wellness Wheel take?',
        answer:
          'We recommend keeping weekday wellness slices between 2 and 5 minutes (like box breathing, sensory grounding, or stepping into sunlight) so they fit effortlessly between meetings.'
      },
      {
        question: 'Are my personal journal or coping prompts kept private?',
        answer:
          'Yes. Any custom self-care slices or affirmations you add are stored exclusively in your local browser storage and are never transmitted to any server.'
      }
    ],
    relatedTools: [
      { name: 'Self-Care Wheel', path: '/self-care-wheel', description: 'Daily restorative & grounding rituals.' },
      { name: 'Exercise Wheel', path: '/exercise-wheel', description: '60-second desk posture & stretch breaks.' },
      { name: 'Hobby Wheel', path: '/hobby-wheel', description: 'Screen-free creative leisure ideas.' }
    ],
    relatedWheels: [
      { name: 'Self-Care Wheel', path: '/self-care-wheel', count: 8 },
      { name: 'Hobby Wheel', path: '/hobby-wheel', count: 8 }
    ],
    relatedGuides: [
      { name: 'Decision Fatigue & The Psychology of Chance', path: '/decision-fatigue-and-the-psychology-of-chance', readingTime: '7 min' }
    ],
    internalLinks: [
      { label: 'Launch Self-Care Wheel', href: '/self-care-wheel', context: 'Daily mindfulness & calm prompts.' },
      { label: 'Launch Hobby Wheel', href: '/hobby-wheel', context: 'Screen-free evening activities.' }
    ],
    breadcrumbs: [
      { name: 'Home', item: 'https://spinwheelgames.org/' },
      { name: 'Wellness & Mindfulness', item: 'https://spinwheelgames.org/wellness' }
    ]
  },

  'date-night': {
    slug: 'date-night',
    fullPath: '/date-night',
    pageType: 'category',
    title: 'Date Night Wheels – Romantic Couple Activity & Dinner Pickers',
    metaDescription:
      'Stop the "What do you want to do tonight?" loop. Spin Date Night Wheels for cozy at-home dates, local couple outings, dinner picks, and relationship prompts.',
    h1: 'Date Night Wheels: Romantic Activity, Dinner & Movie Deciders for Couples',
    introduction:
      'Break out of the Friday night "I don’t care, what do you want to do?" loop before both of you end up scrolling your phones on the couch. Our Date Night Wheels help couples co-create an exciting shortlist of cozy stay-at-home dates, under-$40 local outings, and conversation sparks—and settle on a winner in one playful spin.',
    primaryIntent: 'decision',
    secondaryIntents: ['entertainment', 'party'],
    categoryKey: 'date-night',
    parentCategoryPath: '/',
    parentCategoryName: 'Home',
    featureBadges: [
      'Ends Couple Indecision',
      'At-Home & Outing Presets',
      '3-Spin Dinner + Movie Combo',
      'Web Crypto CSPRNG',
      '100% Free'
    ],
    defaultWheelData: {
      title: 'Spontaneous Date Decider',
      description: 'Romantic evening activity spinner',
      paletteKey: 'berry',
      items: [
        { id: 'dn-1', text: 'Cook Homemade Pasta & Wine Pairing', weight: 1 },
        { id: 'dn-2', text: 'Tapas & Dessert Crawl in Town', weight: 1 },
        { id: 'dn-3', text: 'Living Room Blanket Fort & Classic Film', weight: 1 },
        { id: 'dn-4', text: 'Sunset Overlook Picnic with Takeout', weight: 1 },
        { id: 'dn-5', text: 'Retro Arcade or Mini Golf Showdown', weight: 1 },
        { id: 'dn-6', text: 'Bookstore "Pick a Book for Each Other" Date', weight: 1 },
        { id: 'dn-7', text: '2-Player Board Game & Mocktail Lab', weight: 1 },
        { id: 'dn-8', text: 'Live Comedy Club or Acoustic Music Spot', weight: 1 }
      ]
    },
    instructions: [
      'Agree on tonight’s mode first: Stay-In Cozy ($0–$20) or Out on the Town.',
      'Have Partner A nominate 3 date ideas and Partner B nominate 3 date ideas onto the wheel.',
      'Give each partner one single Veto token for the night, then spin the wheel to lock in your evening.',
      'Run the "Triple-Spin Combo": spin our Dinner Wheel (/dinner-wheel), Date Night Wheel (/date-night-wheel), and Movie Wheel (/movie-wheel) back-to-back.'
    ],
    whoItsUsefulFor: [
      {
        audience: 'Long-Term Couples & Busy Parents',
        benefit: 'Replaces decision fatigue and planning resentment with effortless weekend novelty.'
      },
      {
        audience: 'New Relationships & First/Second Dates',
        benefit: 'Picks active, low-pressure outings (mini golf, food trucks, bookstores) that make conversation flow naturally.'
      },
      {
        audience: 'Double-Date Friend Groups',
        benefit: 'Lets two couples each add two activities to the wheel and pick a fair group plan.'
      }
    ],
    useCases: [
      {
        title: '1. Cozy $0 Stay-At-Home Date Wheel (After Kids Are Asleep)',
        benefit: 'Romantic living-room ideas that require zero babysitter budget.',
        description:
          'Slices: DIY Pizza Topping Bar, Blind Chocolate/Cheese Tasting Flight, 2-Player Co-Op Video/Board Game, Living Room Spa & Massage Swap, Balcony Stargazing & Hot Cocoa, Watch Wedding/Travel Photos.'
      },
      {
        title: '2. Under-$40 Local Adventure & Novelty Outing',
        benefit: 'High-chemistry outings that cost less than a formal sit-down dinner.',
        description:
          'Slices: Pinball & Arcade Bar, Late-Night Dessert & Espresso Spot, Botanical Garden Sunset Walk, Bowling Loser-Buys-Tacos, Thrift Store $10 Outfit Challenge, Food Truck Park.'
      },
      {
        title: '3. Deep Couple Conversation & Connection Prompts',
        benefit: 'Spin over dinner or wine to ask questions beyond daily work and household logistics.',
        description:
          'Slices: Favorite memory from our first year together?, Dream 2-week trip if money didn’t matter?, One hobby we should learn together?, Best meal we ever shared?, What made you feel most appreciated this month?'
      },
      {
        title: '4. The "3-Wheel Friday Night Itinerary" Generator',
        benefit: 'Build a complete multi-stop date night in 30 seconds.',
        description:
          'Spin 1: Cuisine on /dinner-wheel -> Spin 2: Activity on /date-night-wheel -> Spin 3: Film on /movie-wheel.'
      }
    ],
    customizationOptions: [
      {
        title: 'Secret Surprise Slice',
        description: 'Each partner adds one "Mystery Date (Partner A Plans)" slice to keep genuine surprise alive.'
      },
      {
        title: 'Monthly Bucket-List Elimination',
        description: 'Load 8 seasonal dates at the start of the month and eliminate each one after you go.'
      }
    ],
    resultExplanation:
      'Impartial cryptographic draws share the mental load of planning equally between both partners.',
    uniqueExamples: [
      'Progressive Dinner Spin: Spin once for Appetizer spot, spin again for Main Course restaurant, spin a third time for Dessert bakery.'
    ],
    tips: [
      'Always agree on whether tonight is an "In" or "Out" night before loading the wheel so nobody feels ambushed by having to get dressed up.',
      'Use the 3-3 Nomination Rule: when both partners contribute half the slices, every possible outcome is already a win.'
    ],
    uniqueContentBlocks: [
      {
        heading: 'Why Novelty Spins Boost Relationship Satisfaction (The Self-Expansion Model)',
        body: [
          'Relationship psychologists studying long-term couples found that simply spending time together passively (like watching TV while scrolling phones) adds very little to relationship vitality. What bonds couples is *shared novelty*—experiencing small, playful, slightly unpredictable activities together.',
          'Furthermore, in many partnerships one person quietly carries 80% of the social planning load. Using a Date Night Wheel where each partner contributes three ideas makes romance collaborative, fair, and friction-free.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How do we stop the "I don’t know, what do you want to do?" date night stalemate?',
        answer:
          'Instead of asking an open-ended question, have each partner type 3 acceptable ideas onto the Date Night Wheel. Because all 6 options are pre-approved, spinning the wheel settles the choice in 5 seconds without either person feeling steamrolled.'
      },
      {
        question: 'What are the best slices for a stay-at-home date night on a budget?',
        answer:
          'Load your wheel with active at-home experiences rather than passive TV: "Blind Wine or Snack Tasting", "Cook a New Street-Food Recipe Together", "2-Player Board Game Championship", "Living Room Picnic & Indie Film", and "36 Questions to Fall in Love".'
      },
      {
        question: 'Can we pair the Date Night Wheel with food and movie decisions?',
        answer:
          'Yes! Thousands of couples run our 3-Wheel Friday Combo: first spin the Dinner Wheel (/dinner-wheel) for cuisine, then the Date Night Wheel (/date-night-wheel) for the activity, and finally the Movie Wheel (/movie-wheel) for the late-night film.'
      },
      {
        question: 'Does our custom date night bucket list save for next weekend?',
        answer:
          'Yes. Any custom restaurants or date ideas you type into the wheel are saved locally in your browser so you can turn on Elimination mode and work through your list week by week.'
      }
    ],
    relatedTools: [
      { name: 'Date Night Wheel', path: '/date-night-wheel', description: 'Flagship romantic activity & outing spinner.' },
      { name: 'Movie Wheel', path: '/movie-wheel', description: 'Date night film picker by genre & watchlist.' },
      { name: 'Dinner Wheel', path: '/dinner-wheel', description: 'Restaurant & home-cooked dinner decider.' }
    ],
    relatedWheels: [
      { name: 'Date Night Wheel', path: '/date-night-wheel', count: 8 },
      { name: 'Movie Wheel', path: '/movie-wheel', count: 8 }
    ],
    relatedGuides: [
      { name: 'Decision Fatigue & The Psychology of Chance', path: '/decision-fatigue-and-the-psychology-of-chance', readingTime: '7 min' }
    ],
    internalLinks: [
      { label: 'Launch Date Night Wheel', href: '/date-night-wheel', context: 'Spontaneous couple activities.' },
      { label: 'Launch Movie Wheel', href: '/movie-wheel', context: 'Pick tonight’s date movie.' }
    ],
    breadcrumbs: [
      { name: 'Home', item: 'https://spinwheelgames.org/' },
      { name: 'Date Night & Couples', item: 'https://spinwheelgames.org/date-night' }
    ]
  },

  icebreakers: {
    slug: 'icebreakers',
    fullPath: '/icebreakers',
    pageType: 'category',
    title: 'Icebreaker Wheels – Remote Team Warmups & Standup Prompts',
    metaDescription:
      'Break awkward Zoom and Teams silences in 3 minutes. Spin curated Icebreaker Wheels for agile standups, new-hire onboarding, retrospectives, and classrooms.',
    h1: 'Icebreaker Wheels: Remote Meeting Warmups, Standup Orders & Team Questions',
    introduction:
      'Replace awkward video-call silences and forced corporate small talk with genuine 3-minute team warmups. Whether you are kicking off a daily agile standup on Zoom, welcoming a new hire on their first Monday, facilitating a cross-functional workshop, or running a classroom morning circle, our Icebreaker Wheels deliver non-cringe questions and fair speaking order in one spin.',
    primaryIntent: 'event',
    secondaryIntents: ['classroom', 'entertainment'],
    categoryKey: 'icebreakers',
    parentCategoryPath: '/',
    parentCategoryName: 'Home',
    featureBadges: [
      'Zoom, Meet & Teams Screen-Share Ready',
      'Non-Cringe Work-Safe Prompts',
      'Agile Standup Speaking Order',
      'No-Repeat Elimination Mode',
      'Web Crypto CSPRNG Fair'
    ],
    defaultWheelData: {
      title: 'Team Meeting Icebreaker Wheel',
      description: 'Energize remote standups, retros, and workshops',
      paletteKey: 'cyberpunk',
      items: [
        { id: 'ib-1', text: 'Best meal or coffee you had this week?', weight: 1 },
        { id: 'ib-2', text: 'One browser tab or app you use every single day?', weight: 1 },
        { id: 'ib-3', text: 'What was your very first concert or favorite album?', weight: 1 },
        { id: 'ib-4', text: 'Harmless unpopular opinion about food or movies?', weight: 1 },
        { id: 'ib-5', text: 'If you had a free 3-day weekend tomorrow, where would you go?', weight: 1 },
        { id: 'ib-6', text: 'One non-work skill you would love to master instantly?', weight: 1 },
        { id: 'ib-7', text: 'What is your go-to comfort show or movie on a rainy day?', weight: 1 },
        { id: 'ib-8', text: 'Shoutout one teammate who helped you this sprint!', weight: 1 }
      ]
    },
    instructions: [
      'Share your browser window in Fullscreen Mode on Zoom, Microsoft Teams, Google Meet, or a conference room display.',
      'Choose your icebreaker format: spin one universal question for everyone to answer in 30 seconds, OR spin a fresh question for each person.',
      'Have the meeting facilitator or Scrum Master answer first to model a concise, 30-second response.',
      'Turn on Elimination (No-Repeat) mode so already-answered questions are removed across your weekly meetings.'
    ],
    whoItsUsefulFor: [
      {
        audience: 'Scrum Masters, Engineering Managers & Product Leads',
        benefit: 'Warms up daily standups and bi-weekly sprint retrospectives in under 3 minutes without derailing the agenda.'
      },
      {
        audience: 'HR, People Ops & Onboarding Facilitators',
        benefit: 'Helps new hires and remote colleagues across time zones discover shared interests naturally.'
      },
      {
        audience: 'Teachers, Professors & Workshop Hosts',
        benefit: 'Energizes first-day-of-school introductions, seminar discussions, and conference breakout tables.'
      }
    ],
    useCases: [
      {
        title: '1. Agile Standup 60-Second Rapid Warmup (Work-Safe & Fast)',
        benefit: 'Designed for 15-minute engineering and product standups where answers must take under 20 seconds each.',
        description:
          'Example Slice List: Current desk beverage?, Best thing you ate this weekend?, Keyboard/mouse setup rating 1-10?, One emoji describing your week?, Last show you finished?, Morning person or night owl?'
      },
      {
        title: '2. New-Hire Onboarding & Cross-Team Mixer Deck',
        benefit: 'Helps distributed teammates learn memorable personal trivia without invasive personal questions.',
        description:
          'Example Slice List: Weirdest first job you ever had?, Hidden hobby outside work?, Favorite local restaurant in your city?, If you could live in any fictional world?, Best travel tip you swear by?, Go-to karaoke or road-trip song?'
      },
      {
        title: '3. Friday Sprint Retrospective & Team Appreciation Wheel',
        benefit: 'Opens agile retros with psychological safety, candor, and peer recognition.',
        description:
          'Example Slice List: Rose (One win from this sprint), Thorn (One blocker that slowed you down), Bud (Something you are excited to ship next), Kudos (Thank a teammate who unblocked you), Lesson (One thing we learned the hard way).'
      },
      {
        title: '4. Two-Wheel Combo: Name Wheel + Icebreaker Question Wheel',
        benefit: 'Eliminates the dreaded "Who wants to go next?" pause on video calls.',
        description:
          'Workflow: Put team member names on /wheel-of-names with Elimination on to pick the speaker order, and spin /icebreakers for their prompt.'
      },
      {
        title: '5. Classroom Morning Meeting & Advisory Circle Prompts',
        benefit: 'Builds student belonging in K–12 and university seminar cohorts.',
        description:
          'Example Slice List: Would you rather explore deep space or the deep ocean?, Favorite season of the year and why?, Superpower you would pick for a day?, Book or game you recommend to the class?'
      }
    ],
    customizationOptions: [
      {
        title: 'Tone & Time-Box Customization',
        description: 'Swap between 15-second rapid-fire standup questions, deep Friday retro prompts, or playful "Would You Rather" dilemmas.'
      },
      {
        title: 'No-Repeat Elimination Across Sprints',
        description: 'Load 20 questions on Monday and eliminate one question each morning so your team gets a fresh warmup for a full month.'
      }
    ],
    resultExplanation:
      'Cryptographic randomness (window.crypto.getRandomValues) ensures nobody feels targeted by a specific question—every prompt is drawn impartially on screen.',
    uniqueExamples: [
      'Rapid "This or That" Binary Icebreaker List (8 Slices): Coffee or Matcha/Tea?, Remote Cabin or Bustling Tokyo?, Podcasts or Audiobooks?, Sweet Breakfast or Savory Breakfast?, Early Morning Focus or Late Night Flow?, Dogs or Cats?, Text Message or Voice Note?, Summer Beach or Autumn Mountains?',
      'Workshop Table Breaker List (6 Slices): Share a 30-second win from this quarter, What was your dream job at age 10?, Best piece of career advice you ever ignored?, One tool that saves you an hour every week?, Favorite way to unplug after 6 PM?, Most underrated food combo?'
    ],
    tips: [
      'Enforce the 30-Second Rule: tell the team upfront that answers are capped at two sentences so an 8-person warmup finishes in 4 minutes flat.',
      'Always include one "Free Pass / Pick Any Previous Question" rule: psychological safety means nobody is ever forced to answer a prompt that catches them off guard.',
      'The meeting host should always answer the spun question first to set a warm, low-stakes, and concise example.',
      'Avoid deeply personal or polarizing topics in workplace wheels—stick to food, hobbies, media, travel, and playful hypotheticals.'
    ],
    uniqueContentBlocks: [
      {
        heading: 'When, Why, and How 3-Minute Icebreaker Spins Build Remote Psychological Safety',
        body: [
          'In remote and hybrid teams, the spontaneous 2-minute hallway chat before a conference room meeting disappears. When every Zoom or Teams call starts immediately with status tickets and ends the second the agenda finishes, interpersonal trust erodes—and junior engineers or new hires hesitate to speak up during technical debates.',
          'Organizational psychologists (including Google’s Project Aristotle research on high-performing teams) emphasize that brief, structured social check-ins establish vocal equality early in a meeting. Once every person on a video call has spoken out loud for 20 seconds during a low-stakes icebreaker spin, they are more than twice as likely to contribute ideas during the working session that follows.'
        ]
      },
      {
        heading: 'How to Run the "Popcorn Spin" Protocol for Distributed Standups',
        body: [
          'The biggest momentum killer on remote video calls is the awkward 6-second silence where three people unmute at the same time—or nobody unmutes at all—because Zoom tile order looks different on every participant’s monitor.',
          'Solve this permanently with the Popcorn Spin protocol: spend the first 3 minutes spinning one shared icebreaker question on this page, then let each speaker "popcorn" to the next teammate—or use our Zoom Icebreaker Wheel (/zoom-icebreaker-wheel) and Team Picker (/team-picker) to randomize the speaking queue visibly.'
        ]
      }
    ],
    faqs: [
      {
        question: 'What makes a good workplace icebreaker question that doesn’t feel awkward or cringe?',
        answer:
          'The best workplace icebreakers are low-stakes, universally accessible, and answerable in under 30 seconds—focusing on everyday preferences like food, travel, hobbies, favorite tools, or lighthearted hypotheticals rather than deeply personal life events.'
      },
      {
        question: 'How do I share the Icebreaker Wheel with audio on Zoom, Google Meet, or Microsoft Teams?',
        answer:
          'Click "Share Screen" in Zoom, Meet, or Teams, select your browser tab, and check the "Share tab audio" (or "Share sound") toggle. Press the Fullscreen button above the wheel so the colorful slices fill everyone’s monitor clearly.'
      },
      {
        question: 'Should everyone answer the same spun question, or should each person get their own spin?',
        answer:
          'For groups of 7 or more people (like a daily standup or all-hands), spin ONCE at the start of the meeting and have everyone give a quick 20-second answer to that same prompt. For small groups of 3 to 6 people (like a Friday coffee chat or onboarding mixer), let each person spin their own unique question with Elimination mode enabled.'
      },
      {
        question: 'Can I save custom icebreaker questions for my specific team or classroom?',
        answer:
          'Yes! Open the Entries sidebar to bulk-paste your own sprint retrospective prompts, company trivia, or classroom check-ins. Your custom wheel saves automatically in your browser and can be shared via a custom URL.'
      },
      {
        question: 'What if a teammate draws a question they don’t have an answer for?',
        answer:
          'Establish a standard "Swap or Pass" house rule: any participant can either answer the question from the previous spin instead or click Spin once more for a fresh prompt.'
      }
    ],
    relatedTools: [
      { name: 'Zoom Icebreaker Wheel', path: '/zoom-icebreaker-wheel', description: 'Dedicated remote video call warmup spinner.' },
      { name: 'Icebreaker Question Wheel', path: '/icebreaker-question-wheel', description: 'Curated conversation starter prompts.' },
      { name: 'Never Have I Ever Wheel', path: '/never-have-i-ever-wheel', description: 'Social confession game for parties & happy hours.' },
      { name: 'Wheel of Names', path: '/wheel-of-names', description: 'Pick random speaking order for standups.' }
    ],
    relatedWheels: [
      { name: 'Zoom Icebreaker Wheel', path: '/zoom-icebreaker-wheel', count: 8 },
      { name: 'Icebreaker Question Wheel', path: '/icebreaker-question-wheel', count: 8 }
    ],
    relatedGuides: [
      { name: 'How to Pick a Random Winner', path: '/how-to-pick-a-random-winner', readingTime: '5 min' }
    ],
    internalLinks: [
      { label: 'Launch Zoom Icebreaker Wheel', href: '/zoom-icebreaker-wheel', context: 'Remote video meeting prompts.' },
      { label: 'Launch Never Have I Ever Wheel', href: '/never-have-i-ever-wheel', context: 'Team happy hour & party prompts.' }
    ],
    breadcrumbs: [
      { name: 'Home', item: 'https://spinwheelgames.org/' },
      { name: 'Icebreakers & Teams', item: 'https://spinwheelgames.org/icebreakers' }
    ]
  },

  finance: {
    slug: 'finance',
    fullPath: '/finance',
    pageType: 'category',
    title: 'Finance Wheels – Micro-Savings Challenges & Budget Spinners',
    metaDescription:
      'Gamify your savings goals and curb impulse spending. Spin Finance Wheels for weekly micro-savings challenges, no-spend weekend ideas, and debt paydown sprints.',
    h1: 'Finance & Budgeting Wheels: Gamified Savings Challenges & Money Deciders',
    introduction:
      'Transform personal finance from a restrictive spreadsheet chore into an engaging weekly habit. Whether you are building a $1,000 emergency fund through randomized micro-transfers, enforcing a 48-hour cooling-off rule on online shopping splurges, or planning a fun $0 no-spend weekend, our finance wheels use behavioral gamification to make saving automatic.',
    primaryIntent: 'educational',
    secondaryIntents: ['decision', 'transactional/use tool'],
    categoryKey: 'finance',
    parentCategoryPath: '/',
    parentCategoryName: 'Home',
    featureBadges: [
      '52-Week Micro-Savings Game',
      'No-Spend Weekend Ideas',
      'Impulse Purchase Cooling-Off',
      '100% Client-Side Privacy',
      '100% Free'
    ],
    defaultWheelData: {
      title: 'Micro-Savings Sprint Wheel',
      description: 'Gamify your weekly savings transfers',
      paletteKey: 'forest',
      items: [
        { id: 'fn-1', text: 'Transfer $5 to Emergency Fund', weight: 1 },
        { id: 'fn-2', text: 'Transfer $10 to Travel/Vacation Vault', weight: 1 },
        { id: 'fn-3', text: 'Transfer $15 to High-Yield Savings', weight: 1 },
        { id: 'fn-4', text: 'Brew Coffee at Home & Save $7', weight: 1 },
        { id: 'fn-5', text: 'Transfer $20 to Extra Debt/Index Paydown', weight: 1 },
        { id: 'fn-6', text: '24-Hour Zero-Spend Challenge Today', weight: 1 },
        { id: 'fn-7', text: 'Cook From Pantry & Transfer $12', weight: 1 },
        { id: 'fn-8', text: 'Round Up Checking Balance to Nearest $10', weight: 1 }
      ]
    },
    instructions: [
      'Pick your weekly money ritual: Payday Micro-Savings Spin, No-Spend Weekend Activity Spin, or Impulse Cooling-Off Spin.',
      'Customize the dollar tiers in the sidebar (e.g., $5 to $25, or $20 to $100) so the highest slice still fits comfortably inside your checking buffer.',
      'Spin once every Friday payday (or Monday morning) and execute the transfer in your banking app within 60 seconds.',
      'Turn on Elimination mode to complete a 12-spin or 52-week savings envelope challenge without repeating a tier.'
    ],
    whoItsUsefulFor: [
      {
        audience: '52-Week Savings & Cash-Stuffing Fans',
        benefit: 'Replaces paper savings envelopes with an interactive digital wheel you can spin on payday.'
      },
      {
        audience: 'Impulse Online Shoppers',
        benefit: 'Introduces a playful pause ritual before clicking checkout on non-essential购物车 carts.'
      },
      {
        audience: 'Couples & Families Doing No-Spend Months',
        benefit: 'Generates fun, zero-cost weekend activities so frugal weekends feel abundant rather than boring.'
      }
    ],
    useCases: [
      {
        title: '1. The Friday Payday Micro-Savings Lottery ($5–$30)',
        benefit: 'Saves an extra $700–$1,200 per year through painless weekly micro-transfers.',
        description:
          'Slices: Save $5, Save $10, Save $15, Save $20, Save $25, Save $30, Wildcard: Match Your Last Takeout Bill into Savings!'
      },
      {
        title: '2. The Impulse Purchase "Wait or Buy" Cooling-Off Wheel',
        benefit: 'Curbs late-night online shopping by forcing a structured behavioral checkpoint.',
        description:
          'Slices: Wait 48 Hours Before Buying, Transfer Half the Item Price to Savings First, Sleep On It Tonight, Check If You Can Borrow/Buy Used, Sell 1 Unused Item First, Green Light: Enjoy Guilt-Free!'
      },
      {
        title: '3. Zero-Dollar "No-Spend Weekend" Fun Generator',
        benefit: 'Proves you can have an awesome Saturday and Sunday without swiping a credit card.',
        description:
          'Slices: Cook a 3-Course Pantry/Freezer Challenge, Library Book + Park Picnic, Sunset Hike & Thermos Coffee, Host a Potluck Board Game Night, Free Museum or Gallery Day, At-Home Movie Marathon.'
      },
      {
        title: '4. Debt Snowball & Side-Hustle Milestone Bonus Spin',
        benefit: 'Allocates unexpected freelance income, tax refunds, or cash gifts across your financial goals.',
        description:
          'Slices: 70% Extra Principal / 30% Fun, 100% High-Yield Emergency Fund, 50% Roth IRA / 50% Travel Sink Fund, Pay Off Smallest Balance Bill Today.'
      }
    ],
    customizationOptions: [
      {
        title: 'Custom Currency & Envelope Amounts',
        description: 'Edit slices for $, €, £, ₹, or ¥ in any denomination from $1 micro-saves to $250 monthly sprints.'
      },
      {
        title: 'Elimination Envelope Mode',
        description: 'Load numbers $5, $10, $15, $20, $25, $30, $35, $40 and eliminate one slice each week to guarantee a fixed $180 saved every 8 weeks.'
      }
    ],
    resultExplanation:
      'Impartial browser randomness turns routine savings transfers into a variable-reward dopamine loop.',
    uniqueExamples: [
      '8-Week Guaranteed $200 Envelope Deck (Use Elimination Mode): $10, $15, $20, $25, $25, $30, $35, $40 (Total = $200 saved after all 8 slices are spun!).'
    ],
    tips: [
      'Keep your mobile banking app open while you spin so you transfer the winning dollar amount within 30 seconds.',
      'Use Elimination mode with pre-calculated slices (e.g., eight slices totaling $200) so your final savings outcome is 100% predictable even though each week’s spin is a surprise!'
    ],
    uniqueContentBlocks: [
      {
        heading: 'Behavioral Economics: Why Variable-Reward Micro-Saves Beat Rigid Budgets',
        body: [
          'Behavioral economists have long observed that austere, all-or-nothing budgets trigger psychological reactance—the feeling of deprivation that causes people to abandon their budget after three weeks. By contrast, gamified "savings challenges" work because they tap into variable-ratio reward schedules: the same anticipation mechanic that makes games exciting.',
          'When you load eight manageable dollar amounts ($5 to $35) onto a Finance Wheel and spin every Friday morning, your brain experiences the spin as a playful ritual rather than a sacrifice. Better yet, when you enable Elimination mode, the math is deterministic: whether you draw $10 in Week 1 and $35 in Week 2 or vice versa, completing all eight spins guarantees you hit your exact target.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Does SpinWheelGames ever connect to my bank account or ask for financial data?',
        answer:
          'Never. SpinWheelGames is a 100% client-side visual decision tool. It never asks for logins, bank connections, or personal data—you simply spin the wheel to pick your savings challenge amount and make the transfer yourself in your own banking app.'
      },
      {
        question: 'How does the Elimination Envelope Savings Challenge work?',
        answer:
          'Enter 8 or 12 specific dollar amounts on the wheel (for example, $10, $15, $20, $25, $25, $30, $35, $40 = $200 total) and turn on Elimination mode. Spin once every payday. Because each completed slice is removed, you are guaranteed to save the exact $200 total at the end of 8 weeks while keeping each week’s amount a fun surprise.'
      },
      {
        question: 'What if the wheel lands on a higher dollar amount during a tight week?',
        answer:
          'When Elimination mode is active, you can click "Spin Again" to draw a smaller slice from the wheel today and leave the larger slice on the board for a higher-cash-flow week later in the month.'
      },
      {
        question: 'Can I customize the wheel for pounds (£), euros (€), or custom budget categories?',
        answer:
          'Yes! Open the Entries sidebar to type any currency symbol, savings bucket name, or no-spend weekend challenge.'
      }
    ],
    relatedTools: [
      { name: 'Budget Wheel', path: '/budget-wheel', description: 'Weekly micro-savings & expense challenge spinner.' },
      { name: 'Chore Picker Wheel', path: '/chore-picker', description: 'Kids allowance & household chore draft.' },
      { name: 'Yes or No Wheel', path: '/yes-or-no-wheel', description: 'Instant binary impulse-buy decider.' }
    ],
    relatedWheels: [
      { name: 'Budget Wheel', path: '/budget-wheel', count: 8 },
      { name: 'Yes or No Wheel', path: '/yes-or-no-wheel', count: 4 }
    ],
    relatedGuides: [
      { name: 'Decision Fatigue & The Psychology of Chance', path: '/decision-fatigue-and-the-psychology-of-chance', readingTime: '7 min' }
    ],
    internalLinks: [
      { label: 'Launch Budget Wheel', href: '/budget-wheel', context: 'Gamified micro-savings spinner.' },
      { label: 'Launch Yes or No Wheel', href: '/yes-or-no-wheel', context: 'Quick splurge-or-save decider.' }
    ],
    breadcrumbs: [
      { name: 'Home', item: 'https://spinwheelgames.org/' },
      { name: 'Finance & Budgeting', item: 'https://spinwheelgames.org/finance' }
    ]
  }
};
