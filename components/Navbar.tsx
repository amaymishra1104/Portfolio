'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/lib/theme';
import { Sun, Moon, Menu, X, FileDown, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import ResumeModal from './ResumeModal';

const NAV_ITEMS = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Leadership & Honors', href: '#achievements' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme, mounted } = useTheme();
  const [activeSection, setActiveSection] = useState<string>('');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [resumeModalOpen, setResumeModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Track active section if on homepage
      if (pathname === '/') {
        const sections = NAV_ITEMS.map((item) => item.href.substring(1));
        const scrollPos = window.scrollY + 120;

        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i]);
          if (el && el.offsetTop <= scrollPos) {
            setActiveSection(sections[i]);
            return;
          }
        }
        if (window.scrollY < 200) {
          setActiveSection('');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === '/') {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileMenuOpen(false);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-page/85 backdrop-blur-md border-b border-borderSubtle py-3 shadow-sm'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Monogram Logo */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="group flex items-center gap-2.5 focus:outline-none"
            aria-label="Amay Mishra Homepage"
          >
            <div className="w-9 h-9 rounded-xl bg-card border border-borderSubtle flex items-center justify-center transition-all duration-200 group-hover:border-sage group-hover:shadow-sm">
              <span className="font-serif font-bold text-base tracking-wider text-textMain group-hover:text-terracotta transition-colors">
                {portfolioData.personal.monogram}
              </span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-serif font-medium text-sm leading-tight text-textMain">
                {portfolioData.personal.name}
              </span>
              <span className="font-mono text-[10px] text-textMuted tracking-tight">
                AI/ML · Systems
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-card/60 backdrop-blur-sm border border-borderSubtle px-3 py-1.5 rounded-full shadow-sm">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === '/' && activeSection === item.href.substring(1);
              const resolvedHref = pathname === '/' ? item.href : `/${item.href}`;

              return (
                <a
                  key={item.name}
                  href={resolvedHref}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-textMain font-semibold bg-sage/15'
                      : 'text-textMuted hover:text-textMain hover:bg-cardSubtle'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-sage" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Actions: Theme Toggle + Resume Button */}
          <div className="flex items-center gap-2.5">
            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              type="button"
              className="w-9 h-9 rounded-xl border border-borderSubtle bg-card flex items-center justify-center text-textMuted hover:text-textMain hover:border-sage transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
              aria-label={
                mounted
                  ? `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`
                  : 'Toggle theme'
              }
            >
              {mounted && theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300 transition-transform hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-sage transition-transform hover:-rotate-12" />
              )}
            </button>

            {/* Resume CTA Button - Opens Interactive Resume Viewer */}
            <button
              onClick={() => setResumeModalOpen(true)}
              type="button"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium text-textMain bg-card border border-borderSubtle hover:border-terracotta hover:text-terracotta transition-all duration-200 shadow-sm"
              title="View and download Amay Mishra's resume"
            >
              <FileDown className="w-3.5 h-3.5 text-terracotta" />
              <span>Resume</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden w-9 h-9 rounded-xl border border-borderSubtle bg-card flex items-center justify-center text-textMain hover:border-sage transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-borderSubtle bg-card/95 backdrop-blur-md px-4 pt-3 pb-5 mt-2 space-y-2">
            <nav className="flex flex-col space-y-1">
              {NAV_ITEMS.map((item) => {
                const resolvedHref = pathname === '/' ? item.href : `/${item.href}`;
                return (
                  <a
                    key={item.name}
                    href={resolvedHref}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="px-3 py-2 text-sm rounded-lg text-textMuted hover:text-textMain hover:bg-cardSubtle transition-colors flex items-center justify-between"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-40" />
                  </a>
                );
              })}
            </nav>
            <div className="pt-2 border-t border-borderSubtle">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setResumeModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-terracotta hover:bg-terracotta-hover transition-colors shadow-sm"
              >
                <FileDown className="w-4 h-4" />
                <span>View &amp; Download Resume (PDF)</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Interactive Resume Viewer Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </>
  );
}
