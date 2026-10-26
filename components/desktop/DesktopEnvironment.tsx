'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderGit2, MonitorPlay, Briefcase, Trophy, User, X } from 'lucide-react';

const APPS = [
  { id: 'about', title: 'About Me', icon: User, color: 'text-blue-400' },
  { id: 'projects', title: 'Projects', icon: FolderGit2, color: 'text-emerald-400' },
  { id: 'live', title: 'Live Labs', icon: MonitorPlay, color: 'text-purple-400' },
  { id: 'experience', title: 'Experience', icon: Briefcase, color: 'text-orange-400' },
  { id: 'achievements', title: 'Achievements', icon: Trophy, color: 'text-yellow-400' }
];

export default function DesktopEnvironment() {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);

  const openApp = (id: string) => {
    if (!openWindows.includes(id)) {
      setOpenWindows([...openWindows, id]);
    }
    setActiveWindow(id);
  };

  const closeApp = (id: string) => {
    setOpenWindows(openWindows.filter(w => w !== id));
    if (activeWindow === id) {
      setActiveWindow(openWindows.length > 1 ? openWindows[openWindows.length - 2] : null);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-[#07090e] via-black to-[#0f172a] text-white selection:bg-emerald-500/30">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      {/* Desktop Grid */}
      <div className="relative z-10 flex flex-col gap-6 p-8 h-full flex-wrap content-start">
        {APPS.map((app) => (
          <button 
            key={app.id} 
            onDoubleClick={() => openApp(app.id)}
            onClick={() => openApp(app.id)} // single click is friendly for web
            className="flex flex-col items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors w-28 group outline-none"
          >
            <div className={`p-4 bg-white/5 border border-white/10 rounded-2xl shadow-lg backdrop-blur-md group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300 ${app.color}`}>
              <app.icon size={36} strokeWidth={1.5} />
            </div>
            <span className="text-sm font-medium tracking-wide drop-shadow-md text-center text-gray-200">
              {app.title}
            </span>
          </button>
        ))}
      </div>

      {/* Taskbar / Dock */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-3 px-4 py-3 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl">
          {APPS.map(app => (
            <button 
              key={`dock-${app.id}`}
              onClick={() => openApp(app.id)}
              className={`relative p-3 rounded-xl transition-all duration-300 ${openWindows.includes(app.id) ? 'bg-white/10 scale-110' : 'hover:bg-white/10 hover:-translate-y-2'}`}
            >
              <app.icon size={26} strokeWidth={1.5} className={app.color} />
              {openWindows.includes(app.id) && (
                <motion.div layoutId="active-indicator" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full"></motion.div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Windows Container */}
      <AnimatePresence>
        {openWindows.map(id => (
          <Window 
            key={id} 
            app={APPS.find(a => a.id === id)!} 
            isActive={activeWindow === id}
            onFocus={() => setActiveWindow(id)}
            onClose={() => closeApp(id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function Window({ app, isActive, onFocus, onClose }: any) {
  const windowRef = useRef(null);
  
  return (
    <motion.div
      ref={windowRef}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      onMouseDown={onFocus}
      drag
      dragMomentum={false}
      dragConstraints={{ top: 0, left: -1000, right: 1000, bottom: 800 }}
      className={`absolute top-16 left-10 md:left-40 w-[90%] md:w-[700px] xl:w-[900px] h-[600px] flex flex-col rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 bg-[#0c1017]/90 backdrop-blur-3xl ${isActive ? 'z-40' : 'z-30'}`}
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10 cursor-move">
        <div className="flex items-center gap-2">
          <app.icon size={16} className={app.color} />
          <span className="text-sm font-medium text-gray-200">{app.title}</span>
        </div>
        <div className="flex gap-2">
          <button className="w-3.5 h-3.5 rounded-full bg-yellow-500/80 hover:bg-yellow-400 transition-colors" />
          <button className="w-3.5 h-3.5 rounded-full bg-green-500/80 hover:bg-green-400 transition-colors" />
          <button onClick={onClose} className="w-3.5 h-3.5 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors flex items-center justify-center group">
            <X size={10} className="opacity-0 group-hover:opacity-100 text-red-900" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {app.id === 'projects' && <DesktopProjects />}
        {app.id === 'live' && <div className="flex flex-col items-center justify-center h-full text-gray-400"><MonitorPlay size={48} className="mb-4 opacity-50" />Booting Live Labs...</div>}
        {app.id === 'about' && <div className="flex flex-col items-center justify-center h-full text-gray-400"><User size={48} className="mb-4 opacity-50" />Loading Profile Data...</div>}
        {app.id === 'experience' && <div className="flex flex-col items-center justify-center h-full text-gray-400"><Briefcase size={48} className="mb-4 opacity-50" />Fetching Timeline...</div>}
        {app.id === 'achievements' && <div className="flex flex-col items-center justify-center h-full text-gray-400"><Trophy size={48} className="mb-4 opacity-50" />Loading Trophies...</div>}
      </div>
    </motion.div>
  );
}

function DesktopProjects() {
  const projects = [
    { id: 1, title: 'Nirikshak', category: 'Full Stack', link: 'https://github.com/AnujMalviya20/Nirikshak-/tree/main' },
    { id: 2, title: 'AgentPay AI', category: 'AI Agent & Fintech', link: 'https://github.com/amaymishra1104/agentpay-ai/tree/main' },
    { id: 3, title: 'Hire.IQ', category: 'AI Platform', link: 'https://github.com/amaymishra1104/Hire.IQ/tree/master' },
    { id: 4, title: 'Lulu AI Assistant', category: 'AI Assistant', link: 'https://github.com/amaymishra1104/lulu-ai-assistant/tree/main' },
    { id: 5, title: 'AgentHub AI', category: 'AI Platform', link: 'https://github.com/amaymishra1104/agenthub-ai/tree/main' },
    { id: 6, title: 'ALEXANDRIA AI', category: 'AI Knowledge Base', link: 'https://github.com/amaymishra1104/ALEXANDRIA-AI/tree/master' },
    { id: 7, title: 'CivicAI', category: 'AI System', link: 'https://github.com/amaymishra1104/CivicAI/tree/main' },
    { id: 8, title: 'Fraud Detection System', category: 'Machine Learning', link: 'https://github.com/amaymishra1104/Fraud-Detection-System/tree/main' },
    { id: 9, title: 'AI Placement Predictor', category: 'Machine Learning', link: 'https://github.com/amaymishra1104/AI-Placement-Predictor/tree/main' },
    { id: 10, title: 'Data Structure Visualizer', category: 'Interactive Tool', link: 'https://github.com/amaymishra1104/Data-Structure-Visualizer/tree/main' },
    { id: 11, title: 'A/B Testing', category: 'Data Science', link: 'https://github.com/amaymishra1104/A-B-Testing-/tree/main' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map((project) => (
        <a 
          key={project.id}
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative p-5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all block overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/5 group-hover:opacity-100 opacity-0 transition-opacity"></div>
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-xs text-emerald-400 mb-1 font-mono">{project.category}</p>
              <h3 className="text-lg font-medium text-gray-100">{project.title}</h3>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-colors">
              <FolderGit2 size={14} />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
