'use client';

import React, { useState } from 'react';
import { runWebCryptoEntropyBenchmark } from '@/lib/random';
import {
  ShieldCheck,
  Lock,
  Compass,
  PieChart,
  Repeat,
  RefreshCw,
  Play,
  CheckCircle2
} from 'lucide-react';

export default function FairnessPanel() {
  const [benchmarkResult, setBenchmarkResult] = useState<{
    buckets: number[];
    min: number;
    max: number;
    variancePercent: string;
    isUniform: boolean;
  } | null>(null);
  const [isRunningTest, setIsRunningTest] = useState(false);

  const handleRunEntropyTest = () => {
    setIsRunningTest(true);
    setTimeout(() => {
      const res = runWebCryptoEntropyBenchmark(1000, 8);
      setBenchmarkResult(res);
      setIsRunningTest(false);
    }, 150);
  };

  return (
    <section
      id="fairness-section"
      className="w-full bg-white dark:bg-[#181922] rounded-3xl p-6 sm:p-10 border border-[#eeedf7] dark:border-[#222330] shadow-sm my-8"
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        {/* Title */}
        <div className="flex flex-col gap-2 text-center">
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff] text-[12px] font-bold w-fit mx-auto">
            <ShieldCheck className="w-4 h-4 text-[#4648d4] dark:text-[#8587ff]" />
            <span>Cryptographic Randomness Architecture</span>
          </div>
          <h2 className="font-headline font-extrabold text-[24px] sm:text-[32px] text-[#1a1b22] dark:text-[#f1effa]">
            How Random Selection Works
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#767586] dark:text-[#908fa1] max-w-2xl mx-auto">
            SpinWheelGames uses the browser Web Cryptography API (`crypto.getRandomValues()`) rather than
            pseudo-random mathematical formulas. Here is the exact mechanics of every spin.
          </p>
        </div>

        {/* 4 Architectural Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pillar 1 */}
          <div className="p-5 rounded-2xl bg-[#fbf8ff] dark:bg-[#1d1e28] border border-[#eeedf7] dark:border-[#292a39] flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#4648d4]/10 dark:bg-[#8587ff]/10 text-[#4648d4] dark:text-[#8587ff] flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-headline font-bold text-[17px] text-[#1a1b22] dark:text-[#f1effa]">
              1. Browser Web Cryptography API
            </h3>
            <p className="text-[13px] leading-relaxed text-[#464554] dark:text-[#c7c4d7]">
              Instead of the predictable <code className="font-mono text-[12px]">Math.random()</code>,
              the engine queries the browser&apos;s cryptographically secure pseudo-random number
              generator (CSPRNG) via{' '}
              <code className="px-1.5 py-0.5 rounded bg-[#eeedf7] dark:bg-[#12131a] font-mono text-[11px] text-[#4648d4] dark:text-[#8587ff] font-bold">
                window.crypto.getRandomValues()
              </code>
              . This provides high-entropy uniform random values across every spin.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-5 rounded-2xl bg-[#fbf8ff] dark:bg-[#1d1e28] border border-[#eeedf7] dark:border-[#292a39] flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#006c49]/10 dark:bg-[#4edea3]/10 text-[#006c49] dark:text-[#4edea3] flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-headline font-bold text-[17px] text-[#1a1b22] dark:text-[#f1effa]">
              2. Winner Chosen Before Animation
            </h3>
            <p className="text-[13px] leading-relaxed text-[#464554] dark:text-[#c7c4d7]">
              Animation frame timing, screen refresh rates (60Hz vs 144Hz), and CPU throttling can
              arbitrarily corrupt physics-driven wheels. To ensure zero bias,{' '}
              <strong className="text-[#1a1b22] dark:text-[#f1effa]">
                the winning slice is selected instantly upon pressing Spin
              </strong>
              . The wheel animation then visually decelarates with high-order quintic easing to
              the pre-determined slice.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-5 rounded-2xl bg-[#fbf8ff] dark:bg-[#1d1e28] border border-[#eeedf7] dark:border-[#292a39] flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#dc2c4f]/10 dark:bg-[#ff8595]/10 text-[#dc2c4f] dark:text-[#ff8595] flex items-center justify-center">
              <PieChart className="w-5 h-5" />
            </div>
            <h3 className="font-headline font-bold text-[17px] text-[#1a1b22] dark:text-[#f1effa]">
              3. Weighted Mode Sampling
            </h3>
            <p className="text-[13px] leading-relaxed text-[#464554] dark:text-[#c7c4d7]">
              In Weighted mode, probability is proportional to ticket values:{' '}
              <code className="font-mono text-[12px] bg-[#eeedf7] dark:bg-[#12131a] px-1 rounded">
                P(i) = w_i / ∑w
              </code>
              . The generator partitions the continuous interval [0, 1) into segments matching each
              item&apos;s weight, guaranteeing that an item with weight 3 is exactly 3× more likely to win
              than an item with weight 1.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-5 rounded-2xl bg-[#fbf8ff] dark:bg-[#1d1e28] border border-[#eeedf7] dark:border-[#292a39] flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Repeat className="w-5 h-5" />
            </div>
            <h3 className="font-headline font-bold text-[17px] text-[#1a1b22] dark:text-[#f1effa]">
              4. Independent Trials & Repeat Streaks
            </h3>
            <p className="text-[13px] leading-relaxed text-[#464554] dark:text-[#c7c4d7]">
              True random processes have no memory. Seeing the same item win twice in a row is not a
              glitch—it is a natural property of independent statistical trials (the Gambler&apos;s Fallacy
              mistakenly assumes past spins force future balance). If you require no repeats, use{' '}
              <strong className="text-[#1a1b22] dark:text-[#f1effa]">Elimination Mode</strong>.
            </p>
          </div>
        </div>

        {/* Interactive Live Entropy Benchmark Tool */}
        <div className="p-6 rounded-2xl bg-[#f4f2fd] dark:bg-[#1d1e28] border border-[#eeedf7] dark:border-[#292a39] flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="font-headline font-bold text-[16px] text-[#1a1b22] dark:text-[#f1effa]">
                Live Browser Entropy Audit Test
              </h4>
              <p className="text-[12px] text-[#767586] dark:text-[#908fa1]">
                Execute 1,000 live draws from your device&apos;s Web Crypto API across 8 buckets to verify
                uniform distribution.
              </p>
            </div>
            <button
              type="button"
              onClick={handleRunEntropyTest}
              disabled={isRunningTest}
              className="px-4 py-2 rounded-xl bg-[#4648d4] hover:bg-[#6063ee] text-white text-[13px] font-bold disabled:opacity-60 flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
            >
              {isRunningTest ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Play className="w-4 h-4 fill-current" />
              )}
              <span>{isRunningTest ? 'Sampling 1,000 Draws...' : 'Run Entropy Audit'}</span>
            </button>
          </div>

          {benchmarkResult && (
            <div className="flex flex-col gap-3 pt-3 border-t border-[#eeedf7] dark:border-[#292a39] animate-fadeIn">
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-[#006c49] dark:text-[#4edea3] font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#006c49] dark:text-[#4edea3]" />
                  <span>1,000 Cryptographic Draws Completed</span>
                </span>
                <span className="font-mono text-[#464554] dark:text-[#c7c4d7]">
                  Max Variance: <strong>{benchmarkResult.variancePercent}%</strong> (Threshold &lt;
                  25%)
                </span>
              </div>

              {/* Bucket Histogram */}
              <div className="grid grid-cols-8 gap-1.5 h-20 items-end bg-white dark:bg-[#12131a] p-2 rounded-xl border border-[#eeedf7] dark:border-[#292a39]">
                {benchmarkResult.buckets.map((count, bIdx) => {
                  const maxVal = Math.max(...benchmarkResult.buckets);
                  const heightPct = Math.round((count / maxVal) * 100);
                  return (
                    <div key={bIdx} className="flex flex-col items-center gap-1 h-full justify-end">
                      <div
                        style={{ height: `${heightPct}%` }}
                        className="w-full bg-[#6063ee] rounded-t transition-all duration-300"
                        title={`Bucket ${bIdx + 1}: ${count} hits`}
                      />
                      <span className="text-[10px] font-mono text-[#767586] dark:text-[#908fa1]">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
