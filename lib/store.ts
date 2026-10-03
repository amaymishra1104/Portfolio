// Simple event-driven window event bus for global modals

export function triggerOpenAI(prompt?: string) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('amay:open-ai', { detail: { prompt } }));
}

export function triggerOpenTerminal(command?: string) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('amay:open-terminal', { detail: { command } }));
}
