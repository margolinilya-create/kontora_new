import { forwardRef } from 'react'
import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

/**
 * Базовая кнопка. Примитив без sticker-эффекта — для UI-контролов в формах,
 * модалках, tabs. Бренд-sticker-кнопка живёт в `components/brand/StickerButton`.
 */
export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'whitespace-nowrap rounded-md font-body font-semibold',
    'transition-colors duration-fast ease-out',
    'focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        solid: 'bg-yellow text-yellow-ink hover:bg-yellow/90',
        ghost: 'bg-transparent text-cream hover:bg-bg-surface-2',
        outline: 'border-2 border-cream/20 bg-transparent text-cream hover:border-yellow hover:text-yellow',
        violet: 'bg-violet text-white hover:bg-violet/90',
        danger: 'bg-red text-white hover:bg-red/90',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-5 text-base',
        lg: 'h-13 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'solid',
      size: 'md',
    },
  },
)

type BaseProps = VariantProps<typeof buttonVariants> & {
  className?: string
  children: React.ReactNode
}

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined
  }

type ButtonAsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps | 'href'> & {
    href: string
  }

export type ButtonProps = ButtonAsButton | ButtonAsLink

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(props, ref) {
    const { variant, size, className, children } = props
    const classes = cn(buttonVariants({ variant, size }), className)

    if ('href' in props && props.href !== undefined) {
      const { href, ...anchorProps } = props as ButtonAsLink
      return (
        <Link
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          {...(anchorProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </Link>
      )
    }

    const { ...buttonProps } = props as ButtonAsButton
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...(buttonProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    )
  },
)
