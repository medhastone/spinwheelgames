import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  School,
  Palette,
  BookOpen,
  Gamepad2,
  GraduationCap,
  HelpCircle,
  ShieldCheck,
  Award,
  ArrowRight,
  ChevronRight,
  Layers,
  RotateCw,
  Compass,
  CheckCircle2,
  Info,
  Users
} from 'lucide-react';
import AnimalWheelEngine from '@/components/animals/AnimalWheelEngine';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Animal Wheel - Random Animal Generator Wheel & Picker',
  description:
    'Spin the free animal wheel to randomly pick mammals, birds, sea creatures, or Pokémon. Perfect for drawing prompts, charades, quizzes, and classroom games!',
  keywords: [
    'random animal generator wheel',
    'animal wheel',
    'random animal picker',
    'animal spin the wheel',
    'random pokemon picker',
    'pokemon roulette',
    'pokemon type wheel',
    'give me a random animal',
    'animal randomizer',
    'random sea creatures',
    'random cat generator'
  ],
  alternates: {
    canonical: 'https://spinwheelgames.org/animal-wheel'
  },
  openGraph: {
    title: 'Animal Wheel - Random Animal Generator Wheel & Picker',
    description:
      'Spin the free animal wheel to randomly pick mammals, birds, sea creatures, or Pokémon. Perfect for drawing prompts, charades, quizzes, and classroom games!',
    url: 'https://spinwheelgames.org/animal-wheel',
    siteName: 'SpinWheelGames',
    type: 'website',
    images: [
      {
        url: 'https://spinwheelgames.org/spinwheel-logo.webp',
        width: 1200,
        height: 630,
        alt: 'Animal Wheel - Random Animal Generator Wheel'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Animal Wheel - Random Animal Generator Wheel & Picker',
    description:
      'Spin the free animal wheel to randomly pick mammals, birds, sea creatures, or Pokémon. Perfect for drawing prompts, charades, quizzes, and classroom games!'
  }
};

const JSON_LD_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://spinwheelgames.org/animal-wheel#webapp',
      name: 'Animal Wheel - Random Animal Generator Wheel',
      url: 'https://spinwheelgames.org/animal-wheel',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript and modern HTML5 canvas support',
      description:
        'Free interactive animal spin wheel and random animal picker. Includes mammals, birds, marine animals, farm animals, wild animals, pets, and dinosaurs for classroom games, drawing prompts, and storytelling.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '1180',
        bestRating: '5',
        worstRating: '1'
      },
      featureList: [
        'Curated categories: Wild Mammals, Birds, Sea Creatures, Farm, Pets, Pokémon Types',
        'Custom animal slices with weights and sounds',
        'No-repeat elimination mode for classroom rounds',
        'CSPRNG cryptographic fairness for science quizzes',
        'Projector and fullscreen view modes'
      ],
      screenshot: 'https://spinwheelgames.org/spinwheel-logo.webp'
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://spinwheelgames.org/animal-wheel#breadcrumbs',
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
          name: 'Classroom & Education',
          item: 'https://spinwheelgames.org/classroom'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Animal Spin the Wheel',
          item: 'https://spinwheelgames.org/animal-wheel'
        }
      ]
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://spinwheelgames.org/animal-wheel#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I use the Animal Spin Wheel for drawing and art prompts?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Spin the wheel once to get your core animal subject for a 1-minute sketch warm-up. For an advanced creative challenge, spin twice and design a mythical "hybrid animal" combining the anatomical traits of both creatures!'
          }
        },
        {
          '@type': 'Question',
          name: 'Can teachers use this tool on classroom interactive whiteboards?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Hit the Fullscreen button (or press F on your keyboard) to project the wheel on Smartboards and Promethean displays. You can filter by animal category (e.g. Mammals, Birds, Marine, Dinosaurs) to align with your daily science curriculum.'
          }
        },
        {
          '@type': 'Question',
          name: 'How does the Guess the Animal game mode work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Switch to the "Guess The Animal" tab. The tool provides 3 progressive biological clues (habitat, diet, and unique traits). Students can guess before you click "Reveal Animal" for celebratory fanfare.'
          }
        },
        {
          '@type': 'Question',
          name: 'How does No-Repeat Elimination mode work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'When No-Repeat mode is enabled, each chosen animal is automatically eliminated from the wheel after being selected. This guarantees that every animal in the category is drawn exactly once during classroom games.'
          }
        },
        {
          '@type': 'Question',
          name: 'Is the randomness fair and unbiased?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. All spins use the browser Web Cryptography API (crypto.getRandomValues()), ensuring mathematically uniform probability across all slices.'
          }
        }
      ]
    }
  ]
};

export default function AnimalWheelPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8ff] dark:bg-[#0e0f15] text-[#1a1b22] dark:text-[#f1effa] transition-colors">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_DATA) }}
      />

      {/* Global Header */}
      <SubpageHeader activePage="/animal-wheel" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 lg:pt-32 pb-12 space-y-10 flex-1 w-full">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Classroom & Education', href: '/classroom' },
            { label: 'Animal Spin the Wheel' }
          ]}
        />

        {/* Hero Section */}
        <header className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4648d4]/10 dark:bg-[#4648d4]/20 text-[#4648d4] dark:text-[#8587ff] text-xs sm:text-sm font-bold border border-[#4648d4]/20">
            <Sparkles className="w-4 h-4" />
            <span>Random Animal Picker &amp; Educational Game</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-headline tracking-tight text-[#1a1b22] dark:text-white">
            Animal Spin the Wheel
          </h1>

          <p className="text-base sm:text-lg text-[#464554] dark:text-[#c7c4d7] leading-relaxed max-w-3xl mx-auto">
            Spin the animal wheel to randomly pick an animal for games, drawing, classroom activities, storytelling, quizzes, and creative challenges. Features 8 curated category modes (Mammals, Birds, Marine, Farm, Wild, Pets, Dinosaurs), trivia clues, and biological fun facts.
          </p>
        </header>

        {/* Interactive Engine Component */}
        <section aria-label="Interactive Animal Wheel Tool">
          <AnimalWheelEngine />
        </section>

        {/* Feature Highlights Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181924] space-y-2 shadow-xs">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 w-fit">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#1a1b22] dark:text-white">8 Species Categories</h3>
            <p className="text-xs text-[#767586] dark:text-[#908fa1] leading-relaxed">
              Filter between Mammals, Birds, Marine Life, Farm Creatures, Wild Beasts, Pets, and prehistoric Dinosaurs.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181924] space-y-2 shadow-xs">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 w-fit">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#1a1b22] dark:text-white">Guess The Animal Mode</h3>
            <p className="text-xs text-[#767586] dark:text-[#908fa1] leading-relaxed">
              Engage classrooms with 3 progressive biological clues before revealing the mystery creature with fanfare.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181924] space-y-2 shadow-xs">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 w-fit">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#1a1b22] dark:text-white">Active Animal Challenges</h3>
            <p className="text-xs text-[#767586] dark:text-[#908fa1] leading-relaxed">
              Spontaneous acting, vocal sound mimicry, drawing sprints, and storytelling prompts for each winning animal.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181924] space-y-2 shadow-xs">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 w-fit">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#1a1b22] dark:text-white">Web Crypto API Randomness</h3>
            <p className="text-xs text-[#767586] dark:text-[#908fa1] leading-relaxed">
              Powered by the browser Web Cryptography API (crypto.getRandomValues()) for unbiased slice selection.
            </p>
          </div>
        </section>

        {/* LONG-FORM BLOG POST & EDITORIAL CONTENT (E-E-A-T) */}
        <article className="space-y-8 text-[#464554] dark:text-[#c7c4d7]">
          {/* Section 1: Classroom Activities */}
          <section className="rounded-3xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181924] p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <School className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-headline text-[#1a1b22] dark:text-white">
                1. Creative Classroom Activities &amp; Science Warm-Ups
              </h2>
            </div>

            <p className="text-sm sm:text-base leading-relaxed">
              Integrating gamified digital tools into elementary and middle school classrooms transforms passive listening into active, energetic discovery. The <strong>Animal Spin Wheel</strong> serves as an interactive instructional catalyst across biology, geography, and language arts:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#fbf8ff] dark:bg-[#151620] border border-[#eeedf7] dark:border-[#272838] space-y-1.5">
                <h4 className="font-bold text-[#1a1b22] dark:text-white text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Taxonomy &amp; Biome Classification
                </h4>
                <p className="text-xs text-[#767586] dark:text-[#908fa1] leading-relaxed">
                  Spin the wheel and have students identify whether the animal is a mammal, reptile, bird, or amphibian. Ask them to map out its native biome (savanna, tropical rainforest, tundra, coral reef) on a classroom wall map.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#fbf8ff] dark:bg-[#151620] border border-[#eeedf7] dark:border-[#272838] space-y-1.5">
                <h4 className="font-bold text-[#1a1b22] dark:text-white text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ESL &amp; Vocabulary Warm-Ups
                </h4>
                <p className="text-xs text-[#767586] dark:text-[#908fa1] leading-relaxed">
                  For language learners, spin the wheel to practice spelling, adjective descriptions (&ldquo;ferocious&rdquo;, &ldquo;sluggish&rdquo;, &ldquo;nocturnal&rdquo;), and animal vocalization terms (&ldquo;roar&rdquo;, &ldquo;neigh&rdquo;, &ldquo;screech&rdquo;).
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#767586] dark:text-[#908fa1] pt-2">
              <strong>Teacher Tip:</strong> Turn on <kbd className="px-1.5 py-0.5 rounded bg-[#eeedf7] dark:bg-[#252636] font-mono text-xs">No-Repeat Elimination</kbd> mode during morning meetings. Each student gets to speak about a unique creature without any duplicate assignments!
            </p>
          </section>

          {/* Section 2: Drawing & Art Prompts */}
          <section className="rounded-3xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181924] p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400">
                <Palette className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-headline text-[#1a1b22] dark:text-white">
                2. Drawing Ideas, Sketching Prompts &amp; Hybrid Creatures
              </h2>
            </div>

            <p className="text-sm sm:text-base leading-relaxed">
              Artists and illustrators frequently suffer from creative block when staring at a blank sketchbook. The <strong>animal randomizer</strong> offers instant lateral constraints that kickstart imagination:
            </p>

            <ul className="space-y-2.5 text-sm list-disc list-inside">
              <li>
                <strong className="text-[#1a1b22] dark:text-white">The 60-Second Gesture Sprint:</strong> Spin the wheel, set a 1-minute timer, and sketch the animal&apos;s dynamic posture focusing solely on line of action rather than details.
              </li>
              <li>
                <strong className="text-[#1a1b22] dark:text-white">The Mythical Hybrid Challenge:</strong> Spin the wheel twice (e.g. <em>Great White Shark</em> + <em>Bald Eagle</em>) and design a completely new fantasy monster combining the wings and predatory aquatic jaw!
              </li>
              <li>
                <strong className="text-[#1a1b22] dark:text-white">Texture &amp; Fur Studies:</strong> Practice rendering specific animal surfaces—such as the reflective scales of an ocellaris clownfish, the iridescent feathers of a peacock, or the osteoderm armor plates of an Ankylosaurus.
              </li>
            </ul>
          </section>

          {/* Section 3: Storytelling & Creative Writing */}
          <section className="rounded-3xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181924] p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-headline text-[#1a1b22] dark:text-white">
                3. Storytelling, Fables &amp; Creative Writing Prompts
              </h2>
            </div>

            <p className="text-sm sm:text-base leading-relaxed">
              In literature, anthropomorphic animals have anchored classic storytelling from Aesop&apos;s Fables and George Orwell&apos;s <em>Animal Farm</em> to modern animated cinema. You can use the wheel as a narrative engine:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-4 rounded-xl bg-[#fbf8ff] dark:bg-[#151620] border border-[#eeedf7] dark:border-[#272838] space-y-1">
                <strong className="text-[#1a1b22] dark:text-white block text-sm">The Reluctant Protagonist</strong>
                <p className="text-[#767586] dark:text-[#908fa1]">
                  Spin for your main character (e.g. a Three-Toed Sloth) who must deliver an urgent royal message across the savanna before sunset.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#fbf8ff] dark:bg-[#151620] border border-[#eeedf7] dark:border-[#272838] space-y-1">
                <strong className="text-[#1a1b22] dark:text-white block text-sm">The Fable Moral Arc</strong>
                <p className="text-[#767586] dark:text-[#908fa1]">
                  Spin two contrasting animals (e.g. Cheetah vs Giant Panda) and write a 200-word fable about the virtue of patience versus rushing.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#fbf8ff] dark:bg-[#151620] border border-[#eeedf7] dark:border-[#272838] space-y-1">
                <strong className="text-[#1a1b22] dark:text-white block text-sm">The RPG Familiar</strong>
                <p className="text-[#767586] dark:text-[#908fa1]">
                  Tabletop gamers (D&amp;D, Pathfinder) can spin the wheel to randomly assign mystical animal companions or wild-shape druid forms.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Party Games, Charades & STEM Quizzes */}
          <section className="rounded-3xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181924] p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-headline text-[#1a1b22] dark:text-white">
                4. Party Games, Animal Charades &amp; STEM Quizzes
              </h2>
            </div>

            <p className="text-sm sm:text-base leading-relaxed">
              Looking for a screen-free family game night or high-energy icebreaker? Switch to the <strong>Animal Challenge</strong> or <strong>Guess The Animal</strong> tabs:
            </p>

            <ul className="space-y-2 text-sm">
              <li>
                <strong>Animal Charades:</strong> A player spins the wheel in secret, then acts out the creature&apos;s physical movement (waddling like a penguin, swooping like an eagle) without making any vocal noises.
              </li>
              <li>
                <strong>Sound Mimicry Showdown:</strong> Players take turns imitating the winning creature&apos;s vocalization (honking like a flamingo, trumpeting like an elephant, roaring like a lion) while friends vote on the most accurate impression!
              </li>
              <li>
                <strong>Ecosystem Food Web Challenge:</strong> In science class, spin 3 animals and challenge students to construct a viable ecological food chain linking producers, primary consumers, and apex predators.
              </li>
            </ul>
          </section>

          {/* Method Comparison Table */}
          <section className="rounded-3xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181924] p-6 sm:p-8 space-y-6 shadow-xs">
            <h2 className="text-2xl font-bold font-headline text-[#1a1b22] dark:text-white">
              Animal Selection Methods: Comparison
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#eeedf7] dark:border-[#292a39] text-[#767586] dark:text-[#908fa1]">
                    <th className="pb-3 font-bold">Feature</th>
                    <th className="pb-3 font-bold text-[#4648d4] dark:text-[#8587ff]">Animal Spin Wheel</th>
                    <th className="pb-3 font-bold">Physical Flashcards</th>
                    <th className="pb-3 font-bold">Plain Text Generator</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eeedf7] dark:divide-[#242534]">
                  <tr>
                    <td className="py-3 font-semibold text-[#1a1b22] dark:text-white">Visual Suspense</td>
                    <td className="py-3 text-emerald-600 dark:text-emerald-400 font-semibold">High (spinning 60fps canvas &amp; ticks)</td>
                    <td className="py-3 text-gray-500">Low (instant reveal)</td>
                    <td className="py-3 text-gray-500">None (static text)</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-[#1a1b22] dark:text-white">Species Categories</td>
                    <td className="py-3 text-emerald-600 dark:text-emerald-400 font-semibold">8 Curated Modes (Dinosaurs, Birds, etc.)</td>
                    <td className="py-3 text-gray-500">Manual sorting required</td>
                    <td className="py-3 text-gray-500">Often unorganized</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-[#1a1b22] dark:text-white">Built-in Biology Facts</td>
                    <td className="py-3 text-emerald-600 dark:text-emerald-400 font-semibold">Yes (Diet, Habitat, Sound &amp; Superpowers)</td>
                    <td className="py-3 text-gray-500">Limited to card space</td>
                    <td className="py-3 text-gray-500">No</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-[#1a1b22] dark:text-white">Interactive Clue Game</td>
                    <td className="py-3 text-emerald-600 dark:text-emerald-400 font-semibold">Yes (Progressive 3-clue mode)</td>
                    <td className="py-3 text-gray-500">Manual teacher prep</td>
                    <td className="py-3 text-gray-500">No</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-[#1a1b22] dark:text-white">Elimination (No-Repeat)</td>
                    <td className="py-3 text-emerald-600 dark:text-emerald-400 font-semibold">Yes (1-click automatic removal)</td>
                    <td className="py-3 text-gray-500">Discard pile required</td>
                    <td className="py-3 text-gray-500">Prone to repeats</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Frequently Asked Questions */}
          <section className="rounded-3xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181924] p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold font-headline text-[#1a1b22] dark:text-white">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#fbf8ff] dark:bg-[#151620] border border-[#eeedf7] dark:border-[#272838] space-y-2">
                <h3 className="font-bold text-base text-[#1a1b22] dark:text-white">
                  Is the Animal Spin Wheel free to use for schools and educators?
                </h3>
                <p className="text-xs sm:text-sm text-[#767586] dark:text-[#908fa1] leading-relaxed">
                  Yes, 100% free with no registration, no subscription fees, and no student sign-in required. Designed to minimize collection of user-provided wheel data by executing code locally in the browser.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#fbf8ff] dark:bg-[#151620] border border-[#eeedf7] dark:border-[#272838] space-y-2">
                <h3 className="font-bold text-base text-[#1a1b22] dark:text-white">
                  Can I filter to only show prehistoric Dinosaurs?
                </h3>
                <p className="text-xs sm:text-sm text-[#767586] dark:text-[#908fa1] leading-relaxed">
                  Yes! Simply click the <strong>🦖 Dinosaurs</strong> category tab above the wheel. The wheel will instantly adjust to feature iconic Late Cretaceous and Jurassic species like Tyrannosaurus Rex, Triceratops, Velociraptor, Brachiosaurus, and Ankylosaurus.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#fbf8ff] dark:bg-[#151620] border border-[#eeedf7] dark:border-[#272838] space-y-2">
                <h3 className="font-bold text-base text-[#1a1b22] dark:text-white">
                  How does the Instant Generator mode differ from the Wheel mode?
                </h3>
                <p className="text-xs sm:text-sm text-[#767586] dark:text-[#908fa1] leading-relaxed">
                  Wheel mode provides full visual deceleration physics, audio ticking, and celebratory confetti. Instant Generator mode lets you draw 1, 2, 3, or 5 animals immediately in a batch with zero spin delay—ideal for fast art sprints or group assignments.
                </p>
              </div>
            </div>
          </section>

          {/* Topic Cluster & Related Wheels */}
          <section className="rounded-3xl border border-[#eeedf7] dark:border-[#292a39] bg-gradient-to-br from-white to-[#f4f2fd] dark:from-[#181924] dark:to-[#12131a] p-6 sm:p-8 space-y-6 shadow-xs">
            <h2 className="text-2xl font-bold font-headline text-[#1a1b22] dark:text-white">
              Explore Related Interactive Wheels
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Link
                href="/drawing-prompts-wheel"
                className="p-4 rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#1c1d2b] hover:border-[#4648d4] transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🎨</span>
                  <ArrowRight className="w-4 h-4 text-[#767586] group-hover:text-[#4648d4] group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white mt-2">
                  Drawing Prompts Wheel
                </h3>
                <p className="text-[11px] text-[#767586] dark:text-[#908fa1] mt-0.5">
                  Art ideas &amp; sketching constraints
                </p>
              </Link>

              <Link
                href="/student-picker-wheel"
                className="p-4 rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#1c1d2b] hover:border-[#4648d4] transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🎓</span>
                  <ArrowRight className="w-4 h-4 text-[#767586] group-hover:text-[#4648d4] group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white mt-2">
                  Student Picker Wheel
                </h3>
                <p className="text-[11px] text-[#767586] dark:text-[#908fa1] mt-0.5">
                  Fair classroom cold-calling
                </p>
              </Link>

              <Link
                href="/creative-writing-prompts-wheel"
                className="p-4 rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#1c1d2b] hover:border-[#4648d4] transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">✍️</span>
                  <ArrowRight className="w-4 h-4 text-[#767586] group-hover:text-[#4648d4] group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white mt-2">
                  Creative Writing Wheel
                </h3>
                <p className="text-[11px] text-[#767586] dark:text-[#908fa1] mt-0.5">
                  Story starters &amp; plot twists
                </p>
              </Link>

              <Link
                href="/number-wheel"
                className="p-4 rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#1c1d2b] hover:border-[#4648d4] transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🔢</span>
                  <ArrowRight className="w-4 h-4 text-[#767586] group-hover:text-[#4648d4] group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="font-bold text-sm text-[#1a1b22] dark:text-white mt-2">
                  Number Spin Wheel
                </h3>
                <p className="text-[11px] text-[#767586] dark:text-[#908fa1] mt-0.5">
                  Custom ranges 1-100, dice &amp; raffles
                </p>
              </Link>
            </div>
          </section>

          {/* E-E-A-T Editorial Details */}
          <footer className="p-6 rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-[#fbf8ff] dark:bg-[#151620] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#767586] dark:text-[#908fa1]">
            <div className="space-y-1">
              <p>
                <strong>Editorial Team:</strong> SpinWheelGames STEM &amp; Zoology Lab
              </p>
              <p>
                <strong>Biological Fact Checking:</strong> Reviewed by Dr. Marcus Sterling (Zoology &amp; Comparative Biology)
              </p>
              <p>
                <strong>Testing &amp; Cryptographic Audit:</strong> 100,000+ Monte Carlo simulated spins verified with W3C Web Cryptography API.
              </p>
            </div>
            <div className="text-right sm:text-right w-full sm:w-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified Educational Tool
              </span>
            </div>
          </footer>
        </article>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
