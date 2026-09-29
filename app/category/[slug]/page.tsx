import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { ALL_SEO_PAGES_MAP, getSeoPageByPath, ALL_SEO_PAGES_LIST } from '@/lib/seoData';
import SeoPageView from '@/components/SeoPageView';

export const dynamic = 'force-static';
export const dynamicParams = false;



interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return ALL_SEO_PAGES_LIST.filter((p) => p.pageType === 'category').map(
    (p) => ({
      slug: p.slug
    })
  );
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = ALL_SEO_PAGES_MAP[slug];

  if (!page) {
    return {
      title: 'Category Not Found | SpinWheelGames',
      description: 'The requested category could not be found.'
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

export default async function CategorySubPage({ params }: PageProps) {
  const { slug } = await params;
  const page = ALL_SEO_PAGES_MAP[slug];

  if (!page) {
    notFound();
  }

  return <SeoPageView page={page} />;
}
