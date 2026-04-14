# Контора — сайт

Маркетинговый сайт мануфактуры виниловых изделий «Контора» (kontora.su). Next.js 14, App Router, RSC, TypeScript strict, Tailwind, Framer Motion.

## Быстрый старт

```bash
npm install
npm run dev            # http://localhost:3000
```

Требуется Node.js `>= 20.11`.

## Скрипты

| Команда | Что делает |
|---|---|
| `npm run dev` | dev-сервер, hot reload |
| `npm run build` | production билд, статика в `.next/` |
| `npm run start` | запуск production билда |
| `npm run typecheck` | `tsc --noEmit`, strict |
| `npm run lint` | ESLint с `--max-warnings 0` (блокер PR) |
| `npm run format` | Prettier write |
| `npm run format:check` | Prettier check (CI) |
| `npm run check:tokens` | запрещает raw hex цвета в компонентах |
| `npm run check:copy` | диффит `lib/content/**` против `content-source/pdf-extract.txt` |
| `npm run check:all` | всё выше одним прогоном |
| `npm run test:unit` | Vitest (после появления формулы калькулятора) |

## Архитектура — коротко

```
app/                    маршруты и route-handlers
components/
  ui/                   примитивы без брендинга (Button, Input, Accordion, …)
  brand/                брендовые атомы (StickerButton, YellowMarker, AdvantageBar, …)
  sections/             композиции уровня страницы (home/, product/, howto/, blog/, shared/)
  calculator/           весь калькулятор как feature
  forms/                формы + Server Actions
  providers/            MotionProvider, AnalyticsProvider, ConsentBanner
lib/
  tokens.ts             TS-зеркало CSS vars
  routes.ts             единый реестр маршрутов (sitemap, nav, breadcrumbs)
  seo/                  metadata factory, JSON-LD генераторы, OG утилиты
  pricing/              pure-модуль калькулятора (ждёт формулу от владельца)
  content/              типизированный контент из PDF
  email/                Resend client + React Email шаблоны
  telegram/             notify() для Telegram Bot API
  forms/schemas.ts      Zod схемы
  utils/                cn, format, slugify
content-source/         сырой PDF-текст, источник правды контента
scripts/                CI-скрипты (check-tokens, check-copy)
public/                 статика (fonts, brand, gallery, products)
```

**Правила импортов** (enforced ESLint `eslint-plugin-boundaries`):

```
ui → (только ui, lib)
brand → (ui, lib)
sections → (sections, brand, ui, lib, forms, calculator)
app → (всё кроме циклов)
lib → (только lib)
```

Нарушение = fail CI.

## Design tokens

Источник правды — CSS variables в `app/globals.css`. TS-зеркало в `lib/tokens.ts` для Framer Motion и SEO-утилит.

**Никаких raw hex цветов в `components/**`** — enforced `scripts/check-tokens.ts` + ESLint `no-restricted-syntax`.

Палитра:

- `--color-yellow` `#FFD047` — primary CTA, маркер, focus
- `--color-violet` `#7C4DFF` — калькулятор, selected states
- `--color-red` `#FF4848` — danger, tags
- `--color-dark` `#0F0F0F` — основной фон
- `--color-cream` `#FAFAF7` — светлые секции

Shadows:

- `shadow-sticker` — `6px 6px 0 0 var(--color-dark)` — подпись бренда, применяется к CTA и карточкам

## Редактирование контента (для владельца)

Весь текст сайта лежит в двух местах:

1. **`content-source/pdf-extract.txt`** — сырой PDF-текст, источник правды.
2. **`lib/content/**/*.ts`** — типизированный контент, который реально рендерится.

Чтобы поправить текст:

1. Правишь нужную строку в файле `lib/content/**/*.ts` через GitHub web editor.
2. Если это новый текст — добавь его также в `content-source/pdf-extract.txt`.
3. Commit → Vercel создаст preview через ~60 секунд → проверяешь → merge в `main`.

CI проверит, что все строки из `lib/content` есть в `pdf-extract.txt`. Если расходятся — PR красный, надо обновить оба файла.

## SEO

- **Metadata** собирается фабрикой `lib/seo/metadata.ts` из единого реестра `lib/routes.ts`.
- **Sitemap** `/sitemap.xml` генерируется из того же реестра (`app/sitemap.ts`).
- **Robots** `/robots.txt` — `app/robots.ts`.
- **JSON-LD** — Organization + WebSite в `app/layout.tsx`, BreadcrumbList + Product + FAQPage на продуктовых страницах (M3+).
- **OG images** генерируются через `next/og` `ImageResponse` (`app/opengraph-image.tsx` + per-route).
- **Favicon / apple-icon** — динамические через `ImageResponse`.
- **hreflang** — сейчас `ru-RU` + `x-default`, структура заложена под будущий `en`.
- **Performance budget** — заложен в план, Lighthouse CI подключится в M6.

## Шрифты

- **Display:** Druk Wide (Commercial Type, платный) — self-host в `public/fonts/`. Покупает владелец к M1. Пока `lib/fonts.ts` содержит заглушку.
- **Body:** Onest (Google Fonts, бесплатный), subset `cyrillic, latin`.
- **Mono:** JetBrains Mono, `latin`.

Все шрифты — через `next/font` с `display: swap` и `adjustFontFallback` для борьбы с CLS.

## Milestones

- **M0** — скаффолд, токены, SEO-фабрики, контент-источник. **← текущий**
- **M1** — Layout shell + UI/brand atoms + Header/Footer + kitchen-sink.
- **M2** — главная (все 7 блоков PDF §1).
- **M3** — ProductPage template + 7 продуктовых + pricing scaffold.
- **M4** — калькулятор v1 (UI complete, mock формула).
- **M5** — howto + blog + legal + формы (Resend + Telegram).
- **M6** — SEO / perf / a11y polish, Lighthouse CI, Yandex.Metrica.
- **M7** — content lock + handoff на `new.kontora.su`.

Полный план — `/Users/margolinilya/.claude/plans/gentle-strolling-acorn.md`.

## Что в backlog

Следующая фаза проекта (v3+): админка, БД, auth, pricing rule builder, checkout с оплатой (ЮКасса), СДЭК, Telegram transactional, ЛК клиента, CMS для блога. Всё это сознательно не входит в текущий scope.
