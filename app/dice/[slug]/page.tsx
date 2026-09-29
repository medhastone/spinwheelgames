import React from 'react';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { DIE_PAGE_CONFIGS } from '@/components/dice/diePageConfigs';
import DedicatedDiePageComponent from '@/components/dice/DedicatedDiePageComponent';
import Navbar from '@/components/Navbar';
import DiceNavigation from '@/components/dice/DiceNavigation';
import Footer from '@/components/Footer';

export const dynamic = 'force-static';
export const dynamicParams = false;



interface DiceSlugPageProps {
  params: Promise<{ slug: string }>;
}

const SUPPORTED_DICE = ['d2', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'];

export async function generateStaticParams() {
  return SUPPORTED_DICE.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: DiceSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const normalizedSlug = slug.toLowerCase();

  if (normalizedSlug === 'd4') {
    return {
      alternates: {
        canonical: 'https://spinwheelgames.org/roll-1d4'
      }
    };
  }

  if (normalizedSlug === '4d6') {
    return {
      alternates: {
        canonical: 'https://spinwheelgames.org/roll-4d6'
      }
    };
  }

  const config = DIE_PAGE_CONFIGS[normalizedSlug];

  if (!config) {
    return {
      title: 'Online 3D Dice Roller | SpinWheelGames',
      description: 'Free interactive 3D virtual dice roller with rigid-body physics, realistic bounces, and cryptographic fairness.'
    };
  }

  const canonicalUrl = `https://spinwheelgames.org/dice/${normalizedSlug}`;

  return {
    title: config.metaTitle,
    description: config.metaDescription,
    keywords: config.primaryKeywords,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: config.metaTitle,
      description: config.metaDescription,
      url: canonicalUrl,
      siteName: 'SpinWheelGames',
      type: 'website',
      images: [
        {
          url: 'https://spinwheelgames.org/spinwheel-logo.webp',
          width: 1200,
          height: 630,
          alt: `${config.name} 3D Online Dice Roller`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: config.metaTitle,
      description: config.metaDescription,
      images: ['https://spinwheelgames.org/spinwheel-logo.webp']
    }
  };
}

export default async function DiceSlugPage({ params }: DiceSlugPageProps) {
  const { slug } = await params;
  const normalizedSlug = slug.toLowerCase();

  if (normalizedSlug === 'd4') {
    redirect('/roll-1d4');
  }

  if (normalizedSlug === '4d6') {
    redirect('/roll-4d6');
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
        <div className="pt-20 sm:pt-22 lg:pt-24 sticky top-0 z-40">
          <DiceNavigation currentPath={`/dice/${normalizedSlug}`} />
        </div>

        <main className="flex-1">
          <DedicatedDiePageComponent config={config} />
        </main>
        <Footer />
      </div>
    </>
  );
}
