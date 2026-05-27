interface Props {
  current: number
  total: number
  reducedMotion?: boolean
}

export function LoaderD({ current, reducedMotion = false }: Props) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      className="-rotate-90"
      aria-hidden
    >
      <circle
        cx="14"
        cy="14"
        r="12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        className="text-ink/15"
      />
      {!reducedMotion && (
        <circle
          key={current}
          cx="14"
          cy="14"
          r="12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset="1"
          className="text-gold loader-ring-fill"
        />
      )}
    </svg>
  )
}
