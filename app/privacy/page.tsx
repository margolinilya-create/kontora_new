import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'
import { routes } from '@/lib/routes'
import { legalPrivacy } from '@/lib/content/legal'
import { LegalPage } from '@/components/sections/legal/LegalPage'

export const metadata: Metadata = buildMetadata(routes.privacy)

export const dynamic = 'force-static'
export const revalidate = false

export default function PrivacyPage() {
  return <LegalPage document={legalPrivacy} />
}
