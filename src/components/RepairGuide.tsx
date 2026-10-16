import React from 'react';
import type { ModelData } from '../data/repairModels';
import { repairGuideFaq } from '../data/repairGuide';

export default function RepairGuide({ models }: { models: Pick<ModelData, 'slug' | 'name' | 'repairs'>[] }) {
  return (
    <section id="repair-guide" aria-labelledby="repair-guide-title" className="bg-white px-5 py-16 text-[#211018] md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm font-semibold text-[#76243B]">GreatSteve · Алматы · Гоголя 75/1</p>
        <h2 id="repair-guide-title" className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl">Ремонт телефонов в Алматы: услуги и стоимость</h2>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-gray-600">Меняем экраны, аккумуляторы, камеры и разъёмы iPhone, Samsung, Xiaomi и других Android-смартфонов. Проверяем устройства после воды и падения. До ремонта согласуем стоимость, тип детали и срок работы.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {models.map(model => {
            const { slug } = model;
            const battery = model.repairs[1];
            return (
              <article key={slug} className="rounded-3xl border border-[#76243B]/15 bg-[#FBF8F9] p-6">
                <h3 className="text-xl font-semibold"><a href={`/remont/${slug}`} className="underline-offset-4 hover:underline">Ремонт {model.name}</a></h3>
                <dl className="mt-5 space-y-3 text-sm">
                  <div><dt className="text-gray-600">{model.repairs[0].name}</dt><dd className="mt-1 font-semibold">{model.repairs[0].price}</dd></div>
                  <div><dt className="text-gray-600">{battery.name}</dt><dd className="mt-1 font-semibold">{battery.price}</dd></div>
                </dl>
                <a href={`/remont/${slug}`} className="mt-5 inline-block font-semibold text-[#76243B] underline underline-offset-4">Все работы и сроки →</a>
              </article>
            );
          })}
        </div>
        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-gray-600">Цены «от» — ориентир для указанной модели. Итог зависит от диагностики и выбранной детали. В цену аккумуляторов GSI включена работа; гарантия на них — 6 месяцев. Наличие подтвердим перед визитом.</p>
        <a href="#devices" className="mt-5 inline-block rounded-full bg-[#76243B] px-6 py-3 font-semibold text-white">Все модели и цены</a>
        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_2fr]">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">Перед обращением в сервис</h2>
            <p className="mt-4 leading-relaxed text-gray-600">Алматы, Гоголя 75/1, угол Тулебаева.<br />Ежедневно 10:00–20:00.</p>
            <a href="tel:+77775181111" className="mt-4 inline-block font-semibold text-[#76243B]">+7 777 518 11 11</a>
            <p className="mt-3"><a href="https://go.2gis.com/BrzTD" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Построить маршрут в 2ГИС</a></p>
          </div>
          <div className="space-y-5">
            {repairGuideFaq.map(item => <article key={item.q} className="border-b border-[#76243B]/15 pb-5"><h3 className="text-lg font-semibold">{item.q}</h3><p className="mt-2 text-base leading-relaxed text-gray-600">{item.a}</p></article>)}
          </div>
        </div>
      </div>
    </section>
  );
}
