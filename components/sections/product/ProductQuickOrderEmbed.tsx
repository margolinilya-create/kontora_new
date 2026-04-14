import { ArrowRight, Calculator, Clock, Package } from 'lucide-react'
import type { ProductContent } from '@/lib/content/products'
import { Container } from '@/components/ui/Container'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { StickerButton } from '@/components/brand/StickerButton'
import { MIN_QTY } from '@/lib/pricing/table'
import { leadTimeDays } from '@/lib/pricing/leadtime'

/**
 * Shell-блок «Быстрый заказ» на продуктовой странице. Пресет на текущий
 * продукт + переход в полноэкранный калькулятор с предвыбранным product.
 * M4: встраивается `<CalculatorRoot variant="embed" productKey={slug} />`.
 */
export function ProductQuickOrderEmbed({ content }: { content: ProductContent }) {
  const minQty = MIN_QTY[content.slug]
  const minLead = leadTimeDays(content.slug, minQty)

  return (
    <section className="border-b border-line bg-dark py-20 md:py-28">
      <Container size="lg">
        <RevealOnScroll>
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-yellow">
              Калькулятор · {content.label}
            </p>
            <h2 className="text-display-lg font-display uppercase leading-tight">
              БЫСТРЫЙ ЗАКАЗ
            </h2>
            <p className="mt-4 text-pretty text-lg text-cream/70">
              Рассчитаем предварительную стоимость и подберём по срокам производства.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="grid overflow-hidden rounded-xl border-2 border-dark bg-dark-2 shadow-sticker-lg md:grid-cols-[1fr_1fr_1fr_1.1fr]">
            <Metric icon={<Calculator className="h-5 w-5" strokeWidth={2.5} />} label="6 шагов" value="60 сек" />
            <Metric icon={<Package className="h-5 w-5" strokeWidth={2.5} />} label="Минимум" value={`${minQty} шт`} />
            <Metric icon={<Clock className="h-5 w-5" strokeWidth={2.5} />} label="Срок" value={`от ${minLead} дн`} />
            <div className="flex flex-col justify-center gap-4 border-t-2 border-dark bg-violet p-6 text-white md:border-l-2 md:border-t-0 md:p-8">
              <p className="font-display text-xl font-bold uppercase leading-tight md:text-2xl">
                Откройте калькулятор для {content.label.toLowerCase()}
              </p>
              <StickerButton
                href={content.hero.cta.href}
                size="md"
                tone="yellow"
                className="self-start"
              >
                Рассчитать
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </StickerButton>
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  )
}

function Metric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex flex-col gap-3 border-b-2 border-dark p-6 md:border-b-0 md:border-r-2 md:p-8">
      <div className="flex items-center gap-2 text-yellow">
        {icon}
        <span className="font-mono text-xs uppercase tracking-widest">{label}</span>
      </div>
      <span className="font-display text-3xl font-bold uppercase leading-none text-cream md:text-4xl">
        {value}
      </span>
    </div>
  )
}
