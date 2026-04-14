import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'
import { routes } from '@/lib/routes'
import { breadcrumbListJsonLd, jsonLdScript } from '@/lib/seo/jsonld'
import { contacts } from '@/lib/content/contacts'
import { Container } from '@/components/ui/Container'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { StickerButton } from '@/components/brand/StickerButton'

export const metadata: Metadata = buildMetadata(routes.kontakty)

export const dynamic = 'force-static'
export const revalidate = false

export default function KontaktyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbListJsonLd([
            { name: 'Главная', path: '/' },
            { name: 'Контакты', path: '/kontakty' },
          ]),
        )}
      />

      <section className="noise-overlay relative border-b border-line bg-dark">
        <Container size="lg" className="relative z-10 py-20 md:py-28">
          <p className="mb-6 font-mono text-xs uppercase tracking-widest text-yellow">
            {contacts.hero.eyebrow}
          </p>
          <h1 className="text-display-xl font-display uppercase leading-[0.95]">
            {contacts.hero.title}
          </h1>
          <p className="mt-8 max-w-2xl text-pretty text-lg text-cream/70">
            {contacts.hero.subtitle}
          </p>
        </Container>
      </section>

      <section className="border-b border-line bg-dark-2 py-20 md:py-28">
        <Container size="lg">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <RevealOnScroll>
              <div className="space-y-8">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-yellow">
                    {contacts.office.title}
                  </p>
                  <address className="mt-4 flex flex-col gap-2 font-display text-xl not-italic text-cream md:text-2xl">
                    <span>{contacts.office.city}</span>
                    <span>{contacts.office.address}</span>
                  </address>
                  <p className="mt-4 font-mono text-xs uppercase tracking-widest text-cream/50">
                    {contacts.office.hours}
                  </p>
                </div>
                <p className="max-w-md text-pretty text-sm text-cream/60">{contacts.note}</p>
                <StickerButton href="/#manager-request" size="lg" tone="yellow">
                  Оставить заявку
                </StickerButton>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <ul className="flex flex-col gap-4">
                {contacts.channels.map((ch) => (
                  <li key={ch.id}>
                    <a
                      href={ch.href}
                      className="flex items-center justify-between gap-4 rounded-lg border-2 border-dark bg-dark p-5 shadow-sticker transition-transform duration-fast hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-sticker-lg"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-xs uppercase tracking-widest text-yellow">
                          {ch.label}
                        </span>
                        <span className="font-display text-lg font-bold text-cream">
                          {ch.value}
                        </span>
                      </div>
                      <span className="font-mono text-2xl text-yellow" aria-hidden="true">→</span>
                    </a>
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
          </div>
        </Container>
      </section>
    </>
  )
}
