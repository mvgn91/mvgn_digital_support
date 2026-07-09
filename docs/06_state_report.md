# 06 — State Report: MVGN DIGITAL HUB

> Proyecto raíz · Sitio web de MVGN Labs — Centro de Soporte Digital
> Framework: MVGN v3.0 (Lite, modo FLOW)
> Última actualización: 2026-07-08

## Cabecera

| Campo | Valor |
|-------|-------|
| **Estado** | IN_PROGRESS |
| **Tarea activa** | editorial-framework-application |
| **Progreso** | 45/30+ |
| **Última acción** | Sesiones 008-015: SERVICE redesign (Cerulean), Hero editorial, Laboratorio index editorial, Artículo overhaul completo (sin glass container, 740px, font 1rem), Bitwarden transformación editorial (framework 10 reglas, Lucide icons, veredicto estructurado, callouts, ritmo vertical 120px/100px). Build verificado. |
| **Siguiente acción** | Aplicar framework editorial a NewPipe+Vanced+Morphe y resto de artículos → resolver problema de jerarquía visual pendiente |
| **Bloqueos activos** | El artículo sigue sintiéndose visualmente apretado — el usuario reporta que el problema de jerarquía no se ha resuelto |
| **Última sesión** | ses-015 |

## Contexto del proyecto

- **Stack:** Astro v6 + React 19 + Three.js + Lucide Icons
- **Despliegue:** mvgnlabs.vercel.app (Vercel)
- **Propósito:** Centro de Soporte Digital — facilitación técnica y soporte para entretenimiento digital en Android

## MVGN Runtime

| Artefacto | Ubicación | Estado |
|-----------|-----------|--------|
| Kernel | `kernel/README.md` | ✅ Cargado |
| Session Manager | `session/README.md` | ✅ Cargado |
| Telemetry | `telemetry/` (spec + README) | ✅ Cargado |
| Traceability | `traceability/` (spec + README) | ✅ Cargado |
| Analytics | `analytics/` (spec + README) | ✅ Cargado |
| Event History | `events/2026-07-08.jsonl` | ✅ 20+ eventos (hasta ses-007) |
| Runtime State | `.mvgn-context.json` | ✅ IN_PROGRESS (ses-007) |
| Runtime Manifest | `runtime-state/mvgn-runtime.json` | ✅ v3.0.0 |
| Policies | `policies/README.md` | ✅ Cargado |
| Event Bus | `event-history/event-bus-spec.md` | ✅ Cargado |
| Actor Identity | `runtime-state/actor-identity-spec.md` | ✅ Cargado |

## Cambios de la sesión 003

| Área | Cambio |
|------|--------|
| **Contacto** | Rediseño completo: wireframe cards (Correo, Escríbenos, Linktree) con Lucide icons, barra de acento hover, sin 3D |
| **Manifiesto** | Nuevo pull-quote con acento rojo + glass stats cards + glow animado de fondo |
| **Proceso** | Timeline vertical reemplazada por barra horizontal interactiva con descripción dinámica al hover/click |
| **Tipografía** | Jerarquía corregida: section-tag 0.6→0.7rem, hero-sub text-base→text-lg, badges 0.55→0.65rem, etc. |
| **Sección Servicios** | Eliminada por completo (redundante con Planes). HTML, CSS, nav link, JS references removidos |
| **Copy** | "Acompañamiento" reemplazado por "Asistencia" / "Respaldo" en todo el sitio |
| **CurvedLoop** | Velocidad reducida (1.2→0.35), opacidad base 0.12→0.05 (easter egg feel) |

## Cambios de la sesión 005 — Laboratorio Overhaul

| Área | Cambio |
|------|--------|
| **Colección contenido** | Nueva colección `laboratorio` en `src/content/laboratorio/` con 3 artículos MDX (NewPipe, Vanced+Morphe, Bitwarden) |
| **Content config** | `src/content.config.ts` define esquemas Zod para `laboratorio` y `apps` |
| **ArticuloCard** | Componente nuevo `src/components/ArticuloCard.astro` — glass layout, hero con gradiente por icono, tags, metadata |
| **Páginas artículo** | `src/pages/laboratorio/[slug].astro` — renderizado MDX, metadata editorial (archivo, editor, tiempo lectura), callouts (tip/note/verdict), ScreenshotFrame, artículos relacionados por tags |
| **Artículos reescritos** | NewPipe → merge con Vanced+Morphe (3 en 1). Nuevo: ecosistema modding (Bitwarden) |
| **Home index** | Integración `ArticuloCard` en sección Laboratorio (últimos 3 artículos) |

## Próximos pasos sugeridos

1. Revisar sección Planes standalone
2. Deploy a producción (mvgnlabs.vercel.app)

## Archivos v2.3 preservados (compatibles)

| Archivo | Propósito |
|---------|-----------|
| `profiles/lite/.mvgn/session-contract.md` | Scope v2 — narrative restructuring |
| `profiles/lite/.mvgn/authority-map.md` | Jerarquía de autoridad |
| `profiles/lite/.mvgn/kernel-spec.md` | Kernel spec Lite (5 gates) |

## Notas

- El proyecto se renombró de **EPIX PLAY PROJECT** a **MVGN DIGITAL HUB**
- La migración de MVGN v2.1 → v3.0 se completó el 2026-07-08
- Session 003: cambios de diseño UI/UX, sin cambios estructurales de arquitectura
- Session 004: (no documentada — gap en event log)
- Session 005: laboratorio-overhaul — colección contenido, componentes, páginas artículo
- Session 006: B-01 intento — ritmo vertical base 24px (parcial, conflictos con estilos legacy)
- Session 007: Vertical Rhythm System completo — reset total, solo margin-top, scale sistemática (0.5×–3×), tokens extendidos, conflictos legacy eliminados. Build verificado.
- Ver `docs/04_changelog.md` para historial detallado de cambios por archivo
