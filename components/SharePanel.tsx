'use client';

import React, { useState, useEffect } from 'react';
import { WheelConfig } from '@/lib/types';
import { Share2, X, Disc, Check, Copy, Code2 } from 'lucide-react';
import { getShortShareUrl } from '@/lib/shortener';

interface SharePanelProps {
  wheel: WheelConfig;
  onClose: () => void;
}

export default function SharePanel({ wheel, onClose }: SharePanelProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [shareUrl, setShareUrl] = useState<string>('');

  const baseUrl = typeof window !== 'undefined'
    ? window.location.origin
    : 'https://spinwheelgames.org';

  useEffect(() => {
    let isMounted = true;
    getShortShareUrl(wheel).then((url) => {
      if (isMounted) setShareUrl(url);
    });
    return () => {
      isMounted = false;
    };
  }, [wheel]);

  const effectiveShareUrl = shareUrl || `${baseUrl}/`;
  const embedCode = `<iframe src="${effectiveShareUrl}" width="100%" height="650" frameborder="0" style="border:0; border-radius: 16px; overflow:hidden;" allow="fullscreen"></iframe>`;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.(effectiveShareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyEmbed = () => {
    navigator.clipboard?.writeText?.(embedCode);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#181922] rounded-3xl p-6 sm:p-7 border border-[#eeedf7] dark:border-[#292a39] shadow-2xl flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-[#4648d4] dark:text-[#8587ff]" />
            <h3 className="font-headline font-bold text-[18px] text-[#1a1b22] dark:text-[#f1effa]">
              Share & Embed Wheel
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wheel Summary */}
        <div className="p-3.5 rounded-2xl bg-[#f4f2fd] dark:bg-[#1d1e28] border border-[#eeedf7] dark:border-[#292a39] flex items-center gap-3">
          <Disc className="w-6 h-6 text-[#4648d4] dark:text-[#8587ff] shrink-0" />
          <div className="min-w-0">
            <h4 className="font-bold text-[14px] text-[#1a1b22] dark:text-[#f1effa] truncate">
              {wheel.title}
            </h4>
            <span className="text-[12px] text-[#767586] dark:text-[#908fa1]">
              {wheel.items.length} options ready to spin
            </span>
          </div>
        </div>

        {/* Direct Link Section */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-semibold text-[#464554] dark:text-[#c7c4d7]">
            Shareable Web Link:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={effectiveShareUrl}
              className="flex-1 px-3 py-2 rounded-xl bg-[#f4f2fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] text-[12px] font-mono text-[#1a1b22] dark:text-[#f1effa] select-all focus:outline-none"
            />
            <button
              type="button"
              onClick={handleCopyLink}
              className="px-4 py-2 rounded-xl bg-[#4648d4] hover:bg-[#6063ee] text-white text-[12px] font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </div>

        {/* Embed Code Section */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-semibold text-[#464554] dark:text-[#c7c4d7]">
            Responsive HTML Embed Code (for blogs, LMS, or classroom sites):
          </label>
          <textarea
            readOnly
            rows={3}
            value={embedCode}
            className="w-full p-2.5 rounded-xl bg-[#f4f2fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] text-[11px] font-mono text-[#1a1b22] dark:text-[#f1effa] select-all focus:outline-none"
          />
          <button
            type="button"
            onClick={handleCopyEmbed}
            className="self-end px-3 py-1.5 rounded-lg border border-[#c7c4d7] dark:border-[#464554] text-[12px] font-semibold text-[#1a1b22] dark:text-[#f1effa] hover:bg-[#f4f2fd] dark:hover:bg-[#222330] flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {copiedEmbed ? <Check className="w-4 h-4 text-emerald-600" /> : <Code2 className="w-4 h-4" />}
            <span>{copiedEmbed ? 'Embed Code Copied!' : 'Copy Embed Code'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
