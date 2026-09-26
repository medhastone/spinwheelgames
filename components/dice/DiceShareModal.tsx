'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { X, Copy, Share2, Check, Download, Dice5, Sparkles } from 'lucide-react';
import { RollResult } from './diceMath';

interface DiceShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: RollResult | null;
}

export default function DiceShareModal({ isOpen, onClose, result }: DiceShareModalProps) {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !result) return null;

  const shareText = `🎲 I rolled ${result.notation} on SpinWheelGames and got ${result.total}! (${result.dice.map((d) => (d.isDropped ? `[${d.value}]` : `${d.value}`)).join(' • ')}) https://spinwheelgames.org/dice-roller`;

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${result.notation} Dice Roll Result | SpinWheelGames`,
          text: `🎲 I rolled ${result.notation} and got a total of ${result.total}!`,
          url: 'https://spinwheelgames.org/dice-roller'
        });
      } catch {
        handleCopyText();
      }
    } else {
      handleCopyText();
    }
  };

  // Generate downloadable image using HTML5 Canvas
  const handleDownloadImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1080);
    bgGrad.addColorStop(0, '#0c0d14');
    bgGrad.addColorStop(0.5, '#161726');
    bgGrad.addColorStop(1, '#1e1b4b');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1080, 1080);

    // Decorative ambient glow
    const radial = ctx.createRadialGradient(540, 480, 50, 540, 480, 500);
    radial.addColorStop(0, 'rgba(70, 72, 212, 0.35)');
    radial.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, 1080, 1080);

    // Border
    ctx.strokeStyle = '#292a39';
    ctx.lineWidth = 12;
    ctx.strokeRect(40, 40, 1000, 1000);

    // Brand Title
    ctx.font = 'bold 38px "Inter", system-ui, sans-serif';
    ctx.fillStyle = '#8587ff';
    ctx.textAlign = 'center';
    ctx.fillText('🎲 SPINWHEELGAMES.ORG', 540, 140);

    // Roll Title
    ctx.font = '900 68px "Inter", system-ui, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${result.notation.toUpperCase()} ROLL RESULT`, 540, 240);

    // Total Score Box
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.roundRect(140, 310, 800, 320, 32);
    ctx.fill();
    ctx.strokeStyle = 'rgba(133, 135, 255, 0.3)';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.font = '600 32px "Inter", system-ui, sans-serif';
    ctx.fillStyle = '#908fa1';
    ctx.fillText('TOTAL SCORE', 540, 390);

    ctx.font = '900 160px "Inter", system-ui, sans-serif';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(`${result.total}`, 540, 540);

    // Individual dice list
    ctx.font = 'bold 44px "Inter", system-ui, sans-serif';
    ctx.fillStyle = '#e2e8f0';
    const diceStr = result.dice
      .map((d) => (d.isDropped ? `[${d.value}]` : `${d.value}`))
      .join('  •  ');
    ctx.fillText(diceStr, 540, 720);

    // Average & Range stats
    ctx.font = '500 30px "Inter", system-ui, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`Average: ${result.average.toFixed(2)}   |   Possible Range: ${result.minPossible} – ${result.maxPossible}`, 540, 800);

    // Footer Link
    ctx.font = 'bold 28px "Inter", system-ui, sans-serif';
    ctx.fillStyle = '#818cf8';
    ctx.fillText('Free 3D Dice Roller • SpinWheelGames.org', 540, 960);

    // Trigger download
    const link = document.createElement('a');
    link.download = `dice-roll-${result.notation}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#181922] border border-[#292a39] rounded-3xl p-6 sm:p-8 shadow-2xl text-white space-y-6">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close share dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#4648d4]/20 text-[#8587ff]">
            <Dice5 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-headline font-extrabold text-xl">Share Roll Result</h3>
            <p className="text-xs text-slate-400">Share your 3D dice outcome with teammates and friends</p>
          </div>
        </div>

        {/* Visual Social Card Preview */}
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#12131a] via-[#1a1b2a] to-[#1e1b4b] border border-[#313348] p-6 text-center space-y-4 shadow-xl"
        >
          <div className="text-[11px] font-mono tracking-widest text-[#8587ff] uppercase">
            🎲 SpinWheelGames.org
          </div>

          <div className="text-sm font-bold uppercase tracking-wider text-slate-300">
            {result.notation} Roll Result
          </div>

          <div className="py-2">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Total
            </div>
            <div className="font-headline text-6xl font-black text-amber-400 drop-shadow-[0_0_24px_rgba(251,191,36,0.35)]">
              {result.total}
            </div>
          </div>

          {/* Individual dice pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {result.dice.map((d, i) => (
              <span
                key={i}
                className={`px-3 py-1 rounded-xl text-sm font-bold font-mono border ${
                  d.isDropped
                    ? 'opacity-40 line-through bg-slate-800 text-slate-400 border-slate-700'
                    : 'bg-white/10 text-white border-white/20'
                }`}
              >
                {d.value}
              </span>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 px-2">
            <span>Average: <strong className="text-slate-200">{result.average.toFixed(2)}</strong></span>
            <span>Range: <strong className="text-slate-200">{result.minPossible} – {result.maxPossible}</strong></span>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={handleCopyText}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Link!' : 'Copy Summary'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadImage}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs border border-amber-500/30 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Save Card Image</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handleNativeShare}
          className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#4648d4] hover:bg-[#3b3dbb] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          <span>Share Roll to Social Media</span>
        </button>
      </div>
    </div>
  );
}
