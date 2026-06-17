import { SITE, WHATSAPP_URL } from '../../../config'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative" style={{ background: '#efe6d5', borderTop: '1px solid #ddd2bd' }}>
      <div className="grain-overlay absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">

          {/* Brand */}
          <div className="max-w-sm">
            <h3 className="font-heading m-0" style={{ fontSize: '1.7rem', color: '#2a241b', fontWeight: 500 }}>
              Semeie na <span className="italic" style={{ color: '#2f5d3a' }}>Obra de Deus</span>
            </h3>
            <p className="font-body mt-3 m-0" style={{ fontSize: '14px', color: '#4a4031', lineHeight: 1.65 }}>
              {SITE.igreja}. Uma casa sendo erguida com fé, oração e a semente de cada coração generoso.
            </p>
          </div>

          {/* Contact */}
          <div>
            <p className="font-body m-0 mb-4" style={{ fontSize: '11px', letterSpacing: '0.22em', color: '#a8542f', fontWeight: 700 }}>
              FALE CONOSCO
            </p>
            <ul className="font-body m-0 p-0 flex flex-col gap-3" style={{ listStyle: 'none', fontSize: '15px' }}>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={linkStyle}>WhatsApp</a>
              </li>
              <li>
                <a href={SITE.contato.instagram} target="_blank" rel="noopener noreferrer" style={linkStyle}>Instagram</a>
              </li>
              <li>
                <a href={`mailto:${SITE.contato.email}`} style={linkStyle}>{SITE.contato.email}</a>
              </li>
              <li style={{ color: '#7c7363' }}>{SITE.cidade}</li>
            </ul>
          </div>
        </div>

        <div
          className="mt-14 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          style={{ borderTop: '1px solid #ddd2bd' }}
        >
          <span className="font-body" style={{ fontSize: '12px', color: '#7c7363' }}>
            © {year} {SITE.igreja}
          </span>
          <span className="font-body" style={{ fontSize: '12px', color: '#7c7363', letterSpacing: '0.06em' }}>
            FÉ · COMUNIDADE · NAÇÕES
          </span>
        </div>
      </div>
    </footer>
  )
}

const linkStyle: React.CSSProperties = {
  color: '#2a241b',
  textDecoration: 'none',
  borderBottom: '1px solid transparent',
  transition: 'color 0.2s, border-color 0.2s',
}
