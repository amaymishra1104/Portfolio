'use client';

import React from 'react';
import { portfolioData } from '@/data/portfolio';
import { Award, ShieldCheck, Trophy, Boxes } from 'lucide-react';

export default function About() {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Award':
        return <Award className="w-5 h-5 text-sage" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-sage" />;
      case 'Trophy':
        return <Trophy className="w-5 h-5 text-terracotta" />;
      case 'Boxes':
      default:
        return <Boxes className="w-5 h-5 text-sage" />;
    }
  };

  return (
    <section id="about" className="py-16 md:py-24 border-t border-borderSubtle">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sage" />
            <span className="font-mono text-xs uppercase tracking-wider text-sage font-medium">
              About & Focus
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-textMain tracking-tight">
            Engineering intelligent systems from foundation to deployment.
          </h2>
          <p className="text-base sm:text-lg text-textMuted leading-relaxed pt-1">
            {portfolioData.personal.summary}
          </p>
        </div>

        {/* 4-Column Stat Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {portfolioData.stats.map((stat) => (
            <div
              key={stat.id}
              className="group p-6 rounded-2xl bg-card border border-borderSubtle shadow-soft transition-all duration-200 hover:border-sage hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="p-2.5 rounded-xl bg-cardSubtle border border-borderSubtle/60 group-hover:border-sage/40 transition-colors">
                  {getIcon(stat.iconName)}
                </span>
                <span className="font-mono text-xs text-textMuted uppercase tracking-wider">
                  Verified
                </span>
              </div>
              <div className="space-y-1">
                <div className="font-serif text-2xl sm:text-3xl font-medium text-textMain tracking-tight">
                  {stat.metric}
                </div>
                <div className="text-sm font-semibold text-textMain">
                  {stat.label}
                </div>
                <p className="text-xs text-textMuted leading-relaxed pt-1">
                  {stat.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
