import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  PawPrint,
  Utensils,
  Film,
  Trophy,
  Globe,
  Atom,
  Cpu,
  Landmark,
  Package,
  PenTool,
  GraduationCap,
  Sparkles,
  Gamepad2,
  Lightbulb,
  Dices,
  BookOpen,
  Video,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Shuffle,
  ArrowRight,
  Sliders,
  Layers,
  Clock
} from 'lucide-react';
import RandomCategoryEngine from '@/components/categories/RandomCategoryEngine';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Random Category Generator Wheel | SpinWheelGames',
  description: 'Free instant category generator. Pick random categories for games, brainstorming, Scattergories, creative writing, classroom activities, and content creation with single, multiple, and no-repeat modes.',
  alternates: {
    canonical: 'https://spinwheelgames.org/random-category-generator'
  },
  openGraph: {
    title: 'Random Category Generator Wheel | SpinWheelGames',
    description: 'Free instant category generator. Pick random categories for games, brainstorming, Scattergories, creative writing, classroom activities, and content creation with single, multiple, and no-repeat modes.',
    url: 'https://spinwheelgames.org/random-category-generator',
    siteName: 'SpinWheelGames',
    type: 'website',
    images: [
      {
        url: 'https://spinwheelgames.org/spinwheel.webp',
        width: 1200,
        height: 630,
        alt: 'Random Category Generator Wheel | SpinWheelGames'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Random Category Generator Wheel | SpinWheelGames',
    description: 'Free instant category generator. Pick random categories for games, brainstorming, Scattergories, creative writing, classroom activities, and content creation with single, multiple, and no-repeat modes.',
    images: ['https://spinwheelgames.org/spinwheel.webp']
  }
};

const JSON_LD_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://spinwheelgames.org/random-category-generator#webapp',
      name: 'Random Category Generator & Scattergories Tool',
      url: 'https://spinwheelgames.org/random-category-generator',
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires modern web browser with JavaScript',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      description:
        'Instant category generator supporting 12 core categories (Animals, Food, Movies, Sports, Countries, Science, Technology, History, Objects, Writing, Classroom, and Custom), single and multiple draw modes, no-repeat elimination, and a dedicated Scattergories round helper.'
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://spinwheelgames.org'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'All Tools',
          item: 'https://spinwheelgames.org/categories'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Category Generator',
          item: 'https://spinwheelgames.org/random-category-generator'
        }
      ]
    },
    {
      '@type': 'HowTo',
      name: 'How to Generate Random Categories for Games and Creative Projects',
      description: 'Step-by-step instructions for generating single or multiple random categories with no-repeat elimination.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Select Your Generator Mode',
          text: 'Choose between One Category, Multiple Categories (2 to 6+), or the dedicated Scattergories Mode with letter generator and round timer.'
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Filter Categories or Add Custom Entries',
          text: 'Use the category filter checkboxes to include or exclude Animals, Food, Movies, Sports, Countries, Science, Technology, History, Objects, Writing, Classroom, or custom categories.'
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Generate and Copy Your Results',
          text: 'Click Generate Categories or press Spacebar. Copy results to your clipboard or share them directly with your game group.'
        }
      ]
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is a category generator?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A category generator is a free online tool that picks random thematic categories—such as Animals, Science, Movies, or History—at the click of a button. It is used to generate prompts for board games, Scattergories, creative writing, classroom brainstorming, and content creation.'
          }
        },
        {
          '@type': 'Question',
          name: 'How do I use this tool for Scattergories?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Switch to Scattergories Mode. The tool will automatically roll a random valid 20-sided letter (excluding difficult letters like Q, U, V, X, Y, Z) and generate a clean list of 6 distinct categories along with a built-in countdown round timer.'
          }
        },
        {
          '@type': 'Question',
          name: 'What does the No-Repeat mode do?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'When No-Repeat is turned ON, previously generated categories are eliminated from subsequent draws so you never receive duplicate categories in the same session until the pool is reset.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I add my own custom categories?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Click the Add Custom button in the category filter bar. You can specify a custom category name, description, and custom sub-prompts. Your custom entries are saved in your browser local storage.'
          }
        },
        {
          '@type': 'Question',
          name: 'Is the category generation truly random?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The generator uses the W3C Web Cryptography API (window.crypto.getRandomValues) to draw categories using hardware cryptographic entropy, guaranteeing unbiased and fair random picks.'
          }
        }
      ]
    }
  ]
};

export default function RandomCategoryGeneratorPage() {
  return (
    <div className="min-h-screen bg-[#faf8ff] dark:bg-[#0b0c10] text-[#1a1b22] dark:text-[#f1effa] w-full max-w-full overflow-x-clip flex flex-col justify-between">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_DATA) }}
      />

      <SubpageHeader activePage="/random-category-generator" />

      <main className="flex-1 w-full max-w-full overflow-x-clip space-y-5 sm:space-y-8 pb-12 sm:pb-16">
        {/* Top Header & Interactive Tool Section Above the Fold */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-22 space-y-3 sm:space-y-4">
          <Breadcrumbs
            items={[
              { label: 'All Tools', href: '/categories' },
              { label: 'Category Generator' }
            ]}
          />

          {/* Hero Banner Header */}
          <div className="text-center max-w-3xl mx-auto space-y-2 pt-1 pb-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Creative Decision Tool</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Category Generator
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Generate <strong>random categories</strong> instantly for games, Scattergories rounds, creative writing, classroom bell ringers, and brainstorming sessions. Choose single picks, multi-category lists, or no-repeat elimination.
            </p>
          </div>

          {/* Interactive Random Category Engine Placed Directly Above the Fold */}
          <div id="tool-interactive">
            <RandomCategoryEngine />
          </div>
        </section>

        {/* Compact Box 1: Provable Randomness & Performance */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 flex items-center justify-center flex-shrink-0 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  Cryptographically Unbiased Random Category Selection
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                  Powered by the W3C Web Cryptography API (<code className="text-emerald-600 dark:text-emerald-400">window.crypto.getRandomValues</code>). Every category draw is mathematically independent and free from algorithmic bias or weighted patterns.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3.5 py-2 rounded-xl flex-shrink-0">
              <Shuffle className="w-4 h-4" />
              <span>Hardware CSPRNG</span>
            </div>
          </div>
        </section>

        {/* Compact Box 2: 6 Major Use Cases Grid */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Versatile Applications
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Top Use Cases for the Random Category Generator
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
              From competitive game nights to university classrooms, see how creative minds put random categories to work.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Use Case 1: Games */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                1. Party Games & Trivia
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Supercharge party games like Charades, Pictionary, 20 Questions, and trivia night. Generate fresh rounds on the fly so players can&apos;t predict the topic or memorize standard card decks.
              </p>
            </div>

            {/* Use Case 2: Brainstorming */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                2. Ideation & Brainstorming
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Break creative mental blocks in design sprints, hackathons, and product workshops. Force orthogonal thinking by combining two random categories (e.g., &quot;Technology&quot; + &quot;Food&quot; to invent a smart kitchen concept).
              </p>
            </div>

            {/* Use Case 3: Scattergories */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                <Dices className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                3. Scattergories Rounds
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Replicate official Scattergories rounds with a single click. The tool generates a random 20-sided letter, a list of distinct categories, and runs a synchronized round timer with zero manual setup.
              </p>
            </div>

            {/* Use Case 4: Writing */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <PenTool className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                4. Creative Writing Prompts
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Spark flash fiction, NaNoWriMo scenes, and character backstories. Use the sub-prompt details to explore unexpected angles like &quot;Dystopian Underworld&quot; or &quot;Vintage Antiques with Secrets&quot;.
              </p>
            </div>

            {/* Use Case 5: Classroom */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                5. Classroom Bell Ringers
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Engage students in morning warm-ups, ESL conversational vocabulary rounds, science hypotheses, and timed debate statements. Ensures every pupil gets an unbiased subject prompt.
              </p>
            </div>

            {/* Use Case 6: Content Creation */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                6. Content Creation & YouTube
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Never run out of ideas for TikTok challenges, podcast episode themes, blog topics, or streaming Q&amp;A sessions. Draw unexpected themes to keep your audience engaged and entertained.
              </p>
            </div>
          </div>
        </section>

        {/* Compact Box 3: All 12 Categories Overview */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Core Catalog
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                The 12 Built-in Categories
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
              Each category contains curated sub-prompts and specific angles to guide deep-dive discussions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2">
                <PawPrint className="w-4 h-4 text-emerald-500" />
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Animals &amp; Wildlife</h4>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Endangered species, deep sea life, apex predators, nocturnal fauna &amp; dinosaurs.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-orange-500" />
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Food &amp; Cuisine</h4>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Global street food, pastries, midnight snacks, fermented specialties &amp; sauces.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-violet-500" />
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Movies &amp; Cinema</h4>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                90s cult classics, sci-fi epics, Oscar winners, anime &amp; psychological thrillers.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Sports &amp; Athletics</h4>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Olympic track events, extreme sports, winter games, motorsports &amp; net duels.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-500" />
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Countries &amp; Geography</h4>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Landlocked nations, island archipelagos, UNESCO heritage sites &amp; canyons.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2">
                <Atom className="w-4 h-4 text-blue-500" />
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Science &amp; Discovery</h4>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Astrophysics, genetics, CRISPR, quantum mechanics, neuroscience &amp; fossils.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-pink-500" />
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Technology &amp; Computing</h4>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Artificial intelligence, cybersecurity, robotics, retro tech, space probes &amp; IoT.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-purple-500" />
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">History &amp; Civilizations</h4>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Ancient Rome, Renaissance art, Exploration Age, Industrial steam &amp; Cold War.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-slate-500" />
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Objects &amp; Items</h4>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Vintage mechanisms, EDC pocket tools, acoustic instruments &amp; laboratory glass.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2">
                <PenTool className="w-4 h-4 text-rose-500" />
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Writing &amp; Storytelling</h4>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Unreliable narrators, locked-room mysteries, cyberpunk noir &amp; mythic quests.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-teal-500" />
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Classroom &amp; Learning</h4>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Ethical debates, STEM hypotheses, counterfactual history &amp; vocabulary speedruns.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Custom Categories</h4>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Create personalized categories like anime, video game lore, music, or study units.
              </p>
            </div>
          </div>
        </section>

        {/* Compact Box 4: Step-by-Step Instructions */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Quick Guide
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                How to Use the Random Category Generator
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Fast, responsive, and works completely in your browser on desktop, tablet, and mobile.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white font-black text-sm flex items-center justify-center">
                  1
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Pick Single, Multi, or Scattergories Mode
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Choose <strong>One Category</strong> for quick solo draws, <strong>Multiple Categories</strong> (set to 2, 3, 4, 5, or 6 items), or <strong>Scattergories Mode</strong> to generate a letter and round timer together.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white font-black text-sm flex items-center justify-center">
                  2
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Filter Pool or Add Custom Themes
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Toggle any of the 12 category chips on or off to narrow the subject pool. Click <strong>Add Custom</strong> to inject your own categories with personalized prompt angles.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white font-black text-sm flex items-center justify-center">
                  3
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Generate, Copy &amp; Share
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Hit <strong>Generate Categories</strong> or press the <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-[10px] font-mono">Space</kbd> key. Copy the formatted list with one click or share to your group chat.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Compact Box 5: Frequently Asked Questions */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-4">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Frequently Asked Questions
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
              Common Questions About the Category Generator
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>How does the Scattergories mode work?</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Scattergories mode rolls a random letter from the official 20-letter set (omitting Q, U, V, X, Y, Z) and presents 6 distinct categories with an interactive 2-minute countdown timer.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>What is the benefit of No-Repeat mode?</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                No-Repeat prevents the same category from being chosen multiple times in a game or workshop. Once a category is picked, it is crossed out until the entire pool is exhausted.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Can I use this category generator offline?</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Yes! The entire application runs client-side in your web browser. No external API keys, database queries, or network connections are needed once the page is loaded.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>How does the tool guarantee fair randomness?</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                It uses the W3C Web Cryptography API (<code className="text-emerald-600 dark:text-emerald-400">crypto.getRandomValues</code>) to generate cryptographically secure pseudorandom numbers based on operating system entropy.
              </p>
            </div>
          </div>
        </section>

        {/* Compact Box 6: Related Tools */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Related Decision &amp; Generator Tools
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Pair random categories with companion dice rollers and decision wheels.
                </p>
              </div>
              <Link
                href="/categories"
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Browse All Tools</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <Link
                href="/random-game-picker"
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 hover:border-emerald-400 transition-all text-center space-y-1 group"
              >
                <Gamepad2 className="w-5 h-5 mx-auto text-amber-500 group-hover:scale-110 transition-transform" />
                <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">Game Picker</span>
                <span className="block text-[10px] text-slate-400">Party &amp; board games</span>
              </Link>

              <Link
                href="/drawing-wheel"
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 hover:border-emerald-400 transition-all text-center space-y-1 group"
              >
                <PenTool className="w-5 h-5 mx-auto text-rose-500 group-hover:scale-110 transition-transform" />
                <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">Drawing Wheel</span>
                <span className="block text-[10px] text-slate-400">Sketch prompts</span>
              </Link>

              <Link
                href="/theme-wheel"
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 hover:border-emerald-400 transition-all text-center space-y-1 group"
              >
                <Sparkles className="w-5 h-5 mx-auto text-purple-500 group-hover:scale-110 transition-transform" />
                <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">Theme Wheel</span>
                <span className="block text-[10px] text-slate-400">Event &amp; party themes</span>
              </Link>

              <Link
                href="/birthday-wheel"
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 hover:border-emerald-400 transition-all text-center space-y-1 group"
              >
                <Dices className="w-5 h-5 mx-auto text-rose-500 group-hover:scale-110 transition-transform" />
                <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">Birthday Wheel</span>
                <span className="block text-[10px] text-slate-400">Party decisions</span>
              </Link>

              <Link
                href="/comment-picker"
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 hover:border-emerald-400 transition-all text-center space-y-1 group"
              >
                <Shuffle className="w-5 h-5 mx-auto text-blue-500 group-hover:scale-110 transition-transform" />
                <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">Comment Picker</span>
                <span className="block text-[10px] text-slate-400">Giveaways &amp; raffles</span>
              </Link>

              <Link
                href="/team-generator"
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 hover:border-emerald-400 transition-all text-center space-y-1 group"
              >
                <Layers className="w-5 h-5 mx-auto text-teal-500 group-hover:scale-110 transition-transform" />
                <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">Team Generator</span>
                <span className="block text-[10px] text-slate-400">Balanced groups</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
