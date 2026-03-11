'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { Button } from '@/components/ui/Button'

const NAV_LINKS = [
  { href: '/catalog',  label: 'Стикеры'  },
  { href: '/catalog',  label: 'Каталог'  },
  { href: '/#calc',    label: 'Цены'     },
  { href: '/b2b',      label: 'B2B'      },
  { href: '/about',    label: 'О нас'    },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'py-3 bg-dark/95 backdrop-blur-md border-b border-white/10'
          : 'py-5 bg-transparent',
      )}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo/logo-dark.svg"
            alt="Контора"
            width={140}
            height={44}
            className="h-9 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="px-4 py-2 text-[13px] font-semibold text-white/55 hover:text-white hover:bg-white/7 rounded-xl transition-all duration-150"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/account" className="text-[13px] font-semibold text-white/50 hover:text-white transition-colors">
            Войти
          </Link>
          <Button variant="yellow" size="sm" className="font-extrabold">
            Рассчитать →
          </Button>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-[5px] p-2"
          aria-label="Меню"
        >
          <span className={clsx('w-6 h-0.5 bg-white transition-all', mobileOpen && 'rotate-45 translate-y-[7px]')} />
          <span className={clsx('w-6 h-0.5 bg-white transition-all', mobileOpen && 'opacity-0')} />
          <span className={clsx('w-6 h-0.5 bg-white transition-all', mobileOpen && '-rotate-45 -translate-y-[7px]')} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-dark border-t border-white/10 px-6 py-4 flex flex-col gap-2">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href + link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 text-[15px] font-semibold text-white/70 hover:text-white hover:bg-white/6 rounded-xl transition-all"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-white/10 mt-2">
            <Button variant="yellow" size="md" fullWidth>
              Рассчитать стоимость →
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
