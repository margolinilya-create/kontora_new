import { brandedOgImage, ogSize, ogContentType } from '@/lib/seo/og'

export const alt = 'О мануфактуре Контора'
export const size = ogSize
export const contentType = ogContentType

export default async function Image() {
  return brandedOgImage({
    eyebrow: 'О нас · Санкт-Петербург',
    title: 'МАНУФАКТУРА ВИНИЛОВЫХ ИЗДЕЛИЙ',
    footer: 'kontora.su/o-nas',
  })
}
