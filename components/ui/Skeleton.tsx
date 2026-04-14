import { cn } from '@/lib/utils/cn'

type SkeletonProps = {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-dark-3',
        className,
      )}
      aria-hidden="true"
    />
  )
}
