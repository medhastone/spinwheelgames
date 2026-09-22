'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import WheelWorkspace from '@/components/WheelWorkspace';
import PresetGrid from '@/components/PresetGrid';
import CommunityWheels from '@/components/CommunityWheels';
import ClassroomSplit from '@/components/ClassroomSplit';
import WheelCatalogLibrary from '@/components/WheelCatalogLibrary';
import HomeEditorialContent from '@/components/HomeEditorialContent';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';

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
  Loader2
} from 'lucide-react';
import { WheelMode, SpinLogItem, SoundSettings } from '@/lib/types';
import { selectWeightedWinner } from '@/lib/random';
import {
  loadPreferences,
  savePreferences,
  loadSoundSettings,
  saveSoundSettings
} from '@/lib/storage';
import { parseSafeShareConfig, sanitizeString } from '@/lib/security';

// Skeleton fallback for zero-shift dynamic imports
function EngineSkeleton({ title }: { title: string }) {
  return (
    <div className="w-full min-h-[480px] bg-white dark:bg-[#181922] rounded-3xl border border-[#eeedf7] dark:border-[#222330] p-8 flex flex-col items-center justify-center gap-3 animate-pulse text-center">
      <Loader2 className="w-8 h-8 text-[#4648d4] dark:text-[#8587ff] animate-spin" />
      <span className="text-[14px] font-bold text-[#1a1b22] dark:text-[#f1effa]">
        {title}
      </span>
      <span className="text-[12px] text-[#767586] dark:text-[#908fa1]">
        Initializing Web Cryptography &amp; Canvas Engine...
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
  loading: () => <EngineSkeleton title="Loading Multi-Wheel Engine..." />,
  ssr: false
});

const TournamentEngine = dynamic(() => import('@/components/TournamentEngine'), {
  loading: () => <EngineSkeleton title="Loading Tournament Engine..." />,
  ssr: false
});

const ChallengeEngine = dynamic(() => import('@/components/ChallengeEngine'), {
  loading: () => <EngineSkeleton title="Loading Daily Challenge..." />,
  ssr: false
});

const WheelBattleEngine = dynamic(() => import('@/components/WheelBattleEngine'), {
  loading: () => <EngineSkeleton title="Loading Wheel Battle Engine..." />,
  ssr: false
});

const FairnessPanel = dynamic(() => import('@/components/FairnessPanel'), {
  loading: () => <EngineSkeleton title="Loading Cryptographic Audit Panel..." />,
  ssr: false
});

// Dynamically imported modals (loaded only when triggered)
const WinnerModal = dynamic(() => import('@/components/WinnerModal'), { ssr: false });
const ImportExport = dynamic(() => import('@/components/ImportExport'), { ssr: false });
const SharePanel = dynamic(() => import('@/components/SharePanel'), { ssr: false });
const CreateWheelModal = dynamic(() => import('@/components/CreateWheelModal'), { ssr: false });
const SearchModal = dynamic(() => import('@/components/SearchModal'), { ssr: false });

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
  const initialConfig = getInitialWheelConfig();

  // Current wheel configuration
  const [currentWheel, setCurrentWheel] = useState<WheelConfig>(initialConfig);
  const [wheelTitle, setWheelTitle] = useState(initialConfig.title);
  const [items, setItems] = useState<WheelItem[]>(initialConfig.items);
  const [activePaletteKey, setActivePaletteKey] = useState(initialConfig.themeKey || 'arcade');
  const [palette, setPalette] = useState<string[]>(
    initialConfig.palette || COLOR_PALETTES[initialConfig.themeKey || 'arcade']?.colors || COLOR_PALETTES.arcade.colors
  );
  const [spinDuration, setSpinDuration] = useState(() => loadPreferences().duration);
  const [currentMode, setCurrentMode] = useState<WheelMode>(() => loadPreferences().mode);
  const [engineView, setEngineView] = useState<EngineView>('solo');

  // Sound Settings State
  const [soundSettings, setSoundSettings] = useState<SoundSettings>(() => loadSoundSettings());

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
    saveSoundSettings(newSettings);
  };

  const handleUpdateDuration = (dur: number) => {
    setSpinDuration(dur);
    savePreferences({ duration: dur });
  };

  const handleSelectMode = (mode: WheelMode) => {
    setCurrentMode(mode);
    savePreferences({ mode });
  };

  // Trigger Spin with Cryptographic Pre-selection
  const handleTriggerSpin = useCallback(() => {
    if (isSpinning || items.length < 2) return;

    // Determine winner BEFORE animation using crypto.getRandomValues()
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
    } else if (navId === 'wheel-games') {
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
      <main className="w-full pt-16 flex-1 flex flex-col">
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

        {/* Engine Modes Switcher Bar */}
        <div id="interactive-workspace" className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-2">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-[#181922] p-2 rounded-2xl border border-[#eeedf7] dark:border-[#222330] shadow-xs">
            {/* View Switcher Pills */}
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setEngineView('solo')}
                className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  engineView === 'solo'
                    ? 'bg-[#4648d4] text-white shadow-xs'
                    : 'text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330]'
                }`}
              >
                <Disc className="w-4 h-4" />
                <span>Classic Spinner</span>
              </button>

              <button
                type="button"
                onClick={() => setEngineView('classroom')}
                className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  engineView === 'classroom'
                    ? 'bg-[#4648d4] text-white shadow-xs'
                    : 'text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330]'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-emerald-500" />
                <span>Classroom Suite</span>
              </button>

              <button
                type="button"
                onClick={() => setEngineView('giveaway')}
                className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  engineView === 'giveaway'
                    ? 'bg-[#4648d4] text-white shadow-xs'
                    : 'text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330]'
                }`}
              >
                <Gift className="w-4 h-4 text-amber-500" />
                <span>Giveaway Suite</span>
              </button>

              <button
                type="button"
                onClick={() => setEngineView('business')}
                className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  engineView === 'business'
                    ? 'bg-[#4648d4] text-white shadow-xs'
                    : 'text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330]'
                }`}
              >
                <Briefcase className="w-4 h-4 text-blue-500" />
                <span>Business &amp; Agile</span>
              </button>

              <button
                type="button"
                onClick={() => setEngineView('multi')}
                className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  engineView === 'multi'
                    ? 'bg-[#4648d4] text-white shadow-xs'
                    : 'text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330]'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Multi-Wheel</span>
              </button>

              <button
                type="button"
                onClick={() => setEngineView('tournament')}
                className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  engineView === 'tournament'
                    ? 'bg-[#4648d4] text-white shadow-xs'
                    : 'text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330]'
                }`}
              >
                <Trophy className="w-4 h-4" />
                <span>Tournament</span>
              </button>

              <button
                type="button"
                onClick={() => setEngineView('battle')}
                className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  engineView === 'battle'
                    ? 'bg-[#4648d4] text-white shadow-xs'
                    : 'text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330]'
                }`}
              >
                <Swords className="w-4 h-4" />
                <span>Wheel Battle</span>
              </button>

              <button
                type="button"
                onClick={() => setEngineView('challenge')}
                className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  engineView === 'challenge'
                    ? 'bg-[#4648d4] text-white shadow-xs'
                    : 'text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330]'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Daily Challenge</span>
              </button>

              <button
                type="button"
                onClick={() => setEngineView('fairness')}
                className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  engineView === 'fairness'
                    ? 'bg-[#4648d4] text-white shadow-xs'
                    : 'text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330]'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Audit &amp; Fairness</span>
              </button>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => setShareModalOpen(true)}
                className="px-3 py-1.5 rounded-xl border border-[#eeedf7] dark:border-[#292a39] text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330] text-[12px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                title="Share or Embed this wheel"
              >
                <Share2 className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
                <span className="hidden sm:inline">Share / Embed</span>
              </button>

              <button
                type="button"
                onClick={() => setImportExportOpen(true)}
                className="px-3 py-1.5 rounded-xl border border-[#eeedf7] dark:border-[#292a39] text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330] text-[12px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                title="Import/Export TXT, CSV, JSON"
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Import/Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* View Component Display */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4">
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
              onUpdateItems={(newItems) => setItems(newItems)}
              onSelectPalette={handleSelectPalette}
              onChangeDuration={handleUpdateDuration}
              onChangeSoundSettings={handleUpdateSoundSettings}
              onTriggerSpin={handleTriggerSpin}
              onSpinStart={() => setIsSpinning(true)}
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

        {/* Preset Discovery Catalogs */}
        <PresetGrid onSelectPreset={handleSelectPreset} />

        {/* Complete 106+ Wheel Experience Library & Taxonomy */}
        <WheelCatalogLibrary onSelectWheel={handleSelectPreset} />

        {/* In-Depth Educational & Cryptographic Fairness Editorial Content */}
        <HomeEditorialContent />

        {/* Curated Popular Community Wheels Section */}
        <CommunityWheels onLoadCommunityWheel={handleSelectPreset} />

        {/* Classroom & Team Split Feature */}
        <ClassroomSplit
          onSpinDailyChallenge={handleSelectPreset}
          onOpenBulkPaste={() => setImportExportOpen(true)}
        />

        {/* Cryptographic Fairness Section */}
        {engineView !== 'fairness' && (
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
            <FairnessPanel />
          </div>
        )}

        {/* FAQ Section */}
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

      {/* Winner Celebration Modal */}
      {winnerModalOpen && (
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
