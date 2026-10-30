import routes from '../vercel.json';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/contact') {
      if (request.method !== 'POST') return new Response(null, { status: 405 });
      let body;
      try { body = await request.json(); }
      catch { return Response.json({ error: 'no text' }, { status: 400 }); }
      if (!body.text) return Response.json({ error: 'no text' }, { status: 400 });
      if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
        return Response.json({ ok: true, note: 'telegram not configured' });
      }
      const response = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text: body.text, parse_mode: 'Markdown' }),
      });
      return Response.json(await response.json());
    }
    for (const route of routes.routes) {
      if (route.headers?.Location && new RegExp(`^${route.src}$`).test(url.pathname)) {
        return Response.redirect(new URL(route.headers.Location, url), route.status);
      }
    }
    return env.ASSETS.fetch(request);
  },
};
