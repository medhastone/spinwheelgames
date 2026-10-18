import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';
import { createPageMetadata } from '@/lib/pageMetadata';

export const dynamic = 'force-static';

export const metadata: Metadata = createPageMetadata({
  title: 'All Wheel Categories & Random Pickers | SpinWheelGames',
  description: 'Explore all interactive spin wheel categories, random pickers, and decision tools on SpinWheelGames.org.',
  path: '/categories'
});

export default function CategoryRootRedirect() {
  permanentRedirect('/categories');
}
