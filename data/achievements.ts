export interface Achievement {
  id: string;
  title: string;
  organization: string;
  year: string;
  category: 'Hackathon' | 'Competition' | 'Engineering Milestone' | 'Open Source';
  description: string;
  verificationBadge: string;
  tags: string[];
}

export const achievementsData: Achievement[] = [
  {
    id: 'hackwise-2026',
    title: 'HackWise 2026 Finalist & Builder',
    organization: 'HackWise Hackathon',
    year: '2026',
    category: 'Hackathon',
    description: 'Designed and deployed an interactive autonomous system addressing complex real-time coordination challenges under a 36-hour sprint.',
    verificationBadge: 'Verified Submission',
    tags: ['Hackathon', 'Autonomous Agents', 'Rapid Prototyping']
  },
  {
    id: 'amazon-ml-challenge',
    title: 'Amazon ML Challenge Participant & Multimodal Pipeline Builder',
    organization: 'Amazon ML Challenge',
    year: '2025 — 2026',
    category: 'Competition',
    description: 'Constructed an end-to-end multimodal price prediction pipeline combining visual embeddings from product catalogs with gradient boosted tabular metadata.',
    verificationBadge: 'Competition Submission',
    tags: ['Machine Learning', 'Computer Vision', 'Multimodal', 'XGBoost']
  },
  {
    id: 'github-portfolio-scale',
    title: '29+ Public Repositories & Active Engineering Output',
    organization: 'GitHub',
    year: '2025 — 2026',
    category: 'Open Source',
    description: 'Maintained continuous engineering cadence across autonomous agent protocols, computer vision deployments, and full-stack web applications.',
    verificationBadge: 'Public GitHub Records',
    tags: ['Open Source', 'FastAPI', 'Next.js', 'Python']
  },
  {
    id: 'civic-tech-deployment',
    title: 'CivicSense / CivicAI Computer Vision Pipeline Delivery',
    organization: 'Civic Technology Initiative',
    year: '2025',
    category: 'Engineering Milestone',
    description: 'Implemented edge CV models with spatial clustering for automated civic infrastructure defect triage.',
    verificationBadge: 'Milestone Delivery',
    tags: ['Computer Vision', 'PyTorch', 'GIS']
  }
];
