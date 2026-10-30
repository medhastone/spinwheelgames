import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import DirectAnswer from '@/components/DirectAnswer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { CATEGORY_METADATA } from '@/lib/wheelLibrary';
import {

  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ThumbsUp,
  UserCheck,
  GraduationCap,
  PartyPopper,
  Utensils,
  Film,
  Gamepad2,
  Trophy,
  Hash,
  Dumbbell,
  Compass,
  Gift,
  PenTool,
  Heart,
  Users,
  PiggyBank
} from 'lucide-react';

export const dynamic = 'force-static';


export const metadata: Metadata = {
  "title": "All Wheel Categories & Decision Games | SpinWheelGames",
  "description": "Browse all 18+ wheel categories and 106+ vetted random pickers, classroom tools, party games, decision wheels, and probability spinners.",
  "alternates": {
    "canonical": "https://spinwheelgames.org/categories"
  },
  "openGraph": {
    "title": "All Wheel Categories & Decision Games | SpinWheelGames",
    "description": "Browse all 18+ wheel categories and 106+ vetted random pickers, classroom tools, party games, decision wheels, and probability spinners.",
    "url": "https://spinwheelgames.org/categories",
    "siteName": "SpinWheelGames",
    "locale": "en_US",
    "type": "website",
    "images": [
      {
        "url": "https://spinwheelgames.org/api/og?path=%2Fcategories&title=All+Wheel+Categories+%26+Decision+Games+%7C+SpinWheelGames&desc=Browse+all+18%2B+wheel+categories+and+106%2B+vetted+random+pickers%2C+classroom+tools%2C+party+games%2C+decision+wheels%2C+and+probability+spinners.",
        "width": 1200,
        "height": 630,
        "alt": "All Wheel Categories & Decision Games | SpinWheelGames"
      }
    ]
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "All Wheel Categories & Decision Games | SpinWheelGames",
    "description": "Browse all 18+ wheel categories and 106+ vetted random pickers, classroom tools, party games, decision wheels, and probability spinners.",
    "images": [
      "https://spinwheelgames.org/api/og?path=%2Fcategories&title=All+Wheel+Categories+%26+Decision+Games+%7C+SpinWheelGames&desc=Browse+all+18%2B+wheel+categories+and+106%2B+vetted+random+pickers%2C+classroom+tools%2C+party+games%2C+decision+wheels%2C+and+probability+spinners."
    ]
  }
};

const CATEGORY_SLUG_MAP: Record<string, string> = {
  DECISIONS: '/decisions',
  NAMES: '/names',
  CLASSROOM: '/classroom',
  PARTY: '/party',
  FOOD: '/food',
  ENTERTAINMENT: '/movie-wheel',
  GAMING: '/gaming',
  SPORTS: '/sports',
  NUMBERS: '/numbers',
  WORKOUT: '/workout',
  TRAVEL: '/travel',
  GIVEAWAY: '/giveaways',
  'CREATIVITY & WRITING': '/creativity',
  'PRODUCTIVITY & HABITS': '/productivity',
  'WELLNESS & MINDFULNESS': '/wellness',
  'DATE NIGHT & COUPLES': '/date-night',
  'ICEBREAKERS & TEAM BUILDING': '/icebreakers',
  'FINANCE & BUDGETING': '/finance'
};

const ICON_MAP: Record<string, React.ReactNode> = {
  ThumbsUp: <ThumbsUp className="w-5 h-5 text-[#4648d4]" />,
  UserCheck: <UserCheck className="w-5 h-5 text-[#6063ee]" />,
  GraduationCap: <GraduationCap className="w-5 h-5 text-[#006c49]" />,
  PartyPopper: <PartyPopper className="w-5 h-5 text-[#dc2c4f]" />,
  Utensils: <Utensils className="w-5 h-5 text-[#b45309]" />,
  Film: <Film className="w-5 h-5 text-[#7c3aed]" />,
  Gamepad2: <Gamepad2 className="w-5 h-5 text-[#0284c7]" />,
  Trophy: <Trophy className="w-5 h-5 text-[#059669]" />,
  Hash: <Hash className="w-5 h-5 text-[#475569]" />,
  Dumbbell: <Dumbbell className="w-5 h-5 text-[#ea580c]" />,
  Compass: <Compass className="w-5 h-5 text-[#0d9488]" />,
  Gift: <Gift className="w-5 h-5 text-[#db2777]" />,
  PenTool: <PenTool className="w-5 h-5 text-[#9333ea]" />,
  CheckCircle2: <CheckCircle2 className="w-5 h-5 text-[#16a34a]" />,
  Heart: <Heart className="w-5 h-5 text-[#059669]" />,
  Sparkles: <Sparkles className="w-5 h-5 text-[#e11d48]" />,
  Users: <Users className="w-5 h-5 text-[#2563eb]" />,
  PiggyBank: <PiggyBank className="w-5 h-5 text-[#15803d]" />
};

export default function CategoriesIndexPage() {
  const categoriesList = Object.entries(CATEGORY_METADATA).filter(
    ([key]) => key !== 'ALL'
  );

  return (
    <div className="min-h-screen bg-[#fbf8ff] dark:bg-[#12131a] text-[#1a1b22] dark:text-[#f1effa] flex flex-col justify-between transition-colors">
      <SubpageHeader activePage="/categories" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 lg:pt-22 pb-16 space-y-10 w-full flex-1">
        <Breadcrumbs items={[{ label: 'Wheel Categories' }]} />

        {/* Header Section */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#4648d4]/10 dark:bg-[#4648d4]/20 text-[#4648d4] dark:text-[#8587ff] border border-[#4648d4]/20 uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              Complete Catalog
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-headline font-extrabold tracking-tight text-[#1a1b22] dark:text-white leading-tight">
            Explore All Wheel Spinner Categories &amp; Games
          </h1>

          <DirectAnswer
            question="What is the SpinWheelGames Category Directory?"
            answer="The SpinWheelGames category directory organizes over 106+ vetted, cryptographically random spin wheels and decision tools across 18 dedicated domains—from classroom student pickers and meal deciders to party icebreakers, raffle drawings, and probability generators."
          />

          <p className="text-base sm:text-lg text-[#464554] dark:text-[#c7c4d7] leading-relaxed max-w-3xl mx-auto">
            Select any category below to access dedicated interactive wheels, curated game collections, fairness documentation, and step-by-step decision frameworks.
          </p>
        </section>

        {/* Category Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categoriesList.map(([key, cat]) => {
            const targetHref = CATEGORY_SLUG_MAP[key] || `/${key.toLowerCase()}`;
            const icon = ICON_MAP[cat.iconKey] || <Layers className="w-5 h-5 text-[#4648d4]" />;

            return (
              <Link
                key={key}
                href={targetHref}
                className="group rounded-3xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-6 hover:border-[#4648d4]/50 dark:hover:border-[#8587ff]/50 hover:bg-[#fbf8ff] dark:hover:bg-[#1e1f2b] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-[#f4f2fd] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] group-hover:scale-105 transition-transform">
                      {icon}
                    </div>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff] border border-[#eeedf7] dark:border-[#292a39]">
                      {cat.count} Games
                    </span>
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors leading-snug">
                      {cat.label}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#767586] dark:text-[#908fa1] leading-relaxed mt-1.5">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#eeedf7] dark:border-[#222330] flex items-center justify-between text-xs font-semibold text-[#4648d4] dark:text-[#8587ff]">
                  <span>Explore {cat.count} Wheels</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </section>

        {/* Direct Links to Specialized Tools & 3D Dice Hub */}
        <section className="rounded-3xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-headline font-bold text-[#1a1b22] dark:text-white">
            Featured Interactive Spinners, Generators &amp; 3D Dice Tools
          </h2>
          <p className="text-xs sm:text-sm text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
            Every category hub on SpinWheelGames groups tools by real-world decision intent—separating classroom roster management and balanced team drafting from quick meal deciders, verified giveaway drawings, creative art prompts, and polyhedral tabletop dice probability calculators. All spinners run 100% client-side using Web Crypto API hardware entropy, support custom slice editing and bulk list imports, and include transparent OBS Studio browser-source overlays. Jump directly to our specialized random generators, tabletop RPG dice calculators, and themed wheel spinners below:
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { href: '/stream-wheel', label: 'OBS Streamer Mode Wheel & Dice Overlay Guide' },
              { href: '/dice-roller', label: '3D Online Dice Roller' },
              { href: '/roll-4d6', label: 'Roll 4d6 Drop Lowest Calculator' },
              { href: '/dnd-stat-roller', label: 'D&D 5e Ability Score Stat Roller' },
              { href: '/dice-average-calculator', label: 'Dice Average & Probability Calculator' },
              { href: '/roll-3d6', label: 'Roll 3d6 Bell Curve Simulator' },
              { href: '/roll-5d6', label: 'Roll 5d6 Yahtzee Dice Roller' },
              { href: '/roll-2d12', label: 'Roll 2d12 Hope & Fear Dice' },
              { href: '/roll-d3', label: 'Roll d3 Three-Sided Die' },
              { href: '/dice-collection', label: '3D RPG Polyhedral Dice Collection' },
              { href: '/unusual-dice', label: 'Unusual & Non-Standard Dice (d3-d60)' },
              { href: '/dice/d20', label: 'Roll d20 Icosahedron Die' },
              { href: '/dice/d12', label: 'Roll d12 Dodecahedron Die' },
              { href: '/dice/d10', label: 'Roll d10 Ten-Sided Die' },
              { href: '/dice/d8', label: 'Roll d8 Octahedron Die' },
              { href: '/dice/d6', label: 'Roll d6 Standard Cube Die' },
              { href: '/dice/d4', label: 'Roll d4 Tetrahedron Die' },
              { href: '/dice/d2', label: 'Roll d2 Coin Flip Simulator' },
              { href: '/dice/d100', label: 'Roll d100 Percentile Dice' },
              { href: '/number-wheel', label: 'Number Wheel Spinner (1–100)' },
              { href: '/team-generator', label: 'Random Team Generator Wheel' },
              { href: '/team-picker', label: 'Sports & Draft Team Picker Wheel' },
              { href: '/picker-wheel', label: 'Interactive Picker Wheel' },
              { href: '/random-wheel', label: 'Random Wheel Decision Spinner' },
              { href: '/party-wheel', label: 'Party Game & Icebreaker Wheel' },
              { href: '/food-wheel/lunch', label: 'Lunch Idea Picker Wheel' },
              { href: '/food-wheel/pizza', label: 'Pizza Topping & Style Wheel' },
              { href: '/giveaways', label: 'Giveaway & Raffle Wheels Hub' },
              { href: '/challenges', label: 'Interactive Spin Wheel Challenges' },
              { href: '/color-wheel', label: 'Random Color Wheel & Palette Generator' },
              { href: '/theme-wheel', label: 'Random Theme & Aesthetic Wheel' },
              { href: '/birthday-wheel', label: 'Birthday Activity & Gift Wheel' },
              { href: '/word-spinner', label: 'Random Word Spinner & Vocabulary Game' },
              { href: '/pokemon-wheel', label: 'Random Pokémon Starter & Type Wheel' },
              { href: '/random-app-picker', label: 'Random App & Challenge Picker' },
              { href: '/random-game-picker', label: 'Random Video Game & Board Game Picker' },
              { href: '/random-category-generator', label: 'Random Category Generator for Trivia' },
              { href: '/random-object-generator', label: 'Random Everyday Object Generator' },
              { href: '/comment-picker', label: 'Random Comment & Giveaway Winner Picker' },
              { href: '/truth-or-dare-wheel', label: 'Truth or Dare Party Spinner Wheel' },
              { href: '/animal-wheel', label: 'Random Animal Generator Wheel' },
              { href: '/drawing-wheel', label: 'Drawing Idea & Art Prompt Wheel' },
              { href: '/question-wheel', label: 'Random Icebreaker Question Wheel' },
              { href: '/song-wheel', label: 'Random Song & Karaoke Genre Wheel' },
              { href: '/about', label: 'About SpinWheelGames & Editorial Team' },
              { href: '/sitemap', label: 'Complete HTML Sitemap Directory' }
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 rounded-xl bg-[#fbf8ff] dark:bg-[#12131a] border border-[#eeedf7] dark:border-[#292a39] hover:border-[#4648d4] dark:hover:border-[#8587ff] text-xs font-medium text-[#1a1b22] dark:text-[#e2e0f5] hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
