'use client';

import React, { useState, useEffect } from 'react';
import { portfolioData } from '@/data/portfolio';
import { ArrowRight, FileDown, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import ResumeModal from './ResumeModal';

// Custom Kaggle icon SVG since lucide doesn't have Kaggle
function KaggleIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.825 23.859c-.022.08-.09.141-.188.141h-3.155c-.13 0-.247-.074-.303-.191l-4.524-8.799-1.921 1.838v6.974c0 .121-.098.219-.219.219H5.733a.219.219 0 0 1-.219-.219V.219C5.514.098 5.612 0 5.733 0h2.782c.121 0 .219.098.219.219v14.417l6.23-6.273c.084-.085.2-.132.32-.132h3.364c.094 0 .162.062.185.139.027.091-.004.187-.072.247l-6.494 5.922 6.502 9.071c.064.06.091.157.06.249z" />
    </svg>
  );
}

export default function Hero() {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [hoveredEthosIndex, setHoveredEthosIndex] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % portfolioData.personal.titles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Background Dot Texture */}
      <div className="absolute inset-0 hero-dot-pattern opacity-60 pointer-events-none" />

      {/* Gentle Radial Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-sage/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-start lg:items-center justify-between gap-10 md:gap-12 lg:gap-16">
          {/* Left Column: Content */}
          <div className="flex-1 text-center md:text-left space-y-6">
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-card border border-borderSubtle text-xs font-mono text-textMuted shadow-soft">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sage" />
              </span>
              <span>{portfolioData.personal.availability}</span>
            </div>

            {/* Main Title & Rotating Subtitle */}
            <div className="space-y-3">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-textMain tracking-tight leading-[1.12]">
                {portfolioData.personal.name}
              </h1>

              {/* Rotating Subtitle with subtle transition */}
              <div className="h-8 flex items-center justify-center md:justify-start overflow-hidden">
                <span
                  key={currentTitleIndex}
                  className="font-mono text-sm sm:text-base text-sage font-medium tracking-wide animate-fade-in transition-all duration-300"
                >
                  {portfolioData.personal.titles[currentTitleIndex]}
                </span>
              </div>
            </div>

            {/* One-Line Value Statement */}
            <p className="max-w-xl text-base sm:text-lg text-textMuted leading-relaxed font-normal">
              {portfolioData.personal.valueStatement}
            </p>

            {/* Call to Actions */}
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-terracotta hover:bg-terracotta-hover transition-all duration-200 shadow-sm group"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                onClick={() => setResumeModalOpen(true)}
                type="button"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-textMain bg-card border border-borderSubtle hover:border-borderHover hover:bg-cardSubtle transition-all duration-200 shadow-soft"
                title="Open resume viewer with download option"
              >
                <FileDown className="w-4 h-4 text-terracotta" />
                <span>View &amp; Download Resume</span>
              </button>
            </div>

            {/* Social Links & Recruiter Quick Contact */}
            <div className="pt-4 flex items-center justify-center md:justify-start gap-3 text-textMuted">
              {portfolioData.socials.map((social) => {
                let iconEl = <ExternalLink className="w-4 h-4" />;
                if (social.icon === 'github') iconEl = <Github className="w-4 h-4" />;
                if (social.icon === 'linkedin') iconEl = <Linkedin className="w-4 h-4" />;
                if (social.icon === 'kaggle') iconEl = <KaggleIcon className="w-4 h-4" />;
                if (social.icon === 'email') iconEl = <Mail className="w-4 h-4" />;

                // Directly open Gmail compose for email icon
                const targetUrl =
                  social.icon === 'email'
                    ? 'https://mail.google.com/mail/?view=cm&fs=1&to=amaymishra1104@gmail.com&su=Inquiry%20from%20Portfolio'
                    : social.url;

                return (
                  <a
                    key={social.name}
                    href={targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-card border border-borderSubtle flex items-center justify-center text-textMuted hover:text-textMain hover:border-sage hover:bg-cardSubtle transition-all duration-200 shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                    aria-label={`Connect on ${social.name}`}
                    title={social.icon === 'email' ? 'Compose email in Gmail directly' : social.label}
                  >
                    {iconEl}
                  </a>
                );
              })}
              <div className="hidden sm:block h-4 w-px bg-borderSubtle mx-2" />
              <span className="hidden sm:inline text-xs font-mono text-textMuted">
                {portfolioData.personal.location}
              </span>
            </div>
          </div>

          {/* Right Column: Shifted Right & Up with Interactive Focus Animations */}
          <div className="relative w-full md:w-auto lg:ml-auto flex flex-col items-center md:items-start text-center md:text-left select-none -translate-y-3 md:-translate-y-6 lg:-translate-y-12 lg:translate-x-10 xl:translate-x-20">
            {/* Ambient Reactive Glow */}
            <div className="absolute -inset-6 bg-gradient-to-tr from-sage/15 via-terracotta/10 to-transparent rounded-full blur-2xl opacity-40 hover:opacity-80 transition-opacity duration-700 pointer-events-none" />

            {/* Interactive Telemetry Indicator */}
            <div className="relative flex items-center justify-center md:justify-start gap-2.5 mb-5 sm:mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card/75 border border-borderSubtle text-xs font-mono text-textMuted shadow-soft backdrop-blur-sm transition-all duration-300 hover:border-sage/60 hover:bg-card cursor-default">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sage" />
                </span>
                <span className="tracking-wider uppercase text-[10px]">Build Philosophy</span>
              </div>
              <span className="hidden sm:inline-block h-px w-10 sm:w-14 bg-gradient-to-r from-borderSubtle via-sage/40 to-transparent" />
            </div>

            {/* Three Stacked Statement Lines with Dynamic Hover Focus */}
            <div
              className="relative space-y-2 sm:space-y-3 font-serif animate-gentle-float"
              onMouseLeave={() => setHoveredEthosIndex(null)}
            >
              {/* Line 1: Less talking. */}
              <div
                onMouseEnter={() => setHoveredEthosIndex(0)}
                className={`group flex items-center justify-center md:justify-start gap-2.5 cursor-pointer transition-all duration-300 ${
                  hoveredEthosIndex !== null && hoveredEthosIndex !== 0
                    ? 'opacity-35 scale-[0.99]'
                    : 'opacity-100 scale-100'
                }`}
              >
                <span
                  className={`inline-block w-2.5 h-2.5 rounded-full bg-sage transition-all duration-300 ${
                    hoveredEthosIndex === 0
                      ? 'scale-100 opacity-100 shadow-[0_0_10px_rgb(var(--accent-sage-rgb))]'
                      : 'scale-0 opacity-0 -mr-2.5'
                  }`}
                />
                <p className="text-[38px] sm:text-[48px] lg:text-[58px] xl:text-[66px] font-medium tracking-tight text-textMain leading-[1.05] transition-all duration-300 group-hover:text-sage group-hover:translate-x-1.5 animate-ethos-1">
                  Less talking.
                </p>
              </div>

              {/* Line 2: More building. */}
              <div
                onMouseEnter={() => setHoveredEthosIndex(1)}
                className={`group flex items-center justify-center md:justify-start gap-2.5 cursor-pointer transition-all duration-300 ${
                  hoveredEthosIndex !== null && hoveredEthosIndex !== 1
                    ? 'opacity-35 scale-[0.99]'
                    : 'opacity-100 scale-100'
                }`}
              >
                <span
                  className={`inline-block w-2.5 h-2.5 rounded-full bg-sage transition-all duration-300 ${
                    hoveredEthosIndex === 1
                      ? 'scale-100 opacity-100 shadow-[0_0_10px_rgb(var(--accent-sage-rgb))]'
                      : 'scale-0 opacity-0 -mr-2.5'
                  }`}
                />
                <p className="text-[38px] sm:text-[48px] lg:text-[58px] xl:text-[66px] font-medium tracking-tight text-textMain leading-[1.05] transition-all duration-300 group-hover:text-sage group-hover:translate-x-1.5 animate-ethos-2">
                  More building.
                </p>
              </div>

              {/* Line 3: Always iterating. */}
              <div
                onMouseEnter={() => setHoveredEthosIndex(2)}
                className={`group flex items-center justify-center md:justify-start gap-2 cursor-pointer pt-2 sm:pt-3 transition-all duration-300 ${
                  hoveredEthosIndex !== null && hoveredEthosIndex !== 2
                    ? 'opacity-35 scale-[0.99]'
                    : 'opacity-100 scale-100'
                }`}
              >
                <span
                  className={`inline-block w-2 h-2 rounded-full bg-terracotta transition-all duration-300 ${
                    hoveredEthosIndex === 2
                      ? 'scale-100 opacity-100 shadow-[0_0_8px_#C97B63]'
                      : 'scale-0 opacity-0 -mr-2'
                  }`}
                />
                <p className="text-[20px] sm:text-[24px] lg:text-[28px] xl:text-[32px] font-normal tracking-tight text-textMuted leading-[1.2] transition-all duration-300 group-hover:text-textMain group-hover:translate-x-1.5 animate-ethos-3">
                  Always iterating.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </section>
  );
}
