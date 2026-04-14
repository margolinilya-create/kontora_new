import { cn } from '@/lib/utils/cn'

/**
 * Inline highlighter для акцентных слов в display-заголовках.
 * В M8 переосмыслено: вместо yellow marker используем **гибкие цветовые
 * акценты** (yellow/peach/pink/violet/blue) — под новую multi-accent палитру.
 */
type MarkerProps = {
  children: React.ReactNode
  className?: string
  tone?: 'yellow' | 'peach' | 'pink' | 'violet' | 'blue'
}

const toneMap = {
  yellow: 'text-yellow',
  peach: 'text-peach',
  pink: 'text-pink',
  violet: 'text-violet',
  blue: 'text-blue',
} as const

export function YellowMarker({ children, className, tone = 'yellow' }: MarkerProps) {
  return <span className={cn('inline font-display', toneMap[tone], className)}>{children}</span>
}
