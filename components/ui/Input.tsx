import { forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, invalid, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        'h-12 w-full rounded-md border-2 border-line bg-dark-2 px-4 font-body text-cream placeholder:text-cream/30',
        'transition-colors duration-fast ease-out',
        'hover:border-cream/20 focus:border-yellow focus:outline-none',
        invalid && 'border-red',
        className,
      )}
      {...props}
    />
  )
})
