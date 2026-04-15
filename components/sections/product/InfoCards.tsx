import type { ProductContent } from '@/lib/content/products'
import { Container } from '@/components/ui/Container'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { StickerCard } from '@/components/brand/StickerCard'

/**
 * Инфо-карточки «Почему выбирают» / «Где используют» / «Как отличить»
 * и т.п. Контент из ProductContent.infoCards: либо короткий `body`
 * (1–2 предложения), либо `bullets` (список из референса),
 * либо оба — тогда `body` рендерится как вступительная строка.
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
              <StickerCard tone={card.tone} hover="lift" className="h-full min-h-[220px]">
                <h3 className="text-balance font-display text-xl font-bold uppercase leading-tight">
                  {card.title}
                </h3>
                {card.body ? (
                  <p className="text-pretty text-sm opacity-85">{card.body}</p>
                ) : null}
                {card.bullets && card.bullets.length > 0 ? (
                  <ul className="mt-2 flex flex-col gap-1.5 text-pretty text-sm opacity-90">
                    {card.bullets.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span aria-hidden="true" className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </StickerCard>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  )
}
