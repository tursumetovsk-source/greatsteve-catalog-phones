import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import { allModels, type ModelData } from './src/data/repairModels';

/**
 * Build-time SEO prerender (вариант C).
 *
 * Для каждого роута создаёт dist/<route>/index.html, в <head> которого статически
 * вшиты title / description / keywords / canonical / Open Graph / Twitter, а для
 * страниц моделей — ещё и JSON-LD. Тело страницы остаётся SPA (гидратируется тем же
 * бандлом), но краулеры (в первую очередь Яндекс) видят корректные мета прямо в HTML.
 *
 * Vercel отдаёт эти файлы через `{ "handle": "filesystem" }` ДО SPA-фолбэка `/(.*) → /index.html`.
 */

const SITE = 'https://greatsteve.kz';
const DEFAULT_OG = '/main/gs-main1.jpeg';

interface Route {
  path: string;
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  schema?: object[];
}

// Статические лендинги. Значения держим в синхроне с SEOHead в соответствующих
// страницах (src/pages/*Page.tsx). Главная "/" не нужна — её мета уже статична в index.html.
const STATIC_ROUTES: Route[] = [
  {
    path: '/remont',
    title: 'Ремонт iPhone, MacBook и Android в Алматы — GreatSteve',
    description:
      'Замена экрана iPhone от 15 000 ₸, батареи от 8 000 ₸. Ремонт MacBook, Samsung, iPad. Оригинальные запчасти, гарантия 12 месяцев. Бесплатная диагностика. Алматы, Гоголя 75/1 уг. ул.Тулебаева.',
    keywords:
      'ремонт iPhone Алматы, замена экрана iPhone, замена батареи iPhone, ремонт MacBook Алматы, ремонт Samsung Алматы, ремонт iPad Алматы, бесплатная диагностика телефона',
    ogImage: '/main/serivice1.jpg',
  },
  {
    path: '/tradein',
    title: 'Купить и продать iPhone, MacBook в Алматы — GreatSteve',
    description:
      'Купите б/у iPhone 13, 14, 15 с гарантией или продайте свой за 10 минут. Выкуп MacBook, Samsung, Android. Trade-in. Оплата сразу наличными. Алматы, Гоголя 75/1 уг. ул.Тулебаева.',
    keywords:
      'купить б/у iPhone Алматы, продать iPhone Алматы, скупка iPhone Алматы, б/у iPhone с гарантией, купить подержанный iPhone, б/у MacBook Алматы, продать MacBook Алматы, trade-in iPhone Алматы, выкуп телефонов Алматы, скупка Samsung Алматы, б/у телефоны Алматы',
    ogImage: '/tradein-bg.jpg',
  },
  {
    path: '/company',
    title: 'О компании GreatSteve — Сервисный центр в Алматы с 2019 года',
    description:
      'GreatSteve — сервисный центр Apple в Алматы с 2019 года. 5 000+ клиентов, рейтинг 4.9★ на Google и 2ГИС. Ремонт iPhone и MacBook на Гоголя 75/1 уг. ул.Тулебаева. Ежедневно 10:00–20:00.',
    keywords:
      'GreatSteve Алматы, сервисный центр Apple Алматы, о компании GreatSteve, GreatSteve отзывы, сервис Гоголя 75/1 уг. ул.Тулебаева Алматы, ремонт iPhone отзывы Алматы, сервисный центр рейтинг Алматы',
    ogImage: '/company/great.webp',
  },
  {
    path: '/arenda',
    title: 'Аренда iPhone в Алматы — рассрочка без банка | GreatSteve',
    description:
      'Возьмите iPhone 13, 14 или 15 в рассрочку без банка в Алматы. Первый взнос от 45 000 ₸, платёж 24 000 ₸/мес. Только удостоверение личности. Забираете сегодня. Гоголя 75/1 уг. ул.Тулебаева.',
    keywords:
      'аренда iPhone Алматы, рассрочка iPhone без банка Алматы, iPhone в кредит Алматы, купить iPhone в рассрочку, iPhone 14 рассрочка Алматы, iPhone 15 рассрочка Алматы, iPhone без справок Алматы',
    ogImage: '/arenda/a.jpg',
  },
];

// Роут страницы модели — title/description/keywords/schema выводятся из тех же данных
// и формул, что и в src/pages/ModelRepairPage.tsx (единый источник → без дрейфа).
function modelRoute(m: ModelData): Route {
  const url = `${SITE}/remont/${m.slug}`;
  return {
    path: `/remont/${m.slug}`,
    title: `Ремонт ${m.name} в Алматы — GreatSteve | Цены и гарантия`,
    description: `Ремонт ${m.name} в Алматы. Замена экрана ${m.repairs[0].price}, аккумулятора ${m.repairs[1].price}. Гарантия 12 месяцев. Ежедневно 10:00–20:00. Гоголя 75/1 уг. ул.Тулебаева.`,
    keywords: `ремонт ${m.name} Алматы, замена экрана ${m.name} Алматы, замена аккумулятора ${m.name} Алматы, сервис ${m.name} Алматы`,
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'RepairBusiness',
        name: 'GreatSteve — Сервисный центр в Алматы',
        url,
        telephone: '+77775181111',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Гоголя 75/1 уг. ул.Тулебаева',
          addressLocality: 'Алматы',
          addressCountry: 'KZ',
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '10:00',
          closes: '20:00',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'GreatSteve', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Ремонт', item: `${SITE}/remont` },
          { '@type': 'ListItem', position: 3, name: `Ремонт ${m.name}`, item: url },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: m.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };
}

const escAttr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const escText = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function render(template: string, r: Route): string {
  const og = `${SITE}${r.ogImage ?? DEFAULT_OG}`;
  const url = `${SITE}${r.path}`;

  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escText(r.title)}</title>`)
    .replace(
      /<meta\s+name="description"[^>]*>/,
      `<meta name="description" content="${escAttr(r.description)}" />`,
    );

  const tags: string[] = [];
  if (r.keywords) tags.push(`<meta name="keywords" content="${escAttr(r.keywords)}" />`);
  tags.push(`<link rel="canonical" href="${url}" />`);
  tags.push(`<meta property="og:title" content="${escAttr(r.title)}" />`);
  tags.push(`<meta property="og:description" content="${escAttr(r.description)}" />`);
  tags.push(`<meta property="og:url" content="${url}" />`);
  tags.push(`<meta property="og:image" content="${og}" />`);
  tags.push(`<meta name="twitter:card" content="summary_large_image" />`);
  tags.push(`<meta name="twitter:title" content="${escAttr(r.title)}" />`);
  tags.push(`<meta name="twitter:description" content="${escAttr(r.description)}" />`);
  tags.push(`<meta name="twitter:image" content="${og}" />`);
  for (const s of r.schema ?? []) {
    tags.push(`<script type="application/ld+json">${JSON.stringify(s)}</script>`);
  }

  return html.replace('</head>', `    ${tags.join('\n    ')}\n  </head>`);
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

      const routes: Route[] = [...STATIC_ROUTES, ...allModels.map(modelRoute)];
      for (const r of routes) {
        const dir = path.join(outDir, r.path);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), render(template, r), 'utf-8');
      }
      // eslint-disable-next-line no-console
      console.log(`[prerender-seo] сгенерировано ${routes.length} статичных HTML-роутов`);
    },
  };
}
