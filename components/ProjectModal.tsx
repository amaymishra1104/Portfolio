'use client';

import React, { useEffect, useState } from 'react';
import { FeaturedProject, SmallerProject } from '@/data/portfolio';
import { getProjectBySlug, projects as allProjects, ArchitectureNode } from '@/data/projects';
import {
  X,
  ExternalLink,
  Github,
  Layers,
  Cpu,
  ShieldAlert,
  ArrowUpRight,
  CheckCircle2,
  Info,
  Sparkles,
  Workflow,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export type ModalProject = (FeaturedProject | SmallerProject) & {
  subtitle?: string;
  screenshot?: string;
  systemMetrics?: string[];
  disclaimer?: string;
  architectureHighlights?: {
    title: string;
    description: string;
  }[];
};

interface ProjectModalProps {
  project: ModalProject | null;
  onClose: () => void;
}

// Fallback architectural nodes for projects without explicit nodes in projects.ts
const fallbackArchitectureNodes: Record<string, ArchitectureNode[]> = {
  datemind: [
    { id: 'ingest', name: 'Public-Profile Evidence Intake', role: 'Data Ingestion', tech: 'Evidence Normalizer', details: 'Ingests verified behavioral public profiles and normalizes multi-attribute personality vectors.' },
    { id: 'model', name: 'Groq Behavioral Reasoner', role: 'Agent Engine', tech: 'Groq LPUs / Llama 3', details: 'Maintains dual-agent conversational tone, personal preferences, and mutual chemistry metrics.' },
    { id: 'dialogue', name: '5-Round Structured Protocol', role: 'Dialogue Engine', tech: 'State Machine Controller', details: 'Coordinates sequential turn-taking: Introduction, Common Ground, Agent Evaluations, and Compatibility.' },
    { id: 'eval', name: 'Reciprocity & Chemistry Matrix', role: 'Scoring Engine', tech: 'Deterministic Evaluator', details: 'Calculates bilateral affinity vectors and mutual interest scores without subjective bias.' },
    { id: 'report', name: 'Matchmaker Synthesis Output', role: 'Report Formatter', tech: 'Structured JSON Schemas', details: 'Emits comprehensive compatibility diagnostics with conversational highlights.' },
  ],
  lulu: [
    { id: 'speech', name: 'Voice & Speech Input Rail', role: 'Speech Recognition', tech: 'Web Speech API', details: 'Converts candidate/customer voice requests into normalized query text with low latency.' },
    { id: 'intent', name: 'Policy Intent Classifier', role: 'Intent Mapping', tech: 'Regex & Fuzzy Matcher', details: 'Maps queries to return windows, refund policies, exchange terms, or shipping SLAs.' },
    { id: 'corpus', name: 'Structured Policy Corpus', role: 'Knowledge Store', tech: 'In-Memory Policy Base', details: 'Deterministic policy rules governing store operations and logistics guarantees.' },
    { id: 'format', name: 'Contextual Response Formatter', role: 'Response Generator', tech: 'Quick-Reply Formatter', details: 'Synthesizes targeted answers accompanied by one-tap navigational action chips.' },
    { id: 'tts', name: 'Voice Synthesis & Display', role: 'Multimodal Output', tech: 'SpeechSynthesis Engine', details: 'Simultaneously speaks and renders the resolution with active online status indicator.' },
  ],
  documind: [
    { id: 'ast', name: 'Python Source Code Ingestion', role: 'Source Ingestion', tech: 'Python AST Module', details: 'Parses raw Python codebases into syntactically valid Abstract Syntax Trees.' },
    { id: 'extract', name: 'Complexity & Flow Extractor', role: 'Static Analysis', tech: 'AST Visitor & Walkers', details: 'Calculates cyclomatic complexity, control flow branches, and class/function inheritance.' },
    { id: 'topology', name: 'Mermaid Topology Generator', role: 'Graph Engine', tech: 'Mermaid.js Compiler', details: 'Emits visual architecture topology and sequence diagrams representing code dependencies.' },
    { id: 'docs', name: 'Structured Markdown Synthesizer', role: 'Documentation AI', tech: 'LLM Prompt Architecture', details: 'Produces production-ready READMEs, parameter docstrings, and architectural summaries.' },
    { id: 'ui', name: 'Monaco Interactive Visualizer', role: 'Interactive UI', tech: 'Monaco Editor & React', details: 'Real-time side-by-side editing, syntax highlighting, and live diagram preview.' },
  ],
  alexandria: [
    { id: 'intake', name: 'arXiv & Scholar Research Ingestion', role: 'Literature Ingestion', tech: 'arXiv / CrossRef APIs', details: 'Pulls full-text preprint PDFs and extracts bibtex citations and abstract corpora.' },
    { id: 'graph', name: 'Citation Graph Builder', role: 'Knowledge Graph', tech: 'NetworkX / Graph DB', details: 'Maps relational citations, co-authorship networks, and seminal reference hierarchies.' },
    { id: 'vector', name: 'Dense Semantic Vectorizer', role: 'Concept Index', tech: 'SentenceTransformers', details: 'Generates 768-dim embeddings across technical hypotheses and mathematical theorems.' },
    { id: 'synth', name: 'Autonomous Literature Synthesizer', role: 'Reasoning Engine', tech: 'Recursive Summarizer', details: 'Synthesizes comparative literature matrices across competing research methodologies.' },
    { id: 'canvas', name: 'WebGL Knowledge Graph Visualizer', role: 'Graph UI', tech: 'Three.js / Canvas', details: 'Interactive force-directed graph exploration of interconnected academic domains.' },
  ],
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(0);

  useEffect(() => {
    if (!project) return;

    setSelectedNodeIndex(0);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    // Lock body scroll cleanly
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  // Resolve detailed project data and architecture nodes
  const detailedProject =
    getProjectBySlug(project.id) ||
    allProjects.find((p) => p.slug.toLowerCase() === project.id.toLowerCase());

  const architectureNodes: ArchitectureNode[] =
    detailedProject?.architecture ||
    fallbackArchitectureNodes[project.id.toLowerCase()] ||
    (project.architectureHighlights && project.architectureHighlights.length > 0
      ? project.architectureHighlights.map((h, i) => ({
          id: `stage-${i}`,
          name: h.title,
          role: 'Execution Stage',
          tech: project.stack[i % project.stack.length] || 'Core Stack',
          details: h.description,
        }))
      : [
          {
            id: 'stage-1',
            name: `${project.title} Client Interface`,
            role: 'User Rail',
            tech: project.stack[0] || 'Frontend',
            details: 'Handles client-side state, streaming requests, and low-latency interaction handling.',
          },
          {
            id: 'stage-2',
            name: 'API Orchestrator & Logic Gate',
            role: 'Control Plane',
            tech: project.stack[1] || 'Backend API',
            details: 'Performs parameter validation, authentication checks, and business logic execution.',
          },
          {
            id: 'stage-3',
            name: 'Data & State Persistence',
            role: 'Storage Layer',
            tech: project.stack[2] || 'Database',
            details: 'Guarantees transactional consistency, schema integrity, and indexed retrieval.',
          },
        ]);

  // Resolve architecture highlights
  const architectureHighlights =
    project.architectureHighlights && project.architectureHighlights.length > 0
      ? project.architectureHighlights
      : detailedProject?.engineeringHighlights && detailedProject.engineeringHighlights.length > 0
      ? detailedProject.engineeringHighlights
      : [
          {
            title: 'Deterministic Architectural Boundaries',
            description:
              'Engineered with clear separation of concerns between client interaction, backend validation, and persistent storage layers.',
          },
          {
            title: 'Resilient Error Handling & Idempotency',
            description:
              'Guarantees predictable system behavior under network latency, unhandled exceptions, and concurrent execution.',
          },
        ];

  const activeNode = architectureNodes[selectedNodeIndex] || architectureNodes[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/80 backdrop-blur-md sm:backdrop-blur-lg animate-fade-in transition-all duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#FAFDFE] dark:bg-[#151B19] border-2 border-sage/40 dark:border-sage/50 shadow-2xl p-5 sm:p-7 md:p-8 space-y-6 text-textMain transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 p-2 rounded-xl bg-cardSubtle border border-borderSubtle text-textMuted hover:text-textMain hover:border-sage hover:bg-card transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage z-10"
          aria-label="Close architecture modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage/15 border border-sage/30 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
            <span className="font-mono text-xs font-semibold text-sage uppercase tracking-wider">
              Architecture Breakdown & System Topology
            </span>
          </div>
          <h3 id="modal-project-title" className="font-serif text-2xl sm:text-3xl font-bold text-textMain tracking-tight">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="text-sm font-medium text-sage tracking-tight font-mono">{project.subtitle}</p>
          )}
        </div>

        {/* Disclaimer if available (DateMind AI) */}
        {project.disclaimer && (
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-cardSubtle border border-borderSubtle text-xs text-textMuted leading-relaxed">
            <ShieldAlert className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
            <span>{project.disclaimer}</span>
          </div>
        )}

        {/* 🌟 HIGHLIGHTED ARCHITECTURAL BREAKDOWN SECTION (PRIMARY HERO) */}
        <div className="rounded-2xl border-2 border-sage/40 dark:border-sage/50 bg-gradient-to-br from-sage/15 via-cardSubtle/80 to-terracotta/10 p-5 sm:p-6 space-y-6 shadow-lg shadow-sage/5">
          {/* Section Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-borderSubtle">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-textMain font-semibold text-sm">
                <Workflow className="w-4 h-4 text-sage" />
                <span>INTERACTIVE EXECUTION PIPELINE</span>
              </div>
              <p className="text-xs text-textMuted">
                Click or hover any pipeline stage to inspect runtime responsibilities, tech stack, and execution gates.
              </p>
            </div>
            <div className="font-mono text-[11px] font-semibold text-sage bg-sage/15 border border-sage/30 px-2.5 py-1 rounded-lg self-start sm:self-auto shrink-0">
              {architectureNodes.length} EXECUTION STAGES
            </div>
          </div>

          {/* Interactive Topology Flow Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {architectureNodes.map((node, idx) => {
              const isSelected = selectedNodeIndex === idx;
              return (
                <button
                  key={node.id || idx}
                  onClick={() => setSelectedNodeIndex(idx)}
                  onMouseEnter={() => setSelectedNodeIndex(idx)}
                  type="button"
                  className={`text-left p-3 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-card border-sage shadow-md shadow-sage/10 ring-2 ring-sage/30 scale-[1.02]'
                      : 'bg-card/70 hover:bg-card border-borderSubtle hover:border-sage/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="font-mono text-[10px] font-bold text-textMuted">
                      STAGE 0{idx + 1}
                    </span>
                    {isSelected ? (
                      <span className="w-2 h-2 rounded-full bg-sage animate-ping" />
                    ) : (
                      <ArrowRight className="w-3 h-3 text-textMuted opacity-50" />
                    )}
                  </div>
                  <h4 className="font-semibold text-xs text-textMain leading-snug line-clamp-2">
                    {node.name}
                  </h4>
                  <div className="mt-2 pt-1.5 border-t border-borderSubtle/60 flex flex-col gap-1">
                    <span className="font-mono text-[10px] font-medium text-sage truncate">
                      {node.role}
                    </span>
                    <span className="font-mono text-[9px] text-textMuted bg-cardSubtle px-1.5 py-0.5 rounded border border-borderSubtle truncate">
                      {node.tech}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Node Inspector Card */}
          {activeNode && (
            <div className="rounded-xl bg-card border-2 border-sage/50 p-4 sm:p-5 space-y-2.5 shadow-sm transition-all duration-200">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-borderSubtle">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sage shrink-0" />
                  <span className="font-semibold text-sm text-textMain">
                    Stage 0{selectedNodeIndex + 1}: {activeNode.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-md bg-sage/15 text-sage border border-sage/30">
                    Role: {activeNode.role}
                  </span>
                  <span className="font-mono text-xs font-medium px-2.5 py-0.5 rounded-md bg-terracotta/15 text-terracotta border border-terracotta/30">
                    {activeNode.tech}
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-textMain/90 leading-relaxed pt-1">
                <Info className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                <p>{activeNode.details}</p>
              </div>
            </div>
          )}

          {/* Key Technical Architecture Breakdown Cards */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-terracotta" />
              <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-textMain">
                Key Architectural Highlights & Guarantees
              </h4>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {architectureHighlights.map((arch, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-card border-l-4 border-l-terracotta border border-borderSubtle shadow-sm space-y-1.5 hover:border-sage transition-colors"
                >
                  <div className="text-sm font-bold text-textMain flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-terracotta bg-terracotta/10 px-1.5 py-0.5 rounded border border-terracotta/20">
                        0{idx + 1}
                      </span>
                      <span>{arch.title}</span>
                    </div>
                    <ShieldCheck className="w-3.5 h-3.5 text-sage shrink-0" />
                  </div>
                  <p className="text-xs sm:text-sm text-textMain/85 leading-relaxed pl-7">
                    {arch.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Metrics & Production Highlights */}
        {project.systemMetrics && project.systemMetrics.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-sage" />
              <h4 className="text-xs font-mono uppercase tracking-wider text-textMuted font-semibold">
                System Highlights & Metrics
              </h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.systemMetrics.map((metric, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sage/10 text-sage border border-sage/25 text-xs font-mono font-medium shadow-sm"
                >
                  <Sparkles className="w-3 h-3 text-sage" />
                  <span>{metric}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Project Overview */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-textMuted font-semibold">
            System Overview & Implementation
          </h4>
          <p className="text-sm sm:text-base text-textMuted leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Technology Stack */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-textMuted font-semibold">
            Full Technology Stack
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-lg bg-cardSubtle border border-borderSubtle text-xs font-mono text-textMain"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="pt-4 border-t border-borderSubtle flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-white bg-terracotta hover:bg-terracotta-hover transition-colors shadow-sm"
              >
                <span>Open Live Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-textMain bg-cardSubtle border border-borderSubtle hover:border-sage hover:bg-card transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-sage" />
                <span>GitHub Repository</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            type="button"
            className="text-xs font-mono text-textMuted hover:text-textMain px-3 py-1.5 rounded-lg border border-borderSubtle hover:border-sage transition-colors"
          >
            Close (Esc)
          </button>
        </div>
      </div>
    </div>
  );
}
