import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const { routes } = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));

test('legacy company iPhone page redirects to repair before the filesystem and 404 fallback', () => {
  const path = '/company/iphone/index.htm';
  const route = routes.find(item => item.src && new RegExp(`^${item.src}$`).test(path));
  assert.equal(route.status, 301);
  assert.equal(route.headers.Location, '/remont');
  assert.ok(routes.indexOf(route) < routes.findIndex(item => item.handle === 'filesystem'));
  assert.equal(new RegExp(`^${route.src}$`).test('/company/iphone/indexXhtm'), false);
});
