'use client';

import React, { useState, useMemo } from 'react';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
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
  ArrowRight,
  Flame,
  Tv,
  Gamepad2,
  Plane,
  Palette,
  CheckSquare,
  Heart,
  MessageSquare,
  Coins,
  Smile
} from 'lucide-react';
import Link from 'next/link';
import { ALL_SEO_PAGES_LIST } from '@/lib/seoData';

interface SitemapCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  links: { href: string; label: string; desc?: string }[];
}

export default function HtmlSitemapPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamically group all SEO pages by their category
  const categories: SitemapCategory[] = useMemo(() => {
    const map: Record<string, { title: string; icon: React.ReactNode; description: string; links: { href: string; label: string; desc?: string }[] }> = {
      decisions: {
        title: 'Decisions & Choices',
        icon: <Sparkles className="w-5 h-5 text-[#4648d4] dark:text-[#8587ff]" />,
        description: 'Resolve analysis paralysis, binary dilemmas, and micro-choices.',
        links: []
      },
      names: {
        title: 'Names & Roll Calls',
        icon: <Users className="w-5 h-5 text-indigo-500" />,
        description: 'Baby names, fictional characters, gamertags, and universal name pickers.',
        links: []
      },
      classroom: {
        title: 'Classroom & Education',
        icon: <School className="w-5 h-5 text-emerald-500" />,
        description: 'Equitable student pickers, station rotations, quiz rounds, and job boards.',
        links: []
      },
      party: {
        title: 'Party & Social Games',
        icon: <Flame className="w-5 h-5 text-rose-500" />,
        description: 'Truth or dare, would you rather, charades, and social mixers.',
        links: []
      },
      food: {
        title: 'Food & Dining',
        icon: <Utensils className="w-5 h-5 text-amber-500" />,
        description: 'Dinner deciders, cuisines, restaurants, breakfasts, and snack picks.',
        links: []
      },
      entertainment: {
        title: 'Entertainment & Media',
        icon: <Tv className="w-5 h-5 text-purple-500" />,
        description: 'Streaming movies, anime genres, music playlists, and book deciders.',
        links: [
          { href: '/movie-wheel', label: 'Movie Wheel Spin', desc: 'Random movie picker & decision tool by genre and streaming service' }
        ]
      },
      gaming: {
        title: 'Gaming & Esports',
        icon: <Gamepad2 className="w-5 h-5 text-cyan-500" />,
        description: 'Battle royale drop pickers, agent selectors, and RPG class wheels.',
        links: []
      },
      sports: {
        title: 'Sports & Fitness',
        icon: <Trophy className="w-5 h-5 text-blue-500" />,
        description: 'Fantasy draft order pickers, workout routines, and sports team generators.',
        links: []
      },
      numbers: {
        title: 'Numbers & Dice',
        icon: <Binary className="w-5 h-5 text-teal-500" />,
        description: 'Mathematical generators, dice simulators (D6, D20), and raffle wheels.',
        links: []
      },
      workout: {
        title: 'Workout & Fitness',
        icon: <Trophy className="w-5 h-5 text-orange-500" />,
        description: 'HIIT circuits, calisthenics, yoga flows, and workout routines.',
        links: []
      },
      travel: {
        title: 'Travel & Exploration',
        icon: <Plane className="w-5 h-5 text-sky-500" />,
        description: 'Weekend getaways, vacation activities, and international destinations.',
        links: []
      },
      giveaway: {
        title: 'Giveaways & Contests',
        icon: <Gift className="w-5 h-5 text-pink-500" />,
        description: 'Provably fair prize wheels, raffle stubs, and discount drawers.',
        links: []
      },
      creativity: {
        title: 'Creativity & Writing',
        icon: <Palette className="w-5 h-5 text-violet-500" />,
        description: 'Writing prompts, plot twists, character archetypes, and art mediums.',
        links: []
      },
      productivity: {
        title: 'Productivity & Habits',
        icon: <CheckSquare className="w-5 h-5 text-emerald-600" />,
        description: 'Pomodoro breaks, micro-habits, decluttering, and priority pickers.',
        links: []
      },
      wellness: {
        title: 'Wellness & Mindfulness',
        icon: <Heart className="w-5 h-5 text-red-500" />,
        description: 'Self-care rituals, breathing exercises, and gratitude prompts.',
        links: []
      },
      'date-night': {
        title: 'Date Night & Couples',
        icon: <Smile className="w-5 h-5 text-pink-600" />,
        description: 'Romantic ideas, dinner plans, conversation starters, and activities.',
        links: []
      },
      icebreakers: {
        title: 'Icebreakers & Team Building',
        icon: <MessageSquare className="w-5 h-5 text-indigo-600" />,
        description: 'Meeting energizers, standup warmups, trivia, and team activities.',
        links: []
      },
      finance: {
        title: 'Finance & Budgeting',
        icon: <Coins className="w-5 h-5 text-yellow-600" />,
        description: 'No-spend challenges, savings goals, and splurge decision wheels.',
        links: []
      },
      guides: {
        title: 'Educational Guides & Theory',
        icon: <BookOpen className="w-5 h-5 text-cyan-600" />,
        description: 'In-depth articles on probability, cryptographic randomness, and group psychology.',
        links: []
      },
      company: {
        title: 'Company, Trust & Legal',
        icon: <Scale className="w-5 h-5 text-amber-600" />,
        description: 'Cryptographic audit reports, accessibility, privacy, and team info.',
        links: [
          { href: '/about', label: 'About SpinWheelGames', desc: 'Our mission, architecture, and editorial team' },
          { href: '/fairness', label: 'Fairness & Entropy (CSPRNG)', desc: 'Monte Carlo testing & Web Cryptography API audit' },
          { href: '/accessibility', label: 'Accessibility Statement (WCAG 2.1)', desc: 'Keyboard navigation, screen readers, and TTS' },
          { href: '/privacy', label: 'Privacy Policy', desc: 'Zero-knowledge 100% client-side privacy guarantee' },
          { href: '/terms', label: 'Terms of Service', desc: 'Acceptable use, educational embedding, and license' },
          { href: '/contact', label: 'Contact & Support', desc: 'Direct support, bug reports, and educational inquiries' }
        ]
      }
    };

    // Populate SEO pages into their respective category bucket
    for (const page of ALL_SEO_PAGES_LIST) {
      if (page.pageType === 'guide') {
        map.guides.links.push({
          href: page.fullPath,
          label: page.h1 || page.title,
          desc: page.metaDescription
        });
      } else if (page.categoryKey && map[page.categoryKey]) {
        map[page.categoryKey].links.push({
          href: page.fullPath,
          label: page.h1.replace(/:\s*.*$/, ''),
          desc: page.metaDescription
        });
      } else {
        // Fallback to decisions
        map.decisions.links.push({
          href: page.fullPath,
          label: page.h1,
          desc: page.metaDescription
        });
      }
    }

    return Object.entries(map)
      .map(([id, data]) => ({
        id,
        title: data.title,
        icon: data.icon,
        description: data.description,
        links: data.links
      }))
      .filter((c) => c.links.length > 0);
  }, []);

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    const q = searchQuery.toLowerCase();

    return categories
      .map((cat) => {
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
      })
      .filter(Boolean) as SitemapCategory[];
  }, [categories, searchQuery]);

  const totalLinks = useMemo(() => {
    return categories.reduce((acc, cat) => acc + cat.links.length, 0);
  }, [categories]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8ff] dark:bg-[#12131a] text-[#1a1b22] dark:text-[#f1effa] transition-colors">
      <SubpageHeader activePage="/sitemap" />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 sm:space-y-12">
        <Breadcrumbs items={[{ label: 'HTML Sitemap' }]} />

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
                    {category.title} ({category.links.length})
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
