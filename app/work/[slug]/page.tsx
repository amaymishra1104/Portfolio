import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Github, ExternalLink, ShieldCheck, Layers, Terminal, CheckCircle2, AlertCircle } from 'lucide-react';
import { projects, getProjectBySlug } from '@/data/projects';
import InteractiveArchitecture from '@/components/project-case-study/InteractiveArchitecture';
import { Metadata } from 'next';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: 'Project Not Found | Amay Mishra' };

  return {
    title: `${project.name} Case Study | Amay Mishra`,
    description: project.tagline,
  };
}

export default function ProjectCaseStudyPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Navigation Breadcrumb */}
      <div>
        <Link
          href="/work"
          className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO ALL PROJECTS</span>
        </Link>
      </div>

      {/* Project Header */}
      <div className="space-y-4 pb-8 border-b border-surface-border">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
            {project.category}
          </span>
          <span className="font-mono text-xs text-zinc-400 bg-surface-100 border border-surface-border px-2 py-0.5 rounded">
            STATUS: {project.status}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          {project.name}
        </h1>

        <p className="text-lg sm:text-xl text-emerald-400/90 font-medium leading-relaxed">
          {project.tagline}
        </p>

        {/* Action Links */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-100 hover:bg-surface-50 border border-surface-border hover:border-zinc-500 text-zinc-200 font-mono text-xs transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>SOURCE REPOSITORY</span>
              <ExternalLink className="w-3 h-3 text-zinc-500" />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary hover:bg-emerald-400 text-black font-mono text-xs font-semibold transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>OPEN LIVE DEMO</span>
            </a>
          )}
        </div>
      </div>

      {/* Problem & Solution Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-[#0b0e17] border border-surface-border space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-red-400">
            <AlertCircle className="w-4 h-4" />
            <span>THE PROBLEM</span>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">{project.problem}</p>
        </div>

        <div className="p-6 rounded-xl bg-[#0b0e17] border border-surface-border space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>THE SOLUTION</span>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">{project.solution}</p>
        </div>
      </div>

      {/* Interactive Architecture Flow */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs text-primary">
          <Layers className="w-4 h-4" />
          <span>SYSTEM TOPOLOGY &amp; EXECUTION GRAPH</span>
        </div>
        <InteractiveArchitecture nodes={project.architecture} />
      </div>

      {/* Engineering Highlights */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs text-primary">
          <ShieldCheck className="w-4 h-4" />
          <span>ENGINEERING DECISIONS &amp; CONSTRAINTS</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {project.engineeringHighlights.map((highlight, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#0b0e17] border border-surface-border space-y-2"
            >
              <h4 className="font-mono text-xs text-emerald-400 font-bold">
                {highlight.title}
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Code Snippet if present */}
      {project.codeSnippet && (
        <div className="space-y-3">
          <div className="flex items-center justify-between font-mono text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-accent" />
              <span>CORE IMPLEMENTATION: {project.codeSnippet.title}</span>
            </div>
            <span className="text-[10px] text-zinc-500 uppercase">
              {project.codeSnippet.language}
            </span>
          </div>
          <div className="p-5 rounded-xl bg-[#07090e] border border-surface-border font-mono text-xs text-zinc-200 overflow-x-auto leading-relaxed">
            <pre>
              <code>{project.codeSnippet.code}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Tech Stack Badges */}
      <div className="space-y-3">
        <h3 className="font-mono text-xs text-zinc-400">TECHNOLOGY STACK SPECIFICATION</h3>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="font-mono text-xs px-3 py-1 bg-surface-100 border border-surface-border text-zinc-200 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Lessons Learned */}
      <div className="p-6 rounded-xl bg-[#0e121e] border border-surface-border space-y-3">
        <h3 className="font-mono text-xs text-primary font-bold">
          ARCHITECTURAL LESSONS &amp; PRODUCTION TAKEAWAYS
        </h3>
        <ul className="space-y-2 text-xs sm:text-sm text-zinc-300 list-disc list-inside">
          {project.lessons.map((lesson, idx) => (
            <li key={idx} className="leading-relaxed">
              {lesson}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer navigation */}
      <div className="pt-8 border-t border-surface-border flex justify-between items-center text-xs font-mono">
        <Link href="/work" className="text-zinc-400 hover:text-white transition-colors">
          ← Back to Catalog
        </Link>
        <Link href="/lab" className="text-primary hover:underline">
          Explore Interactive Lab Demonstrations →
        </Link>
      </div>
    </div>
  );
}
