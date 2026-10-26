'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Trash2, Reply, RefreshCw, Calendar, Building2, User, Inbox, AlertCircle } from 'lucide-react';

interface StoredMessage {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  read: boolean;
}

export default function InboxPage() {
  const [messages, setMessages] = useState<StoredMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMessages = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact', { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch messages');
      setMessages(data.messages || []);
    } catch (err: any) {
      setError(err.message || 'Error loading messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      const res = await fetch(`/api/contact?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (err) {
      alert('Failed to delete message.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/#contact"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-textMuted hover:text-sage transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO PORTFOLIO</span>
        </Link>

        <button
          onClick={fetchMessages}
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-borderSubtle text-xs font-mono text-textMuted hover:text-textMain transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-borderSubtle">
        <div className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sage" />
          <span className="font-mono text-xs uppercase tracking-wider text-sage font-medium">
            Contact Inbox
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl text-textMain tracking-tight">
              Received Messages & Transmissions
            </h1>
            <p className="text-sm text-textMuted mt-1">
              All messages submitted through your portfolio contact form are stored here in real time.
            </p>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-card border border-borderSubtle text-xs font-mono text-textMain self-start sm:self-auto">
            Total Messages: <span className="font-semibold text-terracotta">{messages.length}</span>
          </div>
        </div>
      </div>

      {/* Storage Info Banner */}
      <div className="p-4 rounded-2xl bg-card border border-borderSubtle text-xs text-textMuted space-y-1">
        <div className="flex items-center gap-2 font-mono text-textMain">
          <Inbox className="w-4 h-4 text-sage" />
          <span className="font-semibold">Local & Server Storage</span>
        </div>
        <p className="leading-relaxed">
          Messages are saved to <code className="px-1.5 py-0.5 rounded bg-cardSubtle font-mono text-sage">data/messages.json</code> on your machine. When deployed to Vercel, submissions are accessible via this <code className="px-1.5 py-0.5 rounded bg-cardSubtle font-mono">/inbox</code> route or can be forwarded directly to your Gmail inbox (<code className="px-1.5 py-0.5 rounded bg-cardSubtle font-mono text-terracotta">amaymishra1104@gmail.com</code>).
        </p>
      </div>

      {/* Messages List */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-sage" />
          <p className="text-xs font-mono text-textMuted">Loading received messages...</p>
        </div>
      ) : error ? (
        <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/30 text-center space-y-2 text-red-400">
          <AlertCircle className="w-6 h-6 mx-auto" />
          <p className="text-sm">{error}</p>
        </div>
      ) : messages.length === 0 ? (
        <div className="py-20 text-center rounded-3xl bg-card border border-borderSubtle space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-cardSubtle border border-borderSubtle flex items-center justify-center mx-auto text-textMuted">
            <Mail className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-lg text-textMain font-medium">Your inbox is empty</h3>
            <p className="text-xs text-textMuted max-w-sm mx-auto">
              No messages have been submitted through the contact form yet. When visitors fill out the form, their notes will appear right here.
            </p>
          </div>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-white bg-terracotta hover:bg-terracotta-hover transition-colors shadow-sm"
          >
            Go to Contact Form
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="p-6 rounded-2xl bg-card border border-borderSubtle shadow-soft transition-all duration-200 hover:border-sage space-y-4"
            >
              {/* Message Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-borderSubtle/60">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-serif text-lg font-medium text-textMain flex items-center gap-1.5">
                      <User className="w-4 h-4 text-sage" />
                      {msg.name}
                    </span>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-xs font-mono text-sage hover:underline"
                    >
                      &lt;{msg.email}&gt;
                    </a>
                  </div>
                  {msg.company && (
                    <div className="flex items-center gap-1 text-xs font-mono text-textMuted">
                      <Building2 className="w-3.5 h-3.5 text-terracotta" />
                      <span>{msg.company}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-textMuted shrink-0">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(msg.createdAt).toLocaleString()}</span>
                </div>
              </div>

              {/* Message Content */}
              <div className="p-4 rounded-xl bg-cardSubtle border border-borderSubtle text-sm text-textMain leading-relaxed whitespace-pre-wrap font-sans">
                {msg.message}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2">
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                      msg.email
                    )}&su=${encodeURIComponent(`Re: Inquiry from ${msg.name} via Portfolio`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium text-white bg-terracotta hover:bg-terracotta-hover transition-colors shadow-sm"
                  >
                    <Reply className="w-3.5 h-3.5" />
                    <span>Reply via Gmail</span>
                  </a>

                  <a
                    href={`mailto:${msg.email}?subject=${encodeURIComponent(
                      `Re: Inquiry from ${msg.name}`
                    )}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-textMain bg-cardSubtle border border-borderSubtle hover:border-sage transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-sage" />
                    <span>Default Mail</span>
                  </a>
                </div>

                <button
                  onClick={() => handleDelete(msg.id)}
                  type="button"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono text-textMuted hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  title="Delete message"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
