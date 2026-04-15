import type { MaterialKey } from '@/lib/pricing/types'
import { cn } from '@/lib/utils/cn'
import { StepShell } from './StepShell'

type Props = {
  value: MaterialKey
  onChange: (material: MaterialKey) => void
}

/**
 * Шаг 2 — материал плёнки. 7 swatch-кнопок с визуальным образцом
 * цвета/градиента + название. Активный swatch — с sticker-shadow-lg.
 */
type Swatch = {
  key: MaterialKey
  label: string
  background: string
  fg: string
}

const swatches: readonly Swatch[] = [
  { key: 'transparent', label: 'Прозрачная', background: 'rgba(255,255,255,0.1)', fg: 'var(--color-cream)' },
  { key: 'air', label: 'Воздушная', background: 'rgba(255,255,255,0.25)', fg: 'var(--color-dark)' },
  { key: 'matte-white', label: 'Матовая', background: 'var(--color-cream)', fg: 'var(--color-dark)' },
  { key: 'gloss', label: 'Глянцевая', background: 'var(--color-white)', fg: 'var(--color-dark)' },
  { key: 'gold', label: 'Золотая', background: 'var(--material-gold)', fg: 'var(--color-dark)' },
  { key: 'silver', label: 'Серебряная', background: 'var(--material-silver)', fg: 'var(--color-dark)' },
  { key: 'holo', label: 'Голография', background: 'var(--material-holo)', fg: 'var(--color-dark)' },
]

export function StepMaterial({ value, onChange }: Props) {
  return (
    <StepShell
      id="step-material"
      number={2}
      title="Материал"
      description="Плёнки премиум-класса. Итальянские поставщики, проверенные на сотнях тиражей."
    >
      <div className="flex flex-wrap gap-3">
        {swatches.map((s) => {
          const active = s.key === value
          return (
            <button
              key={s.key}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(s.key)}
              className={cn(
                'relative flex w-36 flex-col gap-2 rounded-2xl border-2 p-3 text-left transition-[transform,box-shadow,border-color] duration-fast ease-out focus-visible:-translate-y-[2px]',
                active
                  ? 'border-violet shadow-soft-lg'
                  : 'border-transparent hover:-translate-y-[2px] hover:shadow-soft-lg',
              )}
              style={{ background: s.background, color: s.fg }}
            >
              <span className="flex h-16 w-full rounded-md border border-ink/20" />
              <span className="font-display text-xs font-bold uppercase tracking-wide">{s.label}</span>
              {active ? (
                <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-violet text-[10px] font-bold text-white">
                  ✓
                </span>
              ) : null}
            </button>
          )
        })}
      </div>
    </StepShell>
  )
}
