'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Github, ExternalLink, Cpu, Layers } from 'lucide-react';
import { Project } from '@/data/projects';
import { trackEvent } from '@/lib/analytics';

export default function ProjectCard({ project }: { project: Project }) {
  const statusColors: Record<string, string> = {
    PRODUCTION: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    'ACTIVE BUILD': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    STABLE: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    RESEARCH: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  };

  return (
    <div className="group relative bg-[#0b0e17] border border-surface-border hover:border-primary/50 rounded-xl p-5 sm:p-6 transition-all duration-200 flex flex-col justify-between hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
      <div>
        {/* Top bar with category & status */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="font-mono text-[10px] text-zinc-400 bg-surface-100 border border-surface-border px-2 py-0.5 rounded tracking-wider">
            {project.category}
          </span>
          <span
            className={`font-mono text-[10px] px-2 py-0.5 rounded border tracking-wider ${
              statusColors[project.status] || 'bg-zinc-800 text-zinc-400 border-zinc-700'
            }`}
          >
            {project.status}
          </span>
        </div>

        {/* Project Title & Tagline */}
        <Link
          href={`/work/${project.slug}`}
          onClick={() => trackEvent('project_view', { project: project.slug })}
          className="block group/link"
        >
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xl font-bold text-white group-hover/link:text-primary transition-colors">
              {project.name}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover/link:text-primary group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </div>
          <p className="text-sm font-medium text-emerald-400/90 mt-1">
            {project.tagline}
          </p>
        </Link>

        {/* Summary */}
        <p className="text-xs text-zinc-400 mt-3 leading-relaxed line-clamp-3">
          {project.summary}
        </p>

        {/* Architecture snippet preview */}
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-zinc-500">
          <Layers className="w-3.5 h-3.5 text-zinc-400" />
          <span className="truncate">
            {project.architecture.map((a) => a.name).join(' → ')}
          </span>
        </div>
      </div>

      {/* Bottom section: tech tags & external links */}
      <div className="mt-6 pt-4 border-t border-surface-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="font-mono text-[10px] text-zinc-400 bg-surface-100/80 px-2 py-0.5 rounded border border-white/5"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="font-mono text-[10px] text-zinc-500 py-0.5">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 font-mono text-xs">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('github_click', { project: project.slug })}
              className="p-1.5 rounded bg-surface-100 hover:bg-surface-50 border border-surface-border hover:border-zinc-500 text-zinc-300 hover:text-white transition-colors"
              title="View Source on GitHub"
              aria-label={`View ${project.name} source on GitHub`}
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary transition-colors"
              title="Open Live Demonstration"
              aria-label={`Open ${project.name} live demonstration`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          <Link
            href={`/work/${project.slug}`}
            className="text-[11px] text-zinc-300 hover:text-primary transition-colors font-medium ml-1"
          >
            Case Study →
          </Link>
        </div>
      </div>
    </div>
  );
}
