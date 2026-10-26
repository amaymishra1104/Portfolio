export interface ArchitectureNode {
  id: string;
  name: string;
  role: string;
  tech: string;
  details: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  category: 'AI / AGENTS' | 'FULL STACK' | 'ML / DATA' | 'SYSTEMS';
  status: 'PRODUCTION' | 'ACTIVE BUILD' | 'STABLE' | 'RESEARCH';
  technologies: string[];
  featured: boolean;
  github?: string;
  demo?: string;
  summary: string;
  problem: string;
  solution: string;
  architecture: ArchitectureNode[];
  engineeringHighlights: { title: string; description: string }[];
  codeSnippet?: { title: string; language: string; code: string };
  lessons: string[];
  metrics?: { label: string; value: string }[];
}

export const projects: Project[] = [
  {
    slug: 'agentpay',
    name: 'AgentPay',
    tagline: 'Autonomous AI Agent Payment & Transaction Execution Protocol',
    category: 'AI / AGENTS',
    status: 'ACTIVE BUILD',
    technologies: ['Python', 'FastAPI', 'LangChain', 'PostgreSQL', 'Docker', 'Stripe API'],
    featured: true,
    github: 'https://github.com/amaymishra1104/agentpay-ai',
    summary: 'A secure, policy-governed transaction rail enabling autonomous AI agents to execute budgetary checks, authenticate payments, and settle micro-transactions with idempotency.',
    problem: 'Autonomous agents can plan complex multi-step tasks, but when required to purchase an API license, reserve compute, or pay for data, they lack bounded financial authority, signature verification, and replay attack prevention.',
    solution: 'Engineered an intermediary agent payment gateway featuring spending limit policies, cryptographic HMAC token validation, idempotent order processing, and webhook state reconcilers.',
    architecture: [
      { id: 'agent', name: 'Autonomous Agent', role: 'Initiator', tech: 'LangChain / Python', details: 'Generates structured transaction intent with signed budget payload' },
      { id: 'gateway', name: 'AgentPay Gateway', role: 'Policy Engine', tech: 'FastAPI / AsyncIO', details: 'Validates spending caps, cryptographic signatures, and rate limits' },
      { id: 'ledger', name: 'Audit Ledger', role: 'State Machine', tech: 'PostgreSQL', details: 'Maintains immutable transaction records with two-phase commit lock' },
      { id: 'provider', name: 'Payment Processor', role: 'Settlement', tech: 'Stripe API / Webhooks', details: 'Executes actual fiat/crypto payment settlement' },
      { id: 'reconciler', name: 'Webhook Reconciler', role: 'Verification', tech: 'Redis / Celery', details: 'Guarantees at-least-once delivery with exponential backoff' }
    ],
    engineeringHighlights: [
      { title: 'Strict Idempotency', description: 'Engineered UUIDv5 deterministic hash keys ensuring network retries never trigger duplicate payment authorizations.' },
      { title: 'Granular Spend Policies', description: 'Configurable token allowances per agent instance with sliding-window budget limits.' },
      { title: 'Zero Hallucination Financial Gate', description: 'Strict Pydantic JSON schemas with deterministic runtime checks before any external API invocation.' }
    ],
    codeSnippet: {
      title: 'Agent Payment Authorization Gate',
      language: 'python',
      code: `@app.post("/api/v1/agent/transact", response_model=TransactionReceipt)
async def process_agent_transaction(
    payload: AgentTransactionRequest,
    x_agent_sig: str = Header(...)
):
    # 1. Cryptographic HMAC-SHA256 signature verification
    if not verify_agent_signature(payload.agent_id, payload.dict(), x_agent_sig):
        raise HTTPException(status_code=401, detail="Agent signature verification failed")
    
    # 2. Atomic budget policy validation
    async with db.transaction():
        agent_budget = await get_budget(payload.agent_id)
        if payload.amount > agent_budget.remaining_spend_limit:
            raise BudgetExceededError("Transaction exceeds agent spend cap")
            
        receipt = await payment_provider.charge_with_idempotency(
            idempotency_key=payload.idempotency_key,
            amount=payload.amount,
            currency=payload.currency
        )
        await log_audit_trail(payload.agent_id, receipt.id, status="CONFIRMED")
        return receipt`
    },
    lessons: [
      'Autonomous systems require defensive engineering at every boundary—LLM outputs cannot be trusted with raw financial credentials.',
      'Distributed idempotency keys must be persisted before calling external banking endpoints to avoid edge-case double charges during network partitions.'
    ]
  },
  {
    slug: 'hireiq',
    name: 'HireIQ',
    tagline: 'Autonomous AI Technical Interview & Candidate Evaluation Platform',
    category: 'AI / AGENTS',
    status: 'PRODUCTION',
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'OpenAI API', 'Tailwind CSS', 'WebSockets'],
    featured: true,
    github: 'https://github.com/amaymishra1104/HireIQ',
    summary: 'An interactive technical interview co-pilot that adapts follow-up questions dynamically based on live candidate code reasoning, time complexity, and edge cases.',
    problem: 'Traditional technical screening depends on static questionnaires or stressful human panels that often introduce subjective bias and inconsistent technical grading.',
    solution: 'Created an intelligent platform that streams real-time code analysis, identifies logical vulnerabilities, asks contextual probing questions, and produces objective rubric evaluations.',
    architecture: [
      { id: 'ide', name: 'Candidate Code IDE', role: 'Frontend Client', tech: 'Next.js / Monaco Editor', details: 'Captures keystrokes, language runtime, and execution output' },
      { id: 'stream', name: 'Real-time Socket', role: 'Bi-directional Stream', tech: 'WebSocket Gateway', details: 'Transmits AST changes and interview dialogue tokens with sub-100ms latency' },
      { id: 'eval', name: 'Evaluation Agent', role: 'Reasoning Engine', tech: 'LangChain / GPT-4', details: 'Analyzes algorithm complexity (Big-O) and detects code pitfalls' },
      { id: 'interviewer', name: 'Dialogue Agent', role: 'Voice & Text Copilot', tech: 'Edge TTS / Audio Worklet', details: 'Poses conversational follow-ups without revealing direct solutions' }
    ],
    engineeringHighlights: [
      { title: 'AST-Based Code Analysis', description: 'Extracts syntax trees to assess candidate structural code hygiene without needing remote sandbox compilation on every keystroke.' },
      { title: 'Dynamic Rubric Engine', description: 'Quantifies problem-solving approach, algorithmic efficiency, and edge case awareness into reproducible scoring vectors.' }
    ],
    lessons: [
      'Structuring prompts with few-shot evaluation rubrics drastically cuts LLM grading variance across candidate submissions.'
    ]
  },
  {
    slug: 'civicai',
    name: 'CivicAI (CivicSense)',
    tagline: 'Municipal Grievance Intelligence & Geo-Spatial Computer Vision Platform',
    category: 'AI / AGENTS',
    status: 'PRODUCTION',
    technologies: ['TypeScript', 'React', 'FastAPI', 'PyTorch', 'PostGIS', 'Leaflet'],
    featured: true,
    github: 'https://github.com/amaymishra1104/CivicAI',
    summary: 'An automated civic infrastructure monitoring and grievance pipeline that verifies citizen reports through computer vision and dispatches automated municipal work orders.',
    problem: 'Municipalities receive thousands of unstructured complaints regarding potholes, garbage spills, and broken streetlights, leading to duplicate tickets and prolonged resolution times.',
    solution: 'Designed an intelligent intake system that classifies uploaded photo evidence using computer vision, extracts GPS metadata, eliminates duplicates via spatial proximity, and routes tickets.',
    architecture: [
      { id: 'mobile', name: 'Citizen Portal', role: 'Ingestion Interface', tech: 'Next.js PWA', details: 'Client camera capture with EXIF GPS location verification' },
      { id: 'cv', name: 'Vision Classifier', role: 'Triage Model', tech: 'PyTorch / MobileNetV3', details: 'Categorizes civic defect severity (e.g., Pothole, Water Leak, Waste)' },
      { id: 'dedup', name: 'Geo-Spatial Cluster', role: 'Deduplication', tech: 'PostgreSQL / PostGIS', details: 'Detects duplicate complaints within a 15-meter radius and merges reports' },
      { id: 'dispatch', name: 'Department Router', role: 'Workflow Automation', tech: 'FastAPI / RabbitMQ', details: 'Notifies assigned zone engineers and tracks resolution SLA' }
    ],
    engineeringHighlights: [
      { title: 'Spatial Clustering', description: 'Employed PostGIS ST_DWithin queries to prevent spamming departments with multiple tickets for the same roadway fissure.' },
      { title: 'Edge Image Sanitization', description: 'Stripped personal identifiers and PII from citizen images on upload to comply with data privacy policies.' }
    ],
    lessons: [
      'Real-world mobile photo capture contains motion blur and bad lighting; incorporating an image quality validation gate before model inference reduced classification false positives by 42%.'
    ]
  },
  {
    slug: 'lulu-ai-assistant',
    name: 'LULU AI Assistant',
    tagline: 'Context-Aware Desktop & Engineering Workflow Automation Assistant',
    category: 'AI / AGENTS',
    status: 'STABLE',
    technologies: ['JavaScript', 'Electron', 'Node.js', 'LLM API', 'SQLite'],
    featured: true,
    github: 'https://github.com/amaymishra1104/lulu-ai-assistant',
    summary: 'A fast, desktop assistant tailored for developers that indexes active shell commands, extracts context from open editors, and automates repetitive engineering workflows.',
    problem: 'Engineers lose hours daily switching windows between StackOverflow, terminal commands, documentation tabs, and clipboard histories.',
    solution: 'Engineered a lightweight, hotkey-activated assistant that understands active terminal errors and explains stack traces with zero context switching.',
    architecture: [
      { id: 'tray', name: 'Global Hotkey Daemon', role: 'System Listener', tech: 'Electron / C++ Addon', details: 'Captures system-wide activation shortcut with near-zero idle CPU usage' },
      { id: 'extractor', name: 'Context Extractor', role: 'Active Window Sniffer', tech: 'Node.js / OS APIs', details: 'Gathers terminal stdout or IDE selected text with user consent' },
      { id: 'synthesizer', name: 'Local Reasoner', role: 'Answer Synthesizer', tech: 'LLM Orchestrator', details: 'Generates shell command fixes and inline patch suggestions' }
    ],
    engineeringHighlights: [
      { title: 'Low Memory Footprint', description: 'Streamlined Electron main process to consume under 85MB of RAM during idle background monitoring.' },
      { title: 'Safe Command Execution', description: 'Required explicit user confirmation modal with colored parameter diffs before executing any terminal modification.' }
    ],
    lessons: [
      'Developer tooling must prioritize response speed above all else; streaming the first response token within 250ms is critical for desktop UX.'
    ]
  },
  {
    slug: 'mamasoft',
    name: 'MamaSoft',
    tagline: 'Clinical Practice Workflow & Automated Patient Care Platform',
    category: 'FULL STACK',
    status: 'ACTIVE BUILD',
    technologies: ['Next.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
    featured: true,
    summary: 'A modern, full-stack clinical operations software designed to automate patient appointments, prescription generation, and diagnostic record workflows with zero friction.',
    problem: 'Outdated legacy healthcare software is clunky, slow, desktop-locked, and prone to scheduling conflicts that frustrate doctors and patients alike.',
    solution: 'Constructed an intuitive cloud-native healthcare dashboard providing instant patient lookups, conflict-free appointment calendars, and automated SMS/WhatsApp reminders.',
    architecture: [
      { id: 'ui', name: 'Provider Portal', role: 'Web Client', tech: 'Next.js 14 / Tailwind', details: 'Responsive doctor/receptionist dashboard with keyboard shortcuts' },
      { id: 'api', name: 'Clinical Backend', role: 'API Server', tech: 'FastAPI / Python', details: 'HIPAA-conscious data models with role-based JWT authentication' },
      { id: 'db', name: 'Secure Database', role: 'Persistent Store', tech: 'PostgreSQL', details: 'Encrypted medical records with strict schema constraints and audit logs' },
      { id: 'notify', name: 'Notification Service', role: 'Outreach Worker', tech: 'Async Worker / Celery', details: 'Triggers automated visit confirmations and pre-visit reminders' }
    ],
    engineeringHighlights: [
      { title: 'Optimistic UI Updates', description: 'Leveraged SWR with optimistic mutations so doctors can mark patient statuses with zero perceived latency.' },
      { title: 'Strict Role-Based Access Control', description: 'Fine-grained permissions separating receptionist booking access from physician diagnostic notes.' }
    ],
    lessons: [
      'Healthcare software requires extreme clarity in typography and keyboard accessibility so clinical staff can navigate without reaching for a mouse during consultations.'
    ]
  },
  {
    slug: 'fraud-detection-system',
    name: 'Fraud Detection System',
    tagline: 'Real-Time Financial Transaction Anomaly & Risk Scoring Pipeline',
    category: 'ML / DATA',
    status: 'STABLE',
    technologies: ['Python', 'XGBoost', 'Scikit-learn', 'Pandas', 'Flask', 'Docker'],
    featured: true,
    github: 'https://github.com/amaymishra1104/Fraud-Detection-System',
    summary: 'An end-to-end machine learning pipeline that classifies fraudulent financial transactions in real time with high recall on severely imbalanced datasets.',
    problem: 'Financial institutions face millions in losses while fighting extreme data skew (fraud accounts for < 0.2% of transactions), where standard classifiers fail completely.',
    solution: 'Trained and tuned an ensemble pipeline leveraging SMOTE oversampling, PCA feature extraction, and XGBoost with cost-sensitive hyperparameter optimization.',
    architecture: [
      { id: 'stream', name: 'Transaction Stream', role: 'Data Ingestion', tech: 'REST API / JSON', details: 'Receives transaction payloads: amount, time delta, geographic indicators' },
      { id: 'pre', name: 'Feature Transformer', role: 'Data Preprocessor', tech: 'NumPy / Scikit-learn', details: 'Performs robust z-score scaling, cyclic time encoding, and PCA projection' },
      { id: 'model', name: 'XGBoost Risk Scorer', role: 'Classification Model', tech: 'XGBoost / C++ Engine', details: 'Outputs continuous fraud probability with calibrated thresholding' },
      { id: 'explain', name: 'SHAP Explainer', role: 'Model Interpretability', tech: 'SHAP / TreeExplainer', details: 'Provides feature-level attributions explaining why a transaction was flagged' }
    ],
    engineeringHighlights: [
      { title: 'Cost-Sensitive Calibration', description: 'Calibrated decision thresholds to minimize expensive false negatives while keeping false positives below 1.5%.' },
      { title: 'Sub-15ms Model Inference', description: 'Serialized trees via optimized ONNX/XGBoost C-APIs achieving lightning-fast inference times.' }
    ],
    codeSnippet: {
      title: 'Cost-Sensitive Model Evaluation Pipeline',
      language: 'python',
      code: `import xgboost as xgb
from sklearn.metrics import classification_report, roc_auc_score

# Imbalance ratio calculation
imbalance_ratio = (len(y_train) - sum(y_train)) / sum(y_train)

model = xgb.XGBClassifier(
    n_estimators=300,
    max_depth=6,
    learning_rate=0.03,
    scale_pos_weight=imbalance_ratio,
    subsample=0.8,
    colsample_bytree=0.8,
    tree_method='hist',
    eval_metric='aucpr'
)

model.fit(
    X_train, y_train,
    eval_set=[(X_val, y_val)],
    early_stopping_rounds=25,
    verbose=False
)

# Inference risk calculation
y_prob = model.predict_proba(X_test)[:, 1]
print(f"PR-AUC Score: {roc_auc_score(y_test, y_prob):.4f}")`
    },
    lessons: [
      'Accuracy is a misleading metric for anomaly detection; PR-AUC and cost-weighted confusion matrices are the only honest evaluations for financial risk.'
    ]
  },
  {
    slug: 'crunchreader',
    name: 'CrunchReader',
    tagline: 'High-Precision Document Intelligence & RAG Parsing Pipeline',
    category: 'AI / AGENTS',
    status: 'STABLE',
    technologies: ['Python', 'FastAPI', 'PyPDF', 'ChromaDB', 'Sentence-Transformers', 'React'],
    featured: true,
    github: 'https://github.com/amaymishra1104/CrunchReader',
    summary: 'A document intelligence pipeline that decomposes complex technical manuals and research papers into structurally coherent semantic chunks for RAG architectures.',
    problem: 'Standard naive character-window chunking breaks tables, splits code snippets, and strips headers, resulting in low-quality LLM context retrieval and hallucinations.',
    solution: 'Developed a layout-aware chunking pipeline that preserves document hierarchy, generates dense vector embeddings, and executes hybrid vector + BM25 keyword search.',
    architecture: [
      { id: 'parser', name: 'Layout Parser', role: 'Document Decomposer', tech: 'PyPDF / LayoutParser', details: 'Extracts section headers, paragraphs, and markdown tables' },
      { id: 'chunker', name: 'Semantic Chunker', role: 'Chunking Engine', tech: 'Python / Regex Rules', details: 'Builds overlapping chunks aligned with logical topic boundaries' },
      { id: 'embed', name: 'Embedding Generator', role: 'Vectorization', tech: 'SentenceTransformers (bge-small)', details: 'Transforms text into 384-dimensional dense semantic vectors' },
      { id: 'index', name: 'Hybrid Vector Index', role: 'Storage & Search', tech: 'ChromaDB / BM25', details: 'Executes reciprocal rank fusion to fetch top-k context passages' }
    ],
    engineeringHighlights: [
      { title: 'Reciprocal Rank Fusion (RRF)', description: 'Blended dense semantic vector retrieval with BM25 sparse keyword scoring for significantly higher recall on technical jargon.' },
      { title: 'Chunk Boundary Preservation', description: 'Prevents split sentences across token boundaries with windowed sliding context.' }
    ],
    lessons: [
      '80% of RAG accuracy problems are data parsing and chunking problems, not LLM generation problems.'
    ]
  },
  {
    slug: 'vision-indore',
    name: 'Vision-Indore',
    tagline: 'Edge Computer Vision & Urban Traffic Intelligence System',
    category: 'ML / DATA',
    status: 'RESEARCH',
    technologies: ['Python', 'YOLOv8', 'OpenCV', 'PyTorch', 'FastAPI', 'Docker'],
    featured: true,
    summary: 'A computer vision telemetry system designed for smart city transit optimization, tracking vehicle density and intersection bottlenecks on edge compute devices.',
    problem: 'Fixed-timer traffic lights create needless congestion during peak hours because they cannot respond dynamically to actual vehicular volume at intersections.',
    solution: 'Built an edge-optimized vehicle detection and tracking pipeline using YOLOv8 with frame downsampling and Kalman filter tracking to report real-time vehicle flow.',
    architecture: [
      { id: 'feed', name: 'CCTV Video Stream', role: 'RTSP Ingestion', tech: 'OpenCV / VideoCapture', details: 'Pulls camera feed with hardware-accelerated H.264 decoding' },
      { id: 'yolo', name: 'Object Detector', role: 'Inference Engine', tech: 'YOLOv8-Nano / TensorRT', details: 'Detects cars, buses, bikes, and pedestrians at 30+ FPS' },
      { id: 'tracker', name: 'Vehicle Tracker', role: 'Trajectory Tracker', tech: 'ByteTrack / DeepSORT', details: 'Assigns persistent IDs to vehicles passing designated virtual tripwires' },
      { id: 'telemetry', name: 'Telemetry Publisher', role: 'Edge Output', tech: 'MQTT / REST', details: 'Publishes queue length and directional density to municipal dashboard' }
    ],
    engineeringHighlights: [
      { title: 'TensorRT FP16 Quantization', description: 'Quantized neural network weights to 16-bit floating point, reducing GPU memory footprint by 52% while doubling frames per second.' },
      { title: 'Virtual Polygon Tripwires', description: 'Allowed dynamic configuration of detection zones to measure vehicle turning movements at 4-way intersections.' }
    ],
    lessons: [
      'In edge deployments, memory bandwidth is almost always the real bottleneck before compute capability; frame skipping and resolution downscaling were essential.'
    ]
  },
  {
    slug: 'careerpilot',
    name: 'CareerPilot.ai',
    tagline: 'Autonomous Career Copilot & Governed Job Application Platform',
    category: 'AI / AGENTS',
    status: 'PRODUCTION',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Gemini AI', 'Remotive API', 'Vitest', 'Node.js'],
    featured: true,
    github: 'https://github.com/amaymishra1104/CareerPilot.ai',
    summary: 'An autonomous career copilot and governed outbound job application platform featuring live job discovery, multi-profile resume management, deterministic match scoring, factual tailoring, and a strict human-approval gated Gmail draft engine.',
    problem: 'Job seekers face high friction tracking applications and tailoring resumes, while untrusted autonomous agents risk hallucinating credentials, spraying low-quality emails, or sending unauthorized outreach without candidate oversight.',
    solution: 'Constructed an end-to-end governed application pipeline combining live job feed ingestion (Remotive API), zero-hallucination factual tailoring, transparent match confidence scoring, and an ironclad Human Approval Gate (HTTP 403 strict) before drafting personalized outreach in Gmail.',
    architecture: [
      { id: 'discovery', name: 'Job & Lead Discovery', role: 'Ingestion Engine', tech: 'Remotive API / Node.js', details: 'Ingests verified live tech roles with case-insensitive whitespace deduplication and company signal detection' },
      { id: 'matching', name: 'Transparent Match Engine', role: 'Confidence Scorer', tech: 'TypeScript / Algorithmic Rubric', details: 'Computes transparent 0–100 match confidence based on source authority, skill overlap, and recency' },
      { id: 'tailor', name: 'Zero-Hallucination Tailor', role: 'Resume Adapter', tech: 'Gemini AI / Structured Schemas', details: 'Re-orders verified experience and highlights matching skills without ever fabricating qualifications' },
      { id: 'gate', name: 'Human Approval Gate', role: 'Strict 403 Boundary', tech: 'Next.js API Route Guards', details: 'Halts outbound pipeline until explicit human operator sign-off; blocks automated email generation' },
      { id: 'outreach', name: 'Drafts-Only Outreach', role: 'Outbox Manager', tech: 'Gmail API (users.drafts.create)', details: 'Creates multi-day sequence drafts restricted to test operator inbox with zero autonomous sending' }
    ],
    engineeringHighlights: [
      { title: 'Strict HTTP 403 Human Gate', description: 'API routes unconditionally reject draft synthesis or sequence progression with HTTP 403 unless the lead status is explicitly set to APPROVED.' },
      { title: 'Zero-Hallucination Factual Tailoring', description: 'Enforces strict constraint checking so AI never invents degrees, skills, or metrics not present in the candidate verified profile.' },
      { title: 'Drafts-Only Gmail Integration', description: 'Restricted strictly to users.drafts.create with zero auto-send capabilities and recipient safety boundaries.' }
    ],
    codeSnippet: {
      title: 'Human Approval Gate & Draft Guard',
      language: 'typescript',
      code: `// Enforce strict Human Approval Gate before draft synthesis
export async function POST(req: NextRequest) {
  const { leadId, sequenceType } = await req.json();
  const lead = await db.leads.findById(leadId);

  // 1. Strict Server Boundary: Reject unapproved leads
  if (!lead || lead.approvalStatus !== 'APPROVED') {
    return NextResponse.json(
      { error: 'Forbidden: Lead requires human approval prior to draft creation.' },
      { status: 403 }
    );
  }

  // 2. Synthesize factual, grounded draft
  const draft = await generateGroundedDraft({
    profile: lead.candidateProfile,
    job: lead.jobSpec,
    evidenceIds: lead.verifiedEvidence
  });

  // 3. Save to Gmail Drafts ONLY (no send API invocation)
  const gmailReceipt = await gmailClient.users.drafts.create({
    userId: 'me',
    requestBody: { message: { raw: encodeEmail(draft) } }
  });

  return NextResponse.json({ success: true, draftId: gmailReceipt.data.id });
}`
    },
    lessons: [
      'Autonomous systems for career operations must enforce a hard human-in-the-loop gate—unsupervised generation damages professional credibility.',
      'Deterministic algorithmic scoring provides far more reliable filtering than open-ended LLM qualitative ratings.'
    ]
  },
  {
    slug: 'agenthub',
    name: 'AgentHub',
    tagline: 'Custom Agent Creation & Retrieval-Augmented Generation Platform',
    category: 'AI / AGENTS',
    status: 'PRODUCTION',
    technologies: ['Next.js', 'React', 'TypeScript', 'Supabase', 'pgvector', 'Groq', 'HuggingFace', 'Tailwind CSS'],
    featured: true,
    github: 'https://github.com/amaymishra1104/agenthub-ai',
    demo: 'https://agenthub-ai-ujxo.onrender.com/',
    summary: 'A full-stack AI platform enabling users to create, configure, and deploy custom conversational AI agents with their own instruction sets and vectorized knowledge bases.',
    problem: 'Enterprises and developers struggle to ground AI assistants in custom private documents without leaking sensitive data across tenant boundaries or incurring high inference latencies.',
    solution: 'Engineered an end-to-end multi-tenant RAG architecture using Supabase Row-Level Security, pgvector cosine distance search, HuggingFace embeddings, and low-latency Groq LPU inference.',
    architecture: [
      { id: 'client', name: 'Next.js App Interface', role: 'Frontend Client', tech: 'Next.js 14 / TypeScript', details: 'Responsive dashboard for agent management and streaming conversations' },
      { id: 'auth', name: 'Supabase Auth & RLS', role: 'Security Boundary', tech: 'Supabase / PostgreSQL RLS', details: 'Guarantees strict tenant isolation across custom documents and agent prompts' },
      { id: 'rag', name: 'Vector Search Engine', role: 'Document Index', tech: 'pgvector / HuggingFace', details: 'Performs semantic vector search with cosine distance indexing' },
      { id: 'groq', name: 'Groq Inference Stream', role: 'Model Provider', tech: 'Groq API / Llama 3', details: 'Streams grounded responses with sub-450ms time-to-first-token' }
    ],
    engineeringHighlights: [
      { title: 'Sub-450ms Groq Inference', description: 'Streamlined streaming API routes to deliver low-latency grounded reasoning on Groq LPUs.' },
      { title: 'Per-User Row-Level Security', description: 'Implemented PostgreSQL RLS policies ensuring users cannot access or query embeddings belonging to other accounts.' }
    ],
    lessons: [
      'Row-level security in PostgreSQL eliminates an entire class of authorization vulnerabilities in multi-tenant RAG architectures.'
    ]
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
}
