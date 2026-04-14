import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

/**
 * Карточка продукта в каталоге «Выбирай, что клеится тебе».
 * 2×3 сетка на desktop, 1 колонка на mobile. На hover — лёгкий lift + sticker-shadow.
 */
type ProductCardProps = {
  href: string
  label: string
  title: string
  description: string
  className?: string
}

export function ProductCard({ href, label, title, description, className }: ProductCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group relative flex flex-col gap-6 rounded-xl border-2 border-dark bg-dark-2 p-6 md:p-8',
        'shadow-sticker transition-[transform,box-shadow] duration-fast ease-out',
        'hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-sticker-lg',
        'focus-visible:-translate-x-[3px] focus-visible:-translate-y-[3px]',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-widest text-yellow">{label}</span>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow text-yellow-ink transition-transform duration-fast group-hover:rotate-[-15deg]">
          <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
        </span>
      </div>

      <div className="mt-auto space-y-3">
        <h3 className="text-balance font-display text-2xl font-bold uppercase leading-tight text-cream group-hover:text-yellow">
          {title}
        </h3>
        <p className="text-pretty text-sm text-cream/60">{description}</p>
      </div>
    </Link>
  )
}
