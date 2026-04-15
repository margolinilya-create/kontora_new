import type { ProductContent } from '@/lib/content/products'
import { Container } from '@/components/ui/Container'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { StickerButton } from '@/components/brand/StickerButton'
import { GreatIdeaIllustration } from '@/components/brand/GreatIdeaIllustration'

/**
 * CTA-блок «Остались вопросы?» внизу продуктовой страницы. Источник: PDF §2.
 */
export function GreatIdeaCTA({ content }: { content: ProductContent }) {
  return (
    <section className="border-b border-line bg-bg-surface py-20 md:py-28">
      <Container size="lg">
        <RevealOnScroll>
          <div className="noise-overlay relative overflow-hidden rounded-xl  bg-bg-base shadow-soft-lg">
            <div className="relative z-10 grid gap-8 p-8 md:grid-cols-[1.3fr_1fr] md:gap-12 md:p-12 lg:p-16">
              <div className="flex flex-col justify-center gap-6">
                <p className="font-mono text-xs uppercase tracking-widest text-yellow">
                  Бесплатно
                </p>
                <h2 className="text-display-lg font-display uppercase leading-tight">
                  {content.cta.title}
                </h2>
                <p className="max-w-md text-pretty text-lg text-cream-soft">{content.cta.body}</p>
                <div className="mt-2">
                  <StickerButton
                    href={content.cta.button.href}
                    size="lg"
                    tone="violet"
                    className="rounded-full"
                  >
                    <span aria-hidden="true">📎</span>
                    {content.cta.button.label}
                  </StickerButton>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <GreatIdeaIllustration />
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  )
}
