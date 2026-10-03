'use client';

import React, { useState } from 'react';
import { Bot, Play, CheckCircle2, RefreshCw, Terminal, Layers, ArrowRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface AgentStep {
  nodeId: string;
  name: string;
  role: string;
  status: 'IDLE' | 'PROCESSING' | 'SUCCESS';
  payload: string;
}

const AGENT_WORKFLOWS = [
  {
    id: 'agentpay-refund',
    title: 'AgentPay: Spend Cap & Payment Settlement',
    description: 'Autonomous financial gate enforcing HMAC signature, spend ceiling, and idempotent transaction dispatch.',
    steps: [
      {
        nodeId: 'user',
        name: 'User / Agent Prompt',
        role: 'Client Request',
        status: 'IDLE',
        payload: 'Payload: { agent_id: "agent_802", amount: $45.00, purpose: "API quota extension", key: "uuid-v5" }',
      },
      {
        nodeId: 'router',
        name: 'Supervisor / Router',
        role: 'Intent Classifier',
        status: 'IDLE',
        payload: 'Action: Route to Financial Policy Supervisor. Verifying agent signature HMAC-SHA256.',
      },
      {
        nodeId: 'specialist',
        name: 'Budget Policy Specialist',
        role: 'Validation Agent',
        status: 'IDLE',
        payload: 'Check: Remaining budget allowance is $180.00. Current charge $45.00 is strictly within $50.00 window ceiling.',
      },
      {
        nodeId: 'tool',
        name: 'Stripe Settlement Tool',
        role: 'Tool Execution',
        status: 'IDLE',
        payload: 'Invoking Stripe API with idempotency_key="pay_8b9a1". Received charge_id: ch_3P7a9 confirmed.',
      },
      {
        nodeId: 'result',
        name: 'Audit State Reconciler',
        role: 'State Machine',
        status: 'IDLE',
        payload: 'Recorded immutable transaction in PostgreSQL audit ledger. Updated remaining spend cap to $135.00.',
      },
      {
        nodeId: 'final',
        name: 'Final Response',
        role: 'Receipt Generator',
        status: 'IDLE',
        payload: 'Response: "Transaction authorized and executed successfully. Receipt ID: rec_99214a."',
      },
    ] as AgentStep[],
  },
  {
    id: 'hireiq-eval',
    title: 'HireIQ: AST Complexity & Probing Dialogue',
    description: 'Code reasoning pipeline parsing syntax trees and generating dynamic algorithmic follow-ups.',
    steps: [
      {
        nodeId: 'user',
        name: 'Candidate Keystrokes',
        role: 'IDE Stream',
        status: 'IDLE',
        payload: 'Transmitting AST: Candidate implemented two-sum with nested loops [O(N^2)].',
      },
      {
        nodeId: 'router',
        name: 'Supervisor / Router',
        role: 'Code Intelligence',
        status: 'IDLE',
        payload: 'Routing to Algorithm Reasoning Engine for complexity analysis.',
      },
      {
        nodeId: 'specialist',
        name: 'Complexity Analyst',
        role: 'AST Evaluator',
        status: 'IDLE',
        payload: 'Detected quadratic time complexity. Memory is O(1). Optimal solution requires hash map [O(N)].',
      },
      {
        nodeId: 'tool',
        name: 'Rubric Vector Store',
        role: 'Knowledge Retrieval',
        status: 'IDLE',
        payload: 'Retrieved interview rubric for edge case probing without leaking answer.',
      },
      {
        nodeId: 'result',
        name: 'Dialogue Generator',
        role: 'Copilot Dialogue',
        status: 'IDLE',
        payload: 'Formulated question: "What happens to execution time if the array contains 1,000,000 elements? How could we trade space for speed?"',
      },
      {
        nodeId: 'final',
        name: 'Final Response',
        role: 'Client Stream',
        status: 'IDLE',
        payload: 'Streamed conversational prompt to candidate audio/text channel with 140ms latency.',
      },
    ] as AgentStep[],
  },
];

export default function AgentFlowLab() {
  const [selectedWorkflowIndex, setSelectedWorkflowIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);

  const activeWorkflow = AGENT_WORKFLOWS[selectedWorkflowIndex];

  const handleRunExecution = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setCurrentStepIndex(0);
    trackEvent('lab_run', { lab: 'agent_flow', workflow: activeWorkflow.id });

    for (let i = 0; i < activeWorkflow.steps.length; i++) {
      setCurrentStepIndex(i);
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentStepIndex(-1);
  };

  return (
    <div className="bg-[#0b0e17] border border-surface-border rounded-xl p-5 sm:p-7 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-border">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-primary">
            <Bot className="w-3.5 h-3.5" />
            <span>LAB 02 // MULTI-AGENT ORCHESTRATION GRAPH</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-1">
            Autonomous Agent Flow &amp; Tool Calling
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Step-by-step state machine executing supervisory routing, tool invocation, and state reconciliation.
          </p>
        </div>

        {/* Workflow Switcher */}
        <div className="flex items-center gap-2">
          {AGENT_WORKFLOWS.map((wf, idx) => (
            <button
              key={wf.id}
              onClick={() => {
                setSelectedWorkflowIndex(idx);
                handleReset();
              }}
              className={`font-mono text-xs px-2.5 py-1.5 rounded border transition-colors ${
                selectedWorkflowIndex === idx
                  ? 'bg-primary/10 border-primary text-primary'
                  : 'bg-surface-100 border-surface-border text-zinc-400 hover:text-white'
              }`}
            >
              {wf.title.split(':')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Control bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-surface-100/60 border border-surface-border rounded-lg">
        <div className="font-mono text-xs text-zinc-300">
          <span className="text-zinc-500">ACTIVE SCENARIO: </span>
          <span className="font-semibold text-emerald-400">{activeWorkflow.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRunExecution}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-emerald-400 disabled:opacity-50 text-black font-mono font-semibold text-xs rounded transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-black" />
            <span>{isRunning ? 'EXECUTING PIPELINE...' : 'RUN AGENT PIPELINE'}</span>
          </button>
          <button
            onClick={handleReset}
            disabled={isRunning || currentStepIndex === -1}
            className="p-2 bg-surface-100 hover:bg-surface-50 border border-surface-border disabled:opacity-30 text-zinc-300 rounded"
            title="Reset Graph"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Graph Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {activeWorkflow.steps.map((st, idx) => {
          const isActive = currentStepIndex === idx;
          const isDone = currentStepIndex > idx;
          return (
            <div
              key={st.nodeId}
              className={`p-3 rounded-lg border transition-all duration-200 flex flex-col justify-between ${
                isActive
                  ? 'bg-primary/15 border-primary shadow-lg shadow-primary/15 scale-[1.03]'
                  : isDone
                  ? 'bg-surface-100/90 border-emerald-500/40 text-zinc-200'
                  : 'bg-[#07090e] border-surface-border text-zinc-500'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span>0{idx + 1}</span>
                  {isActive ? (
                    <span className="text-primary font-bold animate-pulse">ACTIVE</span>
                  ) : isDone ? (
                    <span className="text-emerald-400">DONE</span>
                  ) : (
                    <span>IDLE</span>
                  )}
                </div>
                <h4 className="font-bold text-xs text-white truncate">{st.name}</h4>
                <p className="font-mono text-[10px] text-cyan-400 mt-0.5">{st.role}</p>
              </div>

              {isActive && (
                <div className="mt-2 text-[10px] font-mono text-emerald-400 animate-pulse">
                  ● Processing step...
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Real-time State & Payload Inspector */}
      <div className="p-4 bg-[#07090e] border border-surface-border rounded-lg space-y-2">
        <div className="flex items-center justify-between font-mono text-xs text-zinc-400 border-b border-surface-border/60 pb-2">
          <span className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-accent" />
            <span>NODE TELEMETRY &amp; INTERMEDIATE STATE</span>
          </span>
          <span className="text-[11px] text-zinc-500">
            {currentStepIndex >= 0
              ? `Step ${currentStepIndex + 1} of ${activeWorkflow.steps.length}`
              : 'Awaiting execution trigger'}
          </span>
        </div>

        <div className="font-mono text-xs text-zinc-300 min-h-[60px] flex items-center">
          {currentStepIndex >= 0 ? (
            <div className="space-y-1 w-full animate-in fade-in">
              <span className="text-emerald-400 font-semibold">
                [{activeWorkflow.steps[currentStepIndex].name}]:
              </span>
              <p className="text-zinc-200 text-xs leading-relaxed bg-[#0b0e17] p-2.5 rounded border border-white/5">
                {activeWorkflow.steps[currentStepIndex].payload}
              </p>
            </div>
          ) : (
            <p className="text-zinc-500 italic">
              Click &ldquo;RUN AGENT PIPELINE&rdquo; above to simulate real-time multi-agent execution, routing decisions, and state updates.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
