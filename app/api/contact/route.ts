import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, company, honeypot } = body;

    // Honeypot spam protection
    if (honeypot) {
      // Silently accept bots without doing work
      return NextResponse.json({ success: true, message: 'Message received' });
    }

    // Input validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Name must be at least 2 characters long' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json({ error: 'Message must be at least 10 characters long' }, { status: 400 });
    }

    // Safe sanitized logging
    console.log(`[Contact Form Received] From: ${name.trim()} <${email.trim()}> (Company: ${company || 'N/A'}) - Length: ${message.trim().length} chars`);

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been transmitted successfully.'
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while transmitting your message.' },
      { status: 500 }
    );
  }
}
