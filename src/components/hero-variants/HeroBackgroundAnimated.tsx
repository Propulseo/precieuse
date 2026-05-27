import { useEffect, useRef, type ReactNode } from 'react'

export type HeroAnim = 'A' | 'B' | 'C' | 'D' | 'E'

type Props = {
  children: ReactNode
  anim: HeroAnim
}

const OVERLAY = [
  'radial-gradient(ellipse at 50% 38%, rgba(8,4,2,0.55) 0%, rgba(8,4,2,0.20) 38%, rgba(8,4,2,0) 60%)',
  'linear-gradient(180deg, rgba(8,4,2,0.25) 0%, rgba(8,4,2,0.05) 30%, rgba(8,4,2,0.0) 60%, rgba(8,4,2,0.45) 100%)',
].join(', ')

const BASE_FILTER = 'saturate(1.20) brightness(0.85) contrast(1.05)'

export function HeroBackgroundAnimated({ children, anim }: Props) {
  const imgRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    if (anim !== 'D') return
    const img = imgRef.current
    if (!img) return

    let frame = 0
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        img.style.transform = `scale(1.06) translate(${(-x * 12).toFixed(2)}px, ${(-y * 8).toFixed(2)}px)`
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [anim])

  const imgClasses = [
    'absolute inset-0 w-full h-full object-cover',
    anim === 'A' && 'motion-safe:animate-[kenburns_22s_ease-in-out_infinite]',
    anim === 'B' && 'motion-safe:animate-[fadeInZoom_2s_ease-out_both,kenburns_22s_ease-in-out_2s_infinite]',
    anim === 'C' && 'motion-safe:animate-[kenburns_22s_ease-in-out_infinite]',
    anim === 'E' && 'motion-safe:animate-[fadeInZoom_2s_ease-out_both,kenburns_22s_ease-in-out_2s_infinite,breathe_9s_ease-in-out_2s_infinite]',
  ]
    .filter(Boolean)
    .join(' ')

  const imgStyle: React.CSSProperties = {
    filter: BASE_FILTER,
    objectPosition: 'center 72%',
    transform: 'scale(1.04)',
    transformOrigin: 'center',
  }

  return (
    <section className="relative min-h-screen pt-16 overflow-hidden flex flex-col -mt-16">
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <img
          ref={imgRef}
          src="/images/gemmyo.jpg"
          alt=""
          fetchPriority="high"
          className={imgClasses}
          style={imgStyle}
        />

        {(anim === 'C' || anim === 'E') && (
          <div
            className="absolute inset-0 pointer-events-none motion-safe:animate-[lightPass_14s_ease-in-out_infinite]"
            style={{
              background:
                'linear-gradient(110deg, transparent 35%, rgba(255,225,170,0.18) 50%, transparent 65%)',
              backgroundSize: '250% 100%',
              backgroundPosition: '-50% 0',
              mixBlendMode: 'screen',
            }}
          />
        )}

        <div className="absolute inset-0" style={{ background: OVERLAY }} />
      </div>

      {children}

      <style>{`
        @keyframes kenburns {
          0%, 100% { transform: scale(1.04) translate(0, 0); }
          50% { transform: scale(1.12) translate(-0.6%, -0.4%); }
        }
        @keyframes fadeInZoom {
          0% { opacity: 0; filter: ${BASE_FILTER} blur(10px); transform: scale(1.10); }
          100% { opacity: 1; filter: ${BASE_FILTER} blur(0); transform: scale(1.04); }
        }
        @keyframes breathe {
          0%, 100% { filter: saturate(1.20) brightness(0.85) contrast(1.05); }
          50% { filter: saturate(1.25) brightness(0.94) contrast(1.05); }
        }
        @keyframes lightPass {
          0%, 12% { background-position: -50% 0; opacity: 0; }
          18% { opacity: 1; }
          40%, 100% { background-position: 150% 0; opacity: 0; }
        }
      `}</style>
    </section>
  )
}
