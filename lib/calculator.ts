// ─── PRODUCT TYPES ──────────────────────────────────────────────────────────

export type ProductSlug = 'vinyl' | '3d-epoxy' | 'dtf' | 'die-cut' | 'sticker-pack'

export interface ProductSize {
  label: string
  w: number // mm
  h: number
  multiplier: number
}

export interface Product {
  slug: ProductSlug
  name: string
  shortName: string
  desc: string
  longDesc: string
  basePrice: number   // ₽ / шт при тираже 10
  tag: string
  tagColor: 'yellow' | 'red' | 'blue' | 'dark' | 'green'
  bgColor: string
  sizes: ProductSize[]
  minQty: number
  features: string[]
  popular: boolean
}

export interface CalcResult {
  total: number
  perUnit: number
  discountPct: number
  discountAmount: number
  expressExtra: number
  urgentExtra: number
  priceBeforeDiscount: number
}

// ─── PRODUCTS CATALOG ───────────────────────────────────────────────────────

export const PRODUCTS: Product[] = [
  {
    slug: 'vinyl',
    name: 'Виниловые стикеры',
    shortName: 'Виниловые',
    desc: 'Матовые и глянцевые. Водостойкие, не выцветают.',
    longDesc: 'Классика. Печатаем на самоклеящейся виниловой плёнке — матовой или глянцевой. Защитный UV-лак, стойкость к воде, солнцу и механическим воздействиям. Идеальны для брендинга, упаковки, наклеек на авто.',
    basePrice: 19,
    tag: 'Топ продаж',
    tagColor: 'yellow',
    bgColor: '#FFD047',
    sizes: [
      { label: '50×50 мм',   w: 50,  h: 50,  multiplier: 0.6  },
      { label: '70×70 мм',   w: 70,  h: 70,  multiplier: 0.8  },
      { label: '100×100 мм', w: 100, h: 100, multiplier: 1.0  },
      { label: '100×150 мм', w: 100, h: 150, multiplier: 1.3  },
      { label: '150×150 мм', w: 150, h: 150, multiplier: 1.7  },
      { label: '200×200 мм', w: 200, h: 200, multiplier: 2.2  },
      { label: 'Нестандарт', w: 0,   h: 0,   multiplier: 0    },
    ],
    minQty: 10,
    features: ['Матовый или глянцевый финиш', 'УФ-защитный лак', 'Стойкость к воде и солнцу', 'Порезка прямоугольником'],
    popular: true,
  },
  {
    slug: '3d-epoxy',
    name: '3D Эпоксидные',
    shortName: '3D-эпоксид',
    desc: 'Объёмный глянец. WOW-эффект для упаковки и мерча.',
    longDesc: 'Поверх печатного слоя заливаем прозрачный эпоксидный гель — получается выпуклый 3D-купол с насыщенным глянцем. Создают эффект "ожившего" дизайна. Идеальны для брендов, подарков, дорогой упаковки.',
    basePrice: 49,
    tag: 'Премиум',
    tagColor: 'dark',
    bgColor: '#009FE3',
    sizes: [
      { label: '30×30 мм',  w: 30,  h: 30,  multiplier: 0.7 },
      { label: '50×50 мм',  w: 50,  h: 50,  multiplier: 1.0 },
      { label: '70×70 мм',  w: 70,  h: 70,  multiplier: 1.5 },
      { label: '100×100 мм',w: 100, h: 100, multiplier: 2.0 },
    ],
    minQty: 20,
    features: ['3D-купол из эпоксидной смолы', 'Насыщенный глянец', 'WOW-эффект', 'Любая форма основы'],
    popular: false,
  },
  {
    slug: 'dtf',
    name: 'DTF-печать',
    shortName: 'DTF',
    desc: 'Термопереводные плёнки для одежды и текстиля.',
    longDesc: 'Direct-to-Film — современная технология переноса изображения на любые ткани. Яркие цвета, мягкий на ощупь результат, стойкость к стиркам. Отлично подходит для мерча, толстовок, футболок, рюкзаков.',
    basePrice: 35,
    tag: 'Для одежды',
    tagColor: 'red',
    bgColor: '#FF4848',
    sizes: [
      { label: '50×50 мм',   w: 50,  h: 50,  multiplier: 0.7 },
      { label: '100×100 мм', w: 100, h: 100, multiplier: 1.0 },
      { label: '100×150 мм', w: 100, h: 150, multiplier: 1.4 },
      { label: 'А4 фрагмент',w: 210, h: 297, multiplier: 2.8 },
    ],
    minQty: 10,
    features: ['Перенос на любые ткани', 'Стойкость к стиркам 40+', 'Мягкий на ощупь', 'Яркие цвета CMYK'],
    popular: false,
  },
  {
    slug: 'die-cut',
    name: 'Фигурные стикеры',
    shortName: 'Фигурные',
    desc: 'Вырубка по контуру любой сложности.',
    longDesc: 'Вырезаем по любому контуру с точностью до 0.5 мм — логотипы, персонажи, сложные формы. Визуально намного интереснее прямоугольников, притягивают взгляд и запоминаются.',
    basePrice: 28,
    tag: 'Хит',
    tagColor: 'red',
    bgColor: '#282828',
    sizes: [
      { label: 'до 50 мм',    w: 50,  h: 50,  multiplier: 0.8 },
      { label: '50-100 мм',   w: 100, h: 100, multiplier: 1.0 },
      { label: '100-150 мм',  w: 150, h: 150, multiplier: 1.4 },
      { label: '150-200 мм',  w: 200, h: 200, multiplier: 1.9 },
    ],
    minQty: 10,
    features: ['Вырубка по контуру', 'Точность ±0.5 мм', 'Любая сложность формы', 'Мат + глянец + лак'],
    popular: true,
  },
  {
    slug: 'sticker-pack',
    name: 'Стикерпаки',
    shortName: 'Стикерпак',
    desc: 'Готовые наборы стикеров — несколько дизайнов на одном листе.',
    longDesc: 'Разные дизайны или персонажи на одном листе A5/A6. Удобно для мерча, упаковки в подарки, коллабораций. Пакуем в прозрачные файлики с хедером — готово к продаже.',
    basePrice: 89,
    tag: 'Набор',
    tagColor: 'blue',
    bgColor: '#9B59B6',
    sizes: [
      { label: 'A6 (10 шт на листе)',  w: 105, h: 148, multiplier: 1.0 },
      { label: 'A5 (15 шт на листе)',  w: 148, h: 210, multiplier: 1.5 },
      { label: 'A4 (20 шт на листе)',  w: 210, h: 297, multiplier: 2.2 },
    ],
    minQty: 10,
    features: ['Несколько дизайнов', 'Формат A4/A5/A6', 'Упаковка в файлик', 'Готово к продаже'],
    popular: false,
  },
]

// ─── CALCULATOR ─────────────────────────────────────────────────────────────

export type Urgency = 'standard' | 'express' | 'urgent'

export interface CalcInput {
  productSlug: ProductSlug
  qty: number
  sizeIndex: number
  urgency: Urgency
  withDesign: boolean
}

// Volume discount tiers
export const DISCOUNT_TIERS = [
  { minQty: 500, pct: 25, label: '500+' },
  { minQty: 200, pct: 15, label: '200+' },
  { minQty: 100, pct: 10, label: '100+' },
  { minQty: 10,  pct: 0,  label: '10+'  },
]

export const URGENCY_MULTIPLIERS: Record<Urgency, number> = {
  standard: 1.0,
  express:  1.4,   // +40%
  urgent:   1.8,   // +80%
}

export const URGENCY_LABELS: Record<Urgency, string> = {
  standard: 'Стандарт (3–5 дней)',
  express:  'Экспресс (1–2 дня) +40%',
  urgent:   'Сегодня/завтра +80%',
}

export const DESIGN_PRICE = 1500 // ₽ за разработку дизайна

export function calculate(input: CalcInput): CalcResult {
  const product = PRODUCTS.find(p => p.slug === input.productSlug)
  if (!product) throw new Error('Product not found')

  const size = product.sizes[input.sizeIndex]
  if (!size) throw new Error('Size not found')

  const qty = Math.max(product.minQty, input.qty)

  // Base price per unit
  const basePerUnit = product.basePrice * (size.multiplier || 1)

  // Urgency multiplier
  const urgencyK = URGENCY_MULTIPLIERS[input.urgency]

  // Price before volume discount
  const priceBeforeDiscount = basePerUnit * urgencyK * qty

  // Volume discount
  const tier = DISCOUNT_TIERS.find(t => qty >= t.minQty) ?? DISCOUNT_TIERS[DISCOUNT_TIERS.length - 1]
  const discountPct = tier.pct
  const discountAmount = Math.round(priceBeforeDiscount * discountPct / 100)

  // Express/urgent surcharge (for display)
  const standardTotal = basePerUnit * qty * (1 - discountPct / 100)
  const expressExtra = input.urgency !== 'standard'
    ? Math.round(standardTotal * (urgencyK - 1))
    : 0

  // Design cost
  const designCost = input.withDesign ? DESIGN_PRICE : 0

  const total = Math.round(priceBeforeDiscount - discountAmount + designCost)
  const perUnit = Math.round(total / qty)

  return {
    total,
    perUnit,
    discountPct,
    discountAmount: Math.round(discountAmount),
    expressExtra,
    urgentExtra: 0,
    priceBeforeDiscount: Math.round(priceBeforeDiscount),
  }
}

export function formatPrice(n: number): string {
  return new Intl.NumberFormat('ru-RU').format(n) + ' ₽'
}
