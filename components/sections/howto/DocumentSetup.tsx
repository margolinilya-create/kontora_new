import { howto } from '@/lib/content/howto'
import { Container } from '@/components/ui/Container'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

/**
 * Блок §3.2: «СОЗДАНИЕ ДОКУМЕНТА В ГРАФИЧЕСКОМ РЕДАКТОРЕ».
 */
export function DocumentSetup() {
  return (
    <section className="border-b border-line bg-bg-surface py-20">
      <Container size="md">
        <RevealOnScroll>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-yellow">Шаг 1</p>
              <h2 className="mt-3 text-display-lg font-display uppercase leading-tight">
                {howto.documentSetup.title}
              </h2>
            </div>
            <p className="text-pretty text-lg leading-relaxed text-cream-soft">
              {howto.documentSetup.body}
            </p>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  )
}
