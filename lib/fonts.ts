import { Onest, JetBrains_Mono } from 'next/font/google'
// TODO(M1): import localFont from 'next/font/local' — когда приедет Druk Wide

/**
 * Body font — Onest (free, Google). Subset ru + en.
 * Используется для абзацев, form-лейблов, описаний.
 */
export const fontBody = Onest({
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
  variable: '--font-body',
  adjustFontFallback: true,
  weight: ['400', '500', '600', '700'],
  preload: true,
})

/**
 * Mono font — JetBrains Mono. Используется в калькуляторе для цифр
 * (цена, размеры, тираж), чтобы табличные цифры выравнивались.
 */
export const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  adjustFontFallback: false,
  weight: ['500', '700'],
  preload: false,
})

/**
 * Display font — Druk Wide (Commercial Type, платный).
 * Файлы `.woff2` приезжают в M1 после покупки владельцем.
 * Пока используется fallback на Onest с компенсацией метрик,
 * чтобы ничего не ломалось до M1.
 *
 * Когда придут файлы — раскомментировать блок ниже и положить:
 *   public/fonts/DrukWide-Medium.woff2
 *   public/fonts/DrukWide-Bold.woff2
 */
// export const fontDisplay = localFont({
//   src: [
//     { path: '../public/fonts/DrukWide-Medium.woff2', weight: '500', style: 'normal' },
//     { path: '../public/fonts/DrukWide-Bold.woff2', weight: '700', style: 'normal' },
//   ],
//   display: 'swap',
//   variable: '--font-display',
//   fallback: ['Onest', 'system-ui', 'sans-serif'],
//   adjustFontFallback: 'Arial',
// })

/**
 * Заглушка Druk Wide на период M0 — пустой localFont даст переменную
 * `--font-display`, и каскад в globals.css падает в Onest через fallback.
 *
 * TODO(M1): заменить на реальные файлы Druk Wide.
 */
export const fontDisplay = {
  variable: '--font-display',
  className: '',
  style: { fontFamily: 'var(--font-body)' },
} as const
