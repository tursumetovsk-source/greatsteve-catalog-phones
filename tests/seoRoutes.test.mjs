import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const sitemap = readFileSync(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
const paths = [...sitemap.matchAll(/<loc>https:\/\/greatsteve\.kz([^<]*)<\/loc>/g)].map(match => match[1]);
const pages = new Map(paths.map(path => [path, readFileSync(new URL(`../dist${path === '/' ? '' : path}/index.html`, import.meta.url), 'utf8')]));

test('sitemap contains every canonical HTML page once, never redirected legacy URLs', () => {
  assert.equal(paths.length, 84);
  assert.equal(new Set(paths).size, paths.length);
  const rearCoverPages = [...pages].filter(([, html]) => html.includes('<li>Замена задней крышки —'));
  assert.equal(rearCoverPages.length, 69);
  for (const [path, html] of rearCoverPages) {
    assert.match(html, /<li>Замена задней крышки — [^<]+, от 3 часов<\/li>/, path);
    assert.ok(sitemap.includes(`<loc>https://greatsteve.kz${path}</loc><lastmod>2026-11-24</lastmod>`), path);
  }
  assert.ok(sitemap.includes('<loc>https://greatsteve.kz/remont</loc><lastmod>2026-11-24</lastmod>'));
  assert.doesNotMatch(sitemap, /\/uslugi|\/services\/|\/shop|\/trade<|\?a=/);
  for (const [path, html] of pages) {
    assert.equal((html.match(/<title>/g) ?? []).length, 1, path);
    assert.equal((html.match(/<link rel="canonical"/g) ?? []).length, 1, path);
    assert.ok(html.includes(`href="https://greatsteve.kz${path}"`), path);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, path);
    assert.doesNotMatch(html, /name="robots" content="noindex/, path);
    for (const match of html.matchAll(/<script type="application\/ld\+json" data-seo-page="[^"]*">([\s\S]*?)<\/script>/g)) {
      assert.ok(JSON.parse(match[1])['@type'], path);
    }
  }
});

test('all sitemap pages are reachable from the homepage through HTML links without JavaScript', () => {
  const visited = new Set();
  const queue = ['/'];
  while (queue.length) {
    const path = queue.shift();
    if (visited.has(path)) continue;
    visited.add(path);
    for (const [, href] of pages.get(path).matchAll(/href="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
      if (pages.has(href) && !visited.has(href)) queue.push(href);
    }
  }
  assert.deepEqual(paths.filter(path => !visited.has(path)), []);
});

test('repair page answer schema is backed by visible guide content and existing model prices', () => {
  const repair = pages.get('/remont');
  const faq = [...repair.matchAll(/<script type="application\/ld\+json" data-seo-page="[^"]*">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1])).find(schema => schema['@type'] === 'FAQPage');
  assert.equal(faq.mainEntity.length, 7);
  const rearCover = faq.mainEntity.find(question => question.name === 'Сколько занимает замена задней крышки телефона?');
  assert.match(rearCover.acceptedAnswer.text, /от 3 часов/);
  const panels = [...repair.matchAll(/<details\b[^>]*>[\s\S]*?<\/details>/g)].map(([panel]) => panel);
  assert.equal(panels.length, faq.mainEntity.length);
  for (const question of faq.mainEntity) {
    const panel = panels.find(html => html.includes(`<span>${question.name}</span>`));
    assert.ok(panel?.includes(question.acceptedAnswer.text), question.name);
  }
  assert.match(repair, /id="repair-guide"/);
  assert.match(repair, /href="\/remont\/iphone-15-pro-max"/);
  assert.match(repair, /href="\/remont\/iphone-17-pro-max"/);
  assert.match(repair, /href="\/remont\/samsung-s25-ultra"/);
});

test('priority service pages show current offers and provide WhatsApp booking without JavaScript', () => {
  const battery = pages.get('/remont/iphone-15-pro-max');
  assert.match(battery, /Замена усиленного аккумулятора JCID — 28[\x20\u00a0]000 ₸ с работой\. Гарантия 6 месяцев\./);
  const display = pages.get('/remont/iphone-17-pro-max');
  assert.match(display, /Замена экрана — от 75 000 ₸, 1–2 часа при наличии детали/);
  for (const html of [battery, display]) {
    assert.match(html, /href="https:\/\/wa\.me\/77775181111\?text=[^"]+">Записаться в WhatsApp/);
  }
});

test('all model repair pages show their product photo and current repair times', () => {
  const modelPages = [...pages].filter(([path]) => /^\/remont\/(?:iphone|samsung)-/.test(path));
  assert.equal(modelPages.length, 79);
  for (const [path, html] of modelPages) {
    const slug = path.split('/').at(-1);
    const photo = slug.startsWith('iphone-') ? `/devices/repair/${slug}.webp` : `/devices/models/${slug}.jpg`;
    assert.ok(html.includes(`<img src="${photo}" alt="`), path);
    assert.ok(existsSync(new URL(`../dist${photo}`, import.meta.url)), path);
    assert.ok(html.includes(`<meta property="og:image" content="https://greatsteve.kz${photo}"`), path);
    assert.match(html, /<li>Замена (?:усиленного )?аккумулятора(?: JCID)? — [^<]+, 1 час<\/li>/, path);
    assert.match(html, /<li>Замена (?:задней )?камеры — [^<]+, 2–3 часа<\/li>/, path);
    assert.match(html, /<li>Замена разъёма зарядки(?: \(USB-C\))? — [^<]+, 2–3 часа<\/li>/, path);
    assert.match(html, /<li>Диагностика — [^<]+, 1–1,5 часа<\/li>/, path);
  }
});

test('homepage no longer contains the price guide or its FAQ schema', () => {
  const home = pages.get('/');
  assert.doesNotMatch(home, /id="repair-guide"|"@type":"FAQPage"/);
  assert.match(home, /href="\/remont"/);
  const source = readFileSync(new URL('../src/pages/MainPage.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /RepairGuide|repairGuideFaqSchema/);
});

test('normal repair UI uses the existing model selector without a duplicate directory', () => {
  const source = readFileSync(new URL('../src/pages/RemontPage.tsx', import.meta.url), 'utf8');
  assert.match(source, /<DeviceRepairSection \/>/);
  assert.doesNotMatch(source, /RepairModelDirectory/);
  const guide = readFileSync(new URL('../src/components/RepairGuide.tsx', import.meta.url), 'utf8');
  assert.match(guide, /href="#devices"/);
  const selector = readFileSync(new URL('../src/components/DeviceRepairSection.tsx', import.meta.url), 'utf8');
  assert.match(selector, /label: 'Galaxy S22', prefix: 'samsung-s22'/);
  assert.match(selector, /label: 'Galaxy S21', prefix: 'samsung-s21'/);
});

test('retired Galaxy Z repairs are absent from site content and have no static model pages', () => {
  const retiredRepair = /samsung-z-(?:fold|flip)|Galaxy Z (?:Fold|Flip)/i;
  assert.doesNotMatch(sitemap, retiredRepair);
  for (const [path, html] of pages) {
    assert.doesNotMatch(html, retiredRepair, path);
  }
  for (const model of ['fold-5', 'fold-6', 'flip-3', 'flip-4', 'flip-5', 'flip-6']) {
    assert.equal(existsSync(new URL('../dist/remont/samsung-z-' + model + '/index.html', import.meta.url)), false, model);
  }
  const selector = readFileSync(new URL('../src/components/DeviceRepairSection.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(selector, /Galaxy Z|samsung-z/i);
});

test('iPhone repairs start at iPhone 8, with customer-supplied parts required for iPhone 8 and 8 Plus', () => {
  const repair = pages.get('/remont');
  const retired = ['2g', '3g', '3gs', '4', '4s', '5', '5c', '5s', '6', '6-plus', '6s', '6s-plus', 'se-1', '7', '7-plus'];
  for (const model of retired) {
    const path = `/remont/iphone-${model}`;
    assert.ok(!paths.includes(path), path);
    assert.ok(!repair.includes(`href="${path}"`), path);
    assert.ok(!existsSync(new URL(`../dist${path}/index.html`, import.meta.url)), path);
  }

  for (const model of ['8', '8-plus']) {
    const path = `/remont/iphone-${model}`;
    const html = pages.get(path);
    assert.ok(repair.includes(`href="${path}"`), path);
    assert.match(html, /Ремонтируем только с вашей запчастью\. Деталей для этой модели нет на складе и у поставщиков\./, path);
    assert.match(html, /Замена экрана \(дисплея\) — По запросу/, path);
    assert.match(decodeURIComponent(html.match(/wa\.me\/77775181111\?text=([^"]+)/)[1]), /У меня есть запчасть/, path);
  }

  for (const model of ['x', 'xr', 'xs', 'xs-max', 'se-2', 'se-3']) {
    assert.doesNotMatch(pages.get(`/remont/iphone-${model}`), /только с вашей запчастью/i, model);
  }
  assert.match(pages.get('/remont/iphone-xr'), /Замена экрана \(дисплея\) — от 16 000 ₸/);
});
