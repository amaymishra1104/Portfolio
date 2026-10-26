'use client';

import React from 'react';
import { portfolioData } from '@/data/portfolio';
import { GraduationCap, Calendar, MapPin, BookOpen } from 'lucide-react';

export default function Education() {
  const { education } = portfolioData;

  return (
    <section id="education" className="py-16 md:py-24 border-t border-borderSubtle">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sage" />
            <span className="font-mono text-xs uppercase tracking-wider text-sage font-medium">
              Academic Background
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-textMain tracking-tight">
            Education
          </h2>
          <p className="text-base text-textMuted leading-relaxed">
            Rigorous undergraduate foundations in computing algorithms, software theory, and mathematical systems.
          </p>
        </div>

        {/* Education Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-card border border-borderSubtle shadow-soft transition-all duration-200 hover:border-sage space-y-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-borderSubtle">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <h3 className="font-serif text-xl sm:text-2xl text-textMain font-medium">
                  {education.degree}
                </h3>
              </div>
              <div className="text-sm font-medium text-sage">
                {education.institution}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-textMuted pt-1">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-sage" />
                  {education.period}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-terracotta" />
                  {education.location}
                </span>
              </div>
            </div>

            <div className="hidden sm:flex items-center justify-center w-11 h-11 rounded-xl bg-cardSubtle border border-borderSubtle text-sage shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
          </div>

          <p className="text-sm sm:text-base text-textMuted leading-relaxed">
            {education.description}
          </p>

          {/* Coursework Chips */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2 text-xs font-mono text-textMuted">
              <BookOpen className="w-3.5 h-3.5 text-sage" />
              <span>Core Relevant Coursework:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {education.coursework.map((course) => (
                <span
                  key={course}
                  className="px-3 py-1 rounded-xl bg-cardSubtle border border-borderSubtle text-xs font-mono text-textMain"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
