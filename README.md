# Semeie na Obra de Deus

Landing page de doações para a construção da **Igreja Evangélica Batista Ganhando as Nações**.

Tema visual **"Terra e Semente"** (claro, orgânico) — mesma stack do site da Exímia Tech:
Next.js 16 (export estático) · React 19 · TypeScript · Tailwind CSS v4 · GSAP.
A doação é via **PIX**: a página mostra o QR Code (gerado em código, padrão BR Code do
Banco Central) e a chave para copiar. Sem backend, sem chave secreta.

## Rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # gera o site estático em /out
```

## Editar os dados reais — tudo em [`src/config.ts`](src/config.ts)

Procure por `⚠️ PREENCHER`:

- `pix.chave` — sua chave PIX (CNPJ, e-mail, telefone ou aleatória) + `tipo` + `nomeRecebedor`
- `cidade` — cidade do recebedor (entra no QR Code do PIX)
- `campanha.meta` / `arrecadado` / `semeadores` — números da barra de progresso
- `contato.whatsapp` / `instagram` / `email`

> O QR Code é montado a partir de `pix.chave` + `nomeRecebedor` + `cidade`. Assim que a
> chave real for preenchida, o QR passa a ser válido e escaneável por qualquer banco.

## Imagens

As pranchas do projeto ficam em `public/` (`projeto-obra.jpeg`, `projeto-obra-2.jpeg`) e
aparecem na Visão e na seção "A Obra" (clicáveis para ampliar). Troque por novas fotos
colocando os arquivos em `public/` com os mesmos nomes.

## Estrutura

```
app/                 layout + página
src/config.ts        ← dados editáveis (PIX, meta, contatos)
src/index.css        tokens de design (tema Terra e Semente) + fontes
src/lib/             pix.ts (BR Code) · clipboard.ts
src/features/        uma pasta por seção
  nav/  hero/  vision/  progress/  donate/  footer/
assets/fonts/        Fraunces (títulos) + Archivo (corpo), auto-hospedadas
public/              favicon + imagens do projeto
```

## Deploy

Saída estática (`output: 'export'`) — sobe em qualquer host estático
(Vercel, Netlify, Firebase Hosting, GitHub Pages). A pasta gerada é `/out`.
