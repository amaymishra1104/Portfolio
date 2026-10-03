'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Cpu, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { skillsData, Skill } from '@/data/skills';

type CategoryFilter = 'ALL' | 'AI / ML' | 'FULL STACK' | 'DATA' | 'INFRASTRUCTURE';
const CATEGORIES: CategoryFilter[] = ['ALL', 'AI / ML', 'FULL STACK', 'DATA', 'INFRASTRUCTURE'];

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('ALL');
  const [selectedSkill, setSelectedSkill] = useState<Skill>(skillsData[0]);

  const filtered =
    activeCategory === 'ALL'
      ? skillsData
      : skillsData.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-surface-border">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-primary mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>02 // TECHNICAL MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            ENGINEERING STACK
          </h2>
          <p className="text-sm text-zinc-400 mt-1 max-w-xl">
            Grouped by actual production usage. Select any technology to inspect implementation contexts and linked projects.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-surface-100 border border-surface-border rounded-lg self-start md:self-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-mono text-xs px-3 py-1.5 rounded-md transition-all ${
                activeCategory === cat
                  ? 'bg-primary text-black font-semibold'
                  : 'text-zinc-400 hover:text-white hover:bg-surface-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Skills Matrix */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filtered.map((skill) => {
            const isSelected = selectedSkill.name === skill.name;
            return (
              <button
                key={skill.name}
                onClick={() => setSelectedSkill(skill)}
                className={`p-4 rounded-xl text-left border transition-all duration-150 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-primary/10 border-primary shadow-lg shadow-primary/10 scale-[1.01]'
                    : 'bg-[#0b0e17] hover:bg-surface-50 border-surface-border hover:border-zinc-500'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-[10px] text-zinc-400">
                      {skill.category}
                    </span>
                    <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.2 rounded">
                      {skill.experienceYears}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-white">{skill.name}</h4>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                    {skill.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>Used in {skill.projectsUsed.length} projects</span>
                  <span className="text-primary group-hover:underline">Inspect →</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Col: Deep Dive Details Panel */}
        <div className="bg-[#0b0e17] border border-surface-border rounded-xl p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-surface-border">
              <span className="font-mono text-xs text-zinc-400">TECHNOLOGY INSPECTOR</span>
              <span className="font-mono text-xs text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
                {selectedSkill.level}
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white">{selectedSkill.name}</h3>
              <p className="font-mono text-xs text-emerald-400 mt-0.5">
                {selectedSkill.category} · {selectedSkill.experienceYears} production track record
              </p>
              <p className="text-sm text-zinc-300 mt-3 leading-relaxed">
                {selectedSkill.description}
              </p>
            </div>

            {/* Where I've used this */}
            <div className="pt-4 border-t border-surface-border">
              <h4 className="font-mono text-xs text-zinc-400 mb-2.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span>WHERE I&apos;VE USED THIS</span>
              </h4>
              <div className="space-y-2">
                {selectedSkill.projectsUsed.map((proj) => (
                  <Link
                    key={proj.slug}
                    href={`/work/${proj.slug}`}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-surface-100 hover:bg-surface-50 border border-surface-border hover:border-primary/40 text-xs font-mono text-zinc-200 transition-colors group"
                  >
                    <span>{proj.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-primary transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-surface-border/50 text-[11px] font-mono text-zinc-500">
            Click any technology card on the left to inspect its implementation footprint.
          </div>
        </div>
      </div>
    </section>
  );
}
