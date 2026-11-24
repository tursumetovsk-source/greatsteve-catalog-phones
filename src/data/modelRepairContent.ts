import { formatTenge, GSI_PATH, gsiOfferForModel } from './gsiBatteryOffers';
import type { ModelData } from './repairModels';

export function modelRepairContent(model: ModelData) {
  const batteryOffer = gsiOfferForModel(model.slug);
  const screen = model.repairs[0];
  const battery = model.repairs.find(repair => /аккумулятор/i.test(repair.name));
  const title = `Ремонт ${model.name} в Алматы — цены | GreatSteve`;
  const screenPrice = `Замена экрана — ${screen.price}`;
  const batteryPrice = batteryOffer
    ? `Замена усиленного аккумулятора JCID — ${formatTenge(batteryOffer.price)} с работой. Гарантия 6 месяцев.`
    : `Замена аккумулятора — ${battery?.price ?? 'по запросу'}.`;
  const summary = model.slug === 'iphone-17-pro-max'
    ? `${screenPrice}, ${screen.time === '1–2 ч' ? '1–2 часа' : screen.time} при наличии детали. Тип дисплея и гарантию согласуем до ремонта.`
    : model.slug === 'iphone-15-pro-max' ? batteryPrice
    : screen.price === 'По запросу' ? 'Возможность ремонта, стоимость и наличие запчастей уточним по модели и неисправности.' : `${screenPrice}. ${batteryPrice}`;
  const description = `${model.name} в Алматы. ${summary} Гоголя, 75/1.`;
  const message = model.slug === 'iphone-15-pro-max'
    ? `Здравствуйте! Хочу заменить аккумулятор на ${model.name}. Подскажите наличие и время записи.`
    : model.slug === 'iphone-17-pro-max'
      ? `Здравствуйте! Хочу заменить экран на ${model.name}. Подскажите варианты дисплея и время записи.`
      : `Здравствуйте! Нужен ремонт ${model.name}. Подскажите стоимость и время записи.`;
  return {
    title, description, summary,
    bookingUrl: `https://wa.me/77775181111?text=${encodeURIComponent(message)}`,
    batteryGuide: batteryOffer ? GSI_PATH : undefined,
  };
}
