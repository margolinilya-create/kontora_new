import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

/**
 * Горизонтальная цветная полоса для секции «Почему выбирают нас».
 * M8: переработано под новую палитру (5 тонов) и soft-floating стилистику.
 */
const advantageBarVariants = cva(
  [
    'relative flex items-start gap-6 rounded-lg p-6 md:flex-row md:items-center md:gap-10 md:p-10',
    'shadow-ring shadow-soft-sm',
    'transition-[transform,box-shadow] duration-fast ease-out',
    'hover:-translate-y-1 hover:shadow-ring-strong hover:shadow-soft-lg',
  ],
  {
    variants: {
      tone: {
        yellow: 'bg-yellow text-yellow-ink',
        peach: 'bg-peach text-peach-ink',
        pink: 'bg-pink text-pink-ink',
        violet: 'bg-violet text-violet-ink',
        blue: 'bg-blue text-blue-ink',
        cream: 'bg-bg-cream text-ink',
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
      <span className="font-display text-[clamp(3rem,5vw,4.5rem)] font-bold leading-none tracking-tighter opacity-90">
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
