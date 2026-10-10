import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

const source = ts.createSourceFile('MainHero.tsx', readFileSync(new URL('../src/components/MainHero.tsx', import.meta.url), 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const component = source.statements.find(node => ts.isFunctionDeclaration(node) && node.name?.text === 'MainHero');
const effect = component.body.statements.find(node => ts.isExpressionStatement(node) && ts.isCallExpression(node.expression) && node.expression.expression.getText(source) === 'useEffect').expression.arguments[0];
const script = ts.transpileModule(`(${effect.getText(source)})()`, { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText;

function setup({ reduced = false, fine = true } = {}) {
  const listeners = new Map();
  const styles = new Map();
  const frames = new Map();
  let nextFrame = 0;
  const section = {
    dataset: {},
    style: { setProperty: (key, value) => styles.set(key, value) },
    getBoundingClientRect: () => ({ left: 0, top: 0, width: 1000, height: 800 }),
    addEventListener: (name, handler) => listeners.set(name, handler),
    removeEventListener: name => listeners.delete(name),
    removeAttribute: () => styles.clear(),
  };
  const media = matches => ({ matches, addEventListener(name, handler) { this.change = handler; }, removeEventListener() { this.change = null; } });
  const motion = media(reduced);
  const pointer = media(fine);
  const cleanup = runInNewContext(script, {
    sectionRef: { current: section },
    phoneRef: { current: { getBoundingClientRect: () => ({ left: 300, top: 100 }) } },
    window: { matchMedia: query => query.includes('reduced-motion') ? motion : pointer },
    requestAnimationFrame: callback => { frames.set(++nextFrame, callback); return nextFrame; },
    cancelAnimationFrame: id => frames.delete(id),
  });
  const settle = () => {
    for (let i = 0; frames.size && i < 150; i++) {
      const callbacks = [...frames.values()];
      frames.clear();
      callbacks.forEach(callback => callback());
    }
    assert.equal(frames.size, 0, 'animation must stop when the cursor settles');
  };
  return { listeners, styles, frames, section, motion, cleanup, settle };
}

test('cursor spotlight and tilt follow the pointer, settle, reset and clean up', () => {
  const hero = setup();
  hero.listeners.get('pointermove')({ clientX: 800, clientY: 240, pointerType: 'mouse' });
  hero.settle();
  assert.ok(Math.abs(parseFloat(hero.styles.get('--scan-x')) - 80) < 0.1);
  assert.ok(Math.abs(parseFloat(hero.styles.get('--scan-y')) - 30) < 0.1);
  assert.ok(parseFloat(hero.styles.get('--tilt-y')) > 0);
  assert.ok(Math.abs(parseFloat(hero.styles.get('--phone-scan-x')) - 500) < 1);
  hero.listeners.get('pointerleave')();
  hero.settle();
  assert.ok(Math.abs(parseFloat(hero.styles.get('--scan-x')) - 50) < 0.1);
  hero.cleanup();
  assert.equal(hero.listeners.size, 0);
  assert.equal(hero.frames.size, 0);
});

test('touch and reduced-motion preferences do not run cursor animations', () => {
  for (const settings of [{ reduced: true }, { fine: false }]) {
    const hero = setup(settings);
    hero.listeners.get('pointermove')({ clientX: 800, clientY: 240, pointerType: 'mouse' });
    assert.equal(hero.frames.size, 0);
    hero.cleanup();
  }
  const hero = setup();
  hero.listeners.get('pointermove')({ clientX: 800, clientY: 240, pointerType: 'touch' });
  assert.equal(hero.frames.size, 0);
  hero.listeners.get('pointermove')({ clientX: 800, clientY: 240, pointerType: 'mouse' });
  hero.motion.matches = true;
  hero.motion.change();
  assert.equal(hero.frames.size, 0);
  assert.equal(hero.styles.size, 0);
  hero.cleanup();
});
