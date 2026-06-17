'use client'

import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PILLARS = [
  {
    title: 'Adoração',
    body: 'Um lugar digno e preparado para a igreja se encontrar com a presença de Deus.',
    icon: IconFlame,
  },
  {
    title: 'Acolhimento',
    body: 'Portas abertas para famílias, crianças e todo aquele que precisa de cuidado e esperança.',
    icon: IconHeart,
  },
  {
    title: 'Missões',
    body: 'Uma base para alcançar a nossa cidade e as nações com o amor de Cristo.',
    icon: IconGlobe,
  },
]

export default function VisionSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reveal = (selector: string, opts: gsap.TweenVars = {}) => {
        gsap.from(selector, {
          scrollTrigger: { trigger: selector, start: 'top 85%', once: true },
          y: 34, opacity: 0, duration: 0.9, ease: 'power3.out', immediateRender: false, ...opts,
        })
      }

      reveal('.vision-eyebrow', { y: 16, duration: 0.6 })
      reveal('.vision-title')
      reveal('.vision-body p', { stagger: 0.12 })
      reveal('.vision-art', { duration: 1 })
      reveal('.vision-scripture', { duration: 1 })
      reveal('.vision-card', { stagger: 0.14 })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="visao"
      className="relative overflow-hidden"
      style={{ background: '#efe6d5' }}
    >
      {/* top hairline */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(168,84,47,0.35), transparent)' }} aria-hidden="true" />
      {/* grain */}
      <div className="grain-overlay absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-36">

        <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-center">

          {/* ── Left: copy ──────────────────────────────────── */}
          <div>
            <p className="vision-eyebrow font-body" style={{ fontSize: '12px', letterSpacing: '0.34em', color: '#a8542f', fontWeight: 600 }}>
              01 · A VISÃO
            </p>

            <h2 className="vision-title font-heading m-0 mt-5" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#2a241b', fontWeight: 400 }}>
              Ajude a erguer uma igreja que <span className="italic" style={{ color: '#2f5d3a' }}>acolhe pessoas</span>
            </h2>

            <div className="vision-body font-body mt-8 flex flex-col gap-5" style={{ fontSize: 'clamp(15px, 1.6vw, 17px)', color: '#4a4031', lineHeight: 1.8, maxWidth: '52ch' }}>
              <p style={{ margin: 0 }}>
                A <strong style={{ color: '#2a241b', fontWeight: 600 }}>Igreja Evangélica Batista Ganhando as Nações</strong> nasceu
                de um chamado simples: levar esperança a cada coração e abrir
                as portas de um lar espiritual para a nossa comunidade.
              </p>
              <p style={{ margin: 0 }}>
                Hoje nos reunimos onde é possível, mas Deus colocou em nosso coração o
                sonho de uma <strong style={{ color: '#2a241b', fontWeight: 600 }}>casa permanente</strong>:
                um espaço para adorar, acolher famílias, cuidar de crianças e
                adolescentes e servir os que mais precisam.
              </p>
              <p style={{ margin: 0 }}>
                Construir esse templo é plantar uma semente que vai frutificar por gerações.
                E essa obra se ergue com a contribuição de cada um que decide semear.
              </p>
            </div>
          </div>

          {/* ── Right: project render ───────────────────────── */}
          <div className="vision-art relative">
            <div
              className="absolute -inset-6 sun-drift pointer-events-none"
              style={{ background: 'radial-gradient(circle at 50% 40%, rgba(201,162,75,0.25) 0%, transparent 65%)' }}
              aria-hidden="true"
            />
            <a
              href="/projeto-obra.jpeg"
              target="_blank"
              rel="noopener noreferrer"
              className="relative block rounded-2xl overflow-hidden"
              style={{ border: '1px solid #ddd2bd', boxShadow: '0 28px 60px rgba(42,36,27,0.18)' }}
            >
              <img
                src="/projeto-obra-2.jpeg"
                alt="Projeto do interior da Igreja Batista Ganhando as Nações: nave, mezanino e salas"
                loading="lazy"
                style={{ display: 'block', width: '100%', height: 'auto' }}
              />
            </a>
            <p className="font-body text-center mt-3" style={{ fontSize: '12px', color: '#7c7363', letterSpacing: '0.04em' }}>
              Projeto arquitetônico · toque para ampliar
            </p>
          </div>
        </div>

        {/* ── Scripture band (Mateus 25:40) ─────────────────── */}
        <figure
          className="vision-scripture relative mx-auto mt-20 md:mt-28 text-center rounded-3xl px-8 py-12 md:py-16"
          style={{ maxWidth: 880, background: '#fffdf8', border: '1px solid #ddd2bd', boxShadow: '0 14px 40px rgba(42,36,27,0.06)' }}
        >
          <span className="font-heading" style={{ position: 'absolute', top: 8, left: 28, fontSize: '5rem', lineHeight: 1, color: 'rgba(168,84,47,0.18)' }} aria-hidden="true">“</span>
          <blockquote className="font-heading italic m-0" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.9rem)', lineHeight: 1.5, color: '#2a241b', fontWeight: 400 }}>
            Em verdade vos digo que, quando o fizestes a um destes meus
            pequeninos irmãos, a mim o fizestes.
          </blockquote>
          <figcaption className="font-body mt-6" style={{ fontSize: '12px', letterSpacing: '0.2em', color: '#a8542f', fontWeight: 700 }}>
            MATEUS 25:40
          </figcaption>
        </figure>

        {/* ── Pillars ───────────────────────────────────────── */}
        <div className="grid sm:grid-cols-3 gap-5 md:gap-7 mt-16 md:mt-20">
          {PILLARS.map(p => {
            const Icon = p.icon
            return (
              <div
                key={p.title}
                className="vision-card rounded-2xl p-7 md:p-8"
                style={{ background: '#fffdf8', border: '1px solid #ddd2bd', boxShadow: '0 10px 30px rgba(42,36,27,0.05)' }}
              >
                <div
                  className="flex items-center justify-center rounded-xl mb-5"
                  style={{ width: 48, height: 48, background: 'rgba(47,93,58,0.09)' }}
                >
                  <Icon />
                </div>
                <h3 className="font-heading m-0" style={{ fontSize: '1.4rem', color: '#2a241b', fontWeight: 500 }}>
                  {p.title}
                </h3>
                <p className="font-body mt-3 m-0" style={{ fontSize: '15px', color: '#4a4031', lineHeight: 1.65 }}>
                  {p.body}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ── Inline icons (no external dependency) ─────────────────────── */
function IconFlame() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3c0 4-5 5-5 9a5 5 0 0010 0c0-2-1-3-2-4 0 1.5-1 2-1.5 1.5C13.5 8 12 6 12 3Z" stroke="#2f5d3a" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}
function IconHeart() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 20s-7-4.5-7-9.5A3.5 3.5 0 0112 7a3.5 3.5 0 017 3.5C19 15.5 12 20 12 20Z" stroke="#2f5d3a" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  )
}
function IconGlobe() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="#2f5d3a" strokeWidth="1.6" />
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" stroke="#2f5d3a" strokeWidth="1.6" />
    </svg>
  )
}
