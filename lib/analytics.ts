export type AnalyticsEvent =
  | 'project_view'
  | 'github_click'
  | 'ai_question'
  | 'terminal_open'
  | 'lab_run'
  | 'contact_submit'
  | 'resume_download';

export interface EventData {
  event: AnalyticsEvent;
  properties?: Record<string, string | number | boolean>;
  timestamp?: string;
}

export function trackEvent(event: AnalyticsEvent, properties?: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined') return;

  const payload: EventData = {
    event,
    properties,
    timestamp: new Date().toISOString()
  };

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics Event]:', payload);
  }

  // Dispatch to internal privacy-conscious endpoint asynchronously
  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics', JSON.stringify(payload));
    } else {
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      }).catch(() => {
        // Silently handle offline telemetry
      });
    }
  } catch {
    // Analytics should never throw or degrade UX
  }
}
