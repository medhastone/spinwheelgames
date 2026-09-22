/**
 * Security & Input Validation Utilities for SpinWheelGames.org
 * Protects against XSS, script injection, oversized payloads, and malformed state.
 */

import { WheelConfig, WheelItem, COLOR_PALETTES } from './presets';

// Maximum size constraints to prevent memory exhaustion / DoS
export const MAX_ITEM_LABEL_LENGTH = 120;
export const MAX_ITEMS_COUNT = 500;
export const MAX_TITLE_LENGTH = 100;
export const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB limit for CSV/JSON imports

/**
 * Strips dangerous HTML, script tags, event handlers, and data/javascript URIs
 */
export function sanitizeString(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '') // Strip HTML tags
    .replace(/javascript:/gi, '')
    .replace(/data:text\/html/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/on\w+\s*=/gi, '') // Strip inline event handlers like onerror=, onclick=
    .trim()
    .slice(0, MAX_ITEM_LABEL_LENGTH);
}

/**
 * Sanitizes wheel title safely
 */
export function sanitizeTitle(title: unknown, fallback = 'Custom Random Wheel'): string {
  if (typeof title !== 'string') return fallback;
  const clean = sanitizeString(title).slice(0, MAX_TITLE_LENGTH);
  return clean || fallback;
}

/**
 * Validates a hex color string or returns safe fallback
 */
export function sanitizeHexColor(color: unknown, fallback = '#4648d4'): string {
  if (typeof color !== 'string') return fallback;
  const hexMatch = color.trim().match(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);
  return hexMatch ? hexMatch[0] : fallback;
}

/**
 * Validates and sanitizes a list of WheelItems
 */
export function sanitizeWheelItems(rawItems: unknown[]): WheelItem[] {
  if (!Array.isArray(rawItems)) return [];

  const validItems: WheelItem[] = [];
  const limit = Math.min(rawItems.length, MAX_ITEMS_COUNT);

  for (let i = 0; i < limit; i++) {
    const raw = rawItems[i];
    if (!raw) continue;

    let text = '';
    let weight = 1;
    let color: string | undefined;

    if (typeof raw === 'string') {
      text = sanitizeString(raw);
    } else if (typeof raw === 'object' && raw !== null) {
      const itemObj = raw as Record<string, unknown>;
      text = sanitizeString(itemObj.text || itemObj.label || itemObj.name || '');
      const rawWeight = Number(itemObj.weight);
      if (!isNaN(rawWeight) && rawWeight > 0 && rawWeight <= 1000) {
        weight = Math.round(rawWeight * 10) / 10;
      }
      if (itemObj.color && typeof itemObj.color === 'string') {
        color = sanitizeHexColor(itemObj.color);
      }
    }

    if (text) {
      validItems.push({
        id: `item-${i}-${Date.now().toString(36)}`,
        text,
        weight,
        ...(color ? { color } : {})
      });
    }
  }

  return validItems;
}

/**
 * Safely parses and validates encoded URL config strings
 */
export function parseSafeShareConfig(encoded: string): WheelConfig | null {
  if (!encoded || typeof encoded !== 'string' || encoded.length > 50000) {
    return null;
  }

  try {
    const decodedStr = decodeURIComponent(atob(encoded));
    const parsed = JSON.parse(decodedStr);

    if (!parsed || typeof parsed !== 'object') return null;

    const title = sanitizeTitle(parsed.title, 'Shared Wheel');
    const items = sanitizeWheelItems(parsed.items || parsed.entries || []);

    if (items.length < 2) return null;

    const themeKey = typeof parsed.paletteKey === 'string'
      ? sanitizeString(parsed.paletteKey)
      : typeof parsed.themeKey === 'string'
      ? sanitizeString(parsed.themeKey)
      : 'arcade';

    return {
      id: `shared-${Date.now().toString(36)}`,
      title,
      category: sanitizeString(parsed.category || 'Shared'),
      description: sanitizeString(parsed.description || 'Custom shared spin wheel'),
      items,
      themeKey,
      palette: COLOR_PALETTES[themeKey]?.colors || COLOR_PALETTES.arcade.colors
    };
  } catch {
    return null;
  }
}

/**
 * Validates text or CSV payload from user file uploads
 */
export function parseSafeTextEntries(rawText: string): string[] {
  if (!rawText || typeof rawText !== 'string') return [];
  if (rawText.length > MAX_FILE_SIZE_BYTES) {
    rawText = rawText.slice(0, MAX_FILE_SIZE_BYTES);
  }

  return rawText
    .split(/[\r\n,]+/)
    .map((line) => sanitizeString(line))
    .filter((line) => line.length > 0)
    .slice(0, MAX_ITEMS_COUNT);
}
