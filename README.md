# Контора — сайт

Маркетинговый сайт мануфактуры виниловых изделий «Контора» (kontora.su). Next.js 14, App Router, RSC, TypeScript strict, Tailwind, Framer Motion, Resend.

**Статус:** M0–M7 завершены. Все 16 публичных роутов работают, калькулятор с mock-формулой (ждёт реальную от владельца), формы отправляются через Resend, аналитика через consent-gate, Playwright + Vitest в CI.

---

## Быстрый старт (для разработчика)

```bash
npm install
npm run dev            # http://localhost:3000
```

Требуется **Node.js >= 20.11**.

Для реальной отправки форм — скопируй `.env.example` в `.env.local` и заполни `RESEND_API_KEY`. Без него формы работают в fallback-режиме (валидация + success UI, но письмо не уходит).

---

## Редактирование контента (для владельца)

Самое важное для повседневной работы с сайтом. Кода трогать не нужно — всё делается через **GitHub веб-интерфейс**.

### Как поправить строку текста

1. Заходи на https://github.com/margolinilya-create/kontora_new
2. Нужные файлы лежат в папке `lib/content/` (по страницам):
   - `home.ts` — главная (hero, каталог, быстрый заказ, запрос менеджеру)
   - `products/<slug>.ts` — 7 продуктовых страниц
   - `howto.ts` — «Как подготовить макет»
   - `blog.ts` — страница блога / «О компании»
   - `about.ts` — «О нас»
   - `contacts.ts` — контакты
   - `legal.ts` — privacy / cookies / согласие
   - `audience.ts`, `advantages.ts`, `materials.ts`, `nav.ts` — повторяющиеся блоки
3. Нажми на нужный файл → кнопка «Edit this file» (карандаш справа)
4. Правь строку (только текст в кавычках, НЕ трогай `:`, `{`, `}`)
5. Внизу страницы «Commit changes» → «Create a new branch» → «Create pull request»
6. Vercel создаст preview-ссылку автоматически (~60 секунд). Проверь по ней.
7. Если всё ок — мёрджим PR → через минуту изменения на боевом домене.

### Важно: если добавляешь новый текст

CI-проверка `check:copy` сравнивает все русские строки в `lib/content/**` с файлом `content-source/pdf-extract.txt`. Если добавляешь **новый** текст (не редактируешь существующий), нужно также дописать его в `pdf-extract.txt` в секции «UX-дополнения сверх PDF». Иначе PR будет красным.

### Как добавить новый FAQ-вопрос

FAQ пока пустые — шаблон готов, ждёт контент:

```ts
// lib/content/products/3d-stikerpaki.ts
faq: [
  {
    id: 'delivery',
    question: 'Какой минимальный тираж?',
    answer: 'От 10 штук для 3D стикерпаков. Для контурной резки — от 50 штук.',
  },
  // ...добавляй сколько нужно
],
```

Тоже добавь вопросы и ответы в `pdf-extract.txt` — иначе CI не пропустит.

---

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
| `npm run check:all` | всё выше одним прогоном + unit тесты |
| `npm run test:unit` | Vitest — pricing + form schemas |
| `npm run test:e2e` | Playwright smoke — 18 роутов |
| `npm run test:a11y` | Playwright + axe-core — a11y аудит |

---

## Архитектура

```
app/                    маршруты (App Router + RSC по умолчанию)
  actions/              Server Actions для форм
  catalog/[slug]/       7 продуктовых страниц (generateStaticParams)
  bystryj-zakaz/        публичный калькулятор
  kak-podgotovit-maket/
  blog/, o-nas/, kontakty/
  privacy/, cookies/, soglasie/
  layout.tsx            глобальный Header/Footer/ConsentBanner/AnalyticsProvider
  sitemap.ts, robots.ts, manifest.ts, opengraph-image.tsx

components/
  ui/                   примитивы (Button, Input, Accordion, Checkbox, …)
  brand/                брендовые атомы (StickerButton, YellowMarker,
                        StickerCard, AdvantageBar, MaterialSwatch, …)
  sections/             композиции по страницам (home/, product/, howto/,
                        blog/, legal/, shared/Header+Footer+MobileMenu)
  calculator/           весь калькулятор как feature (6 steps + preview + panel)
  forms/                формы + consent checkbox
  providers/            ConsentBanner, AnalyticsProvider

lib/
  tokens.ts             TS-зеркало CSS vars
  routes.ts             единый реестр маршрутов (sitemap, nav, breadcrumbs)
  products.ts           реестр 7 продуктов (slug → label)
  fonts.ts              Onest + JetBrains Mono + Druk Wide placeholder
  seo/                  metadata factory, JSON-LD, OG images
  pricing/              pure калькулятор (types, table, calculate, leadtime)
                        + __tests__/ — Vitest контракт-тесты
  content/              типизированный контент (главный слой для редактирования)
  email/                Resend client + React Email шаблоны + send helpers
  forms/schemas.ts      Zod схемы + __tests__/
  analytics/            track() + events реестр
  calculator/           state + reducer + persist + hook
  utils/                cn (clsx + tailwind-merge)

content-source/         pdf-extract.txt — single source of truth текста
scripts/                check-tokens.ts, check-copy.ts (CI гейты)
tests/                  smoke.spec.ts + a11y.spec.ts (Playwright)
```

**Правила импортов** (enforced ESLint `eslint-plugin-boundaries`):

```
ui       → только ui + lib
brand    → brand + ui + lib
sections → sections + brand + ui + lib + forms + calculator
app      → всё
lib      → только lib
```

Нарушение = fail CI.

---

## Design tokens

Источник правды — **CSS variables в `app/globals.css`**. TS-зеркало в `lib/tokens.ts` для JS (Framer Motion, OG images).

**Никаких raw hex в `components/**` и `app/**`** — enforced `scripts/check-tokens.ts` + ESLint `no-restricted-syntax`. Исключения (OG images, global-error, email шаблоны) — в allowlist.

Палитра:

- `--color-yellow` `#FFD047` — primary CTA, маркер, focus
- `--color-violet` `#7C4DFF` — калькулятор, selected states в формах
- `--color-red` `#FF4848` — danger, tags
- `--color-dark` `#0F0F0F` — основной фон
- `--color-dark-2/3` — градации для карточек и полос
- `--color-cream` `#FAFAF7` — светлые секции

Shadows (подпись бренда):

- `shadow-sticker` — `6px 6px 0 0 #0F0F0F` — offset-тень без blur, применяется ко всем CTA и карточкам

---

## SEO

- **Metadata** собирается фабрикой `lib/seo/metadata.ts` из единого реестра `lib/routes.ts`.
- **Sitemap** `/sitemap.xml` генерируется автоматически из реестра.
- **Robots** `/robots.txt` — allow all, disallow `/dev/*` и `/api/*`.
- **JSON-LD** — Organization + WebSite в layout, BreadcrumbList + Product + FAQPage на продуктовых.
- **OG images** — динамические через `next/og` ImageResponse для всех ключевых роутов.
- **Favicon / apple-icon** — динамические.
- **hreflang** — `ru-RU` + `x-default`, структура заложена под будущий `en`.
- **Performance budget** — `performance-budget.json` (LCP ≤2s, INP ≤200ms, CLS ≤0.05, JS ≤180KB/route).
- **Lighthouse CI** — `lighthouserc.json` с assertions (опционально запускается отдельной job'ой).

---

## Шрифты

- **Display:** Druk Wide (Commercial Type, платный) — self-host в `public/fonts/`. Пока `lib/fonts.ts` содержит заглушку → Onest Display как fallback. **TODO владельцу:** купить лицензию, положить `.woff2` файлы и раскомментировать блок в `lib/fonts.ts`.
- **Body:** Onest (Google Fonts, бесплатный), subset `cyrillic, latin`.
- **Mono:** JetBrains Mono, `latin`. Используется для цен, чисел, mono-меток.

Все шрифты — через `next/font` с `display: swap` и `adjustFontFallback` против CLS.

---

## Формы

Все 3 формы (Manager Request, Sample Request, Contact) работают через **Server Actions** + **Resend**:

1. Клиент → `formAction` из `useFormState`
2. Server Action → Zod валидация → `sendManagerRequestEmail` / `sendSampleRequestEmail`
3. Resend отправляет email на `RESEND_TO` (или `hello@kontora.su` по умолчанию)
4. Если `RESEND_API_KEY` не задан — graceful fallback: форма показывает success UI, но письмо не уходит, в логи сервера пишется warning.

**Email шаблоны:** React Email в `lib/email/templates/`. Брендовый вид с yellow/violet карточками.

**152-ФЗ compliance:** consent-чекбокс обязателен на всех формах, submit заблокирован без галочки, Server Action отклоняет submit без `consent: 'on'`. Тексты политик в `/privacy`, `/cookies`, `/soglasie`.

---

## Аналитика

**Yandex.Metrica + PostHog через consent-gate.** Подключаются только при `kontora_consent=accepted`:

- `components/providers/AnalyticsProvider.tsx` — грузит скрипты через `next/script afterInteractive`
- `ConsentBanner` при клике «Принять всё» триггерит global event → provider подгружает скрипты без reload
- `lib/analytics/track.ts` — единая обёртка `track({ name, props })`
- `lib/analytics/events.ts` — типизированный реестр событий

**Env vars** (в Vercel):

- `NEXT_PUBLIC_METRIKA_ID` — ID счётчика Яндекс.Метрики (цифры)
- `NEXT_PUBLIC_POSTHOG_KEY` — API key PostHog (опционально)
- `NEXT_PUBLIC_POSTHOG_HOST` — по умолчанию `https://eu.posthog.com`

Без ключей провайдер просто ничего не загружает — безопасно.

---

## Тесты

- **Vitest:** `lib/pricing/__tests__/calculate.spec.ts` (24 теста) + `lib/forms/__tests__/schemas.spec.ts` (9 тестов). 33 теста контракта и валидации.
- **Playwright smoke:** 18 публичных роутов → 200 + headline + 0 console errors + sitemap + robots.
- **Playwright a11y:** `@axe-core/playwright` на `/`, `/catalog/3d-stikerpaki`, `/bystryj-zakaz` — 0 critical/serious нарушений.
- **Lighthouse CI:** `lighthouserc.json` с блокирующими assertions (performance ≥0.9, a11y ≥0.95).

Запуск:

```bash
npm run test:unit       # ~1 сек
npm run test:e2e        # ~10 сек, поднимает локальный next start
npm run test:a11y       # ~5 сек
```

---

## Деплой на Vercel

1. Vercel подключен к GitHub репо `margolinilya-create/kontora_new`
2. Каждый push в `main` → production деплой
3. Каждый PR → preview URL автоматически в комментариях
4. Build command: `npm run build` (дефолт для Next.js)
5. **Env vars в Vercel Dashboard → Settings → Environment Variables:**
   - `RESEND_API_KEY` — для отправки форм
   - `RESEND_FROM`, `RESEND_TO` — отправитель и получатель
   - `NEXT_PUBLIC_METRIKA_ID` — Яндекс.Метрика
   - `NEXT_PUBLIC_POSTHOG_KEY` — PostHog (опционально)

Без env vars сайт всё равно собирается и деплоится, просто аналитика и email не работают.

---

## Milestones (реализованы)

- **M0** — скаффолд Next 14 + токены + SEO foundation + content source ✅
- **M1** — layout shell + UI/brand atoms + Header/Footer + kitchen-sink ✅
- **M2** — главная (все 7 блоков PDF §1) ✅
- **M3** — ProductPage + 7 продуктовых + pricing scaffold ✅
- **M4** — калькулятор (6 шагов, mock formula, localStorage persist) ✅
- **M5** — howto + blog + o-nas + contacts + legal + Resend emails ✅
- **M6** — OG images + consent-gated analytics + Playwright + Lighthouse CI ✅
- **M7** — unit tests + owner handoff + backlog ✅

Полный план — `.claude/plans/gentle-strolling-acorn.md` (не в репо).

---

## Что в backlog

Всё отложенное на v3+ — в [backlog.md](./backlog.md). Короткий список:

- Админ-панель с ролями, БД (Prisma + Postgres), auth (NextAuth)
- Visual rule builder для ценообразования
- Checkout с оплатой (ЮКасса), СДЭК/Почта для доставки
- Личный кабинет клиента + трекинг заказа
- CMS для блога (MDX или Sanity)
- Real-time загрузка макетов на S3/R2
- Реальные фото продукции и галереи (сейчас CSS-плейсхолдеры)
- Мульти-язычность (`en` — структура заложена)

Подробное описание каждого пункта с estimate и приоритетом — в `backlog.md`.
