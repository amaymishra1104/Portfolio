'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Code } from 'lucide-react';
import { projects, Project } from '@/data/projects';
import ProjectCard from './ProjectCard';

type CategoryFilter = 'ALL' | 'AI / AGENTS' | 'FULL STACK' | 'ML / DATA';

const CATEGORIES: CategoryFilter[] = ['ALL', 'AI / AGENTS', 'FULL STACK', 'ML / DATA'];

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('ALL');

  const filtered =
    selectedCategory === 'ALL'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="featured-work" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-primary mb-2">
            <Code className="w-3.5 h-3.5" />
            <span>01 // PRODUCTION ARCHITECTURES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            SELECTED WORK
          </h2>
          <p className="text-sm text-zinc-400 mt-1 max-w-xl">
            Systems I&apos;ve built, shipped, and experimented with—spanning autonomous agent execution rails, candidate evaluation engines, computer vision, and high-concurrency backends.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-surface-100 border border-surface-border rounded-lg self-start md:self-auto">
          {CATEGORIES.map((cat) => {
            const count =
              cat === 'ALL'
                ? projects.length
                : projects.filter((p) => p.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`font-mono text-xs px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-primary text-black font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-surface-50'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1 rounded ${
                    isSelected ? 'bg-black/20 text-black' : 'bg-zinc-800 text-zinc-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {/* Footer link to complete work catalog */}
      <div className="mt-12 text-center">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-primary hover:text-emerald-300 transition-colors p-2"
        >
          <span>VIEW FULL SYSTEMS SPECIFICATION CATALOG</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
