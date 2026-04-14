import { cn } from '@/lib/utils/cn'

/**
 * Жёлтый маркер-подсветка слова/фразы в заголовке. Подпись бренда №2.
 * Реализовано как box-decoration-break для корректных переносов на mobile
 * и rotate(-1deg) для «живого» ощущения — как будто прошлись маркером.
 */
type YellowMarkerProps = {
  children: React.ReactNode
  className?: string
  /** skew угол в градусах, по умолчанию -1 (лёгкий) */
  skew?: 0 | -1 | -2
}

const skewMap = {
  0: 'rotate-0',
  '-1': '-rotate-1',
  '-2': '-rotate-2',
} as const

export function YellowMarker({ children, className, skew = -1 }: YellowMarkerProps) {
  return (
    <span
      className={cn(
        'inline-block bg-yellow px-2 text-yellow-ink',
        'box-decoration-clone',
        skewMap[skew],
        className,
      )}
    >
      {children}
    </span>
  )
}
