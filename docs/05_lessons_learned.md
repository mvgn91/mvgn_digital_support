# 05 — Lessons Learned

> MVGN v3.5 — Lecciones documentadas durante el desarrollo
> Perfil: Lite (modo FLOW)

---

## Sesión 020 — Auditoría de Responsividad

**Fecha:** 2026-07-13
**Contexto:** Auditoría completa del estado responsive del sitio antes del Responsive Overhaul (Fase 4).

### Hallazgos

| # | Hallazgo | Categoría | Implicancia |
|---|----------|-----------|-------------|
| LL-001 | El sitio es **desktop-first** con 30+ media queries `max-width`. Mobile es un "override", no la base. | Arquitectura | Para Fase 4 no vamos a migrar a mobile-first (sería rewrite). Pero los nuevos breakpoints deben considerar `min-width` donde sea práctico. |
| LL-002 | Todos los grids usan `repeat(N, 1fr)` sin `auto-fit`/`auto-fill`. | Patrón | La ausencia de auto-responsive grids obliga a declarar breakpoints manuales para cada grid. Para Fase 4 hay que agregar breakpoints intermedios. |
| LL-003 | El pillnav en mobile tiene labels de **0.6rem (9.6px)** — por debajo del mínimo legible de 10px. | Accesibilidad | Cualquier texto ≤10px es ilegal en WCAG (criterio 1.4.4). Hay que subir a 0.65rem mínimo. |
| LL-004 | Los touch targets de elementos interactivos bajan a **40px** en mobile. WCAG 2.2 exige 44x44px. | Accesibilidad | Riesgo de no cumplimiento. Afecta floating buttons, theme toggle, pillnav. |
| LL-005 | Brand name invisible en touch devices (solo hover). | UX | Patrón común de "revelar en hover" que no funciona en mobile. Usar `@media (hover: none)` como solución estándar. |
| LL-006 | No existe navegación entre páginas en mobile excepto el footer. | Arquitectura | Gap de UX significativo. Se resuelve agregando hamburger menu al BaseLayout. |
| LL-007 | Los breakpoints tienen saltos directos desktop→mobile sin estados intermedios para tablet. | Diseño | Stats grid 4-col→2-col (nunca 1-col). Lab grid 3-col→1-col (salta 2-col). Agregar breakpoints intermedios. |
| LL-008 | Artículos sin `clamp()` en títulos ni `overflow-x: auto` en tablas. | Contenido | Las tablas anchas en MDX pueden romper el layout mobile. Solución estándar: `display: block; overflow-x: auto`. |
| LL-009 | El build actual pasa con **0 errores, 0 warnings** (excluyendo aviso preexistente de colección `apps` vacía). | Línea base | La línea base está limpia. Cualquier cambio en Fase 4 debe mantener este estado. |

### Patrón descubierto: Pillnav bottom bar

El pillnav en mobile (bottom bar con scroll-spy) demostró ser un patrón efectivo para landing pages con múltiples secciones. Sin embargo:

- **Funciona bien** cuando los labels son cortos (1 palabra) y hay ≤5 items
- **Falla** con labels >2 palabras o >6 items (el espacio se comprime)
- **Requerimiento mínimo**: 44px de touch target, 0.65rem de label, gap suficiente para no solaparse

### Decisión derivada

**ADR-009**: Mantener pillnav + agregar hamburger. No reemplazar. Documentado en `02_architecture.md`.

### Próximos pasos

- Aplicar LL-003 a LL-008 en las tareas R-001 a R-008 de Fase 4
- Verificar LL-009 (build clean) después de cada tarea
- Re-evaluar LL-001 (mobile-first) para futuras fases post-Fase 4

---

## Sesión 021 — Implementación del Estándar Editorial MVGN (ATHENEA)

**Fecha:** 2026-07-13
**Contexto:** Implementación del Estándar de Evaluación MVGN v1.0 (RC) desde directiva ATHENEA/ATHN1. Migración del artículo Bitwarden como piloto PEM.

### Hallazgos

| # | Hallazgo | Categoría | Implicancia |
|---|----------|-----------|-------------|
| LL-010 | **El estándar PEM debe ser protocolo interno, no estructura visible.** La primera implementación puso OBS/EV/Riesgos como secciones visibles en el cuerpo del artículo, lo que lo hacía sentir como un checklist. La solución fue mover todo el contenido de evaluación a una ficha colapsable después del editorial. | Presentación editorial | El Principio de Presentación Editorial del estándar debe priorizarse sobre la completitud estructural. |
| LL-011 | **Markdown en frontmatter no se renderiza con interpolación de Astro.** Las strings de frontmatter con sintaxis markdown (`**bold**`, tablas `|`) se mostraban literales. Hubo que convertirlas a HTML y usar `set:html`. | Técnico | El contenido editorial en frontmatter debe entregarse como HTML si se renderiza con `set:html`, o como datos estructurados si se itera en el template. |
| LL-012 | **YAML pipe (`|`) vs folded (`>-`) importa.** El bloque literal con `|` preserva saltos de línea exactos; `>-` los pliega. Para contenido HTML es más seguro usar `>-` y dejar que los tags HTML manejen la estructura. | Técnico | Registrar esta distinción para futuros artículos que usen frontmatter con HTML. |
| LL-013 | **El Cierre Editorial (PEM-11) fue ruido para el lector.** Metadatos como "Nota sobre esta evaluación" hablan del proceso interno, no aportan valor al lector. Se eliminó. | Editorial | PEM-11 debe existir como metadata interna (frontmatter), no como sección visible en el artículo. |
| LL-014 | **La ficha técnica funcionó mejor como `<details>` colapsable.** Permite que el lector acceda a la información de evaluación si le interesa, sin interrumpir la lectura principal. | UI/UX | El patrón `<details>`/`<summary>` es el mecanismo correcto para presentar contenido PEM en artículos. |
| LL-015 | **Artículos sin PEM no deben mostrar secciones vacías.** La implementación con `{data.expediente && (...)}` y `{data.veredictoConclusion && (...)}` evitó que NewPipe y Vanced mostraran bloques PEM vacíos. | Técnico | Validación condicional obligatoria para cualquier sección PEM en el layout. |
| LL-016 | **Precios en USD requieren conversión a MXN para audiencia LATAM.** El sitio está en español para México/LATAM. Tipo de cambio estimado 18 MXN/USD con disclaimer de fecha. | Editorial | Incluir siempre aproximación en MXN con nota de tipo de cambio estimado. |
| LL-017 | **Los enlaces múltiples necesitan sección dedicada.** Cuando hay más de un enlace relevante (sitio oficial, precios, GitHub, forks), una sección de "Enlaces" al final del artículo es mejor que un callout dentro del cuerpo. | Editorial | Sección `enlaces` en frontmatter renderizada por layout. |

### Decisiones derivadas

1. **Estructura final del artículo piloto (Bitwarden):**
   - Header → Cuerpo editorial (narrativa) → Ficha MVGN colapsable (datos, OBS, EV, riesgos) → Veredicto Técnico → Enlaces → Firma
2. **Campos frontmatter para contenido PEM:** `observacionesTexto`, `evidenciasTexto`, `riesgosTexto` como strings HTML; `enlaces` como array de `{label, url}`.
3. **No más Cierre Editorial visible.** PEM-11 queda como metadato interno.

### Próximos pasos

- Validar el estándar con 4-9 artículos adicionales para alcanzar v1.0 Estable
- Reemplazar placeholders de capturas con imágenes reales
- Evaluar si el schema necesita refinarse antes de escalar

---

## Sesión 022 — Pulido Editorial + Finalización MVGN

**Fecha:** 2026-07-13
**Contexto:** Corrección del campo `revision` en bitwarden.mdx y alineación de la firma de artículo con docs/07_filosofia.md donde autor = reviewer. Finalización MVGN con actualización de documentación, commit y push.

### Hallazgos

| # | Hallazgo | Categoría | Implicancia |
|---|----------|-----------|-------------|
| LL-018 | **El campo `revision` es redundante cuando autor = reviewer.** La filosofía MVGN establece que el autor del artículo es la única autoridad editorial. Tener `revision` además de `autor` implica una jerarquía editorial que no existe. El campo debe omitirse cuando autoría es de A. Ibañez. | Editorial | docs/07_filosofia.md define que no hay editores externos. El campo `revision` en frontmatter contradice este principio. Eliminarlo alinea el estándar PEM con la filosofía. |
| LL-019 | **La lógica de firma debe tener fallback para `revision` ausente.** El template de [slug].astro asumía que `revision` siempre existiría. Al eliminarlo, el rol mostraba "Autor · Revisado por undefined". El fallback correcto es "Fundador · MVGN Labs" cuando no hay revisor. | Técnico | Toda lógica condicional en templates debe manejar la ausencia del campo. |

### Decisiones derivadas

1. **Eliminar `revision` del esquema de contenido.** El campo queda obsoleto para artículos de A. Ibañez. Puede reaparecer solo si hay contribuciones externas verificadas.
2. **Firma editorial consistente:** cuando no hay `revision`, el pie de artículo muestra "A. Ibañez · Fundador · MVGN Labs".
