import { ImageResponse } from 'next/og'
import { productSlugs } from '@/lib/routes'
import { getProductBySlug } from '@/lib/content/products'

export const alt = 'Продуктовая страница Конторы'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

type RouteParams = { slug: string }

/**
 * Статическая генерация OG-картинок на build для каждого продукта.
 */
export function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }))
}

export default async function ProductOgImage({ params }: { params: RouteParams }) {
  const slug = params.slug
  const isValid = (productSlugs as readonly string[]).includes(slug)
  if (!isValid) {
    return new ImageResponse(<div>Контора</div>, { ...size })
  }
  const content = getProductBySlug(slug as (typeof productSlugs)[number])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0F0F0F',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              background: '#0F0F0F',
              border: '4px solid #FFD047',
              borderRadius: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
              fontWeight: 900,
              color: '#FFD047',
            }}
          >
            К
          </div>
          <span style={{ color: '#FAFAF7', fontSize: 24, fontWeight: 700 }}>
            КОНТОРА
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 1000 }}>
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 20,
              letterSpacing: '0.15em',
              color: '#FFD047',
              textTransform: 'uppercase',
            }}
          >
            Продукт · {content.label}
          </span>
          <h1
            style={{
              margin: 0,
              fontSize: 92,
              lineHeight: 0.95,
              fontWeight: 900,
              color: '#FAFAF7',
              letterSpacing: '-0.02em',
            }}
          >
            {content.hero.title}
          </h1>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 12,
            fontSize: 18,
            fontFamily: 'monospace',
            color: 'rgba(250,250,247,0.6)',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
          }}
        >
          <span>kontora.su/catalog/{content.slug}</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
