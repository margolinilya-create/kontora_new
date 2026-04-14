import { Container } from '@/components/ui/Container'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { SampleRequestForm } from '@/components/forms/SampleRequestForm'

/**
 * Секция «Анкета для образца». PDF §2.8. Отображается только на странице
 * `stikery-s-konturnoj-rezkoj` (условный рендер в ProductPage).
 */
export function SampleRequestSection() {
  return (
    <section id="sample-form" className="border-b border-line bg-bg-surface py-20 md:py-28">
      <Container size="lg">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <RevealOnScroll>
            <div className="space-y-6">
              <p className="font-mono text-xs uppercase tracking-widest text-yellow">
                Бесплатно
              </p>
              <h2 className="text-display-lg font-display uppercase leading-tight">
                АНКЕТА ДЛЯ ОБРАЗЦА
              </h2>
              <p className="max-w-md text-pretty text-lg text-cream-soft">
                Заполните анкету — мы отправим образец бесплатно, чтобы вы могли потрогать и
                увидеть качество нашей продукции вживую.
              </p>
              <ul className="mt-6 flex flex-col gap-3 border-t border-line pt-6 text-sm text-cream-muted">
                <li>• Образцы на разных плёнках</li>
                <li>• Доставка по России</li>
                <li>• Никакого спама — только ваш образец</li>
              </ul>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div className="rounded-xl  bg-bg-base p-6 shadow-soft-lg md:p-8">
              <SampleRequestForm />
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  )
}
