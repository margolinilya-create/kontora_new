import { blog } from '@/lib/content/blog'
import { Container } from '@/components/ui/Container'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { StickerCard } from '@/components/brand/StickerCard'

/**
 * Блок §4.3: «Кому подойдут наши наклейки» (blog-версия, другая
 * формулировка чем на главной).
 */
export function AudienceBlog() {
  return (
    <section className="border-b border-line bg-dark py-20 md:py-28">
      <Container size="lg">
        <RevealOnScroll>
          <div className="mb-14 max-w-2xl">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-yellow">
              {blog.audience.eyebrow}
            </p>
            <h2 className="text-display-lg font-display uppercase leading-tight">
              {blog.audience.title}
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          {blog.audience.cards.map((card, i) => (
            <RevealOnScroll key={card.id} delay={i * 0.08}>
              <StickerCard
                tone={card.tone}
                tilt={card.tilt}
                hover="lift"
                className="h-full min-h-[220px]"
              >
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
