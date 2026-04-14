import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

/**
 * Kontora sticker card — переработано в M8 под Playful Character Premium:
 *   • 32px radius (было 22-24px)
 *   • ring + soft drop-shadow (было offset sticker-shadow)
 *   • hover lift без rotate (было tilt)
 *   • multi-color tone palette из новой палитры
 */
export const stickerCardVariants = cva(
  [
    'relative flex flex-col gap-4 rounded-lg p-6 md:p-7',
    'shadow-ring shadow-soft-sm',
    'transition-[transform,box-shadow] duration-fast ease-out',
  ],
  {
    variants: {
      tone: {
        yellow: 'bg-yellow text-yellow-ink',
        peach: 'bg-peach text-peach-ink',
        pink: 'bg-pink text-pink-ink',
        violet: 'bg-violet text-violet-ink',
        blue: 'bg-blue text-blue-ink',
        red: 'bg-red text-red-ink',
        cream: 'bg-bg-cream text-ink',
        surface: 'bg-bg-surface text-cream',
        'surface-2': 'bg-bg-surface-2 text-cream',
      },
      hover: {
        none: '',
        lift: 'hover:-translate-y-1 hover:shadow-ring-strong hover:shadow-soft-lg',
      },
    },
    defaultVariants: { tone: 'surface', hover: 'none' },
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
  hover,
  className,
  children,
}: StickerCardProps) {
  return <Tag className={cn(stickerCardVariants({ tone, hover }), className)}>{children}</Tag>
}
