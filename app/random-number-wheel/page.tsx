import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';
import { createPageMetadata } from '@/lib/pageMetadata';

export const dynamic = 'force-static';

export const metadata: Metadata = createPageMetadata({
  title: 'Random Number Wheel – Pick a Number 1 to 100 | SpinWheelGames',
  description:
    'Spin the random number wheel online for any range: 1–10, 1–20, 1–50, 1–100, or custom bounds. Features picking multiple numbers, no-repeat mode, even/odd filters, and 100% fair CSPRNG.',
  path: '/number-wheel'
});

export default function RandomNumberWheelRedirectPage() {
  permanentRedirect('/number-wheel');
}
