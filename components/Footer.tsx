'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Compass, Sparkles, BookOpen, Scale, FileText, Globe, HeartHandshake } from 'lucide-react';

interface FooterProps {
  onQuickLink?: (type: string) => void;
}

export default function Footer({ onQuickLink }: FooterProps) {
  return (
    <footer className="w-full bg-[#f4f2fd] dark:bg-[#181922] transition-colors border-t border-[#eeedf7] dark:border-[#222330]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand info (2 cols on large screens) */}
          <div className="lg:col-span-2 flex flex-col gap-4 pr-0 lg:pr-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                  src="/logo.svg"
                  alt="SpinWheelGames Logo"
                  fill
                  className="object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-headline text-[20px] font-extrabold bg-gradient-to-r from-[#4648d4] via-[#6063ee] to-[#7c7fff] bg-clip-text text-transparent">
                SpinWheelGames.org
              </span>
            </Link>

            <p className="text-[14px] text-[#464554] dark:text-[#c7c4d7] max-w-md leading-relaxed">
              The search-first, ad-free random decision engine and custom spinner platform. Engineered for classrooms, live streams, raffles, and team standups with browser-native cryptographic entropy (Web Cryptography API CSPRNG).
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6cf8bb]/30 dark:bg-[#005236] text-[#006c49] dark:text-[#4edea3] text-[11px] font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Hardware-Seeded CSPRNG
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4648d4]/10 dark:bg-[#4648d4]/20 text-[#4648d4] dark:text-[#8587ff] text-[11px] font-bold">
                100% Client-Side Privacy
              </span>
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
                <Link href="/number-wheel" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Random Number Wheel
                </Link>
              </li>
            </ul>
          </div>

          {/* Hubs & Category Collections */}
          <div className="flex flex-col gap-3.5">
            <h3 className="text-[12px] font-bold text-[#1a1b22] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-emerald-500" />
              Wheel Hubs
            </h3>
            <ul className="flex flex-col gap-2.5 text-[13px] text-[#464554] dark:text-[#c7c4d7]">
              <li>
                <Link href="/classroom" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Classroom Student Pickers
                </Link>
              </li>
              <li>
                <Link href="/giveaways" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Giveaways &amp; Prize Draws
                </Link>
              </li>
              <li>
                <Link href="/decisions" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Daily Decision Hub
                </Link>
              </li>
              <li>
                <Link href="/food" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Food &amp; Dining Wheels
                </Link>
              </li>
              <li>
                <Link href="/party" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Party &amp; Icebreaker Games
                </Link>
              </li>
              <li>
                <Link href="/sports" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Sports, Drafts &amp; Teams
                </Link>
              </li>
              <li>
                <Link href="/names" className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors">
                  Rosters &amp; Name Generators
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust, Legal & Company Links */}
          <div className="flex flex-col gap-3.5">
            <h3 className="text-[12px] font-bold text-[#1a1b22] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-amber-500" />
              Trust &amp; Legal
            </h3>
            <ul className="flex flex-col gap-2.5 text-[13px] text-[#464554] dark:text-[#c7c4d7]">
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
              Hardware Entropy Active
            </span>
            <span className="text-[#767586] dark:text-[#908fa1]">Web Crypto CSPRNG</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
