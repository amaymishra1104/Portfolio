'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Layers, Code } from 'lucide-react';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/projects/ProjectCard';

type CategoryFilter = 'ALL' | 'AI / AGENTS' | 'FULL STACK' | 'ML / DATA' | 'SYSTEMS';

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('ALL');
  const [query, setQuery] = useState('');

  const filtered = projects.filter((p) => {
    const matchesCat = selectedCategory === 'ALL' || p.category === selectedCategory;
    const matchesQuery =
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.tagline.toLowerCase().includes(query.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Top Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO SYSTEM ROOT</span>
        </Link>
      </div>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 font-mono text-xs text-primary mb-2">
          <Code className="w-3.5 h-3.5" />
          <span>PRODUCTION SOFTWARE &amp; PROTOCOLS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          ENGINEERING WORK
        </h1>
        <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
          Detailed case studies and technical specifications for autonomous agent rails, machine learning pipelines, full-stack clinical applications, and edge computer vision.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects by name, technology (e.g. FastAPI, PyTorch, Next.js)..."
            className="w-full bg-[#0b0e17] border border-surface-border focus:border-primary/50 text-xs text-zinc-100 pl-9 pr-3 py-2.5 rounded-lg focus:outline-none font-mono"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 p-1 bg-surface-100 border border-surface-border rounded-lg self-start sm:self-auto font-mono text-xs">
          {(['ALL', 'AI / AGENTS', 'FULL STACK', 'ML / DATA'] as CategoryFilter[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md transition-all ${
                selectedCategory === cat
                  ? 'bg-primary text-black font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
