'use client';

import React from 'react';
import { portfolioData } from '@/data/portfolio';
import { Award, ShieldCheck, Trophy, Compass, CheckCircle2, Calendar } from 'lucide-react';

export default function Achievements() {
  return (
    <section id="achievements" className="py-16 md:py-24 border-t border-borderSubtle">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sage" />
            <span className="font-mono text-xs uppercase tracking-wider text-sage font-medium">
              Recognition & Credentials
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-textMain tracking-tight">
            Leadership & Achievements
          </h2>
          <p className="text-base text-textMuted leading-relaxed">
            Global rankings, competitive hackathons, collegiate leadership, and certified domain competencies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Leadership & Competitions (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 pb-2">
              <Trophy className="w-4 h-4 text-terracotta" />
              <h3 className="font-mono text-xs uppercase tracking-wider text-textMuted">
                Honors, Podiums & Leadership
              </h3>
            </div>

            <div className="space-y-4">
              {portfolioData.achievements.map((item) => (
                <div
                  key={item.id}
                  className="p-5 sm:p-6 rounded-2xl bg-card border border-borderSubtle shadow-soft transition-all duration-200 hover:border-sage space-y-2.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-serif text-lg text-textMain font-medium">
                      {item.title}
                    </h4>
                    {item.badge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-sage/10 text-sage border border-sage/20 text-xs font-mono font-medium">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <div className="text-xs font-mono text-sage font-medium">
                    {item.organization}
                  </div>

                  <p className="text-xs sm:text-sm text-textMuted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Industry Certifications (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 pb-2">
              <ShieldCheck className="w-4 h-4 text-sage" />
              <h3 className="font-mono text-xs uppercase tracking-wider text-textMuted">
                Industry Certifications (3)
              </h3>
            </div>

            <div className="space-y-4">
              {portfolioData.certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="p-5 sm:p-6 rounded-2xl bg-card border border-borderSubtle shadow-soft transition-all duration-200 hover:border-sage space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <h4 className="font-serif text-base sm:text-lg text-textMain font-medium leading-snug">
                        {cert.title}
                      </h4>
                      <div className="text-xs font-mono text-sage font-medium">
                        {cert.issuer}
                      </div>
                    </div>
                    <span className="p-2 rounded-xl bg-cardSubtle border border-borderSubtle text-sage shrink-0">
                      <Award className="w-4 h-4" />
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-textMuted">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Issued: {cert.issueDate}</span>
                  </div>

                  <div className="pt-2 border-t border-borderSubtle/60 flex flex-wrap gap-1.5">
                    {cert.skillsLearned.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded-md bg-cardSubtle border border-borderSubtle text-[10px] font-mono text-textMuted"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
