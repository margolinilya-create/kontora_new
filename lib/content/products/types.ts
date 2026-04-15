import type { CTA, StickerTone } from '@/lib/content/types'
import type { ProductSlug } from '@/lib/routes'

export type GalleryImage = {
  readonly id: string
  /** Временно — CSS-placeholder тон. В M6 заменится на src реального фото. */
  readonly tone: StickerTone | 'gold' | 'holo'
  readonly alt: string
}

export type InfoCard = {
  readonly id: string
  readonly title: string
  /** Короткое описание (1–2 предложения). Может быть пустым, если есть bullets. */
  readonly body: string
  /** Список пунктов из референса (например «Почему выбирают» / «Где используют»). */
  readonly bullets?: readonly string[]
  readonly tone: StickerTone
}

export type FAQItem = {
  readonly id: string
  readonly question: string
  readonly answer: string
}

export type ProductContent = {
  readonly slug: ProductSlug
  readonly label: string
  readonly hero: {
    readonly title: string
    readonly subtitle: string
    readonly cta: CTA
  }
  readonly whatIs: {
    readonly title: string
    readonly body: string
    /** Доп. список буллетов под описанием (есть только у некоторых продуктов). */
    readonly extraBullet?: string
  }
  readonly gallery: {
    readonly title: string
    readonly subtitle: string
    readonly images: readonly GalleryImage[]
  }
  readonly infoCards: readonly InfoCard[]
  readonly faq: readonly FAQItem[]
  readonly cta: {
    readonly title: string
    readonly body: string
    readonly button: CTA
  }
  readonly features: {
    readonly sampleForm: boolean
  }
  readonly seo: {
    readonly title: string
    readonly description: string
  }
}
