type SvgProps = { className?: string; stroke: string; strokeWidth?: number }

const base = (s: string, w = 1) => ({
  stroke: s,
  strokeWidth: w,
  fill: 'none',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
})

export function ArtDecoFrieze({ className, stroke, strokeWidth = 0.8 }: SvgProps) {
  const s = base(stroke, strokeWidth)
  const tiles = Array.from({ length: 24 }, (_, i) => i * 24)
  return (
    <svg viewBox="0 0 576 24" className={className} aria-hidden="true" preserveAspectRatio="none">
      <line x1="0" y1="2" x2="576" y2="2" {...s} />
      <line x1="0" y1="22" x2="576" y2="22" {...s} />
      {tiles.map((x, i) => (
        <g key={i}>
          <path d={`M${x + 12} 4 L${x + 22} 12 L${x + 12} 20 L${x + 2} 12 Z`} {...s} />
          <line x1={x + 12} y1="4" x2={x + 12} y2="20" {...s} opacity="0.5" />
        </g>
      ))}
    </svg>
  )
}

export function SunburstFan({ className, stroke, strokeWidth = 0.8 }: SvgProps) {
  const s = base(stroke, strokeWidth)
  const rays = Array.from({ length: 13 }, (_, i) => -60 + i * 10)
  return (
    <svg viewBox="0 0 200 120" className={className} aria-hidden="true">
      <g transform="translate(100 110)">
        {rays.map((deg) => (
          <line key={deg} x1="0" y1="0" x2="0" y2="-100" {...s} transform={`rotate(${deg})`} opacity="0.65" />
        ))}
        <path d="M-100 0 A100 100 0 0 1 100 0" {...s} />
        <path d="M-70 0 A70 70 0 0 1 70 0" {...s} opacity="0.5" />
        <circle cx="0" cy="0" r="4" {...s} fill={stroke ?? 'currentColor'} />
      </g>
    </svg>
  )
}

export function DecoCornerFrame({ className, stroke, strokeWidth = 1 }: SvgProps) {
  const s = base(stroke, strokeWidth)
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
      <path d="M4 30 L4 4 L30 4" {...s} />
      <path d="M10 22 L10 10 L22 10" {...s} opacity="0.6" />
      <path d="M16 14 L16 16 L24 16" {...s} opacity="0.4" />
      <path d="M14 16 L20 22" {...s} opacity="0.5" />
      <circle cx="14" cy="14" r="1.5" {...s} fill={stroke ?? 'currentColor'} />
    </svg>
  )
}

export function BrilliantCutScheme({ className, stroke, strokeWidth = 0.7 }: SvgProps) {
  const s = base(stroke, strokeWidth)
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <polygon points="60,8 108,42 90,108 30,108 12,42" {...s} />
      <polygon points="60,8 90,42 60,68 30,42" {...s} />
      <line x1="12" y1="42" x2="108" y2="42" {...s} opacity="0.6" />
      <line x1="60" y1="8" x2="60" y2="68" {...s} opacity="0.5" />
      <line x1="30" y1="42" x2="60" y2="68" {...s} opacity="0.5" />
      <line x1="90" y1="42" x2="60" y2="68" {...s} opacity="0.5" />
      <line x1="30" y1="108" x2="60" y2="68" {...s} opacity="0.4" />
      <line x1="90" y1="108" x2="60" y2="68" {...s} opacity="0.4" />
    </svg>
  )
}
