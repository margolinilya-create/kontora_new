#!/usr/bin/env tsx
//
// CI гейт: любая ссылка на `/brand/...` в lib/content/** и components/**
// должна указывать на реально существующий файл в public/.
//
// Ловит опечатки путей и забытые ассеты до того, как они доедут до production
// и зафейлят next/image в runtime.
//
import { existsSync, readFileSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { join, extname } from 'node:path'

const ROOTS = ['lib/content', 'components', 'app']
const EXTS = new Set(['.ts', '.tsx'])
const ASSET_EXTS = new Set(['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif', '.ico', '.avif'])
// Ищем строки вида "/brand/foo/bar.png" или "/images/..." — только абсолютные пути от public/
const ASSET_RE = /["'`](\/[A-Za-z0-9_\-./]+?\.(?:png|jpe?g|svg|webp|gif|ico|avif))["'`]/g

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
  const missing: Array<{ file: string; line: number; path: string }> = []
  const seen = new Set<string>()
  let refCount = 0

  for (const file of files) {
    const content = readFileSync(file, 'utf8')
    const lines = content.split('\n')
    lines.forEach((line, i) => {
      const trimmed = line.trim()
      if (trimmed.startsWith('//') || trimmed.startsWith('*')) return
      for (const m of line.matchAll(ASSET_RE)) {
        const assetPath = m[1]
        // Игнорируем data:, внешние, и не-asset расширения.
        const ext = extname(assetPath).toLowerCase()
        if (!ASSET_EXTS.has(ext)) continue
        refCount++
        const publicPath = join('public', assetPath)
        const key = `${file}|${assetPath}`
        if (seen.has(key)) continue
        seen.add(key)
        if (!existsSync(publicPath)) {
          missing.push({ file, line: i + 1, path: assetPath })
        }
      }
    })
  }

  if (missing.length === 0) {
    console.log(`✓ check:assets — все ${refCount} ссылок валидны (${files.length} файлов просканировано)`)
    return
  }

  console.error(`✗ check:assets — найдено ${missing.length} отсутствующих ассетов:`)
  for (const v of missing) {
    console.error(`  ${v.file}:${v.line}  ${v.path}`)
  }
  console.error('\nСкачайте недостающие файлы (bash scripts/download-assets.sh) или исправьте путь.')
  process.exit(1)
}

main().catch((err) => {
  console.error('check:assets crashed:', err)
  process.exit(1)
})
