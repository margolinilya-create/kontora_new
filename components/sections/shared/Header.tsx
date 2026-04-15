'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, LayoutGroup } from 'framer-motion'
import { Menu } from 'lucide-react'
import { headerNav, headerCta } from '@/lib/content/nav'
import { StickerButton } from '@/components/brand/StickerButton'
import { BrandLogo } from '@/components/brand/BrandLogo'
import { cn } from '@/lib/utils/cn'
import { MobileMenu } from '@/components/sections/shared/MobileMenu'

/**
 * Sticky header с glass-эффектом при скролле. Reference-style:
 *   • violet pill под активным пунктом (через framer layoutId)
 *   • CTA «📎 Быстрый заказ» с pushpin-эмодзи и violet tone
 *   • 7 nav items из headerNav
 */
export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-40 w-full border-b transition-colors duration-fast',
          scrolled
            ? 'border-line bg-bg-base/80 backdrop-blur-md'
            : 'border-transparent bg-transparent',
        )}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-4 md:px-8 lg:px-10">
          <BrandLogo size="md" />

          <nav aria-label="Основная навигация" className="hidden lg:block">
            <LayoutGroup id="header-nav">
              <ul className="flex items-center gap-1">
                {headerNav.map((item) => {
                  const base = item.href.split('#')[0] ?? item.href
                  const isActive =
                    item.href === '/'
                      ? pathname === '/'
                      : base !== '/' && pathname.startsWith(base)
                  return (
                    <li key={item.href} className="relative shrink-0">
                      <Link
                        href={item.href}
                        className={cn(
                          'relative inline-flex items-center whitespace-nowrap rounded-full px-3 py-2 font-body text-xs font-semibold uppercase tracking-wide transition-colors duration-fast xl:px-4 xl:text-sm',
                          isActive
                            ? 'text-violet-ink'
                            : 'text-cream-soft hover:text-cream',
                        )}
                      >
                        {isActive ? (
                          <motion.span
                            layoutId="header-marker"
                            aria-hidden="true"
                            className="absolute inset-0 -z-10 rounded-full bg-violet"
                            transition={{ type: 'spring', stiffness: 520, damping: 40 }}
                          />
                        ) : null}
                        <span className="relative">{item.label}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </LayoutGroup>
          </nav>

          <div className="flex items-center gap-3">
            <StickerButton
              href={headerCta.href}
              size="sm"
              tone="violet"
              className="hidden rounded-full md:inline-flex"
            >
              <span aria-hidden="true">📎</span>
              {headerCta.label}
            </StickerButton>
            <button
              type="button"
              aria-label="Открыть меню"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border-2 border-cream/20 text-cream transition-colors hover:border-violet hover:text-violet lg:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
