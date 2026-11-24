import React from 'react';
import { ArrowDown, ArrowUpRight, Clock, MapPin, Minus, Phone, Plus } from 'lucide-react';
import type { ModelData } from '../data/repairModels';
import { repairGuideFaq } from '../data/repairGuide';

export default function RepairGuide({ models }: { models: Pick<ModelData, 'slug' | 'name' | 'repairs'>[] }) {
  return (
    <section id="repair-guide" aria-labelledby="repair-guide-title" className="scroll-mt-24 bg-white px-5 py-16 text-[#1d1d1f] md:scroll-mt-28 md:px-8 md:py-24">
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
        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-gray-600">Цены «от» — ориентир для указанной модели. Итог зависит от диагностики и выбранной детали. В цену аккумуляторов JCID включена работа; гарантия на них — 6 месяцев. Наличие подтвердим перед визитом.</p>
        <a href="#devices" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#1d1d1f] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#3d3d40] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0071e3]">Все модели и цены <ArrowDown size={16} aria-hidden="true" className="rotate-180" /></a>
      </div>

      <div id="repair-faq" className="mx-auto mt-14 grid max-w-[88rem] scroll-mt-24 items-start gap-6 rounded-[2rem] bg-[#f5f5f7] p-4 sm:p-7 md:mt-20 md:scroll-mt-28 lg:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)] lg:p-8 xl:grid-cols-[minmax(0,2.15fr)_minmax(22rem,1fr)] xl:gap-9 xl:p-10">
        <div>
          <h2 className="mb-5 px-2 text-[clamp(1.7rem,3.5vw,2.55rem)] font-semibold leading-tight tracking-tight sm:px-0">Вопросы о ремонте</h2>
          <div className="space-y-2.5">
            {repairGuideFaq.map((item, index) => (
              <details key={item.q} name="repair-faq" open={index === 0} className="group rounded-2xl border border-[#1d1d1f]/7 bg-white open:border-[#0071e3]/25">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-4 py-3 font-semibold leading-snug marker:content-none hover:bg-[#f9fafc] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0071e3] sm:px-5 sm:text-[17px] [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>
                  <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-[#f0f2f6] text-[#3b4b61] group-open:bg-[#e8f2ff] group-open:text-[#005bb9]">
                    <Plus size={17} className="group-open:hidden" />
                    <Minus size={17} className="hidden group-open:block" />
                  </span>
                </summary>
                <p className="px-4 pb-5 text-[15px] leading-relaxed text-[#495467] sm:px-5 sm:text-base">{item.a}</p>
              </details>
            ))}
          </div>
        </div>

        <aside aria-label="Контакты сервиса" className="isolate relative overflow-hidden rounded-[1.55rem] bg-[#171d29] p-6 text-white sm:p-7 lg:mt-1">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,#334976_0%,transparent_67%)]" />
          <div className="mb-5 grid size-11 place-items-center rounded-xl border border-white/15 bg-white/10 text-[#b8d5ff]"><MapPin size={22} aria-hidden="true" /></div>
          <h2 className="text-2xl font-semibold tracking-tight">Перед визитом</h2>
          <p className="mt-3 text-[17px] font-semibold leading-snug">Алматы, Гоголя 75/1</p>
          <p className="mt-1 text-sm leading-relaxed text-[#c6d1e5]">Угол улицы Тулебаева</p>
          <p className="mt-4 flex items-center gap-2 text-sm text-[#e1e7f2]"><Clock size={16} aria-hidden="true" /> Ежедневно 10:00–20:00</p>
          <div className="mt-6 grid gap-2.5">
            <a href="tel:+77775181111" data-contact-placement="repair_faq" className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-3 text-center text-sm font-semibold text-[#171d29] transition-colors hover:bg-[#e8f2ff] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"><Phone size={16} aria-hidden="true" /> +7 777 518 11 11</a>
            <a href="https://2gis.kz/almaty/firm/70000001040518505" target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/25 px-3 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white">Маршрут в 2ГИС <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </aside>
      </div>
    </section>
  );
}
