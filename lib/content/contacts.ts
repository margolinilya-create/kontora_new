/**
 * Контактные данные. Источник — reference site kontora.futuguru.com
 * (/tmp/ref-audit/contacts.html и footer всех страниц).
 *
 * Реальный адрес, телефон, email и мессенджеры.
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
    address: 'наб. Обводного канала, 24д',
    hours: 'Пн–Пт · 10:00–18:00',
  },
  channels: [
    { id: 'email', label: 'Почта', value: 'info@kontora.su', href: 'mailto:info@kontora.su' },
    { id: 'phone', label: 'Телефон', value: '+7 (999) 041-31-08', href: 'tel:+79990413108' },
    { id: 'telegram', label: 'Telegram', value: 't.me/kontora3d', href: 'https://t.me/kontora3d' },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      value: 'Написать в WhatsApp',
      href: 'https://wa.me/79990413108',
    },
    {
      id: 'instagram',
      label: 'Instagram',
      value: 'instagram.com/kontora3d',
      href: 'https://instagram.com/kontora3d',
    },
  ],
  note:
    'Для крупных тиражей и B2B-заявок удобнее через форму «Запрос для менеджера» — мы перезваниваем в течение часа.',
} as const
