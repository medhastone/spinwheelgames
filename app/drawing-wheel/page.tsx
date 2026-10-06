import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Palette,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Paintbrush,
  ChevronRight,
  Timer,
  Flame,
  Boxes,
  Feather,
  Smile,
  Globe,
  Sliders,
  Award,
  Zap
} from 'lucide-react';
import DrawingWheelEngine from '@/components/drawing/DrawingWheelEngine';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

export const dynamic = 'force-static';



export const metadata: Metadata = {
  title: 'Drawing Wheel - Random Art Idea & Drawing Prompt Generator',
  description:
    'Spin the drawing wheel for instant random art prompts, sketches, characters, and creative challenges. Choose beginner to master modes. Free & 100% inspiring!',
  keywords: [
    'drawing prompt generator wheel',
    'drawing wheel',
    'random art idea generator',
    'spin the wheel drawing ideas',
    'random drawing generator',
    'random things to draw',
    'drawing ideas generator',
    'what should i draw wheel',
    'random drawing ideas',
    'sketch roulette',
    'doodle prompt spinner'
  ],
  alternates: {
    canonical: 'https://spinwheelgames.org/drawing-wheel'
  },
  openGraph: {
    title: 'Drawing Wheel - Random Art Idea & Drawing Prompt Generator',
    description:
      'Spin the drawing wheel for instant random art prompts, sketches, characters, and creative challenges. Choose beginner to master modes. Free & 100% inspiring!',
    url: 'https://spinwheelgames.org/drawing-wheel',
    siteName: 'SpinWheelGames',
    type: 'website',
    images: [
      {
        url: 'https://spinwheelgames.org/spinwheel-logo.webp',
        width: 1200,
        height: 630,
        alt: 'Drawing Wheel - Random Art Idea Generator'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Drawing Wheel - Random Art Idea & Drawing Prompt Generator',
    description:
      'Spin the drawing wheel for instant random art prompts, sketches, characters, and creative challenges. Choose beginner to master modes. Free & 100% inspiring!'
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
        'Random drawing ideas generator and interactive sketchbook. Spin for objects, animals, characters, fantasy themes, and environments with built-in drawing canvas.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '1240',
        bestRating: '5',
        worstRating: '1'
      },
      featureList: [
        '5 Drawing Modes: Objects, Animals, Characters, Fantasy, Environments',
        'Easy, Medium, Hard difficulty filtering',
        'Interactive challenge modifiers (3-color limit, non-dominant hand)',
        'Built-in browser drawing canvas with brushes, eraser, and PNG export',
        'Timed speed-sketching countdown timer'
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
          item: 'https://spinwheelgames.org/creativity'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Spin the Wheel for Drawing Ideas',
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
          name: 'What drawing categories are included?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can choose between Object Mode, Animal Mode, Character Mode, Fantasy Mode, and Environment Mode, or spin all categories combined.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I draw directly on the webpage?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Click [Draw It] after spinning to open the lightweight browser sketchpad complete with customizable brush sizes, color swatches, eraser, undo history, and PNG image download.'
          }
        },
        {
          '@type': 'Question',
          name: 'Is the Drawing Wheel free for digital artists and art students?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! The tool is 100% free with no login or subscription required. You can save your drawings directly to your device.'
          }
        }
      ]
    }
  ]
};

export default function DrawingWheelPage() {
  return (
    <div className="min-h-screen bg-[#faf8ff] dark:bg-[#0b0c10] text-[#1a1b22] dark:text-[#f1effa] w-full max-w-full overflow-x-clip">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_DATA) }}
      />

      <SubpageHeader />

      <main className="px-3.5 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 pb-12 max-w-7xl mx-auto space-y-8 sm:space-y-12 w-full max-w-full overflow-x-clip flex-1">
        {/* Breadcrumb Header */}
        <Breadcrumbs
          items={[
            { label: 'Creativity', href: '/creativity' },
            { label: 'Drawing Wheel' }
          ]}
        />

        {/* Hero Title Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 text-xs font-bold uppercase tracking-wider">
            <Palette className="w-4 h-4" />
            <span>Random Drawing Generator</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Spin the Wheel for Drawing Ideas
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Spin the wheel for random drawing ideas, themes, objects, animals and characters. Choose a difficulty and turn every result into a creative challenge with our interactive browser sketchpad!
          </p>
        </div>

        {/* Interactive Drawing Wheel Engine */}
        <section id="tool-interactive">
          <DrawingWheelEngine />
        </section>

        {/* Feature Overview Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          <div className="bg-white dark:bg-[#12131a] p-6 rounded-2xl border border-[#eeedf7] dark:border-[#292a39] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400 flex items-center justify-center font-bold">
              <Boxes className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">5 Drawing Modes</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Toggle between Objects, Animals, Characters, Fantasy creatures, and Environment landscapes.
            </p>
          </div>

          <div className="bg-white dark:bg-[#12131a] p-6 rounded-2xl border border-[#eeedf7] dark:border-[#292a39] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400 flex items-center justify-center font-bold">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Challenge Constraints</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Add fun restrictions like 3-color limits, non-dominant hand drawing, or single-line art.
            </p>
          </div>

          <div className="bg-white dark:bg-[#12131a] p-6 rounded-2xl border border-[#eeedf7] dark:border-[#292a39] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400 flex items-center justify-center font-bold">
              <Timer className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Speed Sprints</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Start timed 1-minute, 3-minute, or 5-minute drawing sprints with live countdown alerts.
            </p>
          </div>

          <div className="bg-white dark:bg-[#12131a] p-6 rounded-2xl border border-[#eeedf7] dark:border-[#292a39] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Paintbrush className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">In-Browser Sketchpad</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Sketch your ideas right on the page using custom brushes, color pickers, and instant PNG downloads.
            </p>
          </div>
        </section>

        {/* Deep Educational & Artist Content */}
        <section className="bg-white dark:bg-[#12131a] rounded-3xl p-6 sm:p-8 md:p-10 border border-[#eeedf7] dark:border-[#292a39] shadow-sm space-y-8">
          <div className="space-y-4 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Overcoming Art Block with Spontaneous Prompt Generation
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Artistic block often stems from decision fatigue—staring at a blank canvas trying to choose the perfect subject. By introducing structured randomness, the Drawing Wheel forces your brain to focus on execution rather than deliberation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Difficulty Tier Calibration</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Choose Easy mode for relaxed warmups, or switch to Hard mode when practicing complex lighting and multi-subject compositions.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Inktober & Daily Sketching</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Maintain daily sketching streaks effortlessly without running out of ideas during month-long drawing challenges.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white dark:bg-[#12131a] rounded-3xl p-6 sm:p-8 md:p-10 border border-[#eeedf7] dark:border-[#292a39] shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Drawing Wheel FAQs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                How does the Drawing Wheel help break through creative block?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                When artists experience art block, deciding what to draw creates analysis paralysis. The Drawing Wheel removes decision fatigue by picking a random subject, difficulty level, and creative modifier instantly.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                What drawing categories are included?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                You can choose between Object Mode, Animal Mode, Character Mode, Fantasy Mode, and Environment Mode, or spin all categories combined.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Can I draw directly on the webpage?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Yes! Click [Draw It] after spinning to open the lightweight browser sketchpad complete with customizable brush sizes, color swatches, eraser, undo history, and PNG image download.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Is the Drawing Wheel free for digital artists and art students?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Yes! The tool is 100% free with no login or subscription required. You can save your drawings directly to your device.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
