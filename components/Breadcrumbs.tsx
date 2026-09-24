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
  if (!items) return null;

  // Filter out any 'Home' item passed in items so Home is never duplicated
  const filteredItems = items.filter(
    (item) => item.label.toLowerCase().trim() !== 'home' && item.href !== '/'
  );

  if (filteredItems.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center flex-wrap gap-1.5 text-xs text-slate-500 dark:text-slate-400 py-1 ${className}`}
    >
      <Link
        href="/"
        className="inline-flex items-center gap-1 hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>

      {filteredItems.map((item, index) => {
        const isLast = index === filteredItems.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0" />
            {isLast || !item.href ? (
              <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-none">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-[#4648d4] dark:hover:text-[#8587ff] transition-colors truncate max-w-[150px] sm:max-w-none"
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
