import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Объединяет classname-значения и разрешает конфликты Tailwind-классов
 * (последний побеждает). Используется везде вместо template literals.
 *
 * @example
 *   cn('px-4 py-2', isActive && 'bg-yellow', className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
