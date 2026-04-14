import type { ProductContent } from '@/lib/content/products'
import { Container } from '@/components/ui/Container'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { Accordion } from '@/components/ui/Accordion'

/**
 * FAQ-блок для продуктовой страницы. Тексты ответов пишет владелец
 * (в PDF пометка «тексты ответов не видны на макетах — прописать отдельно»).
 * Если FAQ пуст — секция не рендерится.
 *
 * Когда content.faq заполнен — на странице рендерится JSON-LD FAQPage
 * (см. app/catalog/[slug]/page.tsx).
 */
export function ProductFAQ({ content }: { content: ProductContent }) {
  if (content.faq.length === 0) return null

  return (
    <section className="border-b border-line bg-bg-base py-20 md:py-28">
      <Container size="md">
        <RevealOnScroll>
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-yellow">
              Вопросы и ответы
            </p>
            <h2 className="text-display-lg font-display uppercase leading-tight">
              ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ
            </h2>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <Accordion items={content.faq} />
        </RevealOnScroll>
      </Container>
    </section>
  )
}
