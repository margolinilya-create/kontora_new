import Image from 'next/image'
import type { GalleryImage, ProductContent } from '@/lib/content/products/types'
import { Container } from '@/components/ui/Container'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { cn } from '@/lib/utils/cn'

/**
 * Галерея работ продуктовой страницы. Реальные PNG из
 * public/brand/gallery/* (привязка per-slug в lib/content/products/*.ts).
 * Если у картинки нет `src` — рендерится цветной CSS-плейсхолдер
 * (использовалось до M9.7 и сохраняется как fallback для продуктов,
 * у которых в референсе не было галереи).
 */
const toneClassMap: Record<GalleryImage['tone'], string> = {
  yellow: 'bg-yellow',
  peach: 'bg-peach',
  pink: 'bg-pink',
  violet: 'bg-violet',
  blue: 'bg-blue',
  cream: 'bg-bg-cream',
  gold: 'bg-[var(--material-gold)]',
  holo: 'bg-[var(--material-holo)]',
}

export function Gallery({ content }: { content: ProductContent }) {
  return (
    <section className="border-b border-line bg-bg-base py-20 md:py-28">
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
            <p className="max-w-md text-pretty text-cream-muted">{content.gallery.subtitle}</p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {content.gallery.images.map((img, i) => (
            <RevealOnScroll key={img.id} delay={i * 0.04}>
              {img.src ? (
                <div
                  className={cn(
                    'relative aspect-square overflow-hidden rounded-2xl border border-line bg-bg-surface shadow-soft transition-transform duration-fast ease-out hover:-translate-y-[3px] hover:shadow-soft-lg',
                    i % 2 === 0 ? '-rotate-[0.5deg]' : 'rotate-[0.5deg]',
                  )}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 320px, (min-width: 768px) 33vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div
                  aria-label={img.alt}
                  role="img"
                  className={cn(
                    'relative aspect-square overflow-hidden rounded-2xl transition-transform duration-fast ease-out hover:-translate-y-[3px] hover:shadow-soft-lg',
                    toneClassMap[img.tone],
                    i % 2 === 0 ? '-rotate-1' : 'rotate-1',
                  )}
                >
                  <span className="absolute left-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-bg-base font-mono text-xs font-bold text-violet">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="sr-only">{img.alt}</span>
                </div>
              )}
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  )
}
