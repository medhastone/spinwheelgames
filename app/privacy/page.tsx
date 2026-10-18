import { Metadata } from 'next';
import Link from 'next/link';
import SubpageHeader from '@/components/SubpageHeader';
import Footer from '@/components/Footer';
import { ShieldCheck, Lock, CheckCircle2, Server, HardDrive, Share2, Mail } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/siteConfig';

export const dynamic = 'force-static';



export const metadata: Metadata = {
  "title": "Privacy Policy & Data Security | SpinWheelGames",
  "description": "Designed to minimize collection of user-provided wheel data with local browser processing and transparent practices.",
  "alternates": {
    "canonical": "https://spinwheelgames.org/privacy"
  },
  "openGraph": {
    "title": "Privacy Policy & Data Security | SpinWheelGames",
    "description": "Designed to minimize collection of user-provided wheel data with local browser processing and transparent practices.",
    "url": "https://spinwheelgames.org/privacy",
    "siteName": "SpinWheelGames",
    "locale": "en_US",
    "type": "website",
    "images": [
      {
        "url": "https://spinwheelgames.org/api/og?path=%2Fprivacy&title=Privacy+Policy+%26+Data+Security+%7C+SpinWheelGames&desc=Designed+to+minimize+collection+of+user-provided+wheel+data+with+local+browser+processing+and+transparent+practices.",
        "width": 1200,
        "height": 630,
        "alt": "Privacy Policy & Data Security | SpinWheelGames"
      }
    ]
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Privacy Policy & Data Security | SpinWheelGames",
    "description": "Designed to minimize collection of user-provided wheel data with local browser processing and transparent practices.",
    "images": [
      "https://spinwheelgames.org/api/og?path=%2Fprivacy&title=Privacy+Policy+%26+Data+Security+%7C+SpinWheelGames&desc=Designed+to+minimize+collection+of+user-provided+wheel+data+with+local+browser+processing+and+transparent+practices."
    ]
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
        item: SITE_CONFIG.baseUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Privacy Policy',
        item: `${SITE_CONFIG.baseUrl}/privacy`
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

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 pt-16 sm:pt-20 lg:pt-22 pb-12 sm:pb-16 space-y-8 sm:space-y-10">
        {/* Header */}
        <section className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-[#006c49] dark:text-[#4edea3] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            Privacy Architecture &amp; Data Transparency
          </div>
          <h1 className="font-headline text-[32px] sm:text-[42px] font-extrabold tracking-tight text-[#1a1b22] dark:text-white leading-tight">
            Privacy Policy
          </h1>
          <p className="text-[14px] text-[#767586] dark:text-[#908fa1]">
            Effective Date: September 2026 • Last Reviewed: September 2026
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
              <span><strong>Minimal Data Collection:</strong> Designed to minimize collection of user-provided wheel data.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Local Processing:</strong> Wheel entries, custom items, and spin physics run in your browser.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Privacy Focused:</strong> No behavioral re-targeting pixels or cross-site identity profiles.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Educational Evaluation:</strong> Clear guidance for schools, teachers, and organizations.</span>
            </div>
          </div>
        </section>

        {/* Document Content */}
        <section className="prose dark:prose-invert max-w-none space-y-8 text-[15px] text-[#464554] dark:text-[#c7c4d7] leading-relaxed">
          <div className="space-y-3">
            <h2 className="font-headline text-[22px] font-bold text-[#1a1b22] dark:text-white flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-[#4648d4] dark:text-[#8587ff]" />
              1. What Data is Processed Locally in Your Browser
            </h2>
            <p>
              {SITE_CONFIG.fullBrandName} is designed to minimize collection of user-provided wheel data. During typical usage, core application operations execute locally on your device:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Wheel Slices and Text Entries:</strong> The names, participant lists, options, weights, and color configurations you enter into the editor are processed in your browser memory.</li>
              <li><strong>Randomness Calculation:</strong> Random spin calculations utilize the browser&apos;s native Web Cryptography API (<code className="text-xs">crypto.getRandomValues</code>) locally on your device.</li>
              <li><strong>Physics and Sound Rendering:</strong> The visual spinning animations, canvas rendering, and Web Audio synthesizers run entirely client-side.</li>
              <li><strong>Accounts:</strong> You do not need to register, create a username, or provide a password to build or spin wheels.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-headline text-[22px] font-bold text-[#1a1b22] dark:text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-[#4648d4] dark:text-[#8587ff]" />
              2. What Data is Sent to the Server
            </h2>
            <p>
              Certain user-initiated features and standard web operations require transmitting data to our server infrastructure:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Shared URLs and Saved Short Links:</strong> When you choose to share a wheel by generating a short link (<code className="text-xs">/w/[id]</code>) or exporting a cloud-shareable preset, the wheel title, slice names, weights, and selected theme are sent to our server to generate and store the share record so that recipients can view the configuration. Please avoid including private or sensitive personal information in public wheel titles and slice names.
              </li>
              <li>
                <strong>Contact and Support Submissions:</strong> If you submit a message through our Contact form, the name, email address, inquiry topic, and message content you provide are transmitted to our servers to route and answer your support request.
              </li>
              <li>
                <strong>Server Logs &amp; Network Delivery:</strong> Like virtually all web applications, hosting infrastructure automatically receives standard HTTP request metadata (such as IP addresses, browser user-agents, referring URLs, and timestamps) solely for network routing, DDoS prevention, rate limiting, and security monitoring.
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-headline text-[22px] font-bold text-[#1a1b22] dark:text-white flex items-center gap-2">
              <Share2 className="w-5 h-5 text-[#4648d4] dark:text-[#8587ff]" />
              3. Local Storage and Client-Side Preferences
            </h2>
            <p>
              We use standard browser web storage (<code className="text-xs">localStorage</code>) to maintain state on your specific browser without requiring a user database:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Preferences:</strong> Theme preference (dark/light mode), sound effects volume, master mute toggle, and spin speed settings.</li>
              <li><strong>Custom Saved Wheels:</strong> Wheels you save to your device catalog for later editing.</li>
              <li><strong>Local History and Achievements:</strong> Recent spin results and daily challenge streaks stored on your machine.</li>
            </ul>
            <p className="text-xs text-[#767586] dark:text-[#908fa1]">
              You can clear this data at any time via your browser settings or by using the in-app reset controls.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-headline text-[22px] font-bold text-[#1a1b22] dark:text-white">
              4. Analytics and Cookies
            </h2>
            <p>
              {SITE_CONFIG.brandName} does not use third-party cross-site trackers or commercial data-broker pixels. We do not sell or rent user information. If basic anonymous traffic metrics are utilized to measure site performance and page availability, they do not correlate individual wheel content with personal identity profiles.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-headline text-[22px] font-bold text-[#1a1b22] dark:text-white">
              5. Educational and Classroom Use
            </h2>
            <p>
              {SITE_CONFIG.brandName} is designed to minimize collection of user-provided wheel data to facilitate classroom activities, random student calling, and educational exercises without requiring student accounts or logins.
            </p>
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[#1a1b22] dark:text-[#f1effa] text-[14px]">
              <p className="font-semibold text-amber-900 dark:text-amber-200 mb-1">
                Institutional Compliance Notice:
              </p>
              <p className="text-xs leading-relaxed text-[#464554] dark:text-[#c7c4d7]">
                Schools, teachers, and organizations are responsible for evaluating their own privacy and compliance requirements (including regulations such as COPPA, FERPA, GDPR, and local educational authority policies) before importing student data or distributing shared links. We recommend using first names or generic identifiers when generating public classroom materials.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="font-headline text-[22px] font-bold text-[#1a1b22] dark:text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#4648d4] dark:text-[#8587ff]" />
              6. Contact for Privacy Questions
            </h2>
            <p>
              If you have any questions, privacy inquiries, or suggestions regarding our data practices, please contact us via email at{' '}
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
