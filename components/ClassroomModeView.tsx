'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import WheelCanvas from './WheelCanvas';
import SoundControls from './SoundControls';
import { WheelItem, SoundSettings } from '@/lib/types';
import { selectWeightedWinner } from '@/lib/random';
import { playWinnerFanfare, playTickSound, announceWinnerTTS } from '@/lib/sound';
import confetti from 'canvas-confetti';
import {
  GraduationCap,
  Users,
  UserCheck,
  UserX,
  Shuffle,
  BookOpen,
  Briefcase,
  Brain,
  HelpCircle,
  Maximize2,
  Minimize2,
  RotateCcw,
  Plus,
  Trash2,
  Copy,
  Check,
  Printer,
  Sparkles,
  Share2,
  Clock,
  Award,
  Volume2
} from 'lucide-react';

interface ClassroomModeViewProps {
  soundEnabled: boolean;
  soundPack?: string;
  volume?: number;
  onNavigateHome?: () => void;
}

// Classroom Presets
const CLASSROOM_PRESETS = [
  {
    id: 'roster-sample',
    title: 'Classroom Roster (24 Students)',
    description: 'General classroom student roster with balanced odds.',
    items: [
      'Alexander M.', 'Sophia T.', 'Liam K.', 'Emma W.', 'Noah B.', 'Olivia R.',
      'Ethan C.', 'Ava D.', 'Lucas H.', 'Isabella N.', 'Mason G.', 'Mia S.',
      'Oliver P.', 'Charlotte F.', 'Elijah J.', 'Amelia L.', 'James V.', 'Harper Z.',
      'Benjamin Q.', 'Evelyn Y.', 'Henry X.', 'Abigail K.', 'Jackson M.', 'Emily P.'
    ]
  },
  {
    id: 'classroom-jobs',
    title: 'Daily Classroom Helpers & Jobs',
    description: 'Distribute weekly responsibilities fairly among students.',
    items: [
      '🚪 Door Holder & Line Leader',
      '📚 Book & Library Monitor',
      '💻 Tech & Projector Helper',
      '🧹 Board & Desk Cleaner',
      '🌱 Plant & Classroom Caretaker',
      '📝 Paper & Material Passer',
      '⏱️ Timekeeper & Bell Ringer',
      '🌟 Kindness Ambassador'
    ]
  },
  {
    id: 'brain-breaks',
    title: '2-Minute Brain Break Activators',
    description: 'Quick energy boosters to refocus young minds.',
    items: [
      '🧘 10 Deep Belly Breaths & Shoulder Stretch',
      '🕺 30-Second Silent Freeze Dance',
      '🤸 15 Jumping Jacks & High Knees',
      '🦒 Reach for the Stars (Full Body Stretch)',
      '🧠 Mirror Your Partner Clapping Game',
      '💧 Stand Up & Water Hydration Check'
    ]
  },
  {
    id: 'socratic-starters',
    title: 'Socratic Discussion Starters',
    description: 'Engaging prompts for deep critical thinking.',
    items: [
      'What evidence in the text supports your viewpoint?',
      'How might the opposing character justify their actions?',
      'Can you connect this concept to a modern real-world event?',
      'What assumption are we making that might be flawed?',
      'How would the outcome differ in a different time period?',
      'Summarize your peer’s argument in your own words first.'
    ]
  },
  {
    id: 'reading-stations',
    title: 'Reading Workshop Stations',
    description: 'Rotate guided reading and literacy centers.',
    items: [
      '📖 Independent Silent Reading',
      '👥 Guided Reading with Teacher',
      '🎧 Audio Book Listening Corner',
      '✍️ Creative Writing & Journaling',
      '🧩 Vocabulary Flashcard Challenge',
      '💻 Digital Phonics Practice'
    ]
  }
];

export default function ClassroomModeView({
  soundEnabled,
  soundPack = 'carnival',
  volume = 0.8
}: ClassroomModeViewProps) {
  // Active Sub-Tool Tab
  const [activeTab, setActiveTab] = useState<'picker' | 'teams' | 'reading' | 'jobs' | 'brainbreak' | 'quiz'>('picker');

  // Student Roster
  const [students, setStudents] = useState<string[]>(CLASSROOM_PRESETS[0].items);
  const [newStudentName, setNewStudentName] = useState('');
  const [calledOn, setCalledOn] = useState<string[]>([]);
  const [absentStudents, setAbsentStudents] = useState<string[]>([]);
  const [noRepeatEnabled, setNoRepeatEnabled] = useState(true);

  // Wheel State
  const [isSpinning, setIsSpinning] = useState(false);
  const [preSelected, setPreSelected] = useState<{
    winner: WheelItem;
    winnerIndex: number;
    seed: string;
    oddsPercent: string;
  } | null>(null);
  const [currentWinner, setCurrentWinner] = useState<string | null>(null);
  const [winnerModalOpen, setWinnerModalOpen] = useState(false);
  const [projectorMode, setProjectorMode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Team Generator Settings
  const [teamCount, setTeamCount] = useState<number>(4);
  const [generatedTeams, setGeneratedTeams] = useState<{ name: string; members: string[] }[]>([]);
  const [copiedTeams, setCopiedTeams] = useState(false);

  // Reading Order State
  const [readingOrder, setReadingOrder] = useState<string[]>([]);
  const [completedReaders, setCompletedReaders] = useState<string[]>([]);

  // Jobs Assignment State
  const [jobAssignments, setJobAssignments] = useState<{ job: string; student: string }[]>([]);

  // Sound settings
  const [soundSettings, setSoundSettings] = useState<SoundSettings>({
    enabled: soundEnabled,
    pack: (soundPack as any) || 'carnival',
    volume,
    ttsEnabled: true
  });

  // Calculate active eligible students for the wheel
  const eligibleStudents = useMemo(() => {
    return students.filter((s) => {
      if (absentStudents.includes(s)) return false;
      if (noRepeatEnabled && calledOn.includes(s)) return false;
      return true;
    });
  }, [students, absentStudents, noRepeatEnabled, calledOn]);

  // Transform eligible students into WheelItems
  const wheelItems: WheelItem[] = useMemo(() => {
    if (eligibleStudents.length === 0) {
      return [{ id: 'empty', text: 'All Students Called! (Click Reset)', weight: 1 }];
    }
    const colors = [
      '#4648d4', '#006c49', '#dc2c4f', '#6063ee', '#f59e0b',
      '#10b981', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'
    ];
    return eligibleStudents.map((name, i) => ({
      id: `student-${name}-${i}`,
      text: name,
      weight: 1,
      color: colors[i % colors.length]
    }));
  }, [eligibleStudents]);

  // Spin Trigger
  const handleTriggerSpin = useCallback(() => {
    if (isSpinning || eligibleStudents.length === 0) return;

    const selection = selectWeightedWinner(wheelItems);
    setPreSelected(selection);
    setIsSpinning(true);
    setWinnerModalOpen(false);
  }, [isSpinning, eligibleStudents.length, wheelItems]);

  // Spin Finished
  const handleSpinEnd = (winner: WheelItem) => {
    setIsSpinning(false);
    if (winner.id === 'empty') return;

    setCurrentWinner(winner.text);
    setWinnerModalOpen(true);

    // Record called on
    if (!calledOn.includes(winner.text)) {
      setCalledOn((prev) => [...prev, winner.text]);
    }

    // Celebration
    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    if (soundSettings.enabled) {
      playWinnerFanfare(soundSettings.enabled, soundSettings.pack, soundSettings.volume);
      announceWinnerTTS(winner.text, { enabled: true, prefix: 'Selected student is' });
    }
  };

  // Keyboard Shortcuts (Space to spin, F for projector mode, R to reset called)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      if (e.code === 'Space') {
        e.preventDefault();
        if (!isSpinning && eligibleStudents.length > 0) {
          handleTriggerSpin();
        }
      } else if (e.key.toLowerCase() === 'f') {
        setProjectorMode((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSpinning, eligibleStudents.length, handleTriggerSpin]);

  // Add Single Student
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newStudentName.trim();
    if (clean && !students.includes(clean)) {
      setStudents([...students, clean]);
      setNewStudentName('');
    }
  };

  // Remove Student
  const handleRemoveStudent = (name: string) => {
    setStudents(students.filter((s) => s !== name));
    setCalledOn(calledOn.filter((s) => s !== name));
    setAbsentStudents(absentStudents.filter((s) => s !== name));
  };

  // Toggle Absent
  const handleToggleAbsent = (name: string) => {
    if (absentStudents.includes(name)) {
      setAbsentStudents(absentStudents.filter((s) => s !== name));
    } else {
      setAbsentStudents([...absentStudents, name]);
    }
  };

  // Reset Called Students
  const handleResetCalled = () => {
    setCalledOn([]);
  };

  // Load Preset
  const handleLoadPreset = (preset: typeof CLASSROOM_PRESETS[0]) => {
    setStudents(preset.items);
    setCalledOn([]);
    setAbsentStudents([]);
    setCurrentWinner(null);
  };

  // Generate Random Balanced Teams
  const handleGenerateTeams = () => {
    const pool = students.filter((s) => !absentStudents.includes(s));
    // Shuffle pool using Fisher-Yates
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const teamCountSanitized = Math.max(2, Math.min(teamCount, pool.length));
    const teams: { name: string; members: string[] }[] = Array.from({ length: teamCountSanitized }, (_, i) => ({
      name: `Team ${i + 1} (${['Red Dragons', 'Blue Falcons', 'Golden Lions', 'Green Hornets', 'Silver Foxes', 'Purple Panthers', 'Orange Tigers', 'Cyan Sharks'][i % 8]})`,
      members: []
    }));

    shuffled.forEach((student, index) => {
      teams[index % teamCountSanitized].members.push(student);
    });

    setGeneratedTeams(teams);
    setCopiedTeams(false);
  };

  // Copy Teams
  const handleCopyTeams = () => {
    if (generatedTeams.length === 0) return;
    const text = generatedTeams
      .map((t) => `${t.name}:\n${t.members.map((m) => `  - ${m}`).join('\n')}`)
      .join('\n\n');
    navigator.clipboard.writeText(text);
    setCopiedTeams(true);
    setTimeout(() => setCopiedTeams(false), 2000);
  };

  // Generate Reading Order
  const handleGenerateReadingOrder = () => {
    const pool = students.filter((s) => !absentStudents.includes(s));
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setReadingOrder(shuffled);
    setCompletedReaders([]);
  };

  // Toggle Completed Reader
  const handleToggleReaderCompleted = (student: string) => {
    if (completedReaders.includes(student)) {
      setCompletedReaders(completedReaders.filter((s) => s !== student));
    } else {
      setCompletedReaders([...completedReaders, student]);
    }
  };

  // Auto-Assign Classroom Jobs
  const handleAssignJobs = () => {
    const jobs = CLASSROOM_PRESETS[1].items;
    const pool = students.filter((s) => !absentStudents.includes(s));
    const shuffledStudents = [...pool];
    for (let i = shuffledStudents.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledStudents[i], shuffledStudents[j]] = [shuffledStudents[j], shuffledStudents[i]];
    }

    const assignments = jobs.map((job, idx) => ({
      job,
      student: shuffledStudents[idx % shuffledStudents.length] || 'Unassigned'
    }));

    setJobAssignments(assignments);
  };

  // Copy Shareable Link
  const handleShareLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className={`w-full flex flex-col gap-8 transition-all ${projectorMode ? 'fixed inset-0 z-50 bg-[#0f111a] text-white p-6 overflow-y-auto' : ''}`}>
      {/* Top Header & Mode Navigation */}
      <div className="w-full bg-white dark:bg-[#181922] rounded-3xl p-6 sm:p-8 border border-[#eeedf7] dark:border-[#292a39] shadow-sm flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#eeedf7] dark:border-[#292a39] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[12px] font-bold mb-2">
              <GraduationCap className="w-4 h-4" />
              <span>Classroom &amp; Educator Suite</span>
            </div>
            <h1 className="font-headline font-extrabold text-[26px] sm:text-[34px] text-[#1a1b22] dark:text-[#f1effa] tracking-tight">
              Classroom Random Picker &amp; Group Maker
            </h1>
            <p className="text-[14px] text-[#767586] dark:text-[#908fa1] max-w-3xl mt-1">
              Purpose-built for teachers, professors, and instructors. Unbiased cold calling, no-repeat turns, instant balanced teams, reading orders, and fullscreen projector display.
            </p>
          </div>

          {/* Quick Utility Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setProjectorMode(!projectorMode)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                projectorMode
                  ? 'bg-amber-500 text-black shadow-lg'
                  : 'bg-[#f4f2fd] dark:bg-[#222330] hover:bg-[#e8e7f1] text-[#4648d4] dark:text-[#8587ff]'
              }`}
              title="Toggle Fullscreen Projector Mode (Shortcut: F)"
            >
              {projectorMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              <span>{projectorMode ? 'Exit Projector' : 'Projector Mode'}</span>
              <kbd className="hidden sm:inline px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 text-[10px]">F</kbd>
            </button>

            <button
              type="button"
              onClick={handleShareLink}
              className="px-3.5 py-2.5 rounded-xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] hover:bg-[#f4f2fd] dark:hover:bg-[#222330] text-[#464554] dark:text-[#c7c4d7] text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
              <span>{copiedLink ? 'Copied Link' : 'Share Wheel'}</span>
            </button>
          </div>
        </div>

        {/* Feature Sub-Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#f4f2fd] dark:bg-[#1d1e28] rounded-2xl border border-[#eeedf7] dark:border-[#292a39]">
          {[
            { id: 'picker', label: 'Student Picker Wheel', icon: UserCheck },
            { id: 'teams', label: 'Random Team Generator', icon: Users },
            { id: 'reading', label: 'Reading / Turn Order', icon: BookOpen },
            { id: 'jobs', label: 'Classroom Jobs', icon: Briefcase },
            { id: 'brainbreak', label: 'Brain Breaks', icon: Brain },
            { id: 'quiz', label: 'Quiz Prompts', icon: HelpCircle }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id as any);
                  if (tab.id === 'brainbreak') handleLoadPreset(CLASSROOM_PRESETS[2]);
                  else if (tab.id === 'quiz') handleLoadPreset(CLASSROOM_PRESETS[3]);
                  else if (tab.id === 'jobs') handleLoadPreset(CLASSROOM_PRESETS[1]);
                }}
                className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  active
                    ? 'bg-[#4648d4] text-white shadow-xs'
                    : 'text-[#464554] dark:text-[#c7c4d7] hover:bg-white dark:hover:bg-[#222330]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: RANDOM STUDENT PICKER WHEEL */}
      {activeTab === 'picker' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Wheel Stage (7 Cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#181922] rounded-3xl p-6 sm:p-8 border border-[#eeedf7] dark:border-[#292a39] shadow-sm flex flex-col items-center gap-6">
            {/* Roster Status Bar */}
            <div className="w-full flex items-center justify-between flex-wrap gap-3 bg-[#f4f2fd] dark:bg-[#1d1e28] p-3 rounded-2xl border border-[#eeedf7] dark:border-[#292a39]">
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="text-[#464554] dark:text-[#c7c4d7]">
                  Eligible:{' '}
                  <strong className="text-[#1a1b22] dark:text-white text-sm">
                    {eligibleStudents.length}
                  </strong>{' '}
                  / {students.length}
                </span>
                <span className="text-[#006c49] dark:text-[#4edea3]">
                  Called On: <strong>{calledOn.length}</strong>
                </span>
                {absentStudents.length > 0 && (
                  <span className="text-rose-500">
                    Absent: <strong>{absentStudents.length}</strong>
                  </span>
                )}
              </div>

              {/* No-Repeat Toggle */}
              <label className="flex items-center gap-2 text-xs font-bold text-[#1a1b22] dark:text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={noRepeatEnabled}
                  onChange={(e) => setNoRepeatEnabled(e.target.checked)}
                  className="w-4 h-4 rounded text-[#4648d4] focus:ring-[#4648d4]"
                />
                <span>No-Repeat (Pick Without Replacement)</span>
              </label>
            </div>

            {/* Live Canvas */}
            <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
              <WheelCanvas
                items={wheelItems}
                palette={['#4648d4', '#006c49', '#dc2c4f', '#6063ee', '#f59e0b', '#10b981']}
                isSpinning={isSpinning}
                preSelectedWinner={preSelected}
                duration={4}
                soundEnabled={soundSettings.enabled}
                soundPack={soundSettings.pack}
                volume={soundSettings.volume}
                onSpinStart={() => setIsSpinning(true)}
                onSpinEnd={handleSpinEnd}
              />
            </div>

            {/* Master Pick Student Button */}
            <div className="w-full flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={handleTriggerSpin}
                disabled={isSpinning || eligibleStudents.length === 0}
                className="flex-1 w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#4648d4] to-[#6063ee] hover:from-[#3a3cb8] hover:to-[#4e51d4] disabled:opacity-50 text-white font-extrabold text-[16px] sm:text-[18px] shadow-lg shadow-[#4648d4]/25 active:scale-[0.99] transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                <Shuffle className="w-5 h-5" />
                <span>{isSpinning ? 'Choosing Student...' : 'Pick Random Student (Space)'}</span>
              </button>

              <button
                type="button"
                onClick={handleResetCalled}
                disabled={calledOn.length === 0}
                className="w-full sm:w-auto px-4 py-4 rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] hover:bg-[#f4f2fd] dark:hover:bg-[#222330] disabled:opacity-40 text-[#464554] dark:text-[#c7c4d7] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                title="Reset all called students back into the pool"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Turns ({calledOn.length})</span>
              </button>
            </div>
          </div>

          {/* Roster & Management Sidebar (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Add Student Input */}
            <div className="bg-white dark:bg-[#181922] rounded-3xl p-5 sm:p-6 border border-[#eeedf7] dark:border-[#292a39] shadow-sm flex flex-col gap-4">
              <h3 className="font-headline font-bold text-[18px] text-[#1a1b22] dark:text-white flex items-center justify-between">
                <span>Class Roster ({students.length})</span>
                <span className="text-xs font-normal text-[#767586] dark:text-[#908fa1]">
                  Click student to mark absent
                </span>
              </h3>

              <form onSubmit={handleAddStudent} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter student name..."
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#eeedf7] dark:border-[#292a39] bg-[#fbf8ff] dark:bg-[#12131a] text-sm text-[#1a1b22] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4648d4]"
                />
                <button
                  type="submit"
                  disabled={!newStudentName.trim()}
                  className="px-4 py-2.5 rounded-xl bg-[#4648d4] hover:bg-[#6063ee] disabled:opacity-40 text-white font-bold text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </form>

              {/* Student Chips Grid */}
              <div className="max-h-[360px] overflow-y-auto space-y-1.5 pr-1">
                {students.map((student) => {
                  const isCalled = calledOn.includes(student);
                  const isAbsent = absentStudents.includes(student);

                  return (
                    <div
                      key={student}
                      className={`flex items-center justify-between p-2.5 rounded-xl text-xs sm:text-sm font-medium border transition-all ${
                        isAbsent
                          ? 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400 line-through'
                          : isCalled
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                          : 'bg-[#fbf8ff] dark:bg-[#12131a] border-[#eeedf7] dark:border-[#292a39] text-[#1a1b22] dark:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <button
                          type="button"
                          onClick={() => handleToggleAbsent(student)}
                          className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 text-xs"
                          title={isAbsent ? 'Mark Present' : 'Mark Absent'}
                        >
                          {isAbsent ? <UserX className="w-3.5 h-3.5 text-rose-500" /> : <UserCheck className="w-3.5 h-3.5 text-[#006c49] dark:text-[#4edea3]" />}
                        </button>
                        <span className="truncate font-semibold">{student}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {isCalled && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-800 dark:text-emerald-200">
                            Called
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveStudent(student)}
                          className="p-1 rounded text-[#767586] hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                          title="Remove student"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Preset Classrooms */}
            <div className="bg-white dark:bg-[#181922] rounded-3xl p-5 sm:p-6 border border-[#eeedf7] dark:border-[#292a39] shadow-sm flex flex-col gap-3">
              <h4 className="font-headline font-bold text-[15px] text-[#1a1b22] dark:text-white">
                Classroom Presets
              </h4>
              <div className="space-y-2">
                {CLASSROOM_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleLoadPreset(preset)}
                    className="w-full text-left p-3 rounded-xl bg-[#f4f2fd] dark:bg-[#1d1e28] hover:bg-[#e8e7f1] dark:hover:bg-[#292a39] transition-colors border border-[#eeedf7] dark:border-[#292a39] cursor-pointer"
                  >
                    <div className="font-bold text-xs text-[#1a1b22] dark:text-white">{preset.title}</div>
                    <div className="text-[11px] text-[#767586] dark:text-[#908fa1] mt-0.5">{preset.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RANDOM TEAM GENERATOR */}
      {activeTab === 'teams' && (
        <div className="bg-white dark:bg-[#181922] rounded-3xl p-6 sm:p-8 border border-[#eeedf7] dark:border-[#292a39] shadow-sm flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#eeedf7] dark:border-[#292a39] pb-4">
            <div>
              <h3 className="font-headline font-bold text-[22px] text-[#1a1b22] dark:text-white">
                Random Team &amp; Group Generator
              </h3>
              <p className="text-xs sm:text-sm text-[#767586] dark:text-[#908fa1] mt-0.5">
                Instantly split present students into balanced, randomized project groups.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-[#f4f2fd] dark:bg-[#1d1e28] px-3 py-2 rounded-xl border border-[#eeedf7] dark:border-[#292a39]">
                <span className="text-xs font-bold text-[#464554] dark:text-[#c7c4d7]">Number of Teams:</span>
                <select
                  value={teamCount}
                  onChange={(e) => setTeamCount(Number(e.target.value))}
                  className="bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#292a39] rounded-lg px-2 py-1 text-xs font-bold text-[#1a1b22] dark:text-white"
                >
                  {[2, 3, 4, 5, 6, 8, 10].map((num) => (
                    <option key={num} value={num}>
                      {num} Teams
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={handleGenerateTeams}
                className="px-4 py-2.5 rounded-xl bg-[#4648d4] hover:bg-[#6063ee] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <Shuffle className="w-4 h-4" />
                <span>Generate Teams</span>
              </button>
            </div>
          </div>

          {/* Generated Teams Grid */}
          {generatedTeams.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#767586] dark:text-[#908fa1] uppercase">
                  {generatedTeams.length} Active Groups Generated
                </span>
                <button
                  type="button"
                  onClick={handleCopyTeams}
                  className="px-3 py-1.5 rounded-lg border border-[#eeedf7] dark:border-[#292a39] bg-[#f4f2fd] dark:bg-[#1d1e28] hover:bg-[#e8e7f1] text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedTeams ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedTeams ? 'Copied to Clipboard' : 'Copy Groups List'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {generatedTeams.map((team, idx) => (
                  <div
                    key={team.name}
                    className="p-4 rounded-2xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] flex flex-col gap-3 shadow-xs"
                  >
                    <div className="flex items-center justify-between border-b border-[#eeedf7] dark:border-[#292a39] pb-2">
                      <h4 className="font-bold text-sm text-[#1a1b22] dark:text-white">
                        {team.name}
                      </h4>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#4648d4]/10 text-[#4648d4] dark:text-[#8587ff] font-bold">
                        {team.members.length}
                      </span>
                    </div>

                    <ul className="space-y-1.5">
                      {team.members.map((member, i) => (
                        <li
                          key={member}
                          className="text-xs text-[#464554] dark:text-[#c7c4d7] flex items-center gap-2"
                        >
                          <span className="w-4 h-4 rounded-full bg-[#eeedf7] dark:bg-[#222330] text-[10px] font-bold flex items-center justify-center shrink-0">
                            {i + 1}
                          </span>
                          <span className="font-medium truncate">{member}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center rounded-2xl bg-[#f4f2fd] dark:bg-[#1d1e28] border border-dashed border-[#eeedf7] dark:border-[#292a39] text-[#767586] dark:text-[#908fa1] flex flex-col items-center gap-2">
              <Users className="w-8 h-8 text-[#4648d4]" />
              <p className="font-semibold text-sm">No teams generated yet.</p>
              <p className="text-xs max-w-sm">
                Choose the desired number of teams above and click &quot;Generate Teams&quot; to distribute {students.length} students.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: READING / PRESENTATION ORDER */}
      {activeTab === 'reading' && (
        <div className="bg-white dark:bg-[#181922] rounded-3xl p-6 sm:p-8 border border-[#eeedf7] dark:border-[#292a39] shadow-sm flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#eeedf7] dark:border-[#292a39] pb-4">
            <div>
              <h3 className="font-headline font-bold text-[22px] text-[#1a1b22] dark:text-white">
                Reading &amp; Presentation Order
              </h3>
              <p className="text-xs sm:text-sm text-[#767586] dark:text-[#908fa1] mt-0.5">
                Generate an unbiased turn list for paragraph reading, oral presentations, or show-and-tell.
              </p>
            </div>

            <button
              type="button"
              onClick={handleGenerateReadingOrder}
              className="px-4 py-2.5 rounded-xl bg-[#4648d4] hover:bg-[#6063ee] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <Shuffle className="w-4 h-4" />
              <span>Randomize Order</span>
            </button>
          </div>

          {readingOrder.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {readingOrder.map((student, idx) => {
                const isDone = completedReaders.includes(student);
                return (
                  <button
                    key={student}
                    type="button"
                    onClick={() => handleToggleReaderCompleted(student)}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isDone
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
                        : 'bg-[#fbf8ff] dark:bg-[#12131a] border-[#eeedf7] dark:border-[#292a39] text-[#1a1b22] dark:text-white hover:border-[#4648d4]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
                        isDone ? 'bg-emerald-500 text-white' : 'bg-[#eeedf7] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff]'
                      }`}>
                        {idx + 1}
                      </span>
                      <span className={`font-semibold text-xs sm:text-sm truncate ${isDone ? 'line-through' : ''}`}>
                        {student}
                      </span>
                    </div>
                    {isDone && <Check className="w-4 h-4 text-emerald-500 shrink-0" />}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center rounded-2xl bg-[#f4f2fd] dark:bg-[#1d1e28] text-[#767586] dark:text-[#908fa1] flex flex-col items-center gap-2">
              <BookOpen className="w-8 h-8 text-[#4648d4]" />
              <p className="font-semibold text-sm">No sequence generated yet.</p>
              <button
                type="button"
                onClick={handleGenerateReadingOrder}
                className="mt-2 px-4 py-2 rounded-xl bg-[#4648d4] text-white font-bold text-xs"
              >
                Create Reading Order
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: CLASSROOM JOBS */}
      {activeTab === 'jobs' && (
        <div className="bg-white dark:bg-[#181922] rounded-3xl p-6 sm:p-8 border border-[#eeedf7] dark:border-[#292a39] shadow-sm flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#eeedf7] dark:border-[#292a39] pb-4">
            <div>
              <h3 className="font-headline font-bold text-[22px] text-[#1a1b22] dark:text-white">
                Weekly Classroom Jobs Assigner
              </h3>
              <p className="text-xs sm:text-sm text-[#767586] dark:text-[#908fa1] mt-0.5">
                Automatically distribute classroom duties fairly each week without favoritism.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAssignJobs}
              className="px-4 py-2.5 rounded-xl bg-[#4648d4] hover:bg-[#6063ee] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <Shuffle className="w-4 h-4" />
              <span>Assign Jobs Fairly</span>
            </button>
          </div>

          {jobAssignments.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {jobAssignments.map((item) => (
                <div
                  key={item.job}
                  className="p-4 rounded-2xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] flex flex-col gap-2"
                >
                  <span className="text-xs font-bold text-[#4648d4] dark:text-[#8587ff]">
                    {item.job}
                  </span>
                  <div className="text-sm font-extrabold text-[#1a1b22] dark:text-white bg-[#f4f2fd] dark:bg-[#1d1e28] p-2.5 rounded-xl border border-[#eeedf7] dark:border-[#292a39] flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-500" />
                    <span>{item.student}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-2xl bg-[#f4f2fd] dark:bg-[#1d1e28] text-[#767586] dark:text-[#908fa1] flex flex-col items-center gap-2">
              <Briefcase className="w-8 h-8 text-[#4648d4]" />
              <p className="font-semibold text-sm">Click below to randomize weekly classroom jobs among students.</p>
              <button
                type="button"
                onClick={handleAssignJobs}
                className="mt-2 px-4 py-2 rounded-xl bg-[#4648d4] text-white font-bold text-xs"
              >
                Assign Jobs Now
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 5 & 6: BRAIN BREAKS & QUIZ PROMPTS (Preset Wheel Experience) */}
      {(activeTab === 'brainbreak' || activeTab === 'quiz') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white dark:bg-[#181922] rounded-3xl p-6 sm:p-8 border border-[#eeedf7] dark:border-[#292a39] shadow-sm flex flex-col items-center gap-6">
            <div className="text-center">
              <h3 className="font-headline font-bold text-[22px] text-[#1a1b22] dark:text-white">
                {activeTab === 'brainbreak' ? 'Brain Break Activator Wheel' : 'Quiz & Question Prompt Wheel'}
              </h3>
              <p className="text-xs text-[#767586] dark:text-[#908fa1] mt-1">
                Spin to select an engaging classroom activity or discussion prompt.
              </p>
            </div>

            <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
              <WheelCanvas
                items={wheelItems}
                palette={['#4648d4', '#006c49', '#dc2c4f', '#6063ee', '#f59e0b', '#10b981']}
                isSpinning={isSpinning}
                preSelectedWinner={preSelected}
                duration={4}
                soundEnabled={soundSettings.enabled}
                soundPack={soundSettings.pack}
                volume={soundSettings.volume}
                onSpinStart={() => setIsSpinning(true)}
                onSpinEnd={handleSpinEnd}
              />
            </div>

            <button
              type="button"
              onClick={handleTriggerSpin}
              disabled={isSpinning}
              className="w-full py-4 px-6 rounded-2xl bg-[#4648d4] hover:bg-[#6063ee] text-white font-extrabold text-base shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-5 h-5" />
              <span>{isSpinning ? 'Spinning Wheel...' : 'Spin Activity Wheel'}</span>
            </button>
          </div>

          <div className="lg:col-span-5 bg-white dark:bg-[#181922] rounded-3xl p-6 sm:p-8 border border-[#eeedf7] dark:border-[#292a39] shadow-sm flex flex-col gap-4">
            <h4 className="font-headline font-bold text-[18px] text-[#1a1b22] dark:text-white">
              Wheel Options ({wheelItems.length})
            </h4>
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {wheelItems.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] text-xs font-semibold text-[#1a1b22] dark:text-white flex items-center gap-2.5"
                >
                  <span className="w-5 h-5 rounded-full bg-[#4648d4]/10 text-[#4648d4] dark:text-[#8587ff] text-[11px] font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Classroom Pedagogical Best Practices & Instructions */}
      <div className="w-full bg-white dark:bg-[#181922] rounded-3xl p-6 sm:p-8 border border-[#eeedf7] dark:border-[#292a39] shadow-sm flex flex-col gap-6">
        <h3 className="font-headline font-extrabold text-[20px] sm:text-[24px] text-[#1a1b22] dark:text-[#f1effa]">
          Educator Guide: Best Practices for Fair Random Selection
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
          <div className="p-4 rounded-2xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] space-y-2">
            <h4 className="font-bold text-sm text-[#1a1b22] dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Equitable Cold Calling</span>
            </h4>
            <p>
              Traditional hand-raising biases participation toward extroverted students. Random picking ensures all students stay actively engaged and mentally prepared to contribute.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] space-y-2">
            <h4 className="font-bold text-sm text-[#1a1b22] dark:text-white flex items-center gap-2">
              <Brain className="w-4 h-4 text-emerald-500" />
              <span>Lowering Classroom Anxiety</span>
            </h4>
            <p>
              When students see that selection is driven by transparent, provably fair algorithms rather than teacher targeting, participation feels like a shared game rather than an interrogation.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] space-y-2">
            <h4 className="font-bold text-sm text-[#1a1b22] dark:text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-500" />
              <span>Diverse Social Mixing</span>
            </h4>
            <p>
              Random team generation breaks up established social cliques and allows students to collaborate with peers they might not otherwise choose to work with.
            </p>
          </div>
        </div>
      </div>

      {/* Celebration Winner Dialog */}
      {winnerModalOpen && currentWinner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-white dark:bg-[#181922] rounded-3xl p-8 border border-[#eeedf7] dark:border-[#292a39] shadow-2xl flex flex-col items-center text-center animate-bounceIn gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 animate-pulse">
              <GraduationCap className="w-9 h-9" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Selected Student!
            </span>

            <h2 className="font-headline font-black text-[32px] sm:text-[38px] text-[#1a1b22] dark:text-white leading-tight">
              {currentWinner}
            </h2>

            {/* Spoken Voice Announcer Button */}
            <div className="mb-2 flex items-center justify-center">
              <button
                type="button"
                onClick={() =>
                  currentWinner &&
                  announceWinnerTTS(currentWinner, {
                    enabled: true,
                    prefix: 'Selected student is'
                  })
                }
                className="px-3 py-1 rounded-full bg-[#f4f2fd] dark:bg-[#222330] hover:bg-[#eae6fd] text-[#4648d4] dark:text-[#8587ff] border border-[#eeedf7] dark:border-[#353648] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Speak student name out loud"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>🔊 Speak Student Name</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[#767586] dark:text-[#908fa1]">
              It&apos;s your turn to participate or share your thoughts!
            </p>

            <div className="w-full flex gap-3 mt-2">
              <button
                type="button"
                onClick={() => setWinnerModalOpen(false)}
                className="flex-1 py-3 px-4 rounded-xl bg-[#4648d4] hover:bg-[#6063ee] text-white font-bold text-sm transition-colors cursor-pointer"
              >
                Continue Lesson
              </button>

              <button
                type="button"
                onClick={() => {
                  setWinnerModalOpen(false);
                  setTimeout(() => handleTriggerSpin(), 200);
                }}
                className="py-3 px-4 rounded-xl border border-[#eeedf7] dark:border-[#292a39] bg-[#f4f2fd] dark:bg-[#1d1e28] text-[#4648d4] dark:text-[#8587ff] font-bold text-sm transition-colors cursor-pointer"
              >
                Pick Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
