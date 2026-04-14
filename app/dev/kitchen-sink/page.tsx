import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Tag } from '@/components/ui/Tag'
import { Skeleton } from '@/components/ui/Skeleton'
import { Accordion } from '@/components/ui/Accordion'
import { StickerButton } from '@/components/brand/StickerButton'
import { YellowMarker } from '@/components/brand/YellowMarker'
import { StickerCard } from '@/components/brand/StickerCard'
import { BrandLogo } from '@/components/brand/BrandLogo'

export const metadata: Metadata = {
  title: 'Kitchen Sink — Контора',
  description: 'Внутренняя демо-страница для всех UI и brand атомов.',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-static'

/**
 * /dev/kitchen-sink — внутренняя демо всех атомов после M8 rebuild.
 * Показывает актуальные токены и варианты компонентов.
 */
export default function KitchenSink() {
  return (
    <Container size="lg" className="py-16">
      <header className="mb-16 border-b border-line pb-12">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-yellow">/dev/kitchen-sink</p>
        <h1 className="text-display-lg font-display">
          Kitchen <YellowMarker>Sink</YellowMarker>
        </h1>
        <p className="mt-4 max-w-2xl text-cream-muted">
          Все UI и brand атомы после M8 Playful Character Premium rebuild.
        </p>
      </header>

      <Section title="1. Brand logo">
        <div className="flex flex-wrap items-center gap-8 rounded-lg bg-bg-surface p-8">
          <BrandLogo size="sm" href="" />
          <BrandLogo size="md" href="" />
          <BrandLogo size="lg" href="" />
          <BrandLogo size="xl" href="" />
        </div>
      </Section>

      <Section title="2. Typography">
        <h1 className="text-display-xl font-display">Display XL — Hero</h1>
        <h2 className="text-display-lg font-display">Display LG — Section heading</h2>
        <h3 className="text-display-md font-display">Display MD — Subsection</h3>
        <h4 className="text-display-sm font-display">Display SM — Card title</h4>
        <p className="max-w-2xl text-lg text-cream-soft">
          Body large — Nunito 18-20px. Мягкий, играет с Unbounded display.
        </p>
        <p className="max-w-2xl text-cream-muted">Body regular — 16px.</p>
        <p className="font-mono text-sm uppercase tracking-widest text-cream-muted">
          Mono — метки, eyebrow, цифры в калькуляторе
        </p>
      </Section>

      <Section title="3. Color markers">
        <div className="flex flex-col gap-3 text-2xl">
          <p>
            <YellowMarker tone="yellow">yellow</YellowMarker> акцент
          </p>
          <p>
            <YellowMarker tone="peach">peach</YellowMarker> акцент
          </p>
          <p>
            <YellowMarker tone="pink">pink</YellowMarker> акцент
          </p>
          <p>
            <YellowMarker tone="violet">violet</YellowMarker> акцент
          </p>
          <p>
            <YellowMarker tone="blue">blue</YellowMarker> акцент
          </p>
        </div>
      </Section>

      <Section title="4. Sticker buttons (brand CTA)">
        <div className="flex flex-wrap gap-4">
          <StickerButton tone="yellow">Yellow CTA</StickerButton>
          <StickerButton tone="peach">Peach</StickerButton>
          <StickerButton tone="pink">Pink</StickerButton>
          <StickerButton tone="violet">Violet</StickerButton>
          <StickerButton tone="cream">Cream</StickerButton>
          <StickerButton tone="dark">Dark</StickerButton>
          <StickerButton tone="ghost">Ghost</StickerButton>
        </div>
        <div className="flex flex-wrap gap-4">
          <StickerButton tone="yellow" size="sm">
            SM
          </StickerButton>
          <StickerButton tone="yellow" size="md">
            MD
          </StickerButton>
          <StickerButton tone="yellow" size="lg">
            LG
            <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
          </StickerButton>
          <StickerButton tone="yellow" size="xl">
            XL
          </StickerButton>
        </div>
      </Section>

      <Section title="5. UI buttons">
        <div className="flex flex-wrap gap-4">
          <Button variant="solid">Solid</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="violet">Violet</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </Section>

      <Section title="6. Tags">
        <div className="flex flex-wrap gap-3">
          <Tag tone="yellow">Primary</Tag>
          <Tag tone="violet">Violet</Tag>
          <Tag tone="dark">Dark</Tag>
          <Tag tone="outline">Outline</Tag>
          <Tag tone="red">Danger</Tag>
        </div>
      </Section>

      <Section title="7. Sticker cards (floating)">
        <div className="grid gap-6 md:grid-cols-3">
          <StickerCard tone="yellow" hover="lift">
            <Tag tone="dark">01</Tag>
            <h3 className="text-display-sm font-display">Yellow card</h3>
            <p className="text-sm">Floating с ring + soft drop-shadow.</p>
          </StickerCard>
          <StickerCard tone="violet" hover="lift">
            <Tag tone="yellow">02</Tag>
            <h3 className="text-display-sm font-display">Violet card</h3>
            <p className="text-sm">32px radius, soft-lift на hover.</p>
          </StickerCard>
          <StickerCard tone="pink" hover="lift">
            <Tag tone="yellow">03</Tag>
            <h3 className="text-display-sm font-display">Pink card</h3>
            <p className="text-sm">Multi-accent palette из референса.</p>
          </StickerCard>
        </div>
      </Section>

      <Section title="8. Accordion (FAQ)">
        <Accordion
          items={[
            {
              id: 'q1',
              question: 'Можно получить результат в день заказа?',
              answer: 'Для срочных тиражей — от нескольких часов до 1 рабочего дня.',
            },
            {
              id: 'q2',
              question: 'Работаете без дизайн макета?',
              answer: 'Да, нарисуем сами — блок «Дизайн в Конторе».',
            },
          ]}
        />
      </Section>

      <Section title="9. Skeleton">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-48 w-full" />
        </div>
      </Section>

      <Section title="10. Palette swatches">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Swatch name="yellow" className="bg-yellow text-yellow-ink" />
          <Swatch name="peach" className="bg-peach text-peach-ink" />
          <Swatch name="pink" className="bg-pink text-pink-ink" />
          <Swatch name="violet" className="bg-violet text-violet-ink" />
          <Swatch name="blue" className="bg-blue text-blue-ink" />
          <Swatch name="cream" className="bg-bg-cream text-ink" />
          <Swatch name="surface" className="bg-bg-surface text-cream" />
          <Swatch name="surface-2" className="bg-bg-surface-2 text-cream" />
        </div>
      </Section>
    </Container>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-20 flex flex-col gap-6">
      <h2 className="font-mono text-xs uppercase tracking-widest text-cream-muted">{title}</h2>
      {children}
    </section>
  )
}

function Swatch({ name, className }: { name: string; className: string }) {
  return (
    <div className={`flex h-20 items-end rounded-md p-3 shadow-ring ${className}`}>
      <span className="font-mono text-xs uppercase tracking-widest">{name}</span>
    </div>
  )
}
