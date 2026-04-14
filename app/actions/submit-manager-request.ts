'use server'

import { managerRequestSchema } from '@/lib/forms/schemas'

/**
 * Server Action: приём заявки от менеджерской формы.
 *
 * M2 — mock: валидирует через Zod, логирует, возвращает success.
 * M5 — реальная отправка: Resend (email) + Telegram Bot API (дубль в чат).
 *
 * Возвращаемый тип совместим с формой — field errors + root error + ok.
 */

export type FormState = {
  ok: boolean
  error?: string
  fieldErrors?: Record<string, string>
}

export async function submitManagerRequest(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const raw = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    product: formData.get('product'),
    consent: formData.get('consent'),
  }

  const parsed = managerRequestSchema.safeParse(raw)
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]
      if (typeof key === 'string' && !fieldErrors[key]) {
        fieldErrors[key] = issue.message
      }
    }
    return { ok: false, fieldErrors, error: 'Проверьте заполнение полей' }
  }

  // TODO(M5): resend.emails.send + telegram.notify
  console.info('[kontora] manager request (mock)', {
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    product: parsed.data.product,
    receivedAt: new Date().toISOString(),
  })

  return { ok: true }
}
