import { products } from '@/lib/products'
import type { ProductKey } from '@/lib/pricing/types'
import { cn } from '@/lib/utils/cn'
import { StepShell } from './StepShell'

type Props = {
  value: ProductKey
  onChange: (product: ProductKey) => void
}

/**
 * Шаг 1 — выбор типа продукции. 7 кнопок-иконок в сетке 2×4 / 4×2.
 * Активный выбор подсвечивается жёлтой заливкой + sticker-shadow.
 */
export function StepProduct({ value, onChange }: Props) {
  return (
    <StepShell
      id="step-product"
      number={1}
      title="Тип продукции"
      description="Выберите, что хотите напечатать. Это повлияет на доступные материалы и опции."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => {
          const active = p.slug === value
          return (
            <button
              key={p.slug}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(p.slug)}
              className={cn(
                'group flex items-start gap-4 rounded-lg  p-4 text-left transition-[transform,box-shadow,background] duration-fast ease-out focus-visible:-translate-y-[2px]',
                active
                  ? 'bg-yellow text-yellow-ink shadow-soft-lg'
                  : 'bg-bg-surface text-cream  hover:-translate-y-[2px] hover:shadow-soft-lg',
              )}
            >
              <span
                className={cn(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-md  font-mono text-xs font-bold',
                  active ? 'bg-bg-base text-yellow' : 'bg-yellow text-yellow-ink',
                )}
              >
                {p.shortLabel.slice(0, 2).toUpperCase()}
              </span>
              <span className="flex flex-col gap-1">
                <span className="font-display text-sm font-bold uppercase leading-tight md:text-base">
                  {p.shortLabel}
                </span>
                <span className={cn('text-xs', active ? 'opacity-80' : 'text-cream-muted')}>
                  {p.label}
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </StepShell>
  )
}
