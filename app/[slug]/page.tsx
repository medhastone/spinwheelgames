import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ALL_SEO_PAGES_MAP, getSeoPageByPath, ALL_SEO_PAGES_LIST } from '@/lib/seoData';
import SeoPageView from '@/components/SeoPageView';

export const dynamic = 'force-static';
export const dynamicParams = true;



interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const PHYSICAL_STATIC_ROUTES = new Set([
  'about',
  'accessibility',
  'animal-wheel',
  'bingo-wheel',
  'birthday-wheel',
  'challenges',
  'classroom-wheel',
  'comment-picker',
  'contact',
  'dice',
  'dice-average-calculator',
  'dice-collection',
  'dice-roller',
  'dnd-stat-roller',
  'drawing-wheel',
  'fairness',
  'food-wheel',
  'games',
  'movie-wheel',
  'number-wheel',
  'pokemon-wheel',
  'privacy',
  'question-wheel',
  'random-number-wheel',
  'random-object-generator',
  'random-category-generator',
  'random-game-picker',
  'roll-1d4',
  'roll-2d12',
  'roll-3d6',
  'roll-4d6',
  'roll-5d6',
  'roll-d3',
  'sitemap',
  'sitemap-directory',
  'song-wheel',
  'team-generator',
  'terms',
  'theme-wheel',
  'truth-or-dare-wheel',
  'unusual-dice',
  'wheel-of-names',
  'word-spinner',
  'categories',
  'category'
]);

export async function generateStaticParams() {
  // Only 1-segment routes that are not physical static folders
  return ALL_SEO_PAGES_LIST.filter(
    (p) => !p.fullPath.includes('/', 1) && !PHYSICAL_STATIC_ROUTES.has(p.slug)
  ).map((p) => ({
    slug: p.slug
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = ALL_SEO_PAGES_MAP[slug];

  if (!page) {
    return {
      title: 'Page Not Found | SpinWheelGames',
      description: 'The requested wheel page could not be found.'
    };
  }

  const canonicalUrl = `https://spinwheelgames.org${page.fullPath}`;

  return {
    title: page.title,
    description: page.metaDescription,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url: canonicalUrl,
      siteName: 'SpinWheelGames',
      locale: 'en_US',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.metaDescription
    }
  };
}

export default async function DynamicSeoPage({ params }: PageProps) {
  const { slug } = await params;
  const page = ALL_SEO_PAGES_MAP[slug];

  if (!page) {
    notFound();
  }

  return <SeoPageView page={page} />;
}
