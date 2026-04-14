import type { AnalyticsEvent } from './events'

/**
 * Единая обёртка для трекинга событий. Отправляет в Yandex.Metrica
 * (ym('reachGoal', name, props)) и PostHog (posthog.capture(name, props))
 * если они загружены. Consent-gate живёт в AnalyticsProvider — если
 * пользователь не согласился, эти глобалы просто не существуют.
 */

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void
    posthog?: {
      capture: (name: string, props?: Record<string, unknown>) => void
    }
  }
}

export function track<E extends AnalyticsEvent>(event: E): void {
  if (typeof window === 'undefined') return

  const metrikaIdRaw = process.env.NEXT_PUBLIC_METRIKA_ID
  if (metrikaIdRaw && window.ym) {
    const metrikaId = Number(metrikaIdRaw)
    if (!Number.isNaN(metrikaId)) {
      window.ym(metrikaId, 'reachGoal', event.name, event.props)
    }
  }

  if (window.posthog) {
    window.posthog.capture(event.name, event.props as Record<string, unknown>)
  }

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', event.name, event.props)
  }
}
