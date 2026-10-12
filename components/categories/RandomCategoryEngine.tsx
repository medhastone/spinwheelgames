'use client';

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import confetti from '@/lib/confetti';
import {
  PawPrint,
  Utensils,
  Film,
  Trophy,
  Globe,
  Atom,
  Cpu,
  Landmark,
  Package,
  PenTool,
  GraduationCap,
  Sparkles,
  Shuffle,
  RotateCcw,
  Copy,
  Check,
  Share2,
  Sliders,
  Plus,
  Trash2,
  Play,
  Pause,
  Timer,
  Volume2,
  VolumeX,
  Clock,
  X,
  Dices,
  CheckCircle2,
  ListPlus,
  Download,
  Flame,
  ArrowRight
} from 'lucide-react';
import {
  CategoryId,
  CategoryItem,
  DEFAULT_CATEGORIES,
  SCATTERGORIES_LETTERS
} from '@/lib/categories/categoryData';
import {
  playTickSound,
  playWinnerFanfare,
  playClickSound,
  unlockAudioContext
} from '@/lib/sound';

const ICON_MAP: Record<string, React.ElementType> = {
  Dog: PawPrint,
  Utensils: Utensils,
  Film: Film,
  Trophy: Trophy,
  Globe: Globe,
  Atom: Atom,
  Cpu: Cpu,
  Landmark: Landmark,
  Package: Package,
  PenTool: PenTool,
  GraduationCap: GraduationCap,
  Sparkles: Sparkles
};

export type GeneratorMode = 'single' | 'multiple' | 'scattergories';

interface GeneratedResult {
  category: CategoryItem;
  subPrompt?: string;
}

interface HistoryItem {
  id: string;
  timestamp: string;
  mode: GeneratorMode;
  letter?: string;
  results: GeneratedResult[];
}

function getSecureRandomInt(max: number): number {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0] % max;
  }
  return Math.floor(Math.random() * max);
}

export default function RandomCategoryEngine() {
  // Master Category List (Defaults + Custom additions)
  const [categories, setCategories] = useState<CategoryItem[]>(() => {
    return DEFAULT_CATEGORIES;
  });

  // Active Category Pool Selection (IDs that are checked)
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(() =>
    DEFAULT_CATEGORIES.map((c) => c.id)
  );

  // Generator Mode: 'single' | 'multiple' | 'scattergories'
  const [mode, setMode] = useState<GeneratorMode>('single');
  const [multipleCount, setMultipleCount] = useState<number>(3);
  const [isNoRepeat, setIsNoRepeat] = useState<boolean>(false);
  const [eliminatedIds, setEliminatedIds] = useState<string[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Scattergories Special State
  const [scattergoriesLetter, setScattergoriesLetter] = useState<string>('S');
  const [timerSeconds, setTimerSeconds] = useState<number>(120);
  const [timerRemaining, setTimerRemaining] = useState<number>(120);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Generated Output State
  const [currentResults, setCurrentResults] = useState<GeneratedResult[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [copiedResults, setCopiedResults] = useState<boolean>(false);

  // Custom Category Form State
  const [customModalOpen, setCustomModalOpen] = useState<boolean>(false);
  const [newCatName, setNewCatName] = useState<string>('');
  const [newCatTagline, setNewCatTagline] = useState<string>('');
  const [newCatSubPrompts, setNewCatSubPrompts] = useState<string>('');

  // Local Storage Hydration
  useEffect(() => {
    try {
      const saved = localStorage.getItem('random_category_custom_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCategories((prev) => {
            const existingIds = new Set(prev.map((c) => c.id));
            const newOnes = parsed.filter((c: CategoryItem) => !existingIds.has(c.id));
            return [...prev, ...newOnes];
          });
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  }, []);

  // Filtered pool based on user checkboxes and elimination mode
  const activeAvailableCategories = useMemo(() => {
    const selectedPool = categories.filter((c) => selectedCategoryIds.includes(c.id));
    if (isNoRepeat && eliminatedIds.length > 0) {
      const nonEliminated = selectedPool.filter((c) => !eliminatedIds.includes(c.id));
      return nonEliminated.length > 0 ? nonEliminated : selectedPool;
    }
    return selectedPool;
  }, [categories, selectedCategoryIds, isNoRepeat, eliminatedIds]);

  // Scattergories Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerRemaining > 0) {
      interval = setInterval(() => {
        setTimerRemaining((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            if (soundEnabled) playWinnerFanfare();
            showToast('⏰ Time is up for this Scattergories round!');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerRemaining, soundEnabled, showToast]);

  // Primary Generator Function
  const handleGenerate = useCallback(() => {
    if (activeAvailableCategories.length === 0) {
      showToast('Please select at least one active category in the filter!');
      return;
    }

    if (soundEnabled) {
      unlockAudioContext();
      playClickSound();
    }

    setIsGenerating(true);

    // Short visual suspense flicker
    setTimeout(() => {
      let targetCount = 1;
      if (mode === 'single') targetCount = 1;
      else if (mode === 'multiple') targetCount = Math.min(multipleCount, activeAvailableCategories.length);
      else if (mode === 'scattergories') targetCount = Math.min(6, activeAvailableCategories.length);

      // Randomly pick unique categories from available pool
      const poolCopy = [...activeAvailableCategories];
      const picked: GeneratedResult[] = [];
      const newEliminated: string[] = [];

      for (let i = 0; i < targetCount; i++) {
        if (poolCopy.length === 0) break;
        const randIdx = getSecureRandomInt(poolCopy.length);
        const cat = poolCopy.splice(randIdx, 1)[0];

        // Random sub-prompt
        let subPrompt: string | undefined = undefined;
        if (cat.subPrompts && cat.subPrompts.length > 0) {
          const subIdx = getSecureRandomInt(cat.subPrompts.length);
          subPrompt = cat.subPrompts[subIdx];
        }

        picked.push({ category: cat, subPrompt });
        newEliminated.push(cat.id);
      }

      // If in Scattergories mode, also roll a letter
      let currentLetter = scattergoriesLetter;
      if (mode === 'scattergories') {
        const letterIdx = getSecureRandomInt(SCATTERGORIES_LETTERS.length);
        currentLetter = SCATTERGORIES_LETTERS[letterIdx];
        setScattergoriesLetter(currentLetter);
        setTimerRemaining(timerSeconds);
        setIsTimerRunning(false);
      }

      setCurrentResults(picked);
      setIsGenerating(false);

      if (soundEnabled) playTickSound();
      confetti();

      // Record History
      const histItem: HistoryItem = {
        id: `h-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        mode,
        letter: mode === 'scattergories' ? currentLetter : undefined,
        results: picked
      };
      setHistory((prev) => [histItem, ...prev.slice(0, 19)]);

      // Update No-Repeat
      if (isNoRepeat) {
        setEliminatedIds((prev) => {
          const combined = [...prev, ...newEliminated];
          const allSelected = categories.filter((c) => selectedCategoryIds.includes(c.id));
          if (combined.length >= allSelected.length) {
            showToast('All categories have been drawn! Starting fresh pool.');
            return [];
          }
          return combined;
        });
      }
    }, 180);
  }, [
    activeAvailableCategories,
    categories,
    selectedCategoryIds,
    mode,
    multipleCount,
    isNoRepeat,
    scattergoriesLetter,
    timerSeconds,
    soundEnabled,
    showToast
  ]);

  // Initial draw on mount
  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keyboard shortcut: Spacebar to reroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space') {
        e.preventDefault();
        handleGenerate();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleGenerate]);

  // Copy Results to Clipboard
  const handleCopyResults = () => {
    if (currentResults.length === 0) return;
    let text = '';
    if (mode === 'scattergories') {
      text = `🎲 Scattergories Round – Letter [ ${scattergoriesLetter} ]\n`;
      text += currentResults.map((r, i) => `${i + 1}. ${r.category.name} (${r.subPrompt})`).join('\n');
    } else if (mode === 'single') {
      const r = currentResults[0];
      text = `🎯 Random Category: ${r.category.name}\n💡 Prompt Idea: ${r.subPrompt || r.category.tagline}`;
    } else {
      text = `🎲 Random Categories (${currentResults.length}):\n`;
      text += currentResults.map((r, i) => `${i + 1}. ${r.category.name} – ${r.subPrompt}`).join('\n');
    }
    text += `\nGenerated with SpinWheelGames Category Generator: https://spinwheelgames.org/random-category-generator`;

    navigator.clipboard.writeText(text);
    setCopiedResults(true);
    setTimeout(() => setCopiedResults(false), 2000);
    showToast('Copied categories to clipboard!');
  };

  // Share Results via Web Share API
  const handleShareResults = async () => {
    if (currentResults.length === 0) return;
    const shareText = currentResults.map((r) => r.category.name).join(', ');
    const shareData = {
      title: 'Random Category Generator Results',
      text: `Generated categories: ${shareText}${
        mode === 'scattergories' ? ` (Letter: ${scattergoriesLetter})` : ''
      }`,
      url: 'https://spinwheelgames.org/random-category-generator'
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        handleCopyResults();
      }
    } else {
      handleCopyResults();
    }
  };

  // Add Custom Category Handler
  const handleAddCustomCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const subList = newCatSubPrompts
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const newCategory: CategoryItem = {
      id: `custom-${Date.now()}`,
      name: newCatName.trim(),
      shortName: newCatName.trim().substring(0, 14),
      tagline: newCatTagline.trim() || 'Custom user created category',
      description: 'Customized category created for games, writing, and brainstorming.',
      iconName: 'Sparkles',
      color: '#6366f1',
      accentBg: 'rgba(99, 102, 241, 0.1)',
      subPrompts: subList.length > 0 ? subList : ['General Topic 1', 'General Topic 2', 'General Topic 3'],
      isCustom: true
    };

    const updated = [...categories, newCategory];
    setCategories(updated);
    setSelectedCategoryIds((prev) => [...prev, newCategory.id]);

    try {
      const customOnly = updated.filter((c) => c.isCustom);
      localStorage.setItem('random_category_custom_v1', JSON.stringify(customOnly));
    } catch {
      // ignore
    }

    setNewCatName('');
    setNewCatTagline('');
    setNewCatSubPrompts('');
    setCustomModalOpen(false);
    showToast(`Added custom category "${newCategory.name}"!`);
  };

  // Toggle Category In Pool
  const toggleCategoryInPool = (id: string) => {
    setSelectedCategoryIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length <= 1) {
          showToast('You must keep at least 1 category selected!');
          return prev;
        }
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectAll = () => {
    setSelectedCategoryIds(categories.map((c) => c.id));
    showToast('All 12 categories enabled');
  };

  const handleDeselectAll = () => {
    if (categories.length > 0) {
      setSelectedCategoryIds([categories[0].id]);
      showToast('Kept single category active');
    }
  };

  return (
    <div className="w-full rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 shadow-xl p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-slate-900/90 text-white text-xs sm:text-sm font-semibold rounded-full shadow-2xl backdrop-blur-md animate-fade-in flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Mode Switcher Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/70 dark:border-slate-800 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Generator Mode
          </span>
          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
            <button
              onClick={() => {
                setMode('single');
                if (soundEnabled) playClickSound();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                mode === 'single'
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              One Category
            </button>

            <button
              onClick={() => {
                setMode('multiple');
                if (soundEnabled) playClickSound();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                mode === 'multiple'
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <span>Multiple Categories</span>
              <span className="text-[10px] opacity-80">({multipleCount})</span>
            </button>

            <button
              onClick={() => {
                setMode('scattergories');
                if (soundEnabled) playClickSound();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                mode === 'scattergories'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Dices className="w-3.5 h-3.5 text-amber-300" />
              <span>Scattergories Mode</span>
            </button>
          </div>
        </div>

        {/* Settings: Sound, No-Repeat, Multiple count */}
        <div className="flex items-center gap-2 flex-wrap">
          {mode === 'multiple' && (
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-xl text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-semibold text-[11px]">Count:</span>
              {[2, 3, 4, 5, 6].map((cnt) => (
                <button
                  key={cnt}
                  onClick={() => setMultipleCount(cnt)}
                  className={`w-6 h-6 rounded-lg font-bold text-xs ${
                    multipleCount === cnt
                      ? 'bg-emerald-500 text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cnt}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={() => setIsNoRepeat(!isNoRepeat)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1 ${
              isNoRepeat
                ? 'bg-amber-50 border-amber-300 text-amber-700 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-300'
                : 'bg-slate-100 border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400'
            }`}
            title="Eliminates chosen categories so none repeat until reset"
          >
            <span>No-Repeat:</span>
            <span className={isNoRepeat ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'}>
              {isNoRepeat ? 'ON' : 'OFF'}
            </span>
          </button>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border transition-colors ${
              soundEnabled
                ? 'bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-400'
                : 'bg-slate-100 border-slate-200 text-slate-400 dark:bg-slate-800 dark:border-slate-700'
            }`}
            title={soundEnabled ? 'Mute sound' : 'Unmute sound'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Special Scattergories Top Bar */}
      {mode === 'scattergories' && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 dark:from-amber-950/40 dark:via-orange-950/30 dark:to-amber-950/20 border border-amber-200 dark:border-amber-800/80 flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
              {scattergoriesLetter}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                  Scattergories Round Letter
                </span>
                <span className="text-[10px] bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 px-1.5 py-0.5 rounded font-bold">
                  Letter: {scattergoriesLetter}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                All answers for this round must begin with the letter <strong>{scattergoriesLetter}</strong>.
              </p>
            </div>
          </div>

          {/* Round Countdown Timer */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-800 text-slate-800 dark:text-slate-200 font-mono font-bold text-sm">
              <Timer className="w-4 h-4 text-orange-500" />
              <span>
                {Math.floor(timerRemaining / 60)}:
                {(timerRemaining % 60).toString().padStart(2, '0')}
              </span>
            </div>

            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition-colors ${
                isTimerRunning
                  ? 'bg-rose-500 hover:bg-rose-600 text-white'
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white'
              }`}
            >
              {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isTimerRunning ? 'Pause' : 'Start Timer'}</span>
            </button>

            <button
              onClick={() => {
                setIsTimerRunning(false);
                setTimerRemaining(timerSeconds);
              }}
              className="p-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              title="Reset Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Generator Display Stage */}
      <div className="space-y-4">
        {mode === 'single' && currentResults.length > 0 && (
          <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-[#151722] dark:to-slate-900 border-2 border-slate-200/90 dark:border-slate-700/80 shadow-lg text-center space-y-4 animate-fade-in">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>Instant Category Generated</span>
            </div>

            {/* Big Category Name */}
            <div>
              {(() => {
                const IconComponent =
                  ICON_MAP[currentResults[0].category.iconName] || Sparkles;
                return (
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md transition-transform hover:scale-105"
                      style={{ backgroundColor: currentResults[0].category.color }}
                    >
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                      {currentResults[0].category.name}
                    </h3>
                  </div>
                );
              })()}

              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto mt-1">
                {currentResults[0].category.tagline}
              </p>
            </div>

            {/* Sub-Prompt / Specific Angle */}
            {currentResults[0].subPrompt && (
              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 max-w-md mx-auto shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-0.5">
                  Suggested Creative Prompt / Focus
                </span>
                <span className="text-sm font-extrabold text-slate-800 dark:text-slate-100">
                  {currentResults[0].subPrompt}
                </span>
              </div>
            )}
          </div>
        )}

        {(mode === 'multiple' || mode === 'scattergories') && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-bold">
                {mode === 'scattergories'
                  ? `Scattergories Round Categories (${currentResults.length})`
                  : `Random Categories (${currentResults.length})`}
              </span>
              <span>Click any card to re-roll</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {currentResults.map((result, idx) => {
                const IconComponent =
                  ICON_MAP[result.category.iconName] || Sparkles;
                return (
                  <div
                    key={`${result.category.id}-${idx}`}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow-md transition-all space-y-2 relative group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-sm flex-shrink-0"
                        style={{ backgroundColor: result.category.color }}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-bold text-slate-400">#{idx + 1}</span>
                          <h4 className="text-sm font-black text-slate-900 dark:text-white truncate">
                            {result.category.name}
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {result.category.shortName}
                        </p>
                      </div>
                    </div>

                    {result.subPrompt && (
                      <div className="pt-1.5 border-t border-slate-100 dark:border-slate-700/60 text-xs">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          Prompt Focus:
                        </span>
                        <p className="font-semibold text-slate-700 dark:text-slate-200 line-clamp-1">
                          {result.subPrompt}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Primary Action Button Bar */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap pt-2">
          <button
            onClick={handleGenerate}
            disabled={isGenerating || activeAvailableCategories.length === 0}
            className="flex-1 max-w-xs py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-sm sm:text-base shadow-lg shadow-emerald-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Shuffle className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Generating…' : 'Generate Categories'}</span>
          </button>

          <button
            onClick={handleCopyResults}
            className="py-3.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm active:scale-95 transition-all flex items-center gap-1.5"
            title="Copy category list"
          >
            {copiedResults ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span>{copiedResults ? 'Copied!' : 'Copy'}</span>
          </button>

          <button
            onClick={handleShareResults}
            className="py-3.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm active:scale-95 transition-all flex items-center gap-1.5"
            title="Share category list"
          >
            <Share2 className="w-4 h-4 text-emerald-500" />
            <span>Share</span>
          </button>

          <button
            onClick={() => {
              setEliminatedIds([]);
              showToast('No-repeat pool reset');
            }}
            className="p-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all"
            title="Reset elimination history"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category Pool Filters & Checkboxes (12 Categories) */}
      <div className="p-4 sm:p-5 rounded-3xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-500" />
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              Filter Categories in Generator Pool ({selectedCategoryIds.length}/{categories.length} active)
            </h4>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={handleSelectAll}
              className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
            >
              Select All
            </button>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <button
              onClick={handleDeselectAll}
              className="text-slate-500 dark:text-slate-400 hover:underline"
            >
              Clear
            </button>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <button
              onClick={() => setCustomModalOpen(true)}
              className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom</span>
            </button>
          </div>
        </div>

        {/* 12 Category Chips Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategoryIds.includes(cat.id);
            const isEliminated = isNoRepeat && eliminatedIds.includes(cat.id);
            const IconComponent = ICON_MAP[cat.iconName] || Sparkles;

            return (
              <button
                key={cat.id}
                onClick={() => toggleCategoryInPool(cat.id)}
                className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between text-xs font-semibold ${
                  isSelected
                    ? isEliminated
                      ? 'bg-slate-200/60 dark:bg-slate-800/40 border-slate-300 dark:border-slate-700 text-slate-400 line-through'
                      : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-sm'
                    : 'bg-slate-100/50 dark:bg-slate-900/40 border-transparent text-slate-400 dark:text-slate-500 opacity-60'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-[11px] flex-shrink-0"
                    style={{ backgroundColor: cat.color }}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                  </div>
                  <span className="truncate">{cat.name}</span>
                </div>

                <div
                  className={`w-4 h-4 rounded-md border flex items-center justify-center flex-shrink-0 ml-1.5 ${
                    isSelected
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* History Log */}
      {history.length > 0 && (
        <div className="p-4 rounded-3xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
              <Clock className="w-3.5 h-3.5 text-emerald-500" />
              <span>Generation History ({history.length})</span>
            </div>
            <button
              onClick={() => {
                setHistory([]);
                showToast('History cleared');
              }}
              className="text-rose-500 hover:underline font-semibold"
            >
              Clear
            </button>
          </div>

          <div className="max-h-36 overflow-y-auto space-y-1.5 text-xs">
            {history.map((h, i) => (
              <div
                key={h.id}
                className="p-2 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2"
              >
                <div className="truncate">
                  <span className="font-bold text-slate-400 mr-2">#{history.length - i}</span>
                  {h.letter && (
                    <span className="bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-1.5 py-0.5 rounded text-[10px] font-black mr-1.5">
                      [{h.letter}]
                    </span>
                  )}
                  <span className="text-slate-800 dark:text-slate-200">
                    {h.results.map((r) => r.category.shortName).join(', ')}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 flex-shrink-0">{h.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Category Modal */}
      {customModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-scale-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-500" />
                <h3 className="font-black text-slate-900 dark:text-white text-base">
                  Add Custom Category
                </h3>
              </div>
              <button
                onClick={() => setCustomModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCustomCategory} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="e.g. Anime & Manga or 80s Rock Bands..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Description / Tagline
                </label>
                <input
                  type="text"
                  value={newCatTagline}
                  onChange={(e) => setNewCatTagline(e.target.value)}
                  placeholder="e.g. Famous franchises, heroes, and villains..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Sub-Prompts / Specific Angles (one per line)
                </label>
                <textarea
                  value={newCatSubPrompts}
                  onChange={(e) => setNewCatSubPrompts(e.target.value)}
                  rows={4}
                  placeholder="Shonen Protagonists&#10;Tournament Arcs&#10;Mecha Battles&#10;Supernatural Powers"
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCustomModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newCatName.trim()}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white shadow-md transition-colors"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
