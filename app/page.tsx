import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { buildMetadata } from '@/lib/seo/metadata'
import { routes } from '@/lib/routes'
import { Container } from '@/components/ui/Container'
import { StickerButton } from '@/components/brand/StickerButton'
import { YellowMarker } from '@/components/brand/YellowMarker'

export const metadata: Metadata = buildMetadata(routes.home)

export const dynamic = 'force-static'
export const revalidate = false

/**
 * Главная — M1 заглушка. Полная вёрстка 7 блоков (Hero, CatalogGrid,
 * QuickOrder, ManagerRequest, Materials, Audience, Advantages) придёт в M2.
 * Сейчас рендерим сырой Hero чтобы можно было проверить токены и layout
 * вживую в dev-сервере.
 */
export default function HomePage() {
  return (
    <div className="noise-overlay relative">
      <Container as="section" size="lg" className="relative z-10 py-24 md:py-32 lg:py-40">
        <p className="mb-6 font-mono text-xs uppercase tracking-widest text-yellow">
          Kontora · Frontend M1 · Scaffold ready
        </p>
        <h1 className="text-display-xl font-display uppercase leading-none tracking-tight">
          С НАМИ <YellowMarker>ВСЁ</YellowMarker>
          <br />
          КЛЕИТСЯ!
        </h1>
        <p className="mt-8 max-w-xl text-pretty text-lg text-cream/70">
          Производим виниловые наклейки и стикерпаки. От этикеток и 3D стикеров до
          широкоформатных наклеек.
        </p>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <StickerButton href="/bystryj-zakaz" size="lg" tone="yellow">
            Рассчитать стоимость
            <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
          </StickerButton>
          <StickerButton href="/dev/kitchen-sink" size="lg" tone="cream">
            Kitchen Sink (dev)
          </StickerButton>
        </div>
      </Container>
    </div>
  )
}
