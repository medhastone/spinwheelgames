'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import confetti from '@/lib/confetti';
import {
  Cake,
  Crown,
  Sparkles,
  Utensils,
  Gift,
  Gamepad2,
  PartyPopper,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Trash2,
  Plus,
  Copy,
  Check,
  Share2,
  RotateCcw,
  RotateCw,
  ListPlus,
  X,
  ShieldCheck,
  Heart,
  Sliders,
  CheckCircle2,
  HelpCircle,
  Clock,
  Shuffle
} from 'lucide-react';
import {
  BirthdayModeId,
  BirthdayItem,
  BIRTHDAY_MODES,
  ALL_BIRTHDAY_MODE_IDS
} from '@/lib/birthday/birthdayData';
import {
  playTickSound,
  playWinnerFanfare,
  playClickSound,
  unlockAudioContext
} from '@/lib/sound';
import { toggleWheelFavorite } from '@/lib/storage';

const MODE_ICON_MAP: Record<BirthdayModeId, React.ElementType> = {
  person: Crown,
  activity: Sparkles,
  food: Utensils,
  gifts: Gift,
  games: Gamepad2,
  theme: PartyPopper
};

interface HistoryRecord {
  id: string;
  item: BirthdayItem;
  modeId: BirthdayModeId;
  timestamp: string;
}

function getSecureRandomIndex(length: number): number {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0] % length;
  }
  return Math.floor(Math.random() * length);
}

export default function BirthdayWheelEngine() {
  const [activeMode, setActiveMode] = useState<BirthdayModeId>('person');
  const [pools, setPools] = useState<Record<BirthdayModeId, BirthdayItem[]>>(() => {
    const init: Record<BirthdayModeId, BirthdayItem[]> = {
      person: [...BIRTHDAY_MODES.person.sampleItems],
      activity: [...BIRTHDAY_MODES.activity.sampleItems],
      food: [...BIRTHDAY_MODES.food.sampleItems],
      gifts: [...BIRTHDAY_MODES.gifts.sampleItems],
      games: [...BIRTHDAY_MODES.games.sampleItems],
      theme: [...BIRTHDAY_MODES.theme.sampleItems]
    };
    return init;
  });

  const [eliminatedIds, setEliminatedIds] = useState<Record<BirthdayModeId, string[]>>({
    person: [],
    activity: [],
    food: [],
    gifts: [],
    games: [],
    theme: []
  });

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isNoRepeat, setIsNoRepeat] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedWinner, setSelectedWinner] = useState<BirthdayItem | null>(null);
  const [winnerModalOpen, setWinnerModalOpen] = useState(false);
  const [needleAngle, setNeedleAngle] = useState(0);

  // Custom Input State
  const [newItemText, setNewItemText] = useState('');
  const [newItemSubtitle, setNewItemSubtitle] = useState('');
  const [bulkModalOpen, setBulkModalOpen] = useState(false);
  const [bulkText, setBulkText] = useState('');

  // History & Toast State
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [copiedWinner, setCopiedWinner] = useState(false);
  const [copiedHistory, setCopiedHistory] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Canvas Refs
  const wheelCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentAngleRef = useRef(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  }, []);

  // Hydrate custom pools from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('birthday_wheel_pools_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          setPools((prev) => ({ ...prev, ...parsed }));
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Save pools to localStorage when updated
  const savePools = useCallback((updated: Record<BirthdayModeId, BirthdayItem[]>) => {
    setPools(updated);
    try {
      localStorage.setItem('birthday_wheel_pools_v1', JSON.stringify(updated));
    } catch {
      // ignore
    }
  }, []);

  // Active items for current mode after elimination
  const rawCurrentItems = pools[activeMode] || [];
  const currentEliminated = eliminatedIds[activeMode] || [];

  const activeItems = useMemo(() => {
    if (isNoRepeat && currentEliminated.length > 0) {
      const filtered = rawCurrentItems.filter((it) => !currentEliminated.includes(it.id));
      return filtered.length > 0 ? filtered : rawCurrentItems;
    }
    return rawCurrentItems;
  }, [rawCurrentItems, currentEliminated, isNoRepeat]);

  const activeConfig = BIRTHDAY_MODES[activeMode];
  const palette = activeConfig.palette;

  // Wheel Drawing Logic
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

    if (activeItems.length === 0) {
      // Empty Wheel Placeholder
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#f8fafc';
      ctx.fill();
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = 'bold 16px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('All options eliminated!', centerX, centerY - 12);
      ctx.font = 'normal 13px system-ui, -apple-system, sans-serif';
      ctx.fillText('Click Reset or add custom items below', centerX, centerY + 14);
      ctx.restore();
      return;
    }

    const numSlices = activeItems.length;
    const sliceAngle = (2 * Math.PI) / numSlices;

    // Outer Shadow / Glow
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 4, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(15, 23, 42, 0.08)';
    ctx.fill();
    ctx.restore();

    // Draw Slices
    activeItems.forEach((item, i) => {
      const startAngle = currentAngleRef.current + i * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      const color = palette[i % palette.length];
      ctx.fillStyle = color;
      ctx.fill();

      // Border between slices
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Text inside slice
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = numSlices > 14 ? 'bold 10px system-ui, sans-serif' : 'bold 12px system-ui, sans-serif';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
      ctx.shadowBlur = 3;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;

      let displayText = item.text;
      const maxLen = numSlices > 12 ? 16 : 22;
      if (displayText.length > maxLen) {
        displayText = displayText.substring(0, maxLen - 2) + '…';
      }

      ctx.fillText(displayText, radius - 18, 4);
      ctx.restore();

      ctx.restore();
    });

    // Outer Rim Border
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.restore();

    // Center Hub - Birthday Cake themed
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, 38, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 4;
    ctx.fill();

    // Inner Hub Circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
    ctx.fillStyle = activeConfig.accentColor;
    ctx.fill();

    // Center Text
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 12px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SPIN', centerX, centerY - 1);
    ctx.font = 'normal 9px system-ui, -apple-system, sans-serif';
    ctx.fillText('🎂', centerX, centerY + 13);
    ctx.restore();
  }, [activeItems, palette, activeConfig]);

  useEffect(() => {
    drawWheel();
  }, [drawWheel]);

  // Spin Animation with Physics & Needle Tick
  const handleSpin = useCallback(() => {
    if (isSpinning || activeItems.length === 0) return;

    if (soundEnabled) {
      unlockAudioContext();
      playClickSound();
    }

    setIsSpinning(true);
    setSelectedWinner(null);
    setWinnerModalOpen(false);

    const winningIndex = getSecureRandomIndex(activeItems.length);
    const numSlices = activeItems.length;
    const sliceAngle = (2 * Math.PI) / numSlices;

    const extraRounds = 5 + Math.floor(Math.random() * 3);
    const topPointerOffset = -Math.PI / 2;

    const currentNormalized = currentAngleRef.current % (2 * Math.PI);
    const sliceCenterAngle = winningIndex * sliceAngle + sliceAngle / 2;
    const targetAngle = topPointerOffset - sliceCenterAngle + extraRounds * 2 * Math.PI;

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
        setTimeout(() => setNeedleAngle(0), 55);
      }

      drawWheel();

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        const winner = activeItems[winningIndex];
        setSelectedWinner(winner);
        setWinnerModalOpen(true);

        if (soundEnabled) playWinnerFanfare();
        confetti();

        // Record History
        const newRecord: HistoryRecord = {
          id: `hist-${Date.now()}`,
          item: winner,
          modeId: activeMode,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        };
        setHistory((prev) => [newRecord, ...prev]);

        // Auto-elimination in No-Repeat mode
        if (isNoRepeat && winner) {
          setEliminatedIds((prev) => ({
            ...prev,
            [activeMode]: [...(prev[activeMode] || []), winner.id]
          }));
        }
      }
    };

    requestAnimationFrame(animate);
  }, [activeItems, isSpinning, soundEnabled, activeMode, isNoRepeat, drawWheel]);

  // Instant Pick (Quick Draw)
  const handleQuickPick = () => {
    if (isSpinning || activeItems.length === 0) return;
    if (soundEnabled) {
      unlockAudioContext();
      playClickSound();
      playWinnerFanfare();
    }
    const winningIndex = getSecureRandomIndex(activeItems.length);
    const winner = activeItems[winningIndex];
    setSelectedWinner(winner);
    setWinnerModalOpen(true);
    confetti();

    const newRecord: HistoryRecord = {
      id: `hist-${Date.now()}`,
      item: winner,
      modeId: activeMode,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    setHistory((prev) => [newRecord, ...prev]);

    if (isNoRepeat && winner) {
      setEliminatedIds((prev) => ({
        ...prev,
        [activeMode]: [...(prev[activeMode] || []), winner.id]
      }));
    }
  };

  // Add Custom Item
  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    const newItem: BirthdayItem = {
      id: `custom-${Date.now()}`,
      text: newItemText.trim(),
      subtitle: newItemSubtitle.trim() || undefined,
      category: activeMode
    };

    const updatedCurrentList = [newItem, ...rawCurrentItems];
    const newPools = {
      ...pools,
      [activeMode]: updatedCurrentList
    };
    savePools(newPools);
    setNewItemText('');
    setNewItemSubtitle('');
    showToast(`Added "${newItem.text}" to ${activeConfig.shortLabel}!`);
    if (soundEnabled) playClickSound();
  };

  // Remove Item
  const handleRemoveItem = (itemId: string) => {
    const updated = rawCurrentItems.filter((it) => it.id !== itemId);
    const newPools = {
      ...pools,
      [activeMode]: updated
    };
    savePools(newPools);
    showToast('Item removed from wheel');
  };

  // Reset Active Mode to Default Curated Preset
  const handleResetMode = () => {
    const defaultPreset = [...BIRTHDAY_MODES[activeMode].sampleItems];
    const newPools = {
      ...pools,
      [activeMode]: defaultPreset
    };
    savePools(newPools);
    setEliminatedIds((prev) => ({
      ...prev,
      [activeMode]: []
    }));
    showToast(`Reset ${activeConfig.label} to default items`);
    if (soundEnabled) playClickSound();
  };

  // Bulk Edit / Paste List
  const openBulkModal = () => {
    const currentLines = rawCurrentItems.map((it) => it.text).join('\n');
    setBulkText(currentLines);
    setBulkModalOpen(true);
  };

  const handleApplyBulkList = () => {
    const lines = bulkText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length === 0) {
      showToast('Please enter at least one item');
      return;
    }

    const newItems: BirthdayItem[] = lines.map((line, idx) => ({
      id: `bulk-${Date.now()}-${idx}`,
      text: line,
      category: activeMode
    }));

    const newPools = {
      ...pools,
      [activeMode]: newItems
    };
    savePools(newPools);
    setEliminatedIds((prev) => ({
      ...prev,
      [activeMode]: []
    }));
    setBulkModalOpen(false);
    showToast(`Updated ${activeConfig.shortLabel} with ${newItems.length} items!`);
  };

  // Save to Favorites
  const handleFavoriteWheel = () => {
    const isNowSaved = toggleWheelFavorite({
      id: `birthday-wheel-${activeMode}`,
      title: `Birthday Wheel: ${activeConfig.label}`,
      category: 'Birthday & Celebration',
      description: `Fun decision wheel for ${activeConfig.tagline}. Custom birthday decisions made easy.`,
      items: activeItems.map((it, idx) => ({ id: it.id || `b-${idx}`, text: it.text, weight: 1 })),
      paletteKey: activeMode
    });
    showToast(isNowSaved ? '❤️ Saved to Profile Favorites!' : 'Removed from Profile Favorites');
  };

  // Copy Winner
  const handleCopyWinner = () => {
    if (!selectedWinner) return;
    const text = `🎉 Birthday Wheel Winner [${activeConfig.label}]: ${selectedWinner.text}${
      selectedWinner.subtitle ? ` (${selectedWinner.subtitle})` : ''
    } – Decided on SpinWheelGames: https://spinwheelgames.org/birthday-wheel`;
    navigator.clipboard.writeText(text);
    setCopiedWinner(true);
    setTimeout(() => setCopiedWinner(false), 2000);
    showToast('Result copied to clipboard!');
  };

  // Share Winner
  const handleShareWinner = async () => {
    if (!selectedWinner) return;
    const shareData = {
      title: 'Birthday Wheel Result',
      text: `🎉 The Birthday Wheel picked: ${selectedWinner.text}${
        selectedWinner.subtitle ? ` – ${selectedWinner.subtitle}` : ''
      }!`,
      url: 'https://spinwheelgames.org/birthday-wheel'
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        handleCopyWinner();
      }
    } else {
      handleCopyWinner();
    }
  };

  // Fullscreen Toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden transition-all ${
        isFullscreen ? 'p-6 fixed inset-0 z-50 overflow-y-auto bg-slate-50 dark:bg-slate-950' : 'p-4 sm:p-6 lg:p-8'
      }`}
    >
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-slate-900/90 text-white text-xs sm:text-sm font-semibold rounded-full shadow-2xl backdrop-blur-md animate-fade-in flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Mode Selector Tabs */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <Cake className="w-5 h-5 text-rose-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Select Birthday Mode
            </span>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {activeItems.length} options ready to spin
          </span>
        </div>

        {/* 6 Mode Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {ALL_BIRTHDAY_MODE_IDS.map((modeId) => {
            const config = BIRTHDAY_MODES[modeId];
            const Icon = MODE_ICON_MAP[modeId];
            const isActive = activeMode === modeId;
            const count = pools[modeId]?.length || 0;

            return (
              <button
                key={modeId}
                onClick={() => {
                  setActiveMode(modeId);
                  setSelectedWinner(null);
                  setWinnerModalOpen(false);
                  if (soundEnabled) playClickSound();
                }}
                className={`flex flex-col items-center text-center p-3 rounded-2xl border transition-all text-xs font-semibold ${
                  isActive
                    ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-700 dark:text-rose-300 shadow-md ring-2 ring-rose-500/20'
                    : 'bg-slate-50/70 dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center mb-1.5 transition-colors ${
                    isActive
                      ? 'bg-rose-500 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 shadow-sm'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-bold leading-tight line-clamp-1">{config.shortLabel}</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                  {count} choices
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Wheel Stage + Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Center: Interactive Wheel Canvas */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-50/70 dark:bg-slate-900/40 rounded-3xl p-4 sm:p-6 border border-slate-200/60 dark:border-slate-800/80">
          {/* Wheel Pointer Needle */}
          <div className="relative flex flex-col items-center w-full max-w-[340px] sm:max-w-[420px]">
            {/* Top Needle Indicator */}
            <div
              className="z-20 -mb-3 transition-transform duration-75 origin-top"
              style={{
                transform: `rotate(${needleAngle}deg)`
              }}
            >
              <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[28px] border-t-rose-600 drop-shadow-md" />
            </div>

            {/* Canvas Wheel */}
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

          {/* Quick Action Buttons Below Wheel */}
          <div className="w-full max-w-md mt-4 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={handleSpin}
              disabled={isSpinning || activeItems.length === 0}
              className="flex-1 py-3 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-700 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-rose-500/25 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>{isSpinning ? 'Deciding…' : 'SPIN THE WHEEL'}</span>
            </button>

            <button
              onClick={handleQuickPick}
              disabled={isSpinning || activeItems.length === 0}
              className="py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm active:scale-95 transition-all flex items-center gap-1.5"
              title="Instant pick without waiting for animation"
            >
              <Shuffle className="w-4 h-4 text-rose-500" />
              <span>Quick Pick</span>
            </button>
          </div>

          {/* Controls Bar: Sound, No-Repeat, Fullscreen, Reset */}
          <div className="w-full max-w-md mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-xl border transition-colors ${
                  soundEnabled
                    ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-400'
                    : 'bg-slate-100 border-slate-200 text-slate-400 dark:bg-slate-800 dark:border-slate-700'
                }`}
                title={soundEnabled ? 'Mute sound' : 'Unmute sound'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsNoRepeat(!isNoRepeat)}
                className={`px-2.5 py-1.5 rounded-xl border text-[11px] font-bold transition-colors flex items-center gap-1.5 ${
                  isNoRepeat
                    ? 'bg-amber-50 border-amber-300 text-amber-700 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-300'
                    : 'bg-slate-100 border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400'
                }`}
                title="Eliminate winners from remaining spins"
              >
                <span>No-Repeat:</span>
                <span className={isNoRepeat ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'}>
                  {isNoRepeat ? 'ON' : 'OFF'}
                </span>
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleFavoriteWheel}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                title="Save wheel to favorites"
              >
                <Heart className="w-4 h-4 text-rose-500" />
              </button>

              <button
                onClick={handleResetMode}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                title="Reset this mode to curated defaults"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                title="Toggle Fullscreen"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Winner Display & Custom Entries Manager */}
        <div className="lg:col-span-5 space-y-4">
          {/* Winner Banner / Announcement Box */}
          {selectedWinner && (
            <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 dark:from-rose-950/40 dark:via-pink-950/30 dark:to-amber-950/20 border-2 border-rose-300 dark:border-rose-800/80 shadow-lg space-y-3 animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>The Wheel Decided!</span>
                </div>
                <span className="text-[11px] font-bold text-rose-700 dark:text-rose-300">
                  {activeConfig.shortLabel}
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {selectedWinner.text}
                </h3>
                {selectedWinner.subtitle && (
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                    {selectedWinner.subtitle}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 pt-1 flex-wrap">
                <button
                  onClick={handleSpin}
                  disabled={isSpinning}
                  className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Spin Again</span>
                </button>

                <button
                  onClick={handleCopyWinner}
                  className="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5"
                >
                  {copiedWinner ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedWinner ? 'Copied!' : 'Copy'}</span>
                </button>

                <button
                  onClick={handleShareWinner}
                  className="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5 text-rose-500" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          )}

          {/* Add Custom Entry Form */}
          <div className="p-4 sm:p-5 rounded-3xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-rose-500" />
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Add Custom to {activeConfig.shortLabel}
                </h4>
              </div>
              <button
                onClick={openBulkModal}
                className="text-[11px] font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
              >
                <ListPlus className="w-3.5 h-3.5" />
                <span>Bulk Edit / Paste List</span>
              </button>
            </div>

            <form onSubmit={handleAddCustomItem} className="space-y-2">
              <input
                type="text"
                value={newItemText}
                onChange={(e) => setNewItemText(e.target.value)}
                placeholder={activeConfig.placeholderInput}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newItemSubtitle}
                  onChange={(e) => setNewItemSubtitle(e.target.value)}
                  placeholder="Optional note / subtitle..."
                  className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <button
                  type="submit"
                  disabled={!newItemText.trim()}
                  className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-bold text-xs shadow-sm transition-colors"
                >
                  Add Entry
                </button>
              </div>
            </form>
          </div>

          {/* Current Entries List Preview with Quick Remove */}
          <div className="p-4 sm:p-5 rounded-3xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                Active Slices ({activeItems.length})
              </span>
              {currentEliminated.length > 0 && (
                <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                  {currentEliminated.length} eliminated
                </span>
              )}
            </div>

            <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
              {rawCurrentItems.map((item, index) => {
                const isEliminated = currentEliminated.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                      isEliminated
                        ? 'bg-slate-200/50 dark:bg-slate-800/40 text-slate-400 line-through'
                        : 'bg-white dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: palette[index % palette.length] }}
                      />
                      <span className="truncate font-medium">{item.text}</span>
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                      title="Remove from wheel"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* History Drawer */}
          {history.length > 0 && (
            <div className="p-4 rounded-3xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-rose-500" />
                  <span>Spin History ({history.length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const text = history
                        .map((h, i) => `${i + 1}. [${h.modeId.toUpperCase()}] ${h.item.text} (${h.timestamp})`)
                        .join('\n');
                      navigator.clipboard.writeText(text);
                      setCopiedHistory(true);
                      setTimeout(() => setCopiedHistory(false), 2000);
                      showToast('History copied to clipboard!');
                    }}
                    className="text-[11px] font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1"
                  >
                    {copiedHistory ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedHistory ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setHistory([]);
                      showToast('History cleared');
                    }}
                    className="text-[11px] font-bold text-rose-500 hover:underline"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <div className="max-h-32 overflow-y-auto space-y-1 text-xs">
                {history.map((record, i) => (
                  <div
                    key={record.id}
                    className="flex items-center justify-between py-1 px-2 rounded-lg bg-white/60 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300"
                  >
                    <span className="truncate">
                      <strong className="text-slate-500 dark:text-slate-400 mr-1.5">#{history.length - i}</strong>
                      {record.item.text}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 flex-shrink-0 ml-2">
                      {record.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bulk Edit Modal */}
      {bulkModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-scale-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ListPlus className="w-5 h-5 text-rose-500" />
                <h3 className="font-black text-slate-900 dark:text-white text-base">
                  Bulk Edit: {activeConfig.label}
                </h3>
              </div>
              <button
                onClick={() => setBulkModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Paste or type your custom list below (one item per line). This replaces current slices for this mode.
            </p>

            <textarea
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              rows={8}
              className="w-full p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="Friend Name 1&#10;Friend Name 2&#10;Friend Name 3"
            />

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setBulkModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyBulkList}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-rose-500 hover:bg-rose-600 text-white shadow-md transition-colors"
              >
                Save & Update Wheel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
