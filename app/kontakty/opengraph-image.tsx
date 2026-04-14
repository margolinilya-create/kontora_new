import { brandedOgImage, ogSize, ogContentType } from '@/lib/seo/og'

export const alt = 'Контакты Конторы'
export const size = ogSize
export const contentType = ogContentType

export default async function Image() {
  return brandedOgImage({
    eyebrow: 'Контакты · СПб',
    title: 'КОНТАКТЫ',
    footer: 'kontora.su/kontakty',
  })
}
