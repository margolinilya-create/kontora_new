import { home } from '@/lib/content/home'
import { Container } from '@/components/ui/Container'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { ProductCard } from '@/components/brand/ProductCard'
import { productRoute } from '@/lib/routes'

/**
 * Секция «Выбирай, что клеится тебе» — 6 карточек 2×3 на desktop,
 * 1 колонка на mobile. Данные из lib/content/home.ts §1.2 PDF.
 */
export function CatalogGrid() {
  return (
    <section id="catalog" className="border-b border-line bg-dark-2 py-20 md:py-28">
      <Container size="lg">
        <RevealOnScroll>
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-yellow">
                {home.catalog.eyebrow}
              </p>
              <h2 className="text-display-lg font-display uppercase leading-tight">
                {home.catalog.title}
              </h2>
            </div>
            <p className="max-w-md text-pretty text-cream/70">{home.catalog.subtitle}</p>
          </div>
        </RevealOnScroll>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {home.catalog.cards.map((card, i) => (
            <RevealOnScroll key={card.slug} delay={i * 0.05}>
              <ProductCard
                href={productRoute(card.slug)}
                label={card.label}
                title={card.title}
                description={card.description}
              />
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  )
}
