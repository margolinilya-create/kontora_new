import { Button } from '@/components/ui/Button'

export function CtaSection() {
  return (
    <section className="py-24 bg-dark overflow-hidden relative">
      {/* Dot pattern bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,208,71,0.4) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative z-10 max-w-[760px] mx-auto px-6 text-center">
        {/* Decorative tag */}
        <div className="inline-flex items-center gap-2 bg-yellow border-2 border-dark rounded-full px-4 py-1.5 mb-6"
             style={{ boxShadow: '3px 3px 0 rgba(0,0,0,0.3)', transform: 'rotate(-1deg)' }}>
          <span className="font-display font-black text-[12px] text-dark">Заказать прямо сейчас</span>
        </div>

        <h2 className="font-display font-black text-white mb-5 leading-[1.05]"
            style={{ fontSize: 'clamp(32px, 5vw, 48px)', letterSpacing: '-0.5px' }}>
          Готовы напечатать ваши стикеры?
        </h2>

        <p className="text-white/50 text-[16px] leading-relaxed mb-10 max-w-[460px] mx-auto">
          Загрузите макет или оставьте заявку — свяжемся в течение 15 минут и уточним детали.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Button variant="yellow" size="lg">
            Рассчитать стоимость →
          </Button>
          <Button variant="white" size="lg">
            Написать в Telegram
          </Button>
        </div>

        {/* Delivery logos */}
        <div className="mt-12 flex items-center justify-center gap-6 flex-wrap">
          <span className="text-[11px] font-semibold text-white/25 uppercase tracking-widest">Доставляем через</span>
          {['СДЭК', 'Почта России', 'Яндекс.Доставка', 'Свой курьер'].map(d => (
            <span key={d} className="text-[12px] font-bold text-white/40 border border-white/15 rounded-lg px-3 py-1.5">
              {d}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
