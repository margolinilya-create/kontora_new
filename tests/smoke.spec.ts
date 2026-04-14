import { test, expect } from '@playwright/test'

/**
 * Smoke-тест: все публичные маршруты должны возвращать 200, рендерить
 * ключевые заголовки и не содержать console errors.
 */
const routes = [
  { path: '/', headline: 'КЛЕИТСЯ' },
  { path: '/bystryj-zakaz', headline: 'БЫСТРЫЙ ЗАКАЗ' },
  { path: '/kak-podgotovit-maket', headline: 'МАКЕТ' },
  { path: '/blog', headline: 'ТУТ ШАРЯТ' },
  { path: '/o-nas', headline: 'МАНУФАКТУРА' },
  { path: '/kontakty', headline: 'КОНТАКТЫ' },
  { path: '/privacy', headline: 'ПОЛИТИКА' },
  { path: '/cookies', headline: 'COOKIES' },
  { path: '/soglasie', headline: 'СОГЛАСИЕ' },
  { path: '/catalog/stikery-s-konturnoj-rezkoj', headline: 'КОНТУРНОЙ' },
  { path: '/catalog/3d-stikerpaki', headline: '3D СТИКЕРПАКИ' },
  { path: '/catalog/3d-stikery', headline: '3D СТИКЕРЫ' },
  { path: '/catalog/pryamougolnye-i-kvadratnye', headline: 'ПРЯМОУГОЛЬНЫЕ' },
  { path: '/catalog/stikery-s-nadsechkoj', headline: 'НАДСЕЧКОЙ' },
  { path: '/catalog/bolshie-stikery', headline: 'БОЛЬШИЕ' },
  { path: '/catalog/stikerpaki', headline: 'СТИКЕРПАКИ' },
] as const

for (const route of routes) {
  test(`${route.path} — 200 + headline + no console errors`, async ({ page }) => {
    const consoleErrors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text())
    })

    const response = await page.goto(route.path, { waitUntil: 'domcontentloaded' })
    expect(response?.ok(), `response OK for ${route.path}`).toBe(true)
    await expect(page.getByRole('heading', { name: new RegExp(route.headline, 'i') }).first()).toBeVisible()

    // Небольшая задержка на случай поздних hydration errors
    await page.waitForTimeout(400)
    expect(consoleErrors, `no console errors on ${route.path}`).toEqual([])
  })
}

test('/sitemap.xml содержит все статические маршруты', async ({ request }) => {
  const res = await request.get('/sitemap.xml')
  expect(res.ok()).toBe(true)
  const body = await res.text()
  for (const route of routes) {
    if (route.path === '/') continue // home представлен как bare siteUrl
    expect(body).toContain(route.path)
  }
  expect(body).toContain('https://kontora.su')
})

test('/robots.txt доступен и содержит sitemap', async ({ request }) => {
  const res = await request.get('/robots.txt')
  expect(res.ok()).toBe(true)
  expect(await res.text()).toMatch(/Sitemap: https:\/\/kontora\.su\/sitemap\.xml/)
})
