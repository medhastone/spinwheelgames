'use client';

import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { WheelItem } from '@/lib/types';
import { playTickSound } from '@/lib/sound';
import { selectWeightedWinner } from '@/lib/random';

interface WheelCanvasProps {
  items: WheelItem[];
  palette: string[];
  isSpinning: boolean;
  onSpinStart: () => void;
  onSpinEnd: (winner: WheelItem) => void;
  onCenterClick?: () => void;
  duration?: number; // duration in seconds (2 to 15)
  soundEnabled?: boolean;
  soundPack?: string;
  volume?: number;
  mysteryMode?: boolean;
  isFullscreen?: boolean;
  className?: string;
  preSelectedWinner?: {
    winner: WheelItem;
    winnerIndex: number;
    seed: string;
    oddsPercent: string;
  } | null;
}

export default function WheelCanvas({
  items,
  palette,
  isSpinning,
  onSpinStart,
  onSpinEnd,
  onCenterClick,
  duration = 6,
  soundEnabled = true,
  soundPack = 'carnival',
  volume = 0.8,
  mysteryMode = false,
  isFullscreen = false,
  className = '',
  preSelectedWinner
}: WheelCanvasProps) {
  const rotationRef = useRef<number>(0);
  const [currentRotation, setCurrentRotation] = useState<number>(0);
  const [needleDeflection, setNeedleDeflection] = useState<number>(0);

  const animFrameRef = useRef<number | null>(null);
  const isSpinningActiveRef = useRef<boolean>(false);
  const lastTickSliceRef = useRef<number>(-1);

  // Keep mutable references to prevent mid-spin cancellations/restarts
  const onSpinEndRef = useRef(onSpinEnd);
  const soundSettingsRef = useRef({ soundEnabled, soundPack, volume });
  const durationRef = useRef(duration);
  const itemsRef = useRef(items);
  const preSelectedWinnerRef = useRef(preSelectedWinner);

  const totalWeight = useMemo(() => {
    return items.reduce((sum, item) => sum + Math.max(0.001, item.weight || 1), 0);
  }, [items]);

  // Compute slice geometry
  const slices = useMemo(() => {
    let accumulatedAngle = 0;
    const count = items.length;
    const result = [];

    for (let idx = 0; idx < count; idx++) {
      const item = items[idx];
      const weight = Math.max(0.001, item.weight || 1);
      const sliceAngle = (weight / totalWeight) * 360;
      const startAngle = accumulatedAngle;
      const endAngle = accumulatedAngle + sliceAngle;
      const midAngle = startAngle + sliceAngle / 2;
      accumulatedAngle = endAngle;

      const color = item.color || palette[idx % palette.length];

      const round = (val: number) => Number(val.toFixed(4));

      // Geometry for SVG path (radius 200, center 220, 220)
      const r = 200;
      const cx = 220;
      const cy = 220;

      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;

      const x1 = round(cx + r * Math.cos(startRad));
      const y1 = round(cy + r * Math.sin(startRad));
      const x2 = round(cx + r * Math.cos(endRad));
      const y2 = round(cy + r * Math.sin(endRad));

      const largeArc = sliceAngle > 180 ? 1 : 0;
      const pathData = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;

      // Peg coordinate at edge
      const pegRad = (startAngle * Math.PI) / 180;
      const pegR = r - 6;
      const pegX = round(cx + pegR * Math.cos(pegRad));
      const pegY = round(cy + pegR * Math.sin(pegRad));

      result.push({
        item,
        index: idx,
        color,
        startAngle,
        endAngle,
        sliceAngle,
        midAngle,
        pathData,
        pegX,
        pegY,
        odds: ((weight / totalWeight) * 100).toFixed(1)
      });
    }

    return result;
  }, [items, totalWeight, palette]);

  const slicesRef = useRef(slices);

  useEffect(() => {
    onSpinEndRef.current = onSpinEnd;
    soundSettingsRef.current = { soundEnabled, soundPack, volume };
    durationRef.current = duration;
    itemsRef.current = items;
    preSelectedWinnerRef.current = preSelectedWinner;
    slicesRef.current = slices;
  }, [onSpinEnd, soundEnabled, soundPack, volume, duration, items, preSelectedWinner, slices]);

  // Find slice currently under top pointer (270 degrees in SVG coordinates)
  const getSliceAtPointer = useCallback((rotationDeg: number) => {
    const curSlices = slicesRef.current;
    if (!curSlices || curSlices.length === 0) return 0;
    const normalizedAngle = (270 - (rotationDeg % 360) + 720) % 360;
    for (let i = 0; i < curSlices.length; i++) {
      const s = curSlices[i];
      if (normalizedAngle >= s.startAngle && normalizedAngle < s.endAngle) {
        return i;
      }
    }
    return 0;
  }, []);

  // Handle spin execution when isSpinning flips to true
  useEffect(() => {
    if (!isSpinning) {
      isSpinningActiveRef.current = false;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      return;
    }

    // If already actively spinning this cycle, do not restart
    if (isSpinningActiveRef.current) return;

    const curSlices = slicesRef.current;
    const curItems = itemsRef.current;
    if (!curSlices || curSlices.length === 0 || !curItems || curItems.length === 0) {
      return;
    }

    isSpinningActiveRef.current = true;

    // Use passed preSelectedWinner or generate fresh random selection on the spot
    const activeWinnerData =
      preSelectedWinnerRef.current && preSelectedWinnerRef.current.winner
        ? preSelectedWinnerRef.current
        : selectWeightedWinner(curItems);

    const matchIdx = curSlices.findIndex((s) => s.item.id === activeWinnerData.winner.id);
    const winnerIndex = matchIdx >= 0 ? matchIdx : Math.min(activeWinnerData.winnerIndex, curSlices.length - 1);
    const targetSlice = curSlices[winnerIndex] || curSlices[0];
    const winnerItem = targetSlice ? targetSlice.item : activeWinnerData.winner;

    // Pick random jitter within slice arc (18% to 82%) to avoid boundary lines
    const minJitter = targetSlice.startAngle + targetSlice.sliceAngle * 0.18;
    const maxJitter = targetSlice.startAngle + targetSlice.sliceAngle * 0.82;
    const jitterAngle = minJitter + Math.random() * (maxJitter - minJitter);

    // Pointer is at 270 deg.
    // Target rotation formula: (270 - jitterAngle) mod 360
    const startRot = rotationRef.current;
    const normalizedStart = ((startRot % 360) + 360) % 360;
    const targetMod = ((270 - jitterAngle) % 360 + 360) % 360;

    let delta = targetMod - normalizedStart;
    if (delta <= 0) {
      delta += 360;
    }

    const fullTurns = 6 + Math.floor(Math.random() * 4); // 6 to 9 full turns
    const totalAddedRotation = fullTurns * 360 + delta;
    const endRot = startRot + totalAddedRotation;

    const startTime = performance.now();
    const durationMs = Math.max(2000, durationRef.current * 1000);

    // Quintic deceleration curve for genuine physical spin deceleration
    function easeOutQuint(t: number): number {
      return 1 - Math.pow(1 - t, 4.6);
    }

    lastTickSliceRef.current = -1;

    function animate(currentTime: number) {
      if (!isSpinningActiveRef.current) return;

      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      const easedProgress = easeOutQuint(progress);

      const newRotation = startRot + totalAddedRotation * easedProgress;
      rotationRef.current = newRotation;
      setCurrentRotation(newRotation);

      // Tick sound and pointer needle deflection
      const currentSliceIdx = getSliceAtPointer(newRotation);
      if (currentSliceIdx !== lastTickSliceRef.current) {
        lastTickSliceRef.current = currentSliceIdx;
        const { soundEnabled: snd, soundPack: pck, volume: vol } = soundSettingsRef.current;
        playTickSound(snd, pck, vol);
        // Deflect pointer needle momentarily
        setNeedleDeflection(progress < 0.8 ? -16 : -8);
        setTimeout(() => setNeedleDeflection(0), 40);
      }

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        isSpinningActiveRef.current = false;
        animFrameRef.current = null;
        rotationRef.current = endRot;
        setCurrentRotation(endRot);
        setNeedleDeflection(0);
        onSpinEndRef.current(winnerItem);
      }
    }

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      // Cleanup if unmounted while spinning
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [isSpinning, getSliceAtPointer]);

  // Clean text label for display
  const truncateText = (text: string, maxLen = 18) => {
    if (text.length <= maxLen) return text;
    return text.substring(0, maxLen - 1) + '…';
  };

  const isHighDensity = items.length > 36;
  const isExtremeDensity = items.length > 70;

  const lastTapTimeRef = useRef<number>(0);

  const handleHubClick = useCallback(
    (e?: React.MouseEvent | React.TouchEvent) => {
      const now = Date.now();
      if (now - lastTapTimeRef.current < 400) {
        return; // Prevent duplicate rapid touch-to-click bounce
      }
      lastTapTimeRef.current = now;

      if (e && 'stopPropagation' in e) {
        e.stopPropagation();
      }
      if (isSpinning || items.length < 2) return;
      if (onCenterClick) {
        onCenterClick();
      } else {
        onSpinStart();
      }
    },
    [isSpinning, items.length, onCenterClick, onSpinStart]
  );

  return (
    <div
      className={`relative w-full aspect-square mx-auto flex items-center justify-center select-none transition-all duration-300 touch-manipulation ${
        className
          ? className
          : isFullscreen
          ? 'max-w-[min(94vw,86vh,840px)]'
          : 'w-full max-w-[min(88vw,360px)] sm:max-w-[420px] lg:max-w-[480px] xl:max-w-[520px]'
      }`}
    >
      {/* Outer ambient glow and decorative rim */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#4648d4]/15 via-transparent to-[#6063ee]/15 blur-xl pointer-events-none" />

      {/* Main SVG Wheel Container */}
      <div className="relative w-full h-full p-2">
        <svg
          viewBox="0 0 440 440"
          className="w-full h-full drop-shadow-2xl overflow-visible"
        >
          <defs>
            {/* Outer metallic bevel gradient */}
            <radialGradient id="rimGradient" cx="50%" cy="50%" r="50%">
              <stop offset="90%" stopColor="#222330" stopOpacity="0.85" />
              <stop offset="96%" stopColor="#4648d4" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#12131a" stopOpacity="1" />
            </radialGradient>

            {/* Inner shadow filter */}
            <filter id="hubShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* Wheel Disc Group (Rotates) */}
          <g transform={`rotate(${currentRotation}, 220, 220)`}>
            {/* Slices or Empty State Graphic */}
            {slices.length === 0 ? (
              <g>
                <circle
                  cx="220"
                  cy="220"
                  r="200"
                  fill="#f4f2fd"
                  stroke="#c7c4d7"
                  strokeWidth="2.5"
                  strokeDasharray="8 8"
                  className="dark:fill-[#1e1f2b] dark:stroke-[#3b3d4f]"
                />
                <text
                  x="220"
                  y="205"
                  textAnchor="middle"
                  fill="#4648d4"
                  className="dark:fill-[#8587ff]"
                  fontSize="16"
                  fontWeight="700"
                >
                  Wheel is Empty
                </text>
                <text
                  x="220"
                  y="235"
                  textAnchor="middle"
                  fill="#767586"
                  className="dark:fill-[#a09eaf]"
                  fontSize="12"
                  fontWeight="500"
                >
                  Add options in Entries tab
                </text>
              </g>
            ) : (
              slices.map((slice) => {
              const labelText = mysteryMode
                ? '❓ ???'
                : truncateText(slice.item.text, isHighDensity ? 12 : 20);

              // Calculate text orientation along the radial radius
              // Vector from center (220, 220) along midAngle
              const textRad = (slice.midAngle * Math.PI) / 180;
              const textDist = isHighDensity ? 140 : 135;
              const tx = Number((220 + textDist * Math.cos(textRad)).toFixed(4));
              const ty = Number((220 + textDist * Math.sin(textRad)).toFixed(4));
              const textRotation = Number(slice.midAngle.toFixed(4));

              return (
                <g key={slice.item.id || slice.index} className="transition-opacity">
                  <path
                    d={slice.pathData}
                    fill={slice.color}
                    stroke="#ffffff"
                    strokeWidth={isHighDensity ? '0.75' : '1.5'}
                    strokeLinejoin="round"
                    className="hover:brightness-105 transition-all"
                  />

                  {/* Slice Text Label (unless extreme density) */}
                  {!isExtremeDensity && (
                    <text
                      x={tx}
                      y={ty}
                      transform={`rotate(${textRotation}, ${tx}, ${ty})`}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#ffffff"
                      fontWeight="700"
                      fontSize={
                        isHighDensity
                          ? '10'
                          : slice.sliceAngle < 14
                          ? '11'
                          : slice.sliceAngle < 22
                          ? '12'
                          : '14'
                      }
                      style={{
                        paintOrder: 'stroke fill',
                        stroke: 'rgba(0, 0, 0, 0.45)',
                        strokeWidth: '2.5px',
                        letterSpacing: '-0.02em',
                        fontFamily: 'Inter, system-ui, sans-serif'
                      }}
                    >
                      {labelText}
                    </text>
                  )}

                  {/* Rim Peg */}
                  {slices.length <= 48 && (
                    <circle
                      cx={slice.pegX}
                      cy={slice.pegY}
                      r="3.5"
                      fill="#ffffff"
                      stroke="#1e1f29"
                      strokeWidth="1.2"
                      filter="drop-shadow(0 1px 2px rgba(0,0,0,0.5))"
                    />
                  )}
                </g>
              );
            }))}

            {/* Inner Ring Divider */}
            <circle
              cx="220"
              cy="220"
              r="200"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeOpacity="0.4"
            />
          </g>

          {/* Outer Stationary Metallic Rim */}
          <circle
            cx="220"
            cy="220"
            r="204"
            fill="none"
            stroke="url(#rimGradient)"
            strokeWidth="8"
          />

          {/* Center Stationary Hub (Interactive CTA button) */}
          <g
            role="button"
            tabIndex={0}
            aria-label="Spin wheel"
            className="cursor-pointer group select-none pointer-events-auto"
            onClick={handleHubClick}
            onTouchEnd={handleHubClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleHubClick();
              }
            }}
          >
            {/* Center Hub Outer Glow */}
            <circle
              cx="220"
              cy="220"
              r="44"
              fill="#ffffff"
              filter="url(#hubShadow)"
              className="group-hover:scale-105 transition-transform"
            />

            {/* Center Core */}
            <circle
              cx="220"
              cy="220"
              r="38"
              fill="url(#rimGradient)"
              className="group-hover:opacity-95 transition-opacity"
            />

            {/* Center Accent Border */}
            <circle
              cx="220"
              cy="220"
              r="32"
              fill="#4648d4"
              className="group-hover:fill-[#6063ee] active:scale-95 transition-all"
            />

            {/* Hub Icon / Text */}
            <text
              x="220"
              y={isSpinning ? '220' : '216'}
              textAnchor="middle"
              dominantBaseline="central"
              fill="#ffffff"
              fontWeight="800"
              fontSize={isSpinning ? '12' : '13'}
              letterSpacing="0.06em"
              fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
              className="pointer-events-none select-none"
            >
              {isSpinning ? 'SPINNING' : 'SPIN'}
            </text>
            {!isSpinning && (
              <text
                x="220"
                y="228"
                textAnchor="middle"
                dominantBaseline="central"
                fill="#e1e0ff"
                fontWeight="600"
                fontSize="8"
                letterSpacing="0.08em"
                className="pointer-events-none select-none"
              >
                CLICK OR SPACE
              </text>
            )}
          </g>

          {/* Physical Pointer Peg at Top (270 degrees = center top x=220, y=14) */}
          <g
            transform={`translate(220, 18) rotate(${needleDeflection})`}
            style={{ transformOrigin: '0 0', transition: 'transform 0.05s ease-out' }}
            filter="drop-shadow(0 3px 5px rgba(0,0,0,0.5))"
          >
            {/* Pointer Needle Polygon */}
            <path
              d="M -12 -12 L 12 -12 L 0 24 Z"
              fill="#ff2d55"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Center rivet on needle */}
            <circle cx="0" cy="-6" r="3.5" fill="#ffffff" stroke="#ff2d55" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}
