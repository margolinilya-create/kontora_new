/**
 * Типы калькулятора. Pure, не импортирует ничего React/Next.
 * Используется одинаково в client (CalculatorRoot) и server (Server Actions).
 *
 * Когда владелец передаст реальную формулу (ожидается в M4) — меняем только
 * `lib/pricing/calculate.ts` и `lib/pricing/table.ts`. Этот файл не трогаем.
 */

import type { ProductSlug } from '@/lib/routes'

export type ProductKey = ProductSlug

export type MaterialKey =
  | 'transparent'
  | 'air'
  | 'matte-white'
  | 'gloss'
  | 'gold'
  | 'silver'
  | 'holo'

export type LaminationKey = 'none' | 'matte' | 'gloss'

export type CalculatorInput = {
  readonly product: ProductKey
  readonly material: MaterialKey
  readonly width: number   // мм
  readonly height: number  // мм
  readonly qty: number
  readonly lamination: LaminationKey
  readonly resin?: boolean
  readonly notch?: boolean
}

export type BreakdownEntryKind = 'base' | 'modifier' | 'discount'

export type BreakdownEntry = {
  readonly label: string
  readonly amount: number   // ₽
  readonly kind: BreakdownEntryKind
}

export type CalculatorOutput = {
  readonly price: number        // целое, ₽
  readonly unitPrice: number    // ₽ за шт
  readonly leadTimeDays: number
  readonly breakdown: readonly BreakdownEntry[]
  /**
   * true пока используется мок-формула. UI должен показывать плашку
   * «Предварительный расчёт» и CTA «Уточнить у менеджера».
   */
  readonly placeholder: boolean
}

export type CalculatorValidationError = {
  readonly field: keyof CalculatorInput
  readonly message: string
}
