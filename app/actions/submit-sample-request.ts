'use server'

import { sampleRequestSchema } from '@/lib/forms/schemas'
import type { FormState } from './submit-manager-request'

/**
 * Server Action: заявка на образец (анкета PDF §2.8).
 * M3 — mock: валидация через Zod, логирование, success.
 * M5 — реальная отправка через Resend + Telegram.
 */
export async function submitSampleRequest(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const raw = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    comment: formData.get('comment') || undefined,
    consent: formData.get('consent'),
  }

  const parsed = sampleRequestSchema.safeParse(raw)
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

  // TODO(M5): resend + telegram
  console.info('[kontora] sample request (mock)', {
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    comment: parsed.data.comment,
    receivedAt: new Date().toISOString(),
  })

  return { ok: true }
}
