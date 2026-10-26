import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

import os from 'os';

function getMessagesFilePath(): string {
  try {
    const localDir = path.join(process.cwd(), 'data');
    if (fs.existsSync(localDir)) {
      fs.accessSync(localDir, fs.constants.W_OK);
      return path.join(localDir, 'messages.json');
    }
  } catch {
    // Falls back to writable temp directory on serverless (e.g. Vercel)
  }
  return path.join(os.tmpdir(), 'portfolio_messages.json');
}

function isAuthorized(req: NextRequest): boolean {
  const adminSecret = process.env.ADMIN_INBOX_PASSCODE || 'amay2026';
  const headerSecret =
    req.headers.get('x-admin-passcode') ||
    req.headers.get('authorization')?.replace('Bearer ', '');
  return Boolean(headerSecret && headerSecret.trim() === adminSecret.trim());
}

function getStoredMessages() {
  const filePath = getMessagesFilePath();
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf-8');
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (error) {
    console.error('Error reading messages file:', error);
    return [];
  }
}

function saveStoredMessages(messages: any[]) {
  const filePath = getMessagesFilePath();
  try {
    fs.writeFileSync(filePath, JSON.stringify(messages, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing messages file:', error);
  }
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { error: 'Unauthorized: Private inbox is restricted to the portfolio owner.' },
      { status: 401 }
    );
  }

  try {
    const messages = getStoredMessages();
    return NextResponse.json({
      success: true,
      count: messages.length,
      messages: messages.sort(
        (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    });
  } catch (error) {
    console.error('Failed to retrieve messages:', error);
    return NextResponse.json({ error: 'Failed to retrieve messages' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, company, honeypot } = body;

    // Honeypot spam protection
    if (honeypot) {
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

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return NextResponse.json({ error: 'Message must be at least 5 characters long' }, { status: 400 });
    }

    const newMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      createdAt: new Date().toISOString(),
      name: name.trim(),
      email: email.trim(),
      company: company?.trim() || null,
      message: message.trim(),
      read: false,
    };

    const messages = getStoredMessages();
    messages.unshift(newMessage);
    saveStoredMessages(messages);

    console.log(
      `[Contact Form Stored] Message ${newMessage.id} from: ${newMessage.name} <${newMessage.email}> (${newMessage.company || 'N/A'})`
    );

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been sent directly to Amay. He has received your transmission and will review it promptly.',
      storedMessageId: newMessage.id,
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while transmitting your message.' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json(
      { error: 'Unauthorized: Private inbox is restricted to the portfolio owner.' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Message ID is required' }, { status: 400 });
    }

    let messages = getStoredMessages();
    messages = messages.filter((m: any) => m.id !== id);
    saveStoredMessages(messages);

    return NextResponse.json({ success: true, message: 'Message removed from inbox' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
}
