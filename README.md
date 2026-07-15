# MVGN Digital Hub — Soporte Técnico y Compilaciones para Android

Centro de asistencia técnica especializado en entretenimiento digital para Android. Compilaciones verificadas, soporte continuo y análisis transparentes de herramientas digitales.

**Producción:** [mvgn-digital-support-center.pages.dev](https://mvgn-digital-support-center.pages.dev)

---

## Batches de Conversión PEM

Los artículos del laboratorio se convierten al **Estándar de Evaluación MVGN v1.0-rc** (11 protocolos PEM) en batches:

| Batch | Artículos | EXP | Sesión | Estado |
|-------|-----------|-----|--------|--------|
| 1 | Bitwarden | EXP-2026-00001 | ses-021 | ✅ Publicado |
| 2 | NewPipe, Vanced+ReVanced+Morphe | EXP-2026-00002, EXP-2026-00003 | ses-023 | ✅ Publicado |
| 3–5 | Próximos artículos | — | — | 🔲 Pendiente (2–7 para v1.0 Stable) |

## Propósito

MVGN Digital Hub existe para cerrar la brecha entre el software disponible y el software que funciona. No somos una tienda ni una revista — somos un **taller técnico** con frente editorial.

| Capa | Qué es | Para qué |
|------|--------|----------|
| **Laboratorio** | Blog técnico con análisis de herramientas | Generar confianza, demostrar conocimiento, atraer tráfico |
| **Compilaciones** | APKs preparados y probados (TV + Mobile) | Entregar software listo para instalar |
| **Soporte** | Asistencia continua 6 meses | Resolver problemas post-instalación |

El laboratorio editorial es el gancho. Las compilaciones y el soporte son el servicio.

## Stack

| | |
|---|---|
| Framework | **Astro v6** — Static Site Generation |
| UI interactiva | **React 19** + **Framer Motion** |
| Contenido | **MDX** + Content Collections |
| Estilos | CSS nativo con Design Tokens + Glass System |
| Iconos | Lucide Icons |
| Gestión | **MVGN v4.0** — Multi-Agent Governance Runtime |
| Despliegue | Cloudflare Pages (Git integration + Wrangler CLI) |

## Estructura

```
src/
├── components/          # .astro + .tsx (React)
│   ├── AmbientGradient.tsx     # Fondo animado con Framer Motion
│   ├── CurvedLoop/             # Banda curva animada (easter egg)
│   ├── ArticuloCard.astro      # Card de artículo técnico
│   ├── Callout.astro           # Callouts (info, tip, warning, editorial)
│   ├── FAQAccordion.astro      # Acordeón de preguntas
│   ├── Sidebar.astro           # Navegación docs
│   ├── ScreenshotFrame.astro   # Frame de screenshot
│   └── ...
├── content/
│   └── laboratorio/   # Artículos del taller técnico (MDX)
│       ├── bitwarden.mdx                   # EXP-2026-00001 — ✅ PEM
│       ├── newpipe.mdx                     # EXP-2026-00002 — ✅ PEM
│       └── vanced-revanced-morphe.mdx      # EXP-2026-00003 — ✅ PEM
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

## MVGN v4.0 Runtime

El proyecto está gobernado por **MVGN v4.0** (Lite, modo NORMAL):

| Componente | Archivo |
|------------|---------|
| Manifiesto | `runtime-state/mvgn-runtime.json` |
| Estado vivo | `.mvgn-context.json` |
| Entry point | `mvgnlabs-starter-kit/NYX.md` |
| Contract | `mvgnlabs-starter-kit/.mvgn/session-contract.md` |
| Kernel | `mvgnlabs-starter-kit/.mvgn/kernel-spec.md` |
| Lite Rules | `mvgnlabs-starter-kit/profiles/lite/.mvgn/lite-rules.md` |
| Lite Engine | `mvgnlabs-starter-kit/profiles/lite/.mvgn/lite-engine.md` |
| Lite Recovery | `mvgnlabs-starter-kit/profiles/lite/.mvgn/lite-recovery.md` |
| Event History | `events/2026-07-08.jsonl` |

### Especificaciones v4.0

| # | Documento | Propósito |
|---|-----------|-----------|
| 10 | `docs/10_agent_roles.md` | Roles de agentes (Executor, Reviewer, Architect, etc.) |
| 11 | `docs/11_review_pipeline.md` | Pipeline opcional de revisión multi-agente |
| 12 | `docs/12_execution_modes.md` | Modos: NORMAL, SUPERVISED, COLLABORATIVE |
| 13 | `docs/13_review_reports.md` | Formato estándar de reportes de revisión |
| 14 | `docs/14_agent_registry.md` | Registro de agentes con ID, modelo, rol, estado |
| 15 | `docs/15_review_metrics.md` | Métricas de revisión y calidad |
| 16 | `docs/16_conflict_resolution.md` | Protocolo de resolución de conflictos entre agentes |
| 17 | `docs/17_migration_v3.5_to_v4.0.md` | Guía de migración v3.5 → v4.0 |

## Comandos

| Comando | Acción |
|---|---|
| `npm install` | Instalar dependencias |
| `npm run dev` | Servidor local `localhost:4321` |
| `npm run build` | Build a `dist/` |
| `npm run preview` | Vista previa del build |

## Despliegue — Cloudflare Pages

### Requisitos

- Node.js >= 22.12.0
- Cuenta en [Cloudflare](https://dash.cloudflare.com/) con acceso a Pages
- Wrangler CLI (viene con el proyecto via `npx`)

### Opción 1: Git integration (automático)

El proyecto está conectado a Cloudflare Pages via GitHub. Al hacer push a `main`, Cloudflare Pages inicia un build automático:

```bash
git push origin main
```

Configuración de build en Cloudflare Dashboard:
- **Framework preset:** Astro
- **Build command:** `npm run build`
- **Build output directory:** `dist/`
- **Root directory:** `/`

### Opción 2: Wrangler CLI (manual)

```bash
# 1. Build local
npm run build

# 2. Deploy a Pages
npx wrangler pages deploy dist/ --project-name mvgn-digital-support-center --branch main

# 3. (Opcional) Deploy a preview
npx wrangler pages deploy dist/ --project-name mvgn-digital-support-center --branch mi-rama
```

### Proyecto

| Campo | Valor |
|-------|-------|
| **URL producción** | https://mvgn-digital-support-center.pages.dev |
| **Nombre proyecto** | `mvgn-digital-support-center` |
| **Repositorio** | GitHub (push a `main` → deploy automático) |
| **Dominio personalizado** | Pendiente de configurar |
| **Último deploy** | 2026-07-15 (ses-023) |

### Notas

- No se necesita `wrangler.toml`. Cloudflare Pages Git integration usa la configuración del Dashboard.
- El build incluye un paso de cifrado (`scripts/protect-support.cjs`) que protege ciertas rutas.
- Para ver los logs de build: Cloudflare Dashboard → Pages → `mvgn-digital-support-center` → Deployments.

---

© MVGN Labs — Contacto: [mvgnlabs@proton.me](mailto:mvgnlabs@proton.me) · WhatsApp: +52 332 262 1939
