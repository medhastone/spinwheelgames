'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import confetti from '@/lib/confetti';
import {
  Music,
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
  Mic,
  Disc,
  Radio,
  Flame,
  Search,
  ListPlus,
  X,
  Heart,
  Pencil,
  RotateCcw
} from 'lucide-react';
import {
  SONG_DATABASE,
  SongCategory,
  SongEntry
} from '@/lib/music/songDatabase';
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

const MUSIC_PALETTE = [
  '#ec4899', // Hot Pink
  '#8b5cf6', // Violet
  '#3b82f6', // Royal Blue
  '#06b6d4', // Cyan
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#f97316', // Orange
  '#ef4444'  // Red
];

const SONG_CATEGORY_CONFIG: { id: SongCategory; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'genre', label: 'Genre Mode', icon: Disc },
  { id: 'decade', label: 'Decade Mode', icon: Radio },
  { id: 'mood', label: 'Mood Mode', icon: Sparkles },
  { id: 'karaoke', label: 'Karaoke Mode', icon: Mic },
  { id: 'artists', label: 'Artist List', icon: Heart },
  { id: 'challenge', label: 'Song Challenge', icon: Flame },
  { id: 'custom', label: 'Custom Songs', icon: ListPlus }
];

function getInitialSongCategoryPools(): Record<SongCategory, SongEntry[]> {
  const pools: Record<SongCategory, SongEntry[]> = {
    genre: [],
    decade: [],
    mood: [],
    karaoke: [],
    artists: [],
    challenge: [],
    custom: [
      { id: 'q-song-1', title: 'Bohemian Rhapsody', artist: 'Queen', category: 'custom' },
      { id: 'q-song-2', title: 'Hotel California', artist: 'Eagles', category: 'custom' },
      { id: 'q-song-3', title: 'Superstition', artist: 'Stevie Wonder', category: 'custom' },
      { id: 'q-song-4', title: 'Shape of You', artist: 'Ed Sheeran', category: 'custom' }
    ]
  };

  SONG_DATABASE.forEach((s) => {
    if (pools[s.category]) {
      pools[s.category].push(s);
    }
  });

  return pools;
}

export default function SongWheelEngine() {
  // Category Mode & Pools State
  const [activeCategory, setActiveCategory] = useState<SongCategory>('genre');
  const [selectedDecade, setSelectedDecade] = useState<string>('all');
  const [categoryPools, setCategoryPools] = useState<Record<SongCategory, SongEntry[]>>(getInitialSongCategoryPools);

  useEffect(() => {
    try {
      const savedPools = localStorage.getItem('song_wheel_category_pools_v2');
      if (savedPools) {
        const parsed = JSON.parse(savedPools);
        if (parsed && typeof parsed === 'object') {
          setCategoryPools((prev) => ({ ...prev, ...parsed }));
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [selectedSong, setSelectedSong] = useState<SongEntry | null>(null);
  const [needleAngle, setNeedleAngle] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Quick Add Song Form State
  const [newTitle, setNewTitle] = useState<string>('');
  const [newArtist, setNewArtist] = useState<string>('');
  const [newExtraNote, setNewExtraNote] = useState<string>('');

  // Inline Edit Item State
  const [editingSong, setEditingSong] = useState<SongEntry | null>(null);
  const [editTitle, setEditTitle] = useState<string>('');
  const [editArtist, setEditArtist] = useState<string>('');
  const [editExtraNote, setEditExtraNote] = useState<string>('');

  // Bulk Import Modal State
  const [bulkText, setBulkText] = useState<string>('');
  const [showBulkModal, setShowBulkModal] = useState<boolean>(false);

  // Canvas Refs
  const wheelCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const currentAngleRef = useRef<number>(0);

  const savedWheels = useSavedWheels();
  const isGameFavorited = savedWheels.some(
    (w) => w.id === 'song-wheel' || w.title.trim().toLowerCase() === 'spin the wheel songs'
  );

  const updateCategoryPools = (newPools: Record<SongCategory, SongEntry[]>) => {
    setCategoryPools(newPools);
    try {
      localStorage.setItem('song_wheel_category_pools_v2', JSON.stringify(newPools));
    } catch {
      // ignore
    }
  };

  const handleFavoriteGame = () => {
    const isNowSaved = toggleWheelFavorite({
      id: 'song-wheel',
      title: 'Spin the Wheel Songs',
      category: 'Music & Songs',
      description: 'Random song picker for music trivia, karaoke, mood playlists, and song challenges.',
      items: activeEntries.map((s, idx) => ({ id: s.id || `s-${idx}`, text: s.artist ? `${s.title} - ${s.artist}` : s.title, weight: 1 })),
      paletteKey: 'pink'
    });
    setToastMsg(isNowSaved ? '❤️ Saved Song Wheel to Profile Favorites!' : 'Removed Song Wheel from Profile Favorites');
    setTimeout(() => setToastMsg(null), 2200);
  };

  // Category Change Handler
  const handleCategoryChange = (category: SongCategory) => {
    if (isSpinning) return;
    setActiveCategory(category);
    setSelectedSong(null);
  };

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
        console.error('Fullscreen error:', err);
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.error('Exit fullscreen error:', err);
      });
    }
  };

  // Filter Active Items
  const currentCategoryList = categoryPools[activeCategory] || [];

  const activeEntries = activeCategory === 'decade' && selectedDecade !== 'all'
    ? currentCategoryList.filter((item) => item.decade === selectedDecade)
    : currentCategoryList;

  // Render Wheel Canvas
  const drawWheel = useCallback(() => {
    const canvas = wheelCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    const radius = center - 16;

    ctx.clearRect(0, 0, size, size);

    if (activeEntries.length === 0) {
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
      ctx.fillText('No songs in list', center, center - 10);
      ctx.font = '12px sans-serif';
      ctx.fillText('Add custom songs or switch category', center, center + 15);
      ctx.restore();
      return;
    }

    const totalWeight = activeEntries.length;
    let startAngle = currentAngleRef.current;

    activeEntries.forEach((entry, idx) => {
      const sliceAngle = (1 / totalWeight) * 2 * Math.PI;
      const endAngle = startAngle + sliceAngle;
      const color = MUSIC_PALETTE[idx % MUSIC_PALETTE.length];

      // Slice Fill
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      // Slice Border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Text Label
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = activeEntries.length > 12 ? 'bold 11px sans-serif' : 'bold 13px sans-serif';
      ctx.shadowColor = 'rgba(0,0,0,0.6)';
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
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 6;
    ctx.stroke();

    // Center Vinyl Disc
    ctx.beginPath();
    ctx.arc(center, center, 34, 0, 2 * Math.PI);
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🎵', center, center + 1);
  }, [activeEntries]);

  useEffect(() => {
    drawWheel();
  }, [drawWheel]);

  // Handle Wheel Spin
  const handleSpin = (overrideEntries?: SongEntry[]) => {
    const entriesToUse = Array.isArray(overrideEntries) && overrideEntries.length > 0 ? overrideEntries : activeEntries;
    if (isSpinning || entriesToUse.length === 0) return;

    unlockAudioContext();
    if (soundEnabled) playClickSound();

    setIsSpinning(true);
    setSelectedSong(null);

    const winningIndex = getRandomIndex(entriesToUse.length);
    const selectedItem = entriesToUse[winningIndex];

    const totalWeight = entriesToUse.length;
    const sliceAngle = (1 / totalWeight) * 2 * Math.PI;
    const startSliceAngle = winningIndex * sliceAngle;
    const itemMidAngle = startSliceAngle + sliceAngle / 2;

    const pointerAngle = (3 * Math.PI) / 2; // 270 degrees = top pointer
    const initialAngle = currentAngleRef.current;

    // Normalize current angle to range [0, 2*PI)
    const normalizedCurrent = ((initialAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

    let delta = pointerAngle - itemMidAngle - normalizedCurrent;
    while (delta <= 0) {
      delta += 2 * Math.PI;
    }

    const minRotations = 5 + Math.floor(Math.random() * 3);
    const totalSpinAngle = delta + minRotations * 2 * Math.PI;

    const duration = 4200;
    const startTime = performance.now();
    let lastTickAngle = initialAngle;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentAngle = initialAngle + totalSpinAngle * easeOut;

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
        setSelectedSong(selectedItem);
        setNeedleAngle(0);

        if (soundEnabled) playWinnerFanfare();

        confetti({
          particleCount: 85,
          spread: 75,
          origin: { y: 0.6 }
        });
      }
    };

    requestAnimationFrame(animate);
  };

  // Add Song Handler
  const handleAddSong = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const currentCatObj = SONG_CATEGORY_CONFIG.find((c) => c.id === activeCategory);
    const newEntry: SongEntry = {
      id: `song-${activeCategory}-${Date.now()}`,
      title: newTitle.trim(),
      artist: newArtist.trim() || undefined,
      category: activeCategory,
      karaokeNote: activeCategory === 'karaoke' ? newExtraNote.trim() || undefined : undefined,
      challengePrompt: activeCategory === 'challenge' ? newExtraNote.trim() || undefined : undefined
    };

    const updated = {
      ...categoryPools,
      [activeCategory]: [newEntry, ...(categoryPools[activeCategory] || [])]
    };

    updateCategoryPools(updated);
    setNewTitle('');
    setNewArtist('');
    setNewExtraNote('');
    if (soundEnabled) playClickSound();

    const label = currentCatObj?.label || activeCategory;
    setToastMsg(`Added track to ${label}!`);
    setTimeout(() => setToastMsg(null), 2000);
  };

  // Start & Save Inline Edit
  const handleStartEdit = (s: SongEntry) => {
    setEditingSong(s);
    setEditTitle(s.title);
    setEditArtist(s.artist || '');
    setEditExtraNote(s.karaokeNote || s.challengePrompt || '');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSong || !editTitle.trim()) return;

    const updatedList = (categoryPools[activeCategory] || []).map((s) => {
      if (s.id === editingSong.id) {
        return {
          ...s,
          title: editTitle.trim(),
          artist: editArtist.trim() || undefined,
          karaokeNote: activeCategory === 'karaoke' ? editExtraNote.trim() || undefined : s.karaokeNote,
          challengePrompt: activeCategory === 'challenge' ? editExtraNote.trim() || undefined : s.challengePrompt
        };
      }
      return s;
    });

    updateCategoryPools({
      ...categoryPools,
      [activeCategory]: updatedList
    });

    setEditingSong(null);
    setEditTitle('');
    setEditArtist('');
    setEditExtraNote('');
    if (soundEnabled) playClickSound();

    setToastMsg('Updated track details!');
    setTimeout(() => setToastMsg(null), 2000);
  };

  // Remove Song Handler
  const handleRemoveSong = (id: string) => {
    const updatedList = (categoryPools[activeCategory] || []).filter((s) => s.id !== id);
    updateCategoryPools({
      ...categoryPools,
      [activeCategory]: updatedList
    });
    if (soundEnabled) playClickSound();
  };

  // Reset Category Handler
  const handleResetCategory = () => {
    const defaults = getInitialSongCategoryPools()[activeCategory] || [];
    updateCategoryPools({
      ...categoryPools,
      [activeCategory]: defaults
    });
    const label = SONG_CATEGORY_CONFIG.find((c) => c.id === activeCategory)?.label || activeCategory;
    setToastMsg(`Reset ${label} tracks to defaults!`);
    setTimeout(() => setToastMsg(null), 2000);
  };

  // Bulk Import Handler
  const handleBulkImport = () => {
    if (!bulkText.trim()) return;
    const lines = bulkText.split('\n').filter((l) => l.trim().length > 0);
    const currentCatObj = SONG_CATEGORY_CONFIG.find((c) => c.id === activeCategory);

    const parsed: SongEntry[] = lines.map((line, idx) => {
      const parts = line.split('-');
      const title = parts[0].trim();
      const artist = parts[1] ? parts[1].trim() : undefined;
      return {
        id: `bulk-${activeCategory}-${Date.now()}-${idx}`,
        title,
        artist,
        category: activeCategory
      };
    });

    updateCategoryPools({
      ...categoryPools,
      [activeCategory]: [...parsed, ...(categoryPools[activeCategory] || [])]
    });

    setBulkText('');
    setShowBulkModal(false);
    if (soundEnabled) playClickSound();

    const label = currentCatObj?.label || activeCategory;
    setToastMsg(`Imported ${parsed.length} tracks to ${label}!`);
    setTimeout(() => setToastMsg(null), 2200);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentCatObj = SONG_CATEGORY_CONFIG.find((c) => c.id === activeCategory) || SONG_CATEGORY_CONFIG[0];
  const CategoryIconComp = currentCatObj.icon;

  return (
    <div
      ref={containerRef}
      className={`w-full max-w-6xl mx-auto rounded-3xl transition-all duration-300 relative ${
        isFullscreen
          ? 'fixed inset-0 z-50 bg-[#0f172a] p-4 overflow-y-auto flex flex-col justify-center items-center'
          : 'bg-white dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] shadow-xl p-4 sm:p-6 lg:p-8'
      }`}
    >
      {toastMsg && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-slate-900/95 text-white text-xs font-bold shadow-2xl backdrop-blur-md flex items-center gap-2 border border-slate-700/50 animate-in fade-in slide-in-from-top-3 duration-200">
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-pink-600 dark:text-pink-400 mb-1">
            <Music className="w-4 h-4" />
            <span>Interactive Music & Song Selector</span>
          </div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Spin the Wheel for Songs</span>
            </h2>
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
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2.5 rounded-xl border text-xs font-bold transition-colors flex items-center gap-1.5 ${
              soundEnabled
                ? 'bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-800'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
            }`}
            title="Toggle Audio Feedback"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span>Audio {soundEnabled ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="my-6 space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {SONG_CATEGORY_CONFIG.map((config) => {
            const IconComp = config.icon;
            const isSelected = activeCategory === config.id;
            const count = (categoryPools[config.id] || []).length;

            return (
              <button
                key={config.id}
                onClick={() => handleCategoryChange(config.id)}
                className={`px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  isSelected
                    ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/25 scale-[1.02]'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <IconComp className="w-4 h-4 shrink-0" />
                <span className="truncate">{config.label} ({count})</span>
              </button>
            );
          })}
        </div>

        {/* Decade Secondary Sub-filter */}
        {activeCategory === 'decade' && (
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 overflow-x-auto pb-1">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 shrink-0">Filter Era:</span>
            {['all', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s'].map((dec) => (
              <button
                key={dec}
                onClick={() => setSelectedDecade(dec)}
                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-colors shrink-0 ${
                  selectedDecade === dec
                    ? 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {dec}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Wheel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-8">
        {/* Wheel Canvas Column */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
          {/* Top Pointer Needle */}
          <div
            className="absolute top-0 z-20 transition-transform duration-150 origin-bottom"
            style={{ transform: `rotate(${needleAngle}deg)` }}
          >
            <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[32px] border-t-pink-600 filter drop-shadow-md" />
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

          <button
            onClick={() => handleSpin()}
            disabled={isSpinning || activeEntries.length === 0}
            className={`mt-6 w-full max-w-xs py-3.5 px-8 rounded-2xl font-black text-lg text-white shadow-xl flex items-center justify-center gap-2 transition-all transform active:scale-95 ${
              isSpinning || activeEntries.length === 0
                ? 'bg-slate-400 cursor-not-allowed opacity-70'
                : 'bg-pink-600 hover:bg-pink-700 shadow-pink-500/30 hover:shadow-pink-500/50 hover:-translate-y-0.5'
            }`}
          >
            <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>{isSpinning ? 'SPINNING...' : 'SPIN THE MUSIC WHEEL'}</span>
          </button>
        </div>

        {/* Right Column: Selected Result & Category List Manager */}
        <div className="lg:col-span-6 space-y-6">
          {/* Selected Result Card */}
          <div className="bg-slate-50 dark:bg-slate-900/60 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between min-h-[200px]">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400 flex items-center gap-1.5">
                  <Music className="w-4 h-4" />
                  <span>Selected Track / Result</span>
                </span>

                {selectedSong && (
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800">
                    {selectedSong.category}
                  </span>
                )}
              </div>

              {selectedSong ? (
                <div className="space-y-3 animate-in fade-in duration-300">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                      {selectedSong.title}
                    </h3>
                    {selectedSong.artist && (
                      <p className="text-xs sm:text-sm font-bold text-pink-600 dark:text-pink-400 mt-0.5">
                        By {selectedSong.artist}
                      </p>
                    )}
                  </div>

                  {selectedSong.karaokeNote && (
                    <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-800 dark:text-amber-300 font-medium">
                      <span className="font-bold">🎤 Karaoke Tip: </span>
                      {selectedSong.karaokeNote}
                    </div>
                  )}

                  {selectedSong.challengePrompt && (
                    <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-xs text-red-800 dark:text-red-300 font-medium">
                      {selectedSong.challengePrompt}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400 space-y-2">
                  <Disc className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700 animate-pulse" />
                  <p className="text-xs font-medium">Click &quot;Spin the Music Wheel&quot; to pick your song!</p>
                </div>
              )}
            </div>

            {/* Action Links */}
            <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <a
                  href={
                    selectedSong
                      ? `https://www.google.com/search?q=${encodeURIComponent(
                          `${selectedSong.title} ${selectedSong.artist || ''} lyrics`
                        )}`
                      : '#'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all ${
                    !selectedSong ? 'opacity-50 pointer-events-none' : ''
                  }`}
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Lyrics Search</span>
                </a>

                <button
                  onClick={() => {
                    const searchStr = selectedSong ? `${selectedSong.title} ${selectedSong.artist || ''}` : '';
                    copyToClipboard(searchStr || 'Music Wheel Song');
                  }}
                  disabled={!selectedSong}
                  className="py-2 px-3 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Track'}</span>
                </button>

                <button
                  onClick={() => handleSpin()}
                  className="col-span-2 sm:col-span-1 py-2 px-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Spin Again</span>
                </button>
              </div>
            </div>
          </div>

          {/* Category List & Custom Editor Manager */}
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400">
                  <CategoryIconComp className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    Edit & Custom List: {currentCatObj.label}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Add, edit, or remove tracks for the {currentCatObj.label} wheel
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowBulkModal(true)}
                  className="px-2.5 py-1.5 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400 hover:bg-pink-500/20 text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <ListPlus className="w-3.5 h-3.5" />
                  <span>Bulk Import</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetCategory}
                  title={`Reset ${currentCatObj.label} tracks to defaults`}
                  className="p-1.5 rounded-xl bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Add Form */}
            <form onSubmit={handleAddSong} className="space-y-2.5 pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Song Title (e.g. Blinding Lights)..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <input
                  type="text"
                  placeholder="Artist / Band (Optional)..."
                  value={newArtist}
                  onChange={(e) => setNewArtist(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {(activeCategory === 'karaoke' || activeCategory === 'challenge') && (
                <input
                  type="text"
                  placeholder={activeCategory === 'karaoke' ? 'Karaoke note/tip...' : 'Challenge prompt...'}
                  value={newExtraNote}
                  onChange={(e) => setNewExtraNote(e.target.value)}
                  className="w-full px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              )}

              <button
                type="submit"
                disabled={!newTitle.trim()}
                className="w-full py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Track to {currentCatObj.label}</span>
              </button>
            </form>

            {/* Category Songs List */}
            <div className="max-h-56 overflow-y-auto space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800 pr-1">
              {currentCategoryList.length > 0 ? (
                currentCategoryList.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs group hover:border-pink-300 dark:hover:border-pink-600 transition-colors"
                  >
                    <div className="truncate pr-2 space-y-0.5">
                      <p className="font-bold text-slate-900 dark:text-slate-100 truncate">{s.title}</p>
                      {s.artist && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          By {s.artist}
                        </p>
                      )}
                      {(s.karaokeNote || s.challengePrompt) && (
                        <p className="text-[10px] text-pink-600 dark:text-pink-400 italic truncate">
                          {s.karaokeNote || s.challengePrompt}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-1 opacity-90 sm:opacity-70 group-hover:opacity-100 transition-opacity shrink-0">
                      <button
                        type="button"
                        onClick={() => handleStartEdit(s)}
                        title="Edit track"
                        className="p-1 rounded-lg text-slate-500 hover:text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-950/40"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveSong(s.id)}
                        title="Delete track"
                        className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-slate-400 text-xs italic">
                  No tracks in this category. Click &ldquo;Reset to Defaults&rdquo; or add songs above.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Inline Edit Song Modal */}
      {editingSong && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Pencil className="w-4 h-4 text-pink-500" />
                Edit Track Details ({currentCatObj.label})
              </h3>
              <button
                onClick={() => setEditingSong(null)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">
                  Song Title
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">
                  Artist / Band
                </label>
                <input
                  type="text"
                  value={editArtist}
                  onChange={(e) => setEditArtist(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {(activeCategory === 'karaoke' || activeCategory === 'challenge') && (
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">
                    {activeCategory === 'karaoke' ? 'Karaoke Tip / Note' : 'Challenge Prompt'}
                  </label>
                  <input
                    type="text"
                    value={editExtraNote}
                    onChange={(e) => setEditExtraNote(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingSong(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!editTitle.trim()}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-pink-600 hover:bg-pink-500 text-white transition-colors disabled:opacity-50"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Import Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-2">
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <ListPlus className="w-5 h-5 text-pink-500" />
                Bulk Import to {currentCatObj.label}
              </h3>
              <button
                onClick={() => setShowBulkModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Paste one song per line. You can format as <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">Song Title - Artist Name</code>
            </p>
            <textarea
              rows={8}
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder={`Bohemian Rhapsody - Queen\nHotel California - Eagles\nSuperstition - Stevie Wonder\nBlinding Lights - The Weeknd`}
              className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-pink-500 font-mono mb-4"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setShowBulkModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkImport}
                disabled={!bulkText.trim()}
                className="px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold shadow-md disabled:opacity-50"
              >
                Import to {currentCatObj.label}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
