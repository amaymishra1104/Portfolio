'use client';

import React from 'react';
import { portfolioData } from '@/data/portfolio';
import { Code2, Brain, Layers, Server, Database, Check } from 'lucide-react';

export default function Skills() {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-5 h-5 text-sage" />;
      case 'Brain':
        return <Brain className="w-5 h-5 text-terracotta" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-sage" />;
      case 'Server':
        return <Server className="w-5 h-5 text-sage" />;
      case 'Database':
      default:
        return <Database className="w-5 h-5 text-terracotta" />;
    }
  };

  return (
    <section id="skills" className="py-16 md:py-24 border-t border-borderSubtle">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sage" />
            <span className="font-mono text-xs uppercase tracking-wider text-sage font-medium">
              Technical Capabilities
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-textMain tracking-tight">
            Grouped Skills & Applied Stack
          </h2>
          <p className="text-base text-textMuted leading-relaxed">
            From low-level model inference and mathematical formulations to enterprise backend systems and resilient interfaces.
          </p>
        </div>

        {/* Grouped Visual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.skills.map((cat, idx) => (
            <div
              key={cat.id}
              className={`p-6 rounded-2xl bg-card border border-borderSubtle shadow-soft transition-all duration-200 hover:border-sage hover:-translate-y-0.5 space-y-5 ${
                idx === 1 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 rounded-xl bg-cardSubtle border border-borderSubtle/60">
                    {getCategoryIcon(cat.iconName)}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-medium text-textMain">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-textMuted leading-snug">
                      {cat.description}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-textMuted shrink-0">
                  {cat.skills.length} skills
                </span>
              </div>

              {/* Skill Badge Chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cardSubtle border border-borderSubtle text-xs font-mono text-textMain transition-colors hover:border-sage hover:bg-sage/10 hover:text-textMain cursor-default"
                  >
                    <span className="w-1 h-1 rounded-full bg-sage/60" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
