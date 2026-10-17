with open('components/dice/DedicatedDiePageComponent.tsx', 'r') as f:
    code = f.read()

# 1. Import confetti
if "import confetti from '@/lib/confetti';" not in code:
    code = code.replace(
        "import DiceInspectorModal from './DiceInspectorModal';",
        "import DiceInspectorModal from './DiceInspectorModal';\nimport confetti from '@/lib/confetti';"
    )

# 2. Update triggerRoll and handlePhysicsComplete
old_roll_logic = """  // Roll execution
  const triggerRoll = useCallback(() => {
    if (isRolling) return;
    setIsRolling(true);

    // Generate outcome
    const rolls: number[] = [];
    for (let i = 0; i < count; i++) {
      rolls.push(Math.floor(Math.random() * config.sides) + 1);
    }

    let effectiveRolls = [...rolls];
    let droppedIndices: number[] = [];

    if (dropLowest > 0 && rolls.length > dropLowest) {
      const indexed = rolls.map((val, idx) => ({ val, idx }));
      indexed.sort((a, b) => a.val - b.val);
      droppedIndices = indexed.slice(0, dropLowest).map((item) => item.idx);
    } else if (keepHighest > 0 && rolls.length > keepHighest) {
      const indexed = rolls.map((val, idx) => ({ val, idx }));
      indexed.sort((a, b) => b.val - a.val);
      const keepIndices = new Set(indexed.slice(0, keepHighest).map((item) => item.idx));
      droppedIndices = indexed.filter((item) => !keepIndices.has(item.idx)).map((item) => item.idx);
    }

    const newDice: SingleDieResult[] = rolls.map((val, idx) => ({
      id: `die-${Date.now()}-${idx}`,
      value: val,
      originalValue: val,
      isDropped: droppedIndices.includes(idx)
    }));

    setCurrentDice(newDice);

    const keptRolls = newDice.filter((d) => !d.isDropped).map((d) => d.value);
    const sumKept = keptRolls.reduce((a, b) => a + b, 0);
    const total = sumKept + modifier;

    const resultObj: RollResult = {
      dice: newDice,
      activeCount: count,
      sides: config.sides,
      modifier,
      subtotal: sumKept,
      total,
      average: stats.theoreticalAverage,
      minPossible: stats.min,
      maxPossible: stats.max,
      notation: `${count}${config.dieType}${modifier !== 0 ? (modifier > 0 ? `+${modifier}` : modifier) : ''}`,
      timestamp: Date.now()
    };

    setLastResult(resultObj);
    setRollHistory((prev) => [resultObj, ...prev.slice(0, 19)]);
  }, [count, config.sides, config.dieType, dropLowest, keepHighest, modifier, stats, isRolling]);

  const handlePhysicsComplete = useCallback(() => {
    setIsRolling(false);
  }, []);"""

new_roll_logic = """  // Roll execution: Launch physics without pre-generating premature results
  const triggerRoll = useCallback(() => {
    if (isRolling) return;
    setIsRolling(true);
  }, [isRolling]);

  // Synchronize result strictly from 3D physics settled face normal
  const handlePhysicsComplete = useCallback(
    (settledResults: SingleDieResult[]) => {
      const rawValues =
        settledResults && settledResults.length > 0
          ? settledResults.map((r) => r.value)
          : Array.from({ length: count }, () => Math.floor(Math.random() * config.sides) + 1);

      let droppedIndices: number[] = [];
      if (dropLowest > 0 && rawValues.length > dropLowest) {
        const indexed = rawValues.map((val, idx) => ({ val, idx }));
        indexed.sort((a, b) => a.val - b.val);
        droppedIndices = indexed.slice(0, dropLowest).map((item) => item.idx);
      } else if (keepHighest > 0 && rawValues.length > keepHighest) {
        const indexed = rawValues.map((val, idx) => ({ val, idx }));
        indexed.sort((a, b) => b.val - a.val);
        const keepIndices = new Set(indexed.slice(0, keepHighest).map((item) => item.idx));
        droppedIndices = indexed.filter((item) => !keepIndices.has(item.idx)).map((item) => item.idx);
      }

      const newDice: SingleDieResult[] = rawValues.map((val, idx) => ({
        id: `die-${Date.now()}-${idx}`,
        value: val,
        originalValue: val,
        isDropped: droppedIndices.includes(idx)
      }));

      setCurrentDice(newDice);

      const keptRolls = newDice.filter((d) => !d.isDropped).map((d) => d.value);
      const sumKept = keptRolls.reduce((a, b) => a + b, 0);
      const total = sumKept + modifier;

      const resultObj: RollResult = {
        dice: newDice,
        activeCount: count,
        sides: config.sides,
        modifier,
        subtotal: sumKept,
        total,
        average: stats.theoreticalAverage,
        minPossible: stats.min,
        maxPossible: stats.max,
        notation: `${count}${config.dieType}${modifier !== 0 ? (modifier > 0 ? `+${modifier}` : modifier) : ''}`,
        timestamp: Date.now()
      };

      setLastResult(resultObj);
      setRollHistory((prev) => [resultObj, ...prev.slice(0, 19)]);
      setIsRolling(false);

      // Natural 20 Celebration (Critical Hit)
      if (config.sides === 20 && keptRolls.some((v) => v === 20)) {
        confetti({
          particleCount: 85,
          spread: 75,
          origin: { y: 0.6 }
        });
      }
    },
    [count, config.sides, config.dieType, dropLowest, keepHighest, modifier, stats]
  );

  // Spacebar hotkey to roll dice
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        triggerRoll();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerRoll]);"""

if old_roll_logic in code:
    code = code.replace(old_roll_logic, new_roll_logic)
    print('Replaced roll logic')
else:
    print('old_roll_logic not found!')

# 3. Canonical path in jsonLd
old_canonical_path = """    const canonicalPath =
      config.dieType === 'd4'
        ? '/roll-1d4'
        : config.dieType === '4d6'
        ? '/roll-4d6'
        : `/dice/${config.dieType}`;"""

new_canonical_path = """    const canonicalPath =
      config.dieType === '4d6'
        ? '/roll-4d6'
        : `/dice/${config.dieType}`;"""

if old_canonical_path in code:
    code = code.replace(old_canonical_path, new_canonical_path)
    print('Updated jsonLd canonical path')
else:
    print('old_canonical_path not found!')

# 4. Update D4 link in bottom related dice
code = code.replace("href: '/roll-1d4'", "href: '/dice/d4'")
print('Updated roll-1d4 hrefs in DedicatedDiePageComponent')

with open('components/dice/DedicatedDiePageComponent.tsx', 'w') as f:
    f.write(code)

print('Done writing DedicatedDiePageComponent.tsx')
