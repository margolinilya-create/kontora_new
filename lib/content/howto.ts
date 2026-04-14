/**
 * Страница «Как подготовить макет к печати». Источник — PDF §3.1–§3.8.
 * Тексты дословные. Блок 3.2 в PDF только заголовок, тело помечено
 * как UX-дополнение в pdf-extract.txt.
 */

export type HowtoBullet = {
  readonly id: string
  readonly text: string
}

export type HowtoBlock = {
  readonly id: string
  readonly title: string
  readonly body?: string
  readonly bullets?: readonly HowtoBullet[]
}

export const howto = {
  hero: {
    eyebrow: 'Подготовка к печати',
    title: 'КАК ПОДГОТОВИТЬ МАКЕТ К ПЕЧАТИ',
    subtitle:
      'Или что сделать, чтобы не пришлось переделывать макет и платить в два раза больше.',
    ctaPrimary: { label: 'Отправить файл', href: '/#manager-request' },
    ctaSecondary: { label: 'Заказать дизайн', href: '#design-v-kontore' },
    editors: ['Photoshop', 'Illustrator', 'InDesign'],
  },

  documentSetup: {
    id: 'document-setup',
    title: 'СОЗДАНИЕ ДОКУМЕНТА В ГРАФИЧЕСКОМ РЕДАКТОРЕ',
    body:
      'Стартуйте с нового документа в выбранном редакторе: задайте точные размеры стикера в миллиметрах, цветовое пространство CMYK и разрешение не меньше 300 dpi. Это основа, на которой строится качество печати.',
  } as const satisfies HowtoBlock,

  requirements: {
    id: 'requirements',
    title: 'ТРЕБОВАНИЯ, ПРЕДЪЯВЛЯЕМЫЕ К ФАЙЛАМ ДЛЯ ЛЮБЫХ ТИПОВ ЗАКАЗОВ',
    bullets: [
      {
        id: 'formats',
        text:
          'Сохраняйте файлы в формате PDF, AI или EPS (в кривых, без слоёв). Которые поддерживают векторные редакторы: Illustrator, Photoshop, InDesign.',
      },
      {
        id: 'dpi',
        text:
          'Разрешение — не меньше 300 dpi. Цветовое пространство — CMYK. Не используйте RGB или Pantone без согласования.',
      },
      { id: 'bleeds', text: 'Вылеты: добавьте 1–3 мм на сторону за контур резки.' },
    ],
  } as const satisfies HowtoBlock,

  layoutRules: {
    id: 'layout-rules',
    title: 'МАКЕТ: масштаб 1:1, размеры в мм',
    body: 'Подпись: <TD — контур резки.',
  } as const satisfies HowtoBlock,

  safePlacement: {
    id: 'safe-placement',
    title: 'ВАРИАНТЫ БЕЗОПАСНОГО РАЗМЕЩЕНИЯ',
    body:
      'Моноколор наклейка, например, чёрная или белая — варианты размещения на листе или в рулоне.',
    examples: [
      { id: 'black', label: 'Чёрная наклейка' },
      { id: 'white', label: 'Белая наклейка' },
    ],
  },

  stickerpackRules: {
    id: 'stickerpack-rules',
    title: 'ДЛЯ СОЗДАНИЯ СТИКЕРПАКА',
    bullets: [
      {
        id: 'max15',
        text: 'Расположите не больше 15 стикеров на одном листе. При создании макета в масштабе 1:1.',
      },
      { id: 'margin', text: 'Отступ от края стикерпака до вашего стикера: не меньше 5 мм.' },
      { id: 'multi', text: 'На листе может быть несколько разных дизайнов.' },
      { id: 'assemble', text: 'Если в вас есть только отдельные стикеры, мы соберём пак за вас.' },
      { id: 'single-file', text: 'Сохраняйте итоговый шаблон в одном файле, не разделяя слои.' },
    ],
  } as const satisfies HowtoBlock,

  resinRules: {
    id: 'resin-rules',
    title: 'ТРЕБОВАНИЯ, ПРЕДЪЯВЛЯЕМЫЕ К ФАЙЛАМ ПОД 3D СМОЛУ',
    bullets: [
      {
        id: 'base',
        text:
          'Основные требования совпадают с общими: вектор, CMYK, 300 dpi, вылеты 1–3 мм. И поддерживаемые форматы: PDF, AI, EPS.',
      },
      {
        id: 'extra-bleed',
        text:
          'Дополнительно: закладывайте отступ от края смолы, так как смола немного растекается при заливке.',
      },
    ],
  } as const satisfies HowtoBlock,

  designInKontora: {
    id: 'design-v-kontore',
    title: 'ДИЗАЙН В КОНТОРЕ',
    subtitle: 'Нет макета? Не проблема — нарисуем сами.',
    cta: { label: 'Заказать дизайн', href: '/#manager-request' },
  },
} as const
