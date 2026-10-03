'use client';

import React from 'react';
import { Award, CheckCircle2, ShieldCheck } from 'lucide-react';
import { achievementsData } from '@/data/achievements';

export default function AchievementsSection() {
  return (
    <section id="achievements" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-surface-border">
      <div className="mb-10">
        <div className="flex items-center gap-2 font-mono text-xs text-primary mb-2">
          <Award className="w-3.5 h-3.5" />
          <span>06 // VERIFIED MILESTONES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          ENGINEERING MILESTONES
        </h2>
        <p className="text-sm text-zinc-400 mt-1 max-w-xl">
          Verified hackathon builds, competitive machine learning evaluations, and open-source contributions. No inflated claims.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievementsData.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-xl bg-[#0b0e17] border border-surface-border hover:border-zinc-500 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs text-emerald-400 font-semibold">
                  {item.year}
                </span>
                <span className="font-mono text-[10px] text-zinc-400 bg-surface-100 border border-surface-border px-2 py-0.5 rounded flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-primary" />
                  {item.verificationBadge}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white leading-snug">
                {item.title}
              </h3>
              <p className="font-mono text-xs text-cyan-400">
                {item.organization}
              </p>

              <p className="text-xs text-zinc-400 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] text-zinc-500 bg-surface-100 px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
