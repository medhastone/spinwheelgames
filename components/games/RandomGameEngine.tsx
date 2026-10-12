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
  Users,
  Clock,
  BookOpen,
  Dice5,
  Gamepad2,
  Heart,
  Ban,
  RotateCcw,
  Boxes,
  Layers,
  GraduationCap,
  Compass,
  Plus,
  Trash2,
  Edit3,
  ListPlus,
  Download,
  Upload,
  Sliders,
  Award
} from 'lucide-react';
import {
  GAME_DATABASE,
  GameCategory,
  GameItem
} from '@/lib/games/gameDatabase';
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

const WHEEL_PALETTE = [
  '#ec4899', // Pink
  '#8b5cf6', // Violet
  '#3b82f6', // Blue
  '#06b6d4', // Cyan
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#f97316', // Orange
  '#a855f7', // Purple
  '#14b8a6'  // Teal
];

const INITIAL_CUSTOM_GAMES: GameItem[] = [
  {
    id: 'cust-1',
    name: 'My Closet Board Game 1',
    category: 'board',
    players: '2-4 players',
    playtime: '30-45 mins',
    difficulty: 'Medium',
    description: 'Custom game from your personal collection.',
    howToPlay: 'Set up the board according to your game box rules and enjoy!',
    setupTips: 'Keep all pieces in organized bags for quick setup.',
    tags: ['Custom']
  },
  {
    id: 'cust-2',
    name: 'Favorite Family Card Game',
    category: 'card',
    players: '3-6 players',
    playtime: '15-20 mins',
    difficulty: 'Easy',
    description: 'Your favorite family household card game.',
    howToPlay: 'Deal equal cards to all players and follow house rules.',
    setupTips: 'Shuffle thoroughly before dealing.',
    tags: ['Custom']
  },
  {
    id: 'cust-3',
    name: 'Custom Party Icebreaker',
    category: 'party',
    players: '4-12 players',
    playtime: '15-30 mins',
    difficulty: 'Easy',
    description: 'Custom hilarious party game for group gatherings.',
    howToPlay: 'Take turns around the room following your custom rules!',
    setupTips: 'Have paper and pens ready.',
    tags: ['Custom']
  }
];

export default function RandomGameEngine() {
  // Favorites storage
  const savedWheels = useSavedWheels();
  const isGameFavorited = savedWheels.some(
    (w) => w.id === 'random-game-picker' || w.title.toLowerCase().includes('random game')
  );
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleFavoriteWheel = () => {
    const isNowSaved = toggleWheelFavorite({
      id: 'random-game-picker',
      title: 'Random Game Picker',
      category: 'Games & Entertainment',
      description: 'Spin to pick board games, party games, card games, classroom energizers and two-player duels.',
      items: GAME_DATABASE.map((g) => ({ id: g.id, text: g.name, weight: 1 })),
      paletteKey: 'arcade'
    });
    setToastMsg(isNowSaved ? '❤️ Saved Random Game Picker to Favorites!' : 'Removed from Favorites');
    setTimeout(() => setToastMsg(null), 2200);
  };

  // Category Filter State ('party' | 'board' | 'card' | 'two-player' | 'group' | 'classroom' | 'quick' | 'all' | 'custom')
  const [activeCategory, setActiveCategory] = useState<GameCategory | 'all' | 'custom'>('party');

  // Custom Games Management State
  const [customGames, setCustomGames] = useState<GameItem[]>(INITIAL_CUSTOM_GAMES);
  const [newGameName, setNewGameName] = useState('');
  const [newGameCat, setNewGameCat] = useState<GameCategory>('party');
  const [newGamePlayers, setNewGamePlayers] = useState('2-6 players');
  const [newGamePlaytime, setNewGamePlaytime] = useState('15-30 mins');
  const [newGameRules, setNewGameRules] = useState('');
  const [showBulkPasteModal, setShowBulkPasteModal] = useState(false);
  const [bulkText, setBulkText] = useState('');

  // No-repeat Elimination State
  const [isNoRepeat, setIsNoRepeat] = useState<boolean>(false);
  const [eliminatedIds, setEliminatedIds] = useState<Set<string>>(new Set());

  // Wheel State
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [selectedGame, setSelectedGame] = useState<GameItem | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [needleAngle, setNeedleAngle] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copiedInfo, setCopiedInfo] = useState<boolean>(false);

  const wheelCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const currentAngleRef = useRef<number>(0);

  // Synchronize fullscreen
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
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Active games list computation
  const activeGames = useMemo(() => {
    if (activeCategory === 'custom') {
      return customGames.filter((g) => !(isNoRepeat && eliminatedIds.has(g.id)));
    }
    return GAME_DATABASE.filter((game) => {
      const matchCat = activeCategory === 'all' || game.category === activeCategory;
      const isEliminated = isNoRepeat && eliminatedIds.has(game.id);
      return matchCat && !isEliminated;
    });
  }, [activeCategory, customGames, isNoRepeat, eliminatedIds]);

  const resetEliminated = () => {
    setEliminatedIds(new Set());
    setToastMsg('🔄 All eliminated games restored to wheel!');
    setTimeout(() => setToastMsg(null), 2000);
  };

  // Add a single custom game
  const handleAddCustomGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGameName.trim()) return;

    const newGame: GameItem = {
      id: `cust-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: newGameName.trim(),
      category: newGameCat,
      players: newGamePlayers || '2+ players',
      playtime: newGamePlaytime || '20 mins',
      difficulty: 'Easy',
      description: 'Custom added game.',
      howToPlay: newGameRules.trim() || 'Custom game added by user.',
      setupTips: 'Prepare game components before playing.',
      tags: ['Custom']
    };

    setCustomGames((prev) => [...prev, newGame]);
    setNewGameName('');
    setNewGameRules('');
    setActiveCategory('custom');
    setToastMsg(`✅ Added "${newGame.name}" to your Custom Games Wheel!`);
    setTimeout(() => setToastMsg(null), 2200);
  };

  // Bulk paste games
  const handleBulkImport = () => {
    if (!bulkText.trim()) return;
    const lines = bulkText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const importedItems: GameItem[] = lines.map((title, idx) => ({
      id: `cust-bulk-${Date.now()}-${idx}`,
      name: title.replace(/^[\d\.\-\*•\s]+/, '').trim(),
      category: 'party',
      players: '2+ players',
      playtime: '15-30 mins',
      difficulty: 'Easy',
      description: 'Custom bulk imported game title.',
      howToPlay: 'Follow standard rules for this game title.',
      setupTips: 'Gather players and enjoy.',
      tags: ['Custom']
    }));

    setCustomGames((prev) => [...prev, ...importedItems]);
    setBulkText('');
    setShowBulkPasteModal(false);
    setActiveCategory('custom');
    setToastMsg(`🎉 Imported ${importedItems.length} custom games to wheel!`);
    setTimeout(() => setToastMsg(null), 2200);
  };

  // Load preset catalog into custom list
  const handleLoadPresetsToCustom = () => {
    const presetItems = GAME_DATABASE.slice(0, 15);
    setCustomGames(presetItems);
    setActiveCategory('custom');
    setToastMsg('📋 Loaded 15 featured catalog games into your Custom List!');
    setTimeout(() => setToastMsg(null), 2200);
  };

  const removeCustomGame = (id: string) => {
    setCustomGames((prev) => prev.filter((g) => g.id !== id));
  };

  // Draw Canvas Wheel
  const drawWheel = useCallback(() => {
    const canvas = wheelCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    const radius = center - 16;

    ctx.clearRect(0, 0, size, size);

    if (activeGames.length === 0) {
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
      if (activeCategory === 'custom' && customGames.length === 0) {
        ctx.fillText('Custom list is empty!', center, center - 12);
        ctx.font = '12px sans-serif';
        ctx.fillText('Add custom games below', center, center + 14);
      } else if (isNoRepeat && eliminatedIds.size > 0) {
        ctx.fillText('All games spun in this list!', center, center - 12);
        ctx.font = '12px sans-serif';
        ctx.fillText('Click [Restore Games] to reset', center, center + 14);
      } else {
        ctx.fillText('No games match this filter', center, center - 10);
        ctx.font = '12px sans-serif';
        ctx.fillText('Select another game category', center, center + 15);
      }
      ctx.restore();
      return;
    }

    const totalWeight = activeGames.length;
    let startAngle = currentAngleRef.current;

    activeGames.forEach((entry, idx) => {
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
      ctx.font = activeGames.length > 14 ? 'bold 10px sans-serif' : activeGames.length > 8 ? 'bold 11px sans-serif' : 'bold 13px sans-serif';
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 3;

      const maxTextWidth = radius - 45;
      let text = entry.name;
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
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 6;
    ctx.stroke();

    // Center Hub
    ctx.beginPath();
    ctx.arc(center, center, 32, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#4f46e5';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Center Hub Game Icon
    ctx.fillStyle = '#4f46e5';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🎲', center, center + 1);
  }, [activeGames, activeCategory, customGames.length, isNoRepeat, eliminatedIds]);

  useEffect(() => {
    drawWheel();
  }, [drawWheel]);

  // Handle Wheel Spin
  const handleSpin = () => {
    if (isSpinning || activeGames.length === 0) return;

    unlockAudioContext();
    if (soundEnabled) playClickSound();

    setIsSpinning(true);
    setSelectedGame(null);

    const winningIndex = getRandomIndex(activeGames.length);
    const selectedItem = activeGames[winningIndex];

    const totalWeight = activeGames.length;
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
        setSelectedGame(selectedItem);
        setNeedleAngle(0);

        if (isNoRepeat) {
          setEliminatedIds((prev) => new Set(prev).add(selectedItem.id));
        }

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

  const copyGameDetails = () => {
    if (!selectedGame) return;
    const text = `🎲 Game Recommendation: ${selectedGame.name}\n📂 Category: ${selectedGame.category}\n👥 Players: ${selectedGame.players}\n⏱️ Playtime: ${selectedGame.playtime}\n📖 How to Play: ${selectedGame.howToPlay}`;
    navigator.clipboard.writeText(text);
    setCopiedInfo(true);
    setToastMsg('📋 Game rules & details copied to clipboard!');
    setTimeout(() => {
      setCopiedInfo(false);
      setToastMsg(null);
    }, 2000);
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
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Toolbar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-[#eeedf7] dark:border-[#222330]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
            <Gamepad2 className="w-4 h-4" />
            <span>Game Night Decision Maker</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>Random Game Picker Wheel</span>
            <button
              type="button"
              onClick={handleFavoriteWheel}
              aria-label="Save tool to favorites"
              title="Bookmark in Favorites"
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                isGameFavorited
                  ? 'bg-rose-500/10 text-rose-500 scale-105'
                  : 'bg-slate-200/80 dark:bg-slate-800 text-slate-400 hover:text-rose-500 hover:bg-rose-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${isGameFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </h2>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto justify-end">
          {/* Custom Games List Tab Launcher */}
          <button
            onClick={() => setActiveCategory(activeCategory === 'custom' ? 'party' : 'custom')}
            className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeCategory === 'custom'
                ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                : 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
            }`}
            title="Manage and spin your own custom games list"
          >
            <ListPlus className="w-3.5 h-3.5" />
            <span>Custom Games List ({customGames.length})</span>
          </button>

          {/* No Repeat Toggle */}
          <button
            onClick={() => setIsNoRepeat(!isNoRepeat)}
            className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              isNoRepeat
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
            }`}
            title="Eliminate spun games so you never pick the same title twice"
          >
            <Ban className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>No-Repeat: {isNoRepeat ? 'ON' : 'OFF'}</span>
            {isNoRepeat && eliminatedIds.size > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-[10px]">
                {eliminatedIds.size} picked
              </span>
            )}
          </button>

          {isNoRepeat && eliminatedIds.size > 0 && (
            <button
              onClick={resetEliminated}
              className="px-2.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restore</span>
            </button>
          )}

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 sm:p-2.5 rounded-xl border text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer ${
              soundEnabled
                ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
            }`}
            title="Toggle Audio Sounds"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 sm:p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Category Filter Pills Bar */}
      <div className="my-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Dice5 className="w-4 h-4 text-indigo-500" />
            <span>Select Category or Custom List</span>
          </span>
          <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
            {activeGames.length} games on wheel
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
          {/* Party Games */}
          <button
            onClick={() => setActiveCategory('party')}
            className={`px-2.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeCategory === 'party'
                ? 'bg-pink-600 text-white shadow-md shadow-pink-500/20'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Party</span>
          </button>

          {/* Board Games */}
          <button
            onClick={() => setActiveCategory('board')}
            className={`px-2.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeCategory === 'board'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Boxes className="w-3.5 h-3.5" />
            <span>Board</span>
          </button>

          {/* Card Games */}
          <button
            onClick={() => setActiveCategory('card')}
            className={`px-2.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeCategory === 'card'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-500/20'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Card</span>
          </button>

          {/* Two-player Games */}
          <button
            onClick={() => setActiveCategory('two-player')}
            className={`px-2.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeCategory === 'two-player'
                ? 'bg-orange-600 text-white shadow-md shadow-orange-500/20'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>2-Player</span>
          </button>

          {/* Group Games */}
          <button
            onClick={() => setActiveCategory('group')}
            className={`px-2.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeCategory === 'group'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Group</span>
          </button>

          {/* Classroom Games */}
          <button
            onClick={() => setActiveCategory('classroom')}
            className={`px-2.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeCategory === 'classroom'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-500/20'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Classroom</span>
          </button>

          {/* Quick Games */}
          <button
            onClick={() => setActiveCategory('quick')}
            className={`px-2.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeCategory === 'quick'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/20'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Quick</span>
          </button>

          {/* All Catalog */}
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-2.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>All Catalog</span>
          </button>

          {/* Custom Games List Tab */}
          <button
            onClick={() => setActiveCategory('custom')}
            className={`px-2.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeCategory === 'custom'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                : 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800'
            }`}
          >
            <ListPlus className="w-3.5 h-3.5" />
            <span>Custom List</span>
          </button>
        </div>
      </div>

      {/* Main Wheel & Result Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-6">
        {/* Wheel Column */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
          {/* Top Pointer Needle */}
          <div
            className="absolute top-0 z-20 transition-transform duration-150 origin-bottom"
            style={{ transform: `rotate(${needleAngle}deg)` }}
          >
            <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[32px] border-t-indigo-600 filter drop-shadow-md" />
          </div>

          <div className="relative p-2 bg-slate-100 dark:bg-slate-900 rounded-full shadow-inner border border-slate-200 dark:border-slate-800 flex items-center justify-center">
            <canvas
              ref={wheelCanvasRef}
              width={420}
              height={420}
              className="w-full max-w-[min(92vw,360px)] aspect-square sm:max-w-[390px] cursor-pointer touch-manipulation transition-transform"
              onClick={handleSpin}
            />
          </div>

          <button
            onClick={handleSpin}
            disabled={isSpinning || activeGames.length === 0}
            className={`mt-5 w-full max-w-sm py-3.5 px-8 rounded-xl font-black text-base text-white shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer ${
              isSpinning || activeGames.length === 0
                ? 'bg-slate-400 cursor-not-allowed opacity-70'
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/25 hover:-translate-y-0.5'
            }`}
          >
            <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>{isSpinning ? 'SPINNING WHEEL...' : 'SPIN FOR RANDOM GAME'}</span>
          </button>

          <p className="text-[11px] text-slate-400 mt-2 text-center">
            {activeGames.length} active game slices
            {isNoRepeat && ` • ${eliminatedIds.size} already played`}
          </p>
        </div>

        {/* Selected Game Details Card */}
        <div className="lg:col-span-5 bg-slate-50 dark:bg-[#181924] p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between min-h-[420px]">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Selected Game</span>
              </span>

              {selectedGame && (
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                    {selectedGame.category}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {selectedGame.difficulty}
                  </span>
                </div>
              )}
            </div>

            {selectedGame ? (
              <div className="space-y-3.5 animate-in fade-in duration-300">
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight">
                    {selectedGame.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {selectedGame.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                    <div className="font-bold text-slate-500 dark:text-slate-400 text-[10px] uppercase flex items-center gap-1">
                      <Users className="w-3 h-3 text-indigo-500" />
                      <span>Players</span>
                    </div>
                    <div className="font-bold text-slate-900 dark:text-white mt-0.5">
                      {selectedGame.players}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                    <div className="font-bold text-slate-500 dark:text-slate-400 text-[10px] uppercase flex items-center gap-1">
                      <Clock className="w-3 h-3 text-indigo-500" />
                      <span>Playtime</span>
                    </div>
                    <div className="font-bold text-slate-900 dark:text-white mt-0.5">
                      {selectedGame.playtime}
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 text-xs text-indigo-900 dark:text-indigo-200 space-y-1">
                  <div className="font-bold flex items-center gap-1 text-[11px] uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>How to Play</span>
                  </div>
                  <p className="leading-relaxed text-[11px] sm:text-xs">
                    {selectedGame.howToPlay}
                  </p>
                </div>

                {selectedGame.setupTips && (
                  <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-[11px] text-amber-900 dark:text-amber-200">
                    <span className="font-bold">Setup Tip: </span>
                    {selectedGame.setupTips}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-10 text-slate-400 space-y-2">
                <Gamepad2 className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700" />
                <p className="text-sm font-medium">Select a category and spin the wheel!</p>
                <p className="text-xs text-slate-400">Or click Custom List to add your own personal games.</p>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={copyGameDetails}
                disabled={!selectedGame}
                className="py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {copiedInfo ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copiedInfo ? 'Copied!' : 'Copy Rules'}</span>
              </button>

              <button
                onClick={handleSpin}
                className="py-2.5 px-3 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCw className="w-4 h-4" />
                <span>Spin Another</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CUSTOM GAMES MANAGEMENT PANEL (Displayed when Custom List active or requested) */}
      {activeCategory === 'custom' && (
        <section className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#181924] rounded-2xl p-5 sm:p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-1">
                <ListPlus className="w-4 h-4" />
                <span>Custom Game Manager</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Add &amp; Customize Your Own Games List
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Add board games from your closet, Steam backlog, or custom household party rules.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowBulkPasteModal(true)}
                className="px-3 py-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 dark:bg-purple-950 dark:hover:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Bulk Paste List</span>
              </button>

              <button
                type="button"
                onClick={handleLoadPresetsToCustom}
                className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Load Preset Catalog</span>
              </button>
            </div>
          </div>

          {/* Form to add individual game */}
          <form onSubmit={handleAddCustomGame} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              + Add New Custom Game
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                value={newGameName}
                onChange={(e) => setNewGameName(e.target.value)}
                placeholder="Game Title (e.g., Ticket to Ride, Charades)"
                required
                className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white font-medium"
              />

              <input
                type="text"
                value={newGamePlayers}
                onChange={(e) => setNewGamePlayers(e.target.value)}
                placeholder="Player Count (e.g., 2-4 players)"
                className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white font-medium"
              />

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newGamePlaytime}
                  onChange={(e) => setNewGamePlaytime(e.target.value)}
                  placeholder="Playtime (e.g. 30 mins)"
                  className="w-1/2 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white font-medium"
                />

                <button
                  type="submit"
                  className="w-1/2 px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Game</span>
                </button>
              </div>
            </div>

            <textarea
              rows={2}
              value={newGameRules}
              onChange={(e) => setNewGameRules(e.target.value)}
              placeholder="Short game rules, objective, or setup instructions (optional)"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white font-medium"
            />
          </form>

          {/* List of current custom games */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
              <span>Your Custom Games ({customGames.length})</span>
              {customGames.length > 0 && (
                <button
                  type="button"
                  onClick={() => setCustomGames([])}
                  className="text-rose-500 hover:text-rose-600 text-xs font-semibold cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {customGames.map((game, idx) => (
                <div
                  key={game.id}
                  className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 shadow-xs"
                >
                  <div className="truncate">
                    <div className="font-bold text-xs text-slate-900 dark:text-white truncate">
                      {idx + 1}. {game.name}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {game.players} • {game.playtime}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeCustomGame(game.id)}
                    className="p-1 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BULK PASTE MODAL */}
      {showBulkPasteModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Upload className="w-5 h-5 text-purple-600" />
                <span>Bulk Paste Custom Games List</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowBulkPasteModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Paste game titles directly from a text document, spreadsheet, or list (one title per line):
            </p>

            <textarea
              rows={8}
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder={"Catan\nTicket to Ride\nExploding Kittens\nWingspan\nWavelength"}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white font-mono leading-relaxed"
            />

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowBulkPasteModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleBulkImport}
                disabled={!bulkText.trim()}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md disabled:opacity-50"
              >
                Import Games List
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
