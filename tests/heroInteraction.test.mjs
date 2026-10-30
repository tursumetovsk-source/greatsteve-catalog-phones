import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

const source = ts.createSourceFile('MainHero.tsx', readFileSync(new URL('../src/components/MainHero.tsx', import.meta.url), 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const component = source.statements.find(node => ts.isFunctionDeclaration(node) && node.name?.text === 'MainHero');
const effect = component.body.statements.find(node => ts.isExpressionStatement(node) && ts.isCallExpression(node.expression) && node.expression.expression.getText(source) === 'useEffect').expression.arguments[0];
const script = ts.transpileModule(`(${effect.getText(source)})()`, { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText;

function setup({ reduced = false, mobile = false } = {}) {
  const listeners = new Map();
  const styles = new Map();
  const frames = new Map();
  const animations = [];
  let nextFrame = 0;
  let fontsReady;
  const fonts = new Promise(resolve => { fontsReady = resolve; });
  const nodes = new Map();
  const element = name => ({
    name,
    getBoundingClientRect: () => ({ width: mobile ? 350 : 362, height: mobile ? 350 / 1.85 : 181 }),
    animate(keyframes, options) {
      const animation = {
        name, keyframes, options, startTime: null, cancelled: false,
        cancel() { this.cancelled = true; },
      };
      animations.push(animation);
      return animation;
    },
  });
  for (const name of ['wordmark', 'pill', 'hairline', 'paper', 'bottom']) nodes.set('.gs-hero-' + name, element(name));
  const nav = element('nav');
  const section = {
    dataset: { reveal: 'pending' }, top: 0,
    style: { setProperty: (key, value) => styles.set(key, value) },
    getBoundingClientRect() { return { top: this.top }; },
    querySelector: selector => nodes.get(selector),
  };
  const motion = {
    matches: reduced,
    addEventListener(name, handler) { this.change = handler; },
    removeEventListener() { this.change = null; },
  };
  const cleanup = runInNewContext(script, {
    sectionRef: { current: section },
    document: { fonts: { ready: fonts }, timeline: { currentTime: 500 }, querySelector: () => nav },
    window: {
      matchMedia: query => query.includes('reduced-motion') ? motion : { matches: mobile },
      addEventListener: (name, handler) => listeners.set(name, handler),
      removeEventListener: name => listeners.delete(name),
    },
    getComputedStyle: () => ({ fontSize: '100px' }),
    requestAnimationFrame: callback => { frames.set(++nextFrame, callback); return nextFrame; },
    cancelAnimationFrame: id => frames.delete(id),
  });
  const flush = async () => { await Promise.resolve(); await Promise.resolve(); };
  const ready = async () => { fontsReady(); await flush(); };
  const draw = () => { const callbacks = [...frames.values()]; frames.clear(); callbacks.forEach(callback => callback()); };
  return { animations, listeners, styles, frames, section, motion, cleanup, ready, flush, draw };
}

test('desktop reveal shares one timeline and grows from hairline through circle to pill', async () => {
  const hero = setup();
  assert.equal(hero.animations.length, 0, 'wait for local fonts');
  await hero.ready();
  const pill = hero.animations.find(animation => animation.name === 'pill');
  assert.deepEqual(Array.from(pill.keyframes.slice(0, 5), frame => frame.width), ['1.2px', '1.2px', '16px', '181px', '362px']);
  assert.equal(pill.keyframes[0].clipPath, 'inset(50% 0)');
  assert.ok(hero.animations.every(animation => animation.startTime === 500));
  assert.equal(hero.section.dataset.reveal, 'ready');
  hero.cleanup();
  assert.ok(hero.animations.every(animation => animation.cancelled));
  assert.equal(hero.listeners.size, 0);
});

test('mobile reveals vertically without changing the final full width', async () => {
  const hero = setup({ mobile: true });
  await hero.ready();
  const pill = hero.animations.find(animation => animation.name === 'pill');
  assert.equal(pill.keyframes[0].height, '1.5px');
  assert.equal(pill.keyframes[0].clipPath, 'inset(0 50%)');
  assert.equal(pill.keyframes[4].height, `${350 / 1.85}px`);
  assert.equal(pill.keyframes.at(-1).height, '1.5px');
  assert.ok(pill.keyframes.every(frame => !('width' in frame)));
  hero.cleanup();
});

test('scroll reveals the logo, schedules at most one frame and has no idle animation loop', async () => {
  const hero = setup();
  await hero.ready();
  assert.equal(hero.styles.get('--scene-logo'), '0');
  hero.section.top = -120;
  hero.listeners.get('scroll')();
  hero.listeners.get('scroll')();
  assert.equal(hero.frames.size, 1);
  hero.draw();
  assert.equal(hero.styles.get('--scene-logo'), '0.5');
  assert.equal(hero.styles.get('--scene-scale'), '0.98');
  assert.equal(hero.frames.size, 0);
  hero.section.top = -1000;
  hero.listeners.get('scroll')();
  hero.draw();
  assert.equal(hero.styles.get('--scene-logo'), '1');
  assert.equal(hero.styles.get('--scene-scale'), '0.96');
  hero.cleanup();
});

test('only the artwork reveal loops, holds open and closes; resize restarts at the correct dimensions', async () => {
  const hero = setup();
  await hero.ready();
  const firstRun = [...hero.animations];
  const loops = firstRun.filter(animation => animation.options.iterations === Infinity);
  assert.deepEqual(loops.map(animation => animation.name), ['pill', 'wordmark', 'hairline']);
  const pill = loops[0];
  assert.equal(pill.options.duration, 8000);
  assert.equal(pill.keyframes[4].width, pill.keyframes[5].width, 'hold the full-size composition open');
  assert.equal(pill.keyframes.at(-1).width, pill.keyframes[0].width, 'close before the next loop');
  assert.ok(firstRun.filter(animation => !loops.includes(animation)).every(animation => animation.options.duration === 2100));
  hero.listeners.get('resize')();
  assert.ok(firstRun.every(animation => animation.cancelled));
  assert.equal(hero.animations.length, firstRun.length + 3, 'navigation and copy never replay on resize');
  hero.cleanup();
});

test('reduced motion shows final content, and font completion cannot animate an unmounted hero', async () => {
  const hero = setup({ reduced: true });
  await hero.ready();
  assert.equal(hero.animations.length, 0);
  assert.equal(hero.section.dataset.reveal, 'ready');
  assert.equal(hero.styles.get('--scene-logo'), '1');
  hero.cleanup();

  const pending = setup();
  pending.cleanup();
  await pending.ready();
  assert.equal(pending.animations.length, 0);

  const active = setup();
  await active.ready();
  active.motion.matches = true;
  active.motion.change();
  assert.ok(active.animations.every(animation => animation.cancelled));
  active.cleanup();
});
