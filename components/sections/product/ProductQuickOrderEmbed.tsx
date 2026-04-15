import type { ProductContent } from '@/lib/content/products'
import { QuickOrderWidget } from '@/components/sections/home/QuickOrderWidget'

/**
 * Секция «Быстрый заказ» на продуктовой странице. С M9.7 — это тот же
 * inline калькулятор, что и на главной (QuickOrderWidget), но с
 * пресетом `initialProduct` и #order якорем для скролла из hero.
 * Переход на /bystryj-zakaz остаётся как fallback (кнопка «Оформить заказ»).
 */
export function ProductQuickOrderEmbed({ content }: { content: ProductContent }) {
  return (
    <QuickOrderWidget
      initialProduct={content.slug}
      eyebrow={`Калькулятор · ${content.label}`}
    />
  )
}
