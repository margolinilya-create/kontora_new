import type { AdvantageItem } from './types'

/**
 * Секция «Почему выбирают нас» на главной. Источник — PDF §1.7.
 * 5 горизонтальных полос с крупными номерами 01–05.
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
      title: 'ОПЫТ РАБОТЫ С БРЕНДАМИ И КОМАНДАМИ',
      body: 'Мы работаем не только с малым бизнесом, но и с крупными брендами.',
      tone: 'peach',
    },
    {
      id: 'price',
      number: '05',
      title: 'ПРОЗРАЧНЫЙ ПРАЙС И КОНТРОЛЬ КАЧЕСТВА',
      body: 'Вы знаете, за что платите. Мы контролируем каждый этап.',
      tone: 'blue',
    },
  ],
} as const
