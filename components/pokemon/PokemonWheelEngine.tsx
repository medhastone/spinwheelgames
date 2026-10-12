'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Link from 'next/link';
import confetti from '@/lib/confetti';
import {
  Sparkles,
  RotateCw,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Filter,
  RefreshCw,
  Copy,
  Swords,
  Shield,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Trophy,
  History,
  Heart,
  Plus,
  Skull,
  X,
  Flame,
  Dices,
  Layers,
  Search,
  Check,
  Disc,
  Shuffle,
  List,
  SlidersHorizontal,
  Play
} from 'lucide-react';
import {
  ALL_POKEMON_DATABASE,
  POKEMON_TYPE_CONFIG,
  POKEMON_GENERATIONS,
  NUZLOCKE_RULES,
  NUZLOCKE_SAMPLE_ROUTES,
  PokemonItem,
  formatDexNumber,
  getPokemonColor
} from '@/lib/pokemonData';
import {
  playTickSound,
  playWinnerFanfare,
  playClickSound,
  unlockAudioContext
} from '@/lib/sound';
import { useSavedWheels, toggleWheelFavorite } from '@/lib/storage';

// Hardware-grade CSPRNG
function getCryptoRandomFloat(): number {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0] / (0xffffffff + 1);
  }
  return Math.random();
}

function getCryptoRandomItem<T>(items: T[]): T | null {
  if (!items || items.length === 0) return null;
  const index = Math.floor(getCryptoRandomFloat() * items.length);
  return items[index];
}

interface SpinAuditRecord {
  id: string;
  time: string;
  name: string;
  dexNumber: number;
  types: string[];
  gen: number;
  seed: string;
}

export default function PokemonWheelEngine() {
  // Profile Favorites Hook
  const savedWheels = useSavedWheels();
  const isGameFavorited = savedWheels.some(
    (w) => w.id === 'pokemon-wheel' || w.title.trim().toLowerCase() === 'random pokemon generator'
  );
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2400);
  };

  const handleFavoriteGame = () => {
    const isNowSaved = toggleWheelFavorite({
      id: 'pokemon-wheel',
      title: 'Random Pokémon Generator & Picker',
      category: 'Gaming & Pop Culture',
      description: 'Spin across all 9 generations with type filters, team generator, and Nuzlocke roulette.',
      items: ALL_POKEMON_DATABASE.slice(0, 12).map((p) => ({
        id: p.id,
        text: `${formatDexNumber(p.dexNumber)} ${p.name}`,
        weight: 1
      })),
      paletteKey: 'vibrant'
    });
    showToast(isNowSaved ? '❤️ Saved Pokemon Wheel to Profile Favorites!' : 'Removed from Favorites');
  };

  // Main Tabs
  const [activeTab, setActiveTab] = useState<'wheel' | 'team' | 'nuzlocke' | 'instant'>('wheel');

  // Filter States
  const [selectedGen, setSelectedGen] = useState<number | 'all'>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [stageFilter, setStageFilter] = useState<'all' | 'starters' | 'fully-evolved' | 'legendary'>('all');
  const [isNoRepeat, setIsNoRepeat] = useState<boolean>(false);
  const [eliminatedIds, setEliminatedIds] = useState<Set<string>>(new Set());

  // Engine Audio & Screen States
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const engineContainerRef = useRef<HTMLDivElement>(null);

  // Wheel Spin States
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [winner, setWinner] = useState<PokemonItem | null>(null);
  const [spinHistory, setSpinHistory] = useState<SpinAuditRecord[]>([]);
  const lastTickAngleRef = useRef<number>(0);
  const spinAnimFrameRef = useRef<number | null>(null);

  // Team Generator State (6-mon squad)
  const [teamList, setTeamList] = useState<PokemonItem[]>([]);
  const [isGeneratingTeam, setIsGeneratingTeam] = useState<boolean>(false);

  // Nuzlocke State
  const [nuzlockeRoute, setNuzlockeRoute] = useState<string>(NUZLOCKE_SAMPLE_ROUTES[0].name);
  const [nuzlockeCaught, setNuzlockeCaught] = useState<{ route: string; pokemon: PokemonItem; status: 'active' | 'fainted' | 'boxed' }[]>([]);
  const [activeRules, setActiveRules] = useState<Record<string, boolean>>({
    faint: true,
    first_catch: true,
    nickname: true,
    dupes_clause: true,
    shiny_clause: true
  });

  // Filtered Pokémon pool
  const filteredPool = useMemo(() => {
    return ALL_POKEMON_DATABASE.filter((mon) => {
      if (selectedGen !== 'all' && mon.generation !== selectedGen) return false;
      if (selectedType !== 'all' && !mon.types.includes(selectedType)) return false;
      if (stageFilter === 'starters' && !mon.isStarter) return false;
      if (stageFilter === 'legendary' && !mon.isLegendary) return false;
      if (stageFilter === 'fully-evolved' && mon.evolutionStage !== 'Stage 2' && mon.evolutionStage !== 'Legendary' && mon.evolutionStage !== 'Single') return false;
      if (isNoRepeat && eliminatedIds.has(mon.id)) return false;
      return true;
    });
  }, [selectedGen, selectedType, stageFilter, isNoRepeat, eliminatedIds]);

  const [isWinnerModalOpen, setIsWinnerModalOpen] = useState<boolean>(false);
  const [shuffleSeed, setShuffleSeed] = useState<number>(0);

  const handleShuffle = () => {
    setShuffleSeed((prev) => prev + 1);
    if (isSoundEnabled) playClickSound(true, 0.7);
    showToast('🔀 Shuffled Pokémon Slices!');
  };

  // Slices displayed on the physical wheel (sample if pool is large)
  const wheelSlices = useMemo(() => {
    if (filteredPool.length === 0) return [];
    if (filteredPool.length <= 16) return filteredPool;
    const shuffled = [...filteredPool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 14);
  }, [filteredPool, shuffleSeed]);

  // Sidebar Roster & Tabs
  const [rosterSearch, setRosterSearch] = useState<string>('');
  const [rightPanelTab, setRightPanelTab] = useState<'roster' | 'team' | 'history'>('roster');

  const activeRoster = useMemo(() => {
    if (!rosterSearch.trim()) return filteredPool;
    const q = rosterSearch.toLowerCase().trim();
    return filteredPool.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.dexNumber.toString().includes(q) ||
        p.types.some((t) => t.toLowerCase().includes(q))
    );
  }, [filteredPool, rosterSearch]);

  // High-Resolution Canvas Wheel Drawing (1200 x 1200)
  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 1200;
    const height = 1200;
    const centerX = 600;
    const centerY = 600;
    const radius = 540;

    ctx.clearRect(0, 0, width, height);

    if (wheelSlices.length === 0) {
      // Empty wheel state
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fillStyle = '#1e1b4b';
      ctx.fill();
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 10;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('All Pokémon Drawn!', 0, -25);
      ctx.font = '24px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('Click "Reset Active Pool" Below', 0, 30);
      ctx.restore();
      return;
    }

    const numSlices = wheelSlices.length;
    const sliceAngle = (Math.PI * 2) / numSlices;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rotation);

    // Draw slices
    for (let i = 0; i < numSlices; i++) {
      const mon = wheelSlices[i];
      const startAngle = i * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();

      // Type-based vibrant gradient
      const grad = ctx.createRadialGradient(0, 0, radius * 0.15, 0, 0, radius);
      const mainColor = getPokemonColor(mon.types[0]);
      grad.addColorStop(0, '#1e293b');
      grad.addColorStop(0.35, mainColor);
      grad.addColorStop(1, '#0f172a');

      ctx.fillStyle = grad;
      ctx.fill();

      // Border line between slices
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Text label and Type Icon
      ctx.save();
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
      ctx.shadowBlur = 8;

      const fontSize = numSlices > 12 ? 22 : 26;
      ctx.font = `bold ${fontSize}px system-ui, -apple-system, sans-serif`;
      const displayName = mon.name.length > 13 ? mon.name.slice(0, 12) + '…' : mon.name;
      ctx.fillText(displayName, radius - 65, 0);

      // Type Emoji badge near rim
      const typeIcon = POKEMON_TYPE_CONFIG[mon.types[0]]?.icon || '⭐';
      ctx.font = '22px system-ui, -apple-system, sans-serif';
      ctx.fillText(typeIcon, radius - 24, 0);

      ctx.restore();
    }

    // Outer ring with Pokéball rim styling
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 14;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius + 8, 0, Math.PI * 2);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.restore();

    // Center Hub (Authentic Pokéball Styling)
    ctx.save();
    ctx.translate(centerX, centerY);

    // Hub Outer Ring
    ctx.beginPath();
    ctx.arc(0, 0, 84, 0, Math.PI * 2);
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 6;
    ctx.stroke();

    // Top Red Half
    ctx.beginPath();
    ctx.arc(0, 0, 74, Math.PI, 0, false);
    ctx.fillStyle = '#dc2626';
    ctx.fill();

    // Bottom White Half
    ctx.beginPath();
    ctx.arc(0, 0, 74, 0, Math.PI, false);
    ctx.fillStyle = '#f8fafc';
    ctx.fill();

    // Center Horizontal Belt
    ctx.beginPath();
    ctx.moveTo(-74, 0);
    ctx.lineTo(74, 0);
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 12;
    ctx.stroke();

    // Center Outer Button
    ctx.beginPath();
    ctx.arc(0, 0, 26, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 6;
    ctx.stroke();

    // Center Inner Pearl
    ctx.beginPath();
    ctx.arc(0, 0, 14, 0, Math.PI * 2);
    ctx.fillStyle = '#e2e8f0';
    ctx.fill();

    ctx.restore();
  }, [rotation, wheelSlices]);

  useEffect(() => {
    drawWheel();
  }, [drawWheel]);

  // Audio tick trigger during spin
  const checkTickSound = (currentRotation: number) => {
    if (!isSoundEnabled || wheelSlices.length === 0) return;
    const sliceAngle = (Math.PI * 2) / wheelSlices.length;
    const currentSlice = Math.floor(currentRotation / sliceAngle);
    const lastSlice = Math.floor(lastTickAngleRef.current / sliceAngle);
    if (currentSlice !== lastSlice) {
      playTickSound(1);
      lastTickAngleRef.current = currentRotation;
    }
  };

  // Perform Spin
  const spinWheel = useCallback(() => {
    if (isSpinning || wheelSlices.length === 0) return;
    unlockAudioContext();
    if (isSoundEnabled) playClickSound();

    setIsSpinning(true);
    setWinner(null);

    // Pick winning index with CSPRNG
    const winningIndex = Math.floor(getCryptoRandomFloat() * wheelSlices.length);
    const winningMon = wheelSlices[winningIndex];

    const sliceAngle = (Math.PI * 2) / wheelSlices.length;
    // Pointer is at the top (angle -PI/2 or 3PI/2)
    const pointerAngle = (3 * Math.PI) / 2;
    // Calculate target angle
    const targetSliceCenter = winningIndex * sliceAngle + sliceAngle / 2;
    let targetAngle = pointerAngle - targetSliceCenter;
    while (targetAngle < 0) targetAngle += Math.PI * 2;

    const fullSpins = (6 + Math.floor(getCryptoRandomFloat() * 4)) * Math.PI * 2;
    const finalRotation = rotation + fullSpins + (targetAngle - (rotation % (Math.PI * 2)));

    const startTime = performance.now();
    const duration = 4400; // ms
    const initialRot = rotation;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic curve
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentRot = initialRot + (finalRotation - initialRot) * ease;

      setRotation(currentRot);
      checkTickSound(currentRot);

      if (progress < 1) {
        spinAnimFrameRef.current = requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        setWinner(winningMon);
        setIsWinnerModalOpen(true);

        if (isSoundEnabled) {
          playWinnerFanfare();
        }

        // Fire celebratory confetti
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.6 }
        });

        // Add to audit history
        const auditRecord: SpinAuditRecord = {
          id: Math.random().toString(36).substring(2, 9),
          time: new Date().toLocaleTimeString(),
          name: winningMon.name,
          dexNumber: winningMon.dexNumber,
          types: winningMon.types,
          gen: winningMon.generation,
          seed: Math.random().toString(16).slice(2, 10).toUpperCase()
        };
        setSpinHistory((prev) => [auditRecord, ...prev.slice(0, 19)]);

        // Handle no-repeat elimination
        if (isNoRepeat) {
          setEliminatedIds((prev) => new Set(prev).add(winningMon.id));
        }
      }
    };

    spinAnimFrameRef.current = requestAnimationFrame(animate);
  }, [isSpinning, wheelSlices, rotation, isSoundEnabled, isNoRepeat]);

  // Clean animation frame on unmount
  useEffect(() => {
    return () => {
      if (spinAnimFrameRef.current) cancelAnimationFrame(spinAnimFrameRef.current);
    };
  }, []);

  // Reset Eliminated Pool
  const handleResetPool = () => {
    setEliminatedIds(new Set());
    showToast('🔄 Pokémon Pool Reset to Full!');
  };

  // Generate 6-Pokemon Random Team
  const handleGenerateTeam = () => {
    setIsGeneratingTeam(true);
    unlockAudioContext();
    if (isSoundEnabled) playClickSound();

    setTimeout(() => {
      const pool = filteredPool.length >= 6 ? filteredPool : ALL_POKEMON_DATABASE;
      const shuffled = [...pool].sort(() => getCryptoRandomFloat() - 0.5);
      const selected = shuffled.slice(0, 6);
      setTeamList(selected);
      setIsGeneratingTeam(false);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      showToast('⚡ Balanced 6-Pokémon Battle Team Assembled!');
    }, 450);
  };

  // Nuzlocke Route Catch Handler
  const handleNuzlockeRoll = () => {
    unlockAudioContext();
    if (isSoundEnabled) playClickSound();

    const pool = filteredPool.length > 0 ? filteredPool : ALL_POKEMON_DATABASE;
    const drawn = getCryptoRandomItem(pool);
    if (!drawn) return;

    setWinner(drawn);
    setNuzlockeCaught((prev) => [
      { route: nuzlockeRoute, pokemon: drawn, status: 'active' },
      ...prev
    ]);
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.65 } });
    showToast(`🎯 Route Encounter Caught: ${drawn.name}!`);
  };

  // Mark Nuzlocke Pokémon as Fainted
  const handleFaintPokemon = (index: number) => {
    setNuzlockeCaught((prev) => {
      const copy = [...prev];
      if (copy[index]) {
        copy[index].status = copy[index].status === 'fainted' ? 'active' : 'fainted';
      }
      return copy;
    });
    showToast('💀 Pokémon status updated in Nuzlocke roster.');
  };

  // Copy Team for Showdown
  const handleCopyShowdownTeam = () => {
    if (teamList.length === 0) return;
    const showdownText = teamList
      .map(
        (p) => `${p.name} @ Leftovers\nAbility: ${p.ability}\nEVs: 252 Atk / 4 SpD / 252 Spe\n- Move 1\n- Move 2\n- Move 3\n- Move 4\n`
      )
      .join('\n');

    navigator.clipboard?.writeText(showdownText);
    showToast('📋 Copied Team to Clipboard (Showdown Format)!');
  };

  // Fullscreen Toggle
  const toggleFullscreen = () => {
    if (!engineContainerRef.current) return;
    if (!document.fullscreenElement) {
      engineContainerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={engineContainerRef}
      aria-label="Interactive Pokémon Wheel Engine"
      className={`w-full transition-all ${
        isFullscreen
          ? 'fixed inset-0 z-50 bg-[#fbf8ff] dark:bg-[#0d0e15] p-4 sm:p-6 overflow-y-auto flex items-center justify-center'
          : 'flex flex-col gap-3 sm:gap-4'
      }`}
    >
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Engine Modes Switcher Bar - Compact & Clean (matching Home Page #interactive-workspace) */}
      <div id="interactive-workspace" className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 pt-1 sm:pt-2 pb-1">
        <div className="flex flex-wrap items-center justify-between gap-2.5 bg-white dark:bg-[#181922] p-1.5 sm:p-2 rounded-2xl border border-[#eeedf7] dark:border-[#222330] shadow-2xs">
          {/* Primary View Switcher Pills */}
          <div className="flex flex-wrap items-center gap-1">
            <button
              type="button"
              onClick={() => {
                unlockAudioContext();
                setActiveTab('wheel');
                if (isSoundEnabled) playClickSound(true, 0.7);
              }}
              className={`px-3 py-1.5 rounded-xl text-[12px] sm:text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'wheel'
                  ? 'bg-[#4648d4] text-white shadow-xs'
                  : 'text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330]'
              }`}
            >
              <Disc className="w-3.5 h-3.5" />
              <span>Single Wheel Picker</span>
            </button>

            <button
              type="button"
              onClick={() => {
                unlockAudioContext();
                setActiveTab('team');
                if (isSoundEnabled) playClickSound(true, 0.7);
              }}
              className={`px-3 py-1.5 rounded-xl text-[12px] sm:text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'team'
                  ? 'bg-[#4648d4] text-white shadow-xs'
                  : 'text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330]'
              }`}
            >
              <Swords className="w-3.5 h-3.5 text-rose-500" />
              <span>6-Mon Team Builder</span>
            </button>

            <button
              type="button"
              onClick={() => {
                unlockAudioContext();
                setActiveTab('nuzlocke');
                if (isSoundEnabled) playClickSound(true, 0.7);
              }}
              className={`px-3 py-1.5 rounded-xl text-[12px] sm:text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'nuzlocke'
                  ? 'bg-[#4648d4] text-white shadow-xs'
                  : 'text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330]'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-amber-500" />
              <span>Nuzlocke Route Roulette</span>
            </button>

            <button
              type="button"
              onClick={() => {
                unlockAudioContext();
                setActiveTab('instant');
                if (isSoundEnabled) playClickSound(true, 0.7);
              }}
              className={`px-3 py-1.5 rounded-xl text-[12px] sm:text-[13px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'instant'
                  ? 'bg-[#4648d4] text-white shadow-xs'
                  : 'text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330]'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-blue-500" />
              <span>Instant Multi-Roll</span>
            </button>
          </div>

          {/* Right Status Badge */}
          <div className="flex items-center gap-2 pr-1">
            <span className="text-[11px] font-mono font-bold text-[#464554] dark:text-[#c7c4d7] bg-[#f4f2fd] dark:bg-[#222330] px-2.5 py-1 rounded-lg border border-[#eeedf7] dark:border-[#2e3042]">
              {filteredPool.length} in Pool
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: TWO-COLUMN WORKSPACE (Dominant Left Stage + Sleek Right Sidebar)   */}
      {/* Exactly matches Home Page layout rhythm and responsiveness                */}
      {/* ========================================================================= */}
      {activeTab === 'wheel' && (
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-stretch justify-center gap-4 sm:gap-5 lg:gap-6">
          {/* --------------------------------------------------------------------- */}
          {/* LEFT COLUMN: Large Centered Wheel Stage (~800–960px on Desktop)       */}
          {/* --------------------------------------------------------------------- */}
          <div className="flex-1 w-full lg:min-w-0 bg-white dark:bg-[#0f1017] rounded-3xl border border-[#eeedf7] dark:border-[#20212f] p-3.5 sm:p-6 lg:p-7 flex flex-col justify-between items-center shadow-lg dark:shadow-xl relative min-h-[auto] sm:min-h-[640px] lg:min-h-[720px] transition-colors overflow-hidden">
            {/* Top Stage Bar */}
            <div className="w-full flex items-center justify-between z-10">
              {/* Pointer / Preset label badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4f2fd] dark:bg-[#1b1c28] border border-[#eeedf7] dark:border-[#2e3042] text-xs font-bold text-[#464554] dark:text-[#c7c4d7]">
                <span>Pokémon Wheel</span>
                <span className="text-[10px] text-[#4648d4] dark:text-[#8587ff]">({filteredPool.length})</span>
              </div>

              {/* Stage Quick Icons (Sound, Shuffle, Reset, Fullscreen) */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    unlockAudioContext();
                    const next = !isSoundEnabled;
                    setIsSoundEnabled(next);
                    if (next) playClickSound(true, 0.8);
                  }}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                    isSoundEnabled
                      ? 'bg-[#f4f2fd] dark:bg-[#1b1c28] text-[#4648d4] dark:text-white border-[#eeedf7] dark:border-[#2e3042]'
                      : 'bg-[#f4f2fd] dark:bg-[#14151e] text-[#908fa1] dark:text-[#6b6a7a] border-[#eeedf7] dark:border-[#2e3042]'
                  }`}
                  title={isSoundEnabled ? 'Audio On' : 'Audio Muted'}
                  aria-label="Toggle audio"
                >
                  {isSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                <button
                  type="button"
                  onClick={handleShuffle}
                  className="p-2 rounded-xl bg-[#f4f2fd] dark:bg-[#1b1c28] text-[#464554] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white border border-[#eeedf7] dark:border-[#2e3042] transition-colors cursor-pointer"
                  title="Shuffle displayed slices"
                  aria-label="Shuffle slices"
                >
                  <Shuffle className="w-4 h-4" />
                </button>

                {eliminatedIds.size > 0 && (
                  <button
                    type="button"
                    onClick={handleResetPool}
                    className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 border border-amber-500/30 transition-colors cursor-pointer"
                    title={`Reset ${eliminatedIds.size} eliminated Pokémon`}
                    aria-label="Reset eliminated Pokémon"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}

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
              <div className="w-full max-w-[min(88vw,330px)] sm:max-w-[420px] md:max-w-[460px] lg:max-w-[500px] aspect-square relative flex items-center justify-center">
                {/* Pointer Needle at 12 o'clock */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none drop-shadow-md">
                  <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[26px] border-t-amber-400 filter drop-shadow(0 2px 4px rgba(0,0,0,0.4))" />
                </div>

                {/* High-Resolution HTML5 Canvas */}
                <canvas
                  ref={canvasRef}
                  width={1200}
                  height={1200}
                  onClick={spinWheel}
                  className="w-full h-full object-contain filter drop-shadow-xl select-none touch-manipulation cursor-pointer"
                />
              </div>
            </div>

            {/* Bottom Stage Toolbar */}
            <div className="w-full pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#eeedf7] dark:border-[#1e1f2d]">
              {/* Action Bar (Top on mobile, sides on desktop) */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      unlockAudioContext();
                      const next = !isSoundEnabled;
                      setIsSoundEnabled(next);
                      if (next) playClickSound(true, 0.8);
                    }}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                      isSoundEnabled
                        ? 'bg-[#f4f2fd] dark:bg-[#1b1c28] text-[#4648d4] dark:text-white border-[#eeedf7] dark:border-[#2e3042]'
                        : 'bg-[#f4f2fd] dark:bg-[#14151e] text-[#908fa1] dark:text-[#6b6a7a] border-[#eeedf7] dark:border-[#2e3042]'
                    }`}
                    title={isSoundEnabled ? 'Sound On' : 'Sound Muted'}
                    aria-label="Toggle sound"
                  >
                    {isSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </button>

                  <button
                    type="button"
                    onClick={handleShuffle}
                    className="p-2.5 rounded-xl bg-[#f4f2fd] dark:bg-[#1b1c28] text-[#464554] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white border border-[#eeedf7] dark:border-[#2e3042] transition-colors cursor-pointer"
                    title="Shuffle slices"
                    aria-label="Shuffle slices"
                  >
                    <Shuffle className="w-4 h-4" />
                  </button>

                  {eliminatedIds.size > 0 && (
                    <button
                      type="button"
                      onClick={handleResetPool}
                      className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 border border-amber-500/30 transition-colors cursor-pointer"
                      title="Reset eliminated Pokémon"
                      aria-label="Reset pool"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Mobile Web Crypto Badge */}
                <span className="sm:hidden inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#f4f2fd] dark:bg-[#14151e] border border-[#eeedf7] dark:border-[#2e3042] text-[10px] font-bold text-[#006c49] dark:text-emerald-400 font-mono">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Web Crypto</span>
                </span>
              </div>

              {/* Center: Large Tactile Spin Button (matching SpinButton on Home Page) */}
              <div className="w-full sm:flex-1 sm:max-w-sm flex items-center justify-center">
                <button
                  type="button"
                  onClick={spinWheel}
                  disabled={isSpinning || wheelSlices.length === 0}
                  className={`relative w-full py-3.5 sm:py-4 px-6 rounded-2xl font-headline font-bold text-[16px] sm:text-[18px] tracking-wide shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer select-none ${
                    isSpinning
                      ? 'bg-gradient-to-r from-[#5052e4] to-[#7678f5] text-white opacity-90 cursor-not-allowed scale-[0.98]'
                      : wheelSlices.length === 0
                      ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed opacity-60'
                      : 'bg-gradient-to-r from-[#4648d4] via-[#5b5de8] to-[#4648d4] hover:from-[#5052e4] hover:to-[#6a6cf8] active:scale-[0.97] text-white shadow-[0_8px_24px_rgba(70,72,212,0.38)]'
                  }`}
                >
                  {isSpinning ? (
                    <div className="flex items-center gap-2">
                      <RotateCw className="w-5 h-5 animate-spin" />
                      <span>SPINNING POKÉMON...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Play className="w-5 h-5 fill-current" />
                      <span>SPIN POKÉMON WHEEL</span>
                      <kbd className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/20 text-white ml-1">
                        Space
                      </kbd>
                    </div>
                  )}
                </button>
              </div>

              {/* Right: Desktop Web Crypto Badge */}
              <div className="hidden sm:flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#f4f2fd] dark:bg-[#14151e] border border-[#eeedf7] dark:border-[#2e3042] text-[11px] font-bold text-[#006c49] dark:text-emerald-400 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Web Crypto CSPRNG</span>
                </span>
              </div>
            </div>

            {/* MOBILE ONLY: Inline Winner Card directly below stage when present */}
            {winner && (
              <div className="w-full lg:hidden mt-3 pt-3 border-t border-[#eeedf7] dark:border-[#1e1f2d]">
                <div className="p-3.5 rounded-2xl bg-[#fbf8ff] dark:bg-[#151624] border border-[#eeedf7] dark:border-[#2a2b3d] shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs font-extrabold text-[#4648d4] dark:text-[#8587ff] bg-[#f4f2fd] dark:bg-[#202130] px-1.5 py-0.5 rounded border border-[#eeedf7] dark:border-[#2e3042]">
                        {formatDexNumber(winner.dexNumber)}
                      </span>
                      <span className="text-[11px] text-gray-500 font-medium">
                        Gen {winner.generation} • {winner.region}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                      {winner.archetype}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="w-14 h-14 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center p-1 shrink-0">
                      <img
                        src={winner.spriteUrl}
                        alt={winner.name}
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${winner.dexNumber}.png`;
                        }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-black text-gray-900 dark:text-white truncate">
                        {winner.name}
                      </h3>
                      <div className="flex flex-wrap gap-1 my-1">
                        {winner.types.map((type) => (
                          <span
                            key={type}
                            className="px-2 py-0.5 rounded text-[10px] font-bold text-white shadow-xs"
                            style={{ backgroundColor: POKEMON_TYPE_CONFIG[type]?.colorHex || '#ef4444' }}
                          >
                            {POKEMON_TYPE_CONFIG[type]?.icon} {type}
                          </span>
                        ))}
                      </div>
                      <div className="text-[10px] text-gray-500 truncate">
                        Ability: <strong>{winner.ability}</strong> • BST {winner.baseStatTotal}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 pt-2 border-t border-[#eeedf7] dark:border-[#222332]">
                    <button
                      type="button"
                      onClick={spinWheel}
                      disabled={isSpinning}
                      className="flex-1 py-2 px-3 rounded-xl text-xs font-bold bg-[#4648d4] hover:bg-[#3d3fba] text-white flex items-center justify-center gap-1 cursor-pointer min-h-[36px]"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Spin Again</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (teamList.length < 6) {
                          setTeamList((prev) => [...prev, winner]);
                          showToast(`✅ Added ${winner.name} to team!`);
                        } else {
                          showToast('⚠️ Team is full (6/6)!');
                        }
                      }}
                      className="py-2 px-3 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 flex items-center gap-1 cursor-pointer min-h-[36px]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Team</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsWinnerModalOpen(true)}
                      className="py-2 px-3 rounded-xl text-xs font-semibold bg-[#f4f2fd] dark:bg-[#1b1c28] border border-[#eeedf7] dark:border-[#2e3042] text-[#4648d4] dark:text-[#8587ff] flex items-center gap-1 cursor-pointer min-h-[36px]"
                    >
                      <span>Full Stats</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

        {/* ------------------------------------------------------------------------- */}
        {/* RIGHT COLUMN: Sleek Configuration Card (~340–360px on Desktop)            */}
        {/* Fully responsive: right sidebar on desktop, clean stacked below on mobile */}
        {/* ------------------------------------------------------------------------- */}
        <div className="w-full lg:w-[340px] xl:w-[360px] shrink-0 flex flex-col gap-3">
          <div className="bg-white dark:bg-[#0f1017] text-[#1a1b22] dark:text-white rounded-3xl border border-[#eeedf7] dark:border-[#20212f] p-4 sm:p-5 shadow-lg dark:shadow-xl flex flex-col gap-3.5 transition-colors">
            {/* Breadcrumb Navigation */}
            <div className="text-[11px] text-[#767586] dark:text-[#908fa1] flex items-center gap-1.5 font-medium truncate">
              <Link href="/" className="hover:text-[#1a1b22] dark:hover:text-white transition-colors">
                Home
              </Link>
              <span>›</span>
              <span className="text-[#464554] dark:text-[#c7c4d7]">Generators</span>
              <span>›</span>
              <span className="text-[#4648d4] dark:text-[#8587ff] font-semibold truncate">Pokémon Wheel</span>
            </div>

            {/* Title & Favorite */}
            <div className="space-y-1 border-b border-[#eeedf7] dark:border-[#1e1f2d] pb-3">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-headline font-black text-xl sm:text-2xl text-[#1a1b22] dark:text-white tracking-tight">
                  Pokémon Picker
                </h2>
                <button
                  type="button"
                  onClick={handleFavoriteGame}
                  className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                    isGameFavorited
                      ? 'bg-rose-500/10 border-rose-500/30 text-rose-500 dark:text-rose-400'
                      : 'bg-[#f4f2fd] dark:bg-[#1b1c28] border-[#eeedf7] dark:border-[#2e3042] text-[#767586] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white'
                  }`}
                  title={isGameFavorited ? 'Saved to favorites' : 'Save to favorites'}
                  aria-label="Toggle favorite"
                >
                  <Heart className={`w-4 h-4 ${isGameFavorited ? 'fill-rose-500' : ''}`} />
                </button>
              </div>
              <p className="text-xs text-[#464554] dark:text-[#908fa1] leading-relaxed line-clamp-2">
                Filter across all 9 generations &amp; 18 types, or draft 6-mon battle teams.
              </p>
            </div>

            {/* Sub-Panel Tabs (Filters & Pool, Party, Spin History) */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-[#f4f2fd] dark:bg-[#181926] rounded-xl border border-[#eeedf7] dark:border-[#222334] text-xs">
              <button
                type="button"
                onClick={() => setRightPanelTab('roster')}
                className={`py-1.5 px-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  rightPanelTab === 'roster'
                    ? 'bg-[#4648d4] text-white shadow-xs'
                    : 'text-[#464554] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>
              <button
                type="button"
                onClick={() => setRightPanelTab('team')}
                className={`py-1.5 px-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  rightPanelTab === 'team'
                    ? 'bg-[#4648d4] text-white shadow-xs'
                    : 'text-[#464554] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white'
                }`}
              >
                <Swords className="w-3.5 h-3.5" />
                <span>Party ({teamList.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setRightPanelTab('history')}
                className={`py-1.5 px-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  rightPanelTab === 'history'
                    ? 'bg-[#4648d4] text-white shadow-xs'
                    : 'text-[#464554] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>Spins ({spinHistory.length})</span>
              </button>
            </div>

            {/* SUB-PANEL 1: FILTERS & ACTIVE POOL */}
            {rightPanelTab === 'roster' && (
              <div className="flex flex-col gap-3">
                {/* Generation Select */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#464554] dark:text-[#c7c4d7] flex items-center justify-between">
                    <span>Generation Filter</span>
                    <span className="text-[10px] text-[#767586] font-normal">All 9 Gens</span>
                  </label>
                  <select
                    value={selectedGen}
                    onChange={(e) => {
                      const v = e.target.value === 'all' ? 'all' : Number(e.target.value);
                      setSelectedGen(v as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 'all');
                    }}
                    className="w-full text-xs font-semibold py-2 px-2.5 rounded-xl border border-[#eeedf7] dark:border-[#2e3042] bg-[#fbf8ff] dark:bg-[#181926] text-[#1a1b22] dark:text-white focus:outline-none focus:ring-1 focus:ring-[#4648d4] cursor-pointer"
                  >
                    <option value="all">All Generations (Gen 1 – 9)</option>
                    {POKEMON_GENERATIONS.map((g) => (
                      <option key={g.gen} value={g.gen}>
                        Gen {g.gen}: {g.region} ({g.games})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Elemental Type Select */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#464554] dark:text-[#c7c4d7] flex items-center justify-between">
                    <span>Elemental Type Filter</span>
                    <span className="text-[10px] text-[#767586] font-normal">18 Types</span>
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full text-xs font-semibold py-2 px-2.5 rounded-xl border border-[#eeedf7] dark:border-[#2e3042] bg-[#fbf8ff] dark:bg-[#181926] text-[#1a1b22] dark:text-white focus:outline-none focus:ring-1 focus:ring-[#4648d4] cursor-pointer"
                  >
                    <option value="all">All 18 Elemental Types</option>
                    {Object.keys(POKEMON_TYPE_CONFIG).map((t) => (
                      <option key={t} value={t}>
                        {POKEMON_TYPE_CONFIG[t]?.icon} {t} Type
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category & Evolution Filter */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#464554] dark:text-[#c7c4d7]">
                    Evolution Stage &amp; Category
                  </label>
                  <select
                    value={stageFilter}
                    onChange={(e) => setStageFilter(e.target.value as 'all' | 'starters' | 'fully-evolved' | 'legendary')}
                    className="w-full text-xs font-semibold py-2 px-2.5 rounded-xl border border-[#eeedf7] dark:border-[#2e3042] bg-[#fbf8ff] dark:bg-[#181926] text-[#1a1b22] dark:text-white focus:outline-none focus:ring-1 focus:ring-[#4648d4] cursor-pointer"
                  >
                    <option value="all">All Pokémon (Basic to Legendary)</option>
                    <option value="starters">Starter Pokémon Only</option>
                    <option value="fully-evolved">Fully Evolved Only (Stage 2/Single)</option>
                    <option value="legendary">Legendary &amp; Mythical Only</option>
                  </select>
                </div>

                {/* No-Repeat Elimination Toggle */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f4f2fd] dark:bg-[#161726] border border-[#eeedf7] dark:border-[#28293d]">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-[#1a1b22] dark:text-white block">
                      No-Repeat Mode
                    </span>
                    <span className="text-[10px] text-[#767586] dark:text-[#908fa1]">
                      Eliminate drawn Pokémon
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsNoRepeat((prev) => !prev);
                      showToast(!isNoRepeat ? '✅ No-Repeat ON: Drawn Pokémon will be removed' : 'ℹ️ No-Repeat OFF');
                    }}
                    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                      isNoRepeat ? 'bg-[#4648d4]' : 'bg-gray-300 dark:bg-gray-700'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        isNoRepeat ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Pool Counts & Reset Indicator */}
                <div className="flex items-center justify-between text-[11px] text-[#767586] dark:text-[#908fa1] px-0.5">
                  <span>
                    Pool: <strong className="text-[#1a1b22] dark:text-white">{filteredPool.length}</strong> active
                  </span>
                  {eliminatedIds.size > 0 && (
                    <button
                      type="button"
                      onClick={handleResetPool}
                      className="text-amber-600 dark:text-amber-400 font-bold hover:underline cursor-pointer"
                    >
                      Reset {eliminatedIds.size} Eliminated
                    </button>
                  )}
                </div>

                {/* Search Pool Input */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={rosterSearch}
                    onChange={(e) => setRosterSearch(e.target.value)}
                    placeholder="Search active pool..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-[#eeedf7] dark:border-[#2e3042] bg-[#fbf8ff] dark:bg-[#181926] text-xs text-[#1a1b22] dark:text-white focus:outline-none focus:ring-1 focus:ring-[#4648d4]"
                  />
                </div>

                {/* Active Roster List (Scrollable, ~200px) */}
                <div className="max-h-[190px] overflow-y-auto space-y-1 pr-1 scrollbar-thin">
                  {activeRoster.length === 0 ? (
                    <div className="p-4 text-center text-xs text-gray-400">
                      No Pokémon match your active filters.
                    </div>
                  ) : (
                    activeRoster.slice(0, 36).map((mon) => (
                      <div
                        key={mon.id}
                        onClick={() => {
                          setWinner(mon);
                          setIsWinnerModalOpen(true);
                        }}
                        className="p-1.5 rounded-xl bg-[#fbf8ff] dark:bg-[#161726] border border-[#eeedf7] dark:border-[#26273a] hover:border-[#4648d4]/60 flex items-center justify-between gap-2 text-xs transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <img
                            src={mon.spriteUrl}
                            alt={mon.name}
                            className="w-7 h-7 object-contain shrink-0"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${mon.dexNumber}.png`;
                            }}
                          />
                          <div className="min-w-0">
                            <span className="font-bold text-[#1a1b22] dark:text-white truncate block">
                              {mon.name}
                            </span>
                            <span className="text-[10px] text-gray-400">
                              {formatDexNumber(mon.dexNumber)} • Gen {mon.generation}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          {mon.types.map((t) => (
                            <span
                              key={t}
                              className="px-1.5 py-0.2 rounded text-[9px] font-bold text-white shadow-2xs"
                              style={{ backgroundColor: POKEMON_TYPE_CONFIG[t]?.colorHex || '#ef4444' }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Reshuffle Button */}
                <button
                  type="button"
                  onClick={handleShuffle}
                  className="w-full py-2 px-3 rounded-xl bg-[#f4f2fd] dark:bg-[#1b1c28] hover:bg-[#e8e5fb] dark:hover:bg-[#25273b] border border-[#eeedf7] dark:border-[#2e3042] text-xs font-bold text-[#4648d4] dark:text-[#8587ff] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>Reshuffle Wheel Slices</span>
                </button>
              </div>
            )}

            {/* SUB-PANEL 2: TEAM PARTY PREVIEW */}
            {rightPanelTab === 'team' && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#464554] dark:text-[#c7c4d7]">
                    Battle Squad ({teamList.length}/6)
                  </span>
                  {teamList.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setTeamList([])}
                      className="text-[11px] font-bold text-rose-500 hover:underline cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="space-y-1.5">
                  {[0, 1, 2, 3, 4, 5].map((slot) => {
                    const member = teamList[slot];
                    return member ? (
                      <div
                        key={slot}
                        className="p-1.5 rounded-xl bg-[#fbf8ff] dark:bg-[#161726] border border-[#eeedf7] dark:border-[#26273a] flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <img
                            src={member.spriteUrl}
                            alt={member.name}
                            className="w-7 h-7 object-contain shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="font-bold text-[#1a1b22] dark:text-white truncate block">
                              {member.name}
                            </span>
                            <span className="text-[10px] text-gray-400">
                              BST {member.baseStatTotal} • {member.types.join('/')}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setTeamList((prev) => prev.filter((_, i) => i !== slot))}
                          className="p-1 text-gray-400 hover:text-rose-500 text-xs cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div
                        key={slot}
                        className="p-2 rounded-xl border border-dashed border-[#eeedf7] dark:border-[#26273a] text-center text-[11px] text-gray-400"
                      >
                        Empty Slot {slot + 1}
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleGenerateTeam}
                    disabled={isGeneratingTeam}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#4648d4] hover:bg-[#3b3dbb] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Dices className="w-3.5 h-3.5" />
                    <span>Roll Team</span>
                  </button>
                  {teamList.length > 0 && (
                    <button
                      type="button"
                      onClick={handleCopyShowdownTeam}
                      className="py-2 px-3 rounded-xl bg-[#f4f2fd] dark:bg-[#1b1c28] border border-[#eeedf7] dark:border-[#2e3042] text-[#464554] dark:text-[#c7c4d7] hover:text-[#1a1b22] dark:hover:text-white font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* SUB-PANEL 3: SPIN LOGS */}
            {rightPanelTab === 'history' && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#464554] dark:text-[#c7c4d7]">
                    Recent Spins ({spinHistory.length})
                  </span>
                  {spinHistory.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setSpinHistory([])}
                      className="text-[11px] font-bold text-rose-500 hover:underline cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {spinHistory.length === 0 ? (
                  <div className="p-6 text-center text-xs text-gray-400">
                    No spin logs yet. Press Spin to draw Pokémon!
                  </div>
                ) : (
                  <div className="max-h-[220px] overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
                    {spinHistory.map((h) => (
                      <div
                        key={h.id}
                        className="p-2 rounded-xl bg-[#fbf8ff] dark:bg-[#161726] border border-[#eeedf7] dark:border-[#26273a] flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[10px] text-[#4648d4] dark:text-[#8587ff] font-bold">
                            {formatDexNumber(h.dexNumber)}
                          </span>
                          <span className="font-bold text-[#1a1b22] dark:text-white">
                            {h.name}
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-400">{h.time}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )}

      {/* ========================================================================= */}
      {/* TAB 2: RANDOM 6-POKÉMON TEAM BUILDER */}
      {/* ========================================================================= */}
      {activeTab === 'team' && (
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="w-full bg-white dark:bg-[#0f1017] rounded-3xl border border-[#eeedf7] dark:border-[#20212f] p-4 sm:p-6 lg:p-7 shadow-lg dark:shadow-xl transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3.5">
            <div>
              <h3 className="text-base sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Swords className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                <span>6-Pokémon Team Builder</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Draft a full 6-Pokémon battle party adhering to your active type and generation filters.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleGenerateTeam}
                disabled={isGeneratingTeam}
                className="py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-rose-600/20 transition-all disabled:opacity-50 cursor-pointer"
              >
                <Dices className={`w-4 h-4 ${isGeneratingTeam ? 'animate-spin' : ''}`} />
                <span>{teamList.length === 0 ? 'Roll 6-Pokémon Team' : 'Reroll Full Team'}</span>
              </button>

              {teamList.length > 0 && (
                <button
                  type="button"
                  onClick={handleCopyShowdownTeam}
                  className="py-2.5 px-3 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Showdown</span>
                </button>
              )}
            </div>
          </div>

          {/* 6 Team Slots Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
            {[0, 1, 2, 3, 4, 5].map((slotIdx) => {
              const member = teamList[slotIdx];
              return (
                <div
                  key={slotIdx}
                  className={`rounded-2xl p-3.5 sm:p-4 border transition-all ${
                    member
                      ? 'bg-slate-50 dark:bg-[#161726] border-slate-200 dark:border-slate-800 shadow-sm'
                      : 'bg-dashed bg-slate-100/50 dark:bg-slate-900/40 border-slate-300 dark:border-slate-800/80 flex flex-col items-center justify-center min-h-[160px]'
                  }`}
                >
                  {member ? (
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[10px] font-bold text-rose-600 dark:text-rose-400">
                              Slot {slotIdx + 1} • {formatDexNumber(member.dexNumber)}
                            </span>
                            <span className="text-[10px] text-slate-500">Gen {member.generation}</span>
                          </div>
                          <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                            {member.name}
                          </h4>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setTeamList((prev) => prev.filter((_, idx) => idx !== slotIdx));
                          }}
                          className="p-1 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                          title="Remove from Team"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center p-1 border border-slate-200 dark:border-slate-700 shrink-0">
                          <img
                            src={member.spriteUrl}
                            alt={member.name}
                            className="max-h-full max-w-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${member.dexNumber}.png`;
                            }}
                          />
                        </div>

                        <div className="min-w-0 flex-1 space-y-1">
                          <div className="flex flex-wrap gap-1">
                            {member.types.map((t) => (
                              <span
                                key={t}
                                className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                              >
                                {POKEMON_TYPE_CONFIG[t]?.icon} {t}
                              </span>
                            ))}
                          </div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-400 truncate">
                            Role: <strong>{member.archetype}</strong>
                          </div>
                          <div className="text-[10px] text-slate-500 truncate">
                            Ability: {member.ability} | BST {member.baseStatTotal}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-3">
                      <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400 mx-auto mb-1.5">
                        <Plus className="w-4 h-4" />
                      </div>
                      <p className="text-xs font-bold text-slate-500">Empty Party Slot {slotIdx + 1}</p>
                      <button
                        type="button"
                        onClick={() => {
                          const pool = filteredPool.length > 0 ? filteredPool : ALL_POKEMON_DATABASE;
                          const rand = getCryptoRandomItem(pool);
                          if (rand) setTeamList((prev) => [...prev, rand]);
                        }}
                        className="mt-1.5 text-[11px] font-bold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
                      >
                        + Add Random Member
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Team Synergy Analysis */}
          {teamList.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#161726] border border-slate-200 dark:border-slate-800 text-xs">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Squad Synergy &amp; Type Coverage Breakdown</span>
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                Your team spans {new Set(teamList.map((m) => m.generation)).size} generations and covers{' '}
                {new Set(teamList.flatMap((m) => m.types)).size} distinct elemental types. Average Base Stat Total:{' '}
                <strong>
                  {Math.round(teamList.reduce((acc, m) => acc + m.baseStatTotal, 0) / teamList.length)}
                </strong>
                .
              </p>
              <div className="flex flex-wrap gap-1.5">
                {Array.from(new Set(teamList.flatMap((m) => m.types))).map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold"
                  >
                    {POKEMON_TYPE_CONFIG[t]?.icon} {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )}

      {/* ========================================================================= */}
      {/* TAB 3: NUZLOCKE & CHALLENGE MODE */}
      {/* ========================================================================= */}
      {activeTab === 'nuzlocke' && (
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="w-full bg-white dark:bg-[#0f1017] rounded-3xl border border-[#eeedf7] dark:border-[#20212f] p-4 sm:p-6 lg:p-7 shadow-lg dark:shadow-xl transition-colors">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left: Nuzlocke Route Wheel & Roller */}
            <div className="lg:col-span-7 space-y-3 sm:space-y-4">
              <div>
                <h3 className="text-base sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                  <span>Nuzlocke Route Encounter Roulette</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Select your current route and spin to lock in your legitimate encounter without bias.
                </p>
              </div>

              {/* Route Selector & Spin CTA */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#161726] border border-slate-200 dark:border-slate-800 space-y-3">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Select Exploration Zone / Route:
                </label>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {NUZLOCKE_SAMPLE_ROUTES.map((route) => (
                    <button
                      type="button"
                      key={route.id}
                      onClick={() => setNuzlockeRoute(route.name)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        nuzlockeRoute === route.name
                          ? 'bg-rose-600 text-white shadow-sm'
                          : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {route.name}
                    </button>
                  ))}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <button
                    type="button"
                    onClick={handleNuzlockeRoll}
                    className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 hover:brightness-110 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-600/25 transition-all cursor-pointer"
                  >
                    <Dices className="w-4 h-4" />
                    <span>Roll Encounter for {nuzlockeRoute}</span>
                  </button>
                </div>
              </div>

              {/* Active Nuzlocke Rules Checklist */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#161726] border border-slate-200 dark:border-slate-800">
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mb-2.5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Enforced Nuzlocke Challenge Ruleset</span>
                </h4>
                <div className="space-y-1.5">
                  {NUZLOCKE_RULES.map((rule) => (
                    <label
                      key={rule.id}
                      className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-white dark:hover:bg-slate-800/50 cursor-pointer text-xs"
                    >
                      <input
                        type="checkbox"
                        checked={!!activeRules[rule.id]}
                        onChange={(e) =>
                          setActiveRules((prev) => ({ ...prev, [rule.id]: e.target.checked }))
                        }
                        className="mt-0.5 w-4 h-4 rounded-sm text-rose-600 focus:ring-rose-500 border-slate-300 dark:border-slate-700"
                      />
                      <div>
                        <strong className="text-slate-800 dark:text-slate-200">{rule.title}</strong>
                        <p className="text-[11px] text-slate-500 leading-normal">{rule.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Nuzlocke Tracker */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#161726] border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h4 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    <span>Party Encounters &amp; Graveyard</span>
                  </h4>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold">
                      {nuzlockeCaught.filter((c) => c.status === 'active').length} Active
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[11px] font-bold">
                      {nuzlockeCaught.filter((c) => c.status === 'fainted').length} Fainted
                    </span>
                  </div>
                </div>

                {nuzlockeCaught.length === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-400">
                    No encounters logged yet. Roll your first route encounter on the left!
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                    {nuzlockeCaught.map((item, idx) => {
                      const isFainted = item.status === 'fainted';
                      return (
                        <div
                          key={idx}
                          className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 text-xs transition-all ${
                            isFainted
                              ? 'bg-rose-500/10 border-rose-500/30 opacity-70'
                              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <img
                              src={item.pokemon.spriteUrl}
                              alt={item.pokemon.name}
                              className="w-10 h-10 object-contain shrink-0"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.pokemon.dexNumber}.png`;
                              }}
                            />
                            <div className="min-w-0">
                              <div className="font-extrabold text-slate-900 dark:text-white truncate">
                                {item.pokemon.name}
                              </div>
                              <div className="text-[10px] text-slate-500 truncate">
                                {item.route} • Gen {item.pokemon.generation}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleFaintPokemon(idx)}
                              className={`p-1.5 rounded-lg text-[10px] font-bold transition-colors cursor-pointer ${
                                isFainted
                                  ? 'bg-rose-500 text-white'
                                  : 'bg-slate-100 dark:bg-slate-700 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-slate-600 dark:text-slate-300'
                              }`}
                              title={isFainted ? 'Revive (Misclick)' : 'Mark as Fainted (Perma-death)'}
                            >
                              <Skull className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: INSTANT DEX GENERATOR */}
      {/* ========================================================================= */}
      {activeTab === 'instant' && (
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="w-full bg-white dark:bg-[#0f1017] rounded-3xl border border-[#eeedf7] dark:border-[#20212f] p-4 sm:p-6 lg:p-7 shadow-lg dark:shadow-xl transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3.5">
              <div>
                <h3 className="text-base sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                  <span>Instant Pokémon Multi-Roll</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Immediately draw 1, 3, or 6 random Pokémon without waiting for wheel animation.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    unlockAudioContext();
                    const rand = getCryptoRandomItem(filteredPool.length > 0 ? filteredPool : ALL_POKEMON_DATABASE);
                    if (rand) {
                      setWinner(rand);
                      setIsWinnerModalOpen(true);
                    }
                    confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
                  }}
                  className="py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs sm:text-sm transition-all cursor-pointer"
                >
                  Draw 1 Pokémon
                </button>
                <button
                  type="button"
                  onClick={handleGenerateTeam}
                  className="py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-xs sm:text-sm transition-all cursor-pointer"
                >
                  Draw 6 Pokémon
                </button>
              </div>
            </div>

            {/* Quick Grid of Filtered Candidates */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3">
              {filteredPool.slice(0, 18).map((mon) => (
                <button
                  key={mon.id}
                  type="button"
                  onClick={() => {
                    setWinner(mon);
                    setIsWinnerModalOpen(true);
                    showToast(`Selected ${mon.name} in Result Card!`);
                  }}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-[#161726] border border-slate-200 dark:border-slate-800 hover:border-rose-500/60 dark:hover:border-rose-500/60 transition-all text-center group flex flex-col items-center cursor-pointer"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center p-1 mb-2 border border-slate-200 dark:border-slate-700 group-hover:scale-105 transition-transform">
                    <img
                      src={mon.spriteUrl}
                      alt={mon.name}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${mon.dexNumber}.png`;
                      }}
                    />
                  </div>
                  <div className="font-extrabold text-xs text-slate-900 dark:text-white truncate w-full">
                    {mon.name}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {formatDexNumber(mon.dexNumber)} • Gen {mon.generation}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* AUDIT LOG & RECENT ROLLS DRAWER */}
      {spinHistory.length > 0 && (
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="p-2 sm:p-2.5 border-t border-[#eeedf7] dark:border-[#272838] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 min-w-0">
              <History className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="font-semibold text-[11px] shrink-0">Recent ({spinHistory.length}):</span>
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5 min-w-0">
                {spinHistory.slice(0, 6).map((h) => (
                  <span
                    key={h.id}
                    className="px-1.5 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300 text-[10px] shrink-0"
                  >
                    {h.name} ({formatDexNumber(h.dexNumber)})
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSpinHistory([])}
              className="text-[10px] font-bold text-slate-400 hover:text-rose-500 transition-colors shrink-0 self-end sm:self-auto cursor-pointer"
            >
              Clear History
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* WINNER CELEBRATION MODAL (Matching Homepage WinnerModal)                   */}
      {/* ========================================================================= */}
      {isWinnerModalOpen && winner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#12131e] text-[#1a1b22] dark:text-white rounded-3xl border border-[#eeedf7] dark:border-[#292a40] max-w-md w-full p-5 sm:p-6 shadow-2xl relative overflow-hidden flex flex-col gap-4 max-h-[92vh] overflow-y-auto">
            {/* Top Close Button */}
            <button
              type="button"
              onClick={() => setIsWinnerModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Close Celebration"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Winner Header Badge */}
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold">
                <Trophy className="w-3.5 h-3.5" />
                <span>POKÉMON SELECTED!</span>
              </div>
              <span className="text-xs text-gray-400 font-mono">
                {formatDexNumber(winner.dexNumber)}
              </span>
            </div>

            {/* Artwork Centerpiece with Glowing Elemental Backdrop */}
            <div className="relative w-full h-40 sm:h-44 rounded-2xl bg-gradient-to-b from-[#f4f2fd] to-white dark:from-[#18192a] dark:to-[#12131e] border border-[#eeedf7] dark:border-[#222336] flex items-center justify-center p-3 overflow-hidden shadow-inner">
              <div
                className="absolute inset-0 opacity-20 blur-2xl rounded-full"
                style={{ backgroundColor: POKEMON_TYPE_CONFIG[winner.types[0]]?.colorHex || '#4648d4' }}
              />
              <img
                src={winner.spriteUrl}
                alt={winner.name}
                className="max-h-full max-w-full object-contain relative z-10 filter drop-shadow-lg transform hover:scale-105 transition-transform"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${winner.dexNumber}.png`;
                }}
              />
            </div>

            {/* Name, Archetype & Types */}
            <div>
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-headline text-2xl sm:text-3xl font-black text-[#1a1b22] dark:text-white tracking-tight">
                  {winner.name}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-[#f4f2fd] dark:bg-[#1e1f30] text-gray-700 dark:text-gray-300 border border-[#eeedf7] dark:border-[#2b2c3d]">
                  {winner.archetype}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                {winner.types.map((type) => (
                  <span
                    key={type}
                    className="px-2.5 py-0.5 rounded-lg text-xs font-bold text-white shadow-2xs"
                    style={{ backgroundColor: POKEMON_TYPE_CONFIG[type]?.colorHex || '#ef4444' }}
                  >
                    {POKEMON_TYPE_CONFIG[type]?.icon} {type}
                  </span>
                ))}
                <span className="text-xs text-gray-400 font-medium ml-1">
                  Gen {winner.generation} • {winner.region}
                </span>
              </div>
            </div>

            {/* Stats Breakdown & BST */}
            <div className="p-3 rounded-2xl bg-[#fbf8ff] dark:bg-[#161726] border border-[#eeedf7] dark:border-[#25263a] space-y-2 text-xs">
              <div className="flex items-center justify-between font-bold text-[#1a1b22] dark:text-white">
                <span>Base Stat Total (BST)</span>
                <span className="font-mono text-[#4648d4] dark:text-[#8587ff] text-sm">
                  {winner.baseStatTotal}
                </span>
              </div>
              <div className="grid grid-cols-6 gap-1 text-center font-mono text-[10px]">
                <div className="bg-white dark:bg-[#202132] p-1 rounded border border-[#eeedf7] dark:border-[#2a2b3e]">
                  <span className="text-gray-400 block text-[9px]">HP</span>
                  <strong>{winner.hp}</strong>
                </div>
                <div className="bg-white dark:bg-[#202132] p-1 rounded border border-[#eeedf7] dark:border-[#2a2b3e]">
                  <span className="text-gray-400 block text-[9px]">ATK</span>
                  <strong>{winner.attack}</strong>
                </div>
                <div className="bg-white dark:bg-[#202132] p-1 rounded border border-[#eeedf7] dark:border-[#2a2b3e]">
                  <span className="text-gray-400 block text-[9px]">DEF</span>
                  <strong>{winner.defense}</strong>
                </div>
                <div className="bg-white dark:bg-[#202132] p-1 rounded border border-[#eeedf7] dark:border-[#2a2b3e]">
                  <span className="text-gray-400 block text-[9px]">SPA</span>
                  <strong>{winner.spAttack}</strong>
                </div>
                <div className="bg-white dark:bg-[#202132] p-1 rounded border border-[#eeedf7] dark:border-[#2a2b3e]">
                  <span className="text-gray-400 block text-[9px]">SPD</span>
                  <strong>{winner.spDefense}</strong>
                </div>
                <div className="bg-white dark:bg-[#202132] p-1 rounded border border-[#eeedf7] dark:border-[#2a2b3e]">
                  <span className="text-gray-400 block text-[9px]">SPE</span>
                  <strong>{winner.speed}</strong>
                </div>
              </div>
              <div className="text-[11px] text-[#464554] dark:text-[#908fa1] pt-1">
                Ability: <strong className="text-[#1a1b22] dark:text-white">{winner.ability}</strong>
              </div>
            </div>

            {/* Description Lore */}
            <p className="text-xs text-[#767586] dark:text-[#908fa1] leading-relaxed line-clamp-2 italic">
              &ldquo;{winner.description}&rdquo;
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1 border-t border-[#eeedf7] dark:border-[#222336]">
              <button
                type="button"
                onClick={() => {
                  setIsWinnerModalOpen(false);
                  setTimeout(() => {
                    spinWheel();
                  }, 150);
                }}
                disabled={isSpinning}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#4648d4] hover:bg-[#3b3dbb] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#4648d4]/20 cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Spin Again</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (teamList.length < 6) {
                    setTeamList((prev) => [...prev, winner]);
                    showToast(`✅ Added ${winner.name} to team!`);
                  } else {
                    showToast('⚠️ Team is already full (6/6)!');
                  }
                }}
                className="py-2.5 px-3 rounded-xl bg-[#f4f2fd] dark:bg-[#1b1c28] hover:bg-[#ebe8fa] dark:hover:bg-[#24263a] border border-[#eeedf7] dark:border-[#2e3042] text-[#1a1b22] dark:text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add to Squad</span>
              </button>

              <button
                type="button"
                onClick={() => setIsWinnerModalOpen(false)}
                className="py-2.5 px-3 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 font-bold text-xs cursor-pointer text-center"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
