import { ImageResponse } from 'next/og'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0F0F0F',
          borderRadius: 14,
          border: '4px solid #FFD047',
        }}
      >
        <span
          style={{
            fontSize: 36,
            fontWeight: 900,
            color: '#FFD047',
            fontFamily: 'sans-serif',
            letterSpacing: '-0.05em',
          }}
        >
          К
        </span>
      </div>
    ),
    { ...size },
  )
}
