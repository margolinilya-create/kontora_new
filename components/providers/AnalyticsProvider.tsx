'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

/**
 * Consent-gated аналитика. Подгружает Yandex.Metrica и PostHog скрипты
 * только если cookie `kontora_consent === 'accepted'`. Слушает глобальный
 * event `kontora:consent-accepted` для немедленной подгрузки после
 * нажатия «Принять всё» в ConsentBanner (без page reload).
 *
 * Env-переменные:
 * - NEXT_PUBLIC_METRIKA_ID — счётчик Яндекс.Метрики (цифры)
 * - NEXT_PUBLIC_POSTHOG_KEY — API key PostHog (опционально)
 * - NEXT_PUBLIC_POSTHOG_HOST — хост PostHog (по умолчанию eu.posthog.com)
 */

const CONSENT_EVENT = 'kontora:consent-accepted'

function readConsent(): boolean {
  if (typeof document === 'undefined') return false
  return /kontora_consent=accepted/.test(document.cookie)
}

export function AnalyticsProvider() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    setEnabled(readConsent())

    const handler = () => setEnabled(true)
    window.addEventListener(CONSENT_EVENT, handler)
    return () => window.removeEventListener(CONSENT_EVENT, handler)
  }, [])

  if (!enabled) return null

  const metrikaId = process.env.NEXT_PUBLIC_METRIKA_ID
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://eu.posthog.com'

  return (
    <>
      {metrikaId ? (
        <>
          <Script
            id="yandex-metrica"
            strategy="afterInteractive"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
ym(${metrikaId}, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:false });
              `.trim(),
            }}
          />
          <noscript>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://mc.yandex.ru/watch/${metrikaId}`}
                style={{ position: 'absolute', left: '-9999px' }}
                alt=""
              />
            </div>
          </noscript>
        </>
      ) : null}

      {posthogKey ? (
        <Script
          id="posthog"
          strategy="afterInteractive"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys getNextSurveyStep".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
posthog.init('${posthogKey}', { api_host: '${posthogHost}', person_profiles: 'identified_only' });
            `.trim(),
          }}
        />
      ) : null}
    </>
  )
}

/**
 * Триггер для ConsentBanner — вызвать после нажатия «Принять всё»,
 * чтобы AnalyticsProvider подгрузил скрипты без перезагрузки страницы.
 */
export function dispatchConsentAccepted(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(CONSENT_EVENT))
}
