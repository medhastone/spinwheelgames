import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen,
  PenTool,
  GraduationCap,
  Sparkles,
  Gamepad2,
  Lightbulb,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  RotateCw,
  ArrowRight,
  Sliders,
  Volume2,
  Volume1,
  Layers
} from 'lucide-react';
import WordSpinnerEngine from '@/components/words/WordSpinnerEngine';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Word Spinner – Random Word Picker | SpinWheelGames',
  description: 'Spin the free interactive word spinner to generate random nouns, verbs, adjectives, easy words, and advanced vocabulary. Perfect for creative writing, classroom drills, and party games.',
  alternates: {
    canonical: 'https://spinwheelgames.org/word-spinner'
  },
  openGraph: {
    title: 'Word Spinner – Random Word Picker | SpinWheelGames',
    description: 'Spin the free interactive word spinner to generate random nouns, verbs, adjectives, easy words, and advanced vocabulary. Perfect for creative writing, classroom drills, and party games.',
    url: 'https://spinwheelgames.org/word-spinner',
    siteName: 'SpinWheelGames',
    type: 'website',
    images: [
      {
        url: 'https://spinwheelgames.org/spinwheel.webp',
        width: 1200,
        height: 630,
        alt: 'Word Spinner – Random Word Picker | SpinWheelGames'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Word Spinner – Random Word Picker | SpinWheelGames',
    description: 'Spin the free interactive word spinner to generate random nouns, verbs, adjectives, easy words, and advanced vocabulary. Perfect for creative writing, classroom drills, and party games.',
    images: ['https://spinwheelgames.org/spinwheel.webp']
  }
};

const JSON_LD_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://spinwheelgames.org/word-spinner#webapp',
      name: 'Word Spinner & Random Vocabulary Generator',
      url: 'https://spinwheelgames.org/word-spinner',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires modern web browser with HTML5 Canvas',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      description:
        'Interactive word spinner featuring curated nouns, verbs, adjectives, easy words, advanced vocabulary, custom word lists, writing mode seeds, classroom drills, and elimination mode.'
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
          name: 'Word Spinner',
          item: 'https://spinwheelgames.org/word-spinner'
        }
      ]
    },
    {
      '@type': 'HowTo',
      name: 'How to Use the Word Spinner for Writing and Learning',
      description: 'Step-by-step instructions for spinning random words by part of speech or difficulty level.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Select Category and Mode',
          text: 'Choose your desired word category (All Words, Nouns, Verbs, Adjectives, Easy Words, Advanced Words, or Custom List) and pick between Single Word, Multiple Words, Writing Mode, or Classroom Mode.'
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Spin the Interactive Wheel',
          text: 'Click SPIN WORD WHEEL or press the Spacebar. The canvas wheel spins using physics-based easing to select a random word.'
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Learn, Write, or Play',
          text: 'Review the definition, part of speech, and sample sentence. Listen to the audio pronunciation or copy the result to your clipboard.'
        }
      ]
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the Word Spinner?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Word Spinner is a free interactive online tool that spins a wheel to choose random words across English parts of speech (nouns, verbs, adjectives) and difficulty tiers (easy, advanced). It includes specialized modes for creative writing and classroom vocabulary drills.'
          }
        },
        {
          '@type': 'Question',
          name: 'How does Writing Mode work on the Word Spinner?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Writing Mode automatically draws three complementary words (such as a noun, a verb, and an adjective) and generates an instant flash-fiction or poetry challenge prompt for writers to incorporate into a scene.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I add my own custom spelling or vocabulary words?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Click the Custom Words button to open the list manager. Paste any list of spelling or study words (one per line) to populate the spinner wheel.'
          }
        },
        {
          '@type': 'Question',
          name: 'How does No-Repeat elimination work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'When No-Repeat is turned ON, each word that is selected is crossed off and removed from subsequent spins. This ensures every student or game participant gets a unique word without duplicates.'
          }
        },
        {
          '@type': 'Question',
          name: 'Is the word selection truly random?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The Word Spinner uses the W3C Web Cryptography API (window.crypto.getRandomValues) for hardware-level cryptographic pseudorandom numbers, guaranteeing completely fair outcomes.'
          }
        }
      ]
    }
  ]
};

export default function WordSpinnerPage() {
  return (
    <div className="min-h-screen bg-[#faf8ff] dark:bg-[#0b0c10] text-[#1a1b22] dark:text-[#f1effa] w-full max-w-full overflow-x-clip flex flex-col justify-between">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_DATA) }}
      />

      <SubpageHeader activePage="/word-spinner" />

      <main className="flex-1 w-full max-w-full overflow-x-clip space-y-5 sm:space-y-8 pb-12 sm:pb-16">
        {/* Top Header & Interactive Tool Section Above the Fold */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-22 space-y-3 sm:space-y-4">
          <Breadcrumbs
            items={[
              { label: 'All Tools', href: '/categories' },
              { label: 'Word Spinner' }
            ]}
          />

          {/* Hero Banner Header */}
          <div className="text-center max-w-3xl mx-auto space-y-2 pt-1 pb-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300 text-[11px] font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Interactive Vocabulary &amp; Language Wheel</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Word Spinner
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Spin the interactive <strong>word spinner</strong> to pick random nouns, verbs, adjectives, easy words, and advanced vocabulary. Filter by part of speech, draw multiple words, or activate creative writing and classroom modes.
            </p>
          </div>

          {/* Interactive Word Spinner Engine Above the Fold */}
          <div id="tool-interactive">
            <WordSpinnerEngine />
          </div>
        </section>

        {/* Compact Box 1: Provable Fairness & Hardware Cryptography */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-900 flex items-center justify-center flex-shrink-0 text-indigo-600 dark:text-indigo-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  Cryptographically Independent Word Randomness
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                  Every spin of the word spinner wheel is governed by hardware entropy via the W3C Web Cryptography API (<code className="text-indigo-600 dark:text-indigo-400">window.crypto.getRandomValues</code>). Enjoy completely fair and unbiased word generation for games, tests, and writing sprints.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-2 rounded-xl flex-shrink-0">
              <Sparkles className="w-4 h-4" />
              <span>Hardware CSPRNG</span>
            </div>
          </div>
        </section>

        {/* Compact Box 2: Four Key Use Cases (Writing, Games, Brainstorming, Classroom) */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Versatile Creative Applications
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                How to Use Random Word Selection
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
              Discover how writers, teachers, gamers, and innovators harness the power of spontaneous vocabulary.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Creative Writing */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <PenTool className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                1. Creative Writing &amp; Flash Fiction
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Overcome the dreaded blank page syndrome. Generate unexpected word triads (e.g. <em>&quot;Labyrinth&quot;</em> + <em>&quot;Illuminate&quot;</em> + <em>&quot;Ephemeral&quot;</em>) to seed flash fiction stories, poetry stanzas, and character motivations that break conventional genre tropes.
              </p>
            </div>

            {/* 2. Party & Parlor Games */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                2. Party Games &amp; Improv
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Instant word prompts for Charades, Pictionary, Catchphrase, 20 Questions, and improv theater. The built-in <strong>No-Repeat</strong> elimination ensures players never pull the same word twice in the same match.
              </p>
            </div>

            {/* 3. Brainstorming & Lateral Thinking */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                3. Ideation &amp; Brainstorming
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Unlock lateral thinking through <em>forced association</em>. When designing a product, brand name, or ad campaign, pairing your topic with a random word creates unexpected mental bridges and innovative concepts.
              </p>
            </div>

            {/* 4. Classroom & ESL Activities */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                4. Classroom &amp; ESL Drills
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Transform rote vocabulary practice into an exciting game. Use the built-in <strong>Classroom Mode</strong> for daily bell ringers, spelling bees, part-of-speech identification, and sentence construction challenges with audio pronunciation.
              </p>
            </div>
          </div>
        </section>

        {/* Compact Box 3: Parts of Speech & Vocabulary Tiers */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Curated Lexicon
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Parts of Speech &amp; Vocabulary Tiers
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
              Target precisely the types of words you need for your game or learning objective.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 block">
                Grammar Category
              </span>
              <h4 className="text-sm font-black text-slate-900 dark:text-white">Nouns</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Tangible objects, natural wonders, instruments, and abstract concepts (e.g. <em>Compass</em>, <em>Lantern</em>, <em>Harbor</em>, <em>Labyrinth</em>).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 block">
                Grammar Category
              </span>
              <h4 className="text-sm font-black text-slate-900 dark:text-white">Verbs</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Dynamic physical actions, cognitive states, and transformative motions (e.g. <em>Illuminate</em>, <em>Unravel</em>, <em>Decipher</em>, <em>Resonate</em>).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 block">
                Grammar Category
              </span>
              <h4 className="text-sm font-black text-slate-900 dark:text-white">Adjectives</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Evocative sensory descriptors, atmospheric traits, and vivid qualities (e.g. <em>Luminous</em>, <em>Tenacious</em>, <em>Prismatic</em>, <em>Ephemeral</em>).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-500 block">
                Difficulty Tier
              </span>
              <h4 className="text-sm font-black text-slate-900 dark:text-white">Easy Words</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                High-frequency, accessible words ideal for elementary students, kids parties, and early ESL learners (e.g. <em>Brave</em>, <em>Garden</em>, <em>River</em>).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-500 block">
                Difficulty Tier
              </span>
              <h4 className="text-sm font-black text-slate-900 dark:text-white">Advanced Words</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                SAT, GRE, collegiate, and literary vocabulary to build sophisticated command of English (e.g. <em>Serendipity</em>, <em>Quixotic</em>, <em>Ineffable</em>).
              </p>
            </div>
          </div>
        </section>

        {/* Compact Box 4: How It Works Tutorial */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Simple 3-Step Guide
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
                How to Use the Word Spinner
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Zero downloads or logins required. Works seamlessly on smartphones, laptops, and interactive classroom smartboards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center">
                  1
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Choose Category or Paste Custom Words
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Select <strong>Nouns</strong>, <strong>Verbs</strong>, <strong>Adjectives</strong>, <strong>Easy</strong>, or <strong>Advanced</strong>. Or click <strong>Custom Words</strong> to paste your own spelling list.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center">
                  2
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Spin the Wheel or Draw Multiple Words
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Hit <strong>SPIN WORD WHEEL</strong> or tap the center hub. Enable <strong>No-Repeat</strong> if you want each drawn word to be eliminated so every student gets a turn.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center">
                  3
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Listen, Copy, Write &amp; Share
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Click the speaker button to hear the correct pronunciation aloud. Read the full definition and sample sentence, or copy the word challenge to your notes with one tap.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Compact Box 5: Frequently Asked Questions */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-4">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Clear Answers
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
              Frequently Asked Questions About the Word Spinner
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                <span>Can I generate multiple words at once?</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Yes! Switch the mode to <strong>Multiple Words</strong> and choose how many words you want (from 2 up to 6 words). When you spin, the tool draws that exact count of unique words together.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                <span>Can teachers paste their weekly spelling list?</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Absolutely. Click the <strong>Custom Words</strong> button to open the list manager. Paste your words one per line, click save, and the wheel will spin exclusively with your students&apos; custom vocabulary.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                <span>How does Writing Mode work?</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Writing Mode generates a balanced triad of words (combining nouns, verbs, and adjectives) along with a timed creative writing prompt to help you jumpstart a short story or poetry session.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                <span>Is the audio pronunciation free to use?</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Yes! The pronunciation button uses the native browser Web Speech API text-to-speech engine. It works 100% free and offline without requiring external paid speech services.
              </p>
            </div>
          </div>
        </section>

        {/* Compact Box 6: Related Language & Decision Tools */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#12141c] border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Companion Decision &amp; Language Tools
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Explore other educational randomizers, spinners, and generator wheels.
                </p>
              </div>
              <Link
                href="/categories"
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>All Tools</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <Link
                href="/random-category-generator"
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 hover:border-indigo-400 transition-all text-center space-y-1 group"
              >
                <Layers className="w-5 h-5 mx-auto text-emerald-500 group-hover:scale-110 transition-transform" />
                <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">Category Gen</span>
                <span className="block text-[10px] text-slate-400">12 topic themes</span>
              </Link>

              <Link
                href="/classroom-wheel"
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 hover:border-indigo-400 transition-all text-center space-y-1 group"
              >
                <GraduationCap className="w-5 h-5 mx-auto text-teal-500 group-hover:scale-110 transition-transform" />
                <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">Classroom Wheel</span>
                <span className="block text-[10px] text-slate-400">Student picker</span>
              </Link>

              <Link
                href="/drawing-wheel"
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 hover:border-indigo-400 transition-all text-center space-y-1 group"
              >
                <PenTool className="w-5 h-5 mx-auto text-rose-500 group-hover:scale-110 transition-transform" />
                <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">Drawing Wheel</span>
                <span className="block text-[10px] text-slate-400">Art prompt ideas</span>
              </Link>

              <Link
                href="/random-game-picker"
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 hover:border-indigo-400 transition-all text-center space-y-1 group"
              >
                <Gamepad2 className="w-5 h-5 mx-auto text-amber-500 group-hover:scale-110 transition-transform" />
                <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">Game Picker</span>
                <span className="block text-[10px] text-slate-400">Board &amp; card games</span>
              </Link>

              <Link
                href="/birthday-wheel"
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 hover:border-indigo-400 transition-all text-center space-y-1 group"
              >
                <Sparkles className="w-5 h-5 mx-auto text-purple-500 group-hover:scale-110 transition-transform" />
                <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">Birthday Wheel</span>
                <span className="block text-[10px] text-slate-400">Party decisions</span>
              </Link>

              <Link
                href="/wheel-of-names"
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 hover:border-indigo-400 transition-all text-center space-y-1 group"
              >
                <RotateCw className="w-5 h-5 mx-auto text-blue-500 group-hover:scale-110 transition-transform" />
                <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">Wheel of Names</span>
                <span className="block text-[10px] text-slate-400">Random name drawer</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
