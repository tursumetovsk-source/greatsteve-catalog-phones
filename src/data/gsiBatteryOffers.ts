export const gsiBatteryOffers = [
  { series: 11, previousPrice: 15000, price: 12000 },
  { series: 12, previousPrice: 20000, price: 15000 },
  { series: 13, previousPrice: 25000, price: 18000 },
  { series: 14, previousPrice: 35000, price: 25000 },
  { series: 15, previousPrice: 38000, price: 28000 },
  { series: 16, previousPrice: 40000, price: 30000 },
];

export const GSI_PATH = '/remont/akkumulyator-iphone';
export const GSI_TITLE = 'Замена аккумулятора iPhone в Алматы — GSI от 12 000 ₸ | Greatsteve';
export const GSI_DESCRIPTION = 'Усиленные аккумуляторы GSI для iPhone 11–16. От 12 000 ₸ с заменой, гарантия 6 месяцев. Одна цена для всех версий внутри линейки. Алматы, Гоголя 75/1.';
export const formatTenge = (value: number) => `${value.toLocaleString('ru-RU')} ₸`;

export function gsiOfferForModel(slug: string) {
  const series = /^iphone-(11|12|13|14|15|16)(?:-|$)/.exec(slug)?.[1];
  return gsiBatteryOffers.find(offer => offer.series === Number(series));
}

export const gsiFaq = [
  { q: 'Что входит в цену?', a: 'Усиленный аккумулятор GSI и работа по замене. Перед визитом подтвердим наличие для вашей точной модели.' },
  { q: 'Цена меняется для Pro, Pro Max, Plus или mini?', a: 'Внутри каждой линейки iPhone 11–16 действует одна цена на все ее версии, включая Pro, Pro Max, Plus и mini, где они выпускались.' },
  { q: 'Какая гарантия на аккумулятор GSI?', a: 'Гарантия — 6 месяцев. Условия гарантийного обращения объясним при оформлении заказа.' },
  { q: 'Как записаться на замену?', a: 'Напишите точную модель iPhone в WhatsApp. Подтвердим наличие аккумулятора, стоимость и подходящее время визита. Алматы, Гоголя 75/1, ежедневно 10:00–20:00.' },
];
