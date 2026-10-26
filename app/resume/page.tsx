import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileDown, ExternalLink } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume | Amay Mishra — AI/ML & Software Engineer',
  description: 'View and download the professional resume and engineering qualifications of Amay Mishra.',
};

export default function ResumePage() {
  const resumePath = portfolioData.personal.resumePath;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-textMuted hover:text-sage transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO PORTFOLIO</span>
        </Link>

        <div className="flex items-center gap-3">
          <a
            href={resumePath}
            download="Amay_Mishra_Resume.pdf"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-terracotta hover:bg-terracotta-hover transition-colors shadow-sm"
          >
            <FileDown className="w-4 h-4" />
            <span>Download PDF</span>
          </a>

          <a
            href={resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono text-textMain bg-card border border-borderSubtle hover:border-sage transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-sage" />
            <span>Full Tab</span>
          </a>
        </div>
      </div>

      {/* Header */}
      <div className="space-y-1 pb-4 border-b border-borderSubtle">
        <h1 className="font-serif text-3xl sm:text-4xl text-textMain tracking-tight">
          Amay Mishra — Resume
        </h1>
        <p className="text-xs sm:text-sm text-textMuted font-mono">
          Final-year B.Tech CSIT · AI/ML Engineer · Software Engineer
        </p>
      </div>

      {/* PDF Container */}
      <div className="w-full h-[80vh] rounded-2xl overflow-hidden border border-borderSubtle shadow-soft bg-[#323639]">
        <iframe
          src={`${resumePath}#toolbar=1&navpanes=0`}
          className="w-full h-full border-0"
          title="Amay Mishra Resume"
        />
      </div>

      {/* Fallback & Direct Download Line */}
      <div className="p-4 rounded-xl bg-card border border-borderSubtle flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-textMuted font-mono">
        <span>Can&apos;t see the PDF preview in your browser?</span>
        <a
          href={resumePath}
          download="Amay_Mishra_Resume.pdf"
          className="text-terracotta hover:underline font-medium inline-flex items-center gap-1.5"
        >
          <FileDown className="w-4 h-4" />
          <span>Click here to download Amay_Mishra_Resume.pdf directly</span>
        </a>
      </div>
    </div>
  );
}
