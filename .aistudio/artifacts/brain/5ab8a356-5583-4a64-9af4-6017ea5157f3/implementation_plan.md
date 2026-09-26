# Action SEO H1 Titles Standardization for All Dice Pages

Standardize all page H1 titles across all single-dice, multi-dice, custom-dice, and specialty dice pages to follow high-intent Action SEO naming conventions (e.g., `Roll D20 Online - 3D Dice Roller`).

## User Review & Critical Decisions

> [!IMPORTANT]
> The user confirmed the Action SEO naming convention across all single and multi-dice pages.

- **Confirmed Choice 1**: Naming format -> Action SEO (e.g. `Roll D20 Online - 3D Dice Roller`, `Roll 2 D6 Online - 3D Multi-Dice Roller`).
- **Confirmed Choice 2**: Scope -> Applied across all single-dice, multi-dice, custom-dice, and specialty dice pages.

## 1. Overview & Core Concept

- **What It Does**: Updates all `<h1>` title elements across all dice page views to include actionable keywords ("Roll [Dice] Online") and descriptive descriptors ("3D Dice Roller", "3D Multi-Dice Roller").
- **Target Audience / Persona**: Users searching search engines for specific online dice rollers (e.g., D20, D100, 4d6 drop lowest, DnD stat rollers, 2d12, d3, custom polyhedral dice).
- **Key Value**: Boosts organic search engine visibility (SEO) while presenting clear, intuitive headings for players.

## 2. User Experience & Visual Design

- **Visual Identity & Theme**:
  - Headings maintain standard typography hierarchy with styled gradient accents or clear high-contrast text.
  - Headings remain fully responsive on mobile, tablet, and desktop views without line overflowing.
- **Interactive Consistency**:
  - Both dedicated dice routes (e.g. `/d20`, `/d100`, `/roll-4d6`, `/roll-2d12`, `/dice/d20`) and dynamic fallback routes display standardized titles matching their metadata.

## 3. Key Product Decisions & Trade-Offs

- **Standardized H1 Formatting**:
  - Single dice: `Roll D[X] Online - 3D Dice Roller`
  - Multi dice: `Roll [N] D[X] Online - 3D Multi-Dice Roller`
  - Specialty dice (e.g. DnD Stat Roller): `Roll D&D Stats Online - 4d6 Drop Lowest & Point Buy`
  - Unusual / Custom dice: `Roll Unusual Dice Online - Custom Polyhedral Roller`
  - Dice Average Calculator: `Dice Average Calculator Online - Probability & Expected Value`

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────┐
│                      Dice Pages                        │
│  (Single / Multi / Custom / Specialty Routes & Slugs)  │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│                   H1 Title Provider                    │
│   (DiePageConfigs / Supported Slugs / Dedicated Views)  │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│                    Rendered Layout                     │
│    (Action SEO Header: "Roll D20 Online - 3D Roller")  │
└───────────────────────────┬────────────────────────────┘
```

- **Data Models**: `diePageConfigs.ts`, `app/dice/[slug]/page.tsx`, and dedicated route page files.
- **Verification**: Verified via `compile_applet` to ensure type safety and error-free build.
