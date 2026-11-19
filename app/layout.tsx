import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import ScrollToTop from '@/components/ScrollToTop';
import ViralToolsController from '@/components/viral/ViralToolsController';
import { buildPageOgImageUrl } from '@/lib/pageMetadata';

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
  alternates: {},
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
        url: buildPageOgImageUrl(
          '/',
          'Spin the Wheel & See What Happens | SpinWheelGames',
          'Not sure what to choose? Give the wheel a spin and let the result surprise you. Play free wheel games, pick names and make decisions.'
        ),
        width: 1200,
        height: 630,
        alt: 'Spin the Wheel & See What Happens | SpinWheelGames'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spin the Wheel & See What Happens | SpinWheelGames',
    description:
      'Not sure what to choose? Give the wheel a spin and let the result surprise you. Play free wheel games, pick names and make decisions.',
    images: [
      buildPageOgImageUrl(
        '/',
        'Spin the Wheel & See What Happens | SpinWheelGames',
        'Not sure what to choose? Give the wheel a spin and let the result surprise you. Play free wheel games, pick names and make decisions.'
      )
    ]
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
                  if (window.location.search.indexOf('stream=1') !== -1 || window.location.search.indexOf('bg=transparent') !== -1) {
                    document.documentElement.classList.add('streamer-mode');
                  }
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function isRecoverableOrExtensionError(str) {
                  if (!str || typeof str !== 'string') return false;
                  return (
                    str.indexOf('chrome-extension://') !== -1 ||
                    str.indexOf('Cannot set property fetch') !== -1 ||
                    str.indexOf('Hydration failed') !== -1 ||
                    str.indexOf('server rendered HTML') !== -1 ||
                    str.indexOf('A tree hydrated but') !== -1 ||
                    str.indexOf('Text content does not match') !== -1 ||
                    str.indexOf('There was an error while hydrating') !== -1 ||
                    str.indexOf('react.dev/link/hydration-mismatch') !== -1
                  );
                }

                try {
                  var origFetch = window.fetch;
                  Object.defineProperty(window, 'fetch', {
                    get: function() { return origFetch; },
                    set: function(newFetch) { origFetch = newFetch; },
                    configurable: true,
                    enumerable: true
                  });
                } catch (e) {}

                try {
                  if (typeof window.reportError === 'function') {
                    var currentReportError = window.reportError.bind(window);
                    var wrapReportError = function(fn) {
                      return function(err) {
                        var msg = (err && (err.message || err.stack)) || String(err || '');
                        if (isRecoverableOrExtensionError(msg)) {
                          return;
                        }
                        return fn.apply(window, arguments);
                      };
                    };
                    var guardedReportError = wrapReportError(currentReportError);
                    Object.defineProperty(window, 'reportError', {
                      get: function() { return guardedReportError; },
                      set: function(newFn) {
                        if (typeof newFn === 'function') {
                          guardedReportError = wrapReportError(newFn);
                        }
                      },
                      configurable: true,
                      enumerable: true
                    });
                  }
                } catch (e) {}

                try {
                  if (typeof console !== 'undefined' && typeof console.error === 'function') {
                    var currentConsoleError = console.error.bind(console);
                    var wrapConsoleError = function(fn) {
                      return function() {
                        for (var i = 0; i < arguments.length; i++) {
                          var arg = arguments[i];
                          var text = (arg && (arg.message || arg.stack)) || (typeof arg === 'string' ? arg : '');
                          if (isRecoverableOrExtensionError(text)) {
                            return;
                          }
                        }
                        return fn.apply(console, arguments);
                      };
                    };
                    var guardedConsoleError = wrapConsoleError(currentConsoleError);
                    Object.defineProperty(console, 'error', {
                      get: function() { return guardedConsoleError; },
                      set: function(newFn) {
                        if (typeof newFn === 'function') {
                          guardedConsoleError = wrapConsoleError(newFn);
                        }
                      },
                      configurable: true,
                      enumerable: true
                    });
                  }
                } catch (e) {}

                window.addEventListener('error', function(event) {
                  var message = (event && event.message) || (event && event.error && event.error.message) || '';
                  var filename = (event && event.filename) || '';
                  if (
                    filename.indexOf('chrome-extension://') !== -1 ||
                    isRecoverableOrExtensionError(message)
                  ) {
                    if (event.preventDefault) event.preventDefault();
                    if (event.stopPropagation) event.stopPropagation();
                    if (event.stopImmediatePropagation) event.stopImmediatePropagation();
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
                    isRecoverableOrExtensionError(msg) ||
                    isRecoverableOrExtensionError(stack)
                  ) {
                    if (event.preventDefault) event.preventDefault();
                    if (event.stopPropagation) event.stopPropagation();
                    if (event.stopImmediatePropagation) event.stopImmediatePropagation();
                  }
                }, true);
              })();
            `
          }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-screen flex flex-col antialiased bg-[#fbf8ff] dark:bg-[#0c0d14] text-[#1a1b22] dark:text-[#eeedf7] w-full max-w-full overflow-x-clip">
        {children}
        <ViralToolsController />
        <ScrollToTop />
      </body>
    </html>
  );
}
