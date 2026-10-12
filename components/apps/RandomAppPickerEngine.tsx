'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import confetti from '@/lib/confetti';
import {
  Sparkles,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  Zap,
  Gamepad2,
  Tv,
  CheckSquare,
  BookOpen,
  MessageCircle,
  Flame,
  Palette,
  Sliders,
  Plus,
  Trash2,
  RotateCcw,
  Ban,
  Shuffle,
  Heart,
  ListPlus,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Smartphone,
  Eye,
  EyeOff
} from 'lucide-react';
import {
  AppCategory,
  AppItem,
  PRESET_APP_CATEGORIES,
  APP_CATALOG,
  INITIAL_CUSTOM_APPS
} from '@/lib/apps/appDatabase';
import {
  playTickSound,
  playWinnerFanfare,
  playClickSound,
  unlockAudioContext
} from '@/lib/sound';
import { useSavedWheels, toggleWheelFavorite } from '@/lib/storage';

// Cryptographic hardware random generator
function getRandomIndex(length: number): number {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0] % length;
  }
  return Math.floor(Math.random() * length);
}

const WHEEL_PALETTE = [
  '#4648d4', // Indigo Primary
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#06b6d4', // Cyan
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#3b82f6', // Blue
  '#14b8a6', // Teal
  '#a855f7'  // Violet
];

export default function RandomAppPickerEngine() {
  const [activeCategory, setActiveCategory] = useState<AppCategory>('mobile-games');
  const [customApps, setCustomApps] = useState<AppItem[]>(INITIAL_CUSTOM_APPS);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedWinner, setSelectedWinner] = useState<AppItem | null>(null);
  const [eliminatedIds, setEliminatedIds] = useState<Set<string>>(new Set());
  const [isNoRepeat, setIsNoRepeat] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedWinner, setCopiedWinner] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Custom App Input State
  const [newAppName, setNewAppName] = useState('');
  const [newAppPlatform, setNewAppPlatform] = useState<'iOS & Android' | 'Cross-Platform' | 'Web & Mobile'>('iOS & Android');
  const [newAppPrompt, setNewAppPrompt] = useState('');
  const [bulkText, setBulkText] = useState('');
  const [showBulkPasteModal, setShowBulkPasteModal] = useState(false);

  // Wheel Canvas Refs
  const wheelCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const currentAngleRef = useRef(0);
  const [needleAngle, setNeedleAngle] = useState(0);

  // Favorites Hook
  const savedWheels = useSavedWheels();
  const isWheelFavorited = (savedWheels || []).some((w) => w.id === 'random-app-picker');

  // Load custom apps from localStorage on client mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem('swg_custom_apps_list');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCustomApps(parsed);
        }
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  // Persist custom apps
  const persistCustomApps = (apps: AppItem[]) => {
    setCustomApps(apps);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('swg_custom_apps_list', JSON.stringify(apps));
      } catch {
        // ignore storage errors
      }
    }
  };

  // Active pool of apps based on current category
  const activeCategoryApps = useMemo(() => {
    if (activeCategory === 'custom') {
      return customApps;
    }
    return APP_CATALOG.filter((app) => app.category === activeCategory);
  }, [activeCategory, customApps]);

  // Candidate apps after excluding eliminated ones (No-repeat mode)
  const availableApps = useMemo(() => {
    if (!isNoRepeat) return activeCategoryApps;
    return activeCategoryApps.filter((app) => !eliminatedIds.has(app.id));
  }, [activeCategoryApps, isNoRepeat, eliminatedIds]);

  // Slices displayed on the canvas wheel
  const wheelSlices = useMemo(() => {
    return availableApps.map((app, index) => ({
      id: app.id,
      text: app.name,
      color: WHEEL_PALETTE[index % WHEEL_PALETTE.length],
      app
    }));
  }, [availableApps]);

  const activeCategoryConfig = useMemo(() => {
    return (
      PRESET_APP_CATEGORIES.find((c) => c.id === activeCategory) ||
      PRESET_APP_CATEGORIES[0]
    );
  }, [activeCategory]);

  // Canvas Drawing Routine
  const drawWheel = useCallback(() => {
    const canvas = wheelCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    const radius = center - 16;

    ctx.clearRect(0, 0, size, size);

    if (wheelSlices.length === 0) {
      // Empty wheel placeholder state
      ctx.save();
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#1e1b4b';
      ctx.fill();
      ctx.strokeStyle = '#4338ca';
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.fillStyle = '#c7d2fe';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      if (activeCategory === 'custom' && customApps.length === 0) {
        ctx.fillText('Custom Apps list is empty!', center, center - 12);
        ctx.font = '12px sans-serif';
        ctx.fillText('Add or bulk paste apps below', center, center + 14);
      } else {
        ctx.fillText('All apps spun in this category!', center, center - 12);
        ctx.font = '12px sans-serif';
        ctx.fillText('Click [Restore Excluded Apps] to spin again', center, center + 14);
      }
      ctx.restore();
      return;
    }

    const numSlices = wheelSlices.length;
    const sliceAngle = (2 * Math.PI) / numSlices;

    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(currentAngleRef.current);

    // Draw slices
    for (let i = 0; i < numSlices; i++) {
      const slice = wheelSlices[i];
      const startAngle = i * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = slice.color;
      ctx.fill();

      // Border between slices
      ctx.lineWidth = Math.max(1.5, Math.min(3, 14 / numSlices));
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      // Text label
      ctx.save();
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';

      // Responsive font sizing based on slice count
      let fontSize = 14;
      if (numSlices > 16) fontSize = 10;
      else if (numSlices > 10) fontSize = 12;
      else if (numSlices > 6) fontSize = 13;

      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.shadowColor = 'rgba(0,0,0,0.4)';
      ctx.shadowBlur = 4;

      const maxTextWidth = radius - 45;
      let text = slice.text;
      if (ctx.measureText(text).width > maxTextWidth) {
        while (text.length > 3 && ctx.measureText(text + '…').width > maxTextWidth) {
          text = text.slice(0, -1);
        }
        text = text + '…';
      }

      ctx.fillText(text, radius - 20, 0);
      ctx.restore();
    }

    // Outer Rim Accent Ring
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    // Center Hub Hub
    ctx.beginPath();
    ctx.arc(0, 0, 26, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0,0,0,0.35)';
    ctx.shadowBlur = 8;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0, 0, 16, 0, 2 * Math.PI);
    ctx.fillStyle = '#4648d4';
    ctx.fill();

    ctx.restore();
  }, [wheelSlices, activeCategory, customApps.length]);

  // Redraw when slices change
  useEffect(() => {
    drawWheel();
  }, [drawWheel]);

  // Main Spin Execution
  const handleSpin = () => {
    if (isSpinning || wheelSlices.length === 0) return;
    unlockAudioContext();

    setIsSpinning(true);
    setSelectedWinner(null);
    setCopiedWinner(false);

    // Cryptographic pre-selection
    const winningIndex = getRandomIndex(wheelSlices.length);
    const winningSlice = wheelSlices[winningIndex];

    const numSlices = wheelSlices.length;
    const sliceAngle = (2 * Math.PI) / numSlices;

    // Calculate rotation: Needle is at top (3 * Math.PI / 2 or -Math.PI / 2)
    // Slice center angle = winningIndex * sliceAngle + sliceAngle / 2
    // We want: (targetAngle + sliceCenter) % (2PI) = 3PI/2
    const targetSliceCenter = winningIndex * sliceAngle + sliceAngle / 2;
    const baseTargetAngle = 1.5 * Math.PI - targetSliceCenter;

    // Spin 5 to 7 full rotations plus offset
    const fullSpins = 5 + getRandomIndex(3);
    const totalDelta = fullSpins * 2 * Math.PI + ((baseTargetAngle - (currentAngleRef.current % (2 * Math.PI)) + 4 * Math.PI) % (2 * Math.PI));

    const startAngle = currentAngleRef.current;
    const endAngle = startAngle + totalDelta;
    const duration = 4000;
    const startTime = performance.now();

    let lastTickSlice = -1;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Quartic ease out
      const ease = 1 - Math.pow(1 - progress, 4);
      const angle = startAngle + (endAngle - startAngle) * ease;
      currentAngleRef.current = angle;

      // Needle tick effect
      const currentSliceIndex = Math.floor(
        (((1.5 * Math.PI - (angle % (2 * Math.PI)) + 4 * Math.PI) % (2 * Math.PI)) / sliceAngle)
      );
      if (currentSliceIndex !== lastTickSlice) {
        lastTickSlice = currentSliceIndex;
        if (soundEnabled) playTickSound();
        setNeedleAngle((prev) => (prev === 12 ? -12 : 12));
      }

      drawWheel();

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Complete spin
        setIsSpinning(false);
        setNeedleAngle(0);
        setSelectedWinner(winningSlice.app);

        if (soundEnabled) playWinnerFanfare();
        confetti();

        // If No-Repeat mode is active, exclude this app for subsequent spins
        if (isNoRepeat) {
          setEliminatedIds((prev) => new Set(prev).add(winningSlice.id));
        }
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  };

  // Instant Quick Pick
  const handleQuickPick = () => {
    if (isSpinning || wheelSlices.length === 0) return;
    unlockAudioContext();

    const winningIndex = getRandomIndex(wheelSlices.length);
    const winningSlice = wheelSlices[winningIndex];

    setSelectedWinner(winningSlice.app);
    if (soundEnabled) playWinnerFanfare();
    confetti();

    if (isNoRepeat) {
      setEliminatedIds((prev) => new Set(prev).add(winningSlice.id));
    }
  };

  // Add custom single app
  const handleAddCustomApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAppName.trim()) return;

    const newApp: AppItem = {
      id: `custom-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: newAppName.trim(),
      category: 'custom',
      platform: newAppPlatform,
      useCase: 'Personal app choice',
      actionPrompt: newAppPrompt.trim() || 'Open the app and make progress for 15 minutes!',
      isCustom: true
    };

    const updated = [...customApps, newApp];
    persistCustomApps(updated);
    setNewAppName('');
    setNewAppPrompt('');
    setActiveCategory('custom');
    setToastMsg(`✅ Added "${newApp.name}" to your Custom Apps!`);
    setTimeout(() => setToastMsg(null), 2400);
  };

  // Bulk paste apps
  const handleBulkImport = () => {
    if (!bulkText.trim()) return;
    const lines = bulkText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const imported: AppItem[] = lines.map((line, idx) => ({
      id: `custom-bulk-${Date.now()}-${idx}`,
      name: line.replace(/^[\d\.\-\*•\s]+/, '').trim(),
      category: 'custom',
      platform: 'Cross-Platform',
      useCase: 'Custom imported app',
      actionPrompt: 'Open this app and complete 1 session.',
      isCustom: true
    }));

    const updated = [...customApps, ...imported];
    persistCustomApps(updated);
    setBulkText('');
    setShowBulkPasteModal(false);
    setActiveCategory('custom');
    setToastMsg(`🎉 Imported ${imported.length} apps to your custom picker!`);
    setTimeout(() => setToastMsg(null), 2400);
  };

  // Remove individual custom app
  const removeCustomApp = (id: string) => {
    const updated = customApps.filter((a) => a.id !== id);
    persistCustomApps(updated);
  };

  // Load sample popular phone apps into custom
  const handleLoadSampleCatalogToCustom = () => {
    const sampleApps = APP_CATALOG.slice(0, 16).map((app, idx) => ({
      ...app,
      id: `custom-sample-${idx}`,
      category: 'custom' as AppCategory,
      isCustom: true
    }));
    persistCustomApps(sampleApps);
    setActiveCategory('custom');
    setToastMsg('📱 Loaded 16 sample phone apps into your Custom List!');
    setTimeout(() => setToastMsg(null), 2400);
  };

  // Exclude single app manually
  const toggleExcludeApp = (id: string) => {
    setEliminatedIds((prev) => {
      const copy = new Set(prev);
      if (copy.has(id)) {
        copy.delete(id);
      } else {
        copy.add(id);
      }
      return copy;
    });
  };

  // Restore all excluded apps
  const handleRestoreExcluded = () => {
    setEliminatedIds(new Set());
    setToastMsg('🔄 Restored all excluded apps back to the wheel!');
    setTimeout(() => setToastMsg(null), 2400);
  };

  // Copy winner result to clipboard
  const handleCopyWinner = () => {
    if (!selectedWinner) return;
    const textToCopy = `🎲 Random App Picker spun: ${selectedWinner.name}! Mission: ${selectedWinner.actionPrompt} (spun via SpinWheelGames.org)`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedWinner(true);
    setToastMsg('📋 Winner result copied to clipboard!');
    setTimeout(() => {
      setCopiedWinner(false);
      setToastMsg(null);
    }, 2200);
  };

  // Favorite Wheel
  const handleFavoriteWheel = () => {
    toggleWheelFavorite({
      id: 'random-app-picker',
      title: 'Random App Picker',
      category: 'DECISIONS',
      description: 'Spin to choose random apps from curated categories or custom lists with no-repeat exclusions.'
    });
    setToastMsg(
      !isWheelFavorited
        ? '❤️ Saved Random App Picker to your favorites!'
        : 'Removed from favorites'
    );
    setTimeout(() => setToastMsg(null), 2200);
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
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

  // Category Icon Renderer
  const renderCategoryIcon = (iconName: string, className = 'w-4 h-4') => {
    switch (iconName) {
      case 'Gamepad2':
        return <Gamepad2 className={className} />;
      case 'Tv':
        return <Tv className={className} />;
      case 'CheckSquare':
        return <CheckSquare className={className} />;
      case 'BookOpen':
        return <BookOpen className={className} />;
      case 'MessageCircle':
        return <MessageCircle className={className} />;
      case 'Flame':
        return <Flame className={className} />;
      case 'Palette':
        return <Palette className={className} />;
      default:
        return <Sliders className={className} />;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`w-full max-w-7xl mx-auto rounded-2xl border border-[#eeedf7] dark:border-[#222330] transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-0 z-50 bg-[#0f172a] p-4 overflow-y-auto flex flex-col justify-center items-center'
          : 'bg-white dark:bg-[#151620] shadow-sm p-4 sm:p-6 lg:p-7'
      }`}
    >
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Engine Header & Toolbar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-[#eeedf7] dark:border-[#222330]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4648d4] dark:text-[#8587ff] mb-1">
            <Smartphone className="w-4 h-4" />
            <span>Interactive Mobile Decision Spinner</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>Random App Picker</span>
            <button
              type="button"
              onClick={handleFavoriteWheel}
              aria-label={isWheelFavorited ? 'Remove from favorites' : 'Save to favorites'}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-rose-500 transition-colors"
            >
              <Heart
                className={`w-4 h-4 ${isWheelFavorited ? 'fill-rose-500 text-rose-500' : ''}`}
              />
            </button>
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
            {activeCategoryConfig.description} •{' '}
            <span className="font-semibold text-[#4648d4] dark:text-[#8587ff]">
              {wheelSlices.length} apps on wheel
            </span>
            {eliminatedIds.size > 0 && (
              <span className="text-amber-600 dark:text-amber-400 font-medium">
                {' '}
                ({eliminatedIds.size} excluded)
              </span>
            )}
          </p>
        </div>

        {/* Engine Controls: Sound, Fullscreen, No-Repeat, Restore */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={() => {
              if (soundEnabled) playClickSound();
              setSoundEnabled(!soundEnabled);
            }}
            className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              soundEnabled
                ? 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800'
                : 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
            }`}
            title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{soundEnabled ? 'Sound ON' : 'Muted'}</span>
          </button>

          {/* No-Repeat Mode Toggle */}
          <button
            type="button"
            onClick={() => {
              if (soundEnabled) playClickSound();
              setIsNoRepeat(!isNoRepeat);
            }}
            className={`px-3 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
              isNoRepeat
                ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                : 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
            }`}
            title="Exclude spun apps automatically so you never pick duplicates"
          >
            <Ban className="w-3.5 h-3.5" />
            <span>No-Repeat: {isNoRepeat ? 'ON' : 'OFF'}</span>
          </button>

          {/* Restore Excluded Apps */}
          {eliminatedIds.size > 0 && (
            <button
              type="button"
              onClick={handleRestoreExcluded}
              className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
              title="Add all excluded apps back to the wheel"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Excluded ({eliminatedIds.size})</span>
            </button>
          )}

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors"
            title="Toggle fullscreen mode"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Preset App Categories Selector Tabs */}
      <div className="pt-4 pb-5 border-b border-[#eeedf7] dark:border-[#222330]">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Select App Category:
          </span>
          {activeCategory === 'custom' && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowBulkPasteModal(true)}
                className="text-xs text-[#4648d4] dark:text-[#8587ff] hover:underline font-bold flex items-center gap-1"
              >
                <ListPlus className="w-3.5 h-3.5" />
                <span>Bulk Paste Apps</span>
              </button>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <button
                type="button"
                onClick={handleLoadSampleCatalogToCustom}
                className="text-xs text-slate-600 dark:text-slate-400 hover:underline"
              >
                Load Sample List
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none">
          {PRESET_APP_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count =
              cat.id === 'custom'
                ? customApps.length
                : APP_CATALOG.filter((a) => a.category === cat.id).length;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  if (soundEnabled) playClickSound();
                  setActiveCategory(cat.id);
                  setSelectedWinner(null);
                }}
                className={`flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#4648d4] text-white shadow-md shadow-[#4648d4]/20 scale-[1.02]'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {renderCategoryIcon(cat.icon, 'w-3.5 h-3.5')}
                <span>{cat.shortLabel}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Wheel Stage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-start">
        {/* Left / Center: Interactive Canvas Wheel Stage (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center bg-[#faf8ff] dark:bg-[#12131c] rounded-2xl p-4 sm:p-6 border border-[#eeedf7] dark:border-[#222330]">
          {/* Wheel Pointer Needle */}
          <div className="relative flex flex-col items-center w-full max-w-[340px] sm:max-w-[420px]">
            {/* Top Indicator Needle */}
            <div
              className="z-20 -mb-3 transition-transform duration-75 origin-top"
              style={{
                transform: `rotate(${needleAngle}deg)`
              }}
            >
              <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[28px] border-t-[#4648d4] drop-shadow-md" />
            </div>

            {/* Canvas Wheel Element */}
            <div className="relative w-full aspect-square max-w-[400px]">
              <canvas
                ref={wheelCanvasRef}
                width={460}
                height={460}
                className="w-full h-full cursor-pointer select-none transition-transform active:scale-[0.99]"
                onClick={handleSpin}
                title="Click wheel to spin"
              />
            </div>
          </div>

          {/* Action Spin Buttons Below Wheel */}
          <div className="w-full max-w-md mt-5 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            <button
              type="button"
              onClick={handleSpin}
              disabled={isSpinning || wheelSlices.length === 0}
              className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#4648d4] via-[#6366f1] to-[#7c3aed] hover:from-[#3d3fb8] hover:to-[#6d28d9] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-[#4648d4]/25 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>{isSpinning ? 'Deciding…' : 'SPIN THE APP WHEEL'}</span>
            </button>

            <button
              type="button"
              onClick={handleQuickPick}
              disabled={isSpinning || wheelSlices.length === 0}
              className="py-3.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              title="Instant pick without waiting for wheel animation"
            >
              <Shuffle className="w-4 h-4 text-[#4648d4]" />
              <span>Quick Pick</span>
            </button>
          </div>

          {/* Quick Provable Fairness Micro-Badge */}
          <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Cryptographically Fair • Web Cryptography CSPRNG Entropy</span>
          </div>
        </div>

        {/* Right Column: Selected App Announcement & App Manager (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Winner Result Card */}
          {selectedWinner ? (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#f4f2fd] via-white to-[#ece9fc] dark:from-[#1e1f30] dark:via-[#161724] dark:to-[#1b1c2b] border-2 border-[#4648d4]/50 dark:border-[#8587ff]/50 shadow-md space-y-3 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4648d4] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>The Wheel Chose Your App!</span>
                </div>
                <span className="text-[11px] font-bold text-[#4648d4] dark:text-[#8587ff]">
                  {selectedWinner.platform}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {selectedWinner.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  <strong>Type:</strong> {selectedWinner.useCase}
                </p>
              </div>

              {/* Action Mission / Prompt */}
              <div className="p-3 rounded-xl bg-white/80 dark:bg-black/30 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-200 space-y-1">
                <div className="font-bold text-[11px] uppercase tracking-wider text-[#4648d4] dark:text-[#8587ff]">
                  🎯 Your App Session Goal:
                </div>
                <p className="font-medium">{selectedWinner.actionPrompt}</p>
              </div>

              {/* Winner Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleCopyWinner}
                  className="flex-1 py-2 px-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedWinner ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedWinner ? 'Copied!' : 'Copy Result'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleExcludeApp(selectedWinner.id)}
                  className="py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/50 border border-amber-200 dark:border-amber-800 text-xs font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Exclude this app so it won't be spun again this session"
                >
                  <Ban className="w-3.5 h-3.5" />
                  <span>{eliminatedIds.has(selectedWinner.id) ? 'Re-include App' : 'Exclude for Next Spin'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Standby Card */
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#12131c] border border-dashed border-slate-300 dark:border-slate-800 text-center space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full bg-[#4648d4]/10 dark:bg-[#4648d4]/20 flex items-center justify-center text-[#4648d4] dark:text-[#8587ff]">
                <Smartphone className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Ready to Pick an App?
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                Hit <strong>SPIN THE APP WHEEL</strong> to randomly choose an app from{' '}
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {activeCategoryConfig.label}
                </span>
                .
              </p>
            </div>
          )}

          {/* App Entries Roster & Exclusion Toggle List */}
          <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-[#faf8ff] dark:bg-[#12131c] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>Current App Roster</span>
                  <span className="text-[10px] text-slate-500 font-normal">
                    ({availableApps.length}/{activeCategoryApps.length} active)
                  </span>
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Click eye icon to exclude apps from the wheel
                </p>
              </div>

              {activeCategory === 'custom' && (
                <button
                  type="button"
                  onClick={() => persistCustomApps([])}
                  className="text-[11px] text-rose-500 hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear All</span>
                </button>
              )}
            </div>

            {/* Scrollable Apps List */}
            <div className="max-h-[260px] overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
              {activeCategoryApps.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-400">
                  No apps in this list yet. Add some below!
                </div>
              ) : (
                activeCategoryApps.map((app) => {
                  const isExcluded = eliminatedIds.has(app.id);
                  return (
                    <div
                      key={app.id}
                      className={`flex items-center justify-between p-2 rounded-xl text-xs transition-colors ${
                        isExcluded
                          ? 'bg-slate-200/50 dark:bg-slate-800/40 text-slate-400 line-through'
                          : 'bg-white dark:bg-[#161724] border border-slate-200/60 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0 pr-2">
                        <span className="w-2 h-2 rounded-full shrink-0 bg-[#4648d4]" />
                        <span className="font-semibold truncate">{app.name}</span>
                        <span className="text-[10px] text-slate-400 shrink-0">
                          ({app.platform})
                        </span>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        {/* Toggle Exclude */}
                        <button
                          type="button"
                          onClick={() => toggleExcludeApp(app.id)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            isExcluded
                              ? 'text-amber-600 hover:bg-amber-100 dark:hover:bg-amber-950/60'
                              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                          title={isExcluded ? 'Include app on wheel' : 'Exclude app from wheel'}
                        >
                          {isExcluded ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>

                        {/* If custom, allow deletion */}
                        {activeCategory === 'custom' && (
                          <button
                            type="button"
                            onClick={() => removeCustomApp(app.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                            title="Delete custom app"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Quick Add Custom App Form */}
            <form onSubmit={handleAddCustomApp} className="pt-2 border-t border-slate-200/60 dark:border-slate-800 space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                + Add Custom App to Wheel
              </div>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={newAppName}
                  onChange={(e) => setNewAppName(e.target.value)}
                  placeholder="App name (e.g. Duolingo, Chess...)"
                  className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-[#161724] border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#4648d4]"
                />
                <button
                  type="submit"
                  disabled={!newAppName.trim()}
                  className="px-3 py-2 rounded-xl bg-[#4648d4] hover:bg-[#3b3db8] disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-[11px]">
                <input
                  type="text"
                  value={newAppPrompt}
                  onChange={(e) => setNewAppPrompt(e.target.value)}
                  placeholder="Optional mission/action (e.g. Do 1 lesson)"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#161724] border border-slate-200 dark:border-slate-700 text-[11px] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden"
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Bulk Paste Modal */}
      {showBulkPasteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#181924] rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ListPlus className="w-4 h-4 text-[#4648d4]" />
                <span>Bulk Paste Apps List</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowBulkPasteModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Paste one app title per line. You can copy the names of installed apps directly from your phone’s launcher, Steam backlog, or task manager.
            </p>

            <textarea
              rows={6}
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder="Instagram&#10;Spotify&#10;Subway Surfers&#10;Notion&#10;Kindle&#10;Duolingo"
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#4648d4]"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowBulkPasteModal(false)}
                className="px-3 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBulkImport}
                disabled={!bulkText.trim()}
                className="px-4 py-2 rounded-xl bg-[#4648d4] hover:bg-[#3b3db8] text-white font-bold text-xs transition-colors disabled:opacity-50"
              >
                Import Apps
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
