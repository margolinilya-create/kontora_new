import type { HomeContent } from './types'

/**
 * Главная. Источник — PDF «Контора нью» §1 (Hero, Каталог, Быстрый заказ,
 * Запрос менеджера, Материалы, Кому подойдут, Почему выбирают).
 *
 * Примечание из PDF: слово «виниловые» выделено жёлтым маркером,
 * «широкоформатных» — подчёркиванием.
 */
export const home: HomeContent = {
  hero: {
    eyebrow: 'Мануфактура · Санкт-Петербург',
    titleLines: [
      [{ kind: 'text', value: 'С НАМИ' }],
      [
        { kind: 'marker', value: 'ВСЁ' },
        { kind: 'text', value: ' ' },
      ],
      [{ kind: 'text', value: 'КЛЕИТСЯ!' }],
    ],
    subtitle: [
      { kind: 'text', value: 'Производим ' },
      { kind: 'marker', value: 'виниловые' },
      { kind: 'text', value: ' наклейки и стикерпаки. От этикеток и 3D стикеров до ' },
      { kind: 'underline', value: 'широкоформатных' },
      { kind: 'text', value: ' наклеек.' },
    ],
    primaryCta: { label: 'Рассчитать стоимость', href: '/bystryj-zakaz' },
    secondaryCta: { label: 'Каталог продукции', href: '#catalog' },
  },

  catalog: {
    eyebrow: '6 категорий',
    title: 'ВЫБИРАЙ, ЧТО КЛЕИТСЯ ТЕБЕ',
    subtitle:
      'Формы, размеры, текстуры — у нас есть стикер на любой случай. От блеска 3D до дерзости винила.',
    cards: [
      {
        slug: 'stikery-s-konturnoj-rezkoj',
        label: '01',
        title: 'СТИКЕРЫ С КОНТУРНОЙ РЕЗКОЙ',
        description:
          'Любой формы и любого дизайна — вырежем по контуру изображения, получится идеальный стикер.',
        iconSrc: '/brand/types/fifthtype.png',
      },
      {
        slug: 'pryamougolnye-i-kvadratnye',
        label: '02',
        title: 'ПРЯМОУГОЛЬНЫЕ И КВАДРАТНЫЕ НАКЛЕЙКИ',
        description: 'Идеальны для бутылок, упаковки и маркировки вашей продукции.',
        iconSrc: '/brand/types/fourthtype.png',
      },
      {
        slug: 'stikery-s-nadsechkoj',
        label: '03',
        title: 'СТИКЕРЫ С НАДСЕЧКОЙ',
        description:
          'Идеальны для мерча и упаковки. Маркетплейсы и оптовые заказы — снимай с листа и клей.',
        iconSrc: '/brand/types/thirdtype.png',
      },
      {
        slug: 'bolshie-stikery',
        label: '04',
        title: 'БОЛЬШИЕ СТИКЕРЫ',
        description: 'Любые размеры и формы. Для тех, кому нужно занять собой всё пространство.',
        iconSrc: '/brand/types/secondtype.png',
      },
      {
        slug: '3d-stikerpaki',
        label: '05',
        title: '3D СТИКЕРПАКИ',
        description: 'Стикерпаки с объёмным эффектом или блёском в прозрачную зону.',
        iconSrc: '/brand/types/firsttype.png',
      },
      {
        slug: 'stikerpaki',
        label: '06',
        title: 'СТИКЕРПАК',
        description:
          'На матовом, глянцевом, прозрачном, голографическом или флуоресцентном материале. С матовой / глянцевой ламинацией.',
        iconSrc: '/brand/types/fifthtype.png',
      },
    ],
  },

  quickOrder: {
    eyebrow: 'Калькулятор · 60 секунд',
    title: 'БЫСТРЫЙ ЗАКАЗ',
    subtitle: 'Рассчитаем предварительную стоимость и подберём по срокам производства.',
    cta: { label: 'Открыть калькулятор', href: '/bystryj-zakaz' },
  },

  managerRequest: {
    eyebrow: 'Для крупных тиражей',
    title: 'ЗАПРОС ДЛЯ МЕНЕДЖЕРА',
    subtitle: 'Заполните анкету, чтобы наш менеджер связался с вами для уточнения деталей заказа.',
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
