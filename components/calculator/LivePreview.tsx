import { Laptop, Milk, StickyNote } from 'lucide-react'
import type { PreviewScene, UploadedFileMeta } from '@/lib/calculator/state'
import { cn } from '@/lib/utils/cn'

type Props = {
  scene: PreviewScene
  onSceneChange: (scene: PreviewScene) => void
  width: number
  height: number
  file: UploadedFileMeta | null
}

const scenes: readonly { key: PreviewScene; label: string; icon: React.ReactNode }[] = [
  { key: 'laptop', label: 'Ноутбук', icon: <Laptop className="h-4 w-4" strokeWidth={2.5} /> },
  { key: 'bottle', label: 'Бутылка', icon: <Milk className="h-4 w-4" strokeWidth={2.5} /> },
  { key: 'notebook', label: 'Блокнот', icon: <StickyNote className="h-4 w-4" strokeWidth={2.5} /> },
]

/**
 * Live-превью стикера на физическом объекте. CSS-сцены (ноутбук / бутылка /
 * блокнот) с размером, пересчитанным в viewport-пропорции. При загруженном
 * макете показывает его вместо серой заглушки.
 *
 * TODO(M6): заменить на реальные фото-сцены.
 */
export function LivePreview({ scene, onSceneChange, width, height, file }: Props) {
  const stickerAspect = width / height
  const safeAspect = Number.isFinite(stickerAspect) && stickerAspect > 0 ? stickerAspect : 1

  return (
    <div className="flex flex-col gap-4 rounded-xl  bg-bg-surface p-6 shadow-soft-lg">
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-widest text-yellow">Превью</p>
        <div className="flex gap-1" role="radiogroup" aria-label="Сцена превью">
          {scenes.map((s) => {
            const active = s.key === scene
            return (
              <button
                key={s.key}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onSceneChange(s.key)}
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-md  transition-colors',
                  active ? 'bg-yellow text-yellow-ink' : 'bg-bg-base text-cream-muted hover:text-cream',
                )}
                title={s.label}
              >
                {s.icon}
              </button>
            )
          })}
        </div>
      </div>

      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-md border-2 border-line bg-bg-base">
        <SceneBackdrop scene={scene} />
        <div
          className={cn(
            'relative z-10 flex items-center justify-center overflow-hidden rounded-sm   transition-all duration-300',
            !file && 'bg-cream',
          )}
          style={{
            width: `${Math.min(40, 20 + safeAspect * 10)}%`,
            aspectRatio: safeAspect,
          }}
        >
          {file?.dataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={file.dataUrl}
              alt="Превью загруженного макета"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-dark">
              {width}×{height}
            </span>
          )}
        </div>
      </div>

      <p className="text-center font-mono text-[11px] uppercase tracking-widest text-cream-muted">
        Живое превью · {width}×{height} мм
      </p>
    </div>
  )
}

function SceneBackdrop({ scene }: { scene: PreviewScene }) {
  if (scene === 'laptop') {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[72%] w-[82%] rounded-t-md border-2 border-cream/30 bg-bg-surface-2" />
      </div>
    )
  }
  if (scene === 'bottle') {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[78%] w-[28%] rounded-[40%_40%_20%_20%] border-2 border-cream/30 bg-bg-surface-2" />
      </div>
    )
  }
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-[70%] w-[52%] rotate-2 rounded-sm border-2 border-cream/30 bg-bg-surface-2" />
    </div>
  )
}
