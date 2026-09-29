'use client';

import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { WheelItem, WheelMode, ResultCardData, SurpriseModifier } from '@/lib/types';
import { playWinnerFanfare, announceWinnerTTS, stopSpeaking } from '@/lib/sound';
import { getRandomSurpriseModifier } from '@/lib/gamification';
import { loadUserStats } from '@/lib/storage';
import ResultCardModal from './ResultCardModal';
import {
  X,
  Trophy,
  RotateCcw,
  UserX,
  Share2,
  Copy,
  Check,
  Sparkles,
  Download,
  Flame,
  Volume2,
  Dice5,
  ShieldCheck,
  ExternalLink,
  Crown
} from 'lucide-react';

interface WinnerModalProps {
  isOpen?: boolean;
  winner: WheelItem | null;
  items?: WheelItem[];
  palette?: string[];
  wheelTitle?: string;
  oddsPercent?: string;
  seed?: string;
  spinNumber?: number;
  currentMode?: WheelMode;
  soundEnabled?: boolean;
  soundPack?: string;
  volume?: number;
  ttsEnabled?: boolean;
  onClose: () => void;
  onSpinAgain: () => void;
  onRemoveWinner: (item: WheelItem) => void;
  onStartBestOfThree?: () => void;
}

export default function WinnerModal({
  isOpen = true,
  winner,
  items = [],
  palette = ['#4648d4', '#00a86b', '#f59e0b', '#ec4899', '#3b82f6', '#8b5cf6', '#10b981', '#f97316'],
  wheelTitle = 'Wheel of Names',
  oddsPercent = '12.5',
  seed = '0x94F2B01E',
  spinNumber = 1,
  currentMode = 'standard',
  soundEnabled = true,
  soundPack = 'carnival',
  volume = 0.7,
  ttsEnabled = true,
  onClose,
  onSpinAgain,
  onRemoveWinner,
  onStartBestOfThree
}: WinnerModalProps) {
  const [copied, setCopied] = useState(false);
  const [surpriseModifier, setSurpriseModifier] = useState<SurpriseModifier | null>(null);
  const [surpriseWinnerId, setSurpriseWinnerId] = useState<string | null>(null);
  const [resultCardOpen, setResultCardOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (!isOpen || !winner) {
      stopSpeaking();
      return;
    }

    let t1: ReturnType<typeof setTimeout> | null = null;
    let ttsTimer: ReturnType<typeof setTimeout> | null = null;

    // 1. Launch celebratory confetti bursts
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      t1 = setTimeout(() => {
        try {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
          });
        } catch {
          // Ignore
        }
      }, 250);
    } catch {
      // Confetti fallback safely ignored
    }

    // 2. Play fanfare chime
    if (soundEnabled) {
      playWinnerFanfare(soundEnabled, soundPack, volume);
    }

    // 3. Auto-Announce via Web Speech API (TTS)
    if (ttsEnabled) {
      ttsTimer = setTimeout(() => {
        announceWinnerTTS(winner.text, {
          enabled: true,
          volume,
          onStart: () => setIsSpeaking(true),
          onEnd: () => setIsSpeaking(false)
        });
      }, 300);
    }

    return () => {
      if (t1) clearTimeout(t1);
      if (ttsTimer) clearTimeout(ttsTimer);
      stopSpeaking();
    };
  }, [isOpen, winner, soundEnabled, volume, soundPack, ttsEnabled]);

  if (!isOpen || !winner) return null;

  const handleSpeakWinnerAgain = () => {
    if (!winner) return;
    announceWinnerTTS(winner.text, {
      enabled: true,
      volume,
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false)
    });
  };

  const activeModifier = surpriseWinnerId === winner.id ? surpriseModifier : null;
  const stats = loadUserStats();
  const streak = stats.currentDailyStreak || 1;

  const handleDrawSurprise = () => {
    const mod = getRandomSurpriseModifier();
    setSurpriseModifier(mod);
    setSurpriseWinnerId(winner.id);
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // ignore
    }
  };

  const handleCopy = () => {
    const text = `🎉 Winner: ${winner.text} (Odds: ${oddsPercent}%, Seed: ${seed}, Mode: ${currentMode}) - SpinWheelGames.org`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resultCardData: ResultCardData = {
    winner: winner.text,
    streak,
    challengeName: wheelTitle || 'Decision Wheel',
    oddsPercent,
    seed,
    brand: 'SpinWheelGames.org',
    shareUrl: typeof window !== 'undefined' ? window.location.href : 'https://spinwheelgames.org',
    modifier: activeModifier
  };

  // Prepare slices for the mini preview wheel
  const previewSlices = items.length > 0 ? items : [
    { id: '1', text: winner.text, weight: 1 },
    { id: '2', text: 'Option B', weight: 1 },
    { id: '3', text: 'Option C', weight: 1 },
    { id: '4', text: 'Option D', weight: 1 },
    { id: '5', text: 'Option E', weight: 1 },
    { id: '6', text: 'Option F', weight: 1 },
  ];

  const totalSlices = previewSlices.length;
  const sliceAngle = 360 / totalSlices;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/70 backdrop-blur-md animate-fadeIn overflow-y-auto">
        <div role="dialog" aria-modal="true" aria-labelledby="winner-dialog-title" className="relative w-full max-w-2xl bg-white dark:bg-[#0f1016] text-[#1a1b22] dark:text-white rounded-3xl p-5 sm:p-7 border border-[#eeedf7] dark:border-[#292a39] shadow-2xl flex flex-col items-center my-auto animate-bounceIn transition-colors">
          
          {/* Close Icon Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-[#767586] dark:text-[#908fa1] hover:text-[#1a1b22] dark:hover:text-white hover:bg-[#f4f2fd] dark:hover:bg-[#1d1e28] transition-colors cursor-pointer z-10"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Celebration Sub-Header */}
          <div className="flex flex-col items-center text-center mb-3">
            <span className="text-amber-500 dark:text-amber-400 font-extrabold text-sm sm:text-base flex items-center gap-1.5 tracking-wide uppercase font-mono">
              <Sparkles className="w-4 h-4" />
              <span>Woohoo!</span>
            </span>
            <h3 id="winner-dialog-title" className="font-headline font-black text-lg sm:text-xl text-[#1a1b22] dark:text-[#f1effa]">
              {winner.text}
            </h3>
          </div>

          {/* ========================================================================= */}
          {/* Main Winner Presentation Card (Matches Reference Image 2)                 */}
          {/* ========================================================================= */}
          <div className="w-full bg-gradient-to-br from-[#181a26] via-[#151622] to-[#1e1730] rounded-2xl border border-[#38374d] p-5 sm:p-6 shadow-inner relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 text-white">
            
            {/* Ambient background particles/glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#4648d4]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Left Side: Winner Details */}
            <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left z-10 space-y-2.5 min-w-0">
              {/* Wheel Title */}
              <div>
                <h4 className="text-[#c7c4d7] font-extrabold text-base sm:text-lg tracking-tight">
                  {wheelTitle}
                </h4>
                <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-rose-500 rounded-full mt-1 mx-auto sm:mx-0" />
              </div>

              {/* Winner Tag Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 font-black text-xs uppercase tracking-wider">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>WINNER</span>
              </div>

              {/* Massive Bold Winner Name + Speak button */}
              <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
                <h2 className="font-headline font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight break-words max-w-full drop-shadow-md">
                  {winner.text}
                </h2>
                <button
                  type="button"
                  onClick={handleSpeakWinnerAgain}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    isSpeaking
                      ? 'bg-[#4648d4] text-white border-white/40 scale-105 shadow-md shadow-[#4648d4]/40 animate-pulse'
                      : 'bg-white/10 hover:bg-white/20 text-[#f1effa] hover:text-white border-white/15'
                  }`}
                  title="Speak / Pronounce Winner Aloud"
                  aria-label="Speak winner name"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* Hand-drawn playful 'Spin it! ↗' pointer */}
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-300/90 pt-1">
                <span>Spin it!</span>
                <span className="text-sm">↗</span>
              </div>

              {/* Watermark badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#908fa1] text-[11px] font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>spinwheelgames.org</span>
              </div>
            </div>

            {/* Right Side: Mini Preview Wheel Illustration */}
            <div className="w-40 sm:w-48 md:w-52 aspect-square relative shrink-0 z-10 flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl overflow-visible">
                <defs>
                  <filter id="miniGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.5" />
                  </filter>
                </defs>

                {/* Outer Wheel Rim */}
                <circle cx="100" cy="100" r="94" fill="#1d1e28" stroke="#38374d" strokeWidth="4" />

                {/* Slices */}
                <g filter="url(#miniGlow)">
                  {previewSlices.map((item, idx) => {
                    const startAngle = (idx * sliceAngle - 90) * (Math.PI / 180);
                    const endAngle = ((idx + 1) * sliceAngle - 90) * (Math.PI / 180);
                    const x1 = 100 + 88 * Math.cos(startAngle);
                    const y1 = 100 + 88 * Math.sin(startAngle);
                    const x2 = 100 + 88 * Math.cos(endAngle);
                    const y2 = 100 + 88 * Math.sin(endAngle);
                    const largeArc = sliceAngle > 180 ? 1 : 0;
                    const pathData = `M 100 100 L ${x1} ${y1} A 88 88 0 ${largeArc} 1 ${x2} ${y2} Z`;
                    const color = item.color || palette[idx % palette.length];
                    const isWinningSlice = item.text === winner.text;

                    const midAngle = (idx * sliceAngle + sliceAngle / 2 - 90);
                    const midRad = midAngle * (Math.PI / 180);
                    const textX = 100 + 56 * Math.cos(midRad);
                    const textY = 100 + 56 * Math.sin(midRad);

                    return (
                      <g key={item.id || idx}>
                        <path
                          d={pathData}
                          fill={color}
                          stroke="#151622"
                          strokeWidth="2"
                          opacity={isWinningSlice ? 1 : 0.85}
                        />
                        <text
                          x={textX}
                          y={textY}
                          fill="#ffffff"
                          fontSize={totalSlices > 10 ? '7' : '9'}
                          fontWeight="bold"
                          textAnchor="middle"
                          dominantBaseline="central"
                          transform={`rotate(${midAngle + 90}, ${textX}, ${textY})`}
                          className="drop-shadow-xs"
                        >
                          {item.text.length > 8 ? item.text.substring(0, 7) + '…' : item.text}
                        </text>
                      </g>
                    );
                  })}
                </g>

                {/* Center Hub */}
                <circle cx="100" cy="100" r="18" fill="#12131a" stroke="#4648d4" strokeWidth="2.5" />
                <text
                  x="100"
                  y="100"
                  fill="#ffffff"
                  fontSize="7"
                  fontWeight="900"
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  Spin
                </text>

                {/* Winning Pointer at 12 o'clock */}
                <polygon points="94,6 106,6 100,20" fill="#ffffff" stroke="#12131a" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* Action Buttons Row (Matches Reference Image 2)                            */}
          {/* ========================================================================= */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
            {/* 1. Spin Again */}
            <button
              type="button"
              onClick={onSpinAgain}
              className="py-3 px-3 rounded-xl bg-red-600 hover:bg-red-500 active:scale-[0.98] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Spin Again</span>
            </button>

            {/* 2. Remove Winner */}
            <button
              type="button"
              onClick={() => onRemoveWinner(winner)}
              className="py-3 px-3 rounded-xl bg-[#f4f2fd] dark:bg-[#1d1e28] hover:bg-[#eae8f7] dark:hover:bg-[#282a38] text-[#1a1b22] dark:text-[#c7c4d7] hover:text-red-600 dark:hover:text-white border border-[#eeedf7] dark:border-[#292a39] font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <UserX className="w-4 h-4 text-red-500 dark:text-red-400" />
              <span>Remove Winner</span>
            </button>

            {/* 3. Copy / Save Result */}
            <button
              type="button"
              onClick={handleCopy}
              className="py-3 px-3 rounded-xl bg-[#f4f2fd] dark:bg-[#1d1e28] hover:bg-[#eae8f7] dark:hover:bg-[#282a38] text-[#1a1b22] dark:text-[#c7c4d7] hover:text-[#1a1b22] dark:hover:text-white border border-[#eeedf7] dark:border-[#292a39] font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Result'}</span>
            </button>

            {/* 4. Share Card */}
            <button
              type="button"
              onClick={() => setResultCardOpen(true)}
              className="py-3 px-3 rounded-xl bg-[#f4f2fd] dark:bg-[#1d1e28] hover:bg-[#eae8f7] dark:hover:bg-[#282a38] text-[#1a1b22] dark:text-[#c7c4d7] hover:text-[#1a1b22] dark:hover:text-white border border-[#eeedf7] dark:border-[#292a39] font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              <span>Share Card</span>
            </button>
          </div>

          {/* ========================================================================= */}
          {/* Cryptographic Fairness & Entropy Footer Info                              */}
          {/* ========================================================================= */}
          <div className="w-full mt-3 p-3 rounded-xl bg-[#f4f2fd] dark:bg-[#14151e] border border-[#eeedf7] dark:border-[#292a39] flex flex-wrap items-center justify-between text-xs text-[#767586] dark:text-[#908fa1] gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#006c49] dark:text-emerald-400" />
              <span>
                Selection Odds: <strong className="text-[#1a1b22] dark:text-white font-mono">{oddsPercent}%</strong> • Spin #{spinNumber}
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span>CSPRNG Seed:</span>
              <code className="px-1.5 py-0.5 rounded bg-white dark:bg-[#1f202c] border border-[#eeedf7] dark:border-transparent text-[#4648d4] dark:text-[#8587ff]">{seed}</code>
            </div>
          </div>

        </div>
      </div>

      {/* Result Card Modal */}
      <ResultCardModal
        isOpen={resultCardOpen}
        onClose={() => setResultCardOpen(false)}
        data={resultCardData}
      />
    </>
  );
}
