/**
 * Типизированный реестр аналитических событий. M4 — только типы и noop
 * реализация. M6 — реальная отправка в Yandex.Metrica + PostHog через
 * consent-gated AnalyticsProvider.
 */

export type AnalyticsEvent =
  | { name: 'calc_open'; props: { product: string; surface: 'full' | 'embed' } }
  | { name: 'calc_param_changed'; props: { field: string } }
  | { name: 'calc_price_shown'; props: { price: number; product: string } }
  | { name: 'calc_file_uploaded'; props: { size: number; type: string } }
  | { name: 'calc_reset'; props: Record<string, never> }
  | { name: 'lead_submitted'; props: { form: 'manager' | 'sample' | 'contact' } }
  | { name: 'cta_click'; props: { target: string; surface: string } }
  | { name: 'product_view'; props: { slug: string } }

export type EventName = AnalyticsEvent['name']
