import type { ProductContent } from '@/lib/content/products'
import { Container } from '@/components/ui/Container'
import { StickerButton } from '@/components/brand/StickerButton'

/**
 * Product hero. Крупный display-заголовок с фиолетовой контур-обводкой,
 * subtitle + CTA. CTA «📎 Быстрый заказ» скроллит к inline калькулятору
 * внизу страницы (#order, через ProductQuickOrder секцию).
 */
export function ProductHero({ content }: { content: ProductContent }) {
  return (
    <section className="noise-overlay relative overflow-hidden border-b border-line bg-bg-base">
      <Container size="lg" className="relative z-10 py-20 md:py-28 lg:py-32">
        <p className="mb-6 font-mono text-xs uppercase tracking-widest text-yellow">
          Продукт · {content.label}
        </p>

        <h1
          className="font-display text-[clamp(2.75rem,7vw+0.5rem,6.5rem)] font-bold uppercase leading-[0.92] tracking-tighter"
          style={{
            WebkitTextStroke: '3px var(--accent-violet)',
            color: 'transparent',
          }}
        >
          {content.hero.title}
        </h1>

        <p className="mt-8 max-w-2xl text-pretty text-lg text-cream-soft md:text-xl">
          {content.hero.subtitle}
        </p>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <StickerButton
            href="#order"
            size="lg"
            tone="violet"
            className="rounded-full"
          >
            <span aria-hidden="true">📎</span>
            Быстрый заказ
          </StickerButton>
          <StickerButton
            href="/kontakty"
            size="lg"
            tone="ghost"
            className="rounded-full"
          >
            Связаться с менеджером
          </StickerButton>
        </div>
      </Container>
    </section>
  )
}
