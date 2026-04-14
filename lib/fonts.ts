import { Unbounded, Nunito, JetBrains_Mono } from 'next/font/google'

/**
 * Display font — Unbounded. Distinctive modern geometric sans с кириллицей.
 * Playful без детскости, подходит к character-stickers бренда.
 * Fredoka была бы идеальна по форме, но без cyrillic subset — недоступна.
 * Unbounded — cyrillic-first display font с сильным характером.
 */
export const fontDisplay = Unbounded({
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
  variable: '--font-display',
  adjustFontFallback: true,
  weight: ['400', '500', '600', '700', '800'],
  preload: true,
})

/**
 * Body font — Nunito. Soft, friendly, высокая читаемость на тёмных фонах.
 * Парная связка с Fredoka (same rounded personality) подтверждена
 * ui-ux-pro-max design system query.
 */
export const fontBody = Nunito({
  subsets: ['cyrillic', 'cyrillic-ext', 'latin'],
  display: 'swap',
  variable: '--font-body',
  adjustFontFallback: true,
  weight: ['400', '500', '600', '700'],
  preload: true,
})

/**
 * Mono — JetBrains Mono. Для цифр в калькуляторе, label'ов, tracking-widest
 * eyebrow текстов. Классика для технического контента.
 */
export const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  adjustFontFallback: false,
  weight: ['500', '700'],
  preload: false,
})
