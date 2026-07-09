# MVGN Labs — Centro de Soporte Digital

Sitio web estático de MVGN Labs: facilitación técnica y soporte para experiencias de entretenimiento digital en dispositivos Android.

**Producción:** [mvgnlabs.vercel.app](https://mvgnlabs.vercel.app)

---

## Stack

| | |
|---|---|
| Framework | **Astro v6** — Static Site Generation |
| UI interactiva | **React 19** + **Framer Motion** |
| Animaciones 3D | Three.js / React Three Fiber |
| Contenido | **MDX** + Content Collections |
| Estilos | CSS nativo con Design Tokens |
| Protección | StatiCrypt (cifrado AES en build) |
| Despliegue | Vercel (Git integration) |

## Estructura

```
src/
├── components/        # .astro + .tsx (React)
│   ├── HellBackground.tsx      # Shader WebGL animado
│   ├── CascadeMobileScreens.tsx # Teléfonos 3D en cascada
│   ├── RotatingPhone.tsx       # Teléfono giratorio 3D
│   ├── Sidebar.astro           # Navegación docs
│   └── ...
├── content/
│   └── apps/          # Guías de soporte (MDX)
│       ├── todo-en-uno.mdx
│       └── biblioteca-personal.mdx
├── layouts/
│   ├── BaseLayout.astro        # HTML base + meta
│   └── DocsLayout.astro        # Layout docs con sidebar
├── pages/
│   ├── index.astro              # Landing page
│   ├── faq.astro                # Preguntas frecuentes
│   ├── contact.astro            # Contacto
│   └── support/[slug].astro     # Guías dinámicas
└── styles/
    ├── tokens.css               # Design tokens
    ├── global.css               # Reset + base
    └── utilities.css            # Clases utilitarias
```

## Rutas

| Ruta | Acceso |
|---|---|
| `/` | Público |
| `/faq` | Público |
| `/contact` | Público |
| `/support/todo-en-uno` | Protegido |
| `/support/biblioteca-personal` | Protegido |

## Comandos

| Comando | Acción |
|---|---|
| `npm install` | Instalar dependencias |
| `npm run dev` | Servidor local `localhost:4321` |
| `npm run build` | Build a `dist/` |
| `npm run preview` | Vista previa del build |

El build corre `scripts/protect-support.cjs` automáticamente para cifrar las guías de soporte con la contraseña definida en `.env`.

## Variables de entorno

```
STATICRYPT_PASSWORD=tu-contraseña-aqui
```

## Roadmap

Ver [`ROADMAP.md`](./ROADMAP.md) para estado actual, mejoras planeadas y visión a largo plazo.

---

© MVGN Labs — Contacto: [mvgnlabs@proton.me](mailto:mvgnlabs@proton.me) · WhatsApp: +52 332 262 1939
