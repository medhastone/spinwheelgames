'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { Code2, Tv } from 'lucide-react';
import EmbedWheelModal from './EmbedWheelModal';
import StreamerSetupModal from './StreamerSetupModal';
import StreamerModeOverlay from './StreamerModeOverlay';
import {
  getActiveViralWheel,
  subscribeActiveViralWheel,
  ViralToolConfig
} from '@/lib/viralToolsData';

const NON_TOOL_PATHS = new Set([
  '/about',
  '/privacy',
  '/terms',
  '/accessibility',
  '/contact',
  '/fairness',
  '/sitemap',
  '/sitemap-directory',
  '/categories',
  '/games',
  '/stream-wheel',
  '/stream-control'
]);

export default function ViralToolsController() {
  const pathname = usePathname() || '/';
  const [embedModalOpen, setEmbedModalOpen] = useState(false);
  const [streamerSetupOpen, setStreamerSetupOpen] = useState(false);
  const [streamerModeActive, setStreamerModeActive] = useState(false);
  const [activeConfig, setActiveConfig] = useState<ViralToolConfig>(() =>
    getActiveViralWheel(pathname)
  );

  // Sync active tool wheel/dice config when pathname or custom wheel state changes
  useEffect(() => {
    setActiveConfig(getActiveViralWheel(pathname));
    const unsubscribe = subscribeActiveViralWheel(() => {
      setActiveConfig(getActiveViralWheel(pathname));
    });
    return unsubscribe;
  }, [pathname]);

  // Check URL for ?stream=1 on mount and route change, and listen for custom events
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkStreamParam = () => {
      const sp = new URLSearchParams(window.location.search);
      const isStream = sp.get('stream') === '1' || sp.get('stream') === 'true';
      setStreamerModeActive(isStream);
      setActiveConfig(getActiveViralWheel(window.location.pathname));
    };

    checkStreamParam();

    const handleOpenEmbed = () => {
      setActiveConfig(getActiveViralWheel(window.location.pathname));
      setEmbedModalOpen(true);
    };

    const handleOpenStreamerSetup = () => {
      setActiveConfig(getActiveViralWheel(window.location.pathname));
      setStreamerSetupOpen(true);
    };

    const handleEnterStreamerDirect = () => {
      setActiveConfig(getActiveViralWheel(window.location.pathname));
      setStreamerSetupOpen(false);
      setStreamerModeActive(true);
    };

    window.addEventListener('popstate', checkStreamParam);
    window.addEventListener('swg:open-embed-modal', handleOpenEmbed);
    window.addEventListener('swg:open-streamer-setup-modal', handleOpenStreamerSetup);
    window.addEventListener('swg:enter-streamer-mode', handleEnterStreamerDirect);

    return () => {
      window.removeEventListener('popstate', checkStreamParam);
      window.removeEventListener('swg:open-embed-modal', handleOpenEmbed);
      window.removeEventListener('swg:open-streamer-setup-modal', handleOpenStreamerSetup);
      window.removeEventListener('swg:enter-streamer-mode', handleEnterStreamerDirect);
    };
  }, [pathname]);

  const handleLaunchOverlayFromModal = useCallback(
    (fullOverlayUrl?: string) => {
      if (typeof window !== 'undefined') {
        if (fullOverlayUrl) {
          try {
            const parsed = new URL(fullOverlayUrl);
            window.history.replaceState(
              {},
              '',
              `${window.location.pathname}${parsed.search}`
            );
          } catch {
            const url = new URL(window.location.href);
            url.searchParams.set('stream', '1');
            window.history.replaceState({}, '', url.toString());
          }
        } else {
          const url = new URL(window.location.href);
          url.searchParams.set('stream', '1');
          window.history.replaceState({}, '', url.toString());
        }
      }
      setStreamerSetupOpen(false);
      setEmbedModalOpen(false);
      setActiveConfig(getActiveViralWheel(pathname));
      setStreamerModeActive(true);
    },
    [pathname]
  );

  const handleExitStreamerMode = useCallback(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('stream');
      window.history.replaceState({}, '', url.toString());
    }
    setStreamerModeActive(false);
  }, []);

  const isEmbedRoute = pathname.startsWith('/embed');
  const isStreamControlRoute = pathname.startsWith('/stream-control');
  const isToolRoute =
    !isEmbedRoute && !isStreamControlRoute && !NON_TOOL_PATHS.has(pathname);

  if (isEmbedRoute || isStreamControlRoute) {
    return null;
  }

  return (
    <div id="streamer-mode-portal">
      {/* Quick Viral Tools Dock (Visible on all supported wheel & dice tool pages) */}
      {isToolRoute && !streamerModeActive && (
        <div
          id="viral-tools-dock"
          className="fixed bottom-4 left-3 sm:bottom-8 sm:left-6 z-40 flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-2xl bg-white/95 dark:bg-[#181922]/95 backdrop-blur-md border border-[#eeedf7] dark:border-[#292a39] shadow-[0_4px_24px_rgba(70,72,212,0.16)]"
        >
          <button
            type="button"
            onClick={() => {
              setActiveConfig(getActiveViralWheel(pathname));
              setEmbedModalOpen(true);
            }}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-[#f4f2fd] dark:bg-[#222330] hover:bg-[#4648d4] hover:text-white dark:hover:bg-[#4648d4] text-[#1a1b22] dark:text-[#f1effa] text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
            title="Get responsive <iframe> embed code for this tool"
            aria-label="Embed tool"
          >
            <Code2 className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-[#4648d4] dark:text-[#8587ff] group-hover:text-white" />
            <span className="hidden sm:inline">Embed</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveConfig(getActiveViralWheel(pathname));
              setStreamerSetupOpen(true);
            }}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-600 text-emerald-700 dark:text-emerald-300 hover:text-white border border-emerald-500/25 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
            title="Configure OBS Studio & Streamlabs Browser Source (?stream=1)"
            aria-label="Streamer mode / OBS"
          >
            <Tv className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">Streamer mode / OBS</span>
          </button>
        </div>
      )}

      {/* Embed Modal */}
      {embedModalOpen && (
        <EmbedWheelModal
          config={activeConfig}
          onClose={() => setEmbedModalOpen(false)}
          onSwitchToStreamerMode={() => {
            setEmbedModalOpen(false);
            setStreamerSetupOpen(true);
          }}
        />
      )}

      {/* Streamer Mode / OBS Setup Modal */}
      {streamerSetupOpen && (
        <StreamerSetupModal
          config={activeConfig}
          onClose={() => setStreamerSetupOpen(false)}
          onLaunchOverlayHere={handleLaunchOverlayFromModal}
        />
      )}

      {/* Full-Screen Transparent OBS Streamer Mode (?stream=1) */}
      {streamerModeActive && (
        <StreamerModeOverlay
          config={activeConfig}
          onExit={handleExitStreamerMode}
        />
      )}
    </div>
  );
}
