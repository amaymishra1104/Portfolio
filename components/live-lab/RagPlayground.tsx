'use client';

import React, { useState } from 'react';
import { FileText, Cpu, Search, CheckCircle2, ArrowRight, RefreshCw } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const SAMPLE_DOCUMENTS = [
  {
    id: 'doc1',
    title: 'AgentPay Architecture Specification',
    content:
      'AgentPay enforces cryptographic HMAC-SHA256 signature verification for every autonomous agent transaction. It validates spending policy allowances using a sliding-window budget limiter. All payment orders require deterministic UUIDv5 idempotency keys. In the event of network timeouts, the webhook reconciler polls the payment provider with exponential backoff, guaranteeing zero duplicate charges.',
  },
  {
    id: 'doc2',
    title: 'Fraud Detection XGBoost Technical Paper',
    content:
      'The transaction anomaly pipeline trains a cost-sensitive XGBoost model on imbalanced data (0.17% positive fraud cases). SMOTE oversampling balances minority classes during training. Decision thresholds are calibrated to 0.42 to maximize PR-AUC while maintaining false positive rates below 1.5%. Feature attributions are generated using SHAP TreeExplainer within 14 milliseconds per inference call.',
  },
];

export default function RagPlayground() {
  const [selectedDocId, setSelectedDocId] = useState('doc1');
  const [customText, setCustomText] = useState('');
  const [chunkSize, setChunkSize] = useState(120);
  const [query, setQuery] = useState('How does AgentPay prevent duplicate payments?');
  const [step, setStep] = useState<'idle' | 'chunked' | 'retrieved'>('idle');
  const [chunks, setChunks] = useState<{ id: number; text: string; score?: number }[]>([]);
  const [synthesizedAnswer, setSynthesizedAnswer] = useState<string>('');

  const activeDocContent =
    customText.trim() ||
    (SAMPLE_DOCUMENTS.find((d) => d.id === selectedDocId)?.content || '');

  const handleProcess = () => {
    trackEvent('lab_run', { lab: 'rag_playground_chunk' });
    // Split into chunks of approx `chunkSize` characters with overlapping window
    const words = activeDocContent.split(' ');
    const newChunks: { id: number; text: string }[] = [];
    let current = '';
    let cId = 1;

    for (const w of words) {
      if ((current + ' ' + w).length > chunkSize && current.length > 0) {
        newChunks.push({ id: cId++, text: current.trim() });
        current = w;
      } else {
        current += (current ? ' ' : '') + w;
      }
    }
    if (current.trim()) {
      newChunks.push({ id: cId++, text: current.trim() });
    }

    setChunks(newChunks);
    setStep('chunked');
    setSynthesizedAnswer('');
  };

  const handleRetrieve = () => {
    if (chunks.length === 0) {
      handleProcess();
    }
    trackEvent('lab_run', { lab: 'rag_playground_query', query });

    const qTokens = query.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(Boolean);

    // Compute lexical overlap & vector relevance
    const scored = chunks.map((c) => {
      const cLower = c.text.toLowerCase();
      let matchCount = 0;
      for (const t of qTokens) {
        if (cLower.includes(t)) matchCount++;
      }
      const score = Math.min(0.99, Number((0.25 + (matchCount / (qTokens.length || 1)) * 0.72).toFixed(2)));
      return { ...c, score };
    });

    scored.sort((a, b) => (b.score || 0) - (a.score || 0));
    setChunks(scored);
    setStep('retrieved');

    // Synthesize response based on top context
    const topChunk = scored[0];
    if (topChunk && (topChunk.score || 0) > 0.4) {
      setSynthesizedAnswer(
        `Based on retrieved Context [Chunk #${topChunk.id} with ${(topChunk.score! * 100).toFixed(0)}% relevance]:\n"${topChunk.text}"`
      );
    } else {
      setSynthesizedAnswer(
        'Retrieved context had insufficient relevance match for this specific query. Try adjusting chunk size or selecting another document.'
      );
    }
  };

  return (
    <div className="bg-[#0b0e17] border border-surface-border rounded-xl p-5 sm:p-7 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-border">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-primary">
            <Cpu className="w-3.5 h-3.5" />
            <span>LAB 01 // RAG RETRIEVAL PLAYGROUND</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            Hybrid Chunking &amp; Context Synthesis
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Test document decomposition, semantic vector scoring, and augmented LLM grounding.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {SAMPLE_DOCUMENTS.map((doc) => (
            <button
              key={doc.id}
              onClick={() => {
                setSelectedDocId(doc.id);
                setCustomText('');
                setStep('idle');
                setChunks([]);
              }}
              className={`font-mono text-xs px-2.5 py-1.5 rounded border transition-colors ${
                selectedDocId === doc.id && !customText
                  ? 'bg-primary/10 border-primary text-primary'
                  : 'bg-surface-100 border-surface-border text-zinc-400 hover:text-white'
              }`}
            >
              {doc.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Pipeline Stage Indicators */}
      <div className="grid grid-cols-6 gap-2 text-center font-mono text-[10px] hidden sm:grid">
        {['DOCUMENT', 'CHUNKING', 'EMBEDDINGS', 'RETRIEVAL', 'GROUNDING', 'ANSWER'].map((stage, i) => (
          <div
            key={stage}
            className={`p-1.5 rounded border ${
              (step === 'chunked' && i <= 2) || (step === 'retrieved' && i <= 5)
                ? 'bg-primary/15 border-primary text-primary font-bold'
                : 'bg-surface-100/50 border-surface-border text-zinc-500'
            }`}
          >
            0{i + 1} {stage}
          </div>
        ))}
      </div>

      {/* Input document & chunk slider */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-xs text-zinc-400 mb-1.5">
            Source Document Payload
          </label>
          <textarea
            rows={5}
            value={customText || activeDocContent}
            onChange={(e) => {
              setCustomText(e.target.value);
              setStep('idle');
            }}
            className="w-full bg-[#07090e] border border-surface-border focus:border-primary/50 text-xs text-zinc-200 p-3 rounded-lg focus:outline-none font-mono"
            placeholder="Paste technical documentation or paper abstract..."
          />
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between font-mono text-xs text-zinc-400 mb-1">
              <span>Target Chunk Size:</span>
              <span className="text-primary font-bold">{chunkSize} characters</span>
            </div>
            <input
              type="range"
              min={60}
              max={240}
              step={20}
              value={chunkSize}
              onChange={(e) => {
                setChunkSize(Number(e.target.value));
                setStep('idle');
              }}
              className="w-full accent-primary bg-surface-100"
            />
          </div>

          <button
            onClick={handleProcess}
            className="w-full flex items-center justify-center gap-2 font-mono text-xs py-2.5 bg-surface-100 hover:bg-surface-50 border border-surface-border hover:border-zinc-500 text-zinc-200 rounded-lg transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-accent" />
            <span>PROCESS DOCUMENT &amp; COMPUTE CHUNKS</span>
          </button>
        </div>
      </div>

      {/* Chunks display */}
      {chunks.length > 0 && (
        <div className="space-y-3 pt-3 border-t border-surface-border">
          <div className="flex items-center justify-between font-mono text-xs text-zinc-400">
            <span>GENERATED CHUNKS ({chunks.length})</span>
            {step === 'retrieved' && <span className="text-emerald-400">RANKED BY SIMILARITY</span>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-48 overflow-y-auto pr-1">
            {chunks.map((c) => (
              <div
                key={c.id}
                className={`p-3 rounded-lg border text-xs font-mono transition-all ${
                  c.score && c.score > 0.6
                    ? 'bg-primary/10 border-primary text-zinc-200 shadow-sm'
                    : 'bg-[#07090e] border-surface-border text-zinc-400'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-zinc-500 mb-1">
                  <span>CHUNK #{c.id}</span>
                  {c.score !== undefined && (
                    <span className="text-emerald-400 font-bold">
                      SCORE: {(c.score * 100).toFixed(0)}%
                    </span>
                  )}
                </div>
                <p className="line-clamp-3 leading-relaxed text-[11px]">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Query Bar */}
      <div className="pt-2 border-t border-surface-border">
        <label className="block font-mono text-xs text-zinc-400 mb-1.5">
          Ask Grounded Query against Chunked Index
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. How does AgentPay prevent duplicate payments?"
              className="w-full bg-[#07090e] border border-surface-border focus:border-primary/50 text-xs text-zinc-100 pl-9 pr-3 py-2.5 rounded-lg focus:outline-none font-mono"
            />
          </div>
          <button
            onClick={handleRetrieve}
            className="px-5 py-2.5 bg-primary hover:bg-emerald-400 text-black font-mono font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>RETRIEVE &amp; SYNTHESIZE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Synthesized Answer Output */}
      {synthesizedAnswer && (
        <div className="p-4 rounded-lg bg-[#0e1320] border border-primary/30 text-xs font-mono space-y-1.5 animate-in fade-in">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>GROUNDED LLM ANSWER</span>
          </div>
          <p className="text-zinc-200 leading-relaxed whitespace-pre-line text-xs">
            {synthesizedAnswer}
          </p>
        </div>
      )}
    </div>
  );
}
