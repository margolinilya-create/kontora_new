import type {
  CalculatorInput,
  CalculatorOutput,
  LaminationKey,
  MaterialKey,
  ProductKey,
} from '@/lib/pricing/types'

/**
 * Полное состояние калькулятора. Хранит:
 * - все входные параметры (CalculatorInput shape)
 * - meta-инфо о загруженном макете (без самого File — он в отдельном state)
 * - выбранную сцену превью
 * - последний расчёт цены (cached output)
 * - флаг dirty (пользователь коснулся параметров)
 *
 * Schema version используется persist.ts для миграций. Когда форма
 * меняется несовместимо — инкремент версии.
 */
export const CALCULATOR_SCHEMA_VERSION = 1

export type PreviewScene = 'laptop' | 'bottle' | 'notebook'

export type UploadedFileMeta = {
  readonly name: string
  readonly size: number
  readonly type: string
  readonly dataUrl: string | null
}

export type CalculatorState = {
  readonly version: number
  readonly product: ProductKey
  readonly material: MaterialKey
  readonly width: number
  readonly height: number
  readonly qty: number
  readonly lamination: LaminationKey
  readonly resin: boolean
  readonly notch: boolean
  readonly scene: PreviewScene
  readonly file: UploadedFileMeta | null
  readonly output: CalculatorOutput | null
  readonly dirty: boolean
}

export function toCalculatorInput(state: CalculatorState): CalculatorInput {
  return {
    product: state.product,
    material: state.material,
    width: state.width,
    height: state.height,
    qty: state.qty,
    lamination: state.lamination,
    resin: state.resin,
    notch: state.notch,
  }
}

export function initialCalculatorState(product: ProductKey = 'stikery-s-konturnoj-rezkoj'): CalculatorState {
  return {
    version: CALCULATOR_SCHEMA_VERSION,
    product,
    material: 'matte-white',
    width: 70,
    height: 70,
    qty: 300,
    lamination: 'matte',
    resin: product === '3d-stikerpaki' || product === '3d-stikery',
    notch: product === 'stikery-s-nadsechkoj',
    scene: 'laptop',
    file: null,
    output: null,
    dirty: false,
  }
}
