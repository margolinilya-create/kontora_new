import { siteUrl, siteName } from '@/lib/routes'

/**
 * Генераторы JSON-LD. Все возвращают plain object, рендер через
 * <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(x) }} />
 * внутри RSC (Server Component).
 */

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}#organization`,
    name: siteName,
    alternateName: 'Kontora',
    url: siteUrl,
    logo: `${siteUrl}/brand/logo.svg`,
    description:
      'Мануфактура виниловых изделий. Производим наклейки и стикерпаки: от этикеток и 3D стикеров до широкоформатных наклеек.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'RU',
      addressRegion: 'Санкт-Петербург',
      addressLocality: 'Санкт-Петербург',
      streetAddress: 'ул. Набережная канала Грибоедова, 126',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Россия',
    },
    foundingDate: '2020',
    slogan: 'С нами всё клеится',
  } as const
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}#website`,
    url: siteUrl,
    name: siteName,
    inLanguage: 'ru-RU',
    publisher: { '@id': `${siteUrl}#organization` },
  } as const
}

export type BreadcrumbItem = { name: string; path: string }

export function breadcrumbListJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  } as const
}

export type ProductJsonLdInput = {
  slug: string
  name: string
  description: string
  image?: string
}

export function productJsonLd(input: ProductJsonLdInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: input.name,
    description: input.description,
    image: input.image ? `${siteUrl}${input.image}` : `${siteUrl}/og/default.png`,
    brand: { '@type': 'Brand', name: siteName },
    category: 'Виниловые наклейки',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'RUB',
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${siteUrl}#organization` },
    },
  } as const
}

export type FaqItem = { question: string; answer: string }

export function faqPageJsonLd(items: FaqItem[]) {
  if (items.length === 0) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  } as const
}

/**
 * Рендер хелпер для RSC — возвращает JSX-безопасный объект,
 * который кладётся в `<script type="application/ld+json">`.
 */
export function jsonLdScript(data: unknown) {
  return {
    __html: JSON.stringify(data),
  }
}
