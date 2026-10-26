'use client';

import React, { useEffect } from 'react';
import { X, FileDown, ExternalLink } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const resumePath = portfolioData.personal.resumePath;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/80 backdrop-blur-md sm:backdrop-blur-lg animate-fade-in transition-all duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[95vh] flex flex-col rounded-3xl bg-[#FAFDFE] dark:bg-[#151B19] border-2 border-sage/40 dark:border-sage/50 shadow-2xl overflow-hidden text-textMain"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 border-b border-borderSubtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-cardSubtle/70">
          <div>
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
              <span className="font-mono text-xs text-sage font-semibold uppercase tracking-wider">
                Official Curriculum Vitae
              </span>
            </div>
            <h3 id="resume-modal-title" className="font-serif text-xl sm:text-2xl font-bold text-textMain mt-1">
              Amay Mishra — Resume
            </h3>
            <p className="text-xs text-textMuted font-mono">
              AI/ML Engineer · Software Engineer · Bengaluru, India
            </p>
          </div>

          {/* Action Toolbar with Dark High-Contrast Buttons */}
          <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
            {/* Download Button */}
            <a
              href={resumePath}
              download="Amay_Mishra_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-terracotta hover:bg-terracotta-hover transition-all duration-200 shadow-sm"
              title="Download PDF to your computer"
            >
              <FileDown className="w-4 h-4" />
              <span>Download PDF</span>
            </a>

            {/* Dark & Prominently Visible Full Tab Button */}
            <a
              href={resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-zinc-700 hover:border-sage shadow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
              title="Open raw PDF in new browser tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-sage-light" />
              <span>Full Tab</span>
            </a>

            {/* Dark & Prominently Visible Cancel / Cross Button */}
            <button
              onClick={onClose}
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-zinc-700 hover:border-terracotta shadow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta"
              aria-label="Close resume viewer"
              title="Close (Esc)"
            >
              <X className="w-4 h-4 text-white" />
              <span className="hidden sm:inline">Close</span>
            </button>
          </div>
        </div>

        {/* PDF Embedded View */}
        <div className="flex-1 w-full bg-[#323639] min-h-[500px] h-[72vh] overflow-hidden relative">
          <iframe
            src={`${resumePath}#toolbar=1&navpanes=0`}
            className="w-full h-full border-0"
            title="Amay Mishra Resume Preview"
          />
        </div>

        {/* Footer info bar */}
        <div className="px-5 py-3 border-t border-borderSubtle bg-cardSubtle/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-textMuted font-mono">
          <span>Having trouble viewing the PDF preview?</span>
          <div className="flex items-center gap-3">
            <a
              href={resumePath}
              download="Amay_Mishra_Resume.pdf"
              className="text-terracotta hover:underline font-medium flex items-center gap-1"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Download PDF directly</span>
            </a>
            <span className="hidden sm:inline">·</span>
            <button
              onClick={onClose}
              className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-[11px] border border-zinc-700 hover:border-terracotta transition-colors"
            >
              Close (Esc)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
