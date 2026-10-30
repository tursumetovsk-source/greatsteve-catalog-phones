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
  assert.match(home, /href="\/main\/pill-phones\.webp" media="\(min-width: 768px\)"/);
  assert.match(home, /href="\/main\/pill-phones-mobile\.webp" media="\(max-width: 767px\)"/);
  assert.doesNotMatch(home, /rel="preload"[^>]+gs-main1/);
  assert.ok(statSync(distFile('main/pill-phones.webp')).size < 250_000);
  assert.ok(statSync(distFile('main/pill-phones-mobile.webp')).size < 100_000);
});

test('other pages do not preload the homepage-only artwork', () => {
  for (const page of ['remont', 'tradein', 'company', 'remont/iphone-13']) {
    const html = readFileSync(distFile(`${page}/index.html`), 'utf8');
    assert.doesNotMatch(html, /rel="preload"[^>]+pill-phones/);
    assert.doesNotMatch(html, /rel="preload"[^>]+gs-inter/);
  }
});

test('pill hero keeps GreatSteve branding, repair actions and local business copy', () => {
  const styles = readFileSync(new URL('../src/components/MainHero.css', import.meta.url), 'utf8');
  const hero = readFileSync(new URL('../src/components/MainHero.tsx', import.meta.url), 'utf8');
  assert.match(styles, /background: #f2f2f1/);
  assert.match(styles, /font-weight: 800/);
  for (const text of ['GREAT', 'STEVE', 'Ремонт телефонов', 'в Алматы', 'iPhone, Samsung, Xiaomi и MacBook.', 'Понятная стоимость. Забота о каждой детали.', 'Гоголя 75/1', '10:00–20:00']) {
    assert.ok(hero.includes(text), text);
  }
  assert.match(hero, /to="\/remont" className="gs-hero-primary"/);
  assert.match(hero, /to="\/tradein" className="gs-hero-secondary"/);
  assert.doesNotMatch(hero, /WILD|Embark|cloudfront|<video|phone-sculpture|Sparkles|gs-hero-scene-icon/);
});

test('JCID promotion banner uses graphite and Apple blue instead of burgundy', () => {
  const banner = readFileSync(new URL('../src/components/GsiBatteryBanner.tsx', import.meta.url), 'utf8');
  assert.match(banner, /background: '#1D1D1F', color: '#F5F5F7'/);
  assert.match(banner, /background: '#0071E3', color: '#FFFFFF'/);
  assert.doesNotMatch(banner, /#C1FF72|#101210|#211018|#76243B|#D59BAE/);
});

test('mobile hero stacks the brand around a full-width pill with readable copy', () => {
  const styles = readFileSync(new URL('../src/components/MainHero.css', import.meta.url), 'utf8');
  assert.match(styles, /flex-direction: column/);
  assert.match(styles, /\.gs-hero-pill \{ width: 100%; height: calc\(\(100vw - 40px\) \/ 1\.85\)/);
  assert.match(styles, /\.gs-hero-bottom \{ position: relative/);
  assert.match(styles, /prefers-reduced-motion: reduce/);
});

test('requested decorative captions stay removed', () => {
  const hero = readFileSync(new URL('../src/components/MainHero.tsx', import.meta.url), 'utf8');
  const nav = readFileSync(new URL('../src/components/Navbar.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(hero, /СЕРВИС, КОТОРЫЙ|43\.2603|НАВЕДИТЕ КУРСОР|ДАЛЬШЕ — БОЛЬШЕ|TECHNOLOGY, REVEALED|gs-phone-badge|ВНУТРИ — ВНИМАНИЕ К ДЕТАЛЯМ|gs-scan-label|Crosshair/);
  assert.doesNotMatch(nav, /gs-status-dot/);
});

test('every page uses the same navigation component with its own stylesheet', () => {
  for (const page of ['MainPage', 'RemontPage', 'TradeinPage', 'CompanyPage', 'GsiBatteryPage', 'ModelRepairPage']) {
    const source = readFileSync(new URL(`../src/pages/${page}.tsx`, import.meta.url), 'utf8');
    assert.match(source, /import Navbar from '\.\.\/components\/Navbar'/);
    assert.match(source, /<Navbar \/>/);
    assert.doesNotMatch(source, /HomeNavigation/);
  }
  const nav = readFileSync(new URL('../src/components/Navbar.tsx', import.meta.url), 'utf8');
  const navStyles = readFileSync(new URL('../src/components/Navbar.css', import.meta.url), 'utf8');
  assert.match(nav, /import '\.\/Navbar\.css'/);
  assert.match(navStyles, /background: #f5f5f7e8/);
  assert.match(navStyles, /\.gs-home-links a \{[^}]*color: #1d1d1f/);
  assert.match(nav, /aria-modal="true"/);
  assert.match(nav, /event\.key === 'Escape'/);
});
