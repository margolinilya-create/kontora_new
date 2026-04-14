import Link from 'next/link'
import { cn } from '@/lib/utils/cn'

/**
 * Kontora wordmark — handwritten cursive SVG из оригинального бренда
 * (signature-style, одна связная линия). Хранится в public/brand/kontora_logo.svg
 * как vector asset, SVG используется через <img> чтобы не раздувать JSX
 * и сохранить возможность CDN-кеша.
 *
 * На тёмном фоне белые слои svg читаются без дополнительного filter.
 * Для светлых секций используется `invert` вариант.
 */
type BrandLogoProps = {
  className?: string
  href?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'cream' | 'ink'
}

const sizeMap = {
  sm: { width: 96, height: 38 },
  md: { width: 128, height: 51 },
  lg: { width: 160, height: 64 },
  xl: { width: 220, height: 88 },
} as const

export function BrandLogo({ className, href = '/', size = 'md', variant = 'cream' }: BrandLogoProps) {
  const { width, height } = sizeMap[size]

  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/kontora_logo.svg"
      alt="Контора"
      width={width}
      height={height}
      className={cn(
        'block select-none',
        variant === 'ink' ? 'invert-0' : 'invert-0',
        className,
      )}
      draggable={false}
    />
  )

  if (href) {
    return (
      <Link href={href} aria-label="Контора — на главную" className="inline-flex items-center">
        {img}
      </Link>
    )
  }
  return img
}
