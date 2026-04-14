/* allow-raw-hex */
import { ImageResponse } from 'next/og'

/**
 * Единый factory для динамических OG-картинок. Берёт eyebrow + title +
 * footer и рендерит брендовый layout Kontora (тёмный фон + yellow marker +
 * display-заголовок + mono-футер).
 *
 * Все hex-значения inline — OG image рендерится через ImageResponse,
 * который не читает CSS vars.
 */
export const ogSize = { width: 1200, height: 630 } as const
export const ogContentType = 'image/png'

type OgInput = {
  eyebrow: string
  title: string
  footer: string
}

const YELLOW = '#FFD047'
const DARK = '#0F0F0F'
const CREAM = '#FAFAF7'
const CREAM_MUTED = 'rgba(250,250,247,0.6)'

export function brandedOgImage({ eyebrow, title, footer }: OgInput) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: DARK,
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              background: DARK,
              border: `4px solid ${YELLOW}`,
              borderRadius: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
              fontWeight: 900,
              color: YELLOW,
            }}
          >
            К
          </div>
          <span style={{ color: CREAM, fontSize: 24, fontWeight: 700 }}>КОНТОРА</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 1000 }}>
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: 20,
              letterSpacing: '0.15em',
              color: YELLOW,
              textTransform: 'uppercase',
            }}
          >
            {eyebrow}
          </span>
          <h1
            style={{
              margin: 0,
              fontSize: 92,
              lineHeight: 0.95,
              fontWeight: 900,
              color: CREAM,
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </h1>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 12,
            fontSize: 18,
            fontFamily: 'monospace',
            color: CREAM_MUTED,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
          }}
        >
          <span>{footer}</span>
        </div>
      </div>
    ),
    { ...ogSize },
  )
}
