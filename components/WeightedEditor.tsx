'use client';

import React, { useMemo } from 'react';
import { WheelItem } from '@/lib/types';
import { Scale, Info } from 'lucide-react';

interface WeightedEditorProps {
  items: WheelItem[];
  palette: string[];
  onUpdateWeight: (id: string, weight: number) => void;
  onResetWeights: () => void;
}

export default function WeightedEditor({
  items,
  palette,
  onUpdateWeight,
  onResetWeights
}: WeightedEditorProps) {
  const totalWeight = useMemo(() => {
    return items.reduce((sum, item) => sum + Math.max(0.001, item.weight || 1), 0);
  }, [items]);

  return (
    <div className="w-full bg-white dark:bg-[#181922] rounded-2xl p-4 sm:p-5 border border-[#eeedf7] dark:border-[#222330] shadow-sm flex flex-col gap-4">
      {/* Title & Clear Explanation */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-[#4648d4] dark:text-[#8587ff]" />
          <h3 className="font-headline font-bold text-[16px] text-[#1a1b22] dark:text-[#f1effa]">
            Weighted Probability Editor
          </h3>
        </div>
        <button
          type="button"
          onClick={onResetWeights}
          className="text-[12px] font-semibold text-[#4648d4] dark:text-[#8587ff] hover:underline cursor-pointer"
          title="Reset all weights to equal 1:1"
        >
          Reset to Equal (1:1)
        </button>
      </div>

      {/* Probability Disclosure Notice */}
      <div className="p-3 rounded-xl bg-[#f4f2fd] dark:bg-[#1d1e28] border border-[#eeedf7] dark:border-[#292a39] text-[12px] text-[#464554] dark:text-[#c7c4d7] flex items-start gap-2">
        <Info className="w-4 h-4 text-[#4648d4] flex-shrink-0 mt-0.5" />
        <p>
          <strong className="text-[#1a1b22] dark:text-[#f1effa]">Probability Notice:</strong>{' '}
          Weighted mode intentionally alters selection odds. Each slice&apos;s angle and probability
          is calculated as{' '}
          <code className="px-1.5 py-0.5 rounded bg-white dark:bg-[#12131a] border border-[#c7c4d7] dark:border-[#464554] font-mono text-[11px] font-bold">
            P = (Weight / Total Weights) × 100%
          </code>
          .
        </p>
      </div>

      {/* Visual Probability Distribution Bar */}
      <div className="w-full h-3 rounded-full bg-[#f4f2fd] dark:bg-[#12131a] overflow-hidden flex shadow-inner">
        {items.map((item, idx) => {
          const w = Math.max(0.001, item.weight || 1);
          const pct = ((w / totalWeight) * 100).toFixed(1);
          const color = item.color || palette[idx % palette.length];
          return (
            <div
              key={item.id}
              style={{ width: `${pct}%`, backgroundColor: color }}
              title={`${item.text}: ${pct}% odds`}
              className="h-full transition-all duration-300 hover:opacity-85"
            />
          );
        })}
      </div>

      {/* Weighted Items List */}
      <div className="max-h-[300px] overflow-y-auto pr-1 space-y-2 custom-scrollbar">
        {items.map((item, idx) => {
          const w = Math.max(1, Math.round(item.weight || 1));
          const pct = ((w / totalWeight) * 100).toFixed(1);
          const color = item.color || palette[idx % palette.length];

          return (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-[#fbf8ff] dark:bg-[#1d1e28] border border-[#eeedf7] dark:border-[#292a39]"
            >
              {/* Left Color Swatch & Item Name */}
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <span
                  className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: color }}
                />
                <span className="text-[13px] font-medium text-[#1a1b22] dark:text-[#f1effa] truncate">
                  {item.text}
                </span>
              </div>

              {/* Middle: Calculated Odds Badge */}
              <div className="text-right">
                <span className="px-2 py-0.5 rounded-md bg-[#eeedf7] dark:bg-[#12131a] text-[#4648d4] dark:text-[#8587ff] text-[12px] font-bold font-mono">
                  {pct}%
                </span>
              </div>

              {/* Right: Stepper Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onUpdateWeight(item.id, Math.max(1, w - 1))}
                  disabled={w <= 1}
                  className="w-7 h-7 rounded-lg border border-[#c7c4d7] dark:border-[#464554] flex items-center justify-center text-[#464554] dark:text-[#c7c4d7] hover:bg-white dark:hover:bg-[#292a39] disabled:opacity-30 disabled:cursor-not-allowed text-[14px] font-bold cursor-pointer"
                  title="Decrease weight"
                  aria-label={`Decrease weight for ${item.text}`}
                >
                  -
                </button>

                <input
                  type="number"
                  aria-label={`Weight for ${item.text}`}
                  min="1"
                  max="100"
                  value={w}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    if (!isNaN(val) && val >= 1) {
                      onUpdateWeight(item.id, Math.min(100, val));
                    }
                  }}
                  className="w-12 text-center py-1 rounded-lg bg-white dark:bg-[#12131a] border border-[#c7c4d7] dark:border-[#464554] text-[13px] font-bold text-[#1a1b22] dark:text-[#f1effa]"
                />

                <button
                  type="button"
                  onClick={() => onUpdateWeight(item.id, Math.min(100, w + 1))}
                  className="w-7 h-7 rounded-lg border border-[#c7c4d7] dark:border-[#464554] flex items-center justify-center text-[#464554] dark:text-[#c7c4d7] hover:bg-white dark:hover:bg-[#292a39] text-[14px] font-bold cursor-pointer"
                  title="Increase weight"
                  aria-label={`Increase weight for ${item.text}`}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
