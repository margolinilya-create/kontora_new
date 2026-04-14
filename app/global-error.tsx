'use client'

import { useEffect } from 'react'

/**
 * Fatal error boundary — ловит ошибки в root layout. Рендерит собственный
 * <html>, потому что сам layout мог сломаться. Стилей почти нет —
 * только inline, чтобы не зависеть от globals.css.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[kontora] global error', error)
  }, [error])

  return (
    <html lang="ru">
      <body
        style={{
          margin: 0,
          minHeight: '100dvh',
          background: '#0F0F0F',
          color: '#FAFAF7',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 520 }}>
          <p style={{ color: '#FF4848', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Критическая ошибка
          </p>
          <h1 style={{ fontSize: 48, lineHeight: 1, marginTop: 16, fontWeight: 800 }}>
            Что-то пошло совсем не так
          </h1>
          <p style={{ color: 'rgba(250,250,247,0.7)', marginTop: 24 }}>
            Попробуйте перезагрузить страницу. Если не помогает — напишите нам.
          </p>
          <button
            onClick={reset}
            style={{
              marginTop: 32,
              padding: '12px 24px',
              background: '#FFD047',
              color: '#1A1400',
              fontWeight: 800,
              fontSize: 16,
              border: '2px solid #0F0F0F',
              boxShadow: '6px 6px 0 0 #0F0F0F',
              cursor: 'pointer',
            }}
          >
            Попробовать снова
          </button>
        </div>
      </body>
    </html>
  )
}
