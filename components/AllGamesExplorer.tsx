'use client';
import { SITE_COUNTS } from "@/lib/siteConfig";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Filter,
  Sparkles,
  Flame,
  Star,
  TrendingUp,
  Trophy,
  ArrowRight,
  Play,
  RotateCcw,
  SlidersHorizontal,
  Layers,
  Heart,
  HelpCircle,
  Users,
  Utensils,
  GraduationCap,
  PartyPopper,
  Film,
  Gamepad2,
  Hash,
  Dumbbell,
  Compass,
  Gift,
  PenTool,
  CheckCircle2,
  Zap,
  Smile,
  X
} from 'lucide-react';
import { ALL_WHEEL_EXPERIENCES } from '@/lib/wheelLibrary';
import { ALL_SEO_PAGES_LIST } from '@/lib/seoData';
import { useSavedWheels, toggleWheelFavorite } from '@/lib/storage';

export type GameLevel = 'all' | 'hot' | 'popular' | 'trending' | 'featured' | 'new';

export interface GameItem {
  id: string;
  name: string;
  category: string;
  categoryGroup: string;
  purpose: string;
  entriesCount: number;
  sampleEntries: string[];
  href: string;
  level: 'hot' | 'popular' | 'trending' | 'featured' | 'new';
  iconKey: string;
  gradient: string;
  viewsScore: number;
}

// Map icons dynamically
const ICON_MAP: Record<string, React.ElementType> = {
  HelpCircle,
  Users,
  Utensils,
  GraduationCap,
  PartyPopper,
  Film,
  Gamepad2,
  Trophy,
  Hash,
  Dumbbell,
  Compass,
  Gift,
  PenTool,
  CheckCircle2,
  Sparkles,
  Flame,
  Star,
  Zap,
  Smile
};

// Generate comprehensive dataset of interactive wheel games
function buildAllGamesDataset(): GameItem[] {
  const map = new Map<string, GameItem>();

  // 1. Core Popular & Hot Pillars
  const flagshipGames: GameItem[] = [
    {
      id: 'wheel-of-names',
      name: 'Wheel of Names & Caller',
      category: 'Names & People',
      categoryGroup: 'names',
      purpose: 'Draw fair random names, raffle winners, and roll calls without repeats.',
      entriesCount: 30,
      sampleEntries: ['Emma', 'Liam', 'Olivia', 'Noah', 'Sophia'],
      href: '/wheel-of-names',
      level: 'hot',
      iconKey: 'Users',
      gradient: 'from-purple-500 to-indigo-600',
      viewsScore: 99
    },
    {
      id: 'bingo-wheel',
      name: 'Bingo Spin Wheel Caller',
      category: 'Party & Social',
      categoryGroup: 'party',
      purpose: 'Live 75-Ball, 90-Ball and 30-Ball bingo caller with master board and player cards.',
      entriesCount: 75,
      sampleEntries: ['B-12', 'I-24', 'N-36', 'G-52', 'O-68'],
      href: '/bingo-wheel',
      level: 'hot',
      iconKey: 'Trophy',
      gradient: 'from-rose-500 to-amber-500',
      viewsScore: 98
    },
    {
      id: 'food-wheel',
      name: 'Food & Meal Decider Wheel',
      category: 'Food & Dining',
      categoryGroup: 'food',
      purpose: 'End meal indecision instantly: Pizza, Sushi, Mexican, Tacos, Burgers and Thai.',
      entriesCount: 16,
      sampleEntries: ['Neapolitan Pizza', 'Sushi & Poke', 'Street Tacos', 'Thai Curry'],
      href: '/food-wheel',
      level: 'popular',
      iconKey: 'Utensils',
      gradient: 'from-amber-500 to-orange-600',
      viewsScore: 96
    },
    {
      id: 'decision-wheel',
      name: 'Decision & Tie-Breaker Wheel',
      category: 'Decisions & Choices',
      categoryGroup: 'decisions',
      purpose: 'Cryptographically fair tie-breaker for group debates, daily choices and dilemmas.',
      entriesCount: 12,
      sampleEntries: ['Option A', 'Option B', 'Option C', 'Spin Again'],
      href: '/decision-wheel',
      level: 'popular',
      iconKey: 'HelpCircle',
      gradient: 'from-indigo-500 to-blue-600',
      viewsScore: 95
    },
    {
      id: 'yes-or-no-wheel',
      name: 'Yes or No Wheel 50/50',
      category: 'Decisions & Choices',
      categoryGroup: 'decisions',
      purpose: 'Instant binary oracle for quick verdicts and coin toss alternatives.',
      entriesCount: 2,
      sampleEntries: ['YES (Definite)', 'NO (Try Later)'],
      href: '/yes-or-no-wheel',
      level: 'popular',
      iconKey: 'CheckCircle2',
      gradient: 'from-emerald-500 to-teal-600',
      viewsScore: 94
    },
    {
      id: 'classroom-wheel',
      name: 'Classroom & Student Picker',
      category: 'Classroom & Education',
      categoryGroup: 'classroom',
      purpose: 'Fair turn-taking caller for student participation, teams, and line leaders.',
      entriesCount: 28,
      sampleEntries: ['Student 1', 'Student 2', 'Student 3', 'Team Alpha'],
      href: '/classroom-wheel',
      level: 'featured',
      iconKey: 'GraduationCap',
      gradient: 'from-blue-500 to-cyan-600',
      viewsScore: 93
    },
    {
      id: 'challenges',
      name: 'Daily Lucky Challenge Wheel',
      category: 'Party & Social',
      categoryGroup: 'party',
      purpose: 'Complete daily mini-missions, unlock lucky streaks, and test your probability.',
      entriesCount: 14,
      sampleEntries: ['Spin Streak +1', 'Double Points', 'Mystery Quest'],
      href: '/challenges',
      level: 'trending',
      iconKey: 'Flame',
      gradient: 'from-red-500 to-rose-600',
      viewsScore: 92
    },
    {
      id: 'giveaway-wheel',
      name: 'Giveaways & Raffle Picker',
      category: 'Giveaways & Raffles',
      categoryGroup: 'giveaway',
      purpose: 'Multi-ticket drawings with verified fair seeds and stream-ready animations.',
      entriesCount: 50,
      sampleEntries: ['Grand Prize', 'Runner Up', 'Merch Pack', 'Gift Card'],
      href: '/giveaway-wheel',
      level: 'trending',
      iconKey: 'Gift',
      gradient: 'from-pink-500 to-purple-600',
      viewsScore: 91
    },
    {
      id: 'team-generator',
      name: 'Team & Group Splitter',
      category: 'Sports & Gaming',
      categoryGroup: 'sports',
      purpose: 'Evenly divide players into balanced red, blue, green, and gold squads.',
      entriesCount: 24,
      sampleEntries: ['Team Red', 'Team Blue', 'Team Green', 'Team Yellow'],
      href: '/team-generator',
      level: 'trending',
      iconKey: 'Trophy',
      gradient: 'from-cyan-500 to-blue-600',
      viewsScore: 90
    },
    {
      id: 'number-wheel',
      name: 'Random Number Wheel (1-100)',
      category: 'Numbers & RNG',
      categoryGroup: 'numbers',
      purpose: 'Draw random integers and lottery digits with customizable min/max ranges.',
      entriesCount: 100,
      sampleEntries: ['1', '7', '13', '42', '77', '99'],
      href: '/number-wheel',
      level: 'popular',
      iconKey: 'Hash',
      gradient: 'from-teal-500 to-emerald-600',
      viewsScore: 89
    },
    {
      id: 'movie-wheel',
      name: 'Movie & Streaming Decider',
      category: 'Entertainment',
      categoryGroup: 'entertainment',
      purpose: 'Pick cinema classics, Netflix thrillers, comedies, and sci-fi hits for movie night.',
      entriesCount: 20,
      sampleEntries: ['Sci-Fi Thriller', 'Classic Comedy', 'Action Blockbuster', 'Indie Drama'],
      href: '/movie-wheel',
      level: 'trending',
      iconKey: 'Film',
      gradient: 'from-violet-500 to-purple-600',
      viewsScore: 88
    },
    {
      id: 'party-wheel',
      name: 'Truth or Dare Party Wheel',
      category: 'Party & Social',
      categoryGroup: 'party',
      purpose: 'Hilarious party dares, truth queries, and lively group icebreakers.',
      entriesCount: 32,
      sampleEntries: ['Truth #1', 'Dare #1', 'Wildcard', 'Group Challenge'],
      href: '/party-wheel',
      level: 'hot',
      iconKey: 'PartyPopper',
      gradient: 'from-rose-500 to-pink-600',
      viewsScore: 87
    },
    {
      id: 'song-wheel',
      name: 'Song & Karaoke Picker',
      category: 'Entertainment',
      categoryGroup: 'entertainment',
      purpose: 'Random 80s, 90s, Pop, Rock, and Hip-Hop songs for karaoke and playlists.',
      entriesCount: 25,
      sampleEntries: ['80s Rock Anthem', '90s R&B Hit', 'Pop Chart Topper', 'Indie Jam'],
      href: '/song-wheel',
      level: 'new',
      iconKey: 'Sparkles',
      gradient: 'from-fuchsia-500 to-pink-600',
      viewsScore: 86
    },
    {
      id: 'animal-wheel',
      name: 'Animal & Pet Wheel',
      category: 'Classroom & Education',
      categoryGroup: 'classroom',
      purpose: 'Random animal selector for preschool trivia, safari games, and biology lessons.',
      entriesCount: 24,
      sampleEntries: ['Lion', 'Elephant', 'Penguin', 'Dolphin', 'Giraffe'],
      href: '/animal-wheel',
      level: 'new',
      iconKey: 'Smile',
      gradient: 'from-amber-500 to-yellow-600',
      viewsScore: 85
    },
    {
      id: 'pokemon-wheel',
      name: 'Random Pokémon Generator & Wheel',
      category: 'Gaming & Pop Culture',
      categoryGroup: 'party',
      purpose: 'Spin across all 9 generations with type filters, 6-mon team builder, and Nuzlocke roulette.',
      entriesCount: 150,
      sampleEntries: ['Pikachu', 'Charizard', 'Lucario', 'Greninja', 'Meowscarada'],
      href: '/pokemon-wheel',
      level: 'hot',
      iconKey: 'Flame',
      gradient: 'from-rose-500 to-amber-600',
      viewsScore: 98
    },
    {
      id: 'question-wheel',
      name: 'Deep Question & Icebreaker',
      category: 'Party & Social',
      categoryGroup: 'party',
      purpose: 'Thought-provoking conversation starters for friends, teams, and dinner parties.',
      entriesCount: 20,
      sampleEntries: ['Life Goal', 'Secret Talent', 'Favorite Memory', 'Dream Trip'],
      href: '/question-wheel',
      level: 'trending',
      iconKey: 'HelpCircle',
      gradient: 'from-sky-500 to-blue-600',
      viewsScore: 84
    },
    {
      id: 'random-object-generator',
      name: 'Random Object & Prop Generator',
      category: 'Creative & Writing',
      categoryGroup: 'creative',
      purpose: 'Instant drawing and storytelling prompts for artists, writers, and improv games.',
      entriesCount: 30,
      sampleEntries: ['Vintage Clock', 'Brass Key', 'Telescope', 'Glowing Lantern'],
      href: '/random-object-generator',
      level: 'new',
      iconKey: 'PenTool',
      gradient: 'from-indigo-500 to-purple-600',
      viewsScore: 83
    }
  ];

  flagshipGames.forEach((g) => map.set(g.id, g));

  // 2. Add all Wheel Experiences from Library
  ALL_WHEEL_EXPERIENCES.forEach((exp, idx) => {
    if (!map.has(exp.id)) {
      // Determine level based on index distribution
      let level: GameLevel = 'popular';
      if (idx % 5 === 0) level = 'hot';
      else if (idx % 4 === 0) level = 'trending';
      else if (idx % 7 === 0) level = 'featured';
      else if (idx % 6 === 0) level = 'new';

      let catGroup = 'other';
      const c = exp.category.toLowerCase();
      if (c.includes('decision')) catGroup = 'decisions';
      else if (c.includes('name')) catGroup = 'names';
      else if (c.includes('food') || c.includes('dining')) catGroup = 'food';
      else if (c.includes('class') || c.includes('education')) catGroup = 'classroom';
      else if (c.includes('party') || c.includes('social')) catGroup = 'party';
      else if (c.includes('game') || c.includes('esport')) catGroup = 'gaming';
      else if (c.includes('sport') || c.includes('fitness') || c.includes('workout')) catGroup = 'sports';
      else if (c.includes('number')) catGroup = 'numbers';
      else if (c.includes('giveaway') || c.includes('raffle')) catGroup = 'giveaway';
      else if (c.includes('creative') || c.includes('writing')) catGroup = 'creative';
      else if (c.includes('movie') || c.includes('media') || c.includes('entertain')) catGroup = 'entertainment';

      const gradientList = [
        'from-purple-500 to-indigo-600',
        'from-blue-500 to-cyan-600',
        'from-emerald-500 to-teal-600',
        'from-amber-500 to-orange-600',
        'from-rose-500 to-pink-600',
        'from-violet-500 to-fuchsia-600',
        'from-sky-500 to-indigo-600'
      ];

      map.set(exp.id, {
        id: exp.id,
        name: exp.name.endsWith('Wheel') ? exp.name : `${exp.name} Wheel`,
        category: exp.category,
        categoryGroup: catGroup,
        purpose: exp.purpose,
        entriesCount: exp.defaultEntries.length,
        sampleEntries: exp.defaultEntries.slice(0, 5),
        href: `/${exp.id}`,
        level,
        iconKey: 'Sparkles',
        gradient: gradientList[idx % gradientList.length],
        viewsScore: 80 - (idx % 40)
      });
    }
  });

  // 3. Add any additional SEO pillar pages
  ALL_SEO_PAGES_LIST.forEach((p, idx) => {
    const slug = p.slug;
    if (!map.has(slug)) {
      const gradientList = [
        'from-indigo-600 to-purple-600',
        'from-cyan-600 to-blue-600',
        'from-emerald-600 to-teal-600',
        'from-rose-600 to-amber-600'
      ];

      map.set(slug, {
        id: slug,
        name: p.h1,
        category: p.parentCategoryName,
        categoryGroup: p.categoryKey || 'other',
        purpose: p.metaDescription,
        entriesCount: p.defaultWheelData?.items?.length || 12,
        sampleEntries: (p.defaultWheelData?.items || []).slice(0, 4).map((item) => item.text),
        href: p.fullPath,
        level: idx % 3 === 0 ? 'trending' : idx % 2 === 0 ? 'popular' : 'hot',
        iconKey: 'Sparkles',
        gradient: gradientList[idx % gradientList.length],
        viewsScore: 75 - (idx % 30)
      });
    }
  });

  return Array.from(map.values());
}

const CATEGORIES_FILTER = [
  { id: 'all', label: 'All Categories', icon: Layers },
  { id: 'decisions', label: 'Decisions & Choices', icon: HelpCircle },
  { id: 'names', label: 'Names & People', icon: Users },
  { id: 'food', label: 'Food & Dining', icon: Utensils },
  { id: 'classroom', label: 'Classroom & School', icon: GraduationCap },
  { id: 'party', label: 'Party & Games', icon: PartyPopper },
  { id: 'entertainment', label: 'Movies & Media', icon: Film },
  { id: 'gaming', label: 'Gaming & Backlog', icon: Gamepad2 },
  { id: 'sports', label: 'Sports & Teams', icon: Trophy },
  { id: 'numbers', label: 'Numbers & Probability', icon: Hash },
  { id: 'giveaway', label: 'Giveaways & Raffles', icon: Gift },
  { id: 'creative', label: 'Creative & Writing', icon: PenTool }
];

export default function AllGamesExplorer() {
  const router = useRouter();
  const allGames = useMemo(() => buildAllGamesDataset(), []);
  const savedWheels = useSavedWheels();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeLevel, setActiveLevel] = useState<GameLevel>('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'trending' | 'popular' | 'alpha' | 'entries'>('trending');

  // Filter and sort games
  const filteredGames = useMemo(() => {
    return allGames
      .filter((game) => {
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = game.name.toLowerCase().includes(q);
          const matchPurpose = game.purpose.toLowerCase().includes(q);
          const matchCategory = game.category.toLowerCase().includes(q);
          const matchEntries = game.sampleEntries.some((e) => e.toLowerCase().includes(q));
          if (!matchName && !matchPurpose && !matchCategory && !matchEntries) {
            return false;
          }
        }

        // Level filter
        if (activeLevel !== 'all' && game.level !== activeLevel) {
          return false;
        }

        // Category filter
        if (activeCategory !== 'all' && game.categoryGroup !== activeCategory) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'trending') return b.viewsScore - a.viewsScore;
        if (sortBy === 'popular') return (b.entriesCount * 2 + b.viewsScore) - (a.entriesCount * 2 + a.viewsScore);
        if (sortBy === 'alpha') return a.name.localeCompare(b.name);
        if (sortBy === 'entries') return b.entriesCount - a.entriesCount;
        return 0;
      });
  }, [allGames, searchQuery, activeLevel, activeCategory, sortBy]);

  // Counts for badge levels
  const levelCounts = useMemo(() => {
    return {
      all: allGames.length,
      hot: allGames.filter((g) => g.level === 'hot').length,
      popular: allGames.filter((g) => g.level === 'popular').length,
      trending: allGames.filter((g) => g.level === 'trending').length,
      featured: allGames.filter((g) => g.level === 'featured').length,
      new: allGames.filter((g) => g.level === 'new').length
    };
  }, [allGames]);

  return (
    <div className="w-full space-y-8">
      {/* Search and Filters Bar */}
      <div className="bg-white dark:bg-[#151620] rounded-3xl border border-[#eeedf7] dark:border-[#252636] p-4 sm:p-6 shadow-xl space-y-5">
        
        {/* Search Input + Sort Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#767586] dark:text-[#908fa1]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by game name, keyword, or items (e.g. bingo, pizza, dares, trivia)..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#f4f2fd] dark:bg-[#1d1e2a] border border-[#eeedf7] dark:border-[#2e3042] text-sm sm:text-base text-[#1a1b22] dark:text-white placeholder-[#767586] focus:outline-hidden focus:ring-2 focus:ring-[#4648d4]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search input"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs font-bold text-[#767586] hover:text-[#1a1b22] dark:hover:text-white px-2.5 py-1.5 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-all cursor-pointer min-h-[36px]"
              >
                <X className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-[#767586]" />
            <span className="text-xs font-bold text-[#767586] dark:text-[#908fa1]">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2.5 rounded-xl bg-[#f4f2fd] dark:bg-[#1d1e2a] border border-[#eeedf7] dark:border-[#2e3042] text-xs sm:text-sm font-semibold text-[#1a1b22] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#4648d4] cursor-pointer"
            >
              <option value="trending">🔥 Trending Score</option>
              <option value="popular">⭐ Most Popular</option>
              <option value="alpha">🔤 Alphabetical (A–Z)</option>
              <option value="entries">🎲 Most Items</option>
            </select>
          </div>
        </div>

        {/* Level Badges Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveLevel('all')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${
              activeLevel === 'all'
                ? 'bg-[#4648d4] text-white shadow-md shadow-[#4648d4]/25'
                : 'bg-[#f4f2fd] dark:bg-[#1d1e2a] text-[#464554] dark:text-[#c7c4d7] hover:bg-[#eae8f7]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>All Games</span>
            <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-white/20">
              {levelCounts.all}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveLevel('hot')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${
              activeLevel === 'hot'
                ? 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-md'
                : 'bg-[#f4f2fd] dark:bg-[#1d1e2a] text-[#464554] dark:text-[#c7c4d7] hover:bg-[#eae8f7]'
            }`}
          >
            <Flame className="w-4 h-4 text-rose-300" />
            <span>🔥 Hot Viral</span>
            <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-white/20">
              {levelCounts.hot}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveLevel('popular')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${
              activeLevel === 'popular'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                : 'bg-[#f4f2fd] dark:bg-[#1d1e2a] text-[#464554] dark:text-[#c7c4d7] hover:bg-[#eae8f7]'
            }`}
          >
            <Star className="w-4 h-4 text-amber-200 fill-amber-200" />
            <span>⭐ Most Popular</span>
            <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-white/20">
              {levelCounts.popular}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveLevel('trending')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${
              activeLevel === 'trending'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'bg-[#f4f2fd] dark:bg-[#1d1e2a] text-[#464554] dark:text-[#c7c4d7] hover:bg-[#eae8f7]'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-purple-200" />
            <span>📈 Trending</span>
            <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-white/20">
              {levelCounts.trending}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveLevel('featured')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${
              activeLevel === 'featured'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                : 'bg-[#f4f2fd] dark:bg-[#1d1e2a] text-[#464554] dark:text-[#c7c4d7] hover:bg-[#eae8f7]'
            }`}
          >
            <Trophy className="w-4 h-4 text-blue-200" />
            <span>🏆 Featured Wheels</span>
            <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-white/20">
              {levelCounts.featured}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveLevel('new')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${
              activeLevel === 'new'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                : 'bg-[#f4f2fd] dark:bg-[#1d1e2a] text-[#464554] dark:text-[#c7c4d7] hover:bg-[#eae8f7]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-200" />
            <span>✨ New Releases</span>
            <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-white/20">
              {levelCounts.new}
            </span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-[#eeedf7] dark:border-[#222330]">
          {CATEGORIES_FILTER.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1a1b22] dark:bg-white text-white dark:text-[#1a1b22] shadow-xs'
                    : 'bg-[#f4f2fd] dark:bg-[#1d1e2a] text-[#464554] dark:text-[#c7c4d7] hover:text-[#1a1b22] dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between px-2">
        <p className="text-sm font-bold text-[#464554] dark:text-[#c7c4d7]">
          Showing <span className="text-[#4648d4] dark:text-[#8587ff]">{filteredGames.length}</span> of {allGames.length} Interactive Wheels
        </p>
        {(searchQuery || activeLevel !== 'all' || activeCategory !== 'all') && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setActiveLevel('all');
              setActiveCategory('all');
            }}
            className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Grid of Wheel Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredGames.map((game) => {
          const isFavorited = savedWheels.some((w) => w.id === game.id || w.title === game.name);

          return (
            <div
              key={game.id}
              className="bg-white dark:bg-[#151620] rounded-3xl border border-[#eeedf7] dark:border-[#252636] p-5 sm:p-6 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Card Gradient Bar */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${game.gradient}`} />

              <div>
                {/* Header Row: Category + Level Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#767586] dark:text-[#908fa1] truncate">
                    {game.category}
                  </span>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {game.level === 'hot' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                        <Flame className="w-3 h-3 fill-rose-500" />
                        HOT
                      </span>
                    )}
                    {game.level === 'popular' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        <Star className="w-3 h-3 fill-amber-500" />
                        POPULAR
                      </span>
                    )}
                    {game.level === 'trending' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                        <TrendingUp className="w-3 h-3" />
                        TRENDING
                      </span>
                    )}
                    {game.level === 'featured' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                        <Trophy className="w-3 h-3" />
                        FEATURED
                      </span>
                    )}
                    {game.level === 'new' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        <Sparkles className="w-3 h-3" />
                        NEW
                      </span>
                    )}
                  </div>
                </div>

                {/* Title */}
                <Link href={game.href} className="block group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors">
                  <h3 className="text-lg sm:text-xl font-bold text-[#1a1b22] dark:text-white leading-snug">
                    {game.name}
                  </h3>
                </Link>

                {/* Purpose / Description */}
                <p className="text-xs sm:text-sm text-[#464554] dark:text-[#c7c4d7] mt-2 line-clamp-2 leading-relaxed">
                  {game.purpose}
                </p>

                {/* Sample Entry Chips */}
                {game.sampleEntries.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {game.sampleEntries.slice(0, 3).map((entry, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#f4f2fd] dark:bg-[#1d1e2a] text-[#464554] dark:text-[#c7c4d7] border border-[#eeedf7] dark:border-[#2e3042]"
                      >
                        {entry}
                      </span>
                    ))}
                    {game.entriesCount > 3 && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#4648d4]/10 text-[#4648d4] dark:text-[#8587ff]">
                        +{game.entriesCount - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Bottom Actions Row */}
              <div className="mt-6 pt-4 border-t border-[#eeedf7] dark:border-[#222330] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#767586] dark:text-[#908fa1]">
                  {game.entriesCount} Items • 100% Fair
                </span>

                <Link
                  href={game.href}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4648d4] hover:bg-[#3b3dbb] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Spin Wheel</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredGames.length === 0 && (
        <div className="bg-white dark:bg-[#151620] rounded-3xl border border-[#eeedf7] dark:border-[#252636] p-12 text-center space-y-4">
          <HelpCircle className="w-12 h-12 text-[#767586] mx-auto" />
          <h3 className="text-xl font-bold text-[#1a1b22] dark:text-white">
            No Wheels Found
          </h3>
          <p className="text-sm text-[#464554] dark:text-[#c7c4d7] max-w-md mx-auto">
            We couldn&apos;t find any wheel games matching &quot;{searchQuery}&quot;. Try searching for popular terms like &quot;food&quot;, &quot;party&quot;, &quot;decision&quot;, or reset your filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setActiveLevel('all');
              setActiveCategory('all');
            }}
            className="px-4 py-2 rounded-xl bg-[#4648d4] text-white text-sm font-bold shadow-md cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Specialized Spinners & 3D Polyhedral Dice Directory */}
      <div className="bg-white dark:bg-[#151620] rounded-3xl border border-[#eeedf7] dark:border-[#252636] p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-headline font-bold text-[#1a1b22] dark:text-white">
              3D Polyhedral Dice Rollers &amp; Specialized Randomizers
            </h2>
            <p className="text-xs sm:text-sm text-[#464554] dark:text-[#c7c4d7]">
              Direct access to our dedicated tabletop RPG dice simulators, probability calculators, and niche decision wheels.
            </p>
          </div>
          <Link
            href="/categories"
            className="text-xs font-bold text-[#4648d4] dark:text-[#8587ff] hover:underline shrink-0"
          >
            Browse All 18 Categories →
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { href: '/dice-roller', label: '3D Online Dice Roller' },
            { href: '/roll-4d6', label: 'Roll 4d6 Drop Lowest Calculator' },
            { href: '/dnd-stat-roller', label: 'D&D 5e Ability Score Stat Roller' },
            { href: '/dice-average-calculator', label: 'Dice Average & Probability Calculator' },
            { href: '/roll-3d6', label: 'Roll 3d6 Bell Curve Simulator' },
            { href: '/roll-5d6', label: 'Roll 5d6 Yahtzee Dice Roller' },
            { href: '/roll-2d12', label: 'Roll 2d12 Hope & Fear Dice' },
            { href: '/roll-d3', label: 'Roll d3 Three-Sided Die' },
            { href: '/dice-collection', label: '3D RPG Polyhedral Dice Collection' },
            { href: '/unusual-dice', label: 'Unusual & Non-Standard Dice (d3-d60)' },
            { href: '/dice/d20', label: 'Roll d20 Icosahedron Die' },
            { href: '/dice/d12', label: 'Roll d12 Dodecahedron Die' },
            { href: '/dice/d10', label: 'Roll d10 Ten-Sided Die' },
            { href: '/dice/d8', label: 'Roll d8 Octahedron Die' },
            { href: '/dice/d6', label: 'Roll d6 Standard Cube Die' },
            { href: '/dice/d4', label: 'Roll d4 Tetrahedron Die' },
            { href: '/dice/d2', label: 'Roll d2 Coin Flip Simulator' },
            { href: '/dice/d100', label: 'Roll d100 Percentile Dice' },
            { href: '/random-number-wheel', label: 'Random Number Wheel Spinner' },
            { href: '/team-generator', label: 'Random Team Generator Wheel' },
            { href: '/color-wheel', label: 'Random Color Wheel & Palette Generator' },
            { href: '/theme-wheel', label: 'Random Theme & Aesthetic Wheel' },
            { href: '/birthday-wheel', label: 'Birthday Activity & Gift Wheel' },
            { href: '/word-spinner', label: 'Random Word Spinner & Vocabulary Game' },
            { href: '/pokemon-wheel', label: 'Random Pokémon Starter & Type Wheel' },
            { href: '/random-app-picker', label: 'Random App & Challenge Picker' },
            { href: '/random-game-picker', label: 'Random Video Game & Board Game Picker' },
            { href: '/random-category-generator', label: 'Random Category Generator for Trivia' },
            { href: '/random-object-generator', label: 'Random Everyday Object Generator' },
            { href: '/comment-picker', label: 'Random Comment & Giveaway Winner Picker' },
            { href: '/truth-or-dare-wheel', label: 'Truth or Dare Party Spinner Wheel' },
            { href: '/animal-wheel', label: 'Random Animal Generator Wheel' },
            { href: '/drawing-wheel', label: 'Drawing Idea & Art Prompt Wheel' },
            { href: '/question-wheel', label: 'Random Icebreaker Question Wheel' },
            { href: '/song-wheel', label: 'Random Song & Karaoke Genre Wheel' }
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 rounded-xl bg-[#fbf8ff] dark:bg-[#1c1d29] border border-[#eeedf7] dark:border-[#292a39] hover:border-[#4648d4] dark:hover:border-[#8587ff] text-xs font-medium text-[#1a1b22] dark:text-[#e2e0f5] hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
