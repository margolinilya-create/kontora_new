/**
 * Таблица коэффициентов ценообразования. M3: заглушка с TODO.
 * Реальная формула + числа придут от владельца в M4 — заменим целиком.
 *
 * Все числа условные, не показывать клиенту как финальную цену.
 * `CalculatorOutput.placeholder = true` сигнализирует UI что это мок.
 */

import type { LaminationKey, MaterialKey, ProductKey } from './types'

/** Базовая цена в ₽ за см² для каждого продукта (placeholder). */
export const BASE_PRICE_PER_CM2: Record<ProductKey, number> = {
  'stikery-s-konturnoj-rezkoj': 0.18,
  '3d-stikerpaki': 0.42,
  '3d-stikery': 0.36,
  'pryamougolnye-i-kvadratnye': 0.14,
  'stikery-s-nadsechkoj': 0.2,
  'bolshie-stikery': 0.09,
  'stikerpaki': 0.22,
}

/** Мультипликатор материала. */
export const MATERIAL_MULTIPLIER: Record<MaterialKey, number> = {
  transparent: 1.1,
  air: 1.15,
  'matte-white': 1.0,
  gloss: 1.05,
  gold: 1.5,
  silver: 1.45,
  holo: 1.75,
}

/** Надбавка за ламинацию, ₽ за шт. */
export const LAMINATION_SURCHARGE: Record<LaminationKey, number> = {
  none: 0,
  matte: 1.5,
  gloss: 1.8,
}

/** Скидка за объём тиража (чем больше — тем дешевле ед-ца). */
export const QTY_DISCOUNT_TIERS: readonly { readonly min: number; readonly multiplier: number }[] = [
  { min: 5000, multiplier: 0.6 },
  { min: 2000, multiplier: 0.7 },
  { min: 1000, multiplier: 0.8 },
  { min: 300, multiplier: 0.9 },
  { min: 0, multiplier: 1.0 },
] as const

/** Минимальный тираж по продукту. */
export const MIN_QTY: Record<ProductKey, number> = {
  'stikery-s-konturnoj-rezkoj': 50,
  '3d-stikerpaki': 10,
  '3d-stikery': 20,
  'pryamougolnye-i-kvadratnye': 100,
  'stikery-s-nadsechkoj': 100,
  'bolshie-stikery': 5,
  'stikerpaki': 10,
}

/** Надбавки за опции, ₽ за шт. */
export const RESIN_SURCHARGE_PER_UNIT = 8
export const NOTCH_SURCHARGE_PER_UNIT = 1.2

/** Фиксированная настройка заказа (приладка, вывод в печать), ₽. */
export const SETUP_FEE = 1500
