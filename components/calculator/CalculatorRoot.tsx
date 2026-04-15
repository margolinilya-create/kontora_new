'use client'

import { useEffect } from 'react'
import type { ProductKey } from '@/lib/pricing/types'
import { useCalculator } from '@/lib/calculator/use-calculator'
import { track } from '@/lib/analytics/track'
import { StepProduct } from './StepProduct'
import { StepMaterial } from './StepMaterial'
import { StepSize } from './StepSize'
import { StepQty } from './StepQty'
import { StepOptions } from './StepOptions'
import { StepUpload } from './StepUpload'
import { LivePreview } from './LivePreview'
import { PricePanel } from './PricePanel'

type Props = {
  initialProduct?: ProductKey
}

/**
 * Корневой компонент полноэкранного калькулятора. Лейаут:
 *   desktop (≥lg):  [steps column 1fr] [sticky right 420px]
 *   tablet (md):    [steps column] → (PricePanel + LivePreview ниже)
 *   mobile:         1 колонка, PricePanel — sticky bottom
 */
export function CalculatorRoot({ initialProduct }: Props) {
  const [state, dispatch] = useCalculator(initialProduct)

  // calc_open — один раз на mount
  useEffect(() => {
    track({ name: 'calc_open', props: { product: state.product, surface: 'full' } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // calc_price_shown — когда появился output
  useEffect(() => {
    if (state.output) {
      track({
        name: 'calc_price_shown',
        props: { price: state.output.price, product: state.product },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.output?.price, state.product])

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,400px)] lg:gap-10">
      <div className="flex flex-col rounded-3xl border border-line bg-bg-surface-2 p-6 shadow-soft-lg md:p-10">
        <StepProduct
          value={state.product}
          onChange={(product) => dispatch({ type: 'set-product', product })}
        />
        <StepMaterial
          value={state.material}
          onChange={(material) => dispatch({ type: 'set-material', material })}
        />
        <StepSize
          width={state.width}
          height={state.height}
          onChange={(width, height) => dispatch({ type: 'set-size', width, height })}
        />
        <StepQty
          product={state.product}
          value={state.qty}
          onChange={(qty) => dispatch({ type: 'set-qty', qty })}
        />
        <StepOptions
          lamination={state.lamination}
          resin={state.resin}
          notch={state.notch}
          onLamination={(lamination) => dispatch({ type: 'set-lamination', lamination })}
          onToggleResin={() => dispatch({ type: 'toggle-resin' })}
          onToggleNotch={() => dispatch({ type: 'toggle-notch' })}
        />
        <StepUpload
          file={state.file}
          onChange={(file) => dispatch({ type: 'set-file', file })}
        />
      </div>

      <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:max-h-[calc(100dvh-8rem)] lg:overflow-y-auto lg:pb-8">
        <LivePreview
          scene={state.scene}
          onSceneChange={(scene) => dispatch({ type: 'set-scene', scene })}
          width={state.width}
          height={state.height}
          file={state.file}
        />
        <PricePanel state={state} onReset={() => dispatch({ type: 'reset' })} />
      </div>
    </div>
  )
}
