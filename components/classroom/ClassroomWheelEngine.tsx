'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
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
  Sliders,
  X,
  Download,
  Megaphone,
  Mic,
  MicOff,
  Heart,
  Pencil,
  RotateCcw
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
  '#3b82f6', // Blue
  '#10b981', // Emerald Green
  '#f59e0b', // Amber
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#06b6d4', // Cyan
  '#ef4444', // Red
  '#84cc16', // Lime
  '#f97316', // Orange
  '#6366f1'  // Indigo
];

export type ClassroomMode =
  | 'student'
  | 'no-repeat'
  | 'reading'
  | 'quiz'
  | 'activity'
  | 'job'
  | 'teams';

export interface StudentEntry {
  id: string;
  name: string;
  weight: number;
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
  { id: 's-12', name: 'Lily O\'Connor', weight: 1 }
];

const DEFAULT_READING_ENTRIES: StudentEntry[] = [
  { id: 'r-1', name: 'Table 1 - Read Paragraph 1', weight: 1 },
  { id: 'r-2', name: 'Table 2 - Read Paragraph 2', weight: 1 },
  { id: 'r-3', name: 'Teacher Choral Read', weight: 1 },
  { id: 'r-4', name: 'Table 3 - Read Dialogues', weight: 1 },
  { id: 'r-5', name: 'Whole Class Choral Read', weight: 1 },
  { id: 'r-6', name: 'Table 4 - Summarize Section', weight: 1 },
  { id: 'r-7', name: 'Volunteer Reader Pick', weight: 1 },
  { id: 'r-8', name: 'Pass Turn / Next Chapter', weight: 1 }
];

const DEFAULT_QUIZ_ENTRIES: StudentEntry[] = [
  { id: 'q-1', name: 'Vocabulary & Definitions', weight: 1 },
  { id: 'q-2', name: 'Mental Math Lightning Round', weight: 1 },
  { id: 'q-3', name: 'Science & Nature Facts', weight: 1 },
  { id: 'q-4', name: 'History & World Capitals', weight: 1 },
  { id: 'q-5', name: 'Grammar & Syntax Fixes', weight: 1 },
  { id: 'q-6', name: 'Creative Writing Prompt', weight: 1 },
  { id: 'q-7', name: 'Double Points Wildcard', weight: 1 },
  { id: 'q-8', name: 'Team Challenge Round', weight: 1 }
];

const DEFAULT_ACTIVITY_ENTRIES: StudentEntry[] = [
  { id: 'a-1', name: '4 Corners Brain Break', weight: 1 },
  { id: 'a-2', name: '7-Minute Stretch & Yoga', weight: 1 },
  { id: 'a-3', name: 'Silent Speed Ball Game', weight: 1 },
  { id: 'a-4', name: 'Freeze Dance Music Break', weight: 1 },
  { id: 'a-5', name: 'Think-Pair-Share Partner', weight: 1 },
  { id: 'a-6', name: '5-Minute Quiet Reading', weight: 1 },
  { id: 'a-7', name: 'Classroom Line-Up Challenge', weight: 1 },
  { id: 'a-8', name: 'Clean Desk Inspection Check', weight: 1 }
];

const DEFAULT_JOB_ENTRIES: StudentEntry[] = [
  { id: 'j-1', name: 'Line Leader', weight: 1 },
  { id: 'j-2', name: 'Door Holder & Greeter', weight: 1 },
  { id: 'j-3', name: 'Paper & Supply Passer', weight: 1 },
  { id: 'j-4', name: 'Whiteboard Eraser', weight: 1 },
  { id: 'j-5', name: 'Device & Tech Monitor', weight: 1 },
  { id: 'j-6', name: 'Library & Book Organizer', weight: 1 },
  { id: 'j-7', name: 'Plant & Pet Caretaker', weight: 1 },
  { id: 'j-8', name: 'Energy & Lights Captain', weight: 1 }
];

function getInitialClassroomCategoryPools(): Record<ClassroomMode, StudentEntry[]> {
  const defaults: Record<ClassroomMode, StudentEntry[]> = {
    student: DEFAULT_STUDENTS,
    'no-repeat': DEFAULT_STUDENTS,
    reading: DEFAULT_READING_ENTRIES,
    quiz: DEFAULT_QUIZ_ENTRIES,
    activity: DEFAULT_ACTIVITY_ENTRIES,
    job: DEFAULT_JOB_ENTRIES,
    teams: DEFAULT_STUDENTS
  };

  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('classroom_wheel_category_pools_v2');
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
  // Mode selection
  const [activeMode, setActiveMode] = useState<ClassroomMode>('student');

  // Category Pools state for all modes
  const [categoryPools, setCategoryPools] = useState<Record<ClassroomMode, StudentEntry[]>>(getInitialClassroomCategoryPools);

  // Profile Favorites Hook
  const savedWheels = useSavedWheels();
  const isGameFavorited = savedWheels.some(
    (w) => w.id === 'classroom-wheel' || w.title.trim().toLowerCase() === 'classroom spin wheel'
  );
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleFavoriteGame = () => {
    const isNowSaved = toggleWheelFavorite({
      id: 'classroom-wheel',
      title: 'Classroom Spin Wheel',
      category: 'Classroom & Education',
      description: 'Spin the wheel for student picker, reading order, quiz topics, classroom jobs, and brain breaks.',
      items: activeEntries.map((e, idx) => ({ id: e.id || `c-${idx}`, text: e.name, weight: e.weight || 1 })),
      paletteKey: 'blue'
    });
    setToastMsg(isNowSaved ? '❤️ Saved Classroom Wheel to Profile Favorites!' : 'Removed Classroom Wheel from Profile Favorites');
    setTimeout(() => setToastMsg(null), 2200);
  };

  // Synchronize categoryPools to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('classroom_wheel_category_pools_v2', JSON.stringify(categoryPools));
      } catch {
        // ignore
      }
    }
  }, [categoryPools]);

  // Target pool key (student, reading, quiz, activity, job)
  const targetPoolKey: ClassroomMode = (activeMode === 'no-repeat' || activeMode === 'teams') ? 'student' : activeMode;
  const currentPoolList = useMemo(() => categoryPools[targetPoolKey] || [], [categoryPools, targetPoolKey]);

  // Elimination / No-Repeat mode state
  const [noRepeat, setNoRepeat] = useState<boolean>(false);
  const [eliminatedIds, setEliminatedIds] = useState<string[]>([]);

  // Sound & Speech settings
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [ttsEnabled, setTtsEnabled] = useState<boolean>(true);

  // Wheel State
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [showWinnerModal, setShowWinnerModal] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [needleAngle, setNeedleAngle] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  // Input & Edit State
  const [newItemName, setNewItemName] = useState<string>('');
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [editingEntryName, setEditingEntryName] = useState<string>('');

  // Bulk Edit Modal
  const [showBulkModal, setShowBulkModal] = useState<boolean>(false);
  const [bulkText, setBulkText] = useState<string>('');

  // Team Generator State
  const [teamCount, setTeamCount] = useState<number>(4);
  const [generatedTeams, setGeneratedTeams] = useState<{ name: string; members: string[] }[]>([]);

  // Canvas & Container Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const currentAngleRef = useRef<number>(0);

  // Synchronize browser fullscreen changes
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

  // Determine active slice entries based on mode
  const activeEntries = (activeMode === 'no-repeat' || noRepeat)
    ? currentPoolList.filter((item) => !eliminatedIds.includes(item.id))
    : currentPoolList;

  // Render Canvas Wheel
  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    const radius = center - 16;

    ctx.clearRect(0, 0, size, size);

    if (activeEntries.length === 0) {
      // Empty wheel message
      ctx.save();
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, 2 * Math.PI);
      ctx.fillStyle = '#1e293b';
      ctx.fill();
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 18px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('All students drawn!', center, center - 10);
      ctx.font = '14px sans-serif';
      ctx.fillText('Click Reset Roster below', center, center + 15);
      ctx.restore();
      return;
    }

    const totalWeight = activeEntries.reduce((sum, item) => sum + (item.weight || 1), 0);
    let startAngle = currentAngleRef.current;

    activeEntries.forEach((entry, idx) => {
      const sliceAngle = ((entry.weight || 1) / totalWeight) * 2 * Math.PI;
      const endAngle = startAngle + sliceAngle;
      const color = CLASSROOM_PALETTE[idx % CLASSROOM_PALETTE.length];

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
      ctx.font = activeEntries.length > 16 ? 'bold 12px sans-serif' : 'bold 15px sans-serif';
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

      ctx.fillText(text, radius - 20, 5);
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
    ctx.arc(center, center, 32, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Inner Hub Icon
    ctx.fillStyle = '#2563eb';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🎓', center, center + 1);
  }, [activeEntries]);

  // Keep Canvas sharp & re-render on entries change
  useEffect(() => {
    drawWheel();
  }, [drawWheel]);

  // Handle Wheel Spin
  const handleSpin = () => {
    if (isSpinning || activeEntries.length === 0) return;

    unlockAudioContext();
    if (soundEnabled) playClickSound();

    setIsSpinning(true);
    setWinner(null);
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

    // Pointer is at 270 deg (top center = -Math.PI / 2)
    const pointerAngle = (3 * Math.PI) / 2;
    const targetBaseAngle = pointerAngle - itemMidAngle;

    const minRotations = 5 + Math.floor(Math.random() * 3);
    const finalAngle = targetBaseAngle + minRotations * 2 * Math.PI;

    const duration = 4000;
    const startTime = performance.now();
    const initialAngle = currentAngleRef.current;
    let lastTickAngle = initialAngle;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Cubic ease-out
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentAngle = initialAngle + (finalAngle - initialAngle) * easeOut;

      currentAngleRef.current = currentAngle;
      drawWheel();

      // Tick Audio Simulation
      const sliceSize = (2 * Math.PI) / activeEntries.length;
      if (Math.abs(currentAngle - lastTickAngle) >= sliceSize) {
        if (soundEnabled) playTickSound();
        setNeedleAngle((prev) => (prev === 0 ? 15 : 0));
        lastTickAngle = currentAngle;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        setWinner(selectedItem.name);
        setShowWinnerModal(true);
        setNeedleAngle(0);

        if (soundEnabled) playWinnerFanfare();
        if (ttsEnabled && typeof window !== 'undefined') {
          announceWinnerTTS(`Selected: ${selectedItem.name}`);
        }

        // Fire Confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });

        // Handle No-Repeat / Elimination
        if (activeMode === 'no-repeat' || noRepeat) {
          setEliminatedIds((prev) => [...prev, selectedItem.id]);
        }
      }
    };

    requestAnimationFrame(animate);
  };

  // Add Single Item
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

  // Remove Item
  const handleRemoveItem = (id: string) => {
    setCategoryPools((prev) => ({
      ...prev,
      [targetPoolKey]: (prev[targetPoolKey] || []).filter((item) => item.id !== id)
    }));
    setEliminatedIds((prev) => prev.filter((eId) => eId !== id));
  };

  // Start Editing Item
  const handleStartEditing = (id: string, currentName: string) => {
    setEditingEntryId(id);
    setEditingEntryName(currentName);
  };

  // Save Edit Item
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

  // Reset Pool to Default Preset
  const handleResetToDefaultList = () => {
    let defaultsList = DEFAULT_STUDENTS;
    if (targetPoolKey === 'reading') defaultsList = DEFAULT_READING_ENTRIES;
    else if (targetPoolKey === 'quiz') defaultsList = DEFAULT_QUIZ_ENTRIES;
    else if (targetPoolKey === 'activity') defaultsList = DEFAULT_ACTIVITY_ENTRIES;
    else if (targetPoolKey === 'job') defaultsList = DEFAULT_JOB_ENTRIES;

    setCategoryPools((prev) => ({
      ...prev,
      [targetPoolKey]: defaultsList
    }));
    setEliminatedIds([]);
  };

  // Bulk Apply Roster or Item List
  const handleApplyBulkText = () => {
    const lines = bulkText
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length > 0) {
      const newEntries: StudentEntry[] = lines.map((name, idx) => ({
        id: `${targetPoolKey}-bulk-${Date.now()}-${idx}`,
        name,
        weight: 1
      }));
      setCategoryPools((prev) => ({
        ...prev,
        [targetPoolKey]: newEntries
      }));
      setEliminatedIds([]);
      setShowBulkModal(false);
      setBulkText('');
    }
  };

  // Generate Random Teams / Groups
  const handleGenerateTeams = () => {
    const studentList = categoryPools.student || [];
    if (studentList.length === 0) return;

    // Shuffle students using CSPRNG
    const shuffled = [...studentList];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = getRandomIndex(i + 1);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const numTeams = Math.max(2, Math.min(teamCount, studentList.length));
    const teams: { name: string; members: string[] }[] = Array.from({ length: numTeams }, (_, i) => ({
      name: `Team ${i + 1}`,
      members: []
    }));

    shuffled.forEach((student, index) => {
      teams[index % numTeams].members.push(student.name);
    });

    setGeneratedTeams(teams);
  };

  // Copy Team Roster
  const handleCopyTeams = () => {
    const text = generatedTeams
      .map((t) => `${t.name}:\n${t.members.map((m) => ` - ${m}`).join('\n')}`)
      .join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      ref={containerRef}
      className={`w-full max-w-6xl mx-auto rounded-3xl transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-0 z-50 bg-[#0f172a] p-4 overflow-y-auto flex flex-col justify-center items-center'
          : 'bg-white dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] shadow-xl p-4 sm:p-6 lg:p-8'
      }`}
    >
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Header & Presets Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
            <GraduationCap className="w-4 h-4" />
            <span>Classroom Interactive Hub</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Classroom Spin Wheel</span>
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
            <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 px-2.5 py-0.5 rounded-full font-medium">
              100% Fair
            </span>
          </h2>
        </div>

        {/* Action Controls: Fullscreen & Audio */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2.5 rounded-xl border text-sm font-medium transition-colors flex items-center gap-1.5 ${
              soundEnabled
                ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
            }`}
            title="Toggle Wheel Sounds"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{soundEnabled ? 'Sounds On' : 'Muted'}</span>
          </button>

          <button
            onClick={() => setTtsEnabled(!ttsEnabled)}
            className={`p-2.5 rounded-xl border text-sm font-medium transition-colors flex items-center gap-1.5 ${
              ttsEnabled
                ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
            }`}
            title="Toggle Text-to-Speech Voice Announcement"
          >
            {ttsEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            <span className="hidden sm:inline">{ttsEnabled ? 'Voice On' : 'Voice Off'}</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium transition-colors flex items-center gap-1.5"
            title="Toggle Smartboard Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </button>
        </div>
      </div>

      {/* Feature Selector Mode Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 my-6">
        <button
          onClick={() => setActiveMode('student')}
          className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeMode === 'student'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-[1.02]'
              : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Student Picker</span>
        </button>

        <button
          onClick={() => setActiveMode('no-repeat')}
          className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeMode === 'no-repeat'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 scale-[1.02]'
              : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          <UserX className="w-4 h-4" />
          <span>No Repeat</span>
        </button>

        <button
          onClick={() => setActiveMode('reading')}
          className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeMode === 'reading'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25 scale-[1.02]'
              : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Reading Order</span>
        </button>

        <button
          onClick={() => setActiveMode('quiz')}
          className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeMode === 'quiz'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/25 scale-[1.02]'
              : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Quiz Topic</span>
        </button>

        <button
          onClick={() => setActiveMode('activity')}
          className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeMode === 'activity'
              ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/25 scale-[1.02]'
              : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Class Activity</span>
        </button>

        <button
          onClick={() => setActiveMode('job')}
          className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeMode === 'job'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 scale-[1.02]'
              : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Classroom Job</span>
        </button>

        <button
          onClick={() => {
            setActiveMode('teams');
            if (generatedTeams.length === 0) handleGenerateTeams();
          }}
          className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all col-span-2 sm:col-span-1 ${
            activeMode === 'teams'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/25 scale-[1.02]'
              : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          <Shuffle className="w-4 h-4" />
          <span>Team Maker</span>
        </button>
      </div>

      {/* Main Interactive Grid */}
      {activeMode === 'teams' ? (
        /* Team Generator View */
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Shuffle className="w-5 h-5 text-cyan-500" />
                <span>Random Team & Group Maker</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Splits {currentPoolList.length} students into fair, unbiased groups instantly.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Teams:
                </label>
                <select
                  value={teamCount}
                  onChange={(e) => setTeamCount(Number(e.target.value))}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold"
                >
                  <option value={2}>2 Teams</option>
                  <option value={3}>3 Teams</option>
                  <option value={4}>4 Teams</option>
                  <option value={5}>5 Teams</option>
                  <option value={6}>6 Teams</option>
                  <option value={8}>8 Teams</option>
                </select>
              </div>

              <button
                onClick={handleGenerateTeams}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reshuffle Teams</span>
              </button>
            </div>
          </div>

          {/* Generated Team Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
            {generatedTeams.map((team, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100 dark:border-slate-700">
                  <span className="font-bold text-sm text-cyan-600 dark:text-cyan-400">
                    {team.name}
                  </span>
                  <span className="text-[10px] font-semibold bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full text-slate-500">
                    {team.members.length} members
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {team.members.map((member, mIdx) => (
                    <li
                      key={mIdx}
                      className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                      <span>{member}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Export / Copy Options */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={handleCopyTeams}
              className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Teams!' : 'Copy Team Rosters'}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Interactive Wheel View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Wheel Canvas Column */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
            {/* Top Pointer Needle */}
            <div
              className="absolute top-0 z-20 transition-transform duration-150 origin-bottom"
              style={{ transform: `rotate(${needleAngle}deg)` }}
            >
              <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[32px] border-t-red-600 filter drop-shadow-md" />
            </div>

            {/* Canvas Container */}
            <div className="relative p-2 bg-slate-100 dark:bg-slate-900 rounded-full shadow-inner border border-slate-200 dark:border-slate-800 flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={420}
                height={420}
                className="w-full max-w-[min(92vw,360px)] aspect-square sm:max-w-[400px] cursor-pointer touch-manipulation transition-transform"
                onClick={handleSpin}
              />
            </div>

            {/* Big Spin Button */}
            <button
              onClick={handleSpin}
              disabled={isSpinning || activeEntries.length === 0}
              className={`mt-6 w-full max-w-xs py-3.5 px-8 rounded-2xl font-black text-lg text-white shadow-xl flex items-center justify-center gap-2 transition-all transform active:scale-95 ${
                isSpinning || activeEntries.length === 0
                  ? 'bg-slate-400 cursor-not-allowed opacity-70'
                  : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5'
              }`}
            >
              <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>{isSpinning ? 'SPINNING...' : 'SPIN WHEEL'}</span>
            </button>
          </div>

          {/* Classroom Roster & Entries Sidebar */}
          <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col h-[460px]">
            {/* Sidebar Top Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                  <ListPlus className="w-4 h-4 text-blue-500" />
                  <span>
                    {targetPoolKey === 'student'
                      ? `Student Roster (${activeEntries.length}/${currentPoolList.length})`
                      : `${targetPoolKey.toUpperCase()} Entries (${activeEntries.length})`}
                  </span>
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {activeMode === 'no-repeat'
                    ? 'Eliminated students are hidden automatically'
                    : 'Add, edit or custom-configure items below'}
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleResetToDefaultList}
                  title="Reset list to default preset"
                  className="p-1.5 rounded-lg bg-slate-200/80 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
                <button
                  onClick={() => setShowBulkModal(true)}
                  className="px-2.5 py-1.5 rounded-lg bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/50 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold transition-colors"
                >
                  Paste List
                </button>
              </div>
            </div>

            {/* Quick Add Form */}
            <form onSubmit={handleAddItem} className="flex items-center gap-2 mb-3">
              <input
                type="text"
                placeholder={
                  targetPoolKey === 'student'
                    ? 'Add student name...'
                    : targetPoolKey === 'reading'
                    ? 'Add reading passage or turn...'
                    : targetPoolKey === 'quiz'
                    ? 'Add quiz topic or prompt...'
                    : targetPoolKey === 'activity'
                    ? 'Add brain break activity...'
                    : 'Add job title...'
                }
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shrink-0"
                title="Add to List"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>

            {/* Scrollable Entries List */}
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
              {activeEntries.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-xs">
                  No items remaining in list. Add new items or click Reset.
                </div>
              ) : (
                activeEntries.map((entry, idx) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200 gap-2"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
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
                          className="flex-1 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 border border-blue-500 text-slate-900 dark:text-white text-xs focus:outline-none"
                        />
                      ) : (
                        <span className="truncate">{entry.name}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {editingEntryId === entry.id ? (
                        <button
                          onClick={() => handleSaveEdit(entry.id)}
                          className="text-emerald-600 hover:text-emerald-700 p-1"
                          title="Save Changes"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStartEditing(entry.id, entry.name)}
                          className="text-slate-400 hover:text-blue-500 transition-colors p-1"
                          title="Edit item name"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        onClick={() => handleRemoveItem(entry.id)}
                        className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                        title="Delete item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bottom Actions for No-Repeat / Roster */}
            {eliminatedIds.length > 0 && (
              <div className="pt-3 mt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">
                  {eliminatedIds.length} items drawn
                </span>
                <button
                  onClick={() => setEliminatedIds([])}
                  className="px-3 py-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center gap-1 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Restore Drawn Items</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Winner Modal Pop-Up */}
      {showWinnerModal && winner && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 text-center border border-slate-200 dark:border-slate-800 shadow-2xl relative">
            <button
              onClick={() => setShowWinnerModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400 text-3xl">
              🎓
            </div>

            <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
              Classroom Winner Selected!
            </p>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-6">
              {winner}
            </h3>

            <div className="flex items-center justify-center gap-3">
              {(activeMode === 'no-repeat' || noRepeat) && (
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mb-2">
                  ✓ Removed from roster for remaining turns
                </p>
              )}
            </div>

            <button
              onClick={() => setShowWinnerModal(false)}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors shadow-lg shadow-blue-500/25 mt-2"
            >
              Continue Class
            </button>
          </div>
        </div>
      )}

      {/* Bulk Roster / Item Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl relative">
            <button
              onClick={() => setShowBulkModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-500" />
              <span>Paste Custom {targetPoolKey.toUpperCase()} Items</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Paste your list below (one item per line) to replace current items for {targetPoolKey}.
            </p>

            <textarea
              rows={8}
              placeholder="Item 1&#10;Item 2&#10;Item 3&#10;Item 4"
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowBulkModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyBulkText}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-md"
              >
                Replace List
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
