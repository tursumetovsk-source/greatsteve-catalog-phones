import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import { allModels, type ModelData } from './src/data/repairModels';

/**
 * Build-time SEO rendering.
 *
 * Each indexable URL gets its own HTML file with metadata, JSON-LD and the
 * page's essential visible content. React replaces this snapshot when the app
 * starts, while crawlers can understand the page without executing JavaScript.
 */

const SITE = 'https://greatsteve.kz';
const DEFAULT_OG = '/main/gs-main1.jpeg';

interface Route {
  path: string;
  title: string;
  description: string;
  content: string;
  keywords?: string;
  ogImage?: string;
  schema?: object[];
}

const escAttr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const escText = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const BUSINESS = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE}/#organization`,
  name: 'GreatSteve',
  description: 'Ремонт iPhone, Samsung, Xiaomi, MacBook и другой техники в Алматы.',
  url: SITE,
  telephone: '+77775181111',
  image: `${SITE}/logo-gs.webp`,
  priceRange: '₸₸',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Гоголя 75/1 уг. ул.Тулебаева',
    addressLocality: 'Алматы',
    addressCountry: 'KZ',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 43.260296,
    longitude: 76.947493,
  },
  areaServed: { '@type': 'City', name: 'Алматы' },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '10:00',
    closes: '20:00',
  },
  sameAs: [
    'https://maps.app.goo.gl/Utn9cuXYm2JBEHfg7',
    'https://2gis.kz/almaty/branches/70000001040518504',
    'https://yandex.kz/maps/ru/org/greatsteve/5393916179/',
  ],
};

const breadcrumb = (...items: Array<{ name: string; path: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${SITE}${item.path}`,
  })),
});

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
    path: '/',
    title: 'Ремонт телефонов в Алматы — iPhone и Android | GreatSteve',
    description: 'Ремонт телефонов в Алматы: iPhone, Samsung, Xiaomi и других Android-смартфонов. Цены на сайте, бесплатная диагностика при ремонте, гарантия до 12 месяцев. Гоголя 75/1, ежедневно 10:00–20:00.',
    keywords: 'ремонт телефонов Алматы, ремонт iPhone Алматы, ремонт Samsung Алматы, ремонт Xiaomi Алматы, сервисный центр Алматы',
    content: pageShell(
      'Ремонт телефонов в Алматы',
      'Ремонтируем iPhone, Samsung, Xiaomi и другие смартфоны. Диагностика бесплатна при ремонте, цены указаны на сайте, гарантия — до 12 месяцев.',
      '<section><h2>Услуги сервисного центра</h2><ul><li><a href="/remont">Цены на ремонт телефонов</a></li><li>Замена экрана и аккумулятора</li><li>Ремонт после воды и падения</li><li>Ремонт MacBook, iPad и Apple Watch</li></ul></section>',
    ),
    schema: [BUSINESS, breadcrumb({ name: 'GreatSteve', path: '/' })],
  },
  {
    path: '/remont',
    title: 'Цены на ремонт телефонов в Алматы | GreatSteve',
    description: 'Цены на ремонт iPhone, Samsung и других телефонов в Алматы. Замена экрана и аккумулятора, бесплатная диагностика при ремонте, гарантия до 12 месяцев. Гоголя 75/1.',
    keywords: 'цены ремонт телефонов Алматы, ремонт iPhone Алматы, замена экрана iPhone, ремонт Samsung Алматы, бесплатная диагностика телефона',
    ogImage: '/main/serivice1.jpg',
    content: pageShell(
      'Цены на ремонт телефонов в Алматы',
      'Ремонтируем iPhone, Samsung и другие телефоны: меняем экраны, аккумуляторы, камеры и разъёмы, восстанавливаем устройства после воды и падения.',
      '<section><h2>Ремонт с гарантией</h2><p>Диагностика бесплатна при ремонте. Большинство замен экрана и аккумулятора занимает от 20 до 60 минут. Гарантия на работу и запчасти — от 3 до 12 месяцев.</p><p><a href="/remont/iphone-15-pro">Ремонт iPhone 15 Pro</a> · <a href="/remont/iphone-14">Ремонт iPhone 14</a> · <a href="/remont/samsung-s24">Ремонт Samsung S24</a></p></section>',
    ),
    schema: [BUSINESS, breadcrumb({ name: 'GreatSteve', path: '/' }, { name: 'Ремонт', path: '/remont' })],
  },
  {
    path: '/tradein',
    title: 'Купить и продать iPhone, MacBook в Алматы — GreatSteve',
    description: 'Купите б/у iPhone с гарантией или продайте свой за 10 минут. Выкуп MacBook, Samsung и Android, Trade-in, оплата сразу. Алматы, Гоголя 75/1.',
    keywords: 'купить б/у iPhone Алматы, продать iPhone Алматы, скупка iPhone Алматы, trade-in iPhone Алматы, выкуп телефонов Алматы',
    ogImage: '/tradein-bg.jpg',
    content: pageShell(
      'Купить, продать или обменять телефон в Алматы',
      'Проверенные б/у смартфоны с гарантией, быстрый выкуп и Trade-in iPhone, MacBook, Samsung, Xiaomi и других устройств.',
      '<section><h2>Как проходит сделка</h2><ol><li>Пришлите фото устройства для предварительной оценки.</li><li>Привезите устройство на бесплатную проверку.</li><li>Получите оплату наличными или переводом.</li></ol><p><a href="/remont">Нужен ремонт перед продажей?</a></p></section>',
    ),
    schema: [BUSINESS, breadcrumb({ name: 'GreatSteve', path: '/' }, { name: 'Купить / Продать', path: '/tradein' })],
  },
  {
    path: '/company',
    title: 'О компании GreatSteve — сервисный центр в Алматы с 2019 года',
    description: 'GreatSteve — сервисный центр телефонов в Алматы с 2019 года. Более 5 000 выполненных ремонтов. Ремонт iPhone, Samsung и MacBook на Гоголя 75/1. Ежедневно 10:00–20:00.',
    keywords: 'GreatSteve Алматы, сервисный центр Алматы, о компании GreatSteve, сервис Гоголя 75/1 Алматы',
    ogImage: '/company/great.webp',
    content: pageShell(
      'Сервисный центр GreatSteve в Алматы',
      'Работаем с 2019 года и выполнили более 5 000 ремонтов телефонов и другой техники.',
      '<section><h2>Как нас найти</h2><p>Мы находимся в центре Алматы, рядом со станцией метро «Жибек Жолы». Ремонтируем iPhone, Samsung, Xiaomi, MacBook и другую технику.</p><p><a href="/remont">Посмотреть услуги и цены</a></p></section>',
    ),
    schema: [BUSINESS, breadcrumb({ name: 'GreatSteve', path: '/' }, { name: 'О компании', path: '/company' })],
  },
];

function modelRoute(m: ModelData): Route {
  const routePath = `/remont/${m.slug}`;
  const url = `${SITE}${routePath}`;
  const repairs = m.repairs.map((item) => `<li>${escText(item.name)} — ${escText(item.price)}, ${escText(item.time)}</li>`).join('');
  const problems = m.problems.map((item) => `<li>${escText(item)}</li>`).join('');
  const faq = m.faq.map((item) => `<article><h3>${escText(item.q)}</h3><p>${escText(item.a)}</p></article>`).join('');

  return {
    path: routePath,
    title: `Ремонт ${m.name} в Алматы — GreatSteve | Цены и гарантия`,
    description: `Ремонт ${m.name} в Алматы. Замена экрана ${m.repairs[0].price}, аккумулятора ${m.repairs[1].price}. Гарантия 12 месяцев. Ежедневно 10:00–20:00. Гоголя 75/1 уг. ул.Тулебаева.`,
    keywords: `ремонт ${m.name} Алматы, замена экрана ${m.name} Алматы, замена аккумулятора ${m.name} Алматы, сервис ${m.name} Алматы`,
    content: pageShell(
      `Ремонт ${m.name} в Алматы`,
      m.intro,
      `<section><h2>Цены на ремонт ${escText(m.name)}</h2><ul>${repairs}</ul></section><section><h2>Частые неисправности</h2><ul>${problems}</ul></section><section><h2>Частые вопросы</h2>${faq}</section><p><a href="/remont">Все услуги по ремонту телефонов</a></p>`,
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
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: `Ремонт ${m.name} в Алматы`,
        url,
        areaServed: { '@type': 'City', name: 'Алматы' },
        provider: { '@id': `${SITE}/#organization` },
      },
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

  const tags = [
    route.keywords ? `<meta name="keywords" content="${escAttr(route.keywords)}" />` : '',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escAttr(route.title)}" />`,
    `<meta name="twitter:description" content="${escAttr(route.description)}" />`,
    `<meta name="twitter:image" content="${og}" />`,
    ...(route.schema ?? []).map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`),
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
      // eslint-disable-next-line no-console
      console.log(`[prerender-seo] сгенерировано ${routes.length} статичных HTML-роутов`);
    },
  };
}
