import type { HomeContent } from './types'

/**
 * Главная. Источник — reference site kontora.futuguru.com
 * (/tmp/ref-audit/home.html, раздел paragraphs/headings).
 *
 * Hero: центрированный layout, SVG-заголовок «С НАМИ ВСЕ КЛЕИТСЯ!»
 * (group-39552-1.svg), подзаголовок «Производим виниловые наклейки...»,
 * CTA «БЫСТРЫЙ ЗАКАЗ» с якорем на калькулятор.
 *
 * Catalog: 7 категорий — тексты из реального footer раздела home.
 */
export const home: HomeContent = {
  hero: {
    eyebrow: 'Мануфактура · Санкт-Петербург',
    titleLines: [
      [{ kind: 'text', value: 'С НАМИ' }],
      [{ kind: 'text', value: 'ВСЁ' }],
      [{ kind: 'text', value: 'КЛЕИТСЯ!' }],
    ],
    subtitle: [
      { kind: 'text', value: 'Производим ' },
      { kind: 'marker', value: 'виниловые' },
      { kind: 'text', value: ' наклейки и стикерпаки. От этикеток и 3D стикеров до ' },
      { kind: 'underline', value: 'широкоформатных' },
      { kind: 'text', value: ' наклеек.' },
    ],
    primaryCta: { label: 'Быстрый заказ', href: '/#order' },
    secondaryCta: { label: 'Каталог продукции', href: '#catalog' },
  },

  catalog: {
    eyebrow: '7 категорий',
    title: 'ВЫБИРАЙ, ЧТО КЛЕИТСЯ ТЕБЕ',
    subtitle:
      'Формы, размеры, текстуры — у нас есть стикер на любой случай. От блеска 3D до дерзости винила.',
    cards: [
      {
        slug: 'stikery-s-konturnoj-rezkoj',
        label: '01',
        title: 'СТИКЕРЫ С КОНТУРНОЙ РЕЗКОЙ',
        description:
          'Любая форма, точная резка по контуру изображения, получите поштучно нарезанный тираж',
        iconSrc: '/brand/types/fifthtype.png',
      },
      {
        slug: 'pryamougolnye-i-kvadratnye',
        label: '02',
        title: 'ПРЯМОУГОЛЬНЫЕ И КВАДРАТНЫЕ НАКЛЕЙКИ',
        description: 'Идеальны для этикеток и маркировки вашей продукции',
        iconSrc: '/brand/types/fourthtype.png',
      },
      {
        slug: 'stikery-s-nadsechkoj',
        label: '03',
        title: 'СТИКЕРЫ С НАДСЕЧКОЙ',
        description: 'Удобны для массового использования и упаковки',
        iconSrc: '/brand/types/thirdtype.png',
      },
      {
        slug: 'bolshie-stikery',
        label: '04',
        title: 'БОЛЬШИЕ СТИКЕРЫ',
        description:
          'Любого размеры и формы. На всю стену или окно. Напечатаем и оклеим. Для тех кто хочет заявить о себе без мегафона',
        iconSrc: '/brand/types/secondtype.png',
      },
      {
        slug: '3d-stikerpaki',
        label: '05',
        title: '3D СТИКЕРПАКИ',
        description:
          'Стикерпак с объемными стикерами. Идеальны для подарка или товара в прикассовую зону',
        iconSrc: '/brand/types/firsttype.png',
      },
      {
        slug: '3d-stikery',
        label: '06',
        title: '3D СТИКЕРЫ - ХИТ',
        description:
          'Они же объемные, купольные со смолой. Любой формы и размеров. Поштучно или на листе',
        iconSrc: '/brand/types/firsttype.png',
      },
      {
        slug: 'stikerpaki',
        label: '07',
        title: 'СТИКЕРПАК',
        description:
          'Наборы наклеек на подложке. На матовой, глянцевой, прозрачной, хромированной (золото, серебро, голография) плёнке. С матовой / глянцевой ламинацией',
        iconSrc: '/brand/types/fifthtype.png',
      },
    ],
  },

  quickOrder: {
    eyebrow: 'Калькулятор · 60 секунд',
    title: 'БЫСТРЫЙ ЗАКАЗ',
    subtitle:
      'Рассчитаем предварительную стоимость и подскажем по срокам производства',
    cta: { label: 'Рассчитать стоимость', href: '#order' },
  },

  managerRequest: {
    eyebrow: 'Для крупных тиражей',
    title: 'ЗАПРОС ДЛЯ МЕНЕДЖЕРА',
    subtitle:
      'Заполните анкету, чтобы наш менеджер связался с вами для уточнения деталей заказа.',
    productOptions: [
      { value: 'stikery-s-konturnoj-rezkoj', label: 'Стикеры с контурной резкой' },
      { value: '3d-stikerpaki', label: '3D стикерпаки' },
      { value: '3d-stikery', label: '3D стикеры' },
      { value: 'pryamougolnye-i-kvadratnye', label: 'Прямоугольные и квадратные наклейки' },
      { value: 'stikery-s-nadsechkoj', label: 'Стикеры с надсечкой' },
      { value: 'bolshie-stikery', label: 'Большие стикеры' },
      { value: 'stikerpaki', label: 'Стикерпаки' },
      { value: 'not-sure', label: 'Ещё не решил — нужна консультация' },
    ],
  },
} as const
