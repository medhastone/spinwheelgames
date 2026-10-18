import { NextRequest, NextResponse } from 'next/server';
import { sanitizeStreamText } from '@/lib/viralToolsData';

export interface StreamRemoteCommand {
  seq: number;
  action:
    | 'spin'
    | 'reset'
    | 'remove-winner'
    | 'clear-winner'
    | 'toggle-sound'
    | 'update-entries'
    | 'update-dice';
  timestamp: number;
  payload?: {
    title?: string;
    entries?: string[];
    sides?: number;
    count?: number;
    dropLowest?: number;
    sound?: boolean;
  };
}

interface SessionRecord {
  id: string;
  updatedAt: number;
  seq: number;
  lastCommand: StreamRemoteCommand | null;
  latestEntries?: string[];
  latestTitle?: string;
  latestDice?: { sides: number; count: number; dropLowest?: number };
  lastWinner?: string | null;
}

const SESSION_TTL_MS = 1000 * 60 * 60 * 4; // 4 hours
const MAX_SESSIONS = 1000;

const globalStore = globalThis as unknown as {
  __swgStreamSessions?: Map<string, SessionRecord>;
};

function getSessionMap(): Map<string, SessionRecord> {
  if (!globalStore.__swgStreamSessions) {
    globalStore.__swgStreamSessions = new Map<string, SessionRecord>();
  }
  return globalStore.__swgStreamSessions;
}

function cleanSessionId(raw: unknown): string {
  if (typeof raw !== 'string') return '';
  return raw.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 32);
}

function pruneExpiredSessions(store: Map<string, SessionRecord>) {
  const now = Date.now();
  for (const [key, rec] of store.entries()) {
    if (now - rec.updatedAt > SESSION_TTL_MS) {
      store.delete(key);
    }
  }
  if (store.size > MAX_SESSIONS) {
    const oldestKey = store.keys().next().value;
    if (oldestKey) store.delete(oldestKey);
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = cleanSessionId(searchParams.get('id'));
  if (!id || id.length < 4) {
    return NextResponse.json(
      { ok: false, error: 'Valid session id required' },
      { status: 400, headers: { 'X-Robots-Tag': 'noindex, nofollow' } }
    );
  }

  const store = getSessionMap();
  const record = store.get(id);

  if (!record) {
    return NextResponse.json(
      {
        ok: true,
        id,
        seq: 0,
        lastCommand: null
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'X-Robots-Tag': 'noindex, nofollow'
        }
      }
    );
  }

  return NextResponse.json(
    {
      ok: true,
      id: record.id,
      seq: record.seq,
      lastCommand: record.lastCommand,
      latestEntries: record.latestEntries,
      latestTitle: record.latestTitle,
      latestDice: record.latestDice,
      lastWinner: record.lastWinner
    },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'X-Robots-Tag': 'noindex, nofollow'
      }
    }
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const id = cleanSessionId(body?.id || body?.sessionId);
    const action = body?.action;

    if (!id || id.length < 4) {
      return NextResponse.json(
        { ok: false, error: 'Valid session id required' },
        { status: 400, headers: { 'X-Robots-Tag': 'noindex, nofollow' } }
      );
    }

    const allowedActions = new Set([
      'spin',
      'reset',
      'remove-winner',
      'clear-winner',
      'toggle-sound',
      'update-entries',
      'update-dice',
      'report-winner'
    ]);

    if (!allowedActions.has(action)) {
      return NextResponse.json(
        { ok: false, error: 'Unsupported action' },
        { status: 400, headers: { 'X-Robots-Tag': 'noindex, nofollow' } }
      );
    }

    const store = getSessionMap();
    pruneExpiredSessions(store);

    const existing: SessionRecord = store.get(id) || {
      id,
      updatedAt: Date.now(),
      seq: 0,
      lastCommand: null,
      lastWinner: null
    };

    if (action === 'report-winner') {
      existing.lastWinner = sanitizeStreamText(body?.winner, 80) || null;
      existing.updatedAt = Date.now();
      store.set(id, existing);
      return NextResponse.json(
        { ok: true, id, seq: existing.seq, lastWinner: existing.lastWinner },
        { headers: { 'X-Robots-Tag': 'noindex, nofollow' } }
      );
    }

    const nextSeq = existing.seq + 1;
    const sanitizedPayload: StreamRemoteCommand['payload'] = {};

    if (body?.payload) {
      if (typeof body.payload.title === 'string') {
        sanitizedPayload.title = sanitizeStreamText(body.payload.title, 80);
        existing.latestTitle = sanitizedPayload.title;
      }
      if (Array.isArray(body.payload.entries)) {
        const cleanList = body.payload.entries
          .map((item: unknown) => sanitizeStreamText(item, 80))
          .filter((t: string) => t.length > 0)
          .slice(0, 200);
        sanitizedPayload.entries = cleanList;
        existing.latestEntries = cleanList;
      }
      if (body.payload.sides !== undefined || body.payload.count !== undefined) {
        const sides = Math.max(2, Math.min(100, Number(body.payload.sides) || 20));
        const count = Math.max(1, Math.min(20, Number(body.payload.count) || 1));
        const dropLowest = Math.max(0, Math.min(count - 1, Number(body.payload.dropLowest) || 0));
        sanitizedPayload.sides = sides;
        sanitizedPayload.count = count;
        sanitizedPayload.dropLowest = dropLowest;
        existing.latestDice = { sides, count, dropLowest };
      }
      if (typeof body.payload.sound === 'boolean') {
        sanitizedPayload.sound = body.payload.sound;
      }
    }

    const command: StreamRemoteCommand = {
      seq: nextSeq,
      action,
      timestamp: Date.now(),
      payload: sanitizedPayload
    };

    existing.seq = nextSeq;
    existing.updatedAt = Date.now();
    existing.lastCommand = command;
    store.set(id, existing);

    return NextResponse.json(
      {
        ok: true,
        id,
        seq: nextSeq,
        command
      },
      {
        headers: {
          'Cache-Control': 'no-store',
          'X-Robots-Tag': 'noindex, nofollow'
        }
      }
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid JSON request' },
      { status: 400, headers: { 'X-Robots-Tag': 'noindex, nofollow' } }
    );
  }
}
