'use client';

import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import WheelCanvas from './WheelCanvas';
import SpinButton from './SpinButton';
import WinnerModal from './WinnerModal';
import BulkPasteModal from './BulkPasteModal';
import ResultCardModal from './ResultCardModal';
import ClassroomModeView from './ClassroomModeView';
import GiveawayModeView from './GiveawayModeView';
import TeamGeneratorEngine from './team/TeamGeneratorEngine';
import { WheelItem, SoundSettings, ResultCardData } from '@/lib/types';
import { selectWeightedWinner } from '@/lib/random';
import {
  Users,
  GraduationCap,
  Gift,
  Layers,
  Shuffle,
  ArrowDownAZ,
  Trash2,
  Upload,
  Copy,
  Check,
  Share2,
  Sparkles,
  ShieldCheck,
  Sliders,
  History,
  FileText,
  Maximize2,
  Minimize2,
  Download,
  RotateCcw,
  Undo2,
  Redo2,
  ListOrdered,
  Palette,
  Volume2,
  VolumeX,
  Heart,
  UserX
} from 'lucide-react';

// Preset lists for fast entry
const POPULAR_PRESETS: Record<string, { title: string; names: string[] }> = {
  sample: {
    title: 'Popular (16)',
    names: [
      'Alexander', 'Sophia', 'Liam', 'Emma', 'Noah', 'Olivia',
      'Ethan', 'Ava', 'Lucas', 'Isabella', 'Mason', 'Mia',
      'Oliver', 'Charlotte', 'Elijah', 'Amelia'
    ]
  },
  classroom: {
    title: 'Classroom (20)',
    names: [
      'James M.', 'Harper S.', 'Benjamin T.', 'Evelyn W.', 'Henry B.',
      'Abigail R.', 'Jackson C.', 'Emily D.', 'Sebastian H.', 'Elizabeth N.',
      'Aiden G.', 'Sofia S.', 'Matthew P.', 'Avery F.', 'Samuel J.',
      'Ella L.', 'David V.', 'Scarlett Z.', 'Joseph Q.', 'Grace Y.'
    ]
  },
  office: {
    title: 'Office Team (12)',
    names: [
      'Sarah (Lead)', 'Michael (Design)', 'Carlos (Dev)', 'Priya (QA)',
      'Marcus (Product)', 'Elena (Ops)', 'Kevin (Marketing)', 'Chloe (Content)',
      'Daniel (Sales)', 'Maya (Support)', 'Alex (DevOps)', 'Jessica (HR)'
    ]
  },
  icebreaker: {
    title: 'Icebreakers (10)',
    names: [
      'Dream Vacation Spot', 'Favorite Childhood Movie', 'Go-To Comfort Food',
      'Two Truths & A Lie', 'Hidden Talent Showcase', 'Best Concert Ever',
      'Zombie Apocalypse Team', 'First Job Memory', 'Superpower Choice', 'Morning Routine'
    ]
  },
  numbers: {
    title: 'Numbers 1–20',
    names: Array.from({ length: 20 }, (_, i) => `Number ${i + 1}`)
  }
};

const COLOR_PALETTES = [
  {
    key: 'arcade',
    name: 'Arcade Glow',
    colors: ['#4648d4', '#00a86b', '#f59e0b', '#ec4899', '#3b82f6', '#8b5cf6', '#10b981', '#f97316']
  },
  {
    key: 'rainbow',
    name: 'Vibrant Rainbow',
    colors: ['#e11d48', '#ea580c', '#f59e0b', '#16a34a', '#0284c7', '#4f46e5', '#9333ea', '#db2777']
  },
  {
    key: 'pastel',
    name: 'Soft Pastel',
    colors: ['#fca5a5', '#fdba74', '#fde047', '#86efac', '#93c5fd', '#c4b5fd', '#f472b6', '#a7f3d0']
  },
  {
    key: 'neon',
    name: 'Cyber Neon',
    colors: ['#06b6d4', '#3b82f6', '#8b5cf6', '#d946ef', '#f43f5e', '#10b981', '#f59e0b', '#6366f1']
  },
  {
    key: 'sunset',
    name: 'Warm Sunset',
    colors: ['#f43f5e', '#fb7185', '#fb923c', '#fbbf24', '#f59e0b', '#ea580c', '#e11d48', '#be123c']
  },
  {
    key: 'forest',
    name: 'Emerald Forest',
    colors: ['#047857', '#059669', '#10b981', '#34d399', '#065f46', '#0f766e', '#14b8a6', '#2dd4bf']
  }
];

interface WinnerLog {
  id: string;
  name: string;
  spinNumber: number;
  timestamp: string;
  oddsPercent: string;
  seed: string;
}

export default function WheelOfNamesEngine() {
  const searchParams = useSearchParams();

  // Mode Selection: 'standard' | 'classroom' | 'giveaway' | 'team'
  const [activeMode, setActiveMode] = useState<'standard' | 'classroom' | 'giveaway' | 'team'>('standard');

  // Sidebar Tab: 'entries' | 'history' | 'settings'
  const [activeTab, setActiveTab] = useState<'entries' | 'history' | 'settings'>('entries');

  // Raw text state for rapid editing
  const [rawText, setRawText] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      try {
        const queryNames = searchParams.get('names');
        if (queryNames) {
          const parsed = queryNames.split(',').map(n => n.trim()).filter(Boolean);
          if (parsed.length > 0) return parsed.join('\n');
        }
      } catch {
        // Fallback
      }
    }
    return POPULAR_PRESETS.sample.names.join('\n');
  });

  // Undo / Redo Stacks
  const [historyPast, setHistoryPast] = useState<string[]>([]);
  const [historyFuture, setHistoryFuture] = useState<string[]>([]);

  // Wheel configuration
  const [paletteKey, setPaletteKey] = useState<string>('arcade');
  const [spinDuration, setSpinDuration] = useState<number>(6);
  const [noRepeatMode, setNoRepeatMode] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // Sound settings
  const [soundSettings, setSoundSettings] = useState<SoundSettings>({
    enabled: true,
    pack: 'carnival',
    volume: 0.7,
    ttsEnabled: true
  });

  // Engine state
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [spinNumber, setSpinNumber] = useState<number>(0);
  const [winnerModalOpen, setWinnerModalOpen] = useState<boolean>(false);
  const [resultCardOpen, setResultCardOpen] = useState<boolean>(false);
  const [winnerItem, setWinnerItem] = useState<WheelItem | null>(null);
  const [preSelectedWinner, setPreSelectedWinner] = useState<{
    winner: WheelItem;
    winnerIndex: number;
    seed: string;
    oddsPercent: string;
  } | null>(null);

  // Winner History Log
  const [history, setHistory] = useState<WinnerLog[]>([]);

  // Modals & Notices
  const [bulkPasteOpen, setBulkPasteOpen] = useState<boolean>(false);
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);
  const [copiedShareUrl, setCopiedShareUrl] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Parse raw text into structured WheelItem array
  const items: WheelItem[] = useMemo(() => {
    const lines = rawText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    if (lines.length === 0) return [];

    const activeColors = COLOR_PALETTES.find(p => p.key === paletteKey)?.colors || COLOR_PALETTES[0].colors;

    return lines.map((line, idx) => ({
      id: `item-${idx}-${line.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
      text: line,
      color: activeColors[idx % activeColors.length],
      weight: 1
    }));
  }, [rawText, paletteKey]);

  const activePaletteColors = useMemo(() => {
    return COLOR_PALETTES.find(p => p.key === paletteKey)?.colors || COLOR_PALETTES[0].colors;
  }, [paletteKey]);

  const showNotice = useCallback((msg: string) => {
    setNoticeMessage(msg);
    setTimeout(() => {
      setNoticeMessage(null);
    }, 3200);
  }, []);

  const updateRawText = useCallback((newText: string) => {
    setHistoryPast(prev => [...prev.slice(-20), rawText]);
    setHistoryFuture([]);
    setRawText(newText);
  }, [rawText]);

  const handleUndo = useCallback(() => {
    if (historyPast.length === 0) return;
    const previous = historyPast[historyPast.length - 1];
    setHistoryPast(prev => prev.slice(0, prev.length - 1));
    setHistoryFuture(prev => [rawText, ...prev]);
    setRawText(previous);
  }, [historyPast, rawText]);

  const handleRedo = useCallback(() => {
    if (historyFuture.length === 0) return;
    const next = historyFuture[0];
    setHistoryFuture(prev => prev.slice(1));
    setHistoryPast(prev => [...prev, rawText]);
    setRawText(next);
  }, [historyFuture, rawText]);

  // Keyboard shortcut listener for Undo/Redo & Spacebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          handleRedo();
        } else {
          e.preventDefault();
          handleUndo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handleRedo();
      } else if (e.code === 'Space' && !isSpinning && items.length > 0 && activeMode === 'standard') {
        e.preventDefault();
        triggerSpin();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo, isSpinning, items.length, activeMode]);

  // Initiate Spin with Web Crypto CSPRNG
  const triggerSpin = () => {
    if (isSpinning || items.length === 0) return;

    const result = selectWeightedWinner(items);
    setPreSelectedWinner(result);
    setWinnerItem(result.winner);
    setIsSpinning(true);
  };

  const handleSpinStart = () => {
    setIsSpinning(true);
  };

  const handleSpinEnd = (winner: WheelItem) => {
    setIsSpinning(false);
    const newSpinNum = spinNumber + 1;
    setSpinNumber(newSpinNum);

    const logEntry: WinnerLog = {
      id: `spin-${Date.now()}`,
      name: winner.text,
      spinNumber: newSpinNum,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      oddsPercent: preSelectedWinner?.oddsPercent || '10.0',
      seed: preSelectedWinner?.seed || '0x4F8A2B'
    };

    setHistory(prev => [logEntry, ...prev]);

    // Handle No-Repeat / Elimination Mode automatically if active
    if (noRepeatMode) {
      const lines = rawText.split('\n');
      const idx = lines.findIndex(l => l.trim().toLowerCase() === winner.text.trim().toLowerCase());
      if (idx !== -1) {
        lines.splice(idx, 1);
        updateRawText(lines.join('\n'));
        showNotice(`Eliminated "${winner.text}" (No-Repeat Mode active)`);
      }
    }

    setWinnerModalOpen(true);
  };

  const handleRemoveWinner = (itemToRemove: WheelItem) => {
    const lines = rawText.split('\n');
    const idx = lines.findIndex(l => l.trim().toLowerCase() === itemToRemove.text.trim().toLowerCase());
    if (idx !== -1) {
      lines.splice(idx, 1);
      updateRawText(lines.join('\n'));
      showNotice(`Removed "${itemToRemove.text}" from wheel`);
    }
    setWinnerModalOpen(false);
  };

  const handleSpinAgain = () => {
    setWinnerModalOpen(false);
    setTimeout(() => {
      triggerSpin();
    }, 250);
  };

  const handleShuffle = () => {
    const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
    for (let i = lines.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lines[i], lines[j]] = [lines[j], lines[i]];
    }
    updateRawText(lines.join('\n'));
    showNotice('Shuffled all names!');
  };

  const handleSortAZ = () => {
    const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
    lines.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
    updateRawText(lines.join('\n'));
    showNotice('Sorted names A to Z!');
  };

  const handleRemoveDuplicates = () => {
    const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
    const unique = Array.from(new Set(lines));
    const removedCount = lines.length - unique.length;
    updateRawText(unique.join('\n'));
    showNotice(removedCount > 0 ? `Removed ${removedCount} duplicate name(s)!` : 'No duplicates found!');
  };

  const handleLoadPreset = (key: string) => {
    if (POPULAR_PRESETS[key]) {
      updateRawText(POPULAR_PRESETS[key].names.join('\n'));
      showNotice(`Loaded ${POPULAR_PRESETS[key].title}`);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        let lines: string[] = [];
        if (file.name.endsWith('.csv')) {
          lines = content
            .split(/\r?\n/)
            .map(row => row.split(',')[0].replace(/^["']|["']$/g, '').trim())
            .filter(Boolean);
        } else {
          lines = content.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
        }

        if (lines.length > 0) {
          updateRawText(lines.join('\n'));
          showNotice(`Imported ${lines.length} names from ${file.name}`);
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleCopyShareUrl = () => {
    if (typeof window === 'undefined') return;
    const lines = rawText.split('\n').filter(l => l.trim().length > 0);
    const encoded = encodeURIComponent(lines.join(','));
    const shareUrl = `${window.location.origin}/wheel-of-names?names=${encoded}`;

    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedShareUrl(true);
      showNotice('Shareable link copied to clipboard!');
      setTimeout(() => setCopiedShareUrl(false), 2500);
    });
  };

  const handleExportHistoryCSV = () => {
    if (history.length === 0) return;
    const headers = 'Spin #,Winner Name,Timestamp,Odds %,Verification Seed\n';
    const csvContent = history
      .map(h => `${h.spinNumber},"${h.name.replace(/"/g, '""')}",${h.timestamp},${h.oddsPercent}%,${h.seed}`)
      .join('\n');

    const blob = new Blob([headers + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `wheel-of-names-winners-${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    showNotice('Exported winner log to CSV!');
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const resultCardData: ResultCardData = {
    winner: winnerItem?.text || 'Winner',
    challengeName: 'Wheel of Names Random Winner',
    timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    shareUrl: typeof window !== 'undefined' ? window.location.href : 'https://spinwheelgames.org/wheel-of-names',
    streak: spinNumber,
    oddsPercent: preSelectedWinner?.oddsPercent || '10.0',
    verificationHash: preSelectedWinner?.seed || '0x4F8A2B'
  };

  return (
    <div ref={containerRef} className="w-full flex flex-col gap-3 sm:gap-4">
      {/* Notice Banner */}
      {noticeMessage && (
        <div className="bg-[#4648d4] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-2xl shadow-md flex items-center justify-between animate-fadeIn">
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            {noticeMessage}
          </span>
          <button
            type="button"
            onClick={() => setNoticeMessage(null)}
            className="text-white/80 hover:text-white font-bold text-base cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Mode Switcher Bar - Compact & Clean directly above the wheel (like Home page #interactive-workspace) */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2 bg-white dark:bg-[#181922] p-1.5 sm:p-2 rounded-2xl border border-[#eeedf7] dark:border-[#222330] shadow-2xs">
        {/* Primary Mode Switcher Pills */}
        <div className="flex flex-wrap items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveMode('standard')}
            className={`px-3 py-1.5 rounded-xl text-[12px] sm:text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeMode === 'standard'
                ? 'bg-[#4648d4] text-white shadow-xs'
                : 'text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Standard Wheel</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('classroom')}
            className={`px-3 py-1.5 rounded-xl text-[12px] sm:text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeMode === 'classroom'
                ? 'bg-[#00a86b] text-white shadow-xs'
                : 'text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330]'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-emerald-500" />
            <span className="hidden sm:inline">Classroom Suite</span>
            <span className="sm:hidden">Classroom</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('giveaway')}
            className={`px-3 py-1.5 rounded-xl text-[12px] sm:text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeMode === 'giveaway'
                ? 'bg-[#f59e0b] text-white shadow-xs'
                : 'text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330]'
            }`}
          >
            <Gift className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden sm:inline">Giveaway Suite</span>
            <span className="sm:hidden">Giveaway</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('team')}
            className={`px-3 py-1.5 rounded-xl text-[12px] sm:text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeMode === 'team'
                ? 'bg-[#ec4899] text-white shadow-xs'
                : 'text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330]'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-pink-500" />
            <span className="hidden sm:inline">Team Generator</span>
            <span className="sm:hidden">Teams</span>
          </button>
        </div>

        {/* Quick Utility Actions on Right (Share, Import, Sound, Fullscreen) */}
        <div className="flex items-center gap-1.5 ml-auto">
          <button
            type="button"
            onClick={handleCopyShareUrl}
            className="px-2.5 py-1.5 rounded-xl border border-[#eeedf7] dark:border-[#292a39] text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330] text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer"
            title="Share or copy link"
          >
            {copiedShareUrl ? <Check className="w-3.5 h-3.5 text-[#00a86b]" /> : <Share2 className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />}
            <span className="hidden sm:inline">{copiedShareUrl ? 'Copied!' : 'Share'}</span>
          </button>

          <button
            type="button"
            onClick={() => setBulkPasteOpen(true)}
            className="px-2.5 py-1.5 rounded-xl border border-[#eeedf7] dark:border-[#292a39] text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330] text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer"
            title="Bulk paste names"
          >
            <Copy className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Import</span>
          </button>

          <button
            type="button"
            onClick={() => setSoundSettings(prev => ({ ...prev, enabled: !prev.enabled }))}
            className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
              soundSettings.enabled
                ? 'bg-[#f4f2fd] dark:bg-[#1b1c28] text-[#4648d4] dark:text-white border-[#eeedf7] dark:border-[#2e3042]'
                : 'bg-[#f4f2fd] dark:bg-[#14151e] text-[#908fa1] border-[#eeedf7] dark:border-[#2e3042]'
            }`}
            title={soundSettings.enabled ? 'Sound On' : 'Sound Muted'}
          >
            {soundSettings.enabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-1.5 rounded-xl bg-[#f4f2fd] dark:bg-[#1b1c28] text-[#464554] dark:text-[#c7c4d7] hover:text-[#1a1b22] dark:hover:text-white border border-[#eeedf7] dark:border-[#2e3042] transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Wheel'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Render Selected Special Mode View if Active */}
      {activeMode === 'classroom' && (
        <ClassroomModeView
          soundEnabled={soundSettings.enabled}
          soundPack={soundSettings.pack}
          volume={soundSettings.volume}
        />
      )}

      {activeMode === 'giveaway' && (
        <GiveawayModeView
          soundEnabled={soundSettings.enabled}
          soundPack={soundSettings.pack}
          volume={soundSettings.volume}
        />
      )}

      {activeMode === 'team' && (
        <TeamGeneratorEngine />
      )}

      {/* Standard Wheel Two-Column Workspace (Dominant Left Stage + Sleek Compact Right Sidebar) */}
      {activeMode === 'standard' && (
        <div className="w-full flex flex-col lg:flex-row items-stretch justify-center gap-4 sm:gap-5 lg:gap-6">
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Large Centered Wheel Stage (Dominant, responsive, matching homepage) */}
          {/* ========================================================================= */}
          <div className="flex-1 w-full lg:min-w-0 bg-white dark:bg-[#0f1017] rounded-3xl border border-[#eeedf7] dark:border-[#20212f] p-3.5 sm:p-5 lg:p-6 flex flex-col justify-between items-center shadow-lg dark:shadow-xl relative min-h-[auto] sm:min-h-[480px] lg:min-h-[540px] xl:min-h-[580px] transition-colors overflow-hidden">
            {/* Top Stage Bar */}
            <div className="w-full flex items-center justify-between z-10 gap-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4f2fd] dark:bg-[#1b1c28] border border-[#eeedf7] dark:border-[#2e3042] text-xs font-bold text-[#464554] dark:text-[#c7c4d7]">
                  <Users className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
                  <span>Wheel of Names</span>
                  <span className="text-[10px] text-[#4648d4] dark:text-[#8587ff]">({items.length})</span>
                </span>
                {noRepeatMode && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#fef3c7] dark:bg-[#38280f] border border-[#fde68a] dark:border-[#78350f] text-[11px] font-bold text-[#92400e] dark:text-[#fcd34d]">
                    <Trash2 className="w-3 h-3" /> Auto-Eliminate
                  </span>
                )}
              </div>

              {/* Undo / Redo / Share Icons */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleUndo}
                  disabled={historyPast.length === 0}
                  className="p-2 rounded-xl bg-[#f4f2fd] dark:bg-[#1b1c28] text-[#464554] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white border border-[#eeedf7] dark:border-[#2e3042] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                  title="Undo (Ctrl+Z)"
                  aria-label="Undo"
                >
                  <Undo2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleRedo}
                  disabled={historyFuture.length === 0}
                  className="p-2 rounded-xl bg-[#f4f2fd] dark:bg-[#1b1c28] text-[#464554] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white border border-[#eeedf7] dark:border-[#2e3042] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                  title="Redo (Ctrl+Y)"
                  aria-label="Redo"
                >
                  <Redo2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="p-2 rounded-xl bg-[#f4f2fd] dark:bg-[#1b1c28] text-[#464554] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white border border-[#eeedf7] dark:border-[#2e3042] transition-colors cursor-pointer"
                  title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Wheel'}
                  aria-label="Toggle fullscreen"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Large Wheel Canvas Container (Centered Horizontally and Vertically) */}
            <div className="w-full flex-1 flex items-center justify-center py-4 sm:py-6">
              <WheelCanvas
                items={items}
                palette={activePaletteColors}
                isSpinning={isSpinning}
                onCenterClick={triggerSpin}
                onSpinStart={handleSpinStart}
                onSpinEnd={handleSpinEnd}
                duration={spinDuration}
                soundEnabled={soundSettings.enabled}
                soundPack={soundSettings.pack}
                volume={soundSettings.volume}
                preSelectedWinner={preSelectedWinner}
                isFullscreen={isFullscreen}
              />
            </div>

            {/* Bottom Stage Toolbar: Sound / Reset / Shuffle / Spin Button / Web Crypto */}
            <div className="w-full pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#eeedf7] dark:border-[#1e1f2d]">
              {/* Quick Left Stage Controls */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSoundSettings(prev => ({ ...prev, enabled: !prev.enabled }))}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                      soundSettings.enabled
                        ? 'bg-[#f4f2fd] dark:bg-[#1b1c28] text-[#4648d4] dark:text-white border-[#eeedf7] dark:border-[#2e3042]'
                        : 'bg-[#f4f2fd] dark:bg-[#14151e] text-[#908fa1] border-[#eeedf7] dark:border-[#2e3042]'
                    }`}
                    title={soundSettings.enabled ? 'Sound On' : 'Sound Muted'}
                  >
                    {soundSettings.enabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      updateRawText(POPULAR_PRESETS.sample.names.join('\n'));
                      showNotice('Reset to default name list');
                    }}
                    className="p-2.5 rounded-xl bg-[#f4f2fd] dark:bg-[#1b1c28] text-[#464554] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white border border-[#eeedf7] dark:border-[#2e3042] transition-colors cursor-pointer"
                    title="Reset to default names"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleShuffle}
                    className="p-2.5 rounded-xl bg-[#f4f2fd] dark:bg-[#1b1c28] text-[#464554] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white border border-[#eeedf7] dark:border-[#2e3042] transition-colors cursor-pointer"
                    title="Shuffle names order"
                  >
                    <Shuffle className="w-4 h-4" />
                  </button>
                </div>

                {/* Mobile Web Crypto Badge */}
                <span className="sm:hidden inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#f4f2fd] dark:bg-[#14151e] border border-[#eeedf7] dark:border-[#2e3042] text-[10px] font-bold text-[#006c49] dark:text-emerald-400 font-mono">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Web Crypto</span>
                </span>
              </div>

              {/* Center: Big Spin Button matching Homepage */}
              <div className="w-full sm:flex-1 sm:max-w-sm flex items-center justify-center">
                <SpinButton
                  onSpin={triggerSpin}
                  isSpinning={isSpinning}
                  disabled={items.length < 2}
                />
              </div>

              {/* Right: Desktop Web Crypto Badge */}
              <div className="hidden sm:flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#f4f2fd] dark:bg-[#14151e] border border-[#eeedf7] dark:border-[#2e3042] text-[11px] font-bold text-[#006c49] dark:text-emerald-400 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Web Crypto CSPRNG</span>
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Sleek Compact Configuration Card (~340–360px on Desktop)     */}
          {/* Matches Homepage WheelWorkspace Sidebar dimensions exactly                */}
          {/* ========================================================================= */}
          <div className="w-full lg:w-[340px] xl:w-[360px] shrink-0 flex flex-col gap-3">
            <div className="bg-white dark:bg-[#0f1017] text-[#1a1b22] dark:text-[#f1effa] rounded-3xl border border-[#eeedf7] dark:border-[#20212f] p-4 sm:p-5 shadow-lg dark:shadow-xl flex flex-col gap-3.5 transition-colors">
              
              {/* Breadcrumb Navigation inside card */}
              <div className="text-[11px] text-[#767586] dark:text-[#908fa1] flex items-center gap-1.5 font-medium truncate">
                <Link href="/" className="hover:text-[#1a1b22] dark:hover:text-white transition-colors">
                  Home
                </Link>
                <span>›</span>
                <span className="text-[#464554] dark:text-[#c7c4d7]">Random Pickers</span>
                <span>›</span>
                <span className="text-[#4648d4] dark:text-[#8587ff] font-semibold truncate">Wheel of Names</span>
              </div>

              {/* Title & Short Description */}
              <div className="space-y-1 border-b border-[#eeedf7] dark:border-[#1e1f2d] pb-3">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-headline font-black text-xl sm:text-2xl text-[#1a1b22] dark:text-[#f1effa] tracking-tight">
                    Wheel of Names
                  </h2>
                  <button
                    type="button"
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                      isFavorite
                        ? 'bg-rose-500/10 dark:bg-rose-500/20 border-rose-500/40 text-rose-500 dark:text-rose-400'
                        : 'bg-[#f4f2fd] dark:bg-[#1b1c28] border-[#eeedf7] dark:border-[#2e3042] text-[#767586] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white'
                    }`}
                    title={isFavorite ? 'Saved to favorites' : 'Save to favorites'}
                    aria-label="Toggle favorite"
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
                  </button>
                </div>
                <p className="text-xs text-[#464554] dark:text-[#908fa1] leading-relaxed line-clamp-2">
                  Fast random name picker with elimination, classroom rosters &amp; fair draws.
                </p>
              </div>

              {/* Segmented Top Tabs: [Names (X)] | [Results (X)] | [Options] */}
              <div className="grid grid-cols-3 gap-1 p-1 bg-[#f4f2fd] dark:bg-[#14151e] rounded-xl border border-[#eeedf7] dark:border-[#20212f]">
                <button
                  type="button"
                  onClick={() => setActiveTab('entries')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    activeTab === 'entries'
                      ? 'bg-[#4648d4] text-white shadow-xs'
                      : 'text-[#767586] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white'
                  }`}
                >
                  <ListOrdered className="w-3.5 h-3.5" />
                  <span>Names ({items.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('history')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    activeTab === 'history'
                      ? 'bg-[#4648d4] text-white shadow-xs'
                      : 'text-[#767586] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white'
                  }`}
                >
                  <History className="w-3.5 h-3.5" />
                  <span>Results ({history.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('settings')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    activeTab === 'settings'
                      ? 'bg-[#4648d4] text-white shadow-xs'
                      : 'text-[#767586] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Options</span>
                </button>
              </div>

              {/* =================================================================== */}
              {/* TAB 1: FAST NAME ENTRIES EDITOR (Compact like homepage)            */}
              {/* =================================================================== */}
              {activeTab === 'entries' && (
                <div className="w-full flex flex-col gap-3">
                  {/* Quick Action Toolbar */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#1a1b22] dark:text-[#f1effa] flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
                      <span>Name Roster (1 per line)</span>
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={handleRemoveDuplicates}
                        className="text-[11px] text-[#464554] dark:text-[#c7c4d7] hover:text-[#4648d4] dark:hover:text-[#8587ff] font-semibold transition-colors cursor-pointer"
                        title="Remove duplicate names"
                      >
                        Deduplicate
                      </button>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <button
                        type="button"
                        onClick={() => {
                          updateRawText('');
                          showNotice('Cleared all names');
                        }}
                        className="text-[11px] text-rose-500 hover:text-rose-600 font-semibold transition-colors cursor-pointer"
                        title="Clear all names"
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  {/* Compact Textarea */}
                  <div className="relative">
                    <textarea
                      value={rawText}
                      onChange={(e) => updateRawText(e.target.value)}
                      placeholder="Paste or type names here, one per line..."
                      rows={7}
                      className="w-full bg-[#fbf8ff] dark:bg-[#14151e] border border-[#eeedf7] dark:border-[#222330] rounded-2xl p-3 text-xs sm:text-sm font-sans text-[#1a1b22] dark:text-[#f1effa] placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#4648d4]/40 resize-y leading-relaxed font-mono"
                    />
                  </div>

                  {/* Secondary Quick Action Button Row */}
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setBulkPasteOpen(true)}
                      className="bg-[#f4f2fd] dark:bg-[#1b1c28] hover:bg-[#e8e5fb] dark:hover:bg-[#252738] text-[#1a1b22] dark:text-[#f1effa] text-xs font-semibold py-1.5 px-2 rounded-xl border border-[#eeedf7] dark:border-[#2e3042] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      title="Bulk paste from clipboard"
                    >
                      <Copy className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
                      <span>Bulk Paste</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-[#f4f2fd] dark:bg-[#1b1c28] hover:bg-[#e8e5fb] dark:hover:bg-[#252738] text-[#1a1b22] dark:text-[#f1effa] text-xs font-semibold py-1.5 px-2 rounded-xl border border-[#eeedf7] dark:border-[#2e3042] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      title="Import TXT or CSV file"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#00a86b] dark:text-emerald-400" />
                      <span>Import File</span>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".txt,.csv"
                      onChange={handleFileUpload}
                      className="hidden"
                    />

                    <button
                      type="button"
                      onClick={handleShuffle}
                      className="bg-[#f4f2fd] dark:bg-[#1b1c28] hover:bg-[#e8e5fb] dark:hover:bg-[#252738] text-[#1a1b22] dark:text-[#f1effa] text-xs font-semibold py-1.5 px-2 rounded-xl border border-[#eeedf7] dark:border-[#2e3042] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      title="Shuffle names order"
                    >
                      <Shuffle className="w-3.5 h-3.5 text-[#ec4899]" />
                      <span>Shuffle</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSortAZ}
                      className="bg-[#f4f2fd] dark:bg-[#1b1c28] hover:bg-[#e8e5fb] dark:hover:bg-[#252738] text-[#1a1b22] dark:text-[#f1effa] text-xs font-semibold py-1.5 px-2 rounded-xl border border-[#eeedf7] dark:border-[#2e3042] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      title="Sort A to Z"
                    >
                      <ArrowDownAZ className="w-3.5 h-3.5 text-[#f59e0b]" />
                      <span>Sort A–Z</span>
                    </button>
                  </div>

                  {/* Preset Quick Chips */}
                  <div className="pt-2 border-t border-[#eeedf7] dark:border-[#1e1f2d] space-y-1.5">
                    <span className="text-[11px] font-bold text-[#767586] dark:text-[#908fa1] block">
                      Quick Roster Presets:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(POPULAR_PRESETS).map(([key, p]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => handleLoadPreset(key)}
                          className="bg-[#f4f2fd] dark:bg-[#181922] hover:bg-[#e8e5fb] dark:hover:bg-[#222330] text-[#1a1b22] dark:text-[#c7c4d7] text-[11px] font-medium py-1 px-2 rounded-lg border border-[#eeedf7] dark:border-[#222330] transition-colors cursor-pointer"
                        >
                          {p.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* =================================================================== */}
              {/* TAB 2: AUDIT & WINNER HISTORY LOG                                   */}
              {/* =================================================================== */}
              {activeTab === 'history' && (
                <div className="w-full flex flex-col gap-2.5 max-h-[380px] overflow-y-auto pr-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1a1b22] dark:text-[#f1effa] flex items-center gap-1">
                      <History className="w-3.5 h-3.5 text-[#f59e0b]" />
                      <span>Audit Log ({history.length})</span>
                    </span>
                    {history.length > 0 && (
                      <button
                        type="button"
                        onClick={handleExportHistoryCSV}
                        className="text-xs text-[#4648d4] dark:text-[#8587ff] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export CSV</span>
                      </button>
                    )}
                  </div>

                  {history.length === 0 ? (
                    <div className="text-center py-8 text-xs text-[#767586] dark:text-[#908fa1] space-y-2">
                      <History className="w-8 h-8 mx-auto text-[#a09eaf] dark:text-[#464554]" />
                      <p>No winners drawn yet.</p>
                      <p className="text-[11px]">Spin the wheel to log cryptographically verified results!</p>
                    </div>
                  ) : (
                    <div className="space-y-1.5 font-sans">
                      {history.map((record) => (
                        <div
                          key={record.id}
                          className="p-2.5 bg-[#fbf8ff] dark:bg-[#14151e] rounded-xl text-xs border border-[#eeedf7] dark:border-[#222330] flex flex-col gap-1"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <span className="bg-[#fef3c7] dark:bg-[#38280f] text-[#92400e] dark:text-[#fcd34d] font-bold px-1.5 py-0.5 rounded text-[10px]">
                                #{record.spinNumber}
                              </span>
                              <span className="font-bold text-[#1a1b22] dark:text-[#f1effa]">{record.name}</span>
                            </div>
                            <span className="text-[10px] text-[#767586] dark:text-[#908fa1] font-mono">{record.timestamp}</span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-[#767586] dark:text-[#908fa1]">
                            <span>Odds: {record.oddsPercent}%</span>
                            <button
                              type="button"
                              onClick={() => {
                                const dummyItem: WheelItem = { id: record.id, text: record.name };
                                handleRemoveWinner(dummyItem);
                              }}
                              className="text-rose-500 hover:text-rose-600 font-semibold flex items-center gap-0.5 cursor-pointer"
                              title="Remove this name from active wheel"
                            >
                              <UserX className="w-3 h-3" />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {history.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setResultCardOpen(true)}
                      className="w-full mt-2 py-2 px-3 rounded-xl bg-[#f4f2fd] dark:bg-[#181922] hover:bg-[#e8e5fb] dark:hover:bg-[#252738] text-[#4648d4] dark:text-[#8587ff] text-xs font-bold flex items-center justify-center gap-1.5 border border-[#eeedf7] dark:border-[#2e3042] transition-colors cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Visual Result Card</span>
                    </button>
                  )}
                </div>
              )}

              {/* =================================================================== */}
              {/* TAB 3: OPTIONS & CUSTOMIZATION (Compact like homepage)              */}
              {/* =================================================================== */}
              {activeTab === 'settings' && (
                <div className="w-full flex flex-col gap-3">
                  {/* No-Repeat Elimination Toggle */}
                  <div className="flex items-center justify-between p-3 bg-[#fbf8ff] dark:bg-[#14151e] rounded-2xl border border-[#eeedf7] dark:border-[#222330]">
                    <div>
                      <p className="text-xs font-bold text-[#1a1b22] dark:text-[#f1effa]">No-Repeat / Elimination</p>
                      <p className="text-[11px] text-[#464554] dark:text-[#c7c4d7]">Removes winners automatically</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setNoRepeatMode(!noRepeatMode)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                        noRepeatMode ? 'bg-[#4648d4]' : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          noRepeatMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Spin Duration Selector */}
                  <div className="p-3 bg-[#fbf8ff] dark:bg-[#14151e] rounded-2xl border border-[#eeedf7] dark:border-[#222330] space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#1a1b22] dark:text-[#c7c4d7]">Spin Duration</span>
                      <span className="font-bold text-[#4648d4] dark:text-[#8587ff]">{spinDuration}s</span>
                    </div>
                    <div className="grid grid-cols-5 gap-1">
                      {[3, 5, 8, 10, 12].map((dur) => (
                        <button
                          key={dur}
                          type="button"
                          onClick={() => setSpinDuration(dur)}
                          className={`py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            spinDuration === dur
                              ? 'bg-[#4648d4] text-white'
                              : 'bg-white dark:bg-[#1c1d2a] text-[#767586] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white border border-[#eeedf7] dark:border-transparent'
                          }`}
                        >
                          {dur}s
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Palette Selector */}
                  <div className="p-3 bg-[#fbf8ff] dark:bg-[#14151e] rounded-2xl border border-[#eeedf7] dark:border-[#222330] space-y-2">
                    <span className="text-xs font-bold text-[#1a1b22] dark:text-[#f1effa] block">
                      Color Theme Palette
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 max-h-44 overflow-y-auto pr-1">
                      {COLOR_PALETTES.map((pal) => (
                        <button
                          key={pal.key}
                          type="button"
                          onClick={() => setPaletteKey(pal.key)}
                          className={`p-2 rounded-xl border flex flex-col gap-1 transition-all text-left cursor-pointer ${
                            paletteKey === pal.key
                              ? 'bg-white dark:bg-[#1f202f] border-[#4648d4]'
                              : 'bg-white/80 dark:bg-[#181924] border-[#eeedf7] dark:border-[#292a39] hover:bg-white dark:hover:bg-[#222435]'
                          }`}
                        >
                          <span className="text-[11px] font-bold capitalize text-[#1a1b22] dark:text-white truncate">
                            {pal.name}
                          </span>
                          <div className="flex gap-0.5">
                            {pal.colors.slice(0, 5).map((c, i) => (
                              <div
                                key={i}
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: c }}
                              />
                            ))}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Winner Celebration Modal */}
      {winnerModalOpen && winnerItem && (
        <WinnerModal
          isOpen={winnerModalOpen}
          winner={winnerItem}
          wheelTitle="Wheel of Names"
          oddsPercent={preSelectedWinner?.oddsPercent || '10.0'}
          seed={preSelectedWinner?.seed || '0x4F8A2B'}
          spinNumber={spinNumber}
          currentMode="standard"
          soundEnabled={soundSettings.enabled}
          soundPack={soundSettings.pack}
          volume={soundSettings.volume}
          ttsEnabled={soundSettings.ttsEnabled}
          onClose={() => setWinnerModalOpen(false)}
          onSpinAgain={handleSpinAgain}
          onRemoveWinner={handleRemoveWinner}
        />
      )}

      {/* Bulk Paste Modal */}
      {bulkPasteOpen && (
        <BulkPasteModal
          isOpen={bulkPasteOpen}
          onClose={() => setBulkPasteOpen(false)}
          onApplyItems={(newItems) => {
            const lines = newItems.map(i => i.text);
            updateRawText(lines.join('\n'));
            showNotice(`Loaded ${lines.length} names from bulk paste`);
          }}
        />
      )}

      {/* Visual Winner Result Card Modal */}
      {resultCardOpen && (
        <ResultCardModal
          isOpen={resultCardOpen}
          data={resultCardData}
          onClose={() => setResultCardOpen(false)}
        />
      )}
    </div>
  );
}
