import { cn } from '@/lib/utils/cn'
import { StepShell } from './StepShell'

type Props = {
  width: number
  height: number
  onChange: (width: number, height: number) => void
}

const presets: readonly { label: string; width: number; height: number }[] = [
  { label: '50×50 мм', width: 50, height: 50 },
  { label: '70×70 мм', width: 70, height: 70 },
  { label: '100×100 мм', width: 100, height: 100 },
  { label: 'A7 (74×105)', width: 74, height: 105 },
  { label: 'A6 (105×148)', width: 105, height: 148 },
  { label: 'A5 (148×210)', width: 148, height: 210 },
]

/**
 * Шаг 3 — размер. Пресеты + ручной ввод в мм. Mono-шрифт для цифр.
 */
export function StepSize({ width, height, onChange }: Props) {
  const activePreset = presets.find((p) => p.width === width && p.height === height)

  return (
    <StepShell
      id="step-size"
      number={3}
      title="Размер"
      description="Выберите пресет или введите свой размер в миллиметрах. Масштаб 1:1."
    >
      <div className="flex flex-wrap gap-2">
        {presets.map((p) => {
          const active = activePreset?.label === p.label
          return (
            <button
              key={p.label}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(p.width, p.height)}
              className={cn(
                'inline-flex h-10 items-center rounded-full border-2 px-4 font-mono text-xs font-bold uppercase tracking-widest transition-[transform,background,border-color] duration-fast ease-out',
                active
                  ? 'border-violet bg-violet text-violet-ink shadow-soft-lg'
                  : 'border-line bg-bg-surface text-cream hover:-translate-y-[1px] hover:border-violet/60',
              )}
            >
              {p.label}
            </button>
          )
        })}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="calc-width"
            className="font-mono text-xs font-semibold uppercase tracking-widest text-cream-muted"
          >
            Ширина, мм
          </label>
          <input
            id="calc-width"
            type="number"
            inputMode="numeric"
            min={5}
            max={10000}
            value={width}
            onChange={(e) => onChange(Number(e.target.value), height)}
            className="h-12 rounded-full border-2 border-line bg-bg-surface px-5 font-mono text-lg font-bold text-cream transition-colors hover:border-cream/20 focus:border-violet focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="calc-height"
            className="font-mono text-xs font-semibold uppercase tracking-widest text-cream-muted"
          >
            Высота, мм
          </label>
          <input
            id="calc-height"
            type="number"
            inputMode="numeric"
            min={5}
            max={10000}
            value={height}
            onChange={(e) => onChange(width, Number(e.target.value))}
            className="h-12 rounded-full border-2 border-line bg-bg-surface px-5 font-mono text-lg font-bold text-cream transition-colors hover:border-cream/20 focus:border-violet focus:outline-none"
          />
        </div>
      </div>
    </StepShell>
  )
}
