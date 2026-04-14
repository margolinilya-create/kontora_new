import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

export const tagVariants = cva(
  'inline-flex items-center gap-1.5 rounded-pill px-3 py-1 font-mono text-xs font-semibold uppercase tracking-widest',
  {
    variants: {
      tone: {
        yellow: 'bg-yellow text-yellow-ink',
        violet: 'bg-violet text-white',
        dark: 'bg-dark-3 text-cream/70',
        outline: 'border border-line text-cream/60',
        red: 'bg-red text-white',
      },
    },
    defaultVariants: { tone: 'dark' },
  },
)

type TagProps = VariantProps<typeof tagVariants> & {
  className?: string
  children: React.ReactNode
}

export function Tag({ tone, className, children }: TagProps) {
  return <span className={cn(tagVariants({ tone }), className)}>{children}</span>
}
