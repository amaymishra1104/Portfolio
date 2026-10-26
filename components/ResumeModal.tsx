'use client';

import React, { useEffect } from 'react';
import { X, FileDown, ExternalLink, Printer } from 'lucide-react';
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[95vh] flex flex-col rounded-3xl bg-card border border-borderSubtle shadow-soft-dark overflow-hidden text-textMain"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="p-4 sm:p-6 border-b border-borderSubtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-cardSubtle/60">
          <div>
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sage" />
              <span className="font-mono text-xs text-sage uppercase tracking-wider">
                Verified Document
              </span>
            </div>
            <h3 id="resume-modal-title" className="font-serif text-xl sm:text-2xl text-textMain mt-1">
              Amay Mishra — Resume
            </h3>
            <p className="text-xs text-textMuted font-mono">
              AI/ML Engineer · Software Engineer · Bengaluru, India
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            {/* Download Button */}
            <a
              href={resumePath}
              download="Amay_Mishra_Resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-terracotta hover:bg-terracotta-hover transition-all duration-200 shadow-sm"
              title="Download PDF to your computer"
            >
              <FileDown className="w-4 h-4" />
              <span>Download PDF</span>
            </a>

            {/* Open in New Window */}
            <a
              href={resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono text-textMain bg-card border border-borderSubtle hover:border-sage transition-colors"
              title="Open raw PDF in new browser tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-sage" />
              <span>Full Tab</span>
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              type="button"
              className="p-2 rounded-xl bg-card border border-borderSubtle text-textMuted hover:text-textMain hover:border-sage transition-colors"
              aria-label="Close resume viewer"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
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
        <div className="px-6 py-3 border-t border-borderSubtle bg-cardSubtle/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-textMuted font-mono">
          <span>Having trouble viewing the PDF preview?</span>
          <div className="flex items-center gap-3">
            <a
              href={resumePath}
              download="Amay_Mishra_Resume.pdf"
              className="text-terracotta hover:underline font-medium flex items-center gap-1"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Click here to download directly</span>
            </a>
            <span className="hidden sm:inline">·</span>
            <button
              onClick={onClose}
              className="text-textMuted hover:text-textMain transition-colors"
            >
              Close (Esc)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
