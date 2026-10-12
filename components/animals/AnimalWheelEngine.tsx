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
  HelpCircle,
  Award,
  Zap,
  Layers,
  Filter,
  Eye,
  RefreshCw,
  Copy,
  Check,
  Gamepad2,
  BookOpen,
  Dices,
  Compass,
  X,
  List,
  History,
  Trophy,
  Search,
  CheckCircle2,
  Lightbulb,
  ExternalLink,
  Trash2,
  Heart
} from 'lucide-react';
import { ANIMAL_DATABASE, ANIMAL_CATEGORIES, AnimalItem } from './animalData';
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

function getCryptoRandomItem<T>(items: T[]): T | null {
  if (!items || items.length === 0) return null;
  const index = Math.floor(getCryptoRandomFloat() * items.length);
  return items[index];
}

interface SpinAuditRecord {
  id: string;
  time: string;
  name: string;
  emoji: string;
  category: string;
  seed: string;
}

export default function AnimalWheelEngine() {
  // Profile Favorites Hook
  const savedWheels = useSavedWheels();
  const isGameFavorited = savedWheels.some(
    (w) => w.id === 'animal-wheel' || w.title.trim().toLowerCase() === 'animal spin the wheel'
  );
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleFavoriteGame = () => {
    const isNowSaved = toggleWheelFavorite({
      id: 'animal-wheel',
      title: 'Animal Spin the Wheel',
      category: 'Animals & Nature',
      description: 'Random animal generator with facts, sounds, and guessing games.',
      items: ANIMAL_DATABASE.slice(0, 12).map((a, idx) => ({ id: a.id || `a-${idx}`, text: `${a.emoji} ${a.name}`, weight: 1 })),
      paletteKey: 'emerald'
    });
    setToastMsg(isNowSaved ? '❤️ Saved Animal Wheel to Profile Favorites!' : 'Removed Animal Wheel from Profile Favorites');
    setTimeout(() => setToastMsg(null), 2200);
  };

  // Mode & Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [isNoRepeat, setIsNoRepeat] = useState<boolean>(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'wheel' | 'instant' | 'guess' | 'challenge'>('wheel');
  const [activeSidebarTab, setActiveSidebarTab] = useState<'species' | 'spotlight' | 'challenge' | 'audit'>('species');

  // Elimination history & search
  const [eliminatedIds, setEliminatedIds] = useState<Set<string>>(new Set());
  const [speciesSearch, setSpeciesSearch] = useState<string>('');

  // Wheel Animation State
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [currentRotation, setCurrentRotation] = useState<number>(0);
  const [winnerAnimal, setWinnerAnimal] = useState<AnimalItem | null>(null);
  const [showWinnerModal, setShowWinnerModal] = useState<boolean>(false);
  const [spinHistory, setSpinHistory] = useState<SpinAuditRecord[]>([]);

  // Instant Picker State
  const [instantCount, setInstantCount] = useState<number>(1);
  const [instantResults, setInstantResults] = useState<AnimalItem[]>([]);

  // Guess The Animal Game State
  const [guessAnimal, setGuessAnimal] = useState<AnimalItem | null>(null);
  const [cluesRevealed, setCluesRevealed] = useState<number>(1);
  const [isAnimalRevealed, setIsAnimalRevealed] = useState<boolean>(false);

  // Animal Challenge State
  const [challengeAnimal, setChallengeAnimal] = useState<AnimalItem | null>(null);
  const [isChallengeActive, setIsChallengeActive] = useState<boolean>(false);

  // Facts Card Modal State
  const [inspectedAnimal, setInspectedAnimal] = useState<AnimalItem | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Canvas Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [fullscreenTheater, setFullscreenTheater] = useState<boolean>(false);

  // Filtered active animals
  const activeAnimals = useMemo(() => {
    return ANIMAL_DATABASE.filter((animal) => {
      if (selectedCategory !== 'all' && animal.category !== selectedCategory) {
        return false;
      }
      if (selectedDifficulty !== 'all' && animal.difficulty !== selectedDifficulty) {
        return false;
      }
      if (isNoRepeat && eliminatedIds.has(animal.id)) {
        return false;
      }
      return true;
    });
  }, [selectedCategory, selectedDifficulty, isNoRepeat, eliminatedIds]);

  // Animals filtered for sidebar search
  const searchedAnimals = useMemo(() => {
    if (!speciesSearch.trim()) return activeAnimals;
    const q = speciesSearch.toLowerCase().trim();
    return activeAnimals.filter((a) => a.name.toLowerCase().includes(q) || a.category.toLowerCase().includes(q));
  }, [activeAnimals, speciesSearch]);

  // Handle Fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Draw the Wheel Canvas
  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 24;

    ctx.clearRect(0, 0, width, height);

    if (activeAnimals.length === 0) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#f4f2fd';
      ctx.fill();
      ctx.strokeStyle = '#d4d2e6';
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.fillStyle = '#767586';
      ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('All Animals Eliminated!', centerX, centerY - 15);
      ctx.font = '16px system-ui, -apple-system, sans-serif';
      ctx.fillText('Reset No-Repeat to Spin Again', centerX, centerY + 20);
      ctx.restore();
      return;
    }

    const numSlices = activeAnimals.length;
    const sliceAngle = (2 * Math.PI) / numSlices;

    // Outer Drop Shadow Ring
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 8, 0, 2 * Math.PI);
    ctx.fillStyle = '#1e1b4b';
    ctx.shadowColor = 'rgba(0,0,0,0.15)';
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 6;
    ctx.fill();
    ctx.restore();

    // Gold/Purple outer border
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 4, 0, 2 * Math.PI);
    ctx.fillStyle = '#4648d4';
    ctx.fill();
    ctx.restore();

    // Draw Slices
    activeAnimals.forEach((animal, i) => {
      const startAngle = currentRotation + i * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      ctx.fillStyle = animal.color;
      ctx.fill();

      // Border between slices
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.restore();

      // Draw Labels
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + sliceAngle / 2);

      const isDense = numSlices > 18;
      const textRadius = radius * 0.68;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';

      // Text Shadow for contrast
      ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
      ctx.shadowBlur = 4;
      ctx.fillStyle = '#ffffff';

      if (isDense) {
        ctx.font = 'bold 15px system-ui, -apple-system, sans-serif';
        ctx.fillText(`${animal.emoji}`, textRadius + 15, 0);
      } else if (numSlices > 10) {
        ctx.font = 'bold 15px system-ui, -apple-system, sans-serif';
        const label = animal.name.length > 12 ? animal.name.slice(0, 11) + '…' : animal.name;
        ctx.fillText(`${animal.emoji} ${label}`, textRadius + 20, 0);
      } else {
        ctx.font = 'bold 18px system-ui, -apple-system, sans-serif';
        const label = animal.name.length > 15 ? animal.name.slice(0, 14) + '…' : animal.name;
        ctx.fillText(`${animal.emoji} ${label}`, textRadius + 25, 0);
      }

      ctx.restore();
    });

    // Center Hub Rim
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, 46, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
    ctx.shadowBlur = 12;
    ctx.fill();

    // Center Hub Core
    ctx.beginPath();
    ctx.arc(centerX, centerY, 34, 0, 2 * Math.PI);
    ctx.fillStyle = '#4648d4';
    ctx.fill();

    // Center Icon / Text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🐾', centerX, centerY);
    ctx.restore();
  }, [activeAnimals, currentRotation]);

  useEffect(() => {
    drawWheel();
  }, [drawWheel]);

  // Handle Wheel Spin Animation
  const handleSpin = useCallback(() => {
    if (isSpinning || activeAnimals.length === 0) return;

    unlockAudioContext();
    setIsSpinning(true);
    setShowWinnerModal(false);

    const winningIndex = Math.floor(getCryptoRandomFloat() * activeAnimals.length);
    const winningAnimal = activeAnimals[winningIndex];

    const numSlices = activeAnimals.length;
    const sliceAngle = (2 * Math.PI) / numSlices;

    const fullSpins = 5 + Math.floor(getCryptoRandomFloat() * 4);
    const topPointerAngle = 1.5 * Math.PI;

    const targetRotation =
      topPointerAngle - (winningIndex * sliceAngle + sliceAngle / 2) + fullSpins * 2 * Math.PI;

    const startRotation = currentRotation % (2 * Math.PI);
    const totalRotationDelta = targetRotation - startRotation;

    const spinDuration = 4500;
    const startTime = performance.now();
    let prevSlice = -1;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);

      // Quartic ease out
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const current = startRotation + totalRotationDelta * easeOut;

      setCurrentRotation(current);

      // Play tick sound when slice crosses pointer
      const normalizedCurrent = (topPointerAngle - (current % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
      const currentSliceIdx = Math.floor(normalizedCurrent / sliceAngle) % numSlices;

      if (currentSliceIdx !== prevSlice) {
        prevSlice = currentSliceIdx;
        if (isSoundEnabled) {
          playTickSound();
        }
      }

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        setWinnerAnimal(winningAnimal);
        setShowWinnerModal(true);
        setActiveSidebarTab('spotlight');

        // Record Spin Audit Log
        const nowTime = new Date().toTimeString().split(' ')[0];
        const record: SpinAuditRecord = {
          id: `spin-${Date.now()}`,
          time: nowTime,
          name: winningAnimal.name,
          emoji: winningAnimal.emoji,
          category: winningAnimal.category,
          seed: `0x${Math.floor(getCryptoRandomFloat() * 0xffffffff).toString(16).toUpperCase()}`
        };
        setSpinHistory((prev) => [record, ...prev.slice(0, 19)]);

        if (isSoundEnabled) {
          playWinnerFanfare();
          announceWinnerTTS(winningAnimal.name, { enabled: true, prefix: 'The chosen animal is the' });
        }

        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 }
        });

        if (isNoRepeat) {
          setEliminatedIds((prev) => new Set([...prev, winningAnimal.id]));
        }
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [isSpinning, activeAnimals, currentRotation, isSoundEnabled, isNoRepeat]);

  // Instant Picker Mode
  const handleInstantPick = useCallback(() => {
    if (activeAnimals.length === 0) return;
    unlockAudioContext();
    if (isSoundEnabled) playWinnerFanfare();

    const shuffled = [...activeAnimals].sort(() => getCryptoRandomFloat() - 0.5);
    const picks = shuffled.slice(0, Math.min(instantCount, activeAnimals.length));
    setInstantResults(picks);

    if (isNoRepeat) {
      const newEliminated = new Set(eliminatedIds);
      picks.forEach((p) => newEliminated.add(p.id));
      setEliminatedIds(newEliminated);
    }

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  }, [activeAnimals, isSoundEnabled, instantCount, isNoRepeat, eliminatedIds]);

  // Keyboard shortcuts (Space to spin / pick, F for fullscreen)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        if (activeTab === 'wheel' && !isSpinning && activeAnimals.length > 0) {
          handleSpin();
        } else if (activeTab === 'instant') {
          handleInstantPick();
        }
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, isSpinning, activeAnimals, toggleFullscreen, handleSpin, handleInstantPick]);

  // Guess The Animal Game
  const handleStartGuessGame = () => {
    if (activeAnimals.length === 0) return;
    const animal = getCryptoRandomItem(activeAnimals);
    if (animal) {
      setGuessAnimal(animal);
      setCluesRevealed(1);
      setIsAnimalRevealed(false);
    }
  };

  const handleRevealClue = () => {
    if (cluesRevealed < 3) {
      setCluesRevealed((prev) => prev + 1);
      if (isSoundEnabled) playClickSound();
    }
  };

  const handleRevealAnimal = () => {
    setIsAnimalRevealed(true);
    if (isSoundEnabled) playWinnerFanfare();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Animal Challenge Mode
  const handleGenerateChallenge = () => {
    if (activeAnimals.length === 0) return;
    const animal = getCryptoRandomItem(activeAnimals);
    if (animal) {
      setChallengeAnimal(animal);
      setIsChallengeActive(true);
      if (isSoundEnabled) playClickSound();
    }
  };

  // Reset Elimination
  const handleResetElimination = () => {
    setEliminatedIds(new Set());
    if (isSoundEnabled) playClickSound();
  };

  // Copy helper
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div
      ref={containerRef}
      className={`w-full rounded-3xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] shadow-sm overflow-hidden transition-all ${
        isFullscreen ? 'p-6 sm:p-10 fixed inset-0 z-50 overflow-y-auto bg-[#0d0e15]' : 'p-4 sm:p-8 my-6'
      }`}
    >
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#eeedf7] dark:border-[#242533]">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#4648d4]/10 text-[#4648d4] dark:bg-[#4648d4]/20 dark:text-[#8587ff]">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-headline text-[#1a1b22] dark:text-white flex items-center gap-2">
              Animal Spin Wheel
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
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                CSPRNG Fair
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[#767586] dark:text-[#908fa1]">
              Pick random creatures, generate creative challenges, play guess-the-animal &amp; discover fun facts.
            </p>
          </div>
        </div>

        {/* Global Toolbar */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={() => setIsSoundEnabled(!isSoundEnabled)}
            className="p-2.5 rounded-xl border border-[#eeedf7] dark:border-[#292a39] bg-[#fbf8ff] dark:bg-[#1a1b26] text-[#464554] dark:text-[#c7c4d7] hover:text-[#4648d4] dark:hover:text-white transition-colors cursor-pointer"
            title={isSoundEnabled ? 'Mute Sound' : 'Enable Sound'}
          >
            {isSoundEnabled ? <Volume2 className="w-4 h-4 text-[#4648d4] dark:text-[#8587ff]" /> : <VolumeX className="w-4 h-4 text-[#767586]" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2.5 rounded-xl border border-[#eeedf7] dark:border-[#292a39] bg-[#fbf8ff] dark:bg-[#1a1b26] text-[#464554] dark:text-[#c7c4d7] hover:text-[#4648d4] dark:hover:text-white transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Presentation (F)'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 pt-6 pb-4">
        {[
          { id: 'wheel', label: 'Spin Wheel', icon: <RotateCw className="w-4 h-4" /> },
          { id: 'instant', label: 'Instant Generator', icon: <Zap className="w-4 h-4" /> },
          { id: 'guess', label: 'Guess The Animal', icon: <HelpCircle className="w-4 h-4" /> },
          { id: 'challenge', label: 'Animal Challenge', icon: <Gamepad2 className="w-4 h-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setActiveTab(tab.id as any);
              if (tab.id === 'guess' && !guessAnimal) {
                handleStartGuessGame();
              } else if (tab.id === 'challenge' && !challengeAnimal) {
                handleGenerateChallenge();
              }
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#4648d4] text-white shadow-md shadow-[#4648d4]/20'
                : 'bg-[#f4f2fd] dark:bg-[#1a1b26] text-[#464554] dark:text-[#c7c4d7] hover:bg-[#eae7fa] dark:hover:bg-[#222433]'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Category Pills & Filters Bar */}
      <div className="space-y-3 pb-6 border-b border-[#eeedf7] dark:border-[#242533]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#767586] dark:text-[#908fa1] flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
            Animal Categories
          </label>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-[#767586] dark:text-[#908fa1] mr-1 hidden sm:inline">Difficulty:</span>
            {(['all', 'easy', 'medium', 'hard'] as const).map((diff) => (
              <button
                key={diff}
                type="button"
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-2.5 py-1 rounded-lg font-semibold uppercase tracking-wider text-[10px] transition-colors cursor-pointer ${
                  selectedDifficulty === diff
                    ? 'bg-[#4648d4] text-white'
                    : 'bg-[#f4f2fd] dark:bg-[#1a1b26] text-[#767586] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-2">
          {ANIMAL_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#4648d4] to-[#5b5ef0] text-white shadow-sm'
                    : 'bg-[#fbf8ff] dark:bg-[#181924] border border-[#eeedf7] dark:border-[#292a39] text-[#464554] dark:text-[#c7c4d7] hover:border-[#4648d4]/40'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Elimination & Active Count Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-[#767586] dark:text-[#908fa1]">
          <div className="flex items-center gap-3">
            <span>
              Active on Wheel:{' '}
              <strong className="text-[#1a1b22] dark:text-white font-bold">{activeAnimals.length} Animals</strong>
            </span>
            {eliminatedIds.size > 0 && (
              <span className="text-amber-600 dark:text-amber-400 font-semibold">
                ({eliminatedIds.size} eliminated)
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* No Repeat Toggle */}
            <label className="flex items-center gap-1.5 cursor-pointer font-medium text-[#464554] dark:text-[#c7c4d7]">
              <input
                type="checkbox"
                checked={isNoRepeat}
                onChange={(e) => setIsNoRepeat(e.target.checked)}
                className="w-3.5 h-3.5 accent-[#4648d4] rounded"
              />
              <span>No-Repeat (Elimination Mode)</span>
            </label>

            {eliminatedIds.size > 0 && (
              <button
                type="button"
                onClick={handleResetElimination}
                className="text-[#4648d4] dark:text-[#8587ff] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" /> Reset Eliminated
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Interactive Content Area */}
      <div className="pt-6">
        {/* TAB 1: WHEEL MODE (Matches Home Page 12-column Grid & Full Height) */}
        {activeTab === 'wheel' && (
          <div
            className={`grid grid-cols-1 ${
              isFullscreen && fullscreenTheater
                ? 'max-w-4xl mx-auto w-full'
                : isFullscreen
                ? 'xl:grid-cols-12 gap-6 xl:gap-8 items-start w-full max-w-7xl mx-auto'
                : 'lg:grid-cols-12 gap-6 lg:gap-8 items-start'
            }`}
          >
            {/* Left Column: Interactive Wheel Canvas Stage */}
            <div
              className={`${
                isFullscreen && fullscreenTheater
                  ? 'col-span-1 p-6 sm:p-10'
                  : isFullscreen
                  ? 'xl:col-span-8 lg:col-span-7 p-6 sm:p-10'
                  : 'lg:col-span-7 p-6 sm:p-8'
              } flex flex-col items-center justify-between gap-6 bg-[#fbf8ff] dark:bg-[#12131a] rounded-3xl border border-[#eeedf7] dark:border-[#292a39] shadow-sm min-h-[580px] transition-all`}
            >
              {/* Wheel Header Title */}
              <div className="w-full flex items-center justify-between border-b border-[#eeedf7] dark:border-[#292a39] pb-3">
                <div>
                  <h3 className="font-headline font-extrabold text-[18px] sm:text-[22px] text-[#1a1b22] dark:text-[#f1effa]">
                    {selectedCategory === 'all'
                      ? 'All Creatures Wheel'
                      : `${selectedCategory.toUpperCase()} Wheel`}
                  </h3>
                  <span className="text-[12px] text-[#767586] dark:text-[#908fa1]">
                    {activeAnimals.length} species on canvas • Hardware CSPRNG Verified
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {isFullscreen && (
                    <button
                      type="button"
                      onClick={() => setFullscreenTheater(!fullscreenTheater)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        fullscreenTheater
                          ? 'bg-[#4648d4] text-white border-[#4648d4]'
                          : 'bg-[#f4f2fd] dark:bg-[#1d1e28] text-[#464554] dark:text-[#c7c4d7] border-[#eeedf7] dark:border-[#292a39] hover:text-[#4648d4]'
                      }`}
                      title={fullscreenTheater ? 'Show species sidebar' : 'Hide sidebar for giant theater wheel'}
                    >
                      {fullscreenTheater ? 'Show Species Sidebar' : 'Giant Theater View'}
                    </button>
                  )}

                  {isNoRepeat && (
                    <span className="px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-300 text-[11px] font-bold">
                      Elimination On
                    </span>
                  )}
                </div>
              </div>

              {/* Center Canvas Stage */}
              <div
                className={`relative w-full aspect-square flex items-center justify-center py-2 transition-all duration-300 touch-manipulation ${
                  isFullscreen ? 'max-w-[min(92vw,76vh,740px)]' : 'max-w-[min(92vw,380px)] sm:max-w-[440px] lg:max-w-[500px]'
                }`}
              >
                {/* Top Pointer Needle */}
                <div className="absolute top-0 z-20 flex flex-col items-center pointer-events-none drop-shadow-md">
                  <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[26px] border-t-[#dc2626] dark:border-t-[#ef4444]" />
                </div>

                <canvas
                  ref={canvasRef}
                  width={1200}
                  height={1200}
                  className="w-full h-full object-contain filter drop-shadow-xl touch-manipulation"
                />
              </div>

              {/* Big Tactile Spin Button (Matching Home Page SpinButton) */}
              <div className="w-full flex flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={handleSpin}
                  disabled={isSpinning || activeAnimals.length === 0}
                  className={`w-full max-w-[340px] py-4 rounded-2xl font-headline text-lg sm:text-xl font-extrabold flex items-center justify-center gap-3 transition-all shadow-lg cursor-pointer ${
                    isSpinning || activeAnimals.length === 0
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed opacity-60'
                      : 'bg-gradient-to-r from-[#4648d4] to-[#5b5ef0] hover:from-[#3b3dbb] hover:to-[#4e51e0] text-white shadow-[#4648d4]/35 hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                >
                  <RotateCw className={`w-6 h-6 ${isSpinning ? 'animate-spin' : ''}`} />
                  {isSpinning ? 'SPINNING CREATURE...' : 'SPIN ANIMAL WHEEL'}
                </button>
                <p className="text-[11px] text-[#767586] dark:text-[#908fa1]">
                  Press <kbd className="px-1.5 py-0.5 rounded bg-[#eeedf7] dark:bg-[#252636] font-mono text-[10px]">Spacebar</kbd> to spin instantly
                </p>
              </div>
            </div>

            {/* Right Column: Tabbed Configuration & Facts Sidebar (Hidden in Theater Mode) */}
            {(!isFullscreen || !fullscreenTheater) && (
              <div className={`${isFullscreen ? 'xl:col-span-4 lg:col-span-5' : 'lg:col-span-5'} flex flex-col gap-4 min-h-[580px]`}>
                {/* Sidebar Tabs */}
                <div className="flex bg-[#f4f2fd] dark:bg-[#1d1e28] p-1 rounded-2xl border border-[#eeedf7] dark:border-[#292a39]">
                  <button
                    type="button"
                    onClick={() => setActiveSidebarTab('species')}
                    className={`flex-1 py-2 px-2 rounded-xl text-[12px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      activeSidebarTab === 'species'
                        ? 'bg-white dark:bg-[#12131a] text-[#4648d4] dark:text-[#8587ff] shadow-xs'
                        : 'text-[#464554] dark:text-[#c7c4d7]'
                    }`}
                  >
                    <List className="w-3.5 h-3.5" />
                    <span>Species ({activeAnimals.length})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveSidebarTab('spotlight')}
                    className={`flex-1 py-2 px-2 rounded-xl text-[12px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      activeSidebarTab === 'spotlight'
                        ? 'bg-white dark:bg-[#12131a] text-[#4648d4] dark:text-[#8587ff] shadow-xs'
                        : 'text-[#464554] dark:text-[#c7c4d7]'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Spotlight</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveSidebarTab('challenge')}
                  className={`flex-1 py-2 px-2 rounded-xl text-[12px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeSidebarTab === 'challenge'
                      ? 'bg-white dark:bg-[#12131a] text-[#4648d4] dark:text-[#8587ff] shadow-xs'
                      : 'text-[#464554] dark:text-[#c7c4d7]'
                  }`}
                >
                  <Gamepad2 className="w-3.5 h-3.5" />
                  <span>Prompts</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSidebarTab('audit')}
                  className={`flex-1 py-2 px-2 rounded-xl text-[12px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    activeSidebarTab === 'audit'
                      ? 'bg-white dark:bg-[#12131a] text-[#4648d4] dark:text-[#8587ff] shadow-xs'
                      : 'text-[#464554] dark:text-[#c7c4d7]'
                  }`}
                >
                  <History className="w-3.5 h-3.5" />
                  <span>Audit ({spinHistory.length})</span>
                </button>
              </div>

              {/* TAB CONTENT: Species List */}
              {activeSidebarTab === 'species' && (
                <div className="flex-1 bg-white dark:bg-[#181922] rounded-3xl p-5 border border-[#eeedf7] dark:border-[#292a39] flex flex-col gap-3 shadow-xs">
                  {/* Search input */}
                  <div className="flex items-center px-3 py-2 rounded-xl bg-[#f4f2fd] dark:bg-[#12131b] border border-[#eeedf7] dark:border-[#292a39]">
                    <Search className="w-4 h-4 text-[#767586] mr-2" />
                    <input
                      type="text"
                      value={speciesSearch}
                      onChange={(e) => setSpeciesSearch(e.target.value)}
                      placeholder="Search animals on wheel..."
                      className="w-full bg-transparent text-xs text-[#1a1b22] dark:text-white focus:outline-none"
                    />
                  </div>

                  {/* Species Scrollable List */}
                  <div className="flex-1 max-h-[420px] overflow-y-auto space-y-1.5 pr-1">
                    {searchedAnimals.map((animal) => (
                      <div
                        key={animal.id}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-[#fbf8ff] dark:bg-[#1d1e2a] hover:bg-[#f4f2fd] dark:hover:bg-[#232535] border border-[#eeedf7] dark:border-[#2a2b3c] transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-xl shrink-0">{animal.emoji}</span>
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-[#1a1b22] dark:text-white truncate">
                              {animal.name}
                            </h4>
                            <span className="text-[10px] text-[#767586] dark:text-[#908fa1] uppercase">
                              {animal.category} • {animal.diet}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setInspectedAnimal(animal)}
                          className="px-2.5 py-1 rounded-lg bg-[#4648d4]/10 text-[#4648d4] dark:bg-[#4648d4]/20 dark:text-[#8587ff] text-[11px] font-semibold hover:bg-[#4648d4] hover:text-white transition-colors cursor-pointer shrink-0"
                        >
                          Facts
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-[#eeedf7] dark:border-[#292a39] flex items-center justify-between text-xs text-[#767586] dark:text-[#908fa1]">
                    <span>Showing {searchedAnimals.length} of {activeAnimals.length}</span>
                    <button
                      type="button"
                      onClick={() => setInspectedAnimal(getCryptoRandomItem(activeAnimals))}
                      className="text-[#4648d4] dark:text-[#8587ff] font-semibold hover:underline cursor-pointer"
                    >
                      Random Fact
                    </button>
                  </div>
                </div>
              )}

              {/* TAB CONTENT: Winner Spotlight */}
              {activeSidebarTab === 'spotlight' && (
                <div className="flex-1 bg-white dark:bg-[#181922] rounded-3xl p-5 border border-[#eeedf7] dark:border-[#292a39] flex flex-col justify-between shadow-xs">
                  {winnerAnimal ? (
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-5xl">{winnerAnimal.emoji}</span>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#4648d4]/10 text-[#4648d4] dark:text-[#8587ff]">
                              {winnerAnimal.category}
                            </span>
                            <h3 className="text-2xl font-bold font-headline text-[#1a1b22] dark:text-white mt-1">
                              {winnerAnimal.name}
                            </h3>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs sm:text-sm text-[#464554] dark:text-[#c7c4d7]">
                        <p><strong>Habitat:</strong> {winnerAnimal.habitat}</p>
                        <p><strong>Diet:</strong> {winnerAnimal.diet}</p>
                        <p><strong>Sound:</strong> <em>{winnerAnimal.sound}</em></p>
                        <div className="p-3.5 rounded-2xl bg-[#f4f2fd] dark:bg-[#12131b] border border-[#eeedf7] dark:border-[#2b2c3c] mt-2">
                          <p className="font-semibold text-[#1a1b22] dark:text-white flex items-center gap-1.5">
                            <BookOpen className="w-4 h-4 text-[#4648d4]" />
                            Biological Superpower / Fact:
                          </p>
                          <p className="text-xs text-[#464554] dark:text-[#c7c4d7] mt-1.5 leading-relaxed">
                            {winnerAnimal.funFact}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setInspectedAnimal(winnerAnimal)}
                          className="px-3.5 py-2 rounded-xl bg-[#4648d4] text-white text-xs font-bold hover:bg-[#3b3dbb] transition-colors cursor-pointer"
                        >
                          Full Bio Card
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setChallengeAnimal(winnerAnimal);
                            setActiveSidebarTab('challenge');
                          }}
                          className="px-3.5 py-2 rounded-xl border border-[#4648d4] text-[#4648d4] dark:text-[#8587ff] text-xs font-bold hover:bg-[#4648d4]/10 transition-colors cursor-pointer"
                        >
                          Create Challenge
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-3">
                      <span className="text-5xl">🎯</span>
                      <h3 className="text-base font-bold text-[#1a1b22] dark:text-white">
                        No Animal Selected Yet
                      </h3>
                      <p className="text-xs text-[#767586] dark:text-[#908fa1] max-w-xs leading-relaxed">
                        Spin the wheel to unlock the winning creature&apos;s habitat, vocal sounds, and biological fun facts.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB CONTENT: Challenges & Prompts */}
              {activeSidebarTab === 'challenge' && (
                <div className="flex-1 bg-white dark:bg-[#181922] rounded-3xl p-5 border border-[#eeedf7] dark:border-[#292a39] flex flex-col gap-3 shadow-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-[#eeedf7] dark:border-[#292a39]">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#767586] dark:text-[#908fa1]">
                      Spontaneous Creative Prompts
                    </h4>
                    <button
                      type="button"
                      onClick={handleGenerateChallenge}
                      className="text-[#4648d4] dark:text-[#8587ff] text-xs font-bold flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" /> New Prompt
                    </button>
                  </div>

                  {challengeAnimal ? (
                    <div className="space-y-3 flex-1 flex flex-col justify-between">
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-[#f4f2fd] to-white dark:from-[#1d1e2c] dark:to-[#181924] border border-[#eeedf7] dark:border-[#292a39] space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-3xl">{challengeAnimal.emoji}</span>
                          <span className="font-bold text-base text-[#1a1b22] dark:text-white">
                            {challengeAnimal.name} Challenge
                          </span>
                        </div>
                        <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                          <strong>Charades / Acting:</strong> {challengeAnimal.challenge}
                        </p>
                        <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                          <strong>Sound Mimicry:</strong> Make the signature sound <em>&ldquo;{challengeAnimal.sound}&rdquo;</em>
                        </p>
                        <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                          <strong>60s Sketch Sprint:</strong> Draw {challengeAnimal.name} in its natural habitat ({challengeAnimal.habitat})
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopy(`Animal Challenge: Act like a ${challengeAnimal.name}! ${challengeAnimal.challenge}`, 'prompt')}
                        className="w-full py-2.5 rounded-xl bg-[#4648d4] text-white text-xs font-bold hover:bg-[#3b3dbb] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {copiedText === 'prompt' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copiedText === 'prompt' ? 'Challenge Copied!' : 'Copy Challenge Prompt'}
                      </button>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-3">
                      <Gamepad2 className="w-10 h-10 text-[#4648d4]/40" />
                      <p className="text-xs text-[#767586] dark:text-[#908fa1]">
                        Generate high-energy classroom charades, drawing sprints, and sound mimicry prompts.
                      </p>
                      <button
                        type="button"
                        onClick={handleGenerateChallenge}
                        className="px-4 py-2 rounded-xl bg-[#4648d4] text-white text-xs font-bold cursor-pointer"
                      >
                        Generate Random Challenge
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* TAB CONTENT: Spin Audit Log */}
              {activeSidebarTab === 'audit' && (
                <div className="flex-1 bg-white dark:bg-[#181922] rounded-3xl p-5 border border-[#eeedf7] dark:border-[#292a39] flex flex-col gap-3 shadow-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-[#eeedf7] dark:border-[#292a39]">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#767586] dark:text-[#908fa1]">
                      CSPRNG Verification Log
                    </h4>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Web Crypto API
                    </span>
                  </div>

                  <div className="flex-1 max-h-[420px] overflow-y-auto space-y-2 pr-1">
                    {spinHistory.length === 0 ? (
                      <div className="p-8 text-center text-xs text-[#767586] dark:text-[#908fa1]">
                        No spins recorded in this session. Spin the wheel to generate audit trails.
                      </div>
                    ) : (
                      spinHistory.map((item, idx) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-[#fbf8ff] dark:bg-[#12131b] border border-[#eeedf7] dark:border-[#292a39] text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{item.emoji}</span>
                            <div>
                              <strong className="text-[#1a1b22] dark:text-white">{item.name}</strong>
                              <span className="block text-[10px] text-[#767586] dark:text-[#908fa1] font-mono">
                                Seed: {item.seed}
                              </span>
                            </div>
                          </div>
                          <span className="text-[11px] text-[#767586] dark:text-[#908fa1] font-mono">
                            {item.time}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          </div>
        )}

        {/* TAB 2: INSTANT GENERATOR MODE */}
        {activeTab === 'instant' && (
          <div className="w-full bg-[#fbf8ff] dark:bg-[#12131a] rounded-3xl p-6 sm:p-10 border border-[#eeedf7] dark:border-[#292a39] min-h-[580px] flex flex-col items-center justify-center space-y-6 text-center">
            <div className="space-y-2 max-w-xl">
              <h3 className="text-2xl sm:text-3xl font-bold font-headline text-[#1a1b22] dark:text-white">
                Instant Random Animal Generator
              </h3>
              <p className="text-xs sm:text-sm text-[#767586] dark:text-[#908fa1]">
                Draw single or batch random creatures with zero canvas delay for rapid art sprints and brainstorming.
              </p>
            </div>

            {/* Batch Count Selector */}
            <div className="flex items-center justify-center gap-3">
              <span className="text-xs font-semibold text-[#464554] dark:text-[#c7c4d7]">Quantity:</span>
              {[1, 2, 3, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setInstantCount(num)}
                  className={`w-10 h-10 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                    instantCount === num
                      ? 'bg-[#4648d4] text-white shadow-md'
                      : 'bg-[#f4f2fd] dark:bg-[#1e1f2c] text-[#464554] dark:text-[#c7c4d7] hover:bg-[#eae7fa]'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            {/* Instant Trigger Button */}
            <button
              type="button"
              onClick={handleInstantPick}
              disabled={activeAnimals.length === 0}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#4648d4] to-[#5b5ef0] text-white font-bold text-base shadow-lg shadow-[#4648d4]/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
            >
              <Zap className="w-5 h-5" />
              GENERATE {instantCount} RANDOM {instantCount === 1 ? 'ANIMAL' : 'ANIMALS'}
            </button>

            {/* Results Grid */}
            {instantResults.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl pt-4 animate-in fade-in zoom-in duration-300">
                {instantResults.map((animal) => (
                  <div
                    key={animal.id}
                    className="p-5 rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181924] text-left space-y-2 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-4xl">{animal.emoji}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#4648d4]/10 text-[#4648d4] dark:text-[#8587ff]">
                        {animal.category}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-[#1a1b22] dark:text-white">
                      {animal.name}
                    </h4>
                    <p className="text-xs text-[#767586] dark:text-[#908fa1]">
                      <strong>Habitat:</strong> {animal.habitat}
                    </p>
                    <button
                      type="button"
                      onClick={() => setInspectedAnimal(animal)}
                      className="text-xs text-[#4648d4] dark:text-[#8587ff] font-semibold hover:underline cursor-pointer block pt-1"
                    >
                      View Full Bio →
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: GUESS THE ANIMAL GAME */}
        {activeTab === 'guess' && (
          <div className="w-full bg-[#fbf8ff] dark:bg-[#12131a] rounded-3xl p-6 sm:p-10 border border-[#eeedf7] dark:border-[#292a39] min-h-[580px] flex flex-col items-center justify-center space-y-6 text-center">
            <div className="space-y-2 max-w-xl">
              <h3 className="text-2xl sm:text-3xl font-bold font-headline text-[#1a1b22] dark:text-white">
                Guess The Animal Challenge
              </h3>
              <p className="text-xs sm:text-sm text-[#767586] dark:text-[#908fa1]">
                Test your biology knowledge! Reveal 3 progressive clues before solving the mystery creature.
              </p>
            </div>

            {guessAnimal ? (
              <div className="w-full max-w-xl bg-white dark:bg-[#181924] rounded-3xl p-6 sm:p-8 border border-[#eeedf7] dark:border-[#292a39] text-left space-y-5 shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#4648d4]/10 text-[#4648d4] dark:text-[#8587ff]">
                    Mystery Creature ({guessAnimal.category})
                  </span>
                  <span className="text-xs font-semibold text-[#767586] dark:text-[#908fa1]">
                    Clues Revealed: {cluesRevealed}/3
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-[#f4f2fd] dark:bg-[#12131b] border border-[#eeedf7] dark:border-[#292a39]">
                    <strong className="text-xs text-[#4648d4] dark:text-[#8587ff] uppercase block">
                      Clue 1: Natural Habitat &amp; Diet
                    </strong>
                    <p className="text-xs sm:text-sm text-[#1a1b22] dark:text-white mt-1">
                      This creature lives in <strong>{guessAnimal.habitat}</strong> and is classified as a <strong>{guessAnimal.diet}</strong>.
                    </p>
                  </div>

                  {cluesRevealed >= 2 ? (
                    <div className="p-3.5 rounded-2xl bg-[#f4f2fd] dark:bg-[#12131b] border border-[#eeedf7] dark:border-[#292a39] animate-in fade-in duration-200">
                      <strong className="text-xs text-[#4648d4] dark:text-[#8587ff] uppercase block">
                        Clue 2: Vocal Sound &amp; Behavior
                      </strong>
                      <p className="text-xs sm:text-sm text-[#1a1b22] dark:text-white mt-1">
                        It communicates using distinct vocalizations: <em>&ldquo;{guessAnimal.sound}&rdquo;</em>.
                      </p>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleRevealClue}
                      className="w-full p-3 rounded-2xl border border-dashed border-[#4648d4]/40 bg-[#4648d4]/5 text-xs text-[#4648d4] dark:text-[#8587ff] font-bold hover:bg-[#4648d4]/10 transition-colors cursor-pointer"
                    >
                      + Reveal Clue 2
                    </button>
                  )}

                  {cluesRevealed >= 3 ? (
                    <div className="p-3.5 rounded-2xl bg-[#f4f2fd] dark:bg-[#12131b] border border-[#eeedf7] dark:border-[#292a39] animate-in fade-in duration-200">
                      <strong className="text-xs text-[#4648d4] dark:text-[#8587ff] uppercase block">
                        Clue 3: Biological Superpower
                      </strong>
                      <p className="text-xs sm:text-sm text-[#1a1b22] dark:text-white mt-1">
                        {guessAnimal.funFact}
                      </p>
                    </div>
                  ) : (
                    cluesRevealed >= 2 && (
                      <button
                        type="button"
                        onClick={handleRevealClue}
                        className="w-full p-3 rounded-2xl border border-dashed border-[#4648d4]/40 bg-[#4648d4]/5 text-xs text-[#4648d4] dark:text-[#8587ff] font-bold hover:bg-[#4648d4]/10 transition-colors cursor-pointer"
                      >
                        + Reveal Clue 3
                      </button>
                    )
                  )}
                </div>

                {isAnimalRevealed ? (
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2 animate-in zoom-in-95 duration-200">
                    <span className="text-5xl">{guessAnimal.emoji}</span>
                    <h4 className="text-xl font-bold text-emerald-700 dark:text-emerald-300 font-headline">
                      It is the {guessAnimal.name}!
                    </h4>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleRevealAnimal}
                      className="flex-1 py-3 rounded-xl bg-emerald-600 text-white text-xs sm:text-sm font-bold hover:bg-emerald-700 transition-colors cursor-pointer"
                    >
                      Reveal Mystery Animal
                    </button>
                    <button
                      type="button"
                      onClick={handleStartGuessGame}
                      className="px-4 py-3 rounded-xl border border-[#eeedf7] dark:border-[#292a39] text-xs font-bold hover:bg-[#f4f2fd] dark:hover:bg-[#20212f] transition-colors cursor-pointer"
                    >
                      Next Animal
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={handleStartGuessGame}
                className="px-8 py-3.5 rounded-2xl bg-[#4648d4] text-white font-bold text-base shadow-md cursor-pointer"
              >
                Start Guess Game
              </button>
            )}
          </div>
        )}

        {/* TAB 4: ANIMAL CHALLENGE MODE */}
        {activeTab === 'challenge' && (
          <div className="w-full bg-[#fbf8ff] dark:bg-[#12131a] rounded-3xl p-6 sm:p-10 border border-[#eeedf7] dark:border-[#292a39] min-h-[580px] flex flex-col items-center justify-center space-y-6 text-center">
            <div className="space-y-2 max-w-xl">
              <h3 className="text-2xl sm:text-3xl font-bold font-headline text-[#1a1b22] dark:text-white">
                Active Animal Challenge Studio
              </h3>
              <p className="text-xs sm:text-sm text-[#767586] dark:text-[#908fa1]">
                Physical charades, 60-second sketch warm-ups, and sound mimicry showdowns.
              </p>
            </div>

            {challengeAnimal ? (
              <div className="w-full max-w-xl bg-white dark:bg-[#181924] rounded-3xl p-6 sm:p-8 border border-[#eeedf7] dark:border-[#292a39] text-left space-y-4 shadow-md">
                <div className="flex items-center gap-3">
                  <span className="text-5xl">{challengeAnimal.emoji}</span>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#4648d4] dark:text-[#8587ff]">
                      {challengeAnimal.category} Challenge
                    </span>
                    <h4 className="text-2xl font-bold font-headline text-[#1a1b22] dark:text-white">
                      {challengeAnimal.name}
                    </h4>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#f4f2fd] dark:bg-[#12131b] border border-[#eeedf7] dark:border-[#292a39] space-y-2 text-xs sm:text-sm">
                  <p><strong>Charades Action:</strong> {challengeAnimal.challenge}</p>
                  <p><strong>Sound Mimicry:</strong> Vocalize <em>&ldquo;{challengeAnimal.sound}&rdquo;</em> with expression!</p>
                  <p><strong>Habitat Sketch:</strong> Draw {challengeAnimal.name} in its biome ({challengeAnimal.habitat})</p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleGenerateChallenge}
                    className="flex-1 py-3 rounded-xl bg-[#4648d4] text-white text-xs sm:text-sm font-bold hover:bg-[#3b3dbb] transition-colors cursor-pointer"
                  >
                    Spin Next Challenge
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopy(`Animal Challenge: Act like a ${challengeAnimal.name}! ${challengeAnimal.challenge}`, 'main-challenge')}
                    className="px-4 py-3 rounded-xl border border-[#eeedf7] dark:border-[#292a39] text-xs font-bold hover:bg-[#f4f2fd] dark:hover:bg-[#20212f] transition-colors cursor-pointer"
                  >
                    {copiedText === 'main-challenge' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleGenerateChallenge}
                className="px-8 py-3.5 rounded-2xl bg-[#4648d4] text-white font-bold text-base shadow-md cursor-pointer"
              >
                Generate First Challenge
              </button>
            )}
          </div>
        )}
      </div>

      {/* Winner Celebration Modal (Inside Container so it always shows in Fullscreen) */}
      {showWinnerModal && winnerAnimal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-white dark:bg-[#181924] rounded-3xl p-6 sm:p-8 border border-[#eeedf7] dark:border-[#313345] shadow-2xl animate-in zoom-in-95 duration-150 text-center flex flex-col items-center">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowWinnerModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-[#767586] hover:bg-[#f4f2fd] dark:hover:bg-[#222330] transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Victory Badge */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#4648d4] to-[#7375f3] text-white flex items-center justify-center shadow-lg shadow-[#4648d4]/30 mb-3 animate-pulse text-3xl">
              {winnerAnimal.emoji}
            </div>

            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#4648d4]/10 text-[#4648d4] dark:text-[#8587ff] border border-[#4648d4]/20 mb-1">
              {winnerAnimal.category} • {winnerAnimal.diet}
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold font-headline text-[#1a1b22] dark:text-white mt-1 mb-2">
              {winnerAnimal.name}
            </h2>

            {/* Spoken Voice Announcer Button */}
            <div className="mb-3 flex items-center justify-center">
              <button
                type="button"
                onClick={() =>
                  announceWinnerTTS(winnerAnimal.name, {
                    enabled: true,
                    prefix: 'The chosen animal is the'
                  })
                }
                className="px-3 py-1.5 rounded-full bg-[#f4f2fd] dark:bg-[#222330] hover:bg-[#eae6fd] text-[#4648d4] dark:text-[#8587ff] border border-[#eeedf7] dark:border-[#353648] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Speak animal name out loud"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>🔊 Speak Animal Name</span>
              </button>
            </div>

            <p className="text-xs text-[#767586] dark:text-[#908fa1] mb-4">
              Habitat: <strong>{winnerAnimal.habitat}</strong> • Vocal Call: <em>&ldquo;{winnerAnimal.sound}&rdquo;</em>
            </p>

            {/* Fun Fact Card */}
            <div className="w-full p-3.5 rounded-2xl bg-[#f4f2fd] dark:bg-[#12131b] border border-[#eeedf7] dark:border-[#2b2c3c] text-left text-xs mb-5">
              <span className="font-bold text-[#4648d4] dark:text-[#8587ff] block mb-1">
                🐾 Biological Superpower:
              </span>
              <p className="text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                {winnerAnimal.funFact}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="w-full flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setShowWinnerModal(false);
                  handleSpin();
                }}
                disabled={isSpinning || activeAnimals.length === 0}
                className="flex-1 py-3 px-4 rounded-xl bg-[#4648d4] hover:bg-[#3b3dbb] text-white text-xs font-bold transition-all shadow-md shadow-[#4648d4]/20 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCw className="w-4 h-4" />
                <span>Spin Again</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setEliminatedIds((prev) => new Set([...prev, winnerAnimal.id]));
                  setShowWinnerModal(false);
                }}
                className="py-3 px-4 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                title="Remove this animal from the wheel for subsequent spins"
              >
                <Trash2 className="w-4 h-4" />
                <span>Eliminate</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Full Animal Bio & Fun Facts */}
      {inspectedAnimal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-white dark:bg-[#181924] rounded-3xl p-6 sm:p-8 border border-[#eeedf7] dark:border-[#313345] shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3.5">
                <span className="text-5xl">{inspectedAnimal.emoji}</span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#4648d4]/10 text-[#4648d4] dark:text-[#8587ff]">
                    {inspectedAnimal.category}
                  </span>
                  <h3 className="text-2xl font-bold font-headline text-[#1a1b22] dark:text-white mt-1">
                    {inspectedAnimal.name}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setInspectedAnimal(null)}
                className="p-2 rounded-xl text-[#767586] hover:bg-[#f4f2fd] dark:hover:bg-[#222330] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm text-[#464554] dark:text-[#c7c4d7]">
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-[#f4f2fd] dark:bg-[#12131b]">
                  <strong className="text-[10px] text-[#767586] uppercase block">Habitat</strong>
                  <span className="font-semibold text-[#1a1b22] dark:text-white">{inspectedAnimal.habitat}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#f4f2fd] dark:bg-[#12131b]">
                  <strong className="text-[10px] text-[#767586] uppercase block">Diet Classification</strong>
                  <span className="font-semibold text-[#1a1b22] dark:text-white">{inspectedAnimal.diet}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#f4f2fd] dark:bg-[#12131b]">
                  <strong className="text-[10px] text-[#767586] uppercase block">Signature Vocal Sound</strong>
                  <span className="font-semibold text-[#1a1b22] dark:text-white">{inspectedAnimal.sound}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#f4f2fd] dark:bg-[#12131b]">
                  <strong className="text-[10px] text-[#767586] uppercase block">Difficulty Tier</strong>
                  <span className="font-semibold uppercase text-[#1a1b22] dark:text-white">{inspectedAnimal.difficulty}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#f4f2fd] to-white dark:from-[#1d1e2c] dark:to-[#181924] border border-[#eeedf7] dark:border-[#2b2c3c]">
                <p className="font-bold text-xs text-[#1a1b22] dark:text-white flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#4648d4]" />
                  Biological Fun Fact / Superpower:
                </p>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] mt-1.5 leading-relaxed">
                  {inspectedAnimal.funFact}
                </p>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setInspectedAnimal(null)}
                className="flex-1 py-2.5 rounded-xl bg-[#4648d4] text-white text-xs font-bold hover:bg-[#3b3dbb] transition-colors cursor-pointer"
              >
                Close Fact Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
