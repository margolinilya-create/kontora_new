import type { Metadata } from 'next'
import { Nunito, Onest, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const nunito = Nunito({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '600', '700', '800', '900'],
  display: 'swap',
})

const onest = Onest({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-onest',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Контора — стикеры из Петербурга',
  description: 'Виниловые, 3D-эпоксидные, DTF стикеры. Тираж от 10 штук. Доставка по всей России. Рассчитайте стоимость онлайн.',
  keywords: 'стикеры, печать стикеров, виниловые стикеры, 3D стикеры, DTF печать, стикеры СПб, заказать стикеры',
  openGraph: {
    title: 'Контора — стикеры из Петербурга',
    description: 'Виниловые, 3D-эпоксидные, DTF стикеры. Тираж от 10 штук.',
    url: 'https://kontora.su',
    siteName: 'Контора',
    locale: 'ru_RU',
    type: 'website',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://kontora.su' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${nunito.variable} ${onest.variable} ${jetbrains.variable}`}>
      <body className="font-body bg-n-50 text-dark antialiased">
        {children}
      </body>
    </html>
  )
}
