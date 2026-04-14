/**
 * Контактные данные. Адрес — из PDF §Общие элементы. Телефон и почта —
 * placeholder до получения реальных данных от владельца.
 *
 * TODO(owner): заменить PHONE_PLACEHOLDER и EMAIL_PLACEHOLDER на реальные
 * значения из .env.local (NEXT_PUBLIC_CONTACT_PHONE / NEXT_PUBLIC_CONTACT_EMAIL)
 * или прямо в этом файле.
 */

export const contacts = {
  hero: {
    eyebrow: 'Санкт-Петербург',
    title: 'КОНТАКТЫ',
    subtitle:
      'Приезжайте в гости, напишите в мессенджере или оформите заказ онлайн — мы на связи в рабочее время.',
  },
  office: {
    title: 'ОФИС И ПРОИЗВОДСТВО',
    city: 'Санкт-Петербург',
    address: 'ул. Набережная канала Грибоедова, 126',
    hours: 'Пн–Пт · 10:00–19:00 МСК',
  },
  channels: [
    { id: 'email', label: 'Почта', value: 'hello@kontora.su', href: 'mailto:hello@kontora.su' },
    { id: 'phone', label: 'Телефон', value: '+7 (911) 000-00-00', href: 'tel:+79110000000' },
    { id: 'telegram', label: 'Telegram', value: '@kontora_su', href: 'https://t.me/kontora_su' },
    { id: 'whatsapp', label: 'WhatsApp', value: 'Написать в WhatsApp', href: 'https://wa.me/79110000000' },
  ],
  note:
    'Для крупных тиражей и B2B-заявок удобнее через форму «Запрос для менеджера» — мы перезваниваем в течение часа.',
} as const
