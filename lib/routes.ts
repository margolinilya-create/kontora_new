/**
 * Единый реестр маршрутов сайта.
 * Source of truth для:
 *   - `app/sitemap.ts`
 *   - `app/robots.ts`
 *   - `components/sections/shared/Header.tsx`
 *   - `components/sections/shared/Footer.tsx`
 *   - breadcrumbs (BreadcrumbList JSON-LD)
 *   - `generateMetadata` через `lib/seo/metadata.ts`
 *
 * Никаких хардкодов URL-ов в компонентах — только через этот реестр.
 */

export type NavGroup = 'header' | 'footer-products' | 'footer-useful' | 'footer-materials' | 'legal' | 'none'

export type RouteChangeFreq = 'daily' | 'weekly' | 'monthly' | 'yearly'

export type RouteEntry = {
  readonly path: string
  readonly title: string
  readonly description: string
  readonly navGroup: NavGroup
  readonly navLabel?: string
  readonly priority: number
  readonly changefreq: RouteChangeFreq
  readonly hasFaq?: boolean
  readonly isProduct?: boolean
}

export const siteUrl = 'https://kontora.su'
export const siteName = 'Контора'
export const siteLocale = 'ru_RU'
export const siteLang = 'ru'

/**
 * Продуктовые slugs — источник правды для `generateStaticParams`.
 * Порядок определяет отображение в футере и sitemap priority.
 */
export const productSlugs = [
  'stikery-s-konturnoj-rezkoj',
  '3d-stikerpaki',
  '3d-stikery',
  'pryamougolnye-i-kvadratnye',
  'stikery-s-nadsechkoj',
  'bolshie-stikery',
  'stikerpaki',
] as const

export type ProductSlug = (typeof productSlugs)[number]

export const routes = {
  home: {
    path: '/',
    title: 'Контора — виниловые наклейки и стикерпаки из Санкт-Петербурга',
    description:
      'Производим виниловые наклейки и стикерпаки. От этикеток и 3D стикеров до широкоформатных наклеек. Собственное производство, итальянские материалы.',
    navGroup: 'header',
    navLabel: 'Главная',
    priority: 1.0,
    changefreq: 'weekly',
  },
  bystryjZakaz: {
    path: '/bystryj-zakaz',
    title: 'Быстрый заказ — калькулятор стоимости',
    description:
      'Рассчитайте предварительную стоимость тиража стикеров и узнайте сроки производства за 60 секунд.',
    navGroup: 'header',
    navLabel: 'Быстрый заказ',
    priority: 0.8,
    changefreq: 'weekly',
  },
  kakPodgotovitMaket: {
    path: '/kak-podgotovit-maket',
    title: 'Как подготовить макет к печати',
    description:
      'Требования к файлам, вылеты, 3D-смола, размещение на листе. Всё, что нужно знать перед печатью стикеров.',
    navGroup: 'header',
    navLabel: 'Как подготовить макет',
    priority: 0.7,
    changefreq: 'monthly',
    hasFaq: true,
  },
  blog: {
    path: '/blog',
    title: 'Тут шарят за стикеры и наклейки',
    description:
      'Блог мануфактуры «Контора». О компании, о производстве, о том, кому подойдут виниловые наклейки.',
    navGroup: 'header',
    navLabel: 'О нас',
    priority: 0.6,
    changefreq: 'weekly',
  },
  kontakty: {
    path: '/kontakty',
    title: 'Контакты',
    description: 'Санкт-Петербург, ул. Набережная канала Грибоедова, 126. Телефоны и почта «Конторы».',
    navGroup: 'header',
    navLabel: 'Контакты',
    priority: 0.5,
    changefreq: 'yearly',
  },
  oNas: {
    path: '/o-nas',
    title: 'О нас — мануфактура «Контора»',
    description:
      'Собственное производство виниловых изделий в Санкт-Петербурге. Итальянские материалы, опыт работы с брендами и агентствами.',
    navGroup: 'none',
    priority: 0.5,
    changefreq: 'monthly',
  },
  privacy: {
    path: '/privacy',
    title: 'Политика конфиденциальности',
    description: 'Политика обработки персональных данных согласно 152-ФЗ.',
    navGroup: 'legal',
    navLabel: 'Политика конфиденциальности',
    priority: 0.3,
    changefreq: 'yearly',
  },
  cookies: {
    path: '/cookies',
    title: 'Cookies',
    description: 'Как «Контора» использует cookies и аналогичные технологии.',
    navGroup: 'legal',
    navLabel: 'Cookies',
    priority: 0.3,
    changefreq: 'yearly',
  },
  soglasie: {
    path: '/soglasie',
    title: 'Согласие на обработку персональных данных',
    description: 'Текст согласия на обработку персональных данных пользователей сайта.',
    navGroup: 'legal',
    navLabel: 'Согласие на ОПД',
    priority: 0.3,
    changefreq: 'yearly',
  },
} as const satisfies Record<string, RouteEntry>

export type StaticRouteKey = keyof typeof routes

/**
 * Все продуктовые роуты производно от `productSlugs`.
 * Используется sitemap и breadcrumbs. Metadata per product формируется
 * в `app/catalog/[slug]/page.tsx` из `lib/content/products/*`.
 */
export function productRoute(slug: ProductSlug) {
  return `/catalog/${slug}` as const
}

/**
 * Весь набор роутов для sitemap.
 */
export function allRoutes(): readonly RouteEntry[] {
  const staticRoutes = Object.values(routes)
  const productRoutes: RouteEntry[] = productSlugs.map((slug) => ({
    path: productRoute(slug),
    title: '', // metadata собирается из lib/content/products/*
    description: '',
    navGroup: 'footer-products',
    priority: 0.9,
    changefreq: 'weekly' as const,
    isProduct: true,
    hasFaq: true,
  }))
  return [...staticRoutes, ...productRoutes]
}
