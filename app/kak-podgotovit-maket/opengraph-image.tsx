import { brandedOgImage, ogSize, ogContentType } from '@/lib/seo/og'

export const alt = 'Как подготовить макет к печати — Контора'
export const size = ogSize
export const contentType = ogContentType

export default async function Image() {
  return brandedOgImage({
    eyebrow: 'Гайд · Подготовка к печати',
    title: 'КАК ПОДГОТОВИТЬ МАКЕТ',
    footer: 'kontora.su/kak-podgotovit-maket',
  })
}
