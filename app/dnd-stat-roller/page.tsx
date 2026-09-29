import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import DiceNavigation from '@/components/dice/DiceNavigation';
import DndStatRollerComponent from '@/components/dice/DndStatRollerComponent';
import {

  Shield,
  Calculator,
  TrendingUp,
  HelpCircle,
  CheckCircle2,
  BookOpen,
  Award,
  ArrowRight,
  Sparkles,
  Layers,
  Zap
} from 'lucide-react';

export const dynamic = 'force-static';


export const metadata: Metadata = {
  title: 'D&D Stat Roller | 5e Character Ability Score Generator (4d6 Drop Lowest, Point Buy, Standard Array)',
  description:
    'Free online D&D 5e stat roller for character creation. Roll all 6 ability scores using 4d6 drop lowest, 27 point buy calculator, standard array (15,14,13,12,10,8), or classic 3d6 with 3D dice physics.',
  keywords: [
    'dnd stat roller',
    'dnd 5e character stat generator',
    '4d6 drop lowest',
    'dnd ability score calculator',
    'point buy calculator dnd 5e',
    'standard array dnd 5e',
    'roll dnd stats',
    'dnd character builder stats',
    'ability score generator 5e'
  ],
  alternates: {
    canonical: 'https://spinwheelgames.org/dnd-stat-roller'
  },
  openGraph: {
    title: 'D&D Stat Roller – 5e Character Ability Score Generator',
    description:
      'Interactive 3D D&D 5e character ability score generator supporting 4d6 drop lowest, 27 point buy, standard array, and modifier tables.',
    url: 'https://spinwheelgames.org/dnd-stat-roller',
    type: 'website'
  }
};

const MODIFIER_TABLE = [
  { score: '1', mod: '-5' },
  { score: '2–3', mod: '-4' },
  { score: '4–5', mod: '-3' },
  { score: '6–7', mod: '-2' },
  { score: '8–9', mod: '-1' },
  { score: '10–11', mod: '+0' },
  { score: '12–13', mod: '+1' },
  { score: '14–15', mod: '+2' },
  { score: '16–17', mod: '+3' },
  { score: '18–19', mod: '+4' },
  { score: '20–21', mod: '+5' },
  { score: '22–23', mod: '+6' },
  { score: '24–25', mod: '+7' },
  { score: '26–27', mod: '+8' },
  { score: '28–29', mod: '+9' },
  { score: '30', mod: '+10' }
];

const POINT_BUY_TABLE = [
  { score: 8, cost: 0, totalCost: 0, modifier: '-1' },
  { score: 9, cost: 1, totalCost: 1, modifier: '-1' },
  { score: 10, cost: 1, totalCost: 2, modifier: '+0' },
  { score: 11, cost: 1, totalCost: 3, modifier: '+0' },
  { score: 12, cost: 1, totalCost: 4, modifier: '+1' },
  { score: 13, cost: 1, totalCost: 5, modifier: '+1' },
  { score: 14, cost: 2, totalCost: 7, modifier: '+2' },
  { score: 15, cost: 2, totalCost: 9, modifier: '+2' }
];

const DND_FAQS = [
  {
    question: 'How does 4d6 Drop Lowest work for D&D ability scores?',
    answer:
      'You roll four 6-sided dice (4d6), discard the single die showing the lowest value, and add the remaining three dice together. You repeat this 6 times to generate 6 numbers ranging between 3 and 18, with an expected average of 12.24 per attribute.'
  },
  {
    question: 'What is the Standard Array in D&D 5e?',
    answer:
      'The standard array is an official preset of six scores: 15, 14, 13, 12, 10, and 8. You assign each number to one of your six abilities. This provides a total of 72 points and ensures every character in the party begins with a balanced power level (+2, +2, +1, +1, +0, -1 modifiers before racial bonuses).'
  },
  {
    question: 'How does the 27 Point Buy system work?',
    answer:
      'Under the 27 Point Buy system, every ability score begins at 8. You have a pool of 27 points to purchase higher scores. Raising a score from 8 to 13 costs 1 point per increase; raising a score from 13 to 14 or 14 to 15 costs 2 points each. The maximum score you can buy before racial increases is 15.'
  },
  {
    question: 'How do you calculate an Ability Score Modifier in D&D 5e?',
    answer:
      'The formula is: Modifier = Math.floor((Ability Score - 10) / 2). For example, a score of 15 gives (15 - 10) / 2 = 2.5, which rounds down to +2. A score of 8 gives (8 - 10) / 2 = -1.'
  },
  {
    question: 'What is the highest starting ability score possible at Level 1?',
    answer:
      'If rolling with 4d6 Drop Lowest, the maximum rolled score is 18 (rolling 6-6-6-6). When combined with a standard racial ability score bonus (+2 from Mountain Dwarf, Half-Elf, or custom lineage), your starting ability score can reach 20 (+5 modifier).'
  },
  {
    question: 'What are the primary abilities for each D&D class?',
    answer:
      'Fighters and Barbarians prioritize Strength/Dexterity and Constitution; Rogues prioritize Dexterity; Wizards and Artificers prioritize Intelligence; Clerics, Druids, and Rangers prioritize Wisdom; Bards, Paladins, Sorcerers, and Warlocks prioritize Charisma; Monks prioritize Dexterity and Wisdom.'
  }
];

export default function DndStatRollerPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'D&D Stat Roller & Ability Score Generator',
        url: 'https://spinwheelgames.org/dnd-stat-roller',
        description:
          'Interactive 3D D&D 5e character ability score generator with 4d6 drop lowest, standard array, point buy calculator, and class priority guide.',
        applicationCategory: 'GameApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        }
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
            name: 'Dice Roller',
            item: 'https://spinwheelgames.org/dice-roller'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'D&D Stat Roller',
            item: 'https://spinwheelgames.org/dnd-stat-roller'
          }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: DND_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b0c10] text-slate-900 dark:text-[#e0e1eb] transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Dice Roller', href: '/dice-roller' },
            { label: 'D&D Stat Roller & Ability Score Generator' }
          ]}
        />

        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20 font-mono font-bold uppercase tracking-wider">
              D&amp;D 5e Character Creation Suite
            </span>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20 font-mono font-bold uppercase tracking-wider">
              4d6 Drop 1 • 27 Point Buy • Standard Array
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Roll D&amp;D Stats Online - 4d6 Drop Lowest &amp; Point Buy
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto">
            Generate full 6-ability score character stat blocks with 3D physics. Switch seamlessly between official rulesets: <strong>4d6 Drop Lowest</strong>, <strong>Standard Array (15, 14, 13, 12, 10, 8)</strong>, <strong>27-Point Buy</strong>, or <strong>Classic 3d6</strong>.
          </p>
        </div>

        {/* Primary Interactive Component */}
        <DndStatRollerComponent />

        {/* Master Long-Form Educational Content */}
        <article className="space-y-12 border-t border-slate-200 dark:border-[#1e2030] pt-10">
          
          {/* Section 1: The Six Core Ability Scores */}
          <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-[#222330] space-y-6 shadow-sm dark:shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  The Six Core Ability Scores in Dungeons &amp; Dragons
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Every hero in D&amp;D is defined by six core capabilities that govern skill checks, attack rolls, saving throws, and spellcasting.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1c1d2a] space-y-2">
                <h3 className="font-bold text-sm text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                  <span>Strength (STR)</span>
                </h3>
                <p>
                  Measures natural athletic power, lifting capacity, and melee force. Governs Athletics checks, melee weapon attacks/damage, jumping distances, and carry weight limits.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1c1d2a] space-y-2">
                <h3 className="font-bold text-sm text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                  <span>Dexterity (DEX)</span>
                </h3>
                <p>
                  Measures agility, reflexes, and balance. Governs Acrobatics, Sleight of Hand, Stealth, Armor Class (AC), Initiative bonus, and ranged/finesse weapon attacks.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1c1d2a] space-y-2">
                <h3 className="font-bold text-sm text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                  <span>Constitution (CON)</span>
                </h3>
                <p>
                  Measures stamina, health, and vitality. Dictates your Hit Points (HP) added on every level up and saving throws to maintain spell concentration under enemy fire.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1c1d2a] space-y-2">
                <h3 className="font-bold text-sm text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                  <span>Intelligence (INT)</span>
                </h3>
                <p>
                  Measures mental acuity, recall, and reasoning. Governs Arcana, History, Investigation, Nature, and Religion, as well as spellcasting for Wizards and Artificers.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1c1d2a] space-y-2">
                <h3 className="font-bold text-sm text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                  <span>Wisdom (WIS)</span>
                </h3>
                <p>
                  Measures awareness, intuition, and attunement to surroundings. Governs Perception, Insight, Survival, Medicine, and spellcasting for Clerics, Druids, and Rangers.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1c1d2a] space-y-2">
                <h3 className="font-bold text-sm text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                  <span>Charisma (CHA)</span>
                </h3>
                <p>
                  Measures force of personality, confidence, and leadership. Governs Persuasion, Deception, Intimidation, Performance, and spellcasting for Bards, Paladins, Sorcerers, and Warlocks.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Ability Score Modifier Table */}
          <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-[#222330] space-y-6 shadow-sm dark:shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  D&amp;D 5e Ability Score &amp; Modifier Conversion Table
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Every ability score has a derived modifier calculated via: <code className="font-mono bg-slate-100 dark:bg-[#1f2130] px-1.5 py-0.5 rounded text-indigo-600 dark:text-indigo-300">Modifier = Math.floor((Score - 10) / 2)</code>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 font-mono text-center text-xs">
              {MODIFIER_TABLE.map((m) => (
                <div
                  key={m.score}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1c1d2a] space-y-1"
                >
                  <span className="text-slate-500 dark:text-slate-400 text-[11px] block">Score {m.score}</span>
                  <span className={`text-base font-bold block ${
                    m.mod.startsWith('+') ? 'text-emerald-600 dark:text-emerald-400' : m.mod.startsWith('-') ? 'text-rose-600 dark:text-rose-400' : 'text-slate-700 dark:text-slate-300'
                  }`}>
                    {m.mod}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: 27 Point Buy Cost Matrix */}
          <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-[#222330] space-y-6 shadow-sm dark:shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Official 27-Point Buy Point Cost Matrix
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Every player starts with 8 in all six stats and 27 points to distribute.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-[#1e202c]">
              <table className="w-full text-xs font-mono text-left">
                <thead>
                  <tr className="bg-slate-100 dark:bg-[#151622] text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-[#1e202c]">
                    <th className="py-2.5 px-4 font-bold">Target Base Score</th>
                    <th className="py-2.5 px-4 font-bold">Modifier</th>
                    <th className="py-2.5 px-4 font-bold">Incremental Cost</th>
                    <th className="py-2.5 px-4 font-bold">Total Points Spent from 8</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#171824]">
                  {POINT_BUY_TABLE.map((p) => (
                    <tr key={p.score} className="hover:bg-slate-50 dark:hover:bg-[#141520]">
                      <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white">{p.score}</td>
                      <td className="py-2.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">{p.modifier}</td>
                      <td className="py-2.5 px-4 text-slate-600 dark:text-slate-400">{p.cost} pt</td>
                      <td className="py-2.5 px-4 font-bold text-indigo-600 dark:text-indigo-400">{p.totalCost} pts</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4: Class Optimization Matrix */}
          <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-[#222330] space-y-6 shadow-sm dark:shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  D&amp;D 5e Class Ability Score Priority Guide
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Optimal allocation guide for all 13 official Dungeons &amp; Dragons classes.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {[
                { name: 'Artificer', primary: 'Intelligence', secondary: 'Constitution, Dexterity', dump: 'Strength' },
                { name: 'Barbarian', primary: 'Strength, Constitution', secondary: 'Dexterity', dump: 'Intelligence, Charisma' },
                { name: 'Bard', primary: 'Charisma', secondary: 'Dexterity, Constitution', dump: 'Strength' },
                { name: 'Cleric', primary: 'Wisdom', secondary: 'Constitution, Strength', dump: 'Intelligence' },
                { name: 'Druid', primary: 'Wisdom', secondary: 'Constitution, Dexterity', dump: 'Strength, Intelligence' },
                { name: 'Fighter', primary: 'Strength or Dexterity', secondary: 'Constitution', dump: 'Intelligence, Charisma' },
                { name: 'Monk', primary: 'Dexterity, Wisdom', secondary: 'Constitution', dump: 'Intelligence, Strength' },
                { name: 'Paladin', primary: 'Strength, Charisma', secondary: 'Constitution', dump: 'Intelligence, Dexterity' },
                { name: 'Ranger', primary: 'Dexterity, Wisdom', secondary: 'Constitution', dump: 'Intelligence, Strength' },
                { name: 'Rogue', primary: 'Dexterity', secondary: 'Constitution, Intelligence / Charisma', dump: 'Strength' },
                { name: 'Sorcerer', primary: 'Charisma', secondary: 'Constitution, Dexterity', dump: 'Strength' },
                { name: 'Warlock', primary: 'Charisma', secondary: 'Constitution, Dexterity', dump: 'Strength' },
                { name: 'Wizard', primary: 'Intelligence', secondary: 'Constitution, Dexterity', dump: 'Strength' }
              ].map((c) => (
                <div key={c.name} className="p-4 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1b1d28] space-y-1.5">
                  <h3 className="font-bold text-sm text-indigo-600 dark:text-indigo-400">{c.name}</h3>
                  <p className="text-slate-700 dark:text-slate-300"><strong>Primary:</strong> {c.primary}</p>
                  <p className="text-slate-500 dark:text-slate-400"><strong>Secondary:</strong> {c.secondary}</p>
                  <p className="text-slate-400 dark:text-slate-500 text-[11px]"><strong>Dump:</strong> {c.dump}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: FAQs */}
          <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#12131a] border border-slate-200 dark:border-[#222330] space-y-6 shadow-sm dark:shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Frequently Asked Questions (D&amp;D Stat Roller)
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Quick answers for character building, modifier math, and stat generation mechanics.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {DND_FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-[#090a0f] border border-slate-200 dark:border-[#1b1d28] space-y-1.5"
                >
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-200">{faq.question}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </article>

        {/* Dice Cross Navigation */}
        <DiceNavigation currentPath="/dnd-stat-roller" />
      </main>

      <Footer />
    </div>
  );
}
