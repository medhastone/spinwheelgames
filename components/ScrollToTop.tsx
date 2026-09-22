'use client';

import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export default function ScrollToTop() {
  const [canScroll, setCanScroll] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      if (scrollHeight > 120) {
        setCanScroll(true);
        const progress = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
        setScrollProgress(progress);
        setIsAtTop(scrollTop < 80);
        setIsAtBottom(scrollTop + 80 >= scrollHeight);
      } else {
        setCanScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  if (!canScroll) return null;

  return (
    <div
      id="scroll-navigation-controls"
      className="fixed bottom-6 right-5 sm:bottom-8 sm:right-7 z-50 flex flex-col items-center gap-1.5 p-1 rounded-2xl bg-white/90 dark:bg-[#181922]/90 backdrop-blur-md shadow-[0_4px_24px_rgba(70,72,212,0.18)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.6)] border border-[#eeedf7] dark:border-[#292a39] animate-in fade-in zoom-in-95 duration-200"
    >
      {/* Scroll to Top Button */}
      <button
        id="scroll-to-top-btn"
        type="button"
        onClick={scrollToTop}
        disabled={isAtTop}
        aria-label="Scroll to top of page"
        title="Scroll to top"
        className={`group relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4648d4] ${
          isAtTop
            ? 'opacity-35 cursor-not-allowed text-[#767586] dark:text-[#908fa1]'
            : 'text-[#4648d4] dark:text-[#8587ff] hover:bg-[#4648d4] hover:text-white dark:hover:bg-[#4648d4] dark:hover:text-white active:scale-95'
        }`}
      >
        <ChevronUp className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
        <span className="sr-only">Scroll to top</span>
      </button>

      {/* Mini Progress Indicator Divider */}
      <div
        className="w-5 h-[3px] rounded-full bg-[#eeedf7] dark:bg-[#292a39] overflow-hidden my-0.5"
        title={`Page scroll: ${Math.round(scrollProgress)}%`}
      >
        <div
          className="h-full bg-[#4648d4] dark:bg-[#8587ff] transition-all duration-150 rounded-full"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Scroll to Bottom Button */}
      <button
        id="scroll-to-bottom-btn"
        type="button"
        onClick={scrollToBottom}
        disabled={isAtBottom}
        aria-label="Scroll to bottom of page"
        title="Scroll to bottom"
        className={`group relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4648d4] ${
          isAtBottom
            ? 'opacity-35 cursor-not-allowed text-[#767586] dark:text-[#908fa1]'
            : 'text-[#4648d4] dark:text-[#8587ff] hover:bg-[#4648d4] hover:text-white dark:hover:bg-[#4648d4] dark:hover:text-white active:scale-95'
        }`}
      >
        <ChevronDown className="w-5 h-5 transition-transform duration-200 group-hover:translate-y-0.5" />
        <span className="sr-only">Scroll to bottom</span>
      </button>
    </div>
  );
}
