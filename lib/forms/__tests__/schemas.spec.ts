import { describe, expect, it } from 'vitest'
import { contactSchema, managerRequestSchema, sampleRequestSchema } from '../schemas'

/**
 * Unit тесты для Zod схем форм. Гарантируют что:
 * - валидные payload проходят
 * - отсутствие consent блокирует submit
 * - невалидные email/phone/короткие имена отклоняются
 * - email нормализуется в lowercase
 * - trim применяется к именам
 */

const validManagerInput = {
  name: '  Иван Иванов  ',
  email: 'IVAN@EXAMPLE.COM',
  phone: '+7 (921) 555-00-00',
  product: 'stikery-s-konturnoj-rezkoj',
  consent: 'on',
}

describe('managerRequestSchema', () => {
  it('валидный payload проходит и нормализует поля', () => {
    const result = managerRequestSchema.safeParse(validManagerInput)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.name).toBe('Иван Иванов')
      expect(result.data.email).toBe('ivan@example.com')
    }
  })

  it('без consent — отклоняется с понятным сообщением', () => {
    const result = managerRequestSchema.safeParse({ ...validManagerInput, consent: undefined })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.includes('consent')),
      ).toBe(true)
    }
  })

  it('короткое имя отклоняется', () => {
    const result = managerRequestSchema.safeParse({ ...validManagerInput, name: 'А' })
    expect(result.success).toBe(false)
  })

  it('невалидный email отклоняется', () => {
    const result = managerRequestSchema.safeParse({ ...validManagerInput, email: 'not-an-email' })
    expect(result.success).toBe(false)
  })

  it('невалидный телефон отклоняется', () => {
    const result = managerRequestSchema.safeParse({ ...validManagerInput, phone: 'abc' })
    expect(result.success).toBe(false)
  })

  it('пустой product отклоняется', () => {
    const result = managerRequestSchema.safeParse({ ...validManagerInput, product: '' })
    expect(result.success).toBe(false)
  })

  it('буллет продукт not-sure валидируется', () => {
    const result = managerRequestSchema.safeParse({ ...validManagerInput, product: 'not-sure' })
    expect(result.success).toBe(true)
  })
})

describe('sampleRequestSchema', () => {
  it('валидный payload проходит', () => {
    const result = sampleRequestSchema.safeParse({
      name: 'Анна',
      email: 'anna@test.ru',
      phone: '+79001234567',
      comment: 'Хочу образец матовой плёнки',
      consent: 'on',
    })
    expect(result.success).toBe(true)
  })

  it('комментарий опциональный', () => {
    const result = sampleRequestSchema.safeParse({
      name: 'Анна',
      email: 'anna@test.ru',
      phone: '+79001234567',
      consent: 'on',
    })
    expect(result.success).toBe(true)
  })

  it('слишком длинный комментарий отклоняется', () => {
    const result = sampleRequestSchema.safeParse({
      name: 'Анна',
      email: 'anna@test.ru',
      phone: '+79001234567',
      comment: 'x'.repeat(1001),
      consent: 'on',
    })
    expect(result.success).toBe(false)
  })
})

describe('contactSchema', () => {
  it('валидный payload', () => {
    const result = contactSchema.safeParse({
      name: 'Пётр',
      email: 'petr@test.ru',
      message: 'Здравствуйте! У меня вопрос по тиражу.',
      consent: 'on',
    })
    expect(result.success).toBe(true)
  })

  it('короткое сообщение отклоняется', () => {
    const result = contactSchema.safeParse({
      name: 'Пётр',
      email: 'petr@test.ru',
      message: 'короткое',
      consent: 'on',
    })
    expect(result.success).toBe(false)
  })
})
