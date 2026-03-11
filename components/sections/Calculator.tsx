'use client'

import { useState, useMemo } from 'react'
import clsx from 'clsx'
import { Button } from '@/components/ui/Button'
import { Tag } from '@/components/ui/Tag'
import {
  PRODUCTS, DISCOUNT_TIERS, URGENCY_LABELS,
  calculate, formatPrice,
  type CalcInput, type Urgency, type ProductSlug,
} from '@/lib/calculator'

// ─── MINI CALCULATOR (Hero widget) ─────────────────────────────────────────

export function MiniCalculator() {
  const [productSlug, setProductSlug] = useState<ProductSlug>('vinyl')
  const [qty, setQty] = useState(100)
  const [sizeIndex, setSizeIndex] = useState(2) // 100x100 default

  const product = PRODUCTS.find(p => p.slug === productSlug)!

  const result = useMemo(() => {
    try {
      return calculate({ productSlug, qty, sizeIndex: Math.min(sizeIndex, product.sizes.length - 2), urgency: 'standard', withDesign: false })
    } catch { return null }
  }, [productSlug, qty, sizeIndex, product.sizes.length])

  const activeTier = DISCOUNT_TIERS.find(t => qty >= t.minQty)

  return (
    <div
      className="bg-white border-[2.5px] border-dark rounded-[24px] p-7"
      style={{ boxShadow: '5px 5px 0 #282828' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="font-display font-black text-[16px] text-dark mb-0.5">Быстрый расчёт</div>
          <div className="text-[12px] text-n-400">Цена пересчитывается мгновенно</div>
        </div>
        <Tag variant="green" size="sm">В сети</Tag>
      </div>

      {/* Product tabs */}
      <div className="flex gap-1.5 flex-wrap mb-5">
        {PRODUCTS.map(p => (
          <button
            key={p.slug}
            onClick={() => { setProductSlug(p.slug); setSizeIndex(0) }}
            className={clsx(
              'px-3 py-[7px] rounded-full font-display font-extrabold text-[11px]',
              'border-2 border-dark transition-all duration-100 cursor-pointer',
              productSlug === p.slug
                ? 'bg-yellow text-dark [box-shadow:2px_2px_0_#282828]'
                : 'bg-transparent text-dark/60 hover:bg-n-50 [box-shadow:2px_2px_0_#282828]',
            )}
            style={{ boxShadow: '2px 2px 0 #282828' }}
          >
            {p.shortName}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-[11px] font-display font-black uppercase tracking-wide text-n-400 mb-1.5">
            Тираж (шт)
          </label>
          <input
            type="number"
            value={qty}
            min={product.minQty}
            max={10000}
            onChange={e => setQty(Math.max(product.minQty, Number(e.target.value)))}
            className="input-sticker"
          />
        </div>
        <div>
          <label className="block text-[11px] font-display font-black uppercase tracking-wide text-n-400 mb-1.5">
            Размер
          </label>
          <select
            value={sizeIndex}
            onChange={e => setSizeIndex(Number(e.target.value))}
            className="input-sticker appearance-none"
          >
            {product.sizes.slice(0, -1).map((s, i) => (
              <option key={i} value={i}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Qty slider */}
      <div className="mb-5">
        <input
          type="range"
          min={product.minQty}
          max={1000}
          value={qty}
          onChange={e => setQty(Number(e.target.value))}
          className="w-full h-[5px] rounded bg-n-100 border border-dark outline-none cursor-pointer appearance-none
                     [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                     [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-yellow
                     [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-dark
                     [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:[box-shadow:2px_2px_0_#282828]"
        />
        <div className="flex justify-between text-[10px] font-bold text-n-300 mt-1.5 font-display">
          <span>{product.minQty} шт</span>
          <span className="text-dark">{qty} шт</span>
          <span>1 000 шт</span>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div
          className="bg-yellow border-2 border-dark rounded-[16px] p-4 mb-3 flex items-center justify-between"
          style={{ boxShadow: '3px 3px 0 #282828' }}
        >
          <div>
            <div className="text-[11px] font-bold text-dark/50 mb-1">Итоговая стоимость</div>
            <div className="font-display font-black text-[32px] text-dark leading-none">{formatPrice(result.total)}</div>
            <div className="text-[12px] font-bold text-dark/50 mt-1">{formatPrice(result.perUnit)} / штука</div>
          </div>
          {result.discountPct > 0 && (
            <div className="bg-dark rounded-[12px] px-4 py-3 text-right">
              <div className="text-[10px] text-white/50 font-semibold mb-0.5">Скидка</div>
              <div className="font-display font-black text-[20px] text-yellow">−{result.discountPct}%</div>
              <div className="text-[10px] text-white/50">−{formatPrice(result.discountAmount)}</div>
            </div>
          )}
        </div>
      )}

      {/* CTA */}
      <Button variant="yellow" size="md" fullWidth>
        Оформить заказ →
      </Button>

      {/* Trust note */}
      <p className="text-center text-[11px] text-n-300 mt-3">
        Без предоплаты. Окончательная цена после согласования макета.
      </p>
    </div>
  )
}


// ─── FULL CALCULATOR (separate section) ─────────────────────────────────────

export function CalculatorSection() {
  const [productSlug, setProductSlug] = useState<ProductSlug>('vinyl')
  const [qty, setQty] = useState(100)
  const [sizeIndex, setSizeIndex] = useState(2)
  const [urgency, setUrgency] = useState<Urgency>('standard')
  const [withDesign, setWithDesign] = useState(false)

  const product = PRODUCTS.find(p => p.slug === productSlug)!

  const result = useMemo(() => {
    try {
      return calculate({ productSlug, qty, sizeIndex: Math.min(sizeIndex, product.sizes.length - 2), urgency, withDesign })
    } catch { return null }
  }, [productSlug, qty, sizeIndex, urgency, withDesign, product.sizes.length])

  return (
    <section id="calc" className="py-24 bg-n-50">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="section-eyebrow">Калькулятор</div>
          <h2 className="text-h2 font-display font-black text-dark mb-4">
            Рассчитайте стоимость онлайн
          </h2>
          <p className="text-[16px] text-n-400 max-w-[480px] mx-auto">
            Укажите параметры — получите точную цену без звонков и переписки.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">

          {/* Left — controls */}
          <div
            className="bg-white border-[2.5px] border-dark rounded-[24px] p-8"
            style={{ boxShadow: '5px 5px 0 #282828' }}
          >

            {/* Product select */}
            <div className="mb-6">
              <div className="text-[11px] font-display font-black uppercase tracking-wide text-n-400 mb-3">Тип стикеров</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PRODUCTS.map(p => (
                  <button
                    key={p.slug}
                    onClick={() => { setProductSlug(p.slug); setSizeIndex(0) }}
                    className={clsx(
                      'flex flex-col gap-1 p-3 rounded-[14px] border-2 text-left transition-all duration-100 cursor-pointer',
                      productSlug === p.slug
                        ? 'border-dark bg-yellow [box-shadow:3px_3px_0_#282828] -translate-x-[1px] -translate-y-[1px]'
                        : 'border-n-200 bg-white hover:border-dark',
                    )}
                  >
                    <span className="font-display font-black text-[13px] text-dark">{p.shortName}</span>
                    <span className="text-[11px] text-n-400 leading-tight">{p.desc}</span>
                    <span className="font-display font-black text-[12px] text-dark mt-1">от {p.basePrice} ₽/шт</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of params */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-[11px] font-display font-black uppercase tracking-wide text-n-400 mb-1.5">
                  Тираж (штук)
                </label>
                <input
                  type="number"
                  value={qty}
                  min={product.minQty}
                  onChange={e => setQty(Math.max(product.minQty, Number(e.target.value)))}
                  className="input-sticker"
                />
                <div className="text-[11px] text-n-300 mt-1">Минимум {product.minQty} шт</div>
              </div>
              <div>
                <label className="block text-[11px] font-display font-black uppercase tracking-wide text-n-400 mb-1.5">
                  Размер
                </label>
                <select
                  value={sizeIndex}
                  onChange={e => setSizeIndex(Number(e.target.value))}
                  className="input-sticker appearance-auto"
                >
                  {product.sizes.slice(0, -1).map((s, i) => (
                    <option key={i} value={i}>{s.label}</option>
                  ))}
                  <option value={product.sizes.length - 1}>Нестандартный размер</option>
                </select>
              </div>
            </div>

            {/* Urgency */}
            <div className="mb-5">
              <div className="text-[11px] font-display font-black uppercase tracking-wide text-n-400 mb-2">Срок производства</div>
              <div className="flex flex-col gap-2">
                {(Object.keys(URGENCY_LABELS) as Urgency[]).map(u => (
                  <label key={u} className="flex items-center gap-3 cursor-pointer">
                    <div
                      onClick={() => setUrgency(u)}
                      className={clsx(
                        'w-5 h-5 rounded-[5px] border-2 border-dark flex items-center justify-center flex-shrink-0 transition-all',
                        urgency === u ? 'bg-yellow [box-shadow:1.5px_1.5px_0_#282828]' : 'bg-white',
                      )}
                    >
                      {urgency === u && (
                        <span className="text-dark font-black text-[10px]">✓</span>
                      )}
                    </div>
                    <span className="text-[14px] font-semibold text-dark">{URGENCY_LABELS[u]}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* With design */}
            <label className="flex items-center gap-3 cursor-pointer p-3 bg-n-50 rounded-xl border-2 border-n-100 hover:border-dark transition-all">
              <div
                onClick={() => setWithDesign(!withDesign)}
                className={clsx(
                  'w-5 h-5 rounded-[5px] border-2 border-dark flex items-center justify-center flex-shrink-0 transition-all',
                  withDesign ? 'bg-yellow [box-shadow:1.5px_1.5px_0_#282828]' : 'bg-white',
                )}
              >
                {withDesign && <span className="text-dark font-black text-[10px]">✓</span>}
              </div>
              <div>
                <div className="text-[14px] font-bold text-dark">Разработать дизайн</div>
                <div className="text-[12px] text-n-400">+1 500 ₽ — делаем макет по вашему брифу</div>
              </div>
            </label>
          </div>

          {/* Right — result */}
          <div className="sticky top-24">
            {result && (
              <div
                className="bg-white border-[2.5px] border-dark rounded-[24px] p-6 mb-4"
                style={{ boxShadow: '5px 5px 0 #282828' }}
              >
                <div className="font-display font-black text-[14px] uppercase tracking-wide text-n-400 mb-4">Итого</div>

                {/* Price */}
                <div
                  className="bg-yellow border-2 border-dark rounded-[16px] p-5 mb-4"
                  style={{ boxShadow: '3px 3px 0 #282828' }}
                >
                  <div className="font-display font-black text-[40px] text-dark leading-none">{formatPrice(result.total)}</div>
                  <div className="text-[13px] font-bold text-dark/50 mt-1">{formatPrice(result.perUnit)} за штуку</div>
                </div>

                {/* Breakdown */}
                <div className="flex flex-col gap-2 text-[13px] mb-5">
                  <div className="flex justify-between">
                    <span className="text-n-400">Базовая стоимость</span>
                    <span className="font-bold">{formatPrice(result.priceBeforeDiscount)}</span>
                  </div>
                  {result.discountPct > 0 && (
                    <div className="flex justify-between text-success">
                      <span className="font-bold">Скидка за тираж {result.discountPct}%</span>
                      <span className="font-bold">−{formatPrice(result.discountAmount)}</span>
                    </div>
                  )}
                  {result.expressExtra > 0 && (
                    <div className="flex justify-between text-red">
                      <span>Срочность</span>
                      <span className="font-bold">+{formatPrice(result.expressExtra)}</span>
                    </div>
                  )}
                  {withDesign && (
                    <div className="flex justify-between">
                      <span className="text-n-400">Разработка дизайна</span>
                      <span className="font-bold">+1 500 ₽</span>
                    </div>
                  )}
                  <div className="h-px bg-n-100 my-1" />
                  <div className="flex justify-between font-display font-black text-[16px]">
                    <span>К оплате</span>
                    <span className="text-yellow [text-shadow:1px_1px_0_#282828]">{formatPrice(result.total)}</span>
                  </div>
                </div>

                <Button variant="yellow" size="md" fullWidth className="mb-3">
                  Оформить заказ →
                </Button>
                <Button variant="outline" size="md" fullWidth>
                  Задать вопрос менеджеру
                </Button>
              </div>
            )}

            {/* Discount tiers */}
            <div className="bg-white border-[2px] border-dark rounded-[18px] p-5" style={{ boxShadow: '3px 3px 0 #282828' }}>
              <div className="font-display font-black text-[12px] uppercase tracking-wide text-n-400 mb-3">Скидки за объём</div>
              <div className="grid grid-cols-4 gap-1.5">
                {[...DISCOUNT_TIERS].reverse().map(tier => {
                  const active = qty >= tier.minQty && (tier.pct === Math.max(...DISCOUNT_TIERS.filter(t => qty >= t.minQty).map(t => t.pct)))
                  return (
                    <div
                      key={tier.minQty}
                      className={clsx(
                        'rounded-[10px] p-2.5 text-center border-2 transition-all',
                        active
                          ? 'bg-yellow border-dark [box-shadow:2px_2px_0_#282828]'
                          : 'bg-n-50 border-n-200',
                      )}
                    >
                      <div className="font-display font-black text-[11px] mb-0.5 text-dark">{tier.label}</div>
                      <div className={clsx('font-display font-black text-[18px]', tier.pct === 0 ? 'text-n-300' : 'text-dark')}>
                        {tier.pct === 0 ? '—' : `−${tier.pct}%`}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
