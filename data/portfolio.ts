export interface SocialLink {
  name: string;
  url: string;
  label: string;
  icon: 'github' | 'linkedin' | 'kaggle' | 'email';
}

export interface StatItem {
  id: string;
  metric: string;
  label: string;
  detail: string;
  iconName: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  institutionNote?: string;
  period: string;
  location: string;
  description: string[];
  techChips: string[];
}

export interface FeaturedProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  screenshot: string;
  liveUrl: string;
  repoUrl?: string;
  stack: string[];
  disclaimer?: string;
  blurScreenshot?: boolean;
  architectureHighlights: {
    title: string;
    description: string;
  }[];
  systemMetrics?: string[];
}

export interface SmallerProject {
  id: string;
  title: string;
  description: string;
  stack: string[];
  repoUrl?: string;
  liveUrl?: string;
  isPlaceholder?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  iconName: string;
  skills: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  category: 'Leadership' | 'Competition' | 'Global Ranking';
  organization: string;
  description: string;
  badge?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  badgeCode: string;
  skillsLearned: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  coursework: string[];
  description: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    monogram: string;
    titles: string[];
    valueStatement: string;
    availability: string;
    location: string;
    email: string;
    resumePath: string;
    summary: string;
  };
  socials: SocialLink[];
  stats: StatItem[];
  experience: ExperienceItem[];
  featuredProjects: FeaturedProject[];
  smallerProjects: SmallerProject[];
  skills: SkillCategory[];
  achievements: AchievementItem[];
  certifications: CertificationItem[];
  education: EducationItem;
}

export const portfolioData: PortfolioData = {
  personal: {
    name: 'Amay Mishra',
    monogram: 'AM',
    titles: [
      'AI/ML Engineer',
      'Software Engineer',
      'RAG & Agentic AI Builder',
    ],
    valueStatement:
      'Building retrieval-augmented and agentic AI systems from backend API design through model integration, evaluation and deployment.',
    availability: 'Seeking full-time roles & internships',
    location: 'Bengaluru, Karnataka, India',
    email: 'amaymishra1104@gmail.com',
    resumePath: '/Amay_Mishra_Resume.pdf',
    summary:
      'Final-year B.Tech CSIT student focused on end-to-end AI engineering, building retrieval-augmented and agentic AI systems from backend API design through model integration, evaluation and deployment.',
  },

  socials: [
    {
      name: 'GitHub',
      url: 'https://github.com/amaymishra1104',
      label: 'github.com/amaymishra1104',
      icon: 'github',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/amay-mishra-419766331',
      label: 'linkedin.com/in/amay-mishra',
      icon: 'linkedin',
    },
    {
      name: 'Kaggle',
      url: 'https://kaggle.com/amaymishra11',
      label: 'kaggle.com/amaymishra11',
      icon: 'kaggle',
    },
    {
      name: 'Email',
      url: 'https://mail.google.com/mail/?view=cm&fs=1&to=amaymishra1104@gmail.com&su=Inquiry%20from%20Portfolio',
      label: 'amaymishra1104@gmail.com',
      icon: 'email',
    },
  ],

  stats: [
    {
      id: 'stat-kaggle',
      metric: 'Top 2%',
      label: 'Kaggle Dataset Expert',
      detail: 'Ranked #280 globally of 12,800+ data scientists',
      iconName: 'Award',
    },
    {
      id: 'stat-certs',
      metric: '3 Verified',
      label: 'Industry Certifications',
      detail: 'AWS AI Practitioner, Oracle OCI DS, NVIDIA Deep Learning',
      iconName: 'ShieldCheck',
    },
    {
      id: 'stat-hackathon',
      metric: '4th Place',
      label: 'HackWise Hackathon',
      detail: 'National podium finish at IIM Indore',
      iconName: 'Trophy',
    },
    {
      id: 'stat-projects',
      metric: '9 Projects',
      label: 'AI & Production Systems',
      detail: 'RAG pipelines, autonomous agents, and full-stack apps',
      iconName: 'Boxes',
    },
  ],

  experience: [
    {
      id: 'exp-annamai',
      role: 'MERN Stack Development Intern',
      company: 'AnnamAI',
      institutionNote: 'IIT Ropar',
      period: 'May 2026 – Jul 2026',
      location: 'Rupnagar, Punjab (Hybrid / Remote)',
      description: [
        'Built full-stack features on the MERN stack with responsive React interfaces connected to backend services.',
        'Designed RESTful APIs in Node.js/Express with MongoDB models covering CRUD, request validation and error handling.',
        'Used Git workflows, testing and debugging to ship across the stack.',
      ],
      techChips: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'Git', 'Testing'],
    },
  ],

  featuredProjects: [
    {
      id: 'agenthub',
      title: 'AgentHub',
      subtitle: 'Custom Agent Creation & Retrieval-Augmented Generation Platform',
      description:
        'Full-stack AI platform to create, configure and deploy custom AI agents with their own instructions and knowledge bases. RAG grounds answers in uploaded documents; HuggingFace embeddings + pgvector semantic search; Groq for low-latency inference; Supabase Auth with per-user ownership checks; serverless Next.js App Router backend.',
      screenshot: '/projects/agenthub.png',
      liveUrl: 'https://agenthub-ai-ujxo.onrender.com/',
      repoUrl: 'https://github.com/amaymishra1104/agenthub-ai',
      stack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'pgvector', 'Groq', 'HuggingFace', 'Tailwind'],
      systemMetrics: ['< 450ms Groq inference', 'Hybrid RAG retrieval', 'Per-user data isolation'],
      architectureHighlights: [
        {
          title: 'Document Ingestion & Vector Embeddings',
          description:
            'Parses uploaded enterprise documents into chunks, generates HuggingFace dense vector embeddings, and stores them in PostgreSQL with pgvector cosine distance indexing for fast semantic retrieval.',
        },
        {
          title: 'Low-Latency Groq LLM Inference',
          description:
            'Leverages Groq LPUs via Next.js serverless streaming routes to deliver high token-per-second reasoning, minimizing time-to-first-token for grounded agent answers.',
        },
        {
          title: 'Secure Multi-Tenant Architecture',
          description:
            'Implements Supabase Auth with PostgreSQL Row-Level Security (RLS) policies enforcing complete isolation across user custom agents, system prompts, and vectorized knowledge corpora.',
        },
      ],
    },
    {
      id: 'hireiq',
      title: 'Hire.IQ',
      subtitle: 'Voice-Enabled AI Interview Copilot & Live Coding Round Sandbox',
      description:
        'Voice-enabled interview simulator with a 3-agent SSE streaming pipeline (Google Gemini), adaptive difficulty, 60+ company-style personas, real-time 0-10 scoring with strengths/weaknesses, live coding round (Monaco + Piston, 8 languages), 2-way voice (Deepgram STT, ElevenLabs TTS).',
      screenshot: '/projects/hireiq.png',
      liveUrl: 'https://hire-iq-opal.vercel.app/',
      repoUrl: 'https://github.com/amaymishra1104/Hire.IQ',
      stack: ['Next.js', 'Node/Express', 'MongoDB', 'Clerk', 'Gemini', 'Deepgram', 'ElevenLabs', 'Monaco'],
      systemMetrics: ['3-agent streaming pipeline', '60+ company personas', '8 languages live coding'],
      architectureHighlights: [
        {
          title: '3-Agent SSE Pipeline',
          description:
            'A coordinated agent loop: an Interviewer persona agent leads the dialogue, an Evaluator agent scores technical depth in parallel, and a Synthesizer formats real-time feedback via Server-Sent Events.',
        },
        {
          title: 'Duplex Voice Streaming',
          description:
            'Integrated Deepgram streaming Speech-to-Text with ElevenLabs realistic voice generation to create conversational, low-latency spoken interview dynamics.',
        },
        {
          title: 'Sandboxed Code Execution Engine',
          description:
            'Integrated Monaco Editor coupled with Piston remote execution backend, letting candidates solve coding challenges across 8 programming languages with test case verification.',
        },
      ],
    },
    {
      id: 'datemind',
      title: 'DateMind AI',
      subtitle: 'Agentic Matchmaking Simulator with Structured Multi-Round Dialogue',
      description:
        'Agentic matchmaking simulator: each person on a 25-profile roster is represented by an AI agent built from verified public-profile evidence, and two agents hold a structured 5-round conversation (introduction, getting to know each other, common ground, agent evaluations, mutual compatibility score). Includes a matchmaker and a data-ingestion flow.',
      screenshot: '/projects/datemind.png',
      liveUrl: 'https://datemind-chi.vercel.app/',
      stack: ['Next.js App Router', 'TypeScript', 'Tailwind', 'Groq LLM', 'Prompt Architecture'],
      disclaimer: 'Public-Profile Personas Simulation · All agents are algorithmic behavioral models',
      blurScreenshot: true,
      systemMetrics: ['5-round agent dialogue', 'Dual-agent reciprocity', 'Deterministic score matrix'],
      architectureHighlights: [
        {
          title: '5-Round Structured Protocol',
          description:
            'Autonomous turn-taking pipeline progressing through Intro, Exploring Interests, Common Ground, Agent Self-Evaluations, and Final Composite Compatibility Index calculation.',
        },
        {
          title: 'Public-Profile Personas',
          description:
            'Personas are modeled strictly as algorithmic agent simulations derived from public-profile evidence, keeping behavioral dynamics consistent without real-person attribution.',
        },
        {
          title: 'Groq-Powered Behavioral Modeling',
          description:
            'Runs dual-agent prompt chains via low-latency Groq inference to maintain consistent conversational tone, personal preferences, and mutual chemistry metrics.',
        },
      ],
    },
    {
      id: 'lulu',
      title: 'Lulu AI Assistant',
      subtitle: 'Retail Customer-Support Conversational Agent',
      description:
        'Retail customer-support chatbot for delivery, returns, refunds and store-policy questions, with voice input, language selection, quick-reply prompts and a live online status.',
      screenshot: '/projects/lulu.png',
      liveUrl: 'https://lulu-ai-assistant.vercel.app/',
      stack: ['Next.js', 'React', 'Tailwind CSS', 'Web Speech API'],
      systemMetrics: ['Voice & text input', 'Multilingual support', 'Instant policy answers'],
      architectureHighlights: [
        {
          title: 'Policy Retrieval & Intent Mapping',
          description:
            'Fast matching against structured catalog policies: returns, exchange timelines, shipping tracking, and payment reconciliations.',
        },
        {
          title: 'Multimodal Accessibility',
          description:
            'Speech recognition powered by Web Speech API, multilingual localization toggles, and contextual quick-reply chips for swift touch interactions.',
        },
      ],
    },
  ],

  smallerProjects: [
    {
      id: 'civicai',
      title: 'CivicAI',
      description:
        'Smart citizen and urban intelligence platform. Citizens report civic issues with photo + GPS; an AI service classifies images and text, scores severity (a "Civic Pain Score") and routes to the right department; admin dashboard with maps/heatmaps and a WhatsApp bot.',
      stack: ['React', 'Vite', 'Node/Express', 'MongoDB', 'Python FastAPI', 'Twilio', 'Leaflet'],
      repoUrl: 'https://github.com/amaymishra1104/CivicAI',
    },
    {
      id: 'documind',
      title: 'DocuMind AI',
      description:
        'Documentation generator that analyzes real source code via Python AST (functions, classes, complexity, control flow, dependencies) and outputs a README, function docs, architecture summary and Mermaid diagrams in a Monaco-based React UI.',
      stack: ['FastAPI', 'React', 'Monaco', 'Mermaid', 'Python AST'],
      repoUrl: 'https://github.com/amaymishra1104/documind',
    },
    {
      id: 'agentpay',
      title: 'AgentPay',
      description:
        'AI-powered agentic commerce platform built for Razorpay AI Buildathon 2026 (Track 1) with HMAC token validation and spending limit policies.',
      stack: ['LangGraph', 'FastAPI', 'Next.js', 'PostgreSQL', 'Stripe API'],
      repoUrl: 'https://github.com/amaymishra1104/agentpay-ai',
      isPlaceholder: false,
    },
    {
      id: 'careerpilot',
      title: 'CareerPilot.ai',
      description:
        'Autonomous career copilot & governed job application engine featuring live job discovery (Remotive API), multi-profile resume management, deterministic match scoring, zero-hallucination factual tailoring, and a strict human-approval gated Gmail draft engine.',
      stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Gemini AI', 'Remotive API', 'Vitest'],
      repoUrl: 'https://github.com/amaymishra1104/CareerPilot.ai',
      isPlaceholder: false,
    },
    {
      id: 'alexandria',
      title: 'alexandria.ai',
      description:
        'Decentralized research knowledge graph & autonomous literature synthesis engine for AI and computational literature.',
      stack: ['Python', 'FastAPI', 'Neo4j', 'LangChain', 'Next.js'],
      isPlaceholder: true,
    },
  ],

  skills: [
    {
      id: 'languages',
      title: 'Languages',
      description: 'Core programming languages for machine learning, backend pipelines, and systems.',
      iconName: 'Code2',
      skills: ['Python', 'SQL', 'JavaScript', 'TypeScript'],
    },
    {
      id: 'aiml',
      title: 'AI / Machine Learning',
      description: 'Deep learning frameworks, architectures, fine-tuning, and modern generative AI.',
      iconName: 'Brain',
      skills: [
        'TensorFlow',
        'PyTorch',
        'Scikit-Learn',
        'HuggingFace',
        'NLP',
        'Deep Learning',
        'LLM',
        'RAG',
        'Generative AI',
        'Fine-tuning',
        'XGBoost',
        'BERT',
        'SMOTE',
      ],
    },
    {
      id: 'frameworks',
      title: 'Frameworks & Web',
      description: 'Production web architectures, asynchronous APIs, and data science computation.',
      iconName: 'Layers',
      skills: ['Next.js', 'React', 'FastAPI', 'Flask', 'Pandas', 'NumPy'],
    },
    {
      id: 'backend',
      title: 'Backend & Systems',
      description: 'Distributed services, vector search indexing, authentication, and cloud infrastructure.',
      iconName: 'Server',
      skills: ['REST API design', 'Auth', 'Serverless', 'pgvector', 'ChromaDB'],
    },
    {
      id: 'data-tools',
      title: 'Data & Developer Tools',
      description: 'Relational & NoSQL databases, experimentation notebooks, and enterprise cloud.',
      iconName: 'Database',
      skills: ['PostgreSQL', 'Supabase', 'MongoDB', 'Git', 'Jupyter', 'Kaggle', 'Oracle OCI'],
    },
  ],

  achievements: [
    {
      id: 'ach-rotaract',
      title: 'District Club Service Director',
      category: 'Leadership',
      organization: 'Rotaract RID 3040',
      description:
        'Spearheaded club service initiatives, cross-club collaborations, youth leadership development programs, and community-driven social impact drives across the district.',
      badge: 'District Leadership',
    },
    {
      id: 'ach-kaggle',
      title: 'Kaggle Dataset Expert',
      category: 'Global Ranking',
      organization: 'Kaggle',
      description:
        'Ranked #280 out of 12,800+ data science practitioners worldwide (Top 2% globally), earning gold and silver medal citations for high-utility open-source datasets.',
      badge: 'Top 2% Globally',
    },
    {
      id: 'ach-hackwise',
      title: '4th Place, HackWise Hackathon',
      category: 'Competition',
      organization: 'IIM Indore',
      description:
        'Secured 4th place in national collegiate hackathon organized at the Indian Institute of Management Indore, pitching and building an AI-driven automation solution.',
      badge: 'Podium Finish',
    },
    {
      id: 'ach-competitions',
      title: 'Competitive AI Hackathons',
      category: 'Competition',
      organization: 'Amazon ML Hackathon · AI Manthan · Ethos',
      description:
        'Finalist and competitive participant across high-stakes ML sprints, engineering computer vision and NLP models under tight deadlines.',
      badge: 'Competitor',
    },
  ],

  certifications: [
    {
      id: 'cert-aws',
      title: 'AWS Certified AI Practitioner',
      issuer: 'Amazon Web Services',
      issueDate: 'Jun 2026',
      badgeCode: 'AWS-AIP',
      skillsLearned: ['Foundation Models', 'Prompt Engineering', 'Bedrock', 'Responsible AI'],
    },
    {
      id: 'cert-oracle',
      title: 'Oracle OCI Data Science Professional',
      issuer: 'Oracle Cloud Infrastructure',
      issueDate: 'Oct 2025',
      badgeCode: 'OCI-DSP',
      skillsLearned: ['OCI Data Science', 'Distributed Training', 'Model Deployment', 'Pipelines'],
    },
    {
      id: 'cert-nvidia',
      title: 'Fundamentals of Deep Learning',
      issuer: 'NVIDIA Deep Learning Institute',
      issueDate: 'Apr 2026',
      badgeCode: 'DLI-FDL',
      skillsLearned: ['Neural Networks', 'Computer Vision', 'PyTorch', 'Transfer Learning'],
    },
  ],

  education: {
    degree: 'B.Tech in Computer Science & Information Technology (CSIT)',
    institution: 'Acropolis Institute of Technology and Research',
    location: 'Bhopal, Madhya Pradesh, India',
    period: 'Aug 2023 – Jun 2027',
    coursework: [
      'Machine Learning',
      'Artificial Intelligence',
      'Data Structures & Algorithms',
      'Database Management Systems (DBMS)',
      'Probability & Statistics',
      'Computer Networks',
    ],
    description:
      'Pursuing an engineering degree centered on computer science fundamentals, scalable software design, and applied intelligence systems.',
  },
};
