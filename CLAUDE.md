# CLAUDE.md

Orientações para o Claude Code neste repositório.

## O que é

Landing page de doações para a construção da **Igreja Evangélica Batista Ganhando as Nações** — projeto "Semeie na Obra de Deus". Site estático de uma página, focado em conversão para doação (PIX + Asaas).

## Comandos

```bash
npm run dev      # servidor de desenvolvimento (http://localhost:3000)
npm run build    # type-check + build estático → /out
npm run lint     # ESLint
```

Sem framework de testes. Sempre rodar `npm run build` após mudanças.

## Stack

React 19 + TypeScript (strict) + **Next.js 16 App Router** com `output: 'export'` (site estático, sem backend).
Estilo: **Tailwind CSS v4** via `@tailwindcss/postcss` — tokens de design no bloco `@theme` de `src/index.css`.
Animações: **GSAP + ScrollTrigger**. Todo componente com GSAP precisa de `'use client'`.

## Pagamentos (PIX estático)

- Doação só via PIX. `src/lib/pix.ts` monta o "PIX Copia e Cola" (BR Code / EMV + CRC16) a partir de `SITE.pix.chave` + `nomeRecebedor` + `cidade`.
- `src/features/donate/components/PixCard.tsx` renderiza o QR (`qrcode.react`) + chave + botão copiar.
- Sem backend, sem chave secreta. Cartão/boleto/Asaas ficaram de fora por enquanto (campo `SITE.asaas` guardado para o futuro).

## Arquitetura (feature-based)

- `app/layout.tsx` — Navbar + children. `app/page.tsx` — ordem das seções.
- `src/config.ts` — **ÚNICO arquivo de dados editáveis** (PIX, Asaas, meta, contatos). Tudo marcado com `⚠️ PREENCHER`.
- `src/index.css` — tokens "Terra & Semente" + @font-face (Fraunces títulos, Archivo corpo).
- `src/features/<nome>/` — `components/`, `hooks/` (se preciso), `data/` (se preciso), `index.ts` (barril).

**Regra:** `app/` importa só do `index.ts` de cada feature, nunca de caminhos internos.

Seções (ordem): `nav` · `hero` (#topo) · `vision` (#visao) · `progress` (#meta) · `donate` (#doar) · `footer`.

## Tema "Terra & Semente"

Claro/orgânico. Fundo creme `#f7f2e9`, verde-folha `#2f5d3a` (primário), terracota `#c0683f` (secundário), dourado `#c9a24b` (destaque), texto espresso `#2a241b`. A seção `donate` é um painel verde-profundo invertido (texto creme/dourado) — clímax de conversão.

## Padrões GSAP

- `gsap.context(() => {...}, ref)` + `return () => ctx.revert()` para cleanup.
- ScrollTrigger com `once: true` para reveals de entrada; `immediateRender: false` em `gsap.from` (evita flash de opacity 0).
- Use `gsap.matchMedia()` para separar desktop/mobile.
- Count-up de números: animar um proxy `{ v: 0 }` e escrever `el.textContent` no `onUpdate`.

## Imagens

Pranchas do projeto em `public/` (`projeto-obra.jpeg`, `projeto-obra-2.jpeg`), usadas na Visão e na Obra (clicáveis para ampliar). Demais elementos são arte vetorial SVG inline. Novas fotos: colocar em `public/`.
