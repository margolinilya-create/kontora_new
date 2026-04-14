export default function RootLoading() {
  return (
    <main className="noise-overlay relative flex min-h-dvh items-center justify-center">
      <div className="relative z-10 flex items-center gap-3">
        <span className="h-2 w-2 animate-pulse rounded-full bg-yellow" />
        <span className="font-mono text-xs uppercase tracking-widest text-cream/60">
          Загружаем…
        </span>
      </div>
    </main>
  )
}
