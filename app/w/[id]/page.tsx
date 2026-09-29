import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getWheelShare } from '@/lib/shortCodeStore';
import { ALL_SEO_PAGES_MAP } from '@/lib/seoData';

export const dynamic = 'force-static';




interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const shortCode = resolvedParams.id;
  
  if (ALL_SEO_PAGES_MAP[shortCode]) {
    const page = ALL_SEO_PAGES_MAP[shortCode];
    return {
      title: page.title,
      description: page.metaDescription,
      alternates: {
        canonical: `https://spinwheelgames.org/${shortCode}`
      }
    };
  }

  const wheelData = getWheelShare(shortCode);

  if (wheelData) {
    const title = `${wheelData.title} - Spin Wheel Games`;
    const description = `Spin the interactive ${wheelData.title} custom wheel with ${wheelData.items.length} options! Safe, fair, and instant random decision maker.`;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'website'
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description
      }
    };
  }

  return {
    title: 'Shared Spin Wheel - SpinWheelGames.org',
    description: 'Spin interactive custom decision wheels on SpinWheelGames.org'
  };
}

export default async function SharedWheelPage({ params }: PageProps) {
  const resolvedParams = await params;
  const shortCode = resolvedParams.id;

  // If this ID matches a built-in game/SEO wheel page, redirect to its dedicated URL
  if (ALL_SEO_PAGES_MAP[shortCode]) {
    redirect(`/${shortCode}`);
  }
  
  // Otherwise redirect to main homepage with the short code parameter
  redirect(`/?s=${encodeURIComponent(shortCode)}`);
}
