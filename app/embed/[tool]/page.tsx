import React from 'react';
import type { Metadata } from 'next';
import MinimalEmbedWheel from '@/components/embed/MinimalEmbedWheel';
import { resolveToolWheelConfig } from '@/lib/viralToolsData';
import { createPageMetadata } from '@/lib/pageMetadata';

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
