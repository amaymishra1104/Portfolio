import React from 'react';
import Link from 'next/link';
import { ArrowLeft, GitCommit } from 'lucide-react';
import BuildLogSection from '@/components/build-log/BuildLogSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Build Log & Changelog | Amay Mishra',
  description: 'Chronological changelog documenting architecture iterations, concurrency stress tests, and software rollouts.',
};

export default function BuildLogPage() {
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

      <BuildLogSection />
    </div>
  );
}
