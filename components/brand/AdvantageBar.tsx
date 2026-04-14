import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

/**
 * Горизонтальная цветная полоса для секции «Почему выбирают нас».
 * Содержит крупный номер слева, заголовок + описание в центре.
 * 5 тонов (yellow/violet/red/cream/dark), каждая полоса — sticker-shadow.
 */
const advantageBarVariants = cva(
  [
    'relative flex items-start gap-6 rounded-lg border-2 border-dark p-6 md:flex-row md:items-center md:gap-10 md:p-8',
    'shadow-sticker transition-transform duration-fast ease-out',
    'hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-sticker-lg',
  ],
  {
    variants: {
      tone: {
        yellow: 'bg-yellow text-yellow-ink',
        violet: 'bg-violet text-white',
        red: 'bg-red text-white',
        cream: 'bg-cream text-dark',
        dark: 'bg-dark-2 text-cream',
      },
    },
    defaultVariants: { tone: 'yellow' },
  },
)

type AdvantageBarProps = VariantProps<typeof advantageBarVariants> & {
  number: string
  title: string
  body: string
  className?: string
}

export function AdvantageBar({ tone, number, title, body, className }: AdvantageBarProps) {
  return (
    <div className={cn(advantageBarVariants({ tone }), className)}>
      <span className="font-display text-[clamp(3rem,6vw,5.5rem)] font-bold leading-none tracking-tighter opacity-90">
        {number}
      </span>
      <div className="flex-1 space-y-2">
        <h3 className="text-balance font-display text-lg font-bold uppercase leading-tight md:text-2xl">
          {title}
        </h3>
        <p className="text-pretty text-sm opacity-85 md:text-base">{body}</p>
      </div>
    </div>
  )
}
