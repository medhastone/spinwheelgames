export type AppCategory =
  | 'mobile-games'
  | 'streaming-entertainment'
  | 'productivity-work'
  | 'learning-reading'
  | 'social-communication'
  | 'fitness-wellness'
  | 'creative-design'
  | 'custom';

export interface AppItem {
  id: string;
  name: string;
  category: AppCategory;
  platform: 'Cross-Platform' | 'iOS & Android' | 'Web & Mobile';
  useCase: string;
  actionPrompt: string; // What to do once picked (e.g. "Do 1 lesson", "Play 1 round", "Read 1 chapter")
  iconName?: string;
  color?: string;
  tags?: string[];
  isCustom?: boolean;
}

export const PRESET_APP_CATEGORIES: {
  id: AppCategory;
  label: string;
  shortLabel: string;
  description: string;
  color: string;
  icon: string;
}[] = [
  {
    id: 'mobile-games',
    label: 'Casual & Mobile Games',
    shortLabel: 'Mobile Games',
    description: 'Bite-sized puzzlers, strategy, and casual games for quick gameplay sessions.',
    color: '#ec4899',
    icon: 'Gamepad2'
  },
  {
    id: 'streaming-entertainment',
    label: 'Streaming & Video',
    shortLabel: 'Streaming',
    description: 'Decide what streaming app to open when you cannot agree on what to watch.',
    color: '#8b5cf6',
    icon: 'Tv'
  },
  {
    id: 'productivity-work',
    label: 'Productivity & Focus',
    shortLabel: 'Productivity',
    description: 'Tackle task paralysis by picking an app to make immediate progress on.',
    color: '#3b82f6',
    icon: 'CheckSquare'
  },
  {
    id: 'learning-reading',
    label: 'Learning & Reading',
    shortLabel: 'Learning',
    description: 'Language practice, audiobooks, flashcards, and daily knowledge apps.',
    color: '#10b981',
    icon: 'BookOpen'
  },
  {
    id: 'social-communication',
    label: 'Social & Messaging',
    shortLabel: 'Social',
    description: 'Pick an app to reply to pending messages or reconnect with friends.',
    color: '#06b6d4',
    icon: 'MessageCircle'
  },
  {
    id: 'fitness-wellness',
    label: 'Fitness & Health',
    shortLabel: 'Wellness',
    description: 'Workout timers, meditation guides, yoga routines, and step trackers.',
    color: '#f59e0b',
    icon: 'Flame'
  },
  {
    id: 'creative-design',
    label: 'Creative & Hobby',
    shortLabel: 'Creative',
    description: 'Drawing canvas, music production, photo editing, and journaling tools.',
    color: '#a855f7',
    icon: 'Palette'
  },
  {
    id: 'custom',
    label: 'My Custom Apps List',
    shortLabel: 'Custom List',
    description: 'Add or bulk paste your phone’s installed apps to spin your own personal picker.',
    color: '#6366f1',
    icon: 'Sliders'
  }
];

export const APP_CATALOG: AppItem[] = [
  // Mobile Games
  {
    id: 'app-g-1',
    name: 'Subway Surfers',
    category: 'mobile-games',
    platform: 'iOS & Android',
    useCase: 'Endless high-score runner',
    actionPrompt: 'Run 2 high-score attempts without crashing!'
  },
  {
    id: 'app-g-2',
    name: 'Candy Crush Saga',
    category: 'mobile-games',
    platform: 'iOS & Android',
    useCase: 'Match-3 color puzzle',
    actionPrompt: 'Play until you beat 1 new level or run out of lives.'
  },
  {
    id: 'app-g-3',
    name: 'Clash Royale',
    category: 'mobile-games',
    platform: 'iOS & Android',
    useCase: 'Real-time 1v1 tactical battle',
    actionPrompt: 'Queue into 1 competitive ladder or party match.'
  },
  {
    id: 'app-g-4',
    name: 'Chess.com',
    category: 'mobile-games',
    platform: 'Cross-Platform',
    useCase: 'Board strategy & puzzles',
    actionPrompt: 'Solve 3 tactical puzzles or play 1 blitz game.'
  },
  {
    id: 'app-g-5',
    name: 'Genshin Impact',
    category: 'mobile-games',
    platform: 'Cross-Platform',
    useCase: 'Open-world RPG adventure',
    actionPrompt: 'Complete your 4 daily commissions.'
  },
  {
    id: 'app-g-6',
    name: 'Brawl Stars',
    category: 'mobile-games',
    platform: 'iOS & Android',
    useCase: 'Fast 3v3 action shooter',
    actionPrompt: 'Play 2 gem grab or showdown battles.'
  },
  {
    id: 'app-g-7',
    name: 'Monument Valley',
    category: 'mobile-games',
    platform: 'iOS & Android',
    useCase: 'Optical illusion geometric puzzle',
    actionPrompt: 'Explore and solve 1 architectural chapter.'
  },
  {
    id: 'app-g-8',
    name: 'Balatro / Card Roguelike',
    category: 'mobile-games',
    platform: 'Cross-Platform',
    useCase: 'Poker deck-building roguelike',
    actionPrompt: 'Start 1 fresh run and defeat Ante 3.'
  },
  {
    id: 'app-g-9',
    name: 'Among Us',
    category: 'mobile-games',
    platform: 'Cross-Platform',
    useCase: 'Social deduction party game',
    actionPrompt: 'Join 1 lobby and complete your tasks.'
  },
  {
    id: 'app-g-10',
    name: 'Wordle / NYT Games',
    category: 'mobile-games',
    platform: 'Web & Mobile',
    useCase: 'Daily word & logic puzzles',
    actionPrompt: 'Complete today’s Wordle and Connections puzzles.'
  },

  // Streaming & Entertainment
  {
    id: 'app-s-1',
    name: 'Netflix',
    category: 'streaming-entertainment',
    platform: 'Cross-Platform',
    useCase: 'Movies, original series & documentaries',
    actionPrompt: 'Watch the next episode on your Continue Watching list.'
  },
  {
    id: 'app-s-2',
    name: 'YouTube',
    category: 'streaming-entertainment',
    platform: 'Cross-Platform',
    useCase: 'Creator videos, podcasts & tutorials',
    actionPrompt: 'Watch 1 video from your Watch Later playlist.'
  },
  {
    id: 'app-s-3',
    name: 'Spotify',
    category: 'streaming-entertainment',
    platform: 'Cross-Platform',
    useCase: 'Music playlists & audio podcasts',
    actionPrompt: 'Listen to a Discover Weekly or Release Radar mix.'
  },
  {
    id: 'app-s-4',
    name: 'Disney+',
    category: 'streaming-entertainment',
    platform: 'Cross-Platform',
    useCase: 'Animated classics, Marvel & Star Wars',
    actionPrompt: 'Pick a movie you have not watched in over a year.'
  },
  {
    id: 'app-s-5',
    name: 'Amazon Prime Video',
    category: 'streaming-entertainment',
    platform: 'Cross-Platform',
    useCase: 'Blockbuster films & TV drama',
    actionPrompt: 'Stream an episode of a trending drama.'
  },
  {
    id: 'app-s-6',
    name: 'Twitch',
    category: 'streaming-entertainment',
    platform: 'Cross-Platform',
    useCase: 'Live gameplay & community broadcasts',
    actionPrompt: 'Drop into a favorite streamer’s live chat.'
  },
  {
    id: 'app-s-7',
    name: 'Apple TV+',
    category: 'streaming-entertainment',
    platform: 'Cross-Platform',
    useCase: 'Prestige cinema & award-winning shows',
    actionPrompt: 'Watch 1 episode of an original sci-fi or comedy series.'
  },
  {
    id: 'app-s-8',
    name: 'HBO Max',
    category: 'streaming-entertainment',
    platform: 'Cross-Platform',
    useCase: 'Feature films & HBO originals',
    actionPrompt: 'Put on a critically acclaimed film.'
  },

  // Productivity & Work
  {
    id: 'app-p-1',
    name: 'Notion',
    category: 'productivity-work',
    platform: 'Cross-Platform',
    useCase: 'All-in-one workspace & notes',
    actionPrompt: 'Review and check off 2 items on your project board.'
  },
  {
    id: 'app-p-2',
    name: 'Todoist',
    category: 'productivity-work',
    platform: 'Cross-Platform',
    useCase: 'Task manager & daily checklist',
    actionPrompt: 'Clear your "Today" overdue list and schedule tomorrow.'
  },
  {
    id: 'app-p-3',
    name: 'Google Calendar',
    category: 'productivity-work',
    platform: 'Cross-Platform',
    useCase: 'Time blocking & scheduling',
    actionPrompt: 'Plan out time blocks for your top 3 goals this week.'
  },
  {
    id: 'app-p-4',
    name: 'Obsidian',
    category: 'productivity-work',
    platform: 'Cross-Platform',
    useCase: 'Markdown knowledge vault & linking',
    actionPrompt: 'Write 1 atomic note on an idea you learned recently.'
  },
  {
    id: 'app-p-5',
    name: 'Forest / Pomodoro Timer',
    category: 'productivity-work',
    platform: 'iOS & Android',
    useCase: 'Focused deep work intervals',
    actionPrompt: 'Plant a 25-minute tree and stay off your phone.'
  },
  {
    id: 'app-p-6',
    name: 'Slack / Teams',
    category: 'productivity-work',
    platform: 'Cross-Platform',
    useCase: 'Workplace chat & async team updates',
    actionPrompt: 'Clear unread channel pings and post your daily update.'
  },
  {
    id: 'app-p-7',
    name: 'Trello',
    category: 'productivity-work',
    platform: 'Cross-Platform',
    useCase: 'Kanban boards & sprint tracking',
    actionPrompt: 'Move 1 card from "In Progress" to "Done".'
  },

  // Learning & Reading
  {
    id: 'app-l-1',
    name: 'Duolingo',
    category: 'learning-reading',
    platform: 'Cross-Platform',
    useCase: 'Bite-sized language drills',
    actionPrompt: 'Complete 2 language lessons to extend your streak!'
  },
  {
    id: 'app-l-2',
    name: 'Kindle / Apple Books',
    category: 'learning-reading',
    platform: 'Cross-Platform',
    useCase: 'E-reader for digital books',
    actionPrompt: 'Read 1 full chapter of your current book.'
  },
  {
    id: 'app-l-3',
    name: 'Audible / Libby',
    category: 'learning-reading',
    platform: 'Cross-Platform',
    useCase: 'Audiobooks & library lending',
    actionPrompt: 'Listen to 15 minutes of your audiobook while walking.'
  },
  {
    id: 'app-l-4',
    name: 'Anki / Quizlet',
    category: 'learning-reading',
    platform: 'Cross-Platform',
    useCase: 'Spaced repetition flashcards',
    actionPrompt: 'Review 20 due cards in your study deck.'
  },
  {
    id: 'app-l-5',
    name: 'Khan Academy',
    category: 'learning-reading',
    platform: 'Cross-Platform',
    useCase: 'Free courses in math, science & history',
    actionPrompt: 'Watch 1 lecture and complete the practice quiz.'
  },
  {
    id: 'app-l-6',
    name: 'Medium / Substack',
    category: 'learning-reading',
    platform: 'Cross-Platform',
    useCase: 'Longform essays & creator newsletters',
    actionPrompt: 'Read 1 in-depth article and highlight key takeaways.'
  },

  // Social & Communication
  {
    id: 'app-c-1',
    name: 'WhatsApp / Signal',
    category: 'social-communication',
    platform: 'Cross-Platform',
    useCase: 'Private encrypted messaging',
    actionPrompt: 'Reply to messages from family or close friends.'
  },
  {
    id: 'app-c-2',
    name: 'Discord',
    category: 'social-communication',
    platform: 'Cross-Platform',
    useCase: 'Voice, text & gaming communities',
    actionPrompt: 'Say hello in your favorite hobby or gaming server.'
  },
  {
    id: 'app-c-3',
    name: 'Instagram',
    category: 'social-communication',
    platform: 'Cross-Platform',
    useCase: 'Photo sharing, stories & visual feeds',
    actionPrompt: 'Check stories from close friends, then log off.'
  },
  {
    id: 'app-c-4',
    name: 'Reddit',
    category: 'social-communication',
    platform: 'Cross-Platform',
    useCase: 'Community discussions & niche subreddits',
    actionPrompt: 'Browse top posts in your favorite hobby subreddit.'
  },
  {
    id: 'app-c-5',
    name: 'LinkedIn',
    category: 'social-communication',
    platform: 'Cross-Platform',
    useCase: 'Professional networking & industry news',
    actionPrompt: 'Congratulate a connection or share an industry insight.'
  },
  {
    id: 'app-c-6',
    name: 'X (Twitter)',
    category: 'social-communication',
    platform: 'Cross-Platform',
    useCase: 'Breaking news & real-time commentary',
    actionPrompt: 'Check trending topics in your field of interest.'
  },

  // Fitness & Wellness
  {
    id: 'app-f-1',
    name: 'Strava',
    category: 'fitness-wellness',
    platform: 'Cross-Platform',
    useCase: 'Running, cycling & GPS activity logs',
    actionPrompt: 'Log a 20-minute run, brisk walk, or bike ride.'
  },
  {
    id: 'app-f-2',
    name: 'Headspace / Calm',
    category: 'fitness-wellness',
    platform: 'Cross-Platform',
    useCase: 'Guided meditation & mindful breathing',
    actionPrompt: 'Do a 5-minute mindful breathing or body scan session.'
  },
  {
    id: 'app-f-3',
    name: 'Nike Training Club',
    category: 'fitness-wellness',
    platform: 'iOS & Android',
    useCase: 'Guided bodyweight workouts & yoga',
    actionPrompt: 'Complete a quick 15-minute bodyweight routine.'
  },
  {
    id: 'app-f-4',
    name: 'MyFitnessPal',
    category: 'fitness-wellness',
    platform: 'Cross-Platform',
    useCase: 'Nutrition & water intake logging',
    actionPrompt: 'Log your meals and drink a full glass of water.'
  },
  {
    id: 'app-f-5',
    name: 'Seven - 7 Minute Workout',
    category: 'fitness-wellness',
    platform: 'iOS & Android',
    useCase: 'High-intensity scientific interval training',
    actionPrompt: 'Do 1 full 7-minute circuit right now.'
  },

  // Creative & Hobby
  {
    id: 'app-cr-1',
    name: 'Procreate / Infinite Painter',
    category: 'creative-design',
    platform: 'iOS & Android',
    useCase: 'Digital illustration & sketching',
    actionPrompt: 'Spend 15 minutes doing a warm-up character sketch.'
  },
  {
    id: 'app-cr-2',
    name: 'CapCut / Premiere Rush',
    category: 'creative-design',
    platform: 'Cross-Platform',
    useCase: 'Video editing & clip cutting',
    actionPrompt: 'Edit and trim 1 short clip for your video backlog.'
  },
  {
    id: 'app-cr-3',
    name: 'Lightroom Mobile',
    category: 'creative-design',
    platform: 'Cross-Platform',
    useCase: 'Photo color grading & editing',
    actionPrompt: 'Color grade 3 recent photos from your camera roll.'
  },
  {
    id: 'app-cr-4',
    name: 'GarageBand / BandLab',
    category: 'creative-design',
    platform: 'Cross-Platform',
    useCase: 'Music beat making & recording',
    actionPrompt: 'Lay down a 4-bar drum beat or chord progression.'
  },
  {
    id: 'app-cr-5',
    name: 'Canva',
    category: 'creative-design',
    platform: 'Cross-Platform',
    useCase: 'Social graphic design & posters',
    actionPrompt: 'Design 1 visual template or announcement graphic.'
  }
];

export const INITIAL_CUSTOM_APPS: AppItem[] = [
  {
    id: 'custom-app-1',
    name: 'My Backlog Game',
    category: 'custom',
    platform: 'iOS & Android',
    useCase: 'Personal game',
    actionPrompt: 'Launch and play through the next checkpoint.',
    isCustom: true
  },
  {
    id: 'custom-app-2',
    name: 'Podcasts App',
    category: 'custom',
    platform: 'Cross-Platform',
    useCase: 'Audio shows',
    actionPrompt: 'Listen to an unplayed episode from your subscriptions.',
    isCustom: true
  },
  {
    id: 'custom-app-3',
    name: 'Language Flashcards',
    category: 'custom',
    platform: 'Cross-Platform',
    useCase: 'Daily review',
    actionPrompt: 'Clear 15 cards before switching apps.',
    isCustom: true
  },
  {
    id: 'custom-app-4',
    name: 'E-Reader Shelf',
    category: 'custom',
    platform: 'Cross-Platform',
    useCase: 'Reading',
    actionPrompt: 'Read for 10 minutes undistracted.',
    isCustom: true
  }
];
