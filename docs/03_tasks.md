# 03 — Tasks: MVGN DIGITAL HUB — Transformación Editorial

> **Proyecto:** MVGN DIGITAL HUB
> **Perfil:** Lite (modo FLOW)
> **PRD:** `docs/01_prd.md`
> **Inicio:** 2026-07-08

## Convención

- `[ ]` pendiente
- `[x]` completada
- `[!]` bloqueada

---

## Orden de implementación (por impacto)

```
Prioridad 1 — Tono (cambia la percepción del sitio)
Prioridad 2 — Contenido (metadatos, señales de confianza)
Prioridad 3 — Estructura (ritmo visual)
```

---

## Prioridad 1 — Tono editorial

### T-001 — Reescribir sección Planes/Precios
**RF:** RF-01, RF-07
**Archivo:** `src/pages/index.astro`
**Criterios:**
- ✅ Eliminar lenguaje de "venta" ("Contratar", precios como oferta)
- ✅ Pasar de "Elige el plan" a tono de consecuencia natural
- ✅ El soporte debe presentarse como acompañamiento, no como producto
- ✅ La venta es el cuarto pensamiento, nunca el primero
`[x] Completada — Sección Planes reescrita con tono editorial. Build verificado.`

### T-002 — Reescribir copy de Lab Cards
**RF:** RF-01
**Archivo:** `src/pages/index.astro`
**Criterios:**
- ✅ Eliminar sensación de catálogo ("Aplicaciones seleccionadas", "Configuraciones paso a paso")
- ✅ Cada card debe sonar a ficha de laboratorio
- ✅ No prometer beneficios — documentar experiencia
`[x] Completada — Lab Cards reescritas a tono editorial. Build verificado.`

### T-003 — Reescribir sección Servicios/Soporte
**RF:** RF-01, RF-07
**Archivo:** `src/pages/index.astro`
**Criterios:**
- ✅ "Consultar soporte" → tono de consecuencia natural
- ✅ Aplicar: "Si prefieres dedicar tu tiempo a usar las herramientas en lugar de configurarlas, podemos ayudarte."
- ✅ Mantener la idea de que el soporte nace del trabajo de investigación
`[x] Completada — Servicios reescrito. CTA "Hablar con el laboratorio". Header con frase editorial exacta. Build verificado.`

### T-004 — Ajustar copy de Contacto
**RF:** RF-01, RF-08
**Archivos:** `src/pages/index.astro`, `src/pages/contact.astro`, `src/components/ContactCard.astro`
**Criterios:**
- ✅ Eliminar "Sin compromisos, sin vueltas" (suena a lead gen)
- ✅ El contacto debe sentirse como consecuencia natural
- ✅ Mantener canales y disponibilidad
`[x] Completada — Contacto reescrito. "El laboratorio está abierto". Build verificado.`

---

## Prioridad 2 — Contenido editorial

### T-005 — Agregar metadatos editoriales a herramientas y fichas
**RF:** RF-02, RF-03
**Archivos:** `src/pages/index.astro` (Lab Cards, Lab Notes)
**Criterios:**
- ✅ Agregar "En uso desde [mes/año]" en herramientas
- ✅ Agregar "Probado en Android [versión]"
- ✅ Agregar "Última revisión: [mes/año]"
- ✅ Agregar "Uso diario" donde aplique
- ✅ Cada ficha responde: ¿Qué es? ¿Por qué está aquí? ¿Desde cuándo? ¿Sigue recomendada? ¿Para quién?
`[x] Completada — Metadatos editoriales agregados a las 3 Lab Cards. Incluye "Uso diario". Build verificado.`

### T-006 — Agregar señales de confianza editorial
**RF:** RF-06
**Archivo:** `src/pages/index.astro`
**Criterios:**
- ✅ Frase: "Ninguna herramienta publicada llega al Hub sin haber sido utilizada previamente."
- ✅ Frase: "Todas las recomendaciones parten de experiencias reales de uso."
- ✅ Frase: "Las fichas permanecen actualizadas mientras sigan siendo relevantes."
- ✅ Integradas de forma sutil, no como bloques de texto adicionales
`[x] Completada — 3 señales agregadas como nota editorial sutil entre Laboratorio y Filosofía. Build verificado.`

---

## Prioridad 3 — Estructura y ritmo

### T-007 — Reforzar sección Filosofía como manifiesto
**RF:** RF-05
**Archivo:** `src/pages/index.astro`
**Criterios:**
- ✅ Reducir palabras explicativas
- ✅ Aumentar contundencia y convicción
- ✅ Debe sentirse como manifiesto de laboratorio, no "Acerca de"
`[x] Completada — Manifiesto reescrito con tono declarativo. Descripciones reducidas hasta 64%. Build verificado.`

### T-008 — Mejorar ritmo visual entre secciones
**RF:** RF-04
**Archivo:** `src/pages/index.astro`
**Criterios:**
- ✅ Alternar formatos: cards, timeline, quotes, destacados
- ✅ Sin modificar identidad visual ni arquitectura
- ✅ El scroll se siente más dinámico
`[x] Completada — section-bg--tint añadido a Manifiesto, Servicios y Filosofía para ritmo alternado. Build verificado.`

---

## Resumen

| Tipo | Cantidad |
|------|----------|
| Tareas totales | 8 |
| Prioridad 1 — Tono | 4 (T-001 a T-004) |
| Prioridad 2 — Contenido | 2 (T-005, T-006) |
| Prioridad 3 — Estructura | 2 (T-007, T-008) |
| Dependencias | T-002 y T-003 pueden ejecutarse en paralelo con T-001 |

---

# Fase 2 — Overhaul de Diseño Visual

> **Basado en:** RF-D1 a RF-D6 del `01_prd.md`
> **Inicio:** 2026-07-08

## Orden de implementación

```
D-001 → D-002 → D-003 → D-004 → D-005 → D-006 → D-007
(foundation → backgrounds → spacing → sections → chrome → hero → responsive)
```

---

### D-002 — Simplificar fondos
**RF:** RF-D1
**Criterios:**
- ✅ Reducir capas de fondo de 5+ a 2-3 máximo
- ✅ Mantener atmósfera sin saturar
- ✅ Eliminar .bg-glow-right y .bg-glow-left (display:none)
`[x] Completada — Fondos simplificados: 2 capas (ambient + grid). Hero glow reducido. Código muerto limpiado. Build verificado.`

### D-003 — Sistema de espaciado vertical
**RF:** RF-D2
**Criterios:**
- ✅ Mismo padding vertical en todas las secciones
- ✅ Ritmo predecible entre secciones
- ✅ Consistente en desktop y mobile
`[x] Completada — Section padding estandarizado a var(--space-16) (64px). Hero sincronizado. Build verificado.`

### D-004 — Diferenciar secciones
**RF:** RF-D3
**Criterios:**
- ✅ Alternar fondos, anchos o estilos entre secciones
- ✅ Que no parezcan todas iguales
`[x] Completada — Secciones con anchos variables (800-1100px). Lab Cards con barras de acento. Cards de filosofía con fondos tintados individuales. Build verificado.`

### D-005 — UI Chrome
**RF:** RF-D4
**Criterios:**
- ✅ Reducir elementos flotantes
- ✅ Evaluar necesidad de cada superposición
`[x] Completada — Pillnav más sutil (fondo 40% opaco, sombra reducida). Floating actions simplificadas (sin glow). Back-to-top más pequeño (40px) con opacidad base 0.5. Build verificado.`

### D-006 — Hero más limpio
**RF:** RF-D5
**Criterios:**
- ✅ Hero ordenado, no abrumador
- ✅ Mantener impacto visual
`[x] Completada — hero-bg-glow eliminado, hero-visual-bg eliminado, badge simplificado (sin dot), 1 CTA en lugar de 2. Build verificado.`

### D-007 — Responsive
**RF:** RF-D6
**Criterios:**
- ✅ Mobile igual de cuidado que desktop
- ✅ Adaptar efectos, no desactivarlos
`[x] Completada — backdrop-filter adaptado (blur(8px) en lugar de none), pillnav labels visibles en mobile, hero padding mejorado, espaciado de secciones consistente. Build verificado.`

---

# Fase 3 — Rediseño SERVICE (Directiva v3.5)

> **Basado en:** `docs/10_design_directive_v3.md`
> **Perfil:** SERVICE
> **Sistema:** Scientific Glass System v3 — Evolución Editorial
> **Inicio:** 2026-07-09

## Orden de implementación

```
D-101 → D-102 → D-103 → D-201 → D-202 → D-301 → D-302 → D-303 → D-304
(foundation → atmosphere → components)
```

---

## Fase 1 — Foundation (Design Tokens)

### D-101 — Paleta cromática: Cerulean Blue
**RF:** Directiva v3.5 § Identidad cromática
**Archivo:** `src/styles/tokens.css`
**Criterios:**
- Reemplazar `--color-primary: #DC2626` → `#4BA3F2`
- Establecer variantes hover, subtle, glow en Cerulean
- Rojo permanece solo como `--color-danger` (estados críticos)
- Actualizar shadow-glow-primary a tono azul
- Actualizar light mode si aplica

### D-102 — Sistema tipográfico SERVICE
**RF:** Directiva v3.5 § Tipografía
**Archivo:** `src/styles/tokens.css`, `src/styles/global.css`, `src/pages/index.astro`
**Criterios:**
- Agregar Fraunces como `--font-display`
- Mantener Inter como `--font-sans`
- Agregar IBM Plex Sans como `--font-docs`
- Mantener JetBrains Mono como `--font-mono`
- Aplicar Fraunces a títulos display (h1, .hero-title, .section-title)
- Eliminar Playfair Display donde exista
- Jerarquías construidas con tamaño/espaciado, no peso excesivo

### D-103 — Glass UI evolucionado
**RF:** Directiva v3.5 § Materiales
**Archivo:** `src/styles/tokens.css`
**Criterios:**
- Reducir blur excesivo en glass tokens
- Disminuir opacidad de brillos
- Glass con tonos fríos (Cerulean tint, no rojo)
- Glass organiza, no protagoniza

---

## Fase 2 — Atmosphere

### D-201 — Fondos y atmósfera SERVICE
**RF:** Directiva v3.5 § Identidad cromática, Materiales
**Archivo:** `src/pages/index.astro` (CSS)
**Criterios:**
- bg-ambient: cambiar radial-gradients de rojo a Cerulean
- bg-grid: mantener pero más sutil
- Reducir opacidad de capas de fondo
- Atmósfera más luminosa, tonos fríos

### D-202 — Hero background y HellBackground
**RF:** Directiva v3.5 § Hero
**Archivo:** `src/pages/index.astro`, `src/components/HellBackground.tsx`
**Criterios:**
- HellBackground color a tono Cerulean frío (#4BA3F2 o similar)
- Hero más arquitectónico, menos comercial
- Mantener split layout pero con fondo más limpio

---

## Fase 3 — Componentes

### D-301 — Botones SERVICE
**RF:** Directiva v3.5 § Botones
**Archivo:** `src/pages/index.astro` (CSS)
**Criterios:**
- Botón primary con Cerulean blue en vez de rojo
- Más discretos, más elegantes
- Sin sombras excesivas
- No deben parecer anuncios

### D-302 — Cards (Lab, Contact, etc.)
**RF:** Directiva v3.5 § Cards
**Archivo:** `src/pages/index.astro` (CSS)
**Criterios:**
- Más limpias, más espacio
- Menos borde
- Menos ruido visual
- Acentos en Cerulean

### D-303 — Header y navegación
**RF:** Directiva v3.5 § Header
**Archivo:** `src/pages/index.astro` (CSS)
**Criterios:**
- Más ligero
- Siempre en vidrio
- Navegación limpia

### D-304 — Pillnav y floating actions
**RF:** Directiva v3.5 § Componentes
**Archivo:** `src/pages/index.astro` (CSS)
**Criterios:**
- Pillnav más sutil
- Colores de acento actualizados a Cerulean
- Menos saturación visual

---

# Sesión 003 — Overhaul de UI (Completada)

> **Fecha:** 2026-07-08
> **Sesión MVGN:** ses-003
> **Archivos afectados:** `src/pages/index.astro`, `docs/04_changelog.md`, `docs/06_state_report.md`, `.mvgn-context.json`

## Cambios realizados

| Área | Qué se hizo |
|------|------------|
| **Contacto** | Rediseño completo: wireframe cards con Lucide icons, barra de acento hover. Sin 3D. |
| **Manifiesto** | Pull-quote con acento rojo + glass stats + glow animado de fondo. |
| **Proceso** | Timeline vertical → barra horizontal interactiva con hover/click. |
| **Tipografía** | Jerarquía global corregida (section-tag, hero-sub, badges, etc.) |
| **Sección Servicios** | Eliminada por completo (redundante con Planes). |
| **Copy** | "Acompañamiento" → "Asistencia" / "Respaldo". |
| **CurvedLoop** | Más lento y transparente (easter egg). |

## Próximos pasos sugeridos

- Revisar sección Planes standalone (ahora que Servicios no existe)
- Deploy a producción
- Evaluar si se requieren más ajustes de UI

---

# Fase 5 — Estándar Editorial MVGN (ATHENEA)

> **Basado en:** RF-E01 a RF-E08 del `01_prd.md`
> **Documento normativo:** `docs/08_editorial_standard.md`
> **Inicio:** 2026-07-13

## Cambio conceptual

> *"El artículo deja de ser el producto principal. El verdadero producto es el proceso."* — ATHENEA

## Orden de implementación

```
R-101 → R-102 → R-103 → R-104 → R-105 → R-106 → R-107
(schema → layout → build → articles → verify → lessons → rollup)
```

---

### R-101 — Schema Evolution: modelo Evaluation en content.config.ts
**RF:** RF-E08
**Archivo:** `src/content.config.ts`
**Impacto:** ⭐⭐⭐ (cambia el schema de la colección laboratorio)
**Riesgo:** ⚠️ Medio — campos nuevos deben ser opcionales para no romper artículos existentes
**Regresión:** Baja — todos los campos nuevos son `.optional()`
**Afecta:** Colección laboratorio, type CollectionEntry<'laboratorio'>
**No afecta:** Colección apps, otras páginas, layout existente
**Criterios:**
- [ ] Agregar campos: `expediente`, `versionEstandar`, `autor`, `revision`, `contextoUso`
- [ ] Agregar campos de alcance: `alcanceCubre`, `alcanceNoCubre`
- [ ] Agregar campos de veredicto: `veredictoParaQuienSi`, `veredictoParaQuienNo`, `veredictoProblema`, `veredictoCoste`, `veredictoLimites`, `veredictoConclusion`
- [ ] Agregar `revisionFutura`
- [ ] Todos los campos nuevos son `.optional()`
- [ ] Build verificado

### R-102 — Componentes PEM en [slug].astro
**RF:** RF-E02, RF-E05, RF-E07
**Archivo:** `src/pages/laboratorio/[slug].astro`
**Impacto:** ⭐⭐⭐ (nuevas secciones en el layout de artículo)
**Riesgo:** ⚠️ Medio — cambios en layout pueden afectar espaciado y ritmo visual
**Regresión:** Media — verificar que artículos sin campos PEM no muestren secciones vacías
**Afecta:** Layout de artículo individual
**No afecta:** Laboratorio index, ArticuloCard, otras páginas
**Criterios:**
- [ ] Ficha MVGN (PEM-02) como bloque colapsable después del header
- [ ] Solo visible si `data.expediente` existe
- [ ] Veredicto Técnico (PEM-10) como grid antes del footer
- [ ] Solo visible si `data.veredictoConclusion` existe
- [ ] Cierre Editorial (PEM-11) como bloque después del veredicto
- [ ] Sin regresión visual en artículos existentes
- [ ] Build verificado

### R-103 — Verificar build
**RF:** RF-E08
**Impacto:** ⭐ (verificación, sin cambios de código)
**Riesgo:** ✅ Ninguno
**Regresión:** N/A — solo verificación
**Criterios:**
- [ ] Build pasa con cero errores
- [ ] Artículos existentes (bitwarden, newpipe, vanced) siguen funcionando
- [ ] No hay errores de tipo Zod
- [ ] Sin regresión visual en desktop y mobile

### R-104 — Migrar artículo existente como piloto
**RF:** RF-E01 a RF-E07
**Archivo:** `src/content/laboratorio/bitwarden.mdx` (piloto)
**Impacto:** ⭐⭐ (cambios en contenido MDX + frontmatter)
**Riesgo:** ⚠️ Bajo
**Criterios:**
- [x] Frontmatter: expediente, autor, revision, contextoUso, alcance, veredicto completo
- [x] OBS, EV y Riesgos movidos del body al frontmatter como HTML
- [x] Precios con MXN + disclaimer
- [x] Enlaces desde frontmatter
- [x] "Nota sobre esta evaluación" eliminada
- [x] Build verificado
`[x] Completada — Bitwarden migrado como EXP-2026-00001. Reestructuración editorial→ficha→veredicto→enlaces. Build: 8 páginas, 0 errores.`

### R-105 — Verificación cross-article + build final
**RF:** RF-E01 a RF-E08
**Impacto:** ⭐ (verificación)
**Riesgo:** ✅ Ninguno
**Criterios:**
- [x] Build pasa con cero errores (8 páginas)
- [x] Bitwarden muestra secciones PEM correctamente
- [x] NewPipe y Vanced sin secciones PEM vacías
- [x] Laboratorio index sin cambios
- [x] Sin regresión desktop y mobile
`[x] Completada — HTML compilado verificado: PEM presente en Bitwarden, ausente en NewPipe/Vanced.`

### R-106 — Lecciones aprendidas
**Impacto:** ⭐ (documentación)
**Archivo:** `docs/05_lessons_learned.md`
**Criterios:**
- [x] 8 lecciones documentadas (LL-010 a LL-017)
- [x] Decisiones de diseño capturadas
- [x] Problemas técnicos documentados (markdown vs HTML, YAML pipe vs folded)
`[x] Completada — Hallazgos categorizados: técnicos, editoriales, UI/UX. Decisiones derivadas documentadas.`

### R-107 — Rollup: changelog + state report + context
**Impacto:** ⭐ (documentación MVGN)
**Archivos:** `docs/04_changelog.md`, `docs/06_state_report.md`, `.mvgn-context.json`
**Criterios:**
- [x] Changelog actualizado con cambios ses-021
- [x] State report actualizado (progreso 68/30+)
- [x] `.mvgn-context.json` actualizado con trazabilidad completa
`[x] Completada — Sesión 021 cerrada. Lista para continuar en otro modelo.`

---

# Fase 4 — Responsive Overhaul

> **Basado en:** RF-R01 a RF-R08 del `01_prd.md`
> **Inicio:** 2026-07-13

## Orden de implementación

```
R-001 → R-002 → R-003 → R-004 → R-005 → R-006 → R-007 → R-008
(nav → pillnav → brand → touch → articles → grids → tablet → verify)
```

---

### R-001 — Hamburger menu global en BaseLayout
**RF:** RF-R01
**Archivos:** `src/layouts/BaseLayout.astro`, `src/layouts/DocsLayout.astro`
**Impacto:** ⭐⭐⭐ (nuevo componente de navegación, afecta todas las páginas)
**Riesgo:** ⚠️ Medio — coexistencia con DocsLayout sidebar existente
**Regresión:** Baja — solo visible en ≤767px, desktop no se toca
**Afecta:** BaseLayout, DocsLayout (coexistencia), todas las páginas envueltas
**No afecta:** index.astro sections, pillnav, footer, styles globales
**Criterios:**
- [x] Agregar botón hamburguesa en el topbar (visible ≤767px)
- [x] Drawer off-canvas izquierdo con overlay
- [x] Links: Inicio, FAQ, Contacto, Laboratorio
- [x] Brand "MVGN Labs" visible dentro del drawer
- [x] Cerrar al seleccionar link o tocar overlay
- [x] Animación smooth de apertura/cierre
- [x] `aria-label` dinámico (Abrir/Cerrar)
- [x] No duplicar funcionalidad con DocsLayout sidebar (`hideMobileNav` prop)
`[x] Completada — Hamburger integrado en BaseLayout con prop hideMobileNav. DocsLayout lo desactiva (usa su propio sidebar). Build verificado.`

### R-002 — Pillnav mobile: labels, touch targets, spacing
**RF:** RF-R02
**Archivos:** `src/pages/index.astro` (CSS)
**Impacto:** ⭐⭐ (cambios CSS localizados en index.astro)
**Riesgo:** ⚠️ Bajo — solo se modifican valores CSS existentes
**Regresión:** Media — verificar que scroll-spy y active state no se rompan
**Afecta:** Pillnav en mobile ≤767px
**No afecta:** Desktop pillnav, floating actions, otras páginas
**Criterios:**
- [x] Labels mínimo `0.65rem` (10.4px) con `letter-spacing: 0.03em`
- [x] Touch targets mínimo 44x44px (`min-height: 44px` en links)
- [x] Gap entre items mejorado
- [x] No solapamiento con floating actions (bottom: calc(52px + var(--space-8)))
- [x] Scroll-spy sigue funcionando correctamente
- [x] Build verificado
`[x] Completada — Pillnav móvil con min-height 44px, labels 0.65rem, bottom position elevado para evitar solapamiento con floating actions. Build verificado.`

### R-003 — Brand name visible en mobile
**RF:** RF-R03
**Archivos:** `src/layouts/BaseLayout.astro` (CSS), `src/layouts/DocsLayout.astro` (CSS)
**Impacto:** ⭐ (cambio CSS mínimo, dos layouts)
**Riesgo:** ✅ Muy bajo — solo media query hover detection
**Regresión:** Baja — desktop hover behavior no se modifica
**Afecta:** .topbar-name, .docs-topbar-name en touch devices
**No afecta:** Desktop, otros elementos del topbar
**Criterios:**
- [x] En dispositivos touch (hover: none), `.topbar-name` se muestra permanentemente
- [x] `max-width: 0` → `max-width: 80px` con `opacity: 1` cuando `@media (hover: none)`
- [x] Ídem para `.docs-topbar-name` en DocsLayout
- [x] Build verificado
`[x] Completada — @media (hover: none) agregado en BaseLayout y DocsLayout. Brand visible en touch devices sin hover. Build verificado.`

### R-004 — Touch targets WCAG 2.2 (44x44px)
**RF:** RF-R04
**Archivos:** `src/layouts/BaseLayout.astro` (CSS), `src/pages/index.astro` (CSS), `src/components/*.astro`
**Impacto:** ⭐⭐⭐ (auditoría + correcciones en múltiples componentes)
**Riesgo:** ⚠️ Medio — cambios en sizing pueden afectar layout existente
**Regresión:** Media — verificar que elementos no se desborden ni rompan alineaciones
**Afecta:** Floating buttons, theme toggle, menu btn, pillnav links, CTA buttons
**No afecta:** Texto, imágenes, grids, espaciado general
**Criterios:**
- [x] `.floating-btn` mínimo 44x44px en todos los breakpoints (corregido de 40px a 44px en ≤767px)
- [x] `.docs-theme-btn` mínimo 44x44px en mobile (corregido de 32px)
- [x] `.docs-menu-btn` mínimo 44x44px (corregido de 40px)
- [x] Pillnav links mínimo 44x44px touch target (`min-height: 44px`)
- [x] CTA buttons (`.btn`) tamaño adecuado
- [x] Elementos interactivos auditados y corregidos
- [x] Build verificado
`[x] Completada — Floating buttons, theme toggle, menu button, y pillnav links corregidos a 44px mínimo. Build verificado.`

### R-005 — Artículos responsive (clamp + tables)
**RF:** RF-R05
**Archivos:** `src/pages/laboratorio/[slug].astro` (CSS)
**Impacto:** ⭐⭐ (cambios CSS localizados en plantilla de artículo)
**Riesgo:** ✅ Bajo — solo se modifica CSS, no contenido MDX
**Regresión:** Baja — clamp mejora fluidez, no rompe tamaños existentes
**Afecta:** .article-title, .article-body tables, body text en mobile
**No afecta:** Contenido MDX, otras páginas, desktop layout
**Criterios:**
- [x] `.article-title` usa `clamp(1.6rem, 5.5vw, 2.45rem)` en vez de 2.45rem fijo
- [x] `.article-body table` ya tenía `overflow-x: auto` desde Sesión 016
- [x] Body text mantiene legibilidad en mobile
- [x] Sin overflow horizontal
- [x] Build verificado
`[x] Completada — Article title cambiado a clamp para fluidez en todos los viewports. Tablas ya tenían overflow-x: auto de sesión previa. Build verificado.`

### R-006 — Grids con breakpoints intermedios
**RF:** RF-R06
**Archivos:** `src/pages/index.astro` (CSS)
**Impacto:** ⭐⭐⭐ (cambios en 4 grids diferentes del index)
**Riesgo:** ⚠️ Medio — grids existentes pueden reflow si no se prueban todos los breakpoints
**Regresión:** Baja — solo se añaden breakpoints, no se eliminan existentes
**Afecta:** .manifesto-stats, .lab-grid, .plans-grid, .contact-cards
**No afecta:** Hero, pillnav, footer, otras páginas
**Criterios:**
- [x] `.manifesto-stats` 4-col → 2-col (1024px) → 1-col (479px)
- [x] `.lab-grid` 3-col → 2-col (1024px) → 1-col (479px)
- [x] `.plans-grid` 2-col → 1-col (1024px) — transición suave, sin cambios
- [x] `.contact-cards` 3-col → 1-col (1024px) con max-width 400px
- [x] Build verificado
`[x] Completada — Stats grid ahora colapsa a 1-col en ≤479px. Lab grid tiene 2-col intermedio en tablet. Build verificado.`

### R-007 — Tablet optimization (768px-1024px)
**RF:** RF-R07
**Archivos:** `src/pages/index.astro` (CSS), `src/layouts/BaseLayout.astro` (CSS)
**Impacto:** ⭐⭐⭐ (revisión de todos los breakpoints del sitio)
**Riesgo:** ⚠️ Medio — cambios en media queries pueden cascadear a otros breakpoints
**Regresión:** Media — probar en 768px, 810px, 1024px para asegurar cobertura
**Afecta:** Todos los componentes con media queries (hero, grids, topbar, sections)
**No afecta:** Artículos MDX, contenido, routing
**Criterios:**
- [x] Lab grid: 3-col → 2-col intermedio en tablet (ya no salta a 1-col directo)
- [x] Stats grid: 2-col en tablet, 1-col en mobile pequeño
- [x] Topbar mantiene diseño limpio en tablets (floating pill con border-radius)
- [x] Hero usa clamp() que se adapta fluidamente en tablets
- [x] Build verificado
`[x] Completada — Breakpoints intermedios agregados. Tablets ya no ven saltos directos desktop→mobile. Build verificado.`

### R-008 — Verificación cross-page + build
**RF:** RF-R08
**Impacto:** ⭐ (verificación, sin cambios de código)
**Riesgo:** ✅ Ninguno
**Regresión:** N/A — solo verificación
**Afecta:** Todas las páginas (verificación)
**No afecta:** Código fuente
**Criterios:**
- [x] Build pasa con cero errores (8 páginas, 0 errores, 0 advertencias)
- [x] Desktop visualmente idéntico en ≥1024px (sin regresión — todos los cambios bajo media queries)
- [x] Páginas verificadas: index, contact, faq, laboratorio index, laboratorio/[slug]
- [x] Light mode sin cambios (no se tocaron colores ni temas)
- [x] Changelog actualizado
- [x] State report actualizado
- [x] 05_lessons_learned.md actualizado
- [x] ADR-009 documentado
`[x] Completada — 8 páginas, 0 errores, 0 advertencias. Todos los artefactos MVGN actualizados. Build verify final: ✅`
