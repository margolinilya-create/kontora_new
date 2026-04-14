import { describe, expect, it } from 'vitest'
import { calculate, validate } from '../calculate'
import type { CalculatorInput } from '../types'
import { MIN_QTY } from '../table'

/**
 * Unit тесты для placeholder-формулы калькулятора. Цель на M7 — зафиксировать
 * **контракт** функции `calculate`, чтобы когда владелец пришлёт реальную
 * формулу, мы заменили только тело функции и числа в table.ts, а эти
 * тесты гарантировали:
 *
 * 1. Детерминированность (одинаковый input → одинаковый output)
 * 2. Корректность типов и структуры BreakdownEntry
 * 3. Валидацию входных параметров (размеры, тираж)
 * 4. Монотонное поведение (больше тираж = больше total, меньше unit)
 * 5. Корректное применение опций (resin, notch, lamination)
 * 6. Флаг placeholder (до реальной формулы всегда true)
 *
 * После получения реальной формулы добавим второй набор тестов с
 * конкретными числами (expected price в ₽) для regression.
 */

function baseInput(over: Partial<CalculatorInput> = {}): CalculatorInput {
  return {
    product: 'stikery-s-konturnoj-rezkoj',
    material: 'matte-white',
    width: 70,
    height: 70,
    qty: 300,
    lamination: 'matte',
    resin: false,
    notch: false,
    ...over,
  }
}

describe('calculate() — placeholder formula contract', () => {
  it('возвращает output со всеми обязательными полями', () => {
    const out = calculate(baseInput())
    expect(out).toMatchObject({
      price: expect.any(Number),
      unitPrice: expect.any(Number),
      leadTimeDays: expect.any(Number),
      breakdown: expect.any(Array),
      placeholder: true,
    })
    expect(out.price).toBeGreaterThan(0)
    expect(out.unitPrice).toBeGreaterThan(0)
    expect(out.leadTimeDays).toBeGreaterThanOrEqual(5)
  })

  it('детерминирована: одинаковый input → одинаковый output', () => {
    const input = baseInput()
    const a = calculate(input)
    const b = calculate(input)
    expect(a).toEqual(b)
  })

  it('больший тираж = больше total, меньше unit price', () => {
    const a = calculate(baseInput({ qty: 300 }))
    const b = calculate(baseInput({ qty: 3000 }))
    expect(b.price).toBeGreaterThan(a.price)
    expect(b.unitPrice).toBeLessThan(a.unitPrice)
  })

  it('больший размер = дороже', () => {
    const small = calculate(baseInput({ width: 50, height: 50 }))
    const big = calculate(baseInput({ width: 150, height: 150 }))
    expect(big.price).toBeGreaterThan(small.price)
  })

  it('лам. gloss дороже матовой дороже без ламинации', () => {
    const none = calculate(baseInput({ lamination: 'none' }))
    const matte = calculate(baseInput({ lamination: 'matte' }))
    const gloss = calculate(baseInput({ lamination: 'gloss' }))
    expect(matte.price).toBeGreaterThan(none.price)
    expect(gloss.price).toBeGreaterThan(matte.price)
  })

  it('resin накидывает стоимость', () => {
    const without = calculate(baseInput({ resin: false }))
    const withResin = calculate(baseInput({ resin: true }))
    expect(withResin.price).toBeGreaterThan(without.price)
    expect(withResin.breakdown.some((b) => b.label === '3D смола')).toBe(true)
  })

  it('notch накидывает стоимость', () => {
    const without = calculate(baseInput({ notch: false }))
    const withNotch = calculate(baseInput({ notch: true }))
    expect(withNotch.price).toBeGreaterThan(without.price)
    expect(withNotch.breakdown.some((b) => b.label === 'Надсечка')).toBe(true)
  })

  it('holo материал дороже matte', () => {
    const matte = calculate(baseInput({ material: 'matte-white' }))
    const holo = calculate(baseInput({ material: 'holo' }))
    expect(holo.price).toBeGreaterThan(matte.price)
  })

  it('скидка за тираж видна в breakdown при qty ≥ 300', () => {
    const out = calculate(baseInput({ qty: 2000 }))
    const discount = out.breakdown.find((b) => b.kind === 'discount')
    expect(discount).toBeTruthy()
    expect(discount!.amount).toBeLessThan(0)
  })

  it('breakdown содержит setup fee', () => {
    const out = calculate(baseInput())
    expect(out.breakdown.some((b) => b.label === 'Настройка и приладка')).toBe(true)
  })

  it('все 7 продуктов рассчитываются', () => {
    const products: CalculatorInput['product'][] = [
      'stikery-s-konturnoj-rezkoj',
      '3d-stikerpaki',
      '3d-stikery',
      'pryamougolnye-i-kvadratnye',
      'stikery-s-nadsechkoj',
      'bolshie-stikery',
      'stikerpaki',
    ]
    for (const product of products) {
      const out = calculate(baseInput({ product, qty: MIN_QTY[product] }))
      expect(out.price).toBeGreaterThan(0)
    }
  })

  it('3D продукты имеют больший lead time чем обычные', () => {
    const kontur = calculate(baseInput({ product: 'stikery-s-konturnoj-rezkoj', qty: 50 }))
    const resin3d = calculate(baseInput({ product: '3d-stikerpaki', qty: 50 }))
    expect(resin3d.leadTimeDays).toBeGreaterThanOrEqual(kontur.leadTimeDays)
  })

  it('большой тираж > 5000 увеличивает lead time для обычных продуктов', () => {
    const normal = calculate(baseInput({ qty: 1000 }))
    const huge = calculate(baseInput({ qty: 10000 }))
    expect(huge.leadTimeDays).toBeGreaterThan(normal.leadTimeDays)
  })

  it('placeholder: true до появления реальной формулы', () => {
    expect(calculate(baseInput()).placeholder).toBe(true)
  })
})

describe('validate() — проверка границ', () => {
  it('валидный input → 0 ошибок', () => {
    expect(validate(baseInput())).toEqual([])
  })

  it('нулевая ширина → ошибка', () => {
    const errors = validate(baseInput({ width: 0 }))
    expect(errors).toHaveLength(1)
    expect(errors[0]?.field).toBe('width')
  })

  it('отрицательная высота → ошибка', () => {
    const errors = validate(baseInput({ height: -10 }))
    expect(errors.some((e) => e.field === 'height')).toBe(true)
  })

  it('размер > 10000 мм → ошибка', () => {
    const errors = validate(baseInput({ width: 15000 }))
    expect(errors.some((e) => e.field === 'width')).toBe(true)
  })

  it('qty ниже минимума → ошибка с указанием продукта', () => {
    const errors = validate(baseInput({ qty: 10 }))
    expect(errors.some((e) => e.field === 'qty')).toBe(true)
    expect(errors[0]?.message).toMatch(/минимальный тираж/i)
  })

  it('qty = 0 → ошибка', () => {
    const errors = validate(baseInput({ qty: 0 }))
    expect(errors.some((e) => e.field === 'qty')).toBe(true)
  })

  it('3D стикерпаки имеют MIN_QTY = 10', () => {
    const errors = validate(baseInput({ product: '3d-stikerpaki', qty: 10 }))
    expect(errors).toEqual([])
  })
})
