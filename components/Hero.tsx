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
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left Column: Content */}
          <div className="flex-1 text-center lg:text-left space-y-6">
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
              <div className="h-8 flex items-center justify-center lg:justify-start overflow-hidden">
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
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
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
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-3 text-textMuted">
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

          {/* Right Column: Open Minimalist Statement */}
          <div className="w-full lg:w-auto lg:max-w-md xl:max-w-lg flex flex-col items-center lg:items-start text-center lg:text-left select-none">
            {/* Minimal Accent: Glowing Beacon Dot with Hairline Accent */}
            <div className="flex items-center gap-2.5 mb-5 sm:mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sage" />
              </span>
              <span className="h-px w-10 sm:w-14 bg-borderSubtle" />
            </div>

            {/* Three Stacked Statement Lines */}
            <div className="space-y-2 sm:space-y-3 font-serif">
              <p className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[52px] font-normal tracking-tight text-textMain leading-[1.12] transition-colors duration-300 hover:text-sage animate-fade-in-up">
                Less talking.
              </p>
              <p className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[52px] font-normal tracking-tight text-textMain leading-[1.12] transition-colors duration-300 hover:text-sage animate-fade-in-up [animation-delay:120ms]">
                More building.
              </p>
              <p className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-normal tracking-tight text-textMuted leading-[1.16] pt-1 sm:pt-2 transition-colors duration-300 hover:text-textMain animate-fade-in-up [animation-delay:240ms]">
                Always iterating.
              </p>
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
