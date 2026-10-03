import React from 'react';
import Hero from '@/components/hero/Hero';
import LiveStatus from '@/components/hero/LiveStatus';
import ProjectsSection from '@/components/projects/ProjectsSection';
import SkillsSection from '@/components/skills/SkillsSection';
import LiveLabSection from '@/components/live-lab/LiveLabSection';
import GitHubSection from '@/components/github/GitHubSection';
import BuildLogSection from '@/components/build-log/BuildLogSection';
import AchievementsSection from '@/components/achievements/AchievementsSection';
import AboutSection from '@/components/about/AboutSection';
import ExperienceSection from '@/components/experience/ExperienceSection';
import ContactSection from '@/components/contact/ContactSection';

export default function HomePage() {
  return (
    <div className="w-full space-y-4">
      <Hero />
      <LiveStatus />
      <ProjectsSection />
      <SkillsSection />
      <LiveLabSection />
      <GitHubSection />
      <BuildLogSection />
      <AchievementsSection />
      <AboutSection />
      <ExperienceSection />
      <ContactSection />
    </div>
  );
}
