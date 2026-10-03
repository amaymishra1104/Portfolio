'use client';

import React from 'react';
import Link from 'next/link';
import { Terminal, Github, Linkedin, Mail, ArrowUpRight, Cpu } from 'lucide-react';
import { triggerOpenTerminal, triggerOpenAI } from '@/lib/store';

export default function Footer() {
  return (
    <footer className="w-full bg-[#050609] border-t border-surface-border mt-24 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Col 1: System info */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-xs tracking-wider text-zinc-200 font-semibold">
              AMAY.OS — SYSTEM ONLINE
            </span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            AI / ML Engineer & Full-Stack Developer. Building autonomous agent protocols, high-concurrency backends, and full-stack software.
          </p>
          <div className="font-mono text-[11px] text-zinc-500 space-y-1">
            <p>LOCATION: Indore, India (IST UTC+5:30)</p>
            <p>INSTITUTION: Acropolis CS & IT &apos;27</p>
          </div>
        </div>

        {/* Col 2: Navigation */}
        <div className="space-y-2">
          <h3 className="font-mono text-xs text-zinc-400 tracking-wider">NAVIGATION</h3>
          <ul className="space-y-1.5 font-mono text-xs text-zinc-400">
            <li>
              <Link href="/work" className="hover:text-primary transition-colors flex items-center gap-1">
                Selected Work <ArrowUpRight className="w-3 h-3 text-zinc-600" />
              </Link>
            </li>
            <li>
              <Link href="/lab" className="hover:text-primary transition-colors flex items-center gap-1">
                Live Engineering Lab <ArrowUpRight className="w-3 h-3 text-zinc-600" />
              </Link>
            </li>
            <li>
              <Link href="/build-log" className="hover:text-primary transition-colors flex items-center gap-1">
                Build Log & Changelog <ArrowUpRight className="w-3 h-3 text-zinc-600" />
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-primary transition-colors flex items-center gap-1">
                About & Experience <ArrowUpRight className="w-3 h-3 text-zinc-600" />
              </Link>
            </li>
            <li>
              <Link href="/github" className="hover:text-primary transition-colors flex items-center gap-1">
                Live GitHub Activity <ArrowUpRight className="w-3 h-3 text-zinc-600" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Interactive Utilities */}
        <div className="space-y-2">
          <h3 className="font-mono text-xs text-zinc-400 tracking-wider">INTERACTION</h3>
          <div className="space-y-2">
            <button
              onClick={() => triggerOpenTerminal()}
              className="w-full text-left flex items-center justify-between p-2 rounded bg-surface-100/60 border border-surface-border hover:border-accent text-xs font-mono text-zinc-300 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-accent" />
                <span>Global Terminal</span>
              </span>
              <span className="text-[10px] text-zinc-500">Ctrl+`</span>
            </button>
            <button
              onClick={() => triggerOpenAI()}
              className="w-full text-left flex items-center justify-between p-2 rounded bg-surface-100/60 border border-surface-border hover:border-primary text-xs font-mono text-zinc-300 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-primary" />
                <span>AMAY AI Assistant</span>
              </span>
              <span className="text-[10px] text-zinc-500">RAG</span>
            </button>
          </div>
        </div>

        {/* Col 4: Network & Connect */}
        <div className="space-y-2">
          <h3 className="font-mono text-xs text-zinc-400 tracking-wider">CONNECT</h3>
          <div className="flex flex-col space-y-2 font-mono text-xs">
            <a
              href="https://github.com/amaymishra1104"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>github.com/amaymishra1104</span>
            </a>
            <a
              href="https://linkedin.com/in/amaymishra"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
              <span>LinkedIn</span>
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 text-zinc-400 hover:text-primary transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-primary" />
              <span>Direct Transmission</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-500">
        <p>© {new Date().getFullYear()} Amay Mishra. All engineering architectures verified.</p>
        <p className="mt-2 sm:mt-0 flex items-center gap-1.5">
          <span>BUILT WITH NEXT.JS · FASTAPI · RAG · TAILWIND</span>
        </p>
      </div>
    </footer>
  );
}
