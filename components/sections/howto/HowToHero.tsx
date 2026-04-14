import { ArrowRight, FileType2 } from 'lucide-react'
import { howto } from '@/lib/content/howto'
import { Container } from '@/components/ui/Container'
import { StickerButton } from '@/components/brand/StickerButton'

/**
 * Hero «Как подготовить макет к печати». PDF §3.1. Три иконки Ps/Ai/Id
 * отрисованы как brand-tags (без зависимости от внешних лого Adobe).
 */
export function HowToHero() {
  return (
    <section className="noise-overlay relative overflow-hidden border-b border-line bg-bg-base">
      <Container size="lg" className="relative z-10 py-20 md:py-28">
        <p className="mb-6 font-mono text-xs uppercase tracking-widest text-yellow">
          {howto.hero.eyebrow}
        </p>
        <h1 className="text-display-xl font-display uppercase leading-[0.95]">
          {howto.hero.title}
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg text-cream-soft md:text-xl">
          {howto.hero.subtitle}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          {howto.hero.editors.map((editor) => (
            <span
              key={editor}
              className="inline-flex items-center gap-2 rounded-md  bg-bg-surface px-3 py-2 shadow-soft-sm"
            >
              <FileType2 className="h-4 w-4 text-yellow" strokeWidth={2.5} />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-cream">
                {editor}
              </span>
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <StickerButton href={howto.hero.ctaPrimary.href} size="lg" tone="yellow">
            {howto.hero.ctaPrimary.label}
            <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
          </StickerButton>
          <StickerButton href={howto.hero.ctaSecondary.href} size="lg" tone="cream">
            {howto.hero.ctaSecondary.label}
          </StickerButton>
        </div>
      </Container>
    </section>
  )
}
