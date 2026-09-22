'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sun, Moon, Sparkles, Menu, X } from 'lucide-react';
import {
  subscribeTheme,
  getThemeSnapshot,
  getThemeServerSnapshot,
  toggleTheme,
  applySavedTheme
} from '@/lib/theme';

export default function SubpageHeader({ activePage }: { activePage?: string }) {
  const isDark = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getThemeServerSnapshot);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    applySavedTheme();
  }, [isDark]);

  const toggleDarkMode = () => {
    toggleTheme();
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/classroom', label: 'Classroom' },
    { href: '/about', label: 'About' },
    { href: '/accessibility', label: 'Accessibility' },
    { href: '/contact', label: 'Contact' },
    { href: '/sitemap-directory', label: 'Sitemap' }
  ];

  return (
    <header className="sticky top-0 w-full z-50 bg-[#fbf8ff]/90 dark:bg-[#12131a]/90 backdrop-blur-xl border-b border-[#eeedf7] dark:border-[#222330] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 rounded-full overflow-hidden shadow-sm group-hover:rotate-45 transition-transform duration-300">
              <Image
                src="/logo.svg"
                alt="SpinWheelGames Logo"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-headline font-extrabold text-[18px] tracking-tight bg-gradient-to-r from-[#4648d4] via-[#6063ee] to-[#7c7fff] bg-clip-text text-transparent">
              SpinWheelGames
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activePage === link.href || (link.href !== '/' && activePage?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
                    isActive
                      ? 'bg-[#4648d4]/10 dark:bg-[#4648d4]/20 text-[#4648d4] dark:text-[#8587ff] font-semibold'
                      : 'text-[#464554] dark:text-[#c7c4d7] hover:text-[#1a1b22] dark:hover:text-white hover:bg-[#f4f2fd] dark:hover:bg-[#1d1e28]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#4648d4] text-white text-[13px] font-semibold hover:bg-[#3b3dbb] shadow-xs transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Launch Spinner
          </Link>

          <button
            type="button"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className="p-2 rounded-xl bg-[#f4f2fd] dark:bg-[#1d1e28] text-[#464554] dark:text-[#c7c4d7] hover:text-[#1a1b22] dark:hover:text-white border border-[#eeedf7] dark:border-[#292a39] transition-colors cursor-pointer"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-xl bg-[#f4f2fd] dark:bg-[#1d1e28] text-[#464554] dark:text-[#c7c4d7] border border-[#eeedf7] dark:border-[#292a39] cursor-pointer"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 border-t border-[#eeedf7] dark:border-[#222330] bg-[#fbf8ff] dark:bg-[#12131a] flex flex-col gap-1.5 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-lg text-[14px] font-medium text-[#464554] dark:text-[#c7c4d7] hover:bg-[#f4f2fd] dark:hover:bg-[#1d1e28]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="mt-2 text-center py-2.5 rounded-xl bg-[#4648d4] text-white text-[13px] font-bold shadow-xs"
          >
            Launch Interactive Spinner
          </Link>
        </div>
      )}
    </header>
  );
}
