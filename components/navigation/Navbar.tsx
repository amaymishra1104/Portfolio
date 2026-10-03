'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Terminal as TerminalIcon, Menu, X, ArrowUpRight } from 'lucide-react';
import { triggerOpenAI, triggerOpenTerminal } from '@/lib/store';
import { trackEvent } from '@/lib/analytics';

const navItems = [
  { label: 'HOME', href: '/' },
  { label: 'WORK', href: '/work' },
  { label: 'LAB', href: '/lab' },
  { label: 'BUILD LOG', href: '/build-log' },
  { label: 'ABOUT', href: '/about' },
  { label: 'GITHUB', href: '/github' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut listener for terminal and AI
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle terminal with Ctrl+` or `~` or Cmd+K
      if ((e.ctrlKey || e.metaKey) && (e.key === '`' || e.key === '~' || e.key === 'k')) {
        e.preventDefault();
        triggerOpenTerminal();
        trackEvent('terminal_open', { source: 'keyboard_shortcut' });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close mobile drawer on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 border-b ${
        scrolled
          ? 'bg-[#07090e]/90 backdrop-blur-md border-surface-border shadow-lg shadow-black/20'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <Link
          href="/"
          className="flex items-center gap-2 group focus:outline-none focus:ring-1 focus:ring-primary rounded"
          aria-label="Amay Mishra Portfolio Home"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
          </span>
          <span className="font-mono text-sm tracking-widest text-zinc-100 group-hover:text-primary transition-colors font-semibold">
            AMAY.OS
          </span>
          <span className="hidden sm:inline-block font-mono text-[10px] text-zinc-500 bg-surface-100 border border-surface-border px-1.5 py-0.5 rounded">
            v2.4
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`font-mono text-xs px-3 py-1.5 rounded transition-all duration-150 ${
                  isActive
                    ? 'text-primary bg-primary/10 border border-primary/30 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-surface-50'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Global Action CTAs */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={() => {
              triggerOpenTerminal();
              trackEvent('terminal_open', { source: 'navbar_button' });
            }}
            id="nav-terminal-btn"
            className="flex items-center gap-1.5 font-mono text-xs px-2.5 py-1.5 bg-surface-100 hover:bg-surface-50 border border-surface-border hover:border-zinc-500 text-zinc-300 hover:text-zinc-100 rounded transition-all focus:outline-none focus:ring-1 focus:ring-primary"
            title="Open Interactive Terminal (Ctrl+` or Cmd+K)"
          >
            <TerminalIcon className="w-3.5 h-3.5 text-accent" />
            <span>TERMINAL</span>
            <kbd className="hidden lg:inline-block text-[9px] bg-black/40 text-zinc-500 px-1 py-0.2 rounded border border-white/5">
              ^`
            </kbd>
          </button>

          <button
            onClick={() => {
              triggerOpenAI();
              trackEvent('ai_question', { source: 'navbar_button' });
            }}
            id="nav-ask-ai-btn"
            className="flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 bg-primary/15 hover:bg-primary/25 border border-primary/40 hover:border-primary text-primary hover:text-emerald-300 rounded transition-all focus:outline-none focus:ring-1 focus:ring-primary font-medium"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>ASK AMAY AI</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => triggerOpenAI()}
            aria-label="Ask Amay AI"
            className="p-1.5 bg-primary/10 border border-primary/30 text-primary rounded"
          >
            <Sparkles className="w-4 h-4" />
          </button>
          <button
            onClick={() => triggerOpenTerminal()}
            aria-label="Open Terminal"
            className="p-1.5 bg-surface-100 border border-surface-border text-zinc-300 rounded"
          >
            <TerminalIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            className="p-1.5 text-zinc-300 hover:text-white bg-surface-100 border border-surface-border rounded"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0a0d14] border-b border-surface-border px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const isActive =
                item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-mono text-xs p-2.5 rounded border ${
                    isActive
                      ? 'text-primary bg-primary/10 border-primary/30 font-semibold'
                      : 'text-zinc-300 bg-surface-100/50 border-surface-border'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-surface-border flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                triggerOpenAI();
              }}
              className="w-full flex items-center justify-center gap-2 font-mono text-xs py-2.5 bg-primary/15 border border-primary/40 text-primary rounded"
            >
              <Sparkles className="w-4 h-4" />
              <span>ASK AMAY AI</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                triggerOpenTerminal();
              }}
              className="w-full flex items-center justify-center gap-2 font-mono text-xs py-2.5 bg-surface-100 border border-surface-border text-zinc-200 rounded"
            >
              <TerminalIcon className="w-4 h-4" />
              <span>LAUNCH TERMINAL</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
