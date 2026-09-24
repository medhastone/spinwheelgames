import type { Metadata } from 'next';
import Link from 'next/link';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import { Scale, CheckCircle2, AlertCircle, Sparkles, ShieldAlert, Code } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service - Usage Guidelines & License | SpinWheelGames',
  description:
    'Read the Terms of Service for SpinWheelGames.org. Learn about acceptable use, classroom embedding licenses, commercial giveaway usage, and software disclaimers.',
  alternates: {
    canonical: 'https://spinwheelgames.org/terms'
  },
  openGraph: {
    title: 'Terms of Service - SpinWheelGames.org',
    description: 'Guidelines and conditions for using SpinWheelGames tools and embedding services.',
    url: 'https://spinwheelgames.org/terms',
    type: 'website'
  }
};

export default function TermsPage() {
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
        name: 'Terms of Service',
        item: 'https://spinwheelgames.org/terms'
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8ff] dark:bg-[#12131a] text-[#1a1b22] dark:text-[#f1effa] transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <SubpageHeader activePage="/terms" />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10">
        {/* Header */}
        <section className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5" />
            Legal Agreement
          </div>
          <h1 className="font-headline text-[32px] sm:text-[42px] font-extrabold tracking-tight text-[#1a1b22] dark:text-white leading-tight">
            Terms of Service
          </h1>
          <p className="text-[14px] text-[#767586] dark:text-[#908fa1]">
            Last Updated: September 22, 2026
          </p>
        </section>

        {/* Highlight Card */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#f4f2fd] dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] space-y-3">
          <h2 className="font-headline text-[18px] font-bold text-[#1a1b22] dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#4648d4] dark:text-[#8587ff]" />
            Permitted Use Summary
          </h2>
          <p className="text-[14px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
            SpinWheelGames is completely free to use for personal, educational, streaming, and business purposes. You are welcome to embed our wheels in school portals, live-stream your prize draws on YouTube/Twitch, and create custom wheels for team meetings.
          </p>
        </section>

        {/* Terms Sections */}
        <section className="prose dark:prose-invert max-w-none space-y-8 text-[15px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
          <div className="space-y-3">
            <h2 className="font-headline text-[22px] font-bold text-[#1a1b22] dark:text-white">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, embedding, or using <strong>SpinWheelGames.org</strong> (&quot;the Service&quot;), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-headline text-[22px] font-bold text-[#1a1b22] dark:text-white">
              2. Permitted Uses &amp; Embedding License
            </h2>
            <p>
              You are granted a non-exclusive, revocable, worldwide royalty-free license to use the Service for:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Educational Classrooms:</strong> Picking students, group assignments, quiz games, and classroom activities on smartboards or student devices.</li>
              <li><strong>Live Streaming &amp; Events:</strong> Broadcasting wheel spins on Twitch, YouTube, Kick, Discord, or in-person conferences.</li>
              <li><strong>Promotional Giveaways:</strong> Selecting winners for social media, community, or company raffles in compliance with local giveaway laws.</li>
              <li><strong>Website Embeds:</strong> Integrating responsive iframes of our wheels into educational websites, intranet dashboards, or blogs.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-headline text-[22px] font-bold text-[#1a1b22] dark:text-white">
              3. User Content &amp; Intellectual Property
            </h2>
            <p>
              You retain all ownership and copyright to any custom text, participant names, or image labels you input into the wheel generator. SpinWheelGames.org does not claim any intellectual property rights over user-created lists.
            </p>
            <p>
              You agree not to input content that is defamatory, harassing, promotes illegal acts, or infringes upon third-party trademarks.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-headline text-[22px] font-bold text-[#1a1b22] dark:text-white">
              4. Disclaimer Regarding Real-Money Gambling &amp; Casino Use
            </h2>
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[#1a1b22] dark:text-[#f1effa] text-[14px] flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong>Not a Licensed Gambling Platform:</strong> SpinWheelGames.org is a decision-support, educational, and casual entertainment tool. While our engine uses hardware-grade CSPRNG (<code className="text-xs">crypto.getRandomValues</code>), the Service is NOT certified or licensed as a real-money gaming, casino roulette, or regulated gambling machine. We disclaim all liability for any real-money wagers or financial disputes conducted using the Service.
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="font-headline text-[22px] font-bold text-[#1a1b22] dark:text-white">
              5. Limitation of Liability
            </h2>
            <p>
              The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether express or implied. In no event shall SpinWheelGames.org, its creators, or contributors be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the Service.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-headline text-[22px] font-bold text-[#1a1b22] dark:text-white">
              6. Modifications to the Service
            </h2>
            <p>
              We reserve the right to update, enhance, or modify features of the platform at any time without prior notice. Continued use of the platform after updates constitutes acceptance of revised terms.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-headline text-[22px] font-bold text-[#1a1b22] dark:text-white">
              7. Contact Information
            </h2>
            <p>
              For legal inquiries, licensing requests, or terms clarification, please contact <a href="mailto:info@spinwheelgames.org" className="text-[#4648d4] dark:text-[#8587ff] font-semibold underline">info@spinwheelgames.org</a> or visit our <Link href="/contact" className="text-[#4648d4] dark:text-[#8587ff] font-semibold underline">Contact Page</Link>.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
