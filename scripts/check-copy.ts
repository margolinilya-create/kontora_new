#!/usr/bin/env tsx
/**
 * CI гейт: сверяет русские строковые литералы из `lib/content/**` с
 * `content-source/pdf-extract.txt`. Любая строка в content/* должна
 * встречаться в pdf-extract.txt (нормализация пробелов).
 *
 * В M0 каталог `lib/content` пуст — скрипт возвращает ОК.
 * В M2+ начнёт реально проверять.
 */
import { readFileSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { join, extname } from 'node:path'

const CONTENT_ROOT = 'lib/content'
const PDF_PATH = 'content-source/pdf-extract.txt'

function normalize(s: string): string {
  return s
    .replace(/\s+/g, ' ')
    .replace(/[«»"']/g, '')
    .trim()
    .toLowerCase()
}

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
    } else if (extname(e.name) === '.ts') {
      acc.push(full)
    }
  }
  return acc
}

const STRING_RE = /['"`]([^'"`\n]{8,}[а-яА-ЯёЁ][^'"`\n]*)['"`]/g

async function main() {
  let pdf: string
  try {
    pdf = readFileSync(PDF_PATH, 'utf8')
  } catch {
    console.error(`✗ check:copy — не найден ${PDF_PATH}`)
    process.exit(1)
  }
  const pdfNormalized = normalize(pdf)

  const files = await walk(CONTENT_ROOT)
  if (files.length === 0) {
    console.log(`✓ check:copy — ${CONTENT_ROOT} пока пуст, контент будет в M2+`)
    return
  }

  const violations: Array<{ file: string; line: number; text: string }> = []
  for (const file of files) {
    const content = readFileSync(file, 'utf8')
    const lines = content.split('\n')
    lines.forEach((line, i) => {
      const trimmed = line.trim()
      if (trimmed.startsWith('//') || trimmed.startsWith('*')) return
      const matches = [...line.matchAll(STRING_RE)]
      for (const m of matches) {
        const text = m[1]
        if (!text) continue
        if (!pdfNormalized.includes(normalize(text))) {
          violations.push({ file, line: i + 1, text })
        }
      }
    })
  }

  if (violations.length === 0) {
    console.log(`✓ check:copy — ${files.length} файлов, все строки совпадают с PDF`)
    return
  }

  console.error(`✗ check:copy — ${violations.length} строк не найдены в PDF:`)
  for (const v of violations.slice(0, 20)) {
    console.error(`  ${v.file}:${v.line}  "${v.text.slice(0, 80)}"`)
  }
  if (violations.length > 20) {
    console.error(`  … и ещё ${violations.length - 20}`)
  }
  console.error('\nОбновите content-source/pdf-extract.txt или lib/content/**.')
  process.exit(1)
}

main().catch((err) => {
  console.error('check:copy crashed:', err)
  process.exit(1)
})
