import type { Metadata } from 'next';
import Link from 'next/link';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import {
  Sparkles,
  Keyboard,
  Eye,
  Volume2,
  CheckCircle2,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Accessibility Statement (WCAG 2.1 AA) | SpinWheelGames',
  description:
    'Learn about our accessibility features including full keyboard navigation, screen reader ARIA support, Text-to-Speech winner announcements, and high-contrast wheel rendering.',
  alternates: {
    canonical: 'https://spinwheelgames.org/accessibility'
  },
  openGraph: {
    title: 'Accessibility Statement - SpinWheelGames.org',
    description: 'Our commitment to inclusive, accessible design for classrooms, educators, and all users.',
    url: 'https://spinwheelgames.org/accessibility',
    type: 'website'
  }
};

export default function AccessibilityPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
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
        name: 'Accessibility',
        item: 'https://spinwheelgames.org/accessibility'
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8ff] dark:bg-[#12131a] text-[#1a1b22] dark:text-[#f1effa] transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <SubpageHeader activePage="/accessibility" />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12">
        {/* Header */}
        <section className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Universal Access
          </div>
          <h1 className="font-headline text-[32px] sm:text-[42px] font-extrabold tracking-tight text-[#1a1b22] dark:text-white leading-tight">
            Accessibility Statement
          </h1>
          <p className="text-[15px] sm:text-[17px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
            SpinWheelGames.org is engineered with the core belief that every student, educator, presenter, and participant should have equal access to intuitive, accessible decision tools.
          </p>
        </section>

        {/* WCAG 2.1 AA Compliance Summary */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] shadow-xs space-y-4">
          <h2 className="font-headline text-[20px] font-bold text-[#1a1b22] dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            WCAG 2.1 Level AA Conformity
          </h2>
          <p className="text-[14px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
            We actively conform to the <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong> standards and Section 508 guidelines for educational software. Our design ensures that motor, visual, auditory, and cognitive accessibility needs are supported.
          </p>
        </section>

        {/* Feature Highlights (4 Grid Cards) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-[#f4f2fd] dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#4648d4]/10 text-[#4648d4] dark:text-[#8587ff] flex items-center justify-center font-bold">
              <Keyboard className="w-5 h-5" />
            </div>
            <h3 className="font-headline text-[17px] font-bold text-[#1a1b22] dark:text-white">
              Full Keyboard Operability
            </h3>
            <p className="text-[13px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
              Every control is accessible without a mouse. Spin with <kbd className="bg-white dark:bg-[#222330] px-1.5 py-0.5 rounded text-xs border border-gray-200 dark:border-gray-700">Space</kbd> or <kbd className="bg-white dark:bg-[#222330] px-1.5 py-0.5 rounded text-xs border border-gray-200 dark:border-gray-700">Enter</kbd>, toggle fullscreen with <kbd className="bg-white dark:bg-[#222330] px-1.5 py-0.5 rounded text-xs border border-gray-200 dark:border-gray-700">F</kbd>, and undo edits with <kbd className="bg-white dark:bg-[#222330] px-1.5 py-0.5 rounded text-xs border border-gray-200 dark:border-gray-700">Ctrl+Z</kbd>.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#f4f2fd] dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Volume2 className="w-5 h-5" />
            </div>
            <h3 className="font-headline text-[17px] font-bold text-[#1a1b22] dark:text-white">
              Text-to-Speech (TTS) &amp; Sound
            </h3>
            <p className="text-[13px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
              Enable synthetic speech readout to hear the winning student or prize announced out loud automatically. Full master mute controls are provided for quiet environments.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#f4f2fd] dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="font-headline text-[17px] font-bold text-[#1a1b22] dark:text-white">
              High Contrast &amp; Dark Mode
            </h3>
            <p className="text-[13px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
              Slice labels utilize dual-tone stroke rendering (<code className="text-xs">paint-order: stroke fill</code>) ensuring maximum text legibility across all custom slice backgrounds.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#f4f2fd] dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-headline text-[17px] font-bold text-[#1a1b22] dark:text-white">
              Screen Reader ARIA Live Regions
            </h3>
            <p className="text-[13px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
              When a wheel starts spinning and halts on a winner, polite ARIA live regions (<code className="text-xs">aria-live=&quot;polite&quot;</code>) notify NVDA, JAWS, and VoiceOver screen reader users instantaneously.
            </p>
          </div>
        </section>

        {/* Keyboard Shortcut Matrix */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] space-y-4">
          <h2 className="font-headline text-[20px] font-bold text-[#1a1b22] dark:text-white">
            Keyboard Shortcuts Reference Table
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-[#eeedf7] dark:border-[#222330] text-[#767586] dark:text-[#908fa1]">
                  <th className="py-2.5 font-bold">Key Combination</th>
                  <th className="py-2.5 font-bold">Action</th>
                  <th className="py-2.5 font-bold">Context</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eeedf7] dark:divide-[#222330] text-[#1a1b22] dark:text-[#c7c4d7]">
                <tr>
                  <td className="py-2.5 font-mono"><kbd className="bg-[#f4f2fd] dark:bg-[#12131a] px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700">Space</kbd> or <kbd className="bg-[#f4f2fd] dark:bg-[#12131a] px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700">Enter</kbd></td>
                  <td className="py-2.5 font-semibold">Spin Selected Wheel</td>
                  <td className="py-2.5 text-xs text-[#767586]">Main Canvas</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-mono"><kbd className="bg-[#f4f2fd] dark:bg-[#12131a] px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700">F</kbd></td>
                  <td className="py-2.5 font-semibold">Toggle Fullscreen Presentation</td>
                  <td className="py-2.5 text-xs text-[#767586]">Global</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-mono"><kbd className="bg-[#f4f2fd] dark:bg-[#12131a] px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700">Ctrl + Z</kbd> (or <kbd className="bg-[#f4f2fd] dark:bg-[#12131a] px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700">Cmd + Z</kbd>)</td>
                  <td className="py-2.5 font-semibold">Undo Item Mutation</td>
                  <td className="py-2.5 text-xs text-[#767586]">Editor Panel</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-mono"><kbd className="bg-[#f4f2fd] dark:bg-[#12131a] px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700">Ctrl + Y</kbd> (or <kbd className="bg-[#f4f2fd] dark:bg-[#12131a] px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700">Cmd + Shift + Z</kbd>)</td>
                  <td className="py-2.5 font-semibold">Redo Item Mutation</td>
                  <td className="py-2.5 text-xs text-[#767586]">Editor Panel</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-mono"><kbd className="bg-[#f4f2fd] dark:bg-[#12131a] px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700">Escape</kbd></td>
                  <td className="py-2.5 font-semibold">Close Dialog / Winner Modal</td>
                  <td className="py-2.5 text-xs text-[#767586]">Active Modals</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Feedback Channel */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#f4f2fd] dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] space-y-4">
          <h2 className="font-headline text-[18px] font-bold text-[#1a1b22] dark:text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#4648d4] dark:text-[#8587ff]" />
            Accessibility Feedback &amp; Support
          </h2>
          <p className="text-[14px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
            We welcome feedback from assistive technology users and educators. If you encounter any barrier while operating our wheels, please email our accessibility team at <a href="mailto:accessibility@spinwheelgames.org" className="text-[#4648d4] dark:text-[#8587ff] font-bold underline">accessibility@spinwheelgames.org</a> or visit our <Link href="/contact" className="text-[#4648d4] dark:text-[#8587ff] font-bold underline">Contact Page</Link>.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
