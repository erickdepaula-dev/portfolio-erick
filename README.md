# Portfólio · Erick de Paula

Next.js 16 + Tailwind CSS 4 · bilíngue (EN/PT) · dark + verde-limão.

## Rodar

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de produção
```

## Onde trocar as coisas

Quase tudo fica em **`src/config/site.ts`**:

| O quê | Como |
|---|---|
| **Avatar / memoji** | Salve o PNG (fundo transparente) em `public/avatar.png` e mude `avatar: "/avatar.png"` |
| **Currículo PDF** | Salve em `public/curriculo-erick-de-paula.pdf` e mude `resume: "/curriculo-erick-de-paula.pdf"` |
| **Projeto do cliente** | Edite o último item de `projects` (troque `status: "soon"` e preencha `name`, `stack`, `live`, `repo`). Os textos PT/EN ficam em `src/i18n/dictionary.ts` → `work.projects.client` |
| **Contatos** | Bloco `contact` (WhatsApp só números, com 55 + DDD) |
| **Domínio (SEO)** | `url` |

Os textos do site (PT e EN) ficam em **`src/i18n/dictionary.ts`**.

## Surpresas

- **Ctrl/⌘ + K**: paleta de comandos (navegar, trocar idioma, copiar e-mail, links)
- **`** (crase): terminal com `whoami`, `stack`, `projects`, `contact`, `goto`, `lang`… e `sudo hire-erick` 😉
- Spotlight verde que segue o cursor, parallax nos ícones de stack, contadores animados

## Deploy

Suba o repositório no GitHub e importe na Vercel (zero configuração).
