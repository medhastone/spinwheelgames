import { Metadata } from 'next';
import Link from 'next/link';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import { Accessibility, Keyboard, Eye, Volume2, Sparkles, HelpCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/siteConfig';

export const dynamic = 'force-static';



export const metadata: Metadata = {
  title: 'Accessibility Statement | SpinWheelGames',
  description: 'Engineered with WCAG 2.1 accessibility principles: full keyboard navigation, screen reader live announcements, high contrast, and reduced motion.',
  alternates: {
    canonical: 'https://spinwheelgames.org/accessibility'
  },
  openGraph: {
    title: 'Accessibility Statement | SpinWheelGames',
    description: 'Engineered with WCAG 2.1 accessibility principles: full keyboard navigation, screen reader live announcements, high contrast, and reduced motion.',
    url: 'https://spinwheelgames.org/accessibility',
    siteName: 'SpinWheelGames',
    type: 'website',
    images: [
      {
        url: 'https://spinwheelgames.org/spinwheel.webp',
        width: 1200,
        height: 630,
        alt: 'Accessibility Statement | SpinWheelGames'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accessibility Statement | SpinWheelGames',
    description: 'Engineered with WCAG 2.1 accessibility principles: full keyboard navigation, screen reader live announcements, high contrast, and reduced motion.',
    images: ['https://spinwheelgames.org/spinwheel.webp']
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
        item: SITE_CONFIG.baseUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Accessibility Statement',
        item: `${SITE_CONFIG.baseUrl}/accessibility`
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

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 pt-16 sm:pt-20 lg:pt-22 pb-12 sm:pb-16 space-y-8 sm:space-y-10">
        {/* Header */}
        <section className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4648d4]/10 text-[#4648d4] dark:text-[#8587ff] text-xs font-bold uppercase tracking-wider">
            <Accessibility className="w-3.5 h-3.5" />
            Universal Design &amp; Inclusion
          </div>
          <h1 className="font-headline text-[32px] sm:text-[42px] font-extrabold tracking-tight text-[#1a1b22] dark:text-white leading-tight">
            Accessibility Statement
          </h1>
          <p className="text-[14px] text-[#767586] dark:text-[#908fa1]">
            Last Reviewed: September 2026 • Designed with WCAG 2.1 Accessibility Principles
          </p>
        </section>

        {/* Commitment Statement */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] shadow-xs space-y-4">
          <h2 className="font-headline text-[20px] font-bold text-[#1a1b22] dark:text-white">
            Our Commitment to Digital Accessibility
          </h2>
          <p className="text-[15px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
            At <strong>{SITE_CONFIG.fullBrandName}</strong>, we believe classroom decision tools, team randomizers, and giveaway spinners should be accessible to all users, including those relying on screen readers, keyboard-only navigation, speech output, or custom display settings. We design and iterate our interfaces following Web Content Accessibility Guidelines (WCAG) 2.1 principles.
          </p>
        </section>

        {/* Feature Highlights (4 Grid Cards) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-[#f4f2fd] dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#4648d4]/10 text-[#4648d4] dark:text-[#8587ff] flex items-center justify-center font-bold">
              <Keyboard className="w-5 h-5" />
            </div>
            <h3 className="font-headline text-[17px] font-bold text-[#1a1b22] dark:text-white">
              Keyboard Navigation &amp; Visible Focus
            </h3>
            <p className="text-[13px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
              Every interactive control can be navigated via keyboard. Spin with <kbd className="bg-white dark:bg-[#222330] px-1.5 py-0.5 rounded text-xs border border-gray-200 dark:border-gray-700">Space</kbd> or <kbd className="bg-white dark:bg-[#222330] px-1.5 py-0.5 rounded text-xs border border-gray-200 dark:border-gray-700">Enter</kbd>, trigger fullscreen with <kbd className="bg-white dark:bg-[#222330] px-1.5 py-0.5 rounded text-xs border border-gray-200 dark:border-gray-700">F</kbd>, dismiss modals with <kbd className="bg-white dark:bg-[#222330] px-1.5 py-0.5 rounded text-xs border border-gray-200 dark:border-gray-700">Escape</kbd>, and track focus with high-visibility outline rings.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#f4f2fd] dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Volume2 className="w-5 h-5" />
            </div>
            <h3 className="font-headline text-[17px] font-bold text-[#1a1b22] dark:text-white">
              Screen Reader Announcements &amp; TTS
            </h3>
            <p className="text-[13px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
              Polite ARIA live regions (<code className="text-xs">aria-live=&quot;polite&quot;</code>) announce spin state and winning results to screen reader software. Built-in speech synthesis (TTS) can read winning names aloud for classroom presentations.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#f4f2fd] dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="font-headline text-[17px] font-bold text-[#1a1b22] dark:text-white">
              Contrast &amp; Legibility
            </h3>
            <p className="text-[13px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
              Slice labels use dual-stroke high-contrast outlines to preserve readability across light and dark slice colors. System dark and light themes provide clear visual separation between background and active UI components.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#f4f2fd] dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-headline text-[17px] font-bold text-[#1a1b22] dark:text-white">
              Reduced Motion &amp; Animation Controls
            </h3>
            <p className="text-[13px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
              Users who prefer reduced motion or instant outcomes can configure faster spin durations or disable unnecessary confetti animations to minimize visual motion fatigue.
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
                  <td className="py-2.5 text-xs text-[#767586]">Main Wheel Workspace</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-mono"><kbd className="bg-[#f4f2fd] dark:bg-[#12131a] px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700">F</kbd></td>
                  <td className="py-2.5 font-semibold">Toggle Fullscreen Presentation</td>
                  <td className="py-2.5 text-xs text-[#767586]">Wheel Workspace</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-mono"><kbd className="bg-[#f4f2fd] dark:bg-[#12131a] px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700">Ctrl + Z</kbd> / <kbd className="bg-[#f4f2fd] dark:bg-[#12131a] px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700">Cmd + Z</kbd></td>
                  <td className="py-2.5 font-semibold">Undo Item Mutation</td>
                  <td className="py-2.5 text-xs text-[#767586]">Entry Editor</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-mono"><kbd className="bg-[#f4f2fd] dark:bg-[#12131a] px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700">Escape</kbd></td>
                  <td className="py-2.5 font-semibold">Close Dialog / Modal</td>
                  <td className="py-2.5 text-xs text-[#767586]">Active Dialogs</td>
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
            We continually test and refine our user experience. If you encounter an accessibility barrier, contrast issue, or keyboard trap on any page, please let us know at{' '}
            <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="text-[#4648d4] dark:text-[#8587ff] font-bold underline">
              {SITE_CONFIG.supportEmail}
            </a>{' '}
            or submit details through our{' '}
            <Link href="/contact" className="text-[#4648d4] dark:text-[#8587ff] font-bold underline">
              Contact Form
            </Link>. We prioritize resolving accessibility issues promptly.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
