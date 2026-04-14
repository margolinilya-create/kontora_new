import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Контора — виниловые наклейки',
    short_name: 'Контора',
    description:
      'Мануфактура виниловых изделий. Производим наклейки и стикерпаки: от этикеток и 3D стикеров до широкоформатных наклеек.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0F0F0F',
    theme_color: '#0F0F0F',
    lang: 'ru',
    icons: [
      {
        src: '/icon',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
