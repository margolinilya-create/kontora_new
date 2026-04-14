import { ArrowRight, Clock, Package, RotateCcw } from 'lucide-react'
import type { CalculatorState } from '@/lib/calculator/state'
import { validate } from '@/lib/pricing/calculate'
import { toCalculatorInput } from '@/lib/calculator/state'
import { StickerButton } from '@/components/brand/StickerButton'
import { cn } from '@/lib/utils/cn'

type Props = {
  state: CalculatorState
  onReset: () => void
  className?: string
}

/**
 * Sticky price panel — показывает цену, срок, breakdown и CTA.
 * На desktop — правая колонка sticky. На mobile — рендерится как нижний
 * bottom-bar (позиционируется родителем).
 */
export function PricePanel({ state, onReset, className }: Props) {
  const errors = validate(toCalculatorInput(state))
  const out = state.output

  return (
    <aside
      className={cn(
        'flex flex-col overflow-hidden rounded-xl  bg-bg-surface shadow-soft-lg',
        className,
      )}
    >
      <header className="flex items-center justify-between border-b border-line bg-bg-base p-5">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-yellow">Предварительно</p>
          <p className="font-display text-[11px] uppercase tracking-widest text-cream-muted">
            до загрузки макета
          </p>
        </div>
        <button
          type="button"
          aria-label="Сбросить калькулятор"
          onClick={onReset}
          className="flex h-9 w-9 items-center justify-center rounded-md border-2 border-line text-cream-muted transition-colors hover:border-yellow hover:text-yellow"
          title="Сбросить"
        >
          <RotateCcw className="h-4 w-4" strokeWidth={2.5} />
        </button>
      </header>

      {errors.length > 0 ? (
        <div className="space-y-2 border-b border-line p-5">
          {errors.map((e) => (
            <p key={e.field} className="text-sm text-red" role="alert">
              {e.message}
            </p>
          ))}
        </div>
      ) : null}

      <div className="space-y-2 p-5">
        <p className="font-mono text-xs uppercase tracking-widest text-cream-muted">Стоимость тиража</p>
        <p className="font-display text-[clamp(2rem,6vw,3.5rem)] font-bold leading-none tracking-tighter text-cream">
          {out ? formatPrice(out.price) : '—'}
          <span className="ml-2 text-2xl text-yellow">₽</span>
        </p>
        {out ? (
          <p className="font-mono text-xs text-cream-muted">
            {formatPrice(out.unitPrice)} ₽ за штуку · {state.qty} шт
          </p>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-px border-y border-line bg-line">
        <Metric icon={<Clock className="h-4 w-4" />} label="Срок" value={out ? `от ${out.leadTimeDays} дн` : '—'} />
        <Metric icon={<Package className="h-4 w-4" />} label="Тираж" value={`${state.qty} шт`} />
      </div>

      {out && out.breakdown.length > 0 ? (
        <details className="border-b border-line">
          <summary className="cursor-pointer px-5 py-3 font-mono text-xs uppercase tracking-widest text-cream-muted transition-colors hover:text-yellow">
            Расшифровка цены
          </summary>
          <ul className="space-y-1.5 px-5 pb-4 text-xs">
            {out.breakdown.map((b, i) => (
              <li
                key={`${b.label}-${i}`}
                className={cn(
                  'flex items-center justify-between gap-4',
                  b.kind === 'discount' ? 'text-yellow' : 'text-cream-soft',
                )}
              >
                <span className="truncate">{b.label}</span>
                <span className="font-mono whitespace-nowrap">{formatPrice(b.amount)} ₽</span>
              </li>
            ))}
          </ul>
        </details>
      ) : null}

      <div className="flex flex-col gap-3 p-5">
        <StickerButton href="/#manager-request" size="md" tone="yellow" className="w-full">
          Оформить заказ
          <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </StickerButton>
        <p className="text-center font-mono text-[10px] uppercase tracking-widest text-cream-muted">
          Это предварительный расчёт — финальную цену подтвердит менеджер
        </p>
      </div>
    </aside>
  )
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 bg-bg-surface p-4">
      <div className="flex items-center gap-1.5 text-yellow/70">
        {icon}
        <span className="font-mono text-[10px] uppercase tracking-widest">{label}</span>
      </div>
      <span className="font-display text-xl font-bold uppercase text-cream">{value}</span>
    </div>
  )
}

function formatPrice(n: number): string {
  return n.toLocaleString('ru-RU').replace(/,/g, ' ')
}
