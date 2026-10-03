'use client';

import React from 'react';
import Link from 'next/link';
import { Briefcase, ArrowUpRight, GraduationCap } from 'lucide-react';
import { experienceData } from '@/data/experience';

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-surface-border">
      <div className="mb-10">
        <div className="flex items-center gap-2 font-mono text-xs text-primary mb-2">
          <Briefcase className="w-3.5 h-3.5" />
          <span>08 // WORK HISTORY &amp; EDUCATION</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          ENGINEERING EXPERIENCE
        </h2>
        <p className="text-sm text-zinc-400 mt-1 max-w-xl">
          Systems engineering leadership, production healthcare product development, and academic foundations.
        </p>
      </div>

      <div className="space-y-6">
        {experienceData.map((item) => (
          <div
            key={item.id}
            className="p-6 sm:p-7 rounded-xl bg-[#0b0e17] border border-surface-border hover:border-zinc-500 transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  {item.type === 'Education' ? (
                    <GraduationCap className="w-4 h-4 text-cyan-400" />
                  ) : (
                    <Briefcase className="w-4 h-4 text-primary" />
                  )}
                  <h3 className="text-lg font-bold text-white">{item.role}</h3>
                </div>
                <p className="font-mono text-xs text-emerald-400 mt-0.5">
                  {item.organization} · {item.location}
                </p>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-zinc-400 bg-surface-100 border border-surface-border px-2.5 py-1 rounded">
                  {item.period}
                </span>
                {item.current && (
                  <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded">
                    CURRENT
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {item.description}
            </p>

            <ul className="space-y-1.5 text-xs text-zinc-400 list-disc list-inside">
              {item.highlights.map((h, i) => (
                <li key={i} className="leading-relaxed">
                  {h}
                </li>
              ))}
            </ul>

            <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {item.technologies.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] text-zinc-500 bg-surface-100 px-2 py-0.5 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {item.projectSlug && (
                <Link
                  href={`/work/${item.projectSlug}`}
                  className="font-mono text-xs text-primary hover:underline inline-flex items-center gap-1"
                >
                  <span>Associated Project System</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
