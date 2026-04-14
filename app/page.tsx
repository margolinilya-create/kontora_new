import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'
import { routes } from '@/lib/routes'
import { breadcrumbListJsonLd, jsonLdScript } from '@/lib/seo/jsonld'
import { Hero } from '@/components/sections/home/Hero'
import { CatalogGrid } from '@/components/sections/home/CatalogGrid'
import { QuickOrderEmbed } from '@/components/sections/home/QuickOrderEmbed'
import { ManagerRequest } from '@/components/sections/home/ManagerRequest'
import { Materials } from '@/components/sections/home/Materials'
import { Audience } from '@/components/sections/home/Audience'
import { Advantages } from '@/components/sections/home/Advantages'

export const metadata: Metadata = buildMetadata(routes.home)

export const dynamic = 'force-static'
export const revalidate = false

/**
 * Главная страница. Структура строго из PDF «Контора нью» §1:
 *   1.1 Hero
 *   1.2 Каталог продукции
 *   1.3 Быстрый заказ (калькулятор embed shell)
 *   1.4 Запрос для менеджера
 *   1.5 Материалы
 *   1.6 Кому подойдут наши наклейки
 *   1.7 Почему выбирают нас
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
      <QuickOrderEmbed />
      <ManagerRequest />
      <Materials />
      <Audience />
      <Advantages />
    </>
  )
}
