import type { ProductContent } from '@/lib/content/products'
import { Container } from '@/components/ui/Container'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { StickerCard } from '@/components/brand/StickerCard'

/**
 * 3–4 инфо-карточки про продукт. Содержимое из ProductContent.infoCards —
 * строго типизированное, тон карточки задаётся в контенте.
 */
export function InfoCards({ content }: { content: ProductContent }) {
  const cols = content.infoCards.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'

  return (
    <section className="border-b border-line bg-bg-surface py-20 md:py-28">
      <Container size="lg">
        <RevealOnScroll>
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-yellow">
              Детали
            </p>
            <h2 className="text-display-lg font-display uppercase leading-tight">
              ЧТО ВАЖНО ЗНАТЬ
            </h2>
          </div>
        </RevealOnScroll>

        <div className={`grid gap-6 md:grid-cols-2 ${cols}`}>
          {content.infoCards.map((card, i) => (
            <RevealOnScroll key={card.id} delay={i * 0.06}>
              <StickerCard
                tone={card.tone}
                hover="lift"
                className="h-full min-h-[220px]"
              >
                <h3 className="text-balance font-display text-xl font-bold uppercase leading-tight">
                  {card.title}
                </h3>
                <p className="text-pretty text-sm opacity-85">{card.body}</p>
              </StickerCard>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  )
}
