import { Tag } from '@/components/ui/Tag'

const REVIEWS = [
  {
    name: 'Алексей Смирнов',
    company: 'Roast Coffee',
    text: 'Заказывали виниловые стикеры для кофебара. Всё напечатали чётко, цвета точно как в макете. Привезли за 4 дня.',
    rating: 5,
    product: 'Виниловые',
    qty: '500 шт',
  },
  {
    name: 'Марина Ковалёва',
    company: 'MerchLab Studio',
    text: 'Сотрудничаем уже год, заказываем 3D стикеры для мерча. Клиенты в восторге — такого эффекта ни у кого нет.',
    rating: 5,
    product: '3D Эпоксид',
    qty: '200 шт/мес',
  },
  {
    name: 'Павел Орлов',
    company: 'Инди-разработчик',
    text: 'Напечатал стикерпак для своего проекта. Маленький тираж, но сделали с тем же качеством. Рекомендую.',
    rating: 5,
    product: 'Стикерпак',
    qty: '30 пачек',
  },
]

const TRUST_ITEMS = [
  { icon: '🏭', title: 'Своё производство', desc: 'Печатаем сами — без посредников, контроль качества на каждом этапе' },
  { icon: '⚡', title: 'Экспресс за 1-2 дня', desc: 'Срочные заказы принимаем в работу в день обращения' },
  { icon: '🎨', title: 'Разработаем дизайн', desc: 'Нет макета — не проблема. Сделаем по вашему брифу' },
  { icon: '📦', title: 'Доставка по России', desc: 'СДЭК, Почта России, свой курьер по Санкт-Петербургу' },
]

export function TrustSection() {
  return (
    <>
      {/* Trust items */}
      <section className="py-20 bg-n-50 border-y-2 border-n-100">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_ITEMS.map((item) => (
              <div key={item.title} className="flex flex-col gap-3">
                <div
                  className="w-12 h-12 bg-yellow border-2 border-dark rounded-xl flex items-center justify-center text-[22px] flex-shrink-0"
                  style={{ boxShadow: '2px 2px 0 #282828' }}
                >
                  {item.icon}
                </div>
                <div>
                  <div className="font-display font-black text-[15px] text-dark mb-1">{item.title}</div>
                  <div className="text-[13px] text-n-400 leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <div className="section-eyebrow">Отзывы</div>
            <h2 className="font-display font-black text-[32px] text-dark">
              Клиенты о нас
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {REVIEWS.map((review) => (
              <div
                key={review.name}
                className="bg-white border-[2.5px] border-dark rounded-[20px] p-6 flex flex-col gap-4"
                style={{ boxShadow: '4px 4px 0 #282828' }}
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <span key={i} className="text-yellow text-[18px]">★</span>
                  ))}
                </div>

                {/* Text */}
                <p className="text-[14px] text-n-600 leading-relaxed flex-1">
                  {review.text}
                </p>

                {/* Author */}
                <div className="flex items-center justify-between pt-4 border-t-2 border-n-100">
                  <div>
                    <div className="font-display font-black text-[14px] text-dark">{review.name}</div>
                    <div className="text-[12px] text-n-400">{review.company}</div>
                  </div>
                  <div className="text-right">
                    <Tag variant="yellow" size="sm">{review.product}</Tag>
                    <div className="text-[11px] text-n-300 mt-1">{review.qty}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
