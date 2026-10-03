export interface BuildLogEntry {
  id: string;
  date: string;
  monthYear: string;
  title: string;
  description: string;
  tags: ('AI' | 'FULL STACK' | 'BACKEND' | 'ML' | 'EXPERIMENTS')[];
  projectSlug?: string;
  projectName?: string;
  commitHash?: string;
  metrics?: string;
}

export const buildLogData: BuildLogEntry[] = [
  {
    id: 'log-01',
    date: '2026-10-02',
    monthYear: 'OCT 2026',
    title: 'Engineered AgentPay Concurrency & Idempotency Testing Suite',
    description: 'Benchmarked 200 concurrent agent payment requests against the FastAPI gateway. Enforced strict Redis lock serialization and verified zero double-spend incidents during simulated network drops.',
    tags: ['AI', 'BACKEND', 'EXPERIMENTS'],
    projectSlug: 'agentpay',
    projectName: 'AgentPay',
    commitHash: '8b4d9a1',
    metrics: '0 duplicates across 500 parallel transactions'
  },
  {
    id: 'log-02',
    date: '2026-09-28',
    monthYear: 'SEP 2026',
    title: 'Integrated Real-Time Code Execution Sandboxing in HireIQ',
    description: 'Upgraded candidate IDE execution pipeline with client-side WebAssembly Python runner fallback when cloud compute sandbox hits quota limit.',
    tags: ['FULL STACK', 'AI'],
    projectSlug: 'hireiq',
    projectName: 'HireIQ',
    commitHash: '3f7c20d',
    metrics: 'Sub-80ms syntax validation feedback'
  },
  {
    id: 'log-03',
    date: '2026-09-22',
    monthYear: 'SEP 2026',
    title: 'MamaSoft Multi-Tenant Healthcare Schema Modeling',
    description: 'Finalized PostgreSQL relational schemas with row-level security (RLS) guaranteeing total medical record isolation between clinic tenants.',
    tags: ['FULL STACK', 'BACKEND'],
    projectSlug: 'mamasoft',
    projectName: 'MamaSoft',
    commitHash: '5e1a90c',
    metrics: '100% schema isolation coverage'
  },
  {
    id: 'log-04',
    date: '2026-09-15',
    monthYear: 'SEP 2026',
    title: 'Reciprocal Rank Fusion (RRF) Hybrid Search in CrunchReader',
    description: 'Combined dense 384-dimensional sentence transformer embeddings with sparse BM25 token matches. Improved contextual retrieval recall on technical tables by 28%.',
    tags: ['AI', 'ML'],
    projectSlug: 'crunchreader',
    projectName: 'CrunchReader',
    commitHash: '9a3f11b',
    metrics: '+28% retrieval recall on dense tables'
  },
  {
    id: 'log-05',
    date: '2026-08-30',
    monthYear: 'AUG 2026',
    title: 'LULU AI Assistant System-Wide Hotkey & Context Sniffer',
    description: 'Optimized Electron native hooks to read active terminal exit codes without spiking CPU usage. Reduced background RAM footprint to under 85MB.',
    tags: ['EXPERIMENTS', 'AI'],
    projectSlug: 'lulu-ai-assistant',
    projectName: 'LULU AI Assistant',
    commitHash: '2e81d77',
    metrics: '<85MB idle memory'
  },
  {
    id: 'log-06',
    date: '2026-05-24',
    monthYear: 'MAY 2026',
    title: 'Tuned Cost-Sensitive XGBoost Pipeline for Fraud Detection',
    description: 'Trained model on 280,000+ transaction records with 0.17% fraud ratio. Implemented SMOTE and threshold calibration to achieve 0.89 PR-AUC score.',
    tags: ['ML', 'BACKEND'],
    projectSlug: 'fraud-detection-system',
    projectName: 'Fraud Detection System',
    commitHash: '1c49f82',
    metrics: '0.89 PR-AUC with sub-15ms inference'
  },
  {
    id: 'log-07',
    date: '2025-10-30',
    monthYear: 'OCT 2025',
    title: 'Deployed CivicAI PostGIS Spatial Clustering for Duplicate Reports',
    description: 'Implemented ST_DWithin geospatial query filter to group nearby citizen issue reports into a single consolidated municipal work order ticket.',
    tags: ['FULL STACK', 'AI', 'BACKEND'],
    projectSlug: 'civicai',
    projectName: 'CivicAI',
    commitHash: '7d90a5e',
    metrics: 'Merged 35% duplicate civic tickets'
  }
];
