import { Check, X } from 'lucide-react'
import { howto } from '@/lib/content/howto'
import { Container } from '@/components/ui/Container'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

/**
 * Блок §3.7: «ТРЕБОВАНИЯ ПОД 3D СМОЛУ». 2 буллета + две карточки
 * правильно/неправильно (галочка/крестик).
 */
export function ResinRules() {
  return (
    <section className="border-b border-line bg-bg-base py-20">
      <Container size="md">
        <RevealOnScroll>
          <p className="font-mono text-xs uppercase tracking-widest text-yellow">Шаг 6</p>
          <h2 className="mt-3 text-display-lg font-display uppercase leading-tight">
            {howto.resinRules.title}
          </h2>
        </RevealOnScroll>

        <ul className="mt-10 space-y-3">
          {howto.resinRules.bullets?.map((bullet, i) => (
            <RevealOnScroll key={bullet.id} delay={i * 0.04}>
              <li className="flex items-start gap-4 rounded-lg  bg-bg-surface p-5 shadow-soft-sm">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-yellow">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-pretty text-base leading-relaxed text-cream-soft">{bullet.text}</p>
              </li>
            </RevealOnScroll>
          ))}
        </ul>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <RevealOnScroll>
            <div className="relative rounded-xl  bg-cream p-6 text-dark ">
              <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full  bg-yellow">
                <Check className="h-5 w-5" strokeWidth={3} />
              </span>
              <p className="font-mono text-xs uppercase tracking-widest opacity-60">Правильно</p>
              <p className="mt-3 font-display text-lg font-bold uppercase leading-tight">
                Отступ 3+ мм от края смолы
              </p>
              <div className="mt-4 flex h-24 items-center justify-center rounded-md border-2 border-dashed border-ink/30 bg-cream/50">
                <div className="h-14 w-14 rounded-md  bg-violet" />
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.05}>
            <div className="relative rounded-xl  bg-bg-surface p-6 text-cream ">
              <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full  bg-red">
                <X className="h-5 w-5" strokeWidth={3} />
              </span>
              <p className="font-mono text-xs uppercase tracking-widest opacity-60">Неправильно</p>
              <p className="mt-3 font-display text-lg font-bold uppercase leading-tight">
                Дизайн впритык к краю
              </p>
              <div className="mt-4 flex h-24 items-center justify-center rounded-md border-2 border-dashed border-line">
                <div className="h-24 w-24 rounded-md border-2 border-red bg-violet" />
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  )
}
