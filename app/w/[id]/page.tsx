import React from 'react';
import { Metadata } from 'next';
import { getWheelShare } from '@/lib/shortCodeStore';
import { ALL_SEO_PAGES_MAP } from '@/lib/seoData';
import { WHEEL_PRESETS } from '@/lib/presets';
import { createPageMetadata } from '@/lib/pageMetadata';
import SubpageHeader from '@/components/SubpageHeader';
import StandaloneWheelHost from '@/components/StandaloneWheelHost';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const shortCode = resolvedParams.id;

  if (ALL_SEO_PAGES_MAP[shortCode]) {
    const page = ALL_SEO_PAGES_MAP[shortCode];
    const base = createPageMetadata({
      title: page.title,
      description: page.metaDescription,
      path: `/${shortCode}`
    });
    return {
      ...base,
      robots: {
        index: false,
        follow: false,
        googleBot: { index: false, follow: false }
      }
    };
  }

  const wheelData = getWheelShare(shortCode);

  if (wheelData) {
    const title = `${wheelData.title.slice(0, 38)} | SpinWheelGames`;
    const description = `Spin the interactive ${wheelData.title} custom wheel with ${wheelData.items.length} options! Safe, fair, and instant random decision maker.`;
    const base = createPageMetadata({
      title,
      description,
      path: '/wheel-of-names'
    });
    return {
      ...base,
      robots: {
        index: false,
        follow: false,
        googleBot: { index: false, follow: false }
      }
    };
  }

  const fallback = createPageMetadata({
    title: 'Shared Spin Wheel | SpinWheelGames',
    description: 'Spin interactive custom decision wheels on SpinWheelGames.org.',
    path: '/wheel-of-names'
  });

  return {
    ...fallback,
    robots: {
      index: false,
      follow: false,
      googleBot: { index: false, follow: false }
    }
  };
}

export default async function SharedWheelPage({ params }: PageProps) {
  const resolvedParams = await params;
  const shortCode = resolvedParams.id;

  const wheelData = getWheelShare(shortCode);
  const seoPage = ALL_SEO_PAGES_MAP[shortCode];

  const initialTitle = wheelData
    ? wheelData.title
    : seoPage
    ? seoPage.h1
    : `Custom Wheel (${shortCode})`;

  const initialItems = wheelData
    ? wheelData.items
    : seoPage
    ? (WHEEL_PRESETS.find((p) => p.id === seoPage.presetId) || WHEEL_PRESETS[0]).items
    : WHEEL_PRESETS[0].items;

  const initialPalette = wheelData?.themeKey || 'arcade';

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8ff] dark:bg-[#0c0d14] text-[#1a1b22] dark:text-[#eeedf7]">
      <SubpageHeader
        activePage={`/w/${shortCode}`}
        breadcrumbs={[{ label: initialTitle }]}
      />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-18 sm:pt-20 pb-12">
        <StandaloneWheelHost
          initialTitle={initialTitle}
          initialItems={initialItems}
          initialPalette={initialPalette}
        />
      </main>
      <Footer />
    </div>
  );
}
