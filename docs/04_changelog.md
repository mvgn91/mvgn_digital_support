# 04 — Changelog: MVGN DIGITAL HUB

> **Proyecto:** MVGN DIGITAL HUB — Centro de Soporte Digital
> **Formato:** Cambios cronológicos, sesión por sesión

---

## 2026-07-10 — Sesión 019: Deploy a Cloudflare Pages + Documentación

### Despliegue
- URL de `astro.config.mjs` corregida: `mvgnlabs.vercel.app` → `mvgn-digital-support-center.pages.dev`
- Compilación y deploy exitoso via `npx wrangler pages deploy`
- Sitio en producción: [mvgn-digital-support-center.pages.dev](https://mvgn-digital-support-center.pages.dev)
- Build confirmado: 8 rutas, sin errores
- Git push a `main` para deploy automático futuro

### Documentación de deploy
- `README.md`: instrucciones completas para Cloudflare Pages
  - Requisitos (Node.js >= 22.12.0, cuenta Cloudflare, Wrangler)
  - Opción 1: Git integration (automático con push a main)
  - Opción 2: Wrangler CLI (manual)
  - Configuración de build en Cloudflare Dashboard
  - Tabla con datos del proyecto
- Referencias a Vercel eliminadas de README, docs/06_state_report.md y ROADMAP.md

### Archivos modificados
- `astro.config.mjs` — site URL corregida
- `README.md` — sección de deploy agregada
- `docs/04_changelog.md` — este archivo
- `docs/06_state_report.md` — actualizado
- `ROADMAP.md` — URL corregida
- `.mvgn-context.json` — actualizado a ses-019

---

## 2026-07-10 — Sesión 018: Reformas estéticas + Planes

### Metodología — Rediseño completo
- **Barra de proceso** reemplazada por `process-grid` con diseño editorial
- Números de paso: 0.7rem → 2.05rem, cambiados a `--font-mono` (JetBrains Mono)
- Wrapper de número: 64px → 80px con hover glow + scale
- Título de cada paso: 0.85rem → 1rem
- Nuevos verbos descriptivos debajo de cada título
- Flechas SVG conectoras entre pasos
- Responsive: grid 1 columna con flex-row

### Sección de Planes — Renovación completa
- Título: "Probado y funcionando" con section-tag `ID: MVGN-HUB-004`
- **Compilación ($400)** — builds TV + Mobile + guía PDF (sin soporte)
- **Cobertura ($600/6 meses)** — respaldo continuo con items `[En desarrollo]` y `[Próximamente]`
- Badge "Uso frecuente" reposicionado a la esquina (absolute)
- Disclaimer card ahora full-width (sin max-width limitante)
- Service info actualizado con "series, películas y canales de TV"

### Limpieza técnica
- Código CSS muerto eliminado (`.process-bar`, `.process-step`, etc.)
- Clases responsive huérfanas reemplazadas

### Archivos modificados
- `src/pages/index.astro` — cambios principales
- `.mvgn-context.json` — actualizado a ses-018
- `docs/06_state_report.md` — actualizado
- `docs/04_changelog.md` — este archivo

---

## 2026-07-10 — Sesión 017: Limpieza de legacy MVGN

### Legacy eliminado
- `.mvgn-v2.1-backup/` — backup completo de v2.1
- `prompts/` — 5 archivos deprecados (bugfix, component, master, readme, task-execution)
- `profiles/lite/prompts/` — lite-prompt.md deprecado
- `profiles/lite/.mvgn-context.json.legacy`

### Archivado en `_archive/docs/`
- `AUDIT_REPORT.md` — auditoría de v2.2 (valor histórico)
- `09_migration_v2.3_to_v3.0.md` — guía de migración (ya completada)

### MVGN 3.5 como fuente de verdad
- MVGN 3.5 declarado como única fuente de verdad
- Todo el legacy pre-3.5 eliminado o archivado

### Archivos modificados
- `.mvgn-context.json` — actualizado a ses-017
- `docs/06_state_report.md` — actualizado
- `docs/04_changelog.md` — este archivo

---

## 2026-07-09 — Sesión 016: Corrección de lectura de artículos

### Artículo [slug].astro — Causa raíz
- Detectado bug de jerarquía: reglas de `h2`, `h3`, párrafos, listas y bloques MDX estaban en CSS scoped de Astro.
- El contenido renderizado por `<Content />` no recibía ese scope, por eso los márgenes y tamaños definidos no se aplicaban realmente.
- La tipografía editorial de `.article-body` se duplicó/movió a `<style is:global>` con selectores acotados a `.article-body`.

### Jerarquía y ritmo
- Columna de lectura: 740px → 800px.
- Body: 1rem/1.65 → 18px/1.82 con `IBM Plex Sans`.
- Primer párrafo: lead de 20px/1.8, sin drop cap.
- `h2`: 36px, separador superior, margen real de 96px y padding superior de 32px.
- `h3`: 23.2px, margen de 56px salvo cuando sigue directo a un `h2`.
- Callouts, verdict grid, tablas, blockquotes, listas y screenshots ahora participan del ritmo vertical global.

### Verificación
- `npm run build` completado correctamente.
- Verificación browser local en `/laboratorio/bitwarden/`.
- Desktop: `.article-body` 800px, body 18px/32.76px, sin overflow horizontal.
- Mobile 390px: `.article-body` 350px, body 17px, `h2` 28.8px, `h3` 20.8px, sin overflow horizontal.

### Archivos modificados
- `src/pages/laboratorio/[slug].astro`
- `.mvgn-context.json`
- `docs/06_state_report.md`
- `docs/04_changelog.md`

## 2026-07-08 — Sesiones 008-015: Rediseño editorial + Overhaul artículos

### SERVICE Redesign — Paleta Cerulean
- Paleta migrada de rojo (#DC2626) a Cerulean Blue (#4BA3F2)
- `tokens.css`: primary, hover, subtle, glow, deep actualizados
- Fraunces + IBM Plex Sans como fonts display/docs
- HellBackground reemplazado por AmbientGradient (Framer Motion, gradientes suaves)
- Componentes huérfanos eliminados: HellBackground.tsx, CascadeMobileScreens.tsx, Phone3D.tsx, RotatingPhone.tsx

### Hero editorial
- Reemplazados phones mockups (CascadeMobileScreens) por composición arquitectónica de vidrio
- Layout centrado editorial, Fraunces display, más espacio negativo
- max-width: 720px para el hero content

### Laboratorio Index — Rediseño editorial
- Hero tipo masthead con Fraunces, metadata de archivo
- Featured article destacado con layout de revista (split text+visual)
- Archive list estilo tabla de contenidos con numeración
- Tags como categorías de archivo
- Cerulean bg-ambient, animaciones CSS keyframes
- ArticuloCard actualizado: gradiente Cerulean, Fraunces, featured variant

### Artículo [slug].astro — Overhaul completo
- Eliminado glass container global (overflow:clip, backdrop-filter)
- Header con glass styling propio (max-width:740px, border-radius, padding)
- Body fluye sin contenedor a 740px
- Nav, footer, related-section alineados a 740px
- ScreenshotFrame simplificado: sin notch, sin device frame, solo imagen + shadow
- Reducción de peso visual: font 1.15rem→1rem, line-height 1.8→1.65
- Ritmo vertical: h2=120px, h3=100px (antes 80px/80px) — contraste 4.3:1 vs párrafos
- Adyacencia: h3+p=20px (tight), p+p=28px, h2+p=40px
- Adjacent sibling selectors para jerarquía inteligente

### Bitwarden — Transformación editorial (framework 10 reglas)
- Emojis reemplazados por Lucide icons (CircleCheck, CircleX, Crosshair, Wallet)
- Veredicto estructurado: Pros/Contras/Para quién/Costo con HTML grid + Lucide
- 2 callouts agregados (self-host + 2FA)
- Iconos con color: verde (Pros), rojo (Contras)
- ---- (hr) eliminado entre intro y contenido

### Archivos modificados
- `src/pages/laboratorio/[slug].astro` — overhaul completo
- `src/pages/laboratorio/index.astro` — rediseño editorial
- `src/components/ArticuloCard.astro` — actualizado
- `src/components/ScreenshotFrame.astro` — simplificado
- `src/components/AmbientGradient.tsx` — nuevo (reemplaza HellBackground)
- `src/content/laboratorio/bitwarden.mdx` — transformación editorial
- `src/pages/index.astro` — hero editorial
- `src/styles/tokens.css` — paleta Cerulean
- `src/styles/global.css` — Fraunces en h1/h2
- `src/layouts/BaseLayout.astro` — fonts actualizados
- `docs/04_changelog.md`, `docs/06_state_report.md` — documentación MVGN

### Archivos eliminados
- `src/components/HellBackground.tsx`
- `src/components/CascadeMobileScreens.tsx`
- `src/components/Phone3D.tsx`
- `src/components/RotatingPhone.tsx`

## 2026-07-08 — Sesión 003: Overhaul de UI

### Contacto
- Rediseño completo de la sección de contacto
- 3 wireframe cards (Correo, Escríbenos, Linktree) con Lucide icons (`Mail`, `MessageCircle`, `ExternalLink`)
- Barra de acento rojo `::before` en hover
- Eliminado intento de figuras 3D con Three.js (ContactFigures.tsx)
- Sin número visible de WhatsApp, solo "chat directo"
- Linktree como placeholder "Próximamente"

### Manifiesto
- Cita rediseñada como pull-quote con barra de acento rojo (4px) y comilla decorativa en Georgia
- Stats (24, 18, 9, 17) convertidas a glass cards individuales en grid 4-columnas
- Glow animado de fondo (`manifestoGlowPulse`): gradiente radial rojo que respira lentamente

### Proceso
- Timeline vertical de 5 pasos reemplazada por barra horizontal (`process-bar`)
- 5 segmentos (Descubrir, Evaluar, Documentar, Recomendar, Apoyar)
- Descripción dinámica que cambia al hover/click con JS
- Soporte táctil para mobile

### Tipografía
- `section-tag`: 0.6rem → 0.7rem
- `hero-sub`: `var(--text-base)` → `var(--text-lg)`
- `lab-card-badge`: 0.55rem → 0.65rem
- `lab-card-editorial`: 0.65rem → 0.7rem
- `editorial-note-item`: 0.7rem → 0.75rem
- `plan-card-popular`: 0.65rem → 0.7rem
- `plan-card-sub`: `var(--text-xs)` → `var(--text-sm)`
- `contact-card-detail`: 0.8rem → 0.85rem
- `process-step-num`: 0.65rem → 0.7rem
- `process-step-title`: 0.85rem → 0.9rem
- Mobile overrides escalados proporcionalmente

### CurvedLoop
- Velocidad: 1.2 → 0.35 (~3.4× más lento)
- Opacidad base: 0.12 → 0.05 (casi invisible, easter egg)
- Transición hover: 0.8s → 1.2s

### Copy
- Reemplazo global de "acompañamiento" por "Asistencia" / "Respaldo"
- Afectó: section-tag, plan-card-sub (x2), plan-details-list, plan-details-text, principle-desc

### Limpieza
- Sección 04 (Servicios) eliminada por completo: HTML, CSS, nav link, JS reference, responsive, backdrop-filter
- Archivo `src/components/ContactFigures.tsx` eliminado
- Código CSS muerto limpiado: `.timeline-content`, `.timeline-title`, `.timeline-desc`, `.philosophy-card`
- `.services-block.animate-in`, `.services-card` references removidas

### Archivos modificados
- `src/pages/index.astro` — cambios principales de UI
- `.mvgn-context.json` — actualizado a ses-003

### Archivos eliminados
- `src/components/ContactFigures.tsx`
