# Контора — Next.js Site

Сайт для производства стикеров kontora.su на Next.js 14 + Tailwind CSS.

## Быстрый старт

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Деплой на Vercel

### Способ 1 — Через GitHub (рекомендуется)
1. Создайте репозиторий на GitHub и загрузите папку
2. Зайдите на [vercel.com](https://vercel.com) → **Add New Project**
3. Выберите репозиторий → нажмите **Deploy**
4. Готово! Vercel сам найдёт Next.js и настроит сборку

### Способ 2 — Через Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

### Переменные окружения (добавить в Vercel Dashboard)
```
NEXT_PUBLIC_SITE_URL=https://kontora.su
# Добавить позже:
# DATABASE_URL=postgresql://...
# NEXTAUTH_SECRET=...
# YUKASSA_SHOP_ID=...
# YUKASSA_SECRET_KEY=...
```

## Структура проекта

```
kontora-site/
├── app/
│   ├── layout.tsx        # Root layout, шрифты, метаданные
│   ├── globals.css       # Tailwind + CSS переменные + компонентные утилиты
│   └── page.tsx          # Главная страница
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx    # Sticky шапка с мобильным меню
│   │   └── Footer.tsx    # Подвал
│   ├── sections/
│   │   ├── Hero.tsx      # Hero-секция с декором
│   │   ├── Calculator.tsx # MiniCalculator + CalculatorSection
│   │   ├── Catalog.tsx   # Каталог 5 продуктов
│   │   ├── Trust.tsx     # Преимущества + отзывы
│   │   └── Cta.tsx       # Финальный призыв к действию
│   └── ui/
│       ├── Button.tsx    # Кнопки (sticker-style + admin-style)
│       └── Tag.tsx       # Теги, чипы статусов
│
├── lib/
│   └── calculator.ts     # Продукты, логика расчёта, типы
│
├── public/
│   └── logo/             # SVG и PNG логотипы
│
├── tailwind.config.ts    # Брендовые токены из брендбука
└── vercel.json
```

## Цветовые токены (из официального брендбука)

| Токен     | Hex       | Использование        |
|-----------|-----------|----------------------|
| `yellow`  | `#FFD047` | CTA, акценты, тени   |
| `red`     | `#FF4848` | Тэги, danger         |
| `blue`    | `#009FE3` | Инфо, вторичный      |
| `dark`    | `#282828` | Фон, обводы, тени    |
| `white`   | `#FFFFFF` | Карточки, кнопки     |

## Следующие этапы

- [ ] Страницы продуктов `/catalog/[slug]`
- [ ] Страница оформления заказа с загрузкой макета
- [ ] Личный кабинет `/account`
- [ ] Трекинг заказа `/account/track/[id]`
- [ ] Подключение БД (Prisma + PostgreSQL)
- [ ] Оплата СБП / ЮКасса
- [ ] Панель управления `/admin`
- [ ] Telegram-уведомления
- [ ] SEO-страницы и блог
