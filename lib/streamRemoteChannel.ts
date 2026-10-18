'use client';

import type { StreamRemoteCommand } from '@/app/api/stream-session/route';

export type { StreamRemoteCommand };

/**
 * Sends a command from /stream-control to the active Streamer Mode overlay (?stream=1&id=<session>).
 * Uses BroadcastChannel + localStorage for instant 0ms same-browser delivery AND
 * POSTs to /api/stream-session so OBS Studio's embedded CEF Browser Source or a mobile phone
 * can control the overlay in real time.
 */
export async function sendStreamRemoteCommand(
  sessionId: string,
  action: StreamRemoteCommand['action'],
  payload?: StreamRemoteCommand['payload']
): Promise<boolean> {
  const cleanId = sessionId.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 32);
  if (!cleanId) return false;

  const localCmd: StreamRemoteCommand = {
    seq: Date.now(),
    action,
    timestamp: Date.now(),
    payload
  };

  // 1. Instant same-browser BroadcastChannel
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    try {
      const bc = new BroadcastChannel(`swg_stream_${cleanId}`);
      bc.postMessage({ type: 'command', command: localCmd });
      bc.close();
    } catch {
      // Ignore
    }
  }

  // 2. Instant same-browser localStorage event fallback
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(
        `swg_stream_cmd_${cleanId}`,
        JSON.stringify(localCmd)
      );
    } catch {
      // Ignore
    }
  }

  // 3. Server-side session relay for OBS Browser Source (CEF) & cross-device control
  try {
    const res = await fetch('/api/stream-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: cleanId,
        action,
        payload
      })
    });
    return res.ok;
  } catch {
    return true;
  }
}

/**
 * Reports the latest winner/roll outcome from the overlay back to the remote control tab.
 */
export async function reportStreamWinner(
  sessionId: string,
  winnerText: string
): Promise<void> {
  const cleanId = sessionId.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 32);
  if (!cleanId) return;

  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    try {
      const bc = new BroadcastChannel(`swg_stream_${cleanId}`);
      bc.postMessage({ type: 'winner', winner: winnerText, timestamp: Date.now() });
      bc.close();
    } catch {
      // Ignore
    }
  }

  try {
    await fetch('/api/stream-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: cleanId,
        action: 'report-winner',
        winner: winnerText
      })
    });
  } catch {
    // Ignore
  }
}

/**
 * Subscribes an overlay (?stream=1&id=<session>) to incoming remote commands.
 */
export function subscribeToStreamRemoteCommands(
  sessionId: string,
  onCommand: (cmd: StreamRemoteCommand) => void
): () => void {
  const cleanId = sessionId.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 32);
  if (!cleanId || typeof window === 'undefined') {
    return () => {};
  }

  let lastProcessedTimestamp = Date.now() - 500;
  let lastServerSeq = -1;
  let active = true;

  const handleIncoming = (cmd: StreamRemoteCommand) => {
    if (!cmd || !cmd.action) return;
    if (cmd.timestamp <= lastProcessedTimestamp) return;
    lastProcessedTimestamp = cmd.timestamp;
    onCommand(cmd);
  };

  // 1. BroadcastChannel listener
  let bc: BroadcastChannel | null = null;
  if ('BroadcastChannel' in window) {
    try {
      bc = new BroadcastChannel(`swg_stream_${cleanId}`);
      bc.onmessage = (ev) => {
        if (ev.data?.type === 'command' && ev.data.command) {
          handleIncoming(ev.data.command);
        }
      };
    } catch {
      bc = null;
    }
  }

  // 2. localStorage storage event listener
  const storageKey = `swg_stream_cmd_${cleanId}`;
  const onStorage = (ev: StorageEvent) => {
    if (ev.key === storageKey && ev.newValue) {
      try {
        const parsed = JSON.parse(ev.newValue) as StreamRemoteCommand;
        handleIncoming(parsed);
      } catch {
        // Ignore
      }
    }
  };
  window.addEventListener('storage', onStorage);

  // 3. Lightweight server poll for OBS CEF / cross-device commands (every 900ms)
  const pollServer = async () => {
    if (!active) return;
    try {
      const res = await fetch(`/api/stream-session?id=${encodeURIComponent(cleanId)}`, {
        cache: 'no-store'
      });
      if (!res.ok) return;
      const data = await res.json();
      if (lastServerSeq === -1) {
        // Initialize baseline sequence on first poll
        lastServerSeq = typeof data.seq === 'number' ? data.seq : 0;
        return;
      }
      if (typeof data.seq === 'number' && data.seq > lastServerSeq && data.lastCommand) {
        lastServerSeq = data.seq;
        handleIncoming(data.lastCommand);
      }
    } catch {
      // Ignore network hiccups
    }
  };

  pollServer();
  const intervalId = window.setInterval(pollServer, 900);

  return () => {
    active = false;
    window.clearInterval(intervalId);
    window.removeEventListener('storage', onStorage);
    if (bc) {
      try {
        bc.close();
      } catch {
        // Ignore
      }
    }
  };
}
