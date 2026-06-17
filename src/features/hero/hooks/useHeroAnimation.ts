'use client'
import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'

export function useHeroAnimation(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo('.hero-eyebrow',
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '+=0.2'
      )
        .fromTo('.hero-title-line',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.12 },
          '-=0.2'
        )
        .fromTo('.hero-verse',
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          '-=0.35'
        )
        .fromTo('.hero-cta',
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.1 },
          '-=0.3'
        )
        .fromTo('.hero-scroll-indicator',
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.5 },
          '+=0.2'
        )

      /* ── "Desenha" o broto crescendo (stroke-draw) ─────────── */
      const sprout = containerRef.current?.querySelector<SVGPathElement>('.sprout-stem')
      if (sprout) {
        const len = sprout.getTotalLength()
        gsap.set(sprout, { strokeDasharray: len, strokeDashoffset: len })
        gsap.to(sprout, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut', delay: 0.8 })
      }
      gsap.fromTo('.sprout-leaf',
        { scale: 0, transformOrigin: 'bottom center', opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.7)', stagger: 0.2, delay: 1.8 }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [containerRef])
}
