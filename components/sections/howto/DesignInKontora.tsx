import { howto } from '@/lib/content/howto'
import { Container } from '@/components/ui/Container'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { StickerButton } from '@/components/brand/StickerButton'

/**
 * Блок §3.8: «ДИЗАЙН В КОНТОРЕ» — большой иллюстративный CTA.
 */
export function DesignInKontora() {
  return (
    <section id="design-v-kontore" className="bg-dark-2 py-20 md:py-28">
      <Container size="lg">
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-xl border-2 border-dark bg-violet text-white shadow-sticker-lg">
            <div className="noise-overlay relative grid gap-8 p-10 md:grid-cols-[1.2fr_1fr] md:gap-12 md:p-16">
              <div className="relative z-10 flex flex-col justify-center gap-6">
                <p className="font-mono text-xs uppercase tracking-widest text-yellow">
                  Для тех, у кого нет дизайнера
                </p>
                <h2 className="text-display-lg font-display uppercase leading-tight">
                  {howto.designInKontora.title}
                </h2>
                <p className="max-w-md text-pretty text-lg text-white/80">
                  {howto.designInKontora.subtitle}
                </p>
                <div>
                  <StickerButton
                    href={howto.designInKontora.cta.href}
                    size="lg"
                    tone="yellow"
                  >
                    {howto.designInKontora.cta.label}
                  </StickerButton>
                </div>
              </div>

              {/* граффити-стикер */}
              <div
                className="pointer-events-none relative hidden items-center justify-center md:flex"
                aria-hidden="true"
              >
                <div className="relative flex h-48 w-48 rotate-[-8deg] items-center justify-center rounded-full border-2 border-dark bg-yellow shadow-sticker-lg">
                  <span className="font-display text-4xl font-bold uppercase text-yellow-ink">
                    Нарисуем!
                  </span>
                  <span className="absolute -top-4 -right-4 flex h-10 w-10 items-center justify-center rounded-full border-2 border-dark bg-red text-lg font-bold text-white">
                    ★
                  </span>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  )
}
