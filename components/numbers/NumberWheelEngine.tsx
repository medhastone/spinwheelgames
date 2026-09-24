'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Binary,
  RotateCw,
  Sparkles,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  RefreshCw,
  SlidersHorizontal,
  Dices,
  Hash,
  Filter,
  Ban,
  Shuffle,
  Info,
  ListOrdered,
  Layers,
  ArrowUpDown,
  FileSpreadsheet,
  X,
  Trash2,
  Heart
} from 'lucide-react';
import {
  playTickSound,
  playWinnerFanfare,
  playClickSound,
  unlockAudioContext,
  announceWinnerTTS
} from '@/lib/sound';
import { useSavedWheels, toggleWheelFavorite } from '@/lib/storage';

// Hardware-grade CSPRNG
function getCryptoRandomFloat(): number {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0] / (0xffffffff + 1);
  }
  return Math.random();
}

function getCryptoRandomInt(min: number, max: number): number {
  const range = max - min + 1;
  return min + Math.floor(getCryptoRandomFloat() * range);
}

// Preset range configurations
export const NUMBER_PRESETS = [
  { label: '1 - 4', min: 1, max: 4, badge: '4-Way' },
  { label: '1 - 6', min: 1, max: 6, badge: 'D6 Die' },
  { label: '1 - 10', min: 1, max: 10, badge: 'Classic' },
  { label: '1 - 20', min: 1, max: 20, badge: 'D20 / RPG' },
  { label: '1 - 50', min: 1, max: 50, badge: 'Bingo' },
  { label: '1 - 100', min: 1, max: 100, badge: 'Raffle' }
];

// Slice color palettes
const SLICE_COLORS = [
  '#4f46e5', // Indigo
  '#06b6d4', // Cyan
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#8b5cf6', // Violet
  '#ec4899', // Pink
  '#3b82f6', // Blue
  '#14b8a6', // Teal
  '#f97316', // Orange
  '#84cc16', // Lime
  '#6366f1'  // Blue Violet
];

type ParityFilter = 'all' | 'even' | 'odd';

export default function NumberWheelEngine() {
  // Profile Favorites Hook
  const savedWheels = useSavedWheels();
  const isGameFavorited = savedWheels.some(
    (w) => w.id === 'number-wheel' || w.title.trim().toLowerCase() === 'number spin wheel'
  );
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleFavoriteGame = () => {
    const isNowSaved = toggleWheelFavorite({
      id: 'number-wheel',
      title: 'Number Spin Wheel',
      category: 'Numbers & Math',
      description: 'Random number generator wheel with custom ranges, parity filters, and CSPRNG fairness.',
      items: Array.from({ length: 10 }, (_, i) => ({ id: `n-${i + 1}`, text: `${i + 1}`, weight: 1 })),
      paletteKey: 'cyan'
    });
    setToastMsg(isNowSaved ? '❤️ Saved Number Spin Wheel to Profile Favorites!' : 'Removed Number Wheel from Profile Favorites');
    setTimeout(() => setToastMsg(null), 2200);
  };

  // Engine View: Wheel Spinner vs Instant Generator
  const [engineMode, setEngineMode] = useState<'wheel' | 'instant'>('wheel');

  // Range Configuration
  const [minNumber, setMinNumber] = useState<number>(1);
  const [maxNumber, setMaxNumber] = useState<number>(10);
  const [activePreset, setActivePreset] = useState<string>('1 - 10');

  // Parity & Filters
  const [parity, setParity] = useState<ParityFilter>('all');
  const [excludeInput, setExcludeInput] = useState<string>('');
  const [excludedList, setExcludedList] = useState<number[]>([]);

  // Batch Generation & Unique results
  const [pickCount, setPickCount] = useState<number>(1);
  const [sortResults, setSortResults] = useState<boolean>(false);

  // Elimination / No-Repeat mode across sequential spins
  const [noRepeat, setNoRepeat] = useState<boolean>(false);
  const [eliminatedNumbers, setEliminatedNumbers] = useState<number[]>([]);

  // Wheel State
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [winningNumber, setWinningNumber] = useState<number | null>(null);
  const [instantResults, setInstantResults] = useState<number[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [spinCount, setSpinCount] = useState<number>(0);
  const [needleAngle, setNeedleAngle] = useState<number>(0);
  const [historyLog, setHistoryLog] = useState<{ id: string; numbers: number[]; timestamp: string; mode: string }[]>([]);

  // Canvas & Animation refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const currentAngleRef = useRef<number>(0);
  const [fullscreenTheater, setFullscreenTheater] = useState<boolean>(false);
  const [showWinnerModal, setShowWinnerModal] = useState<boolean>(false);

  // Synchronize browser fullscreen events
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

  // Compute active available number pool based on min, max, parity, exclusions, and eliminations
  const availableNumberPool = useMemo(() => {
    const min = Math.min(minNumber, maxNumber);
    const max = Math.max(minNumber, maxNumber);
    const pool: number[] = [];

    const exclusionSet = new Set([...excludedList, ...(noRepeat ? eliminatedNumbers : [])]);

    for (let i = min; i <= max; i++) {
      if (exclusionSet.has(i)) continue;

      if (parity === 'even' && i % 2 !== 0) continue;
      if (parity === 'odd' && i % 2 === 0) continue;

      pool.push(i);
    }

    return pool;
  }, [minNumber, maxNumber, parity, excludedList, noRepeat, eliminatedNumbers]);

  // Wheel items: If pool is <= 100, display all numbers. If pool is > 100, display a representative balanced subset for visual wheel rendering
  const wheelSlices = useMemo(() => {
    if (availableNumberPool.length === 0) return [];
    if (availableNumberPool.length <= 100) return availableNumberPool;

    // For extremely large ranges on the visual wheel, render a 60-slice window
    return availableNumberPool.slice(0, 60);
  }, [availableNumberPool]);

  // Draw Canvas Wheel
  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width; // 600
    const center = size / 2;
    const radius = center - 20;

    ctx.clearRect(0, 0, size, size);

    const items = wheelSlices;
    if (items.length === 0) {
      // Empty state wheel
      ctx.save();
      ctx.translate(center, center);
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#1e1f2b';
      ctx.fill();
      ctx.strokeStyle = '#4e4e66';
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.fillStyle = '#a0a0b8';
      ctx.font = 'bold 20px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('No Numbers Available', 0, -10);
      ctx.font = '14px system-ui, sans-serif';
      ctx.fillText('Adjust range, filters, or reset exclusions', 0, 18);
      ctx.restore();
      return;
    }

    const arc = (2 * Math.PI) / items.length;

    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(currentAngleRef.current);

    // Draw slices
    items.forEach((num, i) => {
      const angle = i * arc;
      ctx.beginPath();
      ctx.fillStyle = SLICE_COLORS[i % SLICE_COLORS.length];
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, angle, angle + arc);
      ctx.closePath();
      ctx.fill();

      // Slice border line
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = items.length > 50 ? 1 : items.length > 20 ? 2 : 3;
      ctx.stroke();

      // Number text
      ctx.save();
      ctx.rotate(angle + arc / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';

      // Dynamic font scaling according to number of slices
      let fontSize = 24;
      if (items.length > 50) fontSize = 11;
      else if (items.length > 30) fontSize = 13;
      else if (items.length > 20) fontSize = 16;
      else if (items.length > 12) fontSize = 19;

      ctx.font = `bold ${fontSize}px system-ui, -apple-system, sans-serif`;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
      ctx.shadowBlur = 4;

      const numStr = String(num);
      ctx.fillText(numStr, radius - (items.length > 40 ? 14 : 24), fontSize / 3);
      ctx.restore();
    });

    // Outer rim
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 6;
    ctx.stroke();

    // Center Hub
    ctx.beginPath();
    ctx.arc(0, 0, 48, 0, 2 * Math.PI);
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Center Text
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 16px system-ui, sans-serif';
    ctx.fillText('SPIN', 0, 0);

    ctx.restore();
  }, [wheelSlices]);

  // Redraw whenever slices change
  useEffect(() => {
    drawWheel();
  }, [drawWheel]);

  // Execute Wheel Spin with CSPRNG
  const spinWheel = useCallback(() => {
    if (isSpinning || availableNumberPool.length === 0) return;

    unlockAudioContext();
    setIsSpinning(true);
    setWinningNumber(null);
    setInstantResults([]);
    setShowWinnerModal(false);
    playClickSound(soundEnabled, 0.8);

    const items = wheelSlices;
    const winnerIndex = Math.floor(getCryptoRandomFloat() * items.length);
    const winner = items[winnerIndex];

    const arc = (2 * Math.PI) / items.length;
    // Pointer is at 12 o'clock (3PI/2)
    const targetAngle = (3 * Math.PI) / 2 - (winnerIndex + 0.5) * arc;

    // 6 to 9 full revolutions
    const extraRotations = (6 + Math.floor(getCryptoRandomFloat() * 4)) * 2 * Math.PI;
    const startAngle = currentAngleRef.current % (2 * Math.PI);
    const totalRotation = extraRotations + (targetAngle - startAngle);

    const duration = 3600;
    const startTime = performance.now();
    let lastTickSlice = -1;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Deceleration curve
      const easeOut = 1 - Math.pow(1 - progress, 3.4);
      const current = startAngle + totalRotation * easeOut;
      currentAngleRef.current = current;

      // Calculate slice under the pointer
      const pointerNormalizedAngle = (((3 * Math.PI) / 2 - current) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
      const currentSliceIdx = Math.floor(pointerNormalizedAngle / arc);

      if (currentSliceIdx !== lastTickSlice) {
        lastTickSlice = currentSliceIdx;
        playTickSound(soundEnabled, 'carnival', 0.8);
        setNeedleAngle(progress < 0.7 ? -14 : -7);
        setTimeout(() => setNeedleAngle(0), 40);
      }

      drawWheel();

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        setWinningNumber(winner);
        setShowWinnerModal(true);
        setInstantResults([winner]);
        setSpinCount((prev) => prev + 1);
        if (soundEnabled) {
          playWinnerFanfare(soundEnabled, 'arcade', 0.85);
          announceWinnerTTS(String(winner), { enabled: true, prefix: 'The winning number is' });
        }

        // Record history
        const record = {
          id: `spin-${Date.now()}`,
          numbers: [winner],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          mode: `Wheel (${minNumber}-${maxNumber})`
        };
        setHistoryLog((prev) => [record, ...prev.slice(0, 19)]);

        // Confetti
        try {
          confetti({
            particleCount: 75,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore
        }

        // Elimination handling
        if (noRepeat) {
          setEliminatedNumbers((prev) => [...prev, winner]);
        }
      }
    };

    requestAnimationFrame(animate);
  }, [isSpinning, availableNumberPool, wheelSlices, soundEnabled, noRepeat, minNumber, maxNumber, drawWheel]);

  // Execute Instant Multi-Number Generator Mode
  const generateInstantNumbers = useCallback(() => {
    if (availableNumberPool.length === 0) return;
    unlockAudioContext();
    playClickSound(soundEnabled, 0.8);

    const count = Math.min(pickCount, availableNumberPool.length);
    const poolCopy = [...availableNumberPool];
    const picked: number[] = [];

    // Draw unique numbers using CSPRNG Fisher-Yates shuffle
    for (let i = 0; i < count; i++) {
      const randIdx = Math.floor(getCryptoRandomFloat() * poolCopy.length);
      picked.push(poolCopy[randIdx]);
      poolCopy.splice(randIdx, 1);
    }

    const finalResults = sortResults ? [...picked].sort((a, b) => a - b) : picked;

    setInstantResults(finalResults);
    setWinningNumber(finalResults.length === 1 ? finalResults[0] : null);
    setSpinCount((prev) => prev + 1);
    playWinnerFanfare(soundEnabled, 'arcade', 0.75);

    // Record in history
    const record = {
      id: `instant-${Date.now()}`,
      numbers: finalResults,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      mode: `Instant (${finalResults.length} picks)`
    };
    setHistoryLog((prev) => [record, ...prev.slice(0, 19)]);

    try {
      confetti({ particleCount: 50, spread: 55 });
    } catch {
      // ignore
    }

    if (noRepeat) {
      setEliminatedNumbers((prev) => [...prev, ...finalResults]);
    }
  }, [availableNumberPool, pickCount, sortResults, soundEnabled, noRepeat]);

  // Preset Selection Handler
  const handleSelectPreset = (preset: typeof NUMBER_PRESETS[0]) => {
    unlockAudioContext();
    playClickSound(soundEnabled, 0.7);
    setMinNumber(preset.min);
    setMaxNumber(preset.max);
    setActivePreset(preset.label);
    setWinningNumber(null);
    setInstantResults([]);
  };

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

  // Keyboard shortcut listener: Spacebar to spin/generate, F for fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }
      if (e.code === 'Space' || e.key === 'Enter') {
        e.preventDefault();
        if (engineMode === 'wheel') {
          spinWheel();
        } else {
          generateInstantNumbers();
        }
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [engineMode, spinWheel, generateInstantNumbers, toggleFullscreen]);

  // Add Exclusions from text input
  const handleAddExclusion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!excludeInput.trim()) return;
    unlockAudioContext();
    playClickSound(soundEnabled, 0.7);

    const parsed = excludeInput
      .split(/[\s,]+/)
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n));

    if (parsed.length > 0) {
      setExcludedList((prev) => Array.from(new Set([...prev, ...parsed])));
      setExcludeInput('');
    }
  };

  // Remove single exclusion
  const handleRemoveExclusion = (num: number) => {
    unlockAudioContext();
    playClickSound(soundEnabled, 0.7);
    setExcludedList((prev) => prev.filter((n) => n !== num));
  };

  // Reset all exclusions
  const handleClearExclusions = () => {
    unlockAudioContext();
    playClickSound(soundEnabled, 0.7);
    setExcludedList([]);
  };

  // Reset elimination list
  const handleResetEliminations = () => {
    unlockAudioContext();
    playClickSound(soundEnabled, 0.7);
    setEliminatedNumbers([]);
  };

  // Copy result text
  const handleCopyResults = () => {
    if (instantResults.length === 0) return;
    unlockAudioContext();
    const text = instantResults.join(', ');
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      playClickSound(soundEnabled, 0.7);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Statistics calculation for instant batch
  const batchStats = useMemo(() => {
    if (instantResults.length === 0) return null;
    const sum = instantResults.reduce((acc, val) => acc + val, 0);
    const avg = (sum / instantResults.length).toFixed(1);
    const min = Math.min(...instantResults);
    const max = Math.max(...instantResults);
    const evenCount = instantResults.filter((n) => n % 2 === 0).length;
    const oddCount = instantResults.length - evenCount;

    return { sum, avg, min, max, evenCount, oddCount };
  }, [instantResults]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full transition-all ${
        isFullscreen
          ? 'fixed inset-0 z-50 overflow-y-auto bg-[#faf8fd] dark:bg-[#0f1019] p-4 sm:p-6 lg:p-8 min-h-screen text-gray-900 dark:text-gray-100 flex flex-col'
          : 'rounded-2xl bg-white dark:bg-[#161722] border border-[#eeedf7] dark:border-[#272838] shadow-xl p-4 sm:p-6'
      }`}
    >
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <span>{toastMsg}</span>
        </div>
      )}

      <div className="w-full max-w-6xl mx-auto flex flex-col flex-1">
        {/* TOP BAR / MODE CONTROLLER */}
        <div className="w-full flex flex-wrap items-center justify-between gap-3 border-b border-[#eeedf7] dark:border-[#272838] pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Binary className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                Number Spin Wheel
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
                Random number picker with range controls, filters, and batch generator
              </p>
            </div>
          </div>

          {/* Mode Switcher & Tools */}
          <div className="flex items-center gap-2">
            <div className="bg-gray-100 dark:bg-[#20212e] p-1 rounded-xl flex items-center gap-1 border border-gray-200/50 dark:border-gray-800">
              <button
                type="button"
                onClick={() => {
                  unlockAudioContext();
                  setEngineMode('wheel');
                  playClickSound(soundEnabled, 0.7);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  engineMode === 'wheel'
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Dices className="w-3.5 h-3.5" />
                <span>Wheel Mode</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  unlockAudioContext();
                  setEngineMode('instant');
                  playClickSound(soundEnabled, 0.7);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  engineMode === 'instant'
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Generator</span>
              </button>
            </div>

            {/* Audio Mute Toggle */}
            <button
              type="button"
              onClick={() => {
                unlockAudioContext();
                const nextState = !soundEnabled;
                setSoundEnabled(nextState);
                if (nextState) playClickSound(true, 0.8);
              }}
              className={`p-2 rounded-xl transition-all cursor-pointer border ${
                soundEnabled
                  ? 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900/50'
                  : 'bg-gray-100 dark:bg-[#20212e] text-gray-400 border-transparent hover:bg-gray-200 dark:hover:bg-[#2a2b3c]'
              }`}
              title={soundEnabled ? 'Mute wheel audio' : 'Enable wheel audio'}
              aria-label={soundEnabled ? 'Mute audio' : 'Enable audio'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Fullscreen & Theater Toggle */}
            {isFullscreen && (
              <button
                type="button"
                onClick={() => setFullscreenTheater(!fullscreenTheater)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border flex items-center gap-1.5 ${
                  fullscreenTheater
                    ? 'bg-indigo-700 text-white border-indigo-800 shadow-sm'
                    : 'bg-gray-100 dark:bg-[#20212e] text-gray-700 dark:text-gray-300 border-gray-200/60 dark:border-gray-800 hover:bg-gray-200 dark:hover:bg-[#2a2b3c]'
                }`}
                title={fullscreenTheater ? 'Show sidebar cards' : 'Hide sidebar for giant theater wheel'}
              >
                <span>{fullscreenTheater ? 'Show Sidebar' : 'Giant Theater'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={toggleFullscreen}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border flex items-center gap-1.5 ${
                isFullscreen
                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm'
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

        {/* CONTROLS & RANGE CONFIGURATION BAR */}
        <div className="w-full space-y-3.5 mb-5 bg-[#f8f7fd] dark:bg-[#1a1b28] p-3.5 sm:p-4 rounded-xl border border-[#ebe8f7] dark:border-[#27283c]">
          {/* Quick Range Presets (1-4, 1-6, 1-10, 1-20, 1-50, 1-100) */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Presets:
            </span>
            {NUMBER_PRESETS.map((p) => {
              const isSelected = activePreset === p.label && minNumber === p.min && maxNumber === p.max;
              return (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => handleSelectPreset(p)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                      : 'bg-white dark:bg-[#242536] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#2c2d40]'
                  }`}
                >
                  <span>{p.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {p.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Custom Min / Max Inputs, Parity Filter & Elimination */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#eeedf7] dark:border-[#262738]">
            {/* Min and Max Range Inputs */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1.5 text-xs text-gray-700 dark:text-gray-300">
                <span className="font-semibold text-gray-500">Min:</span>
                <input
                  type="number"
                  value={minNumber}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    if (!isNaN(val)) {
                      setMinNumber(val);
                      setActivePreset('Custom');
                    }
                  }}
                  className="w-16 px-2 py-1 text-xs text-center font-bold rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#242536] text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center gap-1.5 text-xs text-gray-700 dark:text-gray-300">
                <span className="font-semibold text-gray-500">Max:</span>
                <input
                  type="number"
                  value={maxNumber}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    if (!isNaN(val)) {
                      setMaxNumber(val);
                      setActivePreset('Custom');
                    }
                  }}
                  className="w-16 px-2 py-1 text-xs text-center font-bold rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#242536] text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Parity Filter (All, Even, Odd) */}
              <div className="flex items-center gap-1 bg-white dark:bg-[#242536] p-0.5 rounded-lg border border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => {
                    unlockAudioContext();
                    setParity('all');
                    playClickSound(soundEnabled, 0.7);
                  }}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer ${
                    parity === 'all'
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'
                  }`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => {
                    unlockAudioContext();
                    setParity('even');
                    playClickSound(soundEnabled, 0.7);
                  }}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer ${
                    parity === 'even'
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'
                  }`}
                  title="Only even numbers (2, 4, 6...)"
                >
                  Even
                </button>
                <button
                  type="button"
                  onClick={() => {
                    unlockAudioContext();
                    setParity('odd');
                    playClickSound(soundEnabled, 0.7);
                  }}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer ${
                    parity === 'odd'
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'
                  }`}
                  title="Only odd numbers (1, 3, 5...)"
                >
                  Odd
                </button>
              </div>

              {/* No-Repeat Elimination Toggle */}
              <button
                type="button"
                onClick={() => {
                  unlockAudioContext();
                  setNoRepeat(!noRepeat);
                  playClickSound(soundEnabled, 0.7);
                }}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  noRepeat
                    ? 'bg-purple-600 text-white shadow-sm font-semibold'
                    : 'bg-white dark:bg-[#242536] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#2c2d40]'
                }`}
                title="Eliminate drawn numbers so they never repeat until reset"
              >
                <Shuffle className="w-3 h-3" />
                <span>No Repeat</span>
              </button>

              {eliminatedNumbers.length > 0 && (
                <button
                  type="button"
                  onClick={handleResetEliminations}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 hover:bg-red-100 transition-colors cursor-pointer"
                  title="Restore all eliminated numbers to pool"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset Eliminated ({eliminatedNumbers.length})</span>
                </button>
              )}
            </div>

            {/* Instant Mode Batch Count & Sort Settings */}
            {engineMode === 'instant' && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-xs text-gray-700 dark:text-gray-300">
                  <span className="font-semibold text-gray-500">Draw Count:</span>
                  <select
                    value={pickCount}
                    onChange={(e) => setPickCount(Number(e.target.value))}
                    aria-label="Number of items to pick"
                    className="bg-white dark:bg-[#242536] border border-gray-200 dark:border-gray-700 text-xs rounded-lg px-2 py-1 text-gray-800 dark:text-gray-200 cursor-pointer font-bold"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20, 25, 50].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'number' : 'numbers'}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    unlockAudioContext();
                    setSortResults(!sortResults);
                    playClickSound(soundEnabled, 0.7);
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                    sortResults
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-300 dark:border-indigo-800 font-semibold'
                      : 'bg-white dark:bg-[#242536] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50'
                  }`}
                  title="Sort drawn numbers ascending"
                >
                  <ArrowUpDown className="w-3 h-3" />
                  <span>Sort Ascending</span>
                </button>
              </div>
            )}
          </div>

          {/* Excluded Numbers Manager */}
          <div className="pt-2.5 border-t border-[#eeedf7] dark:border-[#262738] flex flex-wrap items-center justify-between gap-2">
            <form onSubmit={handleAddExclusion} className="flex items-center gap-2 flex-1 max-w-md">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-1 shrink-0">
                <Ban className="w-3.5 h-3.5 text-red-500" /> Exclude:
              </span>
              <input
                type="text"
                value={excludeInput}
                onChange={(e) => setExcludeInput(e.target.value)}
                placeholder="e.g. 13, 7, 4..."
                className="flex-1 px-2.5 py-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#242536] text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-[#2d2e42] hover:bg-gray-300 text-gray-800 dark:text-gray-200 text-xs font-semibold cursor-pointer transition-colors"
              >
                Add
              </button>
            </form>

            {/* Excluded numbers chips */}
            {excludedList.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-gray-400">Excluded ({excludedList.length}):</span>
                {excludedList.map((num) => (
                  <span
                    key={num}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50"
                  >
                    <span>{num}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveExclusion(num)}
                      className="hover:text-red-800 dark:hover:text-red-300 font-bold ml-0.5"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <button
                  type="button"
                  onClick={handleClearExclusions}
                  className="text-[11px] text-gray-400 hover:text-red-500 underline ml-1 cursor-pointer"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>
        </div>

        {/* MAIN DISPLAY VIEWPORT */}
        {engineMode === 'wheel' ? (
          /* WHEEL MODE LAYOUT */
          <div
            className={`grid grid-cols-1 ${
              isFullscreen && fullscreenTheater
                ? 'max-w-4xl mx-auto w-full'
                : isFullscreen
                ? 'xl:grid-cols-12 gap-6 xl:gap-8 items-center w-full max-w-7xl mx-auto'
                : 'lg:grid-cols-12 gap-6 lg:gap-8 items-center w-full my-auto'
            }`}
          >
            {/* Wheel Canvas Column */}
            <div
              className={`${
                isFullscreen && fullscreenTheater
                  ? 'col-span-1 p-6'
                  : isFullscreen
                  ? 'xl:col-span-8 lg:col-span-7'
                  : 'lg:col-span-7'
              } flex flex-col items-center justify-center relative`}
            >
              {/* Pointer Indicator (Top 12 o'clock) */}
              <div className="relative flex justify-center w-full">
                <div
                  className="absolute -top-3.5 z-20 w-0 h-0 transition-transform duration-75 origin-top"
                  style={{
                    borderLeft: '14px solid transparent',
                    borderRight: '14px solid transparent',
                    borderTop: '28px solid #ef4444',
                    filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.35))',
                    transform: `rotate(${needleAngle}deg)`
                  }}
                />
              </div>

              {/* Canvas Component */}
              <div
                className={`relative flex items-center justify-center transition-all duration-300 ${
                  isFullscreen
                    ? 'w-full max-w-[min(90vw,74vh,740px)] aspect-square'
                    : 'w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] lg:w-[420px] lg:h-[420px]'
                }`}
              >
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={600}
                  onClick={spinWheel}
                  className={`w-full h-full cursor-pointer select-none transition-transform duration-200 ${
                    isSpinning ? 'scale-[0.99]' : 'hover:scale-[1.01]'
                  }`}
                />
              </div>

              {/* Action Buttons */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3 w-full max-w-md">
                <button
                  type="button"
                  onClick={spinWheel}
                  disabled={isSpinning || availableNumberPool.length === 0}
                  className="flex-1 py-3 px-6 rounded-xl font-headline font-bold text-sm sm:text-base text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 shadow-lg shadow-indigo-500/25 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
                  <span>{isSpinning ? 'Spinning...' : 'SPIN NUMBER WHEEL'}</span>
                  <kbd className="hidden sm:inline text-[10px] font-normal px-2 py-0.5 rounded bg-white/20 text-white ml-1">
                    Space
                  </kbd>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    unlockAudioContext();
                    setEngineMode('instant');
                    setTimeout(() => generateInstantNumbers(), 50);
                  }}
                  disabled={availableNumberPool.length === 0}
                  className="py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-gray-100 dark:bg-[#20212e] text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-[#2c2d3e] transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Switch to instant generator to draw immediately"
                >
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  <span>Instant Draw</span>
                </button>
              </div>

              <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-2 text-center">
                {availableNumberPool.length} numbers in pool • Press <kbd className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-800 text-[10px]">Space</kbd> to spin • <kbd className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-800 text-[10px]">F</kbd> for fullscreen
              </p>
            </div>

            {/* Results & History Column */}
            {(!isFullscreen || !fullscreenTheater) && (
              <div className={`${isFullscreen ? 'xl:col-span-4 lg:col-span-5' : 'lg:col-span-5'} flex flex-col gap-4`}>
              {winningNumber !== null ? (
                <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50/50 dark:from-[#18192b] dark:to-[#151624] border border-indigo-200/80 dark:border-indigo-500/20 shadow-md text-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center justify-center gap-1.5 mb-2">
                    <Sparkles className="w-4 h-4" /> Result Selected
                  </span>

                  <div className="text-6xl sm:text-7xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight my-2">
                    {winningNumber}
                  </div>

                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-4">
                    {winningNumber % 2 === 0 ? 'Even Number' : 'Odd Number'} • Range {minNumber} to {maxNumber}
                  </p>

                  <div className="flex items-center justify-center gap-2 pt-3 border-t border-indigo-200/60 dark:border-indigo-500/20">
                    <button
                      type="button"
                      onClick={handleCopyResults}
                      className="py-2 px-3 rounded-lg text-xs font-semibold bg-white dark:bg-[#242536] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={spinWheel}
                      disabled={isSpinning}
                      className="py-2 px-4 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Spin Again</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-[#f8f7fd] dark:bg-[#1a1b28] border border-[#eceaf6] dark:border-[#27283c] text-center flex flex-col items-center justify-center min-h-[200px]">
                  <div className="w-12 h-12 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-3">
                    <Binary className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-gray-800 dark:text-gray-200 mb-1">
                    Ready to Spin
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
                    Select your range preset or type custom bounds above, then press <strong>SPIN</strong> or tap <strong>Spacebar</strong>.
                  </p>
                </div>
              )}

              {/* History Log */}
              {historyLog.length > 0 && (
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#1d1e2b] border border-gray-200/70 dark:border-gray-800 text-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1">
                      <ListOrdered className="w-3.5 h-3.5 text-indigo-500" /> Recent Rolls ({historyLog.length})
                    </span>
                    <button
                      type="button"
                      onClick={() => setHistoryLog([])}
                      className="text-[10px] text-gray-400 hover:text-red-500 cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                    {historyLog.map((log) => (
                      <div
                        key={log.id}
                        className="flex items-center justify-between py-1 px-2 rounded bg-white dark:bg-[#232435] border border-gray-200/60 dark:border-gray-700/60 text-[11px]"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-indigo-600 dark:text-indigo-400">
                            {log.numbers.join(', ')}
                          </span>
                          <span className="text-[10px] text-gray-400">({log.mode})</span>
                        </div>
                        <span className="text-[10px] text-gray-400">{log.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          </div>
        ) : (
          /* INSTANT GENERATOR MODE LAYOUT */
          <div className="w-full space-y-6 my-auto">
            {/* Draw Button & Top Action */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 border border-indigo-500/20">
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  Instant Number Generator
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Drawing {pickCount} unique {pickCount === 1 ? 'number' : 'numbers'} between {minNumber} and {maxNumber}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={generateInstantNumbers}
                  disabled={availableNumberPool.length === 0}
                  className="py-2.5 px-6 rounded-xl font-headline font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20 active:scale-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>GENERATE {pickCount > 1 ? `(${pickCount})` : ''}</span>
                  <kbd className="text-[10px] font-normal px-2 py-0.5 rounded bg-white/20 text-white ml-1">
                    Enter
                  </kbd>
                </button>
              </div>
            </div>

            {/* Generated Numbers Grid */}
            {instantResults.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-indigo-500" /> Generated Outcome ({instantResults.length})
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyResults}
                    className="py-1 px-3 rounded-lg text-xs font-semibold bg-white dark:bg-[#242536] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied to Clipboard!' : 'Copy Numbers'}</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2.5 sm:gap-3 p-4 sm:p-6 rounded-2xl bg-[#f8f7fd] dark:bg-[#1a1b28] border border-[#eceaf6] dark:border-[#27283c] justify-center items-center">
                  {instantResults.map((num, idx) => (
                    <div
                      key={idx}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white dark:bg-[#222334] border-2 border-indigo-400 dark:border-indigo-600 shadow-md flex items-center justify-center text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400 animate-in fade-in zoom-in-95 duration-200"
                    >
                      {num}
                    </div>
                  ))}
                </div>

                {/* Batch Statistics Bar */}
                {batchStats && instantResults.length > 1 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                    <div className="p-3 rounded-xl bg-white dark:bg-[#1f202f] border border-gray-200 dark:border-gray-800 text-center">
                      <span className="text-[10px] uppercase font-bold text-gray-400">Sum Total</span>
                      <p className="text-base font-extrabold text-gray-900 dark:text-white">{batchStats.sum}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-[#1f202f] border border-gray-200 dark:border-gray-800 text-center">
                      <span className="text-[10px] uppercase font-bold text-gray-400">Average</span>
                      <p className="text-base font-extrabold text-gray-900 dark:text-white">{batchStats.avg}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-[#1f202f] border border-gray-200 dark:border-gray-800 text-center">
                      <span className="text-[10px] uppercase font-bold text-gray-400">Min / Max</span>
                      <p className="text-base font-extrabold text-gray-900 dark:text-white">
                        {batchStats.min} / {batchStats.max}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-[#1f202f] border border-gray-200 dark:border-gray-800 text-center">
                      <span className="text-[10px] uppercase font-bold text-gray-400">Even / Odd</span>
                      <p className="text-base font-extrabold text-gray-900 dark:text-white">
                        {batchStats.evenCount}E / {batchStats.oddCount}O
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-[#f8f7fd] dark:bg-[#1a1b28] border border-[#eceaf6] dark:border-[#27283c] text-center flex flex-col items-center justify-center min-h-[220px]">
                <div className="w-12 h-12 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-3">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-gray-800 dark:text-gray-200 mb-1">
                  Ready to Generate
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
                  Click <strong>GENERATE</strong> or press <strong>Enter</strong> to instantly draw {pickCount} unique random number(s).
                </p>
              </div>
            )}
          </div>
        )}

        {/* PROVABLE FAIRNESS FOOTER BADGE */}
        <div className="mt-5 pt-4 border-t border-[#eeedf7] dark:border-[#272838] flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <Info className="w-4 h-4 text-indigo-500 shrink-0" />
            <span>
              Hardware CSPRNG entropy via <code>crypto.getRandomValues</code>. Zero algorithmic bias or repetition patterns.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>Pool Size: <strong>{availableNumberPool.length}</strong></span>
            <span>•</span>
            <span>Total Drawn: <strong>{spinCount}</strong></span>
          </div>
        </div>
      </div>

      {/* NUMBER WINNER CELEBRATION MODAL (Rendered inside container so it always pops up in Fullscreen) */}
      {showWinnerModal && winningNumber !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-sm bg-white dark:bg-[#1e1f2f] rounded-3xl p-6 sm:p-8 border border-indigo-200 dark:border-indigo-500/20 shadow-2xl animate-in zoom-in-95 duration-150 text-center flex flex-col items-center">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowWinnerModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-[#2c2d42] transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 mb-2">
              Drawn Outcome • Spin #{spinCount}
            </span>

            {/* Glowing Big Number Display */}
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-xl shadow-indigo-500/30 my-2 text-4xl sm:text-5xl font-extrabold font-headline animate-bounce">
              {winningNumber}
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-2">
              Number Selected
            </h3>

            {/* Spoken Voice Announcer Button */}
            <div className="mt-1 flex items-center justify-center">
              <button
                type="button"
                onClick={() =>
                  announceWinnerTTS(String(winningNumber), {
                    enabled: true,
                    prefix: 'The winning number is'
                  })
                }
                className="px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Speak number out loud"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>🔊 Speak Number</span>
              </button>
            </div>

            {/* Number Properties */}
            <div className="w-full grid grid-cols-2 gap-2 my-4 text-xs">
              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#161725] border border-gray-100 dark:border-gray-800">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Parity</span>
                <span className="font-bold text-gray-800 dark:text-gray-200">
                  {winningNumber % 2 === 0 ? 'Even (2n)' : 'Odd (2n+1)'}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#161725] border border-gray-100 dark:border-gray-800">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Range Pool</span>
                <span className="font-bold text-gray-800 dark:text-gray-200">
                  {minNumber} – {maxNumber}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowWinnerModal(false);
                  spinWheel();
                }}
                disabled={isSpinning || availableNumberPool.length === 0}
                className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/25 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Spin Again</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setEliminatedNumbers((prev) => [...prev, winningNumber]);
                  setShowWinnerModal(false);
                }}
                className="py-3 px-4 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                title="Remove number from the pool"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Eliminate</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
