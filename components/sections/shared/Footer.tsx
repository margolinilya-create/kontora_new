import Link from 'next/link'
import { BrandLogo } from '@/components/brand/BrandLogo'
import { footerColumns, footerContacts, footerLegal } from '@/lib/content/nav'

/**
 * Тёмный футер, лого слева, колонки ссылок, контакты, legal bar.
 * Структура — из PDF §Общие элементы. RSC (статика).
 */
export function Footer() {
  return (
    <footer className="relative mt-24 border-t-2 border-yellow bg-dark-2 text-cream">
      <div className="noise-overlay relative">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_2.8fr]">
            <div className="flex flex-col gap-6">
              <BrandLogo size="lg" />
              <p className="max-w-sm text-pretty text-sm text-cream/60">
                Мануфактура виниловых изделий. Производим наклейки и стикерпаки — от
                этикеток и 3D стикеров до широкоформатных наклеек.
              </p>
              <address className="flex flex-col gap-1 text-sm not-italic text-cream/70">
                <span>{footerContacts.city}</span>
                <span>{footerContacts.address}</span>
              </address>
            </div>

            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {footerColumns.map((col) => (
                <div key={col.title} className="flex flex-col gap-4">
                  <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-yellow">
                    {col.title}
                  </h3>
                  <ul className="flex flex-col gap-2 text-sm">
                    {col.links.map((link) => (
                      <li key={`${col.title}-${link.href}-${link.label}`}>
                        <Link
                          href={link.href}
                          className="text-cream/70 transition-colors duration-fast hover:text-yellow"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
            <p className="font-mono text-xs uppercase tracking-widest text-cream/50">
              {footerContacts.copyright}
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-cream/50">
              {footerLegal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors duration-fast hover:text-yellow"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
