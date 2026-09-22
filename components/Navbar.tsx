'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import Image from 'next/image';
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
  Heart
} from 'lucide-react';
import {
  subscribeTheme,
  getThemeSnapshot,
  getThemeServerSnapshot,
  toggleTheme,
  applySavedTheme
} from '@/lib/theme';
import {
  useSavedWheels,
  loadUserStats,
  SavedWheel
} from '@/lib/storage';
import { WheelConfig } from '@/lib/presets';
import SavedWheelsModal from './SavedWheelsModal';

interface NavbarProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenSearch: () => void;
  onOpenCreateWheel: () => void;
  activeNav: string;
  onSelectNav: (nav: string) => void;
  onSelectPreset?: (wheel: WheelConfig) => void;
}

export default function Navbar({
  soundEnabled,
  onToggleSound,
  onOpenSearch,
  onOpenCreateWheel,
  activeNav,
  onSelectNav,
  onSelectPreset
}: NavbarProps) {
  const isDark = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot
  );

  const savedWheels = useSavedWheels();

  const [stats] = useState(() => {
    try {
      const userStats = loadUserStats();
      return { currentDailyStreak: userStats.currentDailyStreak || 7 };
    } catch {
      return { currentDailyStreak: 7 };
    }
  });
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [savedModalOpen, setSavedModalOpen] = useState(false);

  useEffect(() => {
    applySavedTheme();
  }, [isDark]);

  const toggleDarkMode = () => {
    toggleTheme();
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'classroom', label: 'Classroom' },
    { id: 'giveaway', label: 'Giveaways' },
    { id: 'business', label: 'Business' },
    { id: 'wheel-games', label: 'Multi-Wheel' },
    { id: 'battle', label: 'Battle' }
  ];

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-[#fbf8ff]/90 dark:bg-[#12131a]/90 backdrop-blur-xl border-b border-[#eeedf7] dark:border-[#222330] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo and Brand */}
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => onSelectNav('home')}
              className="flex items-center gap-2.5 group text-left cursor-pointer"
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden shadow-sm group-hover:rotate-45 transition-transform duration-300">
                <Image
                  src="/logo.svg"
                  alt="SpinWheelGames Logo"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-headline font-extrabold text-[18px] tracking-tight bg-gradient-to-r from-[#4648d4] via-[#6063ee] to-[#7c7fff] bg-clip-text text-transparent">
                  SpinWheelGames
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => onSelectNav(link.id)}
                  className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors cursor-pointer ${
                    activeNav === link.id
                      ? 'bg-[#4648d4]/10 dark:bg-[#4648d4]/20 text-[#4648d4] dark:text-[#8587ff] font-semibold'
                      : 'text-[#464554] dark:text-[#c7c4d7] hover:text-[#1a1b22] dark:hover:text-white hover:bg-[#f4f2fd] dark:hover:bg-[#1d1e28]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Quick Actions & Profile */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search Trigger */}
            <button
              id="header-search-btn"
              type="button"
              onClick={onOpenSearch}
              aria-label="Search all 106+ wheels"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#f4f2fd] dark:bg-[#1d1e28] hover:bg-[#eae8f7] dark:hover:bg-[#282937] text-[#464554] dark:text-[#c7c4d7] hover:text-[#1a1b22] dark:hover:text-white transition-colors border border-[#eeedf7] dark:border-[#292a39] text-xs sm:text-sm cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
              <span className="hidden sm:inline">Search Wheels</span>
              <kbd className="hidden sm:inline text-[10px] font-medium px-1.5 py-0.5 rounded bg-white dark:bg-[#12131a] text-[#767586] dark:text-[#908fa1] border border-[#eeedf7] dark:border-[#383a4c]">
                ⌘K
              </kbd>
            </button>

            {/* Create Wheel Button */}
            <button
              id="header-create-wheel-btn"
              type="button"
              onClick={onOpenCreateWheel}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#4648d4] text-white text-[13px] font-semibold hover:bg-[#3b3dbb] shadow-xs transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Wheel</span>
            </button>

            {/* Audio Toggle */}
            <button
              type="button"
              onClick={onToggleSound}
              aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
              className="p-2 rounded-xl bg-[#f4f2fd] dark:bg-[#1d1e28] text-[#464554] dark:text-[#c7c4d7] hover:text-[#1a1b22] dark:hover:text-white border border-[#eeedf7] dark:border-[#292a39] transition-colors cursor-pointer"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-[#4648d4] dark:text-[#8587ff]" />
              ) : (
                <VolumeX className="w-4 h-4 text-[#767586]" />
              )}
            </button>

            {/* Theme Toggle */}
            <button
              id="header-theme-toggle-btn"
              type="button"
              onClick={toggleDarkMode}
              aria-label="Toggle dark and light theme"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 rounded-xl bg-[#f4f2fd] dark:bg-[#1d1e28] text-[#464554] dark:text-[#c7c4d7] hover:text-[#1a1b22] dark:hover:text-white border border-[#eeedf7] dark:border-[#292a39] transition-colors cursor-pointer"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-[#4648d4]" />
              )}
            </button>

            {/* User Profile Menu */}
            <div className="relative flex items-center">
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                aria-label="User account menu"
                className="flex items-center gap-1 rounded-full p-0.5 hover:ring-2 hover:ring-[#4648d4]/30 transition-all cursor-pointer"
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#c7c4d7] dark:border-[#464554]">
                  <Image
                    src="/avatar.svg"
                    alt="Alex Spinmaster Profile"
                    fill
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
                          alt="Alex Spinmaster Profile"
                          fill
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[14px] font-bold text-[#1a1b22] dark:text-white truncate">
                          Alex Spinmaster
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
                      className="w-full text-left px-4 py-2 hover:bg-[#f4f2fd] dark:hover:bg-[#222330] flex items-center justify-between cursor-pointer"
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
                        onSelectNav('home');
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-[#f4f2fd] dark:hover:bg-[#222330] flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
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
                        onOpenCreateWheel();
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-[#f4f2fd] dark:hover:bg-[#222330] flex items-center gap-2 text-[#4648d4] dark:text-[#8587ff] font-medium cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Build New Wheel</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#1d1e28] cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-[#181922] border-b border-[#eeedf7] dark:border-[#222330] px-4 py-3 flex flex-col gap-1 shadow-lg">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => {
                  onSelectNav(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-lg text-[14px] font-medium transition-colors cursor-pointer ${
                  activeNav === link.id
                    ? 'bg-[#4648d4] text-white font-semibold'
                    : 'text-[#1a1b22] dark:text-[#f1effa] hover:bg-[#f4f2fd] dark:hover:bg-[#222330]'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-[#eeedf7] dark:border-[#222330] flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setSavedModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 px-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 text-[13px] font-bold flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 fill-rose-500" />
                  <span>My Saved Wheels</span>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-rose-200 dark:bg-rose-900 text-rose-800 dark:text-rose-100">
                  {savedWheels.length}
                </span>
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onOpenSearch();
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2 rounded-xl bg-[#f4f2fd] dark:bg-[#1d1e28] text-[13px] font-medium flex items-center justify-center gap-1.5 cursor-pointer text-[#1a1b22] dark:text-white"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onOpenCreateWheel();
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2 rounded-xl bg-[#4648d4] text-white text-[13px] font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Saved Wheels Modal */}
      <SavedWheelsModal
        isOpen={savedModalOpen}
        onClose={() => setSavedModalOpen(false)}
        onSelectWheel={(wheel) => {
          if (onSelectPreset) {
            onSelectPreset(wheel);
          }
        }}
        onOpenCreate={() => onOpenCreateWheel()}
      />
    </>
  );
}
