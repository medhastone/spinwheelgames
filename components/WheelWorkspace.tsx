'use client';

import React, { useState, useRef, useEffect, useCallback, useSyncExternalStore } from 'react';
import WheelCanvas from './WheelCanvas';
import WheelControls from './WheelControls';
import EntryEditor from './EntryEditor';
import WeightedEditor from './WeightedEditor';
import SpinButton from './SpinButton';
import SoundControls from './SoundControls';
import BestOfThreeModal from './BestOfThreeModal';
import { WheelItem, WheelMode, SpinLogItem, SoundSettings } from '@/lib/types';
import { playCountdownBeep } from '@/lib/sound';
import { toggleWheelFavorite, useSavedWheels } from '@/lib/storage';
import { UserX, List, Scale, Volume2, History, Heart } from 'lucide-react';

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
  onUpdateItems: (newItems: WheelItem[]) => void;
  onSelectPalette: (paletteKey: string) => void;
  onChangeDuration: (dur: number) => void;
  onChangeSoundSettings: (settings: SoundSettings) => void;
  onTriggerSpin: () => void;
  onSpinStart: () => void;
  onSpinEnd: (winner: WheelItem) => void;
  onOpenBulkImport: () => void;
  onResetWheel: () => void;
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
  onUpdateItems,
  onSelectPalette,
  onChangeDuration,
  onChangeSoundSettings,
  onTriggerSpin,
  onSpinStart,
  onSpinEnd,
  onOpenBulkImport,
  onResetWheel
}: WheelWorkspaceProps) {
  const [activeSidebarTab, setActiveSidebarTab] = useState<'entries' | 'weights' | 'audio' | 'audit'>('entries');
  const [countdownEnabled, setCountdownEnabled] = useState(false);
  const [countdownVal, setCountdownVal] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [bestOfThreeOpen, setBestOfThreeOpen] = useState(false);

  // Undo / Redo History Stacks
  const [historyPast, setHistoryPast] = useState<WheelItem[][]>([]);
  const [historyFuture, setHistoryFuture] = useState<WheelItem[][]>([]);

  const workspaceRef = useRef<HTMLDivElement>(null);

  // Push to undo stack
  const updateItemsWithHistory = useCallback((newItems: WheelItem[]) => {
    setHistoryPast((prev) => [...prev, items]);
    setHistoryFuture([]);
    onUpdateItems(newItems);
  }, [items, onUpdateItems]);

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

  // Fullscreen toggle handler
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      workspaceRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  // Countdown and spin trigger
  const handleInitiateSpin = useCallback(() => {
    if (isSpinning || items.length < 2) return;

    if (currentMode === 'best-of-3') {
      setBestOfThreeOpen(true);
      return;
    }

    if (countdownEnabled) {
      setCountdownVal(3);
      playCountdownBeep(false, soundSettings.enabled, soundSettings.volume);

      let step = 3;
      const interval = setInterval(() => {
        step -= 1;
        if (step > 0) {
          setCountdownVal(step);
          playCountdownBeep(false, soundSettings.enabled, soundSettings.volume);
        } else {
          clearInterval(interval);
          setCountdownVal(null);
          playCountdownBeep(true, soundSettings.enabled, soundSettings.volume);
          onTriggerSpin();
        }
      }, 800);
    } else {
      onTriggerSpin();
    }
  }, [isSpinning, items.length, currentMode, countdownEnabled, soundSettings, onTriggerSpin]);

  // Keyboard shortcut listener (Space to spin, F for fullscreen, Undo/Redo)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || (e.target as HTMLElement)?.isContentEditable) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        if (!isSpinning && items.length >= 2 && countdownVal === null) {
          handleInitiateSpin();
        }
      } else if (e.key === 'f' || e.key === 'F') {
        handleToggleFullscreen();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSpinning, items.length, countdownVal, handleInitiateSpin, handleRedo, handleUndo]);

  // Shuffle items
  const handleShuffle = () => {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    updateItemsWithHistory(shuffled);
  };

  // Sort items
  const handleSort = (dir: 'asc' | 'desc' | 'weight') => {
    const sorted = [...items].sort((a, b) => {
      if (dir === 'weight') return (b.weight || 1) - (a.weight || 1);
      return a.text.localeCompare(b.text);
    });
    updateItemsWithHistory(sorted);
  };

  // Deduplicate items
  const handleDeduplicate = () => {
    const seen = new Set<string>();
    const deduplicated: WheelItem[] = [];
    items.forEach((item) => {
      const clean = item.text.trim().toLowerCase();
      if (!seen.has(clean)) {
        seen.add(clean);
        deduplicated.push(item);
      }
    });
    updateItemsWithHistory(deduplicated);
  };

  // Randomize colors
  const handleRandomizeColors = () => {
    const updated = items.map((item) => ({
      ...item,
      color: palette[Math.floor(Math.random() * palette.length)]
    }));
    updateItemsWithHistory(updated);
  };

  // Update item
  const handleUpdateItem = (id: string, text: string, color?: string) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, text, ...(color ? { color } : {}) } : item
    );
    updateItemsWithHistory(updated);
  };

  // Update weight
  const handleUpdateWeight = (id: string, weight: number) => {
    const updated = items.map((item) => (item.id === id ? { ...item, weight } : item));
    updateItemsWithHistory(updated);
  };

  // Reset weights to equal 1:1
  const handleResetWeights = () => {
    const updated = items.map((item) => ({ ...item, weight: 1 }));
    updateItemsWithHistory(updated);
  };

  // Add Item
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

  // Saved / Favorite state subscription
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
  };

  return (
    <div
      ref={workspaceRef}
      className={`w-full flex flex-col gap-6 transition-all ${
        isFullscreen ? 'p-6 bg-white dark:bg-[#12131a] overflow-y-auto min-h-screen' : ''
      }`}
    >
      {/* Top Wheel Controls Bar */}
      <WheelControls
        currentMode={currentMode}
        onSelectMode={onSelectMode}
        onShuffle={handleShuffle}
        onSort={handleSort}
        onReset={onResetWheel}
        canUndo={historyPast.length > 0}
        canRedo={historyFuture.length > 0}
        onUndo={handleUndo}
        onRedo={handleRedo}
        duration={spinDuration}
        onChangeDuration={onChangeDuration}
        countdown={countdownEnabled}
        onToggleCountdown={() => setCountdownEnabled(!countdownEnabled)}
        activePaletteKey={activePaletteKey}
        onChangePalette={onSelectPalette}
        onToggleFullscreen={handleToggleFullscreen}
        isFullscreen={isFullscreen}
      />

      {/* Main 2-Column Responsive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Interactive Wheel Canvas Stage (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col items-center gap-6 bg-white dark:bg-[#181922] rounded-3xl p-6 sm:p-8 border border-[#eeedf7] dark:border-[#292a39] shadow-sm">
          {/* Wheel Title & Heart Favorite Button */}
          <div className="w-full flex items-center justify-between border-b border-[#eeedf7] dark:border-[#292a39] pb-4">
            <div className="flex items-center gap-3">
              <div>
                <h2 className="font-headline font-extrabold text-[20px] sm:text-[24px] text-[#1a1b22] dark:text-[#f1effa]">
                  {wheelTitle}
                </h2>
                <span className="text-[12px] text-[#767586] dark:text-[#908fa1]">
                  Mode: <strong className="capitalize text-[#4648d4] dark:text-[#8587ff]">{currentMode}</strong> • {items.length} Slices
                </span>
              </div>
              <button
                type="button"
                onClick={handleToggleFavorite}
                className={`p-2 rounded-xl transition-all border cursor-pointer ${
                  isFavorite
                    ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-500 border-rose-200 dark:border-rose-900/60 shadow-xs'
                    : 'bg-[#f4f2fd] dark:bg-[#1d1e28] text-[#767586] hover:text-rose-500 dark:text-[#908fa1] dark:hover:text-rose-400 border-[#eeedf7] dark:border-[#292a39]'
                }`}
                title={isFavorite ? 'Saved to your profile favorites' : 'Save to Profile Favorites'}
                aria-label={isFavorite ? 'Remove from saved favorites' : 'Save wheel to favorites'}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            {/* Elimination indicator badge */}
            {currentMode === 'elimination' && (
              <span className="px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-300 text-[11px] font-bold flex items-center gap-1">
                <UserX className="w-3.5 h-3.5" />
                <span>Elimination Active</span>
              </span>
            )}
          </div>

          {/* SVG Wheel Canvas Engine */}
          <div className="w-full py-2">
            <WheelCanvas
              items={items}
              palette={palette}
              isSpinning={isSpinning}
              preSelectedWinner={preSelectedWinner}
              onSpinStart={onSpinStart}
              onSpinEnd={onSpinEnd}
              duration={spinDuration}
              soundEnabled={soundSettings.enabled}
              soundPack={soundSettings.pack}
              volume={soundSettings.volume}
              mysteryMode={currentMode === 'mystery'}
            />
          </div>

          {/* Big Tactile Spin Button */}
          <SpinButton
            onSpin={handleInitiateSpin}
            isSpinning={isSpinning}
            disabled={items.length < 2}
            countdownNumber={countdownVal}
          />
        </div>

        {/* Right Column: Tabbed Configuration Sidebar (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Tab Selection */}
          <div className="flex bg-[#f4f2fd] dark:bg-[#1d1e28] p-1 rounded-2xl border border-[#eeedf7] dark:border-[#292a39]">
            <button
              type="button"
              onClick={() => setActiveSidebarTab('entries')}
              className={`flex-1 py-2 px-2 rounded-xl text-[12px] sm:text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeSidebarTab === 'entries'
                  ? 'bg-white dark:bg-[#12131a] text-[#4648d4] dark:text-[#8587ff] shadow-xs'
                  : 'text-[#464554] dark:text-[#c7c4d7]'
              }`}
            >
              <List className="w-4 h-4 shrink-0" />
              <span>Entries</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSidebarTab('weights')}
              className={`flex-1 py-2 px-2 rounded-xl text-[12px] sm:text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeSidebarTab === 'weights'
                  ? 'bg-white dark:bg-[#12131a] text-[#4648d4] dark:text-[#8587ff] shadow-xs'
                  : 'text-[#464554] dark:text-[#c7c4d7]'
              }`}
            >
              <Scale className="w-4 h-4 shrink-0" />
              <span>Weights</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSidebarTab('audio')}
              className={`flex-1 py-2 px-2 rounded-xl text-[12px] sm:text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeSidebarTab === 'audio'
                  ? 'bg-white dark:bg-[#12131a] text-[#4648d4] dark:text-[#8587ff] shadow-xs'
                  : 'text-[#464554] dark:text-[#c7c4d7]'
              }`}
            >
              <Volume2 className="w-4 h-4 shrink-0" />
              <span>Sound</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSidebarTab('audit')}
              className={`flex-1 py-2 px-2 rounded-xl text-[12px] sm:text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeSidebarTab === 'audit'
                  ? 'bg-white dark:bg-[#12131a] text-[#4648d4] dark:text-[#8587ff] shadow-xs'
                  : 'text-[#464554] dark:text-[#c7c4d7]'
              }`}
            >
              <History className="w-4 h-4 shrink-0" />
              <span>Audit ({spinLogs.length})</span>
            </button>
          </div>

          {/* Tab Content Panes */}
          {activeSidebarTab === 'entries' && (
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

          {activeSidebarTab === 'weights' && (
            <WeightedEditor
              items={items}
              palette={palette}
              onUpdateWeight={handleUpdateWeight}
              onResetWeights={handleResetWeights}
            />
          )}

          {activeSidebarTab === 'audio' && (
            <SoundControls
              settings={soundSettings}
              onChangeSettings={onChangeSoundSettings}
            />
          )}

          {activeSidebarTab === 'audit' && (
            <div className="w-full bg-white dark:bg-[#181922] rounded-2xl p-4 sm:p-5 border border-[#eeedf7] dark:border-[#292a39] shadow-sm flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="font-headline font-bold text-[16px] text-[#1a1b22] dark:text-[#f1effa]">
                  Cryptographic Audit Log
                </h3>
                <span className="text-[12px] text-[#767586] dark:text-[#908fa1]">
                  Hardware Entropy
                </span>
              </div>

              <div className="max-h-[300px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {spinLogs.length === 0 ? (
                  <p className="py-8 text-center text-[#908fa1] text-[13px]">
                    No spins logged yet. Hit Spin to record your first cryptographic draw!
                  </p>
                ) : (
                  spinLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-2.5 rounded-xl bg-[#fbf8ff] dark:bg-[#1d1e28] border border-[#eeedf7] dark:border-[#292a39] flex items-center justify-between text-[12px]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#4648d4] dark:text-[#8587ff]">
                          #{log.spinNumber}
                        </span>
                        <span className="font-medium text-[#1a1b22] dark:text-[#f1effa]">
                          {log.itemText}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[#767586] dark:text-[#908fa1] font-mono text-[11px]">
                        <span>{log.oddsPercent}%</span>
                        <span className="truncate max-w-[80px]" title={log.seed}>
                          {log.seed}
                        </span>
                        <span>{log.time}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Best of 3 Series Modal */}
      <BestOfThreeModal
        isOpen={bestOfThreeOpen}
        onClose={() => setBestOfThreeOpen(false)}
        availableItems={items}
        soundEnabled={soundSettings.enabled}
        soundPack={soundSettings.pack}
        volume={soundSettings.volume}
      />
    </div>
  );
}
