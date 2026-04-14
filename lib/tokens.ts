/**
 * TS-зеркало CSS design tokens из `app/globals.css`.
 * Используется в Framer Motion (animate values) и в любом JS, которому
 * нужны цвета / длительности / easing (`lib/seo/og.ts`, `ImageResponse`).
 *
 * Правило: CSS — источник правды. Этот файл должен совпадать с `globals.css`.
 * Если токен меняется — правим оба файла одновременно. Enforcement через
 * `scripts/check-tokens.ts` (проверяет отсутствие raw hex в компонентах).
 */

export const colors = {
  yellow: '#FFD047',
  yellowInk: '#1A1400',
  violet: '#7C4DFF',
  violetInk: '#FFFFFF',
  red: '#FF4848',
  blue: '#009FE3',
  dark: '#0F0F0F',
  dark2: '#1A1A1A',
  dark3: '#242424',
  line: 'rgba(255,255,255,0.08)',
  white: '#FFFFFF',
  cream: '#FAFAF7',
} as const

export const radius = {
  sm: 8,
  md: 14,
  lg: 22,
  xl: 32,
  pill: 9999,
} as const

export const motion = {
  easeOut: [0.22, 1, 0.36, 1] as const,
  durFast: 0.18,
  dur: 0.32,
  durSlow: 0.52,
} as const

export const shadow = {
  stickerSm: '4px 4px 0 0 #0F0F0F',
  sticker: '6px 6px 0 0 #0F0F0F',
  stickerLg: '10px 10px 0 0 #0F0F0F',
} as const

export type ColorToken = keyof typeof colors
export type RadiusToken = keyof typeof radius
