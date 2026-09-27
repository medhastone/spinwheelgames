import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const markdown = `# SpinWheelGames.org
> Certified Fair Online Decision Spinners, 3D Polyhedral Dice & Interactive Decision Games.

## Overview
SpinWheelGames.org is an open, high-performance web platform featuring 180+ decision-making spinner wheels, physics-driven 3D dice rollers, multi-wheel synchronized battle arenas, and daily quest generators. Built with browser-native Web Crypto CSPRNG (Hardware-grade Cryptographically Secure Pseudo-Random Number Generator) guaranteeing 100% unbiased mathematical fairness.

## Key Features & Capabilities
- **Fair Random Selection**: Web Crypto API \`crypto.getRandomValues()\` with dynamic rejection sampling to eliminate modulo bias.
- **Customizable Spin Wheels**: Add unlimited slices, set custom probability weights (1x-5x), customize themes, and toggle elimination mode.
- **2-Player Wheel Battle Arena**: Simultaneous synchronized dueling wheels with point values (+3, +2, +1, 0, -1), customizable decks, and target score matches.
- **3D Polyhedral Dice System**: WebGL Three.js + Cannon-es rigid-body 3D physics for D&D (d2, d4, d6, d8, d10, d12, d20, d100, 4d6 stat rolling).
- **Daily Global Challenges**: Cryptographically date-seeded daily quest wheels, persistent streak tracking, and shareable victory cards.
- **Classroom, Business & Giveaway Modes**: Dedicated presentation modes with multi-winner pickers and confetti celebrations.

## Core Wheel Tools
- [Homepage Decision Wheel](https://spinwheelgames.org/): Master customizable decision wheel.
- [Daily Challenges](https://spinwheelgames.org/challenges): Synchronized global daily quest & streak tracker.
- [All 180+ Wheel Games Directory](https://spinwheelgames.org/games): Complete explorer for decision wheels.
- [Food Wheel](https://spinwheelgames.org/food-wheel): Meal decider & cuisine picker.
- [Movie Wheel](https://spinwheelgames.org/movie-wheel): Film genre & movie night picker.
- [Number Wheel](https://spinwheelgames.org/number-wheel): Numerical random picker (1-100+).
- [Bingo Caller Wheel](https://spinwheelgames.org/bingo-wheel): 75-ball & 90-ball lottery caller.
- [Animal Wheel](https://spinwheelgames.org/animal-wheel): Safari, ocean, birds & mythical beasts.
- [Classroom Wheel](https://spinwheelgames.org/classroom-wheel): Student name picker with elimination.
- [Drawing Wheel](https://spinwheelgames.org/drawing-wheel): Creative art prompt spinner.
- [Question Wheel](https://spinwheelgames.org/question-wheel): Icebreakers, trivia, and conversation starters.
- [Random Object Generator](https://spinwheelgames.org/random-object-generator): Random item picker for improv and writing.
- [Song Wheel](https://spinwheelgames.org/song-wheel): Music genre & playlist decider.
- [Team Generator Wheel](https://spinwheelgames.org/team-generator): Fair random group divider.
- [Theme Wheel](https://spinwheelgames.org/theme-wheel): Party, event, and aesthetic picker.

## 3D Dice Tools
- [3D Dice Roller](https://spinwheelgames.org/dice-roller): Full 3D tabletop dice physics simulator.
- [D&D 5e Stat Roller](https://spinwheelgames.org/dnd-stat-roller): 4d6 drop-lowest ability score generator.
- [Dice Average Calculator](https://spinwheelgames.org/dice-average-calculator): Probability distribution and EV calculator.
- [Dice Collection](https://spinwheelgames.org/dice-collection): Polyhedral dice reference guide.

## Mathematical Fairness & Security
- [Fairness Certification & Verification](https://spinwheelgames.org/fairness): Cryptographic randomness verification and seed audit tools.

## Sitemaps & Feeds
- XML Index: https://spinwheelgames.org/sitemap.xml
- Tools XML: https://spinwheelgames.org/sitemaps/tools.xml
- Categories XML: https://spinwheelgames.org/sitemaps/categories.xml
- Guides XML: https://spinwheelgames.org/sitemaps/guides.xml
`;

  return new NextResponse(markdown, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400'
    }
  });
}
