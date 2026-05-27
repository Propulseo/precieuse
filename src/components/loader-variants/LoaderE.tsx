const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'] as const

interface Props {
  current: number
  total: number
  reducedMotion?: boolean
}

export function LoaderE({ current, total, reducedMotion = false }: Props) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="font-display italic text-[13px] text-ink leading-none">
        {ROMAN[current] ?? current + 1}
      </span>
      <div className="relative w-px h-16 bg-ink/15 overflow-hidden">
        <div
          key={current}
          className={`absolute inset-0 bg-gold ${reducedMotion ? '' : 'loader-fillY'}`}
          style={reducedMotion ? undefined : { transform: 'scaleY(0)' }}
        />
      </div>
      <span className="font-display italic text-[13px] text-ink/40 leading-none">
        {ROMAN[total - 1] ?? total}
      </span>
    </div>
  )
}
