import { howto } from '@/lib/content/howto'
import { Container } from '@/components/ui/Container'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

/**
 * Блок §3.3: общие требования к файлам. 3 буллета.
 */
export function Requirements() {
  return (
    <section className="border-b border-line bg-dark py-20">
      <Container size="md">
        <RevealOnScroll>
          <p className="font-mono text-xs uppercase tracking-widest text-yellow">Шаг 2</p>
          <h2 className="mt-3 text-display-lg font-display uppercase leading-tight">
            {howto.requirements.title}
          </h2>
        </RevealOnScroll>

        <ul className="mt-10 space-y-4">
          {howto.requirements.bullets?.map((bullet, i) => (
            <RevealOnScroll key={bullet.id} delay={i * 0.06}>
              <li className="flex items-start gap-4 rounded-lg border-2 border-dark bg-dark-2 p-5 shadow-sticker">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-yellow font-mono text-xs font-bold text-yellow-ink">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-pretty text-base leading-relaxed text-cream/80">{bullet.text}</p>
              </li>
            </RevealOnScroll>
          ))}
        </ul>
      </Container>
    </section>
  )
}
