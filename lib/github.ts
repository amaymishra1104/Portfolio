export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
}

export interface LanguageStat {
  language: string;
  count: number;
  percentage: number;
  color: string;
}

// Fallback verified snapshot of Amay's real public GitHub repositories
export const fallbackRepos: GitHubRepo[] = [
  {
    id: 1,
    name: 'agentpay-ai',
    description: 'Autonomous AI Agent Payment & Transaction Execution Protocol with strict spending caps and HMAC verification.',
    html_url: 'https://github.com/amaymishra1104/agentpay-ai',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-09-02T05:48:49Z',
    topics: ['ai-agents', 'fastapi', 'payments', 'idempotency']
  },
  {
    id: 2,
    name: 'HireIQ',
    description: 'Autonomous AI Technical Interview & Candidate Evaluation Platform with real-time code evaluation.',
    html_url: 'https://github.com/amaymishra1104/HireIQ',
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-08-31T08:50:12Z',
    topics: ['nextjs', 'typescript', 'ai-evaluator', 'monaco-editor']
  },
  {
    id: 3,
    name: 'CivicAI',
    description: 'Municipal grievance intelligence & geo-spatial computer vision system for automated defect routing.',
    html_url: 'https://github.com/amaymishra1104/CivicAI',
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2025-10-30T06:43:09Z',
    topics: ['computer-vision', 'postgis', 'fastapi', 'municipal-tech']
  },
  {
    id: 4,
    name: 'Fraud-Detection-System',
    description: 'Real-time financial transaction anomaly and risk scoring pipeline using cost-sensitive XGBoost.',
    html_url: 'https://github.com/amaymishra1104/Fraud-Detection-System',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-05-24T19:17:08Z',
    topics: ['xgboost', 'scikit-learn', 'smote', 'fraud-detection']
  },
  {
    id: 5,
    name: 'CrunchReader',
    description: 'Document intelligence and layout-aware chunking pipeline for high-precision RAG systems.',
    html_url: 'https://github.com/amaymishra1104/CrunchReader',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-08-27T20:12:11Z',
    topics: ['rag', 'embeddings', 'hybrid-search', 'nlp']
  },
  {
    id: 6,
    name: 'lulu-ai-assistant',
    description: 'Context-aware desktop and developer terminal automation assistant with zero context switching.',
    html_url: 'https://github.com/amaymishra1104/lulu-ai-assistant',
    language: 'JavaScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-08-31T07:43:28Z',
    topics: ['electron', 'developer-tools', 'llm', 'automation']
  },
  {
    id: 7,
    name: 'OmniPulse',
    description: 'Multi-modal telemetry and streaming analytics engine.',
    html_url: 'https://github.com/amaymishra1104/OmniPulse',
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-09-04T18:09:35Z',
    topics: ['typescript', 'telemetry', 'realtime']
  },
  {
    id: 8,
    name: 'Amazon_ml_challenge_2026',
    description: 'Multimodal price prediction architecture utilizing text tokens, product features, and vision backbones.',
    html_url: 'https://github.com/amaymishra1104/Amazon_ml_challenge_2026',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-09-25T08:30:21Z',
    topics: ['multimodal', 'machine-learning', 'pytorch']
  },
  {
    id: 9,
    name: 'GraphOne',
    description: 'Knowledge graph traversal and entity relation extraction pipeline.',
    html_url: 'https://github.com/amaymishra1104/GraphOne',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-08-27T19:10:31Z',
    topics: ['graph-database', 'knowledge-graph', 'python']
  },
  {
    id: 10,
    name: 'Task-Manager-REST-API-using-Flask',
    description: 'Task Manager REST API with SQLite persistence, clean architecture, comprehensive error handling, and API docs.',
    html_url: 'https://github.com/amaymishra1104/Task-Manager-REST-API-using-Flask',
    language: 'Python',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-04-12T17:11:19Z',
    topics: ['flask', 'rest-api', 'crud', 'python']
  }
];

export const fallbackUser: GitHubUser = {
  login: 'amaymishra1104',
  name: 'Amay Mishra',
  avatar_url: 'https://avatars.githubusercontent.com/u/235825165?v=4',
  html_url: 'https://github.com/amaymishra1104',
  bio: 'Software Engineer | AI/ML | Agentic Systems | Full-Stack',
  public_repos: 29,
  followers: 0,
  following: 1,
  created_at: '2025-10-03T05:22:17Z'
};

// Language color mapping
export const languageColors: Record<string, string> = {
  Python: '#3572A5',
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  'Jupyter Notebook': '#DA5B0B',
  HTML: '#E34F26',
  CSS: '#563D7C',
  Shell: '#89E051',
  Other: '#6E7681'
};

// In-memory cache for API requests
let cacheUser: { data: GitHubUser; timestamp: number } | null = null;
let cacheRepos: { data: GitHubRepo[]; timestamp: number } | null = null;
const CACHE_TTL = 1000 * 60 * 15; // 15 minutes

export async function fetchGitHubUser(): Promise<GitHubUser> {
  const now = Date.now();
  if (cacheUser && now - cacheUser.timestamp < CACHE_TTL) {
    return cacheUser.data;
  }

  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    'User-Agent': 'AmayMishra-Portfolio/1.0',
    Accept: 'application/vnd.github.v3+json'
  };
  if (token) {
    headers.Authorization = `token ${token}`;
  }

  try {
    const res = await fetch('https://api.github.com/users/amaymishra1104', {
      headers,
      next: { revalidate: 900 }
    });

    if (!res.ok) {
      console.warn(`GitHub API returned status ${res.status}, using verified fallback`);
      return fallbackUser;
    }

    const data = await res.json();
    cacheUser = { data, timestamp: now };
    return data;
  } catch (error) {
    console.error('Error fetching GitHub user:', error);
    return fallbackUser;
  }
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const now = Date.now();
  if (cacheRepos && now - cacheRepos.timestamp < CACHE_TTL) {
    return cacheRepos.data;
  }

  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    'User-Agent': 'AmayMishra-Portfolio/1.0',
    Accept: 'application/vnd.github.v3+json'
  };
  if (token) {
    headers.Authorization = `token ${token}`;
  }

  try {
    const res = await fetch('https://api.github.com/users/amaymishra1104/repos?per_page=100&sort=updated', {
      headers,
      next: { revalidate: 900 }
    });

    if (!res.ok) {
      console.warn(`GitHub repos API returned status ${res.status}, using verified fallback`);
      return fallbackRepos;
    }

    const data: GitHubRepo[] = await res.json();
    cacheRepos = { data, timestamp: now };
    return data;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return fallbackRepos;
  }
}

export function computeLanguageStats(repos: GitHubRepo[]): LanguageStat[] {
  const counts: Record<string, number> = {};
  let total = 0;

  for (const repo of repos) {
    const lang = repo.language || 'Other';
    counts[lang] = (counts[lang] || 0) + 1;
    total++;
  }

  return Object.entries(counts)
    .map(([language, count]) => ({
      language,
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
      color: languageColors[language] || '#6E7681'
    }))
    .sort((a, b) => b.count - a.count);
}
