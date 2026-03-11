import Image from 'next/image'
import Link from 'next/link'

const LINKS = {
  products: [
    { href: '/catalog/vinyl',        label: 'Виниловые стикеры' },
    { href: '/catalog/3d-epoxy',     label: '3D Эпоксидные'     },
    { href: '/catalog/dtf',          label: 'DTF-печать'         },
    { href: '/catalog/die-cut',      label: 'Фигурные'           },
    { href: '/catalog/sticker-pack', label: 'Стикерпаки'         },
  ],
  company: [
    { href: '/about',    label: 'О нас'          },
    { href: '/portfolio',label: 'Портфолио'      },
    { href: '/b2b',      label: 'Для бизнеса'    },
    { href: '/delivery', label: 'Доставка'       },
    { href: '/faq',      label: 'FAQ'            },
  ],
  account: [
    { href: '/account',         label: 'Личный кабинет' },
    { href: '/account/orders',  label: 'Мои заказы'     },
    { href: '/account/bonuses', label: 'Бонусы'         },
  ],
}

export function Footer() {
  return (
    <footer className="bg-dark text-white pt-16 pb-8 mt-24">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">

          {/* Brand */}
          <div>
            <Image src="/logo/logo-dark.svg" alt="Контора" width={130} height={40} className="h-9 w-auto mb-4" />
            <p className="text-[13px] text-white/50 leading-relaxed mb-5">
              Производим виниловые, 3D и DTF стикеры в Санкт-Петербурге. Тираж от 10 штук. Доставляем по всей России.
            </p>
            <div className="flex gap-3">
              {['VK', 'TG', 'WA'].map(s => (
                <a key={s} href="#" className="w-9 h-9 bg-white/8 hover:bg-yellow hover:text-dark border border-white/10 rounded-xl flex items-center justify-center text-[12px] font-bold text-white/60 transition-all">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <div className="font-display font-black text-[12px] uppercase tracking-widest text-white/30 mb-4">Продукты</div>
            <ul className="flex flex-col gap-2">
              {LINKS.products.map(l => (
                <li key={l.href}><Link href={l.href} className="text-[13px] text-white/55 hover:text-white transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="font-display font-black text-[12px] uppercase tracking-widest text-white/30 mb-4">Компания</div>
            <ul className="flex flex-col gap-2">
              {LINKS.company.map(l => (
                <li key={l.href}><Link href={l.href} className="text-[13px] text-white/55 hover:text-white transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <div className="font-display font-black text-[12px] uppercase tracking-widest text-white/30 mb-4">Контакты</div>
            <ul className="flex flex-col gap-3">
              <li>
                <div className="text-[11px] text-white/30 font-semibold uppercase tracking-wider mb-0.5">Телефон</div>
                <a href="tel:+78001234567" className="text-[14px] font-bold text-white hover:text-yellow transition-colors">+7 (800) 123-45-67</a>
              </li>
              <li>
                <div className="text-[11px] text-white/30 font-semibold uppercase tracking-wider mb-0.5">Email</div>
                <a href="mailto:hello@kontora.su" className="text-[14px] font-bold text-white hover:text-yellow transition-colors">hello@kontora.su</a>
              </li>
              <li>
                <div className="text-[11px] text-white/30 font-semibold uppercase tracking-wider mb-0.5">Адрес</div>
                <span className="text-[13px] text-white/55">Санкт-Петербург, ул. Примерная, д. 1</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-white/30">
            © 2025 Контора. Все права защищены.
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="text-[12px] text-white/30 hover:text-white/60 transition-colors">Политика конфиденциальности</Link>
            <Link href="/terms"   className="text-[12px] text-white/30 hover:text-white/60 transition-colors">Пользовательское соглашение</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
