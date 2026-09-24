'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Trash2,
  Plus,
  Copy,
  Check,
  Zap,
  Sliders,
  ListPlus,
  X,
  Heart,
  RotateCw,
  Palette,
  PenTool,
  PartyPopper,
  Camera,
  Video,
  BookOpen,
  Gamepad2,
  GraduationCap,
  Pencil,
  RotateCcw
} from 'lucide-react';
import {
  THEME_DATABASE,
  THEME_CATEGORIES,
  ThemeCategory,
  ThemeEntry
} from '@/lib/themes/themeDatabase';
import {
  playTickSound,
  playWinnerFanfare,
  playClickSound,
  unlockAudioContext
} from '@/lib/sound';
import { useSavedWheels, toggleWheelFavorite } from '@/lib/storage';

function getRandomIndex(length: number): number {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0] % length;
  }
  return Math.floor(Math.random() * length);
}

const THEME_PALETTE = [
  '#ec4899', // Pink
  '#8b5cf6', // Violet
  '#3b82f6', // Royal Blue
  '#06b6d4', // Cyan
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#f97316', // Orange
  '#ef4444'  // Red
];

const CATEGORY_ICONS: Record<ThemeCategory, React.ElementType> = {
  drawing: Palette,
  writing: PenTool,
  party: PartyPopper,
  photography: Camera,
  video: Video,
  storytelling: BookOpen,
  gaming: Gamepad2,
  classroom: GraduationCap,
  custom: Plus
};

function getInitialCategoryPools(): Record<ThemeCategory, ThemeEntry[]> {
  const pools: Record<ThemeCategory, ThemeEntry[]> = {
    drawing: [],
    writing: [],
    party: [],
    photography: [],
    video: [],
    storytelling: [],
    gaming: [],
    classroom: [],
    custom: [
      { id: 'c-1', title: 'Futuristic Sci-Fi City', category: 'custom', promptIdea: 'Neon towers with skyways and flying transports.' },
      { id: 'c-2', title: 'Ancient Forest Shrine', category: 'custom', promptIdea: 'Mossy stone lanterns and glowing spirit wisps.' },
      { id: 'c-3', title: 'Cozy Winter Coffee Shop', category: 'custom', promptIdea: 'Snow outside, steamy mugs, and warm fairy lights.' }
    ]
  };

  THEME_DATABASE.forEach((item) => {
    if (pools[item.category]) {
      pools[item.category].push(item);
    }
  });

  if (typeof window !== 'undefined') {
    try {
      const savedPools = localStorage.getItem('theme_wheel_category_pools_v2');
      if (savedPools) {
        const parsed = JSON.parse(savedPools);
        if (parsed && typeof parsed === 'object') {
          return { ...pools, ...parsed };
        }
      }
    } catch {
      // ignore
    }
  }

  return pools;
}

function getInitialFavorites(): ThemeEntry[] {
  if (typeof window !== 'undefined') {
    try {
      const savedFavs = localStorage.getItem('theme_wheel_favorites');
      if (savedFavs) {
        const parsedFavs = JSON.parse(savedFavs);
        if (Array.isArray(parsedFavs)) {
          return parsedFavs;
        }
      }
    } catch {
      // ignore
    }
  }
  return [];
}

export default function ThemeWheelEngine() {
  const [activeCategory, setActiveCategory] = useState<ThemeCategory>('drawing');
  const [categoryPools, setCategoryPools] = useState<Record<ThemeCategory, ThemeEntry[]>>(getInitialCategoryPools);

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [selectedTheme, setSelectedTheme] = useState<ThemeEntry | null>(null);
  const [needleAngle, setNeedleAngle] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // New item input
  const [newTitle, setNewTitle] = useState<string>('');
  const [newIdea, setNewIdea] = useState<string>('');

  // Edit item state
  const [editingItem, setEditingItem] = useState<ThemeEntry | null>(null);
  const [editTitle, setEditTitle] = useState<string>('');
  const [editIdea, setEditIdea] = useState<string>('');

  // Bulk Paste State
  const [showBulkModal, setShowBulkModal] = useState<boolean>(false);
  const [bulkInput, setBulkInput] = useState<string>('');

  // Elimination / No Repeat Deck Mode
  const [isNoRepeat, setIsNoRepeat] = useState<boolean>(false);
  const [eliminatedIds, setEliminatedIds] = useState<string[]>([]);

  // Saved Favorites for Theme Prompts
  const [favorites, setFavorites] = useState<ThemeEntry[]>(getInitialFavorites);
  const [showFavoritesModal, setShowFavoritesModal] = useState<boolean>(false);

  // Saved Wheels hook from storage
  const savedWheels = useSavedWheels();

  const wheelCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const currentAngleRef = useRef<number>(0);

  const isGameFavorited = savedWheels.some(
    (w) => w.id === 'theme-wheel' || w.title.trim().toLowerCase() === 'spin wheel themes'
  );

  const updateCategoryPools = (newPools: Record<ThemeCategory, ThemeEntry[]>) => {
    setCategoryPools(newPools);
    try {
      localStorage.setItem('theme_wheel_category_pools_v2', JSON.stringify(newPools));
    } catch {
      // ignore
    }
  };

  // Compute Active Themes List based on category & elimination
  const currentCategoryList = categoryPools[activeCategory] || [];
  let activeThemes = currentCategoryList;
  if (isNoRepeat && eliminatedIds.length > 0) {
    const filtered = currentCategoryList.filter((t) => !eliminatedIds.includes(t.id));
    if (filtered.length > 0) activeThemes = filtered;
  }

  const toggleFavorite = (theme: ThemeEntry) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === theme.id || f.title === theme.title);
      const updated = exists
        ? prev.filter((f) => f.id !== theme.id && f.title !== theme.title)
        : [...prev, theme];
      try {
        localStorage.setItem('theme_wheel_favorites', JSON.stringify(updated));
      } catch {
        // ignore
      }
      setToastMsg(exists ? 'Removed from Favorites' : '❤️ Saved to Favorites!');
      setTimeout(() => setToastMsg(null), 2200);
      return updated;
    });
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    try {
      localStorage.removeItem('theme_wheel_favorites');
    } catch {
      // ignore
    }
    setToastMsg('Favorites Cleared');
    setTimeout(() => setToastMsg(null), 2000);
  };

  const handleFavoriteGame = () => {
    const isNowSaved = toggleWheelFavorite({
      id: 'theme-wheel',
      title: 'Spin Wheel Themes',
      category: 'Creative & Classroom',
      description: 'Spin a random theme wheel for drawing, writing, parties, storytelling, video, photography, games and classroom activities.',
      items: activeThemes.map((t, idx) => ({ id: t.id || `t-${idx}`, text: t.title, weight: 1 })),
      paletteKey: 'purple'
    });
    setToastMsg(isNowSaved ? '❤️ Saved Theme Wheel to Profile Favorites!' : 'Removed Theme Wheel from Profile Favorites');
    setTimeout(() => setToastMsg(null), 2200);
  };

  // Canvas Wheel Drawing
  const drawWheel = useCallback(() => {
    const canvas = wheelCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const outerRadius = Math.min(centerX, centerY) - 16;
    const innerRadius = 36;

    ctx.clearRect(0, 0, width, height);

    if (activeThemes.length === 0) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI);
      ctx.fillStyle = '#334155';
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#64748b';
      ctx.stroke();

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('No themes in pool', centerX, centerY);
      ctx.restore();
      return;
    }

    const total = activeThemes.length;
    const sliceAngle = (2 * Math.PI) / total;

    ctx.save();

    for (let i = 0; i < total; i++) {
      const startAngle = currentAngleRef.current + i * sliceAngle;
      const endAngle = startAngle + sliceAngle;
      const color = THEME_PALETTE[i % THEME_PALETTE.length];

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';

      const fontSize = total > 12 ? 11 : total > 8 ? 13 : 15;
      ctx.font = `bold ${fontSize}px sans-serif`;

      let text = activeThemes[i].title;
      if (text.length > 22) text = text.substring(0, 20) + '...';

      ctx.fillText(text, outerRadius - 18, 0);
      ctx.restore();
    }

    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    ctx.fillStyle = '#a855f7';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 14, 0, 2 * Math.PI);
    ctx.fill();

    ctx.restore();
  }, [activeThemes]);

  useEffect(() => {
    drawWheel();
  }, [drawWheel]);

  // Spin Logic
  const handleSpin = () => {
    if (isSpinning || activeThemes.length === 0) return;
    unlockAudioContext();

    setIsSpinning(true);
    setSelectedTheme(null);

    const winningIndex = getRandomIndex(activeThemes.length);
    const chosenTheme = activeThemes[winningIndex];

    const sliceAngle = (2 * Math.PI) / activeThemes.length;
    const targetSliceCenter = winningIndex * sliceAngle + sliceAngle / 2;
    const pointerAngle = 1.5 * Math.PI;

    const extraSpins = 5 + Math.floor(Math.random() * 3);
    const targetAngle =
      currentAngleRef.current +
      extraSpins * 2 * Math.PI +
      (pointerAngle - targetSliceCenter - (currentAngleRef.current % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

    const startAngle = currentAngleRef.current;
    const duration = 4500;
    const startTime = performance.now();

    let lastTickSlice = -1;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      currentAngleRef.current = startAngle + (targetAngle - startAngle) * easeOut;

      drawWheel();

      const currentSlice = Math.floor(
        ((pointerAngle - (currentAngleRef.current % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) / sliceAngle
      );
      if (currentSlice !== lastTickSlice) {
        if (soundEnabled) playTickSound();
        setNeedleAngle(-18);
        setTimeout(() => setNeedleAngle(0), 60);
        lastTickSlice = currentSlice;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        setSelectedTheme(chosenTheme);

        if (soundEnabled) playWinnerFanfare();

        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });

        if (isNoRepeat) {
          setEliminatedIds((prev) => [...prev, chosenTheme.id]);
        }
      }
    };

    requestAnimationFrame(animate);
  };

  // Add Theme to Current Category
  const handleAddPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newEntry: ThemeEntry = {
      id: `${activeCategory}-${Date.now()}`,
      title: newTitle.trim(),
      category: activeCategory,
      promptIdea: newIdea.trim() || undefined
    };

    const updated = {
      ...categoryPools,
      [activeCategory]: [newEntry, ...(categoryPools[activeCategory] || [])]
    };

    updateCategoryPools(updated);
    setNewTitle('');
    setNewIdea('');
    if (soundEnabled) playClickSound();

    const activeCatLabel = THEME_CATEGORIES.find((c) => c.id === activeCategory)?.label || activeCategory;
    setToastMsg(`Added to ${activeCatLabel} list!`);
    setTimeout(() => setToastMsg(null), 2000);
  };

  // Edit Theme in Current Category
  const handleStartEdit = (theme: ThemeEntry) => {
    setEditingItem(theme);
    setEditTitle(theme.title);
    setEditIdea(theme.promptIdea || '');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editTitle.trim()) return;

    const updatedList = (categoryPools[activeCategory] || []).map((t) => {
      if (t.id === editingItem.id) {
        return {
          ...t,
          title: editTitle.trim(),
          promptIdea: editIdea.trim() || undefined
        };
      }
      return t;
    });

    updateCategoryPools({
      ...categoryPools,
      [activeCategory]: updatedList
    });

    setEditingItem(null);
    setEditTitle('');
    setEditIdea('');
    if (soundEnabled) playClickSound();

    setToastMsg('Updated prompt!');
    setTimeout(() => setToastMsg(null), 2000);
  };

  // Remove Theme from Current Category
  const handleRemoveTheme = (id: string) => {
    const updatedList = (categoryPools[activeCategory] || []).filter((t) => t.id !== id);
    updateCategoryPools({
      ...categoryPools,
      [activeCategory]: updatedList
    });
    if (soundEnabled) playClickSound();
  };

  // Reset Current Category to Defaults
  const handleResetCategory = () => {
    const defaults = getInitialCategoryPools()[activeCategory] || [];
    updateCategoryPools({
      ...categoryPools,
      [activeCategory]: defaults
    });
    setEliminatedIds([]);
    const activeCatLabel = THEME_CATEGORIES.find((c) => c.id === activeCategory)?.label || activeCategory;
    setToastMsg(`Reset ${activeCatLabel} themes to default!`);
    setTimeout(() => setToastMsg(null), 2000);
  };

  // Bulk Add to Current Category
  const handleBulkAdd = () => {
    if (!bulkInput.trim()) return;
    const lines = bulkInput.split('\n').filter((l) => l.trim().length > 0);
    const parsed: ThemeEntry[] = lines.map((line, idx) => {
      const parts = line.split('|');
      return {
        id: `bulk-${activeCategory}-${Date.now()}-${idx}`,
        title: parts[0].trim(),
        category: activeCategory,
        promptIdea: parts[1] ? parts[1].trim() : undefined
      };
    });

    updateCategoryPools({
      ...categoryPools,
      [activeCategory]: [...parsed, ...(categoryPools[activeCategory] || [])]
    });

    setBulkInput('');
    setShowBulkModal(false);
    if (soundEnabled) playClickSound();

    const activeCatLabel = THEME_CATEGORIES.find((c) => c.id === activeCategory)?.label || activeCategory;
    setToastMsg(`Imported ${parsed.length} themes to ${activeCatLabel}!`);
    setTimeout(() => setToastMsg(null), 2200);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isCurrentFavorite = selectedTheme
    ? favorites.some((f) => f.id === selectedTheme.id || f.title === selectedTheme.title)
    : false;

  const currentCategoryObj = THEME_CATEGORIES.find((c) => c.id === activeCategory) || THEME_CATEGORIES[0];
  const CategoryIconComp = CATEGORY_ICONS[activeCategory] || Palette;

  return (
    <div
      ref={containerRef}
      className={`bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors relative ${
        isFullscreen ? 'p-6 sm:p-10 overflow-y-auto min-h-screen' : ''
      }`}
    >
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-slate-900/95 text-white text-xs font-bold shadow-2xl backdrop-blur-md flex items-center gap-2 border border-slate-700/50 animate-in fade-in slide-in-from-top-3 duration-200">
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-sm sm:text-base">Spin Wheel Themes</h2>
              <button
                type="button"
                onClick={handleFavoriteGame}
                aria-label={isGameFavorited ? 'Remove game from profile favorites' : 'Save game to profile favorites'}
                title={isGameFavorited ? 'Saved in Profile Favorites' : 'Save Game to Profile Favorites'}
                className={`p-1.5 rounded-full transition-all cursor-pointer ${
                  isGameFavorited
                    ? 'bg-rose-500/10 text-rose-500 scale-105'
                    : 'bg-slate-200/80 dark:bg-slate-800 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30'
                }`}
              >
                <Heart className={`w-4 h-4 ${isGameFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {activeThemes.length} prompts in active {currentCategoryObj.label} pool
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* No Repeat Deck Toggle */}
          <button
            onClick={() => setIsNoRepeat(!isNoRepeat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              isNoRepeat
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>No-Repeat Deck</span>
          </button>

          {isNoRepeat && eliminatedIds.length > 0 && (
            <button
              onClick={() => setEliminatedIds([])}
              className="px-2.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold transition-colors"
            >
              Reset Deck ({eliminatedIds.length})
            </button>
          )}

          {/* Saved Favorites Button */}
          <button
            onClick={() => setShowFavoritesModal(true)}
            className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>Favorites ({favorites.length})</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 transition-colors"
            title={soundEnabled ? 'Mute audio' : 'Enable audio'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => {
              if (!isFullscreen) {
                containerRef.current?.requestFullscreen?.();
                setIsFullscreen(true);
              } else {
                document.exitFullscreen?.();
                setIsFullscreen(false);
              }
            }}
            className="p-2 rounded-xl bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 transition-colors"
            title="Toggle fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2 mb-8">
        {THEME_CATEGORIES.map((cat) => {
          const IconComponent = CATEGORY_ICONS[cat.id];
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setSelectedTheme(null);
              }}
              className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1.5 transition-all border ${
                isActive
                  ? 'bg-purple-600 text-white border-purple-600 shadow-md scale-105'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-purple-400'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Wheel Canvas & Result Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
        {/* Canvas & Pointer */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
          <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center p-2">
            {/* Pointer / Needle */}
            <div
              className="absolute top-1 z-30 transition-transform duration-75 origin-bottom"
              style={{ transform: `rotate(${needleAngle}deg)` }}
            >
              <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[28px] border-t-amber-400 drop-shadow-md" />
            </div>

            <canvas
              ref={wheelCanvasRef}
              width={480}
              height={480}
              className="w-full h-full cursor-pointer rounded-full shadow-2xl transition-transform active:scale-[0.99]"
              onClick={handleSpin}
            />
          </div>

          {/* Spin Trigger Button */}
          <button
            onClick={handleSpin}
            disabled={isSpinning || activeThemes.length === 0}
            className="mt-6 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-base shadow-xl hover:shadow-2xl active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
          >
            <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>{isSpinning ? 'SPINNING THEME...' : 'SPIN WHEEL THEMES'}</span>
          </button>
        </div>

        {/* Selected Result Card & Category Custom Manager */}
        <div className="lg:col-span-6 space-y-6">
          {/* Winner Card */}
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg min-h-[200px] flex flex-col justify-center">
            {selectedTheme ? (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm relative pr-12">
                  <button
                    onClick={() => toggleFavorite(selectedTheme)}
                    title={isCurrentFavorite ? 'Remove from profile favorites' : 'Save to profile favorites'}
                    aria-label={isCurrentFavorite ? 'Remove from profile favorites' : 'Save to profile favorites'}
                    className="absolute top-3 right-3 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-all group"
                  >
                    <Heart
                      className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                        isCurrentFavorite
                          ? 'fill-rose-500 text-rose-500'
                          : 'text-slate-400 dark:text-slate-500 hover:text-rose-500'
                      }`}
                    />
                  </button>

                  <div className="inline-block px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-black uppercase tracking-wider mb-2">
                    {selectedTheme.category} theme
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 leading-snug">
                    {selectedTheme.title}
                  </h3>

                  {selectedTheme.promptIdea && (
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                      &ldquo;{selectedTheme.promptIdea}&rdquo;
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(`${selectedTheme.title} - ${selectedTheme.promptIdea || ''}`)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied!' : 'Copy Theme'}</span>
                  </button>

                  <button
                    onClick={() => toggleFavorite(selectedTheme)}
                    title={isCurrentFavorite ? 'Remove from profile favorites' : 'Save to profile favorites'}
                    aria-label={isCurrentFavorite ? 'Remove from profile favorites' : 'Save to profile favorites'}
                    className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                      isCurrentFavorite
                        ? 'bg-rose-500/10 text-rose-500 hover:bg-rose-500/20'
                        : 'bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-400 hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isCurrentFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 space-y-2">
                <Zap className="w-8 h-8 text-purple-500 mx-auto opacity-60 animate-bounce" />
                <h4 className="font-bold text-base text-slate-800 dark:text-slate-200">Ready to Draw a Theme?</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                  Click the center wheel or tap SPIN WHEEL THEMES to generate a creative prompt.
                </p>
              </div>
            )}
          </div>

          {/* Category List & Custom Editor Manager for Selected Category */}
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  <CategoryIconComp className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    Edit & Custom List: {currentCategoryObj.label}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Add, edit, or remove prompts for the {currentCategoryObj.label} wheel
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowBulkModal(true)}
                  className="px-2.5 py-1.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <ListPlus className="w-3.5 h-3.5" />
                  <span>Bulk Import</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetCategory}
                  title="Reset category to default themes"
                  className="p-1.5 rounded-xl bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Add Form */}
            <form onSubmit={handleAddPrompt} className="space-y-2.5 pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder={`New ${currentCategoryObj.label} title...`}
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="text"
                  placeholder="Optional prompt description..."
                  value={newIdea}
                  onChange={(e) => setNewIdea(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button
                type="submit"
                disabled={!newTitle.trim()}
                className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Custom Prompt to {currentCategoryObj.label}</span>
              </button>
            </form>

            {/* Category Prompts List */}
            <div className="max-h-56 overflow-y-auto space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800 pr-1">
              {currentCategoryList.length > 0 ? (
                currentCategoryList.map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs group hover:border-purple-300 dark:hover:border-purple-600 transition-colors"
                  >
                    <div className="truncate pr-2">
                      <span className="font-bold text-slate-900 dark:text-slate-100">{t.title}</span>
                      {t.promptIdea && <span className="text-slate-500 text-[10px] block truncate">{t.promptIdea}</span>}
                    </div>

                    <div className="flex items-center gap-1 opacity-90 sm:opacity-70 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => handleStartEdit(t)}
                        title="Edit prompt"
                        className="p-1 rounded-lg text-slate-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/40"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveTheme(t.id)}
                        title="Delete prompt"
                        className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-slate-400 text-xs italic">
                  No themes in this category. Click &ldquo;Reset to Defaults&rdquo; or add custom prompts above.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Item Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Pencil className="w-4 h-4 text-purple-500" />
                Edit Prompt ({currentCategoryObj.label})
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">
                  Prompt Title
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">
                  Prompt Description / Detail
                </label>
                <textarea
                  rows={3}
                  value={editIdea}
                  onChange={(e) => setEditIdea(e.target.value)}
                  placeholder="Optional details or scenario ideas..."
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!editTitle.trim()}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white transition-colors disabled:opacity-50"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Import Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <ListPlus className="w-5 h-5 text-purple-500" />
                Bulk Import to {currentCategoryObj.label}
              </h3>
              <button
                onClick={() => setShowBulkModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Paste one theme per line. You can optionally separate theme title and prompt detail with a pipe symbol (<code>|</code>).
            </p>

            <textarea
              rows={6}
              placeholder="Neon City Alley | Rainy Cyberpunk Night&#10;Steampunk Flying Airship | Copper gears in sunset clouds&#10;Haunted Gothic Library"
              value={bulkInput}
              onChange={(e) => setBulkInput(e.target.value)}
              className="w-full p-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowBulkModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkAdd}
                disabled={!bulkInput.trim()}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white transition-colors disabled:opacity-50"
              >
                Import to {currentCategoryObj.label}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Saved Favorites Modal */}
      {showFavoritesModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-4">
              <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                Saved Favorite Themes
              </h3>
              <button
                onClick={() => setShowFavoritesModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
              {favorites.length > 0 ? (
                favorites.map((f) => (
                  <div
                    key={f.id}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3"
                  >
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100">{f.title}</h4>
                      {f.promptIdea && <p className="text-[11px] text-slate-500 italic mt-0.5">{f.promptIdea}</p>}
                    </div>
                    <button
                      onClick={() => toggleFavorite(f)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic text-center py-8">
                  No saved themes yet. Click the heart icon on any drawn theme!
                </p>
              )}
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              {favorites.length > 0 && (
                <button
                  onClick={clearAllFavorites}
                  className="text-xs font-bold text-rose-500 hover:text-rose-700 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear All
                </button>
              )}
              <button
                onClick={() => setShowFavoritesModal(false)}
                className="ml-auto px-4 py-2 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
