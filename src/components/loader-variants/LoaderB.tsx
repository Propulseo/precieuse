const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'] as const

interface Props {
  current: number
  total: number
  reducedMotion?: boolean
}

export function LoaderB({ current, total, reducedMotion = false }: Props) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-baseline gap-2 font-display italic">
        <span className="text-[28px] leading-none text-gold">{ROMAN[current] ?? current + 1}</span>
        <span className="text-[14px] text-gold/40">/ {ROMAN[total - 1] ?? total}</span>
      </div>
      <div className="w-10 h-px bg-gold/20 relative overflow-hidden">
        <div
          key={current}
          className={`absolute inset-0 bg-gold ${reducedMotion ? '' : 'loader-fillX'}`}
          style={reducedMotion ? undefined : { transform: 'scaleX(0)' }}
        />
      </div>
    </div>
  )
}
