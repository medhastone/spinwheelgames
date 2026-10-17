import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us & Support | SpinWheelGames',
  description:
    'Get in touch with the SpinWheelGames engineering and editorial team for bug reports, custom wheel suggestions, classroom support, and feedback.',
  alternates: {
    canonical: 'https://spinwheelgames.org/contact'
  },
  openGraph: {
    title: 'Contact Us & Support | SpinWheelGames',
    description:
      'Get in touch with the SpinWheelGames engineering and editorial team for bug reports, custom wheel suggestions, classroom support, and feedback.',
    url: 'https://spinwheelgames.org/contact',
    siteName: 'SpinWheelGames',
    type: 'website',
    images: [
      {
        url: 'https://spinwheelgames.org/spinwheel.webp',
        width: 1200,
        height: 630,
        alt: 'Contact Us & Support | SpinWheelGames'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us & Support | SpinWheelGames',
    description:
      'Get in touch with the SpinWheelGames engineering and editorial team for bug reports, custom wheel suggestions, classroom support, and feedback.',
    images: ['https://spinwheelgames.org/spinwheel.webp']
  }
};

export default function ContactLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
