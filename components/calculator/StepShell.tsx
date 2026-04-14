import { cn } from '@/lib/utils/cn'

/**
 * Обёртка секции-шага калькулятора. Единый визуальный язык для всех шагов:
 * номер + заголовок + описание сверху, контент снизу, тонкая разделительная
 * линия между шагами.
 */
type StepShellProps = {
  id: string
  number: number
  title: string
  description?: string
  className?: string
  children: React.ReactNode
}

export function StepShell({ id, number, title, description, className, children }: StepShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn('border-t-2 border-line py-10 first:border-t-0 first:pt-0 md:py-14', className)}
    >
      <header className="mb-8 flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-yellow font-mono text-sm font-bold text-yellow">
          {String(number).padStart(2, '0')}
        </span>
        <div>
          <h2 id={`${id}-heading`} className="font-display text-2xl font-bold uppercase leading-tight md:text-3xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-2 max-w-xl text-pretty text-sm text-cream-muted">{description}</p>
          ) : null}
        </div>
      </header>
      {children}
    </section>
  )
}
