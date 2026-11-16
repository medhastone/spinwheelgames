'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BrandLogo from '@/components/BrandLogo';
import {
  Layers,
  Sparkles,
  BookOpen,
  Dices,
  Compass,
  Grid
} from 'lucide-react';
import { SITE_CONFIG } from '@/lib/siteConfig';

const PLATFORM_HUBS = [
  { href: '/games', label: `All ${SITE_CONFIG.counts.wheelsFormatted} Wheel Games Hub` },
  { href: '/categories', label: `Browse All Categories (${SITE_CONFIG.counts.categories})` },
  { href: '/dice-collection', label: '3D RPG Dice Collection' },
  { href: '/challenges', label: 'Interactive Wheel Challenges' },
  { href: '/sitemap', label: 'Complete Site Directory' },
];

const FLAGSHIP_WHEELS = [
  { href: '/', label: 'Spin the Wheel (Home)' },
  { href: '/wheel-of-names', label: 'Wheel of Names' },
  { href: '/yes-or-no-wheel', label: 'Yes or No Wheel' },
  { href: '/decision-wheel', label: 'Decision Maker Wheel' },
  { href: '/giveaway-wheel', label: 'Giveaway & Winner Picker' },
  { href: '/comment-picker', label: 'Random Comment Picker' },
  { href: '/number-wheel', label: 'Random Number Wheel' },
  { href: '/1-100-wheel', label: '1–100 Number Wheel' },
  { href: '/classroom-wheel', label: 'Classroom Student Picker' },
  { href: '/team-generator', label: 'Random Team Generator' },
];

const ACTIVITY_WHEELS = [
  { href: '/food-wheel', label: 'Food & Dining Chooser' },
  { href: '/dinner-wheel', label: 'Dinner Decider Wheel' },
  { href: '/what-should-i-eat', label: 'What Should I Eat Wheel' },
  { href: '/movie-wheel', label: 'Movie & Film Picker Wheel' },
  { href: '/animal-wheel', label: 'Animal Spin Wheel' },
  { href: '/pokemon-wheel', label: 'Random Pokémon Generator' },
  { href: '/truth-or-dare-wheel', label: 'Truth or Dare Wheel' },
  { href: '/question-wheel', label: 'Question & Icebreaker Wheel' },
  { href: '/random-game-picker', label: 'Random Game Picker' },
  { href: '/bingo-wheel', label: 'Bingo Number Caller' },
];

const CREATIVE_GENERATORS = [
  { href: '/drawing-wheel', label: 'Drawing Prompts Generator' },
  { href: '/color-wheel', label: 'Random Color Wheel' },
  { href: '/word-spinner', label: 'Random Word Spinner' },
  { href: '/random-object-generator', label: 'Random Object Generator' },
  { href: '/random-category-generator', label: 'Random Category Generator' },
  { href: '/random-app-picker', label: 'Random App Picker' },
  { href: '/theme-wheel', label: 'Theme & Aesthetic Wheel' },
  { href: '/song-wheel', label: 'Karaoke & Song Picker' },
  { href: '/birthday-wheel', label: 'Birthday Wheel Decider' },
  { href: '/stream-wheel', label: 'OBS Streamer Overlay Wheel' },
];

const DICE_TOOLS = [
  { href: '/dice-roller', label: '3D Interactive Dice Roller' },
  { href: '/dnd-stat-roller', label: 'D&D 5e Stat Roller' },
  { href: '/roll-4d6', label: 'Roll 4d6 (Drop Lowest)' },
  { href: '/dice-average-calculator', label: 'Dice Average Calculator' },
  { href: '/unusual-dice', label: 'Unusual & Odd-Sided Dice' },
  { href: '/dice/d20', label: 'Roll a D20 (Icosahedron)' },
  { href: '/dice/d6', label: 'Roll a D6 (Six-Sided)' },
  { href: '/dice/d100', label: 'Roll a D100 (Percentile)' },
  { href: '/roll-3d6', label: 'Roll 3d6 (Bell Curve)' },
  { href: '/roll-2d12', label: 'Roll 2d12 (Duality Dice)' },
];

const CATEGORY_LINKS = [
  { href: '/decisions', label: 'Decisions' },
  { href: '/names', label: 'Names' },
  { href: '/classroom', label: 'Classroom' },
  { href: '/party', label: 'Party' },
  { href: '/food', label: 'Food & Dining' },
  { href: '/gaming', label: 'Gaming' },
  { href: '/sports', label: 'Sports' },
  { href: '/numbers', label: 'Numbers' },
  { href: '/workout', label: 'Workout' },
  { href: '/travel', label: 'Travel' },
  { href: '/giveaways', label: 'Giveaways' },
  { href: '/creativity', label: 'Creativity' },
  { href: '/productivity', label: 'Productivity' },
  { href: '/wellness', label: 'Wellness' },
  { href: '/date-night', label: 'Date Night' },
  { href: '/icebreakers', label: 'Icebreakers' },
  { href: '/finance', label: 'Finance' },
];

const POLYHEDRAL_DICE_LINKS = [
  { href: '/dice/d2', label: 'd2 Coin' },
  { href: '/roll-d3', label: 'd3' },
  { href: '/dice/d4', label: 'd4' },
  { href: '/dice/d6', label: 'd6' },
  { href: '/dice/d8', label: 'd8' },
  { href: '/dice/d10', label: 'd10' },
  { href: '/dice/d12', label: 'd12' },
  { href: '/dice/d20', label: 'd20' },
  { href: '/dice/d100', label: 'd100' },
  { href: '/roll-3d6', label: '3d6' },
  { href: '/roll-4d6', label: '4d6' },
  { href: '/roll-5d6', label: '5d6' },
  { href: '/roll-2d12', label: '2d12' },
];

const GUIDE_LINKS = [
  { href: '/how-to-use-a-wheel', label: 'How to Use a Wheel' },
  { href: '/how-random-wheels-work', label: 'How Random Wheels Work' },
  { href: '/how-to-pick-a-random-winner', label: 'How to Pick a Random Winner' },
  { href: '/random-vs-weighted-selection', label: 'Random vs. Weighted Slices' },
  { href: '/how-to-make-a-classroom-wheel', label: 'Classroom Wheel Best Practices' },
  { href: '/stream-wheel', label: 'OBS Streamer Mode Guide', highlight: true },
];

const LEGAL_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/fairness', label: 'Fairness & CSPRNG' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/accessibility', label: 'Accessibility' },
  { href: '/contact', label: 'Contact' },
  { href: '/sitemap', label: 'Sitemap' },
];

export default function Footer({
  onQuickLink,
}: {
  onQuickLink?: (type: string) => void;
}) {
  void onQuickLink;
  const pathname = usePathname();

  // Hide global footer on chromeless embed widgets and mobile stream controller deck
  if (pathname?.startsWith('/embed') || pathname?.startsWith('/stream-control')) {
    return null;
  }

  return (
    <footer className="w-full bg-[#f4f2fd] dark:bg-[#12131a] border-t border-[#eeedf7] dark:border-[#222330] pt-12 sm:pt-16 pb-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Main 5-Column Global Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {/* Column 1: Brand Info & Platform Hubs */}
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <BrandLogo />
            <p className="text-[13px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
              Fast, accessible, client-side random decision tools for teachers, streamers, teams, and organizers. Powered by browser Web Crypto entropy.
            </p>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Web Crypto CSPRNG
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#4648d4]/10 text-[#4648d4] dark:text-[#8587ff] text-[11px] font-semibold border border-[#4648d4]/20">
                100% Client-Side
              </span>
            </div>
            <div className="pt-2 border-t border-[#e3e1ec] dark:border-[#222330]">
              <h3 className="text-[11px] font-bold text-[#1a1b22] dark:text-white uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                <Compass className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
                Platform Directories
              </h3>
              <ul className="flex flex-col gap-1.5 text-[12.5px] text-[#464554] dark:text-[#c7c4d7]">
                {PLATFORM_HUBS.map((item) => (
                  <li key={item.href}>
                    <Link
                      prefetch={false}
                      href={item.href}
                      className="hover:text-[#4648d4] dark:hover:text-[#8587ff] font-medium transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 2: Flagship & Decision Wheels */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[12px] font-bold text-[#1a1b22] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
              Flagship Wheel Tools
            </h3>
            <ul className="flex flex-col gap-2 text-[13px] text-[#464554] dark:text-[#c7c4d7]">
              {FLAGSHIP_WHEELS.map((item) => (
                <li key={item.href}>
                  <Link
                    prefetch={false}
                    href={item.href}
                    className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Popular Activity & Theme Wheels */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[12px] font-bold text-[#1a1b22] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
              Activity &amp; Party Wheels
            </h3>
            <ul className="flex flex-col gap-2 text-[13px] text-[#464554] dark:text-[#c7c4d7]">
              {ACTIVITY_WHEELS.map((item) => (
                <li key={item.href}>
                  <Link
                    prefetch={false}
                    href={item.href}
                    className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Creative & Specialty Generators */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[12px] font-bold text-[#1a1b22] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Grid className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
              Creative &amp; Generators
            </h3>
            <ul className="flex flex-col gap-2 text-[13px] text-[#464554] dark:text-[#c7c4d7]">
              {CREATIVE_GENERATORS.map((item) => (
                <li key={item.href}>
                  <Link
                    prefetch={false}
                    href={item.href}
                    className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: 3D Dice & Tabletop Tools */}
          <div className="flex flex-col gap-3">
            <h3 className="text-[12px] font-bold text-[#1a1b22] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Dices className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
              3D Dice &amp; Tabletop
            </h3>
            <ul className="flex flex-col gap-2 text-[13px] text-[#464554] dark:text-[#c7c4d7]">
              {DICE_TOOLS.map((item) => (
                <li key={item.href}>
                  <Link
                    prefetch={false}
                    href={item.href}
                    className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Global Taxonomy Rows: Categories, Polyhedral Dice & Guides */}
        <div className="border-t border-[#e3e1ec] dark:border-[#222330] pt-6 space-y-4 text-xs text-[#767586] dark:text-[#918f9e]">
          {/* Categories Row */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="font-bold text-[#1a1b22] dark:text-white flex items-center gap-1 shrink-0">
              <Layers className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
              Categories:
            </span>
            {CATEGORY_LINKS.map((cat, idx) => (
              <React.Fragment key={cat.href}>
                {idx > 0 && <span className="text-[#c7c4d7] dark:text-[#313345]">•</span>}
                <Link
                  prefetch={false}
                  href={cat.href}
                  className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors"
                >
                  {cat.label}
                </Link>
              </React.Fragment>
            ))}
          </div>

          {/* Polyhedral Dice Quick-Links Row */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="font-bold text-[#1a1b22] dark:text-white flex items-center gap-1 shrink-0">
              <Dices className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
              Roll Dice:
            </span>
            {POLYHEDRAL_DICE_LINKS.map((die, idx) => (
              <React.Fragment key={die.href}>
                {idx > 0 && <span className="text-[#c7c4d7] dark:text-[#313345]">•</span>}
                <Link
                  prefetch={false}
                  href={die.href}
                  className="hover:text-[#4648d4] dark:hover:text-[#8587ff] font-mono transition-colors"
                >
                  {die.label}
                </Link>
              </React.Fragment>
            ))}
          </div>

          {/* Educational Guides Row */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="font-bold text-[#1a1b22] dark:text-white flex items-center gap-1 shrink-0">
              <BookOpen className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
              Guides:
            </span>
            {GUIDE_LINKS.map((guide, idx) => (
              <React.Fragment key={guide.href}>
                {idx > 0 && <span className="text-[#c7c4d7] dark:text-[#313345]">•</span>}
                <Link
                  prefetch={false}
                  href={guide.href}
                  className={
                    guide.highlight
                      ? 'font-semibold text-emerald-600 dark:text-emerald-400 hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors'
                      : 'hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors'
                  }
                >
                  {guide.label}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Bottom Copyright & Legal Bar */}
        <div className="pt-2 flex flex-col lg:flex-row items-center justify-between gap-4 bg-[#eeedf7] dark:bg-[#1d1e28] rounded-2xl px-5 py-4 border border-[#e3e1ec] dark:border-[#292a39]">
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-4 text-center sm:text-left">
            <p className="text-[12px] text-[#464554] dark:text-[#c7c4d7]">
              © 2026 {SITE_CONFIG.fullBrandName}. All rights reserved.
            </p>
            <span className="hidden sm:inline text-gray-300 dark:text-gray-600">|</span>
            <nav aria-label="Legal and platform links" className="flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1.5 text-[12px]">
              {LEGAL_LINKS.map((item) => (
                <Link
                  key={item.href}
                  prefetch={false}
                  href={item.href}
                  className="text-[#464554] dark:text-[#c7c4d7] hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3 text-[11px] sm:text-[12px] text-[#464554] dark:text-[#c7c4d7] shrink-0">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#006c49] dark:bg-[#4edea3] animate-pulse" />
              Fair Random Selection
            </span>
            <span className="text-[#767586] dark:text-[#908fa1]">Web Crypto CSPRNG</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
