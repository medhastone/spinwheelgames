'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  // Filter out any 'Home' item passed in items so Home is never duplicated
  const filteredItems = items.filter(
    (item) => item.label.toLowerCase().trim() !== 'home' && item.href !== '/'
  );

  return (
    <nav
      aria-label="Breadcrumbs"
      className={`relative z-10 flex items-center flex-wrap gap-1.5 text-xs sm:text-sm font-medium py-1.5 px-3.5 rounded-xl bg-slate-200/70 dark:bg-[#181924]/90 backdrop-blur-md border border-slate-300/60 dark:border-slate-800/80 w-fit max-w-full shadow-xs mt-3 sm:mt-4 mb-3 sm:mb-4 ${className}`}
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
  );
}
