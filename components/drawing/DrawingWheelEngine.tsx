'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import confetti from '@/lib/confetti';
import {
  Palette,
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
  Zap,
  Timer,
  Play,
  Pause,
  RotateCcw,
  Download,
  Paintbrush,
  Eraser,
  Undo2,
  Share2,
  X,
  Compass,
  Sliders,
  Flame,
  ShieldAlert,
  Boxes,
  Users,
  Feather,
  Trees,
  Heart,
  Ban,
  Clock,
  AlertTriangle
} from 'lucide-react';
import {
  DRAWING_PROMPTS,
  CHALLENGE_MODIFIERS,
  DrawingCategory,
  DrawingDifficulty,
  DrawingPrompt
} from '@/lib/drawing/drawingDatabase';
import {
  playTickSound,
  playWinnerFanfare,
  playClickSound,
  playCountdownBeep,
  playBuzzerAlert,
  unlockAudioContext
} from '@/lib/sound';
import { useSavedWheels, toggleWheelFavorite } from '@/lib/storage';

// Hardware-grade CSPRNG
function getRandomIndex(length: number): number {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0] % length;
  }
  return Math.floor(Math.random() * length);
}

// Creative Palette Colors
const WHEEL_PALETTE = [
  '#ec4899', // Pink
  '#8b5cf6', // Violet
  '#3b82f6', // Blue
  '#06b6d4', // Cyan
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#f97316', // Orange
  '#14b8a6', // Teal
  '#a855f7'  // Purple
];

export default function DrawingWheelEngine() {
  // Profile Favorites Hook
  const savedWheels = useSavedWheels();
  const isGameFavorited = savedWheels.some(
    (w) => w.id === 'drawing-wheel' || w.title.trim().toLowerCase() === 'drawing idea generator'
  );
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleFavoriteGame = () => {
    const isNowSaved = toggleWheelFavorite({
      id: 'drawing-wheel',
      title: 'Drawing Idea Generator',
      category: 'Drawing & Art Ideas',
      description: 'Spin for random drawing prompts, art challenges, and creative sketching exercises.',
      items: DRAWING_PROMPTS.map((p, idx) => ({ id: p.id || `dp-${idx}`, text: p.title, weight: 1 })),
      paletteKey: 'purple'
    });
    setToastMsg(isNowSaved ? '❤️ Saved Drawing Idea Generator to Profile Favorites!' : 'Removed Drawing Generator from Profile Favorites');
    setTimeout(() => setToastMsg(null), 2200);
  };

  // Category & Difficulty State
  const [activeCategory, setActiveCategory] = useState<DrawingCategory | 'all'>('all');
  const [activeDifficulty, setActiveDifficulty] = useState<DrawingDifficulty | 'all'>('all');
  const [challengeModeEnabled, setChallengeModeEnabled] = useState<boolean>(false);
  const [activeChallenge, setActiveChallenge] = useState<string | null>(null);

  // No-repeat Elimination State
  const [isNoRepeat, setIsNoRepeat] = useState<boolean>(false);
  const [eliminatedIds, setEliminatedIds] = useState<Set<string>>(new Set());

  // Wheel State
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [selectedPrompt, setSelectedPrompt] = useState<DrawingPrompt | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [needleAngle, setNeedleAngle] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Timer & Challenge Sprint State (30s & 60s challenges)
  const [timerSeconds, setTimerSeconds] = useState<number>(60);
  const [timerInitial, setTimerInitial] = useState<number>(60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [showTimerModal, setShowTimerModal] = useState<boolean>(false);
  const [timerBuzzerFired, setTimerBuzzerFired] = useState<boolean>(false);
  const [challengeSprintType, setChallengeSprintType] = useState<'30s' | '60s' | 'custom' | null>(null);

  // Canvas State
  const [isCanvasActive, setIsCanvasActive] = useState<boolean>(false);
  const [brushColor, setBrushColor] = useState<string>('#000000');
  const [brushSize, setBrushSize] = useState<number>(5);
  const [toolMode, setToolMode] = useState<'brush' | 'eraser'>('brush');
  const [copiedCanvas, setCopiedCanvas] = useState<boolean>(false);

  // Canvas Undo Stack
  const [history, setHistory] = useState<ImageData[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wheelCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const currentAngleRef = useRef<number>(0);
  const isDrawingRef = useRef<boolean>(false);

  // Synchronize browser fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error('Error entering fullscreen:', err);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.error('Error exiting fullscreen:', err);
      });
    }
  };

  // Filter Prompts (Category + Difficulty + No-Repeat Elimination)
  const activePrompts = useMemo(() => {
    return DRAWING_PROMPTS.filter((item) => {
      // Category match
      let matchCat = false;
      if (activeCategory === 'all') {
        matchCat = true;
      } else if (activeCategory === 'people' || activeCategory === 'character') {
        matchCat = item.category === 'people';
      } else {
        matchCat = item.category === activeCategory;
      }

      // Difficulty match
      const matchDiff = activeDifficulty === 'all' || item.difficulty === activeDifficulty;

      // No-repeat elimination
      const isEliminated = isNoRepeat && eliminatedIds.has(item.id);

      return matchCat && matchDiff && !isEliminated;
    });
  }, [activeCategory, activeDifficulty, isNoRepeat, eliminatedIds]);

  // Total matching prompts in category & difficulty (ignoring elimination)
  const totalCategoryPromptsCount = useMemo(() => {
    return DRAWING_PROMPTS.filter((item) => {
      let matchCat = false;
      if (activeCategory === 'all') matchCat = true;
      else if (activeCategory === 'people' || activeCategory === 'character') matchCat = item.category === 'people';
      else matchCat = item.category === activeCategory;

      const matchDiff = activeDifficulty === 'all' || item.difficulty === activeDifficulty;
      return matchCat && matchDiff;
    }).length;
  }, [activeCategory, activeDifficulty]);

  // Reset No-Repeat Eliminations
  const resetEliminatedPrompts = () => {
    setEliminatedIds(new Set());
    setToastMsg('🔄 All eliminated drawing prompts restored to the wheel!');
    setTimeout(() => setToastMsg(null), 2200);
  };

  // Render Canvas Wheel
  const drawWheel = useCallback(() => {
    const canvas = wheelCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    const radius = center - 16;

    ctx.clearRect(0, 0, size, size);

    if (activePrompts.length === 0) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#1e1b4b';
      ctx.fill();
      ctx.strokeStyle = '#3730a3';
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.fillStyle = '#a5b4fc';
      ctx.font = 'bold 15px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      if (isNoRepeat && eliminatedIds.size > 0) {
        ctx.fillText('All prompts spun in this filter!', center, center - 12);
        ctx.font = '12px sans-serif';
        ctx.fillText('Click [Restore All] to reset wheel', center, center + 14);
      } else {
        ctx.fillText('No prompts in this filter', center, center - 10);
        ctx.font = '12px sans-serif';
        ctx.fillText('Try resetting difficulty/category', center, center + 15);
      }
      ctx.restore();
      return;
    }

    const totalWeight = activePrompts.length;
    let startAngle = currentAngleRef.current;

    activePrompts.forEach((entry, idx) => {
      const sliceAngle = (1 / totalWeight) * 2 * Math.PI;
      const endAngle = startAngle + sliceAngle;
      const color = WHEEL_PALETTE[idx % WHEEL_PALETTE.length];

      // Slice Fill
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      // Slice Outline
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Slice Text Label
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = activePrompts.length > 14 ? 'bold 10px sans-serif' : activePrompts.length > 8 ? 'bold 11px sans-serif' : 'bold 13px sans-serif';
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 3;

      const maxTextWidth = radius - 45;
      let text = entry.title;
      if (ctx.measureText(text).width > maxTextWidth) {
        while (text.length > 3 && ctx.measureText(text + '…').width > maxTextWidth) {
          text = text.slice(0, -1);
        }
        text = text + '…';
      }

      ctx.fillText(text, radius - 20, 4);
      ctx.restore();

      startAngle = endAngle;
    });

    // Outer Rim
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 6;
    ctx.stroke();

    // Center Hub
    ctx.beginPath();
    ctx.arc(center, center, 32, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#7c3aed';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Inner Hub Icon
    ctx.fillStyle = '#7c3aed';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🎨', center, center + 1);
  }, [activePrompts, isNoRepeat, eliminatedIds]);

  useEffect(() => {
    drawWheel();
  }, [drawWheel]);

  // Handle Wheel Spin
  const handleSpin = (onCompletedPrompt?: (p: DrawingPrompt) => void) => {
    if (isSpinning || activePrompts.length === 0) return;

    unlockAudioContext();
    if (soundEnabled) playClickSound();

    setIsSpinning(true);
    setSelectedPrompt(null);

    const winningIndex = getRandomIndex(activePrompts.length);
    const selectedItem = activePrompts[winningIndex];

    const totalWeight = activePrompts.length;
    const sliceAngle = (1 / totalWeight) * 2 * Math.PI;
    const startSliceAngle = winningIndex * sliceAngle;
    const itemMidAngle = startSliceAngle + sliceAngle / 2;

    const pointerAngle = (3 * Math.PI) / 2;
    const targetBaseAngle = pointerAngle - itemMidAngle;

    const minRotations = 5 + Math.floor(Math.random() * 3);
    const finalAngle = targetBaseAngle + minRotations * 2 * Math.PI;

    const duration = 3600;
    const startTime = performance.now();
    const initialAngle = currentAngleRef.current;
    let lastTickAngle = initialAngle;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentAngle = initialAngle + (finalAngle - initialAngle) * easeOut;

      currentAngleRef.current = currentAngle;
      drawWheel();

      if (Math.abs(currentAngle - lastTickAngle) >= sliceAngle) {
        if (soundEnabled) playTickSound();
        setNeedleAngle((prev) => (prev === 0 ? 15 : 0));
        lastTickAngle = currentAngle;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        setSelectedPrompt(selectedItem);
        setNeedleAngle(0);

        if (challengeModeEnabled) {
          const cIdx = getRandomIndex(CHALLENGE_MODIFIERS.length);
          setActiveChallenge(CHALLENGE_MODIFIERS[cIdx]);
        }

        // If No-Repeat is enabled, add to eliminated set
        if (isNoRepeat) {
          setEliminatedIds((prev) => new Set(prev).add(selectedItem.id));
        }

        if (soundEnabled) playWinnerFanfare();

        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });

        if (onCompletedPrompt) {
          onCompletedPrompt(selectedItem);
        }
      }
    };

    requestAnimationFrame(animate);
  };

  // Auto-Start Challenge Sprints (30-second and 60-second challenges)
  const handleStartTimedChallenge = (seconds: 30 | 60) => {
    unlockAudioContext();
    setChallengeSprintType(seconds === 30 ? '30s' : '60s');
    setTimerInitial(seconds);
    setTimerSeconds(seconds);
    setTimerBuzzerFired(false);

    if (!selectedPrompt) {
      // Automatically spin a prompt first and launch timer immediately upon spin completion
      handleSpin((prompt) => {
        setShowTimerModal(true);
        setIsTimerRunning(true);
      });
    } else {
      // Prompt is already chosen; launch and auto-start immediately
      setShowTimerModal(true);
      setIsTimerRunning(true);
    }
  };

  // Timer Interval Effect with Countdown Beeps and Buzzer Alert
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            setTimerBuzzerFired(true);
            if (soundEnabled) {
              playBuzzerAlert();
            }
            return 0;
          }
          // Final 3-second alert beeps
          if (prev <= 4 && prev > 1 && soundEnabled) {
            playCountdownBeep(false);
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds, soundEnabled]);

  // Drawing Canvas Methods
  const saveHistory = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(-10), imgData]);
  }, []);

  const initDrawingCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveHistory();
  }, [saveHistory]);

  const handleUndo = () => {
    if (history.length <= 1) return;
    const newHistory = [...history];
    newHistory.pop(); // remove current state
    const prevState = newHistory[newHistory.length - 1];
    setHistory(newHistory);

    const canvas = canvasRef.current;
    if (!canvas || !prevState) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.putImageData(prevState, 0, 0);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveHistory();
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    isDrawingRef.current = true;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    ctx.lineTo(x, y);
    ctx.strokeStyle = toolMode === 'eraser' ? '#ffffff' : brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawingRef.current) {
      isDrawingRef.current = false;
      saveHistory();
    }
  };

  // Initialize Canvas when Drawing mode opened
  useEffect(() => {
    if (isCanvasActive) {
      setTimeout(() => initDrawingCanvas(), 100);
    }
  }, [isCanvasActive, initDrawingCanvas]);

  const downloadCanvasImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `drawing-${selectedPrompt ? selectedPrompt.title.toLowerCase().replace(/\s+/g, '-') : 'idea'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
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

      {/* Header & Controls Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-[#eeedf7] dark:border-[#222330]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-1">
            <Palette className="w-4 h-4" />
            <span>Artist Creative Generator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Spin the Wheel for Drawing Ideas</span>
            <button
              type="button"
              onClick={handleFavoriteGame}
              aria-label={isGameFavorited ? 'Remove wheel from profile favorites' : 'Save wheel to profile favorites'}
              title={isGameFavorited ? 'Saved in Profile Favorites' : 'Save Wheel to Profile Favorites'}
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                isGameFavorited
                  ? 'bg-rose-500/10 text-rose-500 scale-105'
                  : 'bg-slate-200/80 dark:bg-slate-800 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30'
              }`}
            >
              <Heart className={`w-5 h-5 ${isGameFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </h2>
        </div>

        {/* Action Controls & No-Repeat Toggle */}
        <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto justify-end">
          {/* No-Repeat Elimination Toggle */}
          <button
            onClick={() => setIsNoRepeat(!isNoRepeat)}
            className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
              isNoRepeat
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
            }`}
            title="Eliminate spun prompts so they do not repeat"
          >
            <Ban className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>No-Repeat: {isNoRepeat ? 'ON' : 'OFF'}</span>
            {isNoRepeat && eliminatedIds.size > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-[10px]">
                {eliminatedIds.size} done
              </span>
            )}
          </button>

          {isNoRepeat && eliminatedIds.size > 0 && (
            <button
              onClick={resetEliminatedPrompts}
              className="px-2.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold transition-colors flex items-center gap-1"
              title="Restore eliminated prompts"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restore</span>
            </button>
          )}

          <button
            onClick={() => setChallengeModeEnabled(!challengeModeEnabled)}
            className={`p-2 sm:px-3 sm:py-2 rounded-xl border text-xs font-bold transition-colors flex items-center gap-1.5 ${
              challengeModeEnabled
                ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-800'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-500" />
            <span className="hidden sm:inline">Modifiers: {challengeModeEnabled ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 sm:p-2.5 rounded-xl border text-xs font-bold transition-colors flex items-center gap-1.5 ${
              soundEnabled
                ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
            }`}
            title="Toggle Wheel Sounds"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 sm:p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors flex items-center gap-1.5"
            title="Fullscreen Mode"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Category Modes Tabs: All, Animals, People, Objects, Fantasy, Nature */}
      <div className="my-6 space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25 scale-[1.02]'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>All Ideas</span>
          </button>

          <button
            onClick={() => setActiveCategory('animal')}
            className={`px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeCategory === 'animal'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 scale-[1.02]'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Feather className="w-4 h-4" />
            <span>Animals</span>
          </button>

          <button
            onClick={() => setActiveCategory('people')}
            className={`px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeCategory === 'people'
                ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/25 scale-[1.02]'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>People</span>
          </button>

          <button
            onClick={() => setActiveCategory('object')}
            className={`px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeCategory === 'object'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-[1.02]'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Boxes className="w-4 h-4" />
            <span>Objects</span>
          </button>

          <button
            onClick={() => setActiveCategory('fantasy')}
            className={`px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeCategory === 'fantasy'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/25 scale-[1.02]'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>Fantasy</span>
          </button>

          <button
            onClick={() => setActiveCategory('nature')}
            className={`px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeCategory === 'nature'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/25 scale-[1.02]'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Trees className="w-4 h-4" />
            <span>Nature</span>
          </button>
        </div>

        {/* Difficulty Filter Bar: All, Easy, Medium, Hard */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1 mr-1">
              <Sliders className="w-3.5 h-3.5" />
              <span>Difficulty:</span>
            </span>
            {(['all', 'easy', 'medium', 'hard'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setActiveDifficulty(diff)}
                className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-colors cursor-pointer ${
                  activeDifficulty === diff
                    ? 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* Quick Challenge Sprint Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              <span>Sprints:</span>
            </span>
            <button
              onClick={() => handleStartTimedChallenge(30)}
              className="px-2.5 py-1 rounded-lg bg-orange-100 hover:bg-orange-200 dark:bg-orange-950/60 dark:hover:bg-orange-900 text-orange-700 dark:text-orange-300 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-sm active:scale-95"
              title="Auto-start 30-Second Speed Drawing Challenge"
            >
              <Zap className="w-3 h-3 text-orange-600 fill-orange-600" />
              <span>30s Challenge</span>
            </button>
            <button
              onClick={() => handleStartTimedChallenge(60)}
              className="px-2.5 py-1 rounded-lg bg-blue-100 hover:bg-blue-200 dark:bg-blue-950/60 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-sm active:scale-95"
              title="Auto-start 60-Second Drawing Challenge"
            >
              <Timer className="w-3 h-3 text-blue-600" />
              <span>60s Challenge</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Wheel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-8">
        {/* Wheel Column */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
          {/* Top Pointer Needle */}
          <div
            className="absolute top-0 z-20 transition-transform duration-150 origin-bottom"
            style={{ transform: `rotate(${needleAngle}deg)` }}
          >
            <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[32px] border-t-purple-600 filter drop-shadow-md" />
          </div>

          <div className="relative p-2 bg-slate-100 dark:bg-slate-900 rounded-full shadow-inner border border-slate-200 dark:border-slate-800 flex items-center justify-center">
            <canvas
              ref={wheelCanvasRef}
              width={420}
              height={420}
              className="w-full max-w-[min(92vw,360px)] aspect-square sm:max-w-[400px] cursor-pointer touch-manipulation transition-transform"
              onClick={() => handleSpin()}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 mt-6 w-full max-w-sm">
            <button
              onClick={() => handleSpin()}
              disabled={isSpinning || activePrompts.length === 0}
              className={`flex-1 py-3.5 px-6 rounded-2xl font-black text-base text-white shadow-xl flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer ${
                isSpinning || activePrompts.length === 0
                  ? 'bg-slate-400 cursor-not-allowed opacity-70'
                  : 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-0.5'
              }`}
            >
              <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>{isSpinning ? 'SPINNING...' : 'SPIN DRAWING WHEEL'}</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-400 mt-2 text-center">
            {activePrompts.length} prompt slices active
            {isNoRepeat && ` • ${eliminatedIds.size} eliminated`}
          </p>
        </div>

        {/* Selected Prompt Result & Action Card */}
        <div className="lg:col-span-5 bg-[#fbfaff] dark:bg-[#1a1b28] p-4 sm:p-5 rounded-2xl border border-[#eeedf7] dark:border-[#222330] flex flex-col justify-between min-h-[380px] sm:min-h-[400px]">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#eeedf7] dark:border-[#222330]">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Selected Prompt</span>
              </span>

              {selectedPrompt && (
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {selectedPrompt.category}
                  </span>
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                    selectedPrompt.difficulty === 'easy'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : selectedPrompt.difficulty === 'medium'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                  }`}>
                    {selectedPrompt.difficulty}
                  </span>
                </div>
              )}
            </div>

            {selectedPrompt ? (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                  {selectedPrompt.title}
                </h3>

                {selectedPrompt.challengeHint && (
                  <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 text-xs text-purple-800 dark:text-purple-300 font-medium">
                    <span className="font-bold">Art Director Note: </span>
                    {selectedPrompt.challengeHint}
                  </div>
                )}

                {activeChallenge && (
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-800 dark:text-amber-300 font-bold flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{activeChallenge}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 space-y-2">
                <Palette className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700" />
                <p className="text-sm font-medium">Click &quot;SPIN DRAWING WHEEL&quot; to pick your first art prompt!</p>
                <p className="text-xs text-slate-400">Or launch a 30s or 60s speed challenge below.</p>
              </div>
            )}
          </div>

          {/* Unique Action Buttons */}
          <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Interactive Modes
              </p>
              {selectedPrompt && (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedPrompt.title);
                    setToastMsg('📋 Copied drawing prompt to clipboard!');
                    setTimeout(() => setToastMsg(null), 2000);
                  }}
                  className="text-[11px] font-bold text-purple-600 hover:text-purple-700 dark:text-purple-400 flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy Prompt</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setIsCanvasActive(true);
                  setTimeout(() => {
                    document.getElementById('drawing-canvas-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                disabled={!selectedPrompt}
                className="py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <Paintbrush className="w-4 h-4" />
                <span>[Draw It Canvas]</span>
              </button>

              <button
                onClick={() => handleStartTimedChallenge(60)}
                className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <Timer className="w-4 h-4" />
                <span>[60s Sprint]</span>
              </button>

              <button
                onClick={() => handleStartTimedChallenge(30)}
                className="py-2.5 px-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                <span>[30s Blitz]</span>
              </button>

              <button
                onClick={() => {
                  setChallengeModeEnabled(true);
                  const cIdx = getRandomIndex(CHALLENGE_MODIFIERS.length);
                  setActiveChallenge(CHALLENGE_MODIFIERS[cIdx]);
                }}
                className="py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <Flame className="w-4 h-4" />
                <span>[Modifier]</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Drawing Canvas Section */}
      {isCanvasActive && (
        <section
          id="drawing-canvas-section"
          className="mt-8 pt-6 border-t border-[#eeedf7] dark:border-[#222330] bg-[#fbfaff] dark:bg-[#1a1b28] rounded-2xl p-4 sm:p-5 border border-[#eeedf7] dark:border-[#222330]"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-1">
                <Paintbrush className="w-4 h-4" />
                <span>Browser Sketchpad</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Draw Your Idea: {selectedPrompt ? selectedPrompt.title : 'Creative Canvas'}
              </h3>
            </div>

            {/* Canvas Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setToolMode('brush')}
                className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  toolMode === 'brush'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Paintbrush className="w-4 h-4" />
                <span>Brush</span>
              </button>

              <button
                onClick={() => setToolMode('eraser')}
                className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  toolMode === 'eraser'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Eraser className="w-4 h-4" />
                <span>Eraser</span>
              </button>

              <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                {['#000000', '#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'].map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      setBrushColor(color);
                      setToolMode('brush');
                    }}
                    className={`w-5 h-5 rounded-full border border-white dark:border-slate-800 transition-transform cursor-pointer ${
                      brushColor === color && toolMode === 'brush' ? 'scale-125 ring-2 ring-purple-500' : ''
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              <select
                aria-label="Brush size"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200"
              >
                <option value={2}>Thin (2px)</option>
                <option value={5}>Regular (5px)</option>
                <option value={10}>Thick (10px)</option>
                <option value={20}>Bold (20px)</option>
              </select>

              <button
                onClick={handleUndo}
                className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
                title="Undo"
              >
                <Undo2 className="w-4 h-4" />
              </button>

              <button
                onClick={clearCanvas}
                className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
                title="Clear"
              >
                <Trash2 className="w-4 h-4 text-rose-500" />
              </button>

              <button
                onClick={downloadCanvasImage}
                className="p-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                title="Download PNG"
              >
                <Download className="w-4 h-4" />
                <span>Save PNG</span>
              </button>
            </div>
          </div>

          {/* Interactive Drawing Pad */}
          <div className="w-full bg-white rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={800}
              height={500}
              className="w-full max-w-4xl h-[280px] sm:h-[380px] md:h-[440px] bg-white cursor-crosshair touch-none"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
          </div>
        </section>
      )}

      {/* Speed Challenge Sprint Timer Modal (30s & 60s Auto-Start with Buzzer) */}
      {showTimerModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl text-center relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => {
                setShowTimerModal(false);
                setIsTimerRunning(false);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-colors ${
              timerBuzzerFired
                ? 'bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400 animate-bounce'
                : timerSeconds <= 10 && isTimerRunning
                ? 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400 animate-pulse'
                : 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
            }`}>
              {timerBuzzerFired ? (
                <AlertTriangle className="w-7 h-7" />
              ) : (
                <Timer className="w-7 h-7" />
              )}
            </div>

            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-1">
              {timerBuzzerFired
                ? '⏰ TIME’S UP!'
                : challengeSprintType === '30s'
                ? '30-Second Drawing Blitz'
                : challengeSprintType === '60s'
                ? '60-Second Challenge Sprint'
                : 'Speed Drawing Timer'}
            </h3>

            <p className="text-xs text-purple-600 dark:text-purple-400 font-bold mb-4">
              {selectedPrompt ? selectedPrompt.title : 'Speed Drawing Idea'}
            </p>

            {/* Countdown Clock Display */}
            <div className={`text-6xl font-black font-mono my-4 tracking-wider transition-colors ${
              timerBuzzerFired
                ? 'text-rose-600 dark:text-rose-400'
                : timerSeconds <= 10 && isTimerRunning
                ? 'text-amber-600 dark:text-amber-400 animate-pulse'
                : 'text-blue-600 dark:text-blue-400'
            }`}>
              {Math.floor(timerSeconds / 60)}:{String(timerSeconds % 60).padStart(2, '0')}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 mb-6 overflow-hidden">
              <div
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  timerBuzzerFired
                    ? 'bg-rose-500'
                    : timerSeconds <= 10
                    ? 'bg-amber-500'
                    : 'bg-blue-600'
                }`}
                style={{ width: `${timerInitial > 0 ? (timerSeconds / timerInitial) * 100 : 0}%` }}
              />
            </div>

            {/* Duration Selector */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {[30, 60, 180, 300].map((sec) => (
                <button
                  key={sec}
                  onClick={() => {
                    setTimerSeconds(sec);
                    setTimerInitial(sec);
                    setIsTimerRunning(true);
                    setTimerBuzzerFired(false);
                    setChallengeSprintType(sec === 30 ? '30s' : sec === 60 ? '60s' : 'custom');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                    timerInitial === sec
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {sec < 60 ? `${sec}s` : `${sec / 60}m`}
                </button>
              ))}
            </div>

            {/* Play/Pause & Reset Controls */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="py-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isTimerRunning ? 'Pause' : 'Start'}</span>
              </button>

              <button
                onClick={() => {
                  setTimerSeconds(timerInitial);
                  setIsTimerRunning(false);
                  setTimerBuzzerFired(false);
                }}
                className="py-2.5 px-4 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
