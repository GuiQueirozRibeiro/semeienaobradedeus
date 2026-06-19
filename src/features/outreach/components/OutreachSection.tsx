'use client'

import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Destaques reais da igreja — uma frente de cada ministério. */
const PHOTOS = [
  { src: '/criancas-escola2.jpeg', cap: 'A escola bíblica das crianças' },
  { src: '/evangelismo-rua4.jpeg', cap: 'Amor que acolhe nas ruas' },
  { src: '/evangelismo-hospital.jpeg', cap: 'Equipe de Missões em ação' },
]

export default function OutreachSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reveal = (selector: string, opts: gsap.TweenVars = {}) => {
        gsap.from(selector, {
          scrollTrigger: { trigger: selector, start: 'top 85%', once: true },
          y: 34, opacity: 0, duration: 0.9, ease: 'power3.out', immediateRender: false, ...opts,
        })
      }
      reveal('.outreach-eyebrow', { y: 16, duration: 0.6 })
      reveal('.outreach-title')
      reveal('.outreach-text')
      reveal('.outreach-photo', { stagger: 0.16, duration: 1 })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="acao" className="relative overflow-hidden" style={{ background: '#fffdf8' }}>
      <div className="grain-overlay absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <p className="outreach-eyebrow font-body text-center" style={{ fontSize: '12px', letterSpacing: '0.34em', color: '#a8542f', fontWeight: 600 }}>
          02 · A IGREJA EM AÇÃO
        </p>
        <h2 className="outreach-title font-heading text-center m-0 mt-5" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#2a241b', fontWeight: 400 }}>
          Servir o próximo é <span className="italic" style={{ color: '#2f5d3a' }}>parte da nossa fé</span>
        </h2>
        <p className="outreach-text font-body text-center mx-auto mt-7" style={{ fontSize: 'clamp(15px, 1.7vw, 18px)', color: '#4a4031', lineHeight: 1.75, maxWidth: '60ch' }}>
          Cada gesto de cuidado, um prato de comida, uma palavra de esperança, é o
          próprio Cristo sendo servido (Mateus 25). Construir esta casa é ampliar a
          nossa capacidade de acolher, alimentar e abraçar a comunidade e as nações.
        </p>

        <div className="grid sm:grid-cols-3 gap-6 md:gap-7 mt-14">
          {PHOTOS.map(p => (
            <figure key={p.src} className="outreach-photo m-0">
              <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #ddd2bd', boxShadow: '0 18px 44px rgba(42,36,27,0.12)' }}>
                <img
                  src={p.src}
                  alt={p.cap}
                  loading="lazy"
                  style={{ display: 'block', width: '100%', aspectRatio: '4 / 5', objectFit: 'cover' }}
                />
              </div>
              <figcaption className="font-body text-center mt-3" style={{ fontSize: '13px', color: '#7c7363', letterSpacing: '0.02em' }}>
                {p.cap}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
