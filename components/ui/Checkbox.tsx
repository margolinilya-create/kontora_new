import { forwardRef } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: React.ReactNode
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { className, label, id, ...props },
  ref,
) {
  const inputId = id ?? `chk-${Math.random().toString(36).slice(2, 8)}`
  return (
    <label htmlFor={inputId} className={cn('group flex cursor-pointer items-start gap-3', className)}>
      <span className="relative mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-sm border-2 border-line bg-dark-2 transition-colors duration-fast ease-out checked:border-yellow checked:bg-yellow hover:border-cream/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
          {...props}
        />
        <Check
          className="pointer-events-none relative h-3.5 w-3.5 text-yellow-ink opacity-0 transition-opacity duration-fast peer-checked:opacity-100"
          strokeWidth={4}
        />
      </span>
      <span className="text-sm text-cream/70">{label}</span>
    </label>
  )
})
