// Read-only production check: node scripts/audit-seo.mjs [https://greatsteve.kz]
const origin = process.argv[2] ?? 'https://greatsteve.kz';
const response = await fetch(`${origin}/sitemap.xml`);
if (response.status !== 200) throw new Error(`Sitemap HTTP ${response.status}`);
const sitemap = await response.text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
const results = [];
let next = 0;
await Promise.all(Array.from({ length: 5 }, async () => {
  while (next < urls.length) {
    const url = urls[next++];
    const requestUrl = new URL(new URL(url).pathname, origin).href;
    try {
      const result = await fetch(requestUrl, { redirect: 'manual', signal: AbortSignal.timeout(20000) });
      const html = await result.text();
      const canonical = [...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/g)].map(match => match[1]);
      const errors = [];
      if (result.status !== 200) errors.push(`HTTP ${result.status}`);
      if (canonical.length !== 1 || canonical[0] !== url) errors.push('canonical');
      if ((html.match(/<h1\b/g) ?? []).length !== 1) errors.push('h1');
      if (/name="robots" content="noindex/i.test(html) || /noindex/i.test(result.headers.get('x-robots-tag') ?? '')) errors.push('noindex');
      for (const match of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) JSON.parse(match[1]);
      results.push({ url, status: result.status, errors });
    } catch (error) { results.push({ url, errors: [error.message] }); }
  }
}));
const failures = results.filter(result => result.errors.length);
console.log(JSON.stringify({ checkedAt: new Date().toISOString(), origin, sitemapUrls: urls.length, passed: results.length - failures.length, failures }, null, 2));
if (failures.length) process.exitCode = 1;
