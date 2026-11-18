import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';
import { createPageMetadata } from '@/lib/pageMetadata';

export const dynamic = 'force-static';

export const metadata: Metadata = createPageMetadata({
  title: 'Complete Wheel & Tool Directory | SpinWheelGames',
  description: 'Interactive random wheel and decision tool directory on SpinWheelGames.',
  path: '/sitemap'
});

export default function SitemapDirectoryRedirectPage() {
  permanentRedirect('/sitemap');
}
