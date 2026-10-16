import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const sitemap = readFileSync(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
const paths = [...sitemap.matchAll(/<loc>https:\/\/greatsteve\.kz([^<]*)<\/loc>/g)].map(match => match[1]);
const pages = new Map(paths.map(path => [path, readFileSync(new URL(`../dist${path === '/' ? '' : path}/index.html`, import.meta.url), 'utf8')]));

test('sitemap contains every canonical HTML page once, never redirected legacy URLs', () => {
  assert.equal(paths.length, 56);
  assert.equal(new Set(paths).size, paths.length);
  assert.equal((sitemap.match(/<lastmod>/g) ?? []).length, 2);
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

test('homepage answer schema is backed by visible guide content and existing model prices', () => {
  const home = pages.get('/');
  const faq = [...home.matchAll(/<script type="application\/ld\+json" data-seo-page="[^"]*">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1])).find(schema => schema['@type'] === 'FAQPage');
  assert.equal(faq.mainEntity.length, 6);
  for (const question of faq.mainEntity) {
    assert.ok(home.includes(`<h3 class="text-lg font-semibold">${question.name}</h3>`));
    assert.ok(home.includes(question.acceptedAnswer.text));
  }
  assert.match(home, /id="repair-guide"/);
  assert.match(home, /href="\/remont\/iphone-15-pro-max"/);
  assert.match(home, /href="\/remont\/samsung-z-fold-6"/);
});

test('Fold model descriptions use the battery price, not the external display price', () => {
  const fold = pages.get('/remont/samsung-z-fold-6');
  const description = fold.match(/<meta name="description" content="([^"]*)"/)[1];
  assert.match(description, /аккумулятора от 15 000 ₸/);
  assert.doesNotMatch(description, /аккумулятора от 55 000 ₸/);
});
