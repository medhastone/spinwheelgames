'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Shuffle,
  RotateCcw,
  Copy,
  Check,
  Share2,
  Download,
  Flame,
  Volume2,
  VolumeX,
  Target,
  Trophy,
  Timer,
  Play,
  Pause,
  Upload,
  Layers,
  Grid,
  Disc,
  Calendar,
  ExternalLink,
  ChevronRight,
  Info,
  Palette,
  Gamepad2,
  PenTool,
  BookOpen,
  GraduationCap,
  PartyPopper,
  Search,
  Lightbulb,
  Video,
  Heart
} from 'lucide-react';
import {
  RandomObject,
  ObjectCategory,
  ObjectDifficulty,
  ObjectPurpose,
  GeneratorMode
} from '@/lib/objects/types';
import {
  OBJECT_DATABASE,
  PURPOSE_DEFINITIONS,
  ALL_CATEGORIES,
  ALL_DIFFICULTIES
} from '@/lib/objects/objectDatabase';
import {
  generateUniqueObjects,
  generateRandomIndex,
  shuffleObjects,
  getCryptoRandomFloat,
  getDailySeedIndex,
  getTodayDateString
} from '@/lib/objects/randomness';
import { useSavedWheels, toggleWheelFavorite } from '@/lib/storage';

// Synthesizer Web Audio API for offline sound
function playSynthSound(type: 'click' | 'tick' | 'win' | 'start' | 'alarm', enabled: boolean) {
  if (!enabled || typeof window === 'undefined') return;
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;

    if (type === 'tick') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.03);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.03);
    } else if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'win') {
      // Arpeggiated chord
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(freq, now + i * 0.07);
        subGain.gain.setValueAtTime(0.12, now + i * 0.07);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.35);
        subOsc.connect(subGain);
        subGain.connect(ctx.destination);
        subOsc.start(now + i * 0.07);
        subOsc.stop(now + i * 0.07 + 0.35);
      });
    } else if (type === 'start') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(640, now + 0.15);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'alarm') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    }
  } catch {
    // audio failure silent ignore
  }
}

export default function RandomObjectEngine() {
  // Profile Favorites Hook
  const savedWheels = useSavedWheels();
  const isGameFavorited = savedWheels.some(
    (w) => w.id === 'object-wheel' || w.title.trim().toLowerCase() === 'random object generator'
  );
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleFavoriteGame = () => {
    const isNowSaved = toggleWheelFavorite({
      id: 'object-wheel',
      title: 'Random Object Generator',
      category: 'Objects & Prompts',
      description: 'Spin for random objects, 3D drawing props, writing items, and creative prompts.',
      items: OBJECT_DATABASE.slice(0, 12).map((o, idx) => ({ id: o.id || `o-${idx}`, text: o.name, weight: 1 })),
      paletteKey: 'teal'
    });
    setToastMsg(isNowSaved ? '❤️ Saved Object Generator to Profile Favorites!' : 'Removed Object Generator from Profile Favorites');
    setTimeout(() => setToastMsg(null), 2200);
  };

  // Mode state
  const [activeMode, setActiveMode] = useState<GeneratorMode>('instant');
  const [selectedPurpose, setSelectedPurpose] = useState<ObjectPurpose>('all');
  const [selectedCategory, setSelectedCategory] = useState<ObjectCategory>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | ObjectDifficulty>('All');
  const [quantity, setQuantity] = useState<number>(1);
  const [noRepeats, setNoRepeats] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Results state
  const [generatedList, setGeneratedList] = useState<RandomObject[]>(() => OBJECT_DATABASE.slice(0, 1));
  const [historyIds, setHistoryIds] = useState<Set<string>>(new Set());
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Wheel state
  const wheelCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [wheelItems, setWheelItems] = useState<RandomObject[]>(() => OBJECT_DATABASE.slice(0, 12));
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [wheelWinner, setWheelWinner] = useState<RandomObject | null>(null);
  const [eliminateWinner, setEliminateWinner] = useState<boolean>(false);
  const currentRotationRef = useRef<number>(0);

  // Challenge state
  const [challengeObject, setChallengeObject] = useState<RandomObject | null>(() => OBJECT_DATABASE[0] || null);
  const [timerSeconds, setTimerSeconds] = useState<number>(30);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  // Custom list state
  const [customInput, setCustomInput] = useState<string>(
    'Pocket Compass\nVintage Key\nHourglass\nLava Lamp\nMagnifying Glass\nSwiss Army Knife\nRubber Duck\nAntique Mirror'
  );
  const [customDedupe, setCustomDedupe] = useState<boolean>(true);

  // Object Streak Game state
  const [streakGameTarget, setStreakGameTarget] = useState<RandomObject | null>(null);
  const [streakGameOptions, setStreakGameOptions] = useState<string[]>([]);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('spinwheel_object_best_streak');
        return stored ? parseInt(stored, 10) : 0;
      } catch {
        return 0;
      }
    }
    return 0;
  });
  const [streakFeedback, setStreakFeedback] = useState<'correct' | 'wrong' | null>(null);

  // Daily Object of the Day (seeded by YYYY-MM-DD)
  const dailyObject = useMemo(() => {
    const todayStr = getTodayDateString();
    const index = getDailySeedIndex(todayStr, OBJECT_DATABASE.length);
    return OBJECT_DATABASE[index];
  }, []);

  // Filter eligible database pool based on purpose, category, difficulty
  const eligiblePool = useMemo(() => {
    return OBJECT_DATABASE.filter((item) => {
      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Difficulty filter
      if (selectedDifficulty !== 'All' && item.difficulty !== selectedDifficulty) {
        return false;
      }
      // Purpose filter
      if (selectedPurpose === 'drawing' && !item.drawingFriendly) return false;
      if (selectedPurpose === 'pictionary' && !item.pictionaryFriendly) return false;
      if (selectedPurpose === 'writing' && !item.writingFriendly) return false;
      if (selectedPurpose === 'classroom' && !item.classroomFriendly) return false;
      if (selectedPurpose === 'party' && !item.partyFriendly) return false;

      return true;
    });
  }, [selectedCategory, selectedDifficulty, selectedPurpose]);

  // Generate objects
  const handleGenerate = useCallback(
    (countOverride?: number) => {
      const count = countOverride ?? quantity;
      setIsGenerating(true);
      playSynthSound('start', soundEnabled);

      const excludeSet = noRepeats ? historyIds : undefined;
      const { selected, exhausted } = generateUniqueObjects(eligiblePool, count, excludeSet);

      if (selected.length > 0) {
        setGeneratedList(selected);

        // Update history
        if (noRepeats) {
          if (exhausted) {
            setHistoryIds(new Set(selected.map((s) => s.id)));
          } else {
            setHistoryIds((prev) => {
              const updated = new Set(prev);
              selected.forEach((s) => updated.add(s.id));
              return updated;
            });
          }
        }

        // Set as challenge object if in challenge mode
        if (activeMode === 'challenge') {
          setChallengeObject(selected[0]);
          setTimerSeconds(30);
          setTimerRunning(false);
        }
      }

      setTimeout(() => {
        setIsGenerating(false);
        playSynthSound('win', soundEnabled);
      }, 150);
    },
    [quantity, eligiblePool, noRepeats, historyIds, soundEnabled, activeMode]
  );

  // Update best streak
  const handleStreakAnswer = (chosenCategory: string) => {
    if (!streakGameTarget) return;

    if (chosenCategory === streakGameTarget.category) {
      playSynthSound('win', soundEnabled);
      const nextStreak = currentStreak + 1;
      setCurrentStreak(nextStreak);
      setStreakFeedback('correct');
      if (nextStreak > bestStreak) {
        setBestStreak(nextStreak);
        try {
          localStorage.setItem('spinwheel_object_best_streak', nextStreak.toString());
        } catch {
          // ignore
        }
      }
      setTimeout(() => {
        initStreakRound();
      }, 1200);
    } else {
      playSynthSound('alarm', soundEnabled);
      setStreakFeedback('wrong');
      setCurrentStreak(0);
      setTimeout(() => {
        initStreakRound();
      }, 1800);
    }
  };

  const initStreakRound = useCallback(() => {
    setStreakFeedback(null);
    if (OBJECT_DATABASE.length < 4) return;
    const target = OBJECT_DATABASE[generateRandomIndex(OBJECT_DATABASE.length)];
    setStreakGameTarget(target);

    // Pick 3 random distinct decoy categories
    const otherCats = ALL_CATEGORIES.filter((c) => c !== 'All' && c !== target.category);
    const shuffledCats = shuffleObjects(otherCats).slice(0, 3);
    const options = shuffleObjects([target.category, ...shuffledCats]);
    setStreakGameOptions(options);
  }, []);

  useEffect(() => {
    if (activeMode === 'streak' && !streakGameTarget) {
      initStreakRound();
    }
  }, [activeMode, streakGameTarget, initStreakRound]);

  // Draw Canvas Wheel
  useEffect(() => {
    if (activeMode !== 'wheel') return;
    const canvas = wheelCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const items = wheelItems.length > 0 ? wheelItems : eligiblePool.slice(0, 8);
    const numSlices = items.length;
    const size = canvas.width;
    const center = size / 2;
    const radius = center - 12;
    const arc = (2 * Math.PI) / numSlices;

    ctx.clearRect(0, 0, size, size);

    // Color palette for slices
    const colors = [
      '#6366f1',
      '#ec4899',
      '#10b981',
      '#f59e0b',
      '#8b5cf6',
      '#06b6d4',
      '#f97316',
      '#3b82f6',
      '#14b8a6',
      '#d946ef',
      '#eab308',
      '#0ea5e9'
    ];

    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(currentRotationRef.current);

    items.forEach((item, i) => {
      const angle = i * arc;
      ctx.beginPath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, angle, angle + arc);
      ctx.closePath();
      ctx.fill();

      // Border line
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Text label
      ctx.save();
      ctx.rotate(angle + arc / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 13px system-ui, -apple-system, sans-serif';
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 4;
      const truncatedName = item.name.length > 18 ? item.name.slice(0, 16) + '..' : item.name;
      ctx.fillText(truncatedName, radius - 18, 5);
      ctx.restore();
    });

    // Center hub
    ctx.beginPath();
    ctx.arc(0, 0, 36, 0, 2 * Math.PI);
    ctx.fillStyle = '#1e1b4b';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('SPIN', 0, 0);

    ctx.restore();
  }, [wheelItems, activeMode, eligiblePool]);

  // Execute CSPRNG Wheel Spin
  const spinWheel = useCallback(() => {
    if (isSpinning) return;
    const items = wheelItems.length > 0 ? wheelItems : eligiblePool.slice(0, 8);
    if (items.length === 0) return;

    setIsSpinning(true);
    setWheelWinner(null);
    playSynthSound('start', soundEnabled);

    // 1. Select Winner BEFORE animation using CSPRNG
    const winnerIndex = generateRandomIndex(items.length);
    const winner = items[winnerIndex];

    const arc = (2 * Math.PI) / items.length;
    // Top pointer is at -PI/2 (12 o'clock). Slice i spans [i * arc, (i + 1) * arc].
    // Slices rotate clockwise. The angle of slice center is (winnerIndex + 0.5) * arc.
    // Target angle theta such that (theta + (winnerIndex + 0.5) * arc) % 2PI == 3PI/2.
    const targetAngle = (3 * Math.PI) / 2 - (winnerIndex + 0.5) * arc;

    // Normalize and add full spins (5 to 8 rotations)
    const extraRotations = (5 + generateRandomIndex(4)) * 2 * Math.PI;
    const startAngle = currentRotationRef.current % (2 * Math.PI);
    const totalRotation = extraRotations + (targetAngle - startAngle);

    const duration = 4000;
    const startTime = performance.now();
    let lastTickAngle = startAngle;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Ease out cubic deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentAngle = startAngle + totalRotation * easeOut;
      currentRotationRef.current = currentAngle;

      // Tick sound on slice boundary crossing
      if (Math.abs(currentAngle - lastTickAngle) >= arc) {
        playSynthSound('tick', soundEnabled);
        lastTickAngle = currentAngle;
      }

      // Re-render canvas
      const canvas = wheelCanvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const size = canvas.width;
          const center = size / 2;
          const radius = center - 12;
          ctx.clearRect(0, 0, size, size);

          const colors = [
            '#6366f1',
            '#ec4899',
            '#10b981',
            '#f59e0b',
            '#8b5cf6',
            '#06b6d4',
            '#f97316',
            '#3b82f6',
            '#14b8a6',
            '#d946ef',
            '#eab308',
            '#0ea5e9'
          ];

          ctx.save();
          ctx.translate(center, center);
          ctx.rotate(currentAngle);

          items.forEach((item, i) => {
            const a = i * arc;
            ctx.beginPath();
            ctx.fillStyle = colors[i % colors.length];
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, radius, a, a + arc);
            ctx.closePath();
            ctx.fill();

            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.save();
            ctx.rotate(a + arc / 2);
            ctx.textAlign = 'right';
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 13px system-ui, -apple-system, sans-serif';
            ctx.shadowColor = 'rgba(0,0,0,0.5)';
            ctx.shadowBlur = 4;
            const truncatedName = item.name.length > 18 ? item.name.slice(0, 16) + '..' : item.name;
            ctx.fillText(truncatedName, radius - 18, 5);
            ctx.restore();
          });

          // Center hub
          ctx.beginPath();
          ctx.arc(0, 0, 36, 0, 2 * Math.PI);
          ctx.fillStyle = '#1e1b4b';
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 4;
          ctx.stroke();

          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.font = 'bold 12px sans-serif';
          ctx.fillText('SPIN', 0, 0);

          ctx.restore();
        }
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        setWheelWinner(winner);
        playSynthSound('win', soundEnabled);
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore
        }

        // Elimination mode: optionally remove winner
        if (eliminateWinner && items.length > 2) {
          setWheelItems((prev) => prev.filter((it) => it.id !== winner.id));
        }
      }
    };

    requestAnimationFrame(animate);
  }, [isSpinning, wheelItems, eligiblePool, soundEnabled, eliminateWinner]);

  // Challenge timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            playSynthSound('alarm', soundEnabled);
            setTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, timerSeconds, soundEnabled]);

  // Keyboard shortcut: Spacebar to spin / generate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in textarea or input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        if (activeMode === 'wheel') {
          spinWheel();
        } else {
          handleGenerate();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeMode, handleGenerate, spinWheel]);

  // Copy result text
  const handleCopy = (text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedText(true);
      playSynthSound('click', soundEnabled);
      setTimeout(() => setCopiedText(false), 2000);
    }
  };

  // Web Share API
  const handleShare = (objectName: string, category: string) => {
    const shareText = `I generated a random object: "${objectName}" (${category}) on SpinWheelGames.org! Try it here: https://spinwheelgames.org/random-object-generator`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator
        .share({
          title: 'Random Object Generator - SpinWheelGames',
          text: shareText,
          url: 'https://spinwheelgames.org/random-object-generator'
        })
        .catch(() => handleCopy(shareText));
    } else {
      handleCopy(shareText);
    }
  };

  // Download visual Canvas Card
  const downloadObjectCard = (obj: RandomObject) => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 500;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Gradient background
    const grad = ctx.createLinearGradient(0, 0, 800, 500);
    grad.addColorStop(0, '#0f172a');
    grad.addColorStop(0.5, '#1e1b4b');
    grad.addColorStop(1, '#311042');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 800, 500);

    // Accent frame border
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 4;
    ctx.strokeRect(24, 24, 752, 452);

    // Brand header
    ctx.fillStyle = '#a5b4fc';
    ctx.font = 'bold 18px system-ui, sans-serif';
    ctx.fillText('SPINWHEELGAMES.ORG  •  RANDOM OBJECT GENERATOR', 50, 70);

    // Category & Difficulty Pill
    ctx.fillStyle = '#4f46e5';
    ctx.beginPath();
    ctx.roundRect(50, 95, 140, 32, 16);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(obj.category.toUpperCase(), 120, 116);

    ctx.fillStyle = '#ec4899';
    ctx.beginPath();
    ctx.roundRect(205, 95, 120, 32, 16);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillText(obj.difficulty.toUpperCase(), 265, 116);

    // Object Name
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px system-ui, sans-serif';
    ctx.fillText(obj.name, 50, 190);

    // Description
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '20px system-ui, sans-serif';
    ctx.fillText(obj.shortDescription, 50, 240);

    // Challenge Box
    if (obj.funChallenge) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.beginPath();
      ctx.roundRect(50, 280, 700, 110, 12);
      ctx.fill();

      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 16px system-ui, sans-serif';
      ctx.fillText('CREATIVE CHALLENGE:', 70, 315);

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'italic 18px system-ui, sans-serif';
      ctx.fillText(`"${obj.funChallenge}"`, 70, 355);
    }

    // Footer Watermark
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px system-ui, sans-serif';
    ctx.fillText('Browser-Based Cryptographic Randomness (crypto.getRandomValues)', 50, 440);

    // Download PNG
    const link = document.createElement('a');
    link.download = `random-object-${obj.slug}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    playSynthSound('win', soundEnabled);
  };

  // Parse custom list
  const handleLoadCustomList = () => {
    const lines = customInput
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const items = customDedupe ? Array.from(new Set(lines)) : lines;
    if (items.length === 0) return;

    const customObjects: RandomObject[] = items.map((name, idx) => ({
      id: `custom-${idx}-${Date.now()}`,
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: 'Random Props',
      subcategory: 'Custom',
      difficulty: 'Medium',
      shortDescription: 'Custom user-entered object.',
      drawingFriendly: true,
      pictionaryFriendly: true,
      writingFriendly: true,
      classroomFriendly: true,
      partyFriendly: true,
      tags: ['custom']
    }));

    setWheelItems(customObjects);
    setGeneratedList(customObjects.slice(0, 1));
    setActiveMode('wheel');
    playSynthSound('start', soundEnabled);
  };

  // File upload reader for custom items
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setCustomInput(text);
        playSynthSound('click', soundEnabled);
      }
    };
    reader.readAsText(file);
  };

  // Main primary display object
  const primaryObject = generatedList[0] || dailyObject;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <span>{toastMsg}</span>
        </div>
      )}

      {/* 1. Purpose Selector Bar */}
      <section className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xl">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <span>What do you need a random object for?</span>
              <button
                type="button"
                onClick={handleFavoriteGame}
                aria-label={isGameFavorited ? 'Remove generator from profile favorites' : 'Save generator to profile favorites'}
                title={isGameFavorited ? 'Saved in Profile Favorites' : 'Save Generator to Profile Favorites'}
                className={`p-1 rounded-full transition-all cursor-pointer ${
                  isGameFavorited
                    ? 'bg-rose-500/20 text-rose-500 scale-105'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-rose-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${isGameFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </h2>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
            Filters 1,000+ objects for your specific use case
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {PURPOSE_DEFINITIONS.map((p) => {
            const isSelected = selectedPurpose === p.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedPurpose(p.id);
                  playSynthSound('click', soundEnabled);
                }}
                className={`flex items-center gap-2.5 p-2.5 rounded-xl text-left transition-all border text-xs sm:text-sm ${
                  isSelected
                    ? 'bg-indigo-600/10 dark:bg-indigo-600/30 border-indigo-500 text-indigo-950 dark:text-white font-medium shadow-xs'
                    : 'bg-slate-100/80 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <div
                  className={`p-1.5 rounded-lg shrink-0 ${
                    isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {p.id === 'all' && <Sparkles className="w-4 h-4" />}
                  {p.id === 'drawing' && <Palette className="w-4 h-4" />}
                  {p.id === 'pictionary' && <Gamepad2 className="w-4 h-4" />}
                  {p.id === 'writing' && <PenTool className="w-4 h-4" />}
                  {p.id === 'storytelling' && <BookOpen className="w-4 h-4" />}
                  {p.id === 'classroom' && <GraduationCap className="w-4 h-4" />}
                  {p.id === 'party' && <PartyPopper className="w-4 h-4" />}
                  {p.id === 'scavenger' && <Search className="w-4 h-4" />}
                  {p.id === 'brainstorming' && <Lightbulb className="w-4 h-4" />}
                  {p.id === 'content' && <Video className="w-4 h-4" />}
                </div>
                <div className="truncate">
                  <div className="truncate font-semibold">{p.label}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{p.tagline}</div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. Interactive Main Tool Container */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        {/* Top Control Bar: Mode Selector & Global Controls */}
        <div className="bg-slate-50 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 p-4 sm:px-6 flex flex-wrap items-center justify-between gap-3">
          {/* Mode Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-200/80 dark:bg-slate-900 p-1 rounded-xl border border-slate-300/80 dark:border-slate-800">
            <button
              onClick={() => {
                setActiveMode('instant');
                playSynthSound('click', soundEnabled);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeMode === 'instant'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Instant
            </button>
            <button
              onClick={() => {
                setActiveMode('grid');
                if (generatedList.length < 4) handleGenerate(6);
                playSynthSound('click', soundEnabled);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeMode === 'grid'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              Grid View
            </button>
            <button
              onClick={() => {
                setActiveMode('wheel');
                playSynthSound('click', soundEnabled);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeMode === 'wheel'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Disc className="w-3.5 h-3.5" />
              Spin Wheel
            </button>
            <button
              onClick={() => {
                setActiveMode('challenge');
                if (!challengeObject) setChallengeObject(primaryObject);
                playSynthSound('click', soundEnabled);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeMode === 'challenge'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              Challenge
            </button>
            <button
              onClick={() => {
                setActiveMode('streak');
                playSynthSound('click', soundEnabled);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeMode === 'streak'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              Streak Game
            </button>
            <button
              onClick={() => {
                setActiveMode('custom');
                playSynthSound('click', soundEnabled);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeMode === 'custom'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              Custom List
            </button>
            <button
              onClick={() => {
                setActiveMode('daily');
                playSynthSound('click', soundEnabled);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeMode === 'daily'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              Daily Object
            </button>
          </div>

          {/* Sound & History Settings */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSoundEnabled((prev) => !prev)}
              title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
              className="p-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-800 transition"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              )}
            </button>
            {noRepeats && historyIds.size > 0 && (
              <button
                onClick={() => {
                  setHistoryIds(new Set());
                  playSynthSound('click', soundEnabled);
                }}
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-rose-500 transition flex items-center gap-1"
                title="Clear no-repeat history"
              >
                <RotateCcw className="w-3 h-3" />
                Reset History ({historyIds.size})
              </button>
            )}
          </div>
        </div>

        {/* Filters & Parameter Toolbar */}
        <div className="p-4 sm:p-6 bg-slate-100/60 dark:bg-slate-950/40 border-b border-slate-200 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm">
          {/* Category Dropdown */}
          <div className="space-y-1.5">
            <label className="text-slate-600 dark:text-slate-400 font-medium">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as ObjectCategory)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-200 font-medium focus:outline-none focus:border-indigo-500"
            >
              {ALL_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Dropdown */}
          <div className="space-y-1.5">
            <label className="text-slate-600 dark:text-slate-400 font-medium">Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={(e) =>
                setSelectedDifficulty(e.target.value as 'All' | ObjectDifficulty)
              }
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-200 font-medium focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Difficulties</option>
              {ALL_DIFFICULTIES.map((diff) => (
                <option key={diff} value={diff}>
                  {diff}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity Controls */}
          <div className="space-y-1.5">
            <label className="text-slate-600 dark:text-slate-400 font-medium">Quantity</label>
            <div className="flex items-center gap-1">
              {[1, 5, 10].map((q) => (
                <button
                  key={q}
                  onClick={() => setQuantity(q)}
                  className={`flex-1 py-2 rounded-xl font-bold transition text-xs ${
                    quantity === q
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-800'
                  }`}
                >
                  {q}
                </button>
              ))}
              <input
                type="number"
                min="1"
                max="25"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, Math.min(25, parseInt(e.target.value) || 1)))
                }
                title="Custom Quantity (max 25)"
                className="w-14 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 rounded-xl py-2 px-1 text-center font-bold text-slate-900 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Options: No-Repeat Checkbox */}
          <div className="space-y-1.5 flex flex-col justify-end">
            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={noRepeats}
                onChange={(e) => setNoRepeats(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-white dark:bg-slate-900"
              />
              <span className="font-semibold text-xs sm:text-sm">No Repeats</span>
            </label>
            <div className="text-[11px] text-slate-500">
              {eligiblePool.length} objects currently eligible
            </div>
          </div>
        </div>

        {/* Main Mode View Container */}
        <div className="p-6">
          {/* ----------------- MODE A: INSTANT ----------------- */}
          {activeMode === 'instant' && (
            <div className="space-y-6">
              {/* Primary Card View (if quantity === 1) */}
              {quantity === 1 && primaryObject && (
                <div className="relative bg-gradient-to-br from-indigo-50/90 via-white to-slate-100 dark:from-slate-900 dark:via-indigo-950/40 dark:to-slate-900 border border-indigo-200 dark:border-indigo-500/30 rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-2xl">
                  {/* Category & Difficulty Badges */}
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 dark:border-indigo-500/30">
                      {primaryObject.category} • {primaryObject.subcategory}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        primaryObject.difficulty === 'Easy'
                          ? 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/20 dark:border-emerald-500/30'
                          : primaryObject.difficulty === 'Medium'
                          ? 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/20 dark:border-amber-500/30'
                          : 'bg-rose-500/10 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/20 dark:border-rose-500/30'
                      }`}
                    >
                      {primaryObject.difficulty}
                    </span>
                  </div>

                  {/* Main Object Typography */}
                  <div className="space-y-2">
                    <div className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold">
                      Your Random Object
                    </div>
                    <h2 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-indigo-100 dark:to-indigo-300 tracking-tight">
                      {primaryObject.name}
                    </h2>
                    <p className="max-w-xl mx-auto text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                      {primaryObject.shortDescription}
                    </p>
                  </div>

                  {/* Creative Challenge Banner */}
                  {primaryObject.funChallenge && (
                    <div className="max-w-xl mx-auto bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-left">
                      <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
                        <Target className="w-4 h-4" />
                        Creative Prompt
                      </div>
                      <p className="text-slate-800 dark:text-slate-200 text-sm italic font-medium">
                        &ldquo;{primaryObject.funChallenge}&rdquo;
                      </p>
                    </div>
                  )}

                  {/* Action Buttons Toolbar */}
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                    <button
                      onClick={() => handleGenerate(1)}
                      disabled={isGenerating}
                      className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base shadow-lg shadow-indigo-600/30 transition transform active:scale-95 flex items-center gap-2"
                    >
                      <Shuffle className="w-5 h-5" />
                      Generate Again
                    </button>
                    <button
                      onClick={() => {
                        setQuantity(5);
                        handleGenerate(5);
                      }}
                      className="px-4 py-3 rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-300 dark:border-slate-700 transition"
                    >
                      Generate 5 More
                    </button>
                    <button
                      onClick={() => {
                        setChallengeObject(primaryObject);
                        setActiveMode('challenge');
                        setTimerSeconds(30);
                        setTimerRunning(false);
                      }}
                      className="px-4 py-3 rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-amber-700 dark:text-amber-300 font-semibold text-sm border border-slate-300 dark:border-slate-700 transition flex items-center gap-1.5"
                    >
                      <Target className="w-4 h-4" />
                      Challenge Me
                    </button>
                    <button
                      onClick={() => handleCopy(primaryObject.name)}
                      className="p-3 rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700 transition"
                      title="Copy Object Name"
                    >
                      {copiedText ? (
                        <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleShare(primaryObject.name, primaryObject.category)}
                      className="p-3 rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700 transition"
                      title="Share Result"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => downloadObjectCard(primaryObject)}
                      className="p-3 rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700 transition"
                      title="Download Shareable Image Card"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>

                  {/* "What can I do with this?" Suggestion Pill List */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 max-w-xl mx-auto">
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-2">
                      Try with this object:
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                        🎨 Quick 60s sketch
                      </span>
                      <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                        🤫 Describe without naming it
                      </span>
                      <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                        📖 Use as a story prop
                      </span>
                      <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                        🔍 Scavenger hunt clue
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Multi-Object List View (if quantity > 1) */}
              {quantity > 1 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-200">
                      Generated {generatedList.length} Random Objects
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleCopy(generatedList.map((g, i) => `${i + 1}. ${g.name}`).join('\n'))
                        }
                        className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition flex items-center gap-1.5"
                      >
                        {copiedText ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        Copy List
                      </button>
                      <button
                        onClick={() => handleGenerate()}
                        className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition flex items-center gap-1.5"
                      >
                        <Shuffle className="w-3.5 h-3.5" />
                        Regenerate
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {generatedList.map((item, idx) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition space-y-2 group"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-indigo-600 dark:text-indigo-400">#{idx + 1}</span>
                          <span className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                            {item.category}
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition">
                          {item.name}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                          {item.shortDescription}
                        </p>
                        <div className="pt-2 flex items-center justify-between border-t border-slate-200 dark:border-slate-700/60 text-xs">
                          <span className="text-slate-500 dark:text-slate-400 font-medium">{item.difficulty}</span>
                          <button
                            onClick={() => handleCopy(item.name)}
                            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition flex items-center gap-1"
                          >
                            <Copy className="w-3 h-3" />
                            Copy
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ----------------- MODE B: GRID VIEW ----------------- */}
          {activeMode === 'grid' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-200">
                  Object Catalog Cards ({generatedList.length} results)
                </h3>
                <button
                  onClick={() => handleGenerate(12)}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition flex items-center gap-2"
                >
                  <Shuffle className="w-4 h-4" />
                  Load New Grid
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {generatedList.map((obj) => (
                  <div
                    key={obj.id}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/80 transition-all flex flex-col justify-between space-y-3 group shadow-lg"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300">
                          {obj.category}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{obj.difficulty}</span>
                      </div>
                      <h4 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition">
                        {obj.name}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {obj.shortDescription}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                      <button
                        onClick={() => {
                          setChallengeObject(obj);
                          setActiveMode('challenge');
                          setTimerSeconds(30);
                          setTimerRunning(false);
                        }}
                        className="text-amber-600 dark:text-amber-400 hover:underline font-semibold flex items-center gap-1"
                      >
                        <Target className="w-3.5 h-3.5" />
                        Challenge
                      </button>
                      <button
                        onClick={() => downloadObjectCard(obj)}
                        className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Card
                      </button>
                      <button
                        onClick={() => handleCopy(obj.name)}
                        className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition flex items-center gap-1"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        Copy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ----------------- MODE C: SPIN WHEEL ----------------- */}
          {activeMode === 'wheel' && (
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="text-center space-y-1">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Random Object Spin Wheel</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Pre-selected using browser Web Crypto API (crypto.getRandomValues())
                </p>
              </div>

              {/* Wheel Container with Pointer */}
              <div className="relative flex items-center justify-center p-2">
                {/* Pointer Arrow at Top (12 o'clock) */}
                <div className="absolute top-0 z-20 transform -translate-y-2">
                  <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-amber-400 drop-shadow-lg" />
                </div>

                {/* Canvas Wheel */}
                <canvas
                  ref={wheelCanvasRef}
                  width={380}
                  height={380}
                  className="w-full max-w-[min(92vw,360px)] sm:max-w-[400px] aspect-square rounded-full shadow-2xl border-4 border-slate-200 dark:border-slate-800 touch-manipulation cursor-pointer"
                  onClick={spinWheel}
                />
              </div>

              {/* Spin Controls */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={spinWheel}
                  disabled={isSpinning}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 text-white font-extrabold text-lg shadow-xl shadow-indigo-600/30 transition transform active:scale-95 flex items-center gap-2"
                >
                  <Disc className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
                  {isSpinning ? 'Spinning...' : 'SPIN WHEEL'}
                </button>
                <button
                  onClick={() => {
                    const newItems = shuffleObjects(eligiblePool).slice(0, 12);
                    setWheelItems(newItems);
                    playSynthSound('click', soundEnabled);
                  }}
                  disabled={isSpinning}
                  className="px-4 py-3.5 rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-300 dark:border-slate-700 transition flex items-center gap-1.5"
                >
                  <Shuffle className="w-4 h-4" />
                  Shuffle Slices
                </button>
              </div>

              {/* Elimination Toggle */}
              <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={eliminateWinner}
                  onChange={(e) => setEliminateWinner(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-indigo-600 bg-white dark:bg-slate-900"
                />
                Elimination Mode: Remove chosen object from wheel after spin
              </label>

              {/* Winner Announcement Card */}
              {wheelWinner && (
                <div className="w-full max-w-md bg-gradient-to-r from-indigo-50 via-white to-slate-100 dark:from-indigo-950 dark:to-slate-900 border border-indigo-200 dark:border-indigo-500/50 rounded-2xl p-5 text-center space-y-3 animate-fade-in shadow-xl">
                  <div className="text-xs text-amber-600 dark:text-amber-400 font-bold uppercase tracking-widest">
                    🎉 Spin Wheel Winner!
                  </div>
                  <h4 className="text-3xl font-black text-slate-900 dark:text-white">{wheelWinner.name}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">{wheelWinner.shortDescription}</p>
                  <div className="flex items-center justify-center gap-2 pt-2">
                    <button
                      onClick={() => handleCopy(wheelWinner.name)}
                      className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      Copy
                    </button>
                    <button
                      onClick={() => handleShare(wheelWinner.name, wheelWinner.category)}
                      className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 flex items-center gap-1"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      Share
                    </button>
                    <button
                      onClick={() => downloadObjectCard(wheelWinner)}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Save Card
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ----------------- MODE D: CHALLENGE MODE ----------------- */}
          {activeMode === 'challenge' && challengeObject && (
            <div className="max-w-xl mx-auto bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 text-center shadow-xl">
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                <Target className="w-4 h-4" />
                Object Challenge Mode
              </div>

              {/* Challenge Target Object */}
              <div className="space-y-1">
                <div className="text-xs text-slate-500 dark:text-slate-400">Target Object</div>
                <h3 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
                  {challengeObject.name}
                </h3>
                <span className="inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {challengeObject.category} • {challengeObject.difficulty}
                </span>
              </div>

              {/* Challenge Rule Prompt Box */}
              <div className="p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 text-left space-y-2">
                <div className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
                  Your Mission:
                </div>
                <p className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {challengeObject.funChallenge ||
                    `Draw or describe "${challengeObject.name}" without saying its name or using hand gestures!`}
                </p>
              </div>

              {/* Countdown Timer */}
              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="flex items-center gap-2 text-3xl sm:text-4xl font-black text-amber-600 dark:text-amber-400 font-mono">
                  <Timer className="w-8 h-8" />
                  {timerSeconds}s
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setTimerRunning((prev) => !prev);
                      playSynthSound('click', soundEnabled);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                      timerRunning
                        ? 'bg-amber-600 text-white'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    }`}
                  >
                    {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {timerRunning ? 'Pause Timer' : 'Start 30s Timer'}
                  </button>
                  <button
                    onClick={() => {
                      setTimerSeconds(30);
                      setTimerRunning(false);
                      playSynthSound('click', soundEnabled);
                    }}
                    className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Challenge Navigation Buttons */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    const nextObj = eligiblePool[generateRandomIndex(eligiblePool.length)];
                    setChallengeObject(nextObj);
                    setTimerSeconds(30);
                    setTimerRunning(false);
                    playSynthSound('start', soundEnabled);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md transition flex items-center gap-1.5"
                >
                  <Shuffle className="w-4 h-4" />
                  New Challenge Object
                </button>
                <button
                  onClick={() =>
                    handleShare(
                      `Challenge: ${challengeObject.funChallenge || challengeObject.name}`,
                      challengeObject.category
                    )
                  }
                  className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-300 dark:border-slate-700 flex items-center gap-1.5"
                >
                  <Share2 className="w-4 h-4" />
                  Share Challenge
                </button>
              </div>
            </div>
          )}

          {/* ----------------- MODE E: CUSTOM OBJECT LIST ----------------- */}
          {activeMode === 'custom' && (
            <div className="max-w-2xl mx-auto space-y-5">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Custom Object List Generator</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Paste your own custom items (one per line) or import from a TXT or CSV file.
                </p>
              </div>

              <div className="space-y-2">
                <textarea
                  rows={8}
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="Enter items one per line..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-2xl p-4 text-sm text-slate-900 dark:text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
                />
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
                    <input
                      type="checkbox"
                      checked={customDedupe}
                      onChange={(e) => setCustomDedupe(e.target.checked)}
                      className="w-3.5 h-3.5 rounded border-slate-300 dark:border-slate-700 text-indigo-600 bg-white dark:bg-slate-900"
                    />
                    Remove duplicate entries
                  </label>

                  <label className="cursor-pointer text-indigo-600 dark:text-indigo-400 hover:underline font-semibold flex items-center gap-1">
                    <Upload className="w-3.5 h-3.5" />
                    Upload TXT / CSV file
                    <input
                      type="file"
                      accept=".txt,.csv"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleLoadCustomList}
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md transition flex items-center gap-2"
                >
                  <Disc className="w-4 h-4" />
                  Spin On Custom Wheel
                </button>
                <button
                  onClick={() => {
                    const lines = customInput
                      .split('\n')
                      .map((l) => l.trim())
                      .filter(Boolean);
                    if (lines.length === 0) return;
                    const randomChoice = lines[generateRandomIndex(lines.length)];
                    alert(`Random Choice: ${randomChoice}`);
                    playSynthSound('win', soundEnabled);
                  }}
                  className="px-5 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-300 dark:border-slate-700 flex items-center gap-1.5"
                >
                  <Shuffle className="w-4 h-4" />
                  Pick 1 Instant Winner
                </button>
              </div>
            </div>
          )}

          {/* ----------------- MODE F: DAILY OBJECT OF THE DAY ----------------- */}
          {activeMode === 'daily' && (
            <div className="max-w-xl mx-auto bg-gradient-to-br from-indigo-50 via-white to-slate-100 dark:from-indigo-950/60 dark:to-slate-900 border border-indigo-200 dark:border-indigo-500/40 rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 dark:border-indigo-500/30">
                <Calendar className="w-3.5 h-3.5" />
                Object of the Day ({getTodayDateString()})
              </div>

              <div className="space-y-2">
                <h3 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
                  {dailyObject.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">{dailyObject.shortDescription}</p>
                <div className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-400">
                  {dailyObject.category} • {dailyObject.difficulty}
                </div>
              </div>

              {dailyObject.funChallenge && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-left">
                  <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
                    Daily Worldwide Challenge:
                  </div>
                  <p className="text-slate-800 dark:text-slate-100 text-sm italic font-medium">
                    &ldquo;{dailyObject.funChallenge}&rdquo;
                  </p>
                </div>
              )}

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() =>
                    handleShare(
                      `Today's Object is "${dailyObject.name}"! Challenge: ${dailyObject.funChallenge}`,
                      dailyObject.category
                    )
                  }
                  className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md transition flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share Daily Object
                </button>
                <button
                  onClick={() => downloadObjectCard(dailyObject)}
                  className="p-3 rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700"
                  title="Download Daily Object Card"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* ----------------- MODE G: OBJECT STREAK GAME ----------------- */}
          {activeMode === 'streak' && streakGameTarget && (
            <div className="max-w-xl mx-auto bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 text-center shadow-xl">
              {/* Streak Tracker Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-semibold">
                <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                  <Flame className="w-5 h-5 fill-amber-500" />
                  <span>Current Streak: {currentStreak}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span>Best Streak: {bestStreak}</span>
                </div>
              </div>

              {/* Game Question */}
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">
                  Guess the Category
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                  {streakGameTarget.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 italic max-w-md mx-auto">
                  &ldquo;{streakGameTarget.shortDescription}&rdquo;
                </p>
              </div>

              {/* Feedback Alert */}
              {streakFeedback === 'correct' && (
                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 text-sm font-bold animate-bounce">
                  ✨ Correct! Streak +1!
                </div>
              )}
              {streakFeedback === 'wrong' && (
                <div className="p-3 rounded-xl bg-rose-500/20 text-rose-800 dark:text-rose-300 border border-rose-500/30 text-sm font-bold">
                  ❌ Incorrect! The correct category was: {streakGameTarget.category}. Streak reset.
                </div>
              )}

              {/* 4 Category Choices */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {streakGameOptions.map((opt) => (
                  <button
                    key={opt}
                    disabled={streakFeedback !== null}
                    onClick={() => handleStreakAnswer(opt)}
                    className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 hover:bg-indigo-500/10 dark:hover:bg-indigo-600/30 border border-slate-300 dark:border-slate-700/80 hover:border-indigo-500 text-slate-900 dark:text-white font-bold text-sm transition transform active:scale-95 text-center"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
