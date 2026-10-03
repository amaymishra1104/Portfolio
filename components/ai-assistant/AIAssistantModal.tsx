'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { X, Sparkles, Send, Bot, User, ArrowRight, CornerDownLeft, Loader2 } from 'lucide-react';
import { SUGGESTED_QUESTIONS, ChatMessage } from '@/lib/ai';
import { trackEvent } from '@/lib/analytics';

export default function AIAssistantModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        'Greetings. I am AMAY AI, an assistant grounded in Amay Mishra\'s portfolio knowledge base (RAG). Ask me anything about his projects, autonomous agent architectures, machine learning models, or tech stack.',
      citations: [
        { label: 'View All Projects', url: '/work' },
        { label: 'Live Lab', url: '/lab' },
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global event listener for opening AI modal
  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ prompt?: string }>;
      setIsOpen(true);
      if (customEvent.detail?.prompt) {
        setInput(customEvent.detail.prompt);
      }
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    };

    window.addEventListener('amay:open-ai', handleOpen);
    return () => window.removeEventListener('amay:open-ai', handleOpen);
  }, []);

  // Keyboard shortcut to close with Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Scroll chat to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (queryText?: string) => {
    const textToSend = (queryText || input).trim();
    if (!textToSend || loading) return;

    setInput('');
    const userMsg: ChatMessage = { role: 'user', content: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    trackEvent('ai_question', { query: textToSend });

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: textToSend,
          history: messages.slice(-4),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Response error');
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.answer,
          citations: data.citations || [],
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'AMAY AI is temporarily operating in local fallback mode. Amay specializes in AI/ML, autonomous agent development (AgentPay), full-stack engineering (Next.js/FastAPI), and computer vision (CivicAI).',
          citations: [{ label: 'Browse Selected Work', url: '/work' }],
        },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl h-[620px] max-h-[90vh] bg-[#0b0e17] border border-surface-border rounded-xl shadow-2xl flex flex-col overflow-hidden text-zinc-100">
        {/* Modal Header */}
        <div className="px-5 py-3.5 bg-surface-100/90 border-b border-surface-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-primary/15 text-primary border border-primary/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="ai-modal-title" className="font-mono text-xs font-semibold tracking-wider text-zinc-100">
                  AMAY AI // RAG REASONER
                </h2>
                <span className="font-mono text-[10px] text-primary bg-primary/10 border border-primary/20 px-1.5 py-0.2 rounded">
                  ONLINE
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Grounded in verified portfolio knowledge base · Zero hallucination
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 text-zinc-400 hover:text-white rounded hover:bg-surface-50 transition-colors"
            aria-label="Close AMAY AI"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Suggested Quick Prompts */}
        <div className="px-4 py-2 bg-[#090b12] border-b border-surface-border/60 overflow-x-auto flex gap-1.5 scrollbar-none">
          {SUGGESTED_QUESTIONS.slice(0, 5).map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] font-mono whitespace-nowrap bg-surface-100/80 hover:bg-surface-50 border border-surface-border hover:border-primary/40 text-zinc-300 hover:text-primary px-2.5 py-1 rounded transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat message history */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 text-xs sm:text-sm ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="h-7 w-7 rounded bg-primary/10 border border-primary/30 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-lg p-3.5 leading-relaxed space-y-2.5 ${
                  msg.role === 'user'
                    ? 'bg-primary/15 border border-primary/40 text-emerald-100'
                    : 'bg-surface-100/80 border border-surface-border text-zinc-200'
                }`}
              >
                <div className="whitespace-pre-line text-xs sm:text-[13px]">
                  {msg.content}
                </div>

                {/* Citations & Project Links */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="pt-2 border-t border-white/5 flex flex-wrap gap-1.5">
                    {msg.citations.map((c, cIdx) => (
                      <Link
                        key={cIdx}
                        href={c.url}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-1 font-mono text-[11px] bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 rounded transition-colors"
                      >
                        <span>{c.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="h-7 w-7 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 flex-shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 text-xs sm:text-sm items-center text-zinc-400">
              <div className="h-7 w-7 rounded bg-primary/10 border border-primary/30 flex items-center justify-center text-primary flex-shrink-0">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-surface-100/80 border border-surface-border px-3.5 py-2 rounded-lg font-mono text-xs text-zinc-400 flex items-center gap-2">
                <span>Retrieving context & synthesizing response...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input box */}
        <div className="p-3 sm:p-4 bg-surface-100/90 border-t border-surface-border">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about AgentPay, HireIQ, RAG, FastAPI, or my experience..."
              disabled={loading}
              className="flex-1 bg-[#07090e] border border-surface-border focus:border-primary/50 text-zinc-100 text-xs sm:text-sm px-3.5 py-2.5 rounded-lg focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-primary hover:bg-emerald-400 disabled:opacity-40 disabled:hover:bg-primary text-black font-semibold px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors text-xs font-mono"
            >
              <span>SEND</span>
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mt-2 px-1">
            <span>Powered by hybrid RAG pipeline</span>
            <span>ESC to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
