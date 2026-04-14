'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

/**
 * Нативный аккордеон на базе <details>/<summary>. Без Radix, без @headlessui.
 * Клиентский потому что мы переопределяем стрелку и анимируем открытие.
 * На `prefers-reduced-motion: reduce` анимация через CSS vars уходит в 0ms.
 */

export type AccordionItem = {
  id: string
  question: string
  answer: string
}

type AccordionProps = {
  items: readonly AccordionItem[]
  className?: string
}

export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className={cn('divide-y divide-line', className)}>
      {items.map((item) => {
        const isOpen = openId === item.id
        return (
          <div key={item.id}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`panel-${item.id}`}
              id={`trigger-${item.id}`}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-lg font-bold text-cream transition-colors duration-fast hover:text-yellow"
            >
              <span className="text-balance">{item.question}</span>
              <span
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-yellow text-yellow-ink transition-transform duration-fast ease-out',
                  isOpen && 'rotate-45',
                )}
              >
                <Plus className="h-5 w-5" strokeWidth={3} />
              </span>
            </button>
            <div
              id={`panel-${item.id}`}
              role="region"
              aria-labelledby={`trigger-${item.id}`}
              hidden={!isOpen}
              className="pb-6 pr-12 text-cream-soft"
            >
              {item.answer}
            </div>
          </div>
        )
      })}
    </div>
  )
}
