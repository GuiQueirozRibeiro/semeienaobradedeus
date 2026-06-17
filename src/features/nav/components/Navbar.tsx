'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import gsap from 'gsap'

const NAV_LINKS = [
  { label: 'A Visão', href: '#visao' },
  { label: 'A Obra',  href: '#meta'  },
  { label: 'Como Doar', href: '#doar' },
]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  /* ── Scroll detection ──────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Lock body scroll when mobile menu is open ─────────────── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  /* ── Entrance: slides down after hero load ──────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(navRef.current,
        { y: -28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 1.4 }
      )
    })
    return () => ctx.revert()
  }, [])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          opacity: 0, /* GSAP entrance controls this */
          background: scrolled ? 'rgba(247,242,233,0.82)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(140%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(140%)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(221,210,189,0.9)'
            : '1px solid transparent',
          transition:
            'background 0.45s ease, backdrop-filter 0.45s ease, border-color 0.45s ease',
        }}
      >
        {/* Top accent line — visible only when scrolled */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, transparent 0%, rgba(47,93,58,0.6) 40%, rgba(192,104,63,0.5) 65%, transparent 100%)',
            opacity: scrolled ? 1 : 0,
            transition: 'opacity 0.45s ease',
          }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-6 md:px-10 h-[60px] md:h-[68px] flex justify-between items-center md:grid md:grid-cols-[auto_1fr_auto] gap-0">

          {/* ── Logo / wordmark ───────────────────────────────── */}
          <a href="#topo" className="flex items-center gap-2.5 flex-shrink-0">
            <SeedMark />
            <span
              className="font-heading hidden sm:block"
              style={{
                fontSize: '13px',
                letterSpacing: '0.04em',
                fontWeight: 600,
                color: '#2f5d3a',
              }}
            >
              Semeie na Obra
            </span>
          </a>

          {/* ── Desktop links ─────────────────────────────────── */}
          <div className="hidden md:flex items-center justify-center gap-7 lg:gap-9 px-4">
            {NAV_LINKS.map(link => (
              <DesktopLink key={link.href} href={link.href} label={link.label} />
            ))}
          </div>

          {/* ── CTA + Hamburger ───────────────────────────────── */}
          <div className="flex items-center gap-4 justify-end">
            <CTAButton />

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden p-2 flex flex-col justify-center gap-[5px]"
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              style={{ width: '32px', height: '32px' }}
            >
              <Hamburger open={menuOpen} />
            </button>
          </div>

        </div>
      </nav>

      {/* ── Mobile overlay menu ─────────────────────────────────── */}
      <MobileMenu open={menuOpen} links={NAV_LINKS} onClose={closeMenu} />
    </>
  )
}

/* ── Seed mark: a small growing-sprout glyph in SVG ────────────── */
function SeedMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <path
        d="M13 23V11"
        stroke="#2f5d3a"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M13 13C13 9 10 6 5 6c0 4 3 7 8 7Z"
        fill="#4f7e58"
        opacity="0.9"
      />
      <path
        d="M13 11c0-3.6 2.7-6.4 7.2-6.4C20.2 8.2 17.5 11 13 11Z"
        fill="#c0683f"
        opacity="0.92"
      />
      <circle cx="13" cy="23" r="1.4" fill="#a8542f" />
    </svg>
  )
}

/* ── Desktop link with animated underline ──────────────────────── */
function DesktopLink({ href, label }: { href: string; label: string }) {
  const lineRef = useRef<HTMLSpanElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className="relative font-body"
      style={{
        fontSize: '13px',
        letterSpacing: '0.06em',
        fontWeight: 500,
        color: '#4a4031',
        textDecoration: 'none',
        paddingBottom: '5px',
        transition: 'color 0.25s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.color = '#2f5d3a'
        if (lineRef.current) lineRef.current.style.transform = 'scaleX(1)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = '#4a4031'
        if (lineRef.current) lineRef.current.style.transform = 'scaleX(0)'
      }}
    >
      {label}
      <span
        ref={lineRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '2px',
          width: '100%',
          background: 'linear-gradient(to right, #2f5d3a, #c0683f)',
          transform: 'scaleX(0)',
          transformOrigin: 'left center',
          transition: 'transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      />
    </a>
  )
}

/* ── CTA button: scrolls to donation section ───────────────────── */
function CTAButton() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    document.getElementById('pix')?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <a
      href="#pix"
      onClick={handleClick}
      className="hidden md:inline-flex items-center font-body"
      style={{
        fontSize: '12px',
        letterSpacing: '0.08em',
        fontWeight: 600,
        color: '#fff',
        textDecoration: 'none',
        padding: '10px 22px',
        borderRadius: '999px',
        background: '#2f5d3a',
        boxShadow: '0 6px 18px rgba(47,93,58,0.22)',
        transition: 'background 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.background = '#1e3d27'
        el.style.boxShadow = '0 10px 26px rgba(47,93,58,0.32)'
        el.style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.background = '#2f5d3a'
        el.style.boxShadow = '0 6px 18px rgba(47,93,58,0.22)'
        el.style.transform = 'translateY(0)'
      }}
    >
      QUERO SEMEAR
    </a>
  )
}

/* ── Hamburger that morphs into an X ────────────────────────────── */
function Hamburger({ open }: { open: boolean }) {
  const base: React.CSSProperties = {
    display: 'block',
    width: '22px',
    height: '2px',
    background: '#2f5d3a',
    borderRadius: '1px',
  }
  return (
    <>
      <span style={{ ...base, transition: 'transform 0.32s ease', transform: open ? 'translateY(7px) rotate(45deg)' : 'none' }} />
      <span style={{ ...base, transition: 'opacity 0.2s ease', opacity: open ? 0 : 1 }} />
      <span style={{ ...base, transition: 'transform 0.32s ease', transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
    </>
  )
}

/* ── Full-screen mobile menu ────────────────────────────────────── */
function MobileMenu({
  open,
  links,
  onClose,
}: {
  open: boolean
  links: typeof NAV_LINKS
  onClose: () => void
}) {
  const scrollTo = (href: string) => {
    onClose()
    const id = href.replace('#', '')
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 320)
  }

  return (
    <div
      className="fixed inset-0 z-40 flex flex-col justify-center md:hidden"
      style={{
        background: 'rgba(247,242,233,0.98)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        pointerEvents: open ? 'auto' : 'none',
        opacity: open ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}
      aria-hidden={!open}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(47,93,58,0.45), transparent)' }}
        aria-hidden="true"
      />

      <nav className="px-8 flex flex-col gap-6">
        {links.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={e => { e.preventDefault(); scrollTo(link.href) }}
            className="font-heading block"
            style={{
              textDecoration: 'none',
              color: '#2a241b',
              opacity: open ? 1 : 0,
              transform: open ? 'translateX(0)' : 'translateX(-24px)',
              transition: `opacity 0.45s ease ${i * 0.08 + 0.12}s, transform 0.45s ease ${i * 0.08 + 0.12}s`,
            }}
          >
            <span
              className="font-body block mb-1"
              style={{ fontSize: '11px', letterSpacing: '0.4em', color: '#7c7363', fontWeight: 600 }}
            >
              0{i + 1}
            </span>
            <span style={{ fontSize: 'clamp(2.4rem, 9vw, 3.2rem)', letterSpacing: '-0.01em', lineHeight: 1, fontWeight: 500 }}>
              {link.label}
            </span>
          </a>
        ))}
      </nav>

      <div
        className="absolute bottom-10 left-8 right-8"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.45s ease 0.42s, transform 0.45s ease 0.42s',
        }}
      >
        <a
          href="#pix"
          onClick={e => { e.preventDefault(); scrollTo('#pix') }}
          className="font-body block text-center"
          style={{
            fontSize: '13px',
            letterSpacing: '0.08em',
            fontWeight: 600,
            color: '#fff',
            textDecoration: 'none',
            padding: '17px',
            borderRadius: '999px',
            background: '#2f5d3a',
            boxShadow: '0 8px 22px rgba(47,93,58,0.28)',
          }}
        >
          QUERO SEMEAR
        </a>
      </div>
    </div>
  )
}
