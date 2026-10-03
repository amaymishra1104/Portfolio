export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: 'Full-time' | 'Internship' | 'Project Engineering' | 'Education';
  current: boolean;
  description: string;
  highlights: string[];
  technologies: string[];
  projectSlug?: string;
}

export const experienceData: ExperienceItem[] = [
  {
    id: 'mamasoft-eng',
    role: 'Full-Stack Engineer & Product Lead',
    organization: 'MamaSoft (Active Production Build)',
    location: 'Indore, India',
    period: '2026 — Present',
    type: 'Project Engineering',
    current: true,
    description: 'Spearheading the engineering and architecture of MamaSoft, an end-to-end clinical workflow and patient care automation platform for healthcare practices.',
    highlights: [
      'Architected full-stack Next.js and FastAPI backend microservices with strict HIPAA-conscious schema isolation.',
      'Constructed conflict-free patient scheduling with optimistic UI state synchronization.',
      'Implemented automated multi-channel pre-visit notifications reducing appointment no-show probability.'
    ],
    technologies: ['Next.js', 'FastAPI', 'TypeScript', 'PostgreSQL', 'Docker', 'Tailwind CSS'],
    projectSlug: 'mamasoft'
  },
  {
    id: 'agentpay-lead',
    role: 'Autonomous Systems & Backend Architect',
    organization: 'AgentPay Project',
    location: 'Remote / Indore',
    period: '2026',
    type: 'Project Engineering',
    current: true,
    description: 'Designed an idempotent financial authorization and spending policy gateway for autonomous AI agents.',
    highlights: [
      'Built HMAC-SHA256 signature verification protocol and deterministic UUIDv5 idempotency keys for agent payment calls.',
      'Integrated Stripe webhook reconcilers with exponential backoff handling distributed edge drops.'
    ],
    technologies: ['Python', 'FastAPI', 'LangChain', 'PostgreSQL', 'Stripe API'],
    projectSlug: 'agentpay'
  },
  {
    id: 'acropolis-csit',
    role: 'B.Tech in Computer Science & Information Technology',
    organization: 'Acropolis Institute of Technology and Research (RGPV University)',
    location: 'Indore, Madhya Pradesh, India',
    period: '2023 — 2027 (Expected)',
    type: 'Education',
    current: true,
    description: 'Focusing on distributed systems, machine learning architectures, algorithm design, data structures, and computer vision systems.',
    highlights: [
      'Core coursework: Advanced Data Structures, Operating Systems, Computer Networks, Database Management Systems, Machine Learning.',
      'Led teams across national-level hackathons and technical project exhibitions.'
    ],
    technologies: ['Python', 'C++', 'SQL', 'Algorithms', 'Distributed Systems']
  }
];
