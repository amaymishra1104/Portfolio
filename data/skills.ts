export interface Skill {
  name: string;
  category: 'AI / ML' | 'FULL STACK' | 'DATA' | 'INFRASTRUCTURE';
  level: 'Expert' | 'Advanced' | 'Proficient';
  experienceYears: string;
  description: string;
  projectsUsed: { name: string; slug: string }[];
}

export const skillsData: Skill[] = [
  // AI / ML
  {
    name: 'Python',
    category: 'AI / ML',
    level: 'Expert',
    experienceYears: '3+ yrs',
    description: 'Primary language for machine learning pipelines, FastAPI backend architectures, RAG chains, and autonomous agent systems.',
    projectsUsed: [
      { name: 'AgentPay', slug: 'agentpay' },
      { name: 'Fraud Detection System', slug: 'fraud-detection-system' },
      { name: 'CrunchReader', slug: 'crunchreader' },
      { name: 'Vision-Indore', slug: 'vision-indore' }
    ]
  },
  {
    name: 'PyTorch',
    category: 'AI / ML',
    level: 'Advanced',
    experienceYears: '2 yrs',
    description: 'Deep neural network training, CNN computer vision backbones, and transfer learning workflows.',
    projectsUsed: [
      { name: 'CivicAI', slug: 'civicai' },
      { name: 'Vision-Indore', slug: 'vision-indore' }
    ]
  },
  {
    name: 'XGBoost & Scikit-learn',
    category: 'AI / ML',
    level: 'Expert',
    experienceYears: '2+ yrs',
    description: 'Tabular machine learning, SMOTE imbalanced data resampling, hyperparameter grid search, and precision-recall calibration.',
    projectsUsed: [
      { name: 'Fraud Detection System', slug: 'fraud-detection-system' }
    ]
  },
  {
    name: 'RAG & Vector Search',
    category: 'AI / ML',
    level: 'Advanced',
    experienceYears: '2 yrs',
    description: 'Document intelligence, semantic dense chunking, sentence embeddings, and hybrid sparse/dense reciprocal rank fusion.',
    projectsUsed: [
      { name: 'CrunchReader', slug: 'crunchreader' },
      { name: 'AgentPay', slug: 'agentpay' }
    ]
  },
  {
    name: 'LLM Orchestration & Agents',
    category: 'AI / ML',
    level: 'Advanced',
    experienceYears: '2 yrs',
    description: 'Agentic loops, LangChain, tool calling, multi-agent supervision, structured JSON outputs, and prompt evaluation rubrics.',
    projectsUsed: [
      { name: 'AgentPay', slug: 'agentpay' },
      { name: 'HireIQ', slug: 'hireiq' },
      { name: 'LULU AI Assistant', slug: 'lulu-ai-assistant' }
    ]
  },
  {
    name: 'Computer Vision (YOLO/OpenCV)',
    category: 'AI / ML',
    level: 'Advanced',
    experienceYears: '2 yrs',
    description: 'Real-time object detection, RTSP video streaming, ByteTrack trajectory tracking, and edge TensorRT optimization.',
    projectsUsed: [
      { name: 'Vision-Indore', slug: 'vision-indore' },
      { name: 'CivicAI', slug: 'civicai' }
    ]
  },

  // FULL STACK
  {
    name: 'Next.js & React',
    category: 'FULL STACK',
    level: 'Expert',
    experienceYears: '3 yrs',
    description: 'App Router architecture, React Server Components, streaming SSR, dynamic layouts, and client micro-interactions.',
    projectsUsed: [
      { name: 'HireIQ', slug: 'hireiq' },
      { name: 'MamaSoft', slug: 'mamasoft' }
    ]
  },
  {
    name: 'TypeScript',
    category: 'FULL STACK',
    level: 'Expert',
    experienceYears: '3 yrs',
    description: 'Strict typing across full-stack applications, shared interfaces, generic API responses, and type-safe state machines.',
    projectsUsed: [
      { name: 'HireIQ', slug: 'hireiq' },
      { name: 'MamaSoft', slug: 'mamasoft' },
      { name: 'CivicAI', slug: 'civicai' }
    ]
  },
  {
    name: 'FastAPI',
    category: 'FULL STACK',
    level: 'Expert',
    experienceYears: '2+ yrs',
    description: 'High-concurrency asynchronous REST APIs, Pydantic validation, background tasks, JWT authentication, and OpenAPI specs.',
    projectsUsed: [
      { name: 'AgentPay', slug: 'agentpay' },
      { name: 'MamaSoft', slug: 'mamasoft' },
      { name: 'CrunchReader', slug: 'crunchreader' }
    ]
  },
  {
    name: 'Node.js',
    category: 'FULL STACK',
    level: 'Advanced',
    experienceYears: '3 yrs',
    description: 'Backend event-driven microservices, WebSocket gateways, and desktop automation via Electron.',
    projectsUsed: [
      { name: 'HireIQ', slug: 'hireiq' },
      { name: 'LULU AI Assistant', slug: 'lulu-ai-assistant' }
    ]
  },
  {
    name: 'Tailwind CSS',
    category: 'FULL STACK',
    level: 'Expert',
    experienceYears: '3 yrs',
    description: 'Design system engineering, dark mode tokenization, responsive fluid typography, and bespoke technical UI components.',
    projectsUsed: [
      { name: 'HireIQ', slug: 'hireiq' },
      { name: 'MamaSoft', slug: 'mamasoft' }
    ]
  },

  // DATA
  {
    name: 'PostgreSQL & SQL',
    category: 'DATA',
    level: 'Advanced',
    experienceYears: '3 yrs',
    description: 'Relational database schema modeling, ACID transactions, row-level security (RLS), and complex analytic joins.',
    projectsUsed: [
      { name: 'AgentPay', slug: 'agentpay' },
      { name: 'MamaSoft', slug: 'mamasoft' }
    ]
  },
  {
    name: 'Pandas & NumPy',
    category: 'DATA',
    level: 'Expert',
    experienceYears: '3 yrs',
    description: 'Vectorized mathematical operations, statistical distributions, data cleaning, and feature engineering.',
    projectsUsed: [
      { name: 'Fraud Detection System', slug: 'fraud-detection-system' },
      { name: 'Vision-Indore', slug: 'vision-indore' }
    ]
  },
  {
    name: 'ChromaDB & pgvector',
    category: 'DATA',
    level: 'Advanced',
    experienceYears: '2 yrs',
    description: 'High-dimensional vector storage, cosine similarity indexing, HNSW indexes, and filtered metadata retrieval.',
    projectsUsed: [
      { name: 'CrunchReader', slug: 'crunchreader' }
    ]
  },
  {
    name: 'Redis',
    category: 'DATA',
    level: 'Proficient',
    experienceYears: '2 yrs',
    description: 'In-memory caching, distributed rate limiting, and pub/sub message brokers.',
    projectsUsed: [
      { name: 'AgentPay', slug: 'agentpay' }
    ]
  },

  // INFRASTRUCTURE
  {
    name: 'Docker & Containers',
    category: 'INFRASTRUCTURE',
    level: 'Advanced',
    experienceYears: '2 yrs',
    description: 'Multi-stage Docker builds, docker-compose multi-service development, and reproducible production environments.',
    projectsUsed: [
      { name: 'AgentPay', slug: 'agentpay' },
      { name: 'Fraud Detection System', slug: 'fraud-detection-system' }
    ]
  },
  {
    name: 'Git & GitHub CI/CD',
    category: 'INFRASTRUCTURE',
    level: 'Expert',
    experienceYears: '4 yrs',
    description: 'Branch protection strategies, semantic commit hygiene, GitHub Actions linting and testing pipelines.',
    projectsUsed: [
      { name: 'AgentPay', slug: 'agentpay' },
      { name: 'HireIQ', slug: 'hireiq' },
      { name: 'MamaSoft', slug: 'mamasoft' }
    ]
  },
  {
    name: 'Linux / Shell Scripting',
    category: 'INFRASTRUCTURE',
    level: 'Advanced',
    experienceYears: '3 yrs',
    description: 'Bash automation, server administration, systemd service management, and remote compute configuration.',
    projectsUsed: [
      { name: 'Vision-Indore', slug: 'vision-indore' },
      { name: 'LULU AI Assistant', slug: 'lulu-ai-assistant' }
    ]
  }
];
