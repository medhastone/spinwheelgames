'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import confetti from '@/lib/confetti';
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
  Shuffle,
  RefreshCw,
  ListPlus,
  SlidersHorizontal,
  X,
  Clapperboard,
  Heart,
  Users,
  Smile,
  Compass,
  Clock,
  Share2,
  FileText,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Check,
  ExternalLink
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
function getRandomNumber(): number {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0] / (0xffffffff + 1);
  }
  return Math.random();
}

// Wheel Slice Color Palette
const CINEMA_PALETTE = [
  '#e11d48', // Cinema Crimson
  '#2563eb', // Royal Blue
  '#d97706', // Warm Amber
  '#059669', // Emerald
  '#7c3aed', // Deep Purple
  '#db2777', // Rose Pink
  '#0891b2', // Teal
  '#ea580c', // Vivid Orange
  '#0284c7', // Sky Blue
  '#65a30d'  // Lime Gold
];

// Popular preset bundles for custom lists
const POPULAR_CUSTOM_PRESETS = [
  {
    name: 'Sci-Fi Masterpieces',
    movies: ['Interstellar', 'Inception', 'Dune: Part Two', 'Blade Runner 2049', 'The Matrix', 'Arrival']
  },
  {
    name: 'Murder Mysteries',
    movies: ['Knives Out', 'Glass Onion', 'Gone Girl', 'Zodiac', 'Shutter Island', 'Prisoners']
  },
  {
    name: 'Animated Classics',
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
  const [selectedMode, setSelectedMode] = useState<MovieMode>('decision');

  // Filters
  const [selectedGenre, setSelectedGenre] = useState<MovieGenre | 'all'>('all');
  const [selectedRuntime, setSelectedRuntime] = useState<RuntimeCategory>('all');
  const [selectedStreamer, setSelectedStreamer] = useState<string>('all');

  // Mobile Filters Drawer Toggle
  const [mobileFiltersExpanded, setMobileFiltersExpanded] = useState(false);

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
  const [currentRotation, setCurrentRotation] = useState(0);
  const [needleDeflection, setNeedleDeflection] = useState(0);
  const [winner, setWinner] = useState<{
    title: string;
    movie?: MovieItem;
    sliceIndex: number;
  } | null>(null);

  // Sound & Display
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [eliminatedHistory, setEliminatedHistory] = useState<string[]>([]);
  const [toastMsg, setToastMsg] = useState('');
  const [copiedNotification, setCopiedNotification] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);
  const lastTickSliceRef = useRef<number>(-1);

  // Saved wheels integration
  const savedWheels = useSavedWheels();
  const isGameFavorited = savedWheels.some(
    (w) => w.title.toLowerCase() === 'movie wheel'
  );

  const handleFavoriteGame = () => {
    toggleWheelFavorite({
      title: 'Movie Wheel',
      category: 'Movie Decision',
      description: 'Spin to randomly pick what movie to watch tonight',
      items: activeSlices.map((s) => ({
        id: s.id,
        text: s.title,
        color: s.color,
        weight: s.weight
      })),
      paletteKey: 'cinema',
      palette: CINEMA_PALETTE
    });
    setToastMsg(isGameFavorited ? 'Removed from favorites' : 'Saved to favorites!');
    setTimeout(() => setToastMsg(''), 2000);
  };

  // Active Slices Computation
  const activeSlices = useMemo(() => {
    if (activeTab === 'custom') {
      return customList
        .filter((entry) => entry.enabled && !eliminatedHistory.includes(entry.title.toLowerCase()))
        .map((entry, idx) => ({
          id: entry.id,
          title: entry.title,
          color: entry.color || CINEMA_PALETTE[idx % CINEMA_PALETTE.length],
          weight: Math.max(1, entry.weight || 1),
          movie: undefined
        }));
    }

    // Catalog Mode: Filter MOVIE_DATABASE
    let filtered = MOVIE_DATABASE.filter(
      (m) =>
        m.modes.includes(selectedMode) &&
        !eliminatedHistory.includes(m.title.toLowerCase())
    );

    if (selectedGenre !== 'all') {
      filtered = filtered.filter((m) => m.genre === selectedGenre);
    }

    if (selectedRuntime !== 'all') {
      filtered = filtered.filter((m) => {
        if (selectedRuntime === 'quick') return m.runtimeMinutes < 105;
        if (selectedRuntime === 'standard')
          return m.runtimeMinutes >= 105 && m.runtimeMinutes <= 135;
        if (selectedRuntime === 'epic') return m.runtimeMinutes > 135;
        return true;
      });
    }

    if (selectedStreamer !== 'all') {
      filtered = filtered.filter((m) =>
        m.streamingPlatforms.includes(selectedStreamer as any)
      );
    }

    // Ensure balanced slice count for optimal wheel readability (between 6 and 16)
    if (filtered.length > 16) {
      filtered = filtered.slice(0, 16);
    }

    return filtered.map((movie, idx) => ({
      id: movie.id,
      title: movie.title,
      color: movie.color || CINEMA_PALETTE[idx % CINEMA_PALETTE.length],
      weight: 1,
      movie
    }));
  }, [
    activeTab,
    customList,
    selectedMode,
    selectedGenre,
    selectedRuntime,
    selectedStreamer,
    eliminatedHistory
  ]);

  // Total Weight
  const totalWeight = useMemo(() => {
    return activeSlices.reduce((sum, s) => sum + s.weight, 0);
  }, [activeSlices]);

  // Compute SVG Slices Geometry (Radius 200, Center 220, 220)
  const sliceGeometry = useMemo(() => {
    if (activeSlices.length === 0 || totalWeight <= 0) return [];
    let currentAngle = 0;
    const r = 200;
    const cx = 220;
    const cy = 220;

    return activeSlices.map((slice, idx) => {
      const sliceAngle = (slice.weight / totalWeight) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + sliceAngle;
      const midAngle = startAngle + sliceAngle / 2;
      currentAngle = endAngle;

      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;
      const midRad = (midAngle * Math.PI) / 180;

      const x1 = cx + r * Math.cos(startRad);
      const y1 = cy + r * Math.sin(startRad);
      const x2 = cx + r * Math.cos(endRad);
      const y2 = cy + r * Math.sin(endRad);

      const largeArc = sliceAngle > 180 ? 1 : 0;
      const pathData = `M ${cx} ${cy} L ${x1.toFixed(3)} ${y1.toFixed(3)} A ${r} ${r} 0 ${largeArc} 1 ${x2.toFixed(3)} ${y2.toFixed(3)} Z`;

      // Text position along radial
      const textDist = activeSlices.length > 12 ? 140 : 132;
      const tx = cx + textDist * Math.cos(midRad);
      const ty = cy + textDist * Math.sin(midRad);

      // Peg coordinate along edge
      const pegX = cx + (r - 2) * Math.cos(midRad);
      const pegY = cy + (r - 2) * Math.sin(midRad);

      return {
        ...slice,
        index: idx,
        sliceAngle,
        startAngle,
        endAngle,
        midAngle,
        pathData,
        tx,
        ty,
        pegX,
        pegY
      };
    });
  }, [activeSlices, totalWeight]);

  // Spin Engine Trigger
  const spinWheel = useCallback(() => {
    if (isSpinning || activeSlices.length === 0) return;
    unlockAudioContext();
    if (soundEnabled) playClickSound();

    setIsSpinning(true);
    setWinner(null);

    // Pick weighted winner index using cryptographic randomness
    const randomVal = getRandomNumber();
    let accumulated = 0;
    let winningIdx = 0;
    for (let i = 0; i < activeSlices.length; i++) {
      accumulated += activeSlices[i].weight / totalWeight;
      if (randomVal <= accumulated) {
        winningIdx = i;
        break;
      }
    }

    const winnerSlice = sliceGeometry[winningIdx];
    if (!winnerSlice) {
      setIsSpinning(false);
      return;
    }

    // Pointer is at Top (270 degrees in SVG coordinates)
    const pointerAngle = 270;
    // We want winner's midAngle + finalRotation % 360 == pointerAngle
    const desiredFinalAngle = (pointerAngle - winnerSlice.midAngle + 360) % 360;

    // Full rotations (5 to 7 turns)
    const fullTurns = (5 + Math.floor(getRandomNumber() * 3)) * 360;
    const startAngle = rotationRef.current;
    const normalizedStart = ((startAngle % 360) + 360) % 360;
    const distanceToTarget = (desiredFinalAngle - normalizedStart + 360) % 360;
    const finalAngle = startAngle + fullTurns + distanceToTarget;

    const startTime = performance.now();
    const durationMs = 5200;

    // Cubic Ease-Out
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const easedProgress = easeOutCubic(progress);

      const angle = startAngle + (finalAngle - startAngle) * easedProgress;
      rotationRef.current = angle;
      setCurrentRotation(angle);

      // Sound ticker and needle deflection calculation
      if (soundEnabled && sliceGeometry.length > 0) {
        const normalized = ((angle % 360) + 360) % 360;
        // Find which slice is currently under the pointer
        const pointerRelAngle = (pointerAngle - normalized + 360) % 360;
        const currentSliceUnderPointer = sliceGeometry.findIndex(
          (s) => pointerRelAngle >= s.startAngle && pointerRelAngle < s.endAngle
        );

        if (
          currentSliceUnderPointer !== -1 &&
          currentSliceUnderPointer !== lastTickSliceRef.current
        ) {
          playTickSound('carnival', 0.7);
          lastTickSliceRef.current = currentSliceUnderPointer;
          // Spring needle deflection
          setNeedleDeflection(18);
          setTimeout(() => setNeedleDeflection(0), 45);
        }
      }

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Spin finished
        setIsSpinning(false);
        setNeedleDeflection(0);
        const selectedWinner = activeSlices[winningIdx];
        setWinner({
          title: selectedWinner.title,
          movie: selectedWinner.movie,
          sliceIndex: winningIdx
        });

        if (soundEnabled) {
          playWinnerFanfare();
        }

        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 }
        });
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  }, [isSpinning, activeSlices, totalWeight, sliceGeometry, soundEnabled]);

  // Quick Random Movie Picker (Instant)
  const quickRandomMovie = () => {
    if (isSpinning || activeSlices.length === 0) return;
    unlockAudioContext();
    if (soundEnabled) playClickSound();

    const randomIdx = Math.floor(getRandomNumber() * activeSlices.length);
    const selected = activeSlices[randomIdx];
    setWinner({
      title: selected.title,
      movie: selected.movie,
      sliceIndex: randomIdx
    });

    if (soundEnabled) playWinnerFanfare();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  // Veto and eliminate winning movie
  const handleEliminateWinner = (movieTitle: string) => {
    setEliminatedHistory((prev) => [...prev, movieTitle.toLowerCase()]);
    setWinner(null);
    setToastMsg(`Vetoed "${movieTitle}"! Spin again.`);
    setTimeout(() => setToastMsg(''), 2500);
  };

  // Add custom movie
  const handleAddCustomMovie = () => {
    if (!newTitleInput.trim()) return;
    const title = newTitleInput.trim();
    const newEntry: CustomMovieEntry = {
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title,
      weight: 1,
      color: CINEMA_PALETTE[customList.length % CINEMA_PALETTE.length],
      enabled: true
    };
    setCustomList((prev) => [newEntry, ...prev]);
    setNewTitleInput('');
    setToastMsg(`Added "${title}"`);
    setTimeout(() => setToastMsg(''), 1800);
  };

  // Quick add from search bar
  const handleQuickAddMovie = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickAddInput.trim()) return;
    const title = quickAddInput.trim();
    const newEntry: CustomMovieEntry = {
      id: `quick-${Date.now()}`,
      title,
      weight: 1,
      color: CINEMA_PALETTE[customList.length % CINEMA_PALETTE.length],
      enabled: true
    };
    setCustomList((prev) => [newEntry, ...prev]);
    setActiveTab('custom');
    setQuickAddInput('');
    setToastMsg(`Added "${title}" to Custom List`);
    setTimeout(() => setToastMsg(''), 2000);
  };

  // Bulk Import
  const handleBulkImport = () => {
    if (!bulkText.trim()) return;
    const titles = bulkText
      .split('\n')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const newEntries: CustomMovieEntry[] = titles.map((title, idx) => ({
      id: `bulk-${Date.now()}-${idx}`,
      title,
      weight: 1,
      color: CINEMA_PALETTE[(customList.length + idx) % CINEMA_PALETTE.length],
      enabled: true
    }));

    setCustomList((prev) => [...newEntries, ...prev]);
    setBulkText('');
    setBulkInputOpen(false);
    setToastMsg(`Imported ${newEntries.length} titles`);
    setTimeout(() => setToastMsg(''), 2000);
  };

  // Apply Preset Watchlist
  const handleApplyPreset = (movies: string[]) => {
    const newEntries: CustomMovieEntry[] = movies.map((title, idx) => ({
      id: `preset-${Date.now()}-${idx}`,
      title,
      weight: 1,
      color: CINEMA_PALETTE[idx % CINEMA_PALETTE.length],
      enabled: true
    }));
    setCustomList(newEntries);
    setActiveTab('custom');
    setToastMsg(`Loaded preset (${movies.length} films)`);
    setTimeout(() => setToastMsg(''), 2000);
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen?.().catch(() => {});
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
      className={`w-full max-w-[1440px] mx-auto flex flex-col gap-4 transition-all ${
        isFullscreen
          ? 'fixed inset-0 z-50 bg-[#fbf8ff] dark:bg-[#0c0d14] p-4 sm:p-6 overflow-y-auto flex items-center justify-center'
          : ''
      }`}
    >
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-1.5 rounded-full bg-slate-900/95 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow-xl backdrop-blur-md flex items-center gap-1.5 border border-slate-700/50 animate-fadeIn">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 dark:text-amber-600" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Two-Column Interactive Workspace Matching Home Page Look */}
      <div className="w-full flex flex-col lg:flex-row items-stretch justify-center gap-4 sm:gap-5 lg:gap-6">
        
        {/* ========================================================================= */}
        {/* LEFT COLUMN: Dominant Wheel Stage Card                                    */}
        {/* ========================================================================= */}
        <div className="flex-1 w-full lg:min-w-0 bg-white dark:bg-[#0f1017] rounded-3xl border border-[#eeedf7] dark:border-[#20212f] p-4 sm:p-6 lg:p-7 flex flex-col justify-between items-center shadow-lg dark:shadow-xl relative overflow-hidden transition-colors">
          
          {/* Top Stage Bar: Title Indicator + Action Buttons */}
          <div className="w-full flex items-center justify-between z-10 gap-2 mb-2">
            {/* Title / Slice Count Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f4f2fd] dark:bg-[#1b1c28] border border-[#eeedf7] dark:border-[#2e3042] text-xs font-bold text-[#464554] dark:text-[#c7c4d7]">
              <Clapperboard className="w-3.5 h-3.5 text-rose-500" />
              <span>Movie Wheel</span>
              <span className="text-[11px] text-[#4648d4] dark:text-[#8587ff]">({activeSlices.length} films)</span>
            </div>

            {/* Quick Stage Tools */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleFavoriteGame}
                aria-label={isGameFavorited ? 'Remove from favorites' : 'Save to favorites'}
                title={isGameFavorited ? 'Saved in Favorites' : 'Save to Favorites'}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  isGameFavorited
                    ? 'bg-rose-500/10 text-rose-500 border-rose-200 dark:border-rose-900/50'
                    : 'bg-[#f4f2fd] dark:bg-[#1b1c28] text-[#464554] dark:text-[#908fa1] hover:text-rose-500 border-[#eeedf7] dark:border-[#2e3042]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isGameFavorited ? 'fill-rose-500' : ''}`} />
              </button>

              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  soundEnabled
                    ? 'bg-[#f4f2fd] dark:bg-[#1b1c28] text-[#4648d4] dark:text-white border-[#eeedf7] dark:border-[#2e3042]'
                    : 'bg-[#f4f2fd] dark:bg-[#14151e] text-[#908fa1] dark:text-[#6b6a7a] border-[#eeedf7] dark:border-[#2e3042]'
                }`}
                title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
                aria-label="Toggle sound"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={quickRandomMovie}
                disabled={isSpinning || activeSlices.length === 0}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-300/60 dark:border-amber-500/30 text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
                title="Instant random pick"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Quick Pick</span>
              </button>

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

          {/* Quick Add Search Bar On Stage */}
          <div className="w-full max-w-md my-1 z-10">
            <form
              onSubmit={handleQuickAddMovie}
              className="p-1 rounded-2xl bg-[#f4f2fd] dark:bg-[#151622] border border-[#eeedf7] dark:border-[#20212f] flex items-center gap-1"
            >
              <input
                type="text"
                value={quickAddInput}
                onChange={(e) => setQuickAddInput(e.target.value)}
                placeholder="Add any movie (e.g. Oppenheimer)..."
                className="flex-1 min-w-0 px-3 py-1 bg-white dark:bg-[#1c1d2e] border border-[#eeedf7] dark:border-[#2a2c42] rounded-xl text-xs text-[#1a1b22] dark:text-white placeholder-[#767586] focus:outline-none focus:ring-1 focus:ring-rose-500 font-medium"
              />
              <button
                type="submit"
                disabled={!quickAddInput.trim()}
                className="px-3 py-1 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-3 h-3" />
                <span>Add</span>
              </button>
            </form>
          </div>

          {/* Large Wheel Canvas Container (Centered Horizontally & Vertically) */}
          <div className="w-full flex-1 flex items-center justify-center py-2 sm:py-4 select-none relative">
            <div className="relative w-full max-w-[310px] xs:max-w-[350px] sm:max-w-[420px] md:max-w-[460px] lg:max-w-[490px] xl:max-w-[510px] aspect-square flex items-center justify-center p-2">
              
              <svg
                viewBox="0 0 440 440"
                className="w-full h-full filter drop-shadow-md dark:drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)] overflow-visible"
              >
                <defs>
                  {/* Outer Rim Metallic Gradient */}
                  <linearGradient id="movieRimGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f43f5e" />
                    <stop offset="35%" stopColor="#fb7185" />
                    <stop offset="70%" stopColor="#e11d48" />
                    <stop offset="100%" stopColor="#be123c" />
                  </linearGradient>

                  {/* Hub 3D Shadow */}
                  <filter id="movieHubShadow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.45" />
                  </filter>
                </defs>

                {/* Rotating Group (Includes all slices and labels) */}
                <g
                  transform={`rotate(${currentRotation}, 220, 220)`}
                  style={{ willChange: 'transform' }}
                >
                  {activeSlices.length === 0 ? (
                    <g>
                      <circle cx="220" cy="220" r="200" fill="#1e2030" stroke="#3b3f5c" strokeWidth="3" />
                      <text x="220" y="210" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="700">
                        No movies match filters
                      </text>
                      <text x="220" y="235" textAnchor="middle" fill="#64748b" fontSize="12">
                        Add titles or adjust filters
                      </text>
                    </g>
                  ) : (
                    sliceGeometry.map((slice) => {
                      const maxChar = activeSlices.length > 12 ? 14 : 18;
                      const displayTitle =
                        slice.title.length > maxChar
                          ? slice.title.substring(0, maxChar - 1) + '…'
                          : slice.title;

                      return (
                        <g key={slice.id || slice.index}>
                          {/* Slice Path */}
                          <path
                            d={slice.pathData}
                            fill={slice.color}
                            stroke="#ffffff"
                            strokeWidth={activeSlices.length > 12 ? '1' : '1.5'}
                            strokeLinejoin="round"
                          />

                          {/* Radial Text Label */}
                          <text
                            x={slice.tx}
                            y={slice.ty}
                            transform={`rotate(${slice.midAngle}, ${slice.tx}, ${slice.ty})`}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fill="#ffffff"
                            fontWeight="800"
                            fontSize={
                              activeSlices.length > 14
                                ? '10'
                                : activeSlices.length > 10
                                ? '11'
                                : '12.5'
                            }
                            style={{
                              paintOrder: 'stroke fill',
                              stroke: 'rgba(0, 0, 0, 0.5)',
                              strokeWidth: '2.5px',
                              letterSpacing: '-0.02em',
                              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
                            }}
                          >
                            {displayTitle}
                          </text>

                          {/* Circumference Peg */}
                          <circle
                            cx={slice.pegX}
                            cy={slice.pegY}
                            r="3.5"
                            fill="#fbbf24"
                            stroke="#ffffff"
                            strokeWidth="1.2"
                            filter="drop-shadow(0 1px 2px rgba(0,0,0,0.5))"
                          />
                        </g>
                      );
                    })
                  )}

                  {/* Inner Ring Divider */}
                  <circle
                    cx="220"
                    cy="220"
                    r="200"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeOpacity="0.4"
                  />
                </g>

                {/* Outer Stationary Metallic Rim */}
                <circle
                  cx="220"
                  cy="220"
                  r="204"
                  fill="none"
                  stroke="url(#movieRimGradient)"
                  strokeWidth="8"
                  filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
                />

                {/* Interactive Center Hub Button */}
                <g
                  onClick={spinWheel}
                  className="cursor-pointer group"
                  aria-label="Spin Movie Wheel"
                  role="button"
                >
                  <circle
                    cx="220"
                    cy="220"
                    r="44"
                    fill="#ffffff"
                    filter="url(#movieHubShadow)"
                    className="group-hover:scale-105 transition-transform"
                  />
                  <circle
                    cx="220"
                    cy="220"
                    r="38"
                    fill="#0f172a"
                    className="group-hover:opacity-95 transition-opacity"
                  />
                  <circle
                    cx="220"
                    cy="220"
                    r="32"
                    fill="#e11d48"
                    className="group-hover:fill-[#f43f5e] active:scale-95 transition-all"
                  />
                  <text
                    x="220"
                    y={isSpinning ? '220' : '216'}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#ffffff"
                    fontWeight="800"
                    fontSize={isSpinning ? '11' : '13'}
                    letterSpacing="0.06em"
                    fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                    className="pointer-events-none select-none"
                  >
                    {isSpinning ? 'SPINNING' : 'SPIN'}
                  </text>
                  {!isSpinning && (
                    <text
                      x="220"
                      y="228"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#ffd4dc"
                      fontWeight="600"
                      fontSize="8"
                      letterSpacing="0.08em"
                      className="pointer-events-none select-none"
                    >
                      CLICK
                    </text>
                  )}
                </g>

                {/* Physical Top Pointer Needle with Spring Deflection */}
                <g
                  transform={`translate(220, 18) rotate(${needleDeflection})`}
                  style={{ transformOrigin: '0 0', transition: 'transform 0.05s ease-out' }}
                  filter="drop-shadow(0 3px 6px rgba(0,0,0,0.5))"
                >
                  <path
                    d="M -12 -12 L 12 -12 L 0 24 Z"
                    fill="#fbbf24"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  <circle cx="0" cy="-6" r="3.5" fill="#ffffff" stroke="#fbbf24" strokeWidth="1.5" />
                </g>
              </svg>
            </div>
          </div>

          {/* Bottom Stage Toolbar */}
          <div className="w-full pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#eeedf7] dark:border-[#1e1f2d]">
            {/* Left Controls: Veto Reset & Shuffle */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
              {eliminatedHistory.length > 0 && (
                <button
                  type="button"
                  onClick={() => setEliminatedHistory([])}
                  className="px-3 py-1.5 rounded-xl bg-[#f4f2fd] dark:bg-[#1b1c28] hover:bg-[#eae6fd] text-xs font-bold text-[#464554] dark:text-[#c7c4d7] border border-[#eeedf7] dark:border-[#2e3042] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-rose-500" />
                  <span>Reset Vetoes ({eliminatedHistory.length})</span>
                </button>
              )}

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#f4f2fd] dark:bg-[#14151e] border border-[#eeedf7] dark:border-[#2e3042] text-[11px] font-bold text-[#006c49] dark:text-emerald-400 font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Web Crypto CSPRNG</span>
              </span>
            </div>

            {/* Primary Spin Button (Desktop/Tablet) */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={quickRandomMovie}
                disabled={isSpinning || activeSlices.length === 0}
                className="px-3.5 py-2.5 rounded-xl bg-[#f4f2fd] dark:bg-[#1b1c28] hover:bg-[#eae6fd] text-xs font-bold text-[#464554] dark:text-[#c7c4d7] border border-[#eeedf7] dark:border-[#2e3042] transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
              >
                <Shuffle className="w-3.5 h-3.5 text-amber-500" />
                <span>Quick Roll</span>
              </button>

              <button
                type="button"
                onClick={spinWheel}
                disabled={isSpinning || activeSlices.length === 0}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-extrabold text-sm tracking-wide shadow-md transition-all cursor-pointer transform active:scale-98 disabled:opacity-50 flex items-center gap-2"
              >
                <RotateCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
                <span>{isSpinning ? 'Picking Film...' : 'SPIN MOVIE WHEEL'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Sleek Filter & Watchlist Sidebar                            */}
        {/* ========================================================================= */}
        <div className="w-full lg:w-[380px] xl:w-[420px] flex-shrink-0 bg-white dark:bg-[#0f1017] rounded-3xl border border-[#eeedf7] dark:border-[#20212f] shadow-lg dark:shadow-xl p-4 sm:p-5 flex flex-col gap-3.5">
          
          {/* Top Segmented Mode Switcher: Catalog vs Custom */}
          <div className="w-full bg-[#f4f2fd] dark:bg-[#151622] p-1 rounded-2xl border border-[#eeedf7] dark:border-[#20212f] grid grid-cols-2 gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('catalog')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'catalog'
                  ? 'bg-white dark:bg-[#1e1f2d] text-[#1a1b22] dark:text-white shadow-xs'
                  : 'text-[#464554] dark:text-[#908fa1] hover:text-[#1a1b22]'
              }`}
            >
              <Clapperboard className="w-3.5 h-3.5 text-rose-500" />
              <span>Curated Catalog</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('custom')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'custom'
                  ? 'bg-white dark:bg-[#1e1f2d] text-[#1a1b22] dark:text-white shadow-xs'
                  : 'text-[#464554] dark:text-[#908fa1] hover:text-[#1a1b22]'
              }`}
            >
              <ListPlus className="w-3.5 h-3.5 text-amber-500" />
              <span>Custom Watchlist</span>
            </button>
          </div>

          {/* Mobile Accordion Toggle Button (Visible on mobile screens) */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setMobileFiltersExpanded(!mobileFiltersExpanded)}
              className="w-full py-2 px-3 rounded-xl bg-[#f4f2fd] dark:bg-[#151622] border border-[#eeedf7] dark:border-[#20212f] text-xs font-bold text-[#1a1b22] dark:text-white flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-rose-500" />
                <span>
                  {activeTab === 'catalog' ? 'Genre & Platform Filters' : 'Manage Watchlist'} ({activeSlices.length} on wheel)
                </span>
              </span>
              {mobileFiltersExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Filters & Options Body (Always visible on desktop, toggleable on mobile) */}
          <div className={`${mobileFiltersExpanded ? 'flex' : 'hidden lg:flex'} flex-col gap-3.5 flex-1`}>
            {activeTab === 'catalog' ? (
              /* ================= CURATED CATALOG VIEW ================= */
              <div className="flex flex-col gap-3">
                
                {/* Vibe Mode Switcher */}
                <div>
                  <label className="text-[11px] font-bold text-[#464554] dark:text-[#908fa1] block mb-1">
                    Experience Vibe:
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'decision', label: 'Decision Mode', icon: Compass, color: 'text-rose-500' },
                      { id: 'family', label: 'Family & Kids', icon: Smile, color: 'text-emerald-500' },
                      { id: 'date_night', label: 'Date Night', icon: Heart, color: 'text-pink-500' },
                      { id: 'group', label: 'Group Movies', icon: Users, color: 'text-purple-500' }
                    ].map((mode) => {
                      const Icon = mode.icon;
                      const isActive = selectedMode === mode.id;
                      return (
                        <button
                          key={mode.id}
                          type="button"
                          onClick={() => setSelectedMode(mode.id as MovieMode)}
                          className={`p-2 rounded-xl border text-left transition-all flex items-center gap-2 cursor-pointer ${
                            isActive
                              ? 'bg-[#f4f2fd] dark:bg-[#1a1b29] border-rose-300 dark:border-rose-900/60 text-[#1a1b22] dark:text-white font-bold'
                              : 'bg-white dark:bg-[#13141f] border-[#eeedf7] dark:border-[#222332] text-[#464554] dark:text-[#908fa1] hover:border-[#d9d7e8]'
                          }`}
                        >
                          <Icon className={`w-3.5 h-3.5 ${mode.color}`} />
                          <span className="text-xs truncate">{mode.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Genre Interactive Filter Buttons */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-[#464554] dark:text-[#908fa1]">
                      Genre Filter:
                    </label>
                    {selectedGenre !== 'all' && (
                      <button
                        type="button"
                        onClick={() => setSelectedGenre('all')}
                        className="text-[10px] font-bold text-rose-500 hover:underline"
                      >
                        Reset Genre
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <button
                      type="button"
                      onClick={() => setSelectedGenre('all')}
                      className={`px-2.5 py-1 rounded-xl text-xs transition-colors cursor-pointer ${
                        selectedGenre === 'all'
                          ? 'bg-rose-600 text-white font-bold'
                          : 'bg-[#f4f2fd] dark:bg-[#171825] text-[#464554] dark:text-[#908fa1] hover:text-[#1a1b22] border border-[#eeedf7] dark:border-[#222332]'
                      }`}
                    >
                      All
                    </button>
                    {Object.entries(GENRE_METADATA).map(([genreKey, meta]) => (
                      <button
                        key={genreKey}
                        type="button"
                        onClick={() => setSelectedGenre(genreKey as MovieGenre)}
                        className={`px-2.5 py-1 rounded-xl text-xs transition-colors cursor-pointer ${
                          selectedGenre === genreKey
                            ? 'bg-rose-600 text-white font-bold'
                            : 'bg-[#f4f2fd] dark:bg-[#171825] text-[#464554] dark:text-[#908fa1] hover:text-[#1a1b22] border border-[#eeedf7] dark:border-[#222332]'
                        }`}
                      >
                        {meta.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Runtime Filter */}
                <div>
                  <label className="text-[11px] font-bold text-[#464554] dark:text-[#908fa1] block mb-1">
                    Max Runtime:
                  </label>
                  <div className="grid grid-cols-4 gap-1">
                    {[
                      { id: 'all', label: 'Any' },
                      { id: 'quick', label: '< 105m' },
                      { id: 'standard', label: '105-135m' },
                      { id: 'epic', label: '135m+' }
                    ].map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setSelectedRuntime(r.id as RuntimeCategory)}
                        className={`py-1 px-1.5 rounded-xl text-xs text-center transition-colors cursor-pointer ${
                          selectedRuntime === r.id
                            ? 'bg-amber-500/15 border border-amber-400 dark:border-amber-500/50 text-amber-900 dark:text-amber-300 font-bold'
                            : 'bg-[#f4f2fd] dark:bg-[#171825] text-[#464554] dark:text-[#908fa1] border border-[#eeedf7] dark:border-[#222332]'
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Streaming Platform Filter */}
                <div>
                  <label className="text-[11px] font-bold text-[#464554] dark:text-[#908fa1] block mb-1">
                    Streaming Platform:
                  </label>
                  <div className="flex flex-wrap gap-1">
                    {['all', 'Netflix', 'Prime Video', 'Disney+', 'Max', 'Apple TV', 'Hulu'].map(
                      (streamer) => (
                        <button
                          key={streamer}
                          type="button"
                          onClick={() => setSelectedStreamer(streamer)}
                          className={`px-2.5 py-1 rounded-xl text-xs transition-colors cursor-pointer ${
                            selectedStreamer === streamer
                              ? 'bg-[#4648d4] text-white font-bold'
                              : 'bg-[#f4f2fd] dark:bg-[#171825] text-[#464554] dark:text-[#908fa1] border border-[#eeedf7] dark:border-[#222332]'
                          }`}
                        >
                          {streamer === 'all' ? 'All Platforms' : streamer}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Curated Presets Bar */}
                <div className="pt-2 border-t border-[#eeedf7] dark:border-[#1e1f2d]">
                  <label className="text-[11px] font-bold text-[#464554] dark:text-[#908fa1] block mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>Quick Theme Watchlists:</span>
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {PRESET_WATCHLISTS.map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => handleApplyPreset(preset.movies)}
                        className="p-2 rounded-xl bg-[#f4f2fd] dark:bg-[#171825] hover:bg-[#eae6fd] dark:hover:bg-[#202235] border border-[#eeedf7] dark:border-[#222332] text-left transition-colors cursor-pointer flex items-center justify-between"
                      >
                        <span className="text-xs font-bold text-[#1a1b22] dark:text-white truncate">
                          {preset.name}
                        </span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-lg bg-white dark:bg-[#25273d] text-[#4648d4] dark:text-[#8587ff]">
                          {preset.movies.length}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              /* ================= CUSTOM WATCHLIST VIEW ================= */
              <div className="flex flex-col gap-3">
                
                {/* Header row: Action buttons */}
                <div className="flex items-center justify-between pb-1 border-b border-[#eeedf7] dark:border-[#1e1f2d]">
                  <span className="text-xs font-bold text-[#1a1b22] dark:text-white flex items-center gap-1.5">
                    <ListPlus className="w-3.5 h-3.5 text-amber-500" />
                    <span>Custom List ({customList.filter((c) => c.enabled).length} active)</span>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setBulkInputOpen(!bulkInputOpen)}
                      className="text-xs text-[#4648d4] dark:text-[#8587ff] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <FileText className="w-3 h-3" />
                      <span>{bulkInputOpen ? 'Single' : 'Bulk Paste'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCustomList([])}
                      className="text-xs text-rose-500 font-bold cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                {/* Add Input Forms */}
                {bulkInputOpen ? (
                  <div className="flex flex-col gap-1.5 p-2 bg-amber-500/5 dark:bg-amber-950/20 border border-amber-300/50 dark:border-amber-500/30 rounded-2xl">
                    <textarea
                      value={bulkText}
                      onChange={(e) => setBulkText(e.target.value)}
                      placeholder="Paste movie titles, one per line..."
                      rows={3}
                      className="w-full px-2.5 py-1.5 bg-white dark:bg-[#1a1b2b] border border-[#eeedf7] dark:border-[#2c2f48] rounded-xl text-xs text-[#1a1b22] dark:text-white placeholder-[#767586] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleBulkImport}
                      className="w-full py-1.5 bg-rose-600 text-white text-xs font-bold rounded-xl hover:bg-rose-500 cursor-pointer"
                    >
                      Import Titles to Wheel
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAddCustomMovie();
                    }}
                    className="flex gap-1.5"
                  >
                    <input
                      type="text"
                      value={newTitleInput}
                      onChange={(e) => setNewTitleInput(e.target.value)}
                      placeholder="Add title (e.g. Inception)..."
                      className="flex-1 px-3 py-1.5 bg-white dark:bg-[#1a1b2b] border border-[#eeedf7] dark:border-[#2c2f48] rounded-xl text-xs text-[#1a1b22] dark:text-white placeholder-[#767586] focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={!newTitleInput.trim()}
                      className="px-3 py-1.5 bg-rose-600 disabled:opacity-50 text-white text-xs font-bold rounded-xl cursor-pointer"
                    >
                      Add
                    </button>
                  </form>
                )}

                {/* Scrollable Custom List */}
                <div className="max-h-52 overflow-y-auto flex flex-col gap-1 pr-0.5">
                  {customList.length === 0 ? (
                    <div className="p-4 text-center rounded-2xl bg-[#f4f2fd] dark:bg-[#151622] text-xs text-[#767586]">
                      No custom titles added yet. Type a movie above or use Bulk Paste!
                    </div>
                  ) : (
                    customList.map((item) => (
                      <div
                        key={item.id}
                        className="p-2 rounded-xl bg-[#f4f2fd] dark:bg-[#171825] border border-[#eeedf7] dark:border-[#222332] flex items-center justify-between gap-2"
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
                            className="rounded accent-rose-500 cursor-pointer"
                          />
                          <div
                            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: item.color }}
                          />
                          <span
                            className={`text-xs truncate font-medium ${
                              item.enabled ? 'text-[#1a1b22] dark:text-white' : 'text-[#767586] line-through'
                            }`}
                          >
                            {item.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <select
                            value={item.weight || 1}
                            onChange={(e) => {
                              const w = parseInt(e.target.value);
                              setCustomList((prev) =>
                                prev.map((m) => (m.id === item.id ? { ...m, weight: w } : m))
                              );
                            }}
                            className="text-[10px] font-bold bg-white dark:bg-[#25273d] rounded-lg px-1.5 py-0.5 border border-[#eeedf7] dark:border-[#2e3046] text-[#1a1b22] dark:text-white cursor-pointer"
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
                            className="text-[#767586] hover:text-rose-500 p-1 cursor-pointer"
                            aria-label={`Remove ${item.title}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Popular Themes to Quick Load */}
                <div className="pt-2 border-t border-[#eeedf7] dark:border-[#1e1f2d]">
                  <span className="text-[11px] font-bold text-[#464554] dark:text-[#908fa1] block mb-1">
                    Load Popular Themes:
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {POPULAR_CUSTOM_PRESETS.map((bundle) => (
                      <button
                        key={bundle.name}
                        type="button"
                        onClick={() => handleApplyPreset(bundle.movies)}
                        className="p-2 rounded-xl bg-[#f4f2fd] dark:bg-[#171825] hover:bg-[#eae6fd] dark:hover:bg-[#202235] border border-[#eeedf7] dark:border-[#222332] text-xs font-semibold text-[#1a1b22] dark:text-white text-left truncate cursor-pointer"
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
      </div>

      {/* Sticky Bottom Spin CTA Bar on Mobile Screens */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0c0d14]/95 backdrop-blur-md p-2.5 border-t border-[#eeedf7] dark:border-[#20212f] shadow-2xl flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={quickRandomMovie}
          disabled={isSpinning || activeSlices.length === 0}
          className="px-3 py-2.5 rounded-xl bg-[#f4f2fd] dark:bg-[#1b1c28] text-[#1a1b22] dark:text-white font-bold text-xs flex items-center gap-1 cursor-pointer disabled:opacity-50 border border-[#eeedf7] dark:border-[#2e3042]"
        >
          <Shuffle className="w-3.5 h-3.5 text-amber-500" />
          <span>Quick</span>
        </button>

        <button
          type="button"
          onClick={spinWheel}
          disabled={isSpinning || activeSlices.length === 0}
          className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white font-black text-xs tracking-wide shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isSpinning ? 'animate-spin' : ''}`} />
          <span>{isSpinning ? 'Spinning...' : 'SPIN MOVIE WHEEL'}</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* WINNER CELEBRATION MODAL                                                  */}
      {/* ========================================================================= */}
      {winner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-[#0f1017] border border-[#eeedf7] dark:border-[#2d3047] rounded-3xl max-w-md w-full p-6 shadow-2xl relative flex flex-col gap-4 text-[#1a1b22] dark:text-white">
            
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setWinner(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-[#f4f2fd] hover:bg-[#eae6fd] dark:bg-[#1e2030] dark:hover:bg-[#282b40] text-[#464554] dark:text-[#94a3b8] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Winner Kicker */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Tonight&apos;s Winner</span>
              </span>
              {winner.movie && (
                <span className="text-xs font-bold text-[#767586]">
                  {winner.movie.year}
                </span>
              )}
            </div>

            {/* Movie Title & Director */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#1a1b22] dark:text-white tracking-tight leading-tight">
                {winner.title}
              </h3>
              {winner.movie && (
                <p className="text-sm text-rose-600 dark:text-rose-400 mt-1 font-semibold">
                  Directed by {winner.movie.director}
                </p>
              )}
            </div>

            {/* Meta Tags */}
            {winner.movie && (
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2 py-0.5 rounded-lg bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 font-bold">
                  {winner.movie.rating}
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-[#f4f2fd] dark:bg-[#1b1c28] text-[#464554] dark:text-[#c7c4d7] font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#767586]" />
                  {winner.movie.runtimeMinutes}m
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-[#f4f2fd] dark:bg-[#1b1c28] text-[#464554] dark:text-[#c7c4d7] font-medium capitalize">
                  {winner.movie.genre}
                </span>
              </div>
            )}

            {/* Synopsis */}
            {winner.movie && (
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed bg-[#f4f2fd] dark:bg-[#151622] p-3 rounded-2xl border border-[#eeedf7] dark:border-[#20212f]">
                {winner.movie.synopsis}
              </p>
            )}

            {/* Streaming Platforms */}
            {winner.movie && winner.movie.streamingPlatforms.length > 0 && (
              <div>
                <span className="text-[11px] font-bold text-[#767586] block mb-1.5">
                  Available On:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {winner.movie.streamingPlatforms.map((platform) => (
                    <span
                      key={platform}
                      className="px-2.5 py-1 rounded-xl bg-[#4648d4]/10 text-[#4648d4] dark:text-[#8587ff] text-xs font-bold"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 pt-2 border-t border-[#eeedf7] dark:border-[#20212f]">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() =>
                    announceWinnerTTS(winner.title, {
                      enabled: true,
                      prefix: "Tonight's movie winner is"
                    })
                  }
                  className="py-2.5 px-3 rounded-2xl bg-[#f4f2fd] hover:bg-[#eae6fd] dark:bg-[#1b1c28] dark:hover:bg-[#25273d] text-xs font-bold text-[#1a1b22] dark:text-white flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Volume2 className="w-4 h-4 text-amber-500" />
                  <span>Read Aloud</span>
                </button>

                <button
                  type="button"
                  onClick={handleSharePick}
                  className="py-2.5 px-3 rounded-2xl bg-[#f4f2fd] hover:bg-[#eae6fd] dark:bg-[#1b1c28] dark:hover:bg-[#25273d] text-xs font-bold text-[#1a1b22] dark:text-white flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  {copiedNotification ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4 text-[#4648d4]" />
                      <span>Share Result</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleEliminateWinner(winner.title)}
                  className="py-2.5 px-4 rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold cursor-pointer transition-colors flex items-center justify-center gap-1.5"
                  title="Remove this title and spin again without it"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Veto &amp; Spin Again</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setWinner(null);
                    setTimeout(() => spinWheel(), 150);
                  }}
                  className="flex-1 py-2.5 px-4 rounded-2xl bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold text-xs shadow-md cursor-pointer hover:brightness-110 transition-all flex items-center justify-center gap-1.5"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Spin Again</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
