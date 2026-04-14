import type { Metadata } from 'next'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Tag } from '@/components/ui/Tag'
import { Skeleton } from '@/components/ui/Skeleton'
import { Accordion } from '@/components/ui/Accordion'
import { StickerButton } from '@/components/brand/StickerButton'
import { YellowMarker } from '@/components/brand/YellowMarker'
import { StickerCard } from '@/components/brand/StickerCard'

export const metadata: Metadata = {
  title: 'Kitchen Sink — Контора',
  description: 'Внутренняя демо-страница для всех UI и brand атомов Конторы.',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-static'

/**
 * /dev/kitchen-sink — внутренняя демо всех атомов. Рендерится только в dev
 * + preview деплой; индексация запрещена metadata и X-Robots-Tag в next.config.
 */
export default function KitchenSink() {
  return (
    <Container size="lg" className="py-16">
      <header className="mb-16 border-b border-line pb-12">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-yellow">
          /dev/kitchen-sink
        </p>
        <h1 className="text-display-lg font-display uppercase">
          Kitchen <YellowMarker>Sink</YellowMarker>
        </h1>
        <p className="mt-4 max-w-2xl text-cream/60">
          Все UI и brand атомы в одном месте. Ctrl+F чтобы найти нужный. Если
          компонент тут не отображён — он ещё не готов или в backlog.
        </p>
      </header>

      <Section title="1. Typography">
        <h1 className="text-display-xl font-display uppercase">Display XL — Hero</h1>
        <h2 className="text-display-lg font-display uppercase">Display LG — Section heading</h2>
        <h3 className="text-display-md font-display uppercase">Display MD — Subsection</h3>
        <h4 className="text-display-sm font-display uppercase">Display SM — Card title</h4>
        <p className="max-w-2xl text-lg text-cream/80">
          Body large — для лидов и ключевых описаний. Onest, 18–20px. Работает
          как на тёмном, так и на светлом фоне с контрастом AA.
        </p>
        <p className="max-w-2xl text-cream/70">
          Body regular — для основного текста. 16px, line-height 1.6. Onest 400.
        </p>
        <p className="font-mono text-sm uppercase tracking-widest text-cream/60">
          Mono — метки, цифры, технические подписи
        </p>
      </Section>

      <Section title="2. Yellow marker">
        <p className="text-2xl">
          Слово можно <YellowMarker>подсветить</YellowMarker> маркером
        </p>
        <p className="text-2xl">
          Или <YellowMarker skew={-2}>косо</YellowMarker>, если надо дерзко
        </p>
        <p className="text-2xl">
          Или <YellowMarker skew={0}>ровно</YellowMarker> — без наклона
        </p>
      </Section>

      <Section title="3. Sticker buttons (brand CTA)">
        <div className="flex flex-wrap gap-4">
          <StickerButton tone="yellow" size="sm">Размер SM</StickerButton>
          <StickerButton tone="yellow" size="md">Размер MD</StickerButton>
          <StickerButton tone="yellow" size="lg">Размер LG</StickerButton>
          <StickerButton tone="yellow" size="xl">Размер XL</StickerButton>
        </div>
        <div className="flex flex-wrap gap-4">
          <StickerButton tone="yellow">Жёлтый (primary)</StickerButton>
          <StickerButton tone="violet">Фиолетовый (калькулятор)</StickerButton>
          <StickerButton tone="cream">Кремовый (secondary)</StickerButton>
          <StickerButton tone="dark">Тёмный (reversed)</StickerButton>
        </div>
        <div className="flex flex-wrap gap-4">
          <StickerButton tone="yellow">
            С иконкой <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
          </StickerButton>
          <StickerButton tone="yellow" disabled>
            Disabled
          </StickerButton>
        </div>
      </Section>

      <Section title="4. UI buttons (форма / админка)">
        <div className="flex flex-wrap gap-4">
          <Button variant="solid">Solid</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="violet">Violet</Button>
          <Button variant="danger">Danger</Button>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button size="sm">SM</Button>
          <Button size="md">MD</Button>
          <Button size="lg">LG</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Section>

      <Section title="5. Tags">
        <div className="flex flex-wrap gap-3">
          <Tag tone="yellow">Primary tag</Tag>
          <Tag tone="violet">Violet</Tag>
          <Tag tone="dark">Dark</Tag>
          <Tag tone="outline">Outline</Tag>
          <Tag tone="red">Danger</Tag>
          <Tag tone="yellow">
            <Sparkles className="h-3 w-3" /> С иконкой
          </Tag>
        </div>
      </Section>

      <Section title="6. Sticker cards">
        <div className="grid gap-6 md:grid-cols-3">
          <StickerCard tone="yellow" tilt="softLeft" hover="lift">
            <Tag tone="dark">01</Tag>
            <h3 className="text-display-sm font-display uppercase">Собственное производство</h3>
            <p className="text-sm">
              Печатаем, режем, ламинируем и упаковываем на своём оборудовании.
              Никаких посредников.
            </p>
          </StickerCard>
          <StickerCard tone="violet" tilt="none" hover="lift">
            <Tag tone="yellow">02</Tag>
            <h3 className="text-display-sm font-display uppercase">Итальянские материалы</h3>
            <p className="text-sm">
              Работаем на плёнках премиум-класса. Яркие цвета, стойкость к влаге.
            </p>
          </StickerCard>
          <StickerCard tone="red" tilt="softRight" hover="lift">
            <Tag tone="yellow">03</Tag>
            <h3 className="text-display-sm font-display uppercase">Всегда рядом</h3>
            <p className="text-sm">
              Быстро отвечаем, быстро печатаем. Доставка по всей России.
            </p>
          </StickerCard>
        </div>
      </Section>

      <Section title="7. Accordion (FAQ)">
        <Accordion
          items={[
            { id: 'q1', question: 'Можно ли получить результат в день заказа?', answer: 'Да, для срочных тиражей — от нескольких часов до 1 рабочего дня.' },
            { id: 'q2', question: 'Работаете без дизайн макета?', answer: 'Да, нарисуем сами — блок «Дизайн в Конторе».' },
            { id: 'q3', question: 'Какой минимальный тираж?', answer: 'От 1 штуки для срочных образцов, стандартный тираж — от 50 штук.' },
          ]}
        />
      </Section>

      <Section title="8. Skeleton">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-48 w-full" />
        </div>
      </Section>

      <Section title="9. Palette (design tokens)">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Swatch name="yellow" className="bg-yellow text-yellow-ink" />
          <Swatch name="violet" className="bg-violet text-white" />
          <Swatch name="red" className="bg-red text-white" />
          <Swatch name="cream" className="bg-cream text-dark" />
          <Swatch name="dark" className="bg-dark text-cream" />
          <Swatch name="dark-2" className="bg-dark-2 text-cream" />
          <Swatch name="dark-3" className="bg-dark-3 text-cream" />
          <Swatch name="yellow-ink" className="bg-[var(--color-yellow-ink)] text-yellow" />
        </div>
      </Section>
    </Container>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-20 flex flex-col gap-6">
      <h2 className="font-mono text-xs uppercase tracking-widest text-cream/40">{title}</h2>
      {children}
    </section>
  )
}

function Swatch({ name, className }: { name: string; className: string }) {
  return (
    <div className={`flex h-20 items-end rounded-md border-2 border-dark p-3 shadow-sticker-sm ${className}`}>
      <span className="font-mono text-xs uppercase tracking-widest">{name}</span>
    </div>
  )
}
