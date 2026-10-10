import { getAttribution, sourceLabel } from './attribution.mjs';

const attribution = getAttribution(location.search, document.referrer);
export const sourceName = sourceLabel(attribution.source);
type AnalyticsWindow = Window & { dataLayer?: unknown[]; ym?: (...args: unknown[]) => void };

export function track(event: 'assessment_start' | 'assessment_ready' | 'whatsapp_click' | 'direct_copy' | 'direct_open') {
  const w = window as AnalyticsWindow;
  // Only campaign attribution and the action are recorded. No form values or debt.
  const data = { event, placement: 'valuation', ...attribution };
  w.dataLayer ||= [];
  w.dataLayer.push(data);
  try { w.ym?.(109235626, 'reachGoal', event, attribution); } catch { /* The form stays usable. */ }
}
