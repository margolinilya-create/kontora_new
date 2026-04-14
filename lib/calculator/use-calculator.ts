'use client'

import { useEffect, useReducer, useRef } from 'react'
import type { ProductKey } from '@/lib/pricing/types'
import { calculatorReducer } from './reducer'
import { initialCalculatorState, type CalculatorState } from './state'
import { loadDraft, saveDraft } from './persist'

/**
 * Hook-обёртка вокруг useReducer + persist. Инкапсулирует:
 * - ленивую инициализацию с дефолтным продуктом
 * - hydrate из localStorage на mount (после hydration SSR)
 * - debounced save draft на каждое изменение (500 мс)
 */
export function useCalculator(initialProduct?: ProductKey) {
  const [state, dispatch] = useReducer(
    calculatorReducer,
    initialProduct ?? 'stikery-s-konturnoj-rezkoj',
    initialCalculatorState,
  )
  const hydrated = useRef(false)

  // hydrate из localStorage один раз
  useEffect(() => {
    if (hydrated.current) return
    hydrated.current = true
    const draft = loadDraft()
    if (draft) {
      dispatch({ type: 'hydrate', state: draft })
    } else {
      // инициализируем output через пустой hydrate
      dispatch({ type: 'hydrate', state: initialCalculatorState(initialProduct) })
    }
  }, [initialProduct])

  // debounced save
  useEffect(() => {
    if (!state.dirty) return
    const t = window.setTimeout(() => saveDraft(state), 500)
    return () => window.clearTimeout(t)
  }, [state])

  return [state, dispatch] as const
}

export type { CalculatorState }
