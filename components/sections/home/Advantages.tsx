import { advantages } from '@/lib/content/advantages'
import { Container } from '@/components/ui/Container'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { AdvantageBar } from '@/components/brand/AdvantageBar'

/**
 * Секция «Почему выбирают нас» — 5 горизонтальных цветных полос 01–05.
 * Источник: PDF §1.7.
 */
export function Advantages() {
  return (
    <section className="bg-dark py-20 md:py-28">
      <Container size="lg">
        <RevealOnScroll>
          <div className="mb-14 max-w-2xl">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-yellow">
              {advantages.eyebrow}
            </p>
            <h2 className="text-display-lg font-display uppercase leading-tight">
              {advantages.title}
            </h2>
          </div>
        </RevealOnScroll>

        <div className="flex flex-col gap-5">
          {advantages.items.map((item, i) => (
            <RevealOnScroll key={item.id} delay={i * 0.06}>
              <AdvantageBar
                tone={item.tone}
                number={item.number}
                title={item.title}
                body={item.body}
              />
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  )
}
