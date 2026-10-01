import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { buildSync } from 'esbuild';

const bundle = buildSync({ entryPoints: ['src/data/repairModels.ts'], bundle: true, format: 'cjs', write: false }).outputFiles[0].text;
const context = { module: { exports: {} } };
vm.runInNewContext(bundle, context);
const { allModels } = context.module.exports;
const normalize = value => value.replace(/\s+/g, ' ');

test('GSI prices, work and six-month warranty match the approved offer for every participating model', () => {
  const prices = { 11: 12000, 12: 15000, 13: 18000, 14: 25000, 15: 28000, 16: 30000 };
  let checked = 0;
  for (const model of allModels) {
    const series = /^iphone-(11|12|13|14|15|16)(?:-|$)/.exec(model.slug)?.[1];
    if (!series) continue;
    checked++;
    const repair = model.repairs.find(item => item.name.includes('аккумулятора'));
    assert.match(repair.name, /GSI/);
    assert.equal(normalize(repair.price), `${prices[series].toLocaleString('ru-RU')} ₸`.replace(/\s+/g, ' '));
    assert.match(model.intro, /работой и гарантией 6 месяцев/);
    for (const item of model.faq.filter(item => /аккумулятор|батаре|гаранти/i.test(item.q))) {
      assert.match(item.a, /6 месяцев/);
      assert.doesNotMatch(item.a, /оригинальн|12 месяцев|2025/);
      assert.doesNotMatch(item.q, /2025/);
    }
  }
  assert.ok(checked > 6, 'base and Pro/Plus variants must both be covered');
  assert.equal(allModels.find(model => model.slug === 'iphone-17').repairs[1].price, 'от 14 000 ₸');
});

test('built pages expose the current GSI prices and warranty without JavaScript', () => {
  const html = normalize(readFileSync('dist/remont/iphone-13/index.html', 'utf8'));
  assert.match(html, /Замена усиленного аккумулятора GSI — 18 000 ₸/);
  assert.doesNotMatch(html, /Гарантия 12 месяцев|до 12 месяцев|в 2025 году/);
  const landing = normalize(readFileSync('dist/remont/akkumulyator-iphone/index.html', 'utf8'));
  assert.match(landing, /12 000 ₸/);
  assert.match(landing, /30 000 ₸/);
  assert.match(landing, /Аккумулятор|аккумулятор/);
  assert.match(landing, /работу по замене/);
  assert.match(landing, /Гарантия 6 месяцев/);
  assert.equal((landing.match(/<h1\b/g) || []).length, 1);
  const meta = /<meta name="description" content="([^"]+)"/.exec(landing)?.[1];
  assert.match(meta, /GSI/);
  assert.match(meta, /6 месяцев/);
});
