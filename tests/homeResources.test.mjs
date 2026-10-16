import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

test('below-fold video is deferred and its poster exists', () => {
  const source = readFileSync(new URL('../src/components/AboutBentoSection.tsx', import.meta.url), 'utf8');
  assert.match(source, /useState\(false\)/);
  assert.match(source, /IntersectionObserver/);
  assert.match(source, /src=\{loadVideo \? '\/video.mp4' : undefined\}/);
  assert.match(source, /preload="none"/);
  const poster = source.match(/src="(\/company\/about-video-poster.jpg)"/)[1];
  assert.ok(existsSync(new URL(`../public${poster}`, import.meta.url)));
  assert.doesNotMatch(source, /store-interior.jpg/);
  const css = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8');
  assert.doesNotMatch(css, /url\(['"]?\/fonts\/tt-norms-pro-/);
});
