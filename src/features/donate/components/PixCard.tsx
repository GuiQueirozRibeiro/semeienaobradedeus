'use client'

import { useState, useCallback } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { SITE } from '../../../config'
import { copyText } from '../../../lib/clipboard'
import { buildPixPayload } from '../../../lib/pix'

export default function PixCard() {
  const [copied, setCopied] = useState(false)
  const [cnpjCopied, setCnpjCopied] = useState(false)

  // Usa o "copia e cola" pronto do config; se vazio, monta a partir da chave.
  const ready = SITE.pix.payload.trim()
  const payload = ready || buildPixPayload({
    chave: SITE.pix.chave,
    nome: SITE.pix.nomeRecebedor,
    cidade: SITE.cidade.split(',')[0],
  })

  const copy = useCallback(async () => {
    if (await copyText(payload)) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    }
  }, [payload])

  const copyCnpj = useCallback(async () => {
    if (await copyText(SITE.pix.chave)) {
      setCnpjCopied(true)
      setTimeout(() => setCnpjCopied(false), 2200)
    }
  }, [])

  return (
    <div
      id="pix"
      className="donate-reveal rounded-3xl p-8 md:p-10 mx-auto w-full"
      style={{ maxWidth: 460, scrollMarginTop: 100, background: '#fffdf8', boxShadow: '0 24px 60px rgba(0,0,0,0.28)' }}
    >
      {/* header */}
      <div className="flex items-center gap-3">
        <span className="font-heading" style={{ fontSize: '1.7rem', color: '#2a241b', fontWeight: 500 }}>
          Doe via PIX
        </span>
      </div>

      <p className="font-body mt-3 mb-6 text-center sm:text-left" style={{ fontSize: '14px', color: '#7c7363', lineHeight: 1.6 }}>
        Escaneie o QR Code no app do seu banco ou copie o código PIX (copia e cola) abaixo.
      </p>

      {/* QR Code */}
      <div className="flex justify-center">
        <div className="rounded-2xl p-4" style={{ background: '#fff', border: '1px solid #ddd2bd' }}>
          <QRCodeSVG
            value={payload}
            size={196}
            level="M"
            marginSize={1}
            fgColor="#1e3d27"
            bgColor="#ffffff"
            aria-label="QR Code para doação via PIX"
          />
        </div>
      </div>

      {/* Chave */}
      <div className="font-body mt-7" style={{ fontSize: '11px', letterSpacing: '0.16em', color: '#a8542f', fontWeight: 600 }}>
        PIX COPIA E COLA
      </div>
      <div
        className="mt-2 rounded-xl px-4 py-3.5"
        style={{ background: '#f7f2e9', border: '1px dashed #c9b89a' }}
      >
        <code
          className="block select-all"
          style={{
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: '12px',
            lineHeight: 1.6,
            color: '#2a241b',
            wordBreak: 'break-all',
          }}
        >
          {payload}
        </code>
      </div>

      <button
        onClick={copy}
        className="font-body mt-4 inline-flex items-center justify-center gap-2 w-full"
        style={{
          fontSize: '13px', letterSpacing: '0.05em', fontWeight: 700, cursor: 'pointer', color: '#fff',
          padding: '15px', borderRadius: '14px', border: 'none',
          background: copied ? '#4f7e58' : '#2f5d3a', transition: 'background 0.3s',
        }}
      >
        {copied ? '✓ CÓDIGO COPIADO!' : 'COPIAR CÓDIGO PIX'}
      </button>

      {/* Secundário: chave (CNPJ) para quem prefere pagar via "PIX › Chave" */}
      <div className="mt-5 pt-5" style={{ borderTop: '1px solid #ece3d2' }}>
        <div className="font-body" style={{ fontSize: '11px', letterSpacing: '0.16em', color: '#a8542f', fontWeight: 600 }}>
          OU PAGUE PELA CHAVE (CNPJ)
        </div>
        <div className="mt-2 flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: '#f7f2e9', border: '1px solid #ece3d2' }}>
          <span className="font-body" style={{ fontSize: '15px', color: '#2a241b', fontWeight: 600, flex: 1 }}>
            {formatCNPJ(SITE.pix.chave)}
          </span>
          <button
            type="button"
            onClick={copyCnpj}
            className="font-body"
            style={{ fontSize: '11px', fontWeight: 700, color: cnpjCopied ? '#4f7e58' : '#2f5d3a', background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', letterSpacing: '0.06em' }}
          >
            {cnpjCopied ? '✓ COPIADO' : 'COPIAR'}
          </button>
        </div>
      </div>

      <p className="font-body mt-5 mb-0 text-center" style={{ fontSize: '12px', color: '#7c7363', lineHeight: 1.55 }}>
        Recebedor: <strong style={{ color: '#2a241b' }}>{SITE.pix.nomeRecebedor}</strong>
      </p>
    </div>
  )
}

/** Formata CNPJ para exibição (00.000.000/0000-00). Outros formatos passam direto. */
function formatCNPJ(value: string): string {
  const d = value.replace(/\D/g, '')
  if (d.length !== 14) return value
  return d.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
}
