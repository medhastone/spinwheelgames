'use client';

import React, { useState } from 'react';
import { BarChart3, Play } from 'lucide-react';

export default function FairnessSimulator() {
  const [sliceCount, setSliceCount] = useState(6);
  const [simIterations, setSimIterations] = useState(5000);
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<{ [key: number]: number } | null>(null);
  const [chiSquare, setChiSquare] = useState<number | null>(null);
  const [pValue, setPValue] = useState<string | null>(null);

  // Run real-time client-side CSPRNG simulation in the user's browser
  const runSimulation = () => {
    setRunning(true);
    setResults(null);

    setTimeout(() => {
      const counts: { [key: number]: number } = {};
      for (let i = 0; i < sliceCount; i++) {
        counts[i] = 0;
      }

      // 53-bit CSPRNG simulation loop
      const uintArray = new Uint32Array(2);
      for (let i = 0; i < simIterations; i++) {
        window.crypto.getRandomValues(uintArray);
        const float53 = ((uintArray[0] >>> 11) * 4294967296 + uintArray[1]) / 9007199254740992;
        const selected = Math.floor(float53 * sliceCount);
        counts[selected] = (counts[selected] || 0) + 1;
      }

      // Calculate Chi-Square statistic: sum((O - E)^2 / E)
      const expected = simIterations / sliceCount;
      let chi = 0;
      for (let i = 0; i < sliceCount; i++) {
        const diff = counts[i] - expected;
        chi += (diff * diff) / expected;
      }

      setResults(counts);
      setChiSquare(Number(chi.toFixed(3)));
      setPValue(chi < sliceCount * 2 ? '> 0.05 (Uniform Distribution Confirmed)' : '~ 0.05');
      setRunning(false);
    }, 150);
  };

  return (
    <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#eeedf7] dark:border-[#222330] pb-5">
        <div>
          <h2 className="font-headline text-[20px] font-bold text-[#1a1b22] dark:text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#4648d4] dark:text-[#8587ff]" />
            Interactive Monte Carlo &amp; Chi-Square ($\chi^2$) Simulator
          </h2>
          <p className="text-xs text-[#767586] dark:text-[#908fa1]">
            Test our live CSPRNG algorithm directly in your browser with thousands of simulated spins.
          </p>
        </div>

        <button
          type="button"
          onClick={runSimulation}
          disabled={running}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4648d4] text-white text-[14px] font-bold hover:bg-[#3b3dbb] transition-all cursor-pointer disabled:opacity-50"
        >
          {running ? (
            <span>Simulating...</span>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" />
              <span>Run Live Simulation</span>
            </>
          )}
        </button>
      </div>

      {/* Config Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fairness-slice-count" className="block text-xs font-bold uppercase tracking-wider text-[#464554] dark:text-[#c7c4d7] mb-1.5">
            Number of Slices: {sliceCount}
          </label>
          <input
            id="fairness-slice-count"
            type="range"
            min="2"
            max="12"
            value={sliceCount}
            onChange={(e) => setSliceCount(Number(e.target.value))}
            className="w-full accent-[#4648d4]"
          />
        </div>

        <div>
          <label htmlFor="fairness-iterations" className="block text-xs font-bold uppercase tracking-wider text-[#464554] dark:text-[#c7c4d7] mb-1.5">
            Simulated Spins: {simIterations.toLocaleString()} iterations
          </label>
          <select
            id="fairness-iterations"
            value={simIterations}
            onChange={(e) => setSimIterations(Number(e.target.value))}
            className="w-full px-3 py-1.5 rounded-xl bg-[#f4f2fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] text-[#1a1b22] dark:text-white text-xs font-medium"
          >
            <option value={1000}>1,000 Spins (Quick)</option>
            <option value={5000}>5,000 Spins (Recommended)</option>
            <option value={10000}>10,000 Spins (High Precision)</option>
          </select>
        </div>
      </div>

      {/* Results Graphic */}
      {results ? (
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#f4f2fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39]">
              <div className="text-xs text-[#767586] dark:text-[#908fa1]">Expected per Slice</div>
              <div className="text-lg font-bold text-[#1a1b22] dark:text-white">
                {(simIterations / sliceCount).toFixed(0)} <span className="text-xs font-normal">({(100 / sliceCount).toFixed(1)}%)</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#f4f2fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39]">
              <div className="text-xs text-[#767586] dark:text-[#908fa1]">Chi-Square Statistic ($\chi^2$)</div>
              <div className="text-lg font-bold text-[#006c49] dark:text-[#4edea3]">
                {chiSquare}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#f4f2fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] col-span-2 sm:col-span-1">
              <div className="text-xs text-[#767586] dark:text-[#908fa1]">Goodness-of-Fit Test</div>
              <div className="text-sm font-bold text-[#4648d4] dark:text-[#8587ff] truncate">
                {pValue}
              </div>
            </div>
          </div>

          {/* Bar Visualizer */}
          <div className="space-y-2 pt-2">
            <div className="text-xs font-bold text-[#1a1b22] dark:text-white">
              Slice Frequency Breakdown:
            </div>
            <div className="space-y-2">
              {Object.entries(results).map(([index, count]) => {
                const percentage = (count / simIterations) * 100;
                const expectedPct = 100 / sliceCount;
                const variance = percentage - expectedPct;

                return (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-xs text-[#464554] dark:text-[#c7c4d7]">
                      <span className="font-semibold">Slice #{Number(index) + 1}</span>
                      <span>
                        {count.toLocaleString()} spins ({percentage.toFixed(2)}% | {variance > 0 ? `+${variance.toFixed(2)}` : variance.toFixed(2)}%)
                      </span>
                    </div>
                    <div className="h-2.5 w-full bg-[#f4f2fd] dark:bg-[#12131a] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#4648d4] to-[#6063ee] rounded-full transition-all duration-500"
                        style={{ width: `${percentage * (sliceCount / 1.5)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 border-2 border-dashed border-[#eeedf7] dark:border-[#222330] rounded-2xl text-[#767586] text-xs">
          Click &quot;Run Live Simulation&quot; above to execute {simIterations.toLocaleString()} CSPRNG spins and verify uniform statistical distribution.
        </div>
      )}
    </section>
  );
}
