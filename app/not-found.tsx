import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { createPageMetadata } from '@/lib/pageMetadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Page Not Found (404) | SpinWheelGames',
  description: 'The requested spin wheel or dice roller page could not be found. Explore 145+ free interactive wheels and randomizers on SpinWheelGames.org.',
  path: '/404'
});

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8ff] dark:bg-[#0c0d14] text-[#1a1b22] dark:text-[#eeedf7]">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-24 pb-16 text-center">
        <h1 className="text-6xl font-black mb-4 text-[#4648d4] dark:text-[#8587ff]">404</h1>
        <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
        <p className="text-[#464554] dark:text-[#c7c4d7] mb-6 max-w-md">
          The page or dice roller you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-[#4648d4] text-white font-bold hover:bg-[#3b3dbb] transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/games"
            className="px-6 py-3 rounded-xl bg-[#eeedf7] dark:bg-[#1d1e28] text-[#1a1b22] dark:text-white font-bold hover:bg-[#e3e1ec] dark:hover:bg-[#292a39] transition-colors"
          >
            Browse All Wheels
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
