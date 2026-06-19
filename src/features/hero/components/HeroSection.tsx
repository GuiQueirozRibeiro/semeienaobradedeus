'use client'
import { useRef } from 'react'
import { useHeroAnimation } from '../hooks/useHeroAnimation'
import { SITE } from '../../../config'

function scrollTo(id: string) {
  return (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
}

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  useHeroAnimation(heroRef)

  return (
    <section
      id="topo"
      ref={heroRef}
      className="relative min-h-svh overflow-hidden flex items-center justify-center"
    >
      {/* ── Warm gradient base ── */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(165deg, #fbf7ef 0%, #f3ecdd 48%, #e9dcc4 100%)' }}
        aria-hidden="true"
      />

      {/* ── Drifting sun glow (top) ── */}
      <div
        className="sun-drift absolute pointer-events-none"
        style={{
          top: '-18%', left: '50%', width: '120vw', height: '70vh', transform: 'translateX(-50%)',
          background: 'radial-gradient(ellipse 50% 60% at 50% 0%, rgba(201,162,75,0.28) 0%, rgba(201,162,75,0.06) 45%, transparent 72%)',
        }}
        aria-hidden="true"
      />

      {/* ── Soft leaf glow (bottom-left) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 45% 55% at 8% 100%, rgba(47,93,58,0.10) 0%, transparent 60%)' }}
        aria-hidden="true"
      />

      {/* ── Grain texture ── */}
      <div className="grain-overlay absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* ── Watermark word ── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none"
        aria-hidden="true"
      >
        <span
          className="font-heading leading-none"
          style={{ fontSize: 'clamp(14rem, 46vw, 60rem)', color: 'rgba(42,36,27,0.03)', letterSpacing: '-0.04em', fontWeight: 600 }}
        >
          SEMEIE
        </span>
      </div>

      {/* ── Corner brackets ── */}
      {[
        { pos: { top: 28, left: 28 }, b: 'border-l border-t' },
        { pos: { top: 28, right: 28 }, b: 'border-r border-t' },
        { pos: { bottom: 28, left: 28 }, b: 'border-l border-b' },
        { pos: { bottom: 28, right: 28 }, b: 'border-r border-b' },
      ].map((c, i) => (
        <span
          key={i}
          className={`absolute w-7 h-7 pointer-events-none ${c.b}`}
          style={{ ...c.pos, borderColor: 'rgba(47,93,58,0.28)' }}
          aria-hidden="true"
        />
      ))}

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">

        {/* Sprout illustration (animated) */}
        <Sprout />

        <p
          className="hero-eyebrow font-body mt-7"
          style={{ opacity: 0, fontSize: '12px', letterSpacing: '0.34em', color: '#a8542f', fontWeight: 600 }}
        >
          IGREJA EV. BATISTA · GANHANDO AS NAÇÕES
        </p>

        <h1 className="font-heading m-0 mt-5" style={{ lineHeight: 0.98, letterSpacing: '-0.02em' }}>
          <span
            className="hero-title-line block italic"
            style={{ opacity: 0, fontSize: 'clamp(1.4rem, 4vw, 2.4rem)', fontWeight: 400, lineHeight: 1.1, color: '#a8542f', marginBottom: '0.2em' }}
          >
            Campanha
          </span>
          <span
            className="hero-title-line block"
            style={{ opacity: 0, fontSize: 'clamp(3rem, 9vw, 6.5rem)', fontWeight: 400, color: '#2a241b' }}
          >
            Semeie na
          </span>
          <span
            className="hero-title-line block italic"
            style={{ opacity: 0, fontSize: 'clamp(3rem, 9vw, 6.5rem)', fontWeight: 500, color: '#2f5d3a' }}
          >
            Obra de Deus
          </span>
        </h1>

        <p
          className="hero-verse font-body mt-9"
          style={{ opacity: 0, fontSize: 'clamp(15px, 1.7vw, 18px)', color: '#4a4031', lineHeight: 1.7, maxWidth: '46ch' }}
        >
          “Aquele que semeia pouco, pouco também colherá; e o que semeia
          com fartura, com fartura também colherá.”
          <span className="block mt-2 font-heading italic" style={{ color: '#a8542f', fontSize: '0.85em' }}>
            2 Coríntios 9:6
          </span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-11">
          <a
            href="#pix"
            onClick={scrollTo('pix')}
            className="hero-cta font-body inline-flex items-center justify-center"
            style={{
              opacity: 0, fontSize: '13px', letterSpacing: '0.06em', fontWeight: 600, color: '#fff',
              textDecoration: 'none', padding: '15px 34px', borderRadius: '999px', background: '#2f5d3a',
              boxShadow: '0 10px 26px rgba(47,93,58,0.26)', transition: 'background 0.3s, box-shadow 0.3s, transform 0.2s',
            }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.background = '#1e3d27'; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 14px 32px rgba(47,93,58,0.34)' }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.background = '#2f5d3a'; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 10px 26px rgba(47,93,58,0.26)' }}
          >
            QUERO SEMEAR
          </a>
          <a
            href="#visao"
            onClick={scrollTo('visao')}
            className="hero-cta font-body inline-flex items-center justify-center gap-2"
            style={{
              opacity: 0, fontSize: '13px', letterSpacing: '0.06em', fontWeight: 600, color: '#2f5d3a',
              textDecoration: 'none', padding: '15px 30px', borderRadius: '999px',
              border: '1.5px solid rgba(47,93,58,0.35)', background: 'rgba(255,255,255,0.4)',
              transition: 'background 0.3s, border-color 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(47,93,58,0.08)'; e.currentTarget.style.borderColor = 'rgba(47,93,58,0.6)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.4)'; e.currentTarget.style.borderColor = 'rgba(47,93,58,0.35)' }}
          >
            CONHECER A VISÃO
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <span className="font-body" style={{ fontSize: '9px', letterSpacing: '0.4em', color: '#7c7363', fontWeight: 600 }}>
          {SITE.cidade.toUpperCase()}
        </span>
        <div className="relative w-px h-9 overflow-hidden" style={{ background: 'rgba(124,115,99,0.25)' }}>
          <div className="scroll-pulse absolute inset-x-0 top-0 h-4" style={{ background: 'rgba(47,93,58,0.7)' }} />
        </div>
      </div>
    </section>
  )
}

/* ── Animated sprout: stem draws in, leaves pop ────────────────── */
function Sprout() {
  return (
    <svg width="74" height="74" viewBox="0 0 100 100" fill="none" aria-hidden="true">
      {/* soil line */}
      <path d="M28 92 H72" stroke="#a8542f" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
      {/* seed */}
      <circle cx="50" cy="89" r="2.6" fill="#a8542f" />
      {/* stem (draws in) */}
      <path
        className="sprout-stem"
        d="M50 88 C 49 72, 51 58, 50 40"
        stroke="#2f5d3a"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      {/* left leaf */}
      <path
        className="sprout-leaf"
        d="M50 60 C 39 60, 30 53, 27 41 C 40 41, 49 49, 50 60 Z"
        fill="#4f7e58"
      />
      {/* right leaf (terracotta accent) */}
      <path
        className="sprout-leaf"
        d="M50 50 C 51 39, 60 31, 73 30 C 72 42, 62 50, 50 50 Z"
        fill="#c0683f"
      />
    </svg>
  )
}
