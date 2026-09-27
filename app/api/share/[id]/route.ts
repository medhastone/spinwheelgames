import { NextRequest, NextResponse } from 'next/server';
import { getWheelShare } from '@/lib/shortCodeStore';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const shortCode = resolvedParams.id;
    if (!shortCode) {
      return NextResponse.json({ error: 'Missing short code' }, { status: 400 });
    }

    const wheelData = getWheelShare(shortCode);
    if (!wheelData) {
      return NextResponse.json({ error: 'Short link not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      shortCode,
      wheel: wheelData
    });
  } catch {
    return NextResponse.json({ error: 'Failed to retrieve short link' }, { status: 500 });
  }
}
