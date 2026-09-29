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
      '/fair-randomness'
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
  }
];

export function getMatrixItemByUrl(url: string): KeywordContentMatrixItem | undefined {

  return KEYWORD_CONTENT_MATRIX.find(
    (item) => item.url === url || item.url === url.replace(/\/$/, '')
  );
}
