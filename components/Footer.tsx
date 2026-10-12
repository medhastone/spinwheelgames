'use client';

import React from 'react';
import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';
import {
  Layers,
  FileText,
  BookOpen,
  Dices
} from 'lucide-react';
import { SITE_CONFIG } from '@/lib/siteConfig';

export default function Footer({ onQuickLink }: { onQuickLink?: (type: string) => void }) {
  return (
    <footer className="w-full bg-[#f4f2fd] dark:bg-[#12131a] border-t border-[#eeedf7] dark:border-[#222330] pt-12 sm:pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Grid Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand Info & Mission */}
          <div className="flex flex-col gap-4">
            <BrandLogo />
            <p className="text-[13px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
              Fast, accessible, client-side random decision tools for teachers, streamers, teams, and organizers. Designed to minimize data collection with browser Web Crypto entropy.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Web Crypto CSPRNG
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#4648d4]/10 text-[#4648d4] dark:text-[#8587ff] text-[11px] font-semibold border border-[#4648d4]/20">
                100% Client-Side
              </span>
            </div>
          </div>

          {/* Popular Wheel Categories (8 items) */}
          <div className="flex flex-col gap-3.5">
            <h3 className="text-[12px] font-bold text-[#1a1b22] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
              Popular Wheel Tools
            </h3>
            <ul className="flex flex-col gap-2 text-[13px] text-[#464554] dark:text-[#c7c4d7]">
              <li>
                <Link href="/number-wheel" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Random Number Wheel Generator
                </Link>
              </li>
              <li>
                <Link href="/animal-wheel" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Animal Spin Wheel
                </Link>
              </li>
              <li>
                <Link href="/pokemon-wheel" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Random Pokémon Generator
                </Link>
              </li>
              <li>
                <Link href="/food-wheel" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Food &amp; Dining Chooser
                </Link>
              </li>
              <li>
                <Link href="/movie-wheel" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Movie &amp; Film Picker Wheel
                </Link>
              </li>
              <li>
                <Link href="/classroom-wheel" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Classroom Student Picker
                </Link>
              </li>
              <li>
                <Link href="/team-generator" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Random Team Generator
                </Link>
              </li>
              <li>
                <Link href="/bingo-wheel" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Bingo Number Caller
                </Link>
              </li>
            </ul>
          </div>

          {/* Tabletop & Utilities (8 items) */}
          <div className="flex flex-col gap-3.5">
            <h3 className="text-[12px] font-bold text-[#1a1b22] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Dices className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
              Dice &amp; Decision Tools
            </h3>
            <ul className="flex flex-col gap-2 text-[13px] text-[#464554] dark:text-[#c7c4d7]">
              <li>
                <Link href="/dice-roller" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  3D Interactive Dice Roller
                </Link>
              </li>
              <li>
                <Link href="/roll-4d6" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Roll 4d6 (Drop Lowest)
                </Link>
              </li>
              <li>
                <Link href="/dnd-stat-roller" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  D&amp;D 5e Stat Roller
                </Link>
              </li>
              <li>
                <Link href="/dice-average-calculator" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Dice Average Calculator
                </Link>
              </li>
              <li>
                <Link href="/drawing-wheel" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Drawing Prompts Generator
                </Link>
              </li>
              <li>
                <Link href="/question-wheel" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Question &amp; Icebreaker Wheel
                </Link>
              </li>
              <li>
                <Link href="/song-wheel" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Karaoke &amp; Song Picker
                </Link>
              </li>
              <li>
                <Link href="/birthday-wheel" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Birthday Wheel &amp; Party Decider
                </Link>
              </li>
            </ul>
          </div>

          {/* Directory & Policies (8 items) */}
          <div className="flex flex-col gap-3.5">
            <h3 className="text-[12px] font-bold text-[#1a1b22] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
              Platform &amp; Legal
            </h3>
            <ul className="flex flex-col gap-2 text-[13px] text-[#464554] dark:text-[#c7c4d7]">
              <li>
                <Link href="/about" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  About {SITE_CONFIG.brandName}
                </Link>
              </li>
              <li>
                <Link href="/games" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  All {SITE_CONFIG.counts.wheelsFormatted} Wheel Games Hub
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Browse by Category ({SITE_CONFIG.counts.categories})
                </Link>
              </li>
              <li>
                <Link href="/fairness" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Fairness &amp; Randomness (CSPRNG)
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Accessibility Statement
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Contact &amp; Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Educational Guides and Direct Sub-links */}
        <div className="border-t border-[#eeedf7] dark:border-[#222330] pt-6 flex flex-wrap items-center gap-x-4 gap-y-2.5 text-xs text-[#767586] dark:text-[#918f9e]">
          <span className="font-bold text-[#1a1b22] dark:text-white flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-[#4648d4]" />
            Guides:
          </span>
          <Link href="/how-to-use-a-wheel" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
            How to Use a Wheel
          </Link>
          <span>•</span>
          <Link href="/how-random-wheels-work" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
            How Random Wheels Work
          </Link>
          <span>•</span>
          <Link href="/how-to-pick-a-random-winner" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
            How to Pick a Random Winner
          </Link>
          <span>•</span>
          <Link href="/random-vs-weighted-selection" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
            Random vs. Weighted Slices
          </Link>
          <span>•</span>
          <Link href="/how-to-make-a-classroom-wheel" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
            Classroom Wheel Best Practices
          </Link>
        </div>

        {/* Bottom bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#eeedf7] dark:bg-[#1d1e28] rounded-2xl px-5 py-4 border border-[#e3e1ec] dark:border-[#292a39]">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p className="text-[12px] text-[#464554] dark:text-[#c7c4d7]">
              © {new Date().getFullYear()} {SITE_CONFIG.fullBrandName}. All rights reserved.
            </p>            <span className="hidden sm:inline text-gray-300 dark:text-gray-600">|</span>
            <div className="flex items-center gap-3 text-[12px]">
              <Link href="/about" className="text-[#464554] dark:text-[#c7c4d7] hover:text-[#4648d4] dark:hover:text-[#8587ff] font-medium">
                About
              </Link>
              <Link href="/privacy" className="text-[#464554] dark:text-[#c7c4d7] hover:text-[#4648d4] dark:hover:text-[#8587ff]">
                Privacy
              </Link>
              <Link href="/terms" className="text-[#464554] dark:text-[#c7c4d7] hover:text-[#4648d4] dark:hover:text-[#8587ff]">
                Terms
              </Link>
              <Link href="/fairness" className="text-[#464554] dark:text-[#c7c4d7] hover:text-[#4648d4] dark:hover:text-[#8587ff]">
                Fairness
              </Link>
              <Link href="/accessibility" className="text-[#464554] dark:text-[#c7c4d7] hover:text-[#4648d4] dark:hover:text-[#8587ff]">
                Accessibility
              </Link>
              <Link href="/contact" className="text-[#464554] dark:text-[#c7c4d7] hover:text-[#4648d4] dark:hover:text-[#8587ff]">
                Contact
              </Link>
              <Link href="/sitemap" className="text-[#464554] dark:text-[#c7c4d7] hover:text-[#4648d4] dark:hover:text-[#8587ff]">
                Sitemap
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[11px] sm:text-[12px] text-[#464554] dark:text-[#c7c4d7]">
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
