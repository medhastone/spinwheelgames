import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Users,
  Shuffle,
  Volume2,
  Mic,
  Award,
  Zap,
  Briefcase,
  BookOpen,
  ClipboardList,
  Trophy,
  History,
  FileText,
  UserCheck,
  UserX,
  Layers,
  Shield,
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import ClassroomWheelEngine from '@/components/classroom/ClassroomWheelEngine';
import ClassroomPresetButton from '@/components/classroom/ClassroomPresetButton';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  "title": "Classroom Wheel & Student Picker | SpinWheelGames",
  "description": "Spin the free classroom wheel and class spinner. Includes dedicated modes for random student picker, classroom jobs, group maker, presentation order, activity wheel, and review games with no-repeat elimination.",
  "alternates": {
    "canonical": "https://spinwheelgames.org/classroom-wheel"
  },
  "openGraph": {
    "title": "Classroom Wheel & Student Picker | SpinWheelGames",
    "description": "Spin the free classroom wheel and class spinner. Includes dedicated modes for random student picker, classroom jobs, group maker, presentation order, activity wheel, and review games with no-repeat elimination.",
    "url": "https://spinwheelgames.org/classroom-wheel",
    "siteName": "SpinWheelGames",
    "locale": "en_US",
    "type": "website",
    "images": [
      {
        "url": "https://spinwheelgames.org/api/og?path=%2Fclassroom-wheel&title=Classroom+Wheel+%26+Student+Picker+%7C+SpinWheelGames&desc=Spin+the+free+classroom+wheel+and+class+spinner.+Includes+dedicated+modes+for+random+student+picker%2C+classroom+jobs%2C+group+maker%2C+presentation+order%2C+activity+wheel%2C+and+review+gam",
        "width": 1200,
        "height": 630,
        "alt": "Classroom Wheel & Student Picker | SpinWheelGames"
      }
    ]
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Classroom Wheel & Student Picker | SpinWheelGames",
    "description": "Spin the free classroom wheel and class spinner. Includes dedicated modes for random student picker, classroom jobs, group maker, presentation order, activity wheel, and review games with no-repeat elimination.",
    "images": [
      "https://spinwheelgames.org/api/og?path=%2Fclassroom-wheel&title=Classroom+Wheel+%26+Student+Picker+%7C+SpinWheelGames&desc=Spin+the+free+classroom+wheel+and+class+spinner.+Includes+dedicated+modes+for+random+student+picker%2C+classroom+jobs%2C+group+maker%2C+presentation+order%2C+activity+wheel%2C+and+review+gam"
    ]
  }
};

const JSON_LD_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://spinwheelgames.org/classroom-wheel#webapp',
      name: 'Classroom Wheel & Class Spinner',
      url: 'https://spinwheelgames.org/classroom-wheel',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript and modern HTML5 canvas support',
      description:
        'Interactive classroom wheel and class spinner designed for educators. Features 7 dedicated modes: Random Student Picker, Classroom Jobs, Group Maker by size or count, Presentation Order, Activity Brain Breaks, Question Picker, and Review Game with live team scoreboard.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.92',
        reviewCount: '1940',
        bestRating: '5',
        worstRating: '1'
      },
      featureList: [
        'Random student picker with text-to-speech voice callouts',
        'No-repeat elimination mode to guarantee every student participates',
        'Cooperative group maker with team size and team count controls',
        'Classroom jobs and weekly chore duty spinner',
        'Presentation order queue generator with completion checkmarks',
        'Classroom activity and brain break wheel',
        'Curriculum review game show wheel with team score tracker',
        'Quick roster paste supporting spreadsheets and numbered lists',
        'Live participation history log with clear and copy functions'
      ],
      screenshot: 'https://spinwheelgames.org/spinwheel-logo.webp'
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
          name: 'Classroom Tools',
          item: 'https://spinwheelgames.org/classroom-wheel'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Classroom Wheel',
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
          name: 'How does the Classroom Wheel ensure 100% fair student selection?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The classroom wheel uses the browser Web Crypto API (crypto.getRandomValues()) cryptographic pseudorandom number generator (CSPRNG). Every student slice has an exact, mathematically equal probability of selection, eliminating perceived teacher bias or unintentional patterns.'
          }
        },
        {
          '@type': 'Question',
          name: 'How does the No-Repeat Elimination feature work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'When No-Repeat mode is turned on, any student or item selected by the wheel is automatically hidden from subsequent spins. This ensures every student is called on exactly once during a class period before the teacher clicks Restore Drawn Items.'
          }
        },
        {
          '@type': 'Question',
          name: 'How do I group students by group size instead of number of teams?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Switch to the Group Maker tab and toggle By Group Size. Select whether you want pairs of 2, triads of 3, squads of 4, or clusters of 5. The generator automatically calculates the optimal number of balanced teams and distributes students evenly using unbiased random shuffling.'
          }
        },
        {
          '@type': 'Question',
          name: 'How does Quick Roster Paste work with spreadsheets or attendance lists?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Click Quick Roster Paste on the tool. You can copy and paste an entire column of student names directly from Google Sheets, Excel, or a text document. The parser automatically removes leading numbers, bullets, commas, and excessive whitespace, and deduplicates identical names instantly.'
          }
        },
        {
          '@type': 'Question',
          name: 'How do Presentation Order and Review Game modes work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Presentation Order allows you to spin for individual speakers or click Shuffle Queue to generate a complete 1st-to-last lineup with interactive checkmarks. Review Game turns worksheets into game shows by spinning for point values (100 to 500 points, multipliers, and wildcards) accompanied by an interactive live team scoreboard.'
          }
        },
        {
          '@type': 'Question',
          name: 'Is student roster data stored on a server or tracked?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. The classroom wheel runs 100% client-side in your local web browser session. All student names, rosters, team allocations, and winner histories remain strictly in your local device memory and are never transmitted to external cloud servers, databases, or analytics services.'
          }
        }
      ]
    }
  ]
};

const CLASSROOM_FAQS = [
  {
    question: 'How does the Classroom Wheel ensure 100% fair student selection?',
    answer:
      'The classroom wheel uses the browser Web Crypto API (crypto.getRandomValues()) cryptographic pseudorandom number generator (CSPRNG). Every student slice has an exact, mathematically equal probability of selection, eliminating perceived teacher bias or unintentional patterns.'
  },
  {
    question: 'How does the No-Repeat Elimination feature work?',
    answer:
      'When No-Repeat mode is turned on, any student or item selected by the wheel is automatically hidden from subsequent spins. This ensures every student is called on exactly once during a class period before the teacher clicks Restore Drawn Items.'
  },
  {
    question: 'How do I group students by group size instead of number of teams?',
    answer:
      'Switch to the Group Maker tab and toggle By Group Size. Select whether you want pairs of 2, triads of 3, squads of 4, or clusters of 5. The generator automatically calculates the optimal number of balanced teams and distributes students evenly using unbiased random shuffling.'
  },
  {
    question: 'How does Quick Roster Paste work with spreadsheets or attendance lists?',
    answer:
      'Click Quick Roster Paste on the tool. You can copy and paste an entire column of student names directly from Google Sheets, Excel, or a text document. The parser automatically removes leading numbers, bullets, commas, and excessive whitespace, and deduplicates identical names instantly.'
  },
  {
    question: 'How do Presentation Order and Review Game modes work?',
    answer:
      'Presentation Order allows you to spin for individual speakers or click Shuffle Queue to generate a complete 1st-to-last lineup with interactive checkmarks. Review Game turns worksheets into game shows by spinning for point values (100 to 500 points, multipliers, and wildcards) accompanied by an interactive live team scoreboard.'
  },
  {
    question: 'Is student roster data stored on an external server or tracked?',
    answer:
      'No. The classroom wheel runs 100% client-side in your local web browser session. All student names, rosters, team allocations, and winner histories remain strictly in your local device memory and are never transmitted to external cloud servers, databases, or analytics services.'
  }
];

export default function ClassroomWheelPage() {
  return (
    <div className="min-h-screen bg-[#faf8ff] dark:bg-[#0b0c10] text-[#1a1b22] dark:text-[#f1effa] w-full max-w-full overflow-x-clip flex flex-col justify-between">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_DATA) }}
      />

      <SubpageHeader />

      <main className="flex-1 w-full max-w-full overflow-x-clip space-y-6 sm:space-y-10 pb-12">
        {/* Top Header & Interactive Wheel Section */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 lg:pt-22 space-y-4">
          <Breadcrumbs
            items={[
              { label: 'Classroom Tools', href: '/classroom-wheel' },
              { label: 'Classroom Wheel' }
            ]}
          />

          {/* Hero Banner Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2 pt-1 pb-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 text-[11px] font-bold uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Teacher-Designed Class Spinner</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Classroom Wheel &amp; Class Spinner
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto">
              The free interactive classroom wheel for fair student picking, group making, chore assignments, presentation order, activity breaks, and review game shows.
            </p>

            {/* Quick Preset Mode Launcher Bar */}
            <div className="flex items-center justify-center gap-1.5 flex-wrap pt-1">
              <ClassroomPresetButton mode="student" label="Student Picker" emoji="🧑‍🎓" />
              <ClassroomPresetButton mode="job" label="Jobs" emoji="📋" />
              <ClassroomPresetButton mode="teams" label="Group Maker" emoji="👥" />
              <ClassroomPresetButton mode="presentation" label="Presentation" emoji="🎙️" />
              <ClassroomPresetButton mode="activity" label="Activity" emoji="⚡" />
              <ClassroomPresetButton mode="quiz" label="Questions" emoji="❓" />
              <ClassroomPresetButton mode="review" label="Review Game" emoji="🏆" />
            </div>
          </div>

          {/* Interactive Classroom Wheel Tool Engine */}
          <div id="tool-interactive">
            <ClassroomWheelEngine />
          </div>
        </section>

        {/* 1. Dedicated Modes Showcase (Home-Style Flat Cards) */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-[#4648d4] dark:text-[#8587ff] uppercase tracking-wider">
                Classroom Modes
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a1b22] dark:text-white tracking-tight mt-0.5">
                7 Purpose-Built Modes for Every Lesson
              </h2>
            </div>
            <p className="text-xs text-[#767586] dark:text-[#908fa1] max-w-md">
              Switch routines instantly without re-typing or losing your attendance roster.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* 1. Random Student */}
            <div className="group rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-4 hover:border-[#4648d4]/50 dark:hover:border-[#8587ff]/50 hover:shadow-md transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff]">
                    Cold-Calling
                  </span>
                </div>
                <h3 className="font-headline font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors">
                  Random Student Picker
                </h3>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                  Call on students impartially during Socratic discussions and reading turns with hands-free text-to-speech callouts.
                </p>
              </div>
              <div className="pt-2 border-t border-[#f4f2fd] dark:border-[#222330]">
                <ClassroomPresetButton mode="student" label="Launch Student Picker" />
              </div>
            </div>

            {/* 2. Classroom Jobs */}
            <div className="group rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-4 hover:border-[#4648d4]/50 dark:hover:border-[#8587ff]/50 hover:shadow-md transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff]">
                    Chore Duty
                  </span>
                </div>
                <h3 className="font-headline font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors">
                  Classroom Jobs &amp; Duties
                </h3>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                  Allocate Line Leader, Tech Monitor, Board Eraser, Paper Passer, and Door Holder with zero Monday arguments.
                </p>
              </div>
              <div className="pt-2 border-t border-[#f4f2fd] dark:border-[#222330]">
                <ClassroomPresetButton mode="job" label="Launch Job Spinner" />
              </div>
            </div>

            {/* 3. Group Maker */}
            <div className="group rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-4 hover:border-[#4648d4]/50 dark:hover:border-[#8587ff]/50 hover:shadow-md transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                    <Shuffle className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff]">
                    Teams &amp; Size
                  </span>
                </div>
                <h3 className="font-headline font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors">
                  Group Maker (Size &amp; Count)
                </h3>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                  Split your class into cooperative learning teams either by total teams or by group size (pairs, triads, squads).
                </p>
              </div>
              <div className="pt-2 border-t border-[#f4f2fd] dark:border-[#222330]">
                <ClassroomPresetButton mode="teams" label="Launch Group Maker" />
              </div>
            </div>

            {/* 4. Presentation Order */}
            <div className="group rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-4 hover:border-[#4648d4]/50 dark:hover:border-[#8587ff]/50 hover:shadow-md transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    <ClipboardList className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff]">
                    Queue Order
                  </span>
                </div>
                <h3 className="font-headline font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors">
                  Presentation Order Queue
                </h3>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                  Spin for the next speaker or shuffle a 1st-to-last presentation lineup with completion checkmarks.
                </p>
              </div>
              <div className="pt-2 border-t border-[#f4f2fd] dark:border-[#222330]">
                <ClassroomPresetButton mode="presentation" label="Launch Presentation Order" />
              </div>
            </div>

            {/* 5. Activity Wheel */}
            <div className="group rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-4 hover:border-[#4648d4]/50 dark:hover:border-[#8587ff]/50 hover:shadow-md transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff]">
                    Brain Breaks
                  </span>
                </div>
                <h3 className="font-headline font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors">
                  Activity Wheel &amp; Breaks
                </h3>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                  Reset energy with quick kinesthetic exercises like Four Corners, 7-Min Yoga, Silent Speed Ball, or Freeze Dance.
                </p>
              </div>
              <div className="pt-2 border-t border-[#f4f2fd] dark:border-[#222330]">
                <ClassroomPresetButton mode="activity" label="Launch Activity Wheel" />
              </div>
            </div>

            {/* 6. Question Picker */}
            <div className="group rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-4 hover:border-[#4648d4]/50 dark:hover:border-[#8587ff]/50 hover:shadow-md transition-all flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff]">
                    Check-in
                  </span>
                </div>
                <h3 className="font-headline font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors">
                  Question Picker &amp; Prompts
                </h3>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                  Randomize checks for understanding across Math, Science, Reading, and Social Studies, or paste test prompts.
                </p>
              </div>
              <div className="pt-2 border-t border-[#f4f2fd] dark:border-[#222330]">
                <ClassroomPresetButton mode="quiz" label="Launch Question Picker" />
              </div>
            </div>

            {/* 7. Review Game Show */}
            <div className="group rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-4 hover:border-[#4648d4]/50 dark:hover:border-[#8587ff]/50 hover:shadow-md transition-all flex flex-col justify-between space-y-3 sm:col-span-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f4f2fd] dark:bg-[#222330] text-[#4648d4] dark:text-[#8587ff]">
                    Game Show
                  </span>
                </div>
                <h3 className="font-headline font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white group-hover:text-[#4648d4] dark:group-hover:text-[#8587ff] transition-colors">
                  Review Game Show &amp; Live Scoreboard
                </h3>
                <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                  Turn revision worksheets into games. Spin for point stakes (100–500 points, Double Points multipliers, and Steals) with a live 4-team scoreboard right beside the wheel.
                </p>
              </div>
              <div className="pt-2 border-t border-[#f4f2fd] dark:border-[#222330]">
                <ClassroomPresetButton mode="review" label="Launch Review Game" />
              </div>
            </div>
          </div>
        </section>

        {/* 2. Teacher-Friendly Features (Home-Style Flat Cards) */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-[#4648d4] dark:text-[#8587ff] uppercase tracking-wider">
                Teacher Tools
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a1b22] dark:text-white tracking-tight mt-0.5">
                Built for Real Classrooms &amp; Busy School Days
              </h2>
            </div>
            <p className="text-xs text-[#767586] dark:text-[#908fa1] max-w-md">
              Frictionless workflow features that save instructional minutes and keep class calm.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-4 hover:shadow-md transition-all space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <UserCheck className="w-4 h-4" />
                </div>
                <h3 className="font-headline font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white">
                  No-Repeat &amp; Elimination
                </h3>
              </div>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Automatically hides drawn students so everyone participates before repeating. In-line eye toggles let you eliminate or restore absent students without altering master rosters.
              </p>
            </div>

            <div className="rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-4 hover:shadow-md transition-all space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="font-headline font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white">
                  Quick Roster Paste (2s)
                </h3>
              </div>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Paste names directly from Google Sheets or Excel. The parser automatically removes leading numbers, bullets, commas, and excessive whitespace, and deduplicates names instantly.
              </p>
            </div>

            <div className="rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-4 hover:shadow-md transition-all space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  <History className="w-4 h-4" />
                </div>
                <h3 className="font-headline font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white">
                  Clear Winner History
                </h3>
              </div>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Every winner is recorded chronologically with timestamps and spin round numbers. Copy the participation log for grading or clear it with one click for the next class period.
              </p>
            </div>

            <div className="rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-4 hover:shadow-md transition-all space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="font-headline font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white">
                  Group Size &amp; Team Count
                </h3>
              </div>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Switch between &ldquo;Number of Teams&rdquo; and &ldquo;Group Size&rdquo;. Handles odd roster numbers cleanly, balances remainders, and formats rosters for quick clipboard copying.
              </p>
            </div>

            <div className="rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-4 hover:shadow-md transition-all space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400">
                  <Mic className="w-4 h-4" />
                </div>
                <h3 className="font-headline font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white">
                  Smartboard Voice Calling
                </h3>
              </div>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Smartboard fullscreen mode expands across your interactive whiteboard. Turn on Text-to-Speech narration so the wheel announces the selected student out loud hands-free.
              </p>
            </div>

            <div className="rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-4 hover:shadow-md transition-all space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Shield className="w-4 h-4" />
                </div>
                <h3 className="font-headline font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white">
                  Local Browser Privacy
                </h3>
              </div>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                All student rosters, names, and team allocations run purely in local browser memory. No student identities or data are ever transmitted to external servers or cloud databases.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Pedagogical Strategies Guide (Home-Style Flat Cards) */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-[#4648d4] dark:text-[#8587ff] uppercase tracking-wider">
                Instructional Strategies
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#1a1b22] dark:text-white tracking-tight mt-0.5">
                4 Pedagogical Strategies for Fair Participation
              </h2>
            </div>
            <p className="text-xs text-[#767586] dark:text-[#908fa1] max-w-md">
              Instructional techniques to maximize classroom equity while eliminating call-out anxiety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div className="rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-4 hover:shadow-md transition-all space-y-2">
              <h3 className="font-headline font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold flex items-center justify-center shrink-0">
                  1
                </span>
                <span>The 5-Second &ldquo;Think Time&rdquo; Buffer</span>
              </h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Always state the prompt or question to the room <em>before</em> spinning. If you spin first, only the chosen student pays attention. Stating the prompt first ensures all 25 students formulate an answer in their minds while the wheel spins.
              </p>
            </div>

            <div className="rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-4 hover:shadow-md transition-all space-y-2">
              <h3 className="font-headline font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-center shrink-0">
                  2
                </span>
                <span>Lowering Anxiety with &ldquo;Phone-a-Friend&rdquo;</span>
              </h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Quiet introverts or English Language Learners may freeze during cold-calling. Permit any student called by the wheel to take 10 seconds to &ldquo;consult an elbow partner&rdquo; before answering, eliminating freeze while holding students accountable.
              </p>
            </div>

            <div className="rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-4 hover:shadow-md transition-all space-y-2">
              <h3 className="font-headline font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-bold flex items-center justify-center shrink-0">
                  3
                </span>
                <span>Cooperative Learning with Shuffled Triads</span>
              </h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Allowing students to choose their own project partners often results in cliques and excluded peers. Using the Group Maker with &ldquo;Group Size = 3&rdquo; creates fresh randomized pairings that teach social collaboration. Reshuffle every two weeks.
              </p>
            </div>

            <div className="rounded-2xl border border-[#eeedf7] dark:border-[#292a39] bg-white dark:bg-[#181922] p-4 hover:shadow-md transition-all space-y-2">
              <h3 className="font-headline font-bold text-sm sm:text-base text-[#1a1b22] dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-xs font-bold flex items-center justify-center shrink-0">
                  4
                </span>
                <span>High-Stakes Gamification with Review Wheels</span>
              </h3>
              <p className="text-xs text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
                Replace passive test study guides with an active game show. Divide the class into 4 teams and spin the Review Game wheel. When a team answers correctly, they earn the points spun (100 to 500), multipliers, or wildcard steals.
              </p>
            </div>
          </div>
        </section>

        {/* 4. FAQ Section (Home-Style Interactive Details/Accordions) */}
        <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 space-y-4" id="faqs">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#4648d4]/10 text-[#4648d4] dark:text-[#8587ff] border border-[#4648d4]/20 uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" />
              Frequently Asked Questions
            </div>
            <h2 className="font-headline text-2xl sm:text-3xl font-black text-[#1a1b22] dark:text-white tracking-tight">
              Classroom Wheel &amp; Class Spinner FAQs
            </h2>
          </div>

          <div className="flex flex-col gap-2.5">
            {CLASSROOM_FAQS.map((faq, index) => (
              <details
                key={index}
                className="group rounded-2xl bg-white dark:bg-[#181922] p-4 sm:p-5 shadow-xs border border-[#eeedf7] dark:border-[#292a39] hover:border-[#4648d4]/40 transition-all cursor-pointer"
              >
                <summary className="flex items-center justify-between gap-3 font-headline text-sm sm:text-base font-bold text-[#1a1b22] dark:text-white list-none select-none">
                  <span>{faq.question}</span>
                  <ChevronDown className="w-4 h-4 text-[#4648d4] dark:text-[#8587ff] transition-transform duration-200 shrink-0 group-open:rotate-180" />
                </summary>
                <div className="mt-3 text-xs sm:text-sm text-[#464554] dark:text-[#c7c4d7] leading-relaxed pt-2.5 border-t border-[#eeedf7] dark:border-[#292a39]">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
