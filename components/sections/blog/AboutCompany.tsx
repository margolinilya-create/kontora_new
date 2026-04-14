import { blog } from '@/lib/content/blog'
import { Container } from '@/components/ui/Container'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { BrandLogo } from '@/components/brand/BrandLogo'

/**
 * Блок §4.2: «О компании» — лого + 3 абзаца + декоративный стикер-арт
 * справа (CSS-плейсхолдер до реального фото команды).
 */
export function AboutCompany() {
  return (
    <section className="border-b border-line bg-bg-surface py-20 md:py-28">
      <Container size="lg">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <RevealOnScroll>
            <div className="flex flex-col gap-6">
              <p className="font-mono text-xs uppercase tracking-widest text-yellow">
                {blog.about.eyebrow}
              </p>
              <BrandLogo size="lg" href="" />
              <div className="space-y-4 text-pretty text-lg leading-relaxed text-cream-soft">
                {blog.about.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div className="relative hidden aspect-square w-full max-w-md md:block" aria-hidden="true">
              <div className="absolute inset-0 -z-10 rounded-xl bg-bg-surface-2" />
              <div className="absolute left-[12%] top-[10%] flex h-32 w-32 -rotate-6 items-center justify-center rounded-xl  bg-yellow shadow-soft-lg md:h-40 md:w-40">
                <span className="font-display text-3xl font-bold uppercase text-yellow-ink">К</span>
              </div>
              <div className="absolute right-[14%] top-[14%] flex h-24 w-24 rotate-6 items-center justify-center rounded-full  bg-violet text-white ">
                <span className="font-mono text-xs uppercase tracking-widest">SPb</span>
              </div>
              <div className="absolute left-[20%] bottom-[18%] flex h-20 w-56 -rotate-3 items-center justify-center rounded-md  bg-cream text-dark ">
                <span className="font-display text-sm font-bold uppercase">ИТАЛЬЯНСКИЕ ПЛЁНКИ</span>
              </div>
              <div className="absolute bottom-[8%] right-[8%] flex h-24 w-24 rotate-[10deg] items-center justify-center rounded-md  bg-red text-white ">
                <span className="font-mono text-xs uppercase tracking-widest">premium</span>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  )
}
