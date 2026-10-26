'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { portfolioData, FeaturedProject, SmallerProject } from '@/data/portfolio';
import ProjectModal from './ProjectModal';
import { ExternalLink, Github, Layers, ArrowUpRight, ShieldAlert, Sparkles } from 'lucide-react';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<FeaturedProject | SmallerProject | null>(null);

  return (
    <section id="projects" className="py-16 md:py-24 border-t border-borderSubtle">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sage" />
              <span className="font-mono text-xs uppercase tracking-wider text-sage font-medium">
                Featured Work & Systems
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-textMain tracking-tight">
              Selected AI Products & Architectures
            </h2>
            <p className="text-base text-textMuted leading-relaxed">
              Autonomous agents, RAG engines, voice pipelines, and developer infrastructure built with production rigor.
            </p>
          </div>

          <div className="text-xs font-mono text-textMuted">
            Click any featured card for architecture breakdown
          </div>
        </div>

        {/* Bento Grid: Featured Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {portfolioData.featuredProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col justify-between rounded-3xl bg-card border border-borderSubtle shadow-soft transition-all duration-300 hover:border-sage hover:shadow-soft-dark/10 overflow-hidden"
            >
              <div>
                {/* Soft Browser Frame Mockup */}
                <div className="p-3 sm:p-4 bg-cardSubtle/60 border-b border-borderSubtle">
                  <div className="flex items-center justify-between pb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-terracotta/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-sage/60" />
                    </div>
                    <div className="px-3 py-0.5 rounded-md bg-card border border-borderSubtle/60 text-[11px] font-mono text-textMuted truncate max-w-[220px]">
                      {project.liveUrl.replace('https://', '')}
                    </div>
                    <div className="w-8" />
                  </div>

                  {/* Screenshot Container with Click to Modal */}
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="relative w-full h-52 sm:h-64 rounded-xl overflow-hidden bg-card border border-borderSubtle cursor-pointer group/frame"
                  >
                    <Image
                      src={project.screenshot}
                      alt={`${project.title} interface screenshot`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={`object-cover object-top transition-transform duration-500 group-hover/frame:scale-[1.02] ${
                        project.blurScreenshot ? 'filter blur-[1.5px] scale-[1.03]' : ''
                      }`}
                    />

                    {/* Subtle Overlay Badge on Hover */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover/frame:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-medium">
                      <Layers className="w-4 h-4 text-sage-light" />
                      <span>View Architecture Breakdown</span>
                    </div>

                    {/* Disclaimer badge for DateMind AI */}
                    {project.disclaimer && (
                      <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-lg bg-card/90 backdrop-blur-md border border-borderSubtle text-[10px] text-textMuted flex items-center gap-1.5 truncate">
                        <ShieldAlert className="w-3 h-3 text-terracotta shrink-0" />
                        <span className="truncate">{project.disclaimer}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7 space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3
                        onClick={() => setSelectedProject(project)}
                        className="font-serif text-2xl text-textMain hover:text-terracotta transition-colors cursor-pointer"
                      >
                        {project.title}
                      </h3>
                      <button
                        onClick={() => setSelectedProject(project)}
                        type="button"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cardSubtle border border-borderSubtle text-xs font-mono text-textMain hover:border-sage hover:text-sage hover:bg-card transition-all duration-200 shadow-sm"
                        aria-label={`View architecture details for ${project.title}`}
                      >
                        <Layers className="w-3.5 h-3.5 text-sage" />
                        <span>Architecture</span>
                      </button>
                    </div>
                    <p className="text-xs font-mono text-sage tracking-tight">
                      {project.subtitle}
                    </p>
                  </div>

                  <p className="text-sm text-textMuted leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.stack.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md bg-cardSubtle border border-borderSubtle text-[11px] font-mono text-textMuted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 pb-6 pt-2 border-t border-borderSubtle/60 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium text-white bg-terracotta hover:bg-terracotta-hover transition-colors shadow-sm"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-textMain bg-cardSubtle border border-borderSubtle hover:border-sage transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setSelectedProject(project)}
                  type="button"
                  className="text-xs font-mono text-textMuted hover:text-sage transition-colors flex items-center gap-1"
                >
                  <span>Highlights</span>
                  <Sparkles className="w-3 h-3 text-sage" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Smaller Cards Header */}
        <div className="pt-8 space-y-2">
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sage" />
            <h3 className="font-mono text-xs uppercase tracking-wider text-textMuted">
              Additional Engineering Systems & Labs
            </h3>
          </div>
        </div>

        {/* Smaller Cards Grid (5-9) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.smallerProjects.map((p, idx) => {
            // Theme gradient covers for cards without screenshots
            const gradientVariants = [
              'from-sage/20 via-card to-cardSubtle',
              'from-terracotta/20 via-card to-cardSubtle',
              'from-cardSubtle via-sage/10 to-card',
              'from-card to-cardSubtle',
              'from-sage/15 via-terracotta/10 to-card',
            ];
            const gradientClass = gradientVariants[idx % gradientVariants.length];

            return (
              <div
                key={p.id}
                className="group flex flex-col justify-between rounded-2xl bg-card border border-borderSubtle shadow-soft transition-all duration-200 hover:border-sage overflow-hidden"
              >
                <div>
                  {/* Clean Theme-Colored Gradient Cover */}
                  <div
                    className={`h-20 w-full bg-gradient-to-br ${gradientClass} border-b border-borderSubtle p-4 flex items-center justify-between`}
                  >
                    <span className="font-mono text-xs text-textMuted">
                      0{idx + 5}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-sage/40 group-hover:bg-sage transition-colors" />
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <h4
                        onClick={() => setSelectedProject(p)}
                        className="font-serif text-lg font-medium text-textMain group-hover:text-terracotta transition-colors cursor-pointer"
                      >
                        {p.title}
                      </h4>
                      {p.isPlaceholder && (
                        <span className="px-2.5 py-0.5 rounded-full bg-cardSubtle border border-borderSubtle text-[10px] font-mono text-sage">
                          In Active Build
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-textMuted leading-relaxed line-clamp-3">
                      {p.description}
                    </p>

                    {/* Tags */}
                    {p.stack.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {p.stack.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-0.5 rounded-md bg-cardSubtle border border-borderSubtle text-[10px] font-mono text-textMuted"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Link / Architecture Action */}
                <div className="p-5 pt-3 border-t border-borderSubtle/60 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedProject(p)}
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-borderSubtle text-xs font-mono text-textMuted hover:text-textMain hover:border-sage hover:bg-cardSubtle transition-all duration-200 shadow-sm"
                    aria-label={`View architecture details for ${p.title}`}
                  >
                    <Layers className="w-3.5 h-3.5 text-sage" />
                    <span>Architecture</span>
                  </button>

                  {p.repoUrl ? (
                    <a
                      href={p.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cardSubtle border border-borderSubtle text-xs font-mono text-textMain hover:border-sage hover:text-sage hover:bg-card transition-all duration-200 shadow-sm group/btn"
                    >
                      <Github className="w-3.5 h-3.5 text-sage" />
                      <span>View Repo</span>
                      <ArrowUpRight className="w-3 h-3 opacity-60 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </a>
                  ) : (
                    <span className="text-xs font-mono text-textMuted">
                      {p.isPlaceholder ? 'Research & Prototype' : 'Documentation'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Architecture Highlights Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
