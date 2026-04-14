import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
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
          borderRadius: 40,
          border: '10px solid #FFD047',
        }}
      >
        <span
          style={{
            fontSize: 110,
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
