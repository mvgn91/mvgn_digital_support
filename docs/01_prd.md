# 01 — PRD: MVGN DIGITAL HUB — Transformación Editorial

> **Proyecto:** MVGN DIGITAL HUB
> **Perfil:** Lite (modo FLOW)
> **Basado en:** Documento editorial del decisor (2026-07-08)

## Objetivo

Transformar MVGN Digital Hub de una landing informativa a una **publicación editorial viva**. 
No modificar identidad visual, no rediseñar componentes, no alterar arquitectura.
Pensar como un Editor en Jefe, no como un diseñador web.

## Filosofía del proyecto

MVGN Digital Hub debe sentirse como un laboratorio donde las herramientas se descubren, se utilizan durante meses y únicamente entonces se documentan. No perseguimos tendencias. Documentamos aquello que sobrevive a ellas.

## Requerimientos Funcionales

| RF | Descripción | Criterio de aceptación |
|---|---|---|
| **RF-01 — Tono editorial** | Reducir lenguaje comercial ~40%. Incrementar lenguaje editorial ~60%. | Ningún texto del sitio debe sonar a venta. Todo debe sonar a experiencia documentada. |
| **RF-02 — Metadatos editoriales** | Agregar indicadores de autoridad y experiencia en herramientas y fichas. | Cada ficha debe incluir: "En uso desde", "Probado en", "Última revisión", "Uso diario" donde aplique. |
| **RF-03 — Lab Notes** | Las notas deben incluir metadatos de laboratorio: fecha de revisión, estado, categoría, tiempo de uso, compatibilidad, última actualización. | Cada nota parece entrada de cuaderno de laboratorio, no una noticia. |
| **RF-04 — Ritmo visual** | Alternar formatos: cards, timeline, quotes, destacados, checklists, mini diagramas. | El scroll debe sentirse más dinámico. No bloques iguales consecutivos. |
| **RF-05 — Manifiesto** | La sección "Filosofía" debe sentirse como manifiesto del laboratorio, no página "Acerca de". | Reducir palabras. Aumentar contundencia. Menos explicación, más convicción. |
| **RF-06 — Señales de confianza** | Incorporar frases editoriales de confianza. | Ej: "Ninguna herramienta publicada llega al Hub sin haber sido utilizada previamente." |
| **RF-07 — Soporte como consecuencia** | El soporte técnico debe aparecer como consecuencia natural, no como producto que se vende. | No decir "Compra soporte". Decir "Si prefieres dedicar tu tiempo a usar las herramientas en lugar de configurarlas, podemos ayudarte." |
| **RF-08 — Narrativa de 4 pasos** | El visitante debe recorrer: 1. Este sitio sabe de tecnología → 2. Recomendaciones honestas → 3. Esta persona usa estas herramientas → 4. Puede ayudarme a configurarlas. | La venta es el cuarto pensamiento, nunca el primero. |

## Regla de oro

Antes de modificar cualquier texto: ¿Esto parece escrito por alguien que usa la herramienta todos los días o por alguien que intenta venderla?

Si parece una venta → reescribir.
Si parece una experiencia documentada → conservar.

## Objetivo final

Cuando un usuario abandone el sitio debe recordar:
"No encontré un vendedor de aplicaciones. Encontré a alguien que ya hizo el trabajo de investigar por mí."

---

# Fase 4 — Responsive Overhaul

> **Inicio:** 2026-07-13
> **Propósito:** Solucionar completamente la responsividad del sitio. Transicionar de desktop-first a mobile-first progresivo. Cumplir WCAG 2.2 en touch targets.

## Reglas

- ✅ Se mantienen: diseño visual existente en desktop — nada se rompe arriba de 1024px
- ✅ Se mantienen: glass effect, tipografía, paleta, animaciones existentes
- ❌ No se desactivan efectos en mobile — se adaptan
- ❌ No se introduce Tailwind ni framework CSS externo

## RFs de responsividad

| RF | Descripción | Criterio de aceptación |
|----|-------------|------------------------|
| **RF-R01 — Navegación global mobile** | Agregar hamburger menu en BaseLayout para navegación entre páginas (Inicio, FAQ, Contacto, Laboratorio). | El menú debe abrirse desde el topbar, mostrar brand + links, cerrarse al seleccionar o tocar fuera. Funciona en todas las páginas. |
| **RF-R02 — Pillnav mobile legible** | Arreglar labels y touch targets del pillnav bottom bar. | Labels mínimo 0.65rem (10.4px). Touch targets mínimo 44x44px. No solaparse con floating actions. Scroll-spy debe seguir funcionando. |
| **RF-R03 — Brand visible en mobile** | El nombre "MVGN Labs" debe ser visible en mobile sin requerir hover. | En touch devices (hover: none), el nombre se muestra permanentemente en el topbar o dentro del hamburger drawer. |
| **RF-R04 — Touch targets WCAG 2.2** | Todos los elementos interactivos en mobile deben cumplir 44x44px mínimo. | Floating buttons, pillnav links, hamburger button, theme toggle, sidebar links, CTA buttons. |
| **RF-R05 — Artículos responsive** | Títulos de artículo con clamp(). Tablas con overflow-x: auto. Body legible en todos los breakpoints. | Sin overflow horizontal en artículos. Título fluido en mobile. Tablas scrolleables. |
| **RF-R06 — Grids con breakpoints intermedios** | Todas las grids deben tener transiciones 3-col→2-col→1-col donde aplique. | Stats grid colapsa a 1-col en ≤480px. Lab grid tiene 2-col intermedio antes de 1-col. |
| **RF-R07 — Tablet optimization** | Breakpoints intermedios para tablets (768px-1024px). | No hay saltos directos desktop→mobile. Tablets ven layouts adaptados, no aplastados. |
| **RF-R08 — Sin regresión desktop** | Ningún cambio responsive afecta la apariencia en ≥1024px. | Build pasa sin errores. Desktop idéntico visualmente. |

---

# Fase 5 — Estándar Editorial MVGN (ATHENEA)

> **Inicio:** 2026-07-13
> **Fuente:** Directiva ATHENEA/ATHN1 — Activo Cognitivo Editorial
> **Documento normativo:** `docs/08_editorial_standard.md`
> **Propósito:** Implementar el Estándar de Evaluación MVGN v1.0 (RC) en la sección Laboratorio. Transicionar de "formato de artículo" a "metodología de evaluación".

## Cambio conceptual

> *"El artículo deja de ser el producto principal. El verdadero producto es el proceso. El artículo es únicamente la evidencia pública de que ese proceso se ejecutó correctamente."* — ATHENEA

## Reglas

- ✅ Se mantienen: layout editorial existente, glass effect, tipografía, paleta Cerulean
- ✅ Los PEM son estándar interno, no protagonistas del artículo
- ❌ No se rompe compatibilidad con artículos existentes (nuevos campos opcionales)
- ❌ No se introducen puntuaciones numéricas ni lenguaje comercial

## Protocolos (PEM)

| PEM | Descripción | Implementación |
|-----|-------------|----------------|
| PEM-01 | Expediente único (EXP-AAAA-NNNNN) | Frontmatter MDX |
| PEM-02 | Ficha MVGN — resumen técnico | Componente colapsable en [slug].astro |
| PEM-03 | Alcance — qué cubre y qué no | Sección renderizada desde frontmatter |
| PEM-04 | Metodología | Sección en MDX body |
| PEM-05 | Marco de Evaluación (12 criterios) | Referencia al estándar, no repetir |
| PEM-06 | Observaciones (OBS-001...) | Sección estructurada en MDX |
| PEM-07 | Evaluación — cuerpo editorial narrativo | MDX body principal |
| PEM-08 | Evidencias (EV-XXX) | Tabla estructurada en MDX |
| PEM-09 | Riesgos Conocidos | Sección en MDX |
| PEM-10 | Veredicto Técnico | Componente grid en [slug].astro |
| PEM-11 | Cierre Editorial | Bloque final renderizado |

## RFs del estándar editorial

| RF | Descripción | Criterio de aceptación |
|----|-------------|------------------------|
| **RF-E01 — Expediente** | Todo artículo debe tener un identificador EXP-AAAA-NNNNN único. | Frontmatter validado por schema Zod. |
| **RF-E02 — Ficha MVGN** | El artículo debe mostrar una ficha técnica colapsable con resumen de evaluación. | Componente <FichaMVGN> renderizado en [slug].astro. |
| **RF-E03 — Alcance** | El artículo debe declarar qué cubre y qué no cubre. | Sección visible al inicio del artículo. |
| **RF-E04 — Observaciones estructuradas** | Las observaciones deben numerarse OBS-001, OBS-002... | Lista numerada con formato estándar. |
| **RF-E05 — Veredicto operativo** | El artículo debe finalizar con veredicto técnico (no comercial). | Componente <VeredictoTecnico> al final del artículo. |
| **RF-E06 — Evidencias trazables** | Toda afirmación importante debe tener evidencia asociada. | Tabla de evidencias con referencia a OBS. |
| **RF-E07 — Cierre editorial** | El artículo debe indicar contexto, validación y fecha de revisión futura. | Bloque PEM-11 renderizado. |
| **RF-E08 — Schema Evolution** | El content.config.ts debe soportar los campos del modelo Evaluation. | Validación Zod con campos opcionales (retrocompatible). |

---

# Fase 2 — Overhaul de Diseño Visual

> **Inicio:** 2026-07-08
> **Basado en:** Feedback del decisor: "el sitio no tiene orden visual, parece un fork de su versión original"

## Objetivo

Reforma completa de orden visual. El sitio debe sentirse diseñado, no acoplado.

## Reglas

- ✅ Se mantienen: tipografía (Inter, JetBrains Mono), paleta de colores (rojo, verde, grises), glass effect, logo, favicon
- ✅ Se mantienen: todos los textos ya ajustados en Fase 1 (T-001 a T-008)
- ❌ No se toca el branding

## RFs de diseño

| RF | Descripción | Criterio |
|----|-------------|----------|
| **RF-D1 — Fondos** | Simplificar las capas de fondo del sitio. Reducir de 5+ capas a 2-3 máximo. | El fondo debe ser limpio, no ruidoso. Mantener la atmósfera sin saturar. |
| **RF-D2 — Espaciado** | Sistema de espaciado vertical predecible entre secciones. | Todas las secciones deben tener el mismo padding vertical. El ritmo debe ser predecible. |
| **RF-D3 — Diferenciación** | Cada sección debe sentirse visualmente distinta. | Alternar fondos, anchos máximos, o estilos para que no parezcan todas iguales. |
| **RF-D4 — UI Chrome** | Reducir elementos flotantes y superpuestos. | Evaluar qué UI flotante es realmente necesario. Menos competencia visual. |
| **RF-D5 — Hero** | Hero más limpio y ordenado. | La primera impresión debe ser ordenada, no abrumadora. |
| **RF-D6 — Responsive** | La versión móvil debe sentirse tan cuidada como la de escritorio. | No desactivar efectos. Adaptarlos. |
