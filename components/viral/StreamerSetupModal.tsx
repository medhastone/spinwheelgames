'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Tv,
  Copy,
  Check,
  X,
  ExternalLink,
  Keyboard,
  Sliders,
  Radio,
  Volume2,
  VolumeX,
  BookOpen,
  ShieldCheck,
  Play
} from 'lucide-react';
import {
  ViralToolConfig,
  generateStreamSessionId,
  loadSavedStreamerSettings,
  saveStreamerSettings
} from '@/lib/viralToolsData';

interface StreamerSetupModalProps {
  config: ViralToolConfig;
  onClose: () => void;
  onLaunchOverlayHere: (queryUrl: string) => void;
}

const SESSION_ID_STORAGE_KEY = 'swg_streamer_session_id';

export default function StreamerSetupModal({
  config,
  onClose,
  onLaunchOverlayHere
}: StreamerSetupModalProps) {
  const [sessionId, setSessionId] = useState<string>('');
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [labelsOutline, setLabelsOutline] = useState<boolean>(true);
  const [sound, setSound] = useState<boolean>(true);
  const [removewinner, setRemovewinner] = useState<boolean>(false);
  const [winnerseconds, setWinnerseconds] = useState<number>(5);
  const [autospin, setAutospin] = useState<boolean>(false);
  const [history, setHistory] = useState<boolean>(false);
  const [quality, setQuality] = useState<'high' | 'low'>('high');
  const [fps, setFps] = useState<30 | 60>(30);
  const [includeEntries, setIncludeEntries] = useState<boolean>(true);

  const [copiedStreamUrl, setCopiedStreamUrl] = useState<boolean>(false);
  const [copiedRemoteUrl, setCopiedRemoteUrl] = useState<boolean>(false);

  // Initialize session ID & restore saved streamer settings from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      let savedSession = localStorage.getItem(SESSION_ID_STORAGE_KEY);
      if (!savedSession || savedSession.length < 8) {
        savedSession = generateStreamSessionId();
        localStorage.setItem(SESSION_ID_STORAGE_KEY, savedSession);
      }
      setSessionId(savedSession);

      const saved = loadSavedStreamerSettings();
      if (saved.size === 'sm' || saved.size === 'md' || saved.size === 'lg') setSize(saved.size);
      if (saved.theme === 'light' || saved.theme === 'dark') setTheme(saved.theme);
      if (saved.labels) setLabelsOutline(saved.labels === 'outline');
      if (typeof saved.sound === 'boolean') setSound(saved.sound);
      if (typeof saved.removewinner === 'boolean') setRemovewinner(saved.removewinner);
      if (typeof saved.winnerseconds === 'number') setWinnerseconds(saved.winnerseconds);
      if (typeof saved.autospin === 'boolean') setAutospin(saved.autospin);
      if (typeof saved.history === 'boolean') setHistory(saved.history);
      if (saved.quality === 'low' || saved.quality === 'high') setQuality(saved.quality);
      if (saved.fps === 30 || saved.fps === 60) setFps(saved.fps);
    } catch {
      setSessionId(generateStreamSessionId());
    }
  }, []);

  // Persist changes to localStorage
  useEffect(() => {
    if (!sessionId) return;
    saveStreamerSettings({
      size,
      theme,
      labels: labelsOutline ? 'outline' : 'normal',
      sound,
      removewinner,
      winnerseconds,
      autospin,
      history,
      quality,
      fps,
      sessionId
    });
  }, [
    sessionId,
    size,
    theme,
    labelsOutline,
    sound,
    removewinner,
    winnerseconds,
    autospin,
    history,
    quality,
    fps
  ]);

  const baseOrigin =
    typeof window !== 'undefined' ? window.location.origin : 'https://spinwheelgames.org';

  const streamerUrl = useMemo(() => {
    const cleanPath =
      config.canonicalPath === '/' ? '/wheel-of-names' : config.canonicalPath;
    const sp = new URLSearchParams();
    sp.set('stream', '1');
    if (sessionId) sp.set('id', sessionId);
    if (size !== 'md') sp.set('size', size);
    if (theme !== 'dark') sp.set('theme', theme);
    if (labelsOutline) sp.set('labels', 'outline');
    if (!sound) sp.set('sound', '0');
    if (removewinner) sp.set('removewinner', '1');
    if (winnerseconds !== 5) sp.set('winnerseconds', String(winnerseconds));
    if (autospin) sp.set('autospin', '1');
    if (history) sp.set('history', '1');
    if (config.toolKind === 'dice') {
      if (quality === 'low') sp.set('quality', 'low');
      if (fps === 60) sp.set('fps', '60');
    } else if (includeEntries && config.items.length > 0) {
      const entriesStr = config.items
        .slice(0, 60)
        .map((i) => i.text.replace(/[,|]/g, ' ').trim())
        .filter(Boolean)
        .join(',');
      if (entriesStr.length > 0 && entriesStr.length < 1600) {
        sp.set('entries', entriesStr);
      }
    }
    return `${baseOrigin}${cleanPath}?${sp.toString()}`;
  }, [
    baseOrigin,
    config,
    sessionId,
    size,
    theme,
    labelsOutline,
    sound,
    removewinner,
    winnerseconds,
    autospin,
    history,
    quality,
    fps,
    includeEntries
  ]);

  const remoteControlUrl = useMemo(() => {
    const sp = new URLSearchParams();
    if (sessionId) sp.set('id', sessionId);
    sp.set('tool', config.slug || 'wheel-of-names');
    return `${baseOrigin}/stream-control?${sp.toString()}`;
  }, [baseOrigin, sessionId, config.slug]);

  const handleCopyStreamUrl = async () => {
    try {
      await navigator.clipboard.writeText(streamerUrl);
    } catch {
      const el = document.createElement('textarea');
      el.value = streamerUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopiedStreamUrl(true);
    setTimeout(() => setCopiedStreamUrl(false), 2400);
  };

  const handleCopyRemoteUrl = async () => {
    try {
      await navigator.clipboard.writeText(remoteControlUrl);
    } catch {
      // Ignore
    }
    setCopiedRemoteUrl(true);
    setTimeout(() => setCopiedRemoteUrl(false), 2400);
  };

  const handleRegenerateSession = () => {
    const nextId = generateStreamSessionId();
    setSessionId(nextId);
    try {
      localStorage.setItem(SESSION_ID_STORAGE_KEY, nextId);
    } catch {
      // Ignore
    }
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="streamer-setup-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#161722] rounded-3xl border border-[#e3e1ec] dark:border-[#292a39] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-gradient-to-r from-emerald-600/10 via-[#4648d4]/10 to-transparent border-b border-[#eeedf7] dark:border-[#252636]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Tv className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="streamer-setup-modal-title"
                className="font-headline text-base sm:text-lg font-extrabold text-[#1a1b22] dark:text-white leading-tight"
              >
                Streamer Mode / OBS Studio Overlay
              </h2>
              <p className="text-xs text-[#767586] dark:text-[#9e9cb0]">
                Transparent browser source for {config.title} ({config.toolKind === 'dice' ? '3D/2D Dice' : 'Spin Wheel'})
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-[#464554] dark:text-[#c7c4d7] transition-colors cursor-pointer"
            aria-label="Close Streamer Setup Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-sm">
          {/* 1. Ready-to-Copy Streamer URL */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor="obs-browser-source-url"
                className="text-xs font-extrabold uppercase tracking-wider text-[#1a1b22] dark:text-white flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                1. OBS / Streamlabs Browser Source URL
              </label>
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                100% Transparent Alpha
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <input
                id="obs-browser-source-url"
                type="text"
                readOnly
                value={streamerUrl}
                onFocus={(e) => e.currentTarget.select()}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#f4f2fd] dark:bg-[#0e0f17] border border-[#dcd9ec] dark:border-[#2a2b3d] font-mono text-xs text-[#1a1b22] dark:text-[#e2e0f5] select-all focus:outline-none focus:border-[#4648d4]"
              />
              <button
                type="button"
                onClick={handleCopyStreamUrl}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer shrink-0"
              >
                {copiedStreamUrl ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied OBS URL!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Streamer URL</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 2. Quick Overlay Parameters Customizer */}
          <div className="p-4 rounded-2xl bg-[#fbf8ff] dark:bg-[#11121b] border border-[#eeedf7] dark:border-[#232433] space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#464554] dark:text-[#c7c4d7] flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
                Overlay Parameters (Live URL Builder)
              </span>
              <span className="text-[11px] text-[#767586] dark:text-[#908fa1]">
                Saved automatically in browser
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* Size */}
              <div>
                <label className="block text-[11px] font-bold text-[#767586] dark:text-[#9e9cb0] mb-1">
                  Overlay Size (?size=)
                </label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value as 'sm' | 'md' | 'lg')}
                  className="w-full px-2.5 py-1.5 rounded-xl bg-white dark:bg-[#1a1b26] border border-[#dcd9ec] dark:border-[#2d2e40] text-xs font-bold text-[#1a1b22] dark:text-white"
                >
                  <option value="sm">Small (sm)</option>
                  <option value="md">Medium (md)</option>
                  <option value="lg">Large (lg)</option>
                </select>
              </div>

              {/* Theme */}
              <div>
                <label className="block text-[11px] font-bold text-[#767586] dark:text-[#9e9cb0] mb-1">
                  Banner Theme (?theme=)
                </label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as 'dark' | 'light')}
                  className="w-full px-2.5 py-1.5 rounded-xl bg-white dark:bg-[#1a1b26] border border-[#dcd9ec] dark:border-[#2d2e40] text-xs font-bold text-[#1a1b22] dark:text-white"
                >
                  <option value="dark">Dark Neon</option>
                  <option value="light">Light Crisp</option>
                </select>
              </div>

              {/* Winner Banner Duration */}
              <div>
                <label className="block text-[11px] font-bold text-[#767586] dark:text-[#9e9cb0] mb-1">
                  Winner Clear (?winnerseconds=)
                </label>
                <select
                  value={winnerseconds}
                  onChange={(e) => setWinnerseconds(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-xl bg-white dark:bg-[#1a1b26] border border-[#dcd9ec] dark:border-[#2d2e40] text-xs font-bold text-[#1a1b22] dark:text-white"
                >
                  <option value={3}>3 seconds</option>
                  <option value={5}>5 seconds (Default)</option>
                  <option value={8}>8 seconds</option>
                  <option value={12}>12 seconds</option>
                  <option value={0}>Keep until Reset (0)</option>
                </select>
              </div>

              {/* Audio */}
              <div>
                <label className="block text-[11px] font-bold text-[#767586] dark:text-[#9e9cb0] mb-1">
                  OBS Audio (?sound=)
                </label>
                <button
                  type="button"
                  onClick={() => setSound((v) => !v)}
                  className={`w-full px-2.5 py-1.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                    sound
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-300'
                  }`}
                >
                  {sound ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  <span>{sound ? 'Sound On (1)' : 'Muted (0)'}</span>
                </button>
              </div>
            </div>

            {/* Checkboxes Row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-xs">
              <label className="inline-flex items-center gap-1.5 font-semibold text-[#1a1b22] dark:text-[#e2e0f5] cursor-pointer">
                <input
                  type="checkbox"
                  checked={labelsOutline}
                  onChange={(e) => setLabelsOutline(e.target.checked)}
                  className="rounded accent-[#4648d4]"
                />
                <span>Outline Text (?labels=outline)</span>
              </label>

              {config.toolKind !== 'dice' && (
                <label className="inline-flex items-center gap-1.5 font-semibold text-[#1a1b22] dark:text-[#e2e0f5] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={removewinner}
                    onChange={(e) => setRemovewinner(e.target.checked)}
                    className="rounded accent-[#4648d4]"
                  />
                  <span>Auto-Remove Winner (?removewinner=1)</span>
                </label>
              )}

              <label className="inline-flex items-center gap-1.5 font-semibold text-[#1a1b22] dark:text-[#e2e0f5] cursor-pointer">
                <input
                  type="checkbox"
                  checked={history}
                  onChange={(e) => setHistory(e.target.checked)}
                  className="rounded accent-[#4648d4]"
                />
                <span>On-Screen History (?history=1)</span>
              </label>

              <label className="inline-flex items-center gap-1.5 font-semibold text-[#1a1b22] dark:text-[#e2e0f5] cursor-pointer">
                <input
                  type="checkbox"
                  checked={autospin}
                  onChange={(e) => setAutospin(e.target.checked)}
                  className="rounded accent-[#4648d4]"
                />
                <span>Spin Once on Load (?autospin=1)</span>
              </label>

              {config.toolKind !== 'dice' && (
                <label className="inline-flex items-center gap-1.5 font-semibold text-[#1a1b22] dark:text-[#e2e0f5] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeEntries}
                    onChange={(e) => setIncludeEntries(e.target.checked)}
                    className="rounded accent-[#4648d4]"
                  />
                  <span>Preload Current Entries (?entries=)</span>
                </label>
              )}

              {config.toolKind === 'dice' && (
                <>
                  <label className="inline-flex items-center gap-1.5 font-semibold text-[#1a1b22] dark:text-[#e2e0f5] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={quality === 'low'}
                      onChange={(e) => setQuality(e.target.checked ? 'low' : 'high')}
                      className="rounded accent-[#4648d4]"
                    />
                    <span>Lightweight 2D Dice (?quality=low)</span>
                  </label>
                  <label className="inline-flex items-center gap-1.5 font-semibold text-[#1a1b22] dark:text-[#e2e0f5] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={fps === 60}
                      onChange={(e) => setFps(e.target.checked ? 60 : 30)}
                      className="rounded accent-[#4648d4]"
                    />
                    <span>60 FPS Mode (?fps=60)</span>
                  </label>
                </>
              )}
            </div>
          </div>

          {/* 3. Remote Control Page (Trigger without focusing OBS) */}
          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/25 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#4648d4] dark:text-[#8587ff] animate-pulse" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#1a1b22] dark:text-white">
                  Live Remote Control Tab (/stream-control)
                </span>
              </div>
              <button
                type="button"
                onClick={handleRegenerateSession}
                className="text-[11px] font-mono text-[#4648d4] dark:text-[#8587ff] hover:underline cursor-pointer"
              >
                New Session ID ({sessionId.slice(0, 8)}…)
              </button>
            </div>
            <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
              OBS Browser Sources only receive keyboard keys when focused. Open the{' '}
              <strong className="text-[#1a1b22] dark:text-white">Remote Control Deck</strong> in a regular browser tab or on your phone to trigger spins, reset, remove winners, and edit entries live in real time.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <Link
                href={`/stream-control?id=${encodeURIComponent(sessionId)}&tool=${encodeURIComponent(config.slug || 'wheel-of-names')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#4648d4] hover:bg-[#585ae6] text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Remote Control Tab</span>
              </Link>
              <button
                type="button"
                onClick={handleCopyRemoteUrl}
                className="px-3 py-2 rounded-xl bg-white dark:bg-[#1e1f2e] hover:bg-slate-100 dark:hover:bg-[#27283a] border border-[#dcd9ec] dark:border-[#32344a] text-xs font-bold text-[#1a1b22] dark:text-white inline-flex items-center gap-1.5 cursor-pointer"
              >
                {copiedRemoteUrl ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedRemoteUrl ? 'Remote Link Copied' : 'Copy Remote Control URL'}</span>
              </button>
            </div>
          </div>

          {/* 4. 4-Step OBS Setup Guide + Hotkey Reference */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-2xl bg-[#f4f2fd] dark:bg-[#11121b] border border-[#e3e1ec] dark:border-[#232433] space-y-2">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#1a1b22] dark:text-white">
                4-Step OBS Studio Setup
              </h3>
              <ol className="text-xs text-[#464554] dark:text-[#c7c4d7] space-y-1.5 list-decimal list-inside leading-relaxed">
                <li>
                  In OBS, click <strong>Sources → + → Browser</strong> and create a new source.
                </li>
                <li>
                  Paste the <strong>Streamer URL</strong> above into the URL field.
                </li>
                <li>
                  Set Width to <strong>1920</strong> and Height to <strong>1080</strong> (or <strong>900×900</strong>).
                </li>
                <li>
                  Enable <strong>Control audio via OBS</strong> to mix spin/dice sound effects.
                </li>
              </ol>
            </div>

            <div className="p-4 rounded-2xl bg-[#f4f2fd] dark:bg-[#11121b] border border-[#e3e1ec] dark:border-[#232433] space-y-2">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#1a1b22] dark:text-white flex items-center gap-1.5">
                <Keyboard className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
                OBS Interact Hotkeys
              </h3>
              <ul className="text-xs text-[#464554] dark:text-[#c7c4d7] space-y-1.5">
                <li className="flex items-center justify-between">
                  <span>Spin Wheel / Roll Dice:</span>
                  <kbd className="px-2 py-0.5 rounded bg-white dark:bg-[#222334] border border-[#dcd9ec] dark:border-[#32344a] font-mono text-[11px] font-bold">
                    Space / Enter
                  </kbd>
                </li>
                <li className="flex items-center justify-between">
                  <span>Remove Last Winner:</span>
                  <kbd className="px-2 py-0.5 rounded bg-white dark:bg-[#222334] border border-[#dcd9ec] dark:border-[#32344a] font-mono text-[11px] font-bold">
                    N
                  </kbd>
                </li>
                <li className="flex items-center justify-between">
                  <span>Reset Entries / Clear:</span>
                  <kbd className="px-2 py-0.5 rounded bg-white dark:bg-[#222334] border border-[#dcd9ec] dark:border-[#32344a] font-mono text-[11px] font-bold">
                    R
                  </kbd>
                </li>
                <li className="flex items-center justify-between">
                  <span>Toggle Overlay HUD:</span>
                  <kbd className="px-2 py-0.5 rounded bg-white dark:bg-[#222334] border border-[#dcd9ec] dark:border-[#32344a] font-mono text-[11px] font-bold">
                    H
                  </kbd>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 sm:px-6 py-3.5 bg-[#f4f2fd] dark:bg-[#11121b] border-t border-[#eeedf7] dark:border-[#252636] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/stream-wheel"
              onClick={onClose}
              className="text-xs font-bold text-[#4648d4] dark:text-[#8587ff] hover:underline inline-flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Full OBS &amp; Streamlabs Guide (/stream-wheel)</span>
            </Link>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Web Crypto RNG
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#1d1e2b] border border-[#dcd9ec] dark:border-[#2f3044] text-xs font-bold text-[#464554] dark:text-[#c7c4d7] cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => onLaunchOverlayHere(streamerUrl)}
              className="px-4 py-2 rounded-xl bg-[#4648d4] hover:bg-[#585ae6] text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Preview Overlay Here (?stream=1)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
