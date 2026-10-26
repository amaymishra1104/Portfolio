import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, FileDown, ExternalLink } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume | Amay Mishra — AI/ML & Software Engineer',
  description: 'View and download the professional resume and engineering qualifications of Amay Mishra.',
};

export default function ResumePage() {
  const resumePdfPath = portfolioData.personal.resumePath;
  const resumeImgPath = '/Amay_Mishra_Resume.png';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-textMuted hover:text-sage transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO PORTFOLIO</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <a
            href={resumePdfPath}
            download="Amay_Mishra_Resume.pdf"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-terracotta hover:bg-terracotta-hover transition-colors shadow-sm"
          >
            <FileDown className="w-4 h-4" />
            <span>Download PDF</span>
          </a>

          <a
            href={resumePdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-zinc-700 hover:border-sage shadow-md transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5 text-sage-light" />
            <span>Full Tab</span>
          </a>
        </div>
      </div>

      {/* Header */}
      <div className="space-y-1 pb-4 border-b border-borderSubtle">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-textMain tracking-tight">
          Amay Mishra — Resume
        </h1>
        <p className="text-xs sm:text-sm text-textMuted font-mono">
          Final-year B.Tech CSIT · AI/ML Engineer · Software Engineer
        </p>
      </div>

      {/* Full Document View */}
      <div className="w-full flex justify-center bg-zinc-200/80 dark:bg-zinc-950 p-4 sm:p-8 rounded-3xl border border-borderSubtle shadow-soft">
        <div className="w-full max-w-[850px] bg-white rounded-xl shadow-2xl overflow-hidden border border-zinc-300 dark:border-zinc-800 ring-1 ring-black/5">
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

      {/* Direct Download Line */}
      <div className="p-4 rounded-xl bg-card border border-borderSubtle flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-textMuted font-mono">
        <span>Need the vector PDF file for job portals or ATS scanners?</span>
        <a
          href={resumePdfPath}
          download="Amay_Mishra_Resume.pdf"
          className="text-terracotta hover:underline font-semibold inline-flex items-center gap-1.5"
        >
          <FileDown className="w-4 h-4" />
          <span>Download Amay_Mishra_Resume.pdf directly</span>
        </a>
      </div>
    </div>
  );
}
