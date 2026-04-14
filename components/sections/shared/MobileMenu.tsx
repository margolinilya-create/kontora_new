'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { headerNav, headerCta } from '@/lib/content/nav'
import { StickerButton } from '@/components/brand/StickerButton'
import { BrandLogo } from '@/components/brand/BrandLogo'
import { cn } from '@/lib/utils/cn'

type MobileMenuProps = {
  open: boolean
  onClose: () => void
}

/**
 * Fullscreen off-canvas меню для mobile. Закрывается по Escape, клику на
 * overlay, клику на пункт. Блокирует scroll body пока открыто.
 */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Меню"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex flex-col bg-bg-base lg:hidden"
        >
          <div className="flex items-center justify-between px-6 py-4">
            <BrandLogo size="md" />
            <button
              type="button"
              aria-label="Закрыть меню"
              onClick={onClose}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border-2 border-cream/20 text-cream hover:border-yellow hover:text-yellow"
            >
              <X className="h-5 w-5" strokeWidth={2.5} />
            </button>
          </div>

          <nav aria-label="Мобильная навигация" className="flex-1 overflow-y-auto px-6 py-8">
            <ul className="flex flex-col gap-1">
              {headerNav.map((item) => {
                const isActive =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href.split('#')[0] ?? item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        'block border-b border-line py-4 font-display text-2xl font-bold uppercase tracking-tight transition-colors',
                        isActive ? 'text-yellow' : 'text-cream hover:text-yellow',
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="border-t border-line px-6 py-6">
            <StickerButton href={headerCta.href} size="lg" tone="yellow" className="w-full" onClick={onClose}>
              {headerCta.label}
            </StickerButton>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
