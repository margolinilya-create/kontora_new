import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

/**
 * База для карточек с «наклеенным» видом: толстая рамка + sticker-shadow +
 * опциональный поворот на несколько градусов. Используется в секциях
 * «Кому подойдут наши наклейки», «Почему выбирают нас», каталоге продукции.
 */
export const stickerCardVariants = cva(
  [
    'relative flex flex-col gap-4 rounded-lg border-2 border-dark p-6',
    'shadow-sticker transition-transform duration-fast ease-out',
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
      tilt: {
        none: '',
        left: '-rotate-2',
        right: 'rotate-2',
        softLeft: '-rotate-1',
        softRight: 'rotate-1',
      },
      hover: {
        none: '',
        lift: 'hover:-translate-y-1 hover:rotate-0 hover:shadow-sticker-lg',
      },
    },
    defaultVariants: { tone: 'cream', tilt: 'none', hover: 'none' },
  },
)

type StickerCardProps = VariantProps<typeof stickerCardVariants> & {
  as?: 'div' | 'article' | 'li'
  className?: string
  children: React.ReactNode
}

export function StickerCard({
  as: Tag = 'div',
  tone,
  tilt,
  hover,
  className,
  children,
}: StickerCardProps) {
  return (
    <Tag className={cn(stickerCardVariants({ tone, tilt, hover }), className)}>{children}</Tag>
  )
}
