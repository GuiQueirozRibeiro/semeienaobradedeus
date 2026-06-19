'use client'

import { useRef, useState, useEffect, useCallback, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Fotos reais da igreja (escola bíblica, evangelismo, missões). */
const PHOTOS = [
  { src: '/criancas-escola5.jpeg', cap: 'Entrega de certificados na escola bíblica' },
  { src: '/evangelismo-rua2.jpeg', cap: 'Orando juntos nas ruas' },
  { src: '/criancas-escola6.jpeg', cap: 'Crianças aprendendo a Palavra' },
  { src: '/evangelismo-rua1.jpeg', cap: 'Acolhimento e oração na praça' },
  { src: '/criancas-escola1.jpeg', cap: 'Atividades com os pequeninos' },
  { src: '/evangelismo-rua3.jpeg', cap: 'Levando esperança ao centro da cidade' },
  { src: '/criancas-escola3.jpeg', cap: 'Momento do lanche com as crianças' },
  { src: '/evangelismo-rua5.jpeg', cap: 'Ação de evangelismo na praça' },
  { src: '/criancas-escola4.jpeg', cap: 'Aprendendo e brincando juntos' },
]

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [index, setIndex] = useState(0)
  const n = PHOTOS.length

  const go = useCallback((dir: number) => setIndex(i => (i + dir + n) % n), [n])

  // Autoplay contínuo: avança a cada 5s. O timer reinicia a cada troca
  // (inclusive manual), então cliques nas setas/dots não são atropelados.
  useEffect(() => {
    const t = setTimeout(() => setIndex(i => (i + 1) % n), 5000)
    return () => clearTimeout(t)
  }, [index, n])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gallery-reveal', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        y: 32, opacity: 0, duration: 0.85, ease: 'power3.out', stagger: 0.12, immediateRender: false,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="momentos" className="relative overflow-hidden" style={{ background: '#efe6d5' }}>
      <div className="grain-overlay absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-5xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <p className="gallery-reveal font-body text-center" style={{ fontSize: '12px', letterSpacing: '0.34em', color: '#a8542f', fontWeight: 600 }}>
          04 · MOMENTOS
        </p>
        <h2 className="gallery-reveal font-heading text-center m-0 mt-5" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#2a241b', fontWeight: 400 }}>
          A obra que <span className="italic" style={{ color: '#2f5d3a' }}>já acontece</span>
        </h2>
        <p className="gallery-reveal font-body text-center mx-auto mt-7 mb-12" style={{ fontSize: 'clamp(15px, 1.7vw, 18px)', color: '#4a4031', lineHeight: 1.75, maxWidth: '54ch' }}>
          Antes mesmo de levantar as paredes, Deus já transforma vidas através desta
          igreja. Veja alguns momentos da nossa caminhada:
        </p>

        {/* Carrossel */}
        <div
          className="gallery-reveal relative rounded-2xl overflow-hidden"
          style={{ border: '1px solid #ddd2bd', boxShadow: '0 24px 56px rgba(42,36,27,0.18)' }}
        >
          <div className="relative aspect-[4/5] sm:aspect-[16/10]" style={{ background: '#1e3d27' }}>
            {PHOTOS.map((p, i) => (
              <figure
                key={p.src}
                className="absolute inset-0 m-0"
                style={{ opacity: i === index ? 1 : 0, transition: 'opacity 0.7s ease', pointerEvents: i === index ? 'auto' : 'none' }}
                aria-hidden={i !== index}
              >
                {/* preenchimento borrado */}
                <img
                  src={p.src}
                  alt=""
                  aria-hidden="true"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(22px) brightness(0.55)', transform: 'scale(1.12)' }}
                />
                {/* foto nítida, inteira */}
                <img
                  src={p.src}
                  alt={p.cap}
                  loading={i <= 1 ? 'eager' : 'lazy'}
                  style={{ position: 'relative', width: '100%', height: '100%', objectFit: 'contain' }}
                />
                <figcaption
                  className="font-body"
                  style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '40px 20px 18px', background: 'linear-gradient(to top, rgba(15,20,12,0.82), transparent)', color: '#f7f2e9', fontSize: '14px', fontWeight: 600, textAlign: 'center' }}
                >
                  {p.cap}
                </figcaption>
              </figure>
            ))}

            <button onClick={() => go(-1)} aria-label="Foto anterior" className="font-body" style={navBtn('left')}>
              <Chevron dir="left" />
            </button>
            <button onClick={() => go(1)} aria-label="Próxima foto" className="font-body" style={navBtn('right')}>
              <Chevron dir="right" />
            </button>
          </div>

          {/* dots */}
          <div className="flex items-center justify-center gap-2 py-4" style={{ background: '#fffdf8' }}>
            {PHOTOS.map((p, i) => (
              <button
                key={p.src}
                onClick={() => setIndex(i)}
                aria-label={`Ir para a foto ${i + 1}`}
                style={{ width: i === index ? 22 : 8, height: 8, borderRadius: 999, border: 'none', cursor: 'pointer', padding: 0, background: i === index ? '#2f5d3a' : '#cdbfa6', transition: 'all 0.3s ease' }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function navBtn(side: 'left' | 'right'): React.CSSProperties {
  return {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    left: side === 'left' ? 12 : undefined,
    right: side === 'right' ? 12 : undefined,
    width: 44,
    height: 44,
    borderRadius: 999,
    border: 'none',
    cursor: 'pointer',
    background: 'rgba(255,253,248,0.88)',
    color: '#1e3d27',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 14px rgba(0,0,0,0.22)',
  }
}

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ transform: dir === 'left' ? 'rotate(180deg)' : 'none' }}>
      <path d="M9 6l6 6-6 6" stroke="#1e3d27" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
