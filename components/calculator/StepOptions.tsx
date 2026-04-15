import type { LaminationKey } from '@/lib/pricing/types'
import { cn } from '@/lib/utils/cn'
import { StepShell } from './StepShell'

type Props = {
  lamination: LaminationKey
  resin: boolean
  notch: boolean
  onLamination: (lamination: LaminationKey) => void
  onToggleResin: () => void
  onToggleNotch: () => void
}

const laminationOptions: readonly { key: LaminationKey; label: string; hint: string }[] = [
  { key: 'none', label: 'Без ламинации', hint: 'базовая печать' },
  { key: 'matte', label: 'Матовая', hint: 'бархатная, без бликов' },
  { key: 'gloss', label: 'Глянцевая', hint: 'яркие цвета, блеск' },
]

/**
 * Шаг 5 — опции. Ламинация (3 варианта), переключатели 3D смолы и надсечки.
 */
export function StepOptions({
  lamination,
  resin,
  notch,
  onLamination,
  onToggleResin,
  onToggleNotch,
}: Props) {
  return (
    <StepShell
      id="step-options"
      number={5}
      title="Опции и отделка"
      description="Ламинация защищает от UV и царапин, 3D смола создаёт эффект объёмной линзы, надсечка упрощает снятие со листа."
    >
      <fieldset>
        <legend className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-cream-muted">
          Ламинация
        </legend>
        <div className="flex flex-wrap gap-2">
          {laminationOptions.map((o) => {
            const active = lamination === o.key
            return (
              <button
                key={o.key}
                type="button"
                aria-pressed={active}
                onClick={() => onLamination(o.key)}
                className={cn(
                  'flex min-w-[160px] flex-col gap-0.5 rounded-2xl border-2 px-4 py-3 text-left transition-[transform,box-shadow,border-color] duration-fast ease-out',
                  active
                    ? 'border-violet bg-violet text-violet-ink shadow-soft-lg'
                    : 'border-line bg-bg-surface text-cream hover:-translate-y-[2px] hover:border-violet/60',
                )}
              >
                <span className="font-display text-sm font-bold uppercase">{o.label}</span>
                <span className={cn('text-xs', active ? 'opacity-80' : 'text-cream-muted')}>
                  {o.hint}
                </span>
              </button>
            )
          })}
        </div>
      </fieldset>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <OptionToggle
          label="3D смола"
          hint="Эпоксидное покрытие, эффект линзы"
          checked={resin}
          onChange={onToggleResin}
        />
        <OptionToggle
          label="Надсечка по контуру"
          hint="Лист или рулон с полупрорезом"
          checked={notch}
          onChange={onToggleNotch}
        />
      </div>
    </StepShell>
  )
}

function OptionToggle({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string
  hint: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={cn(
        'flex items-center justify-between gap-4 rounded-2xl border-2 px-4 py-3 text-left transition-[transform,box-shadow,border-color] duration-fast ease-out',
        checked
          ? 'border-violet bg-violet text-violet-ink shadow-soft-lg'
          : 'border-line bg-bg-surface text-cream hover:-translate-y-[2px] hover:border-violet/60',
      )}
    >
      <span className="flex flex-col gap-0.5">
        <span className="font-display text-sm font-bold uppercase">{label}</span>
        <span className={cn('text-xs', checked ? 'opacity-80' : 'text-cream-muted')}>{hint}</span>
      </span>
      <span
        className={cn(
          'flex h-7 w-12 shrink-0 items-center rounded-full border-2 border-line/40 transition-colors',
          checked ? 'justify-end bg-bg-base' : 'justify-start bg-bg-surface-2',
        )}
      >
        <span className="mx-0.5 h-5 w-5 rounded-full bg-cream" />
      </span>
    </button>
  )
}
