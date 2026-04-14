import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'
import { routes } from '@/lib/routes'
import { legalCookies } from '@/lib/content/legal'
import { LegalPage } from '@/components/sections/legal/LegalPage'

export const metadata: Metadata = buildMetadata(routes.cookies)

export const dynamic = 'force-static'
export const revalidate = false

export default function CookiesPage() {
  return <LegalPage document={legalCookies} />
}
