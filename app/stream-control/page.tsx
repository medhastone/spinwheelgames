import React from 'react';
import type { Metadata } from 'next';
import StreamControlDeck from '@/components/viral/StreamControlDeck';
import { buildPageOgImageUrl } from '@/lib/pageMetadata';

export const dynamic = 'force-static';

const title = 'OBS Streamer Remote Control Deck | SpinWheelGames';
const description =
  'Live remote control deck for SpinWheelGames OBS Studio and Streamlabs overlays. Trigger wheel spins, roll dice, remove winners, and update entries in real time.';

export const metadata: Metadata = {
  title,
  description,
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false
    }
  },
  alternates: {
    canonical: 'https://spinwheelgames.org/stream-wheel'
  },
  openGraph: {
    title,
    description,
    url: 'https://spinwheelgames.org/stream-control',
    siteName: 'SpinWheelGames',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: buildPageOgImageUrl('/stream-control', title, description),
        width: 1200,
        height: 630,
        alt: title
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [buildPageOgImageUrl('/stream-control', title, description)]
  }
};

export default function StreamControlPage() {
  return <StreamControlDeck />;
}
