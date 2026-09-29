import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Utensils,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Users,
  Compass,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  ChefHat,
  Coffee,
  Pizza,
  Salad
} from 'lucide-react';
import FoodWheelEngine from '@/components/food/FoodWheelEngine';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';

export const dynamic = 'force-static';



export const metadata: Metadata = {
  title: 'Food Wheel - What Should I Eat Generator & Dinner Picker',
  description:
    'Spin the free food wheel to randomly pick dinner, fast food, snacks, or cuisines. End decision fatigue with custom slices and 100% fair instant spins!',
  keywords: [
    'what should i eat generator',
    'random food picker',
    'dinner wheel spin',
    'food wheel',
    'food spin the wheel',
    'what to eat generator',
    'random food generator',
    'dinner roulette',
    'fast food roulette',
    'food decision wheel',
    'choose dinner for me',
    'dinner picker',
    'what should i eat today generator',
    'fast food randomizer',
    'spin for dinner',
    'pick my dinner',
    'food roulette'
  ],
  alternates: {
    canonical: 'https://spinwheelgames.org/food-wheel'
  },
  openGraph: {
    title: 'Food Wheel - What Should I Eat Generator & Dinner Picker',
    description:
      'Spin the free food wheel to randomly pick dinner, fast food, snacks, or cuisines. End decision fatigue with custom slices and 100% fair instant spins!',
    url: 'https://spinwheelgames.org/food-wheel',
    siteName: 'SpinWheelGames',
    type: 'website',
    images: [
      {
        url: 'https://spinwheelgames.org/spinwheel-logo.webp',
        width: 1200,
        height: 630,
        alt: 'Food Wheel - What Should I Eat Generator'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Food Wheel - What Should I Eat Generator & Dinner Picker',
    description:
      'Spin the free food wheel to randomly pick dinner, fast food, snacks, or cuisines. End decision fatigue with custom slices and 100% fair instant spins!'
  }
};

const JSON_LD_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://spinwheelgames.org/food-wheel#webapp',
      name: 'Food Spin Wheel - What Should I Eat Generator',
      url: 'https://spinwheelgames.org/food-wheel',
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript and modern HTML5 canvas support',
      description:
        'Free online food spin wheel and random meal picker. Choose what to eat for dinner, lunch, breakfast, snacks, and desserts with fair random selection.',
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
        'Quick presets: Dinner, Fast Food, Healthy, Desserts, Cuisines',
        'Custom food items with editable probabilities',
        'Elimination mode to remove eaten options',
        'Realistic spinning physics and sound effects',
        'Full-screen party and projector mode'
      ],
      screenshot: 'https://spinwheelgames.org/spinwheel-logo.webp'
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
          name: 'Decisions',
          item: 'https://spinwheelgames.org/decisions'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Food Wheel',
          item: 'https://spinwheelgames.org/food-wheel'
        }
      ]
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is a food spin wheel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A food spin wheel is an interactive decision-making tool that divides food choices into equal slices on a virtual wheel. When spun, it randomly lands on one dish, cuisine, or restaurant to help users decide what to eat.'
          }
        },
        {
          '@type': 'Question',
          name: 'How do I customize the food wheel with my own restaurants?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Switch to the "Custom List" tab at the top of the tool. You can type individual restaurant or recipe names, or click "Bulk Paste" to load an entire list of your local favorite spots all at once.'
          }
        },
        {
          '@type': 'Question',
          name: 'How does elimination or "No Repeat" mode work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'When you enable "No Repeat (Elimination)", the food that wins the spin is temporarily removed from subsequent spins. This is ideal when planning meals for multiple days or picking different meals for each member of a group.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I filter specifically for healthy foods or fast food?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Use the filter buttons to isolate healthy nutrient-dense options, quick fast food staples, specific meal times (breakfast, lunch, dinner, snack, dessert), or regional cuisines like Mexican, Italian, and Asian.'
          }
        }
      ]
    }
  ]
};

export default function FoodWheelPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbfe] dark:bg-[#0f1017] text-[#1f2029] dark:text-[#e4e1ed] transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_DATA) }}
      />

      {/* Global Header */}
      <SubpageHeader activePage="/food-wheel" />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 lg:pt-32 pb-16 flex-1 w-full">
          {/* Breadcrumb Navigation */}
          <div className="mb-4">
            <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <Link href="/" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/decisions" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                Decisions
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-gray-900 dark:text-white font-medium" aria-current="page">
                Food Wheel
              </span>
            </nav>
          </div>

          {/* HERO SECTION */}
          <section className="mb-8 text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-600 dark:text-orange-400">
              <Utensils className="w-3.5 h-3.5" />
              <span>Free Random Food Picker & Wheel Spinner</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 dark:text-white tracking-tight">
              Food Spin the Wheel
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Stuck on what to eat? Spin our free food wheel spinner to randomly choose dinner, lunch, breakfast, snacks, or desserts. Filter by cuisine or dietary preference, or build your own custom restaurant list in seconds.
            </p>
          </section>

        {/* INTERACTIVE FOOD WHEEL ENGINE */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
          <FoodWheelEngine />
        </section>

        {/* EDITORIAL CONTENT */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
          {/* SECTION 1: WHAT IS A FOOD WHEEL */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Compass className="w-6 h-6 text-orange-500" />
              What is a Food Spin the Wheel?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              A <strong>food spin the wheel</strong> (also known as a <em>food wheel spinner</em>, <em>food randomizer</em>, or <em>wheel of food</em>) is an interactive decision tool that resolves culinary indecision. By dividing potential meal ideas into randomized sectors on an animated wheel, it transforms the tiring daily question of &quot;What should we eat?&quot; into an engaging, gamified moment.
            </p>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Whether you are an individual suffering from decision fatigue after a long workday, a couple locked in circular debate over takeout, or a family trying to pick a weekend restaurant that pleases everyone, this random food picker delivers an unbiased, instant answer.
            </p>
          </section>

          {/* SECTION 2: HOW TO USE */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <ChefHat className="w-6 h-6 text-orange-500" />
              How to Use the Food Wheel Spinner
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Getting an instant meal recommendation takes less than ten seconds. Here is the recommended step-by-step workflow:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white dark:bg-[#161722] border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold flex items-center justify-center mb-2">
                  1
                </div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Select Meal & Diet</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Choose between Breakfast, Lunch, Dinner, Snack, or Dessert. Filter by regional cuisines or toggle Healthy vs. Fast Food options.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#161722] border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold flex items-center justify-center mb-2">
                  2
                </div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Spin or Pick Instantly</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Click the center <strong>SPIN</strong> button, tap your keyboard <kbd className="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-[10px]">Spacebar</kbd>, or use the Instant Pick button if you need an answer immediately.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#161722] border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold flex items-center justify-center mb-2">
                  3
                </div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Find Nearby or Re-spin</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  View the selected dish, check delicious pairings, or tap &quot;Find Nearby&quot; to open Google Maps and view local restaurants serving that food.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 3: WHEN IT IS USEFUL */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-orange-500" />
              When is a Food Wheel Most Useful?
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-[#161722] border border-gray-200 dark:border-gray-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">Beating Evening Decision Fatigue</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                    After spending hours making complex cognitive choices at work or school, choosing what to prepare for dinner is often the final straw that triggers procrastination. Outsourcing low-consequence dinner choices preserves your mental energy.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-[#161722] border border-gray-200 dark:border-gray-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">Escaping Repetitive Food Ruts</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                    Most households cycle between the same 3 to 4 predictable meals week after week. The food randomizer exposes you to global cuisines and pairings you may not have considered in months.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-[#161722] border border-gray-200 dark:border-gray-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">Planning Multi-Day Meal Schedules</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                    By enabling <strong>No Repeat (Elimination) mode</strong>, you can spin 5 or 7 consecutive times to generate an entire week&apos;s worth of varied, unique dinners without repeats.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: DINNER DECISION EXAMPLES */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Pizza className="w-6 h-6 text-orange-500" />
              Dinner Decision Examples: Common Dilemmas Solved
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#fbf9fe] dark:bg-[#1a1b28] border border-[#eceaf6] dark:border-[#27283c]">
                <h3 className="text-sm font-bold text-orange-600 dark:text-orange-400 mb-1 flex items-center gap-1.5">
                  <Coffee className="w-4 h-4" /> The Friday Night Takeout Stalemate
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  <strong>The Dilemma:</strong> One person wants spicy Thai noodles, another wants wood-fired pizza, and the third wants Mexican street tacos.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <strong>The Solution:</strong> Agree beforehand that the wheel&apos;s decision is binding. Spin once. If it lands on Thai, whoever loses gets to pick the dessert or movie!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#fbf9fe] dark:bg-[#1a1b28] border border-[#eceaf6] dark:border-[#27283c]">
                <h3 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-1.5">
                  <Salad className="w-4 h-4" /> Healthy Cooking vs. Quick Indulgence
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  <strong>The Dilemma:</strong> You know you want something wholesome, but you are also tempted by fast casual comfort food.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <strong>The Solution:</strong> Toggle &quot;Healthy Food Only&quot; to pick between salmon quinoa bowls, lentil soups, or Mediterranean pitas, locking in nutritional discipline.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 5: GROUP AND FAMILY USE */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Users className="w-6 h-6 text-orange-500" />
              Group & Family Use: Ending the &quot;I Don&apos;t Care, What Do You Want?&quot; Loop
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              When dining with roommates, partners, or children, asking &quot;Where should we eat?&quot; often produces passive shrugs followed by subtle vetoes. Psychologists refer to this as <em>pluralistic ignorance</em>—everyone tries to be polite by accommodating others, resulting in no decision being made.
            </p>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              The <strong>Food Wheel Spinner</strong> breaks this cycle by introducing an impartial external arbiter. A popular household rule is the <strong>&quot;One Veto Rule&quot;</strong>: every group member gets one veto per evening. If the wheel lands on a dish someone genuinely cannot stomach, they can veto it for a single re-spin—after which the second result is final.
            </p>
          </section>

          {/* SECTION 6: CLASSROOM, OFFICE, & PARTY USE */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <ChefHat className="w-6 h-6 text-orange-500" />
              Classroom, Office, & Party Uses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-[#161722] border border-gray-200 dark:border-gray-800">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Office Team Lunches</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Stop 20-minute Slack poll debates. Load nearby downtown lunch spots into the Custom List and spin during morning standup.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-[#161722] border border-gray-200 dark:border-gray-800">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Classroom Cooking Labs</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Culinary and nutrition teachers spin the wheel to assign mystery ingredients or global cuisines to student cooking teams.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-[#161722] border border-gray-200 dark:border-gray-800">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Potluck Party Themes</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Spin to decide the overall cuisine theme for your next game night, friendsgiving, or neighborhood potluck gathering.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 7: CSPRNG FAIRNESS */}
          <section className="space-y-4 p-6 rounded-2xl bg-indigo-50/50 dark:bg-[#181928] border border-indigo-100 dark:border-indigo-900/40">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              CSPRNG Randomness: Why Our Food Randomizer is Completely Fair
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Unlike generic random spinners that use basic pseudo-random formulas (which can suffer from repeating patterns or biased seed distribution), SpinWheelGames.org uses the <strong>Web Cryptography API (crypto.getRandomValues)</strong>.
            </p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              This hardware-grade cryptographic entropy ensures that every meal sector on the wheel has an exact, mathematically uniform probability of landing on any spin. No food is favored, and your custom restaurant lists remain private inside your device.
            </p>
          </section>

          {/* SECTION 8: FAQ */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-orange-500" />
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-white dark:bg-[#161722] border border-gray-200 dark:border-gray-800">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                  Can I add my own local restaurants to the wheel?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Yes! Click the <strong>Custom List</strong> tab at the top of the wheel. You can add individual local takeout spots or click &quot;Bulk Paste&quot; to paste a whole list from your notes or messages.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#161722] border border-gray-200 dark:border-gray-800">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                  How does elimination mode ensure no repeats?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  When you activate &quot;No Repeat (Elimination)&quot;, any food that is selected is removed from subsequent rounds. This allows you to spin five consecutive times to plan five completely distinct meals for the week.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#161722] border border-gray-200 dark:border-gray-800">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                  Does this tool require an account or cost anything?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  No. The Food Spin the Wheel is 100% free with no account creation, no sign-ups, and no paywalls. It runs entirely in your web browser.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#161722] border border-gray-200 dark:border-gray-800">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                  Can I use the wheel on mobile phones and tablets?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Yes. The wheel is designed with responsive HTML5 touch gestures, tap-to-spin controls, and full-screen optimization for iOS and Android devices.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 9: RELATED TOOLS */}
          <section className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Explore Related Decision Wheels & Pickers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Link
                href="/decision-wheel"
                className="p-3.5 rounded-xl bg-white dark:bg-[#161722] border border-gray-200 dark:border-gray-800 hover:border-orange-500/50 transition-all group"
              >
                <h3 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors flex items-center justify-between">
                  <span>Decision Wheel</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                  Break analysis paralysis on daily choices.
                </p>
              </Link>

              <Link
                href="/yes-or-no-wheel"
                className="p-3.5 rounded-xl bg-white dark:bg-[#161722] border border-gray-200 dark:border-gray-800 hover:border-orange-500/50 transition-all group"
              >
                <h3 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors flex items-center justify-between">
                  <span>Yes or No Wheel</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                  Fast 50/50 binary choice decider.
                </p>
              </Link>

              <Link
                href="/wheel-of-names"
                className="p-3.5 rounded-xl bg-white dark:bg-[#161722] border border-gray-200 dark:border-gray-800 hover:border-orange-500/50 transition-all group"
              >
                <h3 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors flex items-center justify-between">
                  <span>Wheel of Names</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                  Fair random student and raffle picker.
                </p>
              </Link>

              <Link
                href="/random-object-generator"
                className="p-3.5 rounded-xl bg-white dark:bg-[#161722] border border-gray-200 dark:border-gray-800 hover:border-orange-500/50 transition-all group"
              >
                <h3 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors flex items-center justify-between">
                  <span>Random Objects</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                  1,000+ items for games, drawing, and stories.
                </p>
              </Link>
            </div>
          </section>
        </article>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
