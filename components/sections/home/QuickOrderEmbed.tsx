import { Calculator, Clock, ArrowRight } from 'lucide-react'
import { home } from '@/lib/content/home'
import { Container } from '@/components/ui/Container'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { StickerButton } from '@/components/brand/StickerButton'

/**
 * Shell-блок «Быстрый заказ» для главной. Полноценный калькулятор —
 * компонент `CalculatorRoot` в M4. На M2 рендерим:
 * - заголовок + описание из lib/content/home.ts §1.3
 * - три живых «превью-метрики» (стоимость / срок / материалы)
 * - CTA «Открыть калькулятор» — ведёт на /bystryj-zakaz
 *
 * Когда будет готов M4, этот компонент заменит внутренность на
 * `<CalculatorRoot variant="embed" />` без изменения внешнего layout.
 */
export function QuickOrderEmbed() {
  return (
    <section className="border-b border-line bg-dark py-20 md:py-28">
      <Container size="lg">
        <RevealOnScroll>
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-yellow">
              {home.quickOrder.eyebrow}
            </p>
            <h2 className="text-display-lg font-display uppercase leading-tight">
              {home.quickOrder.title}
            </h2>
            <p className="mt-4 text-pretty text-lg text-cream/70">{home.quickOrder.subtitle}</p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="grid gap-0 overflow-hidden rounded-xl border-2 border-dark bg-dark-2 shadow-sticker-lg md:grid-cols-[1fr_1fr_1fr_1.2fr]">
            <Metric icon={<Calculator className="h-5 w-5" strokeWidth={2.5} />} label="Калькулятор" value="6 шагов" />
            <Metric icon={<Clock className="h-5 w-5" strokeWidth={2.5} />} label="До расчёта" value="~60 сек" />
            <Metric label="От тиража" value="300 шт" />
            <div className="flex flex-col justify-center gap-4 border-t-2 border-dark bg-violet p-6 text-white md:border-l-2 md:border-t-0 md:p-8">
              <div className="space-y-1">
                <p className="font-mono text-xs uppercase tracking-widest opacity-70">
                  Работает без регистрации
                </p>
                <p className="font-display text-2xl font-bold uppercase leading-tight">
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
