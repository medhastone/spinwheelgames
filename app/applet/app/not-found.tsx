import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#07080c] text-slate-900 dark:text-slate-100 p-4 text-center">
      <h1 className="text-6xl font-black mb-4 text-[#4648d4] dark:text-[#8587ff]">404</h1>
      <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
      <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md">
        The page or dice roller you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-[#4648d4] text-white font-bold hover:bg-[#3b3dbb] transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
