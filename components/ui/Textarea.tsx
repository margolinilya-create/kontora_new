import { forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, invalid, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        'min-h-[120px] w-full rounded-md border-2 border-line bg-dark-2 px-4 py-3 font-body text-cream placeholder:text-cream/30',
        'transition-colors duration-fast ease-out',
        'hover:border-cream/20 focus:border-yellow focus:outline-none',
        invalid && 'border-red',
        className,
      )}
      {...props}
    />
  )
})
