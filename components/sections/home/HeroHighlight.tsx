import type { HomeHeroHighlight } from '@/lib/content/types'
import { YellowMarker } from '@/components/brand/YellowMarker'

/**
 * Рендерит массив фрагментов заголовка/подзаголовка из контента:
 * { kind: 'text' } → обычный span, { kind: 'marker' } → YellowMarker,
 * { kind: 'underline' } → подчёркивание.
 *
 * Это позволяет контенту управлять выделениями без магических строк в JSX.
 */
export function HeroHighlight({ parts }: { parts: readonly HomeHeroHighlight[] }) {
  return (
    <>
      {parts.map((part, i) => {
        if (part.kind === 'marker') {
          return <YellowMarker key={i}>{part.value}</YellowMarker>
        }
        if (part.kind === 'underline') {
          return (
            <span
              key={i}
              className="underline decoration-yellow decoration-[6px] underline-offset-[6px]"
            >
              {part.value}
            </span>
          )
        }
        return <span key={i}>{part.value}</span>
      })}
    </>
  )
}
