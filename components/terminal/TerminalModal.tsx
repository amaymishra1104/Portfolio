'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react';
import { projects } from '@/data/projects';
import { skillsData } from '@/data/skills';
import { experienceData } from '@/data/experience';
import { achievementsData } from '@/data/achievements';
import { triggerOpenAI } from '@/lib/store';
import { trackEvent } from '@/lib/analytics';

interface CommandOutput {
  command: string;
  output: React.ReactNode;
}

const AVAILABLE_COMMANDS = [
  'help',
  'about',
  'projects',
  'skills',
  'github',
  'achievements',
  'experience',
  'contact',
  'ask-ai',
  'clear',
  'exit',
];

export default function TerminalModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [logs, setLogs] = useState<CommandOutput[]>([
    {
      command: 'system.init',
      output: (
        <div className="text-zinc-400 space-y-1">
          <p className="text-emerald-400 font-bold">AMAY.OS [Version 2.4.0-prod]</p>
          <p>Type <span className="text-cyan-400 font-semibold">&apos;help&apos;</span> to see available system commands.</p>
        </div>
      ),
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global event listener for opening terminal
  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ command?: string }>;
      setIsOpen(true);
      if (customEvent.detail?.command) {
        executeCommand(customEvent.detail.command);
      }
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    };

    window.addEventListener('amay:open-terminal', handleOpen);
    return () => window.removeEventListener('amay:open-terminal', handleOpen);
  }, []);

  // Keyboard shortcut to close with Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, isOpen]);

  const executeCommand = (cmdStr: string) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    // Add to history
    setHistory((prev) => [...prev, raw]);
    setHistoryIndex(-1);

    const parts = raw.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    let resultNode: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        resultNode = (
          <div className="space-y-1 text-xs">
            <p className="text-zinc-300 font-semibold mb-1">AVAILABLE SYSTEM COMMANDS:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
              <div><span className="text-emerald-400">about</span> — Bio, education &amp; positioning</div>
              <div><span className="text-emerald-400">projects</span> — List production &amp; featured systems</div>
              <div><span className="text-emerald-400">skills</span> — Categorized engineering tech stack</div>
              <div><span className="text-emerald-400">github</span> — Fetch live GitHub repositories &amp; stats</div>
              <div><span className="text-emerald-400">achievements</span> — Competitions &amp; milestones</div>
              <div><span className="text-emerald-400">experience</span> — Industry &amp; engineering timeline</div>
              <div><span className="text-emerald-400">contact</span> — Get contact info &amp; channels</div>
              <div><span className="text-emerald-400">ask-ai &lt;q&gt;</span> — Launch AI assistant with query</div>
              <div><span className="text-emerald-400">clear</span> — Clear terminal output</div>
              <div><span className="text-emerald-400">exit</span> — Close terminal modal</div>
            </div>
          </div>
        );
        break;

      case 'about':
        resultNode = (
          <div className="space-y-1 text-xs">
            <p className="text-zinc-100 font-bold">AMAY MISHRA</p>
            <p className="text-emerald-400">AI / ML Engineer · Full-Stack Developer · AI Agent Builder</p>
            <p className="text-zinc-300">
              Education: B.Tech in CS &amp; IT @ Acropolis Institute of Technology and Research (RGPV &apos;27)
            </p>
            <p className="text-zinc-400">Location: Indore, Madhya Pradesh, India</p>
            <p className="text-zinc-300">
              Focus: Autonomous AI agents, FastAPI backends, RAG pipelines, computer vision, and full-stack software products.
            </p>
          </div>
        );
        break;

      case 'projects':
        resultNode = (
          <div className="space-y-2 text-xs">
            <p className="text-zinc-300 font-semibold">FEATURED ENGINEERING SYSTEMS:</p>
            {projects.map((p) => (
              <div key={p.slug} className="border-l-2 border-primary/40 pl-2.5 py-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-semibold">{p.name}</span>
                  <span className="text-[10px] text-zinc-500 bg-zinc-800 px-1.5 rounded">{p.status}</span>
                </div>
                <p className="text-zinc-400 text-[11px]">{p.tagline}</p>
                <p className="text-zinc-500 text-[10px]">Stack: {p.technologies.join(', ')}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        resultNode = (
          <div className="space-y-2 text-xs">
            {['AI / ML', 'FULL STACK', 'DATA', 'INFRASTRUCTURE'].map((cat) => (
              <div key={cat}>
                <span className="text-cyan-400 font-semibold">{cat}: </span>
                <span className="text-zinc-300">
                  {skillsData
                    .filter((s) => s.category === cat)
                    .map((s) => s.name)
                    .join(' · ')}
                </span>
              </div>
            ))}
          </div>
        );
        break;

      case 'github':
        resultNode = (
          <div className="space-y-1.5 text-xs">
            <p className="text-emerald-400 font-semibold">GITHUB: amaymishra1104</p>
            <p className="text-zinc-300">Public Repositories: 29 | Verified Output</p>
            <p className="text-zinc-400 text-[11px]">
              Top Repos: agentpay-ai, HireIQ, CivicAI, Fraud-Detection-System, CrunchReader, lulu-ai-assistant, OmniPulse
            </p>
            <p className="text-cyan-400 underline">https://github.com/amaymishra1104</p>
          </div>
        );
        break;

      case 'achievements':
        resultNode = (
          <div className="space-y-1.5 text-xs">
            {achievementsData.map((a) => (
              <div key={a.id} className="border-l-2 border-cyan-500/40 pl-2 py-0.5">
                <p className="text-zinc-200 font-medium">{a.title} ({a.year})</p>
                <p className="text-zinc-400 text-[11px]">{a.description}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'experience':
        resultNode = (
          <div className="space-y-2 text-xs">
            {experienceData.map((e) => (
              <div key={e.id} className="border-l-2 border-emerald-500/40 pl-2 py-0.5">
                <p className="text-zinc-200 font-semibold">{e.role} — {e.organization}</p>
                <p className="text-zinc-500 text-[11px]">{e.period} | {e.location}</p>
                <p className="text-zinc-400 text-[11px] mt-0.5">{e.description}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        resultNode = (
          <div className="space-y-1 text-xs">
            <p className="text-zinc-200 font-semibold">CONTACT AMAY MISHRA:</p>
            <p>GitHub: <a href="https://github.com/amaymishra1104" target="_blank" rel="noreferrer" className="text-cyan-400 underline">github.com/amaymishra1104</a></p>
            <p>LinkedIn: <a href="https://linkedin.com/in/amaymishra" target="_blank" rel="noreferrer" className="text-cyan-400 underline">linkedin.com/in/amaymishra</a></p>
            <p>Location: Indore, Madhya Pradesh, India</p>
            <p className="text-zinc-400">Direct message form available on the portfolio home page.</p>
          </div>
        );
        break;

      case 'ask-ai':
        resultNode = (
          <div className="text-xs text-primary">
            Triggering AMAY AI assistant with prompt: &ldquo;{args || 'What projects has Amay built?'}&rdquo;...
          </div>
        );
        setTimeout(() => {
          setIsOpen(false);
          triggerOpenAI(args || 'What projects has Amay built?');
        }, 400);
        break;

      case 'clear':
        setLogs([]);
        return;

      case 'exit':
        setIsOpen(false);
        return;

      default:
        resultNode = (
          <div className="text-xs text-red-400">
            command not found: {cmd}. Type <span className="text-white underline font-semibold">help</span> to view all commands.
          </div>
        );
        break;
    }

    setLogs((prev) => [...prev, { command: raw, output: resultNode }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInput(history[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      if (historyIndex < history.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInput(history[nextIdx]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = AVAILABLE_COMMANDS.find((c) => c.startsWith(input.trim().toLowerCase()));
      if (match) {
        setInput(match);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="terminal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div
        className={`relative w-full ${
          isMaximized ? 'max-w-6xl h-[92vh]' : 'max-w-3xl h-[540px]'
        } bg-[#07090e] border border-surface-border rounded-xl shadow-2xl flex flex-col overflow-hidden text-zinc-100 font-mono transition-all duration-200`}
      >
        {/* Terminal Title Bar */}
        <div className="px-4 py-2.5 bg-[#0e111a] border-b border-surface-border flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 mr-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <TerminalIcon className="w-3.5 h-3.5 text-accent" />
            <span id="terminal-modal-title" className="text-xs text-zinc-300 font-semibold">
              amay@portfolio:~
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 text-zinc-400 hover:text-white rounded hover:bg-surface-50"
              aria-label={isMaximized ? 'Restore Terminal' : 'Maximize Terminal'}
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-zinc-400 hover:text-white rounded hover:bg-surface-50"
              aria-label="Close Terminal"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Command Output Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 font-mono text-xs select-text">
          {logs.map((log, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="text-emerald-400 font-bold">amay@portfolio:~$</span>
                <span className="text-zinc-100">{log.command}</span>
              </div>
              <div className="pl-2 pt-0.5">{log.output}</div>
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Input Line */}
        <div className="px-4 py-3 bg-[#0a0c14] border-t border-surface-border flex items-center gap-2">
          <span className="text-emerald-400 text-xs font-bold whitespace-nowrap">
            amay@portfolio:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command (try 'projects', 'about', 'skills', 'github' or 'help')..."
            className="flex-1 bg-transparent text-xs text-zinc-100 focus:outline-none caret-primary"
            autoFocus
          />
          <button
            onClick={() => {
              executeCommand(input);
              setInput('');
            }}
            className="sm:hidden p-1.5 bg-primary/20 text-primary rounded"
            aria-label="Execute command"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
