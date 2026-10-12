'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import confetti from '@/lib/confetti';
import {
  GraduationCap,
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
  Users,
  Shuffle,
  RefreshCw,
  BookOpen,
  HelpCircle,
  Briefcase,
  Zap,
  ListPlus,
  UserCheck,
  UserX,
  X,
  Mic,
  MicOff,
  Heart,
  Pencil,
  RotateCcw,
  Trophy,
  ClipboardList,
  Eye,
  EyeOff,
  History,
  FileText
} from 'lucide-react';
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

// Classroom High-Legibility Color Palette
const CLASSROOM_PALETTE = [
  '#2563eb', // Royal Blue
  '#059669', // Emerald Green
  '#d97706', // Warm Amber
  '#7c3aed', // Purple
  '#db2777', // Magenta Pink
  '#0891b2', // Cyan
  '#dc2626', // Crimson Red
  '#65a30d', // Lime Green
  '#ea580c', // Bright Orange
  '#4f46e5'  // Deep Indigo
];

export type ClassroomMode =
  | 'student'
  | 'job'
  | 'teams'
  | 'activity'
  | 'presentation'
  | 'quiz'
  | 'review';

export interface StudentEntry {
  id: string;
  name: string;
  weight: number;
}

export interface WinnerHistoryItem {
  id: string;
  name: string;
  mode: ClassroomMode;
  timestamp: string;
  round: number;
}

// Default Presets
const DEFAULT_STUDENTS: StudentEntry[] = [
  { id: 's-1', name: 'Aiden Cole', weight: 1 },
  { id: 's-2', name: 'Brianna Diaz', weight: 1 },
  { id: 's-3', name: 'Carter Evans', weight: 1 },
  { id: 's-4', name: 'Daisy Flores', weight: 1 },
  { id: 's-5', name: 'Ethan Gonzalez', weight: 1 },
  { id: 's-6', name: 'Fiona Hayes', weight: 1 },
  { id: 's-7', name: 'Gavin Jenkins', weight: 1 },
  { id: 's-8', name: 'Hannah Khan', weight: 1 },
  { id: 's-9', name: 'Ian Lewis', weight: 1 },
  { id: 's-10', name: 'Julia Martinez', weight: 1 },
  { id: 's-11', name: 'Kevin Nguyen', weight: 1 },
  { id: 's-12', name: 'Lily O\'Connor', weight: 1 },
  { id: 's-13', name: 'Mason Patel', weight: 1 },
  { id: 's-14', name: 'Nora Quinn', weight: 1 },
  { id: 's-15', name: 'Oliver Reed', weight: 1 },
  { id: 's-16', name: 'Penelope Scott', weight: 1 }
];

const DEFAULT_JOB_ENTRIES: StudentEntry[] = [
  { id: 'j-1', name: 'Line Leader', weight: 1 },
  { id: 'j-2', name: 'Door Holder & Greeter', weight: 1 },
  { id: 'j-3', name: 'Paper & Supply Passer', weight: 1 },
  { id: 'j-4', name: 'Whiteboard Eraser', weight: 1 },
  { id: 'j-5', name: 'Device & Tech Monitor', weight: 1 },
  { id: 'j-6', name: 'Library & Book Organizer', weight: 1 },
  { id: 'j-7', name: 'Plant Tender & Pet Helper', weight: 1 },
  { id: 'j-8', name: 'Energy & Lights Captain', weight: 1 },
  { id: 'j-9', name: 'Timekeeper & Bell Ringer', weight: 1 },
  { id: 'j-10', name: 'Pencil & Station Captain', weight: 1 }
];

const DEFAULT_ACTIVITY_ENTRIES: StudentEntry[] = [
  { id: 'a-1', name: '4 Corners Movement Break', weight: 1 },
  { id: 'a-2', name: '7-Minute Desk Yoga & Stretch', weight: 1 },
  { id: 'a-3', name: 'Silent Speed Ball Game', weight: 1 },
  { id: 'a-4', name: 'Freeze Dance Music Break', weight: 1 },
  { id: 'a-5', name: 'Think-Pair-Share Partner Chat', weight: 1 },
  { id: 'a-6', name: 'Quick Draw Pictionary Round', weight: 1 },
  { id: 'a-7', name: 'Simon Says Attention Reset', weight: 1 },
  { id: 'a-8', name: '3-Minute Desk Cleanup Sprint', weight: 1 }
];

const DEFAULT_PRESENTATION_ENTRIES: StudentEntry[] = [
  { id: 'p-1', name: 'Aiden Cole', weight: 1 },
  { id: 'p-2', name: 'Brianna Diaz', weight: 1 },
  { id: 'p-3', name: 'Carter Evans', weight: 1 },
  { id: 'p-4', name: 'Daisy Flores', weight: 1 },
  { id: 'p-5', name: 'Ethan Gonzalez', weight: 1 },
  { id: 'p-6', name: 'Fiona Hayes', weight: 1 },
  { id: 'p-7', name: 'Gavin Jenkins', weight: 1 },
  { id: 'p-8', name: 'Hannah Khan', weight: 1 }
];

const DEFAULT_QUIZ_ENTRIES: StudentEntry[] = [
  { id: 'q-1', name: 'Math Sprint & Mental Calculation', weight: 1 },
  { id: 'q-2', name: 'Science Hypothesis & Lab Fact', weight: 1 },
  { id: 'q-3', name: 'Vocabulary Meaning & Sentence Use', weight: 1 },
  { id: 'q-4', name: 'History & Timeline Event', weight: 1 },
  { id: 'q-5', name: 'Grammar & Punctuation Fix', weight: 1 },
  { id: 'q-6', name: 'Reading Passage Main Idea', weight: 1 },
  { id: 'q-7', name: 'Teacher Wildcard Challenge', weight: 1 },
  { id: 'q-8', name: 'Ask a Classmate Question', weight: 1 }
];

const DEFAULT_REVIEW_ENTRIES: StudentEntry[] = [
  { id: 'rv-1', name: '100 Points - Quick Question', weight: 1 },
  { id: 'rv-2', name: '200 Points - Concept Check', weight: 1 },
  { id: 'rv-3', name: '300 Points - Deep Dive', weight: 1 },
  { id: 'rv-4', name: '400 Points - Multi-Step Problem', weight: 1 },
  { id: 'rv-5', name: '500 Points - Jackpot Question!', weight: 1 },
  { id: 'rv-6', name: 'Double Points Multiplier!', weight: 1 },
  { id: 'rv-7', name: 'Steal 100 Points from Team', weight: 1 },
  { id: 'rv-8', name: 'Team Challenge Speed Round', weight: 1 }
];

function getInitialClassroomCategoryPools(): Record<ClassroomMode, StudentEntry[]> {
  const defaults: Record<ClassroomMode, StudentEntry[]> = {
    student: DEFAULT_STUDENTS,
    job: DEFAULT_JOB_ENTRIES,
    teams: DEFAULT_STUDENTS,
    activity: DEFAULT_ACTIVITY_ENTRIES,
    presentation: DEFAULT_PRESENTATION_ENTRIES,
    quiz: DEFAULT_QUIZ_ENTRIES,
    review: DEFAULT_REVIEW_ENTRIES
  };

  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('classroom_wheel_pools_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return { ...defaults, ...parsed };
        }
      }
    } catch {
      // ignore
    }
  }
  return defaults;
}

export default function ClassroomWheelEngine() {
  const [activeMode, setActiveMode] = useState<ClassroomMode>('student');
  const [categoryPools, setCategoryPools] = useState<Record<ClassroomMode, StudentEntry[]>>(
    getInitialClassroomCategoryPools
  );

  const savedWheels = useSavedWheels();
  const isGameFavorited = savedWheels.some(
    (w) => w.id === 'classroom-wheel' || w.title.trim().toLowerCase() === 'classroom spin wheel'
  );
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [noRepeat, setNoRepeat] = useState<boolean>(true);
  const [eliminatedIds, setEliminatedIds] = useState<string[]>([]);

  const [winnerHistory, setWinnerHistory] = useState<WinnerHistoryItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('classroom_wheel_winner_history_v3');
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return [];
  });
  const [roundCounter, setRoundCounter] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('classroom_wheel_round_counter_v3');
        if (saved) return Number(saved) || 1;
      } catch {
        // ignore
      }
    }
    return 1;
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [ttsEnabled, setTtsEnabled] = useState<boolean>(true);

  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [winnerEntry, setWinnerEntry] = useState<StudentEntry | null>(null);
  const [showWinnerModal, setShowWinnerModal] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [needleAngle, setNeedleAngle] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [historyCopied, setHistoryCopied] = useState<boolean>(false);

  const [newItemName, setNewItemName] = useState<string>('');
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [editingEntryName, setEditingEntryName] = useState<string>('');

  const [showQuickPasteModal, setShowQuickPasteModal] = useState<boolean>(false);
  const [pasteText, setPasteText] = useState<string>('');
  const [pasteActionType, setPasteActionType] = useState<'replace' | 'append'>('replace');

  const [groupStrategy, setGroupStrategy] = useState<'by-count' | 'by-size'>('by-count');
  const [teamCount, setTeamCount] = useState<number>(4);
  const [groupSize, setGroupSize] = useState<number>(4);
  const [generatedTeams, setGeneratedTeams] = useState<{ name: string; members: string[] }[]>([]);

  const [presentationQueue, setPresentationQueue] = useState<{ id: string; name: string; done: boolean }[]>([]);
  const [queueCopied, setQueueCopied] = useState<boolean>(false);

  const [reviewScores, setReviewScores] = useState<Record<string, number>>({
    'Team 1': 0,
    'Team 2': 0,
    'Team 3': 0,
    'Team 4': 0
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const currentAngleRef = useRef<number>(0);

  useEffect(() => {
    const handleLaunchMode = (e: Event) => {
      const customEvent = e as CustomEvent<{ mode: ClassroomMode; groupSize?: number }>;
      if (customEvent.detail && customEvent.detail.mode) {
        setActiveMode(customEvent.detail.mode);
        if (customEvent.detail.groupSize) {
          setGroupStrategy('by-size');
          setGroupSize(customEvent.detail.groupSize);
        }
      }
    };
    window.addEventListener('launch-classroom-mode', handleLaunchMode);
    return () => window.removeEventListener('launch-classroom-mode', handleLaunchMode);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('classroom_wheel_pools_v3', JSON.stringify(categoryPools));
      } catch {
        // ignore
      }
    }
  }, [categoryPools]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('classroom_wheel_winner_history_v3', JSON.stringify(winnerHistory));
        localStorage.setItem('classroom_wheel_round_counter_v3', String(roundCounter));
      } catch {
        // ignore
      }
    }
  }, [winnerHistory, roundCounter]);

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

  const targetPoolKey: ClassroomMode = activeMode;
  const currentPoolList = useMemo(() => categoryPools[targetPoolKey] || [], [categoryPools, targetPoolKey]);

  const activeEntries = useMemo(() => {
    if (noRepeat) {
      return currentPoolList.filter((item) => !eliminatedIds.includes(item.id));
    }
    return currentPoolList;
  }, [currentPoolList, noRepeat, eliminatedIds]);

  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    const radius = center - 14;

    ctx.clearRect(0, 0, size, size);

    if (activeEntries.length === 0) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#1e293b';
      ctx.fill();
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 15px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('All items drawn!', center, center - 10);
      ctx.font = '12px sans-serif';
      ctx.fillStyle = '#60a5fa';
      ctx.fillText('Click "Restore Drawn Items"', center, center + 12);
      ctx.restore();
      return;
    }

    const totalWeight = activeEntries.reduce((sum, item) => sum + (item.weight || 1), 0);
    let startAngle = currentAngleRef.current;

    activeEntries.forEach((entry, idx) => {
      const sliceAngle = ((entry.weight || 1) / totalWeight) * 2 * Math.PI;
      const endAngle = startAngle + sliceAngle;
      const color = CLASSROOM_PALETTE[idx % CLASSROOM_PALETTE.length];

      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = activeEntries.length > 20 ? 'bold 10px sans-serif' : activeEntries.length > 12 ? 'bold 12px sans-serif' : 'bold 14px sans-serif';
      ctx.shadowColor = 'rgba(0,0,0,0.6)';
      ctx.shadowBlur = 3;

      const maxTextWidth = radius - 40;
      let text = entry.name;
      if (ctx.measureText(text).width > maxTextWidth) {
        while (text.length > 3 && ctx.measureText(text + '…').width > maxTextWidth) {
          text = text.slice(0, -1);
        }
        text = text + '…';
      }

      ctx.fillText(text, radius - 18, 4);
      ctx.restore();

      startAngle = endAngle;
    });

    ctx.beginPath();
    ctx.arc(center, center, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(center, center, 28, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#1d4ed8';
    ctx.lineWidth = 3.5;
    ctx.stroke();

    ctx.fillStyle = '#1d4ed8';
    ctx.font = 'bold 18px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🎓', center, center + 1);
  }, [activeEntries]);

  useEffect(() => {
    drawWheel();
  }, [drawWheel]);

  const handleSpin = () => {
    if (isSpinning || activeEntries.length === 0) return;

    unlockAudioContext();
    if (soundEnabled) playClickSound();

    setIsSpinning(true);
    setWinner(null);
    setWinnerEntry(null);
    setShowWinnerModal(false);

    const winningIndex = getRandomIndex(activeEntries.length);
    const selectedItem = activeEntries[winningIndex];

    const totalWeight = activeEntries.reduce((sum, item) => sum + (item.weight || 1), 0);
    let weightAcc = 0;
    for (let i = 0; i < winningIndex; i++) {
      weightAcc += activeEntries[i].weight || 1;
    }

    const itemSliceAngle = ((selectedItem.weight || 1) / totalWeight) * 2 * Math.PI;
    const startSliceAngle = (weightAcc / totalWeight) * 2 * Math.PI;
    const itemMidAngle = startSliceAngle + itemSliceAngle / 2;

    const pointerAngle = (3 * Math.PI) / 2;
    const targetBaseAngle = pointerAngle - itemMidAngle;

    const minRotations = 5 + Math.floor(Math.random() * 3);
    const finalAngle = targetBaseAngle + minRotations * 2 * Math.PI;

    const duration = 3800;
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

      const sliceSize = (2 * Math.PI) / activeEntries.length;
      if (Math.abs(currentAngle - lastTickAngle) >= sliceSize) {
        if (soundEnabled) playTickSound();
        setNeedleAngle((prev) => (prev === 0 ? 12 : 0));
        lastTickAngle = currentAngle;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        setWinner(selectedItem.name);
        setWinnerEntry(selectedItem);
        setShowWinnerModal(true);
        setNeedleAngle(0);

        if (soundEnabled) playWinnerFanfare();
        if (ttsEnabled && typeof window !== 'undefined') {
          announceWinnerTTS(
            activeMode === 'student'
              ? `Next student: ${selectedItem.name}`
              : activeMode === 'job'
              ? `Job assigned: ${selectedItem.name}`
              : activeMode === 'presentation'
              ? `Presenter: ${selectedItem.name}`
              : activeMode === 'review'
              ? `Spun: ${selectedItem.name}`
              : `Result: ${selectedItem.name}`
          );
        }

        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.6 }
        });

        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const historyItem: WinnerHistoryItem = {
          id: `hist-${Date.now()}`,
          name: selectedItem.name,
          mode: activeMode,
          timestamp: timeStr,
          round: roundCounter
        };
        setWinnerHistory((prev) => [historyItem, ...prev]);
        setRoundCounter((prev) => prev + 1);

        if (noRepeat) {
          setEliminatedIds((prev) => [...prev, selectedItem.id]);
        }
      }
    };

    requestAnimationFrame(animate);
  };

  const handleToggleEliminateItem = (id: string) => {
    setEliminatedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleEliminateCurrentWinner = () => {
    if (winnerEntry && !eliminatedIds.includes(winnerEntry.id)) {
      setEliminatedIds((prev) => [...prev, winnerEntry.id]);
    }
    setShowWinnerModal(false);
  };

  const handleRestoreCurrentWinner = () => {
    if (winnerEntry) {
      setEliminatedIds((prev) => prev.filter((id) => id !== winnerEntry.id));
    }
    setShowWinnerModal(false);
  };

  const handleRestoreAllDrawn = () => {
    setEliminatedIds([]);
  };

  const handleClearWinnerHistory = () => {
    setWinnerHistory([]);
    setRoundCounter(1);
    setToastMsg('Winner History cleared');
    setTimeout(() => setToastMsg(null), 1800);
  };

  const handleCopyHistory = () => {
    if (winnerHistory.length === 0) return;
    const text = winnerHistory
      .map((item, idx) => `${winnerHistory.length - idx}. [${item.timestamp}] ${item.name} (${item.mode})`)
      .join('\n');
    navigator.clipboard.writeText(text);
    setHistoryCopied(true);
    setTimeout(() => setHistoryCopied(false), 1800);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    const newEntry: StudentEntry = {
      id: `${targetPoolKey}-${Date.now()}`,
      name: newItemName.trim(),
      weight: 1
    };
    setCategoryPools((prev) => ({
      ...prev,
      [targetPoolKey]: [...(prev[targetPoolKey] || []), newEntry]
    }));
    setNewItemName('');
  };

  const handleRemoveItem = (id: string) => {
    setCategoryPools((prev) => ({
      ...prev,
      [targetPoolKey]: (prev[targetPoolKey] || []).filter((item) => item.id !== id)
    }));
    setEliminatedIds((prev) => prev.filter((eId) => eId !== id));
  };

  const handleSaveEdit = (id: string) => {
    if (!editingEntryName.trim()) return;
    setCategoryPools((prev) => ({
      ...prev,
      [targetPoolKey]: (prev[targetPoolKey] || []).map((item) =>
        item.id === id ? { ...item, name: editingEntryName.trim() } : item
      )
    }));
    setEditingEntryId(null);
    setEditingEntryName('');
  };

  const handleResetToDefaultList = () => {
    let defaultsList = DEFAULT_STUDENTS;
    if (targetPoolKey === 'job') defaultsList = DEFAULT_JOB_ENTRIES;
    else if (targetPoolKey === 'activity') defaultsList = DEFAULT_ACTIVITY_ENTRIES;
    else if (targetPoolKey === 'presentation') defaultsList = DEFAULT_PRESENTATION_ENTRIES;
    else if (targetPoolKey === 'quiz') defaultsList = DEFAULT_QUIZ_ENTRIES;
    else if (targetPoolKey === 'review') defaultsList = DEFAULT_REVIEW_ENTRIES;

    setCategoryPools((prev) => ({
      ...prev,
      [targetPoolKey]: defaultsList
    }));
    setEliminatedIds([]);
  };

  const handleApplyQuickPaste = () => {
    if (!pasteText.trim()) return;

    const rawItems = pasteText
      .split(/[\n,;]+/)
      .map((line) => line.replace(/^[\s\d.\-#*)\]]+/, '').trim())
      .filter((name) => name.length > 0);

    const uniqueNames = Array.from(new Set(rawItems));
    if (uniqueNames.length === 0) return;

    const newEntries: StudentEntry[] = uniqueNames.map((name, idx) => ({
      id: `${targetPoolKey}-pasted-${Date.now()}-${idx}`,
      name,
      weight: 1
    }));

    setCategoryPools((prev) => {
      const existing = prev[targetPoolKey] || [];
      const updated = pasteActionType === 'append' ? [...existing, ...newEntries] : newEntries;
      return {
        ...prev,
        [targetPoolKey]: updated
      };
    });

    setEliminatedIds([]);
    setShowQuickPasteModal(false);
    setPasteText('');
    setToastMsg(`Loaded ${newEntries.length} items to ${targetPoolKey.toUpperCase()}`);
    setTimeout(() => setToastMsg(null), 2000);
  };

  const handleLoadClassPreset = (presetType: 'sample24' | 'small16' | 'elementary12') => {
    let names: string[] = [];
    if (presetType === 'sample24') {
      names = [
        'Aiden Cole', 'Brianna Diaz', 'Carter Evans', 'Daisy Flores', 'Ethan Gonzalez',
        'Fiona Hayes', 'Gavin Jenkins', 'Hannah Khan', 'Ian Lewis', 'Julia Martinez',
        'Kevin Nguyen', 'Lily O\'Connor', 'Mason Patel', 'Nora Quinn', 'Oliver Reed',
        'Penelope Scott', 'Quinn Turner', 'Riley Underwood', 'Samuel Vance', 'Tara Williams',
        'Uma Xavier', 'Victor Yang', 'Wendy Zhang', 'Xavier Brooks'
      ];
    } else if (presetType === 'small16') {
      names = [
        'Alex Mercer', 'Bella Thorne', 'Caleb Clark', 'Danielle Ross', 'Evan Bell',
        'Faith Morgan', 'Gabriel Ortiz', 'Harper Bailey', 'Isaac Rivera', 'Jade Cooper',
        'Kaleb Richardson', 'Leah Cox', 'Miles Howard', 'Naomi Ward', 'Owen Torres', 'Piper Peterson'
      ];
    } else {
      names = [
        'Liam', 'Olivia', 'Noah', 'Emma', 'Oliver', 'Charlotte',
        'James', 'Amelia', 'Elijah', 'Sophia', 'William', 'Ava'
      ];
    }
    setPasteText(names.join('\n'));
  };

  const handleGenerateTeams = () => {
    const studentList = categoryPools.student || [];
    if (studentList.length === 0) return;

    const shuffled = [...studentList];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = getRandomIndex(i + 1);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    let calculatedNumTeams = teamCount;
    if (groupStrategy === 'by-size') {
      const validSize = Math.max(1, groupSize);
      calculatedNumTeams = Math.max(1, Math.ceil(studentList.length / validSize));
    }

    const numTeams = Math.max(2, Math.min(calculatedNumTeams, studentList.length));
    const teams: { name: string; members: string[] }[] = Array.from({ length: numTeams }, (_, i) => ({
      name: `Team ${i + 1}`,
      members: []
    }));

    shuffled.forEach((student, index) => {
      teams[index % numTeams].members.push(student.name);
    });

    setGeneratedTeams(teams);
  };

  const handleCopyTeams = () => {
    const text = generatedTeams
      .map((t) => `${t.name} (${t.members.length}):\n${t.members.map((m) => `  • ${m}`).join('\n')}`)
      .join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleGeneratePresentationQueue = () => {
    const currentList = categoryPools.presentation || categoryPools.student || [];
    if (currentList.length === 0) return;

    const shuffled = [...currentList];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = getRandomIndex(i + 1);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    setPresentationQueue(shuffled.map((item) => ({ id: item.id, name: item.name, done: false })));
  };

  const handleToggleQueueItemDone = (id: string) => {
    setPresentationQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const handleCopyPresentationQueue = () => {
    if (presentationQueue.length === 0) return;
    const text = presentationQueue
      .map((item, idx) => `${idx + 1}. ${item.name} ${item.done ? '[COMPLETED]' : ''}`)
      .join('\n');
    navigator.clipboard.writeText(text);
    setQueueCopied(true);
    setTimeout(() => setQueueCopied(false), 1800);
  };

  const handleAdjustScore = (team: string, delta: number) => {
    setReviewScores((prev) => ({
      ...prev,
      [team]: Math.max(0, (prev[team] || 0) + delta)
    }));
  };

  const handleResetScores = () => {
    setReviewScores({
      'Team 1': 0,
      'Team 2': 0,
      'Team 3': 0,
      'Team 4': 0
    });
  };

  const handleFavoriteGame = () => {
    const isNowSaved = toggleWheelFavorite({
      id: 'classroom-wheel',
      title: 'Classroom Spin Wheel',
      category: 'Classroom & Education',
      description: 'Spin the wheel for random student picker, group maker, presentation order, jobs, and review games.',
      items: activeEntries.map((e, idx) => ({ id: e.id || `c-${idx}`, text: e.name, weight: e.weight || 1 })),
      paletteKey: 'blue'
    });
    setToastMsg(isNowSaved ? '❤️ Saved to Favorites!' : 'Removed from Favorites');
    setTimeout(() => setToastMsg(null), 1800);
  };

  return (
    <div
      ref={containerRef}
      className={`w-full max-w-7xl mx-auto rounded-2xl sm:rounded-3xl transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-0 z-50 bg-[#0f172a] p-3 sm:p-5 overflow-y-auto flex flex-col justify-start items-center'
          : 'bg-white dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#20212f] shadow-lg dark:shadow-xl p-3 sm:p-5 lg:p-6'
      }`}
    >
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold px-3 py-2 rounded-xl shadow-xl flex items-center gap-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pb-3 sm:pb-4 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>Classroom Wheel &amp; Spinner</span>
              <button
                type="button"
                onClick={handleFavoriteGame}
                aria-label={isGameFavorited ? 'Remove from favorites' : 'Save to favorites'}
                className="p-1 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
              >
                <Heart className={`w-4 h-4 ${isGameFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </h2>
          </div>
          <span className="text-[10px] sm:text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 px-2 py-0.5 rounded-full">
            100% Fair PRNG
          </span>
        </div>

        {/* Action Controls Bar */}
        <div className="flex items-center gap-1.5 flex-wrap self-end sm:self-auto">
          <button
            onClick={() => setNoRepeat(!noRepeat)}
            className={`px-2.5 py-1.5 rounded-lg border text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
              noRepeat
                ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
            }`}
            title="Toggle No-Repeat Mode"
          >
            {noRepeat ? <UserX className="w-3 h-3 text-emerald-600" /> : <Users className="w-3 h-3" />}
            <span>No-Repeat: {noRepeat ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border text-[11px] font-medium transition-colors flex items-center gap-1 cursor-pointer ${
              soundEnabled
                ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
            }`}
            title="Toggle Wheel Sounds"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{soundEnabled ? 'Sound' : 'Mute'}</span>
          </button>

          <button
            onClick={() => setTtsEnabled(!ttsEnabled)}
            className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border text-[11px] font-medium transition-colors flex items-center gap-1 cursor-pointer ${
              ttsEnabled
                ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
            }`}
            title="Toggle Voice Callout"
          >
            {ttsEnabled ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{ttsEnabled ? 'Voice' : 'Voice Off'}</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-[11px] font-bold transition-colors flex items-center gap-1 cursor-pointer"
            title="Toggle Smartboard Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
          </button>
        </div>
      </div>

      {/* 7 Dedicated Mode Pills (Horizontal scrollable on mobile, compact grid on desktop) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none sm:grid sm:grid-cols-7 my-2.5 sm:my-3">
        <button
          onClick={() => setActiveMode('student')}
          className={`flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeMode === 'student'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
          }`}
        >
          <Users className="w-3.5 h-3.5 shrink-0" />
          <span>Student</span>
        </button>

        <button
          onClick={() => setActiveMode('job')}
          className={`flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeMode === 'job'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5 shrink-0" />
          <span>Jobs</span>
        </button>

        <button
          onClick={() => {
            setActiveMode('teams');
            if (generatedTeams.length === 0) handleGenerateTeams();
          }}
          className={`flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeMode === 'teams'
              ? 'bg-cyan-600 text-white shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
          }`}
        >
          <Shuffle className="w-3.5 h-3.5 shrink-0" />
          <span>Group Maker</span>
        </button>

        <button
          onClick={() => setActiveMode('activity')}
          className={`flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeMode === 'activity'
              ? 'bg-pink-600 text-white shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
          }`}
        >
          <Zap className="w-3.5 h-3.5 shrink-0" />
          <span>Activity</span>
        </button>

        <button
          onClick={() => {
            setActiveMode('presentation');
            if (presentationQueue.length === 0) handleGeneratePresentationQueue();
          }}
          className={`flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeMode === 'presentation'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
          }`}
        >
          <ClipboardList className="w-3.5 h-3.5 shrink-0" />
          <span>Presentation</span>
        </button>

        <button
          onClick={() => setActiveMode('quiz')}
          className={`flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeMode === 'quiz'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5 shrink-0" />
          <span>Question</span>
        </button>

        <button
          onClick={() => setActiveMode('review')}
          className={`flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
            activeMode === 'review'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
          }`}
        >
          <Trophy className="w-3.5 h-3.5 shrink-0" />
          <span>Review Game</span>
        </button>
      </div>

      {/* Mode Sub-Banner (Compact) */}
      <div className="bg-slate-50 dark:bg-[#181922] rounded-xl px-3 py-2 mb-3 sm:mb-4 border border-[#eeedf7] dark:border-[#20212f] flex flex-row items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 truncate">
          <span className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-[10px] bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded">
            {activeMode === 'student' && 'Random Student'}
            {activeMode === 'job' && 'Jobs & Duties'}
            {activeMode === 'teams' && 'Group Maker'}
            {activeMode === 'activity' && 'Brain Breaks'}
            {activeMode === 'presentation' && 'Presentation Queue'}
            {activeMode === 'quiz' && 'Questions'}
            {activeMode === 'review' && 'Game Show'}
          </span>
          <span className="text-slate-500 dark:text-slate-400 text-xs truncate hidden xs:inline">
            {activeMode === 'student' && 'Unbiased cold-calling with text-to-speech callouts.'}
            {activeMode === 'job' && 'Fair chore assignment for helpers and monitors.'}
            {activeMode === 'teams' && 'Create balanced groups by size or team count.'}
            {activeMode === 'activity' && 'Quick physical and mental resets.'}
            {activeMode === 'presentation' && 'Randomize speaking order and mark as completed.'}
            {activeMode === 'quiz' && 'Comprehension checks across subjects.'}
            {activeMode === 'review' && 'Jeopardy-style point wheel with team scoreboard.'}
          </span>
        </div>

        <button
          onClick={() => setShowQuickPasteModal(true)}
          className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] sm:text-xs flex items-center gap-1 shadow-xs transition-colors cursor-pointer shrink-0"
        >
          <FileText className="w-3 h-3" />
          <span>Paste Roster</span>
        </button>
      </div>

      {/* Main Interactive Stage */}
      {activeMode === 'teams' ? (
        /* Compact Group Maker View */
        <div className="bg-slate-50/70 dark:bg-[#181922]/70 rounded-2xl p-3 sm:p-4 border border-[#eeedf7] dark:border-[#20212f] space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-200/80 dark:border-slate-800">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Shuffle className="w-4 h-4 text-cyan-500" />
                <span>Classroom Team &amp; Group Maker</span>
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Splits {categoryPools.student?.length || 0} students into unbiased collaborative teams.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex rounded-lg bg-slate-200 dark:bg-slate-800 p-0.5 text-[11px] font-bold">
                <button
                  onClick={() => setGroupStrategy('by-count')}
                  className={`px-2 py-1 rounded-md transition-all ${
                    groupStrategy === 'by-count'
                      ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  By # Teams
                </button>
                <button
                  onClick={() => setGroupStrategy('by-size')}
                  className={`px-2 py-1 rounded-md transition-all ${
                    groupStrategy === 'by-size'
                      ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  By Group Size
                </button>
              </div>

              {groupStrategy === 'by-count' ? (
                <select
                  value={teamCount}
                  onChange={(e) => setTeamCount(Number(e.target.value))}
                  className="px-2 py-1 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px] font-bold"
                >
                  <option value={2}>2 Teams</option>
                  <option value={3}>3 Teams</option>
                  <option value={4}>4 Teams</option>
                  <option value={5}>5 Teams</option>
                  <option value={6}>6 Teams</option>
                  <option value={8}>8 Teams</option>
                </select>
              ) : (
                <select
                  value={groupSize}
                  onChange={(e) => setGroupSize(Number(e.target.value))}
                  className="px-2 py-1 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px] font-bold"
                >
                  <option value={2}>2 per Pair</option>
                  <option value={3}>3 per Triad</option>
                  <option value={4}>4 per Squad</option>
                  <option value={5}>5 per Cluster</option>
                  <option value={6}>6 per Table</option>
                </select>
              )}

              <button
                onClick={handleGenerateTeams}
                className="px-3 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-[11px] flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reshuffle</span>
              </button>
            </div>
          </div>

          {/* Generated Team Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {generatedTeams.map((team, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs"
              >
                <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-slate-100 dark:border-slate-700">
                  <span className="font-bold text-xs text-cyan-600 dark:text-cyan-400">
                    {team.name}
                  </span>
                  <span className="text-[10px] font-bold bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 px-1.5 py-0.5 rounded-full">
                    {team.members.length}
                  </span>
                </div>
                <ul className="space-y-1">
                  {team.members.map((member, mIdx) => (
                    <li
                      key={mIdx}
                      className="text-[11px] font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1 truncate"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0"></span>
                      <span className="truncate">{member}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px]">
            <span className="text-slate-500">
              Total assigned: {generatedTeams.reduce((sum, t) => sum + t.members.length, 0)}
            </span>
            <button
              onClick={handleCopyTeams}
              className="px-3 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied!' : 'Copy Teams'}</span>
            </button>
          </div>
        </div>
      ) : activeMode === 'presentation' ? (
        /* Compact Presentation Queue View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-6 items-start">
          <div className="lg:col-span-7 bg-slate-50/70 dark:bg-[#181922]/70 rounded-2xl p-2.5 sm:p-4 border border-[#eeedf7] dark:border-[#20212f] flex flex-col items-center justify-center relative">
            <div
              className="absolute top-2 z-20 transition-transform duration-150 origin-bottom"
              style={{ transform: `rotate(${needleAngle}deg)` }}
            >
              <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[24px] border-t-red-600 filter drop-shadow-sm" />
            </div>

            <div className="relative p-1.5 bg-slate-100 dark:bg-slate-900 rounded-full shadow-inner border border-slate-200 dark:border-slate-800 flex items-center justify-center mt-2">
              <canvas
                ref={canvasRef}
                width={380}
                height={380}
                className="w-full max-w-[260px] xs:max-w-[290px] sm:max-w-[340px] md:max-w-[370px] aspect-square cursor-pointer touch-manipulation"
                onClick={handleSpin}
              />
            </div>

            <button
              onClick={handleSpin}
              disabled={isSpinning || activeEntries.length === 0}
              className={`mt-3 sm:mt-4 w-full max-w-xs py-2.5 sm:py-3 px-6 rounded-xl font-black text-sm sm:text-base text-white shadow-md flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer ${
                isSpinning || activeEntries.length === 0
                  ? 'bg-slate-400 cursor-not-allowed opacity-70'
                  : 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/25'
              }`}
            >
              <RotateCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>{isSpinning ? 'SPINNING...' : 'SPIN PRESENTER'}</span>
            </button>
          </div>

          <div className="lg:col-span-5 bg-slate-50/70 dark:bg-[#181922]/70 p-3 sm:p-3.5 rounded-2xl border border-[#eeedf7] dark:border-[#20212f] flex flex-col h-[380px] sm:h-[400px] lg:h-[430px]">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-1">
                  <ClipboardList className="w-3.5 h-3.5 text-purple-500" />
                  <span>Speaking Queue</span>
                </h4>
              </div>
              <button
                onClick={handleGeneratePresentationQueue}
                className="px-2 py-1 rounded-md bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
              >
                <Shuffle className="w-3 h-3" />
                <span>Shuffle Order</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1 pr-1">
              {presentationQueue.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-xs space-y-2">
                  <p>Queue not generated.</p>
                  <button
                    onClick={handleGeneratePresentationQueue}
                    className="px-3 py-1 rounded-lg bg-purple-600 text-white font-bold text-xs"
                  >
                    Generate Order
                  </button>
                </div>
              ) : (
                presentationQueue.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => handleToggleQueueItemDone(item.id)}
                    className={`flex items-center justify-between p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                      item.done
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40 text-slate-400 line-through'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="w-5 h-5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-[11px] font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="truncate font-semibold">{item.name}</span>
                    </div>
                    <span className="text-[10px] font-bold shrink-0">
                      {item.done ? '✓ Done' : 'Waiting'}
                    </span>
                  </div>
                ))
              )}
            </div>

            {presentationQueue.length > 0 && (
              <div className="pt-2 mt-1 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">
                  {presentationQueue.filter((p) => p.done).length} / {presentationQueue.length} Done
                </span>
                <button
                  onClick={handleCopyPresentationQueue}
                  className="px-2.5 py-1 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold flex items-center gap-1 cursor-pointer"
                >
                  {queueCopied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  <span>{queueCopied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      ) : activeMode === 'review' ? (
        /* Compact Review Game View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-6 items-start">
          <div className="lg:col-span-7 bg-slate-50/70 dark:bg-[#181922]/70 rounded-2xl p-2.5 sm:p-4 border border-[#eeedf7] dark:border-[#20212f] flex flex-col items-center justify-center relative">
            <div
              className="absolute top-2 z-20 transition-transform duration-150 origin-bottom"
              style={{ transform: `rotate(${needleAngle}deg)` }}
            >
              <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[24px] border-t-red-600 filter drop-shadow-sm" />
            </div>

            <div className="relative p-1.5 bg-slate-100 dark:bg-slate-900 rounded-full shadow-inner border border-slate-200 dark:border-slate-800 flex items-center justify-center mt-2">
              <canvas
                ref={canvasRef}
                width={380}
                height={380}
                className="w-full max-w-[260px] xs:max-w-[290px] sm:max-w-[340px] md:max-w-[370px] aspect-square cursor-pointer touch-manipulation"
                onClick={handleSpin}
              />
            </div>

            <button
              onClick={handleSpin}
              disabled={isSpinning || activeEntries.length === 0}
              className={`mt-3 sm:mt-4 w-full max-w-xs py-2.5 sm:py-3 px-6 rounded-xl font-black text-sm sm:text-base text-white shadow-md flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer ${
                isSpinning || activeEntries.length === 0
                  ? 'bg-slate-400 cursor-not-allowed opacity-70'
                  : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/25'
              }`}
            >
              <RotateCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>{isSpinning ? 'SPINNING...' : 'SPIN POINTS'}</span>
            </button>
          </div>

          <div className="lg:col-span-5 bg-slate-50/70 dark:bg-[#181922]/70 p-3 sm:p-3.5 rounded-2xl border border-[#eeedf7] dark:border-[#20212f] flex flex-col h-[380px] sm:h-[400px] lg:h-[430px]">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-emerald-500" />
                <span>Live Scoreboard</span>
              </h4>
              <button
                onClick={handleResetScores}
                className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold cursor-pointer"
              >
                Reset Scores
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 flex-1">
              {Object.entries(reviewScores).map(([teamName, score], idx) => {
                const teamColors = [
                  'border-blue-300 bg-blue-50/50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300',
                  'border-red-300 bg-red-50/50 dark:bg-red-950/30 text-red-700 dark:text-red-300',
                  'border-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300',
                  'border-amber-300 bg-amber-50/50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300'
                ];
                return (
                  <div
                    key={teamName}
                    className={`p-2.5 rounded-xl border flex flex-col justify-between ${teamColors[idx % teamColors.length]}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs">{teamName}</span>
                      <span className="text-base font-black">{score}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1 pt-2">
                      <button
                        onClick={() => handleAdjustScore(teamName, 100)}
                        className="py-0.5 rounded bg-white dark:bg-slate-800 font-bold text-[10px] shadow-xs cursor-pointer"
                      >
                        +100
                      </button>
                      <button
                        onClick={() => handleAdjustScore(teamName, 200)}
                        className="py-0.5 rounded bg-white dark:bg-slate-800 font-bold text-[10px] shadow-xs cursor-pointer"
                      >
                        +200
                      </button>
                      <button
                        onClick={() => handleAdjustScore(teamName, -100)}
                        className="py-0.5 rounded bg-white dark:bg-slate-800 font-bold text-[10px] shadow-xs text-rose-600 cursor-pointer"
                      >
                        -100
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-500">
              Spin point stakes, present the quiz question, and score points!
            </div>
          </div>
        </div>
      ) : (
        /* Standard Wheel View (Student, Job, Activity, Question) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-6 items-start">
          {/* Wheel Canvas Stage */}
          <div className="lg:col-span-7 bg-slate-50/70 dark:bg-[#181922]/70 rounded-2xl p-2.5 sm:p-4 border border-[#eeedf7] dark:border-[#20212f] flex flex-col items-center justify-center relative">
            <div
              className="absolute top-2 z-20 transition-transform duration-150 origin-bottom"
              style={{ transform: `rotate(${needleAngle}deg)` }}
            >
              <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[24px] border-t-red-600 filter drop-shadow-sm" />
            </div>

            <div className="relative p-1.5 bg-slate-100 dark:bg-slate-900 rounded-full shadow-inner border border-slate-200 dark:border-slate-800 flex items-center justify-center mt-2">
              <canvas
                ref={canvasRef}
                width={380}
                height={380}
                className="w-full max-w-[260px] xs:max-w-[290px] sm:max-w-[340px] md:max-w-[370px] aspect-square cursor-pointer touch-manipulation"
                onClick={handleSpin}
              />
            </div>

            <button
              onClick={handleSpin}
              disabled={isSpinning || activeEntries.length === 0}
              className={`mt-3 sm:mt-4 w-full max-w-xs py-2.5 sm:py-3 px-6 rounded-xl font-black text-sm sm:text-base text-white shadow-md flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer ${
                isSpinning || activeEntries.length === 0
                  ? 'bg-slate-400 cursor-not-allowed opacity-70'
                  : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/25'
              }`}
            >
              <RotateCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>{isSpinning ? 'SPINNING...' : 'SPIN WHEEL'}</span>
            </button>
          </div>

          {/* Roster & Controls Sidebar */}
          <div className="lg:col-span-5 bg-slate-50/70 dark:bg-[#181922]/70 p-3 sm:p-3.5 rounded-2xl border border-[#eeedf7] dark:border-[#20212f] flex flex-col h-[380px] sm:h-[400px] lg:h-[430px]">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 dark:border-slate-800">
              <div className="truncate">
                <h4 className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-1 truncate">
                  <ListPlus className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span className="truncate">
                    {targetPoolKey === 'student'
                      ? `Roster (${activeEntries.length}/${currentPoolList.length})`
                      : `${targetPoolKey.toUpperCase()} (${activeEntries.length})`}
                  </span>
                </h4>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={handleResetToDefaultList}
                  title="Reset to default preset"
                  className="p-1 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setShowQuickPasteModal(true)}
                  className="px-2 py-0.5 rounded-md bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-[10px] font-bold cursor-pointer"
                >
                  Paste
                </button>
              </div>
            </div>

            {/* Quick Add Form */}
            <form onSubmit={handleAddItem} className="flex items-center gap-1.5 mb-2">
              <input
                type="text"
                placeholder={
                  targetPoolKey === 'student'
                    ? 'Add student name...'
                    : targetPoolKey === 'job'
                    ? 'Add job title...'
                    : targetPoolKey === 'activity'
                    ? 'Add brain break...'
                    : 'Add item...'
                }
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="flex-1 px-2.5 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shrink-0 cursor-pointer"
                title="Add to List"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Scrollable Entries List */}
            <div className="flex-1 overflow-y-auto space-y-1 pr-1">
              {currentPoolList.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-xs">
                  No items. Add above or click Reset.
                </div>
              ) : (
                currentPoolList.map((entry, idx) => {
                  const isEliminated = eliminatedIds.includes(entry.id);
                  return (
                    <div
                      key={entry.id}
                      className={`flex items-center justify-between p-1.5 sm:p-2 rounded-lg border text-xs transition-all gap-1.5 ${
                        isEliminated
                          ? 'bg-slate-100/60 dark:bg-slate-900/30 border-dashed border-slate-300 dark:border-slate-800 text-slate-400'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 flex-1 min-w-0">
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 ${isEliminated ? 'opacity-30' : ''}`}
                          style={{ backgroundColor: CLASSROOM_PALETTE[idx % CLASSROOM_PALETTE.length] }}
                        />
                        {editingEntryId === entry.id ? (
                          <input
                            type="text"
                            value={editingEntryName}
                            onChange={(e) => setEditingEntryName(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSaveEdit(entry.id);
                              if (e.key === 'Escape') setEditingEntryId(null);
                            }}
                            autoFocus
                            className="flex-1 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 border border-blue-500 text-xs focus:outline-none"
                          />
                        ) : (
                          <span className={`truncate ${isEliminated ? 'line-through' : ''}`}>
                            {entry.name}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-0.5 shrink-0">
                        <button
                          onClick={() => handleToggleEliminateItem(entry.id)}
                          className={`p-1 rounded cursor-pointer ${
                            isEliminated
                              ? 'text-emerald-600 hover:text-emerald-700'
                              : 'text-slate-400 hover:text-amber-500'
                          }`}
                          title={isEliminated ? 'Restore to Wheel' : 'Eliminate from Wheel'}
                        >
                          {isEliminated ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        </button>

                        {editingEntryId === entry.id ? (
                          <button
                            onClick={() => handleSaveEdit(entry.id)}
                            className="text-emerald-600 p-1 cursor-pointer"
                            title="Save"
                          >
                            <Check className="w-3 h-3" />
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingEntryId(entry.id);
                              setEditingEntryName(entry.name);
                            }}
                            className="text-slate-400 hover:text-blue-500 p-1 cursor-pointer"
                            title="Edit"
                          >
                            <Pencil className="w-3 h-3" />
                          </button>
                        )}

                        <button
                          onClick={() => handleRemoveItem(entry.id)}
                          className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {eliminatedIds.length > 0 && (
              <div className="pt-2 mt-1 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">{eliminatedIds.length} drawn</span>
                <button
                  onClick={handleRestoreAllDrawn}
                  className="px-2 py-0.5 rounded-md bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Restore Drawn</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Compact Winner Participation History Bar */}
      <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
          <History className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>Participation History ({winnerHistory.length})</span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={handleCopyHistory}
            disabled={winnerHistory.length === 0}
            className={`px-2 py-1 rounded-md border text-[11px] font-bold flex items-center gap-1 cursor-pointer ${
              winnerHistory.length === 0
                ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            {historyCopied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
            <span>Copy Log</span>
          </button>

          <button
            onClick={handleClearWinnerHistory}
            disabled={winnerHistory.length === 0}
            className={`px-2 py-1 rounded-md border text-[11px] font-bold flex items-center gap-1 cursor-pointer ${
              winnerHistory.length === 0
                ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400'
                : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200'
            }`}
          >
            <Trash2 className="w-3 h-3" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {winnerHistory.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 scrollbar-none">
          {winnerHistory.slice(0, 15).map((item, idx) => (
            <div
              key={item.id}
              className="shrink-0 px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-medium flex items-center gap-1"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400">#{winnerHistory.length - idx}</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[120px]">{item.name}</span>
              <span className="text-[9px] text-slate-400">({item.timestamp})</span>
            </div>
          ))}
        </div>
      )}

      {/* Winner Modal */}
      {showWinnerModal && winner && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-5 text-center border border-slate-200 dark:border-slate-800 shadow-2xl relative">
            <button
              onClick={() => setShowWinnerModal(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 dark:hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center mx-auto mb-2.5 text-blue-600 dark:text-blue-400 text-2xl">
              🎓
            </div>

            <p className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-0.5">
              Selected Winner
            </p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">
              {winner}
            </h3>

            {winnerEntry && (
              <div className="mb-3">
                {eliminatedIds.includes(winnerEntry.id) ? (
                  <button
                    onClick={handleRestoreCurrentWinner}
                    className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
                  >
                    Keep on Wheel
                  </button>
                ) : (
                  <button
                    onClick={handleEliminateCurrentWinner}
                    className="px-3 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-bold text-xs"
                  >
                    Eliminate from Wheel
                  </button>
                )}
              </div>
            )}

            <button
              onClick={() => setShowWinnerModal(false)}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Quick Roster Paste Modal */}
      {showQuickPasteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-5 border border-slate-200 dark:border-slate-800 shadow-2xl relative">
            <button
              onClick={() => setShowQuickPasteModal(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 dark:hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-500" />
              <span>Quick Roster Paste ({targetPoolKey.toUpperCase()})</span>
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">
              Paste names from sheets or documents (one per line, comma separated, or numbered).
            </p>

            <div className="flex items-center gap-1 mb-2.5 flex-wrap">
              <span className="text-[10px] font-bold text-slate-500">Presets:</span>
              <button
                type="button"
                onClick={() => handleLoadClassPreset('sample24')}
                className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold"
              >
                24 Class
              </button>
              <button
                type="button"
                onClick={() => handleLoadClassPreset('small16')}
                className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold"
              >
                16 Group
              </button>
              <button
                type="button"
                onClick={() => handleLoadClassPreset('elementary12')}
                className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold"
              >
                12 Names
              </button>
            </div>

            <textarea
              rows={6}
              placeholder="1. Emma Watson&#10;2. Lucas Vance&#10;3. Sophia Chen"
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 mb-2.5"
            />

            <div className="flex items-center justify-between mb-3 text-xs">
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1 cursor-pointer text-[11px]">
                  <input
                    type="radio"
                    name="pasteAction"
                    checked={pasteActionType === 'replace'}
                    onChange={() => setPasteActionType('replace')}
                    className="text-blue-600"
                  />
                  <span>Replace list</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer text-[11px]">
                  <input
                    type="radio"
                    name="pasteAction"
                    checked={pasteActionType === 'append'}
                    onChange={() => setPasteActionType('append')}
                    className="text-blue-600"
                  />
                  <span>Append list</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setShowQuickPasteModal(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyQuickPaste}
                disabled={!pasteText.trim()}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs disabled:opacity-50"
              >
                Apply Roster
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
