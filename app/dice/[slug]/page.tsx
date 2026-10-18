import React from 'react';
import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { DIE_PAGE_CONFIGS } from '@/components/dice/diePageConfigs';
import DedicatedDiePageComponent from '@/components/dice/DedicatedDiePageComponent';
import Navbar from '@/components/Navbar';
import DiceNavigation from '@/components/dice/DiceNavigation';
import Footer from '@/components/Footer';
import { createPageMetadata } from '@/lib/pageMetadata';

export const dynamic = 'force-static';
export const dynamicParams = true;



interface DiceSlugPageProps {
  params: Promise<{ slug: string }>;
}

const SUPPORTED_DICE = ['d2', 'd4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'];

export async function generateStaticParams() {
  return SUPPORTED_DICE.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: DiceSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const normalizedSlug = slug.toLowerCase();

  if (normalizedSlug === '4d6') {
    return createPageMetadata({
      title: 'Roll 4d6 Drop Lowest D&D Stat Roller | SpinWheelGames',
      description: 'Roll 4d6 and drop the lowest die for D&D 5e ability scores with 3D physics and cryptographic fairness.',
      path: '/roll-4d6'
    });
  }

  const config = DIE_PAGE_CONFIGS[normalizedSlug];

  if (!config) {
    return createPageMetadata({
      title: 'Online 3D Dice Roller | SpinWheelGames',
      description: 'Free interactive 3D virtual dice roller with rigid-body physics, realistic bounces, and cryptographic fairness.',
      path: `/dice/${normalizedSlug}`
    });
  }

  return createPageMetadata({
    title: config.metaTitle,
    description: config.metaDescription,
    path: `/dice/${normalizedSlug}`,
    keywords: config.primaryKeywords,
    imageAlt: `${config.name} 3D Online Dice Roller`
  });
}

export default async function DiceSlugPage({ params }: DiceSlugPageProps) {
  const { slug } = await params;
  const normalizedSlug = slug.toLowerCase();



  if (normalizedSlug === '4d6') {
    permanentRedirect('/roll-4d6');
  }

  const config = DIE_PAGE_CONFIGS[normalizedSlug];

  if (!config) {
    notFound();
  }

  const canonicalUrl = `https://spinwheelgames.org/dice/${normalizedSlug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: `${config.name} 3D Virtual Dice Roller`,
        url: canonicalUrl,
        applicationCategory: 'GameApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires WebGL and modern HTML5 canvas support',
        softwareVersion: '2.1',
        description: config.metaDescription,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '1420',
          bestRating: '5',
          worstRating: '1'
        },
        featureList: [
          'Realistic 3D rigid-body dice physics simulation',
          'Cryptographically secure random number generation (CSPRNG)',
          'Instant sum totals with custom flat modifiers',
          'Discrete probability distribution and odds breakdown',
          '360-degree interactive dice face inspector viewer',
          'Full-screen roll arena with felt sound effects'
        ],
        screenshot: 'https://spinwheelgames.org/spinwheel-logo.webp'
      },
      {
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
            name: 'Dice Roller',
            item: 'https://spinwheelgames.org/dice-roller'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: config.name,
            item: canonicalUrl
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-slate-50 dark:bg-[#07080c] text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
        <Navbar />

        {/* Dice Hub Scrollable Tabs */}
        <div className="pt-16 sm:pt-18 lg:pt-20 w-full max-w-full overflow-x-clip">
          <DiceNavigation currentPath={`/dice/${normalizedSlug}`} />
        </div>

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DedicatedDiePageComponent config={config} />
        </main>
        <Footer />
      </div>
    </>
  );
}
