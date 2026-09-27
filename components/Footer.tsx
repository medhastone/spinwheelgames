'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Compass,
  Sparkles,
  BookOpen,
  Scale,
  FileText,
  Globe,
  HeartHandshake,
  Facebook,
  Instagram,
  Twitter,
  Pin
} from 'lucide-react';

interface FooterProps {
  onQuickLink?: (type: string) => void;
}

export default function Footer({ onQuickLink }: FooterProps) {
  return (
    <footer className="w-full bg-[#f4f2fd] dark:bg-[#181922] transition-colors border-t border-[#eeedf7] dark:border-[#222330]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand info (2 cols on large screens) */}
          <div className="lg:col-span-2 flex flex-col gap-5 pr-0 lg:pr-6">
            <Link href="/" className="inline-flex items-center group transition-transform hover:scale-[1.02] active:scale-[0.98]">
              <div className="relative h-16 sm:h-20 w-auto flex items-center">
                <Image
                  src="/spinwheel-logo-v2.webp"
                  alt="SpinWheelGames Logo"
                  width={320}
                  height={84}
                  className="h-15 sm:h-18 lg:h-20 w-auto object-contain max-h-[76px] dark:drop-shadow-[0_0_16px_rgba(133,135,255,0.45)] dark:brightness-110"
                  unoptimized
                  referrerPolicy="no-referrer"
                />
              </div>
            </Link>

            <p className="text-[14px] text-[#464554] dark:text-[#c7c4d7] max-w-md leading-relaxed">
              Free wheel games and random pickers for everyday decisions, classrooms, parties, teams and giveaways. Built with browser-native certified fair random selection.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6cf8bb]/30 dark:bg-[#005236] text-[#006c49] dark:text-[#4edea3] text-[11px] font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% Fair Randomness
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4648d4]/10 dark:bg-[#4648d4]/20 text-[#4648d4] dark:text-[#8587ff] text-[11px] font-bold">
                No Signup Required
              </span>
            </div>

            {/* Follow Us Social Media Section */}
            <div className="flex flex-col gap-2.5 pt-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#1a1b22] dark:text-white flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
                <span>Follow Us</span>
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/spinwheelgamesorg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow SpinWheelGames on Meta / Facebook"
                  title="Meta (Facebook)"
                  className="w-10 h-10 rounded-2xl bg-white dark:bg-[#20212d] border border-slate-200 dark:border-slate-800 flex items-center justify-center text-[#464554] dark:text-[#c7c4d7] hover:text-[#1877f2] hover:border-[#1877f2]/50 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all shadow-xs hover:scale-105"
                >
                  <Facebook className="w-4 h-4" />
                </a>

                <a
                  href="https://www.instagram.com/spinwheelgames"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow SpinWheelGames on Instagram"
                  title="Instagram"
                  className="w-10 h-10 rounded-2xl bg-white dark:bg-[#20212d] border border-slate-200 dark:border-slate-800 flex items-center justify-center text-[#464554] dark:text-[#c7c4d7] hover:text-[#e4405f] hover:border-[#e4405f]/50 hover:bg-pink-50 dark:hover:bg-pink-950/30 transition-all shadow-xs hover:scale-105"
                >
                  <Instagram className="w-4 h-4" />
                </a>

                <a
                  href="https://x.com/spinwheelgames"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow SpinWheelGames on X"
                  title="X (formerly Twitter)"
                  className="w-10 h-10 rounded-2xl bg-white dark:bg-[#20212d] border border-slate-200 dark:border-slate-800 flex items-center justify-center text-[#464554] dark:text-[#c7c4d7] hover:text-black dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shadow-xs hover:scale-105"
                >
                  <Twitter className="w-4 h-4" />
                </a>

                <a
                  href="https://in.pinterest.com/spinwheelgames/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow SpinWheelGames on Pinterest"
                  title="Pinterest"
                  className="w-10 h-10 rounded-2xl bg-white dark:bg-[#20212d] border border-slate-200 dark:border-slate-800 flex items-center justify-center text-[#464554] dark:text-[#c7c4d7] hover:text-[#e60023] hover:border-[#e60023]/50 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all shadow-xs hover:scale-105"
                >
                  <Pin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Core Decision Tools */}
          <div className="flex flex-col gap-3.5">
            <h3 className="text-[12px] font-bold text-[#1a1b22] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
              Popular Tools
            </h3>
            <ul className="flex flex-col gap-2.5 text-[13px] text-[#464554] dark:text-[#c7c4d7]">
              <li>
                <Link href="/spin-the-wheel" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Spin the Wheel
                </Link>
              </li>
              <li>
                <Link href="/wheel-of-names" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Wheel of Names
                </Link>
              </li>
              <li>
                <Link href="/random-picker" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Random Picker Wheel
                </Link>
              </li>
              <li>
                <Link href="/yes-or-no-wheel" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Yes or No Wheel
                </Link>
              </li>
              <li>
                <Link href="/decision-wheel" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Decision Maker Wheel
                </Link>
              </li>
              <li>
                <Link href="/picker-wheel" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Picker Wheel
                </Link>
              </li>
              <li>
                <Link href="/movie-wheel" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors font-medium">
                  Movie Wheel Spin
                </Link>
              </li>
              <li>
                <Link href="/food-wheel" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors font-medium">
                  Food Wheel (What to Eat)
                </Link>
              </li>
              <li>
                <Link href="/random-object-generator" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors font-medium">
                  Random Object Generator
                </Link>
              </li>
              <li>
                <Link href="/animal-wheel" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors font-medium">
                  Animal Spin the Wheel
                </Link>
              </li>
              <li>
                <Link href="/number-wheel" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors font-medium">
                  Random Number Wheel
                </Link>
              </li>
              <li>
                <Link href="/bingo-wheel" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors font-medium">
                  Bingo Wheel 1-75 Caller
                </Link>
              </li>
            </ul>
          </div>

          {/* Specialized Multi-Engine Modes */}
          <div className="flex flex-col gap-3.5">
            <h3 className="text-[12px] font-bold text-[#1a1b22] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
              Special Game Modes
            </h3>
            <ul className="flex flex-col gap-2.5 text-[13px] text-[#464554] dark:text-[#c7c4d7]">
              <li>
                <Link href="/challenges" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors font-medium flex items-center gap-1">
                  <span>Daily Wheel Challenges</span>
                  <span className="text-[10px] bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold px-1.5 py-0.2 rounded-md">New</span>
                </Link>
              </li>
              <li>
                <Link href="/dice-collection" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors font-medium">
                  3D Polyhedral Dice Collection
                </Link>
              </li>
              <li>
                <Link href="/dice/d20" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  D20 Critical Hit Roller
                </Link>
              </li>
              <li>
                <Link href="/roll-4d6" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Roll 4d6 Drop Lowest
                </Link>
              </li>
              <li>
                <Link href="/dnd-stats" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  D&amp;D 5e Stat Roller
                </Link>
              </li>
              <li>
                <Link href="/dice-average" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Dice Average Calculator
                </Link>
              </li>
              <li>
                <Link href="/drawing-wheel" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Drawing Prompts Generator
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
                <Link href="/song-wheel" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Karaoke &amp; Song Picker
                </Link>
              </li>
              <li>
                <Link href="/question-wheel" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Question &amp; Icebreaker Wheel
                </Link>
              </li>
              <li>
                <Link href="/theme-wheel" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Party Theme Chooser
                </Link>
              </li>
            </ul>
          </div>

          {/* Directory & Policies */}
          <div className="flex flex-col gap-3.5">
            <h3 className="text-[12px] font-bold text-[#1a1b22] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
              Platform &amp; Legal
            </h3>
            <ul className="flex flex-col gap-2.5 text-[13px] text-[#464554] dark:text-[#c7c4d7]">
              <li>
                <Link href="/games" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors font-medium">
                  All 180+ Wheel Games Hub
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors font-medium">
                  Browse by Category
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors font-medium">
                  About SpinWheelGames
                </Link>
              </li>
              <li>
                <Link href="/fairness" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors font-medium flex items-center gap-1">
                  <span>Fairness &amp; Entropy (CSPRNG)</span>
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors font-medium">
                  Accessibility Statement
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors font-medium">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors font-medium">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors font-medium">
                  Contact &amp; Support
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors font-medium">
                  HTML Directory Sitemap
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
              © {new Date().getFullYear()} SpinWheelGames.org. All rights reserved.
            </p>
            <span className="hidden sm:inline text-gray-300 dark:text-gray-600">|</span>
            <div className="flex items-center gap-3 text-[12px]">
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
