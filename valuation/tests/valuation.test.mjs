import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { evaluate, buildMessage, UNKNOWN } from '../src/valuation.mjs';
import { getAttribution, sourceLabel } from '../src/attribution.mjs';

const catalog = JSON.parse(readFileSync(new URL('../src/catalog.json', import.meta.url)));
const oracle = JSON.parse(readFileSync(new URL('./bauback-oracle.json', import.meta.url)));
const ideal = oracle.cases.find(item => item.case === 'ideal').answers;
const unknown = Object.fromEntries(catalog.questions.map(q => [q.key, UNKNOWN]));

test('all imported model/memory combinations match the running Bauback calculator', () => {
  assert.equal(oracle.cases.length, 276);
  assert.equal(catalog.models.flatMap(m => m.specs).length, 69);
  for (const row of oracle.cases) {
    const result = evaluate(catalog, row.modelId, row.memory, row.answers);
    assert.equal(result.status, row.rejected ? 'manual' : 'estimate', JSON.stringify(row));
    assert.equal(result.amount, row.rejected ? null : row.amount, JSON.stringify(row));
  }
});

test('unknown condition is a qualified ceiling; known deductions still apply', () => {
  const ceiling = evaluate(catalog, 10, 256, unknown, 65000);
  assert.equal(ceiling.status, 'ceiling');
  assert.equal(ceiling.amount, 160295);
  assert.equal(ceiling.payout, 95295);
  const partial = evaluate(catalog, 10, 256, { ...unknown, equipment: 'equipment-no' });
  assert.equal(partial.amount, 152280);
  assert.equal(partial.unknown.length, 7);
});

test('unavailable model/memory is never quoted; rejected phones need manual review', () => {
  assert.equal(evaluate(catalog, 9, 1024, ideal).status, 'unpriced');
  assert.equal(evaluate(catalog, 'missing', 128, ideal).amount, null);
  const blocked = evaluate(catalog, 10, 256, { ...unknown, contractPhone: 'contract_yes' }, 65000);
  assert.equal(blocked.status, 'manual');
  assert.equal(blocked.amount, null);
  assert.equal(blocked.payout, null);
});

test('redemption can exceed value or be zero, but invalid money is not a payout', () => {
  assert.equal(evaluate(catalog, 10, 256, ideal, 200000).payout, -39705);
  assert.equal(evaluate(catalog, 10, 256, ideal, 0).payout, 160295);
  for (const debt of [null, -1, Infinity, 0.5, Number.MAX_SAFE_INTEGER + 1]) {
    assert.equal(evaluate(catalog, 10, 256, ideal, debt).payout, null);
  }
});

test('ready message includes answers and negative difference without promising money', () => {
  const message = buildMessage({ catalog, modelId: '10', memory: '256', answers: unknown,
    pawnshop: '  Сейф-Ломбард  ', redemption: 200000,
    date: '2026-10-05', requestId: 'GS-TEST', source: 'Instagram' });
  assert.match(message, /iPhone 13 Pro/);
  assert.match(message, /256 ГБ/);
  assert.match(message, /Ломбард: Сейф-Ломбард/);
  assert.doesNotMatch(message, /Филиал:/);
  assert.match(message, /Верхний ориентир, состояние нужно проверить/);
  assert.match(message, /Ориентир ниже полного погашения/);
  assert.match(message, /Instagram/);
  assert.equal((message.match(/Не знаю/g) || []).length, 1);
  assert.doesNotMatch(message, /Верификация IMEI:|Комплект:|Корпус:|Экран:|Ремонт и замена деталей:|Контрактный телефон/);
  assert.doesNotMatch(message, /Возможная разница — до -/);
});

test('campaign attribution wins over referrer, and financial query data is dropped', () => {
  const data = getAttribution('?utm_source=instagram&utm_medium=paid_social&utm_campaign=pawn_buyout&utm_content=ru_video&debt=200000&phone=77775181111&pawnshop=Private', 'https://google.kz/');
  assert.deepEqual(data, { source: 'instagram', medium: 'paid_social', campaign: 'pawn_buyout', content: 'ru_video' });
  assert.equal(sourceLabel(data.source), 'Instagram');
  assert.equal(getAttribution('?utm_source=unknown-channel', '').source, 'other');
  assert.equal(getAttribution('?utm_source=constructor', '').source, 'other');
  assert.equal(getAttribution('?utm_campaign=77775181111&utm_content=Name%20Phone', '').campaign, undefined);
});

test('AI and organic referrers are recognised without confusing lookalike domains', () => {
  assert.equal(getAttribution('', 'https://chatgpt.com/c/test').source, 'chatgpt');
  assert.equal(getAttribution('', 'https://gemini.google.com/app').source, 'gemini');
  assert.equal(getAttribution('', 'https://l.instagram.com/').source, 'instagram');
  assert.equal(getAttribution('', 'https://instagram.com.evil.example/').source, 'website');
  assert.equal(getAttribution('', 'invalid').source, 'direct');
  assert.equal(getAttribution('', '').source, 'direct');
});
