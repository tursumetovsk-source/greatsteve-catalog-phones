export const UNKNOWN = 'unknown';

export function money(amount) {
  return new Intl.NumberFormat('ru-KZ', { maximumFractionDigits: 0 }).format(amount) + ' ₸';
}

export function memoryLabel(memory) {
  return memory >= 1024 ? (memory / 1024) + ' ТБ' : memory + ' ГБ';
}

// The active Bauback inspection formula is additive, including fixed deductions.
// Unknown answers produce an upper bound; they are never treated as confirmed ideal.
/** @param {number|null} [redemption] */
export function evaluate(catalog, modelId, memory, answers, redemption = null) {
  const model = catalog.models.find(item => String(item.id) === String(modelId));
  const spec = model?.specs.find(item => item.memory === Number(memory));
  if (!spec || !Number.isFinite(spec.price) || spec.price <= 0) {
    return { status: 'unpriced', amount: null, payout: null, unknown: [], rejected: [] };
  }
  let percent = 0, fixed = 0;
  const unknown = [], rejected = [];
  for (const question of catalog.questions) {
    let option = question.options.find(item => String(item.value) === answers[question.key]);
    if (!option) {
      unknown.push(question.key);
      const possible = question.options.filter(item => !item.reject);
      if (!possible.length) rejected.push(question.key);
      else option = possible.reduce((best, item) =>
        spec.price * item.percent / 100 + item.amount > spec.price * best.percent / 100 + best.amount ? item : best);
    }
    if (option?.reject) {
      rejected.push(question.key);
    } else if (option) {
      percent += option.percent;
      fixed += option.amount;
    }
  }
  if (rejected.length) return { status: 'manual', amount: null, payout: null, unknown, rejected };
  const amount = Math.max(0, Math.round(spec.price * (1 + percent / 100) + fixed));
  const debt = Number.isSafeInteger(redemption) && redemption >= 0 ? redemption : null;
  return { status: unknown.length ? 'ceiling' : 'estimate', amount,
    payout: debt === null ? null : amount - debt, unknown, rejected };
}

export function buildMessage({ catalog, modelId, memory, answers, pawnshop, redemption, date, requestId, source }) {
  const model = catalog.models.find(item => String(item.id) === String(modelId));
  const result = evaluate(catalog, modelId, memory, answers, redemption);
  const details = catalog.questions.filter(question =>
    question.key === 'batteryHealthManual' || (answers[question.key] && answers[question.key] !== UNKNOWN)
  ).map(question => {
    const option = question.options.find(item => String(item.value) === answers[question.key]);
    return question.label + ': ' + (option?.label || 'Не знаю');
  });
  return [
    'Здравствуйте! Хочу продать iPhone, который находится в ломбарде.',
    'Заявка Greatsteve: ' + requestId,
    'Модель: ' + (model?.name || 'Не указана'),
    'Память: ' + memoryLabel(Number(memory)),
    ...details,
    'Ломбард: ' + pawnshop.trim(),
    'Полное погашение: ' + (redemption === null ? 'Уточнить' : money(redemption)),
    'Дата выкупа: ' + (date || 'Уточнить'),
    result.amount === null ? 'Нужна индивидуальная оценка.' :
      (result.status === 'ceiling' ? 'Верхний ориентир, состояние нужно проверить: ' : 'Предварительная оценка по анкете: ') + money(result.amount),
    result.payout !== null && (result.payout < 0 ?
      'Ориентир ниже полного погашения на ' + money(-result.payout) + '. Нужно обсудить условия.' :
      (result.status === 'ceiling' ? 'Возможная разница — до ' : 'Разница по анкете: ') + money(result.payout)),
    'Итоговую цену согласуем после проверки.',
    source && 'Перешёл на сайт из ' + source + '.',
  ].filter(Boolean).join('\n');
}
