import type { AdvantageItem } from './types'

/**
 * Секция «Почему выбирают нас» на главной.
 * Источник — reference site kontora.futuguru.com (home.html h6 блок).
 * 5 преимуществ с крупными номерами 01–05.
 */
export const advantages: {
  readonly eyebrow: string
  readonly title: string
  readonly items: readonly AdvantageItem[]
} = {
  eyebrow: '5 причин',
  title: 'ПОЧЕМУ ВЫБИРАЮТ НАС',
  items: [
    {
      id: 'production',
      number: '01',
      title: 'СОБСТВЕННОЕ ПРОИЗВОДСТВО',
      body: 'Печатаем, режем, ламинируем и упаковываем на своём оборудовании. Никаких посредников.',
      tone: 'yellow',
    },
    {
      id: 'materials',
      number: '02',
      title: 'ИТАЛЬЯНСКИЕ МАТЕРИАЛЫ',
      body: 'Работаем на плёнках премиум-класса. Яркие цвета, стойкость к влаге и солнцу.',
      tone: 'violet',
    },
    {
      id: 'speed',
      number: '03',
      title: 'ВСЕГДА РЯДОМ',
      body: 'Быстро отвечаем, быстро печатаем. Доставка по всей России.',
      tone: 'pink',
    },
    {
      id: 'brands',
      number: '04',
      title: 'ОПЫТ РАБОТЫ С БРЕНДАМИ И АГЕНТСТВАМИ',
      body: 'Имеем большой опыт производства, поэтому нам доверяют как малые, так и крупные бренды',
      tone: 'peach',
    },
    {
      id: 'quality',
      number: '05',
      title: 'ПРОЗРАЧНЫЙ ПРОЦЕСС И КОНТРОЛЬ КАЧЕСТВА',
      body: 'Вы видите каждый этап: от макета до упаковки. Мы контролируем качество на всех шагах.',
      tone: 'blue',
    },
  ],
} as const
