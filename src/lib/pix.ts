/**
 * Gera o "PIX Copia e Cola" (BR Code / padrão EMV do Banco Central) para PIX
 * estático. Esse é o texto que vira o QR Code e que apps de banco reconhecem.
 * 100% em código, sem dependências e sem serviço externo.
 */

/** Monta um campo TLV: id + tamanho(2 dígitos) + valor. */
function tlv(id: string, value: string): string {
  const len = value.length.toString().padStart(2, '0')
  return `${id}${len}${value}`
}

/**
 * Normaliza texto para o BR Code: decompõe os acentos (NFD) e remove tudo
 * que não for ASCII imprimível, deixa em maiúsculas e trunca no limite.
 */
function sanitize(text: string, max: number): string {
  return text
    .normalize('NFD')
    .replace(/[^\x20-\x7E]/g, '')
    .toUpperCase()
    .slice(0, max)
    .trim()
}

/** CRC16-CCITT (polinômio 0x1021), exigido no fim do BR Code. */
function crc16(payload: string): string {
  let crc = 0xffff
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1
      crc &= 0xffff
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0')
}

interface PixParams {
  chave: string
  nome: string
  cidade: string
  valor?: number
  txid?: string
}

/** Retorna o payload completo do PIX Copia e Cola. */
export function buildPixPayload({ chave, nome, cidade, valor, txid = '***' }: PixParams): string {
  const merchantAccount = tlv('00', 'br.gov.bcb.pix') + tlv('01', chave)

  let payload =
    tlv('00', '01') +                         // Payload Format Indicator
    tlv('26', merchantAccount) +              // Merchant Account Information (PIX)
    tlv('52', '0000') +                       // Merchant Category Code
    tlv('53', '986') +                        // Moeda: BRL
    (valor ? tlv('54', valor.toFixed(2)) : '') + // Valor (opcional)
    tlv('58', 'BR') +                         // País
    tlv('59', sanitize(nome, 25)) +           // Nome do recebedor
    tlv('60', sanitize(cidade, 15)) +         // Cidade do recebedor
    tlv('62', tlv('05', txid))                // Additional Data (txid)

  payload += '6304' // ID + tamanho do CRC
  return payload + crc16(payload)
}
