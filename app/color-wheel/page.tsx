import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Palette,
  Sparkles,
  Layers,
  Gamepad2,
  Copy,
  Sliders,
  CheckCircle2,
  HelpCircle,
  Eye,
  Shuffle,
  Shield,
  ArrowRight
} from 'lucide-react';
import ColorWheelEngine from '@/components/colors/ColorWheelEngine';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Color Wheel & Random Color Picker | SpinWheelGames',
  description: 'Spin the interactive color wheel and color spinner. Random color picker, multiple colors mode, instant HEX, RGB, and HSL conversions, 1-click copy, and automatic harmony palette generation.',
  alternates: {
    canonical: 'https://spinwheelgames.org/color-wheel'
  },
  openGraph: {
    title: 'Color Wheel & Random Color Picker | SpinWheelGames',
    description: 'Spin the interactive color wheel and color spinner. Random color picker, multiple colors mode, instant HEX, RGB, and HSL conversions, 1-click copy, and automatic harmony palette generation.',
    url: 'https://spinwheelgames.org/color-wheel',
    siteName: 'SpinWheelGames',
    type: 'website',
    images: [
      {
        url: 'https://spinwheelgames.org/spinwheel.webp',
        width: 1200,
        height: 630,
        alt: 'Color Wheel & Random Color Picker | SpinWheelGames'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Color Wheel & Random Color Picker | SpinWheelGames',
    description: 'Spin the interactive color wheel and color spinner. Random color picker, multiple colors mode, instant HEX, RGB, and HSL conversions, 1-click copy, and automatic harmony palette generation.',
    images: ['https://spinwheelgames.org/spinwheel.webp']
  }
};

const JSON_LD_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://spinwheelgames.org/color-wheel#webapp',
      name: 'Color Wheel & Color Spinner',
      url: 'https://spinwheelgames.org/color-wheel',
      applicationCategory: 'DesignApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires modern web browser with HTML5 Canvas',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      description:
        'Interactive color wheel, color spinner, and random color picker. Supports single and multiple colors spinning, real-time HEX, RGB, and HSL conversions with 1-click copy, and automated harmony palette generation.'
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
          name: 'Creative Tools',
          item: 'https://spinwheelgames.org/color-wheel'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Color Wheel',
          item: 'https://spinwheelgames.org/color-wheel'
        }
      ]
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://spinwheelgames.org/color-wheel#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does the Color Wheel generate harmony palettes?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'When you spin a color, the engine automatically calculates its exact mathematical harmonies based on color theory angles: Complementary (180°), Triadic (120°/240°), Analogous (±30°), Split-Complementary (150°/210°), Tetradic (90°/180°/270°), and Monochromatic lightness tints.'
          }
        },
        {
          '@type': 'Question',
          name: 'How do I copy HEX, RGB, and HSL color values?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The result card simultaneously displays the winning color in HEX (e.g., #E63946), RGB (e.g., rgb(230, 57, 70)), and HSL (e.g., hsl(355, 78%, 56%)). Click the copy icon next to any value or tap Copy All to copy all formats at once.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I spin for multiple colors at the same time?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Select the Multiple Colors tab and choose whether you want 2, 3, 4, or 5 distinct colors drawn simultaneously for multi-color branding, illustrations, or website themes.'
          }
        },
        {
          '@type': 'Question',
          name: 'How do I play the Color Wheel Game?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Click the Color Wheel Game tab to test your eye for color theory. The game presents a base color and challenges you to identify its exact complementary opposite from four choices.'
          }
        }
      ]
    }
  ]
};

const COLOR_FEATURES = [
  {
    title: 'Random Color Picker',
    description: 'Spin to select a fair random color slice or tap Random Color to generate 100% pure random hexadecimal values instantly.',
    icon: Sparkles,
    badge: 'Core Feature'
  },
  {
    title: 'Multiple Colors Mode',
    description: 'Draft 2 to 5 coordinated colors in a single spin. Perfect for multi-shade brand palettes, graphic layouts, and outfit planning.',
    icon: Layers,
    badge: 'Multi-Draw'
  },
  {
    title: 'Simultaneous HEX, RGB & HSL',
    description: 'Displays all standard digital color notations at once with 1-click clipboard copy and live WCAG contrast checking.',
    icon: Copy,
    badge: 'Code-Ready'
  },
  {
    title: 'Automated Palette Generator',
    description: 'Instantly computes Complementary, Triadic, Analogous, Split-Complementary, Tetradic, and Monochromatic harmonies.',
    icon: Palette,
    badge: 'Color Theory'
  },
  {
    title: 'Interactive Color Wheel Game',
    description: 'Sharpen your design instincts with fast-paced color theory quizzes guessing complementary opposites for bonus points.',
    icon: Gamepad2,
    badge: 'Mini-Game'
  },
  {
    title: 'Custom Palette Presets',
    description: 'Load curated presets (12-Hue Artist, Digital Spectrum, Cyberpunk Neon, Pastel Dream, Earthy Boho, Retro 80s) or add your own.',
    icon: Sliders,
    badge: 'Configurable'
  }
];

const COLOR_FAQS = [
  {
    q: 'How does the Color Wheel generate harmony palettes?',
    a: 'When you spin a color, the engine automatically calculates its exact mathematical harmonies based on color theory angles: Complementary (180°), Triadic (120°/240°), Analogous (±30°), Split-Complementary (150°/210°), Tetradic (90°/180°/270°), and Monochromatic lightness tints.'
  },
  {
    q: 'How do I copy HEX, RGB, and HSL color values?',
    a: 'The result card simultaneously displays the winning color in HEX (e.g., #E63946), RGB (e.g., rgb(230, 57, 70)), and HSL (e.g., hsl(355, 78%, 56%)). Click the copy icon next to any value or tap Copy All to copy all formats at once.'
  },
  {
    q: 'Can I spin for multiple colors at the same time?',
    a: 'Yes! Select the Multiple Colors tab and choose whether you want 2, 3, 4, or 5 distinct colors drawn simultaneously for multi-color branding, illustrations, or website themes.'
  },
  {
    q: 'How do I customize the colors on the spinner?',
    a: 'Use the color picker and HEX input in the tool box to add custom shades, or click any of the 6 curated presets above the wheel (such as 12-Hue Artist, Neon Cyberpunk, or Earthy Boho) for instant palettes.'
  }
];

export default function ColorWheelPage() {
  return (
    <div className="min-h-screen bg-[#faf9fe] dark:bg-[#0e0f15] text-[#1a1b22] dark:text-[#f4f3fb] flex flex-col w-full max-w-full overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_DATA) }}
      />

      <SubpageHeader activePage="/color-wheel" />

      <main className="flex-1 w-full max-w-full overflow-x-clip space-y-5 sm:space-y-8 pb-12">
        {/* Top Hero Container */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 lg:pt-22 space-y-3 sm:space-y-4">
          <Breadcrumbs
            items={[
              { label: 'Creative Wheels', href: '/categories' },
              { label: 'Color Wheel' }
            ]}
          />

          {/* Hero Header Banner */}
          <div className="text-center max-w-2xl mx-auto space-y-2 pt-1 pb-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-800 dark:bg-pink-950/80 dark:text-pink-300 text-[11px] font-bold uppercase tracking-wider">
              <Palette className="w-3.5 h-3.5" />
              <span>Interactive Color Spinner &amp; Palette Suite</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Color Wheel &amp; Random Color Picker
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto">
              Spin the free color wheel to pick random colors, draw multiple palette swatches, view simultaneous HEX, RGB, and HSL codes, and generate automated harmony palettes.
            </p>
          </div>

          {/* Interactive Wheel Engine */}
          <div id="tool-interactive">
            <ColorWheelEngine />
          </div>
        </section>

        {/* 1. Core Feature Capabilities (Compact Flat Cards) */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-[#4648d4] dark:text-[#8587ff] uppercase tracking-wider">
                Color Tools &amp; Features
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a1b22] dark:text-white tracking-tight mt-0.5">
                Built for Artists, Designers &amp; Creators
              </h2>
            </div>
            <p className="text-xs text-[#767586] dark:text-[#908fa1] max-w-md">
              Everything you need to discover, convert, test, and apply color palettes quickly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {COLOR_FEATURES.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <div
                  key={idx}
                  className="group rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-4 hover:border-[#4648d4]/50 dark:hover:border-[#8587ff]/50 hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff]">
                        {feat.badge}
                      </span>
                    </div>
                    <h3 className="font-headline font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 2. Color Harmonies Explanation (Compact) */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-[#4648d4] dark:text-[#8587ff] uppercase tracking-wider">
                Color Theory
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a1b22] dark:text-white tracking-tight mt-0.5">
                How Automated Harmonies Work
              </h2>
            </div>
            <p className="text-xs text-[#767586] dark:text-[#908fa1] max-w-md">
              Every spin calculates exact trigonometric geometric relationships across the 360° color wheel.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white">Complementary</h3>
                <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-full">
                  180° Offset
                </span>
              </div>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Direct opposites on the wheel. Offers maximum contrast, eye-catching CTAs, and energetic emphasis.
              </p>
            </div>

            <div className="rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white">Triadic</h3>
                <span className="text-[10px] font-mono font-bold text-purple-600 bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded-full">
                  120° Spacing
                </span>
              </div>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Three points forming an equilateral triangle. Delivers rich, balanced color schemes with strong visual harmony.
              </p>
            </div>

            <div className="rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white">Analogous</h3>
                <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                  ±30° Adjacent
                </span>
              </div>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Neighboring hues on the spectrum. Mimics natural landscapes for gentle, unified, and peaceful aesthetic tones.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Frequently Asked Questions (Compact) */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-[#4648d4] dark:text-[#8587ff] uppercase tracking-wider">
                Color Wheel FAQ
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a1b22] dark:text-white tracking-tight mt-0.5">
                Frequently Asked Questions
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {COLOR_FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-4 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-pink-600 dark:text-pink-400 shrink-0" />
                  <h3 className="font-bold text-xs sm:text-sm text-[#1a1b22] dark:text-white">
                    {faq.q}
                  </h3>
                </div>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Wheels Strip */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 pb-6">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-900 via-purple-900 to-indigo-950 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
            <div>
              <h3 className="font-bold text-sm sm:text-base">Explore more creative wheel randomizers</h3>
              <p className="text-xs text-pink-200 mt-0.5">
                Check out the Theme Wheel, Classroom Wheel, Food Wheel, and Wheel of Names.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/theme-wheel"
                className="px-3 py-1.5 rounded-xl bg-white text-purple-950 font-bold text-xs hover:bg-purple-50 transition-colors"
              >
                Theme Wheel
              </Link>
              <Link
                href="/classroom-wheel"
                className="px-3 py-1.5 rounded-xl bg-purple-800 text-white font-bold text-xs hover:bg-purple-700 transition-colors"
              >
                Classroom Wheel
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
