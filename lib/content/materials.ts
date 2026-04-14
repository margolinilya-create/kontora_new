import type { MaterialSwatchItem } from './types'

/**
 * Секция «Материалы» на главной. Источник — PDF §1.5.
 * Горизонтальный блок с 6 образцами плёнок. Без текста в оригинале, но мы
 * добавляем короткие подписи для a11y и SEO-доступности.
 *
 * Цвета — через CSS vars (все токены объявлены в globals.css).
 * Когда владелец пришлёт реальные фото — заменим swatches на картинки.
 */
export const materials: {
  readonly eyebrow: string
  readonly title: string
  readonly items: readonly MaterialSwatchItem[]
} = {
  eyebrow: 'Материалы',
  title: 'ПЛЁНКИ, НА КОТОРЫХ ПЕЧАТАЕМ',
  items: [
    {
      id: 'transparent',
      name: 'Прозрачная',
      colorVar: 'rgba(255,255,255,0.10)',
      textColorVar: 'var(--color-cream)',
      description: 'Для невидимой подложки и наложения на разные фоны.',
    },
    {
      id: 'matte-white',
      name: 'Матовая белая',
      colorVar: 'var(--color-cream)',
      textColorVar: 'var(--color-dark)',
      description: 'Классика: не бликует, цвета яркие, подходит под любую графику.',
    },
    {
      id: 'gloss-white',
      name: 'Глянцевая',
      colorVar: 'var(--color-white)',
      textColorVar: 'var(--color-dark)',
      description: 'Блестящая, насыщенные цвета, устойчива к истиранию.',
    },
    {
      id: 'gold',
      name: 'Золотая',
      colorVar: 'var(--material-gold)',
      textColorVar: 'var(--color-dark)',
      description: 'Металлик для акцентов и премиум-мерча.',
    },
    {
      id: 'silver',
      name: 'Серебряная',
      colorVar: 'var(--material-silver)',
      textColorVar: 'var(--color-dark)',
      description: 'Зеркальный металлик. Хорошо смотрится на тёмных упаковках.',
    },
    {
      id: 'holo',
      name: 'Голография',
      colorVar: 'var(--material-holo)',
      textColorVar: 'var(--color-dark)',
      description: 'Радужная переливающаяся плёнка. Для стикерпаков и коллабораций.',
    },
  ],
} as const
