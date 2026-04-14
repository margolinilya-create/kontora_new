import type { ProductSlug } from '@/lib/routes'
import type { ProductContent } from './types'

import { productKontur } from './stikery-s-konturnoj-rezkoj'
import { product3dStikerpaki } from './3d-stikerpaki'
import { product3dStikery } from './3d-stikery'
import { productRect } from './pryamougolnye-i-kvadratnye'
import { productNotch } from './stikery-s-nadsechkoj'
import { productBig } from './bolshie-stikery'
import { productStikerpaki } from './stikerpaki'

/**
 * Реестр всех продуктовых страниц. Используется в
 * `generateStaticParams` и `getProductBySlug`.
 */
export const productsContent = {
  'stikery-s-konturnoj-rezkoj': productKontur,
  '3d-stikerpaki': product3dStikerpaki,
  '3d-stikery': product3dStikery,
  'pryamougolnye-i-kvadratnye': productRect,
  'stikery-s-nadsechkoj': productNotch,
  'bolshie-stikery': productBig,
  'stikerpaki': productStikerpaki,
} as const satisfies Record<ProductSlug, ProductContent>

export function getProductBySlug(slug: ProductSlug): ProductContent {
  return productsContent[slug]
}

export type { ProductContent }
