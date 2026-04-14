import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

/**
 * A11y-тесты через @axe-core/playwright. Проверяем home + одну
 * продуктовую + калькулятор. Любые critical/serious нарушения
 * фейлят PR.
 */
const pages = ['/', '/catalog/3d-stikerpaki', '/bystryj-zakaz']

for (const path of pages) {
  test(`${path} — без критических a11y нарушений`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'domcontentloaded' })
    // Закрываем cookie-баннер, чтобы он не мешал сканированию
    await page.evaluate(() => {
      document.cookie = 'kontora_consent=rejected; path=/; max-age=31536000'
    })

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .disableRules(['color-contrast']) // контраст проверяем отдельно в M7 с реальными фонами
      .analyze()

    const critical = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious',
    )
    if (critical.length > 0) {
      const summary = critical
        .map(
          (v) =>
            `  ✗ ${v.id} [${v.impact}] · ${v.help}\n` +
            v.nodes.map((n) => `      ${n.target.join(' ')} — ${n.failureSummary ?? ''}`).join('\n'),
        )
        .join('\n')
      throw new Error(`A11y violations on ${path}:\n${summary}`)
    }
    expect(critical).toEqual([])
  })
}
