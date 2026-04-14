import { materials } from '@/lib/content/materials'
import { Container } from '@/components/ui/Container'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { MaterialSwatch } from '@/components/brand/MaterialSwatch'

/**
 * «Материалы» — горизонтальный swipe с образцами плёнок.
 * Источник: PDF §1.5. M8: soft floating swatches на dark-base.
 */
export function Materials() {
  return (
    <section className="border-b border-line bg-bg-base py-20 md:py-28">
      <Container size="lg">
        <RevealOnScroll>
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-yellow">
                {materials.eyebrow}
              </p>
              <h2 className="text-display-lg font-display">{materials.title}</h2>
            </div>
            <p className="hidden max-w-sm text-sm text-cream-muted md:block">
              Только итальянские плёнки премиум-класса. Работаем с прозрачными, матовыми,
              глянцевыми и металлизированными.
            </p>
          </div>
        </RevealOnScroll>
      </Container>

      <div
        role="region"
        aria-label="Образцы материалов"
        tabIndex={0}
        className="mt-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex gap-6 px-6 md:px-10 lg:px-12">
          {materials.items.map((item, i) => (
            <RevealOnScroll key={item.id} delay={i * 0.04} className="snap-start">
              <MaterialSwatch
                name={item.name}
                description={item.description}
                colorVar={item.colorVar}
                textColorVar={item.textColorVar}
              />
            </RevealOnScroll>
          ))}
          <div className="w-6 shrink-0 md:w-10" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
