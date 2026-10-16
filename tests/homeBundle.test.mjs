import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { loadConfigFromFile } from 'vite';

const home = readFileSync('dist/index.html', 'utf8');
const entryPath = home.match(/<script[^>]+type="module"[^>]+src="([^"]+)"/)[1];
const entry = readFileSync(`dist${entryPath}`);

test('homepage keeps the full model catalogue out of its initial JavaScript', () => {
  assert.ok(entry.length < 460_000, `entry: ${entry.length} bytes`);
  assert.ok(gzipSync(entry).length < 145_000);
  assert.ok(!entry.includes(Buffer.from('samsung-z-flip-3')));
  assert.ok(!entry.includes(Buffer.from('__REPAIR_GUIDE_MODELS__')));
});

test('homepage card data is selected at build time and matches the model pages', async () => {
  const { config } = await loadConfigFromFile({ command: 'build', mode: 'production' });
  const cards = JSON.parse(config.define.__REPAIR_GUIDE_MODELS__);
  assert.equal(cards.length, 6);
  for (const card of cards) {
    assert.deepEqual(Object.keys(card).sort(), ['name', 'repairs', 'slug']);
    assert.equal(card.repairs.length, 2);
    assert.match(card.repairs[1].name, /аккумулятор/i);
    const modelPage = readFileSync(`dist/remont/${card.slug}/index.html`, 'utf8');
    for (const repair of card.repairs) {
      assert.ok(home.includes(repair.name));
      assert.ok(home.includes(repair.price));
      assert.ok(modelPage.includes(`${repair.name} — ${repair.price}`));
    }
  }
});
