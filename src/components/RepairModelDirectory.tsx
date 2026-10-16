import React from 'react';
import { allModels } from '../data/repairModels';

export default function RepairModelDirectory() {
  return (
    <section id="repair-models" aria-labelledby="repair-models-title" className="scroll-mt-28 bg-white px-5 py-12 text-[#211018] md:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 id="repair-models-title" className="text-3xl font-semibold tracking-tight">Цены и сроки по моделям</h2>
        <p className="mt-4 text-gray-600">Выберите модель: на её странице указаны работы, ориентировочная стоимость и ответы на частые вопросы.</p>
        {['iphone', 'samsung'].map(brand => (
          <div key={brand} className="mt-7">
            <h3 className="text-xl font-semibold">{brand === 'iphone' ? 'iPhone' : 'Samsung Galaxy'}</h3>
            <ul className="mt-4 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
              {allModels.filter(model => model.slug.startsWith(brand)).map(model => <li key={model.slug}><a href={`/remont/${model.slug}`} className="text-[#76243B] underline underline-offset-4">Ремонт {model.name}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
