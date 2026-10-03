'use client';

import React, { useState } from 'react';
import { ArchitectureNode } from '@/data/projects';
import { Layers, ArrowDown, Info, CheckCircle2 } from 'lucide-react';

export default function InteractiveArchitecture({ nodes }: { nodes: ArchitectureNode[] }) {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode>(nodes[0] || null);

  if (!nodes || nodes.length === 0) return null;

  return (
    <div className="bg-[#0b0e17] border border-surface-border rounded-xl p-5 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-border">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-primary">
            <Layers className="w-3.5 h-3.5" />
            <span>INTERACTIVE ARCHITECTURE TOPOLOGY</span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Click or hover any node in the execution pipeline to inspect runtime responsibilities and technical constraints.
          </p>
        </div>
        <div className="font-mono text-[11px] text-zinc-500 bg-surface-100 border border-surface-border px-2.5 py-1 rounded self-start sm:self-auto">
          {nodes.length} PIPELINE STAGES
        </div>
      </div>

      {/* Architecture Flow Diagram */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
        {nodes.map((node, index) => {
          const isSelected = selectedNode?.id === node.id;
          return (
            <div key={node.id} className="flex flex-col items-center">
              <button
                onClick={() => setSelectedNode(node)}
                onMouseEnter={() => setSelectedNode(node)}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-150 relative ${
                  isSelected
                    ? 'bg-primary/10 border-primary shadow-lg shadow-primary/10 scale-[1.02]'
                    : 'bg-surface-100 hover:bg-surface-50 border-surface-border hover:border-zinc-500'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-[10px] text-zinc-500">
                    STAGE 0{index + 1}
                  </span>
                  {isSelected && (
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                  )}
                </div>
                <h4 className="font-bold text-sm text-white truncate">{node.name}</h4>
                <p className="font-mono text-[11px] text-emerald-400/90 mt-0.5">{node.role}</p>
                <span className="inline-block mt-2 font-mono text-[10px] bg-black/40 border border-white/5 text-zinc-400 px-1.5 py-0.5 rounded truncate max-w-full">
                  {node.tech}
                </span>
              </button>

              {/* Step indicator arrow for mobile & desktop */}
              {index < nodes.length - 1 && (
                <div className="md:hidden py-1 text-zinc-600 flex justify-center">
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Node Details Panel */}
      {selectedNode && (
        <div className="bg-[#0e121e] border border-primary/30 rounded-lg p-5 animate-in fade-in duration-150">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <h4 className="font-bold text-sm text-white">
                  {selectedNode.name} — Execution Details
                </h4>
              </div>
              <p className="font-mono text-xs text-cyan-400">
                Primary Technology: {selectedNode.tech}
              </p>
            </div>
            <span className="font-mono text-xs text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
              ROLE: {selectedNode.role}
            </span>
          </div>

          <div className="mt-3 pt-3 border-t border-white/5 text-xs sm:text-sm text-zinc-300 leading-relaxed flex items-start gap-2">
            <Info className="w-4 h-4 text-zinc-500 flex-shrink-0 mt-0.5" />
            <p>{selectedNode.details}</p>
          </div>
        </div>
      )}
    </div>
  );
}
