'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import confetti from '@/lib/confetti';
import {
  Utensils,
  RotateCw,
  Sparkles,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Trash2,
  Plus,
  Copy,
  Check,
  MapPin,
  Flame,
  Salad,
  Shuffle,
  RefreshCw,
  ListPlus,
  SlidersHorizontal,
  Info,
  X,
  ExternalLink,
  Heart,
  Share2,
  Upload,
  Layers,
  ChefHat
} from 'lucide-react';
import {
  FOOD_DATABASE,
  FOOD_PRESETS,
  MEAL_TYPE_OPTIONS,
  CUISINE_OPTIONS
} from '@/lib/food/foodDatabase';
import {
  FoodItem,
  MealType,
  CuisineType,
  FoodPresetId,
  CustomFoodEntry
} from '@/lib/food/types';
import {
  playTickSound,
  playWinnerFanfare,
  playClickSound,
  unlockAudioContext,
  announceWinnerTTS
} from '@/lib/sound';
import { useSavedWheels, toggleWheelFavorite } from '@/lib/storage';

// Hardware-grade CSPRNG for 100% fair uniform probability
function getRandomIndex(length: number): number {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0] % length;
  }
  return Math.floor(Math.random() * length);
}

// Wheel Slice Color Palette
const FOOD_PALETTE = [
  '#f97316', // Orange
  '#ef4444', // Red
  '#10b981', // Emerald
  '#eab308', // Amber
  '#06b6d4', // Cyan
  '#8b5cf6', // Violet
  '#ec4899', // Pink
  '#3b82f6', // Blue
  '#14b8a6', // Teal
  '#84cc16'  // Lime
];

interface FoodWheelEngineProps {
  initialPreset?: FoodPresetId;
}

export default function FoodWheelEngine({ initialPreset = 'dinner' }: FoodWheelEngineProps) {
  // Profile Favorites Hook
  const savedWheels = useSavedWheels();
  const isGameFavorited = savedWheels.some(
    (w) => w.id === 'food-wheel' || w.title.trim().toLowerCase() === 'food spin the wheel'
  );
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleFavoriteGame = () => {
    const isNowSaved = toggleWheelFavorite({
      id: 'food-wheel',
      title: 'Food Spin the Wheel',
      category: 'Food & Meals',
      description: 'Spin for meal decisions, dinner roulette, cuisine pickers, and food ideas.',
      items: FOOD_DATABASE.slice(0, 12).map((f, idx) => ({
        id: f.id || `f-${idx}`,
        text: `${f.emoji} ${f.name}`,
        weight: 1
      })),
      paletteKey: 'amber'
    });
    showToast(isNowSaved ? '❤️ Saved Food Wheel to Profile Favorites!' : 'Removed Food Wheel from Favorites');
  };

  // Active Mode: 'wheel' (curated database) vs 'custom' (user custom list)
  const [activeTab, setActiveTab] = useState<'wheel' | 'custom'>('wheel');
  const [activePreset, setActivePreset] = useState<FoodPresetId>(initialPreset);

  // Stackable Filters State
  const [mealType, setMealType] = useState<MealType | 'all'>('dinner');
  const [cuisine, setCuisine] = useState<CuisineType>('all');
  const [vegetarianOnly, setVegetarianOnly] = useState<boolean>(false);
  const [fastFoodOnly, setFastFoodOnly] = useState<boolean>(false);
  const [healthyOnly, setHealthyOnly] = useState<boolean>(false);
  const [shuffleSeed, setShuffleSeed] = useState<number>(0);

  // Elimination / No-Repeat State
  const [noRepeat, setNoRepeat] = useState<boolean>(false);
  const [eliminatedIds, setEliminatedIds] = useState<string[]>([]);
  const [spinHistory, setSpinHistory] = useState<{ id: string; name: string; emoji: string; time: string }[]>([]);

  // Wheel State
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [winnerFood, setWinnerFood] = useState<
    FoodItem | { id?: string; name: string; emoji: string; description: string; popularPairing?: string; estimatedPrepTime?: string } | null
  >(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [spinCount, setSpinCount] = useState<number>(0);
  const [needleAngle, setNeedleAngle] = useState<number>(0);

  // Custom Food List State
  const [customList, setCustomList] = useState<CustomFoodEntry[]>([
    { id: 'c-1', name: 'Artisan Wood-Fired Pizza', weight: 1 },
    { id: 'c-2', name: 'Spicy Thai Green Curry', weight: 1 },
    { id: 'c-3', name: 'Smash Double Cheeseburger', weight: 1 },
    { id: 'c-4', name: 'Authentic Street Tacos', weight: 1 },
    { id: 'c-5', name: 'Paneer Butter Masala', weight: 1 },
    { id: 'c-6', name: 'Fresh Salmon Poke Bowl', weight: 1 },
    { id: 'c-7', name: 'Rich Pork Tonkotsu Ramen', weight: 1 },
    { id: 'c-8', name: 'Mediterranean Falafel Mezze', weight: 1 }
  ]);
  const [newCustomName, setNewCustomName] = useState<string>('');
  const [bulkTextInput, setBulkTextInput] = useState<string>('');
  const [showBulkModal, setShowBulkModal] = useState<boolean>(false);

  // Canvas & Animation refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const currentAngleRef = useRef<number>(0);
  const [fullscreenTheater, setFullscreenTheater] = useState<boolean>(false);
  const [showWinnerModal, setShowWinnerModal] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Preset Applicator
  const applyPreset = useCallback(
    (presetId: FoodPresetId) => {
      setActivePreset(presetId);
      if (presetId === 'custom') {
        setActiveTab('custom');
        return;
      }
      setActiveTab('wheel');

      const preset = FOOD_PRESETS.find((p) => p.id === presetId);
      if (!preset || !preset.filterState) return;

      const f = preset.filterState;
      setMealType(f.mealType ?? 'all');
      setCuisine(f.cuisine ?? 'all');
      setVegetarianOnly(Boolean(f.isVegetarianOnly));
      setFastFoodOnly(Boolean(f.isFastFoodOnly));
      setHealthyOnly(Boolean(f.isHealthyOnly));
      setShuffleSeed((prev) => prev + 1);
    },
    []
  );

  // Listen for external preset trigger events (from editorial content buttons)
  useEffect(() => {
    const handleLaunchPreset = (e: CustomEvent<{ presetId: FoodPresetId }>) => {
      if (e.detail?.presetId) {
        applyPreset(e.detail.presetId);
        containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };
    window.addEventListener('launch-food-preset' as any, handleLaunchPreset as any);
    return () => {
      window.removeEventListener('launch-food-preset' as any, handleLaunchPreset as any);
    };
  }, [applyPreset]);

  // Synchronize browser fullscreen changes (e.g. user hits ESC)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Filter eligible foods from database (with full stackable multi-filter support!)
  const eligibleDatabaseFoods = useMemo(() => {
    const filtered = FOOD_DATABASE.filter((item) => {
      // Check meal type filter
      if (mealType !== 'all' && !item.mealTypes.includes(mealType)) {
        return false;
      }
      // Check cuisine filter
      if (cuisine !== 'all' && item.cuisine !== cuisine) {
        return false;
      }
      // Check vegetarian stackable flag
      if (vegetarianOnly && !item.isVegetarian) {
        return false;
      }
      // Check fast food stackable flag
      if (fastFoodOnly && !item.isFastFood) {
        return false;
      }
      // Check healthy stackable flag
      if (healthyOnly && !item.isHealthy) {
        return false;
      }
      // Check eliminated items (No Repeat)
      if (noRepeat && eliminatedIds.includes(item.id)) {
        return false;
      }
      return true;
    });

    // If shuffleSeed > 0, deterministic reordering for fresh variety
    if (shuffleSeed > 0 && filtered.length > 12) {
      return [...filtered].sort((a, b) => {
        const hashA = (a.name.length * 37 + shuffleSeed * 13) % 100;
        const hashB = (b.name.length * 37 + shuffleSeed * 13) % 100;
        return hashA - hashB;
      });
    }

    return filtered;
  }, [mealType, cuisine, vegetarianOnly, fastFoodOnly, healthyOnly, noRepeat, eliminatedIds, shuffleSeed]);

  // Active slices on the wheel (max 12 for clean visual presentation)
  const currentWheelItems = useMemo(() => {
    if (activeTab === 'custom') {
      const activeCustom = noRepeat
        ? customList.filter((it) => !eliminatedIds.includes(it.id))
        : customList;
      return activeCustom.map((entry) => ({
        id: entry.id,
        name: entry.name,
        emoji: '🍽️',
        description: 'Custom entry from your personal food list'
      }));
    }

    // From database: take top 12 from eligible pool
    return eligibleDatabaseFoods.slice(0, 12);
  }, [activeTab, customList, eligibleDatabaseFoods, noRepeat, eliminatedIds]);

  // Draw Wheel on HTML5 Canvas
  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width; // 600
    const center = size / 2;
    const radius = center - 20;

    ctx.clearRect(0, 0, size, size);

    const items = currentWheelItems;
    if (items.length === 0) {
      // Empty state wheel
      ctx.save();
      ctx.translate(center, center);
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#222332';
      ctx.fill();
      ctx.strokeStyle = '#4e4e66';
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.fillStyle = '#a0a0b8';
      ctx.font = 'bold 20px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('No foods match filters', 0, -12);
      ctx.font = '15px system-ui, sans-serif';
      ctx.fillText('Reset filters or add custom entries', 0, 16);
      ctx.restore();
      return;
    }

    const arc = (2 * Math.PI) / items.length;

    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(currentAngleRef.current);

    // Draw Slices
    items.forEach((item, i) => {
      const angle = i * arc;
      ctx.beginPath();
      ctx.fillStyle = FOOD_PALETTE[i % FOOD_PALETTE.length];
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, angle, angle + arc);
      ctx.closePath();
      ctx.fill();

      // Slice border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Text and emoji inside slice
      ctx.save();
      ctx.rotate(angle + arc / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
      ctx.shadowBlur = 4;

      const fontSize = items.length > 10 ? 16 : items.length > 6 ? 19 : 22;
      ctx.font = `bold ${fontSize}px system-ui, -apple-system, sans-serif`;

      // Truncate label to fit neatly
      const maxLength = items.length > 10 ? 18 : 24;
      const labelText = item.name.length > maxLength ? `${item.name.slice(0, maxLength - 1)}…` : item.name;

      const emojiPrefix = 'emoji' in item ? `${item.emoji} ` : '';
      ctx.fillText(`${emojiPrefix}${labelText}`, radius - 26, fontSize / 3);

      ctx.restore();
    });

    // Outer wheel ring
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 6;
    ctx.stroke();

    // Center Hub
    ctx.restore(); // Undo rotation

    // Outer center shadow ring
    ctx.beginPath();
    ctx.arc(center, center, 50, 0, 2 * Math.PI);
    ctx.fillStyle = '#1e293b';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4.5;
    ctx.stroke();

    // Inner center hub
    ctx.beginPath();
    ctx.arc(center, center, 38, 0, 2 * Math.PI);
    ctx.fillStyle = '#f97316';
    ctx.fill();

    // Center icon/text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SPIN', center, center);
  }, [currentWheelItems]);

  // Redraw when items change
  useEffect(() => {
    drawWheel();
  }, [drawWheel]);

  // Main Spinning Physics Engine
  const spinWheel = useCallback(() => {
    if (isSpinning || currentWheelItems.length === 0) return;

    unlockAudioContext();
    playClickSound(soundEnabled, 0.7);
    setIsSpinning(true);
    setShowWinnerModal(false);

    // Pick winning slice uniformly at random using CSPRNG
    const itemsCount = currentWheelItems.length;
    const winningSliceIndex = getRandomIndex(itemsCount);
    const sliceAngle = (2 * Math.PI) / itemsCount;

    // Angle configuration so pointer at 12 o'clock (3*PI/2) lands on winning slice
    const pointerOffset = 1.5 * Math.PI;
    const targetSliceCenter = winningSliceIndex * sliceAngle + sliceAngle / 2;
    const targetBaseAngle = pointerOffset - targetSliceCenter;

    // 5 to 8 full revolutions for realistic suspense
    const extraRotations = (5 + Math.floor(Math.random() * 3)) * 2 * Math.PI;

    // Small jitter within slice so it doesn't land at exact center every time
    const jitter = (Math.random() - 0.5) * (sliceAngle * 0.6);

    const startAngle = currentAngleRef.current % (2 * Math.PI);
    const totalTargetAngle = startAngle + extraRotations + (targetBaseAngle - startAngle) + jitter;

    const duration = 4400; // 4.4 seconds
    const startTime = performance.now();
    let lastSliceIndex = -1;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth cubic-bezier easeOut deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3.5);
      const currentAngle = startAngle + (totalTargetAngle - startAngle) * easeOut;
      currentAngleRef.current = currentAngle;

      // Track slice boundary ticks for pointer clatter
      const normalizedAngle = ((pointerOffset - (currentAngle % (2 * Math.PI))) + 2 * Math.PI) % (2 * Math.PI);
      const currentSlice = Math.floor(normalizedAngle / sliceAngle) % itemsCount;

      if (currentSlice !== lastSliceIndex) {
        lastSliceIndex = currentSlice;
        setNeedleAngle(18); // Deflect pointer
        setTimeout(() => setNeedleAngle(0), 40);
        if (soundEnabled && progress < 0.95) {
          playTickSound(soundEnabled, 0.4);
        }
      }

      drawWheel();

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Spin finished
        setIsSpinning(false);
        setSpinCount((prev) => prev + 1);

        const winner = currentWheelItems[winningSliceIndex];
        setWinnerFood(winner);
        setShowWinnerModal(true);

        const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setSpinHistory((prev) => [
          {
            id: 'id' in winner && winner.id ? winner.id : `w-${Date.now()}`,
            name: winner.name,
            emoji: 'emoji' in winner ? winner.emoji : '🍽️',
            time: timeString
          },
          ...prev.slice(0, 9)
        ]);

        if (soundEnabled) {
          playWinnerFanfare(soundEnabled, 'carnival', 0.8);
          announceWinnerTTS(winner.name, { enabled: true, prefix: 'Your food pick is' });
        }

        try {
          confetti({
            particleCount: 75,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore
        }
      }
    };

    requestAnimationFrame(animate);
  }, [isSpinning, currentWheelItems, soundEnabled, drawWheel]);

  // Instant Pick without wait
  const handleInstantPick = useCallback(() => {
    if (currentWheelItems.length === 0) return;
    unlockAudioContext();
    const winnerIndex = getRandomIndex(currentWheelItems.length);
    const winner = currentWheelItems[winnerIndex];
    setWinnerFood(winner);
    setShowWinnerModal(true);
    setSpinCount((prev) => prev + 1);

    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setSpinHistory((prev) => [
      {
        id: 'id' in winner && winner.id ? winner.id : `w-${Date.now()}`,
        name: winner.name,
        emoji: 'emoji' in winner ? winner.emoji : '🍽️',
        time: timeString
      },
      ...prev.slice(0, 9)
    ]);

    if (soundEnabled) {
      playWinnerFanfare(soundEnabled, 'carnival', 0.8);
      announceWinnerTTS(winner.name, { enabled: true, prefix: 'Your instant food pick is' });
    }
    try {
      confetti({ particleCount: 50, spread: 60 });
    } catch {
      // ignore
    }
  }, [currentWheelItems, soundEnabled]);

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    unlockAudioContext();
    playClickSound(soundEnabled, 0.7);
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, [soundEnabled]);

  // Keyboard shortcut: Spacebar to spin, F for fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        spinWheel();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [spinWheel, toggleFullscreen]);

  // Custom List Operations
  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    unlockAudioContext();
    if (!newCustomName.trim()) return;
    const newItem: CustomFoodEntry = {
      id: `custom-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: newCustomName.trim(),
      weight: 1
    };
    setCustomList((prev) => [...prev, newItem]);
    setNewCustomName('');
    playClickSound(soundEnabled, 0.7);
  };

  const handleRemoveCustom = (id: string) => {
    unlockAudioContext();
    setCustomList((prev) => prev.filter((it) => it.id !== id));
    playClickSound(soundEnabled, 0.7);
  };

  const handleRemoveDuplicates = () => {
    unlockAudioContext();
    const seen = new Set<string>();
    const unique = customList.filter((item) => {
      const lower = item.name.trim().toLowerCase();
      if (seen.has(lower)) return false;
      seen.add(lower);
      return true;
    });
    setCustomList(unique);
    showToast(`Removed duplicates. ${unique.length} unique items remaining.`);
    playClickSound(soundEnabled, 0.7);
  };

  const handleBulkImport = () => {
    unlockAudioContext();
    const lines = bulkTextInput
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);
    if (lines.length === 0) return;
    const newItems: CustomFoodEntry[] = lines.map((line, idx) => ({
      id: `bulk-${Date.now()}-${idx}`,
      name: line,
      weight: 1
    }));
    setCustomList(newItems);
    setBulkTextInput('');
    setShowBulkModal(false);
    showToast(`Loaded ${newItems.length} custom food choices!`);
    playClickSound(soundEnabled, 0.7);
  };

  // CSV/TXT File Import
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (!content) return;

      const lines = content
        .split(/[\r\n,]+/)
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter((s) => s.length > 0);

      if (lines.length > 0) {
        const loaded: CustomFoodEntry[] = lines.map((name, idx) => ({
          id: `file-${Date.now()}-${idx}`,
          name,
          weight: 1
        }));
        setCustomList(loaded);
        showToast(`Imported ${loaded.length} foods from ${file.name}!`);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Elimination Reset
  const handleResetEliminations = () => {
    unlockAudioContext();
    setEliminatedIds([]);
    showToast('Restored all eliminated foods back to wheel!');
    playClickSound(soundEnabled, 0.7);
  };

  // Shuffle Pool
  const handleShufflePool = () => {
    unlockAudioContext();
    setShuffleSeed((prev) => prev + 1);
    playClickSound(soundEnabled, 0.7);
  };

  // Reset Filters
  const handleResetFilters = () => {
    unlockAudioContext();
    setMealType('all');
    setCuisine('all');
    setVegetarianOnly(false);
    setFastFoodOnly(false);
    setHealthyOnly(false);
    setActivePreset('dinner');
    playClickSound(soundEnabled, 0.7);
    showToast('Reset all filters to defaults.');
  };

  // Copy result
  const handleCopyWinner = (text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`Tonight's Food Wheel Pick: ${text}! 🍽️`);
      setCopied(true);
      playClickSound(soundEnabled, 0.7);
      setTimeout(() => setCopied(false), 2000);
      showToast('Copied food pick to clipboard!');
    }
  };

  const toggleSound = () => {
    unlockAudioContext();
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    if (nextState) playClickSound(true, 0.8);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full transition-all ${
        isFullscreen
          ? 'fixed inset-0 z-50 overflow-y-auto bg-[#faf8fd] dark:bg-[#10111a] p-4 sm:p-6 lg:p-8 min-h-screen text-gray-900 dark:text-gray-100 flex flex-col'
          : 'rounded-3xl bg-white dark:bg-[#161722] border border-[#eeedf7] dark:border-[#272838] shadow-xl p-5 sm:p-7 lg:p-8'
      }`}
    >
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <span>{toastMsg}</span>
        </div>
      )}

      <div className="w-full max-w-7xl mx-auto flex flex-col flex-1">
        {/* Top Header / Mode Switcher */}
        <div className="w-full flex flex-wrap items-center justify-between gap-3 border-b border-[#eeedf7] dark:border-[#272838] pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                Food Spin the Wheel
                <button
                  type="button"
                  onClick={handleFavoriteGame}
                  aria-label={isGameFavorited ? 'Remove wheel from profile favorites' : 'Save wheel to profile favorites'}
                  title={isGameFavorited ? 'Saved in Profile Favorites' : 'Save Wheel to Profile Favorites'}
                  className={`p-1 rounded-full transition-all cursor-pointer ${
                    isGameFavorited
                      ? 'bg-rose-500/10 text-rose-500 scale-105'
                      : 'bg-slate-200/80 dark:bg-slate-800 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isGameFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  CSPRNG Fair
                </span>
                {isFullscreen && (
                  <span className="hidden sm:inline-flex text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                    Fullscreen
                  </span>
                )}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Random food picker & meal decision engine
              </p>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-2">
            <div className="bg-gray-100 dark:bg-[#20212e] p-1 rounded-xl flex items-center gap-1 border border-gray-200/50 dark:border-gray-800">
              <button
                type="button"
                onClick={() => {
                  unlockAudioContext();
                  setActiveTab('wheel');
                  playClickSound(soundEnabled, 0.7);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'wheel'
                    ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Curated Meals
              </button>
              <button
                type="button"
                onClick={() => {
                  unlockAudioContext();
                  setActiveTab('custom');
                  setActivePreset('custom');
                  playClickSound(soundEnabled, 0.7);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'custom'
                    ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Custom List ({customList.length})
              </button>
            </div>

            <button
              type="button"
              onClick={toggleSound}
              className={`p-2 rounded-xl transition-all cursor-pointer border ${
                soundEnabled
                  ? 'bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-900/50'
                  : 'bg-gray-100 dark:bg-[#20212e] text-gray-400 border-transparent hover:bg-gray-200 dark:hover:bg-[#2a2b3c]'
              }`}
              title={soundEnabled ? 'Mute wheel audio' : 'Enable wheel audio'}
              aria-label={soundEnabled ? 'Mute audio' : 'Enable audio'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {isFullscreen && (
              <button
                type="button"
                onClick={() => setFullscreenTheater(!fullscreenTheater)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border flex items-center gap-1.5 ${
                  fullscreenTheater
                    ? 'bg-orange-600 text-white border-orange-700 shadow-sm'
                    : 'bg-gray-100 dark:bg-[#20212e] text-gray-700 dark:text-gray-300 border-gray-200/60 dark:border-gray-800 hover:bg-gray-200 dark:hover:bg-[#2a2b3c]'
                }`}
                title={fullscreenTheater ? 'Show sidebar cards' : 'Hide sidebar for giant theater wheel'}
              >
                <span>{fullscreenTheater ? 'Show Sidebar' : 'Theater'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={toggleFullscreen}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border flex items-center gap-1.5 ${
                isFullscreen
                  ? 'bg-orange-500 text-white border-orange-600 shadow-sm'
                  : 'bg-gray-100 dark:bg-[#20212e] text-gray-700 dark:text-gray-300 border-gray-200/60 dark:border-gray-800 hover:bg-gray-200 dark:hover:bg-[#2a2b3c]'
              }`}
              title={isFullscreen ? 'Exit Fullscreen (ESC)' : 'Open Fullscreen (F)'}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Exit</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Fullscreen</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 10 DEDICATED PRESET BUTTONS / FILTER PILLS ABOVE THE WHEEL */}
        <div className="w-full mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              Quick Meal Presets
            </span>
            <span className="text-[11px] text-gray-400">Click any preset to launch instant wheel configuration</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 sm:gap-2.5">
            {FOOD_PRESETS.map((preset) => {
              const isSelected = activePreset === preset.id && (preset.isCustom ? activeTab === 'custom' : activeTab === 'wheel');
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    unlockAudioContext();
                    applyPreset(preset.id);
                    playClickSound(soundEnabled, 0.7);
                  }}
                  className={`p-2.5 sm:p-3 rounded-2xl text-left transition-all cursor-pointer border flex flex-col items-center justify-center text-center gap-1.5 ${
                    isSelected
                      ? 'bg-orange-500 text-white border-orange-600 shadow-md shadow-orange-500/20 font-bold scale-[1.02]'
                      : 'bg-white dark:bg-[#1f2030] text-gray-800 dark:text-gray-200 border-gray-200/80 dark:border-gray-800 hover:border-orange-300 dark:hover:border-orange-500/40 hover:bg-orange-50/50 dark:hover:bg-[#25263a]'
                  }`}
                  title={preset.description}
                >
                  <span className="text-xl sm:text-2xl">{preset.emoji}</span>
                  <span className="text-xs font-semibold leading-tight line-clamp-1">
                    {preset.shortLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* STACKABLE FILTER CONTROLS BAR (When in Curated Food Mode) */}
        {activeTab === 'wheel' && (
          <div className="w-full space-y-3 mb-5 bg-[#f8f6fc] dark:bg-[#1a1b28] p-3.5 sm:p-4 rounded-xl border border-[#eceaf6] dark:border-[#27283c]">
            {/* Meal Types Pills */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 mr-1 flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Meal:
              </span>
              {MEAL_TYPE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    unlockAudioContext();
                    setMealType(opt.value);
                    playClickSound(soundEnabled, 0.7);
                  }}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    mealType === opt.value
                      ? 'bg-orange-500 text-white shadow-sm font-semibold'
                      : 'bg-white dark:bg-[#242536] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#2c2d40]'
                  }`}
                >
                  {opt.emoji} {opt.label}
                </button>
              ))}
            </div>

            {/* Cuisines & Stackable Dietary Filters */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2.5 border-t border-[#eeedf7] dark:border-[#252638]">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 text-xs text-gray-700 dark:text-gray-300">
                  <span className="font-semibold text-gray-500">Cuisine:</span>
                  <select
                    value={cuisine}
                    onChange={(e) => {
                      unlockAudioContext();
                      setCuisine(e.target.value as CuisineType);
                      playClickSound(soundEnabled, 0.7);
                    }}
                    aria-label="Filter meals by cuisine"
                    className="bg-white dark:bg-[#242536] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded-lg px-2.5 py-1 focus:ring-2 focus:ring-orange-500 cursor-pointer font-medium"
                  >
                    {CUISINE_OPTIONS.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* STACKABLE: Vegetarian Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    unlockAudioContext();
                    setVegetarianOnly(!vegetarianOnly);
                    playClickSound(soundEnabled, 0.7);
                  }}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    vegetarianOnly
                      ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-500/30'
                      : 'bg-white dark:bg-[#242536] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#2c2d40]'
                  }`}
                  title="Filter to 100% vegetarian / meat-free meals"
                >
                  <Salad className="w-3.5 h-3.5" />
                  <span>Vegetarian Only</span>
                </button>

                {/* STACKABLE: Fast Food Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    unlockAudioContext();
                    setFastFoodOnly(!fastFoodOnly);
                    playClickSound(soundEnabled, 0.7);
                  }}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    fastFoodOnly
                      ? 'bg-red-500 text-white shadow-sm ring-2 ring-red-500/30'
                      : 'bg-white dark:bg-[#242536] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#2c2d40]'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>Fast Food</span>
                </button>

                {/* STACKABLE: Healthy Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    unlockAudioContext();
                    setHealthyOnly(!healthyOnly);
                    playClickSound(soundEnabled, 0.7);
                  }}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    healthyOnly
                      ? 'bg-teal-600 text-white shadow-sm ring-2 ring-teal-500/30'
                      : 'bg-white dark:bg-[#242536] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#2c2d40]'
                  }`}
                >
                  <Salad className="w-3.5 h-3.5" />
                  <span>Healthy</span>
                </button>

                {/* STACKABLE: Elimination Mode (No Repeat) */}
                <button
                  type="button"
                  onClick={() => {
                    unlockAudioContext();
                    setNoRepeat(!noRepeat);
                    playClickSound(soundEnabled, 0.7);
                  }}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    noRepeat
                      ? 'bg-purple-600 text-white shadow-sm ring-2 ring-purple-500/30'
                      : 'bg-white dark:bg-[#242536] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#2c2d40]'
                  }`}
                  title="Remove winning food so it won't repeat on subsequent spins"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>No Repeat</span>
                </button>

                {eliminatedIds.length > 0 && (
                  <button
                    type="button"
                    onClick={handleResetEliminations}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 hover:bg-red-100 transition-colors cursor-pointer"
                    title="Restore all eliminated items"
                  >
                    <span>Reset ({eliminatedIds.length} removed)</span>
                  </button>
                )}
              </div>

              {/* Reset All Filters Button */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs text-gray-500 hover:text-orange-600 dark:hover:text-orange-400 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-[#242536] transition-colors cursor-pointer"
                  title="Reset all filters"
                >
                  Reset All
                </button>
                <button
                  type="button"
                  onClick={handleShufflePool}
                  className="flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400 font-medium px-2 py-1 rounded hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-colors cursor-pointer"
                  title="Shuffle food slices from database pool"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Re-roll Slices</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CUSTOM LIST EDITOR (When in Custom Mode) */}
        {activeTab === 'custom' && (
          <div className="w-full space-y-3 mb-5 bg-[#f8f6fc] dark:bg-[#1a1b28] p-3.5 sm:p-4 rounded-xl border border-[#eceaf6] dark:border-[#27283c]">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                Add Your Favorite Local Restaurants, Takeout Spots, or Home Dishes:
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRemoveDuplicates}
                  className="text-xs text-gray-600 dark:text-gray-400 hover:text-orange-600 flex items-center gap-1 cursor-pointer font-medium"
                  title="Remove duplicate names"
                >
                  Remove Duplicates
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs text-gray-600 dark:text-gray-400 hover:text-orange-600 flex items-center gap-1 cursor-pointer font-medium"
                  title="Import CSV or TXT list"
                >
                  <Upload className="w-3.5 h-3.5" /> Import CSV/TXT
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => {
                    unlockAudioContext();
                    setShowBulkModal(true);
                    playClickSound(soundEnabled, 0.7);
                  }}
                  className="text-xs text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1 cursor-pointer font-bold"
                >
                  <ListPlus className="w-3.5 h-3.5" /> Bulk Paste
                </button>
              </div>
            </div>

            {/* Input form */}
            <form onSubmit={handleAddCustom} className="flex gap-2">
              <input
                type="text"
                value={newCustomName}
                onChange={(e) => setNewCustomName(e.target.value)}
                placeholder="e.g. Tony's Pizza, Noodle Bar, Chicken Katsu, Joe's Tacos..."
                maxLength={45}
                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#242536] text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Food
              </button>
            </form>

            {/* Custom tags list */}
            <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto p-1">
              {customList.map((item) => (
                <span
                  key={item.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-white dark:bg-[#242536] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200"
                >
                  <span>{item.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCustom(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                    title="Remove food"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {customList.length === 0 && (
                <p className="text-xs text-gray-400 italic">No foods in custom list. Add some above or bulk paste!</p>
              )}
            </div>
          </div>
        )}

        {/* MAIN INTERACTIVE WHEEL VIEWPORT */}
        <div
          className={`grid grid-cols-1 ${
            isFullscreen && fullscreenTheater
              ? 'max-w-4xl mx-auto w-full'
              : isFullscreen
              ? 'xl:grid-cols-12 gap-6 xl:gap-8 items-center w-full max-w-7xl mx-auto'
              : 'lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center w-full my-auto'
          }`}
        >
          {/* WHEEL CANVAS COLUMN */}
          <div
            className={`${
              isFullscreen && fullscreenTheater
                ? 'col-span-1 p-6'
                : isFullscreen
                ? 'xl:col-span-8 lg:col-span-7'
                : 'lg:col-span-7 xl:col-span-7'
            } flex flex-col items-center justify-center relative`}
          >
            {/* Wheel Pointer Indicator with deflection */}
            <div className="relative flex justify-center w-full">
              <div
                className="absolute -top-4 z-20 w-0 h-0 transition-transform duration-75 origin-top"
                style={{
                  borderLeft: '16px solid transparent',
                  borderRight: '16px solid transparent',
                  borderTop: '32px solid #e11d48',
                  filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.35))',
                  transform: `rotate(${needleAngle}deg)`
                }}
              />
            </div>

            {/* Canvas Component */}
            <div
              className={`relative flex items-center justify-center transition-all duration-300 touch-manipulation ${
                isFullscreen
                  ? 'w-full max-w-[min(96vw,86vh,840px)] aspect-square'
                  : 'w-full max-w-[min(95vw,480px)] aspect-square sm:max-w-[540px] lg:max-w-[620px] xl:max-w-[660px]'
              }`}
            >
              <canvas
                ref={canvasRef}
                width={700}
                height={700}
                onClick={spinWheel}
                className={`w-full h-full cursor-pointer select-none transition-transform duration-200 touch-manipulation ${
                  isSpinning ? 'scale-[0.99]' : 'hover:scale-[1.01]'
                }`}
              />
            </div>

            {/* Spin & Instant Pick Controls */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 w-full max-w-lg">
              <button
                type="button"
                onClick={spinWheel}
                disabled={isSpinning || currentWheelItems.length === 0}
                className="flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-500/25 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
                <span>{isSpinning ? 'Spinning Wheel...' : 'SPIN FOOD WHEEL'}</span>
                <kbd className="hidden sm:inline text-[10px] font-normal px-2 py-0.5 rounded bg-white/20 text-white ml-1">
                  Space
                </kbd>
              </button>

              <button
                type="button"
                onClick={handleInstantPick}
                disabled={isSpinning || currentWheelItems.length === 0}
                className="py-3.5 px-5 rounded-2xl text-xs sm:text-sm font-semibold bg-gray-100 dark:bg-[#20212e] text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-[#2c2d3e] transition-all flex items-center gap-1.5 cursor-pointer"
                title="Pick immediately without waiting for spin animation"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Instant Pick</span>
              </button>
            </div>

            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-2.5 text-center">
              {currentWheelItems.length} active choices • Press <kbd className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-800 text-[10px] font-mono">Space</kbd> to spin • <kbd className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-800 text-[10px] font-mono">F</kbd> for fullscreen
            </p>
          </div>

          {/* RESULTS & DECISION CARD COLUMN */}
          {(!isFullscreen || !fullscreenTheater) && (
            <div className={`${isFullscreen ? 'xl:col-span-4 lg:col-span-5' : 'lg:col-span-5 xl:col-span-5'} flex flex-col gap-4 sm:gap-5`}>
              {winnerFood ? (
                <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-orange-50 to-amber-50/50 dark:from-[#211a18] dark:to-[#1a1b26] border border-orange-200/80 dark:border-orange-500/20 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" /> Selected Outcome
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold">
                      Spin #{spinCount}
                    </span>
                  </div>

                  <div className="text-center py-3">
                    <div className="text-6xl mb-3">{'emoji' in winnerFood ? winnerFood.emoji : '🍽️'}</div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
                      {winnerFood.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-sm mx-auto leading-relaxed">
                      {winnerFood.description}
                    </p>

                    {'popularPairing' in winnerFood && winnerFood.popularPairing && (
                      <div className="mt-3.5 inline-block px-3.5 py-1.5 rounded-xl bg-orange-500/10 text-orange-700 dark:text-orange-300 text-xs sm:text-sm font-medium">
                        <span className="font-bold">Pairing:</span> {winnerFood.popularPairing}
                      </div>
                    )}
                  </div>

                  {/* Action buttons for winner */}
                  <div className="mt-5 pt-4 border-t border-orange-200/60 dark:border-orange-500/20 flex flex-wrap gap-2.5 justify-center">
                    <a
                      href={`https://www.google.com/maps/search/${encodeURIComponent(winnerFood.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-orange-500 text-white hover:bg-orange-600 transition-colors flex items-center justify-center gap-1.5 text-center shadow-xs"
                    >
                      <MapPin className="w-4 h-4" />
                      <span>Find Places</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => handleCopyWinner(winnerFood.name)}
                      className="py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-white dark:bg-[#28293c] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={spinWheel}
                      disabled={isSpinning}
                      className="py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-white dark:bg-[#28293c] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <RotateCw className="w-4 h-4" />
                      <span>Spin Again</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-7 sm:p-8 rounded-3xl bg-[#f8f6fc] dark:bg-[#1a1b28] border border-[#eceaf6] dark:border-[#27283c] text-center flex flex-col items-center justify-center min-h-[260px] sm:min-h-[300px]">
                  <div className="w-16 h-16 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center mb-3 text-2xl">
                    <Utensils className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1.5">
                    What Should You Eat?
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
                    Choose one of the 10 quick presets above, stack cuisines and dietary tags, then press <strong className="text-orange-600 dark:text-orange-400 font-bold">SPIN</strong> or <strong className="text-orange-600 dark:text-orange-400 font-bold">Spacebar</strong>!
                  </p>
                </div>
              )}

              {/* Spin History Log */}
              {spinHistory.length > 0 && (
                <div className="p-5 rounded-2xl bg-white dark:bg-[#181928] border border-gray-200/80 dark:border-gray-800 text-xs sm:text-sm shadow-xs">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-orange-500" />
                      Recent Spins ({spinHistory.length})
                    </span>
                    <button
                      type="button"
                      onClick={() => setSpinHistory([])}
                      className="text-xs text-gray-400 hover:text-red-500 font-medium cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                    {spinHistory.map((h, i) => (
                      <div
                        key={`${h.id}-${i}`}
                        className="flex items-center justify-between py-1.5 px-3 rounded-xl bg-gray-50 dark:bg-[#202132] text-gray-700 dark:text-gray-300"
                      >
                        <span className="truncate flex items-center gap-1.5 font-medium">
                          <span className="text-base">{h.emoji}</span>
                          <span className="truncate">{h.name}</span>
                        </span>
                        <span className="text-[11px] text-gray-400 shrink-0 ml-2 font-mono">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Psychology tip */}
              <div className="p-5 rounded-2xl bg-gray-50/90 dark:bg-[#1d1e2b] border border-gray-200/70 dark:border-gray-800 text-xs sm:text-sm text-gray-600 dark:text-gray-300 shadow-xs">
                <div className="flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong className="text-gray-900 dark:text-white">The Gut-Check Rule:</strong> As the food wheel slows down, pay attention to which slice you are rooting for. If you smile when it stops, head out and enjoy. If you feel disappointed, immediately pick the alternative without second-guessing!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* WINNER CELEBRATION MODAL */}
      {showWinnerModal && winnerFood && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-white dark:bg-[#1e1f2d] rounded-3xl p-6 sm:p-8 border border-orange-200 dark:border-orange-500/20 shadow-2xl animate-in zoom-in-95 duration-150 text-center flex flex-col items-center">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowWinnerModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:bg-orange-50 dark:hover:bg-[#28293c] transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Emoji & Badge */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/30 mb-3 animate-pulse text-3xl">
              {'emoji' in winnerFood ? winnerFood.emoji : '🍽️'}
            </div>

            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 mb-1">
              Food Pick Selected • Spin #{spinCount}
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mt-1 mb-2">
              {winnerFood.name}
            </h2>

            {/* Voice announcer button */}
            <div className="mb-3 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() =>
                  announceWinnerTTS(winnerFood.name, {
                    enabled: true,
                    prefix: 'Tonight\'s food pick is'
                  })
                }
                className="px-3 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/30 hover:bg-orange-100 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800/60 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Speak food winner out loud"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>🔊 Speak Winner</span>
              </button>

              <button
                type="button"
                onClick={() => handleCopyWinner(winnerFood.name)}
                className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-700 dark:text-gray-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Card</span>
              </button>
            </div>

            {'description' in winnerFood && winnerFood.description && (
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 max-w-sm">
                {winnerFood.description}
              </p>
            )}

            {'popularPairing' in winnerFood && winnerFood.popularPairing && (
              <div className="w-full p-2.5 rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-200/60 dark:border-orange-900/30 text-xs text-orange-800 dark:text-orange-300 mb-4 text-left">
                <strong>Recommended Pairing:</strong> {winnerFood.popularPairing}
              </div>
            )}

            {/* Action Buttons */}
            <div className="w-full flex flex-col gap-2">
              <div className="flex gap-2">
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(winnerFood.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition-all shadow-md shadow-orange-500/20 flex items-center justify-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Find Places Near Me</span>
                </a>

                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(winnerFood.name + ' recipe')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Recipe</span>
                </a>
              </div>

              <div className="flex gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => {
                    setShowWinnerModal(false);
                    spinWheel();
                  }}
                  disabled={isSpinning || currentWheelItems.length === 0}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold hover:opacity-90 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Spin Again</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (activeTab === 'wheel' && 'id' in winnerFood && winnerFood.id) {
                      setEliminatedIds((prev) => [...prev, winnerFood.id!]);
                    } else if (activeTab === 'custom') {
                      if ('id' in winnerFood && winnerFood.id) {
                        setCustomList((prev) => prev.filter((it) => it.id !== winnerFood.id));
                      } else {
                        setCustomList((prev) => prev.filter((it) => it.name !== winnerFood.name));
                      }
                    }
                    setShowWinnerModal(false);
                    showToast(`Eliminated "${winnerFood.name}" from wheel pool.`);
                  }}
                  className="py-2.5 px-3 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Remove this food from future spins"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Eliminate</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BULK IMPORT MODAL */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#1e1f2d] rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
              Bulk Paste Food / Restaurant List
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              Enter one meal or restaurant name per line. This replaces your current custom list.
            </p>
            <textarea
              rows={8}
              value={bulkTextInput}
              onChange={(e) => setBulkTextInput(e.target.value)}
              placeholder={`Chipotle Burrito Bowl\nPapa John's Pepperoni Pizza\nThai Spicy Basil Chicken\nPanera Bread Salad & Soup\nIn-N-Out Double Double\nButter Chicken with Garlic Naan`}
              className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#161722] text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => setShowBulkModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBulkImport}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-orange-500 hover:bg-orange-600 text-white transition-colors cursor-pointer"
              >
                Load {bulkTextInput.split('\n').filter((l) => l.trim()).length} Items
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
