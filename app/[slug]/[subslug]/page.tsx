import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSeoPageByPath, ALL_SEO_PAGES_LIST } from '@/lib/seoData';
import SeoPageView from '@/components/SeoPageView';
import { createPageMetadata } from '@/lib/pageMetadata';

export const dynamic = 'force-static';
export const dynamicParams = true;



interface PageProps {
  params: Promise<{
    slug: string;
    subslug: string;
  }>;
}

export async function generateStaticParams() {
  // Only 2-segment routes (e.g. /food-wheel/dinner)
  return ALL_SEO_PAGES_LIST.filter((p) => {
    const parts = p.fullPath.split('/').filter(Boolean);
    return parts.length === 2;
  }).map((p) => {
    const parts = p.fullPath.split('/').filter(Boolean);
    return {
      slug: parts[0],
      subslug: parts[1]
    };
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, subslug } = await params;
  const path = `/${slug}/${subslug}`;
  const page = getSeoPageByPath(path);

  if (!page) {
    return createPageMetadata({
      title: 'Page Not Found | SpinWheelGames',
      description: 'The requested sub-wheel page could not be found.',
      path
    });
  }

  return createPageMetadata({
    title: page.title,
    description: page.metaDescription,
    path: page.fullPath
  });
}

export default async function DynamicSubpage({ params }: PageProps) {
  const { slug, subslug } = await params;
  const path = `/${slug}/${subslug}`;
  const page = getSeoPageByPath(path);

  if (!page) {
    notFound();
  }

  return <SeoPageView page={page} />;
}
