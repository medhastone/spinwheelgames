'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import {
  Tv,
  Volume2,
  VolumeX,
  RotateCcw,
  UserX,
  Copy,
  Check,
  X,
  Eye,
  EyeOff,
  ShieldCheck,
  History,
  Dices
} from 'lucide-react';
import {
  ViralToolConfig,
  StreamParamsConfig,
  parseStreamQueryParams,
  parseSanitizedStreamEntries,
  sanitizeStreamText
} from '@/lib/viralToolsData';
import {
  subscribeToStreamRemoteCommands,
  reportStreamWinner,
  StreamRemoteCommand
} from '@/lib/streamRemoteChannel';
import {
  playTickSound,
  playWinnerFanfare,
  playDiceRollSound,
  playDiceSettleSound,
  unlockAudioContext
} from '@/lib/sound';
import { SingleDieResult } from '@/components/dice/diceMath';
import confetti from '@/lib/confetti';

// Lazy-load 3D WebGL Dice Engine ONLY when a dice tool is in Streamer Mode with quality !== 'low'
const DiceScene3D = dynamic(() => import('@/components/dice/DiceScene3D'), {
  ssr: false,
  loading: () => null
});

interface StreamerModeOverlayProps {
  config: ViralToolConfig;
  onExit: () => void;
}

function getCryptoRandomFloat(): number {
  if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0] / (0xffffffff + 1);
  }
  return Math.random();
}

function getCryptoDieRoll(sides: number): number {
  return Math.floor(getCryptoRandomFloat() * sides) + 1;
}

export default function StreamerModeOverlay({
  config,
  onExit
}: StreamerModeOverlayProps) {
  const [streamParams, setStreamParams] = useState<StreamParamsConfig>(() => {
    if (typeof window !== 'undefined') {
      return parseStreamQueryParams(new URLSearchParams(window.location.search));
    }
    return {
      stream: true,
      autospin: false,
      size: 'md',
      theme: 'dark',
      labels: 'outline',
      sound: true,
      removewinner: false,
      winnerseconds: 5,
      history: false,
      quality: 'high',
      fps: 30,
      fair: true,
      sessionId: '',
      entriesRaw: ''
    };
  });

  const [title, setTitle] = useState<string>(config.title);
  const [items, setItems] = useState(config.items);
  const initialItemsRef = useRef(config.items);

  // Wheel state
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<{ id: string; text: string } | null>(null);
  const [lastWinnerId, setLastWinnerId] = useState<string | null>(null);
  const [winnerHistory, setWinnerHistory] = useState<string[]>([]);

  // Dice state
  const [diceSides, setDiceSides] = useState<number>(config.diceConfig?.sides || 20);
  const [diceCount, setDiceCount] = useState<number>(config.diceConfig?.count || 1);
  const [diceDropLowest, setDiceDropLowest] = useState<number>(
    config.diceConfig?.dropLowest || 0
  );
  const [diceModifier, setDiceModifier] = useState<number>(
    config.diceConfig?.modifier || 0
  );
  const [diceValues, setDiceValues] = useState<SingleDieResult[]>(() => {
    const c = config.diceConfig?.count || 1;
    const s = config.diceConfig?.sides || 20;
    return Array.from({ length: c }, (_, idx) => ({
      id: `die-${idx}`,
      value: s,
      originalValue: s,
      isDropped: false
    }));
  });
  const [diceTotal, setDiceTotal] = useState<number | null>(null);
  const [diceBannerVisible, setDiceBannerVisible] = useState<boolean>(false);

  // Audio & HUD state
  const [soundEnabled, setSoundEnabled] = useState<boolean>(streamParams.sound);
  const [hudPinned, setHudPinned] = useState<boolean>(false);
  const [copiedObsUrl, setCopiedObsUrl] = useState<boolean>(false);

  const rotationRef = useRef(0);
  const animRef = useRef<number | null>(null);
  const clearBannerTimerRef = useRef<number | null>(null);
  const lastSliceRef = useRef(-1);
  const hasAutoSpunRef = useRef(false);

  const isDiceMode = config.toolKind === 'dice';

  // Re-parse URL params on mount and sync config changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const parsed = parseStreamQueryParams(new URLSearchParams(window.location.search));
      setStreamParams(parsed);
      setSoundEnabled(parsed.sound);

      if (parsed.entriesRaw) {
        const customSlices = parseSanitizedStreamEntries(parsed.entriesRaw, 200);
        if (customSlices.length >= 2) {
          setItems(customSlices);
          initialItemsRef.current = customSlices;
          return;
        }
      }
    }
    setTitle(config.title);
    setItems(config.items);
    initialItemsRef.current = config.items;
    if (config.diceConfig) {
      setDiceSides(config.diceConfig.sides);
      setDiceCount(config.diceConfig.count);
      setDiceDropLowest(config.diceConfig.dropLowest || 0);
      setDiceModifier(config.diceConfig.modifier || 0);
    }
  }, [config]);

  // Apply transparent class to html and body and ensure <meta name="robots" content="noindex, nofollow">
  useEffect(() => {
    document.documentElement.classList.add('streamer-mode');
    document.body.classList.add('streamer-mode');

    // Inject noindex meta tag when ?stream=1 is active
    let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    const prevRobotsContent = robotsMeta ? robotsMeta.getAttribute('content') : null;
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.name = 'robots';
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', 'noindex, nofollow');

    return () => {
      document.documentElement.classList.remove('streamer-mode');
      document.body.classList.remove('streamer-mode');
      if (robotsMeta && prevRobotsContent) {
        robotsMeta.setAttribute('content', prevRobotsContent);
      }
    };
  }, []);

  // Helper to schedule auto-clearing of the winner/result banner
  const scheduleBannerAutoClear = useCallback(
    (wonItem?: { id: string; text: string }) => {
      if (clearBannerTimerRef.current) {
        window.clearTimeout(clearBannerTimerRef.current);
        clearBannerTimerRef.current = null;
      }

      if (streamParams.winnerseconds > 0) {
        clearBannerTimerRef.current = window.setTimeout(() => {
          setWinner(null);
          setDiceBannerVisible(false);
          if (wonItem && streamParams.removewinner) {
            setItems((prev) =>
              prev.length > 2 ? prev.filter((i) => i.id !== wonItem.id) : prev
            );
          }
        }, streamParams.winnerseconds * 1000);
      } else if (wonItem && streamParams.removewinner) {
        // Even if banner stays until reset, remove winner after 2.5s if removewinner=1
        clearBannerTimerRef.current = window.setTimeout(() => {
          setItems((prev) =>
            prev.length > 2 ? prev.filter((i) => i.id !== wonItem.id) : prev
          );
        }, 2500);
      }
    },
    [streamParams.winnerseconds, streamParams.removewinner]
  );

  const slices = useMemo(() => {
    const count = items.length;
    if (count === 0) return [];
    const sliceAngle = 360 / count;
    const cx = 250;
    const cy = 250;
    const r = 234;

    return items.map((item, idx) => {
      const startAngle = idx * sliceAngle;
      const endAngle = startAngle + sliceAngle;
      const midAngle = startAngle + sliceAngle / 2;
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;

      const x1 = Number((cx + r * Math.cos(startRad)).toFixed(3));
      const y1 = Number((cy + r * Math.sin(startRad)).toFixed(3));
      const x2 = Number((cx + r * Math.cos(endRad)).toFixed(3));
      const y2 = Number((cy + r * Math.sin(endRad)).toFixed(3));

      const largeArc = sliceAngle > 180 ? 1 : 0;
      const pathData =
        count === 1
          ? `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r} Z`
          : `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;

      const textRad = (midAngle * Math.PI) / 180;
      const textDist = 150;
      const tx = Number((cx + textDist * Math.cos(textRad)).toFixed(3));
      const ty = Number((cy + textDist * Math.sin(textRad)).toFixed(3));

      return {
        item,
        idx,
        startAngle,
        endAngle,
        sliceAngle,
        midAngle,
        pathData,
        tx,
        ty,
        color: item.color || config.palette[idx % config.palette.length]
      };
    });
  }, [items, config.palette]);

  // Finalize Dice Roll outcome (used by both 3D physics settle and 2D low-CPU dice mode)
  const finalizeDiceRoll = useCallback(
    (rawValues: number[]) => {
      const indexed = rawValues.map((val, idx) => ({ val, idx }));
      const droppedSet = new Set<number>();

      if (diceDropLowest > 0 && rawValues.length > diceDropLowest) {
        const sorted = [...indexed].sort((a, b) => a.val - b.val);
        for (let i = 0; i < diceDropLowest; i++) {
          droppedSet.add(sorted[i].idx);
        }
      }

      const settled: SingleDieResult[] = rawValues.map((val, idx) => ({
        id: `die-${Date.now()}-${idx}`,
        value: val,
        originalValue: val,
        isDropped: droppedSet.has(idx)
      }));

      const keptSum = settled
        .filter((d) => !d.isDropped)
        .reduce((acc, d) => acc + d.value, 0);
      const finalTotal = keptSum + diceModifier;

      setDiceValues(settled);
      setDiceTotal(finalTotal);
      setDiceBannerVisible(true);
      setIsSpinning(false);

      const notationStr = `${diceCount}d${diceSides}${
        diceDropLowest > 0 ? `dl${diceDropLowest}` : ''
      }: ${finalTotal}`;
      setWinnerHistory((prev) => [notationStr, ...prev.slice(0, 14)]);

      if (streamParams.sessionId) {
        reportStreamWinner(streamParams.sessionId, notationStr);
      }

      if (soundEnabled) {
        playDiceSettleSound(0.55);
      }

      if (
        (diceSides === 20 && settled.some((d) => !d.isDropped && d.value === 20)) ||
        finalTotal === diceCount * diceSides + diceModifier
      ) {
        confetti({
          particleCount: 70,
          spread: 75,
          origin: { y: 0.55 }
        });
      }

      scheduleBannerAutoClear();
    },
    [
      diceCount,
      diceSides,
      diceDropLowest,
      diceModifier,
      soundEnabled,
      streamParams.sessionId,
      scheduleBannerAutoClear
    ]
  );

  // Trigger Wheel Spin or Dice Roll
  const triggerSpin = useCallback(() => {
    if (isSpinning) return;
    unlockAudioContext();

    if (clearBannerTimerRef.current) {
      window.clearTimeout(clearBannerTimerRef.current);
      clearBannerTimerRef.current = null;
    }

    if (isDiceMode) {
      setIsSpinning(true);
      setDiceBannerVisible(false);

      // If 2D low-CPU mode (?quality=low), animate 2D polyhedral tumble capped at streamParams.fps
      if (streamParams.quality === 'low') {
        if (soundEnabled) {
          playDiceRollSound(0.55);
        }
        const duration = 950;
        const start = performance.now();
        let lastTick = 0;

        const step2D = (now: number) => {
          const elapsed = now - start;
          if (elapsed < duration) {
            if (now - lastTick >= 85) {
              lastTick = now;
              setDiceValues(
                Array.from({ length: diceCount }, (_, idx) => {
                  const v = getCryptoDieRoll(diceSides);
                  return {
                    id: `temp-${idx}`,
                    value: v,
                    originalValue: v,
                    isDropped: false
                  };
                })
              );
            }
            animRef.current = requestAnimationFrame(step2D);
          } else {
            const finalRolls = Array.from({ length: diceCount }, () =>
              getCryptoDieRoll(diceSides)
            );
            finalizeDiceRoll(finalRolls);
          }
        };
        animRef.current = requestAnimationFrame(step2D);
      }
      // Otherwise DiceScene3D's isRolling={true} will execute physical roll and call handlePhysicsRollComplete
      return;
    }

    // Wheel Spin Mode
    if (items.length < 1) return;
    setIsSpinning(true);
    setWinner(null);

    const winIdx = Math.floor(getCryptoRandomFloat() * items.length);
    const targetSlice = slices[winIdx] || slices[0];
    const jitter =
      targetSlice.startAngle +
      targetSlice.sliceAngle * (0.2 + getCryptoRandomFloat() * 0.6);

    const startRot = rotationRef.current;
    const normStart = ((startRot % 360) + 360) % 360;
    const targetMod = ((270 - jitter) % 360 + 360) % 360;
    let delta = targetMod - normStart;
    if (delta <= 0) delta += 360;

    const fullTurns = (6 + Math.floor(getCryptoRandomFloat() * 3)) * 360;
    const totalAdded = fullTurns + delta;
    const durationMs = 4600;
    const startTime = performance.now();
    const minFrameMs = streamParams.fps >= 60 ? 15 : 1000 / 30;
    let lastFrameTime = 0;

    lastSliceRef.current = -1;

    const animate = (now: number) => {
      const progress = Math.min(1, (now - startTime) / durationMs);

      if (progress < 1 && now - lastFrameTime < minFrameMs) {
        animRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = now;

      const eased = 1 - Math.pow(1 - progress, 4.3);
      const curRot = startRot + totalAdded * eased;
      rotationRef.current = curRot;
      setRotation(curRot);

      const pointerAngle = (270 - (curRot % 360) + 720) % 360;
      const sliceIdx = Math.floor(pointerAngle / (360 / items.length));
      if (sliceIdx !== lastSliceRef.current) {
        lastSliceRef.current = sliceIdx;
        playTickSound(soundEnabled, 'carnival', 0.55);
      }

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        const won = targetSlice.item;
        setWinner(won);
        setLastWinnerId(won.id);
        setWinnerHistory((prev) => [won.text, ...prev.slice(0, 14)]);

        if (streamParams.sessionId) {
          reportStreamWinner(streamParams.sessionId, won.text);
        }

        playWinnerFanfare(soundEnabled, 'carnival', 0.65);
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.55 }
        });

        scheduleBannerAutoClear(won);
      }
    };

    animRef.current = requestAnimationFrame(animate);
  }, [
    isSpinning,
    isDiceMode,
    streamParams.quality,
    streamParams.fps,
    streamParams.sessionId,
    diceCount,
    diceSides,
    items.length,
    slices,
    soundEnabled,
    finalizeDiceRoll,
    scheduleBannerAutoClear
  ]);

  // Remove the last winner (Hotkey: N or E, or remote command 'remove-winner')
  const handleRemoveLastWinner = useCallback(() => {
    const targetId = winner?.id || lastWinnerId;
    if (!targetId || items.length <= 2) return;
    setItems((prev) => prev.filter((i) => i.id !== targetId));
    setWinner(null);
    setLastWinnerId(null);
  }, [winner, lastWinnerId, items.length]);

  // Reset wheel/dice to initial state (Hotkey: R, or remote command 'reset')
  const handleReset = useCallback(() => {
    if (clearBannerTimerRef.current) {
      window.clearTimeout(clearBannerTimerRef.current);
      clearBannerTimerRef.current = null;
    }
    setItems(initialItemsRef.current);
    setWinner(null);
    setLastWinnerId(null);
    setDiceBannerVisible(false);
    setWinnerHistory([]);
  }, []);

  // Auto-spin once on load when ?autospin=1
  useEffect(() => {
    if (streamParams.autospin && !hasAutoSpunRef.current) {
      hasAutoSpunRef.current = true;
      const t = window.setTimeout(() => {
        triggerSpin();
      }, 450);
      return () => window.clearTimeout(t);
    }
  }, [streamParams.autospin, triggerSpin]);

  // Subscribe to Remote Control (/stream-control?id=<session>) commands
  useEffect(() => {
    const activeSessionId = streamParams.sessionId || 'default';
    const unsubscribe = subscribeToStreamRemoteCommands(
      activeSessionId,
      (cmd: StreamRemoteCommand) => {
        switch (cmd.action) {
          case 'spin':
            triggerSpin();
            break;
          case 'reset':
            handleReset();
            break;
          case 'remove-winner':
            handleRemoveLastWinner();
            break;
          case 'clear-winner':
            setWinner(null);
            setDiceBannerVisible(false);
            break;
          case 'toggle-sound':
            if (typeof cmd.payload?.sound === 'boolean') {
              setSoundEnabled(cmd.payload.sound);
            } else {
              setSoundEnabled((v) => !v);
            }
            break;
          case 'update-entries':
            if (cmd.payload?.title) {
              setTitle(sanitizeStreamText(cmd.payload.title, 80));
            }
            if (Array.isArray(cmd.payload?.entries) && cmd.payload.entries.length >= 2) {
              const updated = parseSanitizedStreamEntries(
                cmd.payload.entries.join('|'),
                200
              );
              if (updated.length >= 2) {
                setItems(updated);
                initialItemsRef.current = updated;
                setWinner(null);
              }
            }
            break;
          case 'update-dice':
            if (cmd.payload?.sides) setDiceSides(cmd.payload.sides);
            if (cmd.payload?.count) setDiceCount(cmd.payload.count);
            if (cmd.payload?.dropLowest !== undefined) {
              setDiceDropLowest(cmd.payload.dropLowest);
            }
            break;
        }
      }
    );
    return unsubscribe;
  }, [streamParams.sessionId, triggerSpin, handleReset, handleRemoveLastWinner]);

  // Expose global window.SpinWheelStreamer & custom DOM event hooks for Twitch/YouTube chat commands (!spin)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const api = {
      spin: () => triggerSpin(),
      reset: () => handleReset(),
      removeWinner: () => handleRemoveLastWinner(),
      setEntries: (rawEntries: string[] | string) => {
        const joined = Array.isArray(rawEntries) ? rawEntries.join('|') : String(rawEntries);
        const parsed = parseSanitizedStreamEntries(joined, 200);
        if (parsed.length >= 2) {
          setItems(parsed);
          initialItemsRef.current = parsed;
        }
      },
      getState: () => ({
        title,
        isSpinning,
        winner: winner?.text || null,
        diceTotal,
        entryCount: items.length
      })
    };
    (window as unknown as Record<string, unknown>).SpinWheelStreamer = api;

    const handleDomCommand = (e: Event) => {
      const detail = (e as CustomEvent)?.detail;
      if (!detail) return;
      if (detail.action === 'spin') triggerSpin();
      else if (detail.action === 'reset') handleReset();
      else if (detail.action === 'remove-winner') handleRemoveLastWinner();
    };
    window.addEventListener('swg:remote-command', handleDomCommand);

    return () => {
      window.removeEventListener('swg:remote-command', handleDomCommand);
    };
  }, [
    title,
    isSpinning,
    winner,
    diceTotal,
    items.length,
    triggerSpin,
    handleReset,
    handleRemoveLastWinner
  ]);

  // Keyboard Triggers: Space/Enter spins/rolls; R resets; N (or E) removes the last winner
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.code === 'Space' || e.key === 'Enter') {
        e.preventDefault();
        triggerSpin();
      } else if (e.key.toLowerCase() === 'n' || e.key.toLowerCase() === 'e') {
        e.preventDefault();
        handleRemoveLastWinner();
      } else if (e.key.toLowerCase() === 'r') {
        e.preventDefault();
        handleReset();
      } else if (e.key.toLowerCase() === 'm') {
        e.preventDefault();
        setSoundEnabled((v) => !v);
      } else if (e.key.toLowerCase() === 'h') {
        e.preventDefault();
        setHudPinned((v) => !v);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onExit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerSpin, handleRemoveLastWinner, handleReset, onExit]);

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      if (clearBannerTimerRef.current) window.clearTimeout(clearBannerTimerRef.current);
    };
  }, []);

  const handleCopyObsUrl = () => {
    if (typeof window === 'undefined') return;
    navigator.clipboard?.writeText?.(window.location.href);
    setCopiedObsUrl(true);
    setTimeout(() => setCopiedObsUrl(false), 2000);
  };

  // Scale stage dimensions based on ?size=sm|md|lg
  const wheelSizeClass =
    streamParams.size === 'sm'
      ? 'max-w-[min(68vw,58vh,430px)]'
      : streamParams.size === 'lg'
      ? 'max-w-[min(92vw,82vh,760px)]'
      : 'max-w-[min(84vw,74vh,600px)]';

  const isOutline = streamParams.labels === 'outline';
  const isLightTheme = streamParams.theme === 'light';

  return (
    <div
      id="streamer-mode-root"
      data-testid="streamer-mode-overlay"
      data-stream-size={streamParams.size}
      data-stream-theme={streamParams.theme}
      data-stream-labels={streamParams.labels}
      className="fixed inset-0 z-[9999] w-screen h-screen bg-transparent flex flex-col items-center justify-center p-3 sm:p-6 select-none overflow-hidden"
    >
      {/* Subtle Hover-Only Streamer Controls (Invisible in OBS unless hovered or pinned with H) */}
      <div
        className={`fixed top-3 right-3 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-black/80 backdrop-blur-md border border-white/15 text-white transition-opacity duration-200 ${
          hudPinned ? 'opacity-100' : 'opacity-0 hover:opacity-100 focus-within:opacity-100'
        }`}
      >
        <Tv className="w-3.5 h-3.5 text-emerald-400" />
        <span className="text-[11px] font-extrabold tracking-wide mr-1">
          OBS OVERLAY
        </span>

        <button
          type="button"
          onClick={handleCopyObsUrl}
          className="px-2.5 py-1 rounded-xl bg-[#4648d4] hover:bg-[#5c5ee8] text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer"
          title="Copy Streamer URL"
        >
          {copiedObsUrl ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
          <span>{copiedObsUrl ? 'Copied' : 'Copy URL'}</span>
        </button>

        <button
          type="button"
          onClick={() => setSoundEnabled((v) => !v)}
          className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
          title="Toggle Audio (M)"
          aria-label="Toggle Audio"
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-rose-400" />}
        </button>

        <button
          type="button"
          onClick={() => setHudPinned((v) => !v)}
          className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
          title="Pin/Unpin HUD (H)"
          aria-label="Toggle HUD"
        >
          {hudPinned ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
        </button>

        <button
          type="button"
          onClick={onExit}
          className="px-2 py-1 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer"
          title="Exit Streamer Mode (Esc)"
        >
          <X className="w-3 h-3" />
          <span>Exit</span>
        </button>
      </div>

      {/* Optional On-Screen Winner / Roll History (?history=1) */}
      {streamParams.history && winnerHistory.length > 0 && (
        <aside
          data-testid="streamer-history-panel"
          className={`fixed top-4 left-4 z-20 max-w-[240px] rounded-2xl p-3 backdrop-blur-md border shadow-xl ${
            isLightTheme
              ? 'bg-white/90 border-slate-300 text-slate-900'
              : 'bg-black/80 border-white/15 text-white'
          }`}
        >
          <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider mb-1.5 opacity-80">
            <History className="w-3.5 h-3.5 text-emerald-400" />
            <span>Previous Results</span>
          </div>
          <ol className="space-y-1 text-xs font-bold">
            {winnerHistory.slice(0, 6).map((entry, idx) => (
              <li
                key={`${entry}-${idx}`}
                className="truncate flex items-center gap-1.5"
              >
                <span className="text-[10px] font-mono opacity-60">#{idx + 1}</span>
                <span className="truncate">{entry}</span>
              </li>
            ))}
          </ol>
        </aside>
      )}

      {/* Main Centered Tool Canvas (Wheel OR Dice) */}
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 relative">
        {isDiceMode ? (
          /* ================= DICE STREAMER STAGE ================= */
          <div
            data-testid="streamer-dice-stage"
            className="w-full max-w-4xl flex flex-col items-center justify-center gap-4 px-4"
          >
            {streamParams.quality !== 'low' ? (
              /* 3D WebGL Transparent Dice Roller (Lazy-loaded, capped FPS, pauses when idle) */
              <div
                onClick={triggerSpin}
                className="relative w-full h-[min(56vh,460px)] max-w-3xl cursor-pointer"
              >
                <DiceScene3D
                  dice={diceValues}
                  sides={diceSides}
                  count={diceCount}
                  isRolling={isSpinning}
                  theme="ruby"
                  soundEnabled={soundEnabled}
                  transparentBg={true}
                  maxFps={streamParams.fps}
                  onPhysicsRollComplete={(settled) => {
                    finalizeDiceRoll(settled.map((d) => d.value));
                  }}
                  onManualThrowTrigger={() => setIsSpinning(true)}
                  className="bg-transparent border-0 shadow-none"
                />
              </div>
            ) : null}

            {/* Individual Die Faces Row (Always shown in 2D mode, and shown as large readable badges below 3D tray) */}
            <div
              onClick={triggerSpin}
              className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 cursor-pointer"
            >
              {diceValues.map((die, idx) => (
                <div
                  key={die.id || idx}
                  className={`relative flex flex-col items-center justify-center rounded-3xl border-2 transition-transform ${
                    streamParams.size === 'lg'
                      ? 'w-28 h-28 sm:w-36 sm:h-36'
                      : streamParams.size === 'sm'
                      ? 'w-16 h-16 sm:w-20 sm:h-20'
                      : 'w-22 h-22 sm:w-28 sm:h-28'
                  } ${
                    die.isDropped
                      ? 'bg-black/45 border-rose-500/50 opacity-55 scale-90'
                      : isLightTheme
                      ? 'bg-white/95 border-indigo-600 text-slate-900 shadow-[0_12px_32px_rgba(0,0,0,0.35)]'
                      : 'bg-gradient-to-br from-[#4648d4] to-[#1e1b4b] border-white/80 text-white shadow-[0_14px_36px_rgba(0,0,0,0.85)]'
                  } ${isSpinning ? 'animate-bounce' : ''}`}
                >
                  <span className="text-[10px] sm:text-xs font-mono font-extrabold uppercase tracking-widest opacity-80">
                    d{diceSides}
                  </span>
                  <span
                    className={`font-headline font-black leading-none ${
                      streamParams.size === 'lg'
                        ? 'text-4xl sm:text-6xl'
                        : streamParams.size === 'sm'
                        ? 'text-2xl sm:text-3xl'
                        : 'text-3xl sm:text-5xl'
                    } ${die.isDropped ? 'line-through text-rose-300' : ''}`}
                    style={
                      isOutline
                        ? {
                            textShadow:
                              '0 3px 10px rgba(0,0,0,0.95), 0 1px 3px rgba(0,0,0,1)'
                          }
                        : undefined
                    }
                  >
                    {die.value}
                  </span>
                  {die.isDropped && (
                    <span className="text-[9px] font-black uppercase tracking-wider text-rose-300 mt-0.5">
                      Dropped
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Large Roll Trigger Pill & Total Result Display */}
            <div className="flex flex-col items-center gap-2 mt-1">
              {diceBannerVisible && diceTotal !== null && !isSpinning ? (
                <div
                  data-testid="streamer-winner-banner"
                  className={`px-8 py-4 rounded-3xl border-2 shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col items-center gap-1 animate-fadeIn ${
                    isLightTheme
                      ? 'bg-white/95 border-[#4648d4] text-slate-900'
                      : 'bg-black/90 border-[#8587ff] text-white'
                  }`}
                >
                  <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
                    🎲 Total Roll ({diceCount}d{diceSides}
                    {diceDropLowest > 0 ? ` drop ${diceDropLowest}` : ''})
                  </span>
                  <span
                    className="text-5xl sm:text-7xl font-headline font-black tracking-tight"
                    style={
                      isOutline
                        ? {
                            textShadow: '0 4px 16px rgba(70,72,212,0.9)'
                          }
                        : undefined
                    }
                  >
                    {diceTotal}
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={triggerSpin}
                  disabled={isSpinning}
                  className="px-6 py-3 rounded-2xl bg-[#4648d4] hover:bg-[#585ae6] text-white font-headline font-black text-base sm:text-lg shadow-[0_10px_30px_rgba(0,0,0,0.75)] border border-white/25 flex items-center gap-2 cursor-pointer"
                >
                  <Dices className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
                  <span>
                    {isSpinning
                      ? 'Rolling...'
                      : `Roll ${diceCount}d${diceSides} [Space]`}
                  </span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* ================= WHEEL STREAMER STAGE ================= */
          <div
            data-testid="streamer-wheel-stage"
            className={`relative w-full ${wheelSizeClass} aspect-square flex items-center justify-center`}
          >
            <svg
              viewBox="0 0 500 500"
              className="w-full h-full drop-shadow-[0_18px_45px_rgba(0,0,0,0.85)] overflow-visible"
            >
              <g transform={`rotate(${rotation}, 250, 250)`}>
                {slices.map((s) => {
                  const label =
                    s.item.text.length > 22
                      ? s.item.text.slice(0, 21) + '…'
                      : s.item.text;
                  const baseFontSize =
                    items.length > 32
                      ? 12.5
                      : items.length > 20
                      ? 15.5
                      : items.length > 12
                      ? 18.5
                      : 22;

                  return (
                    <g key={s.item.id || s.idx}>
                      <path
                        d={s.pathData}
                        fill={s.color}
                        stroke="#ffffff"
                        strokeWidth={items.length > 28 ? '1.5' : '2.5'}
                        strokeLinejoin="round"
                      />
                      {items.length <= 80 && (
                        <text
                          x={s.tx}
                          y={s.ty}
                          transform={`rotate(${s.midAngle}, ${s.tx}, ${s.ty})`}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill="#ffffff"
                          fontWeight="900"
                          fontSize={baseFontSize}
                          style={
                            isOutline
                              ? {
                                  paintOrder: 'stroke fill',
                                  stroke: '#000000',
                                  strokeWidth: '4.5px',
                                  letterSpacing: '-0.01em',
                                  fontFamily:
                                    "'Plus Jakarta Sans', Inter, system-ui, sans-serif"
                                }
                              : {
                                  fontFamily:
                                    "'Plus Jakarta Sans', Inter, system-ui, sans-serif"
                                }
                          }
                        >
                          {label}
                        </text>
                      )}
                    </g>
                  );
                })}
                <circle
                  cx="250"
                  cy="250"
                  r="234"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="4"
                />
              </g>

              {/* High-Contrast Outer Rim */}
              <circle
                cx="250"
                cy="250"
                r="238"
                fill="none"
                stroke="#12131a"
                strokeWidth="7"
              />

              {/* Center Spin Hub */}
              <g
                role="button"
                tabIndex={0}
                aria-label="Spin wheel"
                onClick={triggerSpin}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    triggerSpin();
                  }
                }}
                className="cursor-pointer"
              >
                <circle cx="250" cy="250" r="50" fill="#ffffff" />
                <circle cx="250" cy="250" r="43" fill="#4648d4" />
                <text
                  x="250"
                  y="245"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#ffffff"
                  fontWeight="900"
                  fontSize="16"
                  letterSpacing="0.06em"
                >
                  {isSpinning ? 'SPINNING' : 'SPIN'}
                </text>
                <text
                  x="250"
                  y="262"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#e0e7ff"
                  fontWeight="800"
                  fontSize="9"
                  letterSpacing="0.08em"
                >
                  SPACE / CLICK
                </text>
              </g>

              {/* Top Pointer Needle */}
              <g transform="translate(250, 16)">
                <path
                  d="M -16 -14 L 16 -14 L 0 30 Z"
                  fill="#ff2d55"
                  stroke="#ffffff"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />
              </g>
            </svg>

            {/* Giant Stream-Ready Winner Banner */}
            {winner && (
              <div
                data-testid="streamer-winner-banner"
                className={`absolute inset-x-0 bottom-2 sm:bottom-6 mx-auto max-w-xl rounded-3xl p-5 sm:p-6 border-2 shadow-[0_20px_60px_rgba(0,0,0,0.92)] flex flex-col items-center gap-2.5 text-center animate-fadeIn ${
                  isLightTheme
                    ? 'bg-white/95 border-[#4648d4] text-slate-900'
                    : 'bg-black/92 backdrop-blur-xl border-[#8587ff] text-white'
                }`}
              >
                <span className="px-3 py-1 rounded-full bg-[#4648d4] text-white text-xs font-black uppercase tracking-widest">
                  🏆 Winner
                </span>
                <p
                  className="text-3xl sm:text-5xl font-headline font-black leading-tight break-words"
                  style={
                    isOutline && !isLightTheme
                      ? {
                          textShadow:
                            '0 3px 14px rgba(70,72,212,0.9), 0 2px 4px rgba(0,0,0,1)'
                        }
                      : undefined
                  }
                >
                  {winner.text}
                </p>

                <div
                  className={`flex flex-wrap items-center justify-center gap-2 pt-1 transition-opacity ${
                    hudPinned ? 'opacity-100' : 'opacity-0 hover:opacity-100'
                  }`}
                >
                  <button
                    type="button"
                    onClick={triggerSpin}
                    className="px-4 py-1.5 rounded-xl bg-[#4648d4] hover:bg-[#6063ee] text-white text-xs font-black cursor-pointer"
                  >
                    Spin [Space]
                  </button>
                  {items.length > 2 && (
                    <button
                      type="button"
                      onClick={handleRemoveLastWinner}
                      className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <UserX className="w-3.5 h-3.5" />
                      <span>Remove Winner [N]</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-3.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset [R]</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Optional Small "Fair: Web Crypto RNG" Trust Badge (Bottom-Right, toggle with ?fair=0|1) */}
      {streamParams.fair && (
        <div
          data-testid="streamer-fair-badge"
          className="fixed bottom-2.5 right-3 z-20 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-sm border border-white/15 text-[10px] font-mono font-bold text-emerald-300 flex items-center gap-1.5 pointer-events-none shadow-sm"
        >
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>Fair: Web Crypto RNG</span>
        </div>
      )}
    </div>
  );
}
