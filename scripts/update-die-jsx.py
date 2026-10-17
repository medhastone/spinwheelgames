with open('components/dice/DedicatedDiePageComponent.tsx', 'r') as f:
    code = f.read()

target = """                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Current Total
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-white">
                      {activeSum}
                    </span>
                    {lastResult && (
                      <span className="text-xs text-slate-400 font-mono">
                        (Avg: {lastResult.average})
                      </span>
                    )}
                  </div>
                </div>"""

replacement = """                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Current Total
                  </span>
                  <div className="flex items-baseline gap-2">
                    {isRolling ? (
                      <span className="text-xl sm:text-2xl font-black font-mono text-indigo-400 flex items-center gap-2 animate-pulse">
                        <span className="inline-block w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
                        Rolling...
                      </span>
                    ) : (
                      <>
                        <span className="text-2xl sm:text-3xl font-black font-mono text-white">
                          {activeSum}
                        </span>
                        {lastResult && (
                          <span className="text-xs text-slate-400 font-mono">
                            (Avg: {lastResult.average})
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>"""

if target in code:
    code = code.replace(target, replacement, 1)
    print('Updated Current Total section')
else:
    print('Target for Current Total not found!')

target_faces = """            {/* Individual Dice Face Results */}
            <div className="p-3 rounded-xl bg-white dark:bg-[#0d0e15] border border-slate-200 dark:border-[#1b1c28] flex items-center gap-1.5 flex-wrap shadow-2xs">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mr-1">Faces:</span>
              {currentDice.map((d, idx) => (
                <button
                  key={d.id || idx}
                  type="button"
                  onClick={() => {
                    setInspectedDieIndex(idx);
                    setIsInspectorOpen(true);
                  }}
                  className={`px-2.5 py-1 rounded-lg font-mono text-xs font-bold border transition-all flex items-center gap-1 cursor-pointer ${
                    d.isDropped
                      ? 'bg-rose-50 text-rose-500 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400/50 dark:border-rose-900/30 line-through'
                      : d.value === config.sides
                      ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/40 shadow-xs'
                      : d.value === 1
                      ? 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                      : 'bg-slate-50 text-slate-900 border-slate-200 hover:border-indigo-400 dark:bg-[#181a26] dark:text-white dark:border-[#27293d] dark:hover:border-indigo-500/50'
                  }`}
                >
                  <span>{d.value}</span>
                  {d.value === config.sides && <Sparkles className="w-3 h-3 text-amber-500" />}
                </button>
              ))}
            </div>"""

replacement_faces = """            {/* Individual Dice Face Results */}
            <div className="p-3 rounded-xl bg-white dark:bg-[#0d0e15] border border-slate-200 dark:border-[#1b1c28] flex items-center gap-1.5 flex-wrap shadow-2xs">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mr-1">Faces:</span>
              {isRolling ? (
                <div className="flex items-center gap-2 py-0.5 text-xs text-indigo-500 dark:text-indigo-400 font-mono animate-pulse">
                  <Dices className="w-3.5 h-3.5 animate-spin" />
                  <span>Simulating physics on felt bed...</span>
                </div>
              ) : (
                currentDice.map((d, idx) => (
                  <button
                    key={d.id || idx}
                    type="button"
                    onClick={() => {
                      setInspectedDieIndex(idx);
                      setIsInspectorOpen(true);
                    }}
                    className={`px-2.5 py-1 rounded-lg font-mono text-xs font-bold border transition-all flex items-center gap-1 cursor-pointer ${
                      d.isDropped
                        ? 'bg-rose-50 text-rose-500 border-rose-200 dark:bg-rose-950/30 dark:text-rose-400/50 dark:border-rose-900/30 line-through'
                        : d.value === config.sides
                        ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/40 shadow-xs'
                        : d.value === 1
                        ? 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                        : 'bg-slate-50 text-slate-900 border-slate-200 hover:border-indigo-400 dark:bg-[#181a26] dark:text-white dark:border-[#27293d] dark:hover:border-indigo-500/50'
                    }`}
                  >
                    <span>{d.value}</span>
                    {d.value === config.sides && <Sparkles className="w-3 h-3 text-amber-500" />}
                  </button>
                ))
              )}
            </div>

            {/* Critical Hit / Fumble Celebration Banner for D20 */}
            {!isRolling && lastResult && config.sides === 20 && lastResult.dice.some((d) => !d.isDropped && d.value === 20) && (
              <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500/20 via-yellow-500/15 to-amber-500/20 border-2 border-amber-400/60 flex items-center justify-between text-amber-300 dark:text-amber-200 shadow-lg shadow-amber-500/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
                  <span className="font-extrabold text-sm tracking-wide uppercase text-amber-300">
                    Natural 20! Critical Hit!
                  </span>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-amber-400/30 text-amber-100 border border-amber-300/40">
                  Max Roll
                </span>
              </div>
            )}

            {!isRolling && lastResult && config.sides === 20 && lastResult.dice.length === 1 && lastResult.dice[0].value === 1 && (
              <div className="p-3 rounded-xl bg-gradient-to-r from-rose-500/20 via-red-500/15 to-rose-500/20 border-2 border-rose-500/60 flex items-center justify-between text-rose-300 dark:text-rose-200 shadow-lg shadow-rose-500/10">
                <div className="flex items-center gap-2">
                  <span className="text-base">💀</span>
                  <span className="font-extrabold text-sm tracking-wide uppercase text-rose-300">
                    Natural 1 — Critical Fumble!
                  </span>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-rose-500/30 text-rose-100 border border-rose-400/40">
                  Min Roll
                </span>
              </div>
            )}"""

if target_faces in code:
    code = code.replace(target_faces, replacement_faces, 1)
    print('Updated Faces and Celebration banners section')
else:
    print('Target for Faces not found!')

with open('components/dice/DedicatedDiePageComponent.tsx', 'w') as f:
    f.write(code)

print('Done writing DedicatedDiePageComponent.tsx')
