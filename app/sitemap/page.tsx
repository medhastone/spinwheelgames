'use client';

import React, { useState, useMemo } from 'react';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import {
  Globe,
  Search,
  Sparkles,
  Compass,
  BookOpen,
  Scale,
  School,
  Gift,
  Utensils,
  Trophy,
  Users,
  Binary,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

interface SitemapCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  links: { href: string; label: string; desc?: string }[];
}

const SITEMAP_DATA: SitemapCategory[] = [
  {
    id: 'core',
    title: 'Core Random Decision Tools',
    icon: <Sparkles className="w-5 h-5 text-[#4648d4] dark:text-[#8587ff]" />,
    description: 'High-frequency random pickers, spinner wheels, and general choice engines.',
    links: [
      { href: '/spin-the-wheel', label: 'Spin the Wheel', desc: 'Customizable 60 FPS random decision spinner' },
      { href: '/wheel-of-names', label: 'Wheel of Names', desc: 'Random student and participant name selector' },
      { href: '/random-picker', label: 'Random Picker', desc: 'Weighted and equal-probability item selector' },
      { href: '/yes-or-no-wheel', label: 'Yes or No Wheel', desc: 'Instant binary choice decider with coin-flip animations' },
      { href: '/decision-wheel', label: 'Decision Wheel', desc: 'Multi-option decision maker with elimination mode' },
      { href: '/picker-wheel', label: 'Picker Wheel', desc: 'Interactive item selector for raffles and games' },
      { href: '/random-wheel', label: 'Random Wheel Generator', desc: 'Create custom branded random wheels' }
    ]
  },
  {
    id: 'classroom',
    title: 'Classroom & Student Pickers',
    icon: <School className="w-5 h-5 text-indigo-500" />,
    description: 'FERPA/COPPA safe tools for teachers, student grouping, and classroom participation.',
    links: [
      { href: '/classroom', label: 'Classroom Wheel Hub', desc: 'Full classroom management and student picker suite' },
      { href: '/classroom-wheel/random-student', label: 'Random Student Picker', desc: 'Fair, non-repeating cold-call selector' },
      { href: '/classroom-wheel/participation', label: 'Student Participation Wheel', desc: 'Keep classroom engagement balanced' },
      { href: '/classroom-wheel/homework-picker', label: 'Homework & Assignment Picker', desc: 'Random topic and homework assigner' },
      { href: '/classroom-wheel/reward-wheel', label: 'Classroom Reward Wheel', desc: 'Student reward spinner for good behavior' },
      { href: '/team-picker', label: 'Team Picker', desc: 'Split class into 2 to 8 balanced groups' },
      { href: '/random-team-generator', label: 'Random Team Generator', desc: 'Instant roster group generator' }
    ]
  },
  {
    id: 'giveaways',
    title: 'Giveaways, Contests & Raffles',
    icon: <Gift className="w-5 h-5 text-amber-500" />,
    description: 'Provably fair prize wheels with cryptographic audit logs for live streamers and brands.',
    links: [
      { href: '/giveaways', label: 'Giveaways Hub', desc: 'Full prize wheel and contest suite' },
      { href: '/giveaway-wheel/prize-wheel', label: 'Prize Wheel', desc: 'Customizable multi-tier prize spinner' },
      { href: '/giveaway-wheel/raffle-wheel', label: 'Raffle Wheel', desc: 'Provably fair raffle ticket selector' },
      { href: '/giveaway-wheel/winner-picker', label: 'Random Winner Picker', desc: 'Broadcast-ready giveaway drawing tool' },
      { href: '/giveaway-wheel/discount-wheel', label: 'Discount & Coupon Wheel', desc: 'Promotional discount decider' }
    ]
  },
  {
    id: 'food',
    title: 'Food, Dining & What to Eat',
    icon: <Utensils className="w-5 h-5 text-rose-500" />,
    description: 'End mealtime indecision with curated cuisine and restaurant wheels.',
    links: [
      { href: '/food', label: 'Food & Dining Hub', desc: 'Comprehensive food choice deciders' },
      { href: '/food-wheel/dinner', label: 'What to Eat for Dinner Wheel', desc: 'Resolve evening meal debates instantly' },
      { href: '/food-wheel/lunch', label: 'What to Eat for Lunch Wheel', desc: 'Quick midday dining suggestions' },
      { href: '/food-wheel/takeout', label: 'Takeout Decider Wheel', desc: 'Choose between local delivery favorites' },
      { href: '/food-wheel/pizza', label: 'Pizza Toppings Wheel', desc: 'Fun randomized topping selections' },
      { href: '/food-wheel/restaurant', label: 'Restaurant Picker Wheel', desc: 'Random dining venue decider' }
    ]
  },
  {
    id: 'party',
    title: 'Party & Social Games',
    icon: <Sparkles className="w-5 h-5 text-purple-500" />,
    description: 'Icebreakers, truth or dare wheels, and party game generators.',
    links: [
      { href: '/party', label: 'Party Games Hub', desc: 'Full social entertainment and party suite' },
      { href: '/party-wheel/truth-or-dare', label: 'Truth or Dare Wheel', desc: 'Spin for spontaneous party challenges' },
      { href: '/party-wheel/icebreaker', label: 'Icebreaker Question Wheel', desc: 'Great for onboarding and social mixers' },
      { href: '/party-wheel/charades', label: 'Charades Generator Wheel', desc: 'Random action and topic prompts' },
      { href: '/party-wheel/never-have-i-ever', label: 'Never Have I Ever Wheel', desc: 'Casual party game prompt spinner' }
    ]
  },
  {
    id: 'sports',
    title: 'Sports, Fantasy & Team Drafts',
    icon: <Trophy className="w-5 h-5 text-emerald-500" />,
    description: 'Fantasy draft order pickers, workout routines, and sports team generators.',
    links: [
      { href: '/sports', label: 'Sports & Drafts Hub', desc: 'Full sports randomization suite' },
      { href: '/sports-wheel/draft-order', label: 'Fantasy Draft Order Picker', desc: 'Fair, tamper-proof draft position draw' },
      { href: '/sports-wheel/workout', label: 'Random Workout & Exercise Wheel', desc: 'Randomize your fitness circuit' },
      { href: '/sports-wheel/nfl-teams', label: 'NFL Team Picker Wheel', desc: 'Random football team decider' },
      { href: '/sports-wheel/nba-teams', label: 'NBA Team Picker Wheel', desc: 'Random basketball team decider' }
    ]
  },
  {
    id: 'numbers',
    title: 'Numbers, Dice & Letters',
    icon: <Binary className="w-5 h-5 text-blue-500" />,
    description: 'Mathematical generators, dice simulators, and alphabet wheels.',
    links: [
      { href: '/numbers', label: 'Numbers & Dice Hub', desc: 'Full numerical randomizer directory' },
      { href: '/number-wheel', label: 'Random Number Wheel 1-10', desc: 'Numeric spinner for games and math exercises' },
      { href: '/letter-wheel', label: 'Letter Wheel (A-Z)', desc: 'Alphabet selector for word games and phonics' }
    ]
  },
  {
    id: 'guides',
    title: 'Educational Guides & Decision Theory',
    icon: <BookOpen className="w-5 h-5 text-cyan-500" />,
    description: 'Expert articles on probability, classroom engagement, and cryptographic randomness.',
    links: [
      { href: '/how-to-use-a-wheel', label: 'How to Use a Random Wheel', desc: 'Complete operational walkthrough' },
      { href: '/how-random-wheels-work', label: 'How Random Wheels Work', desc: 'The science of digital spinners and physics' },
      { href: '/how-to-pick-a-random-winner', label: 'How to Pick a Random Winner', desc: 'Best practices for fair giveaways' },
      { href: '/random-vs-weighted-selection', label: 'Random vs. Weighted Selection', desc: 'Understanding mathematical odds and slices' },
      { href: '/how-to-make-a-classroom-wheel', label: 'Classroom Wheel Engagement Guide', desc: 'Effective teaching strategies with wheels' }
    ]
  },
  {
    id: 'company',
    title: 'Company, Trust & Legal',
    icon: <Scale className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
    description: 'Cryptographic audits, accessibility statements, privacy disclosures, and contact info.',
    links: [
      { href: '/about', label: 'About SpinWheelGames', desc: 'Our mission, architecture, and team' },
      { href: '/fairness', label: 'Fairness & Entropy (CSPRNG)', desc: 'Interactive Monte Carlo simulation & Web Crypto API audit' },
      { href: '/accessibility', label: 'Accessibility Statement (WCAG 2.1)', desc: 'Keyboard navigation, screen readers, and TTS' },
      { href: '/privacy', label: 'Privacy Policy', desc: 'Zero-knowledge 100% client-side privacy guarantee' },
      { href: '/terms', label: 'Terms of Service', desc: 'Acceptable use, educational embedding, and license' },
      { href: '/contact', label: 'Contact & Support', desc: 'Direct support, bug reports, and educational inquiries' }
    ]
  }
];

export default function HtmlSitemapPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return SITEMAP_DATA;
    const q = searchQuery.toLowerCase();

    return SITEMAP_DATA.map((cat) => {
      const matchingLinks = cat.links.filter(
        (l) => l.label.toLowerCase().includes(q) || (l.desc && l.desc.toLowerCase().includes(q))
      );
      if (matchingLinks.length > 0 || cat.title.toLowerCase().includes(q)) {
        return {
          ...cat,
          links: matchingLinks.length > 0 ? matchingLinks : cat.links
        };
      }
      return null;
    }).filter(Boolean) as SitemapCategory[];
  }, [searchQuery]);

  const totalLinks = useMemo(() => {
    return SITEMAP_DATA.reduce((acc, cat) => acc + cat.links.length, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8ff] dark:bg-[#12131a] text-[#1a1b22] dark:text-[#f1effa] transition-colors">
      <SubpageHeader activePage="/sitemap" />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12">
        {/* Header */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4648d4]/10 dark:bg-[#4648d4]/20 text-[#4648d4] dark:text-[#8587ff] text-xs font-bold uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5" />
            Complete Directory
          </div>
          <h1 className="font-headline text-[32px] sm:text-[44px] font-extrabold tracking-tight text-[#1a1b22] dark:text-white leading-tight">
            SpinWheelGames HTML Sitemap
          </h1>
          <p className="text-[15px] sm:text-[17px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
            Index of all {totalLinks} curated decision tools, classroom student pickers, giveaway engines, guides, and corporate documentation.
          </p>

          {/* Quick Search */}
          <div className="pt-2 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-[#767586] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search all directory pages..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] text-[14px] text-[#1a1b22] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4648d4] shadow-xs"
            />
          </div>
        </section>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="p-6 rounded-3xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#f4f2fd] dark:bg-[#12131a] shrink-0">
                    {category.icon}
                  </div>
                  <h2 className="font-headline text-[17px] font-bold text-[#1a1b22] dark:text-white">
                    {category.title}
                  </h2>
                </div>
                <p className="text-xs text-[#767586] dark:text-[#908fa1]">
                  {category.description}
                </p>

                <ul className="divide-y divide-[#eeedf7] dark:divide-[#222330] pt-2">
                  {category.links.map((link) => (
                    <li key={link.href} className="py-2.5 first:pt-0 last:pb-0">
                      <Link
                        href={link.href}
                        className="group flex flex-col gap-0.5 hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors"
                      >
                        <span className="text-[13px] font-semibold text-[#1a1b22] dark:text-[#f1effa] group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] flex items-center justify-between">
                          <span>{link.label}</span>
                          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        </span>
                        {link.desc && (
                          <span className="text-[11px] text-[#767586] dark:text-[#908fa1] line-clamp-1">
                            {link.desc}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
