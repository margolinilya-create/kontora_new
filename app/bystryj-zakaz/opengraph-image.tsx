import { brandedOgImage, ogSize, ogContentType } from '@/lib/seo/og'

export const alt = 'Быстрый заказ — калькулятор Конторы'
export const size = ogSize
export const contentType = ogContentType

export default async function Image() {
  return brandedOgImage({
    eyebrow: 'Калькулятор · 60 секунд',
    title: 'БЫСТРЫЙ ЗАКАЗ',
    footer: 'kontora.su/bystryj-zakaz',
  })
}
