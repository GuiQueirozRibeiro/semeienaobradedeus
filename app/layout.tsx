import type { Metadata } from 'next'
import '../src/index.css' // global styles + design tokens
import Navbar from '../src/features/nav'

export const metadata: Metadata = {
  title: 'Semeie na Obra de Deus · Igreja Ev. Batista Ganhando as Nações',
  description:
    'Participe da construção da casa de Deus. Cada semente lançada na obra da Igreja Evangélica Batista Ganhando as Nações gera uma colheita eterna. Doe pelo PIX ou cartão.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Semeie na Obra de Deus',
    description:
      'Ajude a construir a casa de Deus. Cada semente importa. Doe pelo PIX ou cartão.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
