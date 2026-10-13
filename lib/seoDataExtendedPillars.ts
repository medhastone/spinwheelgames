import { SeoPageData } from './seoArchitecture';

export const EXTENDED_PILLARS_SEO: Record<string, SeoPageData> = {
  workout: {
    slug: 'workout',
    fullPath: '/workout',
    pageType: 'category',
    title: 'Workout Wheels – Random HIIT & Exercise Spinners',
    metaDescription: 'Eliminate fitness boredom and workout plateaus. Spin random exercise wheels for HIIT intervals, calisthenics, core circuits, and gym routines.',
    h1: 'Workout Wheels & Fitness Exercise Spinners',
    introduction: 'Break through fitness plateaus and workout dread with randomized high-intensity routines. Whether you are training at home without equipment, looking for living-room HIIT circuits, or adding spontaneity to gym sessions, our workout wheels provide mathematically balanced intervals.',
    primaryIntent: 'sports',
    secondaryIntents: ['educational', 'transactional/use tool'],
    categoryKey: 'workout',
    parentCategoryPath: '/',
    parentCategoryName: 'Home',
    featureBadges: [
      'Zero Equipment Options',
      'HIIT & Circuit Friendly',
      'Custom Reps & Sets',
      'Web Crypto CSPRNG',
      '100% Free'
    ],
    defaultWheelData: {
      title: 'Quick Workout Spinner',
      description: 'Random exercise circuit selector',
      paletteKey: 'neon',
      items: [
        { id: 'wo-1', text: '20 Burpees', weight: 1 },
        { id: 'wo-2', text: '30 Bodyweight Squats', weight: 1 },
        { id: 'wo-3', text: '45-Sec Forearm Plank', weight: 1 },
        { id: 'wo-4', text: '25 Mountain Climbers', weight: 1 },
        { id: 'wo-5', text: '15 Diamond Pushups', weight: 1 },
        { id: 'wo-6', text: '40 Jumping Jacks', weight: 1 }
      ]
    },
    instructions: [
      'Select your training target (HIIT, core, calisthenics, or gym accessory lifts).',
      'Spin the wheel to determine your next exercise movement.',
      'Complete the assigned reps or duration, then spin again for your next set.',
      'Use Elimination mode to cycle through a complete 6-station circuit without repeated exercises.'
    ],
    whoItsUsefulFor: [
      {
        audience: 'Home Fitness Enthusiasts',
        benefit: 'Adds gamified structure and unpredictability to bodyweight workouts without expensive apps.'
      },
      {
        audience: 'Personal Trainers & Bootcamps',
        benefit: 'Brings high-energy station rotations to group classes where clients love the suspense.'
      },
      {
        audience: 'Busy Professionals & Remote Workers',
        benefit: 'Provides rapid 5-minute micro-break movement bursts between desk sessions.'
      }
    ],
    useCases: [
      {
        title: 'Tabata & HIIT Circuit Generator',
        benefit: 'Spin every 45 seconds to keep heart rates elevated and mentally engaged.',
        description: 'Spin every 45 seconds to keep heart rates elevated and mentally engaged.'
      },
      {
        title: 'Core & Ab Finisher Routine',
        benefit: 'End strength sessions with 5 random abdominal movements picked consecutively.',
        description: 'End strength sessions with 5 random abdominal movements picked consecutively.'
      },
      {
        title: 'Desk Worker Mobility Breaks',
        benefit: 'Spin once every 90 minutes for postural resets, hamstring stretches, and thoracic mobility.',
        description: 'Spin once every 90 minutes for postural resets, hamstring stretches, and thoracic mobility.'
      }
    ],
    customizationOptions: [
      {
        title: 'Rep & Duration Sliders',
        description: 'Configure each slice for 30s intervals, 15-rep sets, or failure drop sets.'
      },
      {
        title: 'Elimination Station Mode',
        description: 'Remove each exercise as completed to ensure a full-body balanced workout.'
      }
    ],
    resultExplanation: 'All workout selections utilize cryptographically secure uniform random seeds to prevent muscle adaptation and eliminate trainer bias.',
    uniqueExamples: [
      'HIIT Circuit: 20 Pushups, 30 Jump Squats, 45s Plank, 20 Lunges, 15 Burpees'
    ],
    tips: [
      'Warm up dynamic joints for 3 minutes before starting randomized high-intensity sets.',
      'Use the Elimination mode to build a progressive 5-movement circuit.'
    ],
    uniqueContentBlocks: [
      {
        heading: 'Why Exercise Randomization Breaks Physical & Mental Plateaus',
        body: [
          'The human neuromuscular system is extraordinarily efficient at adapting to repeated stimuli. When you perform the exact same 3-exercise routine week after week, metabolic adaptation reduces calorie expenditure and psychological boredom sets in.',
          'Incorporating controlled workout randomization forces neurological adaptation through novel movement sequencing. By removing the burden of planning your sets mid-workout, you maintain training intensity and break through decision fatigue.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Are randomized workouts safe for beginners?',
        answer: 'Yes! You can customize the wheel with low-impact or beginner-friendly movements like bodyweight squats, knee pushups, and wall sits.'
      },
      {
        question: 'Can I use this for timed Tabata intervals?',
        answer: 'Absolutely. Many athletes spin the wheel during the 15-second rest phase of Tabata intervals to discover their next high-intensity movement.'
      }
    ],
    relatedTools: [
      { name: 'HIIT Exercise Wheel', path: '/hiit-exercise-wheel', description: 'High intensity interval training.' },
      { name: 'Bodyweight Workout Wheel', path: '/bodyweight-workout-wheel', description: 'Home calisthenics routine.' },
      { name: 'Gym Routine Wheel', path: '/gym-routine-wheel', description: 'Free weight and cable accessory lifts.' }
    ],
    relatedWheels: [
      { name: 'HIIT Exercise Wheel', path: '/hiit-exercise-wheel', count: 6 },
      { name: 'Yoga Pose Wheel', path: '/yoga-pose-wheel', count: 6 }
    ],
    relatedGuides: [
      { name: 'How Random Wheels Work', path: '/how-random-wheels-work', readingTime: '6 min' }
    ],
    internalLinks: [
      { label: 'Explore Workout Hub', href: '/workout', context: 'All exercise wheels.' }
    ],
    breadcrumbs: [
      { name: 'Home', item: 'https://spinwheelgames.org' },
      { name: 'Workout & Fitness', item: 'https://spinwheelgames.org/workout' }
    ]
  },

  travel: {
    slug: 'travel',
    fullPath: '/travel',
    pageType: 'category',
    title: 'Travel Wheels – Vacation & Destination Pickers',
    metaDescription: 'Pick your next vacation spot, weekend getaway, road trip stop, or international adventure. Spin free travel wheels for wanderlust and exploration.',
    h1: 'Travel Wheels & Vacation Destination Pickers',
    introduction: 'Wanderlust without the planning paralysis. When the globe is full of extraordinary destinations, choosing where to book flights or drive for the weekend can stall your holiday for months. Spin our curated travel wheels to discover unexpected cities, national parks, and cultural hubs.',
    primaryIntent: 'decision',
    secondaryIntents: ['entertainment', 'transactional/use tool'],
    categoryKey: 'travel',
    parentCategoryPath: '/',
    parentCategoryName: 'Home',
    featureBadges: [
      'Worldwide Destinations',
      'Weekend Getaway Ideas',
      'Road Trip Detours',
      'Web Crypto CSPRNG',
      '100% Free'
    ],
    defaultWheelData: {
      title: 'Global Destination Picker',
      description: 'Discover your next adventure',
      paletteKey: 'vibrant',
      items: [
        { id: 'tr-1', text: 'Tokyo, Japan', weight: 1 },
        { id: 'tr-2', text: 'Rome, Italy', weight: 1 },
        { id: 'tr-3', text: 'Reykjavik, Iceland', weight: 1 },
        { id: 'tr-4', text: 'Cape Town, South Africa', weight: 1 },
        { id: 'tr-5', text: 'Oaxaca, Mexico', weight: 1 },
        { id: 'tr-6', text: 'Banff, Canada', weight: 1 }
      ]
    },
    instructions: [
      'Filter destinations by flight radius, budget, or travel style (nature, foodie, history, relaxation).',
      'Spin the wheel with friends or travel partners to eliminate back-and-forth debates.',
      'Commit to researching flights or booking accommodations for the selected location.'
    ],
    whoItsUsefulFor: [
      {
        audience: 'Spontaneous Travelers & Couples',
        benefit: 'Breaks destination stalemates and uncovers hidden gem cities you might otherwise overlook.'
      },
      {
        audience: 'Road Trip Planners',
        benefit: 'Selects quirky roadside attractions, scenic detours, and lunch stops along highway corridors.'
      }
    ],
    useCases: [
      {
        title: 'Long Weekend Getaway Sorter',
        benefit: 'Choose between 5 drivable cities within 3 hours for spontaneous holiday weekends.',
        description: 'Choose between 5 drivable cities within 3 hours for spontaneous holiday weekends.'
      },
      {
        title: 'Annual Vacation Draw',
        benefit: 'Gather the family to spin the wheel for next summer\'s trip destination.',
        description: 'Gather the family to spin the wheel for next summer\'s trip destination.'
      }
    ],
    customizationOptions: [
      {
        title: 'Regional Geofencing',
        description: 'Customize entries for domestic states, European capitals, or tropical beaches.'
      }
    ],
    resultExplanation: 'Browser Web Crypto API draws guarantee every city on your shortlist has an unbiased chance.',
    uniqueExamples: [
      'European Escapes: Lisbon, Prague, Budapest, Amsterdam, Seville, Edinburgh'
    ],
    tips: [
      'Set ground rules before spinning: agree that everyone will accept the destination if it fits the budget.'
    ],
    uniqueContentBlocks: [
      {
        heading: 'The Psychology of Spontaneous Travel: Why Letting Go Yields Better Memories',
        body: [
          'Psychological research indicates that over-planning vacations creates rigid expectations that often lead to disappointment when real-world travel hiccups occur.',
          'Spontaneous, randomized trip selection taps into the dopamine rush of novelty. When you allow a neutral wheel to pick between top-tier vacation contenders, you experience true adventure from the moment of selection.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Can I restrict the travel wheel to a specific budget tier?',
        answer: 'Yes! Simply open the Edit Items drawer and paste only destinations that fit within your budget.'
      }
    ],
    relatedTools: [
      { name: 'Vacation Destination Wheel', path: '/vacation-destination-wheel', description: 'Global holiday spots.' },
      { name: 'Weekend Getaway Wheel', path: '/weekend-getaway-wheel', description: 'Local short trips.' }
    ],
    relatedWheels: [
      { name: 'Vacation Destination Wheel', path: '/vacation-destination-wheel', count: 6 }
    ],
    relatedGuides: [
      { name: 'How to Use a Wheel for Decisions', path: '/how-to-use-a-wheel', readingTime: '4 min' }
    ],
    internalLinks: [
      { label: 'Explore Travel Hub', href: '/travel', context: 'All travel wheels.' }
    ],
    breadcrumbs: [
      { name: 'Home', item: 'https://spinwheelgames.org' },
      { name: 'Travel & Exploration', item: 'https://spinwheelgames.org/travel' }
    ]
  },

  creativity: {
    slug: 'creativity',
    fullPath: '/creativity',
    pageType: 'category',
    title: 'Creativity Wheels – Art Prompts & Story Starters',
    metaDescription: 'Unblock creative inspiration. Spin random writing prompts, drawing ideas, art mediums, plot twists, and character arcs for writers and artists.',
    h1: 'Creativity & Writing Wheels: Art Prompts & Story Ideas',
    introduction: 'Conquer the terrifying blank page. Writers, digital illustrators, painters, and game designers frequently encounter creative burnout. Our creativity wheels introduce spontaneous prompts, unexpected genre blends, and lateral thinking challenges that spark immediate breakthrough concepts.',
    primaryIntent: 'educational',
    secondaryIntents: ['entertainment', 'transactional/use tool'],
    categoryKey: 'creativity',
    parentCategoryPath: '/',
    parentCategoryName: 'Home',
    featureBadges: [
      'Story Starters & Tropes',
      'Art & Sketching Prompts',
      'Unexpected Plot Twists',
      'Web Crypto CSPRNG',
      '100% Free'
    ],
    defaultWheelData: {
      title: 'Art & Writing Prompt Wheel',
      description: 'Lateral thinking prompt engine',
      paletteKey: 'pastel',
      items: [
        { id: 'cr-1', text: 'Cyberpunk Detective in Victorian London', weight: 1 },
        { id: 'cr-2', text: 'A Sentient Clockwork Raven', weight: 1 },
        { id: 'cr-3', text: 'Submerged Sunken Library', weight: 1 },
        { id: 'cr-4', text: 'The Last Alchemist on Mars', weight: 1 },
        { id: 'cr-5', text: 'A Memory Merchant Who Forgets', weight: 1 },
        { id: 'cr-6', text: 'Bioluminescent Forest at Midnight', weight: 1 }
      ]
    },
    instructions: [
      'Spin once for a core narrative theme or visual subject.',
      'Spin a second time for an unexpected modifier, constraint, or artistic medium.',
      'Set a 15-minute timer and sketch or write without editing yourself.'
    ],
    whoItsUsefulFor: [
      {
        audience: 'Novelists & Screenwriters',
        benefit: 'Generates sudden plot twists and antagonist motivations when storylines become predictable.'
      },
      {
        audience: 'Illustrators & Concept Artists',
        benefit: 'Provides daily warm-up sketching prompts combining disparate concepts (e.g., retro-futuristic botany).'
      },
      {
        audience: 'Creative Writing Teachers',
        benefit: 'Sparks energetic student writing sprints with zero prep time.'
      }
    ],
    useCases: [
      {
        title: 'Daily Inktober & Sketch Prompts',
        benefit: 'Spin every morning for a unique drawing subject and palette constraint.',
        description: 'Spin every morning for a unique drawing subject and palette constraint.'
      },
      {
        title: 'Flash Fiction 10-Minute Sprints',
        benefit: 'Challenge writing groups to build a 300-word vignette around the spun premise.',
        description: 'Challenge writing groups to build a 300-word vignette around the spun premise.'
      }
    ],
    customizationOptions: [
      {
        title: 'Art Medium Overlays',
        description: 'Include watercolors, digital gouache, charcoal, or fineliner pens into your prompt list.'
      }
    ],
    resultExplanation: 'Cryptographic randomization breaks habitual thought patterns by linking disparate mental schemas.',
    uniqueExamples: [
      'Plot Twists: The mentor was an illusion, The artifact is alive, Time moves backwards'
    ],
    tips: [
      'Do not re-spin if a prompt feels difficult—creative growth happens when solving hard artistic constraints!'
    ],
    uniqueContentBlocks: [
      {
        heading: 'Lateral Divergence: How Constraint Unlocks Human Imagination',
        body: [
          'When artists have infinite choices, the mind defaults to familiar cliches and comfortable patterns. Cognitive scientists call this "the tyranny of the blank canvas."',
          'By introducing an arbitrary, randomized constraint—such as drawing an underwater city using only two complementary colors—you force the brain into lateral divergent thinking, generating original connections you never would have consciously planned.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Can I combine multiple prompts in one session?',
        answer: 'Yes! Spin once for a character, once for a setting, and once for a conflict to create a multi-dimensional story foundation.'
      }
    ],
    relatedTools: [
      { name: 'Drawing Prompts Wheel', path: '/drawing-prompts-wheel', description: 'Sketching ideas and subjects.' },
      { name: 'Creative Writing Prompts Wheel', path: '/creative-writing-prompts-wheel', description: 'Story starters and concepts.' },
      { name: 'Plot Twist Generator', path: '/plot-twist-generator', description: 'Unexpected story pivot points.' }
    ],
    relatedWheels: [
      { name: 'Drawing Prompts Wheel', path: '/drawing-prompts-wheel', count: 6 },
      { name: 'Plot Twist Generator', path: '/plot-twist-generator', count: 6 }
    ],
    relatedGuides: [
      { name: 'How Random Wheels Work', path: '/how-random-wheels-work', readingTime: '6 min' }
    ],
    internalLinks: [
      { label: 'Explore Creativity Hub', href: '/creativity', context: 'All creative writing wheels.' }
    ],
    breadcrumbs: [
      { name: 'Home', item: 'https://spinwheelgames.org' },
      { name: 'Creativity & Writing', item: 'https://spinwheelgames.org/creativity' }
    ]
  },

  productivity: {
    slug: 'productivity',
    fullPath: '/productivity',
    pageType: 'category',
    title: 'Productivity Wheels – Task, Habit & Routine Spinners',
    metaDescription: 'Overcome procrastination and task paralysis. Spin productivity wheels for priority tasks, Pomodoro break ideas, decluttering, and atomic habits.',
    h1: 'Productivity Wheels & Habit Task Pickers',
    introduction: 'Tackle task paralysis and executive dysfunction with gamified action. When your to-do list contains 20 urgent items, the sheer friction of deciding which one to tackle first can freeze your entire workday. Our productivity wheels turn task selection into a frictionless, engaging momentum builder.',
    primaryIntent: 'decision',
    secondaryIntents: ['educational', 'transactional/use tool'],
    categoryKey: 'productivity',
    parentCategoryPath: '/',
    parentCategoryName: 'Home',
    featureBadges: [
      'Overcomes Procrastination',
      'Pomodoro Break Generator',
      'Declutter Sprint Sorter',
      'Web Crypto CSPRNG',
      '100% Free'
    ],
    defaultWheelData: {
      title: 'Focus Task Decider',
      description: 'Frictionless priority selector',
      paletteKey: 'retro',
      items: [
        { id: 'pr-1', text: 'Clear Email Inbox (15 mins)', weight: 1 },
        { id: 'pr-2', text: 'Write Next Milestone Draft', weight: 1 },
        { id: 'pr-3', text: 'Review Pending Code / Documents', weight: 1 },
        { id: 'pr-4', text: 'Organize Workspace & Desk', weight: 1 },
        { id: 'pr-5', text: 'Send 3 Follow-Up Communications', weight: 1 },
        { id: 'pr-6', text: 'Outline Tomorrow’s Key Objectives', weight: 1 }
      ]
    },
    instructions: [
      'List 4 to 8 tasks that you have been avoiding or postponing.',
      'Spin the wheel and commit to working on the selected item for a focused 20-minute sprint.',
      'Enable Elimination mode to strike completed tasks off the wheel as you conquer your day.'
    ],
    whoItsUsefulFor: [
      {
        audience: 'ADHD & Executive Dysfunction Adults',
        benefit: 'Removes the cognitive overwhelm of prioritizing competing micro-tasks.'
      },
      {
        audience: 'Remote Workers & Freelancers',
        benefit: 'Provides structured Pomodoro breaks and keeps afternoon productivity consistent.'
      }
    ],
    useCases: [
      {
        title: 'The 15-Minute Declutter Sprint',
        benefit: 'Spin to pick one room or corner (kitchen counter, desk, closet) and clean for 15 minutes.',
        description: 'Spin to pick one room or corner (kitchen counter, desk, closet) and clean for 15 minutes.'
      },
      {
        title: 'Micro-Habit Daily Stacking',
        benefit: 'Spin for a quick 2-minute atomic habit: drink water, do 10 pushups, or write one journal sentence.',
        description: 'Spin for a quick 2-minute atomic habit: drink water, do 10 pushups, or write one journal sentence.'
      }
    ],
    customizationOptions: [
      {
        title: 'Weight by Priority',
        description: 'Give high-urgency tasks a 3x or 5x weight while keeping quick wins on the wheel.'
      }
    ],
    resultExplanation: 'Hardware-entropy guarantees impartial task selection, preventing subconscious avoidance of hard tasks.',
    uniqueExamples: [
      'Pomodoro Breaks: Stretches, Hydrate & Walk, 5-Min Meditation, Eye Rest, Quick Snack'
    ],
    tips: [
      'Once the wheel lands on a task, start working within 5 seconds to bypass mental resistance.'
    ],
    uniqueContentBlocks: [
      {
        heading: 'Action Precedes Motivation: The Science of Task Initiation',
        body: [
          'Many people believe they need to "feel motivated" before starting a difficult task. Psychological research shows the opposite: physical action triggers dopamine release, which generates subsequent motivation.',
          'By offloading the agonizing decision of "what should I do next?" to an objective wheel, you bypass the amygdala’s resistance and jump straight into momentum.'
        ]
      }
    ],
    faqs: [
      {
        question: 'What if I land on a task that I truly cannot do right now?',
        answer: 'You can remove or disable that slice temporarily using the Edit Items toggle.'
      }
    ],
    relatedTools: [
      { name: 'Pomodoro Break Wheel', path: '/pomodoro-break-wheel', description: 'Restful 5-minute break ideas.' },
      { name: 'Declutter Zone Wheel', path: '/declutter-zone-wheel', description: 'Rapid home cleaning sprints.' },
      { name: 'Micro Habit Wheel', path: '/micro-habit-wheel', description: '2-minute daily habit builders.' }
    ],
    relatedWheels: [
      { name: 'Pomodoro Break Wheel', path: '/pomodoro-break-wheel', count: 6 }
    ],
    relatedGuides: [
      { name: 'Decision Fatigue & The Psychology of Chance', path: '/decision-fatigue-and-the-psychology-of-chance', readingTime: '7 min' }
    ],
    internalLinks: [
      { label: 'Explore Productivity Hub', href: '/productivity', context: 'All productivity tools.' }
    ],
    breadcrumbs: [
      { name: 'Home', item: 'https://spinwheelgames.org' },
      { name: 'Productivity & Habits', item: 'https://spinwheelgames.org/productivity' }
    ]
  },

  wellness: {
    slug: 'wellness',
    fullPath: '/wellness',
    pageType: 'category',
    title: 'Wellness Wheels – Self-Care & Mindfulness Spinners',
    metaDescription: 'Nurture mental health and daily calm. Spin mindfulness wheels for guided breathing exercises, self-care ideas, gratitude prompts, and affirmations.',
    h1: 'Wellness & Mindfulness Wheels: Self-Care & Calm',
    introduction: 'Incorporate somatic mindfulness and mental clarity into chaotic days. When stress levels peak, intentional pause rituals restore emotional balance. Our wellness wheels provide gentle, spontaneous invitations for grounding exercises, restorative breaths, and self-compassion practices.',
    primaryIntent: 'educational',
    secondaryIntents: ['decision', 'entertainment'],
    categoryKey: 'wellness',
    parentCategoryPath: '/',
    parentCategoryName: 'Home',
    featureBadges: [
      'Guided Breathing Paces',
      'Gratitude Reflections',
      'Somatic Grounding Cues',
      'Web Crypto CSPRNG',
      '100% Free'
    ],
    defaultWheelData: {
      title: 'Mindful Pause Spinner',
      description: 'Centering exercises & grounding cues',
      paletteKey: 'ocean',
      items: [
        { id: 'wl-1', text: '4-7-8 Deep Breathing (3 cycles)', weight: 1 },
        { id: 'wl-2', text: '5-4-3-2-1 Sensory Grounding', weight: 1 },
        { id: 'wl-3', text: 'Write Down 3 Specific Gratitudes', weight: 1 },
        { id: 'wl-4', text: 'Full Body Tension & Release Scan', weight: 1 },
        { id: 'wl-5', text: 'Step Outside & Feel Sunlight (5 mins)', weight: 1 },
        { id: 'wl-6', text: 'Hydrate Slowly with Mindful Presence', weight: 1 }
      ]
    },
    instructions: [
      'Spin the wheel when feeling overwhelmed, tense, or scattered.',
      'Take a deep breath and dedicate 2 to 5 minutes exclusively to the chosen mindfulness practice.',
      'Notice the physical shift in your shoulders, jaw, and breath rate before returning to your day.'
    ],
    whoItsUsefulFor: [
      {
        audience: 'Stressed Professionals & Students',
        benefit: 'Provides rapid 3-minute somatic resets between demanding cognitive tasks.'
      },
      {
        audience: 'Wellness Coaches & Therapists',
        benefit: 'Engaging interactive visual aid for opening or closing mindfulness sessions.'
      }
    ],
    useCases: [
      {
        title: 'Morning Centering Ritual',
        benefit: 'Start each day by spinning for an intentional affirmation or gratitude focal point.',
        description: 'Start each day by spinning for an intentional affirmation or gratitude focal point.'
      },
      {
        title: 'Midday Anxiety De-escalation',
        benefit: 'Use physiological sigh breathing or progressive muscle relaxation cues when stressed.',
        description: 'Use physiological sigh breathing or progressive muscle relaxation cues when stressed.'
      }
    ],
    customizationOptions: [
      {
        title: 'Personalized Affirmations',
        description: 'Add your own mantra, cognitive reframe, or therapeutic reminder to the wheel.'
      }
    ],
    resultExplanation: 'Balanced randomness introduces unexpected joy and prevents mindfulness routines from feeling like chores.',
    uniqueExamples: [
      'Self-Care Prompts: Unplug for 30 minutes, Warm tea, Call a friend, Stretch spine, Gentle walk'
    ],
    tips: [
      'Drop your shoulders and unclench your jaw while watching the wheel spin to trigger a parasympathetic response.'
    ],
    uniqueContentBlocks: [
      {
        heading: 'Somatic Grounding: Moving Out of Cognitive Overdrive',
        body: [
          'Modern lifestyle keeps our nervous systems trapped in sympathetic fight-or-flight states. When you sit at a computer worrying about deadlines, cortisol levels remain elevated.',
          'Small micro-interventions—like 60 seconds of diaphragmatic breathing or naming 5 visual textures around you—signal immediate safety to the vagus nerve. Gamifying this pause makes daily self-care accessible and effortless.'
        ]
      }
    ],
    faqs: [
      {
        question: 'How long should each mindfulness activity take?',
        answer: 'Most activities are designed for 2 to 5 minutes, making them easy to fit into busy schedules.'
      }
    ],
    relatedTools: [
      { name: 'Mindfulness Exercise Wheel', path: '/mindfulness-exercise-wheel', description: 'Somatic grounding cues.' },
      { name: 'Gratitude Prompt Wheel', path: '/gratitude-prompt-wheel', description: 'Daily positive reflections.' },
      { name: 'Breathing Exercise Wheel', path: '/breathing-exercise-wheel', description: 'Paced breathwork patterns.' }
    ],
    relatedWheels: [
      { name: 'Mindfulness Exercise Wheel', path: '/mindfulness-exercise-wheel', count: 6 }
    ],
    relatedGuides: [
      { name: 'Decision Fatigue & The Psychology of Chance', path: '/decision-fatigue-and-the-psychology-of-chance', readingTime: '7 min' }
    ],
    internalLinks: [
      { label: 'Explore Wellness Hub', href: '/wellness', context: 'All mindfulness wheels.' }
    ],
    breadcrumbs: [
      { name: 'Home', item: 'https://spinwheelgames.org' },
      { name: 'Wellness & Mindfulness', item: 'https://spinwheelgames.org/wellness' }
    ]
  },

  'date-night': {
    slug: 'date-night',
    fullPath: '/date-night',
    pageType: 'category',
    title: 'Date Night Wheels – Romantic Couples Deciders',
    metaDescription: 'End the "I don\'t know, what do you want to do?" date night debate. Spin romantic dinner ideas, living-room dates, conversation questions, and weekend plans.',
    h1: 'Date Night Wheels & Romantic Deciders for Couples',
    introduction: 'Keep romantic spontaneity vibrant and eliminate relationship decision stalemates. After long workweeks, couples often spend an hour arguing over where to eat or what movie to watch until everyone feels drained. Our date night wheels turn evening planning into an exciting, collaborative game.',
    primaryIntent: 'decision',
    secondaryIntents: ['entertainment', 'party'],
    categoryKey: 'date-night',
    parentCategoryPath: '/',
    parentCategoryName: 'Home',
    featureBadges: [
      'Eliminates Date Stalemate',
      'At-Home & Outbound Ideas',
      'Deep Conversation Prompts',
      'Web Crypto CSPRNG',
      '100% Free'
    ],
    defaultWheelData: {
      title: 'Spontaneous Date Decider',
      description: 'Romantic evening activity spinner',
      paletteKey: 'berry',
      items: [
        { id: 'dn-1', text: 'Cook Homemade Pasta Together', weight: 1 },
        { id: 'dn-2', text: 'Cocktail & Dessert Crawl in Town', weight: 1 },
        { id: 'dn-3', text: 'Living Room Blanket Fort & Indie Film', weight: 1 },
        { id: 'dn-4', text: 'Stargazing with Warm Cider', weight: 1 },
        { id: 'dn-5', text: 'Arcade or Mini Golf Challenge', weight: 1 },
        { id: 'dn-6', text: 'Cook Mystery 3-Ingredient Challenge', weight: 1 }
      ]
    },
    instructions: [
      'Both partners write down 3 date ideas they genuinely want to do.',
      'Add all 6 ideas to the wheel so every option has equal buy-in.',
      'Spin the wheel once and honor the outcome together without renegotiating.'
    ],
    whoItsUsefulFor: [
      {
        audience: 'Long-Term Couples & Spouses',
        benefit: 'Re-ignites playful unpredictability and breaks routine dinner-and-TV ruts.'
      },
      {
        audience: 'New Dating Relationships',
        benefit: 'Offers lighthearted icebreakers and engaging low-pressure activities.'
      }
    ],
    useCases: [
      {
        title: 'Friday Evening Decision Settle',
        benefit: 'Pick dinner cuisine and night activity in under 30 seconds without bickering.',
        description: 'Pick dinner cuisine and night activity in under 30 seconds without bickering.'
      },
      {
        title: 'Intimate Conversation Nights',
        benefit: 'Spin for vulnerable, thoughtful questions that bring deeper emotional connection.',
        description: 'Spin for vulnerable, thoughtful questions that bring deeper emotional connection.'
      }
    ],
    customizationOptions: [
      {
        title: 'Budget-Friendly Filters',
        description: 'Create wheels strictly for zero-cost living-room dates or special splurge celebrations.'
      }
    ],
    resultExplanation: 'Impartial cryptographic draws eliminate the resentment of one partner always having to plan everything.',
    uniqueExamples: [
      'At-Home Dates: Board game marathon, Paint and sip, DIY pizza, Fondue night'
    ],
    tips: [
      'Make a pact: neither partner can veto the chosen date once the wheel stops!'
    ],
    uniqueContentBlocks: [
      {
        heading: 'Why Outsourcing Low-Stakes Romance Planning Deepens Connection',
        body: [
          'In many relationships, one partner unintentionally shoulders the mental load of organizing outings. This dynamic can build subtle resentment over time.',
          'By turning date selection into a collaborative wheel spin where both partners contribute ideas, decision friction evaporates. You shift from debating logistics to enjoying shared anticipation.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Can we add our own favorite restaurants?',
        answer: 'Yes! Click Edit Items and paste your favorite date spots directly into the wheel.'
      }
    ],
    relatedTools: [
      { name: 'Date Night Wheel', path: '/date-night-wheel', description: 'Core date decider.' },
      { name: 'Couples Question Wheel', path: '/couples-question-wheel', description: 'Intimate conversation prompts.' },
      { name: 'At-Home Date Wheel', path: '/at-home-date-wheel', description: 'Cozy living-room activities.' }
    ],
    relatedWheels: [
      { name: 'Date Night Wheel', path: '/date-night-wheel', count: 6 }
    ],
    relatedGuides: [
      { name: 'Decision Fatigue & The Psychology of Chance', path: '/decision-fatigue-and-the-psychology-of-chance', readingTime: '7 min' }
    ],
    internalLinks: [
      { label: 'Explore Date Night Hub', href: '/date-night', context: 'All couple wheels.' }
    ],
    breadcrumbs: [
      { name: 'Home', item: 'https://spinwheelgames.org' },
      { name: 'Date Night & Couples', item: 'https://spinwheelgames.org/date-night' }
    ]
  },

  icebreakers: {
    slug: 'icebreakers',
    fullPath: '/icebreakers',
    pageType: 'category',
    title: 'Icebreaker Wheels – Meeting Warmups & Energizers',
    metaDescription: 'Energize remote standups, Zoom meetings, and corporate workshops. Spin random icebreaker questions, fun facts, and team building activities.',
    h1: 'Icebreaker Wheels & Team Building Warmup Spinners',
    introduction: 'Transform awkward video call silences into genuine laughter and team camaraderie. Whether kickstarting agile morning standups, introducing new hires, or breaking the ice at company offsites, our icebreaker wheels make participation effortless, fair, and fun for all team members.',
    primaryIntent: 'event',
    secondaryIntents: ['classroom', 'entertainment'],
    categoryKey: 'icebreakers',
    parentCategoryPath: '/',
    parentCategoryName: 'Home',
    featureBadges: [
      'Zoom & Teams Screen Share',
      'Non-Awkward Questions',
      'Equal Speaking Order',
      'Web Crypto CSPRNG',
      '100% Free'
    ],
    defaultWheelData: {
      title: 'Meeting Icebreaker Wheel',
      description: 'Energize meetings and standups',
      paletteKey: 'cyberpunk',
      items: [
        { id: 'ib-1', text: 'Best meal you ate this past month?', weight: 1 },
        { id: 'ib-2', text: 'One app on your phone you can\'t live without?', weight: 1 },
        { id: 'ib-3', text: 'Dream travel destination if budget was zero?', weight: 1 },
        { id: 'ib-4', text: 'Favorite fictional universe to live in?', weight: 1 },
        { id: 'ib-5', text: 'Unpopular opinion about food or movies?', weight: 1 },
        { id: 'ib-6', text: 'One skill you would love to master instantly?', weight: 1 }
      ]
    },
    instructions: [
      'Share your screen on Zoom, Google Meet, or Microsoft Teams.',
      'Spin the wheel to present a prompt to the entire group or pick a random speaker.',
      'Keep answers brief (30-60 seconds) to maintain high energy before transitioning into your agenda.'
    ],
    whoItsUsefulFor: [
      {
        audience: 'Scrum Masters & Agile Coaches',
        benefit: 'Breaks monotony during daily standups and sprint retrospectives.'
      },
      {
        audience: 'Workshop Facilitators & People Ops',
        benefit: 'Creates quick psychological safety for remote teams across international time zones.'
      }
    ],
    useCases: [
      {
        title: 'Daily Standup Speaking Order',
        benefit: 'Randomize the order in which engineers give status updates so nobody anticipates being last.',
        description: 'Randomize the order in which engineers give status updates so nobody anticipates being last.'
      },
      {
        title: 'New Hire Welcome Mixers',
        benefit: 'Help teammates learn surprising fun facts about coworkers without cheesy team exercises.',
        description: 'Help teammates learn surprising fun facts about coworkers without cheesy team exercises.'
      }
    ],
    customizationOptions: [
      {
        title: 'Professional vs Casual Tone',
        description: 'Choose between workplace-appropriate light questions or deeper reflective retros.'
      }
    ],
    resultExplanation: 'True randomness guarantees that team hierarchy is removed during social games—interns and executives have identical odds.',
    uniqueExamples: [
      'Warmup Questions: Weirdest childhood pet, Favorite concert, Coffee order, Go-to karaoke song'
    ],
    tips: [
      'Always have the meeting leader answer the first question to set a vulnerable, relaxed tone.'
    ],
    uniqueContentBlocks: [
      {
        heading: 'The Power of 3-Minute Warmups: Building Remote Psychological Safety',
        body: [
          'In remote and hybrid workplaces, organic watercooler conversations disappear. Team interactions become strictly transactional, which dampens creative problem-solving and trust.',
          'Spending just 3 minutes at the start of a meeting on a randomized icebreaker question activates social engagement and creates psychological safety, leading to more vocal, innovative collaborative sessions.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Does this work smoothly over Zoom screen sharing?',
        answer: 'Yes! The smooth 60fps canvas animations and Web Audio sound effects transmit crisply over all video conferencing software.'
      }
    ],
    relatedTools: [
      { name: 'Zoom Icebreaker Wheel', path: '/zoom-icebreaker-wheel', description: 'Video call warmups.' },
      { name: 'Standup Meeting Order Wheel', path: '/standup-meeting-order-wheel', description: 'Scrum speaking order.' },
      { name: 'Fun Fact Wheel', path: '/fun-fact-wheel', description: 'Team trivia and personal stories.' }
    ],
    relatedWheels: [
      { name: 'Zoom Icebreaker Wheel', path: '/zoom-icebreaker-wheel', count: 6 }
    ],
    relatedGuides: [
      { name: 'How to Pick a Random Winner', path: '/how-to-pick-a-random-winner', readingTime: '5 min' }
    ],
    internalLinks: [
      { label: 'Explore Icebreakers Hub', href: '/icebreakers', context: 'All team warmups.' }
    ],
    breadcrumbs: [
      { name: 'Home', item: 'https://spinwheelgames.org' },
      { name: 'Icebreakers & Teams', item: 'https://spinwheelgames.org/icebreakers' }
    ]
  },

  finance: {
    slug: 'finance',
    fullPath: '/finance',
    pageType: 'category',
    title: 'Finance Wheels – Savings Challenges & Budget Deciders',
    metaDescription: 'Gamify your personal finances. Spin money wheels for 30-day savings challenges, no-spend weekend activities, side hustle ideas, and splurge deciders.',
    h1: 'Finance & Budgeting Wheels: Gamified Savings & Money Deciders',
    introduction: 'Transform personal finance and budgeting from a chore into an engaging, gamified habit. Whether building an emergency fund, enforcing cooling-off periods on discretionary splurges, or challenging yourself to a no-spend weekend, our finance wheels help you build wealth with a smile.',
    primaryIntent: 'educational',
    secondaryIntents: ['decision', 'transactional/use tool'],
    categoryKey: 'finance',
    parentCategoryPath: '/',
    parentCategoryName: 'Home',
    featureBadges: [
      'Micro-Savings Sprints',
      'No-Spend Weekend Ideas',
      'Impulse Cooling Off Sorter',
      'Web Crypto CSPRNG',
      '100% Free'
    ],
    defaultWheelData: {
      title: 'Micro-Savings Sprint Wheel',
      description: 'Gamify your daily savings transfers',
      paletteKey: 'forest',
      items: [
        { id: 'fn-1', text: 'Transfer $5 to Emergency Fund', weight: 1 },
        { id: 'fn-2', text: 'Transfer $10 to Vacation Vault', weight: 1 },
        { id: 'fn-3', text: 'Transfer $15 to Investment Account', weight: 1 },
        { id: 'fn-4', text: 'Skip One Commercial Takeout Today', weight: 1 },
        { id: 'fn-5', text: 'Transfer $20 to Debt Paydown', weight: 1 },
        { id: 'fn-6', text: 'Zero-Spend Challenge Today', weight: 1 }
      ]
    },
    instructions: [
      'Choose a money game: daily micro-savings transfer, no-spend weekend activity, or splurge decider.',
      'Spin the wheel once per day or week.',
      'Execute the financial transfer or money-saving habit immediately in your banking app.'
    ],
    whoItsUsefulFor: [
      {
        audience: 'Frugal Living & Debt-Free Journeyers',
        benefit: 'Adds fun milestone excitement to repetitive long-term savings marathons.'
      },
      {
        audience: 'Impulse Shoppers',
        benefit: 'Introduces a healthy 48-hour cooling-off delay on non-essential online shopping.'
      }
    ],
    useCases: [
      {
        title: 'Weekly Micro-Savings Challenge',
        benefit: 'Spin every Monday to decide whether to stash away $5, $15, or $25 into high-yield savings.',
        description: 'Spin every Monday to decide whether to stash away $5, $15, or $25 into high-yield savings.'
      },
      {
        title: 'The Splurge-or-Wait Arbitrator',
        benefit: 'If tempted by an unplanned $50 purchase, spin to test if you truly need it now.',
        description: 'If tempted by an unplanned $50 purchase, spin to test if you truly need it now.'
      }
    ],
    customizationOptions: [
      {
        title: 'Currency & Dollar Tiers',
        description: 'Customize amounts for $1, $5, $50, or custom currency symbols like € or £.'
      }
    ],
    resultExplanation: 'Impartial randomness helps remove cognitive bias and strengthens willpower through gamification.',
    uniqueExamples: [
      'No-Spend Activities: Library book marathon, Local park picnic, Cook pantry challenge, Board game night'
    ],
    tips: [
      'Pair your savings wheel spins with immediate bank app transfers to build a strong dopamine reward loop.'
    ],
    uniqueContentBlocks: [
      {
        heading: 'Gamification & Behavioral Economics: Why Micro-Saves Beat Rigid Budgets',
        body: [
          'Traditional budgeting often fails because it feels punitive and restrictive. When people feel deprived of small daily pleasures, they eventually binge-spend out of willpower exhaustion.',
          'Behavioral economists find that gamified micro-savings—treating daily savings transfers as small lottery wins or habit streaks—trigger positive reinforcement. Small, consistent actions compound into massive long-term financial security.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Does this wheel connect to my bank account?',
        answer: 'No. For complete privacy and security, SpinWheelGames runs 100% client-side and never accesses financial accounts or data.'
      }
    ],
    relatedTools: [
      { name: 'No Spend Weekend Wheel', path: '/no-spend-weekend-wheel', description: 'Zero-cost fun activities.' },
      { name: 'Micro Savings Goal Wheel', path: '/micro-savings-goal-wheel', description: 'Daily savings transfers.' },
      { name: 'Splurge or Save Wheel', path: '/splurge-or-save-wheel', description: 'Impulse purchase decider.' }
    ],
    relatedWheels: [
      { name: 'No Spend Weekend Wheel', path: '/no-spend-weekend-wheel', count: 6 }
    ],
    relatedGuides: [
      { name: 'Decision Fatigue & The Psychology of Chance', path: '/decision-fatigue-and-the-psychology-of-chance', readingTime: '7 min' }
    ],
    internalLinks: [
      { label: 'Explore Finance Hub', href: '/finance', context: 'All financial wheels.' }
    ],
    breadcrumbs: [
      { name: 'Home', item: 'https://spinwheelgames.org' },
      { name: 'Finance & Budgeting', item: 'https://spinwheelgames.org/finance' }
    ]
  }
};
