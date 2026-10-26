'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { portfolioData } from '@/data/portfolio';
import {
  Mail,
  Github,
  Linkedin,
  FileDown,
  Copy,
  Check,
  ArrowUpRight,
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Inbox,
  ExternalLink,
} from 'lucide-react';
import ResumeModal from './ResumeModal';

function KaggleIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.825 23.859c-.022.08-.09.141-.188.141h-3.155c-.13 0-.247-.074-.303-.191l-4.524-8.799-1.921 1.838v6.974c0 .121-.098.219-.219.219H5.733a.219.219 0 0 1-.219-.219V.219C5.514.098 5.612 0 5.733 0h2.782c.121 0 .219.098.219.219v14.417l6.23-6.273c.084-.085.2-.132.32-.132h3.364c.094 0 .162.062.185.139.027.091-.004.187-.072.247l-6.494 5.922 6.502 9.071c.064.06.091.157.06.249z" />
    </svg>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    honeypot: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formFeedback, setFormFeedback] = useState('');

  const directGmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=amaymishra1104@gmail.com&su=${encodeURIComponent(
    'Inquiry from Portfolio — Amay Mishra'
  )}`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formStatus === 'loading') return;

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setFormStatus('error');
      setFormFeedback('Please provide your name, email address, and a message.');
      return;
    }

    setFormStatus('loading');
    setFormFeedback('');

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

      setFormStatus('success');
      setFormFeedback(
        'Thank you! Your message has been saved to Amay\'s inbox. You can view all received messages in /inbox.'
      );
      setForm({ name: '', email: '', company: '', message: '', honeypot: '' });
    } catch (err: any) {
      setFormStatus('error');
      setFormFeedback(err.message || 'An error occurred while sending your message.');
    }
  };

  const handleSendViaGmailDirect = () => {
    const subject = encodeURIComponent(
      `Inquiry from ${form.name || 'Visitor'}${form.company ? ` (${form.company})` : ''}`
    );
    const body = encodeURIComponent(
      `${form.message ? `${form.message}\n\n` : ''}---\nSender: ${form.name || 'N/A'}\nEmail: ${
        form.email || 'N/A'
      }\nCompany: ${form.company || 'N/A'}`
    );
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=amaymishra1104@gmail.com&su=${subject}&body=${body}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <section id="contact" className="py-20 md:py-28 border-t border-borderSubtle relative">
        {/* Background Soft Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[550px] h-[300px] bg-terracotta/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Main CTA Box */}
          <div className="p-8 sm:p-12 md:p-16 rounded-3xl bg-card border border-borderSubtle shadow-soft space-y-10">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sage" />
                <span className="font-mono text-xs uppercase tracking-wider text-sage font-medium">
                  Get In Touch
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-textMain tracking-tight">
                Looking for an AI/ML Engineer who ships? Let&apos;s talk.
              </h2>
              <p className="text-base sm:text-lg text-textMuted leading-relaxed pt-2">
                I am actively seeking full-time roles and internships in AI/ML Engineering and Software Engineering. Available immediately for conversations.
              </p>
            </div>

            {/* Quick Contact Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4">
              {/* Primary Email CTA -> Takes user directly into Gmail Compose */}
              <a
                href={directGmailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-terracotta hover:bg-terracotta-hover transition-all duration-200 shadow-sm group"
                title="Opens Gmail directly with amaymishra1104@gmail.com prefilled"
              >
                <Mail className="w-4 h-4" />
                <span>Send Direct Email (Gmail)</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* Copy Email Button */}
              <button
                onClick={handleCopyEmail}
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-medium text-textMain bg-cardSubtle border border-borderSubtle hover:border-sage transition-all duration-200"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-sage" />
                    <span className="font-mono text-xs text-sage">Email Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-textMuted" />
                    <span className="font-mono text-xs">{portfolioData.personal.email}</span>
                  </>
                )}
              </button>

              {/* View & Download Resume Button -> Opens interactive preview modal */}
              <button
                onClick={() => setResumeModalOpen(true)}
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-medium text-textMain bg-card border border-borderSubtle hover:border-borderHover hover:bg-cardSubtle transition-all duration-200 shadow-sm"
                title="Open resume preview modal with download button"
              >
                <FileDown className="w-4 h-4 text-terracotta" />
                <span>View &amp; Download Resume</span>
              </button>
            </div>

            {/* Direct Interactive Message Form */}
            <div className="pt-8 border-t border-borderSubtle/60">
              <div className="max-w-2xl space-y-4">
                <div className="space-y-1">
                  <h3 className="font-serif text-xl sm:text-2xl text-textMain font-medium">
                    Send a Direct Message
                  </h3>
                  <p className="text-xs sm:text-sm text-textMuted">
                    Fill in your details below and hit <strong>Send Message</strong>. Your message will be saved to Amay&apos;s personal inbox and can also be sent directly via Gmail.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4 pt-2">
                  {/* Honeypot field */}
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
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="block text-xs font-mono text-textMuted">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-4 py-2.5 rounded-xl bg-cardSubtle border border-borderSubtle text-xs sm:text-sm text-textMain placeholder:text-textMuted/60 focus:outline-none focus:border-sage transition-colors font-sans"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="block text-xs font-mono text-textMuted">
                        Your Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="s.jenkins@company.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-cardSubtle border border-borderSubtle text-xs sm:text-sm text-textMain placeholder:text-textMuted/60 focus:outline-none focus:border-sage transition-colors font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-company" className="block text-xs font-mono text-textMuted">
                      Company / Organization (Optional)
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="e.g. Scale AI, Stripe, Google"
                      className="w-full px-4 py-2.5 rounded-xl bg-cardSubtle border border-borderSubtle text-xs sm:text-sm text-textMain placeholder:text-textMuted/60 focus:outline-none focus:border-sage transition-colors font-sans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="block text-xs font-mono text-textMuted">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Hi Amay, we came across your work on AgentHub and CareerPilot.ai and would like to talk about an AI engineering role..."
                      className="w-full px-4 py-2.5 rounded-xl bg-cardSubtle border border-borderSubtle text-xs sm:text-sm text-textMain placeholder:text-textMuted/60 focus:outline-none focus:border-sage transition-colors font-sans resize-y"
                    />
                  </div>

                  {/* Status Feedback */}
                  {formStatus === 'success' && (
                    <div className="p-4 rounded-xl bg-sage/10 border border-sage/30 flex items-start justify-between gap-3 text-xs text-sage font-medium">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>{formFeedback}</span>
                      </div>
                      <Link
                        href="/inbox"
                        className="underline hover:text-textMain font-mono shrink-0 font-semibold"
                      >
                        Open Inbox →
                      </Link>
                    </div>
                  )}

                  {formStatus === 'error' && (
                    <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2.5 text-xs text-red-400 font-medium">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formFeedback}</span>
                    </div>
                  )}

                  {/* Prominent Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    {/* Primary Submit Button */}
                    <button
                      type="submit"
                      disabled={formStatus === 'loading'}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-white bg-terracotta hover:bg-terracotta-hover active:scale-[0.99] disabled:opacity-60 transition-all duration-200 shadow-md"
                    >
                      {formStatus === 'loading' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Transmitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>

                    {/* Secondary Send via Gmail Button */}
                    <button
                      type="button"
                      onClick={handleSendViaGmailDirect}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-medium text-textMain bg-card border border-borderSubtle hover:border-sage transition-all duration-200"
                      title="Open Gmail with this drafted message prefilled"
                    >
                      <Mail className="w-4 h-4 text-sage" />
                      <span>Or Compose in Gmail</span>
                    </button>
                  </div>
                </form>

                {/* Where do messages go banner */}
                <div className="mt-6 p-4 rounded-2xl bg-cardSubtle/70 border border-borderSubtle flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-textMuted">
                  <div className="flex items-center gap-2">
                    <Inbox className="w-4 h-4 text-sage shrink-0" />
                    <span>
                      Messages submitted here are saved to your secure portfolio inbox.
                    </span>
                  </div>
                  <Link
                    href="/inbox"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-borderSubtle text-xs font-mono text-textMain hover:border-sage hover:text-sage transition-colors self-start sm:self-auto shrink-0"
                  >
                    <span>View Inbox (/inbox)</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Social Profiles Grid */}
            <div className="pt-8 border-t border-borderSubtle/60 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a
                href="https://github.com/amaymishra1104"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-cardSubtle/60 border border-borderSubtle hover:border-sage transition-colors flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-textMuted group-hover:text-textMain transition-colors" />
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-textMuted">
                      GitHub
                    </div>
                    <div className="text-xs font-medium text-textMain">
                      amaymishra1104
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-textMuted group-hover:text-textMain transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="https://linkedin.com/in/amay-mishra-419766331"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-cardSubtle/60 border border-borderSubtle hover:border-sage transition-colors flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-3">
                  <Linkedin className="w-5 h-5 text-textMuted group-hover:text-textMain transition-colors" />
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-textMuted">
                      LinkedIn
                    </div>
                    <div className="text-xs font-medium text-textMain">
                      amay-mishra
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-textMuted group-hover:text-textMain transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="https://kaggle.com/amaymishra11"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-cardSubtle/60 border border-borderSubtle hover:border-sage transition-colors flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-3">
                  <KaggleIcon className="w-5 h-5 text-textMuted group-hover:text-textMain transition-colors" />
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-textMuted">
                      Kaggle
                    </div>
                    <div className="text-xs font-medium text-textMain">
                      amaymishra11 (Top 2%)
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-textMuted group-hover:text-textMain transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Location & Status Line */}
            <div className="pt-2 flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-textMuted">
              <MapPin className="w-3.5 h-3.5 text-terracotta" />
              <span>Based in {portfolioData.personal.location} · Open to Remote & Relocation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Resume Viewer Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </>
  );
}
