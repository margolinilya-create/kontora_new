import { howto } from '@/lib/content/howto'
import { Container } from '@/components/ui/Container'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

/**
 * Блок §3.5: «ВАРИАНТЫ БЕЗОПАСНОГО РАЗМЕЩЕНИЯ». Две карточки
 * «чёрная наклейка» и «белая наклейка».
 */
export function SafePlacement() {
  return (
    <section className="border-b border-line bg-bg-base py-20">
      <Container size="md">
        <RevealOnScroll>
          <p className="font-mono text-xs uppercase tracking-widest text-yellow">Шаг 4</p>
          <h2 className="mt-3 text-display-lg font-display uppercase leading-tight">
            {howto.safePlacement.title}
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-cream-soft">{howto.safePlacement.body}</p>
        </RevealOnScroll>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <RevealOnScroll delay={0.05}>
            <div className="relative rounded-xl  bg-bg-surface p-6 ">
              <span className="mb-4 inline-flex rounded-full bg-bg-surface-2 px-3 py-1 font-mono text-xs uppercase tracking-widest text-cream-muted">
                Чёрная наклейка
              </span>
              <div className="relative flex aspect-[4/3] items-center justify-center rounded-md border-2 border-line bg-cream">
                <div className="h-20 w-20 rounded-md  bg-bg-base" />
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div className="relative rounded-xl  bg-bg-surface p-6 ">
              <span className="mb-4 inline-flex rounded-full bg-bg-surface-2 px-3 py-1 font-mono text-xs uppercase tracking-widest text-cream-muted">
                Белая наклейка
              </span>
              <div className="relative flex aspect-[4/3] items-center justify-center rounded-md border-2 border-line bg-bg-base">
                <div className="h-20 w-20 rounded-md  bg-cream" />
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  )
}
