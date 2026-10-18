'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { resolveToolWheelConfig } from '@/lib/viralToolsData';

interface MinimalEmbedWheelProps {
  toolSlug: string;
}

function getCryptoFloat(): number {
  if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0] / (0xffffffff + 1);
  }
  return Math.random();
}

function playLightTick(enabled: boolean) {
  if (!enabled || typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(580, ctx.currentTime);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.04);
    setTimeout(() => ctx.close().catch(() => {}), 80);
  } catch {
    // Ignore audio errors
  }
}

export default function MinimalEmbedWheel({ toolSlug }: MinimalEmbedWheelProps) {
  const initialConfig = useMemo(() => resolveToolWheelConfig(toolSlug), [toolSlug]);

  const [title, setTitle] = useState(initialConfig.title);
  const [items, setItems] = useState(initialConfig.items);
  const [defaultItems, setDefaultItems] = useState(initialConfig.items);
  const [palette, setPalette] = useState(initialConfig.palette);
  const [canonicalPath, setCanonicalPath] = useState(initialConfig.canonicalPath);

  const [isStreamMode, setIsStreamMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<{ id: string; text: string } | null>(null);

  const rotationRef = useRef(0);
  const animRef = useRef<number | null>(null);
  const lastSliceRef = useRef(-1);

  // Sync URL query customizations on client mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sp = new URLSearchParams(window.location.search);
    const stream = sp.get('stream') === '1' || sp.get('bg') === 'transparent';
    setIsStreamMode(stream);

    if (stream) {
      document.documentElement.classList.add('streamer-mode');
      document.body.classList.add('streamer-mode');
    }

    const resolved = resolveToolWheelConfig(toolSlug, {
      title: sp.get('title'),
      items: sp.get('items'),
      palette: sp.get('palette'),
      c: sp.get('c'),
      data: sp.get('data')
    });

    setTitle(resolved.title);
    setItems(resolved.items);
    setDefaultItems(resolved.items);
    setPalette(resolved.palette);
    setCanonicalPath(resolved.canonicalPath);

    return () => {
      document.documentElement.classList.remove('streamer-mode');
      document.body.classList.remove('streamer-mode');
    };
  }, [toolSlug]);

  const slices = useMemo(() => {
    const count = items.length;
    if (count === 0) return [];
    const sliceAngle = 360 / count;
    const cx = 220;
    const cy = 220;
    const r = 200;

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
      const textDist = 132;
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
        color: item.color || palette[idx % palette.length]
      };
    });
  }, [items, palette]);

  const triggerSpin = useCallback(() => {
    if (isSpinning || items.length < 2) return;
    setIsSpinning(true);
    setWinner(null);

    const winIndex = Math.floor(getCryptoFloat() * items.length);
    const targetSlice = slices[winIndex] || slices[0];
    const jitter =
      targetSlice.startAngle +
      targetSlice.sliceAngle * (0.2 + getCryptoFloat() * 0.6);

    const startRot = rotationRef.current;
    const normStart = ((startRot % 360) + 360) % 360;
    const targetMod = ((270 - jitter) % 360 + 360) % 360;
    let delta = targetMod - normStart;
    if (delta <= 0) delta += 360;

    const extraTurns = (6 + Math.floor(getCryptoFloat() * 3)) * 360;
    const totalDelta = extraTurns + delta;
    const durationMs = 4500;
    const startTime = performance.now();

    lastSliceRef.current = -1;

    const step = (now: number) => {
      const t = Math.min(1, (now - startTime) / durationMs);
      const eased = 1 - Math.pow(1 - t, 4.4);
      const curRot = startRot + totalDelta * eased;
      rotationRef.current = curRot;
      setRotation(curRot);

      const pointerAngle = (270 - (curRot % 360) + 720) % 360;
      const curSliceIdx = Math.floor(pointerAngle / (360 / items.length));
      if (curSliceIdx !== lastSliceRef.current) {
        lastSliceRef.current = curSliceIdx;
        playLightTick(soundEnabled);
      }

      if (t < 1) {
        animRef.current = requestAnimationFrame(step);
      } else {
        setIsSpinning(false);
        setWinner(targetSlice.item);
      }
    };

    animRef.current = requestAnimationFrame(step);
  }, [isSpinning, items.length, slices, soundEnabled]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === 'Enter' || e.key.toLowerCase() === 's') {
        e.preventDefault();
        triggerSpin();
      } else if (e.key.toLowerCase() === 'r') {
        setItems(defaultItems);
        setWinner(null);
      } else if (e.key.toLowerCase() === 'e' && winner && items.length > 2) {
        setItems((prev) => prev.filter((i) => i.id !== winner.id));
        setWinner(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [triggerSpin, defaultItems, winner, items.length]);

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const backlinkUrl = `https://spinwheelgames.org${canonicalPath === '/' ? '' : canonicalPath}`;

  return (
    <div
      className={`w-full min-h-screen flex flex-col items-center justify-between p-3 sm:p-4 select-none ${
        isStreamMode
          ? 'bg-transparent text-white'
          : 'bg-[#fbf8ff] dark:bg-[#0f1017] text-[#1a1b22] dark:text-[#f1effa]'
      }`}
    >
      {/* Top Minimal Header */}
      <div className="w-full max-w-[540px] flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h1
            className={`font-bold truncate ${
              isStreamMode
                ? 'text-xl sm:text-2xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]'
                : 'text-sm sm:text-base text-[#1a1b22] dark:text-white'
            }`}
          >
            {title}
          </h1>
          <p
            className={`text-[11px] ${
              isStreamMode
                ? 'text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]'
                : 'text-[#767586] dark:text-[#908fa1]'
            }`}
          >
            {items.length} slices • Press Space or Click to Spin
          </p>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setSoundEnabled((v) => !v)}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold border border-[#eeedf7] dark:border-[#292a39] bg-white/90 dark:bg-[#181922]/90 text-[#1a1b22] dark:text-white cursor-pointer"
            title="Toggle sound"
          >
            {soundEnabled ? '🔊 On' : '🔇 Mute'}
          </button>
          <button
            type="button"
            onClick={() => {
              setItems(defaultItems);
              setWinner(null);
            }}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold border border-[#eeedf7] dark:border-[#292a39] bg-white/90 dark:bg-[#181922]/90 text-[#1a1b22] dark:text-white cursor-pointer"
            title="Reset wheel"
          >
            ↺ Reset
          </button>
        </div>
      </div>

      {/* Center Responsive Wheel Stage */}
      <div className="relative w-full max-w-[min(86vw,72vh,440px)] aspect-square flex items-center justify-center my-1">
        <svg viewBox="0 0 440 440" className="w-full h-full drop-shadow-xl overflow-visible">
          <g transform={`rotate(${rotation}, 220, 220)`}>
            {slices.map((s) => {
              const label =
                s.item.text.length > 18 ? s.item.text.slice(0, 17) + '…' : s.item.text;
              return (
                <g key={s.item.id || s.idx}>
                  <path
                    d={s.pathData}
                    fill={s.color}
                    stroke="#ffffff"
                    strokeWidth={items.length > 30 ? '1' : '1.75'}
                  />
                  {items.length <= 60 && (
                    <text
                      x={s.tx}
                      y={s.ty}
                      transform={`rotate(${s.midAngle}, ${s.tx}, ${s.ty})`}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#ffffff"
                      fontWeight="800"
                      fontSize={
                        isStreamMode
                          ? items.length > 20
                            ? '13'
                            : '16'
                          : items.length > 24
                          ? '10.5'
                          : '13.5'
                      }
                      style={{
                        paintOrder: 'stroke fill',
                        stroke: 'rgba(0,0,0,0.65)',
                        strokeWidth: isStreamMode ? '3.5px' : '2.5px'
                      }}
                    >
                      {label}
                    </text>
                  )}
                </g>
              );
            })}
            <circle
              cx="220"
              cy="220"
              r="200"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3"
              strokeOpacity="0.5"
            />
          </g>

          {/* Outer Rim */}
          <circle
            cx="220"
            cy="220"
            r="203"
            fill="none"
            stroke="#222330"
            strokeWidth="7"
          />

          {/* Center Spin Hub */}
          <g
            role="button"
            tabIndex={0}
            aria-label="Spin the wheel"
            onClick={triggerSpin}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                triggerSpin();
              }
            }}
            className="cursor-pointer"
          >
            <circle cx="220" cy="220" r="40" fill="#ffffff" />
            <circle cx="220" cy="220" r="34" fill="#4648d4" />
            <text
              x="220"
              y="220"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#ffffff"
              fontWeight="900"
              fontSize="13"
              letterSpacing="0.06em"
            >
              {isSpinning ? '•••' : 'SPIN'}
            </text>
          </g>

          {/* Top Pointer */}
          <g transform="translate(220, 18)">
            <path
              d="M -12 -12 L 12 -12 L 0 24 Z"
              fill="#ff2d55"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </g>
        </svg>

        {/* Winner Banner Overlay */}
        {winner && (
          <div className="absolute inset-x-3 bottom-3 bg-[#12131a]/95 text-white rounded-2xl p-3.5 border border-[#4648d4] shadow-2xl flex flex-col items-center gap-2 text-center animate-fadeIn">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8587ff]">
              Selected Winner
            </span>
            <p className="text-lg sm:text-xl font-black leading-tight break-words">
              {winner.text}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={triggerSpin}
                className="px-3.5 py-1.5 rounded-xl bg-[#4648d4] hover:bg-[#6063ee] text-white text-xs font-bold cursor-pointer"
              >
                Spin Again
              </button>
              {items.length > 2 && (
                <button
                  type="button"
                  onClick={() => {
                    setItems((prev) => prev.filter((i) => i.id !== winner.id));
                    setWinner(null);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
                >
                  Remove Winner
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action + Required "Made with SpinWheelGames.org" Backlink */}
      <div className="w-full max-w-[540px] flex items-center justify-between gap-2 pt-1">
        <button
          type="button"
          onClick={triggerSpin}
          disabled={isSpinning || items.length < 2}
          className="px-4 py-1.5 rounded-xl bg-[#4648d4] hover:bg-[#6063ee] disabled:opacity-50 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
        >
          {isSpinning ? 'Spinning...' : 'Spin Wheel (Space)'}
        </button>

        <a
          href={backlinkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-[11px] font-semibold hover:underline flex items-center gap-1 ${
            isStreamMode
              ? 'text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]'
              : 'text-[#4648d4] dark:text-[#8587ff]'
          }`}
        >
          <span>Made with SpinWheelGames.org</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
