import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'
import { routes } from '@/lib/routes'
import { breadcrumbListJsonLd, jsonLdScript } from '@/lib/seo/jsonld'
import { about } from '@/lib/content/about'
import { Container } from '@/components/ui/Container'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { StickerCard } from '@/components/brand/StickerCard'

export const metadata: Metadata = buildMetadata(routes.oNas)

export const dynamic = 'force-static'
export const revalidate = false

export default function OnasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbListJsonLd([
            { name: 'Главная', path: '/' },
            { name: 'О нас', path: '/o-nas' },
          ]),
        )}
      />

      <section className="noise-overlay relative overflow-hidden border-b border-line bg-bg-base">
        <Container size="lg" className="relative z-10 py-20 md:py-28">
          <p className="mb-6 font-mono text-xs uppercase tracking-widest text-yellow">
            {about.hero.eyebrow}
          </p>
          <h1 className="text-display-xl font-display uppercase leading-[0.95]">
            {about.hero.title}
          </h1>
          <p className="mt-8 max-w-2xl text-pretty text-lg text-cream-soft md:text-xl">
            {about.hero.subtitle}
          </p>
        </Container>
      </section>

      <section className="border-b border-line bg-bg-surface py-20 md:py-28">
        <Container size="md">
          <div className="space-y-6 text-pretty text-lg leading-relaxed text-cream-soft">
            {about.intro.paragraphs.map((p, i) => (
              <RevealOnScroll key={i} delay={i * 0.05}>
                <p>{p}</p>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-bg-base py-20">
        <Container size="lg">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {about.stats.map((s, i) => (
              <RevealOnScroll key={s.id} delay={i * 0.05}>
                <div className="flex flex-col gap-3 rounded-lg  bg-bg-surface p-6 ">
                  <span className="font-mono text-xs uppercase tracking-widest text-yellow">
                    {s.label}
                  </span>
                  <span className="font-display text-3xl font-bold uppercase text-cream md:text-4xl">
                    {s.value}
                  </span>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-bg-surface py-20 md:py-28">
        <Container size="lg">
          <RevealOnScroll>
            <div className="mb-12 max-w-2xl">
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-yellow">
                {about.values.eyebrow}
              </p>
              <h2 className="text-display-lg font-display uppercase leading-tight">
                {about.values.title}
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid gap-6 md:grid-cols-2">
            {about.values.items.map((item, i) => (
              <RevealOnScroll key={item.id} delay={i * 0.06}>
                <StickerCard
                  tone={i % 2 === 0 ? 'yellow' : 'cream'}
                  hover="lift"
                  className="h-full"
                >
                  <h3 className="font-display text-xl font-bold uppercase leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-pretty text-sm opacity-85">{item.body}</p>
                </StickerCard>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
