import { forwardRef } from 'react'
import clsx from 'clsx'

type BtnVariant = 'yellow' | 'red' | 'dark' | 'outline' | 'white' | 'blue' | 'ghost'
type BtnSize    = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariant
  size?: BtnSize
  href?: string
  fullWidth?: boolean
  loading?: boolean
}

const variantStyles: Record<BtnVariant, string> = {
  yellow:  'bg-yellow text-dark border-dark',
  red:     'bg-red text-white border-dark',
  dark:    'bg-dark text-white border-dark',
  outline: 'bg-transparent text-dark border-dark hover:bg-dark hover:text-white',
  white:   'bg-white text-dark border-dark',
  blue:    'bg-blue text-white border-dark',
  ghost:   'bg-transparent text-n-400 border-transparent shadow-none hover:bg-n-100 hover:text-dark',
}

const sizeStyles: Record<BtnSize, string> = {
  sm: 'text-[12px] px-[18px] py-[9px]',
  md: 'text-[14px] px-7 py-[13px]',
  lg: 'text-[17px] px-10 py-[17px]',
}

const shadowStyles: Record<BtnVariant, string> = {
  yellow:  '[box-shadow:3px_3px_0_#282828] hover:[box-shadow:5px_5px_0_#282828]',
  red:     '[box-shadow:3px_3px_0_#282828] hover:[box-shadow:5px_5px_0_#282828]',
  dark:    '[box-shadow:3px_3px_0_rgba(0,0,0,0.3)] hover:[box-shadow:5px_5px_0_rgba(0,0,0,0.3)]',
  outline: '[box-shadow:3px_3px_0_#282828] hover:[box-shadow:5px_5px_0_#282828]',
  white:   '[box-shadow:3px_3px_0_#282828] hover:[box-shadow:5px_5px_0_#282828]',
  blue:    '[box-shadow:3px_3px_0_#282828] hover:[box-shadow:5px_5px_0_#282828]',
  ghost:   '',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'yellow', size = 'md', fullWidth, loading, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          // Base
          'inline-flex items-center justify-center gap-2',
          'font-display font-extrabold rounded-full',
          'border-[2.5px]',
          'transition-all duration-100',
          'active:translate-x-[2px] active:translate-y-[2px] active:[box-shadow:0_0_0_transparent]',
          'hover:-translate-x-[1px] hover:-translate-y-[1px]',
          'select-none cursor-pointer',
          'disabled:opacity-50 disabled:pointer-events-none',
          // Variant
          variantStyles[variant],
          shadowStyles[variant],
          // Size
          sizeStyles[size],
          // Full width
          fullWidth && 'w-full',
          className,
        )}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Загрузка...
          </span>
        ) : children}
      </button>
    )
  }
)

Button.displayName = 'Button'
