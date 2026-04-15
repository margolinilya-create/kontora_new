import type { ProductKey } from '@/lib/pricing/types'
import { MIN_QTY } from '@/lib/pricing/table'
import { cn } from '@/lib/utils/cn'
import { StepShell } from './StepShell'

type Props = {
  product: ProductKey
  value: number
  onChange: (qty: number) => void
}

const presets: readonly number[] = [50, 100, 300, 500, 1000, 2000, 5000]

/**
 * Шаг 4 — тираж. Пресеты из PDF §1.3 (300/1000/2000/5000+) + ползунок.
 * Минимум жёсткий per-product из lib/pricing/table.ts. Пресеты ниже min
 * автоматически скрываются.
 */
export function StepQty({ product, value, onChange }: Props) {
  const min = MIN_QTY[product]
  const visiblePresets = presets.filter((p) => p >= min)

  return (
    <StepShell
      id="step-qty"
      number={4}
      title="Тираж"
      description={`Минимальный тираж для этого продукта — ${min} шт. Больше тираж — ниже цена за штуку.`}
    >
      <div className="flex flex-wrap gap-2">
        {visiblePresets.map((p) => {
          const active = value === p
          return (
            <button
              key={p}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(p)}
              className={cn(
                'inline-flex h-10 min-w-[88px] items-center justify-center rounded-full border-2 px-4 font-mono text-xs font-bold uppercase tracking-widest transition-[transform,background,border-color] duration-fast ease-out',
                active
                  ? 'border-violet bg-violet text-violet-ink shadow-soft-lg'
                  : 'border-line bg-bg-surface text-cream hover:-translate-y-[1px] hover:border-violet/60',
              )}
            >
              {p} шт
            </button>
          )
        })}
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <label
          htmlFor="calc-qty"
          className="font-mono text-xs font-semibold uppercase tracking-widest text-cream-muted"
        >
          Свой тираж
        </label>
        <div className="flex items-center gap-4">
          <input
            id="calc-qty"
            type="range"
            min={min}
            max={10000}
            step={50}
            value={Math.min(10000, Math.max(min, value))}
            onChange={(e) => onChange(Number(e.target.value))}
            className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-bg-surface-2 accent-violet"
          />
          <input
            type="number"
            inputMode="numeric"
            min={min}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            aria-label="Количество штук"
            className="h-12 w-32 rounded-full border-2 border-line bg-bg-surface px-5 font-mono text-lg font-bold text-cream focus:border-violet focus:outline-none"
          />
        </div>
      </div>
    </StepShell>
  )
}
