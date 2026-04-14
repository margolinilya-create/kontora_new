/**
 * Общие типы контентных структур. Используются всеми файлами `lib/content/*`.
 * Компоненты импортируют типизированные объекты и рендерят их.
 */

import type { ProductSlug } from '@/lib/routes'

export type CTA = {
  readonly label: string
  readonly href: string
}

export type HomeHeroHighlight =
  | { readonly kind: 'text'; readonly value: string }
  | { readonly kind: 'marker'; readonly value: string }
  | { readonly kind: 'underline'; readonly value: string }

export type HomeContent = {
  readonly hero: {
    readonly eyebrow: string
    readonly titleLines: readonly (readonly HomeHeroHighlight[])[]
    readonly subtitle: readonly HomeHeroHighlight[]
    readonly primaryCta: CTA
    readonly secondaryCta: CTA
  }
  readonly catalog: {
    readonly eyebrow: string
    readonly title: string
    readonly subtitle: string
    readonly cards: readonly {
      readonly slug: ProductSlug
      readonly label: string
      readonly title: string
      readonly description: string
    }[]
  }
  readonly quickOrder: {
    readonly eyebrow: string
    readonly title: string
    readonly subtitle: string
    readonly cta: CTA
  }
  readonly managerRequest: {
    readonly eyebrow: string
    readonly title: string
    readonly subtitle: string
    readonly productOptions: readonly { readonly value: string; readonly label: string }[]
  }
}

export type AudienceCard = {
  readonly id: string
  readonly title: string
  readonly body: string
  readonly tone: 'yellow' | 'violet' | 'red' | 'cream' | 'dark'
  readonly tilt: 'none' | 'left' | 'right' | 'softLeft' | 'softRight'
}

export type AdvantageItem = {
  readonly id: string
  readonly number: string
  readonly title: string
  readonly body: string
  readonly tone: 'yellow' | 'violet' | 'red' | 'cream' | 'dark'
}

export type MaterialSwatchItem = {
  readonly id: string
  readonly name: string
  readonly colorVar: string
  readonly textColorVar: string
  readonly description: string
}
