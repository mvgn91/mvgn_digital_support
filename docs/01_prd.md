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
