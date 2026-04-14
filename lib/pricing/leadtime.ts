import type { ProductKey } from './types'

/**
 * Срок производства в днях по продукту + тиражу. M3: hardcoded «от 5 дней»
 * для большинства продуктов. M4: реальная логика с очередью производства.
 */
export function leadTimeDays(product: ProductKey, qty: number): number {
  // 3D смола занимает дольше — эпоксидка сохнет
  if (product === '3d-stikerpaki' || product === '3d-stikery') {
    if (qty > 1000) return 10
    return 7
  }
  if (product === 'bolshie-stikery') {
    if (qty > 20) return 7
    return 5
  }
  if (qty > 5000) return 7
  return 5
}
