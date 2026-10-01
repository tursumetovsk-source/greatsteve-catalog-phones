const META_PIXEL_ID = '2062553411337759';
const METRIKA_ID = 109235626;
const STORAGE_KEY = 'greatsteve-attribution';

type Attribution = { source: string; medium?: string; campaign?: string; content?: string };
type TrackingWindow = Window & {
  dataLayer?: Record<string, unknown>[];
  fbq?: (...args: unknown[]) => void;
  ym?: (...args: unknown[]) => void;
};

const sources: Record<string, string> = {
  instagram: 'Instagram', ig: 'Instagram', tiktok: 'TikTok', threads: 'Threads',
  youtube: 'YouTube', '2gis': '2ГИС', google: 'Google', yandex: 'Яндекс',
  chatgpt: 'ChatGPT', gemini: 'Gemini', referral: 'Рекомендация',
  direct: 'Прямой переход', other: 'Другой источник',
};
let attribution: Attribution;
let initialized = false;

function campaignValue(value: string | null) {
  return value && /^[a-z][a-z0-9_-]{0,63}$/i.test(value) ? value : undefined;
}

function currentAttribution(): Attribution | undefined {
  const params = new URLSearchParams(window.location.search);
  const rawSource = params.get('utm_source')?.toLowerCase();
  const source = rawSource === 'chatgpt.com' ? 'chatgpt' : rawSource;
  if (source) return {
    source: sources[source] ? source : 'other',
    medium: campaignValue(params.get('utm_medium')),
    campaign: campaignValue(params.get('utm_campaign')),
    content: campaignValue(params.get('utm_content')),
  };
  if (!document.referrer) return;
  const host = new URL(document.referrer).hostname;
  if (host === window.location.hostname) return;
  const aiSources: Record<string, string> = {
    'chatgpt.com': 'chatgpt', 'chat.openai.com': 'chatgpt', 'gemini.google.com': 'gemini',
  };
  const aiDomain = Object.keys(aiSources).find(d => host === d || host.endsWith(`.${d}`));
  if (aiDomain) return { source: aiSources[aiDomain] };
  const matches = ['instagram.com', 'tiktok.com', 'threads.com', 'threads.net',
    'youtube.com', 'youtu.be', '2gis.kz', '2gis.ru', 'google.com', 'google.kz',
    'yandex.ru', 'yandex.kz', 'ya.ru'];
  const domain = matches.find(d => host === d || host.endsWith(`.${d}`));
  const aliases: Record<string, string> = { youtu: 'youtube', ya: 'yandex' };
  const key = domain?.split('.')[0];
  return { source: key ? aliases[key] || key : 'other' };
}

export function captureAttribution() {
  const current = currentAttribution();
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null');
    attribution = current || (saved && sources[saved.source] ? saved : { source: 'direct' });
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    attribution = current || attribution || { source: 'direct' };
  }
  return attribution;
}

function attributionMessage(message: string) {
  const a = attribution || captureAttribution();
  const greeting = 'Здравствуйте! Пишу вам с сайта greatsteve.kz.';
  const request = message.replace(/^Здравствуйте[!,.\s]*/i, '')
    .replace(/^(?:пишу вам с сайта|пишу с сайта)(?:\s+Greatsteve(?:\.kz)?)?[.!\s]*/i, '').trim();
  const source = ['instagram', 'ig', 'tiktok', 'threads', 'youtube', '2gis', 'google', 'yandex', 'chatgpt', 'gemini', 'referral'].includes(a.source)
    ? `Перешел на сайт из ${sources[a.source]}.` : '';
  return [greeting, request && request[0].toUpperCase() + request.slice(1), source].filter(Boolean).join('\n');
}

function trackedUrl(raw: string) {
  const url = new URL(raw);
  url.searchParams.set('text', attributionMessage(url.searchParams.get('text') || ''));
  return url.href;
}

function trackContact(channel: 'whatsapp' | 'phone', placement: string) {
  const a = attribution || captureAttribution();
  const params = {
    channel, placement, page_path: window.location.pathname,
    source: a.source, medium: a.medium, campaign: a.campaign, content: a.content,
  };
  const w = window as TrackingWindow;
  // No names, phone numbers, message contents or outbound URL go to analytics.
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: `${channel}_click`, ...params });
  try {
    w.fbq?.('trackSingleCustom', META_PIXEL_ID, channel === 'whatsapp' ? 'WhatsAppClick' : 'PhoneClick', params);
  } catch {
    // An unavailable tracker must never prevent opening the contact channel.
  }
  try { w.ym?.(METRIKA_ID, 'reachGoal', `${channel}_click`, params); } catch { /* Contact still opens. */ }
}

export function openWhatsApp(message: string, placement: string) {
  trackContact('whatsapp', placement);
  return window.open(trackedUrl(`https://wa.me/77775181111?text=${encodeURIComponent(message)}`), '_blank', 'noopener,noreferrer');
}

export function initializeContactTracking() {
  if (initialized) return;
  initialized = true;
  captureAttribution();
  const originalUrls = new WeakMap<HTMLAnchorElement, string>();
  const activateContact = (event: MouseEvent) => {
    if (event.type === 'auxclick' && event.button !== 1) return;
    const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (!(link instanceof HTMLAnchorElement)) return;
    const url = new URL(link.href);
    const placement = link.dataset.contactPlacement ||
      (link.closest('header') ? 'header' : link.closest('footer') ? 'footer' :
        link.closest('section')?.id || 'page');
    if (url.hostname === 'wa.me' || (url.hostname === 'api.whatsapp.com' && url.pathname === '/send')) {
      const original = originalUrls.get(link) || link.href;
      originalUrls.set(link, original);
      link.href = trackedUrl(original);
      trackContact('whatsapp', placement);
    } else if (url.protocol === 'tel:') {
      trackContact('phone', placement);
    }
  };
  document.addEventListener('click', activateContact, { capture: true });
  document.addEventListener('auxclick', activateContact, { capture: true });
}
