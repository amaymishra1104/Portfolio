'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { X, FileDown, ExternalLink, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  useEffect(() => {
    if (!isOpen) return;

    // Reset zoom on open
    setZoomLevel(100);

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

  const resumePdfPath = portfolioData.personal.resumePath;
  const resumeImgPath = '/Amay_Mishra_Resume.png';

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 15, 150));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 15, 80));
  const handleResetZoom = () => setZoomLevel(100);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md sm:backdrop-blur-lg animate-fade-in transition-all duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[96vh] flex flex-col rounded-3xl bg-[#FAFDFE] dark:bg-[#151B19] border-2 border-sage/40 dark:border-sage/50 shadow-2xl overflow-hidden text-textMain"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 border-b border-borderSubtle flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-cardSubtle/70">
          <div>
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
              <span className="font-mono text-xs text-sage font-semibold uppercase tracking-wider">
                Official Curriculum Vitae
              </span>
            </div>
            <h3 id="resume-modal-title" className="font-serif text-xl sm:text-2xl font-bold text-textMain mt-0.5">
              Amay Mishra — Resume
            </h3>
            <p className="text-xs text-textMuted font-mono">
              AI/ML Engineer · Software Engineer · Bengaluru, India
            </p>
          </div>

          {/* Action Toolbar with Dark High-Contrast Buttons */}
          <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
            {/* Zoom Controls */}
            <div className="hidden md:inline-flex items-center gap-1 px-2 py-1 rounded-xl bg-card border border-borderSubtle text-xs font-mono text-textMuted mr-1">
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 80}
                className="p-1 hover:text-textMain disabled:opacity-30 transition-colors"
                title="Zoom Out"
                type="button"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-1.5 text-[11px] font-semibold">{zoomLevel}%</span>
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 150}
                className="p-1 hover:text-textMain disabled:opacity-30 transition-colors"
                title="Zoom In"
                type="button"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              {zoomLevel !== 100 && (
                <button
                  onClick={handleResetZoom}
                  className="p-1 hover:text-sage text-terracotta transition-colors ml-0.5"
                  title="Reset Zoom"
                  type="button"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Download Button */}
            <a
              href={resumePdfPath}
              download="Amay_Mishra_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-terracotta hover:bg-terracotta-hover transition-all duration-200 shadow-sm"
              title="Download official PDF to your computer"
            >
              <FileDown className="w-4 h-4" />
              <span>Download PDF</span>
            </a>

            {/* Dark & Prominently Visible Full Tab Button */}
            <a
              href={resumePdfPath}
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

        {/* Full-Document Visible Viewer (Uses All Available Space cleanly) */}
        <div className="flex-1 w-full max-h-[78vh] overflow-y-auto bg-zinc-200/80 dark:bg-zinc-950 p-3 sm:p-6 md:p-8 flex justify-center">
          <div
            className="w-full transition-all duration-200 flex justify-center"
            style={{ maxWidth: `${Math.round(860 * (zoomLevel / 100))}px` }}
          >
            {/* Document Card with Clean Shadow & Border */}
            <div className="w-full bg-white rounded-xl shadow-2xl overflow-hidden border border-zinc-300 dark:border-zinc-800 ring-1 ring-black/5">
              <Image
                src={resumeImgPath}
                alt="Amay Mishra Resume — AI/ML Engineer & Software Engineer"
                width={1836}
                height={2376}
                priority
                unoptimized
                className="w-full h-auto block select-text"
              />
            </div>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="px-5 py-3 border-t border-borderSubtle bg-cardSubtle/70 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-textMuted font-mono">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sage" />
            <span>Complete 1-page document view · Optimized for high-resolution display</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={resumePdfPath}
              download="Amay_Mishra_Resume.pdf"
              className="text-terracotta hover:underline font-semibold flex items-center gap-1"
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
