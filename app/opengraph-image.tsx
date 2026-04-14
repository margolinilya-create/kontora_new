import { ImageResponse } from 'next/og'

export const alt = 'Контора — виниловые наклейки и стикерпаки'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpenGraphImage() {
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
              width: 64,
              height: 64,
              background: '#0F0F0F',
              border: '4px solid #FFD047',
              borderRadius: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 36,
              fontWeight: 900,
              color: '#FFD047',
            }}
          >
            К
          </div>
          <span style={{ color: '#FAFAF7', fontSize: 28, fontWeight: 700 }}>
            КОНТОРА
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h1
            style={{
              margin: 0,
              fontSize: 108,
              lineHeight: 0.95,
              fontWeight: 900,
              color: '#FAFAF7',
              letterSpacing: '-0.02em',
            }}
          >
            С НАМИ ВСЁ <span style={{ color: '#FFD047' }}>КЛЕИТСЯ!</span>
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: 28,
              color: 'rgba(250,250,247,0.7)',
              maxWidth: 900,
            }}
          >
            Мануфактура виниловых изделий. Санкт-Петербург.
          </p>
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
          <span>СОБСТВЕННОЕ ПРОИЗВОДСТВО</span>
          <span>·</span>
          <span>ИТАЛЬЯНСКИЕ МАТЕРИАЛЫ</span>
          <span>·</span>
          <span>КОНТРОЛЬ КАЧЕСТВА</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
