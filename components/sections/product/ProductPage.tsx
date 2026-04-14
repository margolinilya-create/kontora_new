import type { ProductContent } from '@/lib/content/products'
import { ProductHero } from './ProductHero'
import { WhatIsBlock } from './WhatIsBlock'
import { ProductQuickOrderEmbed } from './ProductQuickOrderEmbed'
import { Gallery } from './Gallery'
import { InfoCards } from './InfoCards'
import { ProductFAQ } from './ProductFAQ'
import { SampleRequestSection } from './SampleRequestSection'
import { GreatIdeaCTA } from './GreatIdeaCTA'

/**
 * Универсальный шаблон продуктовой страницы. Порядок блоков — строго из
 * PDF §2 (Общая структура продуктовой страницы):
 *   1. Hero
 *   2. Что такое <product>?
 *   3. Быстрый заказ (калькулятор)
 *   4. Галерея работ
 *   5. Инфо-карточки
 *   6. FAQ
 *   7. CTA «Остались вопросы?»
 *   + доп. блок «Анкета для образца» только на /stikery-s-konturnoj-rezkoj
 */
export function ProductPage({ content }: { content: ProductContent }) {
  return (
    <>
      <ProductHero content={content} />
      <WhatIsBlock content={content} />
      <ProductQuickOrderEmbed content={content} />
      <Gallery content={content} />
      <InfoCards content={content} />
      <ProductFAQ content={content} />
      {content.features.sampleForm ? <SampleRequestSection /> : null}
      <GreatIdeaCTA content={content} />
    </>
  )
}
