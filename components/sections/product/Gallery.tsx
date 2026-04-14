import type { GalleryImage, ProductContent } from '@/lib/content/products/types'
import { Container } from '@/components/ui/Container'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { cn } from '@/lib/utils/cn'

/**
 * Галерея работ. Masonry-сетка 3×2 (desktop) / 2×3 (tablet) / 1 (mobile).
 * До получения реальных фотографий используются CSS-тайлы в брендовых
 * цветах с alt-текстами — каждый тайл помечен `aria-label` для a11y.
 *
 * TODO(M6): заменить на `next/image` с реальными фото из `public/gallery/<slug>/`.
 */
const toneClassMap: Record<GalleryImage['tone'], string> = {
  yellow: 'bg-yellow',
  violet: 'bg-violet',
  red: 'bg-red',
  cream: 'bg-cream',
  dark: 'bg-dark-3',
  gold: 'bg-[var(--material-gold)]',
  holo: 'bg-[var(--material-holo)]',
}

export function Gallery({ content }: { content: ProductContent }) {
  return (
    <section className="border-b border-line bg-dark py-20 md:py-28">
      <Container size="lg">
        <RevealOnScroll>
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-yellow">
                Галерея работ
              </p>
              <h2 className="text-display-lg font-display uppercase leading-tight">
                {content.gallery.title}
              </h2>
            </div>
            <p className="max-w-md text-pretty text-cream/60">{content.gallery.subtitle}</p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {content.gallery.images.map((img, i) => (
            <RevealOnScroll key={img.id} delay={i * 0.04}>
              <div
                aria-label={img.alt}
                role="img"
                className={cn(
                  'relative aspect-square overflow-hidden rounded-xl border-2 border-dark shadow-sticker transition-transform duration-fast ease-out hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-sticker-lg',
                  toneClassMap[img.tone],
                  i % 2 === 0 ? '-rotate-1' : 'rotate-1',
                )}
              >
                {/* декоративная «наклейка» с индексом, пока нет фото */}
                <span className="absolute left-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-dark font-mono text-xs font-bold text-yellow">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="sr-only">{img.alt}</span>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  )
}
