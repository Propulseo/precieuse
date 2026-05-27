interface Props {
  current: number
  total: number
  reducedMotion?: boolean
}

export function LoaderA({ current, reducedMotion = false }: Props) {
  return (
    <div className="w-[200px] h-px bg-ink/15 relative overflow-hidden">
      <div
        key={current}
        className={`absolute inset-0 bg-gold ${reducedMotion ? '' : 'loader-fillX'}`}
        style={reducedMotion ? undefined : { transform: 'scaleX(0)' }}
      />
    </div>
  )
}
