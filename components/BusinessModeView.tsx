'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import WheelCanvas from './WheelCanvas';
import WinnerModal from './WinnerModal';
import { WheelItem, SoundSettings } from '@/lib/types';
import { selectWeightedWinner } from '@/lib/random';
import { playWinnerFanfare, playTickSound, playCountdownBeep, announceWinnerTTS } from '@/lib/sound';
import confetti from 'canvas-confetti';
import {
  Briefcase,
  Mic,
  Clock,
  CheckSquare,
  Scale,
  Users,
  MessageSquare,
  Utensils,
  Lightbulb,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Trash2,
  Copy,
  Check,
  Share2,
  Shuffle,
  Sparkles,
  ArrowRight,
  UserCheck
} from 'lucide-react';

interface BusinessModeViewProps {
  soundEnabled: boolean;
  soundPack?: string;
  volume?: number;
}

const BUSINESS_PRESETS = [
  {
    id: 'standup-speakers',
    title: 'Agile Daily Standup Team (8 Engineers)',
    description: 'Determine speaker order for the morning sync without awkward silence.',
    items: ['Alex (Frontend)', 'Beatriz (Backend)', 'Carlos (DevOps)', 'Deepa (Product)', 'Evan (QA)', 'Fatima (Design)', 'George (Mobile)', 'Hannah (Data)']
  },
  {
    id: 'sprint-retro',
    title: 'Sprint Retrospective Prompts (4 Ls & Start/Stop)',
    description: 'Facilitate productive team retrospectives.',
    items: [
      '💖 Liked: What went exceptionally well this sprint?',
      '📚 Learned: What new technical insights did we discover?',
      '📉 Lacked: What blocked our velocity or sprint goals?',
      '🌟 Longed For: What tooling or support do we wish we had?',
      '🛑 Stop: What inefficient meeting or process should we eliminate?',
      '🚀 Start: What new experiment should we try next sprint?'
    ]
  },
  {
    id: 'chore-delegation',
    title: 'Sprint Chores & Rotation Duties',
    description: 'Fairly distribute necessary team maintenance tasks.',
    items: [
      '📝 Meeting Notes & Action Items Scribe',
      '🚨 Primary On-Call & Incident First Responder',
      '🚀 Staging & Production Release Manager',
      '🔍 Pull Request & Code Review Queue Sweeper',
      '🧪 Flaky Test Investigator & Bug Triage Lead',
      '🎉 Friday Team Social & Demo Host'
    ]
  },
  {
    id: 'tech-decision',
    title: 'Architectural & Product Tie-Breaker',
    description: 'Break consensus deadlocks when team votes are evenly split.',
    items: [
      'Option A: Native TypeScript Microservices',
      'Option B: Consolidated Monolithic Architecture',
      'Option C: Serverless Edge Functions',
      'Option D: Hybrid Async Event Queue (Kafka)'
    ]
  },
  {
    id: 'team-lunch',
    title: 'Friday Team Lunch / Delivery Choice',
    description: 'Solve the eternal &quot;where should we eat?&quot; debate in 5 seconds.',
    items: [
      '🍣 Artisan Sushi & Poke Bowls',
      '🌮 Street Tacos & Burritos',
      '🍕 Neapolitan Wood-Fired Pizza',
      '🥗 Gourmet Mediterranean & Salad Bar',
      '🍜 Authentic Japanese Ramen',
      '🍔 Smashburgers & Truffle Fries',
      '🍛 Fragrant Indian Curry & Naan'
    ]
  },
  {
    id: 'workshop-exercises',
    title: 'Design Sprint & Brainstorming Exercises',
    description: 'Interactive innovation exercises for workshops.',
    items: [
      '⚡ Crazy 8s: 8 Rapid Sketches in 8 Minutes',
      '💡 "How Might We" Problem Re-framing',
      '🌟 Lightning Demos (3-Min Competitor Tour)',
      '🤫 Silent Brainwriting & Sticky Note Affinity Mapping',
      '🎯 Dot Voting on Highest-Impact Opportunities',
      '📊 2x2 Effort vs Impact Matrix Placement'
    ]
  }
];

export default function BusinessModeView({
  soundEnabled,
  soundPack = 'arcade',
  volume = 0.8
}: BusinessModeViewProps) {
  // Active Sub-Tool
  const [activeTab, setActiveTab] = useState<'standup' | 'tasks' | 'decision' | 'breakouts' | 'retro' | 'lunch'>('standup');

  // Team Member Roster
  const [teamMembers, setTeamMembers] = useState<string[]>(BUSINESS_PRESETS[0].items);
  const [newMemberName, setNewMemberName] = useState('');
  const [completedSpeakers, setCompletedSpeakers] = useState<string[]>([]);
  const [currentSpeaker, setCurrentSpeaker] = useState<string | null>(null);

  // Standup Countdown Timer (in seconds)
  const [timerDuration, setTimerDuration] = useState<number>(90); // 90s default
  const [timerRemaining, setTimerRemaining] = useState<number>(90);
  const [timerActive, setTimerActive] = useState<boolean>(false);

  // Decision Wheel State
  const [decisionOptions, setDecisionOptions] = useState<string[]>(BUSINESS_PRESETS[3].items);
  const [newDecisionOption, setNewDecisionOption] = useState('');
  const [decisionWinner, setDecisionWinner] = useState<string | null>(null);

  // Wheel State
  const [isSpinning, setIsSpinning] = useState(false);
  const [preSelected, setPreSelected] = useState<{
    winner: WheelItem;
    winnerIndex: number;
    seed: string;
    oddsPercent: string;
  } | null>(null);
  const [winnerModalOpen, setWinnerModalOpen] = useState(false);

  // Task Assignment State
  const [taskAssignments, setTaskAssignments] = useState<{ task: string; assignee: string }[]>([]);

  // Breakout Rooms State
  const [roomCount, setRoomCount] = useState<number>(3);
  const [breakoutRooms, setBreakoutRooms] = useState<{ name: string; members: string[] }[]>([]);

  // Slack/Teams copy state
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Sound settings
  const [soundSettings, setSoundSettings] = useState<SoundSettings>({
    enabled: soundEnabled,
    pack: (soundPack as any) || 'arcade',
    volume,
    ttsEnabled: true
  });

  // Eligible remaining speakers
  const remainingSpeakers = useMemo(() => {
    return teamMembers.filter((m) => !completedSpeakers.includes(m));
  }, [teamMembers, completedSpeakers]);

  // Transform to WheelItems based on activeTab
  const currentWheelItems: WheelItem[] = useMemo(() => {
    const colors = ['#4648d4', '#006c49', '#dc2c4f', '#6063ee', '#f59e0b', '#10b981', '#ec4899', '#06b6d4'];

    if (activeTab === 'standup') {
      const pool = remainingSpeakers.length > 0 ? remainingSpeakers : teamMembers;
      return pool.map((m, idx) => ({
        id: `member-${m}-${idx}`,
        text: m,
        weight: 1,
        color: colors[idx % colors.length]
      }));
    } else if (activeTab === 'decision') {
      return decisionOptions.map((opt, idx) => ({
        id: `opt-${idx}`,
        text: opt,
        weight: 1,
        color: colors[idx % colors.length]
      }));
    } else if (activeTab === 'lunch') {
      return BUSINESS_PRESETS[4].items.map((lunch, idx) => ({
        id: `lunch-${idx}`,
        text: lunch,
        weight: 1,
        color: colors[idx % colors.length]
      }));
    } else if (activeTab === 'retro') {
      return BUSINESS_PRESETS[1].items.map((retro, idx) => ({
        id: `retro-${idx}`,
        text: retro,
        weight: 1,
        color: colors[idx % colors.length]
      }));
    }

    return teamMembers.map((m, idx) => ({
      id: `item-${idx}`,
      text: m,
      weight: 1,
      color: colors[idx % colors.length]
    }));
  }, [activeTab, remainingSpeakers, teamMembers, decisionOptions]);

  // Standup Timer Effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerActive && timerRemaining > 0) {
      timer = setInterval(() => {
        setTimerRemaining((prev) => {
          if (prev <= 1) {
            setTimerActive(false);
            if (soundSettings.enabled) {
              playCountdownBeep(true, soundSettings.enabled, soundSettings.volume);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerActive, timerRemaining, soundSettings]);

  // Spin Trigger
  const handleTriggerSpin = useCallback(() => {
    if (isSpinning || currentWheelItems.length === 0) return;

    const selection = selectWeightedWinner(currentWheelItems);
    setPreSelected(selection);
    setIsSpinning(true);
    setWinnerModalOpen(false);
  }, [isSpinning, currentWheelItems]);

  // Spin End
  const handleSpinEnd = useCallback((winner: WheelItem) => {
    setIsSpinning(false);

    if (activeTab === 'standup') {
      setCurrentSpeaker(winner.text);
      if (!completedSpeakers.includes(winner.text)) {
        setCompletedSpeakers((prev) => [...prev, winner.text]);
      }
      // Start speaker timer
      setTimerRemaining(timerDuration);
      setTimerActive(true);
    } else if (activeTab === 'decision') {
      setDecisionWinner(winner.text);
    }

    setWinnerModalOpen(true);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    if (soundSettings.enabled) {
      playWinnerFanfare(soundSettings.enabled, soundSettings.pack, soundSettings.volume);
      announceWinnerTTS(winner.text, { enabled: true, prefix: 'Selected is' });
    }
  }, [activeTab, completedSpeakers, soundSettings, timerDuration]);

  // Add Team Member
  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newMemberName.trim();
    if (clean && !teamMembers.includes(clean)) {
      setTeamMembers([...teamMembers, clean]);
      setNewMemberName('');
    }
  };

  // Remove Team Member
  const handleRemoveMember = (name: string) => {
    setTeamMembers(teamMembers.filter((m) => m !== name));
    setCompletedSpeakers(completedSpeakers.filter((m) => m !== name));
  };

  // Reset Standup
  const handleResetStandup = () => {
    setCompletedSpeakers([]);
    setCurrentSpeaker(null);
    setTimerActive(false);
    setTimerRemaining(timerDuration);
  };

  // Generate Breakout Rooms
  const handleGenerateBreakoutRooms = () => {
    const shuffled = [...teamMembers];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const count = Math.max(2, Math.min(roomCount, teamMembers.length));
    const rooms: { name: string; members: string[] }[] = Array.from({ length: count }, (_, i) => ({
      name: `Breakout Room ${i + 1}`,
      members: []
    }));

    shuffled.forEach((member, index) => {
      rooms[index % count].members.push(member);
    });

    setBreakoutRooms(rooms);
  };

  // Assign Chores / Tasks
  const handleAssignTasks = () => {
    const chores = BUSINESS_PRESETS[2].items;
    const shuffledMembers = [...teamMembers];
    for (let i = shuffledMembers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledMembers[i], shuffledMembers[j]] = [shuffledMembers[j], shuffledMembers[i]];
    }

    const assignments = chores.map((task, idx) => ({
      task,
      assignee: shuffledMembers[idx % shuffledMembers.length] || 'Unassigned'
    }));

    setTaskAssignments(assignments);
  };

  // Copy Slack/Teams Markdown
  const handleCopySlackFormat = () => {
    let text = `📢 **Agile Sync & Standup Summary** (${new Date().toLocaleDateString()})\n\n`;
    if (completedSpeakers.length > 0) {
      text += `**Speaker Order:**\n` + completedSpeakers.map((s, i) => `${i + 1}. ${s}`).join('\n') + `\n\n`;
    }
    if (taskAssignments.length > 0) {
      text += `**Sprint Chores & Duty Rotations:**\n` + taskAssignments.map((t) => `• ${t.task}: **${t.assignee}**`).join('\n') + `\n\n`;
    }
    text += `_Facilitated via SpinWheelGames.org Business Suite_`;

    navigator.clipboard.writeText(text);
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2000);
  };

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Top Header */}
      <div className="w-full bg-white dark:bg-[#181922] rounded-3xl p-6 sm:p-8 border border-[#eeedf7] dark:border-[#292a39] shadow-sm flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#eeedf7] dark:border-[#292a39] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[12px] font-bold mb-2">
              <Briefcase className="w-4 h-4" />
              <span>Business &amp; Agile Meetings Suite</span>
            </div>
            <h1 className="font-headline font-extrabold text-[26px] sm:text-[34px] text-[#1a1b22] dark:text-[#f1effa] tracking-tight">
              Workplace Randomizer &amp; Decision Wheel
            </h1>
            <p className="text-[14px] text-[#767586] dark:text-[#908fa1] max-w-3xl mt-1">
              Optimized for engineering teams, product managers, and remote facilitators. Seamless daily standups, agenda timeboxers, unbiased consensus tie-breakers, and chore delegations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopySlackFormat}
              className="px-4 py-2.5 rounded-xl border border-[#eeedf7] dark:border-[#292a39] bg-[#f4f2fd] dark:bg-[#1d1e28] hover:bg-[#e8e7f1] text-[#4648d4] dark:text-[#8587ff] text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer"
            >
              {copiedMarkdown ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{copiedMarkdown ? 'Copied Markdown' : 'Copy for Slack / Teams'}</span>
            </button>
          </div>
        </div>

        {/* Feature Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#f4f2fd] dark:bg-[#1d1e28] rounded-2xl border border-[#eeedf7] dark:border-[#292a39]">
          {[
            { id: 'standup', label: 'Daily Standup Speaker Wheel', icon: Mic },
            { id: 'tasks', label: 'Chore & Task Delegation', icon: CheckSquare },
            { id: 'decision', label: 'Decision Tie-Breaker', icon: Scale },
            { id: 'breakouts', label: 'Breakout Pods', icon: Users },
            { id: 'retro', label: 'Retrospective Prompts', icon: MessageSquare },
            { id: 'lunch', label: 'Team Lunch Decider', icon: Utensils }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setWinnerModalOpen(false);
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

      {/* TAB 1: DAILY STANDUP SPEAKER & TIMEBOXER */}
      {activeTab === 'standup' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Wheel & Speaker Stage (7 Cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#181922] rounded-3xl p-6 sm:p-8 border border-[#eeedf7] dark:border-[#292a39] shadow-sm flex flex-col items-center gap-6">
            {/* Active Speaker Banner with Live Countdown Timer */}
            <div className="w-full p-4 rounded-2xl bg-[#f4f2fd] dark:bg-[#1d1e28] border border-[#eeedf7] dark:border-[#292a39] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#4648d4]/10 text-[#4648d4] dark:text-[#8587ff]">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#767586] tracking-wider block">
                    Current Speaker
                  </span>
                  <span className="font-headline font-extrabold text-[18px] text-[#1a1b22] dark:text-white">
                    {currentSpeaker || 'Spin to Choose First Speaker'}
                  </span>
                </div>
              </div>

              {/* Countdown Timeboxer Controls */}
              <div className="flex items-center gap-3 bg-white dark:bg-[#181922] px-3.5 py-2 rounded-xl border border-[#eeedf7] dark:border-[#292a39]">
                <Clock className="w-4 h-4 text-[#4648d4]" />
                <span className={`font-mono font-extrabold text-sm ${timerRemaining <= 15 && timerRemaining > 0 ? 'text-rose-500 animate-pulse' : 'text-[#1a1b22] dark:text-white'}`}>
                  {Math.floor(timerRemaining / 60)}:{(timerRemaining % 60).toString().padStart(2, '0')}
                </span>

                <button
                  type="button"
                  onClick={() => setTimerActive(!timerActive)}
                  className="p-1 rounded text-[#4648d4] hover:bg-[#f4f2fd] dark:hover:bg-[#222330]"
                  title={timerActive ? 'Pause Timer' : 'Start Timer'}
                >
                  {timerActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setTimerActive(false);
                    setTimerRemaining(timerDuration);
                  }}
                  className="p-1 rounded text-[#767586] hover:bg-[#f4f2fd] dark:hover:bg-[#222330]"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Wheel Canvas */}
            <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
              <WheelCanvas
                items={currentWheelItems}
                palette={['#4648d4', '#006c49', '#dc2c4f', '#6063ee', '#f59e0b', '#10b981', '#ec4899']}
                isSpinning={isSpinning}
                preSelectedWinner={preSelected}
                duration={4}
                soundEnabled={soundSettings.enabled}
                soundPack={soundSettings.pack}
                volume={soundSettings.volume}
                onSpinStart={handleTriggerSpin}
                onSpinEnd={handleSpinEnd}
              />
            </div>

            {/* Action Buttons */}
            <div className="w-full flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={handleTriggerSpin}
                disabled={isSpinning || remainingSpeakers.length === 0}
                className="flex-1 w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#4648d4] to-[#6063ee] hover:from-[#3a3cb8] hover:to-[#4e51d4] disabled:opacity-50 text-white font-extrabold text-[16px] shadow-lg shadow-[#4648d4]/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Shuffle className="w-5 h-5" />
                <span>{isSpinning ? 'Choosing Speaker...' : 'Spin Next Speaker (Space)'}</span>
              </button>

              <button
                type="button"
                onClick={handleResetStandup}
                className="w-full sm:w-auto px-4 py-4 rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] hover:bg-[#f4f2fd] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Standup</span>
              </button>
            </div>
          </div>

          {/* Team Roster Sidebar (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white dark:bg-[#181922] rounded-3xl p-5 sm:p-6 border border-[#eeedf7] dark:border-[#292a39] shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-[#eeedf7] dark:border-[#292a39] pb-3">
                <h3 className="font-headline font-bold text-[18px] text-[#1a1b22] dark:text-white">
                  Team Members ({teamMembers.length})
                </h3>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {completedSpeakers.length} / {teamMembers.length} Spoken
                </span>
              </div>

              <form onSubmit={handleAddMember} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add team member..."
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#eeedf7] dark:border-[#292a39] bg-[#fbf8ff] dark:bg-[#12131a] text-xs text-[#1a1b22] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4648d4]"
                />
                <button
                  type="submit"
                  disabled={!newMemberName.trim()}
                  className="px-4 py-2.5 rounded-xl bg-[#4648d4] hover:bg-[#6063ee] disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </form>

              {/* Member List */}
              <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
                {teamMembers.map((member) => {
                  const isDone = completedSpeakers.includes(member);
                  const isCurrent = currentSpeaker === member;

                  return (
                    <div
                      key={member}
                      className={`p-2.5 rounded-xl border text-xs font-medium flex items-center justify-between transition-all ${
                        isCurrent
                          ? 'bg-[#4648d4]/10 border-[#4648d4] text-[#4648d4] dark:text-[#8587ff] font-bold'
                          : isDone
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
                          : 'bg-[#fbf8ff] dark:bg-[#12131a] border-[#eeedf7] dark:border-[#292a39] text-[#1a1b22] dark:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <UserCheck className={`w-4 h-4 ${isDone ? 'text-emerald-500' : 'text-[#767586]'}`} />
                        <span className="truncate">{member}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveMember(member)}
                        className="p-1 rounded text-[#767586] hover:text-rose-500"
                        title="Remove member"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CHORE & TASK DELEGATION MATRIX */}
      {activeTab === 'tasks' && (
        <div className="bg-white dark:bg-[#181922] rounded-3xl p-6 sm:p-8 border border-[#eeedf7] dark:border-[#292a39] shadow-sm flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#eeedf7] dark:border-[#292a39] pb-4">
            <div>
              <h3 className="font-headline font-bold text-[22px] text-[#1a1b22] dark:text-white">
                Sprint Chores &amp; Duty Delegation
              </h3>
              <p className="text-xs sm:text-sm text-[#767586] dark:text-[#908fa1] mt-0.5">
                Fairly distribute on-call, note-taking, release engineering, and code reviews across team members.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAssignTasks}
              className="px-4 py-2.5 rounded-xl bg-[#4648d4] hover:bg-[#6063ee] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <Shuffle className="w-4 h-4" />
              <span>Distribute Duties Fairly</span>
            </button>
          </div>

          {taskAssignments.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {taskAssignments.map((item) => (
                <div
                  key={item.task}
                  className="p-4 rounded-2xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] flex flex-col gap-2"
                >
                  <span className="text-xs font-bold text-[#4648d4] dark:text-[#8587ff]">
                    {item.task}
                  </span>
                  <div className="text-sm font-extrabold text-[#1a1b22] dark:text-white bg-[#f4f2fd] dark:bg-[#1d1e28] p-2.5 rounded-xl border border-[#eeedf7] dark:border-[#292a39] flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-500" />
                    <span>{item.assignee}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-2xl bg-[#f4f2fd] dark:bg-[#1d1e28] text-[#767586] dark:text-[#908fa1] flex flex-col items-center gap-2">
              <CheckSquare className="w-8 h-8 text-[#4648d4]" />
              <p className="font-semibold text-sm">Click above to randomize sprint duties among team members.</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: DECISION TIE-BREAKER WHEEL */}
      {activeTab === 'decision' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white dark:bg-[#181922] rounded-3xl p-6 sm:p-8 border border-[#eeedf7] dark:border-[#292a39] shadow-sm flex flex-col items-center gap-6">
            <div className="text-center">
              <h3 className="font-headline font-bold text-[22px] text-[#1a1b22] dark:text-white">
                Decision &amp; Tie-Breaker Wheel
              </h3>
              <p className="text-xs text-[#767586] dark:text-[#908fa1] mt-1">
                Decisive, unbiased tie-breaker for product debates and architectural choices.
              </p>
            </div>

            <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
              <WheelCanvas
                items={currentWheelItems}
                palette={['#4648d4', '#006c49', '#dc2c4f', '#6063ee', '#f59e0b', '#10b981']}
                isSpinning={isSpinning}
                preSelectedWinner={preSelected}
                duration={4}
                soundEnabled={soundSettings.enabled}
                soundPack={soundSettings.pack}
                volume={soundSettings.volume}
                onSpinStart={handleTriggerSpin}
                onSpinEnd={handleSpinEnd}
              />
            </div>

            <button
              type="button"
              onClick={handleTriggerSpin}
              disabled={isSpinning || decisionOptions.length === 0}
              className="w-full py-4 px-6 rounded-2xl bg-[#4648d4] hover:bg-[#6063ee] text-white font-extrabold text-base shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Scale className="w-5 h-5" />
              <span>{isSpinning ? 'Resolving Debate...' : 'Spin Decision Wheel'}</span>
            </button>
          </div>

          <div className="lg:col-span-5 bg-white dark:bg-[#181922] rounded-3xl p-5 sm:p-6 border border-[#eeedf7] dark:border-[#292a39] shadow-sm flex flex-col gap-4">
            <h4 className="font-headline font-bold text-[18px] text-[#1a1b22] dark:text-white">
              Competing Options ({decisionOptions.length})
            </h4>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (newDecisionOption.trim()) {
                  setDecisionOptions([...decisionOptions, newDecisionOption.trim()]);
                  setNewDecisionOption('');
                }
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                placeholder="Add competing option..."
                value={newDecisionOption}
                onChange={(e) => setNewDecisionOption(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#eeedf7] dark:border-[#292a39] bg-[#fbf8ff] dark:bg-[#12131a] text-xs text-[#1a1b22] dark:text-white"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-[#4648d4] text-white font-bold text-xs"
              >
                Add
              </button>
            </form>

            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {decisionOptions.map((opt, idx) => (
                <div
                  key={opt}
                  className="p-2.5 rounded-xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] text-xs font-semibold text-[#1a1b22] dark:text-white flex items-center justify-between"
                >
                  <span className="truncate">{opt}</span>
                  <button
                    type="button"
                    onClick={() => setDecisionOptions(decisionOptions.filter((o) => o !== opt))}
                    className="p-1 text-[#767586] hover:text-rose-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: WORKSHOP BREAKOUT PODS */}
      {activeTab === 'breakouts' && (
        <div className="bg-white dark:bg-[#181922] rounded-3xl p-6 sm:p-8 border border-[#eeedf7] dark:border-[#292a39] shadow-sm flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#eeedf7] dark:border-[#292a39] pb-4">
            <div>
              <h3 className="font-headline font-bold text-[22px] text-[#1a1b22] dark:text-white">
                Workshop &amp; Hackathon Breakout Pods
              </h3>
              <p className="text-xs sm:text-sm text-[#767586] dark:text-[#908fa1] mt-0.5">
                Quickly split company all-hands or workshops into balanced breakout groups.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={roomCount}
                onChange={(e) => setRoomCount(Number(e.target.value))}
                className="bg-[#f4f2fd] dark:bg-[#1d1e28] border border-[#eeedf7] dark:border-[#292a39] rounded-xl px-3 py-2 text-xs font-bold text-[#1a1b22] dark:text-white"
              >
                {[2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} Rooms
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={handleGenerateBreakoutRooms}
                className="px-4 py-2.5 rounded-xl bg-[#4648d4] hover:bg-[#6063ee] text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
              >
                <Shuffle className="w-4 h-4" />
                <span>Assign Pods</span>
              </button>
            </div>
          </div>

          {breakoutRooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {breakoutRooms.map((room) => (
                <div
                  key={room.name}
                  className="p-4 rounded-2xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] flex flex-col gap-3"
                >
                  <h4 className="font-bold text-sm text-[#1a1b22] dark:text-white border-b border-[#eeedf7] dark:border-[#292a39] pb-2">
                    {room.name}
                  </h4>
                  <ul className="space-y-1.5">
                    {room.members.map((m) => (
                      <li key={m} className="text-xs text-[#464554] dark:text-[#c7c4d7] flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#4648d4]" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-2xl bg-[#f4f2fd] dark:bg-[#1d1e28] text-[#767586] dark:text-[#908fa1] text-xs">
              Select room count and click &quot;Assign Pods&quot; to distribute attendees.
            </div>
          )}
        </div>
      )}

      {/* TAB 5 & 6: RETRO PROMPTS & TEAM LUNCH */}
      {(activeTab === 'retro' || activeTab === 'lunch') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white dark:bg-[#181922] rounded-3xl p-6 sm:p-8 border border-[#eeedf7] dark:border-[#292a39] shadow-sm flex flex-col items-center gap-6">
            <div className="text-center">
              <h3 className="font-headline font-bold text-[22px] text-[#1a1b22] dark:text-white">
                {activeTab === 'retro' ? 'Sprint Retrospective Wheel' : 'Friday Team Lunch Wheel'}
              </h3>
              <p className="text-xs text-[#767586] dark:text-[#908fa1] mt-1">
                Spin to randomize retrospective discussion topics or pick today’s team meal.
              </p>
            </div>

            <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">
              <WheelCanvas
                items={currentWheelItems}
                palette={['#4648d4', '#006c49', '#dc2c4f', '#6063ee', '#f59e0b', '#10b981']}
                isSpinning={isSpinning}
                preSelectedWinner={preSelected}
                duration={4}
                soundEnabled={soundSettings.enabled}
                soundPack={soundSettings.pack}
                volume={soundSettings.volume}
                onSpinStart={handleTriggerSpin}
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
              <span>{isSpinning ? 'Spinning Wheel...' : 'Spin Wheel'}</span>
            </button>
          </div>

          <div className="lg:col-span-5 bg-white dark:bg-[#181922] rounded-3xl p-5 sm:p-6 border border-[#eeedf7] dark:border-[#292a39] shadow-sm flex flex-col gap-4">
            <h4 className="font-headline font-bold text-[18px] text-[#1a1b22] dark:text-white">
              Wheel Options ({currentWheelItems.length})
            </h4>
            <div className="space-y-2 max-h-[360px] overflow-y-auto">
              {currentWheelItems.map((item, idx) => (
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

      {/* Winner Modal */}
      {winnerModalOpen && preSelected && (
        <WinnerModal
          isOpen={winnerModalOpen}
          winner={preSelected.winner}
          items={currentWheelItems}
          palette={['#4648d4', '#006c49', '#dc2c4f', '#6063ee', '#f59e0b', '#10b981']}
          wheelTitle={
            activeTab === 'standup'
              ? 'Standup Speaker'
              : activeTab === 'decision'
              ? 'Decision & Tie-Breaker'
              : activeTab === 'retro'
              ? 'Retrospective Prompt'
              : 'Team Lunch'
          }
          oddsPercent={preSelected.oddsPercent}
          seed={preSelected.seed}
          spinNumber={1}
          soundEnabled={soundSettings.enabled}
          soundPack={soundSettings.pack}
          volume={soundSettings.volume}
          ttsEnabled={soundSettings.ttsEnabled}
          onClose={() => setWinnerModalOpen(false)}
          onSpinAgain={() => {
            setWinnerModalOpen(false);
            setTimeout(() => handleTriggerSpin(), 150);
          }}
          onRemoveWinner={(toRemove) => {
            if (activeTab === 'standup') {
              handleRemoveMember(toRemove.text);
            } else if (activeTab === 'decision') {
              setDecisionOptions((prev) => prev.filter((opt) => opt !== toRemove.text));
            }
            setWinnerModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
