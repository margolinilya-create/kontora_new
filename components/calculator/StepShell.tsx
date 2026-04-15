import { cn } from '@/lib/utils/cn'

/**
 * Обёртка секции калькулятора. Inline-layout (не wizard): без
 * номеров «01–06», компактная типографика, тонкий разделитель.
 * Пропс `number` оставлен в интерфейсе для обратной совместимости
 * с существующими Step* компонентами, но визуально не рендерится.
 */
type StepShellProps = {
  id: string
  number: number
  title: string
  description?: string
  className?: string
  children: React.ReactNode
}

export function StepShell({ id, title, description, className, children }: StepShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(
        'border-t border-line py-8 first:border-t-0 first:pt-0 md:py-10',
        className,
      )}
    >
      <header className="mb-6 flex flex-col gap-2">
        <h2
          id={`${id}-heading`}
          className="font-display text-xl font-bold uppercase leading-tight tracking-tight md:text-2xl"
        >
          {title}
        </h2>
        {description ? (
          <p className="max-w-xl text-pretty text-sm text-cream-muted">{description}</p>
        ) : null}
      </header>
      {children}
    </section>
  )
}
