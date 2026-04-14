import { home } from '@/lib/content/home'
import { Container } from '@/components/ui/Container'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { ManagerRequestForm } from '@/components/forms/ManagerRequestForm'

/**
 * «Запрос для менеджера» — форма для B2B-сегмента. Источник: PDF §1.4.
 * M8: soft floating container с ring shadow.
 */
export function ManagerRequest() {
  return (
    <section id="manager-request" className="border-b border-line bg-bg-surface py-20 md:py-28">
      <Container size="lg">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <RevealOnScroll>
            <div className="space-y-6">
              <p className="font-mono text-xs uppercase tracking-widest text-yellow">
                {home.managerRequest.eyebrow}
              </p>
              <h2 className="text-display-lg font-display">{home.managerRequest.title}</h2>
              <p className="max-w-md text-pretty text-lg text-cream-soft">
                {home.managerRequest.subtitle}
              </p>
              <ul className="mt-6 flex flex-col gap-3 border-t border-line pt-6 text-sm text-cream-muted">
                <li>• Индивидуальный расчёт под ваш тираж</li>
                <li>• Счёт, закрывающие документы, работа с ИП/ООО</li>
                <li>• Менеджер отвечает в течение часа в рабочее время</li>
              </ul>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div className="rounded-lg bg-bg-surface-2 p-6 shadow-ring shadow-soft md:p-8">
              <ManagerRequestForm />
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  )
}
