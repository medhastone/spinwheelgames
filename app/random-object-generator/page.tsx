import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import RandomObjectEngine from '@/components/objects/RandomObjectEngine';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import {
  Sparkles,
  ShieldCheck,
  Palette,
  Gamepad2,
  PenTool,
  GraduationCap,
  PartyPopper,
  Search,
  Lightbulb,
  BookOpen,
  ArrowRight,
  HelpCircle,
  Dices,
  CheckCircle2,
  Layers,
  ChevronRight,
  Zap,
  Lock,
  Compass,
  Table
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Random Object Generator – Generate Random Objects for Drawing & Games',
  description:
    'Free online Random Object Generator for games, drawing, Pictionary, creative writing, classroom activities & challenges. 1,000+ curated objects with cryptographic fairness.',
  keywords: [
    'random object generator',
    'random things',
    'random objects',
    'random items',
    'object generator',
    'random stuff generator',
    'item generator',
    'object randomizer',
    'random product generator',
    'list random objects',
    'generator items',
    'item random',
    'give me a random thing',
    'give me an object',
    'random everyday objects'
  ],
  alternates: {
    canonical: 'https://spinwheelgames.org/random-object-generator'
  },
  openGraph: {
    title: 'Random Object Generator – Free Online Quick Decision & Idea Generator',
    description:
      'Generate random objects instantly for drawing, Pictionary, creative writing, classroom games, and improv challenges. Over 1,000+ curated objects with cryptographic fairness.',
    url: 'https://spinwheelgames.org/random-object-generator',
    siteName: 'SpinWheelGames',
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Random Object Generator – SpinWheelGames',
    description:
      'Instantly generate random objects from a database of 1,000+ curated items. Certified cryptographic randomness for drawing, writing, and games.'
  }
};

export default function RandomObjectGeneratorPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Random Object Generator',
      url: 'https://spinwheelgames.org/random-object-generator',
      description:
        'Free online Random Object Generator for games, drawing, Pictionary, creative writing, and classroom challenges with 1,000+ curated items and certified cryptographic randomness.',
      applicationCategory: 'GameApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    },
    {
      '@context': 'https://schema.org',
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
          name: 'Decisions',
          item: 'https://spinwheelgames.org/decisions'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Random Object Generator',
          item: 'https://spinwheelgames.org/random-object-generator'
        }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is a Random Object Generator?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A Random Object Generator is an interactive tool that algorithmically selects one or more physical items from a structured database of over 1,000+ objects using cryptographic randomness. Unlike generic word generators that output abstract verbs or nouns, an object generator outputs tangible, physically defined props suitable for drawing, games, and creative challenges.'
          }
        },
        {
          '@type': 'Question',
          name: 'How does cryptographic fairness (CSPRNG) work on this tool?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Unlike basic tools that use Math.random(), SpinWheelGames.org utilizes the browser Web Crypto API (crypto.getRandomValues). This ensures hardware-level cryptographic entropy with uniform statistical probability across all 1,000+ objects, preventing clustering and ensuring zero bias.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I use this tool for Pictionary, Charades, and Drawing practice?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! You can choose the "Drawing & Sketching" or "Pictionary & Charades" purpose tabs to filter specifically for recognizable, visually distinct physical items designed for speed-sketching, gesture drawing, and acting without speaking.'
          }
        },
        {
          '@type': 'Question',
          name: 'Does the tool remember previously generated objects?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. By checking the "No Repeats" option, the generator tracks previously selected objects in your session and excludes them from future draws until the eligible pool is exhausted or you click Reset History.'
          }
        },
        {
          '@type': 'Question',
          name: 'Is the generator safe for children and classrooms?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Selecting the "Classroom Activities" purpose filter restricts all results to wholesome, age-safe, educational objects appropriate for elementary, middle school, high school, and ESL/ELL language classes.'
          }
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#faf8ff] dark:bg-[#0b0c10] text-[#1a1b22] dark:text-[#f1effa] flex flex-col font-sans transition-colors selection:bg-indigo-500 selection:text-white">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Global Header / Navigation Bar */}
      <SubpageHeader activePage="/random-object-generator" />

      {/* Breadcrumb Navigation */}
      <div className="bg-white/60 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800/60 pt-24 sm:pt-28 lg:pt-32 pb-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-slate-200 transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
          <Link href="/decisions" className="hover:text-slate-900 dark:hover:text-slate-200 transition">
            Decisions
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
          <span className="text-indigo-600 dark:text-indigo-400 font-medium truncate">Random Object Generator</span>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12 sm:space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            1,000+ Curated Objects • CSPRNG Certified Fair
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Random Object Generator
          </h1>

          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Generate random objects and random things instantly for drawing, Pictionary, creative writing, classroom
            games, and improv challenges. Use our item generator and object randomizer to list random objects, discover random everyday objects, or quickly ask give me an object for creative inspiration.
          </p>

          {/* Trust & Feature Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Web Crypto CSPRNG
            </span>
            <span className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-xs">
              <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              100% Client-Side Fast
            </span>
            <span className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              No Repeats Memory
            </span>
            <span className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-xs">
              <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              No Account Required
            </span>
          </div>
        </section>

        {/* The Core Interactive Application Engine */}
        <RandomObjectEngine />

        {/* Section 2: Purpose Deep-Dives */}
        <section className="space-y-6 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              What Can You Use a Random Object Generator For?
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              From creative illustration to team icebreakers, explore how a random physical object
              unlocks immediate imagination and fair gameplay.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/60 transition space-y-3 shadow-xs">
              <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 w-fit">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Drawing &amp; Sketching</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Break art block instantly. Practice lighting, contours, reflective metals, and
                organic textures with real physical objects from retro cameras to gnarled driftwood.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/60 transition space-y-3 shadow-xs">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 w-fit">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Pictionary &amp; Charades</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Filter exclusively for recognizable everyday objects. Quick setup for game nights,
                virtual happy hours, or Discord party calls with our built-in 30-second challenge
                timer.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/60 transition space-y-3 shadow-xs">
              <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 w-fit">
                <PenTool className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Creative Writing &amp; Plots</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Introduce a tangible narrative catalyst. How did an antique compass, a wax seal, or a
                cryo-chamber end up in your protagonist’s locked briefcase?
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/60 transition space-y-3 shadow-xs">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 w-fit">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Classroom Activities</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                100% wholesome and student-safe. Perfect for show-and-tell improvisation, sensory
                adjective drills, Spanish/French vocabulary practice, and quick brain breaks.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/60 transition space-y-3 shadow-xs">
              <div className="p-2.5 rounded-xl bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 w-fit">
                <PartyPopper className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Party Games &amp; Icebreakers</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Play 20 Questions, &quot;Taboo&quot; (describe the object without saying 3 forbidden words), or
                pass-the-prop improv without needing cards, boards, or expensive boxed sets.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/60 transition space-y-3 shadow-xs">
              <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 w-fit">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Scavenger Hunts</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Generate objects commonly found around the house, office, or backyard. Challenge kids
                or coworkers to find and photograph the physical item before the clock runs out.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/60 transition space-y-3 shadow-xs">
              <div className="p-2.5 rounded-xl bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 w-fit">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Lateral Innovation</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Practice SCAMPER and TRIZ design thinking. Juxtapose two unrelated objects (e.g.
                &quot;Bicycle&quot; + &quot;Thermos Flask&quot;) to invent novel product concepts or patented features.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/60 transition space-y-3 shadow-xs">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 w-fit">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Storytelling &amp; D&amp;D</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Generate dungeon loot, curious tavern oddities, pickpocket contents, or mystery gifts
                for your tabletop RPG campaigns in seconds.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Technical Fairness & Randomness Explanation */}
        <section className="bg-gradient-to-br from-indigo-50/90 via-slate-50 to-indigo-100/50 dark:from-slate-900 dark:to-indigo-950/40 rounded-3xl border border-indigo-200 dark:border-indigo-500/30 p-6 sm:p-10 space-y-6 shadow-sm">
          <div className="space-y-2">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              Algorithm &amp; Cryptography
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              How Does the Random Object Generator Work?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                True Web Cryptography (CSPRNG)
              </h3>
              <p>
                Standard online randomizers rely on JavaScript’s built-in{' '}
                <code className="bg-slate-200/80 dark:bg-slate-800 px-1.5 py-0.5 rounded text-amber-700 dark:text-amber-300 text-xs">
                  Math.random()
                </code>
                , an algorithm that produces pseudo-random values which can suffer from periodicity,
                uneven distribution, and predictable repeat clusters.
              </p>
              <p>
                SpinWheelGames.org exclusively implements the W3C standard{' '}
                <code className="bg-slate-200/80 dark:bg-slate-800 px-1.5 py-0.5 rounded text-indigo-700 dark:text-indigo-300 text-xs">
                  window.crypto.getRandomValues()
                </code>
                . This feeds system hardware entropy into an unbiased Fisher-Yates shuffle,
                ensuring that every single one of our 1,000+ objects has the exact same mathematical
                odds of being picked on every turn.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                No-Repeat Session Memory
              </h3>
              <p>
                Nothing ruins a multi-round game of Pictionary or classroom quiz like drawing the
                same object twice in a row.
              </p>
              <p>
                When our <strong>No Repeats</strong> toggle is active, every chosen object ID is
                stored in local session state and deducted from the eligible candidate pool. The
                generator guarantees zero duplicates until the entire eligible category is exhausted
                or until you manually click the Reset History button.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Object Generator vs Word Generator Matrix */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Random Object Generator vs. Random Word Generator
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Why picking physical objects is vastly superior for visual and interactive activities.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4 font-bold">Feature</th>
                  <th className="p-4 font-bold text-indigo-600 dark:text-indigo-400">Random Object Generator</th>
                  <th className="p-4 font-bold text-slate-500 dark:text-slate-400">Standard Word Generator</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80 bg-white dark:bg-slate-950/60 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">Entity Type</td>
                  <td className="p-4 text-emerald-700 dark:text-emerald-400 font-medium">
                    100% Physical, tangible 3D objects
                  </td>
                  <td className="p-4 text-slate-500 dark:text-slate-400">Abstract verbs, adjectives, idioms, jargon</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">Visual Drawability</td>
                  <td className="p-4 text-emerald-700 dark:text-emerald-400 font-medium">
                    High (distinct silhouettes, textures, contours)
                  </td>
                  <td className="p-4 text-slate-500 dark:text-slate-400">
                    Low (words like &quot;concept&quot;, &quot;quickly&quot;, &quot;freedom&quot;)
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">Category Tagging</td>
                  <td className="p-4 text-emerald-700 dark:text-emerald-400 font-medium">
                    22 granular categories (Tools, Sci-Fi, Kitchen, etc.)
                  </td>
                  <td className="p-4 text-slate-500 dark:text-slate-400">Basic parts of speech or untagged lists</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">Game Integration</td>
                  <td className="p-4 text-emerald-700 dark:text-emerald-400 font-medium">
                    Built-in Spin Wheel, 30s Challenge Timer, Streak Game
                  </td>
                  <td className="p-4 text-slate-500 dark:text-slate-400">Static plain text output only</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-900 dark:text-white">Card Export</td>
                  <td className="p-4 text-emerald-700 dark:text-emerald-400 font-medium">
                    One-click Canvas PNG visual share card download
                  </td>
                  <td className="p-4 text-slate-500 dark:text-slate-400">None</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5: Frequently Asked Questions (FAQ) */}
        <section className="space-y-6 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Everything you need to know about our Random Object Generator.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                How many random objects are in the database?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Our curated database contains over 1,000 carefully curated objects spanning 22
                distinct categories, from everyday household appliances and kitchen tools to
                historical relics, sci-fi inventions, and playful party props.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Can I generate multiple objects at once?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Yes! You can choose 1, 5, 10, or specify a custom quantity up to 25 items. You can
                then copy the full numbered list, re-shuffle the order, or export it with one click.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Can I paste my own custom list of objects?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Yes. Click the <strong>Custom List</strong> tab in the generator toolbar to type or
                paste your own objects line-by-line, or upload a TXT or CSV file. You can then spin
                your custom list on the wheel or pick an instant winner!
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Is this tool free and safe for classroom use?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                100% free with no sign-ups, no cookies, and no intrusive ads. Selecting the
                &quot;Classroom Activities&quot; purpose mode ensures every single object is age-safe
                and wholesome for all grade levels.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Related Wheel Tools Grid */}
        <section className="space-y-4 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Explore More Random Decision Tools</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Discover our full suite of certified fair wheel spinners and lottery pickers.
              </p>
            </div>
            <Link
              href="/decisions"
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              All Tools <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/spin-the-wheel"
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition space-y-2 group shadow-xs"
            >
              <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                Decision Tool
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Spin the Wheel</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Universal custom decision wheel spinner for daily choices and giveaways.
              </p>
            </Link>

            <Link
              href="/random-picker"
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition space-y-2 group shadow-xs"
            >
              <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                Lottery &amp; Draws
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Random Picker</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Fast fair drawing tool for raffles, contest winners, and classroom rosters.
              </p>
            </Link>

            <Link
              href="/wheel-of-names"
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition space-y-2 group shadow-xs"
            >
              <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                Classroom
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Wheel of Names</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Classroom student name selector with sound effects and elimination mode.
              </p>
            </Link>

            <Link
              href="/decision-wheel"
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition space-y-2 group shadow-xs"
            >
              <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                Productivity
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Decision Wheel</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Break analysis paralysis and resolve dilemmas in under 10 seconds.
              </p>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
