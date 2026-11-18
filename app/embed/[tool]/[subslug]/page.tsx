import React from 'react';
import type { Metadata } from 'next';
import MinimalEmbedWheel from '@/components/embed/MinimalEmbedWheel';
import { resolveToolWheelConfig } from '@/lib/viralToolsData';
import { ALL_SEO_PAGES_LIST } from '@/lib/seoData';
import { createPageMetadata } from '@/lib/pageMetadata';

export const dynamic = 'force-static';
export const dynamicParams = true;

export async function generateStaticParams() {
  return ALL_SEO_PAGES_LIST.filter((p) => {
    const parts = p.fullPath.split('/').filter(Boolean);
    return parts.length === 2;
  }).map((p) => {
    const parts = p.fullPath.split('/').filter(Boolean);
    return {
      tool: parts[0],
      subslug: parts[1]
    };
  });
}

interface EmbedSubtoolPageProps {
  params: Promise<{ tool: string; subslug: string }>;
}

export async function generateMetadata({ params }: EmbedSubtoolPageProps): Promise<Metadata> {
  const { tool, subslug } = await params;
  const combinedSlug = `${tool}/${subslug}`;
  const resolved = resolveToolWheelConfig(combinedSlug);
  const title = `${resolved.title} – Embed Widget | SpinWheelGames`;
  const description = `Lightweight, responsive embeddable ${resolved.title} widget (${resolved.items.length} options) powered by SpinWheelGames.org Web Crypto CSPRNG.`;

  const base = createPageMetadata({
    title,
    description,
    path: resolved.canonicalPath || `/${combinedSlug}`
  });

  return {
    ...base,
    alternates: {},
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false
      }
    }
  };
}

export default async function EmbedSubtoolPage({ params }: EmbedSubtoolPageProps) {
  const { tool, subslug } = await params;
  return <MinimalEmbedWheel toolSlug={`${tool}/${subslug}`} />;
}
