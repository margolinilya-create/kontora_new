/**
 * TS-зеркало CSS design tokens из `app/globals.css`.
 * Используется в Framer Motion, OG images, SEO utils.
 *
 * Правило: CSS — источник правды. Этот файл должен совпадать с `globals.css`.
 * Enforcement через `scripts/check-tokens.ts` (запрет raw hex в components/**).
 */

export const colors = {
  // surface
  bgBase: '#0A0A0F',
  bgSurface: '#12121A',
  bgSurface2: '#1C1C28',
  bgSurface3: '#242432',
  bgCream: '#FAF8F3',
  bgCream2: '#F4F0E6',

  // text
  ink: '#0A0A0F',
  inkSoft: '#4A4A5A',
  cream: '#FAF8F3',

  // bright accents
  accentYellow: '#FFD24E',
  accentYellowInk: '#1A1400',
  accentPeach: '#FFB88F',
  accentPeachInk: '#1A0F00',
  accentPink: '#FF486D',
  accentPinkInk: '#FFFFFF',
  accentViolet: '#9736FF',
  accentVioletInk: '#FFFFFF',
  accentBlue: '#009FE3',
  accentBlueSoft: '#B5E9FF',
  accentRed: '#FF4848',
  accentYellowSoft: '#FFE28F',
  accentGreen: '#53FF00',
} as const

export const radius = {
  xs: 12,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 40,
  xxl: 56,
  pill: 9999,
} as const

export const motion = {
  easeOut: [0.22, 1, 0.36, 1] as const,
  easeSpring: [0.34, 1.56, 0.64, 1] as const,
  durFast: 0.18,
  dur: 0.32,
  durSlow: 0.52,
  durAmbient: 0.8,
} as const

export const shadow = {
  ring: '0 0 0 2px rgba(255,255,255,0.08)',
  ringStrong: '0 0 0 2px rgba(255,255,255,0.18)',
  softSm: '0 10px 30px -15px rgba(0,0,0,0.35)',
  soft: '0 20px 50px -25px rgba(0,0,0,0.45)',
  softLg: '0 30px 80px -30px rgba(0,0,0,0.55)',
} as const

export type ColorToken = keyof typeof colors
export type RadiusToken = keyof typeof radius
