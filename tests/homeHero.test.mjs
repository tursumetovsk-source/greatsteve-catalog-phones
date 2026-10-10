import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';

const distFile = path => new URL(`../dist/${path}`, import.meta.url);
const home = readFileSync(distFile('index.html'), 'utf8');

test('new homepage retains indexable repair content, business data and canonical', () => {
  assert.match(home, /<h1[^>]*>Ремонт телефонов в Алматы<\/h1>/);
  assert.match(home, /<link rel="canonical" href="https:\/\/greatsteve\.kz\/"/);
  assert.match(home, /"streetAddress":"Гоголя 75\/1 уг\. ул\.Тулебаева"/);
  assert.match(home, /"telephone":"\+77775181111"/);
  assert.doesNotMatch(home, /name="robots" content="noindex/);
  assert.match(home, /html\.js \[data-static-seo="true"\] \{ display: none; \}/);
});

test('hero artwork preloads the correct breakpoint without loading the old slideshow', () => {
  assert.match(home, /href="\/main\/phone-sculpture\.webp" media="\(min-width: 768px\)"/);
  assert.match(home, /href="\/main\/phone-sculpture-mobile\.webp" media="\(max-width: 767px\)"/);
  assert.doesNotMatch(home, /rel="preload"[^>]+gs-main1/);
  assert.ok(statSync(distFile('main/phone-sculpture.webp')).size < 250_000);
  assert.ok(statSync(distFile('main/phone-sculpture-mobile.webp')).size < 100_000);
});

test('other pages do not preload the homepage-only artwork', () => {
  for (const page of ['remont', 'tradein', 'company', 'remont/iphone-13']) {
    const html = readFileSync(distFile(`${page}/index.html`), 'utf8');
    assert.doesNotMatch(html, /rel="preload"[^>]+phone-sculpture/);
    assert.doesNotMatch(html, /rel="preload"[^>]+instrument-serif/);
  }
});

test('homepage hero uses the requested burgundy palette without former green accents', () => {
  const styles = readFileSync(new URL('../src/components/MainHero.css', import.meta.url), 'utf8');
  assert.match(styles, /background: #76243b/);
  assert.doesNotMatch(styles, /#(?:d6e9c4|c7e4b3|92b7a1|a7e2d2|bde8d6)/i);
});

test('requested decorative captions and screen badge are removed without removing the cursor effect', () => {
  const hero = readFileSync(new URL('../src/components/MainHero.tsx', import.meta.url), 'utf8');
  const nav = readFileSync(new URL('../src/components/Navbar.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(hero, /СЕРВИС, КОТОРЫЙ|43\.2603|НАВЕДИТЕ КУРСОР|ДАЛЬШЕ — БОЛЬШЕ|TECHNOLOGY, REVEALED|gs-phone-badge/);
  assert.doesNotMatch(nav, /gs-status-dot/);
  assert.match(hero, /section\.addEventListener\('pointermove', move\)/);
  assert.match(hero, /gs-phone-reveal/);
});

test('every page uses the same navigation component with its own stylesheet', () => {
  for (const page of ['MainPage', 'RemontPage', 'TradeinPage', 'CompanyPage', 'GsiBatteryPage', 'ModelRepairPage']) {
    const source = readFileSync(new URL(`../src/pages/${page}.tsx`, import.meta.url), 'utf8');
    assert.match(source, /import Navbar from '\.\.\/components\/Navbar'/);
    assert.match(source, /<Navbar \/>/);
    assert.doesNotMatch(source, /HomeNavigation/);
  }
  const nav = readFileSync(new URL('../src/components/Navbar.tsx', import.meta.url), 'utf8');
  assert.match(nav, /import '\.\/Navbar\.css'/);
  assert.match(nav, /aria-modal="true"/);
  assert.match(nav, /event\.key === 'Escape'/);
});
