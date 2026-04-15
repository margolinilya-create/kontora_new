/**
 * Структура header/footer навигации. Источник — reference site
 * kontora.futuguru.com (M9 audit, /tmp/ref-audit/home.html).
 *
 * Header: 7 пунктов — Главная / Продукция / Стоимость / Тех. требования /
 * Заказать дизайн / о нас / Контакты. CTA «БЫСТРЫЙ ЗАКАЗ» ведёт на якорь
 * калькулятора на главной.
 *
 * Footer: 3 колонки — СТИКЕРЫ / ПОЛЕЗНОЕ / МАТЕРИАЛЫ (раньше было 4).
 *
 * Контакты — реальные данные из footer референса:
 *   Санкт-Петербург, наб. Обводного канала, 24д
 *   +7 (999) 041-31-08 · info@kontora.su
 *   t.me/kontora3d · wa.me/79990413108 · instagram.com/kontora3d
 */

export type NavLink = {
  readonly label: string
  readonly href: string
  readonly external?: boolean
}

export type NavColumn = {
  readonly title: string
  readonly links: readonly NavLink[]
}

export const headerNav: readonly NavLink[] = [
  { label: 'Главная', href: '/' },
  { label: 'Продукция', href: '/catalog/stikery-s-konturnoj-rezkoj' },
  { label: 'Стоимость', href: '/#order' },
  { label: 'Тех. требования', href: '/kak-podgotovit-maket' },
  { label: 'Заказать дизайн', href: '/kak-podgotovit-maket#design-v-kontore' },
  { label: 'О нас', href: '/blog' },
  { label: 'Контакты', href: '/kontakty' },
] as const

export const headerCta: NavLink = {
  label: 'Быстрый заказ',
  href: '/#order',
} as const

export const footerColumns: readonly NavColumn[] = [
  {
    title: 'Стикеры',
    links: [
      { label: 'Стикеры с контурной резкой', href: '/catalog/stikery-s-konturnoj-rezkoj' },
      { label: '3D стикеры', href: '/catalog/3d-stikery' },
      { label: '3D стикерпаки', href: '/catalog/3d-stikerpaki' },
      { label: 'Стикерпаки', href: '/catalog/stikerpaki' },
      { label: 'Стикеры с надсечкой', href: '/catalog/stikery-s-nadsechkoj' },
      { label: 'Большие стикеры', href: '/catalog/bolshie-stikery' },
      { label: 'Прямоугольные и квадратные', href: '/catalog/pryamougolnye-i-kvadratnye' },
    ],
  },
  {
    title: 'Полезное',
    links: [
      { label: 'Быстрый заказ', href: '/#order' },
      { label: 'Как подготовить макет', href: '/kak-podgotovit-maket' },
      { label: 'О нас', href: '/blog' },
      { label: 'Контакты', href: '/kontakty' },
    ],
  },
  {
    title: 'Материалы',
    links: [
      { label: 'Прозрачная плёнка', href: '/catalog/stikerpaki' },
      { label: 'Матовая ламинация', href: '/catalog/stikery-s-konturnoj-rezkoj' },
      { label: 'Глянцевая ламинация', href: '/catalog/stikery-s-konturnoj-rezkoj' },
      { label: 'Голографическая плёнка', href: '/catalog/stikery-s-konturnoj-rezkoj' },
    ],
  },
] as const

export const footerLegal: readonly NavLink[] = [
  { label: 'Политика конфиденциальности', href: '/privacy' },
  { label: 'Cookies', href: '/cookies' },
  { label: 'Согласие на обработку ПД', href: '/soglasie' },
] as const

export const footerContacts = {
  city: 'Санкт-Петербург',
  address: 'наб. Обводного канала, 24д',
  phone: '+7 (999) 041-31-08',
  phoneHref: 'tel:+79990413108',
  email: 'info@kontora.su',
  emailHref: 'mailto:info@kontora.su',
  telegram: 't.me/kontora3d',
  telegramHref: 'https://t.me/kontora3d',
  whatsapp: 'WhatsApp',
  whatsappHref: 'https://wa.me/79990413108',
  instagram: 'instagram.com/kontora3d',
  instagramHref: 'https://instagram.com/kontora3d',
  hours: 'Пн–Пт · 10:00–18:00',
  copyright: '© 2025 Kontora · Все права защищены',
} as const
