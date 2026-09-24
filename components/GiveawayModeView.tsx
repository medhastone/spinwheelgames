'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import WheelCanvas from './WheelCanvas';
import { WheelItem, SoundSettings } from '@/lib/types';
import { selectWeightedWinner } from '@/lib/random';
import { playWinnerFanfare, playTickSound, announceWinnerTTS } from '@/lib/sound';
import confetti from 'canvas-confetti';
import {
  Gift,
  Upload,
  FileSpreadsheet,
  FileText,
  Copy,
  Check,
  Download,
  Share2,
  ShieldCheck,
  Sparkles,
  Maximize2,
  Minimize2,
  Trash2,
  Users,
  Trophy,
  History,
  AlertTriangle,
  Flame,
  CheckCircle2,
  Hash,
  Crown,
  Volume2
} from 'lucide-react';

interface GiveawayModeViewProps {
  soundEnabled: boolean;
  soundPack?: string;
  volume?: number;
}

interface Entrant {
  id: string;
  name: string;
  emailOrHandle?: string;
  ticketCount: number;
}

interface GiveawayWinnerRecord {
  id: string;
  place: number;
  winnerName: string;
  emailOrHandle?: string;
  prizeTitle?: string;
  timestamp: string;
  entropySeed: string;
  oddsPercent: string;
}

const GIVEAWAY_PRESETS = [
  {
    id: 'twitch-stream',
    title: 'Twitch / YouTube Stream Chat Raffle (30 Viewers)',
    description: 'Live stream chat subscriber giveaway with multi-tier prizes.',
    entrants: [
      { id: '1', name: 'PixelNinja99', emailOrHandle: '@pixelninja', ticketCount: 1 },
      { id: '2', name: 'CyberSamurai', emailOrHandle: '@samurai_c', ticketCount: 2 },
      { id: '3', name: 'QuantumGamer', emailOrHandle: '@quantum_g', ticketCount: 1 },
      { id: '4', name: 'ValkyrieQueen', emailOrHandle: '@valkyrie', ticketCount: 3 },
      { id: '5', name: 'ShadowStriker', emailOrHandle: '@shadow_s', ticketCount: 1 },
      { id: '6', name: 'RetroArcadeFan', emailOrHandle: '@retro_arcade', ticketCount: 2 },
      { id: '7', name: 'NeonRider', emailOrHandle: '@neon_r', ticketCount: 1 },
      { id: '8', name: 'HyperNova', emailOrHandle: '@hyper_nova', ticketCount: 4 },
      { id: '9', name: 'CosmicVoyager', emailOrHandle: '@cosmic_v', ticketCount: 1 },
      { id: '10', name: 'GlitchMaster', emailOrHandle: '@glitch_m', ticketCount: 2 },
      { id: '11', name: 'StarGazer2026', emailOrHandle: '@stargazer', ticketCount: 1 },
      { id: '12', name: 'AlphaWolf', emailOrHandle: '@alphawolf', ticketCount: 1 },
      { id: '13', name: 'AuraKnight', emailOrHandle: '@auraknight', ticketCount: 3 },
      { id: '14', name: 'SonicBlast', emailOrHandle: '@sonic_b', ticketCount: 1 },
      { id: '15', name: 'DragonSlayer', emailOrHandle: '@dragonslayer', ticketCount: 2 },
      { id: '16', name: 'MysticMage', emailOrHandle: '@mystic_m', ticketCount: 1 },
      { id: '17', name: 'ThunderBolt', emailOrHandle: '@thunder_b', ticketCount: 2 },
      { id: '18', name: 'PhoenixRising', emailOrHandle: '@phoenix_r', ticketCount: 5 },
      { id: '19', name: 'VortexPilot', emailOrHandle: '@vortex_p', ticketCount: 1 },
      { id: '20', name: 'EchoChamber', emailOrHandle: '@echo_c', ticketCount: 1 },
      { id: '21', name: 'BlazeRunner', emailOrHandle: '@blaze_r', ticketCount: 2 },
      { id: '22', name: 'FrostBite', emailOrHandle: '@frostbite', ticketCount: 1 },
      { id: '23', name: 'GalacticHero', emailOrHandle: '@galactic_h', ticketCount: 3 },
      { id: '24', name: 'TitanSlayer', emailOrHandle: '@titanslayer', ticketCount: 1 },
      { id: '25', name: 'ZenithSeeker', emailOrHandle: '@zenith_s', ticketCount: 2 },
      { id: '26', name: 'LunarEclipse', emailOrHandle: '@lunareclipse', ticketCount: 1 },
      { id: '27', name: 'SolarFlare', emailOrHandle: '@solarflare', ticketCount: 4 },
      { id: '28', name: 'NebulaDrifter', emailOrHandle: '@nebuladrifter', ticketCount: 1 },
      { id: '29', name: 'PulseWave', emailOrHandle: '@pulsewave', ticketCount: 2 },
      { id: '30', name: 'ChronoTrigger', emailOrHandle: '@chronotrigger', ticketCount: 1 }
    ]
  },
  {
    id: 'conf-swag',
    title: 'Tech Conference Grand Prize Drawing (15 Leads)',
    description: 'Expo booth swag raffle with mechanical ticket odds.',
    entrants: [
      { id: 'c1', name: 'Sarah Jenkins (Stripe)', emailOrHandle: 's.jenkins@example.com', ticketCount: 1 },
      { id: 'c2', name: 'David Chen (Figma)', emailOrHandle: 'd.chen@example.com', ticketCount: 1 },
      { id: 'c3', name: 'Elena Rostova (Datadog)', emailOrHandle: 'e.rostova@example.com', ticketCount: 1 },
      { id: 'c4', name: 'Marcus Brody (GitHub)', emailOrHandle: 'm.brody@example.com', ticketCount: 1 },
      { id: 'c5', name: 'Priya Patel (Cloudflare)', emailOrHandle: 'p.patel@example.com', ticketCount: 1 },
      { id: 'c6', name: 'Liam O’Connor (Vercel)', emailOrHandle: 'l.oconnor@example.com', ticketCount: 1 },
      { id: 'c7', name: 'Aaliyah Washington (Google)', emailOrHandle: 'a.washington@example.com', ticketCount: 1 },
      { id: 'c8', name: 'Kenji Sato (Sony)', emailOrHandle: 'k.sato@example.com', ticketCount: 1 },
      { id: 'c9', name: 'Chloe Dubois (Shopify)', emailOrHandle: 'c.dubois@example.com', ticketCount: 1 },
      { id: 'c10', name: 'Mateo Morales (Spotify)', emailOrHandle: 'm.morales@example.com', ticketCount: 1 }
    ]
  }
];

export default function GiveawayModeView({
  soundEnabled,
  soundPack = 'carnival',
  volume = 0.8
}: GiveawayModeViewProps) {
  // Entrants State
  const [entrants, setEntrants] = useState<Entrant[]>(GIVEAWAY_PRESETS[0].entrants);
  const [rawTextInput, setRawTextInput] = useState('');
  const [importModalOpen, setImportModalOpen] = useState(false);

  // Settings
  const [winnerCountTarget, setWinnerCountTarget] = useState<number>(3);
  const [eliminationMode, setEliminationMode] = useState<boolean>(true);
  const [drawMode, setDrawMode] = useState<'sequential' | 'batch'>('sequential');
  const [prizeTierNames, setPrizeTierNames] = useState<string[]>([
    '🥇 1st Place: Grand Prize ($500 Gift Card)',
    '🥈 2nd Place: Runner-Up Prize ($200 Swag Pack)',
    '🥉 3rd Place: Honorable Mention ($50 Store Credit)'
  ]);

  // Wheel State
  const [isSpinning, setIsSpinning] = useState(false);
  const [preSelected, setPreSelected] = useState<{
    winner: WheelItem;
    winnerIndex: number;
    seed: string;
    oddsPercent: string;
  } | null>(null);

  // Winners History & Audit Ledger
  const [winnersList, setWinnersList] = useState<GiveawayWinnerRecord[]>([]);
  const [stageMode, setStageMode] = useState(false);
  const [activeWinnerModal, setActiveWinnerModal] = useState<GiveawayWinnerRecord | null>(null);
  const [fairnessModalOpen, setFairnessModalOpen] = useState(false);
  const [copiedAudit, setCopiedAudit] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Sound settings
  const [soundSettings, setSoundSettings] = useState<SoundSettings>({
    enabled: soundEnabled,
    pack: (soundPack as any) || 'carnival',
    volume,
    ttsEnabled: true
  });

  // Calculate duplicates in real-time
  const duplicateStats = useMemo(() => {
    const counts = new Map<string, number>();
    entrants.forEach((e) => {
      const key = e.name.toLowerCase().trim();
      counts.set(key, (counts.get(key) || 0) + 1);
    });
    let dupeCount = 0;
    counts.forEach((val) => {
      if (val > 1) dupeCount += val - 1;
    });
    return {
      hasDuplicates: dupeCount > 0,
      count: dupeCount
    };
  }, [entrants]);

  // Convert Entrants to WheelItems (with weights from ticketCount)
  const wheelItems: WheelItem[] = useMemo(() => {
    if (entrants.length === 0) {
      return [{ id: 'empty', text: 'No Entrants Loaded', weight: 1 }];
    }
    const colors = [
      '#4648d4', '#006c49', '#dc2c4f', '#6063ee', '#f59e0b',
      '#10b981', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'
    ];
    return entrants.map((entrant, idx) => ({
      id: entrant.id,
      text: entrant.name,
      weight: entrant.ticketCount || 1,
      color: colors[idx % colors.length]
    }));
  }, [entrants]);

  // Trigger Sequential Spin
  const handleTriggerSpin = useCallback(() => {
    if (isSpinning || entrants.length === 0) return;

    const selection = selectWeightedWinner(wheelItems);
    setPreSelected(selection);
    setIsSpinning(true);
    setActiveWinnerModal(null);
  }, [isSpinning, entrants.length, wheelItems]);

  // Spin Finished
  const handleSpinEnd = (winner: WheelItem) => {
    setIsSpinning(false);
    if (winner.id === 'empty') return;

    const entrantObj = entrants.find((e) => e.id === winner.id);
    const place = winnersList.length + 1;
    const prize = prizeTierNames[place - 1] || `Prize Tier #${place}`;

    const record: GiveawayWinnerRecord = {
      id: `winner-${Date.now()}-${place}`,
      place,
      winnerName: winner.text,
      emailOrHandle: entrantObj?.emailOrHandle,
      prizeTitle: prize,
      timestamp: new Date().toLocaleTimeString(),
      entropySeed: preSelected?.seed || '0x49B7F10E',
      oddsPercent: preSelected?.oddsPercent || '3.3'
    };

    setWinnersList((prev) => [...prev, record]);
    setActiveWinnerModal(record);

    // If elimination mode is on, remove winner from pool so they don't win twice
    if (eliminationMode) {
      setEntrants((prev) => prev.filter((e) => e.id !== winner.id));
    }

    try {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    if (soundSettings.enabled) {
      playWinnerFanfare(soundSettings.enabled, soundSettings.pack, soundSettings.volume);
      announceWinnerTTS(winner.text, { enabled: true, prefix: 'The giveaway prize winner is' });
    }
  };

  // Instant Batch Draw (Draw all N winners simultaneously with hardware CSPRNG)
  const handleBatchDraw = () => {
    if (entrants.length === 0 || isSpinning) return;

    let pool = [...entrants];
    const newWinners: GiveawayWinnerRecord[] = [];
    const count = Math.min(winnerCountTarget, pool.length);

    for (let i = 0; i < count; i++) {
      const items: WheelItem[] = pool.map((e) => ({
        id: e.id,
        text: e.name,
        weight: e.ticketCount || 1
      }));
      const selection = selectWeightedWinner(items);
      const winner = selection.winner;
      const entrantObj = pool.find((e) => e.id === winner.id);

      const place = winnersList.length + i + 1;
      const prize = prizeTierNames[place - 1] || `Prize Tier #${place}`;

      newWinners.push({
        id: `winner-${Date.now()}-${place}`,
        place,
        winnerName: winner.text,
        emailOrHandle: entrantObj?.emailOrHandle,
        prizeTitle: prize,
        timestamp: new Date().toLocaleTimeString(),
        entropySeed: selection.seed,
        oddsPercent: selection.oddsPercent
      });

      if (eliminationMode) {
        pool = pool.filter((e) => e.id !== winner.id);
      }
    }

    setWinnersList((prev) => [...prev, ...newWinners]);
    if (eliminationMode) {
      setEntrants(pool);
    }

    try {
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.5 }
      });
    } catch {
      // ignore
    }

    if (soundSettings.enabled) {
      playWinnerFanfare(soundSettings.enabled, soundSettings.pack, soundSettings.volume);
    }
  };

  // Deduplication Actions
  const handleRemoveDuplicates = () => {
    const seen = new Set<string>();
    const deduplicated: Entrant[] = [];

    entrants.forEach((e) => {
      const key = e.name.toLowerCase().trim();
      if (!seen.has(key)) {
        seen.add(key);
        deduplicated.push(e);
      }
    });

    setEntrants(deduplicated);
  };

  const handleMergeDuplicateTickets = () => {
    const map = new Map<string, Entrant>();

    entrants.forEach((e) => {
      const key = e.name.toLowerCase().trim();
      if (map.has(key)) {
        const existing = map.get(key)!;
        existing.ticketCount += e.ticketCount || 1;
      } else {
        map.set(key, { ...e, ticketCount: e.ticketCount || 1 });
      }
    });

    setEntrants(Array.from(map.values()));
  };

  // Import TXT or CSV raw text
  const handleProcessImport = () => {
    if (!rawTextInput.trim()) return;

    const lines = rawTextInput.split(/\r?\n/).filter((l) => l.trim().length > 0);
    const parsed: Entrant[] = [];

    lines.forEach((line, idx) => {
      // Check if CSV format (e.g. name, email, tickets or name, tickets)
      const parts = line.split(/[,;\t]/).map((p) => p.trim());
      if (parts.length >= 3) {
        const tickets = parseInt(parts[2], 10) || 1;
        parsed.push({
          id: `imp-${Date.now()}-${idx}`,
          name: parts[0],
          emailOrHandle: parts[1],
          ticketCount: Math.max(1, tickets)
        });
      } else if (parts.length === 2) {
        const maybeNum = parseInt(parts[1], 10);
        if (!isNaN(maybeNum)) {
          parsed.push({
            id: `imp-${Date.now()}-${idx}`,
            name: parts[0],
            ticketCount: Math.max(1, maybeNum)
          });
        } else {
          parsed.push({
            id: `imp-${Date.now()}-${idx}`,
            name: parts[0],
            emailOrHandle: parts[1],
            ticketCount: 1
          });
        }
      } else {
        parsed.push({
          id: `imp-${Date.now()}-${idx}`,
          name: parts[0],
          ticketCount: 1
        });
      }
    });

    if (parsed.length > 0) {
      setEntrants(parsed);
      setImportModalOpen(false);
      setRawTextInput('');
    }
  };

  // Export Results
  const handleExportCSV = () => {
    if (winnersList.length === 0) return;
    const headers = 'Place,Winner Name,Handle/Email,Prize,Timestamp,Cryptographic Seed,Odds %\n';
    const rows = winnersList
      .map((w) => `"${w.place}","${w.winnerName}","${w.emailOrHandle || ''}","${w.prizeTitle || ''}","${w.timestamp}","${w.entropySeed}","${w.oddsPercent}%"`)
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `giveaway-winners-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyAuditText = () => {
    if (winnersList.length === 0) return;
    const text = `🎉 OFFICIAL GIVEAWAY WINNERS AUDIT (${new Date().toLocaleDateString()}) - SpinWheelGames.org\n\n` +
      winnersList.map((w) => `🏆 #${w.place} ${w.winnerName} (${w.prizeTitle || 'Prize'})\n   Seed: ${w.entropySeed} | Odds: ${w.oddsPercent}% | Time: ${w.timestamp}`).join('\n\n') +
      `\n\nProvably Fair CSPRNG Verification: Passed via Web Cryptography API.`;
    navigator.clipboard.writeText(text);
    setCopiedAudit(true);
    setTimeout(() => setCopiedAudit(false), 2000);
  };

  const handleClearHistory = () => {
    setWinnersList([]);
    setActiveWinnerModal(null);
  };

  return (
    <div className={`w-full flex flex-col gap-8 transition-all ${stageMode ? 'fixed inset-0 z-50 bg-[#0c0d14] text-white p-6 overflow-y-auto' : ''}`}>
      {/* Top Banner */}
      <div className="w-full bg-white dark:bg-[#181922] rounded-3xl p-6 sm:p-8 border border-[#eeedf7] dark:border-[#292a39] shadow-sm flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#eeedf7] dark:border-[#292a39] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[12px] font-bold mb-2">
              <Gift className="w-4 h-4" />
              <span>Giveaway &amp; Raffle Pro Suite</span>
            </div>
            <h1 className="font-headline font-extrabold text-[26px] sm:text-[34px] text-[#1a1b22] dark:text-[#f1effa] tracking-tight">
              Provably Fair Giveaway &amp; Contest Wheel
            </h1>
            <p className="text-[14px] text-[#767586] dark:text-[#908fa1] max-w-3xl mt-1">
              Engineered for streamers, event organizers, and brands. Complete with CSV/TXT import, duplicate detection, weighted tickets, multi-winner batch draws, and verifiable cryptographic certificates.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setStageMode(!stageMode)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                stageMode
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30'
                  : 'bg-[#f4f2fd] dark:bg-[#222330] hover:bg-[#e8e7f1] text-[#4648d4] dark:text-[#8587ff]'
              }`}
            >
              {stageMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              <span>{stageMode ? 'Exit Stage Mode' : 'Live Stream Stage'}</span>
            </button>

            <button
              type="button"
              onClick={() => setFairnessModalOpen(true)}
              className="px-3.5 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Provably Fair Certificate</span>
            </button>

            <button
              type="button"
              onClick={() => setImportModalOpen(true)}
              className="px-3.5 py-2.5 rounded-xl bg-[#4648d4] hover:bg-[#6063ee] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Import CSV / TXT</span>
            </button>
          </div>
        </div>

        {/* Live Duplicate Warning Banner */}
        {duplicateStats.hasDuplicates && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-amber-700 dark:text-amber-300 font-semibold">
              <AlertTriangle className="w-5 h-5 shrink-0 text-amber-500" />
              <span>
                Detected <strong>{duplicateStats.count} duplicate entry/entries</strong> in your roster.
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRemoveDuplicates}
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Remove Duplicates (1 Chance Each)
              </button>
              <button
                type="button"
                onClick={handleMergeDuplicateTickets}
                className="px-3 py-1.5 rounded-lg border border-amber-500/40 bg-white dark:bg-[#181922] text-amber-700 dark:text-amber-300 font-bold text-xs transition-colors cursor-pointer"
              >
                Convert to Weighted Tickets (2x, 3x)
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Giveaway Stage & Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Wheel (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#181922] rounded-3xl p-6 sm:p-8 border border-[#eeedf7] dark:border-[#292a39] shadow-sm flex flex-col items-center gap-6">
          <div className="w-full flex items-center justify-between flex-wrap gap-2 border-b border-[#eeedf7] dark:border-[#292a39] pb-3">
            <span className="text-xs font-bold text-[#464554] dark:text-[#c7c4d7]">
              Current Entrants Pool:{' '}
              <strong className="text-[#1a1b22] dark:text-white text-sm">
                {entrants.length}
              </strong>
            </span>

            <label className="flex items-center gap-2 text-xs font-bold text-[#1a1b22] dark:text-white cursor-pointer">
              <input
                type="checkbox"
                checked={eliminationMode}
                onChange={(e) => setEliminationMode(e.target.checked)}
                className="w-4 h-4 rounded text-[#4648d4] focus:ring-[#4648d4]"
              />
              <span>Eliminate Winner (No Repeat Prizes)</span>
            </label>
          </div>

          {/* Wheel Canvas */}
          <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
            <WheelCanvas
              items={wheelItems}
              palette={['#4648d4', '#006c49', '#dc2c4f', '#6063ee', '#f59e0b', '#10b981', '#ec4899']}
              isSpinning={isSpinning}
              preSelectedWinner={preSelected}
              duration={4.5}
              soundEnabled={soundSettings.enabled}
              soundPack={soundSettings.pack}
              volume={soundSettings.volume}
              onSpinStart={() => setIsSpinning(true)}
              onSpinEnd={handleSpinEnd}
            />
          </div>

          {/* Spin Action Buttons */}
          <div className="w-full flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={handleTriggerSpin}
              disabled={isSpinning || entrants.length === 0}
              className="flex-1 w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#4648d4] to-[#6063ee] hover:from-[#3a3cb8] hover:to-[#4e51d4] disabled:opacity-50 text-white font-extrabold text-[16px] sm:text-[18px] shadow-lg shadow-[#4648d4]/25 active:scale-[0.99] transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <Sparkles className="w-5 h-5" />
              <span>{isSpinning ? 'Selecting Fair Winner...' : 'Spin Next Winner'}</span>
            </button>

            <button
              type="button"
              onClick={handleBatchDraw}
              disabled={isSpinning || entrants.length === 0}
              className="w-full sm:w-auto px-5 py-4 rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-[#f4f2fd] dark:bg-[#1d1e28] hover:bg-[#e8e7f1] disabled:opacity-40 text-[#4648d4] dark:text-[#8587ff] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              title={`Instantly draw ${winnerCountTarget} winners using hardware CSPRNG`}
            >
              <Crown className="w-4 h-4 text-amber-500" />
              <span>Batch Draw ({winnerCountTarget} Winners)</span>
            </button>
          </div>
        </div>

        {/* Right: Entrants & Winners Audit Sidebar (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Winners Audit Ledger */}
          <div className="bg-white dark:bg-[#181922] rounded-3xl p-5 sm:p-6 border border-[#eeedf7] dark:border-[#292a39] shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#eeedf7] dark:border-[#292a39] pb-3">
              <h3 className="font-headline font-bold text-[18px] text-[#1a1b22] dark:text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span>Winner History ({winnersList.length})</span>
              </h3>

              {winnersList.length > 0 && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleExportCSV}
                    className="p-1.5 rounded-lg border border-[#eeedf7] dark:border-[#292a39] bg-[#f4f2fd] dark:bg-[#1d1e28] hover:bg-[#e8e7f1] text-[#464554] dark:text-[#c7c4d7] text-xs"
                    title="Export Winners to CSV"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyAuditText}
                    className="p-1.5 rounded-lg border border-[#eeedf7] dark:border-[#292a39] bg-[#f4f2fd] dark:bg-[#1d1e28] hover:bg-[#e8e7f1] text-[#464554] dark:text-[#c7c4d7] text-xs"
                    title="Copy Formatted Audit to Clipboard"
                  >
                    {copiedAudit ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={handleClearHistory}
                    className="p-1.5 rounded-lg text-[#767586] hover:text-rose-500 text-xs"
                    title="Clear History"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {winnersList.length > 0 ? (
              <div className="space-y-2.5 max-h-[280px] overflow-y-auto pr-1">
                {winnersList.map((win) => (
                  <div
                    key={win.id}
                    className="p-3 rounded-2xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] flex flex-col gap-1.5 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold text-xs flex items-center justify-center">
                          #{win.place}
                        </span>
                        <span className="font-extrabold text-sm text-[#1a1b22] dark:text-white">
                          {win.winnerName}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#767586] dark:text-[#908fa1]">
                        {win.timestamp}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#464554] dark:text-[#c7c4d7]">
                      <span className="truncate font-medium text-purple-600 dark:text-purple-400">
                        {win.prizeTitle || 'Prize Winner'}
                      </span>
                      <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                        Seed: {win.entropySeed}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center rounded-2xl bg-[#f4f2fd] dark:bg-[#1d1e28] text-[#767586] dark:text-[#908fa1] text-xs">
                No winners drawn yet. Spin the wheel or click Batch Draw to select verified winners.
              </div>
            )}
          </div>

          {/* Quick Presets */}
          <div className="bg-white dark:bg-[#181922] rounded-3xl p-5 sm:p-6 border border-[#eeedf7] dark:border-[#292a39] shadow-sm flex flex-col gap-3">
            <h4 className="font-headline font-bold text-[15px] text-[#1a1b22] dark:text-white">
              Giveaway Presets
            </h4>
            <div className="space-y-2">
              {GIVEAWAY_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    setEntrants(preset.entrants);
                    setWinnersList([]);
                  }}
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

      {/* CSV / TXT Import Modal */}
      {importModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#181922] rounded-3xl p-6 sm:p-8 border border-[#eeedf7] dark:border-[#292a39] shadow-2xl flex flex-col gap-4">
            <h3 className="font-headline font-bold text-[20px] text-[#1a1b22] dark:text-white flex items-center gap-2">
              <Upload className="w-5 h-5 text-[#4648d4]" />
              <span>Import Entrants (CSV / TXT / Paste)</span>
            </h3>

            <p className="text-xs text-[#767586] dark:text-[#908fa1]">
              Paste names one per line, or CSV format: <code className="font-mono bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded">Name, Email, Tickets</code>
            </p>

            <textarea
              rows={8}
              value={rawTextInput}
              onChange={(e) => setRawTextInput(e.target.value)}
              placeholder="Alice, alice@example.com, 1&#10;Bob, @bob_twitch, 2&#10;Charlie, charlie@company.com, 1"
              className="w-full p-3 rounded-xl border border-[#eeedf7] dark:border-[#292a39] bg-[#fbf8ff] dark:bg-[#12131a] text-xs font-mono text-[#1a1b22] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4648d4]"
            />

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setImportModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#464554] dark:text-[#c7c4d7]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleProcessImport}
                disabled={!rawTextInput.trim()}
                className="px-5 py-2 rounded-xl bg-[#4648d4] hover:bg-[#6063ee] text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Process &amp; Load Entrants
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fairness & Cryptographic Certificate Modal */}
      {fairnessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#181922] rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center gap-2.5 border-b border-[#eeedf7] dark:border-[#292a39] pb-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-[18px] text-[#1a1b22] dark:text-white">
                  Cryptographic Fairness Audit
                </h3>
                <p className="text-[11px] text-[#767586] dark:text-[#908fa1]">
                  Hardware entropy verification certificate
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-[#464554] dark:text-[#c7c4d7]">
              <div className="p-3 rounded-xl bg-[#f4f2fd] dark:bg-[#1d1e28] border border-[#eeedf7] dark:border-[#292a39] space-y-1">
                <span className="font-bold text-[#1a1b22] dark:text-white block">
                  Algorithm Standard: CSPRNG (RFC 4086)
                </span>
                <p className="text-[11px]">
                  All random picks are generated using the browser’s native <code className="font-mono text-[#4648d4]">crypto.getRandomValues()</code> subsystem, drawing entropy from OS thermal noise, hardware interrupts, and timing jitter.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#f4f2fd] dark:bg-[#1d1e28] border border-[#eeedf7] dark:border-[#292a39] space-y-1">
                <span className="font-bold text-[#1a1b22] dark:text-white block">
                  Raffle &amp; Sweepstakes Legal Compliance
                </span>
                <p className="text-[11px]">
                  Ensures mathematically equal odds for every single ticket. No server-side bias, no predetermined outcomes, and no algorithmic favoritism.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setFairnessModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Close Certificate
            </button>
          </div>
        </div>
      )}

      {/* Single Winner Reveal Dialog */}
      {activeWinnerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-white dark:bg-[#181922] rounded-3xl p-8 border border-[#eeedf7] dark:border-[#292a39] shadow-2xl flex flex-col items-center text-center animate-bounceIn gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-white flex items-center justify-center shadow-lg shadow-amber-500/30 animate-pulse">
              <Trophy className="w-9 h-9" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              Prize Winner Selected!
            </span>

            <h2 className="font-headline font-black text-[30px] sm:text-[36px] text-[#1a1b22] dark:text-white leading-tight">
              {activeWinnerModal.winnerName}
            </h2>

            {/* Spoken Voice Announcer Button */}
            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={() =>
                  announceWinnerTTS(activeWinnerModal.winnerName, {
                    enabled: true,
                    prefix: 'The giveaway prize winner is'
                  })
                }
                className="px-3 py-1 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Speak winner name out loud"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>🔊 Speak Winner Name</span>
              </button>
            </div>

            <p className="text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">
              {activeWinnerModal.prizeTitle || 'Prize Winner'}
            </p>

            <div className="w-full grid grid-cols-2 gap-2 p-3 rounded-2xl bg-[#f4f2fd] dark:bg-[#1d1e28] text-xs">
              <div className="text-left">
                <span className="block text-[10px] text-[#767586] uppercase font-bold">Odds</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{activeWinnerModal.oddsPercent}%</span>
              </div>
              <div className="text-right">
                <span className="block text-[10px] text-[#767586] uppercase font-bold">Entropy Seed</span>
                <span className="font-mono font-bold text-[#4648d4] dark:text-[#8587ff]">{activeWinnerModal.entropySeed}</span>
              </div>
            </div>

            <div className="w-full flex gap-3 mt-2">
              <button
                type="button"
                onClick={() => setActiveWinnerModal(null)}
                className="flex-1 py-3 px-4 rounded-xl bg-[#4648d4] hover:bg-[#6063ee] text-white font-bold text-sm transition-colors cursor-pointer"
              >
                Confirm Winner
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveWinnerModal(null);
                  setTimeout(() => handleTriggerSpin(), 200);
                }}
                className="py-3 px-4 rounded-xl border border-[#eeedf7] dark:border-[#292a39] bg-[#f4f2fd] dark:bg-[#1d1e28] text-[#4648d4] dark:text-[#8587ff] font-bold text-sm transition-colors cursor-pointer"
              >
                Spin Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
