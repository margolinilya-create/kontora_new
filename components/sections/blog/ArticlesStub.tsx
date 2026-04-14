import { blog } from '@/lib/content/blog'
import { Container } from '@/components/ui/Container'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

/**
 * Заглушка сетки статей. Полноценный блог-CMS — в backlog v3.
 */
export function ArticlesStub() {
  return (
    <section className="bg-bg-surface py-20 md:py-28">
      <Container size="md">
        <RevealOnScroll>
          <div className="rounded-xl border-2 border-dashed border-line bg-bg-base p-10 text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-yellow">
              {blog.articlesStub.eyebrow}
            </p>
            <h2 className="mt-3 text-display-md font-display uppercase leading-tight">
              {blog.articlesStub.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-cream-muted">
              {blog.articlesStub.body}
            </p>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  )
}
