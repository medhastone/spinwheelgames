'use client';

import React, { useSyncExternalStore } from 'react';

const THEME_KEY = 'spinwheel_theme_preference';
const themeListeners = new Set<() => void>();

export function subscribeTheme(callback: () => void) {
  themeListeners.add(callback);
  const mql = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  const onChange = () => {
    callback();
  };
  mql?.addEventListener('change', onChange);
  return () => {
    themeListeners.delete(callback);
    mql?.removeEventListener('change', onChange);
  };
}

export function getThemeSnapshot(): boolean {
  if (typeof document === 'undefined') return false;
  if (document.documentElement.classList.contains('dark')) return true;
  if (document.documentElement.classList.contains('light')) return false;
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
  }
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
}

export function getThemeServerSnapshot(): boolean {
  return false;
}

export function useIsDarkTheme(): boolean {
  const [mounted, setMounted] = React.useState(false);
  const isDark = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot
  );

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? isDark : false;
}

export function toggleTheme(): boolean {
  const currentIsDark = getThemeSnapshot();
  const nextIsDark = !currentIsDark;
  
  if (typeof document !== 'undefined') {
    if (nextIsDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(THEME_KEY, nextIsDark ? 'dark' : 'light');
  }

  themeListeners.forEach((listener) => listener());
  return nextIsDark;
}

export function applySavedTheme(): void {
  if (typeof document === 'undefined') return;
  const isDark = getThemeSnapshot();
  if (isDark) {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  }
}
