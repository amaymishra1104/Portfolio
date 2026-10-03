import { NextRequest, NextResponse } from 'next/server';
import { processAIChat } from '@/lib/ai';

// Simple in-memory rate limiter per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20;

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();
    const rateData = rateLimitMap.get(ip);

    if (rateData) {
      if (now > rateData.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
      } else if (rateData.count >= MAX_REQUESTS_PER_WINDOW) {
        return NextResponse.json(
          {
            error: 'Too many requests. Please wait a moment before asking another question.',
            answer: 'Rate limit reached. Please wait a minute before querying AMAY AI again.'
          },
          { status: 429 }
        );
      } else {
        rateData.count++;
      }
    } else {
      rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    }

    const body = await req.json();
    const { query, history } = body;

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Valid query string required' },
        { status: 400 }
      );
    }

    // Limit query length to prevent buffer abuse
    const sanitizedQuery = query.slice(0, 500);

    const result = await processAIChat(sanitizedQuery, history || []);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      {
        answer: 'AMAY AI is temporarily experiencing high load. Please try asking again shortly.',
        citations: []
      },
      { status: 500 }
    );
  }
}
