import type { AudienceCard } from './types'

/**
 * Секция «Кому подойдут наши наклейки» на главной и в блоге.
 * Источник — reference site kontora.futuguru.com (/tmp/ref-audit/blog.html
 * paragraphs). 4 карточки multi-accent.
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
      body: 'Чтобы логотип выглядел не как «лишь бы было», а как «о, это круто»',
      tone: 'yellow',
    },
    {
      id: 'marketplaces',
      title: 'МАРКЕТПЛЕЙСАМ И МЕРОПРИЯТИЯМ',
      body: 'Для маркетплейсов, мероприятий и подарков клиентам. Чтобы покупку хотелось сфоткать, а наклейку — оставить себе',
      tone: 'pink',
    },
    {
      id: 'studios',
      title: 'МАРКЕТИНГОВЫМ СТУДИЯМ',
      body: 'Для проектов клиентов и white-label производства. Мы не спорим с дизайном — мы его аккуратно печатаем',
      tone: 'violet',
    },
    {
      id: 'events',
      title: 'EVENT И РЕКЛАМНЫМ АГЕНТСТВАМ',
      body: 'Для мероприятий, фестивалей, акций и коллабораций. Сделаем так, чтобы наклейки разлетелись быстрее иного мерча',
      tone: 'peach',
    },
  ],
} as const
