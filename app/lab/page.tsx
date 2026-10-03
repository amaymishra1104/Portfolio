import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FlaskConical } from 'lucide-react';
import RagPlayground from '@/components/live-lab/RagPlayground';
import AgentFlowLab from '@/components/live-lab/AgentFlowLab';
import MLPlayground from '@/components/live-lab/MLPlayground';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live Engineering Lab | Amay Mishra',
  description: 'Interactive demonstrations: RAG document chunking, multi-agent orchestration graph, and real-time ML fraud classification.',
};

export default function LabPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Breadcrumb */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO SYSTEM ROOT</span>
        </Link>
      </div>

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 font-mono text-xs text-primary mb-2">
          <FlaskConical className="w-3.5 h-3.5" />
          <span>INTERACTIVE EXPERIMENTS &amp; BENCHMARKS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          AMAY ENGINEERING LAB
        </h1>
        <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
          Real technical demonstrations you can test directly in your browser. All models and state machines execute with deterministic constraints and transparent telemetry.
        </p>
      </div>

      {/* Lab 01 */}
      <RagPlayground />

      {/* Lab 02 */}
      <AgentFlowLab />

      {/* Lab 03 */}
      <MLPlayground />
    </div>
  );
}
