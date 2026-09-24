import { WheelConfig, COLOR_PALETTES } from './presets';
import { sanitizeTitle, sanitizeWheelItems, sanitizeString } from './security';

/**
 * Encodes a wheel into an ultra-compact string (e.g. Title~Item1,Item2,Item3~theme)
 */
export function encodeCompactWheel(wheel: WheelConfig): string {
  try {
    const title = wheel.title || 'Custom Wheel';
    const items = (wheel.items || []).map((i) => i.text.replace(/[:|~,]/g, ' ')).join(',');
    const theme = wheel.themeKey || 'arcade';
    const compactStr = `${title}~${items}~${theme}`;
    return encodeURIComponent(btoa(encodeURIComponent(compactStr)));
  } catch {
    return '';
  }
}

/**
 * Decodes an ultra-compact string into a full WheelConfig
 */
export function decodeCompactWheel(compactEncoded: string): WheelConfig | null {
  if (!compactEncoded) return null;
  try {
    const raw = decodeURIComponent(atob(decodeURIComponent(compactEncoded)));
    const parts = raw.split('~');
    if (parts.length < 2) return null;

    const title = sanitizeTitle(parts[0], 'Shared Wheel');
    const itemStrings = parts[1].split(',').filter(Boolean);
    const themeKey = sanitizeString(parts[2] || 'arcade');

    const items = sanitizeWheelItems(itemStrings);
    if (items.length < 2) return null;

    return {
      id: `shared-compact-${Date.now().toString(36)}`,
      title,
      category: 'Shared',
      description: 'Custom shared spin wheel',
      items,
      themeKey,
      palette: COLOR_PALETTES[themeKey]?.colors || COLOR_PALETTES.arcade.colors
    };
  } catch {
    return null;
  }
}

/**
 * Obtains or generates a clean short share URL for a given wheel
 */
export async function getShortShareUrl(wheel: WheelConfig): Promise<string> {
  const baseUrl = typeof window !== 'undefined'
    ? window.location.origin
    : 'https://spinwheelgames.org';

  if (wheel.id.startsWith('preset-')) {
    return `${baseUrl}/?preset=${wheel.id}`;
  }

  try {
    const res = await fetch('/api/share', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: wheel.title,
        category: wheel.category,
        items: wheel.items.map((i) => ({ text: i.text, weight: i.weight, color: i.color })),
        themeKey: wheel.themeKey
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (data?.shortUrl) {
        return data.shortUrl;
      }
      if (data?.shortCode) {
        return `${baseUrl}/w/${data.shortCode}`;
      }
    }
  } catch {
    // API failed, fallback to compact link
  }

  // Fallback to ultra-compact encoding if API call fails
  const compact = encodeCompactWheel(wheel);
  return compact ? `${baseUrl}/?c=${compact}` : `${baseUrl}/`;
}

/**
 * Fetches wheel configuration by short code
 */
export async function fetchWheelByShortCode(shortCode: string): Promise<WheelConfig | null> {
  if (!shortCode) return null;
  try {
    const res = await fetch(`/api/share/${encodeURIComponent(shortCode)}`);
    if (!res.ok) return null;

    const data = await res.json();
    if (!data?.wheel) return null;

    const raw = data.wheel;
    const title = sanitizeTitle(raw.title, 'Shared Wheel');
    const items = sanitizeWheelItems(raw.items || []);
    if (items.length < 2) return null;

    const themeKey = sanitizeString(raw.themeKey || raw.paletteKey || 'arcade');

    return {
      id: `shared-${shortCode}`,
      title,
      category: sanitizeString(raw.category || 'Shared'),
      description: 'Shared spin wheel',
      items,
      themeKey,
      palette: COLOR_PALETTES[themeKey]?.colors || COLOR_PALETTES.arcade.colors
    };
  } catch {
    return null;
  }
}
