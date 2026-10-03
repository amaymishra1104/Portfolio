'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Terminal, Code2, ShieldCheck, Zap } from 'lucide-react';
import HeroCanvas from './HeroCanvas';
import { triggerOpenAI, triggerOpenTerminal } from '@/lib/store';
import { trackEvent } from '@/lib/analytics';

export default function Hero() {
  return (
    <section className="relative w-full pt-16 pb-20 sm:pt-24 sm:pb-28 overflow-hidden tech-grid-bg">
      <HeroCanvas />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          {/* Identity Tag & System status */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-100/90 border border-surface-border text-zinc-300 font-mono text-xs shadow-inner">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-zinc-400">AMAY MISHRA</span>
            <span className="text-zinc-600">/</span>
            <span className="text-emerald-400">AI &amp; FULL-STACK ARCHITECT</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
              Building intelligent systems that <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">actually ship.</span>
            </h1>
            <p className="text-base sm:text-xl text-zinc-300 font-normal leading-relaxed max-w-2xl">
              I build AI-powered products, intelligent agents, backend systems, and full-stack applications with verified idempotency, low-latency inference, and resilient architectures.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href="#featured-work"
              onClick={() => trackEvent('project_view', { source: 'hero_primary_cta' })}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary hover:bg-emerald-400 text-black font-semibold text-xs sm:text-sm font-mono tracking-wider transition-all duration-150 shadow-lg shadow-primary/20 hover:scale-[1.02]"
            >
              <span>EXPLORE MY WORK</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => {
                triggerOpenAI();
                trackEvent('ai_question', { source: 'hero_cta' });
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-surface-100/80 hover:bg-surface-50 border border-primary/40 hover:border-primary text-primary font-mono text-xs sm:text-sm font-medium tracking-wider transition-all duration-150 hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4" />
              <span>ASK AMAY AI</span>
            </button>

            <button
              onClick={() => {
                triggerOpenTerminal();
                trackEvent('terminal_open', { source: 'hero_cta' });
              }}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-surface-100/50 hover:bg-surface-100 border border-surface-border hover:border-zinc-500 text-zinc-400 hover:text-zinc-200 font-mono text-xs transition-colors"
            >
              <Terminal className="w-4 h-4 text-accent" />
              <span>OPEN TERMINAL</span>
            </button>
          </div>

          {/* Quick Technical Evidence Highlights */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2 p-2.5 rounded bg-[#0b0e17]/80 border border-surface-border">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Sub-20ms ML Inference</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded bg-[#0b0e17]/80 border border-surface-border">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Idempotent Agent Rails</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded bg-[#0b0e17]/80 border border-surface-border col-span-2 sm:col-span-1">
              <Code2 className="w-4 h-4 text-primary" />
              <span>29+ Repositories Shipped</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
