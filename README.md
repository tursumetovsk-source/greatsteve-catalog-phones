# Greatsteve — Сайт сервисного центра

**Сайт:** greatsteve.kz  
**Стек:** React 19 + Vite 6 + TypeScript + Tailwind CSS 4 + Framer Motion (`motion/react`) + React Router v7  
**Деплой:** Vercel (проект `greatsteve`, аккаунт `tursumetovsk-sources-projects`)  
**Preview URL:** https://greatsteve.vercel.app

---

## Структура проекта

```
public/
  logo-gs.webp          — логотип (используется в Navbar и AboutBentoSection)
  video.mp4             — видео для фона (AboutBentoSection)
  main/
    gs-main1.jpeg       — слайд 1 для MainHero
    gs-main3.jpeg       — слайд 2 для MainHero
    service-centr.jpg   — карточка "Сервисный центр" (ServicesCards)
    skupka.jpg          — карточка "Скупка и продажа" (ServicesCards)
  company/
    store-interior.jpg  — большая карточка в AboutBentoSection (ещё не добавлено)
    store-front.jpg     — фото для CompanyPage (ещё не добавлено)
    workshop.jpg        — фото мастерской для CompanyPage (ещё не добавлено)
  uslugi/
    iphone.jpg          — карточка iPhone (UslugiPage)
    samsung.jpg         — карточка Samsung (UslugiPage)
    xiaomi.jpg          — карточка Xiaomi (UslugiPage)

src/
  pages/
    MainPage.tsx        — главная страница (/)
    RemontPage.tsx      — страница ремонта (/remont)
    UslugiPage.tsx      — страница услуг (/uslugi)
    CompanyPage.tsx     — страница о компании (/company)
  components/
    Navbar.tsx          — фиксированная шапка (fixed, glassmorphism pill)
    Footer.tsx          — подвал (bg-[#48484A])
    FloatingContacts.tsx — кнопки Telegram + WhatsApp внизу справа
    MainHero.tsx        — hero с двумя слайдами
    ServicesCards.tsx   — 2 карточки (Сервисный центр / Скупка)
    AboutBentoSection.tsx — о компании (тёмный bento grid)
    ReviewsSection.tsx  — отзывы (marquee 2 ряда)
    RequestForm.tsx     — форма заявки (тёмная, left+right split)

api/
  contact.ts            — Vercel serverless: отправка в Telegram
```

---

## Контакты в коде (если изменятся — менять везде)

| Что | Значение |
|-----|----------|
| Телефон | `+77775181111` |
| WhatsApp | `https://wa.me/77775181111` |
| Telegram | `https://t.me/+77775181111` |
| Email | `greatstevekz1@icloud.com` |
| Адрес | Алматы, Гоголя, дом 75 |

---

## DNS (reg.ru → Vercel)

Добавить A-записи в reg.ru:

| Тип | Хост | Значение |
|-----|------|----------|
| A | @ | 76.76.21.21 |
| A | www | 76.76.21.21 |

---

## Telegram бот (ещё не настроен)

1. [@BotFather](https://t.me/BotFather) → `/newbot` → получить токен
2. Написать боту, открыть `api.telegram.org/bot<TOKEN>/getUpdates` → найти `chat.id`
3. В Vercel Dashboard → Settings → Environment Variables:
   - `TELEGRAM_BOT_TOKEN` = токен
   - `TELEGRAM_CHAT_ID` = chat id

---

## Деплой

```bash
# Установить зависимости
npm install

# Запустить локально
npm run dev   # → localhost:3000

# Задеплоить на Vercel (production)
vercel --prod
```

---

## Известные проблемы и решения

### Navbar не фиксируется при скролле
**Причина:** `sticky top-0` не работает если родитель имеет `overflow: hidden`.  
**Решение:** Использовать `fixed top-0 left-0 right-0` на `<header>`.

### Текст поверх hero не читается
**Причина:** Слабый overlay на фото.  
**Решение:** `bg-black/65` + `bg-gradient-to-b from-black/40 via-transparent to-black/50`.

### Карточки ServicesCards — текст не читался
**Причина:** Изображения занимали только часть карточки, overlay был слабый.  
**Решение:** `absolute inset-0 bg-cover bg-center` на div с фоном + `from-black/80 via-black/40 to-black/20`.

### Двойной текст в Navbar (анимация)
**Причина:** Использовали dual-text scroll trick — оба слоя отображались одновременно.  
**Решение:** Убрали трюк, оставили простой цветовой переход при наведении.

### Navbar border-radius анимация (pill → прямоугольник при открытии мобильного меню)
**Решение:** `motion.nav` с inline `style={{ borderRadius }}` + обычный transition через motion.

### Edit tool: строка не найдена
**Причина:** Пробелы/отступы в old_string не совпадают с файлом.  
**Решение:** Сначала Read файл с нужным offset, копировать точный текст.

---

## Страницы — статус

| Страница | Статус | Что осталось |
|----------|--------|--------------|
| Главная `/` | ✅ Готова | Добавить фото в company/ |
| Ремонт `/remont` | ✅ Готова | — |
| Услуги `/uslugi` | ✅ Готова | Добавить фото в uslugi/ |
| О компании `/company` | ✅ Готова | Добавить фото в company/ |

---

## Блоки главной страницы — статус

| Блок | Компонент | Статус |
|------|-----------|--------|
| Hero | MainHero | ✅ |
| Карточки услуг | ServicesCards | ✅ |
| О компании | AboutBentoSection | ✅ |
| Отзывы | ReviewsSection | ✅ marquee |
| Форма заявки | RequestForm | ✅ WhatsApp + Telegram API |
| Footer | Footer | ✅ |
