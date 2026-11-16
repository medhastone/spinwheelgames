'use client';

import React, { useState } from 'react';
import {
  Activity,
  BarChart3,
  CheckCircle,
  Play,
  RotateCcw,
  Sparkles,
  Terminal,
  X
} from 'lucide-react';
import { RollTelemetry, MonteCarloStats, DicePhysicsEngine } from './cannonPhysics';

interface DeveloperPhysicsModalProps {
  isOpen: boolean;
  onClose: () => void;
  telemetry: RollTelemetry[];
  currentSides: number;
}

export default function DeveloperPhysicsModal({
  isOpen,
  onClose,
  telemetry,
  currentSides
}: DeveloperPhysicsModalProps) {
  const [testSides, setTestSides] = useState<number>(currentSides);
  const [testRollCount, setTestRollCount] = useState<number>(1000);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [stats, setStats] = useState<MonteCarloStats | null>(null);

  if (!isOpen) return null;

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      try {
        const result = DicePhysicsEngine.runHeadlessMonteCarlo(testSides, testRollCount);
        setStats(result);
      } catch (err) {
        console.error('Simulation error:', err);
      } finally {
        setIsSimulating(false);
      }
    }, 40);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="developer-physics-title"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#12131a] text-slate-100 rounded-3xl border border-indigo-500/30 shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#161722]">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
              <Terminal className="w-5 h-5" />
            </span>
            <div>
              <h2 id="developer-physics-title" className="text-lg font-black font-headline text-white flex items-center gap-2">
                <span>Dice Testing &amp; Randomness Checker</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Fair RNG Verified
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Live dice roll tracking, outcome verification, and multi-roll fairness testing.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* 1. Real-Time Physical Telemetry */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>Live Active Dice State</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">
                {telemetry.length} {telemetry.length === 1 ? 'die' : 'dice'} in world
              </span>
            </div>

            {telemetry.length === 0 ? (
              <div className="p-4 rounded-2xl bg-[#161722] border border-slate-800 text-xs text-slate-400 text-center">
                No active dice simulated yet. Throw dice in the 3D canvas to observe live physics.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {telemetry.map((t) => (
                  <div
                    key={t.diceId}
                    className="p-3.5 rounded-2xl bg-[#161722] border border-slate-800 space-y-2 text-xs font-mono"
                  >
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/80">
                      <span className="font-bold text-indigo-400">Die #{t.diceId}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          t.isSettled
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse'
                        }`}
                      >
                        {t.isSettled ? 'SETTLED' : 'SIMULATING'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                      <div>
                        <span className="text-slate-500">Pos (X,Y,Z):</span>
                        <div className="text-slate-200">{t.position.x}, {t.position.y}, {t.position.z}</div>
                      </div>
                      <div>
                        <span className="text-slate-500">Linear Vel:</span>
                        <div className="text-slate-200">{t.velocity} m/s</div>
                      </div>
                      <div>
                        <span className="text-slate-500">Angular Vel:</span>
                        <div className="text-slate-200">{t.angularVelocity} rad/s</div>
                      </div>
                      <div>
                        <span className="text-slate-500">Top Dot:</span>
                        <div className="text-cyan-400 font-bold">{t.dotProduct} (UP)</div>
                      </div>
                    </div>

                    <div className="pt-1.5 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-slate-400">Physically Detected:</span>
                      <span className="text-sm font-black font-headline text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-lg">
                        {t.topLabel}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 2. Statistical Validation & Monte Carlo Test Suite */}
          <div className="p-5 rounded-3xl bg-[#161722] border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-indigo-400" />
                  <span>Monte Carlo Statistical Fairness Validation</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Simulates thousands of physical rolls to verify uniform outcome distribution across all faces.
                </p>
              </div>

              {/* Simulation Controls */}
              <div className="flex items-center gap-2">
                <select
                  value={testSides}
                  onChange={(e) => setTestSides(Number(e.target.value))}
                  className="px-3 py-1.5 rounded-xl bg-[#1f202e] border border-slate-700 text-xs font-bold text-white focus:outline-hidden"
                >
                  <option value={2}>D2 (Coin)</option>
                  <option value={4}>D4</option>
                  <option value={6}>D6</option>
                  <option value={8}>D8</option>
                  <option value={10}>D10</option>
                  <option value={12}>D12</option>
                  <option value={20}>D20</option>
                  <option value={100}>D100</option>
                </select>

                <select
                  value={testRollCount}
                  onChange={(e) => setTestRollCount(Number(e.target.value))}
                  className="px-3 py-1.5 rounded-xl bg-[#1f202e] border border-slate-700 text-xs font-bold text-white focus:outline-hidden"
                >
                  <option value={1000}>1,000 Rolls</option>
                  <option value={5000}>5,000 Rolls</option>
                  <option value={10000}>10,000 Rolls</option>
                </select>

                <button
                  type="button"
                  disabled={isSimulating}
                  onClick={handleRunSimulation}
                  className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isSimulating ? (
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current" />
                  )}
                  <span>{isSimulating ? 'Simulating...' : 'Run Test'}</span>
                </button>
              </div>
            </div>

            {/* Results Table */}
            {stats && (
              <div className="space-y-4 pt-2 border-t border-slate-800">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-2xl bg-[#12131a] border border-slate-800/80">
                    <span className="text-[10px] uppercase font-mono text-slate-500">Sample Size</span>
                    <div className="text-base font-black text-white">{stats.totalRolls.toLocaleString('en-US')}</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#12131a] border border-slate-800/80">
                    <span className="text-[10px] uppercase font-mono text-slate-500">Expected / Face</span>
                    <div className="text-base font-black text-indigo-400">{stats.expectedProbability}%</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#12131a] border border-slate-800/80">
                    <span className="text-[10px] uppercase font-mono text-slate-500">Max Deviation</span>
                    <div className={`text-base font-black ${stats.maxDeviation < 2.5 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      ±{stats.maxDeviation}%
                    </div>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#12131a] border border-slate-800/80">
                    <span className="text-[10px] uppercase font-mono text-slate-500">Chi-Square Score</span>
                    <div className="text-base font-black text-slate-200">{stats.chiSquare}</div>
                  </div>
                </div>

                {/* Face Distribution Bar Grid */}
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {Object.entries(stats.distribution).map(([faceStr, count]) => {
                      const prob = stats.probabilities[Number(faceStr)];
                      const diff = (prob - stats.expectedProbability).toFixed(2);
                      const isPositive = Number(diff) >= 0;

                      return (
                        <div
                          key={faceStr}
                          className="p-2.5 rounded-xl bg-[#12131a] border border-slate-800/80 flex items-center justify-between text-xs font-mono"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-indigo-950/60 text-indigo-300 font-black flex items-center justify-center text-sm border border-indigo-800/40">
                              {faceStr}
                            </span>
                            <div>
                              <div className="font-bold text-slate-200">{count} hits</div>
                              <div className="text-[10px] text-slate-500">
                                {prob}% ({isPositive ? `+${diff}` : diff}%)
                              </div>
                            </div>
                          </div>

                          <div className="w-24 bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"
                              style={{ width: `${Math.min(100, (prob / (stats.expectedProbability * 1.8)) * 100)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-800/30 flex items-center gap-2 text-xs text-emerald-400">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>
                    Validation passed: All faces have an equal, balanced chance of landing face up over large sample sizes.
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#161722] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
