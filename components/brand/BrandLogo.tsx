import Link from 'next/link'
import { cn } from '@/lib/utils/cn'

/**
 * Логотип «Контора» — стилизованный word-mark. До получения финального SVG
 * от владельца это типографический лого на Druk Wide / Onest Display fallback.
 *
 * TODO(M1+): заменить на кастомный SVG когда владелец предоставит
 * финальный файл бренда (вероятно придёт вместе с фото продукции).
 */
type BrandLogoProps = {
  className?: string
  href?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-4xl',
} as const

export function BrandLogo({ className, href = '/', size = 'md' }: BrandLogoProps) {
  const content = (
    <span
      className={cn(
        'inline-flex items-center gap-2 font-display font-bold uppercase tracking-tighter text-cream',
        sizeMap[size],
        className,
      )}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-md border-2 border-yellow bg-dark text-yellow">
        К
      </span>
      Контора
    </span>
  )

  if (href) {
    return (
      <Link href={href} aria-label="Контора — на главную" className="inline-flex">
        {content}
      </Link>
    )
  }
  return content
}
