'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import confetti from '@/lib/confetti';
import {
  Volume2,
  VolumeX,
  Volume1,
  RotateCw,
  RotateCcw,
  Sparkles,
  Shuffle,
  Copy,
  Check,
  Share2,
  Maximize2,
  Minimize2,
  Plus,
  Trash2,
  ListPlus,
  X,
  BookOpen,
  GraduationCap,
  PenTool,
  Clock,
  ShieldCheck,
  Layers,
  Heart,
  HelpCircle,
  CheckCircle2,
  Sliders,
  Flame,
  ArrowRight
} from 'lucide-react';
import {
  WordCategory,
  WordItem,
  NOUNS_LIST,
  VERBS_LIST,
  ADJECTIVES_LIST,
  EASY_WORDS_LIST,
  ADVANCED_WORDS_LIST,
  ALL_WORDS_MASTER,
  CATEGORY_METADATA
} from '@/lib/words/wordData';
import {
  playTickSound,
  playWinnerFanfare,
  playClickSound,
  unlockAudioContext
} from '@/lib/sound';
import { toggleWheelFavorite } from '@/lib/storage';

export type ExperienceMode = 'standard' | 'multiple' | 'writing' | 'classroom';

const PALETTE = [
  '#3b82f6', // blue
  '#10b981', // emerald
  '#f59e0b', // amber
  '#ec4899', // pink
  '#8b5cf6', // violet
  '#06b6d4', // cyan
  '#f43f5e', // rose
  '#6366f1'  // indigo
];

function getSecureRandomInt(max: number): number {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0] % max;
  }
  return Math.floor(Math.random() * max);
}

export default function WordSpinnerEngine() {
  const [activeCategory, setActiveCategory] = useState<WordCategory>('all');
  const [experienceMode, setExperienceMode] = useState<ExperienceMode>('standard');
  const [multipleCount, setMultipleCount] = useState<number>(3);
  const [isNoRepeat, setIsNoRepeat] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Custom words storage
  const [customWords, setCustomWords] = useState<WordItem[]>(() => [
    { id: 'c-1', word: 'Aurora', partOfSpeech: 'noun', difficulty: 'medium', definition: 'A natural electrical phenomenon characterized by reddish or greenish light in the sky.', exampleSentence: 'The green aurora danced across the Arctic night.' },
    { id: 'c-2', word: 'Serenade', partOfSpeech: 'verb', difficulty: 'medium', definition: 'To entertain with or perform an acoustic song.', exampleSentence: 'He decided to serenade her under the balcony.' },
    { id: 'c-3', word: 'Gleaming', partOfSpeech: 'adjective', difficulty: 'easy', definition: 'Shining brightly, especially with reflected light.', exampleSentence: 'The gleaming silver watch caught the morning sun.' }
  ]);

  // Elimination IDs for No-Repeat
  const [eliminatedIds, setEliminatedIds] = useState<string[]>([]);

  // Wheel Animation & State
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [needleAngle, setNeedleAngle] = useState<number>(0);
  const [selectedWord, setSelectedWord] = useState<WordItem | null>(null);
  const [multipleDrawnWords, setMultipleDrawnWords] = useState<WordItem[]>([]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [copiedWord, setCopiedWord] = useState<boolean>(false);
  const [history, setHistory] = useState<Array<{ id: string; word: string; category: string; time: string }>>([]);

  // Custom list modal
  const [bulkModalOpen, setBulkModalOpen] = useState<boolean>(false);
  const [bulkInput, setBulkInput] = useState<string>('');

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentAngleRef = useRef<number>(0);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  }, []);

  // Hydrate custom words from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('word_spinner_custom_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCustomWords(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Compute Active Word Pool for Category
  const rawCategoryPool = useMemo(() => {
    switch (activeCategory) {
      case 'nouns': return NOUNS_LIST;
      case 'verbs': return VERBS_LIST;
      case 'adjectives': return ADJECTIVES_LIST;
      case 'easy': return EASY_WORDS_LIST;
      case 'advanced': return ADVANCED_WORDS_LIST;
      case 'custom': return customWords;
      case 'all':
      default:
        return ALL_WORDS_MASTER;
    }
  }, [activeCategory, customWords]);

  // Active pool filtered by No-Repeat
  const activePool = useMemo(() => {
    if (isNoRepeat && eliminatedIds.length > 0) {
      const nonEliminated = rawCategoryPool.filter((w) => !eliminatedIds.includes(w.id));
      return nonEliminated.length > 0 ? nonEliminated : rawCategoryPool;
    }
    return rawCategoryPool;
  }, [rawCategoryPool, eliminatedIds, isNoRepeat]);

  // Slices on Wheel: Display up to 16 items for high legibility
  const wheelSlices = useMemo(() => {
    if (activePool.length <= 16) return activePool;
    // Window of 16 for clean canvas drawing
    return activePool.slice(0, 16);
  }, [activePool]);

  // Canvas Wheel Drawing
  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 12;

    ctx.clearRect(0, 0, width, height);

    if (wheelSlices.length === 0) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#f8fafc';
      ctx.fill();
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = 'bold 16px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('All words eliminated!', centerX, centerY - 10);
      ctx.font = 'normal 13px system-ui, sans-serif';
      ctx.fillText('Click Reset to restore word pool', centerX, centerY + 14);
      ctx.restore();
      return;
    }

    const numSlices = wheelSlices.length;
    const sliceAngle = (2 * Math.PI) / numSlices;

    // Outer Shadow Glow
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 4, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(15, 23, 42, 0.08)';
    ctx.fill();
    ctx.restore();

    // Draw Slices
    wheelSlices.forEach((item, i) => {
      const startAngle = currentAngleRef.current + i * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      const color = PALETTE[i % PALETTE.length];
      ctx.fillStyle = color;
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Text inside slice
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = numSlices > 12 ? 'bold 11px system-ui, sans-serif' : 'bold 13px system-ui, sans-serif';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
      ctx.shadowBlur = 3;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;

      let displayText = item.word;
      if (displayText.length > 15) {
        displayText = displayText.substring(0, 13) + '…';
      }

      ctx.fillText(displayText, radius - 18, 4);
      ctx.restore();

      ctx.restore();
    });

    // Outer Rim Border
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.restore();

    // Center Spin Hub
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, 38, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 4;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
    ctx.fillStyle = CATEGORY_METADATA[activeCategory].color;
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SPIN', centerX, centerY - 1);
    ctx.font = 'normal 9px system-ui, sans-serif';
    ctx.fillText('📖', centerX, centerY + 13);
    ctx.restore();
  }, [wheelSlices, activeCategory]);

  useEffect(() => {
    drawWheel();
  }, [drawWheel]);

  // Physical Spin Animation
  const handleSpin = useCallback(() => {
    if (isSpinning || activePool.length === 0) return;

    if (soundEnabled) {
      unlockAudioContext();
      playClickSound();
    }

    setIsSpinning(true);
    setSelectedWord(null);

    const winningIndex = getSecureRandomInt(wheelSlices.length);
    const numSlices = wheelSlices.length;
    const sliceAngle = (2 * Math.PI) / numSlices;

    const extraRounds = 5 + Math.floor(Math.random() * 3);
    const topPointerOffset = -Math.PI / 2;

    const currentNormalized = currentAngleRef.current % (2 * Math.PI);
    const sliceCenterAngle = winningIndex * sliceAngle + sliceAngle / 2;
    const targetAngle = topPointerOffset - sliceCenterAngle + extraRounds * 2 * Math.PI;

    const startAngle = currentNormalized;
    const deltaAngle = targetAngle - startAngle;

    const duration = 3800;
    const startTime = performance.now();
    let lastSoundSlice = -1;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const newAngle = startAngle + deltaAngle * ease;
      currentAngleRef.current = newAngle;

      const currentSlice = Math.floor(
        ((newAngle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI)) / sliceAngle
      );

      if (currentSlice !== lastSoundSlice) {
        lastSoundSlice = currentSlice;
        if (soundEnabled) playTickSound();
        setNeedleAngle(18);
        setTimeout(() => setNeedleAngle(0), 55);
      }

      drawWheel();

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        const winner = wheelSlices[winningIndex];
        setSelectedWord(winner);

        // If multiple words mode, draw companion words
        if (experienceMode === 'multiple') {
          const companionCount = Math.min(multipleCount, activePool.length);
          const poolCopy = [...activePool];
          const drawnList: WordItem[] = [winner];
          const filteredPool = poolCopy.filter((w) => w.id !== winner.id);

          while (drawnList.length < companionCount && filteredPool.length > 0) {
            const rIdx = getSecureRandomInt(filteredPool.length);
            drawnList.push(filteredPool.splice(rIdx, 1)[0]);
          }
          setMultipleDrawnWords(drawnList);
        } else if (experienceMode === 'writing') {
          // In writing mode, pick 1 noun, 1 verb, 1 adjective if available
          const n = NOUNS_LIST[getSecureRandomInt(NOUNS_LIST.length)];
          const v = VERBS_LIST[getSecureRandomInt(VERBS_LIST.length)];
          const a = ADJECTIVES_LIST[getSecureRandomInt(ADJECTIVES_LIST.length)];
          setMultipleDrawnWords([n, v, a]);
        }

        if (soundEnabled) playWinnerFanfare();
        confetti();

        // Record History
        setHistory((prev) => [
          {
            id: `wh-${Date.now()}`,
            word: winner.word,
            category: activeCategory,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
          },
          ...prev.slice(0, 19)
        ]);

        if (isNoRepeat && winner) {
          setEliminatedIds((prev) => [...prev, winner.id]);
        }
      }
    };

    requestAnimationFrame(animate);
  }, [isSpinning, activePool, wheelSlices, soundEnabled, experienceMode, multipleCount, activeCategory, isNoRepeat, drawWheel]);

  // Initial spin on mount
  useEffect(() => {
    const winner = activePool[getSecureRandomInt(activePool.length)];
    setSelectedWord(winner);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keyboard shortcut Spacebar
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space') {
        e.preventDefault();
        handleSpin();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleSpin]);

  // Speak word aloud using Web Speech API TTS
  const speakWord = (wordText: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(wordText);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
      showToast(`Pronouncing: "${wordText}"`);
    } else {
      showToast('Text-to-speech is not supported in this browser');
    }
  };

  // Copy Word / Writing Prompt
  const handleCopyWord = () => {
    if (!selectedWord) return;
    let textToCopy = '';
    if (experienceMode === 'writing' && multipleDrawnWords.length >= 3) {
      textToCopy = `✍️ Writing Prompt Seed:\nWords: ${multipleDrawnWords.map((w) => w.word).join(', ')}\nChallenge: Write a 100-word micro-story incorporating all three words!\nWord Spinner: https://spinwheelgames.org/word-spinner`;
    } else if (experienceMode === 'multiple' && multipleDrawnWords.length > 0) {
      textToCopy = `📖 Random Words: ${multipleDrawnWords.map((w) => `${w.word} (${w.partOfSpeech})`).join(', ')}\nWord Spinner: https://spinwheelgames.org/word-spinner`;
    } else {
      textToCopy = `📖 Word: ${selectedWord.word} (${selectedWord.partOfSpeech})\nDefinition: ${selectedWord.definition}\nExample: "${selectedWord.exampleSentence}"\nWord Spinner: https://spinwheelgames.org/word-spinner`;
    }

    navigator.clipboard.writeText(textToCopy);
    setCopiedWord(true);
    setTimeout(() => setCopiedWord(false), 2000);
    showToast('Word copied to clipboard!');
  };

  // Share Word
  const handleShareWord = async () => {
    if (!selectedWord) return;
    const shareData = {
      title: `Word Spinner: ${selectedWord.word}`,
      text: `Word: ${selectedWord.word} (${selectedWord.partOfSpeech}) – "${selectedWord.definition}"`,
      url: 'https://spinwheelgames.org/word-spinner'
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        handleCopyWord();
      }
    } else {
      handleCopyWord();
    }
  };

  // Bulk Custom Word List Handler
  const handleApplyBulkWords = () => {
    const lines = bulkInput
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length === 0) {
      showToast('Please enter at least one word');
      return;
    }

    const newWords: WordItem[] = lines.map((wordStr, idx) => ({
      id: `custom-w-${Date.now()}-${idx}`,
      word: wordStr,
      partOfSpeech: 'other',
      difficulty: 'medium',
      definition: 'Custom vocabulary word.',
      exampleSentence: `Custom usage example for ${wordStr}.`
    }));

    setCustomWords(newWords);
    try {
      localStorage.setItem('word_spinner_custom_v1', JSON.stringify(newWords));
    } catch {
      // ignore
    }
    setActiveCategory('custom');
    setEliminatedIds([]);
    setBulkModalOpen(false);
    showToast(`Updated Custom List with ${newWords.length} words!`);
  };

  // Save to Favorites
  const handleFavoriteWheel = () => {
    const isNowSaved = toggleWheelFavorite({
      id: 'word-spinner',
      title: 'Word Spinner & Vocabulary Wheel',
      category: 'Education & Words',
      description: 'Spin for random nouns, verbs, adjectives, creative writing prompts, and classroom vocabulary drills.',
      items: activePool.slice(0, 16).map((w, idx) => ({ id: w.id || `w-${idx}`, text: w.word, weight: 1 })),
      paletteKey: activeCategory
    });
    showToast(isNowSaved ? '❤️ Saved Word Spinner to Favorites!' : 'Removed from Favorites');
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  useEffect(() => {
    const onFs = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden transition-all ${
        isFullscreen ? 'p-6 fixed inset-0 z-50 overflow-y-auto bg-slate-50 dark:bg-slate-950' : 'p-4 sm:p-6 lg:p-8'
      }`}
    >
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-slate-900/90 text-white text-xs sm:text-sm font-semibold rounded-full shadow-2xl backdrop-blur-md animate-fade-in flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Experience Mode Tabs: Standard, Multiple, Writing, Classroom */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/70 dark:border-slate-800 pb-4 mb-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Select Tool Mode
          </span>
          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
            <button
              onClick={() => setExperienceMode('standard')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                experienceMode === 'standard'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              Single Word
            </button>

            <button
              onClick={() => setExperienceMode('multiple')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                experienceMode === 'multiple'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <span>Multiple Words</span>
              <span className="text-[10px] opacity-80">({multipleCount})</span>
            </button>

            <button
              onClick={() => setExperienceMode('writing')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                experienceMode === 'writing'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-md shadow-rose-500/20'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Writing Mode</span>
            </button>

            <button
              onClick={() => setExperienceMode('classroom')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                experienceMode === 'classroom'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Classroom Mode</span>
            </button>
          </div>
        </div>

        {/* Mode-Specific Sub Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {experienceMode === 'multiple' && (
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-xl text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-semibold text-[11px]">Count:</span>
              {[2, 3, 4, 5, 6].map((cnt) => (
                <button
                  key={cnt}
                  onClick={() => setMultipleCount(cnt)}
                  className={`w-6 h-6 rounded-lg font-bold text-xs ${
                    multipleCount === cnt
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cnt}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={() => setIsNoRepeat(!isNoRepeat)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1 ${
              isNoRepeat
                ? 'bg-amber-50 border-amber-300 text-amber-700 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-300'
                : 'bg-slate-100 border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400'
            }`}
            title="Eliminates spun words from subsequent spins"
          >
            <span>No-Repeat:</span>
            <span className={isNoRepeat ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'}>
              {isNoRepeat ? 'ON' : 'OFF'}
            </span>
          </button>
        </div>
      </div>

      {/* Word Category Selector Chips: All, Nouns, Verbs, Adjectives, Easy, Advanced, Custom */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="font-bold">Word Filter Category</span>
          <span>{activePool.length} words in pool</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {(['all', 'nouns', 'verbs', 'adjectives', 'easy', 'advanced', 'custom'] as WordCategory[]).map((catKey) => {
            const meta = CATEGORY_METADATA[catKey];
            const isActive = activeCategory === catKey;
            const count = catKey === 'custom' ? customWords.length : meta.count;

            return (
              <button
                key={catKey}
                onClick={() => {
                  setActiveCategory(catKey);
                  setSelectedWord(null);
                  if (soundEnabled) playClickSound();
                }}
                className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-700 dark:text-indigo-300 shadow-sm ring-2 ring-indigo-500/20'
                    : 'bg-slate-50/70 dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                }`}
              >
                <span className="text-xs font-black capitalize">{meta.label}</span>
                <span className="text-[10px] text-slate-400 mt-0.5">{count} words</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Wheel Canvas + Controls Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Wheel Stage */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-50/70 dark:bg-slate-900/40 rounded-3xl p-4 sm:p-6 border border-slate-200/60 dark:border-slate-800/80">
          <div className="relative flex flex-col items-center w-full max-w-[340px] sm:max-w-[420px]">
            {/* Needle Pointer */}
            <div
              className="z-20 -mb-3 transition-transform duration-75 origin-top"
              style={{ transform: `rotate(${needleAngle}deg)` }}
            >
              <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[28px] border-t-indigo-600 drop-shadow-md" />
            </div>

            {/* Canvas */}
            <div className="relative w-full aspect-square max-w-[400px]">
              <canvas
                ref={canvasRef}
                width={460}
                height={460}
                className="w-full h-full cursor-pointer select-none transition-transform active:scale-[0.99]"
                onClick={handleSpin}
                title="Click wheel to spin"
              />
            </div>
          </div>

          {/* Action Buttons Below Wheel */}
          <div className="w-full max-w-md mt-4 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={handleSpin}
              disabled={isSpinning || activePool.length === 0}
              className="flex-1 py-3 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:to-purple-800 text-white font-black text-sm sm:text-base shadow-lg shadow-indigo-500/25 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>{isSpinning ? 'Spinning Words…' : 'SPIN WORD WHEEL'}</span>
            </button>

            <button
              onClick={() => {
                if (isSpinning || activePool.length === 0) return;
                const r = activePool[getSecureRandomInt(activePool.length)];
                setSelectedWord(r);
                if (soundEnabled) {
                  playClickSound();
                  playWinnerFanfare();
                }
                confetti();
              }}
              disabled={isSpinning || activePool.length === 0}
              className="py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm active:scale-95 transition-all flex items-center gap-1.5"
              title="Instant draw without waiting for 4-second spin"
            >
              <Shuffle className="w-4 h-4 text-indigo-500" />
              <span>Quick Pick</span>
            </button>
          </div>

          {/* Wheel Options Bar */}
          <div className="w-full max-w-md mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-xl border transition-colors ${
                  soundEnabled
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-950/40 dark:border-indigo-900 dark:text-indigo-400'
                    : 'bg-slate-100 border-slate-200 text-slate-400 dark:bg-slate-800 dark:border-slate-700'
                }`}
                title={soundEnabled ? 'Mute sound' : 'Unmute sound'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={() => {
                  setEliminatedIds([]);
                  showToast('Restored all eliminated words');
                }}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                title="Reset elimination"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={handleFavoriteWheel}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                title="Save Word Spinner to favorites"
              >
                <Heart className="w-4 h-4 text-rose-500" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const currentTexts = customWords.map((w) => w.word).join('\n');
                  setBulkInput(currentTexts);
                  setBulkModalOpen(true);
                }}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <ListPlus className="w-3.5 h-3.5" />
                <span>Custom Words</span>
              </button>

              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                title="Fullscreen"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Word Presentation Cards */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Selected Word Card */}
          {selectedWord && (
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-indigo-50 via-purple-50 to-slate-50 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-slate-900/40 border-2 border-indigo-200 dark:border-indigo-800/80 shadow-lg space-y-3.5 animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Word Spun</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                    {selectedWord.partOfSpeech}
                  </span>
                  <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    {selectedWord.difficulty}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                    {selectedWord.word}
                  </h3>
                  <button
                    onClick={() => speakWord(selectedWord.word)}
                    className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-indigo-50 text-indigo-600 dark:text-indigo-400 shadow-sm border border-indigo-100 dark:border-indigo-800 transition-colors"
                    title="Pronounce word aloud"
                  >
                    <Volume1 className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-2 font-medium">
                  {selectedWord.definition}
                </p>
              </div>

              {selectedWord.exampleSentence && (
                <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-indigo-100 dark:border-indigo-900/60 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    Example Usage:
                  </span>
                  <p className="italic text-slate-700 dark:text-slate-200">
                    &ldquo;{selectedWord.exampleSentence}&rdquo;
                  </p>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex items-center gap-2 pt-1 flex-wrap">
                <button
                  onClick={handleSpin}
                  disabled={isSpinning}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Spin Again</span>
                </button>

                <button
                  onClick={handleCopyWord}
                  className="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5"
                >
                  {copiedWord ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedWord ? 'Copied!' : 'Copy'}</span>
                </button>

                <button
                  onClick={handleShareWord}
                  className="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          )}

          {/* Multiple Words Mode Output Grid */}
          {experienceMode === 'multiple' && multipleDrawnWords.length > 0 && (
            <div className="p-4 sm:p-5 rounded-3xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Multiple Words Drawn ({multipleDrawnWords.length})</span>
                <span className="text-[11px] text-indigo-600 dark:text-indigo-400">All unique</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {multipleDrawnWords.map((wordItem, idx) => (
                  <div
                    key={`${wordItem.id}-${idx}`}
                    className="p-3 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700 text-left space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-900 dark:text-white truncate">
                        {wordItem.word}
                      </span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-500 uppercase">
                        {wordItem.partOfSpeech}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                      {wordItem.definition}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Writing Mode Seed & Challenge */}
          {experienceMode === 'writing' && (
            <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/20 border border-rose-200 dark:border-rose-900/60 space-y-3">
              <div className="flex items-center gap-2">
                <PenTool className="w-4 h-4 text-rose-500" />
                <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                  Creative Writing Mode Challenge
                </h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Write a flash fiction piece, scene opening, or poem incorporating the spun keywords:
              </p>
              {multipleDrawnWords.length >= 3 && (
                <div className="flex items-center gap-2 flex-wrap">
                  {multipleDrawnWords.slice(0, 3).map((w, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-xl bg-white dark:bg-slate-800 text-rose-700 dark:text-rose-300 font-extrabold text-xs shadow-sm border border-rose-200 dark:border-rose-800"
                    >
                      {w.word} ({w.partOfSpeech})
                    </span>
                  ))}
                </div>
              )}
              <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-800/60 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <strong>Suggested Rule:</strong> Set a 5-minute timer and write a minimum of 100 words without stopping.
              </div>
            </div>
          )}

          {/* Classroom Mode Activity Prompt */}
          {experienceMode === 'classroom' && selectedWord && (
            <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20 border border-emerald-200 dark:border-emerald-900/60 space-y-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                  Classroom Activity Challenge
                </h4>
              </div>
              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Spell It:</strong> Have the student spell <em>{selectedWord.word}</em> without looking.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Part of Speech:</strong> Identify why <em>{selectedWord.word}</em> functions as a {selectedWord.partOfSpeech}.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Original Sentence:</strong> Challenge the student to use it in an exciting compound sentence.</span>
                </div>
              </div>
            </div>
          )}

          {/* History Drawer */}
          {history.length > 0 && (
            <div className="p-4 rounded-3xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Spin History ({history.length})</span>
                </div>
                <button
                  onClick={() => {
                    setHistory([]);
                    showToast('History cleared');
                  }}
                  className="text-rose-500 hover:underline font-semibold"
                >
                  Clear
                </button>
              </div>

              <div className="max-h-28 overflow-y-auto space-y-1 text-xs">
                {history.map((h, i) => (
                  <div
                    key={h.id}
                    className="py-1 px-2.5 rounded-xl bg-white dark:bg-slate-800/80 flex items-center justify-between"
                  >
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      <strong className="text-slate-400 mr-2">#{history.length - i}</strong>
                      {h.word}
                    </span>
                    <span className="text-[10px] text-slate-400">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bulk Custom Word Modal */}
      {bulkModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-scale-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ListPlus className="w-5 h-5 text-indigo-500" />
                <h3 className="font-black text-slate-900 dark:text-white text-base">
                  Custom Word List Manager
                </h3>
              </div>
              <button
                onClick={() => setBulkModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Type or paste your custom vocabulary, spelling lists, or improv words (one per line). These will populate the wheel when Custom List is active.
            </p>

            <textarea
              value={bulkInput}
              onChange={(e) => setBulkInput(e.target.value)}
              rows={8}
              className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Constellation&#10;Metaphor&#10;Resilience&#10;Perseverance"
            />

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setBulkModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyBulkWords}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-colors"
              >
                Save &amp; Spin Custom Words
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
