import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { productSlugs, type ProductSlug } from '@/lib/routes'
import { getProductBySlug, productsContent } from '@/lib/content/products'
import { buildMetadata } from '@/lib/seo/metadata'
import {
  breadcrumbListJsonLd,
  faqPageJsonLd,
  productJsonLd,
  jsonLdScript,
} from '@/lib/seo/jsonld'
import { ProductPage } from '@/components/sections/product/ProductPage'

export const dynamic = 'force-static'
export const revalidate = false

type RouteParams = { slug: string }

/**
 * Генерируем все 7 продуктовых роутов статически на build.
 */
export function generateStaticParams(): readonly RouteParams[] {
  return productSlugs.map((slug) => ({ slug }))
}

function isValidSlug(slug: string): slug is ProductSlug {
  return (productSlugs as readonly string[]).includes(slug)
}

export function generateMetadata({ params }: { params: RouteParams }): Metadata {
  if (!isValidSlug(params.slug)) {
    return { title: 'Не найдено — Контора', robots: { index: false } }
  }
  const content = getProductBySlug(params.slug)
  return buildMetadata({
    path: `/catalog/${content.slug}`,
    title: content.seo.title,
    description: content.seo.description,
    navGroup: 'footer-products',
    priority: 0.9,
    changefreq: 'weekly',
  })
}

export default function CatalogProductPage({ params }: { params: RouteParams }) {
  if (!isValidSlug(params.slug)) notFound()
  const content = productsContent[params.slug]

  const breadcrumbs = breadcrumbListJsonLd([
    { name: 'Главная', path: '/' },
    { name: 'Каталог', path: '/#catalog' },
    { name: content.label, path: `/catalog/${content.slug}` },
  ])

  const product = productJsonLd({
    slug: content.slug,
    name: content.label,
    description: content.seo.description,
  })

  const faq = faqPageJsonLd([...content.faq])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbs)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(product)}
      />
      {faq ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(faq)}
        />
      ) : null}
      <ProductPage content={content} />
    </>
  )
}
