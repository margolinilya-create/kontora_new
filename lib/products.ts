import type { ProductSlug } from '@/lib/routes'

/**
 * Реестр продуктов — slug → display label. Полные контентные объекты
 * ProductContent живут в `lib/content/products/*` (M3).
 *
 * Используется в breadcrumbs, sitemap, select в формах.
 */
export type ProductMeta = {
  readonly slug: ProductSlug
  readonly label: string
  readonly shortLabel: string
}

export const products: readonly ProductMeta[] = [
  { slug: 'stikery-s-konturnoj-rezkoj', label: 'Стикеры с контурной резкой', shortLabel: 'Контурная резка' },
  { slug: '3d-stikerpaki', label: '3D стикерпаки', shortLabel: '3D стикерпаки' },
  { slug: '3d-stikery', label: '3D стикеры', shortLabel: '3D стикеры' },
  { slug: 'pryamougolnye-i-kvadratnye', label: 'Прямоугольные и квадратные наклейки', shortLabel: 'Прямоугольные' },
  { slug: 'stikery-s-nadsechkoj', label: 'Стикеры с надсечкой', shortLabel: 'С надсечкой' },
  { slug: 'bolshie-stikery', label: 'Большие стикеры', shortLabel: 'Большие' },
  { slug: 'stikerpaki', label: 'Стикерпаки', shortLabel: 'Стикерпаки' },
] as const
