import type { NextConfig } from 'next'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const projectRoot = dirname(fileURLToPath(import.meta.url))

const nextConfig: NextConfig = {
  // Site estático (sem backend): a doação é só PIX (chave + QR).
  output: 'export',
  // Fixa a raiz neste projeto (há outros lockfiles em diretórios-pai).
  turbopack: { root: projectRoot },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
