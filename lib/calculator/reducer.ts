import type {
  LaminationKey,
  MaterialKey,
  ProductKey,
} from '@/lib/pricing/types'
import { calculate } from '@/lib/pricing/calculate'
import {
  initialCalculatorState,
  toCalculatorInput,
  type CalculatorState,
  type PreviewScene,
  type UploadedFileMeta,
} from './state'

/**
 * Actions калькулятора. Каждое изменение входных параметров вызывает
 * пересчёт цены inline (дешевая pure функция, ~1мс).
 */
export type CalculatorAction =
  | { type: 'set-product'; product: ProductKey }
  | { type: 'set-material'; material: MaterialKey }
  | { type: 'set-size'; width: number; height: number }
  | { type: 'set-qty'; qty: number }
  | { type: 'set-lamination'; lamination: LaminationKey }
  | { type: 'toggle-resin' }
  | { type: 'toggle-notch' }
  | { type: 'set-scene'; scene: PreviewScene }
  | { type: 'set-file'; file: UploadedFileMeta | null }
  | { type: 'reset' }
  | { type: 'hydrate'; state: CalculatorState }

function withOutput(state: CalculatorState): CalculatorState {
  return {
    ...state,
    output: calculate(toCalculatorInput(state)),
  }
}

export function calculatorReducer(
  state: CalculatorState,
  action: CalculatorAction,
): CalculatorState {
  switch (action.type) {
    case 'set-product': {
      // При смене продукта — сохраняем материал/размер/тираж,
      // но включаем resin/notch если продукт это подразумевает.
      return withOutput({
        ...state,
        product: action.product,
        resin: action.product === '3d-stikerpaki' || action.product === '3d-stikery',
        notch: action.product === 'stikery-s-nadsechkoj',
        dirty: true,
      })
    }
    case 'set-material':
      return withOutput({ ...state, material: action.material, dirty: true })
    case 'set-size':
      return withOutput({
        ...state,
        width: clamp(action.width, 5, 10000),
        height: clamp(action.height, 5, 10000),
        dirty: true,
      })
    case 'set-qty':
      return withOutput({ ...state, qty: clamp(action.qty, 1, 1000000), dirty: true })
    case 'set-lamination':
      return withOutput({ ...state, lamination: action.lamination, dirty: true })
    case 'toggle-resin':
      return withOutput({ ...state, resin: !state.resin, dirty: true })
    case 'toggle-notch':
      return withOutput({ ...state, notch: !state.notch, dirty: true })
    case 'set-scene':
      return { ...state, scene: action.scene }
    case 'set-file':
      return { ...state, file: action.file, dirty: true }
    case 'reset': {
      return withOutput(initialCalculatorState(state.product))
    }
    case 'hydrate':
      return withOutput(action.state)
    default: {
      const _exhaustive: never = action
      return _exhaustive
    }
  }
}

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min
  return Math.min(max, Math.max(min, Math.round(value)))
}
