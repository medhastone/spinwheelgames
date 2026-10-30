import { KeywordContentMatrixItem } from './seoArchitecture';

export const KEYWORD_CONTENT_MATRIX: KeywordContentMatrixItem[] = [
  {
    url: '/',
    pageName: 'Homepage – SpinWheelGames',
    primaryKeyword: 'spin the wheel',
    secondaryKeywords: [
      'wheel of names',
      'random picker',
      'decision wheel',
      'picker wheel',
      'random choice generator'
    ],
    semanticTerms: [
      'unbiased randomizer',
      'cryptographic fairness',
      'classroom picker',
      'giveaway winner',
      'custom wheel creator'
    ],
    searchIntent: 'tool / discovery',
    targetAudience: 'Everyone seeking random decisions, teachers, event hosts, gamers',
    problemSolved: 'Provides instant, cryptographically fair random selection with custom presets and rich features',
    toolType: 'Interactive Full-Featured Wheel Engine',
    uniqueValue: 'Web Crypto API CSPRNG, zero ads, elimination mode, bulk paste',
    internalLinks: [
      '/spin-the-wheel',
      '/wheel-of-names',
      '/random-picker',
      '/bingo-wheel',
      '/classroom-wheel',
      '/food-wheel',
      '/number-wheel'
    ],
    sourceRequirements: ['W3C Web Cryptography API'],
    indexable: true
  },
  {
    url: '/bingo-wheel',
    pageName: 'Bingo Spin Wheel & Caller',
    primaryKeyword: 'bingo spin wheel',
    secondaryKeywords: [
      'bingo number generator',
      'bingo wheel',
      'random bingo caller',
      '75 ball bingo caller',
      'classroom bingo caller'
    ],
    semanticTerms: [
      'master call board',
      'no-repeat draw',
      'voice caller',
      'player bingo cards',
      'mini bingo 30 ball'
    ],
    searchIntent: 'game / classroom / party',
    targetAudience: 'Teachers, senior activity directors, party hosts, bingo players',
    problemSolved: 'Automates bingo number calling with real-time audio announcements, master matrix tracking, and card dabbing',
    toolType: 'Interactive Bingo Wheel & Voice Caller',
    uniqueValue: 'Multi-mode (75, 90, 30 ball), built-in digital player cards with 5-in-a-row detection, TTS voice',
    internalLinks: [
      '/classroom-wheel',
      '/number-wheel',
      '/random-object-generator',
      '/fairness'
    ],
    sourceRequirements: ['Standard 75-Ball & 90-Ball Bingo Rules', 'Web Speech Synthesis API'],
    indexable: true
  },
  {
    url: '/spin-the-wheel',
    pageName: 'Spin the Wheel – Free Online Spinner',
    primaryKeyword: 'spin the wheel',
    secondaryKeywords: [
      'spin wheel online',
      'custom spinner wheel',
      'random wheel spinner',
      'online spin wheel'
    ],
    semanticTerms: [
      'custom slices',
      'slice weighting',
      'fair spin physics',
      'party game spinner',
      'random choice wheel'
    ],
    searchIntent: 'tool / decision',
    targetAudience: 'General users, streamers, educators, contest hosts',
    problemSolved: 'Simplifies group decisions and random choices with an easy-to-use customizable wheel',
    toolType: 'Configurable Wheel Spinner',
    uniqueValue: 'CSPRNG randomness, weight editor, bulk text import, multi-palette styling',
    internalLinks: [
      '/wheel-of-names',
      '/random-picker',
      '/decision-wheel',
      '/food-wheel'
    ],
    sourceRequirements: ['W3C Web Cryptography API'],
    indexable: true
  },
  {
    url: '/wheel-of-names',
    pageName: 'Wheel of Names – Random Name Picker',
    primaryKeyword: 'wheel of names',
    secondaryKeywords: [
      'random name picker',
      'name wheel',
      'pick a name wheel',
      'student name picker'
    ],
    semanticTerms: [
      'raffle winner',
      'classroom participation',
      'elimination draw',
      'student roster',
      'roster paste'
    ],
    searchIntent: 'classroom / contest / tool',
    targetAudience: 'Teachers, corporate meeting facilitators, giveaway organizers',
    problemSolved: 'Picks names fairly from any list with optional elimination to prevent repeat draws',
    toolType: 'Name Picker Wheel',
    uniqueValue: 'Fast bulk paste, elimination history, confetti celebration, winner card export',
    internalLinks: [
      '/classroom-wheel',
      '/giveaway-wheel',
      '/team-generator',
      '/spin-the-wheel'
    ],
    sourceRequirements: ['W3C Web Cryptography API'],
    indexable: true
  },
  {
    url: '/food-wheel',
    pageName: 'Food Wheel – What to Eat Spinner',
    primaryKeyword: 'food wheel',
    secondaryKeywords: [
      'what to eat wheel',
      'dinner spinner',
      'restaurant wheel',
      'lunch decision wheel'
    ],
    semanticTerms: [
      'meal decision',
      'cuisine options',
      'takeout picker',
      'group dining choice',
      'dietary filter'
    ],
    searchIntent: 'decision / everyday',
    targetAudience: 'Couples, families, coworkers, indecisive diners',
    problemSolved: 'Resolves "what should we eat?" debates in seconds with tailored cuisine presets',
    toolType: 'Food & Cuisine Spinner',
    uniqueValue: 'Preset cuisines (Italian, Mexican, Asian, Burgers, Healthy), meal category filters',
    internalLinks: [
      '/decision-wheel',
      '/random-picker',
      '/spin-the-wheel'
    ],
    sourceRequirements: ['Culinary Classification Presets'],
    indexable: true
  },
  {
    url: '/classroom-wheel',
    pageName: 'Classroom Wheel – Student Picker & Team Generator',
    primaryKeyword: 'classroom wheel',
    secondaryKeywords: [
      'random student picker',
      'teacher wheel',
      'classroom spinner',
      'student selector'
    ],
    semanticTerms: [
      'equal participation',
      'reading turn order',
      'group team maker',
      'smartboard display',
      'no-repeat roster'
    ],
    searchIntent: 'classroom / education',
    targetAudience: 'K-12 and university educators, tutors, workshop leaders',
    problemSolved: 'Guarantees equitable classroom participation without perceived teacher bias',
    toolType: 'Classroom Participation Hub',
    uniqueValue: 'Full-screen projector mode, team generator, reading order picker, roster saving',
    internalLinks: [
      '/wheel-of-names',
      '/question-wheel',
      '/bingo-wheel',
      '/team-generator'
    ],
    sourceRequirements: ['Pedagogical Random Participation Guidelines'],
    indexable: true
  },
  {
    url: '/number-wheel',
    pageName: 'Number Wheel – Random Number Generator 1-100',
    primaryKeyword: 'number wheel',
    secondaryKeywords: [
      'random number generator wheel',
      'pick a number wheel',
      'number spinner 1-100',
      'random number 1-10'
    ],
    semanticTerms: [
      'numerical range',
      'integer picker',
      'math games',
      'lottery number simulation',
      'exclusion filters'
    ],
    searchIntent: 'tool / math',
    targetAudience: 'Math teachers, gamers, raffle runners, statistics students',
    problemSolved: 'Selects random numbers from custom ranges (1-10, 1-50, 1-100) with visual wheel physics',
    toolType: 'Configurable Number Wheel',
    uniqueValue: 'Custom min/max intervals, step sizing, exclusion lists, cryptographic seed',
    internalLinks: [
      '/bingo-wheel',
      '/random-object-generator',
      '/spin-the-wheel'
    ],
    sourceRequirements: ['W3C Web Cryptography API'],
    indexable: true
  },
  {
    url: '/random-number-wheel',
    pageName: 'Random Number Wheel – Pick a Number Spinner (1-10, 1-20, 1-50, 1-100)',
    primaryKeyword: 'random number wheel',
    secondaryKeywords: [
      'picking a number',
      'number spinner',
      'spinner with numbers',
      'number spin wheel',
      'random number picker',
      'pick a number 1-10',
      'pick a number 1-20',
      'pick a number 1-50',
      'pick a number 1-100'
    ],
    semanticTerms: [
      'random number picker',
      'number spinner with audio',
      'no-repeat number elimination',
      'even odd number filter',
      'multiple number drawer',
      'custom range integers'
    ],
    searchIntent: 'tool / numbers / RNG',
    targetAudience: 'Teachers, gamers, raffle hosts, giveaway organizers, decision makers',
    problemSolved: 'Picks truly fair random numbers online with custom ranges (1-10, 1-20, 1-50, 1-100), no-repeat mode, parity filters, and batch drawing',
    toolType: 'Hardware CSPRNG Number Spin Wheel & Picker',
    uniqueValue: 'Sub-millisecond Web Crypto RNG, instant & wheel modes, even/odd filters, no-repeat elimination, batch draw',
    internalLinks: [
      '/number-wheel',
      '/bingo-wheel',
      '/dice-roller',
      '/fairness'
    ],
    sourceRequirements: ['W3C Web Cryptography API (crypto.getRandomValues)'],
    indexable: true
  },
  {
    url: '/random-object-generator',
    pageName: 'Random Object Generator – Drawing & Pictionary Prompts',
    primaryKeyword: 'random object generator',
    secondaryKeywords: [
      'random object picker',
      'random item generator',
      'pictionary word generator',
      'drawing prompt generator'
    ],
    semanticTerms: [
      'creative writing prompt',
      'art challenge',
      'scavenger hunt items',
      'brainstorming prompts',
      'household objects'
    ],
    searchIntent: 'tool / art / entertainment',
    targetAudience: 'Artists, teachers, writers, game night players, improv actors',
    problemSolved: 'Provides instant random objects and items across categories for art, games, and writing',
    toolType: 'Object Generator & Prompt Wheel',
    uniqueValue: 'Categorized object databases (Everyday, Rare, Complex, Animals, Fantasy), multi-item generation',
    internalLinks: [
      '/drawing-wheel',
      '/question-wheel',
      '/spin-the-wheel'
    ],
    sourceRequirements: ['Curated Semantic Object Lexicon'],
    indexable: true
  },
  {
    url: '/team-generator',
    pageName: 'Random Team Generator – Group Maker & Wheel',
    primaryKeyword: 'random team generator',
    secondaryKeywords: [
      'team generator',
      'random group generator',
      'team picker wheel',
      'split into teams',
      'group maker'
    ],
    semanticTerms: [
      'balanced teams',
      'snake draft',
      'live draft wheel',
      'custom squad names',
      'classroom pods'
    ],
    searchIntent: 'tool / education / sports',
    targetAudience: 'Teachers, coaches, team leads, gamers, event organizers',
    problemSolved: 'Divides lists of names into random, balanced teams or runs live draft wheels without bias',
    toolType: 'Random Team Generator & Live Draft Wheel',
    uniqueValue: 'Instant divider by team count or group size, live wheel draft, custom themes, CSV & Markdown export',
    internalLinks: [
      '/classroom-wheel',
      '/wheel-of-names',
      '/number-wheel',
      '/random-object-generator'
    ],
    sourceRequirements: ['W3C Web Cryptography API', 'Fisher-Yates Shuffle Algorithm'],
    indexable: true
  },
  {
    url: '/comment-picker',
    pageName: 'Random Comment Picker – Giveaway Winner Generator',
    primaryKeyword: 'comment picker',
    secondaryKeywords: [
      'random comment picker',
      'free comment picker',
      'youtube comment picker',
      'instagram comment picker',
      'giveaway comment picker',
      'random winner generator'
    ],
    semanticTerms: [
      'duplicate removal',
      'blank line cleaner',
      'exclusion filters',
      'hardware CSPRNG',
      'browser privacy',
      'winner history'
    ],
    searchIntent: 'tool / giveaway / social media',
    targetAudience: 'Content creators, YouTubers, streamers, social media managers, event hosts',
    problemSolved: 'Picks unbiased random winners from pasted comments with duplicate removal and exclusions with zero paid APIs',
    toolType: 'Browser-Based Random Comment Picker & Giveaway Generator',
    uniqueValue: '100% in-browser Web Crypto API randomness, zero social media API keys needed, audit seed tracking',
    internalLinks: [
      '/wheel-of-names',
      '/team-generator',
      '/random-game-picker',
      '/drawing-wheel'
    ],
    sourceRequirements: ['W3C Web Cryptography API (crypto.getRandomValues)'],
    indexable: true
  },
  {
    url: '/birthday-wheel',
    pageName: 'Birthday Wheel – Fun Decision Wheel for Party Activities, Gifts, Food & Themes',
    primaryKeyword: 'birthday wheel',
    secondaryKeywords: [
      'birthday decision wheel',
      'birthday party wheel',
      'birthday spinner',
      'birthday person picker',
      'birthday activity wheel',
      'birthday food wheel',
      'birthday gift ideas wheel',
      'birthday party games spinner'
    ],
    semanticTerms: [
      'birthday person picker',
      'birthday activity',
      'birthday food',
      'birthday gift ideas',
      'birthday party games',
      'birthday theme',
      'no-repeat elimination'
    ],
    searchIntent: 'tool / party / decision',
    targetAudience: 'Birthday planners, party hosts, friends, parents, event organizers',
    problemSolved: 'Solves birthday decision paralysis for activities, dinner spots, gift ideas, games, and party spotlights',
    toolType: 'Interactive Birthday Decision Wheel',
    uniqueValue: '6 dedicated celebration modes, custom bulk list editing, sound fanfare, confetti celebration, provably fair CSPRNG',
    internalLinks: [
      '/theme-wheel',
      '/random-game-picker',
      '/food-wheel',
      '/comment-picker',
      '/wheel-of-names'
    ],
    sourceRequirements: ['W3C Web Cryptography API (crypto.getRandomValues)'],
    indexable: true
  },
  {
    url: '/random-category-generator',
    pageName: 'Category Generator – Instant Random Categories & Scattergories Tool',
    primaryKeyword: 'category generator',
    secondaryKeywords: [
      'random categories',
      'random category generator',
      'scattergories category generator',
      'random category picker',
      'game category generator'
    ],
    semanticTerms: [
      'one category mode',
      'multiple categories mode',
      'no-repeat elimination',
      'Scattergories letter generator',
      'creative writing prompts',
      'classroom bell ringers',
      'ideation brainstorming'
    ],
    searchIntent: 'tool / games / brainstorming',
    targetAudience: 'Game night players, teachers, writers, creative teams, content creators',
    problemSolved: 'Instantly draws unbiased random categories for party games, Scattergories rounds, brainstorming sprints, and writing prompts',
    toolType: 'Instant Random Category Generator & Scattergories Tool',
    uniqueValue: '12 curated categories + custom creation, 3 generation modes, hardware CSPRNG, round timer, letter roller',
    internalLinks: [
      '/random-game-picker',
      '/drawing-wheel',
      '/theme-wheel',
      '/birthday-wheel',
      '/comment-picker'
    ],
    sourceRequirements: ['W3C Web Cryptography API (crypto.getRandomValues)'],
    indexable: true
  },
  {
    url: '/word-spinner',
    pageName: 'Word Spinner – Random Word Spinner for Writing, Games & Learning',
    primaryKeyword: 'word spinner',
    secondaryKeywords: [
      'random word spinner',
      'word wheel',
      'random word wheel',
      'noun generator',
      'verb spinner',
      'adjective generator',
      'vocabulary wheel'
    ],
    semanticTerms: [
      'random word selection',
      'nouns verbs adjectives',
      'easy words advanced words',
      'creative writing mode',
      'classroom vocabulary drill',
      'custom word list',
      'no-repeat elimination'
    ],
    searchIntent: 'tool / education / writing',
    targetAudience: 'Writers, educators, students, game night hosts, ESL learners',
    problemSolved: 'Spins fair random words across parts of speech and difficulty tiers for writing prompts, vocabulary drills, and games',
    toolType: 'Interactive Word Spinner & Vocabulary Wheel',
    uniqueValue: 'Nouns, verbs, adjectives, easy, and advanced lexicons, TTS audio pronunciation, writing prompt seeds, and custom word list support',
    internalLinks: [
      '/random-category-generator',
      '/classroom-wheel',
      '/drawing-wheel',
      '/wheel-of-names'
    ],
    sourceRequirements: ['W3C Web Cryptography API (crypto.getRandomValues)'],
    indexable: true
  }
];

export function getMatrixItemByUrl(url: string): KeywordContentMatrixItem | undefined {

  return KEYWORD_CONTENT_MATRIX.find(
    (item) => item.url === url || item.url === url.replace(/\/$/, '')
  );
}
