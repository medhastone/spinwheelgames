'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  RotateCw,
  Volume2,
  VolumeX,
  Sparkles,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  Heart,
  Trash2,
  HelpCircle,
  Users,
  GraduationCap,
  PartyPopper,
  MessageSquare,
  Briefcase,
  Smile,
  Plus,
  RefreshCw,
  Bookmark,
  CheckCircle2,
  Sliders,
  Pencil,
  RotateCcw,
  ListPlus,
  X
} from 'lucide-react';
import confetti from '@/lib/confetti';
import { useSavedWheels, toggleWheelFavorite } from '@/lib/storage';
import {
  QUESTION_DATABASE,
  QuestionEntry,
  QuestionMode,
  QuestionDifficulty
} from '@/lib/questions/questionDatabase';

const MODE_PALETTE: Record<QuestionMode, string[]> = {
  trivia: ['#3b82f6', '#1d4ed8', '#60a5fa', '#2563eb', '#1e40af'],
  icebreakers: ['#ec4899', '#db2777', '#f472b6', '#c026d3', '#e11d48'],
  classroom: ['#10b981', '#059669', '#34d399', '#047857', '#0d9488'],
  party: ['#f59e0b', '#d97706', '#fbbf24', '#b45309', '#eab308'],
  conversation: ['#8b5cf6', '#7c3aed', '#a78bfa', '#6d28d9', '#5b21b6'],
  interview: ['#0284c7', '#0369a1', '#38bdf8', '#075985', '#0c4a6e'],
  kids: ['#f43f5e', '#e11d48', '#fb7185', '#be123c', '#9f1239'],
  custom: ['#14b8a6', '#0d9488', '#2dd4bf', '#0f766e', '#115e59']
};

const QUESTION_MODE_CONFIG: { id: QuestionMode; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'icebreakers', label: 'Icebreakers', icon: Users },
  { id: 'trivia', label: 'Trivia', icon: HelpCircle },
  { id: 'classroom', label: 'Classroom', icon: GraduationCap },
  { id: 'party', label: 'Party', icon: PartyPopper },
  { id: 'conversation', label: 'Conversation', icon: MessageSquare },
  { id: 'interview', label: 'Interview', icon: Briefcase },
  { id: 'kids', label: 'Kids', icon: Smile },
  { id: 'custom', label: 'Custom', icon: Plus }
];

function getRandomIndex(max: number): number {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % max;
  }
  return Math.floor(Math.random() * max);
}

function getInitialQuestionCategoryPools(): Record<QuestionMode, QuestionEntry[]> {
  const pools: Record<QuestionMode, QuestionEntry[]> = {
    icebreakers: [],
    trivia: [],
    classroom: [],
    party: [],
    conversation: [],
    interview: [],
    kids: [],
    custom: [
      { id: 'q-cust-1', text: 'What is your favorite weekend hobby?', mode: 'custom', category: 'General', difficulty: 'easy' },
      { id: 'q-cust-2', text: 'What place would you love to visit next?', mode: 'custom', category: 'Travel', difficulty: 'medium' },
      { id: 'q-cust-3', text: 'What is a book or movie you recommend to everyone?', mode: 'custom', category: 'Favorites', difficulty: 'easy' }
    ]
  };

  QUESTION_DATABASE.forEach((q) => {
    if (pools[q.mode]) {
      pools[q.mode].push(q);
    }
  });

  return pools;
}

export default function QuestionWheelEngine() {
  const [activeMode, setActiveMode] = useState<QuestionMode>('icebreakers');
  const [categoryPools, setCategoryPools] = useState<Record<QuestionMode, QuestionEntry[]>>(getInitialQuestionCategoryPools);
  const [selectedDifficulty, setSelectedDifficulty] = useState<QuestionDifficulty | 'all'>('all');
  const [isNoRepeat, setIsNoRepeat] = useState<boolean>(false);
  const [eliminatedIds, setEliminatedIds] = useState<string[]>([]);

  // Add question form state
  const [newQuestionText, setNewQuestionText] = useState<string>('');
  const [newQuestionCat, setNewQuestionCat] = useState<string>('');
  const [newQuestionDiff, setNewQuestionDiff] = useState<QuestionDifficulty>('medium');
  const [newQuestionAnswer, setNewQuestionAnswer] = useState<string>('');

  // Inline edit item state
  const [editingItem, setEditingItem] = useState<QuestionEntry | null>(null);
  const [editText, setEditText] = useState<string>('');
  const [editCategory, setEditCategory] = useState<string>('');
  const [editDifficulty, setEditDifficulty] = useState<QuestionDifficulty>('medium');
  const [editAnswer, setEditAnswer] = useState<string>('');

  // Bulk Import state
  const [bulkText, setBulkText] = useState<string>('');
  const [showBulkModal, setShowBulkModal] = useState<boolean>(false);
  const [showFavoritesModal, setShowFavoritesModal] = useState<boolean>(false);

  const [selectedQuestion, setSelectedQuestion] = useState<QuestionEntry | null>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [needleAngle, setNeedleAngle] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const wheelCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const currentAngleRef = useRef<number>(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const [favorites, setFavorites] = useState<QuestionEntry[]>([]);

  useEffect(() => {
    try {
      const savedPools = localStorage.getItem('question_wheel_category_pools_v2');
      if (savedPools) {
        const parsed = JSON.parse(savedPools);
        if (parsed && typeof parsed === 'object') {
          setCategoryPools((prev) => ({ ...prev, ...parsed }));
        }
      }
      const savedFavs = localStorage.getItem('question_wheel_favorites');
      if (savedFavs) {
        const parsedFavs = JSON.parse(savedFavs);
        if (Array.isArray(parsedFavs)) {
          setFavorites(parsedFavs);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const savedWheels = useSavedWheels();

  const isGameFavorited = savedWheels.some(
    (w) => w.id === 'question-wheel' || w.title.trim().toLowerCase() === 'spin the wheel questions'
  );

  const updateCategoryPools = (newPools: Record<QuestionMode, QuestionEntry[]>) => {
    setCategoryPools(newPools);
    try {
      localStorage.setItem('question_wheel_category_pools_v2', JSON.stringify(newPools));
    } catch {
      // ignore
    }
  };

  const toggleFavorite = (q: QuestionEntry) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === q.id || f.text === q.text);
      const updated = exists
        ? prev.filter((f) => f.id !== q.id && f.text !== q.text)
        : [...prev, q];
      try {
        localStorage.setItem('question_wheel_favorites', JSON.stringify(updated));
      } catch {
        // ignore
      }
      setToastMsg(exists ? 'Removed from Favorites' : '❤️ Saved to Favorites!');
      setTimeout(() => setToastMsg(null), 2200);
      return updated;
    });
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    try {
      localStorage.removeItem('question_wheel_favorites');
    } catch {
      // ignore
    }
    setToastMsg('Favorites Cleared');
    setTimeout(() => setToastMsg(null), 2000);
  };

  // Fullscreen sync
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

  // Sound Synth
  const unlockAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playClickSound = () => {
    if (!soundEnabled || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(500, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // ignore
    }
  };

  const playTickSound = () => {
    if (!soundEnabled || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.03);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch {
      // ignore
    }
  };

  const playWinnerFanfare = () => {
    if (!soundEnabled || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        const startTime = ctx.currentTime + idx * 0.08;
        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.35);
      });
    } catch {
      // ignore
    }
  };

  const currentCategoryList = categoryPools[activeMode] || [];

  const activeEntries = useMemo(() => {
    let pool = categoryPools[activeMode] || [];

    if (selectedDifficulty !== 'all') {
      pool = pool.filter((q) => q.difficulty === selectedDifficulty);
    }

    if (isNoRepeat && eliminatedIds.length > 0) {
      const filtered = pool.filter((q) => !eliminatedIds.includes(q.id));
      if (filtered.length > 0) pool = filtered;
    }

    return pool;
  }, [categoryPools, activeMode, selectedDifficulty, isNoRepeat, eliminatedIds]);

  const handleFavoriteGame = () => {
    const isNowSaved = toggleWheelFavorite({
      id: 'question-wheel',
      title: 'Spin the Wheel Questions',
      category: 'Classroom & Games',
      description: 'Random question picker for trivia, classroom, icebreakers, and party games.',
      items: activeEntries.map((q, idx) => ({ id: q.id || `q-${idx}`, text: q.text, weight: 1 })),
      paletteKey: 'blue'
    });
    setToastMsg(isNowSaved ? '❤️ Saved Game to Profile Favorites!' : 'Removed Game from Profile Favorites');
    setTimeout(() => setToastMsg(null), 2200);
  };

  // Mode change handler
  const handleModeChange = (mode: QuestionMode) => {
    if (isSpinning) return;
    setActiveMode(mode);
    setSelectedQuestion(null);
  };

  // Draw Wheel Canvas
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
      ctx.fillStyle = '#0f172a';
      ctx.fill();
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 15px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('No questions left in pool', center, center - 10);
      ctx.font = '12px sans-serif';
      ctx.fillText(
        isNoRepeat ? 'Click "Reset Deck" to play again' : 'Add custom questions or change filter',
        center,
        center + 15
      );
      ctx.restore();
      return;
    }

    const palette = MODE_PALETTE[activeMode] || MODE_PALETTE.icebreakers;
    const totalWeight = activeEntries.length;
    let startAngle = currentAngleRef.current;

    activeEntries.forEach((entry, idx) => {
      const sliceAngle = (1 / totalWeight) * 2 * Math.PI;
      const endAngle = startAngle + sliceAngle;
      const color = palette[idx % palette.length];

      // Slice background
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      // Border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Label
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = activeEntries.length > 10 ? 'bold 11px sans-serif' : 'bold 13px sans-serif';
      ctx.shadowColor = 'rgba(0,0,0,0.6)';
      ctx.shadowBlur = 3;

      const maxTextWidth = radius - 45;
      let label = entry.text;
      if (ctx.measureText(label).width > maxTextWidth) {
        while (label.length > 3 && ctx.measureText(label + '…').width > maxTextWidth) {
          label = label.slice(0, -1);
        }
        label = label + '…';
      }

      ctx.fillText(label, radius - 20, 5);
      ctx.restore();

      startAngle = endAngle;
    });

    // Outer Rim
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 6;
    ctx.stroke();

    // Center Hub
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
    ctx.fillText('❓', center, center + 1);
  }, [activeEntries, activeMode, isNoRepeat]);

  useEffect(() => {
    drawWheel();
  }, [drawWheel]);

  // Spin Logic
  const handleSpin = (overrideEntries?: QuestionEntry[]) => {
    const entriesToUse = Array.isArray(overrideEntries) && overrideEntries.length > 0 ? overrideEntries : activeEntries;
    if (isSpinning || entriesToUse.length === 0) return;

    unlockAudioContext();
    if (soundEnabled) playClickSound();

    setIsSpinning(true);
    setSelectedQuestion(null);

    const winningIndex = getRandomIndex(entriesToUse.length);
    const selectedItem = entriesToUse[winningIndex];

    const totalWeight = entriesToUse.length;
    const sliceAngle = (1 / totalWeight) * 2 * Math.PI;
    const startSliceAngle = winningIndex * sliceAngle;
    const itemMidAngle = startSliceAngle + sliceAngle / 2;

    const pointerAngle = (3 * Math.PI) / 2; // Top pointer
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
        setSelectedQuestion(selectedItem);
        setNeedleAngle(0);

        if (isNoRepeat) {
          setEliminatedIds((prev) => [...prev, selectedItem.id]);
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

  // Add Question to Active Category
  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    const currentModeObj = QUESTION_MODE_CONFIG.find((m) => m.id === activeMode);
    const newEntry: QuestionEntry = {
      id: `${activeMode}-${Date.now()}`,
      text: newQuestionText.trim(),
      mode: activeMode,
      category: newQuestionCat.trim() || currentModeObj?.label || 'General',
      difficulty: newQuestionDiff,
      hintOrAnswer: newQuestionAnswer.trim() || undefined
    };

    const updated = {
      ...categoryPools,
      [activeMode]: [newEntry, ...(categoryPools[activeMode] || [])]
    };

    updateCategoryPools(updated);
    setNewQuestionText('');
    setNewQuestionCat('');
    setNewQuestionAnswer('');
    if (soundEnabled) playClickSound();

    const activeLabel = currentModeObj?.label || activeMode;
    setToastMsg(`Added question to ${activeLabel}!`);
    setTimeout(() => setToastMsg(null), 2000);
  };

  // Edit Question in Active Category
  const handleStartEdit = (q: QuestionEntry) => {
    setEditingItem(q);
    setEditText(q.text);
    setEditCategory(q.category || '');
    setEditDifficulty(q.difficulty || 'medium');
    setEditAnswer(q.hintOrAnswer || '');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editText.trim()) return;

    const updatedList = (categoryPools[activeMode] || []).map((q) => {
      if (q.id === editingItem.id) {
        return {
          ...q,
          text: editText.trim(),
          category: editCategory.trim() || q.category || 'General',
          difficulty: editDifficulty,
          hintOrAnswer: editAnswer.trim() || undefined
        };
      }
      return q;
    });

    updateCategoryPools({
      ...categoryPools,
      [activeMode]: updatedList
    });

    setEditingItem(null);
    setEditText('');
    setEditCategory('');
    setEditAnswer('');
    if (soundEnabled) playClickSound();

    setToastMsg('Updated question!');
    setTimeout(() => setToastMsg(null), 2000);
  };

  // Remove Question from Active Category
  const handleRemoveQuestion = (id: string) => {
    const updatedList = (categoryPools[activeMode] || []).filter((q) => q.id !== id);
    updateCategoryPools({
      ...categoryPools,
      [activeMode]: updatedList
    });
    if (soundEnabled) playClickSound();
  };

  // Reset Active Category to Defaults
  const handleResetCategory = () => {
    const defaults = getInitialQuestionCategoryPools()[activeMode] || [];
    updateCategoryPools({
      ...categoryPools,
      [activeMode]: defaults
    });
    setEliminatedIds([]);
    const activeLabel = QUESTION_MODE_CONFIG.find((m) => m.id === activeMode)?.label || activeMode;
    setToastMsg(`Reset ${activeLabel} questions to default!`);
    setTimeout(() => setToastMsg(null), 2000);
  };

  // Bulk Paste into Active Category
  const handleBulkAdd = () => {
    if (!bulkText.trim()) return;
    const lines = bulkText.split('\n').filter((l) => l.trim().length > 0);
    const currentModeObj = QUESTION_MODE_CONFIG.find((m) => m.id === activeMode);

    const parsed: QuestionEntry[] = lines.map((line, idx) => {
      const parts = line.split('|');
      return {
        id: `bulk-${activeMode}-${Date.now()}-${idx}`,
        text: parts[0].trim(),
        mode: activeMode,
        category: parts[1] ? parts[1].trim() : (currentModeObj?.label || 'General'),
        difficulty: 'medium',
        hintOrAnswer: parts[2] ? parts[2].trim() : undefined
      };
    });

    updateCategoryPools({
      ...categoryPools,
      [activeMode]: [...parsed, ...(categoryPools[activeMode] || [])]
    });

    setBulkText('');
    setShowBulkModal(false);
    if (soundEnabled) playClickSound();

    const activeLabel = currentModeObj?.label || activeMode;
    setToastMsg(`Imported ${parsed.length} questions to ${activeLabel}!`);
    setTimeout(() => setToastMsg(null), 2200);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isCurrentFavorite = selectedQuestion ? favorites.some((f) => f.id === selectedQuestion.id) : false;
  const currentModeObj = QUESTION_MODE_CONFIG.find((m) => m.id === activeMode) || QUESTION_MODE_CONFIG[0];
  const ModeIconComp = currentModeObj.icon;

  return (
    <div
      ref={containerRef}
      className={`bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors relative ${
        isFullscreen ? 'p-6 sm:p-10 overflow-y-auto min-h-screen' : ''
      }`}
    >
      {toastMsg && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-slate-900/95 text-white text-xs font-bold shadow-2xl backdrop-blur-md flex items-center gap-2 border border-slate-700/50 animate-in fade-in slide-in-from-top-3 duration-200">
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Control Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-sm sm:text-base">Random Question Generator</h2>
              <button
                type="button"
                onClick={handleFavoriteGame}
                aria-label={isGameFavorited ? 'Remove game from profile favorites' : 'Save game to profile favorites'}
                title={isGameFavorited ? 'Saved in Profile Favorites' : 'Save Game to Profile Favorites'}
                className={`p-1 rounded-full transition-all cursor-pointer ${
                  isGameFavorited
                    ? 'bg-rose-500/10 text-rose-500 scale-105'
                    : 'bg-slate-200/80 dark:bg-slate-800 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30'
                }`}
              >
                <Heart className={`w-4 h-4 ${isGameFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {activeEntries.length} questions available in active {currentModeObj.label} pool
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Difficulty Filter */}
          <div className="flex items-center gap-1 bg-slate-200 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
            <Sliders className="w-3.5 h-3.5 ml-1 text-slate-500" />
            <button
              onClick={() => setSelectedDifficulty('all')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                selectedDifficulty === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedDifficulty('easy')}
              className={`px-2 py-1 rounded-lg transition-colors ${
                selectedDifficulty === 'easy'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-emerald-500'
              }`}
            >
              Easy
            </button>
            <button
              onClick={() => setSelectedDifficulty('medium')}
              className={`px-2 py-1 rounded-lg transition-colors ${
                selectedDifficulty === 'medium'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-amber-500'
              }`}
            >
              Med
            </button>
            <button
              onClick={() => setSelectedDifficulty('hard')}
              className={`px-2 py-1 rounded-lg transition-colors ${
                selectedDifficulty === 'hard'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-rose-500'
              }`}
            >
              Hard
            </button>
          </div>

          {/* No-Repeat Toggle */}
          <button
            onClick={() => setIsNoRepeat(!isNoRepeat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              isNoRepeat
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
            }`}
            title="When active, eliminates picked questions so no duplicates appear"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>No Repeat</span>
          </button>

          {isNoRepeat && eliminatedIds.length > 0 && (
            <button
              onClick={() => setEliminatedIds([])}
              className="px-2.5 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Deck ({eliminatedIds.length})</span>
            </button>
          )}

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-500" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Favorites Modal Button */}
          <button
            onClick={() => setShowFavoritesModal(true)}
            className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>Favorites ({favorites.length})</span>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mode Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 my-4">
        {QUESTION_MODE_CONFIG.map((modeConfig) => {
          const IconComponent = modeConfig.icon;
          const isSelected = activeMode === modeConfig.id;
          const count = (categoryPools[modeConfig.id] || []).length;

          return (
            <button
              key={modeConfig.id}
              onClick={() => handleModeChange(modeConfig.id)}
              className={`px-3 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-[1.02]'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <IconComponent className="w-4 h-4 shrink-0" />
              <span className="truncate">{modeConfig.label} ({count})</span>
            </button>
          );
        })}
      </div>

      {/* Main Wheel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-6">
        {/* Left Wheel Section */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
          {/* Wheel Pointer */}
          <div
            className="absolute -top-3 z-20 transition-transform duration-75 origin-top"
            style={{ transform: `rotate(${needleAngle}deg)` }}
          >
            <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[32px] border-t-blue-600 filter drop-shadow-md" />
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
                : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5'
            }`}
          >
            <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>{isSpinning ? 'SPINNING...' : 'SPIN THE QUESTION WHEEL'}</span>
          </button>
        </div>

        {/* Right Section: Drawn Question & Category List Manager */}
        <div className="lg:col-span-6 space-y-6">
          {/* Drawn Question Card */}
          <div className="bg-slate-50 dark:bg-slate-900/60 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 min-h-[180px] flex flex-col justify-center">
            {selectedQuestion ? (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm relative pr-12">
                  <button
                    onClick={() => toggleFavorite(selectedQuestion)}
                    title={isCurrentFavorite ? 'Remove from favorites' : 'Save to favorites'}
                    className="absolute top-3 right-3 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-all group"
                  >
                    <Heart
                      className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                        isCurrentFavorite
                          ? 'fill-rose-500 text-rose-500'
                          : 'text-slate-400 dark:text-slate-500 hover:text-rose-500'
                      }`}
                    />
                  </button>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 uppercase tracking-wider">
                      {selectedQuestion.difficulty}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      {selectedQuestion.category}
                    </span>
                  </div>

                  <p className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100 leading-snug">
                    &ldquo;{selectedQuestion.text}&rdquo;
                  </p>

                  {selectedQuestion.hintOrAnswer && (
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Answer/Hint: {selectedQuestion.hintOrAnswer}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(selectedQuestion.text)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied!' : 'Copy Question'}</span>
                  </button>
                  <button
                    onClick={() => toggleFavorite(selectedQuestion)}
                    title={isCurrentFavorite ? 'Remove from profile favorites' : 'Save to profile favorites'}
                    aria-label={isCurrentFavorite ? 'Remove from profile favorites' : 'Save to profile favorites'}
                    className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                      isCurrentFavorite
                        ? 'bg-rose-500/10 text-rose-500 hover:bg-rose-500/20'
                        : 'bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-400 hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isCurrentFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 px-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center mb-2">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-slate-800 dark:text-slate-200">Ready to Spin?</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto mt-1">
                  Select a category or filter above, then click the wheel to draw a random prompt!
                </p>
              </div>
            )}
          </div>

          {/* Category List & Custom Editor Manager */}
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <ModeIconComp className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    Edit & Custom List: {currentModeObj.label}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Add, edit, or remove questions for the {currentModeObj.label} wheel
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowBulkModal(true)}
                  className="px-2.5 py-1.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <ListPlus className="w-3.5 h-3.5" />
                  <span>Bulk Import</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetCategory}
                  title={`Reset ${currentModeObj.label} questions to defaults`}
                  className="p-1.5 rounded-xl bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Add Form */}
            <form onSubmit={handleAddQuestion} className="space-y-2.5 pt-2 border-t border-slate-200 dark:border-slate-800">
              <input
                type="text"
                placeholder={`New ${currentModeObj.label} question...`}
                value={newQuestionText}
                onChange={(e) => setNewQuestionText(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Topic tag (e.g. Science)..."
                  value={newQuestionCat}
                  onChange={(e) => setNewQuestionCat(e.target.value)}
                  className="w-full px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select
                  value={newQuestionDiff}
                  onChange={(e) => setNewQuestionDiff(e.target.value as QuestionDifficulty)}
                  className="w-full px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="easy">Easy Difficulty</option>
                  <option value="medium">Medium Difficulty</option>
                  <option value="hard">Hard Difficulty</option>
                </select>

                <input
                  type="text"
                  placeholder="Optional Answer / Hint..."
                  value={newQuestionAnswer}
                  onChange={(e) => setNewQuestionAnswer(e.target.value)}
                  className="w-full px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={!newQuestionText.trim()}
                className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Question to {currentModeObj.label}</span>
              </button>
            </form>

            {/* Category Questions List */}
            <div className="max-h-56 overflow-y-auto space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800 pr-1">
              {currentCategoryList.length > 0 ? (
                currentCategoryList.map((q) => (
                  <div
                    key={q.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs group hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                  >
                    <div className="truncate pr-2 space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900 dark:text-slate-100 truncate">{q.text}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 capitalize shrink-0">
                          {q.difficulty}
                        </span>
                      </div>
                      {q.hintOrAnswer && (
                        <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium truncate">
                          Answer: {q.hintOrAnswer}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-1 opacity-90 sm:opacity-70 group-hover:opacity-100 transition-opacity shrink-0">
                      <button
                        type="button"
                        onClick={() => handleStartEdit(q)}
                        title="Edit question"
                        className="p-1 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveQuestion(q.id)}
                        title="Delete question"
                        className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-slate-400 text-xs italic">
                  No questions in this category. Click &ldquo;Reset to Defaults&rdquo; or add questions above.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Inline Edit Question Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Pencil className="w-4 h-4 text-blue-500" />
                Edit Question ({currentModeObj.label})
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">
                  Question Text
                </label>
                <textarea
                  rows={2}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">
                    Difficulty
                  </label>
                  <select
                    value={editDifficulty}
                    onChange={(e) => setEditDifficulty(e.target.value as QuestionDifficulty)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">
                  Optional Answer / Hint
                </label>
                <input
                  type="text"
                  value={editAnswer}
                  onChange={(e) => setEditAnswer(e.target.value)}
                  placeholder="Optional trivia answer or clue..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!editText.trim()}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors disabled:opacity-50"
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
                <Bookmark className="w-5 h-5 text-blue-500" />
                Bulk Import to {currentModeObj.label}
              </h3>
              <button
                onClick={() => setShowBulkModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Paste a list of questions (one per line). Format optional: <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">Question | Tag | Answer</code>
            </p>
            <textarea
              rows={8}
              placeholder="What is your favorite book? | Reading | Harry Potter&#10;Where do you see yourself in 5 years? | Life Goals&#10;What is your go-to weekend activity?"
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono mb-4"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setShowBulkModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkAdd}
                disabled={!bulkText.trim()}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md disabled:opacity-50"
              >
                Import to {currentModeObj.label}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Favorites Modal */}
      {showFavoritesModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-4">
              <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                Saved Favorite Questions
              </h3>
              <button
                onClick={() => setShowFavoritesModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1 mb-4">
              {favorites.length > 0 ? (
                favorites.map((fav) => (
                  <div
                    key={fav.id}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3 text-xs font-semibold"
                  >
                    <span className="text-slate-800 dark:text-slate-200 leading-snug">{fav.text}</span>
                    <button
                      onClick={() => toggleFavorite(fav)}
                      className="text-rose-500 hover:text-rose-700 shrink-0 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic text-center py-8">No saved questions yet. Click the heart icon on any drawn question!</p>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
              {favorites.length > 0 && (
                <button
                  onClick={clearAllFavorites}
                  className="text-xs font-bold text-rose-500 hover:text-rose-700 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear All
                </button>
              )}
              <button
                onClick={() => setShowFavoritesModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 ml-auto"
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
