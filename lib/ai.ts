import { retrieveContext, RetrievalResult } from './rag';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  citations?: { label: string; url: string }[];
}

export const SUGGESTED_QUESTIONS = [
  'What projects has Amay built?',
  'What is AgentPay?',
  'What technologies does Amay use?',
  'Tell me about his AI/ML experience.',
  'What did he build with FastAPI?',
  'Show me his projects involving RAG.',
  'How can I contact Amay?'
];

export async function processAIChat(
  query: string,
  history: ChatMessage[] = []
): Promise<{ answer: string; citations: { label: string; url: string }[] }> {
  const trimmed = query.trim();
  if (!trimmed) {
    return {
      answer: 'Please ask a question about Amay Mishra, his projects, skills, or engineering experience.',
      citations: []
    };
  }

  // Retrieve top context chunks
  const retrieved: RetrievalResult[] = retrieveContext(trimmed, 4);

  // Collect citations
  const citationsMap = new Map<string, string>();
  for (const item of retrieved) {
    if (item.chunk.referenceUrl && item.chunk.referenceLabel) {
      citationsMap.set(item.chunk.referenceLabel, item.chunk.referenceUrl);
    }
  }

  const citations = Array.from(citationsMap.entries()).map(([label, url]) => ({
    label,
    url
  }));

  // Check if external OpenAI compatible API key is provided
  const apiKey = process.env.AI_API_KEY;
  if (apiKey) {
    try {
      const systemPrompt = `You are AMAY AI, the technical portfolio assistant for Amay Mishra.
Amay is an AI/ML Engineer, Full-Stack Developer, and AI Agent Builder from Indore, India (B.Tech CS & IT 2027).
Answer the user's question directly, accurately, and concisely based strictly on the provided portfolio context.
DO NOT hallucinate. If something is not in the context, state that Amay has not documented it yet.
Include relevant project references when applicable.

PORTFOLIO CONTEXT:
${retrieved.map((r, i) => `[Source ${i + 1}: ${r.chunk.title}]\n${r.chunk.content}`).join('\n\n')}`;

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: process.env.AI_MODEL || 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            ...history.slice(-4).map((m) => ({ role: m.role, content: m.content })),
            { role: 'user', content: trimmed }
          ],
          temperature: 0.2,
          max_tokens: 500
        })
      });

      if (res.ok) {
        const data = await res.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          return { answer: content, citations };
        }
      }
    } catch (err) {
      console.warn('External AI call failed, falling back to deterministic RAG engine:', err);
    }
  }

  // Deterministic, zero-hallucination RAG synthesizer
  if (retrieved.length === 0) {
    return {
      answer: `I don't have verified information in Amay's portfolio knowledge base to answer that specifically. Amay specializes in AI/ML, Full-Stack Development, and Autonomous Agents. You can explore his featured projects or ask about AgentPay, HireIQ, CivicAI, or his technical stack!`,
      citations: [
        { label: 'View All Projects', url: '/work' },
        { label: 'About Amay', url: '/about' }
      ]
    };
  }

  // Synthesize response from retrieved chunks
  const primary = retrieved[0].chunk;
  const secondary = retrieved.slice(1);

  let synthesizedAnswer = '';

  const lowerQ = trimmed.toLowerCase();
  if (lowerQ.includes('agentpay')) {
    synthesizedAnswer = `**AgentPay** is an autonomous AI agent payment and transaction execution protocol designed by Amay. It enables AI agents to execute budgetary checks, verify cryptographic HMAC signatures, and settle micro-transactions with strict idempotency to prevent duplicate charges.\n\nKey technologies include **Python, FastAPI, LangChain, PostgreSQL, and Stripe API**.`;
  } else if (lowerQ.includes('hireiq')) {
    synthesizedAnswer = `**HireIQ** is an autonomous AI technical interview and candidate evaluation platform. It analyzes real-time candidate code reasoning, time complexity, and syntax ASTs to dynamically generate contextual follow-up questions and objective rubric scoring.\n\nBuilt with **Next.js, TypeScript, OpenAI API, and WebSockets**.`;
  } else if (lowerQ.includes('civic') || lowerQ.includes('civicsense')) {
    synthesizedAnswer = `**CivicAI (CivicSense)** is a municipal grievance intelligence and geo-spatial computer vision platform. It classifies citizen-reported civic defects (potholes, garbage, water leaks) with computer vision and uses PostGIS spatial proximity clustering to merge duplicate tickets within a 15-meter radius before dispatching work orders.`;
  } else if (lowerQ.includes('mamasoft')) {
    synthesizedAnswer = `**MamaSoft** is a modern clinical practice workflow and patient care automation platform that Amay is actively building. It features conflict-free appointment scheduling, multi-tenant HIPAA-conscious PostgreSQL schemas, and automated patient notifications.`;
  } else if (lowerQ.includes('fraud')) {
    synthesizedAnswer = `Amay engineered a **Real-Time Fraud Detection System** using cost-sensitive XGBoost and SMOTE resampling to handle extreme class imbalance (0.17% fraud). It achieves sub-15ms inference latency and an 0.89 PR-AUC score.`;
  } else if (lowerQ.includes('crunchreader') || lowerQ.includes('rag')) {
    synthesizedAnswer = `Amay built **CrunchReader**, a layout-aware document intelligence and RAG parsing pipeline that preserves table structures and technical document hierarchies. It uses hybrid dense sentence embeddings combined with BM25 Reciprocal Rank Fusion (RRF) for high recall context retrieval.`;
  } else if (lowerQ.includes('fastapi')) {
    synthesizedAnswer = `Amay uses **FastAPI** extensively for high-throughput, asynchronous backend services. Key projects built with FastAPI include **AgentPay** (agent financial gate with HMAC verification), **MamaSoft** (clinical API), **CrunchReader** (document processing), and **CivicAI** (ticket dispatch backend).`;
  } else if (lowerQ.includes('contact') || lowerQ.includes('email') || lowerQ.includes('reach')) {
    synthesizedAnswer = `You can connect with Amay Mishra via his [GitHub](https://github.com/amaymishra1104), LinkedIn, or through the interactive contact form on this site. He is based in Indore, India, and open to high-impact software engineering and AI roles.`;
  } else if (lowerQ.includes('who') || lowerQ.includes('about amay') || lowerQ.includes('education')) {
    synthesizedAnswer = `**Amay Mishra** is an AI/ML Engineer and Full-Stack Developer based in Indore, India. He is completing his B.Tech in CS & IT at Acropolis Institute of Technology and Research (RGPV, graduating 2027). He focuses on building production systems: AI agents, RAG architectures, computer vision pipelines, and full-stack web platforms.`;
  } else if (lowerQ.includes('projects') || lowerQ.includes('what has he built') || lowerQ.includes('built')) {
    synthesizedAnswer = `Amay has built and shipped several production-grade systems across AI/ML and full-stack engineering:\n\n` +
      `• **AgentPay**: Autonomous agent payment protocol with HMAC & idempotency rails\n` +
      `• **HireIQ**: Autonomous AI technical interview & code reasoning platform\n` +
      `• **CivicAI / CivicSense**: Municipal grievance triage with CV & spatial clustering\n` +
      `• **MamaSoft**: Clinical workflow & healthcare practice automation\n` +
      `• **Fraud Detection System**: Real-time XGBoost financial transaction anomaly scoring\n` +
      `• **CrunchReader**: Layout-aware RAG chunking & hybrid retrieval pipeline\n` +
      `• **LULU AI Assistant**: Contextual developer desktop assistant`;
  } else if (lowerQ.includes('technolog') || lowerQ.includes('skills') || lowerQ.includes('stack')) {
    synthesizedAnswer = `Amay's core technical stack includes:\n\n` +
      `• **AI / ML**: Python, PyTorch, Scikit-learn, XGBoost, RAG, LangChain, SentenceTransformers, YOLOv8\n` +
      `• **Full-Stack**: Next.js (App Router), React, TypeScript, Node.js, FastAPI, Flask, Tailwind CSS\n` +
      `• **Data & Storage**: PostgreSQL, PostGIS, ChromaDB, Redis, SQL, Pandas, NumPy\n` +
      `• **Infrastructure**: Docker, Git/GitHub CI/CD, Linux, Vercel`;
  } else {
    // Default context-driven synthesis
    synthesizedAnswer = `${primary.content}\n\n${secondary.length > 0 ? `Additional context: ${secondary.map((s) => s.chunk.title).join(', ')}.` : ''}`;
  }

  return {
    answer: synthesizedAnswer,
    citations
  };
}
