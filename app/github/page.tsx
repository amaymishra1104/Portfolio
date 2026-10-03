import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import GitHubSection from '@/components/github/GitHubSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live GitHub Activity | Amay Mishra',
  description: 'Live repositories, language distribution, and commit telemetry for @amaymishra1104.',
};

export default function GitHubPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO SYSTEM ROOT</span>
        </Link>
      </div>

      <GitHubSection />
    </div>
  );
}
