'use client';

import React from 'react';
import Link from 'next/link';
import { User, Terminal, Code, Cpu, Target, ArrowRight } from 'lucide-react';
import { triggerOpenTerminal, triggerOpenAI } from '@/lib/store';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-surface-border">
      <div className="mb-12">
        <div className="flex items-center gap-2 font-mono text-xs text-primary mb-2">
          <User className="w-3.5 h-3.5" />
          <span>07 // PERSONAL SPECIFICATION</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          ABOUT AMAY MISHRA
        </h2>
        <p className="text-sm text-zinc-400 mt-1 max-w-xl">
          An engineer who values working software, clean primitives, and systems that withstand real-world edge cases.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* WHO I AM */}
        <div className="p-6 rounded-xl bg-[#0b0e17] border border-surface-border space-y-3">
          <div className="font-mono text-xs text-primary font-semibold flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span>WHO I AM</span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            I am a Computer Science &amp; IT undergraduate (graduating 2027) based in Indore, India. I don&apos;t build toy demos to pad a resume—I focus on the hard parts of engineering: transaction idempotency, streaming latency, model calibration, and defensive API boundaries.
          </p>
        </div>

        {/* WHAT I BUILD */}
        <div className="p-6 rounded-xl bg-[#0b0e17] border border-surface-border space-y-3">
          <div className="font-mono text-xs text-cyan-400 font-semibold flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <span>WHAT I BUILD</span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Autonomous agent transaction protocols (AgentPay), intelligent technical interview evaluation engines (HireIQ), real-time financial fraud detectors, layout-aware RAG pipelines (CrunchReader), and clinical workflow SaaS products (MamaSoft).
          </p>
        </div>

        {/* HOW I WORK */}
        <div className="p-6 rounded-xl bg-[#0b0e17] border border-surface-border space-y-3">
          <div className="font-mono text-xs text-emerald-400 font-semibold flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>HOW I WORK</span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            I write reproducible code with strict typing. I treat LLM outputs as untrusted user input that requires validation, schema enforcement, and audit trails. I profile memory bottlenecks before declaring an application production-ready.
          </p>
        </div>

        {/* WHAT I'M LEARNING */}
        <div className="p-6 rounded-xl bg-[#0b0e17] border border-surface-border space-y-3">
          <div className="font-mono text-xs text-yellow-400 font-semibold flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
            <span>WHAT I&apos;M LEARNING</span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Currently deepening my focus on Model Context Protocol (MCP) servers, stateful graph-based multi-agent orchestration, ONNX runtime quantization on edge devices, and distributed consensus mechanisms.
          </p>
        </div>

        {/* WHAT I'M LOOKING FOR */}
        <div className="p-6 rounded-xl bg-[#0b0e17] border border-surface-border space-y-3 md:col-span-2">
          <div className="font-mono text-xs text-emerald-400 font-semibold flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            <span>WHAT I&apos;M LOOKING FOR</span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            High-impact software engineering roles, AI/ML engineering positions, and collaborative teams building scalable AI products, developer infrastructure, or mission-critical distributed platforms. If you value execution speed and architectural rigor, let&apos;s build together.
          </p>
          <div className="pt-2 flex flex-wrap gap-3 font-mono text-xs">
            <a
              href="#contact"
              className="text-primary hover:underline flex items-center gap-1"
            >
              <span>Get in touch directly</span>
              <ArrowRight className="w-3 h-3" />
            </a>
            <button
              onClick={() => triggerOpenAI('Tell me more about Amay Mishra')}
              className="text-cyan-400 hover:underline"
            >
              Ask AMAY AI about my background →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
