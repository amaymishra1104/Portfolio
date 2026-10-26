'use client';

import React from 'react';
import { portfolioData } from '@/data/portfolio';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="py-16 md:py-24 border-t border-borderSubtle">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sage" />
            <span className="font-mono text-xs uppercase tracking-wider text-sage font-medium">
              Work History
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-textMain tracking-tight">
            Industry Experience
          </h2>
          <p className="max-w-xl text-base text-textMuted leading-relaxed">
            Hands-on engineering shipping production-grade full-stack architectures and backend APIs.
          </p>
        </div>

        {/* Experience Timeline Card */}
        <div className="space-y-6">
          {portfolioData.experience.map((item) => (
            <div
              key={item.id}
              className="relative p-6 sm:p-8 rounded-2xl bg-card border border-borderSubtle shadow-soft transition-all duration-200 hover:border-sage"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-borderSubtle">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <h3 className="font-serif text-xl sm:text-2xl text-textMain font-medium">
                      {item.role}
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sage/10 text-sage text-xs font-mono font-medium border border-sage/20">
                      {item.company}
                    </span>
                    {item.institutionNote && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-cardSubtle text-textMuted text-xs font-mono border border-borderSubtle">
                        {item.institutionNote}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-textMuted pt-1">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-sage" />
                      {item.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-terracotta" />
                      {item.location}
                    </span>
                  </div>
                </div>

                <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-cardSubtle border border-borderSubtle text-sage shrink-0">
                  <Briefcase className="w-5 h-5" />
                </div>
              </div>

              {/* Bullet points */}
              <div className="py-6 space-y-3">
                {item.description.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-sage mt-1 shrink-0" />
                    <p className="text-sm sm:text-base text-textMuted leading-relaxed">
                      {bullet}
                    </p>
                  </div>
                ))}
              </div>

              {/* Tech Chips */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-textMuted mr-1">Stack:</span>
                {item.techChips.map((chip) => (
                  <span
                    key={chip}
                    className="px-2.5 py-1 rounded-lg bg-cardSubtle border border-borderSubtle text-xs font-mono text-textMain"
                  >
                    {chip}
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
