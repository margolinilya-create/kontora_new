import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

/**
 * Product card — переработан в M8:
 *   • 32px radius
 *   • soft-floating shadow (ring + drop)
 *   • реальная PNG иконка категории из public/brand/types/
 *     (вместо CSS-плейсхолдера)
 *   • hover — translateY + усиление тени (antigravity)
 */
type ProductCardProps = {
  href: string
  label: string
  title: string
  description: string
  iconSrc?: string
  className?: string
}

export function ProductCard({
  href,
  label,
  title,
  description,
  iconSrc,
  className,
}: ProductCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group relative flex h-full flex-col gap-6 overflow-hidden rounded-lg bg-bg-surface p-6 md:p-8',
        'shadow-ring shadow-soft-sm',
        'transition-[transform,box-shadow] duration-fast ease-out',
        'hover:-translate-y-1 hover:shadow-ring-strong hover:shadow-soft-lg',
        'focus-visible:-translate-y-1',
        className,
      )}
    >
      {iconSrc ? (
        <div className="relative h-32 w-full overflow-hidden rounded-md bg-bg-surface-2 p-4">
          <Image
            src={iconSrc}
            alt=""
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 90vw"
            className="object-contain transition-transform duration-slow ease-out group-hover:scale-105"
          />
        </div>
      ) : null}

      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-widest text-yellow">{label}</span>
        <span className="flex h-10 w-10 items-center justify-center rounded-pill bg-yellow text-yellow-ink transition-transform duration-fast group-hover:translate-x-1">
          <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </span>
      </div>

      <div className="mt-auto space-y-3">
        <h3 className="text-balance font-display text-xl font-bold leading-tight text-cream group-hover:text-yellow md:text-2xl">
          {title}
        </h3>
        <p className="text-pretty text-sm text-cream-muted">{description}</p>
      </div>
    </Link>
  )
}
