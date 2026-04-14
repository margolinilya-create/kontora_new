import type { LegalDocument } from '@/lib/content/legal'
import { Container } from '@/components/ui/Container'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

/**
 * Универсальный шаблон для legal-страниц (privacy/cookies/soglasie).
 * Hero + intro + sections.
 */
export function LegalPage({ document: doc }: { document: LegalDocument }) {
  return (
    <>
      <section className="noise-overlay relative border-b border-line bg-dark">
        <Container size="md" className="relative z-10 py-20">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-yellow">
            {doc.hero.eyebrow}
          </p>
          <h1 className="text-display-lg font-display uppercase leading-tight md:text-display-xl">
            {doc.hero.title}
          </h1>
          <p className="mt-6 font-mono text-xs uppercase tracking-widest text-cream/50">
            Обновлено · {doc.hero.updatedAt}
          </p>
        </Container>
      </section>

      <section className="bg-dark-2 py-16 md:py-20">
        <Container size="md">
          <p className="mb-12 text-pretty text-lg leading-relaxed text-cream/80">{doc.intro}</p>

          <div className="space-y-12">
            {doc.sections.map((section, i) => (
              <RevealOnScroll key={section.id} delay={i * 0.04}>
                <article
                  id={section.id}
                  className="rounded-xl border-2 border-line bg-dark p-6 md:p-8"
                >
                  <h2 className="font-display text-xl font-bold uppercase leading-tight md:text-2xl">
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-3 text-pretty text-base leading-relaxed text-cream/80">
                    {section.paragraphs.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
