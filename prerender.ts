import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import RepairGuide from './src/components/RepairGuide';
import RepairModelDirectory from './src/components/RepairModelDirectory';
import { featuredRepairSlugs, repairGuideFaqSchema } from './src/data/repairGuide';
import { allModels, type ModelData } from './src/data/repairModels';
import { modelRepairContent } from './src/data/modelRepairContent';
import { repairModelImage } from './src/data/repairModelImage';
import { GSI_DESCRIPTION, GSI_IMAGE, GSI_PATH, GSI_TITLE, formatTenge, gsiBatteryOffers, gsiFaq, gsiPageSchema } from './src/data/gsiBatteryOffers';
import { BUSINESS, SITE, breadcrumb, repairServiceSchema } from './src/data/repairSchema';

/**
 * Build-time SEO rendering.
 *
 * Each indexable URL gets its own HTML file with metadata, JSON-LD and the
 * page's essential visible content. React replaces this snapshot when the app
 * starts, while crawlers can understand the page without executing JavaScript.
 */

const DEFAULT_OG = '/main/gs-main1.jpeg';

// Only these card fields belong in the guide, not the full model catalogue.
export const repairGuideModels = featuredRepairSlugs.map(slug => {
  const model = allModels.find(model => model.slug === slug)!;
  return { slug, name: model.name, repairs: [model.repairs[0], model.repairs.find(repair => /аккумулятор/i.test(repair.name))!] };
});

interface Route {
  path: string;
  title: string;
  description: string;
  content: string;
  lastmod?: string;
  keywords?: string;
  ogImage?: string;
  schema?: object[];
}

const escAttr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const escText = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const pageShell = (title: string, intro: string, body: string) => `
  <main data-static-seo="true" style="max-width:1120px;margin:0 auto;padding:96px 24px 64px;font-family:system-ui,-apple-system,sans-serif;color:#111">
    <nav aria-label="Основная навигация" style="display:flex;gap:20px;flex-wrap:wrap;margin-bottom:48px">
      <a href="/">Главная</a><a href="/remont">Ремонт</a><a href="/tradein">Купить / Продать</a><a href="/company">О компании</a>
    </nav>
    <h1 style="font-size:clamp(36px,6vw,72px);line-height:1.05;margin:0 0 24px">${escText(title)}</h1>
    <p style="font-size:20px;line-height:1.6;max-width:820px">${escText(intro)}</p>
    ${body}
    <section><h2>Контакты GreatSteve</h2><p>Алматы, Гоголя 75/1 уг. ул. Тулебаева. Ежедневно 10:00–20:00. <a href="tel:+77775181111">+7 777 518 11 11</a>.</p></section>
  </main>`;

const STATIC_ROUTES: Route[] = [
  {
    path: GSI_PATH,
    lastmod: '2026-11-24',
    title: GSI_TITLE,
    description: GSI_DESCRIPTION,
    content: pageShell(
      'Замена аккумулятора iPhone в Алматы — усиленный JCID по акции',
      'Цена включает усиленный аккумулятор JCID и работу по замене. Гарантия 6 месяцев. Одна цена для всех версий внутри каждой линейки iPhone 11–16. Перед визитом подтвердим наличие для вашей модели.',
      `<img src="${GSI_IMAGE.src}" alt="${escAttr(GSI_IMAGE.alt)}" width="${GSI_IMAGE.width}" height="${GSI_IMAGE.height}" style="width:min(100%,480px);height:auto" /><section><h2>Цена с заменой</h2><ul>${gsiBatteryOffers.map(offer => `<li>Линейка iPhone ${offer.series}: <s>${formatTenge(offer.previousPrice)}</s> — ${formatTenge(offer.price)}</li>`).join('')}</ul></section><section><h2>Перед визитом</h2>${gsiFaq.map(item => `<article><h3>${escText(item.q)}</h3><p>${escText(item.a)}</p></article>`).join('')}</section><p><a href="https://wa.me/77775181111?text=${encodeURIComponent('Здравствуйте! Хочу заменить аккумулятор на усиленный JCID по акции. Моя модель iPhone: ')}">Записаться в WhatsApp</a></p>`,
    ),
    schema: gsiPageSchema,
  },
  {
    path: '/',
    lastmod: '2026-11-24',
    title: 'Ремонт телефонов в Алматы — iPhone и Android | GreatSteve',
    description: 'Ремонт телефонов в Алматы: iPhone, Samsung, Xiaomi и других Android-смартфонов. Цены на сайте, бесплатная диагностика при ремонте, гарантия до 12 месяцев. Гоголя 75/1, ежедневно 10:00–20:00.',
    keywords: 'ремонт телефонов Алматы, ремонт iPhone Алматы, ремонт Samsung Алматы, ремонт Xiaomi Алматы, сервисный центр Алматы',
    content: pageShell(
      'Ремонт телефонов в Алматы',
      'Ремонтируем iPhone, Samsung, Xiaomi и другие смартфоны. При ремонте диагностика бесплатна. Тип детали, цену и гарантию согласуем до начала работ.',
      `<section><h2>Услуги сервисного центра</h2><ul><li><a href="/remont">Цены на ремонт телефонов</a></li><li><a href="${GSI_PATH}">Усиленный аккумулятор JCID для iPhone 11–16: от 12 000 ₸ с заменой, гарантия 6 месяцев</a></li><li>Замена экрана и аккумулятора</li><li>Ремонт после воды и падения</li><li>Ремонт MacBook, iPad и Apple Watch</li></ul><p><a href="/company">Адрес и маршрут до сервисного центра</a></p></section>`,
    ),
    schema: [BUSINESS, breadcrumb({ name: 'GreatSteve', path: '/' })],
  },
  {
    path: '/remont',
    lastmod: '2026-11-24',
    title: 'Цены на ремонт телефонов в Алматы | GreatSteve',
    description: 'Ремонт телефонов в Алматы. Усиленные аккумуляторы JCID для iPhone 11–16 от 12 000 ₸ с заменой и гарантией 6 месяцев. Гоголя 75/1.',
    keywords: 'цены ремонт телефонов Алматы, ремонт iPhone Алматы, замена экрана iPhone, ремонт Samsung Алматы, бесплатная диагностика телефона',
    ogImage: '/main/serivice1.jpg',
    content: pageShell(
      'Цены на ремонт телефонов в Алматы',
      'Ремонтируем iPhone, Samsung и другие телефоны: меняем экраны, аккумуляторы, камеры и разъёмы, восстанавливаем устройства после воды и падения.',
      `<section><h2>Усиленные аккумуляторы JCID по акции</h2><p><a href="${GSI_PATH}">iPhone 11–16: от 12 000 ₸ с заменой, гарантия 6 месяцев</a>. Перед визитом подтвердим наличие и время. Диагностика бесплатна при ремонте. Условия гарантии на другие работы согласуем при оформлении заказа.</p></section>${renderToStaticMarkup(createElement(RepairGuide, { models: repairGuideModels }))}${renderToStaticMarkup(createElement(RepairModelDirectory))}`,
    ),
    schema: [BUSINESS, breadcrumb({ name: 'GreatSteve', path: '/' }, { name: 'Ремонт', path: '/remont' }), repairGuideFaqSchema],
  },
  {
    path: '/tradein',
    title: 'Купить и продать iPhone, MacBook в Алматы — GreatSteve',
    description: 'Купить, продать или обменять б/у iPhone, Samsung и MacBook в Алматы. Предварительная оценка в WhatsApp, проверка на Гоголя, 75/1.',
    lastmod: '2026-11-24',
    keywords: 'купить б/у iPhone Алматы, продать iPhone Алматы, скупка iPhone Алматы, trade-in iPhone Алматы, выкуп телефонов Алматы',
    ogImage: '/tradein-bg.jpg',
    content: pageShell(
      'Купить, продать или обменять телефон в Алматы',
      'Проверенные б/у смартфоны с гарантией, быстрый выкуп и Trade-in iPhone, MacBook, Samsung, Xiaomi и других устройств.',
      '<p><a href="https://ocenka.greatsteve.kz/?mode=tradein">Оценить iPhone · Trade‑in</a></p><p><a href="https://t.me/s/kzgreatsteve">Наличие в Telegram</a></p><section><h2>Как проходит сделка</h2><ol><li>Пришлите модель, фото и описание состояния устройства для предварительной оценки.</li><li>Привезите устройство на бесплатную проверку.</li><li>Получите оплату наличными или переводом.</li></ol><p><a href="https://wa.me/77775181111">Связаться через WhatsApp</a></p><p><a href="/remont">Цены на ремонт перед продажей</a></p></section>',
    ),
    schema: [BUSINESS, breadcrumb({ name: 'GreatSteve', path: '/' }, { name: 'Купить / Продать', path: '/tradein' })],
  },
  {
    path: '/company',
    lastmod: '2026-11-24',
    title: 'О компании GreatSteve — сервисный центр в Алматы с 2019 года',
    description: 'GreatSteve — сервисный центр телефонов в Алматы с 2019 года. Более 5 000 выполненных ремонтов. Ремонт iPhone, Samsung и MacBook на Гоголя 75/1. Ежедневно 10:00–20:00.',
    keywords: 'GreatSteve Алматы, сервисный центр Алматы, о компании GreatSteve, сервис Гоголя 75/1 Алматы',
    ogImage: '/company/great.webp',
    content: pageShell(
      'Сервисный центр GreatSteve в Алматы',
      'Работаем с 2019 года и выполнили более 5 000 ремонтов телефонов и другой техники.',
      '<section><h2>Как нас найти</h2><p>Алматы, ул. Гоголя, 75/1, угол ул. Тулебаева, рядом с метро «Жибек Жолы».</p><ul><li><a href="https://maps.app.goo.gl/Utn9cuXYm2JBEHfg7">GreatSteve в Google Картах</a></li><li><a href="https://2gis.kz/almaty/firm/70000001040518505">GreatSteve в 2ГИС</a></li><li><a href="https://yandex.kz/maps/ru/org/greatsteve/5393916179/">GreatSteve в Яндекс Картах</a></li></ul><p><a href="/remont">Услуги и цены на ремонт</a></p></section>',
    ),
    schema: [BUSINESS, breadcrumb({ name: 'GreatSteve', path: '/' }, { name: 'О компании', path: '/company' })],
  },
];

function modelRoute(m: ModelData): Route {
  const routePath = `/remont/${m.slug}`;
  const modelImage = repairModelImage(m.slug);
  const repairs = m.repairs.map((item) => `<li>${escText(item.name)} — ${escText(item.price)}, ${escText(item.time)}</li>`).join('');
  const problems = m.problems.map((item) => `<li>${escText(item)}</li>`).join('');
  const faq = m.faq.map((item) => `<article><h3>${escText(item.q)}</h3><p>${escText(item.a)}</p></article>`).join('');
  const { title, description, summary, bookingUrl, batteryGuide } = modelRepairContent(m);

  return {
    path: routePath,
    lastmod: '2026-11-24',
    title,
    description,
    ogImage: modelImage,
    keywords: `ремонт ${m.name} Алматы, замена экрана ${m.name} Алматы, замена аккумулятора ${m.name} Алматы, сервис ${m.name} Алматы`,
    content: pageShell(
      `Ремонт ${m.name} в Алматы`,
      summary,
      `<p><a href="${bookingUrl}">Записаться в WhatsApp</a></p><img src="${modelImage}" alt="${escAttr(m.name)}" style="display:block;width:auto;height:auto;max-width:min(100%,480px);max-height:320px;object-fit:contain" /><section><h2>Цены на ремонт ${escText(m.name)}</h2><ul>${repairs}</ul>${batteryGuide ? `<p><a href="${batteryGuide}">Все цены и условия замены аккумуляторов JCID</a></p>` : ''}</section><section><h2>Частые неисправности</h2><ul>${problems}</ul></section><section><h2>Частые вопросы</h2>${faq}</section><p><a href="/remont">Все услуги по ремонту телефонов</a></p>`,
    ),
    schema: [
      BUSINESS,
      breadcrumb(
        { name: 'GreatSteve', path: '/' },
        { name: 'Ремонт', path: '/remont' },
        { name: `Ремонт ${m.name}`, path: routePath },
      ),
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: m.faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
      repairServiceSchema(`Ремонт ${m.name} в Алматы`, routePath, summary),
    ],
  };
}

function render(template: string, route: Route): string {
  const og = `${SITE}${route.ogImage ?? DEFAULT_OG}`;
  const url = `${SITE}${route.path}`;
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escText(route.title)}</title>`)
    .replace(/<meta\s+name="description"[^>]*>/, `<meta name="description" content="${escAttr(route.description)}" />`)
    .replace(/<link\s+rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`)
    .replace(/<meta\s+property="og:title"[^>]*>/, `<meta property="og:title" content="${escAttr(route.title)}" />`)
    .replace(/<meta\s+property="og:description"[^>]*>/, `<meta property="og:description" content="${escAttr(route.description)}" />`)
    .replace(/<meta\s+property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`)
    .replace(/<meta\s+property="og:image"[^>]*>/, `<meta property="og:image" content="${og}" />`)
    .replace('<div id="root"></div>', `<div id="root">${route.content}</div>`);

  if (route.path !== '/') {
    html = html.replace(/<link\s+rel="preload"\s+as="(?:image|font)"\s+href="\/(?:main\/pill-phones|fonts\/gs-inter)[^>]*>\s*/g, '');
  }

  const tags = [
    route.keywords ? `<meta name="keywords" content="${escAttr(route.keywords)}" />` : '',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escAttr(route.title)}" />`,
    `<meta name="twitter:description" content="${escAttr(route.description)}" />`,
    `<meta name="twitter:image" content="${og}" />`,
    ...(route.schema ?? []).map((schema) => `<script type="application/ld+json" data-seo-page="${route.path}">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`),
  ].filter(Boolean);

  html = html.replace('</head>', `    ${tags.join('\n    ')}\n  </head>`);
  return html;
}

export function prerenderSeo(): Plugin {
  return {
    name: 'prerender-seo',
    apply: 'build',
    closeBundle() {
      const outDir = path.resolve(process.cwd(), 'dist');
      const templatePath = path.join(outDir, 'index.html');
      if (!fs.existsSync(templatePath)) return;
      const template = fs.readFileSync(templatePath, 'utf-8');
      const routes = [...STATIC_ROUTES, ...allModels.map(modelRoute)];

      for (const route of routes) {
        if (route.path === '/') {
          fs.writeFileSync(templatePath, render(template, route), 'utf-8');
          continue;
        }
        const dir = path.join(outDir, route.path);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), render(template, route), 'utf-8');
      }
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(route => `  <url><loc>${SITE}${route.path}</loc>${route.lastmod ? `<lastmod>${route.lastmod}</lastmod>` : ''}</url>`).join('\n')}\n</urlset>\n`;
      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap, 'utf-8');
      // eslint-disable-next-line no-console
      console.log(`[prerender-seo] сгенерировано ${routes.length} статичных HTML-роутов`);
    },
  };
}
