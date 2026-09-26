import type { Metadata } from 'next';
import Link from 'next/link';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import { ShieldCheck, Lock, EyeOff, Database, Cookie, Globe, Server, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy - 100% Client-Side Privacy Guarantee | SpinWheelGames',
  description:
    'SpinWheelGames.org operates on a strict zero-knowledge, client-side privacy architecture. Learn how we handle local storage, custom wheels, and participant data.',
  alternates: {
    canonical: 'https://spinwheelgames.org/privacy'
  },
  openGraph: {
    title: 'Privacy Policy - Zero Tracking & Client-Side Privacy',
    description:
      'We do not collect, store, or sell student names, wheel items, or personal information.',
    url: 'https://spinwheelgames.org/privacy',
    type: 'website'
  }
};

export default function PrivacyPage() {
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
        name: 'Privacy Policy',
        item: 'https://spinwheelgames.org/privacy'
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8ff] dark:bg-[#12131a] text-[#1a1b22] dark:text-[#f1effa] transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <SubpageHeader activePage="/privacy" />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10">
        {/* Header */}
        <section className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-[#006c49] dark:text-[#4edea3] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            Client-Side Privacy Guarantee
          </div>
          <h1 className="font-headline text-[32px] sm:text-[42px] font-extrabold tracking-tight text-[#1a1b22] dark:text-white leading-tight">
            Privacy Policy
          </h1>
          <p className="text-[14px] text-[#767586] dark:text-[#908fa1]">
            Effective Date: September 2026 • Last Reviewed: September 22, 2026
          </p>
        </section>

        {/* Quick Summary Card */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#f4f2fd] dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] space-y-4">
          <h2 className="font-headline text-[18px] font-bold text-[#1a1b22] dark:text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#4648d4] dark:text-[#8587ff]" />
            Privacy Summary at a Glance
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px] text-[#464554] dark:text-[#c7c4d7]">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Zero User Tracking:</strong> We do not track personal identities or profiles.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Local Processing:</strong> Wheel entries, names, and logs stay in your browser.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>No Ad Cookies:</strong> No behavioral tracking or third-party ad networks.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>COPPA &amp; FERPA Friendly:</strong> Safe for elementary classrooms and universities.</span>
            </div>
          </div>
        </section>

        {/* Document Content */}
        <section className="prose dark:prose-invert max-w-none space-y-8 text-[15px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
          <div className="space-y-3">
            <h2 className="font-headline text-[22px] font-bold text-[#1a1b22] dark:text-white">
              1. Information We Do NOT Collect
            </h2>
            <p>
              SpinWheelGames.org is architected on a <strong>100% private, browser-based model</strong>. When you create, edit, customize, or spin a wheel, all data operations run directly inside your web browser:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>We do <strong>not</strong> collect or store student rosters, participant names, raffle entries, or custom slice items.</li>
              <li>We do <strong>not</strong> log spin outcomes or winner results to any remote database.</li>
              <li>We do <strong>not</strong> require user accounts, passwords, or telephone numbers to use our core features.</li>
              <li>We do <strong>not</strong> sell, rent, or monetize your wheel contents with data brokers or advertising exchanges.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-headline text-[22px] font-bold text-[#1a1b22] dark:text-white">
              2. Saved Preferences &amp; Share Links
            </h2>
            <p>
              To provide a seamless experience without cloud databases, we utilize standard browser storage mechanisms:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Browser LocalStorage:</strong> Used solely to persist your custom wheels, volume and audio preferences, dark mode selection, and recent spin history on your current device. You can clear this at any time by clearing your browser cache or clicking &quot;Reset All&quot; in the settings menu.
              </li>
              <li>
                <strong>Shareable Links:</strong> When you share a wheel, the wheel’s title, slice names, weights, and color palette are compressed into a shareable web link. When a recipient opens the link, their browser loads the wheel setup directly.
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-headline text-[22px] font-bold text-[#1a1b22] dark:text-white">
              3. True Randomness &amp; Fair Selection
            </h2>
            <p>
              All random numbers are generated locally on your device using certified browser randomness. No server connection is needed to determine the winning slice.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-headline text-[22px] font-bold text-[#1a1b22] dark:text-white">
              4. Cookies &amp; Third-Party Services
            </h2>
            <p>
              SpinWheelGames.org does not deploy behavioral advertising cookies or third-party marketing trackers. We do not integrate tracking pixels from Facebook, TikTok, or ad re-targeting networks.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-headline text-[22px] font-bold text-[#1a1b22] dark:text-white">
              5. Educational &amp; Children&apos;s Privacy (COPPA &amp; FERPA)
            </h2>
            <p>
              Because SpinWheelGames is frequently used in elementary, secondary, and higher education environments, we maintain strict adherence to student data privacy principles:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>No student personally identifiable information (PII) is ever transmitted to or retained on our infrastructure.</li>
              <li>Teachers can freely import student first names without violating COPPA or FERPA compliance.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-headline text-[22px] font-bold text-[#1a1b22] dark:text-white">
              6. Contact for Privacy Inquiries
            </h2>
            <p>
              If you have any questions or data privacy inquiries regarding our platform, please reach out via email at <a href="mailto:info@spinwheelgames.org" className="text-[#4648d4] dark:text-[#8587ff] font-semibold underline">info@spinwheelgames.org</a> or visit our <Link href="/contact" className="text-[#4648d4] dark:text-[#8587ff] font-semibold underline">Contact Page</Link>.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
