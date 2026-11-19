import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Palette,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Paintbrush,
  Timer,
  Flame,
  Boxes,
  Feather,
  Trees,
  Sliders,
  Award,
  Zap,
  Ban,
  Clock,
  Users,
  ShieldCheck,
  Lock,
  BookOpen
} from 'lucide-react';
import DrawingWheelEngine from '@/components/drawing/DrawingWheelEngine';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedWheelsSection from '@/components/RelatedWheelsSection';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  "title": "Drawing Wheel & Art Idea Generator | SpinWheelGames",
  "description": "Spin the drawing wheel for instant random art prompts, sketches, characters, animals, and nature ideas. Choose Easy to Hard, 30s/60s challenge sprints, and no-repeat mode!",
  "alternates": {
    "canonical": "https://spinwheelgames.org/drawing-wheel"
  },
  "openGraph": {
    "title": "Drawing Wheel & Art Idea Generator | SpinWheelGames",
    "description": "Spin the drawing wheel for instant random art prompts, sketches, characters, animals, and nature ideas. Choose Easy to Hard, 30s/60s challenge sprints, and no-repeat mode!",
    "url": "https://spinwheelgames.org/drawing-wheel",
    "siteName": "SpinWheelGames",
    "locale": "en_US",
    "type": "website",
    "images": [
      {
        "url": "https://spinwheelgames.org/api/og?path=%2Fdrawing-wheel&title=Drawing+Wheel+%26+Art+Idea+Generator+%7C+SpinWheelGames&desc=Spin+the+drawing+wheel+for+instant+random+art+prompts%2C+sketches%2C+characters%2C+animals%2C+and+nature+ideas.+Choose+Easy+to+Hard%2C+30s%2F60s+challenge+sprints%2C+and+no-repeat+mode%21",
        "width": 1200,
        "height": 630,
        "alt": "Drawing Wheel & Art Idea Generator | SpinWheelGames"
      }
    ]
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Drawing Wheel & Art Idea Generator | SpinWheelGames",
    "description": "Spin the drawing wheel for instant random art prompts, sketches, characters, animals, and nature ideas. Choose Easy to Hard, 30s/60s challenge sprints, and no-repeat mode!",
    "images": [
      "https://spinwheelgames.org/api/og?path=%2Fdrawing-wheel&title=Drawing+Wheel+%26+Art+Idea+Generator+%7C+SpinWheelGames&desc=Spin+the+drawing+wheel+for+instant+random+art+prompts%2C+sketches%2C+characters%2C+animals%2C+and+nature+ideas.+Choose+Easy+to+Hard%2C+30s%2F60s+challenge+sprints%2C+and+no-repeat+mode%21"
    ]
  }
};

const JSON_LD_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://spinwheelgames.org/drawing-wheel#webapp',
      name: 'Drawing Wheel - Random Art Idea & Prompt Generator',
      url: 'https://spinwheelgames.org/drawing-wheel',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript and modern HTML5 canvas support',
      description:
        'Random drawing ideas generator and interactive sketchbook. Spin for animals, people, objects, fantasy themes, and nature landscapes with built-in drawing canvas, 30s and 60s challenges, and no-repeat elimination.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '1350',
        bestRating: '5',
        worstRating: '1'
      },
      featureList: [
        '5 Drawing Modes: Animals, People, Objects, Fantasy, Nature',
        'Easy, Medium, Hard difficulty calibration',
        '30-second and 60-second speed drawing challenges with on-screen buzzer alert',
        'No-repeat elimination mode for art practice without duplicate prompts',
        'Built-in browser drawing canvas with brushes, eraser, and PNG export'
      ],
      screenshot: 'https://spinwheelgames.org/spinwheel-logo.webp'
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://spinwheelgames.org/drawing-wheel#breadcrumb',
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
          name: 'Creativity',
          item: 'https://spinwheelgames.org/categories'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Drawing Wheel',
          item: 'https://spinwheelgames.org/drawing-wheel'
        }
      ]
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://spinwheelgames.org/drawing-wheel#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does the Drawing Wheel help break through creative block?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'When artists experience art block, deciding what to draw creates analysis paralysis. The Drawing Wheel removes decision fatigue by picking a random subject, difficulty level, and creative modifier instantly.'
          }
        },
        {
          '@type': 'Question',
          name: 'What drawing categories are included on the wheel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can choose between Animals, People, Objects, Fantasy creatures, and Nature landscapes, or spin all categories combined across Easy, Medium, and Hard difficulty tiers.'
          }
        },
        {
          '@type': 'Question',
          name: 'How do the 30-second and 60-second drawing challenges work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Clicking [30s Challenge] or [60s Challenge] spins or assigns an art prompt and automatically starts an intense visual countdown timer with audio ticking and an on-screen buzzer alert when time expires—perfect for warmups and gesture sketching.'
          }
        },
        {
          '@type': 'Question',
          name: 'What does No-Repeat mode do?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'When No-Repeat is turned on, every prompt selected by the wheel is eliminated from future spins until you click [Restore]. This ensures you never get the same drawing idea twice during a practice session.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I draw directly on the webpage?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Click [Draw It Canvas] after spinning to open the browser sketchpad complete with customizable brush sizes, color swatches, eraser, undo history, and PNG image download.'
          }
        }
      ]
    }
  ]
};

export default function DrawingWheelPage() {
  return (
    <div className="min-h-screen bg-[#faf8ff] dark:bg-[#0b0c10] text-[#1a1b22] dark:text-[#f1effa] w-full max-w-full overflow-x-clip flex flex-col">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_DATA) }}
      />

      <SubpageHeader activePage="/drawing-wheel" />

      <main className="flex-1 w-full max-w-full overflow-x-clip space-y-5 sm:space-y-8 pb-12 sm:pb-16">
        {/* Top Header & Interactive Wheel Section Above the Fold */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-22 space-y-3 sm:space-y-4">
          <Breadcrumbs
            items={[
              { label: 'Creative Wheels', href: '/categories' },
              { label: 'Drawing Wheel' }
            ]}
          />

          {/* Compact Hero Title Section */}
          <div className="text-center max-w-2xl mx-auto space-y-2 pt-1 pb-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 text-[11px] font-bold uppercase tracking-wider">
              <Palette className="w-3.5 h-3.5" />
              <span>Random Drawing Prompt Wheel</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Spin the Wheel for Drawing Ideas
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto">
              Generate random drawing ideas, art prompts, and sketching concepts across 5 curated categories. Filter by Easy, Medium, or Hard difficulty, challenge yourself with 30s/60s sprints, and eliminate repeat ideas with No-Repeat mode!
            </p>
          </div>

          {/* Interactive Drawing Wheel Engine */}
          <div id="tool-interactive">
            <DrawingWheelEngine />
          </div>
        </section>

        {/* COMPACT BOX 1: Provable Fairness & Privacy Bar (Home Page Style) */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-[#464554] dark:text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-semibold text-[#1a1b22] dark:text-white">
                  Client-Side CSPRNG Randomness (crypto.getRandomValues)
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#696779] dark:text-slate-400">
                <Award className="w-3.5 h-3.5 text-purple-500" />
                <span>100% Unbiased Prompt Selection</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <Lock className="w-4 h-4 shrink-0" />
              <span>Zero Account Required • Built-in Sketchpad &amp; Speed Sprints</span>
            </div>
          </div>
        </section>

        {/* COMPACT BOX 2: 5 Drawing Category Showcase Cards (Home-Style Compact Responsive Grid) */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-[#4648d4] dark:text-[#8587ff] uppercase tracking-wider">
                Creative Categories
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a1b22] dark:text-white tracking-tight mt-0.5">
                Explore Drawing Categories &amp; Art Modes
              </h2>
            </div>
            <p className="text-xs text-[#767586] dark:text-[#908fa1] max-w-md">
              Spin individual genres or mix all 5 across Easy, Medium, and Hard difficulty tiers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            {/* Card 1: Animals */}
            <div className="group rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-4 hover:border-[#4648d4]/50 dark:hover:border-[#8587ff]/50 hover:shadow-md transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Feather className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff]">
                    Wildlife
                  </span>
                </div>
                <h3 className="font-headline font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors">
                  Animals &amp; Creatures
                </h3>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                  Red pandas, glowing jellyfish, alpine stags, and chameleons to practice dynamic poses, fur, and scales.
                </p>
              </div>
            </div>

            {/* Card 2: People */}
            <div className="group rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-4 hover:border-[#4648d4]/50 dark:hover:border-[#8587ff]/50 hover:shadow-md transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff]">
                    Figures
                  </span>
                </div>
                <h3 className="font-headline font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors">
                  People &amp; Characters
                </h3>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                  Cyberpunk hackers, baristas, samurai, and acrobats for facial expressions, gestures, and silhouettes.
                </p>
              </div>
            </div>

            {/* Card 3: Objects */}
            <div className="group rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-4 hover:border-[#4648d4]/50 dark:hover:border-[#8587ff]/50 hover:shadow-md transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <Boxes className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff]">
                    Props
                  </span>
                </div>
                <h3 className="font-headline font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors">
                  Objects &amp; Machinery
                </h3>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                  Vintage cameras, potion bottles, mechanical watches, and futuristic gadgets for still-life perspective.
                </p>
              </div>
            </div>

            {/* Card 4: Fantasy */}
            <div className="group rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-4 hover:border-[#4648d4]/50 dark:hover:border-[#8587ff]/50 hover:shadow-md transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <Flame className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff]">
                    Mythical
                  </span>
                </div>
                <h3 className="font-headline font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors">
                  Fantasy Realms
                </h3>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                  Floating sky castles, solar phoenixes, spectral guardians, and magic artifacts to ignite imagination.
                </p>
              </div>
            </div>

            {/* Card 5: Nature */}
            <div className="group rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-4 hover:border-[#4648d4]/50 dark:hover:border-[#8587ff]/50 hover:shadow-md transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                    <Trees className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff]">
                    Environments
                  </span>
                </div>
                <h3 className="font-headline font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors">
                  Nature &amp; Biomes
                </h3>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                  Bioluminescent mangrove coves, stormy alpine peaks, and misty autumn rivers for atmospheric lighting.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* COMPACT BOX 3: Overcoming Art Block 3-Step Strategy (Home-Style Compact 2-Column Box) */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-5 sm:p-7 space-y-5 shadow-xs">
            <div className="space-y-1.5 max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Artist Practice Method</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1a1b22] dark:text-white tracking-tight">
                Solving Art Block with Spontaneous Prompt Generation
              </h2>
              <p className="text-xs sm:text-sm text-[#464554] dark:text-slate-300 leading-relaxed">
                Artistic block often stems from decision fatigue—staring at a blank canvas trying to choose the perfect subject. By introducing structured randomness, the Drawing Wheel forces your brain to focus on execution rather than deliberation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              <div className="p-4 rounded-xl bg-[#fbfaff] dark:bg-[#1a1b28] border border-[#eeedf7] dark:border-[#222330] space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#1a1b22] dark:text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>1. Calibrate Difficulty &amp; Genre</span>
                </div>
                <p className="text-xs text-[#696779] dark:text-slate-400 leading-relaxed">
                  Choose Easy for relaxed morning warmups, Medium for everyday concept practice, or Hard for complex multi-source lighting and foreshortened poses.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#fbfaff] dark:bg-[#1a1b28] border border-[#eeedf7] dark:border-[#222330] space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#1a1b22] dark:text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>2. Speed Sprints with Buzzer</span>
                </div>
                <p className="text-xs text-[#696779] dark:text-slate-400 leading-relaxed">
                  Build quick gesture sketching instincts by racing against the 30-second or 60-second countdown with synthesized audio beeps and an on-screen buzzer alert.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#fbfaff] dark:bg-[#1a1b28] border border-[#eeedf7] dark:border-[#222330] space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#1a1b22] dark:text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>3. Draw It Canvas or Sketchpad</span>
                </div>
                <p className="text-xs text-[#696779] dark:text-slate-400 leading-relaxed">
                  Draw directly in the built-in HTML5 canvas sketchpad with custom brush sizes, color palette, eraser, and PNG export, or grab your real-world sketchbook.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* COMPACT BOX 4: 4 Practice Workflows & Artist Modes (Home-Style Compact Cards Grid) */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-[#4648d4] dark:text-[#8587ff] uppercase tracking-wider">
                Creative Workflows
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a1b22] dark:text-white tracking-tight mt-0.5">
                Built for Warmups, Practice &amp; Studio Games
              </h2>
            </div>
            <p className="text-xs text-[#767586] dark:text-[#908fa1] max-w-md">
              From solo daily routines to classroom drawing challenges and social sketch games.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-4 shadow-xs space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  <Zap className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white">5-Minute Warmups</h3>
              </div>
              <p className="text-xs text-[#696779] dark:text-slate-400 leading-relaxed">
                Loosen up your drawing arm and wrist muscles before diving into extensive illustration projects or client commissions.
              </p>
            </div>

            <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-4 shadow-xs space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Ban className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white">No-Repeat Marathons</h3>
              </div>
              <p className="text-xs text-[#696779] dark:text-slate-400 leading-relaxed">
                Turn on No-Repeat mode to draw and eliminate prompt cards one by one for Inktober, monthly art challenges, or sketchbook streaks.
              </p>
            </div>

            <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-4 shadow-xs space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Flame className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white">Creative Modifiers</h3>
              </div>
              <p className="text-xs text-[#696779] dark:text-slate-400 leading-relaxed">
                Toggle Modifiers to add constraints like &quot;single continuous line&quot;, &quot;extreme low angle&quot;, or &quot;only 2 colors&quot; for advanced practice.
              </p>
            </div>

            <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-4 shadow-xs space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white">Classroom &amp; Party Games</h3>
              </div>
              <p className="text-xs text-[#696779] dark:text-slate-400 leading-relaxed">
                Host fast-paced Pictionary rounds, icebreakers, and friendly art battles with live synchronized countdown clocks.
              </p>
            </div>
          </div>
        </section>

        {/* COMPACT BOX 5: Compact FAQ Cards Section (Home-Style Responsive Grid) */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-[#4648d4] dark:text-[#8587ff] uppercase tracking-wider">
                Frequently Asked Questions
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a1b22] dark:text-white tracking-tight mt-0.5">
                Drawing Wheel FAQs
              </h2>
            </div>
            <p className="text-xs text-[#767586] dark:text-[#908fa1] max-w-md">
              Everything you need to know about the drawing ideas generator, speed sprints, and canvas tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#151620] border border-[#eeedf7] dark:border-[#222330] shadow-xs space-y-2">
              <h3 className="font-bold text-xs sm:text-sm text-[#1a1b22] dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-purple-500 shrink-0" />
                <span>How does the Drawing Wheel break creative block?</span>
              </h3>
              <p className="text-xs text-[#696779] dark:text-slate-400 leading-relaxed">
                When artists experience art block, deciding what to draw creates analysis paralysis. The Drawing Wheel removes decision fatigue by picking a random subject, difficulty level, and creative modifier instantly.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#151620] border border-[#eeedf7] dark:border-[#222330] shadow-xs space-y-2">
              <h3 className="font-bold text-xs sm:text-sm text-[#1a1b22] dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-purple-500 shrink-0" />
                <span>What drawing categories and difficulty tiers are included?</span>
              </h3>
              <p className="text-xs text-[#696779] dark:text-slate-400 leading-relaxed">
                You can select Animals, People, Objects, Fantasy realms, and Nature environments, or spin all categories combined across Easy, Medium, and Hard difficulty levels.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#151620] border border-[#eeedf7] dark:border-[#222330] shadow-xs space-y-2">
              <h3 className="font-bold text-xs sm:text-sm text-[#1a1b22] dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-purple-500 shrink-0" />
                <span>How do the 30s Blitz and 60s Challenge sprints work?</span>
              </h3>
              <p className="text-xs text-[#696779] dark:text-slate-400 leading-relaxed">
                Clicking [30s Challenge] or [60s Challenge] spins or assigns an art prompt and automatically starts an intense visual countdown timer with audio ticking and an on-screen buzzer alert when time expires.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#151620] border border-[#eeedf7] dark:border-[#222330] shadow-xs space-y-2">
              <h3 className="font-bold text-xs sm:text-sm text-[#1a1b22] dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-purple-500 shrink-0" />
                <span>What does No-Repeat elimination mode do?</span>
              </h3>
              <p className="text-xs text-[#696779] dark:text-slate-400 leading-relaxed">
                When No-Repeat is turned on, every prompt selected by the wheel is eliminated from future spins until you click [Restore]. This ensures you never get the same drawing idea twice during a practice session.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#151620] border border-[#eeedf7] dark:border-[#222330] shadow-xs space-y-2">
              <h3 className="font-bold text-xs sm:text-sm text-[#1a1b22] dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-purple-500 shrink-0" />
                <span>Can I draw directly on the webpage?</span>
              </h3>
              <p className="text-xs text-[#696779] dark:text-slate-400 leading-relaxed">
                Yes! Click [Draw It Canvas] after spinning to open the browser sketchpad complete with customizable brush sizes, color swatches, eraser, undo history, and PNG image download.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#151620] border border-[#eeedf7] dark:border-[#222330] shadow-xs space-y-2">
              <h3 className="font-bold text-xs sm:text-sm text-[#1a1b22] dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-purple-500 shrink-0" />
                <span>Can I combine random modifiers with drawing prompts?</span>
              </h3>
              <p className="text-xs text-[#696779] dark:text-slate-400 leading-relaxed">
                Yes! Turn on Modifiers or click [Modifier] to generate artistic constraints like chiaroscuro lighting, non-dominant hand drawing, silhouette only, or extreme angles.
              </p>
            </div>
          </div>
        </section>

        {/* Related Wheels Section */}
        <RelatedWheelsSection
          title="Related Creative & Art Prompt Wheels"
          subtitle="Combine your drawing subject with random color palettes, animals, themes, and everyday objects."
          wheels={[
            {
              name: 'Color Wheel',
              href: '/color-wheel',
              anchorText: 'Spin the Color Wheel for limited-palette art challenges',
              description: 'Pick random hex hues and complementary palettes for illustration sprints.',
              tag: 'Palettes'
            },
            {
              name: 'Animal Wheel',
              href: '/animal-wheel',
              anchorText: 'Try the Animal Wheel for creature & wildlife sketching',
              description: 'Spin mammals, ocean life, and mythical creatures for gesture studies.',
              tag: 'Creatures'
            },
            {
              name: 'Theme Wheel',
              href: '/theme-wheel',
              anchorText: 'Use the Theme Wheel for aesthetic & worldbuilding genres',
              description: 'Generate Cyberpunk, Cottagecore, Noir, or Steampunk visual moods.',
              tag: 'Aesthetics'
            },
            {
              name: 'Random Object Generator',
              href: '/random-object-generator',
              anchorText: 'Spin the Random Object Generator for still-life props',
              description: 'Instant everyday items for Pictionary rounds and perspective practice.',
              tag: 'Props'
            }
          ]}
          guides={[
            { label: 'How to Use a Wheel to Beat Creative Paralysis', href: '/how-to-use-a-wheel', readingTime: '4 min' }
          ]}
        />
      </main>

      <Footer />
    </div>
  );
}
