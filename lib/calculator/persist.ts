import { CALCULATOR_SCHEMA_VERSION, initialCalculatorState, type CalculatorState } from './state'

/**
 * Персистенс черновика калькулятора в localStorage. Schema v1.
 * При несовпадении версии возвращает initial state (миграция не нужна
 * пока v1 — единственная версия).
 *
 * File-meta сохраняется без dataUrl, чтобы не раздуть storage quota.
 */
const STORAGE_KEY = 'kontora:calculator:v1'

export function loadDraft(): CalculatorState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<CalculatorState> & { version?: number }
    if (parsed.version !== CALCULATOR_SCHEMA_VERSION) {
      return null
    }
    const base = initialCalculatorState(parsed.product ?? 'stikery-s-konturnoj-rezkoj')
    return {
      ...base,
      ...parsed,
      // file-dataUrl не восстанавливается
      file: parsed.file ? { ...parsed.file, dataUrl: null } : null,
      output: null, // пересчитается в hydrate
      dirty: true,
    } as CalculatorState
  } catch {
    return null
  }
}

export function saveDraft(state: CalculatorState): void {
  if (typeof window === 'undefined') return
  try {
    const serializable: CalculatorState = {
      ...state,
      file: state.file
        ? { name: state.file.name, size: state.file.size, type: state.file.type, dataUrl: null }
        : null,
      output: null,
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable))
  } catch {
    // storage quota или private mode — молча игнорируем
  }
}

export function clearDraft(): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // noop
  }
}
