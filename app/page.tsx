import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'
import { routes } from '@/lib/routes'

export const metadata: Metadata = buildMetadata(routes.home)

export const dynamic = 'force-static'
export const revalidate = false

/**
 * Главная страница — M0 заглушка. Полная вёрстка секций (Hero, Catalog,
 * QuickOrder, ManagerRequest, Materials, Audience, Advantages) — в M2.
 */
export default function HomePage() {
  return (
    <main className="noise-overlay relative flex min-h-dvh items-center justify-center px-6 py-24">
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-yellow">
          Kontora · M0 scaffold
        </p>
        <h1 className="text-display-xl font-display text-cream">
          С НАМИ ВСЁ <span className="text-yellow">КЛЕИТСЯ!</span>
        </h1>
        <p className="mt-6 max-w-xl text-balance font-body text-lg text-cream/70">
          Скелет собран. Токены, шрифты, SEO-фабрики и слои архитектуры готовы.
          Полноценная главная страница появится в M2.
        </p>
        <div className="mt-10 inline-block rounded-md border-2 border-dark bg-yellow px-6 py-3 font-display text-lg font-bold text-yellow-ink shadow-sticker transition-transform hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-sticker-lg">
          M0 SCAFFOLD OK
        </div>
      </div>
    </main>
  )
}
