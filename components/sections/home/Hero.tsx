import Image from 'next/image'
import { home } from '@/lib/content/home'
import { Container } from '@/components/ui/Container'
import { StickerButton } from '@/components/brand/StickerButton'
import { HeroHighlight } from '@/components/sections/home/HeroHighlight'

/**
 * Hero главной. Центрированный layout 1:1 с kontora.futuguru.com:
 *   • eyebrow
 *   • big bubble-outline SVG headline (group-39552-1.svg, 1064×208)
 *     — визуально заменяет текстовый h1, но сам h1 остаётся sr-only
 *     для SEO/screen-reader
 *   • центрированный subtitle с yellow-marker/underline
 *   • большое 3D PNG (image-4-1-artguru-1-photoroom.png, 1024×777)
 *   • CTA «📎 Быстрый заказ» (violet) + secondary ghost
 *
 * Server component — статический render, next/image lazy layout.
 */
export function Hero() {
  const titleText = home.hero.titleLines.map((line) => line.map((p) => p.value).join('')).join(' ')

  return (
    <section className="relative overflow-hidden border-b border-line bg-bg-base">
      <Container size="lg" className="relative z-10 py-16 md:py-20 lg:py-24">
        <div className="flex flex-col items-center gap-8 text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-yellow">
            {home.hero.eyebrow}
          </p>

          <h1 className="sr-only">{titleText}</h1>
          <div aria-hidden="true" className="w-full max-w-[1064px]">
            {/* SVG heading: server-side plain img чтобы не гонять через next/image optimizer */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/group-39552-1.svg"
              alt=""
              width={1064}
              height={208}
              className="h-auto w-full select-none"
              draggable={false}
            />
          </div>

          <p className="max-w-3xl text-pretty text-lg leading-relaxed text-cream-soft md:text-xl lg:text-2xl">
            <HeroHighlight parts={home.hero.subtitle} />
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <StickerButton
              href={home.hero.primaryCta.href}
              size="lg"
              tone="violet"
              className="rounded-full"
            >
              <span aria-hidden="true">📎</span>
              {home.hero.primaryCta.label}
            </StickerButton>
            <StickerButton
              href={home.hero.secondaryCta.href}
              size="lg"
              tone="ghost"
              className="rounded-full"
            >
              {home.hero.secondaryCta.label}
            </StickerButton>
          </div>

          <div className="relative mt-6 w-full max-w-[720px]">
            <Image
              src="/brand/image-4-1-artguru-1-photoroom.png"
              alt="3D-рендер светофора со стикерами Конторы — keep on going"
              width={1024}
              height={777}
              sizes="(min-width: 1024px) 720px, (min-width: 768px) 560px, 90vw"
              className="h-auto w-full select-none drop-shadow-[0_40px_60px_rgba(0,0,0,0.5)]"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
