import type { Metadata, Viewport } from 'next'
import { fontBody, fontMono, fontDisplay } from '@/lib/fonts'
import { cn } from '@/lib/utils/cn'
import { rootMetadata } from '@/lib/seo/metadata'
import {
  organizationJsonLd,
  websiteJsonLd,
  jsonLdScript,
} from '@/lib/seo/jsonld'
import { siteLang } from '@/lib/routes'
import { Header } from '@/components/sections/shared/Header'
import { Footer } from '@/components/sections/shared/Footer'
import './globals.css'

export const metadata: Metadata = rootMetadata

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0F0F0F',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang={siteLang}
      className={cn(fontBody.variable, fontMono.variable, fontDisplay.variable)}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(organizationJsonLd())}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(websiteJsonLd())}
        />
      </head>
      <body className="flex min-h-dvh flex-col bg-dark font-body text-cream antialiased">
        <a href="#main" className="skip-link">
          Перейти к контенту
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
