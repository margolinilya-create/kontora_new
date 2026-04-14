import { Calculator, Clock, ArrowRight } from 'lucide-react'
import { home } from '@/lib/content/home'
import { Container } from '@/components/ui/Container'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { StickerButton } from '@/components/brand/StickerButton'

/**
 * Shell-блок «Быстрый заказ» для главной. Три метрики + violet CTA.
 * В M8 переработан под soft-floating стилистику.
 */
export function QuickOrderEmbed() {
  return (
    <section className="border-b border-line bg-bg-surface py-20 md:py-28">
      <Container size="lg">
        <RevealOnScroll>
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-yellow">
              {home.quickOrder.eyebrow}
            </p>
            <h2 className="text-display-lg font-display">{home.quickOrder.title}</h2>
            <p className="mt-4 text-pretty text-lg text-cream-soft">{home.quickOrder.subtitle}</p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="grid gap-0 overflow-hidden rounded-xl bg-bg-surface-2 shadow-ring shadow-soft md:grid-cols-[1fr_1fr_1fr_1.2fr]">
            <Metric icon={<Calculator className="h-5 w-5" strokeWidth={2.5} />} label="Калькулятор" value="6 шагов" />
            <Metric icon={<Clock className="h-5 w-5" strokeWidth={2.5} />} label="До расчёта" value="~60 сек" />
            <Metric label="От тиража" value="300 шт" />
            <div className="flex flex-col justify-center gap-4 border-t border-line bg-violet p-6 text-violet-ink md:border-l md:border-t-0 md:p-8">
              <div className="space-y-1">
                <p className="font-mono text-xs uppercase tracking-widest opacity-70">
                  Работает без регистрации
                </p>
                <p className="font-display text-2xl font-bold leading-tight">
                  Рассчитайте <br /> свой тираж
                </p>
              </div>
              <StickerButton href={home.quickOrder.cta.href} size="md" tone="yellow" className="self-start">
                {home.quickOrder.cta.label}
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
  icon?: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-line p-6 md:border-b-0 md:border-r md:p-8">
      <div className="flex items-center gap-2 text-yellow">
        {icon}
        <span className="font-mono text-xs uppercase tracking-widest">{label}</span>
      </div>
      <span className="font-display text-3xl font-bold leading-none text-cream md:text-4xl">
        {value}
      </span>
    </div>
  )
}
