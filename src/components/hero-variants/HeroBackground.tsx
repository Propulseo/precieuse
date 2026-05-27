import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

const OVERLAY = [
  'radial-gradient(ellipse at 50% 38%, rgba(8,4,2,0.55) 0%, rgba(8,4,2,0.20) 38%, rgba(8,4,2,0) 60%)',
  'linear-gradient(180deg, rgba(8,4,2,0.25) 0%, rgba(8,4,2,0.05) 30%, rgba(8,4,2,0.0) 60%, rgba(8,4,2,0.45) 100%)',
].join(', ')

export function HeroBackground({ children, className = '' }: Props) {
  return (
    <section
      className={`relative min-h-screen pt-16 overflow-hidden flex flex-col -mt-16 ${className}`}
    >
      <div aria-hidden="true" className="absolute inset-0">
        <img
          src="/images/gemmyo.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: 'saturate(1.20) brightness(0.85) contrast(1.05)',
            objectPosition: 'center 72%',
            transform: 'scale(1.04)',
          }}
        />
        <div className="absolute inset-0" style={{ background: OVERLAY }} />
      </div>
      {children}
    </section>
  )
}
