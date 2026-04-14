import { howto } from '@/lib/content/howto'
import { Container } from '@/components/ui/Container'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

/**
 * Блок §3.4: жёлтая карточка с примером макета. Декоративная, без PDF текста
 * — только заголовок и подпись «<TD — контур резки».
 */
export function LayoutRules() {
  return (
    <section className="border-b border-line bg-bg-surface py-20">
      <Container size="md">
        <RevealOnScroll>
          <div className="relative rounded-xl  bg-yellow p-8 text-yellow-ink shadow-soft-lg md:p-12">
            {/* маркер-ярлычок */}
            <span className="absolute -top-4 left-8 inline-flex items-center gap-2 rounded-md  bg-bg-base px-3 py-1 font-mono text-xs font-bold uppercase text-yellow">
              {'<TD'}
            </span>

            <p className="font-mono text-xs uppercase tracking-widest">Шаг 3</p>
            <h2 className="mt-3 text-display-lg font-display uppercase leading-tight">
              {howto.layoutRules.title}
            </h2>
            <p className="mt-4 text-sm opacity-80">{howto.layoutRules.body}</p>

            {/* визуальный пример макета */}
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="relative aspect-square rounded-md border-2 border-dashed border-ink/50 bg-cream p-4">
                <span className="absolute left-2 top-2 font-mono text-[10px] uppercase tracking-widest text-dark/60">
                  макет
                </span>
                <div className="absolute inset-6 rounded-md  bg-yellow-ink/10" />
                <span className="absolute bottom-2 right-2 font-mono text-[10px] uppercase tracking-widest text-dark/60">
                  +3 мм вылет
                </span>
              </div>
              <div className="relative aspect-square rounded-md border-2 border-dashed border-ink/50 bg-cream p-4">
                <span className="absolute left-2 top-2 font-mono text-[10px] uppercase tracking-widest text-dark/60">
                  контур резки
                </span>
                <div
                  className="absolute inset-8 rounded-full border-2 border-red"
                  style={{ borderStyle: 'dashed' }}
                />
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  )
}
