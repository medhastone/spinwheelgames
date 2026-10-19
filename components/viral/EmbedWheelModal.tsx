'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Code2, Copy, Check, X, ExternalLink, Tv, Sparkles, BookOpen } from 'lucide-react';
import { ViralToolConfig } from '@/lib/viralToolsData';

interface EmbedWheelModalProps {
  config: ViralToolConfig;
  onClose: () => void;
  onSwitchToStreamerMode?: () => void;
}

export default function EmbedWheelModal({
  config,
  onClose,
  onSwitchToStreamerMode
}: EmbedWheelModalProps) {
  const [includeCustomItems, setIncludeCustomItems] = useState(true);
  const [embedHeight, setEmbedHeight] = useState<number>(560);
  const [transparentBg, setTransparentBg] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : 'https://spinwheelgames.org';

  const cleanSlug =
    config.slug === 'home' || !config.slug
      ? 'wheel-of-names'
      : config.slug.replace(/^\/+|\/+$/g, '');

  const embedUrl = useMemo(() => {
    const base = `${origin}/embed/${cleanSlug}`;
    const params = new URLSearchParams();
    if (includeCustomItems && config.items.length >= 2) {
      params.set('title', config.title);
      params.set(
        'items',
        config.items
          .slice(0, 60)
          .map((i) => i.text)
          .join('|')
      );
      if (config.paletteKey && config.paletteKey !== 'arcade') {
        params.set('palette', config.paletteKey);
      }
    }
    if (transparentBg) {
      params.set('bg', 'transparent');
    }
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  }, [origin, cleanSlug, includeCustomItems, config.items, config.title, config.paletteKey, transparentBg]);

  const canonicalToolUrl = `https://spinwheelgames.org${
    config.canonicalPath === '/' ? '' : config.canonicalPath
  }`;

  const iframeSnippet = `<div style="width:100%;max-width:560px;margin:0 auto;font-family:system-ui,-apple-system,sans-serif;">
  <iframe src="${embedUrl}" width="100%" height="${embedHeight}" style="border:0;border-radius:16px;overflow:hidden;display:block;width:100%;" allow="fullscreen" loading="lazy" title="${config.title.replace(/"/g, '&quot;')} - SpinWheelGames.org"></iframe>
  <div style="text-align:center;margin-top:6px;font-size:12px;">
    <a href="${canonicalToolUrl}" target="_blank" rel="noopener noreferrer" style="color:#4648d4;text-decoration:none;font-weight:600;">Made with SpinWheelGames.org</a>
  </div>
</div>`;

  const handleCopySnippet = () => {
    navigator.clipboard?.writeText?.(iframeSnippet);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2200);
  };

  const handleCopyUrl = () => {
    navigator.clipboard?.writeText?.(embedUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2200);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="embed-wheel-modal-title"
    >
      <div className="relative w-full max-w-xl bg-white dark:bg-[#161722] rounded-3xl p-5 sm:p-6 border border-[#eeedf7] dark:border-[#292a39] shadow-2xl flex flex-col gap-4 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#eeedf7] dark:border-[#252636] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#4648d4]/10 dark:bg-[#4648d4]/20 text-[#4648d4] dark:text-[#8587ff]">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3
                id="embed-wheel-modal-title"
                className="font-headline font-bold text-base sm:text-lg text-[#1a1b22] dark:text-white"
              >
                Embed Interactive Wheel
              </h3>
              <p className="text-xs text-[#767586] dark:text-[#908fa1]">
                Responsive, lightweight &lt;iframe&gt; widget for blogs, Notion, LMS &amp; websites
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#222330] cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <label className="flex items-center gap-2 p-2.5 rounded-xl bg-[#f4f2fd] dark:bg-[#1d1e2b] border border-[#eeedf7] dark:border-[#292a39] text-xs font-semibold text-[#1a1b22] dark:text-[#f1effa] cursor-pointer">
            <input
              type="checkbox"
              checked={includeCustomItems}
              onChange={(e) => setIncludeCustomItems(e.target.checked)}
              className="rounded accent-[#4648d4]"
            />
            <span>Include current slices ({config.items.length})</span>
          </label>

          <label className="flex items-center gap-2 p-2.5 rounded-xl bg-[#f4f2fd] dark:bg-[#1d1e2b] border border-[#eeedf7] dark:border-[#292a39] text-xs font-semibold text-[#1a1b22] dark:text-[#f1effa] cursor-pointer">
            <input
              type="checkbox"
              checked={transparentBg}
              onChange={(e) => setTransparentBg(e.target.checked)}
              className="rounded accent-[#4648d4]"
            />
            <span>Transparent canvas</span>
          </label>

          <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[#f4f2fd] dark:bg-[#1d1e2b] border border-[#eeedf7] dark:border-[#292a39] text-xs font-semibold text-[#1a1b22] dark:text-[#f1effa]">
            <span>Height:</span>
            <select
              value={embedHeight}
              onChange={(e) => setEmbedHeight(Number(e.target.value))}
              className="bg-white dark:bg-[#12131a] border border-[#c7c4d7] dark:border-[#35374a] rounded-lg px-2 py-0.5 text-xs font-bold cursor-pointer"
            >
              <option value={500}>500px (Compact)</option>
              <option value={560}>560px (Standard)</option>
              <option value={640}>640px (Large)</option>
            </select>
          </div>
        </div>

        {/* Direct /embed/<tool> Route URL */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#464554] dark:text-[#c7c4d7]">
              Minimal JS Embed Route (/embed/{cleanSlug}):
            </span>
            <a
              href={embedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#4648d4] dark:text-[#8587ff] hover:underline inline-flex items-center gap-1"
            >
              <span>Open Live Preview</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={embedUrl}
              className="flex-1 px-3 py-2 rounded-xl bg-[#f4f2fd] dark:bg-[#11121a] border border-[#eeedf7] dark:border-[#292a39] text-xs font-mono text-[#1a1b22] dark:text-[#f1effa] select-all focus:outline-none"
            />
            <button
              type="button"
              onClick={handleCopyUrl}
              className="px-3.5 py-2 rounded-xl border border-[#c7c4d7] dark:border-[#393b4e] text-xs font-bold text-[#1a1b22] dark:text-white hover:bg-[#f4f2fd] dark:hover:bg-[#222330] flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedUrl ? 'Copied' : 'Copy URL'}</span>
            </button>
          </div>
        </div>

        {/* HTML <iframe> Snippet with Backlink */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-bold text-[#464554] dark:text-[#c7c4d7]">
            Responsive &lt;iframe&gt; Code (with &ldquo;Made with SpinWheelGames.org&rdquo; backlink):
          </span>
          <textarea
            readOnly
            rows={5}
            value={iframeSnippet}
            className="w-full p-3 rounded-xl bg-[#f4f2fd] dark:bg-[#11121a] border border-[#eeedf7] dark:border-[#292a39] text-[11px] font-mono text-[#1a1b22] dark:text-[#f1effa] select-all focus:outline-none leading-relaxed"
          />
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#eeedf7] dark:border-[#252636]">
          <div className="flex flex-wrap items-center gap-2">
            {onSwitchToStreamerMode ? (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSwitchToStreamerMode();
                }}
                className="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Tv className="w-4 h-4" />
                <span>OBS Streamer Mode (?stream=1)</span>
              </button>
            ) : (
              <span className="text-[11px] text-[#767586] dark:text-[#908fa1] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#4648d4]" />
                <span>Zero tracking • Fast edge load</span>
              </span>
            )}
            <Link
              href="/stream-wheel"
              onClick={onClose}
              className="px-3 py-2 rounded-xl bg-[#f4f2fd] dark:bg-[#1d1e2b] hover:bg-[#4648d4]/15 text-[#4648d4] dark:text-[#8587ff] text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Streamer Guide</span>
            </Link>
          </div>

          <button
            type="button"
            onClick={handleCopySnippet}
            className="px-5 py-2.5 rounded-xl bg-[#4648d4] hover:bg-[#6063ee] text-white text-xs font-extrabold flex items-center gap-2 shadow-md transition-all cursor-pointer ml-auto"
          >
            {copiedHtml ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copiedHtml ? 'Iframe Code Copied!' : 'Copy Embed Code'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
