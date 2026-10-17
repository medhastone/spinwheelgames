'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import confetti from '@/lib/confetti';
import {
  Sparkles,
  Flame,
  Shield,
  RotateCw,
  Shuffle,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Share2,
  Copy,
  Check,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Trash2,
  Clock,
  Heart,
  Skull,
  Award,
  Zap,
  Info,
  X,
  User,
  Users
} from 'lucide-react';
import {
  PromptType,
  AudienceMode,
  DifficultyLevel,
  GameMode,
  TruthOrDarePrompt,
  ForfeitPenalty,
  GameTurnRecord
} from '@/lib/truthOrDare/types';
import {
  TRUTH_OR_DARE_DATABASE,
  FORFEIT_PENALTIES,
  TRUTH_COLOR,
  DARE_COLOR
} from '@/lib/truthOrDare/truthOrDareDatabase';
import {
  playTickSound,
  playWinnerFanfare,
  playClickSound,
  unlockAudioContext
} from '@/lib/sound';
import { useSavedWheels, toggleWheelFavorite } from '@/lib/storage';

// CSPRNG fair randomness
function getRandomInt(max: number): number {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % max;
  }
  return Math.floor(Math.random() * max);
}

// Stage 1 Fate Wheel Sectors
const FATE_SECTORS: { type: PromptType; label: string; color: string }[] = [
  { type: 'truth', label: 'TRUTH', color: TRUTH_COLOR },
  { type: 'dare', label: 'DARE', color: DARE_COLOR },
  { type: 'truth', label: 'TRUTH', color: '#0284c7' }, // Deep cyan
  { type: 'dare', label: 'DARE', color: '#e11d48' }, // Deep rose
  { type: 'truth', label: 'TRUTH', color: TRUTH_COLOR },
  { type: 'dare', label: 'DARE', color: DARE_COLOR },
  { type: 'truth', label: 'TRUTH', color: '#0284c7' },
  { type: 'dare', label: 'DARE', color: '#e11d48' }
];

export default function TruthOrDareWheelEngine() {
  // Game Configuration State
  const [gameMode, setGameMode] = useState<GameMode>('two-stage');
  const [audience, setAudience] = useState<AudienceMode>('friends');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('all');
  const [noRepeat, setNoRepeat] = useState<boolean>(true);
  const [customPrompts, setCustomPrompts] = useState<TruthOrDarePrompt[]>([]);
  const [usedPromptIds, setUsedPromptIds] = useState<string[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Two-Stage Tracking
  const [currentStage, setCurrentStage] = useState<'fate' | 'prompt'>('fate');
  const [stage1Fate, setStage1Fate] = useState<PromptType | null>(null);

  // Spin Animation State
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [spinPhase, setSpinPhase] = useState<string>('idle'); // 'idle' | 'spinning-fate' | 'fate-selected' | 'spinning-prompt'
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const currentAngleRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  // Result Card Modal
  const [activeWinnerPrompt, setActiveWinnerPrompt] = useState<TruthOrDarePrompt | null>(null);
  const [showResultModal, setShowResultModal] = useState<boolean>(false);

  // Interactive Countdown Timer State
  const [timerSeconds, setTimerSeconds] = useState<number>(45);
  const [initialTimer, setInitialTimer] = useState<number>(45);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Forfeit Punishment Drawer
  const [activeForfeit, setActiveForfeit] = useState<ForfeitPenalty | null>(null);
  const [showForfeitModal, setShowForfeitModal] = useState<boolean>(false);

  // Turn History & Scores
  const [turnHistory, setTurnHistory] = useState<GameTurnRecord[]>([]);
  const [passTokens, setPassTokens] = useState<number>(3);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);

  // Custom Prompt Add Modal
  const [showAddPromptModal, setShowAddPromptModal] = useState<boolean>(false);
  const [customText, setCustomText] = useState<string>('');
  const [customType, setCustomType] = useState<PromptType>('truth');
  const [customDifficulty, setCustomDifficulty] = useState<'mild' | 'medium' | 'extreme'>('medium');

  // Clipboard & Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);

  // Favorites Hook
  const savedWheels = useSavedWheels();
  const isGameFavorited = savedWheels.some(
    (w) => w.id === 'truth-or-dare-wheel' || w.title.trim().toLowerCase() === 'truth or dare wheel'
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleFavoriteGame = () => {
    const isNowSaved = toggleWheelFavorite({
      id: 'truth-or-dare-wheel',
      title: 'Truth or Dare Wheel',
      category: 'Party & Social Games',
      path: '/truth-or-dare-wheel',
      entryCount: 160
    });
    showToast(isNowSaved ? 'Saved to your favorite party games!' : 'Removed from favorites');
  };

  // External Preset Launcher Listener
  useEffect(() => {
    const handleLaunchPreset = (e: CustomEvent<{ gameMode?: GameMode; audience?: AudienceMode; difficulty?: DifficultyLevel }>) => {
      if (e.detail) {
        if (e.detail.gameMode) setGameMode(e.detail.gameMode);
        if (e.detail.audience) setAudience(e.detail.audience);
        if (e.detail.difficulty) setDifficulty(e.detail.difficulty);
        if (e.detail.gameMode === 'two-stage') {
          setCurrentStage('fate');
          setStage1Fate(null);
        } else {
          setCurrentStage('prompt');
        }
        showToast('Party configuration loaded!');
      }
    };
    window.addEventListener('launch-truth-dare-preset' as any, handleLaunchPreset as any);
    return () => {
      window.removeEventListener('launch-truth-dare-preset' as any, handleLaunchPreset as any);
    };
  }, []);

  // Filter Active Prompts
  const eligiblePrompts = useMemo(() => {
    const allPrompts = [...TRUTH_OR_DARE_DATABASE, ...customPrompts];

    return allPrompts.filter((p) => {
      // Filter by Audience
      if (p.audience !== audience) return false;

      // Filter by Difficulty
      if (difficulty !== 'all' && p.difficulty !== difficulty) return false;

      // Filter by Game Mode / Stage
      if (gameMode === 'truth-only' && p.type !== 'truth') return false;
      if (gameMode === 'dare-only' && p.type !== 'dare') return false;

      // In Two-Stage prompt stage, filter by the fate chosen
      if (gameMode === 'two-stage' && currentStage === 'prompt' && stage1Fate) {
        if (p.type !== stage1Fate) return false;
      }

      // Filter by No-Repeat
      if (noRepeat && usedPromptIds.includes(p.id)) return false;

      return true;
    });
  }, [audience, difficulty, gameMode, currentStage, stage1Fate, noRepeat, usedPromptIds, customPrompts]);

  // Current Wheel Slices
  const currentWheelSlices = useMemo(() => {
    if (gameMode === 'two-stage' && currentStage === 'fate') {
      return FATE_SECTORS.map((s, idx) => ({
        id: `fate-${idx}`,
        label: s.label,
        type: s.type,
        color: s.color,
        isFate: true
      }));
    }

    // Stage 2 or Direct Mode Wheel
    const items = eligiblePrompts.slice(0, 12);
    if (items.length === 0) {
      return [];
    }

    return items.map((p, idx) => {
      const isTruth = p.type === 'truth';
      const baseColor = isTruth
        ? idx % 2 === 0 ? TRUTH_COLOR : '#0284c7'
        : idx % 2 === 0 ? DARE_COLOR : '#f97316';

      return {
        id: p.id,
        label: `${p.type.toUpperCase()}: ${p.text}`,
        shortText: p.text,
        type: p.type,
        color: baseColor,
        prompt: p,
        isFate: false
      };
    });
  }, [gameMode, currentStage, eligiblePrompts]);

  // Canvas Drawing
  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    const radius = center - 20;

    ctx.clearRect(0, 0, size, size);

    const slices = currentWheelSlices;
    if (slices.length === 0) {
      ctx.save();
      ctx.translate(center, center);
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#1e1e2d';
      ctx.fill();
      ctx.strokeStyle = '#3b3b54';
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 18px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('All challenges completed!', 0, -12);
      ctx.font = '14px system-ui, sans-serif';
      ctx.fillText('Click "Reset Pool" to play again', 0, 16);
      ctx.restore();
      return;
    }

    const arc = (2 * Math.PI) / slices.length;

    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(currentAngleRef.current);

    // Draw Slices
    slices.forEach((slice, i) => {
      const angle = i * arc;
      ctx.beginPath();
      ctx.fillStyle = slice.color;
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, angle, angle + arc);
      ctx.closePath();
      ctx.fill();

      // Border between slices
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Text inside slice
      ctx.save();
      ctx.rotate(angle + arc / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
      ctx.shadowBlur = 4;

      if (slice.isFate) {
        ctx.font = 'bold 22px system-ui, sans-serif';
        ctx.fillText(slice.label, radius - 35, 8);
      } else {
        const fontSize = slices.length > 8 ? 12 : 14;
        ctx.font = `bold ${fontSize}px system-ui, sans-serif`;
        const textToDisplay = slice.prompt
          ? `[${slice.type.toUpperCase()}] ${slice.prompt.category || slice.prompt.text}`
          : slice.label;
        const truncated = textToDisplay.length > 20 ? `${textToDisplay.slice(0, 19)}…` : textToDisplay;
        ctx.fillText(truncated, radius - 24, fontSize / 3);
      }

      ctx.restore();
    });

    // Outer glow border
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 6;
    ctx.stroke();

    ctx.restore();

    // Center Hub
    ctx.save();
    ctx.beginPath();
    ctx.arc(center, center, 42, 0, 2 * Math.PI);
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Inner icon or pulse
    ctx.beginPath();
    ctx.arc(center, center, 30, 0, 2 * Math.PI);
    ctx.fillStyle =
      currentStage === 'fate'
        ? '#6366f1'
        : stage1Fate === 'truth'
        ? TRUTH_COLOR
        : DARE_COLOR;
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      currentStage === 'fate' ? 'FATE' : stage1Fate ? stage1Fate.toUpperCase() : 'SPIN',
      center,
      center
    );
    ctx.restore();
  }, [currentWheelSlices, currentStage, stage1Fate]);

  // Keep Canvas in Sync with State Changes
  useEffect(() => {
    drawWheel();
  }, [drawWheel]);

  // Execute Spin Function
  const spinWheel = useCallback(() => {
    if (isSpinning) return;
    if (currentWheelSlices.length === 0) {
      showToast('No prompts left! Click "Reset Pool" below.');
      return;
    }

    unlockAudioContext();
    setIsSpinning(true);

    const slices = currentWheelSlices;
    const numSlices = slices.length;
    const arc = (2 * Math.PI) / numSlices;

    // Pick winning index using CSPRNG
    const winnerIdx = getRandomInt(numSlices);

    // Calculate destination angle
    // In our canvas drawing, the needle is at 0 rad (right, or 3 o'clock).
    // Let's align top pointer: top is 270 deg or -Math.PI / 2
    // Angle math: when slice i is at the top pointer (-PI/2),
    // angle + currentAngle = -PI/2 - (i + 0.5)*arc
    const topOffset = -Math.PI / 2;
    const sliceCenterOffset = (winnerIdx + 0.5) * arc;
    const baseTargetAngle = topOffset - sliceCenterOffset;

    // Add 5 to 7 full rotations
    const fullSpins = (5 + getRandomInt(3)) * 2 * Math.PI;
    const startAngle = currentAngleRef.current;
    const targetAngle = startAngle + fullSpins + ((baseTargetAngle - (startAngle % (2 * Math.PI)) + 4 * Math.PI) % (2 * Math.PI));

    const duration = 3800; // 3.8s spin
    const startTime = performance.now();
    let lastSectorIndex = -1;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth Quintic Out Easing
      const easeOut = 1 - Math.pow(1 - progress, 4.5);
      const newAngle = startAngle + (targetAngle - startAngle) * easeOut;
      currentAngleRef.current = newAngle;

      // Audio tick on sector boundary cross
      const normalizedAngle = ((-newAngle + topOffset) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
      const currentSector = Math.floor(normalizedAngle / arc) % numSlices;
      if (currentSector !== lastSectorIndex) {
        if (soundEnabled) playTickSound();
        lastSectorIndex = currentSector;
      }

      drawWheel();

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Spin Finished
        setIsSpinning(false);
        const winningSlice = slices[winnerIdx];

        if (gameMode === 'two-stage' && currentStage === 'fate') {
          // Stage 1 Concluded: Chosen Fate
          const chosenFate = winningSlice.type as PromptType;
          setStage1Fate(chosenFate);
          setSpinPhase('fate-selected');
          if (soundEnabled) playWinnerFanfare();

          showToast(`Fate chosen: ${chosenFate.toUpperCase()}! Moving to prompt wheel...`);

          // Automatically transition to Stage 2 after 1.4 seconds
          setTimeout(() => {
            setCurrentStage('prompt');
            setSpinPhase('idle');
          }, 1400);
        } else {
          // Prompt Stage Concluded
          if (soundEnabled) playWinnerFanfare();
          confetti({
            particleCount: 75,
            spread: 70,
            origin: { y: 0.6 }
          });

          const winnerPrompt: TruthOrDarePrompt = winningSlice.prompt || {
            id: `temp-${Date.now()}`,
            type: winningSlice.type,
            text: winningSlice.label,
            audience,
            difficulty: 'medium'
          };

          setActiveWinnerPrompt(winnerPrompt);
          setInitialTimer(winnerPrompt.suggestedTimerSeconds || 45);
          setTimerSeconds(winnerPrompt.suggestedTimerSeconds || 45);
          setIsTimerRunning(false);
          setShowResultModal(true);

          if (noRepeat) {
            setUsedPromptIds((prev) => [...prev, winnerPrompt.id]);
          }
        }
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [
    isSpinning,
    currentWheelSlices,
    soundEnabled,
    gameMode,
    currentStage,
    audience,
    noRepeat,
    drawWheel
  ]);

  // Clean animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Quick Draw / Fast Generator (Instant Mode)
  const quickDrawPrompt = () => {
    if (eligiblePrompts.length === 0) {
      showToast('No eligible prompts remaining. Reset pool to play!');
      return;
    }
    const idx = getRandomInt(eligiblePrompts.length);
    const chosen = eligiblePrompts[idx];

    unlockAudioContext();
    if (soundEnabled) playWinnerFanfare();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    setActiveWinnerPrompt(chosen);
    setInitialTimer(chosen.suggestedTimerSeconds || 45);
    setTimerSeconds(chosen.suggestedTimerSeconds || 45);
    setIsTimerRunning(false);
    setShowResultModal(true);

    if (noRepeat) {
      setUsedPromptIds((prev) => [...prev, chosen.id]);
    }
  };

  // Timer Tick Engine
  useEffect(() => {
    if (isTimerRunning && timerSeconds > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current!);
            setIsTimerRunning(false);
            if (soundEnabled) playWinnerFanfare();
            showToast('Time is up!');
            return 0;
          }
          if (prev <= 6 && soundEnabled) {
            playTickSound();
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isTimerRunning, timerSeconds, soundEnabled]);

  // Reset Timer
  const handleResetTimer = (seconds?: number) => {
    const s = seconds || initialTimer;
    setTimerSeconds(s);
    setIsTimerRunning(false);
  };

  // Complete Challenge (Done)
  const handleCompleteChallenge = () => {
    if (!activeWinnerPrompt) return;
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 }
    });

    const newRecord: GameTurnRecord = {
      id: `turn-${Date.now()}`,
      prompt: activeWinnerPrompt,
      stage1Choice: stage1Fate || undefined,
      status: 'completed',
      timestamp: Date.now()
    };

    setTurnHistory((prev) => [newRecord, ...prev]);
    setShowResultModal(false);

    // If two-stage, reset back to stage 1 fate for the next player
    if (gameMode === 'two-stage') {
      setCurrentStage('fate');
      setStage1Fate(null);
    }

    showToast('Challenge completed! +1 Point');
  };

  // Pass Challenge
  const handlePassChallenge = () => {
    if (!activeWinnerPrompt) return;

    const newRecord: GameTurnRecord = {
      id: `turn-${Date.now()}`,
      prompt: activeWinnerPrompt,
      stage1Choice: stage1Fate || undefined,
      status: 'passed',
      timestamp: Date.now()
    };

    setTurnHistory((prev) => [newRecord, ...prev]);
    setPassTokens((prev) => Math.max(0, prev - 1));
    setShowResultModal(false);

    if (gameMode === 'two-stage') {
      setCurrentStage('fate');
      setStage1Fate(null);
    }

    showToast('Passed! 1 Pass Token used.');
  };

  // Trigger Forfeit Penalty
  const handleForfeitChallenge = () => {
    if (!activeWinnerPrompt) return;
    const forfeitIdx = getRandomInt(FORFEIT_PENALTIES.length);
    const chosenPenalty = FORFEIT_PENALTIES[forfeitIdx];

    const newRecord: GameTurnRecord = {
      id: `turn-${Date.now()}`,
      prompt: activeWinnerPrompt,
      stage1Choice: stage1Fate || undefined,
      status: 'forfeited',
      forfeitPenalty: chosenPenalty.text,
      timestamp: Date.now()
    };

    setTurnHistory((prev) => [newRecord, ...prev]);
    setActiveForfeit(chosenPenalty);
    setShowResultModal(false);
    setShowForfeitModal(true);

    if (gameMode === 'two-stage') {
      setCurrentStage('fate');
      setStage1Fate(null);
    }
  };

  // Share Formatted Result
  const handleShareResult = async () => {
    if (!activeWinnerPrompt) return;
    const shareText = `🔥 [${activeWinnerPrompt.type.toUpperCase()}] ${activeWinnerPrompt.text}\n\nPlayed on Truth or Dare Wheel Generator: https://spinwheelgames.org/truth-or-dare-wheel`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `Truth or Dare: ${activeWinnerPrompt.type.toUpperCase()}`,
          text: shareText,
          url: 'https://spinwheelgames.org/truth-or-dare-wheel'
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareText);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
      showToast('Copied challenge to clipboard!');
    }
  };

  // Add Custom Prompt
  const handleAddCustomPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customText.trim()) return;

    const newPrompt: TruthOrDarePrompt = {
      id: `custom-${Date.now()}`,
      type: customType,
      text: customText.trim(),
      audience,
      difficulty: customDifficulty,
      isCustom: true,
      suggestedTimerSeconds: 60
    };

    setCustomPrompts((prev) => [newPrompt, ...prev]);
    setCustomText('');
    setShowAddPromptModal(false);
    showToast(`Added custom ${customType.toUpperCase()}!`);
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Calculate Turn Statistics
  const completedCount = turnHistory.filter((t) => t.status === 'completed').length;
  const passedCount = turnHistory.filter((t) => t.status === 'passed').length;
  const forfeitedCount = turnHistory.filter((t) => t.status === 'forfeited').length;

  return (
    <div
      ref={containerRef}
      id="truth-dare-wheel-section"
      className={`relative w-full rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-2xl overflow-hidden transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none bg-slate-950 p-4 sm:p-6 flex flex-col justify-center' : 'p-3.5 sm:p-5 lg:p-6'
      }`}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-indigo-600/90 text-white font-medium text-sm shadow-lg backdrop-blur-md animate-fade-in flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP HEADER CONTROLS */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/20 text-rose-400 border border-rose-500/30">
              Interactive Party Suite
            </span>
            <span className="text-xs text-slate-400">
              {eligiblePrompts.length} Prompts in Pool
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1">
            Truth or Dare Wheel & Generator
          </h2>
        </div>

        {/* Engine Utility Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-slate-800 text-indigo-400 hover:bg-slate-700'
                : 'bg-slate-800/60 text-slate-500 hover:bg-slate-700'
            }`}
            title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={handleFavoriteGame}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              isGameFavorited
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
            title="Save to favorites"
          >
            <Heart className={`w-4 h-4 ${isGameFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>

          <button
            onClick={() => setShowHistoryModal(true)}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            title="View Turn History & Scores"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Score ({completedCount})</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Theater Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* MODE SWITCHER TABS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Game Mode (Two-stage vs Truth vs Dare vs Mixed) */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Game Mode
          </label>
          <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-slate-950/60 border border-slate-800">
            <button
              onClick={() => {
                setGameMode('two-stage');
                setCurrentStage('fate');
                setStage1Fate(null);
              }}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                gameMode === 'two-stage'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Two-Stage Spin
            </button>
            <button
              onClick={() => {
                setGameMode('truth-only');
                setCurrentStage('prompt');
              }}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                gameMode === 'truth-only'
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Truth Only
            </button>
            <button
              onClick={() => {
                setGameMode('dare-only');
                setCurrentStage('prompt');
              }}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                gameMode === 'dare-only'
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Dare Only
            </button>
            <button
              onClick={() => {
                setGameMode('mixed');
                setCurrentStage('prompt');
              }}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                gameMode === 'mixed'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Mixed Wheel
            </button>
          </div>
        </div>

        {/* Audience / Vibe Selector */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Audience Preset
          </label>
          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-950/60 border border-slate-800">
            <button
              onClick={() => setAudience('clean')}
              className={`px-2 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                audience === 'clean'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Family
            </button>
            <button
              onClick={() => setAudience('friends')}
              className={`px-2 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                audience === 'friends'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Friends
            </button>
            <button
              onClick={() => setAudience('party')}
              className={`px-2 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                audience === 'party'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Party
            </button>
          </div>
        </div>

        {/* Difficulty Level Pills */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Difficulty Rating
          </label>
          <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-slate-950/60 border border-slate-800">
            <button
              onClick={() => setDifficulty('all')}
              className={`px-1.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                difficulty === 'all'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setDifficulty('mild')}
              className={`px-1.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                difficulty === 'mild'
                  ? 'bg-teal-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Mild
            </button>
            <button
              onClick={() => setDifficulty('medium')}
              className={`px-1.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                difficulty === 'medium'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => setDifficulty('extreme')}
              className={`px-1.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                difficulty === 'extreme'
                  ? 'bg-red-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Extreme
            </button>
          </div>
        </div>
      </div>

      {/* TWO-STAGE STEP INDICATOR (When in two-stage mode) */}
      {gameMode === 'two-stage' && (
        <div className="mb-4 p-3 rounded-xl bg-slate-950/40 border border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold ${
                currentStage === 'fate'
                  ? 'bg-indigo-500 text-white shadow-sm ring-2 ring-indigo-400/30'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              <span>Stage 1: Fate (Truth vs Dare)</span>
            </div>
            <span className="text-slate-600">→</span>
            <div
              className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold ${
                currentStage === 'prompt'
                  ? stage1Fate === 'truth'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm ring-2 ring-cyan-400/30'
                    : 'bg-rose-500 text-white shadow-sm ring-2 ring-rose-400/30'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              <span>
                Stage 2: {stage1Fate ? `${stage1Fate.toUpperCase()} Prompt` : 'Challenge Prompt'}
              </span>
            </div>
          </div>

          {currentStage === 'prompt' && (
            <button
              onClick={() => {
                setCurrentStage('fate');
                setStage1Fate(null);
              }}
              className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Back to Fate Wheel</span>
            </button>
          )}
        </div>
      )}

      {/* MAIN INTERACTIVE WHEEL AREA */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 my-4">
        {/* WHEEL CANVAS CONTAINER */}
        <div className="relative flex flex-col items-center">
          {/* Top Pointer Indicator */}
          <div className="absolute -top-3 z-20 pointer-events-none drop-shadow-md">
            <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[28px] border-t-amber-400 filter drop-shadow(0 2px 4px rgba(0,0,0,0.5))" />
          </div>

          {/* HTML5 Canvas */}
          <canvas
            ref={canvasRef}
            width={540}
            height={540}
            onClick={spinWheel}
            className={`w-[260px] h-[260px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] max-w-[min(88vw,420px)] aspect-square rounded-full shadow-2xl transition-transform duration-200 cursor-pointer ${
              isSpinning ? 'pointer-events-none cursor-default' : 'hover:scale-[1.01]'
            }`}
          />

          {/* Wheel Status Indicator */}
          <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-400">
            {isSpinning ? (
              <span className="flex items-center gap-2 text-amber-400 font-bold animate-pulse">
                <RotateCw className="w-4 h-4 animate-spin" />
                {currentStage === 'fate' ? 'Spinning Fate Wheel...' : 'Spinning Challenge...'}
              </span>
            ) : (
              <span>Click the wheel or press the button below to spin</span>
            )}
          </div>
        </div>

        {/* CONTROLS & PARTY ACTIONS PANEL */}
        <div className="w-full lg:w-80 flex flex-col gap-4">
          {/* Main Primary Spin Button */}
          <button
            onClick={spinWheel}
            disabled={isSpinning || currentWheelSlices.length === 0}
            className={`w-full py-4 px-6 rounded-2xl font-black text-lg sm:text-xl shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer ${
              isSpinning
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                : currentStage === 'fate'
                ? 'bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:from-indigo-400 hover:to-pink-400 text-white hover:shadow-indigo-500/25 hover:scale-[1.02]'
                : stage1Fate === 'truth'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black hover:scale-[1.02]'
                : 'bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white hover:scale-[1.02]'
            }`}
          >
            <RotateCw className={`w-6 h-6 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>
              {isSpinning
                ? 'SPINNING...'
                : currentStage === 'fate'
                ? 'SPIN FATE WHEEL'
                : `SPIN ${stage1Fate ? stage1Fate.toUpperCase() : 'CHALLENGE'}`}
            </span>
          </button>

          {/* Quick Draw Instant Generator Button */}
          <button
            onClick={quickDrawPrompt}
            disabled={isSpinning || eligiblePrompts.length === 0}
            className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 hover:border-slate-600 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Quick Draw (Instant Mode)</span>
          </button>

          {/* Session Features Card */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col gap-3">
            {/* No-Repeat Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">No-Repeat Guarantee</span>
                <span className="text-[11px] text-slate-400">
                  {usedPromptIds.length} played · {eligiblePrompts.length} remaining
                </span>
              </div>
              <button
                onClick={() => setNoRepeat(!noRepeat)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                  noRepeat ? 'bg-indigo-600' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    noRepeat ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Reset Used Pool */}
            {usedPromptIds.length > 0 && (
              <button
                onClick={() => {
                  setUsedPromptIds([]);
                  showToast('Prompt history reset! All challenges restored.');
                }}
                className="w-full py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-indigo-400" />
                <span>Reset Played History ({usedPromptIds.length})</span>
              </button>
            )}

            {/* Custom Prompt Trigger */}
            <button
              onClick={() => setShowAddPromptModal(true)}
              className="w-full py-2 px-3 rounded-lg bg-indigo-950/50 hover:bg-indigo-900/50 text-indigo-300 border border-indigo-800/40 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom Truth or Dare</span>
            </button>
          </div>

          {/* Scoreboard Summary Card */}
          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Game Night Scoreboard
            </span>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-lg font-black text-emerald-400 block">{completedCount}</span>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Done</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-lg font-black text-amber-400 block">{passedCount}</span>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Passed</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-lg font-black text-rose-400 block">{forfeitedCount}</span>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Forfeit</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* INTERACTIVE CHALLENGE RESULT MODAL (with Countdown Timer, Done, Pass, Forfeit) */}
      {showResultModal && activeWinnerPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div
            className={`relative w-full max-w-lg rounded-3xl p-6 sm:p-8 border shadow-2xl overflow-hidden transition-all text-white ${
              activeWinnerPrompt.type === 'truth'
                ? 'bg-slate-900 border-cyan-500/50 shadow-cyan-500/20'
                : 'bg-slate-900 border-rose-500/50 shadow-rose-500/20'
            }`}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowResultModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Type Header Badge */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                    activeWinnerPrompt.type === 'truth'
                      ? 'bg-cyan-500 text-slate-950 shadow-md'
                      : 'bg-rose-500 text-white shadow-md'
                  }`}
                >
                  {activeWinnerPrompt.type.toUpperCase()}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300">
                  {activeWinnerPrompt.audience.toUpperCase()}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    activeWinnerPrompt.difficulty === 'extreme'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : activeWinnerPrompt.difficulty === 'medium'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}
                >
                  {activeWinnerPrompt.difficulty.toUpperCase()}
                </span>
              </div>

              {activeWinnerPrompt.category && (
                <span className="text-xs text-slate-400 font-medium">
                  {activeWinnerPrompt.category}
                </span>
              )}
            </div>

            {/* Prompt Challenge Body */}
            <div className="my-6">
              <p className="text-xl sm:text-2xl font-extrabold text-white leading-snug tracking-tight">
                “{activeWinnerPrompt.text}”
              </p>
            </div>

            {/* COUNTDOWN TIMER INTERFACE */}
            <div className="my-6 p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={`relative flex items-center justify-center w-14 h-14 rounded-full font-black text-xl border-2 ${
                    timerSeconds <= 5
                      ? 'border-red-500 text-red-400 bg-red-950/40 animate-pulse'
                      : 'border-indigo-500 text-indigo-300 bg-indigo-950/30'
                  }`}
                >
                  {timerSeconds}s
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-300 block">Challenge Timer</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <button
                      onClick={() => handleResetTimer(30)}
                      className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                    >
                      30s
                    </button>
                    <button
                      onClick={() => handleResetTimer(45)}
                      className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                    >
                      45s
                    </button>
                    <button
                      onClick={() => handleResetTimer(60)}
                      className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                    >
                      60s
                    </button>
                    <button
                      onClick={() => handleResetTimer(90)}
                      className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                    >
                      90s
                    </button>
                  </div>
                </div>
              </div>

              {/* Timer Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`p-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isTimerRunning
                      ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                      : 'bg-indigo-600 text-white hover:bg-indigo-500'
                  }`}
                >
                  {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isTimerRunning ? 'Pause' : 'Start'}</span>
                </button>
                <button
                  onClick={() => handleResetTimer()}
                  className="p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ACTION BUTTONS: DONE, PASS, FORFEIT */}
            <div className="grid grid-cols-3 gap-2.5 mt-6">
              <button
                onClick={handleCompleteChallenge}
                className="py-3 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm flex flex-col sm:flex-row items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20 cursor-pointer transition-all hover:scale-[1.02]"
              >
                <Check className="w-4 h-4" />
                <span>Done (+1)</span>
              </button>

              <button
                onClick={handlePassChallenge}
                className="py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm flex flex-col sm:flex-row items-center justify-center gap-1.5 border border-slate-700 cursor-pointer transition-all"
              >
                <Shield className="w-4 h-4 text-amber-400" />
                <span>Pass ({passTokens})</span>
              </button>

              <button
                onClick={handleForfeitChallenge}
                className="py-3 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-sm flex flex-col sm:flex-row items-center justify-center gap-1.5 shadow-lg shadow-rose-600/20 cursor-pointer transition-all hover:scale-[1.02]"
              >
                <Skull className="w-4 h-4" />
                <span>Forfeit!</span>
              </button>
            </div>

            {/* Social Share Bar */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Share this card:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShareResult}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedShare ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedShare ? 'Copied!' : 'Copy Text'}</span>
                </button>
                <button
                  onClick={handleShareResult}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FORFEIT PENALTY MODAL */}
      {showForfeitModal && activeForfeit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl p-6 sm:p-8 bg-slate-900 border border-rose-500/50 shadow-2xl shadow-rose-500/20 text-white text-center">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center mb-4">
              <Skull className="w-8 h-8 text-rose-400" />
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-500 text-white">
              Forfeit Penalty Drawn
            </span>

            <h3 className="text-xl font-black text-white mt-3 mb-1">You Chickened Out!</h3>
            <p className="text-xs text-slate-400 mb-6">Complete this punishment to stay in the game:</p>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 my-4 text-left">
              <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider block mb-1">
                {activeForfeit.category} Penalty
              </span>
              <p className="text-lg font-bold text-white leading-relaxed">
                “{activeForfeit.text}”
              </p>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => {
                  const newIdx = getRandomInt(FORFEIT_PENALTIES.length);
                  setActiveForfeit(FORFEIT_PENALTIES[newIdx]);
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Shuffle className="w-4 h-4" />
                <span>Draw Another Penalty</span>
              </button>
              <button
                onClick={() => setShowForfeitModal(false)}
                className="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-rose-600/20 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Penalty Accepted</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TURN HISTORY & SCORE MODAL */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 bg-slate-900 border border-slate-800 text-white shadow-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">Party Session Log & Scores</h3>
              </div>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 my-4">
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-center">
                <span className="text-2xl font-black text-emerald-400 block">{completedCount}</span>
                <span className="text-xs text-slate-300 font-medium">Completed</span>
              </div>
              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/40 text-center">
                <span className="text-2xl font-black text-amber-400 block">{passedCount}</span>
                <span className="text-xs text-slate-300 font-medium">Passed</span>
              </div>
              <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-800/40 text-center">
                <span className="text-2xl font-black text-rose-400 block">{forfeitedCount}</span>
                <span className="text-xs text-slate-300 font-medium">Forfeits</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 my-2">
              {turnHistory.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-sm">
                  No turns taken yet. Spin the wheel to begin logging challenges!
                </div>
              ) : (
                turnHistory.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex flex-col gap-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-black uppercase tracking-wider ${
                          rec.prompt.type === 'truth' ? 'text-cyan-400' : 'text-rose-400'
                        }`}
                      >
                        {rec.prompt.type.toUpperCase()}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded font-bold ${
                          rec.status === 'completed'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : rec.status === 'passed'
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-rose-500/20 text-rose-400'
                        }`}
                      >
                        {rec.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-slate-300 font-medium line-clamp-2">“{rec.prompt.text}”</p>
                    {rec.forfeitPenalty && (
                      <p className="text-[11px] text-rose-300">Penalty: {rec.forfeitPenalty}</p>
                    )}
                  </div>
                ))
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => {
                  setTurnHistory([]);
                  showToast('Score log cleared');
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-semibold cursor-pointer"
              >
                Clear Log
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD CUSTOM PROMPT MODAL */}
      {showAddPromptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl p-6 sm:p-8 bg-slate-900 border border-slate-800 text-white shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-indigo-400" />
                <span>Add Custom Prompt</span>
              </h3>
              <button
                onClick={() => setShowAddPromptModal(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCustomPrompt} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCustomType('truth')}
                    className={`py-2 rounded-xl text-xs font-black uppercase transition-all cursor-pointer ${
                      customType === 'truth'
                        ? 'bg-cyan-500 text-slate-950 font-black'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Truth
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomType('dare')}
                    className={`py-2 rounded-xl text-xs font-black uppercase transition-all cursor-pointer ${
                      customType === 'dare'
                        ? 'bg-rose-500 text-white font-black'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Dare
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Difficulty Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setCustomDifficulty('mild')}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      customDifficulty === 'mild' ? 'bg-teal-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Mild
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomDifficulty('medium')}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      customDifficulty === 'medium' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Medium
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomDifficulty('extreme')}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      customDifficulty === 'extreme' ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Extreme
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Challenge Prompt Text
                </label>
                <textarea
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="e.g. Speak like an alien until your next turn..."
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-500 placeholder-slate-600"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddPromptModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md"
                >
                  Add to Wheel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
