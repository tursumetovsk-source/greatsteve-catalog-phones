import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

const source = readFileSync(new URL('../src/lib/pageMetadata.ts', import.meta.url), 'utf8');
const script = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const exports = {};
runInNewContext(script, { exports });
const { updatePageMetadata } = exports;

function setup() {
  const children = [];
  const head = {
    appendChild(element) { children.push(element); },
    querySelectorAll(selector) {
      const tag = selector.match(/^\w+/)[0];
      const attributes = [...selector.matchAll(/\[([^=\]]+)(?:="([^"]*)")?\]/g)];
      return children.filter(element => element.tag === tag && attributes.every(([, key, value]) => value === undefined ? element.attributes.has(key) : element.attributes.get(key) === value));
    },
  };
  const document = {
    head,
    createElement(tag) {
      return { tag, attributes: new Map(), textContent: '', setAttribute(key, value) { this.attributes.set(key, value); }, remove() { children.splice(children.indexOf(this), 1); } };
    },
    set title(value) { head.querySelectorAll('title')[0].textContent = value; },
    get title() { return head.querySelectorAll('title')[0]?.textContent; },
  };
  const seed = (tag, attributes, text = '') => {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    element.textContent = text;
    head.appendChild(element);
  };
  return { document, head, seed };
}

test('direct entry and client navigation leave one current canonical, description, title and schema set', () => {
  const { document, head, seed } = setup();
  for (let i = 0; i < 2; i++) {
    seed('title', {}, 'Old homepage');
    seed('link', { rel: 'canonical', href: 'https://greatsteve.kz/' });
    seed('meta', { name: 'description', content: 'Old homepage' });
    seed('meta', { property: 'og:url', content: 'https://greatsteve.kz/' });
  }
  seed('script', { 'data-seo-page': '/' }, '{"@type":"BreadcrumbList"}');
  seed('meta', { name: 'yandex-verification', content: 'keep-verification' });
  seed('script', { id: 'third-party' }, 'keep-third-party-script');
  for (const canonical of ['/', '/company', '/remont/iphone-13', '/']) {
    const page = { title: `Current ${canonical}`, description: `Description ${canonical}`, canonical, ogImage: '/main/gs-main1.jpeg', schema: { '@type': 'WebPage', url: `https://greatsteve.kz${canonical}` } };
    updatePageMetadata(document, page);
    updatePageMetadata(document, page); // StrictMode reruns must be idempotent.
    assert.equal(head.querySelectorAll('title').length, 1);
    assert.equal(document.title, page.title);
    for (const [selector, attribute, value] of [
      ['link[rel="canonical"]', 'href', `https://greatsteve.kz${canonical}`],
      ['meta[name="description"]', 'content', page.description],
      ['meta[property="og:url"]', 'content', `https://greatsteve.kz${canonical}`],
      ['meta[name="twitter:title"]', 'content', page.title],
    ]) {
      const elements = head.querySelectorAll(selector);
      assert.equal(elements.length, 1);
      assert.equal(elements[0].attributes.get(attribute), value);
    }
    assert.equal(head.querySelectorAll('script[data-seo-page]').length, 1);
    assert.equal(JSON.parse(head.querySelectorAll('script[data-seo-page]')[0].textContent).url, `https://greatsteve.kz${canonical}`);
  }
  assert.equal(head.querySelectorAll('meta[name="yandex-verification"]').length, 1);
  assert.equal(head.querySelectorAll('script[id="third-party"]').length, 1);
});

test('navigating to a page without optional metadata removes stale keywords and schemas', () => {
  const { document, head } = setup();
  const page = { title: 'Repair', description: 'Repair description', canonical: '/remont', ogImage: '/main/serivice1.jpg' };
  updatePageMetadata(document, { ...page, keywords: 'old keywords', schema: [{ '@type': 'Service' }, { '@type': 'FAQPage' }] });
  updatePageMetadata(document, page);
  assert.equal(head.querySelectorAll('meta[name="keywords"]').length, 0);
  assert.equal(head.querySelectorAll('script[data-seo-page]').length, 0);
});
