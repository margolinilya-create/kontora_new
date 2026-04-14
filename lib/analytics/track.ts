import type { AnalyticsEvent } from './events'

/**
 * Единая обёртка для трекинга. M4 — no-op (console.debug в dev).
 * M6 — реальная отправка в Yandex.Metrica ym() + PostHog capture(),
 * gated через cookie `kontora_consent === 'accepted'`.
 */
export function track<E extends AnalyticsEvent>(event: E): void {
  if (typeof window === 'undefined') return
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', event.name, event.props)
  }
  // TODO(M6): реальная отправка с consent-gate
}
