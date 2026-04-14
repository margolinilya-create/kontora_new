import { blog } from '@/lib/content/blog'
import { Container } from '@/components/ui/Container'

/**
 * Hero страницы «Тут шарят за стикеры и наклейки» — PDF §4.1.
 */
export function BlogHero() {
  return (
    <section className="noise-overlay relative overflow-hidden border-b border-line bg-dark">
      <Container size="lg" className="relative z-10 py-20 md:py-28">
        <p className="mb-6 font-mono text-xs uppercase tracking-widest text-yellow">
          {blog.hero.eyebrow}
        </p>
        <h1 className="text-display-xl font-display uppercase leading-[0.95]">
          {blog.hero.title}
        </h1>
      </Container>
    </section>
  )
}
