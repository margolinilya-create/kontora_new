import Link from 'next/link'
import { BrandLogo } from '@/components/brand/BrandLogo'
import { footerColumns, footerContacts, footerLegal } from '@/lib/content/nav'

/**
 * Тёмный футер в референс-стиле: 3 колонки ссылок (Стикеры / Полезное /
 * Материалы), лево — лого + краткое описание + контакты + соцсети.
 * RSC (статика), ссылки на мессенджеры отдаются как внешние.
 */
export function Footer() {
  return (
    <footer className="relative mt-24 border-t-2 border-yellow bg-bg-surface text-cream">
      <div className="noise-overlay relative">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_2.7fr]">
            <div className="flex flex-col gap-6">
              <BrandLogo size="lg" />
              <p className="max-w-sm text-pretty text-sm text-cream-muted">
                Мануфактура виниловых изделий. Производим наклейки и стикерпаки — от
                этикеток и 3D стикеров до широкоформатных наклеек.
              </p>
              <address className="flex flex-col gap-1 text-sm not-italic text-cream-soft">
                <span>{footerContacts.city}</span>
                <span>{footerContacts.address}</span>
                <span className="text-cream-muted">{footerContacts.hours}</span>
              </address>
              <div className="flex flex-col gap-1.5 text-sm">
                <a
                  href={footerContacts.phoneHref}
                  className="text-cream transition-colors duration-fast hover:text-yellow"
                >
                  {footerContacts.phone}
                </a>
                <a
                  href={footerContacts.emailHref}
                  className="text-cream transition-colors duration-fast hover:text-yellow"
                >
                  {footerContacts.email}
                </a>
              </div>
              <ul className="flex flex-wrap gap-3 text-xs uppercase tracking-wide">
                <li>
                  <a
                    href={footerContacts.telegramHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-full border border-cream/20 px-3 py-1.5 text-cream transition-colors duration-fast hover:border-violet hover:text-violet"
                  >
                    Telegram
                  </a>
                </li>
                <li>
                  <a
                    href={footerContacts.whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-full border border-cream/20 px-3 py-1.5 text-cream transition-colors duration-fast hover:border-violet hover:text-violet"
                  >
                    {footerContacts.whatsapp}
                  </a>
                </li>
                <li>
                  <a
                    href={footerContacts.instagramHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-full border border-cream/20 px-3 py-1.5 text-cream transition-colors duration-fast hover:border-violet hover:text-violet"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
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
                          className="text-cream-soft transition-colors duration-fast hover:text-yellow"
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
            <p className="font-mono text-xs uppercase tracking-widest text-cream-muted">
              {footerContacts.copyright}
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-cream-muted">
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
