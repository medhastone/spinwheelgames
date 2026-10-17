'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Link from 'next/link';
import confetti from '@/lib/confetti';
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
  X,
  Trash2,
  Heart,
  ChevronDown,
  ChevronUp,
  Download,
  ArrowLeftRight,
  Plus,
  Minus,
  CheckCircle2,
  Award,
  Play,
  RotateCcw,
  Sliders,
  List,
  History,
  ShieldCheck,
  Zap
} from 'lucide-react';
import {
  playTickSound,
  playWinnerFanfare,
  playClickSound,
  unlockAudioContext,
  announceWinnerTTS
} from '@/lib/sound';
import { useSavedWheels, toggleWheelFavorite } from '@/lib/storage';

// Hardware-grade CSPRNG via Web Cryptography API
function getCryptoRandomFloat(): number {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0] / (0xffffffff + 1);
  }
  return Math.random();
}

// Preset range configurations
export const NUMBER_PRESETS = [
  { label: '1 - 10', min: 1, max: 10, badge: 'Popular', desc: '1 to 10 Decider' },
  { label: '1 - 20', min: 1, max: 20, badge: 'D20 / RPG', desc: 'Tabletop RPG' },
  { label: '1 - 50', min: 1, max: 50, badge: 'Bingo', desc: 'Bingo & Roster' },
  { label: '1 - 100', min: 1, max: 100, badge: 'Century', desc: 'Raffle & D100' },
  { label: '1 - 4', min: 1, max: 4, badge: '4-Way', desc: '4-Way Choices' },
  { label: '1 - 6', min: 1, max: 6, badge: 'D6 Die', desc: 'Classic D6 Die' },
  { label: '1 - 12', min: 1, max: 12, badge: 'D12 / Clock', desc: 'Hours & Months' },
  { label: '1 - 1000', min: 1, max: 1000, badge: 'Mega Raffle', desc: 'Large Draw' }
];

// High-contrast, mathematically balanced slice colors
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
type SidebarTab = 'range' | 'filters' | 'history' | 'instant';

export default function NumberWheelEngine() {
  // Profile Favorites Hook
  const savedWheels = useSavedWheels();
  const isGameFavorited = savedWheels.some(
    (w) => w.id === 'random-number-wheel' || w.id === 'number-wheel' || w.title.trim().toLowerCase().includes('number')
  );
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleFavoriteGame = () => {
    const isNowSaved = toggleWheelFavorite({
      id: 'random-number-wheel',
      title: 'Random Number Wheel',
      category: 'Numbers & Math',
      description: 'Random number generator wheel with 1-10, 1-20, 1-50, 1-100 ranges, multi-draws, and CSPRNG fairness.',
      items: Array.from({ length: 10 }, (_, i) => ({ id: `n-${i + 1}`, text: `${i + 1}`, weight: 1 })),
      paletteKey: 'cyan'
    });
    setToastMsg(isNowSaved ? '❤️ Saved Random Number Wheel to Profile Favorites!' : 'Removed Number Wheel from Profile Favorites');
    setTimeout(() => setToastMsg(null), 2200);
  };

  // Engine View: Wheel Spinner vs Instant Generator
  const [engineMode, setEngineMode] = useState<'wheel' | 'instant'>('wheel');
  const [sidebarTab, setSidebarTab] = useState<SidebarTab>('range');

  // Range Configuration
  const [minNumber, setMinNumber] = useState<number>(1);
  const [maxNumber, setMaxNumber] = useState<number>(10);
  const [activePreset, setActivePreset] = useState<string>('1 - 10');

  // Parity & Filters
  const [parity, setParity] = useState<ParityFilter>('all');
  const [excludeInput, setExcludeInput] = useState<string>('');
  const [excludedList, setExcludedList] = useState<number[]>([]);
  const [showExcludeDrawer, setShowExcludeDrawer] = useState<boolean>(false);

  // Batch Generation & Multiple Numbers
  const [wheelDrawCount, setWheelDrawCount] = useState<number>(1);
  const [pickCount, setPickCount] = useState<number>(1);
  const [sortResults, setSortResults] = useState<'none' | 'asc' | 'desc'>('asc');
  const [allowDuplicates, setAllowDuplicates] = useState<boolean>(false);

  // Elimination / No-Repeat Mode
  const [noRepeat, setNoRepeat] = useState<boolean>(false);
  const [eliminatedNumbers, setEliminatedNumbers] = useState<number[]>([]);

  // Wheel State
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [multiSpinStep, setMultiSpinStep] = useState<{ current: number; total: number } | null>(null);
  const [winningNumber, setWinningNumber] = useState<number | null>(null);
  const [currentDrawnBatch, setCurrentDrawnBatch] = useState<number[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [spinCount, setSpinCount] = useState<number>(0);
  const [needleAngle, setNeedleAngle] = useState<number>(0);
  const [historyLog, setHistoryLog] = useState<{ id: string; numbers: number[]; timestamp: string; mode: string }[]>([]);

  // Canvas & Animation refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const workspaceRef = useRef<HTMLDivElement | null>(null);
  const currentAngleRef = useRef<number>(0);
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

  // Compute eligible numbers pool
  const availableNumberPool = useMemo(() => {
    const start = Math.min(minNumber, maxNumber);
    const end = Math.max(minNumber, maxNumber);
    const pool: number[] = [];
    const excludedSet = new Set([...excludedList, ...(noRepeat ? eliminatedNumbers : [])]);

    for (let i = start; i <= end; i++) {
      if (excludedSet.has(i)) continue;
      if (parity === 'even' && i % 2 !== 0) continue;
      if (parity === 'odd' && i % 2 === 0) continue;
      pool.push(i);
    }
    return pool;
  }, [minNumber, maxNumber, excludedList, eliminatedNumbers, noRepeat, parity]);

  // Visual wheel slices
  const wheelSlices = useMemo(() => {
    if (availableNumberPool.length === 0) return [];
    if (availableNumberPool.length <= 60) return availableNumberPool;
    return availableNumberPool.slice(0, 60);
  }, [availableNumberPool]);

  // Total numbers in raw range
  const totalRangeCount = useMemo(() => {
    const start = Math.min(minNumber, maxNumber);
    const end = Math.max(minNumber, maxNumber);
    let count = 0;
    for (let i = start; i <= end; i++) {
      if (parity === 'even' && i % 2 !== 0) continue;
      if (parity === 'odd' && i % 2 === 0) continue;
      count++;
    }
    return count;
  }, [minNumber, maxNumber, parity]);

  // Draw Canvas Wheel with High-DPI 800x800 coordinate space
  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 800;
    if (canvas.width !== size || canvas.height !== size) {
      canvas.width = size;
      canvas.height = size;
    }
    const center = size / 2; // 400
    const radius = center - 28; // 372

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
      ctx.lineWidth = 5;
      ctx.stroke();
      ctx.fillStyle = '#a0a0b8';
      ctx.font = 'bold 26px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('All Numbers Drawn!', 0, -14);
      ctx.font = '16px system-ui, sans-serif';
      ctx.fillText('Click Reset Pool to Restore Numbers', 0, 22);
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
      ctx.lineWidth = items.length > 40 ? 1.5 : items.length > 20 ? 3 : 4;
      ctx.stroke();

      // Number text
      ctx.save();
      ctx.rotate(angle + arc / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';

      let fontSize = 32;
      if (items.length > 45) fontSize = 14;
      else if (items.length > 30) fontSize = 17;
      else if (items.length > 20) fontSize = 22;
      else if (items.length > 10) fontSize = 28;

      ctx.font = `bold ${fontSize}px system-ui, -apple-system, sans-serif`;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
      ctx.shadowBlur = 6;

      const numStr = String(num);
      ctx.fillText(numStr, radius - (items.length > 35 ? 18 : 30), fontSize / 3);
      ctx.restore();
    });

    // Outer rim ring
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 8;
    ctx.stroke();

    // Center Hub
    ctx.beginPath();
    ctx.arc(0, 0, 64, 0, 2 * Math.PI);
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 5;
    ctx.stroke();

    // Center Hub Text
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 20px system-ui, sans-serif';
    ctx.fillText('SPIN', 0, 0);

    ctx.restore();
  }, [wheelSlices]);

  // Redraw on slices change or resize
  useEffect(() => {
    drawWheel();
    const handleResize = () => drawWheel();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawWheel]);

  // Execute Wheel Spin with Hardware CSPRNG
  const spinWheel = useCallback(() => {
    if (isSpinning || availableNumberPool.length === 0) return;

    unlockAudioContext();
    setIsSpinning(true);
    setWinningNumber(null);
    setCurrentDrawnBatch([]);
    setShowWinnerModal(false);
    playClickSound(soundEnabled, 0.8);

    // If multiple numbers are requested on the wheel (wheelDrawCount > 1)
    if (wheelDrawCount > 1) {
      const totalToPick = Math.min(wheelDrawCount, availableNumberPool.length);
      const drawnSoFar: number[] = [];
      let tempPool = [...availableNumberPool];

      const runNextSpin = (stepIndex: number) => {
        setMultiSpinStep({ current: stepIndex + 1, total: totalToPick });

        const winnerIndexInPool = Math.floor(getCryptoRandomFloat() * tempPool.length);
        const winner = tempPool[winnerIndexInPool];
        tempPool = tempPool.filter((n) => n !== winner);

        const items = wheelSlices;
        const sliceIdx = items.indexOf(winner) !== -1 ? items.indexOf(winner) : Math.floor(getCryptoRandomFloat() * items.length);

        const arc = (2 * Math.PI) / items.length;
        const targetAngle = (3 * Math.PI) / 2 - (sliceIdx + 0.5) * arc;
        const extraRotations = (5 + Math.floor(getCryptoRandomFloat() * 3)) * 2 * Math.PI;
        const startAngle = currentAngleRef.current % (2 * Math.PI);
        const totalRotation = extraRotations + (targetAngle - startAngle);

        const duration = 2800;
        const startTime = performance.now();
        let lastTickSlice = -1;
        const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = easeOutCubic(progress);

          const current = startAngle + totalRotation * eased;
          currentAngleRef.current = current;

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
            drawnSoFar.push(winner);
            setCurrentDrawnBatch([...drawnSoFar]);
            setWinningNumber(winner);

            if (noRepeat) {
              setEliminatedNumbers((prev) => Array.from(new Set([...prev, winner])));
            }

            if (stepIndex + 1 < totalToPick && tempPool.length > 0) {
              setTimeout(() => {
                runNextSpin(stepIndex + 1);
              }, 600);
            } else {
              setIsSpinning(false);
              setMultiSpinStep(null);
              setShowWinnerModal(true);
              setSpinCount((prev) => prev + 1);

              if (soundEnabled) {
                playWinnerFanfare(soundEnabled, 'arcade', 0.85);
                announceWinnerTTS(drawnSoFar.join(', '), { enabled: true, prefix: 'Winning numbers are' });
              }

              const record = {
                id: `spin-multi-${Date.now()}`,
                numbers: [...drawnSoFar],
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                mode: `Wheel Multi (${drawnSoFar.length})`
              };
              setHistoryLog((prev) => [record, ...prev.slice(0, 24)]);

              try {
                confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
              } catch {
                // ignore
              }
            }
          }
        };

        requestAnimationFrame(animate);
      };

      runNextSpin(0);
      return;
    }

    // Standard Single Spin
    const items = wheelSlices;
    const winnerInPoolIndex = Math.floor(getCryptoRandomFloat() * availableNumberPool.length);
    const winner = availableNumberPool[winnerInPoolIndex];

    const sliceIdx = items.indexOf(winner) !== -1 ? items.indexOf(winner) : Math.floor(getCryptoRandomFloat() * items.length);

    const arc = (2 * Math.PI) / items.length;
    const targetAngle = (3 * Math.PI) / 2 - (sliceIdx + 0.5) * arc;
    const extraRotations = (6 + Math.floor(getCryptoRandomFloat() * 4)) * 2 * Math.PI;
    const startAngle = currentAngleRef.current % (2 * Math.PI);
    const totalRotation = extraRotations + (targetAngle - startAngle);

    const duration = 3600;
    const startTime = performance.now();
    let lastTickSlice = -1;
    const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);

      const current = startAngle + totalRotation * eased;
      currentAngleRef.current = current;

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
        setCurrentDrawnBatch([winner]);
        setShowWinnerModal(true);
        setSpinCount((prev) => prev + 1);

        if (noRepeat) {
          setEliminatedNumbers((prev) => Array.from(new Set([...prev, winner])));
        }

        if (soundEnabled) {
          playWinnerFanfare(soundEnabled, 'arcade', 0.85);
          announceWinnerTTS(String(winner), { enabled: true, prefix: 'The winning number is' });
        }

        const record = {
          id: `spin-${Date.now()}`,
          numbers: [winner],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          mode: `Wheel (${minNumber}–${maxNumber})`
        };
        setHistoryLog((prev) => [record, ...prev.slice(0, 24)]);

        try {
          confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 } });
        } catch {
          // ignore
        }
      }
    };

    requestAnimationFrame(animate);
  }, [
    isSpinning,
    availableNumberPool,
    wheelSlices,
    soundEnabled,
    minNumber,
    maxNumber,
    wheelDrawCount,
    noRepeat,
    drawWheel
  ]);

  // Instant Batch Generator with Fisher-Yates CSPRNG
  const generateInstantNumbers = useCallback(() => {
    if (availableNumberPool.length === 0) return;
    unlockAudioContext();
    playClickSound(soundEnabled, 0.8);

    const chosen: number[] = [];

    if (allowDuplicates) {
      for (let i = 0; i < pickCount; i++) {
        const idx = Math.floor(getCryptoRandomFloat() * availableNumberPool.length);
        chosen.push(availableNumberPool[idx]);
      }
    } else {
      const pool = [...availableNumberPool];
      const needed = Math.min(pickCount, pool.length);
      for (let i = 0; i < needed; i++) {
        const idx = Math.floor(getCryptoRandomFloat() * pool.length);
        chosen.push(pool[idx]);
        pool.splice(idx, 1);
      }
    }

    if (sortResults === 'asc') {
      chosen.sort((a, b) => a - b);
    } else if (sortResults === 'desc') {
      chosen.sort((a, b) => b - a);
    }

    setCurrentDrawnBatch(chosen);
    setWinningNumber(chosen[0] ?? null);
    setSpinCount((prev) => prev + 1);

    if (noRepeat && !allowDuplicates) {
      setEliminatedNumbers((prev) => Array.from(new Set([...prev, ...chosen])));
    }

    if (soundEnabled) {
      playWinnerFanfare(soundEnabled, 'arcade', 0.8);
      if (chosen.length <= 5) {
        announceWinnerTTS(chosen.join(', '), { enabled: true, prefix: 'Numbers are' });
      }
    }

    const record = {
      id: `instant-${Date.now()}`,
      numbers: chosen,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      mode: `Instant (${chosen.length})`
    };
    setHistoryLog((prev) => [record, ...prev.slice(0, 24)]);

    try {
      confetti({ particleCount: 65, spread: 65, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
  }, [availableNumberPool, pickCount, sortResults, soundEnabled, noRepeat, allowDuplicates]);

  // Preset Selection Handler
  const handleSelectPreset = (preset: typeof NUMBER_PRESETS[0]) => {
    unlockAudioContext();
    playClickSound(soundEnabled, 0.7);
    setMinNumber(preset.min);
    setMaxNumber(preset.max);
    setActivePreset(preset.label);
    setWinningNumber(null);
    setCurrentDrawnBatch([]);
  };

  // Swap Min and Max Range
  const handleSwapRange = () => {
    unlockAudioContext();
    playClickSound(soundEnabled, 0.7);
    const temp = minNumber;
    setMinNumber(maxNumber);
    setMaxNumber(temp);
    setActivePreset('Custom');
  };

  const adjustMin = (delta: number) => {
    setMinNumber((prev) => prev + delta);
    setActivePreset('Custom');
  };

  const adjustMax = (delta: number) => {
    setMaxNumber((prev) => prev + delta);
    setActivePreset('Custom');
  };

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    unlockAudioContext();
    playClickSound(soundEnabled, 0.7);
    if (!workspaceRef.current) return;
    if (!document.fullscreenElement) {
      workspaceRef.current.requestFullscreen().catch(() => {});
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

  // Add Exclusions
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

  const handleRemoveExclusion = (num: number) => {
    unlockAudioContext();
    playClickSound(soundEnabled, 0.7);
    setExcludedList((prev) => prev.filter((n) => n !== num));
  };

  const handleClearExclusions = () => {
    unlockAudioContext();
    playClickSound(soundEnabled, 0.7);
    setExcludedList([]);
  };

  const handleRestoreEliminated = (num: number) => {
    unlockAudioContext();
    playClickSound(soundEnabled, 0.7);
    setEliminatedNumbers((prev) => prev.filter((n) => n !== num));
  };

  const handleResetEliminations = () => {
    unlockAudioContext();
    playClickSound(soundEnabled, 0.7);
    setEliminatedNumbers([]);
    setToastMsg('✨ All eliminated numbers restored to the pool!');
    setTimeout(() => setToastMsg(null), 2000);
  };

  // Copy result text
  const handleCopyResults = () => {
    const list = currentDrawnBatch.length > 0 ? currentDrawnBatch : winningNumber !== null ? [winningNumber] : [];
    if (list.length === 0) return;
    unlockAudioContext();
    const text = list.join(', ');
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      playClickSound(soundEnabled, 0.7);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyHistory = () => {
    if (historyLog.length === 0) return;
    const text = historyLog
      .map((h, i) => `#${historyLog.length - i} [${h.timestamp}] (${h.mode}): ${h.numbers.join(', ')}`)
      .join('\n');
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setToastMsg('📋 Copied full spin history to clipboard!');
      setTimeout(() => setToastMsg(null), 2000);
    }
  };

  const handleExportCSV = () => {
    if (historyLog.length === 0) return;
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Index,Timestamp,Mode,Numbers\n' +
      historyLog
        .map((h, i) => `${historyLog.length - i},"${h.timestamp}","${h.mode}","${h.numbers.join('; ')}"`)
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `number_spin_history_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Statistics calculation for drawn numbers
  const drawnStats = useMemo(() => {
    const list = currentDrawnBatch.length > 0 ? currentDrawnBatch : winningNumber !== null ? [winningNumber] : [];
    if (list.length === 0) return null;
    const sum = list.reduce((acc, val) => acc + val, 0);
    const avg = (sum / list.length).toFixed(1);
    const min = Math.min(...list);
    const max = Math.max(...list);
    const evenCount = list.filter((n) => n % 2 === 0).length;
    const oddCount = list.length - evenCount;
    return { sum, avg, min, max, evenCount, oddCount, count: list.length };
  }, [currentDrawnBatch, winningNumber]);

  return (
    <div
      ref={workspaceRef}
      aria-label="Interactive Number Spin Wheel Workspace"
      className={`w-full max-w-[1440px] mx-auto flex flex-col gap-4 transition-all ${
        isFullscreen
          ? 'fixed inset-0 z-50 bg-[#fbf8ff] dark:bg-[#0d0e15] p-3 sm:p-6 overflow-y-auto flex items-center justify-center'
          : ''
      }`}
    >
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TWO-COLUMN WORKSPACE (EXACT HOMEPAGE ARCHITECTURE)                        */}
      {/* Left: Dominant Centered Wheel Stage (~800–960px)                         */}
      {/* Right: Sleek Configuration Card (~340–360px)                              */}
      {/* ========================================================================= */}
      <div className="w-full flex flex-col lg:flex-row items-stretch justify-center gap-4 sm:gap-5 lg:gap-6">
        
        {/* ------------------------------------------------------------------------- */}
        {/* LEFT COLUMN: Large Centered Wheel Stage                                   */}
        {/* ------------------------------------------------------------------------- */}
        <div className="flex-1 w-full lg:min-w-0 bg-white dark:bg-[#0f1017] rounded-3xl border border-[#eeedf7] dark:border-[#20212f] p-3 sm:p-5 lg:p-6 flex flex-col justify-between items-center shadow-lg dark:shadow-xl relative min-h-[auto] sm:min-h-[560px] lg:min-h-[620px] xl:min-h-[660px] transition-colors overflow-hidden">
          
          {/* Top Stage Bar */}
          <div className="w-full flex items-center justify-between z-10 gap-2">
            {/* Range & Mode Info Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4f2fd] dark:bg-[#1b1c28] border border-[#eeedf7] dark:border-[#2e3042] text-xs font-bold text-[#464554] dark:text-[#c7c4d7]">
              <span>{activePreset === 'Custom' ? `${minNumber}–${maxNumber}` : activePreset}</span>
              <span className="text-[10px] text-[#4648d4] dark:text-[#8587ff]">({availableNumberPool.length} in pool)</span>
              {parity !== 'all' && (
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 capitalize">
                  {parity}
                </span>
              )}
            </div>

            {/* Quick Utility Actions */}
            <div className="flex items-center gap-1.5">
              {/* Segmented Mode Button (Wheel vs Instant) */}
              <div className="bg-[#f4f2fd] dark:bg-[#14151e] p-0.5 rounded-xl border border-[#eeedf7] dark:border-[#2e3042] flex items-center">
                <button
                  type="button"
                  onClick={() => {
                    unlockAudioContext();
                    setEngineMode('wheel');
                    playClickSound(soundEnabled, 0.7);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                    engineMode === 'wheel'
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Dices className="w-3 h-3" />
                  <span className="hidden sm:inline">Wheel</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    unlockAudioContext();
                    setEngineMode('instant');
                    setSidebarTab('instant');
                    playClickSound(soundEnabled, 0.7);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                    engineMode === 'instant'
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span className="hidden sm:inline">Instant</span>
                </button>
              </div>

              {/* Mute Button */}
              <button
                type="button"
                onClick={() => {
                  unlockAudioContext();
                  const nextState = !soundEnabled;
                  setSoundEnabled(nextState);
                  if (nextState) playClickSound(true, 0.8);
                }}
                className="p-2 rounded-xl bg-[#f4f2fd] dark:bg-[#1b1c28] text-[#464554] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white border border-[#eeedf7] dark:border-[#2e3042] transition-colors cursor-pointer"
                title={soundEnabled ? 'Mute wheel audio' : 'Enable wheel audio'}
                aria-label="Toggle sound"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Fullscreen Button */}
              <button
                type="button"
                onClick={toggleFullscreen}
                className="p-2 rounded-xl bg-[#f4f2fd] dark:bg-[#1b1c28] text-[#464554] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white border border-[#eeedf7] dark:border-[#2e3042] transition-colors cursor-pointer"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Wheel'}
                aria-label="Toggle fullscreen"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Large Wheel Canvas Container (Centered Horizontally and Vertically) */}
          <div className="w-full flex-1 flex flex-col items-center justify-center py-4 sm:py-6 relative">
            {/* Multi-Spin Step Progress Pill */}
            {multiSpinStep && (
              <div className="mb-2 px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-md animate-pulse">
                <span>Drawing Winner #{multiSpinStep.current} of {multiSpinStep.total}...</span>
              </div>
            )}

            {/* Wheel Canvas with Precision Pointer Needle */}
            <div
              className={`relative flex items-center justify-center transition-all duration-300 touch-manipulation mx-auto ${
                isFullscreen
                  ? 'w-full max-w-[min(90vw,68vh,680px)] aspect-square'
                  : 'w-full max-w-[min(88vw,340px)] sm:max-w-[400px] md:max-w-[440px] lg:max-w-[480px] xl:max-w-[520px] aspect-square'
              }`}
            >
              {/* Precision SVG Pointer Needle Anchored to 12 o'clock */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 transition-transform duration-75 origin-top pointer-events-none drop-shadow-md"
                style={{ transform: `rotate(${needleAngle}deg)` }}
              >
                <svg width="30" height="36" viewBox="0 0 28 34" fill="none">
                  <path d="M14 34L4 6C4 2.5 8 0 14 0C20 0 24 2.5 24 6L14 34Z" fill="#ef4444" />
                  <circle cx="14" cy="6" r="3.5" fill="#ffffff" />
                  <circle cx="14" cy="6" r="2" fill="#991b1b" />
                </svg>
              </div>

              <canvas
                ref={canvasRef}
                width={800}
                height={800}
                onClick={spinWheel}
                className={`w-full h-full cursor-pointer select-none transition-transform duration-200 touch-manipulation ${
                  isSpinning ? 'scale-[0.99]' : 'hover:scale-[1.01]'
                }`}
              />
            </div>

            {/* Mobile Only: Immediate Result Card below the Wheel */}
            <div className="w-full max-w-sm mx-auto lg:hidden mt-3">
              {winningNumber !== null || currentDrawnBatch.length > 0 ? (
                <div className="p-3.5 rounded-2xl bg-[#f4f2fd] dark:bg-[#161726] border border-indigo-200 dark:border-indigo-900/50 text-center">
                  <div className="flex items-center justify-between text-[11px] font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Outcome
                    </span>
                    <span className="text-gray-400">Spin #{spinCount}</span>
                  </div>

                  {currentDrawnBatch.length > 1 ? (
                    <div className="flex flex-wrap items-center justify-center gap-1.5 my-1.5">
                      {currentDrawnBatch.map((n, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-xl bg-white dark:bg-[#202132] font-black text-xl text-indigo-600 dark:text-indigo-400 shadow-2xs border border-indigo-100 dark:border-indigo-800"
                        >
                          {n}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="text-4xl font-black text-indigo-600 dark:text-indigo-400 my-1 tabular-nums animate-in zoom-in-95">
                      {winningNumber}
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-1.5 pt-2 border-t border-indigo-100 dark:border-indigo-900/40">
                    <button
                      type="button"
                      onClick={handleCopyResults}
                      className="py-1.5 px-3 rounded-lg text-xs font-semibold bg-white dark:bg-[#202132] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 flex items-center gap-1 cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={spinWheel}
                      disabled={isSpinning}
                      className="py-1.5 px-3 rounded-lg text-xs font-bold bg-indigo-600 text-white flex items-center gap-1 cursor-pointer shadow-sm"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Spin Again</span>
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* Bottom Stage Toolbar */}
          <div className="w-full pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#eeedf7] dark:border-[#1e1f2d]">
            {/* Action Bar (Icons on Left) */}
            <div className="flex items-center justify-between w-full sm:w-auto gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleResetEliminations}
                  className="p-2.5 rounded-xl bg-[#f4f2fd] dark:bg-[#1b1c28] text-[#464554] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white border border-[#eeedf7] dark:border-[#2e3042] transition-colors cursor-pointer"
                  title="Reset / Restore Pool"
                  aria-label="Reset pool"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleSwapRange}
                  className="p-2.5 rounded-xl bg-[#f4f2fd] dark:bg-[#1b1c28] text-[#464554] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white border border-[#eeedf7] dark:border-[#2e3042] transition-colors cursor-pointer"
                  title="Swap Min and Max"
                  aria-label="Swap range"
                >
                  <ArrowLeftRight className="w-4 h-4" />
                </button>

                {winningNumber !== null && (
                  <button
                    type="button"
                    onClick={() =>
                      announceWinnerTTS(
                        currentDrawnBatch.length > 0 ? currentDrawnBatch.join(', ') : String(winningNumber),
                        { enabled: true, prefix: 'The winning number is' }
                      )
                    }
                    className="p-2.5 rounded-xl bg-[#f4f2fd] dark:bg-[#1b1c28] text-indigo-600 hover:text-indigo-800 border border-[#eeedf7] dark:border-[#2e3042] transition-colors cursor-pointer"
                    title="Speak winning number"
                    aria-label="Speak winner"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Mobile CSPRNG Badge */}
              <span className="sm:hidden inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#f4f2fd] dark:bg-[#14151e] border border-[#eeedf7] dark:border-[#2e3042] text-[10px] font-bold text-emerald-600 font-mono">
                <ShieldCheck className="w-3 h-3" />
                <span>Web Crypto</span>
              </span>
            </div>

            {/* Center: Large Spin Button (Matching Homepage SpinButton) */}
            <div className="w-full sm:flex-1 sm:max-w-sm flex items-center justify-center">
              <button
                type="button"
                onClick={spinWheel}
                disabled={isSpinning || availableNumberPool.length === 0}
                id="main-spin-button"
                aria-label={isSpinning ? 'Number wheel is spinning' : 'Spin the number wheel'}
                className={`relative w-full py-3.5 sm:py-4 px-6 sm:px-8 rounded-2xl font-headline font-bold text-[17px] sm:text-[19px] tracking-wide shadow-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer select-none ${
                  isSpinning
                    ? 'bg-gradient-to-r from-[#5052e4] to-[#7678f5] text-white opacity-90 cursor-not-allowed scale-[0.98]'
                    : availableNumberPool.length === 0
                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed opacity-60'
                    : 'bg-gradient-to-r from-[#4648d4] via-[#5b5de8] to-[#4648d4] hover:from-[#5052e4] hover:to-[#6a6cf8] active:scale-[0.97] text-white shadow-[0_8px_24px_rgba(70,72,212,0.38)]'
                }`}
              >
                {isSpinning ? (
                  <div className="flex items-center gap-2">
                    <RotateCw className="w-5 h-5 animate-spin" />
                    <span>SPINNING...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Play className="w-5 h-5 fill-current" />
                    <span>
                      {wheelDrawCount > 1
                        ? `SPIN FOR ${wheelDrawCount} NUMBERS`
                        : 'SPIN NUMBER WHEEL'}
                    </span>
                  </div>
                )}
              </button>
            </div>

            {/* Right: Desktop Web Crypto Badge */}
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#f4f2fd] dark:bg-[#14151e] border border-[#eeedf7] dark:border-[#2e3042] text-[11px] font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Web Crypto CSPRNG</span>
              </span>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------------- */}
        {/* RIGHT COLUMN: Sleek Configuration Card (~340–360px on Desktop)            */}
        {/* ------------------------------------------------------------------------- */}
        <div className="w-full lg:w-[340px] xl:w-[360px] shrink-0 flex flex-col gap-3">
          
          <div className="bg-white dark:bg-[#0f1017] text-[#1a1b22] dark:text-white rounded-3xl border border-[#eeedf7] dark:border-[#20212f] p-4 sm:p-5 shadow-lg dark:shadow-xl flex flex-col gap-3.5 transition-colors">
            
            {/* Breadcrumb Navigation */}
            <div className="text-[11px] text-[#767586] dark:text-[#908fa1] flex items-center gap-1.5 font-medium truncate">
              <Link href="/" className="hover:text-[#1a1b22] dark:hover:text-white transition-colors">
                Home
              </Link>
              <span>›</span>
              <span className="text-[#464554] dark:text-[#c7c4d7]">Numbers</span>
              <span>›</span>
              <span className="text-[#4648d4] dark:text-[#8587ff] font-semibold truncate">
                Random Number Wheel
              </span>
            </div>

            {/* Title & Short Description */}
            <div className="space-y-1 border-b border-[#eeedf7] dark:border-[#1e1f2d] pb-3">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-headline font-black text-xl sm:text-2xl text-[#1a1b22] dark:text-white tracking-tight">
                  Random Number Wheel
                </h2>
                <button
                  type="button"
                  onClick={handleFavoriteGame}
                  className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                    isGameFavorited
                      ? 'bg-rose-500/10 dark:bg-rose-500/20 border-rose-500/40 text-rose-500 dark:text-rose-400'
                      : 'bg-[#f4f2fd] dark:bg-[#1b1c28] border-[#eeedf7] dark:border-[#2e3042] text-[#767586] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white'
                  }`}
                  title={isGameFavorited ? 'Saved to favorites' : 'Save to favorites'}
                  aria-label="Toggle favorite"
                >
                  <Heart className={`w-4 h-4 ${isGameFavorited ? 'fill-rose-500' : ''}`} />
                </button>
              </div>
              <p className="text-xs text-[#464554] dark:text-[#908fa1] leading-relaxed line-clamp-2">
                Choose ranges (1-10, 1-20, 1-50, 1-100), custom bounds, multiple numbers, and no-repeat mode.
              </p>
            </div>

            {/* Segment Tabs: [Presets & Range] | [Smart Filters] | [History (X)] */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-[#f4f2fd] dark:bg-[#14151e] rounded-xl border border-[#eeedf7] dark:border-[#20212f]">
              <button
                type="button"
                onClick={() => setSidebarTab('range')}
                className={`py-1.5 px-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  sidebarTab === 'range'
                    ? 'bg-[#4648d4] text-white shadow-xs'
                    : 'text-[#767586] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Ranges</span>
              </button>

              <button
                type="button"
                onClick={() => setSidebarTab('filters')}
                className={`py-1.5 px-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  sidebarTab === 'filters'
                    ? 'bg-[#4648d4] text-white shadow-xs'
                    : 'text-[#767586] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white'
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>

              <button
                type="button"
                onClick={() => setSidebarTab('history')}
                className={`py-1.5 px-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  sidebarTab === 'history'
                    ? 'bg-[#4648d4] text-white shadow-xs'
                    : 'text-[#767586] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>Logs ({historyLog.length})</span>
              </button>
            </div>

            {/* =================================================================== */}
            {/* TAB 1: PRESETS & RANGE CONTROLS                                     */}
            {/* =================================================================== */}
            {sidebarTab === 'range' && (
              <div className="space-y-3.5">
                {/* Quick Presets Grid */}
                <div>
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                    Quick Range Presets:
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {NUMBER_PRESETS.map((p) => {
                      const isSelected = activePreset === p.label && minNumber === p.min && maxNumber === p.max;
                      return (
                        <button
                          key={p.label}
                          type="button"
                          onClick={() => handleSelectPreset(p)}
                          className={`p-2 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center justify-between border ${
                            isSelected
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm font-bold'
                              : 'bg-[#f4f2fd] dark:bg-[#161726] border-[#eeedf7] dark:border-[#28293d] text-gray-700 dark:text-gray-300 hover:border-indigo-400'
                          }`}
                        >
                          <span>{p.label}</span>
                          <span className={`text-[9px] px-1 py-0.2 rounded ${isSelected ? 'bg-white/20 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                            {p.badge}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Range Inputs */}
                <div className="p-3 rounded-2xl bg-[#f4f2fd] dark:bg-[#161726] border border-[#eeedf7] dark:border-[#28293d] space-y-2">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                    Custom Range Boundaries:
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-white dark:bg-[#202132] p-1.5 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Min:</span>
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
                        className="w-14 text-center font-bold text-xs bg-transparent focus:outline-none"
                      />
                      <div className="flex flex-col">
                        <button type="button" onClick={() => adjustMin(1)} className="text-[9px] text-gray-400 hover:text-indigo-600">▲</button>
                        <button type="button" onClick={() => adjustMin(-1)} className="text-[9px] text-gray-400 hover:text-indigo-600">▼</button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleSwapRange}
                      className="p-2 rounded-xl bg-white dark:bg-[#202132] border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-indigo-600 cursor-pointer"
                      title="Swap Min and Max"
                    >
                      <ArrowLeftRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex-1 bg-white dark:bg-[#202132] p-1.5 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Max:</span>
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
                        className="w-14 text-center font-bold text-xs bg-transparent focus:outline-none"
                      />
                      <div className="flex flex-col">
                        <button type="button" onClick={() => adjustMax(1)} className="text-[9px] text-gray-400 hover:text-indigo-600">▲</button>
                        <button type="button" onClick={() => adjustMax(-1)} className="text-[9px] text-gray-400 hover:text-indigo-600">▼</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Multiple Numbers (Draw Count) in Wheel Mode */}
                <div className="p-3 rounded-2xl bg-[#f4f2fd] dark:bg-[#161726] border border-[#eeedf7] dark:border-[#28293d] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      Draw Multiple Winners:
                    </span>
                    <span className="text-[11px] text-indigo-600 font-bold">
                      {wheelDrawCount} {wheelDrawCount === 1 ? 'number' : 'numbers'}
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-1">
                    {[1, 2, 3, 4, 5].map((cnt) => (
                      <button
                        key={cnt}
                        type="button"
                        onClick={() => setWheelDrawCount(cnt)}
                        className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          wheelDrawCount === cnt
                            ? 'bg-indigo-600 text-white shadow-2xs'
                            : 'bg-white dark:bg-[#202132] border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'
                        }`}
                      >
                        {cnt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Desktop Winner Card */}
                {winningNumber !== null && (
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50/50 dark:from-[#18192b] dark:to-[#151624] border border-indigo-200 dark:border-indigo-800 text-center">
                    <span className="text-[10px] font-bold uppercase text-indigo-600 tracking-wider block mb-1">
                      Latest Result
                    </span>
                    <div className="text-4xl font-black text-indigo-600 dark:text-indigo-400 tabular-nums">
                      {winningNumber}
                    </div>
                    <div className="flex items-center justify-center gap-1.5 mt-2">
                      <button
                        type="button"
                        onClick={handleCopyResults}
                        className="py-1 px-2.5 rounded-lg text-[11px] font-semibold bg-white dark:bg-[#202132] border border-gray-200 text-gray-700 flex items-center gap-1 cursor-pointer"
                      >
                        {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        <span>Copy</span>
                      </button>
                      <button
                        type="button"
                        onClick={spinWheel}
                        disabled={isSpinning}
                        className="py-1 px-3 rounded-lg text-[11px] font-bold bg-indigo-600 text-white cursor-pointer"
                      >
                        Spin Again
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* =================================================================== */}
            {/* TAB 2: SMART FILTERS & NO-REPEAT MODE                               */}
            {/* =================================================================== */}
            {sidebarTab === 'filters' && (
              <div className="space-y-3.5">
                {/* Parity Filter */}
                <div className="p-3 rounded-2xl bg-[#f4f2fd] dark:bg-[#161726] border border-[#eeedf7] dark:border-[#28293d] space-y-2">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                    Parity Filter:
                  </span>
                  <div className="grid grid-cols-3 gap-1 p-0.5 bg-white dark:bg-[#202132] rounded-xl border border-gray-200 dark:border-gray-700">
                    {(['all', 'even', 'odd'] as const).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => {
                          unlockAudioContext();
                          setParity(m);
                          playClickSound(soundEnabled, 0.7);
                        }}
                        className={`py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer capitalize ${
                          parity === m
                            ? 'bg-indigo-600 text-white shadow-2xs'
                            : 'text-gray-600 dark:text-gray-300'
                        }`}
                      >
                        {m === 'all' ? 'All' : m === 'even' ? 'Even (2n)' : 'Odd (2n+1)'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* No-Repeat Elimination Mode Toggle */}
                <div className="p-3 rounded-2xl bg-[#f4f2fd] dark:bg-[#161726] border border-[#eeedf7] dark:border-[#28293d] space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-gray-800 dark:text-white block">
                        No-Repeat Mode
                      </span>
                      <span className="text-[10px] text-gray-400">
                        Eliminates landed numbers
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        unlockAudioContext();
                        setNoRepeat(!noRepeat);
                        playClickSound(soundEnabled, 0.7);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        noRepeat
                          ? 'bg-purple-600 text-white shadow-sm'
                          : 'bg-white dark:bg-[#202132] border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {noRepeat ? 'Enabled' : 'Disabled'}
                    </button>
                  </div>

                  {eliminatedNumbers.length > 0 && (
                    <div className="pt-2 border-t border-gray-200/60 dark:border-gray-700/60 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-purple-600 font-bold">
                          Eliminated ({eliminatedNumbers.length}):
                        </span>
                        <button
                          type="button"
                          onClick={handleResetEliminations}
                          className="text-gray-400 hover:text-red-500 underline cursor-pointer"
                        >
                          Restore All
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                        {eliminatedNumbers.map((num) => (
                          <span
                            key={num}
                            onClick={() => handleRestoreEliminated(num)}
                            className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-[10px] cursor-pointer"
                            title="Click to restore"
                          >
                            <span>{num}</span>
                            <span className="text-gray-400 hover:text-purple-900">×</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Exclusions Blacklist */}
                <div className="p-3 rounded-2xl bg-[#f4f2fd] dark:bg-[#161726] border border-[#eeedf7] dark:border-[#28293d] space-y-2">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                    Blacklist Exclusions:
                  </span>
                  <form onSubmit={handleAddExclusion} className="flex gap-1.5">
                    <input
                      type="text"
                      value={excludeInput}
                      onChange={(e) => setExcludeInput(e.target.value)}
                      placeholder="e.g. 13, 7, 4"
                      className="flex-1 px-2.5 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#202132] text-xs focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold cursor-pointer"
                    >
                      Add
                    </button>
                  </form>

                  {excludedList.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {excludedList.map((num) => (
                        <span
                          key={num}
                          className="px-2 py-0.5 rounded text-[11px] bg-red-100 dark:bg-red-950/40 text-red-600 flex items-center gap-1"
                        >
                          <span>{num}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveExclusion(num)}
                            className="font-bold cursor-pointer"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      <button
                        type="button"
                        onClick={handleClearExclusions}
                        className="text-[10px] text-gray-400 hover:text-red-500 underline ml-1 cursor-pointer"
                      >
                        Clear
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* =================================================================== */}
            {/* TAB 3: RESULT HISTORY & AUDIT LOG                                   */}
            {/* =================================================================== */}
            {sidebarTab === 'history' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-600 dark:text-gray-300">
                    Logged Rolls ({historyLog.length})
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyHistory}
                      className="text-[10px] text-indigo-600 font-bold hover:underline cursor-pointer"
                    >
                      Copy All
                    </button>
                    <button
                      type="button"
                      onClick={handleExportCSV}
                      className="text-[10px] text-gray-500 hover:text-indigo-600 font-bold flex items-center gap-0.5 cursor-pointer"
                    >
                      <Download className="w-3 h-3" /> CSV
                    </button>
                    <button
                      type="button"
                      onClick={() => setHistoryLog([])}
                      className="text-[10px] text-gray-400 hover:text-red-500 cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                {historyLog.length > 0 ? (
                  <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                    {historyLog.map((log) => (
                      <div
                        key={log.id}
                        className="flex items-center justify-between py-1.5 px-2.5 rounded-xl bg-[#f4f2fd] dark:bg-[#161726] border border-[#eeedf7] dark:border-[#28293d] text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
                            {log.numbers.join(', ')}
                          </span>
                          <span className="text-[10px] text-gray-400">({log.mode})</span>
                        </div>
                        <span className="text-[10px] text-gray-400">{log.timestamp}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-xs text-gray-400">
                    No spin logs yet. Tap SPIN to record results!
                  </div>
                )}
              </div>
            )}

            {/* =================================================================== */}
            {/* TAB 4: INSTANT GENERATOR CONTROLS (when activated)                  */}
            {/* =================================================================== */}
            {sidebarTab === 'instant' && (
              <div className="space-y-3.5">
                <div className="p-3 rounded-2xl bg-[#f4f2fd] dark:bg-[#161726] border border-[#eeedf7] dark:border-[#28293d] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                      Batch Draw Count:
                    </span>
                    <select
                      value={pickCount}
                      onChange={(e) => setPickCount(Number(e.target.value))}
                      className="bg-white dark:bg-[#202132] border border-gray-200 dark:border-gray-700 text-xs rounded-lg px-2.5 py-1 font-bold cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20, 25, 30, 50].map((n) => (
                        <option key={n} value={n}>
                          {n} numbers
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => setAllowDuplicates(!allowDuplicates)}
                      className="text-xs text-gray-500 hover:text-indigo-600 underline cursor-pointer"
                    >
                      {allowDuplicates ? 'Repeats: Allowed' : 'Repeats: Unique Only'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSortResults(sortResults === 'asc' ? 'desc' : 'asc')}
                      className="text-xs text-gray-500 hover:text-indigo-600 underline cursor-pointer"
                    >
                      Sort: {sortResults === 'asc' ? 'Low→High' : 'High→Low'}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={generateInstantNumbers}
                    disabled={availableNumberPool.length === 0}
                    className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer mt-2"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate Instant Batch</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* WINNER CELEBRATION MODAL                                                  */}
      {/* ========================================================================= */}
      {showWinnerModal && (winningNumber !== null || currentDrawnBatch.length > 0) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-white dark:bg-[#1e1f2f] rounded-3xl p-5 sm:p-7 border border-indigo-200 dark:border-indigo-500/20 shadow-2xl animate-in zoom-in-95 duration-200 text-center flex flex-col items-center max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowWinnerModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-[#2c2d42] transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 mb-2">
              Drawn Outcome • Spin #{spinCount}
            </span>

            {/* Drawn Numbers Center Display */}
            {currentDrawnBatch.length > 1 ? (
              <div className="flex flex-wrap items-center justify-center gap-2.5 my-3">
                {currentDrawnBatch.map((n, idx) => (
                  <div
                    key={idx}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center text-3xl font-black shadow-lg shadow-indigo-500/30 animate-bounce tabular-nums"
                  >
                    {n}
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-xl shadow-indigo-500/30 my-3 text-5xl font-black font-headline animate-bounce tabular-nums">
                {winningNumber}
              </div>
            )}

            <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1">
              {currentDrawnBatch.length > 1 ? `${currentDrawnBatch.length} Numbers Selected!` : 'Number Selected!'}
            </h3>

            {/* Spoken Voice Announcer Button */}
            <div className="mt-1.5 flex items-center justify-center">
              <button
                type="button"
                onClick={() =>
                  announceWinnerTTS(
                    currentDrawnBatch.length > 0 ? currentDrawnBatch.join(', ') : String(winningNumber),
                    { enabled: true, prefix: 'The number is' }
                  )
                }
                className="px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Speak number out loud"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>🔊 Speak Number</span>
              </button>
            </div>

            {/* Number Properties */}
            <div className="w-full grid grid-cols-2 gap-2 my-3 text-xs">
              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#161725] border border-gray-100 dark:border-gray-800">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Parity</span>
                <span className="font-bold text-gray-800 dark:text-gray-200">
                  {winningNumber !== null ? (winningNumber % 2 === 0 ? 'Even (2n)' : 'Odd (2n+1)') : 'Mixed Batch'}
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
                className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/25 flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Spin Again</span>
              </button>

              <button
                type="button"
                onClick={handleCopyResults}
                className="py-3 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowWinnerModal(false)}
                className="py-3 px-3.5 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 font-bold text-xs cursor-pointer min-h-[44px]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
