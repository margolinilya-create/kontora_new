import { Resend } from 'resend'

/**
 * Инициализация Resend клиента. Если `RESEND_API_KEY` не задан
 * (например, в dev без .env.local), возвращаем null — Server Action
 * gracefully fallback'нется на console.log.
 *
 * В production без RESEND_API_KEY форма всё ещё работает
 * (валидация + success UI), но письмо не уходит — с предупреждением
 * в логах сервера.
 */
let cached: Resend | null | undefined

export function getResendClient(): Resend | null {
  if (cached !== undefined) return cached

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    cached = null
    return null
  }

  cached = new Resend(apiKey)
  return cached
}

export function getMailFrom(): string {
  return process.env.RESEND_FROM ?? 'onboarding@resend.dev'
}

export function getMailTo(): string {
  return process.env.RESEND_TO ?? 'hello@kontora.su'
}
