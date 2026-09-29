import { NextRequest, NextResponse } from 'next/server';
import { SITE_CONFIG } from '@/lib/siteConfig';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, category, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    const targetEmail = SITE_CONFIG.supportEmail;
    const subject = `[${SITE_CONFIG.brandName} Contact] ${(category || 'General').toUpperCase()} - ${name}`;

    // 1. Dispatch through FormSubmit HTTP API
    let deliveryStatus = 'queued';
    let serviceResponse: any = null;

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          _subject: subject,
          category: category || 'General',
          message: message,
          _template: 'table',
          _captcha: 'false',
          submittedAt: new Date().toISOString()
        })
      });

      if (response.ok) {        serviceResponse = await response.json();
        deliveryStatus = 'dispatched';
      } else {
        const errText = await response.text();
        console.warn('FormSubmit upstream response:', errText);
        deliveryStatus = 'failed_upstream';
      }
    } catch (err) {
      console.warn('Network call error in contact API:', err);
      deliveryStatus = 'network_error';
    }

    console.log(`[CONTACT EMAIL LOG] Recipient: ${targetEmail}`, {
      to: targetEmail,
      from: `${name} <${email}>`,
      subject,
      category,
      message,
      deliveryStatus,
      serviceResponse
    });

    return NextResponse.json({
      success: true,
      recipient: targetEmail,
      subject,
      deliveryStatus,
      message: `Your message has been processed for ${targetEmail}.`
    });
  } catch (error: any) {
    console.error('Failed to process contact submission:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while sending your message.' },
      { status: 500 }
    );
  }
}
