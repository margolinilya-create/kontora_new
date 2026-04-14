import { z } from 'zod'

/**
 * Zod-схемы всех форм сайта. Используются на клиенте и в Server Actions —
 * single source of truth для валидации.
 *
 * Правила:
 * - Все поля требуют 152-ФЗ consent (чекбокс в форме).
 * - Телефон — минимальная валидация (10–20 символов, цифры и разделители).
 * - Email через .email() + нормализация в lowercase.
 * - Имя/компания — от 2 символов.
 */

const phoneRegex = /^[+\d][\d\s()-]{8,20}$/
const consentRequired = z.literal('on', {
  errorMap: () => ({ message: 'Для отправки нужно согласие на обработку персональных данных' }),
})

export const managerRequestSchema = z.object({
  name: z
    .string({ required_error: 'Укажите имя или компанию' })
    .trim()
    .min(2, 'Минимум 2 символа')
    .max(120, 'Слишком длинное имя'),
  email: z
    .string({ required_error: 'Укажите почту' })
    .trim()
    .toLowerCase()
    .email('Некорректный email'),
  phone: z
    .string({ required_error: 'Укажите телефон' })
    .trim()
    .regex(phoneRegex, 'Некорректный номер телефона'),
  product: z
    .string({ required_error: 'Выберите продукт' })
    .min(1, 'Выберите продукт'),
  consent: consentRequired,
})

export type ManagerRequestInput = z.infer<typeof managerRequestSchema>

export const sampleRequestSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().toLowerCase().email(),
  phone: z.string().trim().regex(phoneRegex),
  comment: z.string().trim().max(1000).optional(),
  consent: consentRequired,
})

export type SampleRequestInput = z.infer<typeof sampleRequestSchema>

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().toLowerCase().email(),
  message: z.string().trim().min(10).max(2000),
  consent: consentRequired,
})

export type ContactInput = z.infer<typeof contactSchema>
