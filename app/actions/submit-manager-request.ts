'use server'

import { managerRequestSchema } from '@/lib/forms/schemas'
import { sendManagerRequestEmail } from '@/lib/email/send'
import { products } from '@/lib/products'

/**
 * Server Action: приём заявки от менеджерской формы.
 *
 * Валидация Zod → отправка через Resend (если настроен RESEND_API_KEY).
 * Если ключ не задан — graceful fallback в console.warn, форма всё равно
 * показывает success state (чтобы не ломать UX до настройки owner'ом).
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

  const productLabel =
    products.find((p) => p.slug === parsed.data.product)?.label ?? parsed.data.product

  const result = await sendManagerRequestEmail({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    product: productLabel,
  })

  if (!result.ok) {
    return {
      ok: false,
      error: 'Не удалось отправить заявку. Попробуйте позже или напишите на hello@kontora.su.',
    }
  }

  return { ok: true }
}
