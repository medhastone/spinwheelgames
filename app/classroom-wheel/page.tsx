import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Users,
  Compass,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  BookOpen,
  Briefcase,
  Shuffle,
  Volume2,
  Mic,
  Award,
  Zap,
  Check,
  UserCheck
} from 'lucide-react';
import ClassroomWheelEngine from '@/components/classroom/ClassroomWheelEngine';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Classroom Spin Wheel – Random Student Picker',
  description:
    'Use a free classroom spin wheel to randomly pick students, teams, activities, questions and classroom jobs. Fast, fair and easy to customize.',
  keywords: [
    'classroom spin wheel',
    'classroom wheel',
    'random student picker',
    'student picker',
    'random student wheel',
    'classroom spinner',
    'classroom randomizer'
  ],
  alternates: {
    canonical: 'https://spinwheelgames.org/classroom-wheel'
  },
  openGraph: {
    title: 'Classroom Spin Wheel – Random Student Picker',
    description:
      'Use a free classroom spin wheel to randomly pick students, teams, activities, questions and classroom jobs. Fast, fair and easy to customize.',
    url: 'https://spinwheelgames.org/classroom-wheel',
    siteName: 'SpinWheelGames',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Classroom Spin Wheel – Random Student Picker',
    description:
      'Use a free classroom spin wheel to randomly pick students, teams, activities, questions and classroom jobs. Fast, fair and easy to customize.'
  }
};

const JSON_LD_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://spinwheelgames.org/classroom-wheel#webapp',
      name: 'Classroom Spin Wheel',
      url: 'https://spinwheelgames.org/classroom-wheel',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'All',
      description:
        'Free online classroom spin wheel and random student picker. Select students, group teams, assign jobs, and pick quiz questions with 100% fair random selection.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      featureList: [
        'Random student picker with text-to-speech voice callouts',
        'No-repeat elimination mode so everyone participates',
        'Reading order passage selector and quiz topic spinner',
        'Classroom job assignment and brain break activity randomizer',
        'Instant group maker and random team generator'
      ]
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://spinwheelgames.org/classroom-wheel#breadcrumb',
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
          name: 'Classroom',
          item: 'https://spinwheelgames.org/classroom'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Classroom Spin Wheel',
          item: 'https://spinwheelgames.org/classroom-wheel'
        }
      ]
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://spinwheelgames.org/classroom-wheel#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does the Classroom Spin Wheel guarantee fair student selection?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our classroom wheel uses the browser Web Cryptography API (crypto.getRandomValues) to generate cryptographically uniform random numbers. This ensures 100% mathematical fairness with zero teacher favoritism or algorithmic bias.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I remove students who have already been selected?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Toggle No-Repeat (Elimination) mode. When turned on, a student name is automatically hidden after winning so every child is called on exactly once before the roster resets.'
          }
        },
        {
          '@type': 'Question',
          name: 'How do I generate random teams for my class?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Click the Team Maker tab in the Classroom Wheel. Choose your desired number of teams (2 to 8), and click Reshuffle Teams to instantly split your roster into balanced, randomized groups.'
          }
        },
        {
          '@type': 'Question',
          name: 'Is student roster data stored securely on the server?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Student rosters are stored 100% locally in your browser session. No student names or attendance lists are ever uploaded to an external server, protecting student privacy (FERPA compliant).'
          }
        }
      ]
    }
  ]
};

export default function ClassroomWheelPage() {
  return (
    <div className="min-h-screen bg-[#faf8ff] dark:bg-[#0b0c10] text-[#1a1b22] dark:text-[#f1effa]">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_DATA) }}
      />

      <SubpageHeader />

      <main className="px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-12 max-w-7xl mx-auto space-y-12 w-full flex-1">
        {/* Breadcrumb Header */}
        <Breadcrumbs
          items={[
            { label: 'Classroom', href: '/classroom' },
            { label: 'Classroom Spin Wheel' }
          ]}
        />

        {/* Hero Banner Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            <span>Interactive Educator Tool</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Classroom Spin Wheel
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Use a free classroom spin wheel to randomly pick students, teams, activities, questions and classroom jobs. Fast, fair and easy to customize on your smartboard or Zoom screen.
          </p>
        </div>

        {/* Interactive Classroom Wheel Tool Engine */}
        <section id="tool-interactive">
          <ClassroomWheelEngine />
        </section>

        {/* Tool Features Overview Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          <div className="bg-white dark:bg-[#12131a] p-6 rounded-2xl border border-[#eeedf7] dark:border-[#292a39] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Random Student Picker</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Cold-call students impartially with voice narration so quiet introverts get an equal voice.
            </p>
          </div>

          <div className="bg-white dark:bg-[#12131a] p-6 rounded-2xl border border-[#eeedf7] dark:border-[#292a39] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center font-bold">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">No-Repeat Elimination</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Automatically hides selected students so every single child gets called on before resetting.
            </p>
          </div>

          <div className="bg-white dark:bg-[#12131a] p-6 rounded-2xl border border-[#eeedf7] dark:border-[#292a39] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Reading & Quiz Topics</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Spin to pick oral reading passages, table turns, or review quiz questions on the fly.
            </p>
          </div>

          <div className="bg-white dark:bg-[#12131a] p-6 rounded-2xl border border-[#eeedf7] dark:border-[#292a39] shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-400 flex items-center justify-center font-bold">
              <Shuffle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Team Generator & Group Maker</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Splits your attendance roster into 2-8 random, balanced student teams with one click.
            </p>
          </div>
        </section>

        {/* Deep Pedagogical Problem Solution Guide */}
        <section className="bg-white dark:bg-[#12131a] rounded-3xl p-6 sm:p-8 md:p-10 border border-[#eeedf7] dark:border-[#292a39] shadow-sm space-y-8">
          <div className="space-y-4 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Solving the Teacher’s Dilemma: Fast, Fair & Stress-Free Selection
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Teachers face a constant challenge during daily lessons: selecting students, assigning group partners, allocating classroom jobs, and choosing review questions without causing cold-call anxiety or taking up valuable teaching time. Traditional methods like drawing popsicle sticks or calling raised hands often result in subconscious favoritism or student disengagement.
            </p>
          </div>

          {/* Key Classroom Capabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>100% Unbiased Cold-Calling</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Hardware-seeded random selection eliminates perceived teacher bias, assuring students that every draw is strictly impartial.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Text-to-Speech Smartboard Integration</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Audio voice announcements let you walk around the room while the wheel reads the winning student name out loud.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Classroom Job & Duty Spinner</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Assign Line Leader, Tech Monitor, Whiteboard Eraser, and Paper Passer with zero argument on Monday morning.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Private & FERPA Compliant</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Roster information remains entirely in local browser storage—no names or student data are ever sent over a server.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white dark:bg-[#12131a] rounded-3xl p-6 sm:p-8 md:p-10 border border-[#eeedf7] dark:border-[#292a39] shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Classroom Spin Wheel FAQs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                How does the Classroom Spin Wheel guarantee fair student selection?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Our classroom wheel uses the browser Web Cryptography API (crypto.getRandomValues) to generate cryptographically uniform random numbers. This ensures 100% mathematical fairness with zero teacher favoritism or algorithmic bias.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Can I remove students who have already been selected?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Yes! Toggle No-Repeat (Elimination) mode. When turned on, a student name is automatically hidden after winning so every child is called on exactly once before the roster resets.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                How do I generate random teams for my class?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Click the Team Maker tab in the Classroom Wheel. Choose your desired number of teams (2 to 8), and click Reshuffle Teams to instantly split your roster into balanced, randomized groups.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Is student roster data stored securely on the server?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Student rosters are stored 100% locally in your browser session. No student names or attendance lists are ever uploaded to an external server, protecting student privacy (FERPA compliant).
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
