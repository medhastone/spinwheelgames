'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import WheelCanvas from './WheelCanvas';
import EntryEditor from './EntryEditor';
import WeightedEditor from './WeightedEditor';
import SpinButton from './SpinButton';
import SoundControls from './SoundControls';
import BestOfThreeModal from './BestOfThreeModal';
import WinnerModal from './WinnerModal';
import { WheelItem, WheelMode, SpinLogItem, SoundSettings } from '@/lib/types';
import { playCountdownBeep, unlockAudioContext } from '@/lib/sound';
import { toggleWheelFavorite, useSavedWheels } from '@/lib/storage';
import { COLOR_PALETTES } from '@/lib/presets';
import {
  UserX,
  List,
  Scale,
  Volume2,
  VolumeX,
  Heart,
  Shuffle,
  ArrowDownAZ,
  RotateCcw,
  Undo2,
  Redo2,
  Maximize2,
  Minimize2,
  Sparkles,
  HelpCircle,
  Swords,
  Timer,
  Palette,
  ShieldCheck,
  Upload,
  History,
  Sliders
} from 'lucide-react';

interface WheelWorkspaceProps {
  wheelTitle: string;
  items: WheelItem[];
  palette: string[];
  activePaletteKey: string;
  currentMode: WheelMode;
  onSelectMode: (mode: WheelMode) => void;
  spinDuration: number;
  soundSettings: SoundSettings;
  spinLogs: SpinLogItem[];
  isSpinning: boolean;
  preSelectedWinner: {
    winner: WheelItem;
    winnerIndex: number;
    seed: string;
    oddsPercent: string;
  } | null;
  winnerModalOpen?: boolean;
  winnerItem?: WheelItem | null;
  lastSpinNumber?: number;
  onCloseWinnerModal?: () => void;
  onSpinAgain?: () => void;
  onRemoveWinner?: (item: WheelItem) => void;
  onUpdateItems: (newItems: WheelItem[]) => void;
  onSelectPalette: (paletteKey: string) => void;
  onChangeDuration: (dur: number) => void;
  onChangeSoundSettings: (settings: SoundSettings) => void;
  onTriggerSpin: () => void;
  onSpinStart: () => void;
  onSpinEnd: (winner: WheelItem) => void;
  onOpenBulkImport: () => void;
  onResetWheel: () => void;
  breadcrumbCategory?: string;
  subtitle?: string;
}

export default function WheelWorkspace({
  wheelTitle,
  items,
  palette,
  activePaletteKey,
  currentMode,
  onSelectMode,
  spinDuration,
  soundSettings,
  spinLogs,
  isSpinning,
  preSelectedWinner,
  winnerModalOpen = false,
  winnerItem = null,
  lastSpinNumber = 1,
  onCloseWinnerModal,
  onSpinAgain,
  onRemoveWinner,
  onUpdateItems,
  onSelectPalette,
  onChangeDuration,
  onChangeSoundSettings,
  onTriggerSpin,
  onSpinStart,
  onSpinEnd,
  onOpenBulkImport,
  onResetWheel,
  breadcrumbCategory = 'Decision',
  subtitle
}: WheelWorkspaceProps) {
  // Sidebar tab: 'entries' | 'results' | 'tools'
  const [activeTab, setActiveTab] = useState<'entries' | 'results' | 'tools'>('entries');
  // Sub-view: 'list' | 'weighted' | 'style' | 'sound' | 'timing'
  const [subView, setSubView] = useState<'list' | 'weighted' | 'style' | 'sound' | 'timing'>('list');

  const [countdownEnabled, setCountdownEnabled] = useState(false);
  const [countdownVal, setCountdownVal] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [bestOfThreeOpen, setBestOfThreeOpen] = useState(false);
  const [savedSuccessToast, setSavedSuccessToast] = useState(false);
  const [liveAnnouncement, setLiveAnnouncement] = useState("");

  useEffect(() => {
    if (isSpinning) {
      setLiveAnnouncement("Wheel is spinning with " + items.length + " options...");
    }
  }, [isSpinning, items.length]);

  useEffect(() => {
    if (winnerModalOpen && winnerItem) {
      setLiveAnnouncement("Spin complete. Winner selected: " + winnerItem.text);
    }
  }, [winnerModalOpen, winnerItem]);


  // Undo / Redo History Stacks
  const [historyPast, setHistoryPast] = useState<WheelItem[][]>([]);
  const [historyFuture, setHistoryFuture] = useState<WheelItem[][]>([]);

  const workspaceRef = useRef<HTMLDivElement>(null);

  // Push to undo stack
  const updateItemsWithHistory = useCallback(
    (newItems: WheelItem[]) => {
      setHistoryPast((prev) => [...prev, items]);
      setHistoryFuture([]);
      onUpdateItems(newItems);
    },
    [items, onUpdateItems]
  );

  const handleUndo = useCallback(() => {
    if (historyPast.length === 0) return;
    const previous = historyPast[historyPast.length - 1];
    setHistoryPast((prev) => prev.slice(0, prev.length - 1));
    setHistoryFuture((prev) => [items, ...prev]);
    onUpdateItems(previous);
  }, [historyPast, items, onUpdateItems]);

  const handleRedo = useCallback(() => {
    if (historyFuture.length === 0) return;
    const next = historyFuture[0];
    setHistoryFuture((prev) => prev.slice(1));
    setHistoryPast((prev) => [...prev, items]);
    onUpdateItems(next);
  }, [historyFuture, items, onUpdateItems]);

  // Initiate Spin Handler (handles countdown if enabled)
  const handleInitiateSpin = useCallback(() => {
    if (isSpinning || items.length < 2) return;

    // Prime Web Audio and Speech Synthesis on user gesture
    unlockAudioContext();

    if (currentMode === 'best-of-3') {
      setBestOfThreeOpen(true);
      return;
    }

    if (countdownEnabled) {
      setCountdownVal(3);
      playCountdownBeep(false, soundSettings.enabled, soundSettings.volume);

      const t1 = setTimeout(() => {
        setCountdownVal(2);
        playCountdownBeep(false, soundSettings.enabled, soundSettings.volume);
      }, 700);

      const t2 = setTimeout(() => {
        setCountdownVal(1);
        playCountdownBeep(false, soundSettings.enabled, soundSettings.volume);
      }, 1400);

      const t3 = setTimeout(() => {
        setCountdownVal(null);
        playCountdownBeep(true, soundSettings.enabled, soundSettings.volume);
        onTriggerSpin();
      }, 2100);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    } else {
      onTriggerSpin();
    }
  }, [isSpinning, items.length, currentMode, countdownEnabled, soundSettings, onTriggerSpin]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Space to spin if not typing in an input
      if (
        e.code === 'Space' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA' &&
        !winnerModalOpen &&
        !bestOfThreeOpen
      ) {
        e.preventDefault();
        handleInitiateSpin();
      }

      // Undo: Ctrl+Z or Cmd+Z
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        if (
          document.activeElement?.tagName !== 'INPUT' &&
          document.activeElement?.tagName !== 'TEXTAREA'
        ) {
          e.preventDefault();
          handleUndo();
        }
      }

      // Redo: Ctrl+Y or Cmd+Shift+Z
      if (
        ((e.ctrlKey || e.metaKey) && e.key === 'y') ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'z')
      ) {
        if (
          document.activeElement?.tagName !== 'INPUT' &&
          document.activeElement?.tagName !== 'TEXTAREA'
        ) {
          e.preventDefault();
          handleRedo();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [winnerModalOpen, bestOfThreeOpen, handleInitiateSpin, handleUndo, handleRedo]);

  // Fullscreen toggle
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      workspaceRef.current?.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Shuffle items
  const handleShuffle = () => {
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    updateItemsWithHistory(shuffled);
  };

  // Sort items alphabetically or by weight
  const handleSort = (dir: 'asc' | 'desc' | 'weight') => {
    const sorted = [...items];
    if (dir === 'asc') {
      sorted.sort((a, b) => a.text.localeCompare(b.text));
    } else if (dir === 'desc') {
      sorted.sort((a, b) => b.text.localeCompare(a.text));
    } else if (dir === 'weight') {
      sorted.sort((a, b) => (b.weight || 1) - (a.weight || 1));
    }
    updateItemsWithHistory(sorted);
  };

  // Deduplicate items
  const handleDeduplicate = () => {
    const seen = new Set<string>();
    const deduplicated = items.filter((item) => {
      const key = item.text.trim().toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    updateItemsWithHistory(deduplicated);
  };

  // Randomize slice colors
  const handleRandomizeColors = () => {
    const updated = items.map((item) => {
      const randomColor = palette[Math.floor(Math.random() * palette.length)];
      return { ...item, color: randomColor };
    });
    updateItemsWithHistory(updated);
  };

  // Update Item text or color
  const handleUpdateItem = (id: string, text: string, color?: string) => {
    const updated = items.map((item) => {
      if (item.id === id) {
        return { ...item, text, ...(color ? { color } : {}) };
      }
      return item;
    });
    updateItemsWithHistory(updated);
  };

  // Update Item weight
  const handleUpdateWeight = (id: string, weight: number) => {
    const updated = items.map((item) => {
      if (item.id === id) {
        return { ...item, weight: Math.max(0.1, weight) };
      }
      return item;
    });
    updateItemsWithHistory(updated);
  };

  // Reset all weights to 1:1
  const handleResetWeights = () => {
    const updated = items.map((item) => ({ ...item, weight: 1 }));
    updateItemsWithHistory(updated);
  };

  // Add Single Item
  const handleAddItem = (text: string) => {
    const newItem: WheelItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      text,
      weight: 1
    };
    updateItemsWithHistory([...items, newItem]);
  };

  // Delete Item
  const handleDeleteItem = (id: string) => {
    updateItemsWithHistory(items.filter((item) => item.id !== id));
  };

  // Clear all items cleanly
  const handleClearAll = () => {
    updateItemsWithHistory([]);
  };

  // Saved / Favorite state
  const savedWheels = useSavedWheels();
  const isFavorite = savedWheels.some(
    (w) => w.title.trim().toLowerCase() === wheelTitle.trim().toLowerCase()
  );

  const handleToggleFavorite = () => {
    toggleWheelFavorite({
      title: wheelTitle,
      category: currentMode === 'standard' ? 'Custom' : currentMode,
      description: `${items.length} options spin wheel`,
      items,
      paletteKey: activePaletteKey,
      palette
    });
    setSavedSuccessToast(true);
    setTimeout(() => setSavedSuccessToast(false), 2000);
  };

  const defaultSubtitle =
    subtitle ||
    `A free ${wheelTitle} for fair random name picking, classroom selection, raffles, giveaways, teams, and no-repeat winner draws.`;

  return (
    <>
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {liveAnnouncement}
      </div>
    <div
      ref={workspaceRef}
      aria-label={`Interactive Wheel: ${wheelTitle}`}
      className={`w-full max-w-[1440px] mx-auto flex flex-col gap-4 transition-all ${
        isFullscreen
          ? 'fixed inset-0 z-50 bg-[#fbf8ff] dark:bg-[#0d0e15] p-4 sm:p-6 overflow-y-auto flex items-center justify-center'
          : ''
      }`}
    >
      {/* ========================================================================= */}
      {/* TWO-COLUMN WORKSPACE: Dominant Left Stage + Sleek Right Sidebar           */}
      {/* Fully compatible with both Light and Dark themes                          */}
      {/* ========================================================================= */}
      <div className="w-full flex flex-col lg:flex-row items-stretch justify-center gap-4 sm:gap-5 lg:gap-6">
        
        {/* ------------------------------------------------------------------------- */}
        {/* LEFT COLUMN: Large Centered Wheel Stage (~800–960px on Desktop)          */}
        {/* ------------------------------------------------------------------------- */}
        <div className="flex-1 w-full lg:min-w-0 bg-white dark:bg-[#0f1017] rounded-3xl border border-[#eeedf7] dark:border-[#20212f] p-3.5 sm:p-6 lg:p-7 flex flex-col justify-between items-center shadow-lg dark:shadow-xl relative min-h-[auto] sm:min-h-[640px] lg:min-h-[720px] xl:min-h-[760px] transition-colors overflow-hidden">
          
          {/* Top Stage Bar: Pointer label indicator + Top-Right Action buttons */}
          <div className="w-full flex items-center justify-between z-10">
            {/* Pointer / Preset label badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4f2fd] dark:bg-[#1b1c28] border border-[#eeedf7] dark:border-[#2e3042] text-xs font-bold text-[#464554] dark:text-[#c7c4d7]">
              <span>{wheelTitle}</span>
              <span className="text-[10px] text-[#4648d4] dark:text-[#8587ff]">({items.length})</span>
            </div>

            {/* Stage Quick Icons (Undo, Redo, Fullscreen) */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleUndo}
                disabled={historyPast.length === 0}
                className="p-2 rounded-xl bg-[#f4f2fd] dark:bg-[#1b1c28] text-[#464554] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white border border-[#eeedf7] dark:border-[#2e3042] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                title="Undo (Ctrl+Z)"
                aria-label="Undo"
              >
                <Undo2 className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleRedo}
                disabled={historyFuture.length === 0}
                className="p-2 rounded-xl bg-[#f4f2fd] dark:bg-[#1b1c28] text-[#464554] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white border border-[#eeedf7] dark:border-[#2e3042] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                title="Redo (Ctrl+Y)"
                aria-label="Redo"
              >
                <Redo2 className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleToggleFullscreen}
                className="p-2 rounded-xl bg-[#f4f2fd] dark:bg-[#1b1c28] text-[#464554] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white border border-[#eeedf7] dark:border-[#2e3042] transition-colors cursor-pointer"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Wheel'}
                aria-label="Toggle fullscreen"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Large Wheel Canvas Container (Centered Horizontally and Vertically) */}
          <div className="w-full flex-1 flex items-center justify-center py-4 sm:py-6">
            <WheelCanvas
              items={items}
              palette={palette}
              isSpinning={isSpinning}
              preSelectedWinner={preSelectedWinner}
              onCenterClick={handleInitiateSpin}
              onSpinStart={onSpinStart}
              onSpinEnd={onSpinEnd}
              duration={spinDuration}
              soundEnabled={soundSettings.enabled}
              soundPack={soundSettings.pack}
              volume={soundSettings.volume}
              mysteryMode={currentMode === 'mystery'}
              isFullscreen={isFullscreen}
            />
          </div>

          {/* Bottom Stage Toolbar */}
          <div className="w-full pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#eeedf7] dark:border-[#1e1f2d]">
            {/* Action Bar (Top on mobile, sides on desktop) */}
            <div className="flex items-center justify-between w-full sm:w-auto gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() =>
                    onChangeSoundSettings({ ...soundSettings, enabled: !soundSettings.enabled })
                  }
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    soundSettings.enabled
                      ? 'bg-[#f4f2fd] dark:bg-[#1b1c28] text-[#4648d4] dark:text-white border-[#eeedf7] dark:border-[#2e3042] hover:text-[#4648d4] dark:hover:text-[#8587ff]'
                      : 'bg-[#f4f2fd] dark:bg-[#14151e] text-[#908fa1] dark:text-[#6b6a7a] border-[#eeedf7] dark:border-[#2e3042]'
                  }`}
                  title={soundSettings.enabled ? 'Sound On' : 'Sound Muted'}
                  aria-label="Toggle sound"
                >
                  {soundSettings.enabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                <button
                  type="button"
                  onClick={onResetWheel}
                  className="p-2.5 rounded-xl bg-[#f4f2fd] dark:bg-[#1b1c28] text-[#464554] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white border border-[#eeedf7] dark:border-[#2e3042] transition-colors cursor-pointer"
                  title="Reset to default items"
                  aria-label="Reset wheel"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleShuffle}
                  className="p-2.5 rounded-xl bg-[#f4f2fd] dark:bg-[#1b1c28] text-[#464554] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white border border-[#eeedf7] dark:border-[#2e3042] transition-colors cursor-pointer"
                  title="Shuffle slices"
                  aria-label="Shuffle slices"
                >
                  <Shuffle className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Web Crypto Badge */}
              <span className="sm:hidden inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#f4f2fd] dark:bg-[#14151e] border border-[#eeedf7] dark:border-[#2e3042] text-[10px] font-bold text-[#006c49] dark:text-emerald-400 font-mono">
                <ShieldCheck className="w-3 h-3" />
                <span>Web Crypto</span>
              </span>
            </div>

            {/* Center: Large Spin Button */}
            <div className="w-full sm:flex-1 sm:max-w-sm flex items-center justify-center">
              <SpinButton
                onSpin={handleInitiateSpin}
                isSpinning={isSpinning}
                disabled={items.length < 2}
                countdownNumber={countdownVal}
              />
            </div>

            {/* Right: Desktop Web Crypto Badge */}
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#f4f2fd] dark:bg-[#14151e] border border-[#eeedf7] dark:border-[#2e3042] text-[11px] font-bold text-[#006c49] dark:text-emerald-400 font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Web Crypto CSPRNG</span>
              </span>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------------- */}
        {/* RIGHT COLUMN: Sleek Configuration Card (~330–360px on Desktop)            */}
        {/* ------------------------------------------------------------------------- */}
        <div className="w-full lg:w-[340px] xl:w-[360px] shrink-0 flex flex-col gap-3">
          
          <div className="bg-white dark:bg-[#0f1017] text-[#1a1b22] dark:text-white rounded-3xl border border-[#eeedf7] dark:border-[#20212f] p-4 sm:p-5 shadow-lg dark:shadow-xl flex flex-col gap-3.5 transition-colors">
            
            {/* Breadcrumb Navigation */}
            <div className="text-[11px] text-[#767586] dark:text-[#908fa1] flex items-center gap-1.5 font-medium truncate">
              <Link href="/" className="hover:text-[#1a1b22] dark:hover:text-white transition-colors">
                Home
              </Link>
              <span>›</span>
              <span className="text-[#464554] dark:text-[#c7c4d7]">{breadcrumbCategory}</span>
              <span>›</span>
              <span className="text-[#4648d4] dark:text-[#8587ff] font-semibold truncate">{wheelTitle}</span>
            </div>

            {/* Title & Short Description */}
            <div className="space-y-1 border-b border-[#eeedf7] dark:border-[#1e1f2d] pb-3">
              <div className="flex items-center justify-between gap-2">
                <h1 className="font-headline font-black text-xl sm:text-2xl text-[#1a1b22] dark:text-white tracking-tight">
                  {wheelTitle}
                </h1>
                <button
                  type="button"
                  onClick={handleToggleFavorite}
                  className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                    isFavorite
                      ? 'bg-rose-500/10 dark:bg-rose-500/20 border-rose-500/40 text-rose-500 dark:text-rose-400'
                      : 'bg-[#f4f2fd] dark:bg-[#1b1c28] border-[#eeedf7] dark:border-[#2e3042] text-[#767586] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white'
                  }`}
                  title={isFavorite ? 'Saved to favorites' : 'Save to favorites'}
                  aria-label="Toggle favorite"
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
                </button>
              </div>
              <p className="text-xs text-[#464554] dark:text-[#908fa1] leading-relaxed line-clamp-2">
                {defaultSubtitle}
              </p>
            </div>

            {/* Top Segment Tabs: [Entries] | [Results (X)] | [Tools] */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-[#f4f2fd] dark:bg-[#14151e] rounded-xl border border-[#eeedf7] dark:border-[#20212f]">
              <button
                type="button"
                onClick={() => setActiveTab('entries')}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  activeTab === 'entries'
                    ? 'bg-[#4648d4] text-white shadow-xs'
                    : 'text-[#767586] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Entries</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('results')}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  activeTab === 'results'
                    ? 'bg-[#4648d4] text-white shadow-xs'
                    : 'text-[#767586] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>Results ({spinLogs.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('tools')}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  activeTab === 'tools'
                    ? 'bg-[#4648d4] text-white shadow-xs'
                    : 'text-[#767586] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Tools</span>
              </button>
            </div>

            {/* Secondary Toolbar: [List] [Weighted] [Style] [Sound] [Timing] */}
            <div className="flex items-center justify-between gap-1 p-1 bg-[#f4f2fd] dark:bg-[#14151e] rounded-xl border border-[#eeedf7] dark:border-[#20212f]">
              <button
                type="button"
                onClick={() => {
                  setSubView('list');
                  onSelectMode('standard');
                }}
                className={`flex-1 py-1 px-1 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  subView === 'list' && currentMode === 'standard'
                    ? 'bg-white dark:bg-[#282a3a] text-[#1a1b22] dark:text-white shadow-xs'
                    : 'text-[#767586] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white'
                }`}
                title="List view"
              >
                <List className="w-3 h-3" />
                <span>List</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSubView('weighted');
                  onSelectMode('weighted');
                }}
                className={`flex-1 py-1 px-1 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  currentMode === 'weighted' || subView === 'weighted'
                    ? 'bg-amber-500 dark:bg-amber-600 text-white shadow-xs'
                    : 'text-[#767586] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white'
                }`}
                title="Weighted mode"
              >
                <Scale className="w-3 h-3" />
                <span>Weight</span>
              </button>

              <button
                type="button"
                onClick={() => setSubView(subView === 'style' ? 'list' : 'style')}
                className={`flex-1 py-1 px-1 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  subView === 'style'
                    ? 'bg-white dark:bg-[#282a3a] text-[#1a1b22] dark:text-white shadow-xs'
                    : 'text-[#767586] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white'
                }`}
                title="Style & Color Palettes"
              >
                <Palette className="w-3 h-3" />
                <span>Style</span>
              </button>

              <button
                type="button"
                onClick={() => setSubView(subView === 'sound' ? 'list' : 'sound')}
                className={`flex-1 py-1 px-1 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  subView === 'sound'
                    ? 'bg-white dark:bg-[#282a3a] text-[#1a1b22] dark:text-white shadow-xs'
                    : 'text-[#767586] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white'
                }`}
                title="Audio settings"
              >
                <Volume2 className="w-3 h-3" />
                <span>Sound</span>
              </button>

              <button
                type="button"
                onClick={() => setSubView(subView === 'timing' ? 'list' : 'timing')}
                className={`flex-1 py-1 px-1 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  subView === 'timing'
                    ? 'bg-white dark:bg-[#282a3a] text-[#1a1b22] dark:text-white shadow-xs'
                    : 'text-[#767586] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white'
                }`}
                title="Spin duration & countdown"
              >
                <Timer className="w-3 h-3" />
                <span>Timing</span>
              </button>
            </div>

            {/* TAB CONTENT: ENTRIES */}
            {activeTab === 'entries' && (
              <div className="w-full flex flex-col gap-3">
                {/* Sub-view: Style / Palettes Drawer */}
                {subView === 'style' && (
                  <div className="p-3 bg-[#f4f2fd] dark:bg-[#14151e] rounded-2xl border border-[#eeedf7] dark:border-[#20212f] space-y-2 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1a1b22] dark:text-[#c7c4d7]">Wheel Color Palette</span>
                      <button
                        type="button"
                        onClick={handleRandomizeColors}
                        className="text-[11px] font-bold text-[#4648d4] dark:text-[#8587ff] hover:underline cursor-pointer"
                      >
                        Randomize
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
                      {Object.entries(COLOR_PALETTES).map(([key, pal]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => onSelectPalette(key)}
                          className={`p-2 rounded-xl border flex flex-col gap-1 transition-all text-left cursor-pointer ${
                            activePaletteKey === key
                              ? 'bg-white dark:bg-[#1f202f] border-[#4648d4]'
                              : 'bg-white/80 dark:bg-[#181924] border-[#eeedf7] dark:border-[#292a39] hover:bg-white dark:hover:bg-[#222435]'
                          }`}
                        >
                          <span className="text-[11px] font-bold capitalize text-[#1a1b22] dark:text-white truncate">
                            {pal.name}
                          </span>
                          <div className="flex gap-0.5">
                            {pal.colors.slice(0, 5).map((c, i) => (
                              <div
                                key={i}
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: c }}
                              />
                            ))}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sub-view: Sound Settings Drawer */}
                {subView === 'sound' && (
                  <div className="p-3 bg-[#f4f2fd] dark:bg-[#14151e] rounded-2xl border border-[#eeedf7] dark:border-[#20212f] animate-fadeIn">
                    <SoundControls
                      settings={soundSettings}
                      onChangeSettings={onChangeSoundSettings}
                    />
                  </div>
                )}

                {/* Sub-view: Timing Settings Drawer */}
                {subView === 'timing' && (
                  <div className="p-3 bg-[#f4f2fd] dark:bg-[#14151e] rounded-2xl border border-[#eeedf7] dark:border-[#20212f] space-y-3 animate-fadeIn">
                    <div className="space-y-1.5">
                      <span className="text-xs font-bold text-[#1a1b22] dark:text-[#c7c4d7] block">Spin Duration</span>
                      <div className="grid grid-cols-4 gap-1">
                        {[3, 6, 9, 12].map((dur) => (
                          <button
                            key={dur}
                            type="button"
                            onClick={() => onChangeDuration(dur)}
                            className={`py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              spinDuration === dur
                                ? 'bg-[#4648d4] text-white'
                                : 'bg-white dark:bg-[#1c1d2a] text-[#767586] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white border border-[#eeedf7] dark:border-transparent'
                            }`}
                          >
                            {dur}s
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-[#eeedf7] dark:border-[#20212f]">
                      <span className="text-xs font-semibold text-[#1a1b22] dark:text-[#c7c4d7]">3-Sec Countdown</span>
                      <button
                        type="button"
                        onClick={() => setCountdownEnabled(!countdownEnabled)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          countdownEnabled
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white dark:bg-[#1c1d2a] text-[#767586] dark:text-[#908fa1] border border-[#eeedf7] dark:border-transparent'
                        }`}
                      >
                        {countdownEnabled ? 'On' : 'Off'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Main Slices Editor (Standard or Weighted) */}
                {currentMode === 'weighted' || subView === 'weighted' ? (
                  <WeightedEditor
                    items={items}
                    palette={palette}
                    onUpdateWeight={handleUpdateWeight}
                    onResetWeights={handleResetWeights}
                  />
                ) : (
                  <EntryEditor
                    items={items}
                    palette={palette}
                    onAddItem={handleAddItem}
                    onUpdateItem={handleUpdateItem}
                    onDeleteItem={handleDeleteItem}
                    onClearAll={handleClearAll}
                    onDeduplicate={handleDeduplicate}
                    onRandomizeColors={handleRandomizeColors}
                    onOpenBulkImport={onOpenBulkImport}
                  />
                )}
              </div>
            )}

            {/* TAB CONTENT: RESULTS (AUDIT LOG) */}
            {activeTab === 'results' && (
              <div className="w-full flex flex-col gap-2 max-h-[380px] overflow-y-auto pr-1">
                {spinLogs.length === 0 ? (
                  <div className="text-center py-8 text-xs text-[#767586] dark:text-[#908fa1] space-y-2">
                    <History className="w-8 h-8 mx-auto text-[#a09eaf] dark:text-[#464554]" />
                    <p>No spins recorded yet this session.</p>
                    <p className="text-[11px]">Click Spin to generate cryptographically fair results!</p>
                  </div>
                ) : (
                  spinLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-3 rounded-xl bg-[#f4f2fd] dark:bg-[#14151e] border border-[#eeedf7] dark:border-[#20212f] text-xs flex flex-col gap-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-[#1a1b22] dark:text-white text-sm">
                          #{log.spinNumber} {log.itemText}
                        </span>
                        <span className="text-[10px] font-mono text-[#767586] dark:text-[#908fa1]">{log.time}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-[#767586] dark:text-[#908fa1]">
                        <span>Odds: {log.oddsPercent}%</span>
                        <span className="font-mono text-[10px] text-[#4648d4] dark:text-[#8587ff]">Seed: {log.seed}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB CONTENT: TOOLS */}
            {activeTab === 'tools' && (
              <div className="w-full flex flex-col gap-2.5">
                {/* Mode Toggles */}
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-[#1a1b22] dark:text-[#c7c4d7]">Game Modes</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => onSelectMode('standard')}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        currentMode === 'standard'
                          ? 'bg-[#4648d4] text-white border-[#4648d4]'
                          : 'bg-[#f4f2fd] dark:bg-[#14151e] text-[#464554] dark:text-[#908fa1] border-[#eeedf7] dark:border-[#20212f] hover:text-[#1a1b22] dark:hover:text-white'
                      }`}
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Standard</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectMode('elimination')}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        currentMode === 'elimination'
                          ? 'bg-red-600 text-white border-red-600'
                          : 'bg-[#f4f2fd] dark:bg-[#14151e] text-[#464554] dark:text-[#908fa1] border-[#eeedf7] dark:border-[#20212f] hover:text-[#1a1b22] dark:hover:text-white'
                      }`}
                    >
                      <UserX className="w-4 h-4" />
                      <span>Elimination</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onSelectMode('best-of-3');
                        setBestOfThreeOpen(true);
                      }}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        currentMode === 'best-of-3'
                          ? 'bg-[#4648d4] text-white border-[#4648d4]'
                          : 'bg-[#f4f2fd] dark:bg-[#14151e] text-[#464554] dark:text-[#908fa1] border-[#eeedf7] dark:border-[#20212f] hover:text-[#1a1b22] dark:hover:text-white'
                      }`}
                    >
                      <Swords className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                      <span>Best-of-3 Duel</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectMode('mystery')}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        currentMode === 'mystery'
                          ? 'bg-[#4648d4] text-white border-[#4648d4]'
                          : 'bg-[#f4f2fd] dark:bg-[#14151e] text-[#464554] dark:text-[#908fa1] border-[#eeedf7] dark:border-[#20212f] hover:text-[#1a1b22] dark:hover:text-white'
                      }`}
                    >
                      <HelpCircle className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                      <span>Mystery Mode</span>
                    </button>
                  </div>
                </div>

                {/* Import / Export & Actions */}
                <div className="pt-2 border-t border-[#eeedf7] dark:border-[#1e1f2d] flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={onOpenBulkImport}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#f4f2fd] dark:bg-[#14151e] hover:bg-[#eae8f7] dark:hover:bg-[#1d1e2c] border border-[#eeedf7] dark:border-[#20212f] text-xs font-bold text-[#1a1b22] dark:text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Upload className="w-4 h-4 text-[#4648d4] dark:text-[#8587ff]" />
                    <span>Bulk Paste / CSV Import</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSort.bind(null, 'asc')}
                    className="w-full py-2 px-3 rounded-xl bg-[#f4f2fd] dark:bg-[#14151e] hover:bg-[#eae8f7] dark:hover:bg-[#1d1e2c] border border-[#eeedf7] dark:border-[#20212f] text-xs font-semibold text-[#464554] dark:text-[#c7c4d7] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <ArrowDownAZ className="w-4 h-4" />
                    <span>Sort Alphabetically (A-Z)</span>
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Card Action Footer */}
            <div className="pt-2 border-t border-[#eeedf7] dark:border-[#1e1f2d]">
              <button
                type="button"
                onClick={onOpenBulkImport}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Bulk Paste / CSV Import</span>
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Best of 3 Modal */}
      {bestOfThreeOpen && (
        <BestOfThreeModal
          isOpen={bestOfThreeOpen}
          availableItems={items}
          soundEnabled={soundSettings.enabled}
          soundPack={soundSettings.pack}
          volume={soundSettings.volume}
          onClose={() => setBestOfThreeOpen(false)}
        />
      )}

      {/* Winner Celebration Modal */}
      {winnerModalOpen && winnerItem && (
        <WinnerModal
          isOpen={winnerModalOpen}
          winner={winnerItem}
          items={items}
          palette={palette}
          wheelTitle={wheelTitle}
          oddsPercent={preSelectedWinner?.oddsPercent || '12.5'}
          seed={preSelectedWinner?.seed || '0x94F2B01E'}
          spinNumber={lastSpinNumber}
          currentMode={currentMode}
          soundEnabled={soundSettings.enabled}
          soundPack={soundSettings.pack}
          volume={soundSettings.volume}
          ttsEnabled={soundSettings.ttsEnabled !== false}
          onClose={() => {
            if (onCloseWinnerModal) onCloseWinnerModal();
          }}
          onSpinAgain={() => {
            if (onSpinAgain) onSpinAgain();
          }}
          onRemoveWinner={(item) => {
            if (onRemoveWinner) {
              onRemoveWinner(item);
            } else {
              handleDeleteItem(item.id);
            }
          }}
          onStartBestOfThree={() => {
            if (onCloseWinnerModal) onCloseWinnerModal();
            setBestOfThreeOpen(true);
          }}
        />
      )}
    </div>
    </>
  );
}
