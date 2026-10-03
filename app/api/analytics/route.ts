import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const event = await req.json();
    if (process.env.NODE_ENV === 'development') {
      console.log('[Telemetry Ingest]', event.event, event.properties);
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
