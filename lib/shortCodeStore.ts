import fs from 'fs';
import path from 'path';

export interface StoredWheel {
  title: string;
  category?: string;
  description?: string;
  items: Array<{ text: string; weight?: number; color?: string }>;
  themeKey?: string;
  paletteKey?: string;
  created?: number;
}

const memoryStore = new Map<string, StoredWheel>();
const FILE_PATH = path.join(process.cwd(), '.shares_store.json');

// Initialize from file store if available
try {
  if (fs.existsSync(FILE_PATH)) {
    const raw = fs.readFileSync(FILE_PATH, 'utf8');
    const data = JSON.parse(raw);
    for (const [k, v] of Object.entries(data)) {
      memoryStore.set(k, v as StoredWheel);
    }
  }
} catch {
  // Ignore filesystem errors in restricted environments
}

function persistStore() {
  try {
    const obj: Record<string, StoredWheel> = {};
    memoryStore.forEach((val, key) => {
      obj[key] = val;
    });
    fs.writeFileSync(FILE_PATH, JSON.stringify(obj), 'utf8');
  } catch {
    // Ignore filesystem write failures
  }
}

/**
 * Computes a short 6-7 character hash for a given wheel
 */
export function generateShortCode(data: StoredWheel): string {
  const normalizedTitle = (data.title || 'Wheel').trim().toLowerCase();
  const normalizedItems = (data.items || []).map((i) => i.text.trim().toLowerCase()).sort().join('|');
  const palette = data.themeKey || data.paletteKey || 'arcade';
  
  const rawString = `${normalizedTitle}::${normalizedItems}::${palette}`;

  let hash = 2166136261;
  for (let i = 0; i < rawString.length; i++) {
    hash ^= rawString.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const positive = (hash >>> 0).toString(36);
  return positive.padStart(6, '0').slice(0, 7);
}

export function saveWheelShare(code: string, data: StoredWheel): void {
  memoryStore.set(code, {
    ...data,
    created: Date.now()
  });
  persistStore();
}

export function getWheelShare(code: string): StoredWheel | null {
  return memoryStore.get(code) || null;
}
