import { cn } from '@/lib/utils/cn'

type ContainerProps = {
  as?: 'div' | 'section' | 'article' | 'header' | 'footer' | 'main'
  size?: 'sm' | 'md' | 'lg' | 'full'
  className?: string
  children: React.ReactNode
}

const sizeClasses = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  full: 'max-w-none',
} as const

export function Container({ as: Tag = 'div', size = 'lg', className, children }: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full px-6 md:px-8 lg:px-10', sizeClasses[size], className)}>
      {children}
    </Tag>
  )
}
