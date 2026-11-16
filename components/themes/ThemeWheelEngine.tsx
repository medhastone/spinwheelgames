'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from '@/lib/confetti';
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
  Cake,
  Calendar,
  Pencil,
  RotateCcw,
  CheckCircle2,
  Flame,
  ArrowRight
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
  party: PartyPopper,
  birthday: Cake,
  classroom: GraduationCap,
  content: Video,
  seasonal: Calendar,
  custom: Plus,
  drawing: Palette,
  writing: PenTool,
  gaming: Gamepad2,
  photography: Camera
};

function getInitialCategoryPools(): Record<ThemeCategory, ThemeEntry[]> {
  const pools: Record<ThemeCategory, ThemeEntry[]> = {
    party: [],
    birthday: [],
    classroom: [],
    content: [],
    seasonal: [],
    custom: [
      { id: 'c-1', title: 'Futuristic Sci-Fi City', category: 'custom', promptIdea: 'Neon towers with skyways and flying transports.' },
      { id: 'c-2', title: 'Ancient Forest Shrine', category: 'custom', promptIdea: 'Mossy stone lanterns and glowing spirit wisps.' },
      { id: 'c-3', title: 'Cozy Winter Coffee Shop', category: 'custom', promptIdea: 'Snow outside, steamy mugs, and warm fairy lights.' }
    ],
    drawing: [],
    writing: [],
    gaming: [],
    photography: []
  };

  THEME_DATABASE.forEach((item) => {
    if (pools[item.category]) {
      pools[item.category].push(item);
    }
  });

  return pools;
}

export default function ThemeWheelEngine() {
  const [activeCategory, setActiveCategory] = useState<ThemeCategory>('party');
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
  const [favorites, setFavorites] = useState<ThemeEntry[]>([]);
  const [showFavoritesModal, setShowFavoritesModal] = useState<boolean>(false);

  useEffect(() => {
    try {
      const savedPools = localStorage.getItem('theme_wheel_category_pools_v3');
      if (savedPools) {
        const parsed = JSON.parse(savedPools);
        if (parsed && typeof parsed === 'object') {
          setCategoryPools((prev) => ({ ...prev, ...parsed }));
        }
      }
      const savedFavs = localStorage.getItem('theme_wheel_favorites');
      if (savedFavs) {
        const parsedFavs = JSON.parse(savedFavs);
        if (Array.isArray(parsedFavs)) {
          setFavorites(parsedFavs);
        }
      }
    } catch {
      // ignore
    }
  }, []);

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
      localStorage.setItem('theme_wheel_category_pools_v3', JSON.stringify(newPools));
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
      category: 'Party & Creativity',
      description: 'Spin a random theme wheel for party themes, birthday celebrations, classroom routines, content creators, and seasonal festivals.',
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
    const radius = Math.min(centerX, centerY) - 12;

    ctx.clearRect(0, 0, width, height);

    if (activeThemes.length === 0) {
      // Empty wheel placeholder
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#f1f5f9';
      ctx.fill();
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = 'bold 15px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('No active themes left!', centerX, centerY);
      ctx.restore();
      return;
    }

    const numSlices = activeThemes.length;
    const sliceAngle = (2 * Math.PI) / numSlices;

    // Draw Outer Shadow & Rim
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(15, 23, 42, 0.08)';
    ctx.fill();
    ctx.restore();

    // Draw Slices
    activeThemes.forEach((theme, i) => {
      const startAngle = currentAngleRef.current + i * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      const color = THEME_PALETTE[i % THEME_PALETTE.length];
      ctx.fillStyle = color;
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Text inside slice
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px system-ui, -apple-system, sans-serif';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowBlur = 3;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;

      let text = theme.title;
      if (text.length > 20) {
        text = text.substring(0, 18) + '…';
      }

      ctx.fillText(text, radius - 20, 4);
      ctx.restore();

      ctx.restore();
    });

    // Outer Border Ring
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.restore();

    // Center Hub
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, 34, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 3;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(centerX, centerY, 28, 0, 2 * Math.PI);
    ctx.fillStyle = '#8b5cf6';
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SPIN', centerX, centerY);
    ctx.restore();
  }, [activeThemes]);

  useEffect(() => {
    drawWheel();
  }, [drawWheel]);

  // Spin Wheel Physics
  const handleSpin = () => {
    if (isSpinning || activeThemes.length === 0) return;

    if (soundEnabled) {
      unlockAudioContext();
      playClickSound();
    }

    setIsSpinning(true);
    setSelectedTheme(null);

    const winningIndex = getRandomIndex(activeThemes.length);
    const numSlices = activeThemes.length;
    const sliceAngle = (2 * Math.PI) / numSlices;

    const extraRounds = 5 + Math.floor(Math.random() * 3);
    const topPointerOffset = -Math.PI / 2;

    const currentNormalized = currentAngleRef.current % (2 * Math.PI);
    const sliceCenterAngle = winningIndex * sliceAngle + sliceAngle / 2;
    const targetAngle =
      topPointerOffset - sliceCenterAngle + extraRounds * 2 * Math.PI;

    const startAngle = currentNormalized;
    const deltaAngle = targetAngle - startAngle;

    const duration = 4000;
    const startTime = performance.now();
    let lastSoundSlice = -1;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const newAngle = startAngle + deltaAngle * ease;
      currentAngleRef.current = newAngle;

      const currentSlice = Math.floor(
        ((newAngle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI)) / sliceAngle
      );
      if (currentSlice !== lastSoundSlice) {
        lastSoundSlice = currentSlice;
        if (soundEnabled) playTickSound();
        setNeedleAngle(18);
        setTimeout(() => setNeedleAngle(0), 60);
      }

      drawWheel();

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        const winner = activeThemes[winningIndex];
        setSelectedTheme(winner);

        if (soundEnabled) playWinnerFanfare();
        confetti();

        if (isNoRepeat && winner) {
          setEliminatedIds((prev) => [...prev, winner.id]);
        }
      }
    };

    requestAnimationFrame(animate);
  };

  // Add Custom Item to Current Category
  const handleAddPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: ThemeEntry = {
      id: `custom-${Date.now()}`,
      title: newTitle.trim(),
      category: activeCategory,
      promptIdea: newIdea.trim() || undefined
    };

    const updated = [newItem, ...(categoryPools[activeCategory] || [])];
    updateCategoryPools({
      ...categoryPools,
      [activeCategory]: updated
    });

    setNewTitle('');
    setNewIdea('');
    if (soundEnabled) playClickSound();
    setToastMsg(`Added "${newItem.title}" to ${activeCategory}!`);
    setTimeout(() => setToastMsg(null), 2000);
  };

  // Remove Item from Current Category
  const handleRemoveTheme = (id: string) => {
    const updated = (categoryPools[activeCategory] || []).filter((t) => t.id !== id);
    updateCategoryPools({
      ...categoryPools,
      [activeCategory]: updated
    });
    setEliminatedIds((prev) => prev.filter((elimId) => elimId !== id));
  };

  // Start Edit
  const handleStartEdit = (item: ThemeEntry) => {
    setEditingItem(item);
    setEditTitle(item.title);
    setEditIdea(item.promptIdea || '');
  };

  // Save Edit
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editTitle.trim()) return;

    const updated = (categoryPools[activeCategory] || []).map((t) =>
      t.id === editingItem.id
        ? { ...t, title: editTitle.trim(), promptIdea: editIdea.trim() || undefined }
        : t
    );

    updateCategoryPools({
      ...categoryPools,
      [activeCategory]: updated
    });

    setEditingItem(null);
    setToastMsg('Theme prompt updated!');
    setTimeout(() => setToastMsg(null), 1800);
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
  const CategoryIconComp = CATEGORY_ICONS[activeCategory] || PartyPopper;

  return (
    <div
      ref={containerRef}
      className={`bg-white dark:bg-[#181922] text-[#1a1b22] dark:text-white rounded-2xl border border-[#eeedf7] dark:border-[#292a39] p-3 sm:p-5 shadow-sm transition-colors relative ${
        isFullscreen ? 'fixed inset-0 z-50 p-6 overflow-y-auto min-h-screen rounded-none' : ''
      }`}
    >
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-slate-900/95 text-white text-xs font-bold shadow-2xl backdrop-blur-md flex items-center gap-2 border border-slate-700/50 animate-in fade-in slide-in-from-top-2 duration-200">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Control & Toolbar Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-xs sm:text-sm">Spin Wheel Themes</h2>
              <button
                type="button"
                onClick={handleFavoriteGame}
                aria-label={isGameFavorited ? 'Remove game from profile favorites' : 'Save game to profile favorites'}
                title={isGameFavorited ? 'Saved in Profile Favorites' : 'Save Game to Profile Favorites'}
                className={`p-1 rounded-full transition-all cursor-pointer ${
                  isGameFavorited
                    ? 'bg-rose-500/10 text-rose-500 scale-105'
                    : 'bg-slate-200/80 dark:bg-slate-800 text-slate-400 hover:text-rose-500'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isGameFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {activeThemes.length} prompts in active {currentCategoryObj.label} pool
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {/* No Repeat Deck Toggle */}
          <button
            onClick={() => setIsNoRepeat(!isNoRepeat)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              isNoRepeat
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
            }`}
          >
            <Sliders className="w-3 h-3" />
            <span>No-Repeat Deck</span>
          </button>

          {isNoRepeat && eliminatedIds.length > 0 && (
            <button
              onClick={() => setEliminatedIds([])}
              className="px-2 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold transition-colors cursor-pointer"
            >
              Reset ({eliminatedIds.length})
            </button>
          )}

          {/* Saved Favorites Button */}
          <button
            onClick={() => setShowFavoritesModal(true)}
            className="px-2.5 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Favs ({favorites.length})</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 rounded-lg bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 transition-colors cursor-pointer"
            title={soundEnabled ? 'Mute audio' : 'Enable audio'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
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
            className="p-1.5 rounded-lg bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 transition-colors cursor-pointer"
            title="Toggle fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Category Pills Navigation (User clarified: Category pills above wheel with instant presets) */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {THEME_CATEGORIES.map((cat) => {
            const IconComp = CATEGORY_ICONS[cat.id] || PartyPopper;
            const isActive = activeCategory === cat.id;
            const count = (categoryPools[cat.id] || []).length;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSelectedTheme(null);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 border ${
                  isActive
                    ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                    : 'bg-white dark:bg-[#12131a] text-slate-700 dark:text-slate-300 border-[#eeedf7] dark:border-[#292a39] hover:border-purple-300'
                }`}
              >
                <IconComp className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 dark:bg-[#1f202c] text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Instant Presets Quick-Launcher Bar for Active Category */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] text-slate-500 dark:text-slate-400">
          <span className="font-bold flex items-center gap-1 shrink-0 text-purple-600 dark:text-purple-400">
            <Flame className="w-3 h-3" />
            <span>Instant Presets:</span>
          </span>
          {currentCategoryList.slice(0, 5).map((theme) => (
            <button
              key={theme.id}
              onClick={() => {
                setSelectedTheme(theme);
                if (soundEnabled) playClickSound();
              }}
              className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-purple-50 dark:bg-[#12131a] dark:hover:bg-purple-950/40 text-slate-700 hover:text-purple-600 dark:text-slate-300 dark:hover:text-purple-300 border border-slate-200 dark:border-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {theme.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Wheel Canvas & Result Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start mb-4">
        {/* Canvas & Pointer */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
          <div className="relative w-full max-w-[min(90vw,340px)] sm:max-w-[380px] aspect-square flex items-center justify-center p-2 touch-manipulation">
            {/* Pointer / Needle */}
            <div
              className="absolute top-1 z-30 transition-transform duration-75 origin-bottom"
              style={{ transform: `rotate(${needleAngle}deg)` }}
            >
              <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[24px] border-t-amber-400 drop-shadow-md" />
            </div>

            <canvas
              ref={wheelCanvasRef}
              width={480}
              height={480}
              className="w-full h-full cursor-pointer rounded-full shadow-lg transition-transform active:scale-[0.99] touch-manipulation"
              onClick={handleSpin}
            />
          </div>

          {/* Spin Trigger Button */}
          <button
            onClick={handleSpin}
            disabled={isSpinning || activeThemes.length === 0}
            className="mt-3 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm shadow-md hover:shadow-lg active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2 cursor-pointer"
          >
            <RotateCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>{isSpinning ? 'SPINNING THEME...' : 'SPIN WHEEL THEMES'}</span>
          </button>
        </div>

        {/* Selected Result Card & Custom Category Manager */}
        <div className="lg:col-span-6 space-y-3">
          {/* Winner Card */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] shadow-sm min-h-[160px] flex flex-col justify-center">
            {selectedTheme ? (
              <div className="space-y-3 animate-in fade-in duration-300">
                <div className="p-3.5 rounded-xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#292a39] shadow-xs relative pr-10">
                  <button
                    onClick={() => toggleFavorite(selectedTheme)}
                    title={isCurrentFavorite ? 'Remove from profile favorites' : 'Save to profile favorites'}
                    aria-label={isCurrentFavorite ? 'Remove from profile favorites' : 'Save to profile favorites'}
                    className="absolute top-2.5 right-2.5 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-all group cursor-pointer"
                  >
                    <Heart
                      className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                        isCurrentFavorite
                          ? 'fill-rose-500 text-rose-500'
                          : 'text-slate-400 dark:text-slate-500 hover:text-rose-500'
                      }`}
                    />
                  </button>

                  <div className="inline-block px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-black uppercase tracking-wider mb-1.5">
                    {selectedTheme.category} theme
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-[#1a1b22] dark:text-white leading-snug">
                    {selectedTheme.title}
                  </h3>

                  {selectedTheme.promptIdea && (
                    <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic">
                      &ldquo;{selectedTheme.promptIdea}&rdquo;
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(`${selectedTheme.title} - ${selectedTheme.promptIdea || ''}`)}
                    className="flex-1 py-2 px-3 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied Theme!' : 'Copy Theme & Idea'}</span>
                  </button>

                  <button
                    onClick={() => toggleFavorite(selectedTheme)}
                    title={isCurrentFavorite ? 'Remove from profile favorites' : 'Save to profile favorites'}
                    aria-label={isCurrentFavorite ? 'Remove from profile favorites' : 'Save to profile favorites'}
                    className={`p-2 rounded-lg transition-all cursor-pointer ${
                      isCurrentFavorite
                        ? 'bg-rose-500/10 text-rose-500 hover:bg-rose-500/20'
                        : 'bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-400 hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isCurrentFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 space-y-1.5">
                <Zap className="w-6 h-6 text-purple-500 mx-auto opacity-70 animate-bounce" />
                <h4 className="font-bold text-sm text-[#1a1b22] dark:text-white">Ready to Draw a Theme?</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                  Click the center wheel or tap SPIN WHEEL THEMES to generate a prompt.
                </p>
              </div>
            )}
          </div>

          {/* Category List & Custom Editor Manager for Selected Category */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  <CategoryIconComp className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-[#1a1b22] dark:text-white">
                    {currentCategoryObj.label} List ({currentCategoryList.length})
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    Add, edit, or customize prompts for this wheel
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setShowBulkModal(true)}
                  className="px-2 py-1 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <ListPlus className="w-3 h-3" />
                  <span>Bulk Paste</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetCategory}
                  title="Reset category to default themes"
                  className="p-1.5 rounded-lg bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Quick Add Form */}
            <form onSubmit={handleAddPrompt} className="space-y-1.5 pt-2 border-t border-[#eeedf7] dark:border-[#292a39]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                <input
                  type="text"
                  placeholder={`New ${currentCategoryObj.label} title...`}
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#181922] text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
                <input
                  type="text"
                  placeholder="Optional prompt idea..."
                  value={newIdea}
                  onChange={(e) => setNewIdea(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#181922] text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
              <button
                type="submit"
                disabled={!newTitle.trim()}
                className="w-full py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors disabled:opacity-50 flex items-center justify-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Theme Prompt</span>
              </button>
            </form>

            {/* Category Prompts List */}
            <div className="max-h-44 overflow-y-auto space-y-1.5 pt-1.5 border-t border-[#eeedf7] dark:border-[#292a39] pr-1">
              {currentCategoryList.length > 0 ? (
                currentCategoryList.map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#292a39] text-xs group hover:border-purple-300 transition-colors"
                  >
                    <div className="truncate pr-2">
                      <span className="font-bold text-[#1a1b22] dark:text-white">{t.title}</span>
                      {t.promptIdea && <span className="text-slate-500 text-[10px] block truncate">{t.promptIdea}</span>}
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleStartEdit(t)}
                        title="Edit prompt"
                        className="p-1 rounded text-slate-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/40 cursor-pointer"
                      >
                        <Pencil className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveTheme(t.id)}
                        title="Delete prompt"
                        className="p-1 rounded text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-xs text-slate-400 py-3">No prompts yet in this category.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#292a39] rounded-2xl p-5 max-w-md w-full space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm">Edit Theme Prompt</h3>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="space-y-2.5">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Theme title"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
              <textarea
                value={editIdea}
                onChange={(e) => setEditIdea(e.target.value)}
                placeholder="Theme idea or scenario prompt"
                rows={3}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl text-xs font-bold bg-purple-600 text-white hover:bg-purple-500 cursor-pointer"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Import Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#292a39] rounded-2xl p-5 max-w-lg w-full space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm">Bulk Import Themes</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Paste 1 theme per line. Format: <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-[10px]">Title | Optional prompt idea</code>
                </p>
              </div>
              <button
                onClick={() => setShowBulkModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <textarea
              value={bulkInput}
              onChange={(e) => setBulkInput(e.target.value)}
              placeholder={`Summer Solstice Luau | Hawaiian shirts and pineapple mocktails\nRetro Disco Night | 80s dance hits and neon headbands`}
              rows={6}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-mono focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowBulkModal(false)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBulkAdd}
                disabled={!bulkInput.trim()}
                className="px-4 py-1.5 rounded-xl text-xs font-bold bg-purple-600 text-white hover:bg-purple-500 disabled:opacity-50 cursor-pointer"
              >
                Import Themes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Favorites Modal */}
      {showFavoritesModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#292a39] rounded-2xl p-5 max-w-md w-full space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                <h3 className="font-bold text-sm">Saved Favorite Themes ({favorites.length})</h3>
              </div>
              <button
                onClick={() => setShowFavoritesModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
              {favorites.length > 0 ? (
                favorites.map((fav) => (
                  <div
                    key={fav.id}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] flex items-center justify-between gap-2"
                  >
                    <div>
                      <div className="font-bold text-xs text-[#1a1b22] dark:text-white">{fav.title}</div>
                      {fav.promptIdea && (
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 italic line-clamp-1">
                          {fav.promptIdea}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => {
                          setSelectedTheme(fav);
                          setShowFavoritesModal(false);
                        }}
                        className="p-1 rounded text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/40 text-xs font-bold cursor-pointer"
                        title="Load onto wheel"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => toggleFavorite(fav)}
                        className="p-1 rounded text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                        title="Remove from favorites"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-xs text-slate-400 py-6">No saved favorite themes yet.</p>
              )}
            </div>

            {favorites.length > 0 && (
              <div className="pt-2 border-t border-[#eeedf7] dark:border-[#292a39] flex justify-end">
                <button
                  type="button"
                  onClick={clearAllFavorites}
                  className="px-3 py-1 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                >
                  Clear All Favorites
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
