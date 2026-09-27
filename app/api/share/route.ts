import { NextRequest, NextResponse } from 'next/server';
import { generateShortCode, saveWheelShare, StoredWheel } from '@/lib/shortCodeStore';
import { sanitizeTitle, sanitizeWheelItems, sanitizeString } from '@/lib/security';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const title = sanitizeTitle(body.title, 'Shared Wheel');
    const items = sanitizeWheelItems(body.items || []);
    if (items.length < 2) {
      return NextResponse.json({ error: 'At least 2 valid options are required' }, { status: 400 });
    }

    const themeKey = sanitizeString(body.themeKey || body.paletteKey || 'arcade');
    const category = sanitizeString(body.category || 'Shared');

    const storedData: StoredWheel = {
      title,
      category,
      items: items.map((i) => ({ text: i.text, weight: i.weight, color: i.color })),
      themeKey
    };

    const shortCode = generateShortCode(storedData);
    saveWheelShare(shortCode, storedData);

    const origin = req.headers.get('origin') || req.headers.get('host') || '';
    const protocol = req.headers.get('x-forwarded-proto') || 'https';
    const baseUrl = origin.startsWith('http') ? origin : `${protocol}://${origin}`;

    const shortUrl = `${baseUrl}/w/${shortCode}`;

    return NextResponse.json({
      success: true,
      shortCode,
      shortUrl,
      wheel: storedData
    });
  } catch {
    return NextResponse.json({ error: 'Failed to process short link' }, { status: 500 });
  }
}
