'use client'

import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PixCard from './PixCard'

gsap.registerPlugin(ScrollTrigger)

export default function DonateSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.donate-reveal', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
        y: 34, opacity: 0, duration: 0.85, ease: 'power3.out', stagger: 0.12, immediateRender: false,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="doar"
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(165deg, #1e3d27 0%, #2f5d3a 55%, #1b3522 100%)' }}
    >
      {/* grain (dark → screen blend) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          opacity: 0.06, mixBlendMode: 'screen',
        }}
        aria-hidden="true"
      />
      {/* gold light from top */}
      <div
        className="absolute inset-0 pointer-events-none sun-drift"
        style={{ background: 'radial-gradient(ellipse 50% 45% at 50% 0%, rgba(201,162,75,0.22) 0%, transparent 60%)' }}
        aria-hidden="true"
      />
      <span className="absolute top-10 left-10 w-8 h-8 border-l border-t pointer-events-none" style={{ borderColor: 'rgba(201,162,75,0.35)' }} aria-hidden="true" />
      <span className="absolute bottom-10 right-10 w-8 h-8 border-r border-b pointer-events-none" style={{ borderColor: 'rgba(201,162,75,0.35)' }} aria-hidden="true" />

      <div className="relative max-w-4xl mx-auto px-6 md:px-12 py-24 md:py-36">

        {/* ── Heading ───────────────────────────────────────── */}
        <p className="donate-reveal font-body text-center" style={{ fontSize: '12px', letterSpacing: '0.34em', color: '#e0b65c', fontWeight: 600 }}>
          03 · SEMEIE
        </p>
        <h2 className="donate-reveal font-heading text-center m-0 mt-5" style={{ fontSize: 'clamp(2.3rem, 5.5vw, 4rem)', lineHeight: 1.04, letterSpacing: '-0.02em', color: '#f7f2e9', fontWeight: 400 }}>
          Doe aquilo que <span className="italic" style={{ color: '#e8c879' }}>Deus tocar no seu coração</span>
        </h2>
        <p className="donate-reveal font-body text-center mx-auto mt-7 mb-12" style={{ fontSize: 'clamp(15px, 1.7vw, 18px)', color: 'rgba(247,242,233,0.78)', lineHeight: 1.75, maxWidth: '52ch' }}>
          Cada valor, grande ou pequeno, levanta uma parede desta casa e abre
          portas para que muitas vidas sejam alcançadas. Faça a sua doação:
        </p>

        {/* ── PIX card ──────────────────────────────────────── */}
        <PixCard />

        {/* ── Reassurance row ───────────────────────────────── */}
        <div className="donate-reveal grid sm:grid-cols-3 gap-5 mt-16">
          {[
            { t: 'Cada centavo na obra', d: 'Sua doação vai direto para a construção da casa de Deus.' },
            { t: 'Doação voluntária', d: 'Você escolhe o valor. “Cada um conforme propôs no coração.”' },
            { t: 'Na hora, sem taxas', d: 'O PIX cai instantaneamente, sem burocracia.' },
          ].map(item => (
            <div key={item.t} className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="rounded-full" style={{ width: 6, height: 6, background: '#e8c879' }} />
                <span className="font-body" style={{ fontSize: '14px', color: '#f7f2e9', fontWeight: 600 }}>{item.t}</span>
              </div>
              <span className="font-body" style={{ fontSize: '13px', color: 'rgba(247,242,233,0.6)', lineHeight: 1.6 }}>{item.d}</span>
            </div>
          ))}
        </div>

        {/* ── Closing verse ─────────────────────────────────── */}
        <p className="donate-reveal font-heading italic text-center mx-auto mt-20" style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)', color: '#e8c879', lineHeight: 1.55, maxWidth: '40ch', fontWeight: 400 }}>
          “Deus ama a quem dá com alegria.”
          <span className="block font-body not-italic mt-3" style={{ fontSize: '12px', letterSpacing: '0.2em', color: 'rgba(247,242,233,0.55)', fontWeight: 600 }}>
            2 CORÍNTIOS 9:7
          </span>
        </p>
      </div>
    </section>
  )
}
