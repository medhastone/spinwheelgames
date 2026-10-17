# Fix D20 3D Dice Roller: Result Timing & Physical Face Synchronization

Resolve the issue on **Roll D20 Online - 3D Dice Roller** where the roll total and face values display before the dice drop and land, and synchronize the final reported numbers directly with the settled 3D physics face normals.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following user preferences were confirmed during Phase 1 clarification:
> - **Result Display Timing**: Show an animated rolling indicator (`Rolling...`) while the 3D dice are tumbling in the air. The final sum, individual face badges, and recent history will only populate after the physical dice come to a complete resting stop.
> - **Physics & Result Synchronization**: Derive and synchronize the final score directly from the 3D physics engine's resting face normal (`onPhysicsRollComplete(settledResults)`), guaranteeing 100% visual-to-numerical fidelity.
> - **Critical Hit Celebration**: Trigger celebratory gold particle confetti (`@/lib/confetti`) and an amber/gold glow banner whenever a Natural 20 is rolled on any active D20 die.

---

## 1. Overview & Core Concept

- **What It Does**: Fixes the asynchronous disconnect between the 3D WebGL physics simulation and the React UI state in `DedicatedDiePageComponent.tsx`. When the user clicks "Roll D20", the UI enters an active rolling state, showing an animated suspense indicator in the "Current Total" and "Faces" panels. The physics engine simulates the throw with rigid-body collisions. Once all dice settle (`allSettled === true`), the upward-pointing face normal is computed, and the true physical values are emitted to the UI to display the final score, critical hit celebrations, and history entries.
- **Target Audience**: Tabletop RPG players (D&D 5e, Pathfinder), dungeon masters, and streamers who require suspenseful, authentic, and visually honest dice rolls.
- **Key Value**: Eliminates roll spoilers. What the user sees on top of the 3D die matches the score on screen to the exact integer.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Idle State**: The user sees the D20 in the felt arena, current quantity/modifier controls, and the last settled result (or zero state).
2. **Roll Trigger**: The user clicks **Roll D20** or presses the Spacebar.
   - The roll button enters a loading state (`Rolling...` with an animated spinner icon).
   - The "Current Total" score display transitions from a static number to an active tumbling pulse indicator (`Rolling...` with animated ellipsis and subtle shimmer).
   - The "Faces" chips display an active tumbling status rather than spoiling the outcome prematurely.
   - The D20 dice launch into the 3D arena with impulse torque and authentic felt impact sounds.
3. **Physics Settle**:
   - Dice bounce off containment walls and settle onto the tray floor.
   - When linear and angular velocities drop below threshold for >300ms, the physics loop declares `allSettled`.
   - The upward face normal vector is evaluated against `(0, 1, 0)` to detect the landing face ($1 \dots 20$).
4. **Result Reveal & Celebration**:
   - The "Current Total" snaps from the rolling indicator to the final calculated score (with modifier).
   - The "Faces" chips reveal each die's exact landed number.
   - If any active die landed on **20** ("Natural 20"):
     - Launches celebratory gold/amber confetti via `@/lib/confetti`.
     - Displays a "NATURAL 20! CRITICAL HIT" badge with a golden border and subtle sparkle effect.
   - If any active die landed on **1** ("Critical Fumble"):
     - Highlights with a subtle crimson badge indicating a critical miss.
   - The new roll is appended to the "Recent Roll History" row.

### Visual Identity & Theme Tokens
- **Arena Background**: Radial gradient deep navy/obsidian (`from-[#131524] to-[#080910]`).
- **Result Typography**: Monospace bold numerals (`font-mono font-black text-white text-3xl`) with tabular figures.
- **Rolling Indicator**: Amber/indigo pulsating indicator with smooth fade transition.
- **Natural 20 State**: Amber glow (`border-amber-400 text-amber-300 bg-amber-500/10 shadow-lg shadow-amber-500/20`).
- **Natural 1 State**: Rose subtle warning (`border-rose-400 text-rose-300 bg-rose-500/10`).

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: True Physics Settle vs Pre-computed Synchronous RNG**
  - *Chosen Approach*: Derive outcomes from `settledResults` passed from `DiceScene3D` via `onPhysicsRollComplete`.
  - *Why*: Guarantees that what landed on the 3D camera view is mathematically identical to what is displayed on the score banner.
  - *Alternatives Considered*: Pre-generating random numbers and forcing dice rotation quaternions at the end. Rejected because sudden orientation snapping breaks physical realism and feels rigged to tabletop players.

- **Decision 2: Suspense UI vs Dimmed Previous Result**
  - *Chosen Approach*: Replace current total with an active suspense indicator (`Rolling...`) and clear face chips during roll.
  - *Why*: Prevents user confusion between the old roll and the in-progress roll, while building tabletop excitement.

- **Decision 3: D20 Face Orientation Accuracy Verification**
  - *Chosen Approach*: Audit `detectUpwardFace` and `FaceData` indexing in `diceGeometry.ts` for the icosahedron mesh groups to ensure the mapped texture numeral matches the vertex face normal that computes top dot-product.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────┐
│              DedicatedDiePageComponent                 │
│                                                        │
│  State: isRolling, lastResult, pendingRoll, history    │
└───────────────┬────────────────────────▲───────────────┘
                │                        │
         triggerRoll()           onPhysicsRollComplete(settledResults)
                │                        │
┌───────────────▼────────────────────────┴───────────────┐
│                     DiceScene3D                        │
│                                                        │
│  - Three.js Scene & Camera (Rigid Camera Matrix)       │
│  - Icosahedron Mesh (20 texture materials)             │
│  - requestAnimationFrame render & physics tick loop    │
└───────────────┬────────────────────────▲───────────────┘
                │                        │
       spawnAndThrowDice()         step(dt) -> allSettled
                │                        │
┌───────────────▼────────────────────────┴───────────────┐
│               DicePhysicsEngine (Cannon)               │
│                                                        │
│  - CANNON.ConvexPolyhedron / Body collision            │
│  - detectUpwardFace(quaternion, faces)                 │
│  - Top normal dot-product against Vector3(0, 1, 0)     │
└────────────────────────────────────────────────────────┘
```

### Component & State Changes

1. **`components/dice/DedicatedDiePageComponent.tsx`**:
   - Refactor `triggerRoll`:
     - Sets `isRolling = true`.
     - Clears or sets `pendingRoll = true`.
     - Do NOT update `lastResult`, `currentDice`, or `rollHistory` here.
   - Refactor `handlePhysicsComplete`:
     - Accepts `settledResults: SingleDieResult[]`.
     - Computes kept and dropped dice based on active modifiers, `dropLowest`, and `keepHighest`.
     - Computes `sumKept`, `modifier`, and `total`.
     - Sets `currentDice` with the real settled values.
     - Sets `lastResult` with the new result object.
     - Adds result to `rollHistory`.
     - If `config.sides === 20` and any kept die has `value === 20`, trigger `confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } })`.
     - Sets `isRolling = false`.
   - Update UI JSX:
     - When `isRolling` is true, render a pulsating `Rolling...` badge in the "Current Total" area instead of the stale/spoiled number.
     - In the "Faces" section, show spinning placeholder badges while rolling, then animate the revealed landed numbers.
     - Add a Critical Hit banner when `lastResult` contains a Natural 20.

2. **`components/dice/diceGeometry.ts` & `components/dice/cannonPhysics.ts`**:
   - Audit the face indexing of D20 geometry: verify that each face material index (`geo.addGroup(i, 3, faceIdx)`) corresponds to the exact `localNormal` in `FaceData`.
   - Ensure `detectUpwardFace` returns the identical numeral that is painted on the visible upward-pointing face.
