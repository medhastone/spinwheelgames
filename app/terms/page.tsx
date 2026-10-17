import { Metadata } from 'next';
import Link from 'next/link';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import { Scale, Sparkles, ShieldAlert, FileText, CheckCircle2, Building2 } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/siteConfig';

export const dynamic = 'force-static';



export const metadata: Metadata = {
  title: 'Terms of Service | SpinWheelGames',
  description: 'Guidelines and conditions for using SpinWheelGames tools and embedding services.',
  alternates: {
    canonical: 'https://spinwheelgames.org/terms'
  },
  openGraph: {
    title: 'Terms of Service | SpinWheelGames',
    description: 'Guidelines and conditions for using SpinWheelGames tools and embedding services.',
    url: 'https://spinwheelgames.org/terms',
    siteName: 'SpinWheelGames',
    type: 'website',
    images: [
      {
        url: 'https://spinwheelgames.org/spinwheel.webp',
        width: 1200,
        height: 630,
        alt: 'Terms of Service | SpinWheelGames'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service | SpinWheelGames',
    description: 'Guidelines and conditions for using SpinWheelGames tools and embedding services.',
    images: ['https://spinwheelgames.org/spinwheel.webp']
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
        item: SITE_CONFIG.baseUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Terms of Service',
        item: `${SITE_CONFIG.baseUrl}/terms`
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

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 pt-16 sm:pt-20 lg:pt-22 pb-12 sm:pb-16 space-y-8 sm:space-y-10">
        {/* Header */}
        <section className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5" />
            Terms &amp; Usage Conditions
          </div>
          <h1 className="font-headline text-[32px] sm:text-[42px] font-extrabold tracking-tight text-[#1a1b22] dark:text-white leading-tight">
            Terms of Service
          </h1>
          <p className="text-[14px] text-[#767586] dark:text-[#908fa1]">
            Last Reviewed &amp; Updated: September 2026
          </p>
        </section>

        {/* Highlight Card */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#f4f2fd] dark:bg-[#181922] border border-[#eeedf7] dark:border-[#222330] space-y-3">
          <h2 className="font-headline text-[18px] font-bold text-[#1a1b22] dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#4648d4] dark:text-[#8587ff]" />
            Permitted Use Summary
          </h2>
          <p className="text-[14px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
            {SITE_CONFIG.brandName} is available to use for personal decision-making, classroom instruction, live streaming, team icebreakers, and casual prize drawings. You may embed wheels in web pages and share custom wheel links freely according to these terms.
          </p>
        </section>

        {/* Terms Sections */}
        <section className="prose dark:prose-invert max-w-none space-y-8 text-[15px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
          <div className="space-y-3">
            <h2 className="font-headline text-[22px] font-bold text-[#1a1b22] dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#4648d4] dark:text-[#8587ff]" />
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, embedding, or using <strong>{SITE_CONFIG.fullBrandName}</strong> (&quot;the Service&quot;), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please discontinue use of the Service.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-headline text-[22px] font-bold text-[#1a1b22] dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#4648d4] dark:text-[#8587ff]" />
              2. Permitted Uses &amp; Embedding
            </h2>
            <p>
              You are granted a non-exclusive, revocable license to use the Service for legitimate purposes:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Classroom &amp; Academic Activities:</strong> Student selection, team divisions, math probability demonstrations, and classroom games on interactive displays or student devices.</li>
              <li><strong>Streaming &amp; Content Creation:</strong> Broadcasting wheel spins during online streams on platforms such as YouTube, Twitch, Kick, or social feeds.</li>
              <li><strong>Team &amp; Community Events:</strong> Meeting icebreakers, chores, workout randomized routines, and social game nights.</li>
              <li><strong>Website Embeds:</strong> Embedding interactive wheel iframes on educational portals, blogs, or community sites.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-headline text-[22px] font-bold text-[#1a1b22] dark:text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#4648d4] dark:text-[#8587ff]" />
              3. User Responsibilities &amp; Compliance Requirements
            </h2>
            <p>
              You retain ownership of any custom labels, text, or names you enter into our tools. By using the Service, you agree:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Not to submit unlawful, harassing, defamatory, or abusive content into shared wheels or contact messages.</li>
              <li>Not to attempt to disrupt or abuse the service infrastructure or API endpoints.</li>
              <li>
                <strong>Institutional &amp; Regulatory Responsibility:</strong> Schools, teachers, contest organizers, and organizations are responsible for evaluating their own privacy, regulatory, sweepstakes, and compliance requirements (including local raffle laws, COPPA, FERPA, and accessibility standards) before deploying wheels in official settings.
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-headline text-[22px] font-bold text-[#1a1b22] dark:text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              4. Disclaimer Regarding Gambling &amp; Sweepstakes
            </h2>
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[#1a1b22] dark:text-[#f1effa] text-[14px]">
              <p className="font-bold text-amber-900 dark:text-amber-200 mb-1">
                Not a Licensed Gambling System:
              </p>
              <p className="text-xs leading-relaxed text-[#464554] dark:text-[#c7c4d7]">
                {SITE_CONFIG.brandName} is a decision-support, casual gaming, and educational tool. While random calculations use standard browser cryptographic functions (<code className="text-xs">crypto.getRandomValues</code>), the platform is not licensed as a commercial gaming machine, casino roulette, or regulated lottery system. We disclaim all liability for any financial stakes, commercial bets, or legal disputes arising from user-run contests.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="font-headline text-[22px] font-bold text-[#1a1b22] dark:text-white">
              5. Disclaimer of Warranties &amp; Limitation of Liability
            </h2>
            <p>
              The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
            <p>
              To the maximum extent permitted by applicable law, {SITE_CONFIG.fullBrandName} and its operators shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the platform.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-headline text-[22px] font-bold text-[#1a1b22] dark:text-white">
              6. Modifications to the Service and Terms
            </h2>
            <p>
              We reserve the right to modify, update, or discontinue features of the Service at any time. Continued use of the platform after updates indicates acceptance of modified terms.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-headline text-[22px] font-bold text-[#1a1b22] dark:text-white">
              7. Contact Information
            </h2>
            <p>
              For legal inquiries, licensing questions, or terms clarification, please email{' '}
              <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="text-[#4648d4] dark:text-[#8587ff] font-semibold underline">
                {SITE_CONFIG.supportEmail}
              </a>{' '}
              or visit our{' '}
              <Link href="/contact" className="text-[#4648d4] dark:text-[#8587ff] font-semibold underline">
                Contact Page
              </Link>.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
