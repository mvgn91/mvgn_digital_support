# MVGN Digital Hub — Laboratorio Editorial de Herramientas Digitales

Sitio web editorial de MVGN Labs: facilitación técnica, compilaciones verificadas y soporte para entretenimiento digital en dispositivos Android.

**Producción:** [mvgn-digital-support-center.pages.dev](https://mvgn-digital-support-center.pages.dev)

---

## Stack

| | |
|---|---|
| Framework | **Astro v6** — Static Site Generation |
| UI interactiva | **React 19** + **Framer Motion** |
| Contenido | **MDX** + Content Collections |
| Estilos | CSS nativo con Design Tokens + Glass System |
| Iconos | Lucide Icons |
| Gestión | **MVGN v3.5** — Event-Driven AI Governance Runtime |
| Despliegue | Vercel (Git integration) |

## Estructura

```
src/
├── components/          # .astro + .tsx (React)
│   ├── AmbientGradient.tsx     # Fondo animado con Framer Motion
│   ├── CurvedLoop/             # Banda curva animada (easter egg)
│   ├── ArticuloCard.astro      # Card de artículo editorial
│   ├── Callout.astro           # Callouts (info, tip, warning, editorial)
│   ├── FAQAccordion.astro      # Acordeón de preguntas
│   ├── Sidebar.astro           # Navegación docs
│   ├── ScreenshotFrame.astro   # Frame de screenshot
│   └── ...
├── content/
│   └── laboratorio/   # Artículos editoriales (MDX)
│       ├── bitwarden.mdx
│       ├── newpipe.mdx
│       └── vanced-revanced-morphe.mdx
├── layouts/
│   ├── BaseLayout.astro        # HTML base + topbar + theme toggle
│   └── DocsLayout.astro        # Layout docs con sidebar
├── pages/
│   ├── index.astro              # Landing page (hero, manifiesto, proceso, laboratorio, planes, filosofía, contacto)
│   ├── faq.astro                # Preguntas frecuentes
│   ├── contact.astro            # Contacto
│   ├── 404.astro                # Página no encontrada
│   └── laboratorio/
│       ├── index.astro          # Archivo del laboratorio
│       └── [slug].astro         # Artículo dinámico
└── styles/
    ├── tokens.css               # Design tokens (paleta Cerulean + SERVICE)
    ├── global.css               # Reset + base
    └── utilities.css            # Clases utilitarias
```

## MVGN 3.5 Runtime

El proyecto está gobernado por **MVGN v3.5** (Lite, modo FLOW):

| Componente | Archivo |
|------------|---------|
| Manifiesto | `runtime-state/mvgn-runtime.json` |
| Estado vivo | `.mvgn-context.json` |
| Entry point | `profiles/lite/NYX.md` |
| Contract | `core/session-contract.md` |
| Kernel | `core/kernel-spec.md` |
| Rules | `profiles/lite/.mvgn/lite-rules.md` |
| Engine | `profiles/lite/.mvgn/lite-engine.md` |
| Recovery | `profiles/lite/.mvgn/lite-recovery.md` |
| Event History | `events/2026-07-08.jsonl` (29 eventos) |

## Comandos

| Comando | Acción |
|---|---|
| `npm install` | Instalar dependencias |
| `npm run dev` | Servidor local `localhost:4321` |
| `npm run build` | Build a `dist/` |
| `npm run preview` | Vista previa del build |

---

© MVGN Labs — Contacto: [mvgnlabs@proton.me](mailto:mvgnlabs@proton.me) · WhatsApp: +52 332 262 1939
