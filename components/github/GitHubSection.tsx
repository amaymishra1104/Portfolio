'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Github, Star, GitFork, ExternalLink, Code2, Search, ArrowRight, Loader2 } from 'lucide-react';
import { GitHubRepo, GitHubUser, LanguageStat, fallbackRepos, fallbackUser, computeLanguageStats } from '@/lib/github';
import { formatDate } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';

export default function GitHubSection() {
  const [user, setUser] = useState<GitHubUser>(fallbackUser);
  const [repos, setRepos] = useState<GitHubRepo[]>(fallbackRepos);
  const [languageStats, setLanguageStats] = useState<LanguageStat[]>(computeLanguageStats(fallbackRepos));
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedLang, setSelectedLang] = useState<string>('ALL');

  useEffect(() => {
    async function loadGitHub() {
      try {
        const res = await fetch('/api/github');
        if (res.ok) {
          const data = await res.json();
          if (data.user) setUser(data.user);
          if (data.repos && Array.isArray(data.repos)) {
            setRepos(data.repos);
            setLanguageStats(data.languageStats || computeLanguageStats(data.repos));
          }
        }
      } catch (err) {
        console.warn('Using cached GitHub data fallback:', err);
      } finally {
        setLoading(false);
      }
    }
    loadGitHub();
  }, []);

  const filteredRepos = repos.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      (r.description && r.description.toLowerCase().includes(search.toLowerCase()));
    const matchesLang =
      selectedLang === 'ALL' || (r.language && r.language === selectedLang);
    return matchesSearch && matchesLang;
  });

  return (
    <section id="github" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-surface-border">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-primary mb-2">
            <Github className="w-3.5 h-3.5" />
            <span>04 // LIVE GITHUB REPOSITORY TELEMETRY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            OPEN SOURCE CADENCE
          </h2>
          <p className="text-sm text-zinc-400 mt-1 max-w-xl">
            Live stream from <span className="font-mono text-emerald-400">@amaymishra1104</span>. Tracking 29+ repositories across autonomous agent protocols, computer vision, and full-stack systems.
          </p>
        </div>

        <a
          href="https://github.com/amaymishra1104"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('github_click', { target: 'profile' })}
          className="inline-flex items-center gap-2 font-mono text-xs px-3.5 py-2 rounded-lg bg-surface-100 hover:bg-surface-50 border border-surface-border hover:border-zinc-500 text-zinc-200 transition-colors self-start md:self-auto"
        >
          <Github className="w-3.5 h-3.5" />
          <span>VIEW AMAY ON GITHUB</span>
          <ExternalLink className="w-3 h-3 text-zinc-500" />
        </a>
      </div>

      {/* GitHub Overview Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <div className="p-4 bg-[#0b0e17] border border-surface-border rounded-xl">
          <span className="font-mono text-[10px] text-zinc-500">PUBLIC REPOSITORIES</span>
          <p className="text-2xl font-bold font-mono text-white mt-1">
            {user.public_repos || 29}
          </p>
        </div>
        <div className="p-4 bg-[#0b0e17] border border-surface-border rounded-xl">
          <span className="font-mono text-[10px] text-zinc-500">GITHUB USERNAME</span>
          <p className="text-sm sm:text-base font-bold font-mono text-emerald-400 mt-1 truncate">
            amaymishra1104
          </p>
        </div>
        <div className="p-4 bg-[#0b0e17] border border-surface-border rounded-xl">
          <span className="font-mono text-[10px] text-zinc-500">ACTIVE LANGUAGE FOCUS</span>
          <p className="text-sm sm:text-base font-bold font-mono text-cyan-400 mt-1">
            Python &amp; TypeScript
          </p>
        </div>
        <div className="p-4 bg-[#0b0e17] border border-surface-border rounded-xl">
          <span className="font-mono text-[10px] text-zinc-500">ENGINEERING STATUS</span>
          <p className="text-sm sm:text-base font-bold font-mono text-emerald-400 mt-1 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Active Committer
          </p>
        </div>
      </div>

      {/* Language Breakdown Bar */}
      <div className="p-4 bg-[#0b0e17] border border-surface-border rounded-xl mb-8 space-y-3">
        <div className="flex items-center justify-between font-mono text-xs text-zinc-400">
          <span>CODEBASE COMPOSITION (BY REPOSITORIES)</span>
          <span className="text-[10px] text-zinc-500">Live language aggregate</span>
        </div>

        {/* Visual Multi-Segment Bar */}
        <div className="h-2.5 w-full bg-zinc-800 rounded-full overflow-hidden flex">
          {languageStats.map((l) => (
            <div
              key={l.language}
              style={{ width: `${l.percentage}%`, backgroundColor: l.color }}
              className="h-full"
              title={`${l.language}: ${l.count} repos (${l.percentage}%)`}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 font-mono text-[11px] text-zinc-400">
          {languageStats.map((l) => (
            <button
              key={l.language}
              onClick={() => setSelectedLang(selectedLang === l.language ? 'ALL' : l.language)}
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded transition-colors ${
                selectedLang === l.language ? 'bg-surface-50 text-white font-bold' : 'hover:text-white'
              }`}
            >
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: l.color }} />
              <span>{l.language}</span>
              <span className="text-zinc-500">({l.percentage}%)</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search public repositories by name or description..."
            className="w-full bg-[#0b0e17] border border-surface-border focus:border-primary/50 text-xs text-zinc-100 pl-9 pr-3 py-2.5 rounded-lg focus:outline-none font-mono"
          />
        </div>
        {selectedLang !== 'ALL' && (
          <button
            onClick={() => setSelectedLang('ALL')}
            className="font-mono text-xs text-primary bg-primary/10 border border-primary/30 px-3 py-2 rounded-lg"
          >
            Clear Filter: {selectedLang} ✕
          </button>
        )}
      </div>

      {/* Repositories Grid */}
      {loading ? (
        <div className="py-12 flex justify-center items-center gap-2 font-mono text-xs text-zinc-400">
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
          <span>Synchronizing with GitHub API...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRepos.slice(0, 9).map((repo) => (
            <a
              key={repo.id || repo.name}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('github_click', { repo: repo.name })}
              className="p-5 rounded-xl bg-[#0b0e17] border border-surface-border hover:border-primary/40 transition-all flex flex-col justify-between group hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-mono text-sm font-bold text-white group-hover:text-primary transition-colors truncate">
                    {repo.name}
                  </h4>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-600 group-hover:text-primary transition-colors flex-shrink-0" />
                </div>
                <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                  {repo.description || 'Public software engineering repository.'}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-surface-border/50 flex items-center justify-between font-mono text-[11px] text-zinc-500">
                <div className="flex items-center gap-2">
                  {repo.language && (
                    <span className="flex items-center gap-1 text-zinc-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      {repo.language}
                    </span>
                  )}
                </div>
                <span>Updated {formatDate(repo.updated_at)}</span>
              </div>
            </a>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <Link
          href="/github"
          className="inline-flex items-center gap-2 font-mono text-xs text-primary hover:text-emerald-300 transition-colors"
        >
          <span>VIEW COMPLETE 29+ REPOSITORY LIVE TELEMETRY</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
