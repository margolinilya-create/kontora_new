import { audience } from '@/lib/content/audience'
import { Container } from '@/components/ui/Container'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { StickerCard } from '@/components/brand/StickerCard'

/**
 * Секция «Кому подойдут наши наклейки» — 4 soft-floating карточки
 * в multi-accent палитре. Источник: PDF §1.6. Двойная ЦА (B2B + B2C).
 */
export function Audience() {
  return (
    <section className="border-b border-line bg-bg-base py-20 md:py-28">
      <Container size="lg">
        <RevealOnScroll>
          <div className="mb-14 max-w-2xl">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-yellow">
              {audience.eyebrow}
            </p>
            <h2 className="text-display-lg font-display">{audience.title}</h2>
          </div>
        </RevealOnScroll>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
          {audience.cards.map((card, i) => (
            <RevealOnScroll key={card.id} delay={i * 0.08}>
              <StickerCard tone={card.tone} hover="lift" className="h-full min-h-[240px]">
                <h3 className="font-display text-xl font-bold leading-tight md:text-2xl">
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
