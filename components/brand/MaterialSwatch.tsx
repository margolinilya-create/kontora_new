import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils/cn'

/**
 * Визуальный образец плёнки для секции «Материалы». До получения
 * реальных фото от владельца — CSS-образец с цветом/градиентом.
 */
type MaterialSwatchProps = {
  name: string
  description: string
  /** CSS value: hex, var(--token), linear-gradient, etc. */
  colorVar: string
  textColorVar: string
  className?: string
}

export function MaterialSwatch({
  name,
  description,
  colorVar,
  textColorVar,
  className,
}: MaterialSwatchProps) {
  const style: CSSProperties = {
    background: colorVar,
    color: textColorVar,
  }

  return (
    <article
      className={cn(
        'group relative flex h-64 w-56 shrink-0 flex-col justify-between rounded-xl border-2 border-dark p-5 shadow-sticker transition-transform duration-fast ease-out hover:-translate-y-1 hover:shadow-sticker-lg',
        className,
      )}
      style={style}
    >
      <span className="font-mono text-xs uppercase tracking-widest opacity-70">Плёнка</span>
      <div className="space-y-2">
        <h3 className="font-display text-xl font-bold uppercase leading-tight">{name}</h3>
        <p className="text-pretty text-xs opacity-75">{description}</p>
      </div>
    </article>
  )
}
