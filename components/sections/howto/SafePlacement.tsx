import { howto } from '@/lib/content/howto'
import { Container } from '@/components/ui/Container'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

/**
 * Блок §3.5: «ВАРИАНТЫ БЕЗОПАСНОГО РАЗМЕЩЕНИЯ». Две карточки
 * «чёрная наклейка» и «белая наклейка».
 */
export function SafePlacement() {
  return (
    <section className="border-b border-line bg-dark py-20">
      <Container size="md">
        <RevealOnScroll>
          <p className="font-mono text-xs uppercase tracking-widest text-yellow">Шаг 4</p>
          <h2 className="mt-3 text-display-lg font-display uppercase leading-tight">
            {howto.safePlacement.title}
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-cream/70">{howto.safePlacement.body}</p>
        </RevealOnScroll>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <RevealOnScroll delay={0.05}>
            <div className="relative rounded-xl border-2 border-dark bg-dark-2 p-6 shadow-sticker">
              <span className="mb-4 inline-flex rounded-full bg-dark-3 px-3 py-1 font-mono text-xs uppercase tracking-widest text-cream/60">
                Чёрная наклейка
              </span>
              <div className="relative flex aspect-[4/3] items-center justify-center rounded-md border-2 border-line bg-cream">
                <div className="h-20 w-20 rounded-md border-2 border-dark bg-dark" />
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div className="relative rounded-xl border-2 border-dark bg-dark-2 p-6 shadow-sticker">
              <span className="mb-4 inline-flex rounded-full bg-dark-3 px-3 py-1 font-mono text-xs uppercase tracking-widest text-cream/60">
                Белая наклейка
              </span>
              <div className="relative flex aspect-[4/3] items-center justify-center rounded-md border-2 border-line bg-dark">
                <div className="h-20 w-20 rounded-md border-2 border-dark bg-cream" />
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  )
}
