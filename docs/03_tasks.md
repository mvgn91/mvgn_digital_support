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
