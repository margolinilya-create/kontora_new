'use server'

import { sampleRequestSchema } from '@/lib/forms/schemas'
import { sendSampleRequestEmail } from '@/lib/email/send'
import type { FormState } from './submit-manager-request'

/**
 * Server Action: заявка на образец (анкета PDF §2.8).
 * Валидация Zod → отправка через Resend (graceful fallback без RESEND_API_KEY).
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

  const result = await sendSampleRequestEmail({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    comment: parsed.data.comment,
  })

  if (!result.ok) {
    return {
      ok: false,
      error: 'Не удалось отправить заявку. Попробуйте позже или напишите на hello@kontora.su.',
    }
  }

  return { ok: true }
}
