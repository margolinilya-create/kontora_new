import { ArrowRight } from 'lucide-react'
import { home } from '@/lib/content/home'
import { Container } from '@/components/ui/Container'
import { StickerButton } from '@/components/brand/StickerButton'
import { HeroHighlight } from '@/components/sections/home/HeroHighlight'

/**
 * Hero главной. Лево: eyebrow + заголовок с YellowMarker + подзаголовок +
 * два CTA. Право: «стикер-кластер» — 6 квадратных стикеров, разбросанных
 * с разными поворотами, каждый с sticker-shadow (CSS-only, без ассетов).
 *
 * RSC (все данные из lib/content). На mobile правый кластер уходит в под
 * hero как параллельный grid-ряд.
 */
export function Hero() {
  return (
    <section className="noise-overlay relative overflow-hidden border-b border-line">
      <Container size="lg" className="relative z-10 py-20 lg:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
          {/* left: text stack */}
          <div className="relative">
            <p className="mb-6 font-mono text-xs uppercase tracking-widest text-yellow">
              {home.hero.eyebrow}
            </p>
            <h1 className="text-display-xl font-display uppercase leading-[0.95] tracking-tight">
              {home.hero.titleLines.map((line, i) => (
                <span key={i} className="block">
                  <HeroHighlight parts={line} />
                </span>
              ))}
            </h1>
            <p className="mt-8 max-w-xl text-pretty font-body text-lg leading-relaxed text-cream/70 md:text-xl">
              <HeroHighlight parts={home.hero.subtitle} />
            </p>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <StickerButton href={home.hero.primaryCta.href} size="lg" tone="yellow">
                {home.hero.primaryCta.label}
                <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
              </StickerButton>
              <StickerButton href={home.hero.secondaryCta.href} size="lg" tone="cream">
                {home.hero.secondaryCta.label}
              </StickerButton>
            </div>
          </div>

          {/* right: sticker cluster (CSS-only, placeholder для будущего 3D коллажа) */}
          <HeroStickerCluster />
        </div>
      </Container>
    </section>
  )
}

/**
 * Кластер из 6 квадратных стикеров разных цветов и поворотов.
 * Декоративный — `aria-hidden`. До получения 3D-коллажа от владельца
 * работает как визуальный anchor с брендовой стилистикой.
 */
function HeroStickerCluster() {
  return (
    <div
      className="relative mx-auto hidden aspect-square w-full max-w-[520px] md:block"
      aria-hidden="true"
    >
      {/* backdrop: мягкая тень через дополнительный слой */}
      <div className="absolute inset-0 -z-10 rounded-xl bg-dark-2" />

      {/* sticker 1: large yellow, center-back */}
      <div className="absolute left-[20%] top-[14%] flex h-36 w-36 -rotate-6 items-center justify-center rounded-xl border-2 border-dark bg-yellow shadow-sticker-lg md:h-48 md:w-48">
        <span className="font-display text-4xl font-bold uppercase text-yellow-ink md:text-5xl">
          К
        </span>
      </div>

      {/* sticker 2: violet circle */}
      <div className="absolute right-[12%] top-[6%] flex h-24 w-24 rotate-12 items-center justify-center rounded-full border-2 border-dark bg-violet text-white shadow-sticker md:h-32 md:w-32">
        <span className="font-mono text-xs uppercase tracking-widest">3D</span>
      </div>

      {/* sticker 3: cream wide */}
      <div className="absolute left-[6%] top-[46%] flex h-20 w-40 -rotate-3 items-center justify-center rounded-md border-2 border-dark bg-cream shadow-sticker md:h-24 md:w-52">
        <span className="font-display text-sm font-bold uppercase text-dark md:text-base">
          винил · SPb
        </span>
      </div>

      {/* sticker 4: red small */}
      <div className="absolute right-[24%] top-[52%] flex h-20 w-20 rotate-[8deg] items-center justify-center rounded-md border-2 border-dark bg-red text-white shadow-sticker md:h-24 md:w-24">
        <span className="font-mono text-[10px] uppercase tracking-widest">PREMIUM</span>
      </div>

      {/* sticker 5: dark with yellow border pill */}
      <div className="absolute bottom-[12%] left-[28%] flex h-12 items-center gap-2 rounded-pill border-2 border-yellow bg-dark px-4 shadow-sticker md:h-14 md:px-6">
        <span className="h-2 w-2 rounded-full bg-yellow" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-yellow md:text-xs">
          сделано в конторе
        </span>
      </div>

      {/* sticker 6: gloss-white bottom-right */}
      <div className="absolute bottom-[6%] right-[8%] flex h-20 w-20 rotate-[-12deg] items-center justify-center rounded-full border-2 border-dark bg-white text-dark shadow-sticker md:h-24 md:w-24">
        <span className="font-display text-lg font-bold uppercase">sticker</span>
      </div>
    </div>
  )
}
