import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/metadata'
import { routes } from '@/lib/routes'
import { breadcrumbListJsonLd, jsonLdScript } from '@/lib/seo/jsonld'
import { HowToHero } from '@/components/sections/howto/HowToHero'
import { DocumentSetup } from '@/components/sections/howto/DocumentSetup'
import { Requirements } from '@/components/sections/howto/Requirements'
import { LayoutRules } from '@/components/sections/howto/LayoutRules'
import { SafePlacement } from '@/components/sections/howto/SafePlacement'
import { StickerpackRules } from '@/components/sections/howto/StickerpackRules'
import { ResinRules } from '@/components/sections/howto/ResinRules'
import { DesignInKontora } from '@/components/sections/howto/DesignInKontora'

export const metadata: Metadata = buildMetadata(routes.kakPodgotovitMaket)

export const dynamic = 'force-static'
export const revalidate = false

/**
 * /kak-podgotovit-maket — гайд по подготовке макета. PDF §3.1–§3.8.
 */
export default function KakPodgotovitMaketPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          breadcrumbListJsonLd([
            { name: 'Главная', path: '/' },
            { name: 'Как подготовить макет', path: '/kak-podgotovit-maket' },
          ]),
        )}
      />
      <HowToHero />
      <DocumentSetup />
      <Requirements />
      <LayoutRules />
      <SafePlacement />
      <StickerpackRules />
      <ResinRules />
      <DesignInKontora />
    </>
  )
}
