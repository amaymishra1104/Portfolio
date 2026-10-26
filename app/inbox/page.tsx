'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Mail,
  Trash2,
  Reply,
  RefreshCw,
  Calendar,
  Building2,
  User,
  Inbox,
  AlertCircle,
  Lock,
  Unlock,
  ShieldCheck,
  KeyRound,
  ExternalLink,
  LogOut,
} from 'lucide-react';

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
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [messages, setMessages] = useState<StoredMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [authError, setAuthError] = useState('');

  // Check saved session on mount
  useEffect(() => {
    const saved = sessionStorage.getItem('inbox_admin_passcode');
    if (saved) {
      setPasscode(saved);
      verifyAndFetch(saved);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const verifyAndFetch = async (codeToTest: string) => {
    setLoading(true);
    setError('');
    setAuthError('');
    try {
      const res = await fetch('/api/contact', {
        headers: {
          'x-admin-passcode': codeToTest,
        },
        cache: 'no-store',
      });
      const data = await res.json();

      if (res.status === 401) {
        setIsAuthenticated(false);
        sessionStorage.removeItem('inbox_admin_passcode');
        setAuthError('Access Denied: Incorrect owner passcode.');
        return;
      }

      if (!res.ok) {
        throw new Error(data.error || 'Failed to load messages');
      }

      // Successfully authenticated
      setIsAuthenticated(true);
      sessionStorage.setItem('inbox_admin_passcode', codeToTest);
      setMessages(data.messages || []);
    } catch (err: any) {
      setError(err.message || 'Error communicating with server');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setAuthError('Please enter your owner passcode.');
      return;
    }
    verifyAndFetch(passcode.trim());
  };

  const handleLogout = () => {
    sessionStorage.removeItem('inbox_admin_passcode');
    setIsAuthenticated(false);
    setPasscode('');
    setMessages([]);
    setAuthError('');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this message?')) return;
    try {
      const activeCode = passcode || sessionStorage.getItem('inbox_admin_passcode') || '';
      const res = await fetch(`/api/contact?id=${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-passcode': activeCode,
        },
      });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete message.');
      }
    } catch (err) {
      alert('Failed to delete message.');
    }
  };

  // 1. Loading Initial Auth State
  if (isAuthenticated === null) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-3">
        <RefreshCw className="w-6 h-6 animate-spin mx-auto text-sage" />
        <p className="text-xs font-mono text-textMuted">Checking owner authorization...</p>
      </div>
    );
  }

  // 2. Locked Screen: Owner Passcode Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-3xl bg-[#FAFDFE] dark:bg-[#151B19] border-2 border-sage/40 dark:border-sage/50 shadow-2xl p-6 sm:p-8 space-y-6 text-textMain transition-all">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center mx-auto text-white shadow-md">
              <Lock className="w-6 h-6 text-terracotta" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-terracotta/15 border border-terracotta/30 text-terracotta font-mono text-xs font-semibold uppercase tracking-wider">
              <span>Owner Access Only</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-textMain tracking-tight">
              Direct Messages Inbox
            </h1>
            <p className="text-xs text-textMuted leading-relaxed max-w-xs mx-auto">
              This inbox contains private correspondence sent through your portfolio. Enter your owner passcode to proceed.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="passcode" className="block text-xs font-mono font-medium text-textMain">
                Owner Passcode
              </label>
              <div className="relative">
                <input
                  id="passcode"
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode..."
                  className="w-full px-4 py-2.5 rounded-xl bg-card border border-borderSubtle text-sm text-textMain placeholder:text-textMuted/60 focus:outline-none focus:ring-2 focus:ring-sage"
                  autoFocus
                />
                <KeyRound className="absolute right-3.5 top-3 w-4 h-4 text-textMuted pointer-events-none" />
              </div>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-zinc-700 shadow-md transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4 text-sage-light" />
                  <span>Unlock Inbox</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-borderSubtle/60 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-textMuted hover:text-sage transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Portfolio</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Unlocked Private Inbox Interface
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8 animate-fade-in">
      {/* Top Breadcrumb & Owner Toolbar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-textMuted hover:text-sage transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO PORTFOLIO</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Owner Authenticated (Amay Mishra)</span>
          </div>

          <button
            onClick={() => verifyAndFetch(passcode)}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-borderSubtle text-xs font-mono text-textMuted hover:text-textMain hover:border-sage transition-colors"
            title="Refresh messages"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-mono border border-zinc-700 shadow-sm transition-colors"
            title="Lock inbox"
          >
            <LogOut className="w-3.5 h-3.5 text-terracotta" />
            <span>Lock</span>
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-borderSubtle">
        <div className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-wider text-sage font-semibold">
            Confidential Owner Portal
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl text-textMain tracking-tight font-bold">
              Private Contact Inquiries
            </h1>
            <p className="text-sm text-textMuted mt-1">
              Direct inquiries and project messages submitted by recruiters, partners, and collaborators.
            </p>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-card border border-borderSubtle text-xs font-mono text-textMain self-start sm:self-auto shadow-sm">
            Total Inquiries: <span className="font-semibold text-terracotta">{messages.length}</span>
          </div>
        </div>
      </div>

      {/* Messages Feed */}
      {loading ? (
        <div className="py-20 text-center space-y-3">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-sage" />
          <p className="text-xs font-mono text-textMuted">Refreshing inquiries...</p>
        </div>
      ) : error ? (
        <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/30 text-center space-y-2 text-red-400">
          <AlertCircle className="w-6 h-6 mx-auto" />
          <p className="text-sm">{error}</p>
        </div>
      ) : messages.length === 0 ? (
        <div className="py-20 text-center rounded-3xl bg-card border border-borderSubtle space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-cardSubtle border border-borderSubtle flex items-center justify-center mx-auto text-textMuted">
            <Mail className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-lg text-textMain font-medium">Your inbox is clean</h3>
            <p className="text-xs text-textMuted max-w-sm mx-auto">
              No new inquiries have been received. When someone submits the contact form, their note will appear here securely.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="p-5 sm:p-6 rounded-2xl bg-card border border-borderSubtle hover:border-sage transition-all duration-200 shadow-sm space-y-4"
            >
              {/* Message Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-borderSubtle/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sage/10 text-sage border border-sage/20 flex items-center justify-center font-serif font-bold text-base">
                    {msg.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-textMain text-sm sm:text-base flex items-center gap-2">
                      <span>{msg.name}</span>
                      {msg.company && (
                        <span className="inline-flex items-center gap-1 font-mono text-[11px] font-normal text-textMuted bg-cardSubtle px-2 py-0.5 rounded border border-borderSubtle">
                          <Building2 className="w-3 h-3 text-sage" />
                          <span>{msg.company}</span>
                        </span>
                      )}
                    </h3>
                    <p className="font-mono text-xs text-sage">{msg.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 font-mono text-xs text-textMuted self-start sm:self-auto">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(msg.createdAt).toLocaleString()}</span>
                </div>
              </div>

              {/* Message Body */}
              <div className="text-sm text-textMain leading-relaxed whitespace-pre-wrap bg-cardSubtle/60 p-4 rounded-xl border border-borderSubtle">
                {msg.message}
              </div>

              {/* Message Actions */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  {/* Reply via Direct Gmail */}
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                      msg.email
                    )}&su=${encodeURIComponent(
                      `Re: Inquiry from ${msg.name} — Amay Mishra`
                    )}&body=${encodeURIComponent(
                      `\n\n--- On ${new Date(msg.createdAt).toLocaleString()}, ${msg.name} wrote:\n${msg.message}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-terracotta hover:bg-terracotta-hover text-white text-xs font-semibold shadow-sm transition-colors"
                  >
                    <Reply className="w-3.5 h-3.5" />
                    <span>Reply via Gmail</span>
                  </a>

                  {/* Mailto fallback */}
                  <a
                    href={`mailto:${msg.email}?subject=Re: Portfolio Inquiry`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cardSubtle border border-borderSubtle text-xs font-mono text-textMuted hover:text-textMain hover:border-sage transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Default Mail</span>
                  </a>
                </div>

                {/* Delete Message */}
                <button
                  onClick={() => handleDelete(msg.id)}
                  type="button"
                  className="inline-flex items-center gap-1 text-xs font-mono text-textMuted hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-500/10"
                  title="Delete message"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
