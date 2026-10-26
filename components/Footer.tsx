'use client';

import React from 'react';
import { portfolioData } from '@/data/portfolio';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-borderSubtle bg-page py-10 transition-colors">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Monogram and Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-card border border-borderSubtle flex items-center justify-center">
            <span className="font-serif font-bold text-sm text-textMain">
              {portfolioData.personal.monogram}
            </span>
          </div>
          <div className="text-xs text-textMuted font-mono">
            <span>© {new Date().getFullYear()} {portfolioData.personal.name}.</span>
            <span className="hidden sm:inline"> Crafted with Next.js & Tailwind CSS.</span>
          </div>
        </div>

        {/* Right: Back to Top Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={scrollToTop}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-borderSubtle text-xs font-mono text-textMuted hover:text-textMain hover:border-sage transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
