'use client'

import { useEffect } from 'react'

/**
 * Route-level error boundary. Ловит исключения RSC/Client компонентов
 * внутри ветки. Для fatal (layout/root) используется `global-error.tsx`.
 */
export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // TODO(M6): отправить в Yandex.Metrica / PostHog при наличии consent
    console.error('[kontora] route error', error)
  }, [error])

  return (
    <main className="noise-overlay relative flex min-h-dvh items-center justify-center px-6 py-24 text-center">
      <div className="relative z-10 max-w-xl">
        <p className="font-mono text-xs uppercase tracking-widest text-red">
          Ошибка{error.digest ? ` · ${error.digest}` : ''}
        </p>
        <h1 className="mt-4 text-display-lg font-display">
          ЧТО-ТО <span className="text-yellow">ОТКЛЕИЛОСЬ</span>
        </h1>
        <p className="mt-6 text-cream-soft">
          Не удалось показать страницу. Попробуйте ещё раз — обычно это лечится
          перезагрузкой. Если ошибка повторяется — напишите нам в футере.
        </p>
        <button
          onClick={reset}
          className="mt-10 inline-block  bg-yellow px-6 py-3 font-display text-lg font-bold text-yellow-ink  transition-transform hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-soft-lg"
        >
          ПОПРОБОВАТЬ СНОВА
        </button>
      </div>
    </main>
  )
}
