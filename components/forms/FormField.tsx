import { cn } from '@/lib/utils/cn'

/**
 * Обёртка label + hint + error для input-элементов в формах.
 * Связывает label с полем через `htmlFor` и ошибку через `aria-describedby`.
 */
type FormFieldProps = {
  label: string
  htmlFor: string
  hint?: string
  error?: string
  required?: boolean
  className?: string
  children: React.ReactNode
}

export function FormField({
  label,
  htmlFor,
  hint,
  error,
  required,
  className,
  children,
}: FormFieldProps) {
  const errorId = error ? `${htmlFor}-error` : undefined
  const hintId = hint ? `${htmlFor}-hint` : undefined
  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined

  return (
    <div className={cn('flex flex-col gap-2', className)} data-described-by={describedBy}>
      <label
        htmlFor={htmlFor}
        className="font-mono text-xs font-semibold uppercase tracking-widest text-cream-muted"
      >
        {label}
        {required ? <span className="ml-1 text-yellow">*</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={hintId} className="text-xs text-cream-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-xs text-red" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
