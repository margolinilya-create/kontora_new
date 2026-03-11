'use client'

import Link from 'next/link'
import clsx from 'clsx'
import { Tag } from '@/components/ui/Tag'
import { Button } from '@/components/ui/Button'
import { PRODUCTS, formatPrice } from '@/lib/calculator'

const PRODUCT_ICONS: Record<string, string> = {
  'vinyl':        '🏷️',
  '3d-epoxy':     '💎',
  'dtf':          '👕',
  'die-cut':      '✂️',
  'sticker-pack': '📦',
}

const PRODUCT_BG: Record<string, string> = {
  'vinyl':        'bg-yellow',
  '3d-epoxy':     'bg-blue',
  'dtf':          'bg-red',
  'die-cut':      'bg-dark',
  'sticker-pack': 'bg-[#9B59B6]',
}

const PRODUCT_TEXT_COLOR: Record<string, string> = {
  'vinyl':        'text-dark',
  '3d-epoxy':     'text-white',
  'dtf':          'text-white',
  'die-cut':      'text-white',
  'sticker-pack': 'text-white',
}

export function CatalogSection() {
  return (
    <section id="catalog" className="py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="section-eyebrow">Каталог</div>
            <h2 className="font-display font-black text-[32px] text-dark leading-tight">
              5 видов стикеров<br />на любой случай
            </h2>
          </div>
          <p className="text-[15px] text-n-400 max-w-[340px] leading-relaxed">
            От классического винила до объёмного 3D. Тираж от 10 штук, доставка по всей России.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRODUCTS.map((product, i) => (
            <div
              key={product.slug}
              className={clsx(
                'card-sticker group',
                'flex flex-col overflow-hidden',
                // Make first card wide on large screens
                i === 0 && 'lg:col-span-2',
              )}
            >
              {/* Visual area */}
              <div
                className={clsx(
                  'relative flex items-center justify-center',
                  PRODUCT_BG[product.slug],
                  i === 0 ? 'h-[180px]' : 'h-[140px]',
                )}
              >
                {/* Icon */}
                <span className="text-[64px] select-none" style={{ filter: 'drop-shadow(2px 3px 0 rgba(0,0,0,0.18))' }}>
                  {PRODUCT_ICONS[product.slug]}
                </span>

                {/* Tag */}
                <div className="absolute top-4 left-4">
                  <Tag
                    variant={product.tagColor}
                    size="sm"
                    rotate
                  >
                    {product.tag}
                  </Tag>
                </div>

                {/* Popular badge */}
                {product.popular && (
                  <div className="absolute top-4 right-4 bg-dark text-white font-display font-black text-[10px] px-2.5 py-1 rounded-full border border-white/20">
                    Популярное
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col flex-1">
                {/* Name & desc */}
                <h3 className="font-display font-black text-[17px] text-dark mb-1.5">
                  {product.name}
                </h3>
                <p className="text-[13px] text-n-400 leading-relaxed mb-4 flex-1">
                  {product.desc}
                </p>

                {/* Features (only on wide card) */}
                {i === 0 && (
                  <ul className="flex flex-col gap-1.5 mb-4">
                    {product.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-[12px] text-n-600">
                        <span className="w-4 h-4 bg-yellow border border-dark rounded-full flex items-center justify-center text-[9px] font-black flex-shrink-0">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Price + CTA */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t-2 border-n-100">
                  <div>
                    <div className="font-display font-black text-[20px] text-dark leading-none">
                      от {product.basePrice} ₽
                    </div>
                    <div className="text-[11px] text-n-300 mt-0.5 font-semibold">за штуку · тираж от {product.minQty} шт</div>
                  </div>
                  <Link href={`/catalog/${product.slug}`}>
                    <Button variant="yellow" size="sm">
                      Заказать →
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <Link href="/catalog">
            <Button variant="outline" size="md">
              Смотреть весь каталог
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
