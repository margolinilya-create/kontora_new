import { brandedOgImage, ogSize, ogContentType } from '@/lib/seo/og'

export const alt = 'Тут шарят за стикеры и наклейки — Контора'
export const size = ogSize
export const contentType = ogContentType

export default async function Image() {
  return brandedOgImage({
    eyebrow: 'Блог · О производстве',
    title: 'ТУТ ШАРЯТ ЗА СТИКЕРЫ',
    footer: 'kontora.su/blog',
  })
}
