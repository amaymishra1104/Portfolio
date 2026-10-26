import React from 'react';
import ScrollyCanvas from '@/components/scrollytelling/ScrollyCanvas';
import Projects from '@/components/scrollytelling/Projects';

export default function ScrollyPortfolioPage() {
  return (
    <main className="w-full bg-[#121212] min-h-screen text-white selection:bg-white/30 selection:text-white overflow-x-hidden">
      {/* Scroll-linked Canvas Sequence */}
      <ScrollyCanvas />

      {/* Modern Work Grid */}
      <Projects />
    </main>
  );
}
