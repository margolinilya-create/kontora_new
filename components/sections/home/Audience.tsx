import { audience } from '@/lib/content/audience'
import { Container } from '@/components/ui/Container'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { StickerCard } from '@/components/brand/StickerCard'

/**
 * Секция «Кому подойдут наши наклейки» — 4 карточки-стикера с наклоном.
 * Источник: PDF §1.6. Двойная ЦА (B2B + B2C) — карточки сегментируют
 * аудиторию, каждая с собственным тоном.
 */
export function Audience() {
  return (
    <section className="border-b border-line bg-dark-2 py-20 md:py-28">
      <Container size="lg">
        <RevealOnScroll>
          <div className="mb-14 max-w-2xl">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-yellow">
              {audience.eyebrow}
            </p>
            <h2 className="text-display-lg font-display uppercase leading-tight">
              {audience.title}
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          {audience.cards.map((card, i) => (
            <RevealOnScroll key={card.id} delay={i * 0.08}>
              <StickerCard tone={card.tone} tilt={card.tilt} hover="lift" className="h-full min-h-[220px]">
                <h3 className="font-display text-xl font-bold uppercase leading-tight md:text-2xl">
                  {card.title}
                </h3>
                <p className="text-pretty text-sm opacity-85 md:text-base">{card.body}</p>
              </StickerCard>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  )
}
