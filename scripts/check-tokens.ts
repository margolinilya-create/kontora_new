#!/usr/bin/env tsx
//
// CI гейт: запрещает raw hex-цвета в components/** и app/**.
// Все цвета должны идти через CSS vars / Tailwind токены / lib/tokens.ts.
//
// Исключение: файл с директивой "allow-raw-hex" в первой строке
// (например tokens.ts, global-error.tsx, где CSS-vars ещё недоступны).
//
import { readFileSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { join, extname } from 'node:path'

const HEX_RE = /#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})\b/gi
const ROOTS = ['components', 'app']
const EXTS = new Set(['.ts', '.tsx'])
const ALLOWLIST = new Set<string>([
  'app/global-error.tsx', // ловит fatal до того как загрузятся vars — inline hex необходим
  'app/icon.tsx',
  'app/apple-icon.tsx',
  'app/opengraph-image.tsx',
  'app/catalog/[slug]/opengraph-image.tsx',
  'app/layout.tsx', // themeColor в Viewport API требует строку
  'app/manifest.ts', // PWA manifest — JSON, CSS vars не работают
])

async function walk(dir: string, acc: string[] = []): Promise<string[]> {
  let entries
  try {
    entries = await readdir(dir, { withFileTypes: true })
  } catch {
    return acc
  }
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory()) {
      await walk(full, acc)
    } else if (EXTS.has(extname(e.name))) {
      acc.push(full)
    }
  }
  return acc
}

async function main() {
  const files = (await Promise.all(ROOTS.map((r) => walk(r)))).flat()
  const violations: Array<{ file: string; line: number; match: string }> = []

  for (const file of files) {
    if (ALLOWLIST.has(file)) continue
    const content = readFileSync(file, 'utf8')
    if (content.startsWith('/* allow-raw-hex */')) continue
    const lines = content.split('\n')
    lines.forEach((line, i) => {
      // пропускаем комментарии
      const trimmed = line.trim()
      if (trimmed.startsWith('//') || trimmed.startsWith('*')) return
      const matches = line.match(HEX_RE)
      if (matches) {
        for (const m of matches) {
          violations.push({ file, line: i + 1, match: m })
        }
      }
    })
  }

  if (violations.length === 0) {
    console.log(`✓ check:tokens — 0 нарушений в ${files.length} файлах`)
    return
  }

  console.error(`✗ check:tokens — найдено ${violations.length} raw hex цветов:`)
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line}  ${v.match}`)
  }
  console.error('\nИспользуйте CSS vars из globals.css или lib/tokens.ts.')
  process.exit(1)
}

main().catch((err) => {
  console.error('check:tokens crashed:', err)
  process.exit(1)
})
