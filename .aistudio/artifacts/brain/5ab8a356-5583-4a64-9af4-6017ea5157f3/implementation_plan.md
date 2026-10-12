# Movie Wheel Spin - Compact & Responsive Layout Overhaul

Redesign and optimize the **Movie Wheel Spin** page (`app/movie-wheel/page.tsx` and `components/movie/MovieWheelEngine.tsx`) to achieve a compact, unified visual rhythm and seamless mobile/desktop responsiveness matching the main home page layout.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following design decisions were confirmed during Phase 1 feedback:
> - **Mobile Viewport Structure**: On small screens, stack the wheel canvas cleanly at the top while tucking options, search filters, and custom lists into a compact, collapsible bottom drawer/accordion panel.
> - **Mobile Sticky Primary Action**: Keep the primary "Spin Wheel" button sticky at the bottom of mobile viewports for instant accessibility without scrolling.

---

## 1. Overview & Core Concept

- **What It Does**: Provides a snappy, interactive wheel spinner for movie selection with customizable genre filters, watch providers, movie lists, and result summaries.
- **Goal**: Standardize page structure, padding ratios, typography scales, card containers, and responsive breakpoint transitions to match the main home page layout (`app/page.tsx`).
- **Key Value**: Delivers zero-clutter viewport presence on both desktop (1440px wide split-grid view) and mobile (compact stacked view with sticky CTA and collapsible drawer).

---

## 2. User Experience & Visual Design

### Key User Flow

1. **Hero & Breadcrumb Arrival**: User arrives at `/movie-wheel` greeted by a clean, single-line breadcrumb, tight hero headline (`text-xl sm:text-3xl`), and 1-sentence description.
2. **Interactive Experience Modes**: Mode selector tabs (`Trending Movies`, `Genre Roulette`, `Decade / Era`, `Custom List`) styled with compact segmented button styling (`p-1 bg-slate-100 dark:bg-[#161726]`).
3. **Wheel Canvas & Controls Split**:
   - **Desktop Layout ($\ge 1024\text{px}$)**: Side-by-side 2-column split (Left: wheel canvas, quick spin button, sound/speed toggles; Right: compact movie source filter panel & selected movie history).
   - **Mobile Layout ($< 1024\text{px}$)**: Vertical stacked flow (Top: focused wheel canvas; Bottom: collapsible filter drawer + sticky floating Spin CTA bar).
4. **Spin Outcome & Details Modal**: Instant winner highlight with poster art, ratings, streaming providers, and quick "Watch Trailer" or "Spin Again" actions.

### Visual Identity & Theme Alignment

- **Aesthetic Direction**: Modern, ultra-clean entertainment web application with dark/light mode balance.
- **Color Palette (60-30-10 Rule)**:
  - **Canvas (60%)**: Light slate background (`#fbf8ff`) or dark navy background (`#0c0d14`).
  - **Surfaces (30%)**: Clean rounded containers (`bg-white` / `dark:bg-[#12131f]`), subtle hairline borders (`border-slate-200` / `dark:border-[#232538]`).
  - **Accent (10%)**: Vibrant purple/indigo brand primary (`bg-purple-600 hover:bg-purple-700`) for spin actions and active tab states.
- **Typography & Hierarchy**: `Plus Jakarta Sans` body type, `tabular-nums` for counts/ratings, zero pill badge sandwiches on static metadata.

---

## 3. Key Technical Decisions & Trade-Offs

1. **Single Responsive Wheel Engine Component**:
   - *Chosen Approach*: Retain the HTML5 canvas-driven `MovieWheelEngine` but introduce responsive CSS container sizing (`max-w-[280px] sm:max-w-[340px] md:max-w-[380px]`) that dynamically scales the canvas logical dimensions.
   - *Why*: Ensures canvas crispness on retina screens while keeping DOM height compact on small devices.

2. **Collapsible Mobile Filter Drawer**:
   - *Chosen Approach*: Use a lightweight Radix/Tailwind collapsible section for the custom movie list and filter inputs on mobile.
   - *Why*: Eliminates endless scrolling on mobile devices so the wheel remains the focal anchor.

3. **15% Mobile Sticky Bar Cap**:
   - *Chosen Approach*: Keep the sticky bottom action bar sleek (`py-2.5 px-4`, height $\approx 56\text{px}$) to respect mobile viewport constraints.

---

## 4. Technical Architecture & Component Structure

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          app/movie-wheel/page.tsx                       │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │ SubpageHeader & Breadcrumbs (Zone 1: Home > Movie Wheel)          │  │
│  ├───────────────────────────────────────────────────────────────────┤  │
│  │ Compact Hero Title & Kicker                                       │  │
│  ├───────────────────────────────────────────────────────────────────┤  │
│  │                      components/movie/MovieWheelEngine            │  │
│  │  ┌─────────────────────────────────┬───────────────────────────┐  │  │
│  │  │ Mode Selector Tabs              │ Custom Item Quick-Add     │  │  │
│  │  ├─────────────────────────────────┼───────────────────────────┤  │  │
│  │  │ Wheel Canvas (280-380px)        │ Filter Pills / Custom List│  │  │
│  │  │ & Spin Button                   │ (Collapsible on Mobile)   │  │  │
│  │  └─────────────────────────────────┴───────────────────────────┘  │  │
│  ├───────────────────────────────────────────────────────────────────┤  │
│  │ Sticky Mobile CTA Bar (Mobile only, z-40)                         │  │
│  ├───────────────────────────────────────────────────────────────────┤  │
│  │ Compact SEO Content Cards & FAQ Accordion                         │  │
│  └───────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Implementation Steps

1. **Update `components/movie/MovieWheelEngine.tsx`**:
   - Tighten outer card padding to `p-3 sm:p-4.5`.
   - Constrain canvas wrapper size to `max-w-[280px] sm:max-w-[340px] md:max-w-[380px]`.
   - Add a mobile collapsible wrapper around the right-side filter/list box (`lg:block`).
   - Implement the sticky bottom spin button bar for screen widths below `lg`.
2. **Update `app/movie-wheel/page.tsx`**:
   - Normalize container width (`max-w-[1440px] px-3.5 sm:px-6`).
   - Adjust spacing between section headers and SEO text cards (`gap-4 sm:gap-6`).
3. **Build & Lint Verification**:
   - Run `lint_applet` and `compile_applet` to ensure zero compilation or syntax issues.
