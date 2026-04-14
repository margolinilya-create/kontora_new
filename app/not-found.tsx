import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Страница не найдена — Контора',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main className="noise-overlay relative flex min-h-dvh items-center justify-center px-6 py-24 text-center">
      <div className="relative z-10 max-w-xl">
        <p className="font-mono text-xs uppercase tracking-widest text-yellow">404</p>
        <h1 className="mt-4 text-display-lg font-display">
          ЗДЕСЬ <span className="text-yellow">НИЧЕГО НЕ КЛЕИТСЯ</span>
        </h1>
        <p className="mt-6 text-cream-soft">
          Страница, которую вы искали, переехала или никогда не существовала.
          Можно вернуться на главную и попробовать заново.
        </p>
        <Link
          href="/"
          className="mt-10 inline-block  bg-yellow px-6 py-3 font-display text-lg font-bold text-yellow-ink  transition-transform hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-soft-lg"
        >
          НА ГЛАВНУЮ
        </Link>
      </div>
    </main>
  )
}
