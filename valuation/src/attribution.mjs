const names = {
  instagram: 'Instagram', ig: 'Instagram', tiktok: 'TikTok', threads: 'Threads',
  youtube: 'YouTube', google: 'Google', yandex: 'Яндекс', '2gis': '2ГИС',
  chatgpt: 'ChatGPT', gemini: 'Gemini', referral: 'Рекомендация',
};

export function getAttribution(search, referrer) {
  const params = new URLSearchParams(search);
  const raw = (params.get('utm_source') || '').toLowerCase();
  let source = raw ? (Object.hasOwn(names, raw) ? raw : 'other') : 'direct';
  if (!raw && referrer) {
    try {
      const host = new URL(referrer).hostname.toLowerCase();
      const match = [
        ['instagram', /(^|\.)instagram\.com$/], ['threads', /(^|\.)threads\.(com|net)$/],
        ['tiktok', /(^|\.)tiktok\.com$/], ['youtube', /(^|\.)youtube\.com$/],
        ['chatgpt', /(^|\.)chatgpt\.com$/], ['gemini', /^gemini\.google\.com$/],
        ['google', /(^|\.)google\.(com|kz)$/], ['yandex', /(^|\.)yandex\.(ru|kz|com)$/],
        ['2gis', /(^|\.)2gis\.(kz|ru)$/],
      ].find(([, pattern]) => pattern.test(host));
      if (match) source = match[0];
      else if (host !== 'ocenka.greatsteve.kz' && host !== 'greatsteve-vykup.vercel.app') source = 'website';
    } catch { /* Invalid referrers carry no useful attribution. */ }
  }
  const clean = name => {
    const value = params.get(name);
    return value && /^[a-z][a-z0-9_-]{0,63}$/i.test(value) ? value : undefined;
  };
  return { source, medium: clean('utm_medium'), campaign: clean('utm_campaign'), content: clean('utm_content') };
}

export function sourceLabel(source) {
  return Object.hasOwn(names, source) ? names[source] : ({ other: 'другого источника', website: 'другого сайта' })[source] || '';
}
