'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
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
  Smile,
  Globe,
  Feather,
  Heart
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
  '#f97316'  // Orange
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

  // Wheel State
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [selectedPrompt, setSelectedPrompt] = useState<DrawingPrompt | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [needleAngle, setNeedleAngle] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Timer State
  const [timerSeconds, setTimerSeconds] = useState<number>(180); // 3 mins default
  const [timerInitial, setTimerInitial] = useState<number>(180);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [showTimerModal, setShowTimerModal] = useState<boolean>(false);

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

  // Filter Prompts
  const activePrompts = useMemo(() => {
    return DRAWING_PROMPTS.filter((item) => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      const matchDiff = activeDifficulty === 'all' || item.difficulty === activeDifficulty;
      return matchCat && matchDiff;
    });
  }, [activeCategory, activeDifficulty]);

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
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('No prompts in this filter', center, center - 10);
      ctx.font = '12px sans-serif';
      ctx.fillText('Try resetting difficulty/category', center, center + 15);
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
      ctx.font = activePrompts.length > 12 ? 'bold 11px sans-serif' : 'bold 13px sans-serif';
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

      ctx.fillText(text, radius - 20, 5);
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
  }, [activePrompts]);

  useEffect(() => {
    drawWheel();
  }, [drawWheel]);

  // Handle Wheel Spin
  const handleSpin = () => {
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

    const duration = 4000;
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

        if (soundEnabled) playWinnerFanfare();

        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    };

    requestAnimationFrame(animate);
  };

  // Timer Interval Effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            if (soundEnabled) playWinnerFanfare();
            return 0;
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
      className={`w-full max-w-6xl mx-auto rounded-3xl transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-0 z-50 bg-[#0f172a] p-4 overflow-y-auto flex flex-col justify-center items-center'
          : 'bg-white dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] shadow-xl p-4 sm:p-6 lg:p-8'
      }`}
    >
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header & Controls Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
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

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            onClick={() => setChallengeModeEnabled(!challengeModeEnabled)}
            className={`p-2.5 rounded-xl border text-xs font-bold transition-colors flex items-center gap-1.5 ${
              challengeModeEnabled
                ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-800'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-500" />
            <span>Challenge Mode: {challengeModeEnabled ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2.5 rounded-xl border text-xs font-bold transition-colors flex items-center gap-1.5 ${
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
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Category Modes Tabs */}
      <div className="my-6 space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeCategory === 'all'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25 scale-[1.02]'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>All Ideas</span>
          </button>

          <button
            onClick={() => setActiveCategory('object')}
            className={`px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeCategory === 'object'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-[1.02]'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Boxes className="w-4 h-4" />
            <span>Object Mode</span>
          </button>

          <button
            onClick={() => setActiveCategory('animal')}
            className={`px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeCategory === 'animal'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 scale-[1.02]'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Feather className="w-4 h-4" />
            <span>Animal Mode</span>
          </button>

          <button
            onClick={() => setActiveCategory('character')}
            className={`px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeCategory === 'character'
                ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/25 scale-[1.02]'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Smile className="w-4 h-4" />
            <span>Character Mode</span>
          </button>

          <button
            onClick={() => setActiveCategory('fantasy')}
            className={`px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeCategory === 'fantasy'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/25 scale-[1.02]'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>Fantasy Mode</span>
          </button>

          <button
            onClick={() => setActiveCategory('environment')}
            className={`px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeCategory === 'environment'
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/25 scale-[1.02]'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Environment Mode</span>
          </button>
        </div>

        {/* Difficulty Filter Bar */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1 mr-2">
            <Sliders className="w-3.5 h-3.5" />
            <span>Difficulty:</span>
          </span>
          {(['all', 'easy', 'medium', 'hard'] as const).map((diff) => (
            <button
              key={diff}
              onClick={() => setActiveDifficulty(diff)}
              className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-colors ${
                activeDifficulty === diff
                  ? 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {diff}
            </button>
          ))}
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
              onClick={handleSpin}
            />
          </div>

          <button
            onClick={handleSpin}
            disabled={isSpinning || activePrompts.length === 0}
            className={`mt-6 w-full max-w-xs py-3.5 px-8 rounded-2xl font-black text-lg text-white shadow-xl flex items-center justify-center gap-2 transition-all transform active:scale-95 ${
              isSpinning || activePrompts.length === 0
                ? 'bg-slate-400 cursor-not-allowed opacity-70'
                : 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-0.5'
            }`}
          >
            <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>{isSpinning ? 'SPINNING...' : 'SPIN FOR DRAWING IDEA'}</span>
          </button>
        </div>

        {/* Selected Prompt Result & Action Card */}
        <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-900/60 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between min-h-[400px]">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Selected Prompt</span>
              </span>

              {selectedPrompt && (
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  {selectedPrompt.difficulty}
                </span>
              )}
            </div>

            {selectedPrompt ? (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                  {selectedPrompt.title}
                </h3>

                {selectedPrompt.challengeHint && (
                  <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 text-xs text-purple-800 dark:text-purple-300 font-medium">
                    <span className="font-bold">Pro Tip: </span>
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
                <p className="text-sm font-medium">Click &quot;Spin for Drawing Idea&quot; to generate your first prompt!</p>
              </div>
            )}
          </div>

          {/* Unique Differentiator Action Buttons */}
          <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Artist Actions
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setIsCanvasActive(true);
                  setTimeout(() => {
                    document.getElementById('drawing-canvas-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                disabled={!selectedPrompt}
                className="py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Paintbrush className="w-4 h-4" />
                <span>[Draw It]</span>
              </button>

              <button
                onClick={() => {
                  setShowTimerModal(true);
                  setIsTimerRunning(true);
                }}
                disabled={!selectedPrompt}
                className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Timer className="w-4 h-4" />
                <span>[Start Timer]</span>
              </button>

              <button
                onClick={() => {
                  setChallengeModeEnabled(true);
                  const cIdx = getRandomIndex(CHALLENGE_MODIFIERS.length);
                  setActiveChallenge(CHALLENGE_MODIFIERS[cIdx]);
                }}
                className="py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all"
              >
                <Flame className="w-4 h-4" />
                <span>[Challenge Mode]</span>
              </button>

              <button
                onClick={handleSpin}
                className="py-2.5 px-3 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCw className="w-4 h-4" />
                <span>[Generate Another]</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Drawing Canvas Section */}
      {isCanvasActive && (
        <section
          id="drawing-canvas-section"
          className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 rounded-3xl p-6"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
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
                className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  toolMode === 'brush'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <Paintbrush className="w-4 h-4" />
                <span>Brush</span>
              </button>

              <button
                onClick={() => setToolMode('eraser')}
                className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  toolMode === 'eraser'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <Eraser className="w-4 h-4" />
                <span>Eraser</span>
              </button>

              <button
                onClick={handleUndo}
                disabled={history.length <= 1}
                className="p-2 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-100 disabled:opacity-40"
              >
                <Undo2 className="w-4 h-4" />
                <span>Undo</span>
              </button>

              <button
                onClick={clearCanvas}
                className="p-2 rounded-xl bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 text-xs font-bold flex items-center gap-1.5 hover:bg-red-200"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear</span>
              </button>

              <button
                onClick={downloadCanvasImage}
                className="p-2 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-700 shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Download PNG</span>
              </button>
            </div>
          </div>

          {/* Color & Brush Size Tool Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 mb-4">
            {/* Color Swatches */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {['#000000', '#ffffff', '#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316', '#84cc16'].map(
                (c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setBrushColor(c);
                      setToolMode('brush');
                    }}
                    className={`w-7 h-7 rounded-full border-2 transition-transform ${
                      brushColor === c && toolMode === 'brush' ? 'scale-125 border-purple-600 shadow-md' : 'border-slate-300 dark:border-slate-600'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                )
              )}
              <input
                type="color"
                value={brushColor}
                onChange={(e) => {
                  setBrushColor(e.target.value);
                  setToolMode('brush');
                }}
                className="w-8 h-8 rounded-full border-0 cursor-pointer p-0 bg-transparent"
                title="Custom Color"
              />
            </div>

            {/* Brush Size Slider */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Size:</span>
              {[2, 5, 12, 24].map((size) => (
                <button
                  key={size}
                  onClick={() => setBrushSize(size)}
                  className={`w-8 h-8 rounded-xl text-xs font-bold flex items-center justify-center transition-colors ${
                    brushSize === size
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* HTML5 Canvas */}
          <div className="w-full flex justify-center bg-white rounded-2xl border-2 border-slate-300 dark:border-slate-700 overflow-hidden shadow-inner touch-none">
            <canvas
              ref={canvasRef}
              width={800}
              height={500}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full max-w-[800px] h-[350px] sm:h-[500px] bg-white cursor-crosshair"
            />
          </div>
        </section>
      )}

      {/* Timer Modal */}
      {showTimerModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl relative text-center">
            <button
              onClick={() => {
                setShowTimerModal(false);
                setIsTimerRunning(false);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center mx-auto mb-3 text-blue-600 dark:text-blue-400">
              <Timer className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-1">
              Drawing Sprint Timer
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              {selectedPrompt ? selectedPrompt.title : 'Speed Drawing Challenge'}
            </p>

            {/* Countdown Clock Display */}
            <div className="text-5xl font-black text-blue-600 dark:text-blue-400 font-mono my-4 tracking-wider">
              {Math.floor(timerSeconds / 60)}:{String(timerSeconds % 60).padStart(2, '0')}
            </div>

            {/* Duration Selector */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {[60, 180, 300, 600].map((sec) => (
                <button
                  key={sec}
                  onClick={() => {
                    setTimerSeconds(sec);
                    setTimerInitial(sec);
                    setIsTimerRunning(true);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                    timerInitial === sec
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {sec / 60}m
                </button>
              ))}
            </div>

            {/* Play/Pause Controls */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="py-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isTimerRunning ? 'Pause' : 'Start'}</span>
              </button>

              <button
                onClick={() => {
                  setTimerSeconds(timerInitial);
                  setIsTimerRunning(false);
                }}
                className="py-2.5 px-4 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5"
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
