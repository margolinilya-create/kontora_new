import { home } from '@/lib/content/home'
import { Container } from '@/components/ui/Container'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { ManagerRequestForm } from '@/components/forms/ManagerRequestForm'

/**
 * Секция «Запрос для менеджера» — форма обратной связи для B2B-сегмента.
 * Источник: PDF §1.4. Поля: Имя/Компания, Почта, Телефон, Продукция.
 */
export function ManagerRequest() {
  return (
    <section id="manager-request" className="border-b border-line bg-dark-2 py-20 md:py-28">
      <Container size="lg">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <RevealOnScroll>
            <div className="space-y-6">
              <p className="font-mono text-xs uppercase tracking-widest text-yellow">
                {home.managerRequest.eyebrow}
              </p>
              <h2 className="text-display-lg font-display uppercase leading-tight">
                {home.managerRequest.title}
              </h2>
              <p className="max-w-md text-pretty text-lg text-cream/70">
                {home.managerRequest.subtitle}
              </p>
              <ul className="mt-6 flex flex-col gap-3 border-t border-line pt-6 text-sm text-cream/60">
                <li>• Индивидуальный расчёт под ваш тираж</li>
                <li>• Счёт, закрывающие документы, работа с ИП/ООО</li>
                <li>• Менеджер отвечает в течение часа в рабочее время</li>
              </ul>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div className="rounded-xl border-2 border-dark bg-dark p-6 shadow-sticker-lg md:p-8">
              <ManagerRequestForm />
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  )
}
