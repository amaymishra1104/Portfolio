export interface LiveStatusItem {
  id: string;
  label: string;
  value: string;
  status: 'active' | 'building' | 'exploring' | 'location';
  detail?: string;
}

export const liveStatusData: LiveStatusItem[] = [
  {
    id: 'status',
    label: 'STATUS',
    value: 'OPEN TO OPPORTUNITIES',
    status: 'active',
    detail: 'Full-time roles / High-impact AI & Full-Stack engineering'
  },
  {
    id: 'building',
    label: 'BUILDING',
    value: 'MamaSoft & AgentPay',
    status: 'building',
    detail: 'Autonomous agent rails & clinical practice automation platform'
  },
  {
    id: 'exploring',
    label: 'EXPLORING',
    value: 'Autonomous AI Agents',
    status: 'exploring',
    detail: 'Multi-agent orchestration, stateful RAG, tool calling & MCP'
  },
  {
    id: 'location',
    label: 'LOCATION',
    value: 'Indore, India',
    status: 'location',
    detail: 'Madhya Pradesh, India (IST UTC+5:30)'
  }
];
