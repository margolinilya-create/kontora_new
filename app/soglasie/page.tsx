import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'
import { routes } from '@/lib/routes'
import { legalSoglasie } from '@/lib/content/legal'
import { LegalPage } from '@/components/sections/legal/LegalPage'

export const metadata: Metadata = buildMetadata(routes.soglasie)

export const dynamic = 'force-static'
export const revalidate = false

export default function SoglasiePage() {
  return <LegalPage document={legalSoglasie} />
}
