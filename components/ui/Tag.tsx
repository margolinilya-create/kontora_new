import clsx from 'clsx'

type TagVariant = 'yellow' | 'red' | 'blue' | 'dark' | 'white' | 'green'
type TagSize = 'sm' | 'md'

interface TagProps {
  variant?: TagVariant
  size?: TagSize
  rotate?: boolean
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<TagVariant, string> = {
  yellow: 'bg-yellow text-dark',
  red:    'bg-red text-white',
  blue:   'bg-blue text-white',
  dark:   'bg-dark text-white',
  white:  'bg-white text-dark',
  green:  'bg-success text-white',
}

const sizeStyles: Record<TagSize, string> = {
  sm: 'text-[10px] px-[10px] py-[4px]',
  md: 'text-[11px] px-3 py-[5px]',
}

export function Tag({ variant = 'yellow', size = 'md', rotate, children, className }: TagProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1',
        'font-display font-extrabold rounded-full',
        'border-2 border-dark',
        '[box-shadow:2px_2px_0_#282828]',
        variantStyles[variant],
        sizeStyles[size],
        rotate && '-rotate-2',
        className,
      )}
    >
      {children}
    </span>
  )
}

// Status chip for admin
type StatusVariant = 'new' | 'design' | 'print' | 'cut' | 'pack' | 'ship' | 'done' | 'cancel'

const statusStyles: Record<StatusVariant, string> = {
  new:    'bg-yellow/15 text-[#8A6200]',
  design: 'bg-purple-500/10 text-purple-700',
  print:  'bg-blue/10 text-[#0070A0]',
  cut:    'bg-orange-400/10 text-orange-700',
  pack:   'bg-teal-500/10 text-teal-700',
  ship:   'bg-orange-500/10 text-orange-600',
  done:   'bg-success/10 text-green-700',
  cancel: 'bg-error/10 text-red-700',
}

const statusLabels: Record<StatusVariant, string> = {
  new:    'Новый',
  design: 'Макет',
  print:  'Печать',
  cut:    'Вырубка',
  pack:   'Упаковка',
  ship:   'Отправлен',
  done:   'Выполнен',
  cancel: 'Отменён',
}

interface StatusChipProps {
  status: StatusVariant
  className?: string
}

export function StatusChip({ status, className }: StatusChipProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5',
        'px-3 py-1 rounded-full',
        'text-[12px] font-bold font-body',
        statusStyles[status],
        className,
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
      {statusLabels[status]}
    </span>
  )
}
