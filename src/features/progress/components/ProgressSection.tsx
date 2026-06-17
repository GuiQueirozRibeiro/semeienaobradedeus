'use client'

import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ProgressSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.obra-reveal', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        y: 32, opacity: 0, duration: 0.85, ease: 'power3.out', stagger: 0.12, immediateRender: false,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="meta"
      className="relative overflow-hidden"
      style={{ background: '#f7f2e9' }}
    >
      <div className="grain-overlay absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-5xl mx-auto px-6 md:px-12 py-24 md:py-36">

        <p className="obra-reveal font-body text-center" style={{ fontSize: '12px', letterSpacing: '0.34em', color: '#a8542f', fontWeight: 600 }}>
          03 · A OBRA
        </p>
        <h2 className="obra-reveal font-heading text-center m-0 mt-5" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#2a241b', fontWeight: 400 }}>
          Conheça o projeto da <span className="italic" style={{ color: '#2f5d3a' }}>nossa casa</span>
        </h2>
        <p className="obra-reveal font-body text-center mx-auto mt-7" style={{ fontSize: 'clamp(15px, 1.7vw, 18px)', color: '#4a4031', lineHeight: 1.75, maxWidth: '54ch' }}>
          Um espaço pensado para adorar, acolher e servir. Este é o projeto
          arquitetônico da nova Igreja Evangélica Batista Ganhando as Nações.
        </p>

        {/* ── Project render ────────────────────────────────── */}
        <div className="obra-reveal relative mt-12">
          <div
            className="absolute -inset-4 sun-drift pointer-events-none"
            style={{ background: 'radial-gradient(circle at 50% 40%, rgba(201,162,75,0.22) 0%, transparent 65%)' }}
            aria-hidden="true"
          />
          <a
            href="/projeto-obra.jpeg"
            target="_blank"
            rel="noopener noreferrer"
            className="relative block rounded-2xl overflow-hidden"
            style={{ border: '1px solid #ddd2bd', boxShadow: '0 24px 56px rgba(42,36,27,0.16)' }}
          >
            <img
              src="/projeto-obra.jpeg"
              alt="Projeto arquitetônico da igreja: planta baixa e fachadas"
              loading="lazy"
              style={{ display: 'block', width: '100%', height: 'auto' }}
            />
          </a>
          <p className="font-body text-center mt-3" style={{ fontSize: '12px', color: '#7c7363', letterSpacing: '0.04em' }}>
            Projeto arquitetônico · toque para ampliar
          </p>
        </div>

        {/* ── CTA ───────────────────────────────────────────── */}
        <div className="obra-reveal text-center mt-14">
          <a
            href="#doar"
            onClick={e => { e.preventDefault(); document.getElementById('doar')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="font-body inline-flex items-center justify-center"
            style={{
              fontSize: '13px', letterSpacing: '0.06em', fontWeight: 600, color: '#fff',
              textDecoration: 'none', padding: '16px 38px', borderRadius: '999px', background: '#c0683f',
              boxShadow: '0 10px 26px rgba(192,104,63,0.3)', transition: 'background 0.3s, transform 0.2s, box-shadow 0.3s',
            }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.background = '#a8542f'; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 14px 32px rgba(192,104,63,0.38)' }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.background = '#c0683f'; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 10px 26px rgba(192,104,63,0.3)' }}
          >
            QUERO SEMEAR NESTA OBRA
          </a>
        </div>
      </div>
    </section>
  )
}
