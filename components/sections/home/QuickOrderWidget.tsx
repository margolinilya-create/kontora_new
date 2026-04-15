'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import type { LaminationKey, MaterialKey } from '@/lib/pricing/types'
import { useCalculator } from '@/lib/calculator/use-calculator'
import { track } from '@/lib/analytics/track'
import { Container } from '@/components/ui/Container'
import { StickerButton } from '@/components/brand/StickerButton'
import { cn } from '@/lib/utils/cn'
import { home } from '@/lib/content/home'

/**
 * Inline «Быстрый заказ» калькулятор на главной. 6 полей из референса
 * kontora.futuguru.com (home.html):
 *   Материал / Размер / Произвольный размер в см / Количество / Ламинация / Стоимость
 *
 * Переиспользует useCalculator (общий reducer + persist) так что draft и
 * цена синхронизированы с полноразмерным /bystryj-zakaz.
 *
 * На референсе калькулятор — embedded секция с якорем #order, куда ведут
 * все CTA «БЫСТРЫЙ ЗАКАЗ» и «На заказ».
 */
export function QuickOrderWidget() {
  const [state, dispatch] = useCalculator()

  useEffect(() => {
    track({ name: 'calc_open', props: { product: state.product, surface: 'embed' } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // размер в state хранится в мм, показываем в см
  const widthCm = Math.round(state.width / 10)
  const heightCm = Math.round(state.height / 10)

  return (
    <section
      id="order"
      className="border-b border-line bg-bg-surface py-20 md:py-28"
      aria-labelledby="quick-order-title"
    >
      <Container size="lg">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-yellow">
            {home.quickOrder.eyebrow}
          </p>
          <h2 id="quick-order-title" className="text-display-lg font-display">
            {home.quickOrder.title}
          </h2>
          <p className="mt-4 text-pretty text-lg text-cream-soft">{home.quickOrder.subtitle}</p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 rounded-3xl border border-line bg-bg-surface-2 p-6 shadow-soft-lg md:p-10 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
          <div className="flex flex-col gap-8">
            <Field label="Материал">
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                {MATERIALS.map((m) => (
                  <PillButton
                    key={m.key}
                    active={state.material === m.key}
                    onClick={() => dispatch({ type: 'set-material', material: m.key })}
                  >
                    {m.label}
                  </PillButton>
                ))}
              </div>
            </Field>

            <Field label="Размер">
              <div className="flex flex-wrap gap-2">
                {SIZE_PRESETS.map((p) => {
                  const active = state.width === p.w && state.height === p.h
                  return (
                    <PillButton
                      key={p.label}
                      active={active}
                      onClick={() => dispatch({ type: 'set-size', width: p.w, height: p.h })}
                    >
                      {p.label}
                    </PillButton>
                  )
                })}
              </div>
            </Field>

            <Field label="Произвольный размер в см">
              <div className="grid grid-cols-2 gap-3">
                <CmInput
                  id="order-w"
                  aria-label="Ширина в см"
                  value={widthCm}
                  onChange={(cm) =>
                    dispatch({ type: 'set-size', width: cm * 10, height: state.height })
                  }
                />
                <CmInput
                  id="order-h"
                  aria-label="Высота в см"
                  value={heightCm}
                  onChange={(cm) =>
                    dispatch({ type: 'set-size', width: state.width, height: cm * 10 })
                  }
                />
              </div>
            </Field>

            <Field label="Количество">
              <div className="flex flex-wrap items-center gap-2">
                {QTY_PRESETS.map((q) => (
                  <PillButton
                    key={q}
                    active={state.qty === q}
                    onClick={() => dispatch({ type: 'set-qty', qty: q })}
                  >
                    {q} шт
                  </PillButton>
                ))}
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={100000}
                  aria-label="Количество штук"
                  value={state.qty}
                  onChange={(e) => dispatch({ type: 'set-qty', qty: Number(e.target.value) || 0 })}
                  className="h-10 w-24 rounded-full border-2 border-line bg-bg-surface px-4 font-mono text-sm font-bold text-cream transition-colors focus:border-violet focus:outline-none"
                />
              </div>
            </Field>

            <Field label="Ламинация">
              <div className="flex flex-wrap gap-2">
                {LAMINATIONS.map((l) => (
                  <PillButton
                    key={l.key}
                    active={state.lamination === l.key}
                    onClick={() => dispatch({ type: 'set-lamination', lamination: l.key })}
                  >
                    {l.label}
                  </PillButton>
                ))}
              </div>
            </Field>
          </div>

          <aside className="flex flex-col gap-5 rounded-2xl bg-violet p-6 text-violet-ink shadow-soft-lg md:p-8">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest opacity-75">
              Стоимость
            </p>
            <p className="font-display text-[clamp(2.25rem,6vw,3.75rem)] font-bold leading-none tracking-tight">
              {state.output ? formatPrice(state.output.price) : '—'}
              <span className="ml-2 text-2xl opacity-80">₽</span>
            </p>
            {state.output ? (
              <p className="font-mono text-xs uppercase tracking-widest opacity-80">
                {formatPrice(state.output.unitPrice)} ₽ / шт · от {state.output.leadTimeDays} дн
              </p>
            ) : (
              <p className="font-mono text-xs uppercase tracking-widest opacity-80">
                Заполните поля слева
              </p>
            )}
            <div className="mt-auto flex flex-col gap-3">
              <StickerButton
                href="/bystryj-zakaz"
                size="md"
                tone="yellow"
                className="w-full rounded-full"
              >
                Оформить заказ
              </StickerButton>
              <Link
                href="/kak-podgotovit-maket"
                className="text-center text-xs font-semibold uppercase tracking-widest opacity-80 hover:opacity-100"
              >
                Технические требования →
              </Link>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-widest opacity-70">
              Предварительный расчёт. Финальную цену подтвердит менеджер.
            </p>
          </aside>
        </div>
      </Container>
    </section>
  )
}

const MATERIALS: readonly { key: MaterialKey; label: string }[] = [
  { key: 'matte-white', label: 'Матовая' },
  { key: 'gloss', label: 'Глянец' },
  { key: 'transparent', label: 'Прозрачная' },
  { key: 'holo', label: 'Голография' },
]

const LAMINATIONS: readonly { key: LaminationKey; label: string }[] = [
  { key: 'none', label: 'Без ламинации' },
  { key: 'matte', label: 'Матовая' },
  { key: 'gloss', label: 'Глянцевая' },
]

const SIZE_PRESETS: readonly { label: string; w: number; h: number }[] = [
  { label: '5×5 см', w: 50, h: 50 },
  { label: '7×7 см', w: 70, h: 70 },
  { label: '10×10 см', w: 100, h: 100 },
  { label: '15×15 см', w: 150, h: 150 },
  { label: 'A6', w: 105, h: 148 },
  { label: 'A5', w: 148, h: 210 },
]

const QTY_PRESETS: readonly number[] = [100, 300, 500, 1000]

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-mono text-xs font-semibold uppercase tracking-widest text-cream-muted">
        {label}
      </span>
      {children}
    </div>
  )
}

function PillButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'inline-flex h-10 items-center rounded-full border-2 px-4 font-mono text-xs font-bold uppercase tracking-widest transition-[transform,background,border-color] duration-fast ease-out',
        active
          ? 'border-violet bg-violet text-violet-ink shadow-soft-lg'
          : 'border-line bg-bg-surface text-cream hover:-translate-y-[1px] hover:border-violet/60',
      )}
    >
      {children}
    </button>
  )
}

function CmInput({
  value,
  onChange,
  id,
  ...aria
}: {
  id: string
  value: number
  onChange: (cm: number) => void
  'aria-label': string
}) {
  return (
    <div className="relative">
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={1}
        max={1000}
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="h-12 w-full rounded-full border-2 border-line bg-bg-surface px-5 pr-12 font-mono text-base font-bold text-cream transition-colors focus:border-violet focus:outline-none"
        {...aria}
      />
      <span
        className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 font-mono text-xs uppercase tracking-widest text-cream-muted"
        aria-hidden="true"
      >
        см
      </span>
    </div>
  )
}

function formatPrice(n: number): string {
  return n.toLocaleString('ru-RU').replace(/,/g, ' ')
}
