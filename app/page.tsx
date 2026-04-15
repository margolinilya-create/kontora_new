import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'
import { routes } from '@/lib/routes'
import { breadcrumbListJsonLd, jsonLdScript } from '@/lib/seo/jsonld'
import { Hero } from '@/components/sections/home/Hero'
import { CatalogGrid } from '@/components/sections/home/CatalogGrid'
import { QuickOrderWidget } from '@/components/sections/home/QuickOrderWidget'
import { Materials } from '@/components/sections/home/Materials'
import { Audience } from '@/components/sections/home/Audience'
import { Advantages } from '@/components/sections/home/Advantages'

export const metadata: Metadata = buildMetadata(routes.home)

export const dynamic = 'force-static'
export const revalidate = false

/**
 * Главная. Порядок секций сверен с kontora.futuguru.com (M9 reference):
 *   1. Hero (centered + 3D traffic light)
 *   2. CatalogGrid (7 категорий)
 *   3. QuickOrderWidget (inline калькулятор, #order якорь)
 *   4. Materials (swatches)
 *   5. Audience (4 карточки)
 *   6. Advantages (5 преимуществ)
 *
 * ManagerRequest убрана — на референсе отдельной формы нет, её функцию
 * выполняет встроенный калькулятор (#order) + CTA «Оформить заказ».
 */
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbListJsonLd([{ name: 'Главная', path: '/' }]),
        )}
      />
      <Hero />
      <CatalogGrid />
      <QuickOrderWidget />
      <Materials />
      <Audience />
      <Advantages />
    </>
  )
}
