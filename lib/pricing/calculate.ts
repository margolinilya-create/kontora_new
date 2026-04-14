/**
 * Pure функция расчёта заказа. M3: заглушка.
 *
 * Реальная формула придёт от владельца в M4 — заменим тело функции и
 * числа в `./table.ts`. Тип CalculatorOutput останется тем же, UI не
 * изменится, unit-тесты будут добавлены вместе с реальной формулой.
 *
 * Правила заглушки:
 * - `placeholder: true` в ответе → UI показывает плашку «Предварительный»
 * - детерминирована, без рандома (одинаковый input → одинаковый output)
 * - без throw — возвращает валидный результат для любого input,
 *   валидация отдельно в `validate()`
 */

import type {
  CalculatorInput,
  CalculatorOutput,
  CalculatorValidationError,
  BreakdownEntry,
} from './types'
import {
  BASE_PRICE_PER_CM2,
  MATERIAL_MULTIPLIER,
  LAMINATION_SURCHARGE,
  QTY_DISCOUNT_TIERS,
  MIN_QTY,
  RESIN_SURCHARGE_PER_UNIT,
  NOTCH_SURCHARGE_PER_UNIT,
  SETUP_FEE,
} from './table'
import { leadTimeDays } from './leadtime'

export function validate(input: CalculatorInput): readonly CalculatorValidationError[] {
  const errors: CalculatorValidationError[] = []
  if (input.width <= 0) errors.push({ field: 'width', message: 'Ширина должна быть больше 0' })
  if (input.height <= 0) errors.push({ field: 'height', message: 'Высота должна быть больше 0' })
  if (input.width > 10000)
    errors.push({ field: 'width', message: 'Ширина не может превышать 10 000 мм' })
  if (input.height > 10000)
    errors.push({ field: 'height', message: 'Высота не может превышать 10 000 мм' })
  if (input.qty <= 0) errors.push({ field: 'qty', message: 'Тираж должен быть больше 0' })

  const minQty = MIN_QTY[input.product]
  if (input.qty < minQty) {
    errors.push({ field: 'qty', message: `Минимальный тираж для этого продукта — ${minQty} шт` })
  }
  return errors
}

export function calculate(input: CalculatorInput): CalculatorOutput {
  const areaCm2 = (input.width / 10) * (input.height / 10)
  const basePerUnit = areaCm2 * BASE_PRICE_PER_CM2[input.product]
  const withMaterial = basePerUnit * MATERIAL_MULTIPLIER[input.material]

  const laminationSurcharge = LAMINATION_SURCHARGE[input.lamination]
  const resinSurcharge = input.resin ? RESIN_SURCHARGE_PER_UNIT : 0
  const notchSurcharge = input.notch ? NOTCH_SURCHARGE_PER_UNIT : 0

  const tier = QTY_DISCOUNT_TIERS.find((t) => input.qty >= t.min) ?? QTY_DISCOUNT_TIERS[QTY_DISCOUNT_TIERS.length - 1]!
  const tierMultiplier = tier.multiplier

  const unitBeforeDiscount =
    withMaterial + laminationSurcharge + resinSurcharge + notchSurcharge
  const unitAfterDiscount = unitBeforeDiscount * tierMultiplier

  const productionTotal = unitAfterDiscount * input.qty
  const total = Math.round(productionTotal + SETUP_FEE)
  const unit = Math.round(total / Math.max(1, input.qty))

  const breakdown: BreakdownEntry[] = [
    {
      label: `Базовая печать · ${formatNumber(areaCm2)} см² × ${input.qty} шт`,
      amount: Math.round(withMaterial * input.qty),
      kind: 'base',
    },
  ]
  if (laminationSurcharge > 0) {
    breakdown.push({
      label: `Ламинация · ${input.lamination}`,
      amount: Math.round(laminationSurcharge * input.qty),
      kind: 'modifier',
    })
  }
  if (resinSurcharge > 0) {
    breakdown.push({
      label: '3D смола',
      amount: Math.round(resinSurcharge * input.qty),
      kind: 'modifier',
    })
  }
  if (notchSurcharge > 0) {
    breakdown.push({
      label: 'Надсечка',
      amount: Math.round(notchSurcharge * input.qty),
      kind: 'modifier',
    })
  }
  if (tierMultiplier < 1) {
    const discountPct = Math.round((1 - tierMultiplier) * 100)
    breakdown.push({
      label: `Скидка за тираж · −${discountPct}%`,
      amount: -Math.round(unitBeforeDiscount * input.qty * (1 - tierMultiplier)),
      kind: 'discount',
    })
  }
  breakdown.push({
    label: 'Настройка и приладка',
    amount: SETUP_FEE,
    kind: 'base',
  })

  return {
    price: total,
    unitPrice: unit,
    leadTimeDays: leadTimeDays(input.product, input.qty),
    breakdown,
    placeholder: true,
  }
}

function formatNumber(n: number): string {
  return n.toFixed(1).replace('.', ',')
}
