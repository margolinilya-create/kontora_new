import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'
import { routes } from '@/lib/routes'
import { breadcrumbListJsonLd, jsonLdScript } from '@/lib/seo/jsonld'
import { BlogHero } from '@/components/sections/blog/BlogHero'
import { AboutCompany } from '@/components/sections/blog/AboutCompany'
import { AudienceBlog } from '@/components/sections/blog/AudienceBlog'
import { ArticlesStub } from '@/components/sections/blog/ArticlesStub'

export const metadata: Metadata = buildMetadata(routes.blog)

export const dynamic = 'force-static'
export const revalidate = false

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbListJsonLd([
            { name: 'Главная', path: '/' },
            { name: 'Блог', path: '/blog' },
          ]),
        )}
      />
      <BlogHero />
      <AboutCompany />
      <AudienceBlog />
      <ArticlesStub />
    </>
  )
}
