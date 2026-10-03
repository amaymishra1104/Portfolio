'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { GitCommit, Tag, ArrowRight, ArrowUpRight } from 'lucide-react';
import { buildLogData, BuildLogEntry } from '@/data/build-log';

type TagFilter = 'ALL' | 'AI' | 'FULL STACK' | 'BACKEND' | 'ML' | 'EXPERIMENTS';
const TAGS: TagFilter[] = ['ALL', 'AI', 'FULL STACK', 'BACKEND', 'ML', 'EXPERIMENTS'];

export default function BuildLogSection() {
  const [selectedTag, setSelectedTag] = useState<TagFilter>('ALL');

  const filtered =
    selectedTag === 'ALL'
      ? buildLogData
      : buildLogData.filter((b) => b.tags.includes(selectedTag as any));

  return (
    <section id="build-log" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-surface-border">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-primary mb-2">
            <GitCommit className="w-3.5 h-3.5" />
            <span>05 // ENGINEERING CHANGELOG</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            BUILD LOG
          </h2>
          <p className="text-sm text-zinc-400 mt-1 max-w-xl">
            A developer changelog documenting architecture iterations, concurrency stress tests, model calibrations, and production rollouts.
          </p>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-surface-100 border border-surface-border rounded-lg self-start md:self-auto font-mono text-xs">
          {TAGS.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTag(t)}
              className={`px-3 py-1.5 rounded-md transition-all ${
                selectedTag === t
                  ? 'bg-primary text-black font-semibold'
                  : 'text-zinc-400 hover:text-white hover:bg-surface-50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline items */}
      <div className="relative border-l border-surface-border ml-3 sm:ml-6 pl-6 sm:pl-8 space-y-8">
        {filtered.map((item) => (
          <div key={item.id} className="relative group">
            {/* Timeline node icon */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-3.5 w-3.5 rounded-full bg-[#07090e] border-2 border-primary group-hover:bg-primary transition-colors" />

            <div className="p-5 sm:p-6 rounded-xl bg-[#0b0e17] border border-surface-border hover:border-zinc-500 transition-all space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-primary font-bold">{item.monthYear}</span>
                  {item.commitHash && (
                    <span className="text-zinc-500 bg-surface-100 border border-surface-border px-1.5 py-0.5 rounded text-[10px]">
                      #{item.commitHash}
                    </span>
                  )}
                </div>

                {item.metrics && (
                  <span className="font-mono text-[11px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
                    {item.metrics}
                  </span>
                )}
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {item.description}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/5">
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((t) => (
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
                    className="inline-flex items-center gap-1 font-mono text-xs text-primary hover:underline"
                  >
                    <span>Inspect {item.projectName}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/build-log"
          className="inline-flex items-center gap-2 font-mono text-xs text-primary hover:text-emerald-300 transition-colors"
        >
          <span>VIEW FULL BUILD LOG CHRONOLOGY</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
