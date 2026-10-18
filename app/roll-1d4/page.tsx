import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';
import { createPageMetadata } from '@/lib/pageMetadata';

export const dynamic = 'force-static';

export const metadata: Metadata = createPageMetadata({
  title: 'Roll 1d4 Tetrahedron Die Online | SpinWheelGames',
  description: 'Free 3D 4-sided die (d4) roller with WebGL physics and cryptographic fairness.',
  path: '/dice/d4'
});

export default function Roll1d4Page() {
  permanentRedirect('/dice/d4');
}
