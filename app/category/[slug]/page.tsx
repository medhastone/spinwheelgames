import { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { ALL_SEO_PAGES_MAP, ALL_SEO_PAGES_LIST } from '@/lib/seoData';
import SeoPageView from '@/components/SeoPageView';
import { createPageMetadata } from '@/lib/pageMetadata';

export const dynamic = 'force-static';
export const dynamicParams = true;

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
    return createPageMetadata({
      title: 'Category Not Found | SpinWheelGames',
      description: 'The requested category could not be found.',
      path: `/category/${slug}`
    });
  }

  return createPageMetadata({
    title: page.title,
    description: page.metaDescription,
    path: page.fullPath
  });
}

export default async function CategorySubPage({ params }: PageProps) {
  const { slug } = await params;
  const page = ALL_SEO_PAGES_MAP[slug];

  if (!page) {
    notFound();
  }

  if (page.fullPath && page.fullPath !== `/category/${slug}`) {
    permanentRedirect(page.fullPath);
  }

  return <SeoPageView page={page} />;
}
