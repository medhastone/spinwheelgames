'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  Radio,
  Play,
  RotateCcw,
  UserX,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Tv,
  Sliders,
  Dices,
  Send,
  BookOpen,
  ShieldCheck,
  Terminal,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import {
  generateStreamSessionId,
  resolveToolWheelConfig,
  parseSanitizedStreamEntries
} from '@/lib/viralToolsData';
import { sendStreamRemoteCommand } from '@/lib/streamRemoteChannel';

const SESSION_ID_STORAGE_KEY = 'swg_streamer_session_id';

const POPULAR_STREAM_TOOLS = [
  { slug: 'comment-picker', label: '🏆 Giveaway / Comment Winner Picker' },
  { slug: 'wheel-of-names', label: '🎡 Wheel of Names (Random Picker)' },
  { slug: 'dice/d20', label: '🎲 d20 Polyhedral Dice Roller' },
  { slug: 'dice/d6', label: '🎲 d6 Standard Cube Dice Roller' },
  { slug: 'roll-4d6', label: '⚔️ 4d6 Drop Lowest D&D Stat Roller' },
  { slug: 'food-wheel', label: '🍕 Food & Dinner Decision Wheel' },
  { slug: 'random-game-picker', label: '🎮 Video & Board Game Picker' },
  { slug: 'truth-or-dare-wheel', label: '⚡ Truth or Dare Stream Wheel' },
  { slug: 'number-wheel', label: '🔢 Random Number Wheel (1–20)' }
];

export default function StreamControlDeck() {
  const [sessionId, setSessionId] = useState<string>('');
  const [selectedTool, setSelectedTool] = useState<string>('comment-picker');
  const [wheelTitle, setWheelTitle] = useState<string>('Giveaway Winner Picker');
  const [entriesText, setEntriesText] = useState<string>(
    '@alex_creates\n@sarah_designs\n@marco_dev\n@elena_plays\n@jordan_streams\n@chloe_art\n@liam_tech\n@maya_vlogs'
  );
  const [diceSides, setDiceSides] = useState<number>(20);
  const [diceCount, setDiceCount] = useState<number>(1);
  const [diceDropLowest, setDiceDropLowest] = useState<number>(0);

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [lastActionStatus, setLastActionStatus] = useState<string>('Ready');
  const [latestWinner, setLatestWinner] = useState<string | null>(null);
  const [copiedObsUrl, setCopiedObsUrl] = useState<boolean>(false);
  const [copiedWebhook, setCopiedWebhook] = useState<boolean>(false);

  // Initialize session ID from URL ?id=<session> or localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sp = new URLSearchParams(window.location.search);
    const urlId = (sp.get('id') || sp.get('session') || '')
      .replace(/[^a-zA-Z0-9_-]/g, '')
      .slice(0, 32);
    const urlTool = (sp.get('tool') || '').replace(/^\/+|\/+$/g, '');

    let activeId = urlId;
    if (!activeId || activeId.length < 4) {
      try {
        activeId = localStorage.getItem(SESSION_ID_STORAGE_KEY) || '';
      } catch {
        // Ignore
      }
    }
    if (!activeId || activeId.length < 4) {
      activeId = generateStreamSessionId();
    }

    try {
      localStorage.setItem(SESSION_ID_STORAGE_KEY, activeId);
    } catch {
      // Ignore
    }

    setSessionId(activeId);

    if (urlTool) {
      setSelectedTool(urlTool);
      const resolved = resolveToolWheelConfig(urlTool);
      setWheelTitle(resolved.title);
      setEntriesText(resolved.items.map((i) => i.text).join('\n'));
      if (resolved.diceConfig) {
        setDiceSides(resolved.diceConfig.sides);
        setDiceCount(resolved.diceConfig.count);
        setDiceDropLowest(resolved.diceConfig.dropLowest || 0);
      }
    }

    // Keep URL in sync with session ID without triggering reload
    if (!urlId) {
      const nextUrl = new URL(window.location.href);
      nextUrl.searchParams.set('id', activeId);
      window.history.replaceState({}, '', nextUrl.toString());
    }
  }, []);

  // Listen for winner reports from the overlay via BroadcastChannel and server poll
  useEffect(() => {
    if (!sessionId || typeof window === 'undefined') return;
    let active = true;
    let bc: BroadcastChannel | null = null;

    if ('BroadcastChannel' in window) {
      try {
        bc = new BroadcastChannel(`swg_stream_${sessionId}`);
        bc.onmessage = (ev) => {
          if (ev.data?.type === 'winner' && ev.data.winner) {
            setLatestWinner(ev.data.winner);
          }
        };
      } catch {
        bc = null;
      }
    }

    const pollWinner = async () => {
      if (!active) return;
      try {
        const res = await fetch(
          `/api/stream-session?id=${encodeURIComponent(sessionId)}`,
          { cache: 'no-store' }
        );
        if (!res.ok) return;
        const data = await res.json();
        if (data.lastWinner) {
          setLatestWinner(data.lastWinner);
        }
      } catch {
        // Ignore
      }
    };

    const timer = window.setInterval(pollWinner, 1500);
    return () => {
      active = false;
      window.clearInterval(timer);
      if (bc) {
        try {
          bc.close();
        } catch {
          // Ignore
        }
      }
    };
  }, [sessionId]);

  const baseOrigin =
    typeof window !== 'undefined' ? window.location.origin : 'https://spinwheelgames.org';

  const obsOverlayUrl = useMemo(() => {
    const cleanPath =
      selectedTool === 'home' ? '/wheel-of-names' : `/${selectedTool.replace(/^\/+/, '')}`;
    const sp = new URLSearchParams();
    sp.set('stream', '1');
    if (sessionId) sp.set('id', sessionId);
    sp.set('labels', 'outline');
    return `${baseOrigin}${cleanPath}?${sp.toString()}`;
  }, [baseOrigin, selectedTool, sessionId]);

  const triggerRemoteAction = useCallback(
    async (
      action:
        | 'spin'
        | 'reset'
        | 'remove-winner'
        | 'clear-winner'
        | 'toggle-sound'
        | 'update-entries'
        | 'update-dice',
      label: string
    ) => {
      if (!sessionId) return;
      setLastActionStatus(`Sending: ${label}...`);

      if (action === 'toggle-sound') {
        const nextSound = !soundEnabled;
        setSoundEnabled(nextSound);
        await sendStreamRemoteCommand(sessionId, 'toggle-sound', { sound: nextSound });
        setLastActionStatus(nextSound ? 'Audio Unmuted' : 'Audio Muted');
        return;
      }

      if (action === 'update-entries') {
        const parsed = parseSanitizedStreamEntries(entriesText, 200);
        await sendStreamRemoteCommand(sessionId, 'update-entries', {
          title: wheelTitle,
          entries: parsed.map((i) => i.text)
        });
        setLastActionStatus(`Pushed ${parsed.length} entries to live overlay`);
        return;
      }

      if (action === 'update-dice') {
        await sendStreamRemoteCommand(sessionId, 'update-dice', {
          sides: diceSides,
          count: diceCount,
          dropLowest: diceDropLowest
        });
        setLastActionStatus(`Updated overlay to ${diceCount}d${diceSides}`);
        return;
      }

      await sendStreamRemoteCommand(sessionId, action);
      setLastActionStatus(`Sent: ${label} (${new Date().toLocaleTimeString()})`);
    },
    [sessionId, soundEnabled, entriesText, wheelTitle, diceSides, diceCount, diceDropLowest]
  );

  // Keyboard shortcuts inside Remote Control tab too!
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.code === 'Space' || e.key === 'Enter') {
        e.preventDefault();
        triggerRemoteAction('spin', 'Spin / Roll');
      } else if (e.key.toLowerCase() === 'n') {
        e.preventDefault();
        triggerRemoteAction('remove-winner', 'Remove Last Winner');
      } else if (e.key.toLowerCase() === 'r') {
        e.preventDefault();
        triggerRemoteAction('reset', 'Reset');
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [triggerRemoteAction]);

  const handleToolChange = (newSlug: string) => {
    setSelectedTool(newSlug);
    const resolved = resolveToolWheelConfig(newSlug);
    setWheelTitle(resolved.title);
    setEntriesText(resolved.items.map((i) => i.text).join('\n'));
    if (resolved.diceConfig) {
      setDiceSides(resolved.diceConfig.sides);
      setDiceCount(resolved.diceConfig.count);
      setDiceDropLowest(resolved.diceConfig.dropLowest || 0);
    }
  };

  const handleCopyObsUrl = async () => {
    try {
      await navigator.clipboard.writeText(obsOverlayUrl);
    } catch {
      // Ignore
    }
    setCopiedObsUrl(true);
    setTimeout(() => setCopiedObsUrl(false), 2200);
  };

  const webhookCurlSnippet = `curl -X POST "${baseOrigin}/api/stream-session" -H "Content-Type: application/json" -d '{"id":"${sessionId}","action":"spin"}'`;

  const handleCopyWebhook = async () => {
    try {
      await navigator.clipboard.writeText(webhookCurlSnippet);
    } catch {
      // Ignore
    }
    setCopiedWebhook(true);
    setTimeout(() => setCopiedWebhook(false), 2200);
  };

  const sanitizedEntryCount = useMemo(
    () => parseSanitizedStreamEntries(entriesText, 200).length,
    [entriesText]
  );

  return (
    <div id="stream-control-deck" className="min-h-screen bg-[#0c0d14] text-[#f1effa] flex flex-col">
      {/* Top Bar */}
      <header className="border-b border-[#222330] bg-[#12131d]/90 backdrop-blur-md px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-headline text-base sm:text-lg font-extrabold text-white">
                OBS Streamer Remote Control Deck
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-mono text-[11px] font-bold">
                Session: {sessionId || '...'}
              </span>
            </div>
            <p className="text-xs text-[#9e9cb0]">
              Trigger spins, dice rolls, winner removals, and live entry updates in OBS without focusing the browser source.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/stream-wheel"
            className="px-3 py-1.5 rounded-xl bg-[#1c1d2b] hover:bg-[#26283a] border border-[#2d2f44] text-xs font-bold text-[#dcd9ec] inline-flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#8587ff]" />
            <span>OBS Setup Guide</span>
          </Link>
          <a
            href={obsOverlayUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-[#4648d4] hover:bg-[#5c5ee8] text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-md"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Overlay Window</span>
          </a>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Step 1: Copy Paired OBS Browser Source URL */}
        <section className="p-4 sm:p-5 rounded-3xl bg-[#151622] border border-[#252738] space-y-3 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label
              htmlFor="paired-obs-url"
              className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-2"
            >
              <Tv className="w-4 h-4" />
              <span>Paired OBS Studio / Streamlabs Browser Source URL</span>
            </label>
            <span className="text-xs font-mono text-[#9e9cb0]">
              Status: <strong className="text-white">{lastActionStatus}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5">
            <div className="md:col-span-4">
              <select
                value={selectedTool}
                onChange={(e) => handleToolChange(e.target.value)}
                aria-label="Select Stream Tool"
                className="w-full px-3 py-2.5 rounded-xl bg-[#0e0f17] border border-[#2b2d40] text-xs font-bold text-white"
              >
                {POPULAR_STREAM_TOOLS.map((t) => (
                  <option key={t.slug} value={t.slug}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-8 flex flex-col sm:flex-row gap-2">
              <input
                id="paired-obs-url"
                type="text"
                readOnly
                value={obsOverlayUrl}
                onFocus={(e) => e.currentTarget.select()}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#0e0f17] border border-[#2b2d40] font-mono text-xs text-emerald-300 select-all"
              />
              <button
                type="button"
                onClick={handleCopyObsUrl}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              >
                {copiedObsUrl ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedObsUrl ? 'Copied OBS URL!' : 'Copy OBS URL'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* Big Tactile Stream Deck Trigger Buttons */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-4">
            <div className="p-5 rounded-3xl bg-[#151622] border border-[#252738] space-y-4 shadow-lg">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#8587ff]" />
                  <span>Live Overlay Triggers</span>
                </h2>
                <span className="text-[11px] font-mono text-[#9e9cb0]">
                  Hotkeys work while this tab is focused
                </span>
              </div>

              {/* Giant Primary Spin / Roll Button */}
              <button
                type="button"
                data-testid="remote-spin-btn"
                onClick={() => triggerRemoteAction('spin', 'Spin / Roll')}
                className="w-full py-6 px-6 rounded-3xl bg-gradient-to-r from-[#4648d4] via-[#5e60f0] to-[#4648d4] hover:brightness-110 active:scale-[0.99] text-white font-headline font-black text-2xl sm:text-3xl shadow-[0_12px_35px_rgba(70,72,212,0.45)] border border-white/20 flex items-center justify-center gap-3 cursor-pointer transition-all"
              >
                <Play className="w-7 h-7 fill-current" />
                <span>SPIN / ROLL OVERLAY</span>
                <kbd className="text-xs font-mono px-2.5 py-1 rounded-lg bg-black/30 border border-white/20">
                  SPACE
                </kbd>
              </button>

              {/* Secondary Deck Buttons Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  type="button"
                  data-testid="remote-remove-winner-btn"
                  onClick={() => triggerRemoteAction('remove-winner', 'Remove Last Winner')}
                  className="p-4 rounded-2xl bg-rose-600/20 hover:bg-rose-600/35 border border-rose-500/40 text-rose-200 font-bold text-xs flex flex-col items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <UserX className="w-5 h-5 text-rose-400" />
                  <span>Remove Winner</span>
                  <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40">
                    Key: N
                  </kbd>
                </button>

                <button
                  type="button"
                  data-testid="remote-reset-btn"
                  onClick={() => triggerRemoteAction('reset', 'Reset Overlay')}
                  className="p-4 rounded-2xl bg-amber-500/15 hover:bg-amber-500/30 border border-amber-500/35 text-amber-200 font-bold text-xs flex flex-col items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <RotateCcw className="w-5 h-5 text-amber-400" />
                  <span>Reset All</span>
                  <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40">
                    Key: R
                  </kbd>
                </button>

                <button
                  type="button"
                  onClick={() => triggerRemoteAction('clear-winner', 'Hide Winner Banner')}
                  className="p-4 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/15 text-white font-bold text-xs flex flex-col items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Tv className="w-5 h-5 text-indigo-400" />
                  <span>Clear Banner</span>
                  <span className="text-[10px] font-mono opacity-60">Hide Popup</span>
                </button>

                <button
                  type="button"
                  onClick={() => triggerRemoteAction('toggle-sound', 'Toggle Sound')}
                  className="p-4 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/15 text-white font-bold text-xs flex flex-col items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  {soundEnabled ? (
                    <Volume2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <VolumeX className="w-5 h-5 text-rose-400" />
                  )}
                  <span>{soundEnabled ? 'Audio On' : 'Audio Muted'}</span>
                  <span className="text-[10px] font-mono opacity-60">OBS Audio</span>
                </button>
              </div>

              {/* Latest Winner Readout */}
              <div className="p-4 rounded-2xl bg-[#0e0f17] border border-[#252738] flex items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#9e9cb0] block">
                    Latest Overlay Result / Winner
                  </span>
                  <span
                    data-testid="remote-latest-winner"
                    className="font-headline text-xl sm:text-2xl font-black text-emerald-400"
                  >
                    {latestWinner || 'Waiting for spin...'}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-mono text-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Web Crypto RNG
                </span>
              </div>
            </div>

            {/* Twitch / YouTube Chat Bot (!spin) Webhook Section */}
            <div className="p-5 rounded-3xl bg-[#151622] border border-[#252738] space-y-2.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-white flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>Twitch / YouTube Chat Command (!spin) &amp; Channel Points Hook</span>
                </h3>
                <button
                  type="button"
                  onClick={handleCopyWebhook}
                  className="text-xs font-bold text-[#8587ff] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {copiedWebhook ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedWebhook ? 'Copied Webhook!' : 'Copy cURL'}</span>
                </button>
              </div>
              <p className="text-xs text-[#9e9cb0] leading-relaxed">
                Connect Streamer.bot, MixItUp, SAMMI, or custom chat bots to trigger a spin when viewers type{' '}
                <code className="text-emerald-300 font-mono">!spin</code> or redeem channel points:
              </p>
              <pre className="p-3 rounded-xl bg-[#0b0c12] border border-[#252738] font-mono text-[11px] text-emerald-300 overflow-x-auto">
                {webhookCurlSnippet}
              </pre>
            </div>
          </div>

          {/* Right Column: Live Entries Editor & Dice Configurator */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-3xl bg-[#151622] border border-[#252738] space-y-3.5 shadow-lg">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-[#8587ff]" />
                  <span>Live Wheel Entries Editor</span>
                </h2>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  {sanitizedEntryCount} / 200 entries
                </span>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#9e9cb0] mb-1">
                  Overlay Title
                </label>
                <input
                  type="text"
                  value={wheelTitle}
                  maxLength={80}
                  onChange={(e) => setWheelTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0e0f17] border border-[#2b2d40] text-xs font-bold text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#9e9cb0] mb-1">
                  Entries (1 per line or comma-separated, max 200 entries, auto-sanitized)
                </label>
                <textarea
                  rows={8}
                  value={entriesText}
                  onChange={(e) => setEntriesText(e.target.value)}
                  placeholder="Enter viewer names, giveaway participants, or wheel options..."
                  className="w-full p-3 rounded-xl bg-[#0e0f17] border border-[#2b2d40] font-mono text-xs text-white focus:outline-none focus:border-[#4648d4]"
                />
              </div>

              <button
                type="button"
                data-testid="remote-push-entries-btn"
                onClick={() => triggerRemoteAction('update-entries', 'Push Entries')}
                className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Push Entries to Live Overlay ({sanitizedEntryCount})</span>
              </button>
            </div>

            {/* Live Dice Configurator */}
            <div className="p-5 rounded-3xl bg-[#151622] border border-[#252738] space-y-3 shadow-lg">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-white flex items-center gap-1.5">
                <Dices className="w-4 h-4 text-[#8587ff]" />
                <span>Live Dice Overlay Configurator</span>
              </h3>
              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-[#9e9cb0] mb-1">
                    Dice Count
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={diceCount}
                    onChange={(e) =>
                      setDiceCount(Math.max(1, Math.min(20, Number(e.target.value) || 1)))
                    }
                    className="w-full px-2.5 py-1.5 rounded-xl bg-[#0e0f17] border border-[#2b2d40] text-xs font-bold text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#9e9cb0] mb-1">
                    Die Sides (dX)
                  </label>
                  <select
                    value={diceSides}
                    onChange={(e) => setDiceSides(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-xl bg-[#0e0f17] border border-[#2b2d40] text-xs font-bold text-white"
                  >
                    <option value={2}>d2 (Coin)</option>
                    <option value={4}>d4</option>
                    <option value={6}>d6</option>
                    <option value={8}>d8</option>
                    <option value={10}>d10</option>
                    <option value={12}>d12</option>
                    <option value={20}>d20</option>
                    <option value={100}>d100</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#9e9cb0] mb-1">
                    Drop Lowest
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={Math.max(0, diceCount - 1)}
                    value={diceDropLowest}
                    onChange={(e) =>
                      setDiceDropLowest(
                        Math.max(0, Math.min(diceCount - 1, Number(e.target.value) || 0))
                      )
                    }
                    className="w-full px-2.5 py-1.5 rounded-xl bg-[#0e0f17] border border-[#2b2d40] text-xs font-bold text-white"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => triggerRemoteAction('update-dice', 'Update Dice Config')}
                className="w-full py-2.5 px-4 rounded-xl bg-[#4648d4] hover:bg-[#5c5ee8] text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Dices className="w-3.5 h-3.5" />
                <span>Push {diceCount}d{diceSides} to Dice Overlay</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
