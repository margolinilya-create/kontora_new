# Kontora — контекст для Claude Code

Сайт **kontora.su** — производство стикеров. Next.js 14 App Router + React 18 + TypeScript + Tailwind + framer-motion. Деплой на Vercel.

## Структура

- `app/` — App Router (layout, globals.css, page.tsx)
- `components/layout/` — Header, Footer
- `components/sections/` — Hero, Calculator, Catalog, Trust, Cta
- `components/ui/` — Button, Tag (примитивы)
- `lib/calculator.ts` — продукты и логика расчёта
- `public/logo/` — SVG/PNG логотипы

Новые страницы — в `app/`, секции — в `components/sections/`, UI-примитивы — в `components/ui/`.

## Брендовые токены (из брендбука)

| Токен    | Hex       | Использование      |
|----------|-----------|--------------------|
| `yellow` | `#FFD047` | CTA, акценты       |
| `red`    | `#FF4848` | Теги, danger       |
| `blue`   | `#009FE3` | Инфо, вторичный    |
| `dark`   | `#282828` | Фон, обводки       |
| `white`  | `#FFFFFF` | Карточки, кнопки   |

Использовать токены из `tailwind.config.ts` (`bg-yellow`, `text-dark`), не вводить произвольные hex в компонентах.

## Roadmap

См. [docs/architecture.md](docs/architecture.md).

## Инструменты Claude для этого проекта

**Агенты** (через `Agent` tool):
1. **Plan** — планирование фич, страниц, схемы БД
2. **Explore** — ресёрч кодовой базы
3. **general-purpose** — многошаговые задачи

**Скиллы** (через `Skill` tool):
1. **frontend-design** — проектирование UI-секций
2. **web-design-guidelines** — чеклист доступности и адаптива
3. **software-architecture** — слои данных и интеграции (ЮКасса, БД, Telegram)

## Стандарты

- App Router + Server Components по умолчанию
- Tailwind для стилизации, минимум новых зависимостей
- TypeScript strict
- Компоненты — функциональные, без лишних абстракций
