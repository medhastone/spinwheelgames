'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Users,
  Shuffle,
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
  Download,
  Share2,
  ShieldCheck,
  Zap,
  Sliders,
  X,
  Layers,
  Award,
  Crown,
  Printer,
  FileText,
  UserCheck,
  Settings2,
  RefreshCw,
  ArrowRightLeft
} from 'lucide-react';
import {
  playTickSound,
  playWinnerFanfare,
  playClickSound,
  unlockAudioContext
} from '@/lib/sound';

// Hardware-grade Web Crypto CSPRNG
function getRandomInt(max: number): number {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0] % max;
  }
  return Math.floor(Math.random() * max);
}

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = getRandomInt(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Preset Team Name Themes
const TEAM_NAME_THEMES: Record<string, string[]> = {
  animals: [
    'Fierce Tigers', 'Shadow Wolves', 'Golden Eagles', 'Thunder Hawks',
    'Midnight Panthers', 'Iron Bears', 'Cyber Cobras', 'Arctic Foxes',
    'Wild Stallions', 'Desert Scorpions', 'Mighty Lions', 'Storm Falcons'
  ],
  mythical: [
    'Solar Phoenix', 'Frost Dragons', 'Mystic Titans', 'Shadow Krakens',
    'Cosmic Griffins', 'Blaze Hydras', 'Thunder Chimera', 'Astral Valkyries',
    'Iron Golems', 'Inferno Behemoths', 'Vortex Leviathans', 'Ethereal Wyrms'
  ],
  colors: [
    'Team Crimson', 'Team Sapphire', 'Team Emerald', 'Team Amber',
    'Team Violet', 'Team Obsidian', 'Team Cyan', 'Team Coral',
    'Team Platinum', 'Team Topaz', 'Team Indigo', 'Team Scarlet'
  ],
  cyber: [
    'Neon Glitch', 'Quantum Core', 'Cyber Pulse', 'Binary Sparks',
    'Vector Surge', 'Pixel Matrix', 'Neural Grid', 'Hyper Drive',
    'Circuit Shifters', 'Data Knights', 'Apex Protocol', 'Synapse X'
  ],
  sports: [
    'Red Vipers', 'Blue Blitz', 'Green Dynamos', 'Yellow Thunder',
    'Purple Storm', 'Black Knights', 'Orange Velocity', 'White Apex',
    'Silver Strikers', 'Gold Champions', 'Iron Force', 'Royal Raptors'
  ]
};

// Ready-to-use Roster Presets
const ROSTER_PRESETS = [
  {
    id: 'classroom-20',
    title: 'Classroom Roster (20 Students)',
    category: 'Education',
    members: [
      'Alexander M.', 'Sophia T.', 'Liam K.', 'Emma W.', 'Noah B.',
      'Olivia R.', 'Ethan C.', 'Ava D.', 'Lucas H.', 'Isabella N.',
      'Mason G.', 'Mia S.', 'Oliver P.', 'Charlotte F.', 'Elijah J.',
      'Amelia L.', 'James V.', 'Harper Z.', 'Benjamin Q.', 'Evelyn Y.'
    ]
  },
  {
    id: 'sports-5v5',
    title: '5v5 Basketball / MOBA (10 Players)',
    category: 'Sports & Gaming',
    members: [
      'Marcus (PG)', 'Devon (SG)', 'Tyler (SF)', 'Andre (PF)', 'Jordan (C)',
      'Carlos (PG)', 'Zack (SG)', 'Liam (SF)', 'Brandon (PF)', 'Darius (C)'
    ]
  },
  {
    id: 'squads-4v4',
    title: 'Battle Royale Squads (16 Players)',
    category: 'Gaming',
    members: [
      'Viper_01', 'Ghost_Rider', 'Shadow_Sniper', 'Frost_Bite',
      'Nova_Blast', 'Cyber_Hawk', 'Pixel_Warrior', 'Apex_Hunter',
      'Storm_Breaker', 'Blaze_Runner', 'Night_Stalker', 'Iron_Shield',
      'Quantum_Ace', 'Echo_Strike', 'Turbo_Boost', 'Vortex_King'
    ]
  },
  {
    id: 'hackathon-pods',
    title: 'Hackathon / Agile Pods (12 Members)',
    category: 'Work & Projects',
    members: [
      'Sarah (Frontend)', 'Marco (Backend)', 'Priya (UI/UX)', 'Devon (PM)',
      'Kenji (Fullstack)', 'Elena (Data/AI)', 'Alex (DevOps)', 'Chloe (Mobile)',
      'Sam (Security)', 'Zoe (QA)', 'David (Backend)', 'Maya (Product)'
    ]
  },
  {
    id: 'pub-trivia',
    title: 'Pub Quiz & Trivia Night (16 Friends)',
    category: 'Party & Social',
    members: [
      'Alice', 'Bob', 'Charlie', 'Diana',
      'Evan', 'Fiona', 'George', 'Hannah',
      'Ian', 'Jack', 'Katie', 'Leo',
      'Mona', 'Nate', 'Olivia', 'Paul'
    ]
  }
];

export interface TeamOutput {
  id: string;
  name: string;
  color: string;
  members: string[];
}

const TEAM_PALETTES = [
  { bg: 'bg-blue-500/15 dark:bg-blue-500/25', border: 'border-blue-500/40', text: 'text-blue-600 dark:text-blue-400', badge: 'bg-blue-500 text-white' },
  { bg: 'bg-emerald-500/15 dark:bg-emerald-500/25', border: 'border-emerald-500/40', text: 'text-emerald-600 dark:text-emerald-400', badge: 'bg-emerald-500 text-white' },
  { bg: 'bg-purple-500/15 dark:bg-purple-500/25', border: 'border-purple-500/40', text: 'text-purple-600 dark:text-purple-400', badge: 'bg-purple-500 text-white' },
  { bg: 'bg-amber-500/15 dark:bg-amber-500/25', border: 'border-amber-500/40', text: 'text-amber-600 dark:text-amber-400', badge: 'bg-amber-500 text-white' },
  { bg: 'bg-rose-500/15 dark:bg-rose-500/25', border: 'border-rose-500/40', text: 'text-rose-600 dark:text-rose-400', badge: 'bg-rose-500 text-white' },
  { bg: 'bg-cyan-500/15 dark:bg-cyan-500/25', border: 'border-cyan-500/40', text: 'text-cyan-600 dark:text-cyan-400', badge: 'bg-cyan-500 text-white' },
  { bg: 'bg-orange-500/15 dark:bg-orange-500/25', border: 'border-orange-500/40', text: 'text-orange-600 dark:text-orange-400', badge: 'bg-orange-500 text-white' },
  { bg: 'bg-indigo-500/15 dark:bg-indigo-500/25', border: 'border-indigo-500/40', text: 'text-indigo-600 dark:text-indigo-400', badge: 'bg-indigo-500 text-white' },
  { bg: 'bg-teal-500/15 dark:bg-teal-500/25', border: 'border-teal-500/40', text: 'text-teal-600 dark:text-teal-400', badge: 'bg-teal-500 text-white' },
  { bg: 'bg-pink-500/15 dark:bg-pink-500/25', border: 'border-pink-500/40', text: 'text-pink-600 dark:text-pink-400', badge: 'bg-pink-500 text-white' },
  { bg: 'bg-lime-500/15 dark:bg-lime-500/25', border: 'border-lime-500/40', text: 'text-lime-600 dark:text-lime-400', badge: 'bg-lime-500 text-white' },
  { bg: 'bg-violet-500/15 dark:bg-violet-500/25', border: 'border-violet-500/40', text: 'text-violet-600 dark:text-violet-400', badge: 'bg-violet-500 text-white' }
];

export default function TeamGeneratorEngine() {
  // Primary State
  const [inputText, setInputText] = useState<string>(
    ROSTER_PRESETS[0].members.join('\n')
  );
  const [splitMode, setSplitMode] = useState<'numTeams' | 'perTeam'>('numTeams');
  const [numTeams, setNumTeams] = useState<number>(4);
  const [membersPerTeam, setMembersPerTeam] = useState<number>(5);
  const [teamNameTheme, setTeamNameTheme] = useState<string>('animals');
  const [assignCaptains, setAssignCaptains] = useState<boolean>(false);
  const [balanceGenderRoles, setBalanceGenderRoles] = useState<boolean>(false);

  // Generated Teams State
  const [teams, setTeams] = useState<TeamOutput[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedFormat, setCopiedFormat] = useState<'text' | 'csv' | 'markdown' | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'generator' | 'wheelDraft' | 'presets'>('generator');
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  // Wheel Draft State
  const [undraftedMembers, setUndraftedMembers] = useState<string[]>([]);
  const [draftTargetTeam, setDraftTargetTeam] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [wheelRotation, setWheelRotation] = useState<number>(0);
  const [lastDraftedMember, setLastDraftedMember] = useState<{ member: string; team: string } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Parse Member List
  const rawMembers = useMemo(() => {
    return inputText
      .split('\n')
      .map((m) => m.trim())
      .filter((m) => m.length > 0);
  }, [inputText]);

  // Generate Teams Logic
  const handleGenerateTeams = useCallback(() => {
    if (rawMembers.length === 0) return;

    if (soundEnabled) {
      unlockAudioContext();
      playClickSound();
    }

    const shuffled = shuffleArray(rawMembers);
    const themeNames = TEAM_NAME_THEMES[teamNameTheme] || TEAM_NAME_THEMES.animals;
    let targetTeamCount = 2;

    if (splitMode === 'numTeams') {
      targetTeamCount = Math.max(2, Math.min(numTeams, rawMembers.length));
    } else {
      const size = Math.max(1, membersPerTeam);
      targetTeamCount = Math.max(2, Math.ceil(rawMembers.length / size));
    }

    const newTeams: TeamOutput[] = Array.from({ length: targetTeamCount }, (_, i) => ({
      id: `team-${i + 1}`,
      name: themeNames[i % themeNames.length] || `Team ${i + 1}`,
      color: TEAM_PALETTES[i % TEAM_PALETTES.length].bg,
      members: []
    }));

    // Distribute members evenly (Round-robin)
    shuffled.forEach((member, index) => {
      const teamIdx = index % targetTeamCount;
      newTeams[teamIdx].members.push(member);
    });

    setTeams(newTeams);
    setUndraftedMembers(shuffled);
    setDraftTargetTeam(0);

    // Trigger celebratory sound & confetti
    if (soundEnabled) {
      playWinnerFanfare();
    }
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  }, [rawMembers, splitMode, numTeams, membersPerTeam, teamNameTheme, soundEnabled]);

  // Initial generation on mount
  useEffect(() => {
    handleGenerateTeams();
  }, []);

  // Quick preset loader
  const handleLoadPreset = (preset: typeof ROSTER_PRESETS[0]) => {
    setInputText(preset.members.join('\n'));
    if (preset.members.length >= 16) {
      setNumTeams(4);
    } else if (preset.members.length >= 10) {
      setNumTeams(2);
    } else {
      setNumTeams(2);
    }
    setActiveTab('generator');
    setTimeout(() => {
      handleGenerateTeams();
    }, 50);
  };

  // Swap Member or Move
  const handleMoveMember = (fromTeamIdx: number, memberIdx: number, toTeamIdx: number) => {
    if (fromTeamIdx === toTeamIdx) return;
    setTeams((prev) => {
      const next = prev.map((t) => ({ ...t, members: [...t.members] }));
      const member = next[fromTeamIdx].members.splice(memberIdx, 1)[0];
      if (member) {
        next[toTeamIdx].members.push(member);
      }
      return next;
    });
  };

  // Rename team
  const handleRenameTeam = (teamIdx: number, newName: string) => {
    setTeams((prev) => {
      const next = [...prev];
      next[teamIdx] = { ...next[teamIdx], name: newName };
      return next;
    });
  };

  // Copy Formatted Teams
  const handleCopyTeams = (format: 'text' | 'csv' | 'markdown') => {
    if (teams.length === 0) return;

    let text = '';
    if (format === 'text') {
      text = teams
        .map((t) => `${t.name} (${t.members.length}):\n${t.members.map((m, i) => `  ${i + 1}. ${m}`).join('\n')}`)
        .join('\n\n');
    } else if (format === 'csv') {
      const maxMembers = Math.max(...teams.map((t) => t.members.length));
      const headers = teams.map((t) => `"${t.name}"`).join(',');
      const rows: string[] = [headers];
      for (let r = 0; r < maxMembers; r++) {
        const row = teams.map((t) => `"${t.members[r] || ''}"`).join(',');
        rows.push(row);
      }
      text = rows.join('\n');
    } else if (format === 'markdown') {
      text = teams
        .map((t) => `### 🏆 ${t.name}\n${t.members.map((m) => `- ${m}`).join('\n')}`)
        .join('\n\n');
    }

    navigator.clipboard.writeText(text);
    setCopied(true);
    setCopiedFormat(format);
    setTimeout(() => {
      setCopied(false);
      setCopiedFormat(null);
    }, 2000);
  };

  // Download CSV
  const handleDownloadCsv = () => {
    if (teams.length === 0) return;
    const maxMembers = Math.max(...teams.map((t) => t.members.length));
    const headers = teams.map((t) => `"${t.name}"`).join(',');
    const rows: string[] = [headers];
    for (let r = 0; r < maxMembers; r++) {
      const row = teams.map((t) => `"${t.members[r] || ''}"`).join(',');
      rows.push(row);
    }
    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(rows.join('\n'));
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', `random_teams_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print Friendly
  const handlePrint = () => {
    window.print();
  };

  // Draw Interactive Wheel for Live Draft Mode
  useEffect(() => {
    if (activeTab !== 'wheelDraft') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 20;

    ctx.clearRect(0, 0, width, height);

    const items = undraftedMembers.length > 0 ? undraftedMembers : ['All Drafted!'];
    const totalSlices = items.length;
    const sliceAngle = (2 * Math.PI) / totalSlices;

    // Outer glow
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 8, 0, 2 * Math.PI);
    ctx.strokeStyle = '#3b82f644';
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.restore();

    // Slices
    items.forEach((item, index) => {
      const startAngle = wheelRotation + index * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      const paletteIdx = index % TEAM_PALETTES.length;
      const baseColors = [
        '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6',
        '#ec4899', '#06b6d4', '#ef4444', '#84cc16',
        '#f97316', '#6366f1', '#14b8a6', '#d946ef'
      ];
      ctx.fillStyle = baseColors[paletteIdx];
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      // Text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 13px system-ui, sans-serif';
      ctx.shadowColor = 'rgba(0,0,0,0.6)';
      ctx.shadowBlur = 4;

      const maxTextLen = 14;
      const displayText = item.length > maxTextLen ? item.substring(0, maxTextLen) + '...' : item;
      ctx.fillText(displayText, radius - 20, 5);
      ctx.restore();
    });

    // Center Pin / Hub
    ctx.beginPath();
    ctx.arc(centerX, centerY, 28, 0, 2 * Math.PI);
    ctx.fillStyle = '#1e293b';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI);
    ctx.fillStyle = '#3b82f6';
    ctx.fill();
  }, [activeTab, undraftedMembers, wheelRotation]);

  // Spin Wheel Draft
  const handleSpinDraft = () => {
    if (isSpinning || undraftedMembers.length === 0 || teams.length === 0) return;

    if (soundEnabled) {
      unlockAudioContext();
      playClickSound();
    }

    setIsSpinning(true);

    const winningIdx = getRandomInt(undraftedMembers.length);
    const winningMember = undraftedMembers[winningIdx];
    const totalSlices = undraftedMembers.length;
    const sliceAngle = (2 * Math.PI) / totalSlices;

    // Pointer is at 3 o'clock (0 rad) or top (3PI/2)
    // Calculate target angle
    const targetSliceCenter = winningIdx * sliceAngle + sliceAngle / 2;
    const fullSpins = 5 + getRandomInt(3);
    const finalAngle = fullSpins * 2 * Math.PI + (3 * Math.PI / 2 - targetSliceCenter);

    const startTime = performance.now();
    const duration = 3800;
    const startAngle = wheelRotation;

    let lastTickAngle = startAngle;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentAngle = startAngle + (finalAngle - startAngle) * easeOut;

      setWheelRotation(currentAngle);

      // Sound ticks
      if (soundEnabled && Math.abs(currentAngle - lastTickAngle) >= sliceAngle) {
        playTickSound();
        lastTickAngle = currentAngle;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);

        // Assign to current draft team
        const targetTeam = teams[draftTargetTeam % teams.length];
        setTeams((prev) => {
          const next = [...prev];
          const tIdx = draftTargetTeam % next.length;
          next[tIdx] = {
            ...next[tIdx],
            members: [...next[tIdx].members, winningMember]
          };
          return next;
        });

        // Remove from undrafted
        setUndraftedMembers((prev) => prev.filter((_, idx) => idx !== winningIdx));
        setLastDraftedMember({ member: winningMember, team: targetTeam.name });
        setDraftTargetTeam((prev) => (prev + 1) % teams.length);

        if (soundEnabled) {
          playWinnerFanfare();
        }
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div
      ref={containerRef}
      className={`w-full rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-all ${
        fullscreen ? 'fixed inset-0 z-50 rounded-none overflow-y-auto p-4 sm:p-8' : ''
      }`}
    >
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-4 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-200/80 dark:bg-slate-700/80 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setActiveTab('generator')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'generator'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Instant Divider</span>
            </button>
            <button
              onClick={() => setActiveTab('wheelDraft')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'wheelDraft'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live Wheel Draft</span>
            </button>
            <button
              onClick={() => setActiveTab('presets')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'presets'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Presets</span>
            </button>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 shadow-sm"
            title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={handlePrint}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 shadow-sm"
            title="Print Team Cards"
          >
            <Printer className="w-4 h-4" />
          </button>
          <button
            onClick={() => setFullscreen(!fullscreen)}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 shadow-sm"
            title={fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {fullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* TAB 1: INSTANT GENERATOR */}
      {activeTab === 'generator' && (
        <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Configuration & Roster Input (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span>Participant Names ({rawMembers.length})</span>
                </label>
                <button
                  onClick={() => setInputText('')}
                  className="text-xs text-rose-500 hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              </div>

              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste names here, one per line..."
                rows={9}
                className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-sm font-mono text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed resize-y"
              />
            </div>

            {/* Split Settings */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                  Division Rule
                </span>
                <div className="flex bg-slate-200/80 dark:bg-slate-700/80 p-0.5 rounded-lg text-xs font-bold">
                  <button
                    onClick={() => setSplitMode('numTeams')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      splitMode === 'numTeams'
                        ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    By # of Teams
                  </button>
                  <button
                    onClick={() => setSplitMode('perTeam')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      splitMode === 'perTeam'
                        ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    By Members / Team
                  </button>
                </div>
              </div>

              {splitMode === 'numTeams' ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">Number of Teams:</span>
                    <span className="font-black text-blue-600 dark:text-blue-400 text-base">{numTeams} Teams</span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={Math.max(2, Math.min(12, rawMembers.length || 12))}
                    value={numTeams}
                    onChange={(e) => setNumTeams(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400 font-mono">
                    <span>2 Teams</span>
                    <span>6 Teams</span>
                    <span>12 Teams</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">Members per Team:</span>
                    <span className="font-black text-blue-600 dark:text-blue-400 text-base">{membersPerTeam} Members</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={Math.max(2, Math.min(10, rawMembers.length || 10))}
                    value={membersPerTeam}
                    onChange={(e) => setMembersPerTeam(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400 font-mono">
                    <span>1 / Team</span>
                    <span>5 / Team</span>
                    <span>10 / Team</span>
                  </div>
                </div>
              )}

              {/* Team Name Themes */}
              <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-700">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Team Name Theme:
                </label>
                <select
                  value={teamNameTheme}
                  onChange={(e) => setTeamNameTheme(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="animals">🦁 Animals & Predators (Fierce Tigers, Wolves)</option>
                  <option value="mythical">🐉 Mythical Beasts (Phoenix, Dragons, Titans)</option>
                  <option value="colors">🎨 Vibrant Colors (Crimson, Sapphire, Emerald)</option>
                  <option value="cyber">⚡ Cyber & High-Tech (Quantum Core, Neon Glitch)</option>
                  <option value="sports">🏆 Sports & Competitions (Vipers, Blitz, Strikers)</option>
                </select>
              </div>

              {/* Advanced Options */}
              <div className="flex items-center justify-between pt-2">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={assignCaptains}
                    onChange={(e) => setAssignCaptains(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span>Designate 1st Member as Captain 👑</span>
                </label>
              </div>
            </div>

            {/* Primary Generate Button */}
            <button
              onClick={handleGenerateTeams}
              disabled={rawMembers.length === 0}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all transform active:scale-[0.99] flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Shuffle className="w-5 h-5" />
              <span>Generate Fair Random Teams</span>
            </button>
          </div>

          {/* Right Column: Generated Teams Output Board (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span>Generated Teams ({teams.length})</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Total {rawMembers.length} participants split across {teams.length} groups
                </p>
              </div>

              {/* Copy & Export Toolbar */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => handleCopyTeams('text')}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-blue-500 flex items-center gap-1.5 shadow-sm"
                >
                  {copied && copiedFormat === 'text' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy Text</span>
                </button>
                <button
                  onClick={() => handleCopyTeams('markdown')}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-blue-500 flex items-center gap-1.5 shadow-sm"
                >
                  {copied && copiedFormat === 'markdown' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <FileText className="w-3.5 h-3.5" />}
                  <span>Markdown</span>
                </button>
                <button
                  onClick={handleDownloadCsv}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-blue-500 flex items-center gap-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CSV</span>
                </button>
              </div>
            </div>

            {/* Teams Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[580px] overflow-y-auto pr-1">
              {teams.map((team, tIdx) => {
                const palette = TEAM_PALETTES[tIdx % TEAM_PALETTES.length];
                return (
                  <div
                    key={team.id}
                    className={`p-4 rounded-2xl border ${palette.border} ${palette.bg} transition-all space-y-3 relative group`}
                  >
                    {/* Team Header */}
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="text"
                        value={team.name}
                        onChange={(e) => handleRenameTeam(tIdx, e.target.value)}
                        className="font-black text-sm text-slate-900 dark:text-white bg-transparent border-b border-transparent hover:border-slate-400 focus:border-blue-500 focus:outline-none px-1 py-0.5 w-full rounded"
                      />
                      <span className={`text-[11px] font-black px-2 py-0.5 rounded-full ${palette.badge} flex-shrink-0`}>
                        {team.members.length}
                      </span>
                    </div>

                    {/* Member List */}
                    <div className="space-y-1.5 min-h-[90px]">
                      {team.members.length === 0 ? (
                        <p className="text-xs text-slate-600 dark:text-slate-400 italic py-2">No members assigned yet.</p>
                      ) : (
                        team.members.map((member, mIdx) => (
                          <div
                            key={mIdx}
                            className="flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-800 dark:text-slate-200 shadow-xs"
                          >
                            <span className="flex items-center gap-1.5 font-medium truncate">
                              {assignCaptains && mIdx === 0 && (
                                <Crown className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                              )}
                              <span className="text-slate-600 dark:text-slate-400 font-mono text-[11px] w-4">
                                {mIdx + 1}.
                              </span>
                              <span className="truncate">{member}</span>
                            </span>

                            {/* Move Member Quick Dropdown */}
                            {teams.length > 1 && (
                              <select
                                onChange={(e) => handleMoveMember(tIdx, mIdx, parseInt(e.target.value))}
                                value={tIdx}
                                className="opacity-0 group-hover:opacity-100 focus:opacity-100 text-[10px] bg-slate-100 dark:bg-slate-700 rounded px-1 py-0.5 border border-slate-300 dark:border-slate-600 cursor-pointer transition-opacity"
                                title="Move member to another team"
                              >
                                {teams.map((otherTeam, oIdx) => (
                                  <option key={oIdx} value={oIdx}>
                                    {oIdx === tIdx ? 'Move...' : `-> ${otherTeam.name}`}
                                  </option>
                                ))}
                              </select>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Reshuffle Button */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={handleGenerateTeams}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Re-Shuffle All Teams</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LIVE WHEEL DRAFT */}
      {activeTab === 'wheelDraft' && (
        <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Wheel Canvas Column (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-4">
            <div className="relative">
              {/* Top Pointer Indicator */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-rose-500 drop-shadow-md" />

              <canvas
                ref={canvasRef}
                width={360}
                height={360}
                className="w-full max-w-[min(90vw,360px)] aspect-square sm:max-w-[400px] rounded-full shadow-2xl cursor-pointer touch-manipulation"
                onClick={handleSpinDraft}
              />
            </div>

            <div className="text-center space-y-2">
              <button
                onClick={handleSpinDraft}
                disabled={isSpinning || undraftedMembers.length === 0}
                className="py-3 px-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 flex items-center gap-2 mx-auto"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isSpinning ? 'Drafting Player...' : 'SPIN TO DRAFT NEXT PLAYER'}</span>
              </button>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {undraftedMembers.length} players remaining in draft pool
              </p>
            </div>
          </div>

          {/* Live Draft Board Column (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            {lastDraftedMember && (
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
                <Crown className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                    Just Drafted: <span className="font-black text-sm">{lastDraftedMember.member}</span>
                  </div>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400">
                    Assigned to {lastDraftedMember.team}
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Live Draft Status: Drafting for{' '}
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  {teams[draftTargetTeam % (teams.length || 1)]?.name}
                </span>
              </h4>

              {teams.map((t, idx) => (
                <div
                  key={t.id}
                  className={`p-3 rounded-xl border ${
                    draftTargetTeam % teams.length === idx
                      ? 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-500/5'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                    <span className="text-slate-900 dark:text-white">{t.name}</span>
                    <span className="text-slate-600 dark:text-slate-400">{t.members.length} drafted</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {t.members.length === 0 ? (
                      <span className="text-[11px] text-slate-600 dark:text-slate-400 italic">Waiting for picks...</span>
                    ) : (
                      t.members.map((m, mIdx) => (
                        <span
                          key={mIdx}
                          className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px] font-medium text-slate-800 dark:text-slate-200"
                        >
                          {m}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: READY-TO-USE PRESETS */}
      {activeTab === 'presets' && (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              Instant Roster Presets
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Click any template to prefill the roster and generate balanced groups immediately.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ROSTER_PRESETS.map((p) => (
              <div
                key={p.id}
                onClick={() => handleLoadPreset(p)}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 hover:bg-white dark:bg-slate-800/50 dark:hover:bg-slate-800 hover:border-blue-500 dark:hover:border-blue-500 cursor-pointer transition-all space-y-2 group shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    {p.category}
                  </span>
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                    {p.members.length} Members
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {p.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                  {p.members.slice(0, 5).join(', ')}...
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
