'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { dispatchConsentAccepted } from './AnalyticsProvider'

/**
 * 152-ФЗ / Cookies consent banner. Появляется один раз на сессию,
 * хранит выбор в cookie `kontora_consent` (1 год).
 *
 * При «Принять всё» триггерит глобальный event, который подхватывает
 * AnalyticsProvider и подгружает Yandex.Metrica + PostHog скрипты
 * без перезагрузки страницы.
 */
type ConsentChoice = 'accepted' | 'rejected'
const COOKIE_NAME = 'kontora_consent'
const MAX_AGE = 60 * 60 * 24 * 365

function readCookie(): ConsentChoice | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`${COOKIE_NAME}=(accepted|rejected)`))
  return (match?.[1] as ConsentChoice) ?? null
}

function writeCookie(value: ConsentChoice) {
  if (typeof document === 'undefined') return
  document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${MAX_AGE}; SameSite=Lax`
}

export function ConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const existing = readCookie()
    if (!existing) {
      const t = window.setTimeout(() => setVisible(true), 800)
      return () => window.clearTimeout(t)
    }
  }, [])

  if (!visible) return null

  function handle(choice: ConsentChoice) {
    writeCookie(choice)
    setVisible(false)
    if (choice === 'accepted') {
      dispatchConsentAccepted()
    }
  }

  return (
    <div
      role="dialog"
      aria-label="Согласие на использование cookies"
      className="fixed inset-x-4 bottom-4 z-50 rounded-xl  bg-bg-surface p-5 shadow-soft-lg md:inset-x-auto md:bottom-6 md:left-6 md:right-6 md:mx-auto md:max-w-2xl md:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <p className="font-mono text-xs uppercase tracking-widest text-yellow">
            Cookies и 152-ФЗ
          </p>
          <p className="text-sm text-cream-soft">
            Сайт использует cookies, чтобы запоминать ваши предпочтения и собирать обезличенную
            аналитику. Подробнее — в{' '}
            <Link href="/cookies" className="underline decoration-yellow underline-offset-2 hover:text-yellow">
              политике cookies
            </Link>{' '}
            и{' '}
            <Link href="/privacy" className="underline decoration-yellow underline-offset-2 hover:text-yellow">
              политике конфиденциальности
            </Link>
            .
          </p>
        </div>
        <button
          type="button"
          aria-label="Закрыть"
          onClick={() => handle('rejected')}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border-2 border-line text-cream-muted hover:border-yellow hover:text-yellow"
        >
          <X className="h-4 w-4" strokeWidth={2.5} />
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => handle('accepted')}
          className="flex-1 rounded-md  bg-yellow px-5 py-2.5 font-display text-sm font-bold uppercase text-yellow-ink shadow-soft-sm transition-transform duration-fast hover:-translate-y-[1px] hover:"
        >
          Принять всё
        </button>
        <button
          type="button"
          onClick={() => handle('rejected')}
          className="flex-1 rounded-md border-2 border-line bg-transparent px-5 py-2.5 font-display text-sm font-bold uppercase text-cream-soft transition-colors hover:border-cream/40 hover:text-cream"
        >
          Только необходимые
        </button>
      </div>
    </div>
  )
}
