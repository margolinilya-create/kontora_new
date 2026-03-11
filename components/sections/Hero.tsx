'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Tag } from '@/components/ui/Tag'
import { MiniCalculator } from './Calculator'

const STATS = [
  { num: 'от 10',  unit: 'шт',  label: 'Минимальный тираж' },
  { num: '2–4',    unit: 'дня', label: 'Срок производства'  },
  { num: '5',      unit: 'видов',label: 'Типов стикеров'    },
  { num: '12 000', unit: '+',   label: 'Заказов выполнено'  },
]

// Decorative floating sticker shapes
const DECO_STICKERS = [
  { text: 'Хит!',      color: 'bg-red text-white',    rotate: '-rotate-6', pos: 'top-24 right-[52%]', delay: '0s'    },
  { text: 'WOW',       color: 'bg-yellow text-dark',  rotate: 'rotate-3',  pos: 'top-40 right-[38%]', delay: '0.4s'  },
  { text: '+25% off',  color: 'bg-blue text-white',   rotate: '-rotate-3', pos: 'bottom-28 left-16',  delay: '0.8s'  },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-dark overflow-hidden flex flex-col">

      {/* Background texture — dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Background glow blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 60%)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(255,72,72,0.07) 0%, transparent 60%)' }} />

      {/* Floating deco stickers */}
      {DECO_STICKERS.map((s, i) => (
        <div
          key={i}
          className={`absolute hidden lg:block ${s.pos} ${s.rotate} z-10 pointer-events-none animate-float`}
          style={{ animationDelay: s.delay, animationDuration: `${3 + i * 0.7}s` }}
        >
          <span
            className={`inline-block ${s.color} font-display font-black text-[13px] px-4 py-2 rounded-full border-2 border-dark`}
            style={{ boxShadow: '3px 3px 0 #282828' }}
          >
            {s.text}
          </span>
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-20 max-w-[1200px] mx-auto px-6 pt-32 pb-16 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center w-full">

          {/* Left — headline */}
          <div>
            {/* Live badge */}
            <div className="inline-flex items-center gap-2 bg-white/8 border border-white/12 rounded-full px-4 py-[6px] mb-6">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse flex-shrink-0" />
              <span className="text-[12px] font-semibold text-white/70">Производим в Санкт-Петербурге</span>
            </div>

            {/* H1 */}
            <h1 className="font-display font-black text-white mb-5 leading-[1.02]" style={{ fontSize: 'clamp(36px, 5vw, 54px)', letterSpacing: '-1px' }}>
              Стикеры<br />
              <span className="text-yellow">любой сложности</span><br />
              <span style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.3)', color: 'transparent' }}>
                по всей России
              </span>
            </h1>

            {/* Lead */}
            <p className="text-white/50 text-[16px] leading-relaxed mb-8 max-w-[440px]">
              Виниловые, 3D-эпоксидные, DTF. Тираж от 10 штук.
              Загрузите макет — получите цену мгновенно.
            </p>

            {/* CTAs */}
            <div className="flex gap-3 mb-10 flex-wrap">
              <Button variant="yellow" size="lg">
                Рассчитать стоимость →
              </Button>
              <Button variant="white" size="lg">
                Примеры работ
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-6 pt-8 border-t border-white/10 flex-wrap">
              {STATS.map(s => (
                <div key={s.label}>
                  <div className="font-display font-black text-white text-[22px] leading-none">
                    {s.num}
                    <span className="text-[14px] text-white/40 font-semibold ml-1">{s.unit}</span>
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-white/35 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — calculator widget */}
          <div className="w-full">
            <MiniCalculator />
          </div>
        </div>
      </div>

      {/* Bottom wave / scroll indicator */}
      <div className="relative z-20 flex justify-center pb-8">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[11px] font-semibold text-white/25 tracking-widest uppercase">Смотреть дальше</span>
          <span className="text-white/25 text-lg">↓</span>
        </div>
      </div>
    </section>
  )
}
