import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  HelpCircle,
  Users,
  GraduationCap,
  PartyPopper,
  MessageSquare,
  Briefcase,
  Smile,
  Plus,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  Globe,
  Sliders,
  Star,
  RefreshCw
} from 'lucide-react';
import QuestionWheelEngine from '@/components/questions/QuestionWheelEngine';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

export const dynamic = 'force-static';



export const metadata: Metadata = {
  "title": "Question Wheel & Icebreaker Spinner | SpinWheelGames",
  "description": "Spin the question wheel for Truth or Dare, deep icebreakers, trivia, and party conversation starters. Customize questions or draw random cards. 100% free!",
  "alternates": {
    "canonical": "https://spinwheelgames.org/question-wheel"
  },
  "openGraph": {
    "title": "Question Wheel & Icebreaker Spinner | SpinWheelGames",
    "description": "Spin the question wheel for Truth or Dare, deep icebreakers, trivia, and party conversation starters. Customize questions or draw random cards. 100% free!",
    "url": "https://spinwheelgames.org/question-wheel",
    "siteName": "SpinWheelGames",
    "locale": "en_US",
    "type": "website",
    "images": [
      {
        "url": "https://spinwheelgames.org/api/og?path=%2Fquestion-wheel&title=Question+Wheel+%26+Icebreaker+Spinner+%7C+SpinWheelGames&desc=Spin+the+question+wheel+for+Truth+or+Dare%2C+deep+icebreakers%2C+trivia%2C+and+party+conversation+starters.+Customize+questions+or+draw+random+cards.+100%25+free%21",
        "width": 1200,
        "height": 630,
        "alt": "Question Wheel & Icebreaker Spinner | SpinWheelGames"
      }
    ]
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Question Wheel & Icebreaker Spinner | SpinWheelGames",
    "description": "Spin the question wheel for Truth or Dare, deep icebreakers, trivia, and party conversation starters. Customize questions or draw random cards. 100% free!",
    "images": [
      "https://spinwheelgames.org/api/og?path=%2Fquestion-wheel&title=Question+Wheel+%26+Icebreaker+Spinner+%7C+SpinWheelGames&desc=Spin+the+question+wheel+for+Truth+or+Dare%2C+deep+icebreakers%2C+trivia%2C+and+party+conversation+starters.+Customize+questions+or+draw+random+cards.+100%25+free%21"
    ]
  }
};

const JSON_LD_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://spinwheelgames.org/question-wheel#webapp',
      url: 'https://spinwheelgames.org/question-wheel',
      name: 'Question Wheel - Truth or Dare & Icebreaker Spinner',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript and modern HTML5 canvas support',
      description:
        'Interactive random question wheel featuring 7 modes (Trivia, Icebreakers, Classroom, Party, Conversation, Interview, Kids, Custom), difficulty filters, no-repeat elimination deck, and favorite bookmarks.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '1390',
        bestRating: '5',
        worstRating: '1'
      },
      featureList: [
        '7 Curated Game Modes: Truth or Dare, Icebreakers, Trivia, Party, Deep Conversation, Classroom',
        'No-repeat question draw elimination mode',
        'Custom questions paste and probability weights',
        'Interactive question card display with copy and share features',
        'Projector and fullscreen party presentation mode'
      ],
      screenshot: 'https://spinwheelgames.org/spinwheel-logo.webp'
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://spinwheelgames.org/question-wheel#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does No-Repeat Mode work on the question wheel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'When No-Repeat Mode is enabled, each question drawn by the wheel is eliminated from the active deck so no duplicate questions appear until you click Reset Deck.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I add my own custom questions to the wheel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Select Custom mode to add individual questions or click Bulk Paste Questions to import an entire list of questions at once.'
          }
        }
      ]
    }
  ]
};

export default function QuestionWheelPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col w-full max-w-full overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_DATA) }}
      />

      <SubpageHeader />

      <main className="flex-1 max-w-7xl w-full max-w-full overflow-x-clip mx-auto px-3.5 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-22 pb-12">
        <div className="mb-4 py-1.5 px-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-fit">
          <Breadcrumbs
            items={[
              { label: 'Classroom & Games', href: '/sitemap' },
              { label: 'Spin the Wheel Questions', href: '/question-wheel' }
            ]}
          />
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto my-4 sm:my-6 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            Random Question Generator
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            Spin the Wheel Questions
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
            Spin a random question wheel for trivia, classroom activities, icebreakers, parties, conversations and games. Filter by difficulty, mode, and topic or add your own custom questions.
          </p>
        </div>

        {/* Interactive Engine */}
        <section className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 mb-12">
          <QuestionWheelEngine />
        </section>

        {/* Features Grid */}
        <section className="my-16 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black">7 Versatile Modes for Every Gathering</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Tailored question decks for virtual meetings, school classrooms, casual conversations, and competitive trivia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
              <div className="p-3 w-fit rounded-xl bg-pink-100 dark:bg-pink-950 text-pink-600 dark:text-pink-400">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg">Icebreakers</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Non-awkward conversation starters for team standups, new hire onboarding, and social mixers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
              <div className="p-3 w-fit rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg">Trivia</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                General knowledge, science, astronomy, and pop culture questions with instant answer reveals.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
              <div className="p-3 w-fit rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg">Classroom</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Review check-ins, critical thinking prompts, and student recap exercises for teachers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
              <div className="p-3 w-fit rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                <PartyPopper className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg">Party Games</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Fun hypotheticals, group debates, and hilarious questions for game night and parties.
              </p>
            </div>
          </div>
        </section>

        {/* Feature Highlights Section */}
        <section className="my-16 bg-gradient-to-br from-blue-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl">
          <div className="max-w-3xl mx-auto space-y-6 text-center">
            <h2 className="text-2xl sm:text-4xl font-black">Built for Fair, Dynamic Question Drawing</h2>
            <p className="text-sm sm:text-base text-blue-200 leading-relaxed">
              Never get stuck on what to ask next. Turn on <strong>No-Repeat Mode</strong> to draw questions without duplicates, bookmark your top questions as <strong>Favorites</strong>, or paste entire study decks with <strong>Bulk Import</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left pt-4">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm space-y-1">
                <div className="flex items-center gap-2 font-bold text-sm text-blue-300">
                  <RefreshCw className="w-4 h-4" />
                  <span>No-Repeat Deck</span>
                </div>
                <p className="text-xs text-blue-100">Eliminates asked questions so every drawn prompt is unique.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm space-y-1">
                <div className="flex items-center gap-2 font-bold text-sm text-amber-300">
                  <Star className="w-4 h-4" />
                  <span>Favorites Deck</span>
                </div>
                <p className="text-xs text-blue-100">Star your favorite questions and access them across sessions.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm space-y-1">
                <div className="flex items-center gap-2 font-bold text-sm text-emerald-300">
                  <Sliders className="w-4 h-4" />
                  <span>Difficulty Filter</span>
                </div>
                <p className="text-xs text-blue-100">Select Easy, Medium, or Hard questions to match your group.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="my-16 max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-center">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                How does No-Repeat Mode work on the question wheel?
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                When No-Repeat Mode is enabled, each question drawn by the wheel is eliminated from the active deck so no duplicate questions appear until you click Reset Deck.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                Can I add my own custom questions to the wheel?
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Yes! Select Custom mode to add individual questions or click Bulk Paste Questions to import an entire list of questions at once.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                Are my saved favorite questions saved automatically?
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Yes, favorited questions are saved to your browser local storage so you can access your saved list anytime.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
