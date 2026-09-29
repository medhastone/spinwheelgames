import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DIE_PAGE_CONFIGS } from '@/components/dice/diePageConfigs';
import DedicatedDiePageComponent from '@/components/dice/DedicatedDiePageComponent';
import Navbar from '@/components/Navbar';
import DiceNavigation from '@/components/dice/DiceNavigation';
import Footer from '@/components/Footer';

export const dynamic = 'force-static';



export const metadata: Metadata = {
  title: 'Roll 1d4 Online 3D - 4-Sided Pyramid Die Roller | SpinWheel',
  description:
    'Roll a 4-sided D4 pyramid die online with realistic 3D WebGL tumbling physics. Ideal for D&D Magic Missile, healing potions, dagger attacks, and live probability calculations.',
  keywords: [
    'roll 1d4',
    'roll d4',
    'd4 roller',
    '4 sided die roller',
    'four sided dice roller',
    'virtual d4',
    'd4 roll online',
    'roll 4 sided dice',
    'magic missile dice'
  ],
  alternates: {
    canonical: 'https://spinwheelgames.org/roll-1d4'
  },
  openGraph: {
    title: 'Roll 1d4 Online 3D - 4-Sided Pyramid Die Roller | SpinWheel',
    description:
      'Roll a 4-sided D4 pyramid die online with realistic 3D WebGL tumbling physics. Ideal for D&D Magic Missile, healing potions, and dagger attacks.',
    url: 'https://spinwheelgames.org/roll-1d4',
    siteName: 'SpinWheelGames',
    type: 'website',
    images: [
      {
        url: 'https://spinwheelgames.org/spinwheel-logo.webp',
        width: 1200,
        height: 630,
        alt: '4-Sided D4 Pyramid Die 3D Online Roller'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roll 1d4 Online 3D - 4-Sided Pyramid Die Roller | SpinWheel',
    description:
      'Roll a 4-sided D4 pyramid die online with realistic 3D WebGL tumbling physics. Ideal for D&D Magic Missile, healing potions, and dagger attacks.',
    images: ['https://spinwheelgames.org/spinwheel-logo.webp']
  }
};

export default function Roll1d4Page() {
  const config = DIE_PAGE_CONFIGS['d4'];

  if (!config) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: '3D 1d4 Dice Roller Online',
        url: 'https://spinwheelgames.org/roll-1d4',
        applicationCategory: 'GameApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires WebGL and JavaScript',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        featureList: [
          'Interactive 3D WebGL physics tumbling simulation',
          'Automatic face detection and score calculation',
          'Preset rolls for Magic Missile (3d4+3) and Healing Potions (2d4+2)',
          'Cryptographically secure random number generation'
        ]
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://spinwheelgames.org/'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Dice Roller',
            item: 'https://spinwheelgames.org/dice-roller'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Roll 1d4',
            item: 'https://spinwheelgames.org/roll-1d4'
          }
        ]
      },
      ...(config.faqs && config.faqs.length > 0
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: config.faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer
                }
              }))
            }
          ]
        : [])
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07080c] text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <div className="pt-20 sm:pt-22 lg:pt-24 sticky top-0 z-40">
        <DiceNavigation currentPath="/roll-1d4" />
      </div>

      <main className="flex-1">
        <DedicatedDiePageComponent config={config} />
      </main>

      <Footer />
    </div>
  );
}
