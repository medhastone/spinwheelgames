'use client';
import { SITE_COUNTS } from "@/lib/siteConfig";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Search,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  PlusCircle,
  ChevronDown,
  Sparkles,
  Flame,
  Plus,
  Menu,
  X,
  Heart,
  HelpCircle,
  Users,
  Utensils,
  GraduationCap,
  PartyPopper,
  Film,
  Trophy,
  Gift,
  Hash,
  ArrowRight,
  CheckCircle2,
  Dice5,
  Dices,
  Shield,
  Calculator,
  TrendingUp,
  Star
} from 'lucide-react';
import {
  toggleTheme,
  applySavedTheme,
  useIsDarkTheme
} from '@/lib/theme';
import {
  useSavedWheels,
  useUserStats,
  SavedWheel
} from '@/lib/storage';
import { WheelConfig } from '@/lib/presets';
import SavedWheelsModal from './SavedWheelsModal';
import SearchModal from './SearchModal';

interface NavbarProps {
  soundEnabled?: boolean;
  onToggleSound?: () => void;
  onOpenSearch?: () => void;
  onOpenCreateWheel?: () => void;
  activeNav?: string;
  onSelectNav?: (nav: string) => void;
  onSelectPreset?: (wheel: WheelConfig) => void;
}

export default function Navbar({
  soundEnabled,
  onToggleSound,
  onOpenSearch,
  onOpenCreateWheel,
  activeNav = 'home',
  onSelectNav,
  onSelectPreset
}: NavbarProps) {
  const router = useRouter();
  const isDark = useIsDarkTheme();

  const savedWheels = useSavedWheels();
  const userStats = useUserStats();
  const stats = { currentDailyStreak: userStats.currentDailyStreak || 7 };

  const [profileOpen, setProfileOpen] = useState(false);
  const [popularOpen, setPopularOpen] = useState(false);
  const [trendingOpen, setTrendingOpen] = useState(false);
  const [diceOpen, setDiceOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<'popular' | 'trending' | 'dice' | 'categories'>('popular');
  const [savedModalOpen, setSavedModalOpen] = useState(false);
  const [internalSearchOpen, setInternalSearchOpen] = useState(false);
  const [internalSound, setInternalSound] = useState(true);

  const navRef = useRef<HTMLDivElement>(null);

  const isSoundActive = soundEnabled !== undefined ? soundEnabled : internalSound;

  const handleToggleSound = () => {
    if (onToggleSound) {
      onToggleSound();
    } else {
      setInternalSound(!internalSound);
    }
  };

  const handleOpenSearch = () => {
    if (onOpenSearch) {
      onOpenSearch();
    } else {
      setInternalSearchOpen(true);
    }
  };

  const handleOpenCreateWheel = () => {
    if (onOpenCreateWheel) {
      onOpenCreateWheel();
    } else {
      router.push('/#create-wheel');
    }
  };

  const handleLogoClick = () => {
    if (onSelectNav) {
      onSelectNav('home');
    } else {
      router.push('/');
    }
  };

  useEffect(() => {
    applySavedTheme();
  }, [isDark]);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setPopularOpen(false);
        setTrendingOpen(false);
        setDiceOpen(false);
        setCategoriesOpen(false);
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDarkMode = () => {
    toggleTheme();
  };

  // Curated Popular Games
  const popularGames = [
    {
      id: 'wheel-of-names',
      name: 'Wheel of Names',
      desc: 'Pick random names & callers without repeats',
      icon: Users,
      href: '/wheel-of-names',
      color: 'text-purple-600 dark:text-purple-400 bg-purple-500/10',
      badge: 'Most Popular'
    },
    {
      id: 'food-wheel',
      name: 'Food & Meal Decider',
      desc: 'Decide what to eat, cook, or order tonight',
      icon: Utensils,
      href: '/food-wheel',
      color: 'text-orange-600 dark:text-orange-400 bg-orange-500/10'
    },
    {
      id: 'decision-wheel',
      name: 'Decision & Tie-Breaker',
      desc: 'Unbiased decider for debates and choices',
      icon: HelpCircle,
      href: '/decision-wheel',
      color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10'
    },
    {
      id: 'yes-or-no-wheel',
      name: 'Yes or No Wheel',
      desc: 'Instant 50/50 binary coin flip & decision maker',
      icon: CheckCircle2,
      href: '/yes-or-no-wheel',
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10'
    },
    {
      id: 'classroom-wheel',
      name: 'Classroom & Student Picker',
      desc: 'Fair student picker, teams & duty assigner',
      icon: GraduationCap,
      href: '/classroom-wheel',
      color: 'text-blue-600 dark:text-blue-400 bg-blue-500/10'
    },
    {
      id: 'number-wheel',
      name: 'Number Wheel RNG',
      desc: 'Draw random numbers with customizable ranges',
      icon: Hash,
      href: '/number-wheel',
      color: 'text-teal-600 dark:text-teal-400 bg-teal-500/10'
    }
  ];

  // Curated Trending Games
  const trendingGames = [
    {
      id: 'bingo-wheel',
      name: 'Bingo Spin Wheel',
      desc: 'Live 75/90 caller, Master Board & player cards',
      icon: Trophy,
      href: '/bingo-wheel',
      color: 'text-rose-600 dark:text-rose-400 bg-rose-500/10',
      badge: '🔥 Hot'
    },
    {
      id: 'challenges',
      name: 'Daily Lucky Challenge',
      desc: 'Spin daily missions & maintain your streak',
      icon: Flame,
      href: '/challenges',
      color: 'text-red-600 dark:text-red-400 bg-red-500/10',
      badge: 'Streak'
    },
    {
      id: 'party-wheel',
      name: 'Truth or Dare & Party',
      desc: 'Hilarious party dares, icebreakers & trivia',
      icon: PartyPopper,
      href: '/party-wheel',
      color: 'text-pink-600 dark:text-pink-400 bg-pink-500/10'
    },
    {
      id: 'giveaway-wheel',
      name: 'Giveaways & Raffles',
      desc: 'Multi-ticket drawings with verified fair seeds',
      icon: Gift,
      href: '/giveaway-wheel',
      color: 'text-amber-600 dark:text-amber-400 bg-amber-500/10'
    },
    {
      id: 'team-generator',
      name: 'Team & Group Splitter',
      desc: 'Evenly balance groups for sports & games',
      icon: Users,
      href: '/team-generator',
      color: 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10'
    },
    {
      id: 'movie-wheel',
      name: 'Movie & Streaming Decider',
      desc: 'Pick films by genre, streaming & cinema',
      icon: Film,
      href: '/movie-wheel',
      color: 'text-violet-600 dark:text-violet-400 bg-violet-500/10'
    }
  ];

  // Curated 3D Dice Games & Rollers
  const diceGames = [
    {
      id: 'dice-roller',
      name: '3D Interactive Dice Roller',
      desc: 'Interactive 3D customizable dice simulator with physics',
      icon: Dices,
      href: '/dice-roller',
      color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10',
      badge: '3D Physics'
    },
    {
      id: 'dice-collection',
      name: '3D RPG Dice Collection',
      desc: 'Official 8-piece gemstone crystal polyhedra showcase',
      icon: Sparkles,
      href: '/dice-collection',
      color: 'text-amber-600 dark:text-amber-400 bg-amber-500/10',
      badge: '★ Official Pack'
    },
    {
      id: 'roll-4d6',
      name: 'Roll 4d6 (Drop Lowest)',
      desc: 'D&D character stat generator with drop-lowest rule',
      icon: Shield,
      href: '/roll-4d6',
      color: 'text-amber-600 dark:text-amber-400 bg-amber-500/10',
      badge: 'D&D 5e'
    },
    {
      id: 'dnd-stat-roller',
      name: 'D&D Stat Roller',
      desc: 'Full 6-ability score character stat generator',
      icon: Shield,
      href: '/dnd-stat-roller',
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10'
    },
    {
      id: 'dice-average-calculator',
      name: 'Dice Average Calculator',
      desc: 'Calculate expected value, min/max, & probability charts',
      icon: Calculator,
      href: '/dice-average-calculator',
      color: 'text-blue-600 dark:text-blue-400 bg-blue-500/10'
    },
    {
      id: 'unusual-dice',
      name: 'Unusual Dice Roller',
      desc: 'Non-standard polyhedra (d3, d5, d7, d14, d30, d100)',
      icon: Dices,
      href: '/unusual-dice',
      color: 'text-rose-600 dark:text-rose-400 bg-rose-500/10'
    }
  ];

  return (
    <>
      <style>{`
        .swg-header-inner { height: 68px; }
        .swg-logo-box, .swg-logo-img { height: 48px; width: auto !important; max-width: none; object-fit: contain; }
        @media (min-width: 360px) {
          .swg-logo-box, .swg-logo-img { height: 54px; }
        }
        @media (min-width: 390px) {
          .swg-logo-box, .swg-logo-img { height: 58px; }
        }
        @media (min-width: 640px) {
          .swg-header-inner { height: 72px; }
          .swg-logo-box, .swg-logo-img { height: 58px; }
        }
        @media (min-width: 768px) {
          .swg-logo-box, .swg-logo-img { height: 64px; }
        }
        @media (min-width: 1024px) {
          .swg-header-inner { height: 78px; }
          .swg-logo-box, .swg-logo-img { height: 62px; }
        }
        @media (min-width: 1280px) {
          .swg-header-inner { height: 80px; }
          .swg-logo-box, .swg-logo-img { height: 74px; }
        }
        @media (min-width: 1536px) {
          .swg-logo-box, .swg-logo-img { height: 76px; }
        }
        .dark .swg-logo-img {
          filter: drop-shadow(0 0 1.5px rgba(255, 255, 255, 0.92)) drop-shadow(0 0 8px rgba(255, 255, 255, 0.42)) drop-shadow(0 0 18px rgba(133, 135, 255, 0.55)) brightness(1.18) saturate(1.15);
        }
      `}</style>
      <header className="fixed top-0 w-full max-w-full overflow-x-clip z-50 bg-[#fbf8ff]/95 dark:bg-[#12131a]/95 backdrop-blur-xl border-b border-[#eeedf7] dark:border-[#222330] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div ref={navRef} className="swg-header-inner max-w-[1400px] mx-auto px-2.5 sm:px-4 md:px-6 lg:px-3 xl:px-4 2xl:px-6 flex items-center justify-between gap-1.5 sm:gap-3 w-full">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-2.5 xl:gap-4 2xl:gap-5 min-w-0">
            <button
              type="button"
              onClick={handleLogoClick}
              className="flex items-center group text-left cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98] shrink-0"
              aria-label="SpinWheelGames Home"
            >
              <div className="swg-logo-box relative flex items-center shrink-0">
                <Image
                  src="/spinwheel-logo-v2.webp"
                  alt="SpinWheelGames Logo"
                  width={320}
                  height={84}
                  sizes="(max-width: 639px) 220px, (max-width: 767px) 220px, (max-width: 1023px) 243px, (max-width: 1279px) 236px, 289px"
                  className="swg-logo-img block"
                  style={{ width: 'auto' }}
                  priority
                  referrerPolicy="no-referrer"
                />
              </div>
            </button>

            {/* Clean Desktop Navigation: Popular Games & Trending Games */}
            <nav className="hidden lg:flex items-center gap-0.5 2xl:gap-1 shrink-0">
              
              {/* 1. POPULAR GAMES DROPDOWN */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setPopularOpen(!popularOpen);
                    setTrendingOpen(false);
                    setProfileOpen(false);
                  }}
                  className={`px-1 xl:px-1.5 2xl:px-2 py-1.5 xl:py-2 rounded-xl text-[12px] xl:text-[13px] font-bold whitespace-nowrap transition-all flex items-center gap-0.5 xl:gap-1 2xl:gap-1.5 cursor-pointer ${
                    popularOpen
                      ? 'bg-[#4648d4] text-white shadow-sm shadow-[#4648d4]/20'
                      : 'text-[#464554] dark:text-[#c7c4d7] hover:text-[#4648d4] dark:hover:text-[#8587ff] hover:bg-[#f4f2fd] dark:hover:bg-[#1d1e28]'
                  }`}
                  aria-expanded={popularOpen}
                >
                  <Star className={`w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0 ${popularOpen ? 'text-amber-300' : 'text-amber-500'}`} />
                  <span>Popular</span>
                  <ChevronDown className={`w-3 h-3 xl:w-3.5 xl:h-3.5 shrink-0 transition-transform ${popularOpen ? 'rotate-180' : ''}`} />
                </button>

                {popularOpen && (
                  <div className="absolute left-0 top-12 w-[480px] max-w-[calc(100vw-1.5rem)] bg-white dark:bg-[#181922] rounded-2xl shadow-2xl border border-[#eeedf7] dark:border-[#292a39] p-3 z-50 animate-fadeIn">
                    <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-[#eeedf7] dark:border-[#222330]">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#767586] dark:text-[#908fa1]">
                          Most Played Wheels
                        </span>
                      </div>
                      <Link
                        href="/games"
                        onClick={() => setPopularOpen(false)}
                        className="text-[11px] font-bold text-[#4648d4] dark:text-[#8587ff] hover:underline flex items-center gap-1"
                      >
                        <span>View All Games</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-1">
                      {popularGames.map((game) => {
                        const Icon = game.icon;
                        return (
                          <Link
                            key={game.id}
                            href={game.href}
                            onClick={() => setPopularOpen(false)}
                            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#f4f2fd] dark:hover:bg-[#222330] transition-colors group"
                          >
                            <div className={`p-2 rounded-xl shrink-0 group-hover:scale-105 transition-transform ${game.color}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="text-[13px] font-bold text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors">
                                  {game.name}
                                </p>
                                {game.badge && (
                                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#4648d4]/10 text-[#4648d4] dark:text-[#8587ff]">
                                    {game.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-[#767586] dark:text-[#908fa1] truncate mt-0.5">
                                {game.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* 2. TRENDING DROPDOWN */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setTrendingOpen(!trendingOpen);
                    setPopularOpen(false);
                    setProfileOpen(false);
                  }}
                  className={`px-1 xl:px-1.5 2xl:px-2 py-1.5 xl:py-2 rounded-xl text-[12px] xl:text-[13px] font-bold whitespace-nowrap transition-all flex items-center gap-0.5 xl:gap-1 2xl:gap-1.5 cursor-pointer ${
                    trendingOpen
                      ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-sm'
                      : 'text-[#464554] dark:text-[#c7c4d7] hover:text-[#4648d4] dark:hover:text-[#8587ff] hover:bg-[#f4f2fd] dark:hover:bg-[#1d1e28]'
                  }`}
                  aria-expanded={trendingOpen}
                >
                  <Flame className={`w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0 ${trendingOpen ? 'text-amber-200 fill-amber-200' : 'text-rose-500'}`} />
                  <span>Trending</span>
                  <ChevronDown className={`w-3 h-3 xl:w-3.5 xl:h-3.5 shrink-0 transition-transform ${trendingOpen ? 'rotate-180' : ''}`} />
                </button>

                {trendingOpen && (
                  <div className="absolute left-0 top-12 w-[480px] max-w-[calc(100vw-1.5rem)] bg-white dark:bg-[#181922] rounded-2xl shadow-2xl border border-[#eeedf7] dark:border-[#292a39] p-3 z-50 animate-fadeIn">
                    <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-[#eeedf7] dark:border-[#222330]">
                      <div className="flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#767586] dark:text-[#908fa1]">
                          Fast-Rising &amp; Interactive Games
                        </span>
                      </div>
                      <Link
                        href="/games"
                        onClick={() => setTrendingOpen(false)}
                        className="text-[11px] font-bold text-[#4648d4] dark:text-[#8587ff] hover:underline flex items-center gap-1"
                      >
                        <span>All {SITE_COUNTS.wheelsFormatted} Games</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-1">
                      {trendingGames.map((game) => {
                        const Icon = game.icon;
                        return (
                          <Link
                            key={game.id}
                            href={game.href}
                            onClick={() => setTrendingOpen(false)}
                            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#f4f2fd] dark:hover:bg-[#222330] transition-colors group"
                          >
                            <div className={`p-2 rounded-xl shrink-0 group-hover:scale-105 transition-transform ${game.color}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="text-[13px] font-bold text-[#1a1b22] dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                                  {game.name}
                                </p>
                                {game.badge && (
                                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400">
                                    {game.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-[#767586] dark:text-[#908fa1] truncate mt-0.5">
                                {game.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* 3. ROLL DICE DROPDOWN */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setDiceOpen(!diceOpen);
                    setPopularOpen(false);
                    setTrendingOpen(false);
                    setProfileOpen(false);
                  }}
                  className={`px-1 xl:px-1.5 2xl:px-2 py-1.5 xl:py-2 rounded-xl text-[12px] xl:text-[13px] font-bold whitespace-nowrap transition-all flex items-center gap-0.5 xl:gap-1 2xl:gap-1.5 cursor-pointer ${
                    diceOpen
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm'
                      : 'text-[#464554] dark:text-[#c7c4d7] hover:text-[#4648d4] dark:hover:text-[#8587ff] hover:bg-[#f4f2fd] dark:hover:bg-[#1d1e28]'
                  }`}
                  aria-expanded={diceOpen}
                >
                  <Dices className={`w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0 ${diceOpen ? 'text-indigo-200' : 'text-indigo-500'}`} />
                  <span>Roll Dice</span>
                  <ChevronDown className={`w-3 h-3 xl:w-3.5 xl:h-3.5 shrink-0 transition-transform ${diceOpen ? 'rotate-180' : ''}`} />
                </button>

                {diceOpen && (
                  <div className="absolute left-0 top-12 w-[480px] max-w-[calc(100vw-1.5rem)] bg-white dark:bg-[#181922] rounded-2xl shadow-2xl border border-[#eeedf7] dark:border-[#292a39] p-3 z-50 animate-fadeIn">
                    <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-[#eeedf7] dark:border-[#222330]">
                      <div className="flex items-center gap-1.5">
                        <Dices className="w-3.5 h-3.5 text-indigo-500" />
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#767586] dark:text-[#908fa1]">
                          Interactive 3D Dice &amp; RPG Tools
                        </span>
                      </div>
                      <Link
                        href="/dice-roller"
                        onClick={() => setDiceOpen(false)}
                        className="text-[11px] font-bold text-[#4648d4] dark:text-[#8587ff] hover:underline flex items-center gap-1"
                      >
                        <span>Open 3D Roller</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-1">
                      {diceGames.map((game) => {
                        const Icon = game.icon;
                        return (
                          <Link
                            key={game.id}
                            href={game.href}
                            onClick={() => setDiceOpen(false)}
                            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#f4f2fd] dark:hover:bg-[#222330] transition-colors group"
                          >
                            <div className={`p-2 rounded-xl shrink-0 group-hover:scale-105 transition-transform ${game.color}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="text-[13px] font-bold text-[#1a1b22] dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                  {game.name}
                                </p>
                                {game.badge && (
                                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                                    {game.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-[#767586] dark:text-[#908fa1] truncate mt-0.5">
                                {game.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* 4. CATEGORIES DROPDOWN (15 Category Hubs) */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setCategoriesOpen(!categoriesOpen);
                    setPopularOpen(false);
                    setTrendingOpen(false);
                    setDiceOpen(false);
                    setProfileOpen(false);
                  }}
                  className={`px-1 xl:px-1.5 2xl:px-2 py-1.5 xl:py-2 rounded-xl text-[12px] xl:text-[13px] font-bold whitespace-nowrap transition-all flex items-center gap-0.5 xl:gap-1 2xl:gap-1.5 cursor-pointer ${
                    categoriesOpen
                      ? 'bg-[#4648d4] text-white shadow-sm'
                      : 'text-[#464554] dark:text-[#c7c4d7] hover:text-[#4648d4] dark:hover:text-[#8587ff] hover:bg-[#f4f2fd] dark:hover:bg-[#1d1e28]'
                  }`}
                  aria-expanded={categoriesOpen}
                >
                  <Sparkles className={`w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0 ${categoriesOpen ? 'text-amber-200' : 'text-[#4648d4] dark:text-[#8587ff]'}`} />
                  <span>Categories</span>
                  <ChevronDown className={`w-3 h-3 xl:w-3.5 xl:h-3.5 shrink-0 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} />
                </button>
                {categoriesOpen && (
                  <div className="absolute left-0 top-12 w-[540px] max-w-[calc(100vw-1.5rem)] bg-white dark:bg-[#181922] rounded-2xl shadow-2xl border border-[#eeedf7] dark:border-[#292a39] p-3 z-50 animate-fadeIn">
                    <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-[#eeedf7] dark:border-[#222330]">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#767586] dark:text-[#908fa1]">
                          15 Category Topic Hubs
                        </span>
                      </div>
                      <Link
                        href="/categories"
                        onClick={() => setCategoriesOpen(false)}
                        className="text-[11px] font-bold text-[#4648d4] dark:text-[#8587ff] hover:underline flex items-center gap-1"
                      >
                        <span>All Categories</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 max-h-[360px] overflow-y-auto pr-1">
                      {[
                        { name: 'Food & Dining', path: '/food', desc: 'Dinner, lunch & restaurant wheels' },
                        { name: 'Sports & Teams', path: '/sports', desc: 'NBA, NFL, squads & draft lotteries' },
                        { name: 'Travel & Trips', path: '/travel', desc: 'Vacations, road trips & destinations' },
                        { name: 'Finance & Budget', path: '/finance', desc: 'Savings & budget decisions' },
                        { name: 'Classroom & School', path: '/classroom', desc: 'Student callers & teacher tools' },
                        { name: 'Party & Social', path: '/party', desc: 'Truth or Dare & group games' },
                        { name: 'Decisions', path: '/decisions', desc: 'Yes/No & everyday choice solvers' },
                        { name: 'Games & Esports', path: '/games', desc: 'Minecraft, Fortnite & RPG wheels' },
                        { name: 'Numbers & RNG', path: '/numbers', desc: 'Random integers & dice wheels' },
                        { name: 'Wellness & Calm', path: '/wellness', desc: 'Self-care & mindfulness pauses' },
                        { name: 'Productivity', path: '/productivity', desc: 'Task deciders & Pomodoro breaks' },
                        { name: 'Creativity & Art', path: '/creativity', desc: 'Story starters & drawing prompts' },
                        { name: 'Daily Challenges', path: '/challenges', desc: 'Micro-quests & dare battles' },
                        { name: 'Date Night', path: '/date-night', desc: 'Romantic couples deciders' },
                        { name: 'Icebreakers', path: '/icebreakers', desc: 'Meeting warmups & remote team games' },
                      ].map((cat, idx) => (
                        <Link
                          key={idx}
                          href={cat.path}
                          onClick={() => setCategoriesOpen(false)}
                          className="flex flex-col p-2 rounded-xl hover:bg-[#f4f2fd] dark:hover:bg-[#222330] transition-colors group"
                        >
                          <span className="text-[13px] font-bold text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors">
                            {cat.name}
                          </span>
                          <span className="text-[11px] text-[#767586] dark:text-[#908fa1] truncate">
                            {cat.desc}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 5. Direct All Games Link */}
              <Link
                href="/games"
                className="px-1 xl:px-1.5 2xl:px-2 py-1.5 xl:py-2 rounded-xl text-[12px] xl:text-[13px] font-semibold whitespace-nowrap text-[#464554] dark:text-[#c7c4d7] hover:text-[#4648d4] dark:hover:text-[#8587ff] hover:bg-[#f4f2fd] dark:hover:bg-[#1d1e28] transition-colors"
              >
                All Games
              </Link>
            </nav>
          </div>

          {/* Quick Actions (Dice, Search, Create, Sound, Theme, User) */}
          <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-1 xl:gap-1.5 2xl:gap-2 shrink-0">
            
            {/* Search Trigger */}
            <button
              id="header-search-btn"
              type="button"
              onClick={handleOpenSearch}
              aria-label="Search wheels"
              className="flex items-center gap-2 p-1.5 sm:p-2 md:px-3 md:py-2 lg:p-2 xl:px-2.5 2xl:px-3 xl:py-2 rounded-xl bg-[#f4f2fd] dark:bg-[#1d1e28] hover:bg-[#eae8f7] dark:hover:bg-[#282937] text-[#464554] dark:text-[#c7c4d7] hover:text-[#1a1b22] dark:hover:text-white transition-colors border border-[#eeedf7] dark:border-[#292a39] text-xs sm:text-[13px] font-semibold cursor-pointer"
            >
              <Search className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
              <span className="hidden md:inline lg:hidden xl:inline">Search</span>
              <kbd className="hidden 2xl:inline text-[10px] font-medium px-1.5 py-0.5 rounded bg-white dark:bg-[#12131a] text-[#767586] dark:text-[#908fa1] border border-[#eeedf7] dark:border-[#383a4c]">
                ⌘K
              </kbd>
            </button>

            {/* Create Wheel Button */}
            <button
              id="header-create-wheel-btn"
              type="button"
              onClick={handleOpenCreateWheel}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 lg:px-2 xl:px-2.5 2xl:px-3.5 py-2 rounded-xl bg-[#4648d4] text-white text-[12.5px] xl:text-[13px] font-bold hover:bg-[#3b3dbb] shadow-xs transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <PlusCircle className="w-4 h-4 shrink-0" />
              <span>Create<span className="lg:hidden xl:inline"> Wheel</span></span>
            </button>

            {/* Audio Sound Toggle */}
            <button
              type="button"
              onClick={handleToggleSound}
              aria-label={isSoundActive ? 'Mute sound effects' : 'Enable sound effects'}
              className="hidden sm:flex p-2 rounded-xl bg-[#f4f2fd] dark:bg-[#1d1e28] text-[#464554] dark:text-[#c7c4d7] hover:text-[#1a1b22] dark:hover:text-white border border-[#eeedf7] dark:border-[#292a39] transition-colors cursor-pointer"
              title={isSoundActive ? 'Sound On' : 'Sound Off'}
            >
              {isSoundActive ? (
                <Volume2 className="w-4 h-4 text-[#4648d4] dark:text-[#8587ff]" />
              ) : (
                <VolumeX className="w-4 h-4 text-[#767586]" />
              )}
            </button>

            {/* Dark/Light Theme Toggle */}
            <button
              id="header-theme-toggle-btn"
              type="button"
              onClick={toggleDarkMode}
              aria-label="Toggle dark and light theme"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-1.5 sm:p-2 rounded-xl bg-[#f4f2fd] dark:bg-[#1d1e28] text-[#464554] dark:text-[#c7c4d7] hover:text-[#1a1b22] dark:hover:text-white border border-[#eeedf7] dark:border-[#292a39] transition-colors cursor-pointer"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-[#4648d4]" />
              )}
            </button>

            {/* User Profile / Saved Wheels */}
            <div className="relative hidden sm:flex items-center">
              <button
                type="button"
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setPopularOpen(false);
                  setTrendingOpen(false);
                }}
                aria-label="User account menu"
                className="flex items-center gap-1 rounded-full p-0.5 hover:ring-2 hover:ring-[#4648d4]/30 transition-all cursor-pointer"
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#c7c4d7] dark:border-[#464554]">
                  <Image
                    src="/avatar.svg"
                    alt="User Profile"
                    fill
                    sizes="36px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#464554] dark:text-[#c7c4d7]" />
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div
                  className="absolute right-0 top-11 w-64 bg-white dark:bg-[#181922] rounded-2xl shadow-xl border border-[#eeedf7] dark:border-[#292a39] py-2 z-50 animate-fadeIn"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="px-4 py-2.5 border-b border-[#eeedf7] dark:border-[#222330]">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#c7c4d7] dark:border-[#464554] shrink-0">
                        <Image
                          src="/avatar.svg"
                          alt="User Profile"
                          fill
                          sizes="36px"
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[14px] font-bold text-[#1a1b22] dark:text-white truncate">
                          Spin Master
                        </p>
                        <p className="text-[11px] text-[#767586] dark:text-[#908fa1]">
                          Verified Free Profile
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="py-1.5 text-[13px] text-[#1a1b22] dark:text-[#f1effa]">
                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        setSavedModalOpen(true);
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-[#f4f2fd] dark:hover:bg-[#222330] flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-semibold">
                        <Heart className="w-4 h-4 fill-rose-500/20" />
                        <span>My Saved Wheels</span>
                      </div>
                      <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300">
                        {savedWheels.length}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        router.push('/challenges');
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-[#f4f2fd] dark:hover:bg-[#222330] flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                        <Flame className="w-4 h-4" />
                        <span>Daily Streak</span>
                      </div>
                      <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                        Day {stats.currentDailyStreak || 1}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        handleOpenCreateWheel();
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-[#f4f2fd] dark:hover:bg-[#222330] flex items-center gap-2 text-[#4648d4] dark:text-[#8587ff] font-medium cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Build New Wheel</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile & Tablet Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#1d1e28] cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#1a1b22] dark:text-white" />
              ) : (
                <Menu className="w-6 h-6 text-[#1a1b22] dark:text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Accessible Mobile & Tablet Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-[#181922] border-b border-[#eeedf7] dark:border-[#222330] px-4 py-4 flex flex-col gap-3 shadow-xl max-h-[85vh] overflow-y-auto">
            
            {/* Mobile Segmented Tab: Popular vs Trending vs Dice */}
            <div className="flex p-1 bg-[#f4f2fd] dark:bg-[#12131a] rounded-xl border border-[#eeedf7] dark:border-[#292a39] gap-1">
              <button
                type="button"
                onClick={() => setMobileTab('popular')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer min-h-[40px] ${
                  mobileTab === 'popular'
                    ? 'bg-white dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff] shadow-xs'
                    : 'text-[#767586] dark:text-[#908fa1]'
                }`}
              >
                <Star className="w-3.5 h-3.5 text-amber-500" />
                <span>Popular</span>
              </button>
              
              <button
                type="button"
                onClick={() => setMobileTab('trending')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer min-h-[40px] ${
                  mobileTab === 'trending'
                    ? 'bg-white dark:bg-[#222330] text-rose-600 dark:text-rose-400 shadow-xs'
                    : 'text-[#767586] dark:text-[#908fa1]'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-rose-500" />
                <span>Trending</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileTab('dice')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer min-h-[40px] ${
                  mobileTab === 'dice'
                    ? 'bg-white dark:bg-[#222330] text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-[#767586] dark:text-[#908fa1]'
                }`}
              >
                <Dices className="w-3.5 h-3.5 text-indigo-500" />
                <span>Roll Dice</span>
              </button>
            </div>

            {/* Mobile Games List with High-Accessibility Touch Targets (>= 44px) */}
            <div className="flex flex-col gap-1">
              {(mobileTab === 'popular' ? popularGames : mobileTab === 'trending' ? trendingGames : diceGames).map((game) => {
                const Icon = game.icon;
                return (
                  <Link
                    key={game.id}
                    href={game.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#f4f2fd] dark:hover:bg-[#222330] active:scale-[0.99] transition-all min-h-[52px]"
                  >
                    <div className={`p-2.5 rounded-xl shrink-0 ${game.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[14px] font-bold text-[#1a1b22] dark:text-white truncate">
                          {game.name}
                        </span>
                        {game.badge && (
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            mobileTab === 'popular'
                              ? 'bg-[#4648d4]/10 text-[#4648d4] dark:text-[#8587ff]'
                              : mobileTab === 'trending'
                              ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                              : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                          }`}>
                            {game.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#767586] dark:text-[#908fa1] truncate">
                        {game.desc}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#767586] shrink-0" />
                  </Link>
                );
              })}
            </div>

            {/* All 100+ Games Button */}
            <Link
              href="/games"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 px-4 rounded-xl bg-[#f4f2fd] dark:bg-[#1d1e28] text-[#4648d4] dark:text-[#8587ff] text-[13px] font-bold flex items-center justify-between border border-[#eeedf7] dark:border-[#292a39] min-h-[44px]"
            >
              <span>Explore All {SITE_COUNTS.wheelsFormatted} Games &amp; Spinners</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Quick Action Footer in Mobile Drawer */}
            <div className="pt-2 border-t border-[#eeedf7] dark:border-[#222330] flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setSavedModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 text-xs font-bold flex items-center justify-center gap-1.5 min-h-[44px]"
              >
                <Heart className="w-4 h-4 fill-rose-500/20" />
                <span>Saved ({savedWheels.length})</span>
              </button>

              <button
                type="button"
                onClick={handleToggleSound}
                className="py-2.5 px-3 rounded-xl bg-[#f4f2fd] dark:bg-[#1d1e28] text-[#464554] dark:text-[#c7c4d7] text-xs font-bold flex items-center justify-center gap-1.5 min-h-[44px]"
                title={isSoundActive ? 'Sound On' : 'Sound Off'}
              >
                {isSoundActive ? <Volume2 className="w-4 h-4 text-[#4648d4] dark:text-[#8587ff]" /> : <VolumeX className="w-4 h-4 text-[#767586]" />}
                <span>{isSoundActive ? 'Sound' : 'Muted'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  handleOpenCreateWheel();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-[#4648d4] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm min-h-[44px]"
              >
                <Plus className="w-4 h-4" />
                <span>Create</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Internal Search Modal fallback */}
      <SearchModal
        isOpen={internalSearchOpen}
        onClose={() => setInternalSearchOpen(false)}
        onSelectWheel={(preset) => {
          setInternalSearchOpen(false);
          if (onSelectPreset) {
            onSelectPreset(preset);
          } else {
            router.push(`/${preset.id}`);
          }
        }}
      />

      {/* Saved Wheels Modal */}
      <SavedWheelsModal
        isOpen={savedModalOpen}
        onClose={() => setSavedModalOpen(false)}
        onSelectWheel={(wheel) => {
          if (onSelectPreset) {
            onSelectPreset(wheel);
          } else {
            router.push(`/${wheel.id}`);
          }
        }}
        onOpenCreate={() => handleOpenCreateWheel()}
      />
    </>
  );
}
