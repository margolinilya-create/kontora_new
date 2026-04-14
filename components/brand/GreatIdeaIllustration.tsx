import { cn } from '@/lib/utils/cn'

/**
 * Иллюстрация «Great Idea» — лампочка-стикер для CTA «Остались вопросы?».
 * До получения финальной иллюстрации от владельца — CSS/SVG версия
 * в брендовой стилистике (круглый жёлтый стикер с текстом).
 */
type Props = {
  className?: string
}

export function GreatIdeaIllustration({ className }: Props) {
  return (
    <div
      className={cn(
        'relative inline-flex h-40 w-40 items-center justify-center rounded-full  bg-yellow shadow-soft-lg md:h-56 md:w-56',
        '-rotate-6',
        className,
      )}
      aria-hidden="true"
    >
      <span className="pointer-events-none absolute -top-4 right-2 inline-flex h-8 w-8 items-center justify-center rounded-full  bg-violet text-xs font-bold text-white">
        !
      </span>
      <div className="text-center font-display uppercase text-yellow-ink">
        <div className="text-3xl font-bold leading-none md:text-4xl">GREAT</div>
        <div className="mt-1 text-3xl font-bold leading-none md:text-4xl">IDEA</div>
      </div>
    </div>
  )
}
