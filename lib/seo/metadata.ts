import type { Metadata } from 'next'
import { routes, siteUrl, siteName, siteLocale, type RouteEntry } from '@/lib/routes'

/**
 * Фабрика метаданных per-route.
 * Правило: каждый `page.tsx` экспортирует metadata, построенное через
 * `buildMetadata(routes.xxx)`. Никаких inline Metadata объектов в page.tsx.
 */
export function buildMetadata(
  route: RouteEntry,
  overrides: Partial<Metadata> = {},
): Metadata {
  const url = `${siteUrl}${route.path}`
  return {
    metadataBase: new URL(siteUrl),
    title: { absolute: `${route.title} — ${siteName}` },
    description: route.description,
    alternates: {
      canonical: route.path,
      languages: {
        'ru-RU': route.path,
        'x-default': route.path,
      },
    },
    openGraph: {
      type: 'website',
      url,
      siteName,
      locale: siteLocale,
      title: route.title,
      description: route.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: route.title,
      description: route.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'geo.region': 'RU-SPE',
      'geo.placename': 'Санкт-Петербург',
    },
    ...overrides,
  }
}

/**
 * Дефолтная metadata для корневого layout. Используется если page.tsx
 * не экспортирует свою — но лучше всегда экспортировать явную.
 */
export const rootMetadata: Metadata = buildMetadata(routes.home, {
  title: {
    template: `%s — ${siteName}`,
    default: routes.home.title,
  },
})
