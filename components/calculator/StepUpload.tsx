import { useRef, useState } from 'react'
import { UploadCloud, FileCheck2, X } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { UploadedFileMeta } from '@/lib/calculator/state'
import { StepShell } from './StepShell'

type Props = {
  file: UploadedFileMeta | null
  onChange: (file: UploadedFileMeta | null) => void
}

const ACCEPTED = ['application/pdf', 'application/postscript', 'image/png', 'image/jpeg', 'image/svg+xml']
const MAX_SIZE = 30 * 1024 * 1024 // 30 MB

/**
 * Шаг 6 — загрузка макета. Drag-n-drop + обычный input file. Client-side
 * валидация формата (PDF/AI/EPS/PNG/JPG/SVG) и размера (≤30 MB).
 * Для раст­ровых — data URL превью.
 *
 * Настоящая загрузка в облако — M5 (Resend attachment) или backend M8+.
 * Сейчас файл хранится только в state и отображается превью.
 */
export function StepUpload({ file, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFile(f: File) {
    setError(null)
    if (f.size > MAX_SIZE) {
      setError(`Файл слишком большой (${formatBytes(f.size)}). Максимум 30 MB.`)
      return
    }
    if (!ACCEPTED.includes(f.type) && !/\.(pdf|ai|eps|png|jpe?g|svg)$/i.test(f.name)) {
      setError('Неподдерживаемый формат. Ожидаем PDF, AI, EPS, PNG, JPG или SVG.')
      return
    }

    let dataUrl: string | null = null
    if (f.type.startsWith('image/') && f.size < 4 * 1024 * 1024) {
      dataUrl = await readDataUrl(f)
    }
    onChange({ name: f.name, size: f.size, type: f.type, dataUrl })
  }

  return (
    <StepShell
      id="step-upload"
      number={6}
      title="Макет"
      description="Загрузите макет в PDF, AI, EPS или растре (PNG/JPG). Максимум 30 MB. Макет — не обязателен, можно прислать позже."
    >
      {file ? (
        <div className="flex items-center justify-between gap-4 rounded-lg border-2 border-dark bg-yellow p-4 shadow-sticker-lg text-yellow-ink">
          <div className="flex items-center gap-3">
            <FileCheck2 className="h-6 w-6 shrink-0" strokeWidth={2.5} />
            <div className="flex flex-col overflow-hidden">
              <span className="truncate font-display text-sm font-bold">{file.name}</span>
              <span className="font-mono text-xs">
                {formatBytes(file.size)} · {file.type || 'unknown/type'}
              </span>
            </div>
          </div>
          <button
            type="button"
            aria-label="Удалить файл"
            onClick={() => onChange(null)}
            className="flex h-9 w-9 items-center justify-center rounded-md border-2 border-dark bg-dark text-yellow"
          >
            <X className="h-4 w-4" strokeWidth={3} />
          </button>
        </div>
      ) : (
        <label
          htmlFor="calc-file"
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragging(false)
            const f = e.dataTransfer.files[0]
            if (f) void handleFile(f)
          }}
          className={cn(
            'flex cursor-pointer flex-col items-center gap-3 rounded-lg border-2 border-dashed border-line bg-dark-2 p-10 text-center transition-colors duration-fast',
            dragging && 'border-yellow bg-dark-3',
          )}
        >
          <UploadCloud className="h-10 w-10 text-yellow" strokeWidth={2} />
          <div>
            <p className="font-display text-lg font-bold uppercase">Перетащите сюда макет</p>
            <p className="mt-1 text-sm text-cream/60">или кликните, чтобы выбрать файл</p>
          </div>
          <input
            ref={inputRef}
            id="calc-file"
            type="file"
            accept=".pdf,.ai,.eps,.png,.jpg,.jpeg,.svg"
            className="sr-only"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) void handleFile(f)
            }}
          />
        </label>
      )}

      {error ? (
        <p className="mt-3 text-sm text-red" role="alert">
          {error}
        </p>
      ) : null}
    </StepShell>
  )
}

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / (1024 * 1024)).toFixed(1)} MB`
}

function readDataUrl(file: File): Promise<string | null> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : null)
    reader.onerror = () => resolve(null)
    reader.readAsDataURL(file)
  })
}
