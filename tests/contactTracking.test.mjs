import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { transformSync } from 'esbuild';

const code = transformSync(readFileSync(new URL('../src/lib/contactTracking.ts', import.meta.url), 'utf8'),
  { loader: 'ts', format: 'cjs' }).code;

function site({ search = '', referrer = '', saved = null, blockedStorage = false, brokenMeta = false } = {}) {
  const meta = [], goals = [], opened = [], listeners = [];
  class Element { closest() { return this.link || this; } }
  class Anchor extends Element {
    constructor(href) { super(); this.href = href; this.dataset = {}; }
    closest(selector) { return selector === 'a[href]' ? this : null; }
  }
  const window = {
    location: { search, hostname: 'greatsteve.kz', pathname: '/remont' },
    dataLayer: [],
    fbq: (...args) => { if (brokenMeta) throw new Error('blocked'); meta.push(args); },
    ym: (...args) => goals.push(args),
    open: (...args) => { opened.push(args); return {}; },
  };
  const ctx = { module: { exports: {} }, window, Element, HTMLAnchorElement: Anchor,
    document: { referrer, addEventListener: (_, handler) => listeners.push(handler) },
    sessionStorage: {
      getItem: () => { if (blockedStorage) throw new Error('blocked'); return saved && JSON.stringify(saved); },
      setItem: () => { if (blockedStorage) throw new Error('blocked'); },
    }, URL, URLSearchParams };
  vm.runInNewContext(code, ctx);
  return { api: ctx.module.exports, window, meta, goals, opened, listeners, Anchor, Element };
}

test('one nested-icon click sends one event; repeat click does not repeat attribution text', () => {
  const s = site({ search: '?utm_source=instagram&utm_medium=social&utm_campaign=bio&utm_content=repair' });
  s.api.initializeContactTracking(); s.api.initializeContactTracking();
  assert.equal(s.listeners.length, 2);
  const link = new s.Anchor('https://wa.me/77775181111?text=Hello');
  link.dataset.contactPlacement = 'floating_button';
  const icon = new s.Element(); icon.link = link;
  s.listeners[0]({ target: icon }); s.listeners[0]({ target: link });
  assert.equal(s.meta.length, 2);
  assert.equal(s.goals.length, 2);
  assert.equal(s.window.dataLayer.length, 2);
  assert.equal(s.meta[0][0], 'trackSingleCustom');
  assert.equal(s.meta[0][2], 'WhatsAppClick');
  assert.equal(s.meta[0][3].source, 'instagram');
  const message = new URL(link.href).searchParams.get('text');
  assert.equal(message.match(/Перешел на сайт/g).length, 1);
  assert.match(message, /Пишу вам с сайта greatsteve\.kz\./);
  assert.match(message, /Перешел на сайт из Instagram\./);
  assert.doesNotMatch(message, /bio|repair|Источник перехода|Страница:/);
});

test('internal page load preserves the landing source', () => {
  const s = site({ referrer: 'https://greatsteve.kz/', saved: { source: 'tiktok', campaign: 'bio' } });
  assert.equal(s.api.captureAttribution().source, 'tiktok');
});

test('Yandex and YouTube referrers map to the correct source', () => {
  for (const [referrer, source] of [['https://yandex.kz/search/', 'yandex'], ['https://youtu.be/demo', 'youtube']]) {
    assert.equal(site({ referrer }).api.captureAttribution().source, source);
  }
});

test('blocked storage and Meta do not prevent WhatsApp or the independent Metrika call', () => {
  const s = site({ blockedStorage: true, brokenMeta: true, search: '?utm_source=threads' });
  s.api.openWhatsApp('Имя: Test Person\nТелефон: +7 700 000 00 00', 'request_form');
  assert.equal(s.opened.length, 1);
  assert.equal(s.goals.length, 1);
  assert.match(new URL(s.opened[0][0]).searchParams.get('text'), /Threads/);
  const data = JSON.stringify([s.window.dataLayer, s.goals]);
  assert.doesNotMatch(data, /Test Person|700 000|wa\.me|Телефон|Имя/);
});

test('unrelated links do not send events; phone click has a separate event', () => {
  const s = site(); s.api.initializeContactTracking();
  s.listeners[0]({ target: new s.Anchor('https://t.me/GreatSteve11') });
  assert.equal(s.meta.length, 0);
  s.listeners[0]({ target: new s.Anchor('tel:+77775181111') });
  assert.equal(s.meta[0][2], 'PhoneClick');
});

test('middle click is tracked once; right click is ignored and navigation is not intercepted', () => {
  const s = site(); s.api.initializeContactTracking();
  const link = new s.Anchor('https://wa.me/77775181111');
  s.listeners[1]({ type: 'auxclick', button: 1, target: link });
  assert.equal(s.meta.length, 1);
  assert.match(new URL(link.href).searchParams.get('text'), /Здравствуйте! Пишу вам с сайта greatsteve\.kz\./);
  s.listeners[1]({ type: 'auxclick', button: 2, target: link });
  assert.equal(s.meta.length, 1);
  assert.equal(s.opened.length, 0);
});

test('existing site greeting is replaced without losing the device request', () => {
  const s = site();
  s.api.openWhatsApp('Здравствуйте! Пишу вам с сайта GREATSTEVE.KZ. Нужен ремонт iPhone 13.', 'request_form');
  const message = new URL(s.opened[0][0]).searchParams.get('text');
  assert.equal(message, 'Здравствуйте! Пишу вам с сайта greatsteve.kz.\nНужен ремонт iPhone 13.');
});

test('Instagram ig campaign alias appears in the customer message', () => {
  const s = site({ search: '?utm_source=ig' });
  s.api.openWhatsApp('', 'request_form');
  assert.equal(new URL(s.opened[0][0]).searchParams.get('text'),
    'Здравствуйте! Пишу вам с сайта greatsteve.kz.\nПерешел на сайт из Instagram.');
});

test('ChatGPT referral UTM is kept across internal pages and appears in WhatsApp', () => {
  const s = site({ search: '?utm_source=chatgpt.com', referrer: 'https://google.com/' });
  const attribution = s.api.captureAttribution();
  assert.equal(attribution.source, 'chatgpt');
  const next = site({ saved: attribution, referrer: 'https://greatsteve.kz/remont' });
  next.api.openWhatsApp('Хочу заменить аккумулятор GSI.', 'gsi_offer');
  assert.equal(next.meta[0][3].source, 'chatgpt');
  assert.match(new URL(next.opened[0][0]).searchParams.get('text'), /Перешел на сайт из ChatGPT\./);
});

test('AI referrers are distinct from Google and lookalike domains stay unknown', () => {
  for (const [referrer, source] of [
    ['https://gemini.google.com/app', 'gemini'],
    ['https://chatgpt.com/', 'chatgpt'],
    ['https://chat.openai.com/', 'chatgpt'],
    ['https://www.google.com/search?q=repair', 'google'],
    ['https://chatgpt.com.example.org/', 'other'],
  ]) assert.equal(site({ referrer }).api.captureAttribution().source, source);
  const s = site({ referrer: 'https://gemini.google.com/app' });
  s.api.openWhatsApp('', 'gsi_offer');
  assert.match(new URL(s.opened[0][0]).searchParams.get('text'), /Перешел на сайт из Gemini\./);
});
