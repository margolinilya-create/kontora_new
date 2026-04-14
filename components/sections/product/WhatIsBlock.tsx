import type { ProductContent } from '@/lib/content/products'
import { Container } from '@/components/ui/Container'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

/**
 * Блок «Что такое <product>?» — поясняющий текст с крупным display-заголовком.
 * У некоторых продуктов (Большие стикеры) есть доп. bullet-фраза
 * (см. ProductContent.whatIs.extraBullet).
 */
export function WhatIsBlock({ content }: { content: ProductContent }) {
  return (
    <section className="border-b border-line bg-dark-2 py-20 md:py-28">
      <Container size="lg">
        <RevealOnScroll>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-yellow">
                Суть
              </p>
              <h2 className="text-display-lg font-display uppercase leading-tight">
                {content.whatIs.title}
              </h2>
            </div>
            <div className="flex flex-col gap-6 text-pretty text-lg leading-relaxed text-cream/80">
              <p>{content.whatIs.body}</p>
              {content.whatIs.extraBullet ? (
                <p className="border-l-4 border-yellow pl-6 text-cream/60">
                  {content.whatIs.extraBullet}
                </p>
              ) : null}
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  )
}
