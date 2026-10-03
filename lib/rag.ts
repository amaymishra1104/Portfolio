import { projects } from '@/data/projects';
import { skillsData } from '@/data/skills';
import { experienceData } from '@/data/experience';
import { achievementsData } from '@/data/achievements';
import { buildLogData } from '@/data/build-log';

export interface KnowledgeChunk {
  id: string;
  title: string;
  category: 'bio' | 'project' | 'skill' | 'experience' | 'achievement' | 'build-log' | 'contact';
  content: string;
  keywords: string[];
  referenceUrl?: string;
  referenceLabel?: string;
}

export const portfolioKnowledgeBase: KnowledgeChunk[] = [
  {
    id: 'bio-overview',
    title: 'Amay Mishra Profile & Positioning',
    category: 'bio',
    content: 'Amay Mishra is an AI/ML Engineer, Full-Stack Developer, and AI Agent Builder located in Indore, Madhya Pradesh, India. He is pursuing his B.Tech in Computer Science & Information Technology at Acropolis Institute of Technology and Research (affiliated with RGPV University), graduating in 2027. He specializes in building intelligent systems that ship: autonomous AI agents, backend architectures, RAG pipelines, computer vision systems, and high-performance full-stack applications.',
    keywords: ['amay', 'mishra', 'who', 'profile', 'education', 'acropolis', 'indore', 'college', 'degree', 'btech', 'graduation', '2027', 'location', 'india', 'role', 'engineer', 'about'],
    referenceUrl: '/about',
    referenceLabel: 'About Amay'
  },
  {
    id: 'bio-status',
    title: 'Current Availability & Status',
    category: 'bio',
    content: 'Amay is actively OPEN TO OPPORTUNITIES (full-time roles and high-impact AI/Full-Stack engineering positions). He is currently actively building MamaSoft (a clinical practice automation platform) and AgentPay (an autonomous AI agent transaction rail), while exploring multi-agent orchestration, stateful RAG, and MCP tool calling.',
    keywords: ['open', 'opportunities', 'hiring', 'status', 'available', 'job', 'mamasoft', 'building', 'exploring', 'roles'],
    referenceUrl: '/about',
    referenceLabel: 'View Status'
  },
  {
    id: 'contact-info',
    title: 'Contact Information',
    category: 'contact',
    content: 'Amay Mishra can be reached via GitHub at https://github.com/amaymishra1104, LinkedIn, or the interactive contact form on this portfolio. He is based in Indore, India (IST UTC+5:30).',
    keywords: ['contact', 'email', 'reach', 'message', 'hire', 'github', 'linkedin', 'connect', 'touch'],
    referenceUrl: '/#contact',
    referenceLabel: 'Contact Amay'
  },
  // Projects
  ...projects.map((p) => ({
    id: `project-${p.slug}`,
    title: `Project: ${p.name}`,
    category: 'project' as const,
    content: `${p.name} (${p.category}, status: ${p.status}). ${p.tagline}. Summary: ${p.summary} Problem: ${p.problem} Solution: ${p.solution} Key Technologies: ${p.technologies.join(', ')}. Key engineering highlights: ${p.engineeringHighlights.map((h) => `${h.title}: ${h.description}`).join(' ')} Architecture nodes: ${p.architecture.map((a) => `${a.name} (${a.role} using ${a.tech})`).join(' -> ')}. Lessons learned: ${p.lessons.join(' ')}`,
    keywords: [
      p.name.toLowerCase(),
      p.slug.toLowerCase(),
      ...p.technologies.map((t) => t.toLowerCase()),
      p.category.toLowerCase(),
      'project',
      'architecture'
    ],
    referenceUrl: `/work/${p.slug}`,
    referenceLabel: `View ${p.name} Case Study`
  })),
  // Skills
  ...skillsData.map((s) => ({
    id: `skill-${s.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    title: `Skill: ${s.name}`,
    category: 'skill' as const,
    content: `${s.name} (${s.category}, level: ${s.level}, experience: ${s.experienceYears}). ${s.description} Used in projects: ${s.projectsUsed.map((pr) => pr.name).join(', ')}.`,
    keywords: [s.name.toLowerCase(), s.category.toLowerCase(), 'skill', 'tech', 'stack', ...s.projectsUsed.map((pr) => pr.name.toLowerCase())],
    referenceUrl: '/#skills',
    referenceLabel: `Skills & Stack`
  })),
  // Experience
  ...experienceData.map((e) => ({
    id: `exp-${e.id}`,
    title: `Experience: ${e.role} at ${e.organization}`,
    category: 'experience' as const,
    content: `${e.role} at ${e.organization} (${e.period}, ${e.location}). ${e.description} Highlights: ${e.highlights.join(' ')}. Technologies: ${e.technologies.join(', ')}.`,
    keywords: [e.role.toLowerCase(), e.organization.toLowerCase(), 'experience', 'work', 'job', 'history', ...e.technologies.map((t) => t.toLowerCase())],
    referenceUrl: '/about#experience',
    referenceLabel: 'Experience'
  })),
  // Achievements
  ...achievementsData.map((a) => ({
    id: `achieve-${a.id}`,
    title: `Achievement: ${a.title}`,
    category: 'achievement' as const,
    content: `${a.title} by ${a.organization} (${a.year}). ${a.description} Tags: ${a.tags.join(', ')}.`,
    keywords: [a.title.toLowerCase(), a.organization.toLowerCase(), 'achievement', 'award', 'hackathon', 'competition', ...a.tags.map((t) => t.toLowerCase())],
    referenceUrl: '/#achievements',
    referenceLabel: 'Achievements'
  })),
  // Build Log
  ...buildLogData.map((b) => ({
    id: `build-${b.id}`,
    title: `Build Log: ${b.title}`,
    category: 'build-log' as const,
    content: `[${b.monthYear}] ${b.title}: ${b.description} Tags: ${b.tags.join(', ')}. Associated project: ${b.projectName || 'General'}. Metric: ${b.metrics || 'N/A'}.`,
    keywords: [b.title.toLowerCase(), ...b.tags.map((t) => t.toLowerCase()), 'changelog', 'build', 'commit', 'log'],
    referenceUrl: '/build-log',
    referenceLabel: 'Build Log'
  }))
];

export interface RetrievalResult {
  chunk: KnowledgeChunk;
  score: number;
}

// Tokenize and clean text for lexical/semantic vector scoring
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1);
}

// Hybrid keyword and frequency scoring retriever
export function retrieveContext(query: string, topK: number = 3): RetrievalResult[] {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return [];

  const results: RetrievalResult[] = [];

  for (const chunk of portfolioKnowledgeBase) {
    let score = 0;
    const chunkTokens = tokenize(`${chunk.title} ${chunk.content} ${chunk.keywords.join(' ')}`);
    const chunkSet = new Set(chunkTokens);

    for (const qToken of queryTokens) {
      // Exact keyword match in keywords list gives highest weight
      if (chunk.keywords.some((k) => k.includes(qToken) || qToken.includes(k))) {
        score += 3.5;
      }
      // Exact title match gives high weight
      if (chunk.title.toLowerCase().includes(qToken)) {
        score += 2.5;
      }
      // Content match
      if (chunkSet.has(qToken)) {
        score += 1.0;
      }
    }

    if (score > 0) {
      results.push({ chunk, score });
    }
  }

  // Sort descending by score
  results.sort((a, b) => b.score - a.score);
  return results.slice(0, topK);
}
