import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { home } from '@/lib/content/home'
import { Container } from '@/components/ui/Container'
import { StickerButton } from '@/components/brand/StickerButton'
import { HeroHighlight } from '@/components/sections/home/HeroHighlight'

/**
 * Hero главной — переработан в M8 под Playful Character Premium.
 * Двухколоночный layout: text stack слева (moderate typography, не brutal)
 * + реальный PNG character-cluster справа (стикеры из референса).
 * Anchors: character stickers, soft ring shadow, cream CTA.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-bg-base">
      <Container size="lg" className="relative z-10 py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* left: text stack */}
          <div className="relative flex flex-col gap-6">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-yellow">
              {home.hero.eyebrow}
            </p>
            <h1 className="text-display-xl font-display font-bold leading-[1.02]">
              {home.hero.titleLines.map((line, i) => (
                <span key={i} className="block">
                  <HeroHighlight parts={line} />
                </span>
              ))}
            </h1>
            <p className="max-w-xl text-pretty text-lg leading-relaxed text-cream-soft md:text-xl">
              <HeroHighlight parts={home.hero.subtitle} />
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <StickerButton href={home.hero.primaryCta.href} size="lg" tone="yellow">
                {home.hero.primaryCta.label}
                <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
              </StickerButton>
              <StickerButton href={home.hero.secondaryCta.href} size="lg" tone="ghost">
                {home.hero.secondaryCta.label}
              </StickerButton>
            </div>
          </div>

          {/* right: character cluster из реальных PNG */}
          <HeroCharacterCluster />
        </div>
      </Container>
    </section>
  )
}

/**
 * Кластер из 4 character-стикеров с разными поворотами и soft drop-shadow.
 * Использует реальные PNG из `public/brand/stickers/` — это подпись бренда.
 * Декоративен (`aria-hidden`), на mobile скрывается.
 */
function HeroCharacterCluster() {
  return (
    <div
      className="relative mx-auto hidden aspect-square w-full max-w-[560px] md:block"
      aria-hidden="true"
    >
      {/* 1. center-back — самый крупный sticker pack */}
      <div className="absolute left-[8%] top-[10%] h-[52%] w-[52%] -rotate-6 drop-shadow-[0_30px_40px_rgba(0,0,0,0.35)]">
        <Image
          src="/brand/stickers/sticker_png_4.png"
          alt=""
          fill
          sizes="(min-width: 1024px) 300px, 50vw"
          className="object-contain"
          priority
        />
      </div>

      {/* 2. top-right — GREAT IDEA lightbulb */}
      <div className="absolute right-[4%] top-[4%] h-[40%] w-[40%] rotate-[9deg] drop-shadow-[0_24px_36px_rgba(151,54,255,0.35)]">
        <Image
          src="/brand/stickers/sticker_png_5.png"
          alt=""
          fill
          sizes="(min-width: 1024px) 220px, 40vw"
          className="object-contain"
          priority
        />
      </div>

      {/* 3. bottom-left — ISR ARB circle */}
      <div className="absolute bottom-[4%] left-[14%] h-[38%] w-[38%] -rotate-[12deg] drop-shadow-[0_20px_30px_rgba(255,210,78,0.4)]">
        <Image
          src="/brand/stickers/sticker_png_2.png"
          alt=""
          fill
          sizes="(min-width: 1024px) 210px, 40vw"
          className="object-contain"
          priority
        />
      </div>

      {/* 4. bottom-right — adventure time character */}
      <div className="absolute bottom-[8%] right-[6%] h-[34%] w-[34%] rotate-[6deg] drop-shadow-[0_20px_30px_rgba(0,159,227,0.4)]">
        <Image
          src="/brand/stickers/sticker_png_3.png"
          alt=""
          fill
          sizes="(min-width: 1024px) 190px, 35vw"
          className="object-contain"
        />
      </div>
    </div>
  )
}
