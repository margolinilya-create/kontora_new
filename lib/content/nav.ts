/**
 * Структура header/footer навигации. Источник — PDF «Контора нью» §Общие элементы.
 * Пункты меню: продукция • стикеры • наклейки • как подготовить макет •
 * заказать дизайн • о нас • контакты. Кнопка хедера: БЫСТРЫЙ ЗАКАЗ.
 *
 * Футер: 3 колонки ссылок + контакты.
 *   Колонка 1 — ПРОДУКЦИЯ: 3D Стикеры • 3D Стикерпаки • Стикерпаки •
 *                          Смена частиц • Стикеры с контурной резкой
 *   Колонка 2 — НАКЛЕЙКИ:  Прямоугольные • Рулонные • Большие
 *   Колонка 3 — МАТЕРИАЛЫ: Прозрачная • Воздушная • Матовая • Плёнка
 *
 * Контакты: Санкт-Петербург, ул. Набережная канала Грибоедова, 126
 * Copyright © 2025 Контора
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
  { label: 'Продукция', href: '/catalog/stikery-s-konturnoj-rezkoj' },
  { label: 'Стикеры', href: '/catalog/3d-stikery' },
  { label: 'Наклейки', href: '/catalog/pryamougolnye-i-kvadratnye' },
  { label: 'Как подготовить макет', href: '/kak-podgotovit-maket' },
  { label: 'Заказать дизайн', href: '/kak-podgotovit-maket#design-v-kontore' },
  { label: 'О нас', href: '/blog' },
  { label: 'Контакты', href: '/kontakty' },
] as const

export const headerCta: NavLink = {
  label: 'Быстрый заказ',
  href: '/bystryj-zakaz',
} as const

export const footerColumns: readonly NavColumn[] = [
  {
    title: 'Продукция',
    links: [
      { label: '3D стикеры', href: '/catalog/3d-stikery' },
      { label: '3D стикерпаки', href: '/catalog/3d-stikerpaki' },
      { label: 'Стикерпаки', href: '/catalog/stikerpaki' },
      { label: 'Стикеры с надсечкой', href: '/catalog/stikery-s-nadsechkoj' },
      { label: 'Стикеры с контурной резкой', href: '/catalog/stikery-s-konturnoj-rezkoj' },
    ],
  },
  {
    title: 'Наклейки',
    links: [
      { label: 'Прямоугольные', href: '/catalog/pryamougolnye-i-kvadratnye' },
      { label: 'Рулонные', href: '/catalog/stikery-s-nadsechkoj' },
      { label: 'Большие', href: '/catalog/bolshie-stikery' },
    ],
  },
  {
    title: 'Полезное',
    links: [
      { label: 'Как подготовить макет', href: '/kak-podgotovit-maket' },
      { label: 'Быстрый заказ', href: '/bystryj-zakaz' },
      { label: 'Блог', href: '/blog' },
      { label: 'Контакты', href: '/kontakty' },
    ],
  },
  {
    title: 'Материалы',
    links: [
      { label: 'Прозрачная', href: '/catalog/stikerpaki' },
      { label: 'Воздушная', href: '/catalog/stikerpaki' },
      { label: 'Матовая', href: '/catalog/stikerpaki' },
      { label: 'Плёнка', href: '/catalog/pryamougolnye-i-kvadratnye' },
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
  address: 'ул. Набережная канала Грибоедова, 126',
  copyright: '© 2025 Контора',
} as const
