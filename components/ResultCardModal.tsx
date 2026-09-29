'use client';

import React, { useState } from 'react';
import { ResultCardData } from '@/lib/types';
import { renderResultCardToBlob } from '@/lib/resultCardRenderer';
import {
  X,
  Download,
  Copy,
  Share2,
  Check,
  Trophy,
  Flame,
  ShieldCheck,
  Sparkles,
  Link
} from 'lucide-react';

interface ResultCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ResultCardData;
}

export default function ResultCardModal({
  isOpen,
  onClose,
  data
}: ResultCardModalProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);

  if (!isOpen) return null;

  const shareText = `🎉 Winner: ${data.winner} (${data.challengeName}) | 🔥 ${data.streak}-Day Streak | Spin decision wheels at ${data.shareUrl}`;

  // 1. Download PNG Card
  const handleDownloadImage = async () => {
    try {
      setIsGenerating(true);
      const blob = await renderResultCardToBlob(data);
      if (!blob) throw new Error('Could not generate card image');

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `spinwheel-${data.winner.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-card.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setShareError('Failed to generate image file.');
    } finally {
      setIsGenerating(false);
    }
  };

  // 2. Copy Image directly to Clipboard
  const handleCopyImage = async () => {
    try {
      setIsGenerating(true);
      const blob = await renderResultCardToBlob(data);
      if (!blob) throw new Error('Could not render image');

      if (navigator.clipboard && typeof ClipboardItem !== 'undefined') {
        const item = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([item]);
        setCopiedImage(true);
        setTimeout(() => setCopiedImage(false), 2500);
      } else {
        // Fallback to text copy
        await navigator.clipboard.writeText(shareText);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      }
    } catch (err) {
      console.error(err);
      // Fallback
      await navigator.clipboard.writeText(shareText);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } finally {
      setIsGenerating(false);
    }
  };

  // 3. Web Share API
  const handleNativeShare = async () => {
    try {
      setIsGenerating(true);
      const blob = await renderResultCardToBlob(data);
      const filesArray = blob
        ? [new File([blob], 'spinwheel-result.png', { type: 'image/png' })]
        : [];

      if (navigator.canShare && navigator.canShare({ files: filesArray })) {
        await navigator.share({
          title: `Result: ${data.winner}`,
          text: shareText,
          url: data.shareUrl,
          files: filesArray
        });
      } else if (navigator.share) {
        await navigator.share({
          title: `Result: ${data.winner}`,
          text: shareText,
          url: data.shareUrl
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      }
    } catch (err) {
      // User cancelled share dialog or not supported
      if ((err as Error)?.name !== 'AbortError') {
        await navigator.clipboard.writeText(shareText);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyTextOnly = async () => {
    await navigator.clipboard.writeText(shareText);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white dark:bg-[#181922] rounded-3xl p-6 sm:p-7 border border-[#eeedf7] dark:border-[#292a39] shadow-2xl flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#4648d4] dark:text-[#8587ff]" />
            <h3 className="font-headline font-extrabold text-[20px] text-[#1a1b22] dark:text-[#f1effa]">
              Shareable Victory Card
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330] cursor-pointer"
            aria-label="Close share dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Graphical Live Preview */}
        <div className="w-full rounded-2xl bg-gradient-to-br from-[#0c0d14] via-[#131422] to-[#1b1c2e] p-6 text-white border border-slate-700/50 shadow-inner flex flex-col gap-4 relative overflow-hidden select-none">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand Bar */}
          <div className="flex items-center justify-between relative z-10">
            <span className="font-mono text-[12px] font-extrabold tracking-wider text-slate-300">
              SPINWHEELGAMES.ORG
            </span>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-semibold">
              <ShieldCheck className="w-3 h-3" />
              <span>WEB CRYPTO API</span>
            </div>
          </div>

          {/* Center Winner */}
          <div className="flex flex-col items-center text-center my-3 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-amber-400 mb-2 shadow-lg">
              <Trophy className="w-7 h-7" />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
              {data.challengeName}
            </span>
            <h4 className="font-headline font-black text-[26px] sm:text-[32px] text-white tracking-tight mt-1 max-w-full break-words">
              {data.winner}
            </h4>
            {data.score && (
              <span className="text-[13px] font-mono text-indigo-300 mt-0.5">
                Series Score: {data.score}
              </span>
            )}
          </div>

          {/* Stats Badges */}
          <div className="grid grid-cols-3 gap-2 relative z-10 pt-2 border-t border-slate-800">
            <div className="bg-white/5 rounded-xl p-2.5 text-center border border-white/5">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Streak</span>
              <span className="text-[13px] font-bold text-amber-400 flex items-center justify-center gap-1 mt-0.5">
                <Flame className="w-3.5 h-3.5 fill-current" />
                {data.streak} {data.streak === 1 ? 'Day' : 'Days'}
              </span>
            </div>

            <div className="bg-white/5 rounded-xl p-2.5 text-center border border-white/5">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Odds</span>
              <span className="text-[13px] font-bold text-emerald-400 mt-0.5 block">
                {data.oddsPercent}%
              </span>
            </div>

            <div className="bg-white/5 rounded-xl p-2.5 text-center border border-white/5">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Seed</span>
              <span className="text-[11px] font-mono text-indigo-300 mt-0.5 block truncate">
                {data.seed.substring(0, 10)}
              </span>
            </div>
          </div>

          {/* Modifier tag if active */}
          {data.modifier && (
            <div className="relative z-10 px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-between text-xs text-purple-200">
              <span className="font-bold flex items-center gap-1">
                <span>⚡ Twist Modifier:</span>
                <span className="text-white">{data.modifier.title}</span>
              </span>
              <span className="font-mono text-[10px] uppercase bg-purple-500/30 px-1.5 py-0.5 rounded">
                {data.modifier.tag}
              </span>
            </div>
          )}
        </div>

        {shareError && (
          <p className="text-xs text-red-500 text-center font-medium">{shareError}</p>
        )}

        {/* Action Buttons: Download, Copy Image, Share, Copy Link */}
        <div className="flex flex-col gap-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleDownloadImage}
              disabled={isGenerating}
              className="py-3 px-4 rounded-xl bg-[#4648d4] hover:bg-[#6063ee] text-white font-bold text-[13px] shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isGenerating ? 'Rendering...' : 'Download Image Card'}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyImage}
              disabled={isGenerating}
              className="py-3 px-4 rounded-xl bg-[#006c49] hover:bg-[#008259] text-white font-bold text-[13px] shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {copiedImage ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedImage ? 'Image Copied!' : 'Copy Image to Clipboard'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleNativeShare}
              className="py-2.5 px-4 rounded-xl border border-[#c7c4d7] dark:border-[#464554] text-[#1a1b22] dark:text-[#f1effa] hover:bg-[#f4f2fd] dark:hover:bg-[#222330] font-semibold text-[12px] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-[#4648d4] dark:text-[#8587ff]" />
              <span>Share (Mobile / App)</span>
            </button>

            <button
              type="button"
              onClick={handleCopyTextOnly}
              className="py-2.5 px-4 rounded-xl border border-[#c7c4d7] dark:border-[#464554] text-[#1a1b22] dark:text-[#f1effa] hover:bg-[#f4f2fd] dark:hover:bg-[#222330] font-semibold text-[12px] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-500" /> : <Link className="w-4 h-4 text-[#4648d4] dark:text-[#8587ff]" />}
              <span>{copiedLink ? 'Text Copied!' : 'Copy Text & Link'}</span>
            </button>
          </div>
        </div>

        <p className="text-[11px] text-[#767586] dark:text-[#908fa1] text-center">
          Browser-based cryptographic randomness (crypto.getRandomValues()). Zero tracking, zero ads.
        </p>
      </div>
    </div>
  );
}
