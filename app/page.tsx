'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import WheelWorkspace from '@/components/WheelWorkspace';
import PurposeCards from '@/components/PurposeCards';
import PopularWheels from '@/components/PopularWheels';
import GameCards from '@/components/GameCards';
import HomeDicePromo from '@/components/HomeDicePromo';
import DailyChallenge from '@/components/DailyChallenge';
import CreateWheelCTA from '@/components/CreateWheelCTA';
import CategoryGrid from '@/components/CategoryGrid';
import UseCaseCards from '@/components/UseCaseCards';
import FairRandomness from '@/components/FairRandomness';
import HowItWorks from '@/components/HowItWorks';
import GuideCards from '@/components/GuideCards';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';
import WinnerModal from '@/components/WinnerModal';
import ImportExport from '@/components/ImportExport';
import SharePanel from '@/components/SharePanel';
import CreateWheelModal from '@/components/CreateWheelModal';
import SearchModal from '@/components/SearchModal';

import {
  WHEEL_PRESETS,
  WheelConfig,
  WheelItem,
  COLOR_PALETTES
} from '@/lib/presets';
import {
  Disc,
  Layers,
  Trophy,
  Calendar,
  ShieldCheck,
  Share2,
  ArrowLeftRight,
  Swords,
  GraduationCap,
  Gift,
  Briefcase,
  ChevronDown,
  Loader2
} from 'lucide-react';
import { WheelMode, SpinLogItem, SoundSettings } from '@/lib/types';
import { selectWeightedWinner } from '@/lib/random';
import {
  loadPreferences,
  savePreferences,
  loadSoundSettings,
  saveSoundSettings,
  useAppPreferences,
  useAppSoundSettings,
  DEFAULT_PREFERENCES,
  DEFAULT_SOUND_SETTINGS
} from '@/lib/storage';
import { parseSafeShareConfig, sanitizeString } from '@/lib/security';
import { fetchWheelByShortCode, decodeCompactWheel } from '@/lib/shortener';

// Skeleton fallback for zero-shift dynamic imports
function EngineSkeleton({ title }: { title: string }) {
  return (
    <div className="w-full min-h-[480px] bg-white dark:bg-[#181922] rounded-3xl border border-[#eeedf7] dark:border-[#222330] p-8 flex flex-col items-center justify-center gap-3 animate-pulse text-center">
      <Loader2 className="w-8 h-8 text-[#4648d4] dark:text-[#8587ff] animate-spin" />
      <span className="text-[14px] font-bold text-[#1a1b22] dark:text-[#f1effa]">
        {title}
      </span>
      <span className="text-[12px] text-[#767586] dark:text-[#908fa1]">
        Initializing Fair Spinner &amp; Wheel Game...
      </span>
    </div>
  );
}

// Dynamically imported heavy sub-engines to optimize initial bundle & LCP
const ClassroomModeView = dynamic(() => import('@/components/ClassroomModeView'), {
  loading: () => <EngineSkeleton title="Loading Classroom Suite..." />,
  ssr: false
});

const GiveawayModeView = dynamic(() => import('@/components/GiveawayModeView'), {
  loading: () => <EngineSkeleton title="Loading Giveaway Suite..." />,
  ssr: false
});

const BusinessModeView = dynamic(() => import('@/components/BusinessModeView'), {
  loading: () => <EngineSkeleton title="Loading Business Suite..." />,
  ssr: false
});

const MultiWheelEngine = dynamic(() => import('@/components/MultiWheelEngine'), {
  loading: () => <EngineSkeleton title="Loading Multi-Wheel Studio..." />,
  ssr: false
});

const TournamentEngine = dynamic(() => import('@/components/TournamentEngine'), {
  loading: () => <EngineSkeleton title="Loading Elimination Tournament..." />,
  ssr: false
});

const ChallengeEngine = dynamic(() => import('@/components/ChallengeEngine'), {
  loading: () => <EngineSkeleton title="Loading Daily Challenge..." />,
  ssr: false
});

const WheelBattleEngine = dynamic(() => import('@/components/WheelBattleEngine'), {
  loading: () => <EngineSkeleton title="Loading Wheel Battle Arena..." />,
  ssr: false
});

const FairnessPanel = dynamic(() => import('@/components/FairnessPanel'), {
  loading: () => <EngineSkeleton title="Loading Fair Chance Verification..." />,
  ssr: false
});

type EngineView =
  | 'solo'
  | 'multi'
  | 'tournament'
  | 'challenge'
  | 'battle'
  | 'fairness'
  | 'classroom'
  | 'giveaway'
  | 'business';

function getInitialWheelConfig(): WheelConfig {
  if (typeof window !== 'undefined') {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const presetId = searchParams.get('preset');
      if (presetId) {
        const found = WHEEL_PRESETS.find((p) => p.id === presetId);
        if (found) return found;
      }
      const compactPayload = searchParams.get('c');
      if (compactPayload) {
        const compactConfig = decodeCompactWheel(compactPayload);
        if (compactConfig) return compactConfig;
      }
      const dataPayload = searchParams.get('data');
      if (dataPayload) {
        const safeConfig = parseSafeShareConfig(dataPayload);
        if (safeConfig) return safeConfig;
      }
    } catch {
      // Ignore URL parsing errors on fallback
    }
  }
  return WHEEL_PRESETS[0];
}

export default function HomePage() {
  const defaultConfig = WHEEL_PRESETS[0];

  // Reactive storage hooks for client preferences (safe for SSR & hydration)
  const [appPrefs, updateAppPrefs] = useAppPreferences();
  const [soundSettings, setSoundSettings] = useAppSoundSettings();

  const currentMode = appPrefs.mode || 'standard';
  const spinDuration = appPrefs.duration || 6;

  // Current wheel configuration (defaults to WHEEL_PRESETS[0] for deterministic SSR)
  const [currentWheel, setCurrentWheel] = useState<WheelConfig>(defaultConfig);
  const [wheelTitle, setWheelTitle] = useState(defaultConfig.title);
  const [items, setItems] = useState<WheelItem[]>(defaultConfig.items);
  const [activePaletteKey, setActivePaletteKey] = useState(defaultConfig.themeKey || 'arcade');
  const [palette, setPalette] = useState<string[]>(
    defaultConfig.palette || COLOR_PALETTES[defaultConfig.themeKey || 'arcade']?.colors || COLOR_PALETTES.arcade.colors
  );
  const [engineView, setEngineView] = useState<EngineView>('solo');

  // Sync client search params after hydration
  useEffect(() => {
    queueMicrotask(async () => {
      if (typeof window === 'undefined') return;
      const searchParams = new URLSearchParams(window.location.search);
      const shortCode = searchParams.get('s') || searchParams.get('w');

      if (shortCode) {
        const fetchedWheel = await fetchWheelByShortCode(shortCode);
        if (fetchedWheel) {
          setCurrentWheel(fetchedWheel);
          setWheelTitle(fetchedWheel.title);
          setItems(fetchedWheel.items);
          setActivePaletteKey(fetchedWheel.themeKey || 'arcade');
          setPalette(
            fetchedWheel.palette || COLOR_PALETTES[fetchedWheel.themeKey || 'arcade']?.colors || COLOR_PALETTES.arcade.colors
          );
          return;
        }
      }

      const initialConfig = getInitialWheelConfig();
      if (initialConfig.id !== defaultConfig.id || initialConfig.title !== defaultConfig.title) {
        setCurrentWheel(initialConfig);
        setWheelTitle(initialConfig.title);
        setItems(initialConfig.items);
        setActivePaletteKey(initialConfig.themeKey || 'arcade');
        setPalette(
          initialConfig.palette || COLOR_PALETTES[initialConfig.themeKey || 'arcade']?.colors || COLOR_PALETTES.arcade.colors
        );
      }
    });
  }, [defaultConfig.id, defaultConfig.title, defaultConfig.themeKey, defaultConfig.palette]);

  // Spinning and Pre-selected Winner
  const [isSpinning, setIsSpinning] = useState(false);
  const [preSelectedWinner, setPreSelectedWinner] = useState<{
    winner: WheelItem;
    winnerIndex: number;
    seed: string;
    oddsPercent: string;
  } | null>(null);

  // Spin Log History
  const [spinLogs, setSpinLogs] = useState<SpinLogItem[]>([
    {
      id: 'log-1',
      spinNumber: 1,
      time: '12:00:00',
      itemText: 'Wood-Fired Pizza',
      seed: '0x8F9A4B22',
      oddsPercent: '12.5'
    }
  ]);

  // Modal States
  const [winnerModalOpen, setWinnerModalOpen] = useState(false);
  const [winnerItem, setWinnerItem] = useState<WheelItem | null>(null);
  const [lastSpinNumber, setLastSpinNumber] = useState(1);
  const [importExportOpen, setImportExportOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [createWheelOpen, setCreateWheelOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const [moreSuitesOpen, setMoreSuitesOpen] = useState(false);

  // Select Preset Wheel
  const handleSelectPreset = useCallback((preset: WheelConfig) => {
    setCurrentWheel(preset);
    setWheelTitle(preset.title);
    setItems(preset.items);
    setPalette(preset.palette || COLOR_PALETTES[preset.themeKey || 'arcade']?.colors || COLOR_PALETTES.arcade.colors);
    setEngineView('solo');
    const workspace = document.getElementById('interactive-workspace');
    if (workspace) {
      workspace.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Save preferences to localStorage on change
  const handleUpdateSoundSettings = (newSettings: SoundSettings) => {
    setSoundSettings(newSettings);
  };

  const handleUpdateDuration = (dur: number) => {
    updateAppPrefs({ duration: dur });
  };

  const handleSelectMode = (mode: WheelMode) => {
    updateAppPrefs({ mode });
  };

  // Trigger Spin with Cryptographic Pre-selection
  const handleTriggerSpin = useCallback(() => {
    if (isSpinning || items.length < 2) return;

    // Determine fresh winner BEFORE animation using crypto.getRandomValues()
    const selection = selectWeightedWinner(items);
    setPreSelectedWinner(selection);
    setIsSpinning(true);
    setWinnerModalOpen(false);
  }, [isSpinning, items]);

  // Spin End Callback from WheelCanvas
  const handleSpinEnd = (winner: WheelItem) => {
    setIsSpinning(false);
    setWinnerItem(winner);

    const newSpinNum = lastSpinNumber + 1;
    setLastSpinNumber(newSpinNum);

    // Record to Audit Logs
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const newLog: SpinLogItem = {
      id: `log-${Date.now()}`,
      spinNumber: newSpinNum,
      time: timeStr,
      itemText: sanitizeString(winner.text),
      seed: preSelectedWinner?.seed || '0x94F2B01E',
      oddsPercent: preSelectedWinner?.oddsPercent || '12.5'
    };
    setSpinLogs((prev) => [newLog, ...prev.slice(0, 24)]);

    // Open celebration modal
    setWinnerModalOpen(true);
  };

  // Reset current wheel to original preset state
  const handleResetWheel = () => {
    setItems(currentWheel.items);
  };

  // Select color palette
  const handleSelectPalette = (key: string) => {
    setActivePaletteKey(key);
    if (COLOR_PALETTES[key]) {
      setPalette(COLOR_PALETTES[key].colors);
    }
  };

  // Remove winner (for elimination or manual click)
  const handleRemoveWinner = (item: WheelItem) => {
    if (items.length <= 2) {
      return;
    }
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    setWinnerModalOpen(false);
  };

  // Spin again from modal
  const handleSpinAgain = () => {
    setWinnerModalOpen(false);
    setTimeout(() => {
      handleTriggerSpin();
    }, 200);
  };

  // Import items from TXT/CSV/JSON
  const handleImportItems = (newItems: WheelItem[], newTitle?: string) => {
    setItems(newItems);
    if (newTitle) setWheelTitle(newTitle);
  };

  // Navigation Click Handler
  const handleNavClick = (navId: string) => {
    setActiveNav(navId);
    if (navId === 'spin-wheel' || navId === 'home') {
      setEngineView('solo');
      document.getElementById('interactive-workspace')?.scrollIntoView({ behavior: 'smooth' });
    } else if (navId === 'classroom') {
      setEngineView('classroom');
      document.getElementById('interactive-workspace')?.scrollIntoView({ behavior: 'smooth' });
    } else if (navId === 'giveaway') {
      setEngineView('giveaway');
      document.getElementById('interactive-workspace')?.scrollIntoView({ behavior: 'smooth' });
    } else if (navId === 'business') {
      setEngineView('business');
      document.getElementById('interactive-workspace')?.scrollIntoView({ behavior: 'smooth' });
    } else if (navId === 'wheel-games' || navId === 'games') {
      setEngineView('multi');
      document.getElementById('interactive-workspace')?.scrollIntoView({ behavior: 'smooth' });
    } else if (navId === 'challenges') {
      setEngineView('challenge');
      document.getElementById('interactive-workspace')?.scrollIntoView({ behavior: 'smooth' });
    } else if (navId === 'battle' || navId === 'wheel-battle') {
      setEngineView('battle');
      document.getElementById('interactive-workspace')?.scrollIntoView({ behavior: 'smooth' });
    } else if (navId === 'how-it-works' || navId === 'fairness') {
      setEngineView('fairness');
      document.getElementById('interactive-workspace')?.scrollIntoView({ behavior: 'smooth' });
    } else if (navId === 'random-pickers' || navId === 'templates' || navId === 'categories') {
      document.getElementById('wheel-catalogs')?.scrollIntoView({ behavior: 'smooth' });
    } else if (navId === 'create-wheel' || navId === 'create') {
      setCreateWheelOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8ff] dark:bg-[#12131a] text-[#1a1b22] dark:text-[#f1effa] transition-colors">
      {/* Fixed Header */}
      <Navbar
        soundEnabled={soundSettings.enabled}
        onToggleSound={() =>
          handleUpdateSoundSettings({ ...soundSettings, enabled: !soundSettings.enabled })
        }
        onOpenSearch={() => setSearchOpen(true)}
        onOpenCreateWheel={() => setCreateWheelOpen(true)}
        activeNav={activeNav}
        onSelectNav={handleNavClick}
        onSelectPreset={handleSelectPreset}
      />

      {/* Main Container */}
      <main className="w-full pt-20 sm:pt-22 lg:pt-24 flex-1 flex flex-col">
        {/* Top Hero Banner */}
        <HeroBanner
          onSpinClick={() => {
            setEngineView('solo');
            document.getElementById('interactive-workspace')?.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
              handleTriggerSpin();
            }, 300);
          }}
          onExploreClick={() => {
            document.getElementById('wheel-catalogs')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Engine Modes Switcher Bar - Compact & Clean */}
        <div id="interactive-workspace" className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 pt-2 sm:pt-3 pb-1">
          <div className="flex flex-wrap items-center justify-between gap-2.5 bg-white dark:bg-[#181922] p-1.5 sm:p-2 rounded-2xl border border-[#eeedf7] dark:border-[#222330] shadow-2xs">
            {/* Primary View Switcher Pills */}
            <div className="flex flex-wrap items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  setEngineView('solo');
                  setMoreSuitesOpen(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-[12px] sm:text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  engineView === 'solo'
                    ? 'bg-[#4648d4] text-white shadow-xs'
                    : 'text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330]'
                }`}
              >
                <Disc className="w-3.5 h-3.5" />
                <span>Classic Spinner</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setEngineView('classroom');
                  setMoreSuitesOpen(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-[12px] sm:text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  engineView === 'classroom'
                    ? 'bg-[#4648d4] text-white shadow-xs'
                    : 'text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330]'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 text-emerald-500" />
                <span className="hidden sm:inline">Classroom Suite</span>
                <span className="sm:hidden">Classroom</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setEngineView('giveaway');
                  setMoreSuitesOpen(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-[12px] sm:text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  engineView === 'giveaway'
                    ? 'bg-[#4648d4] text-white shadow-xs'
                    : 'text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330]'
                }`}
              >
                <Gift className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">Giveaway Suite</span>
                <span className="sm:hidden">Giveaway</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setEngineView('business');
                  setMoreSuitesOpen(false);
                }}
                className={`hidden md:flex px-3 py-1.5 rounded-xl text-[12px] sm:text-[13px] font-bold items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  engineView === 'business'
                    ? 'bg-[#4648d4] text-white shadow-xs'
                    : 'text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330]'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 text-blue-500" />
                <span>Business &amp; Agile</span>
              </button>

              {/* More Suites Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMoreSuitesOpen(!moreSuitesOpen)}
                  className={`px-3 py-1.5 rounded-xl text-[12px] sm:text-[13px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    ['multi', 'tournament', 'battle', 'challenge', 'fairness', 'business'].includes(engineView) && engineView !== 'classroom' && engineView !== 'giveaway' && engineView !== 'solo'
                      ? 'bg-[#4648d4] text-white shadow-xs'
                      : 'text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>More Suites</span>
                  <ChevronDown className="w-3 h-3" />
                </button>

                {moreSuitesOpen && (
                  <div className="absolute left-0 top-full mt-1.5 w-56 bg-white dark:bg-[#181922] rounded-2xl border border-[#eeedf7] dark:border-[#292a39] shadow-2xl p-1.5 z-40 flex flex-col gap-1 animate-fadeIn">
                    <button
                      type="button"
                      onClick={() => {
                        setEngineView('business');
                        setMoreSuitesOpen(false);
                      }}
                      className={`md:hidden w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer ${
                        engineView === 'business'
                          ? 'bg-[#4648d4] text-white'
                          : 'hover:bg-[#f4f2fd] dark:hover:bg-[#222330] text-[#1a1b22] dark:text-[#f1effa]'
                      }`}
                    >
                      <Briefcase className="w-4 h-4 text-blue-500" />
                      <span>Business &amp; Agile</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setEngineView('multi');
                        setMoreSuitesOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer ${
                        engineView === 'multi'
                          ? 'bg-[#4648d4] text-white'
                          : 'hover:bg-[#f4f2fd] dark:hover:bg-[#222330] text-[#1a1b22] dark:text-[#f1effa]'
                      }`}
                    >
                      <Layers className="w-4 h-4 text-[#4648d4] dark:text-[#8587ff]" />
                      <span>Multi-Wheel Studio</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setEngineView('tournament');
                        setMoreSuitesOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer ${
                        engineView === 'tournament'
                          ? 'bg-[#4648d4] text-white'
                          : 'hover:bg-[#f4f2fd] dark:hover:bg-[#222330] text-[#1a1b22] dark:text-[#f1effa]'
                      }`}
                    >
                      <Trophy className="w-4 h-4 text-amber-500" />
                      <span>Elimination Tournament</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setEngineView('battle');
                        setMoreSuitesOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer ${
                        engineView === 'battle'
                          ? 'bg-[#4648d4] text-white'
                          : 'hover:bg-[#f4f2fd] dark:hover:bg-[#222330] text-[#1a1b22] dark:text-[#f1effa]'
                      }`}
                    >
                      <Swords className="w-4 h-4 text-rose-500" />
                      <span>Wheel Battle Duel</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setEngineView('challenge');
                        setMoreSuitesOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer ${
                        engineView === 'challenge'
                          ? 'bg-[#4648d4] text-white'
                          : 'hover:bg-[#f4f2fd] dark:hover:bg-[#222330] text-[#1a1b22] dark:text-[#f1effa]'
                      }`}
                    >
                      <Calendar className="w-4 h-4 text-sky-500" />
                      <span>Daily Spin Challenge</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setEngineView('fairness');
                        setMoreSuitesOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer ${
                        engineView === 'fairness'
                          ? 'bg-[#4648d4] text-white'
                          : 'hover:bg-[#f4f2fd] dark:hover:bg-[#222330] text-[#1a1b22] dark:text-[#f1effa]'
                      }`}
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <span>Fairness Verification</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Utility Actions */}
            <div className="flex items-center gap-1.5 ml-auto">
              <button
                type="button"
                onClick={() => setShareModalOpen(true)}
                className="px-2.5 py-1.5 rounded-xl border border-[#eeedf7] dark:border-[#292a39] text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330] text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                title="Share or Embed this wheel"
              >
                <Share2 className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
                <span className="hidden sm:inline">Share</span>
              </button>

              <button
                type="button"
                onClick={() => setImportExportOpen(true)}
                className="px-2.5 py-1.5 rounded-xl border border-[#eeedf7] dark:border-[#292a39] text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330] text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                title="Import/Export TXT, CSV, JSON"
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Import</span>
              </button>
            </div>
          </div>
        </div>

        {/* View Component Display */}
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 py-2 sm:py-3">
          {engineView === 'solo' && (
            <WheelWorkspace
              wheelTitle={wheelTitle}
              items={items}
              palette={palette}
              activePaletteKey={activePaletteKey}
              currentMode={currentMode}
              onSelectMode={handleSelectMode}
              spinDuration={spinDuration}
              soundSettings={soundSettings}
              spinLogs={spinLogs}
              isSpinning={isSpinning}
              preSelectedWinner={preSelectedWinner}
              winnerModalOpen={winnerModalOpen}
              winnerItem={winnerItem}
              lastSpinNumber={lastSpinNumber}
              onCloseWinnerModal={() => setWinnerModalOpen(false)}
              onSpinAgain={handleSpinAgain}
              onRemoveWinner={handleRemoveWinner}
              onUpdateItems={(newItems) => setItems(newItems)}
              onSelectPalette={handleSelectPalette}
              onChangeDuration={handleUpdateDuration}
              onChangeSoundSettings={handleUpdateSoundSettings}
              onTriggerSpin={handleTriggerSpin}
              onSpinStart={handleTriggerSpin}
              onSpinEnd={handleSpinEnd}
              onOpenBulkImport={() => setImportExportOpen(true)}
              onResetWheel={handleResetWheel}
            />
          )}

          {engineView === 'classroom' && (
            <ClassroomModeView
              soundEnabled={soundSettings.enabled}
              soundPack={soundSettings.pack}
              volume={soundSettings.volume}
            />
          )}

          {engineView === 'giveaway' && (
            <GiveawayModeView
              soundEnabled={soundSettings.enabled}
              soundPack={soundSettings.pack}
              volume={soundSettings.volume}
            />
          )}

          {engineView === 'business' && (
            <BusinessModeView
              soundEnabled={soundSettings.enabled}
              soundPack={soundSettings.pack}
              volume={soundSettings.volume}
            />
          )}

          {engineView === 'multi' && (
            <MultiWheelEngine
              soundEnabled={soundSettings.enabled}
              soundPack={soundSettings.pack}
              volume={soundSettings.volume}
            />
          )}

          {engineView === 'tournament' && (
            <TournamentEngine
              initialItems={items}
              soundEnabled={soundSettings.enabled}
              soundPack={soundSettings.pack}
              volume={soundSettings.volume}
            />
          )}

          {engineView === 'challenge' && (
            <ChallengeEngine
              soundEnabled={soundSettings.enabled}
              soundPack={soundSettings.pack}
              volume={soundSettings.volume}
            />
          )}

          {engineView === 'battle' && (
            <WheelBattleEngine
              soundEnabled={soundSettings.enabled}
              soundPack={soundSettings.pack}
              volume={soundSettings.volume}
            />
          )}

          {engineView === 'fairness' && <FairnessPanel />}
        </div>

        {/* 4. Task-First Discovery ("What are you trying to choose?") */}
        <PurposeCards />

        {/* 5. Quick Pick Section ("Popular Right Now") */}
        <PopularWheels />

        {/* 6. Play Section ("Play a Quick Wheel Game") */}
        <GameCards />

        {/* 6.5. 3D Dice Hub Promo ("Roll 3D Dice Online") */}
        <HomeDicePromo />

        {/* 7. Daily Challenge ("🔥 Daily Spin Challenge") */}
        <DailyChallenge soundEnabled={soundSettings.enabled} />

        {/* 8. Create Your Own Wheel CTA */}
        <CreateWheelCTA onCreateClick={() => setCreateWheelOpen(true)} />

        {/* 9. Template Library Preview ("Explore 100+ Wheel Games") */}
        <div id="wheel-catalogs">
          <CategoryGrid />
        </div>

        {/* 10. Use-Case Section ("Made for Real-World Decisions") */}
        <UseCaseCards />

        {/* 11. Fair Random Selection ("Fair Random Selection") */}
        <FairRandomness />

        {/* 12. How It Works */}
        <HowItWorks />

        {/* 13. Helpful Guides */}
        <GuideCards />

        {/* 14. FAQ Section */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer
        onQuickLink={(type) => {
          if (type === 'create') setCreateWheelOpen(true);
          else if (type === 'fairness') setEngineView('fairness');
          else if (type === 'multi') setEngineView('multi');
          else if (type === 'tournament') setEngineView('tournament');
          else if (type === 'challenge') setEngineView('challenge');
          else if (type === 'battle') setEngineView('battle');
          else {
            const match = WHEEL_PRESETS.find((p) => p.id === type);
            if (match) handleSelectPreset(match);
          }
        }}
      />

      {/* Winner Celebration Modal (For non-solo engine views if applicable) */}
      {winnerModalOpen && engineView !== 'solo' && (
        <WinnerModal
          isOpen={winnerModalOpen}
          winner={winnerItem}
          oddsPercent={preSelectedWinner?.oddsPercent || '12.5'}
          seed={preSelectedWinner?.seed || '0x94F2B01E'}
          spinNumber={lastSpinNumber}
          currentMode={currentMode}
          soundEnabled={soundSettings.enabled}
          soundPack={soundSettings.pack}
          volume={soundSettings.volume}
          ttsEnabled={soundSettings.ttsEnabled}
          onClose={() => setWinnerModalOpen(false)}
          onSpinAgain={handleSpinAgain}
          onRemoveWinner={handleRemoveWinner}
        />
      )}

      {/* Import / Export Modal */}
      {importExportOpen && (
        <ImportExport
          currentWheel={currentWheel}
          onImportItems={handleImportItems}
          onClose={() => setImportExportOpen(false)}
        />
      )}

      {/* Share / Embed Modal */}
      {shareModalOpen && (
        <SharePanel
          wheel={currentWheel}
          onClose={() => setShareModalOpen(false)}
        />
      )}

      {/* Create Custom Wheel Modal */}
      {createWheelOpen && (
        <CreateWheelModal
          isOpen={createWheelOpen}
          onClose={() => setCreateWheelOpen(false)}
          onCreateWheel={(wheel) => handleSelectPreset(wheel)}
        />
      )}

      {/* Quick Search Modal */}
      {searchOpen && (
        <SearchModal
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
          onSelectWheel={(wheel) => handleSelectPreset(wheel)}
        />
      )}
    </div>
  );
}
