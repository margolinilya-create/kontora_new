import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'
import { routes, productSlugs, type ProductSlug } from '@/lib/routes'
import {
  breadcrumbListJsonLd,
  jsonLdScript,
} from '@/lib/seo/jsonld'
import { Container } from '@/components/ui/Container'
import { CalculatorRoot } from '@/components/calculator/CalculatorRoot'

export const metadata: Metadata = buildMetadata(routes.bystryjZakaz)

export const dynamic = 'force-static'
export const revalidate = false

type SearchParams = { product?: string }

function parseInitialProduct(params: SearchParams): ProductSlug | undefined {
  const p = params.product
  if (p && (productSlugs as readonly string[]).includes(p)) {
    return p as ProductSlug
  }
  return undefined
}

/**
 * /bystryj-zakaz — полноэкранный калькулятор. Server Component shell +
 * client CalculatorRoot внутри. SearchParams `?product=<slug>` делают
 * калькулятор с пресетом (приходят с продуктовых страниц).
 *
 * Route помечен `force-static` — searchParams парсятся на клиенте, страница
 * билдится один раз и кэшируется на edge.
 */
export default function BystryjZakazPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const initialProduct = parseInitialProduct(searchParams)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbListJsonLd([
            { name: 'Главная', path: '/' },
            { name: 'Быстрый заказ', path: '/bystryj-zakaz' },
          ]),
        )}
      />

      <section className="noise-overlay relative border-b border-line bg-dark">
        <Container size="lg" className="relative z-10 py-16 md:py-20">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-yellow">
            Калькулятор · 60 секунд
          </p>
          <h1 className="text-display-xl font-display uppercase leading-[0.95]">
            БЫСТРЫЙ ЗАКАЗ
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg text-cream/70">
            Рассчитаем предварительную стоимость и подберём по срокам производства. Цена
            обновляется мгновенно при изменении параметров.
          </p>
        </Container>
      </section>

      <section className="bg-dark-2 py-16 md:py-20">
        <Container size="lg">
          <CalculatorRoot initialProduct={initialProduct} />
        </Container>
      </section>
    </>
  )
}
