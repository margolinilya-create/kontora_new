import { getMailFrom, getMailTo, getResendClient } from './client'
import { ManagerRequestEmail } from './templates/ManagerRequestEmail'
import { SampleRequestEmail } from './templates/SampleRequestEmail'

/**
 * Helper-функции для отправки писем из Server Actions.
 * Graceful fallback: если Resend не настроен (dev без .env.local) —
 * логируем в console и возвращаем `ok: true`, чтобы UX формы не ломался.
 */

type SendResult = { ok: true } | { ok: false; error: string }

export type ManagerRequestEmailPayload = {
  name: string
  email: string
  phone: string
  product: string
}

export async function sendManagerRequestEmail(
  payload: ManagerRequestEmailPayload,
): Promise<SendResult> {
  const client = getResendClient()
  const receivedAt = new Date().toLocaleString('ru-RU', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Europe/Moscow',
  })

  if (!client) {
    // eslint-disable-next-line no-console
    console.warn('[kontora:email] RESEND_API_KEY не задан — письмо не отправлено', payload)
    return { ok: true }
  }

  try {
    await client.emails.send({
      from: getMailFrom(),
      to: getMailTo(),
      replyTo: payload.email,
      subject: `Новая заявка: ${payload.name} · ${payload.product}`,
      react: ManagerRequestEmail({ ...payload, receivedAt }),
    })
    return { ok: true }
  } catch (err) {
    console.error('[kontora:email] sendManagerRequestEmail failed', err)
    return { ok: false, error: 'email-send-failed' }
  }
}

export type SampleRequestEmailPayload = {
  name: string
  email: string
  phone: string
  comment?: string
}

export async function sendSampleRequestEmail(
  payload: SampleRequestEmailPayload,
): Promise<SendResult> {
  const client = getResendClient()
  const receivedAt = new Date().toLocaleString('ru-RU', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Europe/Moscow',
  })

  if (!client) {
    // eslint-disable-next-line no-console
    console.warn('[kontora:email] RESEND_API_KEY не задан — письмо не отправлено', payload)
    return { ok: true }
  }

  try {
    await client.emails.send({
      from: getMailFrom(),
      to: getMailTo(),
      replyTo: payload.email,
      subject: `Запрос образца: ${payload.name}`,
      react: SampleRequestEmail({ ...payload, receivedAt }),
    })
    return { ok: true }
  } catch (err) {
    console.error('[kontora:email] sendSampleRequestEmail failed', err)
    return { ok: false, error: 'email-send-failed' }
  }
}
