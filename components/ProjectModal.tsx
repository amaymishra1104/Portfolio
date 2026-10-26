'use client';

import React, { useEffect } from 'react';
import { FeaturedProject } from '@/data/portfolio';
import { X, ExternalLink, Github, Layers, Cpu, ShieldAlert, ArrowUpRight } from 'lucide-react';

interface ProjectModalProps {
  project: FeaturedProject | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    // Lock body scroll
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-card border border-borderSubtle shadow-soft-dark p-6 sm:p-8 space-y-6 text-textMain"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 p-2 rounded-xl bg-cardSubtle border border-borderSubtle text-textMuted hover:text-textMain hover:border-sage transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          aria-label="Close architecture modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-8">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sage" />
            <span className="font-mono text-xs text-sage uppercase tracking-wider">
              Architecture & System Highlights
            </span>
          </div>
          <h3 id="modal-project-title" className="font-serif text-2xl sm:text-3xl text-textMain">
            {project.title}
          </h3>
          <p className="text-sm font-medium text-textMuted">{project.subtitle}</p>
        </div>

        {/* Disclaimer if available (DateMind AI) */}
        {project.disclaimer && (
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-cardSubtle border border-borderSubtle text-xs text-textMuted leading-relaxed">
            <ShieldAlert className="w-4 h-4 text-terracotta shrink-0 mt-0.5" />
            <span>{project.disclaimer}</span>
          </div>
        )}

        {/* Overview */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-textMuted">
            Project Overview
          </h4>
          <p className="text-sm sm:text-base text-textMuted leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Architecture Highlights */}
        {project.architectureHighlights && project.architectureHighlights.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-sage" />
              <h4 className="text-xs font-mono uppercase tracking-wider text-textMuted">
                Key Technical Architecture
              </h4>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {project.architectureHighlights.map((arch, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-cardSubtle border border-borderSubtle space-y-1.5"
                >
                  <div className="text-sm font-semibold text-textMain flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
                    <span>{arch.title}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-textMuted leading-relaxed">
                    {arch.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* System Metrics */}
        {project.systemMetrics && project.systemMetrics.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-sage" />
              <h4 className="text-xs font-mono uppercase tracking-wider text-textMuted">
                System Highlights & Metrics
              </h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.systemMetrics.map((metric, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg bg-sage/10 text-sage border border-sage/20 text-xs font-mono"
                >
                  {metric}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Technology Stack */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-textMuted">
            Technologies & Tools
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

        {/* Action Buttons */}
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-textMain bg-cardSubtle border border-borderSubtle hover:border-sage transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            type="button"
            className="text-xs font-mono text-textMuted hover:text-textMain transition-colors"
          >
            Close (Esc)
          </button>
        </div>
      </div>
    </div>
  );
}
