import React from 'react';

export default function Projects() {
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
    <section className="bg-[#121212] min-h-screen py-24 px-6 md:px-12 lg:px-24 text-white z-20 relative font-sans">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-semibold mb-16 tracking-tight">Selected Work</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <a 
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-8 min-h-[400px] flex flex-col justify-end transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] cursor-pointer block"
            >
              {/* Subtle hover glow layer */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 z-0"></div>
              
              <div className="relative z-10 transform transition-transform duration-500 group-hover:-translate-y-2">
                <p className="text-sm text-gray-400 mb-2 font-mono uppercase tracking-widest">{project.category}</p>
                <h3 className="text-3xl font-medium tracking-tight">{project.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
