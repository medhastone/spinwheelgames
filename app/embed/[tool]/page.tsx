import React from 'react';
import type { Metadata } from 'next';
import MinimalEmbedWheel from '@/components/embed/MinimalEmbedWheel';
import { resolveToolWheelConfig } from '@/lib/viralToolsData';
import { ALL_SEO_PAGES_LIST } from '@/lib/seoData';
import { createPageMetadata } from '@/lib/pageMetadata';

export const dynamic = 'force-static';
export const dynamicParams = true;

const CORE_EMBED_TOOLS = [
  'spin-wheel',
  'wheel-of-names',
  'food-wheel',
  'number-wheel',
  'team-generator',
  'bingo-wheel',
  'animal-wheel',
  'classroom-wheel',
  'drawing-wheel',
  'question-wheel',
  'random-object-generator',
  'song-wheel',
  'theme-wheel',
  'color-wheel',
  'truth-or-dare-wheel',
  'comment-picker',
  'random-game-picker',
  'birthday-wheel',
  'random-category-generator',
  'word-spinner',
  'pokemon-wheel',
  'random-app-picker',
  'movie-wheel',
  'giveaway-wheel',
  'decision-wheel',
  'yes-or-no-wheel',
  'dice-roller',
  'd20',
  'd6',
  'd4',
  'd8',
  'd10',
  'd12',
  'd100',
  'roll-4d6'
];

export async function generateStaticParams() {
  const slugs = new Set<string>(CORE_EMBED_TOOLS);
  for (const p of ALL_SEO_PAGES_LIST) {
    if (!p.fullPath.includes('/', 1) && p.slug) {
      slugs.add(p.slug);
    }
  }
  return Array.from(slugs).map((tool) => ({ tool }));
}

interface EmbedToolPageProps {
  params: Promise<{ tool: string }>;
}

export async function generateMetadata({ params }: EmbedToolPageProps): Promise<Metadata> {
  const { tool } = await params;
  const resolved = resolveToolWheelConfig(tool);
  const title = `${resolved.title} – Embed Widget | SpinWheelGames`;
  const description = `Lightweight, responsive embeddable ${resolved.title} widget (${resolved.items.length} options) powered by SpinWheelGames.org Web Crypto CSPRNG.`;

  const base = createPageMetadata({
    title,
    description,
    path: resolved.canonicalPath || `/${tool}`
  });

  return {
    ...base,
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

export default async function EmbedToolPage({ params }: EmbedToolPageProps) {
  const { tool } = await params;
  return <MinimalEmbedWheel toolSlug={tool} />;
}
