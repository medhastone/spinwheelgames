'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Film,
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
  Shuffle,
  RefreshCw,
  ListPlus,
  SlidersHorizontal,
  X,
  Tv,
  Clapperboard,
  Heart,
  Users,
  Smile,
  Zap,
  Ghost,
  Compass,
  Flame,
  Award,
  Clock,
  Share2,
  Pencil,
  FileText,
  Sliders
} from 'lucide-react';
import {
  MOVIE_DATABASE,
  GENRE_METADATA,
  PRESET_WATCHLISTS
} from '@/lib/movie/movieDatabase';
import {
  MovieItem,
  MovieGenre,
  MovieMode,
  CustomMovieEntry,
  RuntimeCategory
} from '@/lib/movie/types';
import {
  playTickSound,
  playWinnerFanfare,
  playClickSound,
  unlockAudioContext,
  announceWinnerTTS
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

// Wheel Slice Color Palette
const CINEMA_PALETTE = [
  '#ef4444', // Crimson Red
  '#3b82f6', // Electric Blue
  '#f59e0b', // Amber Gold
  '#10b981', // Emerald Green
  '#8b5cf6', // Neon Purple
  '#ec4899', // Hot Pink
  '#06b6d4', // Cyan
  '#f97316', // Orange
  '#14b8a6', // Teal
  '#84cc16'  // Lime
];

// Popular preset bundles for custom lists
const POPULAR_CUSTOM_PRESETS = [
  {
    name: 'Top Sci-Fi Masterpieces',
    movies: ['Interstellar', 'Inception', 'Dune: Part Two', 'Blade Runner 2049', 'The Matrix', 'Arrival']
  },
  {
    name: 'Thrilling Murder Mysteries',
    movies: ['Knives Out', 'Glass Onion', 'Gone Girl', 'Zodiac', 'Shutter Island', 'Prisoners']
  },
  {
    name: 'Animated Gems for All Ages',
    movies: ['Spider-Man: Into the Spider-Verse', 'Spirited Away', 'Ratatouille', 'Coco', 'Paddington 2', 'WALL-E']
  },
  {
    name: 'Feel-Good Comedies',
    movies: ['Superbad', 'The Grand Budapest Hotel', 'Crazy Rich Asians', 'Palm Springs', 'School of Rock', 'Ferris Bueller']
  }
];

export default function MovieWheelEngine() {
  // Mode selection: Catalog vs Custom List
  const [activeTab, setActiveTab] = useState<'catalog' | 'custom'>('catalog');

  // Movie Experience Mode
  const [selectedMode, setSelectedMode] = useState<MovieMode | 'custom'>('decision');

  // Filters
  const [selectedGenre, setSelectedGenre] = useState<MovieGenre | 'all'>('all');
  const [selectedRuntime, setSelectedRuntime] = useState<RuntimeCategory>('all');
  const [selectedStreamer, setSelectedStreamer] = useState<string>('all');

  // Custom movie entries
  const [customList, setCustomList] = useState<CustomMovieEntry[]>([
    { id: '1', title: 'Spider-Man: Into the Spider-Verse', weight: 1, color: CINEMA_PALETTE[0], enabled: true },
    { id: '2', title: 'Knives Out', weight: 1, color: CINEMA_PALETTE[1], enabled: true },
    { id: '3', title: 'The Grand Budapest Hotel', weight: 1, color: CINEMA_PALETTE[2], enabled: true },
    { id: '4', title: 'Top Gun: Maverick', weight: 1, color: CINEMA_PALETTE[3], enabled: true },
    { id: '5', title: 'Everything Everywhere All at Once', weight: 1, color: CINEMA_PALETTE[4], enabled: true },
    { id: '6', title: 'La La Land', weight: 1, color: CINEMA_PALETTE[5], enabled: true },
    { id: '7', title: 'A Quiet Place', weight: 1, color: CINEMA_PALETTE[6], enabled: true },
    { id: '8', title: 'Paddington 2', weight: 1, color: CINEMA_PALETTE[7], enabled: true }
  ]);

  const [newTitleInput, setNewTitleInput] = useState('');
  const [quickAddInput, setQuickAddInput] = useState('');
  const [bulkInputOpen, setBulkInputOpen] = useState(false);
  const [bulkText, setBulkText] = useState('');

  // Wheel State
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [spinDuration, setSpinDuration] = useState<number>(4.5); // seconds
  const [winner, setWinner] = useState<{
    title: string;
    movie?: MovieItem;
    sliceIndex: number;
  } | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [eliminatedHistory, setEliminatedHistory] = useState<string[]>([]);
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const savedWheels = useSavedWheels();
  const isGameFavorited = savedWheels.some(
    (w) => w.id === 'movie-wheel' || w.title.trim().toLowerCase() === 'movie wheel spin'
  );

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const currentAngleRef = useRef<number>(0);
  const lastTickSliceRef = useRef<number>(-1);

  const handleFavoriteGame = () => {
    const isNowSaved = toggleWheelFavorite({
      id: 'movie-wheel',
      title: 'Movie Wheel Spin',
      category: 'Entertainment & Movies',
      description: 'Spin the wheel to choose what movie to watch tonight by genre, runtime, streaming service, or custom watchlist.',
      items: activeSlices.map((s, idx) => ({ id: s.id || `m-${idx}`, text: s.title, weight: s.weight || 1 })),
      paletteKey: 'red'
    });
    setToastMsg(isNowSaved ? '❤️ Saved Movie Wheel to Profile Favorites!' : 'Removed Movie Wheel from Profile Favorites');
    setTimeout(() => setToastMsg(null), 2200);
  };

  // Compute active movie choices based on selected filters or custom list
  let activeSlices: {
    id: string;
    title: string;
    color: string;
    weight: number;
    movie?: MovieItem;
  }[];

  if (activeTab === 'custom') {
    activeSlices = customList
      .filter((item) => item.enabled && !eliminatedHistory.includes(item.title))
      .map((item, idx) => ({
        id: item.id,
        title: item.title,
        color: item.color || CINEMA_PALETTE[idx % CINEMA_PALETTE.length],
        weight: item.weight || 1,
        movie: MOVIE_DATABASE.find(
          (m) => m.title.toLowerCase() === item.title.toLowerCase()
        )
      }));
  } else {
    // Catalog Mode Filtering
    let filtered = MOVIE_DATABASE.filter((m) => !eliminatedHistory.includes(m.title));

    // Mode filter
    if (selectedMode !== 'decision' && selectedMode !== 'custom') {
      filtered = filtered.filter((m) => m.modes.includes(selectedMode));
    }

    // Genre filter
    if (selectedGenre !== 'all') {
      filtered = filtered.filter((m) => m.genre === selectedGenre);
    }

    // Runtime filter
    if (selectedRuntime === 'quick') {
      filtered = filtered.filter((m) => m.runtimeMinutes < 105);
    } else if (selectedRuntime === 'standard') {
      filtered = filtered.filter((m) => m.runtimeMinutes >= 105 && m.runtimeMinutes <= 135);
    } else if (selectedRuntime === 'epic') {
      filtered = filtered.filter((m) => m.runtimeMinutes > 135);
    }

    // Streaming Platform filter
    if (selectedStreamer !== 'all') {
      filtered = filtered.filter((m) =>
        m.streamingPlatforms.some((s) => s.toLowerCase() === selectedStreamer.toLowerCase())
      );
    }

    // If filter returns fewer than 3 movies, fallback to mode subset
    if (filtered.length < 3) {
      filtered = MOVIE_DATABASE.filter((m) => !eliminatedHistory.includes(m.title)).slice(0, 8);
    }

    // Map to slices with assigned colors
    activeSlices = filtered.slice(0, 16).map((movie, idx) => ({
      id: movie.id,
      title: movie.title,
      color: CINEMA_PALETTE[idx % CINEMA_PALETTE.length],
      weight: 1,
      movie
    }));
  }

  // Keep currentAngleRef in sync with rotationAngle
  useEffect(() => {
    currentAngleRef.current = rotationAngle;
  }, [rotationAngle]);

  // Canvas Drawing
  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 20;

    ctx.clearRect(0, 0, width, height);

    const slices = activeSlices;
    if (slices.length === 0) {
      // Empty wheel state
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#1e1b4b';
      ctx.fill();
      ctx.strokeStyle = '#4338ca';
      ctx.lineWidth = 6;
      ctx.stroke();

      ctx.fillStyle = '#e0e7ff';
      ctx.font = 'bold 15px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Add custom movie names to spin!', centerX, centerY);
      return;
    }

    const totalWeight = slices.reduce((sum, s) => sum + (s.weight || 1), 0);
    let startAngle = currentAngleRef.current;

    // Draw Slices
    slices.forEach((slice) => {
      const sliceAngle = ((slice.weight || 1) / totalWeight) * (2 * Math.PI);
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      // Slice Fill
      ctx.fillStyle = slice.color;
      ctx.fill();

      // Slice Border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Draw Slice Text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';

      // Adaptive text size
      const maxTextLength = 22;
      const fontSize = slices.length > 12 ? 11 : slices.length > 8 ? 13 : 15;
      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(0,0,0,0.85)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;

      let displayTitle = slice.title;
      if (displayTitle.length > maxTextLength) {
        displayTitle = displayTitle.slice(0, maxTextLength - 2) + '...';
      }

      ctx.fillText(displayTitle, radius - 26, 0);
      ctx.restore();

      startAngle = endAngle;
    });

    // Draw Center Peg & Hub
    ctx.beginPath();
    ctx.arc(centerX, centerY, 32, 0, 2 * Math.PI);
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Inner center icon / text
    ctx.beginPath();
    ctx.arc(centerX, centerY, 14, 0, 2 * Math.PI);
    ctx.fillStyle = '#ef4444';
    ctx.fill();
  }, [activeSlices]);

  // Redraw when slices or angle change
  useEffect(() => {
    drawWheel();
  }, [drawWheel, rotationAngle]);

  // Spin Wheel Action
  const spinWheel = useCallback(() => {
    if (isSpinning || activeSlices.length === 0) return;

    unlockAudioContext();
    if (soundEnabled) {
      playClickSound();
    }

    setIsSpinning(true);
    setWinner(null);

    const slices = activeSlices;
    const totalWeight = slices.reduce((sum, s) => sum + (s.weight || 1), 0);

    // Pick winning slice by random weight (CSPRNG)
    const randomWeight = (getRandomIndex(10000) / 10000) * totalWeight;
    let accumulatedWeight = 0;
    let winningIndex = 0;

    for (let i = 0; i < slices.length; i++) {
      accumulatedWeight += slices[i].weight || 1;
      if (accumulatedWeight >= randomWeight) {
        winningIndex = i;
        break;
      }
    }

    // Calculate angles
    let sliceStartWeight = 0;
    for (let i = 0; i < winningIndex; i++) {
      sliceStartWeight += slices[i].weight || 1;
    }
    const winSliceWeight = slices[winningIndex].weight || 1;
    const sliceStartAngle = (sliceStartWeight / totalWeight) * (2 * Math.PI);
    const sliceAngleSpan = (winSliceWeight / totalWeight) * (2 * Math.PI);
    const targetSliceCenter = sliceStartAngle + sliceAngleSpan / 2;

    // Pointer is at the top: 3*PI/2 (270 degrees)
    const pointerAngle = (3 * Math.PI) / 2;
    const fullRotations = (5 + getRandomIndex(3)) * 2 * Math.PI;
    const finalTargetAngle =
      currentAngleRef.current +
      fullRotations +
      (pointerAngle - (targetSliceCenter % (2 * Math.PI)));

    const startAngle = currentAngleRef.current;
    const deltaAngle = finalTargetAngle - startAngle;
    const durationMs = spinDuration * 1000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      // Ease out quartic
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const current = startAngle + deltaAngle * easeOut;

      currentAngleRef.current = current;
      setRotationAngle(current);

      // Audio tick sound
      if (soundEnabled) {
        const normalizedAngle = (pointerAngle - (current % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        const approxSliceAngle = (2 * Math.PI) / slices.length;
        const currentSliceIdx = Math.floor(normalizedAngle / approxSliceAngle);

        if (currentSliceIdx !== lastTickSliceRef.current) {
          lastTickSliceRef.current = currentSliceIdx;
          playTickSound();
        }
      }

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Spin Complete
        setIsSpinning(false);
        const winItem = slices[winningIndex];
        setWinner({
          title: winItem.title,
          movie: winItem.movie,
          sliceIndex: winningIndex
        });

        if (soundEnabled) {
          playWinnerFanfare();
          announceWinnerTTS(winItem.title, { enabled: true, prefix: 'Tonight\'s movie winner is' });
        }

        // Trigger Confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899']
        });
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [isSpinning, activeSlices, soundEnabled, spinDuration]);

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Quick Random Roll (instant pick without spinning wheel)
  const quickRandomMovie = () => {
    if (activeSlices.length === 0) return;
    unlockAudioContext();
    const randomIdx = getRandomIndex(activeSlices.length);
    const winItem = activeSlices[randomIdx];
    setWinner({
      title: winItem.title,
      movie: winItem.movie,
      sliceIndex: randomIdx
    });
    if (soundEnabled) {
      playWinnerFanfare();
      announceWinnerTTS(winItem.title, { enabled: true, prefix: 'Tonight\'s movie winner is' });
    }
  };

  // Add Single Custom Entry from specific input
  const handleAddMovieByTitle = (titleToAdd: string) => {
    const title = titleToAdd.trim();
    if (!title) return;
    const newEntry: CustomMovieEntry = {
      id: Date.now().toString(),
      title,
      weight: 1,
      color: CINEMA_PALETTE[customList.length % CINEMA_PALETTE.length],
      enabled: true
    };
    setCustomList((prev) => [newEntry, ...prev]);
    setActiveTab('custom');
    setSelectedMode('custom');
    setToastMsg(`🎬 Added "${title}" to Movie Wheel!`);
    setTimeout(() => setToastMsg(null), 2000);
  };

  const handleAddCustomMovie = () => {
    handleAddMovieByTitle(newTitleInput);
    setNewTitleInput('');
  };

  const handleQuickAddMovie = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddMovieByTitle(quickAddInput);
    setQuickAddInput('');
  };

  // Bulk Import Custom Movies
  const handleBulkImport = () => {
    const lines = bulkText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length === 0) return;

    const newEntries: CustomMovieEntry[] = lines.map((title, i) => ({
      id: `${Date.now()}-${i}`,
      title,
      weight: 1,
      color: CINEMA_PALETTE[(customList.length + i) % CINEMA_PALETTE.length],
      enabled: true
    }));

    setCustomList((prev) => [...newEntries, ...prev]);
    setActiveTab('custom');
    setSelectedMode('custom');
    setBulkText('');
    setBulkInputOpen(false);
    setToastMsg(`🍿 Added ${newEntries.length} movies to Wheel!`);
    setTimeout(() => setToastMsg(null), 2200);
  };

  // Apply Preset Watchlist
  const handleApplyPreset = (presetMovies: string[]) => {
    const newEntries: CustomMovieEntry[] = presetMovies.map((title, i) => ({
      id: `${Date.now()}-${i}`,
      title,
      weight: 1,
      color: CINEMA_PALETTE[i % CINEMA_PALETTE.length],
      enabled: true
    }));
    setCustomList(newEntries);
    setActiveTab('custom');
    setSelectedMode('custom');
    setEliminatedHistory([]);
    setToastMsg(`Loaded "${presetMovies.length} movies" preset!`);
    setTimeout(() => setToastMsg(null), 2000);
  };

  // Eliminate Selected Winner
  const handleEliminateWinner = () => {
    if (!winner) return;
    setEliminatedHistory((prev) => [...prev, winner.title]);
    setWinner(null);
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Copy share pick
  const handleSharePick = () => {
    if (!winner) return;
    const text = `🍿 Movie Wheel spun: "${winner.title}"!\nFind out what to watch next on https://spinwheelgames.org/movie-wheel`;
    navigator.clipboard?.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  return (
    <div
      ref={containerRef}
      className={`w-full bg-white dark:bg-[#0b0c14] text-slate-900 dark:text-[#f1f5f9] rounded-3xl p-4 sm:p-8 shadow-2xl border border-slate-200 dark:border-[#27273a] relative overflow-hidden transition-colors ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none overflow-y-auto' : ''
      }`}
    >
      {toastMsg && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-slate-900/95 text-white text-xs font-bold shadow-2xl backdrop-blur-md flex items-center gap-2 border border-slate-700/50 animate-in fade-in slide-in-from-top-3 duration-200">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Background Neon Cinema Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-[#1e2030] relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-red-500/10 dark:bg-gradient-to-br dark:from-red-500/20 dark:to-amber-500/20 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 shadow-inner">
            <Clapperboard className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                Movie Wheel Spin
              </h2>
              <button
                type="button"
                onClick={handleFavoriteGame}
                aria-label={isGameFavorited ? 'Remove wheel from profile favorites' : 'Save wheel to profile favorites'}
                title={isGameFavorited ? 'Saved in Profile Favorites' : 'Save Wheel to Profile Favorites'}
                className={`p-1.5 rounded-full transition-all cursor-pointer ${
                  isGameFavorited
                    ? 'bg-rose-500/10 text-rose-500 scale-105'
                    : 'bg-slate-200/80 dark:bg-[#1e2030] text-slate-400 dark:text-[#64748b] hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30'
                }`}
              >
                <Heart className={`w-5 h-5 ${isGameFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
              <span className="px-2 py-0.5 rounded-full bg-red-500/10 dark:bg-red-500/20 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 text-[11px] font-bold">
                Movie Picker
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-[#94a3b8]">
              End the debate in 5 seconds. What should you watch tonight?
            </p>
          </div>
        </div>

        {/* Top Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
              soundEnabled
                ? 'bg-amber-50 dark:bg-[#1e2030] border-amber-200 dark:border-[#33364d] text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-[#282b40]'
                : 'bg-slate-100 dark:bg-[#151622] border-slate-200 dark:border-[#222333] text-slate-500 dark:text-[#64748b] hover:text-slate-700 dark:hover:text-[#94a3b8]'
            }`}
            title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={quickRandomMovie}
            disabled={isSpinning || activeSlices.length === 0}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-100 dark:bg-gradient-to-r dark:from-amber-500/20 dark:to-orange-500/20 hover:bg-amber-200 dark:hover:from-amber-500/30 dark:hover:to-orange-500/30 border border-amber-300 dark:border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
            title="Instant random pick"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Quick Roll</span>
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#1e2030] dark:hover:bg-[#282b40] border border-slate-200 dark:border-[#33364d] text-slate-700 dark:text-[#cbd5e1] transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Prominent Experience Mode Selector Tabs (5 Tabs with Custom Movie List highlighted) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-6 relative z-10">
        {/* Custom Movie Watchlist Tab */}
        <button
          type="button"
          onClick={() => {
            setSelectedMode('custom');
            setActiveTab('custom');
          }}
          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1 sm:col-span-1 col-span-2 ${
            activeTab === 'custom'
              ? 'bg-amber-50 dark:bg-amber-500/15 border-amber-400 dark:border-amber-500/50 text-amber-950 dark:text-white shadow-lg ring-2 ring-amber-500/30'
              : 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200/80 dark:border-amber-500/20 text-slate-700 dark:text-[#cbd5e1] hover:border-amber-400 dark:hover:border-amber-400/50 hover:bg-amber-50 dark:hover:bg-amber-950/30'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
              <ListPlus className="w-4 h-4" />
              Custom Movie List
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500 text-white font-black">
              {customList.filter((c) => c.enabled).length} Custom
            </span>
          </div>
          <span className="text-[11px] text-slate-600 dark:text-[#cbd5e1] font-medium line-clamp-1">
            + Add your own movie titles
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            setSelectedMode('decision');
            setActiveTab('catalog');
          }}
          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
            activeTab === 'catalog' && selectedMode === 'decision'
              ? 'bg-red-50 dark:bg-red-500/15 border-red-300 dark:border-red-500/40 text-red-900 dark:text-white shadow-md'
              : 'bg-slate-50 dark:bg-[#12131f] border-slate-200 dark:border-[#1e2030] text-slate-600 dark:text-[#94a3b8] hover:border-slate-300 dark:hover:border-[#2d3047] hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold flex items-center gap-1.5 text-red-600 dark:text-red-400">
              <Compass className="w-4 h-4" />
              Decision Mode
            </span>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-[#94a3b8] line-clamp-1">Universal all-genre picks</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setSelectedMode('family');
            setActiveTab('catalog');
          }}
          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
            activeTab === 'catalog' && selectedMode === 'family'
              ? 'bg-emerald-50 dark:bg-green-500/15 border-emerald-300 dark:border-green-500/40 text-emerald-900 dark:text-white shadow-md'
              : 'bg-slate-50 dark:bg-[#12131f] border-slate-200 dark:border-[#1e2030] text-slate-600 dark:text-[#94a3b8] hover:border-slate-300 dark:hover:border-[#2d3047] hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold flex items-center gap-1.5 text-emerald-600 dark:text-green-400">
              <Smile className="w-4 h-4" />
              Family Movie Mode
            </span>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-[#94a3b8] line-clamp-1">Kid-safe G/PG adventures</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setSelectedMode('date_night');
            setActiveTab('catalog');
          }}
          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
            activeTab === 'catalog' && selectedMode === 'date_night'
              ? 'bg-pink-50 dark:bg-pink-500/15 border-pink-300 dark:border-pink-500/40 text-pink-900 dark:text-white shadow-md'
              : 'bg-slate-50 dark:bg-[#12131f] border-slate-200 dark:border-[#1e2030] text-slate-600 dark:text-[#94a3b8] hover:border-slate-300 dark:hover:border-[#2d3047] hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold flex items-center gap-1.5 text-pink-600 dark:text-pink-400">
              <Heart className="w-4 h-4" />
              Date-Night Mode
            </span>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-[#94a3b8] line-clamp-1">Rom-coms & thrillers</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setSelectedMode('group');
            setActiveTab('catalog');
          }}
          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
            activeTab === 'catalog' && selectedMode === 'group'
              ? 'bg-purple-50 dark:bg-purple-500/15 border-purple-300 dark:border-purple-500/40 text-purple-900 dark:text-white shadow-md'
              : 'bg-slate-50 dark:bg-[#12131f] border-slate-200 dark:border-[#1e2030] text-slate-600 dark:text-[#94a3b8] hover:border-slate-300 dark:hover:border-[#2d3047] hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
              <Users className="w-4 h-4" />
              Group Movie Mode
            </span>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-[#94a3b8] line-clamp-1">Blockbusters & comedies</span>
        </button>
      </div>

      {/* Direct Universal Quick-Add Bar: Always available to type custom movies */}
      <div className="pt-4 pb-1">
        <form
          onSubmit={handleQuickAddMovie}
          className="p-2.5 sm:p-3 rounded-2xl bg-gradient-to-r from-red-500/10 via-amber-500/10 to-indigo-500/10 dark:from-red-950/30 dark:via-amber-950/30 dark:to-indigo-950/30 border border-red-200 dark:border-red-500/30 flex flex-wrap sm:flex-nowrap items-center gap-2"
        >
          <div className="flex items-center gap-2 pl-2 text-xs font-bold text-red-600 dark:text-red-400 whitespace-nowrap">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Custom Movie:</span>
          </div>
          <input
            type="text"
            value={quickAddInput}
            onChange={(e) => setQuickAddInput(e.target.value)}
            placeholder="Type any movie title (e.g., Oppenheimer, Dune 2, Gladiator)..."
            className="flex-1 min-w-0 sm:min-w-[200px] px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 font-medium"
          />
          <button
            type="submit"
            disabled={!quickAddInput.trim()}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add to Wheel</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('custom');
              setSelectedMode('custom');
              setBulkInputOpen(true);
            }}
            className="px-3 py-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5 text-amber-500" />
            <span>Bulk Paste</span>
          </button>
        </form>
      </div>

      {/* Mode Switch Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 pb-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('catalog')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'catalog'
                ? 'bg-slate-200 dark:bg-[#1e2030] text-slate-900 dark:text-white border border-slate-300 dark:border-[#373a56]'
                : 'text-slate-600 dark:text-[#94a3b8] hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Film className="w-3.5 h-3.5 text-red-500" />
            Curated Database ({activeSlices.length} on wheel)
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('custom');
              setSelectedMode('custom');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'custom'
                ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-500/40'
                : 'text-slate-600 dark:text-[#94a3b8] hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ListPlus className="w-3.5 h-3.5 text-amber-500" />
            My Custom Movie Watchlist ({customList.filter((c) => c.enabled).length})
          </button>
        </div>

        {activeTab === 'custom' && (
          <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Spinning your custom movie titles
          </span>
        )}
      </div>

      {/* Main Grid: Wheel Left / Controls Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 items-start relative z-10">
        {/* Wheel Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
          {/* Wheel Canvas Container */}
          <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center my-4">
            {/* Pointer / Ticker Arrow at Top */}
            <div className="absolute -top-3 z-30 flex flex-col items-center">
              <div
                className={`w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[26px] border-t-amber-400 drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] ${
                  isSpinning ? 'animate-pulse' : ''
                }`}
              />
            </div>

            {/* Canvas */}
            <canvas
              ref={canvasRef}
              width={420}
              height={420}
              className="w-full h-full object-contain filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)] dark:drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
            />

            {/* Interactive Click to Spin Overlay on Center Hub */}
            <button
              type="button"
              onClick={spinWheel}
              disabled={isSpinning || activeSlices.length === 0}
              className="absolute w-20 h-20 rounded-full cursor-pointer z-20 transition-transform active:scale-95 disabled:opacity-0"
              aria-label="Spin Movie Wheel"
            />
          </div>

          {/* Spin Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 w-full pt-2">
            <button
              type="button"
              onClick={spinWheel}
              disabled={isSpinning || activeSlices.length === 0}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-base sm:text-lg tracking-wide shadow-xl shadow-red-600/30 hover:shadow-red-600/50 transition-all cursor-pointer transform active:scale-98 disabled:opacity-50 flex items-center gap-2.5"
            >
              <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>{isSpinning ? 'Picking Movie...' : 'SPIN MOVIE WHEEL'}</span>
            </button>

            {eliminatedHistory.length > 0 && (
              <button
                type="button"
                onClick={() => setEliminatedHistory([])}
                className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#151622] dark:hover:bg-[#1e2030] border border-slate-200 dark:border-[#292b3d] text-xs font-bold text-slate-700 dark:text-[#94a3b8] hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Vetoes ({eliminatedHistory.length})
              </button>
            )}
          </div>
        </div>

        {/* Right Side Options & Custom Watchlist Column (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {activeTab === 'catalog' ? (
            /* Catalog Filter Controls */
            <div className="bg-slate-50 dark:bg-[#12131f] border border-slate-200 dark:border-[#1e2030] rounded-2xl p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#1e2030] pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-[#94a3b8] flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-red-500 dark:text-red-400" />
                  Genre & Streaming Filters
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('custom');
                    setSelectedMode('custom');
                  }}
                  className="text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                >
                  <ListPlus className="w-3 h-3" />
                  <span>Use Custom Titles</span>
                </button>
              </div>

              {/* Genre Filter Pills */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-[#cbd5e1] block mb-2">
                  Genre Filter:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedGenre('all')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      selectedGenre === 'all'
                        ? 'bg-red-600 text-white font-bold'
                        : 'bg-white dark:bg-[#1a1b2b] text-slate-600 dark:text-[#94a3b8] border border-slate-200 dark:border-transparent hover:bg-slate-100 dark:hover:bg-[#25273d] hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    All Genres
                  </button>
                  {Object.entries(GENRE_METADATA).map(([genreKey, meta]) => (
                    <button
                      key={genreKey}
                      type="button"
                      onClick={() => setSelectedGenre(genreKey as MovieGenre)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                        selectedGenre === genreKey
                          ? 'bg-red-600 text-white font-bold'
                          : 'bg-white dark:bg-[#1a1b2b] text-slate-600 dark:text-[#94a3b8] border border-slate-200 dark:border-transparent hover:bg-slate-100 dark:hover:bg-[#25273d] hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {meta.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Runtime Filter */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-[#cbd5e1] block mb-2">
                  Runtime Length:
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { id: 'all', label: 'Any Length' },
                    { id: 'quick', label: '< 105m' },
                    { id: 'standard', label: '105-135m' },
                    { id: 'epic', label: '135m+' }
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setSelectedRuntime(r.id as RuntimeCategory)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-medium text-center transition-colors cursor-pointer ${
                        selectedRuntime === r.id
                          ? 'bg-amber-100 dark:bg-amber-500/20 border border-amber-300 dark:border-amber-500/40 text-amber-900 dark:text-amber-300 font-bold'
                          : 'bg-white dark:bg-[#1a1b2b] text-slate-600 dark:text-[#94a3b8] border border-slate-200 dark:border-transparent hover:bg-slate-100 dark:hover:bg-[#25273d] hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Streaming Platform Filter */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-[#cbd5e1] block mb-2">
                  Streaming Availability:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {['all', 'Netflix', 'Prime Video', 'Disney+', 'Max', 'Apple TV', 'Hulu'].map(
                    (streamer) => (
                      <button
                        key={streamer}
                        type="button"
                        onClick={() => setSelectedStreamer(streamer)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                          selectedStreamer === streamer
                            ? 'bg-indigo-100 dark:bg-indigo-500/20 border border-indigo-300 dark:border-indigo-500/40 text-indigo-900 dark:text-indigo-300 font-bold'
                            : 'bg-white dark:bg-[#1a1b2b] text-slate-600 dark:text-[#94a3b8] border border-slate-200 dark:border-transparent hover:bg-slate-100 dark:hover:bg-[#25273d] hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {streamer === 'all' ? 'All Platforms' : streamer}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Preset Watchlists */}
              <div className="pt-2 border-t border-slate-200 dark:border-[#1e2030]">
                <label className="text-xs font-semibold text-slate-700 dark:text-[#cbd5e1] block mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                  Or Pick a Curated Watchlist:
                </label>
                <div className="flex flex-col gap-1.5">
                  {PRESET_WATCHLISTS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => handleApplyPreset(preset.movies)}
                      className="p-2.5 rounded-xl bg-white dark:bg-[#171827] hover:bg-slate-100 dark:hover:bg-[#212338] border border-slate-200 dark:border-[#25273d] text-left transition-colors cursor-pointer flex items-center justify-between group"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                          {preset.name}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-[#94a3b8]">{preset.description}</div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-[#272a42] text-slate-600 dark:text-[#cbd5e1]">
                        {preset.movies.length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Custom Watchlist Manager */
            <div className="bg-slate-50 dark:bg-[#12131f] border border-amber-300/60 dark:border-amber-500/30 rounded-2xl p-5 flex flex-col gap-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#1e2030] pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                  <ListPlus className="w-4 h-4 text-amber-500" />
                  Custom Movie Watchlist
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setBulkInputOpen(!bulkInputOpen)}
                    className="text-xs text-amber-600 dark:text-amber-400 hover:text-amber-500 dark:hover:text-amber-300 transition-colors cursor-pointer font-bold flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{bulkInputOpen ? 'Single Add' : 'Bulk Paste'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomList([])}
                    className="text-xs text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300 transition-colors cursor-pointer font-bold"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Add Input Form */}
              {bulkInputOpen ? (
                <div className="flex flex-col gap-2 p-3 bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/20 rounded-xl">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                    <span>Paste Multiple Movie Titles:</span>
                    <button
                      type="button"
                      onClick={() => setBulkInputOpen(false)}
                      className="text-[11px] text-slate-500 hover:text-slate-800"
                    >
                      Cancel
                    </button>
                  </div>
                  <textarea
                    value={bulkText}
                    onChange={(e) => setBulkText(e.target.value)}
                    placeholder="Paste movie titles, one per line:&#10;Oppenheimer&#10;Dune: Part Two&#10;Interstellar&#10;Everything Everywhere All at Once"
                    rows={4}
                    className="w-full px-3 py-2 bg-white dark:bg-[#1a1b2b] border border-slate-300 dark:border-[#2c2f48] rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#64748b] focus:outline-none focus:border-red-500 font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleBulkImport}
                    className="w-full py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-md flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Import All Movies into Wheel</span>
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddCustomMovie();
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={newTitleInput}
                    onChange={(e) => setNewTitleInput(e.target.value)}
                    placeholder="Add movie title (e.g. Inception)..."
                    className="flex-1 px-3 py-2 bg-white dark:bg-[#1a1b2b] border border-slate-300 dark:border-[#2c2f48] rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#64748b] focus:outline-none focus:border-red-500"
                  />
                  <button
                    type="submit"
                    disabled={!newTitleInput.trim()}
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1 shadow-md"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add
                  </button>
                </form>
              )}

              {/* Movie List Items */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium px-1">
                  <span>Custom Movies on Wheel ({customList.filter((c) => c.enabled).length}):</span>
                  <span>Odds / Actions</span>
                </div>

                <div className="max-h-56 overflow-y-auto flex flex-col gap-1.5 pr-1">
                  {customList.length === 0 ? (
                    <div className="p-4 text-center rounded-xl bg-slate-100 dark:bg-slate-800/50 text-xs text-slate-500">
                      No custom movies added yet. Type a title above or click Bulk Paste!
                    </div>
                  ) : (
                    customList.map((item) => (
                      <div
                        key={item.id}
                        className="p-2 rounded-xl bg-white dark:bg-[#171827] border border-slate-200 dark:border-[#24263a] flex items-center justify-between gap-2 shadow-xs"
                      >
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <input
                            type="checkbox"
                            checked={item.enabled}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setCustomList((prev) =>
                                prev.map((m) => (m.id === item.id ? { ...m, enabled: checked } : m))
                              );
                            }}
                            className="rounded accent-red-500 cursor-pointer"
                            title="Toggle in wheel"
                          />
                          <div
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: item.color }}
                          />
                          <span
                            className={`text-xs truncate font-medium ${
                              item.enabled ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-[#64748b] line-through'
                            }`}
                          >
                            {item.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {/* Weight multiplier selector */}
                          <select
                            value={item.weight || 1}
                            onChange={(e) => {
                              const w = parseInt(e.target.value);
                              setCustomList((prev) =>
                                prev.map((m) => (m.id === item.id ? { ...m, weight: w } : m))
                              );
                            }}
                            className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 rounded px-1 py-0.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                            title="Slice probability weight"
                          >
                            <option value={1}>1x</option>
                            <option value={2}>2x</option>
                            <option value={3}>3x</option>
                          </select>

                          <button
                            type="button"
                            onClick={() =>
                              setCustomList((prev) => prev.filter((m) => m.id !== item.id))
                            }
                            className="text-slate-400 dark:text-[#64748b] hover:text-red-500 dark:hover:text-red-400 transition-colors p-1 cursor-pointer"
                            title="Remove movie"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Quick load popular themed bundles */}
              <div className="pt-2 border-t border-slate-200 dark:border-[#1e2030] space-y-1.5">
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block">
                  Quick Load Popular Custom Lists:
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {POPULAR_CUSTOM_PRESETS.map((bundle) => (
                    <button
                      key={bundle.name}
                      type="button"
                      onClick={() => handleApplyPreset(bundle.movies)}
                      className="p-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-amber-950/30 border border-slate-200 dark:border-slate-700 text-[11px] font-semibold text-slate-700 dark:text-slate-300 text-left truncate transition-colors"
                      title={bundle.movies.join(', ')}
                    >
                      {bundle.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Winner Modal */}
      {winner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#12131f] border border-slate-200 dark:border-[#2d3047] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative flex flex-col gap-5 text-slate-900 dark:text-white">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setWinner(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#1e2030] dark:hover:bg-[#282b40] text-slate-500 dark:text-[#94a3b8] hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Badge */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-red-100 dark:bg-gradient-to-r dark:from-red-500/20 dark:to-amber-500/20 border border-red-200 dark:border-red-500/30 text-red-800 dark:text-amber-300 text-xs font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                Tonight&apos;s Feature Film
              </span>
              {winner.movie && (
                <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-[#1e2030] text-slate-600 dark:text-[#94a3b8] text-xs font-bold">
                  {winner.movie.year}
                </span>
              )}
            </div>

            {/* Title */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {winner.title}
              </h3>
              {winner.movie && (
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 font-bold">
                  Directed by {winner.movie.director}
                </p>
              )}
            </div>

            {/* Spoken Voice Announcer Button */}
            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={() =>
                  announceWinnerTTS(winner.title, {
                    enabled: true,
                    prefix: 'Tonight\'s movie winner is'
                  })
                }
                className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-[#1e2030] dark:hover:bg-[#282b40] text-amber-700 dark:text-amber-300 border border-slate-200 dark:border-[#373a56] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Speak movie winner out loud"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>🔊 Speak Winner Words</span>
              </button>
            </div>

            {/* Meta Tags */}
            {winner.movie && (
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2 py-0.5 rounded bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-500/30 font-bold">
                  {winner.movie.rating}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#1e2030] text-slate-700 dark:text-[#cbd5e1] font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500 dark:text-[#94a3b8]" />
                  {winner.movie.runtimeMinutes} mins
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#1e2030] text-slate-700 dark:text-[#cbd5e1] font-medium capitalize">
                  {winner.movie.genre}
                </span>
                {winner.movie.secondaryGenre && (
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#1e2030] text-slate-700 dark:text-[#cbd5e1] font-medium">
                    {winner.movie.secondaryGenre}
                  </span>
                )}
              </div>
            )}

            {/* Synopsis */}
            {winner.movie?.synopsis ? (
              <p className="text-xs sm:text-sm text-slate-700 dark:text-[#cbd5e1] leading-relaxed bg-slate-50 dark:bg-[#171827] p-3.5 rounded-xl border border-slate-200 dark:border-[#24263a]">
                {winner.movie.synopsis}
              </p>
            ) : (
              <p className="text-xs sm:text-sm text-slate-700 dark:text-[#cbd5e1] bg-slate-50 dark:bg-[#171827] p-3.5 rounded-xl border border-slate-200 dark:border-[#24263a]">
                Ready to watch! Grab your popcorn and enjoy the show.
              </p>
            )}

            {/* Streaming Info */}
            {winner.movie?.streamingPlatforms && winner.movie.streamingPlatforms.length > 0 && (
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-[#94a3b8]">
                <Tv className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                <span>Stream on:</span>
                <div className="flex flex-wrap gap-1">
                  {winner.movie.streamingPlatforms.map((platform) => (
                    <span
                      key={platform}
                      className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-[#212338] text-indigo-700 dark:text-indigo-300 font-semibold text-[11px]"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200 dark:border-[#1e2030]">
              <button
                type="button"
                onClick={() => setWinner(null)}
                className="flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer text-center shadow-md"
              >
                Let&apos;s Watch It!
              </button>

              <button
                type="button"
                onClick={handleEliminateWinner}
                className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#1e2030] dark:hover:bg-[#282b40] text-amber-800 dark:text-amber-300 border border-slate-200 dark:border-[#373a56] font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                title="Veto this film and spin again without it"
              >
                Veto & Spin Again
              </button>

              <button
                type="button"
                onClick={handleSharePick}
                className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#1e2030] dark:hover:bg-[#282b40] text-slate-700 dark:text-[#cbd5e1] transition-colors cursor-pointer"
                title="Copy movie pick to clipboard"
              >
                {copiedNotification ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
