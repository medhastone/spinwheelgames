'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home, Code2, Tv } from 'lucide-react';
import { openViralEmbedModal, openViralStreamerMode } from '@/lib/viralToolsData';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const NON_TOOL_BREADCRUMB_PATHS = new Set([
  '/about',
  '/privacy',
  '/terms',
  '/accessibility',
  '/contact',
  '/fairness',
  '/sitemap',
  '/sitemap-directory',
  '/categories',
  '/games'
]);

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const pathname = usePathname() || '/';
  if (!items || items.length === 0) return null;

  // Filter out any 'Home' item passed in items so Home is never duplicated
  const filteredItems = items.filter(
    (item) => item.label.toLowerCase().trim() !== 'home' && item.href !== '/'
  );

  const isToolPage = !NON_TOOL_BREADCRUMB_PATHS.has(pathname) && !pathname.startsWith('/embed');

  return (
    <div className={`w-full flex flex-wrap items-center justify-between gap-2 mt-3 sm:mt-4 mb-3 sm:mb-4 ${className}`}>
      <nav
        aria-label="Breadcrumbs"
        className="relative z-10 flex items-center flex-wrap gap-1.5 text-xs sm:text-sm font-medium py-1.5 px-3.5 rounded-xl bg-slate-200/70 dark:bg-[#181924]/90 backdrop-blur-md border border-slate-300/60 dark:border-slate-800/80 w-fit max-w-full shadow-xs"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors"
        >
          <Home className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
          <span className="font-semibold">Home</span>
        </Link>

        {filteredItems.map((item, index) => {
          const isLast = index === filteredItems.length - 1;
          return (
            <React.Fragment key={index}>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
              {isLast || !item.href ? (
                <span className="font-bold text-slate-900 dark:text-white truncate max-w-[280px] sm:max-w-none">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-slate-700 dark:text-slate-300 hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors truncate max-w-[200px] sm:max-w-none font-medium"
                >
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>

      {isToolPage && (
        <div className="flex items-center gap-1.5 z-10">
          <button
            type="button"
            onClick={() => openViralEmbedModal()}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#181924] hover:bg-[#4648d4] hover:text-white dark:hover:bg-[#4648d4] text-slate-800 dark:text-slate-200 border border-slate-300/70 dark:border-slate-800 text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer whitespace-nowrap"
            title="Get responsive <iframe> embed code for this tool"
          >
            <Code2 className="w-3.5 h-3.5 text-[#4648d4] dark:text-[#8587ff]" />
            <span>Embed</span>
          </button>

          <button
            type="button"
            onClick={() => openViralStreamerMode()}
            className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-600 text-emerald-700 dark:text-emerald-300 hover:text-white border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer whitespace-nowrap"
            title="Open full-screen transparent OBS Streamer Mode (?stream=1)"
          >
            <Tv className="w-3.5 h-3.5" />
            <span>Streamer Mode</span>
          </button>
        </div>
      )}
    </div>
  );
}

