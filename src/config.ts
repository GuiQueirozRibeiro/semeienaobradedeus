/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  CONFIGURAÇÃO DO SITE · SEMEIE NA OBRA DE DEUS                 ║
 * ║                                                                ║
 * ║  Este é o ÚNICO arquivo que você precisa editar para colocar   ║
 * ║  os dados reais (PIX, link do Asaas, meta, contatos).          ║
 * ║  Procure por  ⚠️ PREENCHER  e troque pelos valores reais.      ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

export const SITE = {
  /* ── Identidade ──────────────────────────────────────────── */
  projeto: 'Semeie na Obra de Deus',
  igreja: 'Igreja Evangélica Batista Ganhando as Nações',
  cidade: 'Brasília, DF', // ⚠️ PREENCHER com a cidade real

  /* ── Doação via PIX ──────────────────────────────────────── */
  pix: {
    // Chave PIX (CNPJ da igreja). É o que o botão "Copiar" copia.
    chave: '53855731000185',
    // Tipo só para exibição: 'CNPJ' | 'E-mail' | 'Telefone' | 'Aleatória'
    tipo: 'CNPJ',
    // Nome do recebedor que aparece para o doador (precisa transmitir confiança)
    nomeRecebedor: 'Igreja Ev. Batista Ganhando as Nações',
    // "PIX Copia e Cola" pronto → vira o QR Code.
    // Se ficar vazio, o site monta um automaticamente a partir da chave.
    payload: '00020126360014BR.GOV.BCB.PIX0114538557310001855204000053039865802BR5901N6001C62070503***63040884',
  },

  /* ── Asaas (reservado p/ quando reativar cartão/boleto) ──── */
  // Não usado por enquanto (a doação está só no PIX). Guardado para o futuro.
  asaas: {
    linkPagamento: 'https://www.asaas.com/c/56p558pcyl23a7x2',
  },

  /* ── Contato / redes ─────────────────────────────────────── */
  contato: {
    // WhatsApp no formato internacional só com dígitos: 55 + DDD + número
    whatsapp: '5561993709963', // ⚠️ PREENCHER
    instagram: 'https://www.instagram.com/ibgn_sad/', // ⚠️ PREENCHER
    email: 'semeienaobradedeus@ig.com.br', // ⚠️ PREENCHER
  },
} as const

/** Mensagem pré-preenchida do WhatsApp (encode para URL). */
export const WHATSAPP_URL = `https://wa.me/${SITE.contato.whatsapp}?text=${encodeURIComponent(
  'Paz do Senhor! Vim pelo site "Semeie na Obra de Deus" e gostaria de contribuir/saber mais sobre a obra.',
)}`
