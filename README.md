# LeIALT Site

Landing page institucional da LeIALT, desenvolvida com Next.js (App Router), Tailwind CSS v4, Framer Motion e visual 3D com React Three Fiber.

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Scripts

```bash
npm run dev    # ambiente de desenvolvimento
npm run lint   # validacao de lint
npm run build  # build de producao
npm run start  # sobe build de producao
```

## Configuracao de contato

Crie um arquivo `.env.local` na raiz com:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/seuperfil
NEXT_PUBLIC_CONTACT_EMAIL=contato@leialt.com.br
```

Notas:
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: somente numeros com DDI e DDD.
- Se o WhatsApp nao for informado, o CTA usa fallback para email.
- Se o Instagram nao for informado, os links de Instagram sao ocultados.
