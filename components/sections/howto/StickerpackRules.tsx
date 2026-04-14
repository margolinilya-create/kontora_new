import { howto } from '@/lib/content/howto'
import { Container } from '@/components/ui/Container'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

/**
 * Блок §3.6: «ДЛЯ СОЗДАНИЯ СТИКЕРПАКА». 5 буллетов.
 */
export function StickerpackRules() {
  return (
    <section className="border-b border-line bg-dark-2 py-20">
      <Container size="md">
        <RevealOnScroll>
          <p className="font-mono text-xs uppercase tracking-widest text-yellow">Шаг 5</p>
          <h2 className="mt-3 text-display-lg font-display uppercase leading-tight">
            {howto.stickerpackRules.title}
          </h2>
        </RevealOnScroll>

        <ul className="mt-10 space-y-3">
          {howto.stickerpackRules.bullets?.map((bullet, i) => (
            <RevealOnScroll key={bullet.id} delay={i * 0.04}>
              <li className="flex items-start gap-4 rounded-lg border-2 border-dark bg-dark p-4 shadow-sticker-sm">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-yellow">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-pretty text-sm leading-relaxed text-cream/80 md:text-base">
                  {bullet.text}
                </p>
              </li>
            </RevealOnScroll>
          ))}
        </ul>
      </Container>
    </section>
  )
}
