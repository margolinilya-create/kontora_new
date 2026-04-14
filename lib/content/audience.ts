import type { AudienceCard } from './types'

/**
 * Секция «Кому подойдут наши наклейки» на главной.
 * Источник — PDF §1.6. 4 карточки multi-accent из новой палитры.
 */
export const audience: {
  readonly eyebrow: string
  readonly title: string
  readonly cards: readonly AudienceCard[]
} = {
  eyebrow: 'Сегментация',
  title: 'КОМУ ПОДОЙДУТ НАШИ НАКЛЕЙКИ:',
  cards: [
    {
      id: 'brands',
      title: 'КРУПНЫМ БРЕНДАМ',
      body: 'Чтобы логотип выглядел не как «опять бы визитка», а как но, это круто.',
      tone: 'yellow',
    },
    {
      id: 'studios',
      title: 'МАРКЕТИНГОВЫМ СТУДИЯМ',
      body: 'Для проектов клиентов и любого производства. Мы не спорим с дизайном — мы его воплощаем.',
      tone: 'violet',
    },
    {
      id: 'marketplaces',
      title: 'МАРКЕТПЛЕЙСАМ, МЕРОПРИЯТИЯМ И ПОДАРКАМ',
      body: 'Для маркетплейсов, мероприятий и подарочных комплектов. Чтобы почему-то хотелось сохранить, а не выбросить.',
      tone: 'pink',
    },
    {
      id: 'events',
      title: 'EVENT И РЕКЛАМНЫМ АГЕНТСТВАМ',
      body: 'Для мероприятий, фестивалей, магазинов и коллабораций. Сделаем так, чтобы наклейки разлетелись быстрее около мерча.',
      tone: 'peach',
    },
  ],
} as const
