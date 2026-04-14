import type { MetadataRoute } from 'next'
import { allRoutes, siteUrl } from '@/lib/routes'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return allRoutes().map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changefreq,
    priority: route.priority,
  }))
}
