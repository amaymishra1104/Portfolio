'use client';

import React from 'react';
import { liveStatusData } from '@/data/live-status';

export default function LiveStatus() {
  return (
    <div className="w-full border-y border-surface-border bg-[#090b12]/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-xs font-mono">
          {liveStatusData.map((item) => (
            <div key={item.id} className="flex items-center gap-2 group">
              {item.status === 'active' ? (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              ) : item.status === 'building' ? (
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              ) : (
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
              )}
              <div className="truncate">
                <span className="text-zinc-500 text-[10px] tracking-wider block sm:inline sm:mr-1.5">
                  {item.label} →
                </span>
                <span className="text-zinc-200 font-medium group-hover:text-primary transition-colors">
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
