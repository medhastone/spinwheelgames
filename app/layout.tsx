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
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://spinwheelgames.org'),
  title: {
    default: 'Spin the Wheel & See What Happens | SpinWheelGames',
    template: '%s'
  },
  description:
    'Not sure what to choose? Give the wheel a spin and let the result surprise you. Play free wheel games, pick names and make decisions.',
  keywords: [
    'spin wheel',
    'wheel games',
    'random picker',
    'wheel of names',
    'decision wheel',
    'random wheel',
    'picker wheel',
    'random name picker',
    'yes or no wheel'
  ],
  authors: [{ name: 'SpinWheelGames', url: 'https://spinwheelgames.org' }],
  creator: 'SpinWheelGames',
  publisher: 'SpinWheelGames',
  applicationName: 'SpinWheelGames',
  alternates: {
    canonical: 'https://spinwheelgames.org/'
  },
  openGraph: {
    title: 'Spin the Wheel & See What Happens | SpinWheelGames',
    description:
      'Not sure what to choose? Give the wheel a spin and let the result surprise you. Play free wheel games, pick names and make decisions.',
    url: 'https://spinwheelgames.org/',
    siteName: 'SpinWheelGames',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://spinwheelgames.org/spinwheel-logo.webp',
        width: 1200,
        height: 630,
        alt: 'SpinWheelGames'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spin the Wheel & See What Happens | SpinWheelGames',
    description:
      'Free wheel games and random pickers for decisions, names, teams, food, classrooms, parties and giveaways.',
    images: ['https://spinwheelgames.org/spinwheel-logo.webp']
  },
  icons: {
    icon: [
      { url: '/spinwheel-favicon.webp', type: 'image/webp' },
      { url: '/favicon.webp', type: 'image/webp' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    shortcut: '/spinwheel-favicon.webp',
    apple: '/spinwheel-favicon.webp',
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
        '@type': 'Organization',
        '@id': 'https://spinwheelgames.org/#organization',
        name: 'SpinWheelGames',
        url: 'https://spinwheelgames.org/',
        logo: {
          '@type': 'ImageObject',
          url: 'https://spinwheelgames.org/spinwheel-logo.webp'
        },
        description: 'SpinWheelGames is an online platform for free wheel games, random pickers, decision tools, classroom activities, party games, giveaways and interactive randomizers.'
      },
      {
        '@type': 'WebSite',
        '@id': 'https://spinwheelgames.org/#website',
        name: 'SpinWheelGames',
        url: 'https://spinwheelgames.org/',
        publisher: {
          '@id': 'https://spinwheelgames.org/#organization'
        },
        description: 'Free online wheel games, random pickers and decision tools.'
      },
      {
        '@type': 'WebPage',
        '@id': 'https://spinwheelgames.org/#webpage',
        url: 'https://spinwheelgames.org/',
        name: 'Spin the Wheel & See What Happens | SpinWheelGames',
        description: 'Not sure what to choose? Give the wheel a spin and let the result surprise you. Play free wheel games, pick names and make decisions.',
        isPartOf: {
          '@id': 'https://spinwheelgames.org/#website'
        },
        about: {
          '@id': 'https://spinwheelgames.org/#organization'
        },
        inLanguage: 'en'
      }
    ]
  };

  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('spinwheel_theme_preference');
                  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `
          }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/webp" href="/spinwheel-favicon.webp" />
        <link rel="shortcut icon" href="/spinwheel-favicon.webp" />
        <link rel="apple-touch-icon" href="/spinwheel-favicon.webp" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var origFetch = window.fetch;
                  Object.defineProperty(window, 'fetch', {
                    get: function() { return origFetch; },
                    set: function(newFetch) { origFetch = newFetch; },
                    configurable: true,
                    enumerable: true
                  });
                } catch (e) {}

                window.addEventListener('error', function(event) {
                  var message = (event && event.message) || '';
                  var filename = (event && event.filename) || '';
                  if (
                    filename.indexOf('chrome-extension://') !== -1 ||
                    message.indexOf('Cannot set property fetch') !== -1
                  ) {
                    if (event.preventDefault) event.preventDefault();
                    if (event.stopPropagation) event.stopPropagation();
                    return true;
                  }

                  if (
                    message.indexOf('ChunkLoadError') !== -1 ||
                    message.indexOf('Loading chunk') !== -1 ||
                    message.indexOf('Failed to fetch dynamically imported module') !== -1
                  ) {
                    var storageKey = 'swg_chunk_reload_' + window.location.pathname;
                    var now = Date.now();
                    var lastReload = parseInt(sessionStorage.getItem(storageKey) || '0', 10);
                    if (now - lastReload > 8000) {
                      sessionStorage.setItem(storageKey, String(now));
                      window.location.reload();
                    }
                  }
                }, true);

                window.addEventListener('unhandledrejection', function(event) {
                  var reason = (event && event.reason) || {};
                  var msg = reason.message || String(reason || '');
                  var stack = reason.stack || '';
                  if (
                    stack.indexOf('chrome-extension://') !== -1 ||
                    msg.indexOf('Cannot set property fetch') !== -1
                  ) {
                    if (event.preventDefault) event.preventDefault();
                  }
                });
              })();
            `
          }}
        />
      </head>
      <body suppressHydrationWarning className="antialiased bg-[#fbf8ff] dark:bg-[#0c0d14] text-[#1a1b22] dark:text-[#eeedf7] w-full max-w-full overflow-x-clip">
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
