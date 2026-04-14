import { forwardRef } from 'react'
import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

/**
 * Подпись бренда: кнопка с 6px offset-тенью без blur. На hover смещается
 * на -2/-2 и тень растёт до 10px — ощущение, что кнопку «вдавили» как стикер.
 *
 * Это НЕ декоративная кнопка — это главный CTA-паттерн Конторы. Любой
 * conversion-CTA должен идти через `<StickerButton>`, не через `<Button>`.
 */
export const stickerButtonVariants = cva(
  [
    'relative inline-flex items-center justify-center gap-2',
    'border-2 border-dark rounded-md',
    'font-display font-bold uppercase tracking-wider',
    'shadow-sticker',
    'transition-[transform,box-shadow] duration-fast ease-out',
    'hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-sticker-lg',
    'active:translate-x-0 active:translate-y-0 active:shadow-sticker-sm',
    'focus-visible:outline-none',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      tone: {
        yellow: 'bg-yellow text-yellow-ink',
        violet: 'bg-violet text-white',
        cream: 'bg-cream text-dark',
        dark: 'bg-dark text-cream',
      },
      size: {
        sm: 'h-10 px-4 text-sm',
        md: 'h-12 px-6 text-base',
        lg: 'h-14 px-8 text-lg',
        xl: 'h-16 px-10 text-xl',
      },
    },
    defaultVariants: { tone: 'yellow', size: 'md' },
  },
)

type BaseProps = VariantProps<typeof stickerButtonVariants> & {
  className?: string
  children: React.ReactNode
}

type AsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined
  }

type AsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps | 'href'> & {
    href: string
  }

export type StickerButtonProps = AsButton | AsLink

export const StickerButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, StickerButtonProps>(
  function StickerButton(props, ref) {
    const { tone, size, className, children } = props
    const classes = cn(stickerButtonVariants({ tone, size }), className)

    if ('href' in props && props.href !== undefined) {
      const { href, ...rest } = props as AsLink
      return (
        <Link
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </Link>
      )
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    )
  },
)
