import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import AboutSection from '@/components/about/AboutSection';
import ExperienceSection from '@/components/experience/ExperienceSection';
import AchievementsSection from '@/components/achievements/AchievementsSection';
import ContactSection from '@/components/contact/ContactSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Amay Mishra | Background & Experience',
  description: 'AI/ML Engineer, Full-Stack Developer, and AI Agent Builder from Indore, India.',
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-400 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO SYSTEM ROOT</span>
        </Link>
      </div>

      <AboutSection />
      <ExperienceSection />
      <AchievementsSection />
      <ContactSection />
    </div>
  );
}
