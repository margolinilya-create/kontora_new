import { forwardRef } from 'react'
import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

/**
 * Kontora primary CTA. Переработано в M8 под Playful Character Premium:
 *   • 32px radius (soft rounded, не brutal sharp)
 *   • ring outline shadow (не offset sticker-shadow)
 *   • hover — soft floating lift через translateY + glow
 *   • backdrop blend для glassmorphism в tone-cream
 *
 * Имя компонента оставлено для обратной совместимости (StickerButton),
 * но семантика теперь — FloatButton.
 */
export const stickerButtonVariants = cva(
  [
    'relative inline-flex items-center justify-center gap-2',
    'rounded-lg font-display font-semibold uppercase tracking-wide',
    'shadow-ring',
    'transition-[transform,box-shadow,background] duration-fast ease-out',
    'hover:-translate-y-[2px] hover:shadow-soft-lg',
    'active:translate-y-0 active:shadow-ring',
    'focus-visible:outline-none',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      tone: {
        yellow: 'bg-yellow text-yellow-ink hover:shadow-glow-yellow',
        peach: 'bg-peach text-peach-ink hover:shadow-glow-peach',
        pink: 'bg-pink text-pink-ink hover:shadow-glow-pink',
        violet: 'bg-violet text-violet-ink hover:shadow-glow-violet',
        cream: 'bg-bg-cream text-ink hover:shadow-soft-lg',
        dark: 'bg-bg-surface-2 text-cream shadow-ring-strong',
        ghost: 'bg-transparent text-cream shadow-ring-strong hover:bg-bg-surface',
      },
      size: {
        sm: 'h-10 px-5 text-sm',
        md: 'h-12 px-6 text-base',
        lg: 'h-14 px-8 text-base',
        xl: 'h-16 px-10 text-lg',
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
      // ВАЖНО: исключаем tone/size/className/children из rest,
      // иначе spread перетирает computed classes и ломает стили.
      const {
        href,
        tone: _tone,
        size: _size,
        className: _className,
        children: _children,
        ...rest
      } = props as AsLink
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

    const {
      tone: _tone,
      size: _size,
      className: _className,
      children: _children,
      ...buttonProps
    } = props as AsButton
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
