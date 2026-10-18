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
  Salad,
  Flame,
  Shuffle
} from 'lucide-react';
import FoodWheelEngine from '@/components/food/FoodWheelEngine';
import PresetLaunchButton from '@/components/food/PresetLaunchButton';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  "title": "Food Wheel – What to Eat Picker | SpinWheelGames",
  "description": "Spin the free food wheel to randomly decide dinner, lunch, breakfast, fast food, Indian, Asian, or vegetarian meals. Stack filters or import custom restaurant lists!",
  "alternates": {
    "canonical": "https://spinwheelgames.org/food-wheel"
  },
  "openGraph": {
    "title": "Food Wheel – What to Eat Picker | SpinWheelGames",
    "description": "Spin the free food wheel to randomly decide dinner, lunch, breakfast, fast food, Indian, Asian, or vegetarian meals. Stack filters or import custom restaurant lists!",
    "url": "https://spinwheelgames.org/food-wheel",
    "siteName": "SpinWheelGames",
    "locale": "en_US",
    "type": "website",
    "images": [
      {
        "url": "https://spinwheelgames.org/api/og?path=%2Ffood-wheel&title=Food+Wheel+%E2%80%93+What+to+Eat+Picker+%7C+SpinWheelGames&desc=Spin+the+free+food+wheel+to+randomly+decide+dinner%2C+lunch%2C+breakfast%2C+fast+food%2C+Indian%2C+Asian%2C+or+vegetarian+meals.+Stack+filters+or+import+custom+restaurant+lists%21",
        "width": 1200,
        "height": 630,
        "alt": "Food Wheel – What to Eat Picker | SpinWheelGames"
      }
    ]
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Food Wheel – What to Eat Picker | SpinWheelGames",
    "description": "Spin the free food wheel to randomly decide dinner, lunch, breakfast, fast food, Indian, Asian, or vegetarian meals. Stack filters or import custom restaurant lists!",
    "images": [
      "https://spinwheelgames.org/api/og?path=%2Ffood-wheel&title=Food+Wheel+%E2%80%93+What+to+Eat+Picker+%7C+SpinWheelGames&desc=Spin+the+free+food+wheel+to+randomly+decide+dinner%2C+lunch%2C+breakfast%2C+fast+food%2C+Indian%2C+Asian%2C+or+vegetarian+meals.+Stack+filters+or+import+custom+restaurant+lists%21"
    ]
  }
};

const JSON_LD_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://spinwheelgames.org/food-wheel#webapp',
      name: 'Food Wheel - What Should I Eat Generator & Dinner Picker',
      url: 'https://spinwheelgames.org/food-wheel',
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript and HTML5 canvas support',
      description:
        'Free online food wheel, dinner wheel, and random food picker. Solve meal indecision with curated presets, stackable dietary filters, and custom restaurant lists.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '1540',
        bestRating: '5',
        worstRating: '1'
      },
      featureList: [
        '10 Presets: Breakfast, Lunch, Dinner, Snacks, Dessert, Fast Food, Indian, Asian, Vegetarian, Custom',
        'Stackable dietary and cuisine filters (e.g. Vegetarian + Indian)',
        'CSPRNG hardware-grade fair random food selection',
        'Elimination and No-Repeat mode for multi-day meal planning',
        'Custom list bulk paste & CSV/TXT import with duplicate removal',
        'Instant Google Maps nearby restaurant search and recipe discovery'
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
          name: 'What is a food wheel and how does it work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A food wheel (also called a dinner wheel, food spinner, or random food picker) is an interactive decision-making tool. It places meal options on virtual wheel sectors and uses a cryptographic random number generator to select an impartial meal in seconds.'
          }
        },
        {
          '@type': 'Question',
          name: 'How do I use the dinner wheel when I cannot decide what to eat?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Simply select the Dinner preset, choose your dietary preferences (like Vegetarian or Fast Food), or type your favorite local takeout spots. Press SPIN or the Spacebar, and commit to whatever delicious dish the wheel lands on!'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I stack multiple filters like Vegetarian plus Indian food?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! The upgraded food wheel allows multi-filter stacking. You can select Indian cuisine and toggle the Vegetarian filter to view only meat-free Indian specialties like Paneer Butter Masala, Chana Masala, and Masala Dosa.'
          }
        },
        {
          '@type': 'Question',
          name: 'How does elimination or No Repeat mode work for meal planning?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'When you activate No Repeat, any food that wins a spin is temporarily eliminated from subsequent rounds. This makes it effortless to spin 5 to 7 times and schedule a full week of distinct, non-repeating dinners.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I import my own restaurants using CSV or bulk text?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Switch to the Custom Food List preset to paste your own restaurant list or upload a CSV/TXT file. The tool also provides automatic duplicate removal.'
          }
        }
      ]
    }
  ]
};

export default function FoodWheelPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbfe] dark:bg-[#0f1017] text-[#1f2029] dark:text-[#e4e1ed] transition-colors w-full max-w-full overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_DATA) }}
      />

      {/* Global Header */}
      <SubpageHeader activePage="/food-wheel" />

      <main className="flex-1 w-full max-w-full overflow-x-clip space-y-6 sm:space-y-10 pb-16">
        {/* Top Header & Interactive Wheel Section Above the Fold */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-22 space-y-3 sm:space-y-4">
          <Breadcrumbs
            items={[
              { label: 'Food & Meals', href: '/food' },
              { label: 'Food Wheel & Dinner Picker' }
            ]}
          />

          {/* Compact Hero Banner Header */}
          <div className="text-center max-w-3xl mx-auto space-y-1.5 pt-0 pb-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
              <Utensils className="w-3.5 h-3.5" />
              <span>Food Wheel • Food Wheel Spin • Random Food Picker</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-gray-950 dark:text-white tracking-tight">
              Food Wheel &amp; Dinner Picker
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Stuck asking &quot;What should I eat?&quot; Spin the free <strong>food wheel</strong> to randomly pick dinner, fast food, snacks, Indian, Asian, or vegetarian dishes. Stack dietary filters or paste your local restaurants for instant meal decisions.
            </p>
          </div>

          {/* Interactive Food Wheel Engine Container */}
          <div id="tool-interactive" className="w-full pt-1">
            <FoodWheelEngine initialPreset="dinner" />
          </div>
        </section>

        {/* Provable Fairness & Privacy Bar (Home Style) */}
        <section className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#eeedf7] dark:border-[#222330] bg-white dark:bg-[#151620] p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-[#464554] dark:text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-semibold text-[#1a1b22] dark:text-white">
                  Client-Side Web Cryptography (crypto.getRandomValues)
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#696779] dark:text-slate-400">
                <ChefHat className="w-3.5 h-3.5 text-orange-500" />
                <span>100% Impartial Food Selection</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Zero Account Required • Stackable Cuisines • No Repeat Mode</span>
            </div>
          </div>
        </section>

        {/* SEARCH INTENT CONTENT & EDITORIAL GUIDES */}
        <article className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          {/* SECTION 1: WHAT SHOULD I EAT? */}
          <section className="space-y-5 p-6 sm:p-8 lg:p-9 rounded-3xl bg-white dark:bg-[#161722] border border-gray-200/80 dark:border-gray-800 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2.5">
                <Compass className="w-6 h-6 text-orange-500" />
                &quot;What Should I Eat?&quot; Ending Decision Fatigue
              </h2>
              <div className="flex flex-wrap gap-1.5">
                <PresetLaunchButton presetId="dinner" label="Dinner Wheel" emoji="🍲" />
                <PresetLaunchButton presetId="fast-food" label="Fast Food" emoji="🍔" />
                <PresetLaunchButton presetId="asian" label="Asian Food" emoji="🍜" />
              </div>
            </div>

            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Every day, average adults make over 200 food-related decisions: what to eat for breakfast, whether to grab a mid-afternoon snack, what groceries to buy, and what to cook for dinner. By 7:00 PM, your brain has depleted its cognitive reserves. This state of mental exhaustion—known clinically as <strong>decision fatigue</strong>—leads directly to stalling, ordering unhealthy convenience food on impulse, or engaging in endless &quot;I don&apos;t know, what do you want?&quot; arguments.
            </p>

            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              The <strong>wheel of food</strong> acts as your objective culinary arbiter. Instead of scrolling through thirty delivery menus or staring blankly into an open refrigerator, you hand the choice to fair probability. Psychologists recommend the <em>3-second gut check rule</em>: while the food spinner is in motion, notice which option your subconscious mind roots for. If you cheer when it lands on Thai noodles, enjoy them! If you feel a twinge of regret, immediately switch to your true craving without remorse.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 pt-2">
              <div className="p-5 sm:p-6 rounded-2xl bg-orange-50/70 dark:bg-[#201c1f] border border-orange-100 dark:border-orange-950/40 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-orange-700 dark:text-orange-400 mb-1.5">Instant Relief</h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Cut dinner discussions from 25 minutes down to a single 4-second spin.
                </p>
              </div>
              <div className="p-5 sm:p-6 rounded-2xl bg-orange-50/70 dark:bg-[#201c1f] border border-orange-100 dark:border-orange-950/40 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-orange-700 dark:text-orange-400 mb-1.5">Break Monotony</h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Discover recipes and cuisines outside your regular 3-dish cooking loop.
                </p>
              </div>
              <div className="p-5 sm:p-6 rounded-2xl bg-orange-50/70 dark:bg-[#201c1f] border border-orange-100 dark:border-orange-950/40 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-orange-700 dark:text-orange-400 mb-1.5">Zero Arguments</h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Unbiased randomness ensures nobody in the household feels forced or overruled.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 2: HOW TO USE A FOOD WHEEL */}
          <section className="space-y-5 p-6 sm:p-8 lg:p-9 rounded-3xl bg-white dark:bg-[#161722] border border-gray-200/80 dark:border-gray-800 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2.5">
                <ChefHat className="w-6 h-6 text-orange-500" />
                How to Use a Food Wheel: Step-by-Step
              </h2>
              <div className="flex flex-wrap gap-1.5">
                <PresetLaunchButton presetId="breakfast" label="Breakfast" emoji="🥞" />
                <PresetLaunchButton presetId="lunch" label="Lunch" emoji="🥪" />
                <PresetLaunchButton presetId="custom" label="Custom List" emoji="📝" />
              </div>
            </div>

            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Whether you want to pick tonight&apos;s dinner from curated global recipes or spin between your local takeout neighborhood joints, the food spinner workflow is straightforward:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 pt-2">
              <div className="p-5 sm:p-6 rounded-2xl bg-gray-50/80 dark:bg-[#1e1f2d] border border-gray-200/60 dark:border-gray-800 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-xl bg-orange-500 text-white font-extrabold flex items-center justify-center text-sm mb-3 shadow-xs">
                    1
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1.5">Choose a Preset</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Click any of the 10 preset buttons: Breakfast, Lunch, Dinner, Snacks, Dessert, Fast Food, Indian, Asian, Vegetarian, or Custom.
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-gray-50/80 dark:bg-[#1e1f2d] border border-gray-200/60 dark:border-gray-800 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-xl bg-orange-500 text-white font-extrabold flex items-center justify-center text-sm mb-3 shadow-xs">
                    2
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1.5">Stack Filters</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Combine dietary and cuisine tags together. For example, toggle <strong>Vegetarian</strong> while selecting <strong>Indian</strong> cuisine to isolate meat-free curries.
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-gray-50/80 dark:bg-[#1e1f2d] border border-gray-200/60 dark:border-gray-800 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-xl bg-orange-500 text-white font-extrabold flex items-center justify-center text-sm mb-3 shadow-xs">
                    3
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1.5">Spin or Pick</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Hit <strong>SPIN FOOD WHEEL</strong>, tap your keyboard <kbd className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-800 text-[10px] font-mono">Spacebar</kbd>, or tap <strong>Instant Pick</strong> for zero wait time.
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-gray-50/80 dark:bg-[#1e1f2d] border border-gray-200/60 dark:border-gray-800 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-xl bg-orange-500 text-white font-extrabold flex items-center justify-center text-sm mb-3 shadow-xs">
                    4
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1.5">Eat or Eliminate</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Open Google Maps with &quot;Find Places Near Me&quot;, look up the recipe, or click &quot;Eliminate&quot; to banish the winner from future spins this week.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: FOOD WHEEL FOR DINNER */}
          <section className="space-y-5 p-6 sm:p-8 lg:p-9 rounded-3xl bg-white dark:bg-[#161722] border border-gray-200/80 dark:border-gray-800 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2.5">
                <Pizza className="w-6 h-6 text-orange-500" />
                Food Wheel for Dinner: Solving Nightly Dilemmas
              </h2>
              <div className="flex flex-wrap gap-1.5">
                <PresetLaunchButton presetId="dinner" label="Dinner Wheel" emoji="🍲" />
                <PresetLaunchButton presetId="indian" label="Indian Food" emoji="🍛" />
                <PresetLaunchButton presetId="vegetarian" label="Vegetarian" emoji="🥗" />
              </div>
            </div>

            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              The evening meal is universally the hardest food choice of the day. Unlike breakfast (which is often routine) or lunch (frequently eaten solo at school or work), dinner brings multiple appetites, varying dietary restrictions, and kitchen fatigue into collision.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 pt-2">
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#faf8fd] to-white dark:from-[#1b1c2b] dark:to-[#161722] border border-gray-200 dark:border-gray-800 shadow-xs">
                <h3 className="text-base font-bold text-orange-600 dark:text-orange-400 mb-2 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> The Friday Night Takeout Impasse
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  <strong>The Problem:</strong> One partner craves spicy Indian tikka masala, another wants wood-fired pepperoni pizza, and a friend wants Japanese tonkotsu ramen.
                </p>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2.5">
                  <strong>The Solution:</strong> Switch to the <em>Dinner preset</em> or load all three restaurants into the Custom List. Let the <strong>dinner wheel spin</strong> decide. The person whose craving didn&apos;t win gets first pick of dessert or the weekend movie.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#faf8fd] to-white dark:from-[#1b1c2b] dark:to-[#161722] border border-gray-200 dark:border-gray-800 shadow-xs">
                <h3 className="text-base font-bold text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-2">
                  <Shuffle className="w-4 h-4" /> 7-Day Meal Prep (Elimination Mode)
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  <strong>The Problem:</strong> Planning a week of dinners is exhausting, and cooking the same pasta dish five times in a row gets depressing.
                </p>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2.5">
                  <strong>The Solution:</strong> Turn on <strong>No Repeat (Elimination) mode</strong>. Spin on Sunday evening seven times. Each winning meal is subtracted from the pool, yielding a perfectly varied 7-day dinner calendar with no repeats.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 4: RANDOM FOOD PICKER */}
          <section className="space-y-5 p-6 sm:p-8 lg:p-9 rounded-3xl bg-white dark:bg-[#161722] border border-gray-200/80 dark:border-gray-800 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2.5">
                <ShieldCheck className="w-6 h-6 text-indigo-500" />
                Random Food Picker: Cryptographic Fairness & Mathematics
              </h2>
              <div className="flex flex-wrap gap-1.5">
                <PresetLaunchButton presetId="fast-food" label="Fast Food" emoji="🍔" />
                <PresetLaunchButton presetId="snacks" label="Snacks" emoji="🥨" />
                <PresetLaunchButton presetId="dessert" label="Dessert" emoji="🍰" />
              </div>
            </div>

            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              When people use a digital <strong>random food picker</strong>, fairness is paramount. Cheap spinner apps frequently use standard <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-xs">Math.random()</code> algorithms seeded with timestamps, which can produce predictable repeats, cluster tendencies, or biased landing zones.
            </p>

            <div className="p-5 sm:p-6 rounded-2xl bg-indigo-50/50 dark:bg-[#191a2a] border border-indigo-100 dark:border-indigo-900/40 text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-2.5 shadow-xs">
              <div className="font-bold text-sm sm:text-base text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                Hardware-Grade CSPRNG Randomness
              </div>
              <p>
                SpinWheelGames.org computes every food wheel spin using the browser&apos;s native <strong>Web Cryptography API (<code className="px-1.5 py-0.5 rounded bg-white dark:bg-black/40 font-mono text-xs">crypto.getRandomValues</code>)</strong>. This gathers true entropy directly from your operating system hardware, guaranteeing that every single meal slice on the wheel has an exact, uniform 1/N probability of winning.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                No sponsored restaurants, no algorithmic nudges toward fast food, and zero tracking of your food choices.
              </p>
            </div>
          </section>

          {/* SECTION 5: POPULAR MEAL CATEGORIES BREAKDOWN */}
          <section className="space-y-5 p-6 sm:p-8 lg:p-9 rounded-3xl bg-white dark:bg-[#161722] border border-gray-200/80 dark:border-gray-800 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2.5">
              <Utensils className="w-6 h-6 text-orange-500" />
              Popular Food Wheel Categories & Cuisines
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 pt-2">
              <div className="p-5 sm:p-6 rounded-2xl bg-gray-50/80 dark:bg-[#1e1f2d] border border-gray-200/70 dark:border-gray-800 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-3xl mb-2.5 block">🍛</span>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1.5">Indian Food Wheel</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    Butter chicken, paneer butter masala, Hyderabadi biryani, chole bhature, palak paneer, and garlic naan.
                  </p>
                </div>
                <PresetLaunchButton presetId="indian" label="Spin Indian Food" emoji="🍛" />
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-gray-50/80 dark:bg-[#1e1f2d] border border-gray-200/70 dark:border-gray-800 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-3xl mb-2.5 block">🍜</span>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1.5">Asian Food Wheel</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    Tonkotsu ramen, authentic pad thai, spicy tuna sushi, dim sum dumplings, Vietnamese pho, and bibimbap.
                  </p>
                </div>
                <PresetLaunchButton presetId="asian" label="Spin Asian Wheel" emoji="🍜" />
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-gray-50/80 dark:bg-[#1e1f2d] border border-gray-200/70 dark:border-gray-800 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-3xl mb-2.5 block">🥗</span>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1.5">Vegetarian Wheel</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    100% meat-free comfort dishes: falafel mezze, Mediterranean shakshuka, paneer tikka, and vegetarian enchiladas.
                  </p>
                </div>
                <PresetLaunchButton presetId="vegetarian" label="Spin Vegetarian" emoji="🥗" />
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-gray-50/80 dark:bg-[#1e1f2d] border border-gray-200/70 dark:border-gray-800 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-3xl mb-2.5 block">🍔</span>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1.5">Fast Food Wheel</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    Smash double cheeseburgers, crispy chicken sandwiches, street tacos, pepperoni pizza, and loaded burritos.
                  </p>
                </div>
                <PresetLaunchButton presetId="fast-food" label="Spin Fast Food" emoji="🍔" />
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-gray-50/80 dark:bg-[#1e1f2d] border border-gray-200/70 dark:border-gray-800 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-3xl mb-2.5 block">🥞</span>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1.5">Breakfast & Brunch</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    Fluffy buttermilk pancakes, avocado toast with poached eggs, acai bowls, eggs benedict, and Belgian waffles.
                  </p>
                </div>
                <PresetLaunchButton presetId="breakfast" label="Spin Breakfast" emoji="🥞" />
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-gray-50/80 dark:bg-[#1e1f2d] border border-gray-200/70 dark:border-gray-800 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-3xl mb-2.5 block">🍰</span>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1.5">Desserts & Sweet Treats</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    Molten chocolate lava cake, classic tiramisu, cinnamon churros, pistachio gelato, and warm gulab jamun.
                  </p>
                </div>
                <PresetLaunchButton presetId="dessert" label="Spin Dessert Wheel" emoji="🍰" />
              </div>
            </div>
          </section>

          {/* SECTION 6: FAQ */}
          <section className="space-y-5 p-6 sm:p-8 lg:p-9 rounded-3xl bg-white dark:bg-[#161722] border border-gray-200/80 dark:border-gray-800 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2.5">
              <HelpCircle className="w-6 h-6 text-orange-500" />
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-3.5">
              <div className="p-5 sm:p-6 rounded-2xl bg-gray-50/80 dark:bg-[#1a1b28] border border-gray-200/70 dark:border-gray-800 shadow-xs">
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1.5">
                  How does the food wheel choose what I should eat?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  The food wheel takes all eligible dishes from your active preset or custom restaurant list, places them onto equal slices, and uses cryptographic entropy to spin and land on an unbiased outcome. You can inspect pairings, find nearby restaurants on Google Maps, or eliminate the dish if you want a re-spin.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-gray-50/80 dark:bg-[#1a1b28] border border-gray-200/70 dark:border-gray-800 shadow-xs">
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1.5">
                  Can I stack multiple dietary filters like Vegetarian plus Indian food?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Yes! All filters are stackable. You can select Indian cuisine from the dropdown and toggle the &quot;Vegetarian Only&quot; button to spin only vegetarian Indian dishes like Paneer Butter Masala, Chole Bhature, and Palak Paneer. You can also stack Healthy or Fast Food tags simultaneously.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-gray-50/80 dark:bg-[#1a1b28] border border-gray-200/70 dark:border-gray-800 shadow-xs">
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1.5">
                  How does elimination (No Repeat) mode work for weekly meal planning?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  When No Repeat is enabled, the winning food from each spin is automatically eliminated from future spins. This allows families or roommates to spin five to seven times to plan an entire week of varied dinners without duplicate meals.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-gray-50/80 dark:bg-[#1a1b28] border border-gray-200/70 dark:border-gray-800 shadow-xs">
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1.5">
                  Can I import my own restaurants or recipes via CSV or text?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Yes. Switch to the <strong>Custom Food List</strong> preset above the wheel. You can enter restaurants individually, paste a list from your notes using &quot;Bulk Paste&quot;, or upload a CSV/TXT file. The tool also includes a single-click &quot;Remove Duplicates&quot; button.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-gray-50/80 dark:bg-[#1a1b28] border border-gray-200/70 dark:border-gray-800 shadow-xs">
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1.5">
                  Is this tool 100% free with no account required?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Yes. The food wheel is completely free and operates entirely inside your web browser. No registration, no app downloads, and no advertisements interrupting your spins.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 7: RELATED DECISION TOOLS */}
          <section className="space-y-5 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Explore Related Decision Wheels & Pickers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              <Link
                href="/decision-wheel"
                className="p-5 rounded-2xl bg-white dark:bg-[#161722] border border-gray-200 dark:border-gray-800 hover:border-orange-500/50 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors flex items-center justify-between mb-1.5">
                    <span>Decision Wheel</span>
                    <ArrowRight className="w-4 h-4" />
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    Break analysis paralysis on daily choices.
                  </p>
                </div>
              </Link>

              <Link
                href="/yes-or-no-wheel"
                className="p-5 rounded-2xl bg-white dark:bg-[#161722] border border-gray-200 dark:border-gray-800 hover:border-orange-500/50 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors flex items-center justify-between mb-1.5">
                    <span>Yes or No Wheel</span>
                    <ArrowRight className="w-4 h-4" />
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    Fast 50/50 binary choice decider.
                  </p>
                </div>
              </Link>

              <Link
                href="/wheel-of-names"
                className="p-5 rounded-2xl bg-white dark:bg-[#161722] border border-gray-200 dark:border-gray-800 hover:border-orange-500/50 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors flex items-center justify-between mb-1.5">
                    <span>Wheel of Names</span>
                    <ArrowRight className="w-4 h-4" />
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    Fair random student and raffle picker.
                  </p>
                </div>
              </Link>

              <Link
                href="/random-object-generator"
                className="p-5 rounded-2xl bg-white dark:bg-[#161722] border border-gray-200 dark:border-gray-800 hover:border-orange-500/50 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors flex items-center justify-between mb-1.5">
                    <span>Random Objects</span>
                    <ArrowRight className="w-4 h-4" />
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    1,000+ items for games, drawing, and stories.
                  </p>
                </div>
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
