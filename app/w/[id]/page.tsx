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
      },
      openGraph: {
        title: page.title,
        description: page.metaDescription,
        url: `https://spinwheelgames.org/${shortCode}`,
        siteName: 'SpinWheelGames',
        type: 'website',
        images: [
          {
            url: 'https://spinwheelgames.org/spinwheel.webp',
            width: 1200,
            height: 630,
            alt: page.title
          }
        ]
      },
      twitter: {
        card: 'summary_large_image',
        title: page.title,
        description: page.metaDescription,
        images: ['https://spinwheelgames.org/spinwheel.webp']
      }
    };
  }

  const wheelData = getWheelShare(shortCode);

  if (wheelData) {
    const title = `${wheelData.title.slice(0, 38)} | SpinWheelGames`;
    const description = `Spin the interactive ${wheelData.title} custom wheel with ${wheelData.items.length} options! Safe, fair, and instant random decision maker.`;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'website',
        images: [
          {
            url: 'https://spinwheelgames.org/spinwheel.webp',
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
        images: ['https://spinwheelgames.org/spinwheel.webp']
      }
    };
  }

  const defaultTitle = 'Shared Spin Wheel | SpinWheelGames';
  const defaultDesc = 'Spin interactive custom decision wheels on SpinWheelGames.org.';
  return {
    title: defaultTitle,
    description: defaultDesc,
    openGraph: {
      title: defaultTitle,
      description: defaultDesc,
      type: 'website',
      images: [
        {
          url: 'https://spinwheelgames.org/spinwheel.webp',
          width: 1200,
          height: 630,
          alt: defaultTitle
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: defaultTitle,
      description: defaultDesc,
      images: ['https://spinwheelgames.org/spinwheel.webp']
    }
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
