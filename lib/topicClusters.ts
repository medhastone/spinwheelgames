import { TopicCluster } from './seoArchitecture';

export const TOPIC_CLUSTERS: Record<string, TopicCluster> = {
  decisions: {
    id: 'decisions',
    name: 'Decisions & Dilemma Resolvers',
    pillarPath: '/decisions',
    h1: 'Decision Wheels & Random Choice Resolvers',
    metaDescription: 'Eliminate analysis paralysis with verifiable decision wheels, binary choice pickers, and weighted selection tools for everyday dilemmas.',
    primaryIntent: 'decision',
    supportingTools: [
      '/decision-wheel',
      '/yes-or-no-wheel',
      '/random-picker',
      '/picker-wheel',
      '/random-wheel'
    ],
    supportingGuides: [
      '/how-to-use-a-wheel',
      '/random-vs-weighted-selection',
      '/how-random-wheels-work'
    ],
    clusterSummary: 'Covers decision-making psychology, analysis paralysis resolution, and algorithmic fairness when choosing between personal and professional alternatives.'
  },
  names: {
    id: 'names',
    name: 'Names & Roll Calls',
    pillarPath: '/names',
    h1: 'Wheel of Names & Random Name Pickers',
    metaDescription: 'Select students, raffle entrants, teammates, and contest participants fairly with high-capacity random name wheels and elimination features.',
    primaryIntent: 'transactional/use tool',
    supportingTools: [
      '/wheel-of-names',
      '/random-name-picker',
      '/random-picker',
      '/letter-wheel'
    ],
    supportingGuides: [
      '/how-to-pick-a-random-winner',
      '/how-to-use-a-wheel'
    ],
    clusterSummary: 'Comprehensive toolset for random name selection, student participation, raffle drawings, and baby or character naming.'
  },
  classroom: {
    id: 'classroom',
    name: 'Classroom & Education',
    pillarPath: '/classroom',
    h1: 'Classroom Spinners & Student Randomizers',
    metaDescription: 'Engage students with interactive classroom wheels for cold-calling, reading turns, group assignments, and equitable participation.',
    primaryIntent: 'classroom',
    supportingTools: [
      '/classroom-wheel',
      '/classroom-wheel/random-student',
      '/team-picker',
      '/random-team-generator'
    ],
    supportingGuides: [
      '/how-to-make-a-classroom-wheel',
      '/how-random-wheels-work'
    ],
    subpages: [
      '/classroom-wheel/random-student'
    ],
    clusterSummary: 'Pedagogical tools designed to eliminate teacher favoritism bias, maintain student alertness, and automate classroom teams.'
  },
  party: {
    id: 'party',
    name: 'Party Games & Social Icebreakers',
    pillarPath: '/party',
    h1: 'Party Wheels & Social Game Pickers',
    metaDescription: 'Energize parties, sleepovers, and game nights with Truth or Dare wheels, Would You Rather dilemmas, and group challenge generators.',
    primaryIntent: 'entertainment',
    supportingTools: [
      '/party-wheel',
      '/party-wheel/truth-or-dare',
      '/spin-the-wheel'
    ],
    supportingGuides: [
      '/how-to-use-a-wheel'
    ],
    subpages: [
      '/party-wheel/truth-or-dare'
    ],
    clusterSummary: 'Entertaining social wheels engineered for icebreakers, game nights, campus events, and friendly group dares.'
  },
  food: {
    id: 'food',
    name: 'Food & Dining Deciders',
    pillarPath: '/food',
    h1: 'Food Wheels & What Should I Eat Deciders',
    metaDescription: 'Solve mealtime debates in seconds. Spin for cuisines, restaurant takeout, dinner recipes, pizza toppings, and quick lunch choices.',
    primaryIntent: 'decision',
    supportingTools: [
      '/food-wheel',
      '/food-wheel/dinner',
      '/food-wheel/pizza',
      '/decision-wheel'
    ],
    supportingGuides: [
      '/how-to-use-a-wheel'
    ],
    subpages: [
      '/food-wheel/dinner',
      '/food-wheel/pizza'
    ],
    clusterSummary: 'Caters to dinner disputes, takeout indecision, office lunch runs, and gourmet cooking inspiration.'
  },
  sports: {
    id: 'sports',
    name: 'Sports & Competition Drafts',
    pillarPath: '/sports',
    h1: 'Sports Wheels, Draft Lotteries & Matchups',
    metaDescription: 'Determine fantasy draft orders, sports team selections, tournament seedings, and competitive fitness challenges with provable fairness.',
    primaryIntent: 'event',
    supportingTools: [
      '/team-picker',
      '/random-team-generator',
      '/random-picker'
    ],
    supportingGuides: [
      '/how-to-pick-a-random-winner',
      '/random-vs-weighted-selection'
    ],
    clusterSummary: 'Tools and calculators for sports leagues, fantasy draft lotteries, team balancing, and tournament seeding.'
  },
  games: {
    id: 'games',
    name: 'Gaming & Challenge Roulettes',
    pillarPath: '/games',
    h1: 'Gaming Roulettes & Random Game Pickers',
    metaDescription: 'Break gaming ruts and backlogs. Spin for random video game backlogs, battle royale drop spots, RPG class rolls, and speedrun challenges.',
    primaryIntent: 'entertainment',
    supportingTools: [
      '/spin-the-wheel',
      '/random-picker',
      '/random-wheel'
    ],
    supportingGuides: [
      '/how-random-wheels-work'
    ],
    clusterSummary: 'Tailored for video gamers, livestreamers, speedrunners, and tabletop roleplayers seeking spontaneous playthrough constraints.'
  },
  entertainment: {
    id: 'entertainment',
    name: 'Entertainment & Media',
    pillarPath: '/entertainment',
    h1: 'Movie, TV Show & Book Picker Wheels',
    metaDescription: 'Stop endlessly scrolling Netflix and streaming queues. Spin for movie genres, TV series, anime, and book recommendations.',
    primaryIntent: 'entertainment',
    supportingTools: [
      '/decision-wheel',
      '/random-picker',
      '/picker-wheel'
    ],
    supportingGuides: [
      '/how-to-use-a-wheel'
    ],
    clusterSummary: 'Assists cinephiles, binge-watchers, and bibliophiles in resolving streaming paralysis across thousands of entertainment titles.'
  },
  numbers: {
    id: 'numbers',
    name: 'Numbers & Probability',
    pillarPath: '/numbers',
    h1: 'Number Wheels & Probability Randomizers',
    metaDescription: 'Generate truly random numbers (1-10, 1-100), polyhedral dice rolls, and cryptographic percentages with hardware-grade entropy.',
    primaryIntent: 'transactional/use tool',
    supportingTools: [
      '/number-wheel',
      '/random-picker',
      '/random-wheel'
    ],
    supportingGuides: [
      '/how-random-wheels-work',
      '/random-vs-weighted-selection'
    ],
    clusterSummary: 'Cryptographic numerical randomizers designed for mathematical experiments, probability demonstrations, lotteries, and tabletop dice.'
  },
  giveaways: {
    id: 'giveaways',
    name: 'Giveaways, Contests & Raffles',
    pillarPath: '/giveaways',
    h1: 'Giveaway Pickers & Provable Raffle Wheels',
    metaDescription: 'Draw stream winners, contest raffles, and prize giveaways with transparent, provably fair cryptographic RNG and live audit seeds.',
    primaryIntent: 'event',
    supportingTools: [
      '/giveaway-wheel',
      '/wheel-of-names',
      '/random-name-picker'
    ],
    supportingGuides: [
      '/how-to-pick-a-random-winner',
      '/how-random-wheels-work',
      '/random-vs-weighted-selection'
    ],
    clusterSummary: 'Critical tools for Twitch/YouTube streamers, marketers, and non-profits needing auditable, unbiased winner selection.'
  }
};
