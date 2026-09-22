import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import ScrollToTop from '@/components/ScrollToTop';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta-sans',
});

export const viewport: Viewport = {
  themeColor: '#4648d4',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://spinwheelgames.org'),
  title: {
    default: 'SpinWheelGames - Free Online Random Wheel Spinner & Decision Maker',
    template: '%s | SpinWheelGames'
  },
  description:
    'Free wheel games, classroom student pickers, giveaway drawing tools, business meeting decision wheels, and certified fair decision pickers with cryptographic randomness.',
  keywords: [
    'spin wheel',
    'random picker',
    'wheel spinner',
    'random name picker',
    'classroom wheel',
    'giveaway picker',
    'decision maker',
    'provably fair wheel'
  ],
  authors: [{ name: 'SpinWheelGames Engineering Team', url: 'https://spinwheelgames.org' }],
  creator: 'SpinWheelGames',
  publisher: 'SpinWheelGames',
  applicationName: 'SpinWheelGames',
  alternates: {
    canonical: 'https://spinwheelgames.org'
  },
  openGraph: {
    title: 'SpinWheelGames - Free Online Random Wheel Spinner & Decision Maker',
    description:
      'Free wheel games, classroom student pickers, giveaway drawings, and certified fair decision tools with cryptographic randomness.',
    url: 'https://spinwheelgames.org',
    siteName: 'SpinWheelGames',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SpinWheelGames - Free Online Random Wheel Spinner & Decision Maker',
    description:
      'Free wheel games, classroom student pickers, giveaway drawings, and certified fair decision tools with cryptographic randomness.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://spinwheelgames.org/#website',
        name: 'SpinWheelGames',
        url: 'https://spinwheelgames.org',
        description: 'Free online random wheel spinner and certified fair decision maker',
        inLanguage: 'en-US',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://spinwheelgames.org/?search={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://spinwheelgames.org/#app',
        name: 'SpinWheelGames Interactive Wheel Engine',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        url: 'https://spinwheelgames.org',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD'
        },
        featureList: [
          'Hardware-Seeded Web Cryptography (CSPRNG)',
          'Classroom Student Picker & Team Splitter',
          'Giveaway Entry Import & Winner Verification',
          'Business Meeting Decision Tools',
          'Zero-Lag 60 FPS Canvas Graphics',
          'No Account Required / 100% Client-Side Privacy'
        ]
      },
      {
        '@type': 'Organization',
        '@id': 'https://spinwheelgames.org/#organization',
        name: 'SpinWheelGames',
        url: 'https://spinwheelgames.org',
        logo: 'https://spinwheelgames.org/logo.svg'
      }
    ]
  };

  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body suppressHydrationWarning className="antialiased bg-[#fbf8ff] dark:bg-[#0c0d14] text-[#1a1b22] dark:text-[#eeedf7]">
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
