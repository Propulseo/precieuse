interface Props {
  current: number
  total: number
  reducedMotion?: boolean
}

export function LoaderC({ current, total, reducedMotion = false }: Props) {
  return (
    <div className="flex items-center justify-center gap-4">
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === current
        return (
          <div key={i} className="relative w-2 h-2 flex items-center justify-center">
            {isActive && !reducedMotion && (
              <div
                key={current}
                className="absolute w-2 h-2 rounded-full bg-gold/45 loader-halo"
                aria-hidden
              />
            )}
            <div
              className={`relative w-2 h-2 rounded-full border transition-colors duration-300 ${
                isActive
                  ? 'bg-rose-gold border-rose-gold'
                  : 'bg-transparent border-ink/30'
              }`}
            />
          </div>
        )
      })}
    </div>
  )
}
