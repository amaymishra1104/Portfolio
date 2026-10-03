'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FlaskConical, ArrowRight } from 'lucide-react';
import RagPlayground from './RagPlayground';
import AgentFlowLab from './AgentFlowLab';
import MLPlayground from './MLPlayground';

export default function LiveLabSection() {
  const [activeTab, setActiveTab] = useState<'rag' | 'agent' | 'ml'>('rag');

  return (
    <section id="lab" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-surface-border">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-primary mb-2">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>03 // LIVE ENGINEERING LAB</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            AMAY LAB
          </h2>
          <p className="text-sm text-zinc-400 mt-1 max-w-xl">
            Real interactive engineering demonstrations—not static mockups. Test RAG chunk retrieval, simulate autonomous agent orchestration, and run ML inference live.
          </p>
        </div>

        {/* Experiment Navigation Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-surface-100 border border-surface-border rounded-lg self-start md:self-auto font-mono text-xs">
          <button
            onClick={() => setActiveTab('rag')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'rag'
                ? 'bg-primary text-black font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            LAB 01: RAG RETRIEVAL
          </button>
          <button
            onClick={() => setActiveTab('agent')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'agent'
                ? 'bg-primary text-black font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            LAB 02: AGENT FLOW
          </button>
          <button
            onClick={() => setActiveTab('ml')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'ml'
                ? 'bg-primary text-black font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            LAB 03: ML INFERENCE
          </button>
        </div>
      </div>

      {/* Active Lab Component */}
      <div className="transition-all duration-200">
        {activeTab === 'rag' && <RagPlayground />}
        {activeTab === 'agent' && <AgentFlowLab />}
        {activeTab === 'ml' && <MLPlayground />}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/lab"
          className="inline-flex items-center gap-2 font-mono text-xs text-primary hover:text-emerald-300 transition-colors"
        >
          <span>OPEN DEDICATED FULL-SCREEN LAB VIEW</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
