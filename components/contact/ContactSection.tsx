'use client';

import React, { useState } from 'react';
import { Mail, Send, Github, Linkedin, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export default function ContactSection() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    honeypot: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;

    // Client validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in your name, email, and message.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to transmit message.');
      }

      setStatus('success');
      trackEvent('contact_submit', { name: form.name });
      setForm({ name: '', email: '', company: '', message: '', honeypot: '' });
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'An error occurred while sending your message.');
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-surface-border">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Context & Channels */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-primary mb-2">
              <Mail className="w-3.5 h-3.5" />
              <span>09 // INITIATE TRANSMISSION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              LET&apos;S BUILD SOMETHING.
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-md leading-relaxed">
              Whether you are hiring for high-impact AI/ML &amp; full-stack engineering roles, designing agentic protocols, or exploring technical collaborations, send a direct transmission.
            </p>
          </div>

          <div className="space-y-3 font-mono text-xs pt-4">
            <div className="p-4 rounded-xl bg-[#0b0e17] border border-surface-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Github className="w-4 h-4 text-white" />
                <div>
                  <p className="text-zinc-400 text-[10px]">GITHUB REPOSITORY</p>
                  <p className="text-zinc-200">github.com/amaymishra1104</p>
                </div>
              </div>
              <a
                href="https://github.com/amaymishra1104"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Follow →
              </a>
            </div>

            <div className="p-4 rounded-xl bg-[#0b0e17] border border-surface-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Linkedin className="w-4 h-4 text-cyan-400" />
                <div>
                  <p className="text-zinc-400 text-[10px]">LINKEDIN NETWORK</p>
                  <p className="text-zinc-200">linkedin.com/in/amaymishra</p>
                </div>
              </div>
              <a
                href="https://linkedin.com/in/amaymishra"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline"
              >
                Connect →
              </a>
            </div>

            <div className="p-4 rounded-xl bg-[#0b0e17] border border-surface-border">
              <p className="text-zinc-500 text-[10px]">LOCATION &amp; TIMEZONE</p>
              <p className="text-zinc-300 font-medium mt-0.5">
                Indore, Madhya Pradesh, India · IST (UTC +5:30)
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="bg-[#0b0e17] border border-surface-border rounded-xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot field for bot detection */}
            <input
              type="text"
              name="honeypot"
              value={form.honeypot}
              onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs text-zinc-400 mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Alex Chen"
                  className="w-full bg-[#07090e] border border-surface-border focus:border-primary/50 text-xs text-zinc-100 px-3.5 py-2.5 rounded-lg focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-zinc-400 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="alex@company.com"
                  className="w-full bg-[#07090e] border border-surface-border focus:border-primary/50 text-xs text-zinc-100 px-3.5 py-2.5 rounded-lg focus:outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs text-zinc-400 mb-1.5">
                Organization / Company (Optional)
              </label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="e.g. Engineering Lead @ Stripe"
                className="w-full bg-[#07090e] border border-surface-border focus:border-primary/50 text-xs text-zinc-100 px-3.5 py-2.5 rounded-lg focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-zinc-400 mb-1.5">
                Message / Technical Scope *
              </label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Describe your project, team opportunity, or engineering problem..."
                className="w-full bg-[#07090e] border border-surface-border focus:border-primary/50 text-xs text-zinc-100 p-3 rounded-lg focus:outline-none font-mono"
              />
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono rounded-lg">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {status === 'success' && (
              <div className="flex items-center gap-2 p-3 bg-primary/10 border border-primary/30 text-emerald-400 text-xs font-mono rounded-lg">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Transmission sent successfully. Amay will review and reply shortly.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex items-center justify-center gap-2 py-3 bg-primary hover:bg-emerald-400 disabled:opacity-50 text-black font-mono font-bold text-xs rounded-lg transition-all shadow-lg shadow-primary/10"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>TRANSMITTING...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT MESSAGE</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
