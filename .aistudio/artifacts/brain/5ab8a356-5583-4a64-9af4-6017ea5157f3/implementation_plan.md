# Implementation Plan: Comprehensive Mobile Device Compatibility Audit & Optimization

## 1. Goal & Viewport Targets
Audit and optimize all application pages for seamless mobile device performance (iPhone SE 375px, iPhone 14/15/16 390px-430px, Android 360px-412px, iPad/Tablets 768px-1024px). Guarantee:
- Zero horizontal screen overflow / scrolling.
- Responsive canvas scaling with high-DPI crispness.
- Touch-optimized target heights ($\ge 44\text{px}$) and thumb-friendly button placement.
- Clean text wrapping, fluid font sizes, and collapsible/scrolling control drawers.

---

## 2. Key Areas to Audit & Refine

### A. Homepage & Multiplayer Engines (`app/page.tsx`, `components/`)
1. **`WheelBattleEngine.tsx`**:
   - Optimize wheel container scaling: `w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[460px]` with fluid aspect-ratio so both wheels fit cleanly on mobile when stacked.
   - Mobile score cards: Wrap score counters and action badges seamlessly without truncating.
   - Customizer drawer: Use 1-column layout on mobile with touch-friendly input fields and weight dropdowns.
2. **`ClassroomModeView`, `GiveawayModeView`, `MultiWheelEngine`, `TournamentEngine`**:
   - Verify all tab bars, bracket cards, and control panels wrap or scroll horizontally with `touch-pan-x`.
   - Ensure sticky action buttons remain accessible without obscuring content.

### B. Dedicated Spin Wheel Game Subpages (`app/*-wheel/page.tsx`, `components/food/`, etc.)
1. **Wheel Engines & Presets**:
   - Responsive canvas dimensions on mobile viewports.
   - Preset chips & category tags: Smooth horizontal swiping (`overflow-x-auto no-scrollbar`).
   - Winner modals & Result cards: Centered popups with `max-w-[92vw]` and scrollable content if text is long.
2. **Educational Content & FAQ Sections**:
   - Ensure tables (e.g., probability tables, nutritional breakdowns) use `overflow-x-auto` wrapper with touch scrolling indicator.
   - Accordions and FAQ entities toggle smoothly on tap.

### C. Polyhedral 3D Dice Pages (`app/dice/[slug]`, `app/4d6`, `app/dnd-stats`, `app/dice-average`, `app/dice-roller`)
1. **3D WebGL Canvas (`DiceScene3D.tsx`)**:
   - Adaptive viewport height (`h-[280px] sm:h-[360px] md:h-[420px]`) so the "ROLL DICE" CTA stays in thumb reach.
   - Touch drag rotation and tap-to-roll gestures.
2. **Dice Hub Sticky Navigation (`DiceNavigation.tsx`)**:
   - Verify drag-to-scroll, touch swipe, and active tab centering work flawlessly on mobile screens.
3. **Stat Grid & Probability Charts (`DndStatRollerComponent`, `dice-average`)**:
   - Responsive 2-column or 1-column grid on small phones so ability score cards (STR, DEX, CON, INT, WIS, CHA) render with clear typography.

---

## 3. Verification Plan
- **Build Verification**: Run `compile_applet` and `lint_applet` to confirm 100% clean build.
- **Responsive Inspection**: Verify layout across CSS breakpoints (`sm: 640px`, `md: 768px`, `lg: 1024px`, and mobile `<400px`).
