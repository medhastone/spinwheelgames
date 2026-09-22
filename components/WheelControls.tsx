'use client';

import React from 'react';
import { WheelMode } from '@/lib/types';
import { COLOR_PALETTES } from '@/lib/presets';
import {
  RefreshCw,
  UserMinus,
  Scale,
  HelpCircle,
  Undo2,
  Redo2,
  Shuffle,
  ArrowDownAZ,
  Gauge,
  Timer,
  Maximize2,
  Minimize2,
  Swords,
  Zap,
  type LucideIcon
} from 'lucide-react';

interface WheelControlsProps {
  currentMode: WheelMode;
  onSelectMode: (mode: WheelMode) => void;
  onShuffle: () => void;
  onSort: (direction: 'asc' | 'desc' | 'weight') => void;
  onReset: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  duration: number;
  onChangeDuration: (dur: number) => void;
  countdown: boolean;
  onToggleCountdown: () => void;
  activePaletteKey: string;
  onChangePalette: (key: string) => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
}

export default function WheelControls({
  currentMode,
  onSelectMode,
  onShuffle,
  onSort,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  duration,
  onChangeDuration,
  countdown,
  onToggleCountdown,
  activePaletteKey,
  onChangePalette,
  onToggleFullscreen,
  isFullscreen
}: WheelControlsProps) {
  const modes: { id: WheelMode; label: string; icon: LucideIcon; desc: string }[] = [
    { id: 'standard', label: 'Standard', icon: RefreshCw, desc: 'Keep winner on the wheel' },
    { id: 'elimination', label: 'Elimination', icon: UserMinus, desc: 'Remove winner after each spin' },
    { id: 'best-of-3', label: 'Best-of-3', icon: Swords, desc: 'First to 2 wins takes the crown' },
    { id: 'weighted', label: 'Weighted', icon: Scale, desc: 'Custom probabilities & ticket counts' },
    { id: 'mystery', label: 'Mystery', icon: HelpCircle, desc: 'Hidden slices until revealed' }
  ];

  return (
    <div className="w-full bg-[#f4f2fd] dark:bg-[#1d1e28] rounded-2xl p-3 sm:p-4 border border-[#eeedf7] dark:border-[#222330] flex flex-col gap-3">
      {/* Primary Mode Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#ffffff] dark:bg-[#12131a] rounded-xl border border-[#eeedf7] dark:border-[#292a39]">
        {modes.map((m) => {
          const isActive = currentMode === m.id;
          const IconComp = m.icon;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onSelectMode(m.id)}
              className={`flex-1 min-w-[100px] flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-[12px] sm:text-[13px] font-bold transition-all cursor-pointer select-none ${
                isActive
                  ? 'bg-[#4648d4] text-white shadow-sm'
                  : 'text-[#464554] dark:text-[#c7c4d7] hover:text-[#1a1b22] dark:hover:text-white hover:bg-[#f4f2fd] dark:hover:bg-[#222330]'
              }`}
              title={m.desc}
            >
              <IconComp className="w-4 h-4 shrink-0" />
              <span>{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Action Toolbar: Undo, Redo, Shuffle, Sort, Palette, Duration, Fullscreen */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#eeedf7] dark:border-[#292a39]">
        {/* Left Action Buttons */}
        <div className="flex items-center gap-1.5">
          {/* Undo */}
          <button
            type="button"
            onClick={onUndo}
            disabled={!canUndo}
            className="p-1.5 rounded-lg border border-[#c7c4d7] dark:border-[#464554] text-[#464554] dark:text-[#c7c4d7] hover:bg-white dark:hover:bg-[#292a39] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-4 h-4" />
          </button>

          {/* Redo */}
          <button
            type="button"
            onClick={onRedo}
            disabled={!canRedo}
            className="p-1.5 rounded-lg border border-[#c7c4d7] dark:border-[#464554] text-[#464554] dark:text-[#c7c4d7] hover:bg-white dark:hover:bg-[#292a39] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
            title="Redo (Ctrl+Y)"
          >
            <Redo2 className="w-4 h-4" />
          </button>

          {/* Shuffle */}
          <button
            type="button"
            onClick={onShuffle}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#c7c4d7] dark:border-[#464554] text-[12px] font-semibold text-[#1a1b22] dark:text-[#f1effa] hover:bg-white dark:hover:bg-[#292a39] transition-all cursor-pointer"
            title="Shuffle entries order"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Shuffle</span>
          </button>

          {/* Sort Dropdown / Quick Toggle */}
          <button
            type="button"
            onClick={() => onSort('asc')}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#c7c4d7] dark:border-[#464554] text-[12px] font-semibold text-[#1a1b22] dark:text-[#f1effa] hover:bg-white dark:hover:bg-[#292a39] transition-all cursor-pointer"
            title="Sort A to Z"
          >
            <ArrowDownAZ className="w-3.5 h-3.5" />
            <span>Sort A-Z</span>
          </button>
        </div>

        {/* Right Action Controls: Duration, Countdown, Palette, Fullscreen */}
        <div className="flex items-center gap-2">
          {/* Spin Duration Selector */}
          <div className="flex items-center gap-1 text-[12px] text-[#464554] dark:text-[#c7c4d7]">
            <Gauge className="w-4 h-4 text-[#4648d4] dark:text-[#8587ff]" />
            <select
              value={duration}
              onChange={(e) => onChangeDuration(Number(e.target.value))}
              className="bg-white dark:bg-[#12131a] border border-[#c7c4d7] dark:border-[#464554] rounded-lg px-2 py-1 text-[12px] font-semibold text-[#1a1b22] dark:text-[#f1effa] cursor-pointer"
              title="Spin Duration"
            >
              <option value={1.5}>⚡ Speed (1.5s)</option>
              <option value={3}>3 sec</option>
              <option value={4.5}>4.5 sec</option>
              <option value={6}>6 sec</option>
              <option value={9}>9 sec</option>
              <option value={12}>12 sec</option>
            </select>
          </div>

          {/* Countdown Toggle */}
          <button
            type="button"
            onClick={onToggleCountdown}
            className={`p-1.5 rounded-lg border text-[12px] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              countdown
                ? 'bg-[#4648d4] text-white border-[#4648d4]'
                : 'border-[#c7c4d7] dark:border-[#464554] text-[#464554] dark:text-[#c7c4d7] hover:bg-white dark:hover:bg-[#292a39]'
            }`}
            title="Toggle 3-second pre-spin countdown"
          >
            <Timer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">3s Count</span>
          </button>

          {/* Palette selector */}
          <select
            value={activePaletteKey}
            onChange={(e) => onChangePalette(e.target.value)}
            className="bg-white dark:bg-[#12131a] border border-[#c7c4d7] dark:border-[#464554] rounded-lg px-2 py-1 text-[12px] font-semibold text-[#1a1b22] dark:text-[#f1effa] cursor-pointer"
            title="Theme Palette"
          >
            {Object.entries(COLOR_PALETTES).map(([k, p]) => (
              <option key={k} value={k}>
                🎨 {p.name}
              </option>
            ))}
          </select>

          {/* Fullscreen Button */}
          <button
            type="button"
            onClick={onToggleFullscreen}
            className="p-1.5 rounded-lg border border-[#c7c4d7] dark:border-[#464554] text-[#464554] dark:text-[#c7c4d7] hover:bg-white dark:hover:bg-[#292a39] transition-all cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen (F)'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
